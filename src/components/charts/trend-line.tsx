'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useTheme } from '@/components/theme-provider';

interface TrendLineProps {
  data: Array<{ date: string; value: number; projected?: boolean }>;
  color?: string;
  label?: string;
  showProjection?: boolean;
  height?: number;
}

export function TrendLine({ data, color = '#6366f1', label = 'Value', showProjection = false, height = 250 }: TrendLineProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tickColor = isDark ? '#9ca3af' : '#64748b';
  const gridColor = isDark ? '#1f2937' : '#e2e8f0';
  const tooltipBg = isDark ? '#111827' : '#ffffff';
  const tooltipBorder = isDark ? '#374151' : '#e2e8f0';
  const tooltipText = isDark ? '#e5e7eb' : '#1e293b';

  const actual = data.filter(d => !d.projected);
  const projected = showProjection ? data.filter(d => d.projected) : [];
  const lastActual = actual[actual.length - 1];
  const combined = showProjection && lastActual ? [...actual, ...projected] : actual;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={combined} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="date"
          tick={{ fill: tickColor, fontSize: 11 }}
          tickFormatter={(v) => {
            const d = new Date(v);
            return `${d.toLocaleString('en', { month: 'short' })} ${d.getFullYear().toString().slice(2)}`;
          }}
          interval="preserveStartEnd"
        />
        <YAxis tick={{ fill: tickColor, fontSize: 11 }} width={60} />
        <Tooltip
          contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }}
          labelStyle={{ color: tooltipText }}
          itemStyle={{ color: tooltipText }}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} name={label} />
        {showProjection && lastActual && (
          <ReferenceLine
            x={lastActual.date}
            stroke={isDark ? '#6b7280' : '#94a3b8'}
            strokeDasharray="3 3"
            label={{ value: 'Now', fill: tickColor, fontSize: 11 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
