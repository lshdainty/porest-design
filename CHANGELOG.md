# Changelog

토큰·컴포넌트·도구 변경 기록. [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/) 형식, semver alpha 단계 누적.

`v{N}` 표기는 디자인 시스템 milestone 식별자(`DESIGN.history/v{N}-{이유}.md` 백업과 1:1 대응). `DESIGN.history/v20*` 자동 timestamp 스냅샷은 별개.

## [0.1.0-alpha] — Unreleased

### Tokens (Added)

**v1~v6 — 1차 토큰 인프라 (Color / Typography / Layout / Shape)**
- v1: surface color pairs (`surface-default`/`surface-input` × light/dark)
- v2: text colors (`text-primary`/`text-secondary` × light/dark, `text-on-accent`)
- v3: border colors (`border-default`/`border-strong` × light/dark)
- v4: typography 5종 (`caption`/`body`/`body-strong`/`heading-md`/`heading-lg`)
- v5: 4px-base spacing 5종 (`xs`/`sm`/`md`/`lg`/`xl`)
- v6: rounded 5종 (`sm`/`md`/`lg`/`xl`/`full`)

**v7~v13 — 2차 토큰 (Brand accent / Semantic / Tertiary / Shadow)**
- v7: brand accent dark variants (이후 v8에서 `accent-*-light`로 rename)
- v9: 16 sparse components — lint contrast 자동 검증 활성화 (이전 토큰 추가가 검증 안 되던 문제 해소)
- v10: semantic 4종 (`success`/`error`/`warning`/`info`) + 8 매핑 컴포넌트
- v11: `text-tertiary` (light/dark) — placeholder·caption-tertiary·hint 위계
- v12: 4단계 shadow 레시피 (sm/md/lg/xl, prose-token — spec이 shadow type 미지원)
- v13: `text-disabled` (light/dark) — 1.4.3 incidental 예외 명시

**v16 — Focus ring 분리**
- v16: `border-focus`/`border-focus-light` per brand × surface mode (v3 시점 deferred 해결)

**v20~v25 — Semantic dark / Chart palette / Shadow dark**
- v20: semantic light variants (`success-light`/`error-light`/`warning-light`/`info-light`) — 다크 표면 위 inline 텍스트, 4 페어 lint 4.5:1 통과 검증
- v21~v22: chart palette light surface 10색 base (v21 red/orange/yellow/green/blue + v22 indigo/violet/pink/brown/gray) — L≈0.16-0.18, UI 1.4.11 (3:1) 통과, sparse `chart-color-{name}` 매핑
- v23~v24: chart palette dark surface 10색 변형 (`chart-*-light`, L≈0.45-0.55 — v23 5색 + v24 5색 분리 배치)
- v25: `shadow-*-dark` 4종 (prose-token, Material 3 / Big Sur 패턴 — black opacity ↑ + inset white top highlight)

**v26~v28 — Scale 확장**
- v26: typography `heading-sm` (16/600/1.4) + `heading-xl` (32/700/1.25)
- v27: spacing `2xl` (32px) + `3xl` (48px)
- v28: rounded `xs` (2px) + `2xl` (20px)

**v32 — Motion**
- v32: motion 5종 (prose-token) — `motion-duration-{fast/base/slow/slower}` + `motion-ease-out`

**v54 — Breakpoints (Apple Store reference)**
- v54: breakpoint 5종 prose-token — `breakpoint-{sm,md,lg,xl,2xl}` (640/736/834/1069/1441). Apple Store 톤 (Tailwind default와 다름). `--breakpoint-*` namespace는 Tailwind v4 표준 일치. `scripts/build-tailwind-v4.mjs`에 `parseBreakpoints` 추가, prose 표 직접 추출. Touch targets / Collapsing strategy / Hero typography scale은 reference 가이드만 (토큰화 미적용).

**v59 — Touch targets (WCAG 2.5.5 AAA + Apple Store reference)**
- v59: touch target 5 prose-tokens — `touch-min` (44 WCAG minimum), `touch-pill-w` (100 Pill CTA min-width), `touch-circular` (44 alias), `touch-nav-h` (32 precision desktop), `touch-nav-w` (80). v54 Breakpoints의 reference 가이드를 토큰으로 격상. `scripts/build-tailwind-v4.mjs`에 `parseTouchTargets` 추가, CSS export `--touch-*`. 4의 배수 호환 (44/100/80/32 = 11/25/20/8 × 4). spacing 카테고리와 분리 — touch target은 컴포넌트 outer size, padding/margin과 의미 다름.
- v65: z-index 6 prose-tokens — `z-base` (0), `z-dropdown` (1000), `z-sticky` (1100), `z-drawer` (1200), `z-modal` (1300), `z-toast` (1400). 100 단위 간격 — 중간 layer 삽입 여유. v43 Modal / v45 Dropdown / v46 Toast 등 spec의 prose 표현(최상단/위) 정형 numeric 토큰화. preview HTML `.theme-toggle z-index: 100` hardcode 등 향후 충돌 회피. `scripts/build-tailwind-v4.mjs`에 `parseZIndex` 추가, CSS export `--z-*`. HR(결재 큐 sticky / 직원 detail drawer / modal / toast 우선순위) / Desk(bottom nav sticky / bottom sheet drawer / safe-area-inset, isolation island 격리) brand-specific 적용 가이드.

