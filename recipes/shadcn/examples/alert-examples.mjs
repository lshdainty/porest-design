/*
 * shadcn Alert 예제 — alert.tsx의 cva variants와 동기 유지.
 */

const ALERT_BASE =
  "relative w-full rounded-sm border px-4 py-3 text-body-sm";

const VARIANT = {
  default: "border-border-default bg-surface-default text-text-primary",
  destructive: "border-error/50 text-error",
};

const ICON_INFO =
  '<svg style="position:absolute; left:16px; top:14px; width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
const ICON_WARN =
  '<svg style="position:absolute; left:16px; top:14px; width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

function alert({ variant = "default", icon = "", title = "", body = "", extra = "" } = {}) {
  const bg = variant === "destructive" ? "background:color-mix(in srgb, var(--color-error) 10%, transparent);" : "";
  return `<div role="alert" class="${ALERT_BASE} ${VARIANT[variant]} ${extra}" style="${bg}">
  ${icon}
  <div style="${icon ? "padding-left:28px;" : ""}">
    ${title ? `<h5 style="margin:0 0 4px; font-weight:600; line-height:1; letter-spacing:-0.01em;">${title}</h5>` : ""}
    ${body ? `<div style="font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height);">${body}</div>` : ""}
  </div>
</div>`;
}

export const alertExamples = [
  {
    title: "Default",
    description: "기본 — surface-default + 중립 톤. 정보 알림.",
    jsx: `<Alert>
  <Info />
  <AlertTitle>업데이트가 있습니다</AlertTitle>
  <AlertDescription>
    새 버전(v1.2.0)이 배포되었습니다. 페이지를 새로고침해 적용하세요.
  </AlertDescription>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      icon: ICON_INFO,
      title: "업데이트가 있습니다",
      body: "새 버전(v1.2.0)이 배포되었습니다. 페이지를 새로고침해 적용하세요.",
    })}</div>`,
  },

  {
    title: "Destructive",
    description: "위험·에러 — error 색상 톤. 사용자에게 주의 환기.",
    jsx: `<Alert variant="destructive">
  <AlertTriangle />
  <AlertTitle>저장에 실패했습니다</AlertTitle>
  <AlertDescription>
    네트워크 연결을 확인하고 다시 시도해주세요.
  </AlertDescription>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      variant: "destructive",
      icon: ICON_WARN,
      title: "저장에 실패했습니다",
      body: "네트워크 연결을 확인하고 다시 시도해주세요.",
    })}</div>`,
  },

  {
    title: "Without icon",
    description: "아이콘 생략 — 텍스트만으로 충분한 경우.",
    jsx: `<Alert>
  <AlertTitle>이용약관이 변경되었습니다</AlertTitle>
  <AlertDescription>
    2026년 6월 1일부터 적용됩니다. 변경 내용을 확인해주세요.
  </AlertDescription>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      title: "이용약관이 변경되었습니다",
      body: "2026년 6월 1일부터 적용됩니다. 변경 내용을 확인해주세요.",
    })}</div>`,
  },

  {
    title: "Description only",
    description: "타이틀 없이 설명만 — 짧은 인라인 메시지.",
    jsx: `<Alert>
  <Info />
  <AlertDescription>
    검색 결과가 없습니다. 다른 키워드로 시도해보세요.
  </AlertDescription>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      icon: ICON_INFO,
      body: "검색 결과가 없습니다. 다른 키워드로 시도해보세요.",
    })}</div>`,
  },
];
