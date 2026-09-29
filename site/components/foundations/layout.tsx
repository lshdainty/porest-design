// Layout 페이지 — 치수는 DESIGN.md 의 layout-* · breakpoint-* 표에서만 온다
import type { ReactNode } from 'react';
import { color, proseTokens, px } from '@/lib/design-tokens';
import { Figure } from './ui';

function lt(name: string) {
  const t = proseTokens('layout-').find((x) => x.name === name);
  if (!t) throw new Error(`${name} 이 DESIGN.md 에 없다`);
  return px(t.value);
}
function bps() {
  return proseTokens('breakpoint-').map((b) => ({ ...b, px: px(b.value), short: b.name.replace('breakpoint-', '') }));
}

const VIEW = 1440; // 그림 속 화면 폭

function Screen({ scale, children, label, sub }: { scale: number; children: ReactNode; label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm" style={{ width: VIEW * scale, height: 900 * scale }}>
        {children}
      </div>
      <b className="text-[14px] text-fd-foreground">{label}</b>
      <span className="whitespace-pre-line text-center text-[12px] leading-4 text-fd-muted-foreground">{sub}</span>
    </div>
  );
}

export function DensityFigure() {
  const s = 0.12;
  const side = lt('layout-sidebar'), margin = lt('layout-margin');
  const low = lt('layout-max-low'), med = lt('layout-max-medium');
  const avail = VIEW - side - margin * 2;
  const brand = color('bg-brand-weak'), line = color('stroke-brand-solid'), rail = color('bg-neutral-weak');
  const col = (w: number) => (
    <div className="absolute" style={{ left: (side + margin) * s, right: margin * s, top: 64 * s, bottom: 40 * s, display: 'flex', justifyContent: 'center' }}>
      <div className="h-full rounded-sm" style={{ width: Math.min(w, avail) * s, background: brand, border: `1px solid ${line}` }} />
    </div>
  );
  const frame = (w: number) => (
    <>
      <div className="absolute inset-y-0 left-0" style={{ width: side * s, background: rail }} />
      <div className="absolute right-0 top-0 border-b border-black/10" style={{ left: side * s, height: 40 * s }} />
      {col(w)}
    </>
  );
  return (
    <Figure caption={`1440px 화면 · 사이드바 ${side}px · 좌우 여백 ${margin}px 에서 밀도별 콘텐츠 폭`}>
      <div className="flex flex-wrap justify-center gap-6">
        <Screen scale={s} label="low" sub={`최대 ${low}px · 가운데\n설정 · 요약`}>{frame(low)}</Screen>
        <Screen scale={s} label="medium (기본)" sub={`768 ~ 1279 는 ${low}px · 1280 이상 ${med}px\n관리 도구 · 목록`}>{frame(med)}</Screen>
        <Screen scale={s} label="high" sub={'제한 없음\n대시보드 · 표 · 캘린더'}>{frame(avail)}</Screen>
      </div>
    </Figure>
  );
}

// 그리드 구조 — SEED 처럼 칸 · 칸 사이 · 여백을 화살표로 가리킨다
const COL = '#D5E3F7', GUT = '#EDF3FB', ARROW = '#1D6FCB';
function Arrow({ x, label, sub }: { x: number; label: string; sub: string }) {
  return (
    <div className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: x }}>
      <span className="block h-0 w-0 border-x-[4px] border-b-[6px] border-x-transparent" style={{ borderBottomColor: ARROW }} />
      <span className="block h-12 w-px" style={{ background: ARROW }} />
      <span className="mt-1 whitespace-nowrap text-[13px] font-medium" style={{ color: ARROW }}>{label}</span>
      <span className="whitespace-nowrap text-[11px] text-fd-muted-foreground">{sub}</span>
    </div>
  );
}

export function GridAnatomyFigure() {
  const s = 0.48;
  const margin = lt('layout-margin'), gutter = lt('layout-gutter'), max = lt('layout-max-medium');
  const cols = 12;
  const colW = (max - gutter * (cols - 1)) / cols;
  const W = (max + margin * 2) * s;
  const colX = (i: number) => (margin + i * (colW + gutter)) * s;
  return (
    <Figure caption={`medium 밀도(${max}px) 12칸 — 칸 사이 ${gutter}px · 좌우 여백 ${margin}px`}>
      <div className="relative" style={{ width: W, height: 260 }}>
        <div className="absolute inset-x-0 top-0 h-[170px]" style={{ background: GUT }} />
        {Array.from({ length: cols }, (_, i) => (
          <div key={i} className="absolute top-0 h-[170px]" style={{ left: colX(i), width: colW * s, background: COL }} />
        ))}
        <div className="absolute inset-x-0" style={{ top: 172 }}>
          <Arrow x={colX(2) + (colW * s) / 2} label="Columns" sub="콘텐츠가 놓이는 칸" />
          <Arrow x={colX(5) + colW * s + (gutter * s) / 2} label="Gutters" sub={`칸 사이 ${gutter}px`} />
          <Arrow x={W - (margin * s) / 2} label="Margins" sub={`좌우 여백 ${margin}px`} />
        </div>
      </div>
    </Figure>
  );
}

