# Dropdown Menu

> button/icon trigger 클릭 시 떠오르는 floating 메뉴. 사용자 계정 메뉴, 토글 옵션, action menu(공유/복사/삭제 등)처럼 **명시적 click trigger** 패턴. [`Context Menu`](context-menu.md)와 시각·구조 동일하나 **trigger 방식**(우클릭/long-press → click)만 다름. Radix `DropdownMenu` 베이스.

Porest Dropdown Menu는 **단일 spec × 6 item kinds(default/inset/checkbox/radio/destructive/with-shortcut)** 매트릭스로 정의됩니다. 시각은 [`Context Menu`](context-menu.md)와 1:1 동일 — `surface-default` + border 1px + `radius-md` + `padding-xs` + min-width 160. item은 `body-md` + `radius-sm` + 토큰 padding(`spacing-sm/md`). 두 컴포넌트 모두 같은 Radix `Menu` 시맨틱이라 시각 코드도 재활용.

## Anatomy

```
[ Trigger Button ]    ← outline button(또는 icon button)
        │ click
        ▼  (sideOffset 4)
┌──────────────────────────────────┐
│ ⓐ container (border + shadow-md) │
│   ┌──────────────────────────┐   │
│   │ ⓑ label "내 계정"        │   │  ←  (선택) 그룹 헤더
│   │ ⓒ separator              │   │
│   │ ⓓ item (icon + text + ⌘) │   │  ←  hover/focus: surface-input
│   │ ⓓ item                   │   │
│   │ ⓒ separator              │   │
│   │ ⓔ destructive item       │   │  ←  text-error + error 12% hover
│   └──────────────────────────┘   │
└──────────────────────────────────┘
```

| ⓐ container | `display:inline-flex; flex-direction:column; background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); padding:var(--spacing-xs); min-width:160px;` + `style={{ boxShadow: "var(--shadow-md)" }}` |
| ⓑ label (그룹) | `px-[var(--spacing-md)] py-[var(--spacing-sm)] text-label-sm font-medium text-text-secondary`. 그룹 헤더, 선택. |
| ⓒ separator | `height:1px; background:var(--color-border-default); margin:var(--spacing-xs) 0;` |
| ⓓ item | `display:flex; align-items:center; gap:var(--spacing-sm); padding:var(--spacing-sm) var(--spacing-md); border-radius:var(--radius-sm); font-size:var(--text-body-md); color:var(--color-text-primary); cursor:pointer;` hover: `bg-surface-input`. |
| ⓔ destructive item | item + `color:var(--color-error)`. hover: `color-mix(in srgb, var(--color-error) 12%, transparent)`. |
| ⓕ icon (선택) | 좌측 16px svg, `text-text-secondary` 또는 currentColor. |
| ⓖ shortcut (선택) | 우측 정렬 — `margin-left:auto; font-size:var(--text-label-sm); letter-spacing:0.1em; color:var(--color-text-tertiary);` |

**규칙**

- min-width 160 — 한글 2글자 단일 item부터 6글자까지 일관된 폭.
- icon은 좌측, shortcut은 우측 — `text → margin-left: auto`로 자연스럽게 분리.
- box-shadow는 Tailwind utility(`shadow-md`) 대신 inline `style={{ boxShadow: "var(--shadow-md)" }}` — Card/Dialog/Drawer/Popover/Sonner/Tooltip/HoverCard와 동일 fix 패턴.

## Variants

Dropdown Menu 자체는 **variant 없음** — [`Context Menu`](context-menu.md)와 시각 통일. 메뉴 의미 분기는 item kind(default/destructive)와 separator 그룹화로.

## Sizes

단일 size — `var(--spacing-xs)` 4px padding container + 32px item height. 메뉴는 콘텐츠에 따라 자연 확장.

| 항목 | 값 | 토큰 |
|---|---|---|
| Container padding | 4px | `var(--spacing-xs)` |
| Container radius | 8px | `var(--radius-md)` |
| Container shadow | shadow-md | `var(--shadow-md)` (inline) |
| Container border | 1px solid | `var(--color-border-default)` |
| Container min-width | 160px | (literal) |
| Item padding (Y · X) | 8 / 12 | `var(--spacing-sm)` · `var(--spacing-md)` |
| Item radius | 4px | `var(--radius-sm)` |
| Item font | body-md (15) | `var(--text-body-md)` |
| Item gap (icon-text) | 8px | `var(--spacing-sm)` |
| Item inset padding-left | 24px | `var(--spacing-xl)` (checkbox/radio indicator 영역) |
| Separator margin (Y) | 4px | `var(--spacing-xs)` |
| Shortcut font | label-sm (13) | `var(--text-label-sm)` |
| Side offset (trigger ↔ content) | 4px | (Radix 기본) |

## States

| State | Background | Text | 추가 |
|---|---|---|---|
| `enabled` | transparent | `text-primary` | — |
| `hover / focus` | `surface-input` | `text-primary` | (focus-visible는 hover와 동일 시각) |
| `pressed` | `surface-input` (즉시 dismiss) | `text-primary` | — |
| `disabled` | transparent | `text-primary` opacity 0.5 | `pointer-events: none` |
| `destructive enabled` | transparent | `text-error` | — |
| `destructive hover` | `error 12% mix` | `text-error` | — |

## Layout

**Position**

