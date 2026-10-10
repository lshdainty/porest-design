'use client';
// Color Swatch 플레이그라운드 · 코드 미리보기 — 고른 색 · 지금 색 칸(없음 · 팔레트 밖 · 색 없음) · 막힘을 고르면 스펙대로 그린 묶음(swatch-view —
// color-swatch.yaml)과 그 코드가 바뀐다. 칸을 누르거나, 칸에 초점을 두고 ← → ↑ ↓ 로 옮겨 볼 수 있다 — 화면 읽기 프로그램이 읽는 말이 함께 바뀐다.
// 묶음 이름 · 설명은 Field(field.yaml — text-field-view). 코드는 color-swatch.md 의 "코드" 절과 같은 API 다.
// 묶음은 놓인 자리의 폭을 재서 지금 색 칸을 옆에 두거나 위 줄에 쌓고(divider.stackBelow), 마우스를 올리면 칸 이름 툴팁을 띄운다.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { CURRENT, FONT, firstUnused, icv, type IColor, type SwatchCurrent, type SwatchLook, type ViewMode } from './input-shared';
import type { BubbleLook } from './menu-shared';
import { BRANDS, MODES, PlayFrame, Seg } from './select-playground';
import { SwatchGroupView } from './swatch-view';
import type { TfFieldLook } from './text-field-shared';
import { TfFieldView } from './text-field-view';
import { Readout } from './toggle-play';

type Brand = 'desk' | 'hr';
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// 판에 맞춰 줄여 그리기 — 놓인 자리의 폭을 재서 그림의 제 폭(w)이 들어가지 않으면 줄인다(최대 max).
// 레이아웃도 함께 줄도록 zoom 을 쓴다(높이를 따로 셀 필요가 없다). 줄 바꿈 자리(flex-wrap)에서는 제 폭으로 놓였다가 줄만 바뀐다
export function AutoFit({ w, max = 1, children }: { w: number; max?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [s, setS] = useState(max);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => setS(Math.min(max, el.clientWidth / w));
    on();
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, max]);
  return (
    <div ref={ref} data-autofit="" style={{ flex: '0 1 auto', width: w * max, minWidth: 0, maxWidth: '100%' }}>
      <div style={{ width: w, zoom: s }}>{children}</div>
    </div>
  );
}

// Field + 묶음 — 라벨이 묶음 이름(span id → radiogroup aria-labelledby). 놓인 자리의 폭을 받도록 블록으로 늘이되 옆으로 둔 폭보다
// 넓히지 않는다(가운데) — 그 폭이 stackBelow 보다 좁으면 묶음이 지금 색 칸을 위 줄에 쌓는다
export function SwatchField({ look, field, mode = 'auto', value, onValueChange, current, disabled = false, onFocusName, label = '색상', tip }: { look: SwatchLook; field: TfFieldLook; mode?: ViewMode; value?: string; onValueChange?: (v: string) => void; current?: SwatchCurrent; disabled?: boolean; onFocusName?: (t: string) => void; label?: string; tip?: BubbleLook }) {
  const sideW = current ? look.divider.stackBelow : look.width;
  return (
    <div style={{ width: '100%', maxWidth: sideW, marginLeft: 'auto', marginRight: 'auto' }}>
      <TfFieldView look={field} mode={mode} group label={<span style={{ color: disabled ? icv(look.labelDisabled, mode) : undefined }}>{label}</span>}>
        {(ctl) => <SwatchGroupView look={look} mode={mode} live value={value} onValueChange={onValueChange} current={current} disabled={disabled} labelledBy={ctl.labelId} describedBy={ctl.describedBy} onFocusName={onFocusName} stack="auto" tip={tip} />}
      </TfFieldView>
    </div>
  );
}

const nameOf = (look: SwatchLook, v: string | undefined, current?: SwatchCurrent) =>
  v === CURRENT ? (current?.kind === 'auto' ? look.names.auto : look.names.current) : (look.colors.find((c) => c.key === v)?.name ?? '');
const readOf = (look: SwatchLook, v: string | undefined, current?: SwatchCurrent) => {
  const n = look.colors.length + (current ? 1 : 0);
  const i = v === CURRENT ? 0 : look.colors.findIndex((c) => c.key === v) + (current ? 1 : 0);
  return v ? `${nameOf(look, v, current)}, 라디오, ${i + 1}/${n}, 선택됨` : '고른 칸 없음';
};