**v55~v57 — Typography expansion (Airbnb 14단계 reference)**
- v55: display 4종 — `rating-display` (64/700/1.1 letterSpacing -1px), `display-xl` (28/700/1.43), `display-lg` (22/500/1.18 letterSpacing -0.44px), `display-md` (21/700/1.43). 영문 marketing/hero 영역 톤. **letterSpacing modifier export 추가** (`--text-{name}--letter-spacing`).
- v56: title/body/caption-md 5종 — `title-md` (16/600/1.25), `title-sm` (16/500/1.25), `body-md` (16/400/1.5 — 영문 본문, 한국어 `body` 15/1.6와 별도), `body-sm` (14/400/1.43), `caption-md` (14/500/1.29 — Airbnb caption 14, **명명 충돌 회피** 위해 caption-md로).
- v57: caption-sm/badge/uppercase-tag + button-md/nav-link 5종 — `caption-sm` (13/400/1.23), `badge` (11/600/1.18), `uppercase-tag` (8/700/1.25 letterSpacing 0.32px — uppercase는 CSS text-transform), `button-md` (16/500/1.25), `nav-link` (16/600/1.25). caption 3-tier 완성: caption 12 (한국어) / caption-md 14 / caption-sm 13. typography 21 토큰 — Airbnb 14단계 reference 적용 완료.

### Components

**v33~v48 — Component spec batch (16 components, sparse 매핑 자동 검증 활성)**

각 컴포넌트는 sparse 매핑(`{component-name}` 토큰)으로 lint contrast 자동 검증 활성. spec prose는 variant/state/size/a11y 가이드 + 듀얼 브랜드(HR/Desk) 톤 차이 명시.

- v33: Button (variant 3 / state 5 / size 3 / a11y)
- v34: Input (text/number/email/password/search × mode pair)
- v35: Card (variant 4 / padding 3 / shadow guide)
- v36: Page text + Caption (typography hierarchy, secondary/tertiary 위계)
- v37: Badge (semantic 4 + size/shape, sparse fill 매핑)
- v38: Alert text (semantic 4 × 2 mode = 8 페어)
- v39: Focus ring (a11y 2.4.11/12/13 핵심, brand × surface 4 분기)
- v40: Divider + Outline (border-* sparse 사용)
- v41: Disabled label (1.4.3 incidental 예외 명시)
- v42: Chart color palette (10색 × 2 mode, sparse fill 활성)
- v43: Modal (overlay-dim prose-token + 외곽 강조)
- v44: Toast (semantic 4 + auto-dismiss + a11y)
- v45: Tooltip (hover/focus hint, 1.4.13 WCAG)
- v46: Dropdown (Menu/Select/Combobox 공통 패턴)
- v47: Tabs (variant 4 + manual activation)
- v48: Switch / Checkbox / Radio (control 묶음)

브랜드 분기: 일부 컴포넌트 prose에서 HR(B2B 데이터 밀도) vs Desk(B2C 친근 톤) 차이 명시 — Button hover 강도, Card shadow 톤, Tab variant 등.

**v58 — User identification (Avatar)**
- v58: Avatar — 사용자 식별 시각 요소 (이미지 또는 이니셜 + chart palette categorical). size 4단계 (sm 24 / md 32 / lg 40 / xl 56), shape 원형 default + 사각 변형 (HR 데이터 그리드), status indicator (online/offline), avatar group overlap. **새 토큰 추가 0** — 기존 chart palette + text-on-accent 활용. sparse `avatar` 매핑 (`chart-blue` × `text-on-accent`)로 lint contrast 활성. HR(직원 카드/조직도) / Desk(사용자 프로필/메모 작성자) brand-specific prose.

**v61 — Date selection (Calendar)**
- v61: Calendar — 날짜 선택·표시 컴포넌트 (HR 휴가/근태/평가, Desk 가계부/할일/메모). day cell variant 7종 (default/today/selected/range-start/range-end/range-mid/disabled), size 3단계 (sm 32 / md 36 / lg 40), 7×N grid + month/year navigation header. **새 토큰 추가 0** — 기존 typography(`caption`/`body-strong`/`heading-md`) + radius(`radius-full`) + spacing(`xs`) + brand primary 합성. WCAG ARIA grid (`role="gridcell"`, `aria-selected`, `aria-current="date"`) + 키보드 (화살표/PageUp·Down/Home·End/Enter/Esc). HR(휴가 range, 결재 marker dot, 근태 상태 dot) / Desk(가계부 거래 dot, 할일 due date 강조, swipe gesture) brand-specific prose.

**v62 — Form completeness (Textarea + Form layout)**
- v62: Textarea (multi-line input) + Form layout (control 묶음 layout 가이드). v34 Input "별도(P0-C 신규)" 표기 후 미보충된 multi-line variant + form 일관성 빈틈 채움. **새 토큰 추가 0** — Input 시각 토큰 100% 재사용 (Textarea: min 4line / max 12line / resize vertical / auto-grow + counter), spacing/typography/semantic 토큰 합성 패턴만 정리(Form layout: stacked/horizontal/inline 모드, label-control-helper 위계, validation 시점 4종, fieldset 그룹화, error 흐름 a11y). HR(평가 코멘트, 휴가 사유, 결재 의견, horizontal 데스크탑 form) / Desk(메모 본문 auto-grow, 할일 설명 counter, 가계부 거래 메모, 모바일 stacked 강제, bottom sheet form) brand-specific prose.

