/*
 * shadcn Separator 예제 — separator.tsx의 className과 동기 유지.
 */

const HORIZONTAL = "shrink-0 bg-border-default h-px w-full";
const VERTICAL = "shrink-0 bg-border-default h-full w-px";

export const separatorExamples = [
  {
    title: "Horizontal",
    description: "1px 가로선 — border-default 색상.",
    jsx: `<div className="space-y-4">
  <p>위 콘텐츠</p>
  <Separator />
  <p>아래 콘텐츠</p>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:16px; max-width:480px;">
  <p style="margin:0;">위 콘텐츠</p>
  <div class="${HORIZONTAL}"></div>
  <p style="margin:0;">아래 콘텐츠</p>
</div>`,
  },

  {
    title: "Vertical",
    description: "세로선 — 인라인 항목 사이 구분.",
    jsx: `<div className="flex h-5 items-center gap-3 text-label-sm">
  <span>홈</span>
  <Separator orientation="vertical" />
  <span>제품</span>
  <Separator orientation="vertical" />
  <span>지원</span>
</div>`,
    render: () => `<div style="display:flex; height:20px; align-items:center; gap:12px; font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height);">
  <span>홈</span>
  <div class="${VERTICAL}"></div>
  <span>제품</span>
  <div class="${VERTICAL}"></div>
  <span>지원</span>
</div>`,
  },

  {
    title: "Section divider",
    description: "섹션 사이 분리 — 큰 컴포넌트 안에서 그룹 구분.",
    jsx: `<div className="space-y-1 max-w-md">
  <h4 className="text-title-sm">계정 설정</h4>
  <p className="text-body-sm text-text-secondary">개인 정보 및 비밀번호 변경.</p>
  <Separator className="my-4" />
  <h4 className="text-title-sm">알림 설정</h4>
  <p className="text-body-sm text-text-secondary">이메일 및 푸시 알림 관리.</p>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; max-width:448px;">
  <h4 style="margin:0; font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">계정 설정</h4>
  <p style="margin:4px 0 0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">개인 정보 및 비밀번호 변경.</p>
  <div class="${HORIZONTAL}" style="margin:16px 0;"></div>
  <h4 style="margin:0; font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">알림 설정</h4>
  <p style="margin:4px 0 0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">이메일 및 푸시 알림 관리.</p>
</div>`,
  },
];