export function SwatchPlayground({ looks, fields, surface, tips }: { looks: Record<Brand, SwatchLook>; fields: Record<Brand, TfFieldLook>; surface: IColor; tips: Record<Brand, BubbleLook> }) {
  const [cur, setCur] = useState<'none' | 'custom' | 'auto'>('none');
  const [value, setValue] = useState<string>('red');
  const [disabled, setDisabled] = useState<'no' | 'yes'>('no');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [brand, setBrand] = useState<Brand>('desk');
  const look = looks[brand];
  const current: SwatchCurrent | undefined = cur === 'custom' ? { kind: 'custom', hex: look.custom.hex } : cur === 'auto' ? { kind: 'auto', color: 'brown' } : undefined;
  const [said, setSaid] = useState('');
  const code = useMemo(() => {
    const attrs = ['value={color}', 'onValueChange={setColor}', ...(cur === 'custom' ? [`currentColor="${look.custom.hex}"`] : []), ...(cur === 'auto' ? ['autoColor={chartColorOf(item.id)}'] : []), ...(disabled === 'yes' ? ['disabled'] : [])];
    const init = value === CURRENT ? '"current"' : `"${value}"`;
    return [
      'import { useState } from "react"',
      'import type { ChartColor } from "@/components/ui/chart"',
      'import { ColorSwatchGroup } from "@/components/ui/color-swatch"',
      'import { Field } from "@/components/ui/field"',
      '',
      `const [color, setColor] = useState<ChartColor | "current">(${init})`,
      '',
      '<Field label="색상">',
      `  <ColorSwatchGroup ${attrs.join(' ')} />`,
      '</Field>',
    ].join('\n');
  }, [cur, value, disabled, look.custom.hex]);
  const setCurrent = (v: 'none' | 'custom' | 'auto') => {
    setCur(v);
    // 지금 색 칸이 생기면 처음에는 그 칸이 골라져 있다 — 없애면 첫 색
    setValue(v === 'none' ? (value === CURRENT ? 'red' : value) : CURRENT);
  };
  const stage = (
    <div className="flex flex-col items-center gap-4" style={{ fontFamily: FONT }}>
      {/* 폭 전체 — 묶음이 놓인 자리의 폭을 재서 좁으면(폰) 지금 색 칸을 위 줄에 쌓는다 */}
      <div className="w-full px-2 py-2">
        <SwatchField key={`${brand}${cur}`} look={look} field={fields[brand]} mode={mode} value={value} onValueChange={(v) => (setValue(v), setSaid(''))} current={current} disabled={disabled === 'yes'} onFocusName={setSaid} tip={tips[brand]} />
      </div>
      <Readout text={said || readOf(look, value, current)} mode={mode} />
    </div>
  );
  return (
    <PlayFrame
      surface={icv(surface, mode)}
      code={code}
      stage={stage}
      controls={
        <>
          <Seg label="고른 색 value" value={value} options={[...(current ? [[CURRENT, current.kind === 'auto' ? look.names.auto : look.names.current] as const] : []), ...look.colors.map((c) => [c.key, c.name] as const)]} onChange={setValue} />
          <Seg
            label="지금 색 칸"
            value={cur}
            options={[
              ['none', '없음 — 팔레트 색'],
              ['custom', `팔레트 밖 ${look.custom.hex}`],
              ['auto', '색 없음 — 자동'],
            ]}
            onChange={setCurrent}
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

// ── 코드 미리보기 ─────────────────────────────────────────
function Frame({ children, bg }: { children: ReactNode; bg: string }) {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl bg-[#E9E9EC] p-4 dark:bg-fd-muted sm:p-6">
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-center gap-4 rounded-xl px-4 py-6" style={{ background: bg, fontFamily: FONT }}>
          {children}
        </div>
      </div>
    </figure>
  );
}

// 새 카테고리 — 같은 목록이 쓰지 않은 첫 색으로 시작(기본 지출 카테고리 여덟이 쓰는 색을 빼면 갈색)
export function SwatchNewDemo({ look, field, used, surface, tip }: { look: SwatchLook; field: TfFieldLook; used: string[]; surface: IColor; tip?: BubbleLook }) {
  const [color, setColor] = useState<string>(() => firstUnused(look, used));
  const [said, setSaid] = useState('');
  return (
    <Frame bg={icv(surface, 'auto')}>
      <SwatchField look={look} field={field} value={color} onValueChange={setColor} onFocusName={setSaid} tip={tip} />
      <Readout text={said || readOf(look, color)} />
    </Frame>
  );
}
// 고치기 — 팔레트 밖 색(가져온 #9E9E9E): "지금 색" 이 골라져 있고, 고르지 않고 저장하면 그대로
export function SwatchEditDemo({ look, field, surface, tip }: { look: SwatchLook; field: TfFieldLook; surface: IColor; tip?: BubbleLook }) {
  const current: SwatchCurrent = { kind: 'custom', hex: look.custom.hex };
  const [picked, setPicked] = useState<string>(CURRENT);
  const [said, setSaid] = useState('');
  return (
    <Frame bg={icv(surface, 'auto')}>
      <SwatchField look={look} field={field} value={picked} onValueChange={setPicked} current={current} onFocusName={setSaid} tip={tip} />
      <Readout text={said || readOf(look, picked, current)} />
      <p className="m-0 text-center text-[12px] leading-5 text-fd-muted-foreground">{picked === CURRENT ? `저장하면 ${look.custom.hex} 그대로예요.` : `저장하면 ${nameOf(look, picked)}(으)로 바뀌어요.`}</p>
    </Frame>
  );
}
// 색 없는 항목 — "자동"(차트가 줄 색을 점선 원으로)
export function SwatchAutoDemo({ look, field, surface, auto, tip }: { look: SwatchLook; field: TfFieldLook; surface: IColor; auto: string; tip?: BubbleLook }) {
  const current: SwatchCurrent = { kind: 'auto', color: auto };
  const [picked, setPicked] = useState<string>(CURRENT);
  const [said, setSaid] = useState('');
  return (
    <Frame bg={icv(surface, 'auto')}>
      <SwatchField look={look} field={field} value={picked} onValueChange={setPicked} current={current} onFocusName={setSaid} tip={tip} />
      <Readout text={said || readOf(look, picked, current)} />
      <p className="m-0 text-center text-[12px] leading-5 text-fd-muted-foreground">{picked === CURRENT ? '저장하면 색 없음 그대로 — 차트가 쓰지 않은 색을 줘요.' : `저장하면 ${nameOf(look, picked)}(으)로 정해져요.`}</p>
    </Frame>
  );
}
