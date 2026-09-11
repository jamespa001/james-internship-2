import React from "react";
import { ArrowLeft, Volume2, RotateCcw, Play, RotateCw } from "lucide-react";

// Function: PlayerSkeleton
export default function PlayerSkeleton() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-white pb-24">
      {/* Main Content Area Skeleton */}
      <div className="mx-auto w-full max-w-[800px] px-6 py-10">
        {/* Back Link Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4 text-gray-300" />
          <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Header Book Info Skeleton */}
        <div className="mb-8 flex items-center gap-6 border-b border-gray-200 pb-8">
          <div className="h-32 w-24 animate-pulse rounded bg-gray-200 shadow" />
          <div className="flex flex-col gap-2">
            <div className="h-7 w-64 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Audio Summary Prose Skeleton */}
        <div className="prose max-w-none">
          <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Audio Player Skeleton (Respects Sidebar on Desktop with md:left-72) */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between bg-[#032b41] px-6 py-3 text-white shadow-lg">
        {/* Left: Thumbnail & Title Skeleton */}
        <div className="flex w-1/4 items-center gap-4">
          <div className="h-12 w-10 animate-pulse rounded bg-gray-700 shadow" />
          <div className="flex flex-col gap-1">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-700" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-700" />
          </div>
        </div>

        {/* Center: Playback Controls & Scrubber Skeleton */}
        <div className="flex w-2/4 max-w-xl flex-col items-center">
          <div className="mb-1 flex items-center gap-6 text-gray-500">
            <RotateCcw className="h-5 w-5" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700" />
            <RotateCw className="h-5 w-5" />
          </div>

          <div className="flex w-full items-center gap-3 text-xs text-gray-500">
            <div className="h-3 w-8 animate-pulse rounded bg-gray-700" />
            <div className="h-1.5 w-full animate-pulse rounded-lg bg-gray-700" />
            <div className="h-3 w-8 animate-pulse rounded bg-gray-700" />
          </div>
        </div>

        {/* Right Controls Skeleton */}
        <div className="flex w-1/4 items-center justify-end gap-3 text-gray-500">
          <Volume2 className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
