'use client';

import { confluenceAlerts } from '@/lib/data/curated-datasets';
import { Badge } from '@/components/ui/badge';
import { useT } from '@/lib/i18n';
import { Zap, AlertTriangle, Info } from 'lucide-react';
import { InsightBlock } from './insight-block';

const severityConfig = {
  high: {
    icon: Zap,
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20',
    badge: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30',
  },
  medium: {
    icon: AlertTriangle,
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    badge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
  },
  low: {
    icon: Info,
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
    badge: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
  },
};

const domainLabels = {
  investing: 'INV',
  entrepreneurship: 'ENT',
  jobMarkets: 'JOB',
};

export function ConfluenceAlerts() {
  const t = useT();
  const highCount = confluenceAlerts.filter(a => a.severity === 'high').length;
  const mediumCount = confluenceAlerts.filter(a => a.severity === 'medium').length;
  const crossDomainCount = confluenceAlerts.filter(a => a.domains.length > 1).length;

  return (
    <div className="space-y-3">
      {confluenceAlerts.map(alert => {
        const config = severityConfig[alert.severity];
        const Icon = config.icon;

        return (
          <div key={alert.id} className={`p-4 md:p-5 rounded-xl border ${config.bg}`}>
            <div className="flex items-start gap-3">
              <Icon className={`w-5 h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0 ${config.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-sm md:text-base font-semibold text-[var(--dash-text-1)]">{alert.sector}</span>
                  <Badge variant="outline" className={`text-xs ${config.badge}`}>
                    {t('confluence.signalsBadge', { n: alert.signalCount })}
                  </Badge>
                  {alert.domains.map(d => (
                    <Badge key={d} variant="outline" className="text-xs bg-[var(--dash-bg-muted)] text-[var(--dash-text-3)] border-[var(--dash-border)]">
                      {domainLabels[d]}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-[var(--dash-text-3)] leading-relaxed">
                  {alert.description}
                </p>
                <div className="text-xs text-[var(--dash-text-4)] mt-2">{alert.region} · {alert.timestamp}</div>
              </div>
            </div>
          </div>
        );
      })}
      <InsightBlock
        accent="amber"
        what={t('confluence.insightWhat', { count: confluenceAlerts.length, high: highCount, medium: mediumCount, crossDomain: crossDomainCount })}
        why={t('confluence.insightWhy')}
        rec={highCount > 0
          ? t('confluence.insightRecHigh', { high: highCount, s: highCount > 1 ? 's' : '' })
          : t('confluence.insightRecNone')}
      />
    </div>
  );
}
