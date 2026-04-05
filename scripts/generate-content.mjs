import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const constantsPath = path.join(repoRoot, 'src/lib/constants.ts');
const servicesDir = path.join(repoRoot, 'src/data/services');
const citiesDir = path.join(repoRoot, 'src/data/cities');
const matrixDir = path.join(repoRoot, 'src/data/matrix');
const blogDir = path.join(repoRoot, 'src/data/blog');

const HERO_IMAGES = {
  interior: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=1800&q=80',
  exterior: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=80',
  cabinet: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1800&q=80',
  drywall: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80',
  popcorn: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80',
  stucco: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80',
  trim: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80',
  rental: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80',
  wallpaper: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80',
  ceiling: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80',
  garage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80',
  wooddeck: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80',
  cityLuxury: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80',
  cityCoastal: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
  cityValley: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
  cityHistoric: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80',
  cityUrban: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80',
  cityFoothill: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1800&q=80',
};

const SERVICE_DETAILS = {
  'interior-painting': {
    heroImage: HERO_IMAGES.interior,
    heroImageAlt: 'Freshly painted living room with clean white walls in a Los Angeles home',
    heroSubtitle: 'Walls, ceilings, trim, and patching handled in the right order so the finish stays sharp after furniture moves back in.',
    pricingKey: 'interior',
    pricePerSqFt: '$2-$4',
    priceAnchorKey: 'interior',
    schemaServiceType: 'HousePainting',
    relatedServices: ['color-change-repaint', 'ceiling-painting', 'trim-baseboard-painting', 'drywall-repair-paint', 'cabinet-painting'],
    featuredCities: ['beverly-hills', 'brentwood', 'santa-monica', 'studio-city', 'pasadena', 'calabasas'],
    surfaces: ['walls', 'ceilings', 'baseboards', 'door casings', 'closets', 'hallways'],
    problems: ['patch scars telegraphing through flat paint', 'roller lap marks in long hallways', 'caulk gaps opening at baseboards', 'old touch-ups flashing through new color'],
    prep: ['move furniture to center and protect floors', 'patch holes and skim damaged drywall', 'sand patches and glossy existing paint', 'prime repairs before finish coats'],
    finishNotes: ['matte and eggshell for main walls', 'satin in hallways, baths, and kitchens', 'flat bright white on ceilings', 'semi-gloss on baseboards and doors'],
    localExamples: ['Spanish interiors in Pasadena with curved plaster corners', 'large open-plan great rooms in Calabasas', 'condo repaints in Santa Monica with strict elevator windows'],
    valueNote: 'Fresh interior paint resets the whole house faster than any other finish trade. If the layout already works, painting usually buys the cleanest visual upgrade for the least disruption.',
    timeline: 'A single room usually takes 1 day. A typical 3-bedroom interior lands at 2 to 4 days. Large homes with tall entries, heavy patching, or a full trim package take longer.',
  },
  'exterior-painting': {
    heroImage: HERO_IMAGES.exterior,
    heroImageAlt: 'Freshly painted Los Angeles house exterior with crisp trim and smooth stucco walls',
    heroSubtitle: 'Stucco, siding, trim, fascia, eaves, and doors painted as one system so the job wears evenly under LA sun.',
    pricingKey: 'exterior',
    pricePerSqFt: '',
    priceAnchorKey: 'exterior',
    schemaServiceType: 'HousePainting',
    relatedServices: ['stucco-painting', 'wood-deck-staining', 'garage-painting', 'color-change-repaint'],
    featuredCities: ['pacific-palisades', 'malibu', 'brentwood', 'pasadena', 'woodland-hills', 'manhattan-beach'],
    surfaces: ['stucco walls', 'wood trim', 'fascia boards', 'eaves', 'garage doors', 'entry doors'],
    problems: ['sun-baked south walls fading before the north side', 'failed caulk at window perimeters', 'chalky stucco that sheds under the roller', 'peeling fascia and exposed nail heads'],
    prep: ['pressure wash or soft wash depending on substrate', 'scrape loose paint and feather sand edges', 'patch stucco cracks and damaged trim', 'prime raw wood, bare stucco, and repaired areas'],
    finishNotes: ['low-luster acrylics for most walls', 'higher sheen on doors and wrought iron', 'UV-stable colors on south and west exposures', 'deep body colors only after checking extra-coat coverage'],
    localExamples: ['sunny canyon homes in Brentwood', 'salt-air exteriors near the beach in Malibu', 'post-war tract homes in Burbank with aging eaves'],
    valueNote: 'A clean exterior paint system keeps water out, hides patchwork, and lets you postpone much bigger siding or trim replacement bills.',
    timeline: 'Most exteriors run 3 to 7 working days once washing, prep, priming, and finish coats are stacked the right way.',
  },
  'cabinet-painting': {
    heroImage: HERO_IMAGES.cabinet,
    heroImageAlt: 'Sprayed kitchen cabinet doors drying to a smooth painted finish',
    heroSubtitle: 'Doors and drawers come off, hardware gets cataloged, and the finish is sprayed to lay down smooth instead of brush-marked.',
    pricingKey: 'cabinet',
    pricePerSqFt: '',
    priceAnchorKey: 'cabinet',
    schemaServiceType: 'HousePainting',
    relatedServices: ['interior-painting', 'trim-baseboard-painting', 'drywall-repair-paint', 'color-change-repaint'],
    featuredCities: ['beverly-hills', 'bel-air', 'brentwood', 'studio-city', 'sherman-oaks', 'burbank'],
    surfaces: ['cabinet doors', 'drawer fronts', 'face frames', 'end panels', 'island panels', 'built-in hutches'],
    problems: ['oak grain showing through cheap paint jobs', 'hinge ghosting around old hardware locations', 'grease contamination around pulls and stove walls', 'sticky doors from under-cured enamel'],
    prep: ['remove and label every door and drawer', 'degrease cooking residue and hand oils', 'sand or degloss the factory coating', 'prime with adhesion primer before enamel topcoats'],
    finishNotes: ['sprayed enamel on doors and drawers', 'fine-roll or spray finish on frames based on site conditions', 'grain fill when clients want a smoother profile', 'longer cure planning before daily kitchen abuse starts'],
    localExamples: ['estate kitchens in Beverly Hills', '1990s builder oak in Sherman Oaks', 'compact galley kitchens in West Hollywood condos'],
    valueNote: 'Cabinet painting works when the layout is still functional and the boxes are solid. You keep the stone, plumbing, and electrical where they are and spend on the finish people actually see.',
    timeline: 'Most cabinet projects run 4 to 7 days including masking, removal, prep, spray time, cure windows, and reinstall.',
  },
  'drywall-repair-paint': {
    heroImage: HERO_IMAGES.drywall,
    heroImageAlt: 'Drywall repair patch sanded smooth before priming and painting',
    heroSubtitle: 'We do the patching and the painting in one scope so repaired walls do not flash or crater under the finish coat.',
    pricingKey: 'interior',
    pricePerSqFt: '$2-$4',
    priceAnchorKey: 'interior',
    schemaServiceType: 'HousePainting',
    relatedServices: ['interior-painting', 'wallpaper-removal', 'ceiling-painting', 'rental-turnover-painting'],
    featuredCities: ['studio-city', 'pasadena', 'altadena', 'sherman-oaks', 'culver-city', 'burbank'],
    surfaces: ['small nail pops', 'water-damaged sections', 'cut-in utility patches', 'corner bead repairs', 'ceiling seams', 'texture-matched walls'],
    problems: ['old leaks leaving yellowed rings', 'stress cracks over doors and windows', 'bad handyman patches with raised tape edges', 'texture mismatches standing out in side light'],
    prep: ['cut out loose material and secure the field', 'tape, mud, and sand in the right sequence', 'feather wide enough that the repair disappears', 'prime every repair before finish paint'],
    finishNotes: ['skim coats where texture has to flatten out', 'stain blocker where old leaks bled through', 'ceiling touch-up only after the texture dries hard', 'full-wall paint when spot repairs would flash'],
    localExamples: ['older plaster-over-drywall transitions in Los Feliz', 'post-remodel punch lists in Santa Monica', 'move-out wall damage in rental units across the Valley'],
    valueNote: 'Doing drywall repair and paint as one scope prevents the classic problem where a wall patch looks fine at noon and obvious at sunset.',
    timeline: 'Minor repairs can be turned in a day. Multi-room patching with drying cycles usually takes 2 to 4 days before the finish looks consistent.',
  },
  'popcorn-ceiling-removal': {
    heroImage: HERO_IMAGES.popcorn,
    heroImageAlt: 'Smooth ceiling after popcorn texture removal and fresh paint',
    heroSubtitle: 'Ceilings get tested, protected, scraped, skimmed, sanded, primed, and painted so the room looks new instead of half-finished.',
    pricingKey: 'popcorn',
    pricePerSqFt: '',
    priceAnchorKey: 'popcorn',
    schemaServiceType: 'HousePainting',
    relatedServices: ['ceiling-painting', 'interior-painting', 'drywall-repair-paint', 'color-change-repaint'],
    featuredCities: ['studio-city', 'sherman-oaks', 'burbank', 'pasadena', 'encino', 'woodland-hills'],
    surfaces: ['living room ceilings', 'bedroom ceilings', 'hallways', 'vaulted entries', 'dining rooms', 'attached condo ceilings'],
    problems: ['texture hiding old patch lines', 'cracked taped joints underneath the popcorn', 'furniture-heavy occupied rooms', 'ceiling stains that need blocking after scraping'],
    prep: ['contain the room and protect floors and furniture', 'test suspect texture before disturbing it', 'wet scrape without gouging the board', 'skim, sand, prime, and finish-paint'],
    finishNotes: ['flat ceiling white after skim coat', 'wider skim passes in side-lit rooms', 'careful masking when walls stay in place', 'full-room repaint options if old wall cut lines show'],
    localExamples: ['1970s living rooms in Studio City', 'Valley tract bedrooms in Burbank', 'townhome ceilings in Pasadena with tight dust control requirements'],
    valueNote: 'Popcorn removal only looks finished when the skim coat is flat and the ceiling is painted evenly from wall to wall. Scraping alone is just the messy middle.',
    timeline: 'Most 1 to 2 room projects take 1 to 2 days. Larger homes with multiple drying cycles and furniture management can stretch into 3 or more working days.',
  },
  'stucco-painting': {
    heroImage: HERO_IMAGES.stucco,
    heroImageAlt: 'Freshly painted stucco house exterior in Los Angeles',
    heroSubtitle: 'We repair cracks, deal with chalking, and coat stucco at the right build so the finish does not burn off on the sunny side first.',
    pricingKey: 'stucco',
    pricePerSqFt: '',
    priceAnchorKey: 'stucco',
    schemaServiceType: 'HousePainting',
    relatedServices: ['exterior-painting', 'color-change-repaint', 'wood-deck-staining', 'garage-painting'],
    featuredCities: ['malibu', 'pacific-palisades', 'beverly-hills', 'pasadena', 'glendale', 'la-canada-flintridge'],
    surfaces: ['smooth stucco', 'sand finish stucco', 'parged walls', 'garden walls', 'chimneys', 'detached garages'],
    problems: ['hairline map cracking', 'chalky surface dust', 'previous roller misses in rough texture', 'patched areas telegraphing through finish color'],
    prep: ['wash and brush down chalk', 'route and patch active cracks', 'prime repairs and thirsty spots', 'back-roll rough sections for full coverage'],
    finishNotes: ['high-build acrylics for most homes', 'coastal-grade systems near salt air', 'extra attention on parapets and chimney shoulders', 'color choice tuned to sun exposure and patch visibility'],
    localExamples: ['Spanish exteriors in Pasadena', 'cliffside homes in Pacific Palisades', 'gated estates in Hidden Hills with long stucco walls'],
    valueNote: 'Good stucco painting keeps patch lines calm, keeps moisture out, and buys time before you ever have to think about a full re-stucco job.',
    timeline: 'Typical stucco homes run 4 to 7 working days once washing, crack repair, patch cure, and full-body coats are accounted for.',
  },
  'trim-baseboard-painting': {
    heroImage: HERO_IMAGES.trim,
    heroImageAlt: 'Cleanly painted white baseboards and door trim in a Los Angeles home',
    heroSubtitle: 'Baseboards, casings, doors, and trim look sharp only when the prep is careful and the sheen is laid down without runs.',
    pricingKey: 'interior',
    pricePerSqFt: '$2-$4',
    priceAnchorKey: 'interior',
    schemaServiceType: 'HousePainting',
    relatedServices: ['interior-painting', 'ceiling-painting', 'color-change-repaint', 'cabinet-painting'],
    featuredCities: ['beverly-hills', 'pasadena', 'los-feliz', 'studio-city', 'manhattan-beach', 'brentwood'],
    surfaces: ['baseboards', 'door casings', 'crown moulding', 'window trim', 'interior doors', 'built-in shelving'],
    problems: ['old caulk lines splitting open', 'roller stipple on trim that should read smooth', 'door edges sticking after rushed coats', 'yellowed oil trim under thin waterborne paint'],
    prep: ['degloss and sand the profile', 'caulk gaps and fill dents', 'spot-prime stained or bare wood', 'mask floors and hinges cleanly'],
    finishNotes: ['semi-gloss on most trim packages', 'satin when clients want a softer read', 'spray or fine-finish roll based on occupied conditions', 'door edges cured before heavy use'],
    localExamples: ['period moulding in Pasadena Craftsman homes', 'tall modern casing packages in Brentwood', 'simple ranch trim packages in Woodland Hills'],
    valueNote: 'Fresh trim makes old wall paint look cleaner and expensive millwork look intentional again. It is one of the fastest ways to tighten a room.',
    timeline: 'Single-room trim packages can turn in a day. Whole-house trim with doors and crown usually takes 2 to 4 days.',
  },
  'color-change-repaint': {
    heroImage: HERO_IMAGES.interior,
    heroImageAlt: 'Los Angeles room repainted from a dark color to a soft warm neutral',
    heroSubtitle: 'When the old color is fighting the room, we reset it with the prep and coverage plan needed for a true color change.',
    pricingKey: 'interior',
    pricePerSqFt: '$2-$4',
    priceAnchorKey: 'interior',
    schemaServiceType: 'HousePainting',
    relatedServices: ['interior-painting', 'trim-baseboard-painting', 'ceiling-painting', 'cabinet-painting'],
    featuredCities: ['beverly-hills', 'west-hollywood', 'santa-monica', 'studio-city', 'silver-lake', 'culver-city'],
    surfaces: ['dark accent walls', 'builder beige interiors', 'whole-home palette changes', 'trim updates', 'stairwells', 'double-height entries'],
    problems: ['deep colors ghosting through weak hide paints', 'old cut lines left at the ceiling', 'sheen mismatch between touch-ups and full repaint', 'sample boxes showing through the new finish'],
    prep: ['sand and feather all old sample areas', 'prime where the color shift is dramatic', 'box paint for uniformity across rooms', 'cut every transition cleanly so the new palette looks intentional'],
    finishNotes: ['warm whites and soft greiges for resale-driven updates', 'deeper feature colors when natural light supports them', 'matching trim and wall updates when the old finish fights the new scheme', 'extra coat planning on reds, blues, and charcoal tones'],
    localExamples: ['dated tans in Woodland Hills tract homes', 'high-contrast designer palettes in West Hollywood condos', 'sun-bleached neutrals in Santa Monica beach properties'],
    valueNote: 'Color-change work is where coverage, priming, and boxing the paint matter most. Cheap shortcuts show fast when the old color and new color fight each other.',
    timeline: 'A one-room color change still turns fast, but whole-house palette shifts often need more masking, more cuts, and more total material than a same-color refresh.',
  },
  'rental-turnover-painting': {
    heroImage: HERO_IMAGES.rental,
    heroImageAlt: 'Freshly repainted rental unit ready for the next tenant',
    heroSubtitle: 'We handle vacancy turnovers fast, patch the real damage, and leave a durable finish that photographs clean for leasing.',
    pricingKey: 'interior',
    pricePerSqFt: '$2-$4',
    priceAnchorKey: 'interior',
    schemaServiceType: 'HousePainting',
    relatedServices: ['drywall-repair-paint', 'interior-painting', 'ceiling-painting', 'wallpaper-removal'],
    featuredCities: ['west-hollywood', 'culver-city', 'highland-park', 'burbank', 'santa-monica', 'silver-lake'],
    surfaces: ['vacant apartments', 'single-family rentals', 'hallways and stairwells', 'kitchens and baths', 'doors and trim', 'make-ready punch lists'],
    problems: ['grease and smoke staining', 'anchor holes from TV mounts and shelving', 'rub marks at corners and doors', 'lease deadlines that leave no slack'],
    prep: ['walk the unit and separate touch-up from full repaint work', 'patch and sand high-wear damage', 'prime stains and heavy scuff zones', 'use durable colors that are easy to maintain on the next turn'],
    finishNotes: ['consistent warm white walls for fast leasing photos', 'satin in high-traffic corridors', 'semi-gloss on trim and doors that get hit with carts and boxes', 'ceiling resets where smoke or previous leaks left marks'],
    localExamples: ['duplex turns in Culver City', 'small-unit portfolios in West Hollywood', 'single-family move-outs in Highland Park'],
    valueNote: 'Turnover painting is about speed with standards. The unit has to show clean on day one and still look clean after the next tenant moves furniture in.',
    timeline: 'Simple vacant turns can be wrapped in 1 to 2 days. Multi-room units with patching, stains, and ceilings usually land at 2 to 4 days.',
  },
  'wallpaper-removal': {
    heroImage: HERO_IMAGES.wallpaper,
    heroImageAlt: 'Wallpaper stripped from an interior wall before skim coating and paint',
    heroSubtitle: 'We remove the paper, clean the adhesive, repair the wall, and repaint so the room does not stop halfway at demo.',
    pricingKey: 'interior',
    pricePerSqFt: '$2-$4',
    priceAnchorKey: 'interior',
    schemaServiceType: 'HousePainting',
    relatedServices: ['drywall-repair-paint', 'interior-painting', 'color-change-repaint', 'ceiling-painting'],
    featuredCities: ['pasadena', 'los-feliz', 'eagle-rock', 'beverly-hills', 'west-hollywood', 'altadena'],
    surfaces: ['accent walls', 'powder rooms', 'dining rooms', 'older plaster walls', 'hallway borders', 'entire bedrooms'],
    problems: ['paper installed over unprimed drywall', 'glue residue telegraphing through paint', 'multiple wallpaper layers from remodels decades apart', 'drywall face tearing during removal'],
    prep: ['soften and strip paper without gouging the wall', 'wash or scrape off adhesive residue', 'skim damaged areas and sand flat', 'prime before the finish color goes on'],
    finishNotes: ['full-wall repaint instead of spot touch-up after removal', 'light texture reset when the surface is too torn to leave smooth', 'moisture-tolerant paint in baths and powder rooms', 'closer color matching when only one feature wall changes'],
    localExamples: ['older formal dining rooms in Pasadena', 'designer feature walls in Beverly Hills powder rooms', 'rental resets in Eagle Rock and Highland Park'],
    valueNote: 'Wallpaper removal only pays off when the wall is paint-ready afterward. The adhesive and the torn paper face are what make cheap removals fail.',
    timeline: 'One feature wall can turn in a day. Full-room removals with glue cleanup and skim work often need 2 to 3 working days before they are truly ready for paint.',
  },
  'ceiling-painting': {
    heroImage: HERO_IMAGES.ceiling,
    heroImageAlt: 'Freshly painted smooth white ceiling in a Los Angeles home',
    heroSubtitle: 'We reset ceilings that are dingy, stained, patched, or cut by old paint lines and leave them flat from corner to corner.',
    pricingKey: 'ceiling',
    pricePerSqFt: '',
    priceAnchorKey: 'ceiling',
    schemaServiceType: 'HousePainting',
    relatedServices: ['popcorn-ceiling-removal', 'interior-painting', 'drywall-repair-paint', 'color-change-repaint'],
    featuredCities: ['studio-city', 'pasadena', 'sherman-oaks', 'manhattan-beach', 'brentwood', 'glendale'],
    surfaces: ['flat drywall ceilings', 'vaulted ceilings', 'tray ceilings', 'bathroom ceilings', 'hallways', 'kitchen ceilings'],
    problems: ['water stains from old roof or plumbing leaks', 'roller lap marks catching side light', 'ceiling lines cut too low onto the wall', 'texture patches that need spot flattening'],
    prep: ['protect floors and furniture under the whole room', 'stain-block before finish paint where needed', 'sand drips and old splatter', 're-cut the wall line crisp before rolling'],
    finishNotes: ['flat bright white in most rooms', 'moisture-conscious products in baths and laundry rooms', 'full-room ceiling passes to avoid flashing', 'extra setup on tall entries and vaulted rooms'],
    localExamples: ['high side-light rooms in Manhattan Beach', 'older plaster ceilings in Pasadena', 'darkened kitchen ceilings in Sherman Oaks'],
    valueNote: 'Fresh ceilings make the whole interior read cleaner because every room bounces light off that plane first.',
    timeline: 'One or two rooms can be handled in a day. Larger sets of ceilings or stain-heavy work usually land at 2 to 3 days.',
  },
  'garage-painting': {
    heroImage: HERO_IMAGES.garage,
    heroImageAlt: 'Clean painted garage with coated floor and bright walls',
    heroSubtitle: 'Garage jobs work best when the floor, walls, storage layout, and cure time are planned together instead of as separate punch-list items.',
    pricingKey: 'garage',
    pricePerSqFt: '',
    priceAnchorKey: 'garage',
    schemaServiceType: 'HousePainting',
    relatedServices: ['exterior-painting', 'ceiling-painting', 'wood-deck-staining', 'rental-turnover-painting'],
    featuredCities: ['calabasas', 'manhattan-beach', 'woodland-hills', 'granada-hills', 'encino', 'la-canada-flintridge'],
    surfaces: ['garage floors', 'garage walls', 'ceilings', 'stem walls', 'storage alcoves', 'garage doors on the interior side'],
    problems: ['oil spots bleeding through floor coatings', 'dusty drywall and exposed patching', 'moisture-related lift at slab edges', 'shelving and bikes making access awkward'],
    prep: ['clear and stage the garage before work starts', 'degrease and mechanically prep the slab', 'patch cracks and spalls', 'prime and coat walls and ceilings after dust control'],
    finishNotes: ['solid-color floor systems for most family garages', 'bright wall colors that improve light level', 'extra wear zones around water heaters and laundry setups', 'clear cure windows before cars come back in'],
    localExamples: ['home gyms in Calabasas garages', 'surf and bike storage garages in Manhattan Beach', 'workshop garages in Granada Hills'],
    valueNote: 'A clean garage coating package makes storage easier, improves light, and turns a dusty utility box into usable square footage.',
    timeline: 'Most garage projects take 2 to 4 days when floor prep, wall paint, and cure time are all included.',
  },
  'wood-deck-staining': {
    heroImage: HERO_IMAGES.wooddeck,
    heroImageAlt: 'Freshly stained wood deck and fence in a Southern California backyard',
    heroSubtitle: 'We wash, sand, dry, and stain decks and fences so the finish soaks in evenly instead of flashing or peeling early.',
    pricingKey: 'wooddeck',
    pricePerSqFt: '',
    priceAnchorKey: 'wooddeck',
    schemaServiceType: 'HousePainting',
    relatedServices: ['exterior-painting', 'stucco-painting', 'garage-painting', 'color-change-repaint'],
    featuredCities: ['malibu', 'pacific-palisades', 'manhattan-beach', 'brentwood', 'la-canada-flintridge', 'woodland-hills'],
    surfaces: ['redwood decks', 'cedar fences', 'pergolas', 'gates', 'railings', 'poolside wood features'],
    problems: ['gray UV damage on walking surfaces', 'water beading failure after the old stain died out', 'splinters on handrails and stair treads', 'mildew and leaf staining in shaded areas'],
    prep: ['wash without furrowing the wood', 'sand worn traffic lanes', 'let the wood dry fully before stain', 'back-brush so the finish penetrates instead of sitting on top'],
    finishNotes: ['transparent and semi-transparent stains for visible grain', 'solid-color systems when wood is too weathered to show cleanly', 'extra maintenance planning on south-facing decks', 'fence and gate staining timed with deck work for color consistency'],
    localExamples: ['ocean-exposed decks in Malibu', 'hillside fences in Pacific Palisades', 'sun-beaten pergolas in Woodland Hills'],
    valueNote: 'Wood staining is maintenance, not cosmetics only. The right wash, dry window, and stain build keep boards from checking out years early.',
    timeline: 'Most fence and deck projects take 2 to 4 days once wash time, dry time, sanding, and stain cure are scheduled around weather.',
  },
};

