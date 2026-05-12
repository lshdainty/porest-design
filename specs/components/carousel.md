# Carousel

> 여러 슬라이드(이미지/카드/콘텐츠)를 가로(또는 세로) 스크롤로 순환 탐색하는 컴포넌트. 화살표 button + (옵션) dot indicator + (옵션) auto-play. shadcn `Carousel` 베이스 — embla-carousel-react primitive 위에 [`Button`](button.md) 화살표 합성.

Porest Carousel은 **2 orientations(horizontal/vertical) × multi-item 옵션** 매트릭스로 정의됩니다. 화살표는 [`Button`](button.md) `variant="outline"` + 32×32 원형 — 절대 위치(`-left-12`/`-right-12`)로 carousel 외부 배치. 슬라이드 간 gap은 `var(--spacing-lg)`(16). dot indicator는 사용처 합성(spec 가이드 제공, 별도 컴포넌트 신규 없음).

## Anatomy

```
horizontal (default):
       ┌─────────────────────────┐
  ◀ ⓓ  │   ⓑ CarouselContent     │  ⓔ ▶
       │   ┌──────────────────┐  │
       │   │ ⓒ Slide 1 (활성) │  │
       │   └──────────────────┘  │
       └─────────────────────────┘
              ⓕ • ⦿ • • • (옵션, 사용처 합성)

horizontal multi-item (basis-1/3):
       ┌────────────────────────────────────┐
  ◀    │  ┌────┐ ┌────┐ ┌────┐              │  ▶
       │  │  1 │ │  2 │ │  3 │   4   5   6  │
       │  └────┘ └────┘ └────┘              │
       └────────────────────────────────────┘
```

| ⓐ Carousel root | `<div role="region" aria-roledescription="carousel">` — `relative` + 사용처 className(`max-w-*`/`w-full`). |
| ⓑ CarouselContent | `<div ref={carouselRef}>` (embla ref) + 자식 `<div className="flex -ml-[var(--spacing-lg)]">` — viewport overflow-hidden + slide flex container. negative margin trick으로 첫 slide의 padding 보정. |
| ⓒ CarouselItem | `<div role="group" aria-roledescription="slide">` — `min-w-0 shrink-0 grow-0 basis-full pl-[var(--spacing-lg)]`. multi-item은 `basis-1/3` 등 className으로 분할. |
| ⓓ CarouselPrevious | [`Button`](button.md) `variant="outline" size="icon"` + `absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2` + `ArrowLeft` 16 + `sr-only "이전 슬라이드"`. |
| ⓔ CarouselNext | 동일하게 `-right-12` 위치 + `ArrowRight`. |
| ⓕ Dot indicator (옵션) | 사용처 합성 — `<div className="flex justify-center gap-[var(--spacing-xs)] mt-[var(--spacing-md)]">{[...n].map(i => <button className="h-1.5 w-1.5 rounded-full bg-border-default data-[active=true]:bg-text-primary" />)}</div>` 패턴. |

**규칙**

- 화살표는 carousel **외부** 위치(`-left-12`/`-right-12`) — 사용처 부모에 `mx-12+` 또는 `px-12+` padding 확보. 모바일 좁은 화면이면 내부(`left-2`/`right-2`)로 className override.
- 화살표는 32×32 원형 ([`Button`](button.md) `size="icon"`은 40×40지만 carousel은 보조 navigation이라 작게 — 임의값 유지 또는 사용처 `className="h-10 w-10"` override).
- 슬라이드 gap은 `var(--spacing-lg)` (16) — Tailwind 기본 `-ml-4`/`pl-4` 토큰 직접 인용.
- 첫/마지막 슬라이드에서 Previous/Next `disabled` 자동 (embla `canScrollPrev`/`canScrollNext`).
- dot indicator는 별도 컴포넌트 없음 — 사용처가 `api.scrollSnapList()` + `selectedScrollSnap()`으로 합성. carousel은 시각 framework만 제공.
- `aria-roledescription="carousel"` (root) + `aria-roledescription="slide"` (item) — screen reader가 carousel/slide 구조 인식.

