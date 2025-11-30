#!/usr/bin/env node

import { execSync } from "child_process";
import readline from "readline";

// 定义提交类型
const types = [
	"feat:     新功能",
	"fix:      修复错误",
	"docs:     文档更新",
	"style:    代码格式调整",
	"refactor: 重构",
	"perf:     性能优化",
	"test:     测试相关",
	"build:    构建系统或外部依赖的更改",
	"ci:       CI 配置文件和脚本的更改",
	"chore:    不修改 src 或测试文件的其他更改",
	"revert:   回滚之前的提交",
];

// 显示提交类型选择
console.log("请选择提交类型:");
types.forEach((type, index) => {
	console.log(`${index + 1}. ${type}`);
});

// 获取用户选择
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("请输入数字选择类型: ", (typeIndex) => {
	if (isNaN(typeIndex) || typeIndex < 1 || typeIndex > types.length) {
		console.error("无效的选择");
		rl.close();
		process.exit(1);
	}

	const selectedType = types[typeIndex - 1].split(":")[0];

	rl.question("请输入提交范围 (可选，直接回车跳过): ", (scope) => {
		rl.question("请输入提交描述: ", (subject) => {
			if (!subject) {
				console.error("提交描述不能为空");
				rl.close();
				process.exit(1);
			}

			// 构造提交信息
			const commitMessage = scope
				? `${selectedType}(${scope}): ${subject}`
				: `${selectedType}: ${subject}`;

			try {
				// 执行 git commit
				execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
				console.log("提交成功！");
			} catch (error) {
				console.error("提交失败:", error.message);
				process.exit(1);
			}

			rl.close();
		});
	});
});
