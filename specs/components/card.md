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

| ⓐ container | `background:var(--color-surface-default); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm);` **border 없음** — shadow만으로 elevation. |
| ⓑ header | `display:flex; flex-direction:column; gap:var(--spacing-xs); padding:var(--spacing-xl);` 헤더 영역. |
| ⓒ title | `text-title-md` (18/600/1.4). `leading-none tracking-tight`. |
| ⓓ description | `text-body-sm` (14/400/1.5). `var(--color-text-secondary)`. 선택. |
| ⓔ content | header와 같은 좌우 padding, top padding은 0(헤더와 자연 연결). 자유 콘텐츠. |
| ⓕ footer | content와 같은 좌우 padding, top padding 0. 일반적으로 `justify-end` + button 그룹. |

**규칙**

- 카드 내부 모든 영역은 좌우 `var(--spacing-xl)`(24) padding으로 통일된 시각 그리드 유지.
- Header/Content/Footer 사이는 padding-top 0 + 자연스러운 콘텐츠 흐름으로 분리(불필요한 줄/구분선 회피).
- Card 자체가 button/link로 동작 시 hover 표현은 `hover:shadow-md` 또는 `hover:translate-y-[-1px]` 등으로 명확히.

## Sizes

Card는 **size variant 없음** — 사용처에서 `max-width` className으로 폭만 조정. padding/radius/shadow는 단일 spec.

| 항목 | 값 | 토큰 |
|---|---|---|
| Radius | 12px | `var(--radius-lg)` |
| Padding (모든 영역) | 24px | `var(--spacing-xl)` |
| Section gap (header 내 title-description) | 4px | `var(--spacing-xs)` |
| Background | `surface-default` (#FFFFFF / dark #242938) | `bg-surface-default` |
| Shadow | `shadow-sm` | `var(--shadow-sm)` |
| Hover (선택) | `shadow-md` | `hover:shadow-md` |
| Border | none | (없음) |

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

- Card 안 모든 영역의 좌우 padding을 통일(`spacing-xl` 24) — 시각 그리드 유지.
- 정보 카드는 정적(border 없음 + shadow-sm)으로 두고, 클릭 가능한 카드만 hover state 추가.
- 큰 숫자(KPI)는 `display-md`/`display-lg` 토큰 사용 — title 토큰 대신.
- 한 카드 안 액션은 우측 정렬(`flex justify-end gap-[var(--spacing-sm)]`).

### ❌ Don't

- Card 안에 또 다른 Card nested — 시각 위계 무너짐. 분리된 영역은 `Separator` 또는 spacing으로.
- Card에 border + shadow + outline 동시 — elevation 표현 과잉. shadow-only가 Toss 톤.
- 너무 다양한 padding 혼용 — `spacing-xl` 통일.
- Card 안에 너무 많은 정보 — 7±2 규칙. 넘으면 분리.

## Migration notes

- 기존 `card.tsx`는 `rounded-md`(8) + `border border-border-default` 사용했으나 preview `.review-summary`/`.review-item` SoT에 맞춰 `rounded-lg`(12) + **border 제거**(shadow-only elevation)로 정정. shadow는 그대로 `shadow-sm`.
- `p-6 gap-1.5` (Tailwind 기본 spacing 24/6) → `p-[var(--spacing-xl)] gap-[var(--spacing-xs)]` 디자인 토큰 직접 인용.
