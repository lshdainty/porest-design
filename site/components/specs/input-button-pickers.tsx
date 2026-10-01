'use client';
// Input Button 이 여는 자리 — 시트(1280 미만) · 팝오버(1280 이상)와 그 안의 달력 · 격자 · 검색 목록.
// 시트 · 팝오버 · 달력 · 시각 휠의 모양은 아직 스펙이 없다(Bottom Sheet · Popover · Date Picker · Time Picker 차례) —
// 역할 색 토큰으로 간단히 그린다. 칸(Input Button)과 Field 는 YAML 대로다(select-view · text-field-view).
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ButtonLook } from './button-look';
import { ButtonView } from './button-view';
import { CATEGORIES, PEOPLE, WEEK, catText, formatDate, weekday, type CatItem, type Person } from './input-button-data';
import { scv, type SelIcon, type SelSizeProp, type SelTone, type SelectLook, type ViewMode } from './select-shared';
import { InputButtonView, SelIconView, labelFocusOnly } from './select-view';
import type { TfFieldLook, TfInputLook } from './text-field-shared';
import { TfFieldView, TfInputView } from './text-field-view';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const tone = (look: SelectLook, name: SelTone, mode: ViewMode) => scv(look.tone[name], mode);
const dimOf = (look: SelectLook, mode: ViewMode) => (mode === 'auto' ? 'var(--p-overlay-dim)' : look.overlay.dim[mode]);
const FONT = "'Pretendard Variable', Pretendard, sans-serif";

// 폭이 이 값 이상인지 — Input Button 이 여는 자리(1280 미만 시트 · 이상 팝오버)
function useMinWidth(px: number) {
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

// ── 시트 · 팝오버의 판 ────────────────────────────────────
// 시트 — 위 모서리 · 손잡이 · 제목(고를 값의 종류) · 닫기, 아래에 확정 버튼(있을 때만)
export function SheetPanel({ look, mode = 'auto', title, titleId, children, footer, onClose }: { look: SelectLook; mode?: ViewMode; title: string; titleId?: string; children: ReactNode; footer?: ReactNode; onClose?: () => void }) {
  const r = look.overlay.sheetRadius;
  const close = (
    <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: tone(look, 'bg-neutral-weak', mode) }}>
      <X aria-hidden size={14} strokeWidth={2.5} style={{ color: tone(look, 'fg-neutral', mode) }} />
    </span>
  );
  return (
    <div className="relative" style={{ borderRadius: `${r}px ${r}px 0 0`, background: tone(look, 'bg-layer-floating', mode), fontFamily: FONT }}>
      <span aria-hidden className="absolute left-1/2 top-1.5 h-1 w-9 -translate-x-1/2 rounded-full" style={{ background: tone(look, 'stroke-neutral-weak', mode) }} />
      {onClose ? (
        <button type="button" aria-label="닫기" onClick={onClose} className="absolute right-4 top-6 cursor-pointer border-0 bg-transparent p-0">
          {close}
        </button>
      ) : (
        <span aria-hidden className="absolute right-4 top-6">
          {close}
        </span>
      )}
      <div id={titleId} className="pb-4 pl-6 pr-14 pt-6 text-[22px] font-bold leading-[30px]" style={{ color: tone(look, 'fg-neutral', mode) }}>
        {title}
      </div>
      <div>{children}</div>
      {footer ? <div className="px-6 pb-4 pt-3">{footer}</div> : <div className="h-4" />}
    </div>
  );
}

// 시트를 폰 화면 위에 — 딤 위 아래쪽
export function SheetOverlay({ look, mode = 'auto', children }: { look: SelectLook; mode?: ViewMode; children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end" style={{ background: dimOf(look, mode) }}>
      {children}
    </div>
  );
}

// 팝오버 — 떠 있는 판(목록과 같은 바탕 · 그림자 · 모서리로 간단히)
export function PopoverPanel({ look, mode = 'auto', children, footer, width, pad = 16 }: { look: SelectLook; mode?: ViewMode; children: ReactNode; footer?: ReactNode; width?: number | string; pad?: number }) {
  return (
    <div style={{ width, boxSizing: 'border-box', padding: pad, borderRadius: look.overlay.popoverRadius, background: tone(look, 'bg-layer-floating', mode), boxShadow: scv(look.content.shadow, mode), fontFamily: FONT }}>
      {children}
      {footer && <div className="mt-3 flex justify-end gap-2">{footer}</div>}
    </div>
  );
}

