'use client';
// Toggle 플레이그라운드 · 코드 미리보기 — 단추(관심 등록 · 메모 고정 · 금액 가리기 · App Key 보기) · 켬 · 끔 · 표면 · 막힘을 고르면
// 스펙대로 그린 단추(toggle-view — toggle.yaml)와 그 코드가 바뀐다. 실제로 누르면 아이콘과 보조 기술이 읽는 말이 함께 바뀐다.
// 코드는 toggle.md 의 "코드" 절과 같은 API 로 쓴다. 화면 속 카드 · 순자산 카드는 card.yaml(data-card-view), 실패 알림은 snackbar.yaml.
import { useMemo, useRef, useState, type ReactNode } from 'react';
import type { CardLook } from './data-shared';
import { CardSurface, HeroCardView } from './data-card-view';
import { dcv } from './display-shared';
import type { SnackbarLook } from './feedback-shared';
import { SnackbarRegion, useSnackbarHost } from './feedback-view';
import { ScreenFrame } from './feedback-demos';
import { FONT, TOGGLES, toggleReadout, type ToggleKind, type ToggleLook, type ViewMode } from './input-shared';
import { BRANDS, MODES, PlayFrame, Seg } from './select-playground';
import { ToggleView } from './toggle-view';

type Brand = 'desk' | 'hr';

// 화면 읽기 프로그램이 읽는 말 — 플레이그라운드 · 미리보기 아래 한 줄
export function Readout({ text, mode = 'auto', tone }: { text: string; mode?: ViewMode; tone?: string }) {
  return (
    <p className="m-0 flex flex-wrap items-center justify-center gap-x-2 text-center text-[12px] leading-5" style={{ color: tone }}>
      <span className="text-fd-muted-foreground">화면 읽기</span>
      <code className="rounded bg-fd-secondary px-1.5 py-0.5 text-[12px] text-fd-foreground" data-mode={mode}>
        {text}
      </code>
    </p>
  );
}

// 단추가 놓인 자리 — 흰 표면(카드 · 화면)의 한 줄. 켬 · 끔에 따라 아래 글도 바뀐다(가린 금액 · 보인 키)
function Context({ kind, pressed, toggle, card, mode }: { kind: ToggleKind; pressed: boolean; toggle: ReactNode; card: CardLook; mode: ViewMode }) {
  const t = (n: 'fg-neutral' | 'fg-neutral-subtle') => (n === 'fg-neutral' ? dcv(card.title.fg, mode) : dcv(card.stat.label.fg, mode));
  const title = { fontFamily: card.title.fontFamily, fontSize: card.title.fontSize, lineHeight: card.title.lineHeight, fontWeight: card.title.fontWeight, color: t('fg-neutral') };
  const sub = { fontFamily: FONT, fontSize: card.stat.label.fontSize, lineHeight: card.stat.label.lineHeight, color: t('fg-neutral-subtle'), fontVariantNumeric: 'tabular-nums' as const };
  const head = (name: string) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: card.header.gap }}>
      <span style={{ ...title, minWidth: 0 }}>{name}</span>
      <span style={{ display: 'flex', flexShrink: 0, marginTop: -card.header.gap, marginRight: -card.header.gap }}>{toggle}</span>
    </div>
  );
  const line = (text: string) => <span style={sub}>{text}</span>;
  const body =
    kind === 'watch' ? (
      <>
        {head('삼성전자')}
        {line(`71,500원 · +1.2%${pressed ? ' · 관심 종목' : ''}`)}
      </>
    ) : kind === 'pin' ? (
      <>
        {head('장보기 목록')}
        {line('우유 · 계란 · 두부 · 대파')}
      </>
    ) : kind === 'hide' ? (
      <>
        {head('자산')}
        {line(pressed ? '국민 주계좌 ••••••원' : '국민 주계좌 1,250,000원')}
      </>
    ) : (
      <>
        {head('나무증권 연결')}
        {line(pressed ? 'App Key PSq7·Kx2m·9WdA·tL4e' : 'App Key ••••••••••••••••')}
      </>
    );
  return (
    <CardSurface look={card} mode={mode}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: card.content.gap }}>{body}</div>
    </CardSurface>
  );
}

