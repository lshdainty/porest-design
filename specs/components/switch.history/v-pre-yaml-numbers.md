# Switch

> 2개 상태(on / off) 사이를 즉시 토글하는 컨트롤. 알림 켜기·다크 모드·자동 저장처럼 **즉시 반영되는 binary 설정**에 사용. 폼 submit이 필요한 binary 입력은 Checkbox 사용. Radix `Switch` 베이스.

Porest Switch는 **단일 spec × 2 states(checked / unchecked)** 매트릭스로 정의됩니다. iOS 스타일 패턴 — Track 44×24(`h-6 w-11`) + Thumb 20×20(`h-5 w-5`) 흰색 채움 + 상태별 track 색상 분기(unchecked: `border-strong` / checked: `primary`). 다크 모드에서도 thumb은 흰색 유지 — `text-on-accent` 고정(swap 대상 아님).

## Anatomy

```
unchecked          checked
┌─────────┐        ┌─────────┐
│ ●       │   →    │       ● │     ← thumb 20×20 흰색
│ (off)   │        │   (on)  │
└─────────┘        └─────────┘
border-strong       primary
   44×24 track + 2px transparent border (focus용 inset 확보)
```

| ⓐ root (track) | `inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent` + 상태별 배경. 2px transparent border는 focus ring inset 공간. |
| ⓑ thumb | `h-5 w-5 rounded-full bg-text-on-accent shadow-md` + `translate-x-0` (unchecked) / `translate-x-5` (checked). |
| ⓒ focus ring | `focus-visible:ring-2 ring-ring ring-offset-2` — keyboard navigation 시만. |

**규칙**

- thumb 채움은 **`text-on-accent` 고정**(흰색) — 다크 모드에서 `surface-default`로 채우면 dark-swap으로 어두워져 안 보임 (Slider와 동일 원리).
- unchecked 상태 track 색은 **`border-strong`** 사용 — `surface-input`은 form input과 동일 톤이라 클릭 가능한 컨트롤로 식별 약함. `border-strong`이 form 안 다른 회색 요소와 시각 분리.
- 좌→우 슬라이드만 (`translate-x-5`) — Radix가 자동 처리. RTL 환경은 별도 처리(Radix `dir` prop).

## Variants

Switch는 **variant 없음** — binary 토글은 시각 통일이 인지 비용↓. 의미 분기(positive / destructive)는 별도 컴포넌트(Checkbox · AlertDialog)로.

## Sizes

Switch는 **size variant 없음** — iOS 표준 44×24 단일 spec. 사용처에서 `className`으로 변경 시 thumb translation 거리도 함께 조정 필요(권장 안 함).

