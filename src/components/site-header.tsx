"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

const links = [
  { href: "/books", label: "The shelves" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/my-borrows", label: "My borrowed books" },
];

type HeaderUser = {
  name: string;
  image?: string | null;
};

function UserPhoto({ user }: { user: HeaderUser }) {
  if (user.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="header-avatar" src={user.image} alt="" />
    );
  }
  return (
    <span className="header-avatar header-avatar-initial" aria-hidden="true">
      {user.name.slice(0, 1).toUpperCase()}
    </span>
  );
}

export function SiteHeader({ initialUser }: { initialUser: HeaderUser | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = isPending ? initialUser : session?.user ?? null;

  async function handleLogout() {
    setAuthMessage("");
    try {
      const result = await authClient.signOut();
      if (result.error) {
        throw new Error(result.error.message ?? "Could not sign out.");
      }
      setProfileOpen(false);
      setMenuOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error) {
      setAuthMessage(
        error instanceof Error ? error.message : "Could not sign out.",
      );
    }
  }

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
            {user ? (
              <div className="profile-menu">
                <button
                  type="button"
                  className="profile-trigger"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                  onClick={() => setProfileOpen((open) => !open)}
                >
                  <UserPhoto user={user} />
                  <span>{user.name}</span>
                  <ChevronDown size={14} />
                </button>
                {profileOpen && (
                  <div className="profile-dropdown" role="menu">
                    <span className="profile-dropdown-name">{user.name}</span>
                    {authMessage && <p className="header-auth-message" role="status">{authMessage}</p>}
                    <Link
                      href="/my-profile"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      <UserRound size={15} /> My Profile
                    </Link>
                    <button type="button" role="menuitem" onClick={handleLogout}>
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : !isPending ? (
              <>
                <Link className="sign-in-link" href="/login">Login</Link>
                <Link className="header-cta" href="/register">Register</Link>
              </>
            ) : null}
            <Link className="header-cta" href="/books">
              Find a book <ArrowUpRight size={15} />
            </Link>
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
            {user ? (
              <div className="mobile-profile">
                <div className="mobile-profile-user">
                  <UserPhoto user={user} />
                  <span>{user.name}</span>
                </div>
                <Link href="/my-profile" onClick={() => setMenuOpen(false)}>My Profile</Link>
                <button type="button" onClick={handleLogout}>Logout</button>
              </div>
            ) : !isPending ? (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            ) : null}
            {authMessage && <p className="header-auth-message" role="status">{authMessage}</p>}
          </nav>
        )}
      </header>
    </>
  );
}
