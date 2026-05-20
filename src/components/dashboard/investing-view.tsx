'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { SignalCard } from './signal-card';
import { BarRanking } from '@/components/charts/bar-ranking';
import { SignalRadar } from '@/components/charts/signal-radar';
import { TrendLine } from '@/components/charts/trend-line';
import { conflictData, lobbyingData, sectorGrowthData } from '@/lib/data/curated-datasets';
import { useDashboardStore } from '@/lib/store';
import { computeCompositeScore } from '@/lib/scoring-engine';
import { Signal } from '@/types/dashboard';
import { PortfolioAlignment } from './portfolio-alignment';
import { TrendingUp, Shield, Landmark, BarChart3, Globe } from 'lucide-react';

export function InvestingView() {
  const { weights, thresholds } = useDashboardStore();
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const allSignals = useMemo(() => [...conflictData, ...lobbyingData], []);
  const scores = useMemo(() => computeCompositeScore(allSignals, weights, thresholds), [allSignals, weights, thresholds]);

  const sectorChartData = sectorGrowthData.sectors.map(s => ({
    name: s.name.replace('Information ', 'Info ').replace('Consumer ', 'Cons. ').replace('Communication ', 'Comm. '),
    value: s.ytd,
    color: s.ytd >= 0 ? '#22c55e' : '#ef4444',
  }));

  const radarData = [
    { category: 'Ethical', value: scores[0]?.breakdown.ethical || 50, fullMark: 100 },
    { category: 'Cultural', value: scores[0]?.breakdown.cultural || 50, fullMark: 100 },
    { category: 'Regulatory', value: scores[0]?.breakdown.regulatory || 50, fullMark: 100 },
    { category: 'Technological', value: scores[0]?.breakdown.technological || 50, fullMark: 100 },
  ];

  const histData = Array.from({ length: 24 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (23 - i));
    return {
      date: d.toISOString().split('T')[0],
      value: 4800 + i * 30 + Math.sin(i / 3) * 150 + (Math.random() - 0.5) * 100,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--dash-text-1)]">Investing Intelligence</h2>
          <p className="text-xs text-[var(--dash-text-4)]">Conflict data · Lobbying analysis · Sector growth · Regulatory shifts · Sentiment</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {scores.slice(0, 4).map((score, i) => (
          <div key={i} className="rounded-xl border p-3 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            <div className="text-[10px] text-[var(--dash-text-4)] mb-1">{score.sector}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">{score.score.toFixed(0)}</div>
              <div className="text-[10px] text-[var(--dash-text-4)]">{score.region}</div>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="h-1 flex-1 rounded bg-emerald-500/30" style={{ opacity: score.breakdown.ethical / 100 }} />
              <div className="h-1 flex-1 rounded bg-purple-500/30" style={{ opacity: score.breakdown.cultural / 100 }} />
              <div className="h-1 flex-1 rounded bg-amber-500/30" style={{ opacity: score.breakdown.regulatory / 100 }} />
              <div className="h-1 flex-1 rounded bg-blue-500/30" style={{ opacity: score.breakdown.technological / 100 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Sector Performance (YTD %)</h3>
          </div>
          <BarRanking data={sectorChartData} height={320} colorScale={false} />
        </div>

        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Multi-Factor Signal Overview</h3>
          </div>
          <SignalRadar data={radarData} color="#818cf8" />
        </div>
      </div>

      <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Market Trend (S&P 500 proxy)</h3>
          <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">FRED / Alpha Vantage</Badge>
        </div>
        <TrendLine data={histData} color="#818cf8" label="S&P 500" />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Conflict & Geopolitical Signals</h3>
          <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">ACLED</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {conflictData.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Landmark className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Lobbying & Regulatory Influence</h3>
          <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">OpenSecrets</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {lobbyingData.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
      </div>

      {/* Portfolio Alignment */}
      <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <PortfolioAlignment />
      </div>

      {selectedSignal && (
        <div className="rounded-xl border border-indigo-500/30 p-5 relative transition-colors" style={{ backgroundColor: 'var(--dash-bg-card-solid)' }}>
          <button onClick={() => setSelectedSignal(null)} className="absolute top-3 right-3 text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)] text-sm">✕</button>
          <h3 className="text-base font-semibold text-[var(--dash-text-1)] mb-2">{selectedSignal.label}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><div className="text-[var(--dash-text-4)] text-xs">Score</div><div className="text-[var(--dash-text-1)] font-bold text-lg">{selectedSignal.value}</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">Raw Value</div><div className="text-[var(--dash-text-1)] font-bold">{selectedSignal.rawValue} {selectedSignal.unit}</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">Trend</div><div className={`font-bold ${selectedSignal.trend === 'up' ? 'text-green-600 dark:text-green-400' : selectedSignal.trend === 'down' ? 'text-red-500' : 'text-[var(--dash-text-4)]'}`}>{selectedSignal.trendMagnitude > 0 ? '+' : ''}{selectedSignal.trendMagnitude}%</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">Category</div><div className="text-[var(--dash-text-1)] capitalize">{selectedSignal.category}</div></div>
          </div>
          {selectedSignal.region && <div className="mt-3 text-xs text-[var(--dash-text-4)]">Region: {selectedSignal.region} · Sector: {selectedSignal.sector || 'General'} · Source: {selectedSignal.sourceId}</div>}
        </div>
      )}
    </div>
  );
}
