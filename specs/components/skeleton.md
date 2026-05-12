# Skeleton

> 데이터 로딩 중 콘텐츠 자리를 보존하는 **placeholder 박스**. 텍스트/이미지/avatar 모양으로 className 조정해 곧 나타날 콘텐츠 윤곽을 미리 시각화 — CLS(Cumulative Layout Shift) 방지 + 사용자 인지 부담 감소. shadcn `Skeleton` 베이스 — 단순 div + animation.

Porest Skeleton은 **단일 spec × 2 animation variants(pulse / shimmer)** 매트릭스로 정의됩니다. base는 `bg-surface-input` + `rounded-sm` 박스. animation은 토큰화된 `@keyframes pulse`(opacity 깜빡임, 기본) 또는 `@keyframes shimmer`(sweep gradient, 옵션) 선택. shape는 className으로 조정 — `h-4 w-32` 텍스트 라인, `h-10 w-10 rounded-full` avatar, `h-32 w-full` 카드 이미지 등.

## Anatomy

```
single line:
┌────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░│  ← bg-surface-input + animate-pulse
└────────────────────────┘

avatar + text rows:
○░░░░  ░░░░░░░░░░░░░░░░░░
       ░░░░░░░░░░░░░

card placeholder:
┌────────────────────────┐
│                        │
│       (image)          │ h-32 w-full
│                        │
└────────────────────────┘
░░░░░░░░░░░░░░░         ← h-5 w-3/4 (title)
░░░░░░░░░░░░░░░░░░░░    ← h-3 w-full
░░░░░░░░░░░░░░░         ← h-3 w-5/6
```

| ⓐ root | `<div>` — `animate-pulse rounded-sm bg-surface-input` + 사용처 `h-*`/`w-*`/`rounded-*` className으로 shape 결정. |
| ⓑ pulse animation | Tailwind `animate-pulse` (= `@keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }`, 2s loop). Porest tokens.css의 `@keyframes pulse` 정의 동일 효과. |
| ⓒ shimmer animation (옵션) | `relative overflow-hidden bg-surface-input` + 자식 `absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/25 to-transparent animate-[shimmer_var(--motion-duration-loop)_linear_infinite]`. preview-html `.anim-shimmer` SoT. |

**규칙**

- 색은 `bg-surface-input` — 본문 텍스트 영역 위에서 자연스러운 placeholder 톤. shadcn 기본 `bg-muted` 정합(Porest `surface-input`이 등가). `border-default`는 너무 강해 placeholder로 부적합.
- shape는 className으로만 조정 — base는 박스만, 사용처가 텍스트 라인 / avatar / 이미지 영역 비율 결정.
- 텍스트 라인 placeholder는 실제 폰트 line-height와 가깝게 — `text-body-md`(15px line-height 24) → `h-4`(16px) skeleton. 사용자가 텍스트 자리를 정확히 인지.
- avatar는 `h-* w-* rounded-full` — [`Avatar`](avatar.md) 사이즈(sm 32 / md 40 / lg 48 / xl 64) 정합.
- pulse vs shimmer 선택 — 단순 로딩이면 `pulse`(가벼움), 시각 강조가 필요하면 `shimmer`(더 풍부, 약간 무거움). 한 페이지 안 통일 권장(섞으면 시각 noise).
- 다수 skeleton stack 시 동일 animation — 시각 통일.
- `prefers-reduced-motion: reduce` 시 animation 자동 비활성 (preview-html `.anim-*::after` 패턴 동일).

## Variants (animation)

| Variant | Animation | 시각 | 사용처 |
|---|---|---|---|
| `pulse` *(default)* | `animate-pulse` (opacity 1↔0.5) | 단순 깜빡임 | 기본 로딩 — list/card/text placeholder. 시각 가벼움. |
| `shimmer` | sweep gradient (`@keyframes shimmer` translateX -100% → 100%) | 좌→우 빛 sweep | 강조 로딩 — hero image, key content placeholder. 시각 풍부. |

shimmer 구현은 합성 패턴 — base `Skeleton` + 자식 `<div>` gradient overlay. spec은 두 variant를 모두 정의하지만 tsx base는 pulse 단일, shimmer는 사용처 className 또는 추가 wrapper로 합성.

## Sizes

Skeleton은 **size variant 없음** — 모든 크기는 사용처 className(`h-*`/`w-*`/`rounded-*`)이 결정.

| 항목 | 값 | 토큰 |
|---|---|---|
| Background | `surface-input` | `bg-surface-input` |
| Border radius (base) | 4px | `rounded-sm` (= `var(--radius-sm)`) |
| Animation duration (pulse) | 2s (Tailwind 기본) | `animate-pulse` |
| Animation duration (shimmer) | 1500ms | `var(--motion-duration-loop)` |
| Animation timing (shimmer) | linear | `linear` |
| Shimmer gradient | `primary` 25% mix | `from-transparent via-primary/25 to-transparent` (또는 `color-mix(in srgb, var(--color-primary) 25%, transparent)`) |

## States

Skeleton은 **state 없음** — 정적 placeholder (단, animation은 loop 무한 반복).

## Layout (한국 도메인 패턴)

**HR — 결재 list placeholder**

- 결재함 진입 시 — avatar(40 round) + 직원명(`h-4 w-24`) + 부서(`h-3 w-32`) + status badge(`h-6 w-16 rounded-full`) 행 3–5개 반복.

