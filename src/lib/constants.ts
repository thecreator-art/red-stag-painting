import type { Service, City, Project, FAQItem, PricingOption, ComparisonRow } from '@/types';

// Tiny 10x6 neutral placeholder for blur-up loading on external images
export const BLUR_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImWP4z8DwHwMDA8N/BgYGBob/DAz/GRj+MzD8Z2D4z8Dwn4HhPwMDAwMDIwMAd3YJBkLshiMAAAAASUVORK5CYII=';

function normalizeUrl(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  if (!trimmed) return fallback;
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

export const PHONE_NUMBER = '(323) 555-0199';
export const PHONE_HREF = 'tel:+13235550199';
export const EMAIL = 'info@redstagpainting.com';
export const SITE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL,
  'https://red-stag-painting.vercel.app'
);
export const GHL_WEBHOOK_URL = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL?.trim() ?? '';
export const HAS_GHL_WEBHOOK = Boolean(
  GHL_WEBHOOK_URL && !GHL_WEBHOOK_URL.includes('placeholder-webhook.example.com')
);
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? '';

export const SERVICES: Service[] = [
  { name: 'Interior Painting', slug: 'interior-painting' },
  { name: 'Exterior Painting', slug: 'exterior-painting' },
  { name: 'Cabinet Painting', slug: 'cabinet-painting' },
  { name: 'Drywall Repair & Paint', slug: 'drywall-repair-paint' },
  { name: 'Popcorn Ceiling Removal', slug: 'popcorn-ceiling-removal' },
  { name: 'Stucco Painting', slug: 'stucco-painting' },
  { name: 'Trim & Baseboard Painting', slug: 'trim-baseboard-painting' },
  { name: 'Color Change Repaint', slug: 'color-change-repaint' },
  { name: 'Rental Turnover Painting', slug: 'rental-turnover-painting' },
  { name: 'Wallpaper Removal', slug: 'wallpaper-removal' },
  { name: 'Ceiling Painting', slug: 'ceiling-painting' },
  { name: 'Garage Painting', slug: 'garage-painting' },
  { name: 'Wood & Deck Staining', slug: 'wood-deck-staining' },
];

export const CITIES: City[] = [
  { name: 'Beverly Hills', slug: 'beverly-hills' },
  { name: 'Bel Air', slug: 'bel-air' },
  { name: 'Hidden Hills', slug: 'hidden-hills' },
  { name: 'Pacific Palisades', slug: 'pacific-palisades' },
  { name: 'Malibu', slug: 'malibu' },
  { name: 'Brentwood', slug: 'brentwood' },
  { name: 'Manhattan Beach', slug: 'manhattan-beach' },
  { name: 'Santa Monica', slug: 'santa-monica' },
  { name: 'West Hollywood', slug: 'west-hollywood' },
  { name: 'Silver Lake', slug: 'silver-lake' },
  { name: 'Studio City', slug: 'studio-city' },
  { name: 'Sherman Oaks', slug: 'sherman-oaks' },
  { name: 'Encino', slug: 'encino' },
  { name: 'Calabasas', slug: 'calabasas' },
  { name: 'Tarzana', slug: 'tarzana' },
  { name: 'Woodland Hills', slug: 'woodland-hills' },
  { name: 'Burbank', slug: 'burbank' },
  { name: 'Granada Hills', slug: 'granada-hills' },
  { name: 'Northridge', slug: 'northridge' },
  { name: 'San Fernando', slug: 'san-fernando' },
  { name: 'Pasadena', slug: 'pasadena' },
  { name: 'Glendale', slug: 'glendale' },
  { name: 'Toluca Lake', slug: 'toluca-lake' },
  { name: 'Culver City', slug: 'culver-city' },
  { name: 'Los Feliz', slug: 'los-feliz' },
  { name: 'Eagle Rock', slug: 'eagle-rock' },
  { name: 'Mar Vista', slug: 'mar-vista' },
  { name: 'Highland Park', slug: 'highland-park' },
  { name: 'La Canada Flintridge', slug: 'la-canada-flintridge' },
  { name: 'Altadena', slug: 'altadena' },
];

export const HERO_SERVICE_OPTIONS = [
  'Interior Painting',
  'Exterior Painting',
  'Cabinet Painting',
  'Popcorn Ceiling Removal',
  'Other',
];

