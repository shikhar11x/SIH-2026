export const MOCK_OVERVIEW = {
  metrics: {
    totalPosts: 2_400_000,
    uniqueUsers: 184_000,
    engagement: 8_700_000,
    emergingTrends: 43,
    influenceScore: 78.4,
    sentimentScore: 72.8,
  },
  sentimentSnapshot: {
    positive: 62.4,
    neutral: 23.8,
    negative: 13.8,
    change: 18.4,
  },
  trendSnapshot: [
    { topic: '#ArtificialIntelligence', mentions: 284_000, growth: 143, status: 'viral' as const },
    { topic: '#IndiaAI', mentions: 142_000, growth: 97, status: 'rising' as const },
    { topic: '#Startups', mentions: 98_000, growth: 61, status: 'rising' as const },
    { topic: '#Flutter', mentions: 61_000, growth: 42, status: 'emerging' as const },
    { topic: '#OpenSource', mentions: 54_000, growth: 38, status: 'emerging' as const },
  ],
  audienceSnapshot: {
    topAge: '18-24',
    topCountry: 'India',
    topLanguage: 'English',
    topInterest: 'Technology',
  },
  aiSummary:
    'Positive sentiment increased 18.4% over the last 24 hours, primarily driven by technology communities. Two high-influence accounts accelerated the spread of the #AI narrative across connected communities. Engagement rates peaked between 12:00-14:00 IST, suggesting optimal posting windows for technology-focused content.',
};
