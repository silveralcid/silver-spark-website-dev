"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface VerticalMarqueeProps {
  items: ReactNode[]
  className?: string
  containerClassName?: string
  itemClassName?: string
  gap?: number
  speed?: number
  direction?: "up" | "down"
  pauseOnHover?: boolean
}

export function VerticalMarquee({
  items,
  className,
  containerClassName,
  itemClassName,
  gap = 8,
  speed = 1,
  direction = "up",
  pauseOnHover = true,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstRowRef = useRef<HTMLDivElement>(null)
  const secondRowRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!containerRef.current || !firstRowRef.current || !secondRowRef.current) return

    // Get the height of the first row
    const rowHeight = firstRowRef.current.offsetHeight

    // Set initial position for the second row
    gsap.set(secondRowRef.current, { y: -rowHeight })

    // Calculate duration based on speed (lower number = faster)
    const duration = rowHeight / (50 * speed)

    // Create the animation
    const createAnimation = () => {
      // Kill any existing animation
      if (animationRef.current) {
        animationRef.current.kill()
      }

      // Create new animation
      animationRef.current = gsap.to([firstRowRef.current, secondRowRef.current], {
        y: direction === "up" ? `-=${rowHeight}` : `+=${rowHeight}`,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: (y) => {
            // When a row moves completely offscreen, wrap it around
            const offset = direction === "up" ? rowHeight : -rowHeight
            return `${(Number.parseFloat(y) % rowHeight) + offset}px`
          },
        },
      })
    }

    createAnimation()

    // Handle pause on hover
    if (pauseOnHover && containerRef.current) {
      const handleMouseEnter = () => {
        if (animationRef.current) {
          animationRef.current.pause()
        }
      }

      const handleMouseLeave = () => {
        if (animationRef.current) {
          animationRef.current.play()
        }
      }

      containerRef.current.addEventListener("mouseenter", handleMouseEnter)
      containerRef.current.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("mouseenter", handleMouseEnter)
          containerRef.current.removeEventListener("mouseleave", handleMouseLeave)
        }
        if (animationRef.current) {
          animationRef.current.kill()
        }
      }
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [speed, direction, pauseOnHover])

  return (
    <div className={cn("relative overflow-hidden h-full", className)} ref={containerRef}>
      <div className="flex flex-col h-full">
        <div ref={firstRowRef} className={cn("flex flex-col", containerClassName)} style={{ gap: `${gap * 0.25}rem` }}>
          {items.map((item, index) => (
            <div key={`item-${index}`} className={cn("flex-shrink-0", itemClassName)}>
              {item}
            </div>
          ))}
        </div>

        <div ref={secondRowRef} className={cn("flex flex-col", containerClassName)} style={{ gap: `${gap * 0.25}rem` }}>
          {items.map((item, index) => (
            <div key={`item-duplicate-${index}`} className={cn("flex-shrink-0", itemClassName)}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

