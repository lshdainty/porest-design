// Typography 페이지 — 값은 DESIGN.md typography 블록에서만 온다
import { color, design, sectionTable, typeScale } from '@/lib/design-tokens';
import { Figure, Inline, Table, Token } from './ui';

// "쓰는 곳" · "배수" 는 DESIGN.md v100 표에서 읽는다
function v100Rows() {
  const { rows } = sectionTable('v100 — SEED 타입 스케일');
  return new Map(rows.map((r) => [r[0].replace(/`/g, '').replace(/^text-/, ''), { ratio: r[3], use: r[4] }]));
}

export function TypePreviewFigure() {
  const { semantic } = typeScale();
  const title = semantic.find((s) => s.name === 'screen-title')!;
  const body = semantic.find((s) => s.name === 'article-body')!;
  const note = semantic.find((s) => s.name === 'article-note')!;
  const fg = color('fg-neutral'), muted = color('fg-neutral-muted'), subtle = color('fg-neutral-subtle');
  return (
    <Figure caption="screen-title · article-body · article-note 로 쓴 화면">
      <div className="w-[340px] rounded-2xl bg-white p-6 shadow-sm" style={{ color: fg }}>
        <div style={{ fontSize: title.fontSize, lineHeight: title.lineHeight, fontWeight: title.fontWeight }}>이번 달 돈 흐름</div>
        <div className="mt-1.5" style={{ fontSize: note.fontSize, lineHeight: note.lineHeight, color: subtle }}>9월 1일 – 9월 29일</div>
        <p className="mt-4" style={{ fontSize: body.fontSize, lineHeight: body.lineHeight, color: muted }}>
          고정 지출이 지난달과 같고, 식비가 조금 줄었어요. 남은 예산은 이번 주말까지 넉넉해요.
        </p>
      </div>
    </Figure>
  );
}

export function TypeScaleTable() {
  const { scale } = typeScale();
  const info = v100Rows();
  return (
    <Table head={['토큰', '크기', '줄 높이', '배수', '견본', '쓰는 곳']} minWidth={760}>
      {scale.map((t) => (
        <tr key={t.name}>
          <td><Token>text-{t.name}</Token></td>
          <td className="tabular-nums">{t.fontSize}</td>
          <td className="tabular-nums">{t.lineHeight}</td>
          <td className="tabular-nums text-fd-muted-foreground">{info.get(t.name)?.ratio ?? '—'}</td>
          <td className="max-w-[360px] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: t.fontSize, lineHeight: t.lineHeight }}>
            가나다 Porest 123
          </td>
          <td className="whitespace-nowrap text-fd-muted-foreground"><Inline text={info.get(t.name)?.use ?? '—'} /></td>
        </tr>
      ))}
    </Table>
  );
}

export function WeightFigure() {
  const t5 = typeScale().scale.find((t) => t.name === 't5')!;
  return (
    <Figure caption="굵기 셋 — 토큰은 400 이고, 강조는 font-medium · font-bold 로 준다">
      <div className="flex flex-wrap items-end gap-10 text-fd-foreground">
        {[
          [400, 'Regular'],
          [500, 'Medium'],
          [700, 'Bold'],
        ].map(([w, n]) => (
          <div key={w} className="flex flex-col items-center gap-2">
            <span style={{ fontSize: 32, lineHeight: '42px', fontWeight: w as number }}>가Aa</span>
            <code className="text-[13px]">{w}</code>
            <span className="text-[12px] text-fd-muted-foreground">{n} · t5 는 {t5.fontSize}</span>
          </div>
        ))}
      </div>
    </Figure>
  );
}

export function SemanticStyleTable() {
  const { semantic } = typeScale();
  const USE_S: Record<string, string> = { 'screen-title': '화면 제목', 'article-body': '긴 글 본문', 'article-note': '긴 글 보조 · 날짜 · 출처' };
  return (
    <Table head={['토큰', '크기 / 굵기 / 줄 높이', '견본', '쓰는 곳']} minWidth={680}>
      {semantic.map((t) => (
        <tr key={t.name}>
          <td><Token>text-{t.name}</Token></td>
          <td className="whitespace-nowrap tabular-nums">{t.fontSize} / {t.fontWeight} / {t.lineHeight}</td>
          <td style={{ fontSize: t.fontSize, lineHeight: t.lineHeight, fontWeight: t.fontWeight }} className="whitespace-nowrap">돈 흐름 한눈에</td>
          <td className="whitespace-nowrap text-fd-muted-foreground">{USE_S[t.name]}</td>
        </tr>
      ))}
    </Table>
  );
}

// DESIGN.md v100 "옛 이름 → 가까운 새 이름" 줄을 그대로 표로
export function LegacyTypeTable() {
  const line = design().body.split('\n').find((l) => l.includes('**옛 이름 → 가까운 새 이름**'));
  if (!line) throw new Error('DESIGN.md v100 에 "옛 이름 → 가까운 새 이름" 줄이 없다');
  const rest = line.replace(/^.*?\*\*옛 이름 → 가까운 새 이름\*\*(\([^)]*\))?:?\s*/, '');
  const [body, ...tail] = rest.split(/\.\s/);
  // 새 이름 칸에도 ' · ' 가 들어가므로(자리마다 t4 · t5 …) 다음 '옛 이름 →' 앞에서만 끊는다
  const pairs = [...body.matchAll(/([a-z]+(?:-[a-z]+)?) → (.+?)(?= · [a-z]+(?:-[a-z]+)? → |$)/g)].map((m) => [m[1], m[2]]);
  const remark = tail.join('. ').replace(/\.\s*$/, '');
  const { legacy } = typeScale();
  const legacyOf = (n: string) => legacy.find((l) => l.name === n);
  return (
    <>
    <Table head={['옛 이름', '크기 / 굵기 / 줄 높이', '옮길 새 이름']} minWidth={560}>
      {pairs.map(([o, n]) => {
        const l = legacyOf(o);
        return (
          <tr key={o}>
            <td><Token>text-{o}</Token></td>
            <td className="whitespace-nowrap tabular-nums text-fd-muted-foreground">{l ? `${l.fontSize} / ${l.fontWeight} / ${l.lineHeight}` : '—'}</td>
            <td>{n}</td>
          </tr>
        );
      })}
    </Table>
    {remark && <p className="text-sm text-fd-muted-foreground">{remark}.</p>}
    </>
  );
}

// 단위 — 웹은 rem(÷16)과 -static(px) 두 벌. 내보내기(build-tailwind-v4)와 같은 계산
const REM_BASE = 16; // 브라우저 기본 글자 크기
const rem = (v: string) => `${Number((parseFloat(v) / REM_BASE).toFixed(4))}rem`;
export function UnitTable() {
  const { scale } = typeScale();
  return (
    <Table head={['토큰', '웹 (rem)', '고정 (-static)', '줄 높이 (rem / px)']} minWidth={620}>
      {scale.map((t) => (
        <tr key={t.name}>
          <td><Token>text-{t.name}</Token> <span className="text-fd-muted-foreground">·</span> <Token>text-{t.name}-static</Token></td>
          <td className="tabular-nums">{rem(t.fontSize)}</td>
          <td className="tabular-nums">{t.fontSize}</td>
          <td className="tabular-nums text-fd-muted-foreground">{t.lineHeight ? `${rem(t.lineHeight)} / ${t.lineHeight}` : '—'}</td>
        </tr>
      ))}
    </Table>
  );
}
