import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Activity,
  ChevronRight,
  Flame,
  X,
  Layers
} from 'lucide-react';
import { indiaStateTrends, type StateTrend } from '../../mocks/indiaMapData';
// Official Survey of India boundary paths with full J&K and Ladakh (including PoK & Aksai Chin)
// @ts-ignore
import indiaSoiPaths from '../../assets/india-soi-paths.json';

interface StatePathItem {
  name: string;
  code: string;
  abbr: string;
  cx: number;
  cy: number;
  d: string;
}

const PRECOMPUTED_PATHS: StatePathItem[] = indiaSoiPaths as StatePathItem[];

const W = 480;
const H = 560;

// High activity beacon hubs with live pulse matching exact geographical urban centers
const VIRAL_HUBS = [
  { name: 'Delhi NCR', cx: 154, cy: 191, label: 'National Capital · 620K' },
  { name: 'Mumbai Metro', cx: 112, cy: 345, label: 'Mumbai Metro · 842K' },
  { name: 'Bengaluru Tech', cx: 156, cy: 436, label: 'Bengaluru Tech · 512K' },
  { name: 'Hyderabad Tech', cx: 184, cy: 370, label: 'Hyderabad Tech · 298K' },
  { name: 'Lucknow Hub', cx: 215, cy: 228, label: 'Lucknow Hub · 710K' },
  { name: 'Kolkata Hub', cx: 335, cy: 290, label: 'Kolkata East · 340K' },
];

interface IndiaMapProps {
  platform?: string;
  selectedState?: string | null;
  onSelectState?: (stateName: string) => void;
}

