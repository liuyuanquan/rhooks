import React, { useState } from "react";
import { useDebounceFn } from "../../src";

const DebounceFnDemo: React.FC = () => {
	const [count, setCount] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [debouncedValue, setDebouncedValue] = useState("");
	const [leadingValue, setLeadingValue] = useState("");
	const [maxWaitValue, setMaxWaitValue] = useState("");

	// 基本用法
	const { run, cancel, flush } = useDebounceFn(
		(value) => {
			setCount((prev) => prev + 1);
			setDebouncedValue(value);
		},
		{ wait: 500 }
	);

	// 配置 leading: true
	const { run: runLeading } = useDebounceFn(
		(value) => {
			setLeadingValue(value);
		},
		{ wait: 500, leading: true }
	);

	// 配置 maxWait
	const { run: runMaxWait } = useDebounceFn(
		(value) => {
			setMaxWaitValue(value);
		},
		{ wait: 1000, maxWait: 2000 }
	);

	// 处理输入变化
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		run(value);
		runLeading(value);
		runMaxWait(value);
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
			<h2>useDebounceFn Hook Demo</h2>

			{/* 输入区域 */}
			<div style={demoSectionStyle}>
				<h3>输入区域</h3>
				<div style={{ marginBottom: "10px" }}>
					<input
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						placeholder="输入一些内容..."
						style={{
							padding: "8px",
							width: "300px",
							fontSize: "14px",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
					/>
				</div>
				<div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
					<button onClick={() => run(inputValue)} style={buttonStyle}>
						触发执行
					</button>
					<button
						onClick={cancel}
						style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
					>
						取消
					</button>
					<button
						onClick={flush}
						style={{ ...buttonStyle, backgroundColor: "#28a745" }}
					>
						立即执行
					</button>
				</div>
			</div>

			{/* 基本用法 */}
			<div style={demoSectionStyle}>
				<h3>1. 基本用法 (wait: 500ms)</h3>
				<p>执行次数: {count}</p>
				<p>防抖后的值: {debouncedValue}</p>
				<p>配置: wait: 500ms, leading: false, trailing: true</p>
			</div>

			{/* leading: true */}
			<div style={demoSectionStyle}>
				<h3>2. Leading 模式 (leading: true, wait: 500ms)</h3>
				<p>Leading 值: {leadingValue}</p>
				<p>配置: wait: 500ms, leading: true, trailing: true</p>
				<p>特点: 在延迟开始前调用函数</p>
			</div>

			{/* maxWait */}
			<div style={demoSectionStyle}>
				<h3>3. MaxWait 限制 (maxWait: 2000ms)</h3>
				<p>MaxWait 值: {maxWaitValue}</p>
				<p>配置: wait: 1000ms, maxWait: 2000ms</p>
				<p>特点: 最大等待时间为 2000ms，超过后会立即执行</p>
			</div>

			{/* 用法说明 */}
			<div style={demoSectionStyle}>
				<h3>方法说明</h3>
				<ul style={{ paddingLeft: "20px", margin: 0 }}>
					<li>
						<strong>run</strong>: 触发执行防抖函数，函数参数将会传递给原始函数
					</li>
					<li>
						<strong>cancel</strong>: 取消当前防抖，清除定时器
					</li>
					<li>
						<strong>flush</strong>: 立即调用当前防抖函数，并清除定时器
					</li>
				</ul>
			</div>
		</div>
	);
};

// 样式定义
const demoSectionStyle: React.CSSProperties = {
	marginBottom: "20px",
	padding: "15px",
	backgroundColor: "#fafafa",
	borderRadius: "8px",
	border: "1px solid #e0e0e0",
};

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

export default DebounceFnDemo;
