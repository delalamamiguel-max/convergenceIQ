'use client';

import { useDashboardStore } from '@/lib/store';
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

  const categories = [
    { key: 'ethical' as const, label: 'Ethical', color: 'bg-emerald-500', description: 'Conflict, corruption, ESG' },
    { key: 'cultural' as const, label: 'Cultural', color: 'bg-purple-500', description: 'Trends, sentiment, social' },
    { key: 'regulatory' as const, label: 'Regulatory', color: 'bg-amber-500', description: 'SEC, lobbying, compliance' },
    { key: 'technological' as const, label: 'Tech', color: 'bg-blue-500', description: 'AI, disruption, adoption' },
  ];

  return (
    <div className="rounded-xl border p-4 space-y-4 transition-colors" style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}>
      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dash-text-1)]">
        <Settings2 className="w-4 h-4 text-[var(--dash-text-3)]" />
        Control Panel
      </div>

      {/* Presets */}
      <div>
        <div className="text-[10px] text-[var(--dash-text-4)] mb-2 font-medium uppercase tracking-wide">Quick Presets</div>
        <div className="flex flex-wrap gap-1.5">
          {thresholdPresets.map(preset => (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset.id)}
              className={`px-2.5 py-1.5 rounded-md text-xs transition-all border focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                activePreset === preset.id
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/30'
                  : 'text-[var(--dash-text-3)] border-[var(--dash-border)] hover:border-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]'
              }`}
              title={preset.description}
            >
              <span className="mr-1">{preset.icon}</span>
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <Separator style={{ backgroundColor: 'var(--dash-border)' }} />

      {/* Weights */}
      <div>
        <div className="text-[10px] text-[var(--dash-text-4)] mb-3 font-medium uppercase tracking-wide">Signal Weights</div>
        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat.key}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                  <span className="text-xs text-[var(--dash-text-2)]">{cat.label}</span>
                </div>
                <span className="text-xs font-mono text-[var(--dash-text-4)]">
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
        <div className="text-[10px] text-[var(--dash-text-4)] mb-3 font-medium uppercase tracking-wide">Minimum Thresholds</div>
        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat.key}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                  <span className="text-xs text-[var(--dash-text-2)]">{cat.label}</span>
                </div>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-[var(--dash-border)] text-[var(--dash-text-4)]">
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
        className="w-full text-xs text-[var(--dash-text-4)] hover:text-[var(--dash-text-2)]"
        onClick={() => setActivePreset('balanced')}
      >
        <RotateCcw className="w-3 h-3 mr-1" />
        Reset to Defaults
      </Button>
    </div>
  );
}
