"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/toast-provider";
import { apiJson, authenticatedApiFetch } from "@/lib/api";
import type { Book, Borrow } from "@/lib/books";

function getDefaultReturnDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date.toISOString().slice(0, 10);
}

export function BorrowActions({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [returnDate, setReturnDate] = useState(getDefaultReturnDate);
  const [availableCopies, setAvailableCopies] = useState(book.availableCopies);
  const { showToast } = useToast();
  const router = useRouter();

  async function submitBorrow() {
    setBusy(true);
    try {
      const response = await authenticatedApiFetch("/borrows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: book.id,
          returnDate: new Date(`${returnDate}T23:59:59`).toISOString(),
        }),
      });
      await apiJson<Borrow>(response);
      setAvailableCopies((copies) => Math.max(0, copies - 1));
      setOpen(false);
      showToast(`${book.title} is now on your borrowed shelf.`);
      router.refresh();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Could not borrow this book.",
        "error",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        className="button button-primary borrow-button"
        disabled={availableCopies === 0}
        onClick={() => setOpen(true)}
      >
        {availableCopies > 0 ? "Borrow this book" : "Not Available"}
      </button>
      <AnimatePresence>
        {open && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !busy) setOpen(false);
            }}
          >
            <motion.div
              className="confirmation-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="borrow-modal-title"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
            >
              <button
                type="button"
                className="modal-close"
                aria-label="Close dialog"
                disabled={busy}
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
              <span className="modal-mark"><Check size={20} /></span>
              <p className="eyebrow">A good story is waiting</p>
              <h2 id="borrow-modal-title">Take <em>{book.title}</em> along?</h2>
              <p>Confirm the date you expect to return this book.</p>
              <label className="form-field modal-date-field">
                Return by
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={returnDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                  required
                />
              </label>
              <div className="modal-actions">
                <button
                  className="button button-primary"
                  disabled={busy || !returnDate}
                  onClick={submitBorrow}
                >
                  {busy ? "Borrowing…" : "Yes, let’s read"}
                </button>
                <button
                  className="button button-outline"
                  disabled={busy}
                  onClick={() => setOpen(false)}
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export function DeleteAction({
  title,
  onDelete,
}: {
  title: string;
  onDelete: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const { showToast } = useToast();

  async function confirmDelete() {
    setBusy(true);
    try {
      await onDelete();
      setOpen(false);
      showToast(`${title} was removed from your shelf.`);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Could not remove this book.",
        "error",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className="text-button text-button-danger" onClick={() => setOpen(true)}>
        Remove
      </button>
      <AnimatePresence>
        {open && (
          <div className="modal-backdrop" role="presentation">
            <motion.div
              className="confirmation-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                className="modal-close"
                aria-label="Close dialog"
                disabled={busy}
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
              <span className="modal-mark modal-mark-soft">!</span>
              <p className="eyebrow">Just checking</p>
              <h2 id="delete-modal-title">Remove this <em>story?</em></h2>
              <p><strong>{title}</strong> will be removed from the shared library.</p>
              <div className="modal-actions">
                <button className="button button-danger" disabled={busy} onClick={confirmDelete}>
                  {busy ? "Removing…" : "Yes, remove it"}
                </button>
                <button className="button button-outline" disabled={busy} onClick={() => setOpen(false)}>
                  Keep book
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
