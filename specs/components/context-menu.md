# Context Menu

> 우클릭(데스크탑) 또는 long-press(모바일/터치)로 trigger 영역에서 열리는 floating 액션 메뉴. 행/카드/캔버스 위 컨텍스트에 종속된 보조 액션(즐겨찾기·보관·삭제 등)을 제공합니다. `[Dropdown Menu](#)`와 시각·구조는 동일하나 **trigger 방식**과 **위치**만 다름.

Porest Context Menu는 **단일 spec × 5 item kinds(default/inset/checkbox/radio/destructive)** 매트릭스로 정의됩니다. preview `.ctx` SoT 정합 — `surface-default` + border 1px + `radius-md` + `shadow-md` + `padding-xs` + min-width 160. item은 `body-md` + `radius-sm` + 토큰 padding(`spacing-sm/md`)으로 row.

## Anatomy

```
┌──────────────────────────────────┐
│ ⓐ container (border + shadow-md) │
│   ┌──────────────────────────┐   │
│   │ ⓑ item                   │   │  ←  hover: surface-input
│   │ ⓑ item                   │   │
│   │ ⓒ separator              │   │  ←  1px border-default
│   │ ⓓ destructive item       │   │  ←  text-error + hover error 12%
│   └──────────────────────────┘   │
└──────────────────────────────────┘
```

| ⓐ container | preview `.ctx` 그대로 — `display:inline-flex; flex-direction:column; background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); box-shadow:var(--shadow-md); padding:var(--spacing-xs); min-width:160px;` |
| ⓑ item | preview `.ctx-item` 그대로 — `padding:var(--spacing-sm) var(--spacing-md); border-radius:var(--radius-sm); cursor:pointer; font-size:var(--text-body-md);` hover: `bg-surface-input`. |
| ⓒ separator | preview `.ctx-sep` 그대로 — `height:1px; background:var(--color-border-default); margin:var(--spacing-xs) 0;` |
| ⓓ destructive item | item + `color:var(--color-error)`. hover: `color-mix(in srgb, var(--color-error) 12%, transparent)`. |

**규칙**

- min-width 160 — 한글 2글자 단일 item("저장")부터 한글 6글자("즐겨찾기 항목 추가")까지 일관된 폭.
- shortcut(⌘R 등)은 우측 정렬 — `margin-left:auto; color:text-tertiary; font-size:text-label-sm; tracking-widest`.
- inset 변형(checkbox/radio item이 섞일 때)은 좌측 padding을 `spacing-xl`(24)로 늘려 indicator(체크/원) 공간 확보.

## Item kinds

| Kind | 특징 | 사용처 |
|---|---|---|
| `default` | 단순 텍스트 액션 ("즐겨찾기"·"보관") | 가장 흔한 형태. |
| `default + shortcut` | 우측에 키보드 단축키 표시 ("재로드 ⌘R") | 데스크탑 위주 메뉴. |
| `inset` | 좌측 padding 늘림 — 같은 줄에 indicator 영역 공유 | checkbox/radio item과 같은 메뉴 안에 섞일 때 정렬 유지. |
| `checkbox` | 좌측 indicator(체크) + label. 토글 상태 | 옵션 on/off (예: "그리드 표시"). |
| `radio` | 좌측 indicator(원) + label. 그룹 안 단일 선택 | "보기 방식" 그룹 (list / grid / card). |
| `destructive` | text-error + error 12% hover | 삭제·차단 등 위험 액션. 단독 그룹으로 separator 위에. |

## Variants

Context Menu 자체는 **variant 없음** — 시각 통일이 일관성에 유리. 메뉴 의미 분기(일반 / 위험)는 item kind(default/destructive)와 separator 그룹화로 표현.

## Sizes

단일 size — preview `.ctx` 그대로. 메뉴는 콘텐츠(item 텍스트 길이/개수)에 따라 자연 확장.

| 항목 | 값 | 토큰 |
|---|---|---|
| Container padding | 4px | `var(--spacing-xs)` |
| Container radius | 8px | `var(--radius-md)` |
| Container shadow | shadow-md | `var(--shadow-md)` |
| Container border | 1px solid | `var(--color-border-default)` |
| Container min-width | 160px | (literal) |
| Item padding (Y · X) | 8 / 12 | `var(--spacing-sm)` · `var(--spacing-md)` |
| Item radius | 4px | `var(--radius-sm)` |
| Item font | body-md (15) | `var(--text-body-md)` |
| Item inset padding-left | 24px | `var(--spacing-xl)` |
| Separator margin (Y) | 4px | `var(--spacing-xs)` |
| Shortcut font | label-sm (13) | `var(--text-label-sm)` |

## States