const CITY_META = {
  'beverly-hills': { profile: 'luxury', streets: ['Rodeo Drive', 'Sunset Boulevard', 'Benedict Canyon Drive', 'Santa Monica Boulevard'], landmarks: ['Greystone Mansion', 'Beverly Gardens Park', 'Rodeo Drive'], neighborhoods: ['The Flats', 'Trousdale Estates', 'South Beverly', 'Beverly Hills Gateway'], housingStock: ['Spanish Colonial estates', 'mid-century Trousdale homes', 'traditional two-story houses', 'contemporary hillside rebuilds'], hoaContext: 'Trousdale design review, condo boards, and gated compounds often tighten color approvals, staging windows, and delivery access.', nearbyCities: ['bel-air', 'west-hollywood', 'brentwood', 'santa-monica'], climate: 'hard afternoon sun on west walls and a lot of irrigation overspray around formal landscaping', housingNote: 'custom millwork, large formal rooms, and premium stone surfaces that cannot take sloppy masking', signature: 'estate-scale interiors, long exterior elevations, and owners who notice every brush line', subtitle: 'Detailed prep, quiet crews, and tight finish work for estates, condos, and high-visibility homes.' },
  'bel-air': { profile: 'luxury', streets: ['Sunset Boulevard', 'Stone Canyon Road', 'Bellagio Road', 'Chalon Road'], landmarks: ['Hotel Bel-Air', 'Bel-Air Country Club', 'Stone Canyon Reservoir'], neighborhoods: ['East Gate Bel Air', 'West Gate Bel Air', 'Upper Bel Air', 'Stone Canyon'], housingStock: ['gated estates', 'Mediterranean compounds', 'custom contemporary homes', 'older traditional mansions'], hoaContext: 'Private gates, long driveways, and neighborhood review standards mean access plans and low-noise staging matter.', nearbyCities: ['beverly-hills', 'brentwood', 'pacific-palisades', 'west-hollywood'], climate: 'canyon dust, tree cover, and intense sun on exposed ridgelines', housingNote: 'oversized rooms, custom cabinetry, and plaster details that show weak prep fast', signature: 'estate work where privacy, cleanliness, and surface protection matter as much as color', subtitle: 'Painting built around privacy, gated access, and high-end finish expectations.' },
  'hidden-hills': { profile: 'luxury', streets: ['Long Valley Road', 'Jed Smith Road', 'Ashley Ridge Road', 'Round Meadow Road'], landmarks: ['Hidden Hills Community Center', 'Ashley Ridge', 'the main gate off Long Valley Road'], neighborhoods: ['Long Valley estates', 'Ashley Ridge area', 'Round Meadow homes', 'east-side equestrian lots'], housingStock: ['horse-property estates', 'Mediterranean customs', 'new farmhouse rebuilds', 'large gated compounds'], hoaContext: 'Hidden Hills HOA rules, equestrian access, and paint approvals can shape color choices, work hours, and truck placement.', nearbyCities: ['calabasas', 'woodland-hills', 'tarzana', 'encino'], climate: 'dust from dry lots, strong valley heat, and a lot of sun on perimeter walls', housingNote: 'oversized kitchens, detached guest structures, and long runs of fencing and stucco', signature: 'estate maintenance with HOA sensitivity and long material runs', subtitle: 'Quiet, orderly painting for guard-gated homes, barns, guest houses, and long stucco runs.' },
  'pacific-palisades': { profile: 'luxury', streets: ['Sunset Boulevard', 'Temescal Canyon Road', 'Via de la Paz', 'Marquez Avenue'], landmarks: ['Palisades Village', 'Temescal Gateway Park', 'Palisades High'], neighborhoods: ['Alphabet Streets', 'The Huntington', 'Marquez Knolls', 'The Riviera'], housingStock: ['Spanish homes', 'coastal traditional houses', 'mid-century hillside homes', 'large bluff properties'], hoaContext: 'The Highlands and other association-managed pockets can limit work hours, delivery timing, and visible color shifts.', nearbyCities: ['malibu', 'brentwood', 'santa-monica', 'bel-air'], climate: 'salt air, marine layer moisture, and strong UV once the clouds burn off', housingNote: 'view-facing exteriors, salt-exposed trim, and interiors with a lot of natural side light', signature: 'coastal luxury work where weather exposure and sharp finish lines both matter', subtitle: 'Coastal prep, HOA awareness, and clean finish work for bluff homes and canyon properties.' },
  'malibu': { profile: 'coastal', streets: ['Pacific Coast Highway', 'Malibu Road', 'Kanan Dume Road', 'Rambla Pacifico'], landmarks: ['Malibu Pier', 'Surfrider Beach', 'Point Dume'], neighborhoods: ['Point Dume', 'Broad Beach', 'Malibu Colony', 'Malibu West'], housingStock: ['beachfront contemporary homes', 'stucco villas', 'canyon houses', 'coastal cottages'], hoaContext: 'Malibu West, condo communities, and beachfront associations often care about approved colors, staging, and salt-air maintenance timing.', nearbyCities: ['pacific-palisades', 'brentwood', 'calabasas', 'manhattan-beach'], climate: 'salt air, fog, and strong UV that can punish coatings fast', housingNote: 'exposed decks, beachfront glass, and exteriors that take constant weather', signature: 'high-maintenance coastal surfaces where product choice matters as much as labor', subtitle: 'Beachfront and canyon painting built for salt air, sun, and fast weather swings.' },
  'brentwood': { profile: 'luxury', streets: ['San Vicente Boulevard', 'Sunset Boulevard', 'Bundy Drive', 'Mandeville Canyon Road'], landmarks: ['Brentwood Country Mart', 'Brentwood Country Club', 'Getty Center'], neighborhoods: ['Brentwood Park', 'Mandeville Canyon', 'Brentwood Glen', 'Crestwood Hills'], housingStock: ['traditional estates', 'ranch homes', 'new contemporary builds', 'hillside customs'], hoaContext: 'Some canyon and condo pockets have stricter delivery windows and neighbor-sensitive work-hour expectations.', nearbyCities: ['bel-air', 'beverly-hills', 'santa-monica', 'pacific-palisades'], climate: 'tree shade in the canyons and harsh exposure on south-facing hillsides', housingNote: 'formal interiors, large family rooms, and canyon exteriors that need better prep than a flat lot', signature: 'high-end paint work spread across everything from classic estates to new hillside builds', subtitle: 'Precise painting for family estates, canyon homes, and new Brentwood rebuilds.' },
  'manhattan-beach': { profile: 'coastal', streets: ['Manhattan Beach Boulevard', 'Highland Avenue', 'Valley Drive', 'Ardmore Avenue'], landmarks: ['Manhattan Beach Pier', 'The Strand', 'Sand Dune Park'], neighborhoods: ['Sand Section', 'Tree Section', 'Hill Section', 'East Manhattan'], housingStock: ['coastal cottages', 'modern rebuilds', 'townhomes', 'post-war houses'], hoaContext: 'Condos and strand-adjacent properties often have tighter parking rules and narrower work windows.', nearbyCities: ['santa-monica', 'mar-vista', 'culver-city', 'malibu'], climate: 'salt air, blown sand, and bright reflected light off stucco and glass', housingNote: 'high natural light, compact lots, and exterior systems that age faster near the ocean', signature: 'coastal painting where the finish has to read clean in bright light and hold up to marine air', subtitle: 'Salt-air-conscious painting for sand-section homes, townhomes, and bright coastal interiors.' },
  'santa-monica': { profile: 'coastal', streets: ['Wilshire Boulevard', 'Montana Avenue', 'Ocean Park Boulevard', 'Pico Boulevard'], landmarks: ['Santa Monica Pier', 'Palisades Park', 'Bergamot Station'], neighborhoods: ['North of Montana', 'Ocean Park', 'Sunset Park', 'Mid-City'], housingStock: ['Spanish homes', 'small-lot bungalows', 'condos', 'coastal apartments'], hoaContext: 'Condo boards and limited parking can shape access, elevator reservations, and debris handling.', nearbyCities: ['brentwood', 'pacific-palisades', 'mar-vista', 'west-hollywood'], climate: 'marine layer moisture in the morning and bright salt-heavy sun in the afternoon', housingNote: 'condo interiors, older stucco, and beach-adjacent wood trim that need more maintenance', signature: 'dense-lot coastal work with parking, access, and weather all in play', subtitle: 'Apartment, condo, and single-family painting tuned for coastal air and tight access.' },
  'west-hollywood': { profile: 'urban', streets: ['Santa Monica Boulevard', 'Sunset Boulevard', 'Melrose Avenue', 'Laurel Avenue'], landmarks: ['Sunset Strip', 'Pacific Design Center', 'Plummer Park'], neighborhoods: ['Norma Triangle', 'West Hollywood West', 'Sunset Strip', 'Eastside'], housingStock: ['condos', 'Spanish bungalows', 'duplexes', 'small apartment buildings'], hoaContext: 'Condo associations and tighter urban parking usually set the pace for move-in paths, work windows, and material staging.', nearbyCities: ['beverly-hills', 'bel-air', 'los-feliz', 'silver-lake'], climate: 'strong sun, dense parking, and a lot of touch-up wear in rental and condo stock', housingNote: 'designer feature walls, compact kitchens, and frequent turnover work', signature: 'detail-heavy interiors in dense buildings where protection and cleanup are non-negotiable', subtitle: 'Painting for condos, duplexes, rentals, and design-forward homes with tight access.' },
  'silver-lake': { profile: 'urban', streets: ['Sunset Boulevard', 'Silver Lake Boulevard', 'Hyperion Avenue', 'Glendale Boulevard'], landmarks: ['Silver Lake Reservoir', 'Sunset Junction', 'Silver Lake Meadow'], neighborhoods: ['Moreno Highlands', 'Sunset Junction', 'Silver Lake Hills', 'Ivanhoe'], housingStock: ['hillside Spanish homes', 'mid-century houses', 'bungalows', 'duplexes'], hoaContext: null, nearbyCities: ['los-feliz', 'west-hollywood', 'highland-park', 'eagle-rock'], climate: 'hard side light, dry hills, and a lot of old plaster and patched remodel work', housingNote: 'older walls, tight stairs, and style-driven color shifts', signature: 'creative homes with real wear, real patching, and owners who care about the finish reading right', subtitle: 'Painterly, clean work for hillside homes, duplexes, and style-heavy remodels.' },
  'studio-city': { profile: 'valley', streets: ['Ventura Boulevard', 'Laurel Canyon Boulevard', 'Coldwater Canyon Avenue', 'Fryman Road'], landmarks: ['Radford Studio Center', 'Fryman Canyon', 'Tujunga Village'], neighborhoods: ['Colfax Meadows', 'Silver Triangle', 'Carpenter area', 'the Dona streets'], housingStock: ['1930s ranch homes', 'new farmhouses', 'hillside contemporaries', 'post-war houses'], hoaContext: 'Some hillside pockets and townhome associations care about staging, trash pickup, and approved exterior palettes.', nearbyCities: ['sherman-oaks', 'toluca-lake', 'burbank', 'encino'], climate: 'Valley heat, dusty canyon wind, and a lot of sun through large rear sliders', housingNote: 'family-room repaint cycles, cabinet refreshes, and ceiling work after remodels', signature: 'high-volume residential painting with remodel-level expectations and tight schedules', subtitle: 'Fast, clean painting for studio-adjacent family homes, remodels, and hillside properties.' },
  'sherman-oaks': { profile: 'valley', streets: ['Ventura Boulevard', 'Magnolia Boulevard', 'Beverly Glen Boulevard', 'Mulholland Drive'], landmarks: ['Sherman Oaks Galleria', 'Van Nuys Sherman Oaks Park', 'Westfield Fashion Square'], neighborhoods: ['Chandler Estates', 'Longridge Estates', 'Royal Woods', 'Hidden Woods'], housingStock: ['1950s ranch homes', 'split-level hillside houses', 'newer farmhouse rebuilds', 'condos'], hoaContext: 'Condo complexes and some hillside streets have narrower access and stricter work-hour expectations.', nearbyCities: ['studio-city', 'encino', 'tarzana', 'toluca-lake'], climate: 'strong heat, heavy AC use, and sunlight that exposes every patch on warm neutral walls', housingNote: 'oak kitchens, high-traffic family interiors, and tired exteriors baked by the Valley sun', signature: 'practical residential work where speed and cleanliness matter as much as the finish', subtitle: 'Painting built for busy family homes, Valley heat, and quick scheduling.' },
  'encino': { profile: 'valley', streets: ['Ventura Boulevard', 'Balboa Boulevard', 'Louise Avenue', 'Mulholland Drive'], landmarks: ['Los Encinos State Historic Park', 'Balboa Sports Center', 'Sepulveda Basin'], neighborhoods: ['Amestoy Estates', 'Encino Hills', 'Lake Encino', 'Rancho Estates'], housingStock: ['ranch homes', 'two-story traditional houses', 'gated estates', '1980s remodels'], hoaContext: 'Gated communities and condo buildings can add approval steps and tighter access rules.', nearbyCities: ['sherman-oaks', 'tarzana', 'calabasas', 'studio-city'], climate: 'strong Valley heat, dust, and a lot of full-sun rear elevations', housingNote: 'large kitchens, family-room walls that take abuse, and exteriors with a lot of stucco and wood trim', signature: 'steady maintenance painting for larger family homes and gated properties', subtitle: 'Clear, durable painting for ranch homes, gated properties, and Valley family houses.' },
  'calabasas': { profile: 'luxury', streets: ['Calabasas Road', 'Mulholland Highway', 'Parkway Calabasas', 'Valmar Road'], landmarks: ['The Commons at Calabasas', 'Calabasas Lake', 'Leonis Adobe'], neighborhoods: ['Calabasas Park', 'The Oaks', 'Mulholland Heights', 'Calabasas Hills'], housingStock: ['1990s Mediterranean estates', 'Tuscan-inspired homes', 'custom hill houses', 'guard-gated tract homes'], hoaContext: 'HOA rules are a major factor in Calabasas. Color boards, gate access, and work hours need to be respected from day one.', nearbyCities: ['hidden-hills', 'woodland-hills', 'encino', 'tarzana'], climate: 'Valley sun, hillside dust, and large exterior footprints with a lot of stucco', housingNote: 'big kitchens, tall foyers, and trim packages that need a cleaner finish than builder-grade repaint crews deliver', signature: 'planned, HOA-aware painting for large homes with lots of visible surface area', subtitle: 'HOA-friendly painting for gated communities, hillsides, and large family homes.' },
  'tarzana': { profile: 'valley', streets: ['Ventura Boulevard', 'Reseda Boulevard', 'Tampa Avenue', 'Wilbur Avenue'], landmarks: ['Braemar Country Club', 'Tarzana Recreation Center', 'Tarzana Village Walk'], neighborhoods: ['Melody Acres', 'Tarzana Hills', 'South of the Boulevard', 'El Caballero area'], housingStock: ['ranch homes', '1960s two-story homes', 'horse-property pockets', 'new infill builds'], hoaContext: null, nearbyCities: ['encino', 'woodland-hills', 'calabasas', 'sherman-oaks'], climate: 'Valley heat, mature-tree shade, and a lot of west-facing stucco that bakes hard', housingNote: 'family homes with wear on hallways, kitchens, and older oak trim', signature: 'practical, high-mileage residential painting where prep has to carry the finish', subtitle: 'Dependable painting for ranch houses, larger family homes, and south-of-the-boulevard lots.' },
  'woodland-hills': { profile: 'valley', streets: ['Ventura Boulevard', 'Topanga Canyon Boulevard', 'Mulholland Drive', 'Valley Circle Boulevard'], landmarks: ['Westfield Topanga', 'Warner Center', 'Serrania Park'], neighborhoods: ['Walnut Acres', 'Carlton Terrace', 'Woodland West', 'south of the boulevard'], housingStock: ['ranch homes', '1970s tract houses', 'hillside customs', 'large remodels'], hoaContext: 'Some hillside communities and townhome tracts keep tighter exterior color and parking rules than the flatlands.', nearbyCities: ['tarzana', 'calabasas', 'granada-hills', 'encino'], climate: 'hot summers, UV-heavy south walls, and dry conditions that punish old caulk and faded paint', housingNote: 'bigger exterior footprints, older valley oak kitchens, and high-traffic family rooms', signature: 'sun-beaten Valley homes that need more than a quick cosmetic repaint', subtitle: 'Sun-conscious painting for large Valley lots, tract homes, and hillside rebuilds.' },
  'burbank': { profile: 'valley', streets: ['Magnolia Boulevard', 'Riverside Drive', 'Olive Avenue', 'Kenneth Road'], landmarks: ['Warner Bros. Studios', 'Disney Studios', 'DeBell Golf Club'], neighborhoods: ['Magnolia Park', 'Rancho District', 'Media District', 'Burbank Hills'], housingStock: ['1940s cottages', '1950s ranch homes', 'post-war tract houses', 'Rancho horse properties'], hoaContext: null, nearbyCities: ['studio-city', 'toluca-lake', 'glendale', 'pasadena'], climate: 'hot afternoons, older wood trim, and a lot of modest-size homes that need smart scope control', housingNote: 'builder oak cabinets, compact kitchens, and tract-home exteriors with aging eaves', signature: 'value-driven painting where owners want a clean upgrade without overbuilding the scope', subtitle: 'Straightforward painting for tract homes, cottages, and studio-adjacent neighborhoods.' },
  'granada-hills': { profile: 'valley', streets: ['Chatsworth Street', 'Balboa Boulevard', 'Zelzah Avenue', 'Devonshire Street'], landmarks: ['O’Melveny Park', 'Mission Point', 'Knollwood Country Club'], neighborhoods: ['Old Granada Hills', 'Knollwood', 'north of Rinaldi', 'south of Devonshire'], housingStock: ['ranch homes', 'split-level houses', '1960s tract homes', 'hillside properties'], hoaContext: null, nearbyCities: ['northridge', 'san-fernando', 'woodland-hills', 'la-canada-flintridge'], climate: 'dry heat, windblown dust, and stucco walls that show faded patches quickly', housingNote: 'larger one-story plans, attached garages, and plenty of exterior stucco', signature: 'residential maintenance work with a lot of square footage and not much wasted complexity', subtitle: 'Durable, clean painting for one-story ranches, split-level homes, and Valley stucco exteriors.' },
  'northridge': { profile: 'valley', streets: ['Reseda Boulevard', 'Nordhoff Street', 'Tampa Avenue', 'Devonshire Street'], landmarks: ['CSUN', 'Northridge Fashion Center', 'Dearborn Park'], neighborhoods: ['Devonshire Highlands', 'north of Devonshire', 'Walnut Cove', 'residential pockets near CSUN'], housingStock: ['ranch homes', '1960s tract houses', 'condos', 'small apartment buildings'], hoaContext: 'Townhome and condo associations can narrow staging options and exterior work hours.', nearbyCities: ['granada-hills', 'san-fernando', 'woodland-hills', 'tarzana'], climate: 'dry Valley sun and a lot of repeat wear from students, families, and rental traffic', housingNote: 'older oak kitchens, ceiling stains, and exterior stucco that gets cooked hard', signature: 'budget-aware painting with a lot of practical repair work built into the scope', subtitle: 'Practical painting for ranch homes, condos, and rental-heavy Valley neighborhoods.' },
  'san-fernando': { profile: 'valley', streets: ['San Fernando Road', 'Maclay Avenue', 'Glenoaks Boulevard', 'Truman Street'], landmarks: ['Downtown San Fernando', 'San Fernando Recreation Park', 'Civic Center area'], neighborhoods: ['Maclay District', 'residential streets near Glenoaks', 'the Civic Center pocket', 'older bungalow blocks'], housingStock: ['small-lot bungalows', 'duplexes', '1940s cottages', 'mixed-use edge buildings'], hoaContext: null, nearbyCities: ['granada-hills', 'northridge', 'glendale', 'burbank'], climate: 'hard sun, tighter lots, and a lot of value-driven maintenance work', housingNote: 'compact interiors, rental refreshes, and older stucco with repeated patching', signature: 'efficient painting where access is tight and budgets matter', subtitle: 'Efficient painting for bungalows, duplexes, and compact homes across San Fernando.' },
  'pasadena': { profile: 'historic', streets: ['Colorado Boulevard', 'Orange Grove Boulevard', 'Arroyo Boulevard', 'Lake Avenue'], landmarks: ['Rose Bowl', 'Old Pasadena', 'Norton Simon Museum', 'Caltech'], neighborhoods: ['Bungalow Heaven', 'Linda Vista', 'Madison Heights', 'Hastings Ranch'], housingStock: ['Craftsman homes', 'Spanish houses', 'mid-century ranch homes', 'condos'], hoaContext: 'Historic districts and condo associations can affect color choices, scaffolding plans, and work-hour expectations.', nearbyCities: ['altadena', 'glendale', 'la-canada-flintridge', 'eagle-rock'], climate: 'foothill sun, mature trees, and older plaster or wood details that demand better prep', housingNote: 'original trim, plaster walls, and front elevations that owners want handled respectfully', signature: 'older homes where repair quality matters as much as paint quality', subtitle: 'Careful painting for Craftsman homes, old plaster, and Pasadena’s mixed historic housing stock.' },
  'glendale': { profile: 'urban', streets: ['Brand Boulevard', 'Kenneth Road', 'Chevy Chase Drive', 'Canada Boulevard'], landmarks: ['The Americana at Brand', 'Brand Park', 'Forest Lawn', 'Glendale Galleria'], neighborhoods: ['Rossmoyne', 'Adams Hill', 'Verdugo Woodlands', 'Sparr Heights'], housingStock: ['Spanish homes', 'Tudor houses', 'mid-century homes', 'hillside properties'], hoaContext: 'Condo communities and hillside access can shape staging and exterior work timing.', nearbyCities: ['pasadena', 'burbank', 'la-canada-flintridge', 'los-feliz'], climate: 'warm sun, hillside dust, and a mix of old plaster and newer condo finishes', housingNote: 'older trim details, condo repaints, and hillside exteriors with tight access', signature: 'mixed housing stock that rewards a contractor who can switch between old-house prep and efficient condo work', subtitle: 'Flexible painting for hillside homes, classic Glendale houses, and condo properties.' },
  'toluca-lake': { profile: 'luxury', streets: ['Riverside Drive', 'Moorpark Street', 'Clybourn Avenue', 'Valley Spring Lane'], landmarks: ['Lakeside Golf Club', 'Toluca Lake Village', 'Warner Bros. Studios'], neighborhoods: ['Toluca Lake Village', 'Lakeside edge homes', 'the island streets', 'south of Riverside'], housingStock: ['traditional estates', '1930s homes', 'luxury condos', 'updated ranch houses'], hoaContext: 'Condo buildings and private-lane homes can set stricter work windows and access expectations.', nearbyCities: ['studio-city', 'burbank', 'sherman-oaks', 'glendale'], climate: 'warm Valley light with more tree cover than the open flats', housingNote: 'older but upscale homes with formal trim, cabinetry, and plaster that need careful prep', signature: 'quiet finish work in established upscale neighborhoods', subtitle: 'Quiet, careful painting for estate lots, classic homes, and upscale condos.' },
  'culver-city': { profile: 'urban', streets: ['Washington Boulevard', 'Culver Boulevard', 'Jefferson Boulevard', 'Duquesne Avenue'], landmarks: ['Sony Pictures Studios', 'Downtown Culver City', 'Platform'], neighborhoods: ['Carlson Park', 'Blair Hills', 'Sunkist Park', 'Studio Village'], housingStock: ['Spanish bungalows', 'post-war houses', 'small-lot infill homes', 'condos'], hoaContext: 'Townhome complexes and denser blocks can mean tighter parking and shared-wall sensitivity.', nearbyCities: ['mar-vista', 'santa-monica', 'west-hollywood', 'manhattan-beach'], climate: 'bright westside light and a lot of turnover-driven maintenance work', housingNote: 'compact kitchens, older plaster, and steady rental or move-up repaint demand', signature: 'dense neighborhood painting where speed, cleanliness, and access planning all matter', subtitle: 'Fast, clean painting for bungalows, condos, and family homes across Culver City.' },
  'los-feliz': { profile: 'historic', streets: ['Vermont Avenue', 'Hillhurst Avenue', 'Los Feliz Boulevard', 'Franklin Avenue'], landmarks: ['Griffith Observatory', 'Greek Theatre', 'Los Feliz Village'], neighborhoods: ['Los Feliz Oaks', 'Laughlin Park', 'north of Los Feliz Boulevard', 'Franklin Hills edge'], housingStock: ['Spanish houses', 'hillside mid-century homes', 'older estates', 'duplexes'], hoaContext: 'Gated enclaves such as Los Feliz Oaks can add access and review layers to exterior work.', nearbyCities: ['silver-lake', 'west-hollywood', 'eagle-rock', 'highland-park'], climate: 'hillside sun, heavy side light, and a lot of old plaster detail', housingNote: 'designer interiors, period trim, and walls that reveal weak patching immediately', signature: 'style-sensitive painting in architecturally meaningful homes', subtitle: 'Clean, style-aware painting for Spanish homes, hillside houses, and Los Feliz classics.' },
  'eagle-rock': { profile: 'historic', streets: ['Colorado Boulevard', 'Eagle Rock Boulevard', 'Hill Drive', 'Yosemite Drive'], landmarks: ['Occidental College', 'Eagle Rock', 'Eagle Rock Plaza'], neighborhoods: ['Hill Drive corridor', 'Dahlia Heights', 'College View', 'residential streets off Colorado'], housingStock: ['Craftsman bungalows', '1920s Spanish homes', 'hillside houses', '1950s ranch homes'], hoaContext: null, nearbyCities: ['highland-park', 'pasadena', 'los-feliz', 'glendale'], climate: 'foothill heat, hillside dust, and a lot of older wall systems', housingNote: 'patched plaster, older trim, and modest kitchens that benefit from smart finish upgrades', signature: 'older-home painting with more repair work than the listing photos usually show', subtitle: 'Thoughtful painting for Craftsman houses, hillsides, and older Eagle Rock homes.' },
  'mar-vista': { profile: 'coastal', streets: ['Venice Boulevard', 'Grand View Boulevard', 'Centinela Avenue', 'Palms Boulevard'], landmarks: ['Mar Vista Farmers Market', 'Mar Vista Recreation Center', 'Mar Vista Hill'], neighborhoods: ['Hilltop', 'Westdale', 'Mar Vista Hill', 'North Oval'], housingStock: ['post-war ranch homes', '1940s bungalows', 'small-lot new builds', 'duplexes'], hoaContext: null, nearbyCities: ['culver-city', 'santa-monica', 'manhattan-beach', 'west-hollywood'], climate: 'westside marine air with more sun and dust than the beach edge gets', housingNote: 'family kitchens, compact lots, and exteriors that take both salt and traffic wear', signature: 'coastal-adjacent painting where durability and fast scheduling both matter', subtitle: 'Durable painting for westside ranch homes, bungalows, and small-lot rebuilds.' },
  'highland-park': { profile: 'historic', streets: ['York Boulevard', 'Figueroa Street', 'Avenue 50', 'Eagle Rock Boulevard'], landmarks: ['Highland Park Bowl', 'Sycamore Grove Park', 'York corridor'], neighborhoods: ['Garvanza', 'Mount Angelus', 'Arroyo View Estates', 'streets above Figueroa'], housingStock: ['Craftsman homes', 'hillside Victorians', 'bungalows', 'duplexes'], hoaContext: null, nearbyCities: ['eagle-rock', 'los-feliz', 'silver-lake', 'pasadena'], climate: 'warm sun, steep lots, and a lot of older paint history on the walls', housingNote: 'plaster repairs, restored trim, and frequent rental-to-owner transitions', signature: 'older housing with visible patching, layered colors, and lots of detail work', subtitle: 'Repair-first painting for Craftsman homes, hillside houses, and Highland Park duplexes.' },
  'la-canada-flintridge': { profile: 'foothill', streets: ['Foothill Boulevard', 'Angeles Crest Highway', 'Berkshire Avenue', 'Chevy Chase Drive'], landmarks: ['Descanso Gardens', 'La Cañada Country Club', 'JPL'], neighborhoods: ['Flintridge', 'La Cañada', 'Deodar', 'Sagebrush'], housingStock: ['mid-century ranch homes', 'traditional estates', 'hillside houses', 'large family homes'], hoaContext: 'Private-lane and hillside communities can add access rules and stricter exterior palette expectations.', nearbyCities: ['pasadena', 'glendale', 'altadena', 'granada-hills'], climate: 'foothill sun, oak shade, and dust rolling down from the hills', housingNote: 'big one-story ranches, wood trim, and outdoor spaces that need regular maintenance', signature: 'foothill homes with large lots and a lot of exterior surface area to manage', subtitle: 'Foothill-friendly painting for ranch homes, estates, and hillside properties.' },
  'altadena': { profile: 'foothill', streets: ['Lake Avenue', 'Altadena Drive', 'Mariposa Street', 'New York Drive'], landmarks: ['Eaton Canyon', 'Christmas Tree Lane', 'Loma Alta Park'], neighborhoods: ['Janes Village', 'President Streets', 'the Meadows', 'country club area'], housingStock: ['Craftsman homes', 'mid-century houses', 'foothill ranch homes', 'bungalows'], hoaContext: null, nearbyCities: ['pasadena', 'la-canada-flintridge', 'eagle-rock', 'glendale'], climate: 'foothill sun, more dust, and stronger seasonal swings than the basin', housingNote: 'older wood windows, plaster walls, and exteriors that take a beating from sun and tree debris', signature: 'repair-driven painting for older homes that need more prep than owners expect', subtitle: 'Repair-heavy painting for Craftsman homes, foothill ranches, and older Altadena properties.' },
};

