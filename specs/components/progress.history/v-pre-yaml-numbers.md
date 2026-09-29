# Progress

> 작업 진행도(0–100%)를 시각화하는 가로 바. 진행도를 알 수 있을 때 사용 — 모를 때는 [Spinner](./spinner.md) 또는 progress indeterminate 모드.

Radix Progress 베이스. 단일 트랙 + indicator로 width transition. determinate(채우기)와 indeterminate(sweeping) 두 모드.

## Anatomy

```
┌──────────────────────────────────────┐
│ ⓐ track (surface-input)              │
│ ████████████████░░░░░░░░░░░░░░░░░░░░ │
│ ⓑ indicator (primary)                │
└──────────────────────────────────────┘
   ⓒ meta (선택) — "1.2MB / 1.9MB"  62%
```

| ⓐ track | 회색 베이스. `surface-input` 채움, `radius-full` (알약). |
| ⓑ indicator | primary 색 채움. width 0–100% 또는 sweeping gradient. |
| ⓒ meta | 트랙 아래 좌/우 라벨 (선택). `caption` (12/400) `text-tertiary`. |

## Variants (mode)

| Mode | 시각 | 사용처 |
|---|---|---|
| `determinate` *(default)* | width 0–100% 채우기 | 업로드/다운로드, 단계 진행 |
| `indeterminate` | 30% width gradient sweeping (좌→우) | 처리 중이지만 진행도 모름 — spinner의 가로 변형 |

## Sizes

| Size | Height | 사용처 |
|---|---|---|
| `sm` | 2px | inline (한 줄 안에 끼워) |
| `md` *(default)* | 4px | 표준 — 폼 위, 카드 안 |
| `lg` | 8px | 큰 작업 (다운로드, 업로드) |

Tailwind utility 매핑 (progress.tsx cva):
- `sm`: `h-0.5`
- `md`: `h-1`
- `lg`: `h-2`

## Color

| 모드 | track | indicator |
|---|---|---|
| Light | `--color-surface-input` (`#F0F2F7`) | `--color-primary` (브랜드) |
| Dark | `--color-surface-input-dark` (`#2D3346`) — cascade 자동 | `--color-primary-light` (브랜드) — cascade 자동 |

다크 모드에서 indicator는 `primary-light`로 swap (Spinner와 동일 패턴 — `[data-theme="dark"]` cascade).

특수 색:
- `success` (완료 도달 시) — 99% → 100% 도달하면 `success`로 fade. (선택, 사용처 className으로)
- `error` (실패) — 진행 중 실패 시 `error` 채움 + 정지.

## Animation

**Determinate**

- width transition: `motion-duration-base` (200ms) `motion-ease-out`
- value 변화 시 부드러운 채우기

**Indeterminate (sweeping)**

```css
@keyframes sp-sweep {
  0%   { left: -30%; }
  100% { left: 100%; }
}
.indicator-indeterminate {
  width: 30%;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  animation: sp-sweep var(--motion-duration-loop) var(--motion-ease-linear) infinite;
}
```

좌측 -30% 시작 → 우측 100% 종료 — 30% 너비의 gradient가 좌→우 흐름.

## Layout

**Standalone**

- `w-full` — 부모 컨테이너 폭 채움.
- 위 `text-label-md` 라벨 + 아래 progress + 그 아래 meta(좌/우 정렬). `gap-2` (8px).

**With meta (preview.html 의 톤)**

```tsx
<div className="space-y-2">
  <div className="flex items-baseline justify-between">
    <span className="text-label-md font-medium">Determinate progress</span>
    <span className="text-caption text-text-tertiary">62%</span>
  </div>
  <Progress value={62} />
  <div className="flex justify-between text-caption text-text-tertiary">
    <span>1.2MB / 1.9MB</span>
    <span>62%</span>
  </div>
</div>
```

**Inline**

- 텍스트 안에 끼울 땐 `sm` size + `inline-flex` + 폭 명시 (`w-32` 등).

## Behavior

- determinate: `value` prop 0–100 — Radix가 자동 indicator translate.
- indeterminate: `value` 미지정 또는 명시적 indeterminate 모드 — sweeping animation.
- 100% 도달 시: 진행 바 그대로 두지 말고 다음 상태(완료 alert / 다음 페이지)로 전이 — 정체 회피.

## Reduced motion

`prefers-reduced-motion: reduce` 시:
- determinate transition 비활성 (즉시 width 변화)
- indeterminate sweeping 비활성 → 단색 fallback (`bg-primary/30` 정도)

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.11** Non-text contrast (UI ≥ 3:1) | indicator `primary` × track `surface-input` = 3.96:1+ ✓ |
| **WCAG 2.2.2** Pause/Stop/Hide | indeterminate 5초 이상 시 사용자에게 안내 |
| **ARIA (determinate)** | `role="progressbar"` + `aria-valuenow="62"` + `aria-valuemin="0"` + `aria-valuemax="100"` + `aria-label="업로드 진행"` |
| **ARIA (indeterminate)** | `role="progressbar"` + `aria-busy="true"` + 라벨로 "처리 중" |

Radix Progress가 위 ARIA를 자동 적용 — 사용처는 `aria-label`만 명시.

## Do / Don't

### ✅ Do

- 진행도를 알 수 있으면 determinate, 모르면 indeterminate. 둘 중 하나로 명확히.
- 100% 도달 시 즉시 다음 상태 — progress 바 그대로 두지 말 것.
- meta 라벨은 사용자에게 의미 있는 단위 (1.2MB / 1.9MB, 3 / 5 단계) — 단순 % 외에.
- 큰 작업(>5초)에는 cancel 버튼 동반.

### ❌ Don't

- 클릭 직후(<300ms) progress 표시 — 깜빡임 유발. 200ms delay 권장.
- determinate value 안 줌 + indeterminate도 명시 안 함 → 사용자 혼동 (Radix는 value 없으면 indeterminate로 간주, 이를 의도적으로 명시).
- progress 색을 임의로 — `primary` 토큰만. 완료 시 `success`, 실패 시 `error`로만 분기.
- spinner와 progress를 같은 영역 동시 표시 — 둘 중 하나로.
