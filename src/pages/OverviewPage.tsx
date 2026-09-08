import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  Activity,
  TrendingUp,
  Sparkles,
  Bot,
  ArrowRight,
  Globe,
  Radio,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { api } from '../services/api';
import { StatCard } from '../components/common/StatCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { SentimentBadge } from '../components/common/SentimentBadge';
import { PlatformBadge } from '../components/common/PlatformBadge';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';

export default function OverviewPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [sentimentData, setSentimentData] = useState<any>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [ov, sent] = await Promise.all([
        api.getOverview(),
        api.getSentimentData(),
      ]);
      setOverview(ov);
      setSentimentData(sent);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading || !overview) {
    return <LoadingSkeleton rows={6} height="h-64" />;
  }

  const sentimentPieData = [
    { name: 'Positive', value: overview.sentimentSnapshot.positive, color: '#10b981' },
    { name: 'Neutral', value: overview.sentimentSnapshot.neutral, color: '#f59e0b' },
    { name: 'Negative', value: overview.sentimentSnapshot.negative, color: '#ef4444' },
  ];

  const platformVolumeData = [
    { name: 'X / Twitter', posts: 1020, share: '42%' },
    { name: 'Reddit', posts: 520, share: '22%' },
    { name: 'Telegram', posts: 350, share: '15%' },
    { name: 'YouTube', posts: 270, share: '11%' },
    { name: 'LinkedIn', posts: 170, share: '7%' },
    { name: 'Instagram', posts: 70, share: '3%' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <SectionHeader
        title="Social Intelligence Overview"
        subtitle="Unified multi-channel intelligence synthesized from 2.4M+ social conversations across 6 connected platforms"
        tag="LIVE SYNTHESIS"
        onRefresh={handleRefresh}
        isRefreshing={refreshing}
        onExport={() => setExportOpen(true)}
      />

      {/* AI Executive Briefing Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-5 relative overflow-hidden border-accent/30 bg-gradient-to-r from-accent/15 via-navy-800/80 to-purple-900/10 shadow-[0_0_30px_rgba(99,102,241,0.15)]"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-light flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-light">
                  Neural Intelligence Synthesis
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  98.4% Confidence
                </span>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed max-w-4xl">{overview.aiSummary}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/copilot')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-dark text-white transition shadow-glow flex-shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>Consult AI Copilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Conversations Analyzed"
          value={formatNumber(overview.metrics.totalPosts)}
          change={14.8}
          changePeriod="vs last 7d"
          trend="up"
          icon={MessageSquare}
          accentGlow
        />
        <StatCard
          title="Unique Participants"
          value={formatNumber(overview.metrics.uniqueUsers)}
          change={8.2}
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Net Sentiment Score"
          value={`${overview.metrics.sentimentScore}/100`}
          change={overview.sentimentSnapshot.change}
          changePeriod="sentiment lift"
          trend="up"
          icon={Activity}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Emerging Viral Trends"
          value={overview.metrics.emergingTrends}
          subtitle="12 critical early warnings"
          trend="neutral"
          icon={TrendingUp}
          iconColor="text-purple-400"
          onClick={() => navigate('/analysis/trends')}
        />
      </div>

      {/* Row 2: Sentiment Breakdown + Volume Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Snapshot */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sentiment Polarity</h3>
              <p className="text-xs text-gray-400">Distribution across analyzed posts</p>
            </div>
            <SentimentBadge sentiment="positive" score={overview.sentimentSnapshot.positive} size="sm" />
          </div>

          <div className="h-44 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sentimentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#0f1629', borderColor: '#374151', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-xl font-bold text-white">{overview.sentimentSnapshot.positive}%</span>
              <p className="text-[10px] text-gray-400">Positive</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5 text-center">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-xs font-bold text-emerald-400">{overview.sentimentSnapshot.positive}%</span>
              <p className="text-[10px] text-gray-400">Positive</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-xs font-bold text-amber-400">{overview.sentimentSnapshot.neutral}%</span>
              <p className="text-[10px] text-gray-400">Neutral</p>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-xs font-bold text-rose-400">{overview.sentimentSnapshot.negative}%</span>
              <p className="text-[10px] text-gray-400">Negative</p>
            </div>
          </div>
        </div>

        {/* 14-Day Timeline Sparkline Area Chart */}
        <div className="glass-panel p-5 lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Conversation Volume Trend</h3>
              <p className="text-xs text-gray-400">Multi-channel daily ingested message volume</p>
            </div>
            <button
              onClick={() => navigate('/analysis/timeline')}
              className="text-xs font-medium text-accent-light hover:underline flex items-center gap-1"
            >
              <span>Full Timeline</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData.timeline}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickFormatter={(val) => `${val / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f1629', borderColor: '#374151', borderRadius: '8px' }}
                  formatter={(val: any) => [formatNumber(val), 'Volume']}
                />
                <Area type="monotone" dataKey="totalVolume" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/5">
            <span>Peak Activity: <strong className="text-white">Day 8 (420K posts)</strong></span>
            <span>Avg Daily Run-rate: <strong className="text-white">284K posts/day</strong></span>
          </div>
        </div>
      </div>

      {/* Row 3: Trending Topics + Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Trends */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center text-accent-light">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">High Velocity Topics</h3>
                <p className="text-xs text-gray-400">Topics gaining viral acceleration</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/analysis/trends')}
              className="text-xs text-accent-light hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {overview.trendSnapshot.map((item: any, idx: number) => (
              <div
                key={idx}
                onClick={() => navigate('/analysis/trends')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 font-mono text-xs font-bold text-gray-500">#{idx + 1}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white hover:text-accent-light transition">{item.topic}</h4>
                    <p className="text-[11px] text-gray-400">{formatNumber(item.mentions)} mentions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'viral'
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/25 animate-pulse'
                        : item.status === 'rising'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : 'bg-accent/15 text-accent-light border border-accent/25'
                    }`}
                  >
                    +{item.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Share of Voice */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center text-accent-light">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Platform Ingestion Share</h3>
                <p className="text-xs text-gray-400">Share of voice across connected channels</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/platforms')}
              className="text-xs text-accent-light hover:underline flex items-center gap-1"
            >
              <span>Manage Connectors</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformVolumeData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 5 }}>
                <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v}k`} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={90} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val}K posts`, 'Volume']}
                  contentStyle={{ backgroundColor: '#0f1629', borderColor: '#374151', borderRadius: '8px' }}
                />
                <Bar dataKey="posts" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-white/5 text-center text-xs text-gray-400">
            <div>Leading: <strong className="text-white">X (42%)</strong></div>
            <div>Fastest Growth: <strong className="text-emerald-400">Telegram (+34%)</strong></div>
            <div>Active Nodes: <strong className="text-white">842 KOLs</strong></div>
          </div>
        </div>
      </div>

      {/* Row 4: Live Social Post Intelligence Stream */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Intelligence Stream</h3>
              <p className="text-xs text-gray-400">Real-time sampled posts classified with sentiment & emotion</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/analysis/sentiment')}
            className="text-xs text-accent-light hover:underline flex items-center gap-1"
          >
            <span>Deep Dive in Sentiment</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sentimentData.samplePosts.map((post: any) => (
            <div
              key={post.id}
              className="p-4 rounded-xl bg-navy-800/80 border border-white/5 hover:border-accent/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    <div>
                      <h5 className="text-xs font-bold text-white leading-none">{post.author}</h5>
                      <span className="text-[11px] text-gray-400 font-mono">{post.handle}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlatformBadge platform={post.platform} size="sm" showLabel={false} />
                    <SentimentBadge sentiment={post.sentiment} score={post.confidence * 100} size="sm" />
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">{post.content}</p>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-[11px] text-gray-400">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {post.tags.map((tag: string, i: number) => (
                    <span key={i} className="text-accent-light opacity-90">{tag}</span>
                  ))}
                </div>
                <span className="font-mono">{post.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Executive Intelligence Brief" />
    </div>
  );
}
