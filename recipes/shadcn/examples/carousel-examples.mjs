/*
 * shadcn Carousel 예제 — embla-carousel-react 베이스.
 *
 * 정적 HTML preview에서는 첫 슬라이드만 보여주고, 옆에 화살표 placeholder.
 * 실제 동작은 React 환경에서.
 */

const ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const ARROW_LEFT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';

function arrow({ direction = "next", disabled = false } = {}) {
  return `<button type="button" class="inline-flex items-center justify-center rounded-full border border-border-default bg-surface-default text-text-primary h-8 w-8 disabled:opacity-50"${disabled ? " disabled" : ""}>${direction === "prev" ? ARROW_LEFT : ARROW}</button>`;
}

function slide(label, color = "var(--color-surface-input)") {
  return `<div style="flex:1; min-width:0; aspect-ratio:1/1; background:${color}; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:var(--text-display-sm); font-weight:700; color:var(--color-text-primary);">${label}</div>`;
}

export const carouselExamples = [
  {
    title: "Default",
    description: "기본 가로 캐러셀 — 양쪽 화살표로 navigate. 한 번에 한 슬라이드.",
    jsx: `<Carousel className="max-w-xs">
  <CarouselContent>
    {Array.from({ length: 5 }).map((_, i) => (
      <CarouselItem key={i}>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center text-display-sm font-bold">
            {i + 1}
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    render: () => `<div style="position:relative; max-width:240px; margin:0 56px;">
  <div style="overflow:hidden; border-radius:var(--radius-md);">
    ${slide("1")}
  </div>
  <div style="position:absolute; left:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "prev", disabled: true })}</div>
  <div style="position:absolute; right:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "next" })}</div>
</div>`,
  },

  {
    title: "Multi-item",
    description: "한 화면에 여러 슬라이드 — basis-1/3 같은 className으로 너비 조정.",
    jsx: `<Carousel
  opts={{ align: "start" }}
  className="w-full max-w-md"
>
  <CarouselContent>
    {Array.from({ length: 8 }).map((_, i) => (
      <CarouselItem key={i} className="basis-1/3">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center">
            {i + 1}
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    render: () => `<div style="position:relative; max-width:448px; margin:0 56px;">
  <div style="overflow:hidden; display:flex; gap:16px; border-radius:var(--radius-md);">
    ${slide("1")}
    ${slide("2")}
    ${slide("3")}
  </div>
  <div style="position:absolute; left:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "prev", disabled: true })}</div>
  <div style="position:absolute; right:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "next" })}</div>
</div>`,
  },
];
