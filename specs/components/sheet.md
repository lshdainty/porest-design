# Sheet

> 화면 가장자리(top/bottom/left/right)에서 슬라이드되는 modal-style 패널. modal `Dialog`(중앙 정렬)과 달리 **가장자리 부착** + **부분 화면 차지**(60% 또는 max-w-sm 패널)로 본문 컨텍스트를 유지하면서 보조 UI를 표시. Radix `Dialog` 베이스 + side variant + `Tailwind animate-in/out`.

Porest Sheet는 **4 sides(top/right/bottom/left) × 단일 시각 톤** 매트릭스로 정의됩니다. [`Dialog`](dialog.md)/[`Drawer`](drawer.md)와 같은 floating 카드 톤 — `surface-default` + `shadow-xl` + `padding-2xl` + `gap-md` + 슬라이드 방향 반대 모서리의 border. [`Drawer`](drawer.md)(bottom-only + drag-to-close + handle)와 달리 **모든 4 방향** 지원 + drag 동작 없음 — 데스크탑 친화. close button(X)은 우상단 고정.

## Anatomy

```
right side example:
┌──────────────────────────┬──────────────────────────┐
│                          │ ⓖ close (우상단)      ✕  │
│       ⓑ overlay          │                          │
│       (dim 50%)          │ ⓒ header                 │
│                          │ ⓓ title (title-md 600)   │
│       (page content      │ ⓔ description (body-sm)  │
│        뒤로 fade)         │                          │
│                          │ ⓕ {body}                 │
│                          │                          │
│                          │ ⓗ footer (선택)           │
└──────────────────────────┴──────────────────────────┘
                            ▲
                            ⓐ container (w-3/4 sm:max-w-sm + shadow-xl)
```

| ⓐ container | `fixed z-50 gap-[var(--spacing-md)] bg-surface-default p-[var(--spacing-2xl)] transition ease-in-out` + side별 `inset-*` + slide-in 애니메이션. **box-shadow는 inline `style={{ boxShadow: "var(--shadow-xl)" }}`** (다크 모드 토큰 우회 fix). |
| ⓑ overlay | `fixed inset-0 z-50 bg-[var(--overlay-dim-light)]` + `animate-in/out fade-in-0/fade-out-0`. |
| ⓒ header | `flex flex-col gap-[var(--spacing-xs)] text-center sm:text-left`. title + description 묶음. |
| ⓓ title | `text-title-md font-semibold text-text-primary` (18/600). |
| ⓔ description (선택) | `text-body-sm text-text-secondary` (14/400). |
| ⓕ body | 사용처가 결정 — form/list/filter UI 등. |
| ⓖ close | 우상단 28×28 ghost button — `absolute right-[var(--spacing-md)] top-[var(--spacing-md)] rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`. `<X className="h-4 w-4" />` + `<span className="sr-only">닫기</span>`. |
| ⓗ footer (선택) | `flex flex-col-reverse gap-[var(--spacing-sm)] sm:flex-row sm:justify-end` — 모바일 vertical / 데스크탑 horizontal. |

**규칙**

- 슬라이드 방향의 **반대편 모서리에만 1px border** — right sheet은 `border-l border-border-default`, bottom sheet은 `border-t border-border-default`. 본문과 자연 경계.
- shadow는 **inline style**(`boxShadow: var(--shadow-xl)`) — Tailwind utility(`shadow-lg`) 대신 [`Dialog`](dialog.md)/[`Drawer`](drawer.md)/[`Popover`](popover.md)/[`Card`](card.md)/[`Sonner`](sonner.md)와 동일한 다크 모드 fix 패턴.
- side variant 폭은 `w-3/4` + `sm:max-w-sm` (≤384px) — 모바일에선 75%, 데스크탑에선 384px 고정. 데이터·필터 패널엔 충분.
- top/bottom sheet은 `inset-x-0` + 높이 자동(콘텐츠) — 모바일 친화 액션 시트 톤.
- close button(X)은 항상 우상단 — 사용자가 즉시 인식. focus-visible ring 필수.
- portal 렌더링(`SheetPortal`) — body 최상위에 mount, z-index 위계 분리.

## Variants (side)

