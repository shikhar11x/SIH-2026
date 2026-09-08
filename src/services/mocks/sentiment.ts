export interface SentimentTimelinePoint {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
  totalVolume: number;
}

export interface AspectSentiment {
  aspect: string;
  positive: number;
  neutral: number;
  negative: number;
  mentions: number;
  sentimentScore: number;
  trend: 'up' | 'down' | 'stable';
}

export interface SocialPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  platform: 'twitter' | 'telegram' | 'reddit' | 'youtube' | 'instagram' | 'facebook';
  content: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  confidence: number;
  emotion: 'joy' | 'anger' | 'surprise' | 'sadness' | 'fear' | 'trust';
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  tags: string[];
}

export const MOCK_SENTIMENT_DATA = {
  overview: {
    positive: 62.4,
    neutral: 23.8,
    negative: 13.8,
    totalAnalyzed: 2_418_920,
    netSentimentScore: 74.3, // scale 0-100
    change24h: 18.4,
    sentimentVolatility: 'Low (0.12)',
  },
  emotions: [
    { emotion: 'Supportive & Endorsing', percentage: 38.5, color: '#16a34a', count: 931_284 },
    { emotion: 'Excitement & Optimism', percentage: 26.2, color: '#ea580c', count: 633_757 },
    { emotion: 'Anxiety & Risk Concern', percentage: 14.8, color: '#d97706', count: 357_998 },
    { emotion: 'Sarcasm & Cynicism (NLP Detected)', percentage: 9.4, color: '#8b5cf6', count: 227_378 },
    { emotion: 'Against / Opposed', percentage: 7.2, color: '#dc2626', count: 174_162 },
    { emotion: 'Neutral / Informational', percentage: 3.9, color: '#64748b', count: 94_338 },
  ],
  timeline: [
    { date: 'Day 1', positive: 54, neutral: 28, negative: 18, totalVolume: 120000 },
    { date: 'Day 2', positive: 58, neutral: 26, negative: 16, totalVolume: 145000 },
    { date: 'Day 3', positive: 52, neutral: 30, negative: 18, totalVolume: 110000 },
    { date: 'Day 4', positive: 61, neutral: 25, negative: 14, totalVolume: 210000 },
    { date: 'Day 5', positive: 68, neutral: 21, negative: 11, totalVolume: 340000 },
    { date: 'Day 6', positive: 64, neutral: 23, negative: 13, totalVolume: 280000 },
    { date: 'Day 7', positive: 66, neutral: 22, negative: 12, totalVolume: 310000 },
    { date: 'Day 8', positive: 70, neutral: 20, negative: 10, totalVolume: 420000 },
    { date: 'Day 9', positive: 63, neutral: 24, negative: 13, totalVolume: 290000 },
    { date: 'Day 10', positive: 59, neutral: 27, negative: 14, totalVolume: 230000 },
    { date: 'Day 11', positive: 65, neutral: 23, negative: 12, totalVolume: 360000 },
    { date: 'Day 12', positive: 69, neutral: 20, negative: 11, totalVolume: 390000 },
    { date: 'Day 13', positive: 62, neutral: 24, negative: 14, totalVolume: 280000 },
    { date: 'Day 14', positive: 64, neutral: 23, negative: 13, totalVolume: 315000 },
  ],
  aspects: [
    { aspect: 'AI Innovation & Models', positive: 78, neutral: 14, negative: 8, mentions: 840000, sentimentScore: 85, trend: 'up' },
    { aspect: 'Developer Ecosystem', positive: 72, neutral: 19, negative: 9, mentions: 520000, sentimentScore: 81, trend: 'up' },
    { aspect: 'Safety & Guardrails', positive: 48, neutral: 32, negative: 20, mentions: 340000, sentimentScore: 64, trend: 'stable' },
    { aspect: 'Cost & Accessibility', positive: 42, neutral: 28, negative: 30, mentions: 290000, sentimentScore: 56, trend: 'down' },
    { aspect: 'Performance & Latency', positive: 81, neutral: 12, negative: 7, mentions: 428000, sentimentScore: 87, trend: 'up' },
  ] as AspectSentiment[],
  keywords: [
    { text: 'Revolutionary', sentiment: 'positive', count: 184000, weight: 95 },
    { text: 'Open Source', sentiment: 'positive', count: 142000, weight: 88 },
    { text: 'Fast Performance', sentiment: 'positive', count: 128000, weight: 82 },
    { text: 'India Stack', sentiment: 'positive', count: 96000, weight: 78 },
    { text: 'Scalable', sentiment: 'positive', count: 88000, weight: 70 },
    { text: 'Benchmark', sentiment: 'neutral', count: 75000, weight: 65 },
    { text: 'Pricing Tier', sentiment: 'negative', count: 54000, weight: 58 },
    { text: 'API Rate Limits', sentiment: 'negative', count: 48000, weight: 52 },
    { text: 'Security Audit', sentiment: 'neutral', count: 42000, weight: 48 },
    { text: 'GPU Shortage', sentiment: 'negative', count: 39000, weight: 45 },
  ],
  samplePosts: [
    {
      id: 'p-101',
      author: 'Dr. Aarav Mehta',
      handle: '@aarav_ai_lab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      platform: 'twitter',
      content: 'The new multi-modal benchmark results are astounding. Latency dropped by 64% while maintaining 98.2% factual consistency. Massive leap for enterprise workflows!',
      timestamp: '12m ago',
      sentiment: 'positive',
      sentimentScore: 0.94,
      confidence: 0.98,
      emotion: 'joy',
      engagement: { likes: 3840, shares: 920, comments: 145 },
      tags: ['#ArtificialIntelligence', '#Benchmarks', '#DeepLearning'],
    },
    {
      id: 'p-102',
      author: 'TechChronicle Daily',
      handle: '@techchronicle',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      platform: 'reddit',
      content: 'Discussion Thread: How will the new localized LLM policies impact indie developers in South Asia? Comprehensive analysis breakdown attached.',
      timestamp: '34m ago',
      sentiment: 'neutral',
      sentimentScore: 0.52,
      confidence: 0.91,
      emotion: 'trust',
      engagement: { likes: 1420, shares: 340, comments: 288 },
      tags: ['#TechPolicy', '#IndiaAI', '#OpenSource'],
    },
    {
      id: 'p-103',
      author: 'Priya Sharma',
      handle: '@priyadev_cloud',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      platform: 'twitter',
      content: 'Disappointed by the sudden token pricing tier restructuring without prior developer grace period. Rate limits throttled our staging pipeline today.',
      timestamp: '1h ago',
      sentiment: 'negative',
      sentimentScore: 0.18,
      confidence: 0.96,
      emotion: 'anger',
      engagement: { likes: 890, shares: 310, comments: 94 },
      tags: ['#DevOps', '#APIPricing', '#Feedback'],
    },
    {
      id: 'p-104',
      author: 'Global Tech Nexus',
      handle: '@technexus_yt',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      platform: 'youtube',
      content: 'Live Demo & In-depth teardown: We stress-tested 10,000 concurrent streaming inference requests. Watch the full 4K benchmark breakdown!',
      timestamp: '2h ago',
      sentiment: 'positive',
      sentimentScore: 0.88,
      confidence: 0.95,
      emotion: 'surprise',
      engagement: { likes: 12400, shares: 2800, comments: 640 },
      tags: ['#Inference', '#Hardware', '#CloudAI'],
    },
  ] as SocialPost[],
};
