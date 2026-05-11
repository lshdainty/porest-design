/*
 * shadcn Sonner 예제 — site preview SoT 그대로 + sonner.md spec 1:1 동기.
 * Container: surface-default + border 1px + radius-md + spacing-md/lg padding +
 *            shadow-lg + max-width 360 + gap-md.
 * Action button: button.md Size `sm` spec 그대로(`h-8` · `text-caption` ·
 *                `radius-sm` · `font-sans` · `bg-primary` · `shadow-sm` ·
 *                `hover:brightness-105` · `transition-[box-shadow]`).
 */

const TOAST =
  "background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); padding:var(--spacing-md) var(--spacing-lg); box-shadow:var(--shadow-lg); display:flex; align-items:flex-start; gap:var(--spacing-md); max-width:360px;";

const TITLE =
  "font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:600; color:var(--color-text-primary);";

const DESC =
  "font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);";

const CONTENT =
  "display:flex; flex-direction:column; gap:var(--spacing-xs); min-width:0; flex:1;";

// button.md Size `sm` BASE — primary 채움
const BTN_PRIMARY_SM =
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] bg-primary text-text-on-accent shadow-sm hover:brightness-105 h-8 px-[var(--spacing-sm)] text-caption";

const ICONS = {
  success:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  error:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  warning:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  info:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-info)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
};

function toast({ kind = "success", title = "", description = "" } = {}) {
  return `<div style="${TOAST}">
  ${ICONS[kind] || ""}
  <div style="${CONTENT}">
    <div style="${TITLE}">${title}</div>
    ${description ? `<div style="${DESC}">${description}</div>` : ""}
  </div>
</div>`;
}

export const sonnerExamples = [
  {
    title: "Setup",
    description: "app root에 <Toaster />를 한 번만 렌더링. 어디서든 toast() 호출 가능.",
    jsx: `// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// 어디서든 호출
import { toast } from "sonner"
toast.success("저장되었습니다")
toast.error("저장 실패")
toast.info("새 알림")
toast.warning("저장 공간이 부족합니다")`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-md);">
  ${toast({ kind: "success", title: "저장되었습니다" })}
  ${toast({ kind: "error", title: "저장 실패", description: "네트워크 연결을 확인하세요." })}
  ${toast({ kind: "info", title: "새 알림", description: "동료가 회고를 공유했어요." })}
  ${toast({ kind: "warning", title: "저장 공간이 부족합니다", description: "1.2 GB 남음 (총 5 GB)." })}
</div>`,
  },

  {
    title: "With action",
    description: "토스트 안 액션 버튼 — 실수로 한 작업 즉시 되돌리기. button SM spec 그대로.",
    jsx: `toast("이메일이 보관함으로 이동되었습니다", {
  action: {
    label: "되돌리기",
    onClick: () => undoMove(),
  },
})`,
    render: () => `<div style="${TOAST}">
  <div style="${CONTENT}">
    <div style="${TITLE}">이메일이 보관함으로 이동되었습니다</div>
  </div>
  <button class="${BTN_PRIMARY_SM}" style="flex-shrink:0;">되돌리기</button>
</div>`,
  },
];
