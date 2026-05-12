# AlertDialog

> 비가역(되돌릴 수 없는) 사용자 결정 확정용 modal. 일반 form/정보 표시는 [`dialog.md`](dialog.md). overlay/Escape로 닫히지 않고 명시적 button 선택만 받음.

Porest AlertDialog는 시각적으로는 `Dialog`와 **완전히 동일** (같은 토큰 · 같은 사이즈 · 같은 모션)이지만 **의미 · 동작 · 행동 가이드가 다름**. 메시지 강도와 close 경로 제한이 차이의 핵심.

| 구분 | Dialog | AlertDialog |
|---|---|---|
| 시각 | 동일 | 동일 |
| Overlay click | close | **무시 (close 안 됨)** |
| Escape | close | **무시 (옵션, 위험도 따라)** |
| Close button (X) | 있음 | **없음** (명시적 button만) |
| Default focus | 첫 focusable | **Cancel button**(실수로 Enter 누름 방지) |
| 사용처 | form, 정보 확인, 콘텐츠 편집 | 삭제 확정, 권한 회수, 결제 확정 등 비가역 |

## Anatomy

```
┌────────────────────────────────────────────────────────┐
│ ⓐ overlay (page-wide dim · click 무시)                 │
│       ┌─────────────────────────────────────┐          │
│       │ ⓑ container                         │          │
│       │                                     │          │
│       │ ⓒ title (display-sm)                │          │
│       │ ⓓ description (body-md, secondary)  │          │
│       │   "이 작업은 되돌릴 수 없습니다."    │          │
│       │                                     │          │
│       │ ⓔ footer                            │          │
│       │              [Cancel] [Destructive] │          │
│       └─────────────────────────────────────┘          │
└────────────────────────────────────────────────────────┘
```

| ⓐ overlay | dialog와 동일하나 **click 무시**. |
| ⓑ container | dialog와 동일 — preview `.modal-dialog` 그대로 (`background:var(--color-surface-default); border-radius:var(--radius-xl); padding:var(--spacing-2xl); box-shadow:var(--shadow-xl); width:min(90%, <max-w>); display:flex; flex-direction:column; gap:var(--spacing-md);`). close button(X) **없음**. |
| ⓒ title | preview `.modal-title` 그대로 — `font-size:var(--text-display-sm); font-weight:700; line-height:var(--text-heading-lg--line-height); color:var(--color-text-primary); letter-spacing:-0.01em;`. 결정 질문형 또는 결과 명시. |
| ⓓ description | preview `.modal-description` 그대로 — `font-size:var(--text-body-md); color:var(--color-text-secondary); line-height:1.6;`. **결과·영향**을 명시. |
| ⓔ footer | preview `.modal-actions` 그대로 — `display:flex; gap:var(--spacing-sm); justify-content:flex-end; margin-top:var(--spacing-md);`. Cancel(좌) + Action(우, destructive). focus default = Cancel. |

**규칙**

- close button (X) 두지 말 것 — 사용자가 결정을 회피하지 못하게 함.
- description은 **결과** 명시 필수 ("되돌릴 수 없음", "영구 삭제", "권한 회수").
- Action label은 결정 행위를 직접 표현 ("삭제", "회수", "결제") — 모호한 "확인" 금지.

## Variants

본체 시각 variant 없음 — `Dialog`와 동일. **action variant**(destructive vs primary)는 footer button으로 표현.

| Action variant | Button variant | 사용 |
|---|---|---|
| `destructive` (default) | `button.destructive` (error 색 채움) | 삭제, 회수, 영구 비활성 등 비가역 위험 액션. |
| `primary` | `button.default` (primary 색 채움) | 발행, 결제 같이 비가역이지만 위험은 아닌 액션. |

## Sizes

`Dialog`와 동일 — `sm` 384 / `md` 480(default) / `lg` 640. 본문이 짧으면 `sm` 권장 (확정 dialog는 정보 압축).

## States

| State | Overlay | Container | Body scroll | Default focus |
|---|---|---|---|---|
| `closed` | 미렌더 | 미렌더 | 정상 | trigger |
| `open` | dim 활성 | 화면 가운데 | lock | **Cancel button** |
| transitioning | dialog와 동일 | dialog와 동일 | — | — |

