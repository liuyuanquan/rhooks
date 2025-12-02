# rhooks

A collection of useful React hooks built with TypeScript.

## Installation

```bash
npm install rhooks
# or
pnpm add rhooks
# or
yarn add rhooks
```

## Available Hooks

- [`useToggle`](#usetoggle) - Toggle boolean values
- [`useDebounce`](#usedebounce) - Debounce value changes
- [`useThrottle`](#usethrottle) - Throttle function execution
- [`useLocalStorage`](#uselocalstorage) - Manage localStorage values
- [`usePrevious`](#useprevious) - Access previous prop or state values
- [`useClickAway`](#useclickaway) - Detect clicks outside of one or more elements
- [`useWindowSize`](#usewindowsize) - Get window dimensions
- [`useCounter`](#usecounter) - Counter with increment, decrement, reset
- [`useTimeout`](#usetimeout) - setTimeout wrapper
- [`useInterval`](#useinterval) - setInterval wrapper
- [`useFetch`](#usefetch) - Data fetching with loading and error states
- [`useMount`](#usemount) - Run effect on mount only
- [`useUnmount`](#useunmount) - Run effect on unmount only
- [`useUpdateEffect`](#useupdateeffect) - Run effect on updates only
- [`useScroll`](#usescroll) - Get scroll position of an element

## Hook Details

### useToggle

用于切换布尔值的 hook。

```tsx
import { useToggle } from 'rhooks'

const [isOpen, toggle, open, close] = useToggle(false)

<button onClick={toggle}>Toggle</button>
<button onClick={open}>Open</button>
<button onClick={close}>Close</button>
```

### useDebounce

防抖 hook，延迟执行。

```tsx
import { useDebounce } from "rhooks";

const [input, setInput] = useState("");
const debouncedInput = useDebounce(input, 500);

useEffect(() => {
	// 在用户停止输入 500ms 后执行
	console.log(debouncedInput);
}, [debouncedInput]);
```

### useThrottle

节流 hook，限制执行频率。

```tsx
import { useThrottle } from "rhooks";

const [scrollY, setScrollY] = useState(0);
const throttledScrollY = useThrottle(scrollY, 100);
```

### useLocalStorage

本地存储 hook。

```tsx
import { useLocalStorage } from 'rhooks'

const [user, setUser, removeUser] = useLocalStorage('user', { name: 'John' })

<button onClick={() => setUser({ name: 'Jane' })}>Update</button>
<button onClick={removeUser}>Remove</button>
```

### usePrevious

获取上一次的值。

```tsx
import { usePrevious } from "rhooks";

const [count, setCount] = useState(0);
const prevCount = usePrevious(count);
```

### useWindowSize

获取窗口尺寸。

```tsx
import { useWindowSize } from "rhooks";

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
import { useCounter } from 'rhooks'

const [count, increment, decrement, reset, setCount] = useCounter(0)

<button onClick={increment}>+</button>
<button onClick={decrement}>-</button>
<button onClick={reset}>Reset</button>
```

### useTimeout

定时器 hook。

```tsx
import { useTimeout } from "rhooks";

const clear = useTimeout(() => {
	console.log("Executed after 1 second");
}, 1000);

// 可以手动清除
clear();
```

### useInterval

循环定时器 hook。

```tsx
import { useInterval } from "rhooks";
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

### useFetch

数据获取 hook。

```tsx
import { useFetch } from "rhooks";

const { data, loading, error, refetch } = useFetch<User>("/api/user");

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
return <div>{data?.name}</div>;
```

### useMount

组件挂载时执行。

```tsx
import { useMount } from "rhooks";

useMount(() => {
	console.log("Component mounted");
});
```

### useUnmount

组件卸载时执行。

```tsx
import { useUnmount } from "rhooks";

useUnmount(() => {
	console.log("Component unmounted");
});
```

### useUpdateEffect

只在依赖更新时执行的 effect，跳过首次渲染。

```tsx
import { useUpdateEffect } from "rhooks";

useUpdateEffect(() => {
	console.log("Updated:", count);
}, [count]);
```

### useScroll

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
import { useRequest } from "rhooks";

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
import { useClickAway } from "rhooks";

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

获取元素的滚动位置。

```tsx
import { useScroll } from "rhooks";
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

## License

MIT

## 更新日志

### v1.1.2

- 清理项目结构，移除未使用的 commit-helper.js 脚本文件和空的 scripts 目录
