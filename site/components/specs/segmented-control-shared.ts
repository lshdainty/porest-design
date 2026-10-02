// Segmented Control 의 모양 — 서버(segmented-control-look) · 브라우저(segmented-control-view · 플레이그라운드)가 함께 쓰는 상수 · 타입.
// 파일 읽기(서버 전용)를 들이지 않는다.

export const SEG_SELECTED = ['unselected', 'selected'] as const;
export type SegSelected = (typeof SEG_SELECTED)[number];
// segmented-control.yaml 의 states — 호버는 웹만(누름과 같은 바탕, 축소 없음), 포커스는 키보드에만 링
export const SEG_STATES = ['enabled', 'hovered', 'pressed', 'focused', 'disabled'] as const;
export type SegState = (typeof SEG_STATES)[number];

export type ViewMode = 'light' | 'dark' | 'auto';
export type SegColor = { name?: string; light: string; dark: string };
export type SegType = { fontSize: string; lineHeight: string; fontWeight: number | string; fontFamily: string };
export type SegMotion = { duration: string; easing: string };

export const scv = (c: SegColor, mode: ViewMode) => (mode === 'auto' ? (c.name ? `var(--p-${c.name})` : c.light) : mode === 'dark' ? c.dark : c.light);

// 고름 × 상태 하나의 칸 — 칸에 칠하는 바탕 · 안쪽 테두리(없으면 null — 고른 칸은 알약이 비친다), 글자색, 글 축소, 링
export type SegFace = {
  bg: SegColor | null;
  border: { color: SegColor; width: number } | null;
  fg: SegColor;
  cursor: string;
  scale: boolean;
  ring: boolean;
};

export type SegLook = {
  // 트랙 — 안쪽 여백 · 모서리 · 바탕, 칸 수 범위
  root: { padding: number; radius: number; bg: SegColor; min: number; max: number };
  item: { minH: number; padX: number; padY: number; radius: number };
  text: SegType;
  align: string;
  // 고른 알약 — 칸 뒤에 깔리고 고른 칸으로 미끄러진다
  indicator: { bg: SegColor; border: SegColor; borderWidth: number; radius: number; inset: number; motion: SegMotion };
  notification: { size: number; radius: number; color: SegColor; gap: number };
  ring: { width: number; offset: number; color: SegColor };
  faces: Record<SegSelected, Record<SegState, SegFace>>;
  motion: { color: SegMotion; scale: SegMotion; props: string[] };
  press: { distance: number; widthDivisor: number; minBasis: number };
  // 화면 여백(spacing-global-gutter) — 그림의 폰 콘텐츠 폭 = 화면 − 여백 × 2
  gutter: number;
  tone: Record<SegTone, SegColor>;
};

export const SEG_TONES = [
  'fg-neutral',
  'fg-neutral-muted',
  'fg-neutral-subtle',
  'fg-placeholder',
  'fg-brand',
  'bg-layer-default',
  'bg-layer-basement',
  'bg-neutral-weak',
  'stroke-neutral-weak',
  'stroke-neutral-subtle',
  'stroke-neutral-solid',
  'chart-orange-weak',
  'chart-orange-contrast',
  'chart-blue-weak',
  'chart-blue-contrast',
  'chart-green-weak',
  'chart-green-contrast',
  'chart-violet-weak',
  'chart-violet-contrast',
  'chart-brown-weak',
  'chart-brown-contrast',
] as const;
export type SegTone = (typeof SEG_TONES)[number];

export type SegItem = { value: string; label: string; disabled?: boolean; notification?: boolean };

// 눌림 축소 배율 — 기준 길이 max(높이, 폭 ÷ n, 최소) 는 칸에서, 축소는 칸 안의 글만(SEED scaleScope content)
export function segPressRatio(press: SegLook['press'], w: number, h: number) {
  const basis = Math.max(h, w / press.widthDivisor, press.minBasis);
  return (basis - press.distance) / basis;
}
export const segFaceOf = (look: SegLook, selected: boolean, state: SegState) => look.faces[selected ? 'selected' : 'unselected'][state];
