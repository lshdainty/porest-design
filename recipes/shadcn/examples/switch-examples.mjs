/*
 * shadcn Switch 예제 — docs site components/switch.html 에서 Preview + Code 토글로 보인다.
 * 각 예제 = { title, description, jsx, render() }. 차례 · 제목 · 코드는 specs/components/switch.md 의 "코드" 절을 따른다.
 *
 * SWITCHMARK_* · THUMB_* · ROW_* · LABEL_* 는
 * recipes/shadcn/components/ui/switch.tsx 의 cva 정의와 글자 하나까지 같아야 한다 — 두 파일을 함께 고친다.
 * 규칙은 specs/components/switch.md, 수치 원본은 specs/components/switch.yaml.
 *
 * Preview 는 정적 HTML 이다 — 페이지의 Tailwind v4 browser CDN 이 클래스를 utility 로 만든다.
 * 스위치는 Radix Switch.Root 가 그리는 모양 그대로 <button role="switch" data-state> 로 그린다 — 켬 · 끔은 data-state,
 * 비활성은 disabled 라서 cva 의 data-[state=…]: · disabled: 클래스가 그대로 먹는다.
 * 엄지는 Radix Switch.Thumb 가 그리는 <span data-state> 다 — 막히면 스위치와 엄지 둘 다에 data-disabled 가 붙는다.
 * 눌러서 켜고 끄는 동작은 React 에서 Radix 가 맡는다 — 미리보기는 켜거나 끈 뒤의 한 순간이다.
 */

// ── switch.tsx 의 cva 와 같은 값 ───────────────────────────────────────────

// Switchmark — 스위치(switchmarkVariants). 트랙이다
const SWITCHMARK_BASE = [
  "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
  "[transition:background-color_var(--motion-duration-d1)_var(--motion-ease-easing)_20ms,scale_var(--motion-duration-pressed-scale)_var(--motion-ease-pressed-scale)]",
  "active:[scale:calc(1-2/var(--press-basis))] group-active/switch:[scale:calc(1-2/var(--press-basis))] motion-reduce:active:[scale:1] motion-reduce:group-active/switch:[scale:1]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus-ring",
  "disabled:pointer-events-none disabled:cursor-not-allowed",
  // 끔 — 꺼진 트랙. 켬은 톤에서 채운다
  "bg-stroke-neutral-solid",
  // 막힘 — 끔은 옅은 트랙 + 안쪽 선, 켬은 켜진 모양 그대로 회색 채움
  "disabled:bg-bg-disabled disabled:inset-ring disabled:inset-ring-stroke-neutral-weak",
  "data-[state=checked]:disabled:bg-fg-disabled data-[state=checked]:disabled:inset-ring-0",
].join(" ");

// 크기 이름은 글자다("16" · "24" · "32") — .mjs 에서는 prettier 가 숫자 꼴 키의 따옴표를 떼지만 같은 글자 키다
const SWITCHMARK_VARIANTS = {
  size: {
    16: "h-4 w-[26px] p-0.5 [--press-basis:24]",
    24: "h-6 w-[38px] p-0.5 [--press-basis:24]",
    32: "h-8 w-[52px] p-[3px] [--press-basis:32]",
  },
  tone: {
    neutral: "data-[state=checked]:bg-bg-neutral-inverted",
    brand: "data-[state=checked]:bg-bg-brand-solid",
  },
};

const SWITCHMARK_DEFAULTS = {
  size: "24",
  tone: "neutral",
};

// 엄지(switchmarkThumbVariants) — 끄면 0.8, 켜면 오른쪽으로 가며 1. 색은 톤에서, 막히면 회색(끔) · 밝은 색(켬)
const THUMB_BASE = [
  "pointer-events-none block scale-[0.8] rounded-full",
  "[transition:translate_var(--motion-duration-d3)_var(--motion-ease-easing),scale_var(--motion-duration-d3)_var(--motion-ease-easing),background-color_var(--motion-duration-d1)_var(--motion-ease-easing)_20ms]",
  "data-[state=checked]:scale-100",
  "data-[disabled]:bg-fg-disabled data-[disabled]:data-[state=checked]:bg-bg-disabled",
].join(" ");

const THUMB_VARIANTS = {
  size: {
    16: "size-3 data-[state=checked]:translate-x-[10px]",
    24: "size-5 data-[state=checked]:translate-x-[14px]",
    32: "size-[26px] data-[state=checked]:translate-x-5",
  },
  tone: {
    neutral: "bg-fg-neutral-inverted",
    brand: "bg-static-white",
  },
};

const THUMB_DEFAULTS = {
  size: "24",
  tone: "neutral",
};

