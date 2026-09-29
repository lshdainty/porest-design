# Separator

> 콘텐츠 그룹·인라인 항목 사이를 1px 라인으로 분리하는 가벼운 시각 구분자. ARIA `decorative` 옵션으로 의미 분리(`role="separator"`) 또는 순수 장식(`role="none"`) 분기. Radix `Separator` 베이스.

Porest Separator는 **2 orientations(horizontal/vertical) × decorative 옵션** 매트릭스로 정의됩니다. 단일 시각 톤 — `1px` + `border-default` 색. 사용처에 따라 `margin`/`spacing`을 사용처에서 결정(separator 자체는 width/height만 보장). card·dialog·list section 등 분리가 필요한 모든 곳에서 일관 사용.

## Anatomy

```
─────────────────────────  ← horizontal: h-px w-full
 │
 │  ← vertical: h-full w-px
 │
```

| ⓐ root | `<div role="separator">` (Radix `SeparatorPrimitive.Root`) — `shrink-0 bg-border-default` + orientation별 width/height. |
| ⓑ horizontal | `h-px w-full` — 1px 가로선. 부모 폭 100% 채움. |
| ⓒ vertical | `h-full w-px` — 1px 세로선. 부모 높이 100% 채움. 부모에 `display:flex` + 명시적 height 필수(예: `h-5`). |

**규칙**

- 색은 항상 `bg-border-default` — separator 톤은 한 종류만(다양화 시 시각 noise). 강조 구분이 필요하면 `border-strong` 또는 padding/spacing으로 분리.
- 두께는 항상 `1px` — `2px+` 굵은 선은 시각 위계 깨짐. 강조는 색이 아닌 spacing으로.
- horizontal은 `w-full`(부모 폭) 기본 — 좌우 indent가 필요하면 사용처에서 `mx-*` className.
- vertical은 부모에 명시적 height + flex container 필수 — 그렇지 않으면 `h-full`이 0으로 collapse.
- separator 자체는 `margin` 없음 — 사용처에서 `my-*`/`mx-*`로 spacing 결정. 컴포넌트 의존성 분리.

## Variants

Separator는 **variant 없음** — 단일 시각 톤. orientation prop으로만 분기.

| Prop | 값 | 동작 |
|---|---|---|
| `orientation` | `"horizontal"` *(default)* / `"vertical"` | 가로선 또는 세로선. |
| `decorative` | `true` *(default)* / `false` | true: `role="none"` (시각 only, screen reader 무시). false: `role="separator"` (의미 분리, screen reader 인식). |

## Sizes

Separator는 **size variant 없음** — 항상 `1px`. 두께 분기 필요 시 사용처 className로 override(권장 안 함).

| 항목 | 값 | 토큰 |
|---|---|---|
| Thickness | 1px | `h-px` (horizontal) / `w-px` (vertical) |
| Color | `border-default` | `bg-border-default` |
| Length | 부모 100% | `w-full` (horizontal) / `h-full` (vertical) |

## States

Separator는 **state 없음** — 정적 시각 요소. hover/focus/disabled 모두 없음.

## Layout

**Section divider (horizontal)**

- 카드 안 섹션 그룹 사이 — `<Separator className="my-[var(--spacing-lg)]" />` (16). 또는 `my-[var(--spacing-md)]` (12) 컴팩트.
- form section 사이 — 큰 form을 시각 그룹으로 압축.
- dialog/drawer 안 header ↔ body, body ↔ footer 분리.

**Inline divider (vertical)**

- 인라인 항목 사이 — breadcrumb이 아닌 nav 메뉴 항목 사이. `<div className="flex h-5 items-center gap-[var(--spacing-md)]"><span>홈</span><Separator orientation="vertical" /><span>제품</span></div>`.
- toolbar 안 button 그룹 사이 — visual segmentation.

**List item separator**

- list `<ul>` 안 item 사이 — `<li>` 사이 `<Separator />` 또는 CSS `divide-y` utility. shadcn list 패턴은 `divide-y divide-border-default`도 동등.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| 모든 인터랙션 | **없음** — 정적 시각 요소. focus 불가, click 무반응. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.11** Non-text contrast (border-default × bg-page) | `border-default` 1.4:1 — 약함이나 spacing/타이포로 시각 식별 보강. 강조 분리 필요 시 `border-strong`(2.5:1+) 사용. |
| **WCAG 1.3.1** Info and Relationships | `decorative=false`일 때 `role="separator"` 부여 — screen reader가 의미 분리 인식. 시각 only 분리는 `decorative=true`(기본). |
| **ARIA** | Radix가 `role`(separator/none) + `aria-orientation`(horizontal/vertical) 자동 부여. |

## Do / Don't

### ✅ Do

- 시각 그룹 분리 — 카드 안 섹션, form section, list item 사이.
- inline 항목 사이 vertical separator — nav, toolbar 안 button group.
- `decorative=false` (의미 분리) — TOC, article section 분리처럼 screen reader가 인식해야 할 때.
- spacing은 사용처에서 결정 — separator는 width/height만 보장. `my-*`/`mx-*` className로 분리 강도 조절.

### ❌ Don't

- 모든 곳에 separator — 시각 noise. spacing(`gap-*`/`padding-*`)만으로 충분한 곳엔 생략.
- `2px+` 굵은 선 — 시각 위계 깨짐. 강조는 색이 아닌 spacing/typography로.
- separator 안에 마진 — 컴포넌트 의존성 위반. spacing은 사용처가 결정.
- vertical separator를 height 없는 부모에 — `h-full`이 0으로 collapse. 부모에 `h-5`/`h-6` 등 명시.
- list item 사이 separator + padding 동시 — 시각 중복. `divide-y` utility로 하나만 선택.

## Migration notes

- 기존 `separator.tsx`는 이미 토큰 정합 — `bg-border-default` + `h-px`/`w-px` Tailwind shortcut. 변경 없음.
- preview-html에 별도 `.sep-*` CSS 없음 — site preview/component page에서 컴포넌트 직접 렌더. preview-html 안에서는 카드/섹션 내부 `border-bottom: 1px solid var(--color-border-default)` 패턴이 같은 시각 효과(예: `.toolbar` `.acc-item` 등).
- shadcn 기본 `bg-border` → `bg-border-default` 정합 (Porest 토큰명).
