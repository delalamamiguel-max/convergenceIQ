'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { CorrelationHeatmap } from '@/components/charts/correlation-heatmap';
import { ConfluenceAlerts } from './confluence-alerts';
import { ScenarioModeler } from './scenario-modeler';
import {
  correlationMatrix, conflictData, lobbyingData,
  disruptionData, culturalTrends, techAdoptionForecasts,
  pmRolesUS, pmRolesAustin, pmRolesAustinSurrounding, pmRolesRemote,
} from '@/lib/data/curated-datasets';
import { computeCompositeScore } from '@/lib/scoring-engine';
import { useDashboardStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { Activity, GitBranch, Zap, TrendingUp, Rocket, Briefcase } from 'lucide-react';
import { InsightBlock } from './insight-block';

export function Overview() {
  const { weights, thresholds, setActiveDomain } = useDashboardStore();
  const t = useT();

  const investingSignals = useMemo(() => [...conflictData, ...lobbyingData], []);
  const entrepreneurshipSignals = useMemo(() => [...disruptionData, ...culturalTrends, ...techAdoptionForecasts], []);
  const jobSignals = useMemo(() => [...pmRolesUS, ...pmRolesAustin, ...pmRolesAustinSurrounding, ...pmRolesRemote], []);

  const investingScores = useMemo(() => computeCompositeScore(investingSignals, weights, thresholds), [investingSignals, weights, thresholds]);
  const entrepreneurshipScores = useMemo(() => computeCompositeScore(entrepreneurshipSignals, weights, thresholds), [entrepreneurshipSignals, weights, thresholds]);
  const jobScores = useMemo(() => computeCompositeScore(jobSignals, weights, thresholds), [jobSignals, weights, thresholds]);

  const avgScore = useMemo(() => {
    const all = [...investingScores, ...entrepreneurshipScores, ...jobScores];
    return all.length > 0 ? all.reduce((s, c) => s + c.score, 0) / all.length : 0;
  }, [investingScores, entrepreneurshipScores, jobScores]);

  const strongestDomain = useMemo(() => {
    const inv = investingScores.length > 0 ? investingScores.reduce((s, c) => s + c.score, 0) / investingScores.length : 0;
    const ent = entrepreneurshipScores.length > 0 ? entrepreneurshipScores.reduce((s, c) => s + c.score, 0) / entrepreneurshipScores.length : 0;
    const job = jobScores.length > 0 ? jobScores.reduce((s, c) => s + c.score, 0) / jobScores.length : 0;
    const max = Math.max(inv, ent, job);
    if (max === inv) return { nameKey: 'nav.investing', score: inv };
    if (max === ent) return { nameKey: 'nav.entrepreneurship', score: ent };
    return { nameKey: 'nav.jobMarkets', score: job };
  }, [investingScores, entrepreneurshipScores, jobScores]);

  const domainSummaries = [
    {
      nameKey: 'nav.investing',
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
      nameKey: 'nav.entrepreneurship',
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
      nameKey: 'nav.jobMarkets',
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
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[var(--dash-bg-muted)] flex items-center justify-center border border-[var(--dash-border)]">
          <Activity className="w-5 h-5 md:w-6 md:h-6 text-[var(--dash-text-3)]" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[var(--dash-text-1)]">{t('overview.title')}</h2>
          <p className="text-sm text-[var(--dash-text-4)]">{t('overview.subtitle')}</p>
        </div>
      </div>

      {/* Domain Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {domainSummaries.map(summary => {
          const Icon = summary.icon;
          return (
            <div
              key={summary.domain}
              className="rounded-xl border p-4 md:p-5 hover:shadow-md transition-all cursor-pointer group"
              style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}
              onClick={() => setActiveDomain(summary.domain)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${summary.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${summary.color}`} />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)] group-hover:text-[var(--dash-text-1)]">{t(summary.nameKey)}</h3>
                  <div className="text-xs text-[var(--dash-text-4)]">{summary.signalCount} {t('overview.activeSignals')}</div>
                </div>
                <div className={`ml-auto text-2xl md:text-3xl font-bold ${summary.color}`}>
                  {summary.score.toFixed(0)}
                </div>
              </div>

              <div className="space-y-2">
                {summary.topSectors.map((sector, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--dash-text-3)] truncate mr-2">{sector.sector}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-28 h-2 rounded overflow-hidden" style={{ backgroundColor: 'var(--dash-border)' }}>
                        <div className={`h-full rounded ${summary.barColor}`} style={{ width: `${sector.score}%` }} />
                      </div>
                      <span className="text-xs font-mono text-[var(--dash-text-4)] w-7 text-right">{sector.score.toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-xs text-[var(--dash-text-4)] group-hover:text-[var(--dash-text-3)]">
                {t('overview.clickToExplore')}
              </div>
            </div>
          );
        })}
      </div>

      <InsightBlock
        what={t('overview.insightWhat', {
          avgScore: avgScore.toFixed(0),
          totalSignals: investingSignals.length + entrepreneurshipSignals.length + jobSignals.length,
          strongestName: t(strongestDomain.nameKey),
          strongestScore: strongestDomain.score.toFixed(0),
        })}
        why={t('overview.insightWhy')}
        rec={avgScore >= 65
          ? t('overview.insightRecStrong', { strongestName: t(strongestDomain.nameKey) })
          : avgScore >= 45
          ? t('overview.insightRecMixed', { strongestName: t(strongestDomain.nameKey) })
          : t('overview.insightRecWeak')}
      />

      {/* Confluence Alerts */}
      <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('overview.confluenceAlerts')}</h3>
          <Badge variant="outline" className="text-xs border-amber-500/20 text-amber-600 dark:text-amber-400">{t('overview.crossDomain')}</Badge>
        </div>
        <ConfluenceAlerts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correlation Matrix */}
        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('overview.crossSignalCorrelations')}</h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            <CorrelationHeatmap data={correlationMatrix} />
          </div>
          <InsightBlock
            accent="purple"
            what={t('overview.correlationWhat')}
            why={t('overview.correlationWhy')}
            rec={t('overview.correlationRec')}
          />
        </div>

        {/* Scenario Modeler */}
        <ScenarioModeler />
      </div>
    </div>
  );
}
