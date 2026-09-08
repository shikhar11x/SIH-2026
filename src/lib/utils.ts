// Utility functions

/**
 * Simulate network delay for mock API calls
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Format large numbers with K/M suffixes
 */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
};

/**
 * Format percentage with sign
 */
export const formatPercent = (value: number, showSign = true): string => {
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

/**
 * Conditional class name joiner
 */
export const cn = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

/**
 * Generate a random number within a range
 */
export const randomInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Get status color class
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'viral': return 'text-red-400 bg-red-400/10';
    case 'rising': return 'text-amber-400 bg-amber-400/10';
    case 'emerging': return 'text-emerald-400 bg-emerald-400/10';
    case 'declining': return 'text-gray-400 bg-gray-400/10';
    case 'stable': return 'text-blue-400 bg-blue-400/10';
    default: return 'text-gray-400 bg-gray-400/10';
  }
};

/**
 * Get sentiment color
 */
export const getSentimentColor = (sentiment: string): string => {
  switch (sentiment.toLowerCase()) {
    case 'positive': return '#10b981';
    case 'neutral': return '#6b7280';
    case 'negative': return '#ef4444';
    default: return '#6b7280';
  }
};
