import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
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
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Calendar,
  Menu,
} from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

const mainNav: { section: string; items: NavItem[] }[] = [
  {
    section: 'SOCIALPULSE AI',
    items: [
      { label: 'Overview', to: '/analysis/overview', icon: LayoutDashboard },
      { label: 'Platforms', to: '/platforms', icon: Globe },
      { label: 'Data Ingestion', to: '/data', icon: Database },
    ],
  },
  {
    section: 'INTELLIGENCE',
    items: [
      { label: 'Sentiment', to: '/analysis/sentiment', icon: Heart },
      { label: 'Demographics', to: '/analysis/demographics', icon: Users },
      { label: 'Trends', to: '/analysis/trends', icon: TrendingUp },
      { label: 'Network', to: '/analysis/network', icon: Network },
      { label: 'Information Flow', to: '/analysis/flow', icon: Workflow },
      { label: 'Timeline', to: '/analysis/timeline', icon: Clock },
      { label: 'Cross Platform', to: '/cross-platform', icon: Layers },
    ],
  },
  {
    section: 'WORKSPACE',
    items: [
      { label: 'AI Copilot', to: '/copilot', icon: Bot },
      { label: 'Reports', to: '/reports', icon: FileText },
    ],
  },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
          <Activity className="w-4 h-4 text-white" />
        </div>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-sm tracking-wider text-white"
          >
            SOCIALPULSE AI
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {mainNav.map((group) => (
          <div key={group.section} className="mb-6">
            {sidebarOpen && (
              <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
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
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                      ${isActive
                        ? 'bg-accent/10 text-accent-light border border-accent/20'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-accent-light' : ''}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all w-full">
          <Settings className="w-4 h-4 flex-shrink-0" />
          {sidebarOpen && <span>Settings</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-navy-900 overflow-hidden">
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-navy-800 border-r border-white/5 transition-all duration-300 flex-shrink-0
          ${sidebarOpen ? 'w-60' : 'w-16'}`}
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-20 -right-3 z-50 w-6 h-6 rounded-full bg-navy-700 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          style={{ left: sidebarOpen ? '228px' : '52px' }}
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
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-navy-800 border-r border-white/5 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-4 lg:px-6 border-b border-white/5 bg-navy-800/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-white hidden sm:block">AI Conversation Intelligence</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Date selector */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-gray-400 bg-white/5 border border-white/10 hover:border-white/20 transition">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last 7 Days</span>
            </button>

            {/* System status */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
              <span>All systems operational</span>
            </div>

            {/* Copilot button */}
            <NavLink
              to="/copilot"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent/10 text-accent-light border border-accent/20 hover:bg-accent/20 transition"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Copilot</span>
            </NavLink>

            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              SP
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Demo badge */}
        <div className="demo-badge">DEMO DATA</div>
      </div>
    </div>
  );
}
