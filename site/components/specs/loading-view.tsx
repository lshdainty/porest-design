'use client';
// 스펙대로 그린 기다림 묶음 — Skeleton · Progress Circle · Progress(미터) · Scroll Fog · Content Placeholder.
// 값은 loading-look 이 YAML 에서 푼 것(LoadingKit)만 받는다. 움직임(반짝임 · 회전 · 호 · 채움)의 시간 · 곡선은 사이트 전체에 깐
// loadingCss(tokens-style)의 클래스가 YAML 값으로 정하고, 모션 줄이기(기기 설정)면 멈춘다. still 은 그림 · 플레이그라운드에서
// 모션 줄이기의 모습을 기기 설정과 상관없이 보일 때 쓴다.
import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode, type Ref } from 'react';
import { CreditCard, FileText, Image as ImageIcon, Receipt, type LucideIcon } from 'lucide-react';
import { PcArc } from './pc-arc';
import {
  FONT,
  fogMaskStyle,
  glyphSize,
  lcv,
  pcRatio,
  SK_ROW,
  comma,
  type CpGlyph,
  type FogUse,
  type PcSize,
  type PcTone,
  type PgMeaning,
  type PlaceholderLook,
  type ProgressCircleLook,
  type RowDims,
  type SkRowWidths,
  type ProgressLook,
  type ScrollFogLook,
  type SkRadius,
  type SkText,
  type SkeletonLook,
  type ViewMode,
} from './loading-shared';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// ── Skeleton ─────────────────────────────────────────────
// 같은 화면의 스켈레톤은 한 박자로 지난다 — 늦게 붙은 것도 문서의 시계에 맞춰 띠의 자리를 맞춘다(skeleton.yaml motion "반짝임")
function useSharedClock(ref: { current: HTMLElement | null }, ms: number, on: boolean) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !on) return;
    const now = typeof document !== 'undefined' && document.timeline?.currentTime != null ? Number(document.timeline.currentTime) : performance.now();
    el.style.animationDelay = `${-(now % ms)}ms`;
  }, [ref, ms, on]);
}

export type SkeletonViewProps = {
  look: SkeletonLook;
  mode?: ViewMode;
  radius?: SkRadius;
  // 글 · 숫자 자리 — 그 글자의 줄 높이가 높이(모서리는 기본 8)
  text?: SkText;
  width?: number | string;
  height?: number | string;
  // 모션 줄이기로 보이기 — 띠가 멈추고 면만
  still?: boolean;
  // 멈춘 띠의 자리(translateX %) — Anatomy · 반짝임 그림
  band?: number;
  // 0 ~ 1초 — 자리(높이)는 지키고 보이지 않게
  hidden?: boolean;
  style?: CSSProperties;
};

export function SkeletonView({ look, mode = 'auto', radius, text, width = '100%', height, still = false, band, hidden = false, style }: SkeletonViewProps) {
  const bandRef = useRef<HTMLSpanElement | null>(null);
  const r = look.radius[radius ?? look.defaultRadius];
  const h = height ?? (text ? look.text[text].lineHeight : undefined);
  const shimmer = mode === 'auto' ? 'var(--p-gradient-shimmer-neutral)' : mode === 'dark' ? look.shimmer.dark : look.shimmer.light;
  const moving = band === undefined && !still && !hidden;
  useSharedClock(bandRef, look.motion.shimmer.ms, moving);
  return (
    <span
      aria-hidden
      data-skeleton=""
      style={{ position: 'relative', display: 'block', flexShrink: 0, overflow: 'hidden', boxSizing: 'border-box', width, height: h, borderRadius: r, background: lcv(look.bg, mode), visibility: hidden ? 'hidden' : undefined, ...style }}
    >
      <span
        ref={bandRef}
        className="psk-band"
        data-still={still || hidden || undefined}
        style={band === undefined ? { position: 'absolute', inset: 0, background: shimmer } : { position: 'absolute', inset: 0, background: shimmer, animation: 'none', opacity: 1, transform: `translateX(${band}%)` }}
      />
    </span>
  );
}

