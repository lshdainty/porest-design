# InputOTP

> SMS·이메일로 발송된 일회용 인증번호(One-Time Password) 입력. 6자리(default) 또는 4자리. 자동 채우기(`autocomplete="one-time-code"`) + iOS SMS 추출 지원.

Porest InputOTP는 **개별 cell 박스 + gap** 패턴으로 정의됩니다. 각 cell이 독립 박스(`radius-md` + `surface-input` 채움)로 분리되어 한 자리씩 명확히 인식되도록 합니다. `input-otp` 라이브러리(@input-otp/react) 베이스 + Porest 디자인 토큰.

## Anatomy

```
┌──────────────────────────────────────────────┐
│ ⓐ container (flex, gap)                      │
│ ┌──┐ ┌──┐ ┌──┐  ⓒ sep  ┌──┐ ┌──┐ ┌──┐         │
│ │ 3│ │ 7│ │ 2│   —     │ 4│ │  │ │  │         │
│ └──┘ └──┘ └──┘         └▣▣┘ └──┘ └──┘         │
│  ⓑ cell (filled)        ⓑ cell (focus)        │
└──────────────────────────────────────────────┘
```

| ⓐ container | `display:flex; align-items:center; gap:var(--spacing-xs);` 6개 cell + 옵션 separator 가로 배치. |
| ⓑ cell | `40×40px` 정사각. `background:var(--color-surface-input); border:1px solid var(--color-border-default); border-radius:var(--radius-md); font-size:var(--text-title-md); font-weight:600; font-family:ui-monospace;` filled 시 `background:var(--color-surface-default);` (흰 채움). focus 시 `outline:2px solid var(--color-border-focus); outline-offset:1px;` |
| ⓒ separator | 옵션. 3-3 분리 등 그룹 표시. `display:inline-flex; align-items:center; color:var(--color-text-tertiary); padding:0 var(--spacing-xs);` 콘텐츠는 lucide `Minus` 12×12 SVG (cell 사이 일관 폭). |

**규칙**

- 모든 cell은 동일 크기·동일 라운드. 그룹 안에서 first/last만 라운드 다르게 하지 않음(preview SoT 톤).
- monospace font(`ui-monospace`) — 숫자 폭 균일. 한국어 문자가 들어올 일 없는 입력이라 Pretendard 미사용.
- separator는 입력 자체가 아니라 **시각 그룹 가이드** — focus order에서 skip.

## Variants

InputOTP는 **variant 없음** — 사이즈 가변(자릿수)으로만 분기.

## Sizes

cell 크기는 단일(`40×40`). 자릿수만 prop으로 결정 (`maxLength={4}` / `maxLength={6}` 등).