export const FULL_SERVICE_OPTIONS = [
  'Interior Painting',
  'Exterior Painting',
  'Cabinet Painting',
  'Popcorn Ceiling Removal',
  'Stucco Painting',
  'Drywall Repair & Paint',
  'Trim & Baseboard',
  'Color Change Repaint',
  'Rental Turnover',
  'Wallpaper Removal',
  'Ceiling Painting',
  'Garage Painting',
  'Wood & Deck Staining',
  'Other',
];

export const PRICING: Record<string, PricingOption[]> = {
  interior: [
    { label: '1 room', min: 400, max: 900 },
    { label: '2 rooms', min: 800, max: 1800 },
    { label: '3 rooms', min: 1200, max: 2700 },
    { label: '4 rooms', min: 1600, max: 3600 },
    { label: 'Whole house', min: 2500, max: 6500, plus: true },
  ],
  exterior: [
    { label: 'Under 1500 sqft', min: 2500, max: 5000 },
    { label: '1500-2500 sqft', min: 4000, max: 8000 },
    { label: '2500-4000 sqft', min: 6000, max: 12000 },
    { label: '4000+ sqft', min: 10000, max: 18000, plus: true },
  ],
  cabinet: [
    { label: 'Small kitchen', min: 2500, max: 4500 },
    { label: 'Medium kitchen', min: 4000, max: 7000 },
    { label: 'Large kitchen', min: 6500, max: 10000, plus: true },
  ],
  popcorn: [
    { label: '1-2 rooms', min: 600, max: 1400 },
    { label: '3-4 rooms', min: 1200, max: 2800 },
    { label: '5+ rooms', min: 2000, max: 4500, plus: true },
  ],
  stucco: [
    { label: 'Small home', min: 4000, max: 7000 },
    { label: 'Typical home', min: 6000, max: 10000 },
    { label: 'Large home', min: 9000, max: 15000, plus: true },
  ],
  ceiling: [
    { label: '1-2 rooms', min: 200, max: 600 },
    { label: '3-4 rooms', min: 500, max: 1200 },
    { label: '5+ rooms', min: 1000, max: 2500, plus: true },
  ],
  garage: [
    { label: 'Floor coating only', min: 800, max: 2000 },
    { label: 'Walls & ceiling', min: 1500, max: 3500 },
    { label: 'Full garage', min: 2000, max: 4500, plus: true },
  ],
  wooddeck: [
    { label: 'Fence staining', min: 800, max: 2500 },
    { label: 'Average deck', min: 1500, max: 4500 },
    { label: 'Large deck + fence', min: 3000, max: 6500, plus: true },
  ],
};

export const CALCULATOR_SERVICES = [
  { key: 'interior', label: 'Interior Painting', sizeLabel: 'How many rooms?' },
  { key: 'exterior', label: 'Exterior Painting', sizeLabel: 'Home size?' },
  { key: 'cabinet', label: 'Cabinet Painting', sizeLabel: 'Kitchen size?' },
  { key: 'popcorn', label: 'Popcorn Ceiling Removal', sizeLabel: 'How many rooms?' },
  { key: 'stucco', label: 'Stucco Painting', sizeLabel: 'Home size?' },
  { key: 'ceiling', label: 'Ceiling Painting', sizeLabel: 'How many rooms?' },
  { key: 'garage', label: 'Garage Painting', sizeLabel: 'What do you need?' },
  { key: 'wooddeck', label: 'Wood & Deck Staining', sizeLabel: 'Project size?' },
] as const;

