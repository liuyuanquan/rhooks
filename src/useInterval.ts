import { useEffect, useRef } from "react";

/**
 * 定时器 hook（循环执行）
 * @param fn 回调函数
 * @param delay 延迟时间（毫秒），如果为 null 则停止执行
 * @param options 配置选项
 * @param options.immediate 是否立即执行
 */
export function useInterval(
	fn: () => void,
	delay?: number | null,
	options?: {
		immediate?: boolean;
	}
): {
	clear: () => void;
} {
	const savedCallback = useRef<() => void>();
	const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

	// 清除定时器的函数
	const clearTimer = () => {
		if (intervalId.current) {
			clearInterval(intervalId.current);
			intervalId.current = null;
		}
	};

	// 保存最新的回调函数
	// 这很重要，因为如果不保存最新的回调函数，
	// 当组件重新渲染并创建新的函数实例时，
	// 定时器仍会调用旧的函数实例，导致闭包陷阱问题
	useEffect(() => {
		savedCallback.current = fn;
	}, [fn]);

	useEffect(() => {
		// 清除之前的定时器
		clearTimer();

		// 如果 delay 为 null 或 undefined，不设置定时器
		if (delay === null || delay === undefined) {
			return;
		}

		// 如果设置了立即执行选项，则立即调用一次
		if (options?.immediate) {
			savedCallback.current?.();
		}

		// 设置新的定时器
		intervalId.current = setInterval(() => {
			savedCallback.current?.();
		}, delay);

		// 返回清除函数
		return clearTimer;
	}, [delay, options?.immediate]);

	// 返回清除方法
	const clear = () => {
		clearTimer();
	};

	return { clear };
}
