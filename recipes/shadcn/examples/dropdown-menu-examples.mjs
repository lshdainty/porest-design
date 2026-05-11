/*
 * shadcn DropdownMenu 예제 — 정적 HTML preview는 항상 열린 상태.
 */

const TRIGGER =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-10 px-4 text-title-sm";

const CONTENT =
  "z-50 min-w-[12rem] overflow-hidden rounded-sm border border-border-default bg-surface-default p-1 text-text-primary shadow-md";

const ITEM =
  "relative flex items-center gap-2 rounded-xs px-2 py-1.5 text-title-sm";

const ITEM_FOCUS = `${ITEM} bg-surface-input`;

const LABEL =
  "px-2 py-1.5 text-label-sm font-medium text-text-secondary";

const SHORTCUT =
  "ml-auto text-label-sm tracking-widest text-text-tertiary";

const SEP = "margin:4px -4px; height:1px; background:var(--color-border-default);";

const USER =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
const SETTINGS =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
const LOGOUT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
const CHECK =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

export const dropdownMenuExamples = [
  {
    title: "Default",
    description: "trigger 클릭으로 열림. 일반 항목 + label + separator + shortcut.",
    jsx: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">메뉴 열기</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User />
      <span>프로필</span>
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings />
      <span>설정</span>
      <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogOut />
      <span>로그아웃</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:4px; width:224px;">
  <button class="${TRIGGER}" style="align-self:flex-start;">메뉴 열기</button>
  <div class="${CONTENT}" style="width:224px;">
    <div class="${LABEL}">내 계정</div>
    <div style="${SEP}"></div>
    <div class="${ITEM_FOCUS}">${USER}<span>프로필</span><span class="${SHORTCUT}">⇧⌘P</span></div>
    <div class="${ITEM}">${SETTINGS}<span>설정</span><span class="${SHORTCUT}">⌘,</span></div>
    <div style="${SEP}"></div>
    <div class="${ITEM}">${LOGOUT}<span>로그아웃</span></div>
  </div>
</div>`,
  },

  {
    title: "Checkbox items",
    description: "토글 가능한 항목 — 체크 표시.",
    jsx: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">보기</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>표시 옵션</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked>상태바</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>활동 표시</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>패널</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    render: () => {
      const checkbox = (label, checked) => `<div class="${ITEM}" style="padding-left:32px; position:relative;">
  ${checked ? `<span style="position:absolute; left:8px; display:flex; height:14px; width:14px; align-items:center; justify-content:center;">${CHECK}</span>` : ""}
  ${label}
</div>`;
      return `<div style="display:flex; flex-direction:column; gap:4px; width:224px;">
  <button class="${TRIGGER}" style="align-self:flex-start;">보기</button>
  <div class="${CONTENT}" style="width:224px;">
    <div class="${LABEL}">표시 옵션</div>
    <div style="${SEP}"></div>
    ${checkbox("상태바", true)}
    ${checkbox("활동 표시", false)}
    ${checkbox("패널", true)}
  </div>
</div>`;
    },
  },
];
