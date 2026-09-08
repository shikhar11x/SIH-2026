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
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Bell,
  MapPin,
  Zap,
  BarChart2,
  Bot,
  Flag,
  RefreshCw,
  Eye,
  ChevronRight,
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

// ── Helpers ───────────────────────────────────────────────────────────────────
const TODAY = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
});

function getMoodConfig(positive: number) {
  if (positive >= 65) return { label: 'Positive', emoji: '😊', color: 'emerald', bgFrom: '#d1fae5', bgTo: '#a7f3d0', border: '#6ee7b7', text: '#065f46', icon: CheckCircle };
  if (positive >= 45) return { label: 'Mixed', emoji: '😐', color: 'amber', bgFrom: '#fef3c7', bgTo: '#fde68a', border: '#fbbf24', text: '#92400e', icon: AlertCircle };
  return { label: 'Alert', emoji: '⚠️', color: 'red', bgFrom: '#fee2e2', bgTo: '#fecaca', border: '#f87171', text: '#7f1d1d', icon: AlertTriangle };
}

// ── Alert Banner ──────────────────────────────────────────────────────────────
function NationPulseBanner({ positive, trending }: { positive: number; trending: string }) {
  const mood = getMoodConfig(positive);
  const MoodIcon = mood.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-2"
      style={{ background: `linear-gradient(135deg, ${mood.bgFrom}, ${mood.bgTo})`, borderColor: mood.border }}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center flex-shrink-0 shadow-sm">
          <MoodIcon className={`w-7 h-7`} style={{ color: mood.text }} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: mood.text }}>
              राष्ट्रीय मनोस्थिति · Nation's Pulse
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/50 text-[10px] font-bold" style={{ color: mood.text }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block" />
              LIVE
            </span>
          </div>
          <p className="text-base sm:text-lg font-extrabold" style={{ color: mood.text }}>
            Public mood is <span className="underline decoration-2">{mood.label}</span> today — <span className="font-black">"{trending}"</span> is the top conversation across India
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 text-right">
        <div className="text-right">
          <p className="text-xs font-semibold" style={{ color: mood.text }}>Overall Positive</p>
          <p className="text-3xl font-black" style={{ color: mood.text }}>{positive}%</p>
        </div>
        <span className="text-4xl">{mood.emoji}</span>
      </div>
    </motion.div>
  );
}

// ── Executive KPI Card ────────────────────────────────────────────────────────
function ExecCard({
  label, hindiLabel, value, sub, icon: Icon, color, onClick, badge, delay = 0,
}: {
  label: string; hindiLabel: string; value: string; sub: string;
  icon: React.ElementType; color: string; onClick?: () => void;
  badge?: { text: string; color: string }; delay?: number;
}) {
  const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', iconBg: 'bg-emerald-100' },
    amber:   { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   iconBg: 'bg-amber-100'   },
    rose:    { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    iconBg: 'bg-rose-100'    },
    blue:    { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    iconBg: 'bg-blue-100'    },
    orange:  { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  iconBg: 'bg-orange-100'  },
  };
  const c = colorMap[color] ?? colorMap.orange;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      onClick={onClick}
      className={`relative bg-white rounded-2xl border-2 ${c.border} p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        {badge && (
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${badge.color}`}>
            {badge.text}
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{hindiLabel}</p>
        <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
        <p className={`text-2xl font-black ${c.text} leading-tight`}>{value}</p>
        <p className="text-[11px] text-slate-500 mt-1">{sub}</p>
      </div>
    </motion.div>
  );
}

