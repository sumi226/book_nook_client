"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { BookCover } from "@/components/book-card";
import { borrowedBooks } from "@/lib/books";

export function MyBorrowsContent() {
  const [returned, setReturned] = useState<string[]>([]);
  const current = borrowedBooks.filter((book) => !returned.includes(book.id));

  return (
    <main id="main-content">
      <section className="page-intro personal-intro">
        <p className="eyebrow"><span className="eyebrow-line" />Stories out in the world</p>
        <h1>My <em>borrowed books.</em></h1>
        <p>A little reading at a time. When you&apos;re done, send your story back to the shelf.</p>
        <div className="intro-meta">
          <span>YOUR BORROWED SHELF</span>
          <span>{String(current.length).padStart(2, "0")} STORIES WITH YOU</span>
        </div>
      </section>
      <section className="personal-section section-wrap">
        <p className="section-kicker">CURRENTLY WITH YOU</p>
        {current.length ? (
          <div className="borrow-list">
            {current.map((book, index) => (
              <article className="borrow-row" key={book.id}>
                <Link className="borrow-cover" href={`/books/${book.id}`}>
                  <BookCover book={book} />
                </Link>
                <div className="borrow-copy">
                  <p className="book-category">{book.category}</p>
                  <h2><Link href={`/books/${book.id}`}>{book.title}</Link></h2>
                  <p className="book-author">{book.author}</p>
                  <div className="due-date">
                    <Clock3 size={14} /> Return by{" "}
                    <strong>Nov {12 + index * 6}, 2026</strong>
                  </div>
                </div>
                <button
                  className="button button-outline return-button"
                  onClick={() =>
                    setReturned((ids) => [...ids, book.id])
                  }
                >
                  <Check size={15} /> Return this book
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state-mark">♡</span>
            <h2>All stories have found their way home.</h2>
            <p>Pick something new whenever you&apos;re ready for your next chapter.</p>
            <Link className="button button-primary" href="/books">Find another book</Link>
          </div>
        )}
        <p className="mock-note shelf-mock-note">
          This borrowed shelf is sample content for the frontend demo. Changes reset when the page is refreshed.
        </p>
        <Link className="text-link" href="/my-profile">
          My profile <ArrowUpRight size={14} />
        </Link>
      </section>
    </main>
  );
}
