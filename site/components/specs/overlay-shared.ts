// 시트 · 대화상자 · 확인창 · 팝오버의 모양 — 서버(overlay-look) · 브라우저(overlay-view · 데모 · 플레이그라운드)가 함께 쓰는 상수 · 타입.
// 파일 읽기(서버 전용)를 들이지 않는다.
import type { CSSProperties } from 'react';
import type { ButtonLook } from './button-look';

export type ViewMode = 'light' | 'dark' | 'auto';

// 색 — name 은 사이트 모드를 따를 때 쓰는 CSS 변수(--p-<name>, HR 에서 값이 다른 브랜드 토큰은 hr-<토큰>), light · dark 는 풀어 둔 값
export type OvColor = { name?: string; light: string; dark: string };
export type OvType = { fontSize: string; lineHeight: string; fontWeight: number | string; fontFamily: string };
export type OvText = OvType & { color: OvColor };
export type OvMotion = { duration: string; easing: string };
export type OvRing = { width: number; offset: number; color: OvColor };

export const ocv = (c: OvColor, mode: ViewMode) => (mode === 'auto' ? (c.name ? `var(--p-${c.name})` : c.light) : mode === 'dark' ? c.dark : c.light);
export const ms = (v: string) => (v.trim().endsWith('ms') ? parseFloat(v) : parseFloat(v) * 1000);

// 닫기 버튼 — 시트는 28 원(바탕이 있다), 대화상자 · 팝오버는 52 투명 상자(보이는 건 아이콘 22)
export type OvClose = {
  kind: 'circle' | 'ghost';
  // 원(시트) · 투명 상자(대화상자 · 팝오버)의 한 변
  size: number;
  radius: number;
  // 원의 바탕(시트만) · 누를 때 바탕
  bg: OvColor | null;
  bgPressed: OvColor;
  icon: number;
  color: OvColor;
  // 위 · 오른쪽 거리 — 시트는 원의 자리, 대화상자 · 팝오버는 아이콘의 자리
  top: number;
  right: number;
  // 누르는 영역(정사각)
  target: number;
  // 누를 때 배율(2px 거리)
  scale: number;
  motion: { color: OvMotion; scale: OvMotion };
};

export type OvHeader = { padTop: number; padBottom: number; padX: number; padRightClose: number; gap: number };
export type OvFooter = { padTop: number; padX: number; padBottom: number; gap: number; justify: string; button: { size: string; height: number } };
// 본문 끝 흐림(축 scrollFog=on) — Scroll Fog overlayBody. 넘칠 수 있는 본문에만 걸고, 걸면 늘 켜져 있다.
// top · bottom 은 흐림 깊이, padTop · padBottom 은 본문 안 여백(흐림 깊이 이상), scrollTop · scrollBottom 은 스크롤 여유, mask 는 gradient-fade-mask(방향 없음)
export type OvFog = { top: number; bottom: number; padTop: number; padBottom: number; scrollTop: number; scrollBottom: number; mask: string };
// 본문 스크롤 — 위로 스크롤되면 머리 아래 선. 끝 흐림은 상태가 아니라 축이다(fog)
export type OvScroll = { fog: OvFog; divider: { height: number; color: OvColor; motion: OvMotion } };

// 흐림 마스크 — gradient-fade-mask(위 → 아래, 알파 0 → 1)의 단계를 깊이(px)에 맞게 줄여 한쪽에 하나씩 겹친다(mask-composite: intersect).
// 깊이가 0 인 쪽은 흐리지 않는다. 같은 값을 Scroll Fog · 시트 · 대화상자 · 칩 줄이 함께 쓴다
export type FogSides = { top?: number; bottom?: number; left?: number; right?: number };
const SIDE_DIR: Record<keyof FogSides, string> = { top: 'to bottom', bottom: 'to top', left: 'to right', right: 'to left' };
export function fogLayer(mask: string, side: keyof FogSides, depth: number) {
  const stops = /^linear-gradient\((.*)\)$/.exec(mask.trim())?.[1];
  if (!stops) throw new Error(`gradient-fade-mask(${mask})가 linear-gradient(…) 가 아니다`);
  const scaled = stops.split(/,\s*(?![^(]*\))/).map((s) => {
    const m = /^(\S+)\s+([\d.]+)%$/.exec(s.trim());
    if (!m) throw new Error(`gradient-fade-mask 의 단계(${s})를 읽지 못했다`);
    return `${m[1]} ${Math.round(((Number(m[2]) / 100) * depth) * 100) / 100}px`;
  });
  return `linear-gradient(${SIDE_DIR[side]}, ${scaled.join(', ')})`;
}
export function fogMaskStyle(mask: string, sides: FogSides): CSSProperties {
  const layers = (Object.keys(SIDE_DIR) as (keyof FogSides)[]).filter((k) => (sides[k] ?? 0) > 0).map((k) => fogLayer(mask, k, sides[k]!));
  if (!layers.length) return {};
  const image = layers.join(', ');
  return { WebkitMaskImage: image, maskImage: image, WebkitMaskComposite: layers.length > 1 ? 'source-in' : 'source-over', maskComposite: layers.length > 1 ? 'intersect' : 'add' } as CSSProperties;
}

