import { useEffect, useRef } from "react";

type ClickAwayCallback = (event: MouseEvent | TouchEvent) => void;
type RefType<T extends HTMLElement = HTMLElement> =
	| React.RefObject<T>
	| (React.RefObject<T> | null)[];

/**
 * 监听目标元素外部的点击事件
 * @param callback 点击外部区域时触发的回调函数
 * @param targetRef 目标元素的 ref 或 ref 数组
 */
export function useClickAway<T extends HTMLElement = HTMLElement>(
	callback: ClickAwayCallback,
	targetRef: RefType<T>
): void {
	const callbackRef = useRef<ClickAwayCallback>(callback);

	// 使用 ref 保存最新的 callback，避免闭包问题
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const handler = (event: MouseEvent | TouchEvent) => {
			const target = event.target as Node | null;

			// 获取所有目标元素
			const refs = Array.isArray(targetRef) ? targetRef : [targetRef];
			const targetElements = refs
				.map((ref) => ref?.current)
				.filter((el): el is T => el !== null);

			// 如果没有目标元素，则不执行回调
			if (targetElements.length === 0) {
				return;
			}

			// 检查点击是否发生在任意目标元素内部
			const isInside = targetElements.some((targetElement) => {
				let currentNode: Node | null = target;
				while (currentNode) {
					if (currentNode === targetElement) {
						return true;
					}
					currentNode = currentNode.parentNode;
				}
				return false;
			});

			// 如果点击发生在目标元素内部，则不执行回调
			if (isInside) {
				return;
			}

			// 执行回调函数
			callbackRef.current(event);
		};

		// 添加事件监听器
		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);

		// 清除事件监听器
		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	}, [targetRef]);
}
