'use client';
// Switch 플레이그라운드 — 속성을 고르면 스펙대로 그린 Switch 와 그 코드가 바로 바뀐다.
// 색 조각(톤마다) · 치수 조각(크기마다)을 합쳐 SwitchLook 을 만든다(switch-shared 의 composeSwitchLook).
import { useMemo, useState } from 'react';
import { composeSwitchLook, type SwitchParts } from './switch-shared';
import { SwitchView } from './switch-view';

function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly (readonly [T, string])[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium text-fd-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map(([v, t]) => (
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

export function SwitchPlayground({ parts, sizes, defaultSize }: { parts: Record<'desk' | 'hr', SwitchParts>; sizes: string[]; defaultSize: string }) {
  const [size, setSize] = useState(defaultSize);
  const [tone, setTone] = useState('neutral');
  const [initial, setInitial] = useState<'on' | 'off'>('on');
  const [disabled, setDisabled] = useState<'no' | 'yes'>('no');
  const [mode, setMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');
  const [label, setLabel] = useState('종일');

  const look = useMemo(() => composeSwitchLook(parts[brand], { size, tone }), [parts, brand, size, tone]);

  const code = useMemo(() => {
    const attrs: string[] = [];
    if (size !== defaultSize) attrs.push(`size="${size}"`);
    if (tone !== 'neutral') attrs.push(`tone="${tone}"`);
    if (initial === 'on') attrs.push('defaultChecked');
    if (disabled === 'yes') attrs.push('disabled');
    attrs.push(`label="${label}"`);
    return `import { Switch } from "@/components/ui/switch"\n\n<Switch ${attrs.join(' ')} />`;
  }, [size, tone, initial, disabled, label, defaultSize]);

  const surface = mode === 'auto' ? 'var(--p-bg-layer-default)' : parts[brand].surface[mode];

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border">
      <div className="flex min-h-[160px] items-center justify-center px-6 py-10" style={{ background: surface }}>
        <SwitchView key={`${initial}-${disabled}`} look={look} mode={mode} defaultChecked={initial === 'on'} state={disabled === 'yes' ? 'disabled' : 'live'} label={label} />
      </div>
      <div className="grid gap-4 border-t border-fd-border bg-fd-card p-5 sm:grid-cols-2">
        <Seg label="크기 size" value={size} options={sizes.map((s) => [s, s] as const)} onChange={setSize} />
        <Seg label="톤 tone" value={tone} options={[['neutral', 'neutral'], ['brand', 'brand']] as const} onChange={setTone} />
        <Seg label="처음 상태" value={initial} options={[['on', '켬'], ['off', '끔']] as const} onChange={setInitial} />
        <Seg label="비활성" value={disabled} options={[['no', '아니요'], ['yes', '비활성']] as const} onChange={setDisabled} />
        <div className="flex flex-wrap gap-5">
          <Seg label="모드" value={mode} options={[['auto', '사이트 따라'], ['light', '라이트'], ['dark', '다크']] as const} onChange={setMode} />
          <Seg label="브랜드" value={brand} options={[['desk', 'Desk'], ['hr', 'HR']] as const} onChange={setBrand} />
        </div>
        <label className="flex flex-col gap-1.5">
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
