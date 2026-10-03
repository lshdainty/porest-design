/*
 * shadcn Content Placeholder 예제 — docs site components/content-placeholder.html 에서 Preview + Code 토글로 보인다.
 * 각 예제 = { title, description, jsx, render() }. 첫째(카드 그림 — 불러오지 못하면)는 제목 · 코드가 specs/components/content-placeholder.md 의
 * "코드" 절과 같고, 뒤의 셋(크기 · 그림 · 불러오는 동안은 Skeleton)은 md 의 Properties · Guidelines 를 코드로 더 보인다.
 *
 * ROOT · GLYPH 는 recipes/shadcn/components/ui/content-placeholder.tsx 의 상수와 글자 하나까지 같아야 한다 — 두 파일을 함께 고친다.
 * 불러오는 동안의 스켈레톤 SK_* 는 skeleton.tsx 의 ROOT · RADIUS · SHIMMER(skeleton-examples.mjs 의 것)와 같다.
 * 규칙은 specs/components/content-placeholder.md, 수치 원본은 specs/components/content-placeholder.yaml.
 *
 * Preview 는 정적 HTML 이다 — 페이지의 Tailwind v4 browser CDN 이 클래스를 utility 로 만든다.
 * 짜임은 레시피가 그리는 DOM 그대로다 — 자리 <div data-slot="content-placeholder">(대체 글이 있으면 role="img" + aria-label, 없으면 aria-hidden) >
 * 그림 <span aria-hidden data-slot="content-placeholder-glyph"> > lucide 아이콘. 그림의 크기는 자리를 크기 컨테이너로 두고(container-type: size)
 * min(clamp(16px, 50cqh, 160px), 100cqw) 로 잰다 — 틀 높이의 50%, 16 ~ 160, 틀 폭이 좁으면 폭. 담는 틀(크기 · 비율 · 모서리)은 부르는 쪽의 것이다.
 * 아이콘은 lucide-react 와 같은 모양의 inline SVG 다(lucide 의 class · xmlns 는 그리지 않는다 — 선 굵기 1.5 는 GLYPH 의 [&>svg]:[stroke-width:1.5]).
 * 불러온 카드 그림은 미리보기 그림이다(이미지 파일 대신 그라디언트).
 */

// ── content-placeholder.tsx 의 상수와 같은 값 ───────────────────────────────

// 자리 — 틀을 채우는 크기 컨테이너, 가운데 그림
const ROOT = "flex size-full items-center justify-center overflow-hidden bg-bg-neutral-weak [container-type:size]";

// 그림 — 틀 높이의 50%(16 ~ 160), 틀 폭이 좁으면 폭. 선 굵기 1.5
const GLYPH =
  "flex size-[min(clamp(16px,50cqh,160px),100cqw)] shrink-0 items-center justify-center text-stroke-neutral-weak [&>svg]:size-full [&>svg]:[stroke-width:1.5]";

// ── skeleton.tsx 의 상수와 같은 값 — 불러오는 동안 ─────────────────────────

const SK_ROOT = "relative block overflow-hidden bg-bg-neutral-weak";
const SK_RADIUS = { "0": "rounded-none", "8": "rounded-r2", "16": "rounded-r4", full: "rounded-full" };
const SK_SHIMMER = [
  "pointer-events-none absolute inset-0 [transform:translateX(-100%)]",
  "bg-[image:var(--gradient-shimmer-neutral)] dark:bg-[image:var(--gradient-shimmer-neutral-dark)]",
  "animate-[shimmer_var(--motion-duration-loop)_var(--motion-ease-easing)_infinite]",
  "motion-reduce:animate-none motion-reduce:opacity-0",
].join(" ");

