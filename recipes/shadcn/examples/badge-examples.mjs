/*
 * shadcn Badge 예제 — badge.md SoT 정합.
 * 3 styles(solid/soft/outline) × neutral·semantic 매트릭스.
 * 모든 padding/font/motion 토큰 직접 인용.
 */

const BASE =
  "display:inline-flex; align-items:center; border-radius:var(--radius-full); border:1px solid; padding:2px var(--spacing-sm); font-size:var(--text-badge); font-weight:var(--text-badge--font-weight,600); line-height:var(--text-badge--line-height,1.2); transition:background-color var(--motion-duration-fast) var(--motion-ease-out);";

const VARIANT = {
  // solid
  default: "border-color:transparent; background:var(--color-primary); color:var(--color-text-on-accent);",
  secondary: "border-color:transparent; background:var(--color-surface-input); color:var(--color-text-primary);",
  destructive: "border-color:transparent; background:var(--color-error); color:var(--color-text-on-accent);",
  // soft (semantic)
  info: "border-color:transparent; background:color-mix(in srgb, var(--color-info) 16%, transparent); color:var(--color-info);",
  success: "border-color:transparent; background:color-mix(in srgb, var(--color-success) 16%, transparent); color:var(--color-success);",
  warning: "border-color:transparent; background:color-mix(in srgb, var(--color-warning) 16%, transparent); color:var(--color-warning);",
  error: "border-color:transparent; background:color-mix(in srgb, var(--color-error) 16%, transparent); color:var(--color-error);",
  // outline
  outline: "border-color:var(--color-border-default); color:var(--color-text-primary);",
  "outline-info": "border-color:var(--color-info); color:var(--color-info);",
  "outline-success": "border-color:var(--color-success); color:var(--color-success);",
  "outline-warning": "border-color:var(--color-warning); color:var(--color-warning);",
  "outline-error": "border-color:var(--color-error); color:var(--color-error);",
};

function badge({ variant = "default", children = "" } = {}) {
  return `<div style="${BASE} ${VARIANT[variant]}">${children}</div>`;
}

