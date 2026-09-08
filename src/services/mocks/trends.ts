export interface TrendTopic {
  id: string;
  topic: string;
  category: 'Tech' | 'Policy' | 'Business' | 'Community' | 'Hardware';
  mentions: number;
  growth24h: number; // percentage
  velocity: number; // mentions per hour
  acceleration: number; // rate of change in velocity
  sentimentScore: number;
  lifecycle: 'emerging' | 'rising' | 'peaking' | 'saturated' | 'declining';
  predictedPeak: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  topHashtags: string[];
  sparkline: number[];
  relatedEntities: string[];
  keyDrivers: string[];
}

export interface EarlyWarningAlert {
  id: string;
  type: 'viral_surge' | 'narrative_shift' | 'controversy_spike' | 'influencer_broadcast';
  title: string;
  summary: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  confidence: number;
  impactScore: number;
  platformSource: string;
}

export const MOCK_TRENDS_DATA = {
  stats: {
    totalActiveTrends: 148,
    viralClusters: 12,
    highestVelocityTopic: '#ArtificialIntelligence',
    avgGrowthRate: '+84.2%',
    earlyAlertsActive: 4,
  },
  trends: [
    {
      id: 'trend-1',
      topic: '#ArtificialIntelligence',
      category: 'Tech',
      mentions: 384500,
      growth24h: 168.4,
      velocity: 16200,
      acceleration: 24.5,
      sentimentScore: 82,
      lifecycle: 'peaking',
      predictedPeak: 'Next 4-6 Hours',
      riskLevel: 'Low',
      topHashtags: ['#GenAI', '#DeepLearning', '#NeuralNets', '#LLM'],
      sparkline: [20, 28, 45, 62, 85, 110, 145, 180, 220, 310, 384],
      relatedEntities: ['OpenAI', 'Google DeepMind', 'Anthropic', 'NVIDIA'],
      keyDrivers: ['Benchmark releases', 'Breakthrough open weight models'],
    },
    {
      id: 'trend-2',
      topic: '#IndiaAI Mission',
      category: 'Policy',
      mentions: 192400,
      growth24h: 124.0,
      velocity: 8400,
      acceleration: 38.2,
      sentimentScore: 88,
      lifecycle: 'rising',
      predictedPeak: '18 Hours',
      riskLevel: 'Low',
      topHashtags: ['#DigitalIndia', '#TechInnovation', '#ViksitBharat', '#GovTech'],
      sparkline: [10, 15, 22, 38, 55, 78, 98, 130, 160, 192],
      relatedEntities: ['MeitY', 'Startups Hub', 'CDAC', 'IIT Bombay'],
      keyDrivers: ['Compute grant announcements', 'Sovereign AI initiatives'],
    },
    {
      id: 'trend-3',
      topic: '#OpenSourceWeights',
      category: 'Tech',
      mentions: 146800,
      growth24h: 88.6,
      velocity: 6100,
      acceleration: 19.8,
      sentimentScore: 92,
      lifecycle: 'rising',
      predictedPeak: '24 Hours',
      riskLevel: 'Low',
      topHashtags: ['#HuggingFace', '#Llama', '#Mistral', '#SelfHosting'],
      sparkline: [30, 42, 50, 68, 75, 90, 110, 125, 146],
      relatedEntities: ['Meta AI', 'Mistral AI', 'Ollama', 'vLLM'],
      keyDrivers: ['Locally runnable quantized model releases'],
    },
    {
      id: 'trend-4',
      topic: '#APIPricingDebate',
      category: 'Business',
      mentions: 94200,
      growth24h: 46.2,
      velocity: 3900,
      acceleration: -8.4,
      sentimentScore: 38,
      lifecycle: 'saturated',
      predictedPeak: 'Past Peak (-12%)',
      riskLevel: 'Medium',
      topHashtags: ['#CloudCosts', '#TokenPricing', '#DevWoes', '#FinOps'],
      sparkline: [40, 70, 95, 110, 105, 98, 94],
      relatedEntities: ['AWS', 'Azure OpenAI', 'Stripe', 'LangChain'],
      keyDrivers: ['Enterprise subscription adjustments'],
    },
    {
      id: 'trend-5',
      topic: '#QuantumSupercomputing',
      category: 'Hardware',
      mentions: 68100,
      growth24h: 215.3,
      velocity: 4800,
      acceleration: 64.0,
      sentimentScore: 79,
      lifecycle: 'emerging',
      predictedPeak: '36 Hours',
      riskLevel: 'Low',
      topHashtags: ['#QuantumComputing', '#Qubits', '#SiliconPhotonics'],
      sparkline: [5, 8, 12, 18, 28, 42, 55, 68],
      relatedEntities: ['IBM Quantum', 'Rigetti', 'DARPA', 'MIT'],
      keyDrivers: ['Fault-tolerant logical qubit breakthrough paper'],
    },
    {
      id: 'trend-6',
      topic: '#DataPrivacyStandards',
      category: 'Policy',
      mentions: 52400,
      growth24h: -14.2,
      velocity: 1800,
      acceleration: -22.0,
      sentimentScore: 49,
      lifecycle: 'declining',
      predictedPeak: 'Declined',
      riskLevel: 'Medium',
      topHashtags: ['#GDPR', '#DPDPAct', '#DataCompliance'],
      sparkline: [90, 85, 78, 70, 62, 55, 52],
      relatedEntities: ['EU Commission', 'US FTC', 'Privacy Org'],
      keyDrivers: ['Routine quarterly regulatory briefing conclusion'],
    },
  ] as TrendTopic[],
  alerts: [
    {
      id: 'alert-1',
      type: 'viral_surge',
      title: 'Sudden Viral Spike: #QuantumSupercomputing (+215% in 4h)',
      summary: 'Cross-platform cascade detected originating from arXiv pre-print thread on X, rapidly amplified by Telegram tech channels.',
      severity: 'critical',
      timestamp: '18m ago',
      confidence: 0.96,
      impactScore: 92,
      platformSource: 'Twitter / Telegram',
    },
    {
      id: 'alert-2',
      type: 'narrative_shift',
      title: 'Sentiment Shift: Developer sentiment on #APIPricing turning negative',
      summary: 'High volume of developer grievances around unannounced rate limits in tier 2 cloud tiers.',
      severity: 'warning',
      timestamp: '1h ago',
      confidence: 0.89,
      impactScore: 68,
      platformSource: 'Reddit / Hacker News',
    },
    {
      id: 'alert-3',
      type: 'influencer_broadcast',
      title: 'Major KOL Broadcast: Dr. Mehta published benchmark comparison',
      summary: 'Received 3.8K reposts within 40 minutes, catalyzing downstream discussions across 14 Discord developer servers.',
      severity: 'info',
      timestamp: '2h ago',
      confidence: 0.94,
      impactScore: 79,
      platformSource: 'Twitter / Discord',
    },
  ] as EarlyWarningAlert[],
};
