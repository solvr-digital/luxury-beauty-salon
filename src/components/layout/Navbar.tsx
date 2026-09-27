import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'story', 'services', 'signature', 'bridal', 'journal', 'transformations', 'booking'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'STORY', href: '#story', id: 'story' },
    { name: 'SERVICES', href: '#services', id: 'services' },
    { name: 'SIGNATURE', href: '#signature', id: 'signature' },
    { name: 'BRIDAL', href: '#bridal', id: 'bridal' },
    { name: 'JOURNAL', href: '#journal', id: 'journal' },
    { name: 'METAMORPHOSIS', href: '#transformations', id: 'transformations' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-[#090706]/90 backdrop-blur-xl border-b border-[#E23B55]/25 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
            : 'bg-transparent py-6 lg:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Editorial Crest */}
          <a href="#hero" className="group flex items-center gap-3">
            <div className="w-9 h-9 border border-[#E23B55]/40 rounded-full flex items-center justify-center bg-[#090706]/60 group-hover:border-[#E23B55] transition-colors duration-500 shadow-[0_0_12px_rgba(226,59,85,0.25)]">
              <span className="font-italiana text-xl text-[#E23B55]">É</span>
            </div>
            <div className="flex flex-col">
              <span className="font-italiana text-2xl sm:text-3xl tracking-[0.2em] text-[#FFF0F3] group-hover:text-[#E23B55] transition-colors duration-300">
                ÉLANE
              </span>
              <span className="text-[8px] uppercase tracking-[0.45em] text-[#E23B55] font-sans font-medium -mt-1">
                HAUTE BEAUTÉ
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.25em] font-sans transition-all duration-300 relative py-1 group ${
                    isActive ? 'text-[#E23B55] font-medium' : 'text-[#FFF0F3]/75 hover:text-[#E23B55]'
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#E23B55] transition-all duration-300 ${
                      isActive ? 'w-full shadow-[0_0_8px_rgba(226,59,85,0.85)]' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center space-x-5">
            <MagneticButton onClick={onOpenBooking}>
              <div className="relative group overflow-hidden px-6 py-2.5 border border-[#E23B55]/50 hover:border-[#E23B55] transition-colors duration-500 shadow-[0_0_15px_rgba(226,59,85,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E23B55] to-[#FF6B8B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#E23B55] group-hover:text-[#090706] transition-colors duration-500 flex items-center gap-1.5">
                  RESERVE ATELIER
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FFF0F3] hover:text-[#E23B55] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E23B55]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Curtain Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#090706]/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 lg:hidden pt-28"
          >
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#E23B55] font-sans block mb-6 font-semibold">
                ÉLANE REPERTOIRE
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-italiana text-3xl sm:text-4xl text-[#FFF0F3] hover:text-[#E23B55] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-[#E23B55]/25 flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 bg-gradient-to-r from-[#E23B55] to-[#FF6B8B] text-[#090706] text-xs uppercase tracking-[0.25em] font-semibold text-center shadow-[0_0_20px_rgba(226,59,85,0.4)]"
              >
                RESERVE ATELIER
              </button>
              <div className="text-center text-[10px] uppercase tracking-widest text-[#FFF0F3]/50 font-sans">
                Place Vendôme • Madison Ave • Altamount Rd
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
