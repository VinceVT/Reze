export type Ingredient = {
  name: string;
  dose: string;
  purpose: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  accent: "day" | "night" | "duo" | "core";
  format: string;
  priceOneTime: number;
  priceSubscription: number;
  comingSoon?: boolean;
  ritual: string;
  benefits: string[];
  ingredients: Ingredient[];
  faq: FaqItem[];
};

export const products: Product[] = [
  {
    slug: "day",
    name: "REZE Day",
    shortName: "Day",
    tagline: "Daily Support",
    description:
      "A single 5g morning packet formulated for steady energy, clear focus, and cellular defense — without the spike-and-crash of stimulants.",
    accent: "day",
    format: "30 × 5g packets",
    priceOneTime: 60,
    priceSubscription: 48,
    ritual:
      "Tear one packet into 8–12 oz of cold water within an hour of waking. Take with or without food.",
    benefits: [
      "Sustained mental energy without jitters*",
      "Sharper focus and working memory*",
      "Healthy stress response through the day*",
      "Morning hydration and micronutrient base*",
    ],
    ingredients: [
      {
        name: "Lion's Mane extract",
        dose: "500 mg",
        purpose: "Supports nerve growth factor and mental clarity*",
      },
      {
        name: "Rhodiola rosea (3% rosavins)",
        dose: "300 mg",
        purpose: "Adaptogen studied for fatigue and stress resilience*",
      },
      {
        name: "Bacopa monnieri (50% bacosides)",
        dose: "300 mg",
        purpose: "Supports memory consolidation with consistent use*",
      },
      {
        name: "L-Theanine",
        dose: "200 mg",
        purpose: "Smooths alertness; calm, focused attention*",
      },
      {
        name: "Vitamin D3 + K2",
        dose: "2000 IU / 90 µg",
        purpose: "Daily foundation for immune and bone health*",
      },
      {
        name: "Methylated B-complex",
        dose: "Full spectrum",
        purpose: "Bioavailable B12 and folate for energy metabolism*",
      },
      {
        name: "Electrolyte blend",
        dose: "Na · K · Mg",
        purpose: "Morning rehydration after the overnight fast*",
      },
    ],
    faq: [
      {
        q: "Does REZE Day contain caffeine?",
        a: "No. Day is stimulant-free by design. It pairs well with your normal coffee or tea — L-theanine in the formula smooths caffeine's edge if you drink it.",
      },
      {
        q: "What does it taste like?",
        a: "Light citrus-yuzu, lightly sweetened with monk fruit. No artificial sweeteners, colors, or flavors.",
      },
      {
        q: "When will I notice a difference?",
        a: "Hydration and alertness effects are same-day. Adaptogens like rhodiola and bacopa build over 2–6 weeks of consistent use — that's why we formulated it as a daily ritual, not a rescue shot.",
      },
      {
        q: "Can I take it with REZE Night?",
        a: "Yes — they're designed as a system. Day supports your waking hours; Night supports wind-down and recovery. The Reset Duo bundles both.",
      },
    ],
  },
  {
    slug: "night",
    name: "REZE Night",
    shortName: "Night",
    tagline: "Nighttime Support",
    description:
      "A melatonin-free 5g evening packet built around magnesium, glycine, and apigenin — to help you fall asleep naturally and wake without grogginess.",
    accent: "night",
    format: "30 × 5g packets",
    priceOneTime: 60,
    priceSubscription: 48,
    ritual:
      "Mix one packet into warm or cold water 30–60 minutes before bed, as screens go off.",
    benefits: [
      "Fall asleep faster, naturally*",
      "Deeper, more continuous sleep*",
      "No next-morning grogginess*",
      "Melatonin-free — no dependence, no vivid-dream hangover",
    ],
    ingredients: [
      {
        name: "Magnesium bisglycinate",
        dose: "300 mg",
        purpose: "The most absorbable form for muscle and nervous-system relaxation*",
      },
      {
        name: "L-Glycine",
        dose: "3 g",
        purpose: "Lowers core body temperature to support sleep onset*",
      },
      {
        name: "Apigenin",
        dose: "50 mg",
        purpose: "Chamomile-derived flavonoid that quiets a racing mind*",
      },
      {
        name: "L-Theanine",
        dose: "200 mg",
        purpose: "Promotes alpha-wave relaxation without sedation*",
      },
      {
        name: "Tart cherry extract",
        dose: "480 mg",
        purpose: "Natural micro-dose melatonin precursor and recovery support*",
      },
      {
        name: "GABA",
        dose: "100 mg",
        purpose: "Supports the brain's own off-switch signaling*",
      },
    ],
    faq: [
      {
        q: "Why no melatonin?",
        a: "Supplemental melatonin doses are often 10–30× physiological levels, and many people report grogginess and tolerance. Night works upstream — magnesium, glycine, and apigenin support your body's own melatonin production instead of replacing it.",
      },
      {
        q: "Will it make me drowsy like a sleep aid?",
        a: "No. Night promotes relaxation rather than sedation. You should feel calm and ready for sleep, not knocked out — and you can still get up safely if you need to.",
      },
      {
        q: "What does it taste like?",
        a: "Warm chamomile-lavender with a touch of honeyed vanilla. Designed to be a wind-down ritual in itself.",
      },
      {
        q: "Is it habit-forming?",
        a: "No ingredient in Night creates dependence. Every input supports pathways your body already uses to fall asleep.",
      },
    ],
  },
  {
    slug: "reset-duo",
    name: "The Reset Duo",
    shortName: "Duo",
    tagline: "Day + Night System",
    description:
      "The complete circadian system in one box: 30 Day packets and 30 Night packets, sequenced to support energy, focus, sleep, and recovery around the clock.",
    accent: "duo",
    format: "60 × 5g packets · 30 Day + 30 Night",
    priceOneTime: 110,
    priceSubscription: 88,
    ritual:
      "Day within an hour of waking. Night 30–60 minutes before bed. One box, one month, both halves of your day.",
    benefits: [
      "Full 24-hour formulation coverage",
      "Better sleep compounds into better days*",
      "Save $8/mo versus buying separately",
      "One delivery, one ritual, zero decisions",
    ],
    ingredients: [
      {
        name: "REZE Day",
        dose: "30 packets",
        purpose: "Lion's mane, rhodiola, bacopa, theanine, D3+K2, B-complex, electrolytes",
      },
      {
        name: "REZE Night",
        dose: "30 packets",
        purpose: "Magnesium bisglycinate, glycine, apigenin, theanine, tart cherry, GABA",
      },
    ],
    faq: [
      {
        q: "Is the Duo cheaper than buying both?",
        a: "Yes. On subscription the Duo is $88/month versus $96 for Day and Night separately — and one-time purchases save $10.",
      },
      {
        q: "Can I gift it?",
        a: "The Duo ships in the magnetic-closure gift box with both formulas seated inside. Add a note at checkout and we'll print it on the inner lid card.",
      },
      {
        q: "Do the formulas interact?",
        a: "They're designed together. L-theanine appears in both at complementary doses, and nothing in Day lingers long enough to interfere with Night.",
      },
    ],
  },
  {
    slug: "core",
    name: "REZE Core",
    shortName: "Core",
    tagline: "Longevity Support",
    description:
      "Our third formulation, in final clinical review: NAD+ precursors paired with liposomal glutathione — the two molecules your cells spend down as you age. One packet, once a day, decades in mind.",
    accent: "core",
    format: "30 × 5g packets",
    priceOneTime: 90,
    priceSubscription: 72,
    comingSoon: true,
    ritual: "One packet, any time of day. Designed to sit between Day and Night as your cellular foundation.",
    benefits: [
      "Supports NAD+ levels that decline ~50% by midlife*",
      "Master-antioxidant glutathione, in absorbable liposomal form*",
      "Supports cellular energy and DNA repair pathways*",
      "Third-party tested for purity and dose accuracy",
    ],
    ingredients: [
      {
        name: "NMN (β-nicotinamide mononucleotide)",
        dose: "500 mg",
        purpose: "Direct NAD+ precursor for cellular energy and repair*",
      },
      {
        name: "Liposomal glutathione",
        dose: "250 mg",
        purpose: "The body's master antioxidant, protected for absorption*",
      },
      {
        name: "Trans-resveratrol",
        dose: "150 mg",
        purpose: "Works with NAD+ to support sirtuin longevity pathways*",
      },
      {
        name: "TMG (trimethylglycine)",
        dose: "500 mg",
        purpose: "Methyl-donor support alongside NAD+ precursors*",
      },
    ],
    faq: [
      {
        q: "When does Core launch?",
        a: "We're finalizing third-party testing on the liposomal delivery system now. Waitlist members get first allocation and founding-member pricing locked for life.",
      },
      {
        q: "Why NAD+ and glutathione together?",
        a: "They're complementary halves of cellular maintenance: NAD+ fuels energy production and DNA repair, while glutathione neutralizes the oxidative byproducts that work creates. Most brands sell them separately; we think that misses the point.",
      },
      {
        q: "Will it replace Day or Night?",
        a: "No — Core is the foundation layer beneath both. It's formulated to stack cleanly with the Reset Duo.",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const fmtPrice = (n: number) => `$${n}`;
