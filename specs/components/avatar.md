# Avatar

> 사용자/팀원/엔티티의 시각 identity를 한 원형 단위로 표시. 이미지 우선, 실패 시 한글 이니셜(1글자) fallback. 리스트 행/멘션/팀 그룹/comment author 등 어디서나 사람을 식별하는 기본 단위.

Porest Avatar는 **4 sizes(sm/md/lg/xl) × 2 fills(neutral/primary)** 매트릭스로 정의됩니다. preview `.hc-avatar` SoT 정합 — 정원(`radius-full`) + `bg-primary` 채움 + `text-on-accent` 흰색 초성 + 600 weight. 한국어 이니셜 1글자(`김`/`이`/`최`)가 가독되도록 사이즈별로 폰트 토큰을 점진 확대.

## Anatomy

```
┌──────────┐
│ ⓐ root   │   사람/엔티티 1명을 표시하는 원형 컨테이너
│  ┌────┐  │
│  │ ⓑ  │  │   AvatarImage (이미지) — object-cover
│  │img │  │
│  └────┘  │
│  ⓒ초성   │   AvatarFallback (이미지 실패 / 이미지 없음) — 1글자
└──────────┘
```

| ⓐ root | `relative inline-flex shrink-0 overflow-hidden rounded-full` — 정원 형태. width = height. |
| ⓑ image | `aspect-square h-full w-full object-cover` — 비율 보존하며 채움. |
| ⓒ fallback | `flex items-center justify-center` + fill(neutral/primary 분기) + 사이즈별 font 토큰. 한글 1글자 또는 영문 2글자. |

**규칙**

- 이미지 우선 — `<AvatarImage src>` 로딩 실패 시 자동으로 fallback 노출(Radix가 처리).
- fallback은 **1글자**(한글) 또는 **2글자**(영문) — 3글자 이상 시 글자가 작아져 가독성↓.
- 한 화면에 같은 사람의 avatar는 동일 fill로(neutral vs primary 혼용 금지).

## Variants (fill)

| Variant | Background | Text | 사용처 |
|---|---|---|---|
| `neutral` *(default)* | `--color-surface-input` | `--color-text-primary` | 동료/팀원 일반 표시 — 절제된 톤. |
| `primary` | `--color-primary` | `--color-text-on-accent` | 본인/강조 사용자 — preview `.hc-avatar` SoT. brand-color identity. |

브랜드 분기: `primary` variant에서만 HR `#357B5F` / Desk `#0147AD` 반영. `neutral`은 brand-agnostic.

## Sizes

`width = height` 정사각 + `radius-full` 정원. 폰트 토큰은 한국어 1글자 이니셜 가독성 기준으로 사이즈별 점진 확대.

| Size | px | 토큰 | Fallback font (token) | Fallback font (px) | 사용처 |
|---|---|---|---|---|---|
| `sm` | 32 | `h-8 w-8` | `text-label-sm` | 13 | dense list, comment thread. |
| `md` *(default)* | 40 | `h-10 w-10` | `text-title-sm` | 16 | preview `.hc-avatar` SoT, user row, mention chip. |
| `lg` | 48 | `h-12 w-12` | `text-title-md` | 18 | profile header (소형), card emphasis. |
| `xl` | 64 | `h-16 w-16` | `text-display-sm` | 28 | profile detail page, hero. |

공통 weight: `600` (font-semibold). preview `.hc-avatar`는 `700`이나 spec은 `600` 통일 — body 텍스트 `600`과 시각 위계 일관성. (preview는 다음 sync에서 정합 예정.)

## States

| State | Background | Text | 추가 |
|---|---|---|---|
| `enabled` (image loaded) | (image) | — | — |
| `enabled` (fallback) | variant 따름 | variant 따름 | — |
| `image loading` | variant 따름 (fallback 일시 노출) | variant 따름 | — |
| `image error` | variant 따름 (fallback 영구 노출) | variant 따름 | — |
| `interactive: hover` | 동일 | 동일 | `cursor-pointer` (avatar가 button/link 안에 있을 때만) |
| `interactive: focus-visible` | 동일 | 동일 | `ring-2 ring-ring ring-offset-2` |

avatar 자체는 인터랙티브가 아님 — 클릭 가능해야 하면 `<button>` 또는 `<a>`로 wrap.

## Layout

**User row** (preview `.hc` SoT — 화면샷 패턴)

