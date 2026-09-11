"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, Clock } from "lucide-react";

// Skeleton Related
import { SearchDropdownSkeleton } from "./skeletons/SearchDropDownSkeleton";

// Interface Import
import { Book } from "@/types";

// Function: HeaderSearch
export default function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch results incrementally as the user types
  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      setLoading(false);
      setIsOpen(false);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            query,
          )}`,
        );
        const data = await res.json();
        setBooks(Array.isArray(data) ? data : []);
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchBooks, 250); // slight debounce for smooth typing
    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mx-auto flex max-w-[1070px] justify-end px-8 py-6">
      <div className="relative w-full max-w-md sm:w-[340px]" ref={searchRef}>
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books"
            className="w-full rounded-[8px] border border-gray-200 bg-[#f1f6f4] py-2.5 pr-12 pl-4 text-sm text-gray-800 antialiased transition-colors placeholder:text-[13px] placeholder:font-normal placeholder:text-gray-500 focus:border-[#2bd9d0] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setBooks([]);
                setIsOpen(false);
              }}
              className="absolute right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <div className="absolute right-3 flex items-center border-l border-gray-200 pl-3 text-gray-500">
              <Search className="h-5 w-5 text-[#03314b]" />
            </div>
          )}
        </div>
        {/* Incremental Search Dropdown Results */}
        {isOpen && (
          <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-[420px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
            {loading ? (
              <SearchDropdownSkeleton count={3} />
            ) : books.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No books found for &quot;{query}&quot;
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {books.map((book) => (
                  <Link
                    key={book.id}
                    href={`/book/${book.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3.5 p-3.5 transition-colors hover:bg-gray-50"
                  >
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      className="h-14 w-10 flex-shrink-0 rounded object-cover shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold text-[#03314b]">
                        {book.title}
                      </h4>
                      <p className="mb-1 truncate text-xs text-gray-500">
                        {book.author}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {book.audioLength}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}{" "}
      </div>
    </div>
  );
}