| 항목 | 값 | 토큰 |
|---|---|---|
| Cell width / height | 40 / 40 | `w-10 h-10` (또는 `w-[40px] h-[40px]`) |
| Cell font | 18px / 600 / monospace | `var(--text-title-md)` + `font-weight:600` + `ui-monospace` |
| Cell radius | 8px | `var(--radius-md)` |
| Cell border | 1px | `border-border-default` |
| Cell background (empty) | `surface-input` (#F0F2F7 / dark #2D3346) | `bg-surface-input` |
| Cell background (filled) | `surface-default` (#FFFFFF) | `bg-surface-default` |
| Container gap | 4px | `gap-[var(--spacing-xs)]` |
| Separator padding | 0 · 4px | `px-[var(--spacing-xs)]` |
| Touch target | 40 × 40 — AA ✓ / AAA ⚠ 미달 (모바일 IME 자동 채우기로 직접 탭 비중 낮음) |

## States

| State | Background | Border | Outline | Text |
|---|---|---|---|---|
| `empty` (default) | `var(--color-surface-input)` | `var(--color-border-default)` 1px | none | — |
| `filled` (입력값 있음) | `var(--color-surface-default)` | `var(--color-border-default)` 1px | none | `var(--color-text-primary)` |
| `focus` (active cell) | empty 또는 filled 유지 | `var(--color-border-default)` 1px | 2px `var(--color-border-focus)` + 1px offset | — |
| `error` (`aria-invalid="true"` on root) | empty/filled 유지 | `var(--color-error)` 1px | 2px `var(--color-error)` 30% ring | — |
| `disabled` | `var(--color-surface-input)` (opacity 0.5) | `var(--color-border-default)` 1px (opacity 0.5) | none | `cursor:not-allowed` |

## Layout

**Container**

- `display:flex; align-items:center; gap:var(--spacing-xs);`
- 모바일 좁은 화면(<360px)에서 6자리가 안 들어가면 자동 줄바꿈은 회피 — 사용자가 한 화면에서 보고 입력해야 함. cell width를 줄이거나(36×36) 4자리 변형 사용.

**Separator (옵션)**

- 3-3 분리 시 cell index 3 직전에 삽입. `padding: 0 var(--spacing-xs)`.
- 시각만의 역할 — `aria-hidden="true"`, focus order 제외.

**Form group**

- 위 `<label>` (`label-md` 14/500) + `gap-[var(--spacing-sm)]`
- 아래 helper / error 메시지 (`caption`).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| 첫 자리 click/tap | first cell focus → 키보드 입력 가능. |
| 숫자 입력 | 현재 cell에 char 박힘 → 다음 cell로 auto-advance. |
| Backspace | 현재 cell이 비었으면 이전 cell로 이동하며 그 cell도 clear. 차있으면 현재 cell만 clear. |
| Paste (6자리 코드) | 모든 cell에 분배 (`onPaste` 처리, `input-otp` 라이브러리 기본 지원). |
| iOS SMS 자동 채우기 | `autoComplete="one-time-code"` + iOS Messages에서 OTP 텍스트 감지 → 키보드 위에 한 번 탭으로 채움. |
| Tab | 그룹 전체가 단일 focus 단위. 다음 form field로 이동. |
| Disabled | `pointer-events:none`. 키보드/자동 채우기 모두 비활성. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text ≥ 4.5:1) | filled cell `text-primary` × `surface-default` = 14:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (UI ≥ 3:1) | cell border `border-default` × `surface-input` = 1.16:1 ⚠ — surface-input **채움 자체로 식별** 보강 (Input 1.4.11 평가와 동일 전략). focus 시 `border-focus` × `surface-input` = 3.96:1 ✓. |
| **WCAG 2.4.7** Focus Visible | 활성 cell에 `outline:2px var(--color-border-focus); offset:1px` ✓ |
| **WCAG 2.5.8** Target Size (AA — ≥ 24×24) | cell 40 ✓ |
| **WCAG 2.5.5** Target Size (AAA — ≥ 44×44) | cell 40 ⚠ — 자동 채우기 비중이 커서 모바일 직접 탭 위험은 낮음. |
| **ARIA** | `<input type="text" inputmode="numeric" autoComplete="one-time-code" maxLength={N}>` 단일 element가 a11y tree에 보임. 시각 cell들은 presentational(`role="presentation"`). |
| **Reduced motion** | `transition:all` 또는 `transition:[border-color,outline]` 모션은 `motion-duration-fast`. `prefers-reduced-motion`에서 0.01ms로 단축. |

## Do / Don't

### ✅ Do

- 자릿수는 SMS/Email로 발송하는 코드와 일치 (보통 4 또는 6). 6 권장 (보안 + 일관).
- `autoComplete="one-time-code"` 명시 — iOS/Android 자동 채우기 큰 UX.
- 에러 시 OTP 전체에 ring 표시 + 메시지 "코드가 올바르지 않습니다. 다시 입력해주세요." 같이 행동 가이드.
- 만료 카운트다운 (예: "30초 후 만료") 옆에 둠 — 사용자가 재발송 타이밍 인식.

### ❌ Don't

- 자릿수 8+ — 사용자 부담. 보안은 expire 시간으로 보강.
- separator를 input 사이마다 — 시각적 노이즈. 6자리는 단일 그룹이 깔끔, 3-3은 SMS 코드 가독성에 한정.
- 입력 중 자동 submit (마지막 cell 채우면 즉시 fetch) — 오타 수정 기회 박탈. 명시적 "확인" 버튼 권장.
- monospace 미사용 (Pretendard 그대로) — 숫자 폭 균일 안 잡혀 시각 불안정.

## Migration notes

- 기존 `input-otp.tsx`는 **연결된 박스**(`border-y border-r`, first/last만 라운드, `bg-` transparent) + `text-title-sm`(16/500)였으나 이번 동기에서 preview `.otp-cell` 톤으로 정렬: **개별 박스** + `gap-[var(--spacing-xs)]` + `bg-surface-input` (empty) / `bg-surface-default` (filled) + `rounded-md` (모든 cell) + `text-title-md`(18/600) + `font-mono`.
- `font-family`는 한국어 미입력 영역이라 `Pretendard` 대신 `ui-monospace` — 숫자 폭 균일.
- preview-html `.otp-cell`은 `font-size: 18px` 픽셀 하드코딩이었으나 같이 정정 — `var(--text-title-md)` 인용.
