import { useRef, useCallback } from "react";

/**
 * 节流配置选项
 */
interface Options {
	/** 节流等待时间，单位为毫秒，默认为 1000ms */
	wait?: number;
	/** 是否在延迟开始前调用函数，默认为 true */
	leading?: boolean;
	/** 是否在延迟结束后调用函数，默认为 true */
	trailing?: boolean;
}

/**
 * 节流函数 Hook
 *
 * 用于创建一个节流函数，可以控制函数的执行频率。
 * 在固定时间间隔内最多执行一次。
 * 支持 leading（延迟前执行）和 trailing（延迟后执行）两种模式。
 *
 * @param fn 需要节流执行的函数
 * @param options 配置节流的行为
 * @returns 返回包含 run、cancel、flush 方法的对象
 *   - run: 触发节流函数执行
 *   - cancel: 取消待执行的节流函数
 *   - flush: 立即执行节流函数并取消定时器
 *
 * @example
 * ```tsx
 * const { run, cancel, flush } = useThrottleFn(
 *   (value: string) => console.log(value),
 *   { wait: 500 }
 * )
 *
 * // 调用 run 来触发节流
 * run('hello')
 * ```
 */
export function useThrottleFn<T extends (...args: never[]) => unknown>(
	fn: T,
	options: Options = {}
) {
	// 解构配置选项，设置默认值
	const { wait = 1000, leading = true, trailing = true } = options;

	// 使用 useRef 保存状态，避免组件重新渲染时丢失
	// 上次执行函数的时间戳
	const lastExecTimeRef = useRef<number>(0);
	// 定时器引用，用于取消定时器
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	// 保存函数调用时的参数
	const argsRef = useRef<Parameters<T>>([] as unknown as Parameters<T>);
	// 保存函数引用，支持函数变化时更新
	const fnRef = useRef<T>(fn);

	// 更新函数引用，确保始终使用最新的函数
	fnRef.current = fn;

	/**
	 * 执行函数
	 * 使用保存的参数调用函数，并更新执行时间戳
	 * @returns 返回函数的执行结果
	 */
	const execute = useCallback((): ReturnType<T> => {
		const args = argsRef.current;
		// 更新执行时间戳
		lastExecTimeRef.current = Date.now();
		// 调用函数并返回结果
		return fnRef.current(...args) as ReturnType<T>;
	}, []);

	/**
	 * 取消节流
	 * 清除定时器
	 */
	const cancel = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	/**
	 * 立即执行
	 * 如果存在待执行的定时器，立即执行函数并取消定时器
	 * @returns 返回函数的执行结果
	 */
	const flush = useCallback((): ReturnType<T> => {
		// 取消定时器（cancel 内部已有判断）
		cancel();
		// 执行函数并返回结果（与 execute 行为一致）
		return execute();
	}, [cancel, execute]);

	/**
	 * 触发节流执行
	 * 这是主要的调用方法，每次调用都会：
	 * 1. 保存参数
	 * 2. 如果距离上次执行时间超过 wait，立即执行（leading 模式）
	 * 3. 否则，设置定时器在剩余时间后执行（trailing 模式）
	 *
	 * @param args 传递给节流函数的参数
	 */
	const run = useCallback(
		(...args: Parameters<T>) => {
			// 保存参数，供 execute 使用
			argsRef.current = args;
			const now = Date.now();
			const timeSinceLastExec = now - lastExecTimeRef.current;

			// leading 模式：如果距离上次执行时间超过 wait，立即执行
			if (leading && timeSinceLastExec >= wait) {
				execute();
				return;
			}

			// trailing 模式：如果已经有定时器，不重复设置
			if (timerRef.current) {
				return;
			}

			// 计算剩余等待时间
			const remaining = wait - timeSinceLastExec;

			// 设置定时器，在剩余时间后执行（trailing 模式）
			if (trailing) {
				timerRef.current = setTimeout(() => {
					timerRef.current = null;
					execute();
				}, remaining);
			}
		},
		[wait, leading, trailing, execute]
	);

	return {
		run: run as (...args: Parameters<T>) => void,
		cancel,
		flush: flush as () => ReturnType<T>,
	};
}