**v63 — Loading state (Skeleton + Loop motion)**
- v63: motion 2 prose-tokens — `motion-duration-loop` (1500ms, skeleton/spinner/pulse 1주기), `motion-ease-linear` (반복 일정 속도 — `ease-out` 반복은 끝에 멈춰 어색). v32 (단발 전환) 보완 → 반복 사용 사례. `scripts/build-tailwind-v4.mjs` `parseMotion`이 자동 추출 (스크립트 변경 0).
- v63: Skeleton / Loading 컴포넌트 — 4 variant (text / circle / rect / list-row), shimmer gradient (`surface-input` ↔ `surface-default`) + pulse fallback, layout shift 0(실측 컴포넌트 사이즈 일치), CLS 페이드 전환 `motion-duration-fast` 150ms. WCAG 2.2.2 Pause/Stop/Hide(데이터 도착시 자동 정지, 5초 timeout) + 2.3.3 Reduced motion(`prefers-reduced-motion: reduce` 시 단색 fallback) + `aria-busy="true"` + `aria-live="polite"`. **새 yaml 컴포넌트 0** — skeleton은 텍스트 없는 표면 placeholder, contrast 페어 미발동(prose-only spec). HR(결재 큐 list-row, 직원 검색, dashboard 위젯 단위, 5초 timeout link) / Desk(메모 카드, 할일 list-row, 가계부 dashboard top-down, 모바일 친화 + pulse 저성능 fallback) brand-specific prose.

**v67 — System completeness batch (Pagination + Drawer + Spinner + Stepper)**
- v67: 시스템 빈틈 4 컴포넌트 추가 — 모두 prose-only spec (yaml 변경 0).
  - **Pagination**: 3 variant (numbered / prev-next / load-more), 3 size (sm/md/lg), state 5종, ARIA navigation + aria-current="page" + aria-live 검색 갱신 알림.
  - **Drawer / Sheet**: 4 variant (side-right/left / bottom / top), `z-drawer` (v65) 활용, motion-duration-slow 슬라이드 + overlay-dim, focus trap + Esc dismiss + return focus + scroll lock. bottom drawer swipe-down 30% threshold.
  - **Spinner / Progress**: circular spinner indeterminate (4 size, primary + primary-light dark) / linear progress determinate·indeterminate / circular progress determinate. motion-duration-loop (1500ms) linear 회전. ARIA role="status" / "progressbar" + aria-valuenow.
  - **Stepper**: 3 variant (horizontal / vertical / simple progress), state 5종 (completed/current/pending/error/disabled), connector line semantic 색, sequential vs free navigation, ARIA aria-current="step" + ordered list semantic.
- HR(결재 단계 horizontal sequential / 직원 detail side drawer / numbered pagination 데이터 그리드 / 결재 처리 inline spinner) / Desk(가계부 distinct bottom sheet / load-more 모바일 / 메모 저장 spinner / vertical stepper 4단계) brand-specific prose.

**v68 — Navigation batch (shadcn 확장 series 1/4)**
- v68: 5 navigation 컴포넌트 prose-only — Breadcrumb / Sidebar / Navigation Menu / Menubar / Command (Cmd+K). 모두 새 yaml 컴포넌트 0 (기존 토큰 합성).
  - **Breadcrumb**: 페이지 위계 경로, separator `/`, 4+ segment truncation, `aria-current="page"`.
  - **Sidebar**: fixed (240-280px) / collapsible (펼침 240 ↔ 접힘 64) / floating (모바일 drawer). active state primary 좌측 stroke.
  - **Navigation Menu**: single-level (header link) / mega menu (multi-column panel + featured promo). hover intent 200ms delay.
  - **Menubar**: 데스크탑 application metaphor (File/Edit/View). Alt+key shortcut, `role="menubar"`, keyboard-first.
  - **Command (Cmd+K)**: 전역 search/action menu, sections grouping (Suggestions/Pages/Actions), filter typing, `role="dialog"` + listbox + activedescendant.
- HR(Sidebar fixed 데스크탑 + Menubar 결재/평가 application + Command 직원 검색) / Desk(Sidebar floating 모바일 drawer + Command 메모 fuzzy search) brand-specific prose.

**v69 — Input batch (shadcn 확장 series 2/4)**
- v69: 5 input/selection 컴포넌트 prose-only — Combobox / Slider / Toggle / Toggle Group / Input OTP.
  - **Combobox**: Input + Dropdown 결합, typing autocomplete + 선택, role=combobox + listbox + activedescendant. v45 Dropdown combobox variant 확장.
  - **Slider**: track 4px + thumb 16 circle, single/range, hit area touch-min 44 padding, role=slider + aria-valuenow.
  - **Toggle**: 단일 button on/off (icon/text/icon-text), aria-pressed. Switch와 의미 차이 (formatting/filtering vs setting).
  - **Toggle Group**: single (radiogroup) / multiple. 인접 button radius join.
  - **Input OTP**: 6자리 분할 input, autocomplete="one-time-code" SMS 자동 채우기, paste 일괄 처리.
