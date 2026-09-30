# Pagination

> 긴 list/검색 결과를 페이지 단위로 분할 탐색하는 nav. **`Previous` + 페이지 번호 + `Ellipsis` + `Next`** 합성으로 현재 위치 표시 + 이전/다음 탐색. shadcn `Pagination` 베이스 — `<nav>` + `<ul>` + `<a>` 시맨틱 + [`Button`](button.md) spec 인용.

Porest Pagination은 **단일 spec × Active/Inactive page 상태** 매트릭스로 정의됩니다. 모든 버튼은 [`Button`](button.md) variant/size 인용으로 시각 통일 — Active page는 `neutralOutline` variant + `medium` · `iconOnly`(40×40), Inactive는 `ghost` + `medium` · `iconOnly`, Previous/Next는 `ghost` + `medium` + chevron + "이전"/"다음" 텍스트. Ellipsis는 `h-10 w-10` 박스 + `MoreHorizontal` icon. 별도 시각 토큰 정의 없이 Button SoT만 참조 — 시각 위계 자동 정합.

## Anatomy

```
            ◀ 이전   1   2   [3]   ⋯   8   다음 ▶
                          ▲
              ⓓ active (neutralOutline + aria-current="page")
```

| ⓐ Pagination root | `<nav role="navigation" aria-label="pagination">` — `mx-auto flex w-full justify-center`. 페이지 가운데 정렬. |
| ⓑ PaginationContent | `<ul>` — `flex flex-row items-center gap-[var(--spacing-xs)]` (4). 페이지 번호/이전/다음/ellipsis 묶음. |
| ⓒ PaginationItem | `<li>` — semantic wrapper. 시각 스타일 0. |
| ⓓ PaginationLink (Active) | `<a aria-current="page">` + [`Button`](button.md) `variant="neutralOutline" size="medium" layout="iconOnly"` (40×40 border + bg-surface-default). |
| ⓔ PaginationLink (Inactive) | `<a>` + [`Button`](button.md) `variant="ghost" size="medium" layout="iconOnly"` (40×40 transparent + hover bg-surface-input). |
| ⓕ PaginationPrevious | `<a aria-label="이전 페이지">` + [`Button`](button.md) `variant="ghost" size="medium" layout="withText"` + `ChevronLeft` 16 + "이전" 텍스트. |
| ⓖ PaginationNext | `<a aria-label="다음 페이지">` + [`Button`](button.md) `variant="ghost" size="medium" layout="withText"` + "다음" 텍스트 + `ChevronRight` 16. |
| ⓗ PaginationEllipsis | `<span aria-hidden>` — `flex h-10 w-10 items-center justify-center` + `MoreHorizontal` 16 + `<span className="sr-only">More pages</span>`. |

**규칙**

- 모든 시각은 [`Button`](button.md) variant/size 인용 — Pagination 자체 시각 토큰 없음. Button spec이 바뀌면 자동 정합.
- Previous/Next는 텍스트 라벨("이전"/"다음") + chevron — 한국어 도메인 친화. 영문 라벨 "Previous"/"Next" 또는 chevron-only는 사용처 className으로 override 가능.
- Active는 `neutralOutline` variant — `bg-surface-default` + 1px `border-default` + `text-primary`. shadcn 표준 톤(Toss 절제). 강조 식별 필요 시 사용처 className으로 `variant="neutralSolid"`(짙은 회색 채움) override 가능.
- Ellipsis는 항상 동일 크기(`h-10 w-10`) — 페이지 번호와 시각 위계 정합. icon만 표시 + `sr-only` 텍스트로 screen reader 안내.
- gap은 `var(--spacing-xs)` (4) — Button 사이 미세 간격, 한 줄에 자연스럽게 채움.

## Variants

Pagination은 **variant 없음** — 모든 버튼이 [`Button`](button.md) spec 인용. Active/Inactive는 `isActive` prop으로 분기.

| Prop | 값 | 동작 |
|---|---|---|
| `isActive` (PaginationLink) | `false` *(default)* / `true` | true: `variant="neutralOutline"` + `aria-current="page"`. false: `variant="ghost"`. |
| `size` · `layout` (PaginationLink) | `"medium"` · `"iconOnly"` *(default)* | [`Button`](button.md) size · layout 인용. `iconOnly` 는 정사각 40×40, `withText` 는 직사각 h-10 px-x4. |

## Sizes

Pagination은 자체 size 없음 — 사용처가 PaginationLink size 결정. 기본 [`Button`](button.md) `medium` · `iconOnly`(40×40) 권장.

