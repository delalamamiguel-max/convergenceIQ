'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { SignalCard } from './signal-card';
import { BarRanking } from '@/components/charts/bar-ranking';
import { SignalRadar } from '@/components/charts/signal-radar';
import { corruptionIndex, disruptionData, culturalTrends, techAdoptionForecasts } from '@/lib/data/curated-datasets';
import { useDashboardStore } from '@/lib/store';
import { computeCompositeScore } from '@/lib/scoring-engine';
import { Signal } from '@/types/dashboard';
import { Rocket, Globe2, Cpu, Users, Lightbulb } from 'lucide-react';

export function EntrepreneurshipView() {
  const { weights, thresholds } = useDashboardStore();
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const allSignals = useMemo(() => [...corruptionIndex, ...disruptionData, ...culturalTrends, ...techAdoptionForecasts], []);
  const scores = useMemo(() => computeCompositeScore(allSignals, weights, thresholds), [allSignals, weights, thresholds]);

  const disruptionChart = disruptionData.map(d => ({
    name: d.label.replace(' Funding', '').replace(' Disruption Index', '').replace(' Innovation', '').replace(' Market Growth', '').replace(' Ventures', ''),
    value: d.value,
  }));

  const cpiChart = corruptionIndex.map(d => ({ name: d.label.replace(' CPI Score', ''), value: d.value }));

  const techChart = techAdoptionForecasts.map(d => ({
    name: d.label.replace(' Enterprise ', ' ').replace(' Adoption', '').replace(' Maturity', '').replace(' Readiness', '').replace(' Deployment', ''),
    value: d.value,
  }));

  const radarData = [
    { category: 'Ethical', value: scores[0]?.breakdown.ethical || 50, fullMark: 100 },
    { category: 'Cultural', value: scores[0]?.breakdown.cultural || 50, fullMark: 100 },
    { category: 'Regulatory', value: scores[0]?.breakdown.regulatory || 50, fullMark: 100 },
    { category: 'Technological', value: scores[0]?.breakdown.technological || 50, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Rocket className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[var(--dash-text-1)]">Entrepreneurship Intelligence</h2>
          <p className="text-sm text-[var(--dash-text-4)]">Disruption reports · Corruption index · Cultural trends · Tech adoption forecasts</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {scores.slice(0, 4).map((score, i) => (
          <div key={i} className="rounded-xl border p-3 md:p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            <div className="text-xs text-[var(--dash-text-4)] mb-1 truncate">{score.sector}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl md:text-3xl font-bold text-emerald-500 dark:text-emerald-400">{score.score.toFixed(0)}</div>
              <div className="text-xs text-[var(--dash-text-4)]">{score.region}</div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Startup Disruption Index</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">Crunchbase Open</Badge>
          </div>
          <BarRanking data={disruptionChart} layout="vertical" height={280} />
        </div>

        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Multi-Factor Signal Overview</h3>
          </div>
          <SignalRadar data={radarData} color="#34d399" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Corruption Perception Index</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">Transparency Intl</Badge>
          </div>
          <BarRanking data={cpiChart} layout="vertical" height={300} />
        </div>

        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Technology Adoption Forecasts</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">Industry Data</Badge>
          </div>
          <BarRanking data={techChart} layout="vertical" height={300} />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Cultural & Social Trends</h3>
          <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">Pew Research</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {culturalTrends.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">Technology Adoption Signals</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {techAdoptionForecasts.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
      </div>

      {selectedSignal && (
        <div className="rounded-xl border border-emerald-500/30 p-5 relative transition-colors" style={{ backgroundColor: 'var(--dash-bg-card-solid)' }}>
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
