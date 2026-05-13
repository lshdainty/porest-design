/*
 * shadcn Chart 예제 — chart.md SoT 정합.
 * recharts 베이스. 정적 HTML preview는 inline SVG로 시각만(실제 동작은 React).
 * 색은 의미 기반 chart palette 10색(chart-red/orange/yellow/green/blue/indigo/
 * violet/pink/brown/gray) 직접 인용 — shadcn `chart-1`/`chart-2` 인덱스 대신.
 * 한국 도메인(HR/Desk) 시나리오 + 타이포 토큰 명시 + tabular-nums.
 */

const FRAME = "padding:var(--spacing-lg); border-radius:var(--radius-md); background:var(--color-surface-default); width:480px; box-shadow:var(--shadow-sm);";
const HEADER = "display:flex; flex-direction:column; gap:var(--spacing-xs); margin-bottom:var(--spacing-md);";
const TITLE = "font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:var(--text-title-md--font-weight); color:var(--color-text-primary);";
const SUBTITLE = "font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);";

const PALETTE_5 = ["chart-red", "chart-orange", "chart-yellow", "chart-green", "chart-blue"];
const PALETTE_7 = [...PALETTE_5, "chart-indigo", "chart-violet"];

function barChartHR() {
  const data = [42, 38, 28, 25, 18, 14, 9];
  const labels = ["디자인", "엔지니어링", "운영", "영업", "HR", "마케팅", "재무"];
  const max = 50;
  const width = 432;
  const height = 200;
  const barW = 36;
  const gap = (width - barW * 7) / 6;
  const bars = data.map((v, i) => {
    const x = i * (barW + gap);
    const h = (v / max) * (height - 32);
    const y = height - 32 - h;
    return `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="var(--color-${PALETTE_7[i]})" />
<text x="${x + barW / 2}" y="${height - 8}" text-anchor="middle" font-size="12" fill="var(--color-text-secondary)">${labels[i]}</text>
<text x="${x + barW / 2}" y="${y - 4}" text-anchor="middle" font-size="11" font-weight="500" fill="var(--color-text-primary)" style="font-variant-numeric:tabular-nums;">${v}</text>`;
  }).join("");
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${bars}</svg>`;
}

function lineChartDesk() {
  // 12개월 지출 (단위: 만원). 단일 시리즈 chart-blue.
  const data = [82, 91, 128, 105, 89, 112, 98, 134, 121, 95, 108, 142];
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const max = 160;
  const width = 432;
  const height = 200;
  const stepX = width / 11;
  const points = data.map((v, i) => `${i * stepX},${height - 32 - (v / max) * (height - 32)}`).join(" ");
  const dots = data.map((v, i) => `<circle cx="${i * stepX}" cy="${height - 32 - (v / max) * (height - 32)}" r="3" fill="var(--color-chart-blue)" stroke="var(--color-surface-default)" stroke-width="2" />`).join("");
  const xLabels = data.map((_, i) => `<text x="${i * stepX}" y="${height - 8}" text-anchor="middle" font-size="11" fill="var(--color-text-secondary)">${labels[i]}월</text>`).join("");
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <polyline points="${points}" fill="none" stroke="var(--color-chart-blue)" stroke-width="2" />
  ${dots}
  ${xLabels}
</svg>`;
}

