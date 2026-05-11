# Checkbox

> 다중 선택 또는 단일 confirm을 표현하는 form control. 그룹 내 단일 선택은 Radio, 즉시 적용되는 on/off는 Switch — DESIGN.md `### Selection controls` 의미 분기 참조.

Porest Checkbox는 **3 sizes × 6 states (default · checked · indeterminate · focused · disabled · error)** 매트릭스로 정의됩니다. Toss 톤(절제 · 신뢰감)을 따라 `radius-sm`(4px) + 단단한 1px 외곽선 + checked 시 `primary` 채움 + 흰 체크 아이콘. **터치 타겟은 control 자체가 아닌 label까지 포함한 hit area**가 책임 — control은 시각적으로 작게 두고 라벨 클릭으로 toggle 가능하게 묶어야 WCAG 2.5.5 AAA 44×44 충족.

## Anatomy

```
┌────────────────────────────────────────┐
│  ┌──────┐                              │
│  │ ⓐ □  │  ⓑ label text                │
│  └──────┘                              │
│  ⓒ focus ring (focus-visible only)     │
│  ⓓ helper / error text (optional)      │
└────────────────────────────────────────┘
```

| ⓐ control | 정사각형 컨테이너 + 1px 외곽선. checked/indeterminate 시 `primary` 채움. `radius-sm`(4px) 고정. |
| ⓑ label | 우측 외부. `label-md`(14/500) 기본. `<label htmlFor="...">` 또는 `aria-labelledby` 필수. label 클릭 시 control toggle. |
| ⓒ focus ring | `focus-visible` 한정. 2px ring + 2px offset. 라이트는 `border-focus`, 다크는 `border-focus-light` 자동 alias. |
| ⓓ helper / error text | (옵션) 아래 외부. `caption`(12/400). 에러 시 `text-error` + `aria-describedby` 연결. |

**규칙**

- control 자체는 16–20px(작음) → **반드시 label까지 묶어 hit area 44×44 이상** 확보. 가장 간단한 방법은 `<label>`로 control + 텍스트를 감싸 padding으로 키우기.
- 라벨 없는 단독 checkbox는 `aria-label` 필수 (스크린리더 대응).
- placeholder는 사용하지 않음 — checkbox는 텍스트 입력이 아님.

## Variants

Checkbox는 **variant 없음** — 시각 위계는 size로만 표현, 의미 분기는 state(checked/indeterminate)에 위임. 한 화면에서 시각 통일이 가독성 · 일관성에 유리합니다.

## Sizes

`box-sizing: border-box` 기준 외부 정사각 한 변 = 토큰 값 그대로(16 / 18 / 20). border 1px은 그 안에 inset.

| Size | Box | Border | Check icon | Indeterminate dash | Radius | Touch (AA · AAA) |
|---|---|---|---|---|---|---|
| `sm` | 16×16px | 1px | 10×10 (lucide `Check` `size-2.5` `stroke-3`) | 8×2 | `radius-sm` (4) | control 단독 AA ⚠ · AAA ⚠ — **label 포함 hit area 44+ 확보 필수** |
| `md` *(default)* | 18×18px | 1px | 12×12 (lucide `Check` `size-3` `stroke-3`) | 10×2 | `radius-sm` (4) | control 단독 AA ⚠ · AAA ⚠ — **label 포함 hit area 44+ 확보 필수** |
| `lg` | 20×20px | 1px | 14×14 (lucide `Check` `size-3.5` `stroke-3`) | 12×2 | `radius-sm` (4) | control 단독 AA ⚠ · AAA ⚠ — **label 포함 hit area 44+ 확보 필수** |

Tailwind utility 매핑 (checkbox.tsx cva):
- `sm`: `size-4 [&_svg]:size-2.5`
- `md`: `size-[18px] [&_svg]:size-3`
- `lg`: `size-5 [&_svg]:size-3.5`

**규칙**

