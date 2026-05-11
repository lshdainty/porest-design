/*
 * shadcn Collapsible 예제 — 단순 primitive. 정적 HTML preview는 open 상태.
 */

const ROW =
  "display:flex; align-items:center; justify-content:space-between; padding:8px 16px; background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-sm); font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-primary);";

const ITEM_LINE =
  "padding:8px 16px; background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-sm); font-size:var(--text-body-md); color:var(--color-text-primary);";

const ICON_BTN =
  "inline-flex items-center justify-center rounded-sm text-text-primary hover:bg-surface-input transition-colors h-8 w-8";

const CHEVRONS_UPDOWN =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 15 12 20 17 15"/><polyline points="7 9 12 4 17 9"/></svg>';

export const collapsibleExamples = [
  {
    title: "Default",
    description: "기본 표시 + 토글로 추가 항목 노출. 스타일은 사용처에서 직접.",
    jsx: `<Collapsible className="w-[320px] space-y-2">
  <div className="flex items-center justify-between space-x-4 px-4">
    <h4 className="text-title-sm font-medium">@kim님이 별표한 저장소</h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon">
        <ChevronsUpDown className="h-4 w-4" />
      </Button>
    </CollapsibleTrigger>
  </div>
  <div className="rounded-sm border px-4 py-3 font-mono text-body-sm">
    @anthropic/claude-code
  </div>
  <CollapsibleContent className="space-y-2">
    <div className="rounded-sm border px-4 py-3 font-mono text-body-sm">
      @vercel/ai
    </div>
    <div className="rounded-sm border px-4 py-3 font-mono text-body-sm">
      @tailwindlabs/tailwindcss
    </div>
  </CollapsibleContent>
</Collapsible>`,
    render: () => `<div style="width:320px; display:flex; flex-direction:column; gap:8px;">
  <div style="${ROW}">
    <span>@kim님이 별표한 저장소</span>
    <button class="${ICON_BTN}">${CHEVRONS_UPDOWN}</button>
  </div>
  <div style="${ITEM_LINE} font-family:var(--font-mono, ui-monospace, monospace);">@anthropic/claude-code</div>
  <div style="${ITEM_LINE} font-family:var(--font-mono, ui-monospace, monospace);">@vercel/ai</div>
  <div style="${ITEM_LINE} font-family:var(--font-mono, ui-monospace, monospace);">@tailwindlabs/tailwindcss</div>
</div>`,
  },
];
