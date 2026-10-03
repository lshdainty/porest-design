/*
 * shadcn Callout 예제 — docs site components/callout.html 에서 Preview + Code 토글로 보인다.
 * 각 예제 = { title, description, jsx, render() }. 셋 모두 차례 · 제목 · 코드가 specs/components/callout.md 의 "코드" 절과 같다.
 *
 * CALLOUT_BASE · CALLOUT_VARIANTS · CALLOUT_COMPOUND · CALLOUT_DEFAULTS 는 recipes/shadcn/components/ui/callout.tsx 의 cva(calloutVariants)와,
 * TONE_ICON · ICON · CONTENT · TITLE · SPACE · LINK · CHEVRON · CLOSE · CLOSE_TONE 은 그 파일의 상수와 글자 하나까지 같아야 한다 — 두 파일을 함께 고친다.
 * 규칙은 specs/components/callout.md, 수치 원본은 specs/components/callout.yaml.
 *
 * Preview 는 정적 HTML 이다 — 페이지의 Tailwind v4 browser CDN 이 클래스를 utility 로 만든다.
 * 짜임은 레시피가 그리는 DOM 그대로다 — 보이기 · 닫기는 상자 <div data-slot="callout" data-tone data-interaction> > 앞 아이콘
 * <span data-slot="callout-icon"> · 한 문단 <p data-slot="callout-content"> > 제목 <span data-slot="callout-title"> · 띄어쓰기 두 칸
 * <span>(whitespace-pre-wrap) · 본문 <span data-slot="callout-description"> · 링크 <a data-slot="callout-link">, 닫기 <button data-slot="callout-close">.
 * 전체 누르기는 상자가 <button type="button"> 이고 문단은 <span>, 끝에 <svg data-slot="callout-chevron">.
 * 링크의 href 는 미리보기에서 옮기지 않게 "#" 로 그렸다(코드는 "/guide/import"). 레시피의 스크립트(누르는 순간 --press-basis 재기 ·
 * 닫으면 걷고 초점 옮기기)는 정적 HTML 에 없다 — 누르면 바탕 · 축소는 레시피 그대로 바뀌지만 닫기를 눌러도 상자가 그대로다.
 * 아이콘은 lucide-react 와 같은 모양의 inline SVG 다(lucide 의 class · xmlns 는 그리지 않는다).
 */

// ── callout.tsx 의 cva 와 같은 값 ────────────────────────────────────────

// 상자 — 톤 바탕 · 글자. Actionable 은 톤의 누름 바탕(호버 · 누름) + 상자 전체 축소 + 상자 둘레 링
const CALLOUT_BASE = "relative flex min-h-[50px] w-full items-center gap-x3 rounded-r2_5 p-x3_5 text-left font-sans";

const CALLOUT_VARIANTS = {
  tone: {
    neutral: "bg-bg-neutral-weak text-fg-neutral",
    informative: "bg-bg-informative-weak text-fg-informative-contrast",
    positive: "bg-bg-positive-weak text-fg-positive-contrast",
    warning: "bg-bg-warning-weak text-fg-warning-contrast",
    critical: "bg-bg-critical-weak text-fg-critical-contrast",
  },
  interaction: {
    display: "",
    dismissible: "",
    actionable: [
      "cursor-pointer [--press-basis:50]",
      "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),scale_var(--motion-duration-pressed-scale)_var(--motion-ease-pressed-scale)]",
      "active:[scale:calc(1-2/var(--press-basis))] motion-reduce:active:[scale:1]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus-ring",
    ].join(" "),
  },
};

const CALLOUT_COMPOUND = [
  { interaction: "actionable", tone: "neutral", className: "hover:bg-bg-neutral-weak-pressed active:bg-bg-neutral-weak-pressed" },
  { interaction: "actionable", tone: "informative", className: "hover:bg-bg-informative-weak-pressed active:bg-bg-informative-weak-pressed" },
  { interaction: "actionable", tone: "positive", className: "hover:bg-bg-positive-weak-pressed active:bg-bg-positive-weak-pressed" },
  { interaction: "actionable", tone: "warning", className: "hover:bg-bg-warning-weak-pressed active:bg-bg-warning-weak-pressed" },
  { interaction: "actionable", tone: "critical", className: "hover:bg-bg-critical-weak-pressed active:bg-bg-critical-weak-pressed" },
];

const CALLOUT_DEFAULTS = { tone: "neutral", interaction: "display" };

// ── callout.tsx 의 상수 · JSX 에 적힌 클래스 ─────────────────────────────

