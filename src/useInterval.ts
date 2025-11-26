import { useEffect, useRef } from 'react'

/**
 * 定时器 hook（循环执行）
 * @param callback 回调函数
 * @param delay 延迟时间（毫秒），如果为 null 则停止执行
 * 
 * @example
 * ```tsx
 * const [count, setCount] = useState(0)
 * 
 * useInterval(() => {
 *   setCount(count + 1)
 * }, 1000)
 * ```
 */
export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay === null) {
            return
        }

        const id = setInterval(() => {
            savedCallback.current?.()
        }, delay)

        return () => clearInterval(id)
    }, [delay])
}

