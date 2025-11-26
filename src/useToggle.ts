import { useState, useCallback } from 'react'

/**
 * 用于切换布尔值的 hook
 * @param initialValue 初始值，默认为 false
 * @returns 返回当前值、切换函数、设置为 true 和设置为 false 的函数
 * 
 * @example
 * ```tsx
 * const [isOpen, toggle, open, close] = useToggle(false)
 * 
 * <button onClick={toggle}>Toggle</button>
 * <button onClick={open}>Open</button>
 * <button onClick={close}>Close</button>
 * ```
 */
export function useToggle(initialValue: boolean = false) {
    const [value, setValue] = useState(initialValue)

    const toggle = useCallback(() => {
        setValue((prev) => !prev)
    }, [])

    const setTrue = useCallback(() => {
        setValue(true)
    }, [])

    const setFalse = useCallback(() => {
        setValue(false)
    }, [])

    return [value, toggle, setTrue, setFalse] as const
}