// 톤의 기본 앞 아이콘 — lucide 선 아이콘(v106). 레시피의 TONE_ICON(Info · Info · CircleCheck · TriangleAlert · CircleAlert)
const TONE_ICON = { neutral: "info", informative: "info", positive: "circleCheck", warning: "triangleAlert", critical: "circleAlert" };

const ICON = "flex shrink-0 [&>svg]:size-4";
// 한 문단 — 제목 · 본문 · 링크가 이어 흐른다(사이는 띄어쓰기 두 칸)
const CONTENT = "min-w-0 flex-1 text-t4 font-normal break-keep [overflow-wrap:break-word]";
const TITLE = "font-bold";
const SPACE = "whitespace-pre-wrap";
const LINK = [
  "inline-block cursor-pointer rounded-r1 text-t4 font-normal underline underline-offset-2",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus-ring",
].join(" ");
const CHEVRON = "size-4 shrink-0";

// 닫기 — 투명 상자 40 · 모서리 8, 바깥 −12. 호버 · 누름은 톤의 누름 바탕(CLOSE_TONE), 누르면 2px 거리 축소(기준 40)
const CLOSE = [
  "relative -m-x3 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-r2 [&>svg]:size-4",
  "[--press-basis:40] [transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),scale_var(--motion-duration-pressed-scale)_var(--motion-ease-pressed-scale)]",
  "active:[scale:calc(1-2/var(--press-basis))] motion-reduce:active:[scale:1]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus-ring",
].join(" ");
const CLOSE_TONE = {
  neutral: "hover:bg-bg-neutral-weak-pressed active:bg-bg-neutral-weak-pressed",
  informative: "hover:bg-bg-informative-weak-pressed active:bg-bg-informative-weak-pressed",
  positive: "hover:bg-bg-positive-weak-pressed active:bg-bg-positive-weak-pressed",
  warning: "hover:bg-bg-warning-weak-pressed active:bg-bg-warning-weak-pressed",
  critical: "hover:bg-bg-critical-weak-pressed active:bg-bg-critical-weak-pressed",
};

// ── cva 풀이 ──────────────────────────────────────────────────────────────

// cva 와 같은 순서로 붙인다 — base → 축(선언 순) → 맞는 compound(선언 순). 고르지 않은 축은 기본값을 쓴다
function cvaOf(base, { variants = {}, compoundVariants = [], defaultVariants = {} } = {}) {
  return (props = {}) => {
    const p = { ...defaultVariants };
    for (const [k, v] of Object.entries(props)) if (v !== undefined) p[k] = v;
    const parts = [base];
    for (const [axis, map] of Object.entries(variants)) parts.push(map[p[axis]]);
    for (const { class: cls, className, ...when } of compoundVariants) {
      if (Object.entries(when).every(([k, v]) => (Array.isArray(v) ? v.includes(p[k]) : p[k] === v))) parts.push(cls, className);
    }
    return parts.filter(Boolean).join(" ");
  };
}

const calloutVariants = cvaOf(CALLOUT_BASE, { variants: CALLOUT_VARIANTS, compoundVariants: CALLOUT_COMPOUND, defaultVariants: CALLOUT_DEFAULTS });

// ── 미리보기 조각 ─────────────────────────────────────────────────────────

