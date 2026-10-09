'use client';
// 스펙대로 그린 Slider — SliderLook(slider.yaml 을 푼 값)만 받아 그린다.
// state 를 주면 그 상태로 멈춘 그림, 안 주면 실제 슬라이더 — 끌기 · 트랙 누르기 · 키보드(APG)에 반응하고 손을 뗄 때 한 번 onValueCommit.
// 손잡이 줄(44) 전체가 누르는 자리, 트랙 4 · 채움 · 손잡이 20(누르는 동안 24) · 말풍선(끄는 동안 · 호버 · 키보드 포커스) · 아래 표식.
// 손잡이 가운데는 트랙 양 끝에서 반지름만큼 들어온 범위를 움직인다. 구간이 2 ~ 5개면 단계 자리마다 트랙을 끊는 틈(눈금)과 단계 표식.
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { icv, isDiscrete, segmentsOf, snapTo, typeStyle, type SliderLook, type SliderState, type SliderValue, type ViewMode } from './input-shared';
import { useReducedMotion } from './toggle-view';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export type SliderPart = 'control' | 'track' | 'fill' | 'thumb' | 'indicator' | 'markers' | 'tick';

export type SliderViewProps = {
  look: SliderLook;
  mode?: ViewMode;
  min: number;
  max: number;
  step?: number;
  value: SliderValue;
  onValueChange?: (v: SliderValue) => void;
  onValueCommit?: (v: SliderValue) => void;
  // 단위를 붙인 글 — "80%" · "4점"(aria-valuetext · 말풍선 · 표식). 서버 그림은 unit 으로, 브라우저 그림은 format 으로도
  unit?: string;
  format?: (v: number) => string;
  disabled?: boolean;
  // 멈춘 그림 — 손잡이의 상태(active 번째 손잡이). 없으면 실제 슬라이더
  state?: SliderState;
  active?: 0 | 1;
  // 멈춘 그림에서 말풍선을 강제로(끄는 동안 그림)
  indicator?: boolean;
  // 놓인 표면 — 눈금 틈의 색(시트 · 팝오버 위면 floating)
  surface?: 'default' | 'floating';
  // 이름 — Field 라벨(aria-labelledby) 또는 aria-label. 범위는 손잡이마다 "{라벨} 최소" · "{라벨} 최대"
  labelledBy?: string;
  label?: string;
  thumbLabels?: [string, string];
  describedBy?: string;
  invalid?: boolean;
  // 폭 — 수면 그 폭, 아니면 놓인 자리를 채운다(재서 쓴다)
  width?: number;
  // 부위마다 분홍 칠 · 핀(Anatomy)
  marks?: Partial<Record<SliderPart, CSSProperties>>;
  pins?: Partial<Record<SliderPart, ReactNode>>;
  // 표식을 그리지 않는다(나란히 비교하는 작은 그림)
  hideMarkers?: boolean;
};

