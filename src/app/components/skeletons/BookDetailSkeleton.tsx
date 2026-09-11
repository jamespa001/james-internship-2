// Function: BookDetailSkeleton
export default function BookDetailSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Main Details Wrapper */}
      <div className="mx-auto max-w-[1070px] px-8 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Metadata & Actions Skeleton */}
          <div className="lg:col-span-8">
            {/* Row 1: Title, Author, Subtitle */}
            <div className="mb-6 space-y-2">
              <div className="h-9 w-3/4 rounded-md bg-gray-200" />
              <div className="h-6 w-1/3 rounded-md bg-gray-200" />
              <div className="h-5 w-2/3 rounded-md bg-gray-200" />
            </div>

            {/* Row 2: Ratings and Key Metrics Skeleton */}
            <div className="mb-6 flex flex-col gap-3 border-t border-b border-gray-200 py-6">
              <div className="flex items-center gap-8">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="h-5 w-20 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-8">
                <div className="h-5 w-28 rounded bg-gray-200" />
                <div className="h-5 w-24 rounded bg-gray-200" />
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="h-12 w-28 rounded-lg bg-gray-200" />
              <div className="h-12 w-28 rounded-lg bg-gray-200" />
            </div>

            {/* Save Button Skeleton */}
            <div className="mb-10 h-6 w-52 rounded bg-gray-200" />

            {/* Tags Skeleton */}
            <div className="mb-8 space-y-3">
              <div className="h-6 w-36 rounded bg-gray-200" />
              <div className="flex flex-wrap gap-3">
                <div className="h-9 w-24 rounded-md bg-gray-200" />
                <div className="h-9 w-28 rounded-md bg-gray-200" />
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="mb-10 space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>

            {/* Author Section Skeleton */}
            <div className="space-y-2">
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          </div>

          {/* Right Column: Book Cover / Arch Skeleton */}
          <div className="flex justify-center lg:col-span-4 lg:justify-end">
            <div className="relative h-[380px] w-[260px] overflow-visible">
              <div className="absolute bottom-20 left-1/3 h-[150px] w-[300px] -translate-x-1/2 rounded-t-full bg-gray-200" />
              <div className="absolute inset-0 h-[300px] w-[180px] rounded-l bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
