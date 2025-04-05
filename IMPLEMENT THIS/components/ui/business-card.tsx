"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Flame } from "lucide-react"
import type { Business } from "@/lib/hooks/use-case-studies"

interface BusinessCardProps {
  business: Business
  isSelected: boolean
  onSelect: () => void
}

export function BusinessCard({ business, isSelected, onSelect }: BusinessCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center p-3 rounded-lg transition-all duration-300 text-left",
        isSelected
          ? "bg-gradient-to-r from-orange-700/20 to-amber-600/20 border border-orange-700/30"
          : "hover:bg-white/5 border border-transparent",
      )}
      role="tab"
      id={`tab-${business.id}`}
      aria-selected={isSelected}
      aria-controls={`panel-${business.id}`}
    >
      <div className="w-10 h-10 relative flex-shrink-0 bg-gray-800 rounded-md flex items-center justify-center overflow-hidden border border-gray-700">
        <Image
          src={business.logo || "/placeholder.svg"}
          alt={business.name}
          width={40}
          height={40}
          className="object-contain p-1"
        />
      </div>
      <div className="ml-3 min-w-0">
        <p
          className={cn(
            "font-medium truncate transition-colors",
            isSelected ? "text-amber-500" : "text-white group-hover:text-amber-500",
          )}
        >
          {business.name}
        </p>
        <p className="text-xs text-gray-400 truncate">{business.industry}</p>
      </div>
      {isSelected && <Flame className="ml-auto h-4 w-4 text-amber-500 flex-shrink-0" />}
    </button>
  )
}

