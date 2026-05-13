# Calendar

> 날짜 선택 calendar — single / multiple / range 모드. shadcn `Calendar` 베이스 + `react-day-picker` primitive. 한 달 grid + 요일 header + nav(이전/다음 월). HR 휴가/근태, Desk 가계부/캘린더 시나리오에 활용. 한글 locale(요일·월) 필수.

Porest Calendar는 **3 modes(single/multiple/range) × 원형 day cell** 매트릭스로 정의됩니다. Day cell은 `rounded-full` 40×40 + `body-md` (preview `.cal-cell` SoT). 선택 = primary fill + `text-on-accent`. 오늘 = `outline 2px primary` 테두리만(fill 없음 — 사용자가 선택 가능). Range는 시작/끝 + 가운데 `surface-input` 채움. 요일 header는 `caption` + 600 + tertiary, 토/일은 더 약한 톤. `react-day-picker` `locale={ko}` (date-fns) 필수.

## Anatomy

```
┌────────────────────────────────────────┐
│ ⓑ ◀  2026년 5월                  ▶  ⓑ │  ← caption + nav
├────────────────────────────────────────┤
│ ⓒ  일  월  화  수  목  금  토         │  ← weekday header (토/일 약한 톤)
├────────────────────────────────────────┤
│        ⓔ        ⓕ                     │
│      27  28  29  30   1   2   3       │  ← outside days (text-tertiary)
│       4   5   6   7   8   9  10       │
│      11  12  [13] 14  15  16  17      │  ← today = outline 2px primary
│      18  19  20  21  ⦿22 23  24       │  ← selected = bg-primary fill
│      25  26  27  28  29  30  31       │
│       1   2   3   4   5   6   7       │  ← outside days
└────────────────────────────────────────┘
```

| ⓐ root (`DayPicker`) | `p-[var(--spacing-md)]` — 외곽 padding. Card/Popover 안에 wrap 권장. |
| ⓑ caption + nav | `<div>` — `flex justify-center pt-[var(--spacing-xs)] relative items-center`. caption(`text-title-sm font-medium`) + 좌·우 nav button([`Button`](button.md) `variant="outline"` size 28×28 + `ChevronLeft`/`ChevronRight` 16). |
| ⓒ weekday header (`head_cell`) | `<th>` — `text-caption font-semibold uppercase tracking-wide text-text-tertiary w-10 h-8` + 한글 요일("일/월/화/수/목/금/토") via `react-day-picker` `locale={ko}`. 토/일은 weekend 톤(`text-tertiary` 유지 또는 별도 시각). |
| ⓓ row (`row`) | `<tr>` — `flex w-full mt-[var(--spacing-xs)]`. 한 주(7 day cell). |
| ⓔ cell (`cell`) | `<td>` — `relative p-0 text-center text-body-md focus-within:relative focus-within:z-20`. range mode에서 cell 사이 bg(`bg-surface-input`)로 연결. |
| ⓕ day (`day`) | `<button>` — `inline-flex h-10 w-10 items-center justify-center rounded-full p-0 text-body-md font-normal text-text-primary hover:bg-surface-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-[var(--motion-duration-fast)]`. |
| ⓖ day_selected | `bg-primary text-text-on-accent hover:bg-primary` — 선택 fill (rounded-full 유지). |
| ⓗ day_today | `outline outline-2 outline-primary outline-offset-[-2px] font-semibold` — **테두리만**(fill 없음, 선택 가능 상태 유지). preview `.cal-cell--today` 정합. |
| ⓘ day_outside | `text-text-tertiary` — 이전/다음 달 날짜(시각 약화). |
| ⓙ day_disabled | `text-text-tertiary opacity-50 cursor-not-allowed` — 휴일/제한 날짜. |
| ⓚ day_range_start / end | 양 끝 fill(`bg-primary`) + rounded-l/r-full만 (range bg와 연결). |
| ⓛ day_range_middle | `bg-surface-input text-text-primary` (rounded 없음, 연속 채움). |

**규칙**

- **day cell은 원형(`rounded-full`)** — preview `.cal-cell` SoT, Toss/Apple 톤. shadcn 기본 `rounded-xs` 사각은 site SoT 외(보수적 톤이라 일부 사용처에선 OK).
- **today는 outline only** (fill 없음) — 사용자가 오늘을 보면서 다른 날짜 선택 가능. selected와 시각 분리.
- 한글 locale 필수 — `import { ko } from "date-fns/locale"` + `<Calendar locale={ko} />`. 요일/월 한글 자동.
- 요일 header는 토/일 약한 톤(`text-tertiary`) — 영업일/주말 구분.
- nav button은 [`Button`](button.md) outline 인용 + 작게(28×28) — 메인 콘텐츠가 day cell이라 nav는 보조.
- range mode 시 cell 사이 bg 연결 — selected 시작/끝 + 가운데 `surface-input` 채움.
- 외곽 wrapper(border/radius)는 사용처가 결정 — [`Popover`](popover.md) 안 또는 [`Card`](card.md) 안.

