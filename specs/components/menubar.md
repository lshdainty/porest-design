# Menubar

> 데스크탑 앱 상단의 **고정 메뉴바** — File / Edit / View / Help 같은 카테고리 라벨 가로 정렬 + 클릭/hover 시 드롭다운으로 액션 노출. [`Dropdown Menu`](dropdown-menu.md) / [`Context Menu`](context-menu.md)와 같은 **menu family** 시각 통일 — content panel + item은 동일 spec, **bar(가로 strip)만 menubar 고유 시각**. Radix `Menubar` 베이스.

Porest Menubar는 **단일 spec × 2 영역(Bar / Content)**으로 정의됩니다. Bar는 가로 strip(h-10 + border + radius-sm + space-x-xs)에 짧은 카테고리 trigger(title-sm + medium + px-3 py-1.5). Content는 [`Dropdown Menu`](dropdown-menu.md) 시각 인용 — `surface-default` + border 1px + `radius-md` + `shadow-md` + `padding-xs` + min-width 192. Item은 `body-md` + `radius-sm` + `padding-sm/md`. CheckboxItem/RadioItem/SubTrigger/Label/Separator/Shortcut도 모두 dropdown-menu와 동일 시각.

## Anatomy

```
bar (h-10):
┌─────────────────────────────────────────┐
│ ⓑ File   ⓑ Edit   ⓑ View   ⓑ Help        │  ← bar (border + radius-sm + p-xs)
└─────────────────────────────────────────┘
   ▼ trigger click (또는 hover)
┌────────────────────────────────┐
│ ⓔ 새 파일             ⌘T  ⓘ   │  ← content (radius-md + shadow-md, dropdown-menu 정합)
│ ⓔ 새 창               ⌘N      │
│ ─────────────── ⓗ              │
│ ⓔ 공유하기                     │
│ ─ ⓗ                            │
│ ⓔ 인쇄                 ⌘P      │
└────────────────────────────────┘
```

| ⓐ Bar root | `<div>` (Radix `Menubar.Root`) — `flex h-10 items-center space-x-[var(--spacing-xs)] rounded-sm border border-border-default bg-surface-default p-[var(--spacing-xs)]`. 가로 strip + 좌우 trigger 정렬. |
| ⓑ MenubarTrigger | `<button>` (Radix `Menubar.Trigger`) — `flex cursor-default select-none items-center rounded-xs px-[var(--spacing-md)] py-[var(--spacing-sm)] text-title-sm font-medium text-text-primary outline-none transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus:bg-surface-input focus:text-text-primary data-[state=open]:bg-surface-input data-[state=open]:text-text-primary`. |
| ⓒ MenubarContent | Radix Portal + Content — `z-50 min-w-[12rem] overflow-hidden rounded-md border border-border-default bg-surface-default p-[var(--spacing-xs)] text-text-primary shadow-md` + animation. [`Dropdown Menu`](dropdown-menu.md) spec 정합. |
| ⓓ MenubarSubContent | 동일 시각 — sub menu open 시 우측 슬라이드. |
| ⓔ MenubarItem | `flex cursor-default select-none items-center rounded-sm px-[var(--spacing-md)] py-[var(--spacing-sm)] text-body-md text-text-primary outline-none transition-colors duration-[var(--motion-duration-fast)] focus:bg-surface-input focus:text-text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50` — dropdown-menu item 정합. |
| ⓕ MenubarCheckboxItem | `pl-[var(--spacing-2xl)] pr-[var(--spacing-md)]` + 좌측 `Check` 16 indicator. |
| ⓖ MenubarRadioItem | 동일 + 좌측 `Circle` 8 fill indicator. |
| ⓗ MenubarSeparator | `-mx-[var(--spacing-xs)] my-[var(--spacing-xs)] h-px bg-border-default` — content padding 보정. |
| ⓘ MenubarShortcut | `ml-auto text-label-sm tracking-widest text-text-tertiary` — `⌘P` 키 시각, 우측 정렬. |
| ⓙ MenubarLabel | `px-[var(--spacing-md)] py-[var(--spacing-sm)] text-label-sm font-medium text-text-secondary` — 그룹 헤딩. |
| ⓚ MenubarSubTrigger | item 시각 + 우측 `ChevronRight` 16 자동. |

**규칙**

