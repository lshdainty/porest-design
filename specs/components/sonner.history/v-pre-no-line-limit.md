# Sonner (Toast)

> 사용자 액션 결과나 시스템 이벤트를 화면 흐름을 끊지 않고 일시적으로 알리는 floating 알림. `sonner` 라이브러리 기반(shadcn 권장)이며 화면 모서리에서 슬라이드 인 → 자동 dismiss → swipe로 직접 닫기 가능한 패턴.

Porest Sonner는 **단일 spec × 5 kinds(default/success/error/warning/info)** 매트릭스로 정의됩니다. site preview SoT 톤을 픽스 — `surface-raised` + `radius-md` + `shadow-md` + 좌측 semantic 컬러 아이콘(20px) + action button(SM primary, 글 아래 줄 오른쪽). **테두리 없음** — 면과 그림자만으로 페이지 위에 뜬 시각 단위임을 표현한다.

> **2026-09-22 — 버튼을 글 옆에서 글 아래 줄로 내렸다.** 360px 토스트에서 SM 버튼(약 71px)을
> 글 옆에 두면 글 폭이 210px 안팎으로 줄어, 16px 제목 한 줄에 한글 13자 남짓만 들어간다.
> 두 문장짜리 안내("이미 결제가 끝난 회차예요. 기록만 바뀌고 계좌 잔액은 그대로예요.")가
> 폰(360·390)에서 **3줄**이 돼 ⓒ 의 "2줄까지" 를 넘었다. 문구를 줄여 맞추면 다음 문구가
> 길어질 때 같은 일이 난다 — 글이 쓰는 폭을 바꾼다. 버튼이 있으면 글은 토스트 폭 전체를
> 쓰고(아이콘 옆 약 296px), 버튼은 그 아래 줄 오른쪽 끝에 선다. 같은 안내가 360·390·412
> 모두 2줄이 된다. 버튼이 없는 토스트는 그대로다.
>
> 함께: **아이콘은 제목 첫 줄에 붙는다**(ⓑ `margin-top:2px` 그대로). 줄이 둘로 나뉘어도
> 아이콘이 두 줄 사이·버튼 줄 쪽으로 내려가지 않는다. 최소 높이 52 안에서 한 줄짜리가
> 위로 쏠리지 않게 줄 묶음은 세로 가운데(`align-content:center`)에 둔다.

> **2026-08-21 — 그림자를 `shadow-lg` → `shadow-md` 로.** 다크에서 `lg`·`xl` 은
> 부드러운 번짐이 아니라 **한 겹 더 어두운 띠**로 읽힌다. 그림자 색이 50~60% 검정인데
> 배경이 이미 거의 검정이라 경계가 뭉개지지 않아서다. `md` 는 띠가 안 생기고,
> 분리는 `surface-raised` 면 차이가 이미 해 준다. 네 토큰을 전부 다크에서 렌더해 골랐다.
>
> **2026-08-21 — 테두리를 걷었다.** 면과 그림자만으로 충분히 뜬다. 라이트는 흰 면 +
> 그림자로 이미 또렷하고, 다크는 아래 `surface-raised` 변경으로 면 차이가 생겼다.
> 1px 선이 하나 더 있으면 오히려 카드처럼 무거워 보인다.
>
> **2026-08-21 — 면을 `surface-default` → `surface-raised` 로.** 다크에서 토스트가 배경에
> 묻혀 안 보였다. 검은 그림자를 아무리 키워도 검은 배경 위에서는 분리가 안 생긴다.
> 면을 한 단계 올리는 쪽이 실제로 뜬다. 라이트에서는 `surface-raised` 가 `surface-default`
> 와 같은 값이라 **변화가 없다** — 다크에서만 효과가 나는 변경이다.

> 별도 `border-left: 4px solid semantic` 강조선이 있는 preview-html `.toast`는 **legacy 톤** — 현재 SoT는 site `sonner-examples.mjs` 그대로의 깔끔한 카드 형태.

## Anatomy

```
┌────────────────────────────────────────────────────────┐
│ ⓐ container (surface-raised + shadow-md, 테두리 없음)  │
│  ┌────┐  ┌──────────────────────────────────────────┐  │
│  │ ⓑ  │  │ ⓒ title  (title-sm, 600)                 │  │
│  │ico │  │ ⓓ desc   (body-sm, secondary)            │  │
│  └────┘  └──────────────────────────────────────────┘  │
│                                          ┌────────┐    │
│                                          │   ⓔ    │    │  ← 버튼이 있을 때만 이 줄
│                                          │ action │    │
│                                          └────────┘    │
└────────────────────────────────────────────────────────┘
```

