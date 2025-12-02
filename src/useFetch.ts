import { useState, useEffect } from "react";

interface UseFetchOptions extends RequestInit {
	skip?: boolean; // 是否跳过请求
}

interface UseFetchResult<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
}

/**
 * 数据获取 hook
 * @param url 请求的 URL
 * @param options 请求选项
 * @returns 返回数据、加载状态、错误信息和重新获取函数
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useFetch<User>('/api/user')
 *
 * if (loading) return <div>Loading...</div>
 * if (error) return <div>Error: {error.message}</div>
 * return <div>{data?.name}</div>
 * ```
 */
export function useFetch<T = unknown>(
	url: string | null,
	options: UseFetchOptions = {}
): UseFetchResult<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		if (!url || options.skip) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const json = await response.json();
			setData(json);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("An unknown error occurred")
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [url, options.skip, fetchData]);

	const refetch = () => {
		fetchData();
	};

	return { data, loading, error, refetch };
}
