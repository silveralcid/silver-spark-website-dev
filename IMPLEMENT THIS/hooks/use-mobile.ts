"use client"

import { useState, useEffect, useCallback } from "react"

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  // Memoize the resize handler to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint)
  }, [breakpoint])

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Set initial value
      handleResize()

      // Add event listener with passive option for better performance
      window.addEventListener("resize", handleResize, { passive: true })

      // Clean up
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    // Default to false if on server
    return () => {}
  }, [handleResize])

  return isMobile
}

