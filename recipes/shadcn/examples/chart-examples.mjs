/*
 * shadcn Chart 예제 — recharts 베이스. 정적 HTML preview는 inline SVG로 시각만.
 */

const FRAME = "padding:16px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default); width:480px;";

const HEADER = "display:flex; flex-direction:column; gap:4px; margin-bottom:16px;";
const TITLE = "font-size:var(--text-title-md); font-weight:600; color:var(--color-text-primary);";
const SUBTITLE = "font-size:var(--text-body-sm); color:var(--color-text-secondary);";

function barChart() {
  // 7일 데이터 (월~일), max 200
  const data = [186, 305, 237, 73, 209, 214, 156];
  const labels = ["월", "화", "수", "목", "금", "토", "일"];
  const max = 320;
  const width = 440;
  const height = 200;
  const barW = 36;
  const gap = (width - barW * 7) / 6;
  const colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-1", "chart-2"];
  const bars = data.map((v, i) => {
    const x = i * (barW + gap);
    const h = (v / max) * (height - 32);
    const y = height - 32 - h;
    return `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="var(--color-${colors[i]})" />
<text x="${x + barW / 2}" y="${height - 8}" text-anchor="middle" font-size="12" fill="var(--color-text-secondary)">${labels[i]}</text>`;
  }).join("");
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${bars}</svg>`;
}

function lineChart() {
  const data = [
    { x: 0, y: 60 }, { x: 1, y: 80 }, { x: 2, y: 95 }, { x: 3, y: 70 },
    { x: 4, y: 110 }, { x: 5, y: 130 }, { x: 6, y: 100 },
  ];
  const max = 160;
  const width = 440;
  const height = 200;
  const stepX = width / 6;
  const points = data.map((d) => `${d.x * stepX},${height - 32 - (d.y / max) * (height - 32)}`).join(" ");
  const dots = data.map((d) => `<circle cx="${d.x * stepX}" cy="${height - 32 - (d.y / max) * (height - 32)}" r="4" fill="var(--color-chart-1)" stroke="var(--color-surface-default)" stroke-width="2" />`).join("");
  const labels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월"];
  const xLabels = data.map((d, i) => `<text x="${d.x * stepX}" y="${height - 8}" text-anchor="middle" font-size="12" fill="var(--color-text-secondary)">${labels[i]}</text>`).join("");
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <polyline points="${points}" fill="none" stroke="var(--color-chart-1)" stroke-width="2" />
  ${dots}
  ${xLabels}
</svg>`;
}

export const chartExamples = [
  {
    title: "Bar chart",
    description: "막대 차트 — chart-1~5 토큰 색상으로 범주 구분.",
    jsx: `import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "월", visitors: 186 },
  { day: "화", visitors: 305 },
  ...
]

const chartConfig = {
  visitors: {
    label: "방문자",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

<ChartContainer config={chartConfig}>
  <BarChart data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="day" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
  </BarChart>
</ChartContainer>`,
    render: () => `<div style="${FRAME}">
  <div style="${HEADER}">
    <h3 style="margin:0; ${TITLE}">주간 방문자</h3>
    <p style="margin:0; ${SUBTITLE}">2026-05-04 ~ 2026-05-10</p>
  </div>
  ${barChart()}
</div>`,
  },

  {
    title: "Line chart",
    description: "선 차트 — 추세 시각화. chart-1 단일 색상.",
    jsx: `import { Line, LineChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { month: "1월", revenue: 60 },
  { month: "2월", revenue: 80 },
  ...
]

<ChartContainer config={chartConfig}>
  <LineChart data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} />
    <ChartTooltip content={<ChartTooltipContent />} />
  </LineChart>
</ChartContainer>`,
    render: () => `<div style="${FRAME}">
  <div style="${HEADER}">
    <h3 style="margin:0; ${TITLE}">월별 매출</h3>
    <p style="margin:0; ${SUBTITLE}">2026 1~7월</p>
  </div>
  ${lineChart()}
</div>`,
  },
];
