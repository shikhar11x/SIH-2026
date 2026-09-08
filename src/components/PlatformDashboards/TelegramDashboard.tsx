import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Eye,
  Share2,
  ShieldAlert,
  CheckCircle2,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_TELEGRAM_MESSAGES } from '../../mocks/platformFeedsData';

export default function TelegramDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_TELEGRAM_MESSAGES.filter(m =>
    m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 text-white rounded-3xl p-6 border border-sky-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0088cc] text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-sky-500/30">
              ✈
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Telegram Broadcast Intelligence</h2>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-mono font-bold">
                  CHANNEL FORWARD RADAR
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Deep tracking of broadcast channels, forward cascade depth, and real-time misinformation advisories
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-sky-800/50 text-xs">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-mono text-slate-200">350,000 Messages Ingested</span>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Channels Monitored</span>
            <Send className="w-4 h-4 text-sky-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">1,420 Channels</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +34.1% message volume
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Total Broadcast Views</span>
            <Eye className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">8.9 Million</h3>
          <p className="text-[11px] text-slate-500 mt-1">Direct community reach</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Max Forward Depth</span>
            <Share2 className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">14 Cascade Hops</h3>
          <p className="text-[11px] text-purple-700 font-semibold mt-1">High viral propagation</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Misinformation Risk</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-emerald-700">0.4% Low Risk</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Auto-flagged to PIB bureau</p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Broadcast Channel Stream</h3>
            <p className="text-xs text-slate-500">Live feed from verified government bureaus, cyber defense, and public channels</p>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search telegram feeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 w-52"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((msg) => (
            <motion.div
              key={msg.id}
              whileHover={{ y: -1 }}
              className="p-4 rounded-2xl bg-sky-50/30 hover:bg-sky-50/60 border border-sky-100 transition shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center text-xs font-bold">
                    ✈
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{msg.channel.name}</span>
                      {msg.channel.verified && <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500 text-white" />}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{msg.channel.subscribers} subscribers · {msg.timestamp}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold font-mono">
                  Risk: {msg.riskScore}
                </span>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed mb-3">
                {msg.text}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-2 border-t border-sky-100">
                <span>👁 {msg.views} views</span>
                <span>↗ {msg.forwards.toLocaleString()} forwards</span>
                <span>⛓ {msg.forwardDepth} hops depth</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
