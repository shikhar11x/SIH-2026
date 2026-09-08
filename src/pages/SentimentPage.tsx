import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Smile,
  Frown,
  Meh,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  Share2,
  ThumbsUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { SentimentBadge } from '../components/common/SentimentBadge';
import { PlatformBadge } from '../components/common/PlatformBadge';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import type { AspectSentiment, SocialPost } from '../services/mocks/sentiment';

export default function SentimentPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    loadSentiment();
  }, []);

  const loadSentiment = async () => {
    try {
      const res = await api.getSentimentData();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <LoadingSkeleton rows={6} height="h-64" />;
  }

  const filteredPosts =
    selectedFilter === 'all'
      ? data.samplePosts
      : data.samplePosts.filter((p: SocialPost) => p.sentiment === selectedFilter);

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Sentiment & Emotion Intelligence"
        subtitle="Aspect-based sentiment analysis, emotional polarity breakdown, and neural tone quantification"
        tag="NEURAL CLASSIFIER"
        onRefresh={loadSentiment}
        onExport={() => setExportOpen(true)}
      />

      {/* Top Level Sentiment KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Net Sentiment Score"
          value={`${data.overview.netSentimentScore} / 100`}
          change={data.overview.change24h}
          changePeriod="24h sentiment lift"
          trend="up"
          icon={Heart}
          accentGlow
        />
        <StatCard
          title="Positive Sentiment Share"
          value={`${data.overview.positive}%`}
          subtitle="1.51M analyzed conversations"
          trend="up"
          icon={Smile}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Neutral Discourse"
          value={`${data.overview.neutral}%`}
          subtitle="Objective / Benchmark reporting"
          trend="neutral"
          icon={Meh}
          iconColor="text-amber-400"
        />
        <StatCard
          title="Negative / Critical Volume"
          value={`${data.overview.negative}%`}
          subtitle={data.overview.sentimentVolatility}
          trend="down"
          icon={Frown}
          iconColor="text-rose-400"
        />
      </div>

      {/* 14-Day Multi-line Sentiment Trend */}
      <div className="glass-panel p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">14-Day Sentiment Polarity Trend</h3>
            <p className="text-xs text-gray-400">Daily breakdown of positive, neutral, and negative sentiment percentages</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Positive
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Neutral
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Negative
            </span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeline}>
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickFormatter={(v) => `${v}%`} tickLine={false} />
              <Tooltip
                formatter={(val: any) => [`${val}%`, '']}
                contentStyle={{ backgroundColor: '#0f1629', borderColor: '#374151', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Emotion Breakdown + Aspect-Based Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Granular Emotion Breakdown */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Emotion Spectrum</h3>
              <p className="text-xs text-gray-400">Fine-grained emotional classifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {data.emotions.map((em: any, idx: number) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{em.emotion}</span>
                  <span className="font-mono text-gray-400">
                    <strong className="text-white">{em.percentage}%</strong> ({formatNumber(em.count)})
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-navy-900 overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${em.percentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: em.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aspect-Based Sentiment Analysis (ABSA) */}
        <div className="glass-panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Aspect-Based Sentiment (ABSA)</h3>
              <p className="text-xs text-gray-400">Granular sentiment aggregated across core product & thematic pillars</p>
            </div>
            <span className="text-[10px] font-mono text-accent-light bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              5 Pillars Analyzed
            </span>
          </div>

          <div className="space-y-3.5">
            {data.aspects.map((asp: AspectSentiment, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{asp.aspect}</span>
                    <span className="text-[10px] font-mono text-gray-400">({formatNumber(asp.mentions)} mentions)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-emerald-400">{asp.sentimentScore}/100</span>
                    {asp.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />}
                    {asp.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />}
                  </div>
                </div>

                {/* Split progress bar */}
                <div className="w-full h-2 rounded-full bg-navy-900 flex overflow-hidden">
                  <div style={{ width: `${asp.positive}%` }} className="bg-emerald-500 h-full" />
                  <div style={{ width: `${asp.neutral}%` }} className="bg-amber-500 h-full" />
                  <div style={{ width: `${asp.negative}%` }} className="bg-rose-500 h-full" />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mt-1.5">
                  <span className="text-emerald-400">{asp.positive}% Pos</span>
                  <span className="text-amber-400">{asp.neutral}% Neu</span>
                  <span className="text-rose-400">{asp.negative}% Neg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Top Semantic Keywords & Sentiment Tags */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Semantic Lexicon & Keyword Weights</h3>
            <p className="text-xs text-gray-400">High-frequency terms extracted by our neural tokenizer tagged with sentiment polarity</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {data.keywords.map((kw: any, idx: number) => {
            const isPos = kw.sentiment === 'positive';
            const isNeg = kw.sentiment === 'negative';

            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                  isPos
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20'
                    : isNeg
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/25 hover:bg-rose-500/20'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/25 hover:bg-amber-500/20'
                }`}
              >
                <span>{kw.text}</span>
                <span className="text-[10px] font-mono opacity-80 bg-black/30 px-1.5 py-0.5 rounded">
                  {formatNumber(kw.count)}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Row 4: Filterable Social Post Feed Explorer */}
      <div className="glass-panel p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Classified Social Feed Explorer</h3>
            <p className="text-xs text-gray-400">Browse verified multi-platform posts with confidence scores</p>
          </div>

          <div className="flex items-center gap-1.5 bg-navy-900/80 p-1 rounded-xl border border-white/5">
            {(['all', 'positive', 'neutral', 'negative'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                  selectedFilter === filter
                    ? 'bg-accent text-white shadow-glow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post: SocialPost) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-navy-800/90 border border-white/5 hover:border-accent/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-none">{post.author}</h4>
                      <span className="text-[10px] text-gray-400 font-mono">{post.handle}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlatformBadge platform={post.platform} size="sm" showLabel={false} />
                    <SentimentBadge sentiment={post.sentiment} score={post.confidence * 100} size="sm" />
                  </div>
                </div>

                <p className="text-xs text-gray-200 leading-relaxed mb-3">{post.content}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-gray-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{formatNumber(post.engagement.likes)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    <span>{formatNumber(post.engagement.shares)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.engagement.comments}</span>
                  </span>
                </div>
                <span className="font-mono text-[10px] text-gray-500">{post.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Sentiment Intelligence Dossier" />
    </div>
  );
}
