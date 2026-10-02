'use client';
// Segmented Control 플레이그라운드 — 칸 수 · 고른 칸 · 알림 점 · 막힌 칸 · 긴 글을 고르면 스펙대로 그린 컨트롤과 그 코드가 바뀐다.
// 실제로 누르고 ← → ↑ ↓ 로 옮길 수 있고, 고르면 아래 목록이 바로 걸러진다. 코드는 segmented-control.md 의 "코드" 절과 같은 API 로 쓴다.
import { useMemo, useState } from 'react';
import { SEG_SETS } from './segmented-control-data';
import { SegContent } from './segmented-control-demos';
import { scv, type SegItem, type SegLook, type ViewMode } from './segmented-control-shared';
import { SegmentedView } from './segmented-control-view';
import { BRANDS, MODES, PlayFrame, Seg } from './select-playground';

const attr = (cond: boolean, s: string) => (cond ? [s] : []);

function codeOf(o: { aria: string; items: SegItem[]; value: string; all: boolean }) {
  const root = [`aria-label="${o.aria}"`, ...attr(o.all, 'disabled'), 'value={view}', 'onValueChange={setView}'];
  return [
    'import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"',
    '',
    `const [view, setView] = useState("${o.value}")`,
    '',
    `<SegmentedControl ${root.join(' ')}>`,
    ...o.items.map((it) => `  <SegmentedControlItem ${[`value="${it.value}"`, ...attr(!!it.notification, 'notification={hasNew}'), ...attr(!!it.disabled, 'disabled')].join(' ')}>${it.label}</SegmentedControlItem>`),
    '</SegmentedControl>',
  ].join('\n');
}

export function SegmentedPlayground({ looks }: { looks: Record<'desk' | 'hr', SegLook> }) {
  const base = looks.desk;
  const counts = Array.from({ length: base.root.max - base.root.min + 1 }, (_, i) => base.root.min + i).filter((n) => SEG_SETS[n]);
  const [count, setCountRaw] = useState(3);
  const [sel, setSel] = useState(0);
  const [noti, setNotiRaw] = useState<'none' | 'one'>('none');
  // 알림 점은 그 칸을 고르면 사라진다 — 다시 켤 때까지
  const [seen, setSeen] = useState(false);
  const [dis, setDis] = useState<'none' | 'one' | 'all'>('none');
  const [long, setLong] = useState<'short' | 'long'>('short');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');
  const look = looks[brand];
  const set = SEG_SETS[count];
  // 알림 점은 둘째 칸, 막힌 칸은 마지막 칸
  const decorate = (withSeen: boolean): SegItem[] =>
    set.items.map((it, i) => ({ ...it, label: long === 'long' ? set.long[i] : it.label, notification: noti === 'one' && i === 1 && !(withSeen && seen), disabled: dis === 'one' && i === set.items.length - 1 }));
  const items = decorate(true);
  const idx = Math.min(sel, items.length - 1);
  const value = items[idx].value;
  const choose = (i: number) => {
    setSel(i);
    if (noti === 'one' && i === 1) setSeen(true);
  };
  const setCount = (n: number) => {
    setCountRaw(n);
    setSel(0);
    setSeen(false);
  };
  const setNoti = (v: 'none' | 'one') => {
    setNotiRaw(v);
    setSeen(false);
  };
  // 코드는 점을 본 뒤에도 notification={hasNew} 를 그대로 보인다(값이 false 가 될 뿐이다)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const code = useMemo(() => codeOf({ aria: set.aria, items: decorate(false), value, all: dis === 'all' }), [set.aria, count, long, noti, value, dis]);
  const surface = scv(look.tone['bg-layer-default'], mode);
  const stage = (
    <div className="-mx-4 sm:mx-0" style={{ paddingLeft: look.gutter, paddingRight: look.gutter, fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}>
      <div className="flex flex-col gap-2">
        <SegmentedView key={JSON.stringify([count, brand, mode])} look={look} mode={mode} items={items} value={value} onValue={(v) => choose(items.findIndex((it) => it.value === v))} disabled={dis === 'all'} ariaLabel={set.aria} />
        <SegContent look={look} mode={mode} set={set} value={value} />
      </div>
    </div>
  );
  return (
    <PlayFrame
      surface={surface}
      code={code}
      stage={stage}
      controls={
        <>
          <Seg label="칸 수" value={String(count)} options={counts.map((n) => [String(n), `${n}개 — ${SEG_SETS[n].items.map((i) => i.label).join(' · ')}`] as const)} onChange={(v) => setCount(Number(v))} />
          <Seg label="고른 칸 value" value={String(idx)} options={set.items.map((it, i) => [String(i), it.label] as const)} onChange={(v) => choose(Number(v))} />
          <div className="flex flex-col gap-1.5">
            <Seg label="알림 점 notification" value={noti} options={[['none', '없음'], ['one', '둘째 칸']] as const} onChange={setNoti} />
            {noti === 'one' && <span className="text-[12px] text-fd-muted-foreground">{seen ? '둘째 칸을 골라서 점이 사라졌다 — 다시 보려면 껐다 켠다.' : '고른 칸에는 점이 없다 — 둘째 칸을 고르면 사라진다.'}</span>}
          </div>
          <Seg label="막힌 칸 disabled" value={dis} options={[['none', '없음'], ['one', '마지막 칸'], ['all', '트랙 전체']] as const} onChange={setDis} />
          <Seg label="글" value={long} options={[['short', '짧게'], ['long', '길게 — 줄이 바뀐다']] as const} onChange={setLong} />
          <div className="flex flex-wrap gap-5">
            <Seg label="모드" value={mode} options={MODES} onChange={setMode} />
            <Seg label="브랜드" value={brand} options={BRANDS} onChange={setBrand} />
          </div>
        </>
      }
    />
  );
}
