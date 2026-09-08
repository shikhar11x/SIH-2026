export interface Trend {
  id: string;
  topic: string;
  mentions: number;
  growth: number;
  velocity: number;
  sentiment: number;
  status: 'viral' | 'rising' | 'emerging' | 'declining' | 'stable';
  relatedTopics: string[];
  topKeywords: string[];
  influencers: string[];
  timeline: TrendTimelinePoint[];
}

export interface TrendTimelinePoint {
  timestamp: string;
  mentions: number;
  sentiment: number;
}

export interface TrendDetail extends Trend {
  description: string;
  aiExplanation: string;
  peakTime: string;
  originPlatform: string;
}