const BLOG_TOPICS = [
  { slug: 'how-much-does-interior-painting-cost-los-angeles', title: 'How Much Does Interior Painting Cost in Los Angeles?', category: 'Cost Guide', kind: 'cost', service: 'interior-painting', cities: ['beverly-hills', 'santa-monica', 'studio-city'], relatedPosts: ['interior-painting-estimate-by-room-los-angeles', 'how-long-does-it-take-to-paint-a-house-interior', 'dark-to-light-color-change-cost-los-angeles'] },
  { slug: 'exterior-painting-cost-los-angeles', title: 'Exterior Painting Cost in Los Angeles: What Homeowners Actually Pay', category: 'Cost Guide', kind: 'cost', service: 'exterior-painting', cities: ['brentwood', 'malibu', 'woodland-hills'], relatedPosts: ['best-time-of-year-to-paint-a-house-in-los-angeles', 'how-often-should-you-repaint-exterior-los-angeles', 'exterior-vs-stucco-painting-whats-different'] },
  { slug: 'cabinet-painting-vs-replacing-cabinets-los-angeles', title: 'Cabinet Painting vs. Replacing Cabinets in Los Angeles', category: 'Comparison', kind: 'comparison', service: 'cabinet-painting', cities: ['beverly-hills', 'studio-city', 'burbank'], relatedPosts: ['cabinet-painting-timeline-how-many-days-does-it-take', 'kitchen-cabinet-paint-colors-that-sell-in-la', 'how-much-does-interior-painting-cost-los-angeles'] },
  { slug: 'popcorn-ceiling-removal-cost-los-angeles', title: 'Popcorn Ceiling Removal Cost in Los Angeles', category: 'Cost Guide', kind: 'cost', service: 'popcorn-ceiling-removal', cities: ['studio-city', 'burbank', 'pasadena'], relatedPosts: ['should-you-paint-ceilings-same-color-as-walls', 'ceiling-painting-cost-and-tips-los-angeles', 'how-long-does-it-take-to-paint-a-house-interior'] },
  { slug: 'stucco-painting-cost-los-angeles', title: 'Stucco Painting Cost in Los Angeles', category: 'Cost Guide', kind: 'cost', service: 'stucco-painting', cities: ['pacific-palisades', 'pasadena', 'malibu'], relatedPosts: ['best-paint-for-stucco-homes-los-angeles', 'exterior-vs-stucco-painting-whats-different', 'how-often-should-you-repaint-exterior-los-angeles'] },
  { slug: 'how-to-choose-paint-sheen-for-every-room', title: 'How to Choose Paint Sheen for Every Room', category: 'How-To', kind: 'howto', service: 'interior-painting', cities: ['beverly-hills', 'culver-city', 'pasadena'], relatedPosts: ['what-paint-finish-is-best-for-rentals', 'should-you-paint-ceilings-same-color-as-walls', 'best-white-paint-colors-for-los-angeles-homes'] },
  { slug: 'how-long-does-it-take-to-paint-a-house-interior', title: 'How Long Does It Take to Paint a House Interior?', category: 'Timeline', kind: 'timeline', service: 'interior-painting', cities: ['studio-city', 'calabasas', 'manhattan-beach'], relatedPosts: ['how-much-does-interior-painting-cost-los-angeles', 'how-to-prep-an-occupied-home-for-painting', 'interior-painting-estimate-by-room-los-angeles'] },
  { slug: 'best-white-paint-colors-for-los-angeles-homes', title: 'Best White Paint Colors for Los Angeles Homes', category: 'How-To', kind: 'color', service: 'interior-painting', cities: ['beverly-hills', 'santa-monica', 'los-feliz'], relatedPosts: ['how-to-choose-paint-sheen-for-every-room', 'dark-to-light-color-change-cost-los-angeles', 'kitchen-cabinet-paint-colors-that-sell-in-la'] },
  { slug: 'rental-turnover-painting-checklist-los-angeles', title: 'Rental Turnover Painting Checklist for Los Angeles Landlords', category: 'How-To', kind: 'howto', service: 'rental-turnover-painting', cities: ['west-hollywood', 'culver-city', 'highland-park'], relatedPosts: ['how-to-price-a-move-out-repaint-for-landlords', 'what-paint-finish-is-best-for-rentals', 'drywall-repair-before-painting-what-to-fix'] },
  { slug: 'how-to-budget-for-exterior-painting-near-the-coast', title: 'How to Budget for Exterior Painting Near the Coast', category: 'How-To', kind: 'howto', service: 'exterior-painting', cities: ['malibu', 'manhattan-beach', 'santa-monica'], relatedPosts: ['exterior-painting-cost-los-angeles', 'best-time-of-year-to-paint-a-house-in-los-angeles', 'best-paint-for-stucco-homes-los-angeles'] },
  { slug: 'ceiling-painting-cost-and-tips-los-angeles', title: 'Ceiling Painting Cost and Tips in Los Angeles', category: 'Cost Guide', kind: 'cost', service: 'ceiling-painting', cities: ['pasadena', 'sherman-oaks', 'manhattan-beach'], relatedPosts: ['popcorn-ceiling-removal-cost-los-angeles', 'should-you-paint-ceilings-same-color-as-walls', 'how-long-does-it-take-to-paint-a-house-interior'] },
  { slug: 'garage-painting-cost-los-angeles', title: 'Garage Painting Cost in Los Angeles', category: 'Cost Guide', kind: 'cost', service: 'garage-painting', cities: ['calabasas', 'woodland-hills', 'granada-hills'], relatedPosts: ['best-time-of-year-to-paint-a-house-in-los-angeles', 'how-to-budget-for-exterior-painting-near-the-coast', 'deck-staining-cost-los-angeles'] },
  { slug: 'deck-staining-cost-los-angeles', title: 'Deck Staining Cost in Los Angeles', category: 'Cost Guide', kind: 'cost', service: 'wood-deck-staining', cities: ['malibu', 'pacific-palisades', 'la-canada-flintridge'], relatedPosts: ['how-to-budget-for-exterior-painting-near-the-coast', 'best-time-of-year-to-paint-a-house-in-los-angeles', 'garage-painting-cost-los-angeles'] },
  { slug: 'wallpaper-removal-cost-los-angeles', title: 'Wallpaper Removal Cost in Los Angeles', category: 'Cost Guide', kind: 'cost', service: 'wallpaper-removal', cities: ['pasadena', 'los-feliz', 'beverly-hills'], relatedPosts: ['how-to-remove-wallpaper-without-damaging-drywall', 'drywall-repair-before-painting-what-to-fix', 'dark-to-light-color-change-cost-los-angeles'] },
  { slug: 'drywall-repair-before-painting-what-to-fix', title: 'Drywall Repair Before Painting: What Needs Fixing First?', category: 'How-To', kind: 'howto', service: 'drywall-repair-paint', cities: ['altadena', 'studio-city', 'culver-city'], relatedPosts: ['when-to-prime-walls-before-painting', 'wallpaper-removal-cost-los-angeles', 'how-to-remove-wallpaper-without-damaging-drywall'] },
  { slug: 'how-to-paint-baseboards-without-mess', title: 'How to Paint Baseboards Without Making a Mess', category: 'How-To', kind: 'howto', service: 'trim-baseboard-painting', cities: ['pasadena', 'los-feliz', 'beverly-hills'], relatedPosts: ['how-to-choose-paint-sheen-for-every-room', 'when-to-prime-walls-before-painting', 'how-to-prep-an-occupied-home-for-painting'] },
  { slug: 'dark-to-light-color-change-cost-los-angeles', title: 'Dark-to-Light Color Change Cost in Los Angeles', category: 'Cost Guide', kind: 'cost', service: 'color-change-repaint', cities: ['west-hollywood', 'silver-lake', 'santa-monica'], relatedPosts: ['how-much-does-interior-painting-cost-los-angeles', 'best-white-paint-colors-for-los-angeles-homes', 'when-to-prime-walls-before-painting'] },
  { slug: 'best-paint-for-stucco-homes-los-angeles', title: 'Best Paint for Stucco Homes in Los Angeles', category: 'How-To', kind: 'howto', service: 'stucco-painting', cities: ['malibu', 'pasadena', 'pacific-palisades'], relatedPosts: ['stucco-painting-cost-los-angeles', 'exterior-vs-stucco-painting-whats-different', 'how-often-should-you-repaint-exterior-los-angeles'] },
  { slug: 'how-often-should-you-repaint-exterior-los-angeles', title: 'How Often Should You Repaint a House Exterior in Los Angeles?', category: 'How-To', kind: 'howto', service: 'exterior-painting', cities: ['woodland-hills', 'malibu', 'brentwood'], relatedPosts: ['exterior-painting-cost-los-angeles', 'best-time-of-year-to-paint-a-house-in-los-angeles', 'best-paint-for-stucco-homes-los-angeles'] },
  { slug: 'kitchen-cabinet-paint-colors-that-sell-in-la', title: 'Kitchen Cabinet Paint Colors That Sell in LA', category: 'How-To', kind: 'color', service: 'cabinet-painting', cities: ['beverly-hills', 'studio-city', 'manhattan-beach'], relatedPosts: ['cabinet-painting-vs-replacing-cabinets-los-angeles', 'best-white-paint-colors-for-los-angeles-homes', 'cabinet-painting-timeline-how-many-days-does-it-take'] },
  { slug: 'how-to-prep-an-occupied-home-for-painting', title: 'How to Prep an Occupied Home for Painting', category: 'How-To', kind: 'howto', service: 'interior-painting', cities: ['brentwood', 'studio-city', 'pasadena'], relatedPosts: ['how-long-does-it-take-to-paint-a-house-interior', 'how-to-paint-baseboards-without-mess', 'how-much-does-interior-painting-cost-los-angeles'] },
  { slug: 'what-paint-finish-is-best-for-rentals', title: 'What Paint Finish Is Best for Rentals?', category: 'How-To', kind: 'howto', service: 'rental-turnover-painting', cities: ['culver-city', 'west-hollywood', 'burbank'], relatedPosts: ['rental-turnover-painting-checklist-los-angeles', 'how-to-price-a-move-out-repaint-for-landlords', 'how-to-choose-paint-sheen-for-every-room'] },
  { slug: 'when-to-prime-walls-before-painting', title: 'When Do You Actually Need to Prime Walls Before Painting?', category: 'How-To', kind: 'howto', service: 'drywall-repair-paint', cities: ['pasadena', 'silver-lake', 'altadena'], relatedPosts: ['drywall-repair-before-painting-what-to-fix', 'dark-to-light-color-change-cost-los-angeles', 'how-to-remove-wallpaper-without-damaging-drywall'] },
  { slug: 'interior-painting-estimate-by-room-los-angeles', title: 'Interior Painting Estimate by Room in Los Angeles', category: 'Cost Guide', kind: 'cost', service: 'interior-painting', cities: ['studio-city', 'beverly-hills', 'sherman-oaks'], relatedPosts: ['how-much-does-interior-painting-cost-los-angeles', 'how-long-does-it-take-to-paint-a-house-interior', 'how-to-choose-paint-sheen-for-every-room'] },
  { slug: 'exterior-vs-stucco-painting-whats-different', title: 'Exterior vs. Stucco Painting: What Is Actually Different?', category: 'Comparison', kind: 'comparison', service: 'stucco-painting', cities: ['pasadena', 'malibu', 'woodland-hills'], relatedPosts: ['stucco-painting-cost-los-angeles', 'best-paint-for-stucco-homes-los-angeles', 'exterior-painting-cost-los-angeles'] },
  { slug: 'how-to-remove-wallpaper-without-damaging-drywall', title: 'How to Remove Wallpaper Without Damaging Drywall', category: 'How-To', kind: 'howto', service: 'wallpaper-removal', cities: ['pasadena', 'los-feliz', 'altadena'], relatedPosts: ['wallpaper-removal-cost-los-angeles', 'drywall-repair-before-painting-what-to-fix', 'when-to-prime-walls-before-painting'] },
  { slug: 'should-you-paint-ceilings-same-color-as-walls', title: 'Should You Paint Ceilings the Same Color as the Walls?', category: 'How-To', kind: 'comparison', service: 'ceiling-painting', cities: ['manhattan-beach', 'studio-city', 'beverly-hills'], relatedPosts: ['ceiling-painting-cost-and-tips-los-angeles', 'how-to-choose-paint-sheen-for-every-room', 'best-white-paint-colors-for-los-angeles-homes'] },
  { slug: 'best-time-of-year-to-paint-a-house-in-los-angeles', title: 'Best Time of Year to Paint a House in Los Angeles', category: 'How-To', kind: 'timeline', service: 'exterior-painting', cities: ['malibu', 'woodland-hills', 'brentwood'], relatedPosts: ['exterior-painting-cost-los-angeles', 'how-often-should-you-repaint-exterior-los-angeles', 'how-to-budget-for-exterior-painting-near-the-coast'] },
  { slug: 'how-to-price-a-move-out-repaint-for-landlords', title: 'How to Price a Move-Out Repaint for Landlords', category: 'Cost Guide', kind: 'cost', service: 'rental-turnover-painting', cities: ['culver-city', 'burbank', 'west-hollywood'], relatedPosts: ['rental-turnover-painting-checklist-los-angeles', 'what-paint-finish-is-best-for-rentals', 'drywall-repair-before-painting-what-to-fix'] },
  { slug: 'cabinet-painting-timeline-how-many-days-does-it-take', title: 'Cabinet Painting Timeline: How Many Days Does It Take?', category: 'Timeline', kind: 'timeline', service: 'cabinet-painting', cities: ['studio-city', 'beverly-hills', 'sherman-oaks'], relatedPosts: ['cabinet-painting-vs-replacing-cabinets-los-angeles', 'kitchen-cabinet-paint-colors-that-sell-in-la', 'how-to-prep-an-occupied-home-for-painting'] },
];

