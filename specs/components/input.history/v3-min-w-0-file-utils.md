# Input

> 사용자가 short-form text(이름·이메일·검색어·숫자 등)를 입력하는 단일 행 텍스트 필드. multi-line은 Textarea, 옵션 선택은 Select / Combobox 별도.

Porest Input은 **단일 size + 6 state** 매트릭스로 정의됩니다. Toss 톤(절제·신뢰감) 따라 회색 채움(`surface-input`) 배경을 기본으로 — 외곽선만으로는 1.4.11 식별이 약하므로 **배경 톤차로 입력 필드임을 명시**. 한국어 본문 가독성을 위해 `body-lg` (16/400) — 굵은 폰트보다 가벼운 폰트가 입력값 가독성에 유리.

## Anatomy

```
┌──────────────────────────────────┐
│ ⓐ label                          │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ ⓑ container                  │ │
│ │ ⓒ icon  ⓓ value/placeholder  │ │
│ └──────────────────────────────┘ │
│ ⓔ focus ring (focus-visible only)│
│                                  │
│ ⓕ helper text / error text       │
└──────────────────────────────────┘
```

| ⓐ label | 위쪽 외부. `label-md` (14/500). `htmlFor` 또는 `aria-labelledby` 필수. |
| ⓑ container | 채움 + 1px 외곽선. `radius-sm` (4px) 고정. |
| ⓒ icon (optional) | 좌측 leading icon. 16px. 검색·이메일 등 컨텍스트 표시. |
| ⓓ value / placeholder | 입력값 또는 placeholder. value는 `text-primary`, placeholder는 `text-tertiary`. |
| ⓔ focus ring | `focus-visible` 한정. 2px ring + 1px offset. 라이트는 `border-focus`, 다크는 `border-focus-light` 자동 alias. |
| ⓕ helper / error text | 아래 외부. `caption` (12/400). 에러 시 `text-error` + `aria-describedby`로 연결. |

**규칙**

- icon 내장 시 `padding-left`를 늘려 텍스트와 겹침 방지 (icon 16px + gap 8px = 24px).
- placeholder는 영구 콘텐츠가 아니므로 1.4.3 incidental 예외(text-tertiary 회색 OK).
- `<label>` 클릭 시 input focus되도록 `htmlFor` 필수.

## Variants

Input은 **variant 없음** — form 안에서 단일 시각 통일이 가독성·일관성에 유리합니다. type 속성(`text` / `email` / `password` / `number` / `search` / `tel` / `url` / `date` 등)에 따라 키보드 IME나 validation 동작이 달라지지만 시각 spec은 동일.

## Sizes

**단일 size — `md` (h-10, 40px) 고정**. 사용처에서 dense list 등 예외가 필요하면 `className`으로 직접 조정 (예: `className="h-8 text-caption"`). variant 분리 안 함은 form 안에서 통일된 사이즈 권장 의도.

