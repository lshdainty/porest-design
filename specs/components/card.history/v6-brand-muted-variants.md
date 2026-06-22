# Card

> 관련 정보를 시각적으로 묶어 한 단위로 보여주는 surface 컨테이너. 메모/할일/리스트 항목/통계 카드/액션 그룹 등 다양한 도메인 패턴의 기본 박스.

Porest Card는 **단일 spec**으로 정의됩니다. 외곽선 없이 `shadow-sm`만으로 elevation을 표현(preview `.review-summary` / `.review-item` SoT)하여 절제된 Toss 톤을 유지. 라운드는 `radius-lg`(12px)로 여유 있게.

## Anatomy

```
┌────────────────────────────────────────┐
│ ⓐ container (surface-default + shadow) │
│                                        │
│ ⓑ header (title + description)         │
│  ┌──────────────────────────┐          │
│  │ ⓒ title  (title-md)      │          │
│  │ ⓓ description (body-sm)  │          │
│  └──────────────────────────┘          │
│                                        │
│ ⓔ content (자유 영역)                  │
│                                        │
│ ⓕ footer (actions, 우측 정렬)          │
│                       [Cancel] [Save]  │
└────────────────────────────────────────┘
```

| ⓐ container | variant 별 분기 — `shadow`(default): `background:surface-default; border-radius:radius-lg; box-shadow:shadow-sm;` border 없음, shadow-only elevation. `bordered`: `background:surface-default; border:1px solid border-subtle; border-radius:radius-lg;` shadow 없음, border-only 식별. |
| ⓑ header | `display:flex; flex-direction:column; gap:var(--spacing-xs); padding:var(--spacing-lg); @media(min-width:768px) padding:var(--spacing-xl);` 헤더 영역 (mobile lg(16) → desktop md+ xl(24)). |
| ⓒ title | `text-title-md` (18/600/1.4). `leading-none tracking-tight`. |
| ⓓ description | `text-body-sm` (14/400/1.5). `var(--color-text-secondary)`. 선택. |
| ⓔ content | 기본 `p-lg md:p-xl` (mobile 16 / desktop md+ 24) 전 방향. CardHeader 다음(`:not(:first-child)`)일 때만 `pt-0` 으로 헤더와 자연 연결. standalone CardContent (Card 의 첫 자식, header 없음) 일 땐 모든 방향 padding 유지 (review-summary 단독 카드 톤). 자유 콘텐츠. |
| ⓕ footer | content 와 동일 — 기본 `p-lg md:p-xl`, `:not(:first-child)` 일 때만 `pt-0`. 일반적으로 `justify-end` + button 그룹. |

**규칙**

- 카드 내부 모든 영역은 좌우 padding으로 통일된 시각 그리드 유지 — **mobile `var(--spacing-lg)`(16) / desktop md+ `var(--spacing-xl)`(24)**. mobile small viewport 에서 카드 폭 대비 padding 비율 (Toss 톤 dense layout) 보장, desktop 에선 spec 의 24 breath.
- Header/Content/Footer 사이는 padding-top 0 (`[&:not(:first-child)]:pt-0` 셀렉터로 first-child 가 아닐 때만) + 자연스러운 콘텐츠 흐름으로 분리(불필요한 줄/구분선 회피).
- Card 자체가 button/link로 동작 시 hover 표현은 `hover:shadow-md` 또는 `hover:translate-y-[-1px]` 등으로 명확히.

## Variants

Card 는 elevation 표현 방식에 따라 **2 variant** — size variant 는 없음.

| Variant | Background | Border | Shadow | 사용처 톤 |
|---|---|---|---|---|
| **shadow** (default) | `surface-default` | none | `shadow-sm` | 정보 카드 (dashboard widget, list item, detail panel). spec 기본 — Toss 절제 톤. |
| **bordered** | `surface-default` | 1px `border-subtle` | none | dense info / secondary 강조 (선택 기간 카드, hint box, inline summary). shadow 없이 1px line 으로 식별 — 카드 안 카드 (nested) 시각 위계 회피 + chart dense card 가독성. |

