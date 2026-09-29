---
version: alpha
name: Porest
description: |
  People + Forest. Dual-brand design system for Porest HR (B2B) 
  and Porest Desk (B2C). Optimized for Korean-first audiences,
  all-ages accessibility.

colors:
  # @sync:brand-start (colors-1)
  # === Brand (HR primary, single-brand 명명 — DESIGN.hr.md context) ===
  primary: "#357B5F"
  primary-light: "#6BAE8C"
  # @sync:brand-end (colors-1)
  
  # @sync:shared-start (colors-1)
  # === Neutral - Page background (HR/Desk 공유) ===
  bg-page: "#F5F6FA"
  bg-page-dark: "#1A1F2E"
  
  # === Neutral - Surface (카드/시트/입력 표면, 공통) ===
  surface-default: "#FFFFFF"
  surface-default-dark: "#242938"
  surface-input: "#F0F2F7"
  surface-input-dark: "#2D3346"
  
  # === Neutral - Text (본문/보조/3차/accent 위, 공통) ===
  text-primary: "#1A1F2E"
  text-primary-dark: "#F5F6FA"
  text-secondary: "#4E5968"
  text-secondary-dark: "#B0B8C4"
  text-tertiary: "#62697A"
  text-tertiary-dark: "#9DA3B0"
  text-disabled: "#828995"
  text-disabled-dark: "#7A8294"
  text-on-accent: "#FFFFFF"
  
  # === Neutral - Border (장식 외곽선/필수 UI 외곽선, 공통) ===
  border-default: "#E5E8EF"
  border-default-dark: "#353B4D"
  border-strong: "#7D8593"
  border-strong-dark: "#8B95A8"
  # @sync:shared-end (colors-1)
  
  # @sync:brand-start (colors-2)
  # === Brand - Focus ring (HR primary 시맨틱 alias) ===
  border-focus: "#357B5F"
  border-focus-light: "#6BAE8C"
  # @sync:brand-end (colors-2)
  
  # @sync:shared-start (colors-2)
  # === Semantic - Status (functional palette, base + light 페어, 듀얼 브랜드 공유) ===
  success: "#167F3F"
  success-light: "#4ADE80"
  error: "#D72323"
  error-light: "#F87171"
  warning: "#BE490D"
  warning-light: "#FB923C"
  info: "#1D6EC9"
  info-light: "#60A5FA"
  
  # === Chart palette (data viz, 10색 hue 균등, L≈0.16-0.18 통일, 듀얼 브랜드 공유) ===
  # 1차 5색 (v21): red, orange, yellow, green, blue. 2차 5색은 v22, dark 변형은 v23-v24.
  chart-red: "#C73838"
  chart-orange: "#B36418"
  chart-yellow: "#8C7400"
  chart-green: "#2D8060"
  chart-blue: "#2C70BF"
  chart-indigo: "#5E60C8"
  chart-violet: "#8B4DBA"
  chart-pink: "#B83B7A"
  chart-brown: "#9A6536"
  chart-gray: "#6B7484"
  # chart dark 변형 (어두운 표면용, L≈0.45-0.55, v23-v24)
  chart-red-light: "#ECA0A0"
  chart-orange-light: "#E8B266"
  chart-yellow-light: "#D4B83A"
  chart-green-light: "#6BCB86"
  chart-blue-light: "#7BBBED"
  chart-indigo-light: "#ABB0F0"
  chart-violet-light: "#D2A8EC"
  chart-pink-light: "#ECA0BC"
  chart-brown-light: "#DCB088"
  chart-gray-light: "#B5BBC5"
  # @sync:shared-end (colors-2)
  
  # @sync:brand-start (colors-3)
  # === v102 — 브랜드 역할 색 (HR). 파일 안에서는 접미사 없이 같은 이름 ===
  # 글자 (fg)
  fg-brand: "#357B5F"
  fg-brand-dark: "#6BAE8C"
  fg-brand-contrast: "#33765B"
  fg-brand-contrast-dark: "#6CAE8D"
  # 배경 (bg)
  bg-brand-solid: "#357B5F"
  bg-brand-solid-dark: "#357B5F"
  bg-brand-solid-pressed: "#2E6C53"
  bg-brand-solid-pressed-dark: "#2E6C53"
  bg-brand-weak: "#EFF4F2"
  bg-brand-weak-dark: "#26333D"
  bg-brand-weak-pressed: "#E3EDE9"
  bg-brand-weak-pressed-dark: "#283B41"
  # 선 (stroke)
  stroke-focus-ring: "#357B5F"
  stroke-focus-ring-dark: "#6BAE8C"
  stroke-brand-solid: "#357B5F"
  stroke-brand-solid-dark: "#6BAE8C"
  stroke-brand-weak: "#6BAE8C"
  stroke-brand-weak-dark: "#6BAE8C"
  # @sync:brand-end (colors-3)
  
  # @sync:shared-start (colors-3)
  # === v102 — SEED 역할 색 (fg · bg · stroke). 값은 porest 색이고, 옛 이름(text-* · surface-* · border-* · success …)은 같은 값의 별칭이다 ===
  # 글자 (fg)
  fg-neutral: "#1A1F2E"
  fg-neutral-dark: "#F5F6FA"
  fg-neutral-muted: "#4E5968"
  fg-neutral-muted-dark: "#B0B8C4"
  fg-neutral-subtle: "#62697A"
  fg-neutral-subtle-dark: "#9DA3B0"
  fg-neutral-inverted: "#FFFFFF"
  fg-neutral-inverted-dark: "#1A1F2E"
  fg-placeholder: "#62697A"
  fg-placeholder-dark: "#9DA3B0"
  fg-disabled: "#828995"
  fg-disabled-dark: "#7A8294"
  static-white: "#FFFFFF"
  fg-critical: "#D72323"
  fg-critical-dark: "#F87171"
  fg-positive: "#167F3F"
  fg-positive-dark: "#4ADE80"
  fg-warning: "#BE490D"
  fg-warning-dark: "#FB923C"
  fg-informative: "#1D6EC9"
  fg-informative-dark: "#60A5FA"
  fg-critical-contrast: "#C11F1F"
  fg-critical-contrast-dark: "#F87676"
  fg-positive-contrast: "#14753A"
  fg-positive-contrast-dark: "#4ADE80"
  fg-warning-contrast: "#AD420C"
  fg-warning-contrast-dark: "#FB923C"
  fg-informative-contrast: "#1B65B9"
  fg-informative-contrast-dark: "#65A8FA"
  # 배경 (bg)
  bg-layer-basement: "#F5F6FA"
  bg-layer-basement-dark: "#1A1F2E"
  bg-layer-default: "#FFFFFF"
  bg-layer-default-dark: "#242938"
  bg-layer-default-pressed: "#F0F2F7"
  bg-layer-default-pressed-dark: "#2D3346"
  bg-layer-floating: "#FFFFFF"
  bg-layer-floating-dark: "#2D3346"
  bg-layer-floating-pressed: "#F0F2F7"
  bg-layer-floating-pressed-dark: "#353B4D"
  bg-neutral-weak: "#F0F2F7"
  bg-neutral-weak-dark: "#2D3346"
  bg-neutral-weak-pressed: "#E5E8EF"
  bg-neutral-weak-pressed-dark: "#353B4D"
  bg-neutral-inverted: "#1A1F2E"
  bg-neutral-inverted-dark: "#F5F6FA"
  bg-disabled: "#F0F2F7"
  bg-disabled-dark: "#2D3346"
  bg-critical-solid: "#D72323"
  bg-critical-solid-dark: "#D72323"
  bg-critical-solid-pressed: "#C42020"
  bg-critical-solid-pressed-dark: "#C42020"
  bg-critical-weak: "#FAE5E5"
  bg-critical-weak-dark: "#442834"
  bg-critical-weak-pressed: "#F8D7D7"
  bg-critical-weak-pressed-dark: "#562732"
  bg-positive-solid: "#167F3F"
  bg-positive-solid-dark: "#167F3F"
  bg-positive-solid-pressed: "#136C36"
  bg-positive-solid-pressed-dark: "#136C36"
  bg-positive-weak: "#E3F0E8"
  bg-positive-weak-dark: "#213839"
  bg-positive-weak-pressed: "#D5E8DC"
  bg-positive-weak-pressed-dark: "#20413A"
  bg-warning-solid: "#BE490D"
  bg-warning-solid-dark: "#BE490D"
  bg-warning-solid-pressed: "#A9410C"
  bg-warning-solid-pressed-dark: "#A9410C"
  bg-warning-weak: "#F7E9E2"
  bg-warning-weak-dark: "#402F30"
  bg-warning-weak-pressed: "#F3DED3"
  bg-warning-weak-pressed-dark: "#4F322C"
  bg-informative-solid: "#1D6EC9"
  bg-informative-solid-dark: "#1D6EC9"
  bg-informative-solid-pressed: "#1A63B6"
  bg-informative-solid-pressed-dark: "#1A63B6"
  bg-informative-weak: "#E4EEF9"
  bg-informative-weak-dark: "#233552"
  bg-informative-weak-pressed: "#D6E5F5"
  bg-informative-weak-pressed-dark: "#223C61"
  # 선 (stroke)
  stroke-neutral-subtle: "#E5E8EF"
  stroke-neutral-subtle-dark: "#353B4D"
  stroke-neutral-weak: "#E5E8EF"
  stroke-neutral-weak-dark: "#353B4D"
  stroke-neutral-solid: "#7D8593"
  stroke-neutral-solid-dark: "#8B95A8"
  stroke-critical-solid: "#D72323"
  stroke-critical-solid-dark: "#F87171"
  stroke-positive-solid: "#167F3F"
  stroke-positive-solid-dark: "#4ADE80"
  stroke-warning-solid: "#BE490D"
  stroke-warning-solid-dark: "#FB923C"
  stroke-informative-solid: "#1D6EC9"
  stroke-informative-solid-dark: "#60A5FA"
  # @sync:shared-end (colors-3)
  
  # (border-focus 정의 완료 — v16)

typography:
  # v100 — SEED 타입 스케일(2026-09-29). 크기 t1~t14 와 줄 높이는 SEED 와 같은 px, 굵기는 400 —
  # 강조는 500 · 700 인라인 modifier(SEED t5Medium · t5Bold). 긴 글은 article-body · article-note.
  t1:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 15px
  t2:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
  t3:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
  t4:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 19px
  t5:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 22px
  t6:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 24px
  t7:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 27px
  t8:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 30px
  t9:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 32px
  t10:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 26px
    fontWeight: 400
    lineHeight: 35px
  t11:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 38px
  t12:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 42px
  t13:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 40px
    fontWeight: 400
    lineHeight: 52px
  t14:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 60px
  screen-title:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 26px
    fontWeight: 700
    lineHeight: 35px
  article-body:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  article-note:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
  # 옛 15단계(v82) — 컴포넌트가 새 스케일로 옮기는 동안 값 그대로 둔다(본문 15px 은 자리마다 14 · 16 으로).
  # v82 — Airbnb 태그명(display/title/body/label/caption/badge/overline) 채택,
  # 사양은 한국어 본문 가독성 우선(Pretendard, lh 본문 1.5+). 21 → 15.
  display-xl:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -1.12px
  display-lg:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.4px
  display-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.32px
  display-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
  title-lg:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
  title-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  title-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
  body-lg:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  label-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  badge:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
  overline:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.8px

rounded:
  # v99 — SEED radius 스케일(2px ~ 24px 10단계 + full). 이름도 SEED 와 같다(r1 = 4px).
  r0_5: 2px
  r1: 4px
  r1_5: 6px
  r2: 8px
  r2_5: 10px
  r3: 12px
  r3_5: 14px
  r4: 16px
  r5: 20px
  r6: 24px
  full: 9999px
  # 옛 이름 — 옮기는 동안의 별칭(값은 위 SEED 이름과 같다). 스펙 · 제품이 다 옮기면 걷는다.
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 20px

spacing:
  # v98 — SEED dimension 스케일(2px 단위 19단계). 이름도 SEED 와 같다(x1 = 4px).
  x0_5: "2px"
  x1: "4px"
  x1_5: "6px"
  x2: "8px"
  x2_5: "10px"
  x3: "12px"
  x3_5: "14px"
  x4: "16px"
  x4_5: "18px"
  x5: "20px"
  x6: "24px"
  x7: "28px"
  x8: "32px"
  x9: "36px"
  x10: "40px"
  x12: "48px"
  x13: "52px"
  x14: "56px"
  x16: "64px"
  # 옛 이름 — 옮기는 동안의 별칭(값은 위 SEED 이름과 같다). 스펙 · 제품이 다 옮기면 걷는다.
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  # v101 — SEED 역할 간격(SEED spacing-x · spacing-y). 값은 위 스케일을 가리킨다.
  global-gutter: "24px"  # x6 — SEED 는 x4(16px). porest 는 앱 규칙(2026-09-14, 본문 24)을 둔다
  between-chips: "8px"  # x2
  component-default: "12px"  # x3
  between-text: "6px"  # x1_5
  nav-to-title: "20px"  # x5
  screen-bottom: "56px"  # x14

