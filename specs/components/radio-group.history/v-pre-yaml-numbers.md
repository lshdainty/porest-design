# Radio Group

> 2개 이상 mutually exclusive 옵션 중 1개를 선택하는 form 컨트롤. 결제 방법, 배송 옵션, 보고서 형식처럼 **form submit이 필요한 단일 선택**에 사용. 즉시 효과는 [`ToggleGroup`](toggle-group.md)(`type="single"`), 옵션 5+는 [`Select`](select.md). Radix `RadioGroup` 베이스.

Porest RadioGroup은 **단일 spec × 5 states** 매트릭스로 정의됩니다. 원형 18×18 indicator + 가운데 채움 dot 16×16. unchecked: `border-strong`(1px). checked: `border-primary` + 채움 dot `primary`. group은 `grid gap-sm` flex column. label은 [`Label`](label.md) 우측 페어로 — `flex items-center gap-md` 패턴.

## Anatomy

```
[Group]                                      ← role="radiogroup" + aria-labelledby
 Label "결제 방법"
 ┌─────────────────────────────────────────────┐
 │ ⓐ item (○ 18×18)  ⓑ label "신용카드"          │   ← gap-md
 │ ⓐ item (● 18×18)  ⓑ label "계좌 이체" (checked)│   ← 가운데 dot 16×16 채움
 │ ⓐ item (○ 18×18)  ⓑ label "휴대폰 결제"        │
 └─────────────────────────────────────────────┘
        gap-sm (8px vertical between items)
```

| ⓐ item | `aspect-square h-[18px] w-[18px] rounded-full border border-border-strong text-primary` + checked 시 `border-primary` + 가운데 dot. |
| ⓑ indicator (dot, checked only) | `h-4 w-4 fill-primary text-primary` — 16×16 채움 원. item 18 안에 inset(1px gap 각 측). |
| ⓒ label (외부) | [`Label`](label.md) — `label-md` (14/500). `htmlFor`로 item id 연결. |
| ⓓ focus ring | `focus-visible:ring-2 ring-ring ring-offset-2` |

**규칙**

- item 18px + indicator 16px — indicator가 거의 item을 채움(1px gap 양쪽). 시각 위계 명확.
- `border-strong` 1px (unchecked) → `border-primary` (checked) — 외곽선 색 변화 + 채움 dot 등장.
- label은 item과 페어로 클릭 가능 (`<Label htmlFor={item.id}>`) — hit area 확장.

## Variants

RadioGroup은 **variant 없음** — form 안 단일 선택 시각 통일이 인지 비용↓. 의미 분기(positive / destructive)는 없음(라디오는 의미 중립).

## Sizes

RadioGroup은 **size variant 없음** — 18×18 단일 spec. 사용처에서 변경 시 indicator dot도 비례 조정 필요(권장 안 함).

