import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Repeat,
  Heart,
  CheckCircle2,
  Search,
  Flame,
  ArrowUpRight,
  Eye,
  Bot
} from 'lucide-react';
import { MOCK_TWITTER_POSTS } from '../../mocks/platformFeedsData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const HOURLY_TWEET_VELOCITY = [
  { time: '00:00', tweets: 4200, retweets: 1800 },
  { time: '04:00', tweets: 2100, retweets: 920 },
  { time: '08:00', tweets: 8900, retweets: 4100 },
  { time: '12:00', tweets: 16400, retweets: 8200 },
  { time: '16:00', tweets: 22800, retweets: 11400 },
  { time: '20:00', tweets: 28900, retweets: 14800 },
  { time: '23:00', tweets: 19500, retweets: 9600 },
];

const TOP_HASHTAGS = [
  { tag: '#IndiaAI', volume: '284K', change: '+38%', sentiment: 'positive' },
  { tag: '#DigitalBharat', volume: '192K', change: '+24%', sentiment: 'positive' },
  { tag: '#DPDPAct', volume: '88K', change: '+12%', sentiment: 'neutral' },
  { tag: '#SemiconIndia', volume: '76K', change: '+45%', sentiment: 'positive' },
  { tag: '#UPIExpansion', volume: '64K', change: '+18%', sentiment: 'positive' },
  { tag: '#CyberAlert', volume: '42K', change: '-8%', sentiment: 'negative' },
];

export default function TwitterDashboard() {
  const [filterStance, setFilterStance] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = MOCK_TWITTER_POSTS.filter((post) => {
    if (filterStance !== 'all' && post.stance !== filterStance) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.content.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.author.handle.toLowerCase().includes(q) ||
        post.hashtags.some(h => h.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Platform Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-black border border-slate-700 flex items-center justify-center text-3xl font-black shadow-inner">
              𝕏
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">X / Twitter Live Pulse Terminal</h2>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-mono font-bold">
                  DECAHOSE 10% SAMPLE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real-time microblogging telemetry, narrative spread tracking, and verified handle stance classification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-slate-300">1,020,000 Tweets Processed Today</span>
          </div>
        </div>
      </div>

      {/* Twitter KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Tweet Volume (24h)</span>
            <span className="text-sky-500 font-bold text-lg">𝕏</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">1.02 Million</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +22.4% vs previous day
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Retweet Amplification</span>
            <Repeat className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">342,800 RTs</h3>
          <p className="text-[11px] text-slate-500 mt-1">Avg 3.4 hops propagation depth</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Verified Handle Share</span>
            <CheckCircle2 className="w-4 h-4 text-sky-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">28.4% Verified</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">High credibility weight</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Bot vs Human Ratio</span>
            <Bot className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">94.2% Human</h3>
          <p className="text-[11px] text-purple-700 font-semibold mt-1">5.8% automated handles filtered</p>
        </div>
      </div>

      {/* Charts + Hashtag Velocity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Tweet Velocity Timeline Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Hourly Tweet & Retweet Velocity</h3>
              <p className="text-xs text-slate-400">24-hour frequency analysis across Indian timezones (IST)</p>
            </div>
            <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
              Peak: 28.9K/hr
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_TWEET_VELOCITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="twGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#ffffff' }}
                />
                <Area type="monotone" dataKey="tweets" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#twGrad)" name="Original Tweets" />
                <Area type="monotone" dataKey="retweets" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#rtGrad)" name="Retweets" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Trending Hashtags Cloud & Stats */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" /> Trending Hashtags
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Live Rank</span>
            </div>
            <div className="space-y-2">
              {TOP_HASHTAGS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50/50 border border-slate-100 transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{item.tag}</span>
                    <span className="text-[10px] text-slate-500">{item.volume} impressions</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-700 block">{item.change}</span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                      item.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.sentiment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Ingested Tweets Feed */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>Live Ingested Tweet Stream</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold">
                {filteredPosts.length} posts matching
              </span>
            </h3>
            <p className="text-xs text-slate-500">Real-time decahose feed parsed by Indic NLP sentiment & stance models</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tweets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 w-44"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-medium">
              {(['all', 'Pro-Policy', 'Critical', 'Fact Check'] as const).map(stance => (
                <button
                  key={stance}
                  onClick={() => setFilterStance(stance)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition ${
                    filterStance === stance
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {stance}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tweet Cards List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -1 }}
              className="p-4 rounded-2xl bg-slate-50/60 hover:bg-slate-50 border border-slate-100 hover:border-sky-200 transition shadow-2xs"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{post.author.name}</span>
                      {post.author.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500 text-white" />
                      )}
                      {post.author.isOfficialGov && (
                        <span className="px-1.5 py-0.2 bg-orange-100 text-orange-800 text-[9px] font-black rounded-md uppercase">
                          Official GoI
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>@{post.author.handle}</span>
                      <span>·</span>
                      <span>{post.timestamp}</span>
                      {post.location && (
                        <>
                          <span>·</span>
                          <span>📍 {post.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    post.sentiment === 'positive'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : post.sentiment === 'negative'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {post.sentiment} ({post.sentimentScore}%)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold font-mono">
                    {post.stance}
                  </span>
                </div>
              </div>

              {/* Content */}
              <p className="text-xs text-slate-800 leading-relaxed pl-13 mb-3">
                {post.content}
              </p>

              {/* Tweet Engagement Action Bar */}
              <div className="flex items-center gap-6 pl-13 text-slate-400 text-xs font-mono">
                <span className="flex items-center gap-1 hover:text-sky-600 cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.metrics.replies}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer">
                  <Repeat className="w-3.5 h-3.5" />
                  <span>{post.metrics.retweets.toLocaleString()}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-rose-600 cursor-pointer">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{post.metrics.likes.toLocaleString()}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-slate-600 cursor-pointer">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{post.metrics.views}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
