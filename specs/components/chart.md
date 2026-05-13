# Chart

> 데이터 시각화 wrapper — `recharts` 베이스 + shadcn `ChartContainer`/`ChartTooltip`/`ChartLegend`. **Porest chart palette 10색**(red/orange/yellow/green/blue/indigo/violet/pink/brown/gray) + 각각 light 변형으로 categorical 분류·추세·비율 시각화. ChartConfig + ChartStyle dynamic CSS injection으로 `--color-{key}` 자동 생성.

Porest Chart는 **단일 컴포넌트 spec × Recharts chart 종류 다양화** 매트릭스로 정의됩니다. shadcn의 `ChartContainer` 시각(`aspect-video` + grid/axis 색 자동 정합) + `ChartTooltipContent`(`surface-default` + border + `radius-sm` + `shadow-md`) 그대로 채택. **색은 `--color-chart-{name}` 의미 기반 10색**을 ChartConfig `color: "var(--color-chart-red)"` 인용으로 사용 — shadcn 표준 `chart-1`/`chart-2` 인덱스 명명 대신 의미 기반(Porest 토큰 명명 원칙).

## Anatomy

```
┌──────────────────────────────────────────┐
│ ⓐ ChartContainer (aspect-video)          │
│  ┌────────────────────────────────────┐  │
│  │ ⓒ Axis (tick text-secondary)        │  │
│  │     Grid (line border-default/50)   │  │
│  │                                     │  │
│  │  ┌──┐                               │  │
│  │  │  │  ┌──┐    ⓓ Bar/Line/Area       │  │
│  │  │  │  │  │   (fill: chart-{name})   │  │
│  │  └──┘  └──┘                          │  │
│  │  ─────────────────────────           │  │
│  │  월   화   수   목                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌─────────────────────────────────┐     │
│  │ ⓔ ChartTooltipContent           │  ← hover 시 floating
│  │  ● 매출        ₩1,284,500       │
│  └─────────────────────────────────┘     │
└──────────────────────────────────────────┘
```

| ⓐ ChartContainer | `<div data-chart={chartId}>` — `flex aspect-video justify-center text-text-primary` + Recharts inline class override(`[&_.recharts-cartesian-axis-tick_text]:fill-text-secondary` 등). 자식 `ResponsiveContainer` wrap. |
| ⓑ ChartStyle | dynamic `<style>` — config `color`/`theme`별 `--color-{key}` CSS variable 자동 생성. light/dark 자동 분기. |
| ⓒ Axis / Grid | Recharts `XAxis`/`YAxis`/`CartesianGrid` — tick 텍스트는 `text-secondary`, grid line은 `border-default 50% opacity`. |
| ⓓ Series (Bar/Line/Area/Pie/Radial 등) | `fill`/`stroke` props에 `var(--color-chart-{name})` 인용. 또는 ChartConfig + `var(--color-{key})` (key는 dataKey와 매칭). |
| ⓔ ChartTooltipContent | floating tooltip — `grid min-w-[8rem] items-start gap-[var(--spacing-xs)] rounded-sm border border-border-default bg-surface-default px-[var(--spacing-md)] py-[var(--spacing-sm)] text-label-sm` + `style={{ boxShadow: "var(--shadow-md)" }}` inline. indicator(dot/line/dashed) + 시리즈명 + value(`tabular-nums`). |
| ⓕ ChartLegend | Recharts `Legend` — 차트 하단 시리즈 라벨. |

**규칙**

- **색은 항상 `--color-chart-{name}` 10가지 의미 기반 토큰 인용** — `red`/`orange`/`yellow`/`green`/`blue`/`indigo`/`violet`/`pink`/`brown`/`gray`. shadcn `chart-1`~`chart-5` 인덱스 명명은 **사용 안 함** (Porest 토큰 명명 원칙).
- ChartConfig에서 `color` 또는 `theme.{light,dark}` 정의 — `ChartStyle`이 자동으로 `--color-{key}` CSS variable 생성. 사용처는 `var(--color-{key})` 인용.
- 다크 모드는 `chart-{name}-light` 변형 자동 매핑 — `ChartConfig.theme: { light: "var(--color-chart-red)", dark: "var(--color-chart-red-light)" }` 패턴.
- categorical 차트(`Bar`/`Pie`)는 시리즈 N개에 따라 10색 분배 — 6개 이하면 첫 6색(red→orange→yellow→green→blue→indigo), 10개까지 자유.
- 추세 차트(`Line`/`Area`)는 시리즈 1–3개 — 단일 시리즈는 `chart-blue`/`chart-green` 기본, 비교 시리즈는 보색 분리(`chart-blue` + `chart-orange`).
- ChartTooltipContent box-shadow는 inline `style={{ boxShadow: "var(--shadow-md)" }}` — [`Popover`](popover.md) / [`Dropdown Menu`](dropdown-menu.md)와 동일 다크 모드 fix 패턴.

## Variants