- HR(Combobox 직원 검색 / Slider 평가 점수 / Toggle Group 결재 상태 필터) / Desk(Combobox 태그 자동완성 / Slider 가계부 예산 / Toggle 메모 즐겨찾기) brand-specific prose.

**v70 — Disclosure batch (shadcn 확장 series 3/4)**
- v70: 5 disclosure/overlay 컴포넌트 prose-only — Accordion / Collapsible / Hover Card / Context Menu / Alert Dialog.
  - **Accordion**: 다중 Collapsible (single/multiple), height 트랜지션 motion-duration-base, role=region + aria-expanded.
  - **Collapsible**: 단일 expand/collapse — Accordion보다 가벼운 toggle.
  - **Hover Card**: hover preview card (Tooltip+Card 합성), 200-300ms hover delay, mobile은 long-press 대체.
  - **Context Menu**: right-click(데스크탑) / long-press(모바일) menu, viewport flip, destructive 분리.
  - **Alert Dialog**: Modal destructive 변형 — primary error 색, focus initial은 secondary(취소), role="alertdialog".
- HR(Accordion 결재 detail / Hover Card 직원 mini profile / Context Menu 결재 row / Alert Dialog 권한 회수) / Desk(Accordion FAQ / Context Menu 메모 long-press / Alert Dialog 메모 영구 삭제 + OTP 결합) brand-specific prose.

**v71 — Data batch (shadcn 확장 series 4/4 — 마지막)**
- v71: 5 data display 컴포넌트 prose-only — Table / Data Table / Carousel / Scroll Area / Resizable.
  - **Table**: 기본 표 (default/compact/striped variant), thead `caption` uppercase + tbody hover, cell type별 정렬(text/number/date/action/status).
  - **Data Table**: Table + sortable(`aria-sort`)/filterable/selectable/pagination/column resize·reorder, bulk actions sticky bar, empty state + Skeleton loading.
  - **Carousel**: single/multi/infinite variant, scroll-snap viewport + arrow + dot indicator, `aria-roledescription="carousel"` + slide grouping, autoplay pause 컨트롤(2.2.2).
  - **Scroll Area**: custom scrollbar (always-visible/hover/scrolling 3 variant), webkit-scrollbar + Firefox scrollbar-color, native scroll 보존.
  - **Resizable**: drag-able split (horizontal/vertical/nested), `role="separator" aria-orientation` + aria-valuenow, localStorage persistence.
- HR(Data Table 결재/직원 그리드 핵심 + Resizable 3-pane layout + Scroll Area sticky thead) / Desk(Carousel onboarding hero + Table 가계부 거래 + Scroll Area 메모 본문) brand-specific prose.

**shadcn 확장 4 series 완료** — 총 20 컴포넌트 (v68 navigation 5 + v69 input 5 + v70 disclosure 5 + v71 data 5). 시스템 컴포넌트 75+ 보유 (기존 55 + v68-v71 batch).

**v81 — EXAMPLES.md → 인터랙티브 HTML (build-examples-html.mjs)**
- v81: `scripts/build-examples-html.mjs` 신규 — `EXAMPLES.md`를 컴포넌트별 copy-paste 페이지로 변환. 단일 markdown 파서 inline(headings/paragraphs/lists/tables/code blocks/inline code/links — 외부 의존성 0). 각 code block에 "Copy" 버튼 + clipboard API 호출. Code language label, hover/copied state(success 색 토글).
- 토큰 통합: `exports/tokens.css` 인라인 — 페이지 전체 색상/타이포/spacing이 디자인 시스템 토큰 사용. `[data-theme="dark"]` toggle button + localStorage 기억(다른 preview들과 동일 cadence). 스타일 mode-aware — code block / table / heading 모두 dark pair 분기.
- `package.json` `build:examples` 스크립트 추가 — `npm run build:examples` → `exports/examples.html` 생성.
- 결과: 24+ section(Button/Input/Select/Checkbox/Card/Badge/Banner/Toast/Modal/Drawer/Tabs/Accordion/Tooltip/Popover/Dropdown/Skeleton/Pagination/Avatar/Breadcrumb/Sidebar/Form/Calendar/Treeview/File Upload/Empty state/Animation patterns) navigable HTML page, 각 code block copy-able.

**v80 — Preview HTML v73-v78 시각 데모**
- v80: `scripts/build-preview-html.mjs`에 `renderBatchV73V78` 추가 — v73 5종(Banner / Tag-Chip / Popover / File Upload / Treeview) + v74 Animation showcase(8 cell — fade-in/slide-in-up/scale-in/bounce-in/shake/spin/pulse/shimmer 라이브) + v75 Form validation 5 state(idle/focused/invalid/valid/validating) + v76 RTL 토글(`dir="rtl"` 스위치) 시각 데모.
- 새 CSS class 80+ 추가 — banner(info/warning/error/success variant), chip(input + closeable), pop(textarea + actions), fu-zone(드래그-드롭) + fu-list(progress bar), tv(treeview hierarchical), anim-box(8 keyframe 매핑), fv-input(idle/focused/invalid/valid + spinner), rtl-demo(`dir` 토글). 모두 v74 keyframe + logical property 활용.
- inline JS 추가 — animation replay button(`offsetWidth` reflow 트릭으로 키프레임 재실행), RTL `dir` 토글, Banner dismiss. 외부 의존성 0 — vanilla JS.
- `prefers-reduced-motion: reduce` 일괄 처리 — animation 일시 정지 권장 코드 적용.
- 결과: 3 brand HTML(preview.html / preview.hr.html / preview.desk.html) 모두 v73-v76 6 milestone 시각 데모 추가, 토큰 카탈로그(하단)와 함께 노출. Banner 메시지·tag samples·popover 헤드·tree root 모두 brand별 분기.

