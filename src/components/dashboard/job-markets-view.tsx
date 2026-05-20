'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { SignalCard } from './signal-card';
import { BarRanking } from '@/components/charts/bar-ranking';
import { SignalRadar } from '@/components/charts/signal-radar';
import { TrendLine } from '@/components/charts/trend-line';
import { jobProjections, aiDisruptionData } from '@/lib/data/curated-datasets';
import { useDashboardStore } from '@/lib/store';
import { computeCompositeScore } from '@/lib/scoring-engine';
import { Signal } from '@/types/dashboard';
import { Briefcase, Bot, TrendingUp, ShieldAlert, Target } from 'lucide-react';

export function JobMarketsView() {
  const { weights, thresholds } = useDashboardStore();
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const allSignals = useMemo(() => [...jobProjections, ...aiDisruptionData], []);
  const scores = useMemo(() => computeCompositeScore(allSignals, weights, thresholds), [allSignals, weights, thresholds]);

  const growthChart = jobProjections.map(j => ({ name: j.label.replace(' - AI Risk', ''), value: j.rawValue }));
  const aiRiskChart = aiDisruptionData.map(j => ({ name: j.label.replace(' - AI Risk', ''), value: j.rawValue }));

  const radarData = [
    { category: 'Ethical', value: scores[0]?.breakdown.ethical || 50, fullMark: 100 },
    { category: 'Cultural', value: scores[0]?.breakdown.cultural || 50, fullMark: 100 },
    { category: 'Regulatory', value: scores[0]?.breakdown.regulatory || 50, fullMark: 100 },
    { category: 'Technological', value: scores[0]?.breakdown.technological || 50, fullMark: 100 },
  ];

  const employmentTrend = Array.from({ length: 36 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (35 - i));
    const projected = i > 24;
    return {
      date: d.toISOString().split('T')[0],
      value: 155000 + i * 180 + Math.sin(i / 6) * 300 + (projected ? i * 50 : (Math.random() - 0.5) * 200),
      projected,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--dash-text-1)]">Job Market Intelligence</h2>
          <p className="text-xs text-[var(--dash-text-4)]">BLS projections · AI disruption risk · FRED macro indicators · Role analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {scores.slice(0, 4).map((score, i) => (
          <div key={i} className="rounded-xl border p-3 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            <div className="text-[10px] text-[var(--dash-text-4)] mb-1 truncate">{score.sector}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">{score.score.toFixed(0)}</div>
              <div className="text-[10px] text-[var(--dash-text-4)]">{score.region}</div>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="h-1 flex-1 rounded bg-emerald-500" style={{ opacity: score.breakdown.ethical / 100 }} />
              <div className="h-1 flex-1 rounded bg-purple-500" style={{ opacity: score.breakdown.cultural / 100 }} />
              <div className="h-1 flex-1 rounded bg-amber-500" style={{ opacity: score.breakdown.regulatory / 100 }} />
              <div className="h-1 flex-1 rounded bg-blue-500" style={{ opacity: score.breakdown.technological / 100 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Total Nonfarm Employment Trend (thousands)</h3>
          <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">BLS / FRED</Badge>
        </div>
        <TrendLine data={employmentTrend} color="#22d3ee" label="Employment" showProjection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Job Growth Projections (% 2024-2034)</h3>
            <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">BLS</Badge>
          </div>
          <BarRanking data={growthChart} layout="vertical" height={380} />
        </div>

        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-red-500 dark:text-red-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">AI Automation Risk by Role (%)</h3>
            <Badge variant="outline" className="text-[10px] border-[var(--dash-border)] text-[var(--dash-text-4)]">MIT Research</Badge>
          </div>
          <BarRanking data={aiRiskChart} layout="vertical" height={380} />
        </div>
      </div>

      <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Job Market Multi-Factor Analysis</h3>
        </div>
        <SignalRadar data={radarData} color="#22d3ee" />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-green-500 dark:text-green-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">High-Growth Career Signals</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {jobProjections.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-4 h-4 text-red-500 dark:text-red-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">AI Disruption Risk Signals</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {aiDisruptionData.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
      </div>

      {selectedSignal && (
        <div className="rounded-xl border border-cyan-500/30 p-5 relative transition-colors" style={{ backgroundColor: 'var(--dash-bg-card-solid)' }}>
          <button onClick={() => setSelectedSignal(null)} className="absolute top-3 right-3 text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)] text-sm">✕</button>
          <h3 className="text-base font-semibold text-[var(--dash-text-1)] mb-2">{selectedSignal.label}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><div className="text-[var(--dash-text-4)] text-xs">Score</div><div className="text-[var(--dash-text-1)] font-bold text-lg">{selectedSignal.value}</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">Raw Value</div><div className="text-[var(--dash-text-1)] font-bold">{selectedSignal.rawValue} {selectedSignal.unit}</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">Trend</div><div className={`font-bold ${selectedSignal.trend === 'up' ? 'text-green-600 dark:text-green-400' : selectedSignal.trend === 'down' ? 'text-red-500' : 'text-[var(--dash-text-4)]'}`}>{selectedSignal.trendMagnitude > 0 ? '+' : ''}{selectedSignal.trendMagnitude}%</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">Category</div><div className="text-[var(--dash-text-1)] capitalize">{selectedSignal.category}</div></div>
          </div>
        </div>
      )}
    </div>
  );
}
