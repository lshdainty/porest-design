/*
 * shadcn Avatar 예제 — docs site components/avatar.html 에서 Preview + Code 토글로 보인다.
 * 각 예제 = { title, description, jsx, render() }. 앞의 셋(이름 옆 · 혼자 · 묶음)은 차례 · 제목 · 코드가 specs/components/avatar.md 의
 * "코드" 절과 같고, 뒤의 셋(크기 10단계 · 이니셜과 이름 색 · 묶음 크기와 놓인 바탕)은 md 의 Properties 를 코드로 더 보인다.
 * 옛 예제(32 · 40 · 48 · 64 · 회색 · 브랜드 채움 이니셜 · 8 겹침 + 2px 링)를 대신한다.
 *
 * ROOT · INITIAL · LINE_HEIGHT_1 · HUE_BG · IMAGE · SIZES · STACK_RING · STACK_SIZES · STACK · STACK_SURFACE · OVERFLOW 는
 * recipes/shadcn/components/ui/avatar.tsx 의 상수와 글자 하나까지 같아야 한다 — 두 파일을 함께 고친다. avatarInitial · avatarHue 는 그 파일의
 * 규칙 함수와 같은 답을 낸다(김민수 → blue "김" · 이서연 → brown "이" · Kim Minsu → indigo "K").
 * 규칙은 specs/components/avatar.md, 수치 원본은 specs/components/avatar.yaml · avatar-stack.yaml.
 *
 * Preview 는 정적 HTML 이다 — 페이지의 Tailwind v4 browser CDN 이 클래스를 utility 로 만든다.
 * 짜임은 레시피가 그리는 DOM 그대로다 — 아바타 <span data-slot="avatar" data-status> > 이니셜 <span aria-hidden data-slot="avatar-initial"> 또는
 * 사진 <img data-slot="avatar-image" alt="">, 묶음 <span data-slot="avatar-stack"> > 아바타 … + "+N" <span aria-hidden data-slot="avatar-stack-overflow">.
 * 사진은 다 불러온 모습(data-status="loaded" — 이니셜을 걷었다)으로 그렸다. 레시피의 사진 상태(불러오는 동안 · 실패하면 이니셜)는 정적 HTML 에 없다.
 * 사진은 실제 사람이 아니라 사람 사진처럼 칠한 그림(SVG)이다. avatar.tsx 는 cn() 으로 합치지만 지워지는 클래스가 없다 — 줄 높이(leading-none)를
 * 글자 크기 뒤에 붙여 둔 까닭이다. 그래서 그대로 잇는다. 아바타는 누르지 않아 스크립트가 없다.
 */

// ── avatar.tsx 의 상수와 같은 값 ─────────────────────────────────────────

// 원 — 사진 · 이니셜을 원으로 자른다. ::after 가 1px 안쪽 테두리 stroke-neutral-subtle(사진 · 이니셜 위)
const ROOT = [
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full align-middle",
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_0_1px_var(--color-stroke-neutral-subtle)] after:content-['']",
].join(" ");

// 이니셜 — 이름 색 바탕 · fg-neutral-inverted · 700 · 줄 높이 1(px — 글자 크기 설정을 따르지 않는다). cn(INITIAL, HUE_BG[색], SIZES[크기].initial, LINE_HEIGHT_1)
const INITIAL = "flex size-full items-center justify-center font-sans font-bold uppercase text-fg-neutral-inverted";
const LINE_HEIGHT_1 = "leading-none";
const HUE_BG = {
  blue: "bg-chart-blue",
  green: "bg-chart-green",
  orange: "bg-chart-orange",
  violet: "bg-chart-violet",
  pink: "bg-chart-pink",
  indigo: "bg-chart-indigo",
  red: "bg-chart-red",
  yellow: "bg-chart-yellow",
  brown: "bg-chart-brown",
  gray: "bg-chart-gray",
};

const IMAGE = "absolute inset-0 size-full object-cover";

