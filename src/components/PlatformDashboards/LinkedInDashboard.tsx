import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Building2,
  Award,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_LINKEDIN_POSTS } from '../../mocks/platformFeedsData';

export default function LinkedInDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_LINKEDIN_POSTS.filter(p =>
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 border border-blue-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-500/30">
              in
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">LinkedIn Policy & Executive Intelligence</h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold">
                  THOUGHT LEADERSHIP NLP
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Executive discourse analysis, public governance thought leadership, and academic whitepaper resonance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-blue-800/50 text-xs">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono text-slate-200">170,000 Corporate Posts Ingested</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Posts Ingested</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">170,000 Posts</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +6.4% executive activity
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Professional Reach</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">12.4M Impressions</h3>
          <p className="text-[11px] text-slate-500 mt-1">IT, BFSI & Civil Services</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Executive Sentiment</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">78 / 100</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Highly positive policy support</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Top Topic Focus</span>
            <span className="text-blue-600 font-bold">#StartupIndia</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">GovTech & AI</h3>
          <p className="text-[11px] text-slate-500 mt-1">Public-private partnerships</p>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Executive & Thought Leadership Stream</h3>
            <p className="text-xs text-slate-500">Live feed from industry leaders, civil servants, and research scholars</p>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search linkedin posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 w-52"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -1 }}
              className="p-4 rounded-2xl bg-blue-50/20 hover:bg-blue-50/40 border border-blue-100/80 transition shadow-2xs"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} className="w-11 h-11 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{post.author.name}</h4>
                    <p className="text-[11px] text-slate-600 leading-tight">{post.author.headline}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{post.timestamp} · 🌐 Public</span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                  {post.industry}
                </span>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed mb-3 pl-14">
                {post.content}
              </p>

              {/* Theme Pills */}
              <div className="flex items-center gap-1.5 pl-14 mb-3 flex-wrap">
                {post.keyThemes.map((theme, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-semibold">
                    #{theme}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pl-14 text-xs text-slate-500 font-mono pt-2 border-t border-blue-100">
                <span className="flex items-center gap-1 text-blue-700 font-bold hover:underline cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.metrics.reactions} reactions</span>
                </span>
                <span className="flex items-center gap-1 hover:underline cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.metrics.comments} comments</span>
                </span>
                <span className="flex items-center gap-1 hover:underline cursor-pointer">
                  <Repeat2 className="w-3.5 h-3.5" />
                  <span>{post.metrics.reposts} reposts</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
