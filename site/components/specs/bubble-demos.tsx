'use client';
// Help Bubble · Tooltip 페이지의 실제로 여닫는 미리보기 — 코드 절(규정 안내 · 금액 가리기 안내 · 아이콘 버튼 · 막힌 버튼)과 플레이그라운드.
// 말풍선은 help-bubble.yaml(menu-view 의 BubbleView · HelpBubbleControl · TooltipControl), 버튼은 button.yaml(button-view)이다.
import { useState, type ReactNode } from 'react';
import type { ButtonLook } from './button-look';
import { ButtonView, type IconName } from './button-view';
import { COPY_REASON, HIDE_TIP, LEAVE_RULE, LONG_TIP, TOOLBAR } from './menu-data';
import { mcv, type BubbleSide, type MTone, type MenuKit, type ViewMode } from './menu-shared';
import { HelpBubbleControl, TooltipControl, TooltipGroup, type TriggerRender } from './menu-view';
import { BRANDS, MODES, Seg } from './select-playground';
import { DemoFrame } from './menu-demos';

type Brand = 'desk' | 'hr';
const FONT = "'Pretendard Variable', Pretendard, sans-serif";
const tone = (kit: MenuKit, name: MTone, mode: ViewMode) => mcv(kit.tone[name], mode);
const TOOL_ICON: Record<(typeof TOOLBAR)[number]['value'], IconName> = { search: 'search', hide: 'eye-off', reset: 'rotate-ccw' };

// 트리거 — Button ghost · iconOnly(이름은 aria-label)
function IconTrigger({ look, mode, icon, label, render }: { look: ButtonLook; mode: ViewMode; icon: IconName; label: string; render: Parameters<TriggerRender>[0] }) {
  return <ButtonView look={look} mode={mode} icon={icon} ariaLabel={label} buttonRef={render.ref} rootProps={render.props} />;
}
function Status({ kit, mode, children }: { kit: MenuKit; mode: ViewMode; children: ReactNode }) {
  return (
    <p role="status" aria-live="polite" style={{ margin: '12px 0 0', minHeight: 18, fontSize: 13, lineHeight: '18px', color: tone(kit, 'fg-neutral-subtle', mode) }}>
      {children}
    </p>
  );
}

// ── Help Bubble 코드 — ⓘ 를 눌러 여는 규정 안내(HR) ──────────
export function LeaveRuleDemo({ kit, info, mode = 'auto' }: { kit: MenuKit; info: ButtonLook; mode?: ViewMode }) {
  return (
    <DemoFrame kit={kit} mode={mode} w={420}>
      <div style={{ paddingTop: 72 }}>
        <span style={{ fontSize: 13, lineHeight: '18px', color: tone(kit, 'fg-neutral-subtle', mode) }}>남은 연차</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 22, lineHeight: '30px', fontWeight: 700, color: tone(kit, 'fg-neutral', mode) }}>11일</span>
          <HelpBubbleControl look={kit.bubble} mode={mode} title={LEAVE_RULE.title} description={LEAVE_RULE.description} trigger={(r) => <IconTrigger look={info} mode={mode} icon="info" label="연차 사용 규정 안내" render={r} />} />
        </div>
      </div>
    </DemoFrame>
  );
}

