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

### Changed
- **v8**: `accent-*-on-dark` → `accent-*-light` rename — `-dark` suffix가 mode pair 표기와 충돌(예: `accent-hr-on-dark` vs `surface-default-dark`)
- **v14 → v15**: HR/Desk별 `bg-page` fork 시도 → `#F5F6FA` 통일 회귀 — fork 시 `primary-hr` × `bg-page-hr` 인라인 4.14:1(AA 미달) 발생
- **v17**: 단일 `DESIGN.md` → shared baseline + `DESIGN.{hr,desk}.md` self-contained 3파일 분리. 이유: spec이 cross-file `{colors.X}` reference 미지원 → brand context 암묵 명명(`primary` 등) 사용 가능, lint missingPrimary warning 해소(brand 파일 0 warnings).
- **v51**: semantic 4 base vivid refresh — `success` `#117A3A`→`#16803F` (emerald, green-700), `error` `#C53030`→`#DC2626` (red-600), `warning` `#A85800`→`#C2410C` (orange), `info` `#006395`→`#1D6FCB` (sky-600). 1차안 `success #1A8E4F`(4.18:1) lint 미달 → `#16803F`(L 0.16, ~4.97:1)로 보수 조정. 이유: v10 base가 본문 4.5:1 안전 마진 위해 L 0.13~0.17로 어둡게 잡혀 칙칙한 인상.
- **v52**: warning 톤 미세 brighten — `#C2410C`→`#C84D0E` (L 0.15→0.17, ~4.69:1). 다른 3개 대비 어두운 인상 해소, v53 light(orange-400)와 hue 일치 사전 조정.
- **v53**: semantic 4 light vivid refresh — `success-light` `#5DC07B`→`#4ADE80` (green-400), `error-light` `#F08080`→`#F87171` (red-400), `warning-light` `#E8A05A`→`#FB923C` (orange-400 — 가장 큰 hue 변화, base와 일치), `info-light` `#6FAEDF`→`#60A5FA` (blue-400). Tailwind 400 톤 채택, 다크 alert 4.5:1 silent pass.

### Fixed
- **v9**: 매 batch마다 lint 결과를 손계산만 하던 방식 발견 → 16 sparse component를 매핑해 lint contrastCheck 자동 검증 활성. 이후 모든 토큰 추가는 components 매핑 동반.
- **v49**: outdated prose token references 정리 (P2-F follow-up). v17 file split 후 brand-specific token reference 잔재 제거 + spec과 비동기 표현 cleanup. `scripts/lint-prose.mjs`가 prose token reference 정합성 자동 검증.

### Tooling
- **v29**: `scripts/sync-shared-tokens.mjs` 추가 — `typography`/`rounded`/`spacing` 블록 자동 sync (DESIGN.md → HR/Desk), colors 47 공유 토큰 drift detection. `npm run sync` / `sync:check` / `verify` (sync:check + lint:all 통합).
- **v30**: `scripts/build-tailwind-v4.mjs` 추가 — Tailwind v4 `@theme` CSS 빌드(외부 의존성 없음). prose shadow + (v32~) motion 자동 추출. `package.json` export scripts 정정 (잘못된 `css-tailwind` 포맷명, `design.md` 직접 호출 → `npx @google/design.md` + `tailwind`/`dtcg`).
- **(별도 commit `b4ee2c8`)**: pre-commit hook (`.husky/pre-commit`) — `npm run verify` 자동 실행. 의존성 추가 0 (native `core.hooksPath`, husky 패키지 미사용). 토큰/spec 변경 없는 tooling commit이라 milestone 번호 미부여 (CHANGELOG 초안에 v31로 잘못 표기 → 정정. 백업 부재로 ground truth 명확).
- **v50**: `scripts/sync-shared-tokens.mjs` 확장 — `@sync:shared-{start,end} (colors-N)` markers 도입. colors-1 (neutral: bg/surface/text/border) + colors-2 (semantic + chart) region 자동 동기. typography/rounded/spacing 블록 + colors region 통합 drift detection.

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
