/*
 * Spinner 예제 — spinner.tsx의 cva 정의와 1:1 동기.
 * spec: specs/components/spinner.md (단일 SoT)
 *
 * 시각: border-top-color만 primary, 나머지는 border-default → 회전 시 270deg arc
 * track border-default 사용으로 page bg 위 ring outline visible (1.4:1+ 대비)
 * animation: motion-duration-loop (1500ms) linear infinite
 */

const SIZE_DIAMETER = { sm: 16, md: 24, lg: 32, xl: 48 };
const SIZE_STROKE = { sm: 2, md: 2, lg: 3, xl: 4 };

function spinner({ size = "md" } = {}) {
  const d = SIZE_DIAMETER[size];
  const s = SIZE_STROKE[size];
  return `<span role="status" aria-live="polite" style="display:inline-block; width:${d}px; height:${d}px; border:${s}px solid var(--color-border-default); border-top-color:var(--color-primary); border-radius:9999px; animation:sp-spin var(--motion-duration-loop, 1500ms) var(--motion-ease-linear, linear) infinite;">
  <span style="position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;">로딩 중</span>
</span>`;
}

const KEYFRAMES =
  "<style>@keyframes sp-spin { to { transform: rotate(360deg); } }</style>";

export const spinnerExamples = [
  {
    title: "Sizes",
    description: "sm 16/2 (inline) · md 24/2 (default) · lg 32/3 (section) · xl 48/4 (full-page).",
    jsx: `<div className="flex items-end gap-6">
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>`,
    render: () => `${KEYFRAMES}
<div style="display:flex; align-items:flex-end; gap:32px;">
  <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
    ${spinner({ size: "sm" })}
    <span style="font-size:var(--text-caption); color:var(--color-text-tertiary); font-family:ui-monospace, monospace;">sm · 16</span>
  </div>
  <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
    ${spinner({ size: "md" })}
    <span style="font-size:var(--text-caption); color:var(--color-text-tertiary); font-family:ui-monospace, monospace;">md · 24</span>
  </div>
  <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
    ${spinner({ size: "lg" })}
    <span style="font-size:var(--text-caption); color:var(--color-text-tertiary); font-family:ui-monospace, monospace;">lg · 32</span>
  </div>
  <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
    ${spinner({ size: "xl" })}
    <span style="font-size:var(--text-caption); color:var(--color-text-tertiary); font-family:ui-monospace, monospace;">xl · 48</span>
  </div>
</div>`,
  },

  {
    title: "Inline + 라벨",
    description: "텍스트 옆 sm spinner — 가장 흔한 사용 패턴. \"메모 저장 중…\", \"불러오는 중…\".",
    jsx: `<div className="inline-flex items-center gap-2 text-body-md text-text-secondary">
  <Spinner size="sm" />
  메모 저장 중…
</div>`,
    render: () => `${KEYFRAMES}
<div style="display:inline-flex; align-items:center; gap:8px; font-size:var(--text-body-md); color:var(--color-text-secondary);">
  ${spinner({ size: "sm" })}
  <span>메모 저장 중…</span>
</div>`,
  },

  {
    title: "Standalone (full-page 로딩)",
    description: "가운데 xl spinner + 아래 라벨. min-h 60vh + flex center로 화면 가운데 배치.",
    jsx: `<div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
  <Spinner size="xl" />
  <p className="text-body-lg text-text-secondary">데이터를 불러오는 중…</p>
</div>`,
    render: () => `${KEYFRAMES}
<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:64px 0;">
  ${spinner({ size: "xl" })}
  <p style="margin:0; font-size:var(--text-body-lg); color:var(--color-text-secondary);">데이터를 불러오는 중…</p>
</div>`,
  },

  {
    title: "Inside button (form 제출 중)",
    description: "Button leading icon 위치에 sm spinner — disabled + label 변경.",
    jsx: `<Button disabled>
  <Spinner size="sm" />
  저장 중…
</Button>`,
    render: () => `${KEYFRAMES}
<button disabled style="display:inline-flex; align-items:center; justify-content:center; gap:8px; box-sizing:border-box; height:40px; padding:8px 12px; font-size:var(--text-body-md); font-weight:500; line-height:1; border-radius:var(--radius-sm); background:var(--color-primary); color:var(--color-text-on-accent); border:0; opacity:0.5; cursor:not-allowed;">
  <span style="display:inline-block; width:16px; height:16px; border:2px solid color-mix(in srgb, var(--color-text-on-accent) 30%, transparent); border-top-color:var(--color-text-on-accent); border-radius:9999px; animation:sp-spin var(--motion-duration-loop, 1500ms) var(--motion-ease-linear, linear) infinite;"></span>
  저장 중…
</button>`,
  },
];