[표: 링크별](pagination.yaml#link)

[표: 공통](pagination.yaml#base)

## States

[`Button`](button.md) State matrix 그대로 인용 — variant별 hover/focus-visible/pressed/disabled 동일 톤.

[표: 상태별로 바뀌는 값](pagination.yaml#states.link)

## Layout

**HR — 결재 list pagination**

- 결재함 list 하단 — `<Pagination className="mt-[var(--spacing-lg)]">`. 5–10 페이지 정도 짧으면 ellipsis 없이 모든 페이지 표시.

**Desk — 메모 보관함 pagination**

- 메모 list 하단 — 메모 누적이 많으므로 보통 100+ 페이지. ellipsis 패턴: `1 ⋯ 6 [7] 8 ⋯ 142`. 첫/마지막 + 현재 주변만 노출.

**Inline (table footer)**

- table 우하단 — `<div className="flex justify-end mt-[var(--spacing-md)]"><Pagination /></div>` (또는 left/center 정렬).

**Compact (모바일)**

- 모바일에선 페이지 번호 생략, Previous + 현재/총 + Next만 — `<Pagination><PaginationPrevious />「3 / 142」<PaginationNext /></Pagination>`. 사용처 텍스트 합성.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| PaginationLink click | 해당 페이지로 이동. `<a href="?page=3">` 또는 SPA 라우터 콜백. |
| `Tab` | Previous → 1, 2, 3, ... → Next 순서대로 focus. |
| `Enter` (focus) | 해당 페이지 이동. |
| Previous (1페이지) | `disabled` — opacity 0.5 + `aria-disabled="true"` + click 무반응. |
| Next (마지막 페이지) | `disabled` — 동일. |
| Ellipsis | focus 불가(`aria-hidden`). 시각 placeholder. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text × bg) | [`Button`](button.md) spec 인용 — `text-primary` × bg-surface-default 14:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (Active border × bg-page) | `border-default` 1.4:1 — Active state 시각 식별 약함이나 `aria-current="page"` semantic이 보강. 강조 필요 시 `variant="default"` (primary fill, 7:1+) override. |
| **WCAG 2.1.1** Keyboard | `Tab`/`Enter`/`Space` 모두 가능 (`<a>` 시맨틱) ✓ |
| **WCAG 2.4.4** Link Purpose | `aria-label="이전 페이지"`/"다음 페이지"/"More pages" + 시각 텍스트 ✓ |
| **WCAG 2.4.7** Focus Visible | [`Button`](button.md) 포커스 링(`stroke-focus-ring` 2px · 띄움 2px) 인용 ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | icon 40×40 — 미달(⚠). 모바일 우선 화면이면 사용처에서 `size="lg"` (h-12 48) override 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 40 ✓ |
| **ARIA** | `<nav role="navigation" aria-label="pagination">` (root) + `aria-current="page"` (active) + `aria-label` (Previous/Next) + `aria-hidden` (ellipsis). screen reader가 nav 영역 + 현재 페이지 인식. |

## Do / Don't

### ✅ Do

- list/검색 결과 — **20+ item**부터 페이지네이션 고려. 그 미만은 무한 스크롤 또는 그냥 표시.
- Previous/Next는 텍스트 + chevron — 한국어 라벨("이전"/"다음") 그대로. 영문 라벨은 영문 서비스만.
- Active page는 `aria-current="page"` — semantic 명시. 시각 표시(neutralOutline)와 함께 screen reader 친화.
- 페이지 수가 많을 때 ellipsis — 첫/마지막 + 현재 주변만 노출(`1 ⋯ 6 [7] 8 ⋯ 142`).
- 모바일에선 compact 패턴 — 페이지 번호 생략, Previous + 현재/총 + Next.

### ❌ Don't

- 짧은 list(5 item 미만) Pagination — 시각 noise. 한 페이지에 다 표시.
- chevron-only Previous/Next — 한국어 도메인에선 라벨 가독성 ↑. 텍스트 동반.
- 모든 페이지 번호 표시(50+) — 시각 폭발. ellipsis 필수.
- active state 색을 brand primary로 변경 — Toss 톤 절제 유지. 강조 필요 시 `variant="default"` 옵션만.
- Pagination을 페이지 상단에 — 사용자가 list 끝까지 본 후 다음 페이지 이동이 자연. 하단 배치 기본.

## Migration notes

- **2026-09-30** — [`Button`](button.md) 이 SEED 구조로 바뀌어 이름만 옮겼다: `outline` → `neutralOutline`, `icon` → `medium` · `iconOnly`, `md` → `medium`. 코드의 비활성 페이지는 이제 스펙대로 본문 글자다(옛 Button 은 ghost + icon 을 보조 글자로 흐리게 했다). 모서리 · 글자 굵기 · 누름은 새 Button 을 따른다 — Pagination 차례에 다시 적는다.
- 기존 `pagination.tsx` 정정:
  - `PaginationPrevious`/`PaginationNext`의 `size="default"` — Button cva에 `default` 사이즈 없음(`md`가 기본). `size="md"` 명시로 정정.
  - `PaginationEllipsis` `h-9 w-9` — Button size에 없는 임의값. `h-10 w-10` (Button icon size 정합)로 정정.
  - `gap-1` → `gap-[var(--spacing-xs)]` (4 토큰 직접 인용).
  - Previous `pl-2.5` / Next `pr-2.5` Tailwind 기본 → 제거(Button md `px-3`이 자연 padding 제공).
- examples 한국 도메인 정합 — 추상 페이지 번호("1", "2", "3")만 있던 예제에서 **HR 결재 list / Desk 메모 보관함(긴 페이지, ellipsis) / Compact 모바일** 시나리오로 확장.
- preview-html `.pg-*`는 brand vignette용 별도 시각 — Active = `primary fill` (`pg-btn--current`) + `radius-md` + `text-body-md`. site (tsx + examples)와 다른 톤(brand 강조 데모). **site SoT는 outline variant, preview는 primary fill** 차이. Migration notes에 명시.
- [`Button`](button.md) spec 그대로 인용 — `buttonVariants({ variant, size })` 호출로 시각 토큰 자동 정합. Pagination 자체 시각 spec 없음.
