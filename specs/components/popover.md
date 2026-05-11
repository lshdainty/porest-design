# Popover

> trigger 옆에 떠오르는 작은 floating 패널. 인라인 빠른 편집(카테고리 변경/메모 입력) / 짧은 설정 패널 / form 인풋 그룹 등 modal보다 가벼운 보조 상호작용. Radix `Popover` 베이스 + Tooltip/HoverCard와 시각 구분되는 인터랙티브 콘텐츠 컨테이너.

Porest Popover는 **단일 spec × 2 trigger styles(compact pill / outline button)** 매트릭스로 정의됩니다. preview `.pop` SoT 정합 — Content: `surface-default` + border 1px + `radius-md` + `padding-md` + `shadow-md` + `gap-sm`. Trigger는 사용 맥락에 따라 compact pill(`.pop-trigger` — 인라인 편집용) 또는 일반 outline button(설정/form trigger용) 선택.

## Anatomy

```
┌────────────┐
│ ⓐ trigger  │  ← compact pill 또는 outline button
└─────┬──────┘
      │
      ▼  (sideOffset 4)
┌──────────────────────────────────────┐
│ ⓑ content (border + shadow-md)       │
│   ┌──────────────────────────────┐   │
│   │ heading / fields / body 자유  │   │
│   └──────────────────────────────┘   │
│   ⓒ actions (선택, justify-end)     │
└──────────────────────────────────────┘
```

| ⓐ trigger | preview `.pop-trigger` 또는 `Button outline`. 2 style 중 선택. compact pill은 `surface-input` + border + `radius-md` + caption + xs/sm padding(`spacing-xs`/`spacing-sm`); outline button은 일반 Button `variant="outline"` `size="md"`. |
| ⓑ content | preview `.pop` 그대로 — `background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); padding:var(--spacing-md); box-shadow:var(--shadow-md); display:flex; flex-direction:column; gap:var(--spacing-sm); z-index:50;` 기본 폭 `w-72`(288), 콘텐츠 따라 className으로 조정. |
| ⓒ actions | `display:flex; justify-content:flex-end; gap:var(--spacing-xs);` cancel/submit 같은 짧은 액션 쌍. button은 SM size 권장. |

**규칙**

- title이 없는 popover는 콘텐츠 자체로 의도가 명확해야 — modal과 달리 dismiss-on-outside-click이 표준이라 짧은 상호작용에만 사용.
- content 내부 input/textarea는 같은 spec의 input 토큰(`surface-input` + `body-md`) 또는 caption 톤(compact pill trigger 옆에는 caption — preview `.pop textarea` 패턴).
- actions의 button 사이즈는 SM 통일 — popover 폭(288) 안에서 두 button이 자연 배치되도록.

## Variants (trigger style)

| Trigger | 시각 | 사용처 |
|---|---|---|
| `compact pill` | `surface-input` + border + caption + xs/sm padding | 인라인 편집 — 카테고리 빠른 변경, 인라인 코멘트 같은 행 안의 빠른 액션. |
| `outline button` *(default)* | 일반 Button `variant="outline"` `size="md"` | 설정 패널 열기, form 그룹 trigger — 명시적 액션. |

content variant는 없음 — 모든 popover는 동일 시각 spec. 콘텐츠 차이(heading + body / form / actions)로 의미 분기.

## Sizes

Popover는 **content size variant 없음** — 사용처에서 className으로 폭만 조정(`w-72`(288) 기본, `w-80`(320)/`w-96`(384) 등). padding/radius/shadow는 단일 spec.

| 항목 | 값 | 토큰 |
|---|---|---|
| Content padding | 12px | `var(--spacing-md)` |
| Content gap (자식 간) | 8px | `var(--spacing-sm)` |
| Content radius | 8px | `var(--radius-md)` |
| Content shadow | shadow-md | `var(--shadow-md)` |
| Content border | 1px solid | `var(--color-border-default)` |
| Content z-index | 50 | (literal) |
| Side offset (trigger ↔ content) | 4px | (Radix 기본) |
| Default width | 288px (`w-72`) | (literal) |
| Compact trigger padding | xs · sm | `var(--spacing-xs)` · `var(--spacing-sm)` |
| Compact trigger font | caption (12) | `var(--text-caption)` |
| Compact trigger radius | 8px | `var(--radius-md)` |
| Actions gap | 4px | `var(--spacing-xs)` |

## States

| State | Trigger | Content |
|---|---|---|
| `closed` | enabled | (unmounted) |
| `open` | `aria-expanded="true"` | 표시, side offset 4 |
| `enter` | — | `data-[state=open]:animate-in fade-in-0 zoom-in-95 + side-slide-in` |
| `exit` | — | `data-[state=closed]:animate-out fade-out-0 zoom-out-95` |
| `outside click` | — | dismiss (default 동작) |
| `Escape` | — | dismiss, focus는 trigger로 복귀 |

