# IconPicker

> Lucide 아이콘 셋(2000+)에서 단일 아이콘을 검색·선택하는 popover trigger 패턴. 카테고리/라벨/메모 등 사용자가 직접 아이콘을 부여하는 도메인 전용 컴포넌트. shadcn에는 없는 Porest 도메인 spec.

Porest IconPicker는 **단일 trigger × popover grid** 매트릭스로 정의됩니다. 작은 정사각형 trigger button(현재 아이콘 미리보기 또는 placeholder) + 클릭 시 popover 열림 → 상단 검색 input + 8-col grid에 검색 매칭 아이콘들. Radix `Popover` 베이스 + `lucide-react/dynamic` 의 `iconNames` / `DynamicIcon` 활용.

## Anatomy

```
trigger (closed)               popover (open)
┌──┐                          ┌────────────────────────────────┐
│ⓐ│   ← 현재 아이콘             │ ⓒ 🔍 search input              │
└──┘                          ├────────────────────────────────┤
                              │ ⓓ grid (8-col)                 │
                              │  ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐│
                              │  │  ││  ││✓ ││  ││  ││  ││  ││  ││
                              │  └──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘│
                              │  …                              │
                              │  (scroll, max-h 240)           │
                              ├────────────────────────────────┤
                              │ ⓔ footer (option) — 매칭 개수   │
                              └────────────────────────────────┘
```

| ⓐ trigger | `<button>` 40×40 — `flex h-10 w-10 items-center justify-center rounded-md border border-border-default bg-surface-default shadow-sm hover:bg-surface-input transition-colors`. 현재 value(`iconName`) 이 있으면 `<DynamicIcon name={value} size={18} />` 미리보기, 없으면 `—` placeholder. |
| ⓑ popover content | `<PopoverContent>` width 320 (`w-80`) + `padding md`. align="start". |
| ⓒ search | `<Input>` + `<Search size={14} />` 아이콘 (좌측 absolute). autoFocus on open. placeholder "아이콘 검색...". |
| ⓓ grid | `<ScrollArea>` + `grid grid-cols-8 gap-1 max-h-60`. 각 cell: `<button>` 32×32 — `flex h-8 w-8 items-center justify-center rounded transition-colors`. active 시 `bg-primary text-text-on-accent`, inactive `text-text-secondary hover:bg-surface-input`. |
| ⓔ footer (선택) | 매칭 총 개수 표시 (`총 N개 중 100개 표시`) — 검색 결과 많을 때 도움. |

**규칙**

- trigger 크기는 **input-md 와 동일 height(40)** — form 안에서 input과 정렬 자연.
- popover 폭은 **w-80**(320) — 8-col × 32 + gap × 7 + padding 24 ≈ 312 → 최소 폭 보장.
- grid는 `max-height` 제한 + ScrollArea — 2000+ 아이콘 중 매칭 매우 많을 수 있어 화면 넘침 방지.
- 검색 매칭 표시는 **상위 100건 limit** — 성능 + 인지 부담. 그 이상은 검색어 추가 입력 유도.

## Variants

IconPicker는 **variant 없음** — 단일 시각 spec. 의미 분기(작은/큰 trigger 등)는 size로.

## Sizes

| Size | Trigger | Popover | Cell |
|---|---|---|---|
| `sm` | 32×32 | `w-72` (288) | 28×28 grid-cols-8 |
| `md` *(default)* | 40×40 (input height 정합) | `w-80` (320) | 32×32 grid-cols-8 |
| `lg` | 48×48 | `w-96` (384) | 36×36 grid-cols-8 |

| 항목 | 값 (md) | 토큰 |
|---|---|---|
| Trigger size | 40×40 | `h-10 w-10` |
| Trigger radius | 8 | `var(--radius-md)` |
| Trigger border | 1px | `border-border-default` |
| Trigger shadow | shadow-sm | `var(--shadow-sm)` |
| Popover width | 320 | `w-80` |
| Popover padding | 12 | `var(--spacing-md)` |
| Search input | input-sm 톤 | (input spec) |
| Grid cols | 8 | (literal) |
| Cell size | 32×32 | `h-8 w-8` |
| Cell radius | 4 | `var(--radius-sm)` |
| Cell gap | 4 | `var(--spacing-xs)` |
| Grid max-height | 240 | `max-h-60` |
| Animation | fade + scale (popover 기본) | `var(--motion-duration-fast)` |