- `sm`은 dense list/toolbar 한정 (예: 표 헤더 select-all). 모바일 터치 우선 화면에서는 `lg` 권장 + label `gap-3`로 hit area 강화.
- `lg`는 single-question form, 약관 동의처럼 강조가 필요한 상황. 모바일 sticky form footer.
- size 변경 시에도 check icon `stroke-width`는 항상 3 (Toss 톤 — 명확한 체크 표식).

## States

6개 visual state. Radix `data-state` attribute(unchecked/checked/indeterminate) + native 가상 selectors(`:hover`, `:focus-visible`, `:disabled`)로 적용.

### State matrix (default size 기준)

| State | Background | Border | Icon | Ring | Cursor |
|---|---|---|---|---|---|
| `default` (unchecked) | `--color-surface-default` | `--color-border-strong` 1px | none | none | `pointer` |
| `hovered` (unchecked) | `--color-surface-input` | `--color-border-strong` 1px | none | none | `pointer` |
| `checked` | `--color-primary` | `--color-primary` 1px | `Check` `--color-text-on-accent` | none | `pointer` |
| `indeterminate` | `--color-primary` | `--color-primary` 1px | dash 2px `--color-text-on-accent` | none | `pointer` |
| `focused` (visible) | 위 상태 유지 | 위 상태 유지 | 위 상태 유지 | 2px `--color-border-focus` + 2px offset (`ring-2 ring-ring ring-offset-2`). 다크 모드는 `--color-border-focus-light` 자동 alias. | `pointer` |
| `disabled` | `--color-surface-input` | `--color-border-default` 1px | (checked 시 `text-on-accent` opacity 0.5) | none | `not-allowed` (opacity 0.5) |
| `error` (`aria-invalid="true"`) | `--color-surface-default` | `--color-error` 1px | none | 2px `--color-error/30` ring | `pointer` |

### Hover 상세

unchecked hover는 `bg-surface-input`로 미세한 affordance만 — checked/disabled 상태는 hover 효과 없음(이미 강조된 상태이거나 비활성).

### Motion

| 전환 | duration | easing | 속성 |
|---|---|---|---|
| unchecked → checked | `motion-duration-fast` (150ms) | `motion-ease-out` | background + icon scale 0.8→1 + opacity 0→1 |
| checked → unchecked | `motion-duration-fast` (150ms) | `motion-ease-out` | background + icon scale 1→0.8 + opacity 1→0 |
| → indeterminate | 동일 | 동일 | background + dash scale 0.8→1 + opacity |

`prefers-reduced-motion: reduce` 시 globally 0.01ms 단축 (DESIGN.md keyframes 가이드).

## Layout

