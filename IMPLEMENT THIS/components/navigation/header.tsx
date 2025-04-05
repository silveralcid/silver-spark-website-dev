"use client"

import { useState, useEffect } from "react"
import { Logo } from "@/components/ui/logo"
import { MainNav } from "@/components/navigation/main-nav"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full transition-medium",
        isScrolled ? "bg-black/90 backdrop-blur-sm shadow-md py-3 md:py-4" : "bg-transparent py-4 md:py-6",
      )}
      style={{
        zIndex: 9999,
        height: "var(--nav-height)",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        <Logo />
        <MainNav />
      </div>
    </header>
  )
}

