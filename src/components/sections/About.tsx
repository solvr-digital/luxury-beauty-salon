import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Sparkles, Award, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: '-100px' });

  const [yearsCount, setYearsCount] = useState(0);
  const [specialistsCount, setSpecialistsCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setYearsCount(Math.floor(eased * 15));
      setSpecialistsCount(Math.floor(eased * 8));
      setRatingCount(Number((eased * 4.9).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setYearsCount(15);
        setSpecialistsCount(8);
        setRatingCount(4.9);
      }
    };

    requestAnimationFrame(step);
  }, [isInView]);

  return (
    <section id="about" className="py-28 md:py-36 bg-brand-espresso-light/70 relative overflow-hidden border-t border-brand-bronze/15">
      {/* Background Soft Bronze Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-brand-bronze/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="ABOUT LUMIÈRE"
          title="Beauty, Elevated."
          subtitle="An intimate architectural sanctuary of haute coiffure, quiet bronze luxury, and bespoke artistic direction."
          dark={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large Luxury Salon Image with Mask Reveal (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div
              className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden shadow-dark-card group border border-brand-bronze/30"
              data-cursor="view"
            >
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
                alt="LUMIÈRE Luxury Salon Interior Architecture"
                className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.9] transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso via-transparent to-transparent opacity-70" />

              {/* Floating Philosophy Label */}
              <div className="absolute top-6 left-6 glass-dark px-4 py-2 border border-brand-bronze/30">
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-brand-bronze font-medium">
                  ATELIER ARCHITECTURE
                </span>
              </div>
            </div>

            {/* Overlapping Secondary Editorial Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 w-64 sm:w-80 glass-dark p-6 border border-brand-gold/40 shadow-dark-card hidden sm:block"
            >
              <div className="flex items-center gap-3 mb-2 text-brand-gold">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold font-sans">
                  The Lumière Ethos
                </span>
              </div>
              <p className="font-editorial text-xl font-light text-brand-cream-pure leading-snug">
                "We do not simply style; we reveal your inherent architectural silhouette."
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Text Explaining Salon Philosophy & Animated Statistics (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-brand-gold mb-4">
                Haute Coiffure Sanctuary
              </p>
              <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-brand-cream-pure leading-tight mb-6">
                Where Couture Technique Meets Soulful Indulgence.
              </h3>
              <p className="text-sm sm:text-base font-light text-brand-cream-silk leading-relaxed mb-6">
                Conceived as an antidote to generic salon culture, LUMIÈRE HAIR & BEAUTY represents an elevated standard of personal beauty care. Every styling suite is individually calibrated with private acoustic zones, daylight spectrum mirrors, and bespoke botanical backbars.
              </p>
              <p className="text-sm sm:text-base font-light text-brand-cream-silk leading-relaxed mb-10">
                Our resident beauty masters draw from French haircutting architecture, Japanese hair wellness philosophies, and high-fashion editorial styling to create hair and skin that exude effortless luxury.
              </p>
            </motion.div>

            {/* Atelier Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div className="flex items-start gap-3.5 p-3.5 bg-brand-espresso/90 border border-brand-gold/25 shadow-sm">
                <Award className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-cream-pure">Master Artistry</h4>
                  <p className="text-xs text-brand-cream-silk mt-1">Direct from Paris and Milan fashion week ateliers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 p-3.5 bg-brand-espresso/90 border border-brand-gold/25 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-cream-pure">Rare Botanical Elixirs</h4>
                  <p className="text-xs text-brand-cream-silk mt-1">Custom-formulated nutrient infusions & 24K gold foil.</p>
                </div>
              </div>
            </div>

            {/* Animated Statistics Section */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-brand-gold/25"
            >
              {/* Stat 1: 15+ YEARS OF ARTISTRY */}
              <div className="flex flex-col">
                <span className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-gold-gradient leading-none">
                  {yearsCount}+
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-sans font-semibold text-brand-gold mt-2">
                  YEARS OF ARTISTRY
                </span>
                <span className="text-[11px] text-brand-muted hidden sm:inline mt-0.5">
                  Haute coiffure mastery
                </span>
              </div>

              {/* Stat 2: 08 BEAUTY EXPERTS */}
              <div className="flex flex-col">
                <span className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-gold-gradient leading-none">
                  0{specialistsCount}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-sans font-semibold text-brand-gold mt-2">
                  BEAUTY EXPERTS
                </span>
                <span className="text-[11px] text-brand-muted hidden sm:inline mt-0.5">
                  International directors
                </span>
              </div>

              {/* Stat 3: 4.9 CLIENT RATING */}
              <div className="flex flex-col">
                <span className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-gold-gradient leading-none">
                  {ratingCount.toFixed(1)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-sans font-semibold text-brand-gold mt-2">
                  CLIENT RATING
                </span>
                <span className="text-[11px] text-brand-muted hidden sm:inline mt-0.5">
                  12,000+ rituals performed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
