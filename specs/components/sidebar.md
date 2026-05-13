# Sidebar

> 데스크탑 앱의 **좌·우 고정 사이드 nav** — 로고 + 그룹별 메뉴 + footer(설정/사용자)로 layout 전체를 감싸는 primitive. shadcn `Sidebar` 베이스 — `SidebarProvider`/`Sidebar`/`SidebarMenu`/`SidebarMenuButton` 등 15+ sub-components composition + 모바일 자동 [`Sheet`](sheet.md) fallback + 토글 cookie persistence.

Porest Sidebar는 **2 sides × 3 variants × 3 collapsible modes × menu item 합성** 매트릭스로 정의됩니다. layout 전체를 감싸는 큰 컴포넌트 — `<SidebarProvider><Sidebar />{...main}</SidebarProvider>`. SidebarMenuButton은 icon 16 + 라벨(`body-md`) + 좌측 정렬 + `rounded-sm` + hover/active `bg-surface-input`. Active는 fill 강조(menu family 정합) — preview `.sb-item--active`의 border-left 3px accent는 site SoT 외 옵션(spec에서 fill 톤 우선).

## Anatomy

```
┌──────────────┬────────────────────────────────┐
│ ⓑ Header     │                                │
│ 🌿 Porest    │ ⓘ SidebarInset (main content)   │
├──────────────┤                                │
│ ⓓ Group      │ [☰ ⓒ Trigger]  대시보드        │
│ NAVIGATION   │                                │
│ ⓔ ⓕ 홈       │ ──────────────────────────     │
│   📥 받은편지함 │                                │
│   📅 캘린더   │ 본문 콘텐츠                     │
│   🔍 검색    │                                │
│              │                                │
├──────────────┤                                │
│ ⓗ Footer     │                                │
│   ⚙️ 설정    │                                │
└──────────────┴────────────────────────────────┘
  ▲ ⓐ Sidebar (w-[--sidebar-width] 16rem)
```

| ⓐ SidebarProvider | layout 최상위 — context(`state`, `isMobile`, `toggle`) 제공. CSS variable `--sidebar-width`(16rem) / `--sidebar-width-icon`(3rem) 정의. cookie로 expanded/collapsed 상태 persistence(`sidebar:state`). `Ctrl/⌘ + B` 단축키 자동 binding. |
| ⓑ SidebarHeader | `flex flex-col gap-[var(--spacing-sm)] p-[var(--spacing-sm)]` — 로고/앱 이름 + 옵션 액션. 보통 첫 row는 큰 SidebarMenuButton(size `lg`) 로고. |
| ⓒ SidebarTrigger | [`Button`](button.md) `variant="ghost" size="icon"` (28×28) + `PanelLeft` 14×14 + `onClick` 토글. 메인 콘텐츠 헤더 좌측 배치. |
| ⓓ SidebarGroup | `flex flex-col p-[var(--spacing-sm)]` — 메뉴 그룹 wrapper. label + content. |
| ⓔ SidebarGroupLabel | `px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-caption font-semibold uppercase tracking-wide text-text-tertiary` — 그룹 카테고리 헤딩(preview `.sb-group` 정합). |
| ⓕ SidebarMenu | `<ul>` — `flex w-full min-w-0 flex-col gap-[var(--spacing-xs)]`. menu item 묶음. |
| ⓖ SidebarMenuItem | `<li>` — `group/menu-item relative`. semantic wrapper. |
| ⓢ SidebarMenuButton | `<button>` 또는 `asChild` `<a>` — `flex w-full items-center gap-[var(--spacing-sm)] overflow-hidden rounded-sm p-[var(--spacing-sm)] text-left text-body-md text-text-primary transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] hover:bg-surface-input focus-visible:ring-2 focus-visible:ring-ring active:bg-surface-input data-[active=true]:bg-surface-input data-[active=true]:font-medium`. icon 16 + 라벨. |
| ⓗ SidebarFooter | `flex flex-col gap-[var(--spacing-sm)] p-[var(--spacing-sm)] border-t border-border-default mt-auto` — 사용자/설정 등. |
| ⓘ SidebarInset | 메인 콘텐츠 영역 — `relative flex min-h-svh flex-1 flex-col bg-bg-page`. Sidebar 옆에 자리. variant=floating/inset 시 `m-[var(--spacing-sm)] rounded-md shadow`. |
| ⓙ SidebarSeparator | `[`Separator`](separator.md)` 인용 — `-mx-[var(--spacing-xs)] my-[var(--spacing-xs)] h-px bg-border-default`. |
| ⓚ SidebarInput | `[`Input`](input.md)` 인용 — sidebar 안 검색 input(`h-8 + body-md`). |
| ⓛ SidebarMenuSkeleton | [`Skeleton`](skeleton.md) 인용 — 로딩 중 menu item placeholder(`h-8 + animate-pulse`). |

