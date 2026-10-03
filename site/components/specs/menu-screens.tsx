// Menu · Menu Sheet · Help Bubble · Tooltip 페이지가 같이 쓰는 그림 조각(서버) — Desk 메모 · HR 직원 화면, 줄 끝 ⋮, 폰의 시트, 스와이프 트레이.
// 메뉴 · 시트 · 말풍선은 menu-look 이 YAML 에서 푼 값으로(menu-view), 버튼은 button.yaml, 트레이는 swipe-actions.yaml 로 그린다.
// 화면 틀(폰 · 창)과 뒤 화면의 글자 크기는 그림 안에서 정한다.
import type { CSSProperties, ReactNode } from 'react';
import { buttonLook } from './button-look';
import { ButtonView, type IconName } from './button-view';
import { MEMOS, MEMO_MENU, PEOPLE, PERSON_MENU, SWIPE_ACTIONS, type Memo } from './menu-data';
import { menuKit, swipeLook, type MenuGroup, type MenuItemState, type MenuKit } from './menu-look';
import { MenuIconView, MenuPanel, MenuSheetSurface, type MenuPanelDecor, type MenuPanelMarks, type MenuSheetSurfaceProps } from './menu-view';
import { Scaled } from './overlay-screens';
import { DimView } from './overlay-view';
export { Scaled };
import { PHONE_SAFE, Phone, WebWindow, rc, type Mode } from './kit';

export type Brand = 'desk' | 'hr';
export const mk = (brand: Brand = 'desk'): MenuKit => menuKit(brand);
// 아이콘만 있는 ghost 버튼(Button ghost · iconOnly · 기본 medium) — 줄 끝 ⋮ · ⓘ · 툴바
export const iconBtn = (brand: Brand = 'desk', ghostColor = 'neutral') => buttonLook({ variant: 'ghost', size: 'medium', layout: 'iconOnly', ghostColor }, brand);
export { PHONE_SAFE };

export function IconButton({ icon, label, mode = 'auto', brand = 'desk', ghostColor = 'neutral', state = 'enabled' }: { icon: IconName; label: string; mode?: Mode; brand?: Brand; ghostColor?: string; state?: 'enabled' | 'hovered' | 'focused' | 'pressed' }) {
  return <ButtonView look={iconBtn(brand, ghostColor)} mode={mode} state={state} icon={icon} ariaLabel={label} />;
}
export const Kebab = ({ label, mode = 'auto', brand = 'desk', state }: { label: string; mode?: Mode; brand?: Brand; state?: 'enabled' | 'hovered' | 'focused' | 'pressed' }) => <IconButton icon="more-vertical" label={`${label} 더보기`} mode={mode} brand={brand} state={state} />;

// 열린 메뉴를 트리거에 붙인다(멈춘 그림) — 트리거 아래 content.offset, 맞추는 쪽은 content.align(end — 메뉴 오른쪽 = 트리거 오른쪽)
export function Anchored({ trigger, menu, offset, align, above = false }: { trigger: ReactNode; menu?: ReactNode; offset: number; align?: 'start' | 'end'; above?: boolean }) {
  const side = align ?? mk().menu.content.align;
  const place: CSSProperties = { ...(side === 'end' ? { right: 0 } : { left: 0 }), ...(above ? { bottom: `calc(100% + ${offset}px)` } : { top: `calc(100% + ${offset}px)` }) };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      {trigger}
      {menu && <span style={{ position: 'absolute', zIndex: 6, ...place }}>{menu}</span>}
    </span>
  );
}

// 메뉴 판(멈춘 그림)
export function Menu({ groups, mode = 'auto', brand = 'desk', states, marks, decor, style }: { groups: MenuGroup[]; mode?: Mode; brand?: Brand; states?: Record<string, MenuItemState>; marks?: MenuPanelMarks; decor?: MenuPanelDecor; style?: CSSProperties }) {
  return <MenuPanel look={mk(brand).menu} mode={mode} groups={groups} states={states} marks={marks} decor={decor} style={style} />;
}

