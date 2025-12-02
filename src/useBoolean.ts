import { useState, useCallback } from "react";

/**
 * 用于管理布尔值的 hook
 * @param initialValue 初始值，默认为 false
 * @returns 返回当前值和操作对象
 */
export function useBoolean(initialValue: boolean = false) {
	const [state, setState] = useState(initialValue);

	const toggle = useCallback(() => {
		setState((prev) => !prev);
	}, []);

	const setTrue = useCallback(() => {
		setState(true);
	}, []);

	const setFalse = useCallback(() => {
		setState(false);
	}, []);

	const set = useCallback((value: boolean) => {
		setState(value);
	}, []);

	return [state, { toggle, setTrue, setFalse, set }] as const;
}
