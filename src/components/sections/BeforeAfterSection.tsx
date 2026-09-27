import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal, Sparkles } from 'lucide-react';
import { beforeAfterCasesData } from '../../data/elaneData';

export const BeforeAfterSection: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentCase = beforeAfterCasesData[activeCaseIndex];

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
    <section
      id="transformations"
      className="py-32 md:py-48 bg-[#090706] relative overflow-hidden border-t border-[#E23B55]/15"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[#E23B55]/7 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E23B55]" />
            <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-[#E23B55]">
              METAMORPHOSIS ARCHIVE
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#E23B55]" />
          </div>

          <h2 className="font-italiana text-4xl sm:text-6xl md:text-7xl font-light text-[#FFF0F3] tracking-tight">
            THE ART OF <span className="text-rose-gradient font-light">TRANSFORMATION</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base font-light text-[#FFF0F3]/75 font-editorial italic">
            “Witness the elevation of texture, tone, and facial architecture through our bespoke transformation treatments.”
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-[#130E0B] border border-[#E23B55]/30">
            {beforeAfterCasesData.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 ${
                  activeCaseIndex === idx
                    ? 'bg-gradient-to-r from-[#E23B55] via-[#FF6B8B] to-[#E23B55] text-[#090706] font-semibold shadow-[0_0_15px_rgba(226,59,85,0.4)]'
                    : 'text-[#FFF0F3]/70 hover:text-[#E23B55]'
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
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden select-none cursor-ew-resize border border-[#E23B55]/30 shadow-[0_30px_90px_rgba(0,0,0,0.9)] bg-[#130E0B]"
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
              <div className="absolute top-6 right-6 z-10 glass-elane px-4 py-1.5 border border-[#E23B55]/40 pointer-events-none">
                <span className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-[#E23B55]">
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
              <div className="absolute top-6 left-6 z-10 bg-[#090706]/90 backdrop-blur-md px-4 py-1.5 border border-[#E23B55]/25 pointer-events-none">
                <span className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-[#FFF0F3]/70">
                  BEFORE
                </span>
              </div>
            </div>

            {/* 3. Draggable Rose Red Divider Line & Grab Knob */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#E23B55] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0 bg-[#E23B55] shadow-[0_0_12px_rgba(226,59,85,0.9)]" />

              {/* Center Grab Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#090706] border-2 border-[#E23B55] shadow-[0_0_20px_rgba(226,59,85,0.6)] flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-108 transition-transform">
                <MoveHorizontal className="w-5 h-5 text-[#E23B55]" />
              </div>
            </div>
          </motion.div>

          {/* Transformation Meta Details */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 bg-[#130E0B] border border-[#E23B55]/20">
            <div>
              <div className="flex items-center gap-2 text-[#E23B55] mb-1">
                <Sparkles className="w-4 h-4 text-[#E23B55]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-medium">
                  {currentCase.artist}
                </span>
              </div>
              <h3 className="font-italiana text-2xl sm:text-3xl text-[#FFF0F3] font-light">
                {currentCase.title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-[#FFF0F3]/80 mt-1 max-w-2xl font-sans">
                {currentCase.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs uppercase tracking-widest text-[#E23B55]/80 font-sans">
              <span>DRAG SLIDER TO REVEAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
