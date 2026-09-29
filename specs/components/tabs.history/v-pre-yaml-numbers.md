# Tabs

> 같은 영역에서 여러 view 간 전환을 가능하게 하는 navigation 컨트롤. 설정 페이지 섹션(계정/비밀번호), 프로필 view(개요/활동/설정), 폼 단계 전환 같이 **상호 배타적 view group** 사이를 한 컴포넌트 안에서 토글. Radix `Tabs` 베이스 + 키보드 네비/ARIA 자동.

Porest Tabs는 **3 variants(container/underline/pills) × manual activation** 매트릭스로 정의됩니다. site `tabs-examples.mjs` SoT 정합 — Container variant: `surface-input` wrapper + active 시 `surface-default` + `shadow-sm`(절제된 pill-in-container). Underline variant: bottom border + active 시 `primary` 색 + 2px 하단 라인(textbook tab 톤). Pills variant: `radius-md` soft rectangle + active 시 `primary` fill + `text-on-accent` 흰색(토스 모바일 톤 — 큰 hit area + 즉시 식별). 세 variant 모두 같은 시맨틱(`role="tablist"` + `role="tab"` + `aria-selected`).

## Anatomy

```
Container variant (default — site SoT)

┌─────────────────────────────────────┐
│ ⓐ TabsList (surface-input + p-1)    │
│  ┌──────────┐ ┌──────────┐          │
│  │ 계정     │ │ 비밀번호  │          │   ← trigger: active(surface-default + shadow-sm)
│  │ (active) │ │          │          │     vs inactive(text-secondary)
│  └──────────┘ └──────────┘          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ ⓑ TabsContent (mt-sm)                │
│   active tab의 콘텐츠                 │
└─────────────────────────────────────┘

Underline variant (절제된 톤)

┌──────┬──────┬──────┐
│ 개요  │ 활동 │ 설정 │
│ ──── │      │      │   ← active: primary 색 + 2px 하단 라인
└──────┴──────┴──────┘
─────────────────────  ← border-default 1px

  active tab의 콘텐츠

Pills variant (토스 모바일 톤 — soft rectangle + primary fill)

  [ 전체 ]  즐겨찾기   오늘    보관함     ← active: primary fill + on-accent 흰색 + radius-md
  ▲                                       inactive: transparent + text-secondary
  active

  active tab의 콘텐츠
```

| ⓐ TabsList | container: `inline-flex h-10 items-center justify-center rounded-sm bg-surface-input p-[var(--spacing-xs)] text-text-secondary` / underline: `inline-flex bg-transparent border-b border-border-default w-full justify-start` / pills: `inline-flex gap-[var(--spacing-xs)] bg-transparent` (wrapper 없음) |
| ⓑ TabsTrigger | container: `rounded-xs px-[var(--spacing-md)] py-[var(--spacing-xs)] text-label-md font-medium` / underline: `rounded-none border-b-2 border-transparent px-[var(--spacing-md)] py-[var(--spacing-sm)] text-label-md font-medium` / pills: `rounded-md px-[var(--spacing-md)] py-[var(--spacing-sm)] text-label-md font-medium` |
| ⓒ active state | container: `data-[state=active]:bg-surface-default data-[state=active]:text-text-primary data-[state=active]:shadow-sm` / underline: `data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-text-primary` / pills: `data-[state=active]:bg-primary data-[state=active]:text-text-on-accent data-[state=active]:font-semibold` |
| ⓓ TabsContent | `mt-[var(--spacing-sm)]` (container) / `pt-[var(--spacing-lg)]` (underline — bottom border 아래 여유) |
| ⓔ focus ring | `focus-visible:ring-2 ring-ring ring-offset-2` |

**규칙**

- container variant: TabsList 자체가 `surface-input` 색 박스 — form input과 시각 친화. 일반 form/settings 페이지.
- underline variant: TabsList는 colorless, active만 primary 강조 — Toss 톤 절제. dense navigation/profile page.
- 두 variant 함께 사용 금지(한 페이지) — 시각 일관성 깨짐. 페이지/섹션 단위로 한 variant 선택.

## Variants