export const badgeExamples = [
  {
    title: "Solid",
    description: "강조 강도 최상 — brand primary + neutral + destructive 3종.",
    jsx: `<div className="flex flex-wrap gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
</div>`,
    render: () => `<div style="display:flex; flex-wrap:wrap; gap:var(--spacing-sm);">
  ${badge({ children: "Default" })}
  ${badge({ variant: "secondary", children: "Secondary" })}
  ${badge({ variant: "destructive", children: "Destructive" })}
</div>`,
  },

  {
    title: "Soft (semantic)",
    description: "16% color-mix 배경 + semantic text — 중간 강조. 절제된 의미 분기 라벨.",
    jsx: `<div className="flex flex-wrap gap-2">
  <Badge variant="info">신규</Badge>
  <Badge variant="success">완료</Badge>
  <Badge variant="warning">임박</Badge>
  <Badge variant="error">지연</Badge>
</div>`,
    render: () => `<div style="display:flex; flex-wrap:wrap; gap:var(--spacing-sm);">
  ${badge({ variant: "info", children: "신규" })}
  ${badge({ variant: "success", children: "완료" })}
  ${badge({ variant: "warning", children: "임박" })}
  ${badge({ variant: "error", children: "지연" })}
</div>`,
  },

  {
    title: "Outline (neutral + semantic)",
    description: "강조 강도 최하 — border + 텍스트만. 우선순위 평가(LOW/MEDIUM/HIGH) 톤.",
    jsx: `<div className="flex flex-wrap gap-2">
  <Badge variant="outline">Outline</Badge>
  <Badge variant="outline-info">LOW</Badge>
  <Badge variant="outline-warning">MEDIUM</Badge>
  <Badge variant="outline-error">HIGH</Badge>
</div>`,
    render: () => `<div style="display:flex; flex-wrap:wrap; gap:var(--spacing-sm);">
  ${badge({ variant: "outline", children: "Outline" })}
  ${badge({ variant: "outline-info", children: "LOW" })}
  ${badge({ variant: "outline-warning", children: "MEDIUM" })}
  ${badge({ variant: "outline-error", children: "HIGH" })}
</div>`,
  },

  {
    title: "With dot indicator",
    description: "좌측 6×6 colored dot + outline neutral — 색 + 텍스트 두 단서로 의미 전달 (WCAG 1.4.1).",
    jsx: `<div className="flex flex-wrap gap-2">
  <Badge variant="outline">
    <span className="size-1.5 rounded-full bg-success mr-1.5" />
    온라인
  </Badge>
  <Badge variant="outline">
    <span className="size-1.5 rounded-full bg-warning mr-1.5" />
    자리비움
  </Badge>
  <Badge variant="outline">
    <span className="size-1.5 rounded-full bg-text-tertiary mr-1.5" />
    오프라인
  </Badge>
</div>`,
    render: () => `<div style="display:flex; flex-wrap:wrap; gap:var(--spacing-sm);">
  ${badge({ variant: "outline", children: '<span style="display:inline-block; width:6px; height:6px; border-radius:var(--radius-full); background:var(--color-success); margin-right:var(--spacing-xs);"></span>온라인' })}
  ${badge({ variant: "outline", children: '<span style="display:inline-block; width:6px; height:6px; border-radius:var(--radius-full); background:var(--color-warning); margin-right:var(--spacing-xs);"></span>자리비움' })}
  ${badge({ variant: "outline", children: '<span style="display:inline-block; width:6px; height:6px; border-radius:var(--radius-full); background:var(--color-text-tertiary); margin-right:var(--spacing-xs);"></span>오프라인' })}
</div>`,
  },

  {
    title: "In list (HR 시나리오)",
    description: "list row 우측 끝 status — 직원명 + 결재 상태. 한 카테고리(결재 상태)는 같은 style(soft semantic)로 통일, 의미는 색으로만 분기.",
    jsx: `<div className="flex flex-col gap-2 p-4 bg-surface-default border border-border-default rounded-md max-w-md">
  <div className="flex items-center justify-between">
    <span className="text-title-sm font-semibold">김지원</span>
    <Badge variant="info">승인</Badge>
  </div>
  <div className="flex items-center justify-between">
    <span className="text-title-sm font-semibold">이도현</span>
    <Badge variant="warning">대기</Badge>
  </div>
  <div className="flex items-center justify-between">
    <span className="text-title-sm font-semibold">최가람</span>
    <Badge variant="error">반려</Badge>
  </div>
  <div className="flex items-center justify-between">
    <span className="text-title-sm font-semibold">박서연</span>
    <Badge variant="success">완료</Badge>
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm); padding:var(--spacing-lg); background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); max-width:448px;">
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <span style="font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">김지원</span>
    ${badge({ variant: "info", children: "승인" })}
  </div>
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <span style="font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">이도현</span>
    ${badge({ variant: "warning", children: "대기" })}
  </div>
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <span style="font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">최가람</span>
    ${badge({ variant: "error", children: "반려" })}
  </div>
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <span style="font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">박서연</span>
    ${badge({ variant: "success", children: "완료" })}
  </div>
</div>`,
  },

  {
    title: "Priority pills (outline-semantic)",
    description: "우선순위 표시 — outline + semantic 색. 카드 코너 또는 list 우측에 배치.",
    jsx: `<div className="flex flex-col gap-1.5 items-start">
  <Badge variant="outline-info">LOW</Badge>
  <Badge variant="outline-error">HIGH</Badge>
  <Badge variant="outline-warning">MEDIUM</Badge>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-xs); align-items:flex-start;">
  ${badge({ variant: "outline-info", children: "LOW" })}
  ${badge({ variant: "outline-error", children: "HIGH" })}
  ${badge({ variant: "outline-warning", children: "MEDIUM" })}
</div>`,
  },
];
