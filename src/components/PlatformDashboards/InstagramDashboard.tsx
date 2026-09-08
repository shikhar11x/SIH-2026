import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Music,
  CheckCircle2,
  Sparkles,
  Camera,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_INSTAGRAM_POSTS } from '../../mocks/platformFeedsData';

export default function InstagramDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_INSTAGRAM_POSTS.filter(p =>
    p.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.author.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner with signature Instagram Gradient */}
      <div className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-3xl font-black shadow-lg">
              📸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Instagram Reels & Visual Intelligence</h2>
                <span className="px-2 py-0.5 rounded-full bg-white/25 text-white border border-white/40 text-[10px] font-mono font-bold">
                  COMPUTER VISION & AUDIO AI
                </span>
              </div>
              <p className="text-xs text-white/90 mt-1">
                Visual emotion recognition, viral audio telemetry, and cultural campaign reach across Indian youth demographics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-white">70,000 Visual Feeds Parsed</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Reels Ingested</span>
            <Camera className="w-4 h-4 text-pink-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">70,000 Reels</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +8.9% engagement lift
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Total Reel Likes</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">4.2 Million</h3>
          <p className="text-[11px] text-slate-500 mt-1">High viral resonance</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Top Emotion Tag</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">64% Joy / Pride</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Culture & national pride</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Sentiment Score</span>
            <span className="text-pink-600 font-bold">82 / 100</span>
          </div>
          <h3 className="text-2xl font-black text-emerald-700">82% Positive</h3>
          <p className="text-[11px] text-slate-500 mt-1">Highest among all platforms</p>
        </div>
      </div>

      {/* Visual Posts Grid */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Trending Instagram Reels & Posts</h3>
            <p className="text-xs text-slate-500">Live feed from verified tourism, cultural, and public initiative handles</p>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 w-52"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-gradient-to-br from-pink-50/40 via-purple-50/20 to-orange-50/30 border border-pink-100/80 transition shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                    <img src={post.author.avatar} className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-900">@{post.author.handle}</span>
                      {post.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{post.timestamp}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold">
                  ✨ {post.emotion}
                </span>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed mb-3">
                {post.caption}
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mb-3 bg-white/80 p-2 rounded-xl border border-pink-100">
                <Music className="w-3.5 h-3.5 text-pink-600" />
                <span className="truncate">{post.audioTrack}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-600 pt-2 border-t border-pink-100/80">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-rose-600 font-bold">
                    <Heart className="w-4 h-4 fill-rose-600" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </span>
                </div>
                <span className="text-emerald-700 font-bold uppercase text-[10px]">Positive Sentiment</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
