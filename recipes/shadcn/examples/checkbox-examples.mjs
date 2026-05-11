/*
 * shadcn Checkbox 예제 — checkbox.tsx의 cva 정의와 1:1 동기.
 * spec: specs/components/checkbox.md (단일 SoT)
 *
 * Radix CheckboxPrimitive를 정적 HTML로 흉내 — `data-state="checked|unchecked|indeterminate"`로
 * 시각 상태만 표현. 실제 토글 동작은 React에서.
 */

// checkbox.tsx의 cva BASE className과 1:1 동기
const CB =
  "peer shrink-0 rounded-sm border border-border-strong bg-surface-default hover:bg-surface-input data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-text-on-accent data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-text-on-accent aria-invalid:border-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-input transition-colors inline-flex items-center justify-center";

const SIZE = {
  sm: "size-4",
  md: "size-[18px]",
  lg: "size-5",
};

const ICON_SIZE = {
  sm: 10,
  md: 12,
  lg: 14,
};

function checkIcon(px = 12) {
  return `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
}

function dashIcon(px = 12) {
  return `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
}

const LABEL = "text-label-md font-medium text-text-primary leading-none cursor-pointer";

function checkbox({ state = "unchecked", size = "md", disabled = false, id = "" } = {}) {
  const indicator =
    state === "checked"
      ? checkIcon(ICON_SIZE[size])
      : state === "indeterminate"
        ? dashIcon(ICON_SIZE[size])
        : "";
  return `<button type="button" role="checkbox" aria-checked="${state === "indeterminate" ? "mixed" : state === "checked"}" data-state="${state}"${disabled ? " disabled" : ""}${id ? ` id="${id}"` : ""} class="${CB} ${SIZE[size]}">${indicator}</button>`;
}

function label(text, htmlFor = "") {
  return `<label class="${LABEL}"${htmlFor ? ` for="${htmlFor}"` : ""}>${text}</label>`;
}

// State matrix — checkbox.tsx data-state / :hover / :focus-visible / [aria-invalid] / [disabled] 가상 셀렉터를
// 정적 HTML에서 강제 합성. specs/components/checkbox.md State 표 그대로.
function stateCheckbox(state) {
  const common =
    "display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; width:18px; height:18px; border-radius:var(--radius-sm); border:1px solid var(--color-border-strong); background:var(--color-surface-default); color:var(--color-text-on-accent); outline:0; font-family:inherit; padding:0;";
  switch (state) {
    case "default":
      return `<button type="button" role="checkbox" aria-checked="false" style="${common}"></button>`;
    case "hovered":
      return `<button type="button" role="checkbox" aria-checked="false" style="${common} background:var(--color-surface-input);"></button>`;
    case "checked":
      return `<button type="button" role="checkbox" aria-checked="true" style="${common} background:var(--color-primary); border-color:var(--color-primary);">${checkIcon(12)}</button>`;
    case "indeterminate":
      return `<button type="button" role="checkbox" aria-checked="mixed" style="${common} background:var(--color-primary); border-color:var(--color-primary);">${dashIcon(12)}</button>`;
    case "focused":
      return `<button type="button" role="checkbox" aria-checked="false" style="${common} box-shadow:0 0 0 2px var(--color-bg-page), 0 0 0 4px var(--color-border-focus);"></button>`;
    case "disabled":
      return `<button type="button" role="checkbox" aria-checked="false" style="${common} background:var(--color-surface-input); border-color:var(--color-border-default); opacity:0.5; cursor:not-allowed;" disabled></button>`;
    case "error":
      return `<button type="button" role="checkbox" aria-checked="false" aria-invalid="true" style="${common} border-color:var(--color-error); box-shadow:0 0 0 2px color-mix(in srgb, var(--color-error) 30%, transparent);"></button>`;
    default:
      return "";
  }
}

