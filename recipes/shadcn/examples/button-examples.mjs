/*
 * shadcn Button 예제 정의 — docs site button.html 페이지에서 Preview + Code 토글로
 * 노출. 각 예제 = { title, description, jsx, render() }.
 *
 * `BASE` / `VARIANT` / `SIZE`의 className 문자열은 `recipes/shadcn/components/ui/
 * button.tsx`의 cva 정의와 정확히 일치해야 함 — 두 파일을 함께 변경해 동기 유지.
 *
 * Preview는 정적 HTML (Tailwind v4 browser CDN이 페이지에서 utility 자동 처리).
 * 아이콘은 lucide-react 이름을 JSX에서는 import, render는 inline SVG로 처리.
 */

const BASE =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium leading-none transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0";

const VARIANT = {
  default:
    "bg-primary text-text-on-accent shadow-sm hover:shadow-md hover:brightness-105 active:shadow-none active:scale-[0.98] active:brightness-95",
  destructive:
    "bg-error text-text-on-accent shadow-sm hover:shadow-md hover:brightness-105 active:shadow-none active:scale-[0.98] active:brightness-95",
  outline:
    "border border-border-default text-text-primary hover:bg-surface-input hover:border-border-strong active:bg-border-default active:scale-[0.98]",
  secondary:
    "bg-surface-input text-text-primary hover:bg-border-default active:scale-[0.98] active:brightness-95",
  ghost:
    "text-primary hover:bg-surface-input active:bg-border-default active:scale-[0.98]",
  link:
    "text-primary underline-offset-4 hover:underline active:brightness-90",
};

const SIZE = {
  sm: "h-8 px-2 py-1 text-caption [&_svg]:size-3.5",
  md: "h-10 px-3 py-2 text-body-md [&_svg]:size-4",
  lg: "h-12 px-4 py-3 text-title-sm rounded-md [&_svg]:size-[18px]",
  icon: "h-10 w-10 [&_svg]:size-4",
};

function btn({ variant = "default", size = "md", disabled = false, children = "", extra = "" } = {}) {
  const cls = [BASE, VARIANT[variant], SIZE[size], extra].filter(Boolean).join(" ");
  return `<button class="${cls}"${disabled ? " disabled" : ""}>${children}</button>`;
}

const ICONS = {
  save: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
  trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  loader: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>',
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
};

const PREVIEW_BASE = "display:flex; gap:var(--spacing-md); flex-wrap:wrap; align-items:center;";

// State matrix — variant × state 시각화. 정적 HTML preview는 :hover/:active/:focus 가상 셀렉터가
// 인터랙션 없이 적용 안되므로, 각 셀에 해당 상태 클래스를 강제로 합성해 시각만 표현.
//
// 합성 규칙 (button.tsx의 cva 정의를 그대로 분해):
//   default     : enabled = bg-primary shadow-sm
//                 hover   = + brightness 105
//                 pressed = + brightness 95
//                 focus   = + 2px ring border-focus + offset
//                 disabled= + opacity 50
//   outline     : enabled = border + bg-surface-default
//                 hover   = bg-surface-input + border-strong
//                 pressed = bg-border-default
//                 focus   = + ring + offset
//                 disabled= + opacity 50
//   ghost       : enabled = text only
//                 hover   = bg-surface-input
//                 pressed = bg-border-default
//                 focus   = + ring + offset
//                 disabled= + opacity 50
function stateBtn({ variant = "default", state = "enabled", children = "승인" } = {}) {
  // base styles per variant (minus interactive pseudos) — preview.html / button.tsx 정의 그대로
  const baseByVariant = {
    default: "background:var(--color-primary); color:var(--color-text-on-accent); box-shadow:var(--shadow-sm);",
    outline: "background:transparent; color:var(--color-text-primary); border:1px solid var(--color-border-default);",
    ghost: "background:transparent; color:var(--color-primary);",
  };
  const stateOverlay = {
    enabled: "",
    hover: variant === "default"
      ? "box-shadow:var(--shadow-md); filter:brightness(1.05);"
      : variant === "outline"
      ? "background:var(--color-surface-input); border-color:var(--color-border-strong);"
      : "background:var(--color-surface-input);",
    pressed: variant === "default"
      ? "box-shadow:none; transform:scale(0.98); filter:brightness(0.95);"
      : "background:var(--color-border-default); transform:scale(0.98);",
    focus: "outline:2px solid var(--color-border-focus); outline-offset:2px;",
    disabled: "opacity:0.5; cursor:not-allowed;",
  };
  // preview-html `.btn` SoT 그대로 — 토큰 직접 인용. font-family는 <button> UA가 body inherit
  // 안 해서 명시 필수(없으면 system-ui로 fallback되어 500 weight가 가늘게 보임).
  const common = "display:inline-flex; align-items:center; justify-content:center; gap:var(--spacing-sm); box-sizing:border-box; height:40px; padding:var(--spacing-sm) var(--spacing-md); border-radius:var(--radius-sm); font-family:var(--font-sans); font-size:var(--text-body-md); font-weight:500; line-height:1; white-space:nowrap; transition:box-shadow var(--motion-duration-fast) var(--motion-ease-out); border:0; cursor:pointer;";
  const styles = `${common} ${baseByVariant[variant]} ${stateOverlay[state]}`;
  return `<button style="${styles}"${state === "disabled" ? " disabled" : ""}>${children}</button>`;
}

