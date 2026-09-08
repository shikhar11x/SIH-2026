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
  title = 'Export Intelligence Dossier',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg glass-panel bg-navy-800/95 border border-white/10 p-6 rounded-2xl shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent-light">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="text-xs text-gray-400">Generate and download synthesized neural intelligence report</p>
            </div>
          </div>

          <div className="space-y-4 my-5">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-2">Export Format</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'pdf', label: 'PDF Report', badge: 'High-Res' },
                  { id: 'slides', label: 'Slide Deck', badge: '16:9' },
                  { id: 'docx', label: 'Word Doc', badge: 'Editable' },
                  { id: 'json', label: 'Raw Data', badge: 'JSON' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFormat(item.id as any)}
                    className={`p-3 rounded-xl text-center border text-xs font-medium transition ${
                      format === item.id
                        ? 'bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold mb-0.5">{item.label}</div>
                    <span className="text-[10px] text-accent-light opacity-90">{item.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Coverage:</span>
                <span className="text-white font-medium">2,418,920 Posts across 6 Platforms</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Neural Sentiment Model:</span>
                <span className="text-white font-medium">PulseRoBERTa v4.2 (Confidence 98.4%)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Includes:</span>
                <span className="text-accent-light font-medium">Aspect breakdowns, Inflection Timeline, Influencer Graphs</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || isDone}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-dark text-white transition shadow-glow disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Dossier...</span>
                </>
              ) : isDone ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Downloaded!</span>
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
