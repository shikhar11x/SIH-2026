import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowBigUp,
  MessageSquare,
  TrendingUp,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_REDDIT_POSTS } from '../../mocks/platformFeedsData';

export default function RedditDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_REDDIT_POSTS.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.subreddit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-orange-900 text-white rounded-3xl p-6 border border-orange-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FF4500] text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-orange-500/30">
              👾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Reddit Discussion & Subreddit Telemetry</h2>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-mono font-bold">
                  COMMUNITY SENTIMENT THREADS
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Deep-dive discussion monitoring across Indian subreddits, technical communities, and economic threads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-orange-800/50 text-xs">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-slate-200">520,000 Posts & Comments Analyzed</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Subreddits Monitored</span>
            <span className="text-orange-500 font-bold">r/</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">84 Subreddits</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12.6% active posts
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Avg Upvote Ratio</span>
            <ArrowBigUp className="w-4 h-4 text-orange-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">93.8% Approval</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Strong community consensus</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Developer Engagement</span>
            <MessageSquare className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">r/developersIndia</h3>
          <p className="text-[11px] text-slate-500 mt-1">Top tech discussions hub</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Community Sentiment</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">71 / 100</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Constructive feedback</p>
        </div>
      </div>

      {/* Reddit Feed */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Subreddit Discussion Stream</h3>
            <p className="text-xs text-slate-500">Real-time upvoted discussions and top nested comment insights</p>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search subreddits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 w-52"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -1 }}
              className="p-4 rounded-2xl bg-orange-50/20 hover:bg-orange-50/40 border border-orange-100/80 transition shadow-2xs flex gap-3.5"
            >
              {/* Upvote Pill */}
              <div className="flex flex-col items-center justify-start py-1 px-2 rounded-xl bg-orange-100/80 text-orange-700 font-mono font-bold text-xs shrink-0 h-fit">
                <ArrowBigUp className="w-5 h-5 fill-orange-600 text-orange-600" />
                <span>{post.upvotes}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-slate-900">{post.subreddit}</span>
                  <span className="text-[10px] text-slate-400">Posted by {post.author} · {post.timestamp}</span>
                  <span className="px-2 py-0.2 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                    {post.flair}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1.5">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed mb-3 line-clamp-3">
                  {post.body}
                </p>

                {/* Top Comment Highlight */}
                {post.topComment && (
                  <div className="p-2.5 rounded-xl bg-white border border-orange-100/80 text-xs mb-2">
                    <span className="font-bold text-[11px] text-slate-800">{post.topComment.author}: </span>
                    <span className="text-[11px] text-slate-600">{post.topComment.text}</span>
                    <span className="text-[10px] font-mono text-orange-600 ml-2 font-bold">▲ {post.topComment.upvotes}</span>
                  </div>
                )}

                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 hover:text-slate-700 cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.commentsCount} comments</span>
                  </span>
                  <span>{Math.round(post.upvoteRatio * 100)}% Upvoted</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