| Variant | 시각 | 사용처 |
|---|---|---|
| `container` *(default)* | `surface-input` wrapper + active pill에 `surface-default` + `shadow-sm` | 설정 페이지(계정/비밀번호), form section 토글. 시각 위계 명확. |
| `underline` | colorless + active 시 `primary` 색 + 2px 하단 라인 | 프로필/제품 detail page(개요/활동/리뷰), 절제된 navigation 톤. |
| `pills` | soft rectangle(`radius-md`) + active 시 `primary` fill + `text-on-accent` 흰색 | 모바일 navigation(카테고리 필터, 거래 종류 등). 토스 톤. 큰 hit area + 즉시 식별. |

브랜드 분기: underline `border-primary` + pills `bg-primary`가 HR `#357B5F` / Desk `#0147AD` 반영. container는 brand-neutral.

## Sizes

Tabs는 **container · pills 2 sizes(`default` / `sm`)** — underline은 size variant 없음(`auto height`, 사용처가 폭만 조정). container `default` `h-10`(40) / `sm` `h-8`(32), pills `sm`은 모바일 카테고리 필터용 얇은 pill. 사용처에서 trigger 개수에 따라 폭만 조정(`w-full grid-cols-N` 등). 아래 첫 표는 **각 variant의 default 시각**, 이어지는 `### Container size variant` / `### Pills size variant` 표는 size 분기.

| 항목 | container | underline | pills | 토큰 |
|---|---|---|---|---|
| List height | 40px | auto | auto | `h-10` (container) |
| List background | `surface-input` | transparent + `border-b border-default` | transparent | `bg-surface-input` (container) |
| List padding | 4px | 0 | 0 | `p-[var(--spacing-xs)]` (container) |
| List gap | 0 | 0 | 4px | `gap-[var(--spacing-xs)]` (pills) |
| List radius | 4px | 0 | 0 | `rounded-sm` (container) |
| Trigger padding (Y · X) | 4 · 12 | 8 · 12 | 8 · 12 | `var(--spacing-xs)` / `var(--spacing-sm)` · `var(--spacing-md)` |
| Trigger radius | 2px | 0 | 8px | `rounded-xs` / `rounded-md` |
| Trigger font | 14 / 500 | 14 / 500 | 14 / 500 (active 600) | `text-label-md font-medium` |
| Active bg | `surface-default` | transparent | `primary` | `bg-surface-default` / `bg-primary` |
| Active shadow | shadow-sm | none | none | `shadow-sm` |
| Active border (underline) | — | 2px solid `primary` | — | `border-b-2 border-primary` |
| Active text | `text-primary` | `text-primary` | `text-on-accent` | `text-text-primary` / `text-text-on-accent` |
| Active weight | 500 | 500 | 600 | `font-medium` / `font-semibold` |
| Inactive text | `text-secondary` | `text-secondary` | `text-secondary` | `text-text-secondary` |
| Content top margin | spacing-sm (8) | spacing-lg (16) | spacing-md (12) | `mt-[var(--spacing-sm/md)]` / `pt-[var(--spacing-lg)]` |

### Container size variant (`default` / `sm`)

`sm`은 정보 밀도 높은 **데스크 보조 컨트롤** 전용 — 정렬 선택·기간/빈도 토글·카드 내부 view 전환처럼 container 40px가 과한 시각 무게인 곳. [`Toggle`](toggle.md) `sm` 수치 체계(`min-h-7` 28 + token padding)를 container에 그대로 확장 — Toggle/ToggleGroup의 `sm`/`default`/`lg`(28/32/40)와 대칭. 이 표는 **container**의 sm — pills도 `sm`이 있음(아래 `### Pills size variant`), underline만 size 없음.

| 항목 | container `default` | container `sm` | 토큰 |
|---|---|---|---|
| List height | 40px | 32px | `h-10` / `h-8` |
| List padding | 4px | 2px | `p-[var(--spacing-xs)]` / `p-0.5` |
| List radius | 4px | 4px | `rounded-sm` |
| List background | `surface-input` | `surface-input` | `bg-surface-input` |
| List gap | 0 | 0 | — |
| Trigger min-height | 32px | 28px | `min-h-8` / `min-h-7` |
| Trigger padding (Y · X) | 4 · 12 | 4 · 8 | `py-[var(--spacing-xs)]` · `px-[var(--spacing-md)]` / `px-[var(--spacing-sm)]` |
| Trigger radius | 2px | 2px | `rounded-xs` |
| Trigger font | 14 / 500 | 13 / 500 | `text-label-md` / `text-label-sm font-medium` |
| Active bg | `surface-default` | `surface-default` | `bg-surface-default` |
| Active shadow | `shadow-sm` | `shadow-sm` | `shadow-sm` |
| Active text / weight | `text-primary` / 500 | `text-primary` / 500 | `text-text-primary` |
| Inactive text | `text-secondary` | `text-secondary` | `text-text-secondary` |
| Icon-only trigger | 32×32 | 28×28 | 아이콘 16px (`[&_svg]:size-4`) |

