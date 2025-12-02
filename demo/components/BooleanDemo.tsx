import React from "react";
import { useBoolean } from "../../src";

const BooleanDemo: React.FC = () => {
	// 基本用法
	const [isOpen, { toggle, setTrue, setFalse, set }] = useBoolean(false);

	// 初始值为 true
	const [isVisible, { toggle: toggleVisible }] = useBoolean(true);

	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "15px",
				border: "1px solid #ccc",
				borderRadius: "8px",
			}}
		>
			<h2>useBoolean Hook Demo</h2>

			<div style={{ marginBottom: "30px" }}>
				<h3>基本用法</h3>
				<div style={{ marginBottom: "10px" }}>
					<strong>状态:</strong> {isOpen ? "打开" : "关闭"}
				</div>
				<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
					<button onClick={toggle} style={buttonStyle}>
						切换状态
					</button>
					<button onClick={setTrue} style={buttonStyle}>
						设置为打开
					</button>
					<button onClick={setFalse} style={buttonStyle}>
						设置为关闭
					</button>
					<button onClick={() => set(true)} style={buttonStyle}>
						手动设置为打开
					</button>
					<button onClick={() => set(false)} style={buttonStyle}>
						手动设置为关闭
					</button>
				</div>
			</div>

			<div style={{ marginBottom: "30px" }}>
				<h3>初始值为 true</h3>
				<div style={{ marginBottom: "10px" }}>
					<strong>可见性:</strong> {isVisible ? "可见" : "隐藏"}
				</div>
				<div>
					<button onClick={toggleVisible} style={buttonStyle}>
						{isVisible ? "隐藏" : "显示"}
					</button>
				</div>
			</div>

			<div>
				<h3>表单应用</h3>
				<form
					onSubmit={(e) => e.preventDefault()}
					style={{ maxWidth: "300px" }}
				>
					<div style={{ marginBottom: "15px" }}>
						<label style={{ display: "block", marginBottom: "5px" }}>
							<input
								type="checkbox"
								checked={isOpen}
								onChange={(e) => set(e.target.checked)}
								style={{ marginRight: "5px" }}
							/>
							启用功能
						</label>
					</div>
					<div>
						<button type="submit" style={buttonStyle}>
							提交表单
						</button>
					</div>
				</form>
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

export default BooleanDemo;