components:
  # === Primary 버튼 (HR primary 채움 + 흰 텍스트) ===
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-accent}"
  
  # === Outlined 버튼 (어두운 표면 위 primary-light 텍스트) ===
  button-outline-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.primary-light}"
  
  # === 카드 (surface 위 primary 텍스트) ===
  card-light:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.text-primary}"
  card-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.text-primary-dark}"
  
  # === 페이지 본문 (bg-page 위 primary 텍스트) ===
  page-text-light:
    backgroundColor: "{colors.bg-page}"
    textColor: "{colors.text-primary}"
  page-text-dark:
    backgroundColor: "{colors.bg-page-dark}"
    textColor: "{colors.text-primary-dark}"
  
  # === 입력 필드 (surface-input 위 primary 텍스트) ===
  input-light:
    backgroundColor: "{colors.surface-input}"
    textColor: "{colors.text-primary}"
  input-dark:
    backgroundColor: "{colors.surface-input-dark}"
    textColor: "{colors.text-primary-dark}"
  
  # === 캡션·메타 (secondary 텍스트, surface 위) ===
  caption-on-card-light:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.text-secondary}"
  caption-on-card-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.text-secondary-dark}"
  
  # === Divider / Outline (border 토큰을 1px 시각 요소의 배경색으로 사용) ===
  # NOTE: 이 컴포넌트들은 textColor 없음 — lint contrast 룰은 미발동.
  # border vs 인접 surface 대비는 spec에 borderColor 프로퍼티가 없어 자동 검증 불가.
  divider-light:
    backgroundColor: "{colors.border-default}"
  divider-dark:
    backgroundColor: "{colors.border-default-dark}"
  outline-strong-light:
    backgroundColor: "{colors.border-strong}"
  outline-strong-dark:
    backgroundColor: "{colors.border-strong-dark}"
  
  # === Focus ring (1px outline, sparse — primary 토큰이 contrast 검증 담당) ===
  focus-ring-on-light:
    backgroundColor: "{colors.border-focus}"
  focus-ring-on-dark:
    backgroundColor: "{colors.border-focus-light}"
  
  # === Semantic 채움 badge (semantic 배경 + 흰 텍스트) ===
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.text-on-accent}"
  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.text-on-accent}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.text-on-accent}"
  badge-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.text-on-accent}"
  
  # === Semantic 인라인 텍스트 (흰 카드 위 semantic 텍스트) ===
  alert-text-success:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.success}"
  alert-text-error:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.error}"
  alert-text-warning:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.warning}"
  alert-text-info:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.info}"
  
  # === Semantic 다크 표면 위 인라인 텍스트 (-light 변형) ===
  alert-text-success-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.success-light}"
  alert-text-error-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.error-light}"
  alert-text-warning-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.warning-light}"
  alert-text-info-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.info-light}"
  
  # === User identification (v58: avatar — chart palette categorical) ===
  avatar:
    backgroundColor: "{colors.chart-blue}"
    textColor: "{colors.text-on-accent}"
  
  # === Chart elements (sparse, fill/stroke 용도 — chart 요소는 textColor 페어가 아님) ===
  chart-color-red:
    backgroundColor: "{colors.chart-red}"
  chart-color-orange:
    backgroundColor: "{colors.chart-orange}"
  chart-color-yellow:
    backgroundColor: "{colors.chart-yellow}"
  chart-color-green:
    backgroundColor: "{colors.chart-green}"
  chart-color-blue:
    backgroundColor: "{colors.chart-blue}"
  chart-color-indigo:
    backgroundColor: "{colors.chart-indigo}"
  chart-color-violet:
    backgroundColor: "{colors.chart-violet}"
  chart-color-pink:
    backgroundColor: "{colors.chart-pink}"
  chart-color-brown:
    backgroundColor: "{colors.chart-brown}"
  chart-color-gray:
    backgroundColor: "{colors.chart-gray}"
  # chart dark 변형 컴포넌트 (어두운 표면 위)
  chart-color-red-on-dark:
    backgroundColor: "{colors.chart-red-light}"
  chart-color-orange-on-dark:
    backgroundColor: "{colors.chart-orange-light}"
  chart-color-yellow-on-dark:
    backgroundColor: "{colors.chart-yellow-light}"
  chart-color-green-on-dark:
    backgroundColor: "{colors.chart-green-light}"
  chart-color-blue-on-dark:
    backgroundColor: "{colors.chart-blue-light}"
  chart-color-indigo-on-dark:
    backgroundColor: "{colors.chart-indigo-light}"
  chart-color-violet-on-dark:
    backgroundColor: "{colors.chart-violet-light}"
  chart-color-pink-on-dark:
    backgroundColor: "{colors.chart-pink-light}"
  chart-color-brown-on-dark:
    backgroundColor: "{colors.chart-brown-light}"
  chart-color-gray-on-dark:
    backgroundColor: "{colors.chart-gray-light}"
  
  # === Tertiary 텍스트 (placeholder, caption-tertiary, hint) ===
  caption-tertiary-on-card-light:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.text-tertiary}"
  caption-tertiary-on-card-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.text-tertiary-dark}"
  placeholder-on-input-light:
    backgroundColor: "{colors.surface-input}"
    textColor: "{colors.text-tertiary}"
  placeholder-on-input-dark:
    backgroundColor: "{colors.surface-input-dark}"
    textColor: "{colors.text-tertiary-dark}"
  
  # === Disabled 텍스트 (textColor만 — WCAG 1.4.3 incidental 예외 인정, lint contrast 룰 비대상) ===
  # textColor만 가진 sparse 컴포넌트는 contrastCheck 미발동. 부모 표면 색은 런타임 상속.
  disabled-label-light:
    textColor: "{colors.text-disabled}"
  disabled-label-dark:
    textColor: "{colors.text-disabled-dark}"
  
  # === v102 — 역할 색 짝 (SEED 역할 — 글자가 놓이는 배경과 함께). 짝마다 대비를 lint 가 잰다(라이트 · 다크) ===
  role-neutral-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-neutral-muted-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-neutral-muted}"
  role-neutral-muted-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-neutral-muted-dark}"
  role-neutral-subtle-on-basement-light:
    backgroundColor: "{colors.bg-layer-basement}"
    textColor: "{colors.fg-neutral-subtle}"
  role-neutral-subtle-on-basement-dark:
    backgroundColor: "{colors.bg-layer-basement-dark}"
    textColor: "{colors.fg-neutral-subtle-dark}"
  role-placeholder-on-neutral-weak-light:
    backgroundColor: "{colors.bg-neutral-weak}"
    textColor: "{colors.fg-placeholder}"
  role-placeholder-on-neutral-weak-dark:
    backgroundColor: "{colors.bg-neutral-weak-dark}"
    textColor: "{colors.fg-placeholder-dark}"
  role-neutral-on-default-pressed-light:
    backgroundColor: "{colors.bg-layer-default-pressed}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-default-pressed-dark:
    backgroundColor: "{colors.bg-layer-default-pressed-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-neutral-on-floating-light:
    backgroundColor: "{colors.bg-layer-floating}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-floating-dark:
    backgroundColor: "{colors.bg-layer-floating-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-neutral-on-floating-pressed-light:
    backgroundColor: "{colors.bg-layer-floating-pressed}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-floating-pressed-dark:
    backgroundColor: "{colors.bg-layer-floating-pressed-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-neutral-on-weak-pressed-light:
    backgroundColor: "{colors.bg-neutral-weak-pressed}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-neutral-weak-pressed-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-inverted-light:
    backgroundColor: "{colors.bg-neutral-inverted}"
    textColor: "{colors.fg-neutral-inverted}"
  role-inverted-dark:
    backgroundColor: "{colors.bg-neutral-inverted-dark}"
    textColor: "{colors.fg-neutral-inverted-dark}"
  role-critical-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-critical}"
  role-critical-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-critical-dark}"
  role-on-critical-solid-light:
    backgroundColor: "{colors.bg-critical-solid}"
    textColor: "{colors.static-white}"
  role-on-critical-solid-dark:
    backgroundColor: "{colors.bg-critical-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-critical-solid-pressed-light:
    backgroundColor: "{colors.bg-critical-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-critical-solid-pressed-dark:
    backgroundColor: "{colors.bg-critical-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-critical-contrast-on-weak-light:
    backgroundColor: "{colors.bg-critical-weak}"
    textColor: "{colors.fg-critical-contrast}"
  role-critical-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-critical-weak-dark}"
    textColor: "{colors.fg-critical-contrast-dark}"
  role-critical-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-critical-weak-pressed}"
    textColor: "{colors.fg-critical-contrast}"
  role-critical-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-critical-weak-pressed-dark}"
    textColor: "{colors.fg-critical-contrast-dark}"
  role-positive-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-positive}"
  role-positive-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-positive-dark}"
  role-on-positive-solid-light:
    backgroundColor: "{colors.bg-positive-solid}"
    textColor: "{colors.static-white}"
  role-on-positive-solid-dark:
    backgroundColor: "{colors.bg-positive-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-positive-solid-pressed-light:
    backgroundColor: "{colors.bg-positive-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-positive-solid-pressed-dark:
    backgroundColor: "{colors.bg-positive-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-positive-contrast-on-weak-light:
    backgroundColor: "{colors.bg-positive-weak}"
    textColor: "{colors.fg-positive-contrast}"
  role-positive-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-positive-weak-dark}"
    textColor: "{colors.fg-positive-contrast-dark}"
  role-positive-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-positive-weak-pressed}"
    textColor: "{colors.fg-positive-contrast}"
  role-positive-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-positive-weak-pressed-dark}"
    textColor: "{colors.fg-positive-contrast-dark}"
  role-warning-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-warning}"
  role-warning-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-warning-dark}"
  role-on-warning-solid-light:
    backgroundColor: "{colors.bg-warning-solid}"
    textColor: "{colors.static-white}"
  role-on-warning-solid-dark:
    backgroundColor: "{colors.bg-warning-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-warning-solid-pressed-light:
    backgroundColor: "{colors.bg-warning-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-warning-solid-pressed-dark:
    backgroundColor: "{colors.bg-warning-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-warning-contrast-on-weak-light:
    backgroundColor: "{colors.bg-warning-weak}"
    textColor: "{colors.fg-warning-contrast}"
  role-warning-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-warning-weak-dark}"
    textColor: "{colors.fg-warning-contrast-dark}"
  role-warning-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-warning-weak-pressed}"
    textColor: "{colors.fg-warning-contrast}"
  role-warning-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-warning-weak-pressed-dark}"
    textColor: "{colors.fg-warning-contrast-dark}"
  role-informative-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-informative}"
  role-informative-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-informative-dark}"
  role-on-informative-solid-light:
    backgroundColor: "{colors.bg-informative-solid}"
    textColor: "{colors.static-white}"
  role-on-informative-solid-dark:
    backgroundColor: "{colors.bg-informative-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-informative-solid-pressed-light:
    backgroundColor: "{colors.bg-informative-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-informative-solid-pressed-dark:
    backgroundColor: "{colors.bg-informative-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-informative-contrast-on-weak-light:
    backgroundColor: "{colors.bg-informative-weak}"
    textColor: "{colors.fg-informative-contrast}"
  role-informative-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-informative-weak-dark}"
    textColor: "{colors.fg-informative-contrast-dark}"
  role-informative-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-informative-weak-pressed}"
    textColor: "{colors.fg-informative-contrast}"
  role-informative-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-informative-weak-pressed-dark}"
    textColor: "{colors.fg-informative-contrast-dark}"
  role-disabled-surface-light:
    backgroundColor: "{colors.bg-disabled}"
  role-disabled-surface-dark:
    backgroundColor: "{colors.bg-disabled-dark}"
  role-disabled-label-light:
    textColor: "{colors.fg-disabled}"
  role-disabled-label-dark:
    textColor: "{colors.fg-disabled-dark}"
  role-stroke-neutral-subtle-light:
    backgroundColor: "{colors.stroke-neutral-subtle}"
  role-stroke-neutral-subtle-dark:
    backgroundColor: "{colors.stroke-neutral-subtle-dark}"
  role-stroke-neutral-weak-light:
    backgroundColor: "{colors.stroke-neutral-weak}"
  role-stroke-neutral-weak-dark:
    backgroundColor: "{colors.stroke-neutral-weak-dark}"
  role-stroke-neutral-solid-light:
    backgroundColor: "{colors.stroke-neutral-solid}"
  role-stroke-neutral-solid-dark:
    backgroundColor: "{colors.stroke-neutral-solid-dark}"
  role-stroke-critical-solid-light:
    backgroundColor: "{colors.stroke-critical-solid}"
  role-stroke-critical-solid-dark:
    backgroundColor: "{colors.stroke-critical-solid-dark}"
  role-stroke-positive-solid-light:
    backgroundColor: "{colors.stroke-positive-solid}"
  role-stroke-positive-solid-dark:
    backgroundColor: "{colors.stroke-positive-solid-dark}"
  role-stroke-warning-solid-light:
    backgroundColor: "{colors.stroke-warning-solid}"
  role-stroke-warning-solid-dark:
    backgroundColor: "{colors.stroke-warning-solid-dark}"
  role-stroke-informative-solid-light:
    backgroundColor: "{colors.stroke-informative-solid}"
  role-stroke-informative-solid-dark:
    backgroundColor: "{colors.stroke-informative-solid-dark}"
  
  # === v102 — 브랜드 역할 색 짝. 짝마다 대비를 lint 가 잰다(라이트 · 다크) ===
  role-brand-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-brand}"
  role-brand-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-brand-dark}"
  role-on-brand-solid-light:
    backgroundColor: "{colors.bg-brand-solid}"
    textColor: "{colors.static-white}"
  role-on-brand-solid-dark:
    backgroundColor: "{colors.bg-brand-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-brand-solid-pressed-light:
    backgroundColor: "{colors.bg-brand-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-brand-solid-pressed-dark:
    backgroundColor: "{colors.bg-brand-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-brand-contrast-on-weak-light:
    backgroundColor: "{colors.bg-brand-weak}"
    textColor: "{colors.fg-brand-contrast}"
  role-brand-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-brand-weak-dark}"
    textColor: "{colors.fg-brand-contrast-dark}"
  role-brand-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-brand-weak-pressed}"
    textColor: "{colors.fg-brand-contrast}"
  role-brand-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-brand-weak-pressed-dark}"
    textColor: "{colors.fg-brand-contrast-dark}"
  role-stroke-focus-ring-light:
    backgroundColor: "{colors.stroke-focus-ring}"
  role-stroke-focus-ring-dark:
    backgroundColor: "{colors.stroke-focus-ring-dark}"
  role-stroke-brand-solid-light:
    backgroundColor: "{colors.stroke-brand-solid}"
  role-stroke-brand-solid-dark:
    backgroundColor: "{colors.stroke-brand-solid-dark}"
  role-stroke-brand-weak-light:
    backgroundColor: "{colors.stroke-brand-weak}"
  role-stroke-brand-weak-dark:
    backgroundColor: "{colors.stroke-brand-weak-dark}"
---

## Overview — Porest HR (B2B)

본 파일은 **Porest HR(B2B 조직 관리)** 단독 self-contained 디자인 시스템(v17~). 공유 baseline은 `DESIGN.md` 참조. 본 파일에서 토큰명의 `-hr` 접미사는 컨텍스트가 HR로 암묵적이라 생략 — `primary` = `#357B5F` (forest green), `button-primary` 등.

Desk(B2C 개인 생산성)는 별도 `DESIGN.desk.md` 파일 — `primary` = `#0147AD` (deep navy).

레퍼런스 — 토스의 신뢰감 있는 미니멀리즘, 전 연령 가독성.

## Colors

### v102 — SEED 역할 색 (2026-09-29)

당근 SEED 의 역할 기반 색 체계를 들인다. 사용자가 2026-09-29 porest 와 SEED 를 나란히 놓은 비교 페이지에서 네 가지(구조 · 값 · AA 미달 · HR 웹)를 정하고, 역할 색 제안표를 보고 그대로 넣기로 했다.

**아직 두 웹 · 앱에는 들어가지 않았다.** Desk 웹 · 앱은 같은 역할을 각자 정의해 쓰고 있고(웹 68개 · 앱 67개, 합쳐 4,700여 곳), 앱 PR 에서 그 정의를 이 표에서 만들어 쓰게 바꾼다.

이름은 SEED 처럼 속성 · 역할 · 변형 · 상태 순이다 — 예: fg-critical-contrast, bg-brand-solid-pressed.

| 자리 | 값 |
|---|---|
| 속성 | fg(글자 · 아이콘) · bg(배경) · stroke(선) |
| 역할 | neutral · layer · brand · critical · positive · warning · informative |
| 변형 | solid(채움) · weak(약한 배경) · contrast(약한 배경 위 글자) · muted · subtle · inverted |
| 상태 | pressed(눌림) |

- 값은 porest 색이다. SEED 는 대비를 APCA 로 재고 porest 는 WCAG AA 라 SEED 값은 가져오지 않았다 — SEED 의 흐린 글자는 흰 바탕에서 WCAG 3.42:1 이다. 당근 주황(carrot)은 쓰지 않는다.
- 옛 이름(text-primary · surface-default · border-default · success …)은 같은 값의 별칭으로 남긴다. 컴포넌트 스펙과 제품은 컴포넌트를 옮길 때 새 이름으로 바꾼다.
- 글자와 그 글자가 놓이는 배경의 짝은 머리말 `components` 의 `role-*` 로 적어 두어 `npm run lint` 가 라이트 · 다크 대비를 잰다(4.5:1 밑이면 경고).
- 흰 글자는 `static-white` 다(SEED palette.static-white). 채움(solid) 위 글자에 쓴다.

#### 글자 (fg)

| 역할 | 라이트 | 다크 | 옛 이름 | Desk 웹 이름 |
|---|---|---|---|---|
| `fg-neutral` | `#1A1F2E` | `#F5F6FA` | text-primary | fg-primary |
| `fg-neutral-muted` | `#4E5968` | `#B0B8C4` | text-secondary | fg-secondary |
| `fg-neutral-subtle` | `#62697A` | `#9DA3B0` | text-tertiary | fg-tertiary |
| `fg-neutral-inverted` | `#FFFFFF` | `#1A1F2E` | — | — |
| `fg-placeholder` | `#62697A` | `#9DA3B0` | — | fg-placeholder |
| `fg-disabled` | `#828995` | `#7A8294` | text-disabled | fg-disabled |
| `static-white` | `#FFFFFF` | — | text-on-accent | fg-on-brand · fg-on-danger · fg-on-success |
| `fg-critical` | `#D72323` | `#F87171` | error · error-light | status-danger-fg · fg-expense |
| `fg-positive` | `#167F3F` | `#4ADE80` | success · success-light | status-success-fg |
| `fg-warning` | `#BE490D` | `#FB923C` | warning · warning-light | status-warning-fg |
| `fg-informative` | `#1D6EC9` | `#60A5FA` | info · info-light | status-info-fg · fg-transfer |
| `fg-critical-contrast` | `#C11F1F` | `#F87676` | — | — |
| `fg-positive-contrast` | `#14753A` | `#4ADE80` | — | — |
| `fg-warning-contrast` | `#AD420C` | `#FB923C` | — | — |
| `fg-informative-contrast` | `#1B65B9` | `#65A8FA` | — | — |

#### 배경 (bg)

| 역할 | 라이트 | 다크 | 옛 이름 | Desk 웹 이름 |
|---|---|---|---|---|
| `bg-layer-basement` | `#F5F6FA` | `#1A1F2E` | bg-page | bg-canvas · bg-table-head |
| `bg-layer-default` | `#FFFFFF` | `#242938` | surface-default | bg-surface |
| `bg-layer-default-pressed` | `#F0F2F7` | `#2D3346` | — | bg-hover · bg-row-hover |
| `bg-layer-floating` | `#FFFFFF` | `#2D3346` | — | bg-surface-raised |
| `bg-layer-floating-pressed` | `#F0F2F7` | `#353B4D` | — | — |
| `bg-neutral-weak` | `#F0F2F7` | `#2D3346` | surface-input | bg-sunken · bg-muted |
| `bg-neutral-weak-pressed` | `#E5E8EF` | `#353B4D` | — | bg-warm-press |
| `bg-neutral-inverted` | `#1A1F2E` | `#F5F6FA` | — | bg-inverse |
| `bg-disabled` | `#F0F2F7` | `#2D3346` | — | bg-disabled |
| `bg-critical-solid` | `#D72323` | `#D72323` | error | status-danger |
| `bg-critical-solid-pressed` | `#C42020` | `#C42020` | — | status-danger-press |
| `bg-critical-weak` | `#FAE5E5` | `#442834` | — | status-danger-subtle |
| `bg-critical-weak-pressed` | `#F8D7D7` | `#562732` | — | — |
| `bg-positive-solid` | `#167F3F` | `#167F3F` | success | status-success |
| `bg-positive-solid-pressed` | `#136C36` | `#136C36` | — | — |
| `bg-positive-weak` | `#E3F0E8` | `#213839` | — | status-success-subtle |
| `bg-positive-weak-pressed` | `#D5E8DC` | `#20413A` | — | — |
| `bg-warning-solid` | `#BE490D` | `#BE490D` | warning | status-warning |
| `bg-warning-solid-pressed` | `#A9410C` | `#A9410C` | — | — |
| `bg-warning-weak` | `#F7E9E2` | `#402F30` | — | status-warning-subtle |
| `bg-warning-weak-pressed` | `#F3DED3` | `#4F322C` | — | — |
| `bg-informative-solid` | `#1D6EC9` | `#1D6EC9` | info | status-info |
| `bg-informative-solid-pressed` | `#1A63B6` | `#1A63B6` | — | — |
| `bg-informative-weak` | `#E4EEF9` | `#233552` | — | status-info-subtle |
| `bg-informative-weak-pressed` | `#D6E5F5` | `#223C61` | — | — |

#### 선 (stroke)

| 역할 | 라이트 | 다크 | 옛 이름 | Desk 웹 이름 |
|---|---|---|---|---|
| `stroke-neutral-subtle` | `#E5E8EF` | `#353B4D` | — | border-subtle |
| `stroke-neutral-weak` | `#E5E8EF` | `#353B4D` | border-default | border-default |
| `stroke-neutral-solid` | `#7D8593` | `#8B95A8` | border-strong | border-strong |
| `stroke-critical-solid` | `#D72323` | `#F87171` | error | status-danger-border |
| `stroke-positive-solid` | `#167F3F` | `#4ADE80` | success | status-success-border |
| `stroke-warning-solid` | `#BE490D` | `#FB923C` | warning | status-warning-border |
| `stroke-informative-solid` | `#1D6EC9` | `#60A5FA` | info | status-info-border |

#### 브랜드 역할

이 파일에만 있다. 다른 브랜드 파일에 같은 이름으로 다른 값이 있다.

| 역할 | 라이트 | 다크 | 옛 이름 | Desk 웹 이름 |
|---|---|---|---|---|
| `fg-brand` | `#357B5F` | `#6BAE8C` | primary · primary-light | fg-brand · fg-link |
| `fg-brand-contrast` | `#33765B` | `#6CAE8D` | — | fg-brand-strong |
| `bg-brand-solid` | `#357B5F` | `#357B5F` | primary | bg-brand |
| `bg-brand-solid-pressed` | `#2E6C53` | `#2E6C53` | — | bg-brand-press · bg-brand-hover |
| `bg-brand-weak` | `#EFF4F2` | `#26333D` | — | bg-brand-subtle |
| `bg-brand-weak-pressed` | `#E3EDE9` | `#283B41` | — | bg-brand-muted |
| `stroke-focus-ring` | `#357B5F` | `#6BAE8C` | border-focus · border-focus-light | border-focus |
| `stroke-brand-solid` | `#357B5F` | `#6BAE8C` | — | border-brand |
| `stroke-brand-weak` | `#6BAE8C` | `#6BAE8C` | — | border-brand-soft |

#### 값을 만든 규칙