export type SheetLook = {
  dim: OvColor;
  z: { dim: number; surface: number };
  maxWidth: number;
  // 화면 높이에 대한 상한(0.9)
  maxHeight: number;
  radius: number;
  bg: OvColor;
  close: OvClose;
  header: OvHeader;
  title: OvText;
  description: OvText;
  // 본문 — 좌우 · 바닥이 없을 때 아래(그 아래 안전 영역)
  body: { padX: number; padBottom: number };
  // 본문 끝 흐림(축 scrollFog=on) — 걸면 늘 켜져 있다
  fog: OvFog;
  footer: OvFooter;
  handle: { width: number; height: number; radius: number; color: OvColor; top: number; target: number };
  ring: OvRing;
  motion: { open: OvMotion; dimOpen: OvMotion; close: OvMotion; dimClose: OvMotion; press: OvMotion };
  // 끌어 닫기 — bottom-sheet.md 의 Behavior(빠르기 px/ms · 내려온 비율 · 열린 뒤 막는 시간)
  drag: { velocity: number; distance: number; guard: number };
};

export type DialogSize = 'medium' | 'large';
export type DialogLook = {
  dim: OvColor;
  z: { dim: number; surface: number };
  sizes: Record<DialogSize, number>;
  defaultSize: DialogSize;
  // 화면 좌우에 남기는 거리(화면 폭 − 40 → 20) · 화면 높이에 대한 상한(0.8)
  marginX: number;
  maxHeight: number;
  radius: number;
  bg: OvColor;
  header: OvHeader;
  title: OvText;
  description: OvText;
  close: OvClose;
  // 본문 — 좌우 · 머리가 없을 때 위 · 바닥이 없을 때 아래
  body: { padX: number; padTop: number; padBottom: number };
  scroll: OvScroll;
  footer: OvFooter;
  ring: OvRing;
  motion: { open: OvMotion; openFrom: number; dimOpen: OvMotion; close: OvMotion; dimClose: OvMotion };
};

export type AlertLayout = 'horizontal' | 'vertical' | 'single';
export type AlertLook = {
  dim: OvColor;
  z: { dim: number; surface: number };
  maxWidth: number;
  marginX: number;
  padding: number;
  radius: number;
  bg: OvColor;
  title: OvText;
  description: OvText & { marginTop: number };
  footer: { padTop: number; gap: number; below: { size: string; height: number }; above: { size: string; height: number } };
  layouts: Record<AlertLayout, string>;
  defaultLayout: AlertLayout;
  ring: OvRing;
  motion: { open: OvMotion; openFrom: number; dimOpen: OvMotion; close: OvMotion; dimClose: OvMotion };
};

export type PopoverLook = {
  minWidth: number;
  maxWidth: number;
  maxHeight: number;
  radius: number;
  bg: OvColor;
  shadow: OvColor;
  // 트리거와의 거리 · 화면 가장자리와의 거리
  offset: number;
  edge: number;
  z: number;
  header: OvHeader;
  title: OvText;
  description: OvText;
  close: OvClose;
  // 본문 — 좌우 · 머리가 없을 때 위 · 바닥이 없을 때 아래
  body: { padX: number; padTop: number; padBottom: number };
  scroll: OvScroll;
  footer: OvFooter;
  ring: OvRing;
  motion: { open: OvMotion; openFrom: number; close: OvMotion };
};

export type OverlayLook = {
  sheet: SheetLook;
  dialog: DialogLook;
  alert: AlertLook;
  popover: PopoverLook;
  // 1280 — 이 폭 미만은 시트, 이상은 대화상자 · 팝오버(Input Button 과 같은 경계)
  breakpoint: number;
  // 모션 줄이기 — 큰 전환을 이 시간의 서서히 나타남으로
  reduced: number;
  tone: Record<OvTone, OvColor>;
};

// 그림 속 화면이 쓰는 역할 색
export const OV_TONES = [
  'fg-neutral',
  'fg-neutral-muted',
  'fg-neutral-subtle',
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
  'chart-orange-weak',
  'chart-orange-contrast',
  'chart-blue-weak',
  'chart-blue-contrast',
  'chart-green-weak',
  'chart-green-contrast',
  'chart-violet-weak',
  'chart-violet-contrast',
] as const;
export type OvTone = (typeof OV_TONES)[number];

// 그림의 표시(손가락 · 커서) — 바깥을 누르거나 끄는 자리
export type OvGesture = 'tap' | 'drag' | 'click';

// 실제로 여닫는 미리보기 · 플레이그라운드가 받는 한 벌 — 표면 값과 바닥 버튼(시트 large · 대화상자 small · 확인창 medium | small)
export type OvButtons = { solid: ButtonLook; weak: ButtonLook; brand: ButtonLook; critical: ButtonLook };
export type OvKit = {
  ov: OverlayLook;
  sheet: OvButtons;
  dialog: OvButtons;
  // 확인창 — 1280 미만(below) · 이상(above)
  alert: { below: OvButtons; above: OvButtons };
};
