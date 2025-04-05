import { Skeleton } from "@/components/ui/skeleton"

export function CaseStudiesSkeleton() {
  return (
    <section className="relative overflow-hidden bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-64 mx-auto mb-2 bg-gray-800" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto bg-gray-800" />
        </div>

        <div className="bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Business List */}
            <div className="w-full lg:w-1/3 relative border-r border-gray-800 p-6">
              <Skeleton className="h-8 w-48 mb-6 bg-gray-800" />

              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg bg-gray-800" />
                ))}
              </div>
            </div>

            {/* Right Column - Business Details */}
            <div className="w-full lg:w-2/3 flex flex-col relative overflow-hidden bg-white p-6">
              <div className="mb-6 text-center">
                <Skeleton className="h-8 w-48 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>

              <div className="flex justify-center space-x-1 mb-6 overflow-x-auto pb-1">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded" />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-6 w-full mb-6" />
                  <Skeleton className="h-6 w-full mb-6" />
                  <Skeleton className="h-6 w-4/5 mb-6" />

                  <Skeleton className="h-7 w-48 mb-3" />
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-8 w-32 rounded-md" />
                    ))}
                  </div>

                  <Skeleton className="h-7 w-48 mb-3" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-start">
                        <Skeleton className="h-5 w-5 rounded-full mr-3 mt-1" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <Skeleton className="h-52 md:h-60 w-full mb-8 rounded-md" />

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <Skeleton className="h-16 w-24 mx-auto mb-2" />
                      <Skeleton className="h-4 w-32 mx-auto" />
                    </div>
                    <div className="text-center">
                      <Skeleton className="h-16 w-24 mx-auto mb-2" />
                      <Skeleton className="h-4 w-32 mx-auto" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-auto">
                    <Skeleton className="h-10 w-full sm:w-1/2" />
                    <Skeleton className="h-10 w-full sm:w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

