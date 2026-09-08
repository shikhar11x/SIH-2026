import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Workflow,
  GitFork,
  Play,
  Pause,
  Clock,
  Radio,
  Zap,
} from 'lucide-react';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import type { DiffusionStage, CascadeBranch } from '../services/mocks/flow';

export default function InformationFlowPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    loadFlow();
  }, []);

  useEffect(() => {
    let timer: any;
    if (isPlaying && data?.stages) {
      timer = setInterval(() => {
        setActiveStageIndex((prev) => (prev + 1) % data.stages.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, data]);

  const loadFlow = async () => {
    try {
      const res = await api.getInformationFlowData();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <LoadingSkeleton rows={6} height="h-64" />;
  }

  const currentStage: DiffusionStage = data.stages[activeStageIndex];

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Information Flow & Cascade Intelligence"
        subtitle="Multi-hop narrative propagation dynamics, cross-platform dissemination cascades, and virality speed tracking"
        tag="CASCADE TRACER"
        onRefresh={loadFlow}
        onExport={() => setExportOpen(true)}
        actions={
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
              isPlaying
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Cascade Simulation' : 'Play Cascade Timeline'}</span>
          </button>
        }
      />

      {/* Narrative Header Banner */}
      <div className="glass-panel p-5 bg-gradient-to-r from-orange-50 via-white to-amber-50 border-orange-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase text-orange-700 tracking-wider font-mono">
              Active Tracked Narrative Stream
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">{data.narrativeTitle}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              Virality R₀: {data.propagationStats.viralityCoefficient}
            </span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Average Dissemination Time"
          value={data.propagationStats.avgDisseminationTime}
          subtitle="From seed to viral peak"
          trend="up"
          icon={Clock}
          accentGlow
        />
        <StatCard
          title="Virality Coefficient (R₀)"
          value={data.propagationStats.viralityCoefficient}
          subtitle="Super-spreading trajectory (>2.0)"
          trend="up"
          icon={Zap}
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Cross-Platform Divergence"
          value={data.propagationStats.crossPlatformDivergence}
          subtitle="Narrative mutation rate"
          trend="neutral"
          icon={Workflow}
        />
        <StatCard
          title="Critical Spreader Nodes"
          value={data.propagationStats.criticalSpreaderNodes}
          subtitle="Amplifying 68% of volume"
          trend="up"
          icon={Radio}
          iconColor="text-amber-600"
        />
      </div>

      {/* 4-Stage Diffusion Pipeline Interactive Stepper */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Multi-Stage Narrative Diffusion Pathway</h3>
            <p className="text-xs text-slate-500">Click any stage to inspect transmission velocity and active nodes</p>
          </div>
          <span className="text-xs font-mono font-semibold text-orange-700">Step {activeStageIndex + 1} of 4</span>
        </div>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {data.stages.map((stage: DiffusionStage, idx: number) => {
            const isActive = activeStageIndex === idx;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageIndex(idx);
                  setIsPlaying(false);
                }}
                className={`p-3.5 rounded-xl text-left border transition relative overflow-hidden ${
                  isActive
                    ? 'bg-orange-50 border-orange-500 text-slate-900 shadow-sm ring-2 ring-orange-400/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-orange-700">{stage.timeframe}</span>
                  <span className="text-[10px] font-mono text-slate-500">{formatNumber(stage.reach)} reach</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{stage.stageName}</h4>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Panel */}
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono text-orange-700 uppercase font-bold">{currentStage.timeframe}</span>
              <h4 className="text-base font-bold text-slate-900">{currentStage.stageName}</h4>
              <p className="text-xs text-slate-600 mt-1">{currentStage.description}</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
                {currentStage.sentimentScore}/100 Sentiment
              </span>
              <span className="text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200 font-semibold">
                {currentStage.propagationSpeed}
              </span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Stage Milestones:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentStage.keyEvents.map((evt, i) => (
                <div key={i} className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 shadow-sm">
                  <span className="text-orange-600 font-bold block mb-0.5">#{i + 1}</span>
                  {evt}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cascade Branches Hop Matrix */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Cross-Platform Cascade Hop Matrix</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Recorded Dissemination Hops</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Origin Node / Platform</th>
                <th className="py-3 px-3">Destination Channel</th>
                <th className="py-3 px-3 text-center">Hops</th>
                <th className="py-3 px-3 text-right">Reach Multiplier</th>
                <th className="py-3 px-3 text-right">Propagation Lag</th>
                <th className="py-3 px-3 text-right">Sentiment Shift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.cascades.map((c: CascadeBranch) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-3 font-semibold text-slate-900">
                    <span className="text-orange-700 block font-mono text-[10px]">{c.originPlatform}</span>
                    {c.originNode}
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-700">{c.destinationPlatform}</td>
                  <td className="py-3.5 px-3 text-center font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {c.hopCount} hop
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-600">
                    +{c.reachMultiplier}x
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-500">{c.lagTimeMinutes} mins</td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold">
                    <span className={c.sentimentShift >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {c.sentimentShift > 0 ? `+${c.sentimentShift}%` : `${c.sentimentShift}%`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Cascade Information Flow Report" />
    </div>
  );
}