| 항목 | 값 | 토큰 |
|---|---|---|
| Height | 40px | `h-10` |
| Padding (Y · X) | 8 · 12 | `py-[var(--spacing-sm)] px-[var(--spacing-md)]` (Tailwind 기본 spacing 스케일 `py-2 px-3` 대신 디자인 토큰 직접 인용) |
| Font | 16px / 400 / 1.6 | `text-body-lg` |
| Radius | 4px | `rounded-sm` |
| Border | 1px | `border-border-default` |
| Background | `surface-input` (#F0F2F7 / dark #2D3346) | `bg-surface-input` |
| Touch target | 40 × N — AA ✓ / AAA ⚠ 미달 | (`Button` 동일 — 모바일 우선 화면은 size 키울 것) |

다크 모드는 `surface-input-dark` (`#2D3346`)가 `surface-default-dark` (`#1B1F2A`)보다 **밝아** elevation 반전 — 어두운 카드 위 입력 필드가 elevated되어 시인성 확보(DESIGN.md `### Input` 정의).

## States

6개 visual state. Tailwind v4 utility는 `:focus-visible`, `[aria-invalid="true"]`, `[disabled]`, `[readonly]` 가상 selectors로 자동 적용.

| State | Background | Border | Text | Ring | Cursor |
|---|---|---|---|---|---|
| `default` | `surface-input` | `border-default` 1px | `text-primary` | none | `text` |
| `focused` (visible) | `surface-input` | `border-focus` (라이트) / `border-focus-light` (다크) 1px | `text-primary` | 2px `border-focus` + 1px offset (`ring-2 ring-ring/30`) | `text` |
| `filled` | `surface-input` | `border-default` 1px | `text-primary` | none — 입력값 자체로 구별 | `text` |
| `error` (`aria-invalid="true"`) | `surface-input` | `error` 1px | `text-primary` | 2px `error/30` ring (`ring-2 ring-error/30`) | `text` |
| `disabled` | `surface-input` (slightly muted) | `border-default` 1px | `text-disabled` (opacity 0.5) | none | `not-allowed` |
| `readonly` | `surface-input` | none — 외곽선 제거 | `text-primary` | none | `text` (focus·copy만) |

**Hover state는 명시적 변화 없음** — 입력 필드는 hover로 affordance 강조하지 않음(클릭/탭 시 즉시 focus). DESIGN.md `### Input` 의도와 일치.

### 다크 모드 자동 alias

`[data-theme="dark"]` 활성 시 토큰 cascade로 자동 swap:
- `surface-input` → `surface-input-dark` (#2D3346 — elevation 반전)
- `border-default` → `border-default-dark`
- `border-focus` → `border-focus-light` (다크 표면 시인성)
- `text-primary` → `text-primary-dark`

코드 변경 없이 cascade만으로 다크 정합 보장.

## Layout

**Form group**

- label 위 input: `gap-2` (8px) 또는 `space-y-2`. `<label>`과 `<input>` 사이.
- input 아래 helper/error: `gap-1` (4px). `caption` font.
- form group 간 최소 `gap-4` (16px), section 간 `gap-6` (24px).

**Width**

- 명시적 제한 없음 (`w-full` 권장 — form 컨테이너에 맞춤).
- 좁은 inline edit(예: 숫자 nudge)은 `w-20` / `w-24` 등 직접 지정.

**Layout 안 그룹** (e.g. icon + input)

```tsx
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-tertiary" />
  <Input className="pl-9" placeholder="검색…" />
</div>
```

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click / Tap | `:focus-visible` 활성. 키보드 작성 가능. |
| Keyboard `Tab` | 다음 focusable로 이동. shift+Tab 역방향. |
| `<label>` click | 연결된 input으로 focus 위임 (`htmlFor` 필수). |
| `Enter` (form 안) | form 제출 트리거 (브라우저 기본). 막으려면 `onKeyDown`에서 `e.preventDefault()`. |
| `Esc` | (옵션) 사용자 정의. shadcn 기본 동작 없음. |
| Disabled | `pointer-events: none`. 클릭/keyboard 불가. focusable에서 제외. |
| Readonly | focus·copy만 가능, 입력 불가. |

**Form validation**

- `aria-invalid="true"` 적용 시 자동으로 error 시각(border-error + ring-error/30) 활성.
- helper text는 `<p id="email-error">올바른 이메일 형식이 아닙니다</p>` + `aria-describedby="email-error"`로 연결.
- 검증 시점: `onBlur`(권장) 또는 `onSubmit`. `onChange`는 사용자 입력 중 빨간색 깜빡임 유발 — 회피.

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text ≥ 4.5:1) | `text-primary` × `surface-input` = 14:1+ ✓ (`npm run lint:dark` 검증) |
| **WCAG 1.4.11** Non-text contrast (UI ≥ 3:1) | ⚠ default `border-default` × `surface-input` = 1.16:1 미달 — **회색 배경 채움**(`surface-input`)으로 보강. focus 시 `border-focus` × `surface-input` = 3.96:1 ✓. (DESIGN.md `### Input` 1.4.11 평가 결과 그대로 — Toss·Material도 동일 한계) |
| **WCAG 2.4.11** Focus Appearance (AA) | 2px ring `border-focus` + 1px offset, 인접 표면 대비 3:1 충족 ✓ |
| **WCAG 2.5.8** Target Size — Minimum (AA — ≥ 24×24) | `md` 40 ✅ AA 통과 |
| **WCAG 2.5.5** Target Size — Enhanced (AAA — ≥ 44×44) | `md` 40 ⚠ 미달 — 모바일 터치 우선 화면은 `className="h-12"`로 키울 것 |
| **ARIA** | `<label htmlFor="...">` 필수. 에러 시 `aria-invalid="true"` + `aria-describedby="<error-id>"`. required 시 `aria-required="true"` + 시각 표시(* 또는 "(필수)"). |

## Do / Don't

### ✅ Do

- 모든 input에 `<label>` 페어. screen reader 사용자에게 필수.
- placeholder는 **예시값**으로만 (예: "you@example.com"). 라벨 대용 금지(입력 시 사라짐).
- 에러 메시지는 구체적이고 행동 가이드 있게: ❌ "잘못된 이메일" / ✅ "이메일 형식이 아닙니다 (예: kim@example.com)".
- 검증은 `onBlur`로 — 사용자 입력 중 빨간 깜빡임 회피.
- 한국어 라벨은 명사형 ("이메일") 또는 행위형 ("이메일을 입력하세요"). 일관성 유지.

### ❌ Don't

- placeholder를 라벨 대신 사용 — 입력 시 사라져 컨텍스트 손실.
- 외곽선만으로 input 식별 — `surface-input` 채움 필수 (1.4.11 보강).
- `onChange`로 즉시 빨간 에러 — 입력 중 자극.
- input height 32 미만 — AA 24×24는 통과하지만 한국어 IME 변환 행에 시각적 부담.
- disabled input에 placeholder만 두고 컨텍스트 없이 — 왜 disabled인지 helper text로 설명.

## Migration notes

- v93 이전 `input.tsx`는 `bg-surface-default`(흰색) + `text-title-sm`(16/500)였으나 이번 동기에서 `bg-surface-input`(회색) + `text-body-lg`(16/400)로 정정 — DESIGN.md `### Input` 원래 의도(채움 + 가벼운 폰트) 복원.
- `aria-invalid` 처리는 input.tsx에 이미 정의됐으나 examples.mjs의 BASE 상수에서 누락 → 동기.
- size variant는 도입 안 함 — input은 form 안 통일이 우선. 예외는 사용처 className으로 처리.
- **토큰 직접 인용으로 정정**: `px-3 py-2`(Tailwind 기본 spacing 8/12) → `px-[var(--spacing-md)] py-[var(--spacing-sm)]`, `transition-[color,box-shadow,border-color]`(Tailwind 기본 ease/duration) → `transition-[color,box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]`. `<input>` UA가 body font를 자동 inherit 안 해서 `font-sans` 추가(Pretendard 강제). preview-html `.fv-input`은 `padding: 8px 10px` 픽셀 하드코딩 버그였으나 같이 정정해 `padding: var(--spacing-sm) var(--spacing-md)` (8/12, spec 정합).