// Switch — 한 줄(switchVariants). 누르는 영역은 ::before 로 44 까지
const ROW_BASE = [
  "group/switch relative inline-flex cursor-pointer select-none items-center self-start",
  "before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-11 before:w-full before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
  "has-[:disabled]:pointer-events-none has-[:disabled]:cursor-not-allowed",
].join(" ");

const ROW_VARIANTS = {
  size: {
    16: "min-h-6 gap-x1_5",
    24: "min-h-6 gap-x2",
    32: "min-h-8 gap-x2_5",
  },
};

const ROW_DEFAULTS = { size: "24" };

// Switch 의 라벨(switchLabelVariants)
const LABEL_BASE = "font-sans font-medium text-fg-neutral peer-disabled:text-fg-disabled";

const LABEL_VARIANTS = {
  size: {
    16: "text-t3",
    24: "text-t4",
    32: "text-t5",
  },
};

const LABEL_DEFAULTS = { size: "24" };

// ── cva 풀이 ──────────────────────────────────────────────────────────────

// cva 와 같은 순서로 붙인다 — base → 축(선언 순). 고르지 않은 축은 기본값을 쓴다.
// switch.tsx 는 이 결과를 cn() 에 한 번 더 넣지만(엄지는 넣지 않는다) 지워지는 클래스가 없다 —
// 같은 속성을 다시 쓰는 클래스는 data-[state=…]: · disabled: 같은 접두어가 갈라 둔다.
function cvaOf(base, { variants, defaultVariants = {} }) {
  return (props = {}) =>
    [base, ...Object.entries(variants).map(([axis, map]) => map[props[axis] ?? defaultVariants[axis]])]
      .filter(Boolean)
      .join(" ");
}

const switchmarkVariants = cvaOf(SWITCHMARK_BASE, {
  variants: SWITCHMARK_VARIANTS,
  defaultVariants: SWITCHMARK_DEFAULTS,
});
const switchmarkThumbVariants = cvaOf(THUMB_BASE, { variants: THUMB_VARIANTS, defaultVariants: THUMB_DEFAULTS });
const switchVariants = cvaOf(ROW_BASE, { variants: ROW_VARIANTS, defaultVariants: ROW_DEFAULTS });
const switchLabelVariants = cvaOf(LABEL_BASE, { variants: LABEL_VARIANTS, defaultVariants: LABEL_DEFAULTS });

// ── 미리보기 조각 ─────────────────────────────────────────────────────────

const attrs = (list) => list.filter(Boolean).join(" ");

// <Switchmark> 한 개 — Radix Switch.Root · Thumb 가 그리는 모양.
// 엄지(Thumb)는 늘 들어 있다 — 끄면 왼쪽에서 0.8 로 작고, 켜면 오른쪽으로 가며 1 이 된다.
function switchmark({ size, tone, checked = false, disabled = false } = {}) {
  const radix = attrs([`data-state="${checked ? "checked" : "unchecked"}"`, disabled && 'data-disabled=""']);
  const root = attrs([
    'type="button"',
    'role="switch"',
    `aria-checked="${checked}"`,
    radix,
    disabled && "disabled",
    `class="${switchmarkVariants({ size, tone })}"`,
  ]);
  return `<button ${root}><span ${radix} class="${switchmarkThumbVariants({ size, tone })}"></span></button>`;
}

// <Switch> 한 줄 — <label> 이 스위치와 라벨을 감싸, 라벨을 눌러도 스위치가 반응한다(group/switch).
// switch 는 예약어라 도우미 이름은 switchRow 다.
function switchRow({ label, size, tone, checked, disabled } = {}) {
  const text = `<span class="${switchLabelVariants({ size })}">${label}</span>`;
  return `<label class="${switchVariants({ size })}">${switchmark({ size, tone, checked, disabled })}${text}</label>`;
}

// Desk 알림 설정의 줄 — 누르는 순간 적용되는 설정이다. [제목, 켬]
const NOTIFICATIONS = [
  ["결제 알림", true],
  ["예산 알림", true],
  ["주간 리포트", false],
];

// 스위치는 보통 기본 레이어(흰 면) 위에 놓인다. 사이트 미리보기 칸의 바탕(bg-page = bg-layer-basement)은
// 막힌 채 꺼진 트랙의 채움(bg-disabled, gray-200)과 같은 색이라, 그 위에 바로 그리면 트랙이 안쪽 선만 남는다.
const SURFACE =
  "background:var(--color-bg-layer-default); border:1px solid var(--color-stroke-neutral-subtle); border-radius:var(--radius-r4); padding:var(--spacing-x5) var(--spacing-x6);";
const surface = (html) => `<div style="${SURFACE}">${html}</div>`;

