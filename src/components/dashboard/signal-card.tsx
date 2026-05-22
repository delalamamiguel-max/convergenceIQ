'use client';

import { Signal } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { useT, useTd } from '@/lib/i18n';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const categoryLabelKeys: Record<string, string> = {
  ethical: 'control.categories.ethical.label',
  cultural: 'control.categories.cultural.label',
  regulatory: 'control.categories.regulatory.label',
  technological: 'control.categories.technological.label',
};

interface SignalCardProps {
  signal: Signal;
  onClick?: (signal: Signal) => void;
}

const categoryColors: Record<string, string> = {
  ethical: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  cultural: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  regulatory: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  technological: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

function getScoreColor(value: number): string {
  if (value >= 80) return 'text-green-600 dark:text-green-400';
  if (value >= 60) return 'text-lime-600 dark:text-lime-400';
  if (value >= 40) return 'text-yellow-600 dark:text-yellow-400';
  if (value >= 20) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

function getScoreRing(value: number): string {
  if (value >= 80) return 'ring-green-500/30';
  if (value >= 60) return 'ring-lime-500/30';
  if (value >= 40) return 'ring-yellow-500/30';
  if (value >= 20) return 'ring-orange-500/30';
  return 'ring-red-500/30';
}

export function SignalCard({ signal, onClick }: SignalCardProps) {
  const t = useT();
  const td = useTd();
  const TrendIcon = signal.trend === 'up' ? TrendingUp : signal.trend === 'down' ? TrendingDown : Minus;
  const trendColor = signal.trend === 'up' ? 'text-green-600 dark:text-green-400' : signal.trend === 'down' ? 'text-red-500 dark:text-red-400' : 'text-[var(--dash-text-4)]';

  return (
    <div
      className="rounded-xl border p-4 md:p-5 hover:shadow-md transition-all cursor-pointer group"
      style={{ backgroundColor: 'var(--dash-bg-card)', borderColor: 'var(--dash-border)' }}
      onClick={() => onClick?.(signal)}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge variant="outline" className={`text-xs ${categoryColors[signal.category]}`}>
          {t(categoryLabelKeys[signal.category] ?? signal.category)}
        </Badge>
        <div className={`flex items-center gap-1.5 ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-mono">
            {signal.trendMagnitude > 0 ? '+' : ''}{signal.trendMagnitude.toFixed(1)}%
          </span>
        </div>
      </div>

      <h4 className="text-sm md:text-base font-medium text-[var(--dash-text-2)] mb-2 group-hover:text-[var(--dash-text-1)] transition-colors line-clamp-2">
        {td(signal.label)}
      </h4>

      <div className="flex items-end justify-between">
        <div>
          <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(signal.value)} ring-2 ${getScoreRing(signal.value)} rounded-lg px-2.5 py-1 inline-block`}>
            {signal.value}
          </div>
          <div className="text-xs text-[var(--dash-text-4)] mt-1.5">
            {signal.rawValue} {signal.unit}
          </div>
        </div>
        {signal.region && (
          <div className="text-xs text-[var(--dash-text-4)] text-right">
            {td(signal.region)}
            {signal.sector && <><br />{td(signal.sector)}</>}
          </div>
        )}
      </div>
    </div>
  );
}
