# SearchableList

> 상단 검색 input + 하단 결과 list(thumbnail + 텍스트 row)에서 single-select 하는 도메인 컴포넌트. 카드 카탈로그·증권사·은행 등 **대량 옵션 + 검색 필요** 시나리오에 사용. shadcn에는 없는 Porest 도메인 spec — desk-front AssetEditDialog "카드 검색" 영역 SoT.

Porest SearchableList는 **search input × scrollable result list** 매트릭스로 정의됩니다. 상단 검색 input(좌측 Search 아이콘 + autoFocus 옵션) + 하단 결과 list (rounded container + divide-y + max-height scroll). 각 result row는 좌측 thumbnail(이미지/swatch/avatar) + 중앙 텍스트(주제목 + 부제목) + 우측 옵션(badge/상태). active row는 `bg-brand-subtle` + 텍스트 색 강조.

## Anatomy

```
┌─────────────────────────────────────────────────────────┐
│ ⓐ 헤더 (옵션) — 라벨 + 우측 총 개수 caption           │
├─────────────────────────────────────────────────────────┤
│ ⓑ 🔍 검색 input                                          │
├─────────────────────────────────────────────────────────┤
│ ⓒ result container (border + radius-md + divide-y +    │
│    max-h 260 + overflow-y-auto)                         │
│  ┌────────────────────────────────────────────────────┐│
│  │ ⓓ┌──┐  ⓔ 카드명              ⓕ단종 badge          ││  ← row
│  │  │img│     발급사 · 신용 · 연회비                  ││
│  │  └──┘                                              ││
│  ├────────────────────────────────────────────────────┤│
│  │ ⓓ┌──┐  ⓔ 다른 카드                                ││  ← active row
│  │  │ S │     발급사 · 체크                          ✓ ││     bg-brand-subtle
│  │  └──┘                                              ││
│  └────────────────────────────────────────────────────┘│
│ ⓖ empty state (no results) — "검색 결과가 없어요"      │
└─────────────────────────────────────────────────────────┘
```

| ⓐ 헤더 (옵션) | `<Label>` 좌측 + `<span>` 우측 "총 N개" caption. `flex justify-between items-center mb-2`. |
| ⓑ search input | `<Input>` + `<Search size={14} />` 좌측 absolute. `pl-9` (icon 자리). placeholder 호출처 결정. autoFocus on open. |
| ⓒ container | `border border-border-subtle rounded-md bg-surface-default divide-y divide-border-subtle max-h-[260] overflow-y-auto` |
| ⓓ thumbnail | 44×28 (이미지) / 32×32 (avatar). `radius-sm` + `object-cover`. 이미지 없을 시 brand-color swatch + 첫 글자. |
| ⓔ 텍스트 영역 | 주제목 (13 / medium / fg-primary) + 부제목 (11.5 / fg-tertiary) 2줄. `flex: 1; min-width: 0; truncate`. active 시 주제목 `fg-brand-strong + semi`. |
| ⓕ 옵션 영역 (옵션) | 우측 badge / 상태 indicator / check 등. 호출처 결정 (단종 badge, ✓ check, 가격 등). |
| ⓖ empty state | container 안 중앙 정렬 caption — "검색 결과가 없어요". |
| ⓗ loading state | container 안 SkeletonBase row N개 — thumbnail + 2줄 텍스트 동일 폭. |
| ⓘ focus ring | `focus-visible:ring-2 ring-ring ring-offset-2` (각 row inner) |

**규칙**

- 검색 input은 **상단 고정** (sticky 아님 — list가 짧을 때 부자연스러움). list 자체만 scroll.
- list max-height는 화면 절반 이하 — 모달 안에서 다른 field 가리지 않게.
- thumbnail은 **rectangular(카드)** 또는 **circular(avatar)** — 도메인에 맞게. 카드는 16:10 가까운 비율(44×28), avatar는 정사각형.
- active row 표시 — `bg-brand-subtle` + 주제목 색·weight 강조. check는 옵션 (제목 강조만으로 충분 시 생략).

## Variants

SearchableList는 **variant 없음** — 단일 시각 spec. 의미 분기는 호출처가 thumbnail 비율·옵션 영역으로 결정.

## Sizes

| Size | Row padding | Thumbnail | Gap | List max-h |
|---|---|---|---|---|
| `sm` | `8 12` | 32×20 | 10 | 200 |
| `md` *(default)* | `10 12` | 44×28 | 12 | 260 |
| `lg` | `14 16` | 56×36 | 14 | 320 |

| 항목 | 값 (md) | 토큰 |
|---|---|---|
| Search input | input-md 톤 | (input spec) |
| Search icon size | 14 | (literal) |
| Search icon color | `var(--color-text-tertiary)` | (semantic) |
| Search input left padding | 36 | `pl-9` |
| Container border | 1px `border-subtle` | `var(--color-border-subtle)` |
| Container radius | 6 | `var(--radius-md)` |
| Container bg | `var(--bg-surface)` | (semantic) |
| Container max-h | 260 | (literal) |
| Row padding (Y · X) | 10 · 12 | (literal) |
| Row divider | 1px `border-subtle` | (semantic) |
| Row bg (inactive) | transparent | (literal) |
| Row bg (active) | `var(--bg-brand-subtle)` | (semantic) |
| Thumbnail (card) | 44×28 | (literal) |
| Thumbnail radius | 4 | `var(--radius-sm)` |
| Gap (thumb ↔ text) | 12 | `var(--spacing-md)` |
| 주제목 font | 13 / medium | (literal) |
| 주제목 color (inactive) | `var(--color-text-primary)` | (semantic) |
| 주제목 color (active) | `var(--color-primary-strong)` | (semantic) — 또는 `var(--color-primary)` 환경에 맞춰 |
| 부제목 font | 11.5 / regular | (literal) |
| 부제목 color | `var(--color-text-tertiary)` | (semantic) |
| Empty state padding | 24 (`py-6`) | (literal) |
| Empty state font | 12 / `text-tertiary` | (literal) |

