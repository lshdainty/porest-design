# Tile

> swatch(미리보기) + 라벨 + 설명 + 우측 check 의 큰 카드(tile) 1개를 single-select 하는 도메인 컴포넌트. 테마/기본통화/표시단위 등 **시각적 미리보기가 의미 자체**인 선택지에 사용. shadcn에는 없는 Porest 도메인 spec — desk-front AppearanceSection "테마" 영역 SoT.

Porest Tile은 **grid N-col × single-select** 매트릭스로 정의됩니다. 각 tile은 좌측 swatch(40×40 미리보기 박스) + 중앙 라벨/설명 2줄 + 우측 active 시 ✓ check. active 시 border 1.5px brand + bg brand-subtle 8% tint 로 강조. ToggleGroup·Radio가 단순 텍스트라면 Tile은 **미리보기 우선** 카드형 선택.

## Anatomy

```
inactive                              active
┌──────────────────────────────┐     ┌──────────────────────────────┐
│ ⓑ┌──┐  ⓒ 라이트          ⓓ │     │ ⓑ┌──┐  ⓒ 라이트         ⓓ✓│
│  │ ☀ │     밝은 배경          │     │  │ ☀ │     밝은 배경          │
│  └──┘                        │     │  └──┘                        │
└──────────────────────────────┘     └──────────────────────────────┘
   border-subtle 1px                    border-primary 1.5px
   bg-surface                           bg-primary 8% (brand-subtle)
```

| ⓐ container | `<RadioGroup.Root>` 또는 `<div role="radiogroup">` + `grid grid-cols-N gap-[var(--spacing-sm)]` |
| ⓑ swatch | 40×40 미리보기 — 색·아이콘·이미지 1개. `border-radius: var(--radius-tile)` + 1px `border-subtle`. 호출처에서 시각 정의 (예: 테마 = oklch 색 + Sun/Moon/Monitor 아이콘) |
| ⓒ 텍스트 영역 | label (body 14 / semi) + description (caption 11–12 / tertiary) 2줄. `flex: 1; min-width: 0`로 truncate. |
| ⓓ check (active) | `<Check size={16} strokeWidth={2.2} />` 우측 정렬. `color: var(--color-primary)`. inactive 시 미표시. |
| ⓔ focus ring | `focus-visible:ring-2 ring-ring ring-offset-2` |

**규칙**

- swatch는 **반드시 시각 미리보기** — 라벨만 텍스트면 RadioList 사용 (Tile은 swatch가 의미).
- swatch 크기 40×40 고정 — tile 폭 변해도 swatch 동일. 인지 무게 균일.
- 텍스트 2줄(label + desc) — 1줄만이면 단순 ToggleGroup이 적합.
- active 시 색 + check 두 단서 동시(WCAG 1.4.1).

## Variants

Tile은 **variant 없음** — 단일 시각 spec. 의미 분기는 호출처가 swatch 시각·label·desc 자체로 결정.

## Sizes

| Size | Padding | swatch | Gap | Check |
|---|---|---|---|---|
| `sm` | `12 10` | 32×32 | 10 | 14 |
| `md` *(default)* | `16 14` | 40×40 | 12 | 16 |
| `lg` | `20 18` | 48×48 | 14 | 18 |

| 항목 | 값 (md) | 토큰 |
|---|---|---|
| Tile padding (Y · X) | 16 · 14 | (literal) |
| Tile radius | 12 | `var(--radius-lg)` |
| Tile border (inactive) | 1px solid `border-subtle` | `var(--border-subtle)` |
| Tile border (active) | 1.5px solid `primary` | `var(--color-primary)` |
| Tile bg (inactive) | `var(--bg-surface)` | (semantic) |
| Tile bg (active) | `color-mix(in oklch, var(--color-primary) 8%, transparent)` | (literal mix) |
| Swatch size | 40×40 | (literal) |
| Swatch radius | `var(--radius-tile)` | (= radius-lg 12) |
| Swatch border | 1px `border-subtle` | (semantic) |
| Gap (swatch ↔ text) | 12 | `var(--spacing-md)` |
| Label font | 14 / semi | `var(--fs-body)` + `var(--fw-semi)` |
| Description font | 11–12 / regular | `var(--fs-caption)` |
| Description color | `var(--color-text-tertiary)` | (semantic) |
| Check size | 16 | (literal) |
| Check color | `var(--color-primary)` | (semantic) |
| Transition | all 150ms | `var(--motion-duration-fast)` |

