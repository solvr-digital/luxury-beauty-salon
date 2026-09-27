import React, { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapSetup';
import { storyStepsData } from '../../data/elaneData';

export const ScrollStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const phaseTitleRef = useRef<HTMLHeadingElement>(null);
  const phaseSubRef = useRef<HTMLParagraphElement>(null);
  const phaseDescRef = useRef<HTMLParagraphElement>(null);
  const badgeStepRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2800',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Initial State: Portrait enters from side with slight rotation
      storyTimeline
        .fromTo(
          '.story-visual-card-0',
          { xPercent: 120, rotate: 6, scale: 0.8, opacity: 0 },
          { xPercent: 0, rotate: 0, scale: 1, opacity: 1, ease: 'power2.out', duration: 1.5 }
        )
        // Typography moves independently
        .fromTo(
          '.story-text-pane',
          { xPercent: -30, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: 'power2.out', duration: 1.2 },
          '-=1.2'
        )

        // Progress from DISCOVER -> CREATE
        .to(
          '.story-visual-card-0',
          { scale: 1.12, rotate: -2, ease: 'none', duration: 1.8 }
        )
        // Transition to visual 2 with smooth clip-path reveal
        .fromTo(
          '.story-visual-card-1',
          { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', scale: 1.15, opacity: 1 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1.0,
            duration: 2.2,
            ease: 'power2.inOut',
            onStart: () => {
              if (phaseTitleRef.current) phaseTitleRef.current.innerText = storyStepsData[1].phase;
              if (phaseSubRef.current) phaseSubRef.current.innerText = storyStepsData[1].subtitle;
              if (phaseDescRef.current) phaseDescRef.current.innerText = storyStepsData[1].description;
              if (badgeStepRef.current) badgeStepRef.current.innerText = 'PHASE 02';
            },
            onReverseComplete: () => {
              if (phaseTitleRef.current) phaseTitleRef.current.innerText = storyStepsData[0].phase;
              if (phaseSubRef.current) phaseSubRef.current.innerText = storyStepsData[0].subtitle;
              if (phaseDescRef.current) phaseDescRef.current.innerText = storyStepsData[0].description;
              if (badgeStepRef.current) badgeStepRef.current.innerText = 'PHASE 01';
            },
          },
          '-=0.6'
        )

        // Transition from CREATE -> TRANSFORM
        // Visual scales toward fullscreen and visual 3 reveals
        .fromTo(
          '.story-visual-card-2',
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2, opacity: 1 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1.0,
            duration: 2.4,
            ease: 'power2.inOut',
            onStart: () => {
              if (phaseTitleRef.current) phaseTitleRef.current.innerText = storyStepsData[2].phase;
              if (phaseSubRef.current) phaseSubRef.current.innerText = storyStepsData[2].subtitle;
              if (phaseDescRef.current) phaseDescRef.current.innerText = storyStepsData[2].description;
              if (badgeStepRef.current) badgeStepRef.current.innerText = 'PHASE 03';
            },
            onReverseComplete: () => {
              if (phaseTitleRef.current) phaseTitleRef.current.innerText = storyStepsData[1].phase;
              if (phaseSubRef.current) phaseSubRef.current.innerText = storyStepsData[1].subtitle;
              if (phaseDescRef.current) phaseDescRef.current.innerText = storyStepsData[1].description;
              if (badgeStepRef.current) badgeStepRef.current.innerText = 'PHASE 02';
            },
          }
        )
        // Image scales towards majestic fullscreen
        .to(visualWrapperRef.current, {
          scale: 1.08,
          duration: 1.5,
          ease: 'power1.out',
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full h-screen min-h-[750px] overflow-hidden bg-[#090706] text-[#FFF0F3] flex items-center border-t border-[#E23B55]/15"
    >
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#E23B55]/8 blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full h-full flex flex-col justify-center relative z-10">
        {/* Section Header */}
        <div className="mb-6 lg:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E23B55]" />
            <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-[#E23B55]">
              SCROLL-DRIVEN NARRATIVE
            </span>
          </div>
          <h2 className="font-italiana text-4xl sm:text-6xl md:text-7xl font-light text-[#FFF0F3] tracking-tight">
            THE ART OF <span className="text-rose-gradient font-light">BEAUTY</span>
          </h2>
        </div>

        {/* 2-Column Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* LEFT: Typography & Narrative Moving Independently */}
          <div className="story-text-pane lg:col-span-5 flex flex-col justify-center">
            {/* Dynamic Step Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span
                ref={badgeStepRef}
                className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#E23B55] px-3.5 py-1 border border-[#E23B55]/30 glass-elane shadow-[0_0_12px_rgba(226,59,85,0.2)]"
              >
                PHASE 01
              </span>
              <span className="text-xs font-mono text-[#E23B55]/70 tracking-widest">
                / 03
              </span>
            </div>

            {/* Dynamic Phase Title (DISCOVER -> CREATE -> TRANSFORM) */}
            <h3
              ref={phaseTitleRef}
              className="font-italiana text-5xl sm:text-7xl lg:text-8xl text-[#FFF0F3] mb-4 tracking-tight transition-all duration-500"
            >
              DISCOVER
            </h3>

            {/* Subtitle */}
            <p
              ref={phaseSubRef}
              className="text-lg sm:text-2xl font-light font-editorial italic text-rose-gradient mb-4 leading-relaxed transition-all duration-500"
            >
              {storyStepsData[0].subtitle}
            </p>

            {/* Narrative Body */}
            <p
              ref={phaseDescRef}
              className="text-xs sm:text-sm font-light text-[#FFF0F3]/80 leading-relaxed font-sans max-w-md transition-all duration-500"
            >
              {storyStepsData[0].description}
            </p>

            {/* Interactive Scroll Guide Bar */}
            <div className="mt-8 pt-6 border-t border-[#E23B55]/15 flex items-center gap-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#E23B55]/80 font-sans">
                CONTINUE SCROLLING TO UNVEIL TRANSFORMATION
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Stage with Layered Portraits & Clip-Path Reveals */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div
              ref={visualWrapperRef}
              className="relative w-full aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/11] max-h-[580px] overflow-hidden border border-[#E23B55]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] will-change-transform"
            >
              {/* Visual 0: DISCOVER (Base) */}
              <div
                className="story-visual-card-0 absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${storyStepsData[0].image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 z-10 glass-elane px-4 py-2 border border-[#E23B55]/35">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#E23B55] font-medium">
                    PORTRAIT 01 • RAW ARCHITECTURE
                  </span>
                </div>
              </div>

              {/* Visual 1: CREATE (Clip-path slide reveal) */}
              <div
                className="story-visual-card-1 absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
                style={{ backgroundImage: `url('${storyStepsData[1].image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 z-10 glass-elane px-4 py-2 border border-[#E23B55]/35">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#E23B55] font-medium">
                    PORTRAIT 02 • THE BESPOKE CRAFT
                  </span>
                </div>
              </div>

              {/* Visual 2: TRANSFORM (Vertical clip-path scale to fullscreen) */}
              <div
                className="story-visual-card-2 absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
                style={{ backgroundImage: `url('${storyStepsData[2].image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 z-10 glass-elane px-4 py-2 border border-[#E23B55]/35">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#E23B55] font-medium">
                    PORTRAIT 03 • CINEMATIC REVELATION
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
