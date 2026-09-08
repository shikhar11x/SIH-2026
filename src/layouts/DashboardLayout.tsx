import { useState, useEffect, createContext, useContext } from 'react';
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
  ChevronDown,
} from 'lucide-react';
import { PLATFORM_FILTERS } from '../mocks/indiaMapData';
import { BrandLogo } from '../components/common/BrandLogo';

// ─── Platform Context ─────────────────────────────────────────────────────────
export const PlatformContext = createContext<{
  selectedPlatform: string;
  setSelectedPlatform: (p: string) => void;
}>({ selectedPlatform: 'all', setSelectedPlatform: () => {} });

export const usePlatform = () => useContext(PlatformContext);

// ─── Nav Config ───────────────────────────────────────────────────────────────
interface NavItem { label: string; to: string; icon: React.ElementType }

const mainNav: { section: string; items: NavItem[] }[] = [
  {
    section: 'ANALYTICS',
    items: [
      { label: 'Overview Dashboard', to: '/analysis/overview', icon: LayoutDashboard },
      { label: 'Sentiment Analysis', to: '/analysis/sentiment', icon: Heart },
      { label: 'Demographics', to: '/analysis/demographics', icon: Users },
      { label: 'Trend Radar', to: '/analysis/trends', icon: TrendingUp },
      { label: 'Network & Links', to: '/analysis/network', icon: Network },
    ],
  },
  {
    section: 'INTELLIGENCE',
    items: [
      { label: 'Data Streams', to: '/data', icon: Database },
      { label: 'Platform Hub', to: '/platforms', icon: Globe },
      { label: 'Info Flow', to: '/analysis/flow', icon: Workflow },
      { label: 'Timeline', to: '/analysis/timeline', icon: Clock },
      { label: 'Cross-Platform', to: '/cross-platform', icon: Layers },
    ],
  },
  {
    section: 'AI TOOLS',
    items: [
      { label: 'Bharat AI Copilot', to: '/copilot', icon: Bot },
      { label: 'Reports & Dossiers', to: '/reports', icon: FileText },
    ],
  },
];

// ─── Ticker ───────────────────────────────────────────────────────────────────
const LIVE_TRENDS_TICKER = [
  { tag: '#IndiaAI Mission', volume: '284K', trend: '+142%', color: 'text-orange-600' },
  { tag: '#DigitalBharat', volume: '192K', trend: '+98%', color: 'text-blue-700' },
  { tag: '#SovereignCompute', volume: '146K', trend: '+88%', color: 'text-emerald-700' },
  { tag: '#CyberSecurityIndia', volume: '82K', trend: '+35%', color: 'text-amber-700' },
  { tag: '#BengaluruTech', volume: '76K', trend: '+42%', color: 'text-orange-700' },
  { tag: '#GovTechIndia', volume: '68K', trend: '+28%', color: 'text-emerald-700' },
  { tag: '#StartupIndia2026', volume: '61K', trend: '+21%', color: 'text-purple-700' },
  { tag: '#IndiaStack', volume: '54K', trend: '+19%', color: 'text-sky-700' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [platformDropOpen, setPlatformDropOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
  );
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activePlatform = PLATFORM_FILTERS.find((p) => p.id === selectedPlatform)!;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-700">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center px-3.5 py-4 border-b border-slate-100 hover:bg-orange-50/40 transition"
      >
        <BrandLogo size="md" showText={sidebarOpen} />
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {mainNav.map((group) => (
          <div key={group.section}>
            {sidebarOpen && (
              <p className="px-3 mb-1.5 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                {group.section}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150
                      ${isActive
                        ? 'bg-orange-50 text-orange-700 border border-orange-200 shadow-sm font-bold'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
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

      {/* Live Feed Status */}
      {sidebarOpen && (
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-mono flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            <span>Live Stream</span>
          </span>
          <span className="font-bold text-emerald-700">342 msgs/s</span>
        </div>
      )}
    </div>
  );

  return (
    <PlatformContext.Provider value={{ selectedPlatform, setSelectedPlatform }}>
      <div className="flex flex-col h-screen bg-[#f8fafc] overflow-hidden font-sans">

        {/* Tricolor strip */}
        <div className="h-[3px] w-full flex flex-shrink-0">
          <div className="h-full flex-1 bg-orange-500" />
          <div className="h-full flex-1 bg-[#002d62]" />
          <div className="h-full flex-1 bg-emerald-600" />
        </div>

        {/* Live Trending Ticker */}
        <div className="h-9 bg-white border-b border-slate-100 px-4 flex items-center justify-between text-xs overflow-hidden flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2 flex-shrink-0 pr-3 border-r border-slate-100">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[10px] uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              LIVE (INDIA)
            </span>
          </div>

          {/* Animated ticker */}
          <div className="flex-1 overflow-hidden relative mx-2">
            <motion.div
              className="flex items-center gap-6 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...LIVE_TRENDS_TICKER, ...LIVE_TRENDS_TICKER].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2">
                  <span className="font-bold text-slate-800 hover:text-orange-600 transition cursor-pointer">
                    {item.tag}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">({item.volume})</span>
                  <span className={`font-mono text-[10px] font-bold ${item.color}`}>{item.trend}</span>
                  <span className="text-slate-200">|</span>
                </span>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-100 flex-shrink-0 text-[11px] font-mono text-slate-500">
            <Share2 className="w-3 h-3 text-sky-500" />
            <span>All Platforms</span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-slate-700">{currentTime} IST</span>
          </div>
        </div>

        {/* Main body */}
        <div className="flex-1 flex overflow-hidden">

          {/* Desktop Sidebar */}
          <aside
            className={`hidden lg:flex flex-col bg-white border-r border-slate-100 transition-all duration-300 flex-shrink-0 shadow-sm relative
              ${sidebarOpen ? 'w-60' : 'w-14'}`}
          >
            <SidebarContent />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute bottom-6 -right-3 z-50 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-400 hover:text-orange-600 transition"
            >
              {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
          </aside>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {mobileSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
                <motion.aside
                  initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-slate-100 z-50 lg:hidden shadow-2xl"
                >
                  <SidebarContent />
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Top Header */}
            <header className="h-14 bg-white border-b border-slate-100 px-4 lg:px-6 flex items-center justify-between flex-shrink-0 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">National Social Intelligence Grid</span>
                  <span className="hidden sm:inline text-xs text-slate-400 font-mono">| Real-time</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Date */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last 7 Days</span>
                </div>

                {/* Platform Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setPlatformDropOpen(!platformDropOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition shadow-sm"
                  >
                    <span>{activePlatform.emoji}</span>
                    <span className="text-slate-700">{activePlatform.label}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {platformDropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 top-10 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden"
                      >
                        {PLATFORM_FILTERS.map((pf) => (
                          <button
                            key={pf.id}
                            onClick={() => { setSelectedPlatform(pf.id); setPlatformDropOpen(false); }}
                            className={`w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs font-semibold transition
                              ${selectedPlatform === pf.id
                                ? 'bg-orange-50 text-orange-700'
                                : 'text-slate-600 hover:bg-slate-50'}`}
                          >
                            <span className="text-base">{pf.emoji}</span>
                            <span>{pf.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Copilot */}
                <NavLink
                  to="/copilot"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AI Copilot</span>
                </NavLink>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-[#002d62] flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                  GOI
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-auto p-4 lg:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname + selectedPlatform}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="h-full"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Demo badge */}
            <div className="demo-badge">🇮🇳 DEMO DATA</div>
          </div>
        </div>
      </div>
    </PlatformContext.Provider>
  );
}
