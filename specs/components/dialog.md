# Dialog

> 페이지 위에 떠 있는 floating modal — 사용자 결정·form 입력·콘텐츠 편집이 필요한 흐름을 일시 차단. 위험한 비가역 액션 확정은 별도 [`alert-dialog.md`](alert-dialog.md) 사용.

Porest Dialog는 **3 sizes × 1 정렬 톤** 매트릭스로 정의됩니다. Toss 톤(절제 · 신뢰감)을 따라 `radius-xl`(20px) + `spacing-2xl`(40px) padding + `shadow-xl` + `display-sm` title — 넓은 여백과 큰 타이포로 화면 흐름이 끊겼음을 명확히 표시합니다. 한국어 본문 가독성을 위해 description은 `body-md` + `text-secondary`.

## Anatomy

```
┌────────────────────────────────────────────────────────┐
│ ⓐ overlay (page-wide dim)                              │
│       ┌─────────────────────────────────────┐          │
│       │ ⓑ container                  ⓒ close│          │
│       │                                     │          │
│       │ ⓓ title (display-sm)                │          │
│       │ ⓔ description (body-md, secondary)  │          │
│       │                                     │          │
│       │ ⓕ body (optional)                   │          │
│       │   ┌─────────────────────────────┐   │          │
│       │   │ key            value        │   │          │
│       │   │ key            value        │   │          │
│       │   └─────────────────────────────┘   │          │
│       │                                     │          │
│       │ ⓖ footer (actions, right-aligned)   │          │
│       │              [Cancel] [Primary]     │          │
│       └─────────────────────────────────────┘          │
└────────────────────────────────────────────────────────┘
```

| ⓐ overlay | 페이지 dim. light `--overlay-dim-light` rgba(0,0,0,0.50), dark `--overlay-dim-dark` rgba(0,0,0,0.65). click 시 닫힘. |
| ⓑ container | preview `.modal-dialog` 그대로 — `background:var(--color-surface-default); border-radius:var(--radius-xl); padding:var(--spacing-2xl); box-shadow:var(--shadow-xl); width:min(90%, <max-w>); display:flex; flex-direction:column; gap:var(--spacing-md);` |
| ⓒ close button | 우상단 icon button (X 16px). `aria-label="닫기"`. focus-visible 시 ring. |
| ⓓ title | preview `.modal-title` 그대로 — `font-size:var(--text-display-sm); font-weight:700; line-height:var(--text-heading-lg--line-height); color:var(--color-text-primary); letter-spacing:-0.01em;` |
| ⓔ description | preview `.modal-description` 그대로 — `font-size:var(--text-body-md); color:var(--color-text-secondary); line-height:1.6;` 선택 요소. |
| ⓕ body | 자유 영역. 정보 표시는 `.dialog-fields`(gray 채움 + key-val rows) 패턴, form은 `gap-md` flex column. |
| ⓖ footer | preview `.modal-actions` 그대로 — `display:flex; gap:var(--spacing-sm); justify-content:flex-end; margin-top:var(--spacing-md);` primary는 우측 끝, cancel은 좌측. |

**규칙**

- title 없는 dialog는 `aria-label` 필수 (스크린리더 대응).
- description 없을 수 있음 — title 단독이면 `aria-describedby` 생략 가능.
- body 내 `.dialog-fields` 패턴(gray bg + key-val)은 정보 확인용. form 입력은 별도 group.

## Variants

Dialog 자체는 **variant 없음** — 시각 통일이 일관성에 유리. 의미 분기(확정·취소 vs 정보 표시)는 footer 액션 구성으로 표현. 위험 액션 확정은 [`AlertDialog`](alert-dialog.md) 사용.

## Sizes

`box-sizing: border-box` 기준 max-width. 모바일에선 `width: min(90%, max-width)`로 좁은 화면 대응.