**규칙**

- `SidebarProvider`가 최상위 — `defaultOpen` prop으로 초기 상태, cookie로 자동 persistence.
- 모바일(`<768px`) 자동 fallback — [`Sheet`](sheet.md) `side={side}` portal로 변경. 사용자 인지 부담 ↓.
- `Ctrl/⌘ + B` 토글 단축키 자동 — power user 친화.
- Menu item의 icon은 16×16 — 라벨과 시각 위계 균형. icon-only(collapsed) 시 `size-8` 정사각.
- Active state는 **`bg-surface-input` fill + `font-medium`** — menu family([`Dropdown Menu`](dropdown-menu.md) / [`Context Menu`](context-menu.md))와 시각 통일. preview의 `border-left 3px primary` 패턴은 옵션(`data-[active=true]:border-l-[3px] border-l-primary` className으로 추가).
- Group label은 `text-caption` + `uppercase` + `tracking-wide` + `text-tertiary` — preview `.sb-group` 정합. shadcn 기본 `text-label-sm`(13)보다 작아 group 위계 명확.
- Logo row는 `size="lg"` (`h-12`) — 메뉴 item(`h-8`)보다 크게.

## Variants (side / variant / collapsible)

### side

| Variant | 동작 |
|---|---|
| `left` *(default)* | 좌측 고정 — 가장 흔한 패턴 |
| `right` | 우측 고정 — RTL 언어 또는 보조 nav |

### variant

| Variant | 동작 | 사용처 |
|---|---|---|
| `sidebar` *(default)* | full-height + border-r/-l 1px solid | 일반 데스크탑 앱 nav |
| `floating` | full-height + margin 8 + radius-md + border + shadow | floating panel 스타일, 페이지 안 떠 있음 |
| `inset` | full-height + margin 8 + main content `rounded-md` | inset card layout, 메인 콘텐츠가 카드 형식 |

### collapsible

| Mode | 동작 |
|---|---|
| `offcanvas` *(default)* | collapsed 시 화면 밖으로 슬라이드 (width 0) |
| `icon` | collapsed 시 icon-only 좁은 폭(`w-[var(--sidebar-width-icon)]` 3rem) — tooltip으로 라벨 표시 |
| `none` | 토글 불가, 항상 expanded |

## Sizes

Sidebar는 자체 size 없음 — width는 CSS variable.

| 항목 | 값 | 토큰/규칙 |
|---|---|---|
| Sidebar width (expanded) | 16rem (256px) | `--sidebar-width` |
| Sidebar width (mobile Sheet) | 18rem (288px) | `--sidebar-width-mobile` |
| Sidebar width (icon collapsed) | 3rem (48px) | `--sidebar-width-icon` |
| SidebarHeader/Footer padding | 8px | `p-[var(--spacing-sm)]` |
| SidebarGroup padding | 8px | `p-[var(--spacing-sm)]` |
| SidebarGroupLabel font | 12 / 600 / tertiary + uppercase | `text-caption font-semibold uppercase tracking-wide text-text-tertiary` |
| SidebarMenu gap | 4px | `gap-[var(--spacing-xs)]` |
| SidebarMenuButton (default) | h-8 + p-sm + body-md | `h-8 p-[var(--spacing-sm)] text-body-md` |
| SidebarMenuButton (sm) | h-7 + label-sm | `h-7 text-label-sm` |
| SidebarMenuButton (lg) | h-12 + body-md (logo row) | `h-12 text-body-md` |
| Menu item gap (icon ↔ label) | 8px | `gap-[var(--spacing-sm)]` |
| Menu item radius | 4px | `rounded-sm` (menu family 정합) |
| Icon size | 16×16 | `[&>svg]:size-4` |
| Trigger (PanelLeft) | 28×28 | [`Button`](button.md) `variant="ghost" size="icon"` |
| Transition | colors + width | `transition-colors duration-[var(--motion-duration-fast)]` + `transition-[width] duration-200 ease-linear` |
| Keyboard shortcut | `Ctrl/⌘ + B` | (Provider 자동 binding) |

