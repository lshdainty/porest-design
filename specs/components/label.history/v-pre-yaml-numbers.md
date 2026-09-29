# Label

> form 컨트롤(Input · Textarea · Select · Checkbox · Radio · Switch 등)에 의미를 부여하는 텍스트 라벨. `<label htmlFor>` semantic + Radix `Label` 베이스. 시각·접근성 측면에서 form의 단일 SoT — placeholder 단독 사용 금지, 모든 폼 control은 Label 페어 필수.

Porest Label은 **단일 spec × 3 contexts(form / inline / required)** 매트릭스로 정의됩니다. preview `.form-label` SoT 정합 — `text-label-md` (14/500) + `text-primary` + `leading-none`. 페어 컨트롤이 `disabled` 시 자동으로 `opacity-70` + `cursor-not-allowed` (peer 패턴). required 표기는 `*` red(`text-error`) 또는 prose 명시.

## Anatomy

```
context 1 — form (Input/Textarea/Select 위)
┌──────────────────────────────────┐
│ ⓐ label "이메일" ⓑ required *     │   ← label-md(14/500) + (선택) red 별표
│ ┌──────────────────────────────┐ │
│ │ [input field]                │ │
│ └──────────────────────────────┘ │
│ ⓓ helper "도메인 포함 입력"        │   ← 별도 컴포넌트
└──────────────────────────────────┘

context 2 — inline (Checkbox/Radio/Switch 옆)
┌──────────────────────────────────┐
│ ⓒ [▣]  ⓐ label "약관에 동의합니다" │   ← gap-md, 페어
└──────────────────────────────────┘

context 3 — group (RadioGroup/section heading)
┌──────────────────────────────────┐
│ ⓐ label "결제 방법" (그룹 레벨)    │
│ ┌──────────────────────────────┐ │
│ │ [○ 신용카드] [○ 계좌이체] ... │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

| ⓐ label text | `text-label-md` (14/500). `text-primary`. `leading-none` — 컨트롤 위에 붙을 때 vertical rhythm 깨짐 방지. |
| ⓑ required marker | `*` red asterisk — `text-error` + `font-weight: 500`. label 끝에 `<span>` 추가 또는 prose `"이름 *"` 인라인. |
| ⓒ peer control | Checkbox/Radio/Switch 등. `peer` className으로 컨트롤이 disabled 시 label도 자동 흐림. |
| ⓓ helper (외부) | label과 별개 — `caption` `text-tertiary`. helper는 별도 prose 요소, Label spec 영역 아님. |

**규칙**

- 모든 form 컨트롤은 **Label 페어 필수** — `htmlFor` 또는 wrap pattern. placeholder 단독 사용 금지(WCAG 3.3.2).
- `leading-none` — Label은 form-group `gap-xs` (4) flex column 안에서 vertical rhythm 컨트롤. line-height가 1.4면 form gap이 의도와 다르게 커짐.
- required marker는 시각(`*` red)만 아니라 `aria-required="true"` 또는 `required` HTML attribute로도 명시.

## Variants

Label은 **variant 없음** — form 안 시각 통일. context 분기(form vs inline vs group)는 사용처 layout이 결정, Label 자체 spec은 동일.

## Sizes

Label은 **size variant 없음** — `text-label-md` (14/500) 단일 spec. form 안 시각 일관성 우선.

| 항목 | 값 | 토큰 |
|---|---|---|
| Font | 14px / 500 / 1.4 | `text-label-md` |
| line-height (override) | none (1.0) | `leading-none` |
| Color | `text-primary` | `text-text-primary` |
| Required marker | `text-error` + 500 | `text-error font-medium` |
| peer-disabled opacity | 0.7 | `peer-disabled:opacity-70` |
| peer-disabled cursor | not-allowed | `peer-disabled:cursor-not-allowed` |

dense 상황(예: table header label)에서는 `text-caption` (12/400) override 가능 — className으로 직접 변경.

## States

Label 자체는 인터랙티브가 아님 — 상태는 페어 컨트롤이 결정.

| State | Cursor | Opacity | 비고 |
|---|---|---|---|
| `default` | pointer (htmlFor가 click target 위임) | 1.0 | — |
| `peer-disabled` | `not-allowed` | 0.7 | Tailwind `peer` 패턴 — 같은 부모 안 `peer` className 컨트롤이 disabled 시 자동 적용. |
| `peer-invalid` | (동일) | 1.0 | (Label 자체는 변화 없음 — error 시각은 helper text가 담당.) |

## Layout

**Form (Label 위 + Control 아래)**

- `flex flex-col gap-[var(--spacing-xs)]` (4) — Label · Control · helper 세트.
- Label은 Control 위에 위치. helper text는 Control 아래.
- Label 우측에 (선택) "(선택)" suffix(text-tertiary caption) 또는 required `*`.

**Inline (Checkbox/Radio/Switch 옆 Label)**

- `flex items-center gap-[var(--spacing-md)]` (12) — 컨트롤 좌, Label 우.
- 전체 row 클릭 가능하도록 `<label htmlFor>` 또는 wrap pattern. peer 패턴으로 disabled 자동 처리.
- Switch/Toggle은 Label 좌, 컨트롤 우 (iOS 표준 패턴).

**Group label (fieldset/legend 또는 heading)**

- RadioGroup/CheckboxGroup 위에 단독 Label — `aria-labelledby`로 group과 연결.
- 또는 `<fieldset>` + `<legend>` semantic 사용 (시각만 변형).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click | `htmlFor` 또는 wrap pattern으로 페어 컨트롤 focus. Input은 focus, Checkbox/Radio는 toggle/check, Select는 open. |
| Hover | (변화 없음 — 컨트롤 자체 affordance에 위임) |
| peer-disabled | `opacity-70` + `cursor-not-allowed` 자동 적용. |

Label은 클릭 가능한 **hit area 확장 도구** — 시각 컨트롤(체크박스 18×18) 자체가 작아도 Label 텍스트 영역 포함 row 전체로 클릭 가능 영역 확장.

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text-primary × bg-page) | `text-primary` × `bg-page` = 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (required `*` red × bg-page) | `text-error` `#D32F2F` × `bg-page` = 5.0:1+ ✓ |
| **WCAG 1.3.1** Info and Relationships | `<label htmlFor>` 또는 `aria-labelledby` 필수 — semantic 관계 명시. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | Label 자체는 시각 단위가 아니라 hit area 확장 도구 — 페어 컨트롤 + Label row 전체 hit area로 모바일 44+ 보강. |
| **WCAG 3.3.2** Labels or Instructions | placeholder 단독 사용 금지. Label은 form 컨트롤마다 필수. |
| **WCAG 3.3.7** Redundant Entry | required 표기는 시각(`*` red) + `aria-required` 또는 `required` HTML attribute 둘 다 — 색만 의존 안 함. |
| **ARIA** | Radix `Label`은 `<label>` native element 그대로 + `htmlFor` 자동 wire. group 레벨은 `aria-labelledby`로 ID 참조 권장. |

