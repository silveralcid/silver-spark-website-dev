import { Skeleton } from "@/components/ui/skeleton"

export function TestimonialsSkeleton() {
  return (
    <section className="bg-black text-white relative h-[33.33vh] min-h-[400px] flex flex-col justify-center">
      <div className="container mx-auto px-4 h-full flex flex-col">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-4 items-center flex-grow">
          {/* Left side - Client info wheel */}
          <div className="lg:col-span-5">
            <div className="relative h-[220px] flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="absolute w-full h-16 bg-gray-800"
                  style={{
                    transform: `translateY(${(i - 1) * 90}px)`,
                    opacity: i === 1 ? 1 : 0.5,
                    zIndex: 10 - Math.abs(i - 1),
                  }}
                />
              ))}
            </div>
          </div>

          {/* Middle - Navigation arrows */}
          <div className="lg:col-span-1 flex lg:flex-col justify-center gap-4">
            <Skeleton className="w-8 h-8 rounded-full bg-gray-800" />
            <Skeleton className="w-8 h-8 rounded-full bg-gray-800" />
          </div>

          {/* Right side - Quote */}
          <div className="lg:col-span-6 space-y-6">
            <Skeleton className="h-6 w-64 bg-gray-800" />
            <div className="min-h-[120px]">
              <Skeleton className="h-6 w-full bg-gray-800 mb-3" />
              <Skeleton className="h-6 w-full bg-gray-800 mb-3" />
              <Skeleton className="h-6 w-4/5 bg-gray-800" />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-4 h-4 bg-gray-800" />
                  ))}
                </div>
                <Skeleton className="h-5 w-8 ml-1 bg-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