| Variant | 위치 | 폭/높이 | Border 방향 | 사용처 |
|---|---|---|---|---|
| `right` *(default)* | 우측 가장자리 | `w-3/4 sm:max-w-sm` (모바일 75% / 데스크탑 ≤384) | `border-l border-border-default` | 필터, 상세 보기, 우측 nav. 가장 흔한 패턴. |
| `left` | 좌측 가장자리 | `w-3/4 sm:max-w-sm` | `border-r border-border-default` | 모바일 nav, 햄버거 메뉴 패턴. |
| `top` | 상단 가장자리 | `inset-x-0` (전체 폭), 높이 콘텐츠 | `border-b border-border-default` | system-wide 알림, 검색 expand. drop-down 메가 메뉴 대안. |
| `bottom` | 하단 가장자리 | `inset-x-0`, 높이 콘텐츠 | `border-t border-border-default` | 모바일 액션 시트, 공유/저장 옵션. [`Drawer`](drawer.md)와 시각 비슷하나 drag 없음. |

## Sizes

Sheet은 **size variant 없음** — 단일 spec. 사용처 className으로 폭(`sm:max-w-md`/`sm:max-w-lg` 등) 조정.

| 항목 | 값 | 토큰 |
|---|---|---|
| Padding | 24px | `p-[var(--spacing-2xl)]` |
| Gap (header/body/footer 사이) | 12px | `gap-[var(--spacing-md)]` |
| Gap (title ↔ description) | 4px | `gap-[var(--spacing-xs)]` |
| Gap (footer button 사이) | 8px | `gap-[var(--spacing-sm)]` |
| Title font | 18 / 600 | `text-title-md font-semibold` |
| Description font | 14 / 400 / 1.5 | `text-body-sm` |
| Border (방향별) | 1px | `border-{l/r/t/b} border-border-default` |
| Background | `surface-default` | `bg-surface-default` |
| Shadow | shadow-xl | inline `var(--shadow-xl)` |
| Width (right/left, mobile) | 75% | `w-3/4` |
| Width (right/left, desktop) | ≤384px | `sm:max-w-sm` |
| Height (top/bottom) | content auto | (자동) |
| Close button | 28×28 (icon 16×16) | (literal) + `h-4 w-4` |
| z-index | 50 | (literal) |
| Animation duration (open) | 500ms | `data-[state=open]:duration-500` |
| Animation duration (close) | 300ms | `data-[state=closed]:duration-300` |

## States

| State | Background | Animation | 시각 |
|---|---|---|---|
| `closed` (default) | unmounted | — | — |
| `open` | mounted | `slide-in-from-{side}` + `fade-in-0` (overlay) | full Sheet 표시 |
| `closing` (in transition) | unmounting | `slide-out-to-{side}` + `fade-out-0` | 슬라이드 + dim fade out |

motion: `transition ease-in-out` + Radix `data-state` driven.

## Layout

**Filter sheet (right)**

- 메인 콘텐츠 옆에 — 필터 옵션 list + apply/clear footer.
- Trigger: 메인 영역 상단 우측 "필터 열기" outline 버튼.

**Mobile nav (left)**

- 모바일 햄버거 — 좌측 슬라이드 nav. SheetHeader 안 logo + title, body는 nav list, footer 생략.

**Action sheet (bottom)**

- 모바일 공유/저장 등 — 하단 슬라이드. button stack vertical. [`Drawer`](drawer.md)가 drag 친화면 그쪽 권장.

**Top expand**

- 검색 expand, 시스템 알림 — 상단에서 슬라이드. content 짧을 때만 (긴 콘텐츠는 모바일에선 어색).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Trigger click | Sheet open. Radix Portal로 body에 mount. `data-state="open"`. |
| Overlay click | close. focus는 Trigger로 복귀. |
| `Escape` | close. WCAG 2.1.2 No Keyboard Trap. |
| Close button(X) click | close. |
| `Tab` (Sheet 안) | focus trap — Sheet 내부 focusable element만 순환. body는 inert. |
| Slide animation | open 500ms / close 300ms — `slide-in-from-{side}` + overlay `fade-in-0`. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (title × bg-default) | `text-primary` 14:1+ ✓ |
| **WCAG 1.4.3** Color contrast (description × bg-default) | `text-secondary` 9.2:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (border × bg-page) | `border-default` 1.4:1 — `shadow-xl` elevation이 시각 식별 보강 ✓ |
| **WCAG 2.1.1** Keyboard | `Tab`/`Escape`/`Enter` 모두 가능 ✓ |
| **WCAG 2.1.2** No Keyboard Trap | `Escape`로 dismiss + focus 복귀 ✓ |
| **WCAG 2.4.3** Focus Order | open 시 첫 focusable element로 자동 이동 (Radix). |
| **WCAG 2.4.7** Focus Visible | close button `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | close 28×28 — 미달(⚠). 모바일 우선 화면이면 close `h-11 w-11`로 확장 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | close 28 ✓ |
| **ARIA** | Radix가 `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (title) + `aria-describedby` (description) 자동. close button은 `<span className="sr-only">닫기</span>` 보조. |

