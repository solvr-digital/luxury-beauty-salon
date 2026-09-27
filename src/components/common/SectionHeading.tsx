import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = true,
}) => {
  const alignmentClass =
    align === 'center'
      ? 'text-center mx-auto items-center'
      : align === 'right'
      ? 'text-right ml-auto items-end'
      : 'text-left mr-auto items-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col max-w-3xl mb-16 md:mb-24 ${alignmentClass}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-[1.5px] bg-gradient-to-r from-brand-gold to-brand-gold-champagne shadow-[0_0_8px_rgba(229,195,120,0.5)]" />
          <span className="text-[11px] uppercase tracking-[0.38em] font-sans font-semibold text-brand-gold">
            {eyebrow}
          </span>
          {align === 'center' && (
            <span className="w-9 h-[1.5px] bg-gradient-to-l from-brand-gold to-brand-gold-champagne shadow-[0_0_8px_rgba(229,195,120,0.5)]" />
          )}
        </div>
      )}

      <h2
        className={`font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.06] ${
          dark ? 'text-brand-cream-pure' : 'text-brand-espresso'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl ${
            dark ? 'text-brand-cream-silk' : 'text-brand-espresso/70'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
