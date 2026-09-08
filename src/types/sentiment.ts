export interface SentimentOverview {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
  change: number;
}

export interface EmotionBreakdown {
  emotion: string;
  percentage: number;
  color: string;
}

export interface SentimentTimelinePoint {
  timestamp: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface SentimentByPlatform {
  platform: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface SentimentByTopic {
  topic: string;
  positive: number;
  neutral: number;
  negative: number;
  volume: number;
}
