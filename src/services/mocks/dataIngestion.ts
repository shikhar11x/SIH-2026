export interface IngestionJob {
  id: string;
  source: string;
  platform: string;
  sourceIcon: string;
  status: 'active' | 'synced' | 'queued' | 'paused' | 'error';
  recordsProcessed: number;
  ratePerSecond: number;
  lastSync: string;
  health: 'healthy' | 'warning' | 'degraded';
  errorCount: number;
}

export interface IngestionLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  source: string;
  message: string;
  details?: string;
}

export const MOCK_INGESTION_DATA = {
  stats: {
    totalIngestedToday: '1,482,900 posts',
    throughputRate: '342 items/sec',
    pipelineLatency: '420ms (p99: 1.2s)',
    errorRate: '0.04%',
    activeConnectors: 7,
  },
  jobs: [
    {
      id: 'job-1',
      source: 'X Enterprise Decahose Stream',
      platform: 'Twitter',
      sourceIcon: 'twitter',
      status: 'active',
      recordsProcessed: 842000,
      ratePerSecond: 184,
      lastSync: 'Just now',
      health: 'healthy',
      errorCount: 2,
    },
    {
      id: 'job-2',
      source: 'Reddit r/all & AI Subreddits Webhook',
      platform: 'Reddit',
      sourceIcon: 'reddit',
      status: 'active',
      recordsProcessed: 218000,
      ratePerSecond: 52,
      lastSync: '2s ago',
      health: 'healthy',
      errorCount: 0,
    },
    {
      id: 'job-3',
      source: 'Telegram Channel Broadcast Ingestor',
      platform: 'Telegram',
      sourceIcon: 'send',
      status: 'active',
      recordsProcessed: 145000,
      ratePerSecond: 36,
      lastSync: '4s ago',
      health: 'healthy',
      errorCount: 1,
    },
    {
      id: 'job-4',
      source: 'YouTube Data API v3 Comment Feed',
      platform: 'YouTube',
      sourceIcon: 'youtube',
      status: 'active',
      recordsProcessed: 98000,
      ratePerSecond: 28,
      lastSync: '12s ago',
      health: 'healthy',
      errorCount: 0,
    },
    {
      id: 'job-5',
      source: 'Custom CSV Batch Ingestion (#Batch-2026-09)',
      platform: 'Custom Upload',
      sourceIcon: 'file-text',
      status: 'synced',
      recordsProcessed: 50000,
      ratePerSecond: 0,
      lastSync: '15m ago',
      health: 'healthy',
      errorCount: 0,
    },
    {
      id: 'job-6',
      source: 'LinkedIn Social Graph API',
      platform: 'LinkedIn',
      sourceIcon: 'linkedin',
      status: 'active',
      recordsProcessed: 68000,
      ratePerSecond: 14,
      lastSync: '1s ago',
      health: 'healthy',
      errorCount: 0,
    },
  ] as IngestionJob[],
  recentLogs: [
    {
      id: 'log-1',
      timestamp: '21:58:14',
      level: 'success',
      source: 'Twitter Stream',
      message: 'Batch #41092 normalized and vector indexed (1,240 records in 184ms).',
    },
    {
      id: 'log-2',
      timestamp: '21:58:08',
      level: 'info',
      source: 'Sentiment Pipeline',
      message: 'Multi-lingual emotion classification completed for 480 Hindi & Tamil posts.',
    },
    {
      id: 'log-3',
      timestamp: '21:57:42',
      level: 'warn',
      source: 'Telegram Ingest',
      message: 'Rate limit threshold warning at 85% capacity. Backoff buffer active.',
    },
    {
      id: 'log-4',
      timestamp: '21:57:15',
      level: 'info',
      source: 'Cluster Worker',
      message: 'Modularity recalculation updated 4 community partitions.',
    },
    {
      id: 'log-5',
      timestamp: '21:56:50',
      level: 'success',
      source: 'Reddit Webhook',
      message: 'Subreddit r/LocalLLaMA megathread 42 new comments processed.',
    },
  ] as IngestionLog[],
};
