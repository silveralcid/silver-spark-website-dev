"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
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

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      // Reset open submenu when main menu closes
      setOpenSubmenu(null)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Toggle submenu
  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label)
  }

  // Menu items with submenus
  const menuItems: MenuItem[] = [
    {
      label: "Services",
      href: "/services",
      submenu: [
        {
          items: [{ label: "View All Services", href: "/services" }],
        },
        {
          title: "Branding",
          items: [
            { label: "Branding Services", href: "/services/branding" },
            { label: "Logo Design", href: "/services/logo-design" },
            { label: "Brand Identity", href: "/services/brand-identity" },
            { label: "Graphic Design", href: "/services/graphic-design" },
            { label: "Brand Marketing", href: "/services/brand-marketing" },
          ],
        },
        {
          title: "Web Design",
          items: [
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
          items: [{ label: "Before & After", href: "/industries/before-after" }],
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
        "fixed inset-0 z-50 md:hidden transition-transform duration-500 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
      style={{ backgroundColor: "#ffffff" }} // Ensure solid white background
    >
      <div className="container mx-auto h-full px-4 py-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-black" onClick={onClose}>
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

        <nav className="flex flex-col overflow-y-auto flex-grow">
          {menuItems.map((item) => (
            <div key={item.label} className="border-b border-gray-100">
              {item.submenu ? (
                <div>
                  <button
                    className="flex items-center justify-between w-full py-4 text-xl font-bold text-black"
                    onClick={() => toggleSubmenu(item.label)}
                    aria-expanded={openSubmenu === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        openSubmenu === item.label ? "transform rotate-180" : "",
                      )}
                    />
                  </button>

                  {openSubmenu === item.label && (
                    <div className="pl-4 pb-4 space-y-4">
                      {item.submenu.map((section, idx) => (
                        <div key={idx} className="mb-4">
                          {section.title && (
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">{section.title}</h3>
                          )}
                          <ul className="space-y-2">
                            {section.items.map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <Link
                                  href={subItem.href}
                                  className="flex items-center py-2 text-gray-700 hover:text-black"
                                  onClick={onClose}
                                >
                                  <ChevronRight className="h-4 w-4 mr-2" />
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href} className="block py-4 text-xl font-bold text-black" onClick={onClose}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <Button className="w-full bg-black text-white hover:bg-gray-800" asChild>
            <Link href="/contact" onClick={onClose}>
              REQUEST A QUOTE
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

