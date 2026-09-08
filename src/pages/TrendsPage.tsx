import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Flame,
  Zap,
  AlertTriangle,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import type { TrendTopic, EarlyWarningAlert } from '../services/mocks/trends';

export default function TrendsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLifecycle, setSelectedLifecycle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrend, setSelectedTrend] = useState<TrendTopic | null>(null);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    loadTrends();
  }, []);

  const loadTrends = async () => {
    try {
      const res = await api.getTrendsData();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <LoadingSkeleton rows={6} height="h-64" />;
  }

  const filteredTrends = data.trends.filter((t: TrendTopic) => {
    const matchesLifecycle = selectedLifecycle === 'all' || t.lifecycle === selectedLifecycle;
    const matchesSearch =
      t.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLifecycle && matchesSearch;
  });

  const getLifecycleColor = (lc: string) => {
    switch (lc) {
      case 'peaking':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/25';
      case 'rising':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25';
      case 'emerging':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/25';
      case 'saturated':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
      case 'declining':
        return 'bg-gray-500/15 text-gray-400 border-gray-500/25';
      default:
        return 'bg-accent/15 text-accent-light border-accent/25';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Trend Intelligence & Early Warning Radar"
        subtitle="Real-time viral acceleration algorithms detecting nascent narratives and volume anomalies"
        tag="PREDICTIVE MOMENTUM"
        onRefresh={loadTrends}
        onExport={() => setExportOpen(true)}
      />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Tracked Trends"
          value={data.stats.totalActiveTrends}
          subtitle="43 above virality threshold"
          trend="up"
          icon={TrendingUp}
          accentGlow
        />
        <StatCard
          title="Viral Topic Clusters"
          value={data.stats.viralClusters}
          change={data.stats.avgGrowthRate}
          changePeriod="avg growth"
          trend="up"
          icon={Flame}
          iconColor="text-rose-400"
        />
        <StatCard
          title="Highest Velocity Narrative"
          value={data.stats.highestVelocityTopic}
          subtitle="16.2K mentions/hour"
          trend="up"
          icon={Zap}
          iconColor="text-amber-400"
        />
        <StatCard
          title="Early Warning Anomaly Alerts"
          value={data.stats.earlyAlertsActive}
          subtitle="1 Critical alert active"
          trend="neutral"
          icon={AlertTriangle}
          iconColor="text-rose-400"
        />
      </div>

      {/* Early Warning Alert Feed */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Early Warning Alerts</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {data.alerts.map((alert: EarlyWarningAlert) => {
            const isCrit = alert.severity === 'critical';
            const isWarn = alert.severity === 'warning';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border glass-panel transition ${
                  isCrit
                    ? 'border-rose-500/30 bg-rose-500/5 hover:border-rose-500/50'
                    : isWarn
                    ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50'
                    : 'border-accent/30 bg-accent/5 hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                      isCrit
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : isWarn
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-accent/20 text-accent-light border border-accent/30'
                    }`}
                  >
                    {alert.severity} • {Math.round(alert.confidence * 100)}% Confidence
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">{alert.timestamp}</span>
                </div>

                <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">{alert.title}</h4>
                <p className="text-[11px] text-gray-300 leading-relaxed mb-3">{alert.summary}</p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-gray-400 font-mono">
                  <span>Source: {alert.platformSource}</span>
                  <span className="text-white font-bold">Impact: {alert.impactScore}/100</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trend Lifecycle Filter & Search Toolbar */}
      <div className="glass-panel p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search topic or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-900 border border-white/10 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-gray-500 focus:border-accent outline-none"
          />
        </div>

        {/* Lifecycle Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'emerging', 'rising', 'peaking', 'saturated', 'declining'] as const).map((lc) => (
            <button
              key={lc}
              onClick={() => setSelectedLifecycle(lc)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition ${
                selectedLifecycle === lc
                  ? 'bg-accent text-white shadow-glow-sm'
                  : 'text-gray-400 hover:text-white bg-navy-900/60'
              }`}
            >
              {lc}
            </button>
          ))}
        </div>
      </div>

      {/* Main Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTrends.map((t: TrendTopic) => {
          const sparklineData = t.sparkline.map((val, idx) => ({ idx, val }));

          return (
            <motion.div
              key={t.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedTrend(t)}
              className="glass-panel p-5 border border-white/5 hover:border-accent/40 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-accent-light tracking-wider mb-0.5 block font-mono">
                      {t.category}
                    </span>
                    <h3 className="text-base font-bold text-white hover:text-accent-light transition">{t.topic}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getLifecycleColor(t.lifecycle)}`}>
                    {t.lifecycle}
                  </span>
                </div>

                {/* Key stats row */}
                <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-white/5 text-center">
                  <div>
                    <span className="text-xs font-bold text-white block">{formatNumber(t.mentions)}</span>
                    <span className="text-[10px] text-gray-400">Mentions</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 block">+{t.growth24h}%</span>
                    <span className="text-[10px] text-gray-400">24h Growth</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{formatNumber(t.velocity)}/h</span>
                    <span className="text-[10px] text-gray-400">Velocity</span>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="h-16 my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                      <defs>
                        <linearGradient id={`gradient-${t.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="val" stroke="#818cf8" strokeWidth={2} fill={`url(#gradient-${t.id})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {t.topHashtags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-[11px] text-gray-400 font-mono">
                <span>Peak: {t.predictedPeak}</span>
                <span className="text-emerald-400 font-semibold">{t.sentimentScore}/100 Sent</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trend Detail Drawer / Modal */}
      <AnimatePresence>
        {selectedTrend && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl glass-panel bg-navy-800/95 border border-white/10 p-6 rounded-2xl relative shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-accent-light font-mono">{selectedTrend.category}</span>
                  <h3 className="text-xl font-bold text-white">{selectedTrend.topic}</h3>
                </div>
                <button
                  onClick={() => setSelectedTrend(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-navy-900 rounded-xl text-center">
                <div>
                  <span className="text-xs text-gray-400">Total Mentions</span>
                  <p className="text-base font-bold text-white">{formatNumber(selectedTrend.mentions)}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Hourly Velocity</span>
                  <p className="text-base font-bold text-accent-light">{formatNumber(selectedTrend.velocity)} / hr</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Acceleration</span>
                  <p className="text-base font-bold text-emerald-400">+{selectedTrend.acceleration}% / hr²</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-gray-300">Key Catalysts & Drivers:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {selectedTrend.keyDrivers.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-gray-300">Co-Occurring Entities:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrend.relatedEntities.map((ent, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-mono">
                      {ent}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-white/5">
                <button
                  onClick={() => setSelectedTrend(null)}
                  className="px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark transition"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Trend Intelligence Report" />
    </div>
  );
}
