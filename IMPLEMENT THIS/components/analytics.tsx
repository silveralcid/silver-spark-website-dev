"use client"

import { useEffect } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views when the route changes
  useEffect(() => {
    if (pathname) {
      const url = searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname

      // Track page view
      trackPageView(url)
    }
  }, [pathname, searchParams])

  // Function to track page views
  const trackPageView = (url: string) => {
    // Google Analytics page view tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
        page_path: url,
      })
    }

    // You can add other analytics services here
  }

  return (
    <>
      {/* Google Analytics Script */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* You can add other analytics scripts here */}
    </>
  )
}

