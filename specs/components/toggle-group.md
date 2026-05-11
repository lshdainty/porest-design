# Toggle Group

> 여러 Toggle을 segmented connected 형태로 묶은 컨트롤. view 모드 선택(list/grid/card), 정렬 옵션(최신/오래된), 텍스트 정렬(좌/중/우)처럼 **2–5개 mutually exclusive(single) 또는 multiple option** 선택에 사용. Radix `ToggleGroup` 베이스.

Porest ToggleGroup은 **2 types(single/multiple) × [`Toggle`](toggle.md) 시각 상속** 매트릭스로 정의됩니다. preview `.tgg`/`.tgg-item` SoT 정합 — Root: outer border 1px + `radius-md` + `overflow-hidden`. Item: borderless + `divide-x` separator만(좌측 1px line). Toggle 단독 사용과 달리 **하나의 segmented unit으로 시각 응집** — toolbar/filter 그룹임을 즉시 식별.

## Anatomy

```
single (mutually exclusive)        multiple (multi-select)
┌──────────┬──────────┬──────────┐  ┌──────────┬──────────┬──────────┐
│  목록     │  그리드   │   카드   │  │ Bold     │ Italic   │ Under    │
│ (active) │          │          │  │ (active) │          │ (active) │
└──────────┴──────────┴──────────┘  └──────────┴──────────┴──────────┘
   outer border + radius-md + overflow-hidden
   item: 좌측 separator(divide-x)만
```

| ⓐ root | preview `.tgg` 그대로 — `inline-flex items-center border border-border-default rounded-md overflow-hidden divide-x divide-border-default` 단일 outer border + radius로 segmented group 시그니처. |
| ⓑ item | preview `.tgg-item` 그대로 — Toggle BASE 상속 + `rounded-none border-0` (outer border가 형태 결정). `data-state="on"` 시 `bg-surface-input` + `text-primary` + 600. |
| ⓒ separator | `divide-x divide-border-default` — Radix flex 자식 사이 1px line. item 직접 border 추가 금지(이중 line). |

**규칙**

- group 안 item은 **개별 border/radius 가짐 금지** — outer root가 단일 시각 단위. `rounded-none border-0`으로 무력화.
- `divide-x` 사용 — 1번째 item은 좌측 line 없음(`first:border-0` 효과 자동).
- size/variant는 root에서 한 번만 — context 통해 자식 item에 전파. item별 분기 금지(시각 응집).

## Variants (type)

| Type | 동작 | 사용처 |
|---|---|---|
| `single` *(default)* | mutually exclusive — 한 번에 1개만 active | view 모드 (list/grid/card), 정렬 (최신/오래된). RadioGroup의 button 형태. |
| `multiple` | multi-select — 동시에 여러 개 active 가능 | 텍스트 서식 (Bold/Italic/Underline). Toolbar 패턴. |

Type은 Radix `type` prop으로 결정 (`type="single"` 또는 `type="multiple"`). `value`(single 시 string / multiple 시 string[]) 타입도 자동 분기.

## Sizes

[`Toggle`](toggle.md) Size 표 그대로 — root에서 한 번 지정 시 context로 전파.

| Size | Padding (Y · X) | min-height | Font | Icon |
|---|---|---|---|---|
| `sm` | `xs` · `sm` (4 · 8) | 28px | `text-caption` (12/600) | 16px |
| `default` *(default)* | `xs` · `md` (4 · 12) | 32px | `text-caption` (12/600) | 16px |
| `lg` | `sm` · `lg` (8 · 16) | 40px | `text-caption` (12/600) | 16px |

## States

[`Toggle`](toggle.md) State 표 상속 — item별 동일.

| State | Background | Text |
|---|---|---|
| `off (enabled)` | transparent | `text-secondary` |
| `off + hover` | `surface-input` | `text-primary` |
| `off + focus-visible` | (동일) | (동일) + `ring-2 ring-ring ring-offset-2` (inset) |
| `on` (`data-state=on`) | `surface-input` | `text-primary` + 600 |
| `on + hover` | `surface-input` | `text-primary` |
| `disabled` | (동일) opacity 0.5 | (동일) + `pointer-events: none` |

