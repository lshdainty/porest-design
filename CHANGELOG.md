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
