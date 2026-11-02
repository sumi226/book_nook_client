"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { BookCover } from "@/components/book-card";
import { DeleteAction } from "@/components/borrow-actions";
import { apiErrorMessage, apiJson, authenticatedApiFetch } from "@/lib/api";
import { isBookAvailable, type Book } from "@/lib/books";

export function MyBooksContent() {
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    authenticatedApiFetch("/books/mine")
      .then(apiJson<Book[]>)
      .then((books) => {
        if (active) setMyBooks(books);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : "Could not load your books.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function deleteBook(bookId: string) {
    const response = await authenticatedApiFetch(`/books/${encodeURIComponent(bookId)}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(await apiErrorMessage(response));
    }
    setMyBooks((books) => books.filter((book) => book.id !== bookId));
  }

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
        {loading ? (
          <div className="catalog-loading" role="status"><span className="loading-mark">✳</span><p>Gathering your books…</p></div>
        ) : error ? (
          <div className="empty-state"><span className="empty-state-mark">!</span><h2>Your shelf couldn&apos;t load.</h2><p>{error}</p></div>
        ) : myBooks.length ? (
          <div className="personal-grid">
            {myBooks.map((book) => {
              const available = isBookAvailable(book);
              return (
                <article className="personal-book" key={book.id}>
                  <Link className="personal-cover" href={`/books/${book.id}`}>
                    <BookCover book={book} />
                  </Link>
                  <div className="personal-book-copy">
                    <p className="book-category">{book.category}</p>
                    <h2><Link href={`/books/${book.id}`}>{book.title}</Link></h2>
                    <p className="book-author">{book.author}</p>
                    <span className={`availability ${available ? "is-available" : ""}`}>
                      <span />
                      {available ? `${book.availableCopies} of ${book.totalCopies} available` : "Not Available"}
                    </span>
                    <div className="personal-book-actions">
                      <Link href={`/edit-book/${book.id}`} className="text-link">
                        Edit details <ArrowUpRight size={14} />
                      </Link>
                      <DeleteAction
                        title={book.title}
                        onDelete={() => deleteBook(book.id)}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
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
