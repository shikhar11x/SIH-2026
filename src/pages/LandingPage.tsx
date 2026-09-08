import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Bot,
  Heart,
  TrendingUp,
  Network,
  Workflow,
  ChevronRight,
  Share2,
  Send,
  MessageSquare,
  Video,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [demoQuery, setDemoQuery] = useState('');
  const [demoResponse, setDemoResponse] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const handleDemoAsk = (question: string) => {
    setDemoQuery(question);
    setIsAnswering(true);
    setTimeout(() => {
      setIsAnswering(false);
      if (question.includes('spike') || question.includes('Friday')) {
        setDemoResponse(
          'Friday 14:00 IST spike (+420% volume) was triggered by the National AI Sovereign Compute grant rollout by MeitY. Lead researcher @aarav_ai_lab initiated the primary X cascade.'
        );
      } else if (question.includes('KOL') || question.includes('influencer')) {
        setDemoResponse(
          'Top Key Opinion Leaders identified by Betweenness Centrality: 1. Dr. Aarav Mehta (0.89), 2. Rajesh Singhal (0.82), 3. Dr. Tanvi Patel (0.73).'
        );
      } else {
        setDemoResponse(
          'Multi-channel real-time indexing across 2.4M posts reveals 62.4% net positive sentiment, driven by open model weight adoption and GPU compute grant discussions in India.'
        );
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-orange-500 selection:text-white font-sans overflow-x-hidden">
      {/* Top Tricolor Strip */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-orange-500" />
        <div className="h-full w-1/3 bg-blue-900" />
        <div className="h-full w-1/3 bg-emerald-600" />
      </div>

      {/* Top Real-time Trending Ticker Banner */}
      <div className="bg-white border-b border-slate-200 py-1.5 px-4 text-xs font-mono flex items-center justify-between overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 flex-shrink-0 pr-3 border-r border-slate-200">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          <span className="text-orange-700 font-extrabold uppercase text-[10px]">🔴 REAL-TIME INGESTION LIVE</span>
        </div>
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 px-4 whitespace-nowrap text-xs text-slate-700">
          <span className="font-bold text-slate-900">#IndiaAI Mission <strong className="text-orange-600">(284K ↑)</strong></span>
          <span>•</span>
          <span className="font-bold text-slate-900">#DigitalBharat <strong className="text-blue-700">(192K ↑)</strong></span>
          <span>•</span>
          <span className="font-bold text-slate-900">#SovereignCompute <strong className="text-emerald-700">(146K ↑)</strong></span>
          <span>•</span>
          <span className="font-bold text-slate-900">#TwitterSentimentX <strong className="text-sky-600">(128K ↑)</strong></span>
          <span>•</span>
          <span className="font-bold text-slate-900">#CyberSecurityIndia <strong className="text-amber-700">(82K)</strong></span>
        </div>
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 text-[11px] text-slate-500 font-semibold flex-shrink-0">
          <span>Speed: 342 msgs/sec</span>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-blue-900 to-emerald-600 p-[2px] flex items-center justify-center flex-shrink-0 shadow-sm">
              <div className="w-full h-full bg-white rounded-[8px] flex items-center justify-center">
                <span className="text-lg">🇮🇳</span>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-slate-900 block leading-tight">
                SOCIALPULSE <span className="text-orange-600">BHARAT</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                National Social Intelligence Grid
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600 uppercase tracking-wide">
            <a href="#features" className="hover:text-orange-600 transition">Intelligence Modules</a>
            <a href="#realtime" className="hover:text-orange-600 transition">Real-Time Streams</a>
            <a href="#demo" className="hover:text-orange-600 transition">AI Copilot</a>
            <a href="#architecture" className="hover:text-orange-600 transition">Architecture</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/analysis/overview')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/analysis/overview')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm"
            >
              <span>Launch Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Release Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>Government of India • National AI Mission Intelligence Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-5xl mx-auto leading-tight"
        >
          Real-Time Social Media Intelligence &{' '}
          <span className="text-orange-600">Narrative Forensics</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Real-time firehose ingestion across X/Twitter, Telegram, Reddit, and YouTube. Continuous monitoring for public sentiment shifts, key opinion leader propagation, and emerging narrative anomalies across India.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/analysis/overview')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white transition shadow-md"
          >
            <span>Launch Intelligence Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/copilot')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 transition shadow-sm"
          >
            <Bot className="w-4 h-4 text-orange-600" />
            <span>Consult AI Copilot</span>
          </button>
        </motion.div>

        {/* Real-time App Fetch Stream Status Bar */}
        <div id="realtime" className="mt-12 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">X / Twitter Feed</h4>
                <span className="text-[11px] text-slate-500 font-mono">184 msgs/sec</span>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Telegram Channels</h4>
                <span className="text-[11px] text-slate-500 font-mono">68 msgs/sec</span>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Reddit Subreddits</h4>
                <span className="text-[11px] text-slate-500 font-mono">52 msgs/sec</span>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">YouTube Comments</h4>
                <span className="text-[11px] text-slate-500 font-mono">38 msgs/sec</span>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Mock Portal Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl text-left"
        >
          <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="ml-2 text-xs font-mono text-slate-500">https://socialpulse.gov.in/analysis/overview</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              ● DECAHOSE FEED ACTIVE
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-50/50">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500">Live Ingested Volume</span>
              <h4 className="text-2xl font-black text-slate-900 mt-1">2,418,920</h4>
              <span className="text-[11px] text-emerald-700 font-bold">+14.8% this week</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500">National Sentiment</span>
              <h4 className="text-2xl font-black text-emerald-700 mt-1">74.3 / 100</h4>
              <span className="text-[11px] text-emerald-700 font-bold">62.4% Positive Bias</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500">#1 Trending Topic</span>
              <h4 className="text-base font-bold text-slate-900 mt-1 truncate">#IndiaAI Mission</h4>
              <span className="text-[11px] text-orange-600 font-bold">16.2K msgs / hr</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500">Virality Rate (R₀)</span>
              <h4 className="text-2xl font-black text-blue-900 mt-1">2.84</h4>
              <span className="text-[11px] text-slate-500 font-semibold">Super-spreading</span>
            </div>
          </div>

          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Live SocialPulse Bharat Grid — 12 Intelligence Modules Available</span>
            <button
              onClick={() => navigate('/analysis/overview')}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
            >
              Open Live Dashboard →
            </button>
          </div>
        </motion.div>
      </section>

      {/* SIH Problem Statement Core Architecture Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-700 font-mono bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            SMART INDIA HACKATHON 2026 • 5 CORE COMPONENTS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
            AI-Driven Audience Intelligence & Link Analysis Framework
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Direct 1:1 architectural alignment with the SIH Problem Statement across Continuous Ingestion, Multi-Dimensional Sentiment, Demographics, Trends, and Graph Link Analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              badge: 'COMPONENT A',
              icon: Share2,
              title: 'Continuous Data Collection & Timeline',
              desc: 'Multi-platform live ingestion pipeline (Essentials: X & Telegram, Desirable: IG & FB, Appreciable: Reddit & YouTube) with structured time-stamped chronology.',
              path: '/data',
              color: 'text-orange-600',
              bg: 'bg-orange-50',
            },
            {
              badge: 'COMPONENT B',
              icon: Heart,
              title: 'Multi-Dimensional Sentiment Inference',
              desc: 'Advanced NLP detecting nuanced emotions: Sarcasm, Anxiety, Excitement, Supportive, Against/Opposed, and tracking sentiment shifts along the chronological timeline.',
              path: '/analysis/sentiment',
              color: 'text-emerald-700',
              bg: 'bg-emerald-50',
            },
            {
              badge: 'COMPONENT C',
              icon: TrendingUp,
              title: 'Automated Demographic Profiling',
              desc: 'Aggregate, anonymized inference of age brackets, Indian state & global geography, Indic languages, and professional domain interest personas.',
              path: '/analysis/demographics',
              color: 'text-blue-700',
              bg: 'bg-blue-50',
            },
            {
              badge: 'COMPONENT D',
              icon: Workflow,
              title: 'Real-Time Trend & Topic Detection',
              desc: 'Autonomous ranking, viral keyword emergence, velocity forecasting, and chronological shifting discussion tracking across active discourse.',
              path: '/analysis/trends',
              color: 'text-amber-700',
              bg: 'bg-amber-50',
            },
            {
              badge: 'COMPONENT E',
              icon: Network,
              title: 'Link Analysis & Network Topology',
              desc: 'Follower relationship graph mapping, Key Opinion Leader (KOL) discovery via PageRank / Centrality, and multi-hop narrative diffusion cascades.',
              path: '/analysis/network',
              color: 'text-purple-700',
              bg: 'bg-purple-50',
            },
            {
              badge: 'DECISION SUPPORT',
              icon: Bot,
              title: 'Bharat AI Copilot & Executive Briefs',
              desc: 'Conversational synthesis engine with verified social citations, inline charts, and automated daily intelligence dossier generator.',
              path: '/copilot',
              color: 'text-rose-700',
              bg: 'bg-rose-50',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center ${item.color} shadow-sm`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-orange-600 mt-4">
                <span>Explore Component Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Copilot Sandbox */}
      <section id="demo" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">National Intelligence Copilot Sandbox</h3>
              <p className="text-xs text-slate-500 font-medium">Click a preset query to synthesize live intelligence across 2.4M posts</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              'What caused the sudden sentiment spike on Friday afternoon?',
              'Identify the top KOLs in the sovereign compute debate.',
              'Summarize cross-platform sentiment around #IndiaAI.',
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleDemoAsk(q)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-700 border border-slate-200 transition text-left"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="min-h-[110px] p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
            {isAnswering ? (
              <div className="flex items-center gap-2 text-xs text-orange-700 font-mono font-bold">
                <Sparkles className="w-4 h-4 animate-spin text-orange-600" />
                <span>Synthesizing cross-channel intelligence...</span>
              </div>
            ) : demoResponse ? (
              <div className="space-y-2">
                <div className="text-xs text-slate-500 font-mono font-semibold">Query: "{demoQuery}"</div>
                <div className="text-xs text-slate-800 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200 font-medium">
                  {demoResponse}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic text-center">
                Click any prompt above to experience the AI Copilot.
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">Need detailed post citations and timeline graphs?</span>
            <button
              onClick={() => navigate('/copilot')}
              className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Open Dedicated AI Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇮🇳</span>
            <span className="font-extrabold text-slate-900">SOCIALPULSE BHARAT</span>
            <span>— Smart India Hackathon 2026</span>
          </div>
          <div>National Social Media Intelligence Grid • Real-time Stream Normalization</div>
        </div>
      </footer>
    </div>
  );
}
