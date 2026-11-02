"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    issue: "A library for the curious · Vol. 01",
    title: <>Find a story.<br /><em>Find a little</em><br />more wonder.</>,
    text: "Good books have a way of finding us right when we need them. Find your next favorite, borrow it for a while, and pass the feeling along.",
    palette: "hero-art-sage",
    quote: "A room without books is like a body without a soul.",
    author: "Cicero",
  },
  {
    issue: "A library for the curious · Vol. 02",
    title: <>Leave the door<br /><em>open to</em><br />another world.</>,
    text: "A little time with a good story can take you anywhere. Follow a feeling and see where the pages lead.",
    palette: "hero-art-rose",
    quote: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway",
  },
  {
    issue: "A library for the curious · Vol. 03",
    title: <>Your next chapter<br /><em>is waiting</em><br />on the shelf.</>,
    text: "From old favorites to unexpected discoveries, there is always a story here with your name on it.",
    palette: "hero-art-ochre",
    quote: "Books are a uniquely portable magic.",
    author: "Stephen King",
  },
];

export function HeroCarousel() {
  return (
    <section className="hero-section" aria-label="Book Nook introduction">
      <div className="hero-shell">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
          pagination={{ clickable: true, el: ".hero-pagination" }}
          className="hero-swiper"
          aria-label="Featured stories"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.issue}>
              <div className="hero-slide">
                <motion.div
                  className="hero-copy"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 }}
                >
                  <p className="eyebrow"><span className="eyebrow-line" />{slide.issue}</p>
                  <h1>{slide.title}</h1>
                  <p className="hero-description">{slide.text}</p>
                  <div className="hero-actions">
                    <Link className="button button-primary" href="/books">Explore the shelves <ArrowUpRight size={16} /></Link>
                    <Link className="text-link" href="#how-it-works">How borrowing works <ArrowDownRight size={15} /></Link>
                  </div>
                  <div className="hero-footnote"><span>✳</span> A slower, lovelier way to find your next read</div>
                </motion.div>
                <div className={`hero-art ${slide.palette}`}>
                  <div className="hero-art-grain" />
                  <span className="art-edition">BOOK NOOK <i>✳</i> EST. 2024</span>
                  <div className="art-sun" />
                  <div className="art-arch art-arch-back" />
                  <div className="art-arch art-arch-front">
                    <div className="art-book">
                      <BookOpen size={82} strokeWidth={0.75} />
                      <span>A STORY<br />TO CALL<br />YOUR OWN</span>
                    </div>
                  </div>
                  <div className="art-quote"><span>“{slide.quote}”</span><small>— {slide.author}</small></div>
                  <span className="art-index">0{index + 1} / 03</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hero-controls">
          <button className="hero-control hero-prev" aria-label="Previous slide"><ChevronLeft size={17} /></button>
          <div className="hero-pagination" />
          <button className="hero-control hero-next" aria-label="Next slide"><ChevronRight size={17} /></button>
          <span className="hero-slide-label">A little more room for wonder</span>
        </div>
      </div>
    </section>
  );
}
