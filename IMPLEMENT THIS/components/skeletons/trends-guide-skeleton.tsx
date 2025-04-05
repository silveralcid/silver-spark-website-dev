import { Skeleton } from "@/components/ui/skeleton"

export function TrendsGuideSkeleton() {
  return (
    <section className="relative h-[33.33vh] min-h-[350px] overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0 bg-black" />

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Column - Text and Form */}
          <div className="text-white">
            <Skeleton className="h-10 w-full max-w-md bg-gray-800 mb-3" />
            <Skeleton className="h-10 w-3/4 max-w-sm bg-gray-800 mb-6" />
            <Skeleton className="h-6 w-full max-w-md bg-gray-800 mb-8" />

            <div className="max-w-md">
              <div className="relative">
                <Skeleton className="h-12 w-full bg-gray-800 rounded-md" />
                <Skeleton className="h-12 w-32 bg-gray-800 rounded-md mt-2 sm:mt-0 sm:absolute sm:right-0 sm:top-0" />
              </div>
              <Skeleton className="h-3 w-full bg-gray-800 mt-3" />
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-md h-[300px] md:h-[250px]">
              <Skeleton className="h-full w-full transform rotate-6 bg-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

