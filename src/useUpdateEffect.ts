import { useEffect, useRef, DependencyList } from 'react'

/**
 * 只在依赖更新时执行的 effect，跳过首次渲染
 * @param effect effect 函数
 * @param deps 依赖数组
 * 
 * @example
 * ```tsx
 * useUpdateEffect(() => {
 *   console.log('Updated:', count)
 * }, [count])
 * ```
 */
export function useUpdateEffect(effect: () => void, deps?: DependencyList) {
    const isFirst = useRef(true)

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }
        return effect()
    }, [effect, deps])
}

