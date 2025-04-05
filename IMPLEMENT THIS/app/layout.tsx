import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@/components/analytics"
import { SimplifiedLoadingScreen } from "@/components/ui/simplified-loading-screen"

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Silver Spark - Award-Winning Web Design & Development Agency",
    template: "%s | Silver Spark",
  },
  description:
    "We transform brands online with strategic web design, development & digital marketing solutions that drive measurable business growth",
  keywords: ["web design", "web development", "digital marketing", "branding", "SEO", "UI/UX design"],
  authors: [{ name: "Silver Spark" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className={inter.className}>
        <SimplifiedLoadingScreen />
        {children}
        <Analytics />
      </body>
    </html>
  )
}