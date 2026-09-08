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
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'SLIDES':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'DOCX':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm"
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
          iconColor="text-emerald-600"
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
          iconColor="text-amber-600"
        />
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map((rep) => (
          <motion.div
            key={rep.id}
            whileHover={{ y: -2 }}
            className="glass-panel p-5 border border-slate-200 hover:border-orange-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase text-orange-700 px-2 py-0.5 rounded bg-orange-50 border border-orange-200">
                  {rep.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getFormatBadge(rep.format)}`}>
                    {rep.format} • {rep.fileSize}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{rep.title}</h3>

              <div className="space-y-1.5 my-3">
                {rep.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3 text-[11px] text-slate-500 font-mono">
              <span>{rep.generatedAt}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewReport(rep)}
                  className="flex items-center gap-1 text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 transition font-sans font-medium"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setExportModalOpen(true)}
                  className="flex items-center gap-1 text-orange-700 hover:text-orange-800 px-2.5 py-1 rounded bg-orange-50 hover:bg-orange-100 transition font-sans font-medium"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white border border-slate-200 p-6 rounded-2xl relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setGenerateModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Generate Custom Intelligence Brief</h3>
                  <p className="text-xs text-slate-500">Synthesize filtered social conversational stream</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Report Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Weekly Sovereign AI Compute & Dev Sentiment Synthesis"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-orange-500 outline-none"
                    >
                      <option>Executive Brief</option>
                      <option>Crisis & Risk</option>
                      <option>Competitive Matrix</option>
                      <option>Influencer Deep Dive</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Export Format</label>
                    <select
                      value={newFormat}
                      onChange={(e) => setNewFormat(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:border-orange-500 outline-none"
                    >
                      <option>PDF</option>
                      <option>SLIDES</option>
                      <option>DOCX</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-slate-600 text-[11px]">
                  <div>Includes: 2.4M Analyzed Posts • ABSA Sentiment Breakdown • Network Graph Map</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setGenerateModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateReport}
                  disabled={generating}
                  className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-sm disabled:opacity-50"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white border border-slate-200 p-6 rounded-2xl relative shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setPreviewReport(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pb-3 border-b border-slate-200">
                <span className="text-[10px] font-mono text-orange-700 font-bold uppercase">{previewReport.category}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{previewReport.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{previewReport.generatedAt} • {formatNumber(previewReport.postsAnalyzed)} posts analyzed</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-orange-200">
                  <h4 className="font-bold text-orange-700 uppercase text-[11px] mb-2 font-mono">Executive Summary & Findings:</h4>
                  <ul className="space-y-2 text-slate-700">
                    {previewReport.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase">Composite Sentiment Index</span>
                    <p className="text-lg font-bold text-emerald-600 font-mono mt-1">{previewReport.sentimentScore}/100</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase">Model Verification</span>
                    <p className="text-lg font-bold text-slate-800 font-mono mt-1">RoBERTa-v4.2</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setPreviewReport(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs hover:bg-slate-200 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setPreviewReport(null);
                    setExportModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-semibold hover:bg-orange-700 shadow-sm"
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
