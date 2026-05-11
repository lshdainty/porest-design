/*
 * shadcn Progress 예제 — progress.tsx의 cva 정의와 1:1 동기.
 * spec: specs/components/progress.md (단일 SoT)
 */

const ROOT_BASE = "relative w-full overflow-hidden rounded-full bg-surface-input";
const SIZE = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
};
const INDICATOR =
  "h-full w-full flex-1 bg-primary transition-transform duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)]";

function progress({ value = 0, size = "md", width = "100%" } = {}) {
  return `<div class="${ROOT_BASE} ${SIZE[size]}" style="max-width:${width};">
  <div class="${INDICATOR}" style="transform:translateX(-${100 - value}%);"></div>
</div>`;
}

function progressIndeterminate({ size = "md", width = "100%" } = {}) {
  return `<style>@keyframes sp-sweep { 0% { left: -30%; } 100% { left: 100%; } }</style>
<div class="${ROOT_BASE} ${SIZE[size]}" style="max-width:${width};">
  <span style="position:absolute; top:0; left:-30%; width:30%; height:100%; background:linear-gradient(90deg, transparent, var(--color-primary), transparent); animation: sp-sweep var(--motion-duration-loop, 1500ms) var(--motion-ease-linear, linear) infinite;"></span>
</div>`;
}

export const progressExamples = [
  {
    title: "Sizes",
    description: "sm 2px (inline) / md 4px (default) / lg 8px (large operation). 디자인 시스템 정의 그대로.",
    jsx: `<div className="flex flex-col gap-6 max-w-md">
  <Progress value={62} size="sm" />
  <Progress value={62} size="md" />
  <Progress value={62} size="lg" />
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:24px; max-width:448px;">
  <div style="display:flex; flex-direction:column; gap:6px;">
    <span style="font-size:var(--text-label-sm); color:var(--color-text-tertiary); letter-spacing:0.06em;">SM · 2px</span>
    ${progress({ value: 62, size: "sm" })}
  </div>
  <div style="display:flex; flex-direction:column; gap:6px;">
    <span style="font-size:var(--text-label-sm); color:var(--color-text-tertiary); letter-spacing:0.06em;">MD · 4px (default)</span>
    ${progress({ value: 62, size: "md" })}
  </div>
  <div style="display:flex; flex-direction:column; gap:6px;">
    <span style="font-size:var(--text-label-sm); color:var(--color-text-tertiary); letter-spacing:0.06em;">LG · 8px</span>
    ${progress({ value: 62, size: "lg" })}
  </div>
</div>`,
  },

  {
    title: "Determinate (default)",
    description: "value 0~100 — primary 채움. transition으로 부드러운 변화 (motion-duration-base · motion-ease-out).",
    jsx: `<Progress value={62} />`,
    render: () => `<div style="max-width:480px;">${progress({ value: 62 })}</div>`,
  },

  {
    title: "With meta (preview.html 톤)",
    description: "라벨 + percentage + 단위(MB/MB) 메타 — 큰 작업(다운로드/업로드)에 유용.",
    jsx: `<div className="flex flex-col gap-2 max-w-md">
  <div className="flex items-baseline justify-between">
    <span className="text-label-md font-medium">Determinate progress</span>
    <span className="text-caption text-text-tertiary">62%</span>
  </div>
  <Progress value={62} />
  <div className="flex justify-between text-caption text-text-tertiary">
    <span>1.2MB / 1.9MB</span>
    <span>62%</span>
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:8px; max-width:448px;">
  <div style="display:flex; align-items:baseline; justify-content:space-between;">
    <span style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">Determinate progress</span>
    <span style="font-size:var(--text-caption); color:var(--color-text-tertiary);">62%</span>
  </div>
  ${progress({ value: 62 })}
  <div style="display:flex; justify-content:space-between; font-size:var(--text-caption); color:var(--color-text-tertiary);">
    <span>1.2MB / 1.9MB</span>
    <span>62%</span>
  </div>
</div>`,
  },

  {
    title: "Indeterminate (sweeping)",
    description: "진행도 모를 때 — 30% width gradient가 좌→우 sweeping. spinner의 가로 변형.",
    jsx: `<Progress indeterminate />`,
    render: () => `<div style="max-width:480px;">${progressIndeterminate({ size: "md" })}</div>`,
  },

  {
    title: "Goal tracker (HR 시나리오)",
    description: "분기 목표 달성도 — 여러 항목 + 진행률.",
    jsx: `<div className="flex flex-col gap-4 max-w-md">
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-label-md">매출 목표</span>
      <span className="text-label-sm text-text-tertiary">87%</span>
    </div>
    <Progress value={87} />
  </div>
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-label-md">신규 고객</span>
      <span className="text-label-sm text-text-tertiary">42%</span>
    </div>
    <Progress value={42} />
  </div>
</div>`,
    render: () => {
      const item = (label, value) => `<div style="display:flex; flex-direction:column; gap:8px;">
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <span style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">${label}</span>
    <span style="font-size:var(--text-label-sm); color:var(--color-text-tertiary);">${value}%</span>
  </div>
  ${progress({ value })}
</div>`;
      return `<div style="display:flex; flex-direction:column; gap:16px; max-width:448px;">
  ${item("매출 목표", 87)}
  ${item("신규 고객", 42)}
  ${item("고객 만족도", 95)}
</div>`;
    },
  },
];
