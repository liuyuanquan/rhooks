import { useState, useEffect, useRef } from 'react'

/**
 * 节流 hook
 * @param value 需要节流的值
 * @param delay 延迟时间（毫秒），默认为 500ms
 * @returns 节流后的值
 * 
 * @example
 * ```tsx
 * const [scrollY, setScrollY] = useState(0)
 * const throttledScrollY = useThrottle(scrollY, 100)
 * 
 * useEffect(() => {
 *   const handleScroll = () => setScrollY(window.scrollY)
 *   window.addEventListener('scroll', handleScroll)
 *   return () => window.removeEventListener('scroll', handleScroll)
 * }, [])
 * ```
 */
export function useThrottle<T>(value: T, delay: number = 500): T {
    const [throttledValue, setThrottledValue] = useState<T>(value)
    const lastRan = useRef<number>(Date.now())

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRan.current >= delay) {
                setThrottledValue(value)
                lastRan.current = Date.now()
            }
        }, delay - (Date.now() - lastRan.current))

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return throttledValue
}

