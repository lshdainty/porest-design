// Gradient 페이지 — 그라디언트 값은 DESIGN.md 의 gradient-* 표, 반짝임 시간은 motion 표에서 온다
import type { CSSProperties } from 'react';
import { color, proseTokenSet, proseValue, sectionCode } from '@/lib/design-tokens';
import { Figure, Panel, Table, Token } from './ui';
import { ShimmerDemo } from './shimmer-demo';

type Mode = 'light' | 'dark';
const rc = (name: string, mode: Mode = 'light') => color(mode === 'dark' ? `${name}-dark` : name);

// 방향 없이 적힌(위 → 아래) 그라디언트에 방향을 붙인다
const withDirection = (value: string, dir: string) => value.replace(/^linear-gradient\(/, `linear-gradient(${dir}, `);

function preview(name: string, value: string) {
  if (name === 'gradient-fade-mask')
    return <span className="block h-7 w-36 rounded-md" style={{ background: withDirection(value, 'to right'), boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }} />;
  const dark = name.endsWith('-dark');
  return (
    <span className="relative block h-7 w-36 overflow-hidden rounded-md" style={{ background: rc('bg-neutral-weak-pressed', dark ? 'dark' : 'light') }}>
      <span className="absolute inset-0" style={{ background: value }} />
    </span>
  );
}

export function GradientTokenTable() {
  const rows = proseTokenSet('gradient-', /^gradient-/);
  return (
    <Table head={['토큰', '미리보기', '값', '쓰는 곳']} minWidth={860}>
      {rows.map((r) => (
        <tr key={r.name}>
          <td><Token>{r.name}</Token></td>
          <td>{preview(r.name, r.value)}</td>
          <td className="min-w-[260px] max-w-[320px] break-all font-mono text-[11px] leading-4 text-fd-muted-foreground">{r.value}</td>
          <td className="min-w-[200px] text-fd-muted-foreground">{r.note.replace(/`/g, '')}</td>
        </tr>
      ))}
    </Table>
  );
}

function masked(value: string, dir: 'to left' | 'to top', size: number): CSSProperties {
  const fade = withDirection(value, dir);
  const horizontal = dir === 'to left';
  const image = `linear-gradient(#000, #000), ${fade}`;
  const sizes = horizontal ? `calc(100% - ${size}px) 100%, ${size}px 100%` : `100% calc(100% - ${size}px), 100% ${size}px`;
  const pos = horizontal ? 'left top, right top' : 'left top, left bottom';
  return { maskImage: image, WebkitMaskImage: image, maskSize: sizes, WebkitMaskSize: sizes, maskPosition: pos, WebkitMaskPosition: pos, maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat' };
}

export function FadeMaskFigure() {
  const value = proseValue('gradient-fade-mask');
  const chips = ['전체', '식비', '교통', '쇼핑', '문화', '의료', '여행'];
  const row = (style?: CSSProperties) => (
    <div className="flex w-[236px] gap-2 overflow-hidden" style={style}>
      {chips.map((c, i) => (
        <span key={c} className="shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium" style={{ background: i ? rc('bg-neutral-weak') : rc('bg-neutral-inverted'), color: i ? rc('fg-neutral') : rc('fg-neutral-inverted') }}>{c}</span>
      ))}
    </div>
  );
  const list = (style?: CSSProperties) => (
    <div className="flex h-[120px] w-[236px] flex-col overflow-hidden" style={style}>
      {['점심 식비', '버스', '커피', '관리비', '영화'].map((t) => (
        <div key={t} className="flex h-9 shrink-0 items-center justify-between border-b text-[13px]" style={{ borderColor: rc('stroke-neutral-weak'), color: rc('fg-neutral') }}>
          {t}
          <span style={{ color: rc('fg-neutral-subtle') }}>⋯</span>
        </div>
      ))}
    </div>
  );
  const card = (title: string, children: React.ReactNode) => (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-white p-4">
      {children}
      <span className="text-[12px] text-[#62697A]">{title}</span>
    </div>
  );
  return (
    <Figure caption="가로 스크롤 끝(위)과 긴 목록 끝(아래) — 왼쪽은 잘린 채로, 오른쪽은 마스크로 부드럽게 가린다">
      <div className="grid grid-cols-2 gap-4">
        {card('그냥 자름', row())}
        {card('gradient-fade-mask · to left', row(masked(value, 'to left', 56)))}
        {card('그냥 자름', list())}
        {card('gradient-fade-mask · to top', list(masked(value, 'to top', 48)))}
      </div>
    </Figure>
  );
}

export function ShimmerFigure() {
  const css = sectionCode('CSS keyframes 정의').replace(/@keyframes ([a-z-]+)/g, '@keyframes porest-$1');
  const scenes = (['light', 'dark'] as Mode[]).map((m) => ({
    label: m === 'light' ? '라이트 — gradient-shimmer-neutral' : '다크 — gradient-shimmer-neutral-dark',
    page: rc('bg-layer-basement', m),
    card: rc('bg-layer-default', m),
    bone: rc('bg-neutral-weak', m),
    shimmer: proseValue(m === 'dark' ? 'gradient-shimmer-neutral-dark' : 'gradient-shimmer-neutral'),
    fg: rc('fg-neutral', m),
  }));
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Panel caption="스켈레톤 위를 지나는 반짝임 띠 — motion-duration-loop · motion-ease-linear">
        <ShimmerDemo scenes={scenes} loop={{ ms: parseFloat(proseValue('motion-duration-loop')), ease: proseValue('motion-ease-linear') }} />
      </Panel>
    </>
  );
}
