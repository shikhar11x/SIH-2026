import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  TrendingUp,
  Sparkles,
  Bot,
  ArrowRight,
  Share2,
  Send,
  MessageCircle,
  Video,
  Database,
  Heart,
  Network,
  Activity,
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
    { name: 'Positive', value: overview.sentimentSnapshot.positive, color: '#16a34a' },
    { name: 'Neutral', value: overview.sentimentSnapshot.neutral, color: '#d97706' },
    { name: 'Negative', value: overview.sentimentSnapshot.negative, color: '#dc2626' },
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
        title="National Social Intelligence Overview"
        subtitle="Real-time multi-channel feed analysis across X, Telegram, Reddit, and YouTube (2.4M+ conversations analyzed)"
        tag="SIH-2026 ARCHITECTURE READY"
        onRefresh={handleRefresh}
        isRefreshing={refreshing}
        onExport={() => setExportOpen(true)}
      />

      {/* SIH-2026 Core 5-Component Matrix Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {[
          { comp: 'A', label: 'Data & Timeline', to: '/data', icon: Database, color: 'text-orange-600', bg: 'hover:bg-orange-50' },
          { comp: 'B', label: 'Sentiment (NLP)', to: '/analysis/sentiment', icon: Heart, color: 'text-emerald-600', bg: 'hover:bg-emerald-50' },
          { comp: 'C', label: 'Demographics', to: '/analysis/demographics', icon: Users, color: 'text-blue-600', bg: 'hover:bg-blue-50' },
          { comp: 'D', label: 'Trend Radar', to: '/analysis/trends', icon: TrendingUp, color: 'text-amber-600', bg: 'hover:bg-amber-50' },
          { comp: 'E', label: 'Link Topology', to: '/analysis/network', icon: Network, color: 'text-purple-600', bg: 'hover:bg-purple-50' },
        ].map((c) => (
          <button
            key={c.comp}
            onClick={() => navigate(c.to)}
            className={`p-3 bg-white border border-slate-200 rounded-xl ${c.bg} transition text-left flex items-center justify-between group shadow-sm`}
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block">COMPONENT {c.comp}</span>
              <h5 className="text-xs font-bold text-slate-800 group-hover:text-slate-900">{c.label}</h5>
            </div>
            <c.icon className={`w-4 h-4 ${c.color}`} />
          </button>
        ))}
      </div>

      {/* Live Stream Health Strip Focus (App-focused realtime fetching) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800">X / Twitter</span>
              <span className="text-[10px] text-slate-500 block font-mono">184 msgs/sec</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800">Telegram Channels</span>
              <span className="text-[10px] text-slate-500 block font-mono">68 msgs/sec</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800">Reddit Subreddits</span>
              <span className="text-[10px] text-slate-500 block font-mono">52 msgs/sec</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800">YouTube Tech Feeds</span>
              <span className="text-[10px] text-slate-500 block font-mono">38 msgs/sec</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* AI Executive Briefing Banner with Indian Touch */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-5 bg-gradient-to-r from-orange-50 via-white to-emerald-50 border-orange-200 shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-800">
                  National Neural Intelligence Briefing
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  98.4% Confidence (India Stack AI)
                </span>
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-4xl">{overview.aiSummary}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/copilot')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm flex-shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>Consult Copilot</span>
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
          iconColor="text-blue-700"
        />
        <StatCard
          title="Unique Citizen Participants"
          value={formatNumber(overview.metrics.uniqueUsers)}
          change={8.2}
          trend="up"
          icon={Users}
          iconColor="text-orange-600"
        />
        <StatCard
          title="National Sentiment Index"
          value={`${overview.metrics.sentimentScore} / 100`}
          change={overview.sentimentSnapshot.change}
          changePeriod="positive sentiment lift"
          trend="up"
          icon={Activity}
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Active Viral Topics"
          value={overview.metrics.emergingTrends}
          subtitle="Realtime early alerts"
          trend="neutral"
          icon={TrendingUp}
          iconColor="text-orange-600"
          onClick={() => navigate('/analysis/trends')}
        />
      </div>

      {/* Row 2: Sentiment Breakdown + Volume Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Snapshot */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Sentiment Polarity</h3>
              <p className="text-xs text-slate-500 font-medium">Distribution across analyzed posts</p>
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
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-xl font-bold text-slate-900">{overview.sentimentSnapshot.positive}%</span>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Positive</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200 text-center">
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700">{overview.sentimentSnapshot.positive}%</span>
              <p className="text-[10px] text-slate-500">Positive</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-700">{overview.sentimentSnapshot.neutral}%</span>
              <p className="text-[10px] text-slate-500">Neutral</p>
            </div>
            <div className="p-2 rounded-lg bg-rose-50 border border-rose-200">
              <span className="text-xs font-bold text-rose-700">{overview.sentimentSnapshot.negative}%</span>
              <p className="text-[10px] text-slate-500">Negative</p>
            </div>
          </div>
        </div>

        {/* 14-Day Timeline Sparkline Area Chart */}
        <div className="glass-panel p-5 lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Multi-Channel Ingestion Timeline</h3>
              <p className="text-xs text-slate-500 font-medium">Daily social conversation volume aggregated in real-time</p>
            </div>
            <button
              onClick={() => navigate('/analysis/timeline')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>Full Timeline</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData.timeline}>
                <defs>
                  <linearGradient id="colorVolumeGov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickFormatter={(val) => `${val / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                  formatter={(val: any) => [formatNumber(val), 'Volume']}
                />
                <Area type="monotone" dataKey="totalVolume" stroke="#ea580c" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVolumeGov)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
            <span>Peak Activity: <strong className="text-slate-900">Day 8 (420K posts)</strong></span>
            <span>Current Ingestion Run-rate: <strong className="text-orange-600">342 items / sec</strong></span>
          </div>
        </div>
      </div>

      {/* Row 3: Trending Topics + Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Trends */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Real-time Trending Narratives</h3>
                <p className="text-xs text-slate-500 font-medium">Fastest accelerating topics in India</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/analysis/trends')}
              className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {overview.trendSnapshot.map((item: any, idx: number) => (
              <div
                key={idx}
                onClick={() => navigate('/analysis/trends')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-300 transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 font-mono text-xs font-extrabold text-orange-600">#{idx + 1}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 hover:text-orange-600 transition">{item.topic}</h4>
                    <p className="text-[11px] text-slate-500">{formatNumber(item.mentions)} live mentions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'viral'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : item.status === 'rising'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
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
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Platform Stream Share</h3>
                <p className="text-xs text-slate-500 font-medium">Volume distribution across integrated channels</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/platforms')}
              className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
            >
              <span>Platform Hub</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformVolumeData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 5 }}>
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v}k`} />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={12} width={90} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val}K posts`, 'Volume']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                />
                <Bar dataKey="posts" fill="#ea580c" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
            <div>Leading: <strong className="text-slate-900">X / Twitter (42%)</strong></div>
            <div>Fastest Feed: <strong className="text-emerald-700">Telegram (+34%)</strong></div>
            <div>Active KOLs: <strong className="text-slate-900">842 Leaders</strong></div>
          </div>
        </div>
      </div>

      {/* Row 4: Live Social Post Feed Stream */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Live Real-time Social Stream</h3>
              <p className="text-xs text-slate-500 font-medium">Sampled incoming posts categorized with tone and confidence scores</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/analysis/sentiment')}
            className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
          >
            <span>Sentiment Grid</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sentimentData.samplePosts.map((post: any) => (
            <div
              key={post.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 leading-none">{post.author}</h5>
                      <span className="text-[11px] text-slate-500 font-mono">{post.handle}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlatformBadge platform={post.platform} size="sm" showLabel={false} />
                    <SentimentBadge sentiment={post.sentiment} score={post.confidence * 100} size="sm" />
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">{post.content}</p>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {post.tags.map((tag: string, i: number) => (
                    <span key={i} className="text-orange-700 font-semibold">{tag}</span>
                  ))}
                </div>
                <span className="font-mono text-slate-400">{post.timestamp}</span>
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
