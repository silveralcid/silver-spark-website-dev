"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

// Define the menu structure with submenu items
interface MenuItem {
  label: string
  href: string
  submenu?: {
    title?: string
    items: {
      label: string
      href: string
      description?: string
    }[]
  }[]
}

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Menu items with submenus
  const menuItems: MenuItem[] = [
    {
      label: "Services",
      href: "/services",
      submenu: [
        {
          title: "Branding",
          items: [
            { label: "Branding", href: "/services/branding", description: "Complete branding solutions" },
            { label: "Branding Services", href: "/services/branding-services" },
            { label: "Logo Design", href: "/services/logo-design" },
            { label: "Brand Identity", href: "/services/brand-identity" },
            { label: "Graphic Design", href: "/services/graphic-design" },
            { label: "Brand Marketing", href: "/services/brand-marketing" },
          ],
        },
        {
          title: "Web Design",
          items: [
            { label: "Web Design", href: "/services/web-design", description: "Custom web design solutions" },
            { label: "Custom Website Design", href: "/services/custom-website-design" },
            { label: "Shopify Website Design", href: "/services/shopify-website-design" },
            { label: "WordPress Website Design", href: "/services/wordpress-website-design" },
            { label: "Magento Website Design", href: "/services/magento-website-design" },
            { label: "eCommerce Website Design", href: "/services/ecommerce-website-design" },
          ],
        },
        {
          title: "Marketing",
          items: [
            { label: "Marketing", href: "/services/marketing", description: "Strategic marketing services" },
            { label: "Integrated Marketing Services", href: "/services/integrated-marketing" },
            { label: "SEO", href: "/services/seo" },
            { label: "Social Media Marketing", href: "/services/social-media-marketing" },
            { label: "Consulting Services", href: "/services/consulting" },
            { label: "Before & After Designs", href: "/services/before-after-designs" },
          ],
        },
      ],
    },
    {
      label: "Case Studies",
      href: "/case-studies",
    },
    {
      label: "Work by Industry",
      href: "/industries",
      submenu: [
        {
          title: "Featured",
          items: [
            { label: "Before & After", href: "/industries/before-after", description: "See our transformations" },
          ],
        },
        {
          title: "Industries",
          items: [
            { label: "Auto Repair", href: "/industries/auto-repair" },
            { label: "Bank", href: "/industries/bank" },
            { label: "Corporate", href: "/industries/corporate" },
            { label: "Dental", href: "/industries/dental" },
            { label: "Law Firm", href: "/industries/law-firm" },
            { label: "Healthcare", href: "/industries/healthcare" },
            { label: "Real Estate", href: "/industries/real-estate" },
            { label: "Restaurant", href: "/industries/restaurant" },
            { label: "Retail", href: "/industries/retail" },
          ],
        },
      ],
    },
    {
      label: "Digital Trends",
      href: "/digital-trends",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ]

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white text-black transition-transform duration-500 ease-in-out hidden md:block",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
      style={{ backgroundColor: "#ffffff" }} // Ensure solid white background
    >
      <div className="container mx-auto h-full px-4 py-8 flex flex-col">
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="text-3xl font-bold tracking-tight" onClick={onClose}>
            SILVER SPARK
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:bg-black/10"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          <div className="flex flex-col">
            <nav className="flex flex-col space-y-2 flex-grow justify-center">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.submenu ? (
                    <button
                      className="group relative py-4 text-4xl md:text-5xl lg:text-6xl font-bold transition-colors hover:text-gray-600 text-left w-full flex items-center"
                      onMouseEnter={() => setHoveredMenu(item.label)}
                      onFocus={() => setHoveredMenu(item.label)}
                    >
                      <span>{item.label}</span>
                      {hoveredMenu === item.label ? (
                        <ChevronRight className="ml-2 h-8 w-8" />
                      ) : (
                        <ChevronDown className="ml-2 h-8 w-8" />
                      )}
                      <span className="absolute bottom-0 left-0 h-1 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="group relative py-4 text-4xl md:text-5xl lg:text-6xl font-bold transition-colors hover:text-gray-600 block"
                      onClick={onClose}
                      onMouseEnter={() => setHoveredMenu(null)}
                      onFocus={() => setHoveredMenu(null)}
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 h-1 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-8">
              <Button className="w-full py-6 text-lg bg-black text-white hover:bg-gray-800" asChild>
                <Link href="/contact" onClick={onClose}>
                  REQUEST A QUOTE
                </Link>
              </Button>
            </div>
          </div>

          {/* Submenu panel */}
          <div className="hidden md:block overflow-y-auto">
            {menuItems.map((item) =>
              item.submenu && hoveredMenu === item.label ? (
                <div key={`submenu-${item.label}`} className="h-full p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6">{item.label}</h2>

                  <div
                    className={cn(
                      "grid gap-6",
                      item.label === "Services"
                        ? "grid-cols-1 md:grid-cols-3"
                        : item.label === "Work by Industry"
                          ? "grid-cols-1 md:grid-cols-2"
                          : "grid-cols-1",
                    )}
                  >
                    {item.submenu.map((section, idx) => (
                      <div key={idx}>
                        {section.title && <h3 className="text-lg font-semibold text-gray-700 mb-3">{section.title}</h3>}
                        <ul className="space-y-2">
                          {section.items.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                href={subItem.href}
                                className="flex flex-col py-2 text-gray-700 hover:text-black transition-colors"
                                onClick={onClose}
                              >
                                <span className="flex items-center">
                                  <ChevronRight className="h-4 w-4 mr-2" />
                                  {subItem.label}
                                </span>
                                {subItem.description && (
                                  <span className="text-sm text-gray-500 ml-6 mt-1">{subItem.description}</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null,
            )}

            {!hoveredMenu && (
              <div className="h-full flex items-center justify-center">
                {/* Empty state - removed the "Hover over a menu item" text */}
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center">
            <a href="mailto:hello@silverspark.studio" className="text-gray-700 hover:text-black transition-colors">
              hello@silverspark.studio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

