import React, { useState } from "react";
import { useTimeout } from "../../src/useTimeout";

const TimeoutDemo: React.FC = () => {
	const [count, setCount] = useState(0);
	const [delay, setDelay] = useState(3000);
	const [message, setMessage] = useState("等待超时执行...");

	// 使用 useTimeout hook
	// 这里展示了为什么我们需要保存最新的回调函数：
	// 即使 count 发生变化，定时器也会调用最新的回调函数版本
	const { clear } = useTimeout(() => {
		setMessage(`超时回调已执行! 计数: ${count}`);
		setCount(count + 1);
	}, delay);

	return (
		<div
			style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}
		>
			<h2>useTimeout 示例</h2>
			<p>{message}</p>
			<p>计数: {count}</p>
			<div>
				<label>
					延迟时间 (ms):
					<input
						type="number"
						value={delay}
						onChange={(e) => setDelay(Number(e.target.value))}
						style={{ marginLeft: "10px" }}
					/>
				</label>
			</div>
			<button onClick={() => setMessage("重新开始计时...")}>重新开始</button>
			<button onClick={clear} style={{ marginLeft: "10px" }}>
				清除超时
			</button>
		</div>
	);
};

export default TimeoutDemo;
