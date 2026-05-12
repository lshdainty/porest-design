# Alert

> 페이지 안에 고정된 위치에서 정보·경고·에러를 표시하는 인라인 메시지. floating 토스트([`Sonner`](sonner.md))와 달리 **항상 visible**, 사용자 액션 결과가 아닌 **컨텍스트 메시지**(약관 변경 안내, 결제 실패, 시스템 점검 등). dismissable은 옵션. [`AlertDialog`](alert-dialog.md)와 별개 — modal 패턴 아님.

Porest Alert은 **5 variants(default/info/success/warning/error) × dismissable 옵션** 매트릭스로 정의됩니다. preview `.banner-*` SoT 정합 — 4px border-left semantic accent + 8% color-mix 배경 + 16×16 stroke svg icon + body-md title. 시각 위계는 [`Sonner`](sonner.md) toast와 같은 5 kinds 구조 — 인라인 alert와 floating toast가 동일 semantic 색상 시스템을 공유.

## Anatomy

```
┌────────────────────────────────────────────────┐
│┃ ⓒ icon  ⓓ title (body-md 600)        ⓖ close ✕│
│┃         ⓔ description (body-sm)               │
└────────────────────────────────────────────────┘
 ▲
 ⓑ border-left 4px semantic color
 ⓐ container — color-mix 8% bg + radius-sm
```

| ⓐ container | `display:flex; align-items:flex-start; gap:var(--spacing-md); padding:var(--spacing-md); border-radius:var(--radius-sm); border-inline-start-width:4px; border-inline-start-style:solid;` (semantic variants) / default는 `border 1px border-default` + `bg-surface-default` 단순 카드 형태. |
| ⓑ border-left | semantic 4px solid (variant 색상). default variant는 없음. |
| ⓒ icon | 20×20 stroke svg, variant 색상. `flex-shrink:0; margin-top:2px`(title baseline 정렬). default variant는 icon 생략 가능. |
| ⓓ title | `text-body-md font-semibold leading-none tracking-tight text-text-primary`. 1줄 짧은 헤딩. |
| ⓔ description | `text-body-sm text-text-secondary leading-[1.5]`. 1–3줄 본문. 선택. |
| ⓕ body wrapper | `flex flex-col gap-[var(--spacing-xs)] flex-1 min-w-0`. title + description 묶음. |
| ⓖ close (선택) | 우측 28×28 ghost button. `aria-label="닫기"`. dismissable alert만. |

**규칙**

- semantic variants는 border-left 4px + 8% color-mix 배경 — banner-style elevation. 페이지 안에서 즉시 식별.
- default variant는 border 1px + 단순 surface 카드 — 정보 없는 일반 메시지(rare).
- icon은 stroke svg만 사용 — fill 채움 금지(시각 무게 과잉).
- 한 페이지 동시 alert 3개 이상 — 사용자 인지 과부하. 중요도 순으로 표시 또는 toast로 변경.

## Variants

| Variant | Border-left 색 | Background (mix 8%) | Icon stroke | 사용처 |
|---|---|---|---|---|
| `default` | (없음, 1px border-default) | `surface-default` (그대로) | 없음(또는 중립) | 일반 메시지 — 시스템 안내. 의미 분기 없을 때만. |
| `info` | `--color-info` | `info 8% + surface` | `info` | 정보성 안내 — 새 기능, 정책 변경 예고. |
| `success` | `--color-success` | `success 8% + surface` | `success` | 성공 / 완료 — 결제 완료, 작업 성공 후 페이지 안내. |
| `warning` | `--color-warning` | `warning 8% + surface` | `warning` | 주의 / 임박 — 약관 변경 예정, 저장 공간 부족. |
| `error` (destructive) | `--color-error` | `error 8% + surface` | `error` | 실패 / 오류 — 결제 실패, 저장 실패 등. shadcn `destructive` alias. |

브랜드 분기 없음 — 모든 variant가 brand-neutral semantic 토큰 사용. Sonner와 같은 5 kinds 구조로 시각 일관성.

## Sizes

Alert은 **size variant 없음** — 단일 spec. 사용처에서 `max-width` className으로 폭 조정(메인 영역 가운데 정렬은 `max-w-3xl mx-auto` 등).

| 항목 | 값 | 토큰 |
|---|---|---|
| Padding | 12px | `var(--spacing-md)` |
| Gap (icon ↔ body) | 12px | `var(--spacing-md)` |
| Gap (title ↔ description) | 4px | `var(--spacing-xs)` |
| Border radius | 4px | `var(--radius-sm)` |
| Border-left width (semantic) | 4px | (literal — accent strip) |
| Background (semantic) | `color-mix(in srgb, semantic 8%, surface-default)` | — |
| Title font | body-md (15) + 600 | `text-body-md font-semibold` |
| Description font | body-sm (14) + 400 | `text-body-sm text-text-secondary` |
| Icon size | 20×20 | (svg attr) |
| Close button | 28×28 | (literal) |
| Margin block (인접 alert) | 8px | `var(--spacing-sm)` |

## States

| State | 동작 | 시각 |
|---|---|---|
| `visible` (default) | 표시 상태 | spec 그대로 |
| `dismissable + open` | close button 노출 | close ghost button 우상단 |
| `closing` | dismiss 애니메이션 (옵션) | `transition-opacity duration-[var(--motion-duration-fast)]` + fade out |
| `closed` | unmounted | — |

Alert 자체는 자동 dismiss 없음 — 사용자 액션(close button) 또는 페이지 상태 변경으로 unmount.

