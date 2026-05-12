# Hover Card

> trigger 요소(@mention, 전문용어, 미리보기 thumbnail 등)에 **hover 시** 떠오르는 부가 정보 카드. tooltip보다 콘텐츠가 풍부(avatar + 메타 정보 + multi-line 설명)하지만 popover와 달리 **인터랙티브 콘텐츠 없음** — 읽기 전용. Radix `HoverCard` 베이스.

Porest Hover Card는 **단일 spec × 4 sides(top/right/bottom/left)** 매트릭스로 정의됩니다. 시각은 [`Popover`](popover.md)와 동일 톤 — `surface-default` + border 1px + `radius-md` + `padding-md` + `shadow-md` inline. 차이는 **trigger 패턴**(hover/focus only) + **콘텐츠 의도**(읽기 전용, 인터랙티브 element 금지). 기본 폭 `w-64`(256) — User profile/term definition 같은 짧은 부가 정보 위주.

## Anatomy

```
        ▼ trigger (hover/focus)
  @kim  (underline · text-primary)
        │
        ▼  (sideOffset 4)
┌─────────────────────────────────────┐
│ ⓐ content (border + shadow-md)      │
│  ┌────┐  ┌──────────────────────┐   │
│  │ ⓑ  │  │ ⓒ name (title-sm 600) │   │   ← avatar + meta column
│  │김  │  │ ⓓ role (body-sm sec)  │   │
│  └────┘  │ ⓔ meta (label-sm ter) │   │
│          └──────────────────────┘   │
└─────────────────────────────────────┘
```

| ⓐ content | `z-50 w-64 rounded-md border border-border-default bg-surface-default p-[var(--spacing-md)] text-text-primary` + `style={{ boxShadow: "var(--shadow-md)" }}` |
| ⓑ avatar (선택) | [`Avatar`](avatar.md) md 40×40 + 필요 시 primary fill (`@mention`처럼 person identity 강조). |
| ⓒ heading | `text-title-sm` (16/600). 이름 또는 용어. |
| ⓓ description | `text-body-sm` (14/400) `text-secondary`. 역할/짧은 설명 1–2줄. |
| ⓔ meta (선택) | `text-label-sm` (13/500) `text-tertiary`. 부가 메타(입사일, 출처 등). |
| ⓕ animation | `data-[state=open]:animate-in fade-in-0 zoom-in-95` + `data-[side=*]:slide-in-from-*-2` |
| ⓖ side offset | 4px (Radix 기본) |

**규칙**

- 콘텐츠는 **읽기 전용** — button/link/input 등 인터랙티브 element 금지. 인터랙티브 콘텐츠가 필요하면 [`Popover`](popover.md).
- avatar 사용 시 [`Avatar`](avatar.md) spec 그대로 — md size + primary fill 권장(person identity).
- box-shadow는 Tailwind utility 대신 inline `style={{ boxShadow: "var(--shadow-md)" }}` — Tailwind v4 `--tw-shadow-*` 분해 처리가 다크 모드 CSS 변수 override를 우회하는 문제 fix (Card/Dialog/Drawer/Popover/Sonner/Tooltip과 동일 패턴).

## Variants

Hover Card는 **variant 없음** — 모든 hover card 동일 시각. 콘텐츠 구성(avatar 유무, 메타 줄 수)으로만 분기.

## Sizes

**단일 size — `w-64` (256px) 기본**. 짧은 부가 정보 위주라 popover(`w-72` 288)보다 약간 좁게. 콘텐츠가 길면 사용처에서 `className="w-80"` 등으로 확장.

| 항목 | 값 | 토큰 |
|---|---|---|
| Width | 256px | `w-64` |
| Padding | 12px | `p-[var(--spacing-md)]` |
| Radius | 8px | `rounded-md` |
| Border | 1px solid | `border border-border-default` |
| Background | `surface-default` | `bg-surface-default` |
| Shadow | shadow-md | `var(--shadow-md)` (inline) |
| Side offset | 4px | (Radix 기본) |
| z-index | 50 | (literal) |

## States

| State | 동작 | 시각 |
|---|---|---|
| `closed` (default) | (unmounted) | — |
| `delay-open` (hover/focus 진입 후 700ms 대기) | (still closed) | — |
| `open` | content portal 마운트 + fade-in zoom-in | `animate-in fade-in-0 zoom-in-95` + 방향별 slide |
| `closed` (hover 이탈 후 300ms grace period 후 close) | content unmount + fade-out zoom-out | `animate-out fade-out-0 zoom-out-95` |

`openDelay` 기본 700ms / `closeDelay` 기본 300ms (Radix). delay가 tooltip(200ms)보다 길어 의도적 hover만 노출.

## Layout

**User profile preview**

- @mention 또는 user-row hover. trigger는 underline 텍스트 또는 avatar.
- content: avatar(md) + 이름(title-sm) + 역할(body-sm secondary) + 메타(label-sm tertiary).
- `gap-[var(--spacing-md)]` (12) avatar ↔ text column, `gap-[var(--spacing-xs)]` (4) 텍스트 내 줄 간격.

