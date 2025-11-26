import { useEffect, useRef } from 'react'

/**
 * 组件卸载时执行的 hook
 * @param fn 卸载时执行的函数
 * 
 * @example
 * ```tsx
 * useUnmount(() => {
 *   console.log('Component unmounted')
 * })
 * ```
 */
export function useUnmount(fn: () => void) {
    const fnRef = useRef(fn)
    fnRef.current = fn

    useEffect(() => {
        return () => {
            fnRef.current()
        }
    }, [])
}

