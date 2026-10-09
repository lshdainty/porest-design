'use client';
// 스펙대로 그린 Select · Input Button — SelectLook(select.yaml · input-button.yaml 을 푼 값)만 받아 그린다.
// state 를 주면 그 상태로 멈춘 그림, 안 주면 실제로 쓰는 칸이다 — Select 는 목록을 body 로 띄워 칸 아래(모자라면 위)에 붙이고,
// Input Button 은 누르면 onClick 을 부른다(시트 · 팝오버는 input-button-pickers 가 연다).
// 치수 · 색은 CSS 변수로 싣고 global.css 의 .psel 이 그린다 — 반응형(1280 에서 large → medium)과 키보드 포커스 링(:focus-visible)은 CSS 가 맡는다.
// 색은 사이트 모드를 따르면(auto) --p-<토큰> 변수, 모드를 정하면 그 모드의 값이다.
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode, type Ref } from 'react';
import { createPortal } from 'react-dom';
import type { TfFieldLook } from './text-field-shared';
import { TfFieldView } from './text-field-view';
import {
  ArrowUpDown,
  Banknote,
  Bell,
  Briefcase,
  Building2,
  Bus,
  CalendarDays,
  CarTaxiFront,
  Check,
  ChevronDown,
  ChevronRight,
  CircleSlash,
  CircleX,
  Clock,
  Coffee,
  CreditCard,
  Ellipsis,
  Film,
  Gift,
  Globe,
  HeartPulse,
  House,
  Landmark,
  Moon,
  Pencil,
  Plane,
  Repeat,
  Search,
  Share2,
  ShoppingBag,
  Stethoscope,
  Sun,
  Sunrise,
  Sunset,
  Tag,
  TrainFront,
  Trash2,
  Umbrella,
  User,
  Users,
  Utensils,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import {
  allItems,
  joinValues,
  pressRatio,
  scv,
  summarize,
  triggerIcon,
  type IbState,
  type ItemState,
  type SelBoxLook,
  type SelGroup,
  type SelIcon,
  type SelItem,
  type SelSize,
  type SelSizeProp,
  type SelectLook,
  type TriggerState,
  type ViewMode,
} from './select-shared';

const ICONS: Record<SelIcon, LucideIcon> = {
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  calendar: CalendarDays,
  clock: Clock,
  search: Search,
  'credit-card': CreditCard,
  landmark: Landmark,
  banknote: Banknote,
  'circle-slash': CircleSlash,
  wallet: Wallet,
  tag: Tag,
  utensils: Utensils,
  coffee: Coffee,
  bus: Bus,
  train: TrainFront,
  taxi: CarTaxiFront,
  'shopping-bag': ShoppingBag,
  film: Film,
  stethoscope: Stethoscope,
  house: House,
  plane: Plane,
  user: User,
  users: Users,
  globe: Globe,
  building: Building2,
  repeat: Repeat,
  bell: Bell,
  gift: Gift,
  sun: Sun,
  sunrise: Sunrise,
  sunset: Sunset,
  moon: Moon,
  briefcase: Briefcase,
  umbrella: Umbrella,
  'heart-pulse': HeartPulse,
  share: Share2,
  trash: Trash2,
  pencil: Pencil,
  'arrow-up-down': ArrowUpDown,
  ellipsis: Ellipsis,
};

// 아이콘 하나 — 크기를 주지 않으면 CSS(.psel-ic > svg 같은)가 정한다
export function SelIconView({ name, size, color, strokeWidth = 2, style }: { name: SelIcon; size?: number | string; color?: string; strokeWidth?: number; style?: CSSProperties }) {
  const I = ICONS[name];
  return <I aria-hidden strokeWidth={strokeWidth} style={{ flexShrink: 0, width: size, height: size, color, ...style }} />;
}

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return reduce;
}

const px = (v: string | number) => (typeof v === 'number' ? `${v}px` : v);

// 크기 변수 — large(-l) · medium(-m). 반응형이면 둘이 다르고, 아니면 같다(CSS 가 1280 에서 -m 으로 바꾼다)
export function selSizeVars(look: SelectLook, box: SelBoxLook, size: SelSizeProp) {
  const pick = (s: SelSize) => {
    const b = box.sizes[s];
    const i = look.item.sizes[s];
    const g = look.groupLabel.sizes[s];
    return {
      h: b.h,
      r: b.radius,
      px: b.padX,
      gap: b.gap,
      fs: b.text.fontSize,
      lh: b.text.lineHeight,
      icon: b.icon,
      end: b.end,
      clear: b.clear,
      ipy: i.padY,
      igap: i.gap,
      iicon: i.icon,
      ifs: i.label.fontSize,
      ilh: i.label.lineHeight,
      dfs: i.desc.fontSize,
      dlh: i.desc.lineHeight,
      ind: i.indicator,
      gpy: g.padY,
      gfs: g.text.fontSize,
      glh: g.text.lineHeight,
      gfw: String(g.text.fontWeight),
    } as Record<string, string | number>;
  };
  const L = pick(size === 'medium' ? 'medium' : 'large');
  const M = pick(size === 'large' ? 'large' : 'medium');
  const out: Record<string, string> = {};
  for (const k of Object.keys(L)) {
    out[`--psel-${k}-l`] = px(L[k]);
    out[`--psel-${k}-m`] = px(M[k]);
  }
  return out;
}

