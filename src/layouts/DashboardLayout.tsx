import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Globe,
  Database,
  Heart,
  Users,
  TrendingUp,
  Network,
  Workflow,
  Clock,
  Layers,
  Bot,
  FileText,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Menu,
  Radio,
  Share2,
} from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

const mainNav: { section: string; items: NavItem[] }[] = [
  {
    section: 'NATIONAL MONITOR',
    items: [
      { label: 'Overview', to: '/analysis/overview', icon: LayoutDashboard },
      { label: 'Platform Streams', to: '/platforms', icon: Globe },
      { label: 'Live Data Ingestion', to: '/data', icon: Database },
    ],
  },
  {
    section: 'INTELLIGENCE GRID',
    items: [
      { label: 'Sentiment & Emotion', to: '/analysis/sentiment', icon: Heart },
      { label: 'Audience & Demographics', to: '/analysis/demographics', icon: Users },
      { label: 'Trending Topics Radar', to: '/analysis/trends', icon: TrendingUp },
      { label: 'Influencer Network', to: '/analysis/network', icon: Network },
      { label: 'Information Flow', to: '/analysis/flow', icon: Workflow },
      { label: 'Conversation Timeline', to: '/analysis/timeline', icon: Clock },
      { label: 'Cross-Platform Matrix', to: '/cross-platform', icon: Layers },
    ],
  },
  {
    section: 'DECISION SUPPORT',
    items: [
      { label: 'AI Intelligence Copilot', to: '/copilot', icon: Bot },
      { label: 'Executive Reports', to: '/reports', icon: FileText },
    ],
  },
];

const LIVE_TRENDS_TICKER = [
  { tag: '#IndiaAI Mission', volume: '284K', trend: '+142%', color: 'text-orange-600' },
  { tag: '#DigitalBharat', volume: '192K', trend: '+98%', color: 'text-blue-700' },
  { tag: '#SovereignCompute', volume: '146K', trend: '+88%', color: 'text-emerald-700' },
  { tag: '#TwitterSentimentX', volume: '128K', trend: '+64%', color: 'text-sky-600' },
  { tag: '#TelegramTechFeeds', volume: '94K', trend: '+46%', color: 'text-blue-600' },
  { tag: '#CyberSecurityIndia', volume: '82K', trend: '+35%', color: 'text-amber-700' },
  { tag: '#RedditDeveloperDebate', volume: '76K', trend: '+42%', color: 'text-orange-700' },
  { tag: '#GovTechIndia', volume: '68K', trend: '+28%', color: 'text-emerald-700' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-700">
      {/* Official Indian Gov Logo Header */}
      <Link to="/" className="flex items-center gap-3 px-4 py-4 border-b border-slate-200 hover:bg-slate-50 transition">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 via-blue-900 to-emerald-600 p-[2px] flex items-center justify-center flex-shrink-0 shadow-sm">
          <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
            <span className="text-base font-black text-blue-900">🇮🇳</span>
          </div>
        </div>
        {sidebarOpen && (
          <div className="flex flex-col">
            <span className="font-extrabold text-xs tracking-wider text-slate-900 leading-tight">
              SOCIALPULSE <span className="text-orange-600">BHARAT</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase mt-0.5">
              Govt. Intelligence Node
            </span>
          </div>
        )}
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-5">
        {mainNav.map((group) => (
          <div key={group.section}>
            {sidebarOpen && (
              <p className="px-3 mb-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                {group.section}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150
                      ${
                        isActive
                          ? 'bg-orange-50 text-orange-700 border border-orange-200 shadow-sm font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                      }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Official Footnote in Sidebar */}
      {sidebarOpen && (
        <div className="p-3 border-t border-slate-200 bg-slate-50/70 text-[10px] text-slate-500 font-mono flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            <span>Decahose Stream Active</span>
          </span>
          <span className="font-bold text-slate-700">342 msgs/s</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      {/* 1. Tricolor Accent Line at Top */}
      <div className="h-1 w-full flex flex-shrink-0">
        <div className="h-full w-1/3 bg-orange-500" />
        <div className="h-full w-1/3 bg-blue-900" />
        <div className="h-full w-1/3 bg-emerald-600" />
      </div>

      {/* 2. Top Strip: Real-time Trending Topics Ticker (Requested by user) */}
      <div className="h-9 bg-white border-b border-slate-200 px-4 flex items-center justify-between text-xs overflow-hidden flex-shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-2 flex-shrink-0 pr-3 border-r border-slate-200">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[10px] uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
            LIVE TRENDS (INDIA)
          </span>
        </div>

        {/* Scrolling / Marquee Ticker */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 px-4 whitespace-nowrap text-xs">
          {LIVE_TRENDS_TICKER.map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-2">
              <span className="font-bold text-slate-800 hover:text-orange-600 transition cursor-pointer">
                {item.tag}
              </span>
              <span className="font-mono text-[11px] text-slate-500">({item.volume})</span>
              <span className={`font-mono text-[10px] font-bold ${item.color}`}>
                {item.trend}
              </span>
              {idx !== LIVE_TRENDS_TICKER.length - 1 && <span className="text-slate-300">|</span>}
            </div>
          ))}
        </div>

        {/* Real-time Fetch Live Status */}
        <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-slate-200 flex-shrink-0 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <Share2 className="w-3 h-3 text-sky-600" />
            <span>X, Telegram, Reddit, YouTube Ingesting</span>
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 font-bold">{currentTime} IST</span>
        </div>
      </div>

      {/* 3. Main Application Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 flex-shrink-0 shadow-sm relative
            ${sidebarOpen ? 'w-64' : 'w-16'}`}
        >
          <SidebarContent />
          {/* Collapse toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute bottom-6 -right-3 z-50 w-6 h-6 rounded-full bg-white border border-slate-300 shadow-md flex items-center justify-center text-slate-500 hover:text-orange-600 transition"
          >
            {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        </aside>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50 lg:hidden shadow-2xl"
              >
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
          {/* Top Bar */}
          <header className="h-14 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between flex-shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">National Social Intelligence Grid</span>
                <span className="hidden sm:inline text-xs text-slate-400 font-mono">| Real-time Feed</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Date selector */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Last 7 Days (IST)</span>
              </div>

              {/* Copilot button */}
              <NavLink
                to="/copilot"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition"
              >
                <Bot className="w-3.5 h-3.5 text-orange-600" />
                <span>AI Copilot</span>
              </NavLink>

              {/* Official avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-blue-900 flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                GOI
              </div>
            </div>
          </header>

          {/* Page Content Container */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Demo badge */}
          <div className="demo-badge">🇮🇳 NIC / SIH 2026 INTELLIGENCE NODE</div>
        </div>
      </div>
    </div>
  );
}