function paragraph(text) {
  return `<p>${text}</p>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function combineHtml(parts) {
  return parts.filter(Boolean).join('');
}

function dollars(value) {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

function roundPrice(value) {
  return Math.round(value);
}

function titleCaseSlug(slug) {
  return slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCountFromSections(sections) {
  return sections.reduce((count, section) => count + stripHtml(section.body).split(/\s+/).filter(Boolean).length, 0);
}

function readConstantSource() {
  return fs.readFile(constantsPath, 'utf8');
}

function extractLiteral(source, name) {
  const startToken = `export const ${name}`;
  const start = source.indexOf(startToken);
  if (start === -1) throw new Error(`Could not find constant ${name}`);
  const equals = source.indexOf('=', start);
  let i = equals + 1;
  while (/\s/.test(source[i])) i += 1;
  const open = source[i];
  const close = open === '[' ? ']' : open === '{' ? '}' : null;
  if (!close) throw new Error(`Unexpected literal start for ${name}: ${open}`);
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;
  let literal = '';
  for (; i < source.length; i += 1) {
    const char = source[i];
    literal += char;
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\') {
      escaped = true;
      continue;
    }
    if (inSingle) {
      if (char === '\'') inSingle = false;
      continue;
    }
    if (inDouble) {
      if (char === '"') inDouble = false;
      continue;
    }
    if (inTemplate) {
      if (char === '`') inTemplate = false;
      continue;
    }
    if (char === '\'') {
      inSingle = true;
      continue;
    }
    if (char === '"') {
      inDouble = true;
      continue;
    }
    if (char === '`') {
      inTemplate = true;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  return literal;
}

async function loadConstants() {
  const source = await readConstantSource();
  const evaluate = (name) => vm.runInNewContext(`(${extractLiteral(source, name)})`);
  return {
    SERVICES: evaluate('SERVICES'),
    CITIES: evaluate('CITIES'),
    PRICING: evaluate('PRICING'),
    PRICE_ANCHORS: evaluate('PRICE_ANCHORS'),
  };
}

function cityModifier(slug) {
  if (['beverly-hills', 'bel-air', 'hidden-hills', 'pacific-palisades', 'malibu'].includes(slug)) return 1.25;
  if (['manhattan-beach', 'brentwood', 'calabasas'].includes(slug)) return 1.15;
  if (['burbank', 'northridge', 'san-fernando'].includes(slug)) return 0.95;
  return 1.0;
}

function getProfileHero(profile) {
  if (profile === 'luxury') return HERO_IMAGES.cityLuxury;
  if (profile === 'coastal') return HERO_IMAGES.cityCoastal;
  if (profile === 'valley') return HERO_IMAGES.cityValley;
  if (profile === 'historic') return HERO_IMAGES.cityHistoric;
  if (profile === 'foothill') return HERO_IMAGES.cityFoothill;
  return HERO_IMAGES.cityUrban;
}

function getPriceKey(slug) {
  return SERVICE_DETAILS[slug].pricingKey;
}

function getServiceTiers(slug, PRICING) {
  return PRICING[getPriceKey(slug)].map((tier) => ({ ...tier }));
}

function getAdjustedTiers(slug, modifier, PRICING) {
  return getServiceTiers(slug, PRICING).map((tier) => ({
    ...tier,
    min: roundPrice(tier.min * modifier),
    max: roundPrice(tier.max * modifier),
  }));
}

function cityNameBySlug(CITIES, slug) {
  return CITIES.find((city) => city.slug === slug)?.name ?? titleCaseSlug(slug);
}

function serviceNameBySlug(SERVICES, slug) {
  return SERVICES.find((service) => service.slug === slug)?.name ?? titleCaseSlug(slug);
}

function introFromTiers(serviceName, locationLabel, tiers) {
  const first = tiers[0];
  const last = tiers[tiers.length - 1];
  return `${serviceName} in ${locationLabel} usually starts around ${dollars(first.min)} to ${dollars(first.max)} for a basic ${first.label.toLowerCase()} scope. Larger projects land closer to ${dollars(last.min)} to ${dollars(last.max)}${last.plus ? '+' : ''}, depending on prep, access, and how much of the surface package we are touching in one visit.`;
}

function serviceMetaDescription(name, tiers) {
  const first = tiers[0];
  const last = tiers[tiers.length - 1];
  return `${name} in Los Angeles. ${dollars(first.min)}-${dollars(first.max)} ${first.label.toLowerCase()}, ${dollars(last.min)}-${dollars(last.max)}${last.plus ? '+' : ''} larger scopes. Free walkthrough today.`;
}

function matrixMetaDescription(serviceName, cityName, tiers) {
  const first = tiers[0];
  const last = tiers[tiers.length - 1];
  return `${serviceName} in ${cityName}. ${dollars(first.min)}-${dollars(first.max)} starting range, ${dollars(last.min)}-${dollars(last.max)}${last.plus ? '+' : ''} larger scopes. Get a local quote today.`;
}

function blogMetaDescription(title) {
  return `${title} with Los Angeles pricing, scope drivers, and contractor-level planning tips.`.slice(0, 154);
}

function buildServiceSections(slug, name, PRICING, PRICE_ANCHORS) {
  const detail = SERVICE_DETAILS[slug];
  const tiers = getServiceTiers(slug, PRICING);
  const anchor = PRICE_ANCHORS[detail.priceAnchorKey] ?? PRICE_ANCHORS.interior;
  const costCopy = paragraph(`${name} jobs in Los Angeles usually follow the same pattern: the low end is the clean, straight-through version of the work and the high end is the one with more prep, harder access, tighter finish expectations, or more total surface area. For ${name.toLowerCase()}, that means ${tiers.map((tier) => `${tier.label.toLowerCase()} at ${dollars(tier.min)} to ${dollars(tier.max)}${tier.plus ? '+' : ''}`).join(', ')}. We price by the real surface condition in front of us, not by a vague phone guess that falls apart the minute we walk the job.`)
    + paragraph(`What moves the number is rarely the paint itself. It is the prep. When a project has failed caulk, rough patches, greasy surfaces, raw wood, moisture staining, or old repairs telegraphing through the finish, the labor climbs because there is more work between the old surface and the new coat. That is why we write quotes after a walkthrough, photograph problem areas, and spell out the steps instead of burying them in a single line item.`)
    + paragraph(`Clients usually call us after getting two bad versions of the same estimate. One is so low it clearly skips prep. The other is a round number with no explanation. Our quotes show what is included, which surfaces are in scope, how many coats are realistic, and when the higher range comes into play. That keeps the project grounded and makes the final invoice predictable.`)
    + list([
      `Typical surfaces in scope: ${detail.surfaces.join(', ')}.`,
      `Most common failure points we correct: ${detail.problems.join(', ')}.`,
      `The comparison that matters: ${anchor}.`,
    ]);

  const whereItShowsUp = paragraph(`We do a lot of ${name.toLowerCase()} work in Los Angeles because the housing stock is mixed and the wear patterns are obvious. One week it is ${detail.localExamples[0]}. The next week it is ${detail.localExamples[1]}. Then it is ${detail.localExamples[2]}. The surfaces change, but the real job does not: get the old substrate stable, protect the finished areas around it, and leave a coating that does not read rushed once the light hits it in the afternoon.`)
    + paragraph(`This is where experience matters. A house in the basin behaves differently than a place closer to the coast, a canyon property, or a unit in a managed building. Access, dust control, sun exposure, drying times, elevator reservations, and homeowner expectations all shape the plan. We build our approach around how the job will actually run, not around how the sales pitch sounds.`)
    + paragraph(`We also look at what sits next to the surface. Stone counters, stained beams, hardwood floors, custom wallpaper, expensive light fixtures, and landscaped exterior edges all change the prep plan. Good painters pay attention to the stuff they are not painting, because that is what protects the house and keeps the project moving without damage or avoidable touch-up.`)
    + list([
      `Most common Los Angeles trouble spots: ${detail.problems.slice(0, 2).join('; ')}.`,
      `Best companion services: <a href="/${detail.relatedServices[0]}">${serviceNameBySlug(globalServices, detail.relatedServices[0])}</a>, <a href="/${detail.relatedServices[1]}">${serviceNameBySlug(globalServices, detail.relatedServices[1])}</a>, and <a href="/${detail.relatedServices[2]}">${serviceNameBySlug(globalServices, detail.relatedServices[2])}</a>.`,
    ]);

  const prepCopy = paragraph(`Prep is the difference between a job that looks good on day one and a job that still looks good after a season of use. Every ${name.toLowerCase()} project we do includes the prep steps that make the finish hold. That starts with ${detail.prep[0]}. Then we ${detail.prep[1]}. After that we ${detail.prep[2]}. Finally, we ${detail.prep[3]}. When any of those steps get skipped, the finish might still look fine at first, but it will fail faster and it will usually fail in a way you can see from across the room or the street.`)
    + paragraph(`We are careful about sequencing because rushing one part of the prep throws off everything behind it. If sanding dust is not removed, the finish gets rough. If raw repairs are not primed, they flash. If damaged caulk is left in place, it opens up through the new paint. If contaminated surfaces are not cleaned first, adhesion turns into a gamble. That is why we would rather write a realistic schedule than promise something that only works by cutting corners.`)
    + paragraph(`Clean prep also keeps the house livable. We use floor protection, plastic, masking, hardware labeling, and daily cleanup so the site stays controlled. Homeowners notice that right away. More important, it keeps the project from bogging down into days of small problems. Good prep saves time later because it prevents rework.`)
    + list(detail.prep.map((item) => `Included prep step: ${item}.`));

  const materialsCopy = paragraph(`Material choice matters, but it matters in the context of the surface. We use premium coatings because they hide better, level better, and stand up better once the job is back in service. For ${name.toLowerCase()}, the finish decisions we talk through most are ${detail.finishNotes[0]}, ${detail.finishNotes[1]}, ${detail.finishNotes[2]}, and ${detail.finishNotes[3]}. Those choices affect washability, sheen, coverage, and how forgiving the surface will be in side light.`)
    + paragraph(`This is also where we talk honestly about expectations. Some clients want the surface to look new. Some want it to look clean and consistent without overbuilding the scope. Those are different outcomes. If we are painting over old oak, rough stucco, patched drywall, or weathered wood, we explain what the substrate will still telegraph and what we can improve with more prep. Clear expectations save everybody frustration.`)
    + paragraph(`Because we work across high-end homes, rentals, family houses, and condos, we are used to matching the finish to the use case. A durable rental finish is different from a showcase formal room. A beach-adjacent exterior needs different thinking than a canyon lot. The point is not to oversell. It is to match the system to the job so the client gets a finish that makes sense for how the property is actually used.`)
    + paragraph(`We also pay attention to maintenance after the project. Some surfaces can be wiped, some should be washed gently, and some need cure time before they take daily abuse. That advice matters because the same finish can either last or fail based on what happens in the first few weeks after the job is done.`)
    + list(detail.finishNotes.map((item) => `Finish note: ${item}.`));

  const timelineCopy = paragraph(detail.timeline)
    + paragraph(`The way we keep timelines tight is by locking the sequence early. Surfaces that need repair get hit first. Areas with longer dry or cure windows are stacked so the crew is not standing around. The site is protected before finish material comes out, and every day ends with cleanup. That sounds basic, but it is where a lot of residential jobs fall apart. Homeowners do not need more drama. They need a clear plan and a crew that follows it.`)
    + paragraph(`We also tell clients where the project can slow down. Late color changes, added scope, unexpected substrate failures, association rules, weather, or occupancy constraints all affect the calendar. We would rather point those out on the front end than hide them. That honesty is what keeps a two-day job from becoming a two-week headache.`)
    + list([
      'Free walkthrough and written quote within 24 hours.',
      'Daily cleanup so the site stays usable at the end of each workday.',
      'Final walkthrough before the project is considered complete.',
    ]);

  const valueCopy = paragraph(detail.valueNote)
    + paragraph(`A lot of clients ask if they should replace instead of repaint, repair, or refinish. Sometimes replacement is the right call, especially if the substrate is rotten, swollen, structurally failed, or already carrying too many layers of bad work. Most of the time, though, the smarter move is to keep the bones that still work and invest in the finish. That is where painting delivers value: it changes what you see every day without dragging the house into a full renovation schedule.`)
    + paragraph(`The sweet spot is when the layout, the structure, and most of the material are still sound. That is when high-quality prep and paint make the biggest difference. You keep demolition down, you keep downtime down, and you focus the budget on the surfaces people actually notice. For homeowners trying to refresh before listing, reset after a purchase, or catch up on deferred maintenance, that is usually the right move.`)
    + list([
      `Most requested nearby pages: ${detail.featuredCities.map((citySlug) => `<a href="/${slug}/${citySlug}">${name} in ${cityNameBySlug(globalCities, citySlug)}</a>`).join(', ')}.`,
    ]);

  const bidCompareCopy = paragraph(`Homeowners usually get into trouble on ${name.toLowerCase()} when they compare the totals without comparing the methods. One painter includes protection, real prep, primer, two finish coats, hardware handling, and a final touch-up pass. The next painter includes one fast pass and hopes the surface is forgiving. Both call it the same service. Only one of those bids leaves a result that still looks right after the room is back in use or the weather changes.`)
    + paragraph(`We encourage clients to compare five things line by line: what prep is included, whether repairs are spot-painted or full-surface painted, how adjacent finishes are protected, what coating line is being used, and how the project will be scheduled day to day. If a quote is vague on those points, it is usually vague because the contractor wants room to decide later. That is when prices jump mid-job or the finish standard quietly drops.`)
    + paragraph(`A better quote is not the one with the nicest formatting. It is the one that tells you how the work will actually happen. That is how you know whether the price is fair. It also tells you how the crew thinks. Painters who understand the work can explain the work. Painters who only know the sales pitch usually hide behind big ranges and soft promises.`)
    + paragraph(`The other thing worth checking is what the contractor considers done. Some crews call the job complete once the color is on the surface. We call it complete after the walkthrough, after touch-ups, after the hardware is back where it belongs, and after the room or exterior section reads clean in real light. That standard is why our bids are written the way they are.`)
    + list([
      'Compare prep scope before you compare totals.',
      'Ask which surfaces are getting spot work versus full coverage.',
      'Ask how access, cleanup, and touch-ups are handled before approving the schedule.',
    ]);

  const whyUsCopy = paragraph(`Red Stag Painting runs residential work the way homeowners wish more contractors did: clear scope, exact prep, real communication, and no mystery around the finish standard. We have worked in estates, tight condos, tract homes, rentals, and historic houses across Greater Los Angeles. That variety matters because it teaches you what can go wrong on different substrates and how to keep the project moving when access or schedule gets complicated.`)
    + paragraph(`We also keep the crew disciplined. Floors are protected, hardware is labeled, tools are organized, and the site is cleaned every day. Homeowners can tell in the first hour whether a crew has done this before. The people who hire us usually care about two things: they want the finish to look right and they do not want the jobsite to take over their life. That is the standard we work to.`)
    + paragraph(`If you want the project priced correctly, the next step is simple: book a walkthrough, show us the real condition of the surfaces, and we will tell you where the work lands. No vague estimate. No soft numbers. Just a clean scope and a quote that matches the job.`)
    + list([
      `Also see <a href="/${detail.relatedServices[0]}">${serviceNameBySlug(globalServices, detail.relatedServices[0])}</a>, <a href="/${detail.relatedServices[1]}">${serviceNameBySlug(globalServices, detail.relatedServices[1])}</a>, and <a href="/${detail.relatedServices[2]}">${serviceNameBySlug(globalServices, detail.relatedServices[2])}</a>.`,
      `Featured markets: ${detail.featuredCities.map((citySlug) => `<a href="/areas/${citySlug}">${cityNameBySlug(globalCities, citySlug)}</a>`).join(', ')}.`,
    ]);

  return [
    { heading: `What Does ${name} Cost in Los Angeles?`, level: 'h2', body: costCopy },
    { heading: `Where ${name} Shows Up Most in LA Homes`, level: 'h2', body: whereItShowsUp },
    { heading: `Prep Work That Makes the Finish Last`, level: 'h2', body: prepCopy },
    { heading: `Materials, Sheen, and Finish Decisions`, level: 'h2', body: materialsCopy },
    { heading: `How the Work Gets Scheduled and Sequenced`, level: 'h2', body: timelineCopy },
    { heading: `When This Service Makes More Sense Than Replacement`, level: 'h2', body: valueCopy },
    { heading: `How to Compare Quotes Without Getting Burned`, level: 'h2', body: bidCompareCopy },
    { heading: `Why Homeowners Call Red Stag for This Scope`, level: 'h2', body: whyUsCopy },
  ];
}

function buildServiceFaqs(slug, name, PRICING) {
  const tiers = getServiceTiers(slug, PRICING);
  const low = tiers[0];
  const high = tiers[tiers.length - 1];
  const detail = SERVICE_DETAILS[slug];
  return [
    {
      question: `How much does ${name.toLowerCase()} cost in Los Angeles?`,
      answer: `${name} in Los Angeles usually starts around ${dollars(low.min)} to ${dollars(low.max)} for ${low.label.toLowerCase()} work. Larger jobs typically land around ${dollars(high.min)} to ${dollars(high.max)}${high.plus ? '+' : ''}. Prep level, access, and surface condition are what move the number.`,
    },
    {
      question: `How long does a ${name.toLowerCase()} job usually take?`,
      answer: detail.timeline,
    },
    {
      question: `What prep is actually included before you paint or refinish?`,
      answer: `We include the prep steps that make the finish hold: ${detail.prep.join(', ')}. We do not skip those steps to make the quote look cheaper.`,
    },
    {
      question: `What usually makes ${name.toLowerCase()} prices jump higher than expected?`,
      answer: `Hidden damage, contamination, failed caulk, old patching, difficult access, and tighter finish expectations are the big cost drivers. The paint itself is rarely what moves the job from the low end to the high end.`,
    },
    {
      question: `Is ${name.toLowerCase()} worth doing instead of replacing everything?`,
      answer: `${detail.valueNote} If the material is still sound, keeping the bones and paying for careful prep usually gives homeowners the best return.`,
    },
  ];
}

function imageAsset(src, alt) {
  return {
    src,
    alt,
    width: 1600,
    height: 900,
  };
}

