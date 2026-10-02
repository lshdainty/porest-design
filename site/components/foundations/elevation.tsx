// Elevation 페이지 — 층 색은 역할 색(bg-layer-*), 그림자 · 딤은 DESIGN.md 의 prose 토큰, 층 이름은 "쌓임 맥락" 표에서 온다
import type { CSSProperties, ReactNode } from 'react';
import { color, proseValue, roleAliases, roleColors, sectionTable, type Brand } from '@/lib/design-tokens';
import { Figure, Swatch, Table, Token } from './ui';

type Mode = 'light' | 'dark';
const rc = (name: string, mode: Mode = 'light', brand: Brand = 'desk') => (name === 'static-white' ? color(name, brand) : color(mode === 'dark' ? `${name}-dark` : name, brand));
const shadow = (n: 1 | 2 | 3 | 4, mode: Mode = 'light') => proseValue(`shadow-s${n}${mode === 'dark' ? '-dark' : ''}`);
const dim = (mode: Mode = 'light') => proseValue(mode === 'dark' ? 'overlay-dim-dark' : 'overlay-dim-light');

// "쌓임 맥락 — Global · Local" 의 두 표 — 층 번호 · 무엇 · porest
function levels(n: 0 | 1) {
  return sectionTable('쌓임 맥락', n).rows.map((r) => ({ level: r[0], what: r[1], token: r[2].replace(/`/g, '') }));
}
const head = (what: string) => what.split(' — ')[0];

function Cap({ children }: { children: ReactNode }) {
  return <span className="text-center text-[12px] leading-4 text-[#62697A]">{children}</span>;
}

// ── 휴대폰 틀과 화면 조각 ─────────────────────────────────
const PW = 116, PH = 210;
function Phone({ children, mode = 'light', w = PW, h = PH }: { children: ReactNode; mode?: Mode; w?: number; h?: number }) {
  return (
    <div className="relative shrink-0 overflow-hidden rounded-[16px] border border-black/10" style={{ width: w, height: h, background: rc('bg-layer-basement', mode) }}>
      {children}
    </div>
  );
}
const HL: CSSProperties = { outline: `2px solid ${color('stroke-brand-solid')}`, outlineOffset: 1 };
function Nav({ mode = 'light', style }: { mode?: Mode; style?: CSSProperties }) {
  return (
    <div className="absolute inset-x-0 top-0 flex h-7 items-center px-2.5" style={{ background: rc('bg-layer-default', mode), ...style }}>
      <span className="block h-1.5 w-10 rounded" style={{ background: rc('fg-neutral', mode) }} />
    </div>
  );
}
function Cards({ mode = 'light', faded = false, style, top = 36 }: { mode?: Mode; faded?: boolean; style?: CSSProperties; top?: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute left-2 right-2 rounded-lg p-2" style={{ top: top + i * 50, height: 42, background: rc('bg-layer-default', mode), opacity: faded ? 0.35 : 1, ...style }}>
          <span className="block h-1.5 w-12 rounded" style={{ background: rc('fg-neutral-muted', mode) }} />
          <span className="mt-1.5 block h-1.5 w-8 rounded" style={{ background: rc('stroke-neutral-weak', mode) }} />
        </div>
      ))}
    </>
  );
}
function Sheet({ mode = 'light', style, children, h = 92 }: { mode?: Mode; style?: CSSProperties; children?: ReactNode; h?: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 rounded-t-xl px-2.5 pt-2" style={{ height: h, background: rc('bg-layer-floating', mode), ...style }}>
      <span className="mx-auto block h-1 w-6 rounded-full" style={{ background: rc('stroke-neutral-weak', mode) }} />
      {children ?? [0, 1, 2].map((i) => <span key={i} className="mt-2.5 block h-1.5 rounded" style={{ width: 70 - i * 14, background: rc('fg-neutral-muted', mode) }} />)}
    </div>
  );
}
function Dialog({ mode = 'light', style }: { mode?: Mode; style?: CSSProperties }) {
  return (
    <div className="absolute left-3 right-3 top-[62px] rounded-xl p-2.5" style={{ background: rc('bg-layer-floating', mode), boxShadow: shadow(4, mode), ...style }}>
      <span className="block h-1.5 w-14 rounded" style={{ background: rc('fg-neutral', mode) }} />
      <span className="mt-1.5 block h-1.5 w-16 rounded" style={{ background: rc('stroke-neutral-weak', mode) }} />
      <div className="mt-3 flex gap-1.5">
        <span className="block h-4 flex-1 rounded" style={{ background: rc('bg-neutral-weak', mode) }} />
        <span className="block h-4 flex-1 rounded" style={{ background: rc('bg-critical-solid', mode) }} />
      </div>
    </div>
  );
}
function Dim({ mode = 'light' }: { mode?: Mode }) {
  return <span className="absolute inset-0" style={{ background: dim(mode) }} />;
}

// ── 원칙 — 층이 쌓인 단면 ─────────────────────────────────
export function ElevationHeroFigure() {
  const g = levels(0);
  const surf = ['bg-layer-basement', 'bg-layer-default', 'bg-layer-floating', 'bg-layer-floating'];
  return (
    <Figure caption="층이 높을수록 사용자 쪽으로 가깝다 — 위의 층이 아래 층을 덮는다">
      <div className="relative h-[250px] w-[520px] rounded-xl bg-white">
        {g.map((l, i) => (
          <div
            key={l.level}
            className="absolute flex h-[52px] w-[300px] items-center justify-between rounded-xl border border-black/5 px-4"
            style={{ left: 24 + i * 52, bottom: 20 + i * 48, background: rc(surf[i]), boxShadow: i ? shadow(Math.min(i + 1, 4) as 1 | 2 | 3 | 4) : undefined }}
          >
            <b className="text-[13px] text-[#1A1F2E]">{l.level} · {head(l.what)}</b>
            <code className="text-[11px] text-[#62697A]">{l.token}</code>
          </div>
        ))}
      </div>
    </Figure>
  );
}

// ── Global 층 넷 ─────────────────────────────────────────
export function GlobalLevelsFigure() {
  const g = levels(0);
  const screens: ReactNode[] = [
    <Phone key="0"><Nav style={{ opacity: 0.35 }} /><Cards faded /><span className="absolute inset-1 rounded-[13px]" style={HL} /></Phone>,
    <Phone key="1"><Nav style={HL} /><Cards style={HL} /></Phone>,
    <Phone key="2"><Nav /><Cards /><Dim /><Sheet style={HL} /></Phone>,
    <Phone key="3"><Nav /><Cards /><Dim /><Sheet /><Dim /><Dialog style={HL} /></Phone>,
  ];
  return (
    <Figure caption="Global 층 — 화면 전체의 구조. 파란 테두리가 그 층이다">
      <div className="flex gap-4">
        {g.map((l, i) => (
          <div key={l.level} className="flex w-[124px] flex-col items-center gap-2">
            {screens[i]}
            <b className="text-[13px] text-fd-foreground">{l.level} · {head(l.what).split(' · ')[0]}</b>
            <code className="text-[11px] text-fd-muted-foreground">{l.token}</code>
          </div>
        ))}
      </div>
    </Figure>
  );
}

export function PageOverPageFigure() {
  const menu = (
    <div className="absolute right-3 top-[112px] w-[84px] rounded-lg py-1" style={{ background: rc('bg-layer-floating'), boxShadow: shadow(2), ...HL }}>
      {['수정', '복사', '삭제'].map((t) => (
        <div key={t} className="px-2 py-1 text-[9px]" style={{ color: rc('fg-neutral') }}>{t}</div>
      ))}
    </div>
  );
  return (
    <Figure caption="시트가 덮이면 시트가 새 바닥이 된다 — 그 안에서 연 메뉴는 시트 위에 쌓인다">
      <div className="flex items-center gap-6">
        <Phone w={150} h={270}>
          <Nav />
          <Cards />
          <Dim />
          <Sheet h={170}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="mt-2 flex items-center justify-between rounded-md px-1.5 py-1" style={{ background: i === 1 ? rc('bg-layer-floating-pressed') : undefined }}>
                <span className="block h-1.5 w-14 rounded" style={{ background: rc('fg-neutral-muted') }} />
                <span className="text-[9px] leading-none" style={{ color: rc('fg-neutral-subtle') }}>⋯</span>
              </div>
            ))}
          </Sheet>
          {menu}
        </Phone>
        <ol className="flex flex-col gap-2 text-[12px] leading-5 text-[#1A1F2E]">
          <li><b>페이지</b> — Global 1</li>
          <li><b>시트</b> — Global 2 · 새 쌓임 맥락</li>
          <li><b>시트 안의 메뉴</b> — 시트를 바닥으로 한 Local</li>
        </ol>
      </div>
    </Figure>
  );
}

// ── Local 층 셋 ──────────────────────────────────────────
export function LocalLevelsFigure() {
  const l = levels(1);
  const tabs = (style?: CSSProperties) => (
    <div className="absolute inset-x-0 top-7 flex h-6 items-end gap-3 px-2.5" style={{ background: rc('bg-layer-default'), borderBottom: `1px solid ${rc('stroke-neutral-weak')}`, ...style }}>
      {[0, 1, 2].map((i) => <span key={i} className="mb-1.5 block h-1.5 w-6 rounded" style={{ background: i ? rc('stroke-neutral-weak') : rc('fg-neutral') }} />)}
    </div>
  );
  const fab = (style?: CSSProperties) => (
    <span className="absolute bottom-4 right-3 flex h-9 w-9 items-center justify-center rounded-full text-[16px]" style={{ background: rc('bg-brand-solid'), color: rc('static-white'), boxShadow: shadow(2), ...style }}>＋</span>
  );
  // 스낵바 — 그림자 없이 면 색으로 뜬다(snackbar.yaml root.shadow none · 아래 "고도를 드러내는 세 가지" 의 표면 색)
  const toast = (style?: CSSProperties) => (
    <div className="absolute inset-x-2.5 bottom-3 flex h-8 items-center rounded-lg px-2.5" style={{ background: rc('bg-neutral-inverted'), ...style }}>
      <span className="block h-1.5 w-16 rounded" style={{ background: rc('fg-neutral-inverted') }} />
    </div>
  );
  const screens = [
    <Phone key="1"><Nav />{tabs(HL)}<Cards top={62} style={HL} />{fab({ opacity: 0.35 })}</Phone>,
    <Phone key="2"><Nav />{tabs()}<Cards top={62} />{fab(HL)}</Phone>,
    <Phone key="3"><Nav />{tabs()}<Cards top={62} />{toast(HL)}</Phone>,
  ];
  return (
    <Figure caption="Local 층 — 한 층 안에서 콘텐츠끼리의 깊이">
      <div className="flex gap-5">
        {l.map((x, i) => (
          <div key={x.level} className="flex w-[150px] flex-col items-center gap-2">
            {screens[i]}
            <b className="text-center text-[13px] text-fd-foreground">{x.level} · {head(x.what)}</b>
            <span className="text-center text-[11px] leading-4 text-fd-muted-foreground">{x.what.split(' — ')[1] ?? ''} · {x.token}</span>
          </div>
        ))}
      </div>
    </Figure>
  );
}

export function SameLevelFigure() {
  const scrolled = (nav: CSSProperties) => (
    <Phone>
      <Cards top={14} />
      <div className="absolute inset-x-0 top-0 flex h-7 items-center px-2.5" style={{ background: rc('bg-layer-default'), ...nav }}>
        <span className="block h-1.5 w-10 rounded" style={{ background: rc('fg-neutral') }} />
      </div>
    </Phone>
  );
  return (
    <Figure caption="목록이 상단 내비게이션 아래로 스크롤될 때 — 층은 그대로 두고 그림자(왼쪽)나 선(오른쪽)으로 구분한다">
      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-2">{scrolled({ boxShadow: shadow(1) })}<Cap>그림자 <code>shadow-s1</code></Cap></div>
        <div className="flex flex-col items-center gap-2">{scrolled({ borderBottom: `1px solid ${rc('stroke-neutral-weak')}` })}<Cap>선 <code>stroke-neutral-weak</code></Cap></div>
      </div>
    </Figure>
  );
}

// ── 고도를 드러내는 세 가지 ───────────────────────────────
export function ThreeWaysFigure() {
  const card = 'flex w-[168px] flex-col items-center gap-3 rounded-xl bg-white px-3 pb-4 pt-5';
  const stage = 'relative h-[96px] w-[140px] overflow-hidden rounded-lg';
  return (
    <Figure caption="표면 색 · 그림자 · 선 — 가운데 것은 다크에서 잘 안 보여 꼭 필요한 곳에만 쓴다">
      <div className="flex gap-3">
        <div className={card}>
          <div className={stage} style={{ background: rc('bg-layer-basement') }}>
            <div className="absolute inset-x-2 bottom-2 flex h-8 items-center rounded-lg px-2.5" style={{ background: rc('bg-neutral-inverted') }}>
              <span className="block h-1.5 w-16 rounded" style={{ background: rc('fg-neutral-inverted') }} />
            </div>
          </div>
          <b className="text-[13px] text-[#1A1F2E]">표면 색</b>
          <Cap>배경의 밝기 · 색을 바꾼다 — 토스트</Cap>
        </div>
        <div className={card}>
          <div className={stage} style={{ background: rc('bg-layer-basement') }}>
            <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-[18px]" style={{ background: rc('bg-layer-floating'), color: rc('fg-neutral'), boxShadow: shadow(2) }}>＋</span>
          </div>
          <b className="text-[13px] text-[#1A1F2E]">그림자</b>
          <Cap>떠 있는 높이를 그림자로 — 플로팅 버튼</Cap>
        </div>
        <div className={card}>
          <div className={stage} style={{ background: rc('bg-layer-basement') }}>
            <div className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-around" style={{ background: rc('bg-layer-default'), borderTop: `1px solid ${rc('stroke-neutral-weak')}` }}>
              {[0, 1, 2, 3].map((i) => <span key={i} className="block h-3 w-3 rounded" style={{ background: i ? rc('stroke-neutral-weak') : rc('fg-neutral') }} />)}
            </div>
          </div>
          <b className="text-[13px] text-[#1A1F2E]">선</b>
          <Cap>가장자리에 테두리를 둔다 — 하단 탭바</Cap>
        </div>
      </div>
    </Figure>
  );
}

export function ShadowFigure() {
  return (
    <Figure caption="그림자 4단계 — 다크는 더 짙은 검정과 위쪽 1px 빛으로 같은 높이를 낸다">
      <div className="flex gap-4">
        {(['light', 'dark'] as Mode[]).map((m) => (
          <div key={m} className="flex w-[264px] flex-col gap-3 rounded-2xl p-5" style={{ background: rc('bg-layer-basement', m) }}>
            <span className="text-[12px] font-semibold" style={{ color: rc('fg-neutral', m) }}>{m === 'light' ? '라이트' : '다크'}</span>
            <div className="grid grid-cols-2 gap-5">
              {([1, 2, 3, 4] as const).map((n) => (
                <div key={n} className="flex h-[72px] flex-col justify-end rounded-xl p-2.5" style={{ background: rc(m === 'dark' ? 'bg-layer-floating' : 'bg-layer-default', m), boxShadow: shadow(n, m) }}>
                  <code className="text-[11px]" style={{ color: rc('fg-neutral-muted', m) }}>shadow-s{n}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}

export function LayerTokenTable() {
  const alias = roleAliases();
  const rows = roleColors('desk').filter((r) => r.name.startsWith('bg-layer-'));
  return (
    <Table head={['토큰', '라이트', '다크', '옛 이름']} minWidth={560}>
      {rows.map((r) => (
        <tr key={r.name}>
          <td><Token>{r.name}</Token></td>
          <td><Swatch hex={r.light} /></td>
          <td><Swatch hex={r.dark} /></td>
          <td className="text-fd-muted-foreground">{alias.get(r.name)?.old ?? '—'}</td>
        </tr>
      ))}
    </Table>
  );
}

export function BasementVsWeakFigure() {
  const cell = (m: Mode, which: 'basement' | 'weak') => (
    <div className="flex flex-col gap-1.5">
      <div className="relative h-[92px] w-[220px] overflow-hidden rounded-xl" style={{ background: rc(which === 'basement' ? 'bg-layer-basement' : 'bg-layer-default', m), border: `1px solid ${rc('stroke-neutral-weak', m)}` }}>
        {which === 'basement' ? (
          <div className="absolute inset-x-3 top-3 h-12 rounded-lg" style={{ background: rc('bg-layer-default', m) }} />
        ) : (
          <div className="absolute inset-x-3 top-3 flex h-10 items-center rounded-lg px-3" style={{ background: rc('bg-neutral-weak', m) }}>
            <span className="block h-1.5 w-20 rounded" style={{ background: rc('fg-neutral-subtle', m) }} />
          </div>
        )}
      </div>
      <code className="text-[11px]" style={{ color: rc('fg-neutral-subtle', m) }}>
        {which === 'basement' ? 'bg-layer-basement — 바닥' : 'bg-neutral-weak — 카드 안 채움'}
      </code>
    </div>
  );
  return (
    <Figure caption="라이트에서는 둘이 비슷하다. 다크에서 basement 는 가장 어두운 바닥이고, neutral-weak 는 카드보다 밝다">
      <div className="flex gap-4">
        {(['light', 'dark'] as Mode[]).map((m) => (
          <div key={m} className="flex flex-col gap-3 rounded-2xl p-4" style={{ background: m === 'dark' ? rc('bg-layer-default', 'dark') : '#FFFFFF' }}>
            <span className="text-[12px] font-semibold" style={{ color: rc('fg-neutral', m) }}>{m === 'light' ? '라이트' : '다크'}</span>
            {cell(m, 'basement')}
            {cell(m, 'weak')}
          </div>
        ))}
      </div>
    </Figure>
  );
}
