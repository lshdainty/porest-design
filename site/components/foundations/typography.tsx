// Typography 페이지 — 값은 DESIGN.md typography 블록에서만 온다
import type { CSSProperties } from 'react';
import { color, design, sectionCode, sectionTable, typeScale } from '@/lib/design-tokens';
import { Figure, Inline, MARK, MARK_LINE, Table, Token } from './ui';

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
      {/* 카드 — 그림자 없이 1px stroke-neutral-weak(card.md) */}
      <div className="w-[340px] rounded-2xl bg-white p-6" style={{ color: fg, border: `1px solid ${color('stroke-neutral-weak')}` }}>
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

// ── 줄바꿈(v114) ─────────────────────────────────────────
// DESIGN.md "v114 — 줄바꿈" 의 CSS 를 그대로 걸어, 지금의 글자 단위(브라우저 기본값)와 나란히 그린다
const LINE_BREAK = 'v114 — 줄바꿈';
function lineBreakCss(): CSSProperties {
  const decl = Object.fromEntries([...sectionCode(LINE_BREAK).matchAll(/([a-z-]+):\s*([a-z-]+);/g)].map((m) => [m[1], m[2]]));
  if (!decl['word-break'] || !decl['overflow-wrap']) throw new Error(`DESIGN.md "${LINE_BREAK}" 의 CSS 에서 word-break · overflow-wrap 을 읽지 못했다`);
  return { wordBreak: decl['word-break'] as CSSProperties['wordBreak'], overflowWrap: decl['overflow-wrap'] as CSSProperties['overflowWrap'] };
}
// 사이트는 v114 규칙을 전체에 건다 — 지금 모습은 기본값으로 되돌려 그린다
const BROWSER_DEFAULT: CSSProperties = { wordBreak: 'normal', overflowWrap: 'normal' };

// 컴포넌트 자리의 실제 글 · 폭(폰 360 기준) — mark 는 글자 단위에서 갈리는 낱말
const BREAK_SAMPLES: { where: string; size: string; weight?: number; width: number; text: string; mark?: string }[] = [
  { where: 'Select Box 설명 · 1열', size: 't3', width: 246, text: 'OT, 경조 휴가 등 휴가를 신청할 수 있는 권한입니다.', mark: '권한입니다.' },
  { where: 'Select Box 설명 · 2열', size: 't3', width: 88, text: '중지할 때까지 계속 반복', mark: '계속' },
  { where: 'Select Box 제목 · 3열', size: 't5', weight: 500, width: 64, text: '최근 3개월', mark: '3개월' },
  { where: 'List 설명', size: 't3', width: 250, text: '내보낸 파일에서 계좌번호 · 카드번호의 가운데 자리를 별표로 바꿔요. 받는 사람이 번호 전체를 보지 못해요', mark: '자리를' },
  { where: 'Checkbox 라벨 · 시트', size: 't4', width: 200, text: '알림을 받을 때 결제 예정 금액도 함께 보여 주기', mark: '함께' },
  { where: '이메일 · 2열', size: 't3', width: 88, text: 'porest.desk@example.com' },
];

function BreakSample({ s, rule }: { s: (typeof BREAK_SAMPLES)[number]; rule: CSSProperties }) {
  const t = typeScale().scale.find((x) => x.name === s.size);
  if (!t) throw new Error(`글자 토큰 ${s.size} 이 없다`);
  const [before, after] = s.mark ? s.text.split(s.mark) : [s.text, ''];
  return (
    <div className="rounded-xl bg-white p-3">
      <div style={{ width: s.width, outline: `1px dashed ${MARK_LINE}`, fontSize: t.fontSize, lineHeight: t.lineHeight, fontWeight: s.weight ?? 400, color: color(s.weight ? 'fg-neutral' : 'fg-neutral-muted'), ...rule }}>
        {before}
        {s.mark && <mark style={{ background: MARK, color: 'inherit', borderRadius: 3 }}>{s.mark}</mark>}
        {after}
      </div>
    </div>
  );
}

export function LineBreakFigure() {
  const rule = lineBreakCss();
  return (
    // Figure 는 내용 폭(w-max)으로 가로 스크롤한다 — 여기서는 좁은 화면에서 두 칸이 아래로 내려오게 판을 따로 둔다
    <figure className="not-prose my-6">
      <div className="flex flex-col gap-5 rounded-2xl bg-[#E9E9EC] p-5 text-fd-foreground dark:bg-fd-muted sm:p-8">
        {BREAK_SAMPLES.map((s) => (
          <div key={s.where} className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold">{s.where}</span>
            <div className="flex flex-wrap items-start gap-3">
              {(
                [
                  ['지금 — 글자 단위', BROWSER_DEFAULT],
                  ['단어 단위', rule],
                ] as const
              ).map(([label, css]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[11px] text-fd-muted-foreground">{label}</span>
                  <BreakSample s={s} rule={css} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-fd-muted-foreground">지금(글자 단위)과 v114(단어 단위) — 점선이 글이 쓸 수 있는 폭, 분홍이 글자 단위에서 갈리는 낱말</figcaption>
    </figure>
  );
}

// DESIGN.md v114 의 플랫폼 표를 그대로
export function LineBreakTable() {
  const { head, rows } = sectionTable(LINE_BREAK);
  return (
    <Table head={head} minWidth={640}>
      {rows.map((r) => (
        <tr key={r[0]}>
          {r.map((c, i) => (
            <td key={i} className={i === 0 ? 'whitespace-nowrap font-medium' : undefined}>
              <Inline text={c} />
            </td>
          ))}
        </tr>
      ))}
    </Table>
  );
}