## States

| State | Cell bg | Cell text |
|---|---|---|
| `enabled` (inactive) | transparent | `text-text-secondary` |
| `enabled` (active) | `var(--color-primary)` | `var(--color-text-on-accent)` |
| `hover` (inactive) | `var(--color-surface-input)` | `var(--color-text-primary)` |
| `focus-visible` | (변화 없음) | + `ring-2 ring-ring ring-offset-2` |

## Layout

**Form field 안**

- Label "아이콘" + 아래 trigger. trigger 우측에 추가 helper(현재 아이콘명 caption) optional.
- 다른 input(이름/색상/카테고리)과 같은 column flow.

**inline (toolbar / row)**

- form 외 inline 사용 — 예: 메모 row의 아이콘 변경 같은 작은 trigger. size="sm" 권장.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| trigger click | popover open. search input autoFocus. |
| search input typing | 매칭 아이콘 grid 필터 (lowercase substring). `includes(query)` 매칭. |
| cell click | onChange(iconName) 콜백 + popover close. |
| Outside click | popover close (Radix 기본). |
| `Escape` | popover close, trigger focus 복귀. |
| Tab (popover 내) | search input → grid cell 순환. |
| popover close | search input 자동 비움. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (active cell × text) | `text-on-accent` × `primary` 4.5:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (trigger border × bg-page) | `border-default` × `bg-page` 3:1+ ✓ |
| **WCAG 2.4.3** Focus Order | popover 열림 시 search input focus → tab으로 grid 진입. |
| **WCAG 2.4.7** Focus Visible | trigger + search + 각 cell `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | trigger md=40 (⚠ AAA 미달 — input과 정렬 위해 의도) / lg=48 ✓ |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 32 ✓ |
| **ARIA** | trigger `aria-haspopup="dialog"` + `aria-expanded` (Radix 자동). 각 cell `aria-label={iconName}`. popover `role="dialog"`. |

## Do / Don't

### ✅ Do

- 사용자가 직접 아이콘을 부여하는 도메인(카테고리/라벨/메모/북마크)에 사용.
- search input으로 fuzzy 매칭 (substring `includes`) — 정확한 이름 몰라도 검색 가능.
- 매칭 결과 limit (100) + footer 안내 — 성능/인지.
- popover open 시 search autoFocus — 키보드 사용자 우선.

### ❌ Don't

- 단일 form에서 IconPicker 3+ — 사용자 결정 부담. 한 폼당 1개 권장.
- 매칭 limit 없이 전체 렌더 — 2000+ 아이콘 동시 렌더는 성능 저하 + 무한 스크롤도 인지 부담.
- 아이콘만 단독 (라벨/카테고리 없이) — 의미 약. 텍스트 라벨과 페어로.
- 시맨틱 의미(상태/긴급도)를 아이콘으로만 — 색 + 텍스트도 함께.

## Migration notes

- desk-front `src/shared/ui/icon-picker.tsx`가 이미 존재 — 본 spec은 그 코드를 SoT로 정합 (역방향 spec 끌어올림).
- desk-front 의 `useState` + `useMemo` + `useEffect` 패턴 그대로 보존 — popover open 시 search autoFocus, close 시 search clear.
- `lucide-react/dynamic` 의 `iconNames` 배열 + `DynamicIcon` 컴포넌트 사용 — bundle splitting (필요한 아이콘만 lazy import). Lucide 외 다른 icon set은 본 spec 외.
- MAX_VISIBLE = 100 literal — 검색 결과 limit. 성능과 인지 부담의 balance.
- 향후 search empty 시 popular 아이콘 우선 표시(rank) 옵션 — 사용자 피드백 후 결정.