// 상자의 색 · 선 · 시간 — 막힌 칸은 글자 · 아이콘 · 붙이개가 모두 fg-disabled, 막히거나 읽기 전용이면 바탕 bg-disabled
function boxVars(box: SelBoxLook, mode: ViewMode, f: { disabled: boolean; readOnly: boolean }) {
  const c = box.color;
  const dis = scv(c.disabled, mode);
  return {
    '--psel-bg': f.disabled || f.readOnly ? scv(c.bgDisabled, mode) : scv(c.bg, mode),
    '--psel-bd': scv(c.border, mode),
    '--psel-pressed': scv(c.pressed, mode),
    '--psel-invalid': scv(c.invalid, mode),
    '--psel-value': f.disabled ? dis : scv(c.value, mode),
    '--psel-ph': f.disabled ? dis : scv(c.placeholder, mode),
    '--psel-icon-c': f.disabled ? dis : scv(c.icon, mode),
    '--psel-end-c': f.disabled ? dis : scv(c.end, mode),
    '--psel-affix': f.disabled ? dis : scv(c.affix, mode),
    '--psel-clear-c': scv(c.clear, mode),
    '--psel-ring': scv(box.ring.color, mode),
    '--psel-ring-w': `${box.ring.width}px`,
    '--psel-ring-o': `${box.ring.offset}px`,
    '--psel-base': `${box.stroke.base}px`,
    '--psel-active': `${box.stroke.invalid}px`,
    '--psel-bg-dur': box.motion.bg.duration,
    '--psel-bg-ease': box.motion.bg.easing,
    '--psel-sc-dur': box.motion.scale.duration,
    '--psel-sc-ease': box.motion.scale.easing,
    '--psel-inv-dur': box.motion.invalid.duration,
    '--psel-inv-ease': box.motion.invalid.easing,
  } as Record<string, string>;
}

function chevronVars(look: SelectLook) {
  const ch = look.trigger.chevron;
  return { '--psel-rot': `${ch.rotate}deg`, '--psel-open-dur': ch.open.duration, '--psel-open-ease': ch.open.easing, '--psel-close-dur': ch.close.duration, '--psel-close-ease': ch.close.easing } as Record<string, string>;
}

// 그림 속 크기 재기 — 누름 축소의 기준 길이(높이 · 폭)
function useBoxSize<T extends HTMLElement>(on: boolean) {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!on || !el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [on]);
  return [ref, size] as const;
}

// 여럿 고른 값이 칸에 다 들어가는지 — 칸 폭(값 자리)과 쉼표로 이은 글의 폭을 견준다
function useFits(full: string, enabled: boolean) {
  const slotRef = useRef<HTMLSpanElement | null>(null);
  const probeRef = useRef<HTMLSpanElement | null>(null);
  const [fits, setFits] = useState(true);
  useIsoLayoutEffect(() => {
    const slot = slotRef.current;
    const probe = probeRef.current;
    if (!enabled || !slot || !probe) return;
    const check = () => setFits(probe.offsetWidth <= slot.clientWidth + 0.5);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(slot);
    return () => ro.disconnect();
  }, [full, enabled]);
  return { slotRef, probeRef, fits };
}

// 부위마다 분홍 칠(Anatomy)
export type SelZone = Partial<Record<'box' | 'icon' | 'prefix' | 'value' | 'clear' | 'suffix' | 'end', CSSProperties>>;

// ── 트리거의 안 — 앞 아이콘 · 값(또는 placeholder) · 셰브론 ──────────────
function TriggerRow({
  labels,
  multiple,
  text,
  placeholder,
  icon,
  scale,
  zone,
}: {
  labels: string[];
  multiple: boolean;
  text?: string;
  placeholder?: string;
  icon?: SelIcon;
  scale: number;
  zone?: SelZone;
}) {
  const full = multiple ? joinValues(labels) : (labels[0] ?? '');
  const { slotRef, probeRef, fits } = useFits(full, multiple && labels.length > 1 && text === undefined);
  const shown = text ?? (labels.length === 0 ? undefined : multiple && !fits ? summarize(labels) : full);
  return (
    <span className="psel-row" style={{ '--psel-scale': scale } as CSSProperties}>
      {icon && (
        <span className="psel-ic" style={zone?.icon}>
          <SelIconView name={icon} />
        </span>
      )}
      <span ref={slotRef} className="psel-val" data-ph={shown === undefined || undefined} style={zone?.value}>
        {shown ?? placeholder}
        {multiple && labels.length > 1 && text === undefined && (
          <span ref={probeRef} aria-hidden style={{ position: 'absolute', left: 0, top: 0, visibility: 'hidden', whiteSpace: 'nowrap' }}>
            {full}
          </span>
        )}
      </span>
      <span className="psel-end" data-chevron style={zone?.end}>
        <ChevronDown aria-hidden strokeWidth={2} />
      </span>
    </span>
  );
}

