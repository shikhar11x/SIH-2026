import React from 'react';
import { Globe, MessageSquare, Send, Video, Camera, Share2, Briefcase } from 'lucide-react';

interface PlatformBadgeProps {
  platform: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platform,
  size = 'md',
  showLabel = true,
}) => {
  const p = (platform || '').toLowerCase();

  let name = 'Platform';
  let color = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Globe;

  if (p.includes('twitter') || p.includes(' x') || p === 'x') {
    name = 'X (Twitter)';
    color = 'bg-sky-50 text-sky-700 border-sky-200';
    Icon = Share2;
  } else if (p.includes('reddit')) {
    name = 'Reddit';
    color = 'bg-orange-50 text-orange-700 border-orange-200';
    Icon = MessageSquare;
  } else if (p.includes('telegram')) {
    name = 'Telegram';
    color = 'bg-blue-50 text-blue-700 border-blue-200';
    Icon = Send;
  } else if (p.includes('youtube')) {
    name = 'YouTube';
    color = 'bg-red-50 text-red-700 border-red-200';
    Icon = Video;
  } else if (p.includes('instagram')) {
    name = 'Instagram';
    color = 'bg-pink-50 text-pink-700 border-pink-200';
    Icon = Camera;
  } else if (p.includes('linkedin')) {
    name = 'LinkedIn';
    color = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    Icon = Briefcase;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-lg border ${color} shadow-sm ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {showLabel && <span>{name}</span>}
    </span>
  );
};
