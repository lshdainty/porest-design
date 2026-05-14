# Drawer

> 화면 가장자리에서 슬라이드 인하는 floating 패널. 콘텐츠 편집/거래 입력/공유 옵션처럼 일시 차단이 필요한 흐름을 모달보다 자연스럽게 처리. 모바일에선 bottom sheet 형태가 표준 (`vaul` 라이브러리 베이스).

Porest Drawer는 **2 sides(bottom/side) × 1 정렬 톤** 매트릭스로 정의됩니다. preview `.drw-bottom` / `.drw-side` SoT 정합 — `surface-default` + `shadow-xl` + `radius-xl` 모서리 라운드(slide 방향 반대 모서리만) + **border 없음** + handle bar(40×4, bottom only) + `padding-lg` + `gap-md`. drag-to-close + swipe + Escape 모두 지원.

## Anatomy

```
Bottom sheet (모바일 표준)

┌────────────────────────────────────────────────┐
│              ─── ⓑ handle ───                  │   ← 40×4, surface-input
│                                                │
│ ⓒ header     공유하기              ⓓ close  ×  │
│                                                │
│ ⓔ body (옵션 — key-val rows / form / list)     │
│                                                │
│ ⓕ footer     [   취소   ] [   완료   ]          │   ← flex:1 평등 분배
└────────────────────────────────────────────────┘
            ⓐ container (surface-default + shadow-xl + radius-xl top)
```

| ⓐ container | preview `.drw-bottom` 그대로 — `background:var(--color-surface-default); border-radius:var(--radius-xl) var(--radius-xl) 0 0; box-shadow:var(--shadow-xl); padding:var(--spacing-lg); display:flex; flex-direction:column; gap:var(--spacing-md);` **border 없음** — shadow만으로 elevation. |
| ⓑ handle | preview `.drw-handle` 그대로 — `width:40px; height:4px; background:var(--color-surface-input); border-radius:var(--radius-full); margin:-4px auto var(--spacing-sm);` bottom drawer에만. side drawer는 생략. |
| ⓒ header | preview `.drw-header` — `display:flex; justify-content:space-between; align-items:center;` title 좌, close 우. |
| ⓓ close | preview `.drw-close` — 28×28 ghost icon button. `aria-label="닫기"`. focus-visible 시 ring. |
| ⓔ body | 자유 영역. 정보 표시는 `.drw-row`(key-val + border-bottom separator) 패턴, form은 `gap-md` flex column. |
| ⓕ footer | preview `.drw-actions` 그대로 — `display:flex; gap:var(--spacing-sm); padding-top:var(--spacing-sm); border-top:1px solid var(--color-border-default);` 모든 자식 button은 `flex:1`로 가로 균등 분배. |

**규칙**

- title 없는 drawer는 `aria-label` 필수 (스크린리더 대응).
- handle은 bottom drawer에만 — side drawer에선 시각적으로 의미 없음(생략).
- footer의 button은 항상 `flex:1` — 모바일에서 한 손 조작 가능한 너비 확보.
- bottom drawer는 `radius-xl` top corners만, side drawer(right)는 `radius-xl` left corners만 — slide 방향의 반대편 둥글기.

## Variants (side)

| Side | Radius | Width 정책 | 사용처 |
|---|---|---|---|
| `bottom` *(default)* | `radius-xl radius-xl 0 0` (top 양쪽) | `width:100%` (full width) | 모바일 표준 — 거래 입력, 공유, action sheet. handle bar 노출. |
| `right` | `radius-xl 0 0 radius-xl` (left 양쪽) | `width:280–360` | 데스크탑 보조 패널 — 필터, 세부 정보 보기. handle 생략. |

`left` / `top` 사이드는 Porest spec 아님 — 일반적인 사용 사례가 없고 모바일/데스크탑 손목 접근성에 불리.

## Sizes

`box-sizing: border-box` 기준. bottom은 full-width, side는 고정 폭.

| 항목 | bottom | side (right) | 토큰 |
|---|---|---|---|
| Width | 100% | 280–360px | (literal) |
| Height | auto (content) | 100% (stretch) | (literal) |
| Padding | 16px | 16px | `var(--spacing-lg)` |
| Gap (자식 간) | 12px | 12px | `var(--spacing-md)` |
| Radius | xl (20) top corners | xl (20) left corners | `var(--radius-xl)` |
| Handle margin | `-4px auto var(--spacing-sm)` | — | `var(--spacing-sm)` |
| Shadow | xl | xl | `var(--shadow-xl)` |
| Border | none | none | (없음) |

## States

| State | 동작 | 시각 |
|---|---|---|
| `enter` | bottom: 아래에서 위로 / side: 우측에서 좌측으로 슬라이드 | `motion-duration-base` (250ms) · `motion-ease-out` |
| `open` | 표시 상태, overlay dim 적용 | spec 그대로, overlay: `--overlay-dim-light` rgba(0,0,0,0.50) |
| `dragging` (bottom) | 사용자가 handle 또는 body 영역을 잡고 드래그 중 | transform: translateY(drag offset) |
| `exit` | drag 거리 30%+ 또는 swipe / close click / overlay click / Escape 시 | `motion-duration-base` · `motion-ease-in` |

