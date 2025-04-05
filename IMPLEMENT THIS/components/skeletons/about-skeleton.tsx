import { Skeleton } from "@/components/ui/skeleton"

export function AboutSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-full max-w-md" />
              <Skeleton className="h-10 w-full max-w-lg" />
              <Skeleton className="h-10 w-3/4 max-w-sm" />
            </div>

            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />

            <div className="space-y-4 my-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <Skeleton className="h-8 w-8 rounded-full mr-3 flex-shrink-0 mt-0.5" />
                  <div className="w-full">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-5/6" />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>

            {/* Video Banner */}
            <div className="relative w-full mt-8">
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

