import { useState, useEffect, RefObject, useCallback, useRef } from "react";

// 定义支持的滚动目标类型
type ScrollTarget = RefObject<HTMLElement>;

interface ScrollOptions {
	/** 节流等待时间 (ms)，默认值是0 */
	wait?: number;
}

/**
 * 获取元素滚动位置的 Hook
 * @param target 包含目标元素的 ref 对象
 * @param options 配置选项
 * @returns 返回元素的滚动位置 { x: number, y: number }
 *
 * @example
 * ```tsx
 * const scrollRef = useRef(null)
 * const scroll = useScroll(scrollRef, { wait: 100 })
 *
 * // 在 JSX 中使用
 * // <div ref={scrollRef}>滚动内容</div>
 * // <p>滚动位置: {JSON.stringify(scroll)}</p>
 * ```
 */
export function useScroll(target: ScrollTarget, options: ScrollOptions = {}) {
	const { wait = 0 } = options;
	const [scroll, setScroll] = useState({ x: 0, y: 0 });
	const scrollRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// 更新滚动位置的回调函数
	const updateScrollPosition = useCallback(() => {
		const element = target.current;
		if (!element) return;

		const newScroll = {
			x: element.scrollLeft,
			y: element.scrollTop,
		};

		// 更新 ref 中的值
		scrollRef.current = newScroll;

		// 如果没有设置等待时间，直接更新状态
		if (wait <= 0) {
			setScroll(newScroll);
			return;
		}

		// 如果设置了等待时间，使用节流逻辑
		if (timeoutRef.current === null) {
			setScroll(newScroll);
			timeoutRef.current = setTimeout(() => {
				// 在延迟结束时检查是否有新的滚动位置需要更新
				setScroll(scrollRef.current);
				timeoutRef.current = null;
			}, wait);
		}
	}, [target, wait]);

	useEffect(() => {
		const element = target.current;
		if (!element) return;

		// 设置初始滚动位置
		const initialScroll = {
			x: element.scrollLeft,
			y: element.scrollTop,
		};
		setScroll(initialScroll);
		scrollRef.current = initialScroll;

		// 添加滚动事件监听器（passive: true，优化滚动性能）
		element.addEventListener("scroll", updateScrollPosition, { passive: true });

		// 清理函数：移除事件监听器和清除定时器
		return () => {
			element.removeEventListener("scroll", updateScrollPosition);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [target, updateScrollPosition]);

	return scroll;
}
