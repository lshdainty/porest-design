# Table

> 행/열 구조의 데이터 표시 wrapper. 일반 HTML `<table>` semantic + Porest 디자인 토큰. shadcn `Table` 베이스 — composition으로 `TableHeader` / `TableBody` / `TableFooter` / `TableRow` / `TableHead` / `TableCell` / `TableCaption` 분리. **data table 패턴**(sortable + selectable + bulk action + badge column)은 base Table + 기존 컴포넌트([`Checkbox`](checkbox.md) / [`Badge`](badge.md))로 합성.

Porest Table은 **단일 spec × data table 패턴 가이드** 매트릭스로 정의됩니다. 기본 시각은 1px border-bottom으로 row 분리 + thead text-secondary medium + hover row bg-surface-input. data table은 좌측 selection column([`Checkbox`](checkbox.md)) + sortable indicator(`text-primary` + 화살표) + 우측 status badge column([`Badge`](badge.md) soft semantic). bulk action bar는 row 선택 시 표 상단에 노출(`primary 10% mix bg` + radius-sm). preview `.dt-*` SoT 정합.

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ ⓐ bulk action bar (selection 시만 표시)                   │
│ "3개 선택됨 · 보관 · 삭제"                                  │  ← primary 10% mix bg
├──────────────────────────────────────────────────────────┤
│ ⓒ thead (border-b)                                        │
│ [☐] ⓓ 제목 ↑   ⓓ 수정일   ⓓ 태그          ← sortable      │  ← text-secondary medium
├───┼──────────────┼──────────────┼──────────┤
│ ⓕ tbody row (border-b + hover)                            │
│ [✓] Porest 톤    2시간 전        [공개]    ← Badge success │
│ [✓] 5월 회고     어제             [초안]    ← Badge warning │
│ [✓] 참고 자료    3일 전           [보관]    ← Badge default │
└──────────────────────────────────────────────────────────┘
  ▲ ⓔ TableCell (p-spacing-sm + align-middle)
```

| ⓐ bulk action bar | 사용처 합성 — `<div className="flex gap-[var(--spacing-md)] items-center px-[var(--spacing-md)] py-[var(--spacing-xs)] rounded-sm bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-body-sm">` + 선택 카운트 + 액션 [`Button`](button.md) `variant="ghost"`. 선택 0 시 unmount. |
| ⓑ Table | `<div className="relative w-full overflow-auto"><table>` — overflow wrapper로 좁은 화면 가로 스크롤 자동. `w-full caption-bottom text-body-md`. |
| ⓒ TableHeader | `<thead>` — `[&_tr]:border-b border-border-default`. |
| ⓓ TableHead | `<th>` — `h-10 px-[var(--spacing-sm)] text-left align-middle font-medium text-text-secondary`. sortable column은 [`Button`](button.md) `variant="ghost" size="sm"` wrap + 화살표(↑/↓) 16 icon. active sort는 `text-text-primary` + 화살표 노출. |
| ⓔ TableCell | `<td>` — `p-[var(--spacing-sm)] align-middle text-body-md text-text-primary`. 숫자 cell은 `text-right tabular-nums font-mono`. |
| ⓕ TableRow | `<tr>` — `border-b border-border-default transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] hover:bg-surface-input/50 data-[state=selected]:bg-surface-input`. |
| ⓖ TableFooter | `<tfoot>` — `border-t border-border-default bg-surface-input/50 font-medium [&>tr]:last:border-b-0`. 합계/요약 row. |
| ⓗ TableCaption | `<caption>` — `mt-[var(--spacing-md)] text-body-sm text-text-secondary`. 표 제목/설명. |
| ⓘ Status badge column | [`Badge`](badge.md) 인용 — soft semantic (`info`/`success`/`warning`/`error`) 또는 `outline`. **같은 카테고리(상태)는 한 style 통일** (badge.md Do 규칙). |
| ⓙ Selection column | [`Checkbox`](checkbox.md) 인용 — thead `indeterminate`(부분 선택) / row `checked`. width fixed (`w-12` 정도). |

**규칙**

- 기본 시각 — `border-bottom` 1px로 row 분리. striped(zebra) row 색은 사용 안 함(Toss 톤 절제).
- hover row는 `bg-surface-input/50` (50% opacity로 약한 강조). selected row는 `bg-surface-input` full.
- 숫자 cell은 항상 `tabular-nums` + 우측 정렬 — 숫자 자릿수 정렬. 금액은 `font-mono` 추가.
- sortable column header는 [`Button`](button.md) `variant="ghost" size="sm"` wrap + 화살표 icon — 클릭 가능 affordance. active sort column은 `text-text-primary` + 화살표(↑/↓) 노출. inactive는 hover 시만 화살표 hint.
- bulk action bar는 row 선택 카운트 ≥ 1 시 mount, 0 시 unmount. fade-in animation 권장(`animate-in fade-in-0 duration-[var(--motion-duration-fast)]`).
- status badge는 [`Badge`](badge.md) soft semantic 인용 — solid는 시각 무게 과잉. 같은 카테고리는 한 style 통일.
- 모바일에선 column 일부 hide(`hidden md:table-cell`) 또는 카드 형식으로 fallback(table → list).
- sticky header — `<thead className="sticky top-0 bg-surface-default z-10">` + 스크롤 wrapper 필요.

## Variants

Table은 **variant 없음** — 시각 단일. Section(TableHeader/Body/Footer/Caption) 조합으로 분기. data table 패턴은 합성.

## Sizes

Table은 **size variant 없음** — TableHead height만 고정(`h-10` 40px), TableCell padding은 `var(--spacing-sm)`(8) 기본. 사용처 className으로 조정 가능.

| 항목 | 값 | 토큰/규칙 |
|---|---|---|
| TableHead height | 40px | `h-10` |
| TableHead padding-X | 8px | `px-[var(--spacing-sm)]` |
| TableHead font | 15 / 500 / secondary | `text-body-md font-medium text-text-secondary` |
| TableCell padding | 8px | `p-[var(--spacing-sm)]` |
| TableCell font | 15 / 400 / primary | `text-body-md text-text-primary` |
| Row border | 1px bottom | `border-b border-border-default` |
| Row hover | `surface-input 50%` | `hover:bg-surface-input/50` |
| Row selected | `surface-input` | `data-[state=selected]:bg-surface-input` |
| Footer bg | `surface-input 50%` | `bg-surface-input/50` |
| Caption margin-top | 12px | `mt-[var(--spacing-md)]` |
| Caption font | 14 / 400 / secondary | `text-body-sm text-text-secondary` |
| Transition | colors | `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |
| Selection column width | 48px | `w-12` |
| Sortable icon size | 16×16 | `h-4 w-4` (lucide `ArrowUp`/`ArrowDown`/`ArrowUpDown`) |
| Bulk action bar bg | `primary 10% mix` | `bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]` |
| Bulk action bar radius | 4px | `rounded-sm` |
| Bulk action bar padding | 12 × 4 | `px-[var(--spacing-md)] py-[var(--spacing-xs)]` |
| Numeric cell | `tabular-nums` + 우측 | `text-right font-mono tabular-nums` |

