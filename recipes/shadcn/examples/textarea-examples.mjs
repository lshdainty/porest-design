/*
 * shadcn Textarea 예제 — textarea.tsx의 className과 동기 유지.
 */

// textarea.tsx와 1:1 동기 — input spec과 통일된 톤(surface-input 채움 + 토큰 직접 인용).
const BASE =
  "flex min-h-20 w-full rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary placeholder:text-text-tertiary focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/30 disabled:cursor-not-allowed disabled:opacity-50 transition-[color,box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] resize-none";

const LABEL = "text-label-md font-medium text-text-primary leading-none";

function textarea({ placeholder = "", value = "", disabled = false, rows = 4, id = "" } = {}) {
  return `<textarea class="${BASE}" rows="${rows}"${placeholder ? ` placeholder="${placeholder}"` : ""}${disabled ? " disabled" : ""}${id ? ` id="${id}"` : ""}>${value}</textarea>`;
}

function label(text, htmlFor = "") {
  return `<label class="${LABEL}"${htmlFor ? ` for="${htmlFor}"` : ""}>${text}</label>`;
}

export const textareaExamples = [
  {
    title: "Default",
    description: "min-height 80px / body-md typography (한국어 본문 lh 1.6).",
    jsx: `<Textarea placeholder="내용을 입력하세요" />`,
    render: () => `<div style="max-width:480px;">${textarea({ placeholder: "내용을 입력하세요" })}</div>`,
  },

  {
    title: "With label",
    description: "form group 패턴 — 라벨 + 텍스트 입력.",
    jsx: `<div className="space-y-2">
  <Label htmlFor="memo">메모</Label>
  <Textarea id="memo" placeholder="회의 요약을 작성하세요" rows={5} />
</div>`,
    render: () => `<div style="max-width:480px; display:flex; flex-direction:column; gap:var(--spacing-sm);">
  ${label("메모", "memo")}
  ${textarea({ placeholder: "회의 요약을 작성하세요", rows: 5, id: "memo" })}
</div>`,
  },

  {
    title: "With value",
    description: "초기 내용이 있는 textarea — 한국어 본문 lh 1.6 가독성.",
    jsx: `<Textarea defaultValue="5월 12일 오후 3시\\n주간 회고 회의록\\n참석자: 김지원, 이도현, 최가람" rows={5} />`,
    render: () => `<div style="max-width:480px;">${textarea({ value: "5월 12일 오후 3시\n주간 회고 회의록\n참석자: 김지원, 이도현, 최가람", rows: 5 })}</div>`,
  },

  {
    title: "Disabled",
    description: "opacity-50 + cursor-not-allowed.",
    jsx: `<Textarea disabled placeholder="입력 불가" />`,
    render: () => `<div style="max-width:480px;">${textarea({ placeholder: "입력 불가", disabled: true })}</div>`,
  },

  {
    title: "Form field with character count",
    description: "라벨 + textarea + 문자 수 헬퍼 텍스트. 우측 정렬.",
    jsx: `<div className="space-y-2">
  <div className="flex justify-between">
    <Label htmlFor="bio">소개</Label>
    <span className="text-label-sm text-text-tertiary">42 / 200</span>
  </div>
  <Textarea
    id="bio"
    placeholder="자기 소개를 작성해주세요"
    rows={4}
    defaultValue="일상의 작은 변화를 기록합니다."
  />
</div>`,
    render: () => `<div style="max-width:480px; display:flex; flex-direction:column; gap:var(--spacing-sm);">
  <div style="display:flex; justify-content:space-between;">
    ${label("소개", "bio")}
    <span style="font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); color:var(--color-text-tertiary);">42 / 200</span>
  </div>
  ${textarea({ placeholder: "자기 소개를 작성해주세요", rows: 4, value: "일상의 작은 변화를 기록합니다.", id: "bio" })}
</div>`,
  },
];
