import { useCallback } from "react";
import { useToggle } from "./useToggle";

/**
 * 用于管理布尔值的 hook
 * @param initialValue 初始值，默认为 false
 * @returns 返回当前值和操作对象
 */
export function useBoolean(initialValue: boolean = false) {
	// 使用 useToggle 实现，默认值为 initialValue，反向值为 !initialValue
	const [state, toggleToggle, set] = useToggle(initialValue, !initialValue);

	// 保持原有的 API 接口
	const toggle = useCallback(() => {
		toggleToggle();
	}, [toggleToggle]);

	const setTrue = useCallback(() => {
		set(true);
	}, [set]);

	const setFalse = useCallback(() => {
		set(false);
	}, [set]);

	return [state, { toggle, setTrue, setFalse, set }] as const;
}
