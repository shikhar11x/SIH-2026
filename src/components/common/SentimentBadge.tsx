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
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
    : isNeg
    ? 'bg-rose-500/10 text-rose-400 border-rose-500/25'
    : 'bg-amber-500/10 text-amber-400 border-amber-500/25';

  const label = isPos ? 'Positive' : isNeg ? 'Negative' : 'Neutral';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${colorClass} ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {showIcon && (
        <>
          {isPos && <Smile className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
          {isNeg && <Frown className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
          {!isPos && !isNeg && <Meh className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
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
