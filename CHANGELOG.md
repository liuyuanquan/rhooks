# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.9] - 2025-12-02

### Updated

- 使用 useToggle 实现 useBoolean Hook，复用代码逻辑
- 保持 useBoolean 的原有 API 接口不变
- 修复了 ToggleDemo 中的未使用变量警告

## [1.1.8] - 2025-12-02

### Updated

- 扩展 useToggle Hook，支持在两个任意类型的值之间切换
- 更新 useToggle Hook 的 API，返回 [state, toggle, set] 格式
- 添加 useToggle Hook 的泛型支持，支持 T 和 U 两种类型

### Added

- 添加 ToggleDemo 组件，展示 useToggle Hook 的多种用法
  - 基本用法：在「开」和「关」之间切换
  - 多状态切换：循环切换多个状态

## [1.1.7] - 2025-12-02

### Fixed

- 修复 usePrevious Hook 的值更新时机问题，确保正确获取上一次的值
- 修复 PreviousDemo 中的类型错误，添加 ChangeRecord 接口定义

### Added

- 添加 PreviousDemo 组件，展示 usePrevious Hook 的多种用法
  - CompareChanges：比较值的变化方向
  - ObjectPropertyMonitor：监控对象属性变化

### Updated

- 优化 ObjectPropertyMonitor 组件的变化记录逻辑，确保每个属性只显示最新的一次变化
- 更新 usePrevious Hook 的实现，从 useEffect 改为直接在渲染期间更新 ref

## [1.1.6] - 2025-12-02

### Removed

- 删除 useLocalStorage hook，由 useLocalStorageState 替代

### Added

- 添加 useLocalStorageState hook，将状态存储在 localStorage 中
- 添加 LocalStorageStateDemo 组件，展示 useLocalStorageState 的各种用法

### Updated

- 更新 README.md，移除 useLocalStorage 相关文档
- 更新 index.ts，移除 useLocalStorage 导出

## [1.1.5] - 2025-12-02

### Added

- 添加 useBoolean hook，用于管理布尔值状态
- 添加 useBoolean hook 的文档和示例

### Fixed

- 修复 BooleanDemo 中的 CSS 样式错误，移除不支持的伪类选择器

## [1.1.4] - 2025-12-02

### Fixed

- 修复 useRequest hook 中的 TypeScript 类型错误，将 any[] 替换为 unknown[]

## [1.1.3] - 2025-04-05

### Added

- 添加 useRequest hook，一个强大的异步数据管理 Hook
- 添加 useRequest hook 的文档和示例
- 添加 useRequest 到导出模块

### Changed

- 简化 useRequest hook 的 Options 参数，移除 pollingInterval、debounceWait、refreshOnWindowFocus、focusTimespan 和 immediate 参数

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
