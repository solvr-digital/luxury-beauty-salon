import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { beforeAfterData } from '../../data/galleryData';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentCase = beforeAfterData[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="transformations" className="py-28 md:py-36 bg-brand-espresso relative overflow-hidden border-t border-brand-bronze/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="METAMORPHOSIS ATELIER"
          title="THE ART OF TRANSFORMATION"
          subtitle="Witness the harmonious elevation of texture, tone, and facial architecture through our bespoke transformation treatments."
          dark={true}
        />

        {/* Case Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-brand-espresso-light/80 border border-brand-gold/30">
            {beforeAfterData.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 ${
                  activeCaseIndex === idx
                    ? 'bg-gradient-to-r from-brand-gold-champagne via-brand-gold to-brand-gold-radiant text-brand-espresso font-semibold shadow-[0_0_15px_rgba(229,195,120,0.35)]'
                    : 'text-brand-cream/80 hover:text-brand-gold'
                }`}
              >
                Case 0{idx + 1}: {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Comparison Stage */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            key={currentCase.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden select-none cursor-ew-resize border border-brand-gold/30 shadow-dark-card"
          >
            {/* 1. AFTER Image (Base Background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentCase.afterImage}
                alt={`${currentCase.title} - After`}
                className="w-full h-full object-cover object-center filter contrast-[1.05]"
                draggable={false}
              />
              {/* AFTER Floating Badge */}
              <div className="absolute top-6 right-6 z-10 glass-dark px-4 py-1.5 border border-brand-gold/40 pointer-events-none">
                <span className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-brand-gold">
                  AFTER
                </span>
              </div>
            </div>

            {/* 2. BEFORE Image (Clipped Overlay) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={currentCase.beforeImage}
                alt={`${currentCase.title} - Before`}
                className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[0.96] grayscale-[20%]"
                draggable={false}
              />
              {/* BEFORE Floating Badge */}
              <div className="absolute top-6 left-6 z-10 bg-brand-espresso/90 backdrop-blur-md px-4 py-1.5 border border-brand-gold/20 pointer-events-none">
                <span className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-brand-cream/70">
                  BEFORE
                </span>
              </div>
            </div>

            {/* 3. Draggable Gold Divider Line & Grab Knob */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-brand-gold z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0 bg-brand-gold shadow-[0_0_12px_rgba(229,195,120,0.9)]" />

              {/* Center Grab Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-brand-espresso border-2 border-brand-gold shadow-[0_0_15px_rgba(229,195,120,0.4)] flex items-center justify-center pointer-events-auto cursor-ew-resize">
                <MoveHorizontal className="w-5 h-5 text-brand-gold" />
              </div>
            </div>
          </motion.div>

          {/* Transformation Meta Details */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-brand-espresso-card/90 border border-brand-gold/20">
            <div>
              <div className="flex items-center gap-2 text-brand-gold mb-1">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-medium">
                  {currentCase.artist}
                </span>
              </div>
              <h3 className="font-editorial text-2xl text-brand-cream-pure font-light">
                {currentCase.title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-brand-cream/80 mt-1 max-w-2xl font-sans">
                {currentCase.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold/70 font-sans">
              <span>DRAG SLIDER TO REVEAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