- **약한 배경(weak)**: 의미 색 12%(다크 18%) · 브랜드 8%(다크 12%)를 `bg-layer-default`(흰색 · 다크 #242938) 위에 섞은 불투명 값이다. Desk 가 투명하게 섞던 비율 그대로다 — design.md 검사기가 투명도 있는 색을 받지 않고, SEED 도 불투명 값이다. 페이지 배경 위에 바로 놓이면 전보다 조금 밝다.
- **약한 배경 눌림(weak-pressed)**: 의미 색 +6%(다크 +10%), 브랜드 14%(다크 22%).
- **채움 눌림(solid-pressed)**: Desk 앱 파랑 램프 500 → 600 과 같은 명도 폭만큼 어둡게. Desk 브랜드는 그 600 값(#013D97)이다.
- **contrast 글자**: 약한 배경과 그 눌림 위에서 4.5:1 이 되는 가장 밝은 값(색상 · 채도는 그대로)이다. 부드러운 배지처럼 약한 배경 위 글자에 쓴다.
- **의미 색 AA 보정**: success #16803F → #167F3F, error #DC2626 → #D72323, warning #C84D0E → #BE490D, info #1D6FCB → #1D6EC9. 명도만 낮춰 흰 바탕 · 페이지 · 입력칸 모두 4.5:1 을 넘긴다(전: 페이지 위 오류 4.47 · 경고 4.30).
- **다크 모드 의미 색 선**은 밝은 변형(-light)이다. 기본색은 어두운 표면 위 2.86:1 로 UI 3:1 에 못 미쳤다.

#### 들이지 않은 SEED 역할

porest 화면에 아직 쓰는 자리가 없다. 자리가 생기면 위 규칙으로 더한다.

- bg.neutral-solid · bg.neutral-inverted-pressed — 짙은 회색 채움 버튼 · 반전 배경 눌림
- bg.neutral-weak-alpha · bg.transparent-*(4) — 투명도 있는 배경. 필요하면 overlay 처럼 표 토큰으로 따로 둔다
- bg.overlay · bg.overlay-muted — Elevation 의 overlay-dim 이 같은 자리다
- stroke.neutral-muted · stroke.neutral-contrast · stroke.*-weak(4) — Desk 는 구분선을 한 값으로 쓴다
- bg.magic-weak · bg.layer-fill — 당근 AI 기능 전용 · SEED 에서도 없어질 이름

#### HR 웹

HR 웹은 아직 porest 색에 이어지지 않았다 — shadcn 기본 테마 그대로라 주 색이 파랑(#2563EB)이다. 2026-09-29 사용자가 앱 적용 단계에서 이 파일의 HR 색(초록 #357B5F)으로 옮기기로 정했다.

### Surface (v1 추가)

`bg-page` 위에 카드·시트·입력을 그리기 위한 최소 표면 페어. 라이트·다크 모드 모두 동일한 시맨틱(`default` = 콘텐츠 표면, `input` = 입력·recessed 표면)을 유지하며, 시각적 elevation 방향만 모드에 따라 반전됩니다.

- **라이트**: `bg-page #F5F6FA` 위에 `surface-default #FFFFFF`(elevated 카드), 그 위 또는 옆에 `surface-input #F0F2F7`(recessed 입력 필드).
- **다크**: `bg-page-dark #1A1F2E`보다 한 단 밝은 `surface-default-dark #242938`(카드), 그보다 한 단 더 밝은 `surface-input-dark #2D3346`(입력 — 다크 모드에서는 입력이 elevated되어 시인성을 확보).

#### 추가 이유
1. 현재 `bg-page` 단일 토큰만으로는 카드/모달/입력 분리가 불가능 — 컴포넌트 스펙 작성의 전제 조건.
2. 다크 모드 페어를 동시 도입해 단일 모드 편향을 방지.
3. `border`·`text` 토큰의 대비비 검증은 표면 토큰이 확정되어야 가능하므로 선행.

#### WCAG 검증 (사전 계산)
- 본문 텍스트 4.5:1 대상
  - `#000` on `surface-default` = **21.0:1** ✅ / `#FFF` on `surface-default-dark` = **14.3:1** ✅
  - `#000` on `surface-input` = **18.8:1** ✅ / `#FFF` on `surface-input-dark` = **12.3:1** ✅
- 브랜드 accent 호환 (버튼/아이콘 1차 용도 — UI 3:1 기준)
  - `primary` on `surface-default` **5.16:1** / on `surface-input` **4.61:1** — 본문도 통과
  - (당시 Desk primary 검증은 `DESIGN.desk.md` 참조 — 본 파일은 HR 단독)
- 표면 간 elevation 대비(`surface-default` vs `bg-page` ≈ 1.08:1)는 WCAG 3:1 비대상(본문/UI 컴포넌트 규정 아님). 의도된 미묘 elevation.

#### HR / Desk 듀얼 브랜드
- 두 accent 모두 라이트 모드 표면 위에서 본문 4.5:1 또는 그에 준하는 대비를 확보 — 단일 표면 페어로 양 브랜드 호환.
- 어두운 표면용 accent 변형(`accent-*-light`)은 추후 별도 토큰으로 분리 예정 — 현재 surface 토큰은 lightened accent 도입 시 재계산 없이 그대로 유효.

### Text (v2 추가)

surface 페어 위에서 본문 가독성을 확보하기 위한 최소 텍스트 역할 5종. 모드별 페어(primary/secondary)와 모드 무관(on-accent)으로 구성하며, tertiary·disabled는 사용 사례가 명확해진 후 v3에서 추가합니다.

- **primary**: 본문 헤딩·메인 텍스트. 라이트 `#1A1F2E` / 다크 `#F5F6FA` — 의도적으로 `bg-page-dark` / `bg-page`와 동일 값을 사용해 라이트·다크 시맨틱 반전 일관성을 확보(역할이 다르므로 별도 토큰 유지).
- **secondary**: 보조 설명·메타 정보. 라이트 `#4E5968` / 다크 `#B0B8C4` — Toss 톤의 중성 그레이.
- **on-accent**: HR/Desk accent 배경(버튼 fill, badge) 위 텍스트. `#FFFFFF` 단일 — 모드 무관.

#### 추가 이유
1. surface 페어가 v1에서 확정됐으므로 텍스트 대비비 검증이 비로소 가능 — 후속 컴포넌트(버튼·카드·입력) 스펙 작성의 차단 요소 해소.
2. accent 위 텍스트 색상을 `#FFFFFF`로 명시 토큰화 — 양 브랜드 버튼에서 동일 처리 보장(분기 없음).
3. tertiary·disabled는 placeholder·비활성 컴포넌트 사용 패턴이 정해진 후 추가 — 추측성 선행 토큰 회피(CLAUDE.md "사용자가 명시적으로 요청하지 않은 토큰 추가 금지").

#### WCAG 검증 (사전 계산)
모든 페어가 본문 4.5:1 통과, 대부분 AAA 7:1 이상.

| 텍스트 | 표면 | 대비 | 등급 |
|---|---|---|---|
| text-primary `#1A1F2E` | surface-default | 16.22 | AAA |
| text-primary | surface-input | 14.49 | AAA |
| text-primary | bg-page | 15.02 | AAA |
| text-primary-dark `#F5F6FA` | surface-default-dark | 13.25 | AAA |
| text-primary-dark | surface-input-dark | 11.40 | AAA |
| text-primary-dark | bg-page-dark | 15.03 | AAA |
| text-secondary `#4E5968` | surface-default | 7.08 | AAA |
| text-secondary | surface-input | 6.32 | AA |
| text-secondary-dark `#B0B8C4` | surface-default-dark | 7.41 | AAA |
| text-secondary-dark | surface-input-dark | 6.37 | AA |
| text-on-accent `#FFFFFF` | primary | 5.16 | AA |

#### HR / Desk 듀얼 브랜드
- `text-on-accent` 단일 값(`#FFFFFF`)이 양 브랜드 accent에서 본문 4.5:1 통과 — 브랜드별 분기 불필요.
- primary·secondary는 neutral 토큰으로 양 브랜드 공유. accent 색상에 의존하지 않음.

### Border (v3 추가)

border는 시맨틱 계층을 둘로 분리합니다 — 장식적 외곽선과 필수 UI 외곽선은 WCAG 1.4.11 (Non-text contrast 3:1) 적용 대상이 다르기 때문입니다.

- **default**: 카드 윤곽, 섹션 divider 등 **장식적** 분리. 표면과 1.1~1.5:1 대비로 미묘하게만 구분 — WCAG 3:1 비대상(콘텐츠 식별이 표면 색상으로 이미 가능).
- **strong**: 입력 필드 외곽선, 비채움 버튼 보더 등 **필수 UI 컴포넌트** 외곽선. 인접 모든 표면(`surface-default`, `bg-page`, `surface-input`)에 대해 3:1 이상 — UI 컴포넌트 식별이 외곽선에 의존하므로 strict.

#### 추가 이유
1. v1 surface 페어 + v2 text 페어가 확정됐으므로 표면 위 컴포넌트 외곽선 검증이 가능 — 입력·버튼 컴포넌트 스펙 작성의 차단 요소 해소.
2. 장식/필수 분리로 디자이너가 "어느 border를 써야 3:1을 충족하는가" 의사결정을 토큰 이름에서 즉시 판단 가능.
3. `border-focus`는 이번 배치에서 보류 — HR primary가 `surface-default-dark`에서 3:1 미달(2.77:1)이므로 `accent-*-light` 변형이 정의된 후 추가하는 편이 안전. 그 전까지 포커스 링은 `border-strong`을 임시 활용 가능. (v7~v16에서 단계적 해소, 본 파일에서 `border-focus` 토큰 정의 완료.)

#### WCAG 검증 (사전 계산)

`border-strong` 페어 — **3:1 strict 통과**:

| border | 표면 | 대비 | 결과 |
|---|---|---|---|
| border-strong `#7D8593` | surface-default | 3.74 | ✅ |
| border-strong | bg-page | 3.46 | ✅ |
| border-strong | surface-input | 3.34 | ✅ |
| border-strong-dark `#8B95A8` | surface-default-dark | 4.71 | ✅ |
| border-strong-dark | bg-page-dark | 5.34 | ✅ |
| border-strong-dark | surface-input-dark | 4.05 | ✅ |

`border-default` 페어 — **장식적 미묘 대비** (3:1 비대상):

| border | 표면 | 대비 | 비고 |
|---|---|---|---|
| border-default `#E5E8EF` | surface-default | 1.22 | 의도된 subtle 분리 |
| border-default | bg-page | 1.13 | 의도된 subtle 분리 |
| border-default-dark `#353B4D` | surface-default-dark | 1.32 | 의도된 subtle 분리 |
| border-default-dark | bg-page-dark | 1.50 | 의도된 subtle 분리 |

#### HR / Desk 듀얼 브랜드
- 모든 border는 neutral 토큰 — 브랜드 accent에 의존하지 않음, 양 브랜드 공유.
- 미래 `border-focus`는 accent 기반(브랜드 분기) 또는 neutral 기반 단일 토큰 중 선택 — 다크 모드 accent 변형 결정 후 일관 적용.

### Brand light variants (v7 추가, v8 명명 정정)

어두운 표면(다크 모드의 모든 표면 + 라이트 모드의 검정 배너·hero 등 포함, **모드 무관**) 위에서 브랜드 accent를 텍스트·아이콘·외곽선·focus 링 등 **비채움 사용**으로 안전하게 쓰기 위한 lightness 변형 페어. v3 `border-focus` 보류의 차단 사유였던 "accent의 어두운 표면 3:1 미달"을 해소합니다.

> **v8 명명 정정**: 초기 명칭 `accent-*-on-dark`는 mode pair 접미사(`-dark`: 다크 모드 사용)와 표면 컨텍스트 접미사를 혼동시켜 → `accent-*-light`로 변경. `-light`는 lightness variant 의미로 고정(accent에는 mode pair `-dark`가 존재하지 않으므로 충돌 없음). 라이트 모드의 어두운 영역(검정 배너, dark hero)에서도 정당한 사용이 명명에 반영됨.

| 토큰 | hex | 사용 |
|---|---|---|
| `primary-light` | `#3FBF74` | 어두운 표면(다크 모드 + 라이트 모드 검정 배너 등) 위 HR primary 텍스트·아이콘·outline 버튼·focus 링 |

#### 추가 이유
1. v3에서 `border-focus`가 보류된 직접 원인 해소 — HR primary 2.77:1로 `surface-default-dark` 대비 3:1 미달. 다크 lightness 변형으로 4.5:1 이상 확보.
2. **5개 한도 중 2개만 추가** — CLAUDE.md "사용자가 명시적으로 요청하지 않은 토큰 추가 금지" 준수. 별도 `border-focus` 토큰은 컴포넌트 레벨 표면 컨텍스트 분기(밝은 표면=`accent-{brand}`, 어두운 표면=`accent-{brand}-light`)로 해결 가능하므로 미추가.
3. 동일 brand family 내 lightness만 조정 — HR 녹색, Desk 청색의 시각 식별성 유지.

#### WCAG 검증 (사전 계산)

본문 4.5:1 — 모든 다크 표면 통과:

| 텍스트 | 다크 표면 | 대비 | 결과 |
|---|---|---|---|
| primary-light `#3FBF74` (L=0.396) | surface-default-dark | 6.07 | ✅ AAA |
| primary-light | bg-page-dark | 6.89 | ✅ AAA |
| primary-light | surface-input-dark | 5.23 | ✅ AA |

#### 채움 fill 비호환 — 사용 경계 명시

`accent-*-light` 위에 `text-on-accent` (`#FFFFFF`) 사용 시 본문 대비:
- on `primary-light`: **2.36:1** ❌

따라서 **다크 모드 채움 버튼 fill은 `primary`(원래 값)를 유지**합니다. 흰 텍스트 5.16:1로 본문 통과. 단, 이 경우 버튼 외곽 vs 다크 표면 대비는 2.77:1로 3:1 미달 — Toss·Material 패턴처럼 **inset shadow 또는 명시적 1px 외곽선**(예: `border-strong-dark`)으로 컴포넌트 식별 보강 필요(컴포넌트 스펙에서 처리).

요약하면:
- **다크 채움 버튼**: bg = `primary`, text = `text-on-accent`(`#FFFFFF`), 외곽선 = `border-strong-dark` 보강
- **어두운 표면 비채움 사용**(outline 버튼 텍스트·링크·아이콘·focus, 라이트/다크 모드 무관): `primary-light`

#### HR / Desk 듀얼 브랜드
- 각 브랜드 dedicated 변형 — neutral 토큰이 아닌 brand-specific. 표면 컨텍스트 페어: 밝은 표면용 `accent-{brand}` · 어두운 표면용 `accent-{brand}-light`.

### Text tertiary (v11 추가)

3차 텍스트 위계 — placeholder, hint, caption-tertiary 등 본문보다 낮은 강조의 read-only 정보. 라이트/다크 페어 2개.

| 토큰 | hex | 사용 |
|---|---|---|
| `text-tertiary` | `#62697A` | 라이트 표면 위 placeholder·hint·메타 (text-secondary보다 미묘) |
| `text-tertiary-dark` | `#9DA3B0` | 다크 표면 위 placeholder·hint·메타 |

#### 추가 이유
1. v2 text 토큰(primary/secondary/on-accent)으로는 input placeholder의 시각 위계가 표현 불가 — secondary를 placeholder에 쓰면 입력값과 동등한 강조로 보여 혼란.
2. `text-disabled`와 분리: tertiary는 "강조가 낮을 뿐 읽을 수 있는 텍스트"(WCAG 1.4.3 4.5:1 대상), disabled는 "비활성 — 색상 대비 적용 면제 가능"(WCAG 1.4.3 incidental 예외). 시맨틱이 다르므로 별도 토큰.
3. **휘도 윈도우가 좁음**: 라이트 모드는 `text-secondary` L=0.098과 `surface-input` 위 4.5:1 ceiling L=0.158 사이 약 0.06 luminance gap만 가용. `#62697A`(L=0.141)로 윈도우 내 위치 확보.

#### WCAG 검증 — lint 실측 결과

4개 페어를 components(`caption-tertiary-on-card-{light,dark}`, `placeholder-on-input-{light,dark}`)로 정의하여 자동 검증:

| component | bg | text | lint 판정 |
|---|---|---|---|
| `caption-tertiary-on-card-light` | surface-default | text-tertiary | ✅ ≥4.5:1 |
| `caption-tertiary-on-card-dark` | surface-default-dark | text-tertiary-dark | ✅ ≥4.5:1 |
| `placeholder-on-input-light` | surface-input | text-tertiary | ✅ ≥4.5:1 (가장 빡빡, 손계산 4.91) |
| `placeholder-on-input-dark` | surface-input-dark | text-tertiary-dark | ✅ ≥4.5:1 (손계산 4.87) |

(`npm run lint` 출력 기준: 0 errors, 0 contrast warnings.)

#### bg-page 위 검증 미적용
`text-tertiary` on `bg-page` (페이지 배경 위 직접 노출 케이스, 손계산 5.09:1)는 별도 component 정의 안 함 — 실제 사용 시 거의 항상 `surface-*` 표면 위에 있음. 필요 시 v12+에서 페어 추가 가능.

#### HR / Desk 듀얼 브랜드
- neutral 토큰, 양 브랜드 동일 사용. accent에 의존하지 않음.

### Text disabled (v13 추가)

비활성(disabled) 상태의 라벨·버튼 텍스트·입력값 등 — WCAG 1.4.3 *incidental text exception* 적용 대상으로, 색 대비 4.5:1 요건이 면제되는 시맨틱.

| 토큰 | hex | 사용 |
|---|---|---|
| `text-disabled` | `#828995` | 라이트 표면 위 비활성 텍스트 |
| `text-disabled-dark` | `#7A8294` | 다크 표면 위 비활성 텍스트 |

#### 추가 이유
1. **시맨틱 분리 필수**: text-tertiary(placeholder)는 ≥4.5:1 본문 대비 대상, text-disabled는 incidental 면제 대상 — 두 시맨틱을 같은 토큰에 묶으면 placeholder가 부당하게 약해지거나 disabled가 부당하게 진해짐.
2. **시각 의도**: disabled는 "비활성"으로 보여야 하므로 의도적으로 ~3:1대 대비 — text-tertiary(~5:1)와 명확히 구분.

#### WCAG 검증 — incidental 예외 적용

**WCAG 1.4.3 (Contrast Minimum)**: "비활성 UI 컴포넌트의 일부인 텍스트는 대비 요건이 없다(no contrast requirement)." disabled 텍스트는 이 면제 조항에 해당.

대비비 손계산 (참고용 — incidental이라 통과 강제 아님):

| token | 표면 | 대비 (손계산) | 비고 |
|---|---|---|---|
| `text-disabled` `#828995` (L=0.248) | surface-default | 3.52 | <4.5:1 의도 — 비활성 시각 |
| `text-disabled` | surface-input | 3.15 | 동일 |
| `text-disabled` | bg-page | 3.26 | 동일 |
| `text-disabled-dark` `#7A8294` (L=0.222) | surface-default-dark | 3.71 | 동일 |
| `text-disabled-dark` | surface-input-dark | 3.20 | 동일 |
| `text-disabled-dark` | bg-page-dark | 4.21 | 동일 |

전 표면에서 ≥3:1 (UI 컴포넌트 식별 임계 통과) + <4.5:1 (incidental 의도) — 비활성으로 인지되되 식별 가능한 회색 균형.

#### Spec 충돌 회피 — sparse component 전략

design.md `contrastCheck` 룰은 incidental 인지 없이 모든 `backgroundColor`+`textColor` 페어에 4.5:1 강제. 현재 spec 한계로 disabled 시맨틱이 자동 검증과 충돌.

**해결**: 토큰을 textColor만 가진 sparse component(`disabled-label-light`/`-dark`)로 referencing. `backgroundColor` 미선언이면 contrastCheck 룰 미발동(둘 다 있어야 트리거). 동시에 토큰이 referenced되어 orphan 경고도 회피. 부모 표면 색은 런타임에 CSS·컴포넌트 레벨에서 상속/적용.

> **부수 효과 인지**: 이 sparse 패턴은 disabled 외 다른 시맨틱에 함부로 쓰면 lint의 contrast 안전망 무력화 위험 있음. disabled처럼 WCAG가 명시적 면제하는 케이스에만 적용.

#### 운영 가이드
- 컴포넌트 구현 시 `disabled-label-light/dark` 토큰을 textColor에 적용 + 추가로 `cursor: not-allowed`·`pointer-events: none`·`opacity` 등 비활성 인터랙션 시그널 동반.
- 단순 색만으로 비활성을 표시하지 않음 — 색·커서·인터랙션 비활성을 함께 사용해야 시각·기능적 비활성 일치.

#### HR / Desk 듀얼 브랜드
- neutral 토큰 — 양 브랜드 공유. accent에 의존 없음.

### Semantic colors (v10 추가, v51-v52에서 vivid refresh)

상태 전달을 위한 functional palette — 브랜드 정체성과 분리된 4개 status. HR/Desk 양 브랜드 공유, 라이트 표면 base만 이번 배치에서 확정. **현재 사용 hex는 v51-v52 이후 vivid 톤** (DESIGN.md `### Semantic refresh` 섹션 참조). v10 시점 hex는 변천 history.

| 토큰 | v10 hex (이전) | v51-v52 hex (**현재**) | 시맨틱 |
|---|---|---|---|
| `success` | `#117A3A` | `#16803F` | 완료·확인·긍정 결과 (Tailwind green-700 톤) |
| `error` | `#C53030` | `#DC2626` | 오류·파괴적 액션·필수 입력 누락 (Tailwind red-600) |
| `warning` | `#A85800` | `#C84D0E` | 경고·주의·임박 만료 (orange — v52 미세 brighten) |
| `info` | `#006395` | `#1D6FCB` | 안내·도움말·진행 중 (sky blue, Tailwind sky-600) |

#### 추가 이유
1. 폼 검증·토스트·alert·badge 컴포넌트는 모든 제품 공통 인터랙션 — accent로는 표현 불가능한 functional state 전달이 차단되어 있었음.
2. **functional palette ≠ brand palette**: HR/Desk 어디서도 동일한 success/error/warning/info를 사용 — 브랜드 분기 시 인지 부하 증가 회피. 이미 accent로 brand identity 차별화는 완료.
3. **라이트 표면 base만 4개** — 다크 표면용 `success-light` 등은 다크 모드 alert·toast 사용 사례 등장 시 v11+에서 추가(accent-light 패턴 답습). 5 한도 중 1개 여분.

#### 색상 대비 — lint 실측 결과 (손계산 아님)

8개 페어를 components 섹션에 정의해 lint contrast-ratio 룰로 직접 검증:

| component | bg | text | lint 판정 |
|---|---|---|---|
| `badge-success` | success | text-on-accent | ✅ ≥4.5:1 |
| `badge-error` | error | text-on-accent | ✅ ≥4.5:1 |
| `badge-warning` | warning | text-on-accent | ✅ ≥4.5:1 |
| `badge-info` | info | text-on-accent | ✅ ≥4.5:1 |
| `alert-text-success` | surface-default | success | ✅ ≥4.5:1 |
| `alert-text-error` | surface-default | error | ✅ ≥4.5:1 |
| `alert-text-warning` | surface-default | warning | ✅ ≥4.5:1 |
| `alert-text-info` | surface-default | info | ✅ ≥4.5:1 |

(`npm run lint` 출력 기준: 0 errors, 0 contrast warnings — 8 페어 전부 silent pass.)

#### 자동 검증 미적용 항목 (손계산 한계 명시)
- `surface-input` 위 semantic 텍스트 (input 검증 메시지 케이스): `surface-input` 표면이 카드 표면(`surface-default`)과 휘도 차 0.11 → 페어 정의해두면 lint 추가 검증 가능. 이번 배치 미정의.
- 다크 표면 위 semantic 표시: ~v19까지 `success`/`error` base 색은 다크 표면 위 contrast 미달 → **v20에서 `-light` 변형 도입으로 해소** (아래 v20 섹션 참조).
- `border-vs-surface` 패턴은 spec에 borderColor 없어 영구 자동 검증 불가 (v9 한계 그대로).

### Chart palette (v21 추가, 4 배치 진행 중)

데이터 시각화용 hue-균등 10색 팔레트. 양 brand 공유(unified, primary는 brand-specific 유지). L≈0.16-0.18로 통일.

**v21 (1/4)**: light 표면 5색 — red, orange, yellow, green, blue. **v22 예정**: indigo, violet, pink, brown, gray. **v23-v24 예정**: dark 변형 10색.

토큰: `chart-red` `#C73838`, `chart-orange` `#B36418`, `chart-yellow` `#8C7400`, `chart-green` `#2D8060`, `chart-blue` `#2C70BF`. sparse component(`chart-color-{name}`)로 referencing. chart는 brand 분기 비대상 — 양 brand 동일 사용. primary와 hue 비슷할 수 있으나 역할 분리(별도 토큰).

#### v20 추가, v53 vivid refresh — semantic 다크 변형 4개

다크 표면 위 alert·toast·인라인 semantic 텍스트용 lightness 변형. base는 라이트 표면 전용(흰 텍스트 fill 4.5:1↑), light는 다크 표면 위 텍스트 4.5:1↑. **현재 사용 hex는 v53 이후 Tailwind 400 톤** (DESIGN.md `### Semantic light refresh` 섹션 참조).

| 토큰 | v20 hex (이전) | v53 hex (**현재**) | 다크 표면 contrast |
|---|---|---|---|
| `success-light` | `#5DC07B` | `#4ADE80` | surface-default-dark ≥4.5:1 ✅ (Tailwind green-400) |
| `error-light` | `#F08080` | `#F87171` | surface-default-dark ≥4.5:1 ✅ (Tailwind red-400) |
| `warning-light` | `#E8A05A` | `#FB923C` | surface-default-dark ≥4.5:1 ✅ (Tailwind orange-400 — 가장 큰 hue 변화, base와 일치) |
| `info-light` | `#6FAEDF` | `#60A5FA` | surface-default-dark ≥4.5:1 ✅ (Tailwind blue-400) |

4개 컴포넌트(`alert-text-{semantic}-on-dark`)에서 lint contrast 룰로 검증 — 모두 ≥4.5:1 통과.

**채움 fill 비호환** (의도): white(`text-on-accent`)을 light 변형 위에 올리면 L 0.35~0.43이라 contrast 2.2~2.7로 미달. 다크 모드 채움 badge는 base 색 유지 + 외곽선 보강 또는 별도 패턴(향후 v21+에서 검토).

#### HR / Desk 듀얼 브랜드
- 8개 토큰 모두 양 브랜드 동일 사용 — functional state 전달은 브랜드 분기 비대상.
- 시각 차별화: `success`(forest)는 HR `primary`(emerald 계열)와 미세 hue 분리, `info`(deep navy)는 Desk primary(vibrant blue 계열)와 채도 분리. 단 단독 노출 시 식별성을 위해 컴포넌트 레벨에서 아이콘(✓/✕/!/i) 동반을 권장.
- 컴포넌트는 brand 컨텍스트(HR vs Desk) × 모드 컨텍스트(light vs dark) 매트릭스로 4값 분기 — 토큰 자체에 분기 표현됨.

### Brand refresh + Desk neutral fork (v14 추가)

브랜드 리프레시: HR/Desk **primary** 색을 더 깊고 차분한 톤으로 갱신, neutral page background를 브랜드별로 분리. 이전 `accent-*` 시리즈는 모두 `primary-*`로 rename 됨(spec 권장 명명 정합).

#### 토큰 변경 매트릭스

| 작업 | 이전 | 이후 | 비고 |
|---|---|---|---|
| rename + value | `accent-hr` `#1E7D4C` | `primary` `#357B5F` | HR 브랜드 — forest green |
| rename + value | `accent-light` `#3FBF74` | `primary-light` `#6BAE8C` | 새 base에 맞춰 lighten 도출 |
| split | `bg-page` `#F5F6FA` | `bg-page-hr` `#ECE8E5` + `bg-page-desk` `#DCDCDC` | 브랜드별 fork (HR=warm beige, Desk=light gray) |
| 유지 | `bg-page-dark` `#1A1F2E` | (변경 없음) | 다크 페어 미언급 → 공유 |

#### 변경 이유
1. **브랜드 톤 갱신**: 새 primary 색이 Porest = People + Forest 감각에 더 가깝게 정착(HR forest green, Desk deep navy).
2. **Desk neutral 분리**: B2B(HR)와 B2C(Desk)는 동일 페이지 베이스를 공유할 필요가 없음 — HR은 따뜻한 베이지, Desk는 차분한 light gray로 첫인상 차별화.
3. **명명 정합**: design.md spec은 `primary` 명명을 권장 — 기존 `accent-*` 명칭에서 `primary-*`로 정렬, 추후 spec 도구 호환성 확보.

#### lint 실측 결과 (변경 영향 6개 페어 모두 통과)

| component | bg | text | 결과 |
|---|---|---|---|
| `button-primary` | primary `#357B5F` | text-on-accent | ✅ ≥4.5:1 |
| `button-outline-on-dark` | surface-default-dark | primary-light `#6BAE8C` | ✅ ≥4.5:1 |
| `page-text-light` | bg-page-hr `#ECE8E5` | text-primary | ✅ ≥4.5:1 |
| `page-text-desk-light` | bg-page-desk `#DCDCDC` | text-primary | ✅ ≥4.5:1 |

(`npm run lint` 출력 기준: 0 errors, 0 contrast warnings.)

#### Edge case — 운영 가이드

자동 검증 미모델 페어에서 1건 contrast 미달 발견:

- **`primary` as inline 텍스트 on `bg-page-hr`**: 손계산 **4.14:1** (4.5:1 미달, 3:1 통과)
  - **운영 규칙**: HR `primary`는 **fill 전용**(button bg, badge, fill icon). 페이지 베이지 위 inline 링크·body-lg 텍스트로 사용 금지 — 본문 가독성 미달.
  - 대신 inline 링크 needs use `text-primary` (대비 13.32:1) + 밑줄/hover 시그널로 link affordance 확보.
- **`text-tertiary` on `bg-page-desk`**: 손계산 **4.01:1** ❌ — 현재 modeled 컴포넌트에 없는 페어이나, 페이지 베이스 위 직접 caption 노출 시 미달. caption은 항상 `surface-default`(흰 카드) 위에 사용 권장.

#### 다크 모드 검증 (회귀 0건)

본 변경은 라이트 모드 토큰만 수정:
- 다크 페어 토큰(`bg-page-dark`, `surface-default-dark`, `text-primary-dark` 등) 그대로 유지.
- HR 다크 채움 버튼: 새 `primary` `#357B5F` (L=0.158) on white text **5.05:1** ✅. 단 외곽 vs 다크 surface는 2.83:1로 3:1 미달 — `border-strong-dark` 보강 패턴 그대로 유효(이전 `accent-hr` 2.77과 동급).
- HR/Desk outline 다크: 새 `primary-*-light` 모든 다크 표면에서 4.62~6.23:1 통과.

#### 이전 prose 항목과의 정합

- v1 prose의 "bg-page #F5F6FA" 표기는 v14 이전 단일 token 시점 기록 — 현재는 `bg-page-hr`/`bg-page-desk`로 fork됨.
- v3 prose의 "primary 2.77" 다크 surface 대비 수치는 v7 시점 `accent-hr` `#1E7D4C` 기준 — 새 `primary` `#357B5F`는 2.83로 이동했으나 결론(3:1 미달, light 변형 필요)은 동일.
- 이전 prose는 **역사적 기록**으로 보존 — v14 시점 현행 값은 본 섹션 표 기준.

### bg-page 재통합 (v15)

v14에서 fork했던 `bg-page-hr`/`bg-page-desk`를 단일 `bg-page #F5F6FA`로 되돌립니다. HR/Desk가 동일한 페이지 베이스를 공유 — neutral 시스템 단순화.

#### 변경 매트릭스

| 작업 | 이전(v14) | 이후(v15) |
|---|---|---|
| **제거** | `bg-page-hr` `#ECE8E5` | — |
| **제거** | `bg-page-desk` `#DCDCDC` | — |
| **추가** | — | `bg-page` `#F5F6FA` (v13 이전 값으로 복귀) |
| **컴포넌트 통합** | `page-text-light` + `page-text-desk-light` | `page-text-light` (단일) |
| **유지** | `bg-page-dark` `#1A1F2E` | (그대로) |

`primary` 등 v14 브랜드 리프레시는 그대로 유지 — 본 변경은 neutral fork만 되돌림.

#### v14 edge case 해소

`bg-page #F5F6FA` (L=0.9223)는 v14 fork(L=0.812/0.716)보다 더 밝아 contrast headroom 증가:

| 페어 | v14 (fork) | v15 (unified) | 상태 |
|---|---|---|---|
| `primary` inline on bg-page | 4.14 ❌ | **4.67** ✅ | 해소 |
| `text-tertiary` on bg-page | 5.09 ✅ (HR) / 4.01 ❌ (Desk) | **5.09** ✅ | Desk 미달 해소 |

v14에서 명시했던 운영 규칙 **"primary는 fill 전용, inline link 금지"는 v15에서 무효화** — 단일 `bg-page` 위에서 `primary`를 inline link/text로 사용 가능.

#### 변경 이유
1. **운영 규칙 단순화**: v14 fork는 브랜드별 페이지 톤 차별화를 의도했으나, primary inline 4.14 미달 등 edge case가 운영 부담으로 작용. 단일 bg-page는 이 부담 제거.
2. **HR/Desk neutral 일관성**: 페이지 베이스가 동일하면 컴포넌트 동작도 동일 — 다운스트림 코드의 분기 로직 감소.
3. **브랜드 차별화는 primary로 충분**: HR `primary` `#357B5F`(forest green) vs Desk primary(deep navy 계열, `DESIGN.desk.md` 참조)의 채도·hue 차이가 이미 강력한 식별 신호 제공. 페이지 베이스까지 분기할 동기 약화.

#### lint 실측
- ✅ 0 errors / 0 contrast warnings
- 27 colors (v14 28에서 -1: bg-page-hr/desk 2개 제거, bg-page 1개 추가)
- 30 components (v14 31에서 -1: page-text-hr/desk-light 2개 통합)
- regression: false

#### v14 prose 정합 노트
- v14 prose의 "primary는 fill 전용" 운영 규칙·edge case 표는 v15 시점에서 **부분 무효화** — bg-page 통합으로 4.14 미달이 4.67로 해소됨. v14 prose는 fork 시점 기록으로 보존.
- "Desk neutral fork" 동기 부분도 보류 — 차별화는 primary 색에 위임.

### Border focus (v16 추가)

키보드 포커스 링·인터랙션 강조 외곽선용 4개 토큰. **primary-* / primary-*-light 값을 그대로 mirror하는 시맨틱 alias** — focus 역할을 명시 토큰화하여 컴포넌트 spec 작성 시 의도 명확화 + 향후 분기 여지 확보.

| 토큰 | hex (mirror) | 용도 |
|---|---|---|
| `border-focus` | `#357B5F` (= primary) | HR 라이트 표면 위 focus ring |
| `border-focus-light` | `#6BAE8C` (= primary-light) | HR 다크 표면 위 focus ring |

#### 추가 이유
1. **v3 차단 사유 해소 완료**: v3 시점 "primary가 다크 surface 3:1 미달"로 보류했던 focus 토큰 — v7에서 `primary-*-light` 도입, v14 명명 정렬, v15 운영 규칙 단순화로 차단 모두 해소.
2. **시맨틱 alias 패턴**: 값은 primary와 동일하지만 `border-focus-*` 명명으로 focus 역할 명시. 컴포넌트 spec(추후 Button·Input 등)에서 `focus-ring color = border-focus-{brand}` 형태로 의도 표현. primary가 변경되어도 focus 의미가 따라가야 한다면 mirror 유지 필요(현재는 수동 동기화).
3. **WCAG 2.4.11 (Focus Appearance, AA in WCAG 2.2)**: focus indicator가 인접 표면에 ≥3:1 contrast 요구 — 4개 토큰 모두 4.5+:1 통과 (UI 3:1 기준 대비 여유).

#### WCAG 검증 — focus ring vs 인접 surface (손계산, lint 미모델)

`backgroundColor`만 가진 sparse component(`focus-ring-*-on-*`)로 referenced — contrastCheck 미발동(textColor 부재). focus ring vs 인접 surface 대비는 spec에 borderColor 프로퍼티 없어 자동 검증 불가, 손계산 의존.

| focus ring | 인접 surface | 대비 (손계산) | 결과 |
|---|---|---|---|
| `border-focus` `#357B5F` | surface-default | 5.05 | ✅ |
| `border-focus` | surface-input | 4.51 | ✅ |
| `border-focus` | bg-page | 4.67 | ✅ |
| `border-focus-light` `#6BAE8C` | surface-default-dark | 5.49 | ✅ |
| `border-focus-light` | surface-input-dark | 4.72 | ✅ |
| `border-focus-light` | bg-page-dark | 6.23 | ✅ |

값이 primary-* mirror이므로 `button-primary-*` / `button-outline-*` 컴포넌트가 lint contrast 룰로 이미 4.5:1 검증 — focus 토큰의 contrast 안정성도 간접 보장.

#### sparse component 패턴 정당성
`focus-ring-*-on-*` 컴포넌트 4개는 textColor 없는 sparse 모델 (v13 text-disabled에서 정착). focus ring은 1px outline의 시각 요소로 textColor 페어가 자연스럽지 않음. orphan 회피 + spec 한계(no borderColor) 우회 두 목적 충족. v9 divider/outline-strong과 동일 패턴.

#### HR / Desk 듀얼 브랜드
- 각 브랜드별 dedicated focus 색 — HR forest green, Desk deep navy. 사용자 인지(어느 제품에 있는지) 즉시 전달.
- 컴포넌트 spec에서 brand context에 따라 `border-focus-{brand}`/`-light` 분기 적용. 토큰 자체에 분기 표현 완료.

## Typography

한국어 본문 가독성 우선. Pretendard를 기본 패밀리로, 영문 fallback Inter.

### v100 — SEED 타입 스케일 (2026-09-29)

당근 SEED 의 타이포그래피 토큰을 그대로 들인다. 크기는 t1(11px) ~ t14(48px) 14단계이고, 줄 높이는 크기마다 SEED 와 같은 px 로 정해져 있다. 굵기는 400 · 500 · 700 셋만 쓴다.

| 토큰 | 크기 | 줄 높이 | 배수 | 쓰는 곳(SEED 기준) |
|---|---|---|---|---|
| `text-t1` | 11px | 15px | ×1.36 | 본문 · 장식 글자 |
| `text-t2` | 12px | 16px | ×1.33 | 본문 · 장식 글자 |
| `text-t3` | 13px | 18px | ×1.38 | 본문 · 장식 글자 |
| `text-t4` | 14px | 19px | ×1.36 | 본문 · 장식 글자 |
| `text-t5` | 16px | 22px | ×1.38 | 본문 · 장식 글자 |
| `text-t6` | 18px | 24px | ×1.33 | 제목 · 주요 글자 |
| `text-t7` | 20px | 27px | ×1.35 | 제목 · 주요 글자 |
| `text-t8` | 22px | 30px | ×1.36 | 제목 · 주요 글자 |
| `text-t9` | 24px | 32px | ×1.33 | 제목 · 주요 글자 |
| `text-t10` | 26px | 35px | ×1.35 | 제목 · 주요 글자 |
| `text-t11` | 28px | 38px | ×1.36 | 큰 화면 제목 — `sm` 중단점 이상 |
| `text-t12` | 32px | 42px | ×1.31 | 큰 화면 제목 — `sm` 중단점 이상 |
| `text-t13` | 40px | 52px | ×1.30 | 큰 화면 제목 — `sm` 중단점 이상 |
| `text-t14` | 48px | 60px | ×1.25 | 큰 화면 제목 — `sm` 중단점 이상 |

역할 스타일:

| 토큰 | 크기 / 굵기 / 줄 높이 | 쓰는 곳 |
|---|---|---|
| `text-screen-title` | 26px / 700 / 35px | 화면 제목 |
| `text-article-body` | 16px / 400 / 24px | 긴 글 본문(×1.5) |
| `text-article-note` | 14px / 400 / 22px | 긴 글 보조(×1.57) |

- **굵기**: 토큰의 굵기는 400 이다. 강조는 `font-medium`(500) · `font-bold`(700) 인라인 modifier 로 준다 — SEED 의 t5Medium · t5Bold 와 같다. 600 은 쓰지 않는다. 옛 title-md · badge 가 쓰던 600 은 옮길 때 500 이나 700 으로 정한다.
- **줄 높이**: UI 글자는 SEED 값(×1.35 안팎), 긴 글은 article-body · article-note(×1.5 안팎). v82 의 "한국어 본문 줄 높이 1.5+" 는 이제 긴 글에만 적용한다.
- **옛 15단계**(아래 v82)는 값 그대로 둔다. 컴포넌트는 2단계에서 SEED 와 하나씩 비교할 때 옮긴다. 본문 body-md(15px)는 자리마다 다르게 옮긴다 — 긴 글은 16(article-body), UI 는 14(t4).
- **옛 이름 → 가까운 새 이름**(옮길 때 참고): display-lg → t13 · display-md → t12 · display-sm → t9 · title-lg → t7 + bold · title-md → t6 + 500 또는 700 · title-sm → t5 + medium · body-lg → t5 또는 article-body · body-md → 자리마다 t4 · t5 · article-body · body-sm → t4 · label-md → t4 + medium · label-sm → t3 · caption → t2 · badge → t1 + 500 또는 700. display-xl(56px) · overline(10px)은 SEED 범위 밖이고 스펙에서 쓰는 곳이 없어 걷을 후보다.
- **단위**: SEED 는 rem 으로 적어 사용자의 글자 크기 설정을 따른다. porest 는 지금 px 로 둔다 — rem 전환은 따로 정한다.
- 사용자 결정(2026-09-29 — 글자 A: SEED 스케일 그대로, 본문 15px 은 자리마다). "한 번에 토큰 5개" 규칙의 예외다.

### v5 추가 — 5단계 타입 스케일 (기록 — 지금 스케일은 위 v100)

| 토큰 | size | weight | line-height | 주 용도 |
|---|---|---|---|---|
| `caption` | 12px | 400 | 1.5 | 메타·헬프·타임스탬프 |
| `body` | 15px | 400 | 1.6 | default 본문 (한국어 가독성) |
| `body-strong` | 15px | 600 | 1.6 | 본문 강조·입력 라벨·버튼 텍스트 |
| `heading-md` | 18px | 600 | 1.4 | 카드·섹션 제목 |
| `heading-lg` | 24px | 700 | 1.3 | 페이지 제목 |

#### 추가 이유
1. v1~v4 색상·spacing 토큰만으로는 컴포넌트의 텍스트 치수가 결정되지 않음 — 카드 제목 vs 본문, 라벨 vs 캡션의 시각 위계 의사결정 차단 요소 해소.
2. 5단계는 80% 이상 일반 컴포넌트(버튼·카드·입력·헬프 텍스트·페이지 헤더)를 커버. `heading-sm(16px)`, `heading-xl(32px+)`는 사용 사례 등장 후 추가 — 추측성 선행 토큰 회피.
3. `body` 15px / line-height 1.6은 한국어 본문 가독성 기준(Toss·네이버 본문 톤). 14px도 흔하나 한글 hinting 안정성과 노안 대응을 고려해 15px 채택.

#### 폰트 패밀리
모든 토큰: `Pretendard, Inter, sans-serif`
- **Pretendard**: 한글 hinting과 영문 호환을 모두 지원하는 한국어 우선 가변폰트(CLAUDE.md 규칙).
- **Inter**: 영문 fallback — Pretendard 미설치 환경에서도 일관된 영문 자형.
- **sans-serif**: 시스템 fallback.

#### WCAG 검증
- **1.4.3 Contrast (4.5:1 본문)**: 본 토큰은 색상이 아닌 치수만 정의. 색상 대비는 v2 `text-*` 토큰이 담당, 모든 표면 페어에서 사전 통과 완료(`text-primary`: 11.40~16.22, `text-secondary`: 6.32~7.41, `text-on-accent`: 5.02~5.16).
- **1.4.12 Text Spacing (line-height ≥1.5 본문)**: `caption` 1.5, `body`/`body-strong` 1.6 — 모두 통과. 헤딩은 단락 본문 비대상.
- **1.4.4 Resize text (200% zoom)**: px 단위 사용하나 브라우저 zoom에 정상 대응.
- **한국어 자형 안정성**: Pretendard는 한글 폭(전각) 자모와 영문 폭(반각)을 균형 있게 처리, 본문 lh 1.6은 한글 받침 영역 가독성을 확보.

#### HR / Desk 듀얼 브랜드
- 모든 typography 토큰은 brand-neutral — 양 브랜드 동일 스케일.
- 향후 브랜드별 분위기 조정이 필요하면 컴포넌트 레벨에서 weight·tracking 조정으로 처리(예: HR 헤딩 weight 700, Desk 헤딩 weight 600). 토큰 자체 분기 불필요.

## Layout

### v101 — SEED 레이아웃 (2026-09-29)

당근 SEED 의 Layout 문서를 기준으로 중단점 · 콘텐츠 폭 · 여백 · 사이드바를 정한다. 사용자가 2026-09-29 porest 와 SEED 를 나란히 놓은 비교 페이지를 보고 네 가지 모두 SEED 쪽을 골랐다. 앱 화면 가장자리만 porest 값(24px)을 둔다 — 2026-09-14 에 정한 앱 규칙이다.

**아직 두 웹 · 앱에는 들어가지 않았다.** 앱마다 PR 을 따로 낸다. 그 전까지는 제품 코드의 값(Desk 웹 중단점 736 · 좌우 여백 28 · 사이드바 256, HR 웹 Tailwind 기본 중단점 · 사이드바 288 등)이 이 표와 다른 게 정상이다.

출처: seed-design.io Foundations › Layout, `@seed-design/qvism-preset` 의 layout · side-navigation 레시피, rootage `dimension`(역할 간격). SEED 는 Apache-2.0 이다.

#### 중단점

| 토큰 | 값 | 구간 |
|---|---|---|
| `breakpoint-sm` | `480px` | 480 – 767 · 큰 폰 · 작은 태블릿 |
| `breakpoint-md` | `768px` | 768 – 1279 · 사이드 내비게이션이 보이기 시작한다 |
| `breakpoint-lg` | `1280px` | 1280 – 1439 · 데스크톱 |
| `breakpoint-xl` | `1440px` | 1440 이상 · 넓은 데스크톱 |

- 모바일 우선이다. 0 – 479 는 기본(base)이라 토큰이 없다.
- 화면 틀을 JS 로 바꾸는 기준도 이 값을 쓴다 — 모바일 틀(하단 탭바) ↔ 사이드바 틀은 `breakpoint-md`. 스타일(`md:`)과 화면 틀이 다른 폭에서 바뀌면 그 사이에서 모바일 틀 안에 태블릿 스타일이 켜진다(v101 전 Desk 웹의 736 – 767).
- 옛 `2xl`(1441px)은 없앴다 — 두 웹 모두 쓰는 곳이 없었다. Tailwind 로 내보낼 때 기본 중단점을 먼저 지운다(`--breakpoint-*: initial`). 안 지우면 Tailwind 기본 2xl(1536px)이 살아남는다.
- v54 의 Apple Store 기준(640 · 736 · 834 · 1069 · 1441)은 아래 기록 절과 `DESIGN.history/v101-seed-layout.md` 에 있다.

#### 콘텐츠 폭 — 밀도

화면마다 밀도를 하나 고르고, 밀도가 콘텐츠의 최대 폭을 정한다. 폭을 제한하면 가운데 정렬한다(`margin-inline: auto`).

| 토큰 | 값 | 뜻 |
|---|---|---|
| `layout-max-low` | `720px` | low 밀도의 최대 폭 · medium 밀도의 768 – 1279 최대 폭 |
| `layout-max-medium` | `1040px` | medium 밀도의 1280 이상 최대 폭 |

| 밀도 | 768 – 1279 | 1280 이상 | 칸 | 쓰는 화면 |
|---|---|---|---|---|
| low | 720 | 720 | 8 | 간단한 설정 창 · 대시보드 요약 |
| medium (기본) | 720 | 1040 | 12 | 일반 관리 도구 · 데이터 목록 |
| high | 제한 없음 | 제한 없음 | 전체 폭 | 대량 데이터 시각화 · 편집 도구 |

- 768 미만은 밀도와 상관없이 화면 폭 전체를 쓴다.
- 어느 화면이 어느 밀도인지는 앱에 적용할 때 화면 목록을 만들어 정한다.
- SEED 의 Contents Layout(서비스 소개 페이지 — 1040, 넓게 1280)은 이번에 정하지 않았다.

#### 여백 · 칸 사이

| 토큰 | 값 | 뜻 |
|---|---|---|
| `layout-margin` | `32px` | 웹 페이지 좌우 여백 · 768 이상 |
| `layout-gutter` | `24px` | 웹 칸 · 카드 사이 · 768 이상 |

- 768 미만의 화면 가장자리는 `spacing-global-gutter`(24px)다. 768 미만의 칸 사이는 아직 정하지 않았다(SEED 는 16).
- SEED 문서 안에서도 값이 둘이다 — Dashboard 격자 표는 여백 32 · 칸 사이 24, Breakpoint 표는 768 이상 여백 24 · 칸 사이 32(768 미만 여백 12 · 칸 사이 16). 두 웹 모두 관리 도구라 Dashboard 격자를 따른다.

#### 역할 간격

SEED 가 자리에 이름을 붙인 간격이다(SEED 이름은 `spacing-x.*` 수평 · `spacing-y.*` 수직). porest 는 머리말의 spacing 블록에 이름만 두고, 값은 v98 스케일 위에 있다.

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `spacing-global-gutter` | 24px · `spacing-x6` | 수평 — 화면 전체의 기본 좌우 여백. SEED 는 16px — porest 는 앱 규칙(2026-09-14, 본문 24)을 둔다 |
| `spacing-between-chips` | 8px · `spacing-x2` | 수평 — 칩 사이 |
| `spacing-component-default` | 12px · `spacing-x3` | 수직 — 따로 정한 간격이 없는 컴포넌트 사이 |
| `spacing-between-text` | 6px · `spacing-x1_5` | 수직 — 글 요소 사이 |
| `spacing-nav-to-title` | 20px · `spacing-x5` | 수직 — 상단 내비게이션과 화면 제목 사이 |
| `spacing-screen-bottom` | 56px · `spacing-x14` | 수직 — 화면 맨 아래 여백 |

- Desk 앱의 화면 좌우 여백(2026-09-14 규칙): 본문은 24. 주간 띠 · 캘린더 격자 안 칸의 인셋 · 카테고리 탭 바의 전폭은 의도한 예외다.

#### 사이드바 · 영역

| 토큰 | 값 | 뜻 |
|---|---|---|
| `layout-sidebar` | `240px` | 사이드 내비게이션 폭 |
| `layout-sidebar-collapsed` | `56px` | 접은 사이드 내비게이션(아이콘만) |

- 화면은 머리(GNB) · 사이드 내비게이션 · 본문 · 오른쪽 보조 영역(Aside) 넷으로 나눈다.
- 사이드 내비게이션은 `breakpoint-md`(768px) 이상에서 보인다. 그 아래에서는 머리의 메뉴로 들어간다 — Desk 웹은 앱과 같은 하단 탭바.
- 머리(상단 바) 높이는 SEED 문서에 없어 정하지 않았다 — 지금 Desk 웹 56 · HR 웹 48.
- 사이드 내비게이션 안쪽 치수(머리 · 항목 여백 · 높이)는 컴포넌트 단계에서 SEED side navigation 과 비교해 정한다.

### v98 — SEED 간격 스케일 (2026-09-29)

당근 SEED 의 dimension 스케일을 그대로 들인다 — 2px 단위 19단계, 이름도 SEED 와 같다(`x1` = 4px). 지금까지의 7단계(`xs` … `3xl`)는 모두 이 눈금 위에 있어 값이 바뀌지 않고, 옮기는 동안 같은 값의 별칭으로 남는다.

| 토큰 | 값 | 옛 이름(별칭) |
|---|---|---|
| `spacing-x0_5` | 2px | — |
| `spacing-x1` | 4px | `spacing-xs` |
| `spacing-x1_5` | 6px | — |
| `spacing-x2` | 8px | `spacing-sm` |
| `spacing-x2_5` | 10px | — |
| `spacing-x3` | 12px | `spacing-md` |
| `spacing-x3_5` | 14px | — |
| `spacing-x4` | 16px | `spacing-lg` |
| `spacing-x4_5` | 18px | — |
| `spacing-x5` | 20px | — |
| `spacing-x6` | 24px | `spacing-xl` |
| `spacing-x7` | 28px | — |
| `spacing-x8` | 32px | `spacing-2xl` |
| `spacing-x9` | 36px | — |
| `spacing-x10` | 40px | — |
| `spacing-x12` | 48px | `spacing-3xl` |
| `spacing-x13` | 52px | — |
| `spacing-x14` | 56px | — |
| `spacing-x16` | 64px | — |

- 새로 쓰는 간격은 SEED 이름으로 적는다. 옛 이름은 컴포넌트 스펙 · 제품이 다 옮기면 걷는다 — 컴포넌트 스펙은 2단계에서 SEED 와 하나씩 비교할 때 옮긴다.
- "한 번에 토큰 5개까지" 규칙의 예외다. 사용자가 2026-09-29 SEED 스케일 전체를 고르며 그 대가를 알고 정했다.
- 역할 간격(SEED 의 global-gutter · component-default 등)은 Layout 단계에서 따로 정한다.
- 이유: 스펙 52개가 토큰 없이 px 로 적은 간격 22곳 가운데 20곳(2 · 10 · 14 · 18 · 20 · 36px)이 SEED 눈금에 있다. 7단계로는 이 값들을 토큰으로 가리킬 수 없었다.

### v4 추가 — 4px 베이스 5단계 (v98 에서 SEED 스케일로 바뀜 — 아래는 기록)

CLAUDE.md "4px 베이스 추천" 규칙을 준수하는 t-shirt 사이즈 스케일. 모든 값은 4의 배수이며, 의미 기반 명명(`xs/sm/md/lg/xl`)으로 값에 의존하지 않습니다.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `xs` | 4px | atomic — 아이콘 inner padding, hairline gap |
| `sm` | 8px | tight — 라벨↔입력 gap, 인라인 아이콘↔텍스트 |
| `md` | 12px | comfortable — 버튼 padding-y, 카드 inner |
| `lg` | 16px | default — 스택 gap, 카드 padding (가장 자주) |
| `xl` | 24px | section — 섹션 간 분리 |

#### 추가 이유
1. v1~v3 색상 토큰만으로는 컴포넌트 치수가 결정되지 않음 — 버튼 padding, 카드 inner, 스택 gap 의사결정의 차단 요소 해소.
2. 5단계는 80% 일반 컴포넌트 사용을 커버 — 추측성 hero/major(`2xl`, `3xl`)는 사용 사례 등장 후 추가.
3. t-shirt 사이즈는 의미 기반 명명 — `space-4` 같은 값-기반 명명을 피해 향후 base 수정(예: 8px 베이스 전환) 시 명명 안정성 확보.

#### 검증
- **WCAG 1.4.3 / 1.4.11**: 비대상(spacing은 색상 아님).
- **WCAG 2.5.5 (Target Size, AAA 권장 44×44px)**: 버튼 패턴 점검 — `body-lg` line-height = 15px × 1.6 = **24px**. `md(12px)` padding-y 적용 시 12+24+12 = **48px** ✅ (44px 통과). `sm(8px)` padding-y는 8+24+8 = 40px로 44px 미달 → 보조 액션·dense table 인라인 컨트롤에만 사용. (※ v4 작성 시 lh를 20px로 잘못 표기, v9에서 수정)
- **WCAG 1.4.12 (Text Spacing)**: 사용자가 letter/word spacing을 오버라이드해도 4px 베이스는 절대값이라 영향 없음.

#### HR / Desk 듀얼 브랜드
- spacing은 neutral 시스템 — 브랜드 분기 없음. HR(B2B 데이터 밀도 위주)·Desk(B2C 여백 위주) 모두 동일 스케일 사용, 화면별 적용 강도(예: HR은 `md` 위주, Desk는 `lg` 위주)로 분기.

### Breakpoints (v54 — v101 에서 SEED 값으로 바뀜, 아래는 기록)

아래는 v54 의 기록이다. 지금 값은 위 v101 절에 있다 — 이 표는 토큰으로 읽히지 않게 이름 · 값의 백틱을 뺐다.

반응형 layout breakpoint — 5단계 (Apple Store reference). spec이 breakpoint 카테고리 미지원이라 prose-token 패턴(shadow/motion/overlay와 동일) — yaml 정의 없이 표만 운영. DESIGN.md / .hr.md / .desk.md 수동 동기.

| 토큰 | 값 | 의미 (Apple Store 가이드) |
|---|---|---|
| breakpoint-sm | 640px | Phone max — 이하 single-column |
| breakpoint-md | 736px | Tablet portrait — global nav hamburger |
| breakpoint-lg | 834px | Tablet landscape — full nav, 3-col → 2-col |
| breakpoint-xl | 1069px | Desktop — full layout, 4-5 col grids |
| breakpoint-2xl | 1441px | Wide — content lock at 1440px |

#### HR 적용 가이드 (B2B 데이터 밀도)
HR은 데이터 그리드(직원 목록, 결재 큐, 출퇴근 표) 위주라 desktop(`breakpoint-xl` 1069+) 기본 가정. tablet portrait(736~833)에서는 inline action(승인/반려)을 dropdown으로 collapse, phone(640 이하)은 carded list로 전환. 모바일 화면(approval 앱 등)은 `lg` 사이즈 컴포넌트로 44×44 hit target 충족.

#### 사용 패턴
- min-width (mobile-first): `@media (min-width: var(--breakpoint-lg))` — 834 이상 (tablet landscape +).
- `--breakpoint-*` namespace는 Tailwind v4 표준이라 별칭 없이 직접 사용. 값은 Apple Store 톤 (Tailwind default와 다름).

### Touch targets (v59 추가, prose-token)

WCAG 2.5.5 AAA + Apple Store reference 톤 5 토큰화 — DESIGN.md shared baseline과 동일. spec 외부(prose-token)라 자체 namespace.

| 토큰 | 값 | 의미 |
|---|---|---|
| `touch-min` | `44px` | WCAG minimum (default — 모든 hit target 권장) |
| `touch-pill-w` | `100px` | Pill CTA min-width |
| `touch-circular` | `44px` | Circular chip (= touch-min alias) |
| `touch-nav-h` | `32px` | Precision desktop nav height (`breakpoint-lg` 이상) |
| `touch-nav-w` | `80px` | Precision desktop nav min-width |

#### HR 적용 가이드 (B2B 데이터 밀도)
HR은 데이터 그리드 inline action(승인/반려 row 액션, 결재 메뉴, 평가 등급 선택) 위주 — desktop(`breakpoint-lg` 1280+)에서 `touch-nav-h` 32 / `touch-nav-w` 80 적극 사용 (mouse pointer 가정, 정밀도 우선). 모바일 화면(approval 앱, 모바일 dashboard)은 `touch-min` 44 / `touch-circular` 44 strict 적용 — 데이터 밀도 톤이지만 hit target은 보수.

### Z-index (v65 추가, prose-token)

레이어 stacking order 6 토큰 — DESIGN.md shared baseline과 동일.

| 토큰 | 값 | 주 사용 |
|---|---|---|
| `z-base` | `0` | default 평면 |
| `z-dropdown` | `1000` | dropdown / select / autocomplete / tooltip |
| `z-sticky` | `1100` | sticky header / 결재 큐 sticky 패널 / sticky CTA |
| `z-drawer` | `1200` | side drawer (직원 detail panel, 권한 설정 panel) |
| `z-modal` | `1300` | modal dialog (휴가 신청 확인 / 결재 의견) |
| `z-toast` | `1400` | toast (결재 승인 알림 등) |

#### HR 적용 가이드
- **결재 큐 sticky 패널**: 우측 sticky list = `z-sticky` — 페이지 스크롤과 독립.
- **직원 detail drawer**: 직원 클릭 시 우측 슬라이드 = `z-drawer` — 페이지 콘텐츠 위, 모달 아래.
- **권한 설정 modal**: 권한 변경 확인 = `z-modal` — drawer가 열린 상태에서도 modal이 위.
- **결재 승인 toast**: 어떤 layer 위에서도 최상단 = `z-toast`.
- isolation 권장: 데이터 그리드 inline dropdown은 `isolation: isolate`로 island 격리 — 외부 layer와 우선순위 무관.

### RTL support (v76 추가, prose-only)

DESIGN.md baseline 정의 참고 — CSS logical property 기반 LTR ↔ RTL 자동 분기.

#### HR 적용 컨텍스트
- **현 시점 active 사용 0** — Porest HR 1차 시장 한국어(LTR). RTL active 사용은 향후 글로벌 확장 시점에 평가.
- **신규 컴포넌트 spec 작성 시 logical 우선** — `padding-inline-start`/`end`, `margin-inline-*`, `border-start-start-radius`, `inset-inline-*`, `text-align: start/end`. 추가 비용 0.
- **결재 큐 sticky panel**: 우측 sticky → RTL 시 좌측. `inset-inline-end: 0` 선언 시 자동.
- **직원 detail drawer**: 우측 슬라이드 → RTL 시 좌측에서 등장. keyframe `slide-in-left` ↔ `slide-in-right` `:dir(rtl)` 분기 필요.
- **결재 row chevron icon**: forward `>` → RTL 시 mirror `<` (transform: scaleX(-1)).
- **사번 / 결재번호** (HR-2026-0001 같은 LTR 식별자): RTL 환경에서도 LTR 강제 (`<bdi>` 또는 `direction: ltr`).

## Elevation & Depth

Porest는 **Tonal Layers**(표면 휘도 차)를 1차 elevation 수단으로, **Layered Shadow**를 2차 보조 수단으로 사용합니다 — Toss 톤의 절제된 깊이감.

### v12 추가 — 4단계 shadow 레시피 (prose-token)

> **spec 한계 명시**: design.md spec은 shadow를 공식 YAML 토큰 타입으로 형식화하지 않습니다(`### Design Tokens` 서브섹션 부재). 따라서 본 절의 토큰은 **prose-token** 형태로 markdown 표에 정의 — `colors:`/`typography:` 등의 정형 토큰과 달리 `npm run lint` 자동 검증 비대상. **export 통합(v30)**: `scripts/build-tailwind-v4.mjs`가 DESIGN\*.md를 직접 파싱해 **Tailwind v4 `@theme` CSS**로 빌드 — colors / typography(`--text-*` + `--line-height` / `--font-weight` modifier) / radius / spacing + prose shadow 8종을 모두 포함. 결과는 `exports/tokens.css` / `tokens.hr.css` / `tokens.desk.css`. DTCG export(`npm run export:dtcg`)는 design.md 기본 export 사용 — DTCG draft의 shadow `$type`은 단일 shadow object만 지원해 다중 layer/inset shadow는 매핑 손실 → DTCG에서는 shadow 누락, prose 정의를 직접 참조.

| 토큰 | 값 (CSS box-shadow) | 주 용도 |
|---|---|---|
| `shadow-sm` | `0 1px 2px 0 rgba(15, 18, 28, 0.05)` | 카드 정지 상태(매우 미묘) |
| `shadow-md` | `0 2px 8px -1px rgba(15, 18, 28, 0.08), 0 1px 3px -1px rgba(15, 18, 28, 0.04)` | 드롭다운·툴팁·hover 상태 카드 |
| `shadow-lg` | `0 8px 24px -4px rgba(15, 18, 28, 0.10), 0 2px 6px -2px rgba(15, 18, 28, 0.05)` | popover·작은 모달 |
| `shadow-xl` | `0 24px 48px -8px rgba(15, 18, 28, 0.16), 0 8px 16px -4px rgba(15, 18, 28, 0.08)` | 큰 모달·drawer·hero overlay |

shadow base color `rgba(15, 18, 28, ...)`는 `bg-page-dark`(`#1A1F2E`)에 가까운 cool-neutral 흑색으로, page bg(`#F5F6FA`)와 자연스럽게 어우러지도록 선택. 순수 검정(`#000`)은 명도 차가 과해 광택 인상.

#### 추가 이유
1. v1~v11에서 색상·텍스트·간격·라운드는 갖춰졌으나 popover·dropdown·modal 분리는 표면 휘도 차만으로 부족 — 동일한 `surface-default`(`#FFFFFF`) 위에 또 다른 `surface-default`를 띄울 때 식별 수단 필요.
2. **4단계로 한정**(5 한도 중 1개 여분): Toss 류 절제된 elevation. `2xl`은 hero 대형 overlay 등장 시 추가.
3. 모든 shadow는 동일 base color + opacity 누적 — 일관 톤.

#### Tonal Layers (1차 elevation)
shadow 추가 전에 surface 휘도 차로 해결 가능한지 확인 — 가능하면 그쪽 우선:
- **카드 vs 페이지**: `surface-default`(L=1.0) on `bg-page`(L=0.92) 차이로 식별 가능 → shadow 불필요 또는 `shadow-sm`만.
- **다크 카드 vs 다크 페이지**: `surface-default-dark`(L=0.023) on `bg-page-dark`(L=0.015) 차이가 미묘 → `shadow-sm` 또는 1px `border-default-dark` 보강 필요.
- **다크 모드 shadow**: rgba 흑색 shadow는 다크 표면 위에서 거의 안 보임 — light용 `rgba(15, 18, 28, 0.05~0.16)`은 cool-neutral 흑색이라 다크 표면과 명도 차가 거의 없습니다. v25에서 다크 모드 전용 `shadow-*-dark` 변형 도입(아래 섹션 참조) — black opacity 강화 + inset top highlight 패턴. light·dark 모두 `border-default(-dark)` + 표면 휘도 차와 함께 사용하는 원칙은 유지.

#### WCAG 검증
- **1.4.3 / 1.4.11**: shadow 자체는 색 대비 비대상.
- **간접 영향**: 모달이 표면 위에 떠 있을 때, `shadow-xl`이 모달 외곽 vs 페이지 사이 시각 분리에 기여. 단 분리의 **정량적 보장**은 shadow 단독으로 어렵고 — 모달은 항상 `border-default` + dim overlay와 함께 사용해 식별성 확보(컴포넌트 스펙).
- **자동 검증 불가**: lint contrast 룰은 `backgroundColor`/`textColor` 페어만 검사. shadow는 spec 토큰 타입이 아니므로 검증 룰 부재. 본 prose-token은 손계산·시각 검토에만 의존 — `border-strong` 등과 동급의 자동 검증 한계.

#### HR / Desk 듀얼 브랜드
- 모든 shadow는 brand-neutral. HR(B2B 절제)·Desk(B2C 친근감) 모두 동일 스케일 사용.
- 다만 적용 강도 분기 권장: HR은 `shadow-sm`/`shadow-md` 위주(평면적 데이터 밀도), Desk는 `shadow-md`/`shadow-lg` 위주(친근한 입체감). 토큰 자체 분기 불필요.

### v25 추가 — 다크 모드 4단계 shadow (prose-token)

v12 시점에는 다크 모드 사용 사례가 적어 `shadow-*-dark` 변형 도입을 보류했으나, v23~v24에서 다크 차트 표면(`chart-color-*-on-dark` 10색)·다크 모달 케이스가 본격화되며 다크 elevation 솔루션이 필요해졌습니다. Material Design 3 dark elevation 가이드(2021~)·Apple Big Sur 패턴을 참고한 절충안을 채택합니다.

| 토큰 | 값 (CSS box-shadow) | 주 용도 |
|---|---|---|
| `shadow-sm-dark` | `0 1px 2px 0 rgba(0, 0, 0, 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | 다크 카드 정지 상태 |
| `shadow-md-dark` | `0 2px 8px -1px rgba(0, 0, 0, 0.40), 0 1px 3px -1px rgba(0, 0, 0, 0.20), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)` | 다크 드롭다운·툴팁·hover 카드 |
| `shadow-lg-dark` | `0 8px 24px -4px rgba(0, 0, 0, 0.50), 0 2px 6px -2px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)` | 다크 popover·작은 모달 |
| `shadow-xl-dark` | `0 24px 48px -8px rgba(0, 0, 0, 0.60), 0 8px 16px -4px rgba(0, 0, 0, 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.10)` | 다크 큰 모달·drawer·hero overlay |

#### 패턴 결정
- **drop shadow base를 `rgba(0, 0, 0, ...)`로 변경**: 다크 표면(`bg-page-dark` `#1A1F2E`, L=0.015) 위에서는 light용 cool-neutral 흑색(`rgba(15, 18, 28, ...)`)이 표면과 합쳐져 식별 거의 불가. 순수 검정으로 회귀해 명도 차 확보.
- **opacity 2~4배 강화** (light 0.05 → dark 0.30, light 0.16 → dark 0.60): 다크 표면이 이미 어두우므로 약한 그림자는 무효 — 명확한 cast shadow 형성에 필요한 강도.
- **`inset 0 1px 0 rgba(255, 255, 255, N%)` top highlight 추가**: drop shadow 단독으로는 다크 표면 위에서 "위로 올라온 느낌"보다 "아래로 들어간 느낌"이 강해짐. 1px 흰색 inset highlight로 광원 위치를 시뮬레이션해 elevation 인지를 보강(Big Sur·Material 3 공통 패턴). highlight opacity는 단계별 5% → 10%로 누적.

#### 추가 이유
1. v23~v24의 chart dark 변형 10색·다크 모달 케이스 본격화 — 보류 사유였던 "직관적 디자인 솔루션 미정착"이 Material 3 dark elevation·Big Sur 패턴 정착으로 해소.
2. **light scale과 1:1 대응** (`sm/md/lg/xl`): 컴포넌트 스펙 작성 시 mode pair 매핑이 자명 — `shadow-md` ↔ `shadow-md-dark`.
3. 4종 추가(5 한도 이내), 색상 토큰 미증가 — lint contrast 검증 비대상(prose-token).

#### WCAG / 자동 검증
- shadow 자체 비대상은 light와 동일(1.4.3 / 1.4.11 비대상).
- lint 자동 검증 불가도 동일 — `colors:` YAML 외부 prose 토큰. 본 토큰은 손계산·시각 검토에만 의존.
- 다크 모달 분리감은 `border-default-dark` + `shadow-xl-dark` + dim overlay 3중 보강(컴포넌트 스펙에서 명시).

#### HR / Desk 듀얼 브랜드
- light scale과 동일하게 brand-neutral. 토큰 자체 분기 불필요.
- 적용 강도 분기 권장: HR은 `sm-dark`/`md-dark` 위주, Desk는 `md-dark`/`lg-dark` 위주.

### v43 추가 — overlay dim (prose-token)

modal/sheet/drawer dim overlay (alpha 채널 prose-token).

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `overlay-dim-light` | `rgba(0, 0, 0, 0.50)` | 라이트 modal/sheet 배경 dim |
| `overlay-dim-dark` | `rgba(0, 0, 0, 0.65)` | 다크 modal/sheet 배경 dim |

`scripts/build-tailwind-v4.mjs` 자동 추출 → `--overlay-dim-*`.

## Motion

### v32 추가 — 4단계 duration + ease-out (prose-token)

> **spec 한계**: design.md spec은 motion(transition) 토큰 타입을 정형화하지 않습니다. shadow와 동일한 **prose-token** — `npm run lint` 자동 검증 비대상이며, `scripts/build-tailwind-v4.mjs`가 prose 표에서 추출해 v4 `@theme` CSS의 `--motion-duration-*` / `--motion-ease-*`로 출력.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `motion-duration-fast` | `150ms` | 작은 hover/focus 전환, ripple |
| `motion-duration-base` | `200ms` | default — drawer/dropdown 일반 UI 전환 |
| `motion-duration-slow` | `300ms` | modal/page-level 전환 |
| `motion-duration-slower` | `500ms` | hero/large layout shift |
| `motion-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | default — 자연스러운 감속(Toss·Material 공통) |

#### 추가 이유
1. v25(shadow-*-dark) → v30(v4 build)으로 elevation·typography 인프라 도입 후, v32에서 motion으로 시간 차원 추가 — 컴포넌트 인터랙션(hover, modal entrance, drawer slide) 작성 단계 진입.
2. **4 duration + 1 easing**: Toss·Material 동일 절제 — 모든 전환을 같은 ease-out으로 통일해 일관 톤. 토큰 5종(5 한도 정확).
3. easing은 **`ease-out` 단독**으로 시작 — `ease-in` / `ease-in-out` / `spring`은 사용 사례 등장 시 추가.

#### WCAG / 자동 검증
- **2.3.3 Animation from Interactions**: 200ms 초과 large 전환(`slow`/`slower`)은 `prefers-reduced-motion: reduce` 미디어 쿼리로 비활성 권장. 컴포넌트 스펙에서 명시.
- 자동 검증 불가는 shadow와 동일 — prose-token이라 lint 비대상. 손계산·시각 검토 의존.

#### HR / Desk 듀얼 브랜드
- motion은 brand-neutral. HR/Desk 동일 스케일.
- 적용 강도 분기 권장: HR(B2B)은 `fast`/`base` 위주(절제), Desk(B2C)는 `base`/`slow` 위주(친근감).

### Loop motion (v63 추가, prose-token)

skeleton shimmer · spinner · pulse 등 **반복 애니메이션** 용 토큰 2종.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `motion-duration-loop` | `1500ms` | skeleton shimmer 1주기, pulse 1주기 |
| `motion-ease-linear` | `linear` | 반복 일정 속도 |

DESIGN.md의 Loop motion 정의와 동일 (brand-neutral). HR `fast`/`base`/`loop` 조합이 일반적 — 결재 큐 row hover(`fast`) + dropdown(`base`) + skeleton(`loop`).

### Animation library (v74 추가, prose-token)

DESIGN.md baseline 정의 참고 — 14 keyframes (단발 10 + loop 4): fade-in/out, slide-in-{up,down,left,right}, scale-in/out, bounce-in, shake, spin, pulse, shimmer, ping. CSS keyframe 정의 + 권장 duration/ease 매핑.

#### HR 우선 패턴
- **결재 row 등장** — `fade-in` + `motion-duration-base` (200ms): 새 결재 도착 시 row 위에서 스무스 등장. dramatic motion 회피, 절제 톤.
- **Toast 알림** — `slide-in-down` + `motion-duration-base` (200ms): top-right 위치라 위에서 내려옴.
- **Modal/Dialog** — `scale-in` + `motion-duration-base` (200ms): 결재 confirm dialog, 직원 detail.
- **Drawer (직원 detail)** — `slide-in-left` + `motion-duration-slow` (300ms): 우측에서 등장.
- **Skeleton (결재 큐 로딩)** — `shimmer` + `motion-duration-loop` (1500ms) linear: 결재 row placeholder.
- **Spinner (저장 중)** — `spin` + `motion-duration-loop` (1500ms) linear.
- **Form validation error** — `shake` + `motion-duration-slow` (300ms): 결재 의견 미입력 등 금지 시.
- **bounce-in 제한 사용** — 결재 완료 후 success indicator 정도. 일상 UI엔 과도.

#### HR 회피 패턴
- `slide-in-right` (drawer 좌측 등장) — sidebar 좌측 고정 layout이므로 우측에서 등장이 자연.
- `ping` — alert·notification 위치만, 일반 row엔 distraction.

## Shapes

### v99 — SEED 모서리 스케일 (2026-09-29)

당근 SEED 의 radius 스케일을 그대로 들인다 — 2px ~ 24px 10단계와 `full`, 이름도 SEED 와 같다(`r1` = 4px). 지금까지의 7단계(`xs` 2 · `sm` 4 · `md` 8 · `lg` 12 · `xl` 16 · `2xl` 20 · `full`)는 모두 이 눈금 위라 값이 바뀌지 않고, 옮기는 동안 같은 값의 별칭으로 남는다. 새로 생긴 값은 6 · 10 · 14 · 24px 이다.

| 토큰 | 값 | 옛 이름(별칭) |
|---|---|---|
| `radius-r0_5` | 2px | `radius-xs` |
| `radius-r1` | 4px | `radius-sm` |
| `radius-r1_5` | 6px | — |
| `radius-r2` | 8px | `radius-md` |
| `radius-r2_5` | 10px | — |
| `radius-r3` | 12px | `radius-lg` |
| `radius-r3_5` | 14px | — |
| `radius-r4` | 16px | `radius-xl` |
| `radius-r5` | 20px | `radius-2xl` |
| `radius-r6` | 24px | — |
| `radius-full` | 9999px | `radius-full`(같은 이름) |

- 이번에는 **토큰만** 넓힌다. 컴포넌트마다 어느 모서리를 쓸지는 2단계에서 SEED 의 해당 컴포넌트와 하나씩 비교해 정한다 — SEED 는 porest 보다 둥글다(버튼 · 입력칸 8 ↔ porest 4, 대화상자 20 ↔ 12, 말풍선 12 ↔ 2). 그때까지 아래 v83 매핑(토스 톤)이 지금 값이다.
- 새로 쓰는 모서리는 SEED 이름으로 적는다. 옛 이름은 컴포넌트 스펙 · 제품이 다 옮기면 걷는다.
- 사용자 결정(2026-09-29 — 모서리 A: 토큰만 넓히고 컴포넌트는 하나씩). 이름 방식은 v98 간격과 같은 원칙이다 — 6 · 10 · 14 · 24 를 크기 이름(xs · sm …) 사이에 끼울 이름이 없다.

### v6 추가 — 5단계 라운드 스케일 (v99 에서 SEED 스케일로 바뀜 — 아래는 기록)

`sm/md/lg/xl`는 spacing 베이스(4px)와 정렬된 4px 배수, `full`은 완전 라운드(알약·원형) 관용값입니다.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `sm` | 4px | 칩·태그·작은 뱃지 |
| `md` | 8px | 버튼·입력 필드 default |
| `lg` | 12px | 카드 default |
| `xl` | 16px | 모달·큰 카드·시트 |
| `full` | 9999px | 알약 버튼·아바타·원형 아이콘 버튼 |

#### 추가 이유
1. v1~v5에서 색상·표면·텍스트·외곽선·간격·타이포가 모두 정의됐으나 컴포넌트 모서리 처리 의사결정이 미완 — 버튼·카드·모달 스펙 작성의 마지막 차단 요소.
2. `full` 포함 5단계는 80% 컴포넌트 사용 사례 커버. `2xl(24px+)`는 hero/major 사용 사례 등장 시 추가.
3. spacing과 동일한 4px 배수 베이스 — radius와 padding이 동일 리듬을 유지해 시각 정합성 확보.

#### WCAG 검증
- **1.4.3 / 1.4.11 색상 대비**: 비대상 (치수 토큰).
- **1.4.12 Text Spacing**: 비대상.
- **2.5.5 Target Size (44×44 AAA / 24×24 AA)**: rounded는 hit-area에 직접 영향 없음. 단, `full`을 작은 아이콘 버튼에 적용 시 padding(`md(12px)`+) 또는 `min-width: 44px`로 별도 확보 필요 — 토큰 자체가 target size를 보장하지 않음을 컴포넌트 스펙에 명시.

#### HR / Desk 듀얼 브랜드
- 모든 rounded 토큰은 brand-neutral — 양 브랜드 동일.
- 브랜드 톤 분기는 적용 강도로 처리: HR(B2B 절제) `md`/`lg` 위주, Desk(B2C 친근) `lg`/`xl` 위주. 토큰 분기 불필요.

## Components

### Button

HR 브랜드는 B2B(조직 HR 관리) 톤 — 절제·신뢰감 우선. 화면당 primary 1개 권장, hover/pressed 강도는 미니멀.

#### Variant
| Variant | 토큰 | fill | text | border |
|---|---|---|---|---|
| **primary** | `button-primary` | `primary` (`#357B5F`) | `text-on-accent` (`#FFFFFF`) | none |
| **outline-on-dark** | `button-outline-on-dark` | transparent | `primary-light` (`#6BAE8C`) | `border-strong-dark` |
| **ghost** (예약) | 미정 | transparent | `primary` | none — hover 시 `surface-input` 채움 |

contrast 검증:
- primary fill `#357B5F` × text `#FFFFFF` = **5.16:1** ✅ 본문 AA
- outline-on-dark text `#6BAE8C` × surface `#242938` = **5.45:1** ✅ 본문 AA
- (primary fill 자체 vs `bg-page` 외곽 대비 = 3.49:1 ✅ UI AA — 1.4.11)

#### State
| State | 시각 |
|---|---|
| default | variant 기본 + `shadow-sm` (primary만, outline-on-dark는 `shadow-sm-dark` inset highlight) |
| hover | `motion-duration-fast` 150ms × `motion-ease-out`로 fill 명도 +5% (HR primary `#357B5F` → `#3B8A6A`로 자연 hover, 토큰 미정 — 컴포넌트 인라인 처리) + `shadow-md` |
| pressed | hover 유지 + scale(0.98) + shadow 제거 (시각적 눌림) |
| focused | `border-focus` (`#357B5F`) 2px outline, 버튼 외곽 1px offset. `focus-visible` 한정 |
| disabled | `text-disabled` (`#828995`) text + opacity 0.5 + cursor:not-allowed |

#### Size
| Size | height | padding (V/H) | text | radius |
|---|---|---|---|---|
| sm | 32px | `xs` / `sm` | `caption` (12/400) | `sm` (4px) |
| **md** (default) | 40px | `sm` / `md` | `body-md` (15/500) | `sm` |
| lg | 48px | `md` / `lg` | `title-sm` (16/500) | `md` (8px) |

HR은 데이터 밀도 화면이 많으므로 `sm`/`md` 위주, `lg`는 onboarding·empty state 등 강조 시.

#### Touch target / Layout
- 인접 액션 간 최소 `sm` (8px), 권장 `md` (12px) — HR 데이터 그리드의 inline action(승인/반려 등) 가독성
- 모바일 화면(approval 앱 등)은 `lg` 권장 — WCAG 2.5.5 AAA (44×44px 충족)

#### Motion
- hover/pressed: `motion-duration-fast` × `motion-ease-out`
- `prefers-reduced-motion: reduce` 시 0ms 즉시 전환

#### Accessibility
- keyboard: `Enter`/`Space` 활성, `Tab` focus, focus ring `border-focus` 2px
- aria: 아이콘 only는 `aria-label`, loading은 `aria-busy="true"` + `disabled` 동시
- disabled 텍스트 4.5:1 미달은 1.4.3 incidental 예외 (사용 불가 컴포넌트 텍스트)

### Input

HR(B2B 데이터 밀도) — `sm`/`md` 사이즈 위주, 인라인 그리드 편집(approval form 등)에서 `sm` 적극 사용. focus ring은 brand `primary` (`#357B5F`).

#### Mode pair
| Token | 배경 | text | placeholder |
|---|---|---|---|
| `input-light` | `surface-input` (`#F0F2F7`) | `text-primary` (`#1A1F2E`, 14.49:1 ✅) | `text-tertiary` (`#62697A`, 5.81:1 ✅ — placeholder는 1.4.3 incidental 예외이지만 본문 통과) |
| `input-dark` | `surface-input-dark` (`#2D3346`) | `text-primary-dark` (`#F5F6FA`, 11.40:1 ✅) | `text-tertiary-dark` (`#9DA3B0`, 5.51:1 ✅) |

#### State
| State | border | 비고 |
|---|---|---|
| default | `border-default` 1px | 외곽선 단독 식별 부족 — label/형태 보강 |
| focused | `border-focus` (`#357B5F`) 2px + 1px offset | `focus-visible` 한정. focus ring vs `surface-input` = 3.96:1 ✅ (1.4.11) |
| filled | default 유지 | |
| error | `error` (`#D72323`) 1px + helper text `error` 색상 | border vs `surface-input` = 4.51:1 ✅ (1.4.11 UI 3:1 통과) |
| disabled | default + `text-disabled` + opacity 0.5 | 1.4.3 incidental |

#### Size
| Size | height | padding (V/H) | text | radius |
|---|---|---|---|---|
| sm | 32px | `xs` / `sm` | `caption` (12/400) | `sm` |
| **md** (default) | 40px | `sm` / `md` | `body-lg` (16/400) | `sm` |
| lg | 48px | `md` / `lg` | `body-lg` (16/400) | `sm` |

입력 container 는 사이즈와 무관하게 `sm` radius(4px) 고정 — `specs/components/input.md`.

#### Layout
- label `caption` (12/400) + `xs` 간격, error/helper도 동일
- form 행 간 `lg` (16px), section 간 `xl` (24px) — HR은 정보 밀도 높여야 하므로 spacing 보수적

#### Motion
- focus ring: `motion-duration-fast` × `motion-ease-out` (HR 절제 톤)
- error 등장: `motion-duration-base` × `motion-ease-out`

#### A11y
- keyboard `Tab`/`Shift+Tab` focus, `aria-invalid`/`aria-describedby` for 에러, `aria-required` for 필수
- screen reader: label은 `<label for>` 또는 `aria-labelledby` 필수

### Card

HR(B2B 데이터 밀도) — `default`/`outline` variant 위주, dashboard widget·data list 적극. `interactive`는 row click 행 단위.

#### Mode pair
- `card-light` (`#FFFFFF`) / `card-dark` (`#242938`)

#### Variant
| Variant | shadow | border | 사용 |
|---|---|---|---|
| **default** | `shadow-sm` | none | 일반 widget |
| **interactive** | `shadow-sm` → hover `shadow-md` | none | row click, list item |
| **outline** | none | `border-default` 1px | flat 데이터 그리드 (밀도 우선) |
| **flat** | none | none | inline 그룹 (dashboard 안 위젯) |

다크 카드는 `interactive`에 `border-default-dark` 1px 보강.

#### Padding
| Level | 값 | 사용 |
|---|---|---|
| sm | `md` (12px) | 작은 KPI 카드, inline list item |
| **md** (default) | `lg` (16px) | 대시보드 위젯, 데이터 카드 |
| lg | `xl` (24px) | detail panel (직원 상세, 평가 상세) |

HR은 `xl` padding은 hero 사용 사례 등장 시. 일반적으로 `sm`/`md` 위주.

#### Radius
- default `radius-md` (8px), 데이터 그리드 inline은 `radius-sm` (4px)

#### Layout
- 카드 그리드 gap: `md` (12px) — HR은 데이터 밀도 톤
- 카드 내부 콘텐츠 간격: `sm` (8px)

#### Motion
- interactive hover: `motion-duration-fast` × `motion-ease-out`
- accordion expand: `motion-duration-base`

#### A11y
- interactive: `<button>` 또는 `role="button"` + `tabindex="0"` + Enter/Space
- focus: 카드 외곽 `border-focus` 2px outline + 1px offset

### Page text

HR(B2B) — `bg-page` 위 본문은 dashboard layout, sidebar nav 텍스트 등. data-dense 화면에서 본문 가독성 우선.

#### Mode pair / contrast
- `page-text-light`: `bg-page #F5F6FA` × `text-primary #1A1F2E` = **15.04:1** ✅ AAA
- `page-text-dark`: `bg-page-dark #1A1F2E` × `text-primary-dark #F5F6FA` = **15.04:1** ✅ AAA

#### Typography
- 본문 `body-md` (15/400/1.6), 강조 `body-md` (15/600), 데이터 라벨 `caption` (12/400) + `text-secondary`
- 헤딩 위계: dashboard title `display-sm` (24/700), section `title-md` (18/600), widget title `title-sm` (16/600)

#### Layout
- 본문 max-width: 640px (한국어 1줄 35~40자, 데이터 화면 본문은 짧게)
- 단락 간 `md` (12px), 섹션 간 `lg`/`xl` (16~24px)

#### A11y
- 1.4.3 / 1.4.12 / 1.4.4 — 위 contrast + lineHeight 1.6 + 200% reflow 충족

### Caption

HR — meta 정보(직원명, 부서, 타임스탬프)·테이블 cell label에 적극.

#### 위계 / Mode pair / contrast
| Token | text | contrast (HR) |
|---|---|---|
| `caption-on-card-light` | `text-secondary` (`#4E5968`) | 6.78:1 ✅ |
| `caption-on-card-dark` | `text-secondary-dark` (`#B0B8C4`) | 6.85:1 ✅ |
| `caption-tertiary-on-card-light` | `text-tertiary` (`#62697A`) | 5.36:1 ✅ |
| `caption-tertiary-on-card-dark` | `text-tertiary-dark` (`#9DA3B0`) | 5.13:1 ✅ |

#### Layout
- 본문과 `xs` (4px) 간격
- 메타 그룹 구분자 `·`, 그룹 간 `xs` 간격

### Badge

HR — 직원 상태(재직/휴직/퇴사), 결재 상태(승인/반려/대기), 평가 등급 등 status indicator로 광범위 사용. semantic 4종 + count badge.

#### Variant
공유 토큰 그대로 — `badge-success` / `badge-error` / `badge-warning` / `badge-info`. contrast 5.27~6.31:1 모두 본문 AA.

#### Size
- 데이터 그리드 inline은 `sm` (18px), 일반 status는 `md` (22px), 강조 alert badge는 `lg` (28px)
- shape: pill(`radius-full`) 위주 — status pill 톤

#### Layout
- 직원명 옆 status: `xs` 간격
- 그룹(예: 평가 등급 + 부서) 시 `sm` 간격

#### A11y
- 1.4.1: status를 색상만으로 표현 금지 — 텍스트/아이콘 보강 ("재직 ✓", "휴직 ⏸")
- count badge: `aria-live="polite"` + `aria-label`

### Alert text

HR — form validation(직원 정보 입력 에러), 결재 상태 변경 안내, 시스템 공지 등.

#### Variant
공유 토큰 8종 그대로 — semantic 4 × {light/on-dark}. contrast 5.27~6.31:1 (light), 5.42~5.85:1 (on-dark) 모두 본문 AA.

#### Typography
- form helper(필드 아래): `caption` (12/400) + `xs` (4px) 간격
- 일반 alert 본문: `body-md` (15/400)
- alert 제목: `body-md` (15/600)

#### Layout
- icon + text 페어: icon `xs` 간격, size 16px (caption 높이에 맞춤)
- alert 영역 padding `sm` ~ `md`

#### Motion
- 등장: `motion-duration-base` × `motion-ease-out` (HR 절제 — 빠른 fade-in 권장)
- dismiss: `motion-duration-fast`

#### A11y
- error는 `role="alert"` (assertive), info/success는 `aria-live="polite"`
- form `<input aria-describedby="err-1">` + `<span id="err-1" class="alert-text-error">...`

### Focus ring

HR 브랜드 — `border-focus` (`#357B5F`) / `border-focus-light` (`#6BAE8C`) 사용. 모든 인터랙티브 컴포넌트(button / input / card-interactive / tab / link)의 focus 표현 통일.

#### Mode pair (sparse — primary 토큰이 contrast 검증 담당)
| Token | 색상 | 사용 |
|---|---|---|
| `focus-ring-on-light` | `border-focus` (`#357B5F`) | 라이트 표면 위 모든 컴포넌트 |
| `focus-ring-on-dark` | `border-focus-light` (`#6BAE8C`) | 다크 표면 위 모든 컴포넌트 |

#### Contrast (실측)
| 페어 | 대비 |
|---|---|
| `border-focus` (`#357B5F`) vs `bg-page` (`#F5F6FA`) | **3.31:1** ✅ UI |
| `border-focus` (`#357B5F`) vs `surface-default` (`#FFFFFF`) | **3.49:1** ✅ UI |
| `border-focus` (`#357B5F`) vs `surface-input` (`#F0F2F7`) | **3.96:1** ✅ UI |
| `border-focus-light` (`#6BAE8C`) vs `bg-page-dark` (`#1A1F2E`) | **5.16:1** ✅ UI/AA |
| `border-focus-light` (`#6BAE8C`) vs `surface-default-dark` (`#242938`) | **4.72:1** ✅ UI |

모든 라이트/다크 표면에서 2.4.11 (3:1 UI) 통과.

#### Spec
- 두께 2px, offset 1px, shape 컴포넌트와 동일 `border-radius`
- `focus-visible` pseudo만 사용 (마우스 클릭 시 미표시)

#### Motion
- focus ring 등장: `motion-duration-fast` × `motion-ease-out`
- `prefers-reduced-motion: reduce` 시 즉시 표시

#### A11y
- 2.4.11 / 2.4.12 / 2.4.13 — 위 contrast 충족, sticky header 아래 자동 스크롤 권장 (`scroll-margin-top`)
- 다크 모드는 `[data-theme="dark"]` 토글로 `--color-border-focus-light` 자동 적용

### Divider

HR — list separator, section break, sidebar/main 분할에 광범위 사용 (데이터 그리드 row separator 등).

#### Mode pair
- `divider-light` → `border-default` (`#E5E8EF`)
- `divider-dark` → `border-default-dark` (`#353B4D`)

#### Layout
- list item 사이 inline divider, padding 안쪽 inset (`md` 12px)
- section break 위/아래 `lg` (16px) 간격
- sidebar 수직 divider full height

#### A11y
- 시각 grouping 보조, semantic HTML 우선 (`<hr>` / `<section>` / `<aside>`)
- inline divider는 `aria-hidden="true"`

### Outline (border 시각 요소)

HR — modal 외곽선, 선택된 row highlight, inline editor in-progress.

#### Mode pair / contrast
- `outline-strong-light` → `border-strong` (`#7D8593`): surface-default 3.34:1 / bg-page 3.13:1 / surface-input 3.34:1 (모두 UI AA)
- `outline-strong-dark` → `border-strong-dark` (`#8B95A8`): bg-page-dark 3.97:1 / surface-default-dark 3.39:1 / surface-input-dark 4.05:1 (모두 UI AA)

#### 사용
- modal: `shadow-xl` + `outline-strong-light` 동시 (focus 분리감)
- 다크 modal: `shadow-xl-dark` + `outline-strong-dark`
- 선택 row: `outline-strong-light` 1px + `surface-input` 6% tint (선택, 강조 시)

### Disabled label

HR — 권한 부재(비-승인자가 결재 버튼 보지만 누르지 못함), 기간 만료(평가 종료 후 입력 disabled) 등 사용 불가 상태 표현.

#### Mode pair (sparse — textColor only)
- `disabled-label-light` → `text-disabled` (`#828995`, surface 위 약 3.69:1, 1.4.3 incidental 예외)
- `disabled-label-dark` → `text-disabled-dark` (`#7A8294`, dark surface 위 약 3.74:1)

#### Spec
- text color disabled, 컴포넌트 자체 opacity 0.5 + cursor:not-allowed
- **권장 동반 표현**: 컴포넌트 옆 `caption` (12/400) + `text-tertiary` "권한 없음" / "마감 종료" 등 reason text — 정상 contrast

#### A11y
- 1.4.3 incidental 예외 명시
- aria: form은 `disabled`, focus 필요 메뉴는 `aria-disabled="true"`
- screen reader가 "비활성화됨" 읽음

### Switch / Checkbox / Radio (control 묶음)

HR — 직원 정보 form(필수/선택 옵션), 권한 토글 switch, 평가 항목 다중 선택 checkbox, 평가 등급 radio 등 form 화면 광범위 사용.

#### 공통 spec (신규 토큰 없음)
- inactive: `border-strong` 1px outline + `surface-input` 채움
- active: `primary` (`#357B5F`) 채움 + `text-on-accent` 표시 (체크/핸들/dot)
- disabled: opacity 0.5 + cursor:not-allowed

#### Variant
- Switch: `md` 28×16 default, toggle 즉시 effect (권한 on/off 등)
- Checkbox: 18×18 default, indeterminate 지원 (직원 multi-select header)
- Radio: 18×18 default, group 내 단일 선택 (평가 등급 S/A/B/C/D)

#### Layout
- form 행: label + control + helper, 행 간 `lg` (16px)
- group: vertical 시 항목 간 `md` (12px), horizontal `lg` (16px)
- touch hit area 44×44 (label 포함)

#### A11y
- HTML native `<input>` + `<label for>` 우선
- focus ring `border-focus` 2px, 키보드 Space (toggle/check), Radio arrow keys
- error 상태 외곽 `error` 색 + alert text 동반

### Tabs

HR — 직원 detail page(기본정보/근태/평가/급여 등 섹션 전환), dashboard 카테고리(전체/내 부서/필터된 view), 설정 페이지 grouping.

#### Variant
- **underline** (default): bottom border 2px `border-focus` (`#357B5F`, primary alias) + `text-primary` active
- **vertical** (sidebar): 좌측 border 2px + `surface-input` 배경 — HR sidebar nav 친화

#### Size
- 데이터 화면 default: `md` (44px) — `body-lg` 15/600
- 빈도 높은 sub-tab: `sm` (36px) — `caption` 12/400

#### Layout
- tab list 하단 `divider-light` 1px line, active tab 2px border가 line 덮음
- tab panel padding `lg` (16px)

#### Motion
- underline indicator slide: `motion-duration-fast`
- panel 전환: instant (HR은 데이터 표시 우선이라 fade animation 없이 즉시)

#### A11y
- role tablist/tab/tabpanel + aria-selected/aria-controls/aria-labelledby
- 키보드: ←→/Home/End/Enter/Space, vertical은 ↑↓
- manual activation default (focus ≠ activation) — HR은 form 화면 많아 자동 전환 시 입력 손실 가능

### Dropdown (Menu / Select 공통 패턴)

HR — 직원 선택, 부서 선택, 결재 액션 메뉴(승인/반려/위임), 평가 등급 선택, 필터 옵션 등에서 광범위 사용.

#### Structure (신규 토큰 없음)
- panel: `surface-default` + `outline-strong-light` 1px + `shadow-md` + `radius-md`
- item: height 36px, padding `sm`/`md`, text `body-md` (15/400)
- hover `surface-input`, selected primary 좌측 stroke 또는 ✓ (`#357B5F`)

#### Variant
- menu(action), select(form), multi-select(checkbox item), combobox(search input + filter)

#### Layout
- panel max-height 400px (초과 시 scroll), min-width trigger width 또는 `lg` (16rem)
- offset `xs` (4px), 자동 flip

#### Motion
- 등장 scale+fade `motion-duration-fast`, 사라짐 동일

#### A11y
- role: menu/menuitem 또는 combobox/listbox/option, trigger `aria-expanded`+`aria-haspopup`
- 키보드: ↑↓/Home/End/Enter/Esc/typeahead
- focus: 열릴 때 첫 item, 닫힐 때 trigger return
- dismiss: 외부 click/Esc/trigger 재click

### Tooltip

HR — icon-only action button(승인/반려/편집/삭제 icon) 의미 설명, 데이터 테이블 cell truncated 텍스트, 키보드 단축키 안내. desktop 우선이라 hover-driven tooltip이 광범위 사용.

#### Structure (신규 토큰 없음)
- 표면: `surface-default-dark` + `text-primary-dark` (11.40:1 AAA)
- shadow `shadow-sm`, radius `radius-sm`, padding xs/sm

#### Layout
- text: `caption` (12/400), max-width 240px, max 2줄
- arrow optional, offset `xs` (4px) gap

#### Motion
- hover delay 500ms, focus 0ms 즉시
- 등장: fade-in `motion-duration-fast`, 사라짐 동일

#### A11y
- WCAG 1.4.13: dismissible(Esc), hoverable, persistent
- icon-only button: tooltip + `aria-label` 동시 (screen reader 보강)
- 데이터 그리드 truncated cell: hover 시 tooltip + 키보드 focus도 동등

### Toast

HR — 결재 처리 완료, 직원 정보 저장, 시스템 알림 등 짧은 작업 결과 표시.

#### Structure (신규 토큰 없음)
- 표면: `surface-default` + `shadow-md` + `radius-md`
- semantic 4종 좌측 4px stroke + icon (`success`/`error`/`warning`/`info`)
- text: `body-md` (15/400) + (선택) `body-lg` 제목

#### Position
- desktop default: top-right (24px 여백)
- 모바일 앱(승인 등): top-center

#### Layout
- max-width 360px, padding `md` (12px), icon+text 간격 `sm` (8px)
- 중첩 시 stack 위→아래, `xs` 간격

#### Motion
- 등장: slide-in + fade (`motion-duration-base`)
- 자동 닫힘: success/info 4s, warning 6s, error 8s, hover pause
- 사라짐: slide-out + fade (`motion-duration-fast`)

#### A11y
- error는 `role="alert"` + `aria-live="assertive"`, 그 외 `role="status"` + polite
- 자동 닫힘 시간 prefers-reduced-motion +50% 또는 시스템 설정으로 조정 가능
- focus 빼앗지 않음, dismissible `aria-label="알림 닫기"`

### Modal

HR — 결재 처리(승인/반려 confirm), 직원 정보 편집, 평가 입력, 권한 변경 등 form/decision flow에서 광범위 사용. desktop 우선이라 centered modal 위주.

#### Structure
- overlay: `overlay-dim-light` / `overlay-dim-dark` (page click 시 닫기 — destructive action 없는 modal만)
- container: `surface-default` + `outline-strong-light` 1px + `shadow-xl` (dark는 `shadow-xl-dark`)
- 3 영역: header(title + close) / body-lg / footer (action buttons)

#### Variant
- sm 384px: 확인 다이얼로그 ("승인하시겠습니까?")
- **md 480px** (default): 직원 단일 정보 편집
- lg 640px: 다단계 평가 입력, 복잡한 form
- mobile (모바일 앱 한정): full sheet bottom-up

#### Layout
- container padding: `xl` (24px)
- header/body-lg 간격: `lg`, body-lg/footer 간격: `xl`
- footer button 정렬: 우측, primary action 우측 끝, secondary action 그 좌측

#### Motion
- 등장: overlay `motion-duration-base` fade + container `motion-duration-slow` scale+fade
- 사라짐: 역순, `motion-duration-base`

#### A11y
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` + focus trap + ESC close + return focus + scroll lock
- destructive action(삭제, 영구 변경)은 `role="alertdialog"` + 명시 confirm

### Chart color (palette)

HR — dashboard chart (직원 분포, 평가 결과, 부서별 비교, 휴가 사용률 등)에 광범위 사용. 10색 palette × 2 mode.

#### 사용 시나리오
- **bar/column chart**: 부서별/직급별 비교 — `chart-color-blue`/`indigo`/`green` 등 brand-친화 3색 우선
- **pie/donut**: 평가 등급 분포(S/A/B/C/D) — 5색 사용, S는 `chart-color-green`, D는 `chart-color-red` (의미 매핑 가능 시)
- **heatmap**: 부서별 출석률 — 단일 hue (예: `chart-color-blue`) + opacity 그라데이션
- **stacked bar**: 휴가 종류별 — 10색 palette 순서대로

#### Hue 의미 매핑 권장 (HR context)
| Hue | 권장 의미 |
|---|---|
| green | 긍정 (출석, 정상, 우수) |
| blue | 중립 default (정보) |
| yellow | 주의 (지각, 임박 만료) |
| red | 부정 (결근, 미달) |
| gray | 비활성/종료 |

semantic 토큰(success/error/warning/info)과 hue 일관성 유지 — `chart-color-green`은 `success`와 친화 hue.

#### Layout
- chart 영역 padding `lg` (16px), legend `xs` 간격 + `caption` 12/400
- 카드 안 chart: card padding `md` (12px)

#### Motion / A11y
- 진입 `motion-duration-slow`, hover `motion-duration-fast`
- 1.4.1 색상 단독 금지 — legend 라벨 + 패턴 (해당 시) 보강
- screen reader: `<table>` fallback 또는 svg `role="img"` + 데이터 요약

### Avatar (v58 추가)

HR(B2B) — 직원 카드, 조직도, 결재 큐 author, 평가 reviewer 등 모든 사용자 식별. 데이터 밀도 톤이라 sm/md 사이즈 위주.

#### HR 사용 패턴
- **데이터 그리드 inline**: `sm` 24px 사각형 (`radius-md`) — 정보 밀도 우선.
- **직원 list**: `md` 32px 원형 default.
- **직원 detail panel**: `lg` 40px or `xl` 56px 원형.
- **조직도 트리**: `sm` 24px 원형 + 이름 우측 `body-md` (15/400).

#### Color
- chart palette 10색 hash(이름) 분배 또는 부서별 매핑(예: 디자인본부 `chart-violet`, 운영본부 `chart-blue`) 컴포넌트 레벨 결정.
- HR primary `#357B5F`(forest green)와 chart-green `#2D8060` hue 비슷 — 부서/직원 색 분배 시 `chart-green` 회피 권장.

#### Status (선택, HR-specific)
재직(`success`) / 휴직(`warning`) / 퇴직(`error`) inline indicator. avatar 우하단 8×8 dot.

#### Sparse 매핑
DESIGN.md와 동일 (`avatar` chart-blue × text-on-accent, lint contrast 활성).

### Calendar (v61 추가)

HR(B2B) — 휴가 신청·결재 일정·근태 캘린더·평가 일정 등 핵심 일정 컴포넌트. 데이터 밀도 우선이라 lg 사이즈(40px) 기본, 정보 표기 풍부.

#### HR 사용 패턴
- **휴가 신청 range**: 시작일·종료일 2-step 선택 → range-start/mid/end 표시. 주말·공휴일 자동 disabled (휴가 일수 계산 제외).
- **결재 일정 marker**: 셀 우하단 4×4 dot (`primary` `#357B5F` 채움) — 해당일 결재 항목 존재 표시. 셀 클릭 시 결재 list dropdown.
- **근태 캘린더**: 출근(`success` 4×4 dot 좌하단), 지각(`warning`), 결근(`error`) — 일별 상태 표기.
- **평가 일정**: 평가 기간 range를 `primary-light` 배경으로 강조 (피선택 결과 아닌 정보 표시 — selected variant와 톤 분리 위해 stroke 1px outline 추가).

#### Layout 차이
- 데스크탑 우선: lg 사이즈 (40×40) default. 모바일은 md (36×36).
- 휴가/근태 화면은 풀 페이지 캘린더 — month/year navigation 헤더 좌우에 `오늘로 이동` 버튼 (`button-primary` sm).
- 결재 큐와 통합된 mini calendar: sm (32×32) inline + 우측 결재 list 패널 (sticky).

#### Color
- selected (single/range-start/range-end): `primary` `#357B5F` 채움 + `text-on-accent`.
- range-mid: `primary-light` `#6BAE8C` 배경 + `text-primary`.
- today indicator (선택 안 됐을 때): `border-focus` `#357B5F` 1px outline + `primary` 텍스트.

#### Touch target
데스크탑 우선이라 `touch-min` (44×44) 충족 위해 lg 사이즈(40×40)에 외곽 padding `xs` (4px) 보강. 모바일 화면 전환 시 md(36×36)에서 padding `sm` (8px) 적용.

#### Sparse 매핑
신규 yaml 컴포넌트 0. 기존 `button-primary`(selected cell), `alert-text-success/error/warning`(근태 dot color), `card-light`(셀 default ground)이 contrast 페어 활성.

### Textarea / Form layout (v62 추가)

HR(B2B) — 평가 코멘트, 휴가 사유, 결재 의견, 공지·정책 입력 등 multi-line 필드 빈번. 데이터 밀도 우선이라 horizontal layout 활용.

#### HR 사용 패턴
- **평가 코멘트**: textarea min 6 line + counter (`max 1000자`). 폼 우측 50% 폭 + 우측 평가 점수 panel.
- **휴가 사유**: textarea min 4 line + 결재라인 dropdown 동반. label 좌측 정렬(horizontal).
- **결재 의견**: 결재 row 내 inline textarea — surface-input 배경, 카드 안에서 자연스러운 elevation pair.
- **권한 설정 form**: horizontal layout (라벨 좌측 200px 고정 + control 우측). 다수 Switch/Checkbox 그룹화 — `<fieldset>`로 영역 구분.

#### Validation
- **on submit** 기본 — 결재·평가 form은 입력 흐름 방해 회피.
- 필수 필드 누락 시 form 상단 error summary + 첫 필드 focus.
- 결재 라인 누락 같은 도메인 validation은 backend round-trip 후 toast(error) + 인라인 필드 강조.

#### 데스크탑 모드
horizontal layout 활용 — `breakpoint-md` (768px) 이상에서 라벨 좌측 25-30% 고정. 모바일은 stacked 자동 전환.

### Form validation (v75 추가)

DESIGN.md baseline 정의 참고 — 8 rule + 5 field state + form state machine + ARIA live + async + multi-field. HR(B2B) 격식체 톤 적용.

#### HR 우선 patterns
- **사번/이메일 unique check (async)** — 직원 등록 시 사번 중복 검증. 입력 후 500ms debounce → server check, "이미 등록된 사번입니다" 즉시 표시.
- **비밀번호 강도 (on change)** — 관리자 계정 생성 시 8자+숫자+특수문자, 강도 bar 실시간 표시(약/보통/강).
- **휴가 일수 validation (multi-field)** — 시작일/종료일 + 잔여 연차 ≥ 신청 일수 동시 검증. 조건 미달 시 종료일 input의 error.
- **결재라인 conditional required** — 결재 종류 "임원 결재" 선택 시 임원 추가 필수. dropdown 변경 시 동적 `aria-required` 토글.
- **권한 mutually exclusive** — "관리자" + "외부 협력자" 동시 선택 불가, form-level error.
- **format pattern** — 사번(`HR-2026-0001`), 전화번호(`010-1234-5678`), 사업자번호(`123-45-67890`) 정규식.

#### HR error message 격식 톤 (예시)
- "사번을 입력해주세요" (required)
- "올바른 사번 형식이 아닙니다 (예: HR-2026-0001)" (pattern)
- "이미 등록된 사번입니다. 다른 사번을 사용해주세요" (async)
- "비밀번호가 일치하지 않습니다" (match)
- "잔여 연차(3일)를 초과할 수 없습니다" (custom — 잔여 일수 노출)
- "권한 그룹은 하나만 선택 가능합니다" (mutually exclusive)

#### HR 위계 (긴 form 위주)
- 결재 form / 직원 등록 / 평가 입력 — 10+ 필드 → submit 시 첫 invalid 필드 focus + 상단 summary banner 동시.
- 짧은 form (휴가 신청 3-4 필드) — field-level error만으로 충분, banner 생략.

#### HR async validation 빈도
- 사번/이메일 unique check (async) — 직원 등록만 사용. 자주 쓰는 form엔 server load 부담.
- 결재 form — async validation 없음 (submit 시 backend round-trip).

### Skeleton / Loading (v63 추가)

HR(B2B) — 데이터 그리드·결재 큐·직원 list 로딩 상태. 데이터 밀도 우선이라 list-row variant 위주, dense layout 유지.

#### HR 사용 패턴
- **결재 큐 로딩**: list-row 5-7개 (avatar 32 + 이름 lg + 상태 badge 위치 + 시간 caption). 실제 row와 정확히 동일 height(60px).
- **직원 검색 결과**: list-row 10개 (그리드 형태) — sm avatar 24 + 이름 + 부서 + 직급. shimmer는 한 그룹씩 동시 (페이지 단위).
- **결재 detail 로딩**: rect (heading 30px) + text 4-line + rect (button area 40px). detail panel 전체 placeholder.
- **dashboard 위젯 로딩**: rect (각 위젯) — KPI 카드 4개, 표 1개. 위젯 단위로 loading (전체 페이지 spinner 비권장).

#### 정보 밀도
- list-row 사이 gap: `xs` (4px) — 일반 list보다 dense.
- shimmer 1주기는 `motion-duration-loop` (1500ms) 표준 — 너무 빠르면 산만, 너무 느리면 응답 없음 인상.
- 5초 이상 로딩 시 위젯 우상단에 `text-tertiary` "오래 걸리는군요... 새로고침" link 표시.

#### Reduced motion
사용자 시스템 설정 존중 — `prefers-reduced-motion: reduce` 시 shimmer 정지, `surface-input` 단색 + 작은 spinner 1개로 fallback.

### Pagination / Drawer / Spinner / Stepper (v67 추가 batch)

HR(B2B) 4 컴포넌트 사용 패턴 — DESIGN.md 공통 spec 외 brand-specific 안내.

#### Pagination — HR
- **데이터 그리드 footer**: numbered variant (1 2 3 ... 10) — 결재 list, 직원 검색, 평가 history 등 양 예측 가능 도메인.
- **load-more 회피**: 결재·근태 데이터는 "전체 개수" 인지가 중요 (decision-making) → numbered 우선.
- size: lg 48 데스크탑 (mouse hit 정밀), sm 32 inline (테이블 row 안 mini paging은 비권장 — 페이지 단위로).

#### Drawer — HR
- **side drawer** (right): 직원 클릭 시 우측 슬라이드 detail panel. 너비 480px (`min(80vw, 480px)`).
- **결재 의견 drawer**: footer에 primary("승인") + secondary("반려") + tertiary("보류") 3 액션.
- **권한 설정 drawer**: form layout horizontal, 좌측 라벨 + 우측 control. 닫기 시 unsaved changes 확인.
- focus trap + Esc dismiss + return focus 모두 필수.

#### Spinner / Progress — HR
- **결재 처리 중 inline spinner**: 승인 클릭 시 button 안 sm 16 spinner + "처리 중..." 라벨 (text-on-accent 위 white spinner).
- **데이터 동기 progress**: dashboard 상단 indeterminate progress bar (linear, 4px, primary). 동기 완료 시 success 색 1초 → fade out.
- **bulk operation determinate progress**: 100건 일괄 승인 등 — percentage 표시 ("47 / 100").

#### Stepper — HR
- **결재 단계 horizontal**: 신청 → 1차 결재 → 2차 결재 → 완료. sequential, 이전 단계 비완료 시 진입 차단.
- **휴가 신청 form 3 step**: 1) 사유·기간 → 2) 결재라인 → 3) 첨부 검토. desktop horizontal, 모바일 자동 vertical 전환.
- **평가 작성 stepper**: 5단계 — 자기평가 → 동료평가(3) → 관리자평가. step 사이 connector progress 채우기 visual.