// 크기 — 지름 · 이니셜 글자(지름의 40%, 가장 작아도 10)
const SIZES = {
  20: { box: "size-[20px]", initial: "text-[10px]" },
  24: { box: "size-[24px]", initial: "text-[10px]" },
  36: { box: "size-[36px]", initial: "text-[14px]" },
  42: { box: "size-[42px]", initial: "text-[17px]" },
  48: { box: "size-[48px]", initial: "text-[19px]" },
  56: { box: "size-[56px]", initial: "text-[22px]" },
  64: { box: "size-[64px]", initial: "text-[26px]" },
  80: { box: "size-[80px]", initial: "text-[32px]" },
  96: { box: "size-[96px]", initial: "text-[38px]" },
  108: { box: "size-[108px]", initial: "text-[43px]" },
};

// 묶음 안 — 놓인 바탕색 링(바깥 box-shadow, 두께 · 색은 묶음이 정한다)
const STACK_RING = "shadow-[0_0_0_var(--avatar-stack-ring-width)_var(--avatar-stack-ring-color)]";

// 묶음 — 겹침(다음 아바타의 왼쪽 바깥 여백, 지름의 약 1/4) · 링 두께 · "+N" 크기 · 글자(지름의 36%, 가장 작아도 10)
const STACK_SIZES = {
  20: { root: "[--avatar-stack-ring-width:1px] [&>*+*]:-ml-[5px]", overflow: "size-[20px] text-[10px]" },
  24: { root: "[--avatar-stack-ring-width:1px] [&>*+*]:-ml-[6px]", overflow: "size-[24px] text-[10px]" },
  36: { root: "[--avatar-stack-ring-width:2px] [&>*+*]:-ml-[8px]", overflow: "size-[36px] text-[13px]" },
  42: { root: "[--avatar-stack-ring-width:2px] [&>*+*]:-ml-[10px]", overflow: "size-[42px] text-[15px]" },
  48: { root: "[--avatar-stack-ring-width:2px] [&>*+*]:-ml-[12px]", overflow: "size-[48px] text-[17px]" },
  56: { root: "[--avatar-stack-ring-width:3px] [&>*+*]:-ml-[13px]", overflow: "size-[56px] text-[20px]" },
  64: { root: "[--avatar-stack-ring-width:3px] [&>*+*]:-ml-[16px]", overflow: "size-[64px] text-[23px]" },
  80: { root: "[--avatar-stack-ring-width:4px] [&>*+*]:-ml-[20px]", overflow: "size-[80px] text-[29px]" },
  96: { root: "[--avatar-stack-ring-width:5px] [&>*+*]:-ml-[24px]", overflow: "size-[96px] text-[35px]" },
  108: { root: "[--avatar-stack-ring-width:5px] [&>*+*]:-ml-[27px]", overflow: "size-[108px] text-[39px]" },
};

const STACK = "inline-flex shrink-0 items-center align-middle";
const STACK_SURFACE = {
  default: "[--avatar-stack-ring-color:var(--color-bg-layer-default)]",
  floating: "[--avatar-stack-ring-color:var(--color-bg-layer-floating)]",
};

// "+N" 원 — 아바타와 같은 크기 · 같은 링, 옅은 면 + 숫자. cn(OVERFLOW, STACK_SIZES[크기].overflow, LINE_HEIGHT_1)
const OVERFLOW = [
  "relative inline-flex shrink-0 select-none items-center justify-center rounded-full bg-bg-neutral-weak font-sans font-bold text-fg-neutral-muted",
  STACK_RING,
].join(" ");

// ── avatar.tsx 의 규칙 함수와 같은 답 ─────────────────────────────────────

const AVATAR_HUES = ["blue", "green", "orange", "violet", "pink", "indigo", "red", "yellow", "brown", "gray"];
const displayName = (name) => String(name).trim();
const graphemes = new Intl.Segmenter(undefined, { granularity: "grapheme" });

/** 이니셜 — 표시 이름의 첫 글자 하나(사용자가 보는 글자 단위), 로마자는 대문자. 이름이 비면 "" */
function avatarInitial(name) {
  const shown = displayName(name);
  if (shown === "") return "";
  return (graphemes.segment(shown)[Symbol.iterator]().next().value?.segment ?? "").toUpperCase();
}

