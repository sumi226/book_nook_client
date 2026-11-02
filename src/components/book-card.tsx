import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Book } from "@/lib/books";
import { isBookAvailable } from "@/lib/books";

export function BookCover({
  book,
  large = false,
}: {
  book: Pick<Book, "image" | "title">;
  large?: boolean;
}) {
  return (
    <div className={`book-cover ${large ? "book-cover-large" : ""}`}>
      <Image
        src={book.image}
        alt={`${book.title} cover`}
        fill
        unoptimized
        sizes={large ? "(max-width: 700px) 55vw, 245px" : "(max-width: 700px) 60vw, 190px"}
        className="book-cover-image"      />
    </div>
  );
}

export function BookCard({ book }: { book: Book }) {
  const available = isBookAvailable(book);
  return (
    <article className="book-card">
      <Link
        className="book-card-art"
        href={`/books/${book.id}`}
        aria-label={`View ${book.title} by ${book.author}`}
      >
        <BookCover book={book} />
        <span className={`availability ${available ? "is-available" : ""}`}>
          <span /> {available ? `${book.availableCopies} available` : "Not Available"}
        </span>
      </Link>
      <div className="book-card-copy">
        <div className="book-card-heading">
          <div>
            <p className="book-category">{book.category}</p>
            <h3><Link href={`/books/${book.id}`}>{book.title}</Link></h3>
            <p className="book-author">{book.author}</p>
          </div>
        </div>
        <Link className="book-card-link" href={`/books/${book.id}`}>
          View details <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="book-card-skeleton" aria-hidden="true">
      <div className="book-card-skeleton-art" />
      <div className="book-card-skeleton-line" />
      <div className="book-card-skeleton-line short" />
    </div>
  );
}
