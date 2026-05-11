/*
 * shadcn Hover Card 예제 — 정적 HTML preview는 항상 열린 상태.
 */

const HC =
  "z-50 w-64 rounded-sm border border-border-default bg-surface-default p-4 text-text-primary shadow-md";

const LINK = "color:var(--color-primary); text-decoration:underline; text-underline-offset:4px; cursor:pointer;";

export const hoverCardExamples = [
  {
    title: "User profile preview",
    description: "@멘션 hover 시 프로필 미리보기. 200ms delay 후 표시.",
    jsx: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-primary underline underline-offset-4">@kim</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-3">
      <Avatar>
        <AvatarFallback className="bg-primary text-text-on-accent">김</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-title-sm font-semibold">김지원</h4>
        <p className="text-body-sm text-text-secondary">엔지니어 · 5년차</p>
        <p className="text-label-sm text-text-tertiary">2024년 3월 입사</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
    render: () => `<div style="position:relative; display:inline-flex; flex-direction:column; padding:0 0 200px;">
  <span style="${LINK} align-self:flex-start;">@kim</span>
  <div class="${HC}" style="position:absolute; top:32px; left:0;">
    <div style="display:flex; gap:12px;">
      <div style="width:40px; height:40px; border-radius:9999px; background:var(--color-primary); color:var(--color-text-on-accent); display:flex; align-items:center; justify-content:center; font-weight:600; flex-shrink:0;">김</div>
      <div style="display:flex; flex-direction:column; gap:4px; min-width:0;">
        <h4 style="margin:0; font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">김지원</h4>
        <p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">엔지니어 · 5년차</p>
        <p style="margin:0; font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-text-tertiary);">2024년 3월 입사</p>
      </div>
    </div>
  </div>
</div>`,
  },

  {
    title: "Term definition",
    description: "전문용어 hover — 짧은 설명 표시. 클릭 가능한 링크와 다름(hover만).",
    jsx: `<p>
  Porest는{" "}
  <HoverCard>
    <HoverCardTrigger className="font-semibold underline underline-offset-4">
      디자인 토큰
    </HoverCardTrigger>
    <HoverCardContent>
      <p className="text-body-sm">
        디자인 결정을 단일 진실(single source of truth)로 정의한 변수 — 색상,
        타이포, 간격 등.
      </p>
    </HoverCardContent>
  </HoverCard>
  {" "}을 단일 시스템으로 운영합니다.
</p>`,
    render: () => `<div style="position:relative; max-width:480px; padding:0 0 100px; line-height:1.6;">
  <p style="margin:0; font-size:var(--text-body-md);">Porest는 <span style="font-weight:600; text-decoration:underline; text-underline-offset:4px; cursor:help;">디자인 토큰</span>을 단일 시스템으로 운영합니다.</p>
  <div class="${HC}" style="position:absolute; top:32px; left:48px;">
    <p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-primary);">디자인 결정을 단일 진실(single source of truth)로 정의한 변수 — 색상, 타이포, 간격 등.</p>
  </div>
</div>`,
  },
];