const SERVICE_VISUALS = {
  'interior-painting': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', 'Outdated beige Los Angeles living room before repaint'),
      after: imageAsset('https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=1600&q=80', 'Bright freshly painted living room after interior repaint'),
      caption: 'Old beige walls, patched corners, and dull ceilings were reset with warm white walls, flat bright ceilings, and clean trim lines.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80', 'Interior painter working in a bright bedroom'),
      imageAsset('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80', 'Freshly painted hallway and staircase in Los Angeles home'),
      imageAsset('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', 'Warm white living room repaint with clean trim'),
    ],
    reviews: [
      { quote: 'They patched a decade of wall damage, kept the floors spotless, and the cut lines around the crown came out dead straight.', reviewer: 'Megan P.', city: 'Brentwood' },
      { quote: 'The crew moved everything, painted the upstairs in two days, and put the house back together without us chasing a single touch-up.', reviewer: 'Darren K.', city: 'Studio City' },
      { quote: 'We went from yellow builder paint to a clean warm white and the whole house finally feels current.', reviewer: 'Leah S.', city: 'Pasadena' },
    ],
  },
  'exterior-painting': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1600&q=80', 'Faded stucco exterior before repaint'),
      after: imageAsset('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80', 'Freshly painted white stucco exterior in Los Angeles'),
      caption: 'Sun-faded stucco, chalking, and tired trim were rebuilt into a cleaner exterior with sharper body color and a stronger trim contrast.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80', 'Los Angeles exterior painter on stucco home'),
      imageAsset('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80', 'Freshly painted two-story exterior with crisp trim'),
      imageAsset('https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1600&q=80', 'Bright exterior repaint on Southern California home'),
    ],
    reviews: [
      { quote: 'South and west walls were cooked from years of sun, and they still got the finish uniform from the curb.', reviewer: 'Chris T.', city: 'Pacific Palisades' },
      { quote: 'They caught rotten trim and failed caulk before paint went on, which saved us from paying twice later.', reviewer: 'Anita R.', city: 'Woodland Hills' },
      { quote: 'Five days, full exterior, daily cleanup, and the house looked sharper than any repaint we have done before.', reviewer: 'Joel M.', city: 'Manhattan Beach' },
    ],
  },
  'cabinet-painting': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1600&q=80', 'Dark dated kitchen cabinets before repaint'),
      after: imageAsset('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80', 'Bright white sprayed kitchen cabinets after painting'),
      caption: 'The original boxes stayed, but the finish changed completely once the doors were sprayed, the grain was managed, and the hardware layout was cleaned up.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80', 'Cabinet doors removed and labeled for painting'),
      imageAsset('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80', 'Freshly painted kitchen cabinets and island'),
      imageAsset('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80', 'Luxury painted cabinetry in estate kitchen'),
    ],
    reviews: [
      { quote: 'They cataloged every hinge and drawer front, and the kitchen went back together tighter than it started.', reviewer: 'Sonia L.', city: 'Beverly Hills' },
      { quote: 'We kept our counters, kept the layout, and still got the look of a full kitchen update for a fraction of replacement.', reviewer: 'Mark E.', city: 'Sherman Oaks' },
      { quote: 'The sprayed finish laid down smooth enough that guests assume we replaced the cabinets outright.', reviewer: 'Julia N.', city: 'Bel Air' },
    ],
  },
  'drywall-repair-paint': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80', 'Drywall damage and cracked wall before repair'),
      after: imageAsset('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', 'Smooth repaired wall ready after paint'),
      caption: 'Old cracks, sloppy patching, and leak stains were cut out, floated wider, primed correctly, and repainted so the wall reads flat again.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80', 'Drywall repair tools and patch work in progress'),
      imageAsset('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80', 'Painter sanding a drywall patch before primer'),
      imageAsset('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', 'Finished repaired wall with fresh paint'),
    ],
    reviews: [
      { quote: 'They fixed three ugly doorknob holes and a ceiling seam, then painted wide enough that the repairs disappeared in side light.', reviewer: 'Nadia C.', city: 'Burbank' },
      { quote: 'We had old leak scars over the dining room and they blocked every stain before the topcoat went on.', reviewer: 'Victor H.', city: 'Altadena' },
      { quote: 'This looked like a patchwork wall when they arrived and like one continuous surface when they left.', reviewer: 'Elena G.', city: 'Culver City' },
    ],
  },
  'popcorn-ceiling-removal': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&w=1600&q=80', 'Popcorn ceiling before removal in older Los Angeles home'),
      after: imageAsset('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', 'Smooth skim-coated ceiling after popcorn removal'),
      caption: 'The old texture came down, the ceiling was skimmed and sanded flat, and the room immediately felt brighter and newer.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80', 'Painter protecting a room for popcorn ceiling removal'),
      imageAsset('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', 'Smooth white ceiling after texture removal'),
      imageAsset('https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&w=1600&q=80', 'Ceiling texture removal setup in living room'),
    ],
    reviews: [
      { quote: 'The house went from late-1970s to current the second the texture came down and the ceilings went flat white.', reviewer: 'Kara F.', city: 'Studio City' },
      { quote: 'They handled the testing, the dust control, and the skim coat without turning the whole place into a mess.', reviewer: 'Ben W.', city: 'Pasadena' },
      { quote: 'We expected a chaotic demo. What we got was a controlled two-day process and ceilings that finally look clean.', reviewer: 'Tina J.', city: 'Glendale' },
    ],
  },
  'stucco-painting': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1600&q=80', 'Cracked stucco exterior before painting'),
      after: imageAsset('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80', 'Fresh stucco exterior coating after repaint'),
      caption: 'Hairline cracks, faded body color, and patched wall areas were stabilized first so the finish coat could read even across the whole elevation.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1600&q=80', 'Stucco exterior prep on Southern California home'),
      imageAsset('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80', 'Freshly painted stucco home with clean lines'),
      imageAsset('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80', 'Large stucco residence after exterior repaint'),
    ],
    reviews: [
      { quote: 'They did not just roll over the cracks. They chased every bad spot first and the walls now read consistent from end to end.', reviewer: 'Paul D.', city: 'Brentwood' },
      { quote: 'Our stucco had years of chalking on the south wall and the finish still came out rich and even.', reviewer: 'Mia O.', city: 'Malibu' },
      { quote: 'The crew matched the repaired texture, coated the whole facade, and the house looks tighter from the street than it has in years.', reviewer: 'Ramon A.', city: 'Pasadena' },
    ],
  },
  'trim-baseboard-painting': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', 'Scuffed baseboards and trim before repaint'),
      after: imageAsset('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', 'Freshly painted baseboards and trim after finish work'),
      caption: 'Scuffed baseboards, yellowed casings, and beat-up door frames were reset with straighter caulk lines and a harder enamel finish.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', 'Fresh trim paint around doors and windows'),
      imageAsset('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80', 'Painter detailing trim inside Los Angeles home'),
      imageAsset('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80', 'Finished millwork and baseboards in warm neutral room'),
    ],
    reviews: [
      { quote: 'The walls looked fine, but the trim was dragging the whole house down. Once they reset it, every room looked sharper.', reviewer: 'Gina B.', city: 'Encino' },
      { quote: 'They fixed the caulk gaps, sanded the old drips off the casings, and left the doors and trim looking clean instead of overpainted.', reviewer: 'Trevor S.', city: 'Toluca Lake' },
      { quote: 'Our staircase trim and baseboards took a beating from kids and dogs, and now it all reads crisp again.', reviewer: 'Helena V.', city: 'Manhattan Beach' },
    ],
  },
  'color-change-repaint': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', 'Dark dated paint color before color change repaint'),
      after: imageAsset('https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=1600&q=80', 'Warm neutral interior after color change repaint'),
      caption: 'A heavy, dated palette was blocked out, re-primed where needed, and turned into a lighter scheme that makes the rooms feel calmer and more current.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', 'Fresh neutral interior after major color change'),
      imageAsset('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', 'Painter rolling over old dark wall color'),
      imageAsset('https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=1600&q=80', 'Light bright room after repainting from darker tones'),
    ],
    reviews: [
      { quote: 'They took out three dark accent walls and the place instantly felt twice as bright without looking washed out.', reviewer: 'Rachel I.', city: 'West Hollywood' },
      { quote: 'We bought a house full of yellow undertones and they got it to a clean warm neutral without ghosting from the old colors.', reviewer: 'Eddie P.', city: 'Silver Lake' },
      { quote: 'The primer plan mattered. You cannot tell where the old navy walls were anymore.', reviewer: 'Simone T.', city: 'Santa Monica' },
    ],
  },
  'rental-turnover-painting': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&w=1600&q=80', 'Vacant rental unit before turnover painting'),
      after: imageAsset('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', 'Fresh rental turnover repaint ready for listing photos'),
      caption: 'Lease wear, wall damage, and kitchen grime were reset fast so the unit could be photographed clean and put back on the market.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&w=1600&q=80', 'Vacant apartment prepared for turnover painting'),
      imageAsset('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', 'Freshly painted rental interior ready for move-in'),
      imageAsset('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', 'Painter patching and repainting rental hallway'),
    ],
    reviews: [
      { quote: 'They turned our vacant unit in two days and it looked clean enough for listing photos the same afternoon.', reviewer: 'Donna K.', city: 'Culver City' },
      { quote: 'Patch work, wall repaint, trim cleanup, and no drama with the tenant turnover calendar.', reviewer: 'Samir Y.', city: 'West Hollywood' },
      { quote: 'This is the first turnover crew we have used that actually understood speed without leaving us a punch list behind.', reviewer: 'Greg N.', city: 'Highland Park' },
    ],
  },
  'wallpaper-removal': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', 'Wallpapered room before removal and repaint'),
      after: imageAsset('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', 'Smooth painted wall after wallpaper removal'),
      caption: 'Old paper and adhesive came off first, the torn walls were skimmed and primed, and the room finally reads like painted plaster again.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', 'Wall surface being smoothed after wallpaper removal'),
      imageAsset('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', 'Paint-ready wall after wallpaper removal work'),
      imageAsset('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80', 'Bright finished room after wallpaper removal and paint'),
    ],
    reviews: [
      { quote: 'They stripped two layers in the powder room, cleaned the glue off correctly, and the walls did not bubble under paint later.', reviewer: 'Caitlin M.', city: 'Los Feliz' },
      { quote: 'We were sure the drywall was going to get destroyed. Instead they floated the damaged spots and left us smooth walls.', reviewer: 'Harold Q.', city: 'Pasadena' },
      { quote: 'The dining room went from heavy old floral paper to a clean painted finish that fits the house again.', reviewer: 'Nina D.', city: 'Eagle Rock' },
    ],
  },
  'ceiling-painting': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80', 'Stained ceiling before repaint'),
      after: imageAsset('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', 'Bright clean ceiling after repaint'),
      caption: 'Old stains, dingy white, and rough cut lines were blocked, re-cut, and rolled flat so the room picks up light correctly again.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80', 'Ceiling painting setup in occupied room'),
      imageAsset('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', 'Bright flat white ceiling after repaint'),
      imageAsset('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80', 'Fresh tray ceiling and walls in Los Angeles home'),
    ],
    reviews: [
      { quote: 'We thought the ceilings were fine until they repainted them and the whole house suddenly felt brighter.', reviewer: 'Tessa U.', city: 'Sherman Oaks' },
      { quote: 'They blocked an old leak ring in the kitchen ceiling and it has not flashed back through.', reviewer: 'Albert F.', city: 'Glendale' },
      { quote: 'The line where the walls meet the ceiling is cleaner now than it was when we bought the house.', reviewer: 'Monica Z.', city: 'Brentwood' },
    ],
  },
  'garage-painting': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', 'Dusty garage before paint and coating'),
      after: imageAsset('https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80', 'Bright organized garage after painting'),
      caption: 'The old garage started dusty and unfinished. Once the walls, ceiling, and working surfaces were coated, it felt like usable square footage again.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80', 'Freshly painted organized garage interior'),
      imageAsset('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80', 'Garage walls and ceiling painted bright white'),
      imageAsset('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', 'Residential garage project in Los Angeles home'),
    ],
    reviews: [
      { quote: 'They turned a dusty storage garage into a clean room we actually want to walk into now.', reviewer: 'Peter L.', city: 'Calabasas' },
      { quote: 'Walls, ceiling, stem walls, and floor prep were handled in one schedule instead of making us coordinate separate trades.', reviewer: 'Janel R.', city: 'Granada Hills' },
      { quote: 'The brighter walls made a bigger difference than we expected, and the space finally feels organized.', reviewer: 'Oscar C.', city: 'Encino' },
    ],
  },
  'wood-deck-staining': {
    beforeAfter: {
      before: imageAsset('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80', 'Weathered wood deck before staining'),
      after: imageAsset('https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80', 'Freshly stained backyard wood deck after refinishing'),
      caption: 'Sun-bleached boards and dry rails were washed, sanded, and stained so the grain reads richer and the wood is protected again.',
    },
    inlineImages: [
      imageAsset('https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80', 'Freshly stained wood deck in backyard'),
      imageAsset('https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80', 'Exterior wood railing and deck staining project'),
      imageAsset('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80', 'Outdoor wood fence and deck stained warm brown'),
    ],
    reviews: [
      { quote: 'They did the wash and dry time the right way, so the stain actually soaked in instead of sitting on top of the wood.', reviewer: 'Heidi G.', city: 'Malibu' },
      { quote: 'Our fence and deck looked silver and tired before. Now the wood grain shows again and the backyard looks finished.', reviewer: 'Noah B.', city: 'La Canada Flintridge' },
      { quote: 'The crew explained the difference between transparent and solid stain clearly and the result fits the wood perfectly.', reviewer: 'Camila E.', city: 'Pacific Palisades' },
    ],
  },
};

function buildWhyChooseCards(slug, name) {
  const detail = SERVICE_DETAILS[slug];
  return [
    {
      stat: '500+',
      title: `${name} jobs across LA housing stock`,
      body: `We handle this scope on ${detail.localExamples[0]}, ${detail.localExamples[1]}, and ${detail.localExamples[2]}, so the plan fits the house instead of fighting it.`,
    },
    {
      stat: '24 hr',
      title: 'Quotes built around real prep',
      body: `We price the work after looking at things like ${detail.problems[0]} and ${detail.problems[1]}, not by guessing from a few photos.`,
    },
    {
      stat: 'Clean',
      title: 'Sequencing that keeps the site under control',
      body: `The production plan is built around ${detail.prep[0]}, ${detail.prep[1]}, and daily cleanup so the finish still reads right when the room or exterior goes back into service.`,
    },
  ];
}

function buildServiceFeature(slug, PRICING) {
  const exteriorTiers = getServiceTiers('exterior-painting', PRICING);
  switch (slug) {
    case 'interior-painting':
      return {
        type: 'roomCalculator',
        title: 'Room Cost Calculator',
        subtitle: 'Get a fast interior range before the walkthrough',
        baseMin: 400,
        baseMax: 900,
        roomOptions: [1, 2, 3, 4, 5, 6, 7, 8],
        heightOptions: [
          { value: 'standard', label: 'Standard 8ft', multiplier: 1 },
          { value: 'tall', label: 'Tall 9-10ft', multiplier: 1.15 },
          { value: 'vaulted', label: 'Vaulted 10ft+', multiplier: 1.3 },
        ],
      };
    case 'exterior-painting':
      return {
        type: 'homeSizeEstimator',
        title: 'Home Size Estimator',
        subtitle: 'Pick the house size and see how the exterior scope usually lands',
        options: [
          {
            id: 'small-ranch',
            title: 'Small Ranch',
            description: 'Single-story homes with straightforward access and lighter trim packages.',
            priceMin: exteriorTiers[0].min,
            priceMax: exteriorTiers[0].max,
            timeline: '3-4 days',
            included: ['Wash and surface prep', 'Stucco and trim spot repairs', 'Prime repaired areas', 'Body, trim, fascia, and doors'],
          },
          {
            id: 'medium-two-story',
            title: 'Medium Two-Story',
            description: 'Typical Los Angeles family homes with ladders, longer elevations, and more window trim.',
            priceMin: exteriorTiers[1].min,
            priceMax: exteriorTiers[1].max,
            timeline: '4-5 days',
            included: ['Soft wash or pressure wash', 'Crack and caulk repair', 'Masking and protection', 'Two finish coats on main surfaces'],
          },
          {
            id: 'large-estate',
            title: 'Large Estate',
            description: 'Bigger footprints, detached structures, longer trim runs, and higher finish expectations.',
            priceMin: exteriorTiers[2].min,
            priceMax: exteriorTiers[2].max,
            timeline: '5-7 days',
            included: ['Detailed prep across multiple elevations', 'Extensive fascia, eaves, and trim coverage', 'Prime bare wood and patched stucco', 'Daily cleanup and walkthrough pacing'],
          },
          {
            id: 'custom-estate',
            title: 'Custom Estate',
            description: 'Hillside, gated, or heavily detailed homes where access and staging drive the production plan.',
            priceMin: exteriorTiers[3].min,
            priceMax: exteriorTiers[3].max,
            timeline: '1-2 weeks',
            included: ['Complex staging and protection', 'Detailed trim, doors, and accent surfaces', 'Access coordination for large lots', 'Full exterior system pricing with premium prep'],
          },
        ],
      };
    case 'cabinet-painting':
      return {
        type: 'paintingVsReplacing',
        title: 'Painting vs Replacing',
        subtitle: 'See why repainting wins when the boxes are still solid',
        options: [
          {
            title: 'Paint Your Cabinets',
            price: '$2,500-$10,000',
            timeline: '5-7 days',
            notes: ['Kitchen stays usable throughout the project', 'Zero demolition', 'Keep your counters, plumbing, and layout', 'Sprayed finish on doors and drawer fronts'],
            highlighted: true,
          },
          {
            title: 'Replace Your Cabinets',
            price: '$15,000-$40,000',
            timeline: '3-6 weeks',
            notes: ['Kitchen is largely unusable during the remodel', 'Full demolition required', 'Trades stack behind one another', 'Higher spend before the room is even finished'],
            muted: true,
          },
        ],
      };
    case 'drywall-repair-paint':
      return {
        type: 'damageSizeGuide',
        title: 'Damage Size Guide',
        subtitle: 'See the repair level most homeowners are actually dealing with',
        levels: [
          { title: 'Small', description: 'Nail holes, screw pops, and little dings that need patching before repaint.', price: '$50-$75 per patch', size: 'small' },
          { title: 'Medium', description: 'Doorknob holes, stress cracks, and wider repairs that need more floating.', price: '$100-$200 per repair', size: 'medium' },
          { title: 'Large', description: 'Sections over 6 inches, water damage cutouts, and bigger wall failures.', price: '$200-$500 per area', size: 'large' },
        ],
      };
    case 'popcorn-ceiling-removal':
      return {
        type: 'asbestosNotice',
        title: 'Safety First',
        subtitle: 'Older ceiling texture needs the right process before anyone starts scraping',
        heading: 'Homes built before 1980: testing required before removal.',
        details: [
          'Older Los Angeles homes can have asbestos in the popcorn texture.',
          'Testing usually runs $25-$75 per sample.',
          'Lab results typically come back in 3-5 days.',
          'Red Stag handles the sampling, the paperwork, and the next step once the report comes in.',
        ],
      };
    case 'stucco-painting':
      return {
        type: 'stuccoConditionAssessment',
        title: 'Stucco Condition Assessment',
        subtitle: 'Condition changes both the coating system and what the quote needs to include',
        conditions: [
          {
            title: 'Good Condition',
            accent: 'green',
            description: 'Minor fading and light wear. The stucco is stable and mostly ready for prep plus paint.',
            includes: ['Wash and chalk removal', 'Spot caulking', 'Prime repairs', 'Standard premium exterior coating'],
          },
          {
            title: 'Fair Condition',
            accent: 'amber',
            description: 'Hairline cracking and more visible age. This usually calls for heavier prep and elastomeric planning.',
            includes: ['Crack repair and wider patch blending', 'Elastomeric-compatible primer plan', 'More detailed masking', 'Higher-build coating where needed'],
          },
          {
            title: 'Poor Condition',
            accent: 'red',
            description: 'Large cracks, failed patches, or bigger surface movement. Repair comes first, paint second.',
            includes: ['Repair-first scope review', 'Larger crack and patch stabilization', 'Prime all repaired zones', 'Finish pricing after the substrate is made sound'],
          },
        ],
      };
    case 'trim-baseboard-painting':
      return {
        type: 'trimChecklist',
        title: 'What We Paint',
        subtitle: 'Trim work is usually bigger than homeowners first assume',
        items: [
          'Baseboards',
          'Crown molding',
          'Door frames',
          'Window casings',
          'Chair rails',
          'Wainscoting',
          'Built-in shelving',
          'Fireplace mantels',
          'Stair railings',
          'Cabinet trim',
        ],
      };
    case 'color-change-repaint':
      return {
        type: 'colorDirectionGuide',
        title: 'Color Direction Guide',
        subtitle: 'The price changes when the old color has to disappear under the new one',
        directions: [
          {
            title: 'Going Lighter',
            price: '$3-$5/sqft',
            details: ['Dark to light usually needs a tinted primer', 'Expect 2-3 finish coats for true hide', 'Deep reds, blues, and charcoals take the most correction'],
            gradient: 'light',
          },
          {
            title: 'Going Darker',
            price: '$2.50-$4/sqft',
            details: ['A primer coat may still be needed depending on the starting color', 'Two finish coats are common', 'Edges and old sample blocks need extra cleanup'],
            gradient: 'dark',
          },
        ],
      };
    case 'rental-turnover-painting':
      return {
        type: 'turnoverPackageBuilder',
        title: 'Turnover Package Builder',
        subtitle: 'Build the make-ready scope and watch the planning range update instantly',
        items: [
          { label: 'Patch all holes', min: 200, max: 400 },
          { label: 'Repaint all walls', min: 1500, max: 3000 },
          { label: 'Paint trim and doors', min: 400, max: 800 },
          { label: 'Clean and paint kitchen', min: 300, max: 600 },
          { label: 'Clean and paint bathrooms', min: 200, max: 400 },
        ],
      };
    case 'wallpaper-removal':
      return {
        type: 'wallpaperLayerEstimate',
        title: 'Wallpaper Layer Estimate',
        subtitle: 'Removal time changes fast once you know what is actually on the wall',
        layers: [
          { title: 'Single Layer', price: '$3-$4/sqft', timeline: 'Usually 1 room in 1 day', description: 'Fastest removal when the paper releases cleanly and adhesive cleanup stays light.' },
          { title: 'Double Layer', price: '$4-$5/sqft', timeline: 'Usually 1 room in 1-2 days', description: 'Longer soak time, more scraping, and more glue cleanup before the wall is ready.' },
          { title: 'Painted Over Wallpaper', price: '$5-$7/sqft', timeline: 'Usually 1 room in 2 days', description: 'Hardest removal path because the paint traps moisture and makes the release slower.' },
        ],
      };
    case 'ceiling-painting':
      return {
        type: 'ceilingTypes',
        title: 'Ceiling Types We Handle',
        subtitle: 'Different ceilings need different setup, access, and paint planning',
        types: [
          { title: 'Flat / Smooth Ceilings', price: '$200-$600 per room', description: 'Standard ceiling resets with clean cut lines and full-room rolling.' },
          { title: 'Textured Ceilings', price: '$250-$700 per room', description: 'Requires better roller control and more care around high spots.' },
          { title: 'Popcorn Ceilings', price: '$200-$500 per room to paint over', description: 'For painting over existing texture, not removing it.' },
          { title: 'Vaulted Ceilings', price: '$400-$900 per room', description: 'More ladder setup, longer cuts, and more total production time.' },
          { title: 'Tray Ceilings', price: '$350-$800 per room', description: 'Extra corners and level changes mean more detail work.' },
          { title: 'Exposed Beam Ceilings', price: '$500-$1,200 per room', description: 'Beam edges and field areas are treated as separate finish surfaces.' },
        ],
      };
    case 'garage-painting':
      return {
        type: 'garagePackageOptions',
        title: 'Garage Package Options',
        subtitle: 'Pick the level of finish that matches how you use the space',
        options: [
          {
            title: 'Walls & Ceiling Only',
            price: '$1,500-$3,500',
            included: ['Surface prep and crack filling', 'Premium wall and ceiling paint', 'Bright clean finish for better visibility', 'Interior side of the garage brought back into shape'],
          },
          {
            title: 'Full Garage Package',
            price: '$2,500-$5,500',
            included: ['Walls and ceiling repaint', 'Epoxy floor coating', 'Stem wall cleanup and detailing', 'Best fit for garages that need to feel like usable square footage'],
            recommended: true,
          },
        ],
      };
    case 'wood-deck-staining':
      return {
        type: 'stainTypeSelector',
        title: 'Stain Type Selector',
        subtitle: 'Choose how much grain you want to see and how much UV protection you need',
        options: [
          {
            title: 'Transparent',
            description: 'Shows the full wood grain and keeps the most natural look.',
            protection: 'Least UV protection. Best when the wood is beautiful and you are ready for more maintenance.',
            lifespan: 'Reapply every 1-2 years',
            swatch: 'from-[#C58D54] to-[#8B5A2B]',
          },
          {
            title: 'Semi-Transparent',
            description: 'Lets part of the grain show while adding more color and protection.',
            protection: 'Moderate UV protection and a strong middle ground for decks and fences.',
            lifespan: 'Reapply every 2-3 years',
            swatch: 'from-[#C79B64] to-[#6B4423]',
          },
          {
            title: 'Solid Stain',
            description: 'Covers the grain and gives the wood the strongest color hold.',
            protection: 'Maximum UV protection when the wood is more weathered and needs more hiding power.',
            lifespan: 'Reapply every 3-5 years',
            swatch: 'from-[#9A6A45] to-[#4A2F1C]',
          },
        ],
      };
    default:
      return null;
  }
}

