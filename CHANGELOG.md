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

**v98 — SEED 간격 스케일 (2026-09-29)**
- v98: spacing 을 당근 SEED dimension 스케일로 — 2px 단위 19단계(`x0_5` 2px ~ `x16` 64px), 이름도 SEED 와 같다. 옛 7단계(`xs` 4 · `sm` 8 · `md` 12 · `lg` 16 · `xl` 24 · `2xl` 32 · `3xl` 48)는 모두 이 눈금 위라 값이 안 바뀌고, 옮기는 동안 같은 값의 별칭으로 남는다. 스펙이 px 로 직접 적은 간격 22곳 가운데 20곳이 이제 토큰으로 가리킬 수 있다. "한 번에 5개" 규칙의 예외 — 사용자 결정(2026-09-29). 파서(내보내기 · prose 검사 · 사이트 변환기)가 밑줄 이름(`x0_5`)을 읽게 했다.

**v99 — SEED 모서리 스케일 (2026-09-29)**
- v99: rounded 를 당근 SEED radius 스케일로 — 2px ~ 24px 10단계(`r0_5` 2 · `r1` 4 · `r1_5` 6 · `r2` 8 · `r2_5` 10 · `r3` 12 · `r3_5` 14 · `r4` 16 · `r5` 20 · `r6` 24) + `full`, 이름도 SEED 와 같다. 옛 7단계는 값 그대로 별칭. 새 값은 6 · 10 · 14 · 24px. 컴포넌트가 쓰는 모서리(v83 토스 톤 매핑)는 그대로 — 2단계에서 컴포넌트마다 SEED 와 비교해 정한다. 사용자 결정(2026-09-29).

**v100 — SEED 타입 스케일 (2026-09-29)**
- v100: typography 에 당근 SEED 스케일을 들였다 — 크기 `t1` 11px ~ `t14` 48px 14단계(줄 높이는 SEED 와 같은 px: 15 · 16 · 18 · 19 · 22 · 24 · 27 · 30 · 32 · 35 · 38 · 42 · 52 · 60), 역할 스타일 `screen-title` 26/700/35 · `article-body` 16/400/24 · `article-note` 14/400/22. 굵기는 400 · 500 · 700 만(600 은 옮길 때 500/700). 옛 15단계(v82)는 값 그대로 — 컴포넌트는 2단계에서 옮기고, 본문 15px 은 자리마다 14 · 16 으로. 사용자 결정(2026-09-29).

**v101 — SEED 레이아웃 (2026-09-29)**
- v101: 중단점을 당근 SEED 값으로 — `breakpoint-sm` 480 · `md` 768 · `lg` 1280 · `xl` 1440(옛 Apple Store 기준 640 · 736 · 834 · 1069 · 1441, `2xl` 은 없앰). Tailwind 내보내기는 기본 중단점을 먼저 지운다(`--breakpoint-*: initial`). 레이아웃 토큰 6(`layout-max-low` 720 · `layout-max-medium` 1040 — SEED 밀도 low · medium · high, `layout-margin` 32 · `layout-gutter` 24 — SEED Dashboard 격자, `layout-sidebar` 240 · `layout-sidebar-collapsed` 56)과 SEED 역할 간격 6(`global-gutter` 24 — SEED 는 16, porest 앱 규칙 · `between-chips` 8 · `component-default` 12 · `between-text` 6 · `nav-to-title` 20 · `screen-bottom` 56)을 더했다. 정밀 데스크톱 기준(`touch-nav-*`)은 `breakpoint-lg`, hero 글자 단계는 480 · 768 · 1280 으로 옮겼다. 두 웹 · 앱 적용은 앱마다 따로. "한 번에 5개" 규칙의 예외 — 사용자 결정(2026-09-29).

**v102 — SEED 역할 색 (2026-09-29)**
- v102: 색에 당근 SEED 역할 이름(속성 · 역할 · 변형 · 상태 — fg · bg · stroke)을 들였다. 공유 역할 47(글자 16 · 배경 22 · 선 7 + `static-white` 등)은 `colors-3` 동기 영역에, 브랜드 역할 9(`fg-brand` · `bg-brand-solid` · `stroke-focus-ring` …)는 HR · Desk 파일에 라이트 · 다크로. 값은 porest 색 — 기존 값 36, Desk 가 투명하게 섞던 약한 배경 8 을 같은 비율의 불투명 값으로, 없던 눌림 · contrast 글자 13 을 새로(WCAG AA). 의미 색 AA 보정: success #16803F → #167F3F · error #DC2626 → #D72323 · warning #C84D0E → #BE490D · info #1D6FCB → #1D6EC9(흰 바탕 · 페이지 · 입력칸 모두 4.5:1). 다크 모드 의미 색 선은 밝은 변형(-light). 옛 이름은 같은 값의 별칭. 역할 짝마다 `role-*` 컴포넌트를 두어 lint 가 대비를 잰다. SEED 값(APCA)과 당근 주황은 가져오지 않았다. 사용자 결정(2026-09-29).

**v103 — SEED 레이아웃 보완 (2026-09-29)**
- v103: 기초 페이지를 SEED 문서와 절 단위로 맞대 본 뒤 사용자가 넷을 정했다. 콘텐츠 레이아웃을 들였다 — 소개 페이지(porest-home 등)용 12칸, `breakpoint-lg` 이상 가운데, `layout-max-content` 1040 · `layout-max-content-wide` 1280. 768 미만 칸 사이 `layout-gutter-narrow` 16. 칸 수는 밀도로만(low 8 · medium 12, 768 미만은 한 줄 — SEED 와 같다). high 밀도는 최소 폭을 두지 않는다(SEED 최소 1040 — 태블릿 세로에서 가로 스크롤이 생겨서). 밀도 표에 정렬 · 칸 사이 · 여백 칸, 중단점 절에 구간별 칸 · 칸 사이 · 여백 표를 SEED 칸대로 더했다.

**v104 — SEED 모션 · 고도 · 그라디언트 · 글자 단위 (2026-09-29)**
- v104: 사용자가 비교 페이지에서 일곱 가지를 정했다. 지속 시간 SEED 6단계(`motion-duration-d1` 50 ~ `d6` 300) + 역할 `color-transition` · `pressed-scale`(150), 반복 1500 은 남기고 500 은 걷는 중. 이징 SEED 7(`motion-ease-easing` · `enter` · `exit` · `enter-expressive` · `exit-expressive` · `pressed-scale` + `linear`), 옛 `ease-out` 은 걷는 중. 눌림 피드백 = 표면 색(pressed 역할) + 세로 2px 축소(기준 길이 max(높이, 폭 ÷ 4, 24)), 모션 줄이기 모드(축소 없음 · 큰 전환은 150ms 서서히 · 반복 멈춤). 고도는 SEED 모델(Global 0 ~ 3 · Local 1 ~ 3, 색 · 그림자 · 선) + 그림자 `shadow-s1` ~ `s4`(+ `-dark`, porest 값 그대로 — 옛 sm ~ xl 은 별칭). 그라디언트 `gradient-fade-mask` · `gradient-shimmer-neutral`(+ `-dark`). 글자는 rem 으로 내보내고 `-static` px 짝을 함께(스펙 표는 px 로 보인다). "한 번에 5개" 규칙 예외 — 사용자 결정.

**v105 — 키프레임 권장값을 v104 이름으로 (2026-09-29)**
- v105: v74 키프레임 · `animation` 예시가 걷는 이름(`motion-ease-out` · `motion-duration-slower` 500ms)을 가리키던 것을 v104 이름으로 옮겼다. 같은 값의 별칭은 새 이름으로(fast → d3 · base → d4 · slow → d6), 나타나는 키프레임은 `motion-ease-enter`, 사라지는 키프레임은 `motion-ease-exit`(SEED 컴포넌트와 같은 짝), 500ms 의 `bounce-in` 은 d6. 모든 애니메이션을 0.01ms 로 끄던 줄이기 예시는 v104 모드(큰 전환은 150ms 서서히 · 반복 멈춤 · 색 전환 유지)와 어긋나 걷었다. 눌림 피드백의 "평소 배경이 없는 요소(ghost 버튼 · 탭)" 에서 탭을 뺐다 — 탭은 같은 절의 "색 없이 축소만" 쪽이다(SEED 와 같게). 토큰 추가 없음.

