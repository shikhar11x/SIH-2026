import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  User,
  Send,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { api } from '../services/api';
import { PlatformBadge } from '../components/common/PlatformBadge';
import {
  INITIAL_COPILOT_MESSAGES,
  COPILOT_PRESETS,
  type CopilotMessage,
} from '../services/mocks/copilot';

export default function CopilotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<CopilotMessage[]>(INITIAL_COPILOT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const response = await api.sendCopilotQuery(query);
      setMessages((prev) => [...prev, response]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: { label: string; actionType: string; target: string }) => {
    if (action.actionType === 'navigate') {
      navigate(action.target);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] pb-2 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-700">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Bharat Social Intelligence AI Copilot</h2>
              <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Context: 2.4M Posts Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Conversational intelligence engine with continuous multi-platform narrative citations
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Scroll Container */}
      <div className="flex-1 glass-panel p-4 lg:p-6 overflow-y-auto space-y-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <AnimatePresence>
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3.5 ${isAssistant ? '' : 'flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-sm ${
                    isAssistant
                      ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble Content */}
                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                    isAssistant
                      ? 'bg-slate-50 border border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-orange-600 text-white font-medium shadow-sm'
                  }`}
                >
                  {/* Text */}
                  <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                  {/* Inline Chart Insight if present */}
                  {msg.chartInsight && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 my-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider font-mono">
                          {msg.chartInsight.title}
                        </span>
                      </div>
                      <div className="h-36">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={msg.chartInsight.data}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} domain={[40, 100]} tickLine={false} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                              formatter={(val: any) => [`${val}%`, 'Sentiment']}
                            />
                            <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Citations from social feeds */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider block">
                        Verified Social Citations:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.citations.map((cite, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-orange-700">{cite.author}</span>
                              <PlatformBadge platform={cite.platform} size="sm" showLabel={false} />
                            </div>
                            <p className="text-[11px] text-slate-600 italic">"{cite.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(action)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-[11px] font-semibold transition"
                        >
                          <span>{action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-700">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                <span>Synthesizing multi-platform intelligence...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Presets Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-shrink-0">
        <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1 flex-shrink-0 font-semibold">
          <Sparkles className="w-3 h-3 text-orange-600" /> Try asking:
        </span>
        {COPILOT_PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(preset)}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] text-slate-700 hover:text-slate-900 whitespace-nowrap transition flex-shrink-0"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Bottom Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 p-1.5 glass-panel bg-white border border-slate-200 rounded-2xl flex-shrink-0 shadow-sm"
      >
        <input
          type="text"
          placeholder="Ask AI Copilot to analyze narratives, compute risks, or compare communities..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-transparent px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