const attrs = (list) => list.filter(Boolean).join(" ");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// lucide-react 의 아이콘과 같은 모양(24 격자) — 크기는 class 나 감싼 자리의 [&>svg]:size-* 가 정한다
const svg = (paths, extra = "") =>
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${paths}</svg>`;

const PATHS = {
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  circleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  triangleAlert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  circleAlert: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};

// 사이트의 `.content p { margin: 12px 0; color: text-primary }` 는 층(@layer) 밖 규칙이라 Tailwind utility 를 늘 이긴다 — 문단 <p> 에는
// 레시피가 정한 바깥 여백(0 — preflight) · 글자색(상자의 톤 색을 물려받는다)을 style 로 한 번 더 적는다(레시피에는 없는 미리보기용 덧칠)
const P_FIX = "margin:0; color:inherit;";

// <Body> — callout.tsx 그대로. 앞 아이콘 · 한 문단(제목 · 띄어쓰기 두 칸 · 본문 · 띄어쓰기 두 칸 · 링크). 전체 누르기 안에서는 문단이 <span>
function body({ tone, title, link, inline, children }) {
  const Text = inline ? "span" : "p";
  const fix = inline ? "" : ` style="${P_FIX}"`;
  const icon = `<span aria-hidden="true" data-slot="callout-icon" class="${ICON}">${svg(PATHS[TONE_ICON[tone]])}</span>`;
  const space = `<span class="${SPACE}">  </span>`;
  const titleHtml = title != null ? `<span data-slot="callout-title" class="${TITLE}">${esc(title)}</span>${space}` : "";
  // 링크 — href 면 <a>, 아니면 <button type="button">. 미리보기는 옮기지 않게 "#"
  const linkHtml = link
    ? `${space}${link.href != null ? `<a data-slot="callout-link" href="#" class="${LINK}">${esc(link.label)}</a>` : `<button type="button" data-slot="callout-link" class="${LINK}">${esc(link.label)}</button>`}`
    : "";
  return `${icon}<${Text} data-slot="callout-content" class="${CONTENT}"${fix}>${titleHtml}<span data-slot="callout-description">${esc(children)}</span>${linkHtml}</${Text}>`;
}

// <Callout> — callout.tsx 그대로. 속성 차례는 레시피의 JSX 차례다 — data-slot · data-tone · data-interaction · class → 코드가 넘긴 것(role)
function callout({ tone = "neutral", interaction = "display", title, link, role, children }) {
  const cls = calloutVariants({ tone, interaction });
  if (interaction === "actionable") {
    return `<button ${attrs(['type="button"', 'data-slot="callout"', `data-tone="${tone}"`, 'data-interaction="actionable"', `class="${cls}"`])}>${body({ tone, title, inline: true, children })}${svg(
      PATHS.chevronRight,
      ` data-slot="callout-chevron" class="${CHEVRON}"`,
    )}</button>`;
  }
  const close =
    interaction === "dismissible"
      ? `<button type="button" data-slot="callout-close" aria-label="닫기" class="${CLOSE} ${CLOSE_TONE[tone]}">${svg(PATHS.x)}</button>`
      : "";
  const root = attrs(['data-slot="callout"', `data-tone="${tone}"`, `data-interaction="${interaction}"`, `class="${cls}"`, role && `role="${role}"`]);
  return `<div ${root}>${body({ tone, title, link, inline: false, children })}${close}</div>`;
}

// 상자는 콘텐츠 폭 — 폰(360) 화면처럼 좌우 24 를 둔 흰 표면 위에 놓는다
const SCREEN =
  "max-width:360px; background:var(--color-bg-layer-default); border:1px solid var(--color-stroke-neutral-subtle); border-radius:var(--radius-r4); padding:var(--spacing-x5) var(--spacing-global-gutter); font-family:var(--font-sans);";
const screen = (html) => `<div style="${SCREEN}">${html}</div>`;
const stack = (items, gap = "var(--spacing-x4)") => `<div style="display:flex; flex-direction:column; gap:${gap};">${items.join("")}</div>`;
const HEAD = "font-size:var(--text-t7); line-height:var(--text-t7--line-height); font-weight:700; color:var(--color-fg-neutral);";
const NOTE = "margin:0; font-size:var(--text-t4); line-height:var(--text-t4--line-height); color:var(--color-fg-neutral-subtle);";
// 폼 칸 자리 — 미리보기 틀이다(칸은 Field · Input 예제가 그린다)
const FIELD =
  "display:flex; flex-direction:column; gap:var(--spacing-x2); font-size:var(--text-t5); line-height:var(--text-t5--line-height); color:var(--color-fg-neutral);";
const BOX =
  "height:52px; box-sizing:border-box; padding:var(--spacing-x3_5) var(--spacing-x4); border-radius:var(--radius-r3); box-shadow:inset 0 0 0 1px var(--color-stroke-neutral-weak);";
const field = (label, value) => `<div style="${FIELD}"><span style="font-weight:500;">${label}</span><div style="${BOX}">${value}</div></div>`;

// ── 예제 ──────────────────────────────────────────────────────────────────

export const calloutExamples = [
  {
    title: "보이기 — 안내 · 링크",
    description:
      "그 기능 · 내용 바로 위에 늘 보이는 안내 상자다. 바탕은 옅은 톤(bg-*-weak)이고 글 · 아이콘 · 링크는 같은 fg-*-contrast 색이다. 제목(700) · 본문(400) · 링크(밑줄 · 띄움 2)는 14 / 19 로 한 문단에 흐르고, 사이는 띄어쓰기 두 칸이다 — 진짜 글자라 복사해도 이어 붙지 않고 그 뒤에서 줄을 바꿀 수 있다. 안쪽 14 · 최소 50 · 모서리 10 · 아이콘 16 · 사이 12, 여러 줄이면 아이콘이 상자 가운데에 선다. 앞 아이콘은 톤마다 lucide 선 아이콘(informative 는 info)이다. 링크는 자세히 · 약관처럼 보조 내용으로 갈 때만 둔다 — href 면 <a>, 아니면 <button type=\"button\">. 제목은 성격을 나타내는 짧은 말이고 본문은 제목을 되풀이하지 않는다.",
    jsx: `import { Callout } from "@/components/ui/callout"

