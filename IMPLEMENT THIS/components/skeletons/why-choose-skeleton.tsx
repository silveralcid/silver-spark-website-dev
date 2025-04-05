import { Skeleton } from "@/components/ui/skeleton"

export function WhyChooseSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-white relative min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col p-4 rounded-lg border border-gray-100">
              <div className="flex items-start mb-2 md:mb-3">
                <Skeleton className="h-8 w-8 mr-2" />
                <Skeleton className="h-7 w-48" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <div className="mt-auto relative h-px w-full">
                <Skeleton className="h-px w-2/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

