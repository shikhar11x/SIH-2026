import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Sparkles,
  Bot,
  Heart,
  TrendingUp,
  Network,
  Workflow,
  Globe,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Radio,
  FileText,
  Share2,
  Send,
  MessageSquare,
  Video,
  Briefcase,
  Camera,
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
          'Friday 14:00 IST spike (+420% volume) was triggered by the National AI Sovereign Compute grant announcement. Lead researcher @aarav_ai_lab initiated the primary diffusion cascade.'
        );
      } else if (question.includes('KOL') || question.includes('influencer')) {
        setDemoResponse(
          'Top Key Opinion Leaders identified by Betweenness Centrality: 1. Dr. Aarav Mehta (0.89), 2. Rajesh Singhal (0.82), 3. Dr. Tanvi Patel (0.73).'
        );
      } else {
        setDemoResponse(
          'Cross-platform indexing across 2.4M posts indicates 62.4% net positive sentiment, driven by open model weight adoption and GPU compute grant discussions.'
        );
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 selection:bg-accent selection:text-white font-sans overflow-x-hidden">
      {/* Background ambient glowing orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-accent/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-navy-900/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-wider text-white">
              SOCIALPULSE <span className="text-accent-light">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition">Capabilities</a>
            <a href="#demo" className="hover:text-white transition">Live Intelligence</a>
            <a href="#platforms" className="hover:text-white transition">Connectors</a>
            <a href="#architecture" className="hover:text-white transition">Architecture</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/analysis/overview')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/analysis/overview')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-dark text-white transition shadow-glow"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Release Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent-light text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Next-Gen Social Narrative Forensics & Intelligence</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
        >
          Decode Social Conversations with{' '}
          <span className="gradient-text">Neural Intelligence</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Continuous multi-channel social stream analytics. Uncover aspect-based sentiment, influencer network topologies, viral cascade dynamics, and early warning narrative anomalies.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/analysis/overview')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-accent hover:bg-accent-dark text-white transition shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            <span>Enter Intelligence Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/copilot')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white transition"
          >
            <Bot className="w-4 h-4 text-accent-light" />
            <span>Try AI Copilot Demo</span>
          </button>
        </motion.div>

        {/* Live Stream Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 max-w-4xl mx-auto glass-panel p-3 rounded-2xl border border-white/10 bg-navy-800/80 flex flex-wrap items-center justify-around gap-4 text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400">Throughput:</span>
            <strong className="text-white">342 msgs / sec</strong>
          </div>
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-accent-light" />
            <span className="text-gray-400">Analyzed Posts:</span>
            <strong className="text-white">2,418,920 Live</strong>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-gray-400">Confidence Score:</span>
            <strong className="text-emerald-400">98.4% (RoBERTa-v4.2)</strong>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-gray-400">Connected Networks:</span>
            <strong className="text-white">6 Channels Active</strong>
          </div>
        </motion.div>

        {/* Interactive App Preview Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 relative rounded-2xl p-1 bg-gradient-to-b from-accent/40 via-white/10 to-transparent shadow-[0_0_60px_rgba(99,102,241,0.25)]"
        >
          <div className="bg-navy-950 rounded-2xl overflow-hidden border border-white/10">
            {/* Top Mock Window Bar */}
            <div className="h-10 bg-navy-900/90 border-b border-white/5 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] font-mono text-gray-500">https://socialpulse.ai/analysis/overview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent-light border border-accent/30 font-semibold">
                  LIVE TELEMETRY
                </span>
              </div>
            </div>

            {/* Simulated Live Dashboard Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
              <div className="p-4 rounded-xl bg-navy-900/80 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Analyzed Posts</span>
                <h4 className="text-2xl font-bold text-white mt-1">2.41M</h4>
                <span className="text-[11px] text-emerald-400 font-semibold">+14.8% vs last 7d</span>
              </div>
              <div className="p-4 rounded-xl bg-navy-900/80 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Net Sentiment</span>
                <h4 className="text-2xl font-bold text-emerald-400 mt-1">74.3 / 100</h4>
                <span className="text-[11px] text-emerald-400 font-semibold">62.4% Positive Bias</span>
              </div>
              <div className="p-4 rounded-xl bg-navy-900/80 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Top Velocity Topic</span>
                <h4 className="text-lg font-bold text-white mt-1 truncate">#ArtificialIntelligence</h4>
                <span className="text-[11px] text-rose-400 font-semibold">16.2K msgs / hr</span>
              </div>
              <div className="p-4 rounded-xl bg-navy-900/80 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Virality R₀</span>
                <h4 className="text-2xl font-bold text-accent-light mt-1">2.84</h4>
                <span className="text-[11px] text-gray-400">Super-spreading stage</span>
              </div>
            </div>

            {/* CTA Overlay */}
            <div className="p-6 bg-gradient-to-t from-navy-900 to-navy-950 border-t border-white/5 flex items-center justify-between">
              <div className="text-left">
                <h4 className="text-sm font-bold text-white">Access all 12 Intelligence Modules</h4>
                <p className="text-xs text-gray-400">Aspect sentiment, topological graphs, cascade flow & copilot</p>
              </div>
              <button
                onClick={() => navigate('/analysis/overview')}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-dark text-white transition shadow-glow flex items-center gap-1.5"
              >
                <span>Launch Full App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Capabilities / Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-light font-mono">
            ENGINEERING CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Commercial-Grade Intelligence Suite
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
            Engineered to process massive conversational firehoses with sub-second neural inference and granular dimensional breakdowns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: 'Aspect-Based Sentiment (ABSA)',
              desc: 'Dissect user opinions into granular product pillars (Innovation, Reliability, Pricing, Security) with 6-emotion spectrum categorization.',
              path: '/analysis/sentiment',
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
            },
            {
              icon: Network,
              title: 'Graph Topology & Centrality',
              desc: 'Unsupervised Louvain community clustering, PageRank, and Betweenness Centrality mapping identifying pivotal narrative spreaders.',
              path: '/analysis/network',
              color: 'text-indigo-400',
              bg: 'bg-indigo-500/10',
            },
            {
              icon: TrendingUp,
              title: 'Predictive Trend Radar',
              desc: 'Early warning anomaly detection algorithms tracking viral acceleration rates and lifecycle stages before mainstream explosion.',
              path: '/analysis/trends',
              color: 'text-purple-400',
              bg: 'bg-purple-500/10',
            },
            {
              icon: Workflow,
              title: 'Cascade Information Flow',
              desc: 'Trace multi-hop dissemination across platforms from seed publication to amplification hubs with speed of virality metrics.',
              path: '/analysis/flow',
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
            },
            {
              icon: Bot,
              title: 'Conversational AI Copilot',
              desc: 'Interactive intelligence assistant citing specific social posts, generating inline trend charts, and evaluating narrative shifts.',
              path: '/copilot',
              color: 'text-accent-light',
              bg: 'bg-accent/10',
            },
            {
              icon: FileText,
              title: 'Executive Dossiers & Reports',
              desc: 'Automated synthesis studio generating comprehensive PDF/Slide briefings with customizable section selections.',
              path: '/reports',
              color: 'text-rose-400',
              bg: 'bg-rose-500/10',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              onClick={() => navigate(item.path)}
              className="glass-panel p-6 border border-white/5 hover:border-accent/40 transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl ${item.bg} border border-white/5 flex items-center justify-center ${item.color} mb-5 group-hover:scale-110 transition`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent-light transition">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-semibold text-accent-light mt-4">
                <span>Explore Module</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Copilot Demo Widget on Landing Page */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="glass-panel p-8 rounded-3xl border border-accent/30 bg-gradient-to-b from-navy-800/90 to-navy-950 shadow-[0_0_50px_rgba(99,102,241,0.15)]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-light">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Interactive Copilot Sandbox</h3>
              <p className="text-xs text-gray-400">Click a preset query to test real-time narrative synthesis right here</p>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              'What caused the sudden sentiment spike on Friday afternoon?',
              'Identify the top KOLs in the sovereign compute debate.',
              'Summarize cross-platform sentiment around #ArtificialIntelligence.',
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleDemoAsk(q)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition text-left"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Response Container */}
          <div className="min-h-[120px] p-4 rounded-xl bg-navy-900 border border-white/5 flex flex-col justify-center">
            {isAnswering ? (
              <div className="flex items-center gap-3 text-xs text-accent-light font-mono">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Synthesizing intelligence across 2.4M multi-channel posts...</span>
              </div>
            ) : demoResponse ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="text-xs text-gray-400 font-mono">Query: "{demoQuery}"</div>
                <div className="text-xs text-gray-200 leading-relaxed font-sans bg-navy-950/80 p-3.5 rounded-lg border border-white/5">
                  {demoResponse}
                </div>
              </motion.div>
            ) : (
              <div className="text-xs text-gray-500 italic text-center">
                Click any prompt above to experience the AI Copilot in action.
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5 text-xs">
            <span className="text-gray-400">Want full interactive chat with charts & citations?</span>
            <button
              onClick={() => navigate('/copilot')}
              className="px-4 py-2 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition flex items-center gap-1.5 shadow-glow"
            >
              <span>Open Dedicated AI Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Platform Connectivity Section */}
      <section id="platforms" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-light font-mono">
            MULTI-CHANNEL INGESTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Ingest Conversations from Anywhere
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-gray-400 leading-relaxed">
            Native real-time decahose pipelines, webhooks, and REST streaming connectors with unified normalization.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'X / Twitter', icon: Share2, color: '#1DA1F2', status: 'Live Stream' },
            { name: 'Reddit', icon: MessageSquare, color: '#FF4500', status: 'Webhooks' },
            { name: 'Telegram', icon: Send, color: '#0088cc', status: 'Broadcast Ingest' },
            { name: 'YouTube', icon: Video, color: '#FF0000', status: 'Data API v3' },
            { name: 'Instagram', icon: Camera, color: '#E4405F', status: 'Graph API' },
            { name: 'LinkedIn', icon: Briefcase, color: '#0A66C2', status: 'Enterprise Feed' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/platforms')}
              className="glass-panel p-5 border border-white/5 hover:border-accent/40 transition cursor-pointer flex flex-col items-center text-center"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 shadow-lg"
                style={{ backgroundColor: item.color }}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-white">{item.name}</h4>
              <span className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture & Enterprise Readiness */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/10 bg-navy-800/60 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-light font-mono">
              ENTERPRISE-GRADE PLATFORM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
              Designed for Scale, Privacy & Seamless Backend Integration
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
              SocialPulse AI features a clean, asynchronous service abstraction layer. Whether running locally with simulated data or connecting to real high-throughput decahose backends, the frontend requires zero UI rewrites.
            </p>

            <div className="space-y-3 mt-6">
              {[
                'Sub-500ms neural inference and vector embedding normalization',
                'Zero real credential leak risk with decoupled service client architecture',
                'Fully responsive layout optimized for wall monitors and mobile ops',
                'Modular React 19 + Tailwind v4 + TypeScript component hierarchy',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate('/analysis/overview')}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-accent hover:bg-accent-dark text-white transition shadow-glow flex items-center gap-2"
              >
                <span>Explore Full Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-navy-950/90 border border-white/10 font-mono text-xs text-gray-300 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-accent-light font-bold">src/services/api.ts</span>
              <span className="text-[10px] text-emerald-400">Clean Abstraction</span>
            </div>
            <pre className="text-[11px] text-gray-400 leading-relaxed overflow-x-auto">
{`// 1-to-1 Backend-Ready API Interface
export const api = {
  getOverview: async () => Promise<OverviewData>,
  getSentiment: async () => Promise<SentimentData>,
  getNetworkTopology: async () => Promise<NetworkGraph>,
  getInformationFlow: async () => Promise<FlowData>,
  sendCopilotQuery: async (q) => Promise<CopilotResponse>,
};`}
            </pre>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
              <span>Latency: ~250ms simulated</span>
              <span className="text-white font-bold">Drop-in REST Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-accent/40 bg-gradient-to-r from-accent/20 via-navy-800 to-purple-900/20 shadow-[0_0_60px_rgba(99,102,241,0.25)]">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Unmask Social Narratives with Precision
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Gain immediate visibility into real-time audience shifts, viral inflection points, and key opinion leader propagation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/analysis/overview')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-accent hover:bg-accent-dark text-white transition shadow-glow flex items-center justify-center gap-2"
            >
              <span>Launch SocialPulse AI Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition"
            >
              <span>View Sample Intelligence Briefs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent-light" />
            <span className="font-bold text-white">SOCIALPULSE AI</span>
            <span>— SIH 2026</span>
          </div>
          <div>Frontend Intelligence Architecture • Built for High-Throughput Streams</div>
        </div>
      </footer>
    </div>
  );
}
