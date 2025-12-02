import { useState, useCallback } from "react";

/**
 * 在两个值之间切换的 Hook，比 useBoolean 更加灵活，可以接受任意类型的值
 * @param defaultValue 默认值，默认为 false
 * @param reverseValue 反向值，默认为 !defaultValue
 * @returns 返回当前值、切换函数和设置函数
 */
export function useToggle<T = boolean, U = T>(
	defaultValue?: T,
	reverseValue?: U
): [T | U, () => void, (value: T | U) => void] {
	// 处理默认值，默认为 false
	const resolvedDefault = defaultValue ?? (false as T);
	// 处理反向值，默认为 !resolvedDefault
	const resolvedReverse = reverseValue ?? (!resolvedDefault as unknown as U);

	const [state, setState] = useState<T | U>(resolvedDefault);

	// 切换函数，在两个值之间切换
	const toggle = useCallback(() => {
		setState((prev) => {
			return prev === resolvedDefault ? resolvedReverse : resolvedDefault;
		});
	}, [resolvedDefault, resolvedReverse]);

	// 设置函数，允许手动设置值
	const set = useCallback((value: T | U) => {
		setState(value);
	}, []);

	return [state, toggle, set] as const;
}