ToggleGroup은 outline variant의 border 분기 사용 안 함 — outer border가 group 시각 단위라 item별 border 무력화.

## Layout

**Segmented view switcher (single)**

- 2–5 옵션 권장. 6+는 시각 noise — Select로.
- icon + label 또는 icon-only. icon-only는 tooltip 권장.
- 그룹 위/옆에 짧은 label("보기 방식") — 사용자에게 그룹 의미 hint.

**Toolbar (multiple)**

- 텍스트 서식 — Bold/Italic/Underline. icon-only가 표준.
- 의미 그룹(서식 / 정렬)은 별도 ToggleGroup으로 분리 + 사이에 separator(`Separator vertical`).
- 그룹 사이 gap `var(--spacing-md)` — group은 시각 단위이므로 inter-group 간격.

**Form integration**

- Label + ToggleGroup + helper 세트는 `flex flex-col gap-[var(--spacing-xs)]`. helper는 `caption` `text-tertiary`.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Item click (single) | 해당 item active + 다른 item 자동 off. value 변경. |
| Item click (multiple) | 해당 item active 토글. value 배열 변경. |
| `ArrowLeft` / `ArrowRight` | item 간 focus 이동 (Radix roving tabindex). |
| `Space` / `Enter` | focused item 활성화/토글. |
| `Tab` | group 진입/나가기. 내부 item 간은 Arrow keys. |
| Disabled (root) | 모든 item 비활성. |
| Disabled (item) | 해당 item만 비활성. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast | Toggle과 동일 — on `text-primary` × `surface-input` 14:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (group outer border × bg-page) | `border-default` × `bg-page` = 1.4:1 — 단독 약함이나 segmented 형태 + active item 채움이 시각 식별 보강. |
| **WCAG 2.1.1** Keyboard | `Arrow` keys로 navigation, `Space`/`Enter`로 활성화 ✓ |
| **WCAG 2.4.7** Focus Visible | item `focus-visible:ring-2 ring-ring ring-offset-2`. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | default 32 — 미달(⚠). 모바일은 `size="lg"` 또는 row hit area 확장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 모든 size ✓ |
| **ARIA** | Radix가 single은 `role="radiogroup"` + 각 item `role="radio"` + `aria-checked` / multiple은 `role="group"` + 각 item `role="button"` + `aria-pressed` 자동. group label은 `aria-label` 또는 `aria-labelledby` 권장. |

## Do / Don't

### ✅ Do

- 2–5개 mutually exclusive 또는 multi-select 옵션 — view 모드, 정렬, 텍스트 서식.
- group 단위 시각 응집 — outer border + radius로 "하나의 컨트롤"임을 즉시 식별.
- single type은 RadioGroup의 button 형태 대안 — radio dot보다 button 시각이 정보 위계 명확한 경우.
- icon-only는 `aria-label` + tooltip 권장 — toolbar dense UI 표준.

### ❌ Don't

- 6개 이상 옵션 — 시각 noise. Select로 전환.
- item별 다른 size/variant — 시각 응집 깨짐. root에서 한 번만 설정.
- item에 개별 border/radius — outer group과 이중 border. `rounded-none border-0` 유지.
- single type을 "거의 RadioGroup"으로 — context가 다를 때 의도적으로 사용. 단순 form radio는 RadioGroup이 시맨틱 정확.

## Migration notes

- 기존 shadcn `toggle-group.tsx`는 item별 개별 border + padding — preview `.tgg`/`.tgg-item` SoT(outer border + `divide-x` separator)로 정정.
- size/variant context propagation 추가 — root에서 한 번 지정 시 자식 item에 자동 전파(item별 prop 중복 회피).
- item `rounded-none border-0` 명시 — Toggle BASE 상속 시 자동 적용되는 border/radius 무력화.
- preview-html `.tgg-item + .tgg-item` `border-left` 패턴 → Tailwind `divide-x` utility로 정정(같은 효과, 토큰 일관성).
