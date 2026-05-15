/*
 * Porest Tile 예제 — tile.tsx의 className과 1:1 동기.
 * preview-html `.tile` SoT 정합:
 *   tile: padding (Y · X) + radius-lg + border (1px subtle / 1.5px active primary)
 *   active bg: color-mix(in oklch, var(--color-primary) 8%, transparent)
 *   swatch: 40×40 + radius-tile + 1px border-subtle (호출처가 내부 시각 결정)
 */

const TILE_BASE =
  "relative flex items-center text-left px-[14px] py-[16px] gap-3 rounded-[var(--radius-lg)] border bg-surface-default transition-[border-color,background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]";

const TILE_INACTIVE = "border-border-subtle";
const TILE_ACTIVE =
  'border-[1.5px] border-primary" style="background: color-mix(in oklch, var(--color-primary) 8%, transparent);';

const SWATCH =
  "inline-flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-[var(--radius-tile)] border border-border-subtle";

const LABEL = "block text-body font-semibold text-text-primary";
const DESC = "block mt-0.5 text-caption text-text-tertiary";

const CHECK =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

const SUN =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
const MOON =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
const MONITOR =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';

function tile({ active, swatchBg, swatchColor, icon, label, desc }) {
  const cls = active ? `${TILE_BASE} ${TILE_ACTIVE}` : `${TILE_BASE} ${TILE_INACTIVE}`;
  return `<button type="button" role="radio" aria-checked="${active}" class="${cls}">
  <span class="${SWATCH}" style="background:${swatchBg}; color:${swatchColor};">${icon}</span>
  <span class="flex-1 min-w-0">
    <span class="${LABEL}">${label}</span>
    <span class="${DESC}">${desc}</span>
  </span>
  ${active ? `<span class="flex-shrink-0" style="color: var(--color-primary);">${CHECK}</span>` : ""}
</button>`;
}

const LIGHT_BG = "#ffffff";
const DARK_BG = "#1a1d1e";
const SYS_BG = "linear-gradient(135deg, #fff 50%, #1a1d1e 50%)";

export const tileExamples = [
  {
    title: "테마 선택 (Desk 시나리오)",
    description:
      "라이트/다크/시스템 3-tile single-select. 좌측 swatch는 미리보기 색 + 아이콘, 텍스트는 label + 보조 설명. active 시 border-primary 1.5px + bg 8% tint + ✓.",
    jsx: `<TileGroup columns={3} value={theme} onValueChange={setTheme}>
  <TileItem
    value="light"
    swatch={<Sun />}
    label="라이트"
    description="밝은 배경"
  />
  <TileItem
    value="dark"
    swatch={<Moon />}
    label="다크"
    description="어두운 배경"
  />
  <TileItem
    value="system"
    swatch={<Monitor />}
    label="시스템"
    description="OS 설정 따라가기"
  />
</TileGroup>`,
    render: () => `<div role="radiogroup" style="display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--spacing-sm);">
  ${tile({ active: false, swatchBg: LIGHT_BG, swatchColor: "var(--color-text-primary)", icon: SUN, label: "라이트", desc: "밝은 배경" })}
  ${tile({ active: true, swatchBg: DARK_BG, swatchColor: "#fff", icon: MOON, label: "다크", desc: "어두운 배경" })}
  ${tile({ active: false, swatchBg: SYS_BG, swatchColor: "var(--color-text-primary)", icon: MONITOR, label: "시스템", desc: "OS 설정 따라가기" })}
</div>`,
  },

  {
    title: "모바일 1-column stack",
    description: "좁은 viewport에선 columns=1 (1열 stack). tile 폭 넓어지고 정보 잘 보임.",
    jsx: `<TileGroup columns={1}>...</TileGroup>`,
    render: () => `<div role="radiogroup" style="display:grid; grid-template-columns: 1fr; gap: var(--spacing-sm); max-width: 320px;">
  ${tile({ active: false, swatchBg: LIGHT_BG, swatchColor: "var(--color-text-primary)", icon: SUN, label: "라이트", desc: "밝은 배경" })}
  ${tile({ active: true, swatchBg: DARK_BG, swatchColor: "#fff", icon: MOON, label: "다크", desc: "어두운 배경" })}
</div>`,
  },

  {
    title: "Description 생략",
    description: "label만 의미면 desc 생략 가능. 그래도 Tile은 swatch가 핵심 — 텍스트만이면 ToggleGroup / RadioList 사용 권장.",
    jsx: `<TileItem swatch={<Sun />} label="라이트" />`,
    render: () => `<div role="radiogroup" style="display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--spacing-sm);">
  <button type="button" role="radio" aria-checked="true" class="${TILE_BASE} ${TILE_ACTIVE}">
    <span class="${SWATCH}" style="background:${LIGHT_BG}; color: var(--color-text-primary);">${SUN}</span>
    <span class="flex-1 min-w-0"><span class="${LABEL}">라이트</span></span>
    <span class="flex-shrink-0" style="color: var(--color-primary);">${CHECK}</span>
  </button>
  <button type="button" role="radio" aria-checked="false" class="${TILE_BASE} ${TILE_INACTIVE}">
    <span class="${SWATCH}" style="background:${DARK_BG}; color:#fff;">${MOON}</span>
    <span class="flex-1 min-w-0"><span class="${LABEL}">다크</span></span>
  </button>
  <button type="button" role="radio" aria-checked="false" class="${TILE_BASE} ${TILE_INACTIVE}">
    <span class="${SWATCH}" style="background:${SYS_BG}; color: var(--color-text-primary);">${MONITOR}</span>
    <span class="flex-1 min-w-0"><span class="${LABEL}">시스템</span></span>
  </button>
</div>`,
  },
];