function donutChartHR() {
  // 직급별 분포 — 6 카테고리 × percentage
  const data = [
    { label: "사원", value: 32, color: "chart-red" },
    { label: "대리", value: 24, color: "chart-orange" },
    { label: "과장", value: 18, color: "chart-yellow" },
    { label: "차장", value: 14, color: "chart-green" },
    { label: "부장", value: 8, color: "chart-blue" },
    { label: "임원", value: 4, color: "chart-indigo" },
  ];
  const cx = 100, cy = 100, r = 80, ir = 50;
  let acc = 0;
  const total = data.reduce((s, d) => s + d.value, 0);
  const arcs = data.map((d, i) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    const xi1 = cx + ir * Math.cos(end), yi1 = cy + ir * Math.sin(end);
    const xi2 = cx + ir * Math.cos(start), yi2 = cy + ir * Math.sin(start);
    return `<path d="M${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2} L${xi1} ${yi1} A${ir} ${ir} 0 ${large} 0 ${xi2} ${yi2} Z" fill="var(--color-${d.color})" />`;
  }).join("");
  const legend = data.map(d => `<div style="display:flex; align-items:center; gap:var(--spacing-xs); font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-text-secondary);">
  <span style="width:10px; height:10px; border-radius:2px; background:var(--color-${d.color});"></span>
  <span>${d.label}</span>
  <span style="margin-left:auto; font-variant-numeric:tabular-nums; color:var(--color-text-primary);">${d.value}%</span>
</div>`).join("");
  return `<div style="display:flex; gap:var(--spacing-lg); align-items:center;">
  <svg width="200" height="200" viewBox="0 0 200 200">${arcs}
    <text x="100" y="95" text-anchor="middle" font-size="11" fill="var(--color-text-tertiary)">총 인원</text>
    <text x="100" y="118" text-anchor="middle" font-size="24" font-weight="700" fill="var(--color-text-primary)" style="font-variant-numeric:tabular-nums;">125</text>
  </svg>
  <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); flex:1;">
    ${legend}
  </div>
</div>`;
}

function pieChartDesk() {
  // 가계부 카테고리 10종 — 10색 palette 전체 활용
  const data = [
    { label: "식비", value: 28, color: "chart-red" },
    { label: "주거", value: 18, color: "chart-orange" },
    { label: "교통", value: 12, color: "chart-yellow" },
    { label: "문화", value: 9, color: "chart-green" },
    { label: "의료", value: 8, color: "chart-blue" },
    { label: "저축", value: 7, color: "chart-indigo" },
    { label: "통신", value: 6, color: "chart-violet" },
    { label: "쇼핑", value: 5, color: "chart-pink" },
    { label: "교육", value: 4, color: "chart-brown" },
    { label: "기타", value: 3, color: "chart-gray" },
  ];
  const cx = 100, cy = 100, r = 90;
  let acc = 0;
  const total = data.reduce((s, d) => s + d.value, 0);
  const arcs = data.map((d) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    return `<path d="M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="var(--color-${d.color})" stroke="var(--color-surface-default)" stroke-width="2" />`;
  }).join("");
  const legend = data.map(d => `<div style="display:flex; align-items:center; gap:var(--spacing-xs); font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-text-secondary);">
  <span style="width:10px; height:10px; border-radius:2px; background:var(--color-${d.color});"></span>
  <span>${d.label}</span>
  <span style="margin-left:auto; font-variant-numeric:tabular-nums; color:var(--color-text-primary);">${d.value}%</span>
</div>`).join("");
  return `<div style="display:flex; gap:var(--spacing-lg); align-items:center;">
  <svg width="200" height="200" viewBox="0 0 200 200">${arcs}</svg>
  <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); flex:1;">
    ${legend}
  </div>
</div>`;
}

