# Breadcrumb

> 현재 페이지가 사이트/앱 계층 구조에서 어디인지 표시하는 navigation 컴포넌트. 사용자가 상위 페이지로 빠르게 이동 가능. 마지막 항목은 현재 페이지(non-clickable, `aria-current="page"`).

Porest Breadcrumb은 **단일 size × 2 separator variants(chevron/slash) × ellipsis 옵션** 매트릭스로 정의됩니다. 폰트는 [`Input.md`](input.md)와 같은 form 수준에 자연 정렬하는 `body-sm` (14/400). Link는 `text-secondary` → hover/현재 페이지 `text-primary`(500) 시그니처로 현재 위치 즉시 식별. separator는 시각 취향이라 사용처가 결정 — 두 variant 모두 디자인 토큰 정합.

## Anatomy

```
┌──────────────────────────────────────────┐
│ ⓐ nav (aria-label="breadcrumb")          │
│   ⓑ ol (BreadcrumbList — flex + gap)     │
│     ⓒ li (Item) ⓓ a (Link)               │
│     ⓔ li (Separator — `>` 또는 `/`)     │
│     ⓒ li (Item) ⓓ a (Link)               │
│     ⓔ li (Separator)                     │
│     ⓒ li (Item) ⓕ span (Page · current)  │
└──────────────────────────────────────────┘
```

| ⓐ nav | `<nav aria-label="breadcrumb">` — screen reader가 "breadcrumb navigation"으로 인식. |
| ⓑ list | `flex flex-wrap items-center gap-[var(--spacing-sm)] break-words text-body-sm text-text-secondary`. `<ol>` semantic. |
| ⓒ item | `inline-flex items-center gap-[var(--spacing-sm)]`. `<li>` semantic. |
| ⓓ link | `<a>` — `text-text-secondary transition-[color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] hover:text-text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xs`. cursor pointer 자동. |
| ⓔ separator | `<li role="presentation" aria-hidden="true">` — `inline-flex items-center text-text-tertiary [&>svg]:h-3.5 [&>svg]:w-3.5`. chevron-right svg 또는 `/` 텍스트. |
| ⓕ page (current) | `<span role="link" aria-disabled="true" aria-current="page" className="font-medium text-text-primary">` — non-clickable 현재 페이지. weight 500로 강조. |
| ⓖ ellipsis (선택) | `<span role="presentation" aria-hidden="true" className="flex h-9 w-9 items-center justify-center">` + `MoreHorizontal` 16px. dropdown 트리거로도 활용 가능. |

**규칙**

- 마지막 항목은 항상 `BreadcrumbPage` — 클릭 불가 + `aria-current="page"`. 사용자 학습 비용↓.
- separator는 `aria-hidden="true"` — screen reader가 "/" 또는 ">"를 읽지 않음.
- link는 키보드 focus 가능 — `focus-visible:ring`. ellipsis도 dropdown 트리거일 땐 동일.
- 한국어 본문 가독성을 위해 `font-medium` (500) 사용 — `font-semibold` (600)은 본문보다 굵어 navigation 톤 깨짐.

## Variants (separator)

| Variant | Separator | 사용처 |
|---|---|---|
| `chevron` *(default)* | `>` (`ChevronRight` svg 14×14) | 일반 페이지 navigation. 시각적으로 방향성 명확(좌→우 위계 흐름). |
| `slash` | `/` (텍스트) | URL-like 또는 dense 레이아웃. preview brand vignette `.bc` SoT. |

separator 자체는 디자인 취향 차이 — 두 variant 모두 spec 정합. 사용처(페이지/사이드바)에서 선택.

## Sizes

Breadcrumb은 **size variant 없음** — 단일 spec. dense 레이아웃에선 className으로 `text-caption` (12) override 가능(예: preview brand vignette).

