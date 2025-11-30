# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2025-04-05

### Removed

- 移除未使用的 commit-helper.js 脚本文件
- 移除空的 scripts 目录

### Changed

- 清理项目结构，移除不必要的文件

## [1.1.1] - 2025-04-05

### Added

- 添加 useScroll hook
- 添加 useScroll hook 的文档和示例
- 添加 useScroll 到导出模块
- 添加 useClickAway hook 支持数组形式的 targetRef 参数
- 添加 useClickAway 多目标元素示例 (MultiClickAwayDemo)
- 添加 useClickAway 弹窗示例 (PopupDemo)

### Changed

- 重构 demo 页面，将 useScroll demo 移到独立组件
- 更新 README.md，添加 useScroll 文档
- 更新包描述为中文
- 优化 useClickAway hook 的类型定义，支持不同类型的 HTMLElement

### Fixed

- 修复 useScroll hook 中的类型定义问题
- 移除 useScroll hook 中不必要的 getElement 函数
- 修复 useClickAway hook 中的 TypeScript 类型错误
- 修复 useClickAway hook 处理不同 HTMLElement 类型时的兼容性问题
