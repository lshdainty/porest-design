'use client';
// 스펙대로 그린 쪽 넘김(Pagination) · 표 넘김(Table Pagination) · 목록 끝 자리(끝없이 불러오기) — NavKit(nav-look)의 page · table · list 값만 받아 그린다.
// Pagination: 칸 40 을 사이 없이 잇고 지금 쪽은 짙게 채운다. 칸 수는 9 · 7(화살표 포함)로 고정이고 끝 쪽에서는 화살표 자리가 빈 칸이다.
// 누르는 영역은 위아래만 44(보이지 않는 여백 2 씩) — 옆은 칸 폭 40. live 면 실제로 넘기고, 끝 쪽에 닿아 누르던 화살표가 빈 칸이 되면 초점을 지금 쪽으로 옮긴다.
// Table Pagination: 한 줄 40 — 줄 수 고르기(Select medium) + "씩 보기", 범위 고르기 + "/ 총 N개" + 이전 · 다음(끝에서 막힘, aria-disabled).
// 인라인 스타일은 늘 긴 이름(paddingTop …)으로 쓴다(사이트 #154).
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ButtonView } from './button-view';
import type { ProgressCircleLook } from './loading-shared';
import { ProgressCircleView } from './loading-view';
import { SelectOpenView, SelectTriggerView, SelectView } from './select-view';
import { useReducedMotion } from './overlay-view';
import { comma, FONT, ncv, paginationItems, pressRatio, srOnly, tablePages, tableRange, textOf, type InfiniteListLook, type ListStatus, type PaginationLook, type PgSlot, type PgState, type TablePaginationLook, type ViewMode } from './nav-shared';
import { NavGlyph, useFocusRing, usePress } from './nav-view';

const resetBox: CSSProperties = { marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, borderWidth: 0, borderStyle: 'none', background: 'transparent', color: 'inherit', WebkitTapHighlightColor: 'transparent' };
export type PgKey = number | 'previous' | 'next';
export type PgPart = 'root' | 'arrow' | 'page' | 'current' | 'ellipsis' | 'empty' | 'hit';

