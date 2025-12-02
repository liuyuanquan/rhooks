import { useRef, useCallback } from "react";

interface Options {
	wait?: number;
	leading?: boolean;
	trailing?: boolean;
	maxWait?: number;
}

/**
 * 防抖函数 Hook
 * @param fn 需要防抖执行的函数
 * @param options 配置防抖的行为
 * @returns 返回包含 run、cancel、flush 方法的对象
 *
 * @example
 * ```tsx
 * const { run, cancel, flush } = useDebounceFn(
 *     (value) => {
 *         console.log('debounced function called:', value);
 *     },
 *     { wait: 500 }
 * );
 *
 * // 触发执行
 * run('test');
 *
 * // 取消防抖
 * cancel();
 *
 * // 立即执行
 * flush();
 * ```
 */
export function useDebounceFn<Fn extends (...args: any[]) => any>(
	fn: Fn,
	options: Options = {}
) {
	const { wait = 1000, leading = false, trailing = true, maxWait } = options;

	const lastCallTimeRef = useRef<number>(0);
	const lastExecTimeRef = useRef<number>(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const argsRef = useRef<any[]>([]);
	const fnRef = useRef<Fn>(fn);
	const isLeadingCalledRef = useRef<boolean>(false);

	// 更新 fn 引用
	fnRef.current = fn;

	// 执行函数
	const execute = useCallback(() => {
		const args = argsRef.current;
		lastExecTimeRef.current = Date.now();
		fnRef.current(...args);
		isLeadingCalledRef.current = false;
	}, []);

	// 计算剩余时间
	const calcWait = useCallback(() => {
		const now = Date.now();
		const timeSinceLastCall = now - lastCallTimeRef.current;
		const timeSinceLastExec = now - lastExecTimeRef.current;
		const timeWaiting = wait - timeSinceLastCall;

		if (maxWait) {
			return Math.min(timeWaiting, maxWait - timeSinceLastExec);
		}

		return timeWaiting;
	}, [wait, maxWait]);

	// 启动定时器
	const startTimer = useCallback(() => {
		const timeWaiting = calcWait();
		timerRef.current = setTimeout(() => {
			timerRef.current = null;
			if (trailing) {
				execute();
			}
		}, timeWaiting);
	}, [calcWait, trailing, execute]);

	// 取消防抖
	const cancel = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		isLeadingCalledRef.current = false;
	}, []);

	// 立即执行
	const flush = useCallback(() => {
		if (timerRef.current) {
			execute();
			cancel();
		}
		return fnRef.current(...argsRef.current);
	}, [execute, cancel]);

	// 触发执行
	const run = useCallback(
		(...args: Parameters<Fn>) => {
			argsRef.current = args;
			lastCallTimeRef.current = Date.now();

			// 首次调用且开启 leading 模式
			if (leading && !isLeadingCalledRef.current && !timerRef.current) {
				execute();
				isLeadingCalledRef.current = true;
			}

			// 取消现有定时器并重新启动
			cancel();
			startTimer();
		},
		[leading, execute, cancel, startTimer]
	);

	return { run, cancel, flush };
}
