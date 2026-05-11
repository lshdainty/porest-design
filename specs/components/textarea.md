# Textarea

> 사용자가 long-form text(메모/회고/코멘트/이메일 본문 등)를 입력하는 multi-line 텍스트 필드. single-line short-form은 [`Input`](input.md), 옵션 선택은 [`Select`](select.md) 별도.

Porest Textarea는 **단일 size × 가변 rows × 6 state** 매트릭스로 정의됩니다. 시각 톤은 [`Input`](input.md)과 1:1 동기 — `surface-input` 채움 + `border-default` 1px + `radius-sm` + token padding. 폰트만 차이(`body-md` 15px — Input의 `body-lg` 16px보다 약간 작아 긴 본문 밀도 확보). 기본 `resize: none` (className으로 `resize-y` opt-in).

## Anatomy

```
┌──────────────────────────────────┐
│ ⓐ label                          │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ ⓑ container (min-h-20)        │ │
│ │ ⓒ value / placeholder         │ │
│ │   (multi-line, line-height 1.6)│ │
│ │                              │ │
│ │                              │ │
│ └──────────────────────────────┘ │
│ ⓓ focus ring (focus-visible only)│
│                                  │
│ ⓔ helper text / error text       │
└──────────────────────────────────┘
```

| ⓐ label | 위쪽 외부. [`Label`](label.md) — `label-md` (14/500). `htmlFor` 필수. |
| ⓑ container | 채움 + 1px 외곽선 + `radius-sm`. `min-height:80px` (3줄 이상 기본). `rows` prop으로 초기 높이 조정. |
| ⓒ value / placeholder | 입력값 또는 placeholder. value는 `text-primary`, placeholder는 `text-tertiary`. `line-height: 1.6` (preview `.form-textarea`와 동일 — 한국어 본문 가독성). |
| ⓓ focus ring | `focus-visible` 한정. 2px ring + `border-ring`. `aria-invalid` 시 `border-error` + `ring-error/30`. |
| ⓔ helper / error text | 아래 외부. `caption` (12/400) `text-tertiary`. 에러 시 `text-error` + `aria-describedby`로 연결. |

**규칙**

- icon 내장은 textarea에는 권장 안 함 — 긴 본문이라 좌측 영역 점유가 시각 noise. 컨텍스트 hint는 placeholder 또는 label 아래 helper로.
- `resize: none` 기본 — 사용처 layout이 깨지지 않도록. 사용자 resize가 필요한 곳(피드백/긴 회고 등)만 className `resize-y` opt-in.
- 한국어 본문은 `line-height: 1.6` — 줄간격 좁으면 받침/획이 겹쳐 가독성↓.

## Variants

Textarea는 **variant 없음** — form 안에서 Input과 시각 통일이 일관성에 유리. 의미 분기(긴 본문 / 짧은 메모)는 `rows` 또는 `min-height` className으로.

## Sizes

**단일 size — `min-h-20` (80px) 기본 + `rows` 가변**. 사용처에서 dense edit 등 예외는 `className`으로 직접 조정.

| 항목 | 값 | 토큰 |
|---|---|---|
| min-height | 80px | `min-h-20` |
| Padding (Y · X) | 8 · 12 | `py-[var(--spacing-sm)] px-[var(--spacing-md)]` |
| Font | 15px / 400 / 1.6 | `text-body-md` (line-height 1.6는 preview/spec 명시) |
| Radius | 4px | `rounded-sm` |
| Border | 1px | `border-border-default` |
| Background | `surface-input` | `bg-surface-input` |
| Resize | none (기본) / vertical (opt-in) | `resize-none` / `resize-y` |
| Width | 100% | `w-full` |

**Input과 차이**: Input은 `body-lg` (16/400), Textarea는 `body-md` (15/400) — 긴 본문 밀도 확보 + 한 줄 짧은 입력값 vs 여러 줄 본문의 시각 위계 분리.

## States

Input과 동일 6 state. Tailwind v4 utility 자동 적용.

| State | Background | Border | Text | Ring | Cursor |
|---|---|---|---|---|---|
| `enabled` | `surface-input` | `border-default` | `text-primary` (value) / `text-tertiary` (placeholder) | — | text |
| `hover` | `surface-input` | `border-default` | (변화 없음) | — | text |
| `focus-visible` | `surface-input` | `border-ring` | `text-primary` | `ring-2 ring-ring/30` | text |
| `error` (`aria-invalid="true"`) | `surface-input` | `border-error` | `text-primary` | `ring-2 ring-error/30` | text |
| `disabled` | `surface-input` opacity 0.5 | `border-default` | `text-primary` opacity 0.5 | — | `not-allowed` |
| `readonly` | `surface-input` | `border-default` | `text-secondary` | — | `not-allowed` (또는 `default`) |

