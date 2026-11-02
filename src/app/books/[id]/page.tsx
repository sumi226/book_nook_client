import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bookmark } from "lucide-react";
import { BookCover } from "@/components/book-card";
import { BorrowActions } from "@/components/borrow-actions";
import { apiJson, publicApiFetch } from "@/lib/api";
import { isBookAvailable, type Book } from "@/lib/books";

const getBook = cache(async (id: string) => {
  const response = await publicApiFetch(`/books/${encodeURIComponent(id)}`);
  if (response.status === 404) return null;
  return apiJson<Book>(response);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);
  return { title: book?.title ?? "Book Not Found" };
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) notFound();

  const available = isBookAvailable(book);
  return (
    <main id="main-content">
      <div className="detail-topline section-wrap">
        <Link className="back-link" href="/books"><ArrowLeft size={15} /> Back to all books</Link>
        <span>THE BOOK NOOK LIBRARY / {book.category.toUpperCase()}</span>
      </div>
      <section className="book-detail section-wrap">
        <div className="detail-art">
          <BookCover book={book} large />
          <span className={`availability ${available ? "is-available" : ""}`}>
            <span />{available ? `${book.availableCopies} copies available` : "Not Available"}
          </span>
          <div className="detail-art-caption"><span>A STORY TO PASS ALONG</span><span>SHARED WITH CARE</span></div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{book.category}</p>
          <h1>{book.title}</h1>
          <p className="detail-byline">by <em>{book.author}</em></p>
          <div className="detail-rule" />
          <p className="detail-description">{book.description}</p>
          <div className="detail-meta">
            <div><span>CATEGORY</span><strong>{book.category}</strong></div>
            <div><span>TOTAL COPIES</span><strong>{book.totalCopies}</strong></div>
            <div><span>AVAILABLE</span><strong>{book.availableCopies}</strong></div>
          </div>
          <BorrowActions book={book} />
          <Link className="text-link detail-list-link" href="/my-books">
            <Bookmark size={15} /> See what you&apos;ve added <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
