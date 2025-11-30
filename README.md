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

const [count, setCount] = useState(0);

useInterval(() => {
	setCount(count + 1);
}, 1000);
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
