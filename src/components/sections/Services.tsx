import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { gsap } from '../../utils/gsapSetup';
import { servicesData, type ServiceItem } from '../../data/elaneData';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of service panels on scroll
      gsap.fromTo(
        '.service-panel',
        { opacity: 0, y: 80, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: panelGridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.16,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 md:py-44 bg-[#090706] relative overflow-hidden border-t border-[#E23B55]/15"
    >
      {/* Background Soft Rose Lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[#E23B55]/8 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[#E23B55]/6 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E23B55]" />
              <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-[#E23B55]">
                HAUTE COIFFURE & RITUALS
              </span>
            </div>
            <h2 className="font-italiana text-5xl sm:text-6xl md:text-7xl font-light text-[#FFF0F3] tracking-tight">
              EDITORIAL <span className="text-rose-gradient font-light">SERVICES</span>
            </h2>
          </div>

          <p className="text-base sm:text-lg font-light text-[#FFF0F3]/80 font-editorial italic max-w-md">
            “Each treatment is approached as an architectural composition, tailored strictly to individuality.”
          </p>
        </div>

        {/* 6 Large Editorial Visual Panels */}
        <div
          ref={panelGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="service-panel group relative cursor-pointer flex flex-col justify-between overflow-hidden bg-[#130E0B] border border-[#E23B55]/20 hover:border-[#E23B55]/70 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(226,59,85,0.25)]"
              data-cursor="view"
            >
              {/* Image Area with Slow Cinematic Zoom */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#090706]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.92] transition-transform duration-1000 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#130E0B] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Service Category Tag */}
                <div className="absolute top-4 left-4 z-20 glass-elane px-3 py-1.5 border border-[#E23B55]/30">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-[#E23B55]">
                    {service.category}
                  </span>
                </div>

                {/* Dynamic Service Number (Shifts on hover) */}
                <div className="absolute top-4 right-4 z-20 glass-elane w-10 h-10 flex items-center justify-center border border-[#E23B55]/30 transition-transform duration-500 group-hover:-translate-y-1 group-hover:border-[#E23B55] shadow-[0_0_10px_rgba(226,59,85,0.2)]">
                  <span className="text-xs font-mono font-medium text-[#E23B55] tracking-wider">
                    {service.number}
                  </span>
                </div>
              </div>

              {/* Panel Content Area */}
              <div className="p-7 sm:p-8 flex flex-col flex-grow justify-between relative z-20">
                <div>
                  {/* Service Title */}
                  <h3 className="font-italiana text-2xl sm:text-3xl text-[#FFF0F3] group-hover:text-[#E23B55] transition-all duration-300 group-hover:translate-x-1 mb-2">
                    {service.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs uppercase tracking-widest text-[#E23B55] font-sans italic mb-4 font-medium">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-light text-[#FFF0F3]/75 leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#E23B55]/15">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#FFF0F3]/80 font-sans">
                        <Sparkles className="w-3 h-3 text-[#E23B55] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Price and Animated Rose Arrow */}
                <div className="pt-4 border-t border-[#E23B55]/20 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#E23B55]/80 font-sans">
                      Investment
                    </span>
                    <span className="font-italiana text-2xl text-[#E23B55] font-normal drop-shadow-[0_0_12px_rgba(226,59,85,0.3)]">
                      {service.price}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors">
                    <span className="font-sans text-[11px] flex items-center gap-1 text-[#FFF0F3]/80">
                      <Clock className="w-3 h-3 text-[#E23B55]" />
                      {service.duration}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#E23B55]/40 flex items-center justify-center group-hover:bg-[#E23B55] group-hover:text-[#090706] group-hover:border-[#E23B55] transition-all duration-300 shadow-[0_0_10px_rgba(226,59,85,0.2)]">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
