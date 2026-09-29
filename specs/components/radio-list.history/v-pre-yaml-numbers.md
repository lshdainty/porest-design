# RadioList

> 전체 폭 row 리스트에서 single-select 하는 도메인 컴포넌트. 좌측 icon/symbol pill + 텍스트(label + sub) + 우측 active 시 check. 통화·언어·국가 등 **목록형 선택지**에 사용. shadcn에는 없는 Porest 도메인 spec — desk-front AppearanceSection "기본 통화" 영역 SoT.

Porest RadioList는 **세로 stack × divide-y 구분 × single-select** 매트릭스로 정의됩니다. 각 row는 full-width button, 좌측 pill (32×32 icon/symbol/swatch) + 중앙 label/sub-label + 우측 active 시 ✓ check. row 간 1px `border-subtle` divider, 외곽 border + radius-lg 로 카드로 묶음.

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ ⓐ container (border + radius-lg + divide-y)             │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ⓑ┌──┐  ⓒ 대한민국 원              ⓓ✓             │    │
│  │  │ ₩ │     KRW                                  │    │  ← active row
│  │  └──┘                                            │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ ⓑ┌──┐  ⓒ 미국 달러                              │    │
│  │  │ $ │     USD                                   │    │
│  │  └──┘                                            │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ … 추가 row                                       │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

| ⓐ container | `<RadioGroup.Root>` 또는 `<div role="radiogroup">` + `border border-border-subtle rounded-lg bg-surface-default overflow-hidden divide-y divide-border-subtle` |
| ⓑ pill | 32×32 icon/symbol/swatch. `radius-md` + `bg-canvas` 또는 호출처 결정 색. text symbol(₩/$/€)일 땐 `font-bold + body-lg`. |
| ⓒ 텍스트 영역 | label (body 14 / semi / fg-primary) + sub-label (caption 11 / fg-tertiary) 2줄. `flex: 1; min-width: 0`로 truncate. |
| ⓓ check (active) | `<Check size={16} strokeWidth={2.2} />` 우측 정렬. `color: var(--color-primary)`. inactive 시 미표시. |
| ⓔ focus ring | `focus-visible:ring-2 ring-ring ring-offset-2` (inner — border-radius 0) |

**규칙**

- row는 **full width** — Tile처럼 grid 분할 아님. 세로 stack 전용.
- divider는 row 간만 — 첫 row 위 / 마지막 row 아래 X (외곽 border가 대체).
- active 표시 — 우측 check 만. row bg 변화 옵션이지만 기본은 check-only (Tile과 차별화).
- pill은 시각 단서이되 의무 아님 — 텍스트만으로 의미 충분하면 pill 생략 가능 (그땐 padding 조정).

## Variants

RadioList는 **variant 없음** — 단일 시각 spec. 의미 분기는 호출처가 pill/label/sub-label 자체로 결정.

## Sizes

| Size | Row padding | Pill | Gap | Check |
|---|---|---|---|---|
| `sm` | `10 12` | 28×28 | 10 | 14 |
| `md` *(default)* | `14 16` | 32×32 | 12 | 16 |
| `lg` | `16 20` | 40×40 | 14 | 18 |

| 항목 | 값 (md) | 토큰 |
|---|---|---|
| Container border | 1px `border-subtle` | `var(--color-border-subtle)` |
| Container radius | 12 | `var(--radius-lg)` |
| Container bg | `var(--bg-surface)` | (semantic) |
| Row padding (Y · X) | 14 · 16 | (literal) |
| Row divider | 1px `border-subtle` (row 간만) | `var(--color-border-subtle)` |
| Row bg | transparent | (literal) |
| Pill size | 32×32 | (literal) |
| Pill radius | 6 | `var(--radius-md)` |
| Pill bg | `var(--bg-canvas)` | (semantic) |
| Pill text size | body-lg / bold | `var(--fs-body-lg)` + `var(--fw-bold)` |
| Gap (pill ↔ text) | 12 | `var(--spacing-md)` |
| Label font | 14 / semi | `var(--fs-body)` + `var(--fw-semi)` |
| Sub-label font | 11 / regular | `var(--fs-caption)` |
| Sub-label color | `var(--color-text-tertiary)` | (semantic) |
| Check size | 16 | (literal) |
| Check color | `var(--color-primary)` | (semantic) |

