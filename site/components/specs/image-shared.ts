// 이미지 묶음(Image Frame · 카드 그림 · Logo Tile · Aspect Ratio)의 모양 — 서버(image-look)와 브라우저(image-view · 플레이그라운드 · 데모)가
// 함께 쓰는 상수 · 타입 · 규칙 함수. 파일 읽기(서버 전용)를 들이지 않는다.
// 규칙 함수(모서리 · 카드 면 크기 · 기관 색 찾기 · 이름 색)는 스펙 md 의 "코드" 절과 같은 답을 낸다 — 경계 값은 look 이 YAML 에서 읽어 넘긴다.
import { avatarHue, type DColor } from './display-shared';
import type { PlaceholderLook, SkeletonLook } from './loading-shared';
export { avatarHue, avatarHueIndex, avatarInitial, codePointSum, dcv, type DColor, type ViewMode } from './display-shared';

export const FONT = "'Pretendard Variable', Pretendard, sans-serif";

// ── 비율 · 모서리 · 상태 · 그림 위 자리 ───────────────────
export const IF_RATIOS = ['1:1', '2:1', '16:9', '4:3', '6:7', '4:5', '2:3', 'card'] as const;
export type IfRatio = (typeof IF_RATIOS)[number];
// 비율 하나 — 값(폭 ÷ 높이) · YAML 의 식("16 / 9") · 비고(≈ 1.78) · 쓰는 곳(축 설명)
export type RatioDef = { value: number; expr: string; note: string; desc: string };

export const IF_RADII = ['4', '6', '8', '0'] as const;
export type IfRadius = (typeof IF_RADII)[number];
// 폭 경계 — r4 이하 4 · r6 이하 6 · 그 위 8(image-frame.yaml 의 radius 축 설명 "폭 24 이하" · "폭 25 ~ 48")
export type RadiusBands = { r4: number; r6: number };
// 레시피 imageFrameRadius(width) 와 같은 답 — 화면 폭이면 0, 폭을 모르면(부모 폭을 채움) 8
export function imageFrameRadius(width: number | undefined, bands: RadiusBands, bleed = false): IfRadius {
  if (bleed) return '0';
  if (width === undefined) return '8';
  return width <= bands.r4 ? '4' : width <= bands.r6 ? '6' : '8';
}

export const IF_STATES = ['loaded', 'loading', 'fallback'] as const;
export type IfState = (typeof IF_STATES)[number];
export const IF_FITS = ['cover', 'contain'] as const;
export type IfFit = (typeof IF_FITS)[number];
export const IF_PLACEMENTS = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;
export type IfPlacement = (typeof IF_PLACEMENTS)[number];

export type ImageFrameLook = {
  defaults: { ratio: IfRatio; radius: IfRadius; fit: IfFit };
  ratios: Record<IfRatio, RatioDef>;
  // 모서리 — px · 토큰 이름(radius-r1 …, 0 은 '0px') · 축 설명
  radius: Record<IfRadius, { px: number; token: string; desc: string }>;
  bands: RadiusBands;
  // 안쪽 1px 윤곽 — 그림 · 스켈레톤 · 대체 그림 위에 늘
  stroke: { width: number; color: DColor };
  // contain 의 흰 판 — 두 모드 같다
  plate: DColor;
  // 그림 위 자리 — 가장자리에서 offset · 짧은 변이 minSide 이상일 때만 · 틀 하나에 max 개까지
  floater: { offset: number; minSide: number; max: number };
  // 장수 글(Indicator) — 바탕은 두 모드 같은 overlay-dim-dark
  indicator: { bg: string; bgName: string; fg: DColor; fontSize: number; lineHeight: number; weight: number; fontFamily: string; padX: number; padY: number; minH: number };
  // 그림이 옴 — 투명도 0 → 1
  reveal: { duration: string; easing: string; ms: number };
  // 이만큼 지나도 안 오면 실패(ms) — Skeleton 의 요청 제한과 같다
  timeout: number;
  // 카드 그림이 세로면 돌리는 각(시계 방향)
  rotate: number;
  // 불러오는 동안 · 없음 · 실패 — Skeleton(skeleton.yaml) · Content Placeholder(content-placeholder.yaml)와 같은 값인지 image-look 이 확인한다
  sk: SkeletonLook;
  cp: PlaceholderLook;
};