## States

| State | Background | Text |
|---|---|---|
| `default` (row) | transparent | `text-primary` |
| `hover` (row) | `bg-surface-input/50` | `text-primary` |
| `selected` (`data-[state=selected]`) | `bg-surface-input` | `text-primary` |
| sortable header `inactive` | transparent | `text-secondary` + ↑↓ hint on hover |
| sortable header `active (asc/desc)` | transparent | `text-primary` + ↑ 또는 ↓ 노출 |
| Bulk bar `hidden` (selection 0) | — | unmount |
| Bulk bar `visible` (selection ≥ 1) | `primary 10% mix` | primary text |

## Layout (한국 도메인 패턴)

**Desk — 메모 보관함 data table (sortable + selectable + bulk action)**

- 본문 이미지 그대로 — Selection column + 제목(sortable) + 수정일(sortable) + 태그(Badge soft semantic).
- bulk action bar: "3개 선택됨 · 보관 · 삭제" — primary 10% mix bg.
- status badge: 공개=`success`, 초안=`warning`, 보관=`secondary`(soft 통일).

**HR — 결재 list table**

- 신청자 + 부서 + 신청일 + 결재 상태(Badge soft) + 액션([`Button`](button.md) ghost). 결재 상태 column은 [`Badge`](badge.md) `info`/`warning`/`error`/`success` (badge.md HR 시나리오 정합).

**Order summary table (Footer 합계)**

- 주문번호 + 상태 + 방법 + 금액 + TableFooter 합계 row. 금액은 `font-mono tabular-nums` 우측 정렬.

**Sticky header (긴 list)**

- `<thead className="sticky top-0 bg-surface-default z-10">` + Table wrapper `max-h-[400px] overflow-auto`. 헤더 고정 + body 스크롤.

**Responsive (모바일 fallback)**

