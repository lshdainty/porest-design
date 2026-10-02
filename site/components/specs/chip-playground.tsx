'use client';
// Chip 플레이그라운드 — 변형 · 크기 · 고르기 방식 · 아이콘 · 상태를 고르면 스펙대로 그린 칩 묶음과 그 코드가 바뀐다(실제로 누를 수 있다).
// 코드는 chip.md 의 "코드" 절과 같은 API(Chip · ChipToggle · ChipRadioGroup · ChipRadio · InputChip · ChipGroup)로 쓴다.
import { useMemo, useState } from 'react';
import type { ButtonLook } from './button-look';
import type { OvKit } from './overlay-shared';
import { ccv, type ChipLook, type ChipSize, type ChipVariant } from './chip-shared';
import { AMOUNTS, BudgetField, CONDS, FilterBarDemo, PEOPLE, PeopleField, TX_TYPES } from './chip-demos';
import { ChipField, ChipRadioGroupLive, ChipToggleGroupLive, type ChipItem } from './chip-view';
import { BRANDS, MODES, PlayFrame, Seg } from './select-playground';
import type { ViewMode } from './select-shared';
import type { TfFieldLook, TfInputLook } from './text-field-shared';

type Kind = 'single' | 'multi' | 'suggest' | 'filter' | 'input';
const KINDS = [
  ['single', '하나 고르기'],
  ['multi', '여럿 고르기'],
  ['suggest', '제안'],
  ['filter', '필터 바'],
  ['input', '입력값'],
] as const;
// 고르기 방식마다 스펙의 "쓰는 자리" 변형 — 방식을 바꾸면 그 변형으로 돌아간다
const KIND_VARIANT: Record<Kind, ChipVariant> = { single: 'outlineStrong', multi: 'outlineWeak', suggest: 'solid', filter: 'solid', input: 'outlineWeak' };
const VARIANT_KO: Record<ChipVariant, string> = { solid: 'Solid', outlineStrong: 'Outline Strong', outlineWeak: 'Outline Weak' };
const DISABLED = [
  ['none', '없음'],
  ['one', '한 칩'],
  ['all', '전체'],
] as const;
type Dis = (typeof DISABLED)[number][0];

// 여럿 고르기 — 카테고리(시트 안 고르기와 같은 값)
const CATS: ChipItem[] = [
  { value: 'food', label: '식비', icon: 'utensils' },
  { value: 'cafe', label: '카페', icon: 'coffee' },
  { value: 'transport', label: '교통', icon: 'bus' },
  { value: 'shopping', label: '쇼핑', icon: 'shopping-bag' },
];
const LUCIDE: Record<string, string> = {
  'arrow-up-right': 'ArrowUpRight',
  'arrow-down-left': 'ArrowDownLeft',
  'arrow-left-right': 'ArrowLeftRight',
  utensils: 'Utensils',
  coffee: 'Coffee',
  bus: 'Bus',
  'shopping-bag': 'ShoppingBag',
  banknote: 'Banknote',
  calendar: 'CalendarDays',
  tag: 'Tag',
  'credit-card': 'CreditCard',
  user: 'User',
};

const attr = (cond: boolean, s: string) => (cond ? [s] : []);
const jsx = (tag: string, attrs: string[], body: string) => `<${tag}${attrs.length ? ` ${attrs.join(' ')}` : ''}>${body}</${tag}>`;
const imports = (lucide: string[], ui: string[], field: boolean) =>
  `${lucide.length ? `import { ${[...new Set(lucide)].sort().join(', ')} } from "lucide-react"\n` : ''}${field ? 'import { Field } from "@/components/ui/field"\n' : ''}import { ${ui.join(', ')} } from "@/components/ui/chip"\n\n`;

