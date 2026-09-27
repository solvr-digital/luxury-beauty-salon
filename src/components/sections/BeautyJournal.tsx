import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { gsap } from '../../utils/gsapSetup';
import { journalArticlesData } from '../../data/elaneData';

export const BeautyJournal: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journal-spread',
        { opacity: 0, y: 60 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [a1, a2, a3, a4] = journalArticlesData;

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="py-32 md:py-48 bg-[#090706] relative overflow-hidden border-t border-[#E23B55]/15"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#E23B55]/6 blur-[190px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E23B55]" />
              <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-[#E23B55] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#E23B55]" />
                ÉLANE EDITORIAL GAZETTE
              </span>
            </div>
            <h2 className="font-italiana text-4xl sm:text-6xl md:text-7xl font-light text-[#FFF0F3] tracking-tight">
              BEAUTY <span className="text-rose-gradient font-light">JOURNAL</span>
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E23B55] font-sans block font-medium">
              PARIS • NEW YORK • MUMBAI
            </span>
            <span className="text-xs text-[#FFF0F3]/60 font-light font-sans">
              Curated perspectives on modern aesthetics, hair couture & form
            </span>
          </div>
        </div>

        {/* Asymmetrical Editorial Magazine Spreads */}
        <div className="space-y-16 lg:space-y-24">
          {/* SPREAD 1: Featured Double-Page Spread */}
          <div className="journal-spread grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group cursor-pointer border border-[#E23B55]/20 p-6 sm:p-10 lg:p-12 bg-[#130E0B] hover:border-[#E23B55]/60 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(226,59,85,0.25)]">
            {/* Visual (7 cols) */}
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#090706]">
              <img
                src={a1.image}
                alt={a1.title}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.94] transition-transform duration-1000 ease-out group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 glass-elane px-3.5 py-1.5 border border-[#E23B55]/30">
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#E23B55]">
                  {a1.issue}
                </span>
              </div>
            </div>

            {/* Editorial Content (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#E23B55] block mb-3 font-medium">
                  {a1.category} • {a1.readTime}
                </span>
                <h3 className="font-italiana text-3xl sm:text-4xl lg:text-5xl font-light text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors duration-300 leading-tight mb-4">
                  {a1.title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#FFF0F3]/80 leading-relaxed font-sans mb-6">
                  {a1.subtitle}
                </p>
                <p className="text-xs text-[#FFF0F3]/60 font-light font-editorial italic leading-relaxed border-l-2 border-[#E23B55]/40 pl-4 mb-8">
                  "{a1.excerpt}"
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-medium text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors">
                <span className="font-sans">READ ESSAY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#E23B55]" />
              </div>
            </div>
          </div>

          {/* SPREAD 2: Asymmetric 2-Column Duo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Article 2: Tall Vertical (5 cols) */}
            <div className="journal-spread lg:col-span-5 group cursor-pointer border border-[#E23B55]/20 p-6 sm:p-8 bg-[#130E0B] hover:border-[#E23B55]/60 transition-all duration-700 flex flex-col justify-between hover:shadow-[0_20px_60px_-15px_rgba(226,59,85,0.25)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#090706] mb-6">
                <img
                  src={a2.image}
                  alt={a2.title}
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.94] transition-transform duration-1000 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 glass-elane px-3.5 py-1.5 border border-[#E23B55]/30">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#E23B55]">
                    {a2.issue}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#E23B55] block mb-2 font-medium">
                  {a2.category} • {a2.readTime}
                </span>
                <h3 className="font-italiana text-2xl sm:text-3xl font-light text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors duration-300 mb-3">
                  {a2.title}
                </h3>
                <p className="text-xs font-light text-[#FFF0F3]/75 leading-relaxed font-sans mb-6">
                  {a2.subtitle}
                </p>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors">
                  <span className="font-sans text-[11px]">DISCOVER ESSAY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E23B55]" />
                </div>
              </div>
            </div>

            {/* Article 3: Wide Architectural (7 cols) */}
            <div className="journal-spread lg:col-span-7 group cursor-pointer border border-[#E23B55]/20 p-6 sm:p-8 bg-[#130E0B] hover:border-[#E23B55]/60 transition-all duration-700 flex flex-col justify-between hover:shadow-[0_20px_60px_-15px_rgba(226,59,85,0.25)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#090706] mb-6">
                <img
                  src={a3.image}
                  alt={a3.title}
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.94] transition-transform duration-1000 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 glass-elane px-3.5 py-1.5 border border-[#E23B55]/30">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#E23B55]">
                    {a3.issue}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#E23B55] block mb-2 font-medium">
                  {a3.category} • {a3.readTime}
                </span>
                <h3 className="font-italiana text-2xl sm:text-3xl font-light text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors duration-300 mb-3">
                  {a3.title}
                </h3>
                <p className="text-xs font-light text-[#FFF0F3]/75 leading-relaxed font-sans mb-6">
                  {a3.subtitle}
                </p>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors">
                  <span className="font-sans text-[11px]">DISCOVER ESSAY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E23B55]" />
                </div>
              </div>
            </div>
          </div>

          {/* SPREAD 3: Horizontal Panoramic Banner */}
          <div className="journal-spread grid grid-cols-1 md:grid-cols-12 gap-8 items-center group cursor-pointer border border-[#E23B55]/20 p-6 sm:p-10 bg-[#130E0B] hover:border-[#E23B55]/60 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(226,59,85,0.25)]">
            <div className="md:col-span-4 relative aspect-[4/3] overflow-hidden bg-[#090706]">
              <img
                src={a4.image}
                alt={a4.title}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.94] transition-transform duration-1000 ease-out group-hover:scale-106"
                loading="lazy"
              />
            </div>

            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#E23B55] font-medium">
                    {a4.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#E23B55]" />
                  <span className="text-[10px] uppercase tracking-widest text-[#FFF0F3]/50 font-sans">
                    {a4.readTime}
                  </span>
                </div>
                <h3 className="font-italiana text-3xl sm:text-4xl font-light text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors duration-300 mb-3">
                  {a4.title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#FFF0F3]/75 leading-relaxed font-sans mb-4">
                  {a4.subtitle}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-medium text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors">
                <span className="font-sans">READ PUBLICATION</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#E23B55]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
