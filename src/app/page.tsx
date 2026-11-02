import Link from "next/link";
import { ArrowUpRight, BookMarked, BookOpen, Heart, Leaf, Sparkles } from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";
import { NewsletterForm } from "@/components/newsletter-form";
import { LatestBooks } from "@/components/latest-books";

export const metadata = { title: "Home" };

const categories = [
  { name: "Fiction", note: "Worlds to get lost in", mark: "01", icon: BookOpen },
  { name: "Classics", note: "Stories that stay with us", mark: "02", icon: BookMarked },
  { name: "Mystery", note: "One more page, promise", mark: "03", icon: Sparkles },
  { name: "Poetry", note: "A few words, a whole feeling", mark: "04", icon: Heart },
  { name: "Non-fiction", note: "A little more perspective", mark: "05", icon: Leaf },
];

const reviews = [
  { quote: "I came for a book and left with a new ritual. It feels like the nicest little corner of the internet.", name: "Mira L.", note: "Reader since spring" },
  { quote: "The best recommendations are the ones that feel like they came from a friend. This place gets it.", name: "Sam R.", note: "Found a favorite here" },
  { quote: "I love that books get to keep moving. My shelf feels lighter, and my reading life feels fuller.", name: "Jo W.", note: "A thoughtful borrower" },
];

export default function Home() {
  return (
    <main id="main-content">
      <HeroCarousel />

      <section className="latest-section section-wrap" aria-labelledby="latest-title">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" />Fresh from the shelves</p><h2 id="latest-title">A few good stories <em>to begin with.</em></h2></div>
          <div className="section-heading-aside"><p>For the days you want to wander somewhere new—or find your way back to a familiar favorite.</p><Link className="text-link" href="/books">Browse all books <ArrowUpRight size={15} /></Link></div>
        </div>
        <LatestBooks />
        <p className="collection-note">BOOKS ARE SHARED HERE, NOT SOLD. PICK A STORY AND PASS IT ALONG.</p>
      </section>

      <section className="category-section" aria-labelledby="category-title">
        <div className="section-wrap">
          <div className="section-heading category-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" />Follow a feeling</p><h2 id="category-title">What are you <em>in the mood for?</em></h2></div>
            <p className="section-heading-aside">The right book meets you where you are. Start with a genre, then let the shelves surprise you.</p>
          </div>
          <div className="category-list">
            {categories.map(({ name, note, mark, icon: Icon }) => (
              <Link className="category-row" href={`/books?category=${encodeURIComponent(name)}`} key={name}>
                <span className="category-mark">{mark}</span><Icon className="category-icon" size={20} strokeWidth={1.4} /><span className="category-name">{name}</span><span className="category-note">{note}</span><ArrowUpRight className="category-arrow" size={18} />
              </Link>
            ))}
          </div>
          <Link className="category-all" href="/books">Find a different kind of story <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section className="how-section" id="how-it-works" aria-labelledby="how-title">
        <div className="how-inner section-wrap">
          <div className="how-heading">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />Good things are meant to be shared</p>
            <h2 id="how-title">Read it.<br /><em>Love it.</em><br />Pass it on.</h2>
            <p>No rush, no stacks of unread books. Just a little time with a story, and the joy of sending it on its way.</p>
            <Link className="button button-light" href="/books">Find your first read <ArrowUpRight size={16} /></Link>
          </div>
          <ol className="steps-list">
            <li className="step-item"><span className="step-number">01</span><div><h3>Follow a feeling</h3><p>Browse thoughtful picks, follow a genre, or let a cover catch your eye.</p></div><span className="step-mark">↗</span></li>
            <li className="step-item"><span className="step-number">02</span><div><h3>Take a book along</h3><p>Borrow a story for a few days and make a little space for it in your day.</p></div><span className="step-mark">✳</span></li>
            <li className="step-item"><span className="step-number">03</span><div><h3>Return it, pass it on</h3><p>Bring it back when you&apos;re finished, ready for its next reader and next adventure.</p></div><span className="step-mark">↗</span></li>
          </ol>
        </div>
        <div aria-hidden="true" className="how-decoration">READ <span>·</span> RETURN <span>·</span> REPEAT</div>
      </section>

      <section className="reviews-section section-wrap" aria-labelledby="reviews-title">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" />Notes from the reading chair</p><h2 id="reviews-title">A little love <em>for the library.</em></h2></div>
          <p className="section-heading-aside">The best part of a shared shelf is the people you meet along the way.</p>
        </div>
        <div className="reviews-grid">{reviews.map((review, index) => (
          <figure className="review-card" key={review.name}><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote>“{review.quote}”</blockquote><figcaption><span className="review-avatar">{review.name.slice(0, 1)}</span><span><strong>{review.name}</strong><small>{review.note}</small></span><span className="review-index">0{index + 1}</span></figcaption></figure>
        ))}</div>
      </section>

      <section className="newsletter-section" aria-labelledby="newsletter-title">
        <div className="newsletter-inner section-wrap">
          <div><p className="eyebrow eyebrow-light"><span className="eyebrow-line" />A note from the nook</p><h2 id="newsletter-title">A good story,<br /><em>now and then.</em></h2><p>New finds, little reading rituals, and the occasional note from our shelves. Never a noisy inbox.</p></div>
          <NewsletterForm />
          <span className="newsletter-decoration" aria-hidden="true">✳</span>
        </div>
      </section>
    </main>
  );
}
