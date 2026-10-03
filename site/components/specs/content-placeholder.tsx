// Content Placeholder 페이지의 그림 — specs/components/content-placeholder.md 의 `[그림: …](../../site/components/specs/content-placeholder.tsx#<id>)` 자리.
// 면 · 그림 색 · 그림 크기(틀 높이의 50% · 16 ~ 160) · 선 굵기는 content-placeholder.yaml 을 푼 값(loadingKit().placeholder)으로,
// 불러오는 동안의 스켈레톤은 skeleton.yaml 로 그린다. 화면 틀(폰 · 카드 제목)의 글자 크기는 그림 안에서 정한다.
import type { CSSProperties, ReactNode } from 'react';
import { ImageOff } from 'lucide-react';
import { contrast } from '@/lib/design-tokens';
import { Figure, Panel, MARK, MARK_LINE } from '../foundations/ui';
import { Verdict, rc, type Mode } from './kit';
import { PlaceholderCardDemo } from './loading-demos';
import { CP_GLYPHS, glyphSize, type CpGlyph } from './loading-look';
import { PlaceholderPlayground } from './loading-playground';
import { Bone, CardBox, L, LdPhone, Placeholder, SCREEN, type Fig } from './loading-screens';
import { Legend, Note, Pin } from './overlay-screens';

const cp = () => L().placeholder;
const Pair = ({ children, wide = false }: { children: ReactNode; wide?: boolean }) => <div className={`flex w-full flex-col gap-4 ${wide ? 'max-w-[900px] lg:flex-row' : 'max-w-[760px] md:flex-row'}`}>{children}</div>;
const BASEMENT = 'var(--p-bg-layer-basement)';
const CARD_RATIO = 1.586;
const pin = (n: string, style: CSSProperties) => (
  <span aria-hidden className="pointer-events-none absolute" style={{ zIndex: 6, ...style }}>
    <Pin n={n} />
  </span>
);
// 틀 — 크기 · 비율 · 모서리는 틀이 정한다(대체 그림은 제 모서리가 없다)
function Frame({ w, h, r = L().skeleton.radius['8'], children, style }: { w: number; h: number; r?: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="relative shrink-0 overflow-hidden" style={{ width: w, height: h, borderRadius: r, ...style }}>
      {children}
    </div>
  );
}
// 카드 그림 · 혜택 그림(불러온 그림) — 그림 장식
const CardArt = ({ hue = '#2F3A57' }: { hue?: string }) => <span aria-hidden className="block h-full w-full" style={{ background: `linear-gradient(135deg, ${hue} 0%, #4D5B82 55%, #7F8DB8 100%)` }} />;
const GiftArt = () => <span aria-hidden className="block h-full w-full" style={{ background: 'linear-gradient(150deg, #F4B860 0%, #E5793B 100%)' }} />;

