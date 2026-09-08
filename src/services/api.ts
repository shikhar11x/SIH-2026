import { delay } from '../lib/utils';
import { MOCK_OVERVIEW } from './mocks/overview';
import { MOCK_PLATFORMS } from './mocks/platforms';
import { MOCK_SENTIMENT_DATA } from './mocks/sentiment';
import { MOCK_DEMOGRAPHICS_DATA } from './mocks/demographics';
import { MOCK_TRENDS_DATA } from './mocks/trends';
import { MOCK_NETWORK_DATA } from './mocks/network';
import { MOCK_FLOW_DATA } from './mocks/flow';
import { MOCK_TIMELINE_DATA } from './mocks/timeline';
import { MOCK_CROSS_PLATFORM_DATA } from './mocks/crossPlatform';
import { MOCK_INGESTION_DATA } from './mocks/dataIngestion';
import { MOCK_REPORTS_DATA, type IntelligenceReportItem } from './mocks/reports';
import { COPILOT_KNOWLEDGE_BASE, type CopilotMessage } from './mocks/copilot';

const SIMULATED_LATENCY_MS = 250;

/**
 * SocialPulse AI API Client
 * Clean abstraction layer designed for seamless transition from mock to production backend REST/GraphQL/WebSocket endpoints.
 */
export const api = {
  // Overview intelligence
  async getOverview() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_OVERVIEW;
  },

  // Platform connectors
  async getPlatforms() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_PLATFORMS;
  },

  async togglePlatformSync(platformId: string) {
    await delay(200);
    const platform = MOCK_PLATFORMS.find((p) => p.id === platformId);
    if (platform) {
      platform.status = platform.status === 'connected' ? 'available' : 'connected';
    }
    return platform;
  },

  // Sentiment Intelligence
  async getSentimentData() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_SENTIMENT_DATA;
  },

  // Demographics / Audience Intelligence
  async getDemographicsData() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_DEMOGRAPHICS_DATA;
  },

  // Trends Intelligence
  async getTrendsData() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_TRENDS_DATA;
  },

  // Network & KOL Intelligence
  async getNetworkData() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_NETWORK_DATA;
  },

  // Information Flow & Cascade
  async getInformationFlowData() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_FLOW_DATA;
  },

  // Conversation Timeline
  async getTimelineData() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_TIMELINE_DATA;
  },

  // Cross-Platform Matrix
  async getCrossPlatformData() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_CROSS_PLATFORM_DATA;
  },

  // Data Ingestion & Streaming logs
  async getDataIngestionStatus() {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_INGESTION_DATA;
  },

  async triggerManualIngestion(fileMeta: { name: string; size: number; records: number }) {
    await delay(600);
    const newJob = {
      id: `job-${Date.now()}`,
      source: `Manual Upload: ${fileMeta.name}`,
      platform: 'Custom Upload',
      sourceIcon: 'file-text',
      status: 'active' as const,
      recordsProcessed: fileMeta.records,
      ratePerSecond: 120,
      lastSync: 'Just now',
      health: 'healthy' as const,
      errorCount: 0,
    };
    return newJob;
  },

  // Intelligence Reports
  async getReports(): Promise<IntelligenceReportItem[]> {
    await delay(SIMULATED_LATENCY_MS);
    return MOCK_REPORTS_DATA;
  },

  async generateReport(config: { title: string; category: string; format: string }): Promise<IntelligenceReportItem> {
    await delay(800);
    const newReport: IntelligenceReportItem = {
      id: `rep-${Date.now()}`,
      title: config.title || 'Generated Custom Intelligence Brief',
      category: (config.category as any) || 'Executive Brief',
      generatedAt: 'Just now',
      postsAnalyzed: 2418000,
      format: (config.format as any) || 'PDF',
      fileSize: '3.6 MB',
      status: 'Ready',
      highlights: [
        'Automated synthesis of 2.4M multi-platform social conversations',
        'Neural sentiment and emotion classification validated',
        'Cross-platform narrative divergence benchmarked',
      ],
      sentimentScore: 76.5,
    };
    MOCK_REPORTS_DATA.unshift(newReport);
    return newReport;
  },

  // AI Copilot
  async sendCopilotQuery(prompt: string): Promise<CopilotMessage> {
    await delay(500);
    const lower = prompt.toLowerCase();
    let response: CopilotMessage;

    if (lower.includes('spike') || lower.includes('friday') || lower.includes('sentiment surge')) {
      response = { ...COPILOT_KNOWLEDGE_BASE.spike, id: `msg-${Date.now()}` };
    } else if (lower.includes('influencer') || lower.includes('kol') || lower.includes('leaders') || lower.includes('centrality')) {
      response = { ...COPILOT_KNOWLEDGE_BASE.influencers, id: `msg-${Date.now()}` };
    } else if (lower.includes('compare') || lower.includes('reddit') || lower.includes('twitter') || lower.includes('cross')) {
      response = { ...COPILOT_KNOWLEDGE_BASE.compare, id: `msg-${Date.now()}` };
    } else {
      response = {
        ...COPILOT_KNOWLEDGE_BASE.default,
        id: `msg-${Date.now()}`,
        text: `Analysis for "${prompt}":\n\nCross-referencing 2.4M posts shows high correlation with our deeptech and sovereign AI clusters. Sentiment remains predominantly positive (62.4%), with acceleration across X and Telegram channels. Key influencer sentiment is trending favorably at 78/100.`,
      };
    }

    return response;
  },
};
