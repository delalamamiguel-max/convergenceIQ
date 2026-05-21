'use client';

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@/components/theme-provider';

interface RadarDataPoint {
  category: string;
  value: number;
  fullMark: number;
}

interface SignalRadarProps {
  data: RadarDataPoint[];
  color?: string;
}

export function SignalRadar({ data, color = '#6366f1' }: SignalRadarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tickColor = isDark ? '#9ca3af' : '#64748b';
  const gridColor = isDark ? '#374151' : '#cbd5e1';
  const radiusTickColor = isDark ? '#6b7280' : '#94a3b8';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis dataKey="category" tick={{ fill: tickColor, fontSize: 13 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: radiusTickColor, fontSize: 11 }} />
        <Radar name="Score" dataKey="value" stroke={color} fill={color} fillOpacity={0.25} strokeWidth={2} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
