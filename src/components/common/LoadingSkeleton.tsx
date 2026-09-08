import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number; height?: string }> = ({
  rows = 4,
  height = 'h-32',
}) => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-xl border border-slate-200 shadow-sm" />
        ))}
      </div>
      <div className={`w-full ${height} bg-white rounded-xl border border-slate-200 shadow-sm`} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="h-44 bg-white rounded-xl border border-slate-200 shadow-sm" />
        ))}
      </div>
    </div>
  );
};
