/*
 * shadcn ContextMenu 예제 — context-menu.md SoT + preview `.ctx` 1:1 정합.
 * Container: surface-default + border 1px + radius-md + shadow-md + padding-xs + min-width 160
 * Item: padding-sm/md + radius-sm + body-md, hover: surface-input
 * Destructive: text-error + hover error 12% mix
 */

const CONTENT =
  "display:inline-flex; flex-direction:column; background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); box-shadow:var(--shadow-md); padding:var(--spacing-xs); min-width:160px;";

const ITEM =
  "display:flex; align-items:center; gap:var(--spacing-sm); padding:var(--spacing-sm) var(--spacing-md); border-radius:var(--radius-sm); font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary); cursor:pointer;";

const ITEM_HOVER = `${ITEM} background:var(--color-surface-input);`;

const ITEM_DESTRUCTIVE = `${ITEM} color:var(--color-error);`;

const ITEM_DISABLED = `${ITEM} opacity:0.5; cursor:not-allowed;`;

const SEP =
  "height:1px; background:var(--color-border-default); margin:var(--spacing-xs) 0;";

const SHORTCUT =
  "margin-left:auto; font-size:var(--text-label-sm); letter-spacing:0.1em; color:var(--color-text-tertiary);";

const TRIGGER_AREA =
  "display:flex; align-items:center; justify-content:center; width:300px; height:120px; border:2px dashed var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default); color:var(--color-text-secondary); font-size:var(--text-body-sm); user-select:none;";

const CHECK_ICON =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

const DOT_ICON =
  '<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>';

export const contextMenuExamples = [
  {
    title: "Default (preview 화면샷 패턴)",
    description:
      "preview `.ctx` SoT — 즐겨찾기 / 보관 + separator + 삭제(destructive). 보조 액션 메뉴의 표준 형태.",
    jsx: `<ContextMenu>
  <ContextMenuTrigger className="flex h-[120px] w-[300px] items-center justify-center rounded-md border border-dashed text-body-sm text-text-secondary">
    여기를 우클릭하세요. (long-press 지원)
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>즐겨찾기</ContextMenuItem>
    <ContextMenuItem>보관</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem className="text-error focus:bg-error/12 focus:text-error">삭제</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    render: () => `<div style="display:flex; align-items:flex-start; gap:var(--spacing-2xl);">
  <div style="${TRIGGER_AREA}">여기를 우클릭하세요.<br/>(long-press 지원)</div>
  <div style="${CONTENT}">
    <div style="${ITEM}">즐겨찾기</div>
    <div style="${ITEM}">보관</div>
    <div style="${SEP}"></div>
    <div style="${ITEM_DESTRUCTIVE}">삭제</div>
  </div>
</div>`,
  },

  {
    title: "With shortcut",
    description:
      "데스크탑 메뉴에서 키보드 단축키 표시. shortcut은 우측 정렬 + `text-label-sm` + `text-tertiary`. inset(좌측 24px) 없이도 정렬됨.",
    jsx: `<ContextMenuContent>
  <ContextMenuItem>
    앞으로
    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuItem disabled>
    뒤로
    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuItem>
    재로드
    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuItem>저장</ContextMenuItem>
</ContextMenuContent>`,
    render: () => `<div style="${CONTENT}; min-width:200px;">
  <div style="${ITEM_HOVER}">앞으로<span style="${SHORTCUT}">⌘]</span></div>
  <div style="${ITEM_DISABLED}">뒤로<span style="${SHORTCUT}">⌘[</span></div>
  <div style="${SEP}"></div>
  <div style="${ITEM}">재로드<span style="${SHORTCUT}">⌘R</span></div>
  <div style="${ITEM}">저장</div>
</div>`,
  },

  {
    title: "Checkbox + Radio items",
    description:
      "옵션 토글(checkbox)과 단일 선택(radio)을 같은 메뉴에. inset 변형으로 좌측 24px indicator 영역 확보 — 일반 item과 정렬 일치.",
    jsx: `<ContextMenuContent>
  <ContextMenuLabel>옵션</ContextMenuLabel>
  <ContextMenuCheckboxItem checked>그리드 표시</ContextMenuCheckboxItem>
  <ContextMenuCheckboxItem>자동 정렬</ContextMenuCheckboxItem>
  <ContextMenuSeparator />
  <ContextMenuLabel>보기 방식</ContextMenuLabel>
  <ContextMenuRadioGroup value="list">
    <ContextMenuRadioItem value="list">목록</ContextMenuRadioItem>
    <ContextMenuRadioItem value="grid">그리드</ContextMenuRadioItem>
    <ContextMenuRadioItem value="card">카드</ContextMenuRadioItem>
  </ContextMenuRadioGroup>
</ContextMenuContent>`,
    render: () => {
      const label = (text) => `<div style="padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-label-sm); font-weight:500; color:var(--color-text-secondary);">${text}</div>`;
      const insetItem = (indicator, text) =>
        `<div style="${ITEM}; padding-left:var(--spacing-xl); position:relative;"><span style="position:absolute; left:var(--spacing-sm); display:inline-flex; align-items:center; justify-content:center; width:14px; height:14px; color:var(--color-text-primary);">${indicator}</span>${text}</div>`;
      return `<div style="${CONTENT}; min-width:200px;">
  ${label("옵션")}
  ${insetItem(CHECK_ICON, "그리드 표시")}
  ${insetItem("", "자동 정렬")}
  <div style="${SEP}"></div>
  ${label("보기 방식")}
  ${insetItem(DOT_ICON, "목록")}
  ${insetItem("", "그리드")}
  ${insetItem("", "카드")}
</div>`;
    },
  },
];