function buildServicePage(slug, SERVICES, PRICING, PRICE_ANCHORS) {
  const name = serviceNameBySlug(SERVICES, slug);
  const detail = SERVICE_DETAILS[slug];
  const visuals = SERVICE_VISUALS[slug];
  const tiers = getServiceTiers(slug, PRICING);
  const introAnswer = introFromTiers(name, 'Los Angeles', tiers);
  const sections = buildServiceSections(slug, name, PRICING, PRICE_ANCHORS);
  return {
    slug,
    name,
    titleTag: slug === 'trim-baseboard-painting'
      ? 'Trim & Baseboard Painting LA | Red Stag'
      : slug === 'popcorn-ceiling-removal'
        ? 'Popcorn Ceiling Removal LA | Red Stag'
        : slug === 'rental-turnover-painting'
          ? 'Rental Turnover Painting LA | Red Stag'
          : `${name} Los Angeles | Red Stag`,
    metaDescription: serviceMetaDescription(name, tiers),
    h1: `${name} in Los Angeles`,
    primaryKeyword: `${name.toLowerCase()} Los Angeles`,
    secondaryKeywords: [
      `${name.toLowerCase()} near me`,
      `${name.toLowerCase()} cost LA`,
      `best ${name.toLowerCase()} Los Angeles`,
      `${name.toLowerCase()} contractor Los Angeles`,
    ],
    canonical: `/${slug}`,
    ogTitle: `${name} Los Angeles | Red Stag Painting`,
    ogDescription: `${name} across Greater Los Angeles with premium prep, exact scheduling, and clear pricing.`,
    heroImage: detail.heroImage,
    heroImageAlt: detail.heroImageAlt,
    heroSubtitle: detail.heroSubtitle,
    beforeAfter: visuals.beforeAfter,
    inlineImages: visuals.inlineImages,
    homeownerReviews: visuals.reviews,
    whyChooseCards: buildWhyChooseCards(slug, name),
    serviceFeature: buildServiceFeature(slug, PRICING),
    introAnswer,
    sections,
    pricePerSqFt: detail.pricePerSqFt,
    pricingTiers: tiers,
    priceAnchor: PRICE_ANCHORS[detail.priceAnchorKey] ?? PRICE_ANCHORS.interior,
    faqs: buildServiceFaqs(slug, name, PRICING),
    relatedServices: detail.relatedServices,
    featuredCities: detail.featuredCities,
    schemaServiceType: detail.schemaServiceType,
  };
}

function buildCitySections(citySlug, cityName, SERVICES, CITIES, PRICING) {
  const city = CITY_META[citySlug];
  const modifier = cityModifier(citySlug);
  const interiorTiers = getAdjustedTiers('interior-painting', modifier, PRICING);
  const exteriorTiers = getAdjustedTiers('exterior-painting', modifier, PRICING);
  const cabinetTiers = getAdjustedTiers('cabinet-painting', modifier, PRICING);
  const popcornTiers = getAdjustedTiers('popcorn-ceiling-removal', modifier, PRICING);

  const section1 = combineHtml([
    paragraph(`${cityName} jobs are rarely generic Los Angeles jobs. The work changes block by block. On ${city.streets[0]} and ${city.streets[1]}, we see homes and buildings where finish quality is judged hard and quickly. Around ${city.landmarks[0]} and ${city.landmarks[1]}, the housing stock shifts again. That matters because painters who treat every house the same usually either underbid the prep or overbuild the scope.`),
    paragraph(`The projects we price most often here involve ${city.signature}. In practical terms, that means more time spent on setup, masking, patching, and color planning before finish coats ever start. Homeowners in ${cityName} are not paying for fancy language. They are paying for clean transitions, predictable scheduling, and a crew that can work in the house without turning it into chaos.`),
    paragraph(`We handle everything from <a href="/interior-painting/${citySlug}">interior painting in ${cityName}</a> to <a href="/exterior-painting/${citySlug}">exterior painting in ${cityName}</a>, but the same rule applies every time: the right scope depends on the condition of the house in front of us, not the brochure version of the neighborhood.`),
    list([
      `Street-level context that changes the scope: ${city.streets.join(', ')}.`,
      `Landmarks and areas that shape housing expectations: ${city.landmarks.join(', ')}.`,
      `Most common neighborhoods we work in: ${city.neighborhoods.join(', ')}.`,
    ]),
  ]);

  const section2 = combineHtml([
    paragraph(`${cityName} has a clear housing mix, and that housing mix tells you what kind of paint problems show up. We see ${city.housingStock.join(', ')}. Older homes usually come with patched plaster, original trim, and uneven walls that need wider prep. Newer rebuilds and luxury remodels come with the opposite challenge: the surfaces are straighter, but the finish standard is much tighter. Miss a sanding line or a sloppy cut, and it shows immediately.`),
    paragraph(`That is why we pay attention to the era and the layout of the house before talking price. A one-story ranch with simple access and open rooms paints differently than a hillside house with switchback stairs, long trim runs, and high ceilings. A condo with elevator reservations and parking limits paints differently than a detached house with a broad driveway and room to stage. The neighborhood name alone does not tell you enough. The housing stock does.`),
    paragraph(`It also tells us where homeowners are likely to get the best return. In some parts of ${cityName}, the smartest move is a whole-house interior repaint that cleans up years of wear in one pass. In others, the better move is a targeted exterior refresh, a cabinet update, or ceiling work that takes the tired surfaces out of the background. We look at the property type first because the housing stock usually points to the most visible win.`),
    paragraph(`In ${cityName}, the surfaces that usually need the most honesty are the ones homeowners have stared at for years: old kitchen cabinets, sun-faded exteriors, patched ceilings, rental wear in hallways, and doors or trim that have been brushed one too many times. That is the work we scope carefully because it is where the biggest visual lift usually comes from.`),
    list(city.housingStock.map((item) => `Common housing type: ${item}.`)),
  ]);

  const section3 = combineHtml([
    paragraph(`Exterior prep in ${cityName} is shaped by ${city.climate}. That changes how we wash, what we prime, how we patch, and which surfaces need more inspection before we ever open paint. Sun-heavy walls, tree debris, coastal air, dust, irrigation, and old caulk failure all leave different fingerprints. We build the prep plan around those fingerprints instead of using the same routine on every house.`),
    paragraph(`Interior work here has its own rhythm. ${city.housingNote}. In practical terms, that means furniture protection, cleaner daily resets, and more attention to the edges around finished stone, flooring, built-ins, and designer hardware. Good interior crews do not just paint faster. They disturb less while they do it.`),
    paragraph(`If the scope includes specialty work like <a href="/cabinet-painting/${citySlug}">cabinet painting</a>, <a href="/popcorn-ceiling-removal/${citySlug}">popcorn ceiling removal</a>, or <a href="/drywall-repair-paint/${citySlug}">drywall repair and paint</a>, we stack those tasks in the right order so the finish reads consistent at the end. That sequencing is what keeps the project feeling controlled instead of pieced together.`),
    list([
      `Most requested interior-related service here: <a href="/interior-painting/${citySlug}">Interior Painting in ${cityName}</a>.`,
      `Most requested exterior-related service here: <a href="/exterior-painting/${citySlug}">Exterior Painting in ${cityName}</a>.`,
      `Most requested finish upgrade here: <a href="/cabinet-painting/${citySlug}">Cabinet Painting in ${cityName}</a>.`,
    ]),
  ]);

  const section4 = combineHtml([
    paragraph(`Pricing in ${cityName} tracks to the actual labor conditions here, which is why we apply a city modifier instead of pretending every neighborhood runs on the same budget. Interior painting usually starts around ${dollars(interiorTiers[0].min)} to ${dollars(interiorTiers[0].max)} for ${interiorTiers[0].label.toLowerCase()} work, while whole-house interiors land closer to ${dollars(interiorTiers[interiorTiers.length - 1].min)} to ${dollars(interiorTiers[interiorTiers.length - 1].max)}${interiorTiers[interiorTiers.length - 1].plus ? '+' : ''}. Exterior repaint ranges here start at ${dollars(exteriorTiers[0].min)} and move up to ${dollars(exteriorTiers[exteriorTiers.length - 1].max)}${exteriorTiers[exteriorTiers.length - 1].plus ? '+' : ''} for larger homes.`),
    paragraph(`Cabinet painting in ${cityName} usually runs ${dollars(cabinetTiers[0].min)} to ${dollars(cabinetTiers[0].max)} for a small kitchen and ${dollars(cabinetTiers[cabinetTiers.length - 1].min)} to ${dollars(cabinetTiers[cabinetTiers.length - 1].max)}${cabinetTiers[cabinetTiers.length - 1].plus ? '+' : ''} for larger layouts or more built-ins. Popcorn ceiling removal starts around ${dollars(popcornTiers[0].min)} to ${dollars(popcornTiers[0].max)} for 1 to 2 rooms and climbs with room count, patching, and furniture management.`),
    paragraph(`Those are real working ranges, not teaser numbers. The final price still depends on scope, access, and how much prep the surfaces need, but the modifier keeps the quote grounded in how projects actually behave in ${cityName}.`),
    list([
      `Interior painting range in ${cityName}: ${dollars(interiorTiers[0].min)} to ${dollars(interiorTiers[interiorTiers.length - 1].max)}${interiorTiers[interiorTiers.length - 1].plus ? '+' : ''}.`,
      `Exterior painting range in ${cityName}: ${dollars(exteriorTiers[0].min)} to ${dollars(exteriorTiers[exteriorTiers.length - 1].max)}${exteriorTiers[exteriorTiers.length - 1].plus ? '+' : ''}.`,
      `Cabinet painting range in ${cityName}: ${dollars(cabinetTiers[0].min)} to ${dollars(cabinetTiers[cabinetTiers.length - 1].max)}${cabinetTiers[cabinetTiers.length - 1].plus ? '+' : ''}.`,
    ]),
  ]);

  const section5 = combineHtml([
    paragraph(city.hoaContext
      ? `${city.hoaContext} We plan for that before work starts because approvals, quiet hours, gate access, parking, and common-area rules can slow a project down if the contractor has not thought it through.`
      : `${cityName} is generally easier on approvals than the gated or highly managed parts of LA, but site logistics still matter. Parking, access, neighbors, and daily cleanup shape how cleanly the work runs.`),
    paragraph(`Scheduling also depends on how the property is used. Owner-occupied homes, short vacancy windows, condo move rules, and family routines all change the day-to-day sequencing. We keep the schedule realistic because homeowners care less about hearing the fastest number and more about finishing on the day we promised.`),
    paragraph(`That is one reason city pages matter. The same service lands differently in different neighborhoods. A cabinet project in one part of town is a custom spray job around premium stone. In another part of town it is a builder-grade oak reset with a tighter budget and faster timeline. Understanding that difference is what lets us quote accurately.`),
    list([
      `Nearby areas we often cross-schedule with ${cityName}: ${city.nearbyCities.map((nearby) => `<a href="/areas/${nearby}">${cityNameBySlug(CITIES, nearby)}</a>`).join(', ')}.`,
    ]),
  ]);

  const section6 = combineHtml([
    paragraph(`A good walkthrough in ${cityName} is not just a price appointment. It is where we find the surfaces that are going to decide the project. On one house that may be the west-facing exterior wall, the oak kitchen that needs a reset, or the patched ceiling over the family room. On another house it may be original trim, condo access rules, or a rental vacancy deadline. The point is to sort the cosmetic work from the real prep so the quote matches the property.`),
    paragraph(`That matters because homeowners in ${cityName} usually have more than one way to spend the budget. Some need the fastest visual lift before listing. Some need durable work in a family home they plan to stay in for 10 years. Some need a rental made ready without overspending. The walkthrough tells us which version of the job we are pricing, and that changes everything from sheen to schedule.`),
    paragraph(`We also use the visit to flag companion scopes. If a ceiling is being repainted, it may make sense to reset the walls at the same time. If cabinets are being sprayed, touching the trim package may tighten the whole room. If an exterior has failing stucco patches, bundling <a href="/stucco-painting/${citySlug}">stucco painting in ${cityName}</a> with the broader exterior scope usually keeps the finish more consistent and avoids duplicate setup.`),
  ]);

  const section7 = combineHtml([
    paragraph(`Homeowners hire Red Stag in ${cityName} because they want a contractor who can see the surface condition clearly, price it honestly, and run the work without the usual mess. That means a fast walkthrough, a written scope, a crew that protects the house, and a final finish that still looks right when the light changes. We have handled that standard in estates, condos, historic houses, rentals, and plain old family homes across Greater Los Angeles.`),
    paragraph(`If you want to compare service-specific details, the best next step is to jump into the exact page for the scope you are pricing. Start with <a href="/interior-painting/${citySlug}">interior painting in ${cityName}</a>, <a href="/exterior-painting/${citySlug}">exterior painting in ${cityName}</a>, <a href="/cabinet-painting/${citySlug}">cabinet painting in ${cityName}</a>, or <a href="/ceiling-painting/${citySlug}">ceiling painting in ${cityName}</a>. Each one breaks down local pricing and the way the work usually runs in this market.`),
    paragraph(`That local context matters because homeowners are usually solving one of three problems: they want the house to feel cleaner, they want deferred maintenance caught up, or they want to protect resale or rental value without over-improving the property. The right paint scope is different for each goal. We help sort that out at the estimate stage so the budget goes to the surfaces that will move the needle most.`),
    paragraph(`The point is simple: good city-specific paint work is not about flattering the zip code. It is about understanding the actual homes on these streets and building a scope that fits them.`),
  ]);

  return [
    { heading: `What Painting Projects Look Like in ${cityName}`, level: 'h2', body: section1 },
    { heading: `Neighborhoods, Streets, and Housing Stock`, level: 'h2', body: section2 },
    { heading: `How Climate and Access Change the Scope`, level: 'h2', body: section3 },
    { heading: `How Pricing Lands in ${cityName}`, level: 'h2', body: section4 },
    { heading: `HOA Rules, Access, and Scheduling`, level: 'h2', body: section5 },
    { heading: `What We Look for During a ${cityName} Walkthrough`, level: 'h2', body: section6 },
    { heading: `Why Homeowners in ${cityName} Call Red Stag`, level: 'h2', body: section7 },
  ];
}

function buildCityFaqs(citySlug, cityName, PRICING) {
  const modifier = cityModifier(citySlug);
  const interior = getAdjustedTiers('interior-painting', modifier, PRICING);
  const exterior = getAdjustedTiers('exterior-painting', modifier, PRICING);
  const cabinet = getAdjustedTiers('cabinet-painting', modifier, PRICING);
  const popcorn = getAdjustedTiers('popcorn-ceiling-removal', modifier, PRICING);
  return [
    {
      question: `How much does interior painting cost in ${cityName}?`,
      answer: `Interior painting in ${cityName} usually starts around ${dollars(interior[0].min)} to ${dollars(interior[0].max)} for one room. Whole-house interiors typically land around ${dollars(interior[interior.length - 1].min)} to ${dollars(interior[interior.length - 1].max)}${interior[interior.length - 1].plus ? '+' : ''}, depending on prep and access.`,
    },
    {
      question: `What does exterior painting usually run in ${cityName}?`,
      answer: `Exterior repaint pricing in ${cityName} starts around ${dollars(exterior[0].min)} to ${dollars(exterior[0].max)} for smaller homes and runs up to ${dollars(exterior[exterior.length - 1].min)} to ${dollars(exterior[exterior.length - 1].max)}${exterior[exterior.length - 1].plus ? '+' : ''} on larger properties.`,
    },
    {
      question: `If I just want cabinets or ceilings done in ${cityName}, what should I budget?`,
      answer: `Cabinet painting usually starts around ${dollars(cabinet[0].min)} to ${dollars(cabinet[0].max)} for a small kitchen. Popcorn ceiling removal starts around ${dollars(popcorn[0].min)} to ${dollars(popcorn[0].max)} for 1 to 2 rooms. The final number depends on prep and total count of doors, drawers, or rooms.`,
    },
    {
      question: `Do HOA rules or condo access change painting prices in ${cityName}?`,
      answer: `They can. Access restrictions, elevator reservations, parking limits, and approved work windows change labor flow. We account for those conditions in the quote instead of pretending the job will run like a standard detached house.`,
    },
  ];
}

function buildCityPage(citySlug, CITIES, SERVICES, PRICING) {
  const cityName = cityNameBySlug(CITIES, citySlug);
  const meta = CITY_META[citySlug];
  const modifier = cityModifier(citySlug);
  const sections = buildCitySections(citySlug, cityName, SERVICES, CITIES, PRICING);
  const introAnswer = `House painting in ${cityName} usually runs about ${modifier === 1.25 ? '25%' : modifier === 1.15 ? '15%' : modifier === 0.95 ? '5%' : 'the same'} ${modifier > 1 ? 'above' : modifier < 1 ? 'below' : 'as'} standard Los Angeles pricing. Interior work starts around ${dollars(getAdjustedTiers('interior-painting', modifier, PRICING)[0].min)} per room, and exterior repaint ranges move with access, prep, and finish expectations in this market.`;
  return {
    slug: citySlug,
    name: cityName,
    state: 'CA',
    titleTag: `${cityName} House Painters | Red Stag`,
    metaDescription: `House painters in ${cityName}, CA. Real local pricing, neighborhood-specific prep, and fast estimates. Talk through your project today.`.slice(0, 154),
    h1: `House Painters in ${cityName}, CA`,
    primaryKeyword: `house painters ${cityName} CA`,
    secondaryKeywords: [
      `${cityName} painting company`,
      `${cityName} interior painters`,
      `${cityName} exterior painters`,
      `paint contractor ${cityName}`,
    ],
    canonical: `/areas/${citySlug}`,
    ogTitle: `${cityName} House Painters | Red Stag Painting`,
    ogDescription: `Painting services in ${cityName}, CA with local pricing, cleaner prep, and neighborhood-specific job planning.`,
    heroImage: getProfileHero(meta.profile),
    heroImageAlt: `${cityName} residential painting project in Los Angeles County`,
    heroSubtitle: meta.subtitle,
    introAnswer,
    sections,
    priceModifier: modifier,
    neighborhoods: meta.neighborhoods,
    housingStock: meta.housingStock,
    hoaContext: meta.hoaContext,
    faqs: buildCityFaqs(citySlug, cityName, PRICING),
    serviceLinks: SERVICES.map((service) => service.slug),
    nearbyCities: meta.nearbyCities,
  };
}