- `sm`은 `default` 대비 **height·padding·font만 축소** — 색/radius/active 처리·states(hover/focus/disabled)는 default와 동일. **신규 색 토큰 없음**(다크 분기도 default와 동일).
- List padding 2px = (List 32 − Trigger 28) ÷ 2 — pill이 32px list에 정확히 안착. spacing 토큰 스케일(4/8/12…)엔 없으나 Tailwind 하프스텝 `p-0.5`(2px, [`Badge`](badge.md) `py-0.5` 선례)로 표기. raw `p-[2px]` 금지.
- Trigger padding-X는 `default` `spacing-md`(12) → `sm` `spacing-sm`(8) — [`Toggle`](toggle.md) `sm` 정합. 10px 같은 off-token 값 금지.
- 사용처: `sm` = 폼/dialog 내 보조 토글(기간·빈도·우선순위·반복)·정렬 선택·카드 내부 view 전환·밀도 높은 데스크 탭 / `default`(40px) = 페이지 최상위 navigation 탭·모바일 주요 화면(터치 타깃).
- 코드: `size` prop은 `TabsList`에서 받아 context로 `TabsTrigger`에 전파([`ToggleGroup`](toggle-group.md) 패턴) — trigger마다 size 재지정 불필요.

### Pills size variant (`default` / `sm`)

pills `sm`은 **모바일 카테고리 필터·거래 종류** 등에서 `default`(py 8 / label-md)가 과한 높이일 때 — [`Toggle`](toggle.md) single 톤의 얇은 pill. radius-md·active 처리·간격은 동일, **height·padding·font만 축소**.

| 항목 | pills `default` | pills `sm` | 토큰 |
|---|---|---|---|
| Trigger padding (Y · X) | 8 · 12 | 4 · 8 | `py-[var(--spacing-sm)]`·`px-[var(--spacing-md)]` / `py-[var(--spacing-xs)]`·`px-[var(--spacing-sm)]` |
| Trigger min-height | ≈36 (내용) | 28px | `min-h-7` (sm) |
| Trigger font | 14 / 500 | 13 / 500 | `text-label-md` / `text-label-sm` |
| Trigger radius | 8px | 8px | `rounded-md` |
| Active | `primary` fill + `text-on-accent` + 600 | (동일) | `bg-primary` / `text-text-on-accent` |
| List gap | 4px | 4px | `gap-[var(--spacing-xs)]` |

- **active fill은 `primary` — 다크 모드에서 `primary-light` swap**(웹 `--fg-brand` / 앱 `t.bgBrand` = light=cobalt500 / dark=cobalt400). `text-on-accent` 흰 글씨와 함께 다크/라이트 자연스럽게. (raw `--bg-brand`/`bgBrandSolid` 같은 고정 cobalt 금지 — 다크에서 안 밝아짐)
- `sm`은 underline에는 없음(underline은 size 미적용). 사용처: 모바일 가계부 필터(전체/지출/수입)·거래 종류 등 밀도 높은 모바일 navigation.

## States

| State | container active | container inactive | underline active | underline inactive | pills active | pills inactive |
|---|---|---|---|---|---|---|
| `enabled` | `bg-surface-default` + `text-primary` + `shadow-sm` | `text-secondary` | `border-b-2 border-primary` + `text-primary` | `border-b-2 border-transparent` + `text-secondary` | `bg-primary` + `text-on-accent` + 600 | transparent + `text-secondary` |
| `hover` (inactive only) | (변화 없음) | `text-primary` | (변화 없음) | `text-primary` | (변화 없음) | `text-primary` + `bg-surface-input/50` |
| `focus-visible` | + `ring-2 ring-ring ring-offset-2` | + `ring-2 ring-ring ring-offset-2` | + `ring-2 ring-ring ring-offset-2` | + `ring-2 ring-ring ring-offset-2` | + `ring-2 ring-ring ring-offset-2` | + `ring-2 ring-ring ring-offset-2` |
| `disabled` | opacity 0.5 + `pointer-events-none` | opacity 0.5 + `pointer-events-none` | opacity 0.5 | opacity 0.5 | opacity 0.5 | opacity 0.5 |

