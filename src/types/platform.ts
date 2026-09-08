export interface Platform {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'available' | 'coming_soon';
  color: string;
  stats: {
    totalPosts: number;
    totalUsers: number;
    engagement: number;
  };
  capabilities: string[];
  description: string;
}

export interface PlatformStats {
  platformId: string;
  mentions: number;
  engagement: number;
  growth: number;
  sentiment: number;
  velocity: number;
}
