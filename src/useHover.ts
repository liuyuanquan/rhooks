import { useState, useRef, useEffect } from 'react'

/**
 * 鼠标悬停状态 hook
 * @returns 返回 ref 和是否悬停的状态
 * 
 * @example
 * ```tsx
 * const [ref, isHovered] = useHover()
 * 
 * return <div ref={ref}>{isHovered ? 'Hovered' : 'Not hovered'}</div>
 * ```
 */
export function useHover<T extends HTMLElement = HTMLElement>(): [
    React.RefObject<T>,
    boolean
] {
    const [isHovered, setIsHovered] = useState(false)
    const ref = useRef<T>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handleMouseEnter = () => setIsHovered(true)
        const handleMouseLeave = () => setIsHovered(false)

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter)
            element.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return [ref, isHovered]
}

