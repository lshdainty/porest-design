// Top Navigation 페이지의 그림 — specs/components/top-navigation.md 의 `[그림: …](../../site/components/specs/top-navigation.tsx#<id>)` 자리.
// 바 · 아이콘 버튼 · 글 버튼 · 알림 점은 top-navigation.yaml 을 푼 값(navKit().top — nav-view 의 TopNavBar)으로,
// 하단 탭 바 · 사이드바 · 옆 패널은 각자의 YAML(nav-look)로, 데스크톱 주 버튼 · 본문 아이콘 버튼은 button.yaml 로 그린다.
// 화면 속 목록 · 카드는 역할 색으로 간단히 그린 대역이다(지어낸 내용).
import type { CSSProperties, ReactNode } from 'react';
import { Figure, Panel as Plate } from '../foundations/ui';
import { buttonLook } from './button-look';
import { ButtonView } from './button-view';
import { Card, Verdict, rc, type Mode } from './kit';
import { TopNavPlayground } from './nav-playground';
import {
  Arrow,
  Band,
  Bar,
  Cap,
  CodePreview,
  DayHead,
  DeskDesktop,
  DeskHeader,
  DeskMain,
  Desktop,
  HOME_ACTIONS,
  HomeScreen,
  HrDrawer,
  HrLeavePhone,
  Legend,
  NK,
  NPhone,
  NoticeScreen,
  PHONE,
  Reading,
  Scaled,
  ScreenTitle,
  Shell,
  Shot,
  Side,
  TxRows,
  Wide,
  markBox,
  markLine,
  modeKo,
  pinAt,
  type Fig,
} from './nav-screens';
import type { TopAction } from './nav-shared';
import { TopIconButton, TopTextButton } from './nav-view';

const T = () => NK().top;
const MODES = ['light', 'dark'] as const;
const Pair = ({ children, stack = false }: { children: ReactNode; stack?: boolean }) => <div className={`flex w-full flex-col gap-4 ${stack ? 'mx-auto max-w-[560px]' : 'max-w-[820px] md:flex-row'}`}>{children}</div>;
// 바 하나를 판 위에 — 폭 360(폰)
function BarBoard({ children, mode = 'auto', w = PHONE, label, style }: { children: ReactNode; mode?: Mode; w?: number; label?: ReactNode; style?: CSSProperties }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-visible" style={{ width: w, background: rc('bg-layer-default', mode), boxShadow: `0 0 0 1px ${rc('stroke-neutral-subtle', mode)}`, ...style }}>
        {children}
      </div>
      {label && <Cap mode={mode}>{label}</Cap>}
    </div>
  );
}
const CARD_ACTIONS: TopAction[] = [
  { icon: 'search', label: '검색' },
  { icon: 'bell', label: '알림, 새 알림 있음', notification: true },
];

// ── Overview ──────────────────────────────────────────────
const Hero: Fig = ({ caption }) => (
  <Figure caption={caption}>
    <div className="flex flex-col gap-5">
      {MODES.map((mode) => (
        <div key={mode} className="flex items-start gap-2">
          <HomeScreen mode={mode} scale={0.38} h={560} />
          <NoticeScreen mode={mode} scale={0.38} h={560} />
          <DeskDesktop mode={mode} s={0.24} h={760} />
        </div>
      ))}
    </div>
  </Figure>
);

const Playground: Fig = () => <TopNavPlayground looks={{ desk: NK('desk').top, hr: NK('hr').top }} tones={{ desk: NK('desk').tone, hr: NK('hr').tone }} />;

