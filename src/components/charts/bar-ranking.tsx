'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@/components/theme-provider';

interface BarRankingProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
  layout?: 'horizontal' | 'vertical';
  colorScale?: boolean;
}

function getColor(value: number): string {
  if (value >= 80) return '#22c55e';
  if (value >= 60) return '#84cc16';
  if (value >= 40) return '#eab308';
  if (value >= 20) return '#f97316';
  return '#ef4444';
}

export function BarRanking({ data, height = 300, layout = 'horizontal', colorScale = true }: BarRankingProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tickColor = isDark ? '#9ca3af' : '#64748b';
  const gridColor = isDark ? '#1f2937' : '#e2e8f0';
  const tooltipBg = isDark ? '#111827' : '#ffffff';
  const tooltipBorder = isDark ? '#374151' : '#e2e8f0';
  const tooltipText = isDark ? '#e5e7eb' : '#1e293b';

  const sorted = [...data].sort((a, b) => b.value - a.value);

  if (layout === 'vertical') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={sorted} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis type="number" tick={{ fill: tickColor, fontSize: 11 }} />
          <YAxis dataKey="name" type="category" tick={{ fill: tickColor, fontSize: 11 }} width={95} />
          <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }} labelStyle={{ color: tooltipText }} itemStyle={{ color: tooltipText }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {sorted.map((entry, index) => (
              <Cell key={index} fill={colorScale ? getColor(entry.value) : (entry.color || '#6366f1')} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={sorted} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 10 }} angle={-35} textAnchor="end" height={70} />
        <YAxis tick={{ fill: tickColor, fontSize: 11 }} />
        <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }} labelStyle={{ color: tooltipText }} itemStyle={{ color: tooltipText }} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {sorted.map((entry, index) => (
            <Cell key={index} fill={colorScale ? getColor(entry.value) : (entry.color || '#6366f1')} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