export const PROJECTS: Project[] = [
  {
    afterImage: '/images/proj_1_after.png',
    beforeImage: '/images/proj_1_before.png',
    serviceType: 'Interior Repaint',
    city: 'Encino',
    description: '4-day full repaint. Sherwin-Williams Emerald. Zero touch-ups.',
    review: {
      text: 'They made our 1990s oak cabinets look brand new. Worth every penny.',
      author: 'Sarah M.',
      city: 'Beverly Hills',
    },
  },
  {
    afterImage: '/images/proj_2_after.png',
    beforeImage: '/images/proj_2_before.png',
    serviceType: 'Exterior Painting',
    city: 'Pacific Palisades',
    description: 'Full exterior. Benjamin Moore Aura. Done in 5 days flat.',
  },
  {
    afterImage: '/images/proj_3_after.png',
    beforeImage: '/images/proj_3_before.png',
    serviceType: 'Cabinet Refinishing',
    city: 'Sherman Oaks',
    description: '32 cabinet doors. Sprayed finish. Smooth as factory.',
    review: {
      text: 'Our kitchen looks like we spent $40k on new cabinets. We spent a fraction of that.',
      author: 'Mike R.',
      city: 'Sherman Oaks',
    },
  },
  {
    afterImage: '/images/proj_4_after.png',
    beforeImage: '/images/proj_4_before.png',
    serviceType: 'Interior Repaint',
    city: 'Brentwood',
    description: '3 bedrooms, hallway, and ceiling. 3 days start to finish.',
  },
  {
    afterImage: '/images/proj_5_after.png',
    beforeImage: '/images/proj_5_before.png',
    serviceType: 'Exterior Painting',
    city: 'Calabasas',
    description: '4,200 sqft home. Stucco repair and full repaint. 7 days.',
    review: {
      text: 'The crew was quiet, fast, and cleaned up every single day. Neighbors asked for their number.',
      author: 'Lisa T.',
      city: 'Calabasas',
    },
  },
  {
    afterImage: '/images/proj_6_after.png',
    beforeImage: '/images/proj_6_before.png',
    serviceType: 'Popcorn Ceiling Removal',
    city: 'Studio City',
    description: 'Popcorn removed, skim-coated, and painted. 5 rooms in 2 days.',
  },
];

export const RESPONSE_TIME = 'We respond within 2 hours';
export const BOOKING_MESSAGE = 'Currently booking for late April & May';
export const CTA_PRIMARY = 'Get Your Price in 24 Hours';
export const CTA_MOBILE = 'Get My Price';

export const PRICE_ANCHORS: Record<string, string> = {
  interior: 'vs. $15,000+ for a full renovation',
  exterior: 'vs. $50,000+ to re-side your home',
  cabinet: 'vs. $25,000–$40,000 for new cabinets',
  popcorn: 'vs. $8,000+ for new ceiling installation',
  stucco: 'vs. $30,000+ to re-stucco your home',
  ceiling: 'vs. $5,000+ for new ceiling installation',
  garage: 'vs. $10,000+ for a full garage remodel',
  wooddeck: 'vs. $15,000+ for new deck construction',
};

export const COMPARISON_DATA: ComparisonRow[] = [
  { feature: 'Paint quality', otherPainters: 'Builder-grade paint', redStag: 'Sherwin-Williams & Benjamin Moore only' },
  { feature: 'Crew', otherPainters: 'Day laborers, rotating crews', redStag: 'Full-time crew, 5+ years with us' },
  { feature: 'Timeline', otherPainters: '"We\'ll get to it when we can"', redStag: 'Exact start & end dates — guaranteed' },
  { feature: 'Job site cleanup', otherPainters: 'Rarely done daily', redStag: 'Cleaned every single day' },
  { feature: 'Warranty', otherPainters: 'None or 90 days', redStag: '2-year warranty, no questions asked' },
  { feature: 'Quote process', otherPainters: 'Vague phone estimate', redStag: 'Free in-person walkthrough, detailed quote in 24hrs' },
  { feature: 'Communication', otherPainters: 'Hard to reach after hiring', redStag: 'Respond within 2 hours — always' },
  { feature: 'Licensed & insured', otherPainters: 'Sometimes', redStag: 'Always — fully licensed & insured' },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'How much does it cost to paint a house interior in Los Angeles?',
    answer: 'Most interior repaints run $2 to $4 per square foot, or roughly $400 to $900 per room. A whole house interior typically runs $2,500 to $6,500 depending on prep work, ceiling height, and paint quality. We use Sherwin-Williams and Benjamin Moore exclusively. We\'ll give you an exact number after a free walkthrough.',
  },
  {
    question: 'How long does an interior paint job take?',
    answer: 'A typical 3-bedroom interior takes 2-4 days. We give you the exact start and end dates before we begin, and we stick to them. Exteriors run 3-7 days depending on the size of the home and weather.',
  },
  {
    question: 'Do I need to move my furniture?',
    answer: 'No. We move everything away from the walls, cover your floors and furniture with drop cloths, and put it all back when we\'re done. You don\'t need to lift a finger.',
  },
  {
    question: 'What kind of paint do you use?',
    answer: 'Sherwin-Williams and Benjamin Moore. We don\'t carry budget paint on our trucks. If you have a brand preference or a specific color picked out, we\'re happy to work with it.',
  },
  {
    question: 'Do you guarantee your work?',
    answer: 'Yes. If the paint peels, bubbles, or doesn\'t look right within 2 years, we come back and fix it at no charge. We also do a final walkthrough with you before we consider the job done.',
  },
];