// ── Anatomy ───────────────────────────────────────────────
const Anatomy: Fig = ({ caption }) => {
  const t = T();
  const H = t.height;
  const lead = t.padX + t.icon.size;
  const trailW = t.icon.size * CARD_ACTIONS.length;
  const tStart = PHONE - t.padX - trailW;
  return (
    <Figure caption={caption}>
      <div className="flex flex-col items-center gap-5">
        <div className="relative" style={{ width: PHONE, marginTop: 34, marginBottom: 46 }}>
          <Bar
            title="카드 혜택"
            actions={CARD_ACTIONS}
            zone={{ root: markLine, leading: markBox, title: markBox, trailing: markLine }}
            style={{ boxShadow: `0 0 0 1px ${rc('stroke-neutral-subtle')}` }}
          />
          {pinAt('ⓐ', { left: -28, top: H / 2 - 10 })}
          {pinAt('ⓑ', { left: t.padX + t.icon.size / 2 - 10, top: -28 })}
          {pinAt('ⓒ', { left: (lead + tStart) / 2 - 10, top: -28 })}
          {pinAt('ⓓ', { left: tStart + trailW / 2 - 10, top: -28 })}
          {pinAt('ⓔ', { left: tStart + t.icon.size / 2 - 10, top: H + 8 })}
          {pinAt('ⓕ', { left: PHONE - t.padX - (t.icon.size - t.icon.icon) / 2 - t.dot.right - t.dot.size / 2 - 10, top: H + 8 })}
          <Band style={{ left: 0, top: 2, width: t.padX, height: 4 }} label={`${t.padX}`} tag="above" />
          <Band style={{ right: 0, top: 2, width: t.padX, height: 4 }} label={`${t.padX}`} tag="above" />
          <Band style={{ left: 0, top: H + 8, width: t.types.standard.left, height: 4 }} label={`제목 ${t.types.standard.left}`} tag="below" />
          <Band style={{ left: tStart - t.title.gap, top: 6, width: t.title.gap, height: H - 12 }} label={`${t.title.gap}`} tag="below" />
          <Band style={{ right: -22, top: 0, width: 6, height: H }} label={`${H}`} vertical tag="right" />
        </div>
        <Legend
          items={[
            ['ⓐ', 'Root'],
            ['ⓑ', 'Leading'],
            ['ⓒ', 'Title'],
            ['ⓓ', 'Trailing'],
            ['ⓔ', 'Icon Button'],
            ['ⓕ', 'Notification'],
          ]}
        />
      </div>
    </Figure>
  );
};

// ── Properties ────────────────────────────────────────────
const Types: Fig = ({ caption }) => (
  <Figure caption={caption}>
    <div className="flex flex-col items-center gap-6">
      <BarBoard label="Root — 탭 첫 화면, 왼쪽 큰 제목">
        <Bar type="root" title="홈" actions={HOME_ACTIONS} />
      </BarBoard>
      <BarBoard label="Standard — ← + 제목 + 글 버튼">
        <Bar title="알림" actions={[{ kind: 'text', label: '모두 읽음' }]} />
      </BarBoard>
      <div className="flex flex-col items-center gap-2">
        <div className="overflow-hidden" style={{ width: 560, background: rc('bg-layer-basement'), boxShadow: `0 0 0 1px ${rc('stroke-neutral-subtle')}` }}>
          <DeskHeader />
          <ScreenTitle style={{ paddingBottom: 20 }}>가계부</ScreenTitle>
        </div>
        <Cap>데스크톱 머리 — 주 버튼 + 아이콘 버튼, 화면 제목은 본문 맨 위 h1</Cap>
      </div>
    </div>
  </Figure>
);

const Title: Fig = ({ caption }) => {
  const t = T();
  const H = t.height;
  const trail = PHONE - t.padX - t.icon.size * 2;
  return (
    <Figure caption={caption}>
      <div className="flex flex-col items-center gap-8 pt-4">
        <BarBoard label={`Root — 화면 끝에서 ${t.types.root.left} · ${parseFloat(t.types.root.text.fontSize)} / ${parseFloat(t.types.root.text.lineHeight)} · ${t.title.weight}`}>
          <Bar type="root" title="가계부" actions={[{ icon: 'search', label: '검색' }]} zone={{ title: markBox }} />
          <Band style={{ left: 0, top: H / 2 - 2, width: t.types.root.left, height: 4 }} label={`${t.types.root.left}`} tag="above" />
        </BarBoard>
        <BarBoard label={`Standard — 화면 끝에서 ${t.types.standard.left} · ${parseFloat(t.types.standard.text.fontSize)} / ${parseFloat(t.types.standard.text.lineHeight)} · ${t.title.weight}`}>
          <Bar title="카드 혜택" actions={CARD_ACTIONS} zone={{ title: markBox }} />
          <Band style={{ left: 0, top: H - 6, width: t.types.standard.left, height: 4 }} label={`${t.types.standard.left}`} tag="below" />
        </BarBoard>
        <BarBoard label={`긴 제목 — 오른쪽 자리 앞 ${t.title.gap} 에서 말줄임(…), 한 줄`}>
          <Bar title="현대카드 M 결제 예정 금액과 받을 혜택" actions={CARD_ACTIONS} zone={{ title: markBox }} />
          <Band style={{ left: trail - t.title.gap, top: 8, width: t.title.gap, height: H - 16 }} label={`${t.title.gap}`} tag="above" />
        </BarBoard>
      </div>
    </Figure>
  );
};

