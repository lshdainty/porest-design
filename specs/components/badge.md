# Badge

> 상태·카테고리·메타 라벨을 한 글자~짧은 단어로 압축 표시하는 마이크로 컴포넌트. pill shape(`radius-full`) + `text-badge`(11/600/1.2) baseline. 단독 또는 list row / card header / button 내부 등 다양한 표면에 합성. shadcn `Badge` 베이스.

Porest Badge는 **3 styles(solid / soft / outline) × neutral·semantic 색상** 매트릭스로 정의됩니다. site SoT(solid: default/secondary/destructive/outline) + preview SoT(soft semantic: success/info/warning/error)를 통합 — 같은 spec 안에 두 시각 톤을 공존시켜 사용처가 강조 강도(solid > soft > outline)와 의미(brand/neutral/semantic)를 자유 선택. 단일 size — pill 폼 안 micro 라벨 톤 통일.

## Anatomy

```
┌─────────────┐
│ ⓐ children  │  ← inline-flex + 토큰 padding
└─────────────┘
 ▲ ⓑ pill border (radius-full)
```

| ⓐ root | `<div>` — `inline-flex items-center rounded-full px-[var(--spacing-sm)] py-0.5 text-badge font-semibold transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |
| ⓑ shape | `rounded-full` pill — 모든 variant 공통. square badge는 spec 외 범위. |
| ⓒ dot indicator (선택) | 좌측 6×6 colored dot — outline variant에 색상 의미 부가 시(예: 온라인/자리비움/오프라인). `mr-1.5` 또는 `var(--spacing-xs)`. |
| ⓓ children | 텍스트(한글/영문/숫자) 또는 dot + 텍스트. uppercase 변환은 옵션(`uppercase tracking-wide` className) — 한국어 라벨은 base 그대로. |
| ⓔ focus ring | `focus:ring-2 ring-ring ring-offset-2` — 인터랙티브 badge(clickable filter chip)일 때만. 정적 라벨은 focus 대상 아님. |

**규칙**

- 폼은 항상 pill(`rounded-full`) — sharp corner badge는 사용 안 함. micro 라벨의 부드러운 시각 단위.
- font는 항상 `text-badge`(11/600/1.2) — 폰트 위계 최하단. 본문 영역 안에서 자기 주장 약함.
- padding-y는 literal `0.5`(2px) — `--spacing` 토큰에 2px 단위 없어 Tailwind shortcut 유지. padding-x는 `var(--spacing-sm)`(8) 토큰.
- uppercase + letter-spacing은 영문 약어(STATUS/INFO/등) 전용 — 한국어 라벨엔 가독성 저해. 사용처에서 `uppercase tracking-wide` className로 opt-in.

## Variants (style × tone 매트릭스)

### Style: `solid` (3 variants)

| Variant | Background | Text | 사용처 |
|---|---|---|---|
| `default` *(default)* | `--color-primary` | `--color-text-on-accent` | brand 강조 라벨 — "NEW", "BETA", primary 강조 상태("승인"). |
| `secondary` | `--color-surface-input` | `--color-text-primary` | neutral 라벨 — 카테고리 태그, 우선순위 평이. |
| `destructive` | `--color-error` | `--color-text-on-accent` | 위험·거절 강조 — "반려", "삭제 예정". semantic error의 강조 톤. |

### Style: `soft` (4 semantic — preview SoT 정합)

| Variant | Background | Text | 사용처 |
|---|---|---|---|
| `info` | `color-mix(in srgb, var(--color-info) 16%, transparent)` | `--color-info` | 정보성 라벨 — "신규", "안내". |
| `success` | `color-mix(in srgb, var(--color-success) 16%, transparent)` | `--color-success` | 성공·완료 — "완료", "정상". |
| `warning` | `color-mix(in srgb, var(--color-warning) 16%, transparent)` | `--color-warning` | 주의·임박 — "경고", "임박". |
| `error` | `color-mix(in srgb, var(--color-error) 16%, transparent)` | `--color-error` | 약한 오류 강조 — "실패", "지연". (강한 destructive는 solid `destructive` 사용.) |

### Style: `outline` (5 — neutral + 4 semantic)

| Variant | Border | Text | 사용처 |
|---|---|---|---|
| `outline` | `--color-border-default` | `--color-text-primary` | neutral outline — 정보 강도 가장 낮은 라벨, dot indicator와 조합. shadcn 기본 `outline`. |
| `outline-info` | `--color-info` | `--color-info` | "LOW" 같은 약한 정보 — 첫 화면 LOW 패턴. |
| `outline-success` | `--color-success` | `--color-success` | "OK" 같은 약한 긍정. |
| `outline-warning` | `--color-warning` | `--color-warning` | "MEDIUM" 같은 중간 경고 — 첫 화면 MEDIUM 패턴. |
| `outline-error` | `--color-error` | `--color-error` | "HIGH" 같은 강한 경고 — 첫 화면 HIGH 패턴. |

**선택 기준** — 강조 강도: `solid` > `soft` > `outline`. 의미 분기: neutral(default/secondary/outline)는 brand-neutral, semantic(info/success/warning/error)은 의미 분기.

## Sizes

Badge는 **size variant 없음** — 단일 spec. micro 라벨이라 사이즈 분기는 시각 noise. 큰 라벨이 필요하면 [`Chip`](./) 또는 별도 spec.

| 항목 | 값 | 토큰 |
|---|---|---|
| Padding-Y | 2px | `py-0.5` (Tailwind shortcut — 2px) |
| Padding-X | 8px | `px-[var(--spacing-sm)]` |
| Border radius | 9999px (pill) | `rounded-full` (= `var(--radius-full)`) |
| Border width | 1px (outline·default), 0 (solid·soft) | `border` |
| Font | 11 / 600 / 1.2 | `text-badge font-semibold` |
| Letter-spacing | 0 (base) / 0.04em (uppercase opt-in) | (literal) |
| Min-height | 텍스트 + padding-y (≈ 18px) | (자동) |
| Dot size | 6×6 | `size-1.5` 또는 6px literal |
| Dot ↔ text gap | 4px | `mr-1.5` 또는 `var(--spacing-xs)` |
| Transition | colors | `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |

