/*
 * shadcn DataTable 예제 — TanStack Table + Table 조립. 별도 컴포넌트 없음.
 */

const CARD = "border:1px solid var(--color-border-default); border-radius:var(--radius-md); overflow:hidden; background:var(--color-surface-default);";

const HEADER_TOOLBAR = "display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid var(--color-border-default); gap:12px;";

const INPUT =
  "flex h-9 w-full max-w-[280px] rounded-sm border border-border-default bg-surface-default px-3 py-1 text-title-sm text-text-primary";

const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-9 px-3 text-label-md";

const BADGE_BASE = "display:inline-flex; align-items:center; padding:2px 8px; border-radius:9999px; font-size:var(--text-label-sm); font-weight:500;";

const STATUS = {
  paid: `${BADGE_BASE} background:color-mix(in srgb, var(--color-success) 15%, transparent); color:var(--color-success);`,
  pending: `${BADGE_BASE} background:color-mix(in srgb, var(--color-warning) 15%, transparent); color:var(--color-warning);`,
  failed: `${BADGE_BASE} background:color-mix(in srgb, var(--color-error) 15%, transparent); color:var(--color-error);`,
};

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
    description: "TanStack Table + shadcn Table — filter / sort / column toggle / pagination 통합.",
    jsx: `// 의존성: @tanstack/react-table
const data: Payment[] = [
  { id: "p1", email: "kim@example.com", status: "결제완료", amount: 250000 },
  { id: "p2", email: "lee@example.com", status: "대기중", amount: 150000 },
  ...
]

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "email", header: "이메일" },
  { accessorKey: "status", header: "상태", cell: ({ row }) => <Badge>{row.getValue("status")}</Badge> },
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
      <tr style="${ROW}"><td style="${CELL}">kim@example.com</td><td style="${CELL}"><span style="${STATUS.paid}">결제완료</span></td><td style="${CELL} text-align:right;">₩250,000</td></tr>
      <tr style="${ROW}"><td style="${CELL}">lee@example.com</td><td style="${CELL}"><span style="${STATUS.pending}">대기중</span></td><td style="${CELL} text-align:right;">₩150,000</td></tr>
      <tr style="${ROW}"><td style="${CELL}">park@example.com</td><td style="${CELL}"><span style="${STATUS.failed}">실패</span></td><td style="${CELL} text-align:right;">₩350,000</td></tr>
      <tr style="${ROW}"><td style="${CELL}">choi@example.com</td><td style="${CELL}"><span style="${STATUS.paid}">결제완료</span></td><td style="${CELL} text-align:right;">₩87,500</td></tr>
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