// 바의 오른쪽 끝을 2배로
function ZoomEnd({ children, w = 220, mode = 'auto' }: { children: ReactNode; w?: number; mode?: Mode }) {
  const H = T().height;
  return (
    <div className="relative overflow-hidden rounded-lg" style={{ width: w, height: H * 2, outline: `1px dashed ${rc('stroke-neutral-weak', mode)}`, outlineOffset: -1 }}>
      <div className="absolute right-0 top-0" style={{ width: PHONE, transform: 'scale(2)', transformOrigin: 'right top' }}>
        {children}
      </div>
    </div>
  );
}
const IconButton: Fig = ({ caption }) => {
  const t = T();
  const H = t.height;
  const s = 2;
  const body = buttonLook({ variant: 'ghost', size: 'medium', layout: 'iconOnly', ghostColor: 'neutral' });
  const box = body.faces.light.enabled.height;
  const ico = body.faces.light.enabled.icon;
  // 오른쪽 끝에서 — 상자 · 아이콘 자리(2배)
  const edge = t.padX * s;
  const iconEdge = (t.padX + (t.icon.size - t.icon.icon) / 2) * s;
  return (
    <Figure caption={caption}>
      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <ZoomEnd w={240}>
              <Bar title="카드 혜택" actions={CARD_ACTIONS} zone={{ icon: { ...markLine, background: 'rgba(236, 72, 153, 0.10)' } }} />
            </ZoomEnd>
            <Band style={{ right: 0, top: H * s - 10, width: edge, height: 6 }} label={`${t.padX}`} tag="below" />
            <Band style={{ right: 0, top: 8, width: iconEdge, height: 4 }} label={`아이콘 ${t.padX + (t.icon.size - t.icon.icon) / 2}`} tag="above" />
            <Band style={{ right: edge, top: H * s + 8, width: t.icon.size * s, height: 6 }} label={`${t.icon.size}`} tag="below" />
            <Band style={{ right: edge + t.icon.size * s, top: H * s + 8, width: t.icon.size * s, height: 6 }} label={`${t.icon.size}`} tag="below" />
          </div>
          <span className="pt-5">
            <Cap w={250} strong={`상단 바 — 상자 ${t.icon.size} · 아이콘 ${t.icon.icon}`}>
              상자가 곧 누르는 영역, 맨 끝 상자가 화면 끝에서 {t.padX}(아이콘 {t.padX + (t.icon.size - t.icon.icon) / 2}) · 버튼끼리 붙는다(중심 간격 {t.icon.size})
            </Cap>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center rounded-lg" style={{ width: 140, height: H * s, background: rc('bg-layer-default'), outline: `1px dashed ${rc('stroke-neutral-weak')}`, outlineOffset: -1 }}>
            <span style={{ transform: `scale(${s})` }}>
              <ButtonView look={body} state="enabled" icon="bell" ariaLabel="알림" />
            </span>
          </div>
          <span className="pt-5">
            <Cap w={220} strong={`본문 Button — 보이는 ${box} · 아이콘 ${ico}`}>Button medium iconOnly — 화면 안(카드 머리 · 목록 줄)의 아이콘 버튼. 상단 바에 쓰지 않는다</Cap>
          </span>
        </div>
      </div>
    </Figure>
  );
};