export const checkboxExamples = [
  {
    title: "State matrix",
    description:
      "디자인 시스템 7 state — default / hovered / checked / indeterminate / focused / disabled / error. 정적 preview라 :hover / :focus-visible / [aria-invalid] / [disabled] 등 가상 셀렉터를 강제 합성.",
    jsx: `// checkbox.tsx cva가 자동 처리. 별도 prop 없이 data-state / checked / disabled로 시각 전이.

<Checkbox />                                          // default
<Checkbox className="bg-surface-input" />              // hovered (시각만)
<Checkbox defaultChecked />                            // checked
<Checkbox checked="indeterminate" />                   // indeterminate
<Checkbox autoFocus />                                 // focused (visible)
<Checkbox disabled />                                  // disabled
<Checkbox aria-invalid="true" />                       // error`,
    render: () => {
      const states = [
        { key: "default", label: "DEFAULT", desc: "surface-default + border-strong" },
        { key: "hovered", label: "HOVERED", desc: "bg-surface-input (Toss 톤 미세 affordance)" },
        { key: "checked", label: "CHECKED", desc: "bg-primary + 흰 체크" },
        { key: "indeterminate", label: "INDETERMINATE", desc: "bg-primary + 흰 dash (부모-자식 그룹 일부 선택)" },
        { key: "focused", label: "FOCUSED", desc: "2px border-focus + 2px offset (다크는 light)" },
        { key: "disabled", label: "DISABLED", desc: "opacity 0.5 + cursor not-allowed" },
        { key: "error", label: "ERROR", desc: "border-error + ring-error/30, aria-invalid=true" },
      ];
      const rows = states
        .map(
          (s) => `<tr>
  <td style="padding:12px 16px 12px 0; vertical-align:middle; width:140px; font-size:var(--text-label-sm); font-weight:500; color:var(--color-text-secondary); letter-spacing:0.06em; white-space:nowrap;">${s.label}</td>
  <td style="padding:8px 0; vertical-align:middle; width:60px;">${stateCheckbox(s.key)}</td>
  <td style="padding:12px 0 12px 16px; vertical-align:middle; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">${s.desc}</td>
</tr>`,
        )
        .join("");
      return `<div style="overflow-x:auto;">
  <table style="border-collapse:collapse; width:100%; max-width:720px;">
    <tbody style="border-top:1px solid var(--color-border-default);">${rows}</tbody>
  </table>
</div>`;
    },
  },

  {
    title: "Sizes",
    description: "sm 16 (dense list/toolbar) · md 18 (default) · lg 20 (single-question, 모바일). 모든 사이즈 radius-sm (4px) · stroke-width 3 통일.",
    jsx: `<div className="flex items-center gap-6">
  <Checkbox size="sm" defaultChecked />
  <Checkbox size="md" defaultChecked />
  <Checkbox size="lg" defaultChecked />
</div>`,
    render: () => `<div style="display:flex; align-items:center; gap:32px;">
  <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
    ${checkbox({ state: "checked", size: "sm" })}
    <span style="font-size:var(--text-caption); color:var(--color-text-tertiary); font-family:ui-monospace, monospace;">sm · 16</span>
  </div>
  <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
    ${checkbox({ state: "checked", size: "md" })}
    <span style="font-size:var(--text-caption); color:var(--color-text-tertiary); font-family:ui-monospace, monospace;">md · 18</span>
  </div>
  <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
    ${checkbox({ state: "checked", size: "lg" })}
    <span style="font-size:var(--text-caption); color:var(--color-text-tertiary); font-family:ui-monospace, monospace;">lg · 20</span>
  </div>
</div>`,
  },

  {
    title: "Default (unchecked)",
    description: "surface-default 배경 + border-strong 외곽선.",
    jsx: `<Checkbox />`,
    render: () => checkbox(),
  },

  {
    title: "Checked",
    description: "primary 채움 + 흰 체크 아이콘. stroke-width 3.",
    jsx: `<Checkbox defaultChecked />`,
    render: () => checkbox({ state: "checked" }),
  },

  {
    title: "Indeterminate",
    description: "부모-자식 그룹에서 자식 일부만 checked일 때. 흰 dash 표시. aria-checked=\"mixed\".",
    jsx: `<Checkbox checked="indeterminate" />`,
    render: () => checkbox({ state: "indeterminate" }),
  },

  {
    title: "With label",
    description: "Checkbox + Label 조합 — 라벨 클릭 시 toggle (htmlFor 필수). row hit area 44+ 확보를 위해 gap-2 + label py 권장.",
    jsx: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">서비스 이용약관에 동의합니다</Label>
</div>`,
    render: () => `<div style="display:flex; align-items:center; gap:8px;">
  ${checkbox({ id: "terms" })}
  ${label("서비스 이용약관에 동의합니다", "terms")}
</div>`,
  },

  {
    title: "Disabled",
    description: "opacity-50 + cursor-not-allowed. unchecked/checked 둘 다.",
    jsx: `<div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <Checkbox disabled />
    <Label className="opacity-50">선택 불가</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox disabled defaultChecked />
    <Label className="opacity-50">변경 불가</Label>
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:8px;">
  <div style="display:flex; align-items:center; gap:8px;">
    ${checkbox({ disabled: true })}
    <span style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary); opacity:0.5;">선택 불가</span>
  </div>
  <div style="display:flex; align-items:center; gap:8px;">
    ${checkbox({ state: "checked", disabled: true })}
    <span style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary); opacity:0.5;">변경 불가</span>
  </div>
