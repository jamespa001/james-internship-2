"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

// BookCard Component
import BookCard from "../../components/BookCard";

// Skeleton Related
import ForYouSkeleton from "../../components/skeletons/ForYouSkeleton";

// Interface Import Related
import { Book } from "@/types";

// Function: ForYouPage
export default function ForYouPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
          ),
        ]);

        const selectedData = await selectedRes.json();
        const recommendedData = await recommendedRes.json();
        const suggestedData = await suggestedRes.json();

        // Selected Book
        setSelectedBook(
          Array.isArray(selectedData) ? selectedData[0] : selectedData,
        );
        setRecommendedBooks(recommendedData.slice(0, 5));
        setSuggestedBooks(suggestedData.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <ForYouSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1070px] px-8 py-10">
        {/* Section 1: Selected Just For You */}
        {selectedBook && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-[#03314b]">
              Selected just for you
            </h2>
            <Link
              href={`/book/${selectedBook.id}`}
              className="relative grid cursor-pointer grid-cols-1 items-start rounded-[4px] bg-[#fbefd6] p-4 shadow-sm transition-all hover:shadow-md lg:w-2/3 lg:grid-cols-12"
            >
              <div className="w-full self-start pr-1 text-[16px] leading-relaxed font-normal text-[#03314b] lg:col-span-4">
                {selectedBook.subTitle}
              </div>

              <div className="mx-auto hidden h-full w-px bg-[#BAC8C6] lg:col-span-1 lg:block"></div>

              <div className="mt-6 flex items-start gap-6 lg:col-span-5 lg:mt-0 lg:pl-4">
                <img
                  src={selectedBook.imageLink}
                  alt={selectedBook.title}
                  className="h-36 w-24 rounded object-cover shadow"
                />
                <div className="relative flex w-full flex-col justify-start self-start pr-12">
                  {selectedBook.subscriptionRequired && (
                    <span className="mb-2 w-fit rounded-full bg-[#03314b] px-3 py-0.5 text-xs font-semibold text-white">
                      Premium
                    </span>
                  )}

                  <h3 className="mb-1 text-base font-bold text-[#03314b]">
                    {selectedBook.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {selectedBook.author}
                  </p>

                  <div className="flex shrink-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#03314b] text-white shadow">
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </div>
                    <span className="shrink-0 text-sm font-medium whitespace-nowrap text-gray-700">
                      3-min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Section 2: Recommended Books */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-[#03314b]">
            Recommended For You
          </h2>
          <p className="text-normal mb-6 font-light text-gray-500">
            We think you'll like these
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {recommendedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Section 3: Suggested Books */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-[#03314b]">
            Suggested Books
          </h2>
          <p className="text-normal mb-6 font-light text-gray-500">
            Browse these books
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {suggestedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
