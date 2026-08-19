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

| ⓐ container | preview `.drw-bottom` 그대로 — `background:var(--color-surface-default); border-radius:var(--radius-xl) var(--radius-xl) 0 0; box-shadow:var(--shadow-xl); display:flex; flex-direction:column; gap:var(--spacing-md);` **border 없음** — shadow만으로 elevation. **좌우 여백은 20px** — header·body·footer 가 같은 값을 쓴다(아래 참조). |
| ⓑ handle | preview `.drw-handle` 그대로 — `width:40px; height:4px; background:var(--color-surface-input); border-radius:var(--radius-full); margin:-4px auto var(--spacing-sm);` bottom drawer에만. side drawer는 생략. |
| ⓒ header | preview `.drw-header` — `display:flex; justify-content:space-between; align-items:center;` title 좌, close 우. |
| ⓓ close | preview `.drw-close` — 28×28 ghost icon button. `aria-label="닫기"`. focus-visible 시 ring. |
| ⓔ body | 자유 영역. 정보 표시는 `.drw-row`(key-val + border-bottom separator) 패턴, form은 `gap-md` flex column. |
| ⓕ footer | preview `.drw-actions` 그대로 — `display:flex; gap:var(--spacing-sm); padding-top:var(--spacing-sm); border-top:1px solid var(--color-border-default);` 모든 자식 button은 `flex:1`로 가로 균등 분배. |

**규칙**

