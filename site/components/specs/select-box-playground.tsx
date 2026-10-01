'use client';
// Select Box 플레이그라운드 — 속성을 고르면 스펙대로 그린 상자와 그 코드가 바로 바뀐다(실제로 눌러 볼 수 있다).
import { useMemo, useState } from 'react';
import type { BoxSpec, SbIcon, SbLook } from './select-box-shared';
import { SelectBoxGroupView } from './select-box-view';

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

// 하나 고르기는 반복 거래 종료(Desk), 여럿 고르기는 휴가 권한(HR)
type Opt = { value: string; title: string; one: string; two: string; icon: SbIcon; lucide: string };
const RADIO: Opt[] = [
  { value: 'none', title: '무기한', one: '중지할 때까지 계속 반복', two: '중지할 때까지 계속 반복해요. 반복 거래 화면에서 언제든 멈출 수 있어요', icon: 'infinity', lucide: 'InfinityIcon' },
  { value: 'count', title: '횟수 지정', one: '정한 횟수만큼 반복', two: '정한 횟수만큼 반복해요. 마지막 회차가 지나면 끝나요', icon: 'hash', lucide: 'Hash' },
  { value: 'date', title: '종료일 지정', one: '정한 날까지 반복', two: '정한 날까지 반복해요. 그날이 회차라면 그날까지 기록해요', icon: 'calendar', lucide: 'Calendar' },
];
const CHECK: Opt[] = [
  { value: 'view', title: '휴가 조회', one: '본인 휴가 내역을 조회할 수 있는 권한입니다.', two: '본인 휴가 내역과 남은 휴가를 조회할 수 있는 권한입니다. 다른 사람의 내역은 볼 수 없습니다.', icon: 'calendar-days', lucide: 'CalendarDays' },
  { value: 'apply', title: '휴가 신청', one: 'OT, 경조 휴가 등 휴가를 신청할 수 있는 권한입니다.', two: 'OT, 경조 휴가 등 휴가를 신청할 수 있는 권한입니다. 신청은 승인권자에게 갑니다.', icon: 'umbrella', lucide: 'Umbrella' },
  { value: 'approve', title: '휴가 승인', one: '팀원의 휴가 신청을 승인할 수 있는 권한입니다.', two: '팀원의 휴가 신청을 승인하거나 반려할 수 있는 권한입니다. 승인하면 바로 부여됩니다.', icon: 'shield', lucide: 'Shield' },
];