// 레이아웃 두 유형 — 관리 화면(Dashboard)과 소개 페이지(Contents)
export function LayoutTypesFigure() {
  const rail = color('bg-neutral-weak'), line = color('stroke-neutral-weak'), fill = color('bg-brand-weak');
  const box = 'absolute rounded-[3px]';
  return (
    <Figure caption="Dashboard Layout 은 두 웹(Desk · HR), Contents Layout 은 porest-home 같은 소개 페이지">
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-[160px] w-[240px] overflow-hidden rounded-lg border border-black/10 bg-white">
            <div className="absolute inset-y-0 left-0 w-[46px]" style={{ background: rail }} />
            <div className="absolute left-[46px] right-0 top-0 h-[18px]" style={{ borderBottom: `1px solid ${line}` }} />
            {[0, 1, 2].map((i) => <div key={i} className={box} style={{ left: 56 + i * 60, top: 28, width: 54, height: 36, background: fill }} />)}
            {[0, 1, 2, 3, 4].map((i) => <div key={`r${i}`} className="absolute left-[56px] right-[10px] h-[10px] rounded-[2px]" style={{ top: 74 + i * 16, background: i ? rail : fill }} />)}
          </div>
          <b className="text-[13px] text-fd-foreground">Dashboard Layout</b>
          <span className="text-[12px] text-fd-muted-foreground">데이터 · 관리 기능이 많은 화면</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-[160px] w-[240px] overflow-hidden rounded-lg border border-black/10 bg-white">
            <div className="absolute inset-x-0 top-0 h-[18px]" style={{ borderBottom: `1px solid ${line}` }} />
            <div className={box} style={{ left: 60, width: 120, top: 32, height: 14, background: fill }} />
            <div className={box} style={{ left: 45, width: 150, top: 54, height: 6, background: rail }} />
            <div className={box} style={{ left: 60, width: 120, top: 64, height: 6, background: rail }} />
            {[0, 1, 2].map((i) => <div key={i} className={box} style={{ left: 45 + i * 52, top: 84, width: 46, height: 56, background: rail }} />)}
          </div>
          <b className="text-[13px] text-fd-foreground">Contents Layout</b>
          <span className="text-[12px] text-fd-muted-foreground">정보를 전하는 소개 · 안내 페이지</span>
        </div>
      </div>
    </Figure>
  );
}

// 콘텐츠 레이아웃 — 1440 화면에서 기본(1040)과 넓게(1280)
export function ContentLayoutFigure() {
  const s = 0.18;
  const def = lt('layout-max-content'), wide = lt('layout-max-content-wide');
  const fill = color('bg-brand-weak'), line = color('stroke-brand-solid');
  const one = (w: number, label: string, sub: string) => (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden rounded-lg border border-black/10 bg-white" style={{ width: 1440 * s, height: 900 * s }}>
        <div className="absolute inset-x-0 top-0 h-[14px] border-b border-black/10" />
        <div className="absolute bottom-3 top-6 flex -translate-x-1/2 gap-[2px]" style={{ left: '50%', width: w * s }}>
          {Array.from({ length: 12 }, (_, i) => <span key={i} className="h-full flex-1 rounded-[1px]" style={{ background: fill }} />)}
        </div>
        <div className="absolute bottom-3 top-6 -translate-x-1/2 rounded-sm" style={{ left: '50%', width: w * s, border: `1px solid ${line}` }} />
      </div>
      <b className="text-[13px] text-fd-foreground">{label}</b>
      <span className="text-[12px] text-fd-muted-foreground">{sub}</span>
    </div>
  );
  return (
    <Figure caption="콘텐츠 레이아웃 — 12칸, 1280 이상에서 가운데">
      <div className="flex flex-wrap justify-center gap-8">
        {one(def, `기본 ${def}px`, '읽기에 몰입하는 페이지')}
        {one(wide, `넓게 ${wide}px`, '검색 결과처럼 넓게 훑는 페이지')}
      </div>
    </Figure>
  );
}

