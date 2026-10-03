/*
 * shadcn Snackbar 예제 — docs site components/snackbar.html 에서 Preview + Code 토글로 보인다.
 * 각 예제 = { title, description, jsx, render() }. 셋 모두 차례 · 제목 · 코드가 specs/components/snackbar.md 의 "코드" 절과 같다.
 *
 * REGION · ROOT · ICON · TONE_COLOR · CONTENT · MESSAGE · ACTION · CLOSE 는 recipes/shadcn/components/ui/snackbar.tsx 의
 * 상수(REGION · ROOT · ICON · TONE_ICON 의 color · CONTENT · MESSAGE · ACTION · CLOSE)와 글자 하나까지 같아야 한다 — 두 파일을 함께 고친다.
 * 규칙은 specs/components/snackbar.md, 수치 원본은 specs/components/snackbar.yaml.
 *
 * Preview 는 정적 HTML 이다 — 페이지의 Tailwind v4 browser CDN 이 클래스를 utility 로 만든다.
 * 짜임은 레시피가 그리는 DOM 그대로다 — 자리 <div role="region" aria-label="알림" aria-live="polite" data-slot="snackbar-region"> >
 * 띠 <div role="status" aria-atomic="true" tabindex="0" data-slot="snackbar" data-tone data-state="open"> > 앞 아이콘 <svg data-slot="snackbar-icon">
 * (positive · critical 에만) · 글과 액션 <div data-slot="snackbar-content"> > 글 <span data-slot="snackbar-message"> · 액션
 * <button data-slot="snackbar-action">, 끝에 보조 기술용 닫기 <button data-slot="snackbar-close" aria-label="닫기">.
 * 자리는 레시피에서 화면(viewport) 아래에 붙는 fixed 다 — 미리보기는 틀 안에 그리려고 style 로 position:absolute 를 덧칠한다(레시피에는 없는
 * 미리보기용 덧칠). --snackbar-avoid 는 레시피가 SnackbarAvoidOverlap 으로 감싼 요소를 재서 자리의 style 에 넣는 값이다 — 미리보기는 탭 바
 * 높이(56)를 그대로 적었다. 띠의 data-state="open" 애니메이션(tw-animate-css)은 미리보기에 없다.
 * 레시피의 스크립트(4초 · 6초 · 머무는 동안 멈춤 · 바꾸기 · 누르는 순간 --press-basis 재기 · 닫기)는 정적 HTML 에 없다 — 띠는 그대로 남고,
 * 액션 · 닫기를 눌러도 닫히지 않는다. 닫기는 Tab 으로 초점을 옮기면 띠 오른쪽 끝에 보인다.
 * 아이콘은 lucide-react 와 같은 모양의 inline SVG 다(lucide 의 class · xmlns 는 그리지 않는다).
 */

// ── snackbar.tsx 의 상수와 같은 값 ───────────────────────────────────────

// 자리 — 화면 아래 가운데, 좌우 · 아래 8(+ 안전 영역). 아래는 안전 영역과 피할 자리(--snackbar-avoid) 중 큰 쪽.
// 비어 있을 때 누름을 막지 않게 자리는 pointer-events: none, 띠만 받는다
const REGION = [
  "pointer-events-none fixed inset-x-0 z-(--z-snackbar) flex flex-col items-center pb-x2",
  "pl-[calc(var(--spacing-x2)_+_env(safe-area-inset-left))] pr-[calc(var(--spacing-x2)_+_env(safe-area-inset-right))]",
  "bottom-[max(env(safe-area-inset-bottom),var(--snackbar-avoid,0px))]",
  "[transition:bottom_var(--motion-duration-d4)_var(--motion-ease-easing)] motion-reduce:transition-none",
].join(" ");

// 띠 — 나타남 150ms enter · 사라짐 100ms exit, 가운데에서 0.8 ↔ 1 · 투명도(모션 줄이기면 투명도만).
// 포커스 링은 띠 글자색 2px · 띄움 −4(가장자리에서 2 안쪽) — 링이 늘 띠 위에 그려진다
const ROOT = [
  "pointer-events-auto relative flex min-h-11 w-full max-w-[464px] items-center rounded-r2 bg-bg-neutral-inverted p-x2_5 font-sans text-fg-neutral-inverted transition-none",
  "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg-neutral-inverted",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-[var(--motion-duration-d3)] data-[state=open]:ease-[var(--motion-ease-enter)] motion-safe:data-[state=open]:zoom-in-80",
  "data-[state=closed]:pointer-events-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:fill-mode-forwards data-[state=closed]:duration-[var(--motion-duration-d2)] data-[state=closed]:ease-[var(--motion-ease-exit)] motion-safe:data-[state=closed]:zoom-out-80",
].join(" ");

