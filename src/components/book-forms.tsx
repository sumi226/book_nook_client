"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiJson, authenticatedApiFetch, uploadBookImage } from "@/lib/api";
import { useToast } from "@/components/toast-provider";
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
  const editing = mode === "edit";
  const [busy, setBusy] = useState(false);
  const [imageName, setImageName] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const values = new FormData(event.currentTarget);

    try {
      const file = values.get("image");
      if (!(file instanceof File)) {
        throw new Error("Choose a book cover image to upload.");
      }
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("Book cover images must be 10 MB or smaller.");
      }
      if (file.size > 0 && !file.type.startsWith("image/")) {
        throw new Error("Choose a valid image file for the book cover.");
      }

      const image = file.size > 0 ? await uploadBookImage(file) : book?.image;
      if (!image) {
        throw new Error("Choose a book cover image to upload.");
      }

      const payload = {
        title: String(values.get("title") ?? "").trim(),
        author: String(values.get("author") ?? "").trim(),
        category: String(values.get("category") ?? ""),
        description: String(values.get("description") ?? "").trim(),
        totalCopies: Number(values.get("totalCopies")),
        image,
      };
      const response = await authenticatedApiFetch(
        editing && book ? `/books/${encodeURIComponent(book.id)}` : "/books",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const savedBook = await apiJson<Book>(response);
      showToast(editing ? "Book details updated." : "Book added to the library.");
      router.push(editing ? "/my-books" : `/books/${savedBook.id}`);
      router.refresh();
    } catch (reason) {
      showToast(
        reason instanceof Error ? reason.message : "Could not save this book.",
        "error",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form-card book-form" onSubmit={handleSubmit}>
      <Link href={editing ? "/my-books" : "/books"} className="back-link"><ArrowLeft size={15} /> {editing ? "Back to my books" : "Back to the shelves"}</Link>
      <p className="eyebrow"><span className="eyebrow-line" />{editing ? "A little bookshelf tending" : "Add to the collection"}</p>
      <h1>{editing ? <>Edit a <em>story.</em></> : <>Add a <em>good read.</em></>}</h1>
      <p className="form-description">Share the details so another reader can find their next favorite.</p>
      <div className="form-grid">
        <label className="form-field">Book title<input name="title" defaultValue={book?.title} placeholder="The name on the cover" maxLength={200} required /></label>
        <label className="form-field">Author<input name="author" defaultValue={book?.author} placeholder="Who wrote it?" maxLength={160} required /></label>
        <label className="form-field">Category<select name="category" defaultValue={book?.category ?? "Fiction"}>{categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="form-field">Total copies<input name="totalCopies" type="number" min="1" step="1" defaultValue={book?.totalCopies ?? 1} required /></label>
        <label className="form-field form-field-wide">A little about this book<textarea name="description" rows={4} defaultValue={book?.description} placeholder="What might a reader love about it?" maxLength={5000} required /></label>
        <label className="form-field form-field-wide">
          Book cover image {editing && <span className="optional-label">Optional; keep the current cover or upload a replacement</span>}
          <input
            name="image"
            type="file"
            accept="image/*"
            required={!editing}
            onChange={(event) => setImageName(event.target.files?.[0]?.name ?? "")}
          />
          {imageName && <span className="selected-file">{imageName}</span>}
        </label>
      </div>
      {editing && book && <p className="form-help">Currently available: {book.availableCopies} of {book.totalCopies}. Copy changes are adjusted against active borrows.</p>}
      <button className="button button-primary form-submit" type="submit" disabled={busy}>
        {busy ? "Saving…" : editing ? "Save book details" : "Add book to my shelf"}
      </button>
    </form>
  );
}