export function TogglePlayground({ looks, cards }: { looks: Record<Brand, ToggleLook>; cards: Record<Brand, CardLook> }) {
  const [kind, setKind] = useState<ToggleKind>('watch');
  const [pressed, setPressed] = useState(false);
  const [surface, setSurface] = useState<'surface' | 'hero'>('surface');
  const [disabled, setDisabled] = useState<'no' | 'yes'>('no');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [brand, setBrand] = useState<Brand>('desk');
  const look = looks[brand];
  const card = cards[brand];
  const k = TOGGLES[kind];
  const hero = surface === 'hero';
  const off = disabled === 'yes';
  const toggle = <ToggleView key={`${kind}${brand}`} look={look} mode={mode} ariaLabel={k.label} pressed={pressed} onPressedChange={setPressed} icon={k.icon} pressedIcon={k.pressedIcon} tone={hero ? 'inverted' : 'default'} disabled={off} />;
  const code = useMemo(() => {
    const [a, b] = k.jsx;
    const icons = [...new Set([a, ...(b ? [b] : [])])].sort();
    const [st, set] = k.state;
    const label = k.memo ? 'aria-label={`${memo.title} 고정`}' : `aria-label="${k.label}"`;
    const attrs = [
      ...(hero ? ['tone="inverted"'] : []),
      label,
      `pressed={${st}}`,
      `onPressedChange={${set}}`,
      `icon={<${a} />}`,
      ...(b ? [`pressedIcon={<${b} />}`] : []),
      ...(off ? ['disabled'] : []),
    ];
    return [`import { ${icons.join(', ')} } from "lucide-react"`, 'import { Toggle } from "@/components/ui/toggle"', '', `const [${st}, ${set}] = useState(${pressed})`, '', `<Toggle ${attrs.join(' ')} />`].join('\n');
  }, [k, hero, off, pressed]);
  // 판 — 카드를 놓는 바닥(bg-layer-basement — card.yaml)
  const surfaceColor = dcv(card.floor, mode);
  const stage = (
    <div className="flex flex-col items-stretch gap-3" style={{ fontFamily: FONT }}>
      {hero ? (
        <HeroCardView look={card} mode={mode} label="순자산 · 2026년 10월" amount={kind === 'hide' && pressed ? '••••••원' : '42,898,100원'} detail="총 자산 52,320,000원 · 총 부채 9,421,900원" labelEnd={toggle} />
      ) : (
        <Context kind={kind} pressed={pressed} toggle={toggle} card={card} mode={mode} />
      )}
      <Readout text={toggleReadout(k.label, pressed, off)} mode={mode} />
    </div>
  );
  return (
    <PlayFrame
      surface={surfaceColor}
      code={code}
      stage={stage}
      controls={
        <>
          <Seg
            label="단추"
            value={kind}
            options={[
              ['watch', '관심 등록 — 모으기'],
              ['pin', '메모 고정 — 모으기'],
              ['hide', '금액 가리기 — 기능'],
              ['key', 'App Key 보기 — 기능'],
            ]}
            onChange={(v) => (setKind(v), setPressed(false))}
          />
          <Seg
            label="켬 pressed"
            value={pressed ? 'on' : 'off'}
            options={[
              ['off', '끔'],
              ['on', '켬'],
            ]}
            onChange={(v) => setPressed(v === 'on')}
          />
          <Seg
            label="표면 tone"
            value={surface}
            options={[
              ['surface', '흰 표면 — default'],
              ['hero', '순자산 카드 — inverted'],
            ]}
            onChange={setSurface}
          />
          <Seg
            label="막힘 disabled"
            value={disabled}
            options={[
              ['no', '아니요'],
              ['yes', '막힘'],
            ]}
            onChange={setDisabled}
          />
          <div className="flex flex-wrap gap-5">
            <Seg label="모드" value={mode} options={MODES} onChange={setMode} />
            <Seg label="브랜드" value={brand} options={BRANDS} onChange={setBrand} />
          </div>
        </>
      }
    />
  );
}

