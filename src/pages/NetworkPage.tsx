import { useEffect, useState } from 'react';
import {
  Network,
  Users,
  Activity,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { api } from '../services/api';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ExportModal } from '../components/common/ExportModal';
import { formatNumber } from '../lib/utils';
import type { NetworkNodeData, CommunityCluster } from '../services/mocks/network';

export default function NetworkPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<NetworkNodeData | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    loadNetwork();
  }, []);

  const loadNetwork = async () => {
    try {
      const res = await api.getNetworkData();
      setData(res);
      if (res.nodes && res.nodes.length > 0) {
        setSelectedNode(res.nodes[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <LoadingSkeleton rows={6} height="h-64" />;
  }

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader
        title="Link Analysis & Follower Network Topology"
        subtitle="Follower relationship graph mapping, Key Opinion Leader (KOL) discovery, and information diffusion spread modeling"
        tag="SIH COMPONENT E: LINK ANALYSIS & NETWORK TOPOLOGY"
        onRefresh={loadNetwork}
        onExport={() => setExportOpen(true)}
      />

      {/* Network stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Ingested Graph Nodes"
          value={data.stats.totalNodes}
          subtitle="842 high-centrality influencers"
          trend="up"
          icon={Users}
          accentGlow
        />
        <StatCard
          title="Graph Link Edges"
          value={formatNumber(data.stats.totalEdges)}
          subtitle="Mentions, replies, & retweets"
          trend="up"
          icon={Network}
        />
        <StatCard
          title="Community Modularity Index"
          value={data.stats.modularity}
          subtitle="4 well-separated sub-clusters"
          trend="neutral"
          icon={Layers}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Average Node Degree"
          value={data.stats.averageDegree}
          subtitle="High cross-cluster connectivity"
          trend="up"
          icon={Activity}
          iconColor="text-purple-400"
        />
      </div>

      {/* Main Interactive Graph Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: SVG Interactive Network Graph Visualization */}
        <div className="glass-panel p-5 lg:col-span-2 flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 z-10">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Social Topology Graph Map</h3>
              <p className="text-xs text-gray-400">Click any node to inspect PageRank & centrality score</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SVG Graph Viewport */}
          <div className="w-full h-96 sm:h-[420px] bg-slate-50 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
            {/* Background grid lines */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(234, 88, 12, 0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <svg
              viewBox="0 0 900 550"
              className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Edges */}
              {data.links.map((link: any, idx: number) => {
                const s = data.nodes.find((n: any) => n.id === link.source);
                const t = data.nodes.find((n: any) => n.id === link.target);
                if (!s || !t) return null;

                const isHighlighted = selectedNode && (selectedNode.id === s.id || selectedNode.id === t.id);

                return (
                  <line
                    key={idx}
                    x1={s.x}
                    y1={s.y}
                    x2={t.x}
                    y2={t.y}
                    stroke={isHighlighted ? '#ea580c' : '#cbd5e1'}
                    strokeWidth={isHighlighted ? 2.5 : 1.2}
                    strokeDasharray={link.type === 'reply' ? '4,4' : undefined}
                  />
                );
              })}

              {/* Nodes */}
              {data.nodes.map((node: NetworkNodeData) => {
                const isSelected = selectedNode?.id === node.id;
                const radius = 16 + (node.influenceScore / 100) * 14;

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-all duration-300 group"
                  >
                    {/* Outer Glow */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius + (isSelected ? 10 : 4)}
                      fill={node.communityColor}
                      opacity={isSelected ? 0.35 : 0.15}
                      className="group-hover:opacity-40"
                    />

                    {/* Node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill="#ffffff"
                      stroke={node.communityColor}
                      strokeWidth={isSelected ? 3.5 : 2}
                    />

                    {/* Inner avatar pattern or letter */}
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill="#0f172a"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {node.name.split(' ')[0][0]}
                    </text>

                    {/* Node label */}
                    <text
                      x={node.x}
                      y={node.y + radius + 14}
                      textAnchor="middle"
                      fill={isSelected ? '#ea580c' : '#475569'}
                      fontSize="10"
                      fontWeight={isSelected ? 'bold' : '500'}
                    >
                      {node.handle}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Graph Legend */}
          <div className="flex items-center gap-4 flex-wrap pt-3 border-t border-slate-200 text-[11px] text-slate-600">
            {data.communities.map((comm: CommunityCluster) => (
              <div key={comm.id} className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: comm.color }} />
                <span>{comm.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Node Detail Inspector */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          {selectedNode ? (
            <div>
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedNode.avatar}
                    alt={selectedNode.name}
                    className="w-12 h-12 rounded-full object-cover border-2 shadow-sm"
                    style={{ borderColor: selectedNode.communityColor }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{selectedNode.name}</h4>
                    <span className="text-xs font-mono font-medium text-amber-700">{selectedNode.handle}</span>
                    <p className="text-[11px] text-slate-500">{selectedNode.role}</p>
                  </div>
                </div>
              </div>

              {/* Node metrics */}
              <div className="space-y-3.5 my-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Influence Score</span>
                    <span className="font-bold text-emerald-600 font-mono text-sm">{selectedNode.influenceScore}/100</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div style={{ width: `${selectedNode.influenceScore}%` }} className="bg-emerald-500 h-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Betweenness</span>
                    <strong className="text-slate-900 font-mono text-sm">{selectedNode.betweennessCentrality}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">PageRank</span>
                    <strong className="text-slate-900 font-mono text-sm">{selectedNode.pageRank}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Followers</span>
                    <strong className="text-slate-900 font-mono text-sm">{formatNumber(selectedNode.followers)}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Amplification</span>
                    <strong className="text-amber-700 font-mono text-sm">{selectedNode.amplificationPower}x</strong>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Top Conversation Topics:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.topTopics.map((top, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {top}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">Click any node to inspect profile</div>
          )}

          <div className="pt-3 border-t border-slate-200 text-center">
            <span className="text-[11px] text-slate-500">Assigned Community: </span>
            <strong className="text-slate-900 text-xs">{selectedNode?.community}</strong>
          </div>
        </div>
      </div>

      {/* Row 3: Community Clusters Breakdown Cards */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Community Modularity Partitions</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Louvain Community Detection</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.communities.map((comm: CommunityCluster) => (
            <div
              key={comm.id}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 shadow-sm transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: comm.color }} />
                  <h4 className="text-xs font-bold text-slate-900">{comm.name}</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{comm.summary}</p>
              </div>

              <div className="space-y-1.5 pt-2.5 border-t border-slate-100 text-[11px] font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Reach:</span>
                  <span className="text-slate-900 font-semibold">{formatNumber(comm.totalReach)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Modularity:</span>
                  <span className="text-amber-700 font-semibold">{comm.modularityScore}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Sentiment:</span>
                  <span className="text-emerald-700 font-semibold">{comm.dominantSentiment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} title="Export Network Centrality Intelligence Dossier" />
    </div>
  );
}