mode/state matrix 는 variant 무관 (background `surface-default` 동일). hover/focus 등 interactive 동작은 두 variant 모두 동일.

## Sizes

Card 는 **size variant 없음** — 사용처에서 `max-width` className 으로 폭만 조정. padding/radius/typography 는 단일 spec.

| 항목 | 값 | 토큰 |
|---|---|---|
| Radius | 12px | `var(--radius-lg)` |
| Padding (모든 영역, mobile < 768px) | 16px | `var(--spacing-lg)` |
| Padding (모든 영역, desktop ≥ 768px) | 24px | `var(--spacing-xl)` |
| Section gap (header 내 title-description) | 4px | `var(--spacing-xs)` |
| Background | `surface-default` (#FFFFFF / dark #242938) | `bg-surface-default` |
| Shadow (variant=shadow) | `shadow-sm` | `var(--shadow-sm)` |
| Border (variant=bordered) | 1px `border-subtle` | `border-border-subtle` |
| Hover (선택, shadow variant) | `shadow-md` | `hover:shadow-md` |

## States

| State | Background | Shadow |
|---|---|---|
| default | `surface-default` | `shadow-sm` |
| hover (interactive Card만) | `surface-default` | `shadow-md` |
| disabled (interactive Card만) | `surface-default` (opacity 0.5) | `shadow-sm` |
| focus-visible (interactive Card만) | 위 상태 유지 | + `ring-2 ring-ring ring-offset-2` |

## Layout

**Single card**

- `max-width` 사용처에서 결정 (예: `max-w-md` 28rem). full-width는 `w-full`.
- Header → Content → Footer 순서. 모두 옵션(필요한 영역만 사용).

**Card grid (여러 카드)**

- `grid grid-cols-N gap-[var(--spacing-md)]` (12px gap) 또는 auto-fill.
- 리스트 형태는 `flex flex-col gap-[var(--spacing-md)]`.

**Stat card (KPI / Summary)**

- Header에 큰 숫자 + 작은 label. preview `.review-summary`처럼 sticky 사이드바로도 활용.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click (interactive) | 카드 전체가 button 또는 `<a>` 역할 — `role="button"` 또는 native element 사용. |
| Hover | static card는 변화 없음. interactive card는 `shadow-md`로 elevation 강조. |
| Keyboard `Tab` | interactive card만 focusable. `focus-visible` 시 ring. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast | content text `text-primary` × `surface-default` = 14:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast | border 없음 — shadow + `surface-default` × `bg-page` 대비로 카드 식별. `bg-page`(#F7F8FA)에서 카드는 `surface-default`(#FFFFFF)로 약 1.05:1 — 시각 식별 약함이라 `shadow-sm`이 보강 역할. 다크 모드는 카드 surface가 더 밝아 대비 충분. |
| **WCAG 2.4.7** Focus Visible | interactive Card에 `focus-visible:ring-2 ring-ring ring-offset-2` |
| **ARIA** | static card는 ARIA 불필요 (그룹 시맨틱은 `<article>` 또는 `<section>`). interactive card는 `<button>` 또는 `<a>` 권장. |

## Do / Don't

### ✅ Do

- Card 안 모든 영역의 좌우 padding을 통일 — mobile `spacing-lg`(16) / desktop md+ `spacing-xl`(24). 시각 그리드 유지.
- 정보 카드는 정적(border 없음 + shadow-sm)으로 두고, 클릭 가능한 카드만 hover state 추가.
- 큰 숫자(KPI)는 `display-md`/`display-lg` 토큰 사용 — title 토큰 대신.
- 한 카드 안 액션은 우측 정렬(`flex justify-end gap-[var(--spacing-sm)]`).

### ❌ Don't

- Card 안에 또 다른 Card nested — 시각 위계 무너짐. 분리된 영역은 `Separator` 또는 spacing으로.
- Card에 border + shadow + outline 동시 — elevation 표현 과잉. shadow-only가 Toss 톤.
- 너무 다양한 padding 혼용 — `spacing-lg`/`spacing-xl` mobile/desktop 분기로 통일.
- Card 안에 너무 많은 정보 — 7±2 규칙. 넘으면 분리.

## Migration notes

- 기존 `card.tsx`는 `rounded-md`(8) + `border border-border-default` 사용했으나 preview `.review-summary`/`.review-item` SoT에 맞춰 `rounded-lg`(12) + **border 제거**(shadow-only elevation)로 정정. shadow는 그대로 `shadow-sm`.
- `p-6 gap-1.5` (Tailwind 기본 spacing 24/6) → `p-[var(--spacing-lg)] md:p-[var(--spacing-xl)] gap-[var(--spacing-xs)]` 디자인 토큰 직접 인용 + mobile/desktop 분기.
- **box-shadow는 Tailwind utility(`shadow-sm`) 대신 inline `style={{ boxShadow: "var(--shadow-sm)" }}` 사용** — Tailwind v4 shadow utility는 내부적으로 box-shadow를 `--tw-shadow-*` 변수로 분해 처리하기 때문에, 다크 모드 CSS 변수 override(`[data-theme="dark"] { --shadow-sm: var(--shadow-sm-dark) }`)가 우회되어 다크 모드 inset top highlight + 강화된 검정 그림자가 적용되지 않는 문제 fix. preview `.review-*` SoT(`box-shadow: var(--shadow-sm)` 직접 인용)와 다크 모드 시각 정합 보장. 다른 컴포넌트(Dialog/Drawer/Popover 등)는 각자 spec에 따라 동일 패턴 적용 검토 필요.
- **v3: CardContent / CardFooter 의 padding 처리 정정** — 기존 spec 은 `p-xl pt-0` 으로 모든 경우 pt-0 강제했으나, standalone Card (CardHeader 없이 CardContent 만, 예: `.review-summary` 톤 단독 카드) 일 때 top padding 이 빠져 시각 깨지는 문제 발견. desk-front 실제 사용 패턴 → spec 반영 (역방향 sync). 새 정의: base 는 `p-xl` 전 방향, `[&:not(:first-child)]:pt-0` 셀렉터로 CardHeader / CardContent 다음에 올 때만 pt-0 적용. first-child (standalone) 일 땐 모든 방향 padding 유지.
- **v4: Card padding mobile/desktop 분기 도입** — 단일 `p-xl`(24) 모든 viewport 적용 시 mobile small viewport(~400px)에서 page-edge padding(20) + card padding(24) 합치면 좌우 ~22% 가 padding 으로 시각적으로 비좁음. Toss 톤 mobile-first 정합 위해 mobile `p-lg`(16) / desktop md+(≥768px) `p-xl`(24) 로 responsive 분기. Tailwind v4 `md:p-[var(--spacing-xl)]` syntax. App(Flutter) 은 mobile-only 환경이라 `PSpace.lg`(16) 일괄 적용. preview-html 의 `.review-summary` 도 `@media (max-width: 900px)` 분기에 `padding: var(--spacing-lg)` 추가. desk-front 실사용처 (`dashboard`/`asset`/`stats` page card) 시각 검증 후 결정.
- **v5: variant 도입 (shadow / bordered)** — 기존 spec 은 shadow-only elevation 의 단일 variant 였으나, dense info card (chart card, 선택 기간 hint, inline summary) 에서 shadow + 카드 nested 가 시각 위계를 무너뜨리는 사례 발생. App(Flutter) `PCard` 는 이미 `bordered` variant 를 자체 확장으로 가지고 있었고 (App stats `_Card`, `_SelectedRangeCard` 등 활용), Web 의 `<Card>` 도 spec 단일 variant 제약 때문에 raw `<button> + inline style` 로 bordered 시각을 모방하던 패턴 발견 (stats `SelectedRangeCard`). spec 끌어올림 — 2 variant 공식 도입 (shadow default + bordered). cva variant + className 토큰 변환. v4 의 padding/radius/typography 는 모두 그대로 — variant 는 elevation 표현 방식만 분기.
