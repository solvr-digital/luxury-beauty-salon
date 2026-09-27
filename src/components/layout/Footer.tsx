import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, Check } from 'lucide-react';
import { InstagramIcon, FacebookIcon, PinterestIcon } from '../common/Icons';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="contact" className="relative bg-[#060505] text-[#FFF0F3] pt-28 pb-14 border-t border-[#E23B55]/20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E23B55]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#E23B55]/15">
          {/* Col 1: Brand & Philosophy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-col items-start mb-6">
                <span className="font-italiana tracking-[0.24em] text-4xl sm:text-5xl font-light text-rose-gradient">
                  ÉLANE
                </span>
                <span className="text-[10px] uppercase tracking-[0.45em] text-[#E23B55] font-sans font-medium mt-1">
                  HAUTE BEAUTÉ ATELIER
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#FFF0F3]/70 font-light leading-relaxed max-w-sm mb-6 font-sans">
                Where beauty meets high-artistry. An architectural sanctuary dedicated to cinematic transformation, couture hair styling, and bespoke aesthetic rituals.
              </p>
              <div className="inline-block py-1.5 px-3 border border-[#E23B55]/40 text-xs tracking-widest text-[#E23B55] uppercase font-sans shadow-[0_0_12px_rgba(226,59,85,0.2)]">
                “Beauty, Redefined.”
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#E23B55] mb-3 font-sans font-medium">Sanctuary Locations</p>
              <div className="flex items-center gap-2.5 text-sm text-[#FFF0F3]/80 font-sans">
                <MapPin className="w-4 h-4 text-[#E23B55] shrink-0" />
                <span>12 Place Vendôme, 75001 Paris, France</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#FFF0F3]/80 mt-2 font-sans">
                <MapPin className="w-4 h-4 text-[#E23B55] shrink-0" />
                <span>740 Madison Avenue, New York, NY 10065</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#FFF0F3]/80 mt-2 font-sans">
                <Mail className="w-4 h-4 text-[#E23B55] shrink-0" />
                <a href="mailto:concierge@elanebeauty.com" className="hover:text-[#E23B55] transition-colors">
                  concierge@elanebeauty.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#FFF0F3]/80 mt-2 font-sans">
                <Phone className="w-4 h-4 text-[#E23B55] shrink-0" />
                <span>+33 1 42 68 00 20</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-[#E23B55] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'Story', href: '#story' },
                { name: 'Services', href: '#services' },
                { name: 'Signature', href: '#signature' },
                { name: 'Bridal Atelier', href: '#bridal' },
                { name: 'Journal', href: '#journal' },
                { name: 'Metamorphosis', href: '#transformations' },
                { name: 'Book Appointment', href: '#booking' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-light text-[#FFF0F3]/75 hover:text-[#E23B55] transition-colors duration-200 flex items-center group font-sans"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#E23B55] ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Atelier Cadence (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-[#E23B55] mb-6">
              Atelier Hours
            </h4>
            <div className="space-y-3.5 text-sm font-light text-[#FFF0F3]/75 font-sans">
              <div>
                <p className="text-[#FFF0F3] font-normal">Tuesday – Friday</p>
                <p className="text-xs text-[#FFF0F3]/50">09:30 AM – 08:00 PM</p>
              </div>
              <div>
                <p className="text-[#FFF0F3] font-normal">Saturday – Sunday</p>
                <p className="text-xs text-[#FFF0F3]/50">09:00 AM – 07:30 PM</p>
              </div>
              <div>
                <p className="text-[#FFF0F3] font-normal">Monday</p>
                <p className="text-xs text-[#E23B55]">Private VIP Suites Only</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onOpenBooking}
                className="text-xs uppercase tracking-[0.25em] text-[#E23B55] hover:text-[#FFF0F3] underline underline-offset-4 transition-colors font-sans"
              >
                Reserve Appointment →
              </button>
            </div>
          </div>

          {/* Col 4: Newsletter & Social (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-[#E23B55] mb-6">
              The ÉLANE Gazette
            </h4>
            <p className="text-xs text-[#FFF0F3]/75 font-light leading-relaxed mb-4 font-sans">
              Receive private invitations, seasonal ritual releases, and beauty editorial dispatches.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-[#130E0B] border border-[#E23B55]/30 px-4 py-3 text-xs text-[#FFF0F3] placeholder:text-[#FFF0F3]/30 focus:outline-none focus:border-[#E23B55] transition-colors font-sans"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-gradient-to-r from-[#E23B55] to-[#FF6B8B] text-[#090706] text-xs font-semibold hover:brightness-110 transition-colors flex items-center justify-center shadow-sm"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-[#E23B55] tracking-wide font-sans">
                  Welcome to the ÉLANE circle.
                </p>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-[#E23B55]/15">
              <p className="text-xs uppercase tracking-[0.25em] text-[#E23B55]/80 mb-3 font-sans">Connect</p>
              <div className="flex items-center space-x-3">
                {[
                  { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/elanebeauty' },
                  { name: 'Pinterest', icon: PinterestIcon, href: 'https://pinterest.com' },
                  { name: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com' },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 border border-[#E23B55]/35 flex items-center justify-center text-[#FFF0F3]/80 hover:text-[#090706] hover:bg-[#E23B55] hover:border-[#E23B55] transition-all duration-300 shadow-[0_0_10px_rgba(226,59,85,0.2)]"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#FFF0F3]/50 font-sans">
          <p>© {new Date().getFullYear()} ÉLANE BEAUTY. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-[#E23B55] transition-colors">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-[#FFF0F3]/20" />
            <a href="#terms" className="hover:text-[#E23B55] transition-colors">Terms of Ritual</a>
            <span className="w-1 h-1 rounded-full bg-[#FFF0F3]/20" />
            <a href="#press" className="hover:text-[#E23B55] transition-colors">Editorial Press</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
