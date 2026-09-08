import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number | string;
  changePeriod?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ElementType;
  iconColor?: string;
  subtitle?: string;
  accentGlow?: boolean;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePeriod = 'vs last period',
  trend = 'up',
  icon: Icon,
  iconColor = 'text-accent-light',
  subtitle,
  accentGlow = false,
  onClick,
}) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      onClick={onClick}
      className={`glass-panel p-5 relative overflow-hidden transition-all duration-300 border border-white/5 hover:border-accent/30 ${
        accentGlow ? 'shadow-[0_0_25px_rgba(99,102,241,0.12)]' : ''
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Background subtle radial highlight */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        )}
      </div>

      {(change !== undefined || subtitle) && (
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
          {change !== undefined && (
            <span
              className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : isNegative
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
              }`}
            >
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {trend === 'neutral' && <Minus className="w-3 h-3" />}
              {typeof change === 'number' ? `${change > 0 ? '+' : ''}${change}%` : change}
            </span>
          )}
          <span className="text-gray-400 text-[11px]">{subtitle || changePeriod}</span>
        </div>
      )}
    </motion.div>
  );
};
