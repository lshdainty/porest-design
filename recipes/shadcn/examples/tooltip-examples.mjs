/*
 * shadcn Tooltip 예제 — 정적 HTML preview에서는 항상 열린 상태로 시각만 표현.
 */

const TIP =
  "z-50 overflow-hidden rounded-xs bg-text-primary px-3 py-1.5 text-label-sm text-text-on-accent shadow-md";

const BTN =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-10 px-4 text-title-sm";

function tip({ side = "top", text = "" } = {}) {
  return `<div class="${TIP}" style="position:absolute; ${side}:calc(100% + 8px); left:50%; transform:translateX(-50%); white-space:nowrap;">${text}</div>`;
}

export const tooltipExamples = [
  {
    title: "Default",
    description: "마우스 hover 또는 keyboard focus 시 표시. 기본 200ms delay.",
    jsx: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>도움말 텍스트</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    render: () => `<div style="position:relative; display:inline-block; padding:32px 0 0;">
  ${tip({ side: "bottom", text: "도움말 텍스트" })}
  <button class="${BTN}">Hover me</button>
</div>`,
  },

  {
    title: "Side variants",
    description: "side prop — top(default) / bottom / left / right.",
    jsx: `<div className="flex gap-3">
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline">Top</Button></TooltipTrigger>
    <TooltipContent side="top">위쪽</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline">Right</Button></TooltipTrigger>
    <TooltipContent side="right">오른쪽</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline">Bottom</Button></TooltipTrigger>
    <TooltipContent side="bottom">아래쪽</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline">Left</Button></TooltipTrigger>
    <TooltipContent side="left">왼쪽</TooltipContent>
  </Tooltip>
</div>`,
    render: () => `<div style="display:flex; gap:48px; padding:48px 64px;">
  <div style="position:relative;">
    <div class="${TIP}" style="position:absolute; bottom:calc(100% + 8px); left:50%; transform:translateX(-50%); white-space:nowrap;">위쪽</div>
    <button class="${BTN}">Top</button>
  </div>
  <div style="position:relative;">
    <div class="${TIP}" style="position:absolute; left:calc(100% + 8px); top:50%; transform:translateY(-50%); white-space:nowrap;">오른쪽</div>
    <button class="${BTN}">Right</button>
  </div>
  <div style="position:relative;">
    <div class="${TIP}" style="position:absolute; top:calc(100% + 8px); left:50%; transform:translateX(-50%); white-space:nowrap;">아래쪽</div>
    <button class="${BTN}">Bottom</button>
  </div>
  <div style="position:relative;">
    <div class="${TIP}" style="position:absolute; right:calc(100% + 8px); top:50%; transform:translateY(-50%); white-space:nowrap;">왼쪽</div>
    <button class="${BTN}">Left</button>
  </div>
</div>`,
  },

  {
    title: "Icon button with tooltip",
    description: "아이콘 버튼 — 텍스트 없이 의미 전달. tooltip 필수.",
    jsx: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Settings />
      </Button>
    </TooltipTrigger>
    <TooltipContent>설정 열기</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    render: () => {
      const SETTINGS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
      return `<div style="position:relative; display:inline-block; padding:32px 0 0;">
  <div class="${TIP}" style="position:absolute; bottom:calc(100% - 24px); left:50%; transform:translateX(-50%); white-space:nowrap;">설정 열기</div>
  <button class="inline-flex items-center justify-center rounded-md text-text-primary hover:bg-surface-input transition-colors h-10 w-10">${SETTINGS}</button>
</div>`;
    },
  },
];