### Navigation batch (v68 추가)

HR(B2B) 5 navigation 컴포넌트 — DESIGN.md 공통 spec 외 brand-specific 안내. 데이터 그리드 + 다단계 페이지 위계 깊은 application 톤.

#### Breadcrumb — HR
- 결재 큐 → 결재 항목 detail → 첨부 view 같은 4-5 depth 일반. truncation 빈번 — `Home / ... / 결재 큐 / 김지원 휴가 신청`.
- font-size lg `body-sm` (14/400) — 데이터 밀도 톤이지만 경로 인지는 우선.

#### Sidebar — HR
- **fixed** 좌측 280px 데스크탑 default. collapsible 옵션(접힘 64px icon만).
- nav 그룹: 결재 / 평가 / 직원 / 권한 / 설정 (5 그룹) — group title `caption` 12/600 uppercase.
- footer: 사용자 profile + 로그아웃.
- HR primary `#357B5F` 4px 좌측 stroke + `surface-input` 배경 active state.

#### Navigation Menu — HR
- mega menu 비활성 — application 톤이라 단순 single-level. 결재 / 평가 / 직원 / 분석 / 설정 5 link.
- 데이터 그리드 페이지 위주라 hover preview 같은 광고성 mega 패턴 부적절.

#### Menubar — HR
- 데스크탑 application 메타포 강조 — File / Edit / View / Tools / Help.
- HR-specific: **결재 메뉴** (Alt+A — Approve), **평가 메뉴** (Alt+E — Evaluate), **내보내기** (Cmd+E — Export to PDF/Excel).
- keyboard shortcut 적극 — power user (관리자, 본부장 등) 빠른 처리.

