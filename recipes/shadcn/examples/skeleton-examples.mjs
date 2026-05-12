/*
 * shadcn Skeleton 예제 — skeleton.md SoT 정합.
 * 한국 도메인 시나리오(HR 결재 list, Desk 메모 card, Desk 가계부 row)로
 * 실제 콘텐츠 비율과 일치하는 placeholder 톤. 타이포 토큰 직접 인용으로 위계 시각화.
 */

const SK = "animate-pulse rounded-sm bg-surface-input";

function sk(extra = "") {
  return `<div class="${SK} ${extra}"></div>`;
}

function skStyle(style = "") {
  return `<div class="${SK}" style="${style}"></div>`;
}

export const skeletonExamples = [
  {
    title: "Default",
    description: "단순 박스 — animate-pulse + bg-surface-input. shape(`h-*`/`w-*`)는 사용처가 결정. 텍스트 라인 placeholder는 body-md line-height(24)와 가깝게 h-4(16).",
    jsx: `<Skeleton className="h-4 w-32" />`,
    render: () => sk("h-4 w-32"),
  },

  {
    title: "HR — 결재 list placeholder",
    description: "결재함 진입 시 row 3개 반복 — avatar(md 40 round) + 직원명(`h-4 w-24`) + 부서(`h-3 w-32`) + status badge(`h-6 w-16 rounded-full`).",
    jsx: `<div className="flex flex-col gap-[var(--spacing-sm)] max-w-md">
  {[1, 2, 3].map(i => (
    <div key={i} className="flex items-center gap-[var(--spacing-md)] py-[var(--spacing-sm)]">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 flex flex-col gap-[var(--spacing-xs)]">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  ))}
</div>`,
    render: () => {
      const row = `<div style="display:flex; align-items:center; gap:var(--spacing-md); padding:var(--spacing-sm) 0;">
  ${sk("h-10 w-10 rounded-full")}
  <div style="flex:1; display:flex; flex-direction:column; gap:var(--spacing-xs);">
    ${sk("h-4 w-24")}
    ${sk("h-3 w-32")}
  </div>
  ${sk("h-6 w-16 rounded-full")}
</div>`;
      return `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm); max-width:448px;">${row}${row}${row}</div>`;
    },
  },

  {
    title: "Desk — 메모 card placeholder",
    description: "메모 보관함 로딩 — 제목(`h-5 w-3/4` ≈ title-sm) + 본문 2줄(`h-3 w-full` / `h-3 w-5/6` ≈ body-sm) + 태그 row(작은 pill 3개) + 메타(`h-3 w-32` ≈ caption).",
    jsx: `<div className="flex flex-col gap-[var(--spacing-sm)] p-[var(--spacing-lg)] bg-surface-default rounded-md max-w-xs"
  style={{ boxShadow: "var(--shadow-sm)" }}>
  <Skeleton className="h-5 w-3/4" />
  <div className="flex flex-col gap-[var(--spacing-xs)] py-[var(--spacing-xs)]">
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-5/6" />
  </div>
  <div className="flex gap-[var(--spacing-xs)]">
    <Skeleton className="h-5 w-12 rounded-full" />
    <Skeleton className="h-5 w-16 rounded-full" />
    <Skeleton className="h-5 w-10 rounded-full" />
  </div>
  <Skeleton className="h-3 w-32" />
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm); padding:var(--spacing-lg); background:var(--color-surface-default); border-radius:var(--radius-md); box-shadow:var(--shadow-sm); max-width:320px;">
  ${skStyle("height:20px; width:75%;")}
  <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); padding:var(--spacing-xs) 0;">
    ${sk("h-3 w-full")}
    ${skStyle("height:12px; width:83%;")}
  </div>
  <div style="display:flex; gap:var(--spacing-xs);">
    ${sk("h-5 w-12 rounded-full")}
    ${sk("h-5 w-16 rounded-full")}
    ${sk("h-5 w-10 rounded-full")}
  </div>
  ${sk("h-3 w-32")}
</div>`,
  },

  {
    title: "Desk — 가계부 row placeholder",
    description: "거래내역 list 로딩 — 카테고리 icon 자리(40 round) + 가맹점명(`h-4 w-40` ≈ body-md) + 일시(`h-3 w-28` ≈ caption) + 금액(`h-5 w-20`, 우측 정렬).",
    jsx: `<div className="flex flex-col max-w-md">
  {[1, 2, 3].map(i => (
    <div key={i} className="flex items-center gap-[var(--spacing-md)] py-[var(--spacing-md)] border-b border-border-default">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 flex flex-col gap-[var(--spacing-xs)]">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  ))}
</div>`,
    render: () => {
      const row = `<div style="display:flex; align-items:center; gap:var(--spacing-md); padding:var(--spacing-md) 0; border-bottom:1px solid var(--color-border-default);">
  ${sk("h-10 w-10 rounded-full")}
  <div style="flex:1; display:flex; flex-direction:column; gap:var(--spacing-xs);">
    ${sk("h-4 w-40")}
    ${sk("h-3 w-28")}
  </div>
  ${sk("h-5 w-20")}
</div>`;
      return `<div style="display:flex; flex-direction:column; max-width:448px;">${row}${row}${row}</div>`;
    },
  },

  {
    title: "Shimmer — hero image (강조 로딩)",
    description: "큰 이미지 placeholder — sweep gradient variant. surface-input 베이스 + primary 25% mix 좌→우 sweep + motion-duration-loop(1500ms) infinite. listing detail hero 등 시각 강조 필요한 곳.",
    jsx: `<SkeletonShimmer className="h-64 w-full rounded-md" />`,
    render: () => `<div style="position:relative; overflow:hidden; height:256px; width:100%; max-width:480px; border-radius:var(--radius-md); background:var(--color-surface-input);">
  <div style="position:absolute; inset:0; background:linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-primary) 25%, transparent) 50%, transparent 100%); animation:shimmer var(--motion-duration-loop) linear infinite;"></div>
</div>`,
  },
];
