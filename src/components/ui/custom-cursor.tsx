"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const [isVisible, setIsVisible] = useState(false)
    const [isExcluded, setIsExcluded] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        // Hide cursor on touch devices
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
            return
        }

        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
            setIsVisible(true)

            const target = e.target as HTMLElement
            setIsExcluded(!!target.closest(".no-custom-cursor"))

            // Check for clickable elements
            const isClickable = !!(
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[role='button']") ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA"
            )
            setIsHovering(isClickable)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        window.addEventListener("mousemove", updateMousePosition)
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener("mousemove", updateMousePosition)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [cursorX, cursorY])

    if (!isVisible) return null

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] mix-blend-difference bg-white"
            style={{
                translateX: cursorX,
                translateY: cursorY,
                opacity: isExcluded ? 0 : 1, // Hide if excluded
            }}
            animate={{
                scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            }}
            transition={{
                scale: { type: "tween", ease: "easeOut", duration: 0.2 },
            }}
        />
    )
}

