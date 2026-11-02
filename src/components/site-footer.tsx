import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-intro">
          <Link className="brand footer-brand" href="/">
            <span className="brand-icon"><BookOpen size={21} strokeWidth={1.5} /></span>
            <span className="brand-word">book<span>nook</span></span><span className="brand-period">.</span>
          </Link>
          <p>Good stories never really belong to just one person.</p>
        </div>
        <div className="footer-links">
          <div><p className="footer-label">Wander</p><Link href="/">Home</Link><Link href="/books">Browse books</Link><Link href="/my-borrows">My borrows</Link></div>
          <div><p className="footer-label">Your nook</p><Link href="/login">Sign in</Link><Link href="/register">Join the library</Link><Link href="/my-books">My bookshelf</Link></div>
        </div>
        <Link className="footer-note" href="/books">
          <span className="footer-note-mark">✳</span>
          <span>Make a little room<br /><em>for wonder.</em></span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Book Nook Library</span>
        <span>Made for people who love a good story.</span>
        <Link href="/">Back to the beginning ↑</Link>
      </div>
    </footer>
  );
}