// ── 쪽 넘김 칸 하나 ───────────────────────────────────────
// 그림이 칸 하나만 그릴 때도 쓴다(상태 그림)
export function PgCell({ look, mode, slot, current, live, link, state, disabled, onPick, label, refCb, hit, zone, pin }: { look: PaginationLook; mode: ViewMode; slot: PgSlot; current: boolean; live: boolean; link: boolean; state?: PgState; disabled: boolean; onPick?: () => void; label?: string; refCb?: (el: HTMLElement | null) => void; hit?: CSSProperties; zone?: CSSProperties; pin?: ReactNode }) {
  const p = usePress();
  const f = useFocusRing();
  const reduce = useReducedMotion();
  const C = look.cell;
  const size: CSSProperties = { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxSizing: 'border-box', width: C.size, height: C.size };
  if (slot.type === 'empty')
    return (
      <span aria-hidden data-pg="empty" style={{ ...size, ...zone }}>
        {pin}
      </span>
    );
  if (slot.type === 'ellipsis')
    return (
      <span aria-hidden data-pg="ellipsis" style={{ ...size, color: ncv(look.ellipsis.fg, mode), ...zone }}>
        <NavGlyph name="more" size={look.ellipsis.icon} />
        {pin}
      </span>
    );
  const off = disabled || state === 'disabled';
  const shown: PgState = live ? (off ? 'disabled' : p.press ? 'pressed' : p.hover ? 'hovered' : 'enabled') : (state ?? (off ? 'disabled' : 'enabled'));
  const focused = live ? f.ring : state === 'focused';
  const isPage = slot.type === 'page';
  const bg = isPage && current ? (shown === 'disabled' ? C.currentDisabledBg : shown === 'pressed' || shown === 'hovered' ? C.currentPressBg : C.currentBg) : shown === 'pressed' ? C.pressBg : shown === 'hovered' ? C.hoverBg : null;
  const fg = shown === 'disabled' ? (isPage ? look.label.disabledFg : look.arrow.disabledFg) : isPage && current ? C.currentFg : isPage ? look.label.fg : look.arrow.fg;
  const scale = shown === 'pressed' && !reduce ? pressRatio(look.press, C.size, C.size) : 1;
  const style: CSSProperties = {
    ...resetBox,
    ...size,
    borderRadius: C.radius,
    background: bg ? ncv(bg, mode) : 'transparent',
    ...textOf({ ...look.label.type, fontWeight: look.label.weight }, ncv(fg, mode)),
    fontVariantNumeric: 'tabular-nums',
    textDecoration: 'none',
    cursor: live ? (off ? 'not-allowed' : 'pointer') : undefined,
    transform: scale === 1 ? 'none' : `scale(${scale})`,
    transition: `background-color ${look.color.duration} ${look.color.easing}, transform ${look.press.motion.duration} ${look.press.motion.easing}`,
    outlineStyle: focused ? 'solid' : 'none',
    outlineWidth: look.ring.width,
    outlineColor: ncv(look.ring.color, mode),
    outlineOffset: look.ring.offset,
    ...zone,
  };
  // 누르는 영역 — 위아래만 넓힌다(옆은 칸 폭 그대로)
  const grow = (C.touchH - C.size) / 2;
  const inner = (
    <>
      <span aria-hidden data-pg-hit style={{ position: 'absolute', top: -grow, bottom: -grow, left: 0, right: 0, ...hit }} />
      {isPage ? <span style={{ position: 'relative', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{slot.page}</span> : <NavGlyph name={slot.type === 'previous' ? 'chevron-left' : 'chevron-right'} size={look.arrow.icon} />}
      {pin}
    </>
  );
  const data = { 'data-pg': isPage ? (current ? 'current' : 'page') : slot.type };
  if (!live)
    return (
      <span aria-hidden {...data} style={style}>
        {inner}
      </span>
    );
  const common = {
    ...data,
    'aria-label': label,
    style,
    className: 'outline-none',
    onFocus: f.onFocus,
    onBlur: f.onBlur,
    ...p.handlers,
  };
  if (link)
    return (
      <a
        ref={refCb}
        href={off ? undefined : isPage ? `?page=${slot.page}` : '#'}
        aria-current={isPage && current ? 'page' : undefined}
        aria-disabled={off || undefined}
        {...common}
        onClick={(e) => {
          e.preventDefault();
          if (!off) onPick?.();
        }}
      >
        {inner}
      </a>
    );
  return (
    <button ref={refCb} type="button" aria-current={isPage && current ? 'page' : undefined} disabled={off} {...common} onClick={onPick}>
      {inner}
    </button>
  );
}

export type PaginationViewProps = {
  look: PaginationLook;
  mode?: ViewMode;
  page: number;
  total: number;
  slots: number;
  live?: boolean;
  // 쪽이 주소에 있으면 칸은 링크
  links?: boolean;
  disabled?: boolean;
  states?: Partial<Record<string, PgState>>;
  onChange?: (page: number, reason: 'page-item' | 'previous' | 'next') => void;
  ariaLabel?: string;
  // 누르는 영역을 칠한다(그림)
  showHit?: boolean;
  zone?: Partial<Record<PgPart, CSSProperties>>;
  pins?: Partial<Record<PgPart, ReactNode>>;
  style?: CSSProperties;
};
// 1쪽 이하면 그리지 않는다
export function PaginationView({ look, mode = 'auto', page, total, slots, live = false, links = false, disabled = false, states, onChange, ariaLabel = '페이지 탐색', showHit = false, zone, pins, style }: PaginationViewProps) {
  const cells = useRef<Map<string, HTMLElement | null>>(new Map());
  const focusCurrent = useRef(false);
  const [said, setSaid] = useState('');
  const items = paginationItems(page, total, slots);
  useEffect(() => {
    if (!focusCurrent.current) return;
    focusCurrent.current = false;
    cells.current.get(`page-${page}`)?.focus();
  }, [page]);
  if (total <= 1) return null;
  const go = (p: number, reason: 'page-item' | 'previous' | 'next') => {
    const active = typeof document !== 'undefined' ? document.activeElement : null;
    // 끝 쪽에 닿으면 누르던 화살표가 빈 칸이 된다 — 초점을 지금 쪽 번호로
    if (reason !== 'page-item' && (p === 1 || p === total) && active && (active === cells.current.get('previous') || active === cells.current.get('next'))) focusCurrent.current = true;
    setSaid(`${p}페이지, 전체 ${total}페이지`);
    onChange?.(p, reason);
  };
  const hit: CSSProperties | undefined = showHit ? { background: 'rgba(236, 72, 153, 0.22)', outlineStyle: 'dashed', outlineWidth: 1, outlineColor: '#DB2777', outlineOffset: -1 } : undefined;
  return (
    <nav aria-label={live ? ariaLabel : undefined} aria-hidden={live ? undefined : true} data-pg-root={slots} style={{ position: 'relative', display: 'flex', justifyContent: 'center', columnGap: look.gap, fontFamily: FONT, ...zone?.root, ...style }}>
      {pins?.root}
      {items.map((s, i) => {
        const key = s.type === 'page' ? `page-${s.page}` : s.type === 'empty' ? `empty-${s.at}` : s.type === 'ellipsis' ? `ellipsis-${i}` : s.type;
        const stKey = s.type === 'page' ? String(s.page) : s.type;
        const part: PgPart = s.type === 'page' ? (s.page === page ? 'current' : 'page') : s.type === 'previous' || s.type === 'next' ? 'arrow' : s.type;
        const label = s.type === 'page' ? `${s.page}페이지` : s.type === 'previous' ? '이전 페이지' : s.type === 'next' ? '다음 페이지' : undefined;
        return (
          <PgCell
            key={key}
            look={look}
            mode={mode}
            slot={s}
            current={s.type === 'page' && s.page === page}
            live={live}
            link={links}
            state={states?.[stKey]}
            disabled={disabled}
            label={label}
            hit={hit}
            refCb={(el) => void cells.current.set(s.type === 'page' ? `page-${s.page}` : s.type, el)}
            onPick={() => (s.type === 'page' ? go(s.page, 'page-item') : s.type === 'previous' ? go(page - 1, 'previous') : s.type === 'next' ? go(page + 1, 'next') : undefined)}
            zone={zone?.[part]}
            pin={i === items.findIndex((x) => (x.type === 'page' ? (x.page === page ? 'current' : 'page') : x.type === 'previous' || x.type === 'next' ? 'arrow' : x.type) === part) ? pins?.[part] : undefined}
          />
        );
      })}
      {live && (
        <span role="status" style={srOnly}>
          {said}
        </span>
      )}
    </nav>
  );
}

// ── 표 넘김 ─────────────────────────────────────────────
export type TpPart = 'root' | 'pageSize' | 'suffix' | 'pageRange' | 'total' | 'arrows' | 'arrow';
type TpArrowState = 'enabled' | 'hovered' | 'pressed' | 'focused' | 'disabled';
function TpArrow({ look, mode, dir, disabled, live, state, onPick, zone }: { look: TablePaginationLook; mode: ViewMode; dir: 'previous' | 'next'; disabled: boolean; live: boolean; state?: TpArrowState; onPick?: () => void; zone?: CSSProperties }) {
  const p = usePress();
  const f = useFocusRing();
  const reduce = useReducedMotion();
  const A = look.arrow;
  const shown: TpArrowState = live ? (disabled ? 'disabled' : p.press ? 'pressed' : p.hover ? 'hovered' : 'enabled') : (state ?? (disabled ? 'disabled' : 'enabled'));
  const focused = live ? f.ring : state === 'focused';
  const scale = shown === 'pressed' && !reduce ? pressRatio(look.press, A.size, A.size) : 1;
  const grow = (A.touchH - A.size) / 2;
  const style: CSSProperties = {
    ...resetBox,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: A.size,
    height: A.size,
    borderRadius: A.radius,
    background: shown === 'pressed' ? ncv(A.pressBg, mode) : shown === 'hovered' ? ncv(A.hoverBg, mode) : 'transparent',
    color: ncv(shown === 'disabled' ? A.disabledFg : A.fg, mode),
    cursor: live ? (shown === 'disabled' ? 'not-allowed' : 'pointer') : undefined,
    transform: scale === 1 ? 'none' : `scale(${scale})`,
    transition: `background-color ${look.color.duration} ${look.color.easing}, transform ${look.press.motion.duration} ${look.press.motion.easing}`,
    outlineStyle: focused ? 'solid' : 'none',
    outlineWidth: look.ring.width,
    outlineColor: ncv(look.ring.color, mode),
    outlineOffset: look.ring.offset,
    ...zone,
  };
  const inner = (
    <>
      <span aria-hidden style={{ position: 'absolute', top: -grow, bottom: -grow, left: 0, right: 0 }} />
      <NavGlyph name={dir === 'previous' ? 'chevron-left' : 'chevron-right'} size={A.icon} />
    </>
  );
  if (!live)
    return (
      <span aria-hidden style={style}>
        {inner}
      </span>
    );
  // 막혀도 초점이 그 자리에 남는다 — disabled 대신 aria-disabled
  return (
    <button type="button" aria-label={dir === 'previous' ? '이전 페이지' : '다음 페이지'} aria-disabled={disabled || undefined} style={style} className="outline-none" onClick={disabled ? undefined : onPick} onFocus={f.onFocus} onBlur={f.onBlur} {...p.handlers}>
      {inner}
    </button>
  );
}

export type TablePaginationViewProps = {
  look: TablePaginationLook;
  mode?: ViewMode;
  // 전체 수 — 모르면 undefined(다음이 있는지만 안다)
  total?: number;
  hasNext?: boolean;
  page: number;
  pageSize: number;
  live?: boolean;
  onChange?: (v: { page: number; pageSize: number }, reason: 'previous' | 'next' | 'page-range' | 'page-size') => void;
  arrowStates?: Partial<Record<'previous' | 'next', TpArrowState>>;
  // 멈춘 그림 — 열린 목록(줄 수 · 범위)
  openList?: 'size' | 'range';
  rangeScrollTop?: number;
  zone?: Partial<Record<TpPart, CSSProperties>>;
  pins?: Partial<Record<TpPart, ReactNode>>;
  style?: CSSProperties;
  // 좁은 화면 그림 — 줄을 접은 나쁜 예(두 줄)
  wrap?: boolean;
};
export function TablePaginationView({ look, mode = 'auto', total, hasNext = true, page, pageSize, live = false, onChange, arrowStates, openList, rangeScrollTop, zone, pins, style, wrap = false }: TablePaginationViewProps) {
  const known = total !== undefined;
  const pages = known ? tablePages(total, pageSize) : page + (hasNext ? 1 : 0);
  const empty = total === 0;
  const { from, to } = tableRange(page, pageSize, total);
  const rangeText = `${from}-${to}`;
  const sizeGroups = [{ items: look.options.map((n) => ({ value: String(n), label: `${n}개` })) }];
  const rangeGroups = [{ items: Array.from({ length: known && !empty ? pages : 1 }, (_, i) => ({ value: String(i + 1), label: (({ from: a, to: b }) => `${a}-${b}`)(tableRange(i + 1, pageSize, total)) })) }];
  const prevOff = empty || page <= 1;
  const nextOff = empty || (known ? page >= pages : !hasNext);
  const txt = (t: TablePaginationLook['suffix'], fg = t.color) => ({ ...textOf(t, ncv(fg, mode)), whiteSpace: 'nowrap' as const, fontVariantNumeric: 'tabular-nums' as const });
  const box = (minW: number, child: ReactNode, z?: CSSProperties, pin?: ReactNode) => (
    <span style={{ position: 'relative', display: 'inline-block', width: 'max-content', minWidth: minW, flexShrink: 0, ...z }}>
      {child}
      {pin}
    </span>
  );
  const trigger = (kind: 'size' | 'range', text: string, disabledText = false) => {
    const groups = kind === 'size' ? sizeGroups : rangeGroups;
    const value = kind === 'size' ? String(pageSize) : String(page);
    if (live && !(kind === 'range' && empty))
      return (
        <SelectView
          look={look.select}
          size="medium"
          mode={mode}
          groups={groups}
          value={[value]}
          ariaLabel={kind === 'size' ? '페이지당 표시 개수' : '표시 범위'}
          listMaxHeight={kind === 'range' ? look.range.maxH : undefined}
          onValue={(v) => {
            const n = Number(v[0]);
            if (kind === 'size') onChange?.({ page: 1, pageSize: n }, 'page-size');
            else onChange?.({ page: n, pageSize }, 'page-range');
          }}
        />
      );
    if (openList === kind)
      return <SelectOpenView look={look.select} size="medium" mode={mode} groups={groups} selected={[value]} labels={[text]} maxHeight={kind === 'range' ? look.range.maxH : undefined} scrollTop={kind === 'range' ? rangeScrollTop : undefined} placement="overlay" />;
    // 빈 표 — 범위 칸이 막힌다(글자 fg-disabled — Select 의 막힘 그대로)
    return <SelectTriggerView look={look.select} size="medium" mode={mode} state={disabledText ? 'disabled' : 'enabled'} labels={[text]} />;
  };
  return (
    <div
      role={live ? 'group' : undefined}
      aria-label={live ? '표 페이지 탐색' : undefined}
      aria-hidden={live ? undefined : true}
      data-tp
      style={{
        position: 'relative',
        display: 'flex',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: look.gap,
        rowGap: wrap ? 8 : 0,
        minHeight: look.height,
        fontFamily: FONT,
        whiteSpace: 'nowrap',
        ...zone?.root,
        ...style,
      }}
    >
      {pins?.root}
      <span style={{ position: 'relative', display: 'flex', alignItems: 'center', columnGap: look.pageSize.gap, flexShrink: 0 }}>
        {box(look.pageSize.minW, trigger('size', `${pageSize}개`), zone?.pageSize, pins?.pageSize)}
        <span style={{ position: 'relative', ...txt(look.suffix), ...zone?.suffix }}>
          씩 보기
          {pins?.suffix}
        </span>
      </span>
      <span style={{ position: 'relative', display: 'flex', alignItems: 'center', columnGap: look.gap, flexShrink: 0 }}>
        <span style={{ position: 'relative', display: 'flex', alignItems: 'center', columnGap: look.range.gap }}>
          {known ? (
            <>
              {box(look.range.minW, trigger('range', rangeText, empty), zone?.pageRange, pins?.pageRange)}
              <span style={{ position: 'relative', ...txt(look.total), ...zone?.total }}>
                / 총 {comma(total)}개{pins?.total}
              </span>
            </>
          ) : (
            <span style={{ position: 'relative', ...txt(look.total), ...zone?.pageRange }}>
              {rangeText}
              {pins?.pageRange}
            </span>
          )}
        </span>
        <span style={{ position: 'relative', display: 'flex', ...zone?.arrows }}>
          <TpArrow look={look} mode={mode} dir="previous" disabled={prevOff} live={live} state={arrowStates?.previous} onPick={() => onChange?.({ page: page - 1, pageSize }, 'previous')} zone={zone?.arrow} />
          <TpArrow look={look} mode={mode} dir="next" disabled={nextOff} live={live} state={arrowStates?.next} onPick={() => onChange?.({ page: page + 1, pageSize }, 'next')} zone={zone?.arrow} />
          {pins?.arrows}
        </span>
      </span>
    </div>
  );
}

// ── 목록 끝 자리(끝없이 불러오기) ───────────────────────────
export function InfiniteListEndView({ look, circle, mode = 'auto', status, endText, live = false, onRetry, zone }: { look: InfiniteListLook; circle: ProgressCircleLook; mode?: ViewMode; status: ListStatus; endText?: string; live?: boolean; onRetry?: () => void; zone?: CSSProperties }) {
  const M = look.message;
  return (
    <div data-list-end={status} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: look.padY, paddingBottom: look.padY, fontFamily: FONT, ...zone }}>
      {status === 'loading' && <ProgressCircleView look={circle} mode={mode} size={String(look.circle) as '24'} tone="neutral" label="더 불러오는 중" />}
      {status === 'error' && (
        <>
          <span style={{ ...textOf(M, ncv(M.errorFg, mode)), textAlign: 'center' }}>{look.texts.error}</span>
          <span style={{ display: 'flex', marginTop: look.retry.marginTop }}>
            <ButtonView look={look.retry.look} mode={mode} label={look.texts.retry} state={live ? 'live' : 'enabled'} onClick={onRetry} />
          </span>
        </>
      )}
      {status === 'end' && <span style={{ ...textOf(M, ncv(M.endFg, mode)), textAlign: 'center' }}>{endText ?? look.texts.end}</span>}
    </div>
  );
}

// ── 미리보기용 — 스스로 쪽을 기억하는 줄(코드 예시 위에서 실제로 넘긴다) ─────
export function PaginationLive(props: Omit<PaginationViewProps, 'live' | 'onChange'>) {
  const [page, setPage] = useState(props.page);
  return <PaginationView {...props} page={page} live onChange={setPage} />;
}
export function TablePaginationLive(props: Omit<TablePaginationViewProps, 'live' | 'onChange'>) {
  const [v, setV] = useState({ page: props.page, pageSize: props.pageSize });
  return <TablePaginationView {...props} page={v.page} pageSize={v.pageSize} hasNext={props.total === undefined ? v.page < 3 : props.hasNext} live onChange={(next) => setV(next)} />;
}