| 항목 | 값 | 토큰 |
|---|---|---|
| Font | 14 / 400 / 1.5 | `text-body-sm` |
| List gap (item ↔ separator ↔ item) | 8px | `gap-[var(--spacing-sm)]` |
| Item internal gap (link ↔ chevron) | 8px | `gap-[var(--spacing-sm)]` |
| Link color (default) | `text-secondary` | `text-text-secondary` |
| Link color (hover/focus) | `text-primary` | `text-text-primary` |
| Page color (current) | `text-primary` | `text-text-primary` |
| Page weight | 500 | `font-medium` |
| Separator color | `text-tertiary` | `text-text-tertiary` |
| Separator icon | 14×14 | `h-3.5 w-3.5` |
| Ellipsis hit area | 36×36 | `h-9 w-9` |
| Ellipsis icon | 16×16 | `h-4 w-4` |
| Transition | color | `duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |

## States

### Link

| State | Color | 추가 |
|---|---|---|
| `enabled` | `text-secondary` | — |
| `hover` | `text-primary` | `transition-[color]` |
| `focus-visible` | `text-primary` | + `ring-2 ring-ring ring-offset-2 rounded-xs` |
| `pressed` | `text-primary` (전환 중) | — |

### Page (current, non-clickable)

| State | Color | 추가 |
|---|---|---|
| `current` | `text-primary` + 500 | `aria-current="page"` |

### Separator / Ellipsis

| State | Color |
|---|---|
| 정적 | `text-tertiary` |

Ellipsis가 dropdown trigger일 땐 Link와 동일 hover/focus state 적용.

## Layout

**Default breadcrumb (chevron)**

- 페이지 상단(header 아래) 또는 page title 위. 좌측 정렬.
- 3–5 단계 권장 — 그 이상은 ellipsis로 압축.
- 모바일에선 `flex-wrap`으로 줄바꿈, 또는 첫 단계 + ellipsis + 마지막 2단계만 노출.

**With ellipsis (긴 경로 축약)**

- `홈 > ··· > UI > Breadcrumb` 패턴 — 중간 단계 dropdown으로 압축.
- ellipsis 클릭 시 dropdown menu로 축약된 단계 노출(`DropdownMenu` 조합).
- 단순 시각 표시만 필요할 땐 정적 ellipsis(클릭 불가).

**Slash variant (dense)**

- `홈 / 메모 / 보관함 / Porest 톤` — URL-like. preview brand vignette 톤.
- 시각 응집(공간 절약)에 유리. 사이드바·드롭다운 등 좁은 영역.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Link click | href로 navigate. |
| `Tab` | link 사이 focus 이동. ellipsis trigger도 focus 가능. |
| `Enter` (focus 상태) | link 활성화 또는 ellipsis dropdown open. |
| Page (current) | 클릭/focus 불가 — `aria-disabled="true"`. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text-secondary × bg-page) | 9.2:1 ✓ |
| **WCAG 1.4.3** Color contrast (text-primary × bg-page) | 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (text-tertiary separator × bg-page) | 4.6:1 ✓ (AA 본문) |
| **WCAG 1.4.11** Non-text contrast (focus ring × bg-page) | `ring` 4.5:1+ ✓ |
| **WCAG 2.4.7** Focus Visible | link `focus-visible:ring-2 ring-ring ring-offset-2 rounded-xs` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | link 텍스트 — 미달(⚠). 모바일은 line-height 조정으로 hit area 확장 또는 padding 추가. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | link 텍스트 + gap-sm 패딩 효과로 24px 이상 보강. |
| **WCAG 1.3.1** Info and Relationships | `<nav aria-label="breadcrumb">` + `<ol>` semantic + `aria-current="page"` (current item) ✓ |
| **ARIA** | `nav[aria-label="breadcrumb"]` + `ol > li` + separator는 `aria-hidden="true"` + page는 `role="link" aria-disabled="true" aria-current="page"`. |

## Do / Don't

### ✅ Do

- 마지막 항목은 항상 BreadcrumbPage — 사용자가 현재 위치 즉시 식별.
- 3–5 단계 권장 — 그 이상은 ellipsis로 압축.
- separator는 `aria-hidden="true"` — screen reader가 읽지 않음.
- 페이지 위계와 일치하는 경로 — URL 구조 또는 정보 구조 그대로.
- chevron variant는 일반 페이지, slash variant는 dense 레이아웃.

### ❌ Don't

- separator를 다른 시각 강조 색 — `text-tertiary` 절제 톤 유지(content noise 회피).
- 마지막 항목을 link로 — 현재 페이지는 클릭 불가. 사용자 혼란.
- 6+ 단계 노출 — 시각 noise + 정보 위계 파악 어려움. ellipsis 적용.
- 페이지 weight `font-semibold` (600) — 본문보다 굵어 navigation 톤 깨짐. 500 유지.
- separator에 `>` 또는 `/` 외 화살표/점 같은 변형 — 사용자 학습 비용↑.

## Migration notes

- 기존 `breadcrumb.tsx` BreadcrumbList `gap-1.5` (6) → `gap-[var(--spacing-sm)]` (8) 토큰 직접 인용. 한국어 텍스트 간 여백을 약간 확보.
- BreadcrumbItem `gap-1.5` → `gap-[var(--spacing-sm)]` 동일.
- BreadcrumbLink `transition-colors` (Tailwind 기본) → `transition-[color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` 토큰 직접 인용. focus-visible ring 추가(WCAG 2.4.7).
- BreadcrumbPage `font-medium` 유지 — 본문보다 약간 강조, 600은 과잉.
- 예제 inline px 하드코드(`gap:10px`) → `var(--spacing-sm)` (8) 토큰. transition `200ms` → motion 토큰.
- preview-html `.bc` SoT의 `text-caption` (12) + `gap-xs` (4)는 brand vignette dense 레이아웃 전용 — site 컴포넌트 페이지는 `text-body-sm` (14) + `gap-sm` (8) 표준 톤.
- separator chevron `h-3.5 w-3.5` (14px) 유지 — 14px font와 시각 비율 일치.