active state 변화는 `transition-all duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` — color/bg/shadow 동시 부드러운 전환.

## Layout

**Container variant**

- TabsList 폭은 콘텐츠/사용처가 결정 — `inline-flex`(콘텐츠만큼) 또는 `grid grid-cols-N w-full`(균등 분배).
- 트리거 수 2–4개 권장. 5+는 underline 또는 dropdown으로.
- TabsContent는 `mt-sm` (8px) — list와 시각 분리.

**Underline variant**

- TabsList는 `w-full justify-start` — 좌측 정렬. 텍스트 길이만큼만 차지.
- 트리거 수 3–7개 권장. 8+는 scroll 또는 dropdown으로.
- TabsList 아래 `border-b 1px border-default` — 활성 트리거의 2px primary line이 이 line을 덮으며 자연 연결(`margin-bottom: -1px` 또는 동일 시각 처리).
- TabsContent는 `pt-lg` (16px) — bottom border와 콘텐츠 사이 여유.

**Pills variant**

- TabsList wrapper 없음 — `inline-flex gap-[var(--spacing-xs)]` 평면 배치.
- 트리거 3–6개 권장. 7+는 horizontal scroll 또는 dropdown 병행.
- 모바일 hit area를 위해 padding-Y `spacing-sm`(8) + radius-md — `radius-full`보다 절제된 토스 톤.
- Active trigger는 `bg-primary` + `text-on-accent` + 600 weight — inactive는 transparent + `text-secondary`. 색 + weight 동시 변화로 색맹 사용자에게도 명확.
- TabsContent는 `mt-md` (12px) — list 아래 자연 여유.

**Vertical tabs** (옵션)

- `flex-row` + TabsList `flex-col` — 좌측 사이드 navigation. Radix `orientation="vertical"`로 화살표 키 매핑 자동 전환.
- spec 외 범위 — 사용처에서 className 조합.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Trigger click | 해당 tab active + content 표시. `onValueChange` 콜백. |
| `ArrowLeft` / `ArrowRight` (horizontal) | 이전/다음 trigger로 focus 이동 (manual activation — 별도 클릭/엔터 필요). |
| `ArrowUp` / `ArrowDown` (vertical) | 위/아래 trigger focus 이동. |
| `Home` / `End` | 첫/마지막 trigger focus. |
| `Tab` | TabsList 진입 시 active trigger에 focus, 다음 `Tab`은 TabsContent로. |
| `Enter` / `Space` | focused trigger 활성화 (manual activation). |
| Disabled | 해당 trigger 비활성 — focus 이동 시 skip. |