## Variants (mode)

| Mode | 동작 | 사용처 |
|---|---|---|
| `single` *(default)* | 한 날짜 선택 | HR 근무 시작일, Desk 메모 작성일 등 단일 |
| `multiple` | 여러 날짜 토글 | 휴가 분산 신청, 가계부 표시일 |
| `range` | 시작 + 끝 날짜 (가운데 자동 채움) | HR 휴가 기간, Desk 통계 기간 필터 |

## Sizes

Calendar는 **size variant 없음** — day cell 40×40 고정. 사용처 className으로 외곽 padding/wrap 조정.

| 항목 | 값 | 토큰 |
|---|---|---|
| Root padding | 12px | `p-[var(--spacing-md)]` |
| Day cell size | 40×40 | `h-10 w-10` |
| Day cell radius | full pill | `rounded-full` |
| Day cell font | 15 / 400 / primary | `text-body-md` |
| Day cell hover | `surface-input` | `hover:bg-surface-input` |
| Selected fill | `primary` | `bg-primary text-text-on-accent` |
| Today outline | 2px primary | `outline outline-2 outline-primary outline-offset-[-2px]` |
| Today weight | 600 | `font-semibold` |
| Range middle bg | `surface-input` | `bg-surface-input` |
| Outside day color | `text-tertiary` | `text-text-tertiary` |
| Disabled day | `text-tertiary` + opacity 0.5 | `text-text-tertiary opacity-50` |
| Weekday header font | 12 / 600 / tertiary + uppercase | `text-caption font-semibold uppercase tracking-wide text-text-tertiary` |
| Weekday header size | 40 × 32 | `w-10 h-8` |
| Row gap | 4px | `mt-[var(--spacing-xs)]` |
| Caption font | 16 / 500 | `text-title-sm font-medium` |
| Nav button size | 28×28 | [`Button`](button.md) `variant="outline"` `h-7 w-7` |
| Nav icon size | 16×16 | `h-4 w-4` (`ChevronLeft`/`Right`) |
| Transition | colors | `transition-colors duration-[var(--motion-duration-fast)]` |

## States (day)

| State | Background | Text | Outline |
|---|---|---|---|
| `default` | transparent | `text-primary` | — |
| `hover` | `surface-input` | `text-primary` | — |
| `focus-visible` | (변화 없음) | (변화 없음) | `ring-2 ring-ring ring-offset-2` |
| `today` (선택 안 됨) | transparent | `text-primary` + 600 | `outline-2 outline-primary outline-offset-[-2px]` |
| `selected` | `bg-primary` | `text-on-accent` + 600 | — |
| `today + selected` | `bg-primary` | `text-on-accent` + 600 | — (selected 우선) |
| `range-start` / `range-end` | `bg-primary` | `text-on-accent` + 600 | — |
| `range-middle` | `bg-surface-input` | `text-primary` | — (rounded 없음) |
| `outside` (이전/다음 달) | transparent | `text-tertiary` | — |
| `disabled` (휴일 등) | transparent | `text-tertiary` opacity 0.5 | `cursor-not-allowed` |
| `weekend` (선택 사항) | transparent | `text-tertiary` | — |

## Layout (한국 도메인 패턴)

**HR — 휴가 신청 (range mode)**

- 외곽 [`Popover`](popover.md) 안 Calendar — trigger button "휴가 기간 선택" → popover open → Range 선택. range middle bg 자동.
- 한글 caption "2026년 5월" + 한글 요일 헤더.

**Desk — 가계부 날짜 선택 (single mode)**

- 거래 추가 form 안 — date Input의 trigger를 [`Popover`](popover.md)로 Calendar wrap. single 선택. 오늘 outline 표시.

**HR — 근태 view (multiple mode 또는 visual indicator)**

- 결근/지각/휴가 표시일을 calendar에 시각화 — `react-day-picker`의 `modifiers` prop으로 multiple class 부여. 색 분기(`chart-error`/`warning`/`success`).

**Inline (form 안)**

- 큰 form 안 그대로 — Popover 없이 inline mount. [`Card`](card.md) 안에 wrap.

