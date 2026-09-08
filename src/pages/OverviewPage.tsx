import { useEffect, useState } from 'react';
import IndiaMap from '../components/IndiaMap/IndiaMap';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  TrendingUp,
  ArrowRight,
  Share2,
  Send,
  MessageCircle,
  Video,
  Database,
  Heart,
  Network,
  Activity,
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
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import { usePlatform } from '../layouts/DashboardLayout';
import { PLATFORM_STATS, PLATFORM_FILTERS } from '../mocks/indiaMapData';

// Dedicated Platform Dashboards
import TwitterDashboard from '../components/PlatformDashboards/TwitterDashboard';
import YouTubeDashboard from '../components/PlatformDashboards/YouTubeDashboard';
import TelegramDashboard from '../components/PlatformDashboards/TelegramDashboard';
import RedditDashboard from '../components/PlatformDashboards/RedditDashboard';
import InstagramDashboard from '../components/PlatformDashboards/InstagramDashboard';
import LinkedInDashboard from '../components/PlatformDashboards/LinkedInDashboard';

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

  const renderPlatformDashboard = () => {
    switch (selectedPlatform) {
      case 'twitter':
        return <TwitterDashboard />;
      case 'youtube':
        return <YouTubeDashboard />;
      case 'telegram':
        return <TelegramDashboard />;
      case 'reddit':
        return <RedditDashboard />;
      case 'instagram':
        return <InstagramDashboard />;
      case 'linkedin':
        return <LinkedInDashboard />;
      default:
        return (
          <div className="space-y-6">
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>

            {/* ── BIG SECTION: India Map + Live Stream ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* India Map — 3/5 width */}
              <div className="lg:col-span-3 glass-panel p-2 sm:p-3 relative overflow-hidden flex flex-col" style={{ minHeight: 560 }}>
                <div className="flex-1 w-full h-full min-h-[520px]">
                  <IndiaMap
                    platform={selectedPlatform}
                    onSelectState={(stateName) => {
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
                  </div>
                </div>
              </div>
            </div>

            {/* ── LOWER SECTION: Charts Row ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Sentiment Snapshot Donut */}
              <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Sentiment Index</h3>
                  <button onClick={() => navigate('/analysis/sentiment')} className="text-xs text-orange-600 font-bold hover:underline">
                    Details
                  </button>
                </div>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {sentimentPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-around text-xs font-semibold pt-1 border-t border-slate-100 text-center">
                  <div><span className="text-emerald-700 font-bold">{overview.sentimentSnapshot.positive}%</span><br/><span className="text-slate-600 text-[10px]">Positive</span></div>
                  <div><span className="text-amber-700 font-bold">{overview.sentimentSnapshot.neutral}%</span><br/><span className="text-slate-600 text-[10px]">Neutral</span></div>
                  <div><span className="text-rose-700 font-bold">{overview.sentimentSnapshot.negative}%</span><br/><span className="text-slate-600 text-[10px]">Negative</span></div>
                </div>
              </div>

              {/* Volume 24h Timeline */}
              <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">24h Ingestion Timeline</h3>
                  <span className="text-[10px] font-mono text-slate-600">Peak: 38K / hr</span>
                </div>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sentimentData.trendTimeline}>
                      <defs>
                        <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="volume" stroke="#ea580c" strokeWidth={2} fillOpacity={1} fill="url(#volGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-600 text-center pt-1 border-t border-slate-100 font-mono">
                  Live streaming decahose ingestion active
                </p>
              </div>

              {/* Platform Share Bar */}
              <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Platform Volume Share</h3>
                  <button onClick={() => navigate('/platforms')} className="text-xs text-orange-600 font-bold hover:underline">
                    Feeds
                  </button>
                </div>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformVolumeData} layout="vertical" margin={{ left: 10, right: 10 }}>
                      <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} width={65} />
                      <Tooltip />
                      <Bar dataKey="posts" fill="#ea580c" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-600 text-center pt-1 border-t border-slate-100">
                  Total 2.4M posts across 6 live streaming platforms
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <SectionHeader
        title={selectedPlatform === 'all' ? 'National Social Intelligence Overview' : `${activePlatform.label} Dedicated Dashboard`}
        subtitle={selectedPlatform === 'all'
          ? 'Real-time multi-channel feed analysis across all platforms'
          : `Deep-dive platform analytics, live post feeds, and topic sentiment for ${activePlatform.label}`}
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition border cursor-pointer ${
              selectedPlatform === pf.id
                ? pf.id === 'youtube'
                  ? 'bg-red-600 text-white border-red-600 shadow-md'
                  : pf.id === 'twitter'
                  ? 'bg-black text-white border-black shadow-md'
                  : pf.id === 'telegram'
                  ? 'bg-[#0088cc] text-white border-[#0088cc] shadow-md'
                  : pf.id === 'reddit'
                  ? 'bg-[#FF4500] text-white border-[#FF4500] shadow-md'
                  : pf.id === 'instagram'
                  ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white border-pink-500 shadow-md'
                  : pf.id === 'linkedin'
                  ? 'bg-[#0A66C2] text-white border-[#0A66C2] shadow-md'
                  : 'bg-orange-600 text-white border-orange-600 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-600'
            }`}
          >
            <span>{pf.emoji}</span>
            <span>{pf.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic View (All Platforms Overview OR Individual Platform Dashboard) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPlatform}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderPlatformDashboard()}
        </motion.div>
      </AnimatePresence>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}