- 좁은 화면(`md:` 미만)에선 일부 column hide 또는 카드 형식으로 layout 전환. table → list 패턴.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Row hover | `bg-surface-input/50` 적용. |
| Row click | 사용처 결정 — detail 페이지 이동 또는 row 선택. |
| Checkbox toggle | row `data-state="selected"` 변경 + bulk action bar 카운트 갱신. |
| Header checkbox click | 전체 선택/해제 (모든 row 동시 toggle, indeterminate 처리). |
| Sortable header click | sort column/direction 변경 + 화살표 ↑↓ 표시. 다른 column 클릭 시 새 column 활성 + 기본 asc. |
| `Tab` | row 안 focusable element 사이 이동. Checkbox/Button 모두 native focus. |
| 가로 스크롤 (overflow-auto) | 좁은 화면에서 표가 부모 폭 초과 시 가로 스크롤. |
| Sticky header | 세로 스크롤 시 thead 고정 (z-index로 row 위 노출). |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (TableCell text × bg) | `text-primary` 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (TableHead text × bg) | `text-secondary` 9.2:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (Row border × bg-page) | `border-default` 1.4:1 — 약함이나 hover/selected state로 시각 식별 보강. |
| **WCAG 1.3.1** Info and Relationships | semantic `<table>`/`<thead>`/`<tbody>`/`<tr>`/`<th scope="col">`/`<td>` — screen reader 표 구조 자동 인식. |
| **WCAG 2.1.1** Keyboard | row 안 focusable element(Checkbox/Button) `Tab`/`Enter`/`Space` ✓. sortable header도 keyboard 가능. |
| **WCAG 2.4.7** Focus Visible | 자식 컴포넌트(Checkbox/Button)의 focus-visible ring 인용. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | header h-10 (40) — 미달(⚠). row cell은 padding 포함 40+ 가능. 모바일 화면이면 사용처 `h-11` override. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | ✓ |
| **ARIA** | `<th scope="col">` 명시 권장. sortable header는 `aria-sort="ascending"/"descending"/"none"`. selected row는 `aria-selected="true"`. bulk action bar는 `role="region" aria-label="선택된 항목 액션"`. |

## Do / Don't

### ✅ Do

- **HTML semantic 그대로** — `<table>`/`<thead>`/`<tbody>`/`<th scope="col">`. screen reader/SEO 친화.
- **숫자 cell `tabular-nums` + 우측 정렬** — 금액/카운트는 `font-mono tabular-nums`로 자릿수 정렬.
- **status badge soft 통일** — [`Badge`](badge.md) soft semantic으로 한 카테고리는 한 style.
- **sortable header에 화살표 affordance** — active sort 시 ↑ 또는 ↓ 노출, inactive는 hover hint.
- **bulk action bar는 선택 카운트 ≥ 1 시만** — 0 시 unmount, fade-in animation.
- **긴 list는 sticky header** — thead `sticky top-0` + Table wrapper `max-h-*`.
- **모바일은 column hide 또는 카드 fallback** — `hidden md:table-cell` 활용.

### ❌ Don't

- **striped(zebra) row** — Toss 톤에서 시각 noise. `border-b`만으로 충분.
- **모든 column sortable** — 의미 없는 column(이미지/액션)은 sortable 안 함.
- **숫자 cell 좌측 정렬** — 자릿수 비교 어려움. 항상 우측 + `tabular-nums`.
- **5+ status type 동시 사용** — Badge variant 분기 폭발. 의미 통합 또는 다른 시각화.
- **table 안 nested table** — semantic 혼란. 별도 detail panel 또는 [`Drawer`](drawer.md)로 분리.
- **모바일에 가로 스크롤만 의존** — 사용성 ↓. column hide 또는 카드 fallback 우선.

## Migration notes

- 기존 `table.tsx` 정정:
  - `text-title-sm` (16/500) → **`text-body-md`** (15/400) — data 가독성 우선, title-sm은 본문 헤더용.
  - `px-2`/`p-2` (Tailwind 기본 8) → `px-[var(--spacing-sm)]`/`p-[var(--spacing-sm)]` 토큰 직접 인용.
  - `transition-colors` → `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` motion 토큰 추가.
  - TableCaption `mt-4` → `mt-[var(--spacing-md)]` (12 토큰).
- examples 한국 도메인 재작성:
  - 기존 추상 INV001 주문 list만 → **Desk 메모 보관함(sortable + selectable + bulk action + Badge column)** + HR 결재 list + Order Footer 합계 3개 시나리오.
- preview-html `.dt-*` 이미 토큰 정합 — `bg-page` thead + `border-default` border + `caption` font + `primary 10% mix` bulk bar. site Table component와 일관 톤. preview는 caption font(12)로 더 컴팩트, site는 body-md(15)로 가독성 우선 — 분기.
- bulk action bar / sortable indicator / status badge는 base Table에 포함 안 됨 — 사용처가 [`Button`](button.md) / [`Checkbox`](checkbox.md) / [`Badge`](badge.md) 인용으로 합성. spec의 Layout 패턴이 가이드.
