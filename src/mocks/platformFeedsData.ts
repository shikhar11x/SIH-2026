export interface TwitterPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
    isOfficialGov?: boolean;
  };
  content: string;
  timestamp: string;
  metrics: {
    retweets: number;
    likes: number;
    replies: number;
    views: string;
  };
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  hashtags: string[];
  location?: string;
  stance: 'Pro-Policy' | 'Critical' | 'Neutral Analysis' | 'Fact Check';
}

export interface YouTubeVideo {
  id: string;
  channel: {
    name: string;
    avatar: string;
    subscribers: string;
    verified: boolean;
  };
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  published: string;
  likes: string;
  commentsCount: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topComments: {
    user: string;
    text: string;
    likes: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  }[];
  topic: string;
  isShort?: boolean;
}

export interface TelegramMessage {
  id: string;
  channel: {
    name: string;
    subscribers: string;
    verified: boolean;
    category: string;
  };
  text: string;
  timestamp: string;
  views: string;
  forwards: number;
  forwardDepth: number;
  riskScore: 'Low' | 'Medium' | 'Elevated';
  forwardedFrom?: string;
}

export interface RedditPost {
  id: string;
  subreddit: string;
  author: string;
  title: string;
  body: string;
  upvotes: number;
  upvoteRatio: number;
  commentsCount: number;
  timestamp: string;
  flair: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  topComment: {
    author: string;
    text: string;
    upvotes: number;
  };
}

export interface InstagramPost {
  id: string;
  author: {
    handle: string;
    avatar: string;
    verified: boolean;
  };
  caption: string;
  likes: string;
  comments: string;
  timestamp: string;
  audioTrack: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  emotion: string;
  hashtags: string[];
  isReel: boolean;
}

export interface LinkedInPost {
  id: string;
  author: {
    name: string;
    headline: string;
    avatar: string;
    connections: string;
  };
  content: string;
  timestamp: string;
  metrics: {
    reactions: number;
    comments: number;
    reposts: number;
  };
  industry: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  keyThemes: string[];
}

// ── 1. TWITTER / X MOCK DATA ──
export const MOCK_TWITTER_POSTS: TwitterPost[] = [
  {
    id: 'tw-1',
    author: {
      name: 'Ministry of Electronics & IT',
      handle: 'GoI_MeitY',
      avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&auto=format&fit=crop&q=80',
      verified: true,
      isOfficialGov: true,
    },
    content: 'The #IndiaAI Mission allocates ₹10,372 Cr for establishing sovereign compute infrastructure with over 10,000 GPUs for Indian startups, researchers, and academia. #DigitalBharat #TechSovereignty',
    timestamp: '14m ago',
    metrics: { retweets: 3840, likes: 14200, replies: 642, views: '284K' },
    sentiment: 'positive',
    sentimentScore: 92,
    hashtags: ['#IndiaAI', '#DigitalBharat', '#TechSovereignty'],
    location: 'New Delhi',
    stance: 'Pro-Policy',
  },
  {
    id: 'tw-2',
    author: {
      name: 'Prof. Anirudh Sharma',
      handle: 'anirudh_tech_ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      verified: true,
    },
    content: 'Excited to see public datasets being released in 22 official Indian languages. Real NLP breakthroughs need multi-lingual vernacular foundational models! Here is my detailed breakdown of the benchmark results 🧵👇 #IndiaStack',
    timestamp: '42m ago',
    metrics: { retweets: 1240, likes: 5890, replies: 198, views: '98K' },
    sentiment: 'positive',
    sentimentScore: 88,
    hashtags: ['#IndiaStack', '#AIResearch'],
    location: 'Bengaluru, Karnataka',
    stance: 'Pro-Policy',
  },
  {
    id: 'tw-3',
    author: {
      name: 'Data & Privacy Watch India',
      handle: 'dataprivacy_in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      verified: false,
    },
    content: 'While semiconductor subsidies are vital, what are the privacy guardrails under DPDP Act for civic surveillance tools? Public transparency reports must be mandated for all state-level AI deployments.',
    timestamp: '1h ago',
    metrics: { retweets: 890, likes: 2310, replies: 312, views: '45K' },
    sentiment: 'neutral',
    sentimentScore: 54,
    hashtags: ['#DPDPAct', '#DigitalRights', '#Surveillance'],
    location: 'Mumbai, Maharashtra',
    stance: 'Critical',
  },
  {
    id: 'tw-4',
    author: {
      name: 'PIB Fact Check',
      handle: 'PIBFactCheck',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
      verified: true,
      isOfficialGov: true,
    },
    content: '🚨 FACT CHECK: A viral message claiming biometric Aadhaar linkage is mandatory for ATM cash withdrawals within 48 hours is FAKE. Do not share unverified forwards.',
    timestamp: '2h ago',
    metrics: { retweets: 8900, likes: 21400, replies: 430, views: '610K' },
    sentiment: 'neutral',
    sentimentScore: 60,
    hashtags: ['#PIBFactCheck', '#FakeNewsBuster'],
    location: 'New Delhi',
    stance: 'Fact Check',
  },
];

