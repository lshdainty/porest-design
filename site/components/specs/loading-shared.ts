// 기다림 묶음(Skeleton · Progress Circle · 당겨서 새로 고침 · Progress · Scroll Fog · Content Placeholder)의 모양 —
// 서버(loading-look)와 브라우저(loading-view · 플레이그라운드 · 데모)가 함께 쓰는 상수 · 타입. 파일 읽기(서버 전용)를 들이지 않는다.
import { fogMaskStyle, type FogSides } from './overlay-shared';

export type ViewMode = 'light' | 'dark' | 'auto';
// 색 — name 은 사이트 모드를 따를 때 쓰는 CSS 변수(--p-<name>, HR 에서 값이 다른 브랜드 토큰은 hr-<토큰>), light · dark 는 풀어 둔 값.
// alpha 는 `$color-x / 30%` 의 불투명도(%) — light · dark 에는 이미 섞어 두었고, 사이트 모드를 따를 때는 color-mix 로 섞는다
export type LdColor = { name?: string; light: string; dark: string; alpha?: number };
export type LdType = { fontSize: string; lineHeight: string; fontWeight: number | string; fontFamily: string };
export type LdMotion = { duration: string; easing: string; ms: number };

export const lcv = (c: LdColor, mode: ViewMode) => {
  if (mode !== 'auto') return mode === 'dark' ? c.dark : c.light;
  if (!c.name) return c.light;
  return c.alpha === undefined ? `var(--p-${c.name})` : `color-mix(in srgb, var(--p-${c.name}) ${c.alpha}%, transparent)`;
};
export const FONT = "'Pretendard Variable', Pretendard, sans-serif";
export const px = (v: string | number) => (typeof v === 'number' ? v : parseFloat(v));

// ── Skeleton ─────────────────────────────────────────────
// 모서리 — 0 · 그림 자리 4 · 6(Image Frame 모서리, 2026-10-04) · 글 8 · 타일 12 · 카드 면 16 · full
export const SK_RADII = ['0', '4', '6', '8', '12', '16', 'full'] as const;
export type SkRadius = (typeof SK_RADII)[number];
export const SK_TEXTS = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12', 't13', 't14'] as const;
export type SkText = (typeof SK_TEXTS)[number];

export type SkeletonLook = {
  // 모서리 — 값 이름 · 실제 px(full 은 9999)
  radius: Record<SkRadius, number>;
  defaultRadius: SkRadius;
  // 면 — bg-neutral-weak
  bg: LdColor;
  // 반짝임 띠 — gradient-shimmer-neutral(라이트) · -dark(다크). auto 는 --p-gradient-shimmer-neutral(tokens-style)
  shimmer: { light: string; dark: string };
  // 글자 자리 — 글자 토큰의 크기 · 줄 높이(높이가 곧 줄 높이)
  text: Record<SkText, { size: number; lineHeight: number }>;
  motion: {
    // 반짝임 — translateX from% → to%(왼쪽 밖 → 오른쪽 밖)
    shimmer: LdMotion & { from: number; to: number };
    // 스켈레톤을 걷고 내용이 나타남 — opacity
    reveal: LdMotion;
  };
  // 기다리는 영역의 시간표(ms) · 다시 시도
  region: { showAfter: number; slowAfter: number; timeout: number; retry: number; retryDelays: number[] };
  // 오래 걸림 글
  slowText: LdType & { color: LdColor; gap: number };
  // 놓이는 면 — 흰 면(카드) · 떠 있는 면(시트) · 페이지 바탕
  surfaces: { default: LdColor; floating: LdColor; basement: LdColor };
};

// ── Progress Circle ──────────────────────────────────────
export const PC_SIZES = ['24', '40'] as const;
export type PcSize = (typeof PC_SIZES)[number];
export const PC_TONES = ['neutral', 'brand', 'staticWhite', 'inherit'] as const;
export type PcTone = (typeof PC_TONES)[number];

export type PcFace = { track: LdColor; range: LdColor };
export type ProgressCircleLook = {
  sizes: Record<PcSize, { size: number; thickness: number }>;
  defaults: { size: PcSize; tone: PcTone };
  // inherit 는 글자색(currentColor)과 그 trackAlpha
  tones: Record<Exclude<PcTone, 'inherit'>, PcFace>;
  inheritTrackAlpha: number;
  // 호 — 시작 각(−90 = 12시) · 모션 줄이기의 고정 호(원둘레의 %)
  start: number;
  reducedArc: number;
  motion: {
    rotate: LdMotion;
    // 머리 — 0 ~ headUntil% 동안 0 → 원둘레, 그 뒤 그대로
    head: LdMotion & { until: number };
    // 꼬리 — 0 ~ tailFrom% 동안 0, 그 뒤 −원둘레까지
    tail: LdMotion & { from: number };
    fill: LdMotion;
  };
};

