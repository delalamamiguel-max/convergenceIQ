'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { CorrelationHeatmap } from '@/components/charts/correlation-heatmap';
import { ConfluenceAlerts } from './confluence-alerts';
import { ScenarioModeler } from './scenario-modeler';
import {
  correlationMatrix, conflictData, lobbyingData,
  disruptionData, culturalTrends, techAdoptionForecasts,
  jobProjections, aiDisruptionData,
} from '@/lib/data/curated-datasets';
import { computeCompositeScore } from '@/lib/scoring-engine';
import { useDashboardStore } from '@/lib/store';
import { Activity, GitBranch, Zap, TrendingUp, Rocket, Briefcase } from 'lucide-react';

export function Overview() {
  const { weights, thresholds, setActiveDomain } = useDashboardStore();

  const investingSignals = useMemo(() => [...conflictData, ...lobbyingData], []);
  const entrepreneurshipSignals = useMemo(() => [...disruptionData, ...culturalTrends, ...techAdoptionForecasts], []);
  const jobSignals = useMemo(() => [...jobProjections, ...aiDisruptionData], []);

  const investingScores = useMemo(() => computeCompositeScore(investingSignals, weights, thresholds), [investingSignals, weights, thresholds]);
  const entrepreneurshipScores = useMemo(() => computeCompositeScore(entrepreneurshipSignals, weights, thresholds), [entrepreneurshipSignals, weights, thresholds]);
  const jobScores = useMemo(() => computeCompositeScore(jobSignals, weights, thresholds), [jobSignals, weights, thresholds]);

  const domainSummaries = [
    {
      name: 'Investing',
      domain: 'investing' as const,
      icon: TrendingUp,
      color: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      barColor: 'bg-indigo-400/40',
      score: investingScores.length > 0 ? investingScores.reduce((s, c) => s + c.score, 0) / investingScores.length : 0,
      topSectors: investingScores.slice(0, 3),
      signalCount: investingSignals.length,
    },
    {
      name: 'Entrepreneurship',
      domain: 'entrepreneurship' as const,
      icon: Rocket,
      color: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      barColor: 'bg-emerald-400/40',
      score: entrepreneurshipScores.length > 0 ? entrepreneurshipScores.reduce((s, c) => s + c.score, 0) / entrepreneurshipScores.length : 0,
      topSectors: entrepreneurshipScores.slice(0, 3),
      signalCount: entrepreneurshipSignals.length,
    },
    {
      name: 'Job Markets',
      domain: 'jobMarkets' as const,
      icon: Briefcase,
      color: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      barColor: 'bg-cyan-400/40',
      score: jobScores.length > 0 ? jobScores.reduce((s, c) => s + c.score, 0) / jobScores.length : 0,
      topSectors: jobScores.slice(0, 3),
      signalCount: jobSignals.length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--dash-bg-muted)] flex items-center justify-center border border-[var(--dash-border)]">
          <Activity className="w-5 h-5 text-[var(--dash-text-3)]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--dash-text-1)]">Cross-Domain Intelligence Overview</h2>
          <p className="text-xs text-[var(--dash-text-4)]">Signal confluence · Correlation analysis · Scenario modeling</p>
        </div>
      </div>

      {/* Domain Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {domainSummaries.map(summary => {
          const Icon = summary.icon;
          return (
            <div
              key={summary.domain}
              className="rounded-xl border p-4 hover:shadow-md transition-all cursor-pointer group"
              style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}
              onClick={() => setActiveDomain(summary.domain)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg ${summary.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${summary.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--dash-text-1)] group-hover:text-[var(--dash-text-1)]">{summary.name}</h3>
                  <div className="text-[10px] text-[var(--dash-text-4)]">{summary.signalCount} active signals</div>
                </div>
                <div className={`ml-auto text-2xl font-bold ${summary.color}`}>
                  {summary.score.toFixed(0)}
                </div>
              </div>

              <div className="space-y-1.5">
                {summary.topSectors.map((sector, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-[var(--dash-text-3)] truncate mr-2">{sector.sector}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded overflow-hidden" style={{ backgroundColor: 'var(--dash-border)' }}>
                        <div className={`h-full rounded ${summary.barColor}`} style={{ width: `${sector.score}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--dash-text-4)] w-6 text-right">{sector.score.toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-[10px] text-[var(--dash-text-4)] group-hover:text-[var(--dash-text-3)]">
                Click to explore →
              </div>
            </div>
          );
        })}
      </div>

      {/* Confluence Alerts */}
      <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Signal Confluence Alerts</h3>
          <Badge variant="outline" className="text-[10px] border-amber-500/20 text-amber-600 dark:text-amber-400">Cross-Domain</Badge>
        </div>
        <ConfluenceAlerts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correlation Matrix */}
        <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            <h3 className="text-sm font-semibold text-[var(--dash-text-1)]">Cross-Signal Correlations</h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            <CorrelationHeatmap data={correlationMatrix} />
          </div>
        </div>

        {/* Scenario Modeler */}
        <ScenarioModeler />
      </div>
    </div>
  );
}
