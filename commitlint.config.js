export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"body-max-line-length": [0, "always", Infinity], // 禁用 body 最大行长度限制
	},
};