- Radix Popper 베이스 — 기본 `align="start"`, `side="bottom"`. trigger 좌측 정렬, 아래쪽으로 열림.
- viewport 우/하단 넘침 시 자동 반전(좌/위로).
- side offset 4px — trigger와 content 사이 미세 간격.

**Grouping**

- 비슷한 의미끼리 묶고 separator로 분리. 한 그룹 3–5개 권장.
- destructive item은 마지막 그룹 단독 + separator로 분리.

**Submenu (DropdownMenuSub)**

- item에 SubTrigger + SubContent — 같은 시각 spec(container/item)을 재귀 사용. 우측에 chevron(`▸`).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Trigger click | content open ↔ close 토글. |
| Outside click | content close. |
| `Escape` | content close, trigger focus 복귀. |
| `ArrowDown` / `ArrowUp` (trigger) | content open + 첫/마지막 item focus. |
| `ArrowDown` / `ArrowUp` (open) | item 간 focus 이동. |
| `Enter` / `Space` | focused item 활성화 + content close (default item) / 토글 (checkbox/radio). |
| `Home` / `End` | 첫/마지막 item focus. |
| 알파벳 키 | 해당 글자로 시작하는 item으로 jump (Radix typeahead). |
| `Arrow Right` (SubTrigger) | 서브메뉴 열기. `Arrow Left` 닫기. |

## Context Menu vs Dropdown Menu

| 항목 | Context Menu | Dropdown Menu |
|---|---|---|
| Trigger | 우클릭(데스크탑) / long-press(터치) | click (button/icon) |
| 위치 | 마우스 좌표 기준 | trigger 위치 기준 (Popper) |
| 발견성 | 낮음 (hidden affordance) | 높음 (visible button) |
| 사용처 | 영역 위 보조 액션 (행/카드/캔버스) | 명시적 메뉴 (계정/설정/공유 등) |
| 시각 | 동일 | 동일 |

핵심 액션은 dropdown으로(button affordance), 보조/숨김 액션은 context로(우클릭 또는 ⋯ kebab menu).

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text-primary × surface-default) | 21:1 ✓ |
| **WCAG 1.4.3** Color contrast (text-error × surface-default) | `#D32F2F` × `#FFFFFF` = 5.0:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (border × surface-default) | `border-default` × `bg-page` = 1.4:1 — 단독 약함이나 `shadow-md`이 보강. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | item 높이 ≈ 32px — 미달(⚠). 터치 우선 화면이면 padding-Y `var(--spacing-md)`(12)로 늘려 40px+ 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | item 32px ✓ |
| **WCAG 2.1.1** Keyboard | trigger `Enter`/`Space`로 open, 메뉴 내 `Arrow`/`Home`/`End`/typeahead 모두 키보드 가능. |
| **ARIA** | Radix가 `aria-haspopup="menu"` + `aria-expanded` (trigger) / `role="menu"` / item `role="menuitem"` / `role="menuitemcheckbox"` / `role="menuitemradio"` 자동 부여. |

## Do / Don't

### ✅ Do

- 핵심 액션은 button affordance(dropdown) — 발견성↑.
- destructive item은 단독 그룹 + 마지막 위치 + separator로 분리.
- shortcut은 데스크탑 메뉴에서만 — 모바일에선 의미 없음.
- 4–7개 item 권장 — 그 이상은 카테고리 분리 또는 submenu로.
- icon은 의미 보강(✅) 또는 생략(✅) — 일부 item만 icon은 정렬 깨짐 회피.

### ❌ Don't

- 메뉴 안에 또 다른 메뉴 안에 또 또 다른 메뉴(3단 이상 깊이) — 길찾기 비용↑. 2단까지 허용.
- 같은 메뉴 안에 같은 의미 item 중복 — 결정 피로.
- destructive item을 separator 없이 일반 item과 섞기 — 실수 클릭 위험.
- trigger 텍스트가 메뉴 상태를 표시 안 함 — chevron 또는 상태 텍스트로 affordance 강화.

## Migration notes

- 기존 `dropdown-menu.tsx`는 `rounded-sm`(content) / `rounded-xs`(item) / `text-title-sm`(item) / `px-2 py-1.5`(8 · 6) — [`Context Menu`](context-menu.md) SoT(`rounded-md` content + `rounded-sm` item + `body-md` font + token padding)와 동기 정정.
- min-width `min-w-[8rem]` (128) → `min-w-40` (160) — context-menu와 통일.
- transition `transition-colors` 제거 — Radix가 focus state 즉시 적용, transition 불필요.
- destructive variant 신규 도입 — `data-variant="destructive"` 또는 className으로 `text-error` + hover error-mix 분기.
- box-shadow는 Tailwind utility(`shadow-md`) 대신 inline `style={{ boxShadow: "var(--shadow-md)" }}` — Card/Dialog/Drawer/Popover/Sonner/Tooltip/HoverCard/ContextMenu와 동일 fix 패턴. 상세는 [`dialog.md`](dialog.md) Migration notes 참조.
- 예제 BTN 상수 `transition-colors` `gap-2 h-10 px-4 text-title-sm` → button.md outline md spec 정합 (`font-sans` + motion 토큰 + `text-body-md`).
- preview-html에 dropdown-menu 별도 CSS 없음 — site (tsx + examples)가 단일 SoT.
