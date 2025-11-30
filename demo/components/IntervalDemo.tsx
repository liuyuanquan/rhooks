import React, { useState } from "react";
import { useInterval } from "../../src/useInterval";

const IntervalDemo: React.FC = () => {
	const [count, setCount] = useState(0);
	const [delay, setDelay] = useState<number | null>(1000);
	const [isRunning, setIsRunning] = useState(true);

	// 基本用法
	const { clear } = useInterval(
		() => {
			setCount((c) => c + 1);
		},
		isRunning ? delay : null
	);

	// 立即执行的用法
	const [immediateCount, setImmediateCount] = useState(0);
	useInterval(
		() => {
			setImmediateCount((c) => c + 1);
		},
		isRunning ? delay : null,
		{ immediate: true }
	);

	const toggleRunning = () => {
		setIsRunning(!isRunning);
	};

	const resetCount = () => {
		setCount(0);
		setImmediateCount(0);
	};

	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "10px",
				border: "1px solid #ccc",
			}}
		>
			<h2>useInterval Demo</h2>

			<div style={{ marginBottom: "10px" }}>
				<label>
					延迟时间 (ms):
					<input
						type="number"
						value={delay || 0}
						onChange={(e) =>
							setDelay(e.target.value ? Number(e.target.value) : null)
						}
						style={{ marginLeft: "10px" }}
					/>
				</label>
			</div>

			<div style={{ marginBottom: "10px" }}>
				<button onClick={toggleRunning}>{isRunning ? "停止" : "开始"}</button>
				<button onClick={resetCount} style={{ marginLeft: "10px" }}>
					重置计数器
				</button>
				<button onClick={clear} style={{ marginLeft: "10px" }}>
					清除定时器
				</button>
			</div>

			<div>
				<p>基本计数器: {count}</p>
				<p>立即执行计数器: {immediateCount}</p>
				<p>状态: {isRunning ? "运行中" : "已停止"}</p>
			</div>
		</div>
	);
};

export default IntervalDemo;
