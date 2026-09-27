export interface HeroSlide {
  id: string;
  category: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  titleLine4: string;
  subtitle: string;
  modelImage: string;
  accentColor: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
}

export interface LuxuryProduct {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  price: string;
  volume: string;
  colorHex: string;
  goldAccent: string;
  notes: string[];
  keyIngredients: string[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  artist: string;
  beforeImage: string;
  afterImage: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  location: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  aspect: string;
  image: string;
  likes: number;
}