// ── 2. YOUTUBE MOCK DATA ──
export const MOCK_YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'yt-1',
    channel: {
      name: 'Sansad TV Official',
      avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&auto=format&fit=crop&q=80',
      subscribers: '8.4M',
      verified: true,
    },
    title: 'Special Briefing: National Sovereign Artificial Intelligence & Semiconductor Roadmap 2026',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    duration: '28:45',
    views: '842,900',
    published: '3 hours ago',
    likes: '48.2K',
    commentsCount: 3420,
    sentiment: { positive: 76, neutral: 18, negative: 6 },
    topic: 'Governance & Tech',
    topComments: [
      { user: 'Rohan Sharma', text: '10,000 GPU cluster access for tier-2 colleges is a game changer for students!', likes: 1420, sentiment: 'positive' },
      { user: 'TechVanguard', text: 'Hope the latency for vernacular speech models improves in the next release.', likes: 380, sentiment: 'neutral' },
    ],
  },
  {
    id: 'yt-2',
    channel: {
      name: 'Indian Tech Burner Insights',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      subscribers: '11.2M',
      verified: true,
    },
    title: 'Made in India AI vs Silicon Valley: We Tested Everything! 🇮🇳🔥',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    duration: '14:12',
    views: '1,420,000',
    published: '6 hours ago',
    likes: '118K',
    commentsCount: 8920,
    sentiment: { positive: 84, neutral: 11, negative: 5 },
    topic: 'Tech Review',
    topComments: [
      { user: 'Vikram Patel', text: 'The Hindi dialect comprehension is leagues ahead of other LLMs!', likes: 4920, sentiment: 'positive' },
    ],
  },
  {
    id: 'yt-3',
    channel: {
      name: 'Niti Aayog Dialogues',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
      subscribers: '1.8M',
      verified: true,
    },
    title: 'Agritech AI: Precision Soil Monitoring & Crop Yield Prediction for Indian Farmers',
    thumbnail: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop&q=80',
    duration: '21:30',
    views: '320,000',
    published: '12 hours ago',
    likes: '22K',
    commentsCount: 1120,
    sentiment: { positive: 89, neutral: 9, negative: 2 },
    topic: 'Agriculture & AI',
    topComments: [
      { user: 'Kisan Helpline', text: 'Very useful information on drone spraying subsidies.', likes: 890, sentiment: 'positive' },
    ],
  },
];

// ── 3. TELEGRAM MOCK DATA ──
export const MOCK_TELEGRAM_MESSAGES: TelegramMessage[] = [
  {
    id: 'tg-1',
    channel: {
      name: 'PIB FactCheck Official',
      subscribers: '640K',
      verified: true,
      category: 'Fact-Check Bureau',
    },
    text: '📢 URGENT ADVISORY: Beware of deceptive phishing portals impersonating PM Kisan Samman Nidhi. Official portal is ONLY pmkisan.gov.in. Never share OTP or UPI PIN.',
    timestamp: '18m ago',
    views: '142.8K',
    forwards: 3840,
    forwardDepth: 12,
    riskScore: 'Low',
  },
  {
    id: 'tg-2',
    channel: {
      name: 'Cyber Security India Alert',
      subscribers: '320K',
      verified: true,
      category: 'Cyber Defence',
    },
    text: '🛡️ CERT-In has issued a vulnerability note (CIVN-2026-0412) regarding Android WebView token hijacking. Immediate updates advised for all banking application users.',
    timestamp: '45m ago',
    views: '88.4K',
    forwards: 1940,
    forwardDepth: 8,
    riskScore: 'Low',
  },
  {
    id: 'tg-3',
    channel: {
      name: 'Bharat Tech & Startup Pulse',
      subscribers: '185K',
      verified: false,
      category: 'Tech Community',
    },
    text: '🚀 Over 240 Indian startups registered for the AI Compute Subsidy scheme in the first 48 hours. Highest participation from Karnataka, Maharashtra, and Delhi NCR.',
    timestamp: '2h ago',
    views: '42.1K',
    forwards: 620,
    forwardDepth: 5,
    riskScore: 'Low',
  },
];

