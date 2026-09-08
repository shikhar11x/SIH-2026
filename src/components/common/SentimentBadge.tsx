import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

interface SentimentBadgeProps {
  sentiment: 'positive' | 'neutral' | 'negative' | string;
  score?: number;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export const SentimentBadge: React.FC<SentimentBadgeProps> = ({
  sentiment,
  score,
  size = 'md',
  showIcon = true,
}) => {
  const norm = (sentiment || '').toLowerCase();
  const isPos = norm.includes('pos');
  const isNeg = norm.includes('neg');

  const colorClass = isPos
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : isNeg
    ? 'bg-rose-50 text-rose-700 border-rose-200'
    : 'bg-amber-50 text-amber-700 border-amber-200';

  const label = isPos ? 'Positive' : isNeg ? 'Negative' : 'Neutral';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${colorClass} ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {showIcon && (
        <>
          {isPos && <Smile className={size === 'sm' ? 'w-3 h-3 text-emerald-600' : 'w-3.5 h-3.5 text-emerald-600'} />}
          {isNeg && <Frown className={size === 'sm' ? 'w-3 h-3 text-rose-600' : 'w-3.5 h-3.5 text-rose-600'} />}
          {!isPos && !isNeg && <Meh className={size === 'sm' ? 'w-3 h-3 text-amber-600' : 'w-3.5 h-3.5 text-amber-600'} />}
        </>
      )}
      <span>{label}</span>
      {score !== undefined && (
        <span className="opacity-80 font-mono text-[10px]">
          {score > 1 ? `${Math.round(score)}%` : `${Math.round(score * 100)}%`}
        </span>
      )}
    </span>
  );
};
