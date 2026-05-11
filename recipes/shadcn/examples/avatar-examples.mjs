/*
 * shadcn Avatar 예제 — avatar.md SoT + preview `.hc-avatar`/`.hc` 1:1 정합.
 * Sizes (spec 표와 1:1):
 *   sm 32 → text-label-sm
 *   md 40 → text-title-sm (default)
 *   lg 48 → text-title-md
 *   xl 64 → text-display-sm
 * Fills: neutral(surface-input + text-primary) / primary(primary + text-on-accent)
 */

const ROOT = "relative inline-flex shrink-0 overflow-hidden rounded-full";

// spec Sizes 표 lookup (한국어 1글자 가독성 기준).
const FONT_BY_SIZE = {
  32: "var(--text-label-sm)",
  40: "var(--text-title-sm)",
  48: "var(--text-title-md)",
  64: "var(--text-display-sm)",
};

function avatar({ size = 40, fallback = "?", img = "", variant = "neutral" } = {}) {
  const font = FONT_BY_SIZE[size] || "var(--text-title-sm)";
  const bg = variant === "primary" ? "var(--color-primary)" : "var(--color-surface-input)";
  const fg = variant === "primary" ? "var(--color-text-on-accent)" : "var(--color-text-primary)";
  const inner = img
    ? `<img src="${img}" alt="" style="width:100%; height:100%; object-fit:cover;" />`
    : `<span style="font-size:${font}; font-weight:600; color:${fg};">${fallback}</span>`;
  return `<div class="${ROOT}" style="width:${size}px; height:${size}px; background:${bg}; display:inline-flex; align-items:center; justify-content:center;">${inner}</div>`;
}

export const avatarExamples = [
  {
    title: "Default",
    description: "40×40 기본 — fallback 텍스트(이니셜) 또는 이미지. 이미지 실패 시 자동 fallback.",
    jsx: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>지원</AvatarFallback>
</Avatar>`,
    render: () => avatar({ fallback: "김" }),
  },

  {
    title: "Sizes",
    description: "sm(32) / md(40, default) / lg(48) / xl(64). 사이즈별로 fallback 폰트 토큰 점진 확대.",
    jsx: `<div className="flex items-center gap-[var(--spacing-md)]">
  <Avatar className="h-8 w-8"><AvatarFallback>S</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>M</AvatarFallback></Avatar>
  <Avatar className="h-12 w-12"><AvatarFallback>L</AvatarFallback></Avatar>
  <Avatar className="h-16 w-16"><AvatarFallback>XL</AvatarFallback></Avatar>
</div>`,
    render: () => `<div style="display:flex; align-items:center; gap:var(--spacing-md);">
  ${avatar({ size: 32, fallback: "김" })}
  ${avatar({ size: 40, fallback: "김" })}
  ${avatar({ size: 48, fallback: "김" })}
  ${avatar({ size: 64, fallback: "김" })}
</div>`,
  },

  {
    title: "Primary fill (brand)",
    description: "fallback 배경을 brand `primary`로 — 본인/강조 사용자. preview `.hc-avatar` SoT.",
    jsx: `<div className="flex items-center gap-[var(--spacing-md)]">
  <Avatar><AvatarFallback className="bg-primary text-text-on-accent">김</AvatarFallback></Avatar>
  <Avatar><AvatarFallback className="bg-primary text-text-on-accent">이</AvatarFallback></Avatar>
  <Avatar><AvatarFallback className="bg-primary text-text-on-accent">최</AvatarFallback></Avatar>
</div>`,
    render: () => `<div style="display:flex; align-items:center; gap:var(--spacing-md);">
  ${avatar({ fallback: "김", variant: "primary" })}
  ${avatar({ fallback: "이", variant: "primary" })}
  ${avatar({ fallback: "최", variant: "primary" })}
</div>`,
  },

  {
    title: "Avatar group (overlap)",
    description: "팀 멤버 표시 — 8px(-space-x-2) 겹침 + ring 2px `surface-default`로 경계 분리. 4–5개 + `+N`.",
    jsx: `<div className="flex -space-x-2">
  <Avatar className="ring-2 ring-surface-default">
    <AvatarFallback className="bg-primary text-text-on-accent">김</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-surface-default"><AvatarFallback>이</AvatarFallback></Avatar>
  <Avatar className="ring-2 ring-surface-default"><AvatarFallback>최</AvatarFallback></Avatar>
  <Avatar className="ring-2 ring-surface-default">
    <AvatarFallback className="text-text-tertiary">+5</AvatarFallback>
  </Avatar>
</div>`,
    render: () => {
      const wrap = (z, idx, content) => `<div style="position:relative; z-index:${z}; ${idx === 0 ? "" : "margin-left:calc(var(--spacing-sm) * -1);"} box-shadow:0 0 0 2px var(--color-surface-default); border-radius:var(--radius-full);">${content}</div>`;
      return `<div style="display:flex;">
  ${wrap(4, 0, avatar({ fallback: "김", variant: "primary" }))}
  ${wrap(3, 1, avatar({ fallback: "이" }))}
  ${wrap(2, 2, avatar({ fallback: "최" }))}
  ${wrap(1, 3, avatar({ fallback: "+5" }))}
</div>`;
    },
  },

  {
    title: "User row (preview SoT)",
    description: "preview `.hc` 패턴 — bg-page 카드 wrap + avatar + 이름(body-md 600) + 메타(caption secondary). 멘션·hover card·list row 공통 시그니처.",
    jsx: `<div className="flex items-start gap-[var(--spacing-md)] p-[var(--spacing-md)] rounded-md bg-bg-page">
  <Avatar>
    <AvatarFallback className="bg-primary text-text-on-accent">김</AvatarFallback>
  </Avatar>
  <div className="flex flex-col gap-[var(--spacing-xs)]">
    <span className="text-body-md font-semibold text-text-primary">김지원 · 사용자</span>
    <span className="text-caption text-text-secondary">메모 234건 · 할일 58건</span>
  </div>
</div>`,
    render: () => `<div style="display:inline-flex; align-items:flex-start; gap:var(--spacing-md); padding:var(--spacing-md); background:var(--color-bg-page); border-radius:var(--radius-md);">
  ${avatar({ fallback: "김", variant: "primary" })}
  <div style="display:flex; flex-direction:column; gap:var(--spacing-xs);">
    <span style="font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); font-weight:600; color:var(--color-text-primary);">김지원 · 사용자</span>
    <span style="font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-secondary);">메모 234건 · 할일 58건</span>
  </div>
</div>`,
  },
];