- `display:flex; align-items:center; gap:var(--spacing-md);` (avatar + 텍스트)
- 우측 텍스트 column: `display:flex; flex-direction:column; gap:var(--spacing-xs);`
  - 이름: `text-body-md` 600 + `text-primary` (또는 강조 시 `text-title-sm`)
  - 부가정보: `text-caption` + `text-secondary`
- 카드 형태로 감쌀 땐 `padding:var(--spacing-md); background:var(--color-bg-page); border-radius:var(--radius-md);`

**Avatar group (overlap)**

- `display:flex; -space-x-2` (8px 겹침) — 마지막 avatar는 `+N` fallback으로 "외 N명" 표시.
- 각 avatar에 `ring-2 ring-surface-default`(2px 흰색/dark surface 링)로 경계 분리 — preview SoT.
- 4–5개까지 권장. 그 이상은 `+N` 압축.

**Mention chip**

- inline-flex + sm avatar + 이름. 본문 흐름 안에서 `var(--color-primary)` 텍스트로.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Image load | `<AvatarImage>` 로딩 성공 시 노출. 실패 시 자동으로 fallback. |
| Image error | `onLoadingStatusChange="error"` 또는 onError 시 fallback 영구 노출. |
| Tooltip (선택) | avatar에 hover 시 사용자명/역할 tooltip — list dense view에서 권장. |
| Click | avatar 자체는 클릭 액션 없음. 클릭 가능해야 하면 `<button>`/`<a>`로 wrap + `aria-label`. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.1.1** Non-text Content | `<AvatarImage alt>` 필수 — 의미 있는 alt(`"@user"` 등). 장식이면 `alt=""`. fallback 초성은 시각 표현일 뿐 — 의미는 부모 텍스트로 전달. |
| **WCAG 1.4.3** Color contrast (primary fill × text-on-accent) | HR `#357B5F` × `#FFFFFF` = 4.8:1 ✓ / Desk `#0147AD` × `#FFFFFF` = 9.5:1 ✓ |
| **WCAG 1.4.3** Color contrast (neutral fill × text-primary) | `surface-input` × `text-primary` = 13:1+ ✓ |
| **WCAG 1.4.11** Non-text contrast (avatar × bg-page) | `surface-input`/`primary` 모두 `bg-page` 대비 3:1+ ✓ |
| **WCAG 2.5.5** Target Size (AAA, 44×44) | sm(32) · md(40) · lg(48) — sm/md 미달(⚠). avatar가 클릭 가능할 땐 lg(48) 이상 권장. |
| **WCAG 2.5.8** Target Size Minimum (AA, 24×24) | 모든 사이즈 ✓ |
| **ARIA** | static avatar는 `role="img"` + `aria-label`(이름 또는 의미). interactive wrap은 `<button>`/`<a>` semantic. |

## Do / Don't

### ✅ Do

- 이미지가 있으면 이미지 우선 — fallback은 안전망. 의미 있는 `alt` 필수.
- 한글 이니셜은 **성씨 1글자**(`김`) — 첫이름 글자(`지`)보다 식별성 우위.
- avatar group은 4–5개 + `+N` — 그 이상은 시각 노이즈.
- 사이즈는 컨테이너 위계와 일치 — list row(md) / card(md) / profile detail(xl).

### ❌ Don't

- fallback 글자 3개 이상 — 작아져서 못 읽음. 1–2개로 압축.
- 같은 avatar에 neutral/primary 혼용 — 인지 부담.
- 임의 사이즈(`h-9`/`h-11`) — 토큰 그리드(8/10/12/16) 벗어남.
- avatar에 직접 click handler — semantic 망가짐. `<button>`/`<a>`로 wrap.
- 사각 avatar — Porest는 항상 정원(`radius-full`). 정사각 identity가 필요하면 별도 `Logo` 컴포넌트.

## Migration notes

- 기존 `avatar-examples.mjs`는 px 하드코드(`gap:12px`, `font-size:12px`) 사용 — `var(--spacing-md)` / `text-label-sm` 등 토큰 직접 인용으로 정정.
- 사이즈별 폰트 매핑 hardcoded ternary(`size <= 32 ? "label-sm" : ...`)는 단순 lookup table로 동일하나, spec Sizes 표(`sm` → `text-label-sm` / `md` → `text-title-sm` / `lg` → `text-title-md` / `xl` → `text-display-sm`)와 1:1 동기.
- "User row" 예제는 preview `.hc` SoT 톤(bg-page 카드 wrap + body-md name + caption bio)으로 재구성 — 화면샷 패턴.
- preview-html `.hc-avatar`의 `font-weight: 700` → spec 600 정합(차기 sync 시 preview 갱신).