function codeOf(kind: Kind, o: { variant: ChipVariant; size: ChipSize; icons: boolean; dis: Dis; defVariant: ChipVariant; defSize: ChipSize }) {
  const look = [...attr(o.variant !== o.defVariant, `variant="${o.variant}"`), ...attr(o.size !== o.defSize, `size="${o.size}"`)];
  const icon = (name?: string) => (o.icons && name ? [`prefixIcon={<${LUCIDE[name]} />}`] : []);
  const lucide = (names: (string | undefined)[]) => (o.icons ? names.filter((n): n is string => !!n).map((n) => LUCIDE[n]) : []);
  if (kind === 'single') {
    // 변형 · 크기는 칩마다(레시피의 ChipRadio), 막기는 묶음 전체(ChipRadioGroup) 또는 칩 하나
    const items = TX_TYPES.map((it, i) => `    ${jsx('ChipRadio', [...look, `value="${it.value}"`, ...icon(it.icon), ...attr(o.dis === 'one' && i === TX_TYPES.length - 1, 'disabled')], it.label)}`);
    return `${imports(lucide(TX_TYPES.map((i) => i.icon)), ['ChipRadio', 'ChipRadioGroup'], true)}<Field label="거래 종류">\n  <ChipRadioGroup ${[...attr(o.dis === 'all', 'disabled'), 'value={type}', 'onValueChange={setType}'].join(' ')}>\n${items.join('\n')}\n  </ChipRadioGroup>\n</Field>`;
  }
  if (kind === 'multi') {
    const items = CATS.map((it, i) =>
      `    ${jsx('ChipToggle', [...look, `checked={cats.includes("${it.value}")}`, `onCheckedChange={(on) => toggle("${it.value}", on)}`, ...icon(it.icon), ...attr(o.dis === 'all' || (o.dis === 'one' && i === CATS.length - 1), 'disabled')], it.label)}`,
    );
    return `${imports(lucide(CATS.map((i) => i.icon)), ['ChipGroup', 'ChipToggle'], true)}<Field label="카테고리" description="여럿 고를 수 있어요.">\n  <ChipGroup>\n${items.join('\n')}\n  </ChipGroup>\n</Field>`;
  }
  if (kind === 'suggest') {
    const last = AMOUNTS[AMOUNTS.length - 1];
    const dis = o.dis === 'all' ? ['disabled'] : o.dis === 'one' ? [`disabled={v === ${last}}`] : [];
    return `${imports(lucide(['banknote']), ['Chip', 'ChipGroup'], false)}<ChipGroup aria-label="빠른 금액">\n  {[${AMOUNTS.join(', ')}].map((v) => (\n    ${jsx('Chip', ['key={v}', ...look, ...icon('banknote'), ...dis, 'onClick={() => setAmount(v)}'], '{formatMan(v)}')}\n  ))}\n</ChipGroup>`;
  }
  if (kind === 'filter') {
    // 상태 이름은 chip.md 코드와 같게 — period · cats(+ pays)
    const name = { period: 'period', category: 'cats', pay: 'pays' } as const;
    const lines = CONDS.map((c, i) => {
      const n = name[c.key];
      const sel = c.kind === 'single' ? `selected={!!${n}}` : `selected={${n}.length > 0}`;
      const text = c.kind === 'single' ? `{${n} ? ${n}Label : "${c.label}"}` : `{${n}.length ? summarize(${n}) : "${c.label}"}`;
      const a = [...look, sel, ...icon(c.icon), 'suffixIcon={<ChevronDown />}', 'aria-haspopup="dialog"', ...attr(o.dis === 'all' || (o.dis === 'one' && i === CONDS.length - 1), 'disabled'), `onClick={() => open("${c.key}")}`];
      return `  <Chip ${a.join(' ')}>\n    ${text}\n  </Chip>`;
    });
    // 필터 지우기(↺)는 변형을 고르지 않는다 — 늘 Outline Strong(chip.md 코드와 같다)
    const reset = `  {active > 0 && ${jsx('Chip', ['variant="outlineStrong"', ...attr(o.size !== o.defSize, `size="${o.size}"`), 'layout="iconOnly"', 'aria-label="필터 지우기"', ...attr(o.dis === 'all', 'disabled'), 'onClick={reset}'], '<RotateCcw />')}}`;
    // 줄은 화면 끝까지(bleed) — 무대처럼 화면 여백 안에 둘 때
    return `${imports(['ChevronDown', 'RotateCcw', ...lucide(CONDS.map((c) => c.icon))], ['Chip', 'ChipGroup'], false)}<ChipGroup layout="scroll" bleed aria-label="거래 거르기">\n${reset}\n${lines.join('\n')}\n</ChipGroup>`;
  }
  const dis = o.dis === 'all' ? ['disabled'] : o.dis === 'one' ? [`disabled={p.id === "${PEOPLE[PEOPLE.length - 1].value}"}`] : [];
  return `${imports(lucide(['user']), ['ChipGroup', 'InputChip'], true)}<Field label="참여자" description="지우기로 한 명씩 빼요.">\n  <ChipGroup>\n    {people.map((p) => (\n      ${jsx('InputChip', ['key={p.id}', ...attr(o.size !== o.defSize, `size="${o.size}"`), ...icon('user'), ...dis, 'onRemove={() => removePerson(p.id)}'], '{p.name}')}\n    ))}\n  </ChipGroup>\n</Field>`;
}

