import { useEffect, useState } from 'react';
import IndiaMap from '../components/IndiaMap/IndiaMap';
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
import { usePlatform } from '../layouts/DashboardLayout';
import { PLATFORM_STATS, PLATFORM_FILTERS } from '../mocks/indiaMapData';



export default function OverviewPage() {
  const navigate = useNavigate();
  const { selectedPlatform, setSelectedPlatform } = usePlatform();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [sentimentData, setSentimentData] = useState<any>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [ov, sent] = await Promise.all([api.getOverview(), api.getSentimentData()]);
      setOverview(ov);
      setSentimentData(sent);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);
  const handleRefresh = () => { setRefreshing(true); fetchData(); };

  if (loading || !overview) return <LoadingSkeleton rows={6} height="h-64" />;

  // Platform-aware stats
  const pStats = PLATFORM_STATS[selectedPlatform] ?? PLATFORM_STATS['all'];
  const activePlatform = PLATFORM_FILTERS.find((p) => p.id === selectedPlatform)!;

  const sentimentPieData = [
    { name: 'Positive', value: overview.sentimentSnapshot.positive, color: '#16a34a' },
    { name: 'Neutral', value: overview.sentimentSnapshot.neutral, color: '#d97706' },
    { name: 'Negative', value: overview.sentimentSnapshot.negative, color: '#dc2626' },
  ];

  const platformVolumeData = [
    { name: 'X / Twitter', posts: 1020 },
    { name: 'Reddit', posts: 520 },
    { name: 'Telegram', posts: 350 },
    { name: 'YouTube', posts: 270 },
    { name: 'LinkedIn', posts: 170 },
    { name: 'Instagram', posts: 70 },
  ];

  const navCards = [
    { label: 'Data Streams', to: '/data', icon: Database, color: 'text-orange-600', bg: 'hover:bg-orange-50' },
    { label: 'Sentiment', to: '/analysis/sentiment', icon: Heart, color: 'text-emerald-600', bg: 'hover:bg-emerald-50' },
    { label: 'Demographics', to: '/analysis/demographics', icon: Users, color: 'text-amber-600', bg: 'hover:bg-amber-50' },
    { label: 'Trend Radar', to: '/analysis/trends', icon: TrendingUp, color: 'text-rose-600', bg: 'hover:bg-rose-50' },
    { label: 'Network Links', to: '/analysis/network', icon: Network, color: 'text-purple-600', bg: 'hover:bg-purple-50' },
  ];

  return (
    <div className="space-y-5 pb-12">

      {/* Header */}
      <SectionHeader
        title={selectedPlatform === 'all' ? 'National Social Intelligence Overview' : `${activePlatform.label} Dashboard`}
        subtitle={selectedPlatform === 'all'
          ? 'Real-time multi-channel feed analysis across all platforms'
          : `Deep-dive analytics for ${activePlatform.label} — hover map for state trends`}
        onRefresh={handleRefresh}
        isRefreshing={refreshing}
        onExport={() => setExportOpen(true)}
      />

      {/* Platform Quick-Switch Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {PLATFORM_FILTERS.map((pf) => (
          <button
            key={pf.id}
            onClick={() => setSelectedPlatform(pf.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition border
              ${selectedPlatform === pf.id
                ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-600'
              }`}
          >
            <span>{pf.emoji}</span>
            <span>{pf.label}</span>
          </button>
        ))}
      </div>

      {/* Nav Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {navCards.map((c) => (
          <button
            key={c.label}
            onClick={() => navigate(c.to)}
            className={`p-3 bg-white border border-slate-100 rounded-xl ${c.bg} transition text-left flex items-center justify-between group shadow-sm hover:shadow-md`}
          >
            <h5 className="text-xs font-bold text-slate-700 group-hover:text-slate-900">{c.label}</h5>
            <c.icon className={`w-4 h-4 ${c.color}`} />
          </button>
        ))}
      </div>

      {/* Platform-aware KPI Cards */}
      <motion.div
        key={selectedPlatform}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Total Posts Analyzed"
          value={formatNumber(pStats.posts)}
          change={pStats.growth}
          changePeriod="vs last 7d"
          trend="up"
          icon={MessageSquare}
          iconColor="text-orange-600"
        />
        <StatCard
          title="Active Participants"
          value={formatNumber(pStats.users)}
          change={8.2}
          trend="up"
          icon={Users}
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Sentiment Score"
          value={`${pStats.sentiment} / 100`}
          change={overview.sentimentSnapshot.change}
          changePeriod="positive lift"
          trend="up"
          icon={Activity}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Top Trending Topic"
          value={pStats.topTopic}
          subtitle="Fastest growing"
          trend="neutral"
          icon={TrendingUp}
          iconColor="text-rose-600"
          onClick={() => navigate('/analysis/trends')}
        />
      </motion.div>

      {/* ── BIG SECTION: India Map + Live Stream ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* India Map — 3/5 width */}
        <div className="lg:col-span-3 glass-panel p-2 sm:p-3 relative overflow-hidden flex flex-col" style={{ minHeight: 560 }}>
          <div className="flex-1 w-full h-full min-h-[520px]">
            <IndiaMap
              platform={selectedPlatform}
              onSelectState={(stateName) => {
                // Navigate to trend radar with state pre-filtered if needed or show feedback
                console.log('Selected state:', stateName);
              }}
            />
          </div>
        </div>

        {/* Right col — Live feeds + Trending */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Platform Live Rates */}
          <div className="glass-panel p-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Live Feed Rates</h3>
            <div className="space-y-2">
              {[
                { label: 'X / Twitter', rate: '184 msgs/s', icon: Share2, bg: 'bg-sky-50', color: 'text-sky-600' },
                { label: 'Telegram', rate: '68 msgs/s', icon: Send, bg: 'bg-blue-50', color: 'text-blue-600' },
                { label: 'Reddit', rate: '52 msgs/s', icon: MessageCircle, bg: 'bg-orange-50', color: 'text-orange-600' },
                { label: 'YouTube', rate: '38 msgs/s', icon: Video, bg: 'bg-red-50', color: 'text-red-600' },
              ].map(({ label, rate, icon: Icon, bg, color }) => (
                <div key={label} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${bg} ${color} flex items-center justify-center`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">{rate}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Trending in selected platform */}
          <div className="glass-panel p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Trending Now</h3>
              <button onClick={() => navigate('/analysis/trends')} className="text-xs font-bold text-orange-600 flex items-center gap-1 hover:underline">
                All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {pStats.trending.map((tag, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-orange-200 transition cursor-pointer">
                  <span className="text-[11px] font-mono font-extrabold text-orange-600 w-5">#{i + 1}</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-800">{tag}</span>
                  </div>
                </div>
              ))}
              {overview.trendSnapshot.slice(0, 4).map((item: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => navigate('/analysis/trends')}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-orange-200 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-extrabold text-slate-400 w-5">#{pStats.trending.length + idx + 1}</span>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-700">{item.topic}</h4>
                      <p className="text-[10px] text-slate-400">{formatNumber(item.mentions)} mentions</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'viral' ? 'bg-rose-100 text-rose-700'
                    : item.status === 'rising' ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-500'}`}>
                    +{item.growth}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Briefing */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-5 bg-gradient-to-r from-orange-50 via-white to-emerald-50 border-orange-100"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-800">
                  AI Intelligence Briefing
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  98.4% Confidence
                </span>
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-4xl">{overview.aiSummary}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/copilot')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow flex-shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>Ask Copilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Bottom Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Sentiment Donut */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Sentiment</h3>
              <p className="text-xs text-slate-400">Distribution snapshot</p>
            </div>
            <SentimentBadge sentiment="positive" score={overview.sentimentSnapshot.positive} size="sm" />
          </div>
          <div className="h-44 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={4} dataKey="value">
                  {sentimentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-xl font-bold text-slate-900">{overview.sentimentSnapshot.positive}%</span>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Positive</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
            <div className="p-2 rounded-lg bg-emerald-50">
              <span className="text-xs font-bold text-emerald-700">{overview.sentimentSnapshot.positive}%</span>
              <p className="text-[10px] text-slate-400">Positive</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50">
              <span className="text-xs font-bold text-amber-700">{overview.sentimentSnapshot.neutral}%</span>
              <p className="text-[10px] text-slate-400">Neutral</p>
            </div>
            <div className="p-2 rounded-lg bg-rose-50">
              <span className="text-xs font-bold text-rose-700">{overview.sentimentSnapshot.negative}%</span>
              <p className="text-[10px] text-slate-400">Negative</p>
            </div>
          </div>
        </div>

        {/* Volume Timeline */}
        <div className="glass-panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Ingestion Timeline</h3>
              <p className="text-xs text-slate-400">Daily volume · real-time</p>
            </div>
            <button onClick={() => navigate('/analysis/timeline')} className="text-xs font-bold text-orange-600 flex items-center gap-1 hover:underline">
              Full <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData.timeline}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                  formatter={(val: any) => [formatNumber(val), 'Volume']} />
                <Area type="monotone" dataKey="totalVolume" stroke="#ea580c" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVol)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
            <span>Peak: <strong className="text-slate-700">Day 8 (420K posts)</strong></span>
            <span>Run-rate: <strong className="text-orange-600">342 items/sec</strong></span>
          </div>
        </div>
      </div>

      {/* Platform Share Bar */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Platform Share of Voice</h3>
              <p className="text-xs text-slate-400">Volume across channels</p>
            </div>
          </div>
          <button onClick={() => navigate('/platforms')} className="text-xs font-bold text-orange-600 flex items-center gap-1 hover:underline">
            Platform Hub <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformVolumeData} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
              <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v}k`} />
              <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} width={90} tickLine={false} />
              <Tooltip formatter={(val: any) => [`${val}K posts`, 'Volume']}
                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
              <Bar dataKey="posts" fill="#ea580c" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Social Stream */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Live Social Stream</h3>
              <p className="text-xs text-slate-400">Sampled posts · tone scored</p>
            </div>
          </div>
          <button onClick={() => navigate('/analysis/sentiment')} className="text-xs font-bold text-orange-600 flex items-center gap-1 hover:underline">
            Sentiment Grid <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sentimentData.samplePosts.map((post: any) => (
            <div key={post.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 leading-none">{post.author}</h5>
                      <span className="text-[11px] text-slate-400 font-mono">{post.handle}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlatformBadge platform={post.platform} size="sm" showLabel={false} />
                    <SentimentBadge sentiment={post.sentiment} score={post.confidence * 100} size="sm" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{post.content}</p>
              </div>
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {post.tags.map((tag: string, i: number) => (
                    <span key={i} className="text-orange-600 font-semibold">{tag}</span>
                  ))}
                </div>
                <span className="font-mono">{post.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Intelligence Brief" />
    </div>
  );
}
