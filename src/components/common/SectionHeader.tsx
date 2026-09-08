import React from 'react';
import { Sparkles, RefreshCw, Download, Filter } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  onRefresh?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
  actions?: React.ReactNode;
  isRefreshing?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  tag,
  onRefresh,
  onExport,
  onFilter,
  actions,
  isRefreshing = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
          {tag && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent-light border border-accent/25">
              <Sparkles className="w-3 h-3" />
              {tag}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs sm:text-sm text-gray-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {actions}
        {onFilter && (
          <button
            onClick={onFilter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        )}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-accent-light' : ''}`} />
            <span>Sync</span>
          </button>
        )}
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-accent-light bg-accent/10 border border-accent/25 hover:bg-accent/20 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        )}
      </div>
    </div>
  );
};
