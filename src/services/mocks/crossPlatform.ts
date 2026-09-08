export interface CrossPlatformMetric {
  platformId: string;
  name: string;
  icon: string;
  color: string;
  shareOfVoice: number; // percentage
  sentimentScore: number;
  engagementPerPost: number;
  topFormat: string;
  dominantTone: string;
  narrativeFocus: string;
}

export interface NarrativeMutation {
  id: string;
  topic: string;
  divergenceScore: number; // 0-100 (how differently it is portrayed)
  platforms: {
    platform: string;
    dominantAngle: string;
    sentimentScore: number;
    volume: number;
    summary: string;
  }[];
}

export const MOCK_CROSS_PLATFORM_DATA = {
  stats: {
    platformsAnalyzed: 6,
    crossPlatformCorrelation: 0.81,
    highestDivergenceTopic: '#APIPricingDebate',
    fastestOriginPlatform: 'Twitter / X (42m avg lead time)',
    highestEngagementRatePlatform: 'YouTube Tech Reviews (6.8%)',
  },
  platformMetrics: [
    {
      platformId: 'twitter',
      name: 'X (Twitter)',
      icon: 'twitter',
      color: '#1DA1F2',
      shareOfVoice: 42.4,
      sentimentScore: 76,
      engagementPerPost: 48.2,
      topFormat: 'Short Threads & Benchmarks',
      dominantTone: 'Analytical & Breaking',
      narrativeFocus: 'Real-time performance claims and competitive teardowns',
    },
    {
      platformId: 'reddit',
      name: 'Reddit',
      icon: 'reddit',
      color: '#FF4500',
      shareOfVoice: 21.8,
      sentimentScore: 68,
      engagementPerPost: 114.5,
      topFormat: 'Deep Dive Text & Code Repos',
      dominantTone: 'Critical & Technical',
      narrativeFocus: 'Reproducibility, edge cases, and architectural tradeoffs',
    },
    {
      platformId: 'telegram',
      name: 'Telegram',
      icon: 'send',
      color: '#0088cc',
      shareOfVoice: 14.5,
      sentimentScore: 84,
      engagementPerPost: 92.0,
      topFormat: 'Broadcast Channel Summaries',
      dominantTone: 'Enthusiastic & Alpha-seeking',
      narrativeFocus: 'Download links, quantized weights, and quick tutorials',
    },
    {
      platformId: 'youtube',
      name: 'YouTube',
      icon: 'youtube',
      color: '#FF0000',
      shareOfVoice: 11.2,
      sentimentScore: 86,
      engagementPerPost: 340.0,
      topFormat: 'Long-form Teardowns & Coding Demos',
      dominantTone: 'Educational & Inspirational',
      narrativeFocus: 'Step-by-step implementation guides and live coding',
    },
    {
      platformId: 'linkedin',
      name: 'LinkedIn',
      icon: 'linkedin',
      color: '#0A66C2',
      shareOfVoice: 7.1,
      sentimentScore: 91,
      engagementPerPost: 64.0,
      topFormat: 'Thought Leadership Articles',
      dominantTone: 'Corporate & Optimistic',
      narrativeFocus: 'Economic impact, workforce transformation, and enterprise ROI',
    },
    {
      platformId: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      color: '#E4405F',
      shareOfVoice: 3.0,
      sentimentScore: 88,
      engagementPerPost: 88.0,
      topFormat: 'Infographic Carousels & Reels',
      dominantTone: 'Visual & Snackable',
      narrativeFocus: 'Top 5 AI tools roundups and beginner summaries',
    },
  ] as CrossPlatformMetric[],
  mutations: [
    {
      id: 'mut-1',
      topic: 'Open Weight Model vs Proprietary API Debate',
      divergenceScore: 84,
      platforms: [
        {
          platform: 'X / Twitter',
          dominantAngle: 'Benchmark wars & token cost efficiency',
          sentimentScore: 78,
          volume: 184000,
          summary: 'Engineers comparing MMLU scores and inference latencies head-to-head.',
        },
        {
          platform: 'Reddit',
          dominantAngle: 'Data privacy, hardware VRAM limits & quantization',
          sentimentScore: 62,
          volume: 98000,
          summary: 'Skeptical examination of actual quantization degradation in real production workloads.',
        },
        {
          platform: 'LinkedIn',
          dominantAngle: 'Enterprise data governance & vendor lock-in mitigation',
          sentimentScore: 92,
          volume: 42000,
          summary: 'C-suite perspective on retaining sovereign IP and avoiding single-vendor risk.',
        },
      ],
    },
    {
      id: 'mut-2',
      topic: 'Sovereign Compute & National Infrastructure',
      divergenceScore: 56,
      platforms: [
        {
          platform: 'X / Twitter',
          dominantAngle: 'National pride & technological self-reliance',
          sentimentScore: 89,
          volume: 142000,
          summary: 'Enthusiastic support for indigenous foundational models and local data centers.',
        },
        {
          platform: 'Telegram',
          dominantAngle: 'Grant application links & eligibility criteria',
          sentimentScore: 94,
          volume: 58000,
          summary: 'Practical resource sharing and incubator cohort coordination.',
        },
      ],
    },
  ] as NarrativeMutation[],
};