// 아이콘 — 상자 24 안에 오른쪽 2(그림은 22). 장식이다 — 성공 · 실패는 글이 말한다. 색은 톤마다 반전 짝(v115)
const ICON = "size-6 shrink-0 pr-x0_5";
const TONE_COLOR = {
  positive: "text-fg-positive-inverted",
  critical: "text-fg-critical-inverted",
};
// 톤마다 lucide 아이콘 — 레시피의 TONE_ICON(CircleCheck · CircleAlert)
const TONE_ICON = { positive: "circleCheck", critical: "circleAlert" };

// 글과 액션 — 좌우 6, 양 끝(사이 적어도 10)
const CONTENT = "flex min-w-0 flex-1 items-center justify-between gap-x2_5 px-x1_5";
const MESSAGE = "min-w-0 text-t4 font-normal break-keep [overflow-wrap:break-word]";

// 액션 — 보이는 상자는 글, 누르는 영역은 ::before 로 글 + 좌우 8 × 44. 누르면 글만 2px 거리 축소. 링은 바깥 2
const ACTION = [
  "relative shrink-0 cursor-pointer whitespace-nowrap rounded-r1 text-t4 font-bold text-fg-brand-inverted",
  "before:absolute before:-inset-x-x2 before:top-1/2 before:h-11 before:-translate-y-1/2 before:content-['']",
  "[--press-basis:24] [transition:scale_var(--motion-duration-pressed-scale)_var(--motion-ease-pressed-scale)] active:[scale:calc(1-2/var(--press-basis))] motion-reduce:active:[scale:1]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-neutral-inverted",
].join(" ");

// 닫기 — 평소에는 보이지 않는다(보조 기술용). 키보드 초점이 오면 띠 오른쪽 끝에 상자 44 · X 16 — 위 · 아래 · 오른쪽
// 바깥 여백 −10 으로 띠 높이를 늘리지 않는다
const CLOSE = [
  "absolute -m-px size-px cursor-pointer overflow-hidden [clip-path:inset(50%)] [&>svg]:size-4 [&>svg]:shrink-0",
  "focus-visible:static focus-visible:-my-x2_5 focus-visible:-mr-x2_5 focus-visible:ml-0 focus-visible:flex focus-visible:size-11 focus-visible:shrink-0 focus-visible:items-center focus-visible:justify-center focus-visible:overflow-visible focus-visible:rounded-r2 focus-visible:[clip-path:none]",
  "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg-neutral-inverted",
].join(" ");

