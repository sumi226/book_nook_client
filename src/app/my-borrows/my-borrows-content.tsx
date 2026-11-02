"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { BookCover } from "@/components/book-card";
import { useToast } from "@/components/toast-provider";
import { apiErrorMessage, apiJson, authenticatedApiFetch } from "@/lib/api";
import type { Borrow } from "@/lib/books";

export function MyBorrowsContent() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    authenticatedApiFetch("/borrows")
      .then(apiJson<Borrow[]>)
      .then((result) => {
        if (active) setBorrows(result);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : "Could not load your borrowed books.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function returnBook(borrow: Borrow) {
    setReturningId(borrow.id);
    try {
      const response = await authenticatedApiFetch(
        `/borrows/${encodeURIComponent(borrow.id)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        throw new Error(await apiErrorMessage(response));
      }
      const returnedAt = new Date().toISOString();
      setBorrows((items) =>
        items.map((item) =>
          item.id === borrow.id ? { ...item, returnedAt } : item,
        ),
      );
      showToast(`${borrow.bookTitle} has been returned.`);
    } catch (reason) {
      showToast(
        reason instanceof Error ? reason.message : "Could not return this book.",
        "error",
      );
    } finally {
      setReturningId(null);
    }
  }

  const activeCount = borrows.filter((borrow) => !borrow.returnedAt).length;
  return (
    <main id="main-content">
      <section className="page-intro personal-intro">
        <p className="eyebrow"><span className="eyebrow-line" />Stories out in the world</p>
        <h1>My <em>borrowed books.</em></h1>
        <p>A little reading at a time. When you&apos;re done, send your story back to the shelf.</p>
        <div className="intro-meta">
          <span>YOUR BORROWED SHELF</span>
          <span>{String(activeCount).padStart(2, "0")} STORIES WITH YOU</span>
        </div>
      </section>
      <section className="personal-section section-wrap">
        <p className="section-kicker">YOUR BORROWING HISTORY</p>
        {loading ? (
          <div className="catalog-loading" role="status"><span className="loading-mark">✳</span><p>Gathering your borrowed books…</p></div>
        ) : error ? (
          <div className="empty-state"><span className="empty-state-mark">!</span><h2>Your borrowed shelf couldn&apos;t load.</h2><p>{error}</p></div>
        ) : borrows.length ? (
          <div className="borrow-list">
            {borrows.map((borrow) => {
              const returned = Boolean(borrow.returnedAt);
              return (
                <article className="borrow-row" key={borrow.id}>
                  <Link className="borrow-cover" href={`/books/${borrow.bookId}`}>
                    <BookCover book={{ image: borrow.bookImage, title: borrow.bookTitle }} />
                  </Link>
                  <div className="borrow-copy">
                    <p className="book-category">{returned ? "Returned" : "Currently with you"}</p>
                    <h2><Link href={`/books/${borrow.bookId}`}>{borrow.bookTitle}</Link></h2>
                    <div className="due-date">
                      <Clock3 size={14} />
                      {returned ? (
                        <>Returned <strong>{new Date(borrow.returnedAt!).toLocaleDateString()}</strong></>
                      ) : (
                        <>Return by <strong>{new Date(borrow.returnDate).toLocaleDateString()}</strong></>
                      )}
                    </div>
                  </div>
                  {returned ? (
                    <span className="returned-label"><Check size={15} /> Returned</span>
                  ) : (
                    <button
                      className="button button-outline return-button"
                      disabled={returningId === borrow.id}
                      onClick={() => returnBook(borrow)}
                    >
                      <Check size={15} /> {returningId === borrow.id ? "Returning…" : "Return this book"}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state-mark">♡</span>
            <h2>All stories have found their way home.</h2>
            <p>Pick something new whenever you&apos;re ready for your next chapter.</p>
            <Link className="button button-primary" href="/books">Find another book</Link>
          </div>
        )}
        <Link className="text-link" href="/my-profile">
          My profile <ArrowUpRight size={14} />
        </Link>
      </section>
    </main>
  );
}