export const buttonExamples = [
  {
    title: "State matrix",
    description: "variant × state 시각화 — 디자인 시스템에 정의된 hover / pressed / focus / disabled 상태가 각 variant에서 어떻게 적용되는지. 정적 preview라 인터랙션 없이 강제로 시각만 합성.",
    jsx: `// button.tsx의 cva 정의가 자동으로 :hover / :active / :focus-visible / :disabled 처리.
// State는 인터랙션으로 트리거되며, 별도 선언 불필요.

<Button>승인</Button>
// → :hover    brightness 105
// → :active   brightness 95
// → :focus-visible  ring-2 ring-ring offset-2
// → :disabled opacity 50

<Button variant="outline">승인</Button>
// → :hover    bg-surface-input + border-strong
// → :active   bg-border-default
// → :focus-visible  ring-2 ring-ring offset-2
// → :disabled opacity 50

<Button variant="ghost">승인</Button>
// → :hover    bg-surface-input
// → :active   bg-border-default
// → :focus-visible  ring-2 ring-ring offset-2
// → :disabled opacity 50`,
    render: () => {
      const head = `<th style="padding:var(--spacing-sm) var(--spacing-lg); text-align:center; font-size:var(--text-label-sm); font-weight:500; color:var(--color-text-secondary); letter-spacing:0.06em; text-transform:uppercase;">`;
      const rowLabel = `<th style="padding:var(--spacing-md) var(--spacing-lg) var(--spacing-md) 0; text-align:left; font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-primary);">`;
      const cell = `<td style="padding:var(--spacing-sm) var(--spacing-lg); text-align:center;">`;
      const variants = ["default", "outline", "ghost"];
      const variantLabel = { default: "primary", outline: "outline", ghost: "ghost" };
      const states = ["enabled", "hover", "pressed", "focus", "disabled"];
      const stateLabel = { enabled: "DEFAULT", hover: "HOVER", pressed: "PRESSED", focus: "FOCUS", disabled: "DISABLED" };

      return `<div style="overflow-x:auto;">
  <table style="border-collapse:collapse; width:100%;">
    <thead>
      <tr>
        ${head}&nbsp;</th>
        ${states.map((s) => `${head}${stateLabel[s]}</th>`).join("")}
      </tr>
    </thead>
    <tbody style="border-top:1px solid var(--color-border-default);">
      ${variants.map((v) => `<tr>
        ${rowLabel}${variantLabel[v]}</th>
        ${states.map((s) => `${cell}${stateBtn({ variant: v, state: s })}</td>`).join("")}
      </tr>`).join("")}
    </tbody>
  </table>
</div>`;
    },
  },

  {
    title: "Variants",
    description: "6가지 variant — primary 채움부터 link까지. 모두 Porest 토큰(--color-primary, --color-error, --color-surface-input 등) 직접 사용.",
    jsx: `<div className="flex gap-3 flex-wrap">
  <Button>저장</Button>
  <Button variant="destructive">삭제</Button>
  <Button variant="outline">취소</Button>
  <Button variant="secondary">필터</Button>
  <Button variant="ghost">더보기</Button>
  <Button variant="link">자세히 보기</Button>
</div>`,
    render: () => `<div style="${PREVIEW_BASE}">
  ${btn({ children: "저장" })}
  ${btn({ variant: "destructive", children: "삭제" })}
  ${btn({ variant: "outline", children: "취소" })}
  ${btn({ variant: "secondary", children: "필터" })}
  ${btn({ variant: "ghost", children: "더보기" })}
  ${btn({ variant: "link", children: "자세히 보기" })}
</div>`,
  },

  {
    title: "Sizes",
    description: "sm 32px / md 40px (default) / lg 48px. typography는 각각 label-sm / title-sm / title-md.",
    jsx: `<div className="flex gap-3 items-center">
  <Button size="sm">작게</Button>
  <Button size="md">기본</Button>
  <Button size="lg">크게</Button>
</div>`,
    render: () => `<div style="display:flex; gap:var(--spacing-md); align-items:center;">
  ${btn({ size: "sm", children: "작게" })}
  ${btn({ size: "md", children: "기본" })}
  ${btn({ size: "lg", children: "크게" })}
</div>`,
  },

  {
    title: "With icon",
    description: "lucide-react 아이콘 + 텍스트. cva base에 [&_svg]:size-4가 있어 아이콘 사이즈 자동 통일.",
    jsx: `import { Save, Trash2, Download } from "lucide-react"

<div className="flex gap-3 flex-wrap">
  <Button>
    <Save />
    저장
  </Button>
  <Button variant="destructive">
    <Trash2 />
    삭제
  </Button>
  <Button variant="outline">
    <Download />
    내보내기
  </Button>
</div>`,
    render: () => `<div style="${PREVIEW_BASE}">
  ${btn({ children: ICONS.save + "저장" })}
  ${btn({ variant: "destructive", children: ICONS.trash + "삭제" })}
  ${btn({ variant: "outline", children: ICONS.download + "내보내기" })}
</div>`,
  },

  {
    title: "Loading state",
    description: "loading prop — 비동기 작업 중 좌측 Spinner(size=sm) 노출 + disabled + aria-busy 자동 적용. Spinner border 가 currentColor 상속해 filled bg(default/destructive)에선 white, transparent bg(outline/ghost)에선 primary 자동.",
    jsx: `<div className="flex gap-3">
  <Button loading>저장 중...</Button>
  <Button variant="destructive" loading>삭제 중...</Button>
  <Button variant="outline" loading>불러오는 중...</Button>
</div>`,
    render: () => `<style>@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }</style>
<div style="display:flex; gap:var(--spacing-md);">
  ${btn({ disabled: true, children: ICONS.loader + "저장 중..." })}
  ${btn({ variant: "destructive", disabled: true, children: ICONS.loader + "삭제 중..." })}
  ${btn({ variant: "outline", disabled: true, children: ICONS.loader + "불러오는 중..." })}
</div>`,
  },

  {
    title: "Approval row (HR 시나리오)",
    description: "휴가 승인 list item — sm 사이즈로 dense list. primary 승인 + destructive 반려.",
    jsx: `<div className="flex items-center gap-3 p-4 bg-surface-input rounded-md">
  <div className="flex-1">
    <div className="font-semibold">5월 휴가 신청</div>
    <div className="text-label-sm text-text-secondary">
      김지원 · 5/12 ~ 5/14 · 연차 3일
    </div>
  </div>
  <Button size="sm">승인</Button>
  <Button variant="destructive" size="sm">반려</Button>
</div>`,
    render: () => `<div style="display:flex; align-items:center; gap:var(--spacing-md); padding:var(--spacing-lg); background:var(--color-surface-input); border-radius:var(--radius-md);">
  <div style="flex:1; min-width:0;">
    <div style="font-weight:600; margin-bottom:4px;">5월 휴가 신청</div>
    <div style="font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-text-secondary);">김지원 · 5/12 ~ 5/14 · 연차 3일</div>
  </div>
  ${btn({ size: "sm", children: "승인" })}
  ${btn({ variant: "destructive", size: "sm", children: "반려" })}
</div>`,
  },

  {
    title: "Form actions (Desk 시나리오)",
    description: "폼 하단 액션 — 주요 액션 우측, 취소는 outline. border-top으로 구분.",
    jsx: `<div className="flex justify-end gap-3 pt-4 border-t border-border-default">
  <Button variant="outline">취소</Button>
  <Button>저장</Button>
</div>`,
    render: () => `<div style="display:flex; justify-content:flex-end; gap:var(--spacing-md); padding-top:var(--spacing-lg); border-top:1px solid var(--color-border-default);">
  ${btn({ variant: "outline", children: "취소" })}
  ${btn({ children: "저장" })}
</div>`,
  },

  {
    title: "Hero CTA",
    description: "랜딩 페이지 hero — lg 사이즈 primary + 화살표 아이콘. 옆에 ghost 보조 액션.",
    jsx: `import { ArrowRight } from "lucide-react"

<div className="flex gap-3 items-center">
  <Button size="lg">
    시작하기
    <ArrowRight />
  </Button>
  <Button variant="ghost" size="lg">자세히 보기</Button>
</div>`,
    render: () => `<div style="display:flex; gap:var(--spacing-md); align-items:center;">
  ${btn({ size: "lg", children: "시작하기" + ICONS.arrow })}
  ${btn({ variant: "ghost", size: "lg", children: "자세히 보기" })}
</div>`,
  },
];