**v79 — Tailwind v4 export 확장 (keyframes 자동 추출 + test 강화)**
- v79: `scripts/build-tailwind-v4.mjs`에 `parseKeyframes` 추가 — DESIGN.md v74 Animation library `#### CSS keyframes 정의` 아래 `\`\`\`css ... \`\`\`` 블록 추출, 각 `@keyframes name { ... }` 블록 brace-balanced parser로 분리(중첩 1 level 처리). `@theme {}` 외부 root level에 출력. brand-neutral baseline이라 brand 파일(HR/Desk) 빌드 시 fallback으로 DESIGN.md 직접 read.
- 결과: `exports/tokens.css` / `tokens.hr.css` / `tokens.desk.css` 모두 14 keyframe(fade-in/out, slide-in-{up,down,left,right}, scale-in/out, bounce-in, shake, spin, pulse, shimmer, ping) 자동 포함. `animation: fade-in var(--motion-duration-base) var(--motion-ease-out)` 컴포넌트 spec 그대로 사용 가능.
- `scripts/test-tailwind-export.mjs` namespace 검증 확장 — breakpoint(≥5) / touch(≥5) / z-index(≥6) / @keyframes(≥14) 4 카테고리 추가. v54/v59/v65/v74 export coverage drift detection.
- 추가 비용 0 — prose CSS code block을 그대로 산출, 별도 keyframe 정의 중복 회피.

**v78 — Prose health pass 2 (spec table inline hex 정정)**
- v78: spec 표 안 inline parenthetical hex(`token` (`#hex`)) 17건 정정 — v51-v53 vivid refresh 후 prose 표가 v10/v20 base를 그대로 인용하던 잔존 outdated reference. DESIGN.md(16건) + DESIGN.hr.md(1건) — Input error border, Badge variant 4종, Alert text light/dark variants 8종, Toast variant 4종. 정확한 현재 contrast ratio 동시 갱신(success 5.86→5.01 / error 5.34→4.83 / warning 5.27→4.64 / info 6.31→5.01 light, dark는 5.85→9.42 / 5.42→5.93 / 5.83→7.25 / 5.80→6.46).
- `scripts/lint-prose.mjs` 확장 — extractProseHexCitations에 (B) inline parenthetical 패턴(`token` (`#hex`)) 검출 추가. (A) 표 row 패턴(이전 검사)은 fromTableRow 옵션 분리하여 ≥2 hex line이면 migration 표로 자동 skip(보수적 유지). spec 표는 1-cell 안 paren hex로 쓰는 패턴이라 history skip 영향 안 받음. 결과 — hex 인용 카운트 34→96(DESIGN.md), 4→24(HR), 4→18(Desk).
- HR 1건 추가 정정: Input error 행 contrast 표기 변경 — `error vs surface-input = 5.34:1` (vs `#FFFFFF` 5.47 오기재) → `border vs surface-input = 4.31:1` (1.4.11 UI 3:1 통과 명시), 의미 명확화.
- v66(brand semantic refresh prose 변환)와 형제 관계 — v66은 brand 파일(HR/Desk) "이전→현재" 변천 표 변환, v78은 spec 표 inline 인용 갱신.

**v77 — Component usage examples (EXAMPLES.md)**
- v77: `EXAMPLES.md` 신규 추가 — 24 컴포넌트 카테고리 copy-paste 가능한 HTML markup + Tailwind v4 utility class snippet (Button/Input/Textarea/Select/Combobox/Checkbox/Radio/Switch/Card/Badge/Tag-Chip/Banner/Toast-Sonner/Modal/Drawer/Tabs/Accordion/Tooltip-Popover-HoverCard/Dropdown/Skeleton-Spinner-Progress/Pagination-Stepper/Avatar/Breadcrumb-Sidebar/Form layout+validation/Calendar/Treeview/File Upload/Empty state/Animation patterns).
- 추가 이유: spec 정의(`DESIGN.md`)는 *what/why* 위주, EXAMPLES는 *how* — 사용자가 "shadcn 정도로 가져다쓰면 될 정도" 요구에 응답. 토큰 alias 표 + Tailwind class binding + ARIA attribute 세트 + 키보드 패턴 명시.
- 새 토큰 0, 새 yaml 컴포넌트 0 — 별도 docs 파일.
- `motion-duration-loop` linear / `cubic-bezier(0, 0, 0.2, 1)` ping / `cubic-bezier(.36,.07,.19,.97)` shake 등 v74 keyframe 응용 CSS snippet 동봉. `prefers-reduced-motion` 일괄 처리 권장 코드.

