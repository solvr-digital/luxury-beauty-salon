import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, Heart } from 'lucide-react';
import { gsap } from '../../utils/gsapSetup';
import { MagneticButton } from '../common/MagneticButton';

interface BridalSectionProps {
  onOpenBooking: () => void;
}

export const BridalSection: React.FC<BridalSectionProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const textTrackRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image heavily cropped -> gradually un-crops and reveals complete image
      gsap.fromTo(
        imageRevealRef.current,
        {
          clipPath: 'inset(20% 16% 20% 16%)',
          scale: 1.15,
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1.2,
          },
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1.0,
          ease: 'power2.out',
        }
      );

      // 2. Text slides vertically on scroll
      gsap.fromTo(
        textTrackRef.current,
        { y: 80, opacity: 0.3 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );

      // 3. Floating floral/light particles parallax
      gsap.to('.bridal-particle', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -120,
        rotate: 45,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bridal"
      ref={sectionRef}
      className="py-32 md:py-48 bg-[#090706] relative overflow-hidden border-t border-[#E23B55]/15"
    >
      {/* Background Rose Glow & Vignette */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#E23B55]/8 blur-[180px] pointer-events-none" />

      {/* Floating Light & Shimmer Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bridal-particle absolute rounded-full bg-[#E23B55] blur-[1px]"
            style={{
              width: `${(i % 3) * 2 + 2}px`,
              height: `${(i % 3) * 2 + 2}px`,
              top: `${(i * 9 + 10) % 90}%`,
              left: `${(i * 13 + 5) % 95}%`,
              opacity: 0.25 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Heading */}
        <div ref={textTrackRef} className="text-center max-w-3xl mx-auto mb-16 will-change-transform">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E23B55]" />
            <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-[#E23B55] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E23B55]" />
              HAUTE BRIDAL ATELIER
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#E23B55]" />
          </div>

          <h2 className="font-italiana text-5xl sm:text-6xl md:text-7xl font-light text-[#FFF0F3] tracking-tight leading-tight">
            FOR YOUR MOST <span className="text-rose-gradient font-light">BEAUTIFUL MOMENTS.</span>
          </h2>

          <p className="mt-4 text-lg sm:text-xl font-editorial italic text-[#FFF0F3]/85 font-light">
            “An extraordinary symphony of veil architecture, couture styling, and radiant bridal luminescence.”
          </p>
        </div>

        {/* Cinematic Bridal Image Stage (Starts heavily cropped, expands on scroll) */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div
            ref={imageRevealRef}
            className="relative w-full aspect-[16/10] overflow-hidden border border-[#E23B55]/30 shadow-[0_30px_80px_rgba(0,0,0,0.9)] will-change-transform bg-[#130E0B]"
          >
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90"
              alt="Élane Haute Bridal Campaign"
              className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.93]"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090706]/90 via-transparent to-transparent pointer-events-none" />

            {/* Floating Bridal Quote Badge */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto z-20 glass-elane p-5 border border-[#E23B55]/35 max-w-md">
              <div className="flex items-center gap-2 text-[#E23B55] text-[10px] uppercase tracking-widest font-sans font-medium mb-1">
                <Heart className="w-3 h-3 fill-[#E23B55]" />
                PRIVATE SANCTUARY SUITE
              </div>
              <p className="text-xs text-[#FFF0F3]/85 font-light font-sans leading-relaxed">
                Includes private dressing suite, French champagne service, veil placement concierge, and long-wear touch-up curation.
              </p>
            </div>
          </div>
        </div>

        {/* End CTA with Magnetic Button */}
        <div className="text-center flex flex-col items-center">
          <MagneticButton onClick={onOpenBooking}>
            <div className="px-10 py-5 bg-gradient-to-r from-[#E23B55] via-[#FF6B8B] to-[#E23B55] text-[#090706] text-xs uppercase tracking-[0.3em] font-sans font-semibold flex items-center gap-3 shadow-[0_4px_35px_rgba(226,59,85,0.45)] hover:brightness-110 transition-all duration-300">
              <span>INQUIRE BRIDAL ATELIER</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </MagneticButton>
          <span className="text-[10px] uppercase tracking-widest text-[#E23B55]/80 font-sans mt-4">
            LIMITED TO TWO BRIDAL PARTIES PER WEEKEND FOR ABSOLUTE PERFECTION
          </span>
        </div>
      </div>
    </section>
  );
};
