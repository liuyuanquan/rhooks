import React, { useState } from "react";
import { useToggle } from "../../src";

// 基本用法示例
const Demo: React.FC = () => {
	const [state, toggle, set] = useToggle("开", "关");

	return (
		<div style={demoSectionStyle}>
			<h3>1. 基本用法</h3>
			<p>当前状态: {state}</p>
			<div style={buttonGroupStyle}>
				<button onClick={toggle} style={buttonStyle}>
					切换
				</button>
				<button onClick={() => set("开")} style={buttonStyle}>
					设置为「开」
				</button>
				<button onClick={() => set("关")} style={buttonStyle}>
					设置为「关」
				</button>
			</div>
		</div>
	);
};

// 多状态切换示例
const MultiStateToggle: React.FC = () => {
	const states = ["待办", "进行中", "已完成", "已取消"];
	const [currentIndex, setCurrentIndex] = useState(0);
	const [state, toggle] = useToggle(states[0], states[1]);

	const handleClick = () => {
		const nextIndex = (currentIndex + 1) % states.length;
		setCurrentIndex(nextIndex);
		toggle();
		// 如果需要循环切换多个状态，可以使用 set 方法
		// set(states[nextIndex]);
	};

	return (
		<div style={demoSectionStyle}>
			<h3>2. 多状态切换</h3>
			<p>当前状态: {state}</p>
			<div style={buttonGroupStyle}>
				<button onClick={handleClick} style={buttonStyle}>
					切换到下一个状态
				</button>
			</div>
		</div>
	);
};

// 主组件
const ToggleDemo: React.FC = () => {
	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "15px",
				border: "1px solid #ccc",
				borderRadius: "8px",
			}}
		>
			<h2>useToggle Hook Demo</h2>
			<Demo />
			<MultiStateToggle />
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

const buttonGroupStyle: React.CSSProperties = {
	display: "flex",
	gap: "10px",
	marginTop: "10px",
	flexWrap: "wrap",
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

export default ToggleDemo;