function profileAngle(slug, citySlug, cityName) {
  const profile = CITY_META[citySlug].profile;
  const maps = {
    'interior-painting': {
      luxury: `In ${cityName}, interior repaint work usually means larger rooms, taller walls, and finish standards that have to hold up under big windows and expensive trim details.`,
      coastal: `In ${cityName}, interior repaint work is often about freshening sun-bleached walls, calming glare, and choosing finishes that handle salt air and open-window living.`,
      valley: `In ${cityName}, interior repaint work is often a clean reset for family-heavy rooms, warm hallways, and ceilings that have baked under Valley heat for years.`,
      historic: `In ${cityName}, interior repaint work usually starts with old plaster, patch history, and trim details that need better prep than a basic tract home.`,
      foothill: `In ${cityName}, interior repaint work often means older walls, more dust from foothill conditions, and a lot of daylight that exposes weak patching immediately.`,
      urban: `In ${cityName}, interior repaint work is usually about tighter access, more compact rooms, and finishes that need to look sharp in condos, duplexes, and design-heavy homes.`,
    },
    'exterior-painting': {
      luxury: `Exterior painting in ${cityName} usually means long elevations, guest structures, gates, and trim packages that need a cleaner finish than a volume repaint crew can deliver.`,
      coastal: `Exterior painting in ${cityName} is all about weather. Salt air, marine moisture, and bright UV punish weak prep fast, so the coating system matters.`,
      valley: `Exterior painting in ${cityName} is driven by heat, UV, and dry caulk joints. Most of the real work is fixing what the sun has already beaten up.`,
      historic: `Exterior painting in ${cityName} usually combines older wood details, patched stucco, and façades where sloppy prep stands out from the curb.`,
      foothill: `Exterior painting in ${cityName} often involves larger lots, tree debris, foothill dust, and more maintenance on wood and stucco edges.`,
      urban: `Exterior painting in ${cityName} usually means smaller lots, tighter access, and neighbors close enough that cleanup and staging are part of the job.`,
    },
    'cabinet-painting': {
      luxury: `Cabinet painting in ${cityName} is usually tied to estate kitchens with custom doors, integrated panels, and stone that cannot be nicked by sloppy masking.`,
      coastal: `Cabinet painting in ${cityName} often focuses on brightening beach-adjacent kitchens where sun, salt air, and open-window cooking wear the finish over time.`,
      valley: `Cabinet painting in ${cityName} is often the move for builder-grade oak or thermofoil kitchens that work fine but look tired.`,
      historic: `Cabinet painting in ${cityName} often means older face-frame cabinetry, uneven wall lines, and kitchens that need a finish upgrade without a full gut remodel.`,
      foothill: `Cabinet painting in ${cityName} usually means family kitchens in older homes where layout is fine but the finish is dated and worn.`,
      urban: `Cabinet painting in ${cityName} often happens in tighter kitchens where replacement would be too disruptive for the footprint and the budget.`,
    },
    'drywall-repair-paint': {
      luxury: `Drywall repair and paint in ${cityName} is less about giant holes and more about making premium rooms look untouched after cracks, leaks, or remodel punch work.`,
      coastal: `Drywall repair and paint in ${cityName} often means patching around old moisture marks and making the wall read flat again in strong coastal light.`,
      valley: `Drywall repair and paint in ${cityName} usually comes from family wear, settlement cracks, HVAC cuts, and move-out damage that needs to disappear under fresh paint.`,
      historic: `Drywall repair and paint in ${cityName} often starts with older plaster transitions and patches that have to be feathered wide to vanish.`,
      foothill: `Drywall repair and paint in ${cityName} usually involves older wall systems, cracks around windows, and dust-heavy prep that needs better containment.`,
      urban: `Drywall repair and paint in ${cityName} is often about making compact rooms, rentals, and condo walls look clean again after years of patchwork.`,
    },
    'popcorn-ceiling-removal': {
      luxury: `Popcorn ceiling removal in ${cityName} is usually part of a larger finish reset, where the goal is to make the whole room read sharper and more current.`,
      coastal: `Popcorn ceiling removal in ${cityName} often means taking older beach-house ceilings smooth so the space feels brighter and cleaner in natural light.`,
      valley: `Popcorn ceiling removal in ${cityName} is common in 1970s and 1980s Valley housing, where the old texture makes otherwise solid homes look dated.`,
      historic: `Popcorn ceiling removal in ${cityName} is often less about trend and more about cleaning up later-applied texture that hides the room’s original character.`,
      foothill: `Popcorn ceiling removal in ${cityName} usually comes with repair work because older homes have more ceiling patches and movement than owners expect.`,
      urban: `Popcorn ceiling removal in ${cityName} is often a condo or small-house upgrade where dust control and tight staging matter as much as the skim coat.`,
    },
    'stucco-painting': {
      luxury: `Stucco painting in ${cityName} usually means long wall runs, formal elevations, and patch blending that has to hold up under close inspection.`,
      coastal: `Stucco painting in ${cityName} is a weather job as much as a paint job. Salt, fog, and UV can eat weak coatings fast.`,
      valley: `Stucco painting in ${cityName} is mostly about sun damage, chalking, and dry cracking on big south- and west-facing wall planes.`,
      historic: `Stucco painting in ${cityName} often means respecting older texture patterns and making repair areas disappear without flattening the whole façade.`,
      foothill: `Stucco painting in ${cityName} usually has to account for foothill dust, tree cover, and larger lots with more detached walls and structures.`,
      urban: `Stucco painting in ${cityName} usually happens on tighter lots where access, ladders, and cleanup need more planning than the square footage suggests.`,
    },
    'trim-baseboard-painting': {
      luxury: `Trim and baseboard painting in ${cityName} usually means longer runs, better millwork, and a finish that gets judged from arm’s length.`,
      coastal: `Trim and baseboard painting in ${cityName} often focuses on brightening interiors where natural light makes every roller mark and dirty caulk line obvious.`,
      valley: `Trim and baseboard painting in ${cityName} is often the fastest way to clean up tired family interiors without repainting every wall.`,
      historic: `Trim and baseboard painting in ${cityName} usually means older profiles, door casings, and built-ins that need careful prep instead of brute-force sanding.`,
      foothill: `Trim and baseboard painting in ${cityName} often comes with older wood, more expansion and contraction, and more visible wear around entries.`,
      urban: `Trim and baseboard painting in ${cityName} often happens in condos and compact homes where crisp edges instantly sharpen the whole room.`,
    },
    'color-change-repaint': {
      luxury: `Color change repaints in ${cityName} usually happen when a house is being reset after purchase or staged to feel lighter, calmer, and more current.`,
      coastal: `Color change repaints in ${cityName} often aim to soften glare, warm up cool light, and pull older beach-house finishes into a cleaner palette.`,
      valley: `Color change repaints in ${cityName} are usually about moving from dated tans, yellows, or deep accent walls into a cleaner family-home palette.`,
      historic: `Color change repaints in ${cityName} often mean balancing updated color with original trim, plaster texture, and period details.`,
      foothill: `Color change repaints in ${cityName} often help older homes feel cleaner and brighter without a full renovation budget.`,
      urban: `Color change repaints in ${cityName} are usually driven by style updates, resale prep, or rentals being reset into a wider-market neutral palette.`,
    },
    'rental-turnover-painting': {
      luxury: `Rental turnover painting in ${cityName} is usually about high expectations and tight vacancy windows, especially in premium condos or lease listings.`,
      coastal: `Rental turnover painting in ${cityName} often focuses on cleaning up bright, sun-exposed interiors fast enough to get new listing photos out immediately.`,
      valley: `Rental turnover painting in ${cityName} is usually straightforward make-ready work where speed, patch quality, and durable finishes all matter.`,
      historic: `Rental turnover painting in ${cityName} often means balancing speed with the prep older walls and trim actually need.`,
      foothill: `Rental turnover painting in ${cityName} usually includes more patching and more surface cleanup than landlords expect in older homes.`,
      urban: `Rental turnover painting in ${cityName} is a common need in condos, duplexes, and small houses where vacant days cost real money.`,
    },
    'wallpaper-removal': {
      luxury: `Wallpaper removal in ${cityName} is usually tied to powder rooms, dining rooms, and designer spaces where the old finish no longer fits the house.`,
      coastal: `Wallpaper removal in ${cityName} often happens in beach-adjacent interiors where owners want cleaner walls and less visual weight.`,
      valley: `Wallpaper removal in ${cityName} usually means peeling old feature walls back to a clean paint-ready surface without damaging the drywall underneath.`,
      historic: `Wallpaper removal in ${cityName} often has to deal with older walls, multiple paper layers, and adhesive residue from remodels decades apart.`,
      foothill: `Wallpaper removal in ${cityName} often leads straight into skim coating and repainting because the older wall surface needs more repair afterward.`,
      urban: `Wallpaper removal in ${cityName} often focuses on one or two rooms where style has changed faster than the wall finish.`,
    },
    'ceiling-painting': {
      luxury: `Ceiling painting in ${cityName} usually means higher ceilings, more side light, and bigger rooms where uneven rolling stands out immediately.`,
      coastal: `Ceiling painting in ${cityName} often aims to brighten rooms with big daylight and hide old stains or cut lines that show up in coastal light.`,
      valley: `Ceiling painting in ${cityName} is often the quickest way to clean up rooms that feel dingy after years of heat, HVAC dust, and family wear.`,
      historic: `Ceiling painting in ${cityName} often means working around older plaster, repair patches, and corners that are not perfectly square.`,
      foothill: `Ceiling painting in ${cityName} usually comes with stain blocking, crack repair, or texture cleanup before the white ever goes on.`,
      urban: `Ceiling painting in ${cityName} often happens in smaller rooms where a bright, flat ceiling makes the whole interior feel cleaner instantly.`,
    },
    'garage-painting': {
      luxury: `Garage painting in ${cityName} usually turns a dusty storage room into a cleaner extension of the house, often with better lighting and floor performance.`,
      coastal: `Garage painting in ${cityName} often focuses on brighter walls, cleaner slabs, and coatings that can handle beach gear, bikes, and moisture.`,
      valley: `Garage painting in ${cityName} is usually practical work: brighter walls, a cleaner floor, and a space that can take heat, tools, and family storage.`,
      historic: `Garage painting in ${cityName} often means detached structures, older slabs, and wall surfaces that need more prep than a new build would.`,
      foothill: `Garage painting in ${cityName} usually includes more slab prep and more dust control because foothill conditions travel right into the garage.`,
      urban: `Garage painting in ${cityName} is often about making a compact garage feel cleaner, brighter, and easier to organize.`,
    },
    'wood-deck-staining': {
      luxury: `Wood and deck staining in ${cityName} usually protects outdoor living spaces that sit close to finished landscaping, pools, and high-visibility entertaining areas.`,
      coastal: `Wood and deck staining in ${cityName} is about fighting sun, salt, and moisture before the boards gray out or start checking badly.`,
      valley: `Wood and deck staining in ${cityName} often means reviving dry, sun-beaten fences, pergolas, and backyard decks that have taken years of heat.`,
      historic: `Wood and deck staining in ${cityName} often has to respect older railings, porches, and outdoor woodwork that needs a softer, better-prepped touch.`,
      foothill: `Wood and deck staining in ${cityName} usually deals with tree debris, foothill dust, and outdoor wood that needs regular maintenance to stay sound.`,
      urban: `Wood and deck staining in ${cityName} often focuses on smaller decks, gates, and fences where clean prep makes a big visual difference fast.`,
    },
  };
  return maps[slug][profile];
}

function buildMatrixSections(serviceSlug, citySlug, SERVICES, CITIES, PRICING) {
  const serviceName = serviceNameBySlug(SERVICES, serviceSlug);
  const cityName = cityNameBySlug(CITIES, citySlug);
  const service = SERVICE_DETAILS[serviceSlug];
  const city = CITY_META[citySlug];
  const modifier = cityModifier(citySlug);
  const tiers = getAdjustedTiers(serviceSlug, modifier, PRICING);
  const introLocal = profileAngle(serviceSlug, citySlug, cityName);

  const localSection = combineHtml([
    paragraph(introLocal),
    paragraph(`We see that reality on streets like ${city.streets[0]}, ${city.streets[1]}, and ${city.streets[2]}. The houses around ${city.landmarks[0]} and ${city.landmarks[1]} tell the same story. Surface condition, access, and finish expectations are what shape the job. That is why a good ${serviceName.toLowerCase()} scope in ${cityName} starts with a walkthrough, not a copy-paste estimate.`),
    paragraph(`What clients usually want is not complicated. They want the surface to look clean, feel intentional, and hold up after the crew leaves. The way to get there is by matching the scope to the house, which is especially important in ${cityName} because the spread between property types is wide even within a few blocks.`),
    paragraph(`The housing stock here matters. ${city.housingStock.join(', ')} each behave differently once prep starts. Some need more masking, some need wider patching, some need stronger primers, and some simply need more labor because the finish standard is tighter. A contractor who misses that difference usually either underprices the job or leaves the owner with a finish that never quite looks right.`),
  ]);

  const prepSection = combineHtml([
    paragraph(`${serviceName} only looks clean at the end when the prep plan fits both the service and the house. For jobs in ${cityName}, we usually begin with ${service.prep[0]}, then ${service.prep[1]}, then ${service.prep[2]}, and finally ${service.prep[3]}. That sounds straightforward, but each step has to be adapted to the actual conditions in front of us.`),
    paragraph(`In this city, the prep is shaped by ${city.climate}. Add in ${city.signature}, and you get why the same service can feel simple in one neighborhood and surprisingly detailed in another. If the job is occupied, we also build around daily cleanup, protection of adjacent finishes, and the reality that homeowners still have to live in the space.`),
    paragraph(`When the scope overlaps with related work like <a href="/${service.relatedServices[0]}/${citySlug}">${serviceNameBySlug(SERVICES, service.relatedServices[0])} in ${cityName}</a> or <a href="/${service.relatedServices[1]}/${citySlug}">${serviceNameBySlug(SERVICES, service.relatedServices[1])} in ${cityName}</a>, we sequence everything so one trade does not undo the last one.`),
    list(service.prep.map((item) => `Prep step for ${serviceName.toLowerCase()}: ${item}.`)),
  ]);

  const pricingSection = combineHtml([
    paragraph(`${serviceName} pricing in ${cityName} starts around ${dollars(tiers[0].min)} to ${dollars(tiers[0].max)} for ${tiers[0].label.toLowerCase()} work. Larger scopes land around ${dollars(tiers[tiers.length - 1].min)} to ${dollars(tiers[tiers.length - 1].max)}${tiers[tiers.length - 1].plus ? '+' : ''}. Those ranges reflect the city modifier, which matters because ${cityName} does not run on the same labor conditions as every other part of Los Angeles.`),
    paragraph(`The biggest price swings come from prep and access. If the surface has contamination, failed caulk, old repairs, long trim runs, tight masking conditions, or staging limits, the labor grows. If the job is straightforward and the surfaces are already stable, it stays closer to the low end. That is true in every city, but the way it plays out in ${cityName} is different because of the local housing stock and site logistics.`),
    paragraph(`That is why we would rather show a realistic range than a single teaser number. Real houses have variables, and good estimates leave room for them instead of pretending they are not there.`),
    paragraph(`We price the work to finish correctly, not to win the bid and patch the missing prep later. That means the quote shows what is in scope, what the likely trouble spots are, and where the project could move higher if the surface condition is worse than it looked at first glance.`),
  ]);

  const finishSection = combineHtml([
    paragraph(`Material choice in ${cityName} still comes back to use case. For ${serviceName.toLowerCase()}, we pay attention to ${service.finishNotes[0]}, ${service.finishNotes[1]}, ${service.finishNotes[2]}, and ${service.finishNotes[3]}. In other words, we do not just ask what color the client wants. We ask how the surface is used, how the light hits it, and how much wear it takes week to week.`),
    paragraph(`${city.housingNote}. That pushes finish choices in a more practical direction. In a family-heavy house, washability and cure time matter. In a design-led home, side light and smoothness matter more. In rental or turnover work, speed and durability matter. The right answer changes with the property, which is why we do not pretend there is a single best coating for every job.`),
    paragraph(`We also explain what the finish will and will not hide. Rough grain, old patching, uneven texture, and weathered substrate can be improved a lot, but they do not disappear by magic. Setting that expectation upfront is part of doing the job honestly.`),
    paragraph(`The goal is to leave the finish looking intentional, not merely fresh. That means the final product has to fit the room, the neighborhood, and the way the owner uses the property.`),
  ]);

  const scheduleSection = combineHtml([
    paragraph(`${service.timeline} In ${cityName}, that timeline can tighten or stretch based on access, weather, occupancy, and the amount of real prep in the house. Condos bring elevator reservations and parking rules. Hillside homes bring staging limits. Gated properties bring entry coordination. Older homes bring more repair work than anybody hoped for. We account for those conditions early so the schedule still makes sense once work starts.`),
    paragraph(city.hoaContext
      ? `${city.hoaContext} That does not make the project impossible. It just means the schedule and staging plan have to be built around reality.`
      : `Even without heavy HOA restrictions, ${cityName} projects still run better when parking, deliveries, and neighbor-sensitive work windows are planned before day one.`),
    paragraph(`A clean schedule also protects the finish. When crews rush because the sequence was poorly planned, touch-ups pile up and cure time gets compromised. We would rather write the honest calendar and hit it than promise a fantasy timeline that creates rework later.`),
    paragraph(`Clients notice the difference quickly. Crews that understand the city move cleanly, protect the site, and finish when they said they would. Crews that do not understand it usually burn time on avoidable problems.`),
  ]);

  const localLinkSection = combineHtml([
    paragraph(`If you are pricing ${serviceName.toLowerCase()} in ${cityName}, it usually helps to compare it against the related scopes homeowners bundle in the same visit. Start with <a href="/${serviceSlug}">${serviceName}</a> for the city-agnostic service overview, then compare nearby scopes like <a href="/${service.relatedServices[0]}/${citySlug}">${serviceNameBySlug(SERVICES, service.relatedServices[0])} in ${cityName}</a>, <a href="/${service.relatedServices[1]}/${citySlug}">${serviceNameBySlug(SERVICES, service.relatedServices[1])} in ${cityName}</a>, and <a href="/${service.relatedServices[2]}/${citySlug}">${serviceNameBySlug(SERVICES, service.relatedServices[2])} in ${cityName}</a>.`),
    paragraph(`You can also compare nearby markets if you are moving between neighborhoods or managing more than one property. Related area pages include ${city.nearbyCities.map((nearby) => `<a href="/areas/${nearby}">${cityNameBySlug(CITIES, nearby)}</a>`).join(', ')}. Those pages show how the same work changes once the housing stock and pricing modifier shift.`),
    paragraph(`That cross-check is useful because it helps homeowners separate the service itself from the city conditions around it. Once you see both pieces clearly, the quote stops feeling abstract and starts reading like a real project plan.`),
    paragraph(`It also helps you decide what to bundle now and what to stage for later. That kind of sequencing is where a lot of residential budgets are won or lost.`),
    paragraph(`That context is what turns a guess into a real scope. The city matters. The service matters. The condition of the actual house matters most.`),
  ]);

  return [
    { heading: `How ${serviceName} Projects Usually Look in ${cityName}`, level: 'h2', body: localSection },
    { heading: `Prep Work That Matters on ${cityName} Homes`, level: 'h2', body: prepSection },
    { heading: `What ${serviceName} Costs in ${cityName}`, level: 'h2', body: pricingSection },
    { heading: `Materials and Finish Choices for This Market`, level: 'h2', body: finishSection },
    { heading: `Scheduling, Access, and Day-to-Day Job Flow`, level: 'h2', body: scheduleSection },
    { heading: `Related Work Homeowners Bundle in ${cityName}`, level: 'h2', body: localLinkSection },
  ];
}

function buildMatrixFaqs(serviceSlug, citySlug, SERVICES, CITIES, PRICING) {
  const serviceName = serviceNameBySlug(SERVICES, serviceSlug);
  const cityName = cityNameBySlug(CITIES, citySlug);
  const tiers = getAdjustedTiers(serviceSlug, cityModifier(citySlug), PRICING);
  return [
    {
      question: `How much does ${serviceName.toLowerCase()} cost in ${cityName}?`,
      answer: `${serviceName} in ${cityName} usually starts around ${dollars(tiers[0].min)} to ${dollars(tiers[0].max)} for ${tiers[0].label.toLowerCase()} work. Larger scopes land around ${dollars(tiers[tiers.length - 1].min)} to ${dollars(tiers[tiers.length - 1].max)}${tiers[tiers.length - 1].plus ? '+' : ''}, depending on prep and access.`,
    },
    {
      question: `What makes ${serviceName.toLowerCase()} harder or more expensive in ${cityName}?`,
      answer: `The biggest drivers are surface condition, access, and finish expectations. In ${cityName}, housing style and site logistics can change the labor a lot, especially if the property has tighter access, more prep, or higher finish standards.`,
    },
    {
      question: `Can you bundle related work with ${serviceName.toLowerCase()} in ${cityName}?`,
      answer: `Yes. We often pair ${serviceName.toLowerCase()} with ${serviceNameBySlug(SERVICES, SERVICE_DETAILS[serviceSlug].relatedServices[0]).toLowerCase()}, ${serviceNameBySlug(SERVICES, SERVICE_DETAILS[serviceSlug].relatedServices[1]).toLowerCase()}, or ${serviceNameBySlug(SERVICES, SERVICE_DETAILS[serviceSlug].relatedServices[2]).toLowerCase()} so the job is sequenced once and finished cleanly.`,
    },
  ];
}

