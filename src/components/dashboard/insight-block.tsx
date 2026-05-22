'use client';

import { Lightbulb } from 'lucide-react';
import { useT } from '@/lib/i18n';

interface InsightBlockProps {
  what: string;
  why: string;
  rec: string;
  accent?: string;
}

export function InsightBlock({ what, why, rec, accent = 'indigo' }: InsightBlockProps) {
  const t = useT();
  const accentMap: Record<string, { bg: string; text: string; recBg: string }> = {
    indigo: { bg: 'bg-indigo-500/5', text: 'text-indigo-600 dark:text-indigo-400', recBg: 'bg-indigo-500/10' },
    emerald: { bg: 'bg-emerald-500/5', text: 'text-emerald-600 dark:text-emerald-400', recBg: 'bg-emerald-500/10' },
    cyan: { bg: 'bg-cyan-500/5', text: 'text-cyan-600 dark:text-cyan-400', recBg: 'bg-cyan-500/10' },
    amber: { bg: 'bg-amber-500/5', text: 'text-amber-600 dark:text-amber-400', recBg: 'bg-amber-500/10' },
    purple: { bg: 'bg-purple-500/5', text: 'text-purple-600 dark:text-purple-400', recBg: 'bg-purple-500/10' },
    red: { bg: 'bg-red-500/5', text: 'text-red-600 dark:text-red-400', recBg: 'bg-red-500/10' },
  };
  const a = accentMap[accent] ?? accentMap.indigo;

  return (
    <div className={`rounded-lg ${a.bg} p-3 mt-3 space-y-2`}>
      <div className="flex items-center gap-1.5">
        <Lightbulb className={`w-3.5 h-3.5 ${a.text}`} />
        <span className={`text-xs font-semibold uppercase tracking-wide ${a.text}`}>{t('insight.label')}</span>
      </div>
      <div>
        <span className="text-xs font-medium text-[var(--dash-text-2)]">{t('insight.whatThisMeans')} </span>
        <span className="text-xs text-[var(--dash-text-3)] leading-relaxed">{what}</span>
      </div>
      <div>
        <span className="text-xs font-medium text-[var(--dash-text-2)]">{t('insight.whyItMatters')} </span>
        <span className="text-xs text-[var(--dash-text-3)] leading-relaxed">{why}</span>
      </div>
      <div className={`rounded-md ${a.recBg} px-2.5 py-1.5`}>
        <span className={`text-xs font-semibold ${a.text}`}>{t('insight.recommendation')} </span>
        <span className={`text-xs ${a.text}`}>{rec}</span>
      </div>
    </div>
  );
}
