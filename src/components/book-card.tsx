import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import type { CSSProperties } from "react";
import type { Book } from "@/lib/books";

export function BookCover({
  book,
  large = false,
}: {
  book: Book;
  large?: boolean;
}) {
  return (
    <div
      className={`book-cover ${large ? "book-cover-large" : ""}`}
      style={{ "--cover-color": book.color } as CSSProperties}
      aria-label={`Illustrated cover for ${book.title}`}
      role="img"
    >
      <span className="cover-topline">THE BOOK NOOK LIBRARY</span>
      <span className="cover-motif" aria-hidden="true">{book.motif}</span>
      <span className="cover-title">{book.title}</span>
      <span className="cover-rule" />
      <span className="cover-author">{book.author}</span>
      <span className="cover-bottomline">A STORY TO PASS ALONG</span>
    </div>
  );
}

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="book-card">
      <Link
        className="book-card-art"
        href={`/books/${book.id}`}
        aria-label={`View ${book.title} by ${book.author}`}
      >
        <BookCover book={book} />
        <span className={`availability ${book.available ? "is-available" : ""}`}>
          <span /> {book.available ? "On the shelf" : "Currently borrowed"}
        </span>
      </Link>
      <div className="book-card-copy">
        <div className="book-card-heading">
          <div>
            <p className="book-category">{book.category}</p>
            <h3><Link href={`/books/${book.id}`}>{book.title}</Link></h3>
            <p className="book-author">{book.author}</p>
          </div>
          <span className="book-rating"><Star size={13} fill="currentColor" /> {book.rating}</span>
        </div>
        <Link className="book-card-link" href={`/books/${book.id}`}>
          View details <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
