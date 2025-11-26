import React from "react";
import { useScroll } from "@xumi/rhooks";

const ScrollDemo: React.FC = () => {
	const scrollRef = React.useRef<HTMLDivElement>(null);
	const scroll = useScroll(scrollRef, { wait: 100 });

	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "10px",
				border: "1px solid #ccc",
			}}
		>
			<h2>useScroll Demo</h2>
			<p>Scroll position: {JSON.stringify(scroll)}</p>
			<div
				ref={scrollRef}
				style={{
					width: "300px",
					height: "200px",
					border: "1px solid #e8e8e8",
					overflow: "auto",
				}}
			>
				<div style={{ height: "500px", width: "500px" }}>
					<p>这是一个可滚动的区域。</p>
					<p>请尝试滚动查看效果。</p>
					<p>useScroll hook 会跟踪并返回当前的滚动位置。</p>
					<p>Scroll position X: {scroll.x}</p>
					<p>Scroll position Y: {scroll.y}</p>
					<p>-----------------------------</p>
					<p>更多内容...</p>
					<p>-----------------------------</p>
					<p>底部内容</p>
				</div>
			</div>
		</div>
	);
};

export default ScrollDemo;