## Variants (orientation)

| Variant | 동작 | 사용처 |
|---|---|---|
| `horizontal` *(default)* | 좌·우 슬라이드 + 좌·우 화살표 | hero banner, image gallery, listing 카드 row. 가장 흔한 패턴. |
| `vertical` | 상·하 슬라이드 + 상·하 화살표(rotate-90) | 세로 콘텐츠 strip — 모바일 친화 reel, timeline. |

## Sizes

Carousel은 **size variant 없음** — 사용처 className으로 width/height 결정. 화살표 사이즈는 `h-8 w-8`(32) 기본, 사용처 className으로 [`Button`](button.md) icon size(40) 또는 lg(48) override 가능.

| 항목 | 값 | 토큰/규칙 |
|---|---|---|
| Root | width 사용처 결정 | `max-w-*` / `w-full` |
| Slide gap | 16px | `-ml-[var(--spacing-lg)]` (content) + `pl-[var(--spacing-lg)]` (item) — negative margin trick |
| Vertical gap | 16px | `-mt-[var(--spacing-lg)]` + `pt-[var(--spacing-lg)]` |
| Arrow size | 32×32 | `h-8 w-8` (Button icon보다 작음, carousel 보조 navigation 톤) |
| Arrow radius | full pill | `rounded-full` |
| Arrow icon | 16×16 | `h-4 w-4` (`ArrowLeft`/`ArrowRight`) |
| Arrow position (horizontal) | -48px 외부 | `-left-12` / `-right-12` + `top-1/2 -translate-y-1/2` |
| Arrow position (vertical) | -48px 외부 | `-top-12` / `-bottom-12` + `left-1/2 -translate-x-1/2` + `rotate-90` |
| Slide basis (single) | full width | `basis-full` |
| Slide basis (multi-item, 3개) | 1/3 width | `basis-1/3` (사용처 className) |
| Dot indicator (옵션) | 6×6 pill | `h-1.5 w-1.5 rounded-full` |

## States

| State | CarouselPrevious | CarouselNext | Slide |
|---|---|---|---|
| `default` | enabled (active slide > 0) | enabled (active slide < total - 1) | 활성 슬라이드 표시 |
| `disabled` (first slide) | opacity 0.5 + cursor-not-allowed | enabled | — |
| `disabled` (last slide) | enabled | opacity 0.5 + cursor-not-allowed | — |
| `loop: true` (옵션) | always enabled | always enabled | — |
| `hover` (slide) | — | — | (사용처 결정 — image scale-up 등 효과 가능) |

## Layout (한국 도메인 패턴)

**HR — 신규 입사자 안내 carousel**

- 입사자 프로필 카드 3–5개 horizontal — avatar + 이름 + 부서 + 입사일. dot indicator로 현재 위치 표시.

**Desk — 가계부 월별 요약 carousel**

- 12개월 요약 카드 horizontal multi-item(`basis-1/3` — 3개월씩 보기) — 월 + 총 지출 + 카테고리 top 3. 좌·우 화살표로 navigate.

**Hero banner (Landing)**

- listing 페이지 상단 hero — full-width 이미지 + 텍스트 overlay carousel. auto-play(embla `Autoplay` plugin) + dot indicator + pause-on-hover.

**Image gallery (제품 상세)**