- title 없는 drawer는 `aria-label` 필수 (스크린리더 대응).
- handle은 bottom drawer에만 — side drawer에선 시각적으로 의미 없음(생략).
- footer의 button은 항상 `flex:1` — 모바일에서 한 손 조작 가능한 너비 확보. 모바일에선 `size="lg"`(48).
- footer 의 **취소는 `secondary`**(테두리 없는 회색 채움), **삭제는 `dangerSoft`**(옅은 빨강 채움).
  전체 폭 버튼 둘이 나란히 설 때 `ghost` 는 배경이 없어 한쪽이 빈자리처럼 보인다 —
  주 액션은 `default`(info 채움), 보조는 옅게 채워 무게 차이만 준다.
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
| z-index (overlay) | `z-[100]` | `z-[100]` | [`z-index.md`](../z-index.md) L2 modal overlay |
| z-index (content) | `z-[101]` | `z-[101]` | [`z-index.md`](../z-index.md) L2 modal content |

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
- footer는 `border-top` separator + flex:1 평등 분배 buttons. 액션은 **최대 2개** — [액션 구성](#액션-구성) 참조.
- 위로 스크롤 가능한 콘텐츠가 있으면 max-height 제한 (예: `90vh`) — handle 노출 보장.

**Side drawer (데스크탑 보조)**

- 화면 우측에 고정. handle 없음. 세부 정보 패널/필터/상세 보기 등에 사용.
- footer는 생략 가능 — 닫기는 우상단 close button 또는 overlay click으로.

**Action sheet (옵션 리스트)**

- 메뉴 형태의 ghost button list (예: "편집 / 복사 / 삭제"). buttons는 `justify-start`(좌측 정렬) + ghost variant.
- 위험 액션(삭제)은 마지막 + `text-error`.

## 좌우 여백

**header · body · footer 가 모두 좌우 20px.** 한 곳만 달라도 제목·내용·버튼의 세로선이
어긋나 시트가 좁아 보인다.

| 영역 | 좌 | 우 | 세로 |
|---|---|---|---|
| header(제목 + 닫기) | 20 | **8** | `pt-2 pb-4` |
| body | 20 | 20 | — (스크롤) |
| footer | 20 | 20 | `py-3` |

header 우측만 8인 것은 닫기 아이콘 버튼이 자체 padding 을 갖기 때문 — 아이콘의 광학
중심은 20 선에 선다. 버튼을 빼고 텍스트만 두면 20 이다.

> 웹은 `px-5`, 앱은 `PSpace.x20` — 같은 20px 이다. spacing 토큰에는 20 이 없어 두
> 플랫폼 모두 스케일 밖의 값을 직접 쓴다.

## 액션 구성

footer 액션은 **최대 2개**. 셋이 나란히 서면 무엇이 주 액션인지 읽는 데 시간이 걸리고,
모바일 균등 분배에서는 버튼 하나하나가 좁아져 오탭이 는다.

**우상단 X(그리고 bottom drawer 의 드래그 내리기)가 이미 "닫기·취소"다.** footer 에 같은 뜻의
버튼을 또 두면 같은 동작에 두 개의 입구가 생긴다 — 그래서 3개가 되면 이 순서로 뺀다.

1. **`확인` · `닫기`** — X 와 완전히 겹친다. 언제나 먼저 뺀다.
2. **`취소`** — X 와 겹치지만 폼에서는 "되돌리고 나간다"는 뜻이 강해, 남는 액션이 2개 이하면 유지한다.
3. **`삭제`** — 아래 규칙을 따른다.

### 삭제는 상세에만

| 화면 | 액션 |
|---|---|
| 상세(읽기 전용) | `삭제` · `편집` |
| 편집 폼 | `취소` · `저장` |

편집하러 들어온 화면에 삭제를 또 두지 않는다. 삭제는 상세에서 이미 할 수 있고, 폼 안의 삭제는
"수정하려다 지운다"는 오조작 경로가 된다.

**예외 — 상세 화면이 없는 흐름**은 폼이 곧 상세다. 삭제를 빼면 지울 방법이 사라지므로
`삭제` · `저장` 으로 두고 `취소` 를 X 에 맡긴다(캘린더 관리 시트가 이 경우).

### 세 번째 버튼이 삭제가 아닐 때

`초기화`(필터) · `금액 가리기`(자산 상세) 같은 비파괴 보조 액션도 같은 규칙을 받는다 —
그 액션과 주 액션을 남기고 `취소`/`확인` 을 뺀다.

| 화면 | 액션 |
|---|---|
| 필터 | `초기화` · `적용` |
| 자산 상세 | `금액 가리기` · `편집` |
| 내역 분할 | `분할 해제` · `저장` |

액션이 2개면 **둘 다 균등 분배**한다 — 좌측이 옅은 채움이라 무게 차이는 색으로 충분하다.
3개가 남는 데스크탑 배치에서만 `삭제`·파괴적 보조를 최좌측에 붙인다(`ghost` + `flush="left"`).

> [`AlertDialog`](alert-dialog.md) 는 예외 — X 가 없으므로 `취소` 를 반드시 남긴다.

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
- 액션은 2개까지 — 상세는 `삭제`·`편집`, 편집 폼은 `취소`·`저장`.
- action sheet item은 ghost + 좌측 정렬 — 메뉴 톤. 위험 액션은 마지막 + `text-error`.

### ❌ Don't

- drawer 안 form input이 너무 많을 때 키보드가 콘텐츠를 가림 — 긴 form은 별도 페이지 또는 dialog로.
- bottom drawer에 handle 생략 — 드래그 가능 affordance 사라짐.
- footer button 3개+ — 결정 피로 + 모바일 오탭. 액션 구성 절의 순서대로 줄인다.
- footer 에 `확인`·`닫기` — 우상단 X 와 같은 동작이 두 곳에 생긴다.
- 편집 폼에 `삭제` — 수정하러 들어온 화면의 오조작 경로. 삭제는 상세에 둔다.
- side drawer에 handle 추가 — 시각적 의미 없음.

## Migration notes

- 기존 shadcn `drawer.tsx`는 `bg-background` + `mt-24` + border 표준 — preview `.drw-bottom` SoT(`surface-default` + shadow-xl + border 없음 + `padding-lg` 토큰)로 정정.
- handle bar는 vaul 기본 패턴이나 shadcn은 `bg-muted` 사용 — preview SoT(`surface-input` + 40×4 + `radius-full` + `margin:-4px auto spacing-sm`)로 정정.
- footer는 shadcn 기본 `mt-auto flex` — preview `.drw-actions` SoT(`gap-sm` + `padding-top sm` + `border-top` + `[&>*]:flex-1`)로 정정.
- `padding:24px gap:8px` 같은 px 하드코드 → spacing 토큰 직접 인용.
- **2026-08 좌우 여백을 20 으로 통일** — spec 은 `padding-lg`(16) 였는데 웹 구현은 이미 `px-5`(20)
  였고, 앱은 header·body 16 / footer 20 으로 섞여 있었다. 셋이 다르면 세로선이 어긋나 시트가
  좁아 보인다. 실제로 쓰이던 20 을 기준으로 맞췄다(앱 시트 27곳 정정).
- **box-shadow는 Tailwind utility(`shadow-xl`) 대신 inline `style={{ boxShadow: "var(--shadow-xl)" }}` 사용** — Tailwind v4 `--tw-shadow-*` 분해 처리가 다크 모드 CSS 변수 override를 우회하는 문제 fix. preview `.drw-bottom` SoT와 다크 모드 정합 보장. 상세는 [`dialog.md`](dialog.md) Migration notes 참조.
