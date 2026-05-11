/*
 * shadcn Slider 예제 — 정적 HTML preview는 고정 위치 시각만 표현.
 */

// slider.tsx와 1:1 동기 (preview-html `.sld-*` SoT) — track 4px, thumb 16, shadow-sm.
// thumb bg는 text-on-accent(#fff 고정) — 다크 모드에서도 흰색 유지.
const ROOT = "position:relative; display:flex; width:100%; touch-action:none; user-select:none; align-items:center;";
const TRACK = "position:relative; height:4px; width:100%; flex:1; overflow:hidden; border-radius:var(--radius-full); background:var(--color-surface-input);";
const RANGE = "position:absolute; height:100%; background:var(--color-primary); border-radius:var(--radius-full);";
const THUMB = "display:block; height:16px; width:16px; border-radius:var(--radius-full); border:2px solid var(--color-primary); background:var(--color-text-on-accent); box-shadow:var(--shadow-sm); position:absolute;";

function slider({ value = 50 } = {}) {
  return `<div style="${ROOT} width:60%;">
  <div style="${TRACK}">
    <div style="${RANGE} width:${value}%;"></div>
  </div>
  <div style="${THUMB} left:calc(${value}% - 8px);"></div>
</div>`;
}

export const sliderExamples = [
  {
    title: "Default",
    description: "단일 값 선택. defaultValue + max/min/step.",
    jsx: `<Slider defaultValue={[33]} max={100} step={1} className="w-[60%]" />`,
    render: () => slider({ value: 33 }),
  },

  {
    title: "Range",
    description: "두 thumb로 범위 선택 — defaultValue=[min, max].",
    jsx: `<Slider defaultValue={[20, 80]} max={100} step={1} className="w-[60%]" />`,
    render: () => `<div style="${ROOT} width:60%;">
  <div style="${TRACK}">
    <div style="${RANGE} left:20%; width:60%;"></div>
  </div>
  <div style="${THUMB} left:calc(20% - 8px);"></div>
  <div style="${THUMB} left:calc(80% - 8px);"></div>
</div>`,
  },

  {
    title: "Volume label",
    description: "label + 현재 값 표시 — 사용처에서 직접 조립.",
    jsx: `<div className="grid w-[60%] gap-2">
  <div className="flex items-center justify-between">
    <Label>볼륨</Label>
    <span className="text-body-sm text-text-secondary">68%</span>
  </div>
  <Slider defaultValue={[68]} max={100} step={1} />
</div>`,
    render: () => `<div style="display:grid; gap:var(--spacing-sm); width:60%;">
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">볼륨</label>
    <span style="font-size:var(--text-body-sm); color:var(--color-text-secondary);">68%</span>
  </div>
  <div style="${ROOT} width:100%;">
    <div style="${TRACK}">
      <div style="${RANGE} width:68%;"></div>
    </div>
    <div style="${THUMB} left:calc(68% - 8px);"></div>
  </div>
</div>`,
  },
];