// ── 미리보기 조각 ─────────────────────────────────────────────────────────

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// lucide-react 의 아이콘과 같은 모양(24 격자)
const svg = (paths) =>
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const ICONS = {
  image: svg('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'),
  creditCard: svg('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>'),
  receipt: svg(
    '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  ),
  fileText: svg(
    '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  ),
};

// <ContentPlaceholder> — icon(기본 image) · label(대체 글 — 주면 role="img" + 이름, 안 주면 보조 기술에 숨긴다)
function contentPlaceholder({ icon = "image", label } = {}) {
  const named = label != null && label.trim() !== "";
  const name = named ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"';
  return `<div data-slot="content-placeholder" class="${ROOT}" ${name}><span aria-hidden="true" data-slot="content-placeholder-glyph" class="${GLYPH}">${ICONS[icon]}</span></div>`;
}

// <Skeleton> — 불러오는 동안 같은 틀 · 같은 모서리. className 은 크기
const skeleton = ({ radius = "8", className = "" } = {}) =>
  `<span data-slot="skeleton" data-radius="${radius}" class="${[SK_ROOT, SK_RADIUS[radius], className].filter(Boolean).join(" ")}" aria-hidden="true"><span data-slot="skeleton-shimmer" class="${SK_SHIMMER}"></span></span>`;

// 담는 틀 — 크기 · 비율 · 모서리는 부르는 쪽의 것(코드의 <div className="… overflow-hidden …">)
const frame = (cls, html) => `<div class="${cls}">${html}</div>`;
// 카드 그림 틀(md 코드) — 1.586 비율 · 폭 112 · 모서리 8
const CARD_FRAME = "aspect-[1.586] w-28 overflow-hidden rounded-r2";
// 불러온 카드 그림 — 미리보기 그림(img 대신)
const CARD_ART =
  "display:flex; align-items:flex-end; width:100%; height:100%; padding:var(--spacing-x2); background:linear-gradient(135deg, var(--color-gray-1000), var(--color-gray-800)); font-family:var(--font-sans); font-size:11px; font-weight:700; color:var(--color-static-white);";

const ROW = "display:flex; flex-wrap:wrap; gap:var(--spacing-x4) var(--spacing-x5); align-items:flex-end;";
const CAPTION =
  "font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:var(--text-t2); line-height:var(--text-t2--line-height); color:var(--color-fg-neutral-subtle);";
const labeled = (html, caption) =>
  `<div style="display:flex; flex-direction:column; align-items:flex-start; gap:var(--spacing-x2); min-width:0; max-width:100%;">${html}<span style="${CAPTION}">${caption}</span></div>`;

// ── 예제 ──────────────────────────────────────────────────────────────────

export const contentPlaceholderExamples = [
  {
    title: "카드 그림 — 불러오지 못하면",
    description:
      "이미지가 없거나 불러오지 못하면 그 자리를 옅은 면(bg-neutral-weak — 스켈레톤 면과 같은 색) + 가운데 그림으로 채운다 — 브라우저의 깨진 이미지 아이콘 · 대체 글 · 투명한 빈 칸 · 외부 주소의 기본 그림을 보이지 않는다. 크기 · 비율 · 모서리는 담는 틀이 정한다(제 모서리 · 테두리 · 그림자가 없다). 그림은 자리가 무엇인지 말하는 lucide 선 아이콘(카드 그림 CreditCard)이고 색은 stroke-neutral-weak(면 위 1.14:1 — 장식)이다. 이미지가 뜻을 가졌으면(대체 글이 있었으면) 그 글을 자리 이름으로 남긴다(role=\"img\" + aria-label).",
    jsx: `import { CreditCard } from "lucide-react"
import { ContentPlaceholder } from "@/components/ui/content-placeholder"

const [failed, setFailed] = React.useState(!card.imageUrl)

{/* 틀 — 크기 · 비율 · 모서리는 틀이 정한다 */}
<div className="aspect-[1.586] w-28 overflow-hidden rounded-r2">
  {failed ? (
    <ContentPlaceholder icon={<CreditCard />} label={\`\${card.name} 카드 그림\`} />
  ) : (
    <img src={card.imageUrl} alt={\`\${card.name} 카드 그림\`} onError={() => setFailed(true)} className="size-full object-cover" />
  )}
</div>`,
    render: () =>
      `<div style="${ROW}">${labeled(frame(CARD_FRAME, contentPlaceholder({ icon: "creditCard", label: "현대카드 M 카드 그림" })), "failed — 대체 그림 · 그림 35")}${labeled(
        frame(CARD_FRAME, `<span role="img" aria-label="현대카드 M 카드 그림" style="${CARD_ART}">Hyundai M</span>`),
        "불러옴",
      )}</div>`,
  },

  {
    title: "크기 — 그림은 틀 높이의 50%",
    description:
      "그림은 틀 높이의 50% 정사각으로 가운데에 둔다 — 16 보다 작아지지 않고 160 보다 커지지 않으며, 틀 폭이 그보다 좁으면 폭에 맞춘다. 40 썸네일이면 20, 120 카드면 60, 화면 폭 4:3 사진(360 × 270)이면 135, 그보다 크면 160 이다. 좁고 긴 틀(40 × 120)은 폭 40 이다. 선 굵기는 24 격자 기준 1.5 라 그림이 커지면 같은 비율로 굵어진다.",
    jsx: `<div className="size-10 overflow-hidden rounded-r2"><ContentPlaceholder icon={<Receipt />} /></div>            {/* 20 */}
<div className="size-30 overflow-hidden rounded-r4"><ContentPlaceholder /></div>                           {/* 60 */}
<div className="h-30 w-10 overflow-hidden rounded-r2"><ContentPlaceholder /></div>                         {/* 폭 40 */}
<div className="aspect-[4/3] w-full max-w-[360px] overflow-hidden"><ContentPlaceholder label="가게 사진" /></div>  {/* 135 */}`,
    render: () =>
      `<div style="${ROW}">${[
        ["size-10 overflow-hidden rounded-r2", contentPlaceholder({ icon: "receipt" }), "40 → 20"],
        ["size-30 overflow-hidden rounded-r4", contentPlaceholder(), "120 → 60"],
        ["h-30 w-10 overflow-hidden rounded-r2", contentPlaceholder(), "40 × 120 → 40"],
      ]
        .map(([cls, html, caption]) => labeled(frame(cls, html), caption))
        .join("")}${labeled(frame("aspect-[4/3] w-[360px] max-w-full overflow-hidden", contentPlaceholder({ label: "가게 사진" })), "360 × 270 → 135")}</div>`,
  },

  {
    title: "그림 — 무엇이 없는지",
    description:
      "기본은 lucide image 다. 자리가 무엇인지 아이콘으로 말할 수 있으면 그 아이콘을 쓴다 — 카드 그림 credit-card, 영수증 사진 receipt, 문서 file-text. 당근 서비스별 그림(SEED 의 12가지)은 쓰지 않는다. 사람의 사진이 없으면 Avatar 의 이니셜이고, 자산 · 카드 로고의 글자 모노그램은 Image Frame 차례에 정한다.",
    jsx: `import { CreditCard, FileText, Receipt } from "lucide-react"

<ContentPlaceholder />                        {/* 기본 — ImageIcon */}
<ContentPlaceholder icon={<CreditCard />} />
<ContentPlaceholder icon={<Receipt />} />
<ContentPlaceholder icon={<FileText />} />`,
    render: () =>
      `<div style="${ROW}">${[
        ["image", "image — 기본"],
        ["creditCard", "credit-card"],
        ["receipt", "receipt"],
        ["fileText", "file-text"],
      ]
        .map(([icon, caption]) => labeled(frame("size-24 overflow-hidden rounded-r4", contentPlaceholder({ icon })), caption))
        .join("")}</div>`,
  },

  {
    title: "불러오는 동안은 Skeleton",
    description:
      "이미지를 불러오는 동안은 이 그림이 아니라 같은 모서리 · 같은 크기의 Skeleton 이다 — 불러오는 중과 없음이 같은 그림이면 기다려야 하는지 알 수 없다(SEED React Image Frame 은 불러오는 동안에도 이 그림을 보인다 — 따르지 않는다). 이미지 틀도 기다리는 영역의 시간표(1초 · 5초 · 10초)를 따른다. 다 불러왔는데 없거나 실패했을 때만 대체 그림이다.",
    jsx: `<div className="aspect-[1.586] w-28 overflow-hidden rounded-r2">
  {status === "loading" ? (
    <Skeleton className="size-full" />                 {/* 틀이 모서리를 자른다 */}
  ) : status === "failed" ? (
    <ContentPlaceholder icon={<CreditCard />} label="현대카드 M 카드 그림" />
  ) : (
    <img src={card.imageUrl} alt="현대카드 M 카드 그림" className="size-full object-cover" />
  )}
</div>`,
    render: () =>
      `<div style="${ROW}">${labeled(frame(CARD_FRAME, skeleton({ className: "size-full" })), "loading — Skeleton")}${labeled(
        frame(CARD_FRAME, contentPlaceholder({ icon: "creditCard", label: "현대카드 M 카드 그림" })),
        "failed — 대체 그림",
      )}${labeled(frame(CARD_FRAME, `<span role="img" aria-label="현대카드 M 카드 그림" style="${CARD_ART}">Hyundai M</span>`), "loaded")}</div>`,
  },
];