/** 이름 색 — 표시 이름의 유니코드 코드 포인트 합 % 10 → 차트 10색(v110 순서). 이름이 비면 gray */
function avatarHue(name) {
  const shown = displayName(name);
  if (shown === "") return "gray";
  let sum = 0;
  for (const ch of shown) sum += ch.codePointAt(0) ?? 0;
  return AVATAR_HUES[sum % 10] ?? "gray";
}
const codePointSum = (name) => [...displayName(name)].reduce((a, ch) => a + ch.codePointAt(0), 0);

// ── 미리보기 조각 ─────────────────────────────────────────────────────────

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// 사진 자리 — 사람 사진처럼 칠한 그림(실제 사람 · 사진이 아니다)
function photo(n = 0) {
  const sets = [["#b9c9d9", "#7d8fa3", "#3d342e"], ["#e3c9b0", "#c19a7a", "#2b2320"], ["#cfd8c8", "#94a38b", "#4a3a2c"]];
  const [a, b, hair] = sets[n % sets.length];
  const art = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="96" height="96" fill="url(#g)"/><circle cx="48" cy="40" r="18" fill="#f1d5bd"/><path d="M29 37c0-13 9-20 19-20s19 7 19 20c-4-4-10-6-19-6s-15 2-19 6Z" fill="${hair}"/><path d="M12 96c0-21 16-35 36-35s36 14 36 35Z" fill="#f4f4f4"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(art)}`;
}

// <Avatar> — avatar.tsx 그대로. 사진은 다 불러온 모습(이니셜 없음). decorative 면 aria-hidden, 아니면 role="img" + 이름.
// stack 은 묶음의 문맥(크기를 따르고 링을 두르고 따로 읽지 않는다)
function avatar({ name, src, size = 48, decorative = true }, stack = null) {
  const s = stack?.size ?? size;
  const shown = displayName(name);
  const hidden = decorative || stack != null;
  const root = [
    'data-slot="avatar"',
    `data-status="${src ? "loaded" : "none"}"`,
    !hidden && 'role="img"',
    !hidden && `aria-label="${esc(shown)}"`,
    hidden && 'aria-hidden="true"',
    `class="${[ROOT, SIZES[s].box, stack && STACK_RING].filter(Boolean).join(" ")}"`,
  ].filter(Boolean).join(" ");
  const inner = src
    ? `<img data-slot="avatar-image" src="${src}" alt="" class="${IMAGE}">`
    : `<span aria-hidden="true" data-slot="avatar-initial" class="${INITIAL} ${HUE_BG[avatarHue(shown)]} ${SIZES[s].initial} ${LINE_HEIGHT_1}">${esc(avatarInitial(shown))}</span>`;
  return `<span ${root}>${inner}</span>`;
}

// <AvatarStack> — avatar.tsx 그대로. 앞 max 명 + "+N"(99 를 넘으면 "+99"). ariaLabel 이 있으면 그림 하나(role="img"), 없으면 aria-hidden
function avatarStack({ size = 24, max = 4, surface = "default", ariaLabel, people }) {
  const limit = Math.max(1, Math.floor(max));
  const shown = people.slice(0, limit);
  const rest = people.length - shown.length;
  const root = [
    'data-slot="avatar-stack"',
    ariaLabel ? 'role="img"' : 'aria-hidden="true"',
    `class="${STACK} ${STACK_SIZES[size].root} ${STACK_SURFACE[surface]}"`,
    ariaLabel && `aria-label="${esc(ariaLabel)}"`,
  ].filter(Boolean).join(" ");
  const more = rest > 0 ? `<span aria-hidden="true" data-slot="avatar-stack-overflow" class="${OVERFLOW} ${STACK_SIZES[size].overflow} ${LINE_HEIGHT_1}">+${Math.min(rest, 99)}</span>` : "";
  return `<span ${root}>${shown.map((p) => avatar(p, { size })).join("")}${more}</span>`;
}

// 흰 표면 · 폰 화면 · 이름표 — 미리보기 틀(레시피가 아니다)
const SURFACE =
  "background:var(--color-bg-layer-default); border:1px solid var(--color-stroke-neutral-subtle); border-radius:var(--radius-r4); padding:var(--spacing-x5) var(--spacing-x6); color:var(--color-fg-neutral); font-family:var(--font-sans);";
const surface = (html, extra = "") => `<div style="${SURFACE}${extra}">${html}</div>`;
const SCREEN =
  "max-width:360px; background:var(--color-bg-layer-default); border:1px solid var(--color-stroke-neutral-subtle); border-radius:var(--radius-r4); padding:var(--spacing-x3) var(--spacing-global-gutter); color:var(--color-fg-neutral); font-family:var(--font-sans);";
const screen = (html) => `<div style="${SCREEN}">${html}</div>`;
const stack = (items, gap = "var(--spacing-x4)") => `<div style="display:flex; flex-direction:column; gap:${gap};">${items.join("")}</div>`;
const row = (items, gap = "var(--spacing-x4)", align = "flex-end") => `<div style="display:flex; flex-wrap:wrap; align-items:${align}; gap:${gap};">${items.join("")}</div>`;
const CAPTION = "font-size:var(--text-t2); line-height:var(--text-t2--line-height); font-weight:400; color:var(--color-fg-neutral-subtle);";
const CODE = `${CAPTION} font-family:ui-monospace, SFMono-Regular, Menlo, monospace;`;
const labeled = (html, caption, style = CODE, align = "center") =>
  `<div style="display:flex; flex-direction:column; align-items:${align}; gap:var(--spacing-x1_5); min-width:0; text-align:${align === "center" ? "center" : "left"};">${html}<span style="${style}">${caption}</span></div>`;
const NAME = "font-size:var(--text-t5); line-height:var(--text-t5--line-height); color:var(--color-fg-neutral);";
const SUB = "font-size:var(--text-t3); line-height:var(--text-t3--line-height); color:var(--color-fg-neutral-subtle);";

// ── 화면 예시의 값 ────────────────────────────────────────────────────────

// 제주 여행 더치페이 참가자 — 6명(앞 4명 + "+2")
const PEOPLE = ["김민수", "이서연", "박지훈", "최유진", "정하늘", "한지우"].map((name, i) => ({ id: `p${i}`, name }));
// 이름 색 열 가지 — 나머지 0 ~ 9 가 하나씩 나오는 이름
const HUE_NAMES = ["김민수", "박지훈", "한지우", "강도윤", "윤재현", "Kim Minsu", "권나래", "정하늘", "이서연", "유승우"];

// ── 예제 ──────────────────────────────────────────────────────────────────

export const avatarExamples = [
  {
    title: "이름 옆 — 장식",
    description:
      "사람 한 명을 보이는 원이다 — 사진(src)이 있으면 사진, 없으면 이름의 첫 글자(이니셜) + 이름 색이다. 아바타 옆에는 대개 이름이 있어 아바타는 장식이다(decorative 기본 true — aria-hidden) — 보조 기술은 이름을 한 번만 읽는다(\"김 김민수\" 가 아니다). 한 줄 목록은 36, 이름 + 설명 두 줄이면 42 — 같은 자리는 어느 화면에서나 같은 크기다. 모든 크기에 1px 안쪽 테두리(stroke-neutral-subtle)를 겹쳐 흰 사진이 흰 바탕에 묻히지 않는다. 상태(안 낸 사람)는 아바타를 흐리게 하지 않고 이름 옆 글 · Badge 로 알린다.",
    jsx: `import { Avatar } from "@/components/ui/avatar"

