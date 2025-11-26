import { useEffect, useRef, useCallback } from 'react'

/**
 * 定时器 hook
 * @param callback 回调函数
 * @param delay 延迟时间（毫秒），如果为 null 则不执行
 * @returns 清除定时器的函数
 * 
 * @example
 * ```tsx
 * const clear = useTimeout(() => {
 *   console.log('Executed after 1 second')
 * }, 1000)
 * 
 * // 可以手动清除
 * clear()
 * ```
 */
export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay === null) {
            return
        }

        const id = setTimeout(() => {
            savedCallback.current?.()
        }, delay)

        return () => clearTimeout(id)
    }, [delay])

    const clear = useCallback(() => {
        savedCallback.current = undefined
    }, [])

    return clear
}