// 칸 차지(span)와 띄우기(offset)
export function ColumnSpanFigure() {
  const gutter = lt('layout-gutter');
  const W = 520, cols = 12, g = gutter * 0.45;
  const colW = (W - g * (cols - 1)) / cols;
  const x = (i: number) => i * (colW + g);
  const w = (n: number) => n * colW + (n - 1) * g;
  const fill = color('bg-brand-solid');
  const rows: [number, number, string][][] = [
    [[2, 8, 'span 8 · offset 2']],
    [[0, 4, 'span 4'], [4, 8, 'span 8']],
    [[0, 6, 'span 6'], [6, 6, 'span 6']],
  ];
  return (
    <Figure caption="span 은 차지하는 칸 수, offset 은 앞에 비워 두는 칸 수">
      <div className="relative" style={{ width: W, height: 3 * 52 + 8 }}>
        {Array.from({ length: cols }, (_, i) => (
          <div key={i} className="absolute inset-y-0 rounded-[2px]" style={{ left: x(i), width: colW, background: COL }} />
        ))}
        {rows.map((row, r) =>
          row.map(([o, n, label]) => (
            <div key={`${r}-${o}`} className="absolute flex items-center justify-center rounded-md text-[12px] font-semibold text-white" style={{ left: x(o), width: w(n), top: 8 + r * 52, height: 40, background: fill }}>
              {label}
            </div>
          )),
        )}
      </div>
    </Figure>
  );
}

export function BreakpointFigure() {
  const list = bps();
  const MAX = 1600, W = 540;
  const x = (v: number) => (v / MAX) * W;
  const segs = [{ short: 'base', from: 0 }, ...list.map((b) => ({ short: b.short, from: b.px }))];
  const tone = ['#E3EEFB', '#CFE1F7', '#B8D2F2', '#9FC2EC', '#84B0E5'];
  return (
    <Figure caption="중단점 — 모바일 우선, 사이드 내비게이션은 md 부터 보인다">
      <div className="flex flex-col gap-2" style={{ width: W }}>
        <div className="relative h-12 overflow-hidden rounded-md">
          {segs.map((sg, i) => {
            const to = segs[i + 1]?.from ?? MAX;
            return (
              <div key={sg.short} className="absolute inset-y-0 flex items-center justify-center text-[12px] font-semibold text-[#0B3B75]" style={{ left: x(sg.from), width: x(to - sg.from), background: tone[i % tone.length] }}>
                {sg.short}
              </div>
            );
          })}
        </div>
        <div className="relative h-5 text-[11px] tabular-nums text-fd-muted-foreground">
          {[0, ...list.map((b) => b.px)].map((v) => (
            <span key={v} className="absolute -translate-x-1/2" style={{ left: x(v) }}>{v}</span>
          ))}
        </div>
      </div>
    </Figure>
  );
}

export function ResponsiveFigure() {
  const brand = color('bg-brand-weak'), line = color('stroke-brand-solid');
  const box = (fluid: boolean, w: number) => (
    <div className="relative h-16 rounded border border-black/10 bg-white" style={{ width: w }}>
      <div className="absolute inset-y-2 rounded-sm" style={{ left: fluid ? 8 : (w - 120) / 2, right: fluid ? 8 : (w - 120) / 2, background: brand, border: `1px solid ${line}` }} />
    </div>
  );
  return (
    <Figure caption="Fluid 는 화면을 따라 늘고, Fixed & Centered 는 최대 폭에서 멈춰 가운데에 선다">
      <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-center text-[13px] text-fd-muted-foreground">
        <b className="text-fd-foreground">Fluid</b>
        <b className="text-fd-foreground">Fixed &amp; Centered</b>
        <div className="flex flex-col items-center gap-2">{box(true, 160)}{box(true, 240)}</div>
        <div className="flex flex-col items-center gap-2">{box(false, 160)}{box(false, 240)}</div>
      </div>
    </Figure>
  );
}

export function RegionsFigure() {
  const side = lt('layout-sidebar'), collapsed = lt('layout-sidebar-collapsed');
  const s = 0.36, W = 1440 * s, H = 520;
  const rail = color('bg-neutral-weak'), fg = color('fg-neutral-muted');
  const cell = 'absolute flex items-center justify-center px-1 text-center text-[12px] font-semibold leading-tight';
  return (
    <Figure caption={`영역 넷 — 사이드 내비게이션 ${side}px(접으면 ${collapsed}px), 상단 바 높이는 앱마다 다르다`}>
      <div className="relative overflow-hidden rounded-lg border border-black/10 bg-white" style={{ width: W, height: H * s + 60, color: fg }}>
        <div className={cell} style={{ left: 0, right: 0, top: 0, height: 36, borderBottom: '1px solid rgba(0,0,0,.08)' }}>Header (GNB)</div>
        <div className={cell} style={{ left: 0, top: 36, bottom: 0, width: side * s, background: rail }}>Side Navigation</div>
        <div className={cell} style={{ left: side * s, right: 150, top: 36, bottom: 0 }}>Main Content</div>
        <div className={cell} style={{ right: 0, width: 150, top: 36, bottom: 0, borderLeft: '1px dashed rgba(0,0,0,.25)', background: 'rgba(0,0,0,.02)' }}>Aside</div>
      </div>
    </Figure>
  );
}