<Callout tone="informative" title="안내" link={{ label: "자세히", href: "/guide/import" }}>
  가져온 데이터는 기존 거래에 더해지고 덮어쓰지 않아요.
</Callout>`,
    render: () =>
      screen(
        stack([
          `<div style="${HEAD}">가져오기</div>`,
          callout({ tone: "informative", title: "안내", link: { label: "자세히", href: "/guide/import" }, children: "가져온 데이터는 기존 거래에 더해지고 덮어쓰지 않아요." }),
          `<p style="${NOTE}">은행 앱에서 내려받은 거래 내역 파일을 고르세요.</p>`,
        ]),
      ),
  },

  {
    title: "저장 실패 — 폼 맨 위",
    description:
      "저장 · 제출이 실패하면 폼은 연 채로 폼 맨 위에 tone=\"critical\" 을 둔다 — 무엇이 안 됐는지와 할 수 있는 일까지 쓰고, 서버가 보낸 글 · 영어 · 코드를 그대로 쓰지 않는다. 나중에 나타나는 경고 · 위험이라 role=\"alert\" 로 보조 기술에 알린다(처음부터 있던 안내에는 달지 않는다). 경고 · 오류는 닫지 못한다 — 문제가 남아 있는 동안 보인다. 시트 · 대화상자 안에서 난 오류도 그 안 Callout 이다(스낵바는 닫힌 뒤에). 칸 하나의 오류는 Callout 이 아니라 칸 아래 Field 의 오류 글이다.",
    jsx: `{/* 나중에 나타나는 경고 · 위험은 보조 기술에 알린다(role="alert") */}
{saveError && (
  <Callout tone="critical" role="alert">
    저장하지 못했어요. 입력한 내용은 그대로 있어요. 잠시 뒤 다시 저장해 주세요.
  </Callout>
)}`,
    render: () =>
      screen(
        stack(
          [
            `<div style="${HEAD}">거래 추가</div>`,
            callout({ tone: "critical", role: "alert", children: "저장하지 못했어요. 입력한 내용은 그대로 있어요. 잠시 뒤 다시 저장해 주세요." }),
            field("금액", "28,500원"),
            field("카테고리", "식비 · 카페"),
          ],
          "var(--spacing-x6)",
        ),
      ),
  },

  {
    title: "전체 누르기 · 닫기",
    description:
      "눌러서 어딘가로 가는 게 상자의 목적이면 interaction=\"actionable\" — 상자 전체가 <button type=\"button\">(이름은 글 전체)이고 뒤에 chevron-right 16 을 두며, 링크는 두지 않는다. 마우스를 올리면(웹) 톤의 누름 바탕(bg-*-weak-pressed), 누르면 그 바탕에 상자 전체가 2px 거리로 준다. 새 기능처럼 한 번 보면 되는 안내만 interaction=\"dismissible\" 이다 — 닫기는 투명 상자 40 · 모서리 8 · 바깥 −12(줄 높이를 늘리지 않고 아이콘은 오른쪽 끝에서 14) · 이름 \"닫기\" 이고, 올리거나 누르면 톤의 누름 바탕이 깔린다. 닫으면 바로 걷고 초점은 다음 요소로 간다 — open · onDismiss 로 닫음을 기억해 다시 띄우지 않는다. 버튼은 모두 type=\"button\" 이라 폼 안에서 제출되지 않는다. 정적 미리보기라 닫기를 눌러도 상자가 그대로다.",
    jsx: `<Callout tone="neutral" interaction="actionable" onClick={openBrokerConnect}>
  토스증권을 연결하면 보유 주식이 자산에 더해져요.
</Callout>

{/* 한 번 보면 되는 안내 — 닫으면 다시 띄우지 않는다 */}
<Callout tone="informative" title="새 기능" interaction="dismissible" open={!seen} onDismiss={markSeen}>
  반복 거래를 자동으로 기록할 수 있어요.
</Callout>`,
    render: () =>
      screen(
        stack([
          callout({ tone: "neutral", interaction: "actionable", children: "토스증권을 연결하면 보유 주식이 자산에 더해져요." }),
          callout({ tone: "informative", title: "새 기능", interaction: "dismissible", children: "반복 거래를 자동으로 기록할 수 있어요." }),
        ]),
      ),
  },
];
