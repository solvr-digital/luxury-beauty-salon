export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  number: string;
  duration: string;
  price: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  issue: string;
  readTime: string;
  excerpt: string;
  image: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  artist: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'hair-styling',
    name: 'HAIR STYLING',
    category: 'Haute Coiffure',
    number: '01',
    duration: '90 MIN',
    price: '$220',
    tagline: 'Architectural silhouette & silk finish',
    description: 'Precision sculpture tailored to your bone structure. Includes botanical hair cleanse, deep scalp micro-stimulation, couture scissor sculpting, and bespoke blowout styling.',
    features: ['Facial bone-structure consultation', 'Custom Japanese botanical cleanse', 'Sculptural thermal styling'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hair-color',
    name: 'HAIR COLOR',
    category: 'Color Artistry',
    number: '02',
    duration: '180 MIN',
    price: '$380',
    tagline: 'Dimensional balayage & gloss melt',
    description: 'Hand-painted dimensional hues curated with light-reflective pigment molecules. Infused with organic peptide bond rebuilders for mirror-like refraction.',
    features: ['Multitonal pigment mapping', 'Organic bond-builder infusion', 'Gloss glaze & UV luminescence shield'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'bridal-beauty',
    name: 'BRIDAL BEAUTY',
    category: 'Atelier Bridal',
    number: '03',
    duration: '240 MIN',
    price: '$850',
    tagline: 'Timeless couture wedding elegance',
    description: 'A private suite bridal experience. Complete veil integration, hair architecture, luminous skin prep, and luxury makeup designed to photograph flawlessly under every light.',
    features: ['Private champagne sanctuary suite', 'Veil & jewelry harmonization', 'Touch-up couture kit with silk vanity pouch'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'makeup',
    name: 'MAKEUP',
    category: 'Editorial Glow',
    number: '04',
    duration: '75 MIN',
    price: '$190',
    tagline: 'Red-carpet complexion & sculpted gaze',
    description: 'High-fashion editorial complexion featuring micro-fine pigments, lymphatic drainage prep, featherweight silk lashes, and bespoke lip tone blending.',
    features: ['Cellular bio-hydrating skin base', 'Individual silk fiber lash layering', 'Airbrushed micro-radiance veil'],
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'skin-rituals',
    name: 'SKIN RITUALS',
    category: 'Cellular Aesthetics',
    number: '05',
    duration: '90 MIN',
    price: '$310',
    tagline: 'Bio-peptide infusion & 24K radiance',
    description: 'Non-invasive cellular resurfacing featuring cryo-lymphatic lifting, pure 24-karat gold leaf sheet infusion, and bio-fermented hyaluronic elixir.',
    features: ['Cryo-sculpting facial massage', '24K pure gold leaf infusion', 'Targeted micro-current cellular contour'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'nail-art',
    name: 'NAIL ART',
    category: 'Minimalist Architecture',
    number: '06',
    duration: '60 MIN',
    price: '$140',
    tagline: 'Japanese structured gel & fine chrome lines',
    description: 'Minimalist haute manicure focused on nail plate health, Russian cuticular refinement, Japanese structured gel, and delicate champagne metallic accents.',
    features: ['Precision Russian cuticle ritual', 'Non-toxic organic Japanese structured gel', 'Handcrafted hairline metallic artwork'],
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85',
  },
];

export const storyStepsData = [
  {
    step: '01',
    phase: 'DISCOVER',
    title: 'THE ART OF BEAUTY',
    subtitle: 'An intimate dialogue between your natural architecture and high-fashion aesthetics.',
    description: 'We believe true luxury is not manufactured; it is unveiled. Every consultation is an exploration of line, movement, and natural luminescence.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    step: '02',
    phase: 'CREATE',
    title: 'THE BESPOKE CRAFT',
    subtitle: 'Where master craftsmanship meets haute couture vision.',
    description: 'Layering micro-pigments, sculptural shears, and rare botanical elixirs to curate a silhouette uniquely, unmistakably yours.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    step: '03',
    phase: 'TRANSFORM',
    title: 'BEAUTY, ELEVATED',
    subtitle: 'The arrival of your most luminous, unapologetic self.',
    description: 'A transcendent cinematic state where confidence and artistry merge in absolute harmony.',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=85',
  },
];

export const signatureDetailsData = [
  {
    number: '01',
    title: 'Sculptural Hair Silhouette',
    desc: 'Weightless volumetric architecture calibrated precisely to neck angle and cheekbone height.',
  },
  {
    number: '02',
    title: 'Porcelain Dew Complexion',
    desc: 'Deep cellular hydration prep followed by micro-fine light-reflecting pigments.',
  },
  {
    number: '03',
    title: 'Couture Chroma Glaze',
    desc: 'Multidimensional gloss melt mimicking the natural shimmer of morning light.',
  },
  {
    number: '04',
    title: 'Artisanal Touchpoints',
    desc: 'Handcrafted metallic details, organic oils, and pure silk setting rituals.',
  },
];

export const journalArticlesData: JournalArticle[] = [
  {
    id: 'article-1',
    title: 'THE NEW GLOW',
    subtitle: 'The shift from heavy matte foundations toward breathable, glass-like bioluminescent skin.',
    category: 'COMPLEXION EDITORIAL',
    issue: 'ISSUE NO. 04',
    readTime: '4 MIN READ',
    excerpt: 'How rare botanical fermentations and lymphatic drainage are redefining modern radiance beyond cosmetic coverage.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'article-2',
    title: 'MODERN BRIDAL BEAUTY',
    subtitle: 'Effortless grace, architectural veils, and the renaissance of understated romanticism.',
    category: 'HAUTE BRIDAL',
    issue: 'ISSUE NO. 05',
    readTime: '6 MIN READ',
    excerpt: 'Contemporary brides are leaving behind heavy structured hair for fluid, kinetic silhouettes that move with breath and wind.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'article-3',
    title: 'THE ART OF HAIR',
    subtitle: 'Sculpture, geometry, and the subtle mathematics of French shear techniques.',
    category: 'COIFFURE ARCHITECTURE',
    issue: 'ISSUE NO. 06',
    readTime: '5 MIN READ',
    excerpt: 'An inside exploration into how ÉLANE master stylists tailor line, angle, and volume to elevate natural facial symmetry.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'article-4',
    title: 'SKIN, SIMPLIFIED',
    subtitle: 'Stripping back 12-step routines in favor of potent, bio-available botanical essences.',
    category: 'CELLULAR AESTHETICS',
    issue: 'ISSUE NO. 07',
    readTime: '3 MIN READ',
    excerpt: 'Why cellular barrier restoration and cold-pressed botanical absolutes outperform synthetic cosmetic layers.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
  },
];

export const beforeAfterCasesData: BeforeAfterItem[] = [
  {
    id: 'case-1',
    title: 'Dimensional Pearl Balayage & Glaze',
    category: 'Color Transformation',
    artist: 'Master Stylist Élodie Laurent',
    description: 'Correction of dull, brassy undertones into luminous cool champagne ribbons with seamless shadow roots and mirror gloss melt.',
    beforeImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=85',
    afterImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'case-2',
    title: 'Couture Bridal Metamorphosis',
    category: 'Bridal Atelier',
    artist: 'Artistic Director Antoine Moreau',
    description: 'Transforming fine textures into a sculptural bridal updo with hand-laid botanical pearls and radiant dewy complexion.',
    beforeImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85',
    afterImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'case-3',
    title: 'Bio-Luminous Cellular Skin Restoration',
    category: 'Skin Ritual',
    artist: 'Aesthetician Vivienne Chen',
    description: 'Deep dermal lymphatic sculpting with 24K gold peptide infusion, smoothing fine lines and restoring natural dewiness.',
    beforeImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
    afterImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
  },
];
