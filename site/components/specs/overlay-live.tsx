'use client';
// 실제로 여닫는 자리 — 딤 · 쌓임(z-index) · Esc · 바깥 누르기 · 초점(안으로 · 가두기 · 연 자리로) · 스크롤 잠금 · 끌어 닫기 · 모션.
// overlay-view 의 판을 감싼다. 페이지 전체(body 에 띄움, fixed)나 그림 속 화면(stage, absolute) 안에 띄운다.
// 값은 OverlayLook(YAML) 에서 온다 — 시트 300 · 200ms, 대화상자 · 확인창 1.3 배에서 200ms · 사라짐 100ms, 팝오버 0.95 배에서 150ms,
// 끌어 닫기 0.4px/ms · 25% · 열린 뒤 0.5초(bottom-sheet.md Behavior).
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode, type Ref } from 'react';
import { createPortal } from 'react-dom';
import { ms, ocv, type OverlayLook, type PopoverLook, type ViewMode } from './overlay-shared';
import { useReducedMotion } from './overlay-view';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export type CloseReason = 'close' | 'esc' | 'outside' | 'drag' | 'tab';

// 폭이 이 값 이상인지 — 1280 이상이면 대화상자 · 팝오버, 미만이면 시트
export function useMinWidth(px: number) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setWide(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [px]);
  return wide;
}

const TABBABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
export function tabbables(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(TABBABLE)).filter((el) => el.tabIndex >= 0 && !el.closest('[aria-hidden="true"]') && el.offsetParent !== null);
}

// 페이지 스크롤 잠금 — 겹쳐 열려도 마지막이 닫힐 때 푼다
let locks = 0;
let saved = '';
function lockScroll() {
  if (locks++ === 0) {
    saved = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
  }
}
function unlockScroll() {
  if (--locks === 0) document.documentElement.style.overflow = saved;
}

type Phase = 'enter' | 'open' | 'exit';

// 열림 · 닫힘 단계 — 열면 그리고 한 프레임 뒤 open(전환이 걸리게), 닫으면 exit 를 그린 뒤 그 시간이 지나면 걷는다
function usePhase(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open);
  const [phase, setPhase] = useState<Phase>(open ? 'enter' : 'exit');
  useEffect(() => {
    if (open) {
      setMounted(true);
      setPhase('enter');
      let r2 = 0;
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setPhase('open'));
      });
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
    }
    setPhase('exit');
    const t = window.setTimeout(() => setMounted(false), exitMs);
    return () => window.clearTimeout(t);
  }, [open, exitMs]);
  return { mounted, phase };
}

// ── 모달(시트 · 대화상자 · 확인창) ─────────────────────────
export type ModalKind = 'sheet' | 'dialog' | 'alert';
export type ModalRender = {
  ref: Ref<HTMLDivElement>;
  rootProps: HTMLAttributes<HTMLDivElement>;
  style: CSSProperties;
  // 판의 높이 상한(시트 90% · 대화상자 80% — 화면 · stage 높이에 대해)
  maxHeight: string;
};