`vaul` 라이브러리가 drag-to-close + spring animation 자동 처리. `shouldScaleBackground={true}` 옵션으로 배경 페이지 약간 축소(iOS 표준 톤).

## Layout

**Bottom drawer (모바일 표준)**

- 화면 하단에 고정. body 영역은 자유 콘텐츠 — key-val rows / form / list 모두 가능.
- footer는 `border-top` separator + flex:1 평등 분배 buttons. action 수 1–2개 권장.
- 위로 스크롤 가능한 콘텐츠가 있으면 max-height 제한 (예: `90vh`) — handle 노출 보장.

**Side drawer (데스크탑 보조)**

- 화면 우측에 고정. handle 없음. 세부 정보 패널/필터/상세 보기 등에 사용.
- footer는 생략 가능 — 닫기는 우상단 close button 또는 overlay click으로.

**Action sheet (옵션 리스트)**

- 메뉴 형태의 ghost button list (예: "편집 / 복사 / 삭제"). buttons는 `justify-start`(좌측 정렬) + ghost variant.
- 위험 액션(삭제)은 마지막 + `text-error`.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Open | DrawerTrigger 클릭 / 외부 setOpen(true). enter animation. |
| Overlay click | dismiss. modal 패턴 동일. |
| Close button click | dismiss. |
| `Escape` | dismiss, focus는 trigger로 복귀. |
| Drag handle (bottom) | 아래 방향 drag → dismiss. 거리 30%+ 시 자동 close. |
| Swipe down (bottom, touch) | swipe 속도 임계값 초과 시 dismiss. |
| Tab | drawer 내부 focusable elements 사이 순환 — outside는 inert. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (title × surface-default) | `text-primary` × `surface-default` = 21:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (overlay × bg-page) | overlay rgba(0,0,0,0.50) 충분한 dim 대비 ✓ |
| **WCAG 2.4.3** Focus Order | drawer open 시 focus가 내부로 trap — Radix `DialogPrimitive` 패턴(vaul도 동일). dismiss 시 trigger로 복귀. |
| **WCAG 2.4.7** Focus Visible | close button / footer buttons 모두 `focus-visible:ring-2 ring-ring ring-offset-2`. |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | close 28×28 — 미달(⚠). action sheet item 40px — 미달(⚠). 모바일 우선 화면이면 close 44+로 늘릴 것 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | close 28 / item 40 모두 ✓ |
| **ARIA** | vaul이 `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (title 자동 wire) + `aria-describedby` (description 자동 wire) 부여. title 없을 땐 `aria-label` 직접 전달. |

## Do / Don't

### ✅ Do

- bottom drawer는 **모바일 인터랙션 표준** — 일시 차단이 필요한 모든 모달 류는 bottom drawer 우선 고려.
- handle bar 노출 — 시각적 affordance(잡고 드래그 가능 hint).
- footer button은 `flex:1` 균등 분배 — 한 손 조작 가능 폭.
- action sheet item은 ghost + 좌측 정렬 — 메뉴 톤. 위험 액션은 마지막 + `text-error`.

### ❌ Don't

- drawer 안 form input이 너무 많을 때 키보드가 콘텐츠를 가림 — 긴 form은 별도 페이지 또는 dialog로.
- bottom drawer에 handle 생략 — 드래그 가능 affordance 사라짐.
- footer button 3개+ 평등 분배 — 결정 피로. 보조 액션은 ghost + outline로 위계 분리.
- side drawer에 handle 추가 — 시각적 의미 없음.

## Migration notes

- 기존 shadcn `drawer.tsx`는 `bg-background` + `mt-24` + border 표준 — preview `.drw-bottom` SoT(`surface-default` + shadow-xl + border 없음 + `padding-lg` 토큰)로 정정.
- handle bar는 vaul 기본 패턴이나 shadcn은 `bg-muted` 사용 — preview SoT(`surface-input` + 40×4 + `radius-full` + `margin:-4px auto spacing-sm`)로 정정.
- footer는 shadcn 기본 `mt-auto flex` — preview `.drw-actions` SoT(`gap-sm` + `padding-top sm` + `border-top` + `[&>*]:flex-1`)로 정정.
- `padding:24px gap:8px` 같은 px 하드코드 → spacing 토큰 직접 인용.
- **box-shadow는 Tailwind utility(`shadow-xl`) 대신 inline `style={{ boxShadow: "var(--shadow-xl)" }}` 사용** — Tailwind v4 `--tw-shadow-*` 분해 처리가 다크 모드 CSS 변수 override를 우회하는 문제 fix. preview `.drw-bottom` SoT와 다크 모드 정합 보장. 상세는 [`dialog.md`](dialog.md) Migration notes 참조.
