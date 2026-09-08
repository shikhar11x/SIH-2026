export interface NetworkNode {
  id: string;
  label: string;
  community: string;
  influenceScore: number;
  reach: number;
  engagement: number;
  sentiment: number;
  topTopics: string[];
  platform: string;
  x?: number;
  y?: number;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
  type: 'mention' | 'retweet' | 'reply' | 'follow';
}

export interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  communities: CommunityInfo[];
}

export interface CommunityInfo {
  id: string;
  name: string;
  color: string;
  nodeCount: number;
  avgInfluence: number;
  topTopics: string[];
}