#### Command (Cmd+K) — HR
- 결재 빠른 처리: "김지원 휴가 승인" / "5월 평가 시작" 자연어 명령.
- Sections: Recent approvals / Employees (search) / Reports (분석 페이지) / Help.
- 직원 검색이 핵심 — typing으로 사번/이름 instant filter.

### Input batch (v69 추가)

HR(B2B) 5 input 컴포넌트 — 데이터 그리드 + form 입력 위주.

#### Combobox — HR
- **직원 검색**: 사번 또는 이름 typing → autocomplete dropdown. 결재라인 지정, 평가 대상 선택 등.
- **부서 선택**: tree 구조 부서 list — combobox + indent. typing으로 fuzzy match.
- multi-select: 결재 참조자 다중 추가 (chip list).

#### Slider — HR
- **평가 점수**: 1-5 또는 1-10 single slider. tick 표시 + 정수 step.
- **연차 사용 시뮬레이터**: range slider — 시작일/종료일 day 단위.
- 데스크탑 위주, 정밀 hit (`touch-nav-h` 32 thumb).

#### Toggle — HR
- **데이터 그리드 view 토글**: 카드 view ↔ 테이블 view 1 toggle.
- **결재 상태 필터**: 대기/처리중/완료 toggle group (multiple).

#### Toggle Group — HR
- **결재 상태 필터** (multiple): "대기" + "처리중" 동시 표시 가능.
- **정렬 옵션** (single): 이름순/날짜순/우선순위순 — radiogroup.