## States

| State | Background | Border | Text | 추가 |
|---|---|---|---|---|
| `default` (static) | variant 색 | variant border | variant text | — |
| `hover` (interactive only) | solid → `brightness-105` / soft → 16% → 24% mix / outline → `bg-surface-input` | (변화 없음) | (변화 없음) | clickable badge만 (filter chip 등). |
| `focus-visible` (interactive only) | (변화 없음) | (변화 없음) | (변화 없음) | `ring-2 ring-ring ring-offset-2` |
| `disabled` | opacity 0.5 | — | — | `cursor-not-allowed pointer-events-none` — interactive badge만. |

**규칙**: 정적 라벨 badge는 hover/focus state 불필요. clickable badge(filter chip, dismissable tag)일 때만 state 부여.

## Layout

**Inline label**

- 텍스트 흐름 안 — `align-items: center` flex item 또는 text-baseline 정렬. badge가 부모 텍스트(`text-body-md`/`text-title-sm`)보다 작아 baseline 살짝 위.

**Row-end indicator**

- list row 우측 끝 — list item 우측 status badge. `justify-between` 패턴. badge.tsx examples "In list (HR 시나리오)" 참조.

**Stack of badges**

- `flex flex-wrap gap-[var(--spacing-xs)]` (4) — 여러 라벨 동시 표시. 한 라벨에 여러 의미 분기 동시 불필요(중복 의미는 압축).

**With dot indicator (outline only)**