export function SelectBoxPlayground({ looks }: { looks: Record<'desk' | 'hr', SbLook> }) {
  const [kind, setKind] = useState<'radio' | 'check'>('radio');
  const [control, setControl] = useState<'mark' | 'none'>('mark');
  const [columns, setColumns] = useState<'1' | '2' | '3'>('1');
  const [prefix, setPrefix] = useState<'none' | 'icon'>('none');
  const [detail, setDetail] = useState<'none' | 'one' | 'two'>('one');
  const [footer, setFooter] = useState<'none' | 'when-selected' | 'always'>('when-selected');
  const [disabled, setDisabled] = useState<'no' | 'yes'>('no');
  const [mode, setMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [brand, setBrand] = useState<'desk' | 'hr'>('desk');

  const opts = kind === 'radio' ? RADIO : CHECK;
  const boxes = useMemo<BoxSpec[]>(
    () =>
      opts.map((o, i) => ({
        value: o.value,
        title: o.title,
        description: detail === 'none' ? undefined : detail === 'one' ? o.one : o.two,
        prefix: prefix === 'icon' ? { icon: o.icon } : undefined,
        // 펼침은 둘째 상자에 — 하나 고르기는 반복 횟수 칸, 여럿은 안내 글
        footer: footer !== 'none' && i === 1 ? (kind === 'radio' ? { before: '총', value: '12', after: '회', aria: '반복 횟수' } : { note: '신청 화면에서 고를 수 있는 휴가 종류는 휴가 정책이 정합니다.' }) : undefined,
        footerVisibility: footer === 'always' ? 'always' : 'when-selected',
        disabled: disabled === 'yes' && i === 2,
        checked: kind === 'check' && i < 2,
      })),
    [opts, kind, detail, prefix, footer, disabled],
  );

  const code = useMemo(() => {
    const Group = kind === 'radio' ? 'RadioSelectBoxGroup' : 'CheckSelectBoxGroup';
    const Box = kind === 'radio' ? 'RadioSelectBox' : 'CheckSelectBox';
    const groupAttrs = [
      ...(columns !== '1' ? [`columns={${columns}}`] : []),
      ...(kind === 'radio' ? ['defaultValue="count"'] : []),
      `aria-label="${kind === 'radio' ? '종료' : '휴가 권한'}"`,
    ];
    const lines = opts.map((o, i) => {
      const a: string[] = [];
      if (kind === 'radio') a.push(`value="${o.value}"`);
      if (control === 'none') a.push('control="none"');
      if (prefix === 'icon') a.push(`prefix={<${o.lucide} />}`);
      a.push(`label="${o.title}"`);
      if (detail !== 'none') a.push(`description="${detail === 'one' ? o.one : o.two}"`);
      if (footer !== 'none' && i === 1) {
        a.push(kind === 'radio' ? 'footer={<Input aria-label="반복 횟수" defaultValue={12} />}' : 'footer={<p>신청 화면에서 고를 수 있는 휴가 종류는 휴가 정책이 정합니다.</p>}');
        if (footer === 'always') a.push('footerVisibility="always"');
      }
      if (kind === 'check' && i < 2) a.push('defaultChecked');
      if (disabled === 'yes' && i === 2) a.push('disabled');
      return `  <${Box} ${a.join(' ')} />`;
    });
    const icons = prefix === 'icon' ? opts.map((o) => o.lucide).sort() : [];
    const head = `${icons.length ? `import { ${icons.join(', ')} } from "lucide-react"\n` : ''}import { ${Box}, ${Group} } from "@/components/ui/select-box"\n\n`;
    return `${head}<${Group} ${groupAttrs.join(' ')}>\n${lines.join('\n')}\n</${Group}>`;
  }, [kind, columns, opts, control, prefix, detail, footer, disabled]);

  const look = looks[brand];
  const surface = mode === 'auto' ? 'var(--p-bg-layer-default)' : look.surface.default[mode];
  const cols = Number(columns) as 1 | 2 | 3;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border">
      <div className="flex min-h-[220px] items-center justify-center px-4 py-10" style={{ background: surface }}>
        <div className="w-full" style={{ maxWidth: cols === 1 ? 360 : 480 }}>
          <SelectBoxGroupView
            key={JSON.stringify([kind, brand, mode, cols, control, footer])}
            look={look}
            kind={kind}
            control={control}
            boxes={boxes}
            columns={cols}
            mode={mode}
            value={kind === 'radio' ? 'count' : undefined}
            ariaLabel={kind === 'radio' ? '종료' : '휴가 권한'}
          />
        </div>
      </div>
      <div className="grid gap-4 border-t border-fd-border bg-fd-card p-5 sm:grid-cols-2">
        <Seg label="고르기" value={kind} options={[['radio', '하나 — Radio'], ['check', '여럿 — Check']] as const} onChange={setKind} />
        <Seg label="컨트롤 control" value={control} options={[['mark', kind === 'radio' ? '라디오' : '칸 없는 체크'], ['none', '없음']] as const} onChange={setControl} />
        <Seg label="열 수 columns" value={columns} options={[['1', '1 — 가로형'], ['2', '2 — 세로형'], ['3', '3 — 세로형']] as const} onChange={setColumns} />
        <Seg label="앞 prefix" value={prefix} options={[['none', '없음'], ['icon', '아이콘 22']] as const} onChange={setPrefix} />
        <Seg label="설명 description" value={detail} options={[['none', '없음'], ['one', '한 줄'], ['two', '두 줄']] as const} onChange={setDetail} />
        <Seg label="펼침 footer(둘째 상자)" value={footer} options={[['none', '없음'], ['when-selected', '고르면'], ['always', '늘']] as const} onChange={setFooter} />
        <Seg label="비활성(셋째 상자)" value={disabled} options={[['no', '아니요'], ['yes', '비활성']] as const} onChange={setDisabled} />
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