| 항목 | 값 | 토큰 |
|---|---|---|
| Track width | 44px | `w-11` |
| Track height | 24px | `h-6` |
| Track radius | full | `rounded-full` |
| Track border | 2px transparent (focus inset) | `border-2 border-transparent` |
| Track bg (unchecked) | `border-strong` | `bg-border-strong` |
| Track bg (checked) | `primary` | `bg-primary` |
| Thumb size | 20×20 | `h-5 w-5` |
| Thumb radius | full | `rounded-full` |
| Thumb bg | `text-on-accent` (#FFFFFF 고정) | `bg-text-on-accent` |
| Thumb shadow | shadow-md | `var(--shadow-md)` |
| Thumb translate (checked) | 20px | `translate-x-5` |
| Transition | bg-color / transform | `duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` |

## States

| State | Track bg | Thumb position | Thumb bg | Cursor |
|---|---|---|---|---|
| `unchecked` | `border-strong` | `translate-x-0` (좌측) | `text-on-accent` | pointer |
| `checked` | `primary` | `translate-x-5` (우측) | `text-on-accent` | pointer |
| `hover` | (동일) | (동일) | (변화 없음) | pointer |
| `focus-visible` | (동일) | (동일) | — | + `ring-2 ring-ring ring-offset-2` |
| `disabled` | (동일) opacity 0.5 | (동일) | (동일) | `not-allowed` |

Transition: 상태 변경 시 `bg-color` + `transform` 모두 `motion-duration-fast` (180ms) — 동시 변화로 자연스러운 슬라이드.

## Layout

**Label + Switch row**

- `display:flex; align-items:center; justify-content:space-between;` — Label 좌, Switch 우. 모바일 설정 화면 표준 패턴.
- Label은 [`Label`](label.md) — `label-md` (14/500) + 보조 설명은 그 아래 `caption` `text-secondary`.
- 전체 row는 클릭 가능하도록 `<label htmlFor>` 또는 Radix `<label>` 패턴 활용 — label 클릭 시 switch toggle.

**Settings list (여러 Switch)**

- 각 row 사이 separator(`border-t border-border-default`) — 시각적 분리.
- row padding `py-[var(--spacing-md)]` 권장 — 터치 hit area 확보.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click (track 또는 thumb) | 상태 토글 (Radix `onCheckedChange` 콜백). |
| `Space` (focus) | 상태 토글. |
| `Enter` | (Radix는 토글 안 함 — `Space`만. form submit과 충돌 회피.) |
| Disabled | 모든 인터랙션 차단. |
| Label click | switch focus + 토글 (`<label htmlFor>` 또는 wrap pattern). |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (track 상태 분리) | unchecked `border-strong` × bg-page = 2.5:1 / checked `primary` × bg-page = 4.5:1+ — 상태 분리는 시각 위치(thumb 좌/우)도 함께 전달, 색만으로 의존 안 함. |
| **WCAG 1.4.11** Non-text contrast (thumb × track) | `text-on-accent` × `primary` = 4.7:1+ ✓ / `text-on-accent` × `border-strong` = 4:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (focus ring × bg-page) | `ring` `#0049CC` × `#F7F8FA` = 4.5:1+ ✓ |
| **WCAG 2.1.1** Keyboard | `Space`로 토글 가능 ✓ |
| **WCAG 2.4.7** Focus Visible | `focus-visible:ring-2 ring-ring ring-offset-2` ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | 44×24 — width 44 ✓ / height 24 미달(⚠). row 전체를 클릭 가능하게 wrap하면 row height로 hit area 확장(권장). |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 44×24 ✓ |
| **WCAG 1.3.1** Info and Relationships | `<label htmlFor>` 또는 `aria-labelledby` — 상태 변화 시 스크린리더가 "on"/"off" 읽음. |
| **ARIA** | Radix가 `role="switch"` + `aria-checked` 자동 부여. label 명시 필수(`aria-label` 또는 `<label>`). |

## Do / Don't

### ✅ Do

- **즉시 반영되는** binary 설정에 사용 — 알림 ON, 다크 모드 ON, 자동 저장 ON. 클릭 후 즉시 효과 발생.
- row 전체를 클릭 가능하게 wrap — 모바일 hit area 확보 + 사용성↑.
- label 우측에 switch 배치 — iOS 표준 패턴, 익숙한 시그니처.
- 상태 변화는 사용자 의도 직후 즉시 — 지연 없이 즉시 반영(롤백 가능하면 Sonner toast로 안내).

### ❌ Don't

- form submit이 필요한 binary 입력에 — Checkbox 사용. switch는 즉시 효과 패턴.
- 3개 이상 옵션 — RadioGroup 또는 ToggleGroup.
- 상태 변화 후 추가 확인 필요한 경우 — switch는 즉시 효과. confirm dialog가 필요한 destructive 액션은 button + AlertDialog로.
- thumb 채움을 `surface-default`로 — 다크 모드에서 안 보임. **`text-on-accent` 고정** 유지.
- track 색을 변경 (예: `surface-input`) — 다른 form input과 시각 혼동. `border-strong` ↔ `primary` 표준 유지.

## Migration notes

- 기존 shadcn `switch.tsx`는 unchecked track `bg-input` (`surface-input` alias) — form input과 시각 혼동. `bg-border-strong`으로 정정.
- thumb `bg-background` (`surface-default` alias) → `bg-text-on-accent` — 다크 모드 thumb invisible 버그 fix.
- transition `transition-colors` → `transition-[background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]` 토큰 직접 인용. thumb은 별도 `transition-transform`.
- preview-html에 별도 `.sw-*` CSS 없음 — switch는 site preview/component page에서 컴포넌트 직접 렌더 (preview-html scope 외).
- `data-[state=checked]:bg-primary` / `data-[state=unchecked]:bg-border-strong` — Radix data-state attribute로 상태 분기.
