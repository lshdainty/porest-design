/*
 * shadcn Command 예제 — cmdk 베이스. 정적 HTML preview는 항상 열린 팔레트 시각.
 */

const PALETTE =
  "display:flex; flex-direction:column; overflow:hidden; border-radius:var(--radius-md); border:1px solid var(--color-border-default); background:var(--color-surface-default); width:480px; box-shadow:var(--shadow-lg);";

const INPUT_WRAPPER =
  "display:flex; align-items:center; padding:0 12px; border-bottom:1px solid var(--color-border-default);";

const INPUT =
  "display:flex; height:44px; width:100%; padding:12px 0; background:transparent; border:0; outline:none; font-size:var(--text-title-sm); color:var(--color-text-primary);";

const LIST = "max-height:300px; overflow-y:auto; padding:8px;";

const GROUP_HEADING =
  "padding:6px 8px; font-size:var(--text-label-sm); font-weight:500; color:var(--color-text-secondary);";

const ITEM =
  "display:flex; gap:8px; align-items:center; padding:6px 8px; border-radius:var(--radius-xs); font-size:var(--text-title-sm); color:var(--color-text-primary); cursor:default;";

const ITEM_SELECTED = `${ITEM} background:var(--color-surface-input);`;

const SHORTCUT =
  "margin-left:auto; font-size:var(--text-label-sm); letter-spacing:0.1em; color:var(--color-text-tertiary);";

const SEP = "height:1px; margin:0 -8px; background:var(--color-border-default);";

const SEARCH =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; flex-shrink:0; color:var(--color-text-secondary);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

const ICON = (svg) => `<span style="display:inline-flex; color:var(--color-text-secondary);">${svg}</span>`;

const CALENDAR =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';

const SMILE =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>';

const CALC =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>';

const USER =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

const SETTINGS =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

export const commandExamples = [
  {
    title: "Default",
    description: "검색 + 그룹 + 단축키 — ⌘K 명령어 팔레트의 표준 패턴.",
    jsx: `<Command className="rounded-lg border shadow-md md:min-w-[450px]">
  <CommandInput placeholder="명령 검색…" />
  <CommandList>
    <CommandEmpty>결과가 없습니다.</CommandEmpty>
    <CommandGroup heading="제안">
      <CommandItem>
        <Calendar />
        <span>캘린더</span>
      </CommandItem>
      <CommandItem>
        <Smile />
        <span>이모지 검색</span>
      </CommandItem>
      <CommandItem>
        <Calculator />
        <span>계산기</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="설정">
      <CommandItem>
        <User />
        <span>프로필</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings />
        <span>설정</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    render: () => `<div style="${PALETTE}">
  <div style="${INPUT_WRAPPER}">${SEARCH}<input style="${INPUT}" placeholder="명령 검색…" value="" /></div>
  <div style="${LIST}">
    <div style="${GROUP_HEADING}">제안</div>
    <div style="${ITEM_SELECTED}">${ICON(CALENDAR)}<span>캘린더</span></div>
    <div style="${ITEM}">${ICON(SMILE)}<span>이모지 검색</span></div>
    <div style="${ITEM}">${ICON(CALC)}<span>계산기</span></div>
    <div style="${SEP}"></div>
    <div style="${GROUP_HEADING}">설정</div>
    <div style="${ITEM}">${ICON(USER)}<span>프로필</span><span style="${SHORTCUT}">⌘P</span></div>
    <div style="${ITEM}">${ICON(SETTINGS)}<span>설정</span><span style="${SHORTCUT}">⌘S</span></div>
  </div>
</div>`,
  },
];
