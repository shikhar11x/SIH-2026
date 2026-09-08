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
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'rising':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'emerging':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'saturated':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'declining':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="National Trend Intelligence & Early Warning Radar"
        subtitle="Real-time viral acceleration algorithms detecting nascent hashtags and social spikes across India"
        tag="PREDICTIVE RADAR"
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
          iconColor="text-orange-600"
        />
        <StatCard
          title="Viral Topic Clusters"
          value={data.stats.viralClusters}
          change={data.stats.avgGrowthRate}
          changePeriod="avg growth"
          trend="up"
          icon={Flame}
          iconColor="text-rose-600"
        />
        <StatCard
          title="Highest Velocity Narrative"
          value={data.stats.highestVelocityTopic}
          subtitle="16.2K mentions/hour"
          trend="up"
          icon={Zap}
          iconColor="text-amber-600"
        />
        <StatCard
          title="Early Warning Anomaly Alerts"
          value={data.stats.earlyAlertsActive}
          subtitle="1 Critical alert active"
          trend="neutral"
          icon={AlertTriangle}
          iconColor="text-rose-600"
        />
      </div>

      {/* Early Warning Alert Feed */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Early Warning Alerts</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {data.alerts.map((alert: EarlyWarningAlert) => {
            const isCrit = alert.severity === 'critical';
            const isWarn = alert.severity === 'warning';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border bg-white shadow-sm transition ${
                  isCrit
                    ? 'border-rose-300 bg-rose-50/40 hover:border-rose-400'
                    : isWarn
                    ? 'border-amber-300 bg-amber-50/40 hover:border-amber-400'
                    : 'border-orange-300 bg-orange-50/40 hover:border-orange-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                      isCrit
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : isWarn
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-orange-100 text-orange-800 border border-orange-200'
                    }`}
                  >
                    {alert.severity} • {Math.round(alert.confidence * 100)}% Confidence
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{alert.timestamp}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mb-1.5 leading-snug">{alert.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-3 font-medium">{alert.summary}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-mono font-semibold">
                  <span>Source: {alert.platformSource}</span>
                  <span className="text-slate-900 font-bold">Impact: {alert.impactScore}/100</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trend Lifecycle Filter & Search Toolbar */}
      <div className="glass-panel p-4 bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search hashtag or topic in India..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Lifecycle Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'emerging', 'rising', 'peaking', 'saturated', 'declining'] as const).map((lc) => (
            <button
              key={lc}
              onClick={() => setSelectedLifecycle(lc)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition ${
                selectedLifecycle === lc
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
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
              className="glass-panel p-5 bg-white border border-slate-200 hover:border-orange-300 transition cursor-pointer flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-700 tracking-wider mb-0.5 block font-mono">
                      {t.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 hover:text-orange-600 transition">{t.topic}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getLifecycleColor(t.lifecycle)}`}>
                    {t.lifecycle}
                  </span>
                </div>

                {/* Key stats row */}
                <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-slate-100 text-center">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{formatNumber(t.mentions)}</span>
                    <span className="text-[10px] text-slate-500">Mentions</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 block">+{t.growth24h}%</span>
                    <span className="text-[10px] text-slate-500">24h Growth</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{formatNumber(t.velocity)}/h</span>
                    <span className="text-[10px] text-slate-500">Velocity</span>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="h-16 my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                      <defs>
                        <linearGradient id={`gradient-${t.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ea580c" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#ea580c" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="val" stroke="#ea580c" strokeWidth={2} fill={`url(#gradient-${t.id})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {t.topHashtags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 font-mono font-semibold">
                <span>Peak: {t.predictedPeak}</span>
                <span className="text-emerald-700 font-bold">{t.sentimentScore}/100 Sent</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trend Detail Drawer / Modal */}
      <AnimatePresence>
        {selectedTrend && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-white border border-slate-200 p-6 rounded-2xl relative shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-orange-700 font-mono">{selectedTrend.category}</span>
                  <h3 className="text-lg font-bold text-slate-900">{selectedTrend.topic}</h3>
                </div>
                <button
                  onClick={() => setSelectedTrend(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Total Mentions</span>
                  <p className="text-base font-bold text-slate-900">{formatNumber(selectedTrend.mentions)}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Hourly Velocity</span>
                  <p className="text-base font-bold text-orange-600">{formatNumber(selectedTrend.velocity)} / hr</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">Acceleration</span>
                  <p className="text-base font-bold text-emerald-700">+{selectedTrend.acceleration}% / hr²</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-800">Key Drivers:</h4>
                <ul className="list-disc list-inside text-slate-600 space-y-1 font-medium">
                  {selectedTrend.keyDrivers.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-800">Related Entities:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrend.relatedEntities.map((ent, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono font-semibold">
                      {ent}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-200">
                <button
                  onClick={() => setSelectedTrend(null)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition shadow-sm"
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