Default focus가 Cancel인 것이 핵심 — Enter를 무심코 눌렀을 때 destructive action이 실행되는 사고 방지(특히 form 안에서 trigger를 누르고 바로 Enter 누르는 패턴).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Trigger click | open. trigger element 기억(닫힘 시 focus 복귀). |
| Overlay click | **무시 (close 안 됨)** — 명시적 선택 강제. |
| `Escape` | 무시 (위험도 낮으면 옵션으로 cancel 동등 처리 가능, 기본은 무시). |
| Cancel button click | close. trigger로 focus 복귀. action 미실행. |
| Action button click | action 실행 + close. trigger로 focus 복귀. |
| `Tab` / `Shift+Tab` | container 안에서만 순환 (focus trap). |
| Body scroll | dialog 열림 동안 `overflow: hidden`. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3 / 1.4.11 / 2.4.7 / 2.4.11** | Dialog와 동일 — `surface-default` × `text-*` 대비, focus ring 시인성. |
| **WCAG 2.1.2** No Keyboard Trap | focus trap은 의도. Cancel button으로 빠져나갈 수 있어 충족. |
| **WCAG 3.3.4** Error Prevention (Legal/Financial/Data) AA | 비가역 액션은 사용자가 "확인하고 진행"하도록 명시적 단계 필수 — AlertDialog가 그 단계. ✓ |
| **WCAG 3.3.6** Error Prevention (All) AAA | 모든 사용자 제출에 확인 단계 — 사이트가 AAA 추구 시 AlertDialog 활용. |
| **ARIA** | `role="alertdialog"` + `aria-modal="true"` + `aria-labelledby` + `aria-describedby`. Radix 기본 처리. `role="alertdialog"`이 `role="dialog"`보다 강한 의미(스크린리더가 즉시 announce). |
| **Default focus** | Cancel (실수 방지). |

## Do / Don't

### ✅ Do

- title은 결정 질문형 ("정말 삭제하시겠어요?", "지금 발행할까요?").
- description은 결과 명시 ("이 작업은 되돌릴 수 없습니다", "발행 후 즉시 공개됩니다").
- destructive action label은 행위 직접 표현 ("영구 삭제", "권한 회수").
- Cancel을 default focus로 — Enter 사고 방지.
- 위험 액션(삭제/회수/탈퇴/결제 확정)에 사용 — 일반 form 입력은 `Dialog`.

### ❌ Don't

- close button (X) 두기 — 사용자가 결정을 회피하지 못하게 함.
- overlay click으로 닫히게 — 실수 닫힘으로 결정 미루기 안 됨.
- Action button을 default focus로 — Enter 사고 직결.
- 모호한 label ("확인", "OK", "Yes") — 결정 행위를 명시.
- AlertDialog 안에 form 입력 — 결정만 받음. 입력은 `Dialog`.
- 페이지에 AlertDialog 여러 개 겹침 — 사용자 혼란.

## Migration notes

- 기존 `alert-dialog.tsx`는 `dialog.tsx`와 동일한 토큰 부재(`p-6`, `rounded-md`, `shadow-lg`, title `text-title-lg`) 사용 — 이번 동기에서 `Dialog`와 함께 preview `.modal-*` 톤으로 정렬, 픽셀 하드코딩 대신 `--spacing-2xl`/`--spacing-md` 토큰 직접 인용.
- **AlertDialogTitle 하단 border 제거**: Radix `AlertDialogPrimitive.Title`도 `<h2>`를 렌더해 Dialog와 동일한 충돌이 있었음. `build-site.mjs`의 `.content h2` → `.content > h2` selector 격리로 자동 해소(상세는 [`dialog.md`](dialog.md) Migration notes 참조).
- 기존 `AlertDialogCancel`은 `outline` variant 그대로 — 변경 없음.
- 기존 `AlertDialogAction`은 default(primary) — destructive 사용 시 `className={cn(buttonVariants({ variant: "destructive" }))}` 명시 패턴 유지. spec에선 destructive를 default action variant로 권장.
- preview-html의 `renderShadcnDisclose` 안 `.ad-*`(icon-circle 변형)도 `.modal-*` 톤으로 정렬 — title-sm → display-sm으로 통일.
- **box-shadow는 Tailwind utility(`shadow-xl`) 대신 inline `style={{ boxShadow: "var(--shadow-xl)" }}` 사용** — Dialog와 동일한 fix. Tailwind v4 `--tw-shadow-*` 분해 처리가 다크 모드 CSS 변수 override를 우회하는 문제. preview `.modal-dialog` SoT와 다크 모드 정합 보장. 상세는 [`dialog.md`](dialog.md) Migration notes 참조.