<span className="flex items-center gap-x3">
  <Avatar size={36} name={p.name} src={p.photoUrl} />
  <span>{p.name}</span>
</span>`,
    render: () =>
      screen(
        stack(
          [
            { name: "김민수" },
            { name: "이서연" },
            { name: "윤재현", src: photo(0) },
          ].map((p) => `<span class="flex items-center gap-x3">${avatar({ size: 36, name: p.name, src: p.src })}<span style="${NAME}">${esc(p.name)}</span></span>`),
          "var(--spacing-x3)",
        ),
      ),
  },

  {
    title: "혼자 — 이름을 읽는다",
    description:
      "이름 없이 아바타만 있으면(접힌 사이드바 · 큰 프로필 사진) decorative={false} 로 아바타가 이름을 가진다 — role=\"img\" + aria-label={이름}. 사진을 못 불러와 이니셜이 보여도 같은 이름이다. 사진의 alt 는 늘 \"\" 다(이름은 아바타가 읽는다). 크기는 자리마다 대표 크기 — 사이드바 사용자 36, HR 내 정보 · 직원 정보의 큰 사진 96. 누르는 자리(프로필 열기)는 감싼 버튼 · 링크가 누름 · 포커스를 가진다.",
    jsx: `<Avatar size={36} name={me.name} decorative={false} />
