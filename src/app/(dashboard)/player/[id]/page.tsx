"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

// Book Helper Related
import { markBookAsFinished } from "@/utils/bookHelpers";

// Skeleton Related
import PlayerSkeleton from "@/app/components/skeletons/PlayerSkeleton";

// Interface Import Related
import { Book } from "@/types";

import { useFont } from "@/context/FontContext";

// Function: PlayerPage
export default function PlayerPage() {
  const params = useParams();
  const id = params?.id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { fontSize } = useFont();

  useEffect(() => {
    if (!id) return;

    async function fetchBookForPlayer() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        );
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch player book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookForPlayer();
  }, [id]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (loading) {
    return <PlayerSkeleton />;
  }

  if (!book) {
    return (
      <div className="py-20 text-center text-gray-500">Book not found.</div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white pb-24">
      {/* Handle Time Update */}
      <audio
        ref={audioRef}
        src={book.audioLink}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          markBookAsFinished(book);
        }}
      />

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-[800px] px-6 py-10">
        <Link
          href={`/book/${book.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#03314b] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to book details
        </Link>

        <div className="mb-8 flex items-center gap-6 border-b border-gray-200 pb-8">
          <img
            src={book.imageLink}
            alt={book.title}
            className="h-32 w-24 rounded object-cover shadow"
          />
          <div>
            <h1 className="mb-1 text-2xl font-bold text-[#03314b]">
              {book.title}
            </h1>
            <p className="text-gray-600">{book.author}</p>
          </div>
        </div>

        <div className="prose max-w-none leading-relaxed text-gray-800">
          <h3 className="mb-4 text-xl font-bold text-[#03314b]">
            Audio Summary
          </h3>
          {/* Apply the fontSize state class here */}
          <p className={`${fontSize} transition-all duration-200`}>
            {book.summary || book.subTitle}
          </p>
        </div>
      </div>

      {/* Fixed Bottom Audio Player */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between bg-[#032b41] px-6 py-3 text-white shadow-lg">
        {/* Left: Thumbnail & Title */}
        <div className="flex w-1/4 items-center gap-4">
          <img
            src={book.imageLink}
            alt={book.title}
            className="h-12 w-10 rounded object-cover shadow"
          />
          <div className="flex flex-col truncate">
            <h4 className="truncate text-sm font-bold">{book.title}</h4>
            <p className="truncate text-xs text-gray-300">{book.author}</p>
          </div>
        </div>

        {/* Center: Playback Controls & Scrubber */}
        <div className="flex w-2/4 max-w-xl flex-col items-center">
          <div className="mb-1 flex items-center gap-6">
            <button
              onClick={() => skipTime(-10)}
              className="text-gray-300 transition hover:text-white"
            >
              <RotateCcw className="h-5 w-5" />
            </button>

            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#032b41] transition hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              )}
            </button>

            <button
              onClick={() => skipTime(10)}
              className="text-gray-300 transition hover:text-white"
            >
              <RotateCw className="h-5 w-5" />
            </button>
          </div>

          <div className="flex w-full items-center gap-3 text-xs text-gray-300">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-600 accent-[#2bd9d0]"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex w-1/4 items-center justify-end gap-3 text-gray-300">
          <Volume2 className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