Chart는 **variant 없음** — Recharts chart 종류(`Bar`/`Line`/`Area`/`Pie`/`Radial`/`Scatter`)로 분기. ChartContainer 시각은 모든 종류에 공통.

| Recharts 종류 | 주 사용처 | 색상 활용 |
|---|---|---|
| `BarChart` | 카테고리 비교, 빈도 분포 | categorical 10색 분배 |
| `LineChart` | 시간 추세 | 단일 시리즈는 `chart-blue`/`chart-green` |
| `AreaChart` | 누적 / 비율 추세 | `chart-{name}` + 30% opacity fill |
| `PieChart` / `DonutChart` | 비율 / 분포 | categorical 10색 |
| `RadialBarChart` | 진행률 / KPI | `chart-green` (긍정) / `chart-red` (부정) |
| `ScatterChart` | 상관 관계 | `chart-{name}` 시리즈별 |

## Sizes

Chart는 **size variant 없음** — ChartContainer는 `aspect-video` (16:9) 기본. 사용처 className으로 `aspect-square` / `h-*` override 가능.

| 항목 | 값 | 토큰/규칙 |
|---|---|---|
| Container aspect | 16:9 | `aspect-video` (사용처 override 가능) |
| Tick text color | `text-secondary` | (inline class override) |
| Grid line | `border-default 50%` | (inline class override) |
| Tooltip min-width | 128px | `min-w-[8rem]` |
| Tooltip padding | 12 × 8 | `px-[var(--spacing-md)] py-[var(--spacing-sm)]` |
| Tooltip border | 1px solid | `border border-border-default` |
| Tooltip radius | 4px | `rounded-sm` |
| Tooltip shadow | shadow-md (inline) | `style={{ boxShadow: "var(--shadow-md)" }}` |
| Tooltip font | label-sm + tabular-nums | `text-label-sm` + `font-mono tabular-nums` (value) |
| Indicator (dot) | 10×10 + radius 2 | `h-2.5 w-2.5 rounded-[2px]` |
| Indicator (line) | 4×height | `w-1` |
| Indicator (dashed) | border 1.5 dashed | `w-0 border-[1.5px] border-dashed bg-transparent` |
| Legend gap | 8 | `gap-[var(--spacing-sm)]` (Recharts 기본) |

## Chart Palette (10색)

| Token | Hex (light) | Hex (dark) | 권장 카테고리 |
|---|---|---|---|
| `chart-red` | `#C73838` | `#ECA0A0` | 위험·감소·error |
| `chart-orange` | `#B36418` | `#E8B266` | 경고·임박 |
| `chart-yellow` | `#8C7400` | `#D4B83A` | 주의·노란 카테고리 |
| `chart-green` | `#2D8060` | `#6BCB86` | 성장·성공·growth |
| `chart-blue` | `#2C70BF` | `#7BBBED` | 정보·neutral 기본 추세 |
| `chart-indigo` | `#5E60C8` | `#ABB0F0` | 보조 추세·analytics |
| `chart-violet` | `#8B4DBA` | `#D2A8EC` | premium·창의 |
| `chart-pink` | `#B83B7A` | `#ECA0BC` | HR·social |
| `chart-brown` | `#9A6536` | `#DCB088` | 안정·legacy |
| `chart-gray` | `#6B7484` | `#B5BBC5` | 비활성·기타 |

**대비비**: 모든 chart 색은 텍스트(`text-on-accent` white)와 WCAG AA 4.5:1+ 충족 (DESIGN.md `Chart palette` 검증). 다크 모드 `*-light` 변형은 `text-text-primary-dark` 또는 어두운 보색 텍스트와 페어.

**분배 권장 (categorical)**:
- 2개: blue + orange (보색)
- 3개: red + green + blue (의미 분기) 또는 blue + orange + indigo (보색 + 보조)
- 5개: red → green → blue → violet → orange (hue 분산)
- 10개: 정의 순서대로

## States

| State | 시각 |
|---|---|
| `default` | 시리즈 색 그대로 |
| `active` (hover bar/dot) | Recharts native — 시리즈 색 + 옅은 highlight |
| `tooltip open` | 호버한 데이터 포인트 위 floating tooltip |
| `legend hover` (옵션) | 다른 시리즈 fade-out (Recharts 별도 설정) |

## Layout (한국 도메인 패턴)

**HR — 부서별 인원 분포 (BarChart)**

- 부서 5–7개 카테고리 × 인원수 — `chart-red`/`orange`/`yellow`/`green`/`blue`/`indigo`/`violet` 순 분배. ChartTooltipContent: 부서명 + `tabular-nums` 인원수.

**HR — 직급별 분포 (DonutChart)**

- 직급 4–6개 카테고리 — 인원 비율. categorical 10색 분배. 중앙 총 인원수(`text-display-sm`).

**Desk — 가계부 월별 추세 (LineChart)**

- 12개월 × 지출 — 단일 시리즈 `chart-blue`. 보조 시리즈(수입)는 `chart-green`. ChartTooltipContent: 월 + `tabular-nums` 금액.

**Desk — 카테고리별 지출 비율 (PieChart)**

