import React from "react";
import { useDebounceFn } from "../../src";

// 基本用法示例
const Demo: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const { run } = useDebounceFn(
		() => {
			setValue(value + 1);
		},
		{
			wait: 500,
		}
	);

	return (
		<div>
			<p>当前值: {value}</p>
			<button onClick={run}>点击 +1</button>
		</div>
	);
};

// Leading 模式示例
const LeadingDemo: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const { run } = useDebounceFn(
		() => {
			setValue(value + 1);
		},
		{
			wait: 500,
			leading: true, // 在延迟开始前执行
			trailing: false, // 在延迟结束后不执行
		}
	);

	return (
		<div>
			<p>当前值: {value}</p>
			<p>点击按钮会立即执行，但 500ms 内重复点击不会重复触发</p>
			<button onClick={run}>点击 +1</button>
		</div>
	);
};

// 取消示例
const CancelDemo: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const { run, cancel } = useDebounceFn(
		() => {
			setValue(value + 1);
		},
		{
			wait: 1000,
		}
	);

	return (
		<div>
			<p>当前值: {value}</p>
			<button onClick={run}>点击 +1 (延迟 1 秒)</button>
			<button onClick={cancel} style={{ marginLeft: 8 }}>
				取消
			</button>
		</div>
	);
};

// 搜索示例
const SearchDemo: React.FC = () => {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [results, setResults] = React.useState<string[]>([]);
	const [loading, setLoading] = React.useState(false);

	const { run: debouncedSearch } = useDebounceFn(
		async (value: string) => {
			if (!value) {
				setResults([]);
				return;
			}

			setLoading(true);
			try {
				// 模拟 API 请求
				await new Promise((resolve) => setTimeout(resolve, 500));
				// 假设这是搜索结果
				setResults(
					["苹果", "香蕉", "橙子", "葡萄", "西瓜"].filter((item) =>
						item.includes(value)
					)
				);
			} finally {
				setLoading(false);
			}
		},
		{
			wait: 500,
			leading: true,
		}
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		debouncedSearch(value);
	};

	return (
		<div>
			<input
				value={searchTerm}
				onChange={handleChange}
				placeholder="输入水果名称搜索"
				style={{ width: 200 }}
			/>
			{loading ? (
				<p>加载中...</p>
			) : (
				<ul>
					{results.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			)}
		</div>
	);
};

// 主组件
const DebounceFnDemo: React.FC = () => {
	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "10px",
				border: "1px solid #ccc",
			}}
		>
			<h2>useDebounceFn Hook Demo</h2>
			<div style={{ marginBottom: "20px" }}>
				<h3>1. 基本用法</h3>
				<Demo />
			</div>
			<div style={{ marginBottom: "20px" }}>
				<h3>2. Leading 模式</h3>
				<LeadingDemo />
			</div>
			<div style={{ marginBottom: "20px" }}>
				<h3>3. 取消示例</h3>
				<CancelDemo />
			</div>
			<div style={{ marginBottom: "20px" }}>
				<h3>4. 搜索示例</h3>
				<SearchDemo />
			</div>
		</div>
	);
};

export default DebounceFnDemo;
