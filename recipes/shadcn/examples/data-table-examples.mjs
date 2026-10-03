/*
 * shadcn DataTable 예제 — TanStack Table + Table 조립. 별도 컴포넌트 없음.
 */

const CARD = "border:1px solid var(--color-border-default); border-radius:var(--radius-md); overflow:hidden; background:var(--color-surface-default);";

const HEADER_TOOLBAR = "display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid var(--color-border-default); gap:12px;";

const INPUT =
  "flex h-9 w-full max-w-[280px] rounded-sm border border-border-default bg-surface-default px-3 py-1 text-title-sm text-text-primary";

const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-9 px-3 text-label-md";

// ── badge.tsx 의 cva 와 같은 값(이 파일이 쓰는 weak · medium 과 그 톤만 — badge-examples.mjs 의 것과 같다) ──
// 표의 상태는 Badge weak — 한 목록은 한 변형, 뜻은 톤으로(결제완료 positive · 대기중 neutral · 실패 critical). 옛 알약 · 15% 섞은 의미 색은 걷었다(badge.md)
const BADGE_BASE = "inline-flex min-w-0 cursor-default items-center gap-x0_5 overflow-hidden whitespace-nowrap font-sans";
const BADGE_VARIANTS = {
  variant: { weak: "font-medium" },
  tone: { neutral: "", positive: "", critical: "" },
  size: { medium: "min-h-x5 rounded-r1 px-x1_5 py-x0_5 text-t1" },
};
const BADGE_COMPOUND = [
  { variant: "weak", tone: "neutral", className: "bg-bg-neutral-weak text-fg-neutral-muted" },
  { variant: "weak", tone: "positive", className: "bg-bg-positive-weak text-fg-positive-contrast" },
  { variant: "weak", tone: "critical", className: "bg-bg-critical-weak text-fg-critical-contrast" },
];
const BADGE_LABEL = "min-w-0 truncate";
// <Badge> — base → 축 → 맞는 compound(cva 와 같은 차례)
const badge = (text, { variant = "weak", tone = "neutral", size = "medium" } = {}) => {
  const cls = [
    BADGE_BASE,
    BADGE_VARIANTS.variant[variant],
    BADGE_VARIANTS.tone[tone],
    BADGE_VARIANTS.size[size],
    ...BADGE_COMPOUND.filter((c) => c.variant === variant && c.tone === tone).map((c) => c.className),
  ].filter(Boolean).join(" ");
  return `<span data-slot="badge" class="${cls}"><span data-slot="badge-label" class="${BADGE_LABEL}">${text}</span></span>`;
};
const STATUS_TONE = { 결제완료: "positive", 대기중: "neutral", 실패: "critical" };
const status = (text) => badge(text, { tone: STATUS_TONE[text] });

const TABLE = "width:100%; border-collapse:collapse; font-size:var(--text-title-sm); color:var(--color-text-primary);";
const HEAD_ROW = "border-bottom:1px solid var(--color-border-default);";
const HEAD = "height:40px; padding:8px 16px; text-align:left; vertical-align:middle; font-weight:500; color:var(--color-text-secondary);";
const ROW = "border-bottom:1px solid var(--color-border-default);";
const CELL = "padding:12px 16px; vertical-align:middle;";

const FOOTER_BAR = "display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-top:1px solid var(--color-border-default); font-size:var(--text-body-sm); color:var(--color-text-secondary);";

const PAGE_BTN_GHOST = "inline-flex items-center justify-center rounded-sm h-8 w-8 text-text-primary hover:bg-surface-input";

const CHEVRON_LEFT =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
const CHEVRON_RIGHT =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

const COLUMNS_ICON =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18"/><rect x="14" y="3" width="7" height="18"/></svg>';

export const dataTableExamples = [
  {
    title: "Default",
    description: "TanStack Table + shadcn Table — filter / sort / column toggle / pagination 통합. 상태 칸은 Badge weak(20 · 모서리 4 · 11/15 · 500)다 — 반복되는 줄은 weak 로 맞추고 뜻은 톤으로 가른다(결제완료 positive · 대기중 neutral · 실패 critical).",
    jsx: `// 의존성: @tanstack/react-table
const data: Payment[] = [
  { id: "p1", email: "kim@example.com", status: "결제완료", amount: 250000 },
  { id: "p2", email: "lee@example.com", status: "대기중", amount: 150000 },
  ...
]

// 상태의 뜻 — 톤(badge.md)
const STATUS_TONE = { 결제완료: "positive", 대기중: "neutral", 실패: "critical" } as const

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "email", header: "이메일" },
  { accessorKey: "status", header: "상태", cell: ({ row }) => <Badge tone={STATUS_TONE[row.original.status]}>{row.getValue("status")}</Badge> },
  { accessorKey: "amount", header: () => <div className="text-right">금액</div>, ... },
]

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

return (
  <div className="rounded-md border">
    <div className="flex items-center p-4">
      <Input
        placeholder="이메일 필터…"
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(e) => table.getColumn("email")?.setFilterValue(e.target.value)}
        className="max-w-sm"
      />
    </div>
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((hg) => ...)}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => ...)}
      </TableBody>
    </Table>
  </div>
)`,
    render: () => `<div style="${CARD}">
  <div style="${HEADER_TOOLBAR}">
    <input class="${INPUT}" placeholder="이메일 필터…" />
    <button class="${BTN_OUTLINE}">${COLUMNS_ICON}<span>열</span></button>
  </div>
  <table style="${TABLE}">
    <thead><tr style="${HEAD_ROW}">
      <th style="${HEAD}">이메일</th>
      <th style="${HEAD}">상태</th>
      <th style="${HEAD} text-align:right;">금액</th>
    </tr></thead>
    <tbody>
      <tr style="${ROW}"><td style="${CELL}">kim@example.com</td><td style="${CELL}">${status("결제완료")}</td><td style="${CELL} text-align:right;">₩250,000</td></tr>
      <tr style="${ROW}"><td style="${CELL}">lee@example.com</td><td style="${CELL}">${status("대기중")}</td><td style="${CELL} text-align:right;">₩150,000</td></tr>
      <tr style="${ROW}"><td style="${CELL}">park@example.com</td><td style="${CELL}">${status("실패")}</td><td style="${CELL} text-align:right;">₩350,000</td></tr>
      <tr style="${ROW}"><td style="${CELL}">choi@example.com</td><td style="${CELL}">${status("결제완료")}</td><td style="${CELL} text-align:right;">₩87,500</td></tr>
    </tbody>
  </table>
  <div style="${FOOTER_BAR}">
    <span>4건 중 0건 선택됨</span>
    <div style="display:flex; align-items:center; gap:4px;">
      <button class="${PAGE_BTN_GHOST}">${CHEVRON_LEFT}</button>
      <span style="font-size:var(--text-label-md); color:var(--color-text-primary);">1 / 3</span>
      <button class="${PAGE_BTN_GHOST}">${CHEVRON_RIGHT}</button>
    </div>
  </div>
</div>`,
  },
];