// ── 당겨서 새로 고침 ─────────────────────────────────────
export type PullLook = {
  threshold: number;
  multiplier: number;
  indicator: number;
  circle: number;
  // 놓음 — 88 로 · 끝남 — 제자리로 · 문턱 전 놓음
  motion: { release: LdMotion; done: LdMotion; cancel: LdMotion };
};

// ── Progress(미터) ───────────────────────────────────────
export const PG_MEANINGS = ['limit', 'goal'] as const;
export type PgMeaning = (typeof PG_MEANINGS)[number];
export type ProgressLook = {
  gap: number;
  label: LdType & { color: LdColor };
  status: LdType & { color: LdColor };
  track: { height: number; radius: number; bg: LdColor };
  fill: { radius: number; bg: LdColor; motion: LdMotion };
  amount: LdType & { color: LdColor };
  over: { fill: LdColor; status: LdColor; weight: number | string };
  reached: { status: LdColor; weight: number | string };
  defaultMeaning: PgMeaning;
};

// ── Scroll Fog ───────────────────────────────────────────
export const FOG_USES = ['box', 'row', 'overlayBody', 'page'] as const;
export type FogUse = (typeof FOG_USES)[number];
// 자리마다 — 흐림 깊이(쪽마다) · 안쪽 여백 · 스크롤 여유
export type FogPlace = { axis: 'x' | 'y'; sides: FogSides; pad: FogSides; scroll: FogSides };
export type ScrollFogLook = {
  mask: string;
  depth: number;
  uses: Record<FogUse, FogPlace>;
  defaultUse: FogUse;
};
export { fogMaskStyle, type FogSides };

// ── Content Placeholder ──────────────────────────────────
export const CP_GLYPHS = ['image', 'credit-card', 'receipt', 'file-text'] as const;
export type CpGlyph = (typeof CP_GLYPHS)[number];
export type PlaceholderLook = {
  bg: LdColor;
  glyph: { ratio: number; min: number; max: number; color: LdColor; stroke: number };
};
// 그림 크기 — 틀 높이의 ratio, min 이상 max 이하, 틀 폭이 그보다 좁으면 폭
export const glyphSize = (g: PlaceholderLook['glyph'], w: number, h: number) => Math.min(Math.max(h * g.ratio, g.min), g.max, w);

// 목록 줄의 치수 — list.yaml 의 줄(위아래 · 좌우 여백 · 앞 칸 · 본문 사이 · 글 줄 높이). 스켈레톤 줄이 실제 줄과 같은 높이로 서게
export type RowDims = { padY: number; padX: number; avatar: number; prefixGap: number; bodyGap: number; suffixGap: number; titleLh: number; detailLh: number; height: number };
// 거래 줄 스켈레톤의 폭 — 레시피 예제(TransactionRowsSkeleton)와 같다: 앞 size-10 · 제목 w-32 · 메타 w-20 · 금액 w-16
export const SK_ROW = { avatar: 40, title: 128, detail: 80, amount: 64 };
export type SkRowWidths = typeof SK_ROW;

// ── 묶음 ─────────────────────────────────────────────────
export type LoadingKit = {
  skeleton: SkeletonLook;
  circle: ProgressCircleLook;
  pull: PullLook;
  progress: ProgressLook;
  fog: ScrollFogLook;
  placeholder: PlaceholderLook;
};

// 그림 속 화면이 쓰는 역할 색(폰 · 카드 · 글)
export const LD_TONES = [
  'fg-neutral',
  'fg-neutral-muted',
  'fg-neutral-subtle',
  'fg-brand',
  'fg-critical',
  'fg-positive',
  'bg-layer-default',
  'bg-layer-basement',
  'bg-layer-floating',
  'bg-neutral-weak',
  'bg-neutral-inverted',
  'fg-neutral-inverted',
  'stroke-neutral-weak',
  'stroke-neutral-subtle',
  'bg-brand-solid',
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
  'chart-red-weak',
  'chart-red-contrast',
  'chart-indigo-weak',
  'chart-indigo-contrast',
] as const;
export type LdTone = (typeof LD_TONES)[number];
export type LdScreen = Record<LdTone, LdColor> & { dim: LdColor };

// 시간표의 단계 — 0 ~ showAfter 틀만 · showAfter ~ 기다림 · slowAfter ~ 오래 걸림 · timeout ~ 실패
export type WaitPhase = 'quiet' | 'waiting' | 'slow' | 'failed';
export const phaseAt = (r: SkeletonLook['region'], ms: number): WaitPhase => (ms >= r.timeout ? 'failed' : ms >= r.slowAfter ? 'slow' : ms >= r.showAfter ? 'waiting' : 'quiet');

// 원의 값 — (값 − min) ÷ (max − min), 0 ~ 1 로 자른다
export const pcRatio = (value: number, min = 0, max = 100) => (max <= min ? 0 : Math.min(1, Math.max(0, (value - min) / (max - min))));

// 금액 — "350,000원"(서버 · 브라우저가 같은 글을 내게 로케일을 쓰지 않는다)
export const comma = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const won = (n: number) => `${comma(n)}원`;
