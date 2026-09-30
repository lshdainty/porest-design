'use client';
// 버튼 플레이그라운드 — 속성을 고르면 스펙대로 그린 버튼과 그 코드가 바로 바뀐다.
// 색 조각(변형마다)과 치수 조각(크기 × 배치마다)을 합쳐 ButtonView 가 받는 모양을 만든다(button-look 의 buttonParts).
import { useMemo, useState, type ReactNode } from 'react';
import type { ButtonFace, ButtonLook, ButtonParts, ButtonState } from './button-look';
import { ButtonView } from './button-view';

const VARIANTS = ['brandSolid', 'neutralSolid', 'neutralWeak', 'criticalSolid', 'brandOutline', 'neutralOutline', 'ghost'];
const SIZES = ['xsmall', 'small', 'medium', 'large'];
const GHOST = ['neutral', 'neutralSubtle', 'brand', 'critical'];
const LAYOUTS = [
  ['text', '글자만'],
  ['prefix', '앞 아이콘'],
  ['suffix', '뒤 아이콘'],
  ['iconOnly', '아이콘만'],
] as const;
const STATES = [
  ['live', '직접 누르기'],
  ['loading', '로딩'],
  ['disabled', '비활성'],
] as const;

function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly (readonly [T, string])[] | T[]; onChange: (v: T) => void }) {
  const opts = options.map((o) => (Array.isArray(o) ? o : [o, o])) as [T, string][];
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium text-fd-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1">
        {opts.map(([v, t]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`rounded-md border px-2.5 py-1 text-[12px] transition-colors ${
              v === value ? 'border-fd-foreground bg-fd-foreground text-fd-background' : 'border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ButtonPlayground({ parts }: { parts: Record<'desk' | 'hr', ButtonParts> }) {
  const [variant, setVariant] = useState('neutralSolid');
  const [size, setSize] = useState('medium');
  const [layout, setLayout] = useState<(typeof LAYOUTS)[number][0]>('text');
  const [ghostColor, setGhostColor] = useState('neutral');
  const [state, setState] = useState<(typeof STATES)[number][0]>('live');
  const [width, setWidth] = useState<'hug' | 'fill'>('hug');
  const [mode, setMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');
  const [label, setLabel] = useState('저장');

  const iconOnly = layout === 'iconOnly';
  const look = useMemo<ButtonLook>(() => {
    const p = parts[brand];
    const colors = p.colors[variant === 'ghost' ? `ghost:${ghostColor}` : variant];
    const dims = p.sizes[size][iconOnly ? 'iconOnly' : 'withText'];
    const faces = { light: {}, dark: {} } as ButtonLook['faces'];
    for (const m of ['light', 'dark'] as const)
      for (const st of Object.keys(colors[m]) as ButtonState[]) {
        const c = colors[m][st];
        faces[m][st] = { ...dims, bg: c.bg, fg: c.fg, border: c.border, borderWidth: c.borderWidth, labelColor: c.labelColor, cursor: c.cursor, progress: { ...dims.progress, track: c.track, range: c.range }, ring: { ...dims.ring, color: c.ringColor } } as ButtonFace;
      }
    return { combo: { variant, size, layout: iconOnly ? 'iconOnly' : 'withText', ghostColor }, faces, press: p.press, textPressedFg: p.textPressedFg };
  }, [parts, brand, variant, ghostColor, size, iconOnly]);

  const code = useMemo(() => {
    const attrs: string[] = [];
    if (variant !== 'neutralSolid') attrs.push(`variant="${variant}"`);
    if (variant === 'ghost' && ghostColor !== 'neutral') attrs.push(`ghostColor="${ghostColor}"`);
    if (size !== 'medium') attrs.push(`size="${size}"`);
    if (iconOnly) attrs.push('layout="iconOnly"', `aria-label="${label}"`);
    if (state === 'disabled') attrs.push('disabled');
    if (state === 'loading') attrs.push('loading');
    if (width === 'fill') attrs.push('className="w-full"');
    const open = `<Button${attrs.length ? ' ' + attrs.join(' ') : ''}>`;
    const body = iconOnly ? '<Plus />' : layout === 'prefix' ? `<Plus />${label}` : layout === 'suffix' ? `${label}<ChevronRight />` : label;
    const imports = layout === 'prefix' || iconOnly ? 'import { Plus } from "lucide-react"\n' : layout === 'suffix' ? 'import { ChevronRight } from "lucide-react"\n' : '';
    return `import { Button } from "@/components/ui/button"\n${imports}\n${open}${body}</Button>`;
  }, [variant, ghostColor, size, iconOnly, layout, label, state, width]);

  const shownState: ButtonState | 'live' = state === 'live' ? 'live' : state;
  const surface = mode === 'auto' ? 'var(--p-bg-layer-default)' : parts[brand].surface[mode];

  let preview: ReactNode = (
    <ButtonView
      look={look}
      mode={mode}
      state={shownState}
      label={label}
      prefix={layout === 'prefix' ? 'plus' : undefined}
      suffix={layout === 'suffix' ? 'chevron-right' : undefined}
      icon={iconOnly ? 'plus' : undefined}
      ariaLabel={iconOnly ? label : undefined}
      fill={width === 'fill'}
    />
  );
  if (width === 'fill') preview = <div className="w-full max-w-[360px]">{preview}</div>;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border">
      <div className="flex min-h-[200px] items-center justify-center px-6 py-10" style={{ background: surface }}>
        {preview}
      </div>
      <div className="grid gap-4 border-t border-fd-border bg-fd-card p-5 sm:grid-cols-2">
        <Seg label="변형 variant" value={variant} options={VARIANTS} onChange={setVariant} />
        <Seg label="크기 size" value={size} options={SIZES} onChange={setSize} />
        <Seg label="배치 layout" value={layout} options={LAYOUTS} onChange={setLayout} />
        {variant === 'ghost' ? <Seg label="ghost 글자색 ghostColor" value={ghostColor} options={GHOST} onChange={setGhostColor} /> : <div className="hidden sm:block" />}
        <Seg label="상태" value={state} options={STATES} onChange={setState} />
        <div className="flex flex-wrap gap-5">
          <Seg label="너비" value={width} options={[['hug', '내용 맞춤'], ['fill', '채움']] as const} onChange={setWidth} />
          <Seg label="모드" value={mode} options={[['auto', '사이트 따라'], ['light', '라이트'], ['dark', '다크']] as const} onChange={setMode} />
          <Seg label="브랜드" value={brand} options={[['desk', 'Desk'], ['hr', 'HR']] as const} onChange={setBrand} />
        </div>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-[12px] font-medium text-fd-muted-foreground">라벨</span>
          <input value={label} onChange={(e) => setLabel(e.target.value)} className="h-8 rounded-md border border-fd-border bg-fd-background px-2.5 text-[13px]" />
        </label>
      </div>
      <pre className="overflow-x-auto border-t border-fd-border bg-fd-secondary/50 px-5 py-4 text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}
