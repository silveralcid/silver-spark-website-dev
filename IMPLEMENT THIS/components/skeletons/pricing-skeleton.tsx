import { Skeleton } from "@/components/ui/skeleton"

export function PricingSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 bg-gray-50 opacity-50 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.05) 2%, transparent 0%)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-3 text-center mb-12 md:mb-16">
          <Skeleton className="h-10 w-96 mx-auto" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Package cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-xl p-6 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Skeleton className="w-10 h-10 rounded-full mr-3" />
                    <Skeleton className="h-7 w-24" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-4 w-16 ml-auto mt-1" />
                  </div>
                </div>

                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-4/5 mb-6" />

                <Skeleton className="h-10 w-full rounded-md mt-6" />
              </div>
            ))}
          </div>

          {/* Milestone payment schedule */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden relative mb-8">
            <Skeleton className="h-8 w-48 m-6" />

            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 overflow-x-auto p-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-full md:w-48 bg-white rounded-lg border border-gray-200 p-4">
                  <div className="text-center mb-2">
                    <Skeleton className="w-8 h-8 rounded-full mx-auto" />
                  </div>
                  <Skeleton className="h-5 w-32 mx-auto mb-1" />
                  <Skeleton className="h-3 w-24 mx-auto mb-2" />
                  <Skeleton className="h-6 w-16 mx-auto" />
                  <Skeleton className="h-3 w-12 mx-auto mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Custom pricing CTA */}
          <div className="mt-12 bg-black p-8 rounded-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-4 bg-gray-700" />
                <div>
                  <Skeleton className="h-8 w-64 mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-96 bg-gray-700" />
                </div>
              </div>
              <Skeleton className="h-12 w-48 rounded-md bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

