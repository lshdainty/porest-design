// Layout 페이지 — 치수는 DESIGN.md 의 layout-* · breakpoint-* 표에서만 온다
import type { ReactNode } from 'react';
import { color, proseTokens, px } from '@/lib/design-tokens';
import { Figure, MARK, MARK_LINE } from './ui';

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

export function GridAnatomyFigure() {
  const s = 0.5;
  const margin = lt('layout-margin'), gutter = lt('layout-gutter'), max = lt('layout-max-medium');
  const cols = 12;
  const colW = (max - gutter * (cols - 1)) / cols;
  const W = (max + margin * 2) * s;
  const colFill = 'rgba(29, 111, 203, 0.14)';
  return (
    <Figure caption={`Columns · Gutter ${gutter}px · Margin ${margin}px — medium 밀도(${max}px) 12칸`}>
      <div className="flex flex-col items-center gap-3">
        <div className="relative rounded-md border border-black/10 bg-white" style={{ width: W, height: 180 }}>
          <div className="absolute inset-y-0 left-0" style={{ width: margin * s, background: MARK }} />
          <div className="absolute inset-y-0 right-0" style={{ width: margin * s, background: MARK }} />
          {Array.from({ length: cols }, (_, i) => (
            <div key={i} className="absolute inset-y-3" style={{ left: (margin + i * (colW + gutter)) * s, width: colW * s, background: colFill }} />
          ))}
          {Array.from({ length: cols - 1 }, (_, i) => (
            <div key={`g${i}`} className="absolute inset-y-3" style={{ left: (margin + colW + i * (colW + gutter)) * s, width: gutter * s, background: MARK }} />
          ))}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-white/90 px-2 text-[12px] font-semibold text-[#1D6FCB]">Columns</span>
        </div>
        <div className="relative text-[11px] font-semibold" style={{ width: W, height: 34 }}>
          <span className="absolute top-0 border-l border-[#DB2777]" style={{ left: (margin * s) / 2, height: 10 }} />
          <span className="absolute top-2.5 rounded px-1 text-white" style={{ left: 0, background: MARK_LINE }}>Margin {margin}</span>
          <span className="absolute top-0 border-l border-[#DB2777]" style={{ left: (margin + 6 * colW + 5.5 * gutter) * s, height: 10 }} />
          <span className="absolute top-2.5 -translate-x-1/2 rounded px-1 text-white" style={{ left: (margin + 6 * colW + 5.5 * gutter) * s, background: MARK_LINE }}>Gutter {gutter}</span>
        </div>
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
  const cell = 'absolute flex items-center justify-center text-[12px] font-semibold';
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