// ── 코드 미리보기 판 — 회색 판 위 흰 화면(폭 w) ─────────────
export function ToggleDemoFrame({ children, w = 360 }: { children: ReactNode; w?: number }) {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl bg-[#E9E9EC] p-4 dark:bg-fd-muted sm:p-6">
        <div className="mx-auto flex w-full flex-col gap-3" style={{ maxWidth: w, fontFamily: FONT }}>
          {children}
        </div>
      </div>
    </figure>
  );
}

// 관심 등록 — 종목 머리(모으기 단추: 같은 별, 끔 흐린 선 2 · 켬 진한 선 2.5)
export function ExWatchDemo({ look, card }: { look: ToggleLook; card: CardLook }) {
  const [watched, setWatched] = useState(false);
  return (
    <ToggleDemoFrame>
      <Context kind="watch" pressed={watched} card={card} mode="auto" toggle={<ToggleView look={look} ariaLabel="관심 등록" pressed={watched} onPressedChange={setWatched} icon="star" />} />
      <Readout text={toggleReadout('관심 등록', watched)} />
    </ToggleDemoFrame>
  );
}

// 금액 가리기 · App Key 보기 — 기능 단추(아이콘은 지금 상태)
export function ExEyeDemo({ look, card }: { look: ToggleLook; card: CardLook }) {
  const [hidden, setHidden] = useState(false);
  const [shown, setShown] = useState(false);
  const [said, setSaid] = useState(toggleReadout('금액 가리기', false));
  return (
    <ToggleDemoFrame>
      <Context kind="hide" pressed={hidden} card={card} mode="auto" toggle={<ToggleView look={look} ariaLabel="금액 가리기" pressed={hidden} onPressedChange={(p) => (setHidden(p), setSaid(toggleReadout('금액 가리기', p)))} icon="eye" pressedIcon="eye-off" />} />
      <Context kind="key" pressed={shown} card={card} mode="auto" toggle={<ToggleView look={look} ariaLabel="App Key 보기" pressed={shown} onPressedChange={(p) => (setShown(p), setSaid(toggleReadout('App Key 보기', p)))} icon="eye-off" pressedIcon="eye" />} />
      <Readout text={said} />
    </ToggleDemoFrame>
  );
}

