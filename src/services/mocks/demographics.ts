export interface DemographicsData {
  overview: {
    totalAudience: number;
    activeParticipants: number;
    primaryGender: string;
    dominantAgeRange: string;
    topCountry: string;
    diversityIndex: number;
  };
  ageDistribution: { range: string; percentage: number; count: number; maleShare: number; femaleShare: number }[];
  genderSplit: { gender: string; percentage: number; count: number; color: string }[];
  geoDistribution: { country: string; code: string; percentage: number; count: number; sentiment: number; flag: string }[];
  languages: { name: string; code: string; percentage: number; count: number }[];
  personas: {
    id: string;
    name: string;
    avatarBadge: string;
    sharePercentage: number;
    growth: number;
    description: string;
    keyInterests: string[];
    dominantPlatforms: string[];
    sentimentBias: 'Positive' | 'Neutral' | 'Skeptical';
    engagementIntensity: 'High' | 'Very High' | 'Medium';
  }[];
  devices: { device: string; percentage: number; icon: string }[];
}

export const MOCK_DEMOGRAPHICS_DATA: DemographicsData = {
  overview: {
    totalAudience: 1_842_000,
    activeParticipants: 420_500,
    primaryGender: 'Male (58%) / Female (38%)',
    dominantAgeRange: '18-34 (69.4%)',
    topCountry: 'India (42.6%)',
    diversityIndex: 88.4,
  },
  ageDistribution: [
    { range: '13-17', percentage: 4.8, count: 88416, maleShare: 52, femaleShare: 44 },
    { range: '18-24', percentage: 38.2, count: 703644, maleShare: 60, femaleShare: 37 },
    { range: '25-34', percentage: 31.2, count: 574704, maleShare: 57, femaleShare: 39 },
    { range: '35-44', percentage: 14.6, count: 268932, maleShare: 55, femaleShare: 42 },
    { range: '45-54', percentage: 7.4, count: 136308, maleShare: 58, femaleShare: 38 },
    { range: '55+', percentage: 3.8, count: 69996, maleShare: 54, femaleShare: 43 },
  ],
  genderSplit: [
    { gender: 'Male', percentage: 58.2, count: 1_072_044, color: '#6366f1' },
    { gender: 'Female', percentage: 38.4, count: 707_328, color: '#ec4899' },
    { gender: 'Non-Binary / Undisclosed', percentage: 3.4, count: 62_628, color: '#a855f7' },
  ],
  geoDistribution: [
    { country: 'India', code: 'IN', percentage: 42.6, count: 784692, sentiment: 78, flag: '🇮🇳' },
    { country: 'United States', code: 'US', percentage: 22.4, count: 412608, sentiment: 74, flag: '🇺🇸' },
    { country: 'United Kingdom', code: 'GB', percentage: 8.9, count: 163938, sentiment: 69, flag: '🇬🇧' },
    { country: 'Germany', code: 'DE', percentage: 6.4, count: 117888, sentiment: 72, flag: '🇩🇪' },
    { country: 'Singapore', code: 'SG', percentage: 5.1, count: 93942, sentiment: 82, flag: '🇸🇬' },
    { country: 'Canada', code: 'CA', percentage: 4.8, count: 88416, sentiment: 75, flag: '🇨🇦' },
    { country: 'Australia', code: 'AU', percentage: 3.8, count: 69996, sentiment: 71, flag: '🇦🇺' },
    { country: 'Other Nations', code: 'ROW', percentage: 6.0, count: 110520, sentiment: 70, flag: '🌐' },
  ],
  languages: [
    { name: 'English', code: 'en', percentage: 64.2, count: 1182564 },
    { name: 'Hindi', code: 'hi', percentage: 18.5, count: 340770 },
    { name: 'Tamil & Telugu', code: 'ta/te', percentage: 7.4, count: 136308 },
    { name: 'German', code: 'de', percentage: 4.1, count: 75522 },
    { name: 'Spanish', code: 'es', percentage: 3.2, count: 58944 },
    { name: 'Other', code: 'etc', percentage: 2.6, count: 47892 },
  ],
  personas: [
    {
      id: 'persona-1',
      name: 'AI Researchers & ML Engineers',
      avatarBadge: '🔬',
      sharePercentage: 34.2,
      growth: 24.5,
      description: 'Highly technical practitioners debating model weights, benchmarks, latency tradeoffs, and training datasets.',
      keyInterests: ['PyTorch', 'Transformer Architecture', 'Quantization', 'Inference Optimization', 'HuggingFace'],
      dominantPlatforms: ['Twitter / X', 'Reddit', 'GitHub'],
      sentimentBias: 'Positive',
      engagementIntensity: 'Very High',
    },
    {
      id: 'persona-2',
      name: 'Tech Founders & Venture Investors',
      avatarBadge: '🚀',
      sharePercentage: 27.8,
      growth: 18.2,
      description: 'Founders, angel investors, and product leads seeking commercially viable enterprise deployment playbooks.',
      keyInterests: ['Market Size', 'Unit Economics', 'Series A', 'Enterprise SaaS', 'Regulatory Compliance'],
      dominantPlatforms: ['Twitter / X', 'LinkedIn', 'Telegram'],
      sentimentBias: 'Positive',
      engagementIntensity: 'High',
    },
    {
      id: 'persona-3',
      name: 'Indie Builders & Creative Devs',
      avatarBadge: '⚡',
      sharePercentage: 22.4,
      growth: 31.0,
      description: 'Autonomous creators shipping fast, utilizing API wrappers, modern stacks, and sharing build-in-public metrics.',
      keyInterests: ['Next.js', 'Vercel', 'Micro-SaaS', 'Supabase', 'BuildInPublic'],
      dominantPlatforms: ['Twitter / X', 'Reddit', 'YouTube'],
      sentimentBias: 'Positive',
      engagementIntensity: 'Very High',
    },
    {
      id: 'persona-4',
      name: 'Policy Analysts & Tech Skeptics',
      avatarBadge: '⚖️',
      sharePercentage: 15.6,
      growth: 8.4,
      description: 'Academics, legal experts, and privacy advocates raising considerations around copyright, data harvesting, and safety.',
      keyInterests: ['Copyright Law', 'GDPR', 'AI Ethics', 'Monopolies', 'Open Standards'],
      dominantPlatforms: ['Reddit', 'Substack', 'LinkedIn'],
      sentimentBias: 'Skeptical',
      engagementIntensity: 'Medium',
    },
  ],
  devices: [
    { device: 'Mobile (iOS & Android)', percentage: 68.4, icon: 'Smartphone' },
    { device: 'Desktop / Web Workstation', percentage: 28.2, icon: 'Monitor' },
    { device: 'Tablet & Embedded Devices', percentage: 3.4, icon: 'Tablet' },
  ],
};