**v76 — RTL support (CSS logical properties)**
- v76: LTR(한국어/영어/일본어) ↔ RTL(아랍어/히브리어) 자동 분기 prose-only 가이드 — 18 logical property 매핑 표(`margin-inline-start`/`padding-inline-end`/`border-start-start-radius`/`inset-inline-*`/`text-align: start|end`/`inline-size`/`block-size` 등 physical → logical 1:1) + `dir="rtl"` HTML 속성 + 6 direction-specific 처리(drawer / chevron / breadcrumb / progress / 숫자 / URL) + 9 컴포넌트별 RTL 가이드(Button/Input/Dropdown/Tabs/Drawer/Breadcrumb/Toast/Banner/Calendar) + Tailwind v4 logical utility(`me-*`/`ms-*`/`pe-*`/`ps-*`/`text-start`/`text-end`/`start-0`/`end-0`/`rtl:`) 활용.
- 추가 이유: Porest 1차 한국어 시장이지만 향후 글로벌 확장 시 vendor 이중 작업 회피 — 신규 컴포넌트 spec 작성 시점부터 logical 우선이면 spec 자체 변경 불필요. 추가 비용 0(동일 syntax).
- WCAG 1.4.10 Reflow + 1.4.8 Visual Presentation 친화. lint 비대상.
- HR(결재 큐 sticky 우측 → RTL 좌측, 직원 detail drawer slide direction 분기, 사번 LTR 강제) / Desk(메모 카드 swipe direction `:dir(rtl)` 분기, 통화기호+숫자 `<bdi>` LTR 유지, 모바일 bottom sheet block 축 무관) brand-specific 컨텍스트.
- Migration: 이번 v76엔 기존 spec 변환 미시행 — 문서만. 신규/수정 시점에 logical 우선 점진 적용.

**v75 — Form validation patterns**
- v75: Form layout(v62)을 확장한 **validation 깊이** prose-only — 8 rule(required/min-max-length/min-max numeric/pattern/email/match/async/custom) + 한국어 error message 템플릿 + 5 field state(idle/focused/invalid/valid/validating) + form state machine(idle→submitting→success/error, validating-async 분기) + 3 error 위계(field-level/form-level banner/toast) + ARIA live(`role="alert"`/`aria-live="polite|assertive"`/`aria-busy`) + async pattern(debounce 500ms + AbortController) + multi-field(confirm match/date range/conditional required/mutually exclusive).
- 추가 이유: v62는 layout/timing 골격, v75는 rule + message + state + ARIA 깊이 — 컴포넌트 spec에서 "validation v75 참조" 인용 가능.
- 새 토큰 0, 새 yaml 컴포넌트 0 — prose-only.
- HR(사번 unique async / 휴가 일수 multi-field / 결재라인 conditional / 격식체 "입력해주세요") / Desk(가계부 금액 range / 메모 550자 max-length / 회원가입 이메일 async / 친근체 "이에요/예시" 부분 적용) brand-specific.

**v74 — Animation library (keyframes + 사용 패턴)**
- v74: 14 정형 keyframe prose-token — 단발 10(`fade-in`/`fade-out`/`slide-in-{up,down,left,right}`/`scale-in`/`scale-out`/`bounce-in`/`shake`) + loop 4(`spin`/`pulse`/`shimmer`/`ping`). 권장 duration(`motion-duration-{fast,base,slow,slower,loop}`) + ease 매핑 표 + CSS keyframes 정의 + `animation` shorthand 패턴 (Toast/Modal/Skeleton/Spinner/Notification dot/Form error 등 7 사용 사례).
- 추가 이유: v32(duration/ease) + v63(loop) → 컴포넌트 spec에서 keyframe 직접 작성 반복 누적, shadcn/ui + Material + Toss 표준 합집합 정형화.
- WCAG: 2.3.3(`prefers-reduced-motion: reduce` 일괄 처리 권장 코드 명시) + 2.2.2(loop 자동 정지/cancel).
- HR(결재 row fade-in / Toast slide-in-down / Modal scale-in / Drawer slide-in-left / 절제 톤, bounce 제한) / Desk(메모 카드 scale-in / Bottom sheet slide-in-up / 할일 완료 bounce-in / Notification ping / 모바일 친근 톤) brand-specific 적용.
- prose-token이라 lint 비대상. 컴포넌트 spec에서 keyframe 이름 인용 (오타 시 silent failure).

**v72 — Extras batch (Sonner/Aspect Ratio/Chart/Date Range Picker/Time Picker)**
- v72: 5 추가 컴포넌트 prose-only — shadcn 외 자주 사용 패턴 보강.
  - **Sonner**: multi-toast stack, position 4종(top/bottom × left/center/right), max 3 + collapsed +N, hover stack pause, 5/7/10s auto-dismiss kind별, undo action 5s. v46 Toast의 상위 패턴.
  - **Aspect Ratio**: 비율 wrapper utility (16:9 default, 4:3, 1:1, 3:2, 21:9, 9:16). CSS aspect-ratio + padding-bottom fallback + object-fit cover.
  - **Chart**: 6 variant (bar/stacked-bar/line/area/pie/scatter), chart-* palette categorical 분배 + dark mode chart-*-light 자동 alias, brand primary 충돌 회피(HR chart-green / Desk chart-blue 비활성), `<table>` a11y 동반 + pattern fill 옵션.
  - **Date Range Picker**: Calendar v61 range variant 활용, preset list (오늘/어제/지난 N일/이번 달), single picker(모바일) / dual picker(데스크탑).
  - **Time Picker**: input only / dropdown picker / wheel picker(모바일 native), step 5/15/30분, 24h/12h format, role=listbox 커스텀 + native input type=time.
