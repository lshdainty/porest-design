# Select

> 미리 정의된 옵션 중 1개를 선택하는 form control. trigger는 Input과 같은 시각 톤(채움 + 40px 높이), 클릭 시 dropdown content가 떠올라 옵션 리스트 표시. Radix `Select` 베이스(키보드 네비/ARIA/Portal 자동).

Porest Select는 **단일 trigger spec × 5 item kinds(default/with-indicator/grouped/separator/disabled)** 매트릭스로 정의됩니다. preview `.form-select` SoT 정합 — Trigger: `surface-input` + border 1px + `radius-sm` + `body-md` + `h-10` + `padding-sm/md` + chevron 우측. Content: `surface-default` + border 1px + `radius-sm` + `shadow-md`. Input과 동일 시각 톤으로 form 안에서 자연 정렬.

## Anatomy

```
┌──────────────────────────────────────┐
│ ⓐ trigger (surface-input + h-10)     │
│   값 또는 placeholder           ⓒ ▼  │   ← ChevronDown 우측
└──────────┬───────────────────────────┘
           │ click
           ▼
┌──────────────────────────────────┐
│ ⓓ content (border + shadow-md)   │
│   ┌──────────────────────────┐   │
│   │ ⓔ label "그룹"           │   │   ← (선택) label-sm secondary
│   │ ⓕ item ✓ 선택값           │   │   ← indicator 좌측
│   │ ⓕ item   다른값           │   │
│   │ ⓖ separator              │   │
│   │ ⓕ item   ...             │   │
│   └──────────────────────────┘   │
└──────────────────────────────────┘
```

| ⓐ trigger | preview `.form-select` 그대로 — `flex h-10 w-full items-center justify-between rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary` + focus-visible ring + transition motion 토큰. |
| ⓒ chevron | `ChevronDown` 4×4 (16px) + `text-text-tertiary`. open 시 회전 없음(Radix 기본). |
| ⓓ content | `relative z-50 max-h-96 min-w-[8rem] rounded-sm border border-border-default bg-surface-default shadow-md` + animate-in/out. width는 `min-w-[var(--radix-select-trigger-width)]`로 trigger 폭 일치. |
| ⓔ label (그룹) | `py-[var(--spacing-xs)] pl-8 pr-[var(--spacing-sm)] text-label-sm font-medium text-text-secondary` — 그룹 헤더. |
| ⓕ item | `flex items-center rounded-xs py-[var(--spacing-xs)] pl-8 pr-[var(--spacing-sm)] text-body-md outline-none focus:bg-surface-input` + 선택 시 좌측 indicator(✓ Check 4×4). |
| ⓖ separator | `my-[var(--spacing-xs)] h-px bg-border-default` — 그룹 분리. |

**규칙**

- trigger는 **Input과 같은 톤** — form 안에서 input과 select가 섞일 때 정렬 일관성. `h-10` + `bg-surface-input` + `border-default` + `body-md`.
- item 좌측 `pl-8`(spacing-xl 32px)은 indicator 영역 — 선택 안 됐을 때도 동일 padding으로 정렬 유지.
- chevron 색은 `text-tertiary` — placeholder와 동일 톤(절제). 강조 아이콘 아님.

## Variants

Select는 **trigger variant 없음** — Input과 동일하게 시각 통일. 의미 분기는 상태(error/disabled)와 콘텐츠 구성(label/grouped/separator)으로.

## Sizes

`box-sizing: border-box` 기준. Input과 동일 `md` 단일 size — form 정렬을 위한 의도된 통일.

| Size | Height | Padding (Y · X) | Font (token) | Chevron | Radius |
|---|---|---|---|---|---|
| `md` *(only)* | 40px | `spacing-sm` (8) · `spacing-md` (12) | `text-body-md` | 16px | `radius-sm` (4) |

추가 size variant가 필요하면 Input과 함께 정의 — Select 단독으로 분기 금지(form 정렬 깨짐).

## States

| State | Background | Border | Text |
|---|---|---|---|
| `enabled` | `surface-input` | `border-default` | `text-primary` (값) / `text-tertiary` (placeholder) |
| `hover` | `surface-input` | `border-default` | (변화 없음 — 클릭 affordance는 chevron으로) |
| `focus-visible` | `surface-input` | `border-ring` | `text-primary` + `ring-2 ring-ring/30` |
| `open` (Radix `data-state=open`) | `surface-input` | `border-ring` | `text-primary` |
| `disabled` | `surface-input` opacity 0.5 | `border-default` | `text-primary` opacity 0.5 + `cursor-not-allowed` |
| `error` | `surface-input` | `border-error` | `text-primary` + helper 텍스트 `text-error` |

