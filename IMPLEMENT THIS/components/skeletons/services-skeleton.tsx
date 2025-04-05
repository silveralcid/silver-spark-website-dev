import { Skeleton } from "@/components/ui/skeleton"

export function ServicesSkeleton() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="space-y-3 text-center mb-12 md:mb-16">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>

        {/* Service tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-32 rounded-lg" />
          ))}
        </div>

        {/* Service content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-4/5 mb-6" />
            <Skeleton className="h-12 w-48" />
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/60 rounded-2xl p-8 shadow-sm">
              <Skeleton className="h-8 w-48 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-2 rounded-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