// 아래 끝을 맞춘다 — 높이가 다른 줄(24 · 32)을 나란히 둬도 이름표가 한 줄에 선다
const GALLERY = "display:flex; flex-wrap:wrap; align-items:flex-end; gap:var(--spacing-x5) var(--spacing-x8);";
const CAPTION =
  "font-size:var(--text-t2); line-height:var(--text-t2--line-height); font-weight:400; color:var(--color-fg-neutral-subtle);";
// 속성 이름처럼 코드로 쓰는 이름표
const CODE = `${CAPTION} font-family:ui-monospace, SFMono-Regular, Menlo, monospace;`;

// 아래 이름표
function labeled(html, caption, style = CAPTION) {
  return `<div style="display:flex; flex-direction:column; align-items:flex-start; gap:var(--spacing-x2);">${html}<span style="${style}">${caption}</span></div>`;
}

// ── 예제 ──────────────────────────────────────────────────────────────────

export const switchExamples = [
  {
    title: "기본",
    description:
      '스위치와 라벨을 한 줄로 묶은 Switch 다 — 스위치가 왼쪽 · 라벨이 오른쪽이고, 24 · neutral 이 기본이다. 누르는 순간 적용되는 설정에만 쓴다 — 저장을 눌러야 적용되는 선택은 Checkbox 다. 일정의 "종일" 은 값이 저장 때 들어가지만 누르면 날짜 칸이 바로 바뀌므로 Switch 다. 켜면 엄지가 오른쪽으로 가며 커지고(0.8 → 1) 트랙에 색이 찬다 — 색 말고도 엄지의 자리 · 크기로 켬 · 끔이 갈린다. 라벨을 눌러도 스위치가 바뀌고(누르는 동안 스위치만 줄어든다), 누르는 영역은 보이는 줄(24)보다 넓게 ::before 로 가로 · 세로 44 까지 넓힌다. 처음 값만 주려면 defaultChecked 를 쓴다.',
    jsx: `import { Switch } from "@/components/ui/switch"

<Switch defaultChecked label="종일" />`,
    // 줄(inline-flex)을 글줄에 그대로 두면 글줄 높이만큼 아래가 뜬다 — flex 안에 둔다
    render: () => surface(`<div style="display:flex;">${switchRow({ label: "종일", checked: true })}</div>`),
  },

  {
    title: "크기",
    description:
      '크기 이름은 트랙 높이다 — 트랙 · 엄지 · 라벨 · 줄 높이가 함께 정해진다. 16(트랙 26 × 16 · 엄지 12 · 라벨 13)은 촘촘한 자리에, 24(트랙 38 × 24 · 엄지 20 · 라벨 14)는 기본으로 화면 안의 설정 · 폼에, 32(트랙 52 × 32 · 엄지 26 · 라벨 16)는 제목이 큰 줄이나 모바일에서 홀로 서는 스위치에 쓴다. 줄 높이는 24 · 24 · 32 다 — 16 은 트랙보다 큰 24 를 누르는 영역의 바닥으로 둔다. 스위치와 라벨 사이는 6 · 8 · 10 이다. 누르는 영역은 세 크기 모두 44 까지 넓힌다. 스위치를 줄여 그리지 않는다 — 작은 자리에는 16 을 쓴다. 크기는 size="16" 처럼 글자로 넘긴다.',
    jsx: `<Switch size="16" defaultChecked label="16" />
<Switch size="24" defaultChecked label="24" />
<Switch size="32" defaultChecked label="32" />`,
    render: () =>
      surface(`<div style="${GALLERY}">
  ${labeled(switchRow({ size: "16", checked: true, label: "16" }), "트랙 26 × 16")}
  ${labeled(switchRow({ size: "24", checked: true, label: "24" }), "트랙 38 × 24 — 기본")}
  ${labeled(switchRow({ size: "32", checked: true, label: "32" }), "트랙 52 × 32")}
</div>`),
  },

  {
    title: "톤",
    description:
      "켰을 때의 색이다. neutral(짙은 회색)이 기본이고, brand 는 서비스 핵심 흐름에서만 쓴다 — 설정 화면의 스위치마다 브랜드 색을 깔면 브랜드 색 버튼이 설 자리가 없어진다. 켜면 트랙을 톤 색으로 채우고(neutral 은 bg-neutral-inverted, brand 는 bg-brand-solid) 엄지는 채움과 대비되는 색이다(neutral 은 fg-neutral-inverted, brand 는 흰색). 꺼진 트랙(stroke-neutral-solid)은 톤과 상관없다. 다크에서 neutral 의 켜짐은 밝은 트랙이 되어 꺼짐보다 또렷하다. brand 는 페이지 위의 브랜드 전환(Desk · HR)을 따른다 — Default(공유 토큰)에는 브랜드 색이 없어 켜진 트랙이 꺼진 트랙 색으로 남는다.",
    jsx: `<Switch defaultChecked label="neutral" />
<Switch defaultChecked tone="brand" label="brand" />`,
    render: () =>
      surface(`<div style="${GALLERY}">
  ${labeled(switchRow({ checked: true, label: "neutral" }), "기본")}
  ${labeled(switchRow({ tone: "brand", checked: true, label: "brand" }), "서비스 핵심 흐름에서만")}
</div>`),
  },

  {
    title: "값 다루기 · 비활성",
    description:
      "값은 checked · onCheckedChange 로 다룬다(처음 값만 주려면 defaultChecked). 누르면 스위치가 바로 바뀐다 — 서버 응답을 기다리지 않고, 저장에 실패하면 되돌리고 무엇이 안 됐는지 알린다. disabled 를 주면 누르기 · 키보드가 막히고 포커스에서 빠진다 — 값은 그대로 보이고, 켜 둔 채로도 막을 수 있다. 비활성은 전용 색이다 — 꺼진 채 막히면 bg-disabled 트랙 + stroke-neutral-weak 안쪽 선 + fg-disabled 엄지, 켜진 채 막히면 켜진 모양 그대로 fg-disabled 채움 + bg-disabled 엄지이고, 라벨도 fg-disabled 가 된다. 불투명도로 흐리게 하지 않는다. 켜진 채 막힌 트랙은 꺼진 트랙과 비슷한 회색이다(다크에서는 같은 값) — 켬 · 끔은 엄지의 자리 · 크기로, 막힘은 라벨의 비활성 색으로 읽는다.",
    jsx: `const [allDay, setAllDay] = useState(false)

<Switch checked={allDay} onCheckedChange={setAllDay} label="종일" />

<Switch disabled label="종일" />
<Switch disabled defaultChecked label="종일" />`,
    render: () =>
      surface(`<div style="${GALLERY}">
  ${labeled(switchRow({ label: "종일" }), "checked · onCheckedChange", CODE)}
  ${labeled(switchRow({ disabled: true, label: "종일" }), "disabled", CODE)}
  ${labeled(switchRow({ checked: true, disabled: true, label: "종일" }), "disabled · defaultChecked", CODE)}
</div>`),
  },

  {
    title: "스위치만",
    description:
      '줄을 따로 짤 때는 스위치(Switchmark)만 넣는다 — "라벨 왼쪽 · 스위치 오른쪽" 설정 줄이 그렇다. 줄을 <label> 로 감싸 줄 어디를 눌러도 바뀌게 한다 — 누르는 영역은 스위치가 아니라 줄이 맡고, 스위치의 이름도 그 <label> 의 글자에서 온다(감싸지 않으면 aria-labelledby · aria-label 을 반드시 단다). 줄 높이는 스위치 24 에 위 · 아래 여백 12 씩을 더한 48 이라 누르는 영역 44 를 채운다. 줄의 누름 피드백(줄 전체가 줄어든다)과 제목 · 설명 · 아이콘의 모양은 List 차례에 정한다 — 지금은 줄의 글자를 눌러도 스위치만 줄어든다(<label> 의 누름이 스위치로 넘어온다). 미리보기는 같은 줄을 알림 설정마다 하나씩 둔 모습이다.',
    jsx: `import { Switchmark } from "@/components/ui/switch"

<label className="flex cursor-pointer items-center gap-x3 px-x6 py-x3">
  <span className="flex-1">결제 알림</span>
  <Switchmark checked={on} onCheckedChange={setOn} />
</label>`,
    render: () => {
      const list =
        "max-width:360px; background:var(--color-bg-layer-default); border:1px solid var(--color-stroke-neutral-subtle); border-radius:var(--radius-r4);";
      const text =
        "flex:1; font-size:var(--text-t4); line-height:var(--text-t4--line-height); color:var(--color-fg-neutral);";
      // 코드의 줄(flex cursor-pointer items-center gap-x3 px-x6 py-x3)을 같은 값의 인라인 스타일로 그린다 — 줄에는 클래스가 없다
      const row = ([title, checked]) =>
        `<label style="display:flex; cursor:pointer; align-items:center; gap:var(--spacing-x3); padding:var(--spacing-x3) var(--spacing-x6);"><span style="${text}">${title}</span>${switchmark({ checked })}</label>`;
      return `<div style="display:flex; flex-direction:column; gap:var(--spacing-x2);">
  <span style="${CAPTION}">알림 설정 · 줄 전체가 누르는 영역</span>
  <div style="${list}">${NOTIFICATIONS.map(row).join("")}</div>
</div>`;
    },
  },
];
