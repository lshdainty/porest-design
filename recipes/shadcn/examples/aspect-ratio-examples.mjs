/*
 * shadcn Aspect Ratio 예제 — Radix AspectRatio.Root 그대로 사용.
 *
 * 정적 HTML에서는 padding-bottom 트릭으로 비율 흉내.
 */

function ar({ ratio = "16/9", children = "", maxWidth = "100%" } = {}) {
  return `<div style="position:relative; max-width:${maxWidth}; aspect-ratio:${ratio}; background:var(--color-surface-input); border-radius:var(--radius-md); overflow:hidden;">${children}</div>`;
}

const PLACEHOLDER = `<div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:var(--color-text-tertiary); font-family:ui-monospace, monospace; font-size:var(--text-label-sm);">image</div>`;

export const aspectRatioExamples = [
  {
    title: "16:9",
    description: "동영상 / 와이드 미디어 표준 비율.",
    jsx: `<AspectRatio ratio={16 / 9}>
  <img
    src="..."
    alt="..."
    className="rounded-md object-cover"
  />
</AspectRatio>`,
    render: () => ar({ ratio: "16/9", maxWidth: "480px", children: PLACEHOLDER }),
  },

  {
    title: "1:1",
    description: "정사각형 — 프로필, 썸네일.",
    jsx: `<AspectRatio ratio={1}>
  <img src="..." alt="..." className="rounded-md object-cover" />
</AspectRatio>`,
    render: () => ar({ ratio: "1/1", maxWidth: "240px", children: PLACEHOLDER }),
  },

  {
    title: "4:3",
    description: "전통적 사진 비율.",
    jsx: `<AspectRatio ratio={4 / 3}>
  <img src="..." alt="..." className="rounded-md object-cover" />
</AspectRatio>`,
    render: () => ar({ ratio: "4/3", maxWidth: "400px", children: PLACEHOLDER }),
  },

  {
    title: "Card with image",
    description: "Card 안에 AspectRatio — listing thumbnail 패턴.",
    jsx: `<Card className="max-w-xs overflow-hidden">
  <AspectRatio ratio={16 / 9}>
    <img src="..." alt="..." className="object-cover" />
  </AspectRatio>
  <CardHeader>
    <CardTitle>회의실 A</CardTitle>
    <CardDescription>10인 · 회의용 · 화상 가능</CardDescription>
  </CardHeader>
</Card>`,
    render: () => `<div style="max-width:320px; border-radius:var(--radius-lg); background:var(--color-surface-default); overflow:hidden; box-shadow:var(--shadow-sm);">
  ${ar({ ratio: "16/9", children: PLACEHOLDER })}
  <div style="display:flex; flex-direction:column; gap:6px; padding:24px;">
    <h3 style="margin:0; font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:var(--text-title-md--font-weight); color:var(--color-text-primary);">회의실 A</h3>
    <p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">10인 · 회의용 · 화상 가능</p>
  </div>
</div>`,
  },
];
