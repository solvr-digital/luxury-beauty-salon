import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { horizontalGalleryData } from '../../data/galleryData';

export const HorizontalGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);

  const x = useMotionValue(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current && containerRef.current) {
        const fullTrackWidth = trackRef.current.scrollWidth;
        const visibleWidth = containerRef.current.clientWidth;
        setScrollWidth(Math.max(0, fullTrackWidth - visibleWidth + 80));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleDrag = () => {
    const currentX = Math.abs(x.get());
    if (scrollWidth > 0) {
      setDragProgress(Math.min(Math.max(currentX / scrollWidth, 0), 1));
    }
  };

  const slideLeft = () => {
    if (trackRef.current && containerRef.current) {
      const step = 420;
      const newX = Math.min(x.get() + step, 0);
      x.set(newX);
      if (scrollWidth > 0) {
        setDragProgress(Math.abs(newX) / scrollWidth);
      }
    }
  };

  const slideRight = () => {
    if (trackRef.current && containerRef.current) {
      const step = 420;
      const newX = Math.max(x.get() - step, -scrollWidth);
      x.set(newX);
      if (scrollWidth > 0) {
        setDragProgress(Math.abs(newX) / scrollWidth);
      }
    }
  };

  return (
    <section id="lookbook" className="py-28 md:py-36 bg-brand-espresso-light/50 overflow-hidden relative border-t border-brand-gold/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-brand-gold" />
              <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-brand-gold">
                HAUTE COIFFURE LOOKBOOK
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-brand-cream-pure tracking-tight">
              THE LUMIÈRE EXPERIENCE
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-brand-gold/70 hidden sm:inline font-sans">
              DRAG OR USE ARROWS
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={slideLeft}
                aria-label="Previous Lookbook Slide"
                className="w-11 h-11 border border-brand-gold/40 flex items-center justify-center text-brand-cream-pure hover:bg-gradient-to-r hover:from-brand-gold-champagne hover:to-brand-gold hover:text-brand-espresso transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={slideRight}
                aria-label="Next Lookbook Slide"
                className="w-11 h-11 border border-brand-gold/40 flex items-center justify-center text-brand-cream-pure hover:bg-gradient-to-r hover:from-brand-gold-champagne hover:to-brand-gold hover:text-brand-espresso transition-colors duration-200"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Ribbon Track */}
      <div
        ref={containerRef}
        className="w-full pl-6 sm:pl-8 lg:pl-12 overflow-hidden cursor-grab active:cursor-grabbing"
        data-cursor="drag"
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -scrollWidth, right: 0 }}
          dragElastic={0.15}
          onDrag={handleDrag}
          className="flex gap-6 sm:gap-8 items-stretch select-none py-4"
        >
          {horizontalGalleryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative shrink-0 group flex flex-col justify-between"
            >
              {/* Varying Editorial Aspect Ratios */}
              <div
                className={`relative overflow-hidden border border-brand-gold/25 shadow-dark-card ${
                  index % 3 === 0
                    ? 'w-[280px] sm:w-[350px] aspect-[3/4]'
                    : index % 3 === 1
                    ? 'w-[340px] sm:w-[480px] aspect-[16/10]'
                    : 'w-[280px] sm:w-[360px] aspect-[4/5]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover filter contrast-[1.04] brightness-[0.9] transition-transform duration-1000 ease-out group-hover:scale-106 pointer-events-none"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

                {/* Floating Eyebrow */}
                <div className="absolute top-4 left-4 glass-dark px-3 py-1 border border-brand-gold/30">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-brand-gold font-medium">
                    {item.category}
                  </span>
                </div>

                {/* Hover Center Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full glass-dark border border-brand-gold flex items-center justify-center text-brand-gold shadow-[0_0_15px_rgba(229,195,120,0.5)]">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Editorial Caption Underneath */}
              <div className="pt-4 flex items-baseline justify-between">
                <div>
                  <h4 className="font-editorial text-2xl text-brand-cream-pure font-light">
                    {item.title}
                  </h4>
                  <p className="text-xs text-brand-cream/70 font-light mt-0.5 font-sans">
                    {item.description}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-brand-gold font-medium">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress Bar Indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-10">
        <div className="w-full h-[2px] bg-brand-gold/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-gold-champagne via-brand-gold to-brand-gold-radiant transition-all duration-150"
            style={{ width: `${Math.max(dragProgress * 100, 15)}%` }}
          />
        </div>
      </div>
    </section>
  );
};
