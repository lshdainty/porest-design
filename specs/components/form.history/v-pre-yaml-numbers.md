# Form

> react-hook-form 기반 form composition helper. **Form** (Provider) · **FormField** (Controller) · **FormItem** (group) · **FormLabel** · **FormControl** (Slot) · **FormDescription** · **FormMessage** 7 primitive로 검증·라벨링·에러 표시·접근성(aria) wiring을 자동화. spec은 시각 토큰(form-card / form-grid / form-group / form-label / form-helper / form-message / form-actions) + composition pattern 두 축을 다룬다.

Porest Form은 **단일 spec × 2 layouts(card / inline)** 매트릭스로 정의됩니다. preview `.form-*` SoT 정합 — form-card(`surface-default` + `radius-lg` + `shadow-sm` + 640 max) + form-grid(2-col → 1-col responsive) + form-group(`gap-xs` flex column) + form-label(Label spec 인용) + form-helper(`caption` + `text-tertiary`) + form-message(`body-sm` + 500 + `text-error`). RHF + Zod 조합으로 검증 메시지 자동 표시 + `aria-invalid` / `aria-describedby` 자동 wiring.

## Anatomy

```
layout 1 — card (HR 결재 신청 / Desk 메모 metadata)
┌─────────────────────────────────────────────────────────┐  ← ⓐ form-card
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │ ⓑ label *         │  │ ⓑ label           │            │
│  │ ⓒ input           │  │ ⓒ select          │  ← ⓓ grid │
│  │ ⓔ helper          │  │ ⓕ error message   │             │
│  └──────────────────┘  └──────────────────┘             │
│  ┌─────────────────────────────────────────────────────┐│
│  │ ⓑ label                                              ││
│  │ ⓒ textarea (full-row)                                ││
│  └─────────────────────────────────────────────────────┘│
│  ─────────────────────────────────────────────────────  │  ← ⓖ actions border
│                                       [취소] [저장]      │
└─────────────────────────────────────────────────────────┘

layout 2 — inline (login / search)
┌──────────────────────────────────────────────────────────┐
│ ⓑ label                                                   │
│ ⓒ input                                                   │
│ ⓔ helper                                                  │
│ [primary button — full width or auto]                     │
└──────────────────────────────────────────────────────────┘
```

| ⓐ form-card | `bg-surface-default` + `rounded-lg` + `p-2xl` + `shadow-sm` + `max-w-[640px]`. flex column + `gap-xl`. 모바일은 padding `xl`로 줄임. |
| ⓑ FormLabel | Label spec 인용 — `text-label-md` (14/500) + `text-primary`. required는 끝에 `*` red(`text-error font-medium`). error 시 `data-[error=true]:text-error`. |
| ⓒ FormControl | Slot — Input/Textarea/Select/Checkbox/Radio 등 wrap. id + aria-describedby + aria-invalid 자동 wire. |
| ⓓ form-grid | `grid grid-cols-2 gap-[var(--spacing-lg)_var(--spacing-xl)]`. 모바일 1-col. `has-[.form-textarea]:col-span-full` (textarea가 있는 group은 자동 full-row). |
| ⓔ FormDescription | helper text — `text-body-sm` + `text-text-secondary`. 보조 정보 (예: "도메인 포함 입력"). |
| ⓕ FormMessage | error text — `text-body-sm` + `font-medium` + `text-error`. RHF fieldState.error 자동 표시. |
| ⓖ form-actions | flex justify-end + `gap-md` + `border-t border-border-default` + `pt-lg`. primary(`btn`) + secondary(`btn-outline`) 2개 또는 단일 primary. |

**규칙**

- form-card 안 모든 group은 **form-group** 단위 — `flex flex-col gap-xs` (label · control · helper · message 세로 정렬).
- 한 group 안 helper · message는 **공존 가능** — 입력 전 helper(`text-tertiary` caption은 별도, FormDescription은 `text-secondary`) → 에러 시 message 추가 표시(helper는 시각적으로 보존).
- form-actions border-top은 form-card padding 안에 있어야 함 — `pt-lg` 만큼 시각적 분리. card padding(`2xl`)과 별도 영역.
- required marker `*`는 시각 + ARIA(`aria-required` 또는 `required`) 둘 다 — 색맹 대응(WCAG 3.3.7).

## Composition pattern

7 primitive 모두 `recipes/shadcn/components/ui/form.tsx`에 export. RHF + Zod 조합 가정.

```tsx
const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
});
const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[var(--spacing-xl)]">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일 *</FormLabel>
          <FormControl>
            <Input type="email" placeholder="user@porest.com" {...field} />
          </FormControl>
          <FormDescription>도메인 포함 입력</FormDescription>
          <FormMessage />  {/* RHF fieldState.error 자동 표시 */}
        </FormItem>
      )}
    />
    <Button type="submit">제출</Button>
  </form>
</Form>
```

