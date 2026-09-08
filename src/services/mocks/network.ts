export interface NetworkNodeData {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  community: string;
  communityColor: string;
  followers: number;
  influenceScore: number; // 0-100
  betweennessCentrality: number; // 0-1
  pageRank: number; // 0-1
  sentimentPolarity: number; // 0-100
  amplificationPower: number; // multiplier e.g. 8.4x
  topTopics: string[];
  connectionsCount: number;
  x: number;
  y: number;
}

export interface NetworkLinkData {
  source: string;
  target: string;
  weight: number;
  type: 'retweet' | 'mention' | 'reply' | 'quote' | 'cross_link';
}

export interface CommunityCluster {
  id: string;
  name: string;
  color: string;
  nodesCount: number;
  totalReach: number;
  dominantSentiment: string;
  modularityScore: number;
  keyLeaders: string[];
  summary: string;
}

export const MOCK_NETWORK_DATA = {
  stats: {
    totalNodes: 842,
    totalEdges: 3914,
    detectedCommunities: 4,
    networkDensity: 0.084,
    averageDegree: 9.3,
    modularity: 0.74,
  },
  communities: [
    {
      id: 'comm-1',
      name: 'Deep Tech & ML Researchers',
      color: '#6366f1',
      nodesCount: 312,
      totalReach: 4_200_000,
      dominantSentiment: '84% Positive',
      modularityScore: 0.82,
      keyLeaders: ['@aarav_ai_lab', '@dr_tanvi_ml', '@neural_nexus'],
      summary: 'Academic and applied research group driving foundational model benchmarking and architecture debates.',
    },
    {
      id: 'comm-2',
      name: 'Venture & Sovereign Policy Leaders',
      color: '#10b981',
      nodesCount: 228,
      totalReach: 3_800_000,
      dominantSentiment: '89% Positive',
      modularityScore: 0.78,
      keyLeaders: ['@raj_investor', '@viksit_tech', '@sarah_vc'],
      summary: 'Institutional stakeholders, ministers, and venture capital partners coordinating compute grants and sovereign infrastructure.',
    },
    {
      id: 'comm-3',
      name: 'Full-Stack Developers & Indie Builders',
      color: '#f59e0b',
      nodesCount: 184,
      totalReach: 2_100_000,
      dominantSentiment: '72% Positive',
      modularityScore: 0.71,
      keyLeaders: ['@priyadev_cloud', '@alex_devops', '@code_ninja'],
      summary: 'Hands-on software engineers prototyping apps, evaluating API pricing, and deploying open-source models.',
    },
    {
      id: 'comm-4',
      name: 'Ethics, Policy & Privacy Analysts',
      color: '#ec4899',
      nodesCount: 118,
      totalReach: 1_250_000,
      dominantSentiment: '49% Neutral/Critical',
      modularityScore: 0.65,
      keyLeaders: ['@elena_ethics', '@david_privacy', '@legal_bytes'],
      summary: 'Think tanks and legal scholars auditing safety guardrails, copyright attribution, and privacy adherence.',
    },
  ] as CommunityCluster[],
  nodes: [
    {
      id: 'node-1',
      name: 'Dr. Aarav Mehta',
      handle: '@aarav_ai_lab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: 'Principal Research Scientist',
      community: 'Deep Tech & ML Researchers',
      communityColor: '#6366f1',
      followers: 482000,
      influenceScore: 96.4,
      betweennessCentrality: 0.89,
      pageRank: 0.94,
      sentimentPolarity: 88,
      amplificationPower: 14.2,
      topTopics: ['#ArtificialIntelligence', '#LLM', '#Benchmarks'],
      connectionsCount: 84,
      x: 350,
      y: 200,
    },
    {
      id: 'node-2',
      name: 'Rajesh Singhal',
      handle: '@raj_investor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      role: 'Managing Partner @ Apex Ventures',
      community: 'Venture & Sovereign Policy Leaders',
      communityColor: '#10b981',
      followers: 324000,
      influenceScore: 92.1,
      betweennessCentrality: 0.82,
      pageRank: 0.88,
      sentimentPolarity: 84,
      amplificationPower: 11.5,
      topTopics: ['#IndiaAI', '#VentureCapital', '#Startups'],
      connectionsCount: 72,
      x: 580,
      y: 180,
    },
    {
      id: 'node-3',
      name: 'Priya Sharma',
      handle: '@priyadev_cloud',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      role: 'Staff Cloud Architect',
      community: 'Full-Stack Developers & Indie Builders',
      communityColor: '#f59e0b',
      followers: 215000,
      influenceScore: 84.7,
      betweennessCentrality: 0.67,
      pageRank: 0.74,
      sentimentPolarity: 62,
      amplificationPower: 8.9,
      topTopics: ['#APIPricingDebate', '#DevOps', '#NextJS'],
      connectionsCount: 56,
      x: 280,
      y: 400,
    },
    {
      id: 'node-4',
      name: 'Dr. Elena Rostova',
      handle: '@elena_ethics',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      role: 'AI Ethics Policy Chair',
      community: 'Ethics, Policy & Privacy Analysts',
      communityColor: '#ec4899',
      followers: 189000,
      influenceScore: 81.3,
      betweennessCentrality: 0.76,
      pageRank: 0.71,
      sentimentPolarity: 51,
      amplificationPower: 7.4,
      topTopics: ['#DataPrivacyStandards', '#AIEthics', '#Governance'],
      connectionsCount: 48,
      x: 620,
      y: 390,
    },
    {
      id: 'node-5',
      name: 'Dr. Tanvi Patel',
      handle: '@dr_tanvi_ml',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      role: 'Neurosymbolic AI Lead',
      community: 'Deep Tech & ML Researchers',
      communityColor: '#6366f1',
      followers: 265000,
      influenceScore: 88.5,
      betweennessCentrality: 0.73,
      pageRank: 0.81,
      sentimentPolarity: 86,
      amplificationPower: 9.8,
      topTopics: ['#Transformers', '#Reasoning', '#DeepMind'],
      connectionsCount: 62,
      x: 420,
      y: 120,
    },
    {
      id: 'node-6',
      name: 'Vikram Sethi',
      handle: '@viksit_tech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      role: 'Sovereign Tech Fellow',
      community: 'Venture & Sovereign Policy Leaders',
      communityColor: '#10b981',
      followers: 198000,
      influenceScore: 83.0,
      betweennessCentrality: 0.69,
      pageRank: 0.75,
      sentimentPolarity: 91,
      amplificationPower: 8.2,
      topTopics: ['#DigitalPublicGoods', '#GovTech', '#IndiaAI'],
      connectionsCount: 51,
      x: 700,
      y: 240,
    },
    {
      id: 'node-7',
      name: 'Alex Rivera',
      handle: '@alex_devops',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      role: 'Distributed Systems Hacker',
      community: 'Full-Stack Developers & Indie Builders',
      communityColor: '#f59e0b',
      followers: 142000,
      influenceScore: 78.2,
      betweennessCentrality: 0.58,
      pageRank: 0.66,
      sentimentPolarity: 68,
      amplificationPower: 6.8,
      topTopics: ['#Kubernetes', '#vLLM', '#Ollama'],
      connectionsCount: 42,
      x: 200,
      y: 300,
    },
    {
      id: 'node-8',
      name: 'David Thorne',
      handle: '@david_privacy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      role: 'Cyber Jurisprudence Counsel',
      community: 'Ethics, Policy & Privacy Analysts',
      communityColor: '#ec4899',
      followers: 112000,
      influenceScore: 75.6,
      betweennessCentrality: 0.61,
      pageRank: 0.62,
      sentimentPolarity: 46,
      amplificationPower: 5.9,
      topTopics: ['#GDPR', '#Copyright', '#ModelAudit'],
      connectionsCount: 36,
      x: 480,
      y: 440,
    },
  ] as NetworkNodeData[],
  links: [
    { source: 'node-1', target: 'node-5', weight: 8, type: 'retweet' },
    { source: 'node-1', target: 'node-2', weight: 6, type: 'mention' },
    { source: 'node-1', target: 'node-3', weight: 4, type: 'reply' },
    { source: 'node-2', target: 'node-6', weight: 9, type: 'retweet' },
    { source: 'node-2', target: 'node-4', weight: 3, type: 'cross_link' },
    { source: 'node-3', target: 'node-7', weight: 7, type: 'retweet' },
    { source: 'node-3', target: 'node-8', weight: 4, type: 'reply' },
    { source: 'node-4', target: 'node-8', weight: 8, type: 'retweet' },
    { source: 'node-5', target: 'node-2', weight: 5, type: 'mention' },
    { source: 'node-6', target: 'node-1', weight: 5, type: 'quote' },
    { source: 'node-7', target: 'node-1', weight: 6, type: 'retweet' },
    { source: 'node-8', target: 'node-4', weight: 7, type: 'mention' },
  ] as NetworkLinkData[],
};