// ── 4. REDDIT MOCK DATA ──
export const MOCK_REDDIT_POSTS: RedditPost[] = [
  {
    id: 'rd-1',
    subreddit: 'r/developersIndia',
    author: 'u/sharma_kernel_dev',
    title: 'Open-sourcing our Indic-Tokenizer trained on 14 billion tokens of Hindi, Tamil, Telugu & Marathi text',
    body: 'We spent the last 6 months benchmarking BPE tokenizers for Indian languages. Standard LLaMA tokenizers waste 4-6 tokens per Devanagari word. Our custom vocabulary reduces token cost by 62%. GitHub repo inside.',
    upvotes: 2840,
    upvoteRatio: 0.98,
    commentsCount: 312,
    timestamp: '2h ago',
    flair: 'Project / Showcase',
    sentiment: 'positive',
    topComment: {
      author: 'u/ai_researcher_iit',
      text: 'Starred the repo! Have you tested cross-lingual transfer on summarization tasks?',
      upvotes: 480,
    },
  },
  {
    id: 'rd-2',
    subreddit: 'r/india',
    author: 'u/civic_observer',
    title: 'UPI transaction volume hits new all-time high of 18.2 Billion transactions in a single month',
    body: 'Remarkable how frictionless street payments have become across tier-3 towns and rural mandis. Financial inclusion metrics from NPCI report analyzed.',
    upvotes: 4120,
    upvoteRatio: 0.94,
    commentsCount: 540,
    timestamp: '4h ago',
    flair: 'Economy',
    sentiment: 'positive',
    topComment: {
      author: 'u/desi_economist',
      text: 'The international UPI expansion in UAE, Singapore, and France is also accelerating remittance flows.',
      upvotes: 620,
    },
  },
  {
    id: 'rd-3',
    subreddit: 'r/IndianModerate',
    author: 'u/policy_analyst_26',
    title: 'Discussion: What are the primary bottlenecks in scaling semiconductor fabs in Dholera & Sanand?',
    body: 'Looking into water recycling pipelines, cleanroom grade power continuity, and specialized chemical supply chains. Let us discuss realistic timelines.',
    upvotes: 890,
    upvoteRatio: 0.89,
    commentsCount: 178,
    timestamp: '6h ago',
    flair: 'Policy Discussion',
    sentiment: 'neutral',
    topComment: {
      author: 'u/vlsi_engineer_in',
      text: 'Ultra-pure water plants and uninterrupted gas infrastructure are already near completion.',
      upvotes: 210,
    },
  },
];

// ── 5. INSTAGRAM MOCK DATA ──
export const MOCK_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    author: {
      handle: 'digitalindia_official',
      avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'From local craft bazaars to global markets — how ONDC is transforming small artisans into direct digital exporters! 🧵✨ #VocalForLocal #DigitalBharat #MadeInIndia',
    likes: '142K',
    comments: '1,840',
    timestamp: '1h ago',
    audioTrack: 'Original Audio · Made In India Beats',
    sentiment: 'positive',
    emotion: 'Inspiration & Pride',
    hashtags: ['#DigitalBharat', '#VocalForLocal', '#ONDC'],
    isReel: true,
  },
  {
    id: 'ig-2',
    author: {
      handle: 'incredibleindia',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Autumn hues across Pangong Tso, Ladakh. Experience the pristine serenity of sovereign Himalayas. 🏔️✨ #IncredibleIndia #ExploreLadakh',
    likes: '289K',
    comments: '3,210',
    timestamp: '3h ago',
    audioTrack: 'Himalayan Flute · Serenity Series',
    sentiment: 'positive',
    emotion: 'Wonder & Awe',
    hashtags: ['#IncredibleIndia', '#ExploreLadakh'],
    isReel: true,
  },
];

// ── 6. LINKEDIN MOCK DATA ──
export const MOCK_LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: 'li-1',
    author: {
      name: 'Dr. Rajeshwari Sundaram',
      headline: 'Principal AI Scientist | Ex-IISc | Advisory Member, National AI Committee',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      connections: '500+ Connections',
    },
    content: 'Pleased to share that our joint whitepaper on "Ethical Alignment & Bias Mitigation in Indic Language Foundation Models" is now published. When training on multilingual corpuses across 22 Scheduled Languages, synthetic evaluation benchmarks show significant hallucination reduction.',
    timestamp: '2h ago',
    metrics: { reactions: 1840, comments: 242, reposts: 180 },
    industry: 'Artificial Intelligence & Research',
    sentiment: 'positive',
    keyThemes: ['Responsible AI', 'Multilingual NLP', 'Indic LLMs'],
  },
  {
    id: 'li-2',
    author: {
      name: 'Aditya Vardhan IAS',
      headline: 'Special Secretary, Department of Information Technology & Communications',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      connections: '500+ Connections',
    },
    content: 'Civic governance is evolving from reactive issue resolution to predictive public service delivery. Through real-time sentiment telemetry and cross-departmental data bridges, grievance redressal time has decreased by 48% across district administrative units.',
    timestamp: '5h ago',
    metrics: { reactions: 3120, comments: 410, reposts: 390 },
    industry: 'Public Administration & GovTech',
    sentiment: 'positive',
    keyThemes: ['GovTech', 'Citizen Service Delivery', 'Data Governance'],
  },
];
