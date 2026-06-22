/*
 * shadcn Card 예제 — card.tsx의 className과 동기 유지.
 */

// card.tsx와 1:1 동기 — preview `.review-*` SoT 정합:
//   rounded-lg + shadow-sm (border 없음) + p-[lg→md:xl] (responsive) + gap-[var(--spacing-xs)].
// box-shadow는 inline style로 var(--shadow-sm) 직접 인용 (Tailwind utility는
// 다크 모드 CSS 변수 override를 우회하는 문제 fix — card.tsx 동기).
// v4: padding mobile lg(16) / desktop md+ xl(24) — Toss 톤 mobile-first 정합.
const CARD =
  "rounded-lg bg-surface-default text-text-primary";
const CARD_SHADOW = "box-shadow:var(--shadow-sm);";
const HEADER = "flex flex-col gap-[var(--spacing-xs)] p-[var(--spacing-lg)] md:p-[var(--spacing-xl)]";
const TITLE = "text-title-md leading-none tracking-tight text-text-primary";
const DESC = "text-body-sm text-text-secondary";
// first-child(standalone Card)일 땐 full padding, CardHeader 다음일 땐 pt-0 으로 자연 연결.
const CONTENT = "p-[var(--spacing-lg)] md:p-[var(--spacing-xl)] [&:not(:first-child)]:pt-0";
const FOOTER = "flex items-center p-[var(--spacing-lg)] md:p-[var(--spacing-xl)] [&:not(:first-child)]:pt-0";

// 최신 Button BASE와 일관 (font-sans + token padding + motion transition).
const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] disabled:pointer-events-none disabled:opacity-50 bg-primary text-text-on-accent shadow-sm hover:brightness-105 h-10 px-[var(--spacing-md)] text-body-md";
const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] disabled:pointer-events-none disabled:opacity-50 border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-10 px-[var(--spacing-md)] text-body-md";

