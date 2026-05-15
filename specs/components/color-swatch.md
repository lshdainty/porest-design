# ColorSwatch

> 카테고리·라벨·태그 등에 부여할 색상을 정사각형 색칠 셀(swatch) 그리드에서 single-select 하는 컴포넌트. shadcn에는 없는 도메인 전용 패턴 — desk-front CategoryEditDialog "색상" 영역 SoT.

Porest ColorSwatch는 **고정 팔레트(N색) × single-select** 매트릭스로 정의됩니다. 각 셀은 `aspect-ratio: 1` 정사각형 + `radius-tile` + 자체 색 채움 + active 시 현재 색 자기 자신을 currentColor border로 두르고 중앙에 흰색 check. 사용자가 한눈에 팔레트를 훑고 결정할 수 있는 시각 패턴.

## Anatomy

```
┌──────────────────────────────────────┐
│ ⓐ container (grid grid-cols-N gap-2) │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐           │
│  │  │ │  │ │✓ │ │  │ │  │           │  ← 각 셀 ⓑ swatch
│  └──┘ └──┘ └──┘ └──┘ └──┘           │     active 셀은 border-currentColor + ✓
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐           │
│  │  │ │  │ │  │ │  │ │  │           │
│  └──┘ └──┘ └──┘ └──┘ └──┘           │
└──────────────────────────────────────┘
```

| ⓐ container | `<RadioGroup.Root>` 또는 `<div role="radiogroup">` + `grid grid-cols-N gap-[var(--spacing-sm)]` (N=palette 길이에 따라 5~10) |
| ⓑ swatch | `<RadioGroup.Item>` 또는 `<button>` — `aspect-ratio: 1; border: 2px solid; border-color: transparent → currentColor (active); border-radius: var(--radius-tile); cursor: pointer; transition: transform 150ms` + `hover: scale(1.05)` |
| ⓒ background | `background: var(--swatch-bg)` (palette 색) — semantic 토큰이 아닌 palette literal 직접 인용. `color: var(--swatch-fg)` (check 아이콘 색, 보통 흰색) |
| ⓓ check indicator (active) | `<Check size={14} strokeWidth={2.6} />` — currentColor 인용으로 `swatch-fg` 색 (보통 흰색) |
| ⓔ focus ring | `focus-visible:ring-2 ring-ring ring-offset-2` |

**규칙**

- swatch는 정사각형 — `aspect-ratio: 1`. cell 폭은 container width / N. 모바일에서 cell 폭 작아져도 시각 유지.
- 색칠은 **palette 색 자기 자신** — `background-color: <palette.bg>`. 시맨틱 토큰 매핑하지 말 것 (예: primary 매핑 금지). 색 자체가 정체성.
- active 표시 — `border: 2px solid currentColor` (color: palette.fg) + 중앙 ✓ 아이콘. 색상 + 시각 두 단서 동시(WCAG 1.4.1).
- palette 길이는 5–10 권장 — 그 이상은 선택 부담↑, 그 미만은 표현력↓.

## Variants

ColorSwatch는 **variant 없음** — 단일 시각 spec. 의미 분기(brand/semantic/freeform 등)는 호출처에서 palette 자체 결정.

## Sizes

| Size | Cell 폭 | Cell 높이 | Check 크기 | 사용처 |
|---|---|---|---|---|
| `sm` | grid 균등 (container/N) | aspect-ratio: 1 (자동) | 12px | mobile, dense form |
| `md` *(default)* | 동일 | 동일 | 14px | desktop, 일반 form |
| `lg` | 동일 | 동일 | 16px | 강조 영역, 단독 |

container width × grid-cols 분배가 곧 cell 폭이므로 size 명시는 **check icon 크기 + grid gap**만 분기.

| 항목 | 값 | 토큰 |
|---|---|---|
| Border width | 2px | (literal) |
| Border color (inactive) | transparent | (literal) |
| Border color (active) | currentColor | (`color: var(--swatch-fg)`) |
| Border radius | `var(--radius-tile)` | (= radius-lg 12) |
| Grid gap | 8px | `var(--spacing-sm)` |
| Aspect ratio | 1:1 (정사각형) | (literal) |
| Transition | transform 150ms | `var(--motion-duration-fast)` |
| Hover transform | `scale(1.05)` | (literal) |
| Focus ring | 2px / offset 2 | `ring-ring ring-offset-2` |

