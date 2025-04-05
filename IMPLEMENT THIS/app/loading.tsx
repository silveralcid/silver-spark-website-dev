import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Skeleton className="h-8 w-40 bg-gray-800" />
          <div className="flex items-center gap-6">
            <Skeleton className="h-10 w-40 rounded-md bg-gray-800 hidden md:block" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
          </div>
        </div>
      </header>

      {/* Hero skeleton */}
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="container px-4 text-center">
          <Skeleton className="h-6 w-3/4 mx-auto mb-4 bg-gray-800" />
          <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-4 bg-gray-800" />
          <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-4 bg-gray-800" />
          <Skeleton className="h-12 w-3/4 max-w-xl mx-auto mb-8 bg-gray-800" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-12 bg-gray-800" />
          <Skeleton className="h-12 w-48 mx-auto bg-gray-800" />

          {/* Background image grid skeleton */}
          <div className="grid grid-cols-3 gap-2 mt-12 opacity-30 max-w-4xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                {[...Array(2)].map((_, j) => (
                  <Skeleton key={j} className="h-32 w-full bg-gray-700" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

