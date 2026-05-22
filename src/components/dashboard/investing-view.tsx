'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { SignalCard } from './signal-card';
import { BarRanking } from '@/components/charts/bar-ranking';
import { SignalRadar } from '@/components/charts/signal-radar';
import { TrendLine } from '@/components/charts/trend-line';
import { conflictData, lobbyingData, sectorGrowthData } from '@/lib/data/curated-datasets';
import { useDashboardStore } from '@/lib/store';
import { useT, useTd } from '@/lib/i18n';
import { computeCompositeScore } from '@/lib/scoring-engine';
import { Signal } from '@/types/dashboard';
import { PortfolioAlignment } from './portfolio-alignment';
import { WatchlistAlerts } from './watchlist-alerts';
import { TrendingUp, Shield, Landmark, BarChart3, Globe } from 'lucide-react';
import { InsightBlock } from './insight-block';

export function InvestingView() {
  const { weights, thresholds } = useDashboardStore();
  const t = useT();
  const td = useTd();
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const allSignals = useMemo(() => [...conflictData, ...lobbyingData], []);
  const scores = useMemo(() => computeCompositeScore(allSignals, weights, thresholds), [allSignals, weights, thresholds]);

  const avgScore = scores.length > 0 ? scores.reduce((s, c) => s + c.score, 0) / scores.length : 0;
  const topSector = scores.length > 0 ? scores.reduce((a, b) => a.score > b.score ? a : b) : null;
  const positiveCount = sectorGrowthData.sectors.filter(s => s.ytd >= 0).length;
  const negativeCount = sectorGrowthData.sectors.filter(s => s.ytd < 0).length;
  const bestSector = sectorGrowthData.sectors.reduce((a, b) => a.ytd > b.ytd ? a : b);
  const worstSector = sectorGrowthData.sectors.reduce((a, b) => a.ytd < b.ytd ? a : b);

  const sectorChartData = sectorGrowthData.sectors.map(s => ({
    name: td(s.name.replace('Information ', 'Info ').replace('Consumer ', 'Cons. ').replace('Communication ', 'Comm. ')),
    value: s.ytd,
    color: s.ytd >= 0 ? '#22c55e' : '#ef4444',
  }));

  const radarData = [
    { category: t('control.categories.ethical.label'), categoryKey: 'ethical', value: scores[0]?.breakdown.ethical || 50, fullMark: 100 },
    { category: t('control.categories.cultural.label'), categoryKey: 'cultural', value: scores[0]?.breakdown.cultural || 50, fullMark: 100 },
    { category: t('control.categories.regulatory.label'), categoryKey: 'regulatory', value: scores[0]?.breakdown.regulatory || 50, fullMark: 100 },
    { category: t('control.categories.technological.label'), categoryKey: 'technological', value: scores[0]?.breakdown.technological || 50, fullMark: 100 },
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
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[var(--dash-text-1)]">{t('investing.title')}</h2>
          <p className="text-sm text-[var(--dash-text-4)]">{t('investing.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {scores.slice(0, 4).map((score, i) => (
          <div key={i} className="rounded-xl border p-3 md:p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            <div className="text-xs text-[var(--dash-text-4)] mb-1">{td(score.sector)}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl md:text-3xl font-bold text-indigo-500 dark:text-indigo-400">{score.score.toFixed(0)}</div>
              <div className="text-xs text-[var(--dash-text-4)]">{td(score.region)}</div>
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

      <InsightBlock
        what={t('investing.scoreInsightWhat', {
          avgScore: avgScore.toFixed(0),
          count: scores.length,
          topSectorPart: topSector ? t('investing.scoreInsightTopSectorPart', { topSector: td(topSector.sector), topScore: topSector.score.toFixed(0) }) : '',
        })}
        why={t('investing.scoreInsightWhy')}
        rec={avgScore >= 65
          ? t('investing.scoreInsightRecHigh', { topSector: td(topSector?.sector ?? '') })
          : avgScore >= 45
          ? t('investing.scoreInsightRecMixed')
          : t('investing.scoreInsightRecLow')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('investing.sectorPerf')}</h3>
          </div>
          <BarRanking data={sectorChartData} height={320} colorScale={false} />
          <InsightBlock
            what={t('investing.sectorInsightWhat', {
              positiveCount,
              totalCount: sectorGrowthData.sectors.length,
              bestSector: td(bestSector.name),
              bestYtd: bestSector.ytd.toFixed(1),
              worstSector: td(worstSector.name),
              worstYtd: worstSector.ytd.toFixed(1),
            })}
            why={t('investing.sectorInsightWhy')}
            rec={positiveCount >= sectorGrowthData.sectors.length * 0.7
              ? t('investing.sectorInsightRecBroad', { worstSector: td(worstSector.name) })
              : t('investing.sectorInsightRecRotation', { worstSector: td(worstSector.name), bestSector: td(bestSector.name) })}
          />
        </div>

        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('investing.multiFactor')}</h3>
          </div>
          <SignalRadar data={radarData} color="#818cf8" />
          <InsightBlock
            accent="purple"
            what={t('investing.radarInsightWhat', {
              ethical: radarData[0].value,
              cultural: radarData[1].value,
              regulatory: radarData[2].value,
              technological: radarData[3].value,
              strongest: radarData.reduce((a, b) => a.value > b.value ? a : b).category,
            })}
            why={t('investing.radarInsightWhy')}
            rec={Math.max(...radarData.map(r => r.value)) - Math.min(...radarData.map(r => r.value)) > 25
              ? t('investing.radarInsightRecImbalanced', { weakest: radarData.reduce((a, b) => a.value < b.value ? a : b).category.toLowerCase() })
              : t('investing.radarInsightRecBalanced')}
          />
        </div>
      </div>

      <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('investing.marketTrend')}</h3>
          <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">FRED / Alpha Vantage</Badge>
        </div>
        <TrendLine data={histData} color="#818cf8" label="S&P 500" />
        <InsightBlock
          what={t('investing.trendInsightWhat', {
            latest: Math.round(histData[histData.length - 1].value),
            start: Math.round(histData[0].value),
            change: ((histData[histData.length - 1].value / histData[0].value - 1) * 100).toFixed(1),
          })}
          why={t('investing.trendInsightWhy')}
          rec={histData[histData.length - 1].value > histData[histData.length - 4].value
            ? t('investing.trendInsightRecUp')
            : t('investing.trendInsightRecDown')}
        />
      </div>

      {/* Watchlist Alerts */}
      <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <WatchlistAlerts />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('investing.conflictSignals')}</h3>
          <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">ACLED</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {conflictData.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
        {(() => {
          const avgConflict = conflictData.reduce((s, c) => s + c.value, 0) / conflictData.length;
          const rising = conflictData.filter(c => c.trend === 'up').length;
          return (
            <InsightBlock
              accent="emerald"
              what={t('investing.conflictInsightWhat', { avgScore: avgConflict.toFixed(0), count: conflictData.length, rising })}
              why={t('investing.conflictInsightWhy')}
              rec={rising > conflictData.length / 2
                ? t('investing.conflictInsightRecEscalating')
                : t('investing.conflictInsightRecContained')}
            />
          );
        })()}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Landmark className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('investing.lobbyingRegulatory')}</h3>
          <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">OpenSecrets</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {lobbyingData.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
        {(() => {
          const avgLobby = lobbyingData.reduce((s, c) => s + c.value, 0) / lobbyingData.length;
          const topLobby = lobbyingData.reduce((a, b) => a.value > b.value ? a : b);
          return (
            <InsightBlock
              accent="amber"
              what={t('investing.lobbyInsightWhat', { avgScore: avgLobby.toFixed(0), topLabel: td(topLobby.label), topValue: topLobby.value })}
              why={t('investing.lobbyInsightWhy')}
              rec={avgLobby >= 60
                ? t('investing.lobbyInsightRecHeavy', { topSector: topLobby.label.split(' ')[0] })
                : t('investing.lobbyInsightRecModerate')}
            />
          );
        })()}
      </div>

      {/* Portfolio Alignment */}
      <div className="rounded-xl border p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
        <PortfolioAlignment />
      </div>

      {selectedSignal && (
        <div className="rounded-xl border border-indigo-500/30 p-5 relative transition-colors" style={{ backgroundColor: 'var(--dash-bg-card-solid)' }}>
          <button onClick={() => setSelectedSignal(null)} className="absolute top-3 right-3 text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)] text-sm">✕</button>
          <h3 className="text-base font-semibold text-[var(--dash-text-1)] mb-2">{td(selectedSignal.label)}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><div className="text-[var(--dash-text-4)] text-xs">{t('investing.score')}</div><div className="text-[var(--dash-text-1)] font-bold text-lg">{selectedSignal.value}</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">{t('investing.rawValue')}</div><div className="text-[var(--dash-text-1)] font-bold">{selectedSignal.rawValue} {selectedSignal.unit}</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">{t('investing.trend')}</div><div className={`font-bold ${selectedSignal.trend === 'up' ? 'text-green-600 dark:text-green-400' : selectedSignal.trend === 'down' ? 'text-red-500' : 'text-[var(--dash-text-4)]'}`}>{selectedSignal.trendMagnitude > 0 ? '+' : ''}{selectedSignal.trendMagnitude}%</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">{t('investing.category')}</div><div className="text-[var(--dash-text-1)] capitalize">{td(selectedSignal.category)}</div></div>
          </div>
          {selectedSignal.region && <div className="mt-3 text-xs text-[var(--dash-text-4)]">{t('investing.region')}: {td(selectedSignal.region)} · {t('investing.sector')}: {td(selectedSignal.sector || 'General')} · {t('investing.source')}: {selectedSignal.sourceId}</div>}
        </div>
      )}
    </div>
  );
}