// ── 줄 ───────────────────────────────────────────────────
// 목록 줄 — 제목 · 부제 + 뒤(⋮ · 아이콘 묶음). 줄 사이 선은 마지막 줄에 없다
export function ListRow({ title, sub, mode = 'auto', brand = 'desk', trailing, last = false, pad = 10 }: { title: string; sub: string; mode?: Mode; brand?: Brand; trailing?: ReactNode; last?: boolean; pad?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: `${pad}px 0`, borderBottom: last ? 'none' : `1px solid ${rc('stroke-neutral-subtle', mode, brand)}` }}>
      <span style={{ display: 'flex', flex: '1 1 0%', minWidth: 0, flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 15, lineHeight: '20px', fontWeight: 500, color: rc('fg-neutral', mode, brand), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        <span style={{ fontSize: 13, lineHeight: '18px', color: rc('fg-neutral-subtle', mode, brand) }}>{sub}</span>
      </span>
      {trailing}
    </div>
  );
}

// 늘 보이는 수정 · 삭제 아이콘(나쁜 예)
export const EditDeleteIcons = ({ mode = 'auto', title }: { mode?: Mode; title: string }) => (
  <span style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
    <ButtonView look={iconBtn('desk')} mode={mode} state="enabled" icon="pencil" ariaLabel={`${title} 수정`} />
    <ButtonView look={iconBtn('desk', 'critical')} mode={mode} state="enabled" icon="trash" ariaLabel={`${title} 삭제`} />
  </span>
);

// ── Desk 메모(데스크톱 창) ─────────────────────────────────
// open — 메뉴를 연 줄. trailing='icons' 면 줄마다 수정 · 삭제 아이콘(나쁜 예)
export function MemoWindow({
  mode = 'auto',
  w = 400,
  h = 380,
  open,
  groups = MEMO_MENU,
  states,
  trailing = 'kebab',
  menu,
}: {
  mode?: Mode;
  w?: number;
  h?: number;
  open?: number;
  groups?: MenuGroup[];
  states?: Record<string, MenuItemState>;
  trailing?: 'kebab' | 'icons';
  // 열린 메뉴 대신 그릴 것(나쁜 예 · 다른 메뉴)
  menu?: ReactNode;
}) {
  const k = mk();
  return (
    <WebWindow mode={mode} w={w} h={h}>
      <div style={{ height: '100%', boxSizing: 'border-box', padding: '22px 28px', background: rc('bg-layer-basement', mode) }}>
        <div style={{ fontSize: 20, lineHeight: '28px', fontWeight: 700, color: rc('fg-neutral', mode), paddingBottom: 14 }}>메모</div>
        <div style={{ borderRadius: 12, padding: '4px 16px 4px 20px', background: rc('bg-layer-default', mode) }}>
          {MEMOS.map((m, i) => (
            <ListRow
              key={m.title}
              title={m.title}
              sub={m.sub}
              mode={mode}
              last={i === MEMOS.length - 1}
              trailing={
                trailing === 'icons' ? (
                  <EditDeleteIcons mode={mode} title={m.title} />
                ) : (
                  <Anchored offset={k.menu.content.offset} trigger={<Kebab label={m.title} mode={mode} />} menu={open === i ? (menu ?? <Menu groups={groups} mode={mode} states={states} />) : undefined} />
                )
              }
            />
          ))}
        </div>
      </div>
    </WebWindow>
  );
}

