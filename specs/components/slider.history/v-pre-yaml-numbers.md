# Slider

> 연속/단계적인 숫자 값을 시각적으로 선택하는 컨트롤. 볼륨·밝기·가격 범위·진행률 조정처럼 정확한 숫자보다 **상대적 위치**가 의미 있는 입력에 사용. Radix `Slider` 베이스(키보드 + 드래그 + 다중 thumb).

Porest Slider는 **단일 spec × 2 modes(single thumb / range)** 매트릭스로 정의됩니다. preview `.sld-*` SoT 정합 — Track: 4px 두께 `surface-input` + `radius-full`. Fill: `primary` 채움. Thumb: 16×16 흰색 채움(`text-on-accent`) + 2px `primary` 외곽선 + `shadow-sm`. 다크 모드에서도 thumb은 흰색 유지 — `text-on-accent`는 dark-swap 대상이 아니라 모든 테마에서 #FFFFFF 고정.

## Anatomy

```
              ⓒ thumb (16×16, 흰색 + primary ring)
                 ▼
─────●═════════○──────────────────  ← ⓐ track (4px height)
     ▲         ▲
     │         └─ thumb 위치 = value
     └─ ⓑ fill (left → thumb, primary)

[meta]  min 값                 max 값  ← ⓓ 캡션 (선택)
```

| ⓐ track | preview `.sld-track` 그대로 — `position:relative; width:100%; height:4px; background:var(--color-surface-input); border-radius:var(--radius-full);` |
| ⓑ fill (Range) | preview `.sld-fill` 그대로 — `height:100%; background:var(--color-primary); border-radius:var(--radius-full);` 시작점에서 thumb 위치까지(또는 range mode에선 두 thumb 사이). |
| ⓒ thumb | preview `.sld-thumb` 그대로 — `width:16px; height:16px; background:var(--color-text-on-accent); border:2px solid var(--color-primary); border-radius:var(--radius-full); box-shadow:var(--shadow-sm);` 다크 모드에서도 흰색 유지. |
| ⓓ meta (선택) | `display:flex; justify-content:space-between; font-size:var(--text-caption); color:var(--color-text-tertiary); margin-top:var(--spacing-md);` — min/max 또는 현재값 표시. |

**규칙**

- thumb 채움은 **`text-on-accent` 고정**(흰색) — 다크 모드에서 `surface-default`로 채우면 dark-swap으로 어두워져 안 보임. `text-on-accent`는 swap 대상 아님이라 모든 테마에서 흰색.
- track 두께 4px / thumb 16px — 모바일 터치 hit area는 thumb 자체보다 큰 padding 영역(touch-none 처리 + Radix 자동)으로 확보.
- meta 텍스트는 thumb 위치와 시각 분리되도록 `margin-top:var(--spacing-md)` — 너무 가까우면 thumb과 겹쳐 보임.

## Variants (mode)

| Mode | Thumb 수 | Fill 방향 | 사용처 |
|---|---|---|---|
| `single` *(default)* | 1 | 시작점 → thumb | 볼륨, 밝기, 단일 값 조정. |
| `range` | 2 | 두 thumb 사이 | 가격 범위, 기간 범위 (`min ~ max`). |

Mode는 Radix `value`/`defaultValue`가 배열 길이로 자동 결정 — `[50]` single / `[20, 80]` range.

## Sizes

Slider는 **size variant 없음** — 단일 spec(track 4px / thumb 16px). 사용처에서 `className`으로 폭 조정.