motion: `motion-duration-fast` (180ms) · `motion-ease-out` (Radix 기본).

## Layout

**Inline edit (compact pill)**

- trigger를 행 안에 자연스럽게 배치 — `display:inline-flex` + `align-items:center` + chevron 아이콘.
- content는 trigger 바로 아래 (bottom-start align 기본).
- content 안에 짧은 form(예: textarea 3 rows + actions 한 줄) — 빠른 입력 후 dismiss.

**Settings panel (outline trigger)**

- trigger는 일반 outline button. 클릭으로 명시적으로 열림.
- content 안에 heading(`title-sm` 600) + description(`body-sm` `text-secondary`) + optional fields/actions.
- 설정값은 즉시 반영(자동 저장) — actions 없이 닫기만으로 변경 확정.

**Form in popover**

- 짧은 form(2–3 fields) 전용 — 그 이상은 dialog로 승격.
- 각 field는 `grid grid-cols-3` + label · input(span 2) 패턴.
- 마지막에 `justify-end` actions(취소/저장).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Trigger click | open ↔ close 토글. |
| Outside click | dismiss (default — `onPointerDownOutside` 차단으로 override 가능). |
| `Escape` | dismiss, focus는 trigger로 복귀. |
| Tab | content 내부 focusable elements 순환 — outside는 focusable 유지(modal과 다름). |
| Trigger hover | (compact pill은 transition으로 background/border 미세 강조 가능) |
| 외부 scroll | content는 trigger와 함께 따라감 (Radix `Portal` + position 추적). |

Popover는 **modal이 아님** — outside focus 가능, dim overlay 없음. 일시 차단이 필요하면 Dialog/Drawer 사용.

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (content text × surface-default) | `text-primary` 21:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (content border × bg-page) | `border-default` × `bg-page` = 1.5:1 — 단독 식별 약함이나 `shadow-md`이 보강. |
| **WCAG 2.4.3** Focus Order | open 시 첫 focusable element에 focus 이동 가능(Radix 옵션). close 시 trigger 복귀. |
| **WCAG 2.4.7** Focus Visible | trigger + content 내 focusable 모두 `focus-visible:ring-2 ring-ring ring-offset-2`. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | compact pill trigger ≈ 24–28px — 미달(⚠). 모바일 핵심 액션은 outline button(md 40px) 사용. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | compact pill 24+ ✓ / outline button md 40 ✓ |
| **ARIA** | Radix가 `aria-expanded` + `aria-controls` + `role="dialog"` (PopoverContent) 자동 부여. trigger는 `<button>` semantic. |

## Do / Don't

### ✅ Do

- 짧은 인라인 상호작용에 사용 — 카테고리 변경, 인라인 코멘트, 짧은 form. 5초 안에 끝낼 수 있는 작업.
- compact pill trigger는 caption font + xs/sm padding — 행 안에 자연스럽게 녹아들도록.
- 설정 panel처럼 자동 저장이 자연스러우면 actions 생략 — 사용자가 dismiss로 변경 확정.
- content 폭은 콘텐츠 따라 조정 — 기본 288, 좁은 입력은 240, 넓은 form은 320–384.

### ❌ Don't

- 긴 form(4+ fields)을 popover 안에 — focus loss 위험. dialog로 승격.
- destructive 확정 액션 — outside click dismiss로 실수 방지 안 됨. AlertDialog 사용.
- 핵심 화면 흐름을 popover로 일시 차단 — modal 패턴이 필요한 작업은 Dialog/Drawer.
- popover 안에 또 다른 popover/dropdown — z-index 충돌, focus order 혼란.

## Migration notes

- 기존 shadcn `popover.tsx`는 `bg-popover text-popover-foreground border` + `p-4` — preview `.pop` SoT(`surface-default` + `border-default` + `padding-md` + `gap-sm` + `shadow-md`)로 정정.
- preview-html `.pop-trigger`의 padding `6px 10px` 하드코드 → spec은 `var(--spacing-xs) var(--spacing-sm)` 토큰. 차기 preview sync 시 정정 필요.
- preview-html `.pop textarea`의 padding `6px 8px` 하드코드 + caption font → spec은 input.md SoT 톤(`surface-input` + `body-md` + token padding) 또는 caption variant(compact context) 명시.
- 예제 컨테이너 `position:absolute` 사용 시 부모 height 미반영 — examples는 normal-flow(`position:relative` 없이) 사용해 카드 안에 정렬되도록 (이번 세션 정정 완료).
