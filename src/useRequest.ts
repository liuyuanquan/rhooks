import { useEffect, useRef, useState } from "react";

type Service<TData, TParams extends unknown[] = unknown[]> = (
	...args: [...TParams, { signal: AbortSignal }]
) => Promise<TData>;

interface Options<TData, TParams extends unknown[] = unknown[]> {
	manual?: boolean;
	defaultParams?: TParams;
	refreshDeps?: unknown[];
	onSuccess?: (data: TData, params: TParams) => void;
	onError?: (error: Error, params: TParams) => void;
	onFinally?: (params: TParams) => void;
	cacheKey?: string | ((...params: TParams) => string);
	cacheTime?: number;
}

export interface UseRequestResult<TData, TParams extends unknown[]> {
	data: TData | undefined;
	error: Error | undefined;
	loading: boolean;
	run: (...params: TParams) => void;
	cancel: () => void;
	refresh: () => void;
	reset: () => void;
}

export function useRequest<TData, TParams extends unknown[] = unknown[]>(
	service: Service<TData, TParams>,
	options: Options<TData, TParams> = {}
): UseRequestResult<TData, TParams> {
	const {
		manual = false,
		defaultParams = [] as unknown as TParams,
		refreshDeps = [],
		onSuccess,
		onError,
		onFinally,
		cacheKey,
		cacheTime = 300000, // 5分钟
	} = options;

	const [data, setData] = useState<TData | undefined>(undefined);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	const paramsRef = useRef<TParams>();
	const unmountedRef = useRef<boolean>(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	// 缓存功能
	const getCache = (key: string) => {
		try {
			const cached = localStorage.getItem(key);
			if (cached) {
				const parsed = JSON.parse(cached);
				if (Date.now() - parsed.timestamp < cacheTime) {
					return parsed.data;
				}
			}
			return null;
		} catch (error) {
			// 缓存解析失败，返回null
			console.warn(`Failed to parse cache for key "${key}":`, error);
			return null;
		}
	};

	const setCache = (key: string, data: TData) => {
		try {
			const payload = {
				data,
				timestamp: Date.now(),
			};
			localStorage.setItem(key, JSON.stringify(payload));
		} catch (error) {
			// 忽略缓存设置错误，不影响主流程
			console.warn(`Failed to set cache for key "${key}":`, error);
		}
	};

	// 请求函数
	const run = (...params: TParams): void => {
		// 设置参数引用
		paramsRef.current = params;

		// 取消之前的请求
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		// 创建新的 AbortController
		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		// 设置loading状态
		setLoading(true);
		setError(undefined);

		// 检查缓存 - 支持动态生成的cacheKey
		// 如果cacheKey是一个函数，则调用它来获取实际的缓存键
		const dynamicCacheKey =
			typeof cacheKey === "function" ? cacheKey(...params) : cacheKey;
		const finalCacheKey = dynamicCacheKey
			? `${dynamicCacheKey}-${JSON.stringify(params)}`
			: undefined;

		if (finalCacheKey) {
			const cachedData = getCache(finalCacheKey);
			if (cachedData) {
				abortControllerRef.current = null;
				setData(cachedData);
				setLoading(false);
				onSuccess?.(cachedData, params);
				onFinally?.(params);
				return;
			}
		}

		// 执行请求
		service(...params, { signal: abortController.signal })
			.then((result) => {
				// 检查请求是否被取消
				if (abortController.signal.aborted) {
					abortControllerRef.current = null;
					return;
				}

				// 更新状态（无论组件是否已卸载）
				setData(result);
				setError(undefined);
				setLoading(false); // 确保在成功时设置loading为false
				abortControllerRef.current = null;

				// 设置缓存 - 支持动态生成的cacheKey
				if (finalCacheKey) {
					setCache(finalCacheKey, result);
				}

				// 只有在组件未卸载时才调用回调函数
				if (!unmountedRef.current) {
					onSuccess?.(result, params);
				}
			})
			.catch((err) => {
				// 忽略取消请求的错误
				if (err.name === "AbortError" || abortController.signal.aborted) {
					// 不将取消的请求视为错误
					abortControllerRef.current = null;
					setLoading(false);
					return;
				}

				// 更新状态（无论组件是否已卸载）
				setError(err);
				setData(undefined);
				setLoading(false); // 确保在错误时设置loading为false
				abortControllerRef.current = null;

				// 只有在组件未卸载时才调用回调函数
				if (!unmountedRef.current) {
					onError?.(err, params);
				}
			})
			.finally(() => {
				// 检查请求是否被取消
				if (abortController.signal.aborted) {
					abortControllerRef.current = null;
					return;
				}

				// 清理abortController
				abortControllerRef.current = null;
				setLoading(false);

				// 只有在组件未卸载时才调用回调函数
				if (!unmountedRef.current) {
					onFinally?.(params);
				}
			});
	};

	// 取消请求
	const cancel = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}
		setLoading(false);
	};

	// 刷新函数
	const refresh = (): void => {
		if (paramsRef.current) {
			reset();
			run(...paramsRef.current);
		}
	};

	// 重置状态
	const reset = () => {
		cancel();
		setData(undefined);
		setError(undefined);
		setLoading(false);
	};

	// 组件挂载时自动执行
	useEffect(() => {
		// 重置unmountedRef，处理StrictMode下的双重调用
		unmountedRef.current = false;

		if (!manual) {
			run(...defaultParams);
		}

		return () => {
			unmountedRef.current = true;
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
				abortControllerRef.current = null;
			}
		};
	}, []);

	// refreshDeps 变化时重新请求
	useEffect(() => {
		if (refreshDeps.length > 0) {
			refresh();
		}
	}, [refreshDeps, refresh]);

	return {
		data,
		error,
		loading,
		run,
		cancel,
		refresh,
		reset,
	};
}
