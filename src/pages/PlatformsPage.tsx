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

  const getSIHTier = (id: string) => {
    switch (id) {
      case 'twitter':
      case 'telegram':
        return { label: 'Essentials (Must-Have)', color: 'bg-orange-50 text-orange-700 border-orange-200' };
      case 'instagram':
      case 'facebook':
        return { label: 'Desirable (Good-to-Have)', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'reddit':
      case 'youtube':
        return { label: 'Appreciable (Comments NLP)', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { label: 'Appreciable Addition', color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Real-Time Platform Feeds & Ingestion Connectors"
        subtitle="Live streaming decahose hooks categorized by SIH-2026 Problem Statement Platform Ingestion Tiers"
        tag="SIH COMPONENT A: MULTI-PLATFORM INGESTION"
        onRefresh={loadPlatforms}
      />

      {/* Platform Statistics summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 flex items-center gap-4 bg-white border border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Active Live Feeds</p>
            <h4 className="text-xl font-extrabold text-slate-900">6 Connected Channels</h4>
            <p className="text-[11px] text-emerald-700 font-mono font-bold">99.98% Stream Uptime</p>
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center gap-4 bg-white border border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Aggregated Fetch Rate</p>
            <h4 className="text-xl font-extrabold text-slate-900">342 msgs / sec</h4>
            <p className="text-[11px] text-slate-500 font-medium">Sub-500ms neural indexing</p>
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center gap-4 bg-white border border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Rate Limit Shield</p>
            <h4 className="text-xl font-extrabold text-slate-900">Zero Violations</h4>
            <p className="text-[11px] text-blue-700 font-medium">Dynamic backoff active</p>
          </div>
        </div>
      </div>

      {/* Grid of Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {platforms.map((p) => {
          const Icon = getPlatformIcon(p.icon);
          const isConnected = p.status === 'connected';
          const tier = getSIHTier(p.id);

          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -2 }}
              className="glass-panel p-5 bg-white border border-slate-200 hover:border-orange-300 transition flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* SIH Tier Pill */}
                <div className="mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${tier.color}`}>
                    {tier.label}
                  </span>
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: p.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{p.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                          }`}
                        />
                        <span className="text-[11px] font-mono capitalize text-slate-500 font-semibold">
                          {isConnected ? 'Realtime Streaming' : 'Available'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSync(p)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition border ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {isConnected ? 'Live' : 'Connect'}
                  </button>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3 text-center">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{formatNumber(p.stats.totalPosts)}</span>
                    <span className="text-[10px] text-slate-500">Ingested</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{formatNumber(p.stats.totalUsers)}</span>
                    <span className="text-[10px] text-slate-500">Accounts</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 block">{p.stats.engagement}%</span>
                    <span className="text-[10px] text-slate-500">Avg Engage</span>
                  </div>
                </div>

                {/* Capabilities pills */}
                <div className="flex items-center gap-1.5 flex-wrap my-3">
                  {p.capabilities.map((cap, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                <span className="text-[11px] text-slate-400 font-mono">Sync: Decahose Hook</span>
                <button
                  onClick={() => openConfig(p)}
                  className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 transition font-bold"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure Hook</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {configModalOpen && selectedPlatform && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white border border-slate-200 p-6 rounded-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setConfigModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
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
                  <h3 className="text-lg font-bold text-slate-900">{selectedPlatform.name} Hook Parameters</h3>
                  <p className="text-xs text-slate-500 font-medium">Configure Indian keyword filters, streaming pipelines, and rate thresholds</p>
                </div>
              </div>

              <div className="space-y-4 my-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Stream Search & Keyword Operators</label>
                  <input
                    type="text"
                    defaultValue="#IndiaAI, #DigitalBharat, #SovereignCompute, #CyberSecurity, #GovTech"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:border-orange-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Comma-separated tags for national surveillance monitor</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Ingestion Mode</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-orange-500 outline-none">
                      <option>Real-Time Decahose Stream</option>
                      <option>High-Priority KOL Polling</option>
                      <option>Hourly Aggregation</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Language Filter</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-orange-500 outline-none">
                      <option>Multi-lingual Indic (Hindi/Tamil/Telugu/Eng)</option>
                      <option>English Only</option>
                      <option>Hindi Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">National Ingestion Webhook</label>
                  <input
                    type="text"
                    readOnly
                    value={`https://api.socialpulse.gov.in/v1/streams/${selectedPlatform.id}_decahose`}
                    className="w-full bg-slate-100 font-mono text-[11px] text-slate-700 border border-slate-200 rounded-xl px-3.5 py-2 select-all outline-none font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setConfigModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfig}
                  disabled={savingConfig || saveSuccess}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm disabled:opacity-50"
                >
                  {savingConfig ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Parameters...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Stream Active!</span>
                    </>
                  ) : (
                    <span>Save Hook Settings</span>
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
