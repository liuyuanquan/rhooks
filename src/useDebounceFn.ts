import { useRef, useCallback } from "react";

/**
 * 防抖配置选项
 */
interface Options {
	/** 防抖等待时间，单位为毫秒，默认为 1000ms */
	wait?: number;
	/** 是否在延迟开始前调用函数，默认为 false */
	leading?: boolean;
	/** 是否在延迟结束后调用函数，默认为 true */
	trailing?: boolean;
	/** 最大等待时间，单位为毫秒，用于设置防抖函数的最大延迟时间 */
	maxWait?: number;
}

/**
 * 防抖函数 Hook
 *
 * 用于创建一个防抖函数，可以控制函数的执行频率。
 * 支持 leading（延迟前执行）和 trailing（延迟后执行）两种模式。
 *
 * @param fn 需要防抖执行的函数
 * @param options 配置防抖的行为
 * @returns 返回包含 run、cancel、flush 方法的对象
 *   - run: 触发防抖函数执行
 *   - cancel: 取消待执行的防抖函数
 *   - flush: 立即执行防抖函数并取消定时器
 *
 * @example
 * ```tsx
 * const { run, cancel, flush } = useDebounceFn(
 *   (value: string) => console.log(value),
 *   { wait: 500 }
 * )
 *
 * // 调用 run 来触发防抖
 * run('hello')
 * ```
 */
export function useDebounceFn<T extends (...args: never[]) => unknown>(
	fn: T,
	options: Options = {}
) {
	// 解构配置选项，设置默认值
	const { wait = 1000, leading = false, trailing = true, maxWait } = options;

	// 使用 useRef 保存状态，避免组件重新渲染时丢失
	// 上次调用 run 的时间戳
	const lastCallTimeRef = useRef<number>(0);
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
	 * 计算剩余等待时间
	 * 考虑 maxWait 选项，确保不会超过最大等待时间
	 * @returns 返回需要等待的时间（毫秒）
	 */
	const calcWait = useCallback(() => {
		const now = Date.now();
		// 距离上次调用的时间
		const timeSinceLastCall = now - lastCallTimeRef.current;
		// 距离上次执行的时间
		const timeSinceLastExec = now - lastExecTimeRef.current;
		// 基础等待时间
		const timeWaiting = wait - timeSinceLastCall;

		// 如果设置了最大等待时间，取较小值
		// 这样可以确保即使频繁调用，也会在 maxWait 时间内执行一次
		if (maxWait) {
			return Math.min(timeWaiting, maxWait - timeSinceLastExec);
		}

		return timeWaiting;
	}, [wait, maxWait]);

	/**
	 * 启动定时器
	 * 根据计算的等待时间设置定时器，在延迟后执行函数（如果 trailing 为 true）
	 */
	const startTimer = useCallback(() => {
		const timeWaiting = calcWait();
		timerRef.current = setTimeout(() => {
			timerRef.current = null;
			// 如果 trailing 模式开启，在延迟后执行函数
			if (trailing) {
				execute();
			}
		}, timeWaiting);
	}, [calcWait, trailing, execute]);

	/**
	 * 取消防抖
	 * 清除定时器，重置 leading 调用标记
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
	 * 触发防抖执行
	 * 这是主要的调用方法，每次调用都会：
	 * 1. 保存参数
	 * 2. 更新调用时间戳
	 * 3. 如果开启 leading 模式且是首次调用，立即执行
	 * 4. 取消之前的定时器，重新启动新的定时器
	 *
	 * @param args 传递给防抖函数的参数
	 */
	const run = useCallback(
		(...args: Parameters<T>) => {
			// 保存参数，供 execute 使用
			argsRef.current = args;
			// 更新调用时间戳
			lastCallTimeRef.current = Date.now();

			// leading 模式：在延迟开始前立即执行
			// 只在没有定时器时执行（首次调用或定时器已执行完毕/被取消）
			if (leading && !timerRef.current) {
				execute();
			}

			// 取消之前的定时器
			cancel();
			// 重新启动定时器（trailing 模式会在延迟后执行）
			startTimer();
		},
		[leading, execute, cancel, startTimer]
	);

	return {
		run: run as (...args: Parameters<T>) => void,
		cancel,
		flush: flush as () => ReturnType<T>,
	};
}