// ── 달력 · 격자 · 휠 · 사람 목록(그림 · 실제 둘 다) ─────────────
export function CalendarGrid({
  look,
  mode = 'auto',
  year,
  month,
  selected,
  today,
  cell = 42,
  onPick,
  dayRef,
}: {
  look: SelectLook;
  mode?: ViewMode;
  year: number;
  month: number;
  selected?: number;
  today?: number;
  cell?: number;
  onPick?: (d: number) => void;
  dayRef?: (d: number, el: HTMLButtonElement | null) => void;
}) {
  const first = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const fg = tone(look, 'fg-neutral', mode);
  const dot = cell - 8;
  return (
    <div style={{ width: cell * 7, maxWidth: '100%', fontFamily: FONT }}>
      <div className="flex h-10 items-center justify-between px-1">
        <span className="text-[16px] font-bold" style={{ color: fg }}>
          {year}년 {month}월
        </span>
        <span className="flex gap-4" aria-hidden>
          <ChevronLeft size={20} style={{ color: fg }} />
          <ChevronRight size={20} style={{ color: fg }} />
        </span>
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {WEEK.map((w) => (
          <span key={w} className="text-center text-[13px] font-medium leading-6" style={{ color: tone(look, 'fg-neutral-subtle', mode) }}>
            {w}
          </span>
        ))}
        {Array.from({ length: first }, (_, i) => (
          <span key={`b${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const d = i + 1;
          const sel = d === selected;
          const now = d === today && !sel;
          const style: CSSProperties = {
            width: dot,
            height: dot,
            margin: '0 auto',
            display: 'grid',
            placeItems: 'center',
            borderRadius: 9999,
            fontSize: 15,
            fontWeight: 500,
            fontFamily: FONT,
            border: 0,
            padding: 0,
            background: sel ? tone(look, 'bg-neutral-inverted', mode) : now ? tone(look, 'bg-neutral-weak', mode) : 'transparent',
            color: sel ? tone(look, 'fg-neutral-inverted', mode) : now ? fg : tone(look, 'fg-neutral-muted', mode),
            cursor: onPick ? 'pointer' : undefined,
          };
          return onPick ? (
            <button key={d} ref={(el) => dayRef?.(d, el)} type="button" aria-pressed={sel} aria-label={`${month}월 ${d}일 ${weekday(year, month, d)}요일${d === today ? ', 오늘' : ''}`} style={style} onClick={() => onPick(d)}>
              {d}
            </button>
          ) : (
            <span key={d} style={style}>
              {d}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// 시각 휠(모양만 — Time Picker 차례에 정한다). 가운데 줄이 고른 값
export function TimeWheel({ look, mode = 'auto', columns, width = 280 }: { look: SelectLook; mode?: ViewMode; columns: { items: string[]; at: number }[]; width?: number }) {
  const row = 40;
  return (
    <div className="relative mx-auto flex justify-center" style={{ width, height: row * 5, fontFamily: FONT }}>
      <span aria-hidden className="absolute inset-x-0 rounded-xl" style={{ top: row * 2, height: row, background: tone(look, 'bg-layer-floating-pressed', mode) }} />
      {columns.map((col, ci) => (
        <div key={ci} className="relative flex flex-1 flex-col items-center">
          {[-2, -1, 0, 1, 2].map((o) => {
            const t = col.items[col.at + o];
            return (
              <span key={o} className="flex items-center justify-center" style={{ height: row, fontSize: o === 0 ? 20 : 17, fontWeight: o === 0 ? 600 : 400, color: tone(look, o === 0 ? 'fg-neutral' : 'fg-neutral-subtle', mode), opacity: Math.abs(o) === 2 ? 0.5 : 1 }}>
                {t ?? ''}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// 카테고리 격자 — 묶음 제목 아래 아이콘 칸. 고른 칸은 체크
export function CategoryGrid({ look, mode = 'auto', items = CATEGORIES, selected, pressed, onPick, cellRef }: { look: SelectLook; mode?: ViewMode; items?: CatItem[]; selected?: string; pressed?: string; onPick?: (v: string) => void; cellRef?: (v: string, el: HTMLButtonElement | null) => void }) {
  const groups = [...new Set(items.map((i) => i.group))];
  return (
    <div className="flex flex-col gap-3 px-4" style={{ fontFamily: FONT }}>
      {groups.map((g) => (
        <div key={g} className="flex flex-col gap-1">
          <span className="px-2 text-[13px] font-medium leading-[18px]" style={{ color: tone(look, 'fg-neutral-subtle', mode) }}>
            {g}
          </span>
          <div className="grid grid-cols-4">
            {items
              .filter((i) => i.group === g)
              .map((i) => {
                const on = i.value === selected;
                const body = (
                  <>
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full" style={{ background: tone(look, `chart-${i.hue}-weak` as SelTone, mode) }}>
                      <SelIconView name={i.icon} size={22} color={tone(look, `chart-${i.hue}-contrast` as SelTone, mode)} />
                      {on && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full" style={{ background: tone(look, 'bg-neutral-inverted', mode), boxShadow: `0 0 0 2px ${tone(look, 'bg-layer-floating', mode)}` }}>
                          <Check aria-hidden size={11} strokeWidth={3} style={{ color: tone(look, 'fg-neutral-inverted', mode) }} />
                        </span>
                      )}
                    </span>
                    <span className="text-[13px] leading-[18px]" style={{ color: tone(look, 'fg-neutral', mode), fontWeight: on ? 600 : 400 }}>
                      {i.label}
                    </span>
                  </>
                );
                const style: CSSProperties = { background: i.value === pressed ? tone(look, 'bg-layer-floating-pressed', mode) : 'transparent', fontFamily: FONT };
                return onPick ? (
                  <button key={i.value} ref={(el) => cellRef?.(i.value, el)} type="button" aria-pressed={on} aria-label={catText(i)} onClick={() => onPick(i.value)} className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-0 py-2" style={style}>
                    {body}
                  </button>
                ) : (
                  <span key={i.value} className="flex flex-col items-center gap-1.5 rounded-xl py-2" style={style}>
                    {body}
                  </span>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

// 날(1 ~ 31) 격자 — 반복 날짜처럼 달과 상관없이 날만 고른다(누르면 바로)
export function DayGrid({ look, mode = 'auto', selected, onPick, cellRef }: { look: SelectLook; mode?: ViewMode; selected?: number; onPick?: (d: number) => void; cellRef?: (d: number, el: HTMLButtonElement | null) => void }) {
  return (
    <div className="grid grid-cols-7 gap-1 px-4" style={{ fontFamily: FONT }}>
      {Array.from({ length: 31 }, (_, i) => {
        const d = i + 1;
        const on = d === selected;
        return (
          <button
            key={d}
            ref={(el) => cellRef?.(d, el)}
            type="button"
            aria-pressed={on}
            aria-label={`${d}일`}
            onClick={() => onPick?.(d)}
            className="mx-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 text-[15px] font-medium"
            style={{ background: on ? tone(look, 'bg-neutral-inverted', mode) : 'transparent', color: on ? tone(look, 'fg-neutral-inverted', mode) : tone(look, 'fg-neutral', mode), fontFamily: FONT }}
          >
            {d}
          </button>
        );
      })}
    </div>
  );
}

// 사람 — 결재자 · 참조자
export function PeopleList({ look, mode = 'auto', people, query = '', selected, onPick, rowRef }: { look: SelectLook; mode?: ViewMode; people: Person[]; query?: string; selected?: string; onPick?: (v: string) => void; rowRef?: (v: string, el: HTMLButtonElement | null) => void }) {
  const fg = tone(look, 'fg-neutral', mode);
  const sub = tone(look, 'fg-neutral-subtle', mode);
  if (!people.length)
    return (
      <p className="px-6 py-6 text-center text-[15px]" style={{ color: sub, fontFamily: FONT }}>
        &lsquo;{query}&rsquo;(으)로 찾은 사람이 없어요.
      </p>
    );
  return (
    <div className="flex flex-col" style={{ fontFamily: FONT }}>
      {people.map((p) => {
        const on = p.value === selected;
        const body = (
          <>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold" style={{ background: tone(look, `chart-${p.hue}-weak` as SelTone, mode), color: tone(look, `chart-${p.hue}-contrast` as SelTone, mode) }}>
              {p.name.slice(1, 2)}
            </span>
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="text-[16px] leading-[22px]" style={{ color: fg }}>
                {query && p.name.startsWith(query) ? (
                  <>
                    <b>{query}</b>
                    {p.name.slice(query.length)}
                  </>
                ) : (
                  p.name
                )}
              </span>
              <span className="text-[13px] leading-[18px]" style={{ color: sub }}>
                {p.team}
              </span>
            </span>
            {on && <Check aria-hidden size={16} strokeWidth={2.5} style={{ color: fg, flexShrink: 0 }} />}
          </>
        );
        return onPick ? (
          <button key={p.value} ref={(el) => rowRef?.(p.value, el)} type="button" aria-pressed={on} onClick={() => onPick(p.value)} className="flex cursor-pointer items-center gap-3 border-0 bg-transparent px-6 py-2.5" style={{ fontFamily: FONT }}>
            {body}
          </button>
        ) : (
          <span key={p.value} className="flex items-center gap-3 px-6 py-2.5">
            {body}
          </span>
        );
      })}
    </div>
  );
}

// ── 실제로 여는 자리 ─────────────────────────────────────
// 1280 미만은 아래 시트(딤 위), 이상은 칸 아래 8 의 팝오버(칸 왼쪽에 맞추고, 아래가 모자라면 위로). Esc · 바깥 · 딤을 누르면 닫는다
function IbSurface({
  look,
  mode,
  open,
  onClose,
  anchor,
  title,
  children,
  footer,
  popoverWidth,
  autoFocus = '[data-autofocus]',
}: {
  look: SelectLook;
  mode: ViewMode;
  open: boolean;
  onClose: () => void;
  anchor: HTMLElement | null;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  popoverWidth?: number;
  // 열린 뒤 포커스를 받을 것 — 검색칸 · 고른 날 · 고른 칸
  autoFocus?: string;
}) {
  const wide = useMinWidth(look.ib.breakpoint);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number } | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  useEffect(() => setMounted(true), []);
  const box = anchor?.closest('.psel-box') as HTMLElement | null;

  useIsoLayoutEffect(() => {
    if (!open || !wide || !box) return;
    const place = () => {
      const r = box.getBoundingClientRect();
      const p = panelRef.current;
      const h = p?.offsetHeight ?? 0;
      const w = p?.offsetWidth ?? r.width;
      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const g = look.content.gutter;
      const e = look.content.edge;
      const left = Math.max(e, Math.min(r.left, vw - e - w));
      const below = vh - r.bottom - g - e;
      setPos(below >= h || below >= r.top - g - e ? { left, top: r.bottom + g } : { left, bottom: vh - r.top + g });
    };
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open, wide, box, look]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    const onDown = (e: Event) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || box?.contains(t)) return;
      if (wide) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown, true);
    };
  }, [open, wide, onClose, box]);

  // 열린 뒤 포커스 — 판 안의 검색칸 · 고른 날 · 고른 칸(없으면 닫기 버튼이 아닌 첫 버튼)
  useEffect(() => {
    if (!open || !mounted) return;
    const raf = requestAnimationFrame(() => {
      const p = panelRef.current;
      const el = p?.querySelector<HTMLElement>(autoFocus) ?? p?.querySelector<HTMLElement>('input, button:not([aria-label="닫기"])');
      el?.focus({ preventScroll: true });
      el?.scrollIntoView?.({ block: 'nearest' });
    });
    return () => cancelAnimationFrame(raf);
  }, [open, mounted, wide, autoFocus]);

  if (!open || !mounted) return null;
  return createPortal(
    wide ? (
      <div ref={panelRef} role="dialog" aria-label={title} className="psel" style={{ position: 'fixed', zIndex: 100, left: pos?.left ?? 0, top: pos?.top, bottom: pos?.bottom, visibility: pos ? 'visible' : 'hidden' }}>
        <PopoverPanel look={look} mode={mode} width={popoverWidth ?? box?.offsetWidth} footer={footer}>
          {children}
        </PopoverPanel>
      </div>
    ) : (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end" style={{ background: dimOf(look, mode) }} onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
        <div ref={panelRef} role="dialog" aria-modal aria-labelledby={titleId} className="w-full max-w-[480px]">
          <SheetPanel look={look} mode={mode} title={title} titleId={titleId} footer={footer} onClose={onClose}>
            <div className="max-h-[60vh] overflow-y-auto">{children}</div>
          </SheetPanel>
        </div>
      </div>
    ),
    document.body,
  );
}

// ── Field + Input Button + 여는 자리(실제로 써 보는 칸) ─────────
export type IbDemoKind = 'date' | 'category' | 'day' | 'people';
export type InputButtonDemoProps = {
  look: SelectLook;
  field: TfFieldLook;
  // 검색칸(people) — input.yaml 의 상자형
  input?: TfInputLook;
  mode?: ViewMode;
  size?: SelSizeProp;
  kind: IbDemoKind;
  label: string;
  placeholder: string;
  indicator?: 'required' | 'optional';
  description?: string;
  errorMessage?: string;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  // 처음 값 — date 는 날(2026년 10월), day 는 날, category · people 은 value
  initial?: string;
  dateStyle?: 'desk' | 'hr';
  // 반복 날짜(day) — 앞 · 뒤 붙이개
  affix?: { prefix: 'none' | 'icon' | 'text'; suffix: 'none' | 'icon' | 'text' };
  // 확정 버튼 — 시트(넓게) · 팝오버(작게)
  done?: { sheet: ButtonLook; popover: ButtonLook };
  width?: number | string;
};

const YEAR = 2026;
const MONTH = 10;
const TODAY = 1;

export function InputButtonDemo({
  look,
  field,
  input,
  mode = 'auto',
  size = 'responsive',
  kind,
  label,
  placeholder,
  indicator,
  description,
  errorMessage,
  invalid: invalidProp = false,
  disabled = false,
  readOnly = false,
  clearable = false,
  initial,
  dateStyle = 'desk',
  affix = { prefix: 'none', suffix: 'icon' },
  done,
  width,
}: InputButtonDemoProps) {
  const [value, setValue] = useState<string | undefined>(initial);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<number | undefined>(undefined);
  const [query, setQuery] = useState('');
  const [touched, setTouched] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => btnRef.current?.focus());
  };
  const commit = (v: string | undefined) => {
    setValue(v);
    setTouched(true);
    close();
  };
  // 오류는 값을 고르면 걷는다
  const invalid = invalidProp && !(touched && value);

  const cat = CATEGORIES.find((c) => c.value === value);
  const person = PEOPLE.find((p) => p.value === value);
  let text: string | undefined;
  let prefix: string | undefined;
  let prefixIcon: SelIcon | undefined;
  let suffix: string | undefined;
  let suffixIcon: SelIcon | undefined;
  if (kind === 'date') {
    text = value ? formatDate(YEAR, MONTH, Number(value), dateStyle) : undefined;
    suffixIcon = 'calendar';
  } else if (kind === 'category') {
    text = cat ? catText(cat) : undefined;
    prefixIcon = cat?.icon;
    suffixIcon = 'chevron-down';
  } else if (kind === 'people') {
    text = person?.name;
    suffixIcon = 'chevron-down';
  } else {
    text = value ? (affix.suffix === 'text' ? value : `${value}일`) : undefined;
    if (affix.prefix === 'icon') prefixIcon = 'repeat';
    if (affix.prefix === 'text') prefix = '매월';
    if (affix.suffix === 'icon') suffixIcon = 'chevron-down';
    if (affix.suffix === 'text') suffix = '일';
  }

  const filtered = useMemo(() => (query ? PEOPLE.filter((p) => p.name.includes(query) || p.team.includes(query)) : PEOPLE), [query]);
  const doneBtn = (wide: 'sheet' | 'popover') =>
    done && (
      <ButtonView
        look={done[wide]}
        mode={mode}
        label="완료"
        fill={wide === 'sheet'}
        onClick={() => {
          if (draft !== undefined) commit(String(draft));
          else close();
        }}
      />
    );

  let content: ReactNode = null;
  let footer: ReactNode = null;
  let popoverWidth: number | undefined;
  if (kind === 'date') {
    popoverWidth = 6 * 2 + 42 * 7 + 4;
    content = (
      <div className="flex justify-center px-4">
        <CalendarGrid
          look={look}
          mode={mode}
          year={YEAR}
          month={MONTH}
          selected={draft}
          today={TODAY}
          onPick={setDraft}
          dayRef={(d, el) => {
            if (el && d === (draft ?? TODAY)) el.setAttribute('data-autofocus', '');
            else el?.removeAttribute('data-autofocus');
          }}
        />
      </div>
    );
    footer = <SurfaceFooter look={look} sheet={doneBtn('sheet')} popover={doneBtn('popover')} />;
  } else if (kind === 'category') {
    content = (
      <CategoryGrid
        look={look}
        mode={mode}
        selected={value}
        onPick={(v) => commit(v)}
        cellRef={(v, el) => {
          if (el && v === (value ?? CATEGORIES[0].value)) el.setAttribute('data-autofocus', '');
          else el?.removeAttribute('data-autofocus');
        }}
      />
    );
    popoverWidth = 360;
  } else if (kind === 'day') {
    content = (
      <DayGrid
        look={look}
        mode={mode}
        selected={value ? Number(value) : undefined}
        onPick={(d) => commit(String(d))}
        cellRef={(d, el) => {
          if (el && d === Number(value ?? 1)) el.setAttribute('data-autofocus', '');
          else el?.removeAttribute('data-autofocus');
        }}
      />
    );
    popoverWidth = 320;
  } else {
    popoverWidth = 360;
    content = (
      <div className="flex flex-col gap-2">
        <div className="px-4">
          {input && (
            <span className="block" data-search>
              <TfInputView look={input} mode={mode} size="large" prefixIcon="search" placeholder="이름 · 팀으로 찾기" ariaLabel={`${label} 찾기`} value={query} onValue={setQuery} clearable />
            </span>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          <PeopleList look={look} mode={mode} people={filtered} query={query} selected={value} onPick={(v) => commit(v)} />
        </div>
      </div>
    );
  }

  return (
    <div onClick={labelFocusOnly} style={{ width: width ?? '100%' }}>
      <TfFieldView look={field} mode={mode} label={label} indicator={indicator} description={description} errorMessage={errorMessage} invalid={invalid}>
        {(ctl) => (
          <InputButtonView
            look={look}
            mode={mode}
            size={size}
            id={ctl.id}
            describedBy={ctl.describedBy}
            ariaLabel={`${label}, ${text ?? placeholder}`}
            buttonRef={btnRef}
            invalid={invalid}
            disabled={disabled}
            readOnly={readOnly}
            value={text}
            placeholder={placeholder}
            prefix={prefix}
            prefixIcon={prefixIcon}
            suffix={suffix}
            suffixIcon={suffixIcon}
            clearable={clearable}
            onClear={() => setValue(undefined)}
            haspopup="dialog"
            expanded={open}
            onClick={() => {
              setDraft(kind === 'date' && value ? Number(value) : undefined);
              setQuery('');
              setOpen(true);
            }}
          />
        )}
      </TfFieldView>
      <IbSurface look={look} mode={mode} open={open} onClose={close} anchor={btnRef.current} title={label} footer={footer} popoverWidth={popoverWidth} autoFocus={kind === 'people' ? '[data-search] input' : undefined}>
        {content}
      </IbSurface>
    </div>
  );
}

// 확정 버튼 — 시트는 넓은 버튼 하나, 팝오버는 오른쪽에 작은 버튼(폭에 따라 하나만 보인다)
function SurfaceFooter({ look, sheet, popover }: { look: SelectLook; sheet: ReactNode; popover: ReactNode }) {
  const wide = useMinWidth(look.ib.breakpoint);
  return <>{wide ? popover : sheet}</>;
}
