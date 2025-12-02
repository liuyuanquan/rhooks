# rhooks

A collection of useful React hooks built with TypeScript.

## Installation

```bash
npm install @xumi/rhooks
# or
pnpm add @xumi/rhooks
# or
yarn add @xumi/rhooks
```

## Available Hooks

- [`useToggle`](#usetoggle) - Toggle boolean values
- [`useBoolean`](#useboolean) - Manage boolean state with multiple methods
- [`useDebounceFn`](#usedebouncefn) - Debounce function execution
- [`useThrottleFn`](#usethrottlefn) - Throttle function execution
- [`useLocalStorageState`](#uselocalstoragestate) - Manage state with localStorage persistence
- [`usePrevious`](#useprevious) - Access previous prop or state values
- [`useClickAway`](#useclickaway) - Detect clicks outside of one or more elements
- [`useWindowSize`](#usewindowsize) - Get window dimensions
- [`useCounter`](#usecounter) - Counter with increment, decrement, reset
- [`useTimeout`](#usetimeout) - setTimeout wrapper
- [`useInterval`](#useinterval) - setInterval wrapper
- [`useMount`](#usemount) - Run effect on mount only
- [`useUnmount`](#useunmount) - Run effect on unmount only
- [`useUpdateEffect`](#useupdateeffect) - Run effect on updates only
- [`useScroll`](#usescroll) - Get scroll position of an element
- [`useHover`](#usehover) - Detect mouse hover state
- [`useRequest`](#userequest) - Powerful async data management Hook

## Hook Details

### useToggle

用于切换布尔值的 hook。

```tsx
import { useToggle } from '@xumi/rhooks'

const [isOpen, toggle, open, close] = useToggle(false)

<button onClick={toggle}>Toggle</button>
<button onClick={open}>Open</button>
<button onClick={close}>Close</button>
```

### useBoolean

用于管理布尔值状态的 hook，返回包含多个方法的对象。

```tsx
import { useBoolean } from '@xumi/rhooks'

const [isOpen, { toggle, setTrue, setFalse, set }] = useBoolean(false)

<button onClick={toggle}>Toggle</button>
<button onClick={setTrue}>Open</button>
<button onClick={setFalse}>Close</button>
<button onClick={() => set(true)}>Set True</button>
```

### useLocalStorageState

将状态存储在 localStorage 中的 hook，页面刷新后状态依然保持。

```tsx
import { useLocalStorageState } from "@xumi/rhooks";

// 基本用法
const [count, setCount] = useLocalStorageState<number>("count", {
	defaultValue: 0,
});

// 使用自定义序列化和反序列化
const [user, setUser] = useLocalStorageState<User>("user", {
	defaultValue: { name: "John" },
	serializer: (value) => JSON.stringify(value),
	deserializer: (value) => JSON.parse(value),
});

// 使用函数作为默认值
const [data, setData] = useLocalStorageState<Data>("data", {
	defaultValue: () => fetchInitialData(),
});
```

### useDebounceFn

防抖函数 Hook，用于防抖执行函数。

```tsx
import { useDebounceFn } from "@xumi/rhooks";

const { run, cancel, flush } = useDebounceFn(
	(value: string) => {
		console.log(value);
	},
	{ wait: 500 }
);

// 调用 run 来触发防抖
run("hello");

// 取消待执行的防抖函数
cancel();

// 立即执行并返回结果
const result = flush();
```

#### 配置选项

- `wait`: 防抖等待时间（毫秒），默认 1000ms
- `leading`: 是否在延迟开始前调用函数，默认 false
- `trailing`: 是否在延迟结束后调用函数，默认 true
- `maxWait`: 最大等待时间（毫秒），用于设置防抖函数的最大延迟时间

### useThrottleFn

节流函数 Hook，用于节流执行函数。在固定时间间隔内最多执行一次。

```tsx
import { useThrottleFn } from "@xumi/rhooks";

const { run, cancel, flush } = useThrottleFn(
	(value: string) => {
		console.log(value);
	},
	{ wait: 500 }
);

// 调用 run 来触发节流
run("hello");

// 取消待执行的节流函数
cancel();

// 立即执行并返回结果
const result = flush();
```

#### 配置选项

- `wait`: 节流等待时间（毫秒），默认 1000ms
- `leading`: 是否在延迟开始前调用函数，默认 true
- `trailing`: 是否在延迟结束后调用函数，默认 true

#### 与 useDebounceFn 的区别

- **防抖（Debounce）**：在事件停止触发后执行，适合搜索框输入、窗口 resize 等场景
- **节流（Throttle）**：在固定时间间隔内最多执行一次，适合滚动事件、鼠标移动等场景

### usePrevious

获取上一次的值。

```tsx
import { usePrevious } from "@xumi/rhooks";

const [count, setCount] = useState(0);
const prevCount = usePrevious(count);
```

### useWindowSize

获取窗口尺寸。

```tsx
import { useWindowSize } from "@xumi/rhooks";

const { width, height } = useWindowSize();

return (
	<div>
		Window size: {width} x {height}
	</div>
);
```

### useCounter

计数器 hook。

```tsx
import { useCounter } from '@xumi/rhooks'

const [count, increment, decrement, reset, setCount] = useCounter(0)

<button onClick={increment}>+</button>
<button onClick={decrement}>-</button>
<button onClick={reset}>Reset</button>
```

### useTimeout

定时器 hook。

```tsx
import { useTimeout } from "@xumi/rhooks";

const clear = useTimeout(() => {
	console.log("Executed after 1 second");
}, 1000);

// 可以手动清除
clear();
```

### useInterval

循环定时器 hook。

```tsx
import { useInterval } from "@xumi/rhooks";
import { useState, useRef } from "react";

const [count, setCount] = useState(0);

// 基本用法
const { clear } = useInterval(() => {
	setCount(count + 1);
}, 1000);

// 立即执行的用法
const { clear: clear2 } = useInterval(
	() => {
		setCount(count + 1);
	},
	1000,
	{ immediate: true }
);

// 手动清除定时器
clear();
```

### useMount

组件挂载时执行。

```tsx
import { useMount } from "@xumi/rhooks";

useMount(() => {
	console.log("Component mounted");
});
```

### useUnmount

组件卸载时执行。

```tsx
import { useUnmount } from "@xumi/rhooks";

useUnmount(() => {
	console.log("Component unmounted");
});
```

### useUpdateEffect

只在依赖更新时执行的 effect，跳过首次渲染。

```tsx
import { useUpdateEffect } from "@xumi/rhooks";

useUpdateEffect(() => {
	console.log("Updated:", count);
}, [count]);
```

### useScroll

获取元素的滚动位置。

```tsx
import { useScroll } from "@xumi/rhooks";
import React, { useRef } from "react";

function Demo() {
	const scrollRef = useRef(null);
	const scroll = useScroll(scrollRef);

	return (
		<div>
			<p>滚动位置: {JSON.stringify(scroll)}</p>
			<div
				style={{
					width: 300,
					height: 200,
					border: "1px solid #e8e8e8",
					overflow: "auto",
				}}
				ref={scrollRef}
			>
				<div style={{ height: 500, width: 500 }}>
					这是一个可滚动的区域，请尝试滚动查看效果
				</div>
			</div>
		</div>
	);
}
```

### useHover

鼠标悬停状态 hook，用于检测元素是否被鼠标悬停。

```tsx
import { useHover } from "@xumi/rhooks";

function Demo() {
	const [ref, isHovered] = useHover();

	return <div ref={ref}>{isHovered ? "鼠标悬停中" : "鼠标未悬停"}</div>;
}
```

### useRequest

一个强大的异步数据管理 Hook，它将数据获取逻辑中的 loading 状态、data、error、请求、取消、刷新等所有环节都封装好了。

#### API

```tsx
const { data, error, loading, run, cancel, refresh, reset } = useRequest(
	service,
	options
);
```

##### 参数

| 参数    | 说明                   | 类型                             | 默认值 |
| ------- | ---------------------- | -------------------------------- | ------ |
| service | 请求函数，返回 Promise | `(...args: any[]) => Promise<T>` | -      |
| options | 配置项                 | `Options`                        | -      |

##### Options

| 参数          | 说明                               | 类型                                    | 默认值            |
| ------------- | ---------------------------------- | --------------------------------------- | ----------------- |
| manual        | 是否手动触发请求                   | `boolean`                               | `false`           |
| defaultParams | 默认参数                           | `any[]`                                 | `[]`              |
| refreshDeps   | 依赖数组，当依赖变化时自动重新请求 | `any[]`                                 | `[]`              |
| cacheKey      | 缓存的键值，设置后会启用缓存       | `string`                                | `-`               |
| cacheTime     | 缓存时间，单位为毫秒               | `number`                                | `300000` (5 分钟) |
| onSuccess     | 请求成功时的回调                   | `(data: any, params: any[]) => void`    | `-`               |
| onError       | 请求失败时的回调                   | `(error: Error, params: any[]) => void` | `-`               |
| onFinally     | 请求完成时的回调（无论成功或失败） | `(params: any[]) => void`               | `-`               |

##### 返回值

| 参数    | 说明           | 类型                         |
| ------- | -------------- | ---------------------------- |
| data    | 请求返回的数据 | `T \| undefined`             |
| error   | 请求错误信息   | `Error \| undefined`         |
| loading | 请求加载状态   | `boolean`                    |
| run     | 执行请求函数   | `(...params: any[]) => void` |
| cancel  | 取消请求函数   | `() => void`                 |
| refresh | 刷新请求函数   | `() => void`                 |
| reset   | 重置状态函数   | `() => void`                 |

#### 使用示例

```tsx
import { useRequest } from "@xumi/rhooks";

// 基本用法
const { data, error, loading, run } = useRequest(async () => {
	const response = await fetch("/api/users");
	return response.json();
});

// 带参数的请求
const { data, error, loading, run } = useRequest(
	(userId) => fetch(`/api/users/${userId}`).then((res) => res.json()),
	{
		manual: true, // 手动触发
	}
);

// 使用缓存
const { data, loading } = useRequest(
	() => fetch("/api/user-info").then((res) => res.json()),
	{
		cacheKey: "user-info",
		cacheTime: 600000, // 10分钟
	}
);

// 依赖刷新
const userId = 1;
const { data, refresh } = useRequest(
	(id) => fetch(`/api/users/${id}`).then((res) => res.json()),
	{
		defaultParams: [userId],
		refreshDeps: [userId],
	}
);
```

### useClickAway

点击外部区域检测，支持单个或多个目标元素。

```tsx
import { useClickAway } from "@xumi/rhooks";

// 单个目标元素
const ref = useRef<HTMLDivElement>(null);
useClickAway(() => {
	setIsOpen(false);
}, ref);

// 多个目标元素
const ref1 = useRef<HTMLDivElement>(null);
const ref2 = useRef<HTMLButtonElement>(null);
useClickAway(() => {
	setIsOpen(false);
}, [ref1, ref2]);

return (
	<div>
		<button ref={ref2}>按钮</button>
		<div ref={ref1}>内容区域</div>
	</div>
);
```

## License

MIT
