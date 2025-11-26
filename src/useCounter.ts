import { useState, useCallback } from 'react'

/**
 * 计数器 hook
 * @param initialValue 初始值，默认为 0
 * @returns 返回当前值、增加、减少、重置和设置值的函数
 * 
 * @example
 * ```tsx
 * const [count, increment, decrement, reset, setCount] = useCounter(0)
 * 
 * <button onClick={increment}>+</button>
 * <button onClick={decrement}>-</button>
 * <button onClick={reset}>Reset</button>
 * ```
 */
export function useCounter(initialValue: number = 0) {
    const [count, setCount] = useState(initialValue)

    const increment = useCallback(() => {
        setCount((prev) => prev + 1)
    }, [])

    const decrement = useCallback(() => {
        setCount((prev) => prev - 1)
    }, [])

    const reset = useCallback(() => {
        setCount(initialValue)
    }, [initialValue])

    const setValue = useCallback((value: number | ((prev: number) => number)) => {
        setCount(value)
    }, [])

    return [count, increment, decrement, reset, setValue] as const
}