## States

| State | Border | Background | Check |
|---|---|---|---|
| `enabled` (inactive) | 1px `border-subtle` | `bg-surface` | — |
| `enabled` (active) | 1.5px `primary` | `primary` 8% tint | ✓ |
| `hover` (inactive) | 1px `border-default` | `bg-surface` | — |
| `focus-visible` | (변화 없음) | (변화 없음) | + `ring-2 ring-ring ring-offset-2` |
| `disabled` | (변화 없음) | (변화 없음) | `opacity 0.5 cursor-not-allowed` |

## Layout

**Form / setting section**

- `<SectionLabel>` "테마"/"기본 단위"/"시작 화면" 등 + 아래 Tile grid. label과 grid 사이 gap `var(--spacing-sm)` (10).
- mobile 좁은 viewport에선 grid `1fr` (1열 stack), desktop은 `repeat(3, 1fr)` 등 호출처 결정.

**선택 옵션 수**

- 2–4 개 권장 — Tile은 **시각 비교가 핵심**이라 옵션 수가 많아지면 매트릭스 폭 증가 + 인지 부담↑.
- 5+ 옵션이면 RadioList(세로 stack) 또는 Select가 적합.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click tile | active 토글 (single-select). 이전 active는 inactive 전환. |
| `Space` / `Enter` (focus) | 동일 활성화. |
| `Tab` | tile 간 이동 (RadioGroup 사용 시 ↑↓→← keyboard nav). |
| Hover | border-subtle → border-default subtle 변화 (강하지 않게). |

Tile은 single-select만 — multi-select는 별 컴포넌트(`MultiTile` 등, 본 spec 외).

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.1** Use of Color | 색 + 텍스트 + check 세 단서 — active tile은 border 색 + bg tint + ✓ 아이콘. color-blind 대응. |
| **WCAG 1.4.3** Color contrast (label × bg) | `fg-primary` × `bg-surface` 7:1+ ✓ / active bg(8% tint) 대비도 4.5:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (active border × bg-page) | `primary` × `bg-page` 3:1+ ✓ |
| **WCAG 2.1.1** Keyboard | `Space`/`Enter`로 선택 ✓ |
| **WCAG 2.4.7** Focus Visible | `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | md tile height ≈ 72 (padding 16 + swatch 40) ✓ |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | ≥ 24 ✓ |
| **ARIA** | RadioGroup 사용 시 `role="radiogroup"` + 각 tile `role="radio" aria-checked`. 추가 `aria-label`로 label+desc 합본 권장. |

## Do / Don't

### ✅ Do

- swatch(시각 미리보기)가 **의미의 절반 이상**일 때 사용 — 테마/색/표시 단위/시작화면.
- 2–4개 옵션 — 한눈에 비교 가능.
- 모바일 좁은 viewport에선 1열 stack — tile이 좁아지면 정보 잘림.
- label은 짧고 명확하게 (1–2 단어), description은 1줄(짧은 보조 설명).

### ❌ Don't

- 라벨만 의미인 옵션 (예: 정렬 순서·필터 카테고리) — 그건 RadioList / Select 영역.
- 5+ 옵션 grid — 매트릭스 폭 증가, swatch 비교 인지 부담↑.
- swatch 없이 텍스트만 — 시각 미리보기 손실. ToggleGroup·Select 사용.
- description 2줄 이상 — 카드 높이 들쭉날쭉 + 비교 어려움.

## Migration notes

- desk-front `AppearanceSection.tsx` "테마" 영역 (line 87–175) 직접 raw button + inline style 패턴 → 본 spec Tile로 흡수.
- swatch 시각(light/dark/system)은 호출처가 그대로 유지 — Tile은 swatch slot만 제공.
- `var(--mossy-500, var(--fg-brand-strong))` fallback 인용은 본 spec에서 `var(--color-primary)`로 단순화 — desk-front는 data-accent 분기 미사용이므로 의미 동일.
- shadcn 없음 — Porest 도메인 전용 추가 spec.
- 후속: AppearanceSection 외 다른 setting section에서 동일 패턴 등장 시 흡수 (예: 시작 화면·표시 밀도 미리보기).
