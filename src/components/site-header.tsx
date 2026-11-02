"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, BookOpen, Menu, X } from "lucide-react";

const links = [
  { href: "/books", label: "The shelves" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/my-borrows", label: "My borrowed books" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span>Good books are better when they travel.</span>
        <span className="announcement-spark" aria-hidden="true">✳</span>
        <span>A little library for curious minds</span>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Book Nook home">
            <span className="brand-icon"><BookOpen size={22} strokeWidth={1.5} /></span>
            <span className="brand-word">book<span>nook</span></span>
            <span className="brand-period">.</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <div className="header-actions">
            <Link className="sign-in-link" href="/login">Sign in</Link>
            <Link className="header-cta" href="/books">Find a book <ArrowUpRight size={15} /></Link>
          </div>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
            ))}
            <Link href="/login" onClick={() => setMenuOpen(false)}>Sign in</Link>
          </nav>
        )}
      </header>
    </>
  );
}
