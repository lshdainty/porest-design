/*
 * shadcn Label 예제 — label.tsx의 typography(label-md)와 동기 유지.
 * INPUT 상수는 input.tsx BASE와 1:1 동기 (specs/components/input.md SoT 따라감).
 */

const LABEL = "text-label-md font-medium text-text-primary leading-none";
// input.tsx의 cva BASE className과 1:1 동기 — 디자인 토큰 직접 인용.
const INPUT =
  "flex h-10 w-full rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-lg text-text-primary placeholder:text-text-tertiary focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 transition-[color,box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]";

function label(text, htmlFor = "") {
  return `<label class="${LABEL}"${htmlFor ? ` for="${htmlFor}"` : ""}>${text}</label>`;
}

export const labelExamples = [
  {
    title: "Default",
    description: "label-md 14px/500/1.4 typography. peer-disabled로 짝지어진 input의 상태를 따라감.",
    jsx: `<Label htmlFor="name">이름</Label>`,
    render: () => `${label("이름", "name")}`,
  },

  {
    title: "With Input",
    description: "form group 표준 — Label htmlFor + Input id 매칭.",
    jsx: `<div className="space-y-2">
  <Label htmlFor="name">이름</Label>
  <Input id="name" placeholder="홍길동" />
</div>`,
    render: () => `<div style="max-width:320px; display:flex; flex-direction:column; gap:var(--spacing-sm);">
  ${label("이름", "name")}
  <input class="${INPUT}" id="name" placeholder="홍길동" />
</div>`,
  },

  {
    title: "Required indicator",
    description: "필수 필드 — 빨간 별표(error 색상) 추가.",
    jsx: `<Label htmlFor="email">
  이메일
  <span className="text-error ml-1">*</span>
</Label>`,
    render: () => `<label class="${LABEL}" for="email">이메일<span style="color:var(--color-error); margin-left:var(--spacing-xs);">*</span></label>`,
  },

  {
    title: "With description",
    description: "Label + 보조 설명 (caption typography).",
    jsx: `<div className="space-y-1">
  <Label htmlFor="api-key">API 키</Label>
  <p className="text-caption text-text-tertiary">
    설정 페이지에서 발급받은 키를 입력하세요.
  </p>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-xs);">
  ${label("API 키", "api-key")}
  <p style="margin:0; font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-tertiary);">설정 페이지에서 발급받은 키를 입력하세요.</p>
</div>`,
  },
];
