import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle2, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultCategory?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  title = 'Export National Intelligence Dossier',
}) => {
  const [format, setFormat] = useState<'pdf' | 'docx' | 'json' | 'slides'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg bg-white border border-slate-200 p-6 rounded-2xl shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500 font-medium">Generate official executive brief across multi-channel streams</p>
            </div>
          </div>

          <div className="space-y-4 my-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Export Format</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'pdf', label: 'PDF Brief', badge: 'Official' },
                  { id: 'slides', label: 'Slide Deck', badge: 'Presentation' },
                  { id: 'docx', label: 'Word Doc', badge: 'Editable' },
                  { id: 'json', label: 'Raw Stream', badge: 'JSON' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFormat(item.id as any)}
                    className={`p-3 rounded-xl text-center border text-xs font-semibold transition ${
                      format === item.id
                        ? 'bg-orange-50 border-orange-500 text-orange-800 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold mb-0.5">{item.label}</div>
                    <span className="text-[10px] text-orange-600 font-mono">{item.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Multi-Platform Coverage:</span>
                <span className="text-slate-900 font-bold">2,418,920 Live Ingested Posts</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Streams Active:</span>
                <span className="text-slate-900 font-bold">X, Telegram, Reddit, YouTube</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Classification Pipeline:</span>
                <span className="text-orange-700 font-bold font-mono">PulseRoBERTa-v4.2 (Indic ML)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || isDone}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Dossier...</span>
                </>
              ) : isDone ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Briefing Ready!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generate & Download</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
