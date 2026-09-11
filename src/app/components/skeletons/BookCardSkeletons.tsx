// Function: BookCardSkeleton
export function BookCardSkeleton() {
  return (
    <div className="flex w-full max-w-[200px] animate-pulse flex-col gap-3">
      {/* Book Cover Placeholder */}
      <div className="h-[280px] w-full rounded-xl bg-gray-200" />

      {/* Title & Author Placeholder */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
      </div>

      {/* Metadata / Duration Placeholder */}
      <div className="flex items-center gap-4 pt-1">
        <div className="h-3 w-1/4 rounded bg-gray-200" />
        <div className="h-3 w-1/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}
