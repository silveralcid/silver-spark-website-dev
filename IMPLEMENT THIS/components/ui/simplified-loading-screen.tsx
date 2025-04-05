"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * LOADING SCREEN TEMPORARILY DISABLED
 * To re-enable, change the initial state values back to:
 * isLoading = true, isHidden = false
 */
export function SimplifiedLoadingScreen() {
  // TEMPORARILY DISABLED - Change these back to (true, false) to re-enable
  const [isLoading, setIsLoading] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(1) // Animation phase (1-4)
  const startTimeRef = useRef(Date.now())
  const minLoadingTime = 5000 // 5 seconds minimum loading time

  useEffect(() => {
    // Record the start time
    startTimeRef.current = Date.now()

    /**
     * FIRST VISIT ONLY CODE - COMMENTED OUT FOR LATER USE
     *
     * // Check if this is the first visit
     * const hasVisitedBefore = localStorage.getItem('hasVisitedSilverSpark')
     *
     * // If not the first visit, skip the loading screen
     * if (hasVisitedBefore === 'true') {
     *   setIsLoading(false)
     *   setIsHidden(true)
     *   return // Exit early, no need to set up timers
     * }
     *
     * // Function to mark that the user has visited
     * const markAsVisited = () => {
     *   try {
     *     localStorage.setItem('hasVisitedSilverSpark', 'true')
     *   } catch (error) {
     *     console.error('Could not save to localStorage:', error)
     *   }
     * }
     */

    // Function to check if minimum time has passed
    const hasMinTimeElapsed = () => {
      return Date.now() - startTimeRef.current >= minLoadingTime
    }

    // Function to handle when both conditions are met:
    // 1. Page is loaded
    // 2. Minimum time has elapsed
    const completeLoading = () => {
      setIsLoading(false)

      // After the exit animation completes, completely hide the element
      setTimeout(() => {
        setIsHidden(true)

        /**
         * FIRST VISIT ONLY CODE - COMMENTED OUT FOR LATER USE
         *
         * // Mark that the user has visited the site
         * markAsVisited()
         */
      }, 1000) // Match this to the exit animation duration
    }

    // Simulate progress that takes exactly 5 seconds to reach 100%
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current
      const calculatedProgress = Math.min((elapsedTime / minLoadingTime) * 100, 99.9)

      setProgress(calculatedProgress)

      // Update animation phase based on progress
      if (calculatedProgress > 75) setPhase(4)
      else if (calculatedProgress > 50) setPhase(3)
      else if (calculatedProgress > 25) setPhase(2)

      // If we've reached the end of our minimum time, complete the progress
      if (elapsedTime >= minLoadingTime) {
        setProgress(100)
        setPhase(4)
        clearInterval(interval)

        // Check if page is also loaded before completing
        if (document.readyState === "complete") {
          completeLoading()
        }
      }
    }, 16) // ~60fps for smooth animation

    // Function to check if page is loaded
    const handleLoad = () => {
      // If minimum time has elapsed, complete loading
      if (hasMinTimeElapsed()) {
        clearInterval(interval)
        setProgress(100)
        setPhase(4)
        completeLoading()
      }
      // Otherwise, we'll wait for the timer to complete
    }

    // Check if document is already loaded
    if (document.readyState === "complete") {
      // Still wait for minimum time
      if (hasMinTimeElapsed()) {
        clearInterval(interval)
        setProgress(100)
        setPhase(4)
        completeLoading()
      }
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      window.removeEventListener("load", handleLoad)
      clearInterval(interval)
    }
  }, [])

  /**
   * FIRST VISIT ONLY CODE - COMMENTED OUT FOR LATER USE
   *
   * // If we're hiding the loading screen due to previous visit, return null immediately
   * if (isHidden && localStorage.getItem('hasVisitedSilverSpark') === 'true') {
   *   return null
   * }
   */

  if (isHidden) return null

  // Get the appropriate message based on the current phase
  const getMessage = () => {
    if (phase === 1) return "Igniting the spark..."
    if (phase === 2) return "Building the flame..."
    if (phase === 3) return "Stoking the fire..."
    if (phase === 4 && progress < 100) return "Almost ready..."
    return "Ready!"
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-1000",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 text-center relative">
          <span
            className={cn(
              "inline-block transition-all duration-500",
              phase >= 2 ? "scale-110" : "",
              phase >= 3 ? "text-orange-500" : "",
              phase >= 4 ? "scale-100" : "",
            )}
          >
            SILVER{" "}
            <span
              className={cn(
                "transition-all duration-500",
                phase >= 2 ? "text-orange-500" : "",
                phase >= 3 ? "text-white" : "",
                phase >= 4 ? "text-orange-500" : "",
              )}
            >
              SPARK
            </span>
          </span>
        </div>

        {/* Animated underline */}
        <div
          className={cn(
            "h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mt-2 mb-6 transition-all duration-300 ease-out",
            phase >= 3 ? "h-2" : "",
            phase >= 4 ? "h-1" : "",
          )}
          style={{ width: `${progress}%`, maxWidth: "300px" }}
        ></div>

        {/* Loading text with phase-based messages - now in the middle */}
        <div className="text-center">
          <p className="text-white/70 text-lg">{getMessage()}</p>
          <p className="text-white/50 text-sm mt-2">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  )
}