// ── 트리거(멈춘 그림) ───────────────────────────────────
export type SelectTriggerViewProps = {
  look: SelectLook;
  size?: SelSizeProp;
  mode?: ViewMode;
  state: TriggerState;
  // 고른 선택지의 글(고른 순서) — 여럿이면 쉼표로 잇고, 넘치면 "첫 값 외 N개"
  labels?: string[];
  multiple?: boolean;
  // 트리거 글을 직접 정한다(나쁜 예 "식비 등 2개" 처럼)
  text?: string;
  placeholder?: string;
  icon?: SelIcon;
  invalid?: boolean;
  width?: number | string;
  zone?: SelZone;
};

export function SelectTriggerView({ look, size = 'responsive', mode = 'auto', state, labels = [], multiple = false, text, placeholder, icon, invalid: invalidProp, width, zone }: SelectTriggerViewProps) {
  const disabled = state === 'disabled';
  const readOnly = state === 'readonly';
  const invalid = invalidProp || state === 'invalid';
  const [ref, box] = useBoxSize<HTMLDivElement>(state === 'pressed');
  const scale = state === 'pressed' && box ? pressRatio(look.press, box.w, box.h) : 1;
  return (
    <div
      ref={ref}
      className="psel psel-box"
      data-psel="trigger"
      data-open={state === 'open' || undefined}
      data-pressed={state === 'pressed' || undefined}
      data-ring={state === 'focused' || undefined}
      data-invalid={invalid || undefined}
      style={{ ...selSizeVars(look, look.trigger, size), ...boxVars(look.trigger, mode, { disabled, readOnly }), ...chevronVars(look), width: width ?? '100%', cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'pointer', ...zone?.box } as CSSProperties}
    >
      <TriggerRow labels={labels} multiple={multiple} text={text} placeholder={placeholder} icon={icon} scale={scale} zone={zone} />
    </div>
  );
}

// ── 목록 ───────────────────────────────────────────────
type Highlight = { value: string; kind: 'press' | 'hover' | 'keyboard' } | null;
type ItemHandlers = {
  onPointerEnter: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: () => void;
  onClick: () => void;
};

