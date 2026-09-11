"use client";

import { useState, useEffect } from "react";

// Skeleton Related
import LibrarySkeleton from "@/app/components/skeletons/LibrarySkeleton";

// Book Card
import BookCard from "../../components/BookCard";

// Interface Import Related
import { Book } from "@/types";

// Function: LibraryPage
export default function LibraryPage() {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const saved = JSON.parse(localStorage.getItem("myLibraryBooks") || "[]");
      const finished = JSON.parse(
        localStorage.getItem("finishedBooks") || "[]",
      );

      setSavedBooks(saved);
      setFinishedBooks(finished);
    } catch (error) {
      console.error("Failed to fetch library books:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LibrarySkeleton />;
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1070px] px-8 py-10">
        {/* Saved Books Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-[#03314b]">
            Saved Books
          </h2>
          <p className="mb-6 text-sm font-light text-gray-500">
            {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
          </p>

          {savedBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {savedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
              <p className="font-medium">You don't have any saved books yet.</p>
              <p className="mt-1 text-sm">Bookmark books to read later.</p>
            </div>
          )}
        </section>

        {/* Finished Books Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-[#03314b]">Finished</h2>
          <p className="mb-6 text-sm font-light text-gray-500">
            {finishedBooks.length}{" "}
            {finishedBooks.length === 1 ? "item" : "items"}
          </p>
          {finishedBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {finishedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
              <p className="font-medium">You haven't finished any books yet.</p>
              <p className="mt-1 text-sm">
                Completed books will appear here automatically.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
