# Button

> 사용자가 액션을 trigger하도록 prompt하는 인터랙티브 컨트롤. 폼 제출, 다이얼로그 닫기, 페이지 이동 등 명시적 사용자 의도를 표현합니다.

Porest Button은 **6 variants × 4 sizes × 5 states** 매트릭스로 정의되며, Toss 톤(절제·신뢰감)을 따라 4px radius와 4px 그리드 위 치수를 사용합니다. 한국어 본문 가독성을 우선해 모든 사이즈가 16px 이상의 터치 타겟을 확보합니다.

## Anatomy

```
┌──────────────────────────────────────┐
│  ⓐ container                         │
│  ┌──────────────────────────────┐    │
│  │ ⓑ leading │ ⓒ label │ ⓓ trail │  │
│  │   icon    │  text   │   icon  │  │
│  └──────────────────────────────┘    │
│  ⓔ focus ring (focus-visible only)   │
└──────────────────────────────────────┘
```

| ⓐ container | 모양 + 배경 + 테두리. `radius-sm`(4px) 고정. |
| ⓑ leading icon | 좌측 아이콘. 16px (sm/md), 18px (lg). 선택적. |
| ⓒ label | 액션을 명사형 또는 동사형으로 표현. `whitespace: nowrap`. |
| ⓓ trailing icon | 우측 아이콘. 주로 chevron / external-link. 선택적. |
| ⓔ focus ring | `border-focus` 색 + 2px ring + 2px offset. keyboard focus 시만. |

**규칙**

- icon만 있을 땐 `size="icon"` (40×40 정사각). label 없으면 반드시 `aria-label` 또는 `Tooltip`.
- label은 1~3 단어 권장. "확인" / "저장" / "삭제하기" 같이 결과를 짐작할 수 있게.
- "확인" 같은 모호한 동사 단독 지양. 가능하면 "주문 확인" / "변경 저장" 등 목적어 포함.

## Variants

6개 variant가 시각 위계(visual hierarchy)와 의미(semantic)를 동시에 전달합니다. **한 화면에 같은 variant 여러 개를 두지 말 것** — 결정 피로를 유발합니다(특히 default).

| Variant | 의미 | 시각 강도 | 사용처 |
|---|---|---|---|
| `default` | 가장 강한 주 액션 (primary) | ●●●●● | 페이지/모달당 1개 권장. 폼 제출, 핵심 CTA. |
| `destructive` | 되돌릴 수 없는 위험 액션 | ●●●●● | 삭제 확정. 반드시 confirm dialog 안에서. |
| `outline` | 보조 액션 (secondary) | ●●●○○ | primary 옆 cancel. 두 번째 우선순위. |
| `secondary` | 동등 보조 액션 | ●●○○○ | toolbar 안 그룹 액션. 회색 채움. |
| `ghost` | 약한 액션 / nav 자리 | ●○○○○ | 메뉴 항목, icon 버튼, breadcrumb-like. |
| `link` | 인라인 텍스트 링크 | ●○○○○ | 본문 흐름 안의 약한 링크. |

### Color tokens

| Variant | bg (enabled) | text | border | shadow |
|---|---|---|---|---|
| `default` | `--color-primary` | `--color-text-on-accent` | — | `--shadow-sm` |
| `destructive` | `--color-error` | `--color-text-on-accent` | — | `--shadow-sm` |
| `outline` | transparent | `--color-text-primary` | `--color-border-default` (1px) | — |
| `secondary` | `--color-surface-input` | `--color-text-primary` | — | — |
| `ghost` | transparent | `--color-primary` | — | — |
| `link` | transparent | `--color-primary` | — | — |

브랜드 분기: HR `--color-primary` = `#357B5F`, Desk `--color-primary` = `#0147AD`. `default`/`link` variant만 영향, 나머지는 brand-neutral.

## Sizes

`box-sizing: border-box` 기준 외부 height = `h` 토큰 그대로(32 / 40 / 48). padding은 그 안에 inset됨. `line-height: 1` 고정.

| Size | Height | Padding (Y · X) | Font (token) | Font (px) | Icon | Radius | Touch (AA · AAA) |
|---|---|---|---|---|---|---|---|
| `sm` | 32px | `spacing-xs` (4) · `spacing-sm` (8) | `text-caption` | 12px | 14px | `radius-sm` (4) | AA ✓ · AAA ⚠ |
| `md` *(default)* | 40px | `spacing-sm` (8) · `spacing-md` (12) | `text-body-md` | 15px | 16px | `radius-sm` (4) | AA ✓ · AAA ⚠ |
| `lg` | 48px | `spacing-md` (12) · `spacing-lg` (16) | `text-title-sm` | 16px | 18px | `radius-md` (8) | AA ✓ · AAA ✓ |
| `icon` | 40×40px | 0 | — | — | 16px | `radius-sm` (4) | AA ✓ · AAA ⚠ |

