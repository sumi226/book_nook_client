"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { Book } from "@/lib/books";

export function BorrowActions({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const [borrowed, setBorrowed] = useState(false);

  return (
    <>
      <button className="button button-primary borrow-button" disabled={!book.available || borrowed} onClick={() => setOpen(true)}>
        {borrowed ? "Added to your borrowed shelf" : book.available ? "Borrow this book" : "Currently borrowed"}
      </button>
      <p className="mock-note">A friendly demo only — borrowing isn&apos;t saved to an account.</p>
      <AnimatePresence>
        {open && (
          <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
            <motion.div className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="borrow-modal-title" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }}>
              <button type="button" className="modal-close" aria-label="Close dialog" onClick={() => setOpen(false)}><X size={18} /></button>
              <span className="modal-mark"><Check size={20} /></span>
              <p className="eyebrow">A good story is waiting</p>
              <h2 id="borrow-modal-title">Take <em>{book.title}</em> along?</h2>
              <p>This demo will add the book to your borrowed shelf for a little while. No account or real transaction is involved.</p>
              <div className="modal-actions">
                <button className="button button-primary" onClick={() => { setBorrowed(true); setOpen(false); }}>Yes, let&apos;s read</button>
                <button className="button button-outline" onClick={() => setOpen(false)}>Maybe later</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export function DeleteAction({ title, onDelete }: { title: string; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="text-button text-button-danger" onClick={() => setOpen(true)}>Remove</button>
      <AnimatePresence>
        {open && <div className="modal-backdrop" role="presentation">
          <motion.div className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <button type="button" className="modal-close" aria-label="Close dialog" onClick={() => setOpen(false)}><X size={18} /></button>
            <span className="modal-mark modal-mark-soft">!</span>
            <p className="eyebrow">Just checking</p><h2 id="delete-modal-title">Remove this <em>story?</em></h2>
            <p><strong>{title}</strong> will be removed from this mock bookshelf. This action is only a local demo.</p>
            <div className="modal-actions"><button className="button button-danger" onClick={() => { onDelete(); setOpen(false); }}>Yes, remove it</button><button className="button button-outline" onClick={() => setOpen(false)}>Keep book</button></div>
          </motion.div>
        </div>}
      </AnimatePresence>
    </>
  );
}
