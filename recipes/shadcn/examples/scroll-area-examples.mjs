/*
 * shadcn Scroll Area 예제 — scroll-area.tsx의 className과 동기 유지.
 *
 * 정적 HTML preview에서는 native overflow:auto + custom scrollbar style로 흉내.
 */

const SCROLL_BASE = `position:relative; overflow:auto; border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default);`;

export const scrollAreaExamples = [
  {
    title: "Vertical scroll",
    description: "고정 높이 + 세로 스크롤. 넘치는 콘텐츠 처리.",
    jsx: `<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-title-sm">태그</h4>
    {tags.map(tag => (
      <div key={tag} className="text-body-sm py-1">{tag}</div>
    ))}
  </div>
</ScrollArea>`,
    render: () => {
      const items = ["회의록", "회고", "일기", "독서노트", "여행", "요리", "운동", "음악", "영화", "책 추천", "맛집", "포토그래피", "프로젝트", "아이디어", "할일", "구매목록", "선물", "기념일"];
      const itemsHtml = items.map(t => `<div style="font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); padding:4px 0;">${t}</div>`).join("");
      return `<div style="${SCROLL_BASE} height:288px; width:192px;">
  <div style="padding:16px;">
    <h4 style="margin:0 0 16px; font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">태그</h4>
    ${itemsHtml}
  </div>
</div>`;
    },
  },

  {
    title: "Horizontal scroll",
    description: "가로 스크롤 — 카드 갤러리 등.",
    jsx: `<ScrollArea className="w-full whitespace-nowrap rounded-md border">
  <div className="flex gap-3 p-4">
    {items.map(item => (
      <Card key={item.id} className="w-32 shrink-0">
        ...
      </Card>
    ))}
  </div>
</ScrollArea>`,
    render: () => {
      const card = (label) => `<div style="width:128px; flex-shrink:0; padding:12px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default); text-align:center;"><div style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">${label}</div></div>`;
      const cards = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일", "월요일", "화요일"].map(card).join("");
      return `<div style="${SCROLL_BASE} width:100%; max-width:480px; white-space:nowrap;">
  <div style="display:flex; gap:12px; padding:16px;">
    ${cards}
  </div>
</div>`;
    },
  },
];