| Size | max-width | Padding | Gap | Radius | 사용처 |
|---|---|---|---|---|---|
| `sm` | 384px | `--spacing-xl` (24) | `--spacing-md` (12) | `--radius-lg` (12) | 짧은 확인 (1–2줄 description, button 2개) — preview의 mini dialog 톤. |
| `md` *(default)* | 480px | `--spacing-2xl` (32) | `--spacing-md` (12) | `--radius-xl` (20) | 일반 form, 정보 확인 — preview `renderModal` 톤. |
| `lg` | 640px | `--spacing-2xl` (32) | `--spacing-md` (12) | `--radius-xl` (20) | 다단계 form, 복잡한 콘텐츠 편집 (메모/가계부 detail 등). |

너비는 `width: min(90%, <max-width>)` — 좁은 viewport에서 90% width로 자동 축소.

Tailwind utility 매핑 (dialog.tsx cva — `--spacing-*`/`--dialog-max-w` 토큰 그대로 인용):
- `sm`: `[--dialog-max-w:384px] p-[var(--spacing-xl)] rounded-lg`
- `md`: `[--dialog-max-w:480px] p-[var(--spacing-2xl)] rounded-xl`
- `lg`: `[--dialog-max-w:640px] p-[var(--spacing-2xl)] rounded-xl`
- 공통: `w-[min(90%,var(--dialog-max-w))] gap-[var(--spacing-md)]`

**모바일 sheet (별도)**

- 좁은 viewport(≤ 480)에서는 옵션으로 bottom sheet 모드 — `bottom-0 left-0 right-0 rounded-t-xl` + slide-up motion. 본 spec 범위 밖(Drawer 사용 권장).

## States

Dialog는 open/closed 2 state. Radix `data-state` attribute(`open`/`closed`)로 motion 분기.

| State | Overlay | Container | Body scroll | Focus |
|---|---|---|---|---|
| `closed` | 미렌더 | 미렌더 | 정상 | trigger element |
| `open` | dim 활성 (fade-in) | 화면 가운데 (scale+fade-in) | lock (`overflow: hidden`) | container 안 첫 focusable로 이동 |
| transitioning | (motion 표 참조) | (motion 표 참조) | — | — |

### Motion

| 전환 | duration | easing | 속성 |
|---|---|---|---|
| open: overlay | `--motion-duration-base` (200ms) | `--motion-ease-out` | opacity 0 → 1 |
| open: container | `--motion-duration-slow` (300ms) | `--motion-ease-out` | scale 0.96 → 1 + opacity 0 → 1 |
| close: container | `--motion-duration-base` (200ms) | `--motion-ease-out` | scale 1 → 0.96 + opacity 1 → 0 |
| close: overlay | `--motion-duration-base` (200ms) | `--motion-ease-out` | opacity 1 → 0 |

`prefers-reduced-motion: reduce` 시 즉시 표시 (globally 0.01ms로 단축).

## Layout

**header**

- title + description 묶음 `flex flex-col gap-1.5` (6px).
- description 없으면 title 단독.

**body**

- title block과 `gap-md` (12px) 또는 `gap-lg` (16px).
- 정보 확인용은 `.dialog-fields` 패턴(`bg-surface-input` + `radius-md` + `gap-xs` 사이).
- form은 group 간 `gap-md`.

**footer**

- body와 `mt-md` (12px) 또는 `gap-md` (flex 안일 경우 자동).
- `flex justify-end gap-sm`. primary 우측, cancel 좌측.
- 모바일 좁은 화면은 `flex-col-reverse w-full` + 각 button `w-full` (shadcn 기본).

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Trigger click | open. trigger element 기억(닫힘 시 focus 복귀). |
| Overlay click | close. *위험 액션은 AlertDialog 사용*. |
| `Escape` | close. |
| Close button click | close. |
| `Tab` / `Shift+Tab` | container 안에서만 순환 (focus trap). |
| Close (어떤 경로든) | trigger element로 focus 복귀. body scroll lock 해제. |
| Body scroll | dialog 열림 동안 `overflow: hidden` (배경 스크롤 차단). |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (text ≥ 4.5:1) | title `text-primary` × `surface-default` = 14:1+ ✓, description `text-secondary` × `surface-default` ≥ 4.5:1 ✓ (`npm run lint:dark` 검증) |
| **WCAG 1.4.11** Non-text contrast (UI ≥ 3:1) | container outline + close button focus ring 모두 ≥ 3:1 ✓ |
| **WCAG 2.1.2** No Keyboard Trap | focus trap은 의도된 modal 동작 — `Escape`/close button로 빠져나갈 수 있어 충족. |
| **WCAG 2.4.3** Focus Order | 열림 시 첫 focusable, 닫힘 시 trigger로 복귀 — 자연스러운 흐름. |
| **WCAG 2.4.7** Focus Visible | close button + 모든 actions에 `focus-visible:ring-2`. |
| **WCAG 2.4.11** Focus Appearance (AA) | 2px ring + 2px offset 인접 표면 대비 3:1 ✓. |
| **ARIA** | `role="dialog"` + `aria-modal="true"` + `aria-labelledby="dialog-title-id"` + (선택) `aria-describedby="dialog-desc-id"`. Radix 기본 처리. |
| **Reduced motion** | 위 Motion 표 참조. |