**v106 — SEED 상태 · 아이콘 · 포용적 디자인 · 국제화 · 목소리 · 글쓰기 (2026-09-30)**
- v106: 사용자가 비교 페이지(https://claude.ai/artifact/11DmriLqavjqcSs1zFrjeZ)에서 정한 대로 `##` 절 여섯을 더했다. State — SEED 이름 + 웹 `hovered` · `focused`, 비활성은 전용 색(불투명도 걷음), 호버 = 누름 색, 포커스 링 2px · 띄움 2px + 입력칸 테두리 2px, 선택 = 반전. Iconography — lucide 유지, UI 16 · 20 · 24(12 는 바닥, 큰 그림은 비율대로), 켜짐 · 선택은 색 + 선 2.5 · 꺼짐은 `-off`, 아이콘 버튼 보이는 크기 40(누르는 영역 44). Inclusive Design — SEED 규칙, 대비는 WCAG 2, 터치 44 필수. International Design — 날짜 표준 · 줄임 · 점, 오전 · 오후 12시간, 지난 시간은 Desk 방식(방금 전), 구간 한국어 `~` · 영어 `–`. Voice and Tone — SEED 원칙 + 차분하고 친절한 톤. Writing — 해요체, 존칭 줄임, 문장이면 마침표, 이름은 붙이고 문장은 띄움, 보조 용언 붙임, 줄임표 `…`, 오류는 무엇이 · 왜 · 어떻게. Components 의 Focus ring(띄움 1 → 2px) · Disabled label(불투명도 → 전용 색)을 맞췄다. 토큰 추가 없음.

**v107 — 지난 시간 표를 제품 계산대로 (2026-09-30)**
- v107: v106 International Design 의 지난 시간 표가 "어제" 를 달력의 어제 날짜로 적었는데, 사용자가 고른 "지금 porest 방식"(Desk 웹 · 앱 `relativeTime`)은 흐른 시간 24 ~ 47시간을 어제로 센다. 표를 그 계산대로 고치고, 흐른 시간으로 센다는 줄을 더했다.

**v108 — SEED 팔레트 층 (2026-09-30)**
- v108: 색에 당근 SEED 식 팔레트 층을 들였다 — 가족마다 차례 번호(`gray` 00 · 100 ~ 1000, `red` · `green` · `orange` · `blue` 100 ~ 1000, 브랜드 파일에 `brand` 100 ~ 1000)를 붙이고 단계마다 라이트 · 다크 값을 둔다(다크는 뒤집혀 100 이 가장 어둡다). 공유 팔레트는 `colors-0` 동기 영역, 브랜드 팔레트는 브랜드 파일의 `colors-0` 브랜드 영역에 있다. 역할 색 55 개는 hex 대신 단계를 가리키고(`"{colors.gray-00}"`, `static-white` 만 흰색 그대로), 옛 이름 16 개(+ `-dark` · `-light` 짝)는 역할 색을 가리키는 별칭이 됐다 — 컴포넌트 스펙을 옮긴 뒤 지운다. 값은 SEED 규칙대로 새로 뽑았다(OKLCH · 색상각은 지금 채움색 · 단계마다 목표 L* · SEED 램프 모양의 채도). 역할은 SEED 가 쓰는 단계에 앉히고 WCAG AA 가 막는 자리만 옮겼다(`fg-placeholder` 700 · 다크의 의미 색 글자 · 선 800 · 브랜드 다크 — 이유는 DESIGN.md). 지금 화면의 회색 다섯은 고정했다(ΔE 1.4 이하). 제안표보다 다크 글자 단계(의미 색 800 · 브랜드 900)를 L* 69 로 밝혔다 — 다크 입력칸 위 4.00 ~ 4.28:1 로 `lint:dark` 에 걸렸다. 눈에 띄게 바뀌는 값: 누름 · 호버가 옅어진다(`bg-layer-default-pressed` #F0F2F7 → #F7F8FD), 강한 선이 진해진다(`stroke-neutral-solid` #7D8593 → #535866), 입력칸 배경이 페이지 배경과 같아진다(`bg-neutral-weak` #F0F2F7 → #F5F6FA), 다크의 의미 색 글자가 옅은 톤으로, 다크의 눌림이 채움보다 밝아진다, 약한 배경 위 대비 글자가 진해진다. 차트 10색은 아직 팔레트 밖(팔레트에서 새로 고를 예정). 역할이 쓰지 않는 단계는 보기용 `palette-*` 컴포넌트가 가리킨다(lint 경고 방지). 도구 — sync 는 `colors-0` 영역을, Tailwind 내보내기는 역할을 `var(--color-gray-00)` 로, `lint:dark` · `lint:prose` · 사이트는 참조 사슬을 풀어 값을 잰다. "한 번에 5개" · "값 기반 이름 금지" 규칙의 예외 — 사용자 결정(2026-09-30).

**v109 — v108 색 점검 반영 (2026-09-30)**
- v109: v108 로 크게 바뀐 색을 지금 제품 값(Desk 웹 · 앱이 복사해 쓰는 v108 직전 값) · v108 · 대안으로 나란히 그린 점검 페이지에서 사용자가 정한 대로 고쳤다. 다크 글자 채도 — 의미 색 800-dark(`#FF8477` · `#25C062` · `#FF8758` · `#69ABFF`) · 브랜드 900-dark(Desk `#7AA9F6` · HR `#72B898`)를 밝기 · 색조는 그대로 두고 채도만 지금 제품만큼 올렸다(HR 브랜드 글자 ΔE 9.5 → 3.0). 다크 약한 배경 · 눌림(의미 색 · 브랜드)을 100 · 200 → 200 · 300 으로 — porest 다크 표면이 SEED 보다 밝아 100 이 표면과 1.00 ~ 1.02:1 로 묻혔다. 대비 글자 라이트 900 → 800(다크는 900 — 일반 글자보다 한 단계 바깥). 강한 선 gray-800 → gray-600(지금 제품과 ΔE 3.5, UI 3:1 을 넘는 가장 옅은 단계). 기본 테두리 라이트 gray-400 을 `#E5E8EF`(지금 제품 값)로 고정. 다크 비활성 글자 gray-500 → gray-600. 브랜드 옅은 선 — Desk brand-300 채도 올림, HR 은 brand-400(채도 올림)으로. 토스트 · 툴팁 배경 gray-900 → gray-1000(`#1A1F2E`). v102 역할 표 · 본문 인용 98줄의 hex 와 그 줄의 대비 수치를 새 값으로 고쳤다. 토큰 추가 없음 — 사용자 결정(2026-09-30).

**v110 — 차트 10색을 팔레트에서 (2026-09-30)**
- v110: v108 에서 미뤄 둔 차트 10색을 팔레트 단계로 옮겼다. 팔레트에 차트용 가족 다섯(yellow · indigo · violet · pink · brown, 100 ~ 1000 · 라이트 · 다크 = 100 토큰)을 더하고 700 을 v21 ~ v24 차트 색 그대로 두었다. `chart-{hue}` = `{hue}-700`(회색 gray-700), 다크는 새 이름 `chart-{hue}-dark` = `{hue}-800-dark`(다크 의미 색 글자와 같은 단계), 옛 `chart-{hue}-light` 는 별칭. 라이트 값이 바뀌는 건 다섯 — 빨강 #C73838 → #D72323 · 주황 #B36418 → #BE490D · 초록 #2D8060 → #167F3F · 파랑 #2C70BF → #1D6EC9 · 회색 #6B7484 → #62697A. 가장 헷갈리는 짝 ΔE 7.0(주황–갈색) → 9.7(다크 빨강–주황). 노랑 800-dark 는 v109 규칙대로 채도를 올렸다(#C5A721). 배정 순서는 제품 순서(blue → green → orange → violet → pink → indigo → red → yellow → brown → gray), 10개가 넘으면 상위 9 + 회색 기타. 아바타 이니셜은 `fg-neutral-inverted`. chart 스펙(`chart.md` · `chart.yaml`) · 예제 순서 · lint:dark 를 새 이름으로. Desk 에 저장된 색(라이트 hex)은 옮기지 않는다 — 앱 적용 때 이름표로 두고 짝 표만 바꾼다. "한 번에 5개" 규칙의 예외 — 사용자 결정(2026-09-30).

**v111 — 카테고리 옅은 바탕 (2026-09-30)**
- v111: SEED 의 배너 색(`$color.banner.*` 10색)은 두지 않았다 — SEED 컴포넌트 어디에도 쓰이지 않는 장식 색이고 porest 에는 홍보 배너 자리가 없다(안내 메시지는 이미 역할 색으로 있다). 대신 차트 10색을 화면마다 따로 섞던 옅은 바탕(웹 18% · 17% · 12 ~ 16%, 앱 13 · 22%)을 토큰으로 두었다 — `chart-{hue}-weak`(작은 면 — 타일 · 칩, 200 · 다크 300, 지금 제품과 같은 진하기) · `chart-{hue}-subtle`(넓은 면 — 메모 카드 · 배너, 100 · 다크 200) · `chart-{hue}-contrast`(그 위 글자, 800 · 다크 900 — v109 규칙). 회색은 한 단계씩 진하게(400 · 300). 아이콘은 `chart-{hue}` 그대로(작은 면 위 3.63:1 이상). 글자 대비는 lint 컴포넌트 40개가 잰다(5.02:1 이상). 60 토큰 — "한 번에 5개" 규칙의 예외, 사용자 결정(2026-09-30).

**v112 — neutralSolid 버튼의 누름 (2026-09-30)**
- v112: `bg-neutral-inverted-pressed`(gray-800 · 다크 gray-800-dark) 한 쌍 — SEED `bg.neutral-inverted-pressed`. 일반 CTA 를 neutralSolid(짙은 회색)로 정하면서 그 누름 · 호버 · 로딩 색이 필요해졌다. 대비 쌍 `role-inverted-pressed-light` · `-dark`(흰 글자 7.11:1 · 다크 7.70:1). Button 스펙 재작성(아래 Changed)과 같은 PR.

**v113 — 고른 선택 상자의 짙은 테두리 (2026-10-01)**
- v113: `stroke-neutral-contrast`(gray-1000 · 다크 gray-1000-dark) 한 쌍 — SEED `stroke.neutral-contrast`. Select Box 의 고른 상자를 2px 짙은 테두리로 알리기로 정하면서(바탕은 그대로, 브랜드 색 없음) 그 색이 필요해졌다. 흰 바탕 위 16.41:1 · 다크 13.42:1, 대비 쌍 `role-stroke-neutral-contrast-light` · `-dark`. Select Box 신설(아래 Changed)과 같은 PR. 사용자 결정(2026-10-01).

**v114 — 줄바꿈: 단어 단위 (2026-10-01)**
- v114: 한국어를 글자(음절)가 아니라 낱말 사이에서 줄을 바꾼다 — 웹은 `word-break: keep-all` + `overflow-wrap: break-word` 를 문서 맨 바깥에 한 번, 앱(Flutter)은 공용 글자 위젯에서 낱말 안에 WORD JOINER(U+2060)를 넣는다(Flutter 에는 이 설정이 없다 — 3.41 에서 시험). 컴포넌트 예시 글 12개 중 7개가 낱말 중간에서 끊겼고("권한입니 / 다.", "3개 / 월"), 바꿔도 줄이 늘어난 글은 없었다. 한 줄보다 긴 낱말은 칸 끝에서 끊어 넘치지 않는다. 당근(SEED)은 읽는 글(본문 · 시트 제목 · 도움말)만 단어 단위이고 porest 는 컴포넌트 라벨 · 설명까지 — 사용자 결정. 사이트 · 옛 사이트 · 미리보기 · shadcn bridge 에 걸었고, 제품은 앱 적용 단계에서. 토큰 추가 없음.

**v115 — 반전 짝 역할 셋 (2026-10-02)**
- v115: `fg-positive-inverted` · `fg-critical-inverted`(공유) · `fg-brand-inverted`(브랜드) — 반전 표면(`bg-neutral-inverted`, 스낵바) 위의 상태 아이콘 · 액션 글자. 라이트는 그 역할의 다크 값(green-800 · red-800 · brand-900 의 다크 팔레트), 다크는 라이트 값(green-700 · red-700 · brand-600). 짙은 띠 위 대비 — 성공 6.87 · 4.70, 실패 6.89 · 4.68, 브랜드 Desk 6.90 · 7.76 · HR 7.05 · 4.69(밝은 바탕용 `fg-*` 는 1.96 ~ 3.25). `role-*-on-inverted` 대비 짝을 더해 lint 가 잰다. 사용자 결정(2026-10-02 알림 메시지 비교 3번 A — 토큰 셋을 알고 골랐다).

**v116 — z-index 를 층 이름으로 (2026-10-03)**
- v116: z-index 토큰 10개를 `specs/z-index.md` 의 층 표 값 그대로 층 이름으로 둔다 — `z-base` auto(L0, 쌓임 맥락 없음) · `z-sticky` 50(L1 고정 헤더 · 하단 탭바 · 플로팅 버튼) · `z-modal` 100 · `z-modal-content` 101(L2 대화상자 · 시트 딤 · 표면) · `z-floating` 200(L3 팝오버 · Select 목록 · 메뉴, 모달 안에서도 같은 값) · `z-tooltip` 210(L4) · `z-alert` 300 · `z-alert-content` 301(L5 확인창) · `z-snackbar` 400(L6) · `z-dev` 9999(L9 개발 환경 표시). v65 의 6 토큰(z-base 0 · z-dropdown 1000 · z-sticky 1100 · z-drawer 1200 · z-modal 1300 · z-toast 1400)은 걷었다 — 레시피 · 스펙은 층 표의 숫자를 따로 적어 토큰과 값이 달랐다. 이름이 남은 `z-base` · `z-sticky` · `z-modal` 은 값이 바뀌었다(0 → auto · 1100 → 50 · 1300 → 100, `z-modal` 은 이제 딤) — 옛 값을 복사해 둔 제품은 토큰을 새로 받을 때 그 자리를 층으로 다시 고른다. 순서의 이유: 떠 있는 것이 모달 위(대화상자 안의 목록), 확인창이 메뉴 위(SEED Elevation 의 "Alert Dialog 가 맨 위" — SEED CSS 의 99999 팝오버가 아니라 문서 쪽), 말풍선이 팝오버 위, 스낵바가 모든 표면 위. 웹은 화면을 쌓지 않아 SEED 의 `2 + layerIndex` 같은 더하기가 없고, 앱(Flutter)은 숫자 없이 같은 순서를 따른다. 레시피 13곳의 `z-[100]` … `z-[400]` 을 `z-(--z-modal)` … `z-(--z-snackbar)` 로(Tailwind 4.3.3 · 브라우저 CDN 에서 확인), 예제 · 미리보기 CSS 는 같은 변수로, 컴포넌트 YAML 은 값을 두고 비고에 토큰 이름을. `parseZIndex` 는 정수 · `auto` 만 받고 같은 이름의 다른 값을 막는다, `test:exports` 는 열 이름 · 층 차례 · 세 파일 일치를 본다, `lint:prose` 는 `z-` 토큰 참조도 검사한다(걷은 이름이 본문에 남으면 잡는다), 사이트 빌드는 층 표의 숫자가 토큰 값과 같은지 본다. "한 번에 5개" 규칙의 예외 — 사용자 결정(2026-10-03 비교 페이지 1A 층 표를 정본으로 · 2A 새 토큰은 층 이름으로).

**v117 — Badge outline 의 옅은 테두리 (2026-10-03)**
- v117: 의미 색 outline 배지의 옅은 테두리 역할 넷 — `stroke-informative-weak`(blue-300 · 다크 blue-400) · `stroke-positive-weak`(green) · `stroke-warning-weak`(orange) · `stroke-critical-weak`(red), SEED `stroke.*-weak`. 라이트 #B9D4F6 · #BBDAC1 · #F5C7B6 · #FEC4BC(흰 바탕 1.51 ~ 1.53), 다크 #1C4E8A · #1A582F · #833615 · #93231F(다크 표면 1.71 ~ 1.73 · 시트 위 1.48 ~ 1.50). 다크는 SEED 의 300 이 아니라 400 이다 — 300 은 다크 표면 1.38 ~ 1.40 · 시트 위 1.19 ~ 1.21 로 묻히고, `stroke-brand-weak` 처럼 800 으로 올리면 글자(`fg-*`) · `stroke-*-solid` 와 같은 색이 돼 비교 페이지에서 고르지 않은 "진한 선" 이 된다. 400 은 SEED 다크(1.77)와 같은 관계이고 라이트 300 과 무게가 맞는다. 브랜드 outline 은 있던 `stroke-brand-weak`(v109 — 라이트 2.45 · 2.53, 다크 3.86 · 4.01)를 그대로 쓴다. 보기용 `role-stroke-*-weak-light` · `-dark` 컴포넌트를 세 파일에 더했다. 사용자 결정(2026-10-03 표시 비교 2A — "토큰 넷을 새로 둬요" 를 알고 골랐다). 라이트 · 다크 8 항목이라 "한 번에 5개" 규칙의 예외로 CLAUDE.md 에 적었다. Badge 재작성(아래 Changed)과 같은 묶음.

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

**v92 — preview.html demo CSS sanitize (사이트 layout 충돌 fix)**
- v92: 사용자 시각 검증 — 데스크탑에서도 brand-switch의 Desk 버튼이 클릭 불가. 원인: v90에서 `assets/site.css` = `siteCss() + previewPageCss()` 합쳤는데, **preview.html의 `.theme-toggle`이 `position: fixed; top/right: 16px; z-index: 1400`로 정의되어 사이트의 topbar 토글 위에 떠서 brand-switch의 Desk 버튼을 가렸음**. v91 viewport-크기 수정은 미스타깃.
- 수정: `sanitizePreviewCss()` 함수 추가 — preview pageCss에서 사이트 layout과 충돌하는 셀렉터 자동 제거. brace-balanced 파서로 rule 블록 단위 분리, 셀렉터의 leading 주석/whitespace 제거 후 `^pattern(?![-a-zA-Z0-9_])` 으로 word-boundary 매칭. 충돌 셀렉터는 `/* SKIPPED conflicting: ... */` 주석으로 대체.
- 제거 대상 8 패턴 — `body`, `main`, `html`, `.theme-toggle`, `.theme-toggle-icon`, `.theme-toggle-{dark,light}-{text,icon}`, `[data-theme="..."] body`, `[data-theme="..."] .theme-toggle`. 결과 7 conflicting rule 자동 제거. 사이트 도구의 `.theme-toggle` 정의(`position: static`, topbar 안)만 활성.

**v91 — 좁은 viewport topbar 오버플로 fix (Desk 버튼 클릭 불가)**
- v91: 사용자 시각 검증 — narrow viewport(~700px)에서 brand-switch의 Desk 버튼이 theme-toggle에 가려져 클릭 불가. controls 영역 overflow 처리 누락.
- 수정 1: `.controls` / `.brand-switch` / `.theme-toggle`에 `flex-shrink: 0` + `white-space: nowrap` 추가 — 강제 한 줄 유지.
- 수정 2: `@media (max-width: 880px)` — crumbs 줄임(중간 path 숨김 + overflow:hidden), theme-toggle 라벨 텍스트 숨김(아이콘만 표시), 양쪽 padding 축소(8px).
- 수정 3: `@media (max-width: 600px)` — topbar brand-switch 자체 숨김 + sidebar 안에서 별도 brand-switch 표시(hamburger 메뉴 안). brand 토글 접근성 유지.
- HTML — `<button class="theme-toggle">🌓<span class="theme-toggle-label"> Theme</span></button>` 라벨 wrapping. `renderSidebar` 시작에 brand-switch 추가(좁은 viewport용, 기본은 display:none).

**v90 — 컴포넌트 페이지에 preview.html 데모 직접 임베드**
- v90: 사용자 시각 검증 + 명시적 요청 — preview.html의 풍부한 데모(variant × state 매트릭스, 카드 vignette, 캘린더, 결재 row 등)를 그대로 컴포넌트 페이지에 임베드. shadcn 톤 docs UX. 기존 EXAMPLES.md Tailwind 코드는 "코드 예제" 섹션으로 보존(copy-paste 참조용).
- `build-preview-html.mjs` 18 함수에 `export` 추가 — `pageCss`, `parseTokensFromCss`, `brandProfile`, `escape`, `renderButtonGallery`, `renderListingDetail`, `renderCalendar`, `renderEmptyState`, `renderModal`, `renderToasts`, `renderSkeleton`, `renderForm`, `renderBatchV67`, `renderShadcnNav`, `renderShadcnInput`, `renderShadcnDisclose`, `renderShadcnData`, `renderShadcnExtras`, `renderBatchV73V78`. 기존 CLI 동작은 그대로(ESM `export` 추가만).
- `build-site.mjs`에서 import — slug → render 함수 매핑(`getDemoFunctions`)으로 24 컴포넌트 각각 적절한 데모 호출. 예: button → `renderButtonGallery` (3 variant × 5 state matrix), card → `renderListingDetail`, modal-dialog → `renderModal`, calendar → `renderCalendar` 등.
- `assets/site.css` = 사이트 layout CSS + preview.html `pageCss()` 합본 — preview의 모든 custom CSS class(`.btn-matrix`, `.son-toast`, `.fu-zone`, `.tv-row`, `.sc-card` 등 80+) 사이트에서 그대로 작동. Default brand로 정적 렌더, JS toggle로 색상 변경(CSS variable 통해).
- 컴포넌트 페이지 구성: 헤더(제목+lede) → "데모" 섹션(preview.html 임베드) → "코드 예제 (Tailwind v4)" 섹션(EXAMPLES.md Tailwind utility) → 가이드 paragraph → 관련 문서 callout. 두 영역 모두 brand 토글 영향 받음.

**v89 — EXAMPLES.md 예제 풍부화 + placeholder 정리**
- v89: 사용자 시각 검증 — Button의 Sizes 변형이 `class="..."` placeholder 때문에 스타일 안 입혀지는 문제 등 6개 placeholder 정리. 또한 핵심 컴포넌트 EXAMPLES.md 풍부화 — 단일 큰 코드 블록 → 변형별 분리 multi-block 구조.
- 정리 대상 placeholder: Button Sizes(3) / Tooltip(1) / Popover(1) / Dropdown(1) — 모두 실제 Tailwind class로 채움.
- 풍부화 컴포넌트: **Button** Variants(Primary/Outlined/Ghost/Destructive) + Sizes(sm/md/lg) + States(Loading/Disabled/With icon, 3 블록), **Input/Textarea** Default/Invalid/Textarea(3 블록), **Card** Basic + Card grid(2 블록), **Banner** Info/Warning/Error(3 블록 + SVG icon 인라인), **Toast/Sonner** Single + Sonner stack(2 블록), **Modal/Dialog** Confirm + Form(2 블록), **Drawer/Sheet** Right drawer + Bottom sheet(2 블록).
- Modal/Drawer/Sheet `position: fixed` 제거 — preview frame 안 contained 렌더링. 실제 사용 시 추가 class(`class="fixed inset-0 z-modal"` 등) 별도 안내.
- 결과: 각 컴포넌트 페이지가 변형별 Preview/Code 탭 multi-block으로 표시 → shadcn 톤 docs UX. 모든 utility class 정확 컴파일 + brand 토글 즉시 반영.

**v88 — Tailwind v4 CDN @theme 인라인 fix (외부 link 미인식 문제)**
- v88: 사용자 시각 검증 — Tabs 페이지 등에서 utility class 색상이 전혀 적용 안 되던 문제. 원인: Tailwind v4 browser CDN(`@tailwindcss/browser`)이 외부 `<link rel="stylesheet">` 파일의 `@theme {}` 블록을 인식하지 못함. CDN은 인라인 `<style type="text/tailwindcss">` 만 처리.
- 수정: `buildTokens()` 함수가 두 형태로 분리 출력 — (1) `rootCss` 외부 stylesheet `:root` + brand override + dark mode (FOUC 방지, 사이트 layout 색상 즉시 적용) (2) `tailwindBlock` 인라인 `<style type="text/tailwindcss">` `@theme {}` + 동일 brand/dark override (Tailwind CDN이 utility class 컴파일).
- 페이지 템플릿 — `<head>`에 두 단계 모두 포함: external `<link href="tokens.css">` (browser 즉시) + inline `<style type="text/tailwindcss">{TAILWIND_BLOCK}</style>` (Tailwind 처리 후 compiled CSS 주입).
- 결과: `bg-primary`, `border-b-2 border-primary`, `text-on-accent`, `hover:opacity-90`, `focus:ring-error/20` 등 모든 Tailwind v4 utility 정확 컴파일 + brand 토글 즉시 반영.

**v87 — Tailwind v4 browser CDN 전환 (어댑터 폐기, 100% utility 커버)**
- v87: 컴포넌트 페이지 Live Preview를 자체 utility CSS adapter(v86)에서 **Tailwind v4 browser CDN**(`@tailwindcss/browser@4`)으로 전환. 모든 utility class 100% 정확 컴파일. 외부 의존 1개 추가 — 정확성 우선.
- `preview-utilities.css` 폐기(–17KB) — 200+ utility 수동 매핑 → CDN script로 대체. 유지 비용 0.
- `tokens.css` 통합 빌드 변경 — @theme {} 블록 보존(Tailwind 읽음) + `:root` 미러 블록 추가(FOUC 방지, 브라우저 즉시 var() 적용). 7 셀렉터 블록 — @theme / :root / [data-brand=hr] / [data-brand=desk] / [data-theme=dark] / 다크×HR / 다크×Desk.
- 컴포넌트 페이지에 `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>` 추가 — 페이지 로드 시 utility class 자동 스캔 + 컴파일 + 주입.
- 결과: EXAMPLES.md 코드의 모든 Tailwind utility(bg-primary / px-4 / hover:opacity-90 / focus:ring-error/20 / data-state / animate-spin / ...) 외부 컴파일 없이 시각 렌더링. 자체 utility adapter 한계(예: `class="..."` placeholder 영향)는 native Tailwind 컴파일이 자연스럽게 해결.

**v86 — 컴포넌트 페이지 Preview/Code 탭 + Tailwind utility live render**
- v86: 컴포넌트 페이지를 shadcn/ui 패턴으로 재구성 — 각 예제에 **Preview 탭(라이브 렌더링) + Code 탭(escape된 소스)** 두 view. 사용자가 위에서 컴포넌트 동작 확인, 아래에서 코드 copy. 기존 "Live demo (preview.html)" 외부 링크 패턴 폐기.
- `assets/preview-utilities.css` 신규 — Tailwind v4 utility class 200+를 design token CSS variable로 매핑하는 어댑터. EXAMPLES.md 코드의 `bg-primary` / `text-on-accent` / `px-4` / `rounded-md` / `shadow-sm` / `hover:opacity-90` / `focus:ring-2` 등이 외부 컴파일 없이 즉시 렌더링. `.preview-frame` scoping으로 사이트 layout 외 영향 0.
- 카테고리: 6 layout(flex/grid/items/justify/gap), 8 spacing(p/px/py/m/mt/mb/space-y), 9 sizing(w/h/max-w/min-w/aspect/size), 8 색상(bg/text/border × semantic + tokens with /opacity color-mix), 6 typography(text-{caption,body,heading} × variants), 5 border, 5 radius, 4 shadow, 5 position, 4 z-index, 4 transition, 3 animation, 4 cursor/misc, 12 hover/focus/active/disabled/checked variants.
- inline JS — `.example-tab[data-tab]` 클릭 시 `[data-pane]` 토글 (`hidden` attribute). vanilla, 외부 의존성 0.
- preview frame 스타일 — `padding: 32px 24px`, `bg-page` 배경, `min-height: 120px`, 가운데 정렬. shadcn 톤.

**v85 — Site layout 버그 수정 (mobile-overlay grid cell 누수)**
- v85: `scripts/build-site.mjs` 사이트 layout 수정 — `.mobile-overlay` div가 `.app` grid의 column 2 cell을 차지해 main이 row 2 col 1(260px wide)로 강제 wrap되던 문제. 사용자 시각 확인 — 데스크탑 viewport(>880px)에서 main 콘텐츠가 sidebar 아래에 좁은 column으로 나타나거나 부분 가려짐.
- 수정 1: `.mobile-overlay`를 `.app` 외부로 이동(`<body>` 직속). grid 영향 0.
- 수정 2: `.mobile-overlay { display: none; }` base 추가 + `[data-open]` attribute 토글로 mobile에서만 표시. 기존 sibling selector(`.sidebar[data-open] ~ .mobile-overlay`)는 비형제로 무효화 → JS `syncOverlay` 함수로 sidebar↔overlay state 동기화.
- 결과: desktop에서 sidebar(col 1, 260px) + main(col 2, 1fr) 정상 grid 레이아웃. mobile(≤880px)에서 sidebar fixed translateX + overlay backdrop 정상 동작.

**v84 — 풀 docs site Phase 2 (컴포넌트 페이지 24)**
- v84: `scripts/build-site.mjs`에 `parseExamplesMd` + `pageComponent` 추가 — `EXAMPLES.md` 24 섹션을 `exports/site/components/*.html` 24 페이지로 자동 변환. 카테고리 매핑(Forms / Layout / Navigation / Data Display / Feedback / Overlay / Disclosure / Reference)으로 사이드바 그룹 nav.
- 페이지 구성: 제목 + lede + 메타(category 태그 / Live demo preview.html 링크 / EXAMPLES.md GitHub 링크) + 예제 코드 블록(각각 Copy 버튼 + lang label) + 가이드 paragraph + 관련 문서 callout(DESIGN.md / DESIGN.hr.md / DESIGN.desk.md GitHub 링크).
- 사이드바 동적 구성 — `buildNav(components)` 함수가 컴포넌트 카테고리별 그룹화하여 8개 sub-section 생성("Components — Forms", "Components — Layout", ...). EXAMPLES.md만 source of truth.
- Copy 버튼 JS — clipboard API + Copied! 1.6초 success 색 피드백. 외부 의존성 0.
- inline markdown 처리 — lede / paragraph 안 백틱(\\\`token\\\`)이 `<code>` 태그로 변환.
- Phase 3(Examples — 조합 layout) 별도 batch.

**v83 — 풀 docs site 골격 (Phase 1 — Landing + Tokens 8 페이지)**
- v83: `scripts/build-site.mjs` 신규 — shadcn/ui 스타일 multi-page documentation site 생성. `exports/site/` 디렉토리 + `index.html`(Landing) + `tokens/{colors,typography,spacing,radius,shadows,motion,breakpoints,z-index}.html` 8 페이지 + `assets/{tokens,site}.css + site.js`. 외부 의존성 0 — vanilla Node + 기존 build-tailwind-v4 산출물 재사용.
- **3 브랜드 단일 사이트 토글**: `[data-brand="default|hr|desk"]` scoping으로 한 페이지에서 Default / HR / Desk primary 색 즉시 전환. localStorage 기억. `tokens.css` 통합 빌드 — Default(`:root` baseline) + HR override(4 토큰) + Desk override(4 토큰) + dark mode pair alias.
- **사이트 layout**: 좌측 sticky sidebar(260px) + 상단 topbar(브레드크럼 / 브랜드 스위처 / 테마 토글) + 본문 920px max-width. 모바일 hamburger nav (≤880px viewport, transform translate). prefers-reduced-motion 일괄 처리.
- **Landing**: Hero("사람과 일상이 숲처럼 자라나는 시스템") + 두 브랜드 identity 카드(HR forest / Desk cobalt / Default neutral) + Quick start + 핵심 가치 5 + 현재 시스템 numbers(180+ tokens, 80+ components, v83 milestones).
- **Token 페이지 8**: Colors(51 swatch + 그룹별 정렬 + WCAG 안내), Typography(21종 라이브 sample + 가이드), Spacing(7 visual bar), Radius(7 shape preview), Shadows(4 light + 4 dark 표), Motion(5 duration animated demo + 2 easing + 14 keyframes 표), Breakpoints(5 Apple Store 톤), Z-index(6 layer + visual stack). DESIGN.md frontmatter YAML 직접 파싱.
- **Phase 2-3 계획**: Components(80+ spec 컴포넌트별 페이지), Examples(조합 layout 5-8 시나리오) — soon badge로 사이드바 표시. 별도 batch 진행.

**v82 — README 정비 (v73-v81 milestone 반영)**
- v82: README.md 갱신 — Quick start에 `build:examples` 추가, 파일 구조에 `EXAMPLES.md` / `exports/examples.html` / `build-examples-html.mjs` 신규 추가, 토큰 카테고리에 z-index(v65) + keyframes(v74) + Form validation(v75) + RTL(v76) prose 가이드 항목, npm scripts 표에 lint:prose:strict / lint:dark:strict / build:examples 동봉, 사용 예시에 v74 keyframes(animation: scale-in / slide-in-up / shimmer / spin / shake) + prefers-reduced-motion 일괄 처리 코드 보강. 80+ 컴포넌트 spec coverage 명시.

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

- **v112 (Button)**: Button 스펙을 SEED Action Button 구조로 다시 썼다 — 변형 7(brandSolid · neutralSolid · neutralWeak · criticalSolid · brandOutline · neutralOutline · ghost, 옛 dangerSoft · accent · link 는 ghost 의 글자색으로), 크기 4(xsmall 32 알약 · small 36 · medium 40 · large 48 — SEED large 는 52), 배치 축(withText · iconOnly), 글자 700 · 모서리 8 · 12, hover = 누름 색, 누름 = 세로 2px 축소, 비활성 전용 색, 로딩은 누름 색 위 로딩 원 + 누르기 막기. 일반 CTA 는 neutralSolid, brandSolid 는 핵심 액션 하나. 4 source(`button.md` · `button.yaml` · `button.tsx` · 예제 · 미리보기 CSS)와 DESIGN*.md 의 Button 절을 함께 고쳤다. 버튼을 부르는 레시피 다섯(alert-dialog · calendar · carousel · pagination · sidebar)은 새 이름으로 옮겼고, 레시피 `cn` 이 porest 스케일(`text-t4` · `px-x4` · `rounded-r2`)을 알게 했다 — 기본 tailwind-merge 는 `text-t4` 를 글자색으로 읽어 버튼 글자색을 지운다. 옛 이름 → 새 이름 표는 `button.md` Migration notes. 사용자 결정(2026-09-30).
- **Checkbox (2026-09-30)**: Checkbox 스펙을 SEED Checkbox 구조로 다시 썼다 — 칸(Checkmark) · 칸 + 라벨(Checkbox) · 묶음(Checkbox Group), 크기 medium 20 · large 24(라벨 14 · 16, 줄 32 · 36), 모양 square · ghost, 톤 neutral(기본) · brand, 굵기 regular · bold. 선택 = 짙은 회색(`bg-neutral-inverted`)이 기본 — Radio · Switch 도 각 차례에 같은 규칙. 오류는 칸을 바꾸지 않고 묶음 아래 글. 할 일 완료의 동그라미는 할 일 목록 차례. 4 source + 사이트 페이지(Button 과 같은 틀 — 렌더링 · Desk/HR 화면 예시 · 코드 · Specification) + DESIGN*.md 선택 컨트롤 절 · v83 모서리 표(button · checkbox 줄). 토큰 추가 없음. 사용자 결정(2026-09-30).
- **Radio (2026-09-30)**: Radio Group 스펙을 SEED Radio 구조로 다시 썼다 — 동그라미(Radiomark) · 동그라미 + 라벨(Radio) · 묶음(Radio Group), 크기 medium 20 · large 24(점 8 · 10, 라벨 14 · 16, 줄 32 · 36), 톤 neutral(기본) · brand, 굵기 regular · bold. 선택 = 테두리 없이 채운 원 + 가운데 점(옛 테두리 원 + 점 16 을 대체), 비활성 선택은 채운 원 그대로 색만(Checkbox 와 같게), 묶음은 세로만(가로 규칙 삭제), 줄 사이 12 — SEED 의 4 로는 이웃 줄과 누르는 영역(44)이 겹쳐 한 줄이 36 · 40 만 받는다(기초의 "44 를 반드시", Checkbox 묶음도 같은 값으로 옮긴다). 설명 · 딸린 입력이 붙는 선택(반복 거래 "종료")은 Select Box 차례에. 오류는 묶음 아래 글. 4 source(미리보기 Radio 절 신설) + 사이트 페이지(Button · Checkbox 와 같은 틀) + DESIGN*.md 선택 컨트롤 절 · v83 모서리 표(radio-group 줄). 사이트가 스펙 옆 YAML 링크를 GitHub 원본으로 보낸다(Button · Checkbox 페이지에서도 없는 페이지로 갔다). 토큰 추가 없음. 사용자 결정(2026-09-30).
- **Checkbox 맞추기 (2026-09-30)**: 묶음 줄 사이 4 → 12(Radio 와 같은 값 — SEED 의 4 로는 이웃 줄과 누르는 영역 44 가 겹쳐 한 줄이 36 · 40 만 받는다, 사용자 결정) · 줄 맞춤을 네 곳 모두 "칸 + 라벨만큼만"(레시피는 줄을 묶음 폭으로 늘이고 미리보기는 내용만큼이었다) · 모션 표를 구현에 맞춤(아이콘 scale 0.8 → 1 · 불투명도는 옛 스펙에서 온 값으로 구현된 적이 없다 → 색 전환 + 누름 축소, SEED Checkmark 와 같다) · 칸(버튼) 위 손가락 커서 · 사이트 그림의 손으로 적은 줄 사이(4 · 0)를 YAML 값으로. 토큰 추가 없음.
- **Switch (2026-09-30)**: Switch 스펙을 SEED Switch 구조로 다시 썼다 — 스위치(Switchmark — 트랙 + 엄지) · 스위치 + 라벨(Switch), 크기 `16`(26 × 16 · 엄지 12 · 라벨 13) · `24`(38 × 24 · 20 · 14, 기본 — SEED 는 32) · `32`(52 × 32 · 26 · 16), 톤 neutral(기본) · brand. 끄면 엄지가 0.8 로 작아지고 그림자가 없다(옛 크기 하나 44 × 24 · 엄지 20 · `shadow-md` 를 대체). 켜짐 = 짙은 회색(Checkbox · Radio 와 같은 규칙), 꺼진 트랙 `stroke-neutral-solid`, 호버는 색이 바뀌지 않고 누르면 스위치만 세로 2px 축소, 비활성은 전용 색 — 켜진 채 막히면 켜진 모양 그대로 회색. 모션은 엄지 150ms · 색은 20ms 뒤 50ms. **누르는 순간 적용될 때만 Switch** — 저장해야 적용되는 값은 Checkbox(제품 웹 10 · 앱 12곳은 앱 적용 단계에서 옮긴다). "라벨 왼쪽 · 스위치 오른쪽" 설정 줄은 List 차례에(다음). 4 source(`Switch` 가 라벨까지 맡고 트랙만은 `Switchmark`, 미리보기 Switch 절 신설) + 사이트 페이지(Button · Checkbox · Radio 와 같은 틀) + DESIGN*.md 선택 컨트롤 절(옛 공통 표 · Desk "200ms" 정리). 사이트: 기초 Feedback 그림과 Checkbox 페이지의 스위치가 switch.yaml 값으로 그려지고, 컴포넌트가 굵기를 따로 정하는 부위는 표의 글자 칸에 글자 토큰의 굵기를 적지 않는다(`14px / 400 / 19px` 옆에 `굵기 500` 이 나란히 있어 어느 쪽인지 알 수 없었다 — 16쪽). 토큰 추가 없음. 사용자 결정(2026-09-30).
- **비활성 커서 (2026-10-01)**: Button · Checkbox · Radio · Switch 의 비활성 커서 `not-allowed` 가 실제로 보이게 했다 — 레시피 · 미리보기가 비활성 컨트롤과 그 줄의 포인터 이벤트를 꺼(`pointer-events: none`) 스펙의 커서가 계산값으로만 있고 화면에는 나오지 않았다. 포인터 이벤트는 켜 두고, 누름 축소는 `disabled:[scale:1]` 로 빼고, 호버 · 누름 색은 비활성 색 규칙이 덮는다(Tailwind 가 disabled 를 hover · active · group-* 뒤에 내보낸다 — Ghost 체크박스는 비활성 바탕을 투명으로 적어 덮었다). SEED 와 같은 방식이다. 옛 DESIGN*.md 의 "not-allowed · pointer-events: none · opacity" 안내도 고쳤다. 토큰 추가 없음.
- **List (2026-10-01)**: List 를 새로 정했다 — SEED List 구조(목록 · 한 줄 · 목록 제목 · 줄 사이 선). 설정 · 메뉴 · 선택 · 키-값 줄과 거래 · 할 일 · 알림 같은 내용 줄을 모두 List 로 그린다. 한 줄은 위아래 12 · 좌우 24(`spacing-global-gutter` — SEED 16) · 제목 `t5` 16 · 400 · 설명 `t3` 13, 앞은 아이콘 22(설정 · 메뉴) 또는 타일 40(모서리 12, `chart-{색}-weak` — 내용 줄), 뒤는 값 글자 · 화살표 18 · 스위치 32 · 체크 · 라디오 24 · 작은 버튼. 누름 · 호버는 바탕 층이 좌우 6 들어와 모서리 10 의 `bg-layer-default-pressed`, 콘텐츠 층만 2px 거리 축소(끼운 컨트롤은 따로 줄지 않는다). 강조는 바탕만 `bg-brand-weak` — 올리거나 누르는 동안 설명 · 값 글자를 `fg-neutral-muted` 로(짙은 강조 바탕 위 4.32:1 → 5.58:1). 줄 사이 선은 기본 없음. 목록 제목은 `mediumWeak`(14 · 500) · `boldSolid`(14 · 700). **RadioList 를 걷었다** — 하나 고르기는 오른쪽 라디오 줄(`ListRadioItem`), 옛 스펙은 `radio-list.history/`. 4 source(레시피 `List` · `ListItem` · `ListButtonItem` · `ListLinkItem` · `ListSwitchItem` · `ListCheckItem` · `ListCheckGroup`(fieldset) · `ListRadioGroup` · `ListRadioItem` · `ListDivider` · `ListHeader` · `ListTile` · 카드 안 누름 바탕 모서리 `itemRadius`, 미리보기 List 절 신설 · RadioList 절 삭제) + 사이트 페이지(같은 틀) + DESIGN*.md List 절 · 선택 컨트롤 절의 "List 차례" 정리. 사이트: Switch 페이지의 설정 줄을 List 의 스위치 줄로 그린다. 토큰 추가 없음. 사용자 결정(2026-10-01).
- **Select Box (2026-10-01)**: Select Box 를 새로 정했다 — SEED Select Box 구조(하나 고르기 Radio Select Box · 여럿 고르기 Check Select Box · 묶음). 설명 · 아이콘 · 딸린 입력이 붙는 선택지 2 ~ 6개를 견줘 고르고 저장 · 다음 같은 버튼으로 반영한다(상자를 누르는 것만으로 실행하지 않는다). 상자는 모서리 12 · 안쪽 1px `stroke-neutral-weak`, 고르면 안쪽에 2px `stroke-neutral-contrast`(v113)를 덧그린다 — 바탕은 그대로, 브랜드 색 없음. 제목 `t5` 16 · 500 · 설명 `t3` 13 `fg-neutral-muted`, 앞 아이콘 22, 오른쪽 컨트롤은 라디오 20 · 칸 없는 체크(Checkbox Ghost) · 없음. 1열 가로형 · 2 ~ 3열 세로형(모든 상자가 가장 긴 상자의 높이 — 누르는 자리가 남는 높이까지 채워 빈 아래쪽도 눌린다), 고른 상자 아래로 펼침(딸린 입력 · 안내 — 닫히면 Tab 도 닿지 않는다). 누름 · 호버는 상자 바탕 `bg-layer-default-pressed` + 누르는 자리만 2px 거리 축소, 키보드 포커스 링은 상자 바깥 하나(컨트롤은 자기 링을 끈다 — 두 겹이 되지 않게). **Tile 을 걷었다** — 테마처럼 누르는 순간 바뀌는 고르기는 List 의 라디오 줄, 옛 스펙은 `tile.history/`. 4 source(레시피 `RadioSelectBoxGroup` · `RadioSelectBox` · `CheckSelectBoxGroup`(fieldset) · `CheckSelectBox`, 미리보기 Select Box 절 신설 · Tile 절 삭제) + 사이트 페이지(같은 틀) + DESIGN*.md Select Box 절. Radio 페이지의 "설명 · 입력칸이 붙는 선택" 그림이 select-box.yaml 값으로 그려진다. 사용자 결정(2026-10-01).
- **Text Field (2026-10-01)**: Input · Textarea 를 SEED Text Input · Textarea 구조로 다시 쓰고 **Field** 를 새로 정했다. Label · Form 스펙은 Field 로 합쳤다(옛 스펙은 `label.history/` · `form.history/`). 입력칸은 투명 바탕 + 안쪽 1px `stroke-neutral-weak`, 포커스(마우스 · 터치도) · 오류는 안쪽 2px `stroke-neutral-contrast` · `stroke-critical-solid` 를 덧그린다(내용이 밀리지 않는다, 오류는 포커스해도 그대로), 비활성 · 읽기 전용은 `bg-disabled` 바탕(흐림 없음). 크기 large 52(모서리 12 · 글자 16) · medium 40(8 · 14) — 웹 기본은 반응형(1280 에서 바뀐다), 앱은 large. 모양은 상자(기본) · 밑줄(화면에 입력이 하나뿐일 때 — large 40 · 글자 18). 앞 · 뒤 글자 · 아이콘 · 지우기 버튼(22 · 18). Textarea 는 자동 높이 3줄(94 · 82)에서 자라고, 끄면 2줄(72 · 62) 이상 고정 높이 · 손잡이 없음. Field 는 머리(라벨 16 · 500 · 필수 점 6 또는 "선택" — 2/3 규칙, 섞지 않는다 · 보조 액션) · 입력 · 꼬리(설명 14 또는 오류 14 + 아이콘이 설명을 대신 · 글자 수 — 자소 단위, 최대에서 멈춘다)를 8 간격으로, 폼은 Field 사이 24 · 나란히 둔 두 칸 16. 검증은 저장 버튼을 켜 두고 제출 때 칸마다(첫 오류 칸으로 포커스), 위험한 칸만 떠날 때 바로. 작성 · 수정 화면은 바뀐 값이 있으면 나가기 전에 묻는다. 4 source(레시피 `Field` · `useFieldControl` · `useFieldGroup` · `Input` · `Textarea` · `Form` · `FormField` — Checkbox · Radio · Select Box 묶음이 Field 의 라벨을 이름으로 받는다, `label.tsx` 삭제 · 예제 field · input · textarea 다시 쓰고 label · form 예제 삭제 · 미리보기 Text Field 절 신설 · 옛 입력칸 모양 전부 바꿈) + 사이트 페이지 셋(Field · Input · Textarea — 같은 틀) + DESIGN*.md Input · Textarea 절 · Field 절(옛 Form layout · Form validation 을 합쳤다) · 기초 State 의 입력 중 테두리. 쓰던 곳(Sidebar · Searchable List · Icon Picker)의 검색칸은 앞 아이콘으로 옮겼다. 사용자 결정(2026-10-01).
- **Select · Input Button (2026-10-01)**: 고르는 칸을 둘로 나눴다 — **Select**(짧은 선택지 5개 이상 · 한 줄 설명까지를 칸 아래 목록으로, 폰에서도 시트로 바꾸지 않는다 — SEED Select)와 **Input Button**(입력칸 모양의 버튼, 새로 — 달력 · 시각 · 아이콘 격자 · 긴 목록을 1280 미만 아래 시트 · 이상 칸 아래 팝오버로 연다 — SEED Input Button). 트리거 · 칸은 Input 의 상자형과 같다(large 52 · medium 40 · 반응형, 투명 바탕 + 안쪽 1px `stroke-neutral-weak`, 오류 안쪽 2px, 비활성 · 읽기 전용 `bg-disabled`) — 버튼이라 누름은 바탕 `bg-layer-default-pressed` + 콘텐츠만 2px 거리 축소, 포커스는 키보드에만 바깥 링. 셰브론은 열리면 180°. 목록은 트리거 폭 · 아래 8 · 모서리 20 · `bg-layer-floating` · `shadow-s3` · 위아래 8 · 높이 min(480, 남은 화면), 선택지 46 · 39(설명이 있으면 66 · 57) · 고른 것은 오른쪽 체크만(바탕 · 굵기 그대로) · 누름 · 호버 · 키보드 위치는 좌우 8 들인 알약 `bg-layer-floating-pressed`, 묶음 제목과 묶음 사이 1px 선. "없음" 은 "{칸 이름} 없음" 선택지를 맨 앞 따로 묶음에(Select 에는 지우기 없음), 여럿 고르기(열린 채 — "식비, 교통" · 넘치면 "식비 외 2개"), 고르는 컴포넌트 순서는 SEED(요일 7개도 Select, 폼 값의 탭은 걷는다). Input Button 은 혼자 쓰지 않고 달력 · 시각은 "완료" 로 넣는다(목록은 누르면 바로), 긴 목록은 검색 시트(Combobox 를 두지 않는다). 4 source(레시피 `Select` · `SelectGroup` · `SelectItem` — Radix Select 대신 Radix Popover 위에 listbox 를 직접 짰다(여럿 고르기), `InputButton` · `useInputButtonSurface` 새로, Field 는 버튼인 칸이면 라벨을 눌러도 포커스만, Popover 에 `PopoverAnchor` · 예제 select 다시 쓰고 input-button 새로 · 미리보기 Select · Input Button 절 신설 · 옛 `.form-select` 걷음) + 사이트 페이지 둘(같은 틀) + DESIGN*.md Select · Input Button 절 · Dropdown 절의 select 줄 안내. 옛 스펙은 `select.history/v-pre-seed-select.*`. 토큰 추가 없음. 사용자 결정(2026-10-01).
- **Chip (2026-10-02)**: Chip 을 새로 정했다 — SEED Chip 구조(알약 · 앞 아이콘 · 글 · 뒤 아이콘). 옛 DESIGN.md 의 Tag / Chip(v73)을 대신한다. 칩이 맡는 일은 넷 — 2 ~ 4개 짧은 폼 값 고르기(하나는 라디오 · 여럿은 체크박스, "전체" 는 맨 앞 선택지, "전체 선택" 칩 없음) · 누르면 값을 넣는 제안(고른 표시 없음) · 목록 위 필터 바(조건마다 칩 + 아래 화살표, 걸린 조건은 짙은 채움 + "식비 외 2개", 맨 앞 아이콘만 있는 지우기) · 입력값("{글} 지우기" 버튼). 3상태(고름 → 빼고 → 해제) 칩은 두지 않고 "고른 것만 · 고른 것 빼고" 를 먼저 고른다. 크기 small 32 · medium 36(기본) · large 40, 모서리 full, 글 `t4` 14 · 500(세 크기 같다), 좌우 12 · 14 · 16, 앞 아이콘 14 · 16 · 16 과 글 사이 6, 칩 사이 `spacing-between-chips` 8, 누르는 영역은 세로 44 까지. 변형 셋 — Solid(옅은 회색 `bg-neutral-weak` → 짙은 채움 `bg-neutral-inverted`, 흰 표면 위에서만) · Outline Strong(투명 + 안쪽 1px `stroke-neutral-weak` → 짙은 채움) · Outline Weak(기본, → `bg-neutral-weak` + 1px `stroke-neutral-contrast`). 고른 칩은 브랜드 색이 아니라 중립색이다. 누름 · 호버는 누름 바탕 + 칩 전체 2px 거리 축소(호버는 축소 없음), 포커스는 키보드에만 바깥 링, 비활성은 `bg-disabled` · `fg-disabled`(흐림 없음) — 고른 채 막히면 1px `stroke-neutral-solid` 를 남긴다. 4 source(레시피 `ChipRadioGroup` · `ChipRadio` · `ChipGroup` · `ChipToggle` · `Chip` · `InputChip` · 예제 chip 새로 · 미리보기 Chip 절 신설 · 옛 Tag / Chip 데모 걷음) + 사이트 페이지(같은 틀) + DESIGN*.md Chip 절(브랜드 파일은 Desk · HR 의 쓰는 자리). 토큰 추가 없음. 사용자 결정(2026-10-01 · 02).
- **Tabs · Segmented Control (2026-10-02)**: 탭과 보기 바꾸기를 역할로 나눴다 — **Tabs**(다른 구역으로 옮기기 — 1차 Line · 2차 Chip Tabs, SEED Tabs)와 **Segmented Control**(같은 내용의 보기 · 조작 2 ~ 4개, 한 화면에 하나 — 새로, SEED Segmented Control). Line 은 small 40(글 `t4` 14, 기본) · medium 44(`t5` 16), 글은 늘 700 이고 고르면 `fg-neutral-subtle` → `fg-neutral` + 아래 2px `fg-neutral` 막대가 200ms 로 옮긴다(누름은 글만 2px 거리 축소). 탭이 5개 이하면 Fill(칸이 폭을 나누고 막대는 좌우 16 들인다) · 6개부터 Hug(글 폭, 목록 좌우 16, 가로 스크롤). 알림은 글 옆 6 점 하나(`fg-brand`, 사이 2 — 고른 탭에는 그리지 않는다) — 글에 개수를 넣지 않는다. 화살표 키로 옮기면 바로 고르고(자동 활성화) 내용은 바로 바꾸며 상태를 지킨다, 폰 1차 탭은 밀어 넘기고 웹 1차 탭은 주소에 남긴다. Chip Tabs 는 Chip(solid · outlineStrong) medium 36 · large 40 줄(좌우 화면 여백 24 · 칩 사이 8, 가로 스크롤 — 고른 칩까지 24 여유, 알림 점과 6). Segmented Control 은 트랙(`bg-neutral-weak` · 안쪽 4 · 모서리 full)을 칸 수로 똑같이 나누고(최소 폭 없음, 칸 좌우 12 — SEED 24 로는 4칸이 폰에 안 들어간다) 칸 34 · 글 `t5` 700, 고른 칸은 흰 알약(`bg-layer-default`) + 안쪽 1px `stroke-neutral-contrast` 가 200ms 로 미끄러진다(SEED 옅은 1px 은 트랙과 1.14:1 — 사용자 결정). 4 source(레시피 `Tabs` · `TabsList` · `TabsTrigger` · `TabsContent` · `ChipTabs*` · `SegmentedControl` · `SegmentedControlItem` · 예제 tabs · segmented-control 새로 · 미리보기 Tabs 절) + 사이트 페이지 둘(같은 틀) + DESIGN*.md Tabs · Segmented Control 절. 옛 Tabs(밑줄 · 알약 · 회색 트랙 셋)는 `tabs.history/v-pre-seed-tabs.*`. Toggle Group 스펙 · DESIGN.md 절 머리에 "보기 바꾸기 · 정렬은 Segmented Control" 안내를 달았다(Toggle Button 차례에 다시 정한다). 토큰 추가 없음. 사용자 결정(2026-10-02).
- **시트 · 대화상자 · 확인창 · 팝오버 (2026-10-02)**: 떠 있는 표면을 일로 나눴다 — 입력 폼 · 상세는 한 부품이 폭으로 바뀌는 **Responsive Dialog**(1280 미만 **Bottom Sheet** · 이상 **Dialog** — SEED 768 이 아니라 Input Button 과 같은 1280), 되돌릴 수 없는 확인은 **Alert Dialog**, 트리거에 붙는 내용은 **Popover**, 줄의 동작 목록은 Menu Sheet · Menu(그 차례에), 화면 높이 90% 를 넘는 내용은 페이지. **Bottom Sheet**(새로 — 옛 Drawer 를 대신): 최대 480 가운데 · 위 모서리 24 · 좌우 화면 여백 24 · 머리 위 24 아래 16 · 제목 `t8` 22 · 700 · 설명 `t5` muted · 오른쪽 위 닫기 원 28(아이콘 14 · 누르는 영역 44) · 손잡이는 스냅 높이를 둘 때만(누르면 다음 높이로, 가장 높은 데서 닫힘) · 바닥 위 12 아래 16 + 안전 영역 · 바닥 버튼 large 48(하나면 폭 전체, 둘이면 반씩) · 그림자 없음 · 300ms enter-expressive 로 올라오고 200ms 로 내려간다. **Dialog**: medium 480 · large 800 · 최대 높이 80% · 모서리 20 · 머리 24/24/16 · 제목 `t8` · 본문만 스크롤(넘치면 아래 48 흐림, 스크롤하면 머리 아래 1px `stroke-neutral-subtle`) · 바닥 버튼 small 36 오른쪽 · 200ms 1.3 배에서 줄며 나타남 / 100ms 사라짐. **Alert Dialog**: 최대 272 · 바깥 32 · 안쪽 20 · 모서리 20 · 제목 `t7` 20 · 700 · 설명 `t5` `fg-neutral` · 버튼 1280 미만 medium 40 · 이상 small 36, 둘이면 나란히(취소 왼쪽 · 확정 오른쪽) · 이름이 길면 세로(확정 위) · 하나면 폭 전체, 닫기 버튼 없음 · 바깥 누르기 무시 · `Esc` = 취소 · z 300/301. **Popover**: 폭 320 ~ 480(가용 폭) · 최대 높이 600 · 모서리 20 · 그림자 s3 · 트리거와 8 · 제목 `t7` + 닫기 · 본문 · 바닥은 Dialog 와 같음 · 비모달(초점은 안으로 · 가두지 않음 · Tab 으로 나가면 닫힘) · 150ms 0.95 배에서. 쓰는 규칙 — 입력 폼은 바깥 누르기 · 끌어내리기로 닫지 않는다(바뀐 값이 있으면 닫기 전에 "작성한 내용이 사라져요" 를 묻는다), 닫기와 취소는 하나만(대화상자의 입력 폼은 바닥 취소 · 시트의 입력 폼은 위 닫기 + 바닥 저장 · 조회 · 안내 · 고르기는 위 닫기), 확인창 안에 입력칸을 두지 않는다, 딤은 porest 0.50 · 0.65(v102). 4 source(레시피 `BottomSheet*` 새로 · `Dialog*` · `ResponsiveDialog*` · `AlertDialog*` · `Popover*`, drawer.tsx 걷음 · 예제 bottom-sheet 새로 · 미리보기 03k 시트 · 대화상자 절, Select 목록이 대화상자 안에서 휠로 스크롤되게, 사이트 예제의 dark: 가 사이트 테마를 따르게) + 사이트 페이지 넷(같은 틀) + DESIGN*.md "시트 · 대화상자 · 확인창 · 팝오버" 절. 옛 스펙은 `drawer.history` · `dialog.history` · `alert-dialog.history` · `popover.history` 의 `v-pre-seed-overlay.*`. 토큰 추가 없음. 사용자 결정(2026-10-02 — 바닥 버튼 크기는 Button 결정대로 다시 정함).
- **알림 메시지 — Snackbar · Callout · Page Banner · Result Section (2026-10-02)**: 알림을 일로 나눴다 — 방금 한 일의 결과 · 가벼운 실패는 **Snackbar**(옛 Sonner 를 대신), 그 자리의 안내 · 저장 실패는 **Callout**(옛 Alert 를 대신 — "Alert" 는 모달에만), 페이지 전체의 상태는 **Page Banner**(새로), 비어 있음 · 불러오기 실패 · 완료 · 404 · 화면 오류는 **Result Section**(새로), 입력값은 칸 아래, 결정은 Alert Dialog. 오류는 자리에서 알린다(전역 오류 토스트를 걷고 서버 글 · 영어 · 코드를 보이지 않는다, 시트 안의 결과는 그 안 Callout). Snackbar: `bg-neutral-inverted`(다크는 밝은 띠) · 최소 44 · 여백 10 + 6 · 글 14 · 모서리 8 · 그림자 없음 · 최대 464 · 아래 가운데(탭 바 · 플로팅 버튼 위 8) · 아이콘 24 은 성공 · 실패만 · 액션 하나 `fg-brand-inverted` 700 · 4초(액션 6초 — 사용자 결정) · 머무는 동안 멈춤 · 한 번에 하나 · `role="status"` · z L6(400). Callout: `bg-*-weak` + `fg-*-contrast` · 모서리 10 · 14 · 한 문단(제목 700) · 톤 다섯 · display · actionable · dismissible(한 번 보면 되는 안내만). Page Banner: 화면 폭 띠 · 모서리 0 · 10 / 24 · 최소 40 · 본문 500 · weak / solid(흰 글) · 버튼 13 · 700 · 한 화면 하나. Result Section: 아이콘 40 · 제목 22/30 · 16/22 · 설명 muted · 버튼 둘(neutralWeak 40 + 글 버튼) · empty · failure · done. 글은 v106 그대로(스낵바도 마침표). 4 source(레시피 snackbar · callout · page-banner · result-section, sonner.tsx · alert.tsx 걷음 · 예제 · 미리보기) + 사이트 페이지 넷 + DESIGN*.md "알림 메시지" 절(Toast · Sonner · Banner 절 걷음). 옛 스펙은 `sonner.history` · `alert.history` 의 `v-pre-seed-feedback.*`. 사용자 결정(2026-10-02).
- **메뉴 · 메뉴 시트 · 도움말 말풍선 · 툴팁 (2026-10-02)**: 줄의 동작 목록과 도움말을 SEED 구조로 정했다 — **Menu**(1280 이상, 트리거에 붙는 동작 목록 — SEED Menu small, 옛 Dropdown Menu 를 대신) · **Menu Sheet**(1280 미만에 같은 목록을 아래에서 — SEED Menu Sheet, 새로) · **Help Bubble**(눌러서 여는 도움말 — 새로) · **Tooltip**(마우스 · 키보드의 보조 — SEED Help Bubble Tooltip). 메뉴는 실행만 한다 — 고른 표시(체크 · 라디오) · 단축키 · 하위 메뉴를 빼고, 값을 고르는 일(테마 · 정렬)은 Select · Segmented Control · Radio 가 맡는다. 데스크톱 줄의 동작은 줄 끝 ⋮ 하나(이름 "{줄 이름} 더보기") + Menu 이고, 위험한 동작은 맨 아래 묶음에 `fg-critical` 로 둔다 — 줄마다 늘 보이는 수정 · 삭제 아이콘 묶음을 걷는다. 폰 스와이프는 지름길로 남기고 같은 동작을 ⋮ → Menu Sheet 로도 연다(키보드 · 스크린리더의 길). **Menu**: 폭 200 · 위아래 8 · 줄 39(설명이 있으면 57) · 글 `t4` 14 · 아이콘 18 · 모서리 20 · `bg-layer-floating` · `shadow-s3` · 테두리 없음, 호버 · 누름은 좌우 8 들인 알약(모서리 12 · `bg-layer-floating-pressed`, 누르면 내용만 2px 거리 축소), 키보드 위치는 알약 자리의 2px 링(바탕 없음 — 호버와 따로 움직인다), 묶음 사이에만 1px `stroke-neutral-subtle`, 비모달(↑↓ 순환 · Home · End · 한 글자 찾기 · Enter · Space 로 실행 · Tab 이나 바깥으로 나가면 닫힘 — 줄을 고르면 메뉴를 닫고 초점을 트리거로 돌린 뒤 실행해 확인창과 겹치지 않는다) · 트리거 오른쪽 끝에 맞춤(SEED 는 가운데) · z 200. **Menu Sheet**: Bottom Sheet 규칙(딤 · 끌어내리기 · 안전 영역 · 모션) 위에 위 모서리 20 · 손잡이 늘 · 위 닫기 버튼 없음 · 제목 `t6` 18 · 700 가운데 · 묶음 `bg-neutral-weak` 모서리 16(묶음 사이 10 · 줄 사이 1px `stroke-neutral-weak`) · 줄 52 · 아이콘 22 · 글 `t5` 16 — 글만 쓰면 가운데 정렬. 줄을 누르면 시트를 닫고 실행하고, 보조 기술용 닫기는 키보드 초점이 오면 보인다. **Help Bubble · Tooltip** 은 한 모양이다 — `bg-neutral-inverted`(다크에서는 밝은 말풍선) · 위아래 10 · 좌우 12 · 모서리 12 · 제목 `t3` 13 · 700 · 설명 13 · 400 · 화살표 12 × 8 · 최대 280 · 트리거와 4 · 화면 끝 16 · 그림자 없음 · z 210. Help Bubble 은 눌러서 열고 닫기 버튼을 둘 수 있다(누르는 영역 44 · 초점 링은 말풍선 글자색 — 브랜드 링은 짙은 말풍선 위에서 3:1 에 못 미친다). Tooltip 은 마우스 200ms 뒤 · 떠나면 100ms · 키보드 초점은 바로 열리고, 말풍선 위로 옮겨도 닫히지 않는다(WCAG 1.4.13). 터치에서는 툴팁에 기대지 않는다 — 아이콘 버튼의 이름은 `aria-label`, 막힌 이유는 가까운 글, 더 알려 줄 것은 Help Bubble, 네이티브 `title` 은 걷는다. 세 제품 모두 쓰는 곳이 없던 Context Menu · Menubar · Hover Card 는 걷었다. 4 source(레시피 `Menu*` · `ResponsiveMenu*`(1280 에서 Menu ↔ Menu Sheet) · `MenuSheet*` · `HelpBubble*` · `Tooltip*`, dropdown-menu · context-menu · menubar · hover-card 레시피 걷음 · 예제 menu · menu-sheet · help-bubble 새로 · tooltip 다시 쓰고 셋 삭제 · 미리보기 메뉴 · 도움말 절) + 사이트 페이지 넷(같은 틀) + DESIGN*.md "메뉴 · 메뉴 시트 · 도움말 말풍선 · 툴팁" 절 · Swipe Actions 의 대신 길 · specs/z-index.md 의 메뉴 · 말풍선 자리. v83 모서리 표는 메뉴 · 말풍선 줄과 함께, Tabs · 시트 차례에 안 고친 dialog · bottom-sheet · tabs · segmented-control 줄도 YAML 값으로 고쳤다. 기초 Elevation 의 "시트 안 메뉴" 그림은 시트 안 Select 목록으로 바꿨다(폰에서 줄의 동작은 Menu Sheet 다). 옛 스펙은 `dropdown-menu.history` · `context-menu.history` · `menubar.history` · `hover-card.history` 의 `v-pre-seed-menu.*` 와 `tooltip.history/v-pre-seed-tooltip.*`. 토큰 추가 없음. 사용자 결정(2026-10-02).
- **날짜 · 시각 고르기 — Date Picker · Time Picker · Wheel Picker (2026-10-03)**: 날짜 · 시각을 SEED 구조로 새로 정했다 — **Date Picker**(옛 Calendar v61 · Date Range Picker v72 를 대신) · **Time Picker**(옛 v72 — 치는 칸 · 24시간을 대신) · **Wheel Picker**(새로). 날짜 · 시각은 치지 않고 Input Button 이 1280 미만 시트 · 이상 팝오버로 열어 "완료" 로 넣는다. **Date Picker**: 머리 48(제목 `t5` 700 + 셰브론 20, 이전 · 다음 ghost 40) · 요일 48(`t4` 500 `fg-neutral-subtle`) · 날짜 칸 48(폭 ÷ 7, 칸 전체가 누르는 자리) · 원 42 · 숫자 `t5` 500 `fg-neutral-muted` · 늘 6주(앞뒤 달은 흐리게 채우고 누르지 못한다 — SEED 는 비우고 4 ~ 6주) · 팝오버 336(칸 48 × 7). 오늘은 옅은 원 + 숫자 700(SEED 는 옅은 원만 — 바탕과 1.08:1), 고른 날 `bg-neutral-inverted`, 기간 띠 `bg-neutral-weak`(줄 끝에서 각지게), 막힌 날 `fg-disabled` + 취소선(초점은 간다), 읽기 전용 시작일 `stroke-neutral-solid`. 하루 · 기간 · 여러 날, 기간은 칸 하나에 "9월 28일~10월 6일" — 시트는 이어지는 달(아래 안개 96 · "초기화" + "완료"), 팝오버는 두 달(696 — Popover 최대 480 의 예외). 고르는 순서는 SEED(교환 없는 재시작). 빠른 기간 칩 한 벌(이번 주 = 일 ~ 토 · 이번 달 = 1일 ~ 말일 · 지난 달 · 최근 7 · 30일 · 3 · 6개월 · 1년 · 올해 — 달력 단위). 제목을 누르면 연 · 월 휠. 키보드는 WAI-ARIA Grid. **Time Picker**: 오전·오후 → 시(1 ~ 12, 오른쪽 정렬) → 분, 44 × 5 = 220 · 26 / 35 · 500 · 띠 `bg-neutral-weak` 모서리 8, 분 간격 기본 5(자리마다 1 · 10 · 15 · 30), 칸 표기 "오후 3:00" 와 같은 말. 날짜와 함께면 두 칸 나란히. **Wheel Picker**: medium 44 · small 36, 보이는 칸 5 · 7, 안개 min(40%, 3칸) — 달만 고르는 자리(예산 · 홈 · 카드 실적)도 연 · 월 휠 + "완료". 칸 표기는 올해 "10월 15일 (목)" · 다른 해 "2027년 1월 3일 (일)"(Input Button 예시도 맞췄다). 4 source(레시피 · 예제 · 미리보기) + 사이트 페이지 셋 + DESIGN*.md "날짜 · 시각 고르기" 절 · v83 모서리 표. 옛 스펙은 `calendar.history/v-pre-seed-date.*`. 토큰 추가 없음. 사용자 결정(2026-10-03 — 앞뒤 달 · 여러 날 · 읽기 전용은 추천과 달리 정함).
- **표시 — Badge · Notification Badge · Tag Group · Avatar · Divider (2026-10-03)**: 상태 · 메타 · 알림 · 사람 · 구분을 SEED 구조로 다시 정했다(비교 페이지 1 ~ 6 · "따라오는 것"). **Badge**(새로 씀): 둥근 사각 — medium 20(좌우 6 · 위아래 2 · 모서리 4 · `t1` 11/15) · large 24(8 · 4 · 6 · `t2` 12/16), 앞 아이콘 12 · 14 · 사이 2, 최대 폭 없음 · 한 줄. variant weak(`bg-*-weak` + `fg-*-contrast` · 500, 기본) · solid(`bg-*-solid` + 흰 글자 · 700) · outline(투명 + 안쪽 1px `stroke-*-weak` + `fg-*` · 700) × tone neutral · brand · informative · positive · warning · critical — 중립은 `bg-neutral-weak` + `fg-neutral-muted` · `bg-neutral-inverted` + `fg-neutral-inverted` · `stroke-neutral-weak`, warning solid 는 주황 + 흰 글자(5.06 · 5.79 — SEED 노랑 + 검정이 아니다). 누르지 않는다(누르는 배지 · 지우는 태그는 Chip), 알약은 Chip 에만, 한 대상에 둘까지. 모든 짝 4.5:1 이상. **Notification Badge**(새로): 점 6(`fg-brand` — 다크 밝은 짝) · 숫자 18(좌우 4 · 11/15 700 글자 크기 설정을 따르지 않음 · `bg-brand-solid` + 흰 글자), 0 은 안 보임 · 100 이상 "99+", 자리는 SEED(24 아이콘 — 점 x 17 ~ 23 · y 1 ~ 7, 숫자 왼쪽 아래 (16, 14), 글이면 끝 + 2). 점 · 숫자는 숨기고 붙은 버튼 · 탭 이름에("알림, 새 알림 3개"). 보면 사라지고, 한 화면에 아껴서. **Tag Group**(새로): 메타 줄 — 항목 사이 " · " 글자(앞 항목에 붙어 줄 끝에 남는다), `t2` 12/16(기본) · `t3` · `t4`, 항목 `fg-neutral-subtle`(5.50) · `fg-neutral` · `fg-brand` × 400 · 700, 구분 `fg-disabled`, 아이콘 하나(12 · 13 · 14), 낱말 단위 줄바꿈 또는 한 줄 말줄임(줄어드는 차례), 보조 기술에는 항목 사이 보이지 않는 ", "(SEED 는 "500m서초4동" 처럼 붙어 읽힌다). DESIGN.md Caption 의 메타 줄 규칙 · List 의 설명 줄이 이것이다. **Avatar**(새로 씀) + **Avatar Stack**: 원 · 1px 안쪽 `stroke-neutral-subtle` · 크기 SEED 10단계(20 ~ 108, 자리마다 대표 크기 — 80 · 96 은 Desk 계정 머리 · HR 큰 사진), 사진이 없으면 이니셜(첫 글자 · 로마자 대문자) + 이름 색(코드 포인트 합 % 10 → 차트 10색 v110 순서, 글자 `fg-neutral-inverted` 700 · 지름 40% — 4.55 ~ 7.70:1, 웹 · 앱 한 규칙). 묶음은 지름 1/4 겹침(−5 ~ −27) · 바탕색 링 1 ~ 5 · 뒤가 위 · 앞 4명 + "+N"(porest 가 더함). 이름 옆이면 장식. 물건 타일은 Avatar 가 아니다(Image Frame 차례). **Divider**(옛 Separator 를 대신): 1px `stroke-neutral-subtle` 하나(SEED 기본과 같은 진하기 — 새 토큰 없이) · 가로 · 세로 · 들임 16, 크게 다른 내용은 선이 아니라 8 간격(바탕 층), 기본 장식(SEED 는 `<hr>`). **List**: "합계에 안 드는 줄"(예정 · 환불) — 불투명도를 걷고 제목 · 금액만 `fg-neutral-subtle`, 환불 금액 취소선, 배지는 보통 대비. 스펙 다섯(`badge` · `notification-badge` · `tag-group` · `avatar`(+ `avatar-stack.yaml`) · `divider`) + `list.md` + DESIGN*.md "Badge · Notification Badge · Tag Group" · "Divider" · "Avatar · Avatar Stack" 절 · Caption 메타 줄 · Tabs 알림 점 색(`fg-brand` 로 바로잡음) · v83 모서리 표. 옛 스펙은 `badge.history` · `avatar.history` · `separator.history` 의 `v-pre-seed-display.*`. 토큰은 v117 넷. 사용자 결정(2026-10-03 — 알약 배지 · 진한 선 · 위험 색 점 · 사람 그림 · 옛 32 · 40 · 48 · 64 는 고르지 않았다).

### Fixed
- **v9**: 매 batch마다 lint 결과를 손계산만 하던 방식 발견 → 16 sparse component를 매핑해 lint contrastCheck 자동 검증 활성. 이후 모든 토큰 추가는 components 매핑 동반.
- **v49**: outdated prose token references 정리 (P2-F follow-up). v17 file split 후 brand-specific token reference 잔재 제거 + spec과 비동기 표현 cleanup. `scripts/lint-prose.mjs`가 prose token reference 정합성 자동 검증.
- **문서 사이트 스펙 사이 링크 (2026-10-02)**: 스펙 md 끼리 건 링크(`[Field](field.md)` · `specs/components/list.md` · `../z-index.md`)가 사이트에서 `x.md` 로 남아 눌러도 · 미리 받아도 404 였다(컴포넌트 페이지에서 230여 개). 사이트를 만들 때 `/docs/components/<이름>` · `/docs/foundations/z-index` 로 바꾸고, 사이트에 없는 스펙은 GitHub 원본으로 보낸다(`site/scripts/gen-content.mjs`).
- **Radius 컴포넌트 매핑 표 (2026-10-02)**: Text Field · Select 를 SEED 로 바꾸면서 이 표를 안 고쳐, Radius 페이지가 Input · Textarea · Select 를 여전히 4px 로 보였다(실제 12 · 8, 목록 20). 지운 Combobox · Date Picker 줄도 남아 있었다. 스펙 YAML 값으로 고치고, 빠져 있던 Select Box · List 줄을 더했다.
- **사이트 버튼 그림 좌우 여백 (2026-10-02)**: 다른 페이지에서 링크로 들어오면 컴포넌트 페이지의 버튼 그림이 좌우 여백 없이 글자만큼 좁아졌다(새로고침하면 정상). 버튼 그림이 인라인 스타일에 `padding` 과 `paddingLeft: undefined` · `paddingRight: undefined` 를 같이 넘겨, 서버 HTML 에서는 빠지던 값을 브라우저 렌더에서 React 가 빈 값으로 지웠다. 여백을 `padding` 한 속성으로 끝까지 적는다(`site/components/specs/button-view.tsx`). 79쪽 전부 바로 열기 · 링크로 들어오기 계산값이 같다.

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
