import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Share2,
  Send,
  MessageSquare,
  Video,
  Camera,
  Briefcase,
  Radio,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Shield,
  X,
} from 'lucide-react';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { formatNumber } from '../lib/utils';
import type { Platform } from '../types/platform';

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadPlatforms();
  }, []);

  const loadPlatforms = async () => {
    try {
      const data = await api.getPlatforms();
      setPlatforms(data);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSync = async (p: Platform) => {
    const updated = await api.togglePlatformSync(p.id);
    if (updated) {
      setPlatforms((prev) => prev.map((item) => (item.id === p.id ? { ...item, status: updated.status } : item)));
    }
  };

  const openConfig = (p: Platform) => {
    setSelectedPlatform(p);
    setConfigModalOpen(true);
  };

  const handleSaveConfig = () => {
    setSavingConfig(true);
    setTimeout(() => {
      setSavingConfig(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setConfigModalOpen(false);
      }, 1000);
    }, 800);
  };

  if (loading) {
    return <LoadingSkeleton rows={4} height="h-48" />;
  }

  const getPlatformIcon = (icon: string) => {
    switch (icon) {
      case 'twitter':
        return Share2;
      case 'telegram':
        return Send;
      case 'reddit':
        return MessageSquare;
      case 'youtube':
        return Video;
      case 'instagram':
        return Camera;
      case 'linkedin':
        return Briefcase;
      default:
        return Globe;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Platform Connectors & Hub"
        subtitle="Manage live decahose streams, webhooks, and multi-channel social ingestion pipelines"
        tag="STREAM CONNECTIVITY"
        onRefresh={loadPlatforms}
      />

      {/* Platform Statistics summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Active Connectors</p>
            <h4 className="text-xl font-bold text-white">6 / 8 Connected</h4>
            <p className="text-[11px] text-emerald-400 font-mono">99.98% Stream Uptime</p>
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Aggregated Ingestion Rate</p>
            <h4 className="text-xl font-bold text-white">342 msgs / sec</h4>
            <p className="text-[11px] text-gray-400">Sub-500ms neural indexing</p>
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Rate Limit Shield</p>
            <h4 className="text-xl font-bold text-white">Zero Violations</h4>
            <p className="text-[11px] text-purple-400">Dynamic adaptive backoff</p>
          </div>
        </div>
      </div>

      {/* Grid of Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {platforms.map((p) => {
          const Icon = getPlatformIcon(p.icon);
          const isConnected = p.status === 'connected';

          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -3 }}
              className="glass-panel p-5 border border-white/5 hover:border-accent/40 transition flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: p.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">{p.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'
                          }`}
                        />
                        <span className="text-[11px] font-mono capitalize text-gray-400">
                          {isConnected ? 'Live Streaming' : 'Available'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSync(p)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition border ${
                      isConnected
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isConnected ? 'Active' : 'Connect'}
                  </button>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 my-3 text-center">
                  <div>
                    <span className="text-xs font-bold text-white block">{formatNumber(p.stats.totalPosts)}</span>
                    <span className="text-[10px] text-gray-400">Posts Ingested</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{formatNumber(p.stats.totalUsers)}</span>
                    <span className="text-[10px] text-gray-400">Unique Users</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 block">{p.stats.engagement}%</span>
                    <span className="text-[10px] text-gray-400">Avg Engage</span>
                  </div>
                </div>

                {/* Capabilities pills */}
                <div className="flex items-center gap-1.5 flex-wrap my-3">
                  {p.capabilities.map((cap, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                <span className="text-[11px] text-gray-500 font-mono">Sync: Continuous Webhook</span>
                <button
                  onClick={() => openConfig(p)}
                  className="flex items-center gap-1 text-xs text-accent-light hover:text-white transition font-medium"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {configModalOpen && selectedPlatform && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-panel bg-navy-800/95 border border-white/10 p-6 rounded-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setConfigModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: selectedPlatform.color }}
                >
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedPlatform.name} Pipeline Settings</h3>
                  <p className="text-xs text-gray-400">Configure ingestion filters, credentials and sampling rates</p>
                </div>
              </div>

              <div className="space-y-4 my-4">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">Stream Keyword Filters</label>
                  <input
                    type="text"
                    defaultValue="#AI, #MachineLearning, #DeepLearning, #IndiaAI, #OpenSource"
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:border-accent outline-none"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">Comma separated tags or search operators</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5">Ingestion Mode</label>
                    <select className="w-full bg-navy-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-accent outline-none">
                      <option>Real-Time Decahose Stream</option>
                      <option>Hourly Batch Sampling</option>
                      <option>High-Priority KOL Polling</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5">Language Filter</label>
                    <select className="w-full bg-navy-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-accent outline-none">
                      <option>All Languages (Multi-lingual AI)</option>
                      <option>English + Indic (Hindi/Tamil/Telugu)</option>
                      <option>English Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">Webhook Endpoint / Callback</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`https://api.socialpulse.ai/v1/webhooks/${selectedPlatform.id}_stream`}
                      className="w-full bg-navy-900 font-mono text-[11px] text-gray-300 border border-white/10 rounded-xl px-3.5 py-2 select-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => setConfigModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfig}
                  disabled={savingConfig || saveSuccess}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-dark text-white transition shadow-glow disabled:opacity-50"
                >
                  {savingConfig ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Validating & Saving...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Configuration Active!</span>
                    </>
                  ) : (
                    <span>Save Pipeline Config</span>
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
