import { useState, useRef } from "react";
import { useClickAway } from "@xumi/rhooks";

function PopupDemo() {
	const [visible, setVisible] = useState(false);
	const popupRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useClickAway(() => {
		setVisible(false);
	}, [popupRef, buttonRef]);

	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "10px",
				border: "1px solid #ccc",
			}}
		>
			<h2>Popup Demo</h2>
			<button
				ref={buttonRef}
				onClick={() => setVisible(!visible)}
				style={{
					marginBottom: 16,
					padding: "8px 16px",
					backgroundColor: "#007bff",
					color: "white",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				{visible ? "关闭" : "打开"}弹窗
			</button>
			{visible && (
				<div
					ref={popupRef}
					style={{
						width: 300,
						padding: 16,
						background: "#f5f5f5",
						border: "1px solid #e0e0e0",
						borderRadius: 4,
						boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
						position: "fixed",
						top: "100px",
						left: "50px",
						zIndex: 1000,
					}}
				>
					<h4>弹窗内容</h4>
					<p>点击弹窗外部区域关闭弹窗</p>
					<p>点击按钮不会关闭弹窗</p>
				</div>
			)}
		</div>
	);
}

export default PopupDemo;
