'use client';
// 이미지 묶음의 움직이는 미리보기 — 그림이 늦게 오는 순간을 직접 본다(다시 불러오기).
// Logo Tile 카드 자산 줄(첫 글자 먼저 → 그림이 덮는다) · Content Placeholder 의 카드 그림(Image Frame — 스켈레톤 → 그림 · 대체 그림).
// 모양은 image-look · list-look 이 YAML 에서 푼 값만 받는다.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { ListLook } from './list-shared';
import { ListView } from './list-view';
import { dcv, type DColor, type ImageFrameLook, type LogoTileLook, type PicKind, type ViewMode } from './image-shared';
import { ImageFrameView, LogoTileView, type LogoPaint, type LogoState } from './image-view';

const FONT = "'Pretendard Variable', Pretendard, sans-serif";
// 시계 — 다시 불러오기를 누른 뒤 흐른 시간(ms). null 이면 다 끝난 그림
function useRun(end: number) {
  const [t, setT] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const t0 = useRef(0);
  useEffect(() => {
    if (round === 0) return;
    t0.current = performance.now();
    setT(0);
    const id = window.setInterval(() => {
      const e = performance.now() - t0.current;
      setT(e);
      if (e > end) {
        window.clearInterval(id);
        setT(null);
      }
    }, 80);
    return () => window.clearInterval(id);
  }, [round, end]);
  return { t, replay: () => setRound((r) => r + 1) };
}
function Controls({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
      {children}
      {note && <span className="text-[12px] tabular-nums text-fd-muted-foreground">{note}</span>}
    </div>
  );
}
function Btn({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-md border border-fd-border bg-fd-background px-3 py-1 text-[13px] text-fd-foreground hover:bg-fd-accent">
      {children}
    </button>
  );
}

// ── Logo Tile — 카드 자산 줄: 첫 글자 "삼" 먼저, 그림이 오면 카드 전체 ─────────
export function LogoCardDemo({ look, frame, list, paint, name, title, detail, amount, pic, mode = 'auto' }: { look: LogoTileLook; frame: ImageFrameLook; list: ListLook; paint: LogoPaint; name: string; title: string; detail: string; amount: string; pic: PicKind; mode?: ViewMode }) {
  const ARRIVE = 1400;
  const { t, replay } = useRun(ARRIVE + 600);
  const [fail, setFail] = useState(false);
  const state: LogoState = t !== null && t < ARRIVE ? 'initial' : fail ? 'failed' : 'loaded';
  const tile = <LogoTileView look={look} frame={frame} mode={mode} name={name} paint={paint} image="card" pic={pic} state={state} />;
  return (
    <div style={{ fontFamily: FONT }}>
      <ListView look={list} mode={mode} live={false} rows={[{ kind: 'button', prefix: { node: tile }, title, detail, suffix: { amount } }]} />
      <Controls note={state === 'initial' ? '그림을 받는 중 — 첫 글자 타일' : state === 'failed' ? '못 불러옴 — 첫 글자 그대로' : '그림이 왔다 — 판과 카드 그림이 덮었다'}>
        <Btn onClick={() => (setFail(false), replay())}>다시 불러오기</Btn>
        <Btn onClick={() => (setFail(true), replay())}>실패하게 불러오기</Btn>
      </Controls>
    </div>
  );
}

// ── Content Placeholder — 카드 그림이 없을 때 · 못 불러올 때(Image Frame ratio card · 폭 112) ─────────
export type CardRow = { name: string; image: 'none' | 'broken' | 'ok'; pic?: PicKind };
export function FrameCardDemo({ look, rows, sub, mode = 'auto' }: { look: ImageFrameLook; rows: CardRow[]; sub: { title: DColor; detail: DColor; surface: DColor }; mode?: ViewMode }) {
  // 그림 없음은 처음부터 대체 그림, 성공은 1.6초에 오고 실패는 2초에 대체 그림으로(Image Frame — 스켈레톤은 처음부터 깐다)
  const { t, replay } = useRun(2600);
  const state = (c: CardRow) => {
    if (c.image === 'none') return 'fallback' as const;
    if (t !== null && t < (c.image === 'ok' ? 1600 : 2000)) return 'loading' as const;
    return c.image === 'broken' ? ('fallback' as const) : ('loaded' as const);
  };
  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ background: dcv(sub.surface, mode), borderRadius: 20, paddingTop: 8, paddingBottom: 8 }}>
        {rows.map((c) => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24 }}>
            <ImageFrameView look={look} mode={mode} ratio="card" width={112} pic={c.image === 'none' ? null : c.pic} state={state(c)} fallbackIcon="credit-card" alt={`${c.name} 카드 그림`} reveal />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <span style={{ fontSize: 16, lineHeight: '22px', fontWeight: 500, color: dcv(sub.title, mode) }}>{c.name}</span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: dcv(sub.detail, mode) }}>{c.image === 'none' ? '그림 없음' : state(c) === 'loading' ? '불러오는 중' : c.image === 'broken' ? '그림을 불러오지 못함' : '그림을 불러옴'}</span>
            </span>
          </div>
        ))}
      </div>
      <Controls note={t !== null ? `${(t / 1000).toFixed(1)}초` : undefined}>
        <Btn onClick={replay}>다시 불러오기</Btn>
      </Controls>
    </div>
  );
}
