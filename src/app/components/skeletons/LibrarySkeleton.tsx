// Function: LibrarySkeleton
export default function LibrarySkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="mx-auto max-w-[1070px] px-8 py-10">
        {/* Saved Books & Finished Sections Skeletons */}
        {[1, 2].map((section) => (
          <div key={section} className="mb-12">
            <div className="mb-6 h-8 w-48 rounded bg-gray-200"></div>
            <div className="mb-6 h-4 w-12 rounded bg-gray-200"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {[...Array(3)].map((_, i) => (
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