// 거래 줄 스켈레톤 — 껍데기는 List 의 줄 그대로(dims), 글 자리는 그 글자의 줄 높이(제목 t5 · 메타 t3 · 금액 t5), 앞 자리는 List 타일 12(썸네일이면 Image Frame 모서리 — 40 은 6 · 사람이면 full)
export type SkRowPart = 'avatar' | 'title' | 'detail' | 'amount';
export function SkeletonRowsView({
  look,
  dims: d,
  n = 4,
  mode = 'auto',
  still,
  hidden,
  band,
  widths = SK_ROW,
  avatar = '12',
  amount = true,
  marks,
}: {
  look: SkeletonLook;
  dims: RowDims;
  n?: number;
  mode?: ViewMode;
  still?: boolean;
  hidden?: boolean;
  band?: number;
  widths?: SkRowWidths;
  avatar?: SkRadius;
  amount?: boolean;
  // 그림 표시 — "줄 번호:부위"(예: "0:title") 마다 칠(서버 그림이 넘기므로 함수가 아니라 값으로)
  marks?: Partial<Record<`${number}:${SkRowPart}`, CSSProperties>>;
}) {
  const mark = (i: number, part: SkRowPart) => marks?.[`${i}:${part}`];
  const b = { look, mode, still, hidden, band };
  return (
    <div aria-hidden style={{ display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', minHeight: d.height - d.padY * 2, padding: `${d.padY}px ${d.padX}px` }}>
          <span style={{ paddingRight: d.prefixGap, display: 'flex' }}>
            <SkeletonView {...b} radius={avatar} width={widths.avatar} height={widths.avatar} style={mark?.(i, 'avatar')} />
          </span>
          <span style={{ display: 'flex', flex: 1, minWidth: 0, flexDirection: 'column', gap: d.bodyGap, paddingRight: d.suffixGap }}>
            <SkeletonView {...b} text="t5" width={widths.title} style={mark?.(i, 'title')} />
            <SkeletonView {...b} text="t3" width={widths.detail} style={mark?.(i, 'detail')} />
          </span>
          {amount && <SkeletonView {...b} text="t5" width={widths.amount} style={mark?.(i, 'amount')} />}
        </div>
      ))}
    </div>
  );
}

// 오래 걸림 글 — 5초부터 한 줄(skeleton.yaml slowText)
export function SlowTextView({ look, mode = 'auto', align = 'left', children = '평소보다 오래 걸리고 있어요.', style }: { look: SkeletonLook; mode?: ViewMode; align?: 'left' | 'center'; children?: ReactNode; style?: CSSProperties }) {
  const t = look.slowText;
  return <p style={{ margin: 0, fontFamily: t.fontFamily, fontSize: t.fontSize, lineHeight: t.lineHeight, fontWeight: t.fontWeight, color: lcv(t.color, mode), textAlign: align, ...style }}>{children}</p>;
}

// ── Progress Circle ──────────────────────────────────────
export type ProgressCircleViewProps = {
  look: ProgressCircleLook;
  mode?: ViewMode;
  // 24 · 40, 또는 놓인 부품이 정한 크기 · 두께(inherit — Button 14 · 14 · 16 · 18 · 두께 2)
  size?: PcSize | { size: number; thickness: number };
  tone?: PcTone;
  // 값 — 없으면 값 없는 원
  value?: number;
  min?: number;
  max?: number;
  still?: boolean;
  // 이름 · 값 글 — 기본 "불러오는 중" · 반올림한 "40%"
  label?: string;
  valueText?: string;
  // 장식 — 버튼 안처럼 다른 것이 알릴 때(aria-hidden)
  decorative?: boolean;
  style?: CSSProperties;
};

export function ProgressCircleView({ look, mode = 'auto', size = look.defaults.size, tone = look.defaults.tone, value, min = 0, max = 100, still = false, label = '불러오는 중', valueText, decorative = false, style }: ProgressCircleViewProps) {
  const dim = typeof size === 'string' ? look.sizes[size] : size;
  const det = value !== undefined;
  const ratio = det ? pcRatio(value, min, max) : undefined;
  const face = tone === 'inherit' ? null : look.tones[tone];
  const track = face ? lcv(face.track, mode) : `color-mix(in srgb, currentColor ${look.inheritTrackAlpha}%, transparent)`;
  const range = face ? lcv(face.range, mode) : 'currentColor';
  const aria = decorative
    ? { 'aria-hidden': true as const }
    : {
        role: 'progressbar',
        'aria-label': label,
        ...(det ? { 'aria-valuemin': min, 'aria-valuemax': max, 'aria-valuenow': value, 'aria-valuetext': valueText ?? `${Math.round((ratio ?? 0) * 100)}%` } : {}),
      };
  return (
    <span {...aria} style={{ display: 'inline-flex', flexShrink: 0, width: dim.size, height: dim.size, ...style }}>
      <PcArc size={dim.size} thickness={dim.thickness} track={track} range={range} ratio={ratio} still={still} />
    </span>
  );
}

