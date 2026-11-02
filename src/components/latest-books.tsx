"use client";

import { useEffect, useState } from "react";
import { BookCard, BookCardSkeleton } from "@/components/book-card";
import { apiJson, publicApiFetch } from "@/lib/api";
import type { Book } from "@/lib/books";

export function LatestBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    publicApiFetch("/books?limit=6")
      .then(apiJson<Book[]>)
      .then((result) => {
        if (active) setBooks(result);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : "Could not load the newest books.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="latest-grid" role="status" aria-label="Loading newest books">
        {Array.from({ length: 6 }, (_, index) => <BookCardSkeleton key={index} />)}
      </div>
    );
  }
  if (error) {
    return <p className="inline-error" role="alert">Could not load the newest books: {error}</p>;
  }
  if (books.length === 0) {
    return <p className="inline-empty">No books have been added yet. Check back soon.</p>;
  }
  return <div className="latest-grid">{books.slice(0, 6).map((book) => <BookCard key={book.id} book={book} />)}</div>;
}