<Avatar size={96} name={user.name} src={user.profileUrl} decorative={false} />`,
    render: () =>
      surface(
        row([
          labeled(avatar({ size: 36, name: "김민수", decorative: false }), "role=\"img\" · \"김민수\""),
          labeled(avatar({ size: 96, name: "서다은", src: photo(1), decorative: false }), "role=\"img\" · \"서다은\""),
        ], "var(--spacing-x8)"),
      ),
  },

  {
    title: "묶음 — 앞 4명 + \"+N\"",
    description:
      "여러 사람은 AvatarStack 으로 겹쳐 묶는다 — 다음 아바타가 지름의 약 1/4(24 이면 6) 왼쪽으로 겹치고, 놓인 바탕색 링(24 이면 1 — 바깥 box-shadow 라 크기가 그대로다)으로 앞 아바타를 끊으며, 뒤에 오는 아바타가 위에 그려진다. 5명 이상이면 앞 4명 + 끝에 \"+N\" 원(같은 크기 · 같은 링 · bg-neutral-weak + fg-neutral-muted 700)이다 — N = 전체 − 4, 99 를 넘으면 \"+99\". 크기는 묶음이 정하고 안의 아바타가 모두 따른다(기본 24 — 줄 안 묶음). 묶음 옆에 전체 수를 글로 두면 묶음은 장식(aria-hidden)이다. 묶음만 있으면 aria-label 을 준다 — \"참여자 6명: 김민수, 이서연, 박지훈, 최유진 외 2명\".",
    jsx: `import { Avatar, AvatarStack } from "@/components/ui/avatar"

<span className="flex items-center gap-x2">
  <AvatarStack size={24}>
    {people.map((p) => <Avatar key={p.id} name={p.name} src={p.photoUrl} />)}
  </AvatarStack>
  <span>{people.length}명 · {formatWon(total)}</span>
</span>`,
    render: () =>
      screen(
        stack(
          [
            `<span style="${NAME}">제주 여행</span>`,
            `<span class="flex items-center gap-x2">${avatarStack({ size: 24, people: PEOPLE })}<span style="${SUB}">6명 · 412,000원</span></span>`,
          ],
          "var(--spacing-x1)",
        ),
      ),
  },

  {
    title: "크기 10단계",
    description:
      "크기는 SEED 의 10단계다 — 20 · 24 · 36 · 42 · 48(기본) · 56 · 64 · 80 · 96 · 108. 자리마다 대표 크기를 쓰고 이 밖의 크기를 만들지 않는다 — 글 한 줄 안 20 · 줄 안 묶음 24 · 한 줄 목록 36 · 두 줄 목록 42 · Desk 계정 머리 80 · HR 큰 사진 96 · 사진 수정 108. 이니셜은 지름의 40%(가장 작아도 10) · 700 · 줄 높이 1 이고 글자 크기 설정을 따르지 않는 px 다(원 안에서 넘치지 않게).",
    jsx: `<Avatar size={20} name="김민수" />
