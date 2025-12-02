# @xumi/rhooks

A collection of useful React hooks built with TypeScript.

**English** | [中文](./README.zh-CN.md)

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

Toggle boolean values.

```tsx
import { useToggle } from '@xumi/rhooks'

const [isOpen, toggle, open, close] = useToggle(false)

<button onClick={toggle}>Toggle</button>
<button onClick={open}>Open</button>
<button onClick={close}>Close</button>
```

### useBoolean

Manage boolean state with multiple methods.

```tsx
import { useBoolean } from '@xumi/rhooks'

const [isOpen, { toggle, setTrue, setFalse, set }] = useBoolean(false)

<button onClick={toggle}>Toggle</button>
<button onClick={setTrue}>Open</button>
<button onClick={setFalse}>Close</button>
<button onClick={() => set(true)}>Set True</button>
```

### useLocalStorageState

Manage state with localStorage persistence. State persists after page refresh.

```tsx
import { useLocalStorageState } from "@xumi/rhooks";

// Basic usage
const [count, setCount] = useLocalStorageState<number>("count", {
	defaultValue: 0,
});

// Custom serializer and deserializer
const [user, setUser] = useLocalStorageState<User>("user", {
	defaultValue: { name: "John" },
	serializer: (value) => JSON.stringify(value),
	deserializer: (value) => JSON.parse(value),
});

// Function as default value
const [data, setData] = useLocalStorageState<Data>("data", {
	defaultValue: () => fetchInitialData(),
});
```

### useDebounceFn

Debounce function execution.

```tsx
import { useDebounceFn } from "@xumi/rhooks";

const { run, cancel, flush } = useDebounceFn(
	(value: string) => {
		console.log(value);
	},
	{ wait: 500 }
);

// Call run to trigger debounce
run("hello");

// Cancel pending debounced function
cancel();

// Execute immediately and return result
const result = flush();
```

#### Options

- `wait`: Debounce wait time in milliseconds, default 1000ms
- `leading`: Whether to call function before delay starts, default false
- `trailing`: Whether to call function after delay ends, default true
- `maxWait`: Maximum wait time in milliseconds, used to set the maximum delay time for debounced function

### useThrottleFn

Throttle function execution. Execute at most once within a fixed time interval.

```tsx
import { useThrottleFn } from "@xumi/rhooks";

const { run, cancel, flush } = useThrottleFn(
	(value: string) => {
		console.log(value);
	},
	{ wait: 500 }
);

// Call run to trigger throttle
run("hello");

// Cancel pending throttled function
cancel();

// Execute immediately and return result
const result = flush();
```

#### Options

- `wait`: Throttle wait time in milliseconds, default 1000ms
- `leading`: Whether to call function before delay starts, default true
- `trailing`: Whether to call function after delay ends, default true

#### Difference from useDebounceFn

- **Debounce**: Execute after events stop triggering, suitable for search input, window resize, etc.
- **Throttle**: Execute at most once within a fixed time interval, suitable for scroll events, mouse movement, etc.

### usePrevious

Access previous prop or state values.

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

Counter hook with increment, decrement, and reset.

```tsx
import { useCounter } from '@xumi/rhooks'

const [count, increment, decrement, reset, setCount] = useCounter(0)

<button onClick={increment}>+</button>
<button onClick={decrement}>-</button>
<button onClick={reset}>Reset</button>
```

### useTimeout

setTimeout wrapper hook.

```tsx
import { useTimeout } from "@xumi/rhooks";

const clear = useTimeout(() => {
	console.log("Executed after 1 second");
}, 1000);

// Can be manually cleared
clear();
```

### useInterval

setInterval wrapper hook.

```tsx
import { useInterval } from "@xumi/rhooks";
import { useState, useRef } from "react";

const [count, setCount] = useState(0);

// Basic usage
const { clear } = useInterval(() => {
	setCount(count + 1);
}, 1000);

// Immediate execution
const { clear: clear2 } = useInterval(
	() => {
		setCount(count + 1);
	},
	1000,
	{ immediate: true }
);

// Manually clear the timer
clear();
```

### useMount

Run effect on mount only.

```tsx
import { useMount } from "@xumi/rhooks";

useMount(() => {
	console.log("Component mounted");
});
```

### useUnmount

Run effect on unmount only.