## States

### SidebarMenuButton

| State | Background | Text |
|---|---|---|
| `default` | transparent | `text-primary` |
| `hover` | `surface-input` | `text-primary` |
| `focus-visible` | (변화 없음) | + `ring-2 ring-ring` |
| `active` (`data-[active=true]`) | `surface-input` | `text-primary` + `font-medium` |
| `disabled` (`aria-disabled` / `disabled`) | transparent | opacity 0.5 + `cursor-not-allowed` |
| `data-state=open` (sub-menu) | `surface-input` | `text-primary` |

### Sidebar (collapsed/expanded)

| State | 시각 |
|---|---|
| `expanded` (default) | full width (16rem), 라벨 가시 |
| `collapsed` (offcanvas) | width 0, 화면 밖 |
| `collapsed` (icon) | width 3rem, icon만 — tooltip으로 라벨 |
| `mobile` (`isMobile`) | [`Sheet`](sheet.md) `side={side}` overlay |

## Layout (한국 도메인 패턴)

**Desk 앱 sidebar — left + sidebar variant**

- 로고(`Leaf` + "Desk") + 그룹(메모/할일/가계부/캘린더) + 검색 input + footer(설정/사용자).
- 활성 페이지는 `isActive` — `bg-surface-input` + `font-medium`.

**HR 어드민 sidebar — left + inset variant**

- 로고("Porest HR") + 그룹 분리(조직 / 근태 / 결재 / 통계) + footer(설정/계정).
- 어드민 페이지가 많은 데이터 카드 + sidebar inset(메인 콘텐츠 rounded-md).

**Marketing dashboard sidebar — collapsible icon**

- 데이터 시각화 페이지 — `collapsible="icon"`으로 좁은 화면에선 icon-only.
- tooltip은 sub-menu/메뉴 항목 hover 시 우측 노출(SidebarMenuButton의 `tooltip` prop).

**Mobile fallback (자동)**

- `<768px` 폭에서 Sidebar는 [`Sheet`](sheet.md) `side="left"`로 변환 — `SIDEBAR_WIDTH_MOBILE` (18rem).
- SidebarTrigger 클릭 시 햄버거 메뉴 open.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| SidebarTrigger click | Sidebar open/close 토글. `state` 변경 + cookie 저장. |
| `Ctrl/⌘ + B` | 동일 토글 (Provider 자동). |
| SidebarMenuButton click | 사용처가 routing 처리 (Link wrap 또는 onClick). `isActive` prop으로 현재 페이지 표시. |
| `Tab` | menu button 사이 focus 이동. |
| `Escape` (mobile Sheet open) | Sidebar close. |
| Resize (< md) | 자동 mobile mode 전환 — desktop sidebar unmount + Sheet mount. |
| Hover (collapsed icon) | icon 옆에 tooltip으로 라벨 노출(SidebarMenuButton `tooltip` prop). |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (menu button text × bg) | `text-primary` 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (group label × bg) | `text-tertiary` 4.6:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (Sidebar border × bg-page) | `border-default` 1.4:1 — `bg-surface-default` background 차이로 시각 식별. floating variant는 shadow 보강. |
| **WCAG 2.1.1** Keyboard | `Tab`/`Enter`/`Space` 모두 가능 + `Ctrl/⌘ + B` 토글 ✓ |
| **WCAG 2.4.7** Focus Visible | `focus-visible:ring-2 ring-ring` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | MenuButton default `h-8` (32) — 미달(⚠). 모바일 친화 환경이면 `size="lg"`(`h-12` 48) 또는 mobile은 Sheet fallback으로 충분한 height 자동. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 32 ✓ |
| **ARIA** | Sidebar는 `<nav>` 시맨틱 또는 `role="navigation"`. SidebarMenuButton은 `aria-current="page"` (활성 페이지) + `data-active="true"`. collapsed icon-only는 tooltip으로 라벨 보강. |

