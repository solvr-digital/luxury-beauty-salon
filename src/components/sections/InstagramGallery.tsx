import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { instagramGalleryData } from '../../data/galleryData';

export const InstagramGallery: React.FC = () => {
  return (
    <section id="gallery" className="py-28 md:py-36 bg-brand-espresso-light/60 relative overflow-hidden border-t border-brand-gold/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-brand-gold" />
              <span className="text-[11px] uppercase tracking-[0.35em] font-sans font-medium text-brand-gold">
                SOCIAL ATELIER
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-brand-cream-pure tracking-tight">
              Inside LUMIÈRE.
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-medium text-brand-cream-pure hover:text-brand-gold transition-colors font-sans"
          >
            <InstagramIcon className="w-4 h-4 text-brand-gold" />
            <span>@lumierehairandbeauty</span>
          </a>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {instagramGalleryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.9,
                delay: (index % 3) * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative overflow-hidden group border border-brand-gold/25 shadow-dark-card ${
                index === 0
                  ? 'lg:row-span-2 aspect-[3/4] lg:aspect-auto'
                  : index === 3
                  ? 'aspect-square'
                  : 'aspect-[4/5]'
              }`}
              data-cursor="view"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter contrast-[1.04] brightness-[0.9] transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso via-brand-espresso/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-6 z-10" />

              {/* Top tag appearing on hover */}
              <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-sans font-medium glass-dark px-3 py-1 border border-brand-gold/40">
                  {item.tag}
                </span>
              </div>

              {/* Instagram Icon & Likes in Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0 pointer-events-none">
                <div className="w-12 h-12 rounded-full glass-dark border border-brand-gold flex items-center justify-center text-brand-gold shadow-[0_0_15px_rgba(229,195,120,0.5)] mb-2">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-cream-pure font-light font-sans">
                  <Heart className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  <span>{item.likes.toLocaleString()} likes</span>
                </div>
              </div>

              {/* Bottom Caption on Hover */}
              <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-light text-brand-cream-pure leading-snug font-sans">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
