"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BookCard } from "@/components/book-card";
import { books, categories } from "@/lib/books";

export function Catalog({ initialCategory = "All" }: { initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All",
  );
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const results = books.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const matchesSearch = !normalized || `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesSearch;
    });

    if (sort === "title") results.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "year") results.sort((a, b) => b.year - a.year);
    if (sort === "available") results.sort((a, b) => Number(b.available) - Number(a.available));
    return results;
  }, [category, query, sort]);

  return (
    <>
      <section className="page-intro catalog-intro">
        <p className="eyebrow"><span className="eyebrow-line" />A collection for every kind of day</p>
        <h1>Wander the <em>shelves.</em></h1>
        <p>Find an old favorite or follow a new feeling. Every story is here to be shared.</p>
        <div className="intro-meta"><span>THE BOOK NOOK LIBRARY</span><span>{String(books.length).padStart(2, "0")} STORIES TO DISCOVER</span></div>
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
              <option value="featured">Curator&apos;s picks</option>
              <option value="title">Title, A–Z</option>
              <option value="year">Recently published</option>
              <option value="available">Available first</option>
            </select>
          </label>
        </div>
        <div className="category-pills" aria-label="Filter by category">
          {categories.map((item) => (
            <button type="button" className={category === item ? "category-pill active" : "category-pill"} key={item} onClick={() => setCategory(item)} aria-pressed={category === item}>
              {item}
            </button>
          ))}
        </div>
        <div className="catalog-result-line"><span>{loading ? "Gathering stories…" : `${filtered.length} ${filtered.length === 1 ? "story" : "stories"} on the shelf`}</span><span>CURATED WITH CARE <span aria-hidden="true">✳</span></span></div>
        {loading ? (
          <div className="catalog-loading" role="status"><span className="loading-mark">✳</span><p>Gathering a few good stories…</p></div>
        ) : filtered.length ? (
          <div className="catalog-grid">{filtered.map((book) => <BookCard key={book.id} book={book} />)}</div>
        ) : (
          <div className="empty-state"><span className="empty-state-mark">⌕</span><h2>No stories found.</h2><p>Try another title or category. The right book is here somewhere.</p><button className="button button-outline" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>
        )}
      </section>
    </>
  );
}
