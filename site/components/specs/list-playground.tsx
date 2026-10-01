'use client';
// List 플레이그라운드 — 속성을 고르면 스펙대로 그린 줄과 그 코드가 바로 바뀐다(실제로 눌러 볼 수 있다).
import { useMemo, useState } from 'react';
import type { ListLook, RowSpec } from './list-shared';
import { ListView } from './list-view';

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

type Kind = RowSpec['kind'];
const KINDS = [
  ['button', '누르는 줄'],
  ['link', '링크 줄'],
  ['view', '보기만'],
  ['switch', '스위치'],
  ['check', '체크'],
  ['radio', '라디오'],
] as const;
const COMPONENT: Record<Kind, string> = { view: 'ListItem', button: 'ListButtonItem', link: 'ListLinkItem', switch: 'ListSwitchItem', check: 'ListCheckItem', radio: 'ListRadioItem' };

export function ListPlayground({ looks }: { looks: Record<'desk' | 'hr', ListLook> }) {
  const [kind, setKind] = useState<Kind>('button');
  const [prefix, setPrefix] = useState<'none' | 'icon' | 'tile'>('icon');
  const [suffix, setSuffix] = useState<'none' | 'value' | 'chevron' | 'amount'>('value');
  const [markAt, setMarkAt] = useState<'prefix' | 'suffix'>('prefix');
  const [detail, setDetail] = useState<'none' | 'one' | 'two'>('one');
  const [align, setAlign] = useState<'center' | 'top'>('center');
  const [highlighted, setHighlighted] = useState<'no' | 'yes'>('no');
  const [disabled, setDisabled] = useState<'no' | 'yes'>('no');
  const [mode, setMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');
  const [title, setTitle] = useState('기본 통화');

  const control = kind === 'switch' || kind === 'check' || kind === 'radio';
  const detailText = detail === 'one' ? '새 거래에 먼저 들어가요' : detail === 'two' ? '새 거래 · 예산 · 리포트에 먼저 들어가요. 거래마다 따로 바꿀 수도 있어요' : undefined;
  const rows = useMemo<RowSpec[]>(() => {
    const base: RowSpec = {
      kind,
      title,
      detail: detailText,
      prefix: prefix === 'icon' ? { icon: 'globe' } : prefix === 'tile' ? { tile: 'blue', icon: 'wallet' } : undefined,
      suffix: control ? undefined : suffix === 'value' ? { text: '대한민국 원', chevron: kind !== 'view' } : suffix === 'chevron' ? { chevron: true } : suffix === 'amount' ? { amount: '−5,800원' } : undefined,
      highlighted: highlighted === 'yes',
      disabled: disabled === 'yes',
      align,
      checked: kind !== 'radio',
      value: 'a',
      markPosition: kind === 'check' ? markAt : undefined,
    };
    if (kind !== 'radio') return [base];
    // 하나 고르기는 두 줄 이상 — 고른 것과 안 고른 것이 모두 보인다
    return [
      { ...base, checked: true },
      { ...base, title: '미국 달러', detail: detailText && 'USD', value: 'b', checked: false, highlighted: false, disabled: false },
      { ...base, title: '일본 엔', detail: detailText && 'JPY', value: 'c', checked: false, highlighted: false, disabled: false },
    ];
  }, [kind, title, detailText, prefix, suffix, control, highlighted, disabled, align, markAt]);

  const code = useMemo(() => {
    const C = COMPONENT[kind];
    const attrs: string[] = [];
    if (kind === 'radio') attrs.push('value="KRW"');
    if (prefix === 'icon') attrs.push('prefix={<Globe />}');
    if (prefix === 'tile') attrs.push('prefix={<ListTile className="bg-chart-blue-weak text-chart-blue"><Wallet /></ListTile>}');
    attrs.push(`title="${title}"`);
    if (detailText) attrs.push(`detail="${detailText}"`);
    if (!control && suffix === 'value') attrs.push(kind === 'view' ? 'suffix="대한민국 원"' : 'suffix={<>대한민국 원<ChevronRight /></>}');
    if (!control && suffix === 'chevron') attrs.push('suffix={<ChevronRight />}');
    if (!control && suffix === 'amount') attrs.push('suffix={<span className="text-t5 font-bold text-fg-neutral tabular-nums">−5,800원</span>}');
    if (kind === 'check' && markAt === 'suffix') attrs.push('markPosition="suffix"');
    if (align === 'top') attrs.push('align="top"');
    if (highlighted === 'yes') attrs.push('highlighted');
    if (disabled === 'yes') attrs.push('disabled');
    if (kind === 'switch' || kind === 'check') attrs.push('defaultChecked');
    if (kind === 'button') attrs.push('onClick={open}');
    if (kind === 'link') attrs.push('href="/settings/currency"');
    const row = `<${C}\n    ${attrs.join('\n    ')}\n  />`;
    const imports = [kind === 'radio' ? 'ListRadioGroup' : kind === 'check' ? 'ListCheckGroup' : 'List', C, ...(prefix === 'tile' ? ['ListTile'] : [])];
    const icons = [...(prefix === 'icon' ? ['Globe'] : []), ...(prefix === 'tile' ? ['Wallet'] : []), ...(!control && (suffix === 'value' || suffix === 'chevron') && !(kind === 'view' && suffix === 'value') ? ['ChevronRight'] : [])];
    const head = `${icons.length ? `import { ${icons.join(', ')} } from "lucide-react"\n` : ''}import { ${imports.join(', ')} } from "@/components/ui/list"\n\n`;
    if (kind === 'radio') return `${head}<ListRadioGroup defaultValue="KRW" aria-label="기본 통화">\n  ${row}\n  …\n</ListRadioGroup>`;
    if (kind === 'check') return `${head}<ListCheckGroup aria-label="항목">\n  ${row}\n</ListCheckGroup>`;
    return `${head}<List>\n  ${row}\n</List>`;
  }, [kind, prefix, title, detailText, suffix, control, markAt, align, highlighted, disabled]);

  const look = looks[brand];
  const surface = mode === 'auto' ? 'var(--p-bg-layer-default)' : look.surface.default[mode];

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border">
      <div className="flex min-h-[180px] items-center justify-center px-4 py-10" style={{ background: surface }}>
        <div className="w-full max-w-[360px]">
          <ListView key={JSON.stringify([rows, brand, mode])} look={look} rows={rows} mode={mode} ariaLabel={kind === 'radio' ? '기본 통화' : kind === 'check' ? '항목' : undefined} />
        </div>
      </div>
      <div className="grid gap-4 border-t border-fd-border bg-fd-card p-5 sm:grid-cols-2">
        <Seg label="줄의 종류" value={kind} options={KINDS} onChange={setKind} />
        <Seg label="앞 prefix" value={prefix} options={[['none', '없음'], ['icon', '아이콘 22'], ['tile', '타일 40']] as const} onChange={setPrefix} />
        {control ? (
          kind === 'check' ? (
            <Seg label="체크 자리 markPosition" value={markAt} options={[['prefix', '앞'], ['suffix', '뒤']] as const} onChange={setMarkAt} />
          ) : (
            <span className="text-[12px] text-fd-muted-foreground">뒤 붙이개 — {kind === 'switch' ? '스위치 32' : '라디오 24'}</span>
          )
        ) : (
          <Seg label="뒤 suffix" value={suffix} options={[['none', '없음'], ['value', '값 글자'], ['chevron', '화살표'], ['amount', '금액']] as const} onChange={setSuffix} />
        )}
        <Seg label="설명 detail" value={detail} options={[['none', '없음'], ['one', '한 줄'], ['two', '두 줄']] as const} onChange={setDetail} />
        <Seg label="맞춤 align" value={align} options={[['center', 'center'], ['top', 'top']] as const} onChange={setAlign} />
        <Seg label="강조 highlighted" value={highlighted} options={[['no', '아니요'], ['yes', '강조']] as const} onChange={setHighlighted} />
        <Seg label="비활성" value={disabled} options={[['no', '아니요'], ['yes', '비활성']] as const} onChange={setDisabled} />
        <div className="flex flex-wrap gap-5">
          <Seg label="모드" value={mode} options={[['auto', '사이트 따라'], ['light', '라이트'], ['dark', '다크']] as const} onChange={setMode} />
          <Seg label="브랜드" value={brand} options={[['desk', 'Desk'], ['hr', 'HR']] as const} onChange={setBrand} />
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-fd-muted-foreground">제목</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 rounded-md border border-fd-border bg-fd-background px-2.5 text-[13px]" />
        </label>
      </div>
      <pre className="overflow-x-auto border-t border-fd-border bg-fd-secondary/50 px-5 py-4 text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}
