import { useThrottleFn } from "../../src";
import React, { useState, useEffect } from "react";

/**
 * Leading 模式示例
 * 在延迟开始前立即执行，但 500ms 内只会执行一次
 */
function LeadingOnlyDemo() {
	const [value, setValue] = useState(0);

	const { run } = useThrottleFn(
		() => {
			setValue((prev) => prev + 1);
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
			<p>点击按钮会立即执行，但 500ms 内只会执行一次，且不会在结束时额外执行</p>
			<button onClick={run}>点击 +1</button>
		</div>
	);
}

/**
 * Trailing 模式示例
 * 在延迟结束后执行最后一次调用
 */
function TrailingOnlyDemo() {
	const [value, setValue] = useState(0);

	const { run } = useThrottleFn(
		() => {
			setValue((prev) => prev + 1);
		},
		{
			wait: 500,
			leading: false, // 在延迟开始前不执行
			trailing: true, // 在延迟结束后执行
		}
	);

	return (
		<div>
			<p>当前值: {value}</p>
			<p>点击按钮不会立即执行，而是等待 500ms 后执行最后一次调用</p>
			<button onClick={run}>点击 +1</button>
		</div>
	);
}

/**
 * 滚动节流示例
 * 对比不使用节流和使用节流的滚动事件处理
 */
function ScrollDemo() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollCount, setScrollCount] = useState(0);
	const [throttledCount, setThrottledCount] = useState(0);

	// 不使用节流的滚动处理
	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY);
			setScrollCount((c) => c + 1);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// 使用节流的滚动处理
	const { run: handleThrottledScroll } = useThrottleFn(
		() => {
			setThrottledCount((c) => c + 1);
		},
		{
			wait: 200,
		}
	);

	useEffect(() => {
		window.addEventListener("scroll", handleThrottledScroll);
		return () => {
			window.removeEventListener("scroll", handleThrottledScroll);
		};
	}, [handleThrottledScroll]);

	return (
		<div style={{ height: "200vh" }}>
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					background: "#fff",
					padding: 16,
					borderBottom: "1px solid #e8e8e8",
					zIndex: 1000,
				}}
			>
				<p>滚动位置: {scrollPosition}px</p>
				<p>滚动事件触发次数: {scrollCount}</p>
				<p>节流后的触发次数: {throttledCount}</p>
				<p>请滚动页面查看效果</p>
			</div>
		</div>
	);
}

/**
 * 基本用法示例
 */
function BasicDemo() {
	const [value, setValue] = useState(0);
	const [callCount, setCallCount] = useState(0);

	const { run, cancel, flush } = useThrottleFn(
		() => {
			setValue((prev) => prev + 1);
		},
		{
			wait: 1000,
		}
	);

	return (
		<div>
			<p>当前值: {value}</p>
			<p>调用次数: {callCount}</p>
			<div style={{ display: "flex", gap: 8, marginTop: 16 }}>
				<button
					onClick={() => {
						setCallCount((c) => c + 1);
						run();
					}}
				>
					点击 +1
				</button>
				<button onClick={cancel}>取消</button>
				<button onClick={flush}>立即执行</button>
			</div>
			<p style={{ marginTop: 16, color: "#666" }}>
				快速点击按钮，观察节流效果。1秒内最多执行一次。
			</p>
		</div>
	);
}

/**
 * Leading 和 Trailing 同时开启示例
 */
function BothDemo() {
	const [value, setValue] = useState(0);
	const [log, setLog] = useState<string[]>([]);

	const { run } = useThrottleFn(
		() => {
			const time = new Date().toLocaleTimeString();
			setValue((prev) => prev + 1);
			setLog((prev) => [...prev, `执行于 ${time}`]);
		},
		{
			wait: 1000,
			leading: true, // 首次调用立即执行
			trailing: true, // 延迟结束后也执行
		}
	);

	return (
		<div>
			<p>当前值: {value}</p>
			<p>Leading 和 Trailing 都开启：首次调用立即执行，延迟结束后也会执行</p>
			<button onClick={run}>点击 +1</button>
			<div style={{ marginTop: 16 }}>
				<p>执行日志：</p>
				<ul style={{ maxHeight: 200, overflow: "auto", paddingLeft: 20 }}>
					{log.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

/**
 * useThrottleFn Hook Demo
 */
const ThrottleFnDemo: React.FC = () => {
	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "10px",
				border: "1px solid #ccc",
			}}
		>
			<h2>useThrottleFn Hook Demo</h2>

			<div style={{ marginTop: 32 }}>
				<h3>基本用法</h3>
				<div
					style={{ padding: 16, border: "1px solid #e8e8e8", borderRadius: 4 }}
				>
					<BasicDemo />
				</div>
			</div>

			<div style={{ marginTop: 32 }}>
				<h3>Leading 模式（延迟开始前执行）</h3>
				<div
					style={{ padding: 16, border: "1px solid #e8e8e8", borderRadius: 4 }}
				>
					<LeadingOnlyDemo />
				</div>
			</div>

			<div style={{ marginTop: 32 }}>
				<h3>Trailing 模式（延迟结束后执行）</h3>
				<div
					style={{ padding: 16, border: "1px solid #e8e8e8", borderRadius: 4 }}
				>
					<TrailingOnlyDemo />
				</div>
			</div>

			<div style={{ marginTop: 32 }}>
				<h3>Leading 和 Trailing 同时开启</h3>
				<div
					style={{ padding: 16, border: "1px solid #e8e8e8", borderRadius: 4 }}
				>
					<BothDemo />
				</div>
			</div>

			<div style={{ marginTop: 32 }}>
				<h3>滚动节流示例</h3>
				<div
					style={{
						border: "1px solid #e8e8e8",
						borderRadius: 4,
						overflow: "hidden",
					}}
				>
					<ScrollDemo />
				</div>
			</div>
		</div>
	);
};

export default ThrottleFnDemo;