// ── 미리보기 조각 ─────────────────────────────────────────────────────────

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// lucide-react 의 아이콘과 같은 모양(24 격자) — 크기는 class 나 감싼 자리의 [&>svg]:size-* 가 정한다
const svg = (paths, attrs = "") =>
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${attrs}>${paths}</svg>`;

const PATHS = {
  circleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  circleAlert: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  receiptText: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  chartPie: '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
};

// <SnackbarItem> — snackbar.tsx 그대로(떠 있는 띠 — data-state="open" · tabindex 0). 아이콘은 cn(ICON, color) — 지워지는 클래스가 없다.
// 속성 차례는 레시피의 JSX 차례다
function snackbar({ message, tone = "neutral", action }) {
  const icon = tone === "neutral" ? "" : svg(PATHS[TONE_ICON[tone]], ` data-slot="snackbar-icon" class="${ICON} ${TONE_COLOR[tone]}"`);
  const actionHtml = action ? `<button type="button" data-slot="snackbar-action" class="${ACTION}">${esc(action)}</button>` : "";
  return `<div role="status" aria-atomic="true" tabindex="0" data-slot="snackbar" data-tone="${tone}" data-state="open" class="${ROOT}">${icon}<div data-slot="snackbar-content" class="${CONTENT}"><span data-slot="snackbar-message" class="${MESSAGE}">${esc(message)}</span>${actionHtml}</div><button type="button" data-slot="snackbar-close" aria-label="닫기" class="${CLOSE}">${svg(PATHS.x)}</button></div>`;
}

// 자리 — snackbar.tsx 그대로(role · 이름 · aria-live · --snackbar-avoid). fixed 를 틀 안의 absolute 로 바꾸는 것만 미리보기용 덧칠이다
const REGION_FIX = "position:absolute;";
const region = (children, avoid = 0) =>
  `<div role="region" aria-label="알림" aria-live="polite" data-slot="snackbar-region" class="${REGION}" style="--snackbar-avoid:${avoid}px; ${REGION_FIX}">${children}</div>`;

// 폰 화면처럼 — 폭 360 · 흰 표면, 자리가 이 안에 붙도록 position:relative · 쌓임 맥락(isolation)을 둔다
const SCREEN =
  "position:relative; isolation:isolate; overflow:hidden; max-width:360px; height:248px; background:var(--color-bg-layer-default); border:1px solid var(--color-stroke-neutral-subtle); border-radius:var(--radius-r4); font-family:var(--font-sans);";
const HEAD =
  "padding:var(--spacing-x5) var(--spacing-global-gutter) var(--spacing-x2); font-size:var(--text-t7); line-height:var(--text-t7--line-height); font-weight:700; color:var(--color-fg-neutral);";
const ROW =
  "display:flex; justify-content:space-between; gap:var(--spacing-x3); padding:var(--spacing-x2_5) var(--spacing-global-gutter); font-size:var(--text-t5); line-height:var(--text-t5--line-height); color:var(--color-fg-neutral);";
const ROW_DETAIL = "font-size:var(--text-t3); line-height:var(--text-t3--line-height); color:var(--color-fg-neutral-subtle);";
const LEDGER = [
  ["김밥천국", "식비 · 현대카드 M", "8,000원"],
  ["버스", "교통 · 현대카드 M", "1,500원"],
  ["다이소", "쇼핑 · 현대카드 M", "12,300원"],
];
const ledger = () =>
  `<div style="${HEAD}">가계부</div>${LEDGER.map(([title, detail, amount]) => `<div style="${ROW}"><span>${title}<br><span style="${ROW_DETAIL}">${detail}</span></span><span style="font-weight:700;">${amount}</span></div>`).join("")}`;
const screen = (inner) => `<div style="${SCREEN}">${inner}</div>`;
// 탭 바(56) — 미리보기 틀이다. 레시피에서는 이 요소를 SnackbarAvoidOverlap 으로 감싼다
const TABBAR =
  "position:absolute; right:0; bottom:0; left:0; display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); height:56px; background:var(--color-bg-layer-default); box-shadow:inset 0 1px 0 var(--color-stroke-neutral-subtle);";
const TAB = "display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; font-size:var(--text-t1); line-height:var(--text-t1--line-height); color:var(--color-fg-neutral-subtle);";
const tabbar = () =>
  `<div style="${TABBAR}">${[["house", "홈"], ["receiptText", "가계부"], ["wallet", "자산"], ["chartPie", "통계"]]
    .map(([icon, label], i) => `<span style="${TAB}${i === 1 ? " color:var(--color-fg-neutral);" : ""}">${svg(PATHS[icon], ' style="width:22px; height:22px;"')}<span>${label}</span></span>`)
    .join("")}</div>`;
// 나란히 — 칸 사이 16 · 줄 사이 24, 좁으면 한 줄에 하나
const grid = (items) =>
  `<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:var(--spacing-x6) var(--spacing-x4); align-items:start;">${items.join("")}</div>`;
const CAPTION = "display:block; margin-top:var(--spacing-x2); font-size:var(--text-t2); line-height:var(--text-t2--line-height); color:var(--color-fg-neutral-subtle);";
const labeled = (html, caption) => `<div style="min-width:0;">${html}<span style="${CAPTION}">${caption}</span></div>`;

// ── 예제 ──────────────────────────────────────────────────────────────────

