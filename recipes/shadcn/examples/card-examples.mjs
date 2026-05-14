/*
 * shadcn Card 예제 — card.tsx의 className과 동기 유지.
 */

// card.tsx와 1:1 동기 — preview `.review-*` SoT 정합:
//   rounded-lg + shadow-sm (border 없음) + p-[var(--spacing-xl)] + gap-[var(--spacing-xs)].
// box-shadow는 inline style로 var(--shadow-sm) 직접 인용 (Tailwind utility는
// 다크 모드 CSS 변수 override를 우회하는 문제 fix — card.tsx 동기).
const CARD =
  "rounded-lg bg-surface-default text-text-primary";
const CARD_SHADOW = "box-shadow:var(--shadow-sm);";
const HEADER = "flex flex-col gap-[var(--spacing-xs)] p-[var(--spacing-xl)]";
const TITLE = "text-title-md leading-none tracking-tight text-text-primary";
const DESC = "text-body-sm text-text-secondary";
// first-child(standalone Card)일 땐 full p-xl, CardHeader 다음일 땐 pt-0 으로 자연 연결.
const CONTENT = "p-[var(--spacing-xl)] [&:not(:first-child)]:pt-0";
const FOOTER = "flex items-center p-[var(--spacing-xl)] [&:not(:first-child)]:pt-0";

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
];
