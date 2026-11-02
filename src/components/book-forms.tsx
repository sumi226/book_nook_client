"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { categories, type Book } from "@/lib/books";

export function AccountForm({
  mode,
  redirectTo = "/",
  registered = false,
}: {
  mode: "login" | "register";
  redirectTo?: string;
  registered?: boolean;
}) {
  const isRegister = mode === "register";
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(
    registered ? "Your account is ready. Sign in to continue." : "",
  );
  const [messageType, setMessageType] = useState<"error" | "success" | "info">(
    registered ? "success" : "info",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      if (isRegister) {
        const name = String(formData.get("name") ?? "").trim();
        const image = String(formData.get("image") ?? "").trim();
        const result = await authClient.signUp.email({
          name,
          email,
          password,
          image,
        });
        if (result.error) {
          setMessageType("error");
          setMessage(result.error.message ?? "Could not create your account.");
          return;
        }

        const query = new URLSearchParams({
          registered: "1",
          callbackURL: redirectTo,
        });
        router.replace(`/login?${query.toString()}`);
        router.refresh();
        return;
      }

      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: redirectTo,
      });
      if (result.error) {
        setMessageType("error");
        setMessage(result.error.message ?? "Email or password is incorrect.");
        return;
      }
      router.replace(redirectTo);
      router.refresh();
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error ? error.message : "Authentication request failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleSignIn() {
    setBusy(true);
    setMessage("");
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
      if (result.error) {
        setMessageType("error");
        setMessage(result.error.message ?? "Google sign-in could not start.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error ? error.message : "Google sign-in failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  const accountLink = isRegister
    ? `/login?callbackURL=${encodeURIComponent(redirectTo)}`
    : `/register?callbackURL=${encodeURIComponent(redirectTo)}`;

  return (
    <form className="form-card account-form" onSubmit={handleSubmit}>
      <div className="form-intro">
        <span className="form-mark">✳</span>
        <p className="eyebrow">
          {isRegister ? "A new chapter begins" : "Welcome back, reader"}
        </p>
        <h1>
          {isRegister ? (
            <>Join the <em>nook.</em></>
          ) : (
            <>Come on <em>in.</em></>
          )}
        </h1>
        <p>
          {isRegister
            ? "A little space for your next favorite story."
            : "Your next favorite might be waiting."}
        </p>
      </div>
      {isRegister && (
        <>
          <label className="form-field">
            Your name
            <input
              name="name"
              autoComplete="name"
              placeholder="How should we call you?"
              maxLength={160}
              required
            />
          </label>
          <label className="form-field">
            Photo URL
            <input
              name="image"
              type="url"
              autoComplete="url"
              placeholder="https://example.com/your-photo.jpg"
              required
            />
          </label>
        </>
      )}
      <label className="form-field">
        Email address
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </label>
      <label className="form-field">
        Password
        <input
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          minLength={6}
          maxLength={128}
          pattern={isRegister ? "(?=.*[a-z])(?=.*[A-Z]).{6,}" : undefined}
          title={
            isRegister
              ? "Use at least 6 characters, including an uppercase and lowercase letter."
              : undefined
          }
          placeholder={
            isRegister
              ? "At least 6 characters, upper and lowercase"
              : "Your password"
          }
          required
        />
      </label>
      {isRegister ? (
        <label className="form-checkbox">
          <input type="checkbox" required />
          <span>I agree to the library&apos;s friendly house rules.</span>
        </label>
      ) : (
        <div className="forgot-row">
          <button
            className="forgot-link"
            type="button"
            onClick={() => {
              setMessageType("info");
              setMessage("Password reset is not available yet. Please contact the library.");
            }}
          >
            Forgot password?
          </button>
        </div>
      )}
      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={busy}
      >
        {busy
          ? "Please wait…"
          : isRegister
            ? "Create a reader profile"
            : "Sign in to your nook"}
      </button>
      <div className="auth-divider"><span>or</span></div>
      <button
        className="button button-outline google-sign-in"
        type="button"
        onClick={handleGoogleSignIn}
        disabled={busy}
      >
        <span className="google-mark" aria-hidden="true">G</span>
        Continue with Google
      </button>
      {message && (
        <p className={`form-message form-message-${messageType}`} role="status">
          {message}
        </p>
      )}
      <p className="form-switch">
        {isRegister ? "Already found your way here?" : "New to the nook?"}{" "}
        <Link href={accountLink}>
          {isRegister ? "Sign in" : "Make a reader profile"}
        </Link>
      </p>
      {isRegister && (
        <p className="password-hint">
          Passwords need at least 6 characters with one uppercase and one
          lowercase letter.
        </p>
      )}
    </form>
  );
}

export function BookForm({ book, mode }: { book?: Book; mode: "add" | "edit" }) {
  const [saved, setSaved] = useState(false);
  const editing = mode === "edit";
  return (
    <form className="form-card book-form" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
      <Link href={editing ? "/my-books" : "/books"} className="back-link"><ArrowLeft size={15} /> {editing ? "Back to my books" : "Back to the shelves"}</Link>
      <p className="eyebrow"><span className="eyebrow-line" />{editing ? "A little bookshelf tending" : "Add to the collection"}</p>
      <h1>{editing ? <>Edit a <em>story.</em></> : <>Add a <em>good read.</em></>}</h1>
      <p className="form-description">Share the details so another reader can find their next favorite.</p>
      <div className="form-grid">
        <label className="form-field">Book title<input name="title" defaultValue={book?.title} placeholder="The name on the cover" required /></label>
        <label className="form-field">Author<input name="author" defaultValue={book?.author} placeholder="Who wrote it?" required /></label>
        <label className="form-field">Category<select name="category" defaultValue={book?.category ?? "Fiction"}>{categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="form-field">Year published<input name="year" type="number" min="1400" max="2026" defaultValue={book?.year} placeholder="2024" required /></label>
        <label className="form-field form-field-wide">A little about this book<textarea name="description" rows={4} defaultValue={book?.description} placeholder="What might a reader love about it?" required /></label>
        <label className="form-field form-field-wide">ISBN <span className="optional-label">Optional</span><input name="isbn" defaultValue={book?.isbn} placeholder="978…" /></label>
      </div>
      <label className="form-checkbox"><input type="checkbox" name="available" defaultChecked={book?.available ?? true} /><span>Available for borrowing</span></label>
      <button className="button button-primary form-submit" type="submit">{saved ? <><Check size={16} /> Saved for this demo</> : editing ? "Save book details" : "Add book to my shelf"}</button>
      {saved && <p className="form-success" role="status">Your changes are previewed locally only; no data was saved to a server.</p>}
    </form>
  );
}