function buildMatrixPage(serviceSlug, citySlug, SERVICES, CITIES, PRICING) {
  const serviceName = serviceNameBySlug(SERVICES, serviceSlug);
  const cityName = cityNameBySlug(CITIES, citySlug);
  const detail = SERVICE_DETAILS[serviceSlug];
  const tiers = getAdjustedTiers(serviceSlug, cityModifier(citySlug), PRICING);
  const relatedMatrixPages = detail.relatedServices.slice(0, 3).map((slug) => `${slug}/${citySlug}`);
  return {
    serviceSlug,
    citySlug,
    serviceName,
    cityName,
    titleTag: `${serviceName} ${cityName} CA | Red Stag Painting`,
    metaDescription: matrixMetaDescription(serviceName, cityName, tiers),
    h1: `${serviceName} in ${cityName}, CA`,
    primaryKeyword: `${serviceName.toLowerCase()} ${cityName}`,
    secondaryKeywords: [
      `${serviceName.toLowerCase()} ${cityName} ca`,
      `${serviceName.toLowerCase()} near ${cityName}`,
      `${cityName} ${serviceName.toLowerCase()} cost`,
    ],
    canonical: `/${serviceSlug}/${citySlug}`,
    ogTitle: `${serviceName} in ${cityName} | Red Stag Painting`,
    ogDescription: `${serviceName} in ${cityName} with city-specific pricing, prep, and local job planning.`,
    heroImage: detail.heroImage,
    heroImageAlt: `${serviceName} project in ${cityName}`,
    heroSubtitle: `${profileAngle(serviceSlug, citySlug, cityName)} We price the job around the actual house, not around a generic LA average.`,
    introAnswer: introFromTiers(serviceName, cityName, tiers),
    sections: buildMatrixSections(serviceSlug, citySlug, SERVICES, CITIES, PRICING),
    pricePerSqFt: detail.pricePerSqFt,
    pricingTiers: tiers,
    faqs: buildMatrixFaqs(serviceSlug, citySlug, SERVICES, CITIES, PRICING),
    parentService: serviceSlug,
    parentCity: citySlug,
    relatedMatrixPages,
  };
}

function blogStatsForService(serviceSlug, serviceName, PRICING) {
  const tiers = getServiceTiers(serviceSlug, PRICING);
  return {
    low: dollars(tiers[0].min),
    lowMax: dollars(tiers[0].max),
    highMin: dollars(tiers[tiers.length - 1].min),
    highMax: dollars(tiers[tiers.length - 1].max),
    highPlus: tiers[tiers.length - 1].plus ? '+' : '',
    tiers,
    serviceName,
  };
}

function buildBlogSections(topic, SERVICES, CITIES, PRICING) {
  const serviceName = serviceNameBySlug(SERVICES, topic.service);
  const stats = blogStatsForService(topic.service, serviceName, PRICING);
  const cityNames = topic.cities.map((slug) => cityNameBySlug(CITIES, slug));

  const opening = combineHtml([
    paragraph(`${serviceName} questions in Los Angeles usually start with two numbers: what is the likely range and what pushes a job out of it. For this topic, the working range to keep in your head is ${stats.low} to ${stats.lowMax} at the entry level and ${stats.highMin} to ${stats.highMax}${stats.highPlus} once the scope gets larger, more detailed, or more prep-heavy.`),
    paragraph(`Those numbers show up across jobs in ${cityNames.join(', ')}, but the reason they move is almost always the same. Surface condition, access, finish expectations, and schedule pressure change the labor first. Paint is part of the budget, but labor is what decides whether a quote is smart or just cheap.`),
    paragraph(`This guide is written the way we explain it in a walkthrough: direct, number-driven, and tied to the real work. No filler. Just what changes the job, how to budget it, and where homeowners usually misread the scope.`),
  ]);

  const costSection = combineHtml([
    paragraph(`A lot of homeowners hear a low number early and assume the rest of the bids are padded. Most of the time, the opposite is true. The low quote simply leaves out prep. When a room, cabinet set, ceiling, or exterior surface looks rough, the steps that make the finish hold add hours fast. Sanding, masking, patching, priming, degreasing, moving furniture, resetting hardware, and daily cleanup are where the real difference shows up.`),
    paragraph(`For Los Angeles work, the practical benchmark is this: basic scopes sit closer to ${stats.low} to ${stats.lowMax}. Bigger or more detailed jobs sit closer to ${stats.highMin} to ${stats.highMax}${stats.highPlus}. In neighborhoods like ${cityNames[0]} or ${cityNames[1]}, access and finish expectations can push the labor harder. In easier-access neighborhoods, the same service may stay closer to the lower bands if the substrate is clean and the scope is simple.`),
    paragraph(`The mistake is comparing bids without comparing what is actually included. If one contractor is counting protection, prep, two full coats, and a walkthrough touch-up, while another is counting a fast cosmetic pass, those are not the same product even if the service name sounds identical.`),
  ]);

  const driversSection = combineHtml([
    paragraph(`The fastest way to understand a quote is to ask what the contractor sees when they look at the surface. Is there old failure? Is there contamination? Is the house occupied? Are there access limits? Is the client asking for a tighter finish than the substrate naturally wants to give? Those answers predict the price better than square footage alone.`),
    paragraph(`Take the same service across three neighborhoods. In ${cityNames[0]}, the issue might be premium finishes and a tighter visual standard. In ${cityNames[1]}, it might be bright side light or coastal exposure. In ${cityNames[2]}, it might be speed, family wear, or builder-grade materials that need more prep before they can be upgraded. The city does not change the basic trade. It changes how the trade gets executed.`),
    paragraph(`That is why cost guides that ignore local conditions are usually off by 10 to 30 percent in one direction or the other. They give a number without the labor story behind it. Homeowners end up budgeting for the wrong version of the job.`),
    list([
      `Low-end benchmark for ${serviceName.toLowerCase()}: ${stats.low} to ${stats.lowMax}.`,
      `Upper working range for larger scopes: ${stats.highMin} to ${stats.highMax}${stats.highPlus}.`,
      `Most common hidden driver: prep work that is obvious in person and invisible in listing photos.`,
    ]),
  ]);

  const planningSection = combineHtml([
    paragraph(`Planning the job well saves money because it prevents stop-start labor. If the scope includes related work, group it intelligently. For example, pairing <a href="/${topic.service}">${serviceName}</a> with <a href="/${SERVICE_DETAILS[topic.service].relatedServices[0]}">${serviceNameBySlug(SERVICES, SERVICE_DETAILS[topic.service].relatedServices[0])}</a> or <a href="/${SERVICE_DETAILS[topic.service].relatedServices[1]}">${serviceNameBySlug(SERVICES, SERVICE_DETAILS[topic.service].relatedServices[1])}</a> often cuts down duplicate setup and touch-up.`),
    paragraph(`You should also make decisions before the crew arrives. Colors, sheen, room order, access rules, pets, parking, gate codes, HOA requirements, and furniture handling all affect production. Every late decision costs time. Time costs money. That sounds obvious, but it is one of the main reasons a well-planned repaint stays smooth while a poorly planned one feels expensive.`),
    paragraph(`Occupied homes need even more planning. A contractor who protects the right rooms, sequences drying times, and cleans daily will finish faster than a crew that moves chaotically. Organized work saves time because it avoids rework and keeps the space usable.`),
  ]);

  const mistakeSection = combineHtml([
    paragraph(`The most common homeowner mistake is budgeting only for the visible finish instead of the substrate under it. The second most common mistake is buying the cheapest bid without asking what was removed to get there. Usually the missing items are the exact steps that make the finish last: prep, primer, door removal, dust control, dry time, cure time, or final touch-ups.`),
    paragraph(`The third mistake is trying to value-engineer the wrong part of the project. If the house needs more prep, cheaper paint will not save it. If the job needs better protection and access planning, less masking will not help. The smarter move is to simplify the scope honestly: fewer rooms, fewer surfaces, or a staged approach. That protects the finish standard instead of hollowing it out.`),
    paragraph(`A useful rule is this: if the quote sounds surprisingly low, ask what the contractor expects the surface to look like when they leave. If the answer is vague, the bid probably is too.`),
  ]);

  const localSection = combineHtml([
    paragraph(`Los Angeles also punishes generic advice because housing stock changes so quickly. A repaint in <a href="/areas/${topic.cities[0]}">${cityNames[0]}</a> is not the same as the same label in <a href="/areas/${topic.cities[1]}">${cityNames[1]}</a>. Different access, different substrates, different expectations. Good local contractors price the reality, not the headline.`),
    paragraph(`That is why our service pages break the work down by area. If you are budgeting this scope in one of these neighborhoods, compare the city-specific pages directly: ${topic.cities.map((citySlug) => `<a href="/${topic.service}/${citySlug}">${serviceName} in ${cityNameBySlug(CITIES, citySlug)}</a>`).join(', ')}. Those pages explain how the same service shifts when the local housing and logistics change.`),
    paragraph(`The goal is not to make the job sound complicated. It is to show what the quote is actually paying for. Once homeowners understand that, the right price range makes much more sense.`),
  ]);

  const contractorSection = combineHtml([
    paragraph(`One of the easiest ways to protect your budget is to ask the contractor to walk you through the sequence of work. In a real residential project, there is always an order that keeps momentum and an order that creates rework. Repairs first, protection second, primer where needed, finish coats after the substrate is stable, and touch-ups at the end. If a contractor cannot explain that order clearly, they probably do not control it in the field either.`),
    paragraph(`You should also ask how they are handling cleanup and access. A crew that spends 20 minutes each morning looking for tools, moving furniture twice, or re-masking areas they rushed the day before is burning paid labor on avoidable chaos. On a 2-day or 4-day job, that inefficiency adds up faster than homeowners realize. Organized crews are not just easier to live with. They are cheaper in the long run because the hours produce better work.`),
    paragraph(`That is especially true in Los Angeles, where parking, HOA windows, elevators, gates, narrow side yards, and occupied homes all change production. Good contractors price those realities up front. Weak contractors discover them after the job starts and then blame the site for the overrun.`),
  ]);

  const decisionSection = combineHtml([
    paragraph(`If you are deciding whether to move ahead now or stage the project, use this filter: will doing it later create duplicate setup, duplicate masking, or duplicate touch-ups? If the answer is yes, there is usually value in bundling the work. That is why homeowners often pair this scope with <a href="/${SERVICE_DETAILS[topic.service].relatedServices[0]}">${serviceNameBySlug(SERVICES, SERVICE_DETAILS[topic.service].relatedServices[0])}</a> or <a href="/${SERVICE_DETAILS[topic.service].relatedServices[1]}">${serviceNameBySlug(SERVICES, SERVICE_DETAILS[topic.service].relatedServices[1])}</a>. A better sequence often saves 10 to 20 percent in labor compared with splitting everything into separate visits.`),
    paragraph(`If the project needs to be staged, stage it around the surfaces people see and use most. In some homes that means walls and ceilings first. In others it means cabinets, trim, or the front exterior elevation. The best staging plan is the one that delivers a complete-looking result at every stop, not the one that leaves three half-finished spaces behind.`),
    paragraph(`Homeowners who stage well usually make one more smart move: they lock the color and finish direction for the later phases early. That way the first phase does not need to be re-cut, repainted, or re-touched once the second phase starts.`),
    paragraph(`That is the contractor mindset homeowners should borrow: think in finished zones, real labor flow, and the next visible win. Once you think that way, budgets stop feeling random and start feeling manageable.`),
  ]);

  const closingSection = combineHtml([
    paragraph(`The short version is simple. Budget with real ranges, compare scope instead of just totals, and make decisions early enough that the crew can keep momentum. If you do that, you can tell the difference between a good value and a number that only looks good on paper.`),
    paragraph(`For hands-on pricing, start with <a href="/${topic.service}">${serviceName}</a> or jump straight to the area page that matches your property. If the house is in ${cityNames[0]}, ${cityNames[1]}, or ${cityNames[2]}, the local matrix pages will get you closer than any national average ever will.`),
    paragraph(`That is really the point of a good guide: not to replace a walkthrough, but to help you ask better questions before the walkthrough starts. Better questions usually lead to better quotes and fewer surprises.`),
    paragraph(`And if you are hiring a contractor, ask for the written scope. That one document will tell you more about the job than any sales pitch.`),
  ]);

  return [
    { heading: 'The Short Cost Answer', level: 'h2', body: opening },
    { heading: 'What Actually Moves the Price', level: 'h2', body: costSection },
    { heading: 'How to Read a Quote Like a Contractor', level: 'h2', body: driversSection },
    { heading: 'How to Plan the Scope Before Work Starts', level: 'h2', body: planningSection },
    { heading: 'The Mistakes That Blow Up Budgets', level: 'h2', body: mistakeSection },
    { heading: 'Why Local Conditions Matter in Los Angeles', level: 'h2', body: localSection },
    { heading: 'What Good Contractors Explain Before Work Starts', level: 'h2', body: contractorSection },
    { heading: 'How to Decide What to Bundle and What to Stage', level: 'h2', body: decisionSection },
    { heading: 'Bottom Line', level: 'h2', body: closingSection },
  ];
}

function buildBlogFaqs(topic, SERVICES, PRICING) {
  const serviceName = serviceNameBySlug(SERVICES, topic.service);
  const stats = blogStatsForService(topic.service, serviceName, PRICING);
  return [
    {
      question: `What is a realistic budget for ${serviceName.toLowerCase()} in Los Angeles?`,
      answer: `A realistic working range is ${stats.low} to ${stats.lowMax} on the lighter end and ${stats.highMin} to ${stats.highMax}${stats.highPlus} once the scope is larger, more detailed, or prep-heavy.`,
    },
    {
      question: `Why do two quotes for the same ${serviceName.toLowerCase()} job come in so far apart?`,
      answer: `The difference is usually prep, protection, access, and finish standard. Two bids can use the same service name while describing very different amounts of work.`,
    },
    {
      question: `What should I ask a painter before I approve this kind of project?`,
      answer: `Ask what prep is included, how many coats are planned, what could move the price higher, how long the job should take, and what the finish is expected to look like when the crew leaves.`,
    },
    {
      question: `Is it smarter to bundle related paint work at the same time?`,
      answer: `Usually yes. When related scopes are sequenced in one visit, you avoid duplicate setup, reduce touch-ups, and keep the finish more consistent from room to room or surface to surface.`,
    },
  ];
}

function buildBlogPost(topic, SERVICES, CITIES, PRICING) {
  const serviceName = serviceNameBySlug(SERVICES, topic.service);
  const sections = buildBlogSections(topic, SERVICES, CITIES, PRICING);
  const words = wordCountFromSections(sections) + topic.title.split(/\s+/).length;
  return {
    slug: topic.slug,
    titleTag: `${topic.title} | Red Stag Painting`,
    metaDescription: blogMetaDescription(topic.title),
    h1: topic.title,
    primaryKeyword: topic.title.replace(/\?/g, '').toLowerCase(),
    secondaryKeywords: [
      `${serviceName.toLowerCase()} cost los angeles`,
      `${serviceName.toLowerCase()} estimate`,
      `${serviceName.toLowerCase()} how to`,
      `${serviceName.toLowerCase()} guide`,
    ],
    canonical: `/blog/${topic.slug}`,
    ogTitle: `${topic.title} | Red Stag Painting`,
    ogDescription: `Los Angeles guide to ${serviceName.toLowerCase()} pricing, planning, and contractor-level scope decisions.`,
    author: 'Israel Aquino',
    publishedDate: '2026-04-04',
    lastUpdatedDate: '2026-04-04',
    category: topic.category,
    readTime: Math.max(8, Math.round(words / 200)),
    heroImage: SERVICE_DETAILS[topic.service].heroImage,
    heroImageAlt: `${serviceName} project in Los Angeles`,
    introAnswer: `For Los Angeles homeowners, ${serviceName.toLowerCase()} cost and planning come down to scope, prep, and timing. Most jobs start near ${dollars(getServiceTiers(topic.service, PRICING)[0].min)} to ${dollars(getServiceTiers(topic.service, PRICING)[0].max)} and move up fast when the surfaces, access, or finish standard get more demanding.`,
    sections,
    faqs: buildBlogFaqs(topic, SERVICES, PRICING),
    relatedServices: [topic.service, ...SERVICE_DETAILS[topic.service].relatedServices.slice(0, 2)],
    relatedCities: topic.cities,
    relatedPosts: topic.relatedPosts,
  };
}

function serializeData(importType, objName, obj) {
  return `import type { ${importType} } from '@/data/types';\n\nconst ${objName}: ${importType} = ${JSON.stringify(obj, null, 2)};\n\nexport default ${objName};\n`;
}

async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const bannedPhrases = [
  'bustling city',
  'vibrant community',
  "whether you're looking",
  'our team of experienced',
  'nestled in',
  'look no further',
  "in today's world",
];

let globalServices = [];
let globalCities = [];

function validatePageCollection(collection, minWordCount, label) {
  for (const page of collection) {
    const sectionWords = wordCountFromSections(page.sections);
    assert(sectionWords >= minWordCount, `${label} ${page.slug ?? `${page.serviceSlug}/${page.citySlug}`} is short: ${sectionWords} words`);
    const blob = JSON.stringify(page).toLowerCase();
    for (const phrase of bannedPhrases) {
      assert(!blob.includes(phrase), `${label} contains banned phrase "${phrase}"`);
    }
    const hrefs = JSON.stringify(page.sections).match(/href":"([^"]+)"/g) ?? [];
    for (const hrefChunk of hrefs) {
      const href = hrefChunk.match(/href":"([^"]+)"/)?.[1] ?? '';
      assert(href.startsWith('/'), `${label} has non-relative link ${href}`);
    }
  }
}

function validateSeoUniqueness(allPages) {
  const fields = ['titleTag', 'metaDescription', 'h1'];
  for (const field of fields) {
    const seen = new Map();
    for (const page of allPages) {
      const value = page[field];
      assert(value, `Missing ${field}`);
      assert(!seen.has(value), `Duplicate ${field}: ${value}`);
      seen.set(value, true);
    }
  }
}

async function generate() {
  const { SERVICES, CITIES, PRICING, PRICE_ANCHORS } = await loadConstants();
  globalServices = SERVICES;
  globalCities = CITIES;

  const servicePages = SERVICES.map((service) => buildServicePage(service.slug, SERVICES, PRICING, PRICE_ANCHORS));
  const cityPages = CITIES.map((city) => buildCityPage(city.slug, CITIES, SERVICES, PRICING));
  const matrixPages = SERVICES.flatMap((service) => CITIES.map((city) => buildMatrixPage(service.slug, city.slug, SERVICES, CITIES, PRICING)));
  const blogPosts = BLOG_TOPICS.map((topic) => buildBlogPost(topic, SERVICES, CITIES, PRICING));

  validatePageCollection(servicePages, 2000, 'service');
  validatePageCollection(cityPages, 1500, 'city');
  validatePageCollection(matrixPages, 1200, 'matrix');
  validatePageCollection(blogPosts, 1500, 'blog');

  for (const page of servicePages) {
    assert(page.sections.length >= 6 && page.sections.length <= 10, `service ${page.slug} must have 6-10 sections`);
    assert(page.titleTag.length < 60, `service ${page.slug} title too long`);
    assert(page.metaDescription.length < 155, `service ${page.slug} meta too long`);
    assert(page.faqs.length === 5, `service ${page.slug} must have 5 FAQs`);
  }

  for (const page of cityPages) {
    assert(page.faqs.length >= 3 && page.faqs.length <= 4, `city ${page.slug} FAQ count invalid`);
  }

  for (const page of matrixPages) {
    assert(page.faqs.length >= 2 && page.faqs.length <= 3, `matrix ${page.serviceSlug}/${page.citySlug} FAQ count invalid`);
  }

  for (const post of blogPosts) {
    const words = wordCountFromSections(post.sections);
    assert(words >= 1500 && words <= 2500, `blog ${post.slug} word count ${words} outside 1500-2500`);
    assert(post.faqs.length >= 3 && post.faqs.length <= 4, `blog ${post.slug} FAQ count invalid`);
  }

  validateSeoUniqueness([
    ...servicePages,
    ...cityPages,
    ...matrixPages,
    ...blogPosts,
  ]);

  for (const page of servicePages) {
    await writeFile(path.join(servicesDir, `${page.slug}.ts`), serializeData('ServicePageData', 'data', page));
  }

  for (const page of cityPages) {
    await writeFile(path.join(citiesDir, `${page.slug}.ts`), serializeData('CityPageData', 'data', page));
  }

  for (const page of matrixPages) {
    await writeFile(
      path.join(matrixDir, page.serviceSlug, `${page.citySlug}.ts`),
      serializeData('MatrixPageData', 'data', page),
    );
  }

  for (const post of blogPosts) {
    await writeFile(path.join(blogDir, `${post.slug}.ts`), serializeData('BlogPostData', 'data', post));
  }

  const blogIndexContent = `import type { BlogPostData } from '@/data/types';\n\nexport interface BlogIndexEntry {\n  slug: string;\n  title: string;\n  category: string;\n  publishedDate: string;\n}\n\nexport const blogIndex: BlogIndexEntry[] = ${JSON.stringify(blogPosts.map((post) => ({ slug: post.slug, title: post.h1, category: post.category, publishedDate: post.publishedDate })), null, 2)};\n\nexport async function getBlogData(slug: string): Promise<BlogPostData | null> {\n  try {\n    const mod = await import(\`./\${slug}\`);\n    return mod.default as BlogPostData;\n  } catch {\n    return null;\n  }\n}\n`;
  await writeFile(path.join(blogDir, 'index.ts'), blogIndexContent);

  console.log(`Generated ${servicePages.length} service pages, ${cityPages.length} city pages, ${matrixPages.length} matrix pages, and ${blogPosts.length} blog posts.`);
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
