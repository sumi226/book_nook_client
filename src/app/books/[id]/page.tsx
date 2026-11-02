import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bookmark, Star } from "lucide-react";
import { BookCover } from "@/components/book-card";
import { BorrowActions } from "@/components/borrow-actions";
import { books } from "@/lib/books";
import { requireUser } from "@/lib/dal";

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireUser(`/books/${encodeURIComponent(id)}`);
  const book = books.find((item) => item.id === id);
  if (!book) notFound();

  const related = books.filter((item) => item.category === book.category && item.id !== book.id).slice(0, 3);

  return (
    <main id="main-content">
      <div className="detail-topline section-wrap"><Link className="back-link" href="/books"><ArrowLeft size={15} /> Back to all books</Link><span>THE BOOK NOOK LIBRARY / {book.category.toUpperCase()}</span></div>
      <section className="book-detail section-wrap">
        <div className="detail-art"><BookCover book={book} large /><span className={`availability ${book.available ? "is-available" : ""}`}><span />{book.available ? "On the shelf" : "Currently borrowed"}</span><div className="detail-art-caption"><span>A STORY TO PASS ALONG</span><span>NO. {String(books.indexOf(book) + 1).padStart(2, "0")}</span></div></div>
        <div className="detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{book.category} · First published {book.year}</p>
          <h1>{book.title}</h1>
          <p className="detail-byline">by <em>{book.author}</em></p>
          <div className="detail-rating"><span><Star size={15} fill="currentColor" /> {book.rating}</span><span>Reader-loved</span><span className="rating-dot">·</span><span>Library pick</span></div>
          <div className="detail-rule" />
          <p className="detail-description">{book.description}</p>
          <div className="detail-meta"><div><span>THE FEELING</span><strong>{book.category}</strong></div><div><span>FIRST PUBLISHED</span><strong>{book.year}</strong></div><div><span>ISBN</span><strong>{book.isbn}</strong></div></div>
          <BorrowActions book={book} />
          <Link className="text-link detail-list-link" href="/my-books"><Bookmark size={15} /> See what&apos;s on my shelf <ArrowUpRight size={14} /></Link>
        </div>
      </section>
      {related.length > 0 && <section className="related-section section-wrap"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" />Keep wandering</p><h2>More from <em>{book.category.toLowerCase()}.</em></h2></div><Link className="text-link" href="/books">All books <ArrowUpRight size={15} /></Link></div><div className="related-grid">{related.map((item) => <Link className="related-book" href={`/books/${item.id}`} key={item.id}><BookCover book={item} /><span><strong>{item.title}</strong><small>{item.author}</small></span><ArrowUpRight size={15} /></Link>)}</div></section>}
    </main>
  );
}