## Do / Don't

### ✅ Do

- 모든 form 컨트롤에 **Label 페어 필수** — placeholder 단독 사용 금지.
- `htmlFor` 또는 wrap pattern으로 hit area 확장 — 작은 체크박스/라디오도 row 전체 클릭 가능.
- required 표기는 시각 + ARIA — `*` red + `aria-required="true"`.
- group 레벨 Label은 `aria-labelledby` 또는 `<fieldset><legend>` — fieldset의 default 스타일은 reset.

### ❌ Don't

- placeholder를 Label 대용으로 — 사용자 입력 시 사라져 컨텍스트 손실(WCAG 3.3.2 위반).
- Label 텍스트를 모호하게 ("값", "데이터") — 명시적 의미("이메일 주소", "예상 도착 시각") 사용.
- `leading-none` 제거 — form gap이 의도와 다르게 커져 시각 rhythm 깨짐.
- required 표기를 색만으로 — 색맹 사용자는 못 봄. ARIA 또는 prose("(필수)") 병행.
- form 안에서 Label size 임의 변경 — 시각 통일 깨짐. dense 상황만 caption override.

## Migration notes

- 기존 shadcn `label.tsx`는 `text-sm` (Tailwind 기본, ≈14/400) — preview `.form-label` SoT(`text-label-md` 14/500 + `text-primary`)로 정정.
- `leading-none` 명시 — form-group `flex flex-col gap-xs` 안에서 vertical rhythm 컨트롤. Tailwind 기본 line-height(1.5)가 form gap을 의도보다 크게 만드는 문제 fix.
- preview-html `.form-label`은 `gap: var(--spacing-xs)` (label · required 사이) + `display: flex; align-items: center;` — Label 자체 spec이 아니라 사용처 layout이지만 reference.
- preview-html `.form-required` `color: var(--color-error); font-weight: 500;` — Label 안 required marker SoT.
- Radix `Label`은 `<label>` semantic 보존 + click 시 페어 컨트롤 focus/toggle 자동 처리 — native `<label>`과 동일 동작 + Radix가 nested control 등 edge case 처리.
