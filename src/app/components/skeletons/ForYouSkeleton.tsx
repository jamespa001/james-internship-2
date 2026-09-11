// Function: ForYouSkeleton
export default function ForYouSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Search Header Skeleton */}
      <div className="mx-auto max-w-[1070px] px-8 py-10">
        {/* Section 1: Selected Just For You Skeleton */}
        <div className="mb-12">
          <div className="mb-4 h-8 w-56 rounded bg-gray-200"></div>
          <div className="flex h-48 w-full items-center rounded-[4px] bg-[#fdf6ec] p-4 md:w-2/3">
            <div className="w-full space-y-2 pr-4 md:col-span-4">
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
            <div className="mx-4 hidden h-36 w-px bg-gray-300 md:block"></div>
            <div className="hidden w-full items-center gap-6 pl-4 md:col-span-7 md:flex">
              <div className="h-36 w-24 shrink-0 rounded bg-gray-200"></div>
              <div className="w-full space-y-3">
                <div className="h-5 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 & 3 Skeleton Generator Function */}
        {[1, 2].map((section) => (
          <div key={section} className="mb-12">
            <div className="mb-2 h-8 w-64 rounded bg-gray-200"></div>
            <div className="mb-6 h-4 w-40 rounded bg-gray-200"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <div className="h-48 w-full rounded-[8px] bg-gray-200"></div>
                  <div className="h-4 w-4/5 rounded bg-gray-200"></div>
                  <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