## Sidebar vs Sheet 사용 가이드

| 항목 | Sidebar (이 spec) | [`Sheet`](sheet.md) |
|---|---|---|
| 위치 | layout 고정 (desktop) / Sheet fallback (mobile) | 화면 가장자리 (4 sides) |
| 사용처 | 앱 메인 nav (영구적) | 필터/상세/임시 패널 |
| 토글 | Provider 토글, cookie persistence | trigger click 즉시 |
| Composition | 15+ sub-components | 5 sub-components |
| 시각 단위 | 메인 layout의 일부 | modal-style 임시 |

## Do / Don't

### ✅ Do

- **데스크탑 앱 메인 nav** — 영구 layout, 사용자가 자주 toggle.
- **collapsible="icon"** — 좁은 화면 + tooltip으로 라벨 보강. power user 친화.
- **그룹 분리(SidebarGroup)** — 카테고리 명확. label은 uppercase + tertiary로 위계 약화.
- **활성 페이지 `isActive`** — `bg-surface-input` + `font-medium` + `aria-current="page"`.
- **mobile auto-Sheet** — `<768px` 폭은 자동 [`Sheet`](sheet.md) 변환. 별도 처리 불필요.
- **`Ctrl/⌘ + B` 단축키** — power user keyboard 친화.

### ❌ Don't

- **임시 / 필터 / 상세 패널을 Sidebar로** — 영구 nav가 아닌 임시 콘텐츠는 [`Sheet`](sheet.md).
- **메뉴 7+개 평탄** — SidebarGroup으로 카테고리 분리, 그룹당 4–6 item.
- **icon-only without tooltip** — collapsed icon mode에선 SidebarMenuButton `tooltip` prop 필수.
- **SidebarProvider 없이 Sidebar 사용** — context error. layout 최상위에 Provider 필수.
- **Sidebar 안 form/dialog 중첩** — 시각 위계 깨짐. Dialog는 별도 portal.

## Migration notes

- 기존 `sidebar.tsx`는 shadcn 기본 + Porest 색 토큰 일부 정합. 추가 정정:
  - SidebarMenuButton `rounded-xs` (2px) → **`rounded-sm`** (4px) — menu family([`Dropdown Menu`](dropdown-menu.md)) 정합.
  - SidebarMenuButton `text-title-sm` (16) → **`text-body-md`** (15) — menu item은 본문급 가독성.
  - SidebarMenuButton `gap-2 p-2` (Tailwind 8) → `gap-[var(--spacing-sm)] p-[var(--spacing-sm)]` 토큰 직접 인용.
  - SidebarMenuButton `transition-[width,height,padding]` → `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` 추가(motion 토큰).
  - SidebarGroupLabel — preview `.sb-group` 정합 (`text-caption font-semibold uppercase tracking-wide text-text-tertiary`). 기존 shadcn 기본은 `text-label-sm font-medium`이라 위계 약화 부족.
  - SidebarMenuItem `gap-1` → `gap-[var(--spacing-xs)]`.
- examples 한국 도메인 정합:
  - 기존 Default(Porest 로고 + 홈/받은편지함/캘린더/검색) 유지 + 토큰화.
  - HR 어드민 / Desk 앱 시나리오 추가 (조직·근태·결재 / 메모·할일·가계부·캘린더).
- preview-html `.sb-*` 시각 — group label(caption + uppercase + tertiary)은 site SoT로 채택. active state border-left 3px primary는 preview만의 톤(옵션 — spec에선 fill 톤이 기본).
