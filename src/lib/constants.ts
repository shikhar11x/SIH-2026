// Application constants

export const APP_NAME = 'SocialPulse AI';
export const APP_TAGLINE = 'AI-Powered Social Intelligence';

export const MOCK_DELAY = {
  fast: 300,
  medium: 500,
  slow: 800,
};

export const CHART_COLORS = {
  primary: '#6366f1',
  secondary: '#818cf8',
  tertiary: '#a78bfa',
  positive: '#10b981',
  neutral: '#6b7280',
  negative: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

export const PLATFORM_COLORS: Record<string, string> = {
  twitter: '#1DA1F2',
  telegram: '#0088cc',
  instagram: '#E4405F',
  facebook: '#1877F2',
  reddit: '#FF4500',
  youtube: '#FF0000',
};

export const PLATFORM_NAMES: Record<string, string> = {
  twitter: 'X / Twitter',
  telegram: 'Telegram',
  instagram: 'Instagram',
  facebook: 'Facebook',
  reddit: 'Reddit',
  youtube: 'YouTube',
};

export const DATE_RANGES = [
  { label: '24 Hours', value: '24h' },
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: 'Custom', value: 'custom' },
];

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
