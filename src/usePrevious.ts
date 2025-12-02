import { useRef } from "react";

/**
 * 获取上一次的值
 * @param value 当前值
 * @returns 上一次的值
 */
export function usePrevious<T>(value: T): T | undefined {
	const currentRef = useRef<T | undefined>(undefined);
	const previousRef = useRef<T | undefined>(undefined);

	// 在渲染期间更新 ref，确保获取正确的上一次值
	if (currentRef.current !== value) {
		previousRef.current = currentRef.current;
		currentRef.current = value;
	}

	return previousRef.current;
}