| State | Background | Text | 추가 |
|---|---|---|---|
| `enabled` | transparent | `text-primary` | — |
| `hover / focus` | `surface-input` | `text-primary` | (focus-visible는 hover와 동일 시각 — outline 별도 없음, 메뉴 내 focus는 `aria-activedescendant`로 관리) |
| `pressed` | `surface-input` (즉시 dismiss) | `text-primary` | — |
| `disabled` | transparent | `text-primary` opacity 0.5 | `pointer-events: none` |
| `destructive enabled` | transparent | `text-error` | — |
| `destructive hover` | `error 12% mix` | `text-error` | — |

## Layout

**Position**

- trigger 영역의 마우스 좌표 위치에 열림(Radix가 처리). viewport 우/하단 넘침 시 자동으로 반전.
- 모바일 long-press 시 화면 중앙 또는 trigger 영역 근처(Radix touch 처리).

**Grouping**

- 비슷한 의미끼리 묶고 separator로 분리. 한 그룹 3–5개 권장 (그 이상 분리).
- destructive item은 항상 마지막 그룹 단독 — 실수 클릭 회피.

**Submenu (ContextMenuSub)**

- item에 SubTrigger + SubContent — 같은 시각 spec(container/item)을 재귀 사용. 우측에 chevron(`▸`).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| 우클릭 (데스크탑) | trigger 영역 위에서 mouse right click 시 마우스 좌표에 메뉴 열림. |
| Long-press (터치) | trigger 영역 위에서 500ms+ press 시 메뉴 열림 (Radix touch 자동 처리). |
| Outside click | 메뉴 외부 클릭 시 dismiss. |
| `Escape` | 메뉴 dismiss, focus는 trigger로 복귀. |
| `Arrow Up/Down` | item 간 keyboard focus 이동. |
| `Enter` / `Space` | focused item 활성화. |
| `Arrow Right` (SubTrigger) | 서브메뉴 열기. `Arrow Left` 닫기. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text-primary × surface-default) | 21:1 ✓ |
| **WCAG 1.4.3** Color contrast (text-error × surface-default) | `#D32F2F` × `#FFFFFF` = 5.0:1 ✓ |
| **WCAG 1.4.11** Non-text contrast (border × surface-default) | `border-default` `#E5E7EB` × `#FFFFFF` = 1.4:1 — 단독 border 식별은 약하나 `shadow-md`이 보강 (preview `.ctx` 동일 패턴). |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | item 높이 ≈ 32px(8+15+8+1.5) — 미달(⚠). 터치 우선 화면이면 padding-Y `var(--spacing-md)`(12)로 늘려 40px+ 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | item 32px ✓ |
| **WCAG 2.1.1** Keyboard | 우클릭 + `Shift+F10` 또는 `Menu` 키로 메뉴 열림(브라우저 기본). 메뉴 내 모든 액션 키보드 접근 가능. |
| **ARIA** | Radix가 `role="menu"` / item `role="menuitem"` / `role="menuitemcheckbox"` / `role="menuitemradio"` 자동 부여. SubTrigger는 `aria-haspopup="menu"` + `aria-expanded`. |

## Do / Don't

### ✅ Do

- trigger 영역에 시각 hint 제공 — 점선 border 또는 "우클릭 / long-press" 캡션. 발견성↑.
- destructive item은 단독 그룹 + 마지막 위치 — 실수 클릭 회피.
- shortcut은 데스크탑 메뉴에서만 노출 — 모바일에선 의미 없음.
- 4–7개 item 권장 — 그 이상은 카테고리 분리 또는 submenu로.

### ❌ Don't

- context menu에 핵심 액션 단독 — context menu는 보조 수단. 핵심 액션은 inline button으로도 노출.
- 메뉴 안 메뉴 안 메뉴(3단 이상 깊이) — 길찾기 비용↑. 2단까지 허용.
- 같은 메뉴 안에 같은 의미 item 중복 — 결정 피로.
- destructive item을 separator 없이 일반 item과 섞기 — 실수 클릭 위험.

## Migration notes

- 기존 `context-menu.tsx`는 `rounded-sm`(content) / `rounded-xs`(item) / `text-title-sm`(item font) — preview `.ctx` SoT(`radius-md` content + `radius-sm` item + `body-md` font)로 정정.
- item padding `px-2 py-1.5`(8 · 6) → `px-[var(--spacing-md)] py-[var(--spacing-sm)]`(12 · 8) 토큰 직접 인용.
- destructive variant 누락 — `data-variant="destructive"` 또는 className으로 `text-error` + hover error-mix 분기 추가.
- 예제는 1개("앞으로 / 뒤로 / 재로드 / 저장")만 — 화면샷 패턴("즐겨찾기 / 보관 / 삭제") 추가 + checkbox/radio 변형 예제 보강.
