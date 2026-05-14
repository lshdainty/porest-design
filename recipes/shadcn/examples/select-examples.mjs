/*
 * shadcn Select 예제 — 정적 HTML preview는 trigger와 (선택) 열린 content 시각만.
 */

// select.tsx의 SelectTrigger className과 1:1 동기 — preview-html `.form-select` SoT.
// placeholder 시각: Radix SelectValue는 빈 값일 때 trigger에 `data-placeholder` attr를 노출 —
// `data-[placeholder]:text-text-tertiary`로 native placeholder와 동일 톤 강제.
const TRIGGER =
  "flex h-10 items-center justify-between rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary placeholder:text-text-tertiary data-[placeholder]:text-text-tertiary transition-[color,background-color,border-color,box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]";

const CONTENT =
  "z-[200] max-h-96 min-w-[8rem] overflow-hidden rounded-sm border border-border-default bg-surface-default shadow-md p-1";

const ITEM_BASE =
  "relative flex w-full items-center rounded-xs py-[var(--spacing-xs)] pl-8 pr-[var(--spacing-sm)] text-body-md text-text-primary";

const ITEM_FOCUSED = "bg-surface-input";

const LABEL =
  "py-[var(--spacing-xs)] pl-8 pr-[var(--spacing-sm)] text-label-sm font-medium text-text-secondary";

const SEP = "margin:var(--spacing-xs) calc(-1 * var(--spacing-xs)); height:1px; background:var(--color-border-default);";

const CHEVRON_DOWN =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-text-tertiary);"><polyline points="6 9 12 15 18 9"/></svg>';

const CHECK =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

function indicator() {
  return `<span style="position:absolute; left:8px; display:flex; height:14px; width:14px; align-items:center; justify-content:center;">${CHECK}</span>`;
}

export const selectExamples = [
  {
    title: "Default",
    description: "기본 selectbox — 단일 선택. placeholder + 옵션 리스트.",
    jsx: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="과일 선택" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">사과</SelectItem>
    <SelectItem value="banana">바나나</SelectItem>
    <SelectItem value="blueberry">블루베리</SelectItem>
    <SelectItem value="grapes">포도</SelectItem>
    <SelectItem value="pineapple">파인애플</SelectItem>
  </SelectContent>
</Select>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:4px; width:180px;">
  <button class="${TRIGGER}" style="width:180px;">
    <span style="color:var(--color-text-tertiary);">과일 선택</span>
    ${CHEVRON_DOWN}
  </button>
  <div class="${CONTENT}" style="width:180px;">
    <div class="${ITEM_BASE} ${ITEM_FOCUSED}">${indicator()}사과</div>
    <div class="${ITEM_BASE}">바나나</div>
    <div class="${ITEM_BASE}">블루베리</div>
    <div class="${ITEM_BASE}">포도</div>
    <div class="${ITEM_BASE}">파인애플</div>
  </div>
</div>`,
  },

  {
    title: "Grouped",
    description: "SelectGroup + SelectLabel + SelectSeparator로 카테고리 분리.",
    jsx: `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="시간대 선택" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>북미</SelectLabel>
      <SelectItem value="est">동부 (EST)</SelectItem>
      <SelectItem value="cst">중부 (CST)</SelectItem>
      <SelectItem value="pst">태평양 (PST)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>아시아</SelectLabel>
      <SelectItem value="kst">서울 (KST)</SelectItem>
      <SelectItem value="jst">도쿄 (JST)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:4px; width:200px;">
  <button class="${TRIGGER}" style="width:200px;">
    <span style="color:var(--color-text-primary);">서울 (KST)</span>
    ${CHEVRON_DOWN}
  </button>
  <div class="${CONTENT}" style="width:200px;">
    <div class="${LABEL}">북미</div>
    <div class="${ITEM_BASE}">동부 (EST)</div>
    <div class="${ITEM_BASE}">중부 (CST)</div>
    <div class="${ITEM_BASE}">태평양 (PST)</div>
    <div style="${SEP}"></div>
    <div class="${LABEL}">아시아</div>
    <div class="${ITEM_BASE} ${ITEM_FOCUSED}">${indicator()}서울 (KST)</div>
    <div class="${ITEM_BASE}">도쿄 (JST)</div>
  </div>
</div>`,
  },
];
