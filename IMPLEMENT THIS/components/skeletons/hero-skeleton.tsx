import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#000000] to-[#1a1a1a]"></div>

      {/* Hero content */}
      <div className="flex-grow flex items-center relative py-24 md:py-0" style={{ zIndex: 3 }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Skeleton className="h-6 w-3/4 bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-4/5 bg-gray-800" />
              <Skeleton className="h-6 w-2/3 bg-gray-800" />
              <div className="pt-4">
                <Skeleton className="h-14 w-48 bg-gray-800" />
              </div>
            </div>
            <div className="hidden md:block h-[400px] md:h-[450px] lg:h-[500px]">
              {/* Background image grid skeleton */}
              <div className="grid grid-cols-3 gap-2 h-full opacity-30">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton key={j} className="h-32 w-full bg-gray-700" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative w-full border-t border-white/10 overflow-hidden flex items-center mt-auto h-20">
        <div className="flex w-full overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="flex-shrink-0 h-8 w-16 mx-4 bg-gray-800" />
          ))}
        </div>
      </div>
    </section>
  )
}

