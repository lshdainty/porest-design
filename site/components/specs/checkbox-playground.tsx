'use client';
// Checkbox 플레이그라운드 — 속성을 고르면 스펙대로 그린 Checkbox 와 그 코드가 바로 바뀐다.
// 색 조각(모양 · 톤마다) · 치수 조각(크기 · 모양마다) · 굵기를 합쳐 CheckLook 을 만든다(checkbox-shared 의 composeCheckLook).
import { useMemo, useState } from 'react';
import { composeCheckLook, type CheckParts, type Checked } from './checkbox-shared';
import { CheckboxView } from './checkbox-view';

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

export function CheckboxPlayground({ parts }: { parts: Record<'desk' | 'hr', CheckParts> }) {
  const [size, setSize] = useState('medium');
  const [shape, setShape] = useState('square');
  const [tone, setTone] = useState('neutral');
  const [weight, setWeight] = useState('regular');
  const [checked, setChecked] = useState<Checked>('checked');
  const [disabled, setDisabled] = useState<'no' | 'yes'>('no');
  const [mode, setMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');
  const [label, setLabel] = useState('단종된 카드도 보기');

  const look = useMemo(() => composeCheckLook(parts[brand], { size, shape, tone, weight }), [parts, brand, size, shape, tone, weight]);

  const code = useMemo(() => {
    const attrs: string[] = [];
    if (size !== 'medium') attrs.push(`size="${size}"`);
    if (shape !== 'square') attrs.push(`shape="${shape}"`);
    if (tone !== 'neutral') attrs.push(`tone="${tone}"`);
    if (weight !== 'regular') attrs.push(`weight="${weight}"`);
    if (checked === 'checked') attrs.push('defaultChecked');
    if (checked === 'indeterminate') attrs.push('checked="indeterminate"');
    if (disabled === 'yes') attrs.push('disabled');
    attrs.push(`label="${label}"`);
    return `import { Checkbox } from "@/components/ui/checkbox"\n\n<Checkbox ${attrs.join(' ')} />`;
  }, [size, shape, tone, weight, checked, disabled, label]);

  const surface = mode === 'auto' ? 'var(--p-bg-layer-default)' : parts[brand].surface[mode];

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border">
      <div className="flex min-h-[160px] items-center justify-center px-6 py-10" style={{ background: surface }}>
        <CheckboxView
          key={`${checked}-${disabled}`}
          look={look}
          mode={mode}
          defaultChecked={checked}
          state={disabled === 'yes' ? 'disabled' : 'live'}
          label={label}
        />
      </div>
      <div className="grid gap-4 border-t border-fd-border bg-fd-card p-5 sm:grid-cols-2">
        <Seg label="크기 size" value={size} options={[['medium', 'medium'], ['large', 'large']] as const} onChange={setSize} />
        <Seg label="모양 shape" value={shape} options={[['square', 'square'], ['ghost', 'ghost']] as const} onChange={setShape} />
        <Seg label="톤 tone" value={tone} options={[['neutral', 'neutral'], ['brand', 'brand']] as const} onChange={setTone} />
        <Seg label="굵기 weight" value={weight} options={[['regular', 'regular'], ['bold', 'bold']] as const} onChange={setWeight} />
        <Seg label="처음 상태" value={checked} options={[['unchecked', '선택 안 됨'], ['checked', '선택'], ['indeterminate', '일부 선택']] as const} onChange={setChecked} />
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