export function ModalLayer({
  open,
  kind,
  look,
  mode = 'auto',
  onRequestClose,
  outside,
  drag = false,
  container,
  labelledBy,
  describedBy,
  returnFocus,
  focusSelector,
  children,
}: {
  open: boolean;
  kind: ModalKind;
  look: OverlayLook;
  mode?: ViewMode;
  onRequestClose: (reason: CloseReason) => void;
  // 바깥(딤) 누르기 — 조회 · 고르기는 닫고, 입력 폼 · 확인창은 무시한다
  outside: 'close' | 'ignore';
  // 아래로 끌어 닫기(시트 — 입력 폼은 끄지 않는다)
  drag?: boolean;
  // 그림 속 화면 — 주면 그 안(absolute)에, 없으면 페이지 전체(fixed)에 띄운다
  container?: HTMLElement | null;
  labelledBy?: string;
  describedBy?: string;
  // 닫힌 뒤 초점을 돌려줄 자리(트리거). 없으면 열 때 초점이 있던 자리
  returnFocus?: () => HTMLElement | null;
  // 처음 초점 — 기본은 판(본문 위). 고르는 시트는 고른 날 · 검색칸처럼 안의 자리를 줄 수 있다
  focusSelector?: string;
  children: (p: ModalRender) => ReactNode;
}) {
  const reduce = useReducedMotion();
  const m = kind === 'sheet' ? look.sheet : kind === 'dialog' ? look.dialog : look.alert;
  const exitMs = reduce ? look.reduced : Math.max(ms(m.motion.close.duration), ms(m.motion.dimClose.duration));
  const { mounted, phase } = usePhase(open, exitMs);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const before = useRef<HTMLElement | null>(null);
  const openedAt = useRef(0);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [returning, setReturning] = useState(false);
  const track = useRef<{ id: number; y0: number; x0: number; started: boolean; samples: { y: number; t: number }[] } | null>(null);
  const swallowClick = useRef(false);
  const portal = !container;

  // 열 때 — 초점이 있던 자리를 기억하고, 판으로 초점을 옮긴다. 페이지 전체면 스크롤을 잠근다
  useEffect(() => {
    if (!mounted) return;
    before.current = document.activeElement as HTMLElement | null;
    openedAt.current = performance.now();
    if (portal) lockScroll();
    const r = requestAnimationFrame(() => {
      const root = rootRef.current;
      const want = (focusSelector ? root?.querySelector<HTMLElement>(focusSelector) : null) ?? root;
      want?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(r);
      if (portal) unlockScroll();
      const back = returnFocus?.() ?? before.current;
      requestAnimationFrame(() => {
        if (back && back.isConnected) back.focus({ preventScroll: true });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);
  useEffect(() => {
    if (open) setDragY(0);
  }, [open]);

  // 시트 본문이 넘치지 않으면 본문에서 끌어도 시트가 움직이게(터치) — 넘치면 본문은 스크롤
  useEffect(() => {
    if (!mounted || kind !== 'sheet') return;
    const body = rootRef.current?.querySelector<HTMLElement>('[data-ov-body]');
    if (!body) return;
    const set = () => {
      body.style.touchAction = drag && body.scrollHeight <= body.clientHeight + 1 ? 'none' : 'pan-y';
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(body);
    return () => ro.disconnect();
  }, [mounted, kind, drag]);

  if (!mounted) return null;

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      // 안의 부품(열린 Select 목록 · 칸)이 먼저 받은 Esc 는 그 부품의 것이다
      if (e.defaultPrevented) return;
      e.preventDefault();
      e.stopPropagation();
      onRequestClose('esc');
      return;
    }
    if (e.key !== 'Tab') return;
    // 초점을 판 안에 가둔다
    e.stopPropagation();
    const root = rootRef.current;
    if (!root) return;
    const all = tabbables(root);
    if (!all.length) {
      e.preventDefault();
      return;
    }
    const first = all[0];
    const last = all[all.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === root)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // 끌어 닫기 — 열린 뒤 막는 시간이 지나야, 본문이 스크롤된 채가 아니어야 끈다. 세로로 4px 넘게 움직여야 끌기로 본다(누르기는 그대로)
  const sheetLook = look.sheet;
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag || e.button !== 0) return;
    if (performance.now() - openedAt.current < sheetLook.drag.guard) return;
    const body = (e.target as HTMLElement).closest<HTMLElement>('[data-ov-body]');
    if (body && body.scrollTop > 0) return;
    window.getSelection()?.removeAllRanges();
    track.current = { id: e.pointerId, y0: e.clientY, x0: e.clientX, started: false, samples: [{ y: e.clientY, t: e.timeStamp }] };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const t = track.current;
    if (!t || t.id !== e.pointerId) return;
    const dy = e.clientY - t.y0;
    if (!t.started) {
      if (dy > 4 && Math.abs(dy) > Math.abs(e.clientX - t.x0)) {
        t.started = true;
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
      } else return;
    }
    t.samples.push({ y: e.clientY, t: e.timeStamp });
    if (t.samples.length > 6) t.samples.shift();
    setDragY(Math.max(0, dy));
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const t = track.current;
    track.current = null;
    if (!t || !t.started) return;
    swallowClick.current = true;
    setDragging(false);
    // 놓을 때의 빠르기 — 최근 움직임에서 재고, 멈췄다 놓았으면(마지막 움직임 뒤 100ms 넘게) 0
    const a = t.samples[0];
    const b = t.samples[t.samples.length - 1];
    const v = e.timeStamp - b.t > 100 ? 0 : b.t > a.t ? (b.y - a.y) / (b.t - a.t) : 0;
    const h = rootRef.current?.offsetHeight ?? 1;
    const dy = Math.max(0, e.clientY - t.y0);
    if (v > sheetLook.drag.velocity || dy >= h * sheetLook.drag.distance) onRequestClose('drag');
    else {
      setReturning(true);
      setDragY(0);
      window.setTimeout(() => setReturning(false), ms(sheetLook.motion.close.duration));
    }
  };

  const pos: CSSProperties = { position: portal ? 'fixed' : 'absolute', inset: 0 };
  const shown = phase === 'open';
  const dimMotion = phase === 'exit' ? m.motion.dimClose : m.motion.dimOpen;
  const dimStyle: CSSProperties = {
    ...pos,
    zIndex: m.z.dim,
    background: ocv(m.dim, mode),
    opacity: shown ? 1 : 0,
    transition: `opacity ${reduce ? `${look.reduced}ms` : dimMotion.duration} ${dimMotion.easing}`,
  };
  const wrap: CSSProperties = {
    ...pos,
    zIndex: m.z.surface,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: kind === 'sheet' ? 'flex-end' : 'center',
    pointerEvents: 'none',
  };
  // 판의 모션 — 시트는 아래에서 올라오고 내려간다(끌면 손을 따라), 대화상자 · 확인창은 크게 나타나며 줄고 사라질 때는 서서히
  let style: CSSProperties;
  if (reduce) {
    style = { opacity: shown ? 1 : 0, transition: `opacity ${look.reduced}ms ${(phase === 'exit' ? m.motion.close : m.motion.open).easing}` };
  } else if (kind === 'sheet') {
    // 끌다 놓아 되돌아갈 때 · 닫힐 때는 닫힘 시간 · 곡선, 열릴 때는 열림
    const mo = phase === 'exit' || returning ? sheetLook.motion.close : sheetLook.motion.open;
    style = {
      transform: shown ? `translateY(${dragY}px)` : 'translateY(100%)',
      transition: dragging || phase === 'enter' ? 'none' : `transform ${mo.duration} ${mo.easing}`,
      touchAction: drag ? 'none' : undefined,
      // 끄는 시트는 글을 고르지 않는다 — 고른 글 위에서 끌면 브라우저가 글 끌기로 바꿔 pointercancel 이 난다
      userSelect: drag ? 'none' : undefined,
      WebkitUserSelect: drag ? 'none' : undefined,
    };
  } else {
    const d = kind === 'dialog' ? look.dialog : look.alert;
    style =
      phase === 'exit'
        ? { opacity: 0, transform: 'scale(1)', transition: `opacity ${d.motion.close.duration} ${d.motion.close.easing}` }
        : { opacity: shown ? 1 : 0, transform: shown ? 'scale(1)' : `scale(${d.motion.openFrom})`, transition: shown ? `opacity ${d.motion.open.duration} ${d.motion.open.easing}, transform ${d.motion.open.duration} ${d.motion.open.easing}` : 'none' };
  }
  style = { ...style, pointerEvents: 'auto' };

  const rootProps: HTMLAttributes<HTMLDivElement> = {
    role: kind === 'alert' ? 'alertdialog' : 'dialog',
    'aria-modal': true,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
    tabIndex: -1,
    onKeyDown,
    ...(kind === 'sheet' && drag
      ? {
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onPointerCancel: () => {
            track.current = null;
            setDragging(false);
            setDragY(0);
          },
          onClickCapture: (e) => {
            if (swallowClick.current) {
              swallowClick.current = false;
              e.stopPropagation();
              e.preventDefault();
            }
          },
        }
      : {}),
  };

  const node = (
    <>
      <div
        aria-hidden
        style={dimStyle}
        onPointerDown={(e) => {
          if (e.target !== e.currentTarget) return;
          // 딤을 눌러도 초점은 판 안에 남는다(무시하는 판에서 Esc 가 계속 먹게)
          e.preventDefault();
          if (outside === 'close') onRequestClose('outside');
        }}
        onMouseDown={(e) => e.preventDefault()}
      />
      <div style={wrap}>
        {children({
          ref: (el: HTMLDivElement | null) => {
            rootRef.current = el;
          },
          rootProps,
          style,
          maxHeight: kind === 'sheet' ? `${look.sheet.maxHeight * 100}%` : `${look.dialog.maxHeight * 100}%`,
        })}
      </div>
    </>
  );
  return createPortal(node, container ?? document.body);
}

// ── 팝오버(비모달) ─────────────────────────────────────────
export type PopoverRender = {
  ref: Ref<HTMLDivElement>;
  rootProps: HTMLAttributes<HTMLDivElement>;
  style: CSSProperties;
  maxHeight: number;
  avail: number;
};

// 문서 순서에서 기준 뒤의 첫 Tab 자리(팝오버 안은 뺀다)
function nextTabbable(after: HTMLElement, skip: HTMLElement | null) {
  const all = tabbables(document.body).filter((el) => !skip?.contains(el));
  return all.find((el) => after.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING && !after.contains(el)) ?? null;
}

export function PopoverLayer({
  open,
  anchor,
  look,
  mode = 'auto',
  align = 'start',
  container,
  onRequestClose,
  id,
  labelledBy,
  ariaLabel,
  focusSelector = '[data-autofocus]',
  children,
}: {
  open: boolean;
  anchor: HTMLElement | null;
  look: PopoverLook;
  mode?: ViewMode;
  // 트리거에 맞추는 쪽 — 칸(Input Button)은 왼쪽, 아이콘 버튼은 가운데
  align?: 'start' | 'center';
  container?: HTMLElement | null;
  onRequestClose: (reason: CloseReason) => void;
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
  // 처음 초점 — 안의 자리(고른 날 · 검색칸). 없으면 판(내용 — 머리 닫기 버튼이 아니라)
  focusSelector?: string;
  children: (p: PopoverRender) => ReactNode;
}) {
  const reduce = useReducedMotion();
  const exitMs = reduce ? 150 : ms(look.motion.close.duration);
  const { mounted, phase } = usePhase(open, exitMs);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number; side: 'bottom' | 'top'; originX: number; maxHeight: number; avail: number } | null>(null);

  // 자리 — 트리거 아래 8(모자라면 위), 화면(stage) 가장자리와 16 을 남기고 옆으로 민다
  useIsoLayoutEffect(() => {
    if (!mounted || !anchor) return;
    const place = () => {
      const p = rootRef.current;
      if (!p) return;
      // 그림 속 화면 — absolute 는 테두리 안쪽(padding box) 기준이라 테두리만큼 들인다
      const cr = container?.getBoundingClientRect();
      const box = container && cr ? { left: cr.left + container.clientLeft, top: cr.top + container.clientTop, width: container.clientWidth, height: container.clientHeight } : { left: 0, top: 0, width: document.documentElement.clientWidth, height: window.innerHeight };
      const a = anchor.getBoundingClientRect();
      const ax = a.left - box.left;
      const ay = a.top - box.top;
      const w = p.offsetWidth;
      const naturalH = p.scrollHeight;
      const e = look.edge;
      const avail = box.width - e * 2;
      let left = align === 'center' ? ax + a.width / 2 - w / 2 : ax;
      left = Math.max(e, Math.min(left, box.width - e - w));
      const below = box.height - (ay + a.height) - look.offset - e;
      const above = ay - look.offset - e;
      const side: 'bottom' | 'top' = below >= Math.min(naturalH, look.maxHeight) || below >= above ? 'bottom' : 'top';
      const maxHeight = Math.max(0, Math.min(look.maxHeight, side === 'bottom' ? below : above));
      const h = Math.min(naturalH, maxHeight);
      const top = side === 'bottom' ? ay + a.height + look.offset : ay - look.offset - h;
      const originX = Math.max(0, Math.min(w, ax + a.width / 2 - left));
      setPos((prev) => (prev && prev.left === left && prev.top === top && prev.side === side && prev.maxHeight === maxHeight && prev.avail === avail ? prev : { left, top, side, originX, maxHeight, avail }));
    };
    place();
    const ro = new ResizeObserver(place);
    if (rootRef.current) ro.observe(rootRef.current);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [mounted, anchor, container, align, look]);

  // 열면 초점을 안으로(머리 닫기 버튼이 아니라 내용 — 판 자체), 가두지 않는다
  useEffect(() => {
    if (!mounted) return;
    const r = requestAnimationFrame(() => {
      const p = rootRef.current;
      const want = p?.querySelector<HTMLElement>(focusSelector) ?? p;
      want?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(r);
  }, [mounted]);

  // 바깥을 누르면 닫는다 — 트리거는 트리거가 맡는다(열고 닫기)
  useEffect(() => {
    if (!mounted || phase === 'exit') return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t) || anchor?.contains(t)) return;
      onRequestClose('outside');
      // 누른 자리가 초점을 받지 않으면 트리거로 돌려준다
      requestAnimationFrame(() => {
        const a = document.activeElement;
        if ((!a || a === document.body || rootRef.current?.contains(a)) && anchor?.isConnected) anchor.focus({ preventScroll: true });
      });
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  }, [mounted, phase, anchor, onRequestClose]);

  if (!mounted) return null;

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      if (e.defaultPrevented) return;
      e.preventDefault();
      e.stopPropagation();
      onRequestClose('esc');
      anchor?.focus({ preventScroll: true });
      return;
    }
    if (e.key !== 'Tab') return;
    const root = rootRef.current;
    if (!root) return;
    const all = tabbables(root);
    const active = document.activeElement;
    // 마지막에서 Tab — 페이지로 나가며 닫는다(트리거 다음 자리). 처음에서 Shift+Tab — 트리거로
    if (!e.shiftKey && (all.length === 0 || active === all[all.length - 1])) {
      e.preventDefault();
      e.stopPropagation();
      const next = anchor ? nextTabbable(anchor, root) : null;
      onRequestClose('tab');
      next?.focus();
    } else if (e.shiftKey && (all.length === 0 || active === all[0] || active === root)) {
      e.preventDefault();
      e.stopPropagation();
      onRequestClose('tab');
      anchor?.focus();
    }
  };

  const shown = phase === 'open';
  const side = pos?.side ?? 'bottom';
  const origin = `${pos?.originX ?? 0}px ${side === 'bottom' ? '0' : '100%'}`;
  const motion = phase === 'exit' ? look.motion.close : look.motion.open;
  const style: CSSProperties = {
    position: container ? 'absolute' : 'fixed',
    left: pos?.left ?? 0,
    top: pos?.top ?? 0,
    zIndex: look.z,
    visibility: pos ? 'visible' : 'hidden',
    transformOrigin: origin,
    opacity: shown ? 1 : 0,
    transform: reduce || shown ? 'scale(1)' : `scale(${look.motion.openFrom})`,
    transition: shown || phase === 'exit' ? `opacity ${reduce ? '150ms' : motion.duration} ${motion.easing}, transform ${reduce ? '0ms' : motion.duration} ${motion.easing}` : 'none',
  };
  const rootProps: HTMLAttributes<HTMLDivElement> = {
    id,
    role: 'dialog',
    'aria-labelledby': labelledBy,
    'aria-label': labelledBy ? undefined : ariaLabel,
    tabIndex: -1,
    onKeyDown,
  };
  return createPortal(
    children({
      ref: (el: HTMLDivElement | null) => {
        rootRef.current = el;
      },
      rootProps,
      style,
      maxHeight: pos?.maxHeight ?? look.maxHeight,
      avail: pos?.avail ?? look.maxWidth,
    }),
    container ?? document.body,
  );
}
