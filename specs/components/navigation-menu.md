# Navigation Menu

> 데스크탑 헤더의 메인 네비게이션 — 카테고리 trigger + hover/focus 시 풍부한 viewport 콘텐츠(grid 카드 layout, sub-link) 노출. shadcn `NavigationMenu` 베이스(Radix). [`Dropdown Menu`](dropdown-menu.md)가 짧은 액션 list라면 NavigationMenu는 **카테고리 hub** — viewport에 콘텐츠 카드(타이틀 + 설명) + 프로모션 panel 등 마케팅성 메뉴.

Porest Navigation Menu는 **단일 spec × 3 trigger patterns(text-only / icon-only / text + icon) × viewport content 자유** 매트릭스로 정의됩니다. Trigger는 `h-10` + `px-lg py-sm` + `body-md` + medium + chevron 16. Viewport는 `surface-default` + border 1px + `radius-md` + `shadow-lg` inline + min-width 사용처 결정. Trigger의 콘텐츠 패턴(글씨/아이콘/혼합)으로 시각 분기, [`Button`](button.md) variant와 동일한 hover/focus state.

## Anatomy

```
header bar:
┌─────────────────────────────────────────────────────────┐
│ Logo   ⓑ 시작하기▼  ⓑ 컴포넌트▼  ⓒ 가격   ⓓ 🔍  ⓔ ⬇ 다운로드│
└────────┬────────────────────────────────────────────────┘
         │ hover/click
         ▼
┌─────────────────────────────────────┐
│ ⓕ Viewport (radius-md + shadow-lg)   │
│  ┌─────────┬───────────────────────┐ │
│  │ Hero    │ 소개 — 기본 가이드      │ │
│  │ panel   │ 설치 — npm install     │ │
│  │ (gradient│ 타이포 — Pretendard    │ │
│  │  primary)│                      │ │
│  └─────────┴───────────────────────┘ │
└─────────────────────────────────────┘
                ▲
                ⓖ Indicator (8×8 rotate-45)
```

| ⓐ NavigationMenu (Root) | `relative z-10 flex max-w-max flex-1 items-center justify-center`. 헤더 안 또는 단독 nav. |
| ⓑ Trigger (text + chevron) | `<button>` (Radix `Trigger`) — `inline-flex h-10 w-max items-center justify-center rounded-sm bg-surface-default px-[var(--spacing-lg)] py-[var(--spacing-sm)] text-body-md font-medium text-text-primary transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] hover:bg-surface-input focus-visible:bg-surface-input focus-visible:outline-none data-[state=open]:bg-surface-input/50` + `ChevronDown` 12×12 + `data-[state=open]:rotate-180`. |
| ⓒ Link (text-only, no chevron) | `<a>` (Radix `Link`) — `inline-flex h-10 items-center justify-center rounded-sm px-[var(--spacing-lg)] text-body-md font-medium text-text-primary hover:bg-surface-input transition-colors`. Viewport 없는 직접 링크. |
| ⓓ Link (icon-only) | `<a>` — `inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-surface-input` + lucide icon 18 + `<span className="sr-only">{label}</span>`. 검색/알림/사용자 등 universal action. |
| ⓔ Link (text + icon) | `<a>` — `inline-flex h-10 items-center gap-[var(--spacing-xs)] rounded-sm px-[var(--spacing-md)] text-body-md font-medium` + lucide icon 16 + 텍스트. 강조 액션("다운로드", "팀 +1") 또는 외부 링크(`ExternalLink`). |
| ⓕ NavigationMenuContent / Viewport | `relative mt-[var(--spacing-xs)] h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border-default bg-surface-default text-text-primary` + `style={{ boxShadow: "var(--shadow-lg)" }}` inline. min-width는 사용처 결정. |
| ⓖ NavigationMenuIndicator | `top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden` + 자식 `h-2 w-2 rotate-45 rounded-tl-sm bg-border-default`. Trigger 아래 8×8 화살표 — 활성 trigger 위치 표시. |
| ⓗ NavigationMenuLink (Viewport 내) | `<a>` — `flex flex-col gap-[var(--spacing-xs)] p-[var(--spacing-md)] rounded-sm hover:bg-surface-input transition-colors` + title(`text-title-sm font-medium`) + description(`text-body-sm text-text-secondary`). 카드 형식. |

**규칙**

- Trigger의 콘텐츠 패턴 3종 — 같은 nav 안에서 mix 가능. 예: `[제품▼] [회사▼] [가격] [🔍] [⬇ 다운로드]` — 카테고리(text+chevron) + 직접 링크(text) + universal action(icon) + 강조(text+icon) 자연.
- chevron은 viewport 있는 trigger에만 — `text-only`(직접 링크) / `icon-only` / `text+icon` 트리거는 chevron 없음.
- **box-shadow는 inline style** (`boxShadow: var(--shadow-lg)`) — [`Dialog`](dialog.md) / [`Popover`](popover.md)와 동일 다크 모드 fix 패턴.
- Indicator(8×8 화살표)는 viewport와 trigger 시각 연결 — 활성 trigger 위치 표시.
- Viewport min-width 사용처 결정 — grid 카드 layout이면 `md:w-[400px] lg:w-[500px]`, simple list면 `min-w-[200px]`.
- gap 토큰 — list gap은 `var(--spacing-xs)`(4), card padding은 `var(--spacing-md)`(12).