## Do / Don't

### ✅ Do

- title은 사용자 행위를 직접 표현 ("프로필 편집", "메모 삭제 확인") — 시스템 톤 회피.
- description은 결과·영향을 명시 ("삭제 후 30일 보관함에 보관됩니다") — 사용자 결정에 필요한 정보.
- footer button은 우측 정렬, primary 우측 끝. cancel은 좌측. **destructive primary는 `AlertDialog` 사용**.
- 정보 확인용은 `.dialog-fields` 패턴(gray 채움 + key-val) — 한눈에 비교 가능.
- 모바일 좁은 화면에서 button 그룹은 `flex-col-reverse w-full`(shadcn 기본) — primary가 위.

### ❌ Don't

- title 없이 description만 — 스크린리더 사용자에게 컨텍스트 부족 (최소 `aria-label`).
- 페이지에 dialog를 여러 개 겹쳐 띄움 — 사용자 혼란. nested는 회피 (탭/스텝퍼로 분리).
- form 안에 dialog 안에 form 안에 dialog … — 한 단계만.
- destructive 액션 (비가역 삭제 등)을 Dialog로 처리 — overlay click으로 실수 닫힘 위험. **AlertDialog 사용**.
- close button을 footer로 옮김 — 사용자 학습 비용 (관습은 우상단 X).

## Migration notes

- 기존 `dialog.tsx`는 `max-w-lg`(512) / `p-6`(24) / `gap-4` / `rounded-md` / `shadow-lg` / title `text-title-lg`였으나 이번 동기에서 preview의 `.modal-*` 스타일로 정렬: `w-[min(90%,480px)]` / `p-[var(--spacing-2xl)]`(32) / `gap-[var(--spacing-md)]`(12) / `rounded-xl` / `shadow-xl` / title `text-display-sm`. 픽셀 하드코딩(`p-10` 등) 대신 디자인 토큰 직접 인용으로 spec과 1:1 동기.
- **DialogTitle 하단 border 제거**: Radix `DialogPrimitive.Title`은 WAI-ARIA 패턴에 따라 `<h2>`를 렌더 — 이전에 `build-site.mjs`의 `.content h2` selector가 `main.content` 안의 모든 h2(spec markdown ##, example-preview 안 DialogTitle)에 무차별 적용되어, inline style이 override 못 한 `padding-bottom: 12px` + `border-bottom: 1px solid`이 DialogTitle 아래에 박혔음. site의 selector를 `.content > h2`(직접 자식만)로 격리하여 spec-section 안의 H2와 example-preview 안의 DialogTitle 모두에서 docs 섹션 구분선이 자동 분리됨. DialogTitle 시각 스펙(preview `.modal-title` 그대로)은 변경 없음 — border는 원래부터 spec에 없었음.
- size variant(`sm`/`md`/`lg`) 신규 도입 — 기존 단일 max-width 고정.
- 기존 description `text-body-sm` → `text-body-md`로 보강 (한국어 가독성).
- DESIGN.md `### Modal` prose 정의(`radius-lg` / padding `xl`)는 이번 spec(`radius-xl` / padding `2xl`)로 정정 — 시각 SoT는 preview, prose가 따라옴.
