import React, { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapSetup';
import { signatureDetailsData } from '../../data/elaneData';

export const SignatureLook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const bgShadeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const signatureTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2600',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Initial State: Image starts at 70% scale with soft rounded corners
      signatureTimeline
        .fromTo(
          imageFrameRef.current,
          { scale: 0.7, borderRadius: '24px' },
          { scale: 0.85, borderRadius: '16px', duration: 1.5, ease: 'none' }
        )
        // Background changes subtly
        .to(
          bgShadeRef.current,
          { opacity: 0.85, duration: 2.0, ease: 'none' },
          '-=1.5'
        )
        // Title moves subtly upward
        .to(
          titleRef.current,
          { yPercent: -30, opacity: 0.4, duration: 1.5, ease: 'none' },
          '-=1.5'
        )

        // Detail 01 and 02 reveal and slide around image
        .fromTo(
          '.signature-detail-0',
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(
          '.signature-detail-1',
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
          '-=1.0'
        )

        // Mid-scroll: Details 03 and 04 appear while details 01 & 02 gently fade
        .to(
          ['.signature-detail-0', '.signature-detail-1'],
          { opacity: 0.15, duration: 1.0 }
        )
        .fromTo(
          '.signature-detail-2',
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          '.signature-detail-3',
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
          '-=1.0'
        )

        // Final transition: Image scales from 85% -> 100% fullscreen cinematic frame
        .to(
          imageFrameRef.current,
          {
            scale: 1.0,
            borderRadius: '0px',
            duration: 2.2,
            ease: 'power2.inOut',
          }
        )
        .to(
          ['.signature-detail-2', '.signature-detail-3'],
          { opacity: 0, duration: 0.8 },
          '-=1.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature"
      ref={containerRef}
      className="relative w-full h-screen min-h-[750px] overflow-hidden bg-[#090706] text-[#FFF0F3] flex items-center justify-center border-t border-[#E23B55]/15"
    >
      {/* Background Subtle Luminous Layer that changes on scroll */}
      <div
        ref={bgShadeRef}
        className="absolute inset-0 bg-radial from-[#E23B55]/12 via-[#110D0B] to-[#090706] opacity-30 transition-opacity duration-1000 pointer-events-none"
      />

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-transparent to-[#090706] pointer-events-none z-10" />

      {/* Floating Section Title */}
      <div className="absolute top-12 left-0 right-0 text-center z-20 pointer-events-none px-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E23B55]" />
          <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-[#E23B55]">
            SIGNATURE METHODOLOGY
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#E23B55]" />
        </div>
        <h2
          ref={titleRef}
          className="font-italiana text-5xl sm:text-6xl md:text-7xl text-[#FFF0F3] tracking-tight will-change-transform"
        >
          YOUR SIGNATURE <span className="text-rose-gradient font-light">LOOK</span>
        </h2>
      </div>

      {/* Main Center Image Frame that scales 70% -> 100% fullscreen */}
      <div
        ref={imageFrameRef}
        className="relative w-full h-full max-w-[1400px] max-h-[850px] overflow-hidden border border-[#E23B55]/25 shadow-[0_30px_90px_rgba(0,0,0,0.9)] will-change-transform flex items-center justify-center"
      >
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2000&q=90"
          alt="Signature Beauty Portrait"
          className="w-full h-full object-cover object-center filter contrast-[1.06] brightness-[0.94]"
        />

        {/* Ambient Dark Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090706]/80 via-transparent to-[#090706]/40 pointer-events-none" />

        {/* Final Frame Bottom Monogram Tag */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 glass-elane px-6 py-2 border border-[#E23B55]/40 pointer-events-none shadow-[0_0_15px_rgba(226,59,85,0.25)]">
          <span className="font-editorial italic text-sm text-[#E23B55] tracking-widest">
            Élane Signature Atelier • Master Edition
          </span>
        </div>
      </div>

      {/* Floating Detail Callouts (Placed around the image) */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pointer-events-none z-30 flex items-center justify-between">
        {/* LEFT COLUMN DETAILS (01 & 03) */}
        <div className="flex flex-col gap-24 max-w-xs">
          {/* Detail 01 */}
          <div className="signature-detail-0 glass-elane p-5 border border-[#E23B55]/30 backdrop-blur-md">
            <span className="text-[10px] font-mono text-[#E23B55] tracking-widest block mb-1">
              DETAIL {signatureDetailsData[0].number}
            </span>
            <h4 className="font-italiana text-2xl text-[#FFF0F3] font-light mb-1">
              {signatureDetailsData[0].title}
            </h4>
            <p className="text-xs text-[#FFF0F3]/75 font-sans leading-relaxed">
              {signatureDetailsData[0].desc}
            </p>
          </div>

          {/* Detail 03 */}
          <div className="signature-detail-2 glass-elane p-5 border border-[#E23B55]/30 backdrop-blur-md">
            <span className="text-[10px] font-mono text-[#E23B55] tracking-widest block mb-1">
              DETAIL {signatureDetailsData[2].number}
            </span>
            <h4 className="font-italiana text-2xl text-[#FFF0F3] font-light mb-1">
              {signatureDetailsData[2].title}
            </h4>
            <p className="text-xs text-[#FFF0F3]/75 font-sans leading-relaxed">
              {signatureDetailsData[2].desc}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN DETAILS (02 & 04) */}
        <div className="flex flex-col gap-24 max-w-xs text-right">
          {/* Detail 02 */}
          <div className="signature-detail-1 glass-elane p-5 border border-[#E23B55]/30 backdrop-blur-md">
            <span className="text-[10px] font-mono text-[#E23B55] tracking-widest block mb-1">
              DETAIL {signatureDetailsData[1].number}
            </span>
            <h4 className="font-italiana text-2xl text-[#FFF0F3] font-light mb-1">
              {signatureDetailsData[1].title}
            </h4>
            <p className="text-xs text-[#FFF0F3]/75 font-sans leading-relaxed">
              {signatureDetailsData[1].desc}
            </p>
          </div>

          {/* Detail 04 */}
          <div className="signature-detail-3 glass-elane p-5 border border-[#E23B55]/30 backdrop-blur-md">
            <span className="text-[10px] font-mono text-[#E23B55] tracking-widest block mb-1">
              DETAIL {signatureDetailsData[3].number}
            </span>
            <h4 className="font-italiana text-2xl text-[#FFF0F3] font-light mb-1">
              {signatureDetailsData[3].title}
            </h4>
            <p className="text-xs text-[#FFF0F3]/75 font-sans leading-relaxed">
              {signatureDetailsData[3].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
