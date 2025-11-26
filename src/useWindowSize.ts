import { useState, useEffect } from 'react'

interface WindowSize {
    width: number
    height: number
}

/**
 * 获取窗口尺寸的 hook
 * @returns 窗口的宽度和高度
 * 
 * @example
 * ```tsx
 * const { width, height } = useWindowSize()
 * 
 * return <div>Window size: {width} x {height}</div>
 * ```
 */
export function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>(() => {
        if (typeof window === 'undefined') {
            return { width: 0, height: 0 }
        }
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}