**Date range filter (statistics)**

- 통계 페이지 — range mode + "최근 7일/30일/이번 달" preset chip([`Toggle`](toggle.md))과 조합.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Day click | mode에 따라 선택 — single: 1개 + 이전 해제 / multiple: toggle / range: 시작 → 끝 순. `onSelect` 콜백. |
| Nav button click | 이전/다음 월. `react-day-picker` 자동. |
| `ArrowLeft/Right/Up/Down` (day focus) | 이전/다음 day 또는 이전 주/다음 주 focus. react-day-picker 자동. |
| `PageUp/Down` | 이전/다음 월. |
| `Home/End` | 주의 시작/끝 day. |
| `Enter` / `Space` (day focus) | 해당 day 선택. |
| `Escape` (Popover 안) | Popover close + focus trigger 복귀. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (day text × bg) | `text-primary` 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (selected `text-on-accent` × `primary`) | 7:1+ (HR `#357B5F` × white) ✓ |
| **WCAG 1.4.11** Non-text contrast (today outline × bg-page) | `primary` 4.5:1+ ✓ |
| **WCAG 2.1.1** Keyboard | Arrow/PageUp-Down/Home-End/Enter/Space ✓ react-day-picker 자동 |
| **WCAG 2.4.7** Focus Visible | day `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | day 40×40 — 미달(⚠). 모바일 우선 화면이면 className `h-11 w-11` override. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 40 ✓ |
| **WCAG 1.4.1** Use of Color | today는 outline + font-semibold 두 단서. selected는 fill + weight 두 단서. ✓ |
| **ARIA** | react-day-picker가 `role="grid"` (table) + `role="gridcell"` (day) + `aria-selected` + `aria-current="date"` (today) + `aria-disabled` 자동. caption은 `aria-live="polite"`로 월 변경 안내. |

## Do / Don't

### ✅ Do

- **한글 locale 필수** — `import { ko } from "date-fns/locale"` + `locale={ko}`. 요일/월 한글 자동.
- **today는 outline only** — fill은 selected만. 사용자가 오늘 보면서 다른 날짜 선택 가능.
- **range mode 가운데 자동 채움** — 시작/끝만 클릭, react-day-picker가 middle 자동.
- **외곽 wrapper(border/radius)는 사용처가 결정** — Popover/Card 안에 wrap.
- **modifiers로 시각 분기** — 휴가/근무/결근 등 카테고리 색 추가. `modifiers={{ holiday: dates }}` + `modifiersClassNames={{ holiday: "text-chart-red" }}`.

### ❌ Don't

- **today를 fill로** — selected와 시각 충돌. outline only 유지.
- **요일 header를 영문(Mon/Tue)** — 한국어 도메인엔 부적합. `locale={ko}` 필수.
- **시작/끝 가운데에 cell radius 부여** — range middle은 연속 bg라 radius 없음(시작/끝만 양 끝 둥글게).
- **외곽 wrapper 없이 평지에** — Calendar는 표 구조라 background/border가 시각 단위 부여. Popover/Card 안에.
- **모바일 화면에 40×40 day cell** — touch 친화 부족. `h-11 w-11` 또는 더 큰 사이즈 권장.

## Migration notes

- 기존 `calendar.tsx` 정정:
  - day `h-9 w-9 rounded-xs text-title-sm` → **`h-10 w-10 rounded-full text-body-md`** (preview `.cal-cell` 정합, Toss 톤 원형 + body 가독성).
  - day_today `bg-surface-input text-text-primary` → **`outline outline-2 outline-primary outline-offset-[-2px] font-semibold`** (preview `.cal-cell--today` 정합 — fill 대신 outline only, selected와 시각 분리).
  - day_selected `bg-primary` 유지 + `rounded-full` (day base에서 상속).
  - head_cell `text-text-secondary rounded-xs w-9 font-normal text-label-sm` → `text-caption font-semibold uppercase tracking-wide text-text-tertiary w-10 h-8` (preview `.cal-weekday` 정합 + 사이즈 day cell과 정렬).
  - cell `text-title-sm` → `text-body-md`.
  - transition 토큰 추가 — `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]`.
- examples 한국 도메인 정합 — single(Desk 가계부) / range(HR 휴가) / multiple modifiers(HR 근태 표시) 3종.
- preview-html `.cal-*` 이미 토큰 정합 + 시각이 site SoT — site 정합 후 양쪽 통일.
- `react-day-picker` `locale={ko}` — date-fns 의존성 활용. shadcn 기본은 영문, Porest는 한글 locale 필수.
