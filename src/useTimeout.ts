import { useEffect, useRef } from "react";

/**
 * 定时器 hook（延迟执行一次）
 * @param fn 回调函数
 * @param delay 延迟时间（毫秒），如果为 null 则不执行
 * @returns 包含清除方法的对象
 */
export function useTimeout(
	fn: () => void,
	delay?: number | null
): {
	clear: () => void;
} {
	const savedCallback = useRef<() => void>();
	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

	// 保存最新的回调函数
	// 这很重要，因为如果不保存最新的回调函数，
	// 当组件重新渲染并创建新的函数实例时，
	// 定时器仍会调用旧的函数实例，导致闭包陷阱问题
	useEffect(() => {
		savedCallback.current = fn;
	}, [fn]);

	// 清除定时器的函数
	const clearTimer = () => {
		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
			timeoutId.current = null;
		}
	};

	useEffect(() => {
		// 清除之前的定时器
		clearTimer();

		// 如果 delay 为 null 或 undefined，不设置定时器
		if (delay === null || delay === undefined) {
			return;
		}

		// 设置新的定时器
		timeoutId.current = setTimeout(() => {
			savedCallback.current?.();
			timeoutId.current = null;
		}, delay);

		// 返回清除函数
		return clearTimer;
	}, [delay]);

	// 返回清除方法
	const clear = () => {
		clearTimer();
	};

	return { clear };
}
