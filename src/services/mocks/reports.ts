export interface IntelligenceReportItem {
  id: string;
  title: string;
  category: 'Executive Brief' | 'Crisis & Risk' | 'Competitive Matrix' | 'Influencer Deep Dive';
  generatedAt: string;
  postsAnalyzed: number;
  format: 'PDF' | 'DOCX' | 'JSON' | 'SLIDES';
  fileSize: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
  highlights: string[];
  sentimentScore: number;
}

export const MOCK_REPORTS_DATA: IntelligenceReportItem[] = [
  {
    id: 'rep-001',
    title: 'Executive Intelligence Briefing — Sovereign Compute & Open Weights Impact',
    category: 'Executive Brief',
    generatedAt: 'September 8, 2026 (Today, 18:30 IST)',
    postsAnalyzed: 2418000,
    format: 'PDF',
    fileSize: '4.8 MB',
    status: 'Ready',
    highlights: [
      'Net positive sentiment rose by 18.4% across South Asian developer hubs',
      'Cascade propagation velocity doubled within 3 hours of MeitY announcement',
      'Key risk item: API rate limit backlash among tier-2 enterprise builders',
    ],
    sentimentScore: 78.4,
  },
  {
    id: 'rep-002',
    title: 'Cross-Platform Narrative Mutation & Divergence Analysis (Q3)',
    category: 'Competitive Matrix',
    generatedAt: 'September 6, 2026',
    postsAnalyzed: 5120000,
    format: 'PDF',
    fileSize: '12.4 MB',
    status: 'Ready',
    highlights: [
      'Reddit communities demonstrated 14% higher skepticism than X audiences',
      'YouTube video breakdowns drove 62% of downstream GitHub code repository clones',
      'Telegram broadcast channels served as primary distribution vector for weight mirrors',
    ],
    sentimentScore: 72.1,
  },
  {
    id: 'rep-003',
    title: 'Influencer & KOL Network Centrality Audit',
    category: 'Influencer Deep Dive',
    generatedAt: 'September 4, 2026',
    postsAnalyzed: 1890000,
    format: 'SLIDES',
    fileSize: '8.1 MB',
    status: 'Ready',
    highlights: [
      'Top 8 KOL nodes account for 41% of initial narrative broadcast reach',
      'Identified 4 distinct community modularity clusters with minimal cross-over',
      'Dr. Mehta ranked #1 in Betweenness Centrality (0.89)',
    ],
    sentimentScore: 81.0,
  },
  {
    id: 'rep-004',
    title: 'Early Warning Risk Assessment: API Pricing Restructuring Friction',
    category: 'Crisis & Risk',
    generatedAt: 'September 2, 2026',
    postsAnalyzed: 940000,
    format: 'PDF',
    fileSize: '3.2 MB',
    status: 'Ready',
    highlights: [
      'Sentiment dropped -28 points in a 6-hour window following pricing changes',
      'High churn threat discussions clustered on Hacker News & Reddit',
      'Recommended action: 14-day developer grandfathering period recommended',
    ],
    sentimentScore: 42.6,
  },
];
