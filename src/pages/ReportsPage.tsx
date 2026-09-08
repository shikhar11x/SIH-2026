import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Plus,
  Sparkles,
  Clock,
  Eye,
  X,
  Layers,
} from 'lucide-react';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import type { IntelligenceReportItem } from '../services/mocks/reports';

export default function ReportsPage() {
  const [reports, setReports] = useState<IntelligenceReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState<IntelligenceReportItem | null>(null);
  const [generating, setGenerating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Executive Brief');
  const [newFormat, setNewFormat] = useState('PDF');
  const [exportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await api.getReports();
      setReports(data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = async () => {
    setGenerating(true);
    await api.generateReport({
      title: newTitle || 'Custom Executive Intelligence Dossier',
      category: newCategory,
      format: newFormat,
    });
    setGenerating(false);
    setGenerateModalOpen(false);
    setNewTitle('');
    loadReports();
  };

  if (loading) {
    return <LoadingSkeleton rows={5} height="h-48" />;
  }

  const getFormatBadge = (fmt: string) => {
    switch (fmt) {
      case 'PDF':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/25';
      case 'SLIDES':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
      case 'DOCX':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/25';
      default:
        return 'bg-accent/15 text-accent-light border-accent/25';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Intelligence Reports & Executive Briefs"
        subtitle="Automated neural synthesis engine compiling multi-channel data into exportable executive dossiers"
        tag="SYNTHESIS STUDIO"
        onRefresh={loadReports}
        actions={
          <button
            onClick={() => setGenerateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-dark text-white transition shadow-glow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate New Report</span>
          </button>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Generated Intelligence Dossiers"
          value={reports.length}
          subtitle="Ready for executive review"
          trend="up"
          icon={FileText}
          accentGlow
        />
        <StatCard
          title="Analyzed Data Coverage"
          value="10.3M Posts"
          subtitle="Across archived briefs"
          trend="up"
          icon={Layers}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Automated Schedule"
          value="Daily @ 08:00 IST"
          subtitle="Pre-market morning briefing"
          trend="neutral"
          icon={Clock}
        />
        <StatCard
          title="Export Formats"
          value="PDF, Slides, DOCX"
          subtitle="Vector-rendered high-res"
          trend="up"
          icon={Download}
          iconColor="text-purple-400"
        />
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map((rep) => (
          <motion.div
            key={rep.id}
            whileHover={{ y: -2 }}
            className="glass-panel p-5 border border-white/5 hover:border-accent/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase text-accent-light px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                  {rep.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getFormatBadge(rep.format)}`}>
                    {rep.format} • {rep.fileSize}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-2 leading-snug">{rep.title}</h3>

              <div className="space-y-1.5 my-3">
                {rep.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-light flex-shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-3 text-[11px] text-gray-400 font-mono">
              <span>{rep.generatedAt}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewReport(rep)}
                  className="flex items-center gap-1 text-gray-300 hover:text-white px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setExportModalOpen(true)}
                  className="flex items-center gap-1 text-accent-light hover:text-white px-2.5 py-1 rounded bg-accent/15 hover:bg-accent/25 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Generate Report Modal */}
      <AnimatePresence>
        {generateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-panel bg-navy-800/95 border border-white/10 p-6 rounded-2xl relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setGenerateModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-light">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Generate Custom Intelligence Brief</h3>
                  <p className="text-xs text-gray-400">Synthesize filtered social conversational stream</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Report Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Weekly Sovereign AI Compute & Dev Sentiment Synthesis"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:border-accent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-accent outline-none"
                    >
                      <option>Executive Brief</option>
                      <option>Crisis & Risk</option>
                      <option>Competitive Matrix</option>
                      <option>Influencer Deep Dive</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Export Format</label>
                    <select
                      value={newFormat}
                      onChange={(e) => setNewFormat(e.target.value)}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-accent outline-none"
                    >
                      <option>PDF</option>
                      <option>SLIDES</option>
                      <option>DOCX</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-navy-900 rounded-xl border border-white/5 space-y-1 text-gray-400 text-[11px]">
                  <div>Includes: 2.4M Analyzed Posts • ABSA Sentiment Breakdown • Network Graph Map</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => setGenerateModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateReport}
                  disabled={generating}
                  className="flex items-center gap-2 px-5 py-2 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-semibold shadow-glow disabled:opacity-50"
                >
                  {generating ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing Brief...</span>
                    </>
                  ) : (
                    <span>Generate Dossier</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl glass-panel bg-navy-800/95 border border-white/10 p-6 rounded-2xl relative shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setPreviewReport(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono text-accent-light font-bold uppercase">{previewReport.category}</span>
                <h3 className="text-xl font-bold text-white mt-1">{previewReport.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{previewReport.generatedAt} • {formatNumber(previewReport.postsAnalyzed)} posts analyzed</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-navy-900 border border-accent/20">
                  <h4 className="font-bold text-accent-light uppercase text-[11px] mb-2 font-mono">Executive Summary & Findings:</h4>
                  <ul className="space-y-2 text-gray-200">
                    {previewReport.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-navy-900 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 uppercase">Composite Sentiment Index</span>
                    <p className="text-lg font-bold text-emerald-400 font-mono mt-1">{previewReport.sentimentScore}/100</p>
                  </div>
                  <div className="p-3 bg-navy-900 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 uppercase">Model Verification</span>
                    <p className="text-lg font-bold text-white font-mono mt-1">RoBERTa-v4.2</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => setPreviewReport(null)}
                  className="px-4 py-2 bg-white/5 text-gray-300 rounded-xl text-xs hover:bg-white/10"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setPreviewReport(null);
                    setExportModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark shadow-glow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Dossier</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ExportModal isOpen={exportModalOpen} onClose={() => setExportModalOpen(false)} title="Download Intelligence Dossier" />
    </div>
  );
}