export const snackbarExamples = [
  {
    title: "결과 알리기",
    description:
      "앱 맨 위에 SnackbarProvider 를 한 번 두고(셋째 예제), 띄울 때는 useSnackbar() 의 show 를 부른다. 방금 한 일의 결과를 해요체 한 문장 + 마침표로 — 무엇이 됐는지 먼저 쓴다. neutral(기본)은 아이콘이 없다. 띠는 짙은 바탕(bg-neutral-inverted · 다크는 밝은 띠) · 최소 44 · 여백 10 + 글 좌우 6(글은 띠 가장자리에서 16) · 모서리 8 · 그림자 없음 · 최대 464 이고, 화면 아래 가운데 자리(role=\"region\" · aria-live=\"polite\")에 role=\"status\" 로 뜬다 — 초점은 옮기지 않는다. 4초 뒤 사라지고, 마우스를 올리거나 · 누르고 있거나 · 키보드 초점이 들어오면 멈췄다가 떠나면 처음부터 다시 센다. 정적 미리보기라 사라지지 않는다.",
    jsx: `import { useSnackbar } from "@/components/ui/snackbar"

const snackbar = useSnackbar()

await saveTransaction(draft)
snackbar.show({ message: "거래를 저장했어요." })`,
    render: () => screen(`${ledger()}${region(snackbar({ message: "거래를 저장했어요." }))}`),
  },

  {
    title: "되돌리기 — 액션이 있으면 6초",
    description:
      "액션은 하나 · 동작 이름(되돌리기 · 잔액 고치기)이고, 있으면 6초 머문다. 14 · 700 · 반전 짝 색(fg-brand-inverted — 짙은 띠 위에서 보이게)이고 누르는 영역은 글 + 좌우 8 × 44, 누르면 그 일을 하고 닫는다. 시간이 지나면 사라지므로 같은 일을 할 다른 길(목록 · 상세)도 둔다. 다시 하면 되는 가벼운 실패는 tone=\"critical\"(circle-alert · fg-critical-inverted), 성공을 눈에 띄게 알릴 때만 positive(circle-check)다 — 아이콘은 상자 24 안에 오른쪽 2(그림 22)라 글이 띠 가장자리에서 40 에 선다. 저장 · 불러오기 실패는 스낵바가 아니라 그 자리의 Callout · Result Section 이다. 한 번에 하나 — 새 show() 는 지금 띠를 바로 바꾼다(미리보기는 두 띠를 따로 그렸다).",
    jsx: `snackbar.show({
  message: "거래를 삭제했어요.",
  action: { label: "되돌리기", onClick: () => restoreTransaction(id) },
})

// 가볍게 실패 — 다시 하면 되는 일만. 저장 · 불러오기 실패는 그 자리에서 알린다
snackbar.show({ tone: "critical", message: "관심 종목에 넣지 못했어요. 다시 눌러 주세요." })`,
    render: () =>
      grid([
        labeled(screen(`${ledger()}${region(snackbar({ message: "거래를 삭제했어요.", action: "되돌리기" }))}`), "액션 — 6초 · 누르면 되돌리고 닫힌다"),
        labeled(screen(`${ledger()}${region(snackbar({ tone: "critical", message: "관심 종목에 넣지 못했어요. 다시 눌러 주세요." }))}`), "critical — 4초 · circle-alert"),
      ]),
  },

  {
    title: "피할 자리 — 탭 바 · 바닥 버튼",
    description:
      "탭 바 · 바닥 버튼 · 플로팅 버튼처럼 화면 아래에 붙은 것은 SnackbarAvoidOverlap 으로 감싼다 — 감싼 요소들 중 가장 위 요소의 윗변 + 8 에 띠가 선다(바닥 안전 영역보다 높을 때). 레시피가 감싼 요소를 재서 자리의 --snackbar-avoid 로 넘기고, 붙고 · 떨어지고 · 크기가 바뀌고 · 창 크기가 바뀌고 · 새 띠가 뜰 때 다시 잰다(옮겨 갈 때 200ms). 미리보기는 탭 바 높이 56 을 적었다. 자리는 body 끝 · z L6(400)이라 시트 · 대화상자 위에 뜨고, 띠 누름이 열린 시트의 바깥 누름으로 잡히지 않는다 — 다만 시트 · 대화상자 안에서 한 일의 결과는 그 안 Callout 으로 알리고 스낵바는 닫힌 뒤에 띄운다.",
    jsx: `import { SnackbarAvoidOverlap, SnackbarProvider } from "@/components/ui/snackbar"

<SnackbarProvider>
  <App />
  <SnackbarAvoidOverlap>
    <TabBar />
  </SnackbarAvoidOverlap>
</SnackbarProvider>`,
    render: () => screen(`${ledger()}${region(snackbar({ message: "거래를 저장했어요." }), 56)}${tabbar()}`),
  },
];