| Primitive | 역할 | 시각 토큰 |
|---|---|---|
| `Form` | `FormProvider` 재export — RHF context 주입. | (시각 없음) |
| `FormField` | RHF `Controller` wrapper + `FormFieldContext` provider. `name` · `control` · `render` props. | (시각 없음) |
| `FormItem` | group wrapper — `flex flex-col gap-[var(--spacing-xs)]` (4px) + `FormItemContext` (`useId()`로 id 생성). | `gap-xs` |
| `FormLabel` | Label 컴포넌트 + `htmlFor={formItemId}` 자동. error 시 `data-[error=true]:text-error`. | Label spec 인용 — `text-label-md` (14/500) `text-primary` |
| `FormControl` | Radix `Slot` + `id` / `aria-describedby` / `aria-invalid` 자동 wire. children은 Input/Textarea/Select/Checkbox/Radio/Switch 등. | (children 시각) |
| `FormDescription` | helper text — `<p>` + `id={formDescriptionId}`. error 없을 때만 aria-describedby. | `text-body-sm text-text-secondary` |
| `FormMessage` | error text — RHF fieldState.error.message 자동 또는 children. error 없으면 null. | `text-body-sm font-medium text-error` |
| `useFormField()` | hook — id / name / formItemId / formDescriptionId / formMessageId / fieldState 반환. 커스텀 group 만들 때만 사용. | — |

## Layout

### Card layout (form-card)

| 항목 | 값 | 토큰 |
|---|---|---|
| Background | surface-default | `bg-surface-default` |
| Radius | lg (12px) | `rounded-lg` |
| Padding | 2xl (32px) | `p-2xl` |
| Shadow | sm | `shadow-sm` |
| Max width | 640px | `max-w-[640px]` |
| Inner direction | flex column | — |
| Inner gap (group 사이) | xl (24px) | `gap-xl` |

### Grid (form-grid)

| Breakpoint | Columns | gap (row · column) |
|---|---|---|
| ≥ md (768px) | 2 | `gap-[var(--spacing-lg)_var(--spacing-xl)]` (16 · 24) |
| < md | 1 | `gap-lg` (16) |

`textarea`를 포함한 group은 자동 full-row — `[&:has(.form-textarea)]:col-span-full`. 또는 className `col-span-full` 명시.

### Group (form-group / FormItem)

`flex flex-col gap-[var(--spacing-xs)]` (4px). label · control · helper · message 순.

- label은 control 위.
- helper(FormDescription)는 control 아래, error 없을 때 노출.
- message(FormMessage)는 helper 아래, error 시 노출 (helper 시각적으로 유지 가능 — Porest 정책: 둘 다 표시 가능, 줄바꿈으로 분리).

### Actions (form-actions)

- `flex justify-end gap-[var(--spacing-md)]` (12)
- `border-t border-border-default`
- `pt-[var(--spacing-lg)]` (16)
- 모바일에서 full-width 필요 시 `flex-col-reverse` + `w-full` 버튼 (primary 위, secondary 아래 — Touch target 우선).

## States

FormItem 자체 상태 없음 — control(Input/Select 등)이 visual 상태 보유. FormLabel · FormMessage 색만 error 분기.

| State | FormLabel | FormControl border | FormMessage 노출 | aria-invalid |
|---|---|---|---|---|
| `default` | `text-primary` | `border-default` | hidden | `false` |
| `focus` | `text-primary` | `border-focus` + ring 2px (control spec) | hidden | `false` |
| `error` | `text-error` (`data-[error=true]:text-error`) | `border-error` (control spec) | visible | `true` |
| `disabled` | `peer-disabled:opacity-70` | `opacity-50` | hidden | `false` |
| `readonly` | `text-primary` | `text-secondary` + `cursor-not-allowed` | hidden | `false` |

## Behavior

