import Link from "next/link";
import { BookCardProps } from "@/types";

// Function: BookCard
export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="group relative flex cursor-pointer flex-col rounded-[8px] bg-white p-4 shadow-sm transition-all hover:shadow-md"
    >
      {/* Premium Badge if applicable */}
      {book.subscriptionRequired && (
        <span className="absolute top-2 right-2 z-10 rounded-full bg-[#03314b] px-2 py-0.5 text-[10px] font-semibold text-white">
          Premium
        </span>
      )}

      {/* Book cover wrapper */}
      <div className="mb-3 overflow-hidden rounded-[8px] bg-white shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
        <img
          src={book.imageLink}
          alt={book.title}
          className="h-48 w-full object-cover"
        />
      </div>

      <h4 className="line-clamp-1 font-bold text-[#03314b]">{book.title}</h4>
      <p className="line-clamp-1 text-sm text-gray-600">{book.author}</p>

      {/* Optional rating / read time metadata */}
      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
        <span>{book.audioLength}</span>
      </div>
    </Link>
  );
}
