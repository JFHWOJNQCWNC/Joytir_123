export interface ServiceInfo {
  glyph: string;
  name: string;
  sk: string;
  desc: string;
  basePrice: number;
  duration: number;
}

export const services: ServiceInfo[] = [
  { glyph: '☉', name: 'Janma Kundli Reading', sk: 'Full birth chart', desc: 'Your full chart, house by house — personality, strengths, and the themes that tend to repeat.', basePrice: 350, duration: 60 },
  { glyph: '♃', name: 'Career & Wealth', sk: '10th & 2nd house focus', desc: 'Where your work and money houses are pointing, and which current period favours which moves.', basePrice: 300, duration: 45 },
  { glyph: '♀', name: 'Marriage Compatibility', sk: 'Guna Milan', desc: 'A compatibility reading between two charts, covering the traditional matching points and where friction is likely.', basePrice: 400, duration: 60 },
  { glyph: '☾', name: 'Dasha Forecast', sk: 'Current planetary period', desc: 'What your current mahadasha and antardasha actually mean for the next 12–18 months.', basePrice: 300, duration: 45 },
  { glyph: '☊', name: 'Muhurat Selection', sk: 'Auspicious timing', desc: 'An auspicious date and time window for a wedding, move, launch, or other important start.', basePrice: 250, duration: 30 },
  { glyph: '♄', name: 'Remedial Consultation', sk: 'Gemstones, mantra, ritual', desc: 'Remedies matched to your chart specifically — nothing generic, and nothing you don\'t need.', basePrice: 275, duration: 45 },
];

export const currencyRates: Record<string, number> = {
  AED: 1, USD: 0.2723, INR: 22.50, EUR: 0.2330, GBP: 0.2020, QAR: 0.9910, SAR: 1.0210,
};

export const currencyDecimals: Record<string, number> = {
  AED: 0, USD: 2, INR: 0, EUR: 2, GBP: 2, QAR: 2, SAR: 2,
};

export const currencies = ['AED', 'USD', 'INR', 'EUR', 'GBP', 'QAR', 'SAR'];

export function formatCurrency(amount: number, currency: string): string {
  const converted = amount * currencyRates[currency];
  return currency + ' ' + converted.toLocaleString(undefined, {
    minimumFractionDigits: currencyDecimals[currency],
    maximumFractionDigits: currencyDecimals[currency],
  });
}

export interface GrahaInfo {
  meaning: string;
  rules: string;
}

export const grahaDetails: Record<string, GrahaInfo> = {
  Surya: { meaning: 'Represents the soul, vitality, ego, father, and authority.', rules: 'Rules Leo.' },
  Chandra: { meaning: 'Represents the mind, emotions, mother, and public perception.', rules: 'Rules Cancer.' },
  Mangala: { meaning: 'Represents energy, action, courage, ambition, and land.', rules: 'Rules Aries and Scorpio.' },
  Budha: { meaning: 'Represents intellect, speech, communication, and business.', rules: 'Rules Gemini and Virgo.' },
  'Brihaspati / Guru': { meaning: 'Represents wisdom, expansion, teachers, luck, and dharma.', rules: 'Rules Sagittarius and Pisces.' },
  Shukra: { meaning: 'Represents love, beauty, luxury, wealth, and arts.', rules: 'Rules Taurus and Libra.' },
  Shani: { meaning: 'Represents discipline, delay, karma, hard work, and longevity.', rules: 'Rules Capricorn and Aquarius.' },
  Rahu: { meaning: 'Represents material obsession, illusion, ambition, and sudden changes.', rules: 'North Lunar Node.' },
  Ketu: { meaning: 'Represents spirituality, liberation, detachment, and past-life karma.', rules: 'South Lunar Node.' },
};

export interface GrahaNode {
  key: string;
  glyph: string;
  transform: string;
  r: number;
  labelKey: string;
}

export const grahaNodes: GrahaNode[] = [
  { key: 'Chandra', glyph: '☽', transform: 'translate(260 38)', r: 30, labelKey: 'Chandra' },
  { key: 'Mangala', glyph: '♂', transform: 'translate(462 151)', r: 30, labelKey: 'Mangala' },
  { key: 'Budha', glyph: '☿', transform: 'translate(420 372)', r: 30, labelKey: 'Budha' },
  { key: 'Brihaspati / Guru', glyph: '♃', transform: 'translate(100 372)', r: 30, labelKey: 'Brihaspati' },
  { key: 'Shukra', glyph: '♀', transform: 'translate(58 151)', r: 30, labelKey: 'Shukra' },
  { key: 'Shani', glyph: '♄', transform: 'translate(160 88)', r: 26, labelKey: 'Shani' },
  { key: 'Rahu', glyph: '☊', transform: 'translate(366 88)', r: 26, labelKey: 'Rahu' },
  { key: 'Ketu', glyph: '☋', transform: 'translate(366 432)', r: 26, labelKey: 'Ketu' },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  { q: 'Do I need my exact birth time?', a: 'Yes — the ascendant and house positions shift roughly every two hours, so an exact time matters for house-based questions like career or marriage timing.' },
  { q: 'What if I don\'t know my exact birth time?', a: 'Bring whatever you have — a rough window, a birth certificate, or family recollection. We can still do a reading, and flag which parts depend on precise timing.' },
  { q: 'How does the session happen?', a: 'Over video or voice call, whichever you prefer. The link is sent by email after your booking is confirmed.' },
  { q: 'Can I book a reading for someone else?', a: 'Yes — parents booking for a child or a partner is common. Just use that person\'s birth details in the form.' },
  { q: 'What\'s the cancellation policy?', a: 'Reschedule or cancel up to 24 hours before your session for a full refund. Inside 24 hours, sessions can be rescheduled once.' },
];
