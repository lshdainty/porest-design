/*
 * Porest IconPicker 예제 — icon-picker.tsx의 className과 1:1 동기.
 * preview-html `.ipk` SoT 정합:
 *   trigger: 40×40 square + 현재 아이콘 미리보기
 *   content: w-80 + search + grid grid-cols-8 + max-h 240 scroll
 */

const TRIGGER =
  "flex h-10 w-10 items-center justify-center rounded-md border border-border-default bg-surface-default shadow-sm hover:bg-surface-input transition-colors";

const CONTENT =
  "w-80 p-[var(--spacing-md)] rounded-md border border-border-default bg-surface-default shadow-md";

const SEARCH_WRAP = "relative mb-[var(--spacing-sm)]";
const SEARCH_ICON =
  "absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary";
const INPUT =
  "h-9 w-full rounded-md border border-border-default bg-surface-default px-3 pl-9 text-body-md text-text-primary placeholder:text-text-tertiary";

const GRID = "grid grid-cols-8 gap-1";
const CELL_BASE =
  "flex h-8 w-8 items-center justify-center rounded-sm transition-colors";
const CELL_INACTIVE = "text-text-secondary hover:bg-surface-input";
const CELL_ACTIVE = "bg-primary text-text-on-accent";

const FOOTER =
  "mt-[var(--spacing-sm)] pt-[var(--spacing-sm)] border-t border-border-subtle text-[11px] text-text-tertiary text-center";

const SEARCH_SVG =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

const STAR =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
const HEART =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
const COFFEE =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>';
const HOME =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
const BOOK =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
const CAR =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>';
const GIFT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>';
const MUSIC =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
const CAMERA =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';
const SETTING =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

const ICON_SAMPLE = [STAR, HEART, COFFEE, HOME, BOOK, CAR, GIFT, MUSIC, CAMERA, SETTING];

function cells(activeIndex = -1, count = 32) {
  const cells = [];
  for (let i = 0; i < count; i++) {
    const svg = ICON_SAMPLE[i % ICON_SAMPLE.length];
    const cls = i === activeIndex ? `${CELL_BASE} ${CELL_ACTIVE}` : `${CELL_BASE} ${CELL_INACTIVE}`;
    cells.push(`<button type="button" class="${cls}" aria-label="icon-${i}" aria-pressed="${i === activeIndex}">${svg}</button>`);
  }
  return cells.join("");
}

export const iconPickerExamples = [
  {
    title: "Default (40 trigger + popover open)",
    description:
      "trigger 클릭 → popover open. 검색 input (좌측 Search icon) + grid grid-cols-8 + ScrollArea. active cell은 bg-primary + text-on-accent.",
    jsx: `<IconPicker value={icon} onChange={setIcon} />`,
    render: () => `<div style="display:flex; align-items:flex-start; gap:var(--spacing-md);">
  <button class="${TRIGGER}" aria-haspopup="dialog" aria-expanded="true">${STAR}</button>
  <div class="${CONTENT}">
    <div class="${SEARCH_WRAP}">
      <span class="${SEARCH_ICON}">${SEARCH_SVG}</span>
      <input class="${INPUT}" placeholder="아이콘 검색..." value="" />
    </div>
    <div class="${GRID}">${cells(0, 32)}</div>
  </div>
</div>`,
  },

  {
    title: "검색 결과 limit (footer 안내)",
    description:
      "MAX_VISIBLE = 100. 검색 매칭 100건 초과 시 footer에 '총 N개 중 100개 표시' caption — 추가 검색어 유도.",
    jsx: `<IconPicker value="star" placeholder="아이콘 검색..." />`,
    render: () => `<div class="${CONTENT}" style="margin: 0;">
    <div class="${SEARCH_WRAP}">
      <span class="${SEARCH_ICON}">${SEARCH_SVG}</span>
      <input class="${INPUT}" placeholder="아이콘 검색..." value="a" />
    </div>
    <div class="${GRID}">${cells(-1, 24)}</div>
    <div class="${FOOTER}">총 142개 중 100개 표시 — 더 자세히 검색해주세요</div>
  </div>`,
  },

  {
    title: "Small (32 trigger / w-72 popover)",
    description: "inline 사용 — toolbar / row 안 작은 trigger. size='sm'.",
    jsx: `<IconPicker size="sm" value="heart" onChange={onPick} />`,
    render: () => `<div style="display:flex; align-items:flex-start; gap:var(--spacing-md);">
  <button class="flex h-8 w-8 items-center justify-center rounded-md border border-border-default bg-surface-default shadow-sm">${HEART}</button>
</div>`,
  },
];
