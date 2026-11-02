"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { BookCover } from "@/components/book-card";
import { DeleteAction } from "@/components/borrow-actions";
import { readerBooks } from "@/lib/books";

export function MyBooksContent() {
  const [bookIds, setBookIds] = useState(readerBooks.map((book) => book.id));
  const myBooks = readerBooks.filter((book) => bookIds.includes(book.id));

  return (
    <main id="main-content">
      <section className="page-intro personal-intro">
        <p className="eyebrow"><span className="eyebrow-line" />Your little collection</p>
        <h1>My <em>bookshelf.</em></h1>
        <p>Stories you have shared with the nook. Every book here can find a new reader.</p>
        <div className="intro-meta">
          <span>YOUR BOOK NOOK</span>
          <span>{String(myBooks.length).padStart(2, "0")} BOOKS ON YOUR SHELF</span>
        </div>
      </section>
      <section className="personal-section section-wrap">
        <div className="personal-toolbar">
          <p>These are the stories you have added to our shared library.</p>
          <Link className="button button-primary" href="/add-book">
            <Plus size={16} /> Add a book
          </Link>
        </div>
        {myBooks.length ? (
          <div className="personal-grid">
            {myBooks.map((book) => (
              <article className="personal-book" key={book.id}>
                <Link className="personal-cover" href={`/books/${book.id}`}>
                  <BookCover book={book} />
                </Link>
                <div className="personal-book-copy">
                  <p className="book-category">{book.category}</p>
                  <h2><Link href={`/books/${book.id}`}>{book.title}</Link></h2>
                  <p className="book-author">{book.author}</p>
                  <span className={`availability ${book.available ? "is-available" : ""}`}>
                    <span />
                    {book.available ? "Ready for a reader" : "Currently borrowed"}
                  </span>
                  <div className="personal-book-actions">
                    <Link href={`/edit-book/${book.id}`} className="text-link">
                      Edit details <ArrowUpRight size={14} />
                    </Link>
                    <DeleteAction
                      title={book.title}
                      onDelete={() =>
                        setBookIds((ids) => ids.filter((id) => id !== book.id))
                      }
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state-mark">✳</span>
            <h2>Your shelf is waiting.</h2>
            <p>Add a story and make room for its next reader.</p>
            <Link className="button button-primary" href="/add-book">Add the first book</Link>
          </div>
        )}
      </section>
    </main>
  );
}
