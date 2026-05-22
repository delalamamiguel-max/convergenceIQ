'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { scenarioVariables } from '@/lib/data/curated-datasets';
import { computeScenarioEffects } from '@/lib/scoring-engine';
import { ScenarioEffect } from '@/types/dashboard';
import { Beaker, RotateCcw, ArrowRight } from 'lucide-react';
import { InsightBlock } from './insight-block';
import { useT, useTd } from '@/lib/i18n';

const categoryBorder: Record<string, string> = {
  ethical: 'border-emerald-400/30',
  cultural: 'border-purple-400/30',
  regulatory: 'border-amber-400/30',
  technological: 'border-blue-400/30',
};

const domainColors: Record<string, string> = {
  investing: 'text-indigo-500 dark:text-indigo-400 border-indigo-400/30',
  entrepreneurship: 'text-emerald-500 dark:text-emerald-400 border-emerald-400/30',
  jobMarkets: 'text-cyan-500 dark:text-cyan-400 border-cyan-400/30',
};

export function ScenarioModeler() {
  const t = useT();
  const td = useTd();
  const [overrides, setOverrides] = useState<Record<string, number>>({});
  const [effects, setEffects] = useState<ScenarioEffect[]>([]);

  const handleChange = (varId: string, newVal: number) => {
    const updatedOverrides = { ...overrides, [varId]: newVal };
    setOverrides(updatedOverrides);

    const allEffects: ScenarioEffect[] = [];
    for (const [id, val] of Object.entries(updatedOverrides)) {
      const variable = scenarioVariables.find(v => v.id === id);
      if (variable) allEffects.push(...computeScenarioEffects(id, val, variable.currentValue));
    }
    setEffects(allEffects);
  };

  const reset = () => { setOverrides({}); setEffects([]); };

  return (
    <div className="rounded-xl border p-4 md:p-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-[var(--dash-text-1)]">
          <Beaker className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          {t('scenario.title')}
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="text-sm text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]">
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          {t('scenario.reset')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {scenarioVariables.map(variable => {
          const value = overrides[variable.id] ?? variable.currentValue;
          const changed = overrides[variable.id] !== undefined;

          return (
            <div key={variable.id} className={`p-3 rounded-lg border ${categoryBorder[variable.category]} transition-colors`} style={{ backgroundColor: 'var(--dash-bg-muted)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--dash-text-2)]">{td(variable.label)}</span>
                <span className={`text-xs font-mono ${changed ? 'text-purple-500 dark:text-purple-400' : 'text-[var(--dash-text-4)]'}`}>
                  {value}{variable.unit === '%' ? '%' : ` ${variable.unit}`}
                </span>
              </div>
              <Slider
                value={[value]}
                onValueChange={(val) => { const v = Array.isArray(val) ? val[0] : val; handleChange(variable.id, v); }}
                min={variable.min}
                max={variable.max}
                step={variable.step}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-[var(--dash-text-4)]">{variable.min}</span>
                <span className="text-xs text-[var(--dash-text-4)]">{variable.max}</span>
              </div>
            </div>
          );
        })}
      </div>

      {effects.length > 0 && (
        <div>
          <div className="text-xs text-[var(--dash-text-4)] font-medium mb-3 uppercase tracking-wide">{t('scenario.cascadeEffects')}</div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {effects.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).map((effect, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg border transition-colors" style={{ backgroundColor: 'var(--dash-bg-muted)', borderColor: 'var(--dash-border)' }}>
                <Badge variant="outline" className={`text-xs ${domainColors[effect.targetDomain]}`}>
                  {effect.targetDomain === 'investing' ? 'INV' : effect.targetDomain === 'entrepreneurship' ? 'ENT' : 'JOB'}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[var(--dash-text-2)] truncate">{td(effect.targetSector)}</div>
                  <div className="text-xs text-[var(--dash-text-4)]">{td(effect.metric)}</div>
                </div>
                <ArrowRight className="w-3 h-3 text-[var(--dash-text-4)] flex-shrink-0" />
                <div className={`text-sm font-mono font-bold ${effect.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {effect.changePercent >= 0 ? '+' : ''}{effect.changePercent.toFixed(1)}%
                </div>
                <div className="text-xs text-[var(--dash-text-4)] w-10 text-right">{(effect.confidence * 100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {effects.length === 0 && (
        <div className="text-center py-6 text-sm text-[var(--dash-text-4)]">
          {t('scenario.adjustPrompt')}
        </div>
      )}

      {effects.length > 0 && (() => {
        const positiveEffects = effects.filter(e => e.changePercent > 0);
        const negativeEffects = effects.filter(e => e.changePercent < 0);
        const biggestEffect = effects.reduce((a, b) => Math.abs(a.changePercent) > Math.abs(b.changePercent) ? a : b);
        const avgConfidence = effects.reduce((s, e) => s + e.confidence, 0) / effects.length;
        return (
          <InsightBlock
            accent="purple"
            what={t('scenario.insightWhat', {
              count: effects.length,
              positive: positiveEffects.length,
              negative: negativeEffects.length,
              sector: td(biggestEffect.targetSector),
              domain: biggestEffect.targetDomain,
              change: `${biggestEffect.changePercent >= 0 ? '+' : ''}${biggestEffect.changePercent.toFixed(1)}`,
              confidence: (avgConfidence * 100).toFixed(0),
            })}
            why={t('scenario.insightWhy')}
            rec={negativeEffects.length > positiveEffects.length
              ? t('scenario.insightRecNegative', { domain: biggestEffect.targetDomain, sector: td(biggestEffect.targetSector) })
              : t('scenario.insightRecPositive', { sector: td(biggestEffect.targetSector), domain: biggestEffect.targetDomain })}
          />
        );
      })()}
    </div>
  );
}