export function ChipPlayground({ looks, field, input, cta, kits }: { looks: Record<'desk' | 'hr', ChipLook>; field: TfFieldLook; input: TfInputLook; cta: Record<'desk' | 'hr', ButtonLook>; kits: Record<'desk' | 'hr', OvKit> }) {
  const base = looks.desk;
  const [kind, setKindRaw] = useState<Kind>('single');
  const [variant, setVariant] = useState<ChipVariant>(KIND_VARIANT.single);
  const [size, setSize] = useState<ChipSize>(base.defaults.size);
  const [icons, setIcons] = useState<'none' | 'icon'>('none');
  const [dis, setDis] = useState<Dis>('none');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');
  const setKind = (k: Kind) => {
    setKindRaw(k);
    setVariant(KIND_VARIANT[k]);
  };
  const look = looks[brand];
  const withIcons = icons === 'icon';
  const code = useMemo(() => codeOf(kind, { variant, size, icons: withIcons, dis, defVariant: base.defaults.variant, defSize: base.defaults.size }), [kind, variant, size, withIcons, dis, base.defaults.variant, base.defaults.size]);
  const one = (items: ChipItem[]) => items.map((it, i) => ({ ...it, icon: withIcons ? it.icon : undefined, disabled: dis === 'one' && i === items.length - 1 }));
  const surface = ccv(look.tone['bg-layer-default'], mode);
  const key = JSON.stringify([kind, brand, dis, mode]);

  const stage =
    kind === 'single' ? (
      <ChipField key={key} field={field} mode={mode} label="거래 종류">
        {(ids) => <ChipRadioGroupLive look={look} mode={mode} variant={variant} size={size} items={one(TX_TYPES)} defaultValue="expense" disabled={dis === 'all'} ariaLabelledby={ids.labelledBy} />}
      </ChipField>
    ) : kind === 'multi' ? (
      <ChipField key={key} field={field} mode={mode} label="카테고리" description="여럿 고를 수 있어요.">
        {(ids) => <ChipToggleGroupLive look={look} mode={mode} variant={variant} size={size} items={one(CATS)} defaultValue={['food', 'transport']} disabled={dis === 'all'} ariaLabelledby={ids.labelledBy} ariaDescribedby={ids.describedBy} />}
      </ChipField>
    ) : kind === 'suggest' ? (
      <BudgetField key={key} look={look} field={field} input={input} mode={mode} variant={variant} size={size} icons={withIcons} disabled={dis} />
    ) : kind === 'filter' ? (
      // 필터 바는 줄을 화면 끝까지 낸다 — 무대(360) 자체를 화면으로 쓰고 시트도 그 안에서 연다
      <div className="-mx-4 sm:mx-0">
        <FilterBarDemo key={key} look={look} kit={kits[brand]} cta={cta[brand]} mode={mode} variant={variant} size={size} icons={withIcons} disabled={dis} list={false} height={300} keys={['period', 'category', 'pay']} />
      </div>
    ) : (
      <PeopleField key={key} look={look} field={field} mode={mode} size={size} icons={withIcons} disabled={dis} />
    );

  return (
    <PlayFrame
      surface={surface}
      code={code}
      stage={stage}
      controls={
        <>
          <Seg label="고르기 방식" value={kind} options={KINDS} onChange={setKind} />
          {kind === 'input' ? (
            <div className="flex flex-col gap-1.5 text-[12px] text-fd-muted-foreground">
              <span className="font-medium">변형 variant</span>
              <span>입력값 칩은 Outline Weak 고른 모습 하나다.</span>
            </div>
          ) : (
            <Seg label="변형 variant" value={variant} options={(['solid', 'outlineStrong', 'outlineWeak'] as const).map((v) => [v, `${VARIANT_KO[v]}${v === base.defaults.variant ? '(기본)' : ''}`] as const)} onChange={setVariant} />
          )}
          <Seg label="크기 size" value={size} options={(['small', 'medium', 'large'] as const).map((s) => [s, `${s} ${base.sizes[s].h}${s === base.defaults.size ? '(기본)' : ''}`] as const)} onChange={setSize} />
          <Seg label="앞 아이콘 prefixIcon" value={icons} options={[['none', '없음'], ['icon', '있음']] as const} onChange={setIcons} />
          <Seg label="비활성 disabled" value={dis} options={DISABLED} onChange={setDis} />
          <div className="flex flex-wrap gap-5">
            <Seg label="모드" value={mode} options={MODES} onChange={setMode} />
            <Seg label="브랜드" value={brand} options={BRANDS} onChange={setBrand} />
          </div>
        </>
      }
    />
  );
}