**Desk — 메모 card placeholder**

- 메모 보관함 진입 시 — 카드 외곽 + 제목(`h-5 w-3/4`) + 본문 2–3줄(`h-3 w-full` / `h-3 w-5/6`) + 태그 row(작은 pill 3개) + 메타(`h-3 w-32`).

**Desk — 가계부 row placeholder**

- 거래내역 list 로딩 — avatar(카테고리 icon 자리, 40 round) + 가맹점명(`h-4 w-40`) + 일시(`h-3 w-28`) + 금액(`h-5 w-20`, 우측 정렬).

**Hero image placeholder (shimmer)**

- listing detail 진입 시 큰 hero image — `h-64 w-full rounded-md` + `shimmer` variant. 시각 강조 로딩.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| 모든 인터랙션 | **없음** — 정적 placeholder. focus 불가, click 무반응. |
| Animation | 무한 loop (`animation-iteration-count: infinite`). 데이터 도착 시 부모에서 unmount. |
| Reduced motion | `prefers-reduced-motion: reduce` 시 animation 일시 정지(또는 0.01ms으로 사실상 정지). placeholder 박스는 그대로 표시. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (placeholder × bg-page) | `surface-input` × `bg-page` 1.2:1 — 시각 식별 약함 (의도적, placeholder는 강조 회피). 텍스트 콘텐츠 아님이라 4.5:1 미적용. |
| **WCAG 1.4.11** Non-text contrast | placeholder는 정보 전달 요소 아님 — 대비 기준 미적용. |
| **WCAG 2.3.3** Animation from Interactions | pulse/shimmer는 사용자 인터랙션 트리거 아님(자동 loop). 2.3.3 적용 안 됨. |
| **WCAG 2.2.2** Pause/Stop/Hide (animation 5s+) | infinite loop이지만 시각 변화가 미세(opacity 0.5↔1, low contrast gradient) — 사용자 attention 침해 없음. 단, `prefers-reduced-motion: reduce` 존중 필수 ✓. |
| **WCAG 1.3.1** Info and Relationships | screen reader 대응 — `aria-busy="true"` (부모 컨테이너) + `aria-live="polite"`로 로딩 상태 안내 권장. Skeleton 자체는 `aria-hidden="true"` (시각 placeholder는 SR 무관). |
| **ARIA** | `role` 없음. 부모 컨테이너에 `aria-busy="true"` 부여 — 데이터 도착 시 `false`로 변경 + 실제 콘텐츠 mount. |

## Do / Don't

### ✅ Do

- 로딩 중 콘텐츠 자리 보존 — 사용자가 곧 나타날 콘텐츠 윤곽 인지, CLS 방지.
- shape는 실제 콘텐츠 비율과 비슷하게 — 텍스트 라인은 `h-4 w-*` (line-height 16), avatar는 [`Avatar`](avatar.md) 사이즈 정합.
- 한 페이지 안 한 가지 animation — pulse/shimmer 섞지 않음.
- 부모 컨테이너에 `aria-busy="true"` + 데이터 도착 시 unmount — screen reader 친화.
- `prefers-reduced-motion: reduce` 존중 — 토큰 시스템 keyframes는 자동 대응.

### ❌ Don't

- 1초 이내 빠른 로딩 — Skeleton 노출이 더 시각 noise. 즉시 표시되는 경우엔 그냥 콘텐츠 직접 mount.
- 정확한 색·shape를 본문과 동일하게 — placeholder는 *추정*. 너무 정확하면 사용자가 실제 콘텐츠로 오인.
- shape 비율 무시 — 메모 본문 placeholder가 1줄(`h-3 w-1/2`)뿐이면 실제 로딩 후 4줄 본문이 등장해 사용자 인지 부담.
- placeholder 위에 다른 콘텐츠 겹침 — z-index 위계 깨짐, 시각 혼란.
- 로딩 완료 후에도 Skeleton 잔존 — unmount 또는 `aria-busy="false"` + 실제 콘텐츠로 교체 필수.

## Migration notes

- `skeleton.tsx` 색 정정 — `bg-border-default` → **`bg-surface-input`** (shadcn `bg-muted` 정합, placeholder 톤 자연). 주석에는 이미 `surface-input` 명시였으나 코드 불일치였음.
- transition 토큰 직접 인용 추가 — Tailwind `animate-pulse`는 builtin keyframes이지만 Porest tokens.css에도 동일 `@keyframes pulse` 정의 있음. shimmer는 `animate-[shimmer_var(--motion-duration-loop)_linear_infinite]` 토큰 직접 인용.
- preview-html `.anim-shimmer` (motion demo) — `surface-input` 베이스 + `primary 25%` mix gradient sweep. Skeleton tsx에서 shimmer variant 합성 시 동일 패턴 사용. preview-html 자체는 motion 카탈로그 용도 — Skeleton 컴포넌트는 별도 (변경 없음).
- examples 한국 도메인 정합 — 추상 placeholder("h-4 w-32") 톤에서 **HR 결재 list / Desk 메모 card / Desk 가계부 row** 시나리오로 재작성. 타이포 토큰 직접 인용으로 위계 시각화.
- shimmer variant 시각 명세 신규 — preview-html `.anim-shimmer` SoT 정합, React 합성 패턴(base + gradient overlay) 제공.