## States

| State | Border | Indicator | Transform |
|---|---|---|---|
| `enabled` (inactive) | transparent | — | — |
| `enabled` (active) | `currentColor` 2px | ✓ Check | — |
| `hover` | (변화 없음) | (변화 없음) | `scale(1.05)` |
| `focus-visible` | (변화 없음) | (변화 없음) | + `ring-2 ring-ring ring-offset-2` |
| `disabled` | (변화 없음) | (변화 없음) | `opacity 0.5 cursor-not-allowed` |

## Layout

**Form field 안**

- `<Label>` "색상" + 아래에 ColorSwatch grid. label과 grid 사이 gap `var(--spacing-sm)`.
- Form 안에서 다른 input(이름/아이콘/카테고리 등)과 같은 column 흐름.

**그리드 layout**

- palette 길이에 따라 `grid-cols-5` (10색 = 2행 5열), `grid-cols-6` (12색), `grid-cols-8` (8색 1행) 등.
- mobile 좁은 viewport에서도 grid-cols 유지 (cell 폭만 줄어듦, aspect-ratio 1).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click swatch | active로 토글 (single-select). 이전 active는 inactive 전환. |
| `Space` / `Enter` (focus) | 동일 활성화. |
| `Tab` | swatch 간 이동 (RadioGroup 사용 시 ↑↓→← keyboard nav). |
| Hover | `scale(1.05)` transform — 클릭 가능 affordance. |

ColorSwatch는 single-select만 — multi-select는 별 컴포넌트(`MultiColorPicker` 등, 본 spec 외).

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.1** Use of Color | 색 + 텍스트 두 단서 — active swatch는 색 + ✓ 아이콘. color-blind 사용자 대응. |
| **WCAG 1.4.3** Color contrast (✓ 아이콘 × swatch bg) | check fg(`swatch-fg`) × swatch bg — palette 정의 시 4.5:1+ 보장. 흰 check + 진한 색 권장. |
| **WCAG 1.4.11** Non-text contrast (active border × bg-page) | `currentColor` (= swatch-fg, 보통 진한 색) × bg-page = 3:1+ ✓ |
| **WCAG 2.1.1** Keyboard | `Space`로 선택 ✓ |
| **WCAG 2.4.7** Focus Visible | `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | grid-cols-5 + 너비 280+ 이면 cell ≈ 56 ✓ / grid-cols-8 + 320 이면 cell ≈ 40 ⚠ (mobile 좁은 화면 fallback) |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | ≥ 24 ✓ |
| **ARIA** | RadioGroup 사용 시 `role="radiogroup"` + 각 swatch `role="radio" aria-checked`. 추가 `aria-label`로 색상명(예: "녹색") 제공 권장. |

## Do / Don't

### ✅ Do

- palette 길이 5–10 — 한눈에 인지 가능한 범위.
- check 색은 swatch bg와 4.5:1+ 대비 — color-blind 친화 + WCAG 충족.
- 카테고리/라벨/태그처럼 **색이 정체성인** 도메인에 사용.
- form 안에서 Label + grid 패턴 — 다른 input과 시각 통일.

### ❌ Don't

- semantic 색(success/warning/error)을 swatch로 — 그건 Select / Badge variant 영역.
- 50+ 색 grid — 결정 부담. palette를 의미 그룹으로 분리하거나 hex input 별 spec.
- multi-select — single만. multi는 별 spec.
- check 색을 swatch bg 비슷한 색으로 — 시각 식별 깨짐. 흰색/검정 권장.
- swatch에 텍스트 라벨 같이 — 그리드 답답. 라벨은 호출처에서 hover tooltip 또는 caption.

## Migration notes

- desk-front `CategoryEditDialog.tsx` "색상" grid (line 312-345) 직접 raw button + `style` 인라인 패턴 → 본 spec ColorSwatch로 흡수.
- desk-front `CAT_PALETTE` (10색 × bg/color 쌍) palette literal 보존 — `var(--swatch-bg)` / `var(--swatch-fg)` 토큰으로 transparent하게 통과.
- aspect-ratio + border currentColor + check 패턴은 그대로 — Toss 카테고리 색 선택 시각 일관.
- shadcn에는 본 컴포넌트가 없음 — Porest 도메인 전용 추가 spec.
