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
  let color = 'bg-gray-500/10 text-gray-300 border-gray-500/20';
  let Icon = Globe;

  if (p.includes('twitter') || p.includes(' x') || p === 'x') {
    name = 'X (Twitter)';
    color = 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    Icon = Share2;
  } else if (p.includes('reddit')) {
    name = 'Reddit';
    color = 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    Icon = MessageSquare;
  } else if (p.includes('telegram')) {
    name = 'Telegram';
    color = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    Icon = Send;
  } else if (p.includes('youtube')) {
    name = 'YouTube';
    color = 'bg-red-500/10 text-red-400 border-red-500/20';
    Icon = Video;
  } else if (p.includes('instagram')) {
    name = 'Instagram';
    color = 'bg-pink-500/10 text-pink-400 border-pink-500/20';
    Icon = Camera;
  } else if (p.includes('linkedin')) {
    name = 'LinkedIn';
    color = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    Icon = Briefcase;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg border ${color} ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {showLabel && <span>{name}</span>}
    </span>
  );
};
