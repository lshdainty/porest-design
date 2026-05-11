# Sonner (Toast)

> 사용자 액션 결과나 시스템 이벤트를 화면 흐름을 끊지 않고 일시적으로 알리는 floating 알림. `sonner` 라이브러리 기반(shadcn 권장)이며 화면 모서리에서 슬라이드 인 → 자동 dismiss → swipe로 직접 닫기 가능한 패턴.

Porest Sonner는 **단일 spec × 5 kinds(default/success/error/warning/info)** 매트릭스로 정의됩니다. site preview SoT 톤을 픽스 — `surface-default` + `border-default`(1px) + `radius-md` + `shadow-lg` + 좌측 semantic 컬러 아이콘(20px) + 우측 action button(SM primary). border + shadow 함께 사용하는 유일한 컴포넌트 — 페이지 위 분리된 시각 단위임을 강조.

> 별도 `border-left: 4px solid semantic` 강조선이 있는 preview-html `.toast`는 **legacy 톤** — 현재 SoT는 site `sonner-examples.mjs` 그대로의 깔끔한 카드 형태.

## Anatomy

```
┌────────────────────────────────────────────────────────┐
│ ⓐ container (border + shadow-lg)                       │
│  ┌────┐  ┌──────────────────────────────┐  ┌────────┐  │
│  │ ⓑ  │  │ ⓒ title  (title-sm, 600)     │  │   ⓔ    │  │
│  │ico │  │ ⓓ desc   (body-sm, secondary)│  │ action │  │
│  └────┘  └──────────────────────────────┘  └────────┘  │
└────────────────────────────────────────────────────────┘
```

| ⓐ container | `background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); padding:var(--spacing-md) var(--spacing-lg); box-shadow:var(--shadow-lg); display:flex; align-items:flex-start; gap:var(--spacing-md); max-width:360px;` |
| ⓑ icon | 20×20 stroke svg. 좌측, `flex-shrink:0`, `margin-top: 2px`(title baseline 정렬). kind별 stroke 색상(아래 Kinds 표). `default` kind는 icon 생략. |
| ⓒ title | `text-title-sm` (16/600/1.4). `var(--color-text-primary)`. 한 줄 권장(2줄까지 허용). |
| ⓓ description | `text-body-sm` (14/400/1.5). `var(--color-text-secondary)`. 선택. title과 `var(--spacing-xs)`(4) gap. |
| ⓔ action button | SM primary button — spec은 [`button.md`](button.md) Size `sm` 그대로(`h-8`, `text-caption`, `font-sans`, `radius-sm`, `bg-primary`, `shadow-sm`). `flex-shrink:0`로 줄바꿈 방지. 선택. |

**규칙**

- icon은 stroke svg만 사용 — fill 채움 금지(시각 무게 과잉, semantic 색 톤 깨짐).
- action button은 **한 토스트당 최대 1개** — 결정 피로 회피. 두 개 이상 액션 필요하면 dialog로 승격.
- close button(×)은 sonner 라이브러리 자체 dismiss UI(우상단 hover 시 노출)에 위임 — 정적 HTML 추가 금지.

## Kinds