// ── HR 직원(데스크톱 창 · 표) ─────────────────────────────
const PEOPLE_COLS = 'minmax(0,1.1fr) minmax(0,1fr) minmax(0,0.7fr) minmax(0,1fr) 40px';
export function PeopleWindow({ mode = 'auto', w = 460, h = 420, open, states, hasLeave = true }: { mode?: Mode; w?: number; h?: number; open?: number; states?: Record<string, MenuItemState>; hasLeave?: boolean }) {
  const k = mk('hr');
  const cell: CSSProperties = { fontSize: 14, lineHeight: '20px', color: rc('fg-neutral', mode, 'hr'), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
  return (
    <WebWindow mode={mode} w={w} h={h} url="hr.porest.app">
      <div style={{ height: '100%', boxSizing: 'border-box', padding: '22px 28px', background: rc('bg-layer-basement', mode, 'hr') }}>
        <div style={{ fontSize: 20, lineHeight: '28px', fontWeight: 700, color: rc('fg-neutral', mode, 'hr'), paddingBottom: 14 }}>직원</div>
        <div style={{ borderRadius: 12, padding: '4px 12px 4px 20px', background: rc('bg-layer-default', mode, 'hr') }}>
          <div style={{ display: 'grid', gridTemplateColumns: PEOPLE_COLS, gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${rc('stroke-neutral-subtle', mode, 'hr')}` }}>
            {['이름', '부서', '직급', '입사일', ''].map((t, i) => (
              <span key={i} style={{ fontSize: 13, lineHeight: '18px', fontWeight: 500, color: rc('fg-neutral-subtle', mode, 'hr') }}>
                {t}
              </span>
            ))}
          </div>
          {PEOPLE.map((p, i) => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: PEOPLE_COLS, gap: 12, alignItems: 'center', padding: '6px 0', borderBottom: i === PEOPLE.length - 1 ? 'none' : `1px solid ${rc('stroke-neutral-subtle', mode, 'hr')}` }}>
              <span style={{ ...cell, fontWeight: 500 }}>{p.name}</span>
              <span style={cell}>{p.team}</span>
              <span style={cell}>{p.role}</span>
              <span style={{ ...cell, color: rc('fg-neutral-subtle', mode, 'hr') }}>{p.joined}</span>
              <Anchored offset={k.menu.content.offset} trigger={<Kebab label={p.name} mode={mode} brand="hr" />} menu={open === i ? <Menu brand="hr" groups={PERSON_MENU(hasLeave)} mode={mode} states={states} /> : undefined} />
            </div>
          ))}
        </div>
      </div>
    </WebWindow>
  );
}

// ── Desk 메모(폰) ─────────────────────────────────────────
// swiped — 첫 줄을 밀어 트레이를 드러낸 모습(스와이프 지름길)
export function MemoPhone({ mode = 'auto', scale = 0.6, h = 640, overlay, swiped = false, memos = MEMOS, right }: { mode?: Mode; scale?: number; h?: number; overlay?: ReactNode; swiped?: boolean; memos?: Memo[]; right?: ReactNode }) {
  return (
    <Phone title="메모" back={false} mode={mode} scale={scale} h={h} bg="bg-layer-default" overlay={overlay} right={right}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 24px 0' }}>
        {memos.map((m, i) =>
          swiped && i === 0 ? (
            <SwipedRow key={m.title} memo={m} mode={mode} last={i === memos.length - 1} />
          ) : (
            <ListRow key={m.title} title={m.title} sub={m.sub} mode={mode} last={i === memos.length - 1} trailing={<Kebab label={m.title} mode={mode} />} />
          ),
        )}
      </div>
    </Phone>
  );
}

// 스와이프 트레이 — 원형 배지 + 아래 라벨, 위험한 것이 가장 안쪽(왼쪽). 첫 칸 앞 간격 · 칸 사이 · 마지막 칸은 화면 끝에 붙는다
export function SwipeTray({ mode = 'auto', height }: { mode?: Mode; height: number }) {
  const s = swipeLook('desk');
  const shown = [...SWIPE_ACTIONS].reverse();
  const pick = (c: { name?: string; light: string; dark: string }) => (mode === 'auto' ? (c.name ? `var(--p-${c.name})` : c.light) : mode === 'dark' ? c.dark : c.light);
  return (
    <span style={{ display: 'flex', height, flexShrink: 0 }}>
      {shown.map((a, i) => {
        const k = s.kinds[a.kind];
        return (
          <span key={a.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s.gap, width: i === 0 ? s.first : s.rest, boxSizing: 'border-box', paddingLeft: (i === 0 ? s.first : s.rest) - s.badge }}>
            <span style={{ display: 'grid', placeItems: 'center', width: s.badge, height: s.badge, borderRadius: 9999, background: pick(k.badge) }}>
              <MenuIconView name={a.icon} size={s.icon} color={pick(k.icon)} />
            </span>
            <span style={{ fontFamily: s.label.fontFamily, fontSize: s.label.fontSize, lineHeight: s.label.lineHeight, fontWeight: s.label.fontWeight, color: pick(k.label) }}>{a.label}</span>
          </span>
        );
      })}
    </span>
  );
}
export const trayWidth = () => {
  const s = swipeLook('desk');
  return s.first + s.rest * (SWIPE_ACTIONS.length - 1);
};
// 밀린 줄 — 줄(⋮ 포함)이 트레이 폭만큼 왼쪽으로 가고, 뒤에서 트레이가 드러난다. 트레이는 화면 끝까지
// 줄 높이 — ListRow 의 위아래 10 + 제목 20 + 사이 2 + 부제 18(⋮ 40 + 위아래 10 과 같다). 트레이는 줄 높이를 따른다(최소 rowMin)
const ROW_H = 10 + 20 + 2 + 18 + 10;
function SwipedRow({ memo, mode, last }: { memo: Memo; mode: Mode; last: boolean }) {
  const tw = trayWidth();
  const h = Math.max(swipeLook('desk').rowMin, ROW_H);
  return (
    <div style={{ position: 'relative', margin: '0 -24px', overflow: 'hidden', height: h, borderBottom: last ? 'none' : `1px solid ${rc('stroke-neutral-subtle', mode)}` }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, display: 'flex', alignItems: 'center' }}>
        <SwipeTray mode={mode} height={h} />
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: -tw, width: '100%', boxSizing: 'border-box', padding: '0 24px', display: 'flex', alignItems: 'center', background: rc('bg-layer-default', mode) }}>
        <div style={{ flex: '1 1 0%', minWidth: 0 }}>
          <ListRow title={memo.title} sub={memo.sub} mode={mode} last trailing={<Kebab label={memo.title} mode={mode} />} />
        </div>
      </div>
    </div>
  );
}

// ── 폰의 시트 ─────────────────────────────────────────────
export function SheetOn({ mode = 'auto', children, brand = 'desk' }: { mode?: Mode; children: ReactNode; brand?: Brand }) {
  return (
    <DimView dim={mk(brand).sheet.dim} mode={mode} place="end">
      {children}
    </DimView>
  );
}
export function Sheet({ mode = 'auto', brand = 'desk', groups = MEMO_MENU, ...rest }: Partial<Omit<MenuSheetSurfaceProps, 'look' | 'mode'>> & { mode?: Mode; brand?: Brand }) {
  return <MenuSheetSurface look={mk(brand).sheet} mode={mode} groups={groups} safe={PHONE_SAFE} {...rest} />;
}
// 시트만 — 폰 아래쪽을 잘라 그린다(딤 조금 · 시트)
export function SheetCrop({ children, w = 360, mode = 'auto', top = 36 }: { children: ReactNode; w?: number; mode?: Mode; top?: number }) {
  return (
    <div className="relative flex flex-col justify-end overflow-hidden" style={{ width: w, maxWidth: '100%', paddingTop: top, borderRadius: '0 0 28px 28px', background: rc('bg-layer-default', mode), border: `8px solid ${mode === 'auto' ? 'var(--p-frame)' : mode === 'dark' ? '#3A3F4C' : '#1A1F2E'}`, borderTop: 0, boxSizing: 'border-box' }}>
      <DimView dim={mk().sheet.dim} mode={mode} place="end" style={{ position: 'absolute' }} />
      <div className="relative">{children}</div>
    </div>
  );
}

// ── 1280 에서 — 같은 목록, Menu ↔ Menu Sheet ─────────────────
export function DesktopMemoMenu({ mode = 'auto', scale = 0.62 }: { mode?: Mode; scale?: number }) {
  return (
    <Scaled w={400} h={380} s={scale}>
      <MemoWindow mode={mode} open={0} />
    </Scaled>
  );
}
export function PhoneMemoSheet({ mode = 'auto', scale = 0.62 }: { mode?: Mode; scale?: number }) {
  return (
    <MemoPhone
      mode={mode}
      scale={scale}
      overlay={
        <SheetOn mode={mode}>
          <Sheet mode={mode} title="주간 회의 메모" />
        </SheetOn>
      }
    />
  );
}


// 회색 바탕 판 — 떠 있는 표면(메뉴 · 말풍선)을 페이지 바탕 위에
export function Board({ children, mode = 'auto', brand = 'desk', pad = 20, style, className = '' }: { children: ReactNode; mode?: Mode; brand?: Brand; pad?: number; style?: CSSProperties; className?: string }) {
  return (
    <div className={`rounded-xl ${className}`} style={{ padding: pad, background: rc('bg-layer-basement', mode, brand), ...style }}>
      {children}
    </div>
  );
}
// 그림 칸 아래 이름(라이트 · 다크)
export const modeName = (m: Mode) => (m === 'dark' ? '다크' : m === 'light' ? '라이트' : '');
