import React, { useState, useEffect } from "react";
import { usePrevious } from "../../src";

// 定义变化记录的类型
interface ChangeRecord {
	property: string;
	from: unknown;
	to: unknown;
}

// 比较变化方向示例
const CompareChanges: React.FC = () => {
	const [count, setCount] = useState(0);
	const previousCount = usePrevious(count);
	const [direction, setDirection] = useState("");

	useEffect(() => {
		if (previousCount !== undefined) {
			if (count > previousCount) {
				setDirection("增加");
			} else if (count < previousCount) {
				setDirection("减少");
			}
		}
	}, [count, previousCount]);

	return (
		<div style={demoSectionStyle}>
			<h3>1. 比较变化方向</h3>
			<p>当前值: {count}</p>
			<p>上一次的值: {previousCount}</p>
			<p>变化方向: {direction}</p>
			<div style={buttonGroupStyle}>
				<button onClick={() => setCount(count + 1)} style={buttonStyle}>
					增加
				</button>
				<button onClick={() => setCount(count - 1)} style={buttonStyle}>
					减少
				</button>
			</div>
		</div>
	);
};

// 对象属性变化监控示例
const ObjectPropertyMonitor: React.FC = () => {
	const [user, setUser] = useState({
		name: "张三",
		age: 25,
		role: "开发者",
	});
	const previousUser = usePrevious(user);

	const [changes, setChanges] = useState<ChangeRecord[]>([]);

	// 检测对象属性变化
	useEffect(() => {
		if (previousUser) {
			const changedProps: ChangeRecord[] = [];
			Object.keys(user).forEach((key) => {
				if (
					user[key as keyof typeof user] !==
					previousUser[key as keyof typeof user]
				) {
					changedProps.push({
						property: key,
						from: previousUser[key as keyof typeof user],
						to: user[key as keyof typeof user],
					});
				}
			});

			if (changedProps.length > 0) {
				setChanges((prev) => {
					// 创建一个Map来确保每个属性只保留最新的变化记录
					const changeMap = new Map<string, ChangeRecord>();

					// 首先添加所有之前的变化记录
					prev.forEach((change) => {
						changeMap.set(change.property, change);
					});

					// 然后添加当前的变化记录，覆盖相同属性的旧记录
					changedProps.forEach((change) => {
						changeMap.set(change.property, change);
					});

					// 转换回数组
					return Array.from(changeMap.values());
				});
			}
		}
	}, [user, previousUser]);

	const updateUser = <K extends keyof typeof user>(
		field: K,
		value: (typeof user)[K]
	) => {
		setUser({
			...user,
			[field]: value,
		});
	};

	return (
		<div style={demoSectionStyle}>
			<h3>2. 对象属性监控</h3>
			<div>
				<label>姓名: </label>
				<input
					value={user.name}
					onChange={(e) => updateUser("name", e.target.value)}
					style={inputStyle}
				/>
			</div>
			<div>
				<label>年龄: </label>
				<input
					type="number"
					value={user.age}
					onChange={(e) => updateUser("age", Number(e.target.value))}
					style={inputStyle}
				/>
			</div>
			<div>
				<label>角色: </label>
				<select
					value={user.role}
					onChange={(e) => updateUser("role", e.target.value)}
					style={inputStyle}
				>
					<option value="开发者">开发者</option>
					<option value="设计师">设计师</option>
					<option value="产品经理">产品经理</option>
				</select>
			</div>

			{changes.length > 0 && (
				<div
					style={{
						marginTop: "15px",
						padding: "10px",
						backgroundColor: "#f0f0f0",
						borderRadius: "4px",
					}}
				>
					<h4>最近的变化:</h4>
					<ul>
						{changes.map((change: any, index: number) => (
							<li key={index}>
								{change.property}: {String(change.from)} → {String(change.to)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const PreviousDemo: React.FC = () => {
	return (
		<div
			style={{
				marginBottom: "20px",
				padding: "15px",
				border: "1px solid #ccc",
				borderRadius: "8px",
			}}
		>
			<h2>usePrevious Hook Demo</h2>
			<CompareChanges />
			<ObjectPropertyMonitor />
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

const inputStyle: React.CSSProperties = {
	margin: "5px",
	padding: "6px",
	border: "1px solid #ccc",
	borderRadius: "4px",
	fontSize: "14px",
};

export default PreviousDemo;
