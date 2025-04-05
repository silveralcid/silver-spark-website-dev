import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white min-h-screen flex flex-col justify-between">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16 md:py-24 flex-grow flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:justify-end mb-16">
          <h2 className="heading-1 text-right md:max-w-2xl">
            Let's{" "}
            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">ignite</span>{" "}
            something{" "}
            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
              brilliant
            </span>{" "}
            together.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="heading-4 mb-6 pb-2 border-b border-gray-800">Main Services</h3>
            <ul className="space-y-4">
              {mainServices.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="heading-4 mb-6 pb-2 border-b border-gray-800">App & Development</h3>
            <ul className="space-y-4">
              {appDevelopment.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="heading-4 mb-6 pb-2 border-b border-gray-800">Company</h3>
            <ul className="space-y-4">
              {company.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer with copyright and policies */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="body-small text-gray-400">© {currentYear} SILVER SPARK – All Rights Reserved</p>
            </div>

            <div className="flex flex-wrap gap-6">
              {policyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="caption text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

function FooterLink({ href, className, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={cn("body text-gray-300 hover:text-white transition-colors inline-block relative group", className)}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

const mainServices = [
  { label: "Web Design", href: "/services/web-design" },
  { label: "E-commerce Development", href: "/services/ecommerce" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Branding & Identity", href: "/services/branding" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "SEO Optimization", href: "/services/seo" },
  { label: "Content Creation", href: "/services/content-creation" },
]

const appDevelopment = [
  { label: "Custom Web Applications", href: "/development/web-applications" },
  { label: "Mobile App Development", href: "/development/mobile-apps" },
  { label: "Progressive Web Apps", href: "/development/progressive-web-apps" },
  { label: "API Development", href: "/development/api-development" },
  { label: "CMS Implementation", href: "/development/cms" },
  { label: "E-commerce Platforms", href: "/development/ecommerce-platforms" },
]

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
]

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Sitemap", href: "/sitemap" },
]

