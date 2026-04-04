/**
 * EXAMPLE SERVICE DATA FILE — Interior Painting
 * Codex: Produce one file like this per service slug.
 * File name must match the slug: interior-painting.ts
 */
import type { ServicePageData } from '@/data/types';

const data: ServicePageData = {
  slug: 'interior-painting',
  name: 'Interior Painting',

  // SEO
  titleTag: 'Interior Painting Los Angeles | Red Stag Painting',
  metaDescription: 'Professional interior painting in Los Angeles. $400-$900 per room, $2,500-$6,500 whole house. Sherwin-Williams & Benjamin Moore. Free estimate — call today.',
  h1: 'Interior House Painting in Los Angeles',
  primaryKeyword: 'interior painting Los Angeles',
  secondaryKeywords: [
    'house painter Los Angeles',
    'interior painter near me',
    'room painting cost LA',
    'best interior painters Los Angeles',
  ],
  canonical: '/interior-painting',
  ogTitle: 'Interior Painting Los Angeles | Red Stag Painting',
  ogDescription: 'Professional interior painting across Greater LA. Premium paint, clean crews, 2-year warranty. Get your free estimate.',

  // Hero
  heroImage: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=1800&q=80',
  heroImageAlt: 'Freshly painted bright white living room interior in Los Angeles home',
  heroSubtitle: 'Walls, ceilings, and trim — done in days, not weeks. Sherwin-Williams and Benjamin Moore exclusively.',

  // Body content — answer-first, 2,000+ words
  introAnswer: 'Interior painting in Los Angeles typically costs $2 to $4 per square foot, or $400 to $900 per room. A full house interior runs $2,500 to $6,500 depending on room count, ceiling height, and prep work. Red Stag Painting uses Sherwin-Williams and Benjamin Moore exclusively and backs every project with a 2-year warranty.',

  sections: [
    {
      heading: 'What Does Interior Painting Cost in Los Angeles?',
      level: 'h2',
      body: '<p>Most LA homeowners pay between <strong>$2 and $4 per square foot</strong> for interior painting. That breaks down to roughly <strong>$400 to $900 per room</strong> for a standard bedroom or living room, including walls and ceiling.</p><p>A full house interior — 3 to 5 bedrooms, hallways, and common areas — typically runs <strong>$2,500 to $6,500</strong>. The final number depends on ceiling height (vaulted ceilings cost 20-30% more), the amount of prep work (patching, sanding, priming), and whether you\'re doing a simple refresh or a full color change.</p><p>Color changes cost more than same-color repaints because they require additional coats. Going from dark to light (or light to dark) adds roughly <strong>$1 to $2 per square foot</strong> to the total.</p>',
    },
    {
      heading: 'What\'s Included in Our Interior Painting Service',
      level: 'h2',
      body: '<p>Every Red Stag interior paint job includes furniture moving, floor protection with drop cloths, surface prep (patching small holes, sanding, caulking gaps), priming where needed, two coats of premium paint, and daily cleanup. We put everything back where we found it when we\'re done.</p><p>We don\'t cut corners on prep. Bad prep is the #1 reason paint jobs fail within a year. We fill every nail hole, sand every patch, and prime every repaired surface before paint touches it.</p>',
    },
    {
      heading: 'Paint Brands We Use',
      level: 'h2',
      body: '<p>We use <strong>Sherwin-Williams</strong> and <strong>Benjamin Moore</strong> exclusively. No builder-grade paint. No big-box store bargain brands. These two manufacturers make the best residential paint on the market — better coverage, better durability, better color accuracy.</p><p>Our most popular interior lines:</p><ul><li><strong>Sherwin-Williams Emerald</strong> — washable, zero-VOC, excellent hide. Our go-to for living rooms and bedrooms.</li><li><strong>Benjamin Moore Regal Select</strong> — smooth finish, exceptional color depth. Popular for dining rooms and feature walls.</li><li><strong>Sherwin-Williams SuperPaint</strong> — great mid-range option. Durable, good coverage, lower price point.</li></ul><p>If you have a specific brand or color preference, we\'re happy to work with it. Most clients come to us with a Benjamin Moore or Sherwin-Williams color already picked out.</p>',
    },
    {
      heading: 'How Long Does Interior Painting Take?',
      level: 'h2',
      body: '<p>A single room takes <strong>1 day</strong>. A typical 3-bedroom interior takes <strong>2 to 4 days</strong>. A full house (5+ rooms, hallways, ceilings) takes <strong>4 to 7 days</strong>.</p><p>We give you exact start and end dates before we begin, and we stick to them. No "we\'ll get to it when we can." No dragging a 3-day job into 2 weeks.</p><p>Our crews work 7am to 5pm Monday through Saturday. We clean up every single day — you can use your home normally each evening.</p>',
    },
    {
      heading: 'Our Interior Painting Process',
      level: 'h2',
      body: '<p><strong>Step 1: Free walkthrough.</strong> We come to your home, measure every room, discuss colors and finishes, and note any prep work needed. You get a detailed written quote within 24 hours.</p><p><strong>Step 2: Prep day.</strong> We move furniture to the center of each room, lay drop cloths on every floor, tape off trim and fixtures, patch holes, sand surfaces, and prime repairs.</p><p><strong>Step 3: Paint.</strong> Two full coats on every surface. We cut in by hand (no tape lines on walls) and roll for a smooth, even finish. Ceilings get painted first, then walls, then trim.</p><p><strong>Step 4: Final walkthrough.</strong> We walk every room with you. If anything doesn\'t look right, we fix it on the spot. Then we move your furniture back, pull up all drop cloths, and clean the floors.</p>',
    },
    {
      heading: 'Choosing Interior Paint Colors',
      level: 'h2',
      body: '<p>LA\'s most popular interior paint colors right now are warm neutrals. <strong>Swiss Coffee</strong> (Benjamin Moore OC-45), <strong>Agreeable Gray</strong> (Sherwin-Williams SW 7029), and <strong>White Dove</strong> (Benjamin Moore OC-17) are the three colors we paint most often.</p><p>For accent walls and feature rooms, <strong>Hale Navy</strong> (Benjamin Moore HC-154) and <strong>Iron Ore</strong> (Sherwin-Williams SW 7069) have been trending hard across Beverly Hills, Brentwood, and Santa Monica.</p><p>Not sure what color to choose? Use our <a href="/#visualize">color visualizer</a> to preview how different colors look on your walls, or we can bring physical swatches to your walkthrough.</p>',
    },
    {
      heading: 'Interior Painting for Different Room Types',
      level: 'h2',
      body: '<p><strong>Bedrooms:</strong> Eggshell or matte finish. Low sheen hides imperfections and creates a restful feel. $400-$800 per room.</p><p><strong>Living rooms:</strong> Eggshell finish. Durable enough for daily life, soft enough to look elegant. $500-$900 per room depending on size.</p><p><strong>Kitchens and bathrooms:</strong> Satin or semi-gloss finish. The higher sheen resists moisture and is easier to wipe clean. $400-$700 per room.</p><p><strong>Hallways and high-traffic areas:</strong> Satin finish. Takes a beating without showing scuffs. Usually priced per linear foot rather than per room.</p><p><strong>Ceilings:</strong> Flat/matte finish in bright white. Hides imperfections and reflects light evenly. $200-$600 per room.</p>',
    },
    {
      heading: 'Why LA Homeowners Choose Red Stag',
      level: 'h2',
      body: '<p>We\'ve painted over <strong>500 homes</strong> across Greater Los Angeles since 2011. Our crews have been with us for <strong>5+ years</strong> — no day laborers, no rotating strangers in your home.</p><p>Every project comes with a <strong>2-year warranty</strong>. If the paint peels, bubbles, cracks, or doesn\'t look right within 2 years, we come back and fix it at no charge.</p><p>We respond to every call and message within <strong>2 hours</strong>. Not 2 days. Not "we\'ll get back to you." Two hours.</p>',
    },
  ],

  // Pricing
  pricePerSqFt: '$2-$4',
  pricingTiers: [
    { label: '1 room', min: 400, max: 900 },
    { label: '2 rooms', min: 800, max: 1800 },
    { label: '3 rooms', min: 1200, max: 2700 },
    { label: '4 rooms', min: 1600, max: 3600 },
    { label: 'Whole house', min: 2500, max: 6500, plus: true },
  ],
  priceAnchor: 'vs. $15,000+ for a full interior renovation',

  // FAQ
  faqs: [
    {
      question: 'How much does it cost to paint the interior of a house in Los Angeles?',
      answer: 'Most interior repaints in LA run $2 to $4 per square foot. A single room costs $400 to $900. A full house interior (3-5 bedrooms, hallways, common areas) typically runs $2,500 to $6,500. The final price depends on ceiling height, prep work needed, and whether you\'re changing colors or doing a same-color refresh.',
    },
    {
      question: 'How long does it take to paint the inside of a house?',
      answer: 'A single room takes about 1 day. A typical 3-bedroom home takes 2 to 4 days. A full house with 5+ rooms takes 4 to 7 days. We give you exact start and end dates before work begins and stick to them.',
    },
    {
      question: 'Do I need to move my furniture before the painters come?',
      answer: 'No. We move all furniture away from the walls, cover your floors and everything else with drop cloths, and put it all back when we\'re done. You don\'t need to lift a finger.',
    },
    {
      question: 'What\'s the best interior paint for Los Angeles homes?',
      answer: 'We recommend Sherwin-Williams Emerald or Benjamin Moore Regal Select for most LA homes. Both are low-VOC, highly durable, and offer excellent color accuracy. For kitchens and bathrooms, a satin or semi-gloss finish resists moisture. For bedrooms and living rooms, eggshell provides a soft, washable finish.',
    },
    {
      question: 'Is it worth hiring a professional painter or should I DIY?',
      answer: 'A professional crew will finish a 3-bedroom home in 2-4 days with clean lines, proper prep, and premium paint. DIY typically takes 2-3 weekends, and without proper prep, the paint often peels or looks uneven within a year. Professional painting also comes with a warranty — ours is 2 years.',
    },
  ],

  // Internal linking
  relatedServices: ['exterior-painting', 'cabinet-painting', 'ceiling-painting', 'trim-baseboard-painting', 'color-change-repaint'],
  featuredCities: ['beverly-hills', 'santa-monica', 'brentwood', 'sherman-oaks', 'pacific-palisades', 'studio-city', 'pasadena', 'calabasas'],

  // Schema
  schemaServiceType: 'HousePainting',
};

export default data;