// ── 카드 그림(CardArt) ────────────────────────────────────
export const CA_SIZES = ['small', 'medium', 'large'] as const;
export type CaSize = (typeof CA_SIZES)[number];
export type CaType = { fontSize: number; lineHeight: number };
export type CardArtLook = {
  ratio: number;
  // 폭 경계 — small 은 medium 미만, large 는 이 폭 이상(card-art.yaml size 축 설명 "폭 96 미만" · "폭 240 이상")
  bands: { medium: number; large: number };
  defaultSize: CaSize;
  // 작은 면의 첫 글자 — 면 높이의 ratio(가장 작아도 min)
  initial: { ratio: number; min: number; weight: number; lineHeight: number };
  issuerWeight: number;
  nameWeight: number;
  // 카드 이름 줄 수 — medium 한 줄 · large 두 줄까지(card-art.yaml name.lineClamp)
  sizes: Record<'medium' | 'large', { padX: number; padBottom: number; issuer: CaType; name: CaType; nameClamp: number }>;
  // 기관 글자색 — white = static-white, dark = 라이트 fg-neutral · 다크 fg-neutral-inverted
  text: { white: DColor; dark: DColor };
};
export const cardArtSize = (width: number, bands: CardArtLook['bands']): CaSize => (width < bands.medium ? 'small' : width >= bands.large ? 'large' : 'medium');
// 작은 면의 첫 글자 크기 — 면 높이의 40%(반올림), 가장 작아도 10
export const cardInitialSize = (width: number, look: CardArtLook) => Math.max(look.initial.min, Math.round((width / look.ratio) * look.initial.ratio));

// ── Logo Tile ─────────────────────────────────────────────
export const LT_SIZES = ['32', '40', '48'] as const;
export type LtSize = (typeof LT_SIZES)[number];
export const LT_FACES = ['institution', 'name'] as const;
export type LtFace = (typeof LT_FACES)[number];
export const LT_IMAGES = ['none', 'card', 'logo'] as const;
export type LtImage = (typeof LT_IMAGES)[number];
export type LogoTileLook = {
  defaults: { size: LtSize; face: LtFace; image: LtImage };
  sizes: Record<LtSize, { size: number; radius: number; radiusToken: string; font: number }>;
  initial: { weight: number; lineHeight: number };
  platePad: number;
  plate: { card: DColor; logo: DColor };
  stroke: { width: number; color: DColor };
  // 이름 색 — Avatar 와 같은 함수(코드 포인트 합 % 10 → 차트 10색) · 글자 fg-neutral-inverted · 이름이 비면 gray
  order: string[];
  hues: Record<string, DColor>;
  nameFg: DColor;
  text: { white: DColor; dark: DColor };
  // 카드 그림은 판 안(크기 − 2 × platePad)에 이 비율
  cardRatio: number;
};

// ── Aspect Ratio ──────────────────────────────────────────
export type AspectRatioLook = { defaults: { ratio: IfRatio }; ratios: Record<IfRatio, RatioDef> };

// ── 기관 색 표(institution-colors.yaml) ───────────────────
export type Institution = { name: string; category: string; aliases: string[]; color: string; ci?: string; text: 'white' | 'dark' };
const squash = (s: string) => s.replace(/\s+/g, '');
// 찾기 — 공백을 뺀 이름이 name · aliases 와 같으면 그 기관, 아니면 이름에 든 name · aliases 가운데 가장 긴 것(대소문자 그대로), 없으면 null
export type Found = { inst: Institution; how: 'exact' | 'contains'; key: string };
export function findInstitution(name: string, table: Institution[]): Found | null {
  const q = squash(name);
  if (!q) return null;
  for (const inst of table) for (const k of [inst.name, ...inst.aliases]) if (squash(k) === q) return { inst, how: 'exact', key: k };
  let best: Found | null = null;
  for (const inst of table)
    for (const k of [inst.name, ...inst.aliases]) {
      const s = squash(k);
      if (s && q.includes(s) && (!best || s.length > squash(best.key).length)) best = { inst, how: 'contains', key: k };
    }
  return best;
}

// 타일 · 카드 면의 색 — 기관 색(표에 있으면) 또는 이름 색. fg 는 글자색, hue 는 이름 색의 이름
export type FacePaint = { bg: DColor; fg: DColor; found: Found | null; hue?: string };
const fixed = (hex: string): DColor => ({ light: hex, dark: hex });
export function logoFace(name: string, face: LtFace, table: Institution[], look: Pick<LogoTileLook, 'order' | 'hues' | 'nameFg' | 'text'>): FacePaint {
  const found = face === 'institution' ? findInstitution(name, table) : null;
  if (found) return { bg: fixed(found.inst.color), fg: found.inst.text === 'white' ? look.text.white : look.text.dark, found };
  const hue = avatarHue(name, look.order);
  return { bg: look.hues[hue], fg: look.nameFg, found: null, hue };
}
// 카드 면 — 아는 카드사만 면(모르면 null → 대체 그림)
export function cardFace(issuer: string, table: Institution[], look: Pick<CardArtLook, 'text'>): { bg: string; fg: DColor; found: Found } | null {
  const found = findInstitution(issuer, table);
  if (!found) return null;
  return { bg: found.inst.color, fg: found.inst.text === 'white' ? look.text.white : look.text.dark, found };
}

