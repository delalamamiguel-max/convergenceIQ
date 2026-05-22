'use client';

import { useDashboardStore } from '@/lib/store';
import { useT, useTd } from '@/lib/i18n';
import { thresholdPresets } from '@/lib/data/curated-datasets';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ControlPanel() {
  const {
    activePreset, weights, thresholds,
    setActivePreset, setWeights, setThresholds,
  } = useDashboardStore();
  const t = useT();
  const td = useTd();

  const categories = [
    { key: 'ethical' as const, labelKey: 'control.categories.ethical.label', color: 'bg-emerald-500' },
    { key: 'cultural' as const, labelKey: 'control.categories.cultural.label', color: 'bg-purple-500' },
    { key: 'regulatory' as const, labelKey: 'control.categories.regulatory.label', color: 'bg-amber-500' },
    { key: 'technological' as const, labelKey: 'control.categories.technological.label', color: 'bg-blue-500' },
  ];

  return (
    <div className="rounded-xl border p-4 md:p-5 space-y-5 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
      <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-[var(--dash-text-1)]">
        <Settings2 className="w-4.5 h-4.5 text-[var(--dash-text-3)]" />
        {t('control.title')}
      </div>

      {/* Presets */}
      <div>
        <div className="text-xs text-[var(--dash-text-4)] mb-2.5 font-medium uppercase tracking-wide">{t('control.quickPresets')}</div>
        <div className="flex flex-wrap gap-2">
          {thresholdPresets.map(preset => (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset.id)}
              className={`px-3 py-2 rounded-md text-sm transition-all border focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                activePreset === preset.id
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/30'
                  : 'text-[var(--dash-text-3)] border-[var(--dash-border)] hover:border-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]'
              }`}
              title={td(preset.description)}
            >
              <span className="mr-1">{preset.icon}</span>
              {td(preset.name)}
            </button>
          ))}
        </div>
      </div>

      <Separator style={{ backgroundColor: 'var(--dash-border)' }} />

      {/* Weights */}
      <div>
        <div className="text-xs text-[var(--dash-text-4)] mb-3 font-medium uppercase tracking-wide">{t('control.signalWeights')}</div>
        <div className="space-y-4">
          {categories.map(cat => (
            <div key={cat.key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span className="text-sm text-[var(--dash-text-2)]">{t(cat.labelKey)}</span>
                </div>
                <span className="text-sm font-mono text-[var(--dash-text-4)]">
                  {(weights[cat.key] * 100).toFixed(0)}%
                </span>
              </div>
              <Slider
                value={[weights[cat.key] * 100]}
                onValueChange={(val) => { const v = Array.isArray(val) ? val[0] : val; setWeights({ ...weights, [cat.key]: v / 100 }); }}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <Separator style={{ backgroundColor: 'var(--dash-border)' }} />

      {/* Thresholds */}
      <div>
        <div className="text-xs text-[var(--dash-text-4)] mb-3 font-medium uppercase tracking-wide">{t('control.minThresholds')}</div>
        <div className="space-y-4">
          {categories.map(cat => (
            <div key={cat.key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span className="text-sm text-[var(--dash-text-2)]">{t(cat.labelKey)}</span>
                </div>
                <Badge variant="outline" className="text-xs px-2 py-0.5 border-[var(--dash-border)] text-[var(--dash-text-4)]">
                  &ge;{thresholds[cat.key]}
                </Badge>
              </div>
              <Slider
                value={[thresholds[cat.key]]}
                onValueChange={(val) => { const v = Array.isArray(val) ? val[0] : val; setThresholds({ ...thresholds, [cat.key]: v }); }}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <Separator style={{ backgroundColor: 'var(--dash-border)' }} />

      <Button
        variant="ghost"
        size="sm"
        className="w-full text-sm py-2.5 text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]"
        onClick={() => setActivePreset('balanced')}
      >
        <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
        {t('control.resetDefaults')}
      </Button>
    </div>
  );
}
