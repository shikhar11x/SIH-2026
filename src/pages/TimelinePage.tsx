import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  TrendingUp,
  AlertCircle,
  Flag,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import type { InflectionEvent } from '../services/mocks/timeline';

export default function TimelinePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<InflectionEvent | null>(null);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    loadTimeline();
  }, []);

  const loadTimeline = async () => {
    try {
      const res = await api.getTimelineData();
      setData(res);
      if (res.events && res.events.length > 0) {
        setSelectedEvent(res.events[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <LoadingSkeleton rows={6} height="h-64" />;
  }

  const getEventBadgeClass = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/25';
      case 'viral_spike':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/25';
      case 'controversy':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/25';
      case 'milestone':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25';
      default:
        return 'bg-accent/15 text-accent-light border-accent/25';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Conversation Timeline & Inflection Points"
        subtitle="Chronological sequence reconstruction with volume spike anomaly detection and sentiment correlation"
        tag="CHRONO CORRELATION"
        onRefresh={loadTimeline}
        onExport={() => setExportOpen(true)}
      />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Weekly Volume"
          value={formatNumber(data.metrics.totalConversations)}
          subtitle="Hourly multi-channel aggregation"
          trend="up"
          icon={Clock}
          accentGlow
        />
        <StatCard
          title="Peak Volume Spike"
          value="142,000 / hr"
          subtitle="Friday 14:00 (Compute Subsidy)"
          trend="up"
          icon={Zap}
          iconColor="text-amber-400"
        />
        <StatCard
          title="Highest Sentiment Window"
          value="88% Positive"
          subtitle="Saturday 11:00 (Tech Demo Dips)"
          trend="up"
          icon={TrendingUp}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Lowest Sentiment Anomaly"
          value="42% Positive"
          subtitle="Thursday 19:00 (API Tier Backlash)"
          trend="down"
          icon={AlertCircle}
          iconColor="text-rose-400"
        />
      </div>

      {/* Dual Axis Interactive Composed Chart */}
      <div className="glass-panel p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Dual-Axis Volume & Sentiment Correlation
            </h3>
            <p className="text-xs text-gray-400">
              Purple area denotes hourly post volume; green line denotes real-time net positive sentiment score
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-accent-light">
              <span className="w-3 h-3 rounded bg-accent/40 border border-accent" /> Hourly Volume (Left)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-0.5 bg-emerald-400" /> Sentiment % (Right)
            </span>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data.series}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                yAxisId="left"
                stroke="#818cf8"
                fontSize={11}
                tickFormatter={(v) => `${v / 1000}k`}
                tickLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                stroke="#10b981"
                fontSize={11}
                tickFormatter={(v) => `${v}%`}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f1629', borderColor: '#374151', borderRadius: '8px' }}
                formatter={(val: any, name: any) => [
                  name === 'volume' ? `${formatNumber(val)} posts` : `${val}% Positive`,
                  name === 'volume' ? 'Hourly Volume' : 'Net Sentiment',
                ]}
              />
              <Area yAxisId="left" type="monotone" dataKey="volume" fill="url(#volGrad)" stroke="#6366f1" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="sentiment" stroke="#10b981" strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inflection Event Timeline Cards */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-accent-light" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Annotated Inflection Points & Anomalies
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-400">4 Critical Inflections Detected</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.events.map((evt: InflectionEvent) => {
            const isSelected = selectedEvent?.id === evt.id;

            return (
              <motion.div
                key={evt.id}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedEvent(evt)}
                className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-accent/15 border-accent shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                    : 'bg-navy-800/80 border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono border ${getEventBadgeClass(evt.type)}`}>
                      {evt.type.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">{evt.time}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">{evt.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">{evt.description}</p>
                </div>

                <div className="space-y-1.5 pt-2.5 border-t border-white/5 text-[11px] font-mono">
                  <div className="flex justify-between text-gray-400">
                    <span>Volume Delta:</span>
                    <strong className="text-white">{evt.volumeImpact}</strong>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Sentiment Delta:</span>
                    <strong className="text-emerald-400">{evt.sentimentImpact}</strong>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Author / Source:</span>
                    <span className="text-accent-light">{evt.author} ({evt.platform})</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Conversation Timeline Dossier" />
    </div>
  );
}