```tsx
import { useUnmount } from "@xumi/rhooks";

useUnmount(() => {
	console.log("Component unmounted");
});
```

### useUpdateEffect

Run effect on updates only, skip initial render.

```tsx
import { useUpdateEffect } from "@xumi/rhooks";

useUpdateEffect(() => {
	console.log("Updated:", count);
}, [count]);
```

### useScroll

Get scroll position of an element.

```tsx
import { useScroll } from "@xumi/rhooks";
import React, { useRef } from "react";

function Demo() {
	const scrollRef = useRef(null);
	const scroll = useScroll(scrollRef);

	return (
		<div>
			<p>Scroll position: {JSON.stringify(scroll)}</p>
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
					This is a scrollable area, try scrolling to see the effect
				</div>
			</div>
		</div>
	);
}
```

### useHover

Detect mouse hover state.

```tsx
import { useHover } from "@xumi/rhooks";

function Demo() {
	const [ref, isHovered] = useHover();

	return <div ref={ref}>{isHovered ? "Hovering" : "Not hovering"}</div>;
}
```

### useRequest

A powerful async data management Hook that encapsulates all aspects of data fetching logic including loading state, data, error, request, cancel, refresh, etc.

#### API

```tsx
const { data, error, loading, run, cancel, refresh, reset } = useRequest(
	service,
	options
);
```

##### Parameters

| Parameter | Description                        | Type                             | Default |
| --------- | ---------------------------------- | -------------------------------- | ------- |
| service   | Request function returning Promise | `(...args: any[]) => Promise<T>` | -       |
| options   | Configuration options              | `Options`                        | -       |

##### Options

| Parameter     | Description                                       | Type                                    | Default              |
| ------------- | ------------------------------------------------- | --------------------------------------- | -------------------- |
| manual        | Whether to trigger request manually               | `boolean`                               | `false`              |
| defaultParams | Default parameters                                | `any[]`                                 | `[]`                 |
| refreshDeps   | Dependency array, auto re-request on change       | `any[]`                                 | `[]`                 |
| cacheKey      | Cache key, enables caching when set               | `string`                                | `-`                  |
| cacheTime     | Cache time in milliseconds                        | `number`                                | `300000` (5 minutes) |
| onSuccess     | Callback on successful request                    | `(data: any, params: any[]) => void`    | `-`                  |
| onError       | Callback on failed request                        | `(error: Error, params: any[]) => void` | `-`                  |
| onFinally     | Callback when request completes (success or fail) | `(params: any[]) => void`               | `-`                  |

##### Return Value

| Parameter | Description               | Type                         |
| --------- | ------------------------- | ---------------------------- |
| data      | Request response data     | `T \| undefined`             |
| error     | Request error information | `Error \| undefined`         |
| loading   | Request loading state     | `boolean`                    |
| run       | Execute request function  | `(...params: any[]) => void` |
| cancel    | Cancel request function   | `() => void`                 |
| refresh   | Refresh request function  | `() => void`                 |
| reset     | Reset state function      | `() => void`                 |

#### Usage Examples

```tsx
import { useRequest } from "@xumi/rhooks";

// Basic usage
const { data, error, loading, run } = useRequest(async () => {
	const response = await fetch("/api/users");
	return response.json();
});

// Request with parameters
const { data, error, loading, run } = useRequest(
	(userId) => fetch(`/api/users/${userId}`).then((res) => res.json()),
	{
		manual: true, // Manual trigger
	}
);

// Using cache
const { data, loading } = useRequest(
	() => fetch("/api/user-info").then((res) => res.json()),
	{
		cacheKey: "user-info",
		cacheTime: 600000, // 10 minutes
	}
);

// Dependency refresh
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

Detect clicks outside of one or more target elements.

```tsx
import { useClickAway } from "@xumi/rhooks";

// Single target element
const ref = useRef<HTMLDivElement>(null);
useClickAway(() => {
	setIsOpen(false);
}, ref);

// Multiple target elements
const ref1 = useRef<HTMLDivElement>(null);
const ref2 = useRef<HTMLButtonElement>(null);
useClickAway(() => {
	setIsOpen(false);
}, [ref1, ref2]);

return (
	<div>
		<button ref={ref2}>Button</button>
		<div ref={ref1}>Content Area</div>
	</div>
);
```

## License

MIT