- **Menu family 시각 통일** — Content/Item/Sub/Separator/Shortcut/Label은 [`Dropdown Menu`](dropdown-menu.md) / [`Context Menu`](context-menu.md)와 1:1 동일. Menubar 고유 시각은 **Bar(가로 strip)와 MenubarTrigger(bar 안 trigger)**만.
- Bar는 항상 데스크탑 앱 상단 — 모바일 친화 아님(좁은 화면에선 hamburger nav). 모바일 시나리오는 [`Sheet`](sheet.md) `side="left"` 권장.
- MenubarTrigger는 짧은 카테고리 라벨(2–8자) — "File"/"Edit"/"View"/"새 파일"/"편집" 등. 긴 라벨은 시각 깨짐.
- Content는 첫 trigger 클릭 후 다른 trigger hover로 즉시 전환 — Radix가 자동(메뉴바 native UX).
- MenubarSubContent는 우측 슬라이드 — depth 2단까지 권장(3단+는 사용자 인지 부담).
- shortcut(`⌘P` 등)은 데스크탑 키보드 친화 — 모바일에선 표시 무관. screen reader는 `aria-keyshortcuts` 권장.

## Variants

Menubar는 **variant 없음** — 데스크탑 메뉴바 단일 패턴. Item 종류(default / checkbox / radio / sub-trigger)는 composition으로 분기.

## Sizes

Menubar는 **size variant 없음** — Bar는 `h-10` 고정, Content는 min-width 192 고정. 사용처 className으로 폭 override 가능.

