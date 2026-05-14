/*
 * shadcn Input 예제 — input.tsx의 className과 동기 유지.
 */

// input.tsx의 cva 정의와 1:1 동기 (specs/components/input.md SoT)
const BASE =
  "flex h-10 w-full min-w-0 rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-lg text-text-primary placeholder:text-text-tertiary file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/30 disabled:cursor-not-allowed disabled:opacity-50 transition-[color,box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]";

const LABEL = "text-label-md font-medium text-text-primary leading-none";

function input({ type = "text", placeholder = "", value = "", disabled = false, id = "" } = {}) {
  return `<input type="${type}" class="${BASE}"${placeholder ? ` placeholder="${placeholder}"` : ""}${value ? ` value="${value}"` : ""}${disabled ? " disabled" : ""}${id ? ` id="${id}"` : ""} />`;
}

function label(text, htmlFor = "") {
  return `<label class="${LABEL}"${htmlFor ? ` for="${htmlFor}"` : ""}>${text}</label>`;
}

// State matrix — input.tsx :focus-visible / [aria-invalid] / [disabled] / [readonly] 가상
// 셀렉터를 정적 HTML에서 강제 합성. specs/components/input.md State 표 그대로.
function stateInput(state) {
  // preview-html `.fv-input` SoT — padding 토큰 인용. <input> UA가 body font 안 받아서
  // font-family 명시 필수(button과 같음).
  const common = "display:flex; height:40px; width:100%; box-sizing:border-box; padding:var(--spacing-sm) var(--spacing-md); font-family:var(--font-sans); font-size:var(--text-body-lg); font-weight:400; line-height:1.6; color:var(--color-text-primary); border-radius:var(--radius-sm); border:1px solid var(--color-border-default); background:var(--color-surface-input); outline:0;";
  const placeholder = "이메일을 입력하세요";
  const filledValue = "kim@porest.app";
  switch (state) {
    case "default":
      return `<input type="text" style="${common}" placeholder="${placeholder}" />`;
    case "focused":
      return `<input type="text" style="${common} border-color:var(--color-border-focus); box-shadow:0 0 0 2px color-mix(in srgb, var(--color-border-focus) 30%, transparent);" value="${filledValue}" />`;
    case "filled":
      return `<input type="text" style="${common}" value="${filledValue}" />`;
    case "error":
      return `<input type="text" style="${common} border-color:var(--color-error); box-shadow:0 0 0 2px color-mix(in srgb, var(--color-error) 30%, transparent);" value="잘못된이메일" aria-invalid="true" />`;
    case "disabled":
      return `<input type="text" style="${common} opacity:0.5; cursor:not-allowed;" placeholder="${placeholder}" disabled />`;
    case "readonly":
      return `<input type="text" style="${common} border-color:transparent;" value="${filledValue}" readonly />`;
    default:
      return "";
  }
}