**Manual activation (default)** — focus와 selection 분리. `Arrow` 키로 navigate, `Enter`/`Space`로 활성화. 화면 reader 환경에서 의도치 않은 콘텐츠 변경 회피.

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (container active `text-primary` × `surface-default`) | 21:1 ✓ |
| **WCAG 1.4.3** Color contrast (container inactive `text-secondary` × `surface-input`) | 9.2:1 ✓ |
| **WCAG 1.4.3** Color contrast (underline active `text-primary` × bg-page) | 14:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (container active `surface-default` × `surface-input`) | 1.2:1 — 채움 차이는 약함. `shadow-sm`이 elevation 보강 + 색 차이는 시각 식별 부수 수단. |
| **WCAG 1.4.11** Non-text contrast (underline `primary` border × bg-page) | HR 4.7:1+ ✓ / Desk 9.5:1 ✓ |
| **WCAG 2.1.1** Keyboard | `Arrow`/`Home`/`End`/`Enter`/`Space` 모든 동작 키보드 가능 ✓ |
| **WCAG 2.4.7** Focus Visible | trigger `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | container `default` 40px / `sm` 28px / underline 36px(8+14+8+2+4) — 모두 미달(⚠). `sm`은 포인터 중심 데스크 UI 전용([`Toggle`](toggle.md) `sm`과 동일 ⚠). 모바일 주요 동선은 `default` + padding-Y `var(--spacing-md)`(12)로 늘려 44+ 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | container `default` 40 / `sm` 28 / underline 36 — 모두 ✓ (sm 28 ≥ 24). |
| **WCAG 1.3.1** Info and Relationships | Radix가 `role="tablist"` / `role="tab"` / `aria-selected` / `aria-controls` / `role="tabpanel"` / `aria-labelledby` 자동 wire. |
| **ARIA** | manual activation(`activationMode="manual"`) 권장 — focus ≠ selection. screen reader 흐름 보존. |

## Do / Don't

### ✅ Do

- container variant는 **시각 위계 명확** 페이지에 — 설정/form section 토글. 채움 차이로 즉시 식별.
- underline variant는 **절제된 navigation** — profile/detail page. Toss 톤.
- pills variant는 **모바일 navigation** — 카테고리 필터, 거래 종류 등. 큰 hit area + primary 채움으로 즉시 식별.
- 한 페이지 한 variant — 시각 일관성. 페이지 단위 결정.
- manual activation 유지 — focus와 selection 분리로 screen reader 보호.

### ❌ Don't

- 한 페이지에 variant 2개 이상 혼용 — 시각 위계 혼란.
- 트리거 5+ container variant — 시각 noise. underline 또는 dropdown으로.
- 트리거 8+ underline — scroll/overflow 위험. dropdown 또는 sidebar로.
- 트리거 7+ pills — 화면 폭 초과. horizontal scroll 또는 dropdown 병행.
- TabsContent에 또 다른 Tabs nested — 인지 비용↑. 보통 1단까지.
- 활성 trigger 강조를 색만으로 — container는 채움 + shadow / underline은 색 + border 라인 / pills는 채움 + weight 변화 — 색맹 사용자 식별 가능 수단 둘 이상.
- pills variant에 `radius-full` — 토스 톤 절제 깨짐. `radius-md` 고정. 완전 둥근 pill은 별도 Chip 컴포넌트로.

## Migration notes

- 기존 `tabs-examples.mjs`는 inline `padding:8px 16px` / `margin-top:8px` / `padding-top:16px` 하드코드 — 토큰 직접 인용으로 정정.
- Default 예제의 TabsContent 안 Input은 `bg-surface-default` + `text-title-sm`(잘못된 톤) — input.md SoT(`bg-surface-input` + `body-md`)로 정정.
- TabsTrigger underline padding `px-4 py-2` → `px-[var(--spacing-md)] py-[var(--spacing-sm)]` (12/8) 토큰 직접 인용.
- TabsTrigger container padding `px-3 py-1.5` → `px-[var(--spacing-md)] py-[var(--spacing-xs)]` (12/4) 토큰 직접 인용.
- tabs.tsx의 `transition-all` 유지하되 motion 토큰 명시 — `duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]`.
- preview-html `.tabs-pills`는 `radius-full` 사용했으나(legacy) spec pills variant `radius-md` 정합으로 정정. 토스 모바일 톤 — 완전 둥근 pill보다 soft rectangle이 절제된 톤.
- preview-html `.tab` base font `caption` → `label-md` 정정 — spec 3 variant 모두 14/500 통일.
- **container `sm` size 신설** (porest-desk 앱 역싱크): Toggle `sm`(min-h-7 28 + token padding) 체계를 container에 확장. `default` trigger에 `min-h-8`(32) 명시 — pill이 list 32px 영역을 꽉 채워 Anatomy 정합(기존 ~28px → 32px, 4px 보강). `sm`은 container 전용 — underline/pills 미적용.
- **온토큰 보정** — 앱 제안 원본의 off-token 값 2건 정정: trigger padding-X `10px` → `spacing-sm`(8, Toggle `sm` 정합) / List padding raw `p-[2px]` → Tailwind 하프스텝 `p-0.5`(Badge 선례). spacing 토큰 스케일(4/8/12…) 이탈값 금지 원칙.
- preview-html(`.tab`)은 브랜드 톤(underline/pills) showcase 전용 — container `sm`은 4번째 source 비대상. 시각 검증은 site export(`tabs-examples.mjs` → `exports/site/components/tabs.html`)로.
