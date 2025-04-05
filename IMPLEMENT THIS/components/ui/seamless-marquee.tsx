"use client"

import React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SeamlessMarqueeProps {
  className?: string
  itemClassName?: string
  speed?: number
  pauseOnHover?: boolean
  gap?: number
  children: React.ReactNode
}

export function SeamlessMarquee({
  className,
  itemClassName,
  speed = 30,
  pauseOnHover = true,
  gap = 40,
  children,
}: SeamlessMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Create the animation keyframes
  const marqueeKeyframes = `
    @keyframes seamless-scroll {
      from { transform: translateX(0); }
      to { transform: translateX(calc(-50%)); }
    }
  `

  // Handle pause on hover
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return

    const container = containerRef.current

    const handleMouseEnter = () => setIsPaused(true)
    const handleMouseLeave = () => setIsPaused(false)

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [pauseOnHover])

  // Create arrays of children for rendering
  const childrenArray = React.Children.toArray(children)

  return (
    <div ref={containerRef} className={cn("overflow-hidden relative", className)}>
      <style>{marqueeKeyframes}</style>

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `seamless-scroll ${speed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          gap: `${gap}px`,
        }}
      >
        {/* First set of items */}
        {childrenArray.map((child, index) => (
          <div key={`original-${index}`} className={cn("flex-shrink-0", itemClassName)}>
            {child}
          </div>
        ))}

        {/* Duplicate set for seamless looping */}
        {childrenArray.map((child, index) => (
          <div key={`duplicate-${index}`} className={cn("flex-shrink-0", itemClassName)}>
            {child}
          </div>
        ))}
      </div>

      {/* Create a second animation that's offset to ensure continuous content */}
      <div
        className="flex whitespace-nowrap absolute top-0 left-[100%]"
        style={{
          animation: `seamless-scroll ${speed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          gap: `${gap}px`,
        }}
      >
        {/* First set of items */}
        {childrenArray.map((child, index) => (
          <div key={`second-original-${index}`} className={cn("flex-shrink-0", itemClassName)}>
            {child}
          </div>
        ))}

        {/* Duplicate set for seamless looping */}
        {childrenArray.map((child, index) => (
          <div key={`second-duplicate-${index}`} className={cn("flex-shrink-0", itemClassName)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