Tailwind utility 매핑 (button.tsx cva):
- `sm`: `h-8 px-2 py-1 text-caption [&_svg]:size-3.5`
- `md`: `h-10 px-3 py-2 text-body-md [&_svg]:size-4`
- `lg`: `h-12 px-4 py-3 text-title-sm rounded-md [&_svg]:size-[18px]`
- `icon`: `h-10 w-10 [&_svg]:size-4`

공통(BASE):
- `font-sans` (`var(--font-sans)` Pretendard) — `<button>` UA stylesheet가 body font를 inherit 안 해서 명시 필수. preview `.btn`은 `font-family: inherit`로 같은 효과.
- `gap-[var(--spacing-sm)]` (icon-label 간격 8px — 토큰 직접 인용)
- `transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` (preview `.btn` SoT — hover/active 시 box-shadow만 부드럽게, brightness/scale은 즉시)
- `font-medium` (500 — DESIGN.md typography 가이드 "weight 강조는 별도 토큰 대신 인라인 modifier")

**규칙**

- `sm`은 dense list/toolbar 한정. 터치 우선 화면(모바일)에서는 `lg` 권장 (AAA 충족).
- `lg`는 hero CTA 또는 폼 제출 버튼 + 모바일 sticky CTA. 한 페이지에 1~2개 이내.
- `icon`은 정사각. 옆에 텍스트 버튼이 있을 때 시각 통일을 위해 `md`(h-10)와 같은 높이.
- gap (icon ↔ label) = 8px 고정 (`gap-sm`, 모든 사이즈).

## States

5개 visual state. Tailwind v4 utility는 `:hover`, `:focus-visible`, `:active`, `[disabled]` 가상 선택자로 자동 적용됩니다.

### State matrix (default variant 기준)

| State | Background | Brightness | Shadow | Transform | Ring | Cursor |
|---|---|---|---|---|---|---|
| `enabled` | `--color-primary` | 100% | `--shadow-sm` | none | none | `pointer` |
| `hovered` | `--color-primary` | 105% | **`--shadow-md`** | none | none | `pointer` |
| `focused` (visible) | `--color-primary` | 100% | `--shadow-sm` | none | 2px `--color-border-focus` + 2px offset (`ring-2 ring-ring ring-offset-2`). 다크 모드에서는 `--color-border-focus-light`로 자동 alias (어두운 표면에서 시인성 확보 — WCAG 1.4.11). | `pointer` |
| `pressed` (active) | `--color-primary` | 95% | **none** | **`scale(0.98)`** | none | `pointer` |
| `disabled` | `--color-primary` | 100% (opacity 0.5) | `--shadow-sm` | none | none | `not-allowed` |

### 다른 variant의 state 차이

| Variant | hover | pressed (active) |
|---|---|---|
| `destructive` | brightness 105 + `shadow-md` | brightness 95 + scale(0.98) + shadow none (default와 동일 패턴, base color만 `--color-error`) |
| `outline` | `bg-surface-input` + `border-strong` | `bg-border-default` + scale(0.98) (shadow 없음) |
| `secondary` | `bg-border-default` | brightness 95 + scale(0.98) |
| `ghost` | `bg-surface-input` | `bg-border-default` + scale(0.98) |
| `link` | `underline` | brightness 90 |

### Loading state (선택)

긴 비동기 작업이 일어나는 버튼은 별도 `loading` 표현이 필요합니다. shadcn 표준엔 없지만 권장 패턴:

- `disabled={true}` + leading icon을 spinner(`animation: spin var(--motion-duration-loop)`)로 교체
- `aria-busy="true"`
- label을 "저장 중…" 같이 진행형으로 교체 (또는 그대로 유지 + spinner만 추가)

## Layout

**Single button**

- `min-width`: 명시적 제한 없음 (label width 따라감). 다만 dialog footer 등에서 `min-w-20` (80px) 권장.
- `width: 100%` (full-width): 모바일 sticky CTA, 폼 마지막 제출 버튼에 사용. `className="w-full"`.

**Button group (인접한 두 개 이상)**

