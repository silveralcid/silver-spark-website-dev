import { Skeleton } from "@/components/ui/skeleton"

export function ProcessSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-black text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-48 mx-auto mb-3 bg-gray-800" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto bg-gray-800" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full hidden md:block" style={{ width: "2px" }}>
            <Skeleton className="h-full w-full bg-gray-800" />
          </div>

          <div className="space-y-24">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                  <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                </div>

                <div className="md:flex items-center">
                  {/* Step number - visible on mobile */}
                  <div className="flex items-center mb-4 md:hidden">
                    <Skeleton className="h-8 w-8 rounded-full mr-3 bg-gray-800" />
                    <Skeleton className="h-6 w-32 bg-gray-800" />
                  </div>

                  <div className={`md:w-1/2 md:px-12 mb-8 md:mb-0 ${index % 2 === 0 ? "" : "md:order-2"}`}>
                    <Skeleton className="h-6 w-32 hidden md:block mb-3 bg-gray-800" />
                    <Skeleton className="h-8 w-64 mb-4 bg-gray-800" />
                    <Skeleton className="h-4 w-full mb-6 bg-gray-800" />

                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-start">
                          <Skeleton className="h-5 w-5 rounded-full mr-2 mt-0.5 flex-shrink-0 bg-gray-800" />
                          <Skeleton className="h-4 w-full bg-gray-800" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

