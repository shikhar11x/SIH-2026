import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: { title: 'text-xs', subtitle: 'text-[9px]' },
    md: { title: 'text-sm', subtitle: 'text-[10px]' },
    lg: { title: 'text-base', subtitle: 'text-xs' },
    xl: { title: 'text-xl', subtitle: 'text-xs' },
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* High-tech Emblem: Ashoka Chakra + Neural Mesh + Tricolor Halo */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        {/* Glowing Tricolor Ring Gradient */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-orange-500 via-blue-900 to-emerald-600 p-[1.5px] shadow-sm">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden" />
        </div>

        {/* Vector SVG Emblem */}
        <svg
          viewBox="0 0 40 40"
          className="relative z-10 w-full h-full p-1 drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle background glow */}
          <circle cx="20" cy="20" r="14" fill="#002d62" fillOpacity="0.4" />

          {/* Outer Chakra Rim */}
          <circle cx="20" cy="20" r="13" stroke="#f97316" strokeWidth="1.2" strokeDasharray="3 1.5" />
          <circle cx="20" cy="20" r="10.5" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />

          {/* 12 Core Ashoka / Neural Spokes */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line
              key={i}
              x1="20"
              y1="20"
              x2={20 + 9 * Math.cos((angle * Math.PI) / 180)}
              y2={20 + 9 * Math.sin((angle * Math.PI) / 180)}
              stroke={i % 2 === 0 ? '#60a5fa' : '#34d399'}
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.9"
            />
          ))}

          {/* Neural Node Points */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle
              key={i}
              cx={20 + 9 * Math.cos((angle * Math.PI) / 180)}
              cy={20 + 9 * Math.sin((angle * Math.PI) / 180)}
              r="1.2"
              fill={i % 3 === 0 ? '#f97316' : i % 3 === 1 ? '#ffffff' : '#10b981'}
            />
          ))}

          {/* Center Hub */}
          <circle cx="20" cy="20" r="3.2" fill="#ffffff" stroke="#002d62" strokeWidth="1" />
          <circle cx="20" cy="20" r="1.5" fill="#ea580c" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className={`font-black tracking-tight text-slate-900 ${textSizes[size].title}`}>
              SOCIALPULSE
            </span>
            <span className={`font-black tracking-tight text-orange-600 ${textSizes[size].title}`}>
              BHARAT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          </div>
          <span className={`font-semibold text-slate-400 tracking-wider uppercase ${textSizes[size].subtitle}`}>
            National AI Intelligence Grid
          </span>
        </div>
      )}
    </div>
  );
};
