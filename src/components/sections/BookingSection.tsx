import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData, type ServiceItem } from '../../data/elaneData';
import { MagneticButton } from '../common/MagneticButton';

interface BookingSectionProps {
  preselectedService?: ServiceItem | null;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: servicesData[0].name,
    date: '',
    timeSlot: '11:00 AM — Morning Atelier',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService.name }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#E23B55', '#FF6B8B', '#FFF0F3', '#C72C41'],
      });
    } catch {
      // ignore
    }
  };

  const timeSlots = [
    '10:00 AM — Morning Atelier',
    '01:30 PM — Midday Radiance',
    '04:00 PM — Golden Hour Session',
    '06:30 PM — Twilight Sanctuary',
  ];

  return (
    <section
      id="booking"
      className="py-32 md:py-48 bg-[#090706] text-[#FFF0F3] relative overflow-hidden border-t border-[#E23B55]/15"
    >
      {/* Background Soft Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full bg-[#E23B55]/8 blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E23B55]" />
            <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-[#E23B55]">
              PRIVATE SANCTUARY RESERVATION
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#E23B55]" />
          </div>

          <h2 className="font-italiana text-4xl sm:text-6xl md:text-7xl font-light text-[#FFF0F3] tracking-tight leading-tight">
            YOUR MOMENT <span className="text-rose-gradient font-light">STARTS HERE.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base font-light text-[#FFF0F3]/80 font-editorial italic">
            “Select your preferred ritual and time. Our concierge will curate your personalized private suite upon arrival.”
          </p>
        </div>

        {/* Booking Card Form Container */}
        <div className="bg-[#130E0B]/90 backdrop-blur-xl border border-[#E23B55]/30 p-8 sm:p-12 lg:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                {/* Service Selection Radio Pills */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] font-sans text-[#E23B55] mb-4 font-medium">
                    Select Your Ritual:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {servicesData.map((svc) => (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: svc.name })}
                        className={`p-4 text-left border transition-all duration-300 flex items-center justify-between ${
                          formData.service === svc.name
                            ? 'border-[#E23B55] bg-[#E23B55]/15 text-[#E23B55] shadow-[0_0_20px_rgba(226,59,85,0.3)]'
                            : 'border-[#E23B55]/15 bg-[#090706]/60 text-[#FFF0F3]/70 hover:border-[#E23B55]/40'
                        }`}
                      >
                        <span className="text-xs font-light tracking-wide">{svc.name}</span>
                        {formData.service === svc.name && (
                          <Sparkles className="w-3.5 h-3.5 text-[#E23B55]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Inputs: Name, Email, Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="peer w-full bg-transparent border-b border-[#E23B55]/30 pt-6 pb-2 text-sm text-[#FFF0F3] placeholder-transparent focus:outline-none focus:border-[#E23B55] focus:shadow-[0_2px_10px_rgba(226,59,85,0.4)] transition-all font-sans"
                      placeholder="Your Full Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-1 text-xs uppercase tracking-[0.2em] text-[#FFF0F3]/50 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#FFF0F3]/40 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#E23B55] font-sans"
                    >
                      Full Name *
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="peer w-full bg-transparent border-b border-[#E23B55]/30 pt-6 pb-2 text-sm text-[#FFF0F3] placeholder-transparent focus:outline-none focus:border-[#E23B55] focus:shadow-[0_2px_10px_rgba(226,59,85,0.4)] transition-all font-sans"
                      placeholder="Your Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-1 text-xs uppercase tracking-[0.2em] text-[#FFF0F3]/50 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#FFF0F3]/40 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#E23B55] font-sans"
                    >
                      Email Address *
                    </label>
                  </div>

                  {/* Phone Input */}
                  <div className="relative group sm:col-span-2 lg:col-span-1">
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="peer w-full bg-transparent border-b border-[#E23B55]/30 pt-6 pb-2 text-sm text-[#FFF0F3] placeholder-transparent focus:outline-none focus:border-[#E23B55] focus:shadow-[0_2px_10px_rgba(226,59,85,0.4)] transition-all font-sans"
                      placeholder="Phone Number"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-0 top-1 text-xs uppercase tracking-[0.2em] text-[#FFF0F3]/50 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#FFF0F3]/40 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#E23B55] font-sans"
                    >
                      Phone Number *
                    </label>
                  </div>
                </div>

                {/* Date & Time Slot Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Preferred Date */}
                  <div className="relative group">
                    <label
                      htmlFor="date"
                      className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-2 flex items-center gap-1.5 font-medium font-sans"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#E23B55]" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#090706]/70 border border-[#E23B55]/30 px-4 py-3 text-xs text-[#FFF0F3] focus:outline-none focus:border-[#E23B55] transition-colors font-sans"
                    />
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-2 flex items-center gap-1.5 font-medium font-sans">
                      <Clock className="w-3.5 h-3.5 text-[#E23B55]" />
                      Preferred Time Window *
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-[#090706]/70 border border-[#E23B55]/30 px-4 py-3 text-xs text-[#FFF0F3] focus:outline-none focus:border-[#E23B55] transition-colors font-sans"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#090706] text-[#FFF0F3]">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="relative group pt-2">
                  <label
                    htmlFor="notes"
                    className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-2 font-medium font-sans"
                  >
                    Special Requests or Stylist Preference (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="E.g. Quiet appointment, organic refreshments, veil fitting, scalp sensitivities..."
                    className="w-full bg-[#090706]/70 border border-[#E23B55]/30 p-3 text-xs text-[#FFF0F3] placeholder:text-[#FFF0F3]/30 focus:outline-none focus:border-[#E23B55] transition-colors font-sans"
                  />
                </div>

                {/* Bottom Submit CTA: BOOK AN APPOINTMENT with Magnetic Button */}
                <div className="pt-8 border-t border-[#E23B55]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-xs text-[#FFF0F3]/70 font-sans">
                    <ShieldCheck className="w-4 h-4 text-[#E23B55]" />
                    <span>Complimentary consultation & French champagne included</span>
                  </div>

                  <MagneticButton strength={0.4}>
                    <button
                      type="submit"
                      className="px-10 py-5 bg-gradient-to-r from-[#E23B55] via-[#FF6B8B] to-[#E23B55] text-[#090706] text-xs uppercase tracking-[0.3em] font-sans font-semibold hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_4px_35px_rgba(226,59,85,0.45)]"
                    >
                      <span>BOOK AN APPOINTMENT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full border border-[#E23B55] flex items-center justify-center text-[#E23B55] mb-6 bg-[#E23B55]/10 shadow-[0_0_25px_rgba(226,59,85,0.35)]">
                  <Check className="w-8 h-8" />
                </div>

                <span className="text-xs uppercase tracking-[0.35em] text-[#E23B55] font-sans font-semibold">
                  RESERVATION CONFIRMED
                </span>
                <h3 className="font-italiana text-4xl sm:text-5xl font-light text-[#FFF0F3] mt-2 mb-4">
                  We Await You, {formData.name || 'Valued Guest'}.
                </h3>

                <p className="text-sm font-light text-[#FFF0F3]/80 max-w-lg leading-relaxed mb-8 font-sans">
                  Your ritual for <strong className="text-[#E23B55] font-semibold">{formData.service}</strong> on{' '}
                  <strong className="text-[#FFF0F3]">{formData.date || 'your chosen date'}</strong> ({formData.timeSlot}) has been registered in the master salon ledger. A concierge invitation has been dispatched to {formData.email || 'your email'}.
                </p>

                <div className="glass-elane px-6 py-4 border border-[#E23B55]/30 text-xs text-[#FFF0F3]/80 max-w-md mb-8">
                  <p className="tracking-wide font-sans">
                    Sanctuary Atelier: ÉLANE BEAUTY, Place Vendôme, Paris & Madison Ave, New York
                  </p>
                  <p className="text-[#E23B55]/80 mt-1 font-sans">Valet parking & private elevator entrance reserved</p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs uppercase tracking-[0.2em] text-[#E23B55] hover:text-[#FFF0F3] transition-colors underline underline-offset-4 font-sans font-medium"
                >
                  Book Another Ritual
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