## Layout

**Single alert (페이지 컨텍스트 메시지)**

- 메인 콘텐츠 위 또는 form 위에 단독 배치. `max-w` 사용처 결정(보통 본문 폭과 일치).
- 페이지 헤더와 본문 사이 — 페이지 진입 시 즉시 식별.

**Stack of alerts**

- `margin-block: var(--spacing-sm)`로 자연 간격. 3개 이상이면 중요도 정렬(error → warning → info → success).
- 같은 variant 반복 회피 — "결제 실패" 4개보단 "결제 4건 실패 (자세히 보기)" 1개로 압축.

**Inline form alert**

- form 안 validation 결과 — submit 후 에러 메시지. form 위/아래 위치, max-width는 form과 일치.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click close (dismissable) | alert unmount + 콜백 호출. localStorage 등으로 "이미 본 메시지" 추적 가능. |
| `Escape` (close 버튼 focus 상태) | close 활성화. |
| Auto-dismiss | **없음** — Alert는 컨텍스트 메시지라 사용자가 직접 dismiss 또는 페이지 상태 변경으로 제거. 자동 dismiss는 [`Sonner`](sonner.md) toast 패턴. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (title `text-primary` × bg mix) | semantic 8% mix는 충분히 light 톤이라 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (description `text-secondary` × bg mix) | 9.2:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (border-l semantic × bg-page) | info `#2271D1` 4.5:1+ / success `#1A7F47` 4.6:1+ / warning `#F59E0B` 3:1+ / error `#D32F2F` 5:1+ ✓ |
| **WCAG 2.4.7** Focus Visible | close button `focus-visible:ring-2 ring-ring ring-offset-2`. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | close 28×28 — 미달(⚠). 모바일 우선 화면이면 close `h-11 w-11`로 확장 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | close 28 ✓ |
| **WCAG 1.3.1** Info and Relationships | `role="alert"` (error/warning) — screen reader 즉시 읽음. `role="status"` (info/success) — 조용히 읽음. |
| **WCAG 4.1.3** Status Messages | semantic 변화는 `aria-live="polite"` 또는 `role="status"` 자동 부여. |
| **ARIA** | error/warning는 `role="alert"` (assertive). info/success는 `role="status"` (polite). dismissable close button은 `aria-label="닫기"`. |

## Do / Don't

### ✅ Do

- variant는 메시지 의미와 일치 — 결제 실패는 `error`, 새 기능은 `info`, 약관 변경은 `warning`.
- semantic 색 + icon + title 3중 시각 단서 — 색맹 사용자 대응(WCAG 1.4.1).
- 한 페이지 alert 1–3개 — 중요도 순. 그 이상은 우선순위 압축.
- dismissable alert는 사용자 결정 메시지 — 정보성/예고. error/warning은 dismissable 회피(사용자 액션 필요).

### ❌ Don't

- 사용자 액션 결과를 alert으로 — 결과 알림은 [`Sonner`](sonner.md) toast. alert은 컨텍스트 메시지.
- destructive 확정을 alert으로 — modal confirm 필요. [`AlertDialog`](alert-dialog.md) 사용.
- semantic 색을 의미 없이 변형 — error를 정보성 메시지에 쓰면 사용자 혼란.
- icon만으로 의미 전달 — title 텍스트 필수(WCAG 1.4.1 색만 의존 금지).
- 한 페이지 5+ alert — 시각 과부하. 압축 또는 다른 패턴(notification center).

## Alert vs Sonner vs AlertDialog 사용 가이드

| 항목 | Alert (이 spec) | Sonner | AlertDialog |
|---|---|---|---|
| 위치 | 페이지 inline 고정 | 화면 모서리 floating | 화면 중앙 modal |
| 트리거 | 페이지 상태/컨텍스트 | 사용자 액션 결과 | 위험 액션 확정 |
| 시간 | persistent (또는 dismiss) | auto-dismiss 4s | 사용자 결정까지 |
| 인터랙션 | dismissable close (옵션) | swipe / action button | confirm/cancel 필수 |
| Stack | 3개까지 | 3개 stack (sonner 기본) | 1개만 (modal) |
| 시각 | border-l 4px + 8% bg | border 1px + shadow-lg | shadow-xl + overlay-dim |

## Migration notes

- 기존 `alert.tsx`는 2 variants(default/destructive)만 — Sonner와 같은 5 kinds(default/info/success/warning/error)로 확장. semantic 색상 시스템 통일.
- `px-4 py-3` Tailwind 기본 → `p-[var(--spacing-md)]`(12) 토큰 직접 인용 (Sonner toast 정합).
- icon `[&>svg]:absolute left-4 top-4` 절대 위치 → flex layout으로 변경 (preview `.banner` 패턴, 시각 정렬 일관성 + responsive 친화).
- title `mb-1 font-semibold leading-none` → `gap-[var(--spacing-xs)]` flex column + `font-semibold` 유지.
- semantic variant 배경 — `bg-error/10`(Tailwind) → `color-mix(in srgb, var(--color-error) 8%, var(--color-surface-default))` (preview SoT, surface 배경 베이스로 자연스러운 톤).
- border-left 4px accent 신규 도입 — preview `.banner` SoT, 페이지 안에서 즉시 식별성 강화.
- preview-html `.banner-*`는 spec과 거의 동기 — title font를 `body-md` 600(spec)에 맞춤(현재 body-md strong만 명시되어 있어 weight 보강 필요 시).