- HR(Sonner top-right 결재 알림 / Chart bar/line dashboard / Date Range dual / Time 5분 step) / Desk(Sonner bottom-center 모바일 / Chart pie 가계부 / Aspect Ratio 16:9 attachment / Time wheel picker) brand-specific prose.

**v73 — Extras-2 batch (Banner/Tag·Chip/Popover/File Upload/Treeview)**
- v73: 5 추가 shadcn 누락 컴포넌트 prose-only — Phase 1 (Final-1) 완성 신호.
  - **Banner**: 페이지 상단 영구 알림(Toast=임시와 구별), variant 4(info/success/warning/error), dismiss 후 localStorage `dismissed-banner-{id}` 영구 기억, sticky 영역 위치(header 아래).
  - **Tag / Chip**: closeable variant + input variant, multi-tag 입력 패턴, dropdown 자동완성 결합, Badge(v37 정적)와 구별 — 사용자 mutable.
  - **Popover**: bottom-start placement default, click trigger default, Hover Card(v70)/Dropdown(v45)와 구별 — interactive form content 가능. 모바일 자동 bottom sheet 전환.
  - **File Upload**: 드래그-드롭 + click-to-browse, 진행률 bar + multi-file list, 허용 type/size 제약(client-side validation), 카메라 capture(`accept="image/*" capture`).
  - **Treeview**: hierarchical list, expand/collapse + selected, ARIA `aria-expanded`/`aria-level`/`aria-setsize`/`aria-posinset`, 키보드 arrow 네비, 검색 동기화 자동 expand + highlight.
- HR(Banner 약관 변경 / Tag 결재라인 chip / Popover 결재 의견 / File Upload 평가 첨부 / Treeview 조직도) / Desk(Banner 시스템 점검 / Tag 메모 태그 input / Popover 카테고리 quick edit / File Upload 영수증 다중 / Treeview 가계부 카테고리) brand-specific prose. shadcn/ui 카탈로그 거의 100% coverage.

### Changed
- **v8**: `accent-*-on-dark` → `accent-*-light` rename — `-dark` suffix가 mode pair 표기와 충돌(예: `accent-hr-on-dark` vs `surface-default-dark`)
- **v14 → v15**: HR/Desk별 `bg-page` fork 시도 → `#F5F6FA` 통일 회귀 — fork 시 `primary-hr` × `bg-page-hr` 인라인 4.14:1(AA 미달) 발생
- **v17**: 단일 `DESIGN.md` → shared baseline + `DESIGN.{hr,desk}.md` self-contained 3파일 분리. 이유: spec이 cross-file `{colors.X}` reference 미지원 → brand context 암묵 명명(`primary` 등) 사용 가능, lint missingPrimary warning 해소(brand 파일 0 warnings).
- **v51**: semantic 4 base vivid refresh — `success` `#117A3A`→`#16803F` (emerald, green-700), `error` `#C53030`→`#DC2626` (red-600), `warning` `#A85800`→`#C2410C` (orange), `info` `#006395`→`#1D6FCB` (sky-600). 1차안 `success #1A8E4F`(4.18:1) lint 미달 → `#16803F`(L 0.16, ~4.97:1)로 보수 조정. 이유: v10 base가 본문 4.5:1 안전 마진 위해 L 0.13~0.17로 어둡게 잡혀 칙칙한 인상.
- **v52**: warning 톤 미세 brighten — `#C2410C`→`#C84D0E` (L 0.15→0.17, ~4.69:1). 다른 3개 대비 어두운 인상 해소, v53 light(orange-400)와 hue 일치 사전 조정.
- **v53**: semantic 4 light vivid refresh — `success-light` `#5DC07B`→`#4ADE80` (green-400), `error-light` `#F08080`→`#F87171` (red-400), `warning-light` `#E8A05A`→`#FB923C` (orange-400 — 가장 큰 hue 변화, base와 일치), `info-light` `#6FAEDF`→`#60A5FA` (blue-400). Tailwind 400 톤 채택, 다크 alert 4.5:1 silent pass.
- **v64**: Desk `primary-light` 톤 다운 — `#6BA0EE` → `#5FA0E5` (Y 0.354→0.329, surface-input-dark `#2D3346` 대비 4.81→4.51:1 마지널 통과). 사용자 시각 피드백: 다크 모드에서 outlined 버튼·focus 링이 너무 밝게 보임. 4.5:1 안전 마진 한계라 hex 추가 다운 불가(spec 변경 필요). HR `primary-light` `#6BAE8C`는 그대로 유지 (forest green hue가 cobalt blue 대비 시각 적정). `border-focus-light` 동일 hex 추적 동기.
- **v66**: HR/Desk Semantic colors prose에 v51-v53 vivid refresh 반영 — 기존 brand prose는 v10 `#117A3A`/`#C53030`/`#A85800`/`#006395` 및 v20 `#5DC07B`/`#F08080`/`#E8A05A`/`#6FAEDF`만 표기 → "v10 → v51-v52" / "v20 → v53" 변천 표로 변환, 현재 사용 hex 강조 + history 보존. yaml은 sync `colors-2` region으로 이미 최신, prose만 outdated 상태였음.