#### Input OTP — HR
- **2차 인증** (관리자 권한 변경 시): 6자리, SMS 자동 채우기.
- **결재 승인 확인** (고액 결재): 4자리 PIN 입력으로 추가 보안.

### Disclosure batch (v70 추가)

HR(B2B) 5 disclosure/overlay 컴포넌트.

#### Accordion — HR
- **결재 detail 그룹**: 신청 정보 / 첨부 / 결재 history 3 섹션 — single mode (한 번에 하나만 펼침).
- **권한 설정 그룹**: 일반 / 결재 / 평가 / 보고서 권한 — multiple mode (여러 영역 동시 검토).
- **평가 항목 list**: 자기평가 5 카테고리 — 항목별 펼침으로 입력.

#### Collapsible — HR
- **결재 첨부 expansion**: "첨부 파일 3개" 트리거 → expand로 file list.
- **권한 detail "더 보기"**: 기본 정보 + collapse된 추가 권한.

#### Hover Card — HR
- **직원 mini profile**: 직원 이름 hover → avatar + 부서 + 직급 + 이메일 + 결재라인 가능 여부 + "쪽지" 버튼.
- **결재 라인 hover**: 결재자 이름 hover → 본인 외 결재 가능자 list.

#### Context Menu — HR
- **결재 row right-click**: 승인 / 반려 / 보류 / 위임 / 삭제 (destructive 우측 분리).
- **직원 grid right-click**: 메시지 / 결재 위임 / 권한 변경 / 정보 export.
- 데이터 그리드 power user (관리자) 빠른 action.

