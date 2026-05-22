'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { SignalCard } from './signal-card';
import { BarRanking } from '@/components/charts/bar-ranking';
import { SignalRadar } from '@/components/charts/signal-radar';
import { corruptionIndex, disruptionData, culturalTrends, techAdoptionForecasts } from '@/lib/data/curated-datasets';
import { useDashboardStore } from '@/lib/store';
import { useT, useTd } from '@/lib/i18n';
import { computeCompositeScore } from '@/lib/scoring-engine';
import { Signal } from '@/types/dashboard';
import { Rocket, Globe2, Cpu, Users, Lightbulb } from 'lucide-react';
import { InsightBlock } from './insight-block';

export function EntrepreneurshipView() {
  const { weights, thresholds } = useDashboardStore();
  const t = useT();
  const td = useTd();
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const allSignals = useMemo(() => [...corruptionIndex, ...disruptionData, ...culturalTrends, ...techAdoptionForecasts], []);
  const scores = useMemo(() => computeCompositeScore(allSignals, weights, thresholds), [allSignals, weights, thresholds]);

  const avgScore = scores.length > 0 ? scores.reduce((s, c) => s + c.score, 0) / scores.length : 0;
  const topDisruption = disruptionData.reduce((a, b) => a.value > b.value ? a : b);
  const topCpi = corruptionIndex.reduce((a, b) => a.value > b.value ? a : b);
  const lowCpi = corruptionIndex.reduce((a, b) => a.value < b.value ? a : b);
  const topTech = techAdoptionForecasts.reduce((a, b) => a.value > b.value ? a : b);

  const disruptionChart = disruptionData.map(d => ({
    name: td(d.label).replace(' Funding', '').replace(' Disruption Index', '').replace(' Innovation', '').replace(' Market Growth', '').replace(' Ventures', '')
      .replace(' de Startups IA/ML', '').replace('Financiamiento en Tecnología Climática', 'Tech Climática').replace('Índice de Disrupción FinTech', 'FinTech').replace('Innovación HealthTech', 'HealthTech').replace('Crecimiento del Mercado EdTech', 'EdTech').replace('Emprendimientos SpaceTech', 'SpaceTech').replace('Financiamiento Web3/Blockchain', 'Web3/Blockchain').replace('Financiamiento de Startups IA/ML', 'IA/ML'),
    value: d.value,
  }));

  const cpiChart = corruptionIndex.map(d => ({ name: td(d.label).replace(' CPI Score', '').replace('Puntuación CPI de ', ''), value: d.value }));

  const techChart = techAdoptionForecasts.map(d => ({
    name: td(d.label).replace(' Enterprise ', ' ').replace(' Adoption', '').replace(' Maturity', '').replace(' Readiness', '').replace(' Deployment', '')
      .replace('Adopción Empresarial de ', '').replace('Madurez del ', '').replace('Preparación para ', '').replace('Adopción de Seguridad ', '').replace('Despliegue de ', '').replace('Adopción de ', ''),
    value: d.value,
  }));

  const radarData = [
    { category: t('control.categories.ethical.label'), value: scores[0]?.breakdown.ethical || 50, fullMark: 100 },
    { category: t('control.categories.cultural.label'), value: scores[0]?.breakdown.cultural || 50, fullMark: 100 },
    { category: t('control.categories.regulatory.label'), value: scores[0]?.breakdown.regulatory || 50, fullMark: 100 },
    { category: t('control.categories.technological.label'), value: scores[0]?.breakdown.technological || 50, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Rocket className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[var(--dash-text-1)]">{t('entrepreneurship.title')}</h2>
          <p className="text-sm text-[var(--dash-text-4)]">{t('entrepreneurship.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {scores.slice(0, 4).map((score, i) => (
          <div key={i} className="rounded-xl border p-3 md:p-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
            <div className="text-xs text-[var(--dash-text-4)] mb-1 truncate">{td(score.sector)}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl md:text-3xl font-bold text-emerald-500 dark:text-emerald-400">{score.score.toFixed(0)}</div>
              <div className="text-xs text-[var(--dash-text-4)]">{td(score.region)}</div>
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

      <InsightBlock
        accent="emerald"
        what={t('entrepreneurship.scoreInsightWhat', { avgScore: avgScore.toFixed(0), count: scores.length })}
        why={t('entrepreneurship.scoreInsightWhy')}
        rec={avgScore >= 65
          ? t('entrepreneurship.scoreInsightRecStrong')
          : avgScore >= 45
          ? t('entrepreneurship.scoreInsightRecMixed')
          : t('entrepreneurship.scoreInsightRecChallenging')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('entrepreneurship.disruptionIndex')}</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">{t('entrepreneurship.crunchbaseOpen')}</Badge>
          </div>
          <BarRanking data={disruptionChart} layout="vertical" height={280} />
          <InsightBlock
            accent="emerald"
            what={t('entrepreneurship.disruptionInsightWhat', {
              topSector: td(topDisruption.label).replace(' Funding', '').replace(' Disruption Index', '').replace(' Innovation', '').replace(' Market Growth', '').replace(' Ventures', '').replace('Financiamiento de Startups IA/ML', 'IA/ML').replace('Financiamiento en Tecnología Climática', 'Tech Climática').replace('Índice de Disrupción FinTech', 'FinTech').replace('Innovación HealthTech', 'HealthTech').replace('Crecimiento del Mercado EdTech', 'EdTech').replace('Emprendimientos SpaceTech', 'SpaceTech').replace('Financiamiento Web3/Blockchain', 'Web3/Blockchain'),
              topValue: topDisruption.value,
            })}
            why={t('entrepreneurship.disruptionInsightWhy')}
            rec={t('entrepreneurship.disruptionInsightRec', {
              topSector: td(topDisruption.label).replace(' Funding', '').replace(' Disruption Index', '').replace('Financiamiento de Startups IA/ML', 'IA/ML').replace('Índice de Disrupción FinTech', 'FinTech'),
            })}
          />
        </div>

        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('entrepreneurship.multiFactor')}</h3>
          </div>
          <SignalRadar data={radarData} color="#34d399" />
          <InsightBlock
            accent="purple"
            what={t('entrepreneurship.radarInsightWhat', {
              strongest: radarData.reduce((a, b) => a.value > b.value ? a : b).category,
              strongestVal: radarData.reduce((a, b) => a.value > b.value ? a : b).value,
              weakest: radarData.reduce((a, b) => a.value < b.value ? a : b).category,
              weakestVal: radarData.reduce((a, b) => a.value < b.value ? a : b).value,
            })}
            why={t('entrepreneurship.radarInsightWhy')}
            rec={t('entrepreneurship.radarInsightRec', {
              strongest: radarData.reduce((a, b) => a.value > b.value ? a : b).category.toLowerCase(),
              weakest: radarData.reduce((a, b) => a.value < b.value ? a : b).category.toLowerCase(),
            })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('entrepreneurship.corruptionIndex')}</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">{t('entrepreneurship.transparencyIntl')}</Badge>
          </div>
          <BarRanking data={cpiChart} layout="vertical" height={300} />
          <InsightBlock
            accent="amber"
            what={t('entrepreneurship.cpiInsightWhat', {
              topCpi: td(topCpi.label).replace(' CPI Score', '').replace('Puntuación CPI de ', ''),
              topVal: topCpi.value,
              lowCpi: td(lowCpi.label).replace(' CPI Score', '').replace('Puntuación CPI de ', ''),
              lowVal: lowCpi.value,
            })}
            why={t('entrepreneurship.cpiInsightWhy')}
            rec={t('entrepreneurship.cpiInsightRec', { lowCpi: td(lowCpi.label).replace(' CPI Score', '').replace('Puntuación CPI de ', '') })}
          />
        </div>

        <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('entrepreneurship.techAdoption')}</h3>
            <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">{t('entrepreneurship.industryData')}</Badge>
          </div>
          <BarRanking data={techChart} layout="vertical" height={300} />
          <InsightBlock
            accent="cyan"
            what={t('entrepreneurship.techInsightWhat', {
              topTech: td(topTech.label).replace(' Enterprise ', ' ').replace(' Adoption', '').replace(' Maturity', '').replace(' Readiness', '').replace(' Deployment', '').replace('Adopción Empresarial de ', '').replace('Madurez del ', '').replace('Preparación para ', '').replace('Adopción de Seguridad ', '').replace('Despliegue de ', '').replace('Adopción de ', ''),
              topVal: topTech.value,
            })}
            why={t('entrepreneurship.techInsightWhy')}
            rec={t('entrepreneurship.techInsightRec', {
              topTech: td(topTech.label).replace(' Enterprise ', ' ').replace(' Adoption', '').replace(' Maturity', '').replace('Adopción Empresarial de ', '').replace('Madurez del ', ''),
            })}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('entrepreneurship.culturalTrends')}</h3>
          <Badge variant="outline" className="text-xs border-[var(--dash-border)] text-[var(--dash-text-4)]">{t('entrepreneurship.pewResearch')}</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {culturalTrends.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
        {(() => {
          const risingTrends = culturalTrends.filter(s => s.trend === 'up');
          return (
            <InsightBlock
              accent="purple"
              what={t('entrepreneurship.culturalInsightWhat', { rising: risingTrends.length, total: culturalTrends.length })}
              why={t('entrepreneurship.culturalInsightWhy')}
              rec={risingTrends.length > culturalTrends.length / 2
                ? t('entrepreneurship.culturalInsightRecTailwinds')
                : t('entrepreneurship.culturalInsightRecHeadwinds')}
            />
          );
        })()}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h3 className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{t('entrepreneurship.techSignals')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {techAdoptionForecasts.map(signal => <SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />)}
        </div>
        {(() => {
          const highAdoption = techAdoptionForecasts.filter(s => s.value >= 70);
          return (
            <InsightBlock
              accent="cyan"
              what={t('entrepreneurship.techSignalsInsightWhat', { highAdoption: highAdoption.length })}
              why={t('entrepreneurship.techSignalsInsightWhy')}
              rec={highAdoption.length > 0
                ? t('entrepreneurship.techSignalsInsightRecHigh', { count: highAdoption.length })
                : t('entrepreneurship.techSignalsInsightRecLow')}
            />
          );
        })()}
      </div>

      {selectedSignal && (
        <div className="rounded-xl border border-emerald-500/30 p-5 relative transition-colors" style={{ backgroundColor: 'var(--dash-bg-card-solid)' }}>
          <button onClick={() => setSelectedSignal(null)} className="absolute top-3 right-3 text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)] text-sm">✕</button>
          <h3 className="text-base font-semibold text-[var(--dash-text-1)] mb-2">{td(selectedSignal.label)}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><div className="text-[var(--dash-text-4)] text-xs">{t('investing.score')}</div><div className="text-[var(--dash-text-1)] font-bold text-lg">{selectedSignal.value}</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">{t('investing.rawValue')}</div><div className="text-[var(--dash-text-1)] font-bold">{selectedSignal.rawValue} {selectedSignal.unit}</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">{t('investing.trend')}</div><div className={`font-bold ${selectedSignal.trend === 'up' ? 'text-green-600 dark:text-green-400' : selectedSignal.trend === 'down' ? 'text-red-500' : 'text-[var(--dash-text-4)]'}`}>{selectedSignal.trendMagnitude > 0 ? '+' : ''}{selectedSignal.trendMagnitude}%</div></div>
            <div><div className="text-[var(--dash-text-4)] text-xs">{t('investing.category')}</div><div className="text-[var(--dash-text-1)] capitalize">{td(selectedSignal.category)}</div></div>
          </div>
        </div>
      )}
    </div>
  );
}
