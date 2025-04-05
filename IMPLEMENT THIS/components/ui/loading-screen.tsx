"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    // Function to check if the page has loaded
    const handleLoad = () => {
      // Set a small timeout to ensure animations have time to run
      setTimeout(() => {
        setIsLoading(false)

        // After the exit animation completes, completely hide the element
        setTimeout(() => {
          setIsHidden(true)
        }, 1000) // Match this to the exit animation duration
      }, 300)
    }

    // Check if document is already loaded
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    // Fallback timeout to ensure loading screen doesn't stay forever
    // This will force the loading screen to disappear after 5 seconds max
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setIsHidden(true), 1000)
    }, 5000)

    return () => {
      window.removeEventListener("load", handleLoad)
      clearTimeout(fallbackTimer)
    }
  }, [])

  if (isHidden) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="relative">
        {/* Logo */}
        <div className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 text-center">SILVER SPARK</div>

        {/* Burst animation container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className={cn("burst-circle", isLoading ? "animate-burst" : "")}></div>
          <div className={cn("burst-circle delay-150", isLoading ? "animate-burst" : "")}></div>
          <div className={cn("burst-circle delay-300", isLoading ? "animate-burst" : "")}></div>

          {/* Spark particles */}
          <div className="sparks-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={cn("spark", isLoading ? "animate-spark" : "")}
                style={
                  {
                    "--delay": `${Math.random() * 0.5}s`,
                    "--angle": `${Math.random() * 360}deg`,
                    "--distance": `${50 + Math.random() * 100}px`,
                    "--size": `${2 + Math.random() * 4}px`,
                  } as React.CSSProperties
                }
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