### Item state

| State | Background | Text | Indicator |
|---|---|---|---|
| `enabled` | transparent | `text-primary` | hidden |
| `focus / hover` | `surface-input` | `text-primary` | hidden |
| `selected` (data-state=checked) | transparent | `text-primary` | ✓ visible |
| `selected + focus` | `surface-input` | `text-primary` | ✓ visible |
| `disabled` | transparent | `text-primary` opacity 0.5 | hidden, `pointer-events: none` |

## Layout

**Form integration**

- form-grid 안에서 input/textarea와 같은 행에 자연 정렬 — `h-10` 동일 + `border-default` 동일.
- Label은 `[Label](label.md)` 컴포넌트와 페어 — `flex flex-col gap-xs` + `Label` 위 + `Select` 아래.
- helper text는 아래 `text-caption text-tertiary`, error는 `text-error` + border-error.

**Grouped options**

- 카테고리별로 묶을 때 `SelectGroup` + `SelectLabel`(헤더) 사용.
- 그룹 사이에 `SelectSeparator` — 시각적 분리.

**Long list (max-height + scroll)**

- content `max-h-96` (384px) 초과 시 scroll. `ScrollUpButton` / `ScrollDownButton` 자동 노출.
- 5+ 옵션이고 검색이 필요하면 Combobox(Command + Popover) 사용.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Trigger click | content open / close 토글. |
| Item click | 값 선택 + content close + trigger focus 복귀. |
| Outside click | content close. |
| `Escape` | content close, trigger focus 복귀. |
| `ArrowDown` / `ArrowUp` (trigger) | content open + 다음/이전 item focus. |
| `ArrowDown` / `ArrowUp` (open) | item 간 focus 이동. |
| `Enter` / `Space` (open) | focused item 선택. |
| `Home` / `End` | 첫/마지막 item focus. |
| 알파벳 키 | 해당 글자로 시작하는 item으로 jump (Radix typeahead). |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text-primary × surface-input) | 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (text-tertiary placeholder × surface-input) | 4.6:1 ✓ (AA 본문 기준 충족) |
| **WCAG 1.4.11** Non-text contrast (border-default × bg-page) | 1.4:1 — 단독 약함이나 `bg-surface-input` 채움이 form field 식별 보강. focus 시 `border-ring` 3:1+ ✓ |
| **WCAG 2.4.7** Focus Visible | trigger `focus-visible:border-ring + ring-2 ring-ring/30`. item `focus:bg-surface-input`. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | trigger 40px — 미달(⚠). item 32px — 미달(⚠). 모바일 우선 화면이면 trigger `h-12`(lg) 사용 권장(별도 size 정의 필요). |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | trigger 40 / item 32 ✓ |
| **ARIA** | Radix가 `role="combobox"`(trigger) + `aria-expanded` + `aria-controls` + `role="listbox"`(content) + `role="option"`(item) + `aria-selected` 자동. label과 trigger는 `<label htmlFor>` 또는 `aria-labelledby`로 연결. |

## Do / Don't

### ✅ Do

- Input과 같은 form 안에서 시각 톤 일치 — `h-10` + `bg-surface-input` + `border-default`.
- 옵션이 5–10개일 때 적정. 그 이상은 Combobox(검색 가능).
- placeholder는 `SelectValue placeholder="선택하세요"` — 사용자에게 작업 hint.
- 그룹화가 의미 있을 때만 `SelectGroup`/`SelectLabel` — 단일 그룹 9개 이하는 그냥 평면 리스트.

### ❌ Don't

- 옵션 2–3개는 RadioGroup 또는 Tabs로 — Select는 인지 비용↑.
- 옵션 20+ 검색 없이 Select 사용 — Combobox로.
- trigger 안에 또 다른 인터랙티브 element (button 등) — semantic 충돌.
- 다른 form field 옆에서 임의 size 변경 — 정렬 깨짐.

## Migration notes

- 기존 shadcn `select.tsx`는 `bg-transparent` + Tailwind 기본 `px-3 py-2` — preview `.form-select` SoT(`bg-surface-input` + token padding + `font-sans`)로 정정.
- transition은 `transition-colors` → `transition-[color,background-color,border-color,box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` 토큰 직접 인용으로 정정.
- item `py-1.5` → `py-[var(--spacing-xs)]` 토큰 인용.
- content radius `rounded-md` → `rounded-sm`(Input과 동일)로 정정 — form field에서 가벼운 모서리.
- preview `.form-select` `line-height: 1.6` 명시 — input과 동일하게 한글 본문 가독성 우선.
