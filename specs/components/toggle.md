# Toggle

> 단일 옵션의 on/off를 시각적으로 표시하는 button-style 컨트롤. 텍스트 에디터 toolbar(굵게/기울임/밑줄), filter chip(active/inactive), view 옵션처럼 **현재 상태가 button 시각으로 즉시 드러나는 binary 컨트롤**. 여러 옵션을 함께 다루면 [`ToggleGroup`](toggle-group.md). 즉시 효과 binary 설정은 [`Switch`](switch.md), form binary 입력은 [`Checkbox`](checkbox.md).

Porest Toggle은 **2 variants(default/outline) × 3 sizes(sm/default/lg) × 4 states** 매트릭스로 정의됩니다. preview `.tg`/`.tg--on` SoT 정합 — caption(12) + 600 + `radius-md` + token padding. off: `text-secondary` + transparent. on: `bg-surface-input` + `text-primary` + (outline) `border-strong`. Radix `Toggle` 베이스.

## Anatomy

```
off                    on
┌─────────┐            ┌─────────┐
│ Bold    │     →      │  Bold   │     ← bg-surface-input + 600
│         │            │         │       text-primary + border-strong(outline)
└─────────┘            └─────────┘
text-secondary          
border 없음(default)
border-default(outline)
```

| ⓐ container | `inline-flex items-center justify-center gap-[var(--spacing-xs)] rounded-md text-caption font-semibold transition-[color,background-color,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |
| ⓑ icon (선택) | 좌측 icon 16px (`[&_svg]:size-4`) — Bold/Italic 같은 시각 기호. icon-only Toggle은 `aria-label` 필수. |
| ⓒ label | caption(12/600). 짧은 단어 또는 icon 단독. |
| ⓓ focus ring | `focus-visible:ring-2 ring-ring ring-offset-2` |

**규칙**

- icon-only Toggle은 `size-default`(min-h-8) 권장 + `aria-label`. label 텍스트 있을 땐 label이 자체 의미.
- on 상태는 `data-state="on"` (Radix 자동) — `bg-surface-input` + `text-primary` 변화로 즉시 식별.
- 모든 상태 변화는 `motion-duration-fast` (180ms) — Switch보다 가볍게(button 톤이라 즉각 반응 인상).

## Variants

| Variant | Border | 사용처 |
|---|---|---|
| `default` *(default)* | 없음 (transparent) | 텍스트 에디터 toolbar — 여러 toggle이 인접 배치되는 dense UI. |
| `outline` | 1px `border-default` (off) → `border-strong` (on) | 독립 toggle — filter chip, view 옵션처럼 단독 또는 sparse 배치. preview `.tg` SoT. |

## Sizes

| Size | Padding (Y · X) | min-height | Font | Icon |
|---|---|---|---|---|
| `sm` | `xs` · `sm` (4 · 8) | 28px | `text-caption` (12/600) | 16px |
| `default` *(default)* | `xs` · `md` (4 · 12) | 32px | `text-caption` (12/600) | 16px |
| `lg` | `sm` · `lg` (8 · 16) | 40px | `text-caption` (12/600) | 16px |

font는 모든 size에서 `text-caption` + 600 — preview `.tg` SoT(toolbar/filter chip 톤). size 차이는 padding과 min-height로.

## States

| State | Background | Text | Border (outline) |
|---|---|---|---|
| `off (enabled)` | transparent | `text-secondary` | `border-default` |
| `off + hover` | `surface-input` | `text-primary` | `border-default` |
| `off + focus-visible` | (동일) | (동일) | (동일) + `ring-2 ring-ring ring-offset-2` |
| `on` (`data-state=on`) | `surface-input` | `text-primary` | `border-strong` |
| `on + hover` | `surface-input` | `text-primary` | `border-strong` |
| `disabled` | (동일) opacity 0.5 | (동일) | (동일) + `pointer-events: none` |

variant `default`는 outline의 border 분기 없음(항상 transparent).

## Layout

**Toolbar (default variant)**

- 여러 toggle을 인접 배치 — 텍스트 에디터(굵게/기울임/밑줄/링크). gap `var(--spacing-xs)` (4).
- 의미 그룹은 separator(`Separator vertical`)로 분리.
- icon-only가 표준 — label은 tooltip으로.

**Filter chip (outline variant)**

- 단독 또는 sparse 배치 — "주말만 보기" / "완료된 항목 숨김" 같은 필터.
- gap `var(--spacing-sm)` (8) — toolbar보다 여유.
- label + (선택) icon. label-first.

**View option**

- 단일 toggle로 view 모드 전환(예: "그리드 보기"). 2+ 옵션은 ToggleGroup.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click | 상태 토글 (Radix `onPressedChange`). |
| `Space` / `Enter` | 상태 토글. |
| `Tab` | focus 이동. |
| Disabled | 모든 인터랙션 차단. |

Toggle은 **즉시 효과 button** 패턴 — Switch와 달리 button 시각이라 즉시 클릭 affordance가 명확. form submit과 무관.

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (off `text-secondary` × bg) | `text-secondary` × bg-page = 9.2:1 ✓ |
| **WCAG 1.4.3** Color contrast (on `text-primary` × `surface-input`) | 14:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (off vs on 상태 분리) | bg 변화 + border 변화 + font weight 동일(600) — 색만 의존 안 함. on 상태는 채움 변화로 시각 명확. |
| **WCAG 2.1.1** Keyboard | `Space`/`Enter`로 토글 ✓ |
| **WCAG 2.4.7** Focus Visible | `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | default 32 / sm 28 / lg 40 — 모두 미달(⚠). 모바일 toolbar는 `size="lg"` 또는 row 전체 hit area 확장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 모든 size ✓ |
| **ARIA** | Radix가 `role="button"` + `aria-pressed` 자동. icon-only는 `aria-label` 필수("굵게" 등). |

## Do / Don't

### ✅ Do

- on/off 상태가 **현재 시각으로 즉시 드러나야** 할 때 사용 — toolbar 활성 표시 / filter chip 활성 표시.
- icon-only는 `aria-label`로 의미 전달 — "굵게" / "기울임" 같이 명확하게.
- 여러 옵션은 ToggleGroup으로 묶어 그룹 시맨틱 부여.
- on 상태 변화 직후 효과 즉시 반영 — 사용자 의도와 시각 변화 시간 차이 최소화.

### ❌ Don't

- form binary 입력 (체크박스 의미) — Checkbox 사용. Toggle은 즉시 효과.
- 즉시 효과 binary 설정 (다크 모드 ON 같은 system 설정) — Switch가 표준 시그니처.
- 3개 이상 mutually exclusive 옵션 — RadioGroup 또는 ToggleGroup(`type="single"`).
- icon + label 너무 길게 — Toggle은 dense UI 용. 긴 label은 그냥 Button 사용.

## Migration notes

- 기존 shadcn `toggle.tsx`는 `text-sm` (body-md alias) + `h-9 px-3` (Tailwind 기본) — preview `.tg` SoT(`text-caption` 600 + token padding/min-height)로 정정.
- hover state는 shadcn `hover:bg-muted hover:text-muted-foreground` — preview SoT(`surface-input` + `text-primary`)로 정정.
- transition `transition-colors` → `transition-[color,background-color,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` 토큰 직접 인용.
- outline variant on 상태 `border-strong` 명시 — preview `.tg--on` 정합.
- `data-state=on` 분기로 Radix 표준 활용 (이전 `aria-pressed` className은 비표준).
