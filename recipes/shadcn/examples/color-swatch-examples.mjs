/*
 * Porest ColorSwatch 예제 — color-swatch.tsx의 className과 1:1 동기.
 * preview-html `.csw` SoT 정합:
 *   container: grid grid-cols-N gap-sm
 *   swatch: aspect-square + radius-tile + border 2px transparent (active=currentColor) + ✓
 */

const CONTAINER = "grid";
const SWATCH_BASE =
  "relative aspect-square w-full rounded-[var(--radius-tile)] border-2 transition-transform duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] inline-flex items-center justify-center";
const CHECK =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

const PALETTE = [
  { v: "rose", bg: "#FFE7EB", fg: "#C53052" },
  { v: "coral", bg: "#FFE2D5", fg: "#C04E20" },
  { v: "amber", bg: "#FFF1C7", fg: "#9F6907" },
  { v: "lime", bg: "#E2F5C7", fg: "#4E7A14" },
  { v: "forest", bg: "#D4EBD9", fg: "#1E7D4C" },
  { v: "teal", bg: "#CFEFEC", fg: "#107069" },
  { v: "sky", bg: "#D6E9FB", fg: "#1E68B3" },
  { v: "indigo", bg: "#DDDCFB", fg: "#3A36AD" },
  { v: "violet", bg: "#EAD9FA", fg: "#7237AF" },
  { v: "slate", bg: "#E5E8EE", fg: "#3F4960" },
];

function swatch({ bg, fg, active = false, label }) {
  const borderColor = active ? "currentColor" : "transparent";
  return `<button type="button" role="radio" aria-checked="${active}" aria-label="${label}" class="${SWATCH_BASE}" style="background:${bg}; color:${fg}; border-color:${borderColor};">${active ? CHECK : ""}</button>`;
}

export const colorSwatchExamples = [
  {
    title: "10색 팔레트 (5×2)",
    description:
      "카테고리/라벨 색 single-select. grid-cols-5 + gap-sm. active swatch는 자기 색의 currentColor border + ✓ check.",
    jsx: `<ColorSwatchGroup
  columns={5}
  options={PALETTE}
  value="forest"
  onValueChange={onPick}
/>`,
    render: () => `<div role="radiogroup" class="${CONTAINER}" style="grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--spacing-sm); max-width: 280px;">
  ${PALETTE.map((c) => swatch({ bg: c.bg, fg: c.fg, active: c.v === "forest", label: c.v })).join("\n  ")}
</div>`,
  },

  {
    title: "8색 단행 (1×8)",
    description: "단일 행 표시 — 짧은 팔레트에 적합. 모바일에선 cell 폭 자동 축소.",
    jsx: `<ColorSwatchGroup columns={8} options={SHORT_PALETTE} />`,
    render: () => `<div role="radiogroup" class="${CONTAINER}" style="grid-template-columns: repeat(8, minmax(0, 1fr)); gap: var(--spacing-sm); max-width: 320px;">
  ${PALETTE.slice(0, 8).map((c, i) => swatch({ bg: c.bg, fg: c.fg, active: i === 4, label: c.v })).join("\n  ")}
</div>`,
  },

  {
    title: "Hover scale (시각 affordance)",
    description: "hover 시 swatch가 scale(1.05) — 클릭 가능 affordance. 실제 hover 효과는 브라우저에서.",
    jsx: `<ColorSwatchGroup columns={5} options={PALETTE} />`,
    render: () => `<div role="radiogroup" class="${CONTAINER}" style="grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--spacing-sm); max-width: 280px;">
  ${PALETTE.slice(0, 5).map((c, i) => swatch({ bg: c.bg, fg: c.fg, active: i === 1, label: c.v })).join("\n  ")}
</div>`,
  },
];