const clampN = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function SliderView({
  look,
  mode = 'auto',
  min,
  max,
  step = 1,
  value,
  onValueChange,
  onValueCommit,
  unit = '',
  format = (v) => `${v}${unit}`,
  disabled = false,
  state,
  active = 0,
  indicator: forceIndicator,
  surface = 'default',
  labelledBy,
  label,
  thumbLabels = ['최소', '최대'],
  describedBy,
  invalid,
  width,
  marks,
  pins,
  hideMarkers = false,
}: SliderViewProps) {
  const live = state === undefined;
  const range = Array.isArray(value);
  const vals: number[] = range ? [value[0], value[1]] : [value];
  const controlRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [measured, setMeasured] = useState<number | null>(null);
  const W = width ?? measured ?? 312;
  const reduce = useReducedMotion();
  // 실제 슬라이더의 순간 상태 — 누르는 손잡이 · 끄는 중 · 호버 · 키보드 포커스
  const [pressing, setPressing] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focusRing, setFocusRing] = useState<number | null>(null);
  const [jumping, setJumping] = useState(false);
  // 누른 뒤 — moved 는 끌기가 됐는지(손잡이를 누르면 바로, 밖이면 dragStart 의 시간 · 거리를 넘을 때), x0 · y0 는 누른 자리
  const drag = useRef<{ index: number; start: number[]; moved: boolean; onThumb: boolean; x0: number; y0: number; timer: number } | null>(null);
  const latest = useRef(vals);
  latest.current = vals;
  // 건너뛰기(트랙 누르기 · 키보드) 모션이 끝나면 끄기를 1:1 로 따라가게 되돌린다
  useEffect(() => {
    if (!jumping) return;
    const t = window.setTimeout(() => setJumping(false), parseFloat(look.motion.jump.duration) + 40);
    return () => window.clearTimeout(t);
  }, [jumping, look.motion.jump.duration, vals.join()]);

  useIsoLayoutEffect(() => {
    if (width !== undefined) return;
    const el = controlRef.current;
    if (!el) return;
    const on = () => setMeasured(el.clientWidth);
    on();
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const discrete = isDiscrete(look, min, max, step);
  const segs = segmentsOf(min, max, step);
  const span = W - look.thumb.inset * 2;
  const xOf = (v: number) => look.thumb.inset + (span * (v - min)) / (max - min || 1);
  const off = disabled || state === 'disabled';

  // 상태 — 멈춘 그림은 state, 실제는 순간 상태에서
  const thumbState = (i: number): SliderState => {
    if (!live) return off ? 'disabled' : i === active ? state! : 'enabled';
    if (off) return 'disabled';
    if (pressing === i) return 'pressed';
    if (focusRing === i) return 'focused';
    if (hovered === i) return 'hovered';
    return 'enabled';
  };
  const showIndicator = (i: number) => {
    if (off) return false;
    if (!live) return forceIndicator ?? (i === active && (state === 'hovered' || state === 'focused' || state === 'pressed'));
    // 트랙을 눌러 건너뛰기만 하면 뜨지 않는다 — 손잡이를 누르거나 끌기 시작하면
    if (pressing === i) return dragging || !!drag.current?.onThumb;
    return focusRing === i || hovered === i;
  };

  const setVals = (next: number[], commit: boolean) => {
    const out: SliderValue = range ? [next[0], next[1]] : next[0];
    onValueChange?.(out);
    if (commit) onValueCommit?.(out);
  };
  const valueAt = (clientX: number) => {
    const r = controlRef.current!.getBoundingClientRect();
    const ratio = clampN((clientX - r.left - look.thumb.inset) / (r.width - look.thumb.inset * 2), 0, 1);
    return snapTo(min, max, step, min + ratio * (max - min));
  };
  const place = (index: number, v: number) => {
    const next = [...latest.current];
    if (range) next[index] = index === 0 ? Math.min(v, next[1]) : Math.max(v, next[0]);
    else next[0] = v;
    return next;
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!live || off || e.button !== 0) return;
    e.preventDefault();
    const v = valueAt(e.clientX);
    const target = e.target as HTMLElement;
    const thumbIndex = thumbRefs.current.findIndex((t) => t && t.contains(target));
    // 가장 가까운 손잡이(범위) — 같은 거리면 움직일 수 있는 쪽
    let index = thumbIndex >= 0 ? thumbIndex : 0;
    if (thumbIndex < 0 && range) {
      const d0 = Math.abs(latest.current[0] - v);
      const d1 = Math.abs(latest.current[1] - v);
      index = d0 < d1 ? 0 : d1 < d0 ? 1 : v < latest.current[0] ? 0 : 1;
    }
    const d = { index, start: [...latest.current], moved: false, onThumb: thumbIndex >= 0, x0: e.clientX, y0: e.clientY, timer: 0 };
    drag.current = d;
    controlRef.current?.setPointerCapture(e.pointerId);
    setDragging(false);
    thumbRefs.current[index]?.focus({ preventScroll: true });
    setFocusRing(null);
    if (thumbIndex >= 0) {
      // 손잡이를 누르면 바로 끌기 — 손잡이 24 + 말풍선
      setPressing(index);
      return;
    }
    // 손잡이 밖 — 그 자리로 건너뛰기만 한다(손잡이 20 · 말풍선 없음). dragStart 의 시간을 넘게 누르고 있으면 끌기가 된다
    setPressing(null);
    setJumping(true);
    setVals(place(index, v), false);
    d.timer = window.setTimeout(() => {
      if (drag.current !== d || d.moved) return;
      d.moved = true;
      setPressing(index);
      setDragging(true);
    }, look.control.dragStart.delay);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    if (!d.moved) {
      // 손잡이 밖을 누른 뒤 dragStart 의 거리 안 — 아직 건너뛰기다(값을 옮기지 않는다)
      if (!d.onThumb && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) <= look.control.dragStart.distance) return;
      d.moved = true;
      window.clearTimeout(d.timer);
      setPressing(d.index);
      setDragging(true);
      setJumping(false);
    }
    const v = valueAt(e.clientX);
    const next = place(d.index, v);
    if (next.some((x, i) => x !== latest.current[i])) setVals(next, false);
  };
  const end = () => {
    const d = drag.current;
    if (!d) return;
    window.clearTimeout(d.timer);
    drag.current = null;
    setPressing(null);
    setDragging(false);
    // 손을 뗄 때 한 번 — 값이 바뀌었으면
    if (latest.current.some((x, i) => x !== d.start[i])) onValueCommit?.(range ? [latest.current[0], latest.current[1]] : latest.current[0]);
  };

  const onKeyDown = (i: number) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (!live || off) return;
    const cur = latest.current[i];
    const page = step * look.pageSteps;
    const lo = range && i === 1 ? latest.current[0] : min;
    const hi = range && i === 0 ? latest.current[1] : max;
    let v: number | null = null;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        v = cur + (e.shiftKey ? page : step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        v = cur - (e.shiftKey ? page : step);
        break;
      case 'PageUp':
        v = cur + page;
        break;
      case 'PageDown':
        v = cur - page;
        break;
      case 'Home':
        v = lo;
        break;
      case 'End':
        v = hi;
        break;
    }
    if (v === null) return;
    e.preventDefault();
    v = clampN(snapTo(min, max, step, v), lo, hi);
    setFocusRing(i);
    if (v === cur) return;
    setJumping(true);
    // 키마다 한 번 저장
    setVals(place(i, v), true);
  };

  const anim = jumping && !dragging && !reduce;
  const jump = anim ? `${look.motion.jump.duration} ${look.motion.jump.easing}` : null;
  const H = look.control.height;
  const trackBg = icv(off ? look.track.disabledBg : look.track.bg, mode);
  const fillBg = icv(off ? look.fill.disabledBg : look.fill.bg, mode);
  const fillL = range ? xOf(vals[0]) : 0;
  const fillR = xOf(range ? vals[1] : vals[0]);
  const gapBg = icv(surface === 'floating' ? look.tick.floatingBg : look.tick.bg, mode);
  const markerFg = icv(off ? look.markers.disabledFg : look.markers.fg, mode);
  const tickXs = discrete ? Array.from({ length: segs - 1 }, (_, k) => xOf(min + step * (k + 1))) : [];

  const markerList = discrete ? Array.from({ length: segs + 1 }, (_, k) => min + step * k) : [min, max];
  const names = range ? thumbLabels.map((t) => (label ? `${label} ${t}` : t)) : [label];

  return (
    // 위 여백 — 말풍선 자리(Field 머리 ↔ 손잡이 줄 = Field 간격 + padTop). 누르는 자리는 손잡이 줄 44 그대로
    <div data-slider style={{ display: 'flex', flexDirection: 'column', rowGap: look.gap, paddingTop: look.padTop, width: width ?? '100%', minWidth: 0, userSelect: 'none', WebkitUserSelect: 'none' }}>
      <div
        ref={controlRef}
        data-slider-control
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerCancel={end}
        style={{ position: 'relative', height: H, touchAction: look.control.touchAction, cursor: !live ? undefined : off ? 'not-allowed' : 'pointer', ...marks?.control }}
      >
        {pins?.control}
        <div data-slider-track style={{ position: 'absolute', left: 0, right: 0, top: (H - look.track.height) / 2, height: look.track.height, borderRadius: 9999, overflow: 'hidden', background: trackBg, ...marks?.track }}>
          <div data-slider-fill style={{ position: 'absolute', top: 0, bottom: 0, left: fillL, width: Math.max(0, fillR - fillL), background: fillBg, transitionProperty: jump ? 'left, width' : 'none', transitionDuration: jump ? look.motion.jump.duration : undefined, transitionTimingFunction: jump ? look.motion.jump.easing : undefined, ...marks?.fill }} />
          {tickXs.map((x, k) => (
            <span key={k} aria-hidden data-slider-tick style={{ position: 'absolute', top: 0, bottom: 0, left: x - look.tick.width / 2, width: look.tick.width, background: gapBg, ...(k === 0 ? marks?.tick : undefined) }} />
          ))}
        </div>
        {pins?.track}
        {vals.map((v, i) => {
          const st = thumbState(i);
          const size = look.thumb.size;
          const k = st === 'pressed' ? look.thumb.pressedSize / size : 1;
          const x = xOf(v);
          const ring = st === 'focused' || (live && focusRing === i && pressing !== i);
          return (
            <div
              key={i}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              role={live ? 'slider' : undefined}
              aria-hidden={live ? undefined : true}
              tabIndex={live && !off ? 0 : undefined}
              aria-valuemin={live ? (range && i === 1 ? vals[0] : min) : undefined}
              aria-valuemax={live ? (range && i === 0 ? vals[1] : max) : undefined}
              aria-valuenow={live ? v : undefined}
              aria-valuetext={live ? format(v) : undefined}
              aria-labelledby={live && !range ? labelledBy : undefined}
              aria-label={live && (range || !labelledBy) ? names[i] : undefined}
              aria-describedby={live ? describedBy : undefined}
              aria-invalid={live && invalid ? true : undefined}
              aria-disabled={live && off ? true : undefined}
              aria-orientation={live ? 'horizontal' : undefined}
              data-slider-thumb={i}
              onKeyDown={onKeyDown(i)}
              onFocus={(e) => setFocusRing(e.currentTarget.matches(':focus-visible') ? i : null)}
              onBlur={() => setFocusRing((f) => (f === i ? null : f))}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
              onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
              style={{
                position: 'absolute',
                left: x - size / 2,
                top: (H - size) / 2,
                width: size,
                height: size,
                boxSizing: 'border-box',
                borderRadius: 9999,
                background: icv(off ? look.thumb.disabledBg : look.thumb.bg, mode),
                transform: k === 1 ? 'none' : `scale(${k})`,
                transitionProperty: jump ? 'left, transform' : 'transform',
                transitionDuration: jump ? `${look.motion.jump.duration}, ${look.motion.press.duration}` : reduce ? '0ms' : look.motion.press.duration,
                transitionTimingFunction: jump ? `${look.motion.jump.easing}, ${look.motion.press.easing}` : look.motion.press.easing,
                outlineStyle: ring ? 'solid' : 'none',
                outlineWidth: look.ring.width / k,
                outlineOffset: look.ring.offset / k,
                outlineColor: icv(look.ring.color, mode),
                cursor: !live ? undefined : off ? 'not-allowed' : pressing === i ? 'grabbing' : 'grab',
                ...(i === active ? marks?.thumb : undefined),
              }}
            >
              {i === active && pins?.thumb}
            </div>
          );
        })}
        {vals.map((v, i) => (
          <Indicator key={`i${i}`} look={look} mode={mode} x={xOf(v)} W={W} H={H} thumb={look.thumb.size} text={format(v)} shown={showIndicator(i)} jump={jump} reduce={reduce} mark={i === active ? marks?.indicator : undefined} pin={i === active ? pins?.indicator : undefined} />
        ))}
      </div>
      {!hideMarkers && (
        <div aria-hidden data-slider-markers style={{ position: 'relative', height: look.markers.text.lineHeight, ...typeStyle(look.markers.text), color: markerFg, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', ...marks?.markers }}>
          {pins?.markers}
          {markerList.map((m, k) => {
            const first = k === 0;
            const last = k === markerList.length - 1;
            const pos: CSSProperties = first ? { left: 0 } : last ? { right: 0 } : { left: xOf(m), transform: 'translateX(-50%)' };
            return (
              <span key={m} style={{ position: 'absolute', top: 0, ...pos }}>
                {format(m)}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 말풍선 — 손잡이 위 offsetY 의 상자 + 아래 화살표. 트랙 끝에서는 상자만 안으로 밀리고 화살표는 손잡이 가운데를 가리킨다.
// 자리는 누르지 않은 손잡이(thumb) 기준이다 — 누른 손잡이가 커져도 말풍선은 그대로(눈으로는 손잡이와 offsetY − 커진 반만큼)
function Indicator({ look, mode, x, W, H, thumb, text, shown, jump, reduce, mark, pin }: { look: SliderLook; mode: ViewMode; x: number; W: number; H: number; thumb: number; text: string; shown: boolean; jump: string | null; reduce: boolean; mark?: CSSProperties; pin?: ReactNode }) {
  const I = look.indicator;
  const M = look.motion;
  const bottom = H / 2 + thumb / 2 + I.offsetY;
  // 나타남 · 사라짐 — 나타날 때 enterScale · enterOpacity · 아래 enterY 에서 제자리로, 사라질 때 exitOpacity · 아래 exitY 로(확대는 그대로).
  // 모션 줄이기면 확대 · 이동 없이 투명도만. 시작 모습이 둘이라 전환(transition) 대신 그때그때 움직인다(Web Animations)
  const box = useRef<HTMLDivElement | null>(null);
  const was = useRef(shown);
  useEffect(() => {
    const el = box.current;
    if (!el || was.current === shown) return;
    was.current = shown;
    const move = (y: number, k = 1) => (reduce ? 'none' : `translateY(${y}px) scale(${k})`);
    if (shown) el.animate([{ opacity: M.enterOpacity, transform: move(M.enterY, M.enterScale) }, { opacity: 1, transform: 'none' }], { duration: parseFloat(M.enter.duration), easing: M.enter.easing });
    else el.animate([{ opacity: 1, transform: 'none' }, { opacity: M.exitOpacity, transform: move(M.exitY) }], { duration: parseFloat(M.exit.duration), easing: M.exit.easing });
  }, [shown, reduce, M]);
  return (
    <div aria-hidden data-slider-indicator={shown ? 'shown' : 'hidden'} style={{ position: 'absolute', left: x, bottom, width: 0, height: 0, pointerEvents: 'none', transitionProperty: jump ? 'left' : 'none', transitionDuration: jump ? look.motion.jump.duration : undefined, transitionTimingFunction: jump ? look.motion.jump.easing : undefined, zIndex: 2 }}>
      <div ref={box} style={{ position: 'absolute', left: 0, bottom: 0, opacity: shown ? 1 : M.exitOpacity, transformOrigin: '0 100%' }}>
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            // 트랙 안 — 왼쪽 끝 0 · 오른쪽 끝 W 를 넘지 않게(상자 폭은 % 로 — 그 상자 자신의 폭)
            transform: `translateX(min(max(-50%, ${-x}px), calc(${W - x}px - 100%)))`,
            boxSizing: 'border-box',
            minWidth: I.minWidth,
            paddingTop: I.padY,
            paddingBottom: I.padY,
            paddingLeft: I.padX,
            paddingRight: I.padX,
            borderRadius: I.radius,
            background: icv(I.bg, mode),
            color: icv(I.fg, mode),
            ...typeStyle(I.text),
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            ...mark,
          }}
        >
          {text}
          {pin}
        </span>
        <span style={{ position: 'absolute', left: -I.arrowW / 2, top: 0, width: 0, height: 0, borderLeft: `${I.arrowW / 2}px solid transparent`, borderRight: `${I.arrowW / 2}px solid transparent`, borderTop: `${I.arrowH}px solid ${icv(I.bg, mode)}` }} />
      </div>
    </div>
  );
}

// 머리 값 — Field 머리 오른쪽(headerAction)의 지금 값. 보조 기술에는 숨긴다
export function SliderValueView({ look, mode = 'auto', disabled = false, children, mark }: { look: SliderLook; mode?: ViewMode; disabled?: boolean; children: ReactNode; mark?: CSSProperties }) {
  return (
    <span aria-hidden data-slider-value style={{ ...typeStyle(look.header.text), color: icv(disabled ? look.header.disabledFg : look.header.fg, mode), fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', ...mark }}>
      {children}
    </span>
  );
}