### Fixed
- **v9**: 매 batch마다 lint 결과를 손계산만 하던 방식 발견 → 16 sparse component를 매핑해 lint contrastCheck 자동 검증 활성. 이후 모든 토큰 추가는 components 매핑 동반.
- **v49**: outdated prose token references 정리 (P2-F follow-up). v17 file split 후 brand-specific token reference 잔재 제거 + spec과 비동기 표현 cleanup. `scripts/lint-prose.mjs`가 prose token reference 정합성 자동 검증.

### Tooling
- **v29**: `scripts/sync-shared-tokens.mjs` 추가 — `typography`/`rounded`/`spacing` 블록 자동 sync (DESIGN.md → HR/Desk), colors 47 공유 토큰 drift detection. `npm run sync` / `sync:check` / `verify` (sync:check + lint:all 통합).
- **v30**: `scripts/build-tailwind-v4.mjs` 추가 — Tailwind v4 `@theme` CSS 빌드(외부 의존성 없음). prose shadow + (v32~) motion 자동 추출. `package.json` export scripts 정정 (잘못된 `css-tailwind` 포맷명, `design.md` 직접 호출 → `npx @google/design.md` + `tailwind`/`dtcg`).
- **(별도 commit `b4ee2c8`)**: pre-commit hook (`.husky/pre-commit`) — `npm run verify` 자동 실행. 의존성 추가 0 (native `core.hooksPath`, husky 패키지 미사용). 토큰/spec 변경 없는 tooling commit이라 milestone 번호 미부여 (CHANGELOG 초안에 v31로 잘못 표기 → 정정. 백업 부재로 ground truth 명확).
- **v50**: `scripts/sync-shared-tokens.mjs` 확장 — `@sync:shared-{start,end} (colors-N)` markers 도입. colors-1 (neutral: bg/surface/text/border) + colors-2 (semantic + chart) region 자동 동기. typography/rounded/spacing 블록 + colors region 통합 drift detection.
- **(v66 phase D)**: `scripts/lint-dark-contrast.mjs` 추가 — dark pair contrast 자동 검증 (spec @google/design.md lint는 light pair만 검증, dark는 토큰 변경 시 회귀 위험). 본문 4.5:1 (text-{primary,secondary}-dark / primary-light / semantic-light × dark surfaces), UI 3:1 (border-focus-light / chart-*-light × dark surfaces), tertiary는 1.4.3 incidental 가능 — warning. text-disabled-dark는 incidental 예외로 검증 제외, text-on-accent는 light pair lint가 이미 검증. `npm run lint:dark` / `lint:dark:strict` 등록, `verify`에 통합 (3 brand 파일 165 페어 검사).
- **(v72 phase B)**: `scripts/lint-prose.mjs` 확장 — yaml hex 추출 + prose 표 row(`| `token` | `#hex` |`) 인용 hex 비교, mismatch 자동 검출. heuristic skip (history line: arrow `→` / milestone reference `v\d+` / `이전`·`현재` 키워드 / hex 2개 이상 = 변천 표). DESIGN.md v10/v20 표를 변천 형식(이전→현재 두 column)으로 변환 — yaml과 일관성 + lint 자동 skip. `npm run lint:prose:strict` 등록, `verify`에 통합. 발견된 outdated reference 자동 검출 + 정정.

### Docs
- **v18**: spec 섹션명 정렬 (`## Layout`, `## Elevation & Depth` 등 spec 표기 일치)
- **v19**: cross-brand dangling references 정리 (v17 split 후 잔재)
- **(별도 commit `ab855c7`)**: `GIT_CONVENTION.md` 추가 (브랜치/커밋 규칙). 토큰/spec 변경 없는 docs(rationale) commit — `DESIGN.history/v{N}` milestone 번호 미부여 (원칙: 백업 대상은 spec 변경만).
- **v60**: Responsive hero typography spec (prose-only) — 한국어 hero scale 4단계 (`heading-xl` 32 / `display-xl` 28 / `heading-lg` 24 / `display-sm` 20, 기존 토큰 재사용 + breakpoint 분기) + 영문 Apple Store reference (56/40/34/28, 토큰 일부 부재 명시). v54 Breakpoints의 reference 가이드 정형화. **토큰 추가 0** — 영문 56/40/34 토큰화는 marketing 사용 사례 등장 후 별도 batch.

## Format conventions

- Conventional Commits (`<type>(<scope>): <subject>`)
- `feat(tokens):` 신규 토큰 / `fix(tokens):` 색상값·치수 조정 / `docs(rationale):` prose-only / `feat(tooling):` 도구 추가
- 토픽 브랜치 (`tokens/<카테고리>` / `components/<이름>` / `tooling/<용도>` / `docs/<용도>` / `refactor/<용도>`)
- `--no-ff` merge to main, main 직접 commit 금지
- 모든 변경: 사전 백업(`DESIGN.history/v{N}-{이유}.md`) → `npm run verify` 통과 → commit (pre-commit hook이 verify 게이트)
