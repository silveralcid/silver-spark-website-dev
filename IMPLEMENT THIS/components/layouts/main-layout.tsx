"use client"

import type React from "react"

import { Suspense } from "react"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { Skeleton } from "@/components/ui/skeleton"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense
        fallback={
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              <Skeleton className="h-8 w-40 bg-gray-800" />
              <div className="flex items-center gap-6">
                <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
              </div>
            </div>
          </header>
        }
      >
        <Header />
      </Suspense>

      <main className="flex-grow">{children}</main>

      <Suspense
        fallback={
          <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-4">
              <Skeleton className="h-[300px] w-full bg-gray-800" />
            </div>
          </footer>
        }
      >
        <Footer />
      </Suspense>

      <CustomCursor />
    </div>
  )
}