// ── Help Bubble 코드 — 처음부터 열어 두는 안내(닫기 버튼) ───────
const AMOUNTS: [string, string][] = [
  ['국민 주계좌', '1,250,000원'],
  ['현대카드 M', '-352,400원'],
  ['토스뱅크 통장', '820,000원'],
];
export function HideTipDemo({ kit, ghost, mode = 'auto' }: { kit: MenuKit; ghost: ButtonLook; mode?: ViewMode }) {
  const [hidden, setHidden] = useState(false);
  const [seen, setSeen] = useState(false);
  const [round, setRound] = useState(0);
  const [box, setBox] = useState<HTMLDivElement | null>(null);
  return (
    <DemoFrame kit={kit} mode={mode} w={400}>
      {/* 처음부터 열린 안내 — 화면이 자리를 잡는 동안에도 트리거를 따라가게 이 판 안에 띄운다 */}
      <div ref={setBox} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 17, lineHeight: '24px', fontWeight: 700, color: tone(kit, 'fg-neutral', mode) }}>자산</span>
        {/* Anchor — 자리만 잡는다. 누르면 원래 동작(금액 가리기) */}
        <HelpBubbleControl
          key={round}
          look={kit.bubble}
          mode={mode}
          title={HIDE_TIP.title}
          description={HIDE_TIP.description}
          closeButton
          side="bottom"
          defaultOpen={!seen}
          outsideCloses={false}
          anchorOnly
          container={box}
          onOpenChange={(o) => !o && setSeen(true)}
          trigger={(r) => (
            <ButtonView look={ghost} mode={mode} icon={hidden ? 'eye' : 'eye-off'} ariaLabel={hidden ? '금액 보이기' : '금액 가리기'} buttonRef={r.ref} rootProps={r.props} onClick={() => setHidden((h) => !h)} />
          )}
        />
      </div>
      <div style={{ paddingTop: 96 }}>
        {AMOUNTS.map(([name, amount], i) => (
          <div key={name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: i === AMOUNTS.length - 1 ? 'none' : `1px solid ${tone(kit, 'stroke-neutral-subtle', mode)}` }}>
            <span style={{ fontSize: 15, lineHeight: '20px', color: tone(kit, 'fg-neutral', mode) }}>{name}</span>
            <span style={{ fontSize: 15, lineHeight: '20px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: tone(kit, 'fg-neutral', mode) }}>{hidden ? '••••••원' : amount}</span>
          </div>
        ))}
      </div>
      </div>
      <Status kit={kit} mode={mode}>
        {seen ? (
          <>
            안내를 닫았어요 — 다시 열지 않아요.{' '}
            <button
              type="button"
              onClick={() => {
                setSeen(false);
                setRound((n) => n + 1);
              }}
              style={{ margin: 0, padding: 0, border: 0, background: 'transparent', font: 'inherit', color: tone(kit, 'fg-brand', mode), textDecoration: 'underline', cursor: 'pointer' }}
            >
              처음 상태로
            </button>
          </>
        ) : (
          '닫기 버튼으로만 닫혀요 — 바깥을 눌러도 남아 있어요.'
        )}
      </Status>
    </DemoFrame>
  );
}

// ── Tooltip 코드 — 아이콘 버튼의 이름 ────────────────────────
export function ToolbarTooltipDemo({ kit, ghost, mode = 'auto' }: { kit: MenuKit; ghost: ButtonLook; mode?: ViewMode }) {
  const [hidden, setHidden] = useState(false);
  const [status, setStatus] = useState('');
  return (
    <DemoFrame kit={kit} mode={mode} w={400}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 44 }}>
        <span style={{ fontSize: 17, lineHeight: '24px', fontWeight: 700, color: tone(kit, 'fg-neutral', mode) }}>가계부</span>
        <TooltipGroup>
          <span style={{ display: 'flex', gap: 4 }}>
            {TOOLBAR.map((t) => {
              const label = t.value === 'hide' && hidden ? '금액 보이기' : t.label;
              const icon: IconName = t.value === 'hide' && hidden ? 'eye' : TOOL_ICON[t.value];
              return (
                <TooltipControl
                  key={t.value}
                  look={kit.bubble}
                  mode={mode}
                  text={label}
                  trigger={(r) => (
                    <ButtonView
                      look={ghost}
                      mode={mode}
                      icon={icon}
                      ariaLabel={label}
                      buttonRef={r.ref}
                      rootProps={r.props}
                      onClick={() => {
                        if (t.value === 'hide') setHidden((h) => !h);
                        setStatus(t.value === 'hide' ? (hidden ? '금액을 보여 줘요.' : '금액을 가렸어요.') : t.value === 'search' ? '검색 칸을 열어요.' : '필터를 지웠어요.');
                      }}
                    />
                  )}
                />
              );
            })}
          </span>
        </TooltipGroup>
      </div>
      <Status kit={kit} mode={mode}>
        {status || '마우스를 올리면 잠시 뒤, Tab 으로 옮기면 바로 이름이 떠요. 손가락으로 누르면 뜨지 않아요.'}
      </Status>
    </DemoFrame>
  );
}

