'use client';

import { CorrelationEntry } from '@/types/dashboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CorrelationHeatmapProps {
  data: CorrelationEntry[];
}

function correlationBg(value: number): string {
  if (value > 0.7) return 'bg-green-500/70';
  if (value > 0.4) return 'bg-green-500/35';
  if (value > 0.1) return 'bg-green-500/15';
  if (value > -0.1) return 'bg-gray-400/15';
  if (value > -0.4) return 'bg-red-500/15';
  if (value > -0.7) return 'bg-red-500/35';
  return 'bg-red-500/70';
}

function correlationTextColor(value: number): string {
  return Math.abs(value) > 0.5 ? 'text-white dark:text-white' : 'text-gray-800 dark:text-gray-200';
}

export function CorrelationHeatmap({ data }: CorrelationHeatmapProps) {
  return (
    <div className="space-y-1.5">
      {data.map((entry, i) => (
        <Tooltip key={i}>
          <TooltipTrigger>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--dash-bg-muted)] transition-colors cursor-pointer text-left w-full">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[var(--dash-text-3)] truncate">{entry.source}</div>
                <div className="text-[10px] text-[var(--dash-text-4)]">→</div>
                <div className="text-xs text-[var(--dash-text-3)] truncate">{entry.target}</div>
              </div>
              <div className={`w-16 h-10 rounded flex items-center justify-center font-mono text-sm font-bold ${correlationBg(entry.correlation)} ${correlationTextColor(entry.correlation)}`}>
                {entry.correlation > 0 ? '+' : ''}{entry.correlation.toFixed(2)}
              </div>
              <div className="text-[10px] text-[var(--dash-text-4)] w-12 text-right flex-shrink-0">
                {entry.lag}mo lag
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-[var(--dash-bg-card-solid)] border-[var(--dash-border)] text-[var(--dash-text-1)] max-w-xs">
            <p className="font-semibold">{entry.source} → {entry.target}</p>
            <p className="text-sm text-[var(--dash-text-3)] mt-1">
              Correlation: {entry.correlation.toFixed(3)} | Lag: {entry.lag} months | Significance: {(entry.significance * 100).toFixed(0)}%
            </p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
