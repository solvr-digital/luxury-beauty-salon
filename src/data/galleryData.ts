import type { BeforeAfterItem, GalleryItem, TestimonialItem } from '../types';

export const beforeAfterData: BeforeAfterItem[] = [
  {
    id: 'transformation-1',
    title: 'The Golden Amber Balayage & Crown Sculpt',
    category: 'Hair Metamorphosis',
    description: 'Transition from dull, brassy, uneven tones into a multi-tonal dimensional champagne caramel melt with soft French layered curtain framing.',
    artist: 'Elena Rostova, Master Colorist',
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85',
    afterImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'transformation-2',
    title: 'Luminous Bridal Complexion & Sculpted Waves',
    category: 'Bridal Metamorphosis',
    description: 'From fatigued complexion and stressed texture to dewy glass skin with soft sculpting and cascading voluminous Hollywood silk waves.',
    artist: 'Marcus Vance, Artistic Director',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
  }
];

export const horizontalGalleryData = [
  {
    id: 'look-1',
    title: 'Silk Cascades',
    category: 'Haute Coiffure',
    aspect: 'aspect-[3/4]',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=85',
    description: 'Volume sculpting with velvet thermal sealing'
  },
  {
    id: 'look-2',
    title: 'The Atelier Suite',
    category: 'Interior Sanctuary',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=85',
    description: 'Warm travertine stone, brass accents & private lighting'
  },
  {
    id: 'look-3',
    title: 'Golden Luminescence',
    category: 'Bridal Artistry',
    aspect: 'aspect-[4/5]',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=85',
    description: 'High-contrast editorial makeup with glass highlight'
  },
  {
    id: 'look-4',
    title: 'Botanical Alchemy',
    category: 'Product Ritual',
    aspect: 'aspect-square',
    image: 'https://images.unsplash.com/photo-1608248597359-0f04c7c82806?auto=format&fit=crop&w=800&q=85',
    description: 'Orchid stem cell extracts & cold-pressed oils'
  },
  {
    id: 'look-5',
    title: 'Couture Precision',
    category: 'Architectural Cut',
    aspect: 'aspect-[3/4]',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=85',
    description: 'Sharp silhouette with organic internal movement'
  },
  {
    id: 'look-6',
    title: 'Champagne Gloss',
    category: 'Color Master',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1100&q=85',
    description: 'Micro-foil babylights with iced pearl toner'
  }
];

export const instagramGalleryData: GalleryItem[] = [
  {
    id: 'ig-1',
    title: 'Morning light in the private styling suite',
    tag: '#LumiereAtelier',
    aspect: 'aspect-[3/4]',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85',
    likes: 1420
  },
  {
    id: 'ig-2',
    title: 'Curated 24K gold foil manicure detailing',
    tag: '#LumiereNailCouture',
    aspect: 'aspect-square',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=85',
    likes: 980
  },
  {
    id: 'ig-3',
    title: 'Vogue editorial backstage coiffure preview',
    tag: '#LumiereEditorial',
    aspect: 'aspect-[4/5]',
    image: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=800&q=85',
    likes: 2310
  },
  {
    id: 'ig-4',
    title: 'Bespoke hair nectar formulated fresh daily',
    tag: '#BotanicalAlchemy',
    aspect: 'aspect-square',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85',
    likes: 1120
  },
  {
    id: 'ig-5',
    title: 'Sculptural bridal updo crowned with pearls',
    tag: '#LumiereBridal',
    aspect: 'aspect-[3/4]',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=85',
    likes: 3450
  },
  {
    id: 'ig-6',
    title: 'The evening champagne ritual at closing',
    tag: '#LumiereMoments',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=85',
    likes: 1890
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: "Every visit feels less like an appointment and more like a ritual. LUMIÈRE transformed how I perceive beauty—it is serene, architectural, and completely transformative.",
    author: "Ananya Mehta",
    role: "Fashion Director & Vogue Contributor",
    rating: 5,
    location: "Mumbai & London"
  },
  {
    id: 'test-2',
    quote: "The bridal styling was nothing short of majestic. My hair and skin looked as luminous at midnight as they did when I walked down the aisle.",
    author: "Kavya Singhania",
    role: "Architect & Art Collector",
    rating: 5,
    location: "Mumbai"
  },
  {
    id: 'test-3',
    quote: "The bespoke balayage is pure wizardry. There is a weightlessness to the craft here that no other salon in Asia or Europe has matched.",
    author: "Zara Deshmukh",
    role: "Creative Director, Maison Noir",
    rating: 5,
    location: "Paris / Mumbai"
  }
];