// ── Overview ──────────────────────────────────────────────
function CardList({ mode }: { mode: Mode }) {
  const w = 96;
  const h = Math.round(w / CARD_RATIO);
  const rows: [string, string, 'none' | 'ok'][] = [
    ['현대카드 M', '10월 352,400원', 'none'],
    ['신한카드 Deep', '10월 128,000원', 'ok'],
    ['국민 체크카드', '10월 64,500원', 'none'],
  ];
  return (
    <div className="px-4 pt-1">
      <CardBox mode={mode} title="카드">
        {rows.map(([name, sub, img]) => (
          <div key={name} className="flex items-center gap-4" style={{ padding: '12px 24px' }}>
            <Frame w={w} h={h}>{img === 'ok' ? <CardArt /> : <Placeholder mode={mode} icon="credit-card" label={`${name} 카드 그림`} w={w} h={h} />}</Frame>
            <span className="flex flex-col gap-0.5">
              <span className="text-[16px] font-medium" style={{ color: rc('fg-neutral', mode) }}>
                {name}
              </span>
              <span className="text-[13px]" style={{ color: rc('fg-neutral-subtle', mode) }}>
                {sub}
              </span>
            </span>
          </div>
        ))}
      </CardBox>
    </div>
  );
}
function BenefitList({ mode }: { mode: Mode }) {
  const s = 64;
  const rows: [string, string, 'none' | 'ok'][] = [
    ['커피 30% 할인', '스타벅스 · 하루 한 번', 'none'],
    ['영화 4,000원 할인', 'CGV · 한 달 두 번', 'ok'],
    ['편의점 10% 할인', 'GS25 · CU', 'none'],
  ];
  return (
    <div className="px-4 pt-1">
      <CardBox mode={mode} title="받을 수 있는 혜택">
        {rows.map(([name, sub, img]) => (
          <div key={name} className="flex items-center gap-4" style={{ padding: '12px 24px' }}>
            <Frame w={s} h={s} r={L().skeleton.radius['16']}>{img === 'ok' ? <GiftArt /> : <Placeholder mode={mode} label={`${name} 그림`} w={s} h={s} />}</Frame>
            <span className="flex flex-col gap-0.5">
              <span className="text-[16px] font-medium" style={{ color: rc('fg-neutral', mode) }}>
                {name}
              </span>
              <span className="text-[13px]" style={{ color: rc('fg-neutral-subtle', mode) }}>
                {sub}
              </span>
            </span>
          </div>
        ))}
      </CardBox>
    </div>
  );
}
function Attachment({ mode }: { mode: Mode }) {
  const w = 344;
  const h = Math.round((w * 3) / 4);
  const keys: [string, string][] = [
    ['금액', '-12,000원'],
    ['카테고리', '식비'],
    ['결제 수단', '현대카드 M'],
  ];
  return (
    <div className="flex flex-col" style={{ background: rc('bg-layer-default', mode) }}>
      <Frame w={w} h={h} r={0}>
        <Placeholder mode={mode} icon="receipt" label="점심 식사 영수증 사진" w={w} h={h} />
      </Frame>
      <div style={{ padding: '8px 0' }}>
        {keys.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between" style={{ padding: '12px 24px' }}>
            <span className="text-[14px]" style={{ color: rc('fg-neutral-subtle', mode) }}>
              {k}
            </span>
            <span className="text-[14px] font-medium" style={{ color: rc('fg-neutral', mode) }}>
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
const Hero: Fig = ({ caption }) => (
  <Figure caption={caption}>
    <div className="flex flex-col gap-4">
      {(['light', 'dark'] as const).map((mode) => (
        <div key={mode} className="flex items-start gap-4">
          <LdPhone mode={mode} title="자산" scale={0.52}>
            <CardList mode={mode} />
          </LdPhone>
          <LdPhone mode={mode} title="카드 혜택" back tabs={false} scale={0.52}>
            <BenefitList mode={mode} />
          </LdPhone>
          <LdPhone mode={mode} title="거래 상세" back tabs={false} scale={0.52} bg="bg-layer-default">
            <Attachment mode={mode} />
          </LdPhone>
        </div>
      ))}
    </div>
  </Figure>
);

const Playground: Fig = () => <PlaceholderPlayground kit={L()} screen={SCREEN()} />;

// ── Anatomy ───────────────────────────────────────────────
const Anatomy: Fig = ({ caption }) => {
  const w = 280;
  const h = 210;
  const g = glyphSize(cp().glyph, w, h);
  return (
    <Figure caption={caption}>
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-2xl p-10 pk-surface">
          <div className="relative">
            <Frame w={w} h={h} style={{ outline: `1px dashed ${MARK_LINE}`, outlineOffset: 3 }}>
              <Placeholder icon="receipt" label="영수증 사진" w={w} h={h} />
            </Frame>
            <span aria-hidden className="absolute" style={{ left: (w - g) / 2, top: (h - g) / 2, width: g, height: g, outline: `1px dashed ${MARK_LINE}`, background: MARK }} />
            {pin('ⓐ', { left: -16, top: -16 })}
            {pin('ⓑ', { left: (w + g) / 2 + 6, top: (h - g) / 2 - 10 })}
          </div>
        </div>
        <Legend
          items={[
            ['ⓐ', 'Root — 틀을 채운 면, 모서리는 틀이 자른다'],
            ['ⓑ', `Glyph — 가운데 정사각, 틀 높이의 ${cp().glyph.ratio * 100}%`],
          ]}
        />
      </div>
    </Figure>
  );
};

// ── Properties ────────────────────────────────────────────
// 크기 — 그림은 틀 높이의 50%(16 ~ 160), 틀 폭이 좁으면 폭
const SIZES: [string, number, number, number, string][] = [
  ['40 썸네일', 40, 40, 1, ''],
  ['카드 그림 120', Math.round(120 * CARD_RATIO), 120, 1, ''],
  ['화면 폭 4:3 사진', 360, 270, 0.6, '(60% 로 줄여 그렸다)'],
  ['좁고 긴 틀', 48, 200, 1, '— 폭이 좁아 폭에 맞춘다'],
];
const Sizes: Fig = ({ caption }) => {
  const g = cp().glyph;
  return (
    <Figure caption={caption}>
      <div className="grid grid-cols-2 items-end gap-x-6 gap-y-8 rounded-2xl px-8 py-8 pk-surface">
        {SIZES.map(([t, w, h, s, extra]) => {
          const size = glyphSize(g, w, h);
          return (
            <div key={t} className="flex w-[240px] flex-col items-center gap-3">
              <div className="relative" style={{ width: w * s, height: h * s }}>
                <div style={{ width: w, height: h, transform: s === 1 ? undefined : `scale(${s})`, transformOrigin: 'top left' }}>
                  <Frame w={w} h={h} r={w <= 48 ? L().skeleton.radius['8'] : L().skeleton.radius['16']}>
                    <Placeholder w={w} h={h} />
                  </Frame>
                </div>
                {/* 그림의 한 변 — 줄여 그려도 수는 실제 값 */}
                <span aria-hidden className="absolute" style={{ left: ((w - size) / 2) * s, width: size * s, top: ((h - size) / 2) * s - 6, height: 2, background: MARK_LINE }} />
                <span aria-hidden className="absolute whitespace-nowrap rounded px-1 text-[10px] font-semibold leading-4 text-white" style={{ left: (w / 2) * s, top: ((h - size) / 2) * s - 24, transform: 'translateX(-50%)', background: MARK_LINE }}>
                  {Math.round(size)}
                </span>
              </div>
              <span className="flex flex-col items-center gap-0.5 text-center text-[12px] leading-4 pk-muted">
                <b className="text-[13px] pk-text">{t}</b>
                {w} × {h} → 그림 {Math.round(size)} {extra}
              </span>
            </div>
          );
        })}
      </div>
    </Figure>
  );
};

// 색 — 흰 카드 위 · 다크, 대비는 토큰 값으로 잰다
const Colors: Fig = ({ caption }) => {
  const p = cp();
  const card = (m: 'light' | 'dark') => (m === 'dark' ? SCREEN()['bg-layer-default'].dark : SCREEN()['bg-layer-default'].light);
  const face = (m: 'light' | 'dark') => (m === 'dark' ? p.bg.dark : p.bg.light);
  const glyph = (m: 'light' | 'dark') => (m === 'dark' ? p.glyph.color.dark : p.glyph.color.light);
  return (
    <Figure caption={caption}>
      <div className="flex flex-wrap justify-center gap-4">
        {(['light', 'dark'] as const).map((m) => (
          <div key={m} className="flex flex-col items-center gap-3 rounded-2xl px-8 py-6" style={{ background: rc('bg-layer-default', m) }}>
            <Frame w={200} h={150}>
              <Placeholder mode={m} icon="image" w={200} h={150} />
            </Frame>
            <span className="text-center text-[12px] leading-5 tabular-nums" style={{ color: rc('fg-neutral-subtle', m) }}>
              {m === 'light' ? '라이트' : '다크'} — 면 : 카드 {contrast(face(m), card(m)).toFixed(2)}:1
              <br />
              그림 : 면 {contrast(glyph(m), face(m)).toFixed(2)}:1
            </span>
          </div>
        ))}
      </div>
    </Figure>
  );
};

// 그림 — 사진 · 카드 · 영수증 · 문서(lucide 선 아이콘, 24 격자 기준 선 굵기)
const GLYPH_KO: Record<CpGlyph, string> = { image: '사진(기본)', 'credit-card': '카드 그림', receipt: '영수증 사진', 'file-text': '문서' };
const Glyphs: Fig = ({ caption }) => (
  <Figure caption={caption}>
    <div className="flex flex-col items-center gap-4">
    <div className="flex flex-wrap justify-center gap-4 rounded-2xl px-8 py-7 pk-surface">
      {CP_GLYPHS.map((g) => (
        <div key={g} className="flex flex-col items-center gap-2">
          <Frame w={120} h={120} r={L().skeleton.radius['16']}>
            <Placeholder icon={g} w={120} h={120} />
          </Frame>
          <span className="flex flex-col items-center text-center text-[12px] leading-4 pk-muted">
            <b className="text-[13px] pk-text">{GLYPH_KO[g]}</b>
            <code>{g}</code>
          </span>
        </div>
      ))}
    </div>
    <Note>선 굵기 {cp().glyph.stroke}(24 격자) — 그림이 커지면 같은 비율로 굵어진다</Note>
    </div>
  </Figure>
);

// ── Guidelines ────────────────────────────────────────────
// 불러오는 동안은 Skeleton — 불러오는 중 · 실패를 같은 그림으로
const LoadingGuide: Fig = ({ caption }) => {
  const w = 112;
  const h = Math.round(w / CARD_RATIO);
  const row = (name: string, sub: string, img: ReactNode) => (
    <div className="flex items-center gap-4" style={{ padding: '10px 0' }}>
      <Frame w={w} h={h}>{img}</Frame>
      <span className="flex flex-col gap-0.5">
        <span className="text-[15px] font-medium pk-text">{name}</span>
        <span className="text-[12px] pk-muted">{sub}</span>
      </span>
    </div>
  );
  return (
    <Panel caption={caption}>
      <Pair>
        <Verdict ok note="불러오는 동안은 같은 모서리 · 같은 크기의 스켈레톤, 다 불러왔는데 없거나 실패하면 대체 그림" bg={BASEMENT}>
          <div className="w-[290px] rounded-2xl px-6 py-3 pk-surface">
            {row('현대카드 M', '불러오는 중', <Bone radius="8" width="100%" height="100%" />)}
            {row('국민 체크카드', '불러오지 못함', <Placeholder icon="credit-card" label="국민 체크카드 카드 그림" w={w} h={h} />)}
          </div>
        </Verdict>
        <Verdict ok={false} note="불러오는 중과 실패가 같은 그림 — 기다려야 하는지 알 수 없다" bg={BASEMENT}>
          <div className="w-[290px] rounded-2xl px-6 py-3 pk-surface">
            {row('현대카드 M', '불러오는 중', <Placeholder icon="credit-card" w={w} h={h} />)}
            {row('국민 체크카드', '불러오지 못함', <Placeholder icon="credit-card" w={w} h={h} />)}
          </div>
        </Verdict>
      </Pair>
    </Panel>
  );
};

// 깨진 이미지 · 빈 칸을 두지 않는다 — 대체 그림 · 깨진 이미지 아이콘 · 빈 칸
const BrokenGuide: Fig = ({ caption }) => {
  const w = 120;
  const h = Math.round(w / CARD_RATIO);
  const cell = (child: ReactNode, cap: string) => (
    <div className="flex flex-col items-center gap-2">
      {child}
      <span className="text-center text-[12px] leading-4 pk-muted">{cap}</span>
    </div>
  );
  return (
    <Panel caption={caption}>
      <Pair>
        <Verdict ok note="불러오지 못하면 대체 그림 — 옅은 면 + 무엇이 없는지 말하는 그림" bg={BASEMENT}>
          <div className="rounded-2xl px-6 py-5 pk-surface">
            {cell(
              <Frame w={w} h={h}>
                <Placeholder icon="credit-card" label="현대카드 M 카드 그림" w={w} h={h} />
              </Frame>,
              '대체 그림',
            )}
          </div>
        </Verdict>
        <Verdict ok={false} note="브라우저의 깨진 이미지 아이콘과 대체 글이 그대로 · 투명한 빈 칸 · 다른 곳의 기본 그림(외부 주소)" bg={BASEMENT}>
          <div className="flex gap-4 rounded-2xl px-5 py-5 pk-surface">
            {cell(
              <Frame w={w} h={h} r={0}>
                <span className="flex items-start gap-1 p-1 text-[11px] leading-4" style={{ color: rc('fg-neutral-muted') }}>
                  <ImageOff aria-hidden size={14} strokeWidth={1.5} className="shrink-0" />
                  현대카드 M 카드 그림
                </span>
              </Frame>,
              '깨진 이미지 + 대체 글',
            )}
            {cell(<Frame w={w} h={h} style={{ outline: `1px dashed ${MARK_LINE}`, outlineOffset: -1 }}>{null}</Frame>, '투명한 빈 칸(점선은 그림 표시)')}
          </div>
        </Verdict>
      </Pair>
    </Panel>
  );
};

// ── 코드 미리보기 ─────────────────────────────────────────
const ExBasic: Fig = () => <PlaceholderCardDemo kit={L()} screen={SCREEN()} />;

export const contentPlaceholderFigures: Record<string, Fig> = {
  hero: Hero,
  playground: Playground,
  anatomy: Anatomy,
  sizes: Sizes,
  colors: Colors,
  glyphs: Glyphs,
  'loading-guide': LoadingGuide,
  'broken-guide': BrokenGuide,
  'ex-basic': ExBasic,
};
