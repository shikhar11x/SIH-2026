import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Globe,
  Share2,
  Send,
  MessageSquare,
  Video,
  Briefcase,
  Camera,
  GitCompare,
} from 'lucide-react';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import type { CrossPlatformMetric, NarrativeMutation } from '../services/mocks/crossPlatform';

export default function CrossPlatformPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMutation, setSelectedMutation] = useState<NarrativeMutation | null>(null);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    loadCrossPlatform();
  }, []);

  const loadCrossPlatform = async () => {
    try {
      const res = await api.getCrossPlatformData();
      setData(res);
      if (res.mutations && res.mutations.length > 0) {
        setSelectedMutation(res.mutations[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <LoadingSkeleton rows={6} height="h-64" />;
  }

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'twitter':
        return Share2;
      case 'telegram':
        return Send;
      case 'reddit':
        return MessageSquare;
      case 'youtube':
        return Video;
      case 'linkedin':
        return Briefcase;
      case 'instagram':
        return Camera;
      default:
        return Globe;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Cross-Platform Intelligence & Narrative Mutation"
        subtitle="Comparing narrative framing, tone variance, and viral velocity across 6 interconnected social ecosystems"
        tag="CROSS-CHANNEL MATRIX"
        onRefresh={loadCrossPlatform}
        onExport={() => setExportOpen(true)}
      />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monitored Social Ecosystems"
          value={data.stats.platformsAnalyzed}
          subtitle="6 synchronized stream endpoints"
          trend="up"
          icon={Globe}
          accentGlow
        />
        <StatCard
          title="Cross-Platform Correlation"
          value={`${Math.round(data.stats.crossPlatformCorrelation * 100)}%`}
          subtitle="High topic alignment"
          trend="up"
          icon={Layers}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Fastest Origin Vector"
          value="X / Twitter"
          subtitle="42 mins ahead of Reddit & YouTube"
          trend="up"
          icon={Share2}
          iconColor="text-sky-400"
        />
        <StatCard
          title="Highest Engagement Rate"
          value="YouTube (6.8%)"
          subtitle="Long-form technical breakdowns"
          trend="up"
          icon={Video}
          iconColor="text-rose-400"
        />
      </div>

      {/* Platform Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.platformMetrics.map((pm: CrossPlatformMetric) => {
          const Icon = getPlatformIcon(pm.platformId);

          return (
            <div
              key={pm.platformId}
              className="glass-panel p-5 border border-white/5 hover:border-accent/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: pm.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{pm.name}</h4>
                      <span className="text-[10px] font-mono text-gray-400">{pm.shareOfVoice}% Share of Voice</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    {pm.sentimentScore}/100
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-navy-900/90 border border-white/5 my-3 text-xs space-y-1.5">
                  <div className="flex justify-between text-gray-400">
                    <span>Dominant Tone:</span>
                    <strong className="text-white">{pm.dominantTone}</strong>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Format Focus:</span>
                    <span className="text-accent-light">{pm.topFormat}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-2">{pm.narrativeFocus}</p>
              </div>

              <div className="pt-2.5 border-t border-white/5 text-[11px] text-gray-400 font-mono flex justify-between">
                <span>Engage: {pm.engagementPerPost}/post</span>
                <span className="text-accent-light font-bold">Active Stream</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Narrative Mutation & Divergence Inspector */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-accent-light" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Narrative Mutation & Framing Divergence
              </h3>
              <p className="text-xs text-gray-400">
                Observe how the same core topic is reframed by different communities across platforms
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Selection Tabs */}
        <div className="flex gap-3 mb-6">
          {data.mutations.map((mut: NarrativeMutation) => (
            <button
              key={mut.id}
              onClick={() => setSelectedMutation(mut)}
              className={`p-3.5 rounded-xl text-left border transition flex-1 ${
                selectedMutation?.id === mut.id
                  ? 'bg-accent/20 border-accent text-white shadow-glow'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">{mut.topic}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                  {mut.divergenceScore}% Divergence
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Mutation Platform Grid */}
        {selectedMutation && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedMutation.platforms.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-navy-900/90 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                    <span className="text-xs font-bold text-accent-light uppercase font-mono">{p.platform}</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">{p.sentimentScore}/100 Sent</span>
                  </div>

                  <h5 className="text-xs font-bold text-white mb-2 leading-snug">{p.dominantAngle}</h5>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">{p.summary}</p>
                </div>

                <div className="pt-2.5 border-t border-white/5 text-[11px] font-mono text-gray-400 flex justify-between">
                  <span>Topic Volume:</span>
                  <strong className="text-white">{formatNumber(p.volume)} posts</strong>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Cross-Platform Matrix Report" />
    </div>
  );
}
