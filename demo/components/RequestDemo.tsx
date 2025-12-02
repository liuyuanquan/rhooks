import React, { useState } from "react";
import { useRequest } from "../../src";

// 模拟API请求
const mockApiRequest = (
	userId: number,
	{ signal }: { signal: AbortSignal }
): Promise<{ id: number; name: string; email: string }> => {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			// 增加30%的失败概率
			if (Math.random() < 0.3) {
				reject(new Error(`Failed to fetch user data for ID: ${userId}`));
			} else {
				resolve({
					id: userId,
					name: `User ${userId}`,
					email: `user${userId}@example.com`,
				});
			}
		}, 1000);

		// 监听取消信号
		signal.addEventListener("abort", () => {
			clearTimeout(timer);
			reject(new Error("Request aborted"));
		});
	});
};

const RequestDemo: React.FC = () => {
	// 基本用法
	const [userId, setUserId] = useState(1);
	const { data, loading, error, run, cancel, refresh, reset } = useRequest(
		mockApiRequest,
		{
			manual: true,
			cacheKey: (userId) => `user-request-demo-${userId}`,
			cacheTime: 30000,
		}
	);

	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "10px",
				border: "1px solid #ccc",
			}}
		>
			<h1>useRequest Hook Demo</h1>

			<div style={{ marginBottom: "30px" }}>
				<h2>基本用法</h2>
				<div>
					<input
						type="number"
						value={userId}
						onChange={(e) => setUserId(Number(e.target.value))}
						placeholder="User ID"
						style={{ marginRight: "10px", padding: "5px" }}
					/>
					<button onClick={() => run(userId)} disabled={loading}>
						{loading ? "Loading..." : "获取用户信息"}
					</button>
					<button onClick={cancel} style={{ marginLeft: "10px" }}>
						取消请求
					</button>
					<button onClick={refresh} style={{ marginLeft: "10px" }}>
						刷新
					</button>
					<button onClick={reset} style={{ marginLeft: "10px" }}>
						重置
					</button>
				</div>

				{loading && <p>加载中...</p>}
				{error && <p style={{ color: "red" }}>错误: {error.message}</p>}
				{data && (
					<div style={{ marginTop: "10px" }}>
						<h3>用户信息:</h3>
						<p>ID: {data.id}</p>
						<p>姓名: {data.name}</p>
						<p>邮箱: {data.email}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default RequestDemo;
