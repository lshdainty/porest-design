/*
 * shadcn Badge 예제 — badge.tsx의 cva variants와 동기 유지.
 */

const BASE =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-badge font-semibold transition-colors";

const VARIANT = {
  default: "border-transparent bg-primary text-text-on-accent",
  secondary: "border-transparent bg-surface-input text-text-primary",
  destructive: "border-transparent bg-error text-text-on-accent",
  outline: "border-border-default text-text-primary",
};

function badge({ variant = "default", children = "", extra = "" } = {}) {
  return `<div class="${BASE} ${VARIANT[variant]} ${extra}">${children}</div>`;
}

export const badgeExamples = [
  {
    title: "Variants",
    description: "4가지 — default(primary) / secondary / destructive / outline.",
    jsx: `<div className="flex flex-wrap gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`,
    render: () => `<div style="display:flex; flex-wrap:wrap; gap:8px;">
  ${badge({ children: "Default" })}
  ${badge({ variant: "secondary", children: "Secondary" })}
  ${badge({ variant: "destructive", children: "Destructive" })}
  ${badge({ variant: "outline", children: "Outline" })}
</div>`,
  },

  {
    title: "Status indicators",
    description: "상태 표시 — 한국어 도메인 라벨 (승인/대기/반려/완료).",
    jsx: `<div className="flex flex-wrap gap-2">
  <Badge>승인</Badge>
  <Badge variant="secondary">대기</Badge>
  <Badge variant="destructive">반려</Badge>
  <Badge variant="outline">완료</Badge>
</div>`,
    render: () => `<div style="display:flex; flex-wrap:wrap; gap:8px;">
  ${badge({ children: "승인" })}
  ${badge({ variant: "secondary", children: "대기" })}
  ${badge({ variant: "destructive", children: "반려" })}
  ${badge({ variant: "outline", children: "완료" })}
</div>`,
  },

  {
    title: "With dot indicator",
    description: "왼쪽 컬러 도트 + 라벨 — 카테고리 색상 구분.",
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
    render: () => `<div style="display:flex; flex-wrap:wrap; gap:8px;">
  ${badge({ variant: "outline", children: '<span style="display:inline-block; width:6px; height:6px; border-radius:9999px; background:var(--color-success); margin-right:6px;"></span>온라인' })}
  ${badge({ variant: "outline", children: '<span style="display:inline-block; width:6px; height:6px; border-radius:9999px; background:var(--color-warning); margin-right:6px;"></span>자리비움' })}
  ${badge({ variant: "outline", children: '<span style="display:inline-block; width:6px; height:6px; border-radius:9999px; background:var(--color-text-tertiary); margin-right:6px;"></span>오프라인' })}
</div>`,
  },

  {
    title: "In list (HR 시나리오)",
    description: "리스트 아이템 행 안에서 — 직원명 + 상태 badge.",
    jsx: `<div className="flex flex-col gap-2 p-4 bg-surface-default border border-border-default rounded-md max-w-md">
  <div className="flex items-center justify-between">
    <span className="text-title-sm font-semibold">김지원</span>
    <Badge>승인</Badge>
  </div>
  <div className="flex items-center justify-between">
    <span className="text-title-sm font-semibold">이도현</span>
    <Badge variant="secondary">대기</Badge>
  </div>
  <div className="flex items-center justify-between">
    <span className="text-title-sm font-semibold">최가람</span>
    <Badge variant="destructive">반려</Badge>
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:8px; padding:16px; background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); max-width:448px;">
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <span style="font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">김지원</span>
    ${badge({ children: "승인" })}
  </div>
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <span style="font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">이도현</span>
    ${badge({ variant: "secondary", children: "대기" })}
  </div>
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <span style="font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">최가람</span>
    ${badge({ variant: "destructive", children: "반려" })}
  </div>
</div>`,
  },
];
