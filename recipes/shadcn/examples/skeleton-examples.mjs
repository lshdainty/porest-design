/*
 * shadcn Skeleton 예제 — skeleton.tsx의 className과 동기 유지.
 */

const SK = "animate-pulse rounded-sm bg-border-default";

function sk(extra = "") {
  return `<div class="${SK} ${extra}"></div>`;
}

export const skeletonExamples = [
  {
    title: "Default",
    description: "단순 박스 — animate-pulse + surface-input 배경.",
    jsx: `<Skeleton className="h-4 w-32" />`,
    render: () => sk("h-4 w-32"),
  },

  {
    title: "Avatar + text",
    description: "사용자 행 placeholder — circle avatar + 2줄 텍스트.",
    jsx: `<div className="flex items-center gap-3">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`,
    render: () => `<div style="display:flex; align-items:center; gap:12px;">
  ${sk("h-10 w-10 rounded-full")}
  <div style="display:flex; flex-direction:column; gap:8px;">
    ${sk("h-4 w-32")}
    ${sk("h-3 w-24")}
  </div>
</div>`,
  },

  {
    title: "Card placeholder",
    description: "카드 로딩 상태 — 이미지 영역 + 제목 + 본문 2줄.",
    jsx: `<div className="flex flex-col gap-3 p-4 max-w-xs border border-border-default rounded-md">
  <Skeleton className="h-32 w-full" />
  <Skeleton className="h-5 w-3/4" />
  <div className="space-y-2">
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-5/6" />
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:12px; padding:16px; max-width:320px; border:1px solid var(--color-border-default); border-radius:var(--radius-md);">
  ${sk("h-32 w-full")}
  <div class="${SK}" style="height:20px; width:75%;"></div>
  <div style="display:flex; flex-direction:column; gap:8px;">
    ${sk("h-3 w-full")}
    <div class="${SK}" style="height:12px; width:83%;"></div>
  </div>
</div>`,
  },

  {
    title: "List placeholder",
    description: "리스트 로딩 — 3행 반복.",
    jsx: `<div className="flex flex-col gap-3 max-w-md">
  {[1, 2, 3].map(i => (
    <div key={i} className="flex items-center gap-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  ))}
</div>`,
    render: () => {
      const row = `<div style="display:flex; align-items:center; gap:12px;">
  ${sk("h-12 w-12 rounded-full")}
  <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
    <div class="${SK}" style="height:16px; width:50%;"></div>
    <div class="${SK}" style="height:12px; width:75%;"></div>
  </div>
  ${sk("h-8 w-20")}
</div>`;
      return `<div style="display:flex; flex-direction:column; gap:12px; max-width:448px;">${row}${row}${row}</div>`;
    },
  },
];