**Term definition**

- 전문용어 hover — 짧은 설명. avatar 없음.
- trigger는 `font-semibold underline underline-offset-4 cursor-help`.
- content: `text-body-sm` 1–2줄 설명.

**Image / thumbnail preview**

- 작은 이미지 hover 시 큰 미리보기. spec 외 범위 — 사용처에서 className으로 확장(`w-80 p-0` 등).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Hover (mouse) | 700ms 후 open. mouse leave 시 300ms grace 후 close. |
| Focus (keyboard `Tab`) | 즉시 open (지연 없음). blur 시 close. |
| `Escape` (focus 상태) | 즉시 dismiss. focus는 유지. |
| Touch (mobile) | tap 시 open. 같은 trigger 다시 tap 시 close. 모바일에서는 신뢰성 낮음 — 핵심 정보는 visible. |

**WCAG 1.4.13 — Content on Hover or Focus**:
- Dismissable: `Escape` ✓
- Hoverable: content 영역에 마우스 옮길 수 있음(Radix 기본, grace period 제공) ✓
- Persistent: hover/focus 유지 동안 노출 ✓

## Tooltip / Popover와의 비교

| 항목 | Tooltip | Hover Card | Popover |
|---|---|---|---|
| Trigger | hover / focus | hover / focus | click (또는 user-controlled) |
| Delay (open) | 200ms | 700ms | (즉시) |
| 콘텐츠 | 1줄 단문 | 풍부(avatar + 메타) | 풍부 + 인터랙티브 |
| 인터랙션 | 없음 | 없음 (읽기 전용) | input/button/form 가능 |
| 시각 | inverted dark | surface-default + border | surface-default + border |
| Width | content fit | `w-64` (256) | `w-72` (288) |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (content text × surface-default) | `text-primary` 14:1+ / `text-secondary` 9.2:1 / `text-tertiary` 4.6:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (content border × bg-page) | `border-default` × `bg-page` = 1.4:1 — 단독 약함이나 `shadow-md`이 elevation 보강. |
| **WCAG 1.4.13** Content on Hover or Focus | dismissable + hoverable + persistent ✓ |
| **WCAG 2.1.1** Keyboard | `Tab`으로 trigger focus 시 즉시 open. `Escape`로 dismiss. ✓ |
| **WCAG 2.4.7** Focus Visible | trigger focus-visible ring. content 자체는 focusable 아님. |
| **ARIA** | Radix가 `role="dialog"` (content) + `aria-haspopup` (trigger) 자동 wire. heading은 `<h4>` semantic 권장. |

## Do / Don't

### ✅ Do

- **읽기 전용 부가 정보** — @mention 프로필 미리보기, 전문용어 설명, thumbnail 확대 미리보기.
- trigger는 `cursor-help`(definition) 또는 `cursor-pointer`(profile link) — 인터랙션 hint.
- delay 기본값 유지(open 700ms / close 300ms) — 사용자 의도적 hover만 노출.
- avatar 사용 시 [`Avatar`](avatar.md) md size + primary fill — User row와 시각 일관성.

### ❌ Don't

- 콘텐츠 안 button/link/input — 인터랙티브는 [`Popover`](popover.md). hover card는 hover-only.
- 핵심 정보를 hover card에만 의존 — 모바일/터치 신뢰성 낮음. visible label 우선.
- delay 0ms — 의도치 않은 hover로 시각 noise.
- 콘텐츠가 너무 길어(5줄+) — 별도 페이지/popover로. hover card는 짧은 부가 정보 매체.

## Migration notes

- 기존 `hover-card.tsx`는 `rounded-sm`(4) + `p-4` (Tailwind 기본 16) — [`Popover`](popover.md) spec과 통일하기 위해 `rounded-md`(8) + `p-[var(--spacing-md)]`(12) 토큰 직접 인용으로 정정. 시각 응집(Popover/HoverCard는 같은 floating 카드 톤).
- box-shadow는 Tailwind utility(`shadow-md`) 대신 inline `style={{ boxShadow: "var(--shadow-md)" }}` — Card/Dialog/Drawer/Popover/Sonner/Tooltip과 동일 fix 패턴. 상세는 [`dialog.md`](dialog.md) Migration notes 참조.
- 예제 컨테이너 `position:absolute` + `padding:0 0 200px` 패턴 — popover 정정과 동일하게 normal-flow(`position:relative` 제거, `inline-flex flex-col gap-xs`)로 변경 권장.
- preview-html `.hc-avatar` / `.hc-name` / `.hc-bio` 셋은 **avatar.md** "User row" 패턴 (avatar + 이름 + bio) — `.hc` 자체는 user-row wrapper로 hover-card content와는 별개. hover-card content panel은 site preview(`hover-card-examples.mjs`)가 단일 SoT.
