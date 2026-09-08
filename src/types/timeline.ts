export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'discussion' | 'influencer' | 'viral' | 'sentiment_shift' | 'community' | 'peak';
  platform: string;
  metrics: {
    reach: number;
    engagement: number;
    sentiment: number;
  };
  relatedTopics: string[];
}

export interface FlowStage {
  id: string;
  label: string;
  timestamp: string;
  reach: number;
  engagement: number;
  sentimentChange: number;
  description: string;
}

export interface InformationFlow {
  id: string;
  title: string;
  stages: FlowStage[];
  totalReach: number;
  duration: string;
}
