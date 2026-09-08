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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-200/80">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
          {tag && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
              <Sparkles className="w-3 h-3 text-orange-600" />
              {tag}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 font-medium">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {actions}
        {onFilter && (
          <button
            onClick={onFilter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition shadow-sm"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter</span>
          </button>
        )}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-orange-600' : ''}`} />
            <span>Sync Feed</span>
          </button>
        )}
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 hover:bg-orange-100 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-orange-600" />
            <span>Export Report</span>
          </button>
        )}
      </div>
    </div>
  );
};
