"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  BookOpen,
  Volume2,
  Bookmark,
  Lightbulb,
  Mic,
  Clock,
} from "lucide-react";

// Book Colors Related
import { getBookArchColor } from "@/utils/bookColors";

// Skeleton Related
import BookDetailSkeleton from "../../../components/skeletons/BookDetailSkeleton";

// Interface Import Related
import { Book } from "@/types";

// Function: BookDetailPage
export default function BookDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!book) return;
    // Check if book is already in localStorage
    const savedBooks = JSON.parse(
      localStorage.getItem("myLibraryBooks") || "[]",
    );
    const exists = savedBooks.some((b: Book) => b.id === book.id);
    setIsSaved(exists);
  }, [book]);

  useEffect(() => {
    if (!id) return;

    async function fetchBookDetails() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        );
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <BookDetailSkeleton />;
  }

  if (!book) {
    return (
      <div className="py-20 text-center text-gray-500">Book not found.</div>
    );
  }

  const toggleSaveToLibrary = () => {
    if (!book) return;
    const savedBooks = JSON.parse(
      localStorage.getItem("myLibraryBooks") || "[]",
    );

    let updatedBooks;
    if (isSaved) {
      // Remove from library
      updatedBooks = savedBooks.filter((b: Book) => b.id !== book.id);
      setIsSaved(false);
    } else {
      // Add to library
      updatedBooks = [...savedBooks, book];
      setIsSaved(true);
    }

    localStorage.setItem("myLibraryBooks", JSON.stringify(updatedBooks));
  };

  return (
    <div className="w-full">
      {/* Main Details Wrapper */}
      <div className="mx-auto max-w-[1070px] px-8 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Book Metadata & Actions */}
          <div className="lg:col-span-8">
            {/* Row 1: Title, Author, and Subtitle */}
            <div className="mb-6 space-y-1">
              <h1 className="text-3xl font-bold text-[#03314b]">
                {book.title}
              </h1>
              <p className="text-normal font-medium text-[#032b41]">
                {book.author}
              </p>
              <p className="text-[20px] font-light text-[#032b41]">
                {book.subTitle}
              </p>
            </div>

            {/* Row 2: Ratings and Key Metrics */}
            <div className="mb-6 flex flex-col gap-2.5 border-t border-b border-gray-200 pt-6 pb-6 text-sm text-gray-600">
              {/* Top row of stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-none stroke-[1.5] text-[#032b41]" />
                  <span className="font-semibold text-[#032b41]">
                    {book.averageRating}
                  </span>
                  <span className="font-semibold text-[#032b41]">
                    ({book.totalRating} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-5 w-5 text-[#032b41]" />
                  <span className="font-semibold text-[#032b41]">03:23</span>
                </div>
              </div>

              {/* Bottom row of stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-1.5">
                  <Mic className="h-5 w-5 text-[#032b41]" />
                  <span className="font-semibold text-[#032b41] capitalize">
                    {book.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lightbulb className="h-5 w-5 text-[#032b41]" />
                  <span className="font-semibold text-[#032b41]">
                    {book.keyIdeas} Key ideas
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/player/${book.id}`}
                className="text-normal font-lg flex items-center gap-2 rounded-lg bg-[#03314b] px-6 py-3 text-white transition-opacity hover:opacity-90"
              >
                <BookOpen className="h-6 w-6" />
                Read
              </Link>
              <Link
                href={`/player/${book.id}`}
                className="text-normal flex items-center gap-2 rounded-lg bg-[#03314b] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
              >
                <Volume2 className="h-6 w-6" />
                Listen
              </Link>
            </div>

            <button
              onClick={toggleSaveToLibrary}
              className="mb-10 flex items-center gap-2 text-lg font-medium text-[#0365fe] hover:underline"
            >
              <Bookmark
                className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
              />
              {isSaved ? "Saved in your library" : "Add title to My Library"}
            </button>

            {/* Tags / Categories */}
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-[#03314b]">
                What's it about?
              </h3>
              <div className="flex flex-wrap gap-3">
                {book.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-normal rounded-md bg-[#f1f6f4] px-4 py-2 font-medium text-[#03314b]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Description */}
            <div className="mb-10">
              <p className="leading-relaxed text-gray-700">
                {book.bookDescription}
              </p>
            </div>

            {/* About the author */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-[#03314b]">
                About the author
              </h3>
              <p className="leading-relaxed text-gray-700">
                {book.authorDescription}
              </p>
            </div>
          </div>

          {/* Right Column: Book Cover with Arch Background */}
          <div className="flex justify-center lg:col-span-4 lg:justify-end">
            <div className="relative h-[380px] w-[260px] overflow-visible">
              {/* Arch */}
              <div
                className="absolute bottom-20 left-1/2 z-0 h-[150px] w-[300px] -translate-x-1/2 rounded-t-full transition-colors duration-300"
                style={{ backgroundColor: getBookArchColor(book.id) }}
              />

              {/* Book Cover Image */}
              <img
                src={book.imageLink}
                alt={book.title}
                className="absolute inset-0 z-10 h-[300px] w-[300px] rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