**Single checkbox + label**

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-label-md cursor-pointer">서비스 이용약관에 동의합니다</label>
</div>
```

- control과 label 간 `gap-2` (8px) 고정.
- label `cursor: pointer`로 hit area 강조.

**Checkbox list (vertical group)**

- 항목 간 `gap-3` (12px) ~ `gap-4` (16px).
- group label은 위에 `label-md` + `gap-2`로 분리.
- 4개 이상이면 scroll 영역이나 collapsible 그룹으로 분리.

**Checkbox group (horizontal)**

- 항목 간 `gap-4` (16px).
- 모바일 좁은 화면에서는 vertical로 fallback.

**Indeterminate parent + nested**

- 부모 checkbox `indeterminate` + 자식 일부만 checked일 때 사용.
- 자식 들여쓰기 `pl-6` (24px) 또는 `pl-8` (32px) 권장.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click / Tap (control) | toggle. `disabled` 시 무시. |
| Click / Tap (label) | 연결된 control toggle (`htmlFor` 또는 `<label>` wrap). |
| Keyboard `Space` | toggle. focus 상태에서. `Enter`는 작동 안 함(폼 제출 별도). |
| Keyboard `Tab` | 다음 focusable로 이동. shift+Tab은 역방향. |
| `indeterminate` prop | 시각만 indeterminate. 클릭하면 unchecked 또는 checked로 전환(부모는 보통 `onCheckedChange` 안에서 자식 일괄 처리). |
| Disabled | `pointer-events: none`. 클릭/keyboard 불가. focusable에서 제외. |

**Form 안 동작**

- `<form>` 안 `<input type="checkbox">`는 native 제출에 포함. shadcn(Radix) 버전은 hidden input 자동 동기.
- 다중 선택 결과는 배열로 처리 (`checked: string[]`).
- 검증 시점: `onBlur`(권장) 또는 `onSubmit`. `onChange`는 즉시 빨간색 깜빡임 회피.

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text ≥ 4.5:1) | label `text-primary` × `bg-page` = 14:1+ ✓ (`npm run lint:dark` 검증) |
| **WCAG 1.4.11** Non-text contrast (UI ≥ 3:1) | unchecked `border-strong` × `bg-page` = 3.2:1+ ✓ / checked `bg-primary` × `bg-page` = 4.5:1+ ✓ |
| **WCAG 2.4.7** Focus visible | `focus-visible:ring-2 ring-ring ring-offset-2` (keyboard focus 시만) |
| **WCAG 2.4.11** Focus Appearance (AA) | 2px ring + 2px offset, 인접 표면 대비 3:1 충족 ✓ |
| **WCAG 2.5.8** Target Size — Minimum (AA — ≥ 24×24) | control 단독 16/18/20 ⚠ — **label 포함 hit area로 충족** (label `cursor:pointer` + 최소 `py-2` 권장으로 row hit area ≥ 32 확보) |
| **WCAG 2.5.5** Target Size — Enhanced (AAA — ≥ 44×44) | control 단독 ⚠ — **label 포함 row hit area로 44+ 확보 필수** (모바일 터치 우선) |
| **ARIA** | `<input type="checkbox">` 또는 `role="checkbox"` + `aria-checked="true|false|mixed"`(mixed = indeterminate). label은 `<label htmlFor>` 또는 `aria-labelledby`. 에러 시 `aria-invalid="true"` + `aria-describedby`. 그룹은 `<fieldset>` + `<legend>` 권장. |
| **Reduced motion** | 위 Motion 표 참조. `prefers-reduced-motion: reduce` 시 transition 0.01ms로 단축. |

## Do / Don't

### ✅ Do

- 모든 checkbox에 `<label>` 페어 (시각 노출 또는 `aria-label`). 스크린리더 사용자에게 필수.
- 다중 선택은 Checkbox, 단일 선택은 Radio — 의미를 혼동하지 말 것.
- 부모-자식 그룹에서 일부만 checked일 때 부모는 `indeterminate`로 표시 (Radix는 `checked="indeterminate"` 명시 지원).
- 한국어 라벨은 명사형 또는 행위형 ("동의합니다") — 일관성 유지.
- 모바일 터치 우선 화면은 `lg` size + label `py-2` 이상으로 row hit area 44+ 확보.

### ❌ Don't

- 즉시 적용되는 on/off에 Checkbox 사용 (→ Switch가 올바른 의미). 예: "알림 받기"는 Switch.
- 그룹 내 단일 선택에 Checkbox 사용 (→ Radio). 예: "성별 선택"은 Radio.
- control 단독에 hit area 의존 — label까지 묶어 row clickable로 만들 것.
- `onChange`로 즉시 에러 표시 — 사용자 입력 중 빨간 깜빡임 회피.
- disabled checkbox에 컨텍스트 없이 — 왜 disabled인지 helper text로 설명.

## Migration notes

- v93 이전 `checkbox.tsx`는 `h-[18px] w-[18px]` 고정 단일 사이즈였으나 이번 동기에서 `cva size variants` (`sm` 16 / `md` 18 / `lg` 20) 도입 — DESIGN.md `### Selection controls` Checkbox 정의(16/18/20) 정합.
- v93 이전 `rounded-xs`(2px) → `rounded-sm`(4px)로 정정 — DESIGN.md `box radius: radius-sm (4px)` 정합.
- v93 이전 unchecked hover 없음 → `hover:bg-surface-input` 추가 (Toss 톤 미세 affordance).
- `indeterminate` 시각은 spec에 정의됐으나 코드 미지원 → Radix `CheckboxPrimitive.Indicator`에서 `data-state="indeterminate"` 분기 추가.
