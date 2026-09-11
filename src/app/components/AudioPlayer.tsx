"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, RotateCw, Volume2 } from "lucide-react";
import { AudioPlayerProps } from "@/types";

// Function: AudioPlayer
export default function AudioPlayer({ book }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (book && audioRef.current) {
      audioRef.current.src = book.audioLink;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => console.log("Autoplay blocked:", e));
    }
  }, [book]);

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

  if (!book) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between bg-[#032b41] px-6 py-3 text-white shadow-lg">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Left: Book Thumbnail, Title & Author */}
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

      {/* Center: Playback Controls & Progress Bar */}
      <div className="flex w-2/4 max-w-xl flex-col items-center">
        <div className="mb-1 flex items-center gap-6">
          {/* Skip Back 10s */}
          <button
            onClick={() => skipTime(-10)}
            className="text-gray-300 transition hover:text-white"
          >
            <RotateCcw className="h-5 w-5" />
          </button>

          {/* Play / Pause Button */}
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

          {/* Skip Forward 10s */}
          <button
            onClick={() => skipTime(10)}
            className="text-gray-300 transition hover:text-white"
          >
            <RotateCw className="h-5 w-5" />
          </button>
        </div>

        {/* Timeline Scrubber */}
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

      {/* Right: Volume / Extras Placeholder */}
      <div className="flex w-1/4 items-center justify-end gap-3 text-gray-300">
        <Volume2 className="h-5 w-5" />
      </div>
    </div>
  );
}
