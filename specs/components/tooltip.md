# Tooltip

> trigger 요소(button/icon/link 등)에 hover/focus 시 떠오르는 짧은 부가 정보. icon button의 의미 ("설정 열기"), 단축키 안내 ("⌘N 새 메모"), 약어 풀이 등 **시각 단서를 보조하는 인라인 hint**. modal/popover와 달리 인터랙티브 콘텐츠 없음. Radix `Tooltip` 베이스.

Porest Tooltip은 **단일 spec × 4 sides(top/right/bottom/left)** 매트릭스로 정의됩니다. Toss/Apple 스타일 **inverted dark tooltip** — 두 테마 모두 stable 다크 배경 유지(`var(--color-bg-page-dark)` #1A1F2E + `text-on-accent` #FFFFFF). 라이트/다크 모드 모두 동일 시각 시그니처로 사용자 학습 비용 최소화.

## Anatomy

```
        ▼ trigger (hover/focus)
   ┌──────────────┐
   │ Hover me     │
   └──────┬───────┘
          │
          ▼  (sideOffset 4)
   ┌──────────────┐
   │ 도움말 텍스트 │   ← bg #1A1F2E(stable), text #FFFFFF
   └──────────────┘
       caption / label-sm
```

| ⓐ content | `z-50 overflow-hidden rounded-xs px-[var(--spacing-md)] py-[var(--spacing-xs)] text-label-sm` + `style={{ backgroundColor: "var(--color-bg-page-dark)", color: "var(--color-text-on-accent)", boxShadow: "var(--shadow-md)" }}` |
| ⓑ animation | `data-[state=open]:animate-in fade-in-0 zoom-in-95` + `data-[side=*]:slide-in-from-*-2` |
| ⓒ side offset | 4px (Radix 기본) — trigger와 content 사이 간격 |

**규칙**

- 배경/텍스트 색은 **`background-color`/`color` inline style 직접 인용** — `bg-text-primary` Tailwind utility는 다크 모드 CSS 변수 swap으로 색 반전되어 invisible 위험. `var(--color-bg-page-dark)`는 swap 대상이 아니라 stable.
- box-shadow도 inline style — Tailwind v4 `shadow-md` utility의 `--tw-shadow-*` 분해 처리 우회 (Card/Dialog/Drawer/Popover/Sonner와 동일 패턴).
- 폰트는 `text-label-sm` (13/500) — 본문보다 작아 부가 정보 위계 명확.

## Variants

Tooltip은 **variant 없음** — 모든 tooltip이 동일 시각. 의미 분기(positive/warning)는 텍스트 자체로.

## Sizes

Tooltip은 **size variant 없음** — 단일 spec. 콘텐츠 길이에 따라 자연 wrap(`max-width` 사용처 className).

| 항목 | 값 | 토큰 |
|---|---|---|
| Padding (Y · X) | 4 · 12 | `var(--spacing-xs)` · `var(--spacing-md)` |
| Radius | 2px | `var(--radius-xs)` |
| Background | `#1A1F2E` (stable dark) | `var(--color-bg-page-dark)` |
| Text | `#FFFFFF` (stable white) | `var(--color-text-on-accent)` |
| Font | 13 / 500 | `text-label-sm` |
| Shadow | shadow-md | `var(--shadow-md)` |
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
| **WCAG 1.4.3** Color contrast (text #FFFFFF × bg #1A1F2E) | 18.4:1 ✓ (AAA 본문 7:1 초과) |
| **WCAG 1.4.11** Non-text contrast (tooltip × bg-page) | bg #1A1F2E × bg-page #F5F6FA = 16:1+ ✓ |
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
- tooltip 색을 다른 surface로 (예: `surface-default`) — 페이지 배경과 구분 약함. inverted dark 패턴 유지.

## Migration notes

- 기존 `tooltip.tsx`는 `bg-text-primary` Tailwind utility 사용 — 다크 모드에서 `--color-text-primary`가 `--color-text-primary-dark`(#F5F6FA)로 swap되어 tooltip 배경이 white-ish가 되고, 흰색 텍스트(`text-on-accent`)와 invisible 충돌. inline style `backgroundColor: var(--color-bg-page-dark)`로 정정 — `*-dark` suffix 토큰은 swap 대상 아니라 stable 다크 색상 유지.
- `bg-text-primary` 자리에 `bg-[var(--color-bg-page-dark)]` Tailwind arbitrary value를 쓸 수도 있으나 `--color-bg-page-dark` 자체가 `*-dark` suffix라 의미적으로 inline style이 명확.
- `px-3 py-1.5` Tailwind 기본 spacing → `px-[var(--spacing-md)] py-[var(--spacing-xs)]`(12/4) 토큰 직접 인용.
- box-shadow는 Tailwind utility(`shadow-md`) 대신 inline `style={{ boxShadow: "var(--shadow-md)" }}` 사용 — Card/Dialog/Drawer/Popover/Sonner와 동일 fix 패턴 (Tailwind v4 `--tw-shadow-*` 분해 처리 우회).
- tooltip-examples.mjs BTN 상수의 `transition-colors` Tailwind 기본 → motion 토큰 직접 인용(`duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]`). `text-title-sm` → `text-body-md`(Button md spec 정합). `gap-2 h-10 px-4` → 토큰.
- preview-html에 `.tt` / `.tooltip` CSS 없음 — site (tsx + examples)가 단일 SoT.