| 항목 | 값 | 토큰 |
|---|---|---|
| Track height | 4px | `h-1` |
| Track radius | full | `var(--radius-full)` |
| Track background | `surface-input` | `bg-surface-input` |
| Fill background | `primary` | `bg-primary` |
| Thumb size | 16×16 | `h-4 w-4` |
| Thumb background | `text-on-accent` (#FFFFFF 고정) | `bg-text-on-accent` |
| Thumb border | 2px solid `primary` | `border-2 border-primary` |
| Thumb shadow | shadow-sm | `var(--shadow-sm)` |
| Padding (touch area) | `spacing-sm` Y | `py-[var(--spacing-sm)]` |

## States

| State | Track | Fill | Thumb | Ring |
|---|---|---|---|---|
| `enabled` | `surface-input` | `primary` | `text-on-accent` + 2px `primary` | — |
| `hover` (thumb) | — | — | (cursor: grab) | — |
| `focus-visible` (thumb) | — | — | — | `ring-2 ring-ring ring-offset-2` |
| `active / dragging` | — | — | (cursor: grabbing) | — |
| `disabled` | `surface-input` opacity 0.5 | `primary` opacity 0.5 | opacity 0.5 + `pointer-events-none` | — |

Transition: `transition-[box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` — hover/focus 시 부드럽게.

## Layout

**Single slider with meta**

- slider 위에 label, 아래에 `meta` row (min · max 또는 현재값). Label은 [`Label`](label.md) — `label-md` (14/500).
- 사용자 입력값 표시는 meta 안 strong 텍스트(`text-primary` 600) — "현재 값: 65%" 같은 명시적 노출.

**Range slider**

- 두 thumb. fill은 두 thumb 사이만 채움. meta는 `최소값 ~ 최대값` 형태로 표기.

**Form integration**

- Label + Slider + helper 세트는 `flex flex-col gap-[var(--spacing-xs)]`. helper text는 `caption` `text-tertiary`.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Thumb drag | 마우스/터치 드래그로 값 변경. Radix가 touch + mouse 모두 처리. |
| Track click | 클릭 위치로 thumb jump (Radix 기본). |
| `ArrowLeft` / `ArrowRight` (thumb focus) | 1 step 감소/증가. |
| `ArrowUp` / `ArrowDown` | 1 step 증가/감소 (horizontal slider). |
| `Home` / `End` | 최소/최대값. |
| `PageUp` / `PageDown` | 10 step (또는 `step * 10`) 증감. |
| Disabled | 모든 인터랙션 차단. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (fill `primary` × track `surface-input`) | HR `#357B5F` × `#F0F2F7` = 4.7:1 ✓ / Desk `#0147AD` × `#F0F2F7` = 9.5:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (thumb border × fill) | `primary` border × `text-on-accent` 채움 = 4.7:1+ ✓ — thumb이 fill 위에 있어도 시각 식별. |
| **WCAG 1.4.11** Non-text contrast (track × bg-page) | `surface-input` × `bg-page` = 1.05:1 — 단독 약함이나 fill `primary` 채움이 시각 식별 보강. |
| **WCAG 2.1.1** Keyboard | 모든 값 변경이 키보드만으로 가능 (Arrow / Home / End / PageUp / PageDown). |
| **WCAG 2.4.7** Focus Visible | thumb `focus-visible:ring-2 ring-ring ring-offset-2`. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | thumb 16px — 미달(⚠). Radix는 thumb 외부 padding(touch-none) 영역으로 hit area 확장하나 시각 thumb은 16. 모바일 우선 화면이면 thumb 사이즈 키울 것 고려. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | thumb 16 — 미달(⚠). 표준 패턴이나 정확도가 필요한 입력은 별도 number input 병행 권장. |
| **ARIA** | Radix가 `role="slider"` + `aria-valuemin` / `aria-valuemax` / `aria-valuenow` / `aria-orientation` 자동 부여. `aria-label` 또는 `aria-labelledby` 명시 권장. |

## Do / Don't

### ✅ Do

- 정확한 숫자보다 **상대적 위치**가 의미 있는 입력에 사용 — 볼륨 / 밝기 / 가격 범위 / 진행률.
- meta로 현재값 명시 — slider만으로는 정확한 값 모름. 캡션에 "현재 65%" 같이 노출.
- step prop으로 단계 정의 — 5의 배수(0/5/10/15…) 같은 의미 있는 간격.
- range mode는 같은 의미의 두 값(min/max)일 때만 — 다른 의미면 별도 slider 2개로 분리.

### ❌ Don't

- 정확한 숫자 입력이 필요한 곳 — Input(`type="number"`)로. slider는 정밀 입력에 부적합.
- 옵션이 3개 이하 — RadioGroup/Tabs로. slider는 연속 값 또는 다단계(5+) 입력에 적합.
- thumb 채움을 `surface-default`로 — 다크 모드에서 안 보임. **`text-on-accent` 고정** 유지.
- track을 너무 두껍게(8px+) — 시각 noise. 4px가 절제된 톤.

## Migration notes

- 기존 shadcn `slider.tsx`는 thumb `bg-background` (`surface-default` alias) — 다크 모드 dark-swap으로 thumb 안 보이는 버그. `bg-text-on-accent`로 정정(흰색 고정).
- thumb `h-5 w-5`(20px) → `h-4 w-4`(16px) — preview `.sld-thumb` SoT 정합.
- track `h-1.5`(6px) → `h-1`(4px) — preview `.sld-track` SoT 정합 (Toss 톤 절제).
- transition은 `transition-colors` → `transition-[box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` 토큰 직접 인용.
- thumb의 ring offset color를 `ring-offset-bg-page`로 명시 — focus ring이 페이지 배경과 분리.
