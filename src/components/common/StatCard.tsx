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
  iconColor = 'text-orange-600',
  subtitle,
  onClick,
}) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      onClick={onClick}
      className={`glass-panel p-5 relative overflow-hidden transition-all duration-200 border border-slate-200 bg-white hover:border-orange-300 hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        )}
      </div>

      {(change !== undefined || subtitle) && (
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
          {change !== undefined && (
            <span
              className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] ${
                isPositive
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : isNegative
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {trend === 'neutral' && <Minus className="w-3 h-3" />}
              {typeof change === 'number' ? `${change > 0 ? '+' : ''}${change}%` : change}
            </span>
          )}
          <span className="text-slate-500 text-[11px] font-medium">{subtitle || changePeriod}</span>
        </div>
      )}
    </motion.div>
  );
};
