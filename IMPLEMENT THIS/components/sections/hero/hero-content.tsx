"use client"

import { AnimatedButton } from "@/components/ui/animated-button"
import Link from "next/link"

export function HeroContent() {
  return (
    <div className="space-y-6">
      <p className="body-large text-white font-medium tracking-wide">FULL SERVICE DIGITAL LAUNCH AGENCY</p>

      <h1 className="heading-1 text-white">
        DREAM BIG.{" "}
        <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent"> SPARK IT. </span>
        <br />
        SCALE FAST.
      </h1>

      <p className="body-large text-white ">Rapid MVPs, AI-Driven Solutions & Digital Marketing</p>

      <AnimatedButton asChild className="w-full sm:w-auto text-center sm:text-left group">
        <Link href="/contact">
          <span className="flex items-center justify-center">
            BOOK FREE STRATEGY CALL
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 h-4 w-4 inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </Link>
      </AnimatedButton>
    </div>
  )
}