## Layout

**Form integration**

- form-grid 안에서 `grid-column: 1 / -1`로 full-width 점유(preview `.form-group:has(.form-textarea)` 패턴) — 단일 행에 Input 2개와 함께 둘 때보다 본문 입력은 폭 우선.
- Label + Textarea + helper 세트는 `flex flex-col gap-[var(--spacing-xs)]`.

**Comment / Memo**

- popover 안 textarea는 caption 톤(preview `.pop textarea` — `surface-input` + token padding + `text-caption`) — 인라인 빠른 메모. spec 기본(`body-md`)과 별도 컨텍스트.
- 메모/회고 본문은 `rows={5}` 또는 `min-h-32` 등 사용처에서 명시.

**Auto-resize (선택)**

- shadcn 기본 컴포넌트는 auto-resize 미지원. 필요 시 `react-textarea-autosize` 또는 useEffect로 scrollHeight 추적 — spec 외 영역.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click | textarea focus, cursor 위치 클릭 지점. |
| Tab | focus 이동 (form 다음 field로). |
| `Enter` | 줄바꿈 (Input과 다름 — Input은 form submit). |
| `Cmd/Ctrl + Enter` (관용) | 사용처 결정 — 보통 submit. 사용 시 helper에 hint 표기. |
| Resize drag (resize-y 시) | 사용자가 수직 크기 조정. width는 form layout이 고정. |
| Disabled | 모든 인터랙션 차단. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text-primary × surface-input) | 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (text-tertiary placeholder × surface-input) | 4.6:1 ✓ (AA 본문 기준 충족) |
| **WCAG 1.4.11** Non-text contrast (container × bg-page) | `surface-input` 채움이 form field 식별 보강. focus 시 `border-ring` 3:1+ ✓ |
| **WCAG 1.4.12** Text Spacing | `line-height: 1.6` — 한국어 본문 1.5+ 권장 충족. |
| **WCAG 2.4.7** Focus Visible | `focus-visible:border-ring + ring-2 ring-ring/30`. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | min-h-20(80) 충분 ✓ — 본문 입력 영역은 항상 AAA 통과. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | ✓ |
| **WCAG 3.3.1** Error Identification | `aria-invalid="true"` + `aria-describedby` → 에러 텍스트 연결. |
| **WCAG 3.3.2** Labels or Instructions | `<label>` 또는 `aria-labelledby` 필수. placeholder 단독은 label 대용 불가. |
| **ARIA** | `<textarea>` native semantic + `aria-label` 또는 `aria-labelledby` + `aria-describedby` (helper/error). |

## Do / Don't

### ✅ Do

- 긴 본문 입력은 textarea — 메모/회고/피드백/이메일 본문 등 줄바꿈이 자연스러운 콘텐츠.
- 한국어 본문 가독성을 위해 `line-height: 1.6` 유지 — 좁히지 말 것.
- 사용자 resize가 의미 있는 곳만 `resize-y` opt-in — 일반 form은 `resize-none` 유지(layout 안정성).
- Helper text로 입력 hint 제공 — "줄바꿈 ⏎ / 제출 ⌘⏎" 같은 키보드 단축키 안내.

### ❌ Don't

- 한 줄 입력에 textarea — Input 사용. 줄바꿈이 의미 없는 곳은 textarea 회피.
- `line-height: 1.2` 같은 좁은 줄간격 — 한국어 받침/획 겹침으로 가독성↓.
- `rows={1}` — 한 줄짜리 textarea는 Input보다 시각 noise.
- form layout 너비를 textarea가 임의 resize-x로 깨뜨림 — `resize-y`만 허용.
- icon 내장 — 좌측 영역 점유가 본문 입력 흐름 방해.

## Migration notes

- 기존 shadcn `textarea.tsx`는 `bg-transparent` + Tailwind 기본 `px-3 py-2` + `text-base` — preview `.form-textarea` SoT(`bg-surface-input` + token padding + `body-md`)로 정정.
- transition은 `transition-colors` → `transition-[color,box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` 토큰 직접 인용.
- `resize-y` 기본 → `resize-none` 기본으로 정정 — form layout 안정성. resize 필요 시 className opt-in.
- preview `.form-textarea` `line-height: 1.6` 명시 — 한국어 본문 가독성. tsx에는 `body-md` 토큰의 line-height(1.5)와 별개로 명시 필요 시 `leading-[1.6]` 추가.
- popover 안 textarea는 caption 변형 — 다른 컨텍스트로 분리(spec Layout 섹션 참조).
