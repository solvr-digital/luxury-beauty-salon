import type { LuxuryProduct } from '../types';

export const productsData: LuxuryProduct[] = [
  {
    id: 'serum',
    name: 'Aura Botanique Cell Serum',
    subtitle: 'Luminous Cellular Concentrate',
    category: 'Haute Skincare',
    description: 'A transformative elixir crafted with cold-pressed orchid stem cells, 5-weight hyaluronic acid, and 24-karat colloidal gold flakes that awaken skin with deep candlelit luminescence.',
    price: '$210',
    volume: '50ml / 1.7 fl.oz',
    colorHex: '#C5A059',
    goldAccent: '#F3E5AB',
    notes: ['Orchid Stem Cells', 'Colloidal Gold', 'Marine Peptides'],
    keyIngredients: ['Pure 24K Gold', 'French Alpine Edelweiss', 'Bio-Fermented Squalane']
  },
  {
    id: 'perfume',
    name: 'Nectar de Rose Extrait',
    subtitle: 'Bespoke Haute Parfumerie',
    category: 'Fragrance',
    description: 'Distilled at dawn in Grasse, France. Centifolia rose petals entwined with smoky Moroccan oud, white amber, and velvety bourbon vanilla. Lingers as an intimate, magnetic second skin.',
    price: '$340',
    volume: '100ml / 3.4 fl.oz',
    colorHex: '#9E2A2B',
    goldAccent: '#D4AF37',
    notes: ['Grasse Rose Centifolia', 'Aged Cambodian Oud', 'Velvet Amber'],
    keyIngredients: ['Natural Absolute Distillates', 'Wild Harvested Myrrh', 'Golden Sandalwood']
  },
  {
    id: 'hair-oil',
    name: "L’Élixir Nourrissant",
    subtitle: 'Sublime Botanical Hair Nectar',
    category: 'Hair Alchemy',
    description: 'A weightless blend of rare Camellia Japonica, Marula seed, and Kalahari melon oils. Instantly restores mirror-like gloss, tames flyaways, and shields hair up to 450°F heat.',
    price: '$165',
    volume: '75ml / 2.5 fl.oz',
    colorHex: '#E5C378',
    goldAccent: '#FAF8F5',
    notes: ['Japanese Camellia', 'Cold-Pressed Marula', 'Golden Jojoba'],
    keyIngredients: ['Thermal Silk Lipids', 'Vitamin E Isomers', 'Damask Rose Essence']
  },
  {
    id: 'moisturizer',
    name: 'Crème Sublime Régénérante',
    subtitle: 'Deep Velvet Barrier Soufflé',
    category: 'Haute Skincare',
    description: 'Formulated in Geneva, this ultra-rich velvet balm melts on contact. Packed with bio-mimetic ceramides, black truffle extract, and encapsulated retinol to contour and plump skin overnight.',
    price: '$260',
    volume: '60ml / 2.0 fl.oz',
    colorHex: '#F4EFE6',
    goldAccent: '#C5A059',
    notes: ['Black Truffle Extract', 'Lipid Ceramides', 'White Peony Root'],
    keyIngredients: ['Bio-Identical Squalane', 'Encapsulated Retinaldehyde', 'Alpine Spring Water']
  }
];
