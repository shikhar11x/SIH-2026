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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'viral_spike':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'controversy':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'milestone':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
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
          iconColor="text-amber-600"
        />
        <StatCard
          title="Highest Sentiment Window"
          value="88% Positive"
          subtitle="Saturday 11:00 (Tech Demo Dips)"
          trend="up"
          icon={TrendingUp}
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Lowest Sentiment Anomaly"
          value="42% Positive"
          subtitle="Thursday 19:00 (API Tier Backlash)"
          trend="down"
          icon={AlertCircle}
          iconColor="text-rose-600"
        />
      </div>

      {/* Dual Axis Interactive Composed Chart */}
      <div className="glass-panel p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Dual-Axis Volume & Sentiment Correlation
            </h3>
            <p className="text-xs text-slate-500">
              Saffron area denotes hourly post volume; green line denotes real-time net positive sentiment score
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-orange-700 font-semibold">
              <span className="w-3 h-3 rounded bg-orange-100 border border-orange-500" /> Hourly Volume (Left)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-3 h-0.5 bg-emerald-600" /> Sentiment % (Right)
            </span>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data.series}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                yAxisId="left"
                stroke="#ea580c"
                fontSize={11}
                tickFormatter={(v) => `${v / 1000}k`}
                tickLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                stroke="#16a34a"
                fontSize={11}
                tickFormatter={(v) => `${v}%`}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                formatter={(val: any, name: any) => [
                  name === 'volume' ? `${formatNumber(val)} posts` : `${val}% Positive`,
                  name === 'volume' ? 'Hourly Volume' : 'Net Sentiment',
                ]}
              />
              <Area yAxisId="left" type="monotone" dataKey="volume" fill="url(#volGrad)" stroke="#ea580c" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="sentiment" stroke="#16a34a" strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inflection Event Timeline Cards */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Annotated Inflection Points & Anomalies
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">4 Critical Inflections Detected</span>
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
                    ? 'bg-orange-50/70 border-orange-500 shadow-sm ring-2 ring-orange-400/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono border ${getEventBadgeClass(evt.type)}`}>
                      {evt.type.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{evt.time}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">{evt.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{evt.description}</p>
                </div>

                <div className="space-y-1.5 pt-2.5 border-t border-slate-100 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>Volume Delta:</span>
                    <strong className="text-slate-900">{evt.volumeImpact}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Sentiment Delta:</span>
                    <strong className="text-emerald-700">{evt.sentimentImpact}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Author / Source:</span>
                    <span className="text-orange-700 font-semibold">{evt.author} ({evt.platform})</span>
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
