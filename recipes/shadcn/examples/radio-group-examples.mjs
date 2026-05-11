/*
 * shadcn Radio Group 예제 — radio-group.tsx의 className과 동기 유지.
 *
 * Radix RadioGroupPrimitive를 정적 HTML로 흉내 — `data-state="checked|unchecked"`
 * 시각 상태만 표현. 실제 토글 동작은 React에서.
 */

// radio-group.tsx의 className과 1:1 동기 — motion 토큰 직접 인용.
const ITEM =
  "aspect-square h-[18px] w-[18px] rounded-full border border-border-strong text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary transition-[color,background-color,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] inline-flex items-center justify-center";

const DOT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><circle cx="12" cy="12" r="6"/></svg>';

const LABEL = "text-label-md font-medium text-text-primary leading-none cursor-pointer";

function radio({ checked = false, disabled = false, id = "" } = {}) {
  return `<button type="button" role="radio" aria-checked="${checked}" data-state="${checked ? "checked" : "unchecked"}"${disabled ? " disabled" : ""}${id ? ` id="${id}"` : ""} class="${ITEM}" style="color:var(--color-primary);">${checked ? DOT : ""}</button>`;
}

function label(text, htmlFor = "") {
  return `<label class="${LABEL}"${htmlFor ? ` for="${htmlFor}"` : ""}>${text}</label>`;
}

export const radioGroupExamples = [
  {
    title: "Default",
    description: "기본 단일 선택 그룹 — 세로 정렬.",
    jsx: `<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">옵션 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">옵션 2</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-3" id="r3" />
    <Label htmlFor="r3">옵션 3</Label>
  </div>
</RadioGroup>`,
    render: () => `<div role="radiogroup" style="display:grid; gap:var(--spacing-sm);">
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ checked: true, id: "r1" })}${label("옵션 1", "r1")}</div>
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ id: "r2" })}${label("옵션 2", "r2")}</div>
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ id: "r3" })}${label("옵션 3", "r3")}</div>
</div>`,
  },

  {
    title: "Horizontal",
    description: "가로 정렬 — className으로 grid-flow 변경. 짧은 옵션에 적합.",
    jsx: `<RadioGroup defaultValue="m" className="flex gap-4">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="s" id="size-s" />
    <Label htmlFor="size-s">S</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="m" id="size-m" />
    <Label htmlFor="size-m">M</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="l" id="size-l" />
    <Label htmlFor="size-l">L</Label>
  </div>
</RadioGroup>`,
    render: () => `<div role="radiogroup" style="display:flex; gap:var(--spacing-lg);">
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ id: "size-s" })}${label("S", "size-s")}</div>
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ checked: true, id: "size-m" })}${label("M", "size-m")}</div>
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ id: "size-l" })}${label("L", "size-l")}</div>
</div>`,
  },

  {
    title: "Disabled option",
    description: "특정 옵션만 비활성화 — disabled prop을 RadioGroupItem에.",
    jsx: `<RadioGroup defaultValue="standard">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="basic" id="plan-basic" />
    <Label htmlFor="plan-basic">Basic — 무료</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="standard" id="plan-standard" />
    <Label htmlFor="plan-standard">Standard — 월 9,900원</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="pro" id="plan-pro" disabled />
    <Label htmlFor="plan-pro" className="opacity-50">Pro — 출시 예정</Label>
  </div>
</RadioGroup>`,
    render: () => `<div role="radiogroup" style="display:grid; gap:var(--spacing-sm);">
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ id: "plan-basic" })}${label("Basic — 무료", "plan-basic")}</div>
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ checked: true, id: "plan-standard" })}${label("Standard — 월 9,900원", "plan-standard")}</div>
  <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ disabled: true, id: "plan-pro" })}<span style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary); opacity:0.5;">Pro — 출시 예정</span></div>
</div>`,
  },

  {
    title: "Form field (Desk 시나리오)",
    description: "Label + 보조 설명 + radio group 조합 — 알림 빈도 선택.",
    jsx: `<div className="space-y-3">
  <div className="space-y-1">
    <Label>알림 받기</Label>
    <p className="text-caption text-text-tertiary">
      가계부 거래 발생 시 알림 받을 빈도를 선택하세요.
    </p>
  </div>
  <RadioGroup defaultValue="instant">
    <div className="flex items-center gap-2">
      <RadioGroupItem value="instant" id="freq-instant" />
      <Label htmlFor="freq-instant">즉시</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem value="daily" id="freq-daily" />
      <Label htmlFor="freq-daily">하루 1회 요약</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem value="weekly" id="freq-weekly" />
      <Label htmlFor="freq-weekly">주간 리포트만</Label>
    </div>
  </RadioGroup>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-md);">
  <div style="display:flex; flex-direction:column; gap:var(--spacing-xs);">
    <span style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary);">알림 받기</span>
    <p style="margin:0; font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-tertiary);">가계부 거래 발생 시 알림 받을 빈도를 선택하세요.</p>
  </div>
  <div role="radiogroup" style="display:grid; gap:var(--spacing-sm);">
    <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ checked: true, id: "freq-instant" })}${label("즉시", "freq-instant")}</div>
    <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ id: "freq-daily" })}${label("하루 1회 요약", "freq-daily")}</div>
    <div style="display:flex; align-items:center; gap:var(--spacing-sm);">${radio({ id: "freq-weekly" })}${label("주간 리포트만", "freq-weekly")}</div>
  </div>
</div>`,
  },
];
