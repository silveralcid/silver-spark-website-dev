"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FullScreenMenu } from "@/components/navigation/full-screen-menu"
import { MobileMenu } from "@/components/navigation/mobile-menu"

export function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className="hidden md:inline-flex bg-white text-black border-white hover:bg-black hover:text-white transition-colors"
        asChild
      >
        <Link href="/contact">REQUEST A QUOTE</Link>
      </Button>

      <Button
        variant="ghost"
        className="text-white hover:bg-white/10 hover:text-white"
        size="icon"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Desktop Menu */}
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}

