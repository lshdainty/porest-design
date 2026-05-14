/*
 * shadcn DropdownMenu 예제 — dropdown-menu.md SoT + context-menu와 시각 동일.
 * Container: surface-default + border 1px + radius-md + shadow-md(inline) +
 *            padding-xs + min-width 160
 * Item: padding-sm/md + radius-sm + body-md, hover: surface-input
 * Destructive: text-error + hover error 12% mix
 * Trigger: button.md outline md spec 정합
 */

const CONTENT_CLASS =
  "z-[200] inline-flex flex-col overflow-hidden rounded-md border border-border-default bg-surface-default p-[var(--spacing-xs)] text-text-primary";
const CONTENT_SHADOW = "box-shadow:var(--shadow-md);";

const ITEM =
  "display:flex; align-items:center; gap:var(--spacing-sm); padding:var(--spacing-sm) var(--spacing-md); border-radius:var(--radius-sm); font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary); cursor:pointer;";

const ITEM_FOCUS = `${ITEM} background:var(--color-surface-input);`;

const ITEM_DESTRUCTIVE = `${ITEM} color:var(--color-error);`;

const SEP =
  "height:1px; background:var(--color-border-default); margin:var(--spacing-xs) 0;";

const LABEL =
  "padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-label-sm); font-weight:500; color:var(--color-text-secondary);";

const SHORTCUT =
  "margin-left:auto; font-size:var(--text-label-sm); letter-spacing:0.1em; color:var(--color-text-tertiary);";

// button.md outline md spec 정합
const TRIGGER =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-10 px-[var(--spacing-md)] text-body-md";

const USER =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-text-secondary); flex-shrink:0;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
const SETTINGS =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-text-secondary); flex-shrink:0;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
const LOGOUT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:currentColor; flex-shrink:0;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
const CHECK =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const DOT_ICON =
  '<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>';

export const dropdownMenuExamples = [
  {
    title: "Default (user menu)",
    description:
      "trigger 클릭으로 열림. label + separator + icon item + shortcut + destructive item 패턴. ContextMenu와 시각 동일.",
    jsx: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">메뉴 열기</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User /><span>프로필</span>
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings /><span>설정</span>
      <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <LogOut /><span>로그아웃</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    render: () => `<div style="display:inline-flex; flex-direction:column; align-items:flex-start; gap:var(--spacing-sm);">
  <button class="${TRIGGER}">메뉴 열기</button>
  <div class="${CONTENT_CLASS}" style="${CONTENT_SHADOW} min-width:220px;">
    <div style="${LABEL}">내 계정</div>
    <div style="${SEP}"></div>
    <div style="${ITEM_FOCUS}">${USER}<span>프로필</span><span style="${SHORTCUT}">⇧⌘P</span></div>
    <div style="${ITEM}">${SETTINGS}<span>설정</span><span style="${SHORTCUT}">⌘,</span></div>
    <div style="${SEP}"></div>
    <div style="${ITEM_DESTRUCTIVE}">${LOGOUT}<span>로그아웃</span></div>
  </div>
</div>`,
  },

  {
    title: "Checkbox + Radio items",
    description:
      "옵션 토글(checkbox)과 단일 선택(radio). inset 변형으로 좌측 24px indicator 영역 확보.",
    jsx: `<DropdownMenuContent>
  <DropdownMenuLabel>표시 옵션</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuCheckboxItem checked>상태바</DropdownMenuCheckboxItem>
  <DropdownMenuCheckboxItem>활동 표시</DropdownMenuCheckboxItem>
  <DropdownMenuSeparator />
  <DropdownMenuLabel>패널 위치</DropdownMenuLabel>
  <DropdownMenuRadioGroup value="left">
    <DropdownMenuRadioItem value="left">좌측</DropdownMenuRadioItem>
    <DropdownMenuRadioItem value="right">우측</DropdownMenuRadioItem>
  </DropdownMenuRadioGroup>
</DropdownMenuContent>`,
    render: () => {
      const insetItem = (indicator, text) =>
        `<div style="${ITEM}; padding-left:var(--spacing-xl); position:relative;"><span style="position:absolute; left:var(--spacing-sm); display:inline-flex; align-items:center; justify-content:center; width:14px; height:14px; color:var(--color-text-primary);">${indicator}</span>${text}</div>`;
      return `<div style="display:inline-flex; flex-direction:column; align-items:flex-start; gap:var(--spacing-sm);">
  <button class="${TRIGGER}">보기 옵션</button>
  <div class="${CONTENT_CLASS}" style="${CONTENT_SHADOW} min-width:220px;">
    <div style="${LABEL}">표시 옵션</div>
    <div style="${SEP}"></div>
    ${insetItem(CHECK, "상태바")}
    ${insetItem("", "활동 표시")}
    <div style="${SEP}"></div>
    <div style="${LABEL}">패널 위치</div>
    ${insetItem(DOT_ICON, "좌측")}
    ${insetItem("", "우측")}
  </div>
</div>`;
    },
  },
];