| Kind | Icon stroke 색상 | 의미 | 사용처 |
|---|---|---|---|
| `default` | (icon 없음) | 중립 알림 | 일반 정보 toast, action 동반 알림(예: "보관함으로 이동했습니다 — 되돌리기"). |
| `success` | `--color-success` (#1A7F47) | 성공 / 완료 | 저장 성공, 결재 승인 완료. |
| `error` | `--color-error` (#D32F2F) | 실패 / 에러 | 저장 실패, 네트워크 끊김. |
| `warning` | `--color-warning` (#F59E0B) | 주의 / 임박 | 저장 공간 부족, 기한 임박 D-3. |
| `info` | `--color-info` (#2271D1) | 정보 / 안내 | 새 알림 도착, 백그라운드 동기화 완료. |

브랜드 분기 없음 — 모든 kind가 brand-neutral semantic 토큰 사용. action button만 `--color-primary`로 브랜드 색이 반영됨.

## Sizes

Sonner는 **size variant 없음** — 단일 spec. 콘텐츠(title/description 길이)에 따라 `max-width:360px` 안에서 자연 wrap.

| 항목 | 값 | 토큰 |
|---|---|---|
| Container padding | 12 / 16 (Y · X) | `var(--spacing-md)` · `var(--spacing-lg)` |
| Container radius | 8px | `var(--radius-md)` |
| Container shadow | shadow-lg | `var(--shadow-lg)` |
| Container border | 1px solid | `var(--color-border-default)` |
| Container max-width | 360px | (literal — sonner 라이브러리 기본) |
| Gap (icon · content · action) | 12px | `var(--spacing-md)` |
| Gap (title · description) | 4px | `var(--spacing-xs)` |
| Icon size | 20×20 | (svg width/height) |
| Stack gap (multi-toast) | 12px | `var(--spacing-md)` |

## States

| State | 동작 | 시각 |
|---|---|---|
| `enter` | 화면 모서리에서 슬라이드 + fade in | `motion-duration-base` (250ms) · `motion-ease-out` |
| `visible` | 표시 상태 (auto-dismiss timer 진행) | spec 그대로 |
| `hover` | timer 일시정지 + 가까운 토스트 stack 펼침 | shadow 변화 없음 |
| `exit` | swipe 또는 timer 만료 시 fade out | `motion-duration-base` · `motion-ease-in` |
| `action click` | callback 실행 + 즉시 dismiss | (callback 결과는 별도 toast로 안내) |

자동 dismiss 기본 4000ms(sonner 라이브러리 default). action 동반 toast는 사용자 결정이 필요하므로 자동 dismiss 끔 또는 6000ms+ 권장.

## Layout

**Toaster mount**

- App root에 `<Toaster />`를 **단 1회**만 렌더링. 여러 곳에 mount 시 동일 toast 다중 출력.
- `position` prop으로 모서리 지정(`top-right` / `bottom-right`(default) / `top-center` 등). Porest 기본은 `bottom-right` (PC) · `top-center` (mobile).
- 모바일 viewport(`<880px`)에선 top-center + full-width 권장 — sonner 자동 처리.

**Stacking**

- 최신 toast가 위(또는 모서리 기준 가까운 쪽). 기본 3개까지 표시, 초과 시 stacked.
- hover 시 stack 펼침 — 개별 토스트 확인/dismiss 가능.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| 자동 dismiss | 4000ms 후 fade out. `duration` prop으로 변경 가능. `Infinity`로 끔. |
| Hover | timer 일시정지. mouse leave 시 timer 재개. |
| Swipe (touch) | 가로 swipe로 dismiss. 거리 50%+ 시 fade out. |
| Action click | `action.onClick()` 실행 후 즉시 dismiss. |
| Keyboard | `Escape` 또는 sonner 자체 dismiss shortcut. action button은 `Tab` focus 가능. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (title × surface-default) | `text-primary` 21:1 ✓ |
| **WCAG 1.4.3** Color contrast (description × surface-default) | `text-secondary` 9.2:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (icon × surface-default) | success/error/warning/info 모두 3:1+ ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | action button SM은 32px — 미달(⚠). action button을 핵심 액션으로 사용하지 말 것(되돌리기 같은 보조 수단). |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | action button SM 32px ✓ |
| **ARIA** | sonner 라이브러리가 `role="status"`(default/success/info) 또는 `role="alert"`(error/warning) 자동 부여. screen reader가 토스트 등장 즉시 읽음. |
| **Focus** | 토스트가 자동으로 focus를 빼앗지 않음 — 현재 작업 흐름 보존. action button은 `Tab`으로 도달 가능. |

## Do / Don't

### ✅ Do

- 결과 알림은 toast로(저장 성공/실패/동기화 완료) — 화면 흐름 끊지 않음.
- action은 "되돌리기"처럼 즉시 반대 행동만 — 복잡한 후속 결정은 dialog로.
- error/warning은 자동 dismiss를 6000ms+ 또는 끔으로 — 읽을 시간 확보.
- description은 1줄로 끝나게 — toast는 읽고 사라지는 매체.

### ❌ Don't

- toast 안에 form input/select 배치 — 인터랙션 시간 동안 dismiss 위험. form은 dialog로.
- 동일 메시지 연속 호출 — sonner 라이브러리 `id` 옵션으로 중복 방지(`toast.success("저장됨", { id: "save" })`).
- 페이지 위에 toast 4개 이상 동시 표시 — 시각 노이즈. sonner 기본 stack(3개) 그대로.
- 치명적 confirm(삭제 확정 등)을 toast action으로 — 되돌릴 수 없는 액션은 [`AlertDialog`](alert-dialog.md).

## Migration notes

- 기존 `sonner-examples.mjs` action button(`gap-2 rounded-md px-3 text-label-sm`)은 button SM spec과 불일치 — `gap-[var(--spacing-sm)] rounded-sm px-[var(--spacing-sm)] text-caption` + `font-sans whitespace-nowrap transition-[box-shadow] shadow-sm hover:brightness-105`로 정정.
- 기존 `sonner.tsx` `actionButton` className은 `bg-primary text-text-on-accent`만 — 풀 button SM spec(높이/패딩/font/shadow/transition) 추가.
- preview-html `.toast`의 `border-left: 4px solid semantic` 강조선 톤은 **legacy** — site preview의 plain card 톤(border 1px all-around + icon 좌측)이 SoT.
- 하드 코딩 px(`padding:12px 16px`, `gap:12px`, `font-size:14px`) → spacing/font 토큰 직접 인용.
