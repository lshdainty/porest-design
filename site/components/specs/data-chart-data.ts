// 차트 그림의 데이터 조립 — 서버 그림(chart.tsx)과 브라우저 미리보기(data-chart-play)가 함께 쓴다(파일 읽기 · 'use client' 없음).
import type { LegendRow, Slice, TrendSeries } from './data-chart-view';
import { CATEGORIES, HAS_CHILDREN, MONTH_DAYS, MONTHLY, TREND, TREND_MONTH, TREND_YEAR } from './data-data';
import { assignChartColors, formatDay, formatWon, type ChartHue, type ChartLook } from './data-shared';

export const dayHead = (i: number) => formatDay(TREND_YEAR, TREND_MONTH, i + 1);
export const dayLabel = (i: number) => `${i + 1}일`;
// 가로축 · 툴팁 머리 — 그 달의 날마다(글)
export const DAY_LABELS = Array.from({ length: MONTH_DAYS }, (_, i) => dayLabel(i));
export const DAY_HEADS = Array.from({ length: MONTH_DAYS }, (_, i) => dayHead(i));
// 저축 — 셋째 계열(계열이 셋이면 축 하나)
export const SAVE = [0, 0, 100000, 0, 50000, 0, 0, 100000];
export const trendSeries = (n: 2 | 3, dual: boolean): TrendSeries[] => [
  { key: 'income', label: '수입', hue: 'blue', values: TREND.map((d) => d.income), axis: 'left' },
  { key: 'expense', label: '지출', hue: 'red', values: TREND.map((d) => d.expense), axis: dual ? 'right' : 'left' },
  ...(n === 3 ? [{ key: 'saving', label: '저축', hue: 'green' as ChartHue, values: SAVE, axis: 'left' as const }] : []),
];
export const monthlySeries = (n: 2 | 3, dual: boolean): TrendSeries[] => [
  { key: 'income', label: '수입', hue: 'blue', values: MONTHLY.map((m) => m.income), axis: 'left' },
  { key: 'expense', label: '지출', hue: 'red', values: MONTHLY.map((m) => m.expense), axis: dual ? 'right' : 'left' },
  ...(n === 3 ? [{ key: 'saving', label: '저축', hue: 'green' as ChartHue, values: [420000, 500000, 380000, 450000, 520000, 250000], axis: 'left' as const }] : []),
];
export const total = (s: TrendSeries) => formatWon(s.values.reduce<number>((a, v) => a + (v ?? 0), 0));
export function categoryRows(look: ChartLook): { slices: Slice[]; rows: LegendRow[]; sum: number } {
  const colored = assignChartColors(CATEGORIES, look.order);
  const sum = colored.reduce((s, x) => s + x.amount, 0);
  const slices = colored.map((c) => ({ key: c.key, label: c.label, hue: c.color, amount: c.amount }));
  return { slices, rows: slices.map((s) => ({ key: s.key, label: s.label, hue: s.hue, percent: `${Math.round((s.amount / sum) * 1000) / 10}%`, amount: formatWon(s.amount), pressable: HAS_CHILDREN.has(s.key) })), sum };
}