// 메모 고정 — 화면을 바로 바꾸고 요청은 뒤에서. 실패하면 되돌리고 Snackbar critical + "다시 시도"(20A)
const MEMOS = [
  { id: 'groceries', title: '장보기 목록', body: '우유 · 계란 · 두부 · 대파', pinned: true },
  { id: 'trip', title: '제주 여행 준비', body: '숙소 예약 · 렌터카 · 우산', pinned: false },
  { id: 'gift', title: '부모님 선물', body: '안마기 · 꽃바구니', pinned: false },
];
// gutter — 화면 여백(spacing-global-gutter) · 카드는 그 안에 card.yaml 간격으로 쌓인다
export function ExPinDemo({ look, card, snack, gutter }: { look: ToggleLook; card: CardLook; snack: SnackbarLook; gutter: number }) {
  const host = useSnackbarHost(snack);
  const s = snack.screen;
  const [memos, setMemos] = useState(MEMOS);
  const [fail, setFail] = useState<'ok' | 'fail'>('ok');
  const [log, setLog] = useState<string[]>([]);
  const seq = useRef(0);
  const send = (id: string, pinned: boolean) => {
    const n = ++seq.current;
    const memo = memos.find((m) => m.id === id)!;
    setLog((l) => [`요청 ${n} — ${memo.title} ${pinned ? '고정' : '고정 풀기'}`, ...l].slice(0, 3));
    window.setTimeout(() => {
      // 빠르게 여러 번 누르면 마지막 요청의 결과만 반영한다
      if (n !== seq.current) return;
      if (fail === 'ok') return;
      setMemos((ms) => ms.map((m) => (m.id === id ? { ...m, pinned: !pinned } : m)));
      host.show({ tone: 'critical', message: '고정하지 못했어요. 다시 시도해주세요.', action: { label: '다시 시도', onClick: () => set(id, pinned) } });
    }, 700);
  };
  const set = (id: string, pinned: boolean) => {
    setMemos((ms) => ms.map((m) => (m.id === id ? { ...m, pinned } : m)));
    send(id, pinned);
  };
  const ordered = [...memos.filter((m) => m.pinned), ...memos.filter((m) => !m.pinned)];
  return (
    <ToggleDemoFrame w={400}>
      <ScreenFrame screen={s} title="메모" height={430} bg="bg-layer-basement">
        <div style={{ display: 'flex', flexDirection: 'column', gap: card.surface.gap, paddingTop: card.surface.gap, paddingLeft: gutter, paddingRight: gutter }}>
          {ordered.map((m) => (
            <CardSurface key={m.id} look={card}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: card.content.gap }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: card.header.gap }}>
                  <span style={{ fontFamily: card.title.fontFamily, fontSize: card.title.fontSize, lineHeight: card.title.lineHeight, fontWeight: card.title.fontWeight, color: dcv(card.title.fg, 'auto'), minWidth: 0 }}>{m.title}</span>
                  <span style={{ display: 'flex', flexShrink: 0, marginTop: -card.header.gap, marginRight: -card.header.gap }}>
                    <ToggleView look={look} ariaLabel={`${m.title} 고정`} pressed={m.pinned} onPressedChange={(p) => set(m.id, p)} icon="pin" />
                  </span>
                </div>
                <span style={{ fontFamily: FONT, fontSize: card.stat.label.fontSize, lineHeight: card.stat.label.lineHeight, color: dcv(card.stat.label.fg, 'auto') }}>{m.body}</span>
              </div>
            </CardSurface>
          ))}
        </div>
        <SnackbarRegion host={host} look={snack} />
      </ScreenFrame>
      <div className="flex flex-col items-center gap-2">
        <Seg
          label="다음 요청"
          value={fail}
          options={[
            ['ok', '성공'],
            ['fail', '실패 — 되돌리고 알림'],
          ]}
          onChange={setFail}
        />
        <p role="status" className="m-0 min-h-[60px] text-center text-[12px] leading-5 text-fd-muted-foreground">
          {log.length ? log.map((l) => <span key={l} className="block">{l}</span>) : '고정을 누르면 아이콘이 바로 바뀌고 요청이 뒤에서 나가요 — 요청 중에도 단추를 막지 않아요.'}
        </p>
      </div>
    </ToggleDemoFrame>
  );
}

// 순자산 카드 위 — 흰 아이콘만(바탕 · 원 없음, 21A). 누르면 축소만
export function ExInvertedDemo({ look, card }: { look: ToggleLook; card: CardLook }) {
  const [hidden, setHidden] = useState(false);
  return (
    <ToggleDemoFrame>
      <HeroCardView
        look={card}
        label="순자산 · 2026년 10월"
        amount={hidden ? '••••••원' : '42,898,100원'}
        detail={hidden ? '총 자산 •••••• · 총 부채 ••••••' : '총 자산 52,320,000원 · 총 부채 9,421,900원'}
        labelEnd={<ToggleView look={look} tone="inverted" ariaLabel="금액 가리기" pressed={hidden} onPressedChange={setHidden} icon="eye" pressedIcon="eye-off" />}
      />
      <Readout text={toggleReadout('금액 가리기', hidden)} />
    </ToggleDemoFrame>
  );
}