- 좌측 6×6 colored dot — 텍스트 라벨 + 색상 메타. WCAG 1.4.1(색만 의존 금지) 충족 — 색 + 텍스트 두 단서.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click (interactive) | filter chip — toggle on/off. dismissable tag — onDismiss 콜백. 정적 라벨은 인터랙션 없음. |
| `Enter` / `Space` (interactive focus) | toggle/dismiss. |
| `Tab` | interactive badge만 focus 진입. 정적 라벨은 skip. |
| screen reader | 정적 라벨은 `role` 없음(텍스트 그대로 읽음). interactive는 `role="button"` 또는 `aria-pressed`(filter chip). |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.1** Use of Color | 색 + 텍스트 둘 다 필수 — 색 단독 의미 금지. dot indicator도 텍스트 라벨 동반. |
| **WCAG 1.4.3** Color contrast (solid text × bg) | `text-on-accent` × `primary` 7:1+ / `text-on-accent` × `error` 5:1+ / `text-primary` × `surface-input` 12:1+ ✓ |
| **WCAG 1.4.3** Color contrast (soft text × bg) | `info` `#2271D1` × 16% info mix on white 4.6:1+ / `success` 4.7:1+ / `warning` `#F59E0B` × 16% mix 3:1 — micro 텍스트 11px는 large text 기준 미적용. **3:1 충족 안 함 시 large 라벨(14px+) 사용 또는 contrast 강화** (warning은 24% mix 권장). |
| **WCAG 1.4.11** Non-text contrast (outline border × bg-page) | `info` 4.5:1+ / `error` 5:1+ / `border-default` 1.4:1 — border-default outline은 약함이라 dot indicator + 텍스트로 시각 식별 보강. |
| **WCAG 2.4.7** Focus Visible | interactive badge `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | static badge — 미달(⚠). static 라벨은 touch target 아니라 무관. interactive badge는 wrapper로 padding 확장 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | static — 18px 미달(⚠). interactive 필요 시 wrapper 확장. |
| **ARIA** | static — `role` 없음. interactive — `role="button"` + (toggle) `aria-pressed` / (dismiss) `aria-label="<label> 제거"`. |

## Do / Don't

### ✅ Do

- 상태/카테고리/메타 — 짧은 라벨(1–4글자) 압축 표시.
- semantic variant(soft/outline)는 의미와 일치 — 완료=success, 거절=destructive/error, 정보=info.
- **같은 카테고리(같은 list/같은 column)는 한 style 톤으로 통일** — 결재 상태 4종은 모두 `soft`로, 우선순위 3종은 모두 `outline-semantic`으로. 의미 분기는 **색**으로만, style은 일관 유지. 한 카테고리 안에서 solid/soft/outline 섞으면 시각 위계가 깨져 "왜 어떤 건 강하고 어떤 건 약한가" 사용자 혼란.
- list row 우측 끝 또는 카드 header에 배치 — 시각 위계 안에서 status hint 역할.
- 색 + 텍스트 두 단서로 의미 전달 — WCAG 1.4.1 색맹 사용자 대응.

### ❌ Don't

- 한 list 안에서 style 섞기 — solid(승인) + soft(대기) + destructive(반려) + outline(완료)처럼 strength가 들쑥날쑥하면 의미 분기와 style 분기가 충돌. **같은 카테고리는 한 style**, 다른 카테고리(상태 vs 우선순위)면 style 분리 가능.
- 긴 문장(5단어 이상)을 badge로 — pill 시각 무너짐. 긴 라벨은 inline text 또는 [`Alert`](alert.md).
- 한 row에 5+ badge — 시각 노이즈. 압축 또는 카테고리 분리.
- uppercase + 한국어 조합 — `letter-spacing: 0.04em` + 한글은 의미 없음(자모 분리 안 됨). uppercase는 영문 약어 전용.
- semantic 색을 의미 없이 변형 — 정보성 라벨에 `error` 톤 사용 금지(사용자 혼란).
- interactive badge에 hover state 없이 click 처리 — affordance 부재. clickable이면 hover/focus state 필수.

## Migration notes

- 기존 `badge.tsx`는 4 variants(default/secondary/destructive/outline)만 — preview SoT(soft semantic 4 + outline-semantic 4)를 통합해 spec의 3 styles × neutral·semantic 매트릭스로 확장.
- `px-2.5 py-0.5` Tailwind 기본(10px/2px) → `px-[var(--spacing-sm)] py-0.5` 토큰 직접 인용(8px/2px) — preview SoT(`padding: 2px 8px`) 정합. padding-y 2px는 `--spacing` 토큰에 단위 없어 literal 유지.
- preview-html `.badge` `font-size: 11px` 픽셀 하드코드 → `var(--text-badge)` 토큰 직접 인용. `font-weight: 600` → `var(--text-badge--font-weight)` 또는 그대로 600. `padding: 2px 8px` → `padding: 2px var(--spacing-sm)`.
- preview-html `.badge` `text-transform: uppercase` + `letter-spacing: 0.04em` → base에서 **제거**. brand vignette dense 라벨이 영문 약어 위주라 보존됐으나 한국어 도메인 라벨엔 부적합. spec base는 자연 텍스트 그대로. uppercase 필요 시 사용처 className으로 opt-in.
- preview-html `.badge-success/error/warning/info` 4 semantic soft variants는 spec `soft` style로 정식 채택 — site shadcn에는 없던 변형을 spec에 통합.
- transition 추가 — `transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` (hover state가 있는 interactive badge 대비).
- focus ring은 interactive badge일 때만 작동 — `focus:` (모든 focus) → `focus-visible:` (키보드 only) 정정.
