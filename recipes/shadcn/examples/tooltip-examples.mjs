/*
 * shadcn Tooltip 예제 — tooltip.md SoT 정합.
 * 정적 HTML preview에서는 항상 열린 상태로 시각만 표현.
 *
 * True inverted tooltip — light 모드는 dark 배경, dark 모드는 light 배경
 * (페이지와 항상 반대 톤). bg=text-primary / text=surface-default 조합으로
 * 자동 양방향 swap. 두 토큰 모두 자동 swap이라 별도 다크 모드 처리 불필요.
 */

const TIP_CLASS =
  "z-[210] overflow-hidden rounded-xs px-[var(--spacing-md)] py-[var(--spacing-xs)] text-label-sm";

const TIP_STYLE =
  "background-color:var(--color-text-primary); color:var(--color-surface-default); box-shadow:var(--shadow-sm);";

// button.md outline · md size 정합 — font-sans + token padding + motion transition
const BTN =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-10 px-[var(--spacing-md)] text-body-md";

function tip({ side = "top", text = "" } = {}) {
  const positions = {
    top: `bottom:calc(100% + var(--spacing-sm)); left:50%; transform:translateX(-50%);`,
    bottom: `top:calc(100% + var(--spacing-sm)); left:50%; transform:translateX(-50%);`,
    left: `right:calc(100% + var(--spacing-sm)); top:50%; transform:translateY(-50%);`,
    right: `left:calc(100% + var(--spacing-sm)); top:50%; transform:translateY(-50%);`,
  };
  return `<div class="${TIP_CLASS}" style="position:absolute; ${positions[side] || positions.top} white-space:nowrap; ${TIP_STYLE}">${text}</div>`;
}

export const tooltipExamples = [
  {
    title: "Default",
    description: "마우스 hover 또는 keyboard focus 시 표시. 기본 200ms delay. 두 테마 모두 stable 다크 배경.",
    jsx: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>도움말 텍스트</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    render: () => `<div style="position:relative; display:inline-block; padding:var(--spacing-2xl) 0 0;">
  ${tip({ side: "bottom", text: "도움말 텍스트" })}
  <button class="${BTN}">Hover me</button>
</div>`,
  },

  {
    title: "Side variants",
    description: "side prop — top(default) / bottom / left / right. Radix가 viewport 경계 자동 반전.",
    jsx: `<div className="flex gap-[var(--spacing-md)]">
  <Tooltip><TooltipTrigger asChild><Button variant="outline">Top</Button></TooltipTrigger><TooltipContent side="top">위쪽</TooltipContent></Tooltip>
  <Tooltip><TooltipTrigger asChild><Button variant="outline">Right</Button></TooltipTrigger><TooltipContent side="right">오른쪽</TooltipContent></Tooltip>
  <Tooltip><TooltipTrigger asChild><Button variant="outline">Bottom</Button></TooltipTrigger><TooltipContent side="bottom">아래쪽</TooltipContent></Tooltip>
  <Tooltip><TooltipTrigger asChild><Button variant="outline">Left</Button></TooltipTrigger><TooltipContent side="left">왼쪽</TooltipContent></Tooltip>
</div>`,
    render: () => `<div style="display:flex; gap:var(--spacing-3xl); padding:var(--spacing-3xl) var(--spacing-3xl);">
  <div style="position:relative;">${tip({ side: "top", text: "위쪽" })}<button class="${BTN}">Top</button></div>
  <div style="position:relative;">${tip({ side: "right", text: "오른쪽" })}<button class="${BTN}">Right</button></div>
  <div style="position:relative;">${tip({ side: "bottom", text: "아래쪽" })}<button class="${BTN}">Bottom</button></div>
  <div style="position:relative;">${tip({ side: "left", text: "왼쪽" })}<button class="${BTN}">Left</button></div>
</div>`,
  },

  {
    title: "Icon button with tooltip",
    description: "아이콘 버튼 — visible label 없이 의미 전달 시 tooltip + aria-label 필수(WCAG 1.1.1).",
    jsx: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="설정 열기">
        <Settings />
      </Button>
    </TooltipTrigger>
    <TooltipContent>설정 열기</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    render: () => {
      const SETTINGS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
      return `<div style="position:relative; display:inline-block; padding:var(--spacing-2xl) 0 0;">
  ${tip({ side: "bottom", text: "설정 열기" })}
  <button class="inline-flex items-center justify-center rounded-sm font-sans text-text-primary hover:bg-surface-input transition-[background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] h-10 w-10" aria-label="설정 열기">${SETTINGS}</button>
</div>`;
    },
  },
];
