# 提交信息规范

本项目使用约定式提交（Conventional Commits）规范来管理提交信息。

## 提交格式

每条提交信息包含以下结构：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型（Type）

必须是以下之一：

- **feat**: 新功能（feature）
- **fix**: 修复错误（bug fix）
- **docs**: 文档更新
- **style**: 代码格式调整（不影响代码含义的更改，如空格、格式化、缺少分号等）
- **refactor**: 重构（既不修复错误也不添加功能的代码更改）
- **perf**: 性能优化
- **test**: 测试相关
- **build**: 构建系统或外部依赖的更改
- **ci**: CI 配置文件和脚本的更改
- **chore**: 不修改 src 或测试文件的其他更改
- **revert**: 回滚之前的提交

### 范围（Scope）

可选，用于指定提交影响的范围，例如：`hook`、`demo`、`build` 等。

### 主题（Subject）

必需，对更改的简短描述：

- 使用祈使句、现在时态："change" 而不是 "changed" 或 "changes"
- 不要首字母大写
- 不要以句号结尾

### 正确示例

```
feat(useClickAway): 添加多目标元素支持

修复了 useClickAway hook 中的 TypeScript 类型错误，使其能够正确处理不同类型的 HTMLElement。同时更新了类型定义以支持单个或多个目标元素。

修复 #123
```

### 错误示例

```
修复了 useClickAway hook 的问题
```

## 提交信息校验

项目已配置 Husky 和 commitlint 来自动校验提交信息是否符合规范。如果提交信息不符合规范，提交将被拒绝。

为了帮助开发者更容易地遵循提交规范，项目还提供了一个交互式提交辅助脚本：

```bash
npm run commit
```

运行此命令将引导您完成提交过程，包括选择提交类型、输入范围和描述。

## 参考

- [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