- 제품 이미지 5–10개 — 메인 carousel + 하단 thumbnail strip(작은 carousel). 메인 클릭 시 다른 carousel로 sync(embla `Slot` plugin).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| CarouselPrevious click | 이전 슬라이드로 이동. embla `scrollPrev()`. |
| CarouselNext click | 다음 슬라이드로 이동. embla `scrollNext()`. |
| `ArrowLeft`/`ArrowRight` (horizontal, root focus) | 이전/다음 슬라이드. embla 자동(또는 사용처 keyboard handler). |
| `ArrowUp`/`ArrowDown` (vertical) | 이전/다음. |
| Drag (mouse/touch) | 슬라이드 자유 이동 — embla 자동. |
| `loop: true` 옵션 | 마지막 → 처음 (또는 처음 → 마지막) 순환. embla `opts.loop`. |
| Auto-play (Autoplay plugin) | N초마다 자동 next. hover 시 pause. `Autoplay({ delay: 4000 })`. |
| Touch swipe (모바일) | 슬라이드 — embla native. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (Arrow text × bg) | [`Button`](button.md) `outline` variant 인용 — 14:1+ ✓ |
| **WCAG 2.1.1** Keyboard | `ArrowLeft/Right` (root focus) + `Tab`으로 Previous/Next focus + `Enter` ✓ |
| **WCAG 2.2.2** Pause/Stop/Hide (auto-play 5s+) | auto-play 사용 시 사용자 일시정지 button 필수 — `Autoplay({ stopOnInteraction: true })` 권장. hover/focus 시 자동 pause 보강. |
| **WCAG 2.4.7** Focus Visible | [`Button`](button.md) `focus-visible:ring-2` 인용 ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | 화살표 32×32 — 미달(⚠). 모바일 우선 화면이면 사용처 `className="h-10 w-10"` 또는 `h-11 w-11` override. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 32 ✓ |
| **ARIA** | `role="region" aria-roledescription="carousel"` (root) + `role="group" aria-roledescription="slide"` (item) + `aria-label` (slide N of M) + Previous/Next `sr-only "이전 슬라이드"/"다음 슬라이드"`. |

## Do / Don't

### ✅ Do

- **시각 콘텐츠 강조** — 이미지/카드 갤러리, hero banner, listing 카드 row.
- multi-item 옵션 — `basis-1/3` 등으로 한 화면에 여러 슬라이드 (월별 요약, 카테고리 row).
- dot indicator — 현재 위치 시각화. carousel item 5+개면 권장.
- auto-play는 hero/banner만 — 콘텐츠 carousel에 auto-play 사용 시 사용자 통제 부재로 불편.
- 모바일에선 native swipe 우선 — embla 자동 지원, 화살표는 desktop 보조.

### ❌ Don't

- **본문 콘텐츠를 carousel로** — 사용자가 모든 슬라이드 보지 않을 가능성. 중요 콘텐츠는 always-visible.
- auto-play 5s+ 멈춤 없이 — WCAG 2.2.2 위반. `stopOnInteraction` 또는 사용자 pause 필수.
- 화살표 외부 위치 + 사용처 부모 padding 부족 — 화살표 잘림. `mx-12+` 또는 내부 위치 override.
- slide 콘텐츠 너무 다양한 높이 — carousel 박스 size jumping. 동일 비율 권장(AspectRatio wrapper).
- carousel을 카테고리/필터 nav로 — [`Tabs`](tabs.md) 또는 [`ToggleGroup`](toggle-group.md)이 자연.

## Migration notes

- 기존 `carousel.tsx` 정정:
  - spacing `-ml-4`/`-mt-4`/`pl-4`/`pt-4` (Tailwind 기본 16) → `-ml-[var(--spacing-lg)]`/`-mt-[var(--spacing-lg)]`/`pl-[var(--spacing-lg)]`/`pt-[var(--spacing-lg)]` 토큰 직접 인용.
  - 화살표 `h-8 w-8 rounded-full` — Button cva의 `size="icon"`(`h-10 w-10`) override. 임의값이나 carousel arrow는 작게 유지(보조 navigation). 사용처가 필요 시 className으로 [`Button`](button.md) icon size 정합 override 가능.
- examples 한국 도메인 정합 — 추상 "1/2/3" 슬라이드 → **HR 신규 입사자 안내 / Desk 가계부 월별 요약(multi-item) / Hero banner / 제품 이미지 gallery** 시나리오 4종 재작성.
- preview-html에 별도 `.car-*` CSS 없음 — site preview/component page에서 직접 렌더(정적 HTML은 첫 슬라이드만 표시).
- dot indicator 별도 컴포넌트 없음 — 사용처 합성 가이드(`api.scrollSnapList()` + `selectedScrollSnap()` + dot button row)만 spec에 제공.
