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
    color: g.color === '#6366f1' ? '#1e3a8a' : g.color,
  }));

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Automated Demographic Profiling & Audience Intelligence"
        subtitle="Aggregate, anonymized inference of age brackets, geographic distribution (Indian states & global), Indic languages, and professional domain interests"
        tag="SIH COMPONENT C: AUTOMATED DEMOGRAPHIC PROFILING"
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
          iconColor="text-blue-700"
        />
        <StatCard
          title="Dominant Age Bracket"
          value={data.overview.dominantAgeRange}
          subtitle="Indian tech youth & workforce"
          trend="neutral"
          icon={UserCheck}
          iconColor="text-orange-600"
        />
        <StatCard
          title="Primary Geographic Hub"
          value={data.overview.topCountry}
          subtitle="Concentrated in Bengaluru, Delhi & Hyderabad"
          trend="up"
          icon={Globe}
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Linguistic Diversity Index"
          value={`${data.overview.diversityIndex} / 100`}
          subtitle="Indic & multi-lingual coverage"
          trend="up"
          icon={Languages}
          iconColor="text-orange-600"
        />
      </div>

      {/* Row 2: Age Cohorts + Gender Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Age Cohorts Bar Chart */}
        <div className="glass-panel p-5 bg-white border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Age Cohort Distribution</h3>
              <p className="text-xs text-slate-500 font-medium">Percentage distribution across generational cohorts</p>
            </div>
            <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              69.4% in 18-34
            </span>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ageDistribution} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v}%`} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                />
                <Bar dataKey="percentage" fill="#ea580c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Breakdown Donut */}
        <div className="glass-panel p-5 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Gender Distribution</h3>
            <p className="text-xs text-slate-500 font-medium">Estimated participant ratio</p>
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
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-200">
            {data.genderSplit.map((g, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                  <span className="text-slate-700">{g.gender}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{g.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Geographic Distribution + Language Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Breakdown */}
        <div className="glass-panel p-5 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Top Geographic Reach</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold">Ranked by volume</span>
          </div>

          <div className="space-y-2.5">
            {data.geoDistribution.map((country, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 transition">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{country.flag}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{country.country}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{formatNumber(country.count)} participants</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{country.percentage}%</span>
                    <span className="text-[10px] text-slate-500">Share</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xs font-bold text-emerald-700 block font-mono">{country.sentiment}/100</span>
                    <span className="text-[10px] text-slate-500">Sentiment</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages & Device Types */}
        <div className="space-y-6">
          <div className="glass-panel p-5 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Language Spectrum</h3>
              </div>
            </div>

            <div className="space-y-3">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">{lang.name}</span>
                    <span className="font-mono text-slate-500">
                      <strong className="text-slate-900">{lang.percentage}%</strong> ({formatNumber(lang.count)})
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div style={{ width: `${lang.percentage}%` }} className="bg-orange-600 h-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 bg-white border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Client Devices in India</h3>
            <div className="grid grid-cols-3 gap-3">
              {data.devices.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-base font-bold text-slate-900 block font-mono">{d.percentage}%</span>
                  <span className="text-[10px] text-slate-500 font-medium">{d.device}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: AI Persona Clusters */}
      <div className="glass-panel p-5 bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">AI Behavioral Persona Clusters</h3>
              <p className="text-xs text-slate-500 font-medium">Semantic clustering of participant intentions and engagement behaviors</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
            4 Core Clusters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.personas.map((persona) => (
            <motion.div
              key={persona.id}
              whileHover={{ y: -2 }}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-white border border-slate-200 shadow-sm">{persona.avatarBadge}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{persona.name}</h4>
                      <span className="text-[11px] text-orange-700 font-bold">
                        {persona.sharePercentage}% Audience Share (+{persona.growth}%)
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {persona.engagementIntensity}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3 font-medium">{persona.description}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {persona.keyInterests.map((interest, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-medium">
                      #{interest}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 text-[10px] text-slate-500 font-mono font-semibold">
                  <span>Platforms: {persona.dominantPlatforms.join(', ')}</span>
                  <span className="text-slate-800">Tone: {persona.sentimentBias}</span>
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