## States

| State | Row bg | 주제목 color/weight | Cursor |
|---|---|---|---|
| `enabled` (inactive) | transparent | `text-primary` / medium | pointer |
| `enabled` (active) | `bg-brand-subtle` | `primary-strong` / semi | pointer |
| `hover` (inactive) | `bg-surface-input` (subtle) | (변화 없음) | pointer |
| `focus-visible` | (변화 없음) | (변화 없음) | + `ring-2 ring-ring ring-offset-2` |
| `disabled` (단종/비활성) | (변화 없음) | (변화 없음) | `opacity 0.7` + badge 표시 |

## Layout

**Modal / Drawer 안**

- 모달 안에서 우측 column 또는 하단 영역 — header(라벨+개수) → search → list 흐름.
- max-height로 list 스크롤, 모달 자체는 스크롤 없음(다른 field와 같이 보임).

**Full page**

- 페이지 메인 영역 — search 상단 sticky 가능 (list 길어질 수 있음). 본 spec 외 호출처 결정.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Modal/section open | search input autoFocus (옵션). |
| typing | 결과 list 실시간 필터 (lowercase substring `includes` 또는 backend 호출). |
| Click row | active 토글 (single-select). 이전 active는 inactive. 모달 닫지 않음(다음 액션 위해). |
| `Enter` (search input) | 첫 row 선택 (옵션, 호출처 결정). |
| `Escape` | 검색 input clear 또는 외부 컴포넌트 close. |
| `↑↓` (focus result) | row 간 이동. (옵션, RadioGroup 사용 시) |
| 결과 0건 | empty state "검색 결과가 없어요" — list container 안 중앙. |
| 로딩 중 | SkeletonBase row N개 — thumbnail + 2줄 텍스트. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (active 주제목 × bg-brand-subtle) | `primary-strong` × `brand-subtle` 4.5:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (container border × bg-page) | `border-subtle` × `bg-page` 3:1+ ✓ |
| **WCAG 2.4.3** Focus Order | search → list row 순. `Tab` 흐름 자연. |
| **WCAG 2.4.7** Focus Visible | search + 각 row `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | row height ≈ 48 (padding 10 + thumb 28) ⚠ AAA 경계 — md size lg 권장 시 row 높이 ↑ |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | ≥ 24 ✓ |
| **ARIA** | `role="listbox"` + 각 row `role="option" aria-selected`. search input `aria-controls={listId}`. empty state는 `aria-live="polite"`. |

## Do / Don't

### ✅ Do

- **대량 옵션 + 검색 필요** — 카드 카탈로그·은행·증권사·종목·도시 등.
- thumbnail로 시각 인지 보강 — 이미지 없으면 brand-color swatch + 첫 글자 fallback.
- 주제목 + 부제목 2줄 — 주는 짧고 굵게, 부는 식별 정보 (발급사/카테고리/연회비 등).
- active row는 bg-brand-subtle + 텍스트 강조 두 단서 동시.
- 검색 결과 0건 시 친절한 empty state — "검색 결과가 없어요" + 옵션 안내.

### ❌ Don't

- 옵션 5건 이하 — search input 없이 RadioList / ToggleGroup이 적합.
- thumbnail 없이 텍스트만 — 식별 어려움. 최소 brand-color swatch + 글자 fallback.
- 검색 결과 100건+ 무제한 렌더 — 성능 + 인지 부담. virtualization 또는 결과 limit 안내.
- row 안 옵션 5개+ — 텍스트 잘림 + 시각 답답. 핵심 2–3개로 압축.
- list 안 multi-select — single만. multi는 별 spec.

## Migration notes

- desk-front `AssetEditDialog.tsx` "카드 검색" list (line 442–540) 직접 raw button + inline style 패턴 → 본 spec SearchableList로 흡수.
- thumbnail 폴백 패턴(이미지 없을 시 brand-color swatch + 첫 글자) 그대로 보존 — `getBrandColor(c.company?.name)?.bg ?? 'var(--bark-500)'` 등 호출처 brand 색 매핑.
- "은행/증권사" list(line 542~)는 단순 ToggleGroup chip flex-wrap 사용 — 본 spec 대상 아님(검색 + thumbnail 패턴 X).
- shadcn에는 본 컴포넌트 없음 — Porest 도메인 전용 추가 spec. (참고: shadcn `command`는 keyboard-driven palette로 유사하나, 본 SearchableList는 카탈로그 카드 row가 메인).
- 후속: 종목 검색·도시 선택·태그 검색 등 도메인 확장 시 호출처 thumbnail/옵션 영역만 차이.
