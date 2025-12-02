import { useState, useCallback } from "react";

interface UseLocalStorageStateOptions<T> {
	defaultValue?: T | (() => T);
	serializer?: (value: T) => string;
	deserializer?: (value: string) => T;
}

/**
 * 将状态存储在 localStorage 中的 Hook，页面刷新后状态依然保持
 * @param key 存储的 key
 * @param options 配置选项
 * @returns 返回当前值和更新函数
 */
export function useLocalStorageState<T>(
	key: string,
	options: UseLocalStorageStateOptions<T> = {}
): [
	T | undefined,
	(value: T | ((prevValue: T | undefined) => T | undefined)) => void
] {
	const {
		defaultValue,
		serializer = JSON.stringify,
		deserializer = JSON.parse,
	} = options;

	const [storedValue, setStoredValue] = useState<T | undefined>(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				return deserializer(item);
			}

			// 处理默认值，支持函数形式
			return typeof defaultValue === "function"
				? (defaultValue as () => T)()
				: defaultValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return typeof defaultValue === "function"
				? (defaultValue as () => T)()
				: defaultValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((prevValue: T | undefined) => T | undefined)) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;

				setStoredValue(valueToStore);

				if (valueToStore === undefined) {
					window.localStorage.removeItem(key);
				} else {
					window.localStorage.setItem(key, serializer(valueToStore));
				}
			} catch (error) {
				console.error(`Error setting localStorage key "${key}":`, error);
			}
		},
		[key, storedValue, serializer]
	);

	return [storedValue, setValue] as const;
}