// ── 대비 · 겹친 색 ────────────────────────────────────────
// #RRGGBB · #RRGGBBAA · rgba(…) → [r, g, b, a]
export function rgbaOf(c: string): [number, number, number, number] {
  const m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(c.trim());
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
  const h = c.replace('#', '');
  const v = (i: number) => parseInt(h.slice(i, i + 2), 16);
  return [v(0), v(2), v(4), h.length >= 8 ? v(6) / 255 : 1];
}
const hex2 = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
// 투명한 색을 불투명한 바탕 위에 — 결과는 #RRGGBB
export function over(top: string, base: string) {
  const [r, g, b, a] = rgbaOf(top);
  const [R, G, B] = rgbaOf(base);
  return `#${hex2(r * a + R * (1 - a))}${hex2(g * a + G * (1 - a))}${hex2(b * a + B * (1 - a))}`.toUpperCase();
}
function lum(c: string) {
  const [r, g, b] = rgbaOf(c).map((v, i) => (i < 3 ? v / 255 : v));
  const f = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
export function contrastOf(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
export const ratioText = (n: number) => n.toFixed(2);

// ── 그림 재료 — 손으로 칠한 대역(실제 사진 · 카드 그림 · 기관 로고를 쓰지 않는다) ─────────
// aspect 는 그림의 원래 폭 ÷ 높이 — 틀에 넣을 때(cover · contain · 돌리기) 이 값으로 자른다
export const PICS = {
  dusk: { aspect: 3 / 2, ko: '저녁 사진' },
  white: { aspect: 1, ko: '흰 배경 사진' },
  meadow: { aspect: 4 / 3, ko: '들판 사진' },
  sunset: { aspect: 4 / 3, ko: '노을 사진' },
  sea: { aspect: 4 / 3, ko: '바다 사진' },
  forest: { aspect: 4 / 3, ko: '숲 사진' },
  receipt: { aspect: 3 / 4, ko: '영수증 사진' },
  'card-h': { aspect: 1.586, ko: '가로 카드 그림' },
  'card-h2': { aspect: 1.586, ko: '가로 카드 그림' },
  'card-v': { aspect: 540 / 856, ko: '세로 카드 그림' },
  'card-white': { aspect: 1.586, ko: '흰 카드 그림' },
  'card-dark': { aspect: 1.586, ko: '어두운 카드 그림' },
  'logo-leaf': { aspect: 1, ko: '로고 그림' },
  'logo-word': { aspect: 2.4, ko: '로고 그림' },
  'rule-vacation': { aspect: 1, ko: '규정 그림' },
  'rule-attire': { aspect: 1, ko: '규정 그림' },
  'rule-education': { aspect: 1, ko: '규정 그림' },
  'rule-culture': { aspect: 1, ko: '규정 그림' },
  video: { aspect: 16 / 9, ko: '동영상 화면' },
  map: { aspect: 1, ko: '지도' },
} as const;
export type PicKind = keyof typeof PICS;

// 그림을 틀에 넣는 자리 — 틀 비율 F · 그림 비율 A(%, 틀 기준). cover 는 넘치게, contain 은 들어가게
export function fitBox(frame: number, pic: number, fit: IfFit) {
  const wider = pic >= frame;
  const grow = fit === 'cover' ? wider : !wider;
  if (grow) {
    const w = (pic / frame) * 100;
    return { left: (100 - w) / 2, top: 0, width: w, height: 100 };
  }
  const h = (frame / pic) * 100;
  return { left: 0, top: (100 - h) / 2, width: 100, height: h };
}

// 자리 표시용 문구 — 축 값 · 상태의 한국어
export const RATIO_KO: Record<IfRatio, string> = { '1:1': '정사각', '2:1': '넓은 띠', '16:9': '동영상', '4:3': '사진(기본)', '6:7': '조금 세로', '4:5': '세로', '2:3': '긴 세로', card: '카드' };
export const STATE_KO: Record<IfState, string> = { loaded: '다 받음', loading: '불러오는 중', fallback: '없음 · 실패' };
export const PLACEMENT_KO: Record<IfPlacement, string> = { 'top-start': '위 시작', 'top-end': '위 끝', 'bottom-start': '아래 시작', 'bottom-end': '아래 끝' };