</div>`,
  },

  {
    title: "Parent / nested (indeterminate 패턴)",
    description: "부모 checkbox가 indeterminate — 자식 일부만 checked. 자식 들여쓰기 pl-6 (24px).",
    jsx: `<div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <Checkbox checked="indeterminate" id="all" />
    <Label htmlFor="all">전체 선택</Label>
  </div>
  <div className="flex flex-col gap-2 pl-6">
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked id="opt-1" />
      <Label htmlFor="opt-1">필수 약관</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="opt-2" />
      <Label htmlFor="opt-2">마케팅 수신 (선택)</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked id="opt-3" />
      <Label htmlFor="opt-3">개인정보 수집 동의</Label>
    </div>
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:8px;">
  <div style="display:flex; align-items:center; gap:8px;">
    ${checkbox({ state: "indeterminate", id: "all" })}
    ${label("전체 선택", "all")}
  </div>
  <div style="display:flex; flex-direction:column; gap:8px; padding-left:24px;">
    <div style="display:flex; align-items:center; gap:8px;">${checkbox({ state: "checked", id: "opt-1" })}${label("필수 약관", "opt-1")}</div>
    <div style="display:flex; align-items:center; gap:8px;">${checkbox({ id: "opt-2" })}${label("마케팅 수신 (선택)", "opt-2")}</div>
    <div style="display:flex; align-items:center; gap:8px;">${checkbox({ state: "checked", id: "opt-3" })}${label("개인정보 수집 동의", "opt-3")}</div>
  </div>
</div>`,
  },

  {
    title: "Checkbox list (HR 시나리오)",
    description: "여러 항목 선택 — list group 형태. 부서 필터 같은 다중 선택. row gap-3, hit area 강화.",
    jsx: `<div className="flex flex-col gap-3">
  <div className="text-label-md font-medium">필터링할 부서</div>
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <Checkbox id="dept-eng" defaultChecked />
      <Label htmlFor="dept-eng">엔지니어링</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="dept-design" defaultChecked />
      <Label htmlFor="dept-design">디자인</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="dept-pm" />
      <Label htmlFor="dept-pm">PM</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="dept-hr" />
      <Label htmlFor="dept-hr">HR / 운영</Label>
    </div>
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:12px;">
  <div style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary);">필터링할 부서</div>
  <div style="display:flex; flex-direction:column; gap:8px;">
    <div style="display:flex; align-items:center; gap:8px;">${checkbox({ state: "checked", id: "dept-eng" })}${label("엔지니어링", "dept-eng")}</div>
    <div style="display:flex; align-items:center; gap:8px;">${checkbox({ state: "checked", id: "dept-design" })}${label("디자인", "dept-design")}</div>
    <div style="display:flex; align-items:center; gap:8px;">${checkbox({ id: "dept-pm" })}${label("PM", "dept-pm")}</div>
    <div style="display:flex; align-items:center; gap:8px;">${checkbox({ id: "dept-hr" })}${label("HR / 운영", "dept-hr")}</div>
  </div>
</div>`,
  },
];
