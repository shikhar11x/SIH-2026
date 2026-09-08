export interface TimelinePoint {
  time: string;
  volume: number;
  sentiment: number;
  reach: number;
  hasEvent?: boolean;
  eventTitle?: string;
  eventType?: 'announcement' | 'viral_spike' | 'controversy' | 'milestone';
}

export interface InflectionEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'announcement' | 'viral_spike' | 'controversy' | 'milestone';
  volumeImpact: string;
  sentimentImpact: string;
  platform: string;
  author: string;
  engagement: number;
}

export const MOCK_TIMELINE_DATA = {
  timeRange: 'Last 7 Days (Hourly Aggregation)',
  metrics: {
    totalConversations: 2_418_000,
    peakVolumeHour: 'Friday 14:00 (142,000 posts/hr)',
    averageHourlyVolume: '14,390 posts/hr',
    highestSentimentHour: 'Saturday 11:00 (88% Positive)',
    lowestSentimentHour: 'Thursday 19:00 (42% Positive)',
  },
  series: [
    { time: 'Mon 00:00', volume: 6200, sentiment: 68, reach: 45000 },
    { time: 'Mon 06:00', volume: 8400, sentiment: 69, reach: 72000 },
    { time: 'Mon 12:00', volume: 18400, sentiment: 72, reach: 190000, hasEvent: true, eventTitle: 'Open Weights Announcement', eventType: 'announcement' },
    { time: 'Mon 18:00', volume: 24200, sentiment: 76, reach: 310000 },
    { time: 'Tue 00:00', volume: 14100, sentiment: 74, reach: 180000 },
    { time: 'Tue 06:00', volume: 19500, sentiment: 75, reach: 240000 },
    { time: 'Tue 12:00', volume: 48900, sentiment: 82, reach: 680000, hasEvent: true, eventTitle: 'HackerNews #1 Viral Peak', eventType: 'viral_spike' },
    { time: 'Tue 18:00', volume: 38200, sentiment: 80, reach: 520000 },
    { time: 'Wed 00:00', volume: 21000, sentiment: 77, reach: 290000 },
    { time: 'Wed 06:00', volume: 28400, sentiment: 76, reach: 370000 },
    { time: 'Wed 12:00', volume: 54000, sentiment: 79, reach: 740000 },
    { time: 'Wed 18:00', volume: 41200, sentiment: 75, reach: 580000 },
    { time: 'Thu 00:00', volume: 23100, sentiment: 73, reach: 310000 },
    { time: 'Thu 06:00', volume: 31000, sentiment: 71, reach: 410000 },
    { time: 'Thu 12:00', volume: 62500, sentiment: 64, reach: 840000 },
    { time: 'Thu 18:00', volume: 74200, sentiment: 42, reach: 980000, hasEvent: true, eventTitle: 'Token Pricing Tier Backlash', eventType: 'controversy' },
    { time: 'Fri 00:00', volume: 48900, sentiment: 52, reach: 620000 },
    { time: 'Fri 06:00', volume: 56200, sentiment: 60, reach: 760000 },
    { time: 'Fri 12:00', volume: 142000, sentiment: 84, reach: 1980000, hasEvent: true, eventTitle: 'National Compute Subsidy Announced', eventType: 'milestone' },
    { time: 'Fri 18:00', volume: 118000, sentiment: 86, reach: 1650000 },
    { time: 'Sat 00:00', volume: 64200, sentiment: 82, reach: 890000 },
    { time: 'Sat 06:00', volume: 51200, sentiment: 84, reach: 720000 },
    { time: 'Sat 12:00', volume: 88400, sentiment: 88, reach: 1240000 },
    { time: 'Sat 18:00', volume: 72100, sentiment: 85, reach: 980000 },
    { time: 'Sun 00:00', volume: 38400, sentiment: 81, reach: 520000 },
    { time: 'Sun 06:00', volume: 42100, sentiment: 82, reach: 590000 },
    { time: 'Sun 12:00', volume: 69400, sentiment: 83, reach: 920000 },
    { time: 'Sun 18:00', volume: 58200, sentiment: 82, reach: 810000 },
  ] as TimelinePoint[],
  events: [
    {
      id: 'evt-1',
      time: 'Mon 12:30 IST',
      title: 'Initial Open Weights Code Release',
      description: 'Official weights repository goes live with comprehensive documentation and performance benchmarks.',
      type: 'announcement',
      volumeImpact: '+210% surge in mentions within 2h',
      sentimentImpact: '+12 pts positive sentiment shift',
      platform: 'Twitter / GitHub',
      author: '@aarav_ai_lab',
      engagement: 48200,
    },
    {
      id: 'evt-2',
      time: 'Tue 13:15 IST',
      title: 'Hacker News Frontpage #1 & Reddit Megathread',
      description: 'Community stress testing verifies sub-50ms inference latency; organic virality expands exponentially.',
      type: 'viral_spike',
      volumeImpact: '+340% volume escalation across developer channels',
      sentimentImpact: '+8 pts positive sentiment lift',
      platform: 'Reddit & Hacker News',
      author: 'u/inference_king',
      engagement: 89400,
    },
    {
      id: 'evt-3',
      time: 'Thu 19:00 IST',
      title: 'API Tier Restructuring & Rate Limit Friction',
      description: 'Secondary cloud provider introduced restrictive per-minute caps without advance developer notification.',
      type: 'controversy',
      volumeImpact: '+180% negative sentiment discourse spike',
      sentimentImpact: '-28 pts sentiment drop',
      platform: 'Twitter & Reddit',
      author: '@priyadev_cloud',
      engagement: 62100,
    },
    {
      id: 'evt-4',
      time: 'Fri 14:00 IST',
      title: 'National AI Sovereign Compute Subsidy Rollout',
      description: 'Ministry announces 10,000 GPU compute access grants for accredited indie developers and research labs.',
      type: 'milestone',
      volumeImpact: '+420% record weekly volume peak (142k posts/hr)',
      sentimentImpact: '+32 pts positive sentiment recovery',
      platform: 'Twitter, LinkedIn & Press',
      author: '@viksit_tech & MeitY',
      engagement: 184500,
    },
  ] as InflectionEvent[],
};
