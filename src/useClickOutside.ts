import { useEffect, useRef, RefObject } from 'react'

/**
 * 点击外部区域的 hook
 * @param handler 点击外部时触发的回调函数
 * @returns ref 对象，需要绑定到目标元素上
 * 
 * @example
 * ```tsx
 * const ref = useClickOutside(() => {
 *   setIsOpen(false)
 * })
 * 
 * return <div ref={ref}>Content</div>
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
    handler: () => void
): RefObject<T> {
    const ref = useRef<T>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [handler])

    return ref
}

