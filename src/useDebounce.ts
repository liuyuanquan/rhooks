import { useState, useEffect } from 'react'

/**
 * 防抖 hook
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒），默认为 500ms
 * @returns 防抖后的值
 * 
 * @example
 * ```tsx
 * const [input, setInput] = useState('')
 * const debouncedInput = useDebounce(input, 500)
 * 
 * useEffect(() => {
 *   // 在用户停止输入 500ms 后执行
 *   console.log(debouncedInput)
 * }, [debouncedInput])
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