## Variants (Trigger pattern)

| Variant | 시각 | 사용처 |
|---|---|---|
| **`text + chevron`** *(default Trigger)* | `body-md` + medium + ChevronDown 12 | 카테고리 hub — viewport에 sub-content 노출. "제품" / "회사" / "리소스". |
| **`text-only` (Link)** | `body-md` + medium, chevron 없음 | viewport 없는 직접 링크. "가격" / "고객사" / "블로그". |
| **`icon-only` (Link)** | 40×40 박스 + 18×18 icon + `sr-only` label | universal action — 검색(Search) / 알림(Bell) / 사용자(User). 일반적으로 nav 우측. |
| **`text + icon` (Link)** | `body-md` + medium + icon 16 + `gap-xs` | 강조 액션 — 다운로드(Download) / 외부 링크(ExternalLink) / "팀 +1"(Plus). 시각 강조. |

## Sizes

Navigation Menu는 **size variant 없음** — Trigger height 고정 `h-10` (40px). 큰 화면 권장(데스크탑 친화), 모바일은 [`Sheet`](sheet.md) `side="left"` 햄버거 nav로 fallback.

| 항목 | 값 | 토큰 |
|---|---|---|
| Trigger height | 40px | `h-10` |
| Trigger padding (text) | 8 × 16 | `px-[var(--spacing-lg)] py-[var(--spacing-sm)]` |
| Trigger padding (icon-only) | 40×40 정사각 | `h-10 w-10` (Button icon size 정합) |
| Trigger padding (text + icon) | 16 가변 | `px-[var(--spacing-md)] gap-[var(--spacing-xs)]` |
| Trigger font | 15 / 500 | `text-body-md font-medium` |
| Trigger radius | 4px | `rounded-sm` |
| Trigger color | `text-primary` | `text-text-primary` |
| List gap | 4px | `space-x-[var(--spacing-xs)]` (또는 flex gap) |
| Chevron size | 12×12 | `h-3 w-3` |
| Chevron rotation (open) | 180° | `data-[state=open]:rotate-180` |
| Icon size (icon-only) | 18×18 | `h-[18px] w-[18px]` 또는 lucide `size={18}` |
| Icon size (text + icon) | 16×16 | `h-4 w-4` |
| Viewport margin-top | 4px | `mt-[var(--spacing-xs)]` |
| Viewport radius | 8px | `rounded-md` |
| Viewport border | 1px | `border border-border-default` |
| Viewport bg | `surface-default` | `bg-surface-default` |
| Viewport shadow | shadow-lg (inline) | `style={{ boxShadow: "var(--shadow-lg)" }}` |
| Viewport padding | 16px (사용처) | `p-[var(--spacing-lg)]` 또는 사용처 결정 |
| Viewport min-width | 사용처 결정 | `md:w-[400px]` 등 |
| Card link padding | 12px | `p-[var(--spacing-md)]` |
| Card link gap (title↔desc) | 4px | `gap-[var(--spacing-xs)]` |
| Card title font | 16 / 500 | `text-title-sm font-medium` |
| Card desc font | 14 / 400 / secondary | `text-body-sm text-text-secondary` |
| Indicator size | 8×8 (rotate 45) | `h-2 w-2 rotate-45 rounded-tl-sm bg-border-default` |
| Transition | colors | `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |
| Chevron transition | transform | `duration-[var(--motion-duration-base)]` |

## States

### Trigger / Link

| State | Background | Text |
|---|---|---|
| `default` | `surface-default` (또는 transparent) | `text-primary` |
| `hover` | `surface-input` | `text-primary` |
| `focus-visible` | `surface-input` + `ring-2 ring-ring ring-offset-2` | `text-primary` |
| `data-state=open` (Trigger) | `surface-input/50` | `text-primary` |
| `data-active` (현재 페이지) | `surface-input/50` | `text-primary` |
| `disabled` | transparent | `text-primary` opacity 0.5 + `cursor-not-allowed` |

### Card link (Viewport 내)

| State | Background | 시각 |
|---|---|---|
| `default` | transparent | title primary + desc secondary |
| `hover` | `surface-input` | (변화 없음) |
| `focus-visible` | `surface-input` + `ring-2 ring-ring` | — |

## Layout (한국 도메인 패턴)

**Porest 헤더 nav (mix 패턴 — 사용자 요청)**

```
[로고] [제품 ▼] [회사 ▼] [가격] [고객사] | [🔍] [🔔] [⬇ 다운로드]
```

- 좌측: 카테고리(text + chevron) — 제품/회사/viewport에 sub-link 카드
- 중앙: 직접 링크(text-only) — 가격/고객사
- 우측: universal action(icon-only) + 강조(text + icon) — 검색/알림/다운로드

**HR 헤더 nav**

- 카테고리(text + chevron): "조직 / 결재 / 근태" — viewport에 sub-page
- 직접 링크: "통계"
- icon-only: 알림(Bell) / 사용자(User dropdown trigger)

**Desk 헤더 nav**

- 직접 링크(text-only) 위주: "메모 / 할일 / 가계부 / 캘린더"
- icon-only: 검색(Search) / 빠른 추가(Plus) / 사용자(User)

**Marketing landing**

- 카테고리 hub: "제품 ▼" → Hero panel(gradient + Porest 소개) + 우측 sub-link grid (소개/설치/타이포그래피/...)
- shadcn navigation-menu의 시그니처 패턴.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Trigger click | viewport open. `data-state="open"` + chevron rotate-180. |
| Trigger hover (open된 메뉴 안) | 다른 trigger hover 시 viewport 즉시 전환 — Radix native. |
| `Escape` | viewport close + focus Trigger 복귀. |
| `ArrowLeft/Right` (Trigger focus) | 이전/다음 Trigger focus. |
| `ArrowDown` (Trigger focus, viewport closed) | viewport open. |
| `Tab` (viewport open) | viewport 안 focusable element 사이 이동. |
| Link click | 페이지 이동 — 일반 `<a>` 시맨틱. |
| icon-only Link hover | `bg-surface-input`. tooltip은 사용처에서 [`Tooltip`](tooltip.md) wrap. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (Trigger text × bg) | `text-primary` 14:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (Viewport border × bg-page) | `border-default` 1.4:1 — `shadow-lg` elevation 보강 ✓ |
| **WCAG 2.1.1** Keyboard | `Tab`/`ArrowLeft/Right`/`Escape` 모두 가능 ✓ |
| **WCAG 2.4.4** Link Purpose | text-only Link는 라벨 그대로. icon-only는 `<span className="sr-only">{label}</span>` 필수(검색/알림/사용자 라벨). |
| **WCAG 2.4.7** Focus Visible | `focus-visible:bg-surface-input` + `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | Trigger 40 — 미달(⚠). 모바일 친화 화면이면 [`Sheet`](sheet.md) nav fallback. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 40 ✓ |
| **ARIA** | Radix가 `role="navigation"` + `aria-expanded` (Trigger) + `aria-controls` (Viewport) 자동. icon-only는 `aria-label` 또는 `sr-only` 텍스트로 보조. |