| 인터랙션 | 동작 |
|---|---|
| **검증 timing** | RHF 기본 `onSubmit`. `mode: "onBlur"` 또는 `"onChange"`로 변경 가능. Zod resolver는 schema 자동 적용. |
| **에러 표시** | submit 후 첫 에러 발생 시 모든 invalid field 표시 → 사용자가 수정 시 `mode: "onChange"`로 즉시 갱신. |
| **focus 이동** | submit 실패 시 첫 에러 field로 자동 focus (`shouldFocusError: true`, RHF 기본). |
| **disabled 제출** | submit 버튼은 form `isSubmitting` 시 disabled + Spinner 노출 (loading state). |
| **field 동기** | watch / setValue / reset / trigger — RHF API 그대로 사용. |
| **aria 자동 wire** | FormLabel htmlFor + FormControl id + FormDescription / FormMessage aria-describedby + aria-invalid 모두 useId 기반 자동 — 수동 wire 불필요. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.3.1** Info and Relationships | FormLabel `<label htmlFor>` + FormControl `id` 자동 wire. semantic 관계 명시. |
| **WCAG 1.4.3** Color contrast (FormLabel × bg-page) | `text-primary` × `bg-page` = 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (FormMessage error × bg-page) | `text-error` `#D32F2F` × `bg-page` = 5.0:1+ ✓ |
| **WCAG 2.4.6** Headings and Labels | FormLabel 텍스트는 명확한 의미 — "이메일", "예상 도착 시각" 등 모호한 "값"/"데이터" 금지. |
| **WCAG 2.4.7** Focus visible | FormControl은 control spec(Input/Select 등)의 `focus-visible:ring-2` 자동 적용. focus 시 시각 영향. |
| **WCAG 3.3.1** Error Identification | FormMessage가 error를 텍스트로 명시 — 색만 의존 안 함. `aria-invalid="true"` + role="alert" 또는 aria-live="polite" (FormMessage `<p>`에 자동). |
| **WCAG 3.3.2** Labels or Instructions | FormLabel 필수 — placeholder 단독 사용 금지. FormDescription은 보조 정보. |
| **WCAG 3.3.3** Error Suggestion | FormMessage 텍스트는 수정 방법 포함 — "올바른 이메일 형식이 아닙니다" (Zod default), 또는 "예: user@porest.com". |
| **WCAG 3.3.4** Error Prevention | 결제·삭제 등 financial/legal 작업은 confirm dialog 필수. Form 자체 아닌 flow 책임. |
| **WCAG 3.3.7** Redundant Entry | required `*` 색 + `aria-required="true"` 또는 `required` HTML attribute 둘 다. |
| **ARIA** | FormControl이 aria-describedby로 description id(error 없을 때) 또는 description + message id(error 시) wire — RHF + useFormField hook 자동. |

## Do / Don't

### ✅ Do

- **FormField로 wrap** — Controller 없이 raw input + form context 직접 사용 금지. validation · error · aria wiring 모두 끊김.
- **FormMessage 비우기** — children 없이 `<FormMessage />` 사용 시 RHF fieldState.error.message 자동 표시. zod schema의 message가 SoT.
- **required는 시각 + ARIA 둘 다** — label에 `*` red + HTML `required` 또는 `aria-required="true"`.
- **form-actions는 border-top으로 분리** — `pt-lg` + `border-t border-border-default`. card padding과 시각적 위계.
- **textarea group은 full-row** — `col-span-full` 또는 `has-[.form-textarea]` selector. 2-col grid에서 줄바꿈 안 어색하게.
- **검증 메시지는 수정 방법 포함** — "올바르지 않습니다"보다 "올바른 이메일 형식이 아닙니다 (예: user@porest.com)" 또는 "비밀번호는 8자 이상이어야 합니다".

### ❌ Don't

- placeholder를 FormLabel 대용으로 — 입력 시 사라져 컨텍스트 손실(WCAG 3.3.2 위반). Label은 항상 control 위.
- FormMessage 색만으로 error 표시 — `text-error` 색 + icon · prefix("오류:") · ARIA `role="alert"` 같이 (WCAG 1.4.1).
- form-actions를 form-card 밖에 — card 패딩이 actions 영역까지 포함해야 정렬 일관.
- 모바일에서 2-col 강제 — `<md`에서 1-col fallback, 모바일 입력 영역 좁아짐 방지.
- 검증 timing을 `onChange`로 무조건 — 사용자 타이핑 중 에러 깜빡임 거슬림. submit + onBlur 조합 권장 (zod + RHF 기본).
- FormControl 안에 여러 input — Slot은 단일 child. 복합 control은 별도 FormField로.

## Migration notes

- **`space-y-2` → `flex flex-col gap-xs`** — shadcn 기본 FormItem `space-y-2`(8px)는 preview `.form-group` SoT(`gap: var(--spacing-xs)` 4px)와 충돌. Label spec(`Layout > Form` 섹션)도 4px 명시. tsx에서 명시적 토큰 인용으로 정정.
- **FormLabel `text-sm` → Label 컴포넌트 직접 사용** — Label 컴포넌트가 이미 `text-label-md` (14/500) + `text-primary` + `leading-none` 보유. FormLabel은 Label에 `data-[error=true]:text-error`만 추가.
- **FormControl Slot** — Radix `Slot`은 children에 props를 forward. children은 단일 element여야 함(여러 element 시 Slot에러).
- **FormMessage `text-error`** — preview `.form-message` 또는 examples ERROR 톤 SoT. `text-body-sm` + `font-medium` + `text-error` 고정.
- **form-card vs form-grid 분리** — card는 panel(`surface-default` + `shadow-sm`), grid는 내부 layout. 두 layer 독립.
- **textarea 자동 full-row** — `has-[.form-textarea]:col-span-full` Tailwind v4 `has()` selector. 모든 브라우저 지원(2023+). 폴백 필요 시 `col-span-full` className 명시.
- preview-html `.form-actions` border-top과 padding-top — card padding(2xl) **안에서** actions 영역 시각 분리. flex-end로 우측 정렬.
- responsive — `@media (max-width: 768px)` 에서 form-grid `1fr`로 fallback. preview-html SoT에 이미 명시(line 3793).
