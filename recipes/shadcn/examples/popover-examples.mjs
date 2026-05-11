/*
 * shadcn Popover 예제 — popover.tsx와 1:1 동기.
 * preview `.pop` / `.pop-trigger` / `.pop textarea` / `.pop-actions` SoT 정합:
 *   Content: radius-md + padding-md + shadow-md + border + flex-col gap-sm
 *   Trigger (compact pill): surface-input + border + radius-md + caption + xs/sm padding
 *   Inner textarea: input spec 톤 (surface-input + body-md + radius-sm)
 *   Actions: flex justify-end gap-xs
 */

// popover.tsx PopoverContent와 1:1 동기 (preview `.pop` SoT)
const POPOVER =
  "z-50 w-72 flex flex-col gap-[var(--spacing-sm)] rounded-md border border-border-default bg-surface-default p-[var(--spacing-md)] text-text-primary shadow-md";

// preview `.pop-trigger` — compact pill trigger (caption font + surface-input fill)
const POPOVER_TRIGGER =
  "inline-flex items-center gap-[var(--spacing-xs)] bg-surface-input border border-border-default rounded-md px-[var(--spacing-sm)] py-[var(--spacing-xs)] font-sans text-caption text-text-primary cursor-pointer transition-[background-color,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]";

// 일반 Button outline — 최신 Button BASE와 동기
const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-10 px-[var(--spacing-md)] text-body-md";

const BTN_PRIMARY_SM =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] bg-primary text-text-on-accent shadow-sm hover:brightness-105 h-8 px-[var(--spacing-md)] text-caption";

const BTN_OUTLINE_SM =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-8 px-[var(--spacing-md)] text-caption";

// 최신 Input BASE와 동기 — bg-surface-input + body-md + token padding + font-sans
const INPUT_BASE =
  "flex h-10 w-full rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary";

const TEXTAREA_BASE =
  "flex w-full rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary resize-y";

const CHEVRON =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-text-tertiary);"><polyline points="6 9 12 15 18 9"/></svg>';

export const popoverExamples = [
  {
    title: "Interactive (preview 톤)",
    description:
      "preview `Popover — interactive` 시나리오: compact pill trigger + textarea + 취소/제출 액션. 카테고리 빠른 변경 같은 인라인 편집 패턴.",
    jsx: `<Popover>
  <PopoverTrigger className="inline-flex items-center gap-1 bg-surface-input border border-border-default rounded-md px-2 py-1 text-caption">
    카테고리 빠른 변경
    <ChevronDown className="h-3 w-3 text-text-tertiary" />
  </PopoverTrigger>
  <PopoverContent>
    <Textarea rows={3} placeholder="의견을 입력하세요" />
    <div className="flex justify-end gap-[var(--spacing-xs)]">
      <Button variant="outline" size="sm">취소</Button>
      <Button size="sm">제출</Button>
    </div>
  </PopoverContent>
</Popover>`,
    render: () => `<div style="display:inline-flex; flex-direction:column; align-items:flex-start; gap:var(--spacing-xs);">
  <button class="${POPOVER_TRIGGER}">
    <span>카테고리 빠른 변경</span>
    ${CHEVRON}
  </button>
  <div class="${POPOVER}" style="width:340px;">
    <textarea class="${TEXTAREA_BASE}" rows="3" placeholder="의견을 입력하세요"></textarea>
    <div style="display:flex; justify-content:flex-end; gap:var(--spacing-xs);">
      <button class="${BTN_OUTLINE_SM}">취소</button>
      <button class="${BTN_PRIMARY_SM}">제출</button>
    </div>
  </div>
</div>`,
  },

  {
    title: "Settings (heading + body)",
    description: "일반 outline button trigger + 정보성 콘텐츠. 짧은 설정 패널 패턴.",
    jsx: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">설정 열기</Button>
  </PopoverTrigger>
  <PopoverContent>
    <h4 className="font-semibold text-title-sm">레이아웃 설정</h4>
    <p className="text-body-sm text-text-secondary">너비를 조정하세요.</p>
  </PopoverContent>
</Popover>`,
    render: () => `<div style="display:inline-flex; flex-direction:column; align-items:flex-start; gap:var(--spacing-xs);">
  <button class="${BTN_OUTLINE}">설정 열기</button>
  <div class="${POPOVER}">
    <h4 style="margin:0; font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);">레이아웃 설정</h4>
    <p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">너비를 조정하세요.</p>
  </div>
</div>`,
  },

  {
    title: "Form in popover",
    description: "팝오버 안에서 form input — 빠른 인라인 편집. trigger는 일반 outline button.",
    jsx: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">크기 조정</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="flex flex-col gap-[var(--spacing-xs)]">
      <h4 className="font-semibold text-title-sm">Dimensions</h4>
      <p className="text-body-sm text-text-secondary">컨테이너 크기를 픽셀로 입력.</p>
    </div>
    <div className="flex flex-col gap-[var(--spacing-sm)]">
      <div className="grid grid-cols-3 items-center gap-[var(--spacing-md)]">
        <Label htmlFor="width">너비</Label>
        <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
      </div>
      <div className="grid grid-cols-3 items-center gap-[var(--spacing-md)]">
        <Label htmlFor="height">높이</Label>
        <Input id="height" defaultValue="240px" className="col-span-2 h-8" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,
    render: () => `<div style="display:inline-flex; flex-direction:column; align-items:flex-start; gap:var(--spacing-xs);">
  <button class="${BTN_OUTLINE}">크기 조정</button>
  <div class="${POPOVER}" style="width:320px;">
    <div style="display:flex; flex-direction:column; gap:var(--spacing-xs);">
      <h4 style="margin:0; font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);">Dimensions</h4>
      <p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">컨테이너 크기를 픽셀로 입력.</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
      <div style="display:grid; grid-template-columns:1fr 2fr; align-items:center; gap:var(--spacing-md);">
        <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">너비</label>
        <input class="${INPUT_BASE}" style="height:32px;" value="100%" />
      </div>
      <div style="display:grid; grid-template-columns:1fr 2fr; align-items:center; gap:var(--spacing-md);">
        <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">높이</label>
        <input class="${INPUT_BASE}" style="height:32px;" value="240px" />
      </div>
    </div>
  </div>
</div>`,
  },
];
