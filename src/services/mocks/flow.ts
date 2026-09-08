export interface DiffusionStage {
  id: string;
  stageName: string;
  timeframe: string;
  reach: number;
  activeNodes: number;
  dominantPlatform: string;
  sentimentScore: number;
  description: string;
  propagationSpeed: string;
  keyEvents: string[];
}

export interface CascadeBranch {
  id: string;
  originNode: string;
  originPlatform: string;
  destinationPlatform: string;
  hopCount: number;
  reachMultiplier: number;
  lagTimeMinutes: number;
  sentimentShift: number; // e.g. -14% or +8%
}

export const MOCK_FLOW_DATA = {
  narrativeTitle: 'Benchmark Breakthrough & Sovereign Compute Dissemination',
  propagationStats: {
    totalCascades: 142,
    avgDisseminationTime: '3.4 Hours',
    viralityCoefficient: 2.84, // R0 equivalent
    crossPlatformDivergence: '18.2%',
    criticalSpreaderNodes: 8,
  },
  stages: [
    {
      id: 'stage-1',
      stageName: '1. Seed Publication & Academic Inception',
      timeframe: 'T+00:00 (14:00 IST)',
      reach: 48000,
      activeNodes: 12,
      dominantPlatform: 'X / Twitter (arXiv / GitHub link)',
      sentimentScore: 89,
      propagationSpeed: '400 shares/hr',
      description: 'Core benchmark figures and open-weight checkpoints uploaded to Hugging Face and announced via lead researcher account.',
      keyEvents: ['Research pre-print publication', 'GitHub repository open-sourced', 'First 500 stars recorded'],
    },
    {
      id: 'stage-2',
      stageName: '2. Community Amplification & Hacker Debate',
      timeframe: 'T+01:30 (15:30 IST)',
      reach: 340000,
      activeNodes: 184,
      dominantPlatform: 'Reddit (r/MachineLearning) & Hacker News',
      sentimentScore: 82,
      propagationSpeed: '2,800 shares/hr',
      description: 'Technical teardowns, independent replication logs, and quantization benchmarks posted across indie dev communities.',
      keyEvents: ['#1 on Hacker News frontpage', 'r/LocalLLaMA megathread created', 'Docker container released by community'],
    },
    {
      id: 'stage-3',
      stageName: '3. Multi-Channel Viral Cascade',
      timeframe: 'T+03:00 (17:00 IST)',
      reach: 1250000,
      activeNodes: 1420,
      dominantPlatform: 'Telegram & YouTube Tech Explanations',
      sentimentScore: 78,
      propagationSpeed: '18,400 interactions/hr',
      description: 'Tech YouTubers publish benchmark comparison video walkthroughs; Telegram broadcast channels forward summary infographics.',
      keyEvents: ['3 High-subscriber YouTube breakdowns', '140K Telegram views in 30 mins', 'Trending on Indian Tech Twitter'],
    },
    {
      id: 'stage-4',
      stageName: '4. Mainstream & Institutional Adoption',
      timeframe: 'T+06:00 (20:00 IST)',
      reach: 2410000,
      activeNodes: 4890,
      dominantPlatform: 'LinkedIn & News Media Portals',
      sentimentScore: 74,
      propagationSpeed: '8,200 interactions/hr',
      description: 'Venture funds, enterprise CTOs, and national news outlets cover economic implications for Indian AI sovereign compute.',
      keyEvents: ['Institutional press pickup', 'MeitY official quote re-shared', 'Enterprise pilot inquiries surge'],
    },
  ] as DiffusionStage[],
  cascades: [
    {
      id: 'c-1',
      originNode: '@aarav_ai_lab',
      originPlatform: 'Twitter',
      destinationPlatform: 'Reddit (r/MachineLearning)',
      hopCount: 1,
      reachMultiplier: 7.2,
      lagTimeMinutes: 18,
      sentimentShift: -4,
    },
    {
      id: 'c-2',
      originNode: 'r/MachineLearning',
      originPlatform: 'Reddit',
      destinationPlatform: 'Telegram Developer Alpha',
      hopCount: 2,
      reachMultiplier: 4.8,
      lagTimeMinutes: 35,
      sentimentShift: 6,
    },
    {
      id: 'c-3',
      originNode: '@raj_investor',
      originPlatform: 'Twitter',
      destinationPlatform: 'LinkedIn Pulse',
      hopCount: 1,
      reachMultiplier: 12.4,
      lagTimeMinutes: 48,
      sentimentShift: 9,
    },
    {
      id: 'c-4',
      originNode: 'Telegram Broadcast',
      originPlatform: 'Telegram',
      destinationPlatform: 'YouTube Shorts / Clips',
      hopCount: 3,
      reachMultiplier: 18.0,
      lagTimeMinutes: 75,
      sentimentShift: -2,
    },
  ] as CascadeBranch[],
};
