# Tooltip

> trigger 요소(button/icon/link 등)에 hover/focus 시 떠오르는 짧은 부가 정보. icon button의 의미 ("설정 열기"), 단축키 안내 ("⌘N 새 메모"), 약어 풀이 등 **시각 단서를 보조하는 인라인 hint**. modal/popover와 달리 인터랙티브 콘텐츠 없음. Radix `Tooltip` 베이스.

Porest Tooltip은 **단일 spec × 4 sides(top/right/bottom/left)** 매트릭스로 정의됩니다. **True inverted tooltip** — 페이지 surface와 항상 반대 톤을 유지: light 모드는 dark 배경(#1A1F2E) + 흰 텍스트, dark 모드는 light 배경(#F5F6FA) + 검정 텍스트. bg `var(--color-text-primary)` + text `var(--color-surface-default)` 조합은 두 토큰이 자동 swap이라 양방향 inverse가 자연스럽게 성립. 페이지와의 강한 대비(16:1+)로 즉시 식별, border 없이도 시각 분리 충분. 가벼운 `shadow-sm`으로 절제된 elevation.

## Anatomy

```
        ▼ trigger (hover/focus)
   ┌──────────────┐
   │ Hover me     │
   └──────┬───────┘
          │
          ▼  (sideOffset 4)
   ┌──────────────┐
   │ 도움말 텍스트 │   ← bg `text-primary`(swap·항상 inverse) + text `surface-default`(swap)
   └──────────────┘   ← shadow-sm 가볍게 (border 불필요 — 16:1 대비)
       caption / label-sm
```

| ⓐ content | `z-50 overflow-hidden rounded-xs px-[var(--spacing-md)] py-[var(--spacing-xs)] text-label-sm` + `style={{ backgroundColor: "var(--color-text-primary)", color: "var(--color-surface-default)", boxShadow: "var(--shadow-sm)" }}` |
| ⓑ animation | `data-[state=open]:animate-in fade-in-0 zoom-in-95` + `data-[side=*]:slide-in-from-*-2` |
| ⓒ side offset | 4px (Radix 기본) — trigger와 content 사이 간격 |

**규칙**

- 배경/텍스트 색은 **`background-color`/`color` inline style 직접 인용** — `var(--color-text-primary)` + `var(--color-surface-default)` 조합은 light/dark 자동 swap이라 양방향 inverse가 자연스럽게 성립.
- box-shadow도 inline style — Tailwind v4 `shadow-sm` utility의 `--tw-shadow-*` 분해 처리 우회 (Card/Dialog/Drawer/Popover/Sonner와 동일 패턴).
- **border 불필요** — 페이지 surface와 16:1+ 강한 대비라 시각 식별 충분.
- 폰트는 `text-label-sm` (13/500) — 본문보다 작아 부가 정보 위계 명확.

## Variants

Tooltip은 **variant 없음** — 모든 tooltip이 동일 시각. 의미 분기(positive/warning)는 텍스트 자체로.

## Sizes

Tooltip은 **size variant 없음** — 단일 spec. 콘텐츠 길이에 따라 자연 wrap(`max-width` 사용처 className).

| 항목 | 값 | 토큰 |
|---|---|---|
| Padding (Y · X) | 4 · 12 | `var(--spacing-xs)` · `var(--spacing-md)` |
| Radius | 2px | `var(--radius-xs)` |
| Background | `text-primary` (light:#1A1F2E / dark:#F5F6FA) — 페이지와 inverse | `var(--color-text-primary)` |
| Text | `surface-default` (light:#FFFFFF / dark:#242938) — bg와 inverse | `var(--color-surface-default)` |
| Border | 없음 (강한 대비로 식별 충분) | — |
| Font | 13 / 500 | `text-label-sm` |
| Shadow | shadow-sm (가볍게) | `var(--shadow-sm)` |
| Side offset | 4px | (Radix `sideOffset={4}` 기본) |
| z-index | 50 | (literal) |

## States

| State | 동작 | 시각 |
|---|---|---|
| `closed` (default) | (unmounted) | — |
| `delay-open` (hover/focus 직후 200ms 대기) | (still closed) | — |
| `open` | content portal 마운트 + fade-in zoom-in | `data-[state=open]:animate-in fade-in-0 zoom-in-95` |
| `closed` (hover 이탈) | content unmount + fade-out zoom-out | `data-[state=closed]:animate-out fade-out-0 zoom-out-95` |

Provider `delayDuration` 기본 200ms (Radix). `skipDelayDuration` 300ms (연속 tooltip 시 delay 생략).

## Layout

**Sides**

- `top` *(default)*: trigger 위에 표시 (가장 흔한 패턴 — 손가락/마우스 가림 최소화).
- `bottom`: trigger 아래 — 화면 상단 trigger 또는 콘텐츠가 위에서 가리지 않을 때.
- `left` / `right`: 측면 — toolbar 같은 가로 배치에서.

Radix `collisionPadding` 기본으로 viewport 경계 회피 — 자동 반전.

**Icon button with tooltip**

- icon-only button은 **tooltip 필수** (의미 전달 — WCAG 1.1.1).
- icon button의 aria-label과 tooltip 텍스트는 동일하게 — screen reader와 시각 사용자 일치.

**Multi-line tooltip**

- 2줄 이상은 popover로 — tooltip은 1줄 단문이 원칙. 긴 설명은 더 많은 인지 비용.
- 어쩔 수 없는 경우 `max-width: 240px` + `white-space: normal` 명시.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Hover (mouse) | 200ms 후 open. mouse leave 시 close. |
| Focus (keyboard `Tab`) | 즉시 open. blur 시 close. |
| `Escape` (focus 상태) | 즉시 dismiss. focus는 유지. |
| Touch (mobile) | tap 시 short-open(약 1.5초 후 자동 close). 모바일에선 tooltip 신뢰성 낮음 — 핵심 정보는 visible label로. |
| Provider delay | 첫 tooltip은 200ms 대기, 연속 시 즉시 (`skipDelayDuration`). |

**WCAG 1.4.13 — Content on Hover or Focus**:
- Dismissable: `Escape`로 즉시 dismiss ✓
- Hoverable: tooltip 영역에 마우스 옮길 수 있음(Radix 기본 — pointer 영역 grace period 제공)
- Persistent: hover/focus 유지 동안 노출 ✓ (timeout 자동 close 없음)

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.1.1** Non-text Content | icon-only button은 tooltip + `aria-label` 필수 — 시각/screen reader 모두 의미 전달. |
| **WCAG 1.4.3** Color contrast (light: text `surface-default` #FFFFFF × bg `text-primary` #1A1F2E) | 18.4:1 ✓ (AAA 본문 7:1 초과) |
| **WCAG 1.4.3** Color contrast (dark: text `surface-default-dark` #242938 × bg `text-primary-dark` #F5F6FA) | 14:1+ ✓ (AAA 충족) |
| **WCAG 1.4.11** Non-text contrast (light: tooltip bg #1A1F2E × bg-page #F5F6FA) | 16:1+ ✓ — 매우 강한 대비, border 불필요 |
| **WCAG 1.4.11** Non-text contrast (dark: tooltip bg #F5F6FA × bg-page #1A1F2E) | 16:1+ ✓ — 동일 강한 대비(inverse) |
| **WCAG 1.4.13** Content on Hover or Focus | dismissable(`Escape`) + hoverable(grace period) + persistent ✓ |
| **WCAG 2.1.1** Keyboard | `Tab`으로 trigger focus 시 자동 open. `Escape`로 dismiss. ✓ |
| **WCAG 2.4.7** Focus Visible | trigger focus-visible ring 표시. tooltip 자체는 focusable 아님(`role="tooltip"`). |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | tooltip은 hit area가 trigger임. trigger의 사이즈 가이드 따름(button.md). |
| **ARIA** | Radix가 `role="tooltip"` + `aria-describedby` 자동 wire. trigger는 native button/link semantic 보존. |

## Do / Don't

### ✅ Do

- icon-only button은 **tooltip 필수** + `aria-label` 동일 텍스트로.
- 1줄 단문 — "도움말 텍스트" / "설정 열기" / "Ctrl + S".
- 단축키 안내 — "저장 (⌘S)" 같이 hint와 함께.
- Provider 한 번 마운트 + 안에 Tooltip 여러 개 — delay/skipDelay 일관성.

### ❌ Don't

- 2줄+ 긴 설명 — popover로 (인터랙티브 콘텐츠 가능 + 명시적 dismiss).
- 핵심 정보를 tooltip에만 의존 — 모바일/터치에서 신뢰성 낮음. visible label 우선.
- tooltip 안에 button/link — 인터랙티브 콘텐츠는 popover/dropdown으로.
- 다른 surface(Card/Popover/Dialog)와 같은 톤(`surface-default`) — 페이지와 구분 안 됨. tooltip은 페이지 위 "임시 hint"라 inverse 톤 유지.
- shadow-md/lg 같은 강한 그림자 — tooltip은 부가 hint라 절제 톤. shadow-sm 권장.

## Migration notes

- **디자인 변천 (3단계 결정 과정)**:
  1. 초기: `bg-text-primary` Tailwind utility — 다크 모드에서 `--color-text-primary`가 #F5F6FA로 swap되며 흰 텍스트와 invisible 충돌.
  2. v1 fix: `bg-bg-page-dark`(stable #1A1F2E) + `text-on-accent` — Toss/Apple stable-dark 패턴. 양 모드 동일 시각.
  3. v2 fix: `surface-default` + `text-primary` — 페이지 surface와 같은 톤. 사용자 피드백 반영.
  4. **현재(v3)**: `text-primary` bg + `surface-default` text — **true inverted 패턴**. 두 토큰 모두 자동 swap이라 양방향 inverse 자연 성립. light는 dark tooltip, dark는 light tooltip. 사용자 피드백("light는 dark, dark는 light") 반영.
- 결정 근거: tooltip은 페이지 위 "임시 hint"라 페이지 surface와 inverse 톤이 즉시 식별 가능. 두 모드 모두 16:1+ 강한 대비로 border 불필요. WCAG 1.4.3 두 방향 모두 14:1+ AAA 충족.
- `px-3 py-1.5` Tailwind 기본 spacing → `px-[var(--spacing-md)] py-[var(--spacing-xs)]`(12/4) 토큰 직접 인용.
- shadow는 `shadow-md` → `shadow-sm`로 가볍게 — tooltip은 부가 hint라 절제 톤.
- box-shadow는 Tailwind utility(`shadow-sm`) 대신 inline `style={{ boxShadow: "var(--shadow-sm)" }}` 사용 — Card/Dialog/Drawer/Popover/Sonner와 동일 fix 패턴 (Tailwind v4 `--tw-shadow-*` 분해 처리 우회).
- tooltip-examples.mjs BTN 상수의 `transition-colors` Tailwind 기본 → motion 토큰 직접 인용(`duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]`). `text-title-sm` → `text-body-md`(Button md spec 정합). `gap-2 h-10 px-4` → 토큰.
- preview-html에 `.tt` / `.tooltip` CSS 없음 — site (tsx + examples)가 단일 SoT.
