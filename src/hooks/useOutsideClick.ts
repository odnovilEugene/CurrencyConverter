import React, { useEffect } from 'react'

type EventType = MouseEvent | TouchEvent

export const useOutsideClick = (
    ref: React.RefObject<HTMLElement>,
    handler: (e?: MouseEvent | TouchEvent) => void
) => {
    useEffect(() => {
        const listener = (e: EventType) => {
            if (!ref.current || ref.current.contains(e.target as Element)) {
                return
            }
            handler(e)
        }
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}