| 항목 | 값 | 토큰 |
|---|---|---|
| Bar height | 40px | `h-10` |
| Bar gap (trigger 사이) | 4px | `space-x-[var(--spacing-xs)]` |
| Bar padding | 4px | `p-[var(--spacing-xs)]` |
| Bar border | 1px solid | `border border-border-default` |
| Bar radius | 4px | `rounded-sm` |
| Trigger padding | 12 × 8 | `px-[var(--spacing-md)] py-[var(--spacing-sm)]` |
| Trigger radius | 2px | `rounded-xs` |
| Trigger font | 16 / 500 | `text-title-sm font-medium` |
| Content min-width | 192px | `min-w-[12rem]` |
| Content radius | 8px | `rounded-md` |
| Content padding | 4px | `p-[var(--spacing-xs)]` |
| Content shadow | shadow-md | `shadow-md` |
| Item padding | 12 × 8 | `px-[var(--spacing-md)] py-[var(--spacing-sm)]` |
| Item radius | 4px | `rounded-sm` |
| Item font | 15 / 400 | `text-body-md` |
| Checkbox/Radio left padding | 32px | `pl-[var(--spacing-2xl)]` |
| Indicator size (Check) | 16×16 | `h-4 w-4` |
| Indicator size (Circle) | 8×8 | `h-2 w-2` |
| Separator | 1px line + margin -xs | `-mx-[var(--spacing-xs)] my-[var(--spacing-xs)] h-px bg-border-default` |
| Shortcut font | 13 / 500 / wide | `text-label-sm tracking-widest text-text-tertiary` |
| Label font | 13 / 500 | `text-label-sm font-medium text-text-secondary` |
| Transition | colors | `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |
| z-index | 50 | (literal) |

## States

### MenubarTrigger (Bar 안)

| State | Background | Text |
|---|---|---|
| `default` | transparent | `text-primary` |
| `hover` (focus) | `surface-input` | `text-primary` |
| `data-state=open` | `surface-input` | `text-primary` |

### MenubarItem (Content 안)

| State | Background | Text |
|---|---|---|
| `default` | transparent | `text-primary` |
| `focus` (keyboard/mouse) | `surface-input` | `text-primary` |
| `disabled` | transparent | `text-primary` opacity 0.5 + `cursor-not-allowed` |

[`Dropdown Menu`](dropdown-menu.md) State matrix 그대로 인용.

## Layout

**Desk 데스크탑 앱 메뉴바**

- 메모 앱 상단 — `File`(새 파일/새 창/공유/인쇄) + `Edit`(실행 취소/잘라내기/붙여넣기) + `View`(사이드바 토글/줌) + `Help`(단축키 안내/피드백). 데스크탑 macOS/Windows 친화 패턴.

**HR 어드민 메뉴바**

- 어드민 페이지 상단 — `회사`(설정/직원 추가/부서 관리) + `근태`(휴가 정책/근무 시간) + `급여`(명세서 생성/세금) + `결재`(승인 대기/완료). 어드민 권한 사용자가 빠른 키보드 navigation.

**Editor toolbar 대체 안**

- 에디터(메모/회의록) 상단 — `File`/`Edit`/`Format`/`Insert`. 모바일에선 floating toolbar로 fallback.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| MenubarTrigger click | Content open. `data-state="open"`. |
| MenubarTrigger hover (open된 메뉴바 안) | 다른 trigger hover 시 즉시 content 전환 (Radix native — 메뉴바 표준 UX). |
| MenubarItem click | 액션 실행 + Content close. |
| `Escape` | Content close + focus는 Trigger로 복귀. |
| `ArrowLeft/Right` (Trigger focus) | 다음/이전 Trigger focus. open 상태에선 다른 Content로 전환. |
| `ArrowUp/Down` (Content open) | item 사이 focus 이동. |
| `Enter` / `Space` (item focus) | 액션 실행. |
| `ArrowRight` (SubTrigger focus) | sub menu open. |
| `ArrowLeft` (SubContent open) | sub menu close + focus는 SubTrigger로 복귀. |
| Shortcut(`⌘P` 등) | 사용처가 keyboard listener로 구현. Menubar는 시각만 표시. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (Trigger/Item text × bg) | `text-primary` 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (Shortcut text × bg) | `text-tertiary` 4.6:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (Bar border × bg-page) | `border-default` 1.4:1 — 약함이나 Bar는 페이지 상단 고정 위계라 시각 식별. |
| **WCAG 2.1.1** Keyboard | `Tab`/`ArrowLeft/Right/Up/Down`/`Enter`/`Escape` 모두 가능 ✓ |
| **WCAG 2.1.2** No Keyboard Trap | `Escape`로 dismiss + focus 복귀 ✓ |
| **WCAG 2.4.3** Focus Order | bar trigger → content open 후 첫 item으로 자동 이동 (Radix) ✓ |
| **WCAG 2.4.7** Focus Visible | focus 상태 시 `bg-surface-input` 자동 부여 ✓ (`focus-visible:ring`은 별도 필요 시 사용처 className) |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | Trigger 40×?(가변) — height만 40, width 가변. 미달 가능(⚠). 모바일 화면이면 [`Sheet`](sheet.md) nav 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 40 ✓ |
| **ARIA** | Radix가 `role="menubar"` (root) + `role="menu"` (content) + `role="menuitem"`/`menuitemcheckbox`/`menuitemradio` + `aria-haspopup`/`aria-expanded` + `aria-keyshortcuts` (shortcut) 자동 부여. |

## Do / Don't

### ✅ Do

- **데스크탑 앱 메뉴바** — File/Edit/View/Help 같은 카테고리 라벨.
- 카테고리는 2–6개 — 7개 이상은 시각 폭발. 메인 카테고리 통합 권장.
- Content 안 액션은 grouping — Separator로 의미 단위 분리("새 파일/새 창" + "공유" + "인쇄").
- Shortcut 표시 — 데스크탑 키보드 친화 (`⌘P`/`⌘N` 등). 모바일은 표시 안 함.
- Submenu는 2단까지 — 3단+는 사용자 인지 부담.
- [`Dropdown Menu`](dropdown-menu.md) / [`Context Menu`](context-menu.md)와 시각 통일 — Content/Item spec 인용.

### ❌ Don't

- 모바일 친화 화면에 Menubar — 가로 폭 부족, touch target 미달. [`Sheet`](sheet.md) nav 또는 hamburger.
- Trigger 긴 라벨(8자+) — 시각 깨짐, 횡 폭 폭발. 짧은 카테고리 라벨만.
- Submenu 3단+ — UI 복잡도 ↑, 사용자 잃어버림.
- Content 안 5+ item per group — Separator로 그룹 분리, 그룹당 4–6 item 권장.
- Menubar를 도메인 nav로 — 카테고리는 application 액션. 페이지 nav는 [`Navigation Menu`](./) 또는 sidebar.

## Migration notes

- 기존 `menubar.tsx`는 menu family 시각 정합 부족 — [`Dropdown Menu`](dropdown-menu.md) / [`Context Menu`](context-menu.md) spec과 시각 통일로 정정:
  - Content `rounded-sm` → **`rounded-md`** (dropdown-menu 정합).
  - Content `p-1` → `p-[var(--spacing-xs)]` (4 토큰).
  - Item `rounded-xs` → **`rounded-sm`** (dropdown-menu 정합).
  - Item `text-title-sm` → **`text-body-md`** (dropdown-menu 정합 — title-sm은 bar trigger만).
  - Item `px-2 py-1.5` → `px-[var(--spacing-md)] py-[var(--spacing-sm)]` (12/8 토큰).
  - CheckboxItem/RadioItem `pl-8` → `pl-[var(--spacing-2xl)]` (32 토큰).
  - SubTrigger 동일 정합.
  - Separator `-mx-1 my-1` → `-mx-[var(--spacing-xs)] my-[var(--spacing-xs)]` (토큰).
  - Bar `space-x-1 p-1` → `space-x-[var(--spacing-xs)] p-[var(--spacing-xs)]`.
  - Bar Trigger `px-3 py-1.5` → `px-[var(--spacing-md)] py-[var(--spacing-sm)]` (12/8).
- transition motion 토큰 추가 — `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` (Trigger + Item).
- preview-html `.mb-*`는 brand vignette용 별도 시각(가로 strip + caption + radius-sm + monospace key) — site SoT(menubar.md 본 spec)와 다른 톤. brand vignette mock-up이라 별도 시각 유지.