| ⓐ container | `background:var(--bg-surface-raised); border-radius:var(--radius-md); padding:var(--spacing-md) var(--spacing-lg); box-shadow:var(--shadow-md); display:flex; flex-wrap:wrap; align-items:flex-start; align-content:center; gap:var(--spacing-md); max-width:360px;` — `flex-wrap` 으로 ⓔ 가 다음 줄로 내려간다. 가로·세로 gap 이 같다. |
| ⓑ icon | 20×20 stroke svg. 좌측, `flex-shrink:0`, `margin-top: 2px`(title baseline 정렬). kind별 stroke 색상(아래 Kinds 표). `default` kind는 icon 생략. |
| ⓒ title | `text-title-sm` (16/600/1.4). `var(--color-text-primary)`. 자간 없음(`letter-spacing` 을 주지 않는다). 한 줄 권장(2줄까지 허용). |
| ⓓ description | `text-body-sm` (14/400/1.5). `var(--color-text-secondary)`. 선택. title과 `var(--spacing-xs)`(4) gap. |
| content (ⓒ·ⓓ 묶음) | `display:flex; flex-direction:column; gap:var(--spacing-xs); min-width:0; flex:1 1 calc(100% - 20px - var(--spacing-md));` — 아이콘을 뺀 **한 줄 전체**를 차지한다. 그래서 ⓔ 가 옆에 설 자리가 없어 아래 줄로 간다. `default` kind(아이콘 없음)도 같은 값이다 — `flex-grow` 가 남는 폭을 채운다. |
| ⓔ action button | SM primary button — spec은 [`button.md`](button.md) Size `sm` 그대로(`h-8`, `text-caption`, `font-sans`, `radius-sm`, `bg-primary`, `shadow-sm`). **글 아래 줄 오른쪽 끝**(`margin-left:auto`). `flex-shrink:0`. 선택. |

**규칙**

- icon은 stroke svg만 사용 — fill 채움 금지(시각 무게 과잉, semantic 색 톤 깨짐).
- action button은 **한 토스트당 최대 1개** — 결정 피로 회피. 두 개 이상 액션 필요하면 dialog로 승격.
- action button은 **글 옆에 두지 않는다** — 글 아래 줄 오른쪽 끝. 옆에 두면 버튼 폭만큼 글 폭이 줄어 같은 문구가 한 줄 더 접힌다(2026-09-22).
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

> **2026-08-21 — `min-height: 52px` 추가.** 패딩(12)과 아이콘(20)만으로는 46px 이 나와
> 모바일에서 눈에 안 들어온다. Material 스낵바 하한(48)보다 조금 넉넉하게 잡는다.
> 내용이 길면 자연히 늘어난다 — 하한만 정한다.
>
> 함께: **패딩을 코드에서 명시**한다. 웹은 `toastOptions.style` 에 padding 이 없어
> sonner 라이브러리 기본값을 쓰고 있었다 — 라이브러리가 바뀌면 조용히 따라 움직인다.

Sonner는 **size variant 없음** — 단일 spec. 콘텐츠(title/description 길이)에 따라 `max-width:360px` 안에서 자연 wrap.

| 항목 | 값 | 토큰 |
|---|---|---|
| Container min-height | **52px** | (literal) |
| Container padding | 12 / 16 (Y · X) | `var(--spacing-md)` · `var(--spacing-lg)` |
| Container radius | 8px | `var(--radius-md)` |
| Container shadow | shadow-md | `var(--shadow-md)` |
| Container border | 없음 | — (면 + 그림자로 분리) |
| Container max-width | 360px | (literal — sonner 라이브러리 기본) |
| Gap (icon · content · action) | 12px | `var(--spacing-md)` |
| Gap (글 줄 · 버튼 줄) | 12px | `var(--spacing-md)` — 가로 gap 과 같은 값(한 `gap`) |
| 버튼 자리 | 글 아래 줄 오른쪽 끝 | `margin-left:auto` |
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
- preview-html `.toast`의 `border-left: 4px solid semantic` 강조선 톤은 **legacy** — site preview의 plain card 톤(테두리 없음 + icon 좌측)이 SoT.
- 하드 코딩 px(`padding:12px 16px`, `gap:12px`, `font-size:14px`) → spacing/font 토큰 직접 인용.
- **2026-09-22 버튼 아래 줄** — sonner 라이브러리 기본값 중 이 spec 과 다른 것을 코드에서 덮는다.
  - `[data-sonner-toast]` `gap:6px` → `var(--spacing-md)`, `align-items:center` → `flex-start` + `flex-wrap:wrap` + `align-content:center`
  - `[data-icon]` 상자 16×16 → 20×20(아이콘이 20px 인데 상자가 16px 이라 글과의 간격이 spec 보다 좁았다)
  - `[data-content]` → `flex:1 1 calc(100% - 20px - var(--spacing-md))`, `[data-button]` → `margin-left:auto`
- **2026-09-22 Flutter(desk-app) 미러** — `SnackBar.action` 을 쓰지 않는다. SnackBar 는 action 을 content 바깥(카드 옆 투명한 자리)에 둔다. 버튼은 content 안에서 그린다. SnackBar 기본 `clipBehavior: Clip.hardEdge` 는 카드 밖 `shadow-md` 를 잘라 버리므로 `Clip.none`. 제목은 `letterSpacing: 0` 을 명시한다 — 안 주면 Material SnackBar 의 content 글꼴(bodyMedium, 자간 0.25)을 물려받아 같은 문구가 더 넓게 접힌다.
- **box-shadow는 Tailwind utility(`shadow-md`) 대신 `toastOptions.style: { boxShadow: "var(--shadow-md)" }` inline style 사용** — sonner 라이브러리는 `Toaster`의 `toastOptions`로 모든 toast에 inline style 전파. Tailwind v4 `--tw-shadow-*` 분해 처리가 다크 모드 CSS 변수 override를 우회하는 문제 fix. preview `.toast` SoT와 다크 모드 정합 보장. 상세는 [`dialog.md`](dialog.md) Migration notes 참조.
