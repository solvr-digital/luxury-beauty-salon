import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, ArrowRight, Calendar, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData, type ServiceItem } from '../../data/elaneData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService ? initialService.name : servicesData[0].name,
    date: '',
    timeSlot: '11:00 AM — Morning Atelier',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService.name }));
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        colors: ['#E23B55', '#FF6B8B', '#FFF0F3', '#C72C41'],
      });
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#060505]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#130E0B] border border-[#E23B55]/35 shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-8 sm:p-12 text-[#FFF0F3] z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-[#FFF0F3]/60 hover:text-[#E23B55] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center gap-2 text-[#E23B55] mb-2">
                <Sparkles className="w-4 h-4 text-[#E23B55]" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-medium text-[#E23B55]">
                  ÉLANE CONCIERGE ATELIER
                </span>
              </div>

              <h3 className="font-italiana text-3xl sm:text-4xl font-light text-[#FFF0F3] mb-2">
                Reserve Your Atelier Session
              </h3>
              <p className="text-xs text-[#FFF0F3]/75 mb-8 font-light font-sans">
                Please provide your details below. A beauty director will confirm your private suite within 3 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-2 font-medium font-sans">
                    Selected Ritual
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#090706] border border-[#E23B55]/35 px-4 py-3 text-xs text-[#FFF0F3] focus:outline-none focus:border-[#E23B55] font-sans"
                  >
                    {servicesData.map((svc) => (
                      <option key={svc.id} value={svc.name}>
                        {svc.name} ({svc.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-1 font-medium font-sans">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Camille de Laurent"
                      className="w-full bg-[#090706] border border-[#E23B55]/35 px-3.5 py-2.5 text-xs text-[#FFF0F3] focus:outline-none focus:border-[#E23B55] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-1 font-medium font-sans">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full bg-[#090706] border border-[#E23B55]/35 px-3.5 py-2.5 text-xs text-[#FFF0F3] focus:outline-none focus:border-[#E23B55] font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-1 font-medium font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="camille@domain.com"
                    className="w-full bg-[#090706] border border-[#E23B55]/35 px-3.5 py-2.5 text-xs text-[#FFF0F3] focus:outline-none focus:border-[#E23B55] font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-1 flex items-center gap-1 font-medium font-sans">
                      <Calendar className="w-3 h-3 text-[#E23B55]" /> Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#090706] border border-[#E23B55]/35 px-3.5 py-2.5 text-xs text-[#FFF0F3] focus:outline-none focus:border-[#E23B55] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#E23B55] mb-1 flex items-center gap-1 font-medium font-sans">
                      <Clock className="w-3 h-3 text-[#E23B55]" /> Time Window *
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-[#090706] border border-[#E23B55]/35 px-3.5 py-2.5 text-xs text-[#FFF0F3] focus:outline-none focus:border-[#E23B55] font-sans"
                    >
                      <option value="10:00 AM — Morning Atelier">10:00 AM — Morning Atelier</option>
                      <option value="01:30 PM — Midday Radiance">01:30 PM — Midday Radiance</option>
                      <option value="04:00 PM — Golden Hour Session">04:00 PM — Golden Hour Session</option>
                      <option value="06:30 PM — Twilight Sanctuary">06:30 PM — Twilight Sanctuary</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-[#E23B55]/30 text-xs uppercase tracking-widest text-[#FFF0F3]/70 hover:text-[#E23B55] font-sans"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#E23B55] via-[#FF6B8B] to-[#E23B55] text-[#090706] text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 flex items-center gap-2 shadow-[0_4px_25px_rgba(226,59,85,0.4)] font-sans"
                  >
                    <span>Request Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-[#E23B55] flex items-center justify-center text-[#E23B55] mb-4 bg-[#E23B55]/10 shadow-[0_0_20px_rgba(226,59,85,0.35)]">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-italiana text-3xl font-light text-[#FFF0F3] mb-2">
                Ritual Reserved
              </h3>
              <p className="text-xs text-[#FFF0F3]/80 max-w-sm mb-6 leading-relaxed font-sans">
                Thank you, {formData.name}. We have logged your request for <span className="text-[#E23B55] font-medium">{formData.service}</span> on {formData.date || 'your chosen date'}.
              </p>
              <button
                onClick={onClose}
                className="px-7 py-3 bg-gradient-to-r from-[#E23B55] to-[#FF6B8B] text-[#090706] text-xs uppercase tracking-widest font-semibold hover:brightness-110 font-sans shadow-[0_0_15px_rgba(226,59,85,0.3)]"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
