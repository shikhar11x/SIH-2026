import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  ThumbsUp,
  MessageCircle,
  Eye,
  CheckCircle2,
  Video,
  Search,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_YOUTUBE_VIDEOS, type YouTubeVideo } from '../../mocks/platformFeedsData';

const TOPIC_BREAKDOWN = [
  { name: 'Gov & Policy', videos: 48, views: '4.8M', color: '#ea580c' },
  { name: 'Tech Reviews', videos: 64, views: '6.2M', color: '#dc2626' },
  { name: 'Agritech & Rural', videos: 32, views: '2.1M', color: '#16a34a' },
  { name: 'Economy & UPI', videos: 40, views: '3.9M', color: '#2563eb' },
];

export default function YouTubeDashboard() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo>(MOCK_YOUTUBE_VIDEOS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = MOCK_YOUTUBE_VIDEOS.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Platform Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-900 text-white rounded-3xl p-6 border border-red-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-red-600/30">
              ▶
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">YouTube Video & Comments Intelligence</h2>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-mono font-bold">
                  TRANSCRIPT & NLP ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Automated sentiment extraction from Hindi/English video transcripts, top viewer comments, and engagement ratios
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-red-800/50 text-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-slate-200">270,000 Ingested Video Transcripts</span>
          </div>
        </div>
      </div>

      {/* YouTube KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Total Video Views (24h)</span>
            <Eye className="w-4 h-4 text-red-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">14.8M Views</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.2% vs last week
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Comments NLP Processed</span>
            <MessageCircle className="w-4 h-4 text-orange-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">89,400 Comments</h3>
          <p className="text-[11px] text-slate-500 mt-1">74% Positive Sentiment Ratio</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Avg Like-to-View Ratio</span>
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">8.9% High Like Rate</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Strong audience reception</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Top Video Format</span>
            <Video className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">62% Long-form</h3>
          <p className="text-[11px] text-slate-500 mt-1">38% YouTube Shorts</p>
        </div>
      </div>

      {/* Featured Video Spotlight + Comment NLP Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Video Deep Inspection */}
        <div className="lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-red-600" /> Active Video Deep-Dive
            </h3>
            <span className="text-xs font-mono bg-red-50 text-red-700 font-bold px-2.5 py-1 rounded-full border border-red-100">
              {selectedVideo.topic}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Thumbnail Box */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 ml-1" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded-md">
                {selectedVideo.duration}
              </span>
            </div>

            {/* Video Details */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <img src={selectedVideo.channel.avatar} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs font-bold text-slate-900">{selectedVideo.channel.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug mb-3">
                  {selectedVideo.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
                  <span>👁 {selectedVideo.views} views</span>
                  <span>·</span>
                  <span>👍 {selectedVideo.likes}</span>
                </div>
              </div>

              {/* Sentiment Bar */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-emerald-700">{selectedVideo.sentiment.positive}% Positive</span>
                  <span className="text-amber-700">{selectedVideo.sentiment.neutral}% Neutral</span>
                  <span className="text-rose-700">{selectedVideo.sentiment.negative}% Negative</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden flex">
                  <div style={{ width: `${selectedVideo.sentiment.positive}%` }} className="bg-emerald-500 h-full" />
                  <div style={{ width: `${selectedVideo.sentiment.neutral}%` }} className="bg-amber-400 h-full" />
                  <div style={{ width: `${selectedVideo.sentiment.negative}%` }} className="bg-rose-500 h-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Extracted Comments */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Top NLP Extracted Viewer Comments
            </h5>
            <div className="space-y-2">
              {selectedVideo.topComments.map((cmt, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{cmt.user}</span>
                    <span className="text-[10px] font-mono text-slate-500">👍 {cmt.likes}</span>
                  </div>
                  <p className="text-slate-700 text-[11px]">{cmt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Topic Breakdown Chart */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Topic Views Distribution</h3>
            <div className="space-y-3">
              {TOPIC_BREAKDOWN.map((t, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{t.name}</span>
                    <span className="text-xs font-mono font-black text-red-600">{t.views}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{t.videos} videos tracked</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Stream List */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Ingested YouTube Videos Feed</h3>
            <p className="text-xs text-slate-500">Click any video card to load its comment sentiment telemetry</p>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500 w-52"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedVideo(video)}
              className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                selectedVideo.id === video.id
                  ? 'bg-red-50/40 border-red-500 ring-2 ring-red-100 shadow-md'
                  : 'bg-slate-50/60 hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              <div>
                <div className="relative rounded-xl overflow-hidden mb-2.5">
                  <img src={video.thumbnail} className="w-full h-32 object-cover" />
                  <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-[10px] font-mono font-bold px-1.5 py-0.2 rounded">
                    {video.duration}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug mb-2">
                  {video.title}
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>👁 {video.views}</span>
                <span className="text-emerald-700 font-bold">{video.sentiment.positive}% +ve</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
