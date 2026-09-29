# Aspect Ratio

> 자식 요소(이미지, 비디오, iframe, placeholder)를 지정한 비율(`16:9`, `1:1`, `4:3` 등)에 정확히 맞춰 박스 크기를 보장하는 layout primitive. 콘텐츠 로딩 전·후 모두 레이아웃 안정성 보장(CLS 방지). Radix `AspectRatio` 베이스 — **스타일 0**, 비율 계산만.

Porest Aspect Ratio는 **단일 spec × 비율 자유**입니다. 컴포넌트 자체는 시각 토큰 없음 — 자식 요소의 시각 톤(이미지 `rounded-md`, placeholder `bg-surface-input`)으로만 분기. 부모 폭 100% 차지 후 `ratio` prop 비율에 맞춰 높이 자동 계산.

## Anatomy

```
┌─────────────────────────────┐
│                             │  ← 16:9 box (width=480, height=270)
│  ⓐ children (img/video/...) │
│                             │
└─────────────────────────────┘

┌─────────┐
│         │  ← 1:1 box (width=240, height=240)
│ ⓐ child │
│         │
└─────────┘
```

| ⓐ root | `<div>` (Radix `AspectRatioPrimitive.Root`) — `position:relative` + `aspect-ratio:<ratio>` CSS 자동 부여. children은 `position:absolute; inset:0`으로 박스 채움. |

**규칙**

- Aspect Ratio 자체는 시각 토큰 없음 — 자식의 background/border-radius/overflow가 시각 표현 담당.
- 부모 컨테이너 폭이 결정해야 동작 — `<AspectRatio>` 단독으론 `width:0`. 부모에 `max-w-*` 또는 명시적 width 필수.
- 콘텐츠가 비율 안 맞으면 `object-fit` 권장 — img `object-cover`(잘림) / `object-contain`(여백). Aspect Ratio는 박스만, fit은 자식 책임.
- `radius`/`overflow`도 자식 또는 wrapper에서 — `<AspectRatio>` 자체엔 className 추가 가능하지만 의미상 자식이 맡는 게 자연.

## Variants

Aspect Ratio는 **variant 없음** — `ratio` prop 값으로만 분기.

### 권장 ratio

| 비율 | 값 (number) | 사용처 |
|---|---|---|
| 16:9 | `16 / 9` (≈1.78) | 동영상, 와이드 미디어, hero banner. |
| 4:3 | `4 / 3` (≈1.33) | 전통적 사진, 데스크탑 모니터 비율. |
| 1:1 | `1` | 정사각형 — 프로필, 썸네일, square art. |
| 3:4 | `3 / 4` (0.75) | 세로 포트레이트, 모바일 image. |
| 21:9 | `21 / 9` (≈2.33) | 시네마틱 와이드, dashboard 그래프. |
| 2:1 | `2` | banner, hero (덜 와이드). |

비표준 비율(예: `1.618` 황금비)도 자유 사용 — `ratio` prop은 number 허용.

## Sizes

Aspect Ratio는 **size variant 없음** — 폭은 부모 컨테이너가 결정. 사용처에서 `max-w-*` 또는 명시적 width로 폭 조정.

| 항목 | 값 | 토큰/규칙 |
|---|---|---|
| Width | 부모 100% | (자동 — 부모에서 `max-w-*` 결정) |
| Height | `width / ratio` | (자동 계산) |
| Background (placeholder) | `surface-input` | `bg-surface-input` (자식이 결정) |
| Radius (사용처) | `radius-md` 또는 `radius-lg` | (자식 또는 wrapper에서) |
| `object-fit` (img) | `cover` (잘림) / `contain` (여백) | `object-cover` / `object-contain` |

## States

Aspect Ratio는 **state 없음** — 정적 layout primitive.

## Layout

**Media wrapper**

- `<AspectRatio ratio={16/9}><img className="object-cover" /></AspectRatio>` — 동영상, hero banner, listing thumbnail.

**Placeholder (이미지 로딩 전)**

- 로딩 전 `bg-surface-input` + 중앙 "image"/icon — 사용자가 박스 크기 즉시 인식, CLS(Cumulative Layout Shift) 방지.

**Card thumbnail**

- Card 최상단에 `<AspectRatio>` — 카드 폭에 맞춰 자동 비율. card 라운드는 외곽 [`Card`](card.md)가 담당, AspectRatio는 비율만.

**Avatar grid**

- 1:1 비율 + `rounded-full` — circular avatar grid. [`Avatar`](avatar.md)와 별개로 비율만 보장 시 사용.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| 모든 인터랙션 | **없음** — 정적 layout primitive. focus 불가, click 무반응(자식이 처리). |
| Resize | 부모 폭 변경 시 자동으로 ratio 유지 비율 height 재계산. CSS `aspect-ratio` property 네이티브 동작. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.1.1** Non-text Content | img/video 자식 — `alt`/`<track>` 등 의미 전달은 **자식 책임**. AspectRatio는 layout primitive라 ARIA 없음. |
| **WCAG 1.4.10** Reflow | 반응형 — 부모 폭이 줄어들면 height도 비율 유지하며 줄어듦 ✓ |
| **CLS (Web Vitals)** | 이미지 로딩 전 박스 크기 보장 — Cumulative Layout Shift 0 ✓ |
| **ARIA** | Radix가 별도 role 부여 안 함(시각 wrapper). 자식이 `<img>` 등 시맨틱 요소면 그 자체로 충분. |

## Do / Don't

### ✅ Do

- 동영상/이미지/iframe wrapper — 콘텐츠 로딩 전후 박스 크기 보장.
- placeholder 톤(`bg-surface-input`) — 로딩 전 사용자 인지.
- Card thumbnail 최상단에 16:9 — listing 패턴 표준.
- 1:1 + `rounded-full` — circular avatar 비율 보장.
- 비율은 콘텐츠 의미에 맞게 — 동영상 16:9, 프로필 1:1, 모바일 portrait 3:4.

### ❌ Don't

- 부모 width 없이 단독 사용 — `width:0`으로 collapse. 부모 `max-w-*` 또는 grid cell 필수.
- AspectRatio 자체에 padding — children이 `inset:0`로 박스 채움. padding은 자식 안에서.
- 비표준 비율 남발 — 페이지 안 비율 종류 많으면 시각 위계 깨짐. 페이지당 1–2 비율로 통일.
- 이미지 fit 미지정 — `object-cover` 또는 `object-contain` 명시. 미지정 시 stretch.

## Migration notes

- 기존 `aspect-ratio.tsx`는 Radix Primitive 그대로 export — 스타일 0. 변경 없음(이미 SoT).
- preview-html에 별도 `.ar-*` CSS 없음 — site preview/component page에서 직접 렌더. preview-html 안 `.hero-card-art` (Hero 카드 아트 박스)가 같은 비율 패턴(`aspect-ratio:16/9` 등) 사용.
- examples mjs `Card with image` 시나리오 — 기존 `border: 1px solid var(--color-border-default)` 외곽 + `border-radius: var(--radius-lg)` 패턴이 [`Card`](card.md) spec(border 제거, shadow-only)과 어긋남. **card.md SoT 정합으로 정정** — border 제거 유지하되, `box-shadow: var(--shadow-sm)`만으로 elevation.
