import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Globe,
  MapPin,
  Sparkles,
  Languages,
  UserCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import type { DemographicsData } from '../services/mocks/demographics';

export default function DemographicsPage() {
  const [data, setData] = useState<DemographicsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    loadDemographics();
  }, []);

  const loadDemographics = async () => {
    try {
      const res = await api.getDemographicsData();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <LoadingSkeleton rows={6} height="h-64" />;
  }

  const genderPieData = data.genderSplit.map((g) => ({
    name: g.gender,
    value: g.percentage,
    color: g.color,
  }));

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Audience & Demographics Intelligence"
        subtitle="Audience segmentation, geographic spread, generational cohorts, and behavioral persona clusters"
        tag="NEURAL PERSONA CLUSTERING"
        onRefresh={loadDemographics}
        onExport={() => setExportOpen(true)}
      />

      {/* Top Audience KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Addressable Audience"
          value={formatNumber(data.overview.totalAudience)}
          change={11.2}
          trend="up"
          icon={Users}
          accentGlow
        />
        <StatCard
          title="Dominant Age Bracket"
          value={data.overview.dominantAgeRange}
          subtitle="Tech early adopters & devs"
          trend="neutral"
          icon={UserCheck}
        />
        <StatCard
          title="Primary Geographic Hub"
          value={data.overview.topCountry}
          subtitle="High concentration in Bengaluru & Delhi"
          trend="up"
          icon={Globe}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Cohort Diversity Index"
          value={`${data.overview.diversityIndex} / 100`}
          subtitle="Multi-lingual cross-cultural reach"
          trend="up"
          icon={Languages}
          iconColor="text-purple-400"
        />
      </div>

      {/* Row 2: Age Cohorts + Gender Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Age Cohorts Bar Chart */}
        <div className="glass-panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Age Cohort Distribution</h3>
              <p className="text-xs text-gray-400">Percentage distribution across generational demographics</p>
            </div>
            <span className="text-xs font-mono text-accent-light bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              69.4% in 18-34
            </span>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ageDistribution} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <XAxis dataKey="range" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v}%`} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#0f1629', borderColor: '#374151', borderRadius: '8px' }}
                />
                <Bar dataKey="percentage" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Breakdown Donut */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Gender Distribution</h3>
            <p className="text-xs text-gray-400">Estimated participant gender ratio</p>
          </div>

          <div className="h-44 flex items-center justify-center relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {genderPieData.map((entry, index) => (
                    <Cell key={`gender-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Ratio']}
                  contentStyle={{ backgroundColor: '#0f1629', borderColor: '#374151', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/5">
            {data.genderSplit.map((g, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                  <span className="text-gray-300">{g.gender}</span>
                </div>
                <span className="font-mono font-bold text-white">{g.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Geographic Distribution + Language Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Breakdown */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-light" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Geographic Markets</h3>
            </div>
            <span className="text-[10px] font-mono text-gray-400">Ranked by volume</span>
          </div>

          <div className="space-y-3">
            {data.geoDistribution.map((country, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{country.flag}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{country.country}</h4>
                    <span className="text-[10px] text-gray-400 font-mono">{formatNumber(country.count)} participants</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs font-bold text-white block">{country.percentage}%</span>
                    <span className="text-[10px] text-gray-400">Share</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xs font-bold text-emerald-400 block font-mono">{country.sentiment}/100</span>
                    <span className="text-[10px] text-gray-400">Sentiment</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages & Device Types */}
        <div className="space-y-6">
          {/* Languages */}
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-accent-light" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Language Distribution</h3>
              </div>
            </div>

            <div className="space-y-3">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-200">{lang.name}</span>
                    <span className="font-mono text-gray-400">
                      <strong className="text-white">{lang.percentage}%</strong> ({formatNumber(lang.count)})
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-navy-900 overflow-hidden">
                    <div style={{ width: `${lang.percentage}%` }} className="bg-accent h-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Client Devices</h3>
            <div className="grid grid-cols-3 gap-3">
              {data.devices.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-navy-900/80 border border-white/5 text-center">
                  <span className="text-base font-bold text-white block font-mono">{d.percentage}%</span>
                  <span className="text-[10px] text-gray-400">{d.device}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: AI Persona Clusters */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-light" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Behavioral Persona Clusters</h3>
              <p className="text-xs text-gray-400">Unsupervised semantic clustering of participant intentions and engagement behaviors</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-accent-light bg-accent/10 px-2.5 py-1 rounded border border-accent/20">
            4 Core Clusters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.personas.map((persona) => (
            <motion.div
              key={persona.id}
              whileHover={{ y: -2 }}
              className="p-4 rounded-xl bg-navy-800/90 border border-white/5 hover:border-accent/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">{persona.avatarBadge}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                      <span className="text-[11px] text-accent-light font-semibold">
                        {persona.sharePercentage}% Audience Share (+{persona.growth}%)
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {persona.engagementIntensity} Intensity
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-3">{persona.description}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {persona.keyInterests.map((interest, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                      #{interest}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                  <span>Platforms: {persona.dominantPlatforms.join(', ')}</span>
                  <span className="text-gray-300">Tone: {persona.sentimentBias}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Audience Demographics Report" />
    </div>
  );
}
