"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  description: string
  className?: string
}

export function ServiceCard({ title, description, className }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Update the random values to ensure the glow is visible
  const randomDuration = Math.floor(Math.random() * 4) + 4 // 4-8 seconds
  const randomDelay = Math.floor(Math.random() * 3) // 0-3 seconds
  const randomMinOpacity = (Math.floor(Math.random() * 20) + 40) / 100 // 0.4-0.6
  const randomMaxOpacity = (Math.floor(Math.random() * 20) + 70) / 100 // 0.7-0.9
  const randomSize = Math.floor(Math.random() * 16) + 32 // 32-48px - increased size

  // Fix the positioning to ensure the glow stays in the upper right corner
  // Replace the randomPositionX and randomPositionY with these values:
  const randomPositionX = Math.floor(Math.random() * 4) - 4 // -4 to -1
  const randomPositionY = Math.floor(Math.random() * 4) - 4 // -4 to -1

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-gray-800 bg-black p-8 md:p-10 transition-all duration-500 flex flex-col items-center justify-center text-center",
        "hover:border-transparent hover:shadow-lg",
        isHovered ? "service-card-hovered" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background container (only visible on hover) */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 z-0",
          isHovered ? "opacity-100" : "",
        )}
      >
        {/* Main gradient background */}
        <div className="absolute inset-0 rounded-lg service-card-gradient"></div>

        {/* Blurred gradient for glow effect - increased blur and opacity */}
        <div
          className="absolute inset-0 rounded-lg service-card-gradient"
          style={{ filter: "blur(20px)", opacity: 0.8 }}
        ></div>

        {/* Semi-transparent dark overlay to keep content visible - reduced opacity for stronger gradient */}
        <div className="absolute inset-[2px] rounded-lg bg-black/80 backdrop-blur-sm z-10"></div>
      </div>

      {/* Corner glow effect with randomized pulse */}
      <div
        className="absolute rounded-full bg-gradient-to-br from-orange-700 to-amber-600 blur-xl"
        style={
          {
            top: `${randomPositionY}rem`,
            right: `${randomPositionX}rem`,
            height: `${randomSize}px`,
            width: `${randomSize}px`,
            opacity: randomMinOpacity,
            animation: `pulse-glow ${randomDuration}s infinite alternate ease-in-out ${randomDelay}s`,
            "--min-opacity": randomMinOpacity,
            "--max-opacity": randomMaxOpacity,
          } as React.CSSProperties
        }
      />

      {/* Update the content container to ensure vertical centering */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        <h3 className="heading-4 mb-4 text-white text-center transition-transform duration-300 group-hover:-translate-y-2">
          {title}
        </h3>

        <p className="body text-gray-300 transition-opacity duration-300">{description}</p>

        <div
          className={cn(
            "mt-6 h-1 w-16 mx-auto transition-all duration-500 group-hover:w-24",
            isHovered ? "bg-gradient-to-r from-orange-700 to-amber-600" : "bg-gray-600",
          )}
        />
      </div>
    </div>
  )
}

