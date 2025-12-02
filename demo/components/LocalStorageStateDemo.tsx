import React from "react";
import { useLocalStorageState } from "../../src";

interface User {
	name: string;
	email: string;
}

const LocalStorageStateDemo: React.FC = () => {
	// 基本用法 - 数字类型
	const [count, setCount] = useLocalStorageState<number>("count", {
		defaultValue: 0,
	});

	// 对象类型
	const [user, setUser] = useLocalStorageState<User>("user", {
		defaultValue: { name: "John", email: "john@example.com" },
	});

	// 字符串类型，无默认值
	const [text, setText] = useLocalStorageState<string>("text");

	// 使用自定义序列化和反序列化
	const [customData, setCustomData] = useLocalStorageState<{ value: number }>(
		"custom-data",
		{
			defaultValue: { value: 100 },
			serializer: (value) => JSON.stringify(value),
			deserializer: (value) => JSON.parse(value),
		}
	);

	// 使用函数作为默认值
	const [functionDefault, setFunctionDefault] = useLocalStorageState<number>(
		"function-default",
		{
			defaultValue: () => {
				console.log("Calculating default value...");
				return Math.floor(Math.random() * 100);
			},
		}
	);

	// 移除状态示例
	const handleRemoveCount = () => {
		setCount(undefined!);
	};

	// 更新用户对象
	const handleUpdateUser = () => {
		setUser((prev) => ({
			...prev!,
			name: prev?.name === "John" ? "Jane" : "John",
		}));
	};

	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "15px",
				border: "1px solid #ccc",
				borderRadius: "8px",
			}}
		>
			<h2>useLocalStorageState Hook Demo</h2>

			<div style={{ marginBottom: "30px" }}>
				<h3>1. 基本用法 - 数字类型</h3>
				<div style={{ marginBottom: "10px" }}>
					<strong>当前值:</strong> {count}
				</div>
				<div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
					<button
						onClick={() => setCount((prev) => (prev || 0) + 1)}
						style={buttonStyle}
					>
						增加
					</button>
					<button
						onClick={() => setCount((prev) => (prev || 0) - 1)}
						style={buttonStyle}
					>
						减少
					</button>
					<button onClick={() => setCount(0)} style={buttonStyle}>
						重置为 0
					</button>
					<button
						onClick={handleRemoveCount}
						style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
					>
						移除
					</button>
				</div>
				<small>刷新页面后，状态会保持</small>
			</div>

			<div style={{ marginBottom: "30px" }}>
				<h3>2. 对象类型</h3>
				<div style={{ marginBottom: "10px" }}>
					<strong>当前用户:</strong> {JSON.stringify(user)}
				</div>
				<div>
					<button onClick={handleUpdateUser} style={buttonStyle}>
						切换用户名
					</button>
				</div>
			</div>

			<div style={{ marginBottom: "30px" }}>
				<h3>3. 字符串类型</h3>
				<div style={{ marginBottom: "10px" }}>
					<input
						type="text"
						value={text || ""}
						onChange={(e) => setText(e.target.value)}
						placeholder="输入一些文本..."
						style={{
							padding: "8px",
							width: "300px",
							marginRight: "10px",
						}}
					/>
				</div>
				<div>
					<strong>当前值:</strong> "{text}"
				</div>
			</div>

			<div style={{ marginBottom: "30px" }}>
				<h3>4. 自定义序列化和反序列化</h3>
				<div style={{ marginBottom: "10px" }}>
					<strong>当前值:</strong> {JSON.stringify(customData)}
				</div>
				<div>
					<button
						onClick={() =>
							setCustomData((prev) => ({ value: (prev?.value || 0) + 50 }))
						}
						style={buttonStyle}
					>
						增加 50
					</button>
				</div>
			</div>

			<div style={{ marginBottom: "30px" }}>
				<h3>5. 函数作为默认值</h3>
				<div style={{ marginBottom: "10px" }}>
					<strong>当前值:</strong> {functionDefault}
				</div>
				<div>
					<button
						onClick={() => setFunctionDefault((prev) => (prev || 0) + 10)}
						style={buttonStyle}
					>
						增加 10
					</button>
					<button
						onClick={() => setFunctionDefault(undefined!)}
						style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
					>
						重置（重新计算默认值）
					</button>
				</div>
				<small>打开控制台查看默认值计算日志</small>
			</div>

			<div>
				<h3>6. 清空所有示例数据</h3>
				<div>
					<button
						onClick={() => {
							setCount(undefined!);
							setUser(undefined!);
							setText(undefined!);
							setCustomData(undefined!);
							setFunctionDefault(undefined!);
						}}
						style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
					>
						清空所有数据
					</button>
				</div>
			</div>
		</div>
	);
};

// 按钮样式
const buttonStyle: React.CSSProperties = {
	padding: "8px 16px",
	border: "none",
	borderRadius: "4px",
	backgroundColor: "#007bff",
	color: "white",
	cursor: "pointer",
	fontSize: "14px",
	transition: "background-color 0.2s",
};

export default LocalStorageStateDemo;
