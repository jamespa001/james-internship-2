"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search as SearchIcon, Loader2, Clock, Star } from "lucide-react";

// Interface Import Related
import { Book } from "@/types";

// Function: SearchPage
export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Incremental Search
  useEffect(() => {
    // If query is empty, clear results
    if (!searchQuery.trim()) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const fetchSearchedBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            searchQuery,
          )}`,
        );
        const data = await res.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch search results", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    // Delay to prevent hitting the endpoint on every keystroke
    const timer = setTimeout(() => {
      fetchSearchedBooks();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1070px] px-8 py-10">
        <h1 className="mb-6 text-3xl font-bold text-[#03314b]">Search</h1>

        {/* Search Bar Input */}
        <div className="relative mb-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books, authors..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pr-4 pl-12 text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-[#2bd9d0] focus:ring-2 focus:ring-[#2bd9d0]/20 focus:outline-none"
          />
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#2bd9d0]" />
          </div>
        ) : searchQuery.trim() === "" ? (
          <div className="py-16 text-center text-gray-400">
            <SearchIcon className="mx-auto mb-3 h-12 w-12 stroke-[1.5]" />
            <p className="text-lg font-medium text-gray-600">
              Type something to search for books
            </p>
            <p className="text-sm text-gray-400">
              Discover titles, authors, and key insights.
            </p>
          </div>
        ) : books.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-gray-700">
              No books found for &quot;{searchQuery}&quot;
            </p>
            <p className="text-sm text-gray-400">
              Try searching with a different keyword or author name.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
              >
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="h-24 w-16 rounded-md object-cover shadow"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-base font-bold text-[#03314b]">
                    {book.title}
                  </h4>
                  <p className="mb-2 truncate text-sm text-gray-500">
                    {book.author}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {book.audioLength}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
                      {book.averageRating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