const STATE_KO = { enabled: '기본', hovered: '호버', pressed: '누름', focused: '포커스', disabled: '막힘' } as const;
const States: Fig = ({ caption }) => {
  const t = T();
  const states = Object.keys(STATE_KO) as (keyof typeof STATE_KO)[];
  return (
    <Figure caption={caption}>
      <div className="flex flex-col gap-4">
        {MODES.map((mode) => (
          <div key={mode} className="rounded-xl" style={{ background: rc('bg-layer-default', mode), paddingTop: 14, paddingBottom: 14, paddingLeft: 14, paddingRight: 14 }}>
            <div className="grid items-center gap-x-2 gap-y-3" style={{ gridTemplateColumns: `64px repeat(${states.length}, minmax(92px, auto))` }}>
              <span className="text-[12px] font-semibold" style={{ color: rc('fg-neutral-subtle', mode) }}>{modeKo(mode)}</span>
              {states.map((st) => (
                <span key={st} className="text-center text-[11px]" style={{ color: rc('fg-neutral-subtle', mode) }}>
                  {STATE_KO[st]}
                </span>
              ))}
              <span className="text-[12px]" style={{ color: rc('fg-neutral-muted', mode) }}>아이콘 버튼</span>
              {states.map((st) => (
                <span key={st} className="flex justify-center">
                  <TopIconButton look={t} mode={mode} icon="bell" label="알림" state={st} />
                </span>
              ))}
              <span className="text-[12px]" style={{ color: rc('fg-neutral-muted', mode) }}>글 버튼</span>
              {states.map((st) => (
                <span key={st} className="flex justify-center">
                  <TopTextButton look={t} mode={mode} label="모두 읽음" state={st} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
};

// ── Guidelines ────────────────────────────────────────────
const TypeGuide: Fig = ({ caption }) => (
  <Plate caption={caption}>
    <Pair>
      <Verdict ok note="탭 첫 화면(홈)은 큰 제목, 거기서 들어간 알림은 ← 와 작은 제목">
        <Wide>
          <div className="flex items-center gap-2">
            <HomeScreen scale={0.34} h={560} />
            <Arrow label="벨" />
            <NoticeScreen scale={0.34} h={560} />
          </div>
        </Wide>
      </Verdict>
      <Verdict ok={false} note="탭 첫 화면에 ← 와 작은 제목 — 뒤로 갈 곳이 없는 화면이다">
        <NPhone scale={0.34} h={560} tabs tab="home" bar={<Bar title="홈" actions={HOME_ACTIONS} />}>
          <div className="pt-2">
            <TxRows n={6} />
          </div>
        </NPhone>
      </Verdict>
    </Pair>
  </Plate>
);

const TrailingGuide: Fig = ({ caption }) => {
  const four: TopAction[] = [
    { icon: 'search', label: '검색' },
    { icon: 'bell', label: '알림' },
    { icon: 'eye-off', label: '금액 가리기' },
    { icon: 'settings', label: '설정' },
  ];
  return (
    <Plate caption={caption}>
      <div className="flex w-full flex-col gap-4">
        <Pair>
          <Verdict ok note="아이콘 둘 — 제목이 넉넉히 읽힌다">
            <BarBoard w={300}>
              <Bar title="카드 혜택" actions={CARD_ACTIONS} />
            </BarBoard>
          </Verdict>
          <Verdict ok={false} note="넷을 늘어놓은 바 — 제목이 밀려 읽히지 않는다">
            <BarBoard w={300}>
              <Bar title="카드 혜택" actions={four} />
            </BarBoard>
          </Verdict>
        </Pair>
        <Pair>
          <Verdict ok note="자주 쓰는 것만 남기고 나머지는 ⋯ 하나에 — 이름 &ldquo;카드 혜택 더보기&rdquo;">
            <BarBoard w={300}>
              <Bar title="카드 혜택" actions={[{ icon: 'search', label: '검색' }, { icon: 'more', label: '카드 혜택 더보기' }]} />
            </BarBoard>
          </Verdict>
          <Verdict ok={false} note="아이콘 버튼과 글 버튼을 함께 — 오른쪽은 아이콘 또는 글 버튼 하나">
            <BarBoard w={300}>
              <Bar title="알림" actions={[{ icon: 'settings', label: '설정' }, { kind: 'text', label: '모두 읽음' }]} />
            </BarBoard>
          </Verdict>
        </Pair>
      </div>
    </Plate>
  );
};

// 가져오기 흐름(독립 흐름) — ✕ 로 닫는다
function ImportScreen({ scale = 0.42, h = 560 }: { scale?: number; h?: number }) {
  return (
    <NPhone scale={scale} h={h} bar={<Bar leading="close" title="거래 가져오기" />}>
      <div className="flex flex-col gap-3 pt-4" style={{ paddingLeft: 24, paddingRight: 24 }}>
        <span className="text-[13px] font-semibold" style={{ color: rc('fg-brand') }}>2 / 3</span>
        <span className="text-[20px] font-bold leading-7" style={{ color: rc('fg-neutral') }}>가져올 파일을 골라 주세요</span>
        <div className="flex flex-col gap-2 pt-2">
          {['국민카드_2026_09.xlsx', '현대카드_2026_09.csv'].map((f, i) => (
            <span key={f} className="flex items-center rounded-xl text-[14px]" style={{ height: 52, paddingLeft: 16, background: rc(i === 0 ? 'bg-brand-weak' : 'bg-neutral-weak'), color: rc('fg-neutral') }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </NPhone>
  );
}
const BackCloseGuide: Fig = ({ caption }) => (
  <Plate caption={caption}>
    <div className="flex w-full flex-col gap-4">
      <Pair>
        <Verdict ok note="← — 들어온 화면(홈)으로 한 단계 뒤로">
          <div className="flex items-center gap-2">
            <NoticeScreen scale={0.3} h={560} />
            <Arrow label="←" />
            <HomeScreen scale={0.3} h={560} />
          </div>
        </Verdict>
        <Verdict ok note="✕ — 가져오기 흐름을 닫고 처음 자리(가계부)로. 고른 값이 있으면 먼저 묻는다">
          <div className="flex items-center gap-2">
            <ImportScreen scale={0.3} />
            <Arrow label="✕" />
            <NPhone scale={0.3} h={560} tabs tab="ledger" bar={<Bar type="root" title="가계부" actions={[{ icon: 'search', label: '검색' }]} />}>
              <DayHead />
              <TxRows n={6} />
            </NPhone>
          </div>
        </Verdict>
      </Pair>
      <Pair>
        <Verdict ok={false} note="일반 화면(알림)에 ✕ — 닫을 흐름이 없다">
          <BarBoard w={300}>
            <Bar leading="close" title="알림" actions={[{ kind: 'text', label: '모두 읽음' }]} />
          </BarBoard>
        </Verdict>
        <Verdict ok={false} note="여러 단계 흐름에 ← 만 — 끝내고 나가는 길이 보이지 않는다">
          <BarBoard w={300}>
            <Bar title="거래 가져오기" />
          </BarBoard>
        </Verdict>
      </Pair>
    </div>
  </Plate>
);

function Url({ children }: { children: ReactNode }) {
  return <span className="whitespace-nowrap rounded-md border border-fd-border bg-fd-card px-1.5 py-0.5 font-mono text-[10px] leading-4 text-fd-muted-foreground">{children}</span>;
}
const HistoryGuide: Fig = ({ caption }) => (
  <Plate caption={caption}>
    <div className="flex w-full flex-col gap-4">
      <Pair>
        <Verdict ok note="앱 안에서 눌러 들어옴(홈 벨 → 알림) — ← 는 들어온 화면(홈)으로">
          <Wide>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <Url>/desk</Url>
              <HomeScreen scale={0.3} h={560} />
            </div>
            <Arrow label="벨" />
            <div className="flex flex-col items-center gap-1.5">
              <Url>…/notifications</Url>
              <NoticeScreen scale={0.3} h={560} />
            </div>
            <Arrow label="←" />
            <div className="flex flex-col items-center gap-1.5">
              <Url>/desk</Url>
              <HomeScreen scale={0.3} h={560} />
            </div>
          </div>
          </Wide>
        </Verdict>
      </Pair>
      <Pair>
        <Verdict ok note="주소로 바로 · 알림을 눌러 · 새 탭 — 앞 화면이 없으면 상위 화면(/desk)으로, 주소를 고쳐 쓴다">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <Url>새 탭 …/notifications</Url>
              <NoticeScreen scale={0.3} h={560} />
            </div>
            <Arrow label="←" />
            <div className="flex flex-col items-center gap-1.5">
              <Url>/desk 바꿔 씀</Url>
              <HomeScreen scale={0.3} h={560} />
            </div>
          </div>
        </Verdict>
        <Verdict ok={false} note="← 가 늘 같은 화면(전체)으로 새로 이동 — 들어온 길과 상관없이 쌓인다">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <Url>…/notifications</Url>
              <NoticeScreen scale={0.3} h={560} />
            </div>
            <Arrow label="←" />
            <div className="flex flex-col items-center gap-1.5">
              <Url>/desk/more 쌓임</Url>
              <NPhone scale={0.3} h={560} tabs tab="more" bar={<Bar type="root" title="전체" />}>
                <TxRows n={5} />
              </NPhone>
            </div>
          </div>
        </Verdict>
      </Pair>
    </div>
  </Plate>
);

// 목록이 바 밑으로 스크롤된 폰 — 바 아래는 늘 그대로(스펙). 나쁜 예만 그림자 · 선을 그린다
function ScrolledPhone({ bad }: { bad?: 'shadow' | 'line' }) {
  const shadow = bad === 'shadow' ? `0 2px 8px ${rc('stroke-neutral-weak')}, 0 1px 2px rgba(0, 0, 0, 0.12)` : bad === 'line' ? `inset 0 -1px 0 ${rc('stroke-neutral-subtle')}` : 'none';
  return (
    <NPhone scale={0.36} h={560} bar={<Bar title="카드 혜택" actions={[{ icon: 'search', label: '검색' }]} style={{ boxShadow: shadow, zIndex: 2 }} />}>
      <div style={{ marginTop: -26 }}>
        <TxRows n={8} from={2} />
      </div>
    </NPhone>
  );
}
const ScrollGuide: Fig = ({ caption }) => (
  <Plate caption={caption}>
    <div className="flex w-full flex-col gap-4">
      <Pair>
        <Verdict ok note="스크롤한 목록이 바 밑으로 지나가도 선 · 그림자 없음 — 바와 목록이 한 면">
          <ScrolledPhone />
        </Verdict>
        <Verdict ok={false} note="스크롤하면 바 아래 그림자 · 선을 긋는다">
          <div className="flex gap-3">
            <ScrolledPhone bad="shadow" />
            <ScrolledPhone bad="line" />
          </div>
        </Verdict>
      </Pair>
      <Pair stack>
        <Verdict ok={false} note="데스크톱 머리 아래 늘 있던 1px 선 — 머리도 선 없이">
          <div className="overflow-hidden rounded-lg" style={{ width: 460, background: rc('bg-layer-basement'), boxShadow: `0 0 0 1px ${rc('stroke-neutral-subtle')}` }}>
            <Scaled w={760} h={150} s={460 / 760}>
              <div style={{ width: 760, background: rc('bg-layer-basement') }}>
                <Bar type="desktop" actions={[{ icon: 'bell', label: '알림' }, { icon: 'settings', label: '설정' }]} primary={{ label: '내역 추가', icon: 'plus' }} style={{ boxShadow: `inset 0 -1px 0 ${rc('stroke-neutral-subtle')}` }} />
                <ScreenTitle>가계부</ScreenTitle>
              </div>
            </Scaled>
          </div>
        </Verdict>
      </Pair>
    </div>
  </Plate>
);

const DesktopGuide: Fig = ({ caption }) => {
  const t = T();
  const k = NK();
  const s = 0.45;
  const W = 1280;
  // 오른쪽 끝을 실제 크기로 — 주 버튼 · 8 · 아이콘 셋 · 6
  const crop = 280;
  return (
    <Figure caption={caption}>
      <div className="flex flex-col items-center gap-6">
        <Shot cap={`1280 — 사이드바 ${k.side.width} 오른쪽 · 본문 위 머리 ${t.height}, 선 없음. 화면 제목은 본문 맨 위 h1`}>
          <DeskDesktop s={s} h={720} />
        </Shot>
        <div className="flex items-start justify-center gap-6">
          <div className="flex flex-col items-center gap-2" style={{ width: crop }}>
            <div className="relative overflow-hidden" style={{ width: crop, height: t.height + 70, background: rc('bg-layer-basement'), boxShadow: `0 0 0 1px ${rc('stroke-neutral-subtle')}` }}>
              <div className="absolute right-0 top-0" style={{ width: W - k.side.width }}>
                <DeskHeader />
              </div>
              <Band style={{ right: 0, top: t.height + 6, width: t.desktop.padRight, height: 6 }} label={`${t.desktop.padRight}`} tag="below" />
              <Band style={{ right: t.desktop.padRight + t.icon.size * 3, top: 6, width: t.desktop.primaryGap, height: t.height - 12 }} label={`${t.desktop.primaryGap}`} tag="below" />
              <Band style={{ right: t.desktop.padRight, top: t.height + 22, width: t.icon.size * 3, height: 6 }} label={`${t.icon.size} × 3`} tag="below" />
              <Band style={{ left: 0, top: 0, width: 6, height: t.height }} label={`${t.height}`} vertical tag="right" />
            </div>
            <Cap>머리 오른쪽 끝(실제 크기) — 주 버튼 small · {t.desktop.primaryGap} · 아이콘 버튼 {t.icon.size} 셋 · 화면 끝 {t.desktop.padRight}</Cap>
          </div>
          <div className="flex flex-col items-center gap-2" style={{ width: crop }}>
            <div className="relative overflow-hidden" style={{ width: crop, height: t.height + 90, background: rc('bg-layer-basement'), boxShadow: `0 0 0 1px ${rc('stroke-neutral-subtle')}` }}>
              <div style={{ width: W - k.side.width }}>
                <DeskHeader />
                <ScreenTitle>가계부</ScreenTitle>
              </div>
              <Band style={{ left: 0, top: t.height, width: k.margin, height: t.desktop.navToTitle }} label={`${t.desktop.navToTitle}`} tag="right" />
              <Band style={{ left: 0, top: t.height + t.desktop.navToTitle + 40, width: k.margin, height: 6 }} label={`${k.margin}`} tag="below" />
            </div>
            <Cap>
              본문 h1 — 머리 아래 {t.desktop.navToTitle} · 본문 여백 {k.margin} · {parseFloat(t.desktop.screenTitle.fontSize)} / {parseFloat(t.desktop.screenTitle.lineHeight)} · {t.desktop.screenTitle.fontWeight}
            </Cap>
          </div>
        </div>
      </div>
    </Figure>
  );
};

const MenuGuide: Fig = ({ caption }) => (
  <Plate caption={caption}>
    <Pair>
      <Verdict ok note="HR 폰 — 모든 화면이 ☰ + 제목, 하단 탭 바가 없다">
        <HrLeavePhone scale={0.46} h={560} />
      </Verdict>
      <Verdict ok note="☰ 를 누르면 왼쪽 주 메뉴(Side Panel) — 지금 묶음(휴가)이 펼쳐진 채">
        <HrLeavePhone scale={0.46} h={560} expanded overlay={<HrDrawer />} />
      </Verdict>
    </Pair>
  </Plate>
);

// 데스크톱 캘린더 본문(그림) — 달 격자. focus 면 제목(h1)에 키보드 초점 링(화면을 옮긴 뒤 초점이 제목으로 온다)
function CalendarMain({ mode = 'auto', focus = false }: { mode?: Mode; focus?: boolean }) {
  const k = NK();
  const st = k.top.desktop.screenTitle;
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <div className="flex flex-col">
      <div style={{ paddingTop: k.top.desktop.navToTitle, paddingLeft: k.margin }}>
        <span className="inline-block rounded" style={{ fontFamily: st.fontFamily, fontSize: st.fontSize, lineHeight: st.lineHeight, fontWeight: st.fontWeight, color: rc('fg-neutral', mode), outlineStyle: focus ? 'solid' : 'none', outlineWidth: 3, outlineColor: rc('stroke-focus-ring', mode), outlineOffset: 4 }}>
          캘린더
        </span>
      </div>
      <div style={{ paddingTop: 20, paddingLeft: k.margin, paddingRight: k.margin }}>
        <Card mode={mode}>
          <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <span key={i} className="flex flex-col gap-1 rounded-lg text-[13px]" style={{ height: 64, paddingTop: 6, paddingLeft: 8, color: rc(d < 1 || d > 31 ? 'fg-disabled' : 'fg-neutral', mode), background: rc('bg-neutral-weak', mode) }}>
              {d < 1 ? 28 + d : d > 31 ? d - 31 : d}
              {[3, 9, 14, 21, 27].includes(d) && <span className="block h-1.5 w-8 rounded-full" style={{ background: rc('bg-brand-solid', mode) }} />}
            </span>
          ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
// 스크롤한 본문 — 내용을 올리고 오른쪽에 스크롤 막대
function ScrolledMain({ y, children }: { y: number; children: ReactNode }) {
  return (
    <div className="relative h-full overflow-hidden">
      <div style={{ transform: `translateY(${-y}px)` }}>{children}</div>
      <span aria-hidden className="absolute right-1 block w-1.5 rounded-full" style={{ top: 40 + y / 3, height: 160, background: rc('stroke-neutral-weak') }} />
    </div>
  );
}
const RouteGuide: Fig = ({ caption }) => {
  const s = 0.36;
  const w = 1280;
  const h = 760;
  const cw = 720;
  const ch = 480;
  return (
    <Plate caption={caption}>
      <div className="flex w-full flex-col gap-4">
        <Pair>
          <Verdict ok note="가계부를 900 내려 둔 채 사이드바의 캘린더 — 캘린더는 맨 위에서, 초점은 제목(h1)">
            <Wide>
            <div className="flex items-center gap-2">
              <Desktop w={w} h={h} s={s} cw={cw} ch={ch}>
                <Shell side={<Side current="ledger" />} header={<DeskHeader />}>
                  <ScrolledMain y={900 * 0.4}>
                    <DeskMain rows={14} />
                  </ScrolledMain>
                </Shell>
              </Desktop>
              <Arrow label="캘린더" />
              <Desktop w={w} h={h} s={s} cw={cw} ch={ch}>
                <Shell side={<Side current="calendar" />} header={<DeskHeader />}>
                  <CalendarMain focus />
                </Shell>
              </Desktop>
            </div>
            </Wide>
          </Verdict>
        </Pair>
        <Pair stack>
          <Verdict ok={false} note="캘린더가 가계부의 스크롤 자리(900)에서 열린다 — 제목이 화면 밖, 초점은 누른 자리에 남는다">
            <Wide>
            <Desktop w={w} h={h} s={s} cw={cw} ch={ch}>
              <Shell side={<Side current="calendar" />} header={<DeskHeader />}>
                <ScrolledMain y={900 * 0.4}>
                  <CalendarMain />
                </ScrolledMain>
              </Shell>
            </Desktop>
            </Wide>
          </Verdict>
        </Pair>
        <div className="flex flex-wrap justify-center gap-2">
          <Reading tone="ok">캘린더 - Porest Desk</Reading>
          <Reading>문서 제목은 화면마다 &ldquo;{'{'}화면 제목{'}'} - Porest Desk&rdquo;</Reading>
        </div>
      </div>
    </Plate>
  );
};

// ── 코드 예시(미리보기) — top-navigation.md 의 코드 그대로 ──────
const ExRoot: Fig = ({ caption }) => (
  <CodePreview caption={caption} pad={16}>
    <Bar type="root" title="홈" actions={HOME_ACTIONS} live as="header" />
  </CodePreview>
);
const ExStandard: Fig = ({ caption }) => (
  <CodePreview caption={caption} pad={16}>
    <Bar title="알림" actions={[{ kind: 'text', label: '모두 읽음' }]} live as="header" />
  </CodePreview>
);
const ExDesktop: Fig = ({ caption }) => (
  <CodePreview caption={caption} w={720} pad={16} bg="bg-layer-basement" padX={0}>
    <div style={{ paddingBottom: 12 }}>
      <Bar type="desktop" actions={[{ icon: 'eye-off', label: '금액 가리기' }, { icon: 'bell', label: '알림, 새 알림 있음', notification: true }, { icon: 'settings', label: '설정' }]} primary={{ label: '내역 추가', icon: 'plus' }} live as="header" />
      <ScreenTitle>가계부</ScreenTitle>
    </div>
  </CodePreview>
);
const ExMenu: Fig = ({ caption }) => (
  <CodePreview caption={caption} pad={16} brand="hr">
    <Bar brand="hr" leading="menu" title="휴가 현황" live as="header" />
  </CodePreview>
);

export const topNavigationFigures: Record<string, Fig> = {
  hero: Hero,
  playground: Playground,
  anatomy: Anatomy,
  types: Types,
  title: Title,
  'icon-button': IconButton,
  states: States,
  'type-guide': TypeGuide,
  'trailing-guide': TrailingGuide,
  'back-close-guide': BackCloseGuide,
  'history-guide': HistoryGuide,
  'scroll-guide': ScrollGuide,
  'desktop-guide': DesktopGuide,
  'menu-guide': MenuGuide,
  'route-guide': RouteGuide,
  'ex-root': ExRoot,
  'ex-standard': ExStandard,
  'ex-desktop': ExDesktop,
  'ex-menu': ExMenu,
};