export const inputExamples = [
  {
    title: "State matrix",
    description: "디자인 시스템에 정의된 6 state — default / focused / filled / error / disabled / readonly. 정적 preview라 :focus-visible / [aria-invalid] 등 가상 셀렉터를 강제 합성.",
    jsx: `// input.tsx의 className이 자동으로 :focus-visible / [aria-invalid] / [disabled] / [readonly] 처리.
// 별도 prop 없이 표준 HTML 속성만으로 시각 전이.

<Input placeholder="이메일을 입력하세요" />              // default
<Input value="kim@porest.app" autoFocus />               // focused (visible)
<Input value="kim@porest.app" />                          // filled
<Input value="잘못된이메일" aria-invalid="true" />        // error
<Input placeholder="이메일을 입력하세요" disabled />      // disabled
<Input value="kim@porest.app" readOnly />                 // readonly`,
    render: () => {
      const states = [
        { key: "default", label: "DEFAULT", desc: "border-default + surface-input 채움" },
        { key: "focused", label: "FOCUSED", desc: "border-focus + ring 30% (다크 시 light)" },
        { key: "filled", label: "FILLED", desc: "default와 동일 — 입력값 자체로 구별" },
        { key: "error", label: "ERROR", desc: "border-error + ring-error/30, aria-invalid=true" },
        { key: "disabled", label: "DISABLED", desc: "opacity 0.5 + cursor not-allowed" },
        { key: "readonly", label: "READONLY", desc: "외곽선 제거, focus·copy만" },
      ];
      const rows = states
        .map(
          (s) => `<tr>
  <td style="padding:var(--spacing-md) var(--spacing-lg) var(--spacing-md) 0; vertical-align:top; width:100px; font-size:var(--text-label-sm); font-weight:500; color:var(--color-text-secondary); letter-spacing:0.06em; white-space:nowrap;">${s.label}</td>
  <td style="padding:var(--spacing-sm) 0; vertical-align:top; min-width:280px;">${stateInput(s.key)}</td>
  <td style="padding:var(--spacing-md) 0 var(--spacing-md) var(--spacing-lg); vertical-align:top; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">${s.desc}</td>
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
    title: "Default",
    description: "h-10 / body-lg (16/400) / surface-input 채움. focus 시 border-focus + ring-2.",
    jsx: `<Input placeholder="이름을 입력하세요" />`,
    render: () => `<div style="max-width:320px;">${input({ placeholder: "이름을 입력하세요" })}</div>`,
  },

  {
    title: "With label",
    description: "Label + Input. htmlFor 연결로 라벨 클릭 시 input focus.",
    jsx: `<div className="space-y-2">
  <Label htmlFor="email">이메일</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
    render: () => `<div style="max-width:320px; display:flex; flex-direction:column; gap:var(--spacing-sm);">
  ${label("이메일", "email")}
  ${input({ type: "email", placeholder: "you@example.com", id: "email" })}
</div>`,
  },

  {
    title: "With value",
    description: "초기 값이 있는 input.",
    jsx: `<Input defaultValue="김지원" />`,
    render: () => `<div style="max-width:320px;">${input({ value: "김지원" })}</div>`,
  },

  {
    title: "Disabled",
    description: "opacity-50 + cursor-not-allowed.",
    jsx: `<Input disabled placeholder="입력 불가" />`,
    render: () => `<div style="max-width:320px;">${input({ placeholder: "입력 불가", disabled: true })}</div>`,
  },

  {
    title: "Type variants",
    description: "type prop만 다름 — email / number / password / search 등.",
    jsx: `<div className="space-y-3">
  <Input type="email" placeholder="이메일" />
  <Input type="password" placeholder="비밀번호" />
  <Input type="number" placeholder="숫자" />
  <Input type="search" placeholder="검색어" />
</div>`,
    render: () => `<div style="max-width:320px; display:flex; flex-direction:column; gap:var(--spacing-md);">
  ${input({ type: "email", placeholder: "이메일" })}
  ${input({ type: "password", placeholder: "비밀번호" })}
  ${input({ type: "number", placeholder: "숫자" })}
  ${input({ type: "search", placeholder: "검색어" })}
</div>`,
  },

  {
    title: "Form field with helper",
    description: "label + input + helper text 조합 — 폼 그룹 표준 패턴.",
    jsx: `<div className="space-y-2">
  <Label htmlFor="username">사용자 이름</Label>
  <Input id="username" placeholder="영문/숫자 4-12자" />
  <p className="text-label-sm text-text-tertiary">
    프로필 URL에 사용됩니다.
  </p>
</div>`,
    render: () => `<div style="max-width:320px; display:flex; flex-direction:column; gap:var(--spacing-sm);">
  ${label("사용자 이름", "username")}
  ${input({ placeholder: "영문/숫자 4-12자", id: "username" })}
  <p style="margin:0; font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-text-tertiary);">프로필 URL에 사용됩니다.</p>
</div>`,
  },

  {
    title: "Validation states (5-state machine)",
    description: "idle → focused → invalid / valid / validating. aria-invalid + 색상으로 상태 전이 표현. react-hook-form / zod와 결합.",
    jsx: `import { useState } from "react"
import { Loader2, Check } from "lucide-react"

function EmailField() {
  const [state, setState] = useState<"idle" | "focused" | "invalid" | "valid" | "validating">("idle")
  const [value, setValue] = useState("")

  return (
    <div className="space-y-2">
      <Label htmlFor="email">이메일</Label>
      <Input
        id="email"
        type="email"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setState("focused")}
        onBlur={() => validate(value).then(setState)}
        aria-invalid={state === "invalid"}
        placeholder="이메일"
        className={cn(
          state === "invalid" && "border-error ring-2 ring-error/30 focus-visible:border-error",
          state === "valid" && "border-success ring-2 ring-success/30 focus-visible:border-success",
        )}
      />
      <p className={cn(
        "text-label-sm",
        state === "idle" && "text-text-tertiary",
        state === "focused" && "text-text-secondary",
        state === "invalid" && "text-error",
        state === "valid" && "text-success",
        state === "validating" && "text-text-secondary",
      )}>
        {state === "idle" && "로그인 시 사용됩니다"}
        {state === "focused" && "입력 중..."}
        {state === "invalid" && "올바른 이메일 주소를 입력해주세요"}
        {state === "valid" && <><Check className="inline size-3" /> 사용 가능</>}
        {state === "validating" && <><Loader2 className="inline size-3 animate-spin" /> 중복 확인 중...</>}
      </p>
    </div>
  )
}`,
    render: () => {
      const baseInput =
        "flex h-10 w-full rounded-sm border bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-lg text-text-primary placeholder:text-text-tertiary focus-visible:outline-none transition-[color,border-color,box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]";
      const states = [
        {
          label: "idle (default)",
          inputCls: "border-border-default",
          inputAttr: 'placeholder="이메일"',
          helper: "로그인 시 사용됩니다",
          helperColor: "var(--color-text-tertiary)",
        },
        {
          label: "focused",
          inputCls: "border-ring",
          inputStyle: "box-shadow:0 0 0 2px color-mix(in srgb, var(--color-ring) 30%, transparent);",
          inputAttr: 'value="hello@porest"',
          helper: "입력 중...",
          helperColor: "var(--color-text-secondary)",
        },
        {
          label: "invalid",
          inputCls: "border-error",
          inputStyle: "box-shadow:0 0 0 2px color-mix(in srgb, var(--color-error) 30%, transparent);",
          inputAttr: 'value="hello@porest" aria-invalid="true"',
          helper: "올바른 이메일 주소를 입력해주세요",
          helperColor: "var(--color-error)",
        },
        {
          label: "valid",
          inputCls: "border-success",
          inputStyle: "box-shadow:0 0 0 2px color-mix(in srgb, var(--color-success) 30%, transparent);",
          inputAttr: 'value="hello@porest.app"',
          helper: '<svg style="display:inline; width:12px; height:12px; vertical-align:-2px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> 사용 가능',
          helperColor: "var(--color-success)",
        },
        {
          label: "validating (async)",
          inputCls: "border-primary",
          inputAttr: 'value="hello@porest.app" disabled',
          // 디자인 시스템 spinner (specs/components/spinner.md) — sm 16/2, border-top primary, 270deg arc.
          // helper 텍스트가 caption(12px)이라 12px로 살짝 줄여 시각 균형 — spec의 sm(16) 시각 톤은 유지.
          helper: '<span aria-hidden style="display:inline-block; width:12px; height:12px; border:2px solid var(--color-surface-input); border-top-color:var(--color-primary); border-radius:var(--radius-full); animation:sp-spin var(--motion-duration-loop) var(--motion-ease-linear) infinite; vertical-align:-2px; margin-right:var(--spacing-xs);"></span>중복 확인 중...',
          helperColor: "var(--color-text-secondary)",
        },
      ];
      const cells = states
        .map(
          (s) => `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm); min-width:0;">
  <div style="font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); font-weight:500; color:var(--color-text-secondary);">${s.label}</div>
  <input class="${baseInput} ${s.inputCls}" ${s.inputAttr || ""} style="${s.inputStyle || ""}" />
  <p style="margin:0; font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:${s.helperColor};">${s.helper}</p>
</div>`,
        )
        .join("");
      return `<style>@keyframes sp-spin { to { transform: rotate(360deg); } }</style>
<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:var(--spacing-lg);">${cells}</div>`;
    },
  },
];
