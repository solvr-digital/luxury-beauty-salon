import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Droplets, Flame, Feather, Shield } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { productsData } from '../../data/productsData';
import { Product3DViewer } from '../3d/Product3DViewer';
import type { LuxuryProduct } from '../../types';

interface ProductShowcaseProps {
  onOrderProduct?: (product: LuxuryProduct) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOrderProduct }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(productsData[0].id);
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const activeProduct = productsData.find((p) => p.id === selectedProductId) || productsData[0];

  const handleAddToRitual = () => {
    setAddedNotice(true);
    if (onOrderProduct) onOrderProduct(activeProduct);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'serum':
        return <Droplets className="w-4 h-4 text-brand-gold" />;
      case 'perfume':
        return <Flame className="w-4 h-4 text-brand-gold" />;
      case 'hair-oil':
        return <Feather className="w-4 h-4 text-brand-gold" />;
      default:
        return <Shield className="w-4 h-4 text-brand-gold" />;
    }
  };

  return (
    <section id="products" className="py-28 md:py-36 bg-brand-espresso-light/60 relative overflow-hidden border-t border-brand-gold/15">
      {/* Background Radial Gold Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-brand-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <SectionHeading
          eyebrow="ATELIER APOTHECARY"
          title="BEAUTY ESSENTIALS"
          subtitle="Formulated with rare botanical absolutes, precious floral stem cells, and bio-fermented peptides. Experience interactive 3D product inspection below."
          dark={true}
        />

        {/* Product Selection Tab Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16">
          {productsData.map((prod) => (
            <button
              key={prod.id}
              onClick={() => setSelectedProductId(prod.id)}
              className={`p-4 text-left transition-all duration-300 border flex flex-col justify-between ${
                selectedProductId === prod.id
                  ? 'bg-brand-espresso border-brand-gold shadow-[0_0_20px_rgba(229,195,120,0.25)]'
                  : 'bg-brand-espresso-card/60 border-brand-gold/20 hover:border-brand-gold/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-brand-gold/70">
                  {prod.category}
                </span>
                {getProductIcon(prod.id)}
              </div>
              <h4 className="font-editorial text-lg text-brand-cream-pure font-light leading-snug">
                {prod.name}
              </h4>
              <p className="text-xs font-mono text-brand-gold-champagne mt-2 font-medium">
                {prod.price}
              </p>
            </button>
          ))}
        </div>

        {/* Main 3D Interactive Stage & Editorial Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: 3D Product Interactive Stage (7 cols) */}
          <div
            className="lg:col-span-7 relative flex items-center justify-center min-h-[420px] md:min-h-[500px] bg-brand-espresso/90 backdrop-blur-md border border-brand-gold/30 p-6 shadow-dark-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient Gold Spotlight Glow that intensifies on hover */}
            <div
              className={`absolute inset-0 bg-radial from-brand-gold/20 via-transparent to-transparent blur-3xl transition-opacity duration-700 pointer-events-none ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-40 scale-95'
              }`}
            />

            {/* Interactive 3D Canvas */}
            <Product3DViewer product={activeProduct} isHovered={isHovered} />

            {/* 360° Drag Hint */}
            <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-brand-cream/60 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span>360° Drag to Rotate</span>
            </div>

            {/* Volume Badge */}
            <div className="absolute top-4 right-6 z-20 glass-dark px-3 py-1 border border-brand-gold/30">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold font-mono">
                {activeProduct.volume}
              </span>
            </div>
          </div>

          {/* RIGHT: Product Narrative & Formulation Specs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-brand-gold">
                    {activeProduct.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="text-xs uppercase tracking-widest text-brand-cream/60">
                    Lumière Reserve
                  </span>
                </div>

                <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-brand-cream-pure leading-tight mb-2">
                  {activeProduct.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] font-sans text-brand-gold/70 mb-6">
                  {activeProduct.subtitle}
                </p>

                <p className="text-sm sm:text-base font-light text-brand-cream/80 leading-relaxed mb-8 font-sans">
                  {activeProduct.description}
                </p>

                {/* Formulation Notes */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-brand-gold mb-3">
                    Active Formulation Elements
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.notes.map((note, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-brand-espresso border border-brand-gold/30 text-xs text-brand-cream font-light"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Ingredients */}
                <div className="mb-8 pt-6 border-t border-brand-gold/15">
                  <p className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-brand-cream-pure mb-2">
                    Key Ingredients:
                  </p>
                  <p className="text-xs text-brand-cream/70 font-light leading-relaxed font-sans">
                    {activeProduct.keyIngredients.join(' • ')}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center gap-6 pt-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-muted block font-sans">
                      Price
                    </span>
                    <span className="font-editorial text-3xl text-brand-gold-champagne font-medium">
                      {activeProduct.price}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToRitual}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-brand-gold-champagne via-brand-gold to-brand-gold-radiant text-brand-espresso text-xs uppercase tracking-[0.25em] font-semibold hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(229,195,120,0.35)]"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-800" />
                        <span className="text-emerald-950 font-bold">ADDED TO RITUAL</span>
                      </>
                    ) : (
                      <>
                        <span>ACQUIRE ELIXIR</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
