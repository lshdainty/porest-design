/*
 * shadcn Collapsible 예제 — collapsible.md SoT 정합.
 * 시각 spec은 자유(primitive) — 사용처 톤 그대로. 타이포 위계(title/body/caption)로
 * main과 보조 정보 구분, 본문 흐름에 자연 녹아드는 인라인 disclosure 패턴.
 * 정적 HTML preview는 open 상태를 보여줌.
 */

const CHEVRON_DOWN =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform var(--motion-duration-base) var(--motion-ease-out); transform:rotate(180deg);"><polyline points="6 9 12 15 18 9"/></svg>';

const CHEVRON_RIGHT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

export const collapsibleExamples = [
  {
    title: "결제 혜택 (Toss 톤)",
    description: "main(`결제 금액` title-md, `혜택 적용` body-md success)은 항상 가시. `▸ 혜택 자세히` Trigger 펼치면 내역 list(body-sm secondary) 노출. 인라인 disclosure — 본문 흐름 유지.",
    jsx: `<div className="flex flex-col gap-[var(--spacing-md)] p-[var(--spacing-lg)] bg-surface-default border border-border-default rounded-md max-w-md">
  <div className="flex justify-between items-baseline">
    <span className="text-body-md text-text-secondary">결제 금액</span>
    <span className="text-title-md font-semibold text-text-primary">23,800원</span>
  </div>
  <div className="flex justify-between items-baseline">
    <span className="text-body-md text-text-secondary">적용된 혜택</span>
    <span className="text-body-md font-medium text-success">-2,400원</span>
  </div>
  <Collapsible defaultOpen>
    <CollapsibleTrigger className="flex items-center gap-[var(--spacing-xs)] text-label-md font-medium text-text-primary [&[data-state=open]>svg]:rotate-180">
      <ChevronDown className="h-4 w-4 transition-transform duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] -rotate-90" />
      혜택 자세히
    </CollapsibleTrigger>
    <CollapsibleContent className="flex flex-col gap-[var(--spacing-xs)] pt-[var(--spacing-sm)] pl-[var(--spacing-lg)]">
      <div className="flex justify-between text-body-sm text-text-secondary">
        <span>회원 적립</span><span>-1,000원</span>
      </div>
      <div className="flex justify-between text-body-sm text-text-secondary">
        <span>결제수단 혜택</span><span>-800원</span>
      </div>
      <div className="flex justify-between text-body-sm text-text-secondary">
        <span>쿠폰 적용</span><span>-600원</span>
      </div>
    </CollapsibleContent>
  </Collapsible>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-md); padding:var(--spacing-lg); background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); max-width:448px;">
  <div style="display:flex; justify-content:space-between; align-items:baseline;">
    <span style="font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-secondary);">결제 금액</span>
    <span style="font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:var(--text-title-md--font-weight); color:var(--color-text-primary);">23,800원</span>
  </div>
  <div style="display:flex; justify-content:space-between; align-items:baseline;">
    <span style="font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-secondary);">적용된 혜택</span>
    <span style="font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); font-weight:500; color:var(--color-success);">-2,400원</span>
  </div>
  <div>
    <button type="button" style="display:inline-flex; align-items:center; gap:var(--spacing-xs); background:transparent; border:0; padding:0; cursor:pointer; font-family:inherit; font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary);">
      ${CHEVRON_DOWN}
      혜택 자세히
    </button>
    <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); padding-top:var(--spacing-sm); padding-left:var(--spacing-lg);">
      <div style="display:flex; justify-content:space-between; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">
        <span>회원 적립</span><span>-1,000원</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">
        <span>결제수단 혜택</span><span>-800원</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">
        <span>쿠폰 적용</span><span>-600원</span>
      </div>
    </div>
  </div>
</div>`,
  },

  {
    title: "고급 옵션 (form 패턴)",
    description: "필수 필드(`label-md` Label + Input)는 항상 가시. `▸ 고급 옵션 (선택)` Trigger — 평균 사용자는 접힌 상태로 진입, power user만 펼쳐서 추가 input 그룹 노출. 본문 form 흐름 그대로 유지.",
    jsx: `<form className="flex flex-col gap-[var(--spacing-md)] max-w-md">
  <div className="flex flex-col gap-[var(--spacing-xs)]">
    <Label htmlFor="title">제목</Label>
    <Input id="title" placeholder="할일 제목" />
  </div>
  <Collapsible>
    <CollapsibleTrigger className="flex items-center gap-[var(--spacing-xs)] text-label-md font-medium text-text-secondary hover:text-text-primary transition-colors duration-[var(--motion-duration-fast)] [&[data-state=open]>svg]:rotate-90">
      <ChevronRight className="h-4 w-4 transition-transform duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)]" />
      고급 옵션 (선택)
    </CollapsibleTrigger>
    <CollapsibleContent className="flex flex-col gap-[var(--spacing-md)] pt-[var(--spacing-md)]">
      <div className="flex flex-col gap-[var(--spacing-xs)]">
        <Label htmlFor="priority">우선순위</Label>
        <Select id="priority">{/* ... */}</Select>
      </div>
      <div className="flex flex-col gap-[var(--spacing-xs)]">
        <Label htmlFor="tags">태그</Label>
        <Input id="tags" placeholder="쉼표로 구분" />
      </div>
    </CollapsibleContent>
  </Collapsible>
</form>`,
    render: () => `<form style="display:flex; flex-direction:column; gap:var(--spacing-md); max-width:448px;">
  <div style="display:flex; flex-direction:column; gap:var(--spacing-xs);">
    <label style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary);">제목</label>
    <input type="text" placeholder="할일 제목" style="height:40px; padding:var(--spacing-sm) var(--spacing-md); background:var(--color-surface-input); border:1px solid var(--color-border-default); border-radius:var(--radius-md); font-family:inherit; font-size:var(--text-body-md); color:var(--color-text-primary);"/>
  </div>
  <div>
    <button type="button" style="display:inline-flex; align-items:center; gap:var(--spacing-xs); background:transparent; border:0; padding:0; cursor:pointer; font-family:inherit; font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-secondary);">
      ${CHEVRON_RIGHT}
      고급 옵션 (선택)
    </button>
  </div>
</form>`,
  },

  {
    title: "본문 더보기 (인라인)",
    description: "긴 본문(`text-body-md` 1.6) 미리보기 + `▸ 더 보기`로 나머지 펼침. Notion toggle / Instagram caption 톤 — main에 자연 녹아드는 가벼운 disclosure.",
    jsx: `<article className="max-w-md text-body-md text-text-primary leading-[1.6]">
  <p>
    Porest 디자인 시스템은 사람과 일상이 숲처럼 자라나는 두 서비스의 단일 디자인 베이스입니다.
    Toss 톤을 레퍼런스로 — 절제된 신뢰감, 전 연령 범용...
  </p>
  <Collapsible>
    <CollapsibleTrigger className="text-label-md font-medium text-primary hover:underline mt-[var(--spacing-sm)]">
      더 보기
    </CollapsibleTrigger>
    <CollapsibleContent className="pt-[var(--spacing-sm)]">
      <p>
        HR과 Desk는 neutral·semantic 토큰을 공유하지만, primary와 primary-light는 brand-specific —
        \`#357B5F\`(forest green) 대 \`#0147AD\`(cobalt blue).
      </p>
    </CollapsibleContent>
  </Collapsible>
</article>`,
    render: () => `<article style="max-width:448px; font-size:var(--text-body-md); line-height:1.6; color:var(--color-text-primary);">
  <p style="margin:0;">
    Porest 디자인 시스템은 사람과 일상이 숲처럼 자라나는 두 서비스의 단일 디자인 베이스입니다.
    Toss 톤을 레퍼런스로 — 절제된 신뢰감, 전 연령 범용...
  </p>
  <p style="margin:var(--spacing-sm) 0 0;">
    HR과 Desk는 neutral·semantic 토큰을 공유하지만, primary와 primary-light는 brand-specific —
    <code style="font-family:ui-monospace, monospace;">#357B5F</code>(forest green) 대
    <code style="font-family:ui-monospace, monospace;">#0147AD</code>(cobalt blue).
  </p>
  <button type="button" style="display:inline-block; background:transparent; border:0; padding:0; margin-top:var(--spacing-sm); cursor:pointer; font-family:inherit; font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-primary, var(--color-text-primary));">
    접기
  </button>
</article>`,
  },
];