## Do / Don't

### ✅ Do

- **데스크탑 헤더 메인 nav** — 풍부한 카테고리 hub + universal action.
- **Trigger 패턴 mix** — 카테고리(text+chevron) + 직접 링크(text-only) + universal(icon-only) + 강조(text+icon) 자유 조합.
- **icon-only는 `sr-only` 라벨 동반** — 검색/알림/사용자 등 의미 명시.
- **Viewport 카드 layout — grid + hero panel** — shadcn navigation-menu의 시그니처. 마케팅성 nav에 적합.
- **Indicator 화살표 활용** — 활성 trigger 위치 시각화.

### ❌ Don't

- **모바일에 NavigationMenu** — touch target 40 미달 + 좁은 화면 viewport 부적합. [`Sheet`](sheet.md) `side="left"` 햄버거 nav로 fallback.
- **Trigger 긴 라벨** — 8자+ 시각 무너짐. 짧은 카테고리/액션 라벨만.
- **icon-only 라벨 누락** — screen reader 접근 불가. `sr-only` 필수.
- **Viewport 안 복잡한 form** — nav는 navigation hub, form은 [`Dialog`](dialog.md) / [`Popover`](popover.md).
- **Trigger 5+ mix 패턴** — 시각 폭발. 패턴 3종 최대 권장.

## Migration notes

- 기존 `navigation-menu.tsx` 정정:
  - Trigger `px-4 py-2` (Tailwind 기본 16/8) → `px-[var(--spacing-lg)] py-[var(--spacing-sm)]` 토큰 직접 인용.
  - Trigger `text-title-sm` (16/500) → `text-body-md font-medium` (15/500) — nav trigger는 본문급 가독성 우선, title-sm은 큰 헤딩용.
  - `transition-colors` → `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` motion 토큰 추가.
  - ChevronDown `duration-200` → `duration-[var(--motion-duration-base)]` 토큰 인용.
  - Viewport `mt-1.5` → `mt-[var(--spacing-xs)]` (4 토큰).
  - Viewport `shadow-lg` Tailwind → `style={{ boxShadow: "var(--shadow-lg)" }}` inline (다크모드 fix 일관 패턴, Popover/Dialog 등과 동일).
  - Trigger `focus:` → `focus-visible:` (키보드 only) — WCAG 2.4.7.
- examples 한국 도메인 4종 재작성 — Default Marketing(현재 grid + hero panel) + **Text-only** Header(가격/고객사/블로그) + **Text + Icon** 강조(다운로드/외부링크) + **Icon-only** Action(검색/알림/사용자).
- preview-html에 `.nav-*` selector 없음 — site SoT.
