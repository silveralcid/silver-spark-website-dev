"use client"

import { useRef, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"

interface TextMarqueeProps {
  items: string[]
  className?: string
  containerClassName?: string
  itemClassName?: string
  gap?: number
  speed?: number
  pauseOnHover?: boolean
}

export function TextMarquee({
  items,
  className,
  containerClassName,
  itemClassName,
  gap = 8,
  speed = 30,
  pauseOnHover = false,
}: TextMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Memoize the animation keyframes style to prevent re-renders
  const animationStyle = useMemo(() => {
    return `
      @keyframes textMarquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `
  }, [])

  // Add pause on hover functionality
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return

    const container = containerRef.current

    const handleMouseEnter = () => {
      const elements = container.querySelectorAll(".animate-marquee")
      elements.forEach((el) => {
        ;(el as HTMLElement).style.animationPlayState = "paused"
      })
    }

    const handleMouseLeave = () => {
      const elements = container.querySelectorAll(".animate-marquee")
      elements.forEach((el) => {
        ;(el as HTMLElement).style.animationPlayState = "running"
      })
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [pauseOnHover])

  return (
    <div
      className={cn("relative overflow-hidden h-full flex items-center w-screen max-w-[100vw]", className)}
      ref={containerRef}
    >
      <style jsx global>
        {animationStyle}
      </style>

      <div className="flex whitespace-nowrap w-full">
        <div
          className={cn("flex items-center animate-marquee", containerClassName)}
          style={{
            gap: `${gap * 0.25}rem`,
            animationDuration: `${speed}s`,
            animationName: "textMarquee",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className={cn(
                "flex-shrink-0 px-4 md:px-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white",
                itemClassName,
              )}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Duplicate the items for seamless looping */}
        <div
          className={cn("flex items-center animate-marquee", containerClassName)}
          style={{
            gap: `${gap * 0.25}rem`,
            animationDuration: `${speed}s`,
            animationName: "textMarquee",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item}-duplicate-${index}`}
              className={cn(
                "flex-shrink-0 px-4 md:px-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white",
                itemClassName,
              )}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

