# Spinner

> 모름(indeterminate) 상태의 작업 진행을 시각화하는 원형 회전 인디케이터. 진행도(%)를 모를 때 사용 — 진행도를 알 수 있다면 [Progress](./progress.md)를 사용한다.

shadcn/ui 표준 카탈로그에는 없지만 디자인 시스템에 명시 정의된 컴포넌트. circular indeterminate 표현 — 360deg 회전 + 270deg(3/4) arc로 시각적 회전 인지.

## Anatomy

```
       ╭─╮
      ╱   ╲     ⓐ track (surface-input — 회전 안 보이는 부분)
     │     │   ⓑ arc (primary — 270deg, 3/4)
      ╲   ╱
       ╰─╯
```

| ⓐ track | `border` 두께만큼의 원형 베이스. 색은 `surface-input`. |
| ⓑ arc | `border-top-color`만 `primary`(라이트) / `primary-light`(다크) — 회전 시 시각적으로 호(arc)로 보임. |

## Variants

Spinner는 **variant 없음** — 단일 시각, size만 분기.

## Sizes

| Size | Diameter | Stroke | 사용처 |
|---|---|---|---|
| `sm` | 16px | 2px | inline (텍스트 옆 — "메모 저장 중…") |
| `md` *(default)* | 24px | 2px | 카드 안 로딩, 폼 제출 중 |
| `lg` | 32px | 3px | 섹션 로딩, modal 안 |
| `xl` | 48px | 4px | full-page 로딩 (가운데 + 라벨) |

Tailwind utility 매핑 (spinner.tsx cva):
- `sm`: `size-4 border-2`
- `md`: `size-6 border-2`
- `lg`: `size-8 border-[3px]`
- `xl`: `size-12 border-4`

## Color

| 모드 | arc 색 | track 색 |
|---|---|---|
| Light | `--color-primary` (브랜드: HR `#357B5F` / Desk `#0147AD`) | `--color-surface-input` (`#F0F2F7`) |
| Dark | `--color-primary-light` (브랜드: HR `#6BAE8C` / Desk `#5FA0E5`) — `[data-theme="dark"]` cascade 자동 swap | `--color-surface-input-dark` (`#2D3346`) |

다크 모드에서 `primary-light`로 자동 swap돼 어두운 표면 위에서 시인성 확보 (button focus ring과 동일 패턴).

## Animation

| 항목 | 값 |
|---|---|
| 회전 | 360deg `transform: rotate(360deg)` |
| Duration | `motion-duration-loop` (1500ms) |
| Easing | `motion-ease-linear` (linear — 회전이 일정 속도여야 자연스러움) |
| Iteration | infinite |
| Arc 길이 | 270deg (3/4) — 시각 회전 인지에 충분, 360deg 완전 채우면 회전 안 보임 |

CSS 키:

```css
@keyframes sp-spin {
  to { transform: rotate(360deg); }
}
.spinner {
  border: 2px solid var(--color-surface-input);
  border-top-color: var(--color-primary);
  border-radius: 9999px;
  animation: sp-spin var(--motion-duration-loop) var(--motion-ease-linear) infinite;
}
```

`border-top-color`만 다른 색으로 두어 자동 270deg arc 생성.

## Layout

**Inline (텍스트 옆)**

- spinner `sm` (16px) + `gap-2` (8px) + 라벨 `text-body-md text-text-secondary`
- 예: `<Spinner size="sm" /> 메모 저장 중…`

**Standalone (full-page 로딩)**

- 가운데 spinner `xl` (48px) + 아래 라벨 `text-body-lg text-text-secondary` + `gap-4` (16px)
- 컨테이너에 `min-h-[60vh] flex items-center justify-center`

**Card / form 제출 중**

- 버튼 안 leading icon 위치에 spinner `sm` (16px) — `<Button disabled><Spinner size="sm" /> 저장 중…</Button>`
- 카드 안 로딩은 `md` (24px) 가운데 정렬

## Behavior

- 자동 회전 — 별도 trigger 없음. mount 시점에 즉시 회전 시작.
- 작업 완료 시 즉시 unmount — 정체 회피 (DESIGN.md 5초 룰).

## Reduced motion

`prefers-reduced-motion: reduce` 시 회전 정지. 다만 사용자가 로딩 인지하지 못하므로 `aria-live` 알림은 유지.

```css
@media (prefers-reduced-motion: reduce) {
  .spinner { animation: none; }
}
```

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast | spinner는 비텍스트 — 1.4.11 적용. arc `--color-primary` × 인접 표면 `surface-input` = 3.96:1 (HR) / 4.5:1+ (Desk) ✓ |
| **WCAG 1.4.11** Non-text contrast (UI ≥ 3:1) | ✓ 위 calc |
| **WCAG 2.2.2** Pause/Stop/Hide | 5초 이상 indeterminate 지속 시 timeout/refresh 안내 (Skeleton과 동일 패턴) |
| **WCAG 2.3.1** Three Flashes | 회전 — flash 아님(연속 motion). 통과. |
| **ARIA** | `role="status"` + `aria-live="polite"` + 보이지 않는 텍스트(`<span className="sr-only">로딩 중</span>`). standalone일 땐 라벨이 보이는 텍스트로 충분. |

## Do / Don't

### ✅ Do

- 진행도(%)를 알 수 없을 때만 사용 — 알 수 있으면 [Progress determinate](./progress.md) 사용.
- 5초 이상 spinner가 돌면 "느려지는 중…" 또는 "재시도" 버튼을 동반.
- inline은 `sm`, 카드 안은 `md`, modal/section은 `lg`, full-page는 `xl` — size 분기 명확히.
- 텍스트 옆 inline spinner는 항상 라벨 동반 ("저장 중…", "불러오는 중…").

### ❌ Don't

- 단순 클릭 후 즉시(<300ms) spinner 표시 — 깜빡임 유발. delay 200ms 권장.
- spinner만 두고 라벨 없이 — 무엇을 기다리는지 모호.
- spinner 색을 임의로 변경 — `primary` 토큰만. (다크는 자동 swap)
- skeleton과 spinner를 같은 영역에 동시 — 둘 중 하나만 (skeleton은 placeholder, spinner는 active 진행).