function ItemRow({
  look,
  mode,
  item,
  selected,
  pill,
  pressed,
  id,
  live,
  handlers,
}: {
  look: SelectLook;
  mode: ViewMode;
  item: SelItem;
  selected: boolean;
  pill: boolean;
  pressed: boolean;
  id?: string;
  live: boolean;
  handlers?: ItemHandlers;
}) {
  const disabled = !!item.disabled;
  const [ref, box] = useBoxSize<HTMLDivElement>(pressed && !disabled);
  const reduce = useReducedMotion();
  const scale = pressed && !disabled && box && !reduce ? pressRatio(look.press, box.w, box.h) : 1;
  const on = pill && !disabled;
  const c = look.item.color;
  const hl = look.highlight;
  const m = hl.motion;
  const lab = look.item.sizes.large.label;
  return (
    <div
      ref={ref}
      id={id}
      data-psel="item"
      role={live ? 'option' : undefined}
      aria-selected={live ? selected : undefined}
      aria-disabled={live && disabled ? true : undefined}
      {...(live && handlers ? handlers : {})}
      style={{
        position: 'relative',
        padding: `var(--psel-ipy) ${look.item.padX}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <span
        aria-hidden
        data-psel="pill"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: on ? hl.insetX : 0,
          right: on ? hl.insetX : 0,
          borderRadius: hl.radius,
          background: on ? scv(hl.bg, mode) : 'transparent',
          transition: `background-color ${m.duration} ${m.easing}, left ${m.duration} ${m.easing}, right ${m.duration} ${m.easing}`,
        }}
      />
      <span className="psel-irow" style={{ '--psel-iscale': scale } as CSSProperties}>
        {item.icon && <SelIconView name={item.icon} size="var(--psel-iicon)" color={scv(disabled ? c.disabled : c.icon, mode)} />}
        <span style={{ display: 'flex', flex: '1 1 0%', minWidth: 0, flexDirection: 'column', gap: look.item.descGap }}>
          <span style={{ fontSize: 'var(--psel-ifs)', lineHeight: 'var(--psel-ilh)', fontWeight: lab.fontWeight, color: scv(disabled ? c.disabled : c.label, mode) }}>{item.label}</span>
          {item.description && <span style={{ fontSize: 'var(--psel-dfs)', lineHeight: 'var(--psel-dlh)', color: scv(disabled ? c.disabled : c.desc, mode) }}>{item.description}</span>}
        </span>
        {selected && <Check aria-hidden data-psel="check" strokeWidth={look.item.indicatorStroke} style={{ flexShrink: 0, width: 'var(--psel-ind)', height: 'var(--psel-ind)', color: scv(disabled ? c.disabled : c.indicator, mode) }} />}
      </span>
    </div>
  );
}

type ListBodyProps = {
  look: SelectLook;
  mode: ViewMode;
  groups: SelGroup[];
  selected: string[];
  // 멈춘 그림 — 선택지마다 상태(키보드 위치 · 호버는 누름과 같은 알약, 축소 없음)
  states?: Record<string, ItemState>;
  // 실제 목록
  live?: boolean;
  idBase?: string;
  hl?: Highlight;
  itemHandlers?: (item: SelItem) => ItemHandlers;
};

function ListBody({ look, mode, groups, selected, states, live = false, idBase, hl, itemHandlers }: ListBodyProps) {
  const g = look.groupLabel;
  const d = look.divider;
  return (
    <>
      {groups.map((group, gi) => {
        const labelId = idBase && group.label ? `${idBase}-g${gi}` : undefined;
        return (
          <div key={gi} role={live ? 'group' : undefined} aria-labelledby={live ? labelId : undefined}>
            {/* 묶음 사이 — 위 묶음 끝에서 간격(content.gap) + 선 + 아래 여백(divider.marginBottom) */}
            {gi > 0 && <div aria-hidden data-psel="divider" style={{ height: d.height, margin: `${look.content.gap}px ${d.marginX}px ${d.marginBottom}px`, background: scv(d.color, mode) }} />}
            {group.label && (
              <div id={labelId} data-psel="group-label" style={{ padding: `var(--psel-gpy) ${g.padX}px`, fontSize: 'var(--psel-gfs)', lineHeight: 'var(--psel-glh)', fontWeight: 'var(--psel-gfw)' as CSSProperties['fontWeight'], color: scv(g.color, mode) }}>
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const st = states?.[item.value];
              const isSel = selected.includes(item.value) || st === 'selected';
              const frozenPill = st === 'pressed' || st === 'keyboard' || st === 'hovered';
              const livePill = !!hl && hl.value === item.value;
              return (
                <ItemRow
                  key={item.value}
                  look={look}
                  mode={mode}
                  item={st === 'disabled' ? { ...item, disabled: true } : item}
                  selected={isSel}
                  pill={frozenPill || livePill}
                  pressed={st === 'pressed' || (livePill && hl?.kind === 'press')}
                  id={idBase ? `${idBase}-${item.value}` : undefined}
                  live={live}
                  handlers={itemHandlers?.(item)}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function listBoxStyle(look: SelectLook, mode: ViewMode): CSSProperties {
  const c = look.content;
  return {
    boxSizing: 'border-box',
    padding: `${c.padY}px 0`,
    borderRadius: c.radius,
    background: scv(c.bg, mode),
    boxShadow: scv(c.shadow, mode),
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
    textAlign: 'left',
  };
}

// 목록(멈춘 그림) — 트리거 없이 목록만, 또는 트리거 아래에 붙여
export type SelectListViewProps = {
  look: SelectLook;
  size?: SelSizeProp;
  mode?: ViewMode;
  groups: SelGroup[];
  selected?: string[];
  states?: Record<string, ItemState>;
  width?: number | string;
  maxHeight?: number;
  scrollTop?: number;
  style?: CSSProperties;
};

export function SelectListView({ look, size = 'responsive', mode = 'auto', groups, selected = [], states, width = '100%', maxHeight, scrollTop, style }: SelectListViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useIsoLayoutEffect(() => {
    if (ref.current && scrollTop !== undefined) ref.current.scrollTop = scrollTop;
  }, [scrollTop]);
  return (
    <div
      ref={ref}
      className="psel"
      data-psel="list"
      style={{ ...selSizeVars(look, look.trigger, size), ...boxVars(look.trigger, mode, { disabled: false, readOnly: false }), ...listBoxStyle(look, mode), width, maxHeight, ...style } as CSSProperties}
    >
      <ListBody look={look} mode={mode} groups={groups} selected={selected} states={states} />
    </div>
  );
}

// 트리거 + 열린 목록(멈춘 그림) — 목록은 칸 아래 8(위로 뒤집으면 위 8)에 칸 폭 그대로. overlay 면 아래 내용을 덮는다
export type SelectOpenViewProps = Omit<SelectTriggerViewProps, 'state'> & {
  state?: TriggerState;
  groups: SelGroup[];
  selected?: string[];
  states?: Record<string, ItemState>;
  placement?: 'flow' | 'overlay' | 'above';
  maxHeight?: number;
  scrollTop?: number;
};

export function SelectOpenView({ look, size = 'responsive', mode = 'auto', state = 'open', groups, selected = [], states, placement = 'flow', maxHeight, scrollTop, width, labels, icon, ...trigger }: SelectOpenViewProps) {
  const items = allItems(groups);
  const picked = selected.map((v) => items.find((i) => i.value === v)).filter((i): i is SelItem => !!i);
  const t = (
    <SelectTriggerView {...trigger} look={look} size={size} mode={mode} state={state} labels={labels ?? picked.map((i) => i.label)} icon={triggerIcon(icon, picked)} width="100%" />
  );
  const list = <SelectListView look={look} size={size} mode={mode} groups={groups} selected={selected} states={states} maxHeight={maxHeight} scrollTop={scrollTop} />;
  const gutter = look.content.gutter;
  if (placement === 'flow')
    return (
      <div style={{ width: width ?? '100%' }}>
        {t}
        <div style={{ marginTop: gutter }}>{list}</div>
      </div>
    );
  return (
    <div style={{ position: 'relative', width: width ?? '100%' }}>
      {t}
      <div style={{ position: 'absolute', left: 0, right: 0, zIndex: 5, ...(placement === 'above' ? { bottom: `calc(100% + ${gutter}px)` } : { top: `calc(100% + ${gutter}px)` }) }}>{list}</div>
    </div>
  );
}

// ── 실제 Select ─────────────────────────────────────────
export type SelectViewProps = {
  look: SelectLook;
  size?: SelSizeProp;
  mode?: ViewMode;
  groups: SelGroup[];
  multiple?: boolean;
  placeholder?: string;
  icon?: SelIcon;
  defaultValue?: string[];
  value?: string[];
  onValue?: (v: string[]) => void;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  describedBy?: string;
  ariaLabel?: string;
  width?: number | string;
  // 열린 목록의 최대 높이 — 기본(content.maxHeight 480)보다 낮게 둘 때만(Table Pagination 의 범위 목록 240 — 레시피의 listMaxHeight)
  listMaxHeight?: number;
};

type Pos = { left: number; width: number; top?: number; bottom?: number; maxHeight?: number; side: 'below' | 'above' };
// 목록의 단계 — 재기(보이지 않게 펼쳐 실제 높이를 잰다) → 나타나기 → 열림 → 사라지기
type Phase = 'closed' | 'measure' | 'enter' | 'open' | 'exit';
const toMs = (v: string) => (v.trim().endsWith('ms') ? parseFloat(v) : parseFloat(v) * 1000);

export function SelectView({
  look,
  size = 'responsive',
  mode = 'auto',
  groups,
  multiple = false,
  placeholder,
  icon,
  defaultValue = [],
  value: valueProp,
  onValue,
  invalid = false,
  disabled = false,
  readOnly = false,
  required,
  id: idProp,
  describedBy,
  ariaLabel,
  width,
  listMaxHeight: maxHeightProp,
}: SelectViewProps) {
  const auto = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = idProp ?? `sel${auto}`;
  const listId = `${id}-list`;
  const optBase = `${id}-opt`;
  const [inner, setInner] = useState<string[]>(defaultValue);
  const values = valueProp ?? inner;
  const items = useMemo(() => allItems(groups), [groups]);
  const enabledItems = useMemo(() => items.filter((i) => !i.disabled), [items]);
  const picked = values.map((v) => items.find((i) => i.value === v)).filter((i): i is SelItem => !!i);
  const [phase, setPhase] = useState<Phase>('closed');
  const open = phase === 'measure' || phase === 'enter' || phase === 'open';
  const [hl, setHl] = useState<Highlight>(null);
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [pos, setPos] = useState<Pos | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => setMounted(true), []);
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const setValues = (v: string[]) => {
    if (valueProp === undefined) setInner(v);
    onValue?.(v);
  };
  const c = look.content;

  // 칸 둘레의 남은 화면으로 자리 · 높이를 정한다 — 아래가 모자라면 위로, 높이는 min(480, 남은 화면) · 하한 200, 가장자리와 8
  const place = useCallback(
    (natural?: number): Pos | null => {
      const t = triggerRef.current;
      if (!t) return null;
      const r = t.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = document.documentElement.clientWidth;
      const left = Math.max(c.edge, Math.min(r.left, vw - c.edge - r.width));
      if (natural === undefined) return { left, width: r.width, side: 'below', top: r.bottom + c.gutter };
      const below = vh - r.bottom - c.gutter - c.edge;
      const above = r.top - c.gutter - c.edge;
      const cap = maxHeightProp === undefined ? c.maxHeight : Math.min(c.maxHeight, maxHeightProp);
      const want = Math.min(natural, cap);
      const side: Pos['side'] = below >= want || below >= above ? 'below' : 'above';
      const room = side === 'below' ? below : above;
      const maxHeight = Math.max(Math.min(c.minHeight, cap), Math.min(cap, room));
      return { left, width: r.width, side, maxHeight, top: side === 'below' ? r.bottom + c.gutter : undefined, bottom: side === 'above' ? vh - r.top + c.gutter : undefined };
    },
    [c, maxHeightProp],
  );

  const firstFocus = () => picked.find((i) => !i.disabled)?.value ?? enabledItems[0]?.value;

  const openList = (by: 'pointer' | 'keyboard') => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPos(place());
    setPhase('measure');
    const f = firstFocus();
    setHl(by === 'keyboard' && f ? { value: f, kind: 'keyboard' } : null);
  };
  const closeList = useCallback(() => {
    setHl(null);
    setPhase((p) => (p === 'closed' ? p : 'exit'));
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPhase((p) => (p === 'exit' ? 'closed' : p)), toMs(c.motion.close.duration));
  }, [c.motion.close.duration]);

  // 재기 — 칸 폭으로 펼친 목록의 높이로 자리를 정한다
  useIsoLayoutEffect(() => {
    if (phase !== 'measure') return;
    const list = listRef.current;
    if (!list) return;
    setPos(place(list.scrollHeight));
    setPhase('enter');
  }, [phase, place]);
  // 나타나기 — 고른 선택지가 보이게 스크롤한 채로 연다
  useIsoLayoutEffect(() => {
    if (phase !== 'enter') return;
    const list = listRef.current;
    const sel = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (list && sel) list.scrollTop = Math.max(0, sel.offsetTop - (list.clientHeight - sel.offsetHeight) / 2);
    const raf = requestAnimationFrame(() => setPhase((p) => (p === 'enter' ? 'open' : p)));
    return () => cancelAnimationFrame(raf);
  }, [phase]);
  useEffect(() => {
    if (!open) return;
    const onMove = () => setPos(place(listRef.current?.scrollHeight));
    const onDown = (e: Event) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || listRef.current?.contains(t)) return;
      closeList();
    };
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    document.addEventListener('pointerdown', onDown, true);
    return () => {
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
      document.removeEventListener('pointerdown', onDown, true);
    };
  }, [open, place, closeList]);

  // 키보드로 옮긴 선택지가 목록 안에서 보이게
  useEffect(() => {
    if (!hl || hl.kind !== 'keyboard') return;
    const list = listRef.current;
    const el = document.getElementById(`${optBase}-${hl.value}`);
    if (!list || !el) return;
    if (el.offsetTop < list.scrollTop + c.padY) list.scrollTop = el.offsetTop - c.padY;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight - c.padY) list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight + c.padY;
  }, [hl, optBase, c.padY]);

  const pick = (v: string) => {
    const it = items.find((i) => i.value === v);
    if (!it || it.disabled) return;
    if (multiple) setValues(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
    else {
      setValues([v]);
      closeList();
    }
  };

  const move = (dir: 1 | -1 | 'first' | 'last') => {
    if (!enabledItems.length) return;
    const idx = hl ? enabledItems.findIndex((i) => i.value === hl.value) : -1;
    let next: number;
    if (dir === 'first') next = 0;
    else if (dir === 'last') next = enabledItems.length - 1;
    else if (idx === -1) next = dir === 1 ? 0 : enabledItems.length - 1;
    else next = Math.min(enabledItems.length - 1, Math.max(0, idx + dir));
    setHl({ value: enabledItems[next].value, kind: 'keyboard' });
  };
  // 글자로 찾기 — 지금 자리 다음부터 그 글자로 시작하는 선택지
  const typeahead = (ch: string, from?: string) => {
    const k = ch.toLowerCase();
    const start = from ? enabledItems.findIndex((i) => i.value === from) : -1;
    for (let n = 1; n <= enabledItems.length; n++) {
      const it = enabledItems[(start + n) % enabledItems.length];
      if (it.label.toLowerCase().startsWith(k)) return it;
    }
    return undefined;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const printable = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== ' ';
    if (!open) {
      if (readOnly) return;
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList('keyboard');
        return;
      }
      // 닫힌 채 글자 키 — 하나 고르기면 그 글자로 시작하는 다음 선택지로 값을 바로 바꾼다(네이티브 select 와 같다)
      if (printable && !multiple) {
        const it = typeahead(e.key, values[0]);
        if (it) setValues([it.value]);
      }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      move(e.key === 'ArrowDown' ? 1 : -1);
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      move(e.key === 'Home' ? 'first' : 'last');
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hl) pick(hl.value);
      else if (!multiple) closeList();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeList();
    } else if (e.key === 'Tab') {
      closeList();
    } else if (printable) {
      const it = typeahead(e.key, hl?.value);
      if (it) setHl({ value: it.value, kind: 'keyboard' });
    }
  };

  // 선택지 — 마우스는 호버에 알약이 따라가고, 누르는 동안은 알약 + 축소. 터치는 짚지 않는다(누르는 동안만)
  const itemHandlers = (item: SelItem): ItemHandlers => ({
    onPointerEnter: (e) => {
      if (e.pointerType === 'mouse' && !item.disabled) setHl({ value: item.value, kind: 'hover' });
    },
    onPointerLeave: () => setHl((h) => (h && h.value === item.value && h.kind !== 'keyboard' ? null : h)),
    onPointerDown: (e) => {
      if (item.disabled || e.button !== 0) return;
      setHl({ value: item.value, kind: 'press' });
    },
    onPointerUp: (e) => setHl((h) => (h && h.kind === 'press' ? (e.pointerType === 'mouse' ? { ...h, kind: 'hover' } : null) : h)),
    onPointerCancel: () => setHl((h) => (h && h.kind === 'press' ? null : h)),
    onClick: () => pick(item.value),
  });

  const interactive = !disabled && !readOnly;
  const showPressed = interactive && (press || hover);
  const scale = press && interactive && box && !reduce ? pressRatio(look.press, box.w, box.h) : 1;
  const shownIcon = triggerIcon(icon, picked);
  const vars = { ...selSizeVars(look, look.trigger, size), ...boxVars(look.trigger, mode, { disabled, readOnly }), ...chevronVars(look) };
  const shown = phase === 'open';

  const listStyle = {
    ...vars,
    ...listBoxStyle(look, mode),
    position: 'fixed',
    zIndex: c.z,
    left: pos?.left ?? 0,
    width: pos?.width ?? 0,
    top: pos?.top,
    bottom: pos?.bottom,
    maxHeight: phase === 'measure' ? 'none' : pos?.maxHeight,
    visibility: phase === 'measure' ? 'hidden' : 'visible',
    opacity: shown ? 1 : 0,
    transform: reduce || shown ? 'none' : `scale(${c.motion.from})`,
    transformOrigin: pos?.side === 'above' ? 'bottom center' : 'top center',
    transition:
      phase === 'exit'
        ? `opacity ${c.motion.close.duration} ${c.motion.close.easing}, transform ${c.motion.close.duration} ${c.motion.close.easing}`
        : phase === 'open'
          ? `opacity ${c.motion.open.duration} ${c.motion.open.easing}, transform ${c.motion.open.duration} ${c.motion.open.easing}`
          : 'none',
  } as CSSProperties;

  const list =
    mounted && phase !== 'closed'
      ? createPortal(
          <div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            aria-labelledby={id}
            className="psel"
            data-psel="list"
            style={listStyle}
            // 목록을 눌러도 포커스는 트리거에 남는다(짚은 선택지는 aria-activedescendant 로)
            onMouseDown={(e: MouseEvent) => e.preventDefault()}
          >
            <ListBody look={look} mode={mode} groups={groups} selected={values} live idBase={optBase} hl={hl} itemHandlers={itemHandlers} />
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && hl ? `${optBase}-${hl.value}` : undefined}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        aria-readonly={readOnly || undefined}
        aria-describedby={describedBy}
        aria-label={ariaLabel}
        disabled={disabled}
        className="psel psel-box"
        data-psel="trigger"
        data-live
        data-open={open || undefined}
        data-pressed={showPressed || undefined}
        data-invalid={invalid || undefined}
        style={{ ...vars, width: width ?? '100%', cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'pointer' } as CSSProperties}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={() => (setHover(false), setPress(false))}
        onPointerDown={(e) => {
          if (!interactive || e.button !== 0) return;
          const r = e.currentTarget.getBoundingClientRect();
          setBox({ w: r.width, h: r.height });
          setPress(true);
        }}
        onPointerUp={() => setPress(false)}
        onPointerCancel={() => setPress(false)}
        onClick={() => {
          if (!interactive) return;
          if (open) closeList();
          else openList('pointer');
        }}
        onKeyDown={onKeyDown}
        onBlur={() => open && closeList()}
      >
        <TriggerRow labels={picked.map((i) => i.label)} multiple={multiple} placeholder={placeholder} icon={shownIcon} scale={scale} />
      </button>
      {list}
    </>
  );
}

// ── Input Button ───────────────────────────────────────
export type InputButtonViewProps = {
  look: SelectLook;
  size?: SelSizeProp;
  mode?: ViewMode;
  // 멈춘 그림 — 없으면 실제 버튼(누르면 onClick)
  state?: IbState;
  value?: string;
  placeholder?: string;
  prefix?: string;
  prefixIcon?: SelIcon;
  // 앞 아이콘 자리에 직접 그린 아이콘(Icon Picker 의 지금 아이콘 — lucide 세트 아무것) — 크기 · 색은 칸이 건다(.psel-ic)
  prefixNode?: ReactNode;
  suffix?: string;
  suffixIcon?: SelIcon;
  // 선택 사항인 칸 — 값이 있고 막히지 않았으면 지우기를 그린다
  clearable?: boolean;
  // 멈춘 그림에서 지우기만 누른 모습
  clearPressed?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  onClear?: () => void;
  expanded?: boolean;
  haspopup?: 'dialog' | 'listbox';
  id?: string;
  describedBy?: string;
  ariaLabel?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  width?: number | string;
  zone?: SelZone;
};

export function InputButtonView({
  look,
  size = 'responsive',
  mode = 'auto',
  state,
  value,
  placeholder,
  prefix,
  prefixIcon,
  prefixNode,
  suffix,
  suffixIcon,
  clearable = false,
  clearPressed = false,
  invalid: invalidProp = false,
  disabled: disabledProp = false,
  readOnly: readOnlyProp = false,
  onClick,
  onClear,
  expanded,
  haspopup = 'dialog',
  id,
  describedBy,
  ariaLabel,
  buttonRef,
  width,
  zone,
}: InputButtonViewProps) {
  const live = state === undefined;
  const invalid = invalidProp || state === 'invalid';
  const disabled = disabledProp || state === 'disabled';
  const readOnly = readOnlyProp || state === 'readonly';
  const interactive = !disabled && !readOnly;
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const [clearPress, setClearPress] = useState(false);
  const [measured, setMeasured] = useState<{ w: number; h: number } | null>(null);
  const [ref, frozenBox] = useBoxSize<HTMLDivElement>(state === 'pressed');
  const hitRef = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();
  const box = live ? measured : frozenBox;
  const pressedNow = live ? interactive && press : state === 'pressed';
  const scale = pressedNow && box && !reduce ? pressRatio(look.press, box.w, box.h) : 1;
  const ib = look.ib;
  const clearSize = ib.sizes.large.clear;
  const clearScale = (live ? clearPress : clearPressed) && !reduce ? pressRatio(look.press, clearSize, clearSize) : 1;
  const showClear = clearable && !!value && !disabled && !readOnly;
  const vars = { ...selSizeVars(look, ib, size), ...boxVars(ib, mode, { disabled, readOnly }), '--psel-clear-scale': clearScale } as CSSProperties;

  return (
    <div
      ref={ref}
      className="psel psel-box"
      data-psel="input-button"
      data-live={live || undefined}
      data-pressed={(live ? interactive && (press || hover) : state === 'pressed') || undefined}
      data-ring={state === 'focused' || undefined}
      data-invalid={invalid || undefined}
      style={{ ...vars, width: width ?? '100%', cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'pointer', ...zone?.box }}
    >
      {live && (
        <button
          ref={(el) => {
            hitRef.current = el;
            if (typeof buttonRef === 'function') buttonRef(el);
            else if (buttonRef) (buttonRef as { current: HTMLButtonElement | null }).current = el;
          }}
          id={id}
          type="button"
          className="psel-hit"
          aria-haspopup={haspopup}
          aria-expanded={expanded}
          aria-invalid={invalid || undefined}
          // 읽기 전용 — 포커스는 되고 열지 않는다(버튼에는 aria-readonly 가 없어 레시피처럼 aria-disabled)
          aria-disabled={readOnly || undefined}
          aria-describedby={describedBy}
          aria-label={ariaLabel}
          disabled={disabled}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
          onPointerLeave={() => (setHover(false), setPress(false))}
          onPointerDown={(e) => {
            if (!interactive || e.button !== 0) return;
            const r = e.currentTarget.getBoundingClientRect();
            setMeasured({ w: r.width, h: r.height });
            setPress(true);
          }}
          onPointerUp={() => setPress(false)}
          onPointerCancel={() => setPress(false)}
          onClick={() => interactive && onClick?.()}
        />
      )}
      <span className="psel-row" style={{ '--psel-scale': scale } as CSSProperties}>
        {(prefixIcon || prefixNode) && (
          <span className="psel-ic" style={zone?.prefix}>
            {prefixNode ?? (prefixIcon && <SelIconView name={prefixIcon} />)}
          </span>
        )}
        {prefix && (
          <span className="psel-txt" style={zone?.prefix}>
            {prefix}
          </span>
        )}
        <span className="psel-val" data-ph={!value || undefined} style={zone?.value}>
          {value || placeholder}
        </span>
        {showClear &&
          (live ? (
            <button
              type="button"
              className="psel-clear"
              aria-label="지우기"
              tabIndex={-1}
              onPointerDown={(e) => e.button === 0 && setClearPress(true)}
              onPointerUp={() => setClearPress(false)}
              onPointerLeave={() => setClearPress(false)}
              onPointerCancel={() => setClearPress(false)}
              onClick={() => {
                onClear?.();
                hitRef.current?.focus();
              }}
            >
              <CircleX aria-hidden strokeWidth={2} />
            </button>
          ) : (
            <span className="psel-clear" aria-hidden style={zone?.clear}>
              <CircleX strokeWidth={2} />
            </span>
          ))}
        {suffix && (
          <span className="psel-txt" style={zone?.suffix}>
            {suffix}
          </span>
        )}
        {suffixIcon && (
          <span className="psel-end" style={zone?.suffix}>
            <SelIconView name={suffixIcon} />
          </span>
        )}
      </span>
    </div>
  );
}

// ── Field 와 함께(실제로 쓰는 칸) ──────────────────────────
// <label> 을 누르면 칸으로 포커스만 옮긴다 — 열지 않는다(Field). 라벨의 기본 동작(칸을 누른 것으로 치기)을 막는다
export function labelFocusOnly(e: MouseEvent<HTMLElement>) {
  const lab = (e.target as HTMLElement).closest('label');
  if (!lab || !lab.htmlFor) return;
  e.preventDefault();
  document.getElementById(lab.htmlFor)?.focus();
}

// 실제로 쓰는 Field + Select — 라벨 · 설명 · 오류가 칸과 이어진다(<label for> · aria-describedby)
export function SelectField({
  look,
  field,
  mode = 'auto',
  label,
  description,
  errorMessage,
  invalid = false,
  indicator,
  width,
  select,
}: {
  look: SelectLook;
  field: TfFieldLook;
  mode?: ViewMode;
  label: string;
  description?: string;
  errorMessage?: string;
  invalid?: boolean;
  indicator?: 'required' | 'optional';
  width?: number | string;
  select: Omit<SelectViewProps, 'look' | 'mode' | 'id' | 'describedBy' | 'invalid' | 'required'>;
}) {
  return (
    <div onClick={labelFocusOnly} style={{ width: width ?? '100%' }}>
      <TfFieldView look={field} mode={mode} label={label} description={description} errorMessage={errorMessage} invalid={invalid} indicator={indicator}>
        {(ctl) => <SelectView look={look} mode={mode} id={ctl.id} describedBy={ctl.describedBy} invalid={ctl.invalid} required={ctl.required} {...select} />}
      </TfFieldView>
    </div>
  );
}

// 여러 칸을 한 폼처럼 — 칸마다 따로 상태를 가진다
export function SelectFieldList({ look, field, mode = 'auto', gap, items }: { look: SelectLook; field: TfFieldLook; mode?: ViewMode; gap: number; items: Omit<Parameters<typeof SelectField>[0], 'look' | 'field' | 'mode'>[] }) {
  return (
    <div className="flex flex-col" style={{ gap }}>
      {items.map((it, i) => (
        <SelectField key={i} look={look} field={field} mode={mode} {...it} />
      ))}
    </div>
  );
}
