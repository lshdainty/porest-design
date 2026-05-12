/*
 * shadcn Carousel 예제 — carousel.md SoT 정합.
 * 정적 HTML preview는 첫 1–3 슬라이드만 표시(실제 swipe/drag은 React 환경).
 * 한국 도메인 시나리오(HR 신규 입사자 / Desk 가계부 월별 / Hero banner)로
 * 실제 사용처 패턴 + 타이포 토큰 명시.
 */

const ARROW_LEFT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
const ARROW_RIGHT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

function arrow({ direction = "next", disabled = false } = {}) {
  return `<button type="button" aria-label="${direction === "prev" ? "이전 슬라이드" : "다음 슬라이드"}" style="display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:var(--radius-full); border:1px solid var(--color-border-default); background:var(--color-surface-default); color:var(--color-text-primary); cursor:pointer;${disabled ? " opacity:0.5; cursor:not-allowed; pointer-events:none;" : ""}"${disabled ? " disabled" : ""}>${direction === "prev" ? ARROW_LEFT : ARROW_RIGHT}</button>`;
}

export const carouselExamples = [
  {
    title: "Default",
    description: "기본 가로 캐러셀 — 양쪽 화살표(`Button outline icon` 32×32 원형) navigate. 한 번에 한 슬라이드(`basis-full`). 외부 위치(`-left-12`/`-right-12`).",
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
    <div style="aspect-ratio:1/1; background:var(--color-surface-input); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:var(--text-display-sm); font-weight:700; color:var(--color-text-primary);">1</div>
  </div>
  <div style="position:absolute; left:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "prev", disabled: true })}</div>
  <div style="position:absolute; right:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "next" })}</div>
</div>`,
  },

  {
    title: "HR — 신규 입사자 안내",
    description: "입사자 프로필 카드 carousel — avatar(`h-12 w-12` round) + 이름(`text-title-sm` 600) + 부서(`text-body-sm secondary`) + 입사일(`text-caption tertiary`). dot indicator(`h-1.5 w-1.5 rounded-full`)로 현재 위치 표시.",
    jsx: `<Carousel className="max-w-sm">
  <CarouselContent>
    {newcomers.map(p => (
      <CarouselItem key={p.id}>
        <div className="flex flex-col items-center gap-[var(--spacing-md)] p-[var(--spacing-xl)] bg-surface-default rounded-md"
          style={{ boxShadow: "var(--shadow-sm)" }}>
          <Avatar className="h-12 w-12">
            <AvatarFallback>{p.initial}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h4 className="text-title-sm font-semibold text-text-primary">{p.name}</h4>
            <p className="text-body-sm text-text-secondary mt-1">{p.dept}</p>
            <p className="text-caption text-text-tertiary mt-2">입사일 {p.date}</p>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <div className="flex justify-center gap-[var(--spacing-xs)] mt-[var(--spacing-md)]">
    {/* dot indicator — 사용처 합성 패턴 */}
  </div>
</Carousel>`,
    render: () => {
      const card = (initial, name, dept, date) => `<div style="display:flex; flex-direction:column; align-items:center; gap:var(--spacing-md); padding:var(--spacing-xl); background:var(--color-surface-default); border-radius:var(--radius-md); box-shadow:var(--shadow-sm);">
  <div style="width:48px; height:48px; border-radius:var(--radius-full); background:var(--color-primary, var(--color-text-primary)); color:var(--color-text-on-accent, #fff); display:flex; align-items:center; justify-content:center; font-size:var(--text-title-sm); font-weight:600;">${initial}</div>
  <div style="text-align:center;">
    <h4 style="margin:0; font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:var(--text-title-sm--font-weight); color:var(--color-text-primary);">${name}</h4>
    <p style="margin:var(--spacing-xs) 0 0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">${dept}</p>
    <p style="margin:var(--spacing-xs) 0 0; font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-tertiary);">입사일 ${date}</p>
  </div>
</div>`;
      const dot = (active) => `<button type="button" aria-label="슬라이드로 이동" style="width:6px; height:6px; border-radius:var(--radius-full); border:0; padding:0; background:${active ? "var(--color-text-primary)" : "var(--color-border-default)"}; cursor:pointer;"></button>`;
      return `<div style="position:relative; max-width:384px; margin:0 56px;">
  <div style="overflow:hidden; border-radius:var(--radius-md);">
    ${card("김", "김지원", "디자인 본부", "2026-05-12")}
  </div>
  <div style="position:absolute; left:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "prev", disabled: true })}</div>
  <div style="position:absolute; right:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "next" })}</div>
  <div style="display:flex; justify-content:center; gap:var(--spacing-xs); margin-top:var(--spacing-md);">
    ${dot(true)}${dot(false)}${dot(false)}${dot(false)}${dot(false)}
  </div>
</div>`;
    },
  },

  {
    title: "Desk — 가계부 월별 요약 (multi-item)",
    description: "12개월 요약 카드 — `basis-1/3`로 한 화면에 3개월씩. 각 카드: 월(`text-label-md secondary`) + 총 지출(`text-title-md` 600 + tabular-nums) + 카테고리 top 1(`text-caption tertiary`).",
    jsx: `<Carousel opts={{ align: "start" }} className="w-full max-w-md">
  <CarouselContent>
    {months.map(m => (
      <CarouselItem key={m.key} className="basis-1/3">
        <div className="flex flex-col gap-[var(--spacing-xs)] p-[var(--spacing-md)] bg-surface-default rounded-md"
          style={{ boxShadow: "var(--shadow-sm)" }}>
          <span className="text-label-md text-text-secondary">{m.label}</span>
          <span className="text-title-md font-semibold text-text-primary tabular-nums">{m.total}</span>
          <span className="text-caption text-text-tertiary">{m.topCategory}</span>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    render: () => {
      const card = (label, total, top) => `<div style="flex:0 0 calc(33.333% - var(--spacing-md)); display:flex; flex-direction:column; gap:var(--spacing-xs); padding:var(--spacing-md); background:var(--color-surface-default); border-radius:var(--radius-md); box-shadow:var(--shadow-sm);">
  <span style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); color:var(--color-text-secondary);">${label}</span>
  <span style="font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:var(--text-title-md--font-weight); color:var(--color-text-primary); font-variant-numeric:tabular-nums;">${total}</span>
  <span style="font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-tertiary);">${top}</span>
</div>`;
      return `<div style="position:relative; max-width:448px; margin:0 56px;">
  <div style="overflow:hidden;">
    <div style="display:flex; gap:var(--spacing-md);">
      ${card("3월", "1,284,500원", "식비 38%")}
      ${card("4월", "1,520,200원", "주거 32%")}
      ${card("5월", "892,000원", "교통 24%")}
    </div>
  </div>
  <div style="position:absolute; left:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "prev", disabled: true })}</div>
  <div style="position:absolute; right:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "next" })}</div>
</div>`;
    },
  },

  {
    title: "Hero banner (auto-play)",
    description: "Landing 페이지 hero — full-width 이미지 + 텍스트 overlay. `Autoplay({ delay: 4000, stopOnInteraction: true })` plugin으로 4초 간격 자동 next, hover/focus 시 pause(WCAG 2.2.2). dot indicator 하단.",
    jsx: `import Autoplay from "embla-carousel-autoplay"

<Carousel
  plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
  opts={{ loop: true }}
  className="w-full"
>
  <CarouselContent>
    {banners.map(b => (
      <CarouselItem key={b.id}>
        <div className="relative h-64 rounded-md overflow-hidden">
          <img src={b.image} alt={b.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-[var(--spacing-xl)]">
            <div>
              <h2 className="text-display-sm font-bold text-text-on-accent">{b.title}</h2>
              <p className="text-body-md text-text-on-accent mt-[var(--spacing-xs)] opacity-90">{b.subtitle}</p>
            </div>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    render: () => {
      const dot = (active) => `<button type="button" aria-label="슬라이드로 이동" style="width:6px; height:6px; border-radius:var(--radius-full); border:0; padding:0; background:${active ? "var(--color-text-primary)" : "var(--color-border-default)"}; cursor:pointer;"></button>`;
      return `<div style="position:relative; width:100%; max-width:640px; margin:0 56px;">
  <div style="overflow:hidden; border-radius:var(--radius-md);">
    <div style="position:relative; height:256px; background:linear-gradient(135deg, var(--color-primary, var(--color-text-primary)) 0%, var(--color-info) 100%);">
      <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.6), transparent); display:flex; align-items:flex-end; padding:var(--spacing-xl);">
        <div>
          <h2 style="margin:0; font-size:var(--text-display-sm); line-height:var(--text-display-sm--line-height); font-weight:700; color:var(--color-text-on-accent, #fff);">Porest로 시작하는 단정한 일상</h2>
          <p style="margin:var(--spacing-xs) 0 0; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-on-accent, #fff); opacity:0.9;">메모·할일·가계부를 한 곳에서</p>
        </div>
      </div>
    </div>
  </div>
  <div style="position:absolute; left:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "prev" })}</div>
  <div style="position:absolute; right:-44px; top:50%; transform:translateY(-50%);">${arrow({ direction: "next" })}</div>
  <div style="display:flex; justify-content:center; gap:var(--spacing-xs); margin-top:var(--spacing-md);">
    ${dot(true)}${dot(false)}${dot(false)}
  </div>
</div>`;
    },
  },
];