// ── Progress(미터) ───────────────────────────────────────
export type PgPart = 'label' | 'status' | 'track' | 'fill' | 'amount';
export type ProgressViewProps = {
  look: ProgressLook;
  mode?: ViewMode;
  label: string;
  value: number;
  max: number;
  meaning?: PgMeaning;
  // 금액 줄 · 넘친 글의 단위 — 기본 "원"("350,000원"). 돈이 아닌 값은 그 단위로("6시간")
  unit?: string;
  width?: number | string;
  // 그림 — 부위마다 칠 · 핀
  zone?: Partial<Record<PgPart, CSSProperties>>;
  pins?: Partial<Record<PgPart, ReactNode>>;
  // 넘친 만큼 막대를 늘인 · 초록으로 바꾼 나쁜 예
  fillStyle?: CSSProperties;
  statusStyle?: CSSProperties;
  statusText?: string;
  style?: CSSProperties;
};


export function progressState(meaning: PgMeaning, value: number, max: number) {
  if (meaning === 'limit' && value > max) return 'over' as const;
  if (meaning === 'goal' && value >= max) return 'reached' as const;
  return 'enabled' as const;
}

export function ProgressView({ look, mode = 'auto', label, value, max, meaning = look.defaultMeaning, unit = '원', width = '100%', zone, pins, fillStyle, statusStyle, statusText, style }: ProgressViewProps) {
  const format = (n: number) => `${comma(n)}${unit}`;
  const st = progressState(meaning, value, max);
  const ratio = max > 0 ? value / max : 0;
  const status = statusText ?? (st === 'over' ? `${format(value - max)} 초과` : st === 'reached' ? '달성' : `${Math.round(ratio * 100)}%`);
  const statusColor = st === 'over' ? look.over.status : st === 'reached' ? look.reached.status : look.status.color;
  const statusWeight = st === 'over' ? look.over.weight : st === 'reached' ? look.reached.weight : look.status.fontWeight;
  const pct = Math.min(1, Math.max(0, ratio)) * 100;
  // 값이 0 보다 크면 적어도 높이만큼 — 둥근 끝이 찌그러지지 않게
  const fillW = value > 0 ? `max(${look.track.height}px, ${pct}%)` : '0%';
  const pin = (p: PgPart) => pins?.[p] && <span aria-hidden className="pointer-events-none absolute" style={{ left: -26, top: '50%', marginTop: -10, zIndex: 3 }}>{pins[p]}</span>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: look.gap, width, fontFamily: FONT, ...style }}>
      <div aria-hidden style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: look.headerGap }}>
        <span style={{ position: 'relative', fontSize: look.label.fontSize, lineHeight: look.label.lineHeight, fontWeight: look.label.fontWeight, color: lcv(look.label.color, mode), ...zone?.label }}>
          {label}
          {pin('label')}
        </span>
        <span style={{ position: 'relative', flexShrink: 0, fontSize: look.status.fontSize, lineHeight: look.status.lineHeight, fontWeight: statusWeight, color: lcv(statusColor, mode), fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', ...zone?.status, ...statusStyle }}>
          {status}
          {pins?.status && <span aria-hidden className="pointer-events-none absolute" style={{ right: -26, top: '50%', marginTop: -10, zIndex: 3 }}>{pins.status}</span>}
        </span>
      </div>
      <div
        role="meter"
        aria-label={`${label} ${format(max)} 중 ${format(value)}`}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.min(value, max)}
        aria-valuetext={status}
        style={{ position: 'relative', height: look.track.height, borderRadius: look.track.radius, background: lcv(look.track.bg, mode), ...zone?.track }}
      >
        <span className="ppg-fill" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: fillW, borderRadius: look.fill.radius, background: lcv(st === 'over' ? look.over.fill : look.fill.bg, mode), ...zone?.fill, ...fillStyle }} />
        {pin('track')}
        {pins?.fill && <span aria-hidden className="pointer-events-none absolute" style={{ left: `calc(${Math.min(pct, 100) / 2}% - 10px)`, top: -26, zIndex: 3 }}>{pins.fill}</span>}
      </div>
      <span aria-hidden style={{ position: 'relative', alignSelf: 'flex-start', fontSize: look.amount.fontSize, lineHeight: look.amount.lineHeight, fontWeight: look.amount.fontWeight, color: lcv(look.amount.color, mode), fontVariantNumeric: 'tabular-nums', ...zone?.amount }}>
        {format(value)} / {format(max)}
        {pin('amount')}
      </span>
    </div>
  );
}