## States

| State | Row bg | Label | Check |
|---|---|---|---|
| `enabled` (inactive) | transparent | `fg-primary` | — |
| `enabled` (active) | transparent (또는 호출처 결정) | `fg-primary` | ✓ |
| `hover` (inactive) | `bg-surface-hover` (옵션) | `fg-primary` | — |
| `focus-visible` | (변화 없음) | (변화 없음) | + `ring-2 ring-ring ring-offset-2` |
| `disabled` | (변화 없음) | (변화 없음) | `opacity 0.5 cursor-not-allowed` |

RadioList는 **active row bg 변화 없음**이 기본 — check 단서로 충분하고, list 안에서 row가 강조되면 다른 row와 비교 어려움. (필요시 호출처가 옵션으로 `bg-brand-subtle` 추가 가능)

## Layout

**Form / setting section**

- `<SectionLabel>` "기본 통화"/"언어"/"국가" 등 + 아래 RadioList container. label과 container 사이 gap `var(--spacing-sm)` (10).
- mobile/desktop 모두 full-width — viewport 따라 row 폭만 조정.

**옵션 수**

- 3–10 개 권장 — 한 화면에 모두 보이거나 약간의 스크롤. 10+ 면 search 동반(SearchableList 고려).
- 2 개 옵션이면 ToggleGroup(segmented)가 적합.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click row | active 토글 (single-select). 이전 active는 inactive 전환. |
| `Space` / `Enter` (focus) | 동일 활성화. |
| `Tab` | row 간 이동 (RadioGroup 사용 시 ↑↓ keyboard nav). |
| Hover | (옵션) row bg subtle 변화. |

RadioList는 single-select만 — multi-select는 별 컴포넌트(`CheckList`, 본 spec 외).

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.1** Use of Color | check 아이콘 단서만으로 active 식별 가능 (색 의존 아님). |
| **WCAG 1.4.3** Color contrast (label × bg) | `fg-primary` × `bg-surface` 7:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (container border × bg-page) | `border-subtle` × `bg-page` 3:1+ ✓ |
| **WCAG 2.1.1** Keyboard | `Space`/`Enter`로 선택 ✓ |
| **WCAG 2.4.7** Focus Visible | `focus-visible:ring-2 ring-ring ring-offset-2` (inner radius 0) ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | md row height ≈ 60 (padding 14 + pill 32) ✓ |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | ≥ 24 ✓ |
| **ARIA** | RadioGroup 사용 시 `role="radiogroup"` + 각 row `role="radio" aria-checked`. label + sub-label 결합 aria-label 권장 (예: "대한민국 원, KRW"). |

## Do / Don't

### ✅ Do

- **목록형 선택지** — 통화·언어·국가·지역·정책 등 텍스트 위주.
- pill로 시각 단서 보강 (symbol/icon/swatch) — 텍스트만보다 인지 빠름.
- 3–10 개 옵션 — full-width row가 자연스러운 범위.
- label은 친숙한 풀이름 (예: "대한민국 원"), sub-label은 코드/약어 (예: "KRW").

### ❌ Don't

- 2 옵션만 RadioList — full-width row가 과해 보임. ToggleGroup segmented가 적합.
- 10+ 옵션 — 스크롤 길어짐, search 동반(SearchableList) 권장.
- pill 없이 너무 짧은 label — row 높이가 빈 공간. label/sub-label 합치거나 ToggleGroup으로.
- active 시 row bg + check + border 다 변화 — 시각 노이즈. check 하나로 충분.
- 시맨틱 의미(상태/긴급도)를 pill 색으로만 — 색 + 텍스트 함께.

## Migration notes

- desk-front `AppearanceSection.tsx` "기본 통화" 영역 (line 194–276) 직접 raw button + inline style 패턴 → 본 spec RadioList로 흡수.
- pill 안 symbol(₩/$/€/¥)은 호출처가 그대로 유지 — RadioList는 pill slot만 제공.
- `divide-y` 패턴은 그대로 — Tailwind divide 유틸 + container `overflow-hidden`이 마지막 row divider까지 깔끔히 처리.
- shadcn 없음 — Porest 도메인 전용 추가 spec.
- 후속: 언어·국가·지역 setting 추가 시 동일 패턴 사용.