// ── Tooltip 코드 — 막힌 버튼의 이유는 가까운 글로 ───────────────
export function DisabledReasonDemo({ kit, weak, mode = 'auto' }: { kit: MenuKit; weak: ButtonLook; mode?: ViewMode }) {
  const [has, setHas] = useState<'no' | 'yes'>('no');
  const [status, setStatus] = useState('');
  return (
    <DemoFrame kit={kit} mode={mode} w={400}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
        <ButtonView look={weak} mode={mode} label="지난달 예산 복사" state={has === 'yes' ? 'live' : 'disabled'} rootProps={has === 'no' ? { 'aria-describedby': 'copy-reason' } : undefined} onClick={() => setStatus('지난달 예산을 복사했어요.')} />
        {has === 'no' && (
          <p id="copy-reason" style={{ margin: 0, fontSize: 13, lineHeight: '18px', color: tone(kit, 'fg-neutral-subtle', mode) }}>
            {COPY_REASON}
          </p>
        )}
      </div>
      <div className="mt-4">
        <Seg
          label="지난달 예산"
          value={has}
          options={[
            ['no', '없음'],
            ['yes', '있음'],
          ]}
          onChange={(v) => (setHas(v), setStatus(''))}
        />
      </div>
      <Status kit={kit} mode={mode}>
        {status}
      </Status>
    </DemoFrame>
  );
}

// ── 플레이그라운드 공통 ───────────────────────────────────
function PlayFrame({ stage, controls, code }: { stage: ReactNode; controls: ReactNode; code: string }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border">
      <div className="flex items-center justify-center bg-[#E9E9EC] px-4 py-8 dark:bg-fd-muted">{stage}</div>
      <div className="grid gap-4 border-t border-fd-border bg-fd-card p-5 sm:grid-cols-2">{controls}</div>
      <pre className="overflow-x-auto border-t border-fd-border bg-fd-secondary/50 px-5 py-4 text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}
const SIDES = [
  ['top', '위(기본)'],
  ['bottom', '아래'],
  ['left', '왼쪽'],
  ['right', '오른쪽'],
] as const;
const YES_NO = [
  ['yes', '있음'],
  ['no', '없음'],
] as const;

// ── Help Bubble 플레이그라운드 ─────────────────────────────
export function HelpBubblePlayground({ kits, infos }: { kits: Record<Brand, MenuKit>; infos: Record<Brand, ButtonLook> }) {
  const [brand, setBrand] = useState<Brand>('hr');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [desc, setDesc] = useState<'yes' | 'no'>('yes');
  const [close, setClose] = useState<'yes' | 'no'>('no');
  const [side, setSide] = useState<BubbleSide>('top');
  const [stage, setStage] = useState<HTMLDivElement | null>(null);
  const kit = kits[brand];
  const code = [
    'import { HelpBubble, HelpBubbleContent, HelpBubbleTrigger } from "@/components/ui/help-bubble"',
    '',
    '<HelpBubble>',
    '  <HelpBubbleTrigger asChild>',
    '    <Button variant="ghost" ghostColor="neutralSubtle" layout="iconOnly" aria-label="연차 사용 규정 안내">',
    '      <Info />',
    '    </Button>',
    '  </HelpBubbleTrigger>',
    '  <HelpBubbleContent',
    `    title="${LEAVE_RULE.title}"`,
    ...(desc === 'yes' ? [`    description="${LEAVE_RULE.description}"`] : []),
    ...(close === 'yes' ? ['    showCloseButton'] : []),
    ...(side !== 'top' ? [`    side="${side}"`] : []),
    '  />',
    '</HelpBubble>',
  ].join('\n');
  return (
    <PlayFrame
      stage={
        <div
          ref={setStage}
          data-brand={brand}
          className="relative w-full max-w-[560px] overflow-hidden rounded-xl"
          style={{ isolation: 'isolate', height: 320, background: tone(kit, 'bg-layer-default', mode), fontFamily: FONT }}
        >
          {/* 옆으로 열 때는 그쪽에 자리가 남게 트리거를 반대편으로 둔다(모자라면 뒤집힌다) */}
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 2, ...(side === 'right' ? { left: 24, top: '50%', transform: 'translateY(-50%)' } : side === 'left' ? { right: 24, top: '50%', transform: 'translateY(-50%)' } : { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }) }}>
            <span style={{ fontSize: 15, lineHeight: '20px', fontWeight: 600, color: tone(kit, 'fg-neutral', mode) }}>남은 연차 11일</span>
            <HelpBubbleControl
              key={`${desc}${close}${side}${brand}`}
              look={kit.bubble}
              mode={mode}
              title={LEAVE_RULE.title}
              description={desc === 'yes' ? LEAVE_RULE.description : undefined}
              closeButton={close === 'yes'}
              side={side}
              container={stage}
              trigger={(r) => <IconTrigger look={infos[brand]} mode={mode} icon="info" label="연차 사용 규정 안내" render={r} />}
            />
          </div>
        </div>
      }
      controls={
        <>
          <Seg label="설명" value={desc} options={YES_NO} onChange={setDesc} />
          <Seg label="닫기 버튼" value={close} options={YES_NO} onChange={setClose} />
          <Seg label="위치" value={side} options={SIDES} onChange={setSide} />
          <Seg label="브랜드" value={brand} options={BRANDS} onChange={setBrand} />
          <Seg label="모드" value={mode} options={MODES} onChange={setMode} />
        </>
      }
      code={code}
    />
  );
}

