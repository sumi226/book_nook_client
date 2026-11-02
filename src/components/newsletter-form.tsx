"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
      <input id="newsletter-email" name="email" type="email" placeholder="Your email address" required />
      <button type="submit" aria-label="Subscribe to the newsletter">
        {submitted ? <Check size={18} /> : <ArrowUpRight size={18} />}
      </button>
      <p className="newsletter-feedback" aria-live="polite">
        {submitted ? "You're on the list. Look out for a little note from us." : "By subscribing, you agree to receive the occasional note from our shelves."}
      </p>
    </form>
  );
}