// ── Daily Briefing Card ───────────────────────────────────────────────────────
function DailyBriefingCard({ positive, trending }: { positive: number; trending: string }) {
  const mood = getMoodConfig(positive);
  const statesWatch = ['Manipur', 'Jammu & Kashmir'];
  const flaggedPosts = 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border-2 border-[#002d62]/20 rounded-2xl overflow-hidden shadow-md"
    >
      {/* Header */}
      <div className="bg-[#002d62] px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Government of India</p>
          <p className="text-sm font-extrabold text-white">📋 Today's Intelligence Briefing</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-blue-200">Classified: RESTRICTED</p>
          <p className="text-[10px] font-mono text-blue-100">{new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className={`w-2.5 h-2.5 rounded-full ${mood.label === 'Positive' ? 'bg-emerald-500' : mood.label === 'Mixed' ? 'bg-amber-500' : 'bg-red-500'}`} />
          <span className="text-xs font-bold text-slate-700">Public Mood Today:</span>
          <span className={`text-xs font-extrabold ${mood.label === 'Positive' ? 'text-emerald-700' : mood.label === 'Mixed' ? 'text-amber-700' : 'text-red-700'}`}>
            {mood.label.toUpperCase()} ({positive}%)
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { dot: 'bg-emerald-500', text: `Trending Positively: #${trending.replace(/ /g, '')} (+142%), #DigitalBharat (+98%)` },
            { dot: 'bg-amber-500',   text: `States Needing Attention: ${statesWatch.join(', ')}` },
            { dot: 'bg-red-500',     text: `${flaggedPosts} viral posts flagged for review` },
            { dot: 'bg-blue-500',    text: `Total posts monitored today: 24 Lakh across 6 platforms` },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className={`w-2 h-2 mt-0.5 rounded-full flex-shrink-0 ${item.dot}`} />
              <span className="text-slate-700 font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-100 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#002d62] text-white text-xs font-bold hover:bg-[#003580] transition">
            <Download className="w-3.5 h-3.5" />
            Download PDF Briefing
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold hover:bg-orange-100 transition">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Quick Actions Panel ───────────────────────────────────────────────────────
function QuickActionsPanel({ onNavigate }: { onNavigate: (path: string) => void }) {
  const actions = [
    { label: 'View Flagged Posts', hindi: 'संदिग्ध पोस्ट', icon: Flag, color: 'text-red-600', bg: 'bg-red-50 border-red-200', to: '/platforms', badge: '3' },
    { label: 'District-Level Report', hindi: 'जिला रिपोर्ट', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', to: '/analysis/demographics' },
    { label: 'Trend Analysis', hindi: 'ट्रेंड विश्लेषण', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', to: '/analysis/trends' },
    { label: 'Sentiment Deep-Dive', hindi: 'भावना विश्लेषण', icon: Heart, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', to: '/analysis/sentiment' },
    { label: 'Open AI Copilot', hindi: 'AI सहायक', icon: Bot, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200', to: '/copilot' },
    { label: 'Generate Report', hindi: 'रिपोर्ट बनाएं', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200', to: '/reports' },
  ];
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm">
      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 text-orange-500" />
        Quick Actions
        <span className="text-slate-400 font-normal normal-case tracking-normal">— त्वरित कार्य</span>
      </h3>
      <div className="space-y-2">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => onNavigate(a.to)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl border ${a.bg} hover:shadow-sm transition text-left`}
          >
            <a.icon className={`w-4 h-4 ${a.color} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{a.label}</p>
              <p className="text-[10px] text-slate-500">{a.hindi}</p>
            </div>
            {a.badge && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
                {a.badge}
              </span>
            )}
            <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Monitoring Status Panel ───────────────────────────────────────────────────
function MonitoringPanel() {
  const platforms = [
    { label: 'X (Twitter)', hindi: 'ट्विटर', count: '1.1 Lakh', icon: Share2, bg: 'bg-sky-50', color: 'text-sky-600', live: true },
    { label: 'Telegram', hindi: 'टेलीग्राम', count: '68,000', icon: Send, bg: 'bg-blue-50', color: 'text-blue-600', live: true },
    { label: 'Reddit', hindi: 'रेडिट', count: '52,000', icon: MessageCircle, bg: 'bg-orange-50', color: 'text-orange-600', live: true },
    { label: 'YouTube', hindi: 'यूट्यूब', count: '38,000', icon: Video, bg: 'bg-red-50', color: 'text-red-600', live: true },
  ];
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm">
      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Eye className="w-3.5 h-3.5 text-emerald-500" />
        What We're Monitoring
        <span className="text-slate-400 font-normal normal-case tracking-normal">— क्या निगरानी हो रही है</span>
      </h3>
      <div className="space-y-2">
        {platforms.map(({ label, hindi, count, icon: Icon, bg, color, live }) => (
          <div key={label} className={`flex items-center gap-3 p-2.5 rounded-xl ${bg} border border-slate-100`}>
            <div className={`w-8 h-8 rounded-xl bg-white ${color} flex items-center justify-center shadow-sm`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800">{label}</p>
              <p className="text-[10px] text-slate-500">{hindi}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-extrabold text-slate-700">{count}</p>
              <p className="text-[10px] text-slate-400">posts today</p>
            </div>
            {live && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
        🇮🇳 Monitoring 24 Lakh posts per day across India
      </p>
    </div>
  );
}

// ── States Alert List ─────────────────────────────────────────────────────────
function StatesAlertPanel() {
  const states = [
    { name: 'Maharashtra', status: 'Positive', sentiment: 74, color: 'emerald' },
    { name: 'Uttar Pradesh', status: 'Positive', sentiment: 68, color: 'emerald' },
    { name: 'Karnataka', status: 'Mixed', sentiment: 52, color: 'amber' },
    { name: 'West Bengal', status: 'Mixed', sentiment: 48, color: 'amber' },
    { name: 'Jammu & Kashmir', status: 'Watch', sentiment: 38, color: 'rose' },
    { name: 'Manipur', status: 'Alert', sentiment: 28, color: 'red' },
  ];
  const colorMap: Record<string, { dot: string; text: string; bar: string; badge: string }> = {
    emerald: { dot: 'bg-emerald-500', text: 'text-emerald-700', bar: 'bg-emerald-400', badge: 'bg-emerald-100 text-emerald-700' },
    amber:   { dot: 'bg-amber-500',   text: 'text-amber-700',   bar: 'bg-amber-400',   badge: 'bg-amber-100 text-amber-700'   },
    rose:    { dot: 'bg-rose-500',    text: 'text-rose-700',    bar: 'bg-rose-400',    badge: 'bg-rose-100 text-rose-700'    },
    red:     { dot: 'bg-red-500',     text: 'text-red-700',     bar: 'bg-red-500',     badge: 'bg-red-100 text-red-700'     },
  };
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm">
      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-blue-500" />
        State-Wise Situation
        <span className="text-slate-400 font-normal normal-case tracking-normal">— राज्यवार स्थिति</span>
      </h3>
      <p className="text-[10px] text-slate-400 mb-3">Based on social media sentiment analysis</p>
      <div className="space-y-2">
        {states.map((s) => {
          const c = colorMap[s.color];
          return (
            <div key={s.name} className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
              <span className="text-xs font-semibold text-slate-700 w-36 truncate">{s.name}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${c.bar} transition-all`} style={{ width: `${s.sentiment}%` }} />
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex-shrink-0 ${c.badge}`}>
                {s.status}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-3">
          {[['bg-emerald-500', 'Positive'], ['bg-amber-500', 'Mixed'], ['bg-red-500', 'Alert']].map(([bg, label]) => (
            <span key={label} className="flex items-center gap-1 text-slate-500">
              <span className={`w-2 h-2 rounded-full ${bg}`} />
              {label}
            </span>
          ))}
        </div>
        <button className="text-orange-600 font-bold flex items-center gap-0.5">
          All States <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function OverviewPage() {
  const navigate = useNavigate();
  const { selectedPlatform, setSelectedPlatform } = usePlatform();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [sentimentData, setSentimentData] = useState<any>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showAnalystView, setShowAnalystView] = useState(false);

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

  const renderPlatformDashboard = () => {
    switch (selectedPlatform) {
      case 'twitter':   return <TwitterDashboard />;
      case 'youtube':   return <YouTubeDashboard />;
      case 'telegram':  return <TelegramDashboard />;
      case 'reddit':    return <RedditDashboard />;
      case 'instagram': return <InstagramDashboard />;
      case 'linkedin':  return <LinkedInDashboard />;
      default:
        return (
          <div className="space-y-5">

            {/* ── NATION PULSE BANNER ── */}
            <NationPulseBanner
              positive={overview.sentimentSnapshot.positive}
              trending={pStats.topTopic}
            />

            {/* ── EXECUTIVE KPI CARDS ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <ExecCard
                label="Nation's Mood Today"
                hindiLabel="राष्ट्रीय मनोस्थिति"
                value={`${overview.sentimentSnapshot.positive}% Positive`}
                sub="Based on 24 Lakh posts across India"
                icon={Activity}
                color="emerald"
                delay={0.05}
                badge={{ text: '🟢 GOOD', color: 'bg-emerald-100 text-emerald-700' }}
              />
              <ExecCard
                label="Posts Being Monitored"
                hindiLabel="आज की पोस्ट"
                value={formatNumber(pStats.posts)}
                sub="Live from all 6 platforms today"
                icon={MessageSquare}
                color="blue"
                delay={0.1}
                onClick={() => navigate('/data')}
              />
              <ExecCard
                label="Top Conversation Topic"
                hindiLabel="सबसे चर्चित विषय"
                value={pStats.topTopic}
                sub="Fastest growing topic right now"
                icon={TrendingUp}
                color="orange"
                delay={0.15}
                onClick={() => navigate('/analysis/trends')}
                badge={{ text: '🔥 VIRAL', color: 'bg-orange-100 text-orange-700' }}
              />
              <ExecCard
                label="States Needing Attention"
                hindiLabel="ध्यान देने योग्य राज्य"
                value="2 States"
                sub="Manipur & J&K — mixed sentiment"
                icon={AlertTriangle}
                color="rose"
                delay={0.2}
                badge={{ text: '⚠️ WATCH', color: 'bg-rose-100 text-rose-700' }}
              />
            </div>

            {/* ── MAP + RIGHT COLUMN ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* India Map — 3/5 width */}
              <div className="lg:col-span-3 flex flex-col gap-5">
                {/* Map */}
                <div className="glass-panel p-2 sm:p-3 relative overflow-hidden flex flex-col" style={{ minHeight: 480 }}>
                  {/* Map Legend */}
                  <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 mb-1">
                    <h3 className="text-xs font-extrabold text-slate-800">
                      🗺️ India Sentiment Map — भारत का भावना नक्शा
                    </h3>
                    <div className="flex items-center gap-3 text-[10px]">
                      {[['bg-emerald-500', 'Positive'], ['bg-amber-400', 'Mixed'], ['bg-red-500', 'Alert']].map(([bg, label]) => (
                        <span key={label} className="flex items-center gap-1 text-slate-500">
                          <span className={`w-2 h-2 rounded-full ${bg}`} />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 w-full h-full min-h-[420px]">
                    <IndiaMap
                      platform={selectedPlatform}
                      onSelectState={(stateName) => {
                        console.log('Selected state:', stateName);
                      }}
                    />
                  </div>
                </div>

                {/* State Alerts */}
                <StatesAlertPanel />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <DailyBriefingCard
                  positive={overview.sentimentSnapshot.positive}
                  trending={pStats.topTopic}
                />
                <MonitoringPanel />
                <QuickActionsPanel onNavigate={navigate} />
              </div>
            </div>

            {/* ── ANALYST TOGGLE SECTION ── */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl">
              <button
                onClick={() => setShowAnalystView(!showAnalystView)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition rounded-2xl"
              >
                <span className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-orange-500" />
                  Detailed Analytics — विस्तृत विश्लेषण
                  <span className="text-xs font-normal text-slate-400">(For Technical Analysts)</span>
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold transition ${showAnalystView ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
                  {showAnalystView ? '▲ Hide' : '▼ Show'}
                </span>
              </button>

              <AnimatePresence>
                {showAnalystView && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-5">
                      {/* Platform Quick-Switch Tabs */}
                      <div className="pt-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Filter by Platform</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {PLATFORM_FILTERS.map((pf) => (
                            <button
                              key={pf.id}
                              onClick={() => setSelectedPlatform(pf.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition border cursor-pointer ${
                                selectedPlatform === pf.id
                                  ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-600'
                              }`}
                            >
                              <span>{pf.emoji}</span>
                              <span>{pf.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Technical KPI Cards */}
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

                      {/* Live Feed Rates */}
                      <div className="glass-panel p-4">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Live Feed Ingestion Rates</h3>
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

                      {/* Charts Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Sentiment Donut */}
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
                                <Pie data={sentimentPieData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                                  {sentimentPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="flex justify-around text-xs font-semibold pt-1 border-t border-slate-100 text-center">
                            <div><span className="text-emerald-700 font-bold">{overview.sentimentSnapshot.positive}%</span><br /><span className="text-slate-600 text-[10px]">Positive</span></div>
                            <div><span className="text-amber-700 font-bold">{overview.sentimentSnapshot.neutral}%</span><br /><span className="text-slate-600 text-[10px]">Neutral</span></div>
                            <div><span className="text-rose-700 font-bold">{overview.sentimentSnapshot.negative}%</span><br /><span className="text-slate-600 text-[10px]">Negative</span></div>
                          </div>
                        </div>

                        {/* Volume Timeline */}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            {selectedPlatform === 'all' ? '🇮🇳 National Intelligence Dashboard' : `${activePlatform.emoji} ${activePlatform.label} Dashboard`}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedPlatform === 'all'
              ? `${TODAY} · Real-time social media monitoring across India`
              : `Deep-dive platform analytics for ${activePlatform.label}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition ${refreshing ? 'opacity-60' : ''}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#002d62] text-white text-xs font-bold hover:bg-[#003580] transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          {/* Alert bell */}
          <button className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center">3</span>
          </button>
        </div>
      </div>

      {/* Platform Quick-Switch Tabs — only for individual platforms (shown at top for non-all) */}
      {selectedPlatform !== 'all' && (
        <div className="flex items-center gap-2 flex-wrap">
          {PLATFORM_FILTERS.map((pf) => (
            <button
              key={pf.id}
              onClick={() => setSelectedPlatform(pf.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition border cursor-pointer ${
                selectedPlatform === pf.id
                  ? pf.id === 'youtube'   ? 'bg-red-600 text-white border-red-600 shadow-md'
                  : pf.id === 'twitter'   ? 'bg-black text-white border-black shadow-md'
                  : pf.id === 'telegram'  ? 'bg-[#0088cc] text-white border-[#0088cc] shadow-md'
                  : pf.id === 'reddit'    ? 'bg-[#FF4500] text-white border-[#FF4500] shadow-md'
                  : pf.id === 'instagram' ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white border-pink-500 shadow-md'
                  : pf.id === 'linkedin'  ? 'bg-[#0A66C2] text-white border-[#0A66C2] shadow-md'
                  : 'bg-orange-600 text-white border-orange-600 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              <span>{pf.emoji}</span>
              <span>{pf.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Dynamic View */}
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