- 가로 `gap-2` (8px) 권장. dialog footer는 `gap-2` 고정.
- 정렬:
  - 폼 제출/취소 → 우측 정렬 (`justify-end`). 취소가 좌, 제출이 우.
  - 삭제/취소 → 우측 정렬. 삭제가 우(반대 의견 있음 — Material은 좌측 destructive). Porest는 **destructive를 우측에 두고 destructive 색으로 명확히 구분**.
- 4개 이상의 버튼을 한 줄에 두지 말 것. 결정 피로 → DropdownMenu로 분리.

**Vertical stack (모바일)**

- 폭 좁은 화면에서 `flex-col gap-2` + 각 버튼 `w-full`.
- 순서: primary 위, secondary 아래.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click / Tap | `onClick` 발화. `disabled` 시 무시. |
| Keyboard `Enter` | 클릭 동등. focus 상태에서. |
| Keyboard `Space` | 클릭 동등. focus 상태에서. |
| Keyboard `Tab` | 다음 focusable로 이동. shift+Tab은 역방향. |
| `asChild` prop | `<Slot>`으로 underlying element 교체 (예: `<a>`로 link로 동작). aria/role 자동 보존. |
| Disabled | `pointer-events: none`. 클릭/keyboard 불가. focusable에서 제외. |

**Form 안 동작**

- `type="submit"` 없으면 form 안에서도 form 제출 안 함 (shadcn 표준 — 명시적). 명시 필요.
- `type="button"`은 form 제출 명시 비활성.

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text ≥ 4.5:1) | `default` `--color-text-on-accent` × `--color-primary` = 4.5:1+ ✓ (`npm run lint:dark` 검증) |
| **WCAG 1.4.11** Non-text contrast (UI ≥ 3:1) | focus ring `--color-border-focus` × `--color-bg-page` = 3:1+ ✓ |
| **WCAG 2.5.8** Target Size — Minimum (AA — ≥ 24×24) | `sm` 32 ✅ / `md` 40 ✅ / `lg` 48 ✅ / `icon` 40 ✅ — 모든 사이즈 AA 통과 |
| **WCAG 2.5.5** Target Size — Enhanced (AAA — ≥ 44×44) | `sm` 32 ⚠ 미달 / `md` 40 ⚠ 미달 / `lg` 48 ✅ / `icon` 40 ⚠ 미달 — `lg`만 AAA 충족. 모바일 터치 우선 화면은 `lg` 권장, `md`는 데스크톱/태블릿 큐이, `sm`은 dense list 한정. |
| **WCAG 2.4.7** Focus visible | `focus-visible:ring-2 ring-ring/30` (keyboard focus 시만 표시, 마우스 click 시 안 뜸) |
| **ARIA** | `<button>` element 자동. `asChild`로 `<a>` 사용 시 `role="button"` 명시적으로 추가하지 말 것 (이중 role 충돌). `aria-label` icon-only일 때 필수. |
| **Reduced motion** | hover transition은 `motion-duration-fast` (150ms). `prefers-reduced-motion: reduce` 시 globally 0.01ms로 단축 (DESIGN.md `keyframes` 가이드). |

## Do / Don't

### ✅ Do

- 페이지/모달당 `default` 1개. 보조는 `outline`.
- destructive는 항상 confirm dialog 안에서. label은 "삭제" / "탈퇴" 같이 결과 명시.
- icon-only는 `size="icon"` + 반드시 `aria-label` 또는 인접 `Tooltip`.
- 모바일에서 sticky bottom CTA는 `lg` + `w-full` + 안전 영역 (`pb-safe`).
- 한국어 label은 동사 + 목적어 ("저장", "주문 취소"). 영어 단독 ("Submit", "Cancel") 가능하면 회피.

### ❌ Don't

- 한 화면에 `default`(primary) 여러 개 — 위계 무너짐. 1개만.
- 4개 이상의 버튼을 한 줄에 — DropdownMenu로 분리.
- `ghost`를 primary 액션으로 — affordance 부족.
- `sm` size를 모바일 터치 타겟으로 — AA 미달.
- destructive를 좌측에 두고 cancel을 우측에 — 사용자가 destructive를 잘못 누를 위험.
- `disabled` 버튼에 hover/click 가짜 피드백 — 혼란 유발. 정말 disable일 땐 그대로 표시.

## Migration notes

- 옛 prose-token `button-primary` / `button-outline-on-dark` (DESIGN.md v55, v93에서 `outlined` → `outline` 명명 통일)은 이 spec의 `default` / `outline` variant로 1:1 매핑.
- 옛 height (`h-9` / `h-11`)는 v83 Toss 매핑에서 `h-8` / `h-12`로 정정 (4px 그리드 정합).