export const cardExamples = [
  {
    title: "Default",
    description: "기본 composition — Header + Content + Footer.",
    jsx: `<Card className="max-w-md">
  <CardHeader>
    <CardTitle>회의록 작성</CardTitle>
    <CardDescription>주간 회의 내용을 정리하세요.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-body-md">참석자 4명, 안건 5개 — 12분 분량.</p>
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline">취소</Button>
    <Button>저장</Button>
  </CardFooter>
</Card>`,
    render: () => `<div class="${CARD}" style="${CARD_SHADOW} max-width:448px;">
  <div class="${HEADER}">
    <h3 class="${TITLE}">회의록 작성</h3>
    <p class="${DESC}">주간 회의 내용을 정리하세요.</p>
  </div>
  <div class="${CONTENT}">
    <p style="margin:0; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary);">참석자 4명, 안건 5개 — 12분 분량.</p>
  </div>
  <div class="${FOOTER}" style="justify-content:flex-end; gap:var(--spacing-sm);">
    <button class="${BTN_OUTLINE}">취소</button>
    <button class="${BTN_PRIMARY}">저장</button>
  </div>
</div>`,
  },

  {
    title: "Stat card",
    description: "큰 숫자(KPI) — display 토큰 사용.",
    jsx: `<Card className="max-w-xs">
  <CardHeader>
    <CardDescription>이번 달 출근율</CardDescription>
    <CardTitle className="text-display-md">87.3%</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-label-sm text-success">전월 대비 +2.1%p</p>
  </CardContent>
</Card>`,
    render: () => `<div class="${CARD}" style="${CARD_SHADOW} max-width:320px;">
  <div class="${HEADER}">
    <p class="${DESC}">이번 달 출근율</p>
    <h3 style="margin:0; font-size:var(--text-display-md); line-height:var(--text-display-md--line-height); font-weight:var(--text-display-md--font-weight); letter-spacing:var(--text-display-md--letter-spacing); color:var(--color-text-primary);">87.3%</h3>
  </div>
  <div class="${CONTENT}">
    <p style="margin:0; font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-success);">전월 대비 +2.1%p</p>
  </div>
</div>`,
  },

  {
    title: "Action card (HR 시나리오)",
    description: "행 형태 — 좌측 정보 + 우측 액션 버튼.",
    jsx: `<Card className="max-w-xl">
  <CardContent className="flex items-center justify-between p-6">
    <div className="flex flex-col gap-1">
      <span className="text-title-sm font-semibold">5월 휴가 신청</span>
      <span className="text-label-sm text-text-secondary">김지원 · 5/12 ~ 5/14 · 연차 3일</span>
    </div>
    <div className="flex gap-2">
      <Button size="sm">승인</Button>
      <Button variant="destructive" size="sm">반려</Button>
    </div>
  </CardContent>
</Card>`,
    render: () => `<div class="${CARD}" style="${CARD_SHADOW} max-width:576px;">
  <div style="display:flex; align-items:center; justify-content:space-between; padding:var(--spacing-xl);">
    <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); min-width:0;">
      <span style="font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">5월 휴가 신청</span>
      <span style="font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-text-secondary);">김지원 · 5/12 ~ 5/14 · 연차 3일</span>
    </div>
    <div style="display:flex; gap:var(--spacing-sm);">
      <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors bg-primary text-text-on-accent shadow-sm hover:brightness-105 h-8 px-3 text-label-sm">승인</button>
      <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors bg-error text-text-on-accent shadow-sm hover:brightness-105 h-8 px-3 text-label-sm">반려</button>
    </div>
  </div>
</div>`,
  },

  {
    title: "Memo card (Desk 시나리오)",
    description: "메모 + 메타 + 태그 — 콘텐츠 카드 패턴.",
    jsx: `<Card className="max-w-md">
  <CardHeader>
    <div className="flex items-center justify-between">
      <Badge variant="outline">회고</Badge>
      <span className="text-caption text-text-tertiary">5/10 · 어제</span>
    </div>
    <CardTitle>5월 회고: 일관성 있는 글쓰기</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-body-md text-text-secondary">
      매일 같은 시간에 30분씩 글을 쓰니 흐름이 잡힌다. 토요일은 주간 정리만.
    </p>
  </CardContent>
</Card>`,
    render: () => `<div class="${CARD}" style="${CARD_SHADOW} max-width:448px;">
  <div class="${HEADER}">
    <div style="display:flex; align-items:center; justify-content:space-between;">
      <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-badge font-semibold border-border-default text-text-primary">회고</div>
      <span style="font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-tertiary);">5/10 · 어제</span>
    </div>
    <h3 class="${TITLE}">5월 회고: 일관성 있는 글쓰기</h3>
  </div>
  <div class="${CONTENT}">
    <p style="margin:0; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-secondary);">매일 같은 시간에 30분씩 글을 쓰니 흐름이 잡힌다. 토요일은 주간 정리만.</p>
  </div>
</div>`,
  },

  {
    title: "Bordered variant (v5)",
    description: "border-subtle + shadow 없음 — dense info 카드 (선택 기간 hint, chart 내 sub-card).",
    jsx: `<Card variant="bordered" className="max-w-md">
  <CardContent>
    <div className="flex items-center gap-3">
      <CalendarClock className="text-text-secondary" size={16} />
      <div className="flex-1">
        <div className="text-caption text-text-tertiary mb-0.5">선택 기간</div>
        <div className="text-body-sm font-semibold text-text-primary">2025.06.01 ~ 2026.07.04 <span className="text-text-tertiary font-normal">(399일)</span></div>
      </div>
      <div className="flex items-center gap-1 text-text-secondary text-caption font-semibold">
        <Pencil size={14} /> 변경
      </div>
    </div>
  </CardContent>
</Card>`,
    render: () => `<div class="${CARD} border border-border-subtle" style="max-width:448px;">
  <div class="${CONTENT}">
    <div style="display:flex; align-items:center; gap:12px;">
      <span style="display:inline-flex; color:var(--color-text-secondary);">📅</span>
      <div style="flex:1; min-width:0;">
        <div style="font-size:var(--text-caption); color:var(--color-text-tertiary); margin-bottom:2px;">선택 기간</div>
        <div style="font-size:var(--text-body-sm); font-weight:600; color:var(--color-text-primary);">2025.06.01 ~ 2026.07.04 <span style="color:var(--color-text-tertiary); font-weight:400;">(399일)</span></div>
      </div>
      <div style="display:flex; align-items:center; gap:4px; color:var(--color-text-secondary); font-size:var(--text-caption); font-weight:600;">
        <span>✏️</span> 변경
      </div>
    </div>
  </div>
</div>`,
  },

  {
    title: "Muted variant (v6)",
    description: "bg-muted fill + border·shadow 없음 — 다이얼로그/시트 위 sunken 톤 info 박스 (구독 스포트라이트, day-detail 합계).",
    jsx: `<Card variant="muted" className="max-w-md">
  <CardContent>
    <div className="flex items-center justify-between">
      <span className="text-body-sm text-text-secondary">이번 달 합계</span>
      <span className="text-title-sm font-bold text-text-primary">₩1,284,000</span>
    </div>
  </CardContent>
</Card>`,
    render: () => `<div class="${CARD}" style="background:var(--color-surface-input); max-width:448px;">
  <div class="${CONTENT}">
    <div style="display:flex; align-items:center; justify-content:space-between;">
      <span style="font-size:var(--text-body-sm); color:var(--color-text-secondary);">이번 달 합계</span>
      <span style="font-size:var(--text-title-sm); font-weight:700; color:var(--color-text-primary);">₩1,284,000</span>
    </div>
  </div>
</div>`,
  },

  {
    title: "Brand variant (v6)",
    description: "bg-brand-subtle + 1px border-brand + shadow 없음 — 브랜드 틴트 강조 ('현재 플랜' 배너, selected/active). 보더는 사용처에서 border-brand-soft 로 은은하게 override 가능.",
    jsx: `<Card variant="brand" className="max-w-md">
  <CardContent>
    <div className="flex items-center gap-3">
      <span className="inline-flex size-11 items-center justify-center rounded-md bg-[var(--bg-brand)] text-[var(--fg-on-brand)]">
        <Sparkles size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-body-md font-bold text-text-primary">Porest Pro 이용 중</div>
        <div className="text-caption text-text-secondary mt-0.5">다음 결제 2026-07-04 · 9,900원</div>
      </div>
    </div>
  </CardContent>
</Card>`,
    render: () => `<div class="${CARD}" style="background:color-mix(in srgb, var(--color-primary) 8%, var(--color-surface-default)); border:1px solid var(--color-primary); max-width:448px;">
  <div class="${CONTENT}">
    <div style="display:flex; align-items:center; gap:12px;">
      <span style="display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:var(--radius-md); background:var(--color-primary); color:var(--color-text-on-accent);">✨</span>
      <div style="flex:1; min-width:0;">
        <div style="font-size:var(--text-body-md); font-weight:700; color:var(--color-text-primary);">Porest Pro 이용 중</div>
        <div style="font-size:var(--text-caption); color:var(--color-text-secondary); margin-top:2px;">다음 결제 2026-07-04 · 9,900원</div>
      </div>
    </div>
  </div>
</div>`,
  },
];
