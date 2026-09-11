// Function: SettingsSkeleton
export function SettingsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="mx-auto max-w-[800px] px-8 py-10">
        {/* Title Header Skeleton */}
        <div className="mb-8 h-9 w-32 rounded bg-gray-200"></div>

        <div className="space-y-6">
          {/* Box 1: Subscription Plan Skeleton */}
          <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 h-6 w-48 rounded bg-gray-200"></div>
            <div className="flex items-center justify-between border-b border-gray-100 py-4">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-gray-200"></div>
                <div className="h-3 w-64 rounded bg-gray-200"></div>
              </div>
              <div className="h-10 w-24 rounded-lg bg-gray-200"></div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-200"></div>
              <div className="h-4 w-40 rounded bg-gray-200"></div>
            </div>
          </div>

          {/* Box 2: Account Details Skeleton */}
          <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 h-6 w-36 rounded bg-gray-200"></div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-gray-200"></div>
                <div className="h-4 w-48 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
