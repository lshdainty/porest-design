/*
 * shadcn Toggle 예제 — toggle.tsx의 cva와 1:1 동기.
 * preview-html `.tg` / `.tg--on` SoT 정합:
 *   text-caption(12) / font-semibold(600) / rounded-md / padding xs md
 *   off: bg-transparent + text-secondary / on: bg-surface-input + text-primary + border-strong
 */

const TOGGLE_BASE =
  "inline-flex items-center justify-center gap-[var(--spacing-xs)] rounded-md text-caption font-semibold text-text-secondary hover:bg-surface-input hover:text-text-primary transition-[color,background-color,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]";

const SIZE_DEFAULT = "px-[var(--spacing-md)] py-[var(--spacing-xs)] min-h-8";
const SIZE_SM = "px-[var(--spacing-sm)] py-[var(--spacing-xs)] min-h-7";
const SIZE_LG = "px-[var(--spacing-lg)] py-[var(--spacing-sm)] min-h-10";

const VARIANT_OUTLINE = "border border-border-default";
const STATE_ON = "bg-surface-input text-text-primary";
const STATE_ON_OUTLINE = "bg-surface-input text-text-primary border-border-strong";
const STATE_OFF = "";

const STAR =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
const HEART =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

const BOLD =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/></svg>';

const ITALIC =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>';

export const toggleExamples = [
  {
    title: "Default (outline + label)",
    description:
      "preview `.tg` 톤 — 독립 toggle. outline variant + active 시 surface-input 채움 + border-strong + bold.",
    jsx: `<div className="flex gap-2">
  <Toggle variant="outline" defaultPressed aria-label="즐겨찾기">
    <Star className="h-4 w-4" /> 즐겨찾기
  </Toggle>
  <Toggle variant="outline" aria-label="보관">
    <Heart className="h-4 w-4" /> 보관
  </Toggle>
</div>`,
    render: () => `<div style="display:flex; gap:var(--spacing-sm);">
  <button class="${TOGGLE_BASE} ${SIZE_DEFAULT} ${VARIANT_OUTLINE} ${STATE_ON_OUTLINE}" aria-label="즐겨찾기" data-state="on">${STAR}<span>즐겨찾기</span></button>
  <button class="${TOGGLE_BASE} ${SIZE_DEFAULT} ${VARIANT_OUTLINE}" aria-label="보관">${HEART}<span>보관</span></button>
</div>`,
  },

  {
    title: "Default (icon-only — toolbar 톤)",
    description:
      "borderless default variant — 텍스트 편집기 toolbar 같은 형식 토글에 적합.",
    jsx: `<Toggle aria-label="굵게">
  <Bold className="h-4 w-4" />
</Toggle>`,
    render: () => `<div style="display:flex; gap:var(--spacing-sm);">
  <button class="${TOGGLE_BASE} ${SIZE_DEFAULT}" aria-label="굵게">${BOLD}</button>
  <button class="${TOGGLE_BASE} ${SIZE_DEFAULT} ${STATE_ON}" aria-label="굵게" data-state="on">${BOLD}</button>
</div>`,
  },

  {
    title: "Sizes",
    description: "size — sm / default / lg. padding과 min-height만 분기.",
    jsx: `<div className="flex items-center gap-2">
  <Toggle variant="outline" size="sm" aria-label="굵게"><Bold /></Toggle>
  <Toggle variant="outline" size="default" aria-label="굵게"><Bold /></Toggle>
  <Toggle variant="outline" size="lg" aria-label="굵게"><Bold /></Toggle>
</div>`,
    render: () => `<div style="display:flex; align-items:center; gap:var(--spacing-sm);">
  <button class="${TOGGLE_BASE} ${SIZE_SM} ${VARIANT_OUTLINE}" aria-label="굵게">${BOLD}</button>
  <button class="${TOGGLE_BASE} ${SIZE_DEFAULT} ${VARIANT_OUTLINE}" aria-label="굵게">${BOLD}</button>
  <button class="${TOGGLE_BASE} ${SIZE_LG} ${VARIANT_OUTLINE}" aria-label="굵게">${BOLD}</button>
</div>`,
  },

  {
    title: "With text",
    description: "아이콘 + 텍스트 — 형식 토글에 자주 사용.",
    jsx: `<Toggle aria-label="이탤릭">
  <Italic className="h-4 w-4" />
  이탤릭
</Toggle>`,
    render: () => `<button class="${TOGGLE_BASE} ${SIZE_DEFAULT}" aria-label="이탤릭">${ITALIC}<span>이탤릭</span></button>`,
  },
];
