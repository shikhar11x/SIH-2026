export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  citations?: {
    platform: string;
    author: string;
    text: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
  suggestedActions?: {
    label: string;
    actionType: 'navigate' | 'filter' | 'export';
    target: string;
  }[];
  chartInsight?: {
    title: string;
    type: 'bar' | 'sentiment_donut' | 'trend_line';
    data: { name: string; value: number }[];
  };
}

export const COPILOT_PRESETS = [
  'What caused the sudden sentiment spike on Friday afternoon?',
  'Identify the top 5 key opinion leaders in the sovereign compute debate.',
  'Compare sentiment between developer communities on Reddit vs Twitter.',
  'Generate an executive summary on #APIPricing narrative risks.',
  'Show geographic distribution of positive sentiment in India.',
];

export const INITIAL_COPILOT_MESSAGES: CopilotMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    timestamp: 'Just now',
    text: "Hello! I'm your SocialPulse AI Copilot. I continuously analyze 2.4M+ cross-platform conversations, detecting narrative shifts, influencer amplification, and emerging risks. What intelligence briefing would you like today?",
    suggestedActions: [
      { label: 'View 24h Sentiment Analysis', actionType: 'navigate', target: '/analysis/sentiment' },
      { label: 'Inspect Viral Inflection Points', actionType: 'navigate', target: '/analysis/timeline' },
      { label: 'Generate Weekly Executive Briefing', actionType: 'navigate', target: '/reports' },
    ],
  },
];

export const COPILOT_KNOWLEDGE_BASE: Record<string, CopilotMessage> = {
  spike: {
    id: 'msg-resp-1',
    sender: 'assistant',
    timestamp: 'Just now',
    text: 'The volume and sentiment spike on Friday at 14:00 IST (+420% volume surge, 84% positive sentiment) was triggered by the official announcement of the **National AI Sovereign Compute Subsidy**. \n\nKey drivers:\n1. **Ministry of Electronics & IT (MeitY)** announced 10,000 GPU grant allocations.\n2. Influential tech figures like **@viksit_tech** and **@aarav_ai_lab** amplified the news within 15 minutes.\n3. Sentiment rose from 52% to 86% across engineering and startup communities.',
    citations: [
      {
        platform: 'Twitter',
        author: '@viksit_tech',
        text: 'Huge day for Indian deeptech! 10k GPUs allocated for open weights research labs.',
        sentiment: 'positive',
      },
      {
        platform: 'Telegram',
        author: 'India AI Founders',
        text: 'Grant applications open at meity.gov.in. Let us coordinate batch submissions.',
        sentiment: 'positive',
      },
    ],
    chartInsight: {
      title: 'Sentiment Shift Around Announcement Window',
      type: 'trend_line',
      data: [
        { name: '11:00', value: 52 },
        { name: '12:00', value: 55 },
        { name: '13:00', value: 68 },
        { name: '14:00 (Announcement)', value: 84 },
        { name: '15:00', value: 88 },
        { name: '16:00', value: 86 },
      ],
    },
    suggestedActions: [
      { label: 'Open Conversation Timeline', actionType: 'navigate', target: '/analysis/timeline' },
      { label: 'Inspect Network Cascade', actionType: 'navigate', target: '/analysis/flow' },
    ],
  },
  influencers: {
    id: 'msg-resp-2',
    sender: 'assistant',
    timestamp: 'Just now',
    text: 'Here are the top Key Opinion Leaders (KOLs) ranked by **Eigenvector Centrality** and **Betweenness Reach** in the Sovereign Compute discourse:\n\n1. **Dr. Aarav Mehta (@aarav_ai_lab)** — Influence: 96.4/100 | Reach: 482K | Betweenness: 0.89\n2. **Rajesh Singhal (@raj_investor)** — Influence: 92.1/100 | Reach: 324K | Betweenness: 0.82\n3. **Dr. Tanvi Patel (@dr_tanvi_ml)** — Influence: 88.5/100 | Reach: 265K | Betweenness: 0.73\n4. **Priya Sharma (@priyadev_cloud)** — Influence: 84.7/100 | Reach: 215K | Betweenness: 0.67\n5. **Vikram Sethi (@viksit_tech)** — Influence: 83.0/100 | Reach: 198K | Betweenness: 0.69',
    suggestedActions: [
      { label: 'View Interactive Network Graph', actionType: 'navigate', target: '/analysis/network' },
      { label: 'Inspect Audience Overlap', actionType: 'navigate', target: '/analysis/demographics' },
    ],
  },
  compare: {
    id: 'msg-resp-3',
    sender: 'assistant',
    timestamp: 'Just now',
    text: 'Cross-platform narrative analysis reveals significant divergence between **Reddit** and **X (Twitter)**:\n\n- **X (Twitter)**: 76% Positive sentiment. Focused on high-level benchmark numbers, latency improvements, and rapid retweets of leaderboard rankings.\n- **Reddit (r/MachineLearning, r/LocalLLaMA)**: 68% Positive sentiment. Much more skeptical and technical, debating VRAM memory constraints, float16 vs 4-bit quantization artifacts, and long-context perplexity.',
    suggestedActions: [
      { label: 'View Cross-Platform Matrix', actionType: 'navigate', target: '/cross-platform' },
      { label: 'Examine Aspect Sentiment', actionType: 'navigate', target: '/analysis/sentiment' },
    ],
  },
  default: {
    id: 'msg-resp-default',
    sender: 'assistant',
    timestamp: 'Just now',
    text: "Based on real-time neural indexing of 2.4M social conversations across 6 integrated platforms, our intelligence models indicate sustained **optimism (+62.4% Net Positive)** around open model deployments, tempered by developer friction over token pricing caps. All ingestion pipelines are running nominally with sub-second latency.",
    suggestedActions: [
      { label: 'View Full Overview', actionType: 'navigate', target: '/analysis/overview' },
      { label: 'Explore Emerging Trends', actionType: 'navigate', target: '/analysis/trends' },
    ],
  },
};