## Sheet vs Dialog vs Drawer 사용 가이드

| 항목 | Sheet (이 spec) | [`Dialog`](dialog.md) | [`Drawer`](drawer.md) |
|---|---|---|---|
| 위치 | 화면 가장자리 (4 sides) | 화면 중앙 | 화면 하단 또는 side |
| 폭 | side: w-3/4 sm:max-w-sm / top·bottom: full | 480 (md) / 384 (sm) | bottom: full / side: w-3/4 |
| 시각 elevation | shadow-xl + 1px border (반대 모서리만) | shadow-xl + radius-xl | shadow-xl + radius-xl (반대 모서리만) + handle bar (bottom) |
| 인터랙션 | click + Escape (drag 없음) | click + Escape | drag-to-close + swipe + Escape |
| 사용처 | 데스크탑 필터/상세 패널 / 모바일 nav · action sheet | 데스크탑 form/확인 | 모바일 친화 시트 (drag 자연) |
| Animation | slide-in-from-{side} 500/300ms | zoom-in-95 + fade-in 200/180ms | translate-y-full → 0 |

**선택 기준**: 데스크탑 필터/상세 → Sheet right. 모바일 nav → Sheet left. 모바일 action + drag → [`Drawer`](drawer.md). 중앙 form/확인 → [`Dialog`](dialog.md).

## Do / Don't

### ✅ Do

- 데스크탑 필터/상세 패널 — right side가 가장 자연.
- 모바일 햄버거 nav — left side. 메인 콘텐츠 옆 슬라이드.
- 시스템 알림 / 검색 expand — top side, 짧은 콘텐츠만.
- 모바일 action sheet — bottom side. drag 친화면 [`Drawer`](drawer.md) 권장.
- close button(X) 우상단 — 사용자 즉시 인식.

### ❌ Don't

- 중앙 form/확인 — [`Dialog`](dialog.md) 사용. Sheet은 가장자리.
- drag-to-close 필요 — [`Drawer`](drawer.md). Sheet은 drag 없음.
- 긴 본문 + top side — 모바일에선 어색. top은 짧은 알림용.
- 한 페이지 여러 Sheet 동시 — modal stack은 사용자 혼란. 한 번에 1개 modal.
- Sheet 안에서 다른 Sheet trigger — modal 위 modal. [`Drawer`](drawer.md) 안 select/popover는 OK.

## Migration notes

- 기존 `sheet.tsx`는 `bg-background` + `p-6` + `shadow-lg` + close `focus:ring` — Porest 토큰 정합으로 정정 필요:
  - `bg-background` → `bg-surface-default` (이미 정합)
  - `p-6` → `p-[var(--spacing-2xl)]` (24, [`Dialog`](dialog.md)과 통일)
  - `gap-4` (header) → `gap-[var(--spacing-xs)]` (title↔description)
  - title `text-lg` → `text-title-md font-semibold` (이미 정합)
  - description `text-sm text-muted-foreground` → `text-body-sm text-text-secondary` (이미 정합)
  - close `focus:ring-2 focus:ring-ring focus:ring-offset-2` → `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` (키보드 only)
  - close `top-4 right-4` → `top-[var(--spacing-md)] right-[var(--spacing-md)]` (12 토큰)
- **box-shadow는 Tailwind utility(`shadow-lg`) 대신 inline `style={{ boxShadow: "var(--shadow-xl)" }}`** — Tailwind v4 `--tw-shadow-*` 분해 처리가 다크 모드 CSS 변수 override를 우회하는 문제 fix. [`Dialog`](dialog.md)/[`AlertDialog`](alert-dialog.md)/[`Drawer`](drawer.md)와 동일 패턴. shadow level도 `shadow-lg`(보조) → `shadow-xl`(modal-level) 정합.
- shadcn 기본 `border-b/-t/-l/-r` 그대로 — 슬라이드 방향 반대 모서리 1px solid border.
- preview-html에 별도 `.sht-*` CSS 없음 — site preview/component page에서 직접 렌더. preview-html `.drw-*`(Drawer)는 별도 스펙(handle bar + drag-to-close).
- overlay token은 `bg-[var(--overlay-dim-light)]` — 다크 모드에서도 동일 토큰 자동 swap (`--overlay-dim-light-dark` 정의).
