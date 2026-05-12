/*
 * shadcn Command 예제 — command.md SoT 정합. cmdk 베이스.
 * 정적 HTML preview는 항상 열린 팔레트 시각.
 *
 * 시각 정합:
 * - Input: input.md md spec (h-10 + body-md + token padding + font-sans)
 * - Item: dropdown-menu/context-menu item과 동일 (rounded-sm + body-md +
 *         padding-sm/md, selected: surface-input)
 * - Group heading: dropdown-menu Label과 동일
 * - shadow는 inline style로 var(--shadow-lg) (palette form)
 */

const PALETTE_CLASS =
  "flex flex-col overflow-hidden rounded-md border border-border-default bg-surface-default";
const PALETTE_STYLE = "width:480px; box-shadow:var(--shadow-lg);";

const INPUT_WRAPPER =
  "display:flex; align-items:center; padding:0 var(--spacing-md); border-bottom:1px solid var(--color-border-default);";

const INPUT =
  "display:flex; height:40px; width:100%; padding:var(--spacing-sm) 0; background:transparent; border:0; outline:none; font-family:var(--font-sans); font-size:var(--text-body-md); color:var(--color-text-primary);";

const LIST = "max-height:300px; overflow-y:auto; padding:var(--spacing-xs);";

const GROUP_HEADING =
  "padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-label-sm); font-weight:500; color:var(--color-text-secondary);";

const ITEM =
  "display:flex; gap:var(--spacing-sm); align-items:center; padding:var(--spacing-sm) var(--spacing-md); border-radius:var(--radius-sm); font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary); cursor:pointer;";

const ITEM_SELECTED = `${ITEM} background:var(--color-surface-input);`;

const SHORTCUT =
  "margin-left:auto; font-size:var(--text-label-sm); letter-spacing:0.1em; color:var(--color-text-tertiary);";

const SEP =
  "height:1px; margin:var(--spacing-xs) 0; background:var(--color-border-default);";

const SEARCH =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:var(--spacing-sm); flex-shrink:0; color:var(--color-text-secondary);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

const ICON = (svg) => `<span style="display:inline-flex; color:var(--color-text-secondary); flex-shrink:0;">${svg}</span>`;

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
    title: "Default (palette)",
    description: "검색 input + group + shortcut — ⌘K 명령어 팔레트의 표준 패턴. Item 선택은 키보드(Arrow keys)로.",
    jsx: `<Command className="rounded-md border md:min-w-[450px]" style={{ boxShadow: "var(--shadow-lg)" }}>
  <CommandInput placeholder="명령 검색…" />
  <CommandList>
    <CommandEmpty>결과가 없습니다.</CommandEmpty>
    <CommandGroup heading="제안">
      <CommandItem><Calendar /><span>캘린더</span></CommandItem>
      <CommandItem><Smile /><span>이모지 검색</span></CommandItem>
      <CommandItem><Calculator /><span>계산기</span></CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="설정">
      <CommandItem>
        <User /><span>프로필</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings /><span>설정</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    render: () => `<div class="${PALETTE_CLASS}" style="${PALETTE_STYLE}">
  <div style="${INPUT_WRAPPER}">${SEARCH}<input style="${INPUT}" placeholder="명령 검색…" /></div>
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

  {
    title: "Inline (sidebar / popover)",
    description: "border 없이 부모 컨테이너 안에 inline 사용 — Combobox(Popover + Command) 베이스 패턴. 좁은 폭(280px).",
    jsx: `<Popover>
  <PopoverTrigger>...</PopoverTrigger>
  <PopoverContent className="p-0 w-[280px]">
    <Command>
      <CommandInput placeholder="옵션 검색…" />
      <CommandList>
        <CommandEmpty>결과가 없습니다.</CommandEmpty>
        <CommandGroup>
          <CommandItem>옵션 A</CommandItem>
          <CommandItem>옵션 B</CommandItem>
          <CommandItem>옵션 C</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>`,
    render: () => `<div class="${PALETTE_CLASS}" style="width:280px; box-shadow:var(--shadow-md);">
  <div style="${INPUT_WRAPPER}">${SEARCH}<input style="${INPUT}" placeholder="옵션 검색…" /></div>
  <div style="${LIST}">
    <div style="${ITEM_SELECTED}"><span>옵션 A</span></div>
    <div style="${ITEM}"><span>옵션 B</span></div>
    <div style="${ITEM}"><span>옵션 C</span></div>
  </div>
</div>`,
  },

  {
    title: "Empty state",
    description: "검색 결과 없을 때 CommandEmpty가 노출 — body-sm + secondary, 가운데 정렬.",
    jsx: `<Command>
  <CommandInput placeholder="검색…" value="없는검색어" />
  <CommandList>
    <CommandEmpty>결과가 없습니다.</CommandEmpty>
  </CommandList>
</Command>`,
    render: () => `<div class="${PALETTE_CLASS}" style="${PALETTE_STYLE}">
  <div style="${INPUT_WRAPPER}">${SEARCH}<input style="${INPUT}" value="없는검색어" /></div>
  <div style="${LIST}">
    <div style="padding:var(--spacing-xl) 0; text-align:center; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">결과가 없습니다.</div>
  </div>
</div>`,
  },
];
