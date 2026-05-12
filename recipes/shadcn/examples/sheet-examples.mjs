/*
 * shadcn Sheet 예제 — 정적 HTML preview는 frame 안에 sheet 위치만 표현.
 */

const FRAME =
  "position:relative; width:100%; max-width:640px; height:360px; background:var(--color-surface-input); border:1px solid var(--color-border-default); border-radius:var(--radius-lg); overflow:hidden;";

const SHEET_BASE =
  "position:absolute; background:var(--color-surface-default); padding:var(--spacing-2xl); box-shadow:var(--shadow-xl); display:flex; flex-direction:column; gap:var(--spacing-md);";

const X_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

function sheet({ side = "right", title = "", description = "", body = "" } = {}) {
  const sideStyle = {
    right: "top:0; right:0; bottom:0; width:60%; border-left:1px solid var(--color-border-default);",
    left: "top:0; left:0; bottom:0; width:60%; border-right:1px solid var(--color-border-default);",
    top: "top:0; left:0; right:0; height:60%; border-bottom:1px solid var(--color-border-default);",
    bottom: "bottom:0; left:0; right:0; height:60%; border-top:1px solid var(--color-border-default);",
  }[side];
  return `<div style="${FRAME}">
  <div style="position:absolute; inset:0; background:var(--overlay-dim-light);"></div>
  <div style="${SHEET_BASE} ${sideStyle}">
    <button type="button" style="position:absolute; right:var(--spacing-md); top:var(--spacing-md); opacity:0.7; background:transparent; border:0; cursor:pointer; color:var(--color-text-primary);">${X_ICON}</button>
    ${title ? `<div style="display:flex; flex-direction:column; gap:var(--spacing-xs);">
      <h2 style="margin:0; font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:var(--text-title-md--font-weight); color:var(--color-text-primary);">${title}</h2>
      ${description ? `<p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">${description}</p>` : ""}
    </div>` : ""}
    ${body}
  </div>
</div>`;
}

export const sheetExamples = [
  {
    title: "Right side (default)",
    description: "오른쪽에서 슬라이드 — 가장 흔한 패턴 (필터, 상세 보기).",
    jsx: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">필터 열기</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>필터</SheetTitle>
      <SheetDescription>표시할 항목을 선택하세요.</SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      ...
    </div>
    <SheetFooter>
      <Button>적용</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    render: () => sheet({
      side: "right",
      title: "필터",
      description: "표시할 항목을 선택하세요.",
    }),
  },

  {
    title: "Left side",
    description: "왼쪽에서 슬라이드 — 모바일 nav 패턴.",
    jsx: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" size="icon">
      <Menu />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>메뉴</SheetTitle>
    </SheetHeader>
    <nav>...</nav>
  </SheetContent>
</Sheet>`,
    render: () => sheet({
      side: "left",
      title: "메뉴",
    }),
  },

  {
    title: "Bottom sheet",
    description: "하단 슬라이드 — 모바일 친화 액션 시트.",
    jsx: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">공유</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>공유하기</SheetTitle>
      <SheetDescription>이 항목을 공유할 방법을 선택하세요.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    render: () => sheet({
      side: "bottom",
      title: "공유하기",
      description: "이 항목을 공유할 방법을 선택하세요.",
    }),
  },
];