function areaChartHR() {
  // 12개월 출근율 (%) — chart-green line + 30% fill, 목표선 chart-orange dashed
  const data = [94, 92, 95, 91, 88, 90, 87, 93, 95, 96, 92, 94];
  const target = 90;
  const max = 100;
  const min = 80;
  const width = 432;
  const height = 200;
  const stepX = width / 11;
  const ny = (v) => height - 32 - ((v - min) / (max - min)) * (height - 60);
  const points = data.map((v, i) => `${i * stepX},${ny(v)}`).join(" ");
  const areaPoints = `0,${height - 32} ${points} ${width},${height - 32}`;
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const xLabels = data.map((_, i) => `<text x="${i * stepX}" y="${height - 8}" text-anchor="middle" font-size="11" fill="var(--color-text-secondary)">${labels[i]}월</text>`).join("");
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <polygon points="${areaPoints}" fill="color-mix(in srgb, var(--color-chart-green) 30%, transparent)" />
  <polyline points="${points}" fill="none" stroke="var(--color-chart-green)" stroke-width="2" />
  <line x1="0" y1="${ny(target)}" x2="${width}" y2="${ny(target)}" stroke="var(--color-chart-orange)" stroke-width="1.5" stroke-dasharray="4 4" />
  <text x="${width - 4}" y="${ny(target) - 4}" text-anchor="end" font-size="10" fill="var(--color-chart-orange)" style="font-variant-numeric:tabular-nums;">목표 ${target}%</text>
  ${xLabels}
</svg>`;
}

export const chartExamples = [
  {
    title: "BarChart — HR 부서별 인원 분포",
    description: "categorical 7색 분배(`chart-red`→`indigo`→`violet` hue 분산). label 위 `tabular-nums` 인원수 표시. ChartTooltipContent는 hover 시 floating(`shadow-md` inline).",
    jsx: `const chartData = [
  { dept: "디자인", count: 42 },
  { dept: "엔지니어링", count: 38 },
  { dept: "운영", count: 28 },
  { dept: "영업", count: 25 },
  { dept: "HR", count: 18 },
  { dept: "마케팅", count: 14 },
  { dept: "재무", count: 9 },
]

const chartConfig = {
  count: { label: "인원", theme: { light: "var(--color-chart-blue)", dark: "var(--color-chart-blue-light)" } },
} satisfies ChartConfig

<ChartContainer config={chartConfig}>
  <BarChart data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="dept" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="count" radius={4}>
      {chartData.map((_, i) => (
        <Cell key={i} fill={\`var(--color-chart-\${["red","orange","yellow","green","blue","indigo","violet"][i]})\`} />
      ))}
    </Bar>
  </BarChart>
</ChartContainer>`,
    render: () => `<div style="${FRAME}">
  <div style="${HEADER}">
    <h3 style="margin:0; ${TITLE}">부서별 인원 분포</h3>
    <p style="margin:0; ${SUBTITLE}">2026 5월 기준 · 총 174명</p>
  </div>
  ${barChartHR()}
</div>`,
  },

  {
    title: "LineChart — Desk 가계부 월별 추세",
    description: "단일 시리즈 `chart-blue`(neutral 기본 추세). 12개월 × 지출 만원 단위. ChartTooltipContent의 value는 `font-mono tabular-nums`.",
    jsx: `const chartData = [
  { month: "1월", expense: 820000 },
  { month: "2월", expense: 910000 },
  ...
]

const chartConfig = {
  expense: { label: "지출", theme: { light: "var(--color-chart-blue)", dark: "var(--color-chart-blue-light)" } },
} satisfies ChartConfig

<ChartContainer config={chartConfig}>
  <LineChart data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent formatter={(v) => \`₩\${v.toLocaleString()}\`} />} />
    <Line type="monotone" dataKey="expense" stroke="var(--color-expense)" strokeWidth={2} dot={{ r: 3 }} />
  </LineChart>
</ChartContainer>`,
    render: () => `<div style="${FRAME}">
  <div style="${HEADER}">
    <h3 style="margin:0; ${TITLE}">월별 지출 추세</h3>
    <p style="margin:0; ${SUBTITLE}">2026 1~12월 · 단위 만원</p>
  </div>
  ${lineChartDesk()}
</div>`,
  },

  {
    title: "DonutChart — HR 직급별 분포",
    description: "categorical 6색 분배 + 중앙 총 인원수(`text-display-sm` 700 + `tabular-nums`). legend는 색 dot + 라벨 + 비율 페어(WCAG 1.4.1 색+텍스트 두 단서).",
    jsx: `const chartData = [
  { rank: "사원", count: 32, fill: "var(--color-chart-red)" },
  { rank: "대리", count: 24, fill: "var(--color-chart-orange)" },
  { rank: "과장", count: 18, fill: "var(--color-chart-yellow)" },
  { rank: "차장", count: 14, fill: "var(--color-chart-green)" },
  { rank: "부장", count: 8, fill: "var(--color-chart-blue)" },
  { rank: "임원", count: 4, fill: "var(--color-chart-indigo)" },
]

<ChartContainer>
  <PieChart>
    <Pie data={chartData} dataKey="count" innerRadius={50} outerRadius={80} strokeWidth={0} />
    <ChartTooltip content={<ChartTooltipContent />} />
  </PieChart>
</ChartContainer>`,
    render: () => `<div style="${FRAME}">
  <div style="${HEADER}">
    <h3 style="margin:0; ${TITLE}">직급별 분포</h3>
    <p style="margin:0; ${SUBTITLE}">전체 직원 · 2026 5월</p>
  </div>
  ${donutChartHR()}
</div>`,
  },

  {
    title: "PieChart — Desk 가계부 카테고리별 지출 (10색 palette 전체)",
    description: "categorical **10색 분배** — chart palette 전체(red/orange/yellow/green/blue/indigo/violet/pink/brown/gray) 활용. 10개 카테고리 비율 시각화. 각 슬라이스 stroke `surface-default` 2px로 구분 + legend는 색 dot + 라벨 + 비율 페어(WCAG 1.4.1).",
    jsx: `const chartData = [
  { category: "식비", value: 28, fill: "var(--color-chart-red)" },
  { category: "주거", value: 18, fill: "var(--color-chart-orange)" },
  { category: "교통", value: 12, fill: "var(--color-chart-yellow)" },
  { category: "문화", value: 9, fill: "var(--color-chart-green)" },
  { category: "의료", value: 8, fill: "var(--color-chart-blue)" },
  { category: "저축", value: 7, fill: "var(--color-chart-indigo)" },
  { category: "통신", value: 6, fill: "var(--color-chart-violet)" },
  { category: "쇼핑", value: 5, fill: "var(--color-chart-pink)" },
  { category: "교육", value: 4, fill: "var(--color-chart-brown)" },
  { category: "기타", value: 3, fill: "var(--color-chart-gray)" },
]

<ChartContainer>
  <PieChart>
    <Pie data={chartData} dataKey="value" outerRadius={90} stroke="var(--color-surface-default)" strokeWidth={2} />
    <ChartTooltip content={<ChartTooltipContent formatter={(v) => \`\${v}%\`} />} />
  </PieChart>
</ChartContainer>`,
    render: () => `<div style="${FRAME}">
  <div style="${HEADER}">
    <h3 style="margin:0; ${TITLE}">카테고리별 지출 비율</h3>
    <p style="margin:0; ${SUBTITLE}">2026 5월 · ₩1,284,500</p>
  </div>
  ${pieChartDesk()}
</div>`,
  },

  {
    title: "AreaChart — HR 연간 출근율 + 목표선",
    description: "단일 시리즈 `chart-green` line + 30% color-mix fill(긍정/성장 톤). 목표선(`chart-orange` dashed) 동반. 색 + 라벨 두 단서.",
    jsx: `const chartData = [
  { month: "1월", rate: 94 },
  { month: "2월", rate: 92 },
  ...
]

<ChartContainer config={chartConfig}>
  <AreaChart data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <YAxis domain={[80, 100]} tickFormatter={(v) => \`\${v}%\`} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area
      type="monotone"
      dataKey="rate"
      stroke="var(--color-chart-green)"
      fill="color-mix(in srgb, var(--color-chart-green) 30%, transparent)"
      strokeWidth={2}
    />
    <ReferenceLine y={90} stroke="var(--color-chart-orange)" strokeDasharray="4 4" label="목표 90%" />
  </AreaChart>
</ChartContainer>`,
    render: () => `<div style="${FRAME}">
  <div style="${HEADER}">
    <h3 style="margin:0; ${TITLE}">연간 출근율 (목표 90%)</h3>
    <p style="margin:0; ${SUBTITLE}">2026 1~12월</p>
  </div>
  ${areaChartHR()}
</div>`,
  },
];
