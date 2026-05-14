/*
 * shadcn Hover Card 예제 — hover-card.md SoT 정합.
 * 정적 HTML preview는 항상 열린 상태로 시각만 표현.
 *
 * Popover와 동일 시각 톤(rounded-md + border + p-[spacing-md]). shadow는
 * inline style로 var(--shadow-md) 직접 인용 — Tailwind v4 dark 모드 quirk fix.
 * normal-flow 사용(absolute positioning 회피) — popover 패턴 동일.
 */

const HC =
  "z-[200] w-64 rounded-md border border-border-default bg-surface-default p-[var(--spacing-md)] text-text-primary";
const HC_SHADOW = "box-shadow:var(--shadow-md);";

const LINK = "color:var(--color-primary); text-decoration:underline; text-underline-offset:4px; cursor:pointer; font-family:var(--font-sans);";
const TERM = "font-weight:600; text-decoration:underline; text-underline-offset:4px; cursor:help; font-family:var(--font-sans);";

// avatar.md md size + primary fill — User row와 시각 일관성
const AVATAR_PRIMARY =
  "width:40px; height:40px; border-radius:var(--radius-full); background:var(--color-primary); color:var(--color-text-on-accent); display:inline-flex; align-items:center; justify-content:center; font-size:var(--text-title-sm); font-weight:600; flex-shrink:0;";

export const hoverCardExamples = [
  {
    title: "User profile preview",
    description: "@mention hover 시 프로필 미리보기. 700ms delay 후 표시. avatar(md, primary fill) + 이름/역할/메타.",
    jsx: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-primary underline underline-offset-4">@kim</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-[var(--spacing-md)]">
      <Avatar>
        <AvatarFallback className="bg-primary text-text-on-accent">김</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-[var(--spacing-xs)]">
        <h4 className="text-title-sm font-semibold">김지원</h4>
        <p className="text-body-sm text-text-secondary">엔지니어 · 5년차</p>
        <p className="text-label-sm text-text-tertiary">2024년 3월 입사</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
    render: () => `<div style="display:inline-flex; flex-direction:column; align-items:flex-start; gap:var(--spacing-sm);">
  <span style="${LINK}">@kim</span>
  <div class="${HC}" style="${HC_SHADOW}">
    <div style="display:flex; gap:var(--spacing-md);">
      <div style="${AVATAR_PRIMARY}">김</div>
      <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); min-width:0;">
        <h4 style="margin:0; font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:600; color:var(--color-text-primary);">김지원</h4>
        <p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">엔지니어 · 5년차</p>
        <p style="margin:0; font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-text-tertiary);">2024년 3월 입사</p>
      </div>
    </div>
  </div>
</div>`,
  },

  {
    title: "Term definition",
    description: "전문용어 hover — 짧은 설명 표시. avatar 없음, 1–2줄 body-sm. trigger는 `cursor-help` + 점선 underline.",
    jsx: `<p>
  Porest는{" "}
  <HoverCard>
    <HoverCardTrigger className="font-semibold underline underline-offset-4 cursor-help">
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
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm); max-width:480px;">
  <p style="margin:0; font-size:var(--text-body-md); line-height:1.6; color:var(--color-text-primary); font-family:var(--font-sans);">Porest는 <span style="${TERM}">디자인 토큰</span>을 단일 시스템으로 운영합니다.</p>
  <div class="${HC}" style="${HC_SHADOW}">
    <p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-primary); font-family:var(--font-sans);">디자인 결정을 단일 진실(single source of truth)로 정의한 변수 — 색상, 타이포, 간격 등.</p>
  </div>
</div>`,
  },
];