#### Alert Dialog — HR
- **결재 반려**: "정말 반려하시겠어요? 신청자에게 알림이 가요." + 사유 입력 textarea.
- **권한 회수**: "이 직원의 모든 권한을 회수합니다. 복구는 관리자 승인 필요." (destructive 강조).
- **평가 삭제**: 작성 중 평가 삭제 confirm — 영구 삭제 명시.

### Data batch (v71 추가)

HR(B2B) 5 data display 컴포넌트 — 데이터 그리드 핵심 application 톤.

#### Table — HR
- **결재 list compact variant**: 행 padding `xs` (4px) — 한 화면에 더 많은 결재.
- **직원 list striped variant**: 짝수 row tinted — 긴 list 가독성.
- **평가 history default**: 일반 가독성, 표 안 status badge.

#### Data Table — HR
- **결재 큐**: sortable(date/요청자/금액) + filterable(상태/부서) + selectable(일괄 처리) + bulk actions(승인/반려/내보내기) + 50 per page numbered pagination.
- **직원 검색**: 13 column 표시 (사번/이름/부서/직급/이메일/입사/근속/...). column visibility toggle, column resize, export Excel.
- **평가 history**: 분기별 column, 검색·정렬·내보내기 모두 지원.
- toolbar 좌측 search, 가운데 active filter chips, 우측 column toggle + Export.

