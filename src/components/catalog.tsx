"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BookCard, BookCardSkeleton } from "@/components/book-card";
import { apiJson, publicApiFetch } from "@/lib/api";
import { categories as knownCategories, type Book } from "@/lib/books";

export function Catalog({ initialCategory = "All" }: { initialCategory?: string }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    knownCategories.includes(initialCategory) ? initialCategory : "All",
  );
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    publicApiFetch("/books")
      .then(apiJson<Book[]>)
      .then((result) => {
        if (active) setBooks(result);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : "Could not load books.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const categoryOptions = useMemo(
    () => [...new Set([...knownCategories, ...books.map((book) => book.category)])],
    [books],
  );
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const results = books.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const matchesSearch =
        !normalized ||
        `${book.title} ${book.author} ${book.category} ${book.description}`
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesSearch;
    });

    if (sort === "title") results.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "newest") {
      results.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }
    if (sort === "available") {
      results.sort((a, b) => b.availableCopies - a.availableCopies);
    }
    return results;
  }, [books, category, query, sort]);

  return (
    <>
      <section className="page-intro catalog-intro">
        <p className="eyebrow"><span className="eyebrow-line" />A collection for every kind of day</p>
        <h1>Wander the <em>shelves.</em></h1>
        <p>Find an old favorite or follow a new feeling. Every story is here to be shared.</p>
        <div className="intro-meta"><span>THE BOOK NOOK LIBRARY</span><span>{loading ? "LOADING BOOKS" : `${String(books.length).padStart(2, "0")} STORIES TO DISCOVER`}</span></div>
      </section>
      <section className="catalog-section section-wrap">
        <div className="catalog-toolbar">
          <label className="search-field">
            <Search size={18} />
            <span className="sr-only">Search books</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author, or feeling…" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}
          </label>
          <label className="sort-field"><SlidersHorizontal size={15} /><span className="sr-only">Sort books</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="newest">Newest added</option>
              <option value="title">Title, A–Z</option>
              <option value="available">Most available</option>
            </select>
          </label>
        </div>
        <div className="category-pills" aria-label="Filter by category">
          {categoryOptions.map((item) => (
            <button type="button" className={category === item ? "category-pill active" : "category-pill"} key={item} onClick={() => setCategory(item)} aria-pressed={category === item}>
              {item}
            </button>
          ))}
        </div>
        <div className="catalog-result-line"><span>{loading ? "Gathering stories…" : `${filtered.length} ${filtered.length === 1 ? "story" : "stories"} on the shelf`}</span><span>CURATED WITH CARE <span aria-hidden="true">✳</span></span></div>
        {loading ? (
          <div className="catalog-grid" role="status" aria-label="Loading books">
            {Array.from({ length: 6 }, (_, index) => <BookCardSkeleton key={index} />)}
          </div>
        ) : error ? (
          <div className="empty-state"><span className="empty-state-mark">!</span><h2>We couldn&apos;t reach the shelves.</h2><p>{error}</p></div>
        ) : filtered.length ? (
          <div className="catalog-grid">{filtered.map((book) => <BookCard key={book.id} book={book} />)}</div>
        ) : (
          <div className="empty-state"><span className="empty-state-mark">⌕</span><h2>{books.length ? "No stories found." : "The shelves are waiting."}</h2><p>{books.length ? "Try another title or category. The right book is here somewhere." : "No books are in the library yet."}</p>{books.length > 0 && <button className="button button-outline" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button>}</div>
        )}
      </section>
    </>
  );
}