export default function IndiaMap({ platform = 'all', selectedState, onSelectState }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<StatePathItem | null>(null);
  const [activeState, setActiveState] = useState<StatePathItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showBeacons, setShowBeacons] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Platform multiplier for volume calculation
  const platformMultiplier = useMemo(() => {
    switch (platform) {
      case 'twitter': return 0.45;
      case 'youtube': return 0.25;
      case 'telegram': return 0.15;
      case 'reddit': return 0.12;
      case 'instagram': return 0.35;
      case 'linkedin': return 0.08;
      default: return 1.0;
    }
  }, [platform]);

  const getStateData = (code: string, name: string): StateTrend | null => {
    const raw = indiaStateTrends[code] ??
      Object.values(indiaStateTrends).find(s =>
        s.code === code ||
        s.state.toLowerCase() === name.toLowerCase() ||
        name.toLowerCase().includes(s.state.toLowerCase())
      ) ?? null;

    if (!raw) return null;
    return {
      ...raw,
      volume: Math.round(raw.volume * platformMultiplier),
    };
  };

  // Filtered states by sentiment and search query
  const filteredStates = useMemo(() => {
    return PRECOMPUTED_PATHS.filter(item => {
      const data = getStateData(item.code, item.name);
      if (sentimentFilter !== 'all' && data?.sentiment !== sentimentFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return item.name.toLowerCase().includes(q) || item.abbr.toLowerCase().includes(q);
      }
      return true;
    });
  }, [sentimentFilter, searchQuery, platformMultiplier]);

  const displayedState = activeState || hoveredState;
  const displayedData = displayedState ? getStateData(displayedState.code, displayedState.name) : null;

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(z => Math.min(z + 0.35, 3.0));
  const handleZoomOut = () => setZoomLevel(z => Math.max(z - 0.35, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSearchQuery('');
    setSentimentFilter('all');
    setActiveState(null);
  };

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const getSentimentFill = (item: StatePathItem, isHovered: boolean, isSelected: boolean) => {
    const data = getStateData(item.code, item.name);
    const isMatchingFilter = filteredStates.some(s => s.code === item.code);

    if (!isMatchingFilter) return '#f8fafc'; // Faded light slate when filtered out

    if (isSelected) return '#ea580c'; // Warm Saffron orange for selected
    if (!data) return isHovered ? '#94a3b8' : '#e2e8f0';

    if (data.sentiment === 'positive') return isHovered ? '#16a34a' : '#86efac';
    if (data.sentiment === 'negative') return isHovered ? '#dc2626' : '#fca5a5';
    return isHovered ? '#d97706' : '#fde68a';
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* ── TOP CONTROL TOOLBAR (Light Government Theme) ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gradient-to-r from-slate-50 via-white to-orange-50/40 border-b border-slate-100 z-20">
        {/* Left: Title & Badge */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-100/80 border border-orange-200 flex items-center justify-center text-xs font-bold text-orange-700 shadow-2xs">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">Geographic Intelligence</h4>
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live SOI Map
              </span>
            </div>
            <p className="text-[10px] text-slate-500 capitalize">
              {platform === 'all' ? 'All Platforms Aggregated' : `${platform} Live Streams`} · 36 States & UTs
            </p>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="relative min-w-[150px] max-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-white focus:bg-white text-slate-800 text-xs pl-8 pr-6 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Right: Sentiment Filter Pills & Zoom Actions */}
        <div className="flex items-center gap-1.5">
          {/* Sentiment Filter buttons */}
          <div className="flex items-center bg-slate-100/80 p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
            {(['all', 'positive', 'neutral', 'negative'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setSentimentFilter(filter)}
                className={`px-2 py-1 rounded-md capitalize transition ${
                  sentimentFilter === filter
                    ? filter === 'positive'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : filter === 'negative'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : filter === 'neutral'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Toggle Beacons */}
          <button
            onClick={() => setShowBeacons(!showBeacons)}
            title="Toggle Live Viral Beacons"
            className={`p-1.5 rounded-lg border text-xs transition ${
              showBeacons
                ? 'bg-orange-50 border-orange-200 text-orange-600'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-100/80 rounded-lg border border-slate-200 p-0.5">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset View"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN MAP CANVAS + INTERACTIVE OVERLAYS ── */}
      <div
        className="relative flex-1 w-full h-full min-h-[380px] overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center bg-gradient-to-br from-slate-50/80 via-sky-50/20 to-orange-50/20"
        onMouseDown={handleMouseDown}
      >
        {/* SVG Map Canvas */}
        <motion.div
          animate={{
            scale: zoomLevel,
            x: panOffset.x,
            y: panOffset.y,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full h-full flex items-center justify-center"
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full max-h-[500px] object-contain drop-shadow-sm"
          >
            <defs>
              <filter id="soi-light-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* State Boundaries */}
            {PRECOMPUTED_PATHS.map((item, idx) => {
              const isHovered = hoveredState?.code === item.code;
              const isSelected = activeState?.code === item.code || selectedState === item.name;
              const fill = getSentimentFill(item, isHovered, isSelected);

              return (
                <g key={idx} className="transition-all duration-200">
                  <path
                    d={item.d}
                    fill={fill}
                    stroke={isSelected ? '#ea580c' : isHovered ? '#0f172a' : '#ffffff'}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2.0 : 0.8}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    filter={isHovered || isSelected ? 'url(#soi-light-glow)' : undefined}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: filteredStates.some(s => s.code === item.code) ? 1 : 0.25,
                    }}
                    onMouseEnter={() => setHoveredState(item)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveState(activeState?.code === item.code ? null : item);
                      if (onSelectState) onSelectState(item.name);
                    }}
                  />

                  {/* 2-Letter State Labels */}
                  {item.cx > 20 && item.cy > 20 && item.cx < 460 && item.cy < 540 && (
                    <text
                      x={item.cx}
                      y={item.cy + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={isHovered || isSelected ? '9.5' : '7.5'}
                      fontWeight="900"
                      fill={isHovered || isSelected ? '#ffffff' : '#334155'}
                      className="pointer-events-none select-none"
                      style={{
                        textShadow: isHovered || isSelected
                          ? '0 1px 3px rgba(0,0,0,0.8)'
                          : '0 0.5px 1px rgba(255,255,255,0.9)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {item.abbr}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Pulsing Viral Radar Beacons */}
            {showBeacons && VIRAL_HUBS.map((hub, i) => (
              <g key={i} className="pointer-events-none">
                <circle cx={hub.cx} cy={hub.cy} r={9} fill="none" stroke="#ea580c" strokeWidth={1.2} opacity={0.6}>
                  <animate attributeName="r" values="3;15;22" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                  <animate attributeName="opacity" values="0.8;0.3;0" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                </circle>
                <circle cx={hub.cx} cy={hub.cy} r={3} fill="#ea580c" stroke="#ffffff" strokeWidth={1} />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* ── INTERACTIVE HOVER / SELECTED STATE FLOATING CARD (Light Theme) ── */}
        <AnimatePresence>
          {displayedState && displayedData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-3 bottom-3 w-64 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-3.5 z-30 pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">📍</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900 leading-tight">{displayedData.state}</h5>
                    <span className="text-[9px] font-mono text-slate-400">Code: {displayedData.code} · SoI Official</span>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border shadow-2xs ${
                  displayedData.sentiment === 'positive'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : displayedData.sentiment === 'negative'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {displayedData.sentiment}
                </span>
              </div>

              {/* Volume Counter Bar */}
              <div className="mt-2.5 flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium">
                  <Activity className="w-3.5 h-3.5 text-orange-500" />
                  <span>24h Post Volume</span>
                </div>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {(displayedData.volume).toLocaleString()} posts
                </span>
              </div>

              {/* Top Trending Topics in this State */}
              <div className="mt-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" /> State Trending
                  </span>
                  <span className="text-[9px] font-medium text-orange-600 bg-orange-50 px-1.5 py-0.2 rounded font-mono">
                    {platform.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1">
                  {displayedData.trending.map((tag, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-50 hover:bg-orange-50/80 border border-slate-100/80 transition-colors"
                    >
                      <span className="font-semibold text-slate-700 truncate mr-2">{tag}</span>
                      <span className="text-[9px] font-bold text-orange-500 shrink-0 font-mono">#{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  if (onSelectState) onSelectState(displayedData.state);
                }}
                className="mt-3 w-full py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl text-[11px] font-bold shadow-sm transition flex items-center justify-center gap-1"
              >
                <span>Drill Down into {displayedData.state}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Tooltip during hover on desktop */}
        {hoveredState && !activeState && tooltipPos.x > 0 && (
          <div
            className="fixed z-[99999] pointer-events-none transition-transform duration-75"
            style={{
              left: Math.min(tooltipPos.x + 14, window.innerWidth - 240),
              top: Math.max(tooltipPos.y - 80, 20),
            }}
          >
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2">
              <span className="text-xs font-bold">📍 {hoveredState.name}</span>
              <span className="text-[9px] font-mono text-slate-400 font-semibold">({hoveredState.abbr})</span>
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM STATUS BAR ── */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-50/90 border-t border-slate-100 text-[10px] text-slate-500 z-10">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <Layers className="w-3 h-3 text-orange-600" />
            36 States & UTs Complete
          </span>
          <span className="hidden sm:inline-block text-slate-300">•</span>
          <span className="hidden sm:inline-block text-slate-400 font-medium">
            Drag to pan · Scroll / Buttons to zoom · Click to inspect state
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-slate-500 font-semibold">
          <span>Survey of India (SoI) Validated</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}