#### Carousel — HR
- 거의 사용 안 함 — application 톤이라 광고 carousel 부적합.
- 예외: dashboard 위젯 carousel (mobile에서 4 위젯 swipe).

#### Scroll Area — HR
- **데이터 그리드 sticky thead** + 본문 scroll: 표 머리 고정 + body-lg 영역 scrollable.
- **결재 detail 긴 panel**: 첨부 history 100+ — scroll area 안에서 native scroll 보존.
- always-visible scrollbar — 데스크탑 application 톤.

#### Resizable — HR
- **3-pane layout**: 좌측 sidebar(고정) + 가운데 결재 list + 우측 detail panel — 가운데↔우측 resizable.
- **dashboard split**: 위 KPI / 아래 차트 panel — vertical resize.
- localStorage persistence — power user 자기 layout 기억.

### Extras batch (v72 추가)

HR(B2B) 5 추가 컴포넌트.

#### Sonner — HR
- **top-right position** 데스크탑 default — 결재 알림 빈도 높음, 시야 상단 명확.
- 결재 승인/반려 결과 stack — 일괄 처리 시 동시 5+ toast 가능.
- "실행 취소" action: 잘못 승인한 결재 5초 안에 revert 가능.
- 5초(success) / 10초(error) auto-dismiss — error는 사용자 인지 시간 ↑.

#### Aspect Ratio — HR
- **16:9** 직원 프로필 cover image
- **3:1** 부서 banner
- **4:3** 결재 첨부 이미지 preview (legacy 비율)
- 사용 빈도 낮음 — application 톤이라 image-heavy 부적합.

#### Chart — HR
- **bar / stacked bar**: 부서별 직원 수, 월별 결재 수, 평가 점수 분포
- **line**: KPI 추이 (월별 출근율, 분기별 응답시간)
- **pie / donut**: 결재 처리 시간 분포 (1시간 이내 / 하루 / 일주일 등)
- chart palette HR primary와 충돌 회피 — chart-green 비활성, chart-blue 우선
- legend interactive 적극 — 시리즈 토글로 데이터 비교

#### Date Range Picker — HR
- **dual picker** 데스크탑 default — 다른 달 동시 보기.
- 휴가 기간 선택 (5/12 ~ 5/14) — preset "이번 주" / "다음 주" / "이번 달" 빈번.
- 결재 history 검색 — preset "지난 30일" / "이번 분기" / "이번 년도".
- 평가 기간: "Q1" (1/1-3/31) / "Q2" / "Q3" / "Q4" preset.

#### Time Picker — HR
- **dropdown picker** 데스크탑 — 결재 일정, 회의 예약 등.
- step **5분** default — 결재 일정 5분 단위 권장.
- 24h format default — 비즈니스 톤.
- 마감 시각 입력: "오늘 18:00" / "내일 09:00" preset 단축키.

### Extras-2 batch (v73 추가)

HR(B2B) 5 추가 shadcn 누락 컴포넌트.

#### Banner — HR
- **약관 변경 예정** warning variant — "2026-06-01부터 개인정보 처리방침이 변경됩니다" stripe 영구 노출.
- **시스템 점검 공지** info variant — 결재 시스템 새벽 점검 사전 안내, dismiss 가능.
- 페이지 최상단 (header 아래) 고정 위치 — 스크롤 시 따라가지 않음.
- error variant — 결재 시스템 일시 장애, 휴가 신청 불가 등 critical 알림.
- 본인이 직접 dismiss 전엔 유지 — 새로고침 후에도 표시 (localStorage `dismissed-banner-{id}`).

#### Tag / Chip — HR
- **결재라인 chip** — 결재자 추가 시 "[홍길동 ×]" multi-chip 표시, X 클릭으로 제거.
- **권한 그룹 chip** — 직원 권한 편집 시 "관리자 / HR-only / 일반" multi-select chip.
- **부서 / 직급 multi-filter** — 직원 검색 결과 좁히는 chip group.
- closeable variant 우선 — 결재라인 / 권한 변경 가능성 높음.
- input variant 함께 쓸 때 enter로 chip 추가 — 이메일 초대 multi-input과 같은 패턴.

#### Popover — HR
- **결재 의견 입력** — 승인/반려 옆 작은 댓글 아이콘 클릭으로 popover 열림. textarea + 첨부 + 확인 button.
- **직원 빠른 정보** — 직원명 옆 (i) 아이콘 클릭으로 부서/직급/연락처 mini card.
- **휴가 잔여 정보** — 휴가 신청 form에서 "남은 연차?" 클릭, 잔여일수 + 사용 history 4-5건.
- **bottom-start placement** default — form context에서 아래로 펼치는 게 자연스러움.
- click trigger default — hover는 결재 같은 critical action에 부적합.

#### File Upload — HR
- **평가 첨부** — 인사평가 단일 PDF 업로드 (max 10MB), 1년 유지.
- **결재 첨부 이미지/문서** — multi 가능 (max 5개 / total 50MB), 영수증·계약서 등.
- **드래그-드롭** + click-to-browse 동시 지원, 파일 list with 진행률 bar.
- 허용 type: PDF / DOC(X) / 이미지(JPG/PNG) — exe/script 차단.
- 업로드 실패 시 error variant + 재시도 button — 결재 큐에서 빠지지 않도록.

#### Treeview — HR
- **조직도 탐색** — 회사 → 본부 → 팀 → 직원 4단계 nested tree.
- 직원명 노드 selected 시 우측 panel에 상세 표시 (master-detail).
- expand/collapse: 본부/팀 레벨 자식 ≥ 1 — 직원은 leaf node.
- 검색 input 동기화 — 필터링 시 매칭 노드까지 자동 expand + highlight.
- **권한 트리 편집** — admin이 부서별 권한 그룹 토글, checkbox 통합 variant.
