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
        timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
        level: Math.random() > 0.8 ? 'warn' : 'success',
        source: ['X / Twitter Stream', 'Telegram Channel Hook', 'Reddit Ingest', 'Indic Embeddings Worker'][
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
        title="Continuous Data Collection & Timeline Pipeline"
        subtitle="Multi-platform live ingestion pipeline streaming social feeds and maintaining time-stamped historical chronology"
        tag="SIH COMPONENT A: CONTINUOUS DATA COLLECTION & TIMELINE"
        onRefresh={loadData}
        actions={
          <button
            onClick={() => {
              setSelectedFile({ name: 'india_ai_social_firehose_2026.csv', size: '14.2 MB', records: 45000 });
              setUploadModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm"
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
          iconColor="text-blue-700"
        />
        <StatCard
          title="Live Throughput Rate"
          value={data.stats.throughputRate}
          subtitle="Real-time X, Telegram & Reddit"
          trend="up"
          icon={Activity}
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Pipeline Neural Latency"
          value={data.stats.pipelineLatency}
          subtitle="Vectorization + Sentiment"
          trend="neutral"
          icon={Clock}
        />
        <StatCard
          title="Pipeline Error Rate"
          value={data.stats.errorRate}
          change="-0.01%"
          changePeriod="high reliability"
          trend="up"
          icon={CheckCircle2}
          iconColor="text-emerald-700"
        />
      </div>

      {/* Active Pipeline Jobs Table */}
      <div className="glass-panel p-5 bg-white border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Active Real-Time Ingestion Streams</h3>
              <p className="text-xs text-slate-500 font-medium">Status, record volume, and processing rates</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            All Workers Nominal
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider bg-slate-50">
                <th className="py-3 px-3">Data Source / Pipeline</th>
                <th className="py-3 px-3">Platform</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Processed Records</th>
                <th className="py-3 px-3 text-right">Fetch Rate</th>
                <th className="py-3 px-3 text-right">Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.jobs.map((job: IngestionJob) => (
                <tr key={job.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{job.source}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{job.platform}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase font-mono">
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900">
                    {formatNumber(job.recordsProcessed)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-orange-600 font-bold">
                    {job.ratePerSecond > 0 ? `${job.ratePerSecond} msg/s` : 'Idle'}
                  </td>
                  <td className="py-3.5 px-3 text-right text-slate-400 font-mono text-[11px]">{job.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Ingestion Telemetry Stream */}
      <div className="glass-panel p-5 bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Live Ingestion Telemetry Stream</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Auto-scrolling • Buffer 100 lines</span>
        </div>

        <div className="h-64 overflow-y-auto font-mono text-xs space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
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
                  <span className="text-slate-500 flex-shrink-0">{log.timestamp}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold flex-shrink-0 ${
                      isErr
                        ? 'bg-rose-900 text-rose-300'
                        : isWarn
                        ? 'bg-amber-900 text-amber-300'
                        : isSuccess
                        ? 'bg-emerald-900 text-emerald-300'
                        : 'bg-blue-900 text-blue-300'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-orange-400 flex-shrink-0">[{log.source}]</span>
                  <span className="text-slate-300">{log.message}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Batch Upload Modal Simulator */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white border border-slate-200 p-6 rounded-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setUploadModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Batch Ingestion Simulator</h3>
                  <p className="text-xs text-slate-500 font-medium">Upload Indian social conversational dataset (CSV, JSON)</p>
                </div>
              </div>

              {selectedFile ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-orange-200 space-y-3 my-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-orange-600" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{selectedFile.name}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {selectedFile.size} • {formatNumber(selectedFile.records)} records detected
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Schema Validated
                    </span>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSimulateUpload}
                  disabled={uploading || uploadDone}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm disabled:opacity-50"
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