// ── Scroll Fog ───────────────────────────────────────────
export type ScrollFogViewProps = {
  look: ScrollFogLook;
  use?: FogUse;
  children: ReactNode;
  // 나쁜 예 — 흐림 없이 · 여백 없이
  fog?: boolean;
  pad?: boolean;
  // 멈춘 그림 — 스크롤한 만큼(가로 줄은 왼쪽으로, 세로는 위로). at="end" 면 끝까지 스크롤한 모습
  offset?: number;
  at?: 'start' | 'end';
  live?: boolean;
  ariaLabel?: string;
  tabIndex?: number;
  scrollRef?: Ref<HTMLDivElement>;
  onScroll?: () => void;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
};

export function ScrollFogView({ look, use = look.defaultUse, children, fog = true, pad = true, offset = 0, at = 'start', live = true, ariaLabel, tabIndex, scrollRef, onScroll, style, innerStyle }: ScrollFogViewProps) {
  const p = look.uses[use];
  const x = p.axis === 'x';
  // 끝까지 스크롤한 멈춘 그림 — 안쪽을 끝에 붙여 처음 쪽이 넘치게 한다
  const end = !live && at === 'end';
  const shift = offset ? (x ? { transform: `translateX(${-offset}px)` } : { transform: `translateY(${-offset}px)` }) : {};
  return (
    <div
      ref={scrollRef}
      role={ariaLabel ? 'region' : undefined}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onScroll={onScroll}
      data-scroll-fog={use}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        overflowX: x ? (live ? 'auto' : 'hidden') : 'hidden',
        overflowY: x ? 'hidden' : live ? 'auto' : 'hidden',
        overscrollBehavior: 'contain',
        scrollbarWidth: x ? 'none' : undefined,
        display: end ? 'flex' : undefined,
        flexDirection: end ? (x ? 'row' : 'column') : undefined,
        justifyContent: end ? 'flex-end' : undefined,
        scrollPaddingTop: p.scroll.top,
        scrollPaddingBottom: p.scroll.bottom,
        scrollPaddingLeft: p.scroll.left,
        scrollPaddingRight: p.scroll.right,
        ...(fog ? fogMaskStyle(look.mask, p.sides) : {}),
        ...style,
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          flexShrink: end ? 0 : undefined,
          display: x ? 'flex' : 'block',
          width: x ? 'max-content' : undefined,
          minWidth: x ? '100%' : undefined,
          paddingTop: pad ? (p.pad.top ?? 0) : 0,
          paddingBottom: pad ? (p.pad.bottom ?? 0) : 0,
          paddingLeft: pad ? (p.pad.left ?? 0) : 0,
          paddingRight: pad ? (p.pad.right ?? 0) : 0,
          ...shift,
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Content Placeholder ──────────────────────────────────
export const CP_ICONS: Record<CpGlyph, LucideIcon> = { image: ImageIcon, 'credit-card': CreditCard, receipt: Receipt, 'file-text': FileText };

export type ContentPlaceholderViewProps = {
  look: PlaceholderLook;
  mode?: ViewMode;
  icon?: CpGlyph;
  // 대체 글 — 주면 role=img + 이름, 안 주면 보조 기술에 숨긴다
  label?: string;
  // 틀 크기를 알면 그림 크기를 계산해 그린다(모르면 틀의 크기를 따라 CSS 로)
  w?: number;
  h?: number;
  glyphStyle?: CSSProperties;
  style?: CSSProperties;
};

export function ContentPlaceholderView({ look, mode = 'auto', icon = 'image', label, w, h, glyphStyle, style }: ContentPlaceholderViewProps) {
  const g = look.glyph;
  const I = CP_ICONS[icon];
  const side = w !== undefined && h !== undefined ? `${glyphSize(g, w, h)}px` : `min(clamp(${g.min}px, ${g.ratio * 100}cqh, ${g.max}px), 100cqw)`;
  const aria = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <div {...aria} data-placeholder="" style={{ position: 'relative', display: 'grid', placeItems: 'center', width: '100%', height: '100%', boxSizing: 'border-box', background: lcv(look.bg, mode), containerType: 'size', ...style }}>
      <span aria-hidden style={{ display: 'block', width: side, height: side, color: lcv(g.color, mode), ...glyphStyle }}>
        <I size="100%" strokeWidth={g.stroke} style={{ display: 'block' }} />
      </span>
    </div>
  );
}