| 항목 | 값 | 토큰 |
|---|---|---|
| Item size | 18×18 | `h-[18px] w-[18px]` |
| Item radius | full | `rounded-full` |
| Item border (unchecked) | 1px `border-strong` | `border border-border-strong` |
| Item border (checked) | 1px `primary` | `border-primary` |
| Indicator dot size | 16×16 | `h-4 w-4` |
| Indicator dot fill | `primary` | `fill-primary text-primary` |
| Group gap | 8px (vertical) | `gap-[var(--spacing-sm)]` |
| Row gap (item ↔ label) | 12px | `gap-[var(--spacing-md)]` (사용처에서 wrap 시) |
| Transition | color · bg · border | `duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |

## States

| State | Border | Indicator | Cursor |
|---|---|---|---|
| `unchecked` | `border-strong` 1px | hidden | pointer |
| `unchecked + hover` | `border-strong` 1px | hidden | pointer |
| `unchecked + focus-visible` | `border-strong` 1px | hidden | pointer + `ring-2 ring-ring ring-offset-2` |
| `checked` | `border-primary` 1px | visible (dot 16×16 `primary`) | pointer |
| `checked + focus-visible` | `border-primary` 1px | visible | + `ring-2 ring-ring ring-offset-2` |
| `disabled` | (동일) opacity 0.5 | (동일) | `not-allowed` |

Group `disabled` 시 모든 item 비활성. item 개별 `disabled`로 일부만 비활성 가능.

## Layout

**Vertical stack (default)**

- `grid gap-[var(--spacing-sm)]` — 수직 8px 간격. label은 item 우측에 `flex items-center gap-[var(--spacing-md)]`.
- form-grid 안에서 grid-column full-width 차지 권장(`grid-column: 1 / -1`) — 옵션이 길 때 wrap 회피.

**Horizontal layout (옵션이 짧을 때만)**

- "남 / 여" 같은 2개 짧은 옵션은 horizontal — `flex gap-[var(--spacing-lg)]` (16) 또는 `gap-[var(--spacing-xl)]` (24).
- 3개 이상은 vertical stack 권장 — 한국어 옵션은 영문보다 길어 가로 wrap 자주 발생.

**With description (옵션마다 부가 설명)**

- label 아래 `caption` `text-secondary` 보조 설명 — `flex flex-col gap-[var(--spacing-xs)]` (label · description).
- item과 (label + description) 묶음 사이 `gap-md` — item top과 label 첫 줄 baseline 정렬.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Item click | 해당 item checked + 다른 item 자동 unchecked. group value 변경. |
| Label click | 연결된 item checked (`<Label htmlFor>` 또는 wrap pattern). |
| `ArrowDown` / `ArrowRight` | 다음 item focus + checked (Radix roving tabindex). |
| `ArrowUp` / `ArrowLeft` | 이전 item focus + checked. |
| `Tab` | group 진입/나가기. 내부 item 간은 Arrow keys. |
| `Space` | focused item checked. |
| Disabled (group) | 모든 item 비활성. |
| Disabled (item) | 해당 item만 비활성. |

`Enter`로 toggle 안 함 — form submit과 충돌 회피 (Switch와 동일 원리).

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (border-strong × bg-page) | `border-strong` × `bg-page` = 2.6:1 — 1.4.11(UI 3:1)에는 약간 미달이나 채움 dot(`primary` 4.5:1+)이 checked 상태 시각 보강. |
| **WCAG 1.4.11** Non-text contrast (checked dot × item 채움 안쪽 흰색) | `primary` × `surface-default` = 4.7:1+ ✓ |
| **WCAG 2.1.1** Keyboard | `Arrow` keys로 navigation + `Space`로 활성화 ✓ |
| **WCAG 2.4.7** Focus Visible | `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | item 18×18 — 미달(⚠). `<Label>`을 hit area로 확장하면 row 전체가 44+ 가능. 모바일 우선 화면은 row hit area wrap 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | item 18 — 미달(⚠). label 포함 row hit area로 보강. |
| **WCAG 1.3.1** Info and Relationships | `<Label htmlFor>` 또는 `aria-labelledby` 필수. group 레벨은 `aria-labelledby` (legend 또는 헤딩 연결). |
| **ARIA** | Radix가 `role="radiogroup"` (root) + `role="radio"` (item) + `aria-checked` 자동. group label은 `<fieldset><legend>` 또는 `aria-labelledby` 권장. |

## Do / Don't

### ✅ Do

- 2–5개 옵션의 단일 선택 — form submit 필요 시. 옵션이 모두 동시에 보여야 할 때 적정(Select와 차이).
- label과 item 페어로 클릭 가능 — hit area 확장.
- vertical stack 기본 — 한국어 옵션은 wrap 위험. 짧은 2개만 horizontal.
- group 위에 명시적 label("결제 방법") — fieldset/legend 또는 heading.

### ❌ Don't

- 2개 옵션 horizontal에 너무 좁은 gap — 시각 분리 약함. 16px+ 권장.
- 옵션 6+ — 시각 noise + 스크롤 필요. Select로.
- 즉시 효과 단일 선택 — ToggleGroup `type="single"` (radiogroup role 동일, 시각만 button form).
- radio item 안에 추가 인터랙티브 element — semantic 충돌. 보조 액션은 row 우측 별도 button.

## Migration notes

- 기존 shadcn `radio-group.tsx`는 indicator `h-2.5 w-2.5` (10px) — 사용자 피드백("티가 안나네 16으로 키워봐")에 따라 `h-4 w-4` (16px)로 정정. 18×18 item 안에 1px gap 양쪽으로 시각 명확.
- item border `border-primary` (unchecked) → `border-strong` 정정 — primary는 checked 상태만 사용. unchecked에서 primary border는 모든 옵션이 강조되어 시각 위계 깨짐.
- transition은 `transition-colors` → `transition-[color,background-color,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` 토큰 직접 인용.
- group `space-y-2` → `grid gap-[var(--spacing-sm)]` 정정 — token 직접 인용 + grid가 wrap 일관성에 유리.
- preview-html에 별도 `.rd-*` CSS 없음 — component page에서 직접 렌더 (preview-html scope 외).