- 카테고리 6–10개(식비/주거/교통/의료/문화/저축...) — 10색 활용. legend로 카테고리명.

**HR — 연간 출근율 (AreaChart)**

- 12개월 × 출근율 — `chart-green` line + 30% opacity fill. 목표선(`chart-orange` dashed) 동반 가능.

**Dashboard KPI (RadialBarChart)**

- 진행률 80% / 110% 등 — `chart-green` (목표 달성) 또는 `chart-red` (미달). 단일 metric 강조.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Hover (bar/line/dot) | 시리즈 highlight + Tooltip open. Recharts native. |
| `Tab` | 시리즈 사이 focus 이동(Recharts `accessibilityLayer` 옵션 필요). |
| `ArrowLeft/Right` (focus 시) | 데이터 포인트 사이 navigate. |
| Legend click | 시리즈 toggle (Recharts native, 옵션). |
| Resize | `ResponsiveContainer`가 자동 재계산. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast (chart 색 × text-on-accent/text-primary) | 10색 모두 4.5:1+ (DESIGN.md 검증) ✓ |
| **WCAG 1.4.11** Non-text contrast (chart 색 × bg-page) | 모든 chart 색 3:1+ ✓ |
| **WCAG 1.4.1** Use of Color | **색 단독 의미 전달 금지** — pattern fill (Recharts `pattern` plugin) 또는 라벨 + 색 두 단서 필수. legend는 라벨 + dot 페어. |
| **WCAG 2.1.1** Keyboard | Recharts `accessibilityLayer={true}` 옵션 권장 — `Tab`/`ArrowLeft/Right`로 데이터 포인트 navigate. |
| **WCAG 2.4.7** Focus Visible | 사용처 결정 — focusable 데이터 포인트에 outline 또는 ring. |
| **WCAG 1.3.1** Info and Relationships | screen reader — `<svg role="img" aria-label="...">` (chart 전체) + `<title>`/`<desc>` (Recharts 자동) 또는 별도 `<table>` for tabular data. |
| **ARIA** | ChartContainer는 `role="img"` 권장. ChartTooltipContent는 `role="tooltip"` (Recharts 자동). |

## Do / Don't

### ✅ Do

- **color는 의미 기반 `chart-{name}`** — `var(--color-chart-red)` 등 직접 인용. ChartConfig에서 `color: "var(--color-chart-red)"`.
- **다크 모드 분기는 `theme: { light, dark }`** — `light: "var(--color-chart-red)"`, `dark: "var(--color-chart-red-light)"`.
- **categorical 분배는 hue 분산** — 5색이면 red/green/blue/violet/orange (보색·근접 회피).
- **추세 차트는 단일 시리즈 우선** — 비교 필요 시 2시리즈 보색(`blue` + `orange`).
- **라벨 + 색 두 단서** — legend는 dot + 텍스트 페어, axis는 텍스트.
- `tabular-nums` 숫자 정렬 — tooltip/legend의 value는 등폭 숫자(`font-mono tabular-nums`).

### ❌ Don't

- **`chart-1`/`chart-2` 인덱스 명명** — shadcn 표준이지만 Porest는 의미 기반 명명. `chart-red`/`chart-orange` 직접.
- **5+ 시리즈 LineChart** — 시각 폭발. 카테고리 분리 또는 다른 chart 종류.
- **유사 hue 인접 사용** — `red` + `orange` 인접 시 색맹 사용자 구분 어려움. hue 분산 권장.
- **색 단독 의미 전달** — WCAG 1.4.1. 라벨/pattern 동반 필수.
- **3D chart / 과도한 animation** — recharts 기본 fade-in만 권장. 과도한 motion은 `prefers-reduced-motion` 위반.

## Migration notes

- 기존 `chart.tsx`는 이미 토큰 정합 — `text-text-secondary` (tick) / `border-default` (grid) / `surface-input` (tooltip cursor fill) / `text-text-primary` (label). 변경 없음.
- **ChartTooltipContent box-shadow inline** — Tailwind `shadow-md` → `style={{ boxShadow: "var(--shadow-md)" }}` 추가 (다크 모드 fix 일관 패턴, Popover/Dialog 등과 동일).
- **chart-examples.mjs 색 토큰 정정** — 추상 `chart-1` ~ `chart-5` 인덱스 인용 → `chart-red`/`chart-orange`/`chart-yellow`/`chart-green`/`chart-blue` 등 의미 기반 직접 인용. shadcn 표준은 인덱스지만 Porest 토큰 명명 원칙(의미 기반) 우선.
- **DESIGN.md 변경 없음** — chart palette 10색은 이미 정의됨(`chart-red` ~ `chart-gray` + light 변형). 새 토큰 추가 0.
- preview-html `--color-chart-{name}`도 의미 기반 사용 중 — site/preview 시각 일관.
- examples 한국 도메인 재작성 — HR 부서별 / Desk 가계부 / Donut / Area 5종 시나리오 추가. `tabular-nums` 명시.
