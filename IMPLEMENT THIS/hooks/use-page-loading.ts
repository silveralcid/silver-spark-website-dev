"use client"

import { useState, useEffect } from "react"

export function usePageLoading() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Track resources loading
    const resources = performance.getEntriesByType("resource")
    const totalResources = resources.length || 1 // Avoid division by zero
    let loadedResources = 0

    // Create an observer to track resource loading
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "resource") {
          loadedResources++
          const newProgress = Math.min((loadedResources / totalResources) * 100, 99.9)
          setProgress(newProgress)
        }
      })
    })

    // Start observing
    observer.observe({ entryTypes: ["resource"] })

    // Function to handle when page is fully loaded
    const handleLoad = () => {
      setProgress(100)
      setIsLoaded(true)
      observer.disconnect()
    }

    // Check if document is already loaded
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    // Simulate progress if no resources are being tracked
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99.9) return prev
        const increment = (100 - prev) * 0.1
        return Math.min(prev + increment, 99.9)
      })
    }, 200)

    // Fallback to ensure loading completes
    const fallbackTimer = setTimeout(() => {
      handleLoad()
    }, 8000)

    return () => {
      window.removeEventListener("load", handleLoad)
      observer.disconnect()
      clearInterval(interval)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return { progress, isLoaded }
}

