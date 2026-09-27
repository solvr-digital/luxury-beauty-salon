import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './utils/gsapSetup';
import { CustomCursor } from './components/common/CustomCursor';
import { NoiseOverlay } from './components/common/NoiseOverlay';
import { ScrollProgress } from './components/common/ScrollProgress';
import { BookingModal } from './components/common/BookingModal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { ScrollStory } from './components/sections/ScrollStory';
import { Services } from './components/sections/Services';
import { SignatureLook } from './components/sections/SignatureLook';
import { BridalSection } from './components/sections/BridalSection';
import { BeautyJournal } from './components/sections/BeautyJournal';
import { BeforeAfterSection } from './components/sections/BeforeAfterSection';
import { BookingSection } from './components/sections/BookingSection';
import type { ServiceItem } from './data/elaneData';

export const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Initialize Lenis Smooth Inertial Scrolling & Synchronize with GSAP ScrollTrigger
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const handleOpenBooking = (service?: ServiceItem) => {
    if (service) {
      setSelectedService(service);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const handleOpenModal = (service?: ServiceItem) => {
    if (service) {
      setSelectedService(service);
    }
    setIsBookingModalOpen(true);
  };

  const handleExploreStory = () => {
    const storyEl = document.getElementById('story');
    if (storyEl) {
      storyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0C0A09] text-[#FAF7F2] selection:bg-[#D5B88D] selection:text-[#0C0A09]">
      {/* 1. Ultra-Fine Radiant Champagne Scroll Progress Hairline */}
      <ScrollProgress />

      {/* 2. Bespoke Editorial Luxury Cursor */}
      <CustomCursor />

      {/* 3. Subtle Film Grain Texture Overlay */}
      <NoiseOverlay />

      {/* 4. Global Navigation Header */}
      <Navbar onOpenBooking={() => handleOpenModal()} />

      {/* 5. Main Visual Storytelling Flow */}
      <main className="relative z-10">
        {/* HERO: Fullscreen cinematic hero with scrub zoom, text parallax, and second visual layer */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreStory={handleExploreStory}
        />

        {/* SCROLL-DRIVEN STORY: Pinned section "THE ART OF BEAUTY" with DISCOVER -> CREATE -> TRANSFORM */}
        <ScrollStory />

        {/* SERVICES: Editorial visual panels instead of ordinary cards */}
        <Services onSelectService={(service) => handleOpenBooking(service)} />

        {/* SIGNATURE EXPERIENCE: Pinned fullscreen section "YOUR SIGNATURE LOOK" (70% -> 100% scale) */}
        <SignatureLook />

        {/* BRIDAL CAMPAIGN: "FOR YOUR MOST BEAUTIFUL MOMENTS." with cropped -> reveal animation */}
        <BridalSection onOpenBooking={() => handleOpenModal()} />

        {/* BEAUTY JOURNAL: Editorial magazine spreads (THE NEW GLOW, MODERN BRIDAL BEAUTY, etc.) */}
        <BeautyJournal />

        {/* BEFORE / AFTER: Sophisticated interactive metamorphosis slider */}
        <BeforeAfterSection />

        {/* BOOKING SECTION: "YOUR MOMENT STARTS HERE." with magnetic CTA button */}
        <BookingSection preselectedService={selectedService} />
      </main>

      {/* 6. Minimal Luxury Footer */}
      <Footer onOpenBooking={() => handleOpenModal()} />

      {/* 7. Fast Concierge Reservation Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};

export default App;
