'use client';
// Radio 플레이그라운드 — 속성을 고르면 스펙대로 그린 Radio 묶음과 그 코드가 바로 바뀐다.
// 색 조각(톤마다) · 치수 조각(크기마다) · 굵기를 합쳐 RadioLook 을 만든다(radio-group-shared 의 composeRadioLook).
import { useMemo, useState } from 'react';
import { composeRadioLook, type RadioParts } from './radio-group-shared';
import { RadioGroupView } from './radio-group-view';

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

const OPTIONS = [
  ['none', '반복 없음'],
  ['daily', '매일'],
  ['weekly', '매주'],
] as const;

export function RadioPlayground({ parts, gap }: { parts: Record<'desk' | 'hr', RadioParts>; gap: string }) {
  const [size, setSize] = useState('medium');
  const [tone, setTone] = useState('neutral');
  const [weight, setWeight] = useState('regular');
  const [initial, setInitial] = useState<'first' | 'none'>('first');
  const [disabled, setDisabled] = useState<'no' | 'one' | 'all'>('no');
  const [mode, setMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');

  const look = useMemo(() => composeRadioLook(parts[brand], { size, tone, weight }), [parts, brand, size, tone, weight]);

  const code = useMemo(() => {
    const attrs: string[] = [];
    if (size !== 'medium') attrs.push(`size="${size}"`);
    if (tone !== 'neutral') attrs.push(`tone="${tone}"`);
    if (weight !== 'regular') attrs.push(`weight="${weight}"`);
    const group = [initial === 'first' ? 'defaultValue="none"' : '', disabled === 'all' ? 'disabled' : '', 'aria-label="반복"'].filter(Boolean).join(' ');
    const rows = OPTIONS.map(([v, t], i) => `  <Radio value="${v}"${attrs.length ? ` ${attrs.join(' ')}` : ''}${disabled === 'one' && i === 2 ? ' disabled' : ''} label="${t}" />`);
    return `import { Radio, RadioGroup } from "@/components/ui/radio-group"\n\n<RadioGroup ${group}>\n${rows.join('\n')}\n</RadioGroup>`;
  }, [size, tone, weight, initial, disabled]);

  const surface = mode === 'auto' ? 'var(--p-bg-layer-default)' : parts[brand].surface[mode];
  const off = disabled === 'all' ? [0, 1, 2] : disabled === 'one' ? [2] : [];

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border">
      <div className="flex min-h-[180px] items-center justify-center px-6 py-10" style={{ background: surface }}>
        <RadioGroupView key={`${initial}-${disabled}`} look={look} mode={mode} items={OPTIONS.map(([, t]) => t)} initial={initial === 'first' ? 0 : undefined} disabled={off} gap={gap} ariaLabel="반복" />
      </div>
      <div className="grid gap-4 border-t border-fd-border bg-fd-card p-5 sm:grid-cols-2">
        <Seg label="크기 size" value={size} options={[['medium', 'medium'], ['large', 'large']] as const} onChange={setSize} />
        <Seg label="톤 tone" value={tone} options={[['neutral', 'neutral'], ['brand', 'brand']] as const} onChange={setTone} />
        <Seg label="굵기 weight" value={weight} options={[['regular', 'regular'], ['bold', 'bold']] as const} onChange={setWeight} />
        <Seg label="처음 상태" value={initial} options={[['first', '첫 선택지를 골라 둠'], ['none', '고르지 않음']] as const} onChange={setInitial} />
        <Seg label="비활성" value={disabled} options={[['no', '아니요'], ['one', '선택지 하나'], ['all', '묶음 전체']] as const} onChange={setDisabled} />
        <div className="flex flex-wrap gap-5">
          <Seg label="모드" value={mode} options={[['auto', '사이트 따라'], ['light', '라이트'], ['dark', '다크']] as const} onChange={setMode} />
          <Seg label="브랜드" value={brand} options={[['desk', 'Desk'], ['hr', 'HR']] as const} onChange={setBrand} />
        </div>
      </div>
      <pre className="overflow-x-auto border-t border-fd-border bg-fd-secondary/50 px-5 py-4 text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}
