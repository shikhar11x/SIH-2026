import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  UploadCloud,
  FileText,
  Activity,
  CheckCircle2,
  Clock,
  Terminal,
  RefreshCw,
  Sliders,
  X,
  FileUp,
} from 'lucide-react';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { formatNumber } from '../lib/utils';
import type { IngestionJob, IngestionLog } from '../services/mocks/dataIngestion';

export default function DataIngestionPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<IngestionLog[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; records: number } | null>(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      const randomLog: IngestionLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        level: Math.random() > 0.8 ? 'warn' : 'success',
        source: ['Twitter Decahose', 'Telegram Ingest', 'Reddit Stream', 'Embedding Worker'][
          Math.floor(Math.random() * 4)
        ],
        message: `Batch #${Math.floor(Math.random() * 9000 + 1000)} vectorized & indexed (${Math.floor(
          Math.random() * 800 + 200
        )} records, latency ${Math.floor(Math.random() * 200 + 80)}ms).`,
      };
      setLogs((prev) => [randomLog, ...prev.slice(0, 15)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const res = await api.getDataIngestionStatus();
      setData(res);
      setLogs(res.recentLogs);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    await api.triggerManualIngestion({
      name: selectedFile.name,
      size: 1024 * 1024 * 2.4,
      records: selectedFile.records,
    });
    setUploading(false);
    setUploadDone(true);
    setTimeout(() => {
      setUploadDone(false);
      setUploadModalOpen(false);
      setSelectedFile(null);
      loadData();
    }, 1200);
  };

  if (loading || !data) {
    return <LoadingSkeleton rows={5} height="h-56" />;
  }

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Data Ingestion & Pipeline Monitor"
        subtitle="Real-time multi-threaded ingestion engine processing decahose streams and custom batch uploads"
        tag="PIPELINE LIVE"
        onRefresh={loadData}
        actions={
          <button
            onClick={() => {
              setSelectedFile({ name: 'social_conversations_batch_2026.csv', size: '14.2 MB', records: 45000 });
              setUploadModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-accent hover:bg-accent-dark text-white transition shadow-glow"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Batch Dataset</span>
          </button>
        }
      />

      {/* Pipeline KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ingested in Last 24 Hours"
          value={data.stats.totalIngestedToday}
          change={12.4}
          trend="up"
          icon={Database}
          accentGlow
        />
        <StatCard
          title="Live Ingestion Throughput"
          value={data.stats.throughputRate}
          subtitle="All 6 pipelines active"
          trend="up"
          icon={Activity}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="End-to-End Latency"
          value={data.stats.pipelineLatency}
          subtitle="Vectorization + Sentiment"
          trend="neutral"
          icon={Clock}
        />
        <StatCard
          title="Pipeline Error Rate"
          value={data.stats.errorRate}
          change="-0.01%"
          changePeriod="error reduction"
          trend="up"
          icon={CheckCircle2}
          iconColor="text-emerald-400"
        />
      </div>

      {/* Active Pipeline Jobs Table */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center text-accent-light">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Ingestion Pipelines</h3>
              <p className="text-xs text-gray-400">Status, record volume, and processing rates</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All Workers Nominal
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Data Source / Pipeline</th>
                <th className="py-3 px-3">Platform</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Processed Records</th>
                <th className="py-3 px-3 text-right">Throughput</th>
                <th className="py-3 px-3 text-right">Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.jobs.map((job: IngestionJob) => (
                <tr key={job.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{job.source}</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-300 font-medium">{job.platform}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono">
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-white">
                    {formatNumber(job.recordsProcessed)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-accent-light">
                    {job.ratePerSecond > 0 ? `${job.ratePerSecond} msg/s` : 'Idle'}
                  </td>
                  <td className="py-3.5 px-3 text-right text-gray-400 font-mono text-[11px]">{job.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Pipeline Telemetry Log Stream */}
      <div className="glass-panel p-5 bg-navy-900/90 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent-light" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Live Ingestion Telemetry Stream</h3>
          </div>
          <span className="text-[10px] font-mono text-gray-500">Auto-scrolling • Buffer 100 lines</span>
        </div>

        <div className="h-64 overflow-y-auto font-mono text-xs space-y-2 p-3 rounded-xl bg-navy-950/80 border border-white/5">
          <AnimatePresence>
            {logs.map((log) => {
              const isErr = log.level === 'error';
              const isWarn = log.level === 'warn';
              const isSuccess = log.level === 'success';

              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 leading-relaxed text-[11px]"
                >
                  <span className="text-gray-500 flex-shrink-0">{log.timestamp}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold flex-shrink-0 ${
                      isErr
                        ? 'bg-rose-500/20 text-rose-400'
                        : isWarn
                        ? 'bg-amber-500/20 text-amber-400'
                        : isSuccess
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-accent-light flex-shrink-0">[{log.source}]</span>
                  <span className="text-gray-300">{log.message}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Batch Upload Modal Simulator */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-panel bg-navy-800/95 border border-white/10 p-6 rounded-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setUploadModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-light">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Batch Ingestion Simulator</h3>
                  <p className="text-xs text-gray-400">Upload social conversation export (CSV, JSON, Parquet)</p>
                </div>
              </div>

              {selectedFile ? (
                <div className="p-4 rounded-xl bg-navy-900 border border-accent/30 space-y-3 my-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-accent-light" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{selectedFile.name}</h4>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {selectedFile.size} • {formatNumber(selectedFile.records)} records detected
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Schema Validated
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-400 bg-navy-950 p-2.5 rounded-lg font-mono space-y-1">
                    <div>Detected columns: [id, author, timestamp, platform, text_content, language]</div>
                    <div>Target cluster: Natural Language Pipeline & Sentiment Classifier</div>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSimulateUpload}
                  disabled={uploading || uploadDone}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-dark text-white transition shadow-glow disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Vectorizing & Ingesting...</span>
                    </>
                  ) : uploadDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>45,000 Records Ingested!</span>
                    </>
                  ) : (
                    <>
                      <FileUp className="w-3.5 h-3.5" />
                      <span>Start Pipeline Ingestion</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
