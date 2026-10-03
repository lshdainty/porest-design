'use client';
// Input Button 플레이그라운드 — 크기 · 상태 · 붙이개 · 지우기를 고르면 스펙대로 그린 칸과 그 코드가 바뀐다.
// 누르면 이 창의 폭에 맞는 자리(1280 미만 시트 · 이상 팝오버)가 열리고, 카테고리 격자에서 누르면 바로 고르고 닫힌다
// (1 ~ 31 처럼 짧은 선택지 목록은 Select 의 몫이라 Input Button 으로 열지 않는다 — 격자 · 달력 · 휠 · 긴 목록만).
import { useMemo, useState } from 'react';
import type { ButtonLook } from './button-look';
import { InputButtonDemo } from './input-button-pickers';
import type { OvKit } from './overlay-shared';
import { BRANDS, MODES, PlayFrame, SIZES, STATES, Seg } from './select-playground';
import type { SelSizeProp, SelectLook, ViewMode } from './select-shared';
import type { TfFieldLook } from './text-field-shared';

const attr = (cond: boolean, s: string) => (cond ? [s] : []);

export function InputButtonPlayground({ looks, field, done, kits }: { looks: Record<'desk' | 'hr', SelectLook>; field: TfFieldLook; done: Record<'desk' | 'hr', { sheet: ButtonLook; popover: ButtonLook }>; kits: Record<'desk' | 'hr', OvKit> }) {
  const [size, setSize] = useState<SelSizeProp>('responsive');
  const [state, setState] = useState<(typeof STATES)[number][0]>('enabled');
  const [prefix, setPrefix] = useState<'none' | 'icon' | 'text'>('icon');
  const [suffix, setSuffix] = useState<'none' | 'icon'>('icon');
  const [clear, setClear] = useState<'no' | 'yes'>('no');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');

  const code = useMemo(() => {
    const fieldAttrs = ['label="카테고리"', ...attr(clear === 'yes', 'indicator="선택"'), ...attr(state === 'invalid', 'invalid errorMessage="카테고리를 골라주세요."'), ...attr(state === 'disabled', 'disabled'), ...attr(state === 'readonly', 'readOnly')];
    const ib = [
      'placeholder="카테고리 선택"',
      'value={category?.name}',
      ...attr(size !== 'responsive', `size="${size}"`),
      ...attr(prefix === 'icon', 'prefixIcon={category ? <CategoryIcon category={category} /> : undefined}'),
      ...attr(prefix === 'text', 'prefix="지출"'),
      ...attr(suffix === 'icon', 'suffixIcon={<ChevronDown />}'),
      ...attr(clear === 'yes', 'onClear={() => setCategory(undefined)}'),
      'aria-haspopup="dialog"',
      'aria-expanded={open}',
      'onClick={() => setOpen(true)}',
    ];
    const head = `${suffix === 'icon' ? 'import { ChevronDown } from "lucide-react"\n' : ''}import { Field } from "@/components/ui/field"\nimport { InputButton } from "@/components/ui/input-button"\n\n`;
    return `${head}<Field ${fieldAttrs.join(' ')}>\n  <InputButton\n    ${ib.join('\n    ')}\n  />\n</Field>\n{/* useInputButtonSurface() — 1280 미만 시트(BottomSheet) · 이상 팝오버(PopoverTrigger asChild 로 감싼다). 격자에서 누르면 setCategory(c) · setOpen(false) */}`;
  }, [size, state, prefix, suffix, clear]);

  const look = looks[brand];
  const surface = mode === 'auto' ? `var(--p-${look.tone['bg-layer-default'].name})` : look.tone['bg-layer-default'][mode];
  return (
    <PlayFrame
      surface={surface}
      code={code}
      stage={
        <InputButtonDemo
          key={JSON.stringify([state, brand, prefix, suffix, clear])}
          look={look}
          kit={kits[brand]}
          field={field}
          mode={mode}
          size={size}
          kind="category"
          label="카테고리"
          placeholder="카테고리 선택"
          indicator={clear === 'yes' ? 'optional' : undefined}
          invalid={state === 'invalid'}
          errorMessage="카테고리를 골라주세요."
          disabled={state === 'disabled'}
          readOnly={state === 'readonly'}
          clearable={clear === 'yes'}
          initial={state === 'invalid' ? undefined : 'lunch'}
          affix={{ prefix, suffix }}
          done={done[brand]}
        />
      }
      controls={
        <>
          <Seg label="크기 size" value={size} options={SIZES} onChange={setSize} />
          <Seg label="상태" value={state} options={STATES} onChange={setState} />
          <Seg label="앞 붙이개" value={prefix} options={[['icon', '아이콘 prefixIcon(고른 카테고리)'], ['text', '글자 prefix'], ['none', '없음']] as const} onChange={setPrefix} />
          <Seg label="뒤 붙이개" value={suffix} options={[['icon', '아이콘 suffixIcon'], ['none', '없음']] as const} onChange={setSuffix} />
          <Seg label="지우기 onClear(선택 사항인 칸)" value={clear} options={[['no', '없음'], ['yes', '있음']] as const} onChange={setClear} />
          <div className="flex flex-wrap gap-5">
            <Seg label="모드" value={mode} options={MODES} onChange={setMode} />
            <Seg label="브랜드" value={brand} options={BRANDS} onChange={setBrand} />
          </div>
        </>
      }
    />
  );
}