// ── Tooltip 플레이그라운드 ────────────────────────────────
export function TooltipPlayground({ kits, ghosts }: { kits: Record<Brand, MenuKit>; ghosts: Record<Brand, ButtonLook> }) {
  const [brand, setBrand] = useState<Brand>('desk');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [len, setLen] = useState<'short' | 'long'>('short');
  const [side, setSide] = useState<BubbleSide>('top');
  const [stage, setStage] = useState<HTMLDivElement | null>(null);
  const kit = kits[brand];
  const text = (t: (typeof TOOLBAR)[number]) => (t.value === 'reset' && len === 'long' ? LONG_TIP : t.label);
  const code = [
    'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"',
    '',
    '{/* 화면에 한 번 — 이어서 여는 툴팁은 기다리지 않는다 */}',
    '<TooltipProvider>',
    '  <Tooltip>',
    '    <TooltipTrigger asChild>',
    '      <Button variant="ghost" layout="iconOnly" aria-label="필터 초기화">',
    '        <RotateCcw />',
    '      </Button>',
    '    </TooltipTrigger>',
    `    <TooltipContent${side !== 'top' ? ` side="${side}"` : ''}>${len === 'long' ? LONG_TIP : '필터 초기화'}</TooltipContent>`,
    '  </Tooltip>',
    '</TooltipProvider>',
  ].join('\n');
  return (
    <PlayFrame
      stage={
        <div ref={setStage} data-brand={brand} className="relative w-full max-w-[560px] overflow-hidden rounded-xl" style={{ isolation: 'isolate', height: 260, background: tone(kit, 'bg-layer-default', mode), fontFamily: FONT }}>
          <div style={{ position: 'absolute', display: 'flex', gap: 4, ...(side === 'right' ? { left: 24, top: '50%', transform: 'translateY(-50%)' } : side === 'left' ? { right: 24, top: '50%', transform: 'translateY(-50%)' } : { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }) }}>
            <TooltipGroup>
              {TOOLBAR.map((t) => (
                <TooltipControl
                  key={`${t.value}${side}${len}${brand}`}
                  look={kit.bubble}
                  mode={mode}
                  text={text(t)}
                  side={side}
                  container={stage}
                  trigger={(r) => <ButtonView look={ghosts[brand]} mode={mode} icon={TOOL_ICON[t.value]} ariaLabel={t.label} buttonRef={r.ref} rootProps={r.props} />}
                />
              ))}
            </TooltipGroup>
          </div>
        </div>
      }
      controls={
        <>
          <Seg
            label="글(필터 초기화)"
            value={len}
            options={[
              ['short', '짧게(이름)'],
              ['long', '길게 — 두 줄'],
            ]}
            onChange={setLen}
          />
          <Seg label="위치" value={side} options={SIDES} onChange={setSide} />
          <Seg label="브랜드" value={brand} options={BRANDS} onChange={setBrand} />
          <Seg label="모드" value={mode} options={MODES} onChange={setMode} />
        </>
      }
      code={code}
    />
  );
}
