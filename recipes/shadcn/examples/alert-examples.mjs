/*
 * shadcn Alert 예제 — alert.md SoT 정합.
 *
 * 5 variants (Sonner 5 kinds와 정합):
 * - default: border 1px + surface-default (단순 카드)
 * - info / success / warning / error: border-l 4px + color-mix 8% bg
 *
 * Layout: flex + icon + body(title + description), padding-md, gap-md.
 */

const ALERT_BASE =
  "position:relative; width:100%; display:flex; align-items:flex-start; gap:var(--spacing-md); padding:var(--spacing-md); border-radius:var(--radius-sm); font-family:var(--font-sans);";

const VARIANT_STYLE = {
  default:
    "border:1px solid var(--color-border-default); background:var(--color-surface-default); color:var(--color-text-primary);",
  info:
    "border-left:4px solid var(--color-info); background:color-mix(in srgb, var(--color-info) 8%, var(--color-surface-default)); color:var(--color-text-primary);",
  success:
    "border-left:4px solid var(--color-success); background:color-mix(in srgb, var(--color-success) 8%, var(--color-surface-default)); color:var(--color-text-primary);",
  warning:
    "border-left:4px solid var(--color-warning); background:color-mix(in srgb, var(--color-warning) 8%, var(--color-surface-default)); color:var(--color-text-primary);",
  error:
    "border-left:4px solid var(--color-error); background:color-mix(in srgb, var(--color-error) 8%, var(--color-surface-default)); color:var(--color-text-primary);",
};

const ICON_COLOR = {
  info: "var(--color-info)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
};

const ICONS = {
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
};

const BODY =
  "display:flex; flex-direction:column; gap:var(--spacing-xs); flex:1; min-width:0;";

const TITLE =
  "margin:0; font-size:var(--text-body-md); font-weight:600; line-height:1; letter-spacing:-0.01em; color:var(--color-text-primary);";

const DESC =
  "margin:0; font-size:var(--text-body-sm); line-height:1.5; color:var(--color-text-secondary);";

function alert({ variant = "default", title = "", body = "" } = {}) {
  const iconColor = ICON_COLOR[variant];
  const iconPath = ICONS[variant];
  const icon = iconPath
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:2px;">${iconPath}</svg>`
    : "";
  const role = variant === "error" || variant === "warning" ? "alert" : "status";
  return `<div role="${role}" style="${ALERT_BASE} ${VARIANT_STYLE[variant]}">
  ${icon}
  <div style="${BODY}">
    ${title ? `<h5 style="${TITLE}">${title}</h5>` : ""}
    ${body ? `<div style="${DESC}">${body}</div>` : ""}
  </div>
</div>`;
}

export const alertExamples = [
  {
    title: "Default",
    description: "중립 톤 — semantic 의미 없는 일반 메시지. border 1px + surface-default 단순 카드.",
    jsx: `<Alert>
  <AlertBody>
    <AlertTitle>이용약관이 변경되었습니다</AlertTitle>
    <AlertDescription>
      2026년 6월 1일부터 적용됩니다. 변경 내용을 확인해주세요.
    </AlertDescription>
  </AlertBody>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      title: "이용약관이 변경되었습니다",
      body: "2026년 6월 1일부터 적용됩니다. 변경 내용을 확인해주세요.",
    })}</div>`,
  },

  {
    title: "Info (정보성)",
    description: "정보 안내 — 새 기능 / 정책 변경 예고 / 시스템 점검 등.",
    jsx: `<Alert variant="info">
  <Info />
  <AlertBody>
    <AlertTitle>업데이트가 있습니다</AlertTitle>
    <AlertDescription>
      새 버전(v1.2.0)이 배포되었습니다. 페이지를 새로고침해 적용하세요.
    </AlertDescription>
  </AlertBody>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      variant: "info",
      title: "업데이트가 있습니다",
      body: "새 버전(v1.2.0)이 배포되었습니다. 페이지를 새로고침해 적용하세요.",
    })}</div>`,
  },

  {
    title: "Success (완료)",
    description: "성공 / 완료 — 결제 완료, 작업 성공 후 페이지 안내.",
    jsx: `<Alert variant="success">
  <CheckCircle />
  <AlertBody>
    <AlertTitle>결제가 완료되었습니다</AlertTitle>
    <AlertDescription>
      결제 내역은 이메일로 전송됩니다. 영수증은 마이페이지에서 확인하세요.
    </AlertDescription>
  </AlertBody>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      variant: "success",
      title: "결제가 완료되었습니다",
      body: "결제 내역은 이메일로 전송됩니다. 영수증은 마이페이지에서 확인하세요.",
    })}</div>`,
  },

  {
    title: "Warning (주의)",
    description: "주의 / 임박 — 약관 변경 예정, 저장 공간 부족, 기한 임박.",
    jsx: `<Alert variant="warning">
  <AlertTriangle />
  <AlertBody>
    <AlertTitle>약관 변경 예정</AlertTitle>
    <AlertDescription>
      4월 30일까지 미동의 시 일부 기능이 제한될 수 있습니다.
    </AlertDescription>
  </AlertBody>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      variant: "warning",
      title: "약관 변경 예정",
      body: "4월 30일까지 미동의 시 일부 기능이 제한될 수 있습니다.",
    })}</div>`,
  },

  {
    title: "Error (실패)",
    description: "실패 / 오류 — 결제 실패, 저장 실패. shadcn `destructive` alias로도 사용 가능.",
    jsx: `<Alert variant="error">
  <XCircle />
  <AlertBody>
    <AlertTitle>결제에 실패했습니다</AlertTitle>
    <AlertDescription>
      등록된 카드가 만료되었습니다. 카드 정보를 갱신해주세요.
    </AlertDescription>
  </AlertBody>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      variant: "error",
      title: "결제에 실패했습니다",
      body: "등록된 카드가 만료되었습니다. 카드 정보를 갱신해주세요.",
    })}</div>`,
  },

  {
    title: "Description only",
    description: "타이틀 없이 설명만 — 짧은 인라인 메시지(검색 결과 없음 등).",
    jsx: `<Alert variant="info">
  <Info />
  <AlertBody>
    <AlertDescription>
      검색 결과가 없습니다. 다른 키워드로 시도해보세요.
    </AlertDescription>
  </AlertBody>
</Alert>`,
    render: () => `<div style="max-width:640px;">${alert({
      variant: "info",
      body: "검색 결과가 없습니다. 다른 키워드로 시도해보세요.",
    })}</div>`,
  },
];
