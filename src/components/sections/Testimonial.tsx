import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../../data/galleryData';

export const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-32 md:py-44 bg-brand-espresso relative overflow-hidden border-t border-brand-gold/15">
      {/* Background oversized quote watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-gold/5 pointer-events-none select-none font-serif text-[30rem] leading-none">
        “
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center flex flex-col items-center">
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-brand-gold" />
          <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-brand-gold">
            CLIENT TESTIMONIAL
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-brand-gold" />
        </div>

        {/* 5 Warm Gold Stars */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
          ))}
        </div>

        {/* Animated Quotation with Slow Text Reveal */}
        <div className="min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -25, filter: 'blur(6px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <blockquote className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-brand-cream-pure leading-[1.25] tracking-tight max-w-4xl italic">
                "{current.quote}"
              </blockquote>

              {/* Author & Credential */}
              <div className="mt-12 flex flex-col items-center">
                <span className="font-editorial text-2xl text-brand-gold-champagne font-normal">
                  — {current.author}
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-sans mt-1.5">
                  {current.role}
                </span>
                <span className="text-[11px] text-brand-cream/60 mt-1 font-sans">
                  {current.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Navigation Dots & Controls */}
        <div className="flex items-center gap-6 mt-14">
          <button
            onClick={prevReview}
            aria-label="Previous Testimonial"
            className="w-10 h-10 border border-brand-gold/40 flex items-center justify-center text-brand-cream-pure hover:bg-gradient-to-r hover:from-brand-gold-champagne hover:to-brand-gold hover:text-brand-espresso transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 transition-all duration-300 ${
                  currentIndex === i ? 'w-8 bg-brand-gold shadow-[0_0_8px_rgba(229,195,120,0.8)]' : 'w-2 bg-brand-gold/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            aria-label="Next Testimonial"
            className="w-10 h-10 border border-brand-gold/40 flex items-center justify-center text-brand-cream-pure hover:bg-gradient-to-r hover:from-brand-gold-champagne hover:to-brand-gold hover:text-brand-espresso transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
