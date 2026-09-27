import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { gsap } from '../../utils/gsapSetup';
import { MagneticButton } from '../common/MagneticButton';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreStory }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Fashion Reveal Timeline on page load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        bgImageRef.current,
        { scale: 1.18, filter: 'brightness(0.7)' },
        { scale: 1.04, filter: 'brightness(0.95)', duration: 2.4 }
      )
        .fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: 25, letterSpacing: '0.15em' },
          { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1.2 },
          '-=1.5'
        )
        .fromTo(
          '.hero-title-char',
          { opacity: 0, y: 50, rotateX: -25 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.035, duration: 1.3 },
          '-=1.1'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          '-=0.8'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.9 },
          '-=0.6'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );

      // 2. Scroll-driven cinematic scrub parallax (NO WHITE BLEND, RICH CONTRAST PRESERVED)
      gsap.to(bgImageRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        scale: 1.15,
        yPercent: 10,
        ease: 'none',
      });

      gsap.to(textContentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        yPercent: -40,
        opacity: 0.2,
      });

      gsap.to(scrollIndicatorRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '25% top',
          scrub: true,
        },
        opacity: 0,
        y: 20,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-[#090706]"
    >
      {/* Cinematic High-Definition Editorial Model Background */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2200&q=95')`,
        }}
      >
        {/* Rich dark editorial vignettes: deep shadows, warm rose highlights, zero white bleaching */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-[#090706]/40 to-[#090706]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#090706]/45 to-[#090706]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-[#E23B55]/10 blur-[180px] pointer-events-none" />
      </div>

      {/* Main Foreground Typography & Narrative */}
      <div
        ref={textContentRef}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-16 will-change-transform"
      >
        {/* Editorial Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E23B55]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] font-sans font-medium text-[#E23B55] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E23B55]" />
            HAUTE BEAUTÉ ATELIER
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#E23B55]" />
        </div>

        {/* Hero Headline: BEAUTY, REDEFINED. with Rose Red font styling */}
        <h1 className="font-italiana text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[1.0] mb-6">
          <span className="block overflow-hidden text-[#FFF0F3]">
            {'BEAUTY,'.split('').map((char, i) => (
              <span key={i} className="hero-title-char inline-block">
                {char}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden italic text-rose-gradient font-editorial font-light drop-shadow-[0_0_35px_rgba(226,59,85,0.4)]">
            {'REDEFINED.'.split('').map((char, i) => (
              <span key={i} className="hero-title-char inline-block">
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtext: Where beauty meets artistry. */}
        <p className="hero-subtext text-lg sm:text-2xl md:text-3xl text-[#FFE4E8]/90 font-light font-editorial italic max-w-xl mx-auto mb-10 leading-relaxed">
          “Where beauty meets artistry.”
        </p>

        {/* Magnetic Primary CTA & Secondary Explore */}
        <div className="hero-cta flex flex-col sm:flex-row items-center gap-5">
          <MagneticButton onClick={onOpenBooking}>
            <div className="px-10 py-4.5 bg-gradient-to-r from-[#E23B55] via-[#FF6B8B] to-[#E23B55] text-[#090706] text-xs uppercase tracking-[0.3em] font-sans font-semibold shadow-[0_4px_30px_rgba(226,59,85,0.5)] hover:brightness-110 transition-all duration-300">
              RESERVE APPOINTMENT
            </div>
          </MagneticButton>

          <button
            onClick={onExploreStory}
            className="px-9 py-4.5 border border-[#E23B55]/40 text-[#FFF0F3] text-xs uppercase tracking-[0.28em] font-sans font-medium hover:border-[#E23B55] hover:text-[#E23B55] transition-colors duration-300"
          >
            THE ATELIER STORY
          </button>
        </div>
      </div>

      {/* Small "SCROLL TO DISCOVER ↓" Button */}
      <div
        ref={scrollIndicatorRef}
        onClick={onExploreStory}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group select-none text-[#E23B55] hover:text-[#FF6B8B] transition-colors duration-300"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-medium">
          SCROLL TO DISCOVER
        </span>
        <div className="w-5 h-5 rounded-full border border-[#E23B55]/50 flex items-center justify-center group-hover:border-[#E23B55] animate-bounce shadow-[0_0_10px_rgba(226,59,85,0.4)]">
          <ArrowDown className="w-3 h-3 text-[#E23B55]" />
        </div>
      </div>
    </section>
  );
};
