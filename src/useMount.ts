import { useEffect } from 'react'

/**
 * 组件挂载时执行的 hook
 * @param fn 挂载时执行的函数
 * 
 * @example
 * ```tsx
 * useMount(() => {
 *   console.log('Component mounted')
 * })
 * ```
 */
export function useMount(fn: () => void) {
    useEffect(() => {
        fn()
    }, [fn])
}