<Avatar size={24} name="김민수" />
<Avatar size={36} name="김민수" />
<Avatar size={42} name="김민수" />
<Avatar name="김민수" />            {/* 48 — 기본 */}
<Avatar size={56} name="김민수" />
<Avatar size={64} name="김민수" />
<Avatar size={80} name="김민수" />
<Avatar size={96} name="김민수" />
<Avatar size={108} name="김민수" />`,
    render: () =>
      surface(
        `<div style="overflow-x:auto;">${row(
          [20, 24, 36, 42, 48, 56, 64, 80, 96, 108].map((size) => labeled(avatar({ size, name: "김민수" }), `${size}`)),
          "var(--spacing-x3) var(--spacing-x4)",
        )}</div>`,
      ),
  },

  {
    title: "이니셜과 이름 색 — 웹 · 앱이 같은 규칙",
    description:
      "같은 사람은 웹 · 앱 · 어느 화면에서나 같은 글자 · 같은 색이다. 표시 이름은 서버가 준 이름에서 앞뒤 공백만 뺀 글이다. 이니셜은 그 첫 글자 하나(Intl.Segmenter — 사용자가 보는 글자 단위)이고 로마자는 대문자다(\"Kim Minsu\" → \"K\", 두 글자 \"Ki\" 가 아니다). 이름 색은 유니코드 코드 포인트(UTF-16 단위가 아니다)를 모두 더해 10 으로 나눈 나머지로 차트 10색을 고른다 — 0 blue · 1 green · 2 orange · 3 violet · 4 pink · 5 indigo · 6 red · 7 yellow · 8 brown · 9 gray(v110 순서). 김민수 142420 → 0 blue · 이서연 151168 → 8 brown · Kim Minsu 845 → 5 indigo. 글자는 fg-neutral-inverted(라이트 흰 · 다크 짙은 글자 — 4.55 ~ 7.70:1)이고 색은 뜻이 없다(장식). 이름이 비면 회색 원에 글자를 넣지 않는다. 앱은 같은 규칙을 Dart 로 두고 이 예시 이름으로 같은 답이 나오는지 시험한다.",
    jsx: `import { avatarHue, avatarInitial } from "@/components/ui/avatar"

avatarInitial("김민수")    // "김"
avatarHue("김민수")        // "blue"   — 142420 % 10 = 0
avatarHue("이서연")        // "brown"  — 151168 % 10 = 8
avatarInitial("Kim Minsu") // "K"
avatarHue("Kim Minsu")     // "indigo" — 845 % 10 = 5`,
    render: () =>
      surface(
        `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(88px, 1fr)); gap:var(--spacing-x4) var(--spacing-x3);">${HUE_NAMES.map((name) =>
          labeled(avatar({ size: 42, name }), `${esc(name)}<br>${codePointSum(name)} → ${avatarHue(name)}`),
        ).join("")}${labeled(avatar({ size: 42, name: "" }), "\"\" → gray · 글자 없음")}</div>`,
      ),
  },

  {
    title: "묶음 크기 · 놓인 바탕",
    description:
      "겹침 · 링 · \"+N\" 글자는 크기마다 정해져 있다 — 20 · 24 는 겹침 5 · 6 · 링 1, 36 · 42 · 48 은 8 · 10 · 12 · 링 2, 56 · 64 는 13 · 16 · 링 3, 80 은 20 · 링 4, 96 · 108 은 24 · 27 · 링 5. 4명 이하면 모두 보이고 \"+N\" 이 없다(max — 기본 4). 링은 놓인 바탕과 같은 색이다 — surface=\"default\"(기본 · bg-layer-default), 시트 · 대화상자 · 팝오버 안이면 surface=\"floating\"(bg-layer-floating — 다크에서 두 바탕이 다르다).",
    jsx: `<AvatarStack size={36}>{four}</AvatarStack>                   {/* 4명 — "+N" 없음 */}
<AvatarStack size={48}>{six}</AvatarStack>                    {/* 앞 4명 + "+2" */}
<AvatarStack size={36} surface="floating">{six}</AvatarStack> {/* 시트 안 */}`,
    render: () =>
      stack([
        surface(
          row(
            [
              labeled(avatarStack({ size: 36, people: PEOPLE.slice(0, 4) }), "36 · 4명", CODE, "flex-start"),
              labeled(avatarStack({ size: 48, people: PEOPLE }), "48 · 앞 4명 + \"+2\"", CODE, "flex-start"),
            ],
            "var(--spacing-x6)",
          ),
        ),
        `<div style="${SURFACE} background:var(--color-bg-layer-floating);">${labeled(avatarStack({ size: 36, surface: "floating", people: PEOPLE }), "surface=\"floating\" — 링 bg-layer-floating", CODE, "flex-start")}</div>`,
      ]),
  },
];
