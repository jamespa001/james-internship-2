// Function: SearchDropdownSkeleton
export function SearchDropdownSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="animate-pulse space-y-4 py-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 px-3 py-2">
          {/* Thumbnail Placeholder */}
          <div className="h-14 w-10 shrink-0 rounded bg-gray-200" />

          {/* Text Placeholders */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-4/5 rounded bg-gray-200" />
            <div className="h-3 w-2/5 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
