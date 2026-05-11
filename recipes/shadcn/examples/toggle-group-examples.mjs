/*
 * shadcn ToggleGroup 예제 — toggle-group.tsx의 className과 1:1 동기.
 * preview-html `.tgg` / `.tgg-item` / `.tgg-item--active` SoT 정합:
 *   segmented connected group — Root: border + radius-md + overflow-hidden + divide-x
 *   Item: borderless, active 시 bg-surface-input + text-primary
 */

const ITEM_BASE =
  "inline-flex items-center justify-center gap-[var(--spacing-xs)] text-caption font-semibold text-text-secondary hover:bg-surface-input hover:text-text-primary transition-[color,background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] rounded-none border-0";

const SIZE_DEFAULT = "px-[var(--spacing-md)] py-[var(--spacing-xs)] min-h-8";

const STATE_ON = "bg-surface-input text-text-primary";

const GROUP_ROOT =
  "inline-flex items-center border border-border-default rounded-md overflow-hidden divide-x divide-border-default";

const ALIGN_LEFT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>';
const ALIGN_CENTER =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>';
const ALIGN_RIGHT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>';

const BOLD =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/></svg>';
const ITALIC =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>';
const UNDERLINE =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>';

export const toggleGroupExamples = [
  {
    title: "Single (list / grid / card)",
    description:
      "preview `.tgg` segmented 톤 — 단일 outer border + 항목 사이 vertical separator(divide-x). 한 번에 하나만 선택.",
    jsx: `<ToggleGroup type="single" defaultValue="grid">
  <ToggleGroupItem value="list">list</ToggleGroupItem>
  <ToggleGroupItem value="grid">grid</ToggleGroupItem>
  <ToggleGroupItem value="card">card</ToggleGroupItem>
</ToggleGroup>`,
    render: () => `<div class="${GROUP_ROOT}">
  <button class="${ITEM_BASE} ${SIZE_DEFAULT}" aria-pressed="false">list</button>
  <button class="${ITEM_BASE} ${SIZE_DEFAULT} ${STATE_ON}" aria-pressed="true" data-state="on">grid</button>
  <button class="${ITEM_BASE} ${SIZE_DEFAULT}" aria-pressed="false">card</button>
</div>`,
  },

  {
    title: "Single (alignment)",
    description: "정렬 같은 mutually exclusive 옵션. type='single'.",
    jsx: `<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left" aria-label="왼쪽 정렬"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="가운데 정렬"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="오른쪽 정렬"><AlignRight /></ToggleGroupItem>
</ToggleGroup>`,
    render: () => `<div class="${GROUP_ROOT}">
  <button class="${ITEM_BASE} ${SIZE_DEFAULT}" aria-label="왼쪽 정렬">${ALIGN_LEFT}</button>
  <button class="${ITEM_BASE} ${SIZE_DEFAULT} ${STATE_ON}" aria-label="가운데 정렬" data-state="on">${ALIGN_CENTER}</button>
  <button class="${ITEM_BASE} ${SIZE_DEFAULT}" aria-label="오른쪽 정렬">${ALIGN_RIGHT}</button>
</div>`,
  },

  {
    title: "Multiple (text format)",
    description: "여러 개 동시 선택. type='multiple' — 굵게/이탤릭/밑줄 같은 독립 옵션.",
    jsx: `<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold" aria-label="굵게"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="이탤릭"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="밑줄"><Underline /></ToggleGroupItem>
</ToggleGroup>`,
    render: () => `<div class="${GROUP_ROOT}">
  <button class="${ITEM_BASE} ${SIZE_DEFAULT} ${STATE_ON}" aria-label="굵게" data-state="on">${BOLD}</button>
  <button class="${ITEM_BASE} ${SIZE_DEFAULT}" aria-label="이탤릭">${ITALIC}</button>
  <button class="${ITEM_BASE} ${SIZE_DEFAULT} ${STATE_ON}" aria-label="밑줄" data-state="on">${UNDERLINE}</button>
</div>`,
  },
];
