---
version: alpha
name: Porest
description: |
  People + Forest. Dual-brand design system for Porest HR (B2B) 
  and Porest Desk (B2C). Optimized for Korean-first audiences,
  all-ages accessibility.

colors:
  # @sync:brand-start (colors-1)
  # === Brand (Desk primary, single-brand 명명 — DESIGN.desk.md context) ===
  primary: "#0147AD"
  primary-light: "#5FA0E5"
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
  # === Brand - Focus ring (Desk primary 시맨틱 alias) ===
  border-focus: "#0147AD"
  border-focus-light: "#5FA0E5"
  # @sync:brand-end (colors-2)
  
  # @sync:shared-start (colors-2)
  # === Semantic - Status (functional palette, base + light 페어, 듀얼 브랜드 공유) ===
  success: "#16803F"
  success-light: "#4ADE80"
  error: "#DC2626"
  error-light: "#F87171"
  warning: "#C84D0E"
  warning-light: "#FB923C"
  info: "#1D6FCB"
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
  
  # (border-focus 정의 완료 — v16)

typography:
  caption:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  body-strong:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.6
  heading-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
  heading-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  heading-lg:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
  heading-xl:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  # (v26: heading-sm/xl 추가. v55: display 4종 추가 — Airbnb reference, 영문 marketing/hero 톤)
  rating-display:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1px
  display-xl:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.43
  display-lg:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: -0.44px
  display-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.43
  # (v56: Airbnb reference batch 2 — title/body/caption-md, 영문 본문/캡션 영역)
  title-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
  title-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.25
  body-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  caption-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.29
  # (v57: Airbnb reference batch 3 — caption-sm/badge/uppercase-tag + button-md/nav-link)
  caption-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.23
  badge:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.18
  uppercase-tag:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 8px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0.32px
  button-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.25
  nav-link:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25

rounded:
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 20px
  full: 9999px
  # (v28: xs(2px)·2xl(20px) 추가. xs는 미세 라운드(tag/chip/tooltip), 2xl은 large modal·hero card)

spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  # (v27: 2xl/3xl 추가 완료. 4px 베이스 그리드 유지(8/12/16/24/32/48))

components:
  # === Primary 버튼 (Desk primary 채움 + 흰 텍스트) ===
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-accent}"
  
  # === Outlined 버튼 (어두운 표면 위 primary-light 텍스트) ===
  button-outlined-on-dark:
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
---

## Overview — Porest Desk (B2C)

본 파일은 **Porest Desk(B2C 개인 메모/할일/가계부)** 단독 self-contained 디자인 시스템(v17~). 공유 baseline은 `DESIGN.md` 참조. 본 파일에서 토큰명의 `-desk` 접미사는 컨텍스트가 Desk로 암묵적이라 생략 — `primary` = `#0147AD` (deep navy), `button-primary` 등.

HR(B2B 조직 관리)은 별도 `DESIGN.hr.md` 파일 — `primary` = `#357B5F` (forest green).

레퍼런스 — 토스의 신뢰감 있는 미니멀리즘, 전 연령 가독성.

## Colors

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
  - (당시 HR primary 검증은 `DESIGN.hr.md` 참조 — 본 파일은 Desk 단독)
  - `primary` on `surface-default` **5.02:1** / on `surface-input` **4.48:1** — UI 3:1 ✅, 본문은 4.5에 0.02 못 미침. accent는 본문 텍스트 색상으로 사용 금지(버튼 fill·아이콘·강조 텍스트 한정)로 운용.
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
| text-on-accent | primary | 5.02 | AA |

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
3. `border-focus`는 이번 배치에서 보류 — Desk primary가 `surface-default-dark`에서 3:1 미달(2.85:1)이므로 `accent-*-light` 변형이 정의된 후 추가하는 편이 안전. 그 전까지 포커스 링은 `border-strong`을 임시 활용 가능. (v7~v16에서 단계적 해소, 본 파일에서 `border-focus` 토큰 정의 완료.)

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
| `primary-light` | `#5FA0E5` | Desk — 어두운 표면(다크 모드 + 라이트 모드 검정 배너 등) 위 텍스트·아이콘·outlined 버튼·focus 링 |

#### 추가 이유
1. v3에서 `border-focus`가 보류된 직접 원인 해소 — Desk primary 2.85:1로 `surface-default-dark` 대비 3:1 미달. 다크 lightness 변형으로 4.5:1 이상 확보.
2. **5개 한도 중 2개만 추가** — CLAUDE.md "사용자가 명시적으로 요청하지 않은 토큰 추가 금지" 준수. 별도 `border-focus` 토큰은 컴포넌트 레벨 표면 컨텍스트 분기(밝은 표면=`accent-{brand}`, 어두운 표면=`accent-{brand}-light`)로 해결 가능하므로 미추가.
3. 동일 brand family 내 lightness만 조정 — HR 녹색, Desk 청색의 시각 식별성 유지.

#### WCAG 검증 (사전 계산)

본문 4.5:1 — 모든 다크 표면 통과:

| 텍스트 | 다크 표면 | 대비 | 결과 |
|---|---|---|---|
| primary-light `#5FA0E5` (L=0.329) | surface-default-dark | 5.41 | ✅ AAA |
| primary-light | bg-page-dark | 6.11 | ✅ AAA |
| primary-light | surface-input-dark | 4.51 | ✅ AA (마진 0.01 — v64 톤 다운 후 minimum) |

#### 채움 fill 비호환 — 사용 경계 명시

`accent-*-light` 위에 `text-on-accent` (`#FFFFFF`) 사용 시 본문 대비:
- on `primary-light`: **2.49:1** ❌

따라서 **다크 모드 채움 버튼 fill은 `primary`(원래 값)를 유지**합니다. 흰 텍스트 5.02:1로 본문 통과. 단, 이 경우 버튼 외곽 vs 다크 표면 대비는 2.85:1로 3:1 미달 — Toss·Material 패턴처럼 **inset shadow 또는 명시적 1px 외곽선**(예: `border-strong-dark`)으로 컴포넌트 식별 보강 필요(컴포넌트 스펙에서 처리).

요약하면:
- **다크 채움 버튼**: bg = `primary`, text = `text-on-accent`(`#FFFFFF`), 외곽선 = `border-strong-dark` 보강
- **어두운 표면 비채움 사용**(outlined 버튼 텍스트·링크·아이콘·focus, 라이트/다크 모드 무관): `primary-light`

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

### Semantic colors (v10 추가)

상태 전달을 위한 functional palette — 브랜드 정체성과 분리된 4개 status. HR/Desk 양 브랜드 공유, 라이트 표면 base만 이번 배치에서 확정.

| 토큰 | hex | 시맨틱 |
|---|---|---|
| `success` | v10 `#117A3A` → v51 **`#16803F`** | 완료·확인·긍정 (Tailwind green-700 톤) |
| `error` | v10 `#C53030` → v51 **`#DC2626`** | 오류·파괴적 액션·필수 입력 누락 (Tailwind red-600) |
| `warning` | v10 `#A85800` → v51 `#C2410C` → v52 **`#C84D0E`** | 경고·주의·임박 만료 (orange — v52 미세 brighten) |
| `info` | v10 `#006395` → v51 **`#1D6FCB`** | 안내·도움말·진행 중 (sky blue, Tailwind sky-600) |

> **현재 사용 hex는 v51-v52 갱신 후** (DESIGN.md `### Semantic refresh` 섹션 참조). v10 시점 hex는 변천 history.

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

#### v20 추가 — semantic 다크 변형 4개

다크 표면 위 alert·toast·인라인 semantic 텍스트용 lightness 변형. base는 라이트 표면 전용(흰 텍스트 fill 4.5:1↑), light는 다크 표면 위 텍스트 4.5:1↑.

| 토큰 | hex | L | 다크 표면 contrast (lint 실측) |
|---|---|---|---|
| `success-light` | v20 `#5DC07B` → v53 **`#4ADE80`** | Tailwind green-400, surface-default-dark ≥4.5:1 ✅ |
| `error-light` | v20 `#F08080` → v53 **`#F87171`** | Tailwind red-400, surface-default-dark ≥4.5:1 ✅ |
| `warning-light` | v20 `#E8A05A` → v53 **`#FB923C`** | Tailwind orange-400 (가장 큰 hue 변화, base와 일치), surface-default-dark ≥4.5:1 ✅ |
| `info-light` | v20 `#6FAEDF` → v53 **`#60A5FA`** | Tailwind blue-400, surface-default-dark ≥4.5:1 ✅ |

> **현재 사용 hex는 v53 갱신 후** (DESIGN.md `### Semantic light refresh` 섹션 참조). v20 시점 hex는 변천 history.

4개 컴포넌트(`alert-text-{semantic}-on-dark`)에서 lint contrast 룰로 검증 — 모두 ≥4.5:1 통과.

**채움 fill 비호환** (의도): white(`text-on-accent`)을 light 변형 위에 올리면 L 0.35~0.43이라 contrast 2.2~2.7로 미달. 다크 모드 채움 badge는 base 색 유지 + 외곽선 보강 또는 별도 패턴(향후 v21+에서 검토).

#### HR / Desk 듀얼 브랜드
- 8개 토큰 모두 양 브랜드 동일 사용 — functional state 전달은 브랜드 분기 비대상.
- 시각 차별화: `success`(forest)는 HR primary(emerald 계열)와 미세 hue 분리, `info`(deep navy)는 Desk `primary`(vibrant blue 계열)와 채도 분리. 단 단독 노출 시 식별성을 위해 컴포넌트 레벨에서 아이콘(✓/✕/!/i) 동반을 권장.
- 컴포넌트는 brand 컨텍스트(HR vs Desk) × 모드 컨텍스트(light vs dark) 매트릭스로 4값 분기 — 토큰 자체에 분기 표현됨.

### Brand refresh + Desk neutral fork (v14 추가)

브랜드 리프레시: HR/Desk **primary** 색을 더 깊고 차분한 톤으로 갱신, neutral page background를 브랜드별로 분리. 이전 `accent-*` 시리즈는 모두 `primary-*`로 rename 됨(spec 권장 명명 정합).

#### 토큰 변경 매트릭스

| 작업 | 이전 | 이후 | 비고 |
|---|---|---|---|
| rename + value | `accent-desk` `#1B6ADB` | `primary` `#0147AD` | Desk 브랜드 — deep blue |
| rename + value | `accent-light` `#6DA8F2` | `primary-light` `#6BA0EE` | 새 base에 맞춰 lighten 도출 (v14) |
| value (v64) | `primary-light` `#6BA0EE` | `primary-light` `#5FA0E5` | 다크 모드에서 톤 다운 (4.51:1 마지널, 사용자 시각 피드백) |
| split | `bg-page` `#F5F6FA` | `bg-page-hr` `#ECE8E5` + `bg-page-desk` `#DCDCDC` | 브랜드별 fork (HR=warm beige, Desk=light gray) |
| 유지 | `bg-page-dark` `#1A1F2E` | (변경 없음) | 다크 페어 미언급 → 공유 |

#### 변경 이유
1. **브랜드 톤 갱신**: 새 primary 색이 Porest = People + Forest 감각에 더 가깝게 정착(HR forest green, Desk deep navy).
2. **Desk neutral 분리**: B2B(HR)와 B2C(Desk)는 동일 페이지 베이스를 공유할 필요가 없음 — HR은 따뜻한 베이지, Desk는 차분한 light gray로 첫인상 차별화.
3. **명명 정합**: design.md spec은 `primary` 명명을 권장 — 기존 `accent-*` 명칭에서 `primary-*`로 정렬, 추후 spec 도구 호환성 확보.

#### lint 실측 결과 (변경 영향 6개 페어 모두 통과)

| component | bg | text | 결과 |
|---|---|---|---|
| `button-primary` | primary `#0147AD` | text-on-accent | ✅ ≥4.5:1 |
| `button-outlined-on-dark` | surface-default-dark | primary-light `#5FA0E5` | ✅ ≥4.5:1 |
| `page-text-hr-light` | bg-page-hr `#ECE8E5` | text-primary | ✅ ≥4.5:1 |
| `page-text-light` | bg-page-desk `#DCDCDC` | text-primary | ✅ ≥4.5:1 |

(`npm run lint` 출력 기준: 0 errors, 0 contrast warnings.)

#### Edge case — 운영 가이드

자동 검증 미모델 페어에서 1건 contrast 미달 발견:

(HR primary 관련 edge case는 `DESIGN.hr.md` 참조 — 본 파일은 Desk 단독)
- **`primary` as inline on `bg-page-desk`**: 손계산 **6.13:1** ✅ — Desk primary는 inline 사용 가능.
- **`text-tertiary` on `bg-page-desk`**: 손계산 **4.01:1** ❌ — 현재 modeled 컴포넌트에 없는 페어이나, 페이지 베이스 위 직접 caption 노출 시 미달. caption은 항상 `surface-default`(흰 카드) 위에 사용 권장.

#### 다크 모드 검증 (회귀 0건)

본 변경은 라이트 모드 토큰만 수정:
- 다크 페어 토큰(`bg-page-dark`, `surface-default-dark`, `text-primary-dark` 등) 그대로 유지.
- Desk 다크 채움 버튼: 새 `primary` `#0147AD` (L=0.075) on white text **8.40:1** ✅. 단 외곽 vs 다크 surface는 ~2.5:1로 3:1 미달 — `border-strong-dark` 보강 패턴 그대로 유효.
- HR/Desk outlined 다크: 새 `primary-*-light` 모든 다크 표면에서 4.62~6.23:1 통과.

#### 이전 prose 항목과의 정합

- v1 prose의 "bg-page #F5F6FA" 표기는 v14 이전 단일 token 시점 기록 — 현재는 `bg-page-hr`/`bg-page-desk`로 fork됨.
- v3 prose의 "primary 2.85" 다크 surface 대비 수치는 v7 시점 `accent-desk` `#1B6ADB` 기준 — 새 `primary` `#0147AD`는 더 어두워 contrast 다른 양상이나 결론(3:1 미달, light 변형 필요)은 동일.
- 이전 prose는 **역사적 기록**으로 보존 — v14 시점 현행 값은 본 섹션 표 기준.

### bg-page 재통합 (v15)

v14에서 fork했던 `bg-page-hr`/`bg-page-desk`를 단일 `bg-page #F5F6FA`로 되돌립니다. HR/Desk가 동일한 페이지 베이스를 공유 — neutral 시스템 단순화.

#### 변경 매트릭스

| 작업 | 이전(v14) | 이후(v15) |
|---|---|---|
| **제거** | `bg-page-hr` `#ECE8E5` | — |
| **제거** | `bg-page-desk` `#DCDCDC` | — |
| **추가** | — | `bg-page` `#F5F6FA` (v13 이전 값으로 복귀) |
| **컴포넌트 통합** | `page-text-hr-light` + `page-text-light` | `page-text-light` (단일) |
| **유지** | `bg-page-dark` `#1A1F2E` | (그대로) |

`primary` 등 v14 브랜드 리프레시는 그대로 유지 — 본 변경은 neutral fork만 되돌림.

#### v14 edge case 해소

`bg-page #F5F6FA` (L=0.9223)는 v14 fork(L=0.812/0.716)보다 더 밝아 contrast headroom 증가:

| 페어 | v14 (fork) | v15 (unified) | 상태 |
|---|---|---|---|
| `primary` inline on bg-page | 6.13 ✅ | **7.78** ✅ | 더 안전 |
| `text-tertiary` on bg-page | 5.09 ✅ (HR) / 4.01 ❌ (Desk) | **5.09** ✅ | Desk 미달 해소 |

v14 fork 시 HR primary inline 미달 edge case는 v15 단일 `bg-page` 통합으로 해소 (HR 파일 v15 prose 참조). Desk primary는 v14에서도 inline 통과했고, v15에서 더 안전(`#0147AD` on `#F5F6FA` = **7.78:1**).

#### 변경 이유
1. **운영 규칙 단순화**: v14 fork는 브랜드별 페이지 톤 차별화를 의도했으나, edge case(HR primary inline 미달)가 운영 부담으로 작용. 단일 bg-page는 이 부담 제거.
2. **HR/Desk neutral 일관성**: 페이지 베이스가 동일하면 컴포넌트 동작도 동일 — 다운스트림 코드의 분기 로직 감소.
3. **브랜드 차별화는 primary로 충분**: HR primary(forest green, `DESIGN.hr.md`) vs Desk `primary` `#0147AD`(deep navy)의 채도·hue 차이가 이미 강력한 식별 신호 제공. 페이지 베이스까지 분기할 동기 약화.

#### lint 실측
- ✅ 0 errors / 0 contrast warnings
- 27 colors (v14 28에서 -1: bg-page-hr/desk 2개 제거, bg-page 1개 추가)
- 30 components (v14 31에서 -1: page-text-hr/desk-light 2개 통합)
- regression: false

#### v14 prose 정합 노트
- HR primary 관련 v14 운영 규칙은 `DESIGN.hr.md` 참조. Desk primary는 v14·v15 모두 inline 통과.
- "Desk neutral fork" 동기 부분도 보류 — 차별화는 primary 색에 위임.

### Border focus (v16 추가)

키보드 포커스 링·인터랙션 강조 외곽선용 4개 토큰. **primary-* / primary-*-light 값을 그대로 mirror하는 시맨틱 alias** — focus 역할을 명시 토큰화하여 컴포넌트 spec 작성 시 의도 명확화 + 향후 분기 여지 확보.

| 토큰 | hex (mirror) | 용도 |
|---|---|---|
| `border-focus` | `#0147AD` (= primary) | Desk 라이트 표면 위 focus ring |
| `border-focus-light` | `#5FA0E5` (= primary-light) | Desk 다크 표면 위 focus ring |

#### 추가 이유
1. **v3 차단 사유 해소 완료**: v3 시점 "primary가 다크 surface 3:1 미달"로 보류했던 focus 토큰 — v7에서 `primary-*-light` 도입, v14 명명 정렬, v15 운영 규칙 단순화로 차단 모두 해소.
2. **시맨틱 alias 패턴**: 값은 primary와 동일하지만 `border-focus-*` 명명으로 focus 역할 명시. 컴포넌트 spec(추후 Button·Input 등)에서 `focus-ring color = border-focus-{brand}` 형태로 의도 표현. primary가 변경되어도 focus 의미가 따라가야 한다면 mirror 유지 필요(현재는 수동 동기화).
3. **WCAG 2.4.11 (Focus Appearance, AA in WCAG 2.2)**: focus indicator가 인접 표면에 ≥3:1 contrast 요구 — 4개 토큰 모두 4.5+:1 통과 (UI 3:1 기준 대비 여유).

#### WCAG 검증 — focus ring vs 인접 surface (손계산, lint 미모델)

`backgroundColor`만 가진 sparse component(`focus-ring-*-on-*`)로 referenced — contrastCheck 미발동(textColor 부재). focus ring vs 인접 surface 대비는 spec에 borderColor 프로퍼티 없어 자동 검증 불가, 손계산 의존.

| focus ring | 인접 surface | 대비 (손계산) | 결과 |
|---|---|---|---|
| `border-focus` `#0147AD` | surface-default | 8.40 | ✅ |
| `border-focus` | surface-input | 7.50 | ✅ |
| `border-focus` | bg-page | 7.78 | ✅ |
| `border-focus-light` `#5FA0E5` | surface-default-dark | 5.41 | ✅ |
| `border-focus-light` | surface-input-dark | 4.51 | ✅ (v64 마지널) |
| `border-focus-light` | bg-page-dark | 6.11 | ✅ |

값이 primary-* mirror이므로 `button-primary-*` / `button-outlined-*` 컴포넌트가 lint contrast 룰로 이미 4.5:1 검증 — focus 토큰의 contrast 안정성도 간접 보장.

#### sparse component 패턴 정당성
`focus-ring-*-on-*` 컴포넌트 4개는 textColor 없는 sparse 모델 (v13 text-disabled에서 정착). focus ring은 1px outline의 시각 요소로 textColor 페어가 자연스럽지 않음. orphan 회피 + spec 한계(no borderColor) 우회 두 목적 충족. v9 divider/outline-strong과 동일 패턴.

#### HR / Desk 듀얼 브랜드
- 각 브랜드별 dedicated focus 색 — HR forest green, Desk deep navy. 사용자 인지(어느 제품에 있는지) 즉시 전달.
- 컴포넌트 spec에서 brand context에 따라 `border-focus-{brand}`/`-light` 분기 적용. 토큰 자체에 분기 표현 완료.

## Typography

한국어 본문 가독성 우선. Pretendard를 기본 패밀리로, 영문 fallback Inter.

### v5 추가 — 5단계 타입 스케일

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

### v4 추가 — 4px 베이스 5단계

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
- **WCAG 2.5.5 (Target Size, AAA 권장 44×44px)**: 버튼 패턴 점검 — `body` line-height = 15px × 1.6 = **24px**. `md(12px)` padding-y 적용 시 12+24+12 = **48px** ✅ (44px 통과). `sm(8px)` padding-y는 8+24+8 = 40px로 44px 미달 → 보조 액션·dense table 인라인 컨트롤에만 사용. (※ v4 작성 시 lh를 20px로 잘못 표기, v9에서 수정)
- **WCAG 1.4.12 (Text Spacing)**: 사용자가 letter/word spacing을 오버라이드해도 4px 베이스는 절대값이라 영향 없음.

#### HR / Desk 듀얼 브랜드
- spacing은 neutral 시스템 — 브랜드 분기 없음. HR(B2B 데이터 밀도 위주)·Desk(B2C 여백 위주) 모두 동일 스케일 사용, 화면별 적용 강도(예: HR은 `md` 위주, Desk는 `lg` 위주)로 분기.

### Breakpoints (v54 추가, prose-token)

반응형 layout breakpoint — 5단계 (Apple Store reference). spec이 breakpoint 카테고리 미지원이라 prose-token 패턴(shadow/motion/overlay와 동일) — yaml 정의 없이 표만 운영. DESIGN.md / .hr.md / .desk.md 수동 동기.

| 토큰 | 값 | 의미 (Apple Store 가이드) |
|---|---|---|
| `breakpoint-sm` | `640px` | Phone max — 이하 single-column tiles, hero h1 34px |
| `breakpoint-md` | `736px` | Tablet portrait — global nav hamburger |
| `breakpoint-lg` | `834px` | Tablet landscape — full nav, 3-col → 2-col |
| `breakpoint-xl` | `1069px` | Desktop — full layout |
| `breakpoint-2xl` | `1441px` | Wide — content lock at 1440px |

#### Desk 적용 가이드 (B2C 모바일 우선)
Desk는 모바일 우선 — phone(`breakpoint-sm` 640 이하) viewport에서 모든 hit target 44×44px 충족 (WCAG 2.5.5 AAA). tablet portrait(736~833)에서는 메모/할일 list가 2-col grid, tablet landscape(834+) 부터 sidebar nav 활성. desktop(1069+)에서는 가계부 calendar full grid.

Apple HIG hero typography scale (56 → 40 → 34 → 28)을 메인 페이지 헤더에 적용 권장 — `breakpoint-xl` 56px / `breakpoint-lg` 40px / `breakpoint-md` 34px / `breakpoint-sm` 28px.

#### 사용 패턴
- min-width (mobile-first): `@media (min-width: var(--breakpoint-lg))` — 834 이상.
- `--breakpoint-*` namespace는 Tailwind v4 표준이라 별칭 없이 직접 사용. 값은 Apple Store 톤 (Tailwind default와 다름).

### Touch targets (v59 추가, prose-token)

WCAG 2.5.5 AAA + Apple Store reference 톤 5 토큰화 — DESIGN.md shared baseline과 동일. spec 외부(prose-token)라 자체 namespace.

| 토큰 | 값 | 의미 |
|---|---|---|
| `touch-min` | `44px` | WCAG minimum (default — 모든 hit target 권장) |
| `touch-pill-w` | `100px` | Pill CTA min-width |
| `touch-circular` | `44px` | Circular chip (= touch-min alias) |
| `touch-nav-h` | `32px` | Precision desktop nav height (`breakpoint-xl` 이상) |
| `touch-nav-w` | `80px` | Precision desktop nav min-width |

#### Desk 적용 가이드 (B2C 모바일 우선)
Desk는 모든 viewport에서 `touch-min` 44 / `touch-circular` 44 strict 적용 (WCAG AAA). bottom nav 사용자 프로필, 메모/할일 row tap target, 가계부 거래 항목 모두 44 hit area 충족. precision desktop 영역(`breakpoint-xl` 이상)에서만 `touch-nav-h`/`-w` 가능 — 다만 Desk는 desktop 비중 적어 자주 쓰이지 않음.

### Z-index (v65 추가, prose-token)

레이어 stacking order 6 토큰 — DESIGN.md shared baseline과 동일.

| 토큰 | 값 | 주 사용 |
|---|---|---|
| `z-base` | `0` | default 평면 |
| `z-dropdown` | `1000` | dropdown / select / autocomplete / tooltip |
| `z-sticky` | `1100` | sticky header / 모바일 bottom nav / sticky CTA |
| `z-drawer` | `1200` | bottom sheet (가계부 거래 입력, 메모 attachments) |
| `z-modal` | `1300` | modal dialog (메모 삭제 확인 / 가계부 카테고리 변경) |
| `z-toast` | `1400` | toast (저장 완료, 동기화 실패 등) |

#### Desk 적용 가이드 (모바일 우선)
- **bottom nav** = `z-sticky` — 페이지 스크롤 무관 항상 하단.
- **bottom sheet** (거래 입력, 할일 추가) = `z-drawer` — bottom nav 위로 슬라이드 업.
- **modal** (메모 삭제 확인) = `z-modal` — bottom sheet가 열린 상태에서도 modal 우선.
- **toast** (저장 완료) = `z-toast` — 모든 layer 위, safe-area 고려.
- iOS Safari `position: fixed` viewport 안전 영역(notch / home indicator) — 별도 padding-top/-bottom CSS env(safe-area-inset-*) 적용.
- isolation 권장: 메모 카드 내부 dropdown은 `isolation: isolate`로 island 격리.

### RTL support (v76 추가, prose-only)

DESIGN.md baseline 정의 참고 — CSS logical property 기반 LTR ↔ RTL 자동 분기. 모바일 우선 컴포넌트에 RTL 적용 가이드.

#### Desk 적용 컨텍스트
- **현 시점 active 사용 0** — Porest Desk 1차 시장 한국어(LTR). RTL은 향후 글로벌 시점.
- **신규 컴포넌트 spec 작성 시 logical 우선** — physical property 회피, `inline-start/end`/`block-start/end` 사용.
- **bottom sheet swipe direction**: RTL 시에도 위·아래 그대로 (block 축은 RTL 무관).
- **bottom nav 좌→우 순서** (홈/메모/할일/가계부/설정) → RTL 시 우→좌 자동 배치 (flex-direction 자체는 그대로, logical property 동작).
- **메모 카드 swipe-to-delete** (좌측 swipe로 삭제 노출) → RTL 시 우측 swipe로 분기 — gesture handler `:dir(rtl)` 분기.
- **가계부 통화 표시** (`₩1,234,500`): 통화기호 + 숫자 항상 LTR 유지 — `<bdi>` wrapping 또는 `unicode-bidi: embed`.
- **할일 chevron expand icon**: `>` → RTL 시 mirror.
- **카테고리 emoji icon**: 방향성 없음 (그대로 사용).

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

DESIGN.md의 Loop motion 정의와 동일 (brand-neutral). Desk `base`/`slow`/`loop` 조합이 일반적 — 메모 카드 hover(`base`) + bottom sheet(`slow`) + skeleton(`loop`).

### Animation library (v74 추가, prose-token)

DESIGN.md baseline 정의 참고 — 14 keyframes (단발 10 + loop 4). 모바일 친근 톤이라 더 풍부한 motion 사용.

#### Desk 우선 패턴
- **메모 카드 등장** — `scale-in` + `motion-duration-base` (200ms): 새 메모 작성 후 list에 추가될 때 (`scale 0.96 → 1`).
- **Bottom sheet (할일 추가, 가계부 입력)** — `slide-in-up` + `motion-duration-slow` (300ms): 화면 하단에서 올라옴, 모바일 핵심 패턴.
- **Toast** — `slide-in-up` + `motion-duration-slow` (300ms): bottom-center 위치라 아래에서 올라옴.
- **Modal (드물게)** — `scale-in` + `motion-duration-base` (200ms): 가계부 카테고리 편집 등.
- **Skeleton (가계부 list 로딩)** — `shimmer` + `motion-duration-loop` linear.
- **Pull-to-refresh spinner** — `spin` + `motion-duration-loop` linear.
- **Notification dot (새 메시지/할일 알림)** — `ping` + `motion-duration-loop` (1500ms) ease-out: 모바일 attention 끌기.
- **할일 완료 체크** — `bounce-in` + `motion-duration-slower` (500ms): 체크 시 잠깐 over-shoot — Desk B2C 친근 톤 핵심.
- **Form validation error** — `shake` + `motion-duration-slow` (300ms): 가계부 금액 미입력 등.

#### Desk 적극 사용
- `bounce-in` — 할일 완료, 가계부 저장 success indicator. HR과 달리 일상 UI에서 작은 즐거움 표현.
- `ping` — 새 알림 dot, 새 기능 spotlight. 모바일 attention.
- `slide-in-up` — bottom sheet 핵심. 다른 motion 대비 사용 빈도 높음.

#### Desk 회피 패턴
- `slide-in-down` — 모바일 화면 작아 위에서 내려오는 toast는 가독성 낮음. bottom-up 위주.

## Shapes

### v6 추가 — 5단계 라운드 스케일

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

Desk 브랜드는 B2C(개인 메모/할일/가계부) 톤 — 친근감·입체감. primary는 hover 시 명도 변화 폭이 HR보다 크고, `shadow-md`/`lg` 적극 사용.

#### Variant
| Variant | 토큰 | fill | text | border |
|---|---|---|---|---|
| **primary** | `button-primary` | `primary` (`#0147AD`) | `text-on-accent` (`#FFFFFF`) | none |
| **outlined-on-dark** | `button-outlined-on-dark` | transparent | `primary-light` (`#5FA0E5`) | `border-strong-dark` |
| **ghost** (예약) | 미정 | transparent | `primary` | none — hover 시 `surface-input` 채움 |

contrast 검증:
- primary fill `#0147AD` × text `#FFFFFF` = **8.95:1** ✅ AAA (HR보다 진한 brand → 더 높은 대비)
- outlined-on-dark text `#5FA0E5` × surface `#242938` = **5.41:1** ✅ 본문 AA
- (primary fill 자체 vs `bg-page` 외곽 대비 = 6.12:1 ✅ UI AA — 1.4.11)

#### State
| State | 시각 |
|---|---|
| default | variant 기본 + `shadow-sm` (primary만), outlined-on-dark는 `shadow-sm-dark` |
| hover | `motion-duration-base` 200ms × `motion-ease-out`로 fill 명도 +8% + `shadow-md` (Desk는 HR보다 hover 변화 폭 큼 — 친근감 톤) |
| pressed | hover 유지 + scale(0.98) + shadow 제거 |
| focused | `border-focus` (`#0147AD`) 2px outline, 1px offset. `focus-visible` 한정 |
| disabled | `text-disabled` text + opacity 0.5 + cursor:not-allowed |

#### Size
| Size | height | padding (V/H) | text | radius |
|---|---|---|---|---|
| sm | 32px | `xs` / `sm` | `caption` (12/400) | `sm` (4px) |
| **md** (default) | 40px | `sm` / `md` | `body-strong` (15/600) | `md` (8px) |
| lg | 48px | `md` / `lg` | `heading-sm` (16/600) | `md` |

Desk는 모바일 우선 사용 사례(개인 메모/가계부)가 많으므로 `md`/`lg` 위주, `sm`은 inline action 한정. `md` 라운드는 `sm`(4px)보다 부드러운 8px — Desk 친근감 톤.

#### Touch target / Layout
- 모든 사이즈 권장 hit area 44×44px (모바일 우선) — WCAG 2.5.5 AAA
- 인접 액션 간 최소 `md` (12px), 권장 `lg` (16px) — 손가락 입력 여유

#### Motion
- hover: `motion-duration-base` × `motion-ease-out` (HR `fast`보다 한 단계 길어 친근감 표현)
- pressed: `motion-duration-fast` × `motion-ease-out` (즉각 반응)
- `prefers-reduced-motion: reduce` 시 0ms 즉시 전환

#### Accessibility
- keyboard: `Enter`/`Space` 활성, `Tab` focus, focus ring `border-focus` 2px
- aria: 아이콘 only는 `aria-label`, loading은 `aria-busy="true"` + `disabled` 동시
- disabled 텍스트 4.5:1 미달은 1.4.3 incidental 예외

### Input

Desk(B2C 모바일 우선) — `md`/`lg` 위주, `sm`은 inline action 한정. focus ring은 brand `primary` (`#0147AD`).

#### Mode pair
| Token | 배경 | text | placeholder |
|---|---|---|---|
| `input-light` | `surface-input` (`#F0F2F7`) | `text-primary` (14.49:1 ✅) | `text-tertiary` (5.81:1 ✅) |
| `input-dark` | `surface-input-dark` (`#2D3346`) | `text-primary-dark` (11.40:1 ✅) | `text-tertiary-dark` (5.51:1 ✅) |

#### State
| State | border | 비고 |
|---|---|---|
| default | `border-default` 1px | label/형태 보강 |
| focused | `border-focus` (`#0147AD`) 2px + 1px offset | focus ring vs `surface-input` = 6.51:1 ✅ (HR보다 진한 brand → 더 높은 대비) |
| filled | default 유지 | |
| error | `error` 1px + helper `error` 색상 | error vs `surface-input` = 5.34:1 ✅ |
| disabled | default + `text-disabled` + opacity 0.5 | 1.4.3 incidental |

#### Size
| Size | height | padding (V/H) | text | radius |
|---|---|---|---|---|
| sm | 32px | `xs` / `sm` | `caption` (12/400) | `sm` |
| **md** (default) | 40px | `sm` / `md` | `body` (15/400) | `md` |
| lg | 48px | `md` / `lg` | `body` (15/400) | `md` |

Desk는 친근감 톤이라 `md` radius default(8px). 모바일 입력 사용 사례(가계부 입금/지출 입력 등) 많아 `lg` 권장 — touch hit area 48px.

#### Layout
- label `caption` + `xs` 간격
- form 행 간 `xl` (24px), section 간 `2xl` (32px) — Desk는 여백 톤

#### Motion
- focus ring: `motion-duration-base` × `motion-ease-out` (HR `fast`보다 한 단계 길어 친근감)
- error 등장: `motion-duration-base` × `motion-ease-out`

#### A11y
- HR과 동일 — `Tab` focus, `aria-invalid`/`aria-describedby`, `aria-required`, `<label for>`

### Card

Desk(B2C 친근감) — `default`/`interactive` variant 위주, 카드를 컨텐츠 단위(메모/할일/가계부 entry)로 적극 사용. shadow 강도 HR보다 강 (`md`/`lg` 적극).

#### Mode pair
- `card-light` (`#FFFFFF`) / `card-dark` (`#242938`)

#### Variant
| Variant | shadow | border | 사용 |
|---|---|---|---|
| **default** | `shadow-sm` → `shadow-md` (강조) | none | 일반 메모/할일 카드 |
| **interactive** | `shadow-md` → hover `shadow-lg` | none | tap 가능 카드 (Desk 모바일 우선) |
| **outlined** | none | `border-default` 1px | flat layout (가계부 inline entry 등) |
| **flat** | none | none | inline 그룹 |

다크 카드는 `interactive`에 `border-default-dark` 1px 보강 + `shadow-md-dark` 시작.

#### Padding
| Level | 값 | 사용 |
|---|---|---|
| sm | `md` (12px) | 작은 entry (할일 inline) |
| **md** (default) | `lg` (16px) | 일반 메모/할일/가계부 카드 |
| lg | `xl` (24px) | detail view (메모 상세, 가계부 월간 요약) |
| xl | `2xl` (32px) | hero card (onboarding, empty state) |

#### Radius
- default `radius-md` (8px), large card `radius-lg` (12px), hero `radius-2xl` (20px)

#### Layout
- 카드 그리드 gap: `lg` (16px) — Desk는 여백 톤
- 카드 내부 콘텐츠 간격: `md` (12px)

#### Motion
- interactive hover/tap: `motion-duration-base` × `motion-ease-out` (HR보다 한 단계 길어 친근감)
- card entrance (list 추가): `motion-duration-base`

#### A11y
- interactive: `<button>`/`role="button"` + `tabindex="0"` + Enter/Space
- focus: 카드 외곽 `border-focus` (`#0147AD`) 2px outline

### Page text

Desk(B2C) — `bg-page` 위 본문은 메모/할일 list, 가계부 월간 뷰 등 모바일 우선 화면. 가독성 + 친근감.

#### Mode pair / contrast
- `page-text-light`: `bg-page #F5F6FA` × `text-primary #1A1F2E` = **15.04:1** ✅ AAA
- `page-text-dark`: `bg-page-dark #1A1F2E` × `text-primary-dark #F5F6FA` = **15.04:1** ✅ AAA

#### Typography
- 본문 `body` (15/400/1.6), 강조 `body-strong` (15/600)
- 헤딩 위계: page title `heading-xl` (32/700, hero/onboarding) 또는 `heading-lg` (24/700, 일반 page), section `heading-md` (18/600), 메모 inline `heading-sm` (16/600)

#### Layout
- 본문 max-width: 720px (모바일 viewport 자체가 320~480px이므로 max-width는 desktop 시점)
- 단락 간 `lg` (16px), 섹션 간 `xl`/`2xl` (24~32px) — 여백 톤

#### A11y
- 1.4.3 / 1.4.12 / 1.4.4 충족 — viewport 320px AA reflow

### Caption

Desk — 메모 timestamp, 가계부 카테고리, 할일 due date 등.

#### 위계 / Mode pair / contrast
HR과 동일 (공유 토큰):
| Token | text | contrast |
|---|---|---|
| `caption-on-card-light` | `text-secondary` | 6.78:1 ✅ |
| `caption-on-card-dark` | `text-secondary-dark` | 6.85:1 ✅ |
| `caption-tertiary-on-card-light` | `text-tertiary` | 5.36:1 ✅ |
| `caption-tertiary-on-card-dark` | `text-tertiary-dark` | 5.13:1 ✅ |

#### Layout
- 본문과 `xs` (4px) 간격, 카드 내 footer 영역에 정렬 시 `sm` (8px)

### Badge

Desk — 할일 우선순위/카테고리, 가계부 분류, 메모 태그. semantic 4종 + 일반 tag(가계부 카테고리는 chart-color 사용 — 별도).

#### Variant
공유 토큰 그대로. contrast 5.27~6.31:1 모두 본문 AA.

#### Size
- 할일 inline은 `sm` (18px), 일반 카테고리 라벨은 `md` (22px), 우선순위 강조는 `lg` (28px)
- shape: pill(`radius-full`) 위주 — 친근감 톤

#### Layout
- 할일 텍스트와 `sm` (8px) 간격
- 가계부 entry 카테고리 + 금액 그룹 시 `md` 간격

#### A11y
- 1.4.1: 우선순위/카테고리를 색상만으로 표현 금지 — 텍스트/아이콘 보강
- count badge (알림 등): `aria-live="polite"` + `aria-label`

### Alert text

Desk — 메모 저장 완료, 할일 추가/완료 안내, 가계부 입력 검증 등 inline notification.

#### Variant
공유 토큰 8종 그대로 — semantic 4 × {light/on-dark}. contrast 5.27~6.31:1 (light), 5.42~5.85:1 (on-dark) 모두 본문 AA.

#### Typography
- form helper(필드 아래): `caption` (12/400) + `xs` 간격
- 일반 alert 본문: `body` (15/400) — 모바일 가독성 우선
- alert 제목: `body-strong` (15/600)

#### Layout
- icon + text 페어: icon `xs` 간격, size 16~20px
- alert 영역 padding `md` (12px) — Desk는 여백 톤
- 카드 안 inline alert는 카드 padding 안에서 `sm` 간격

#### Motion
- 등장: `motion-duration-base` × `motion-ease-out` (slide-in + fade, 친근감)
- dismiss: `motion-duration-fast`

#### A11y
- HR과 동일 — error `role="alert"`, info/success `aria-live="polite"`, form `aria-describedby`

### Focus ring

Desk 브랜드 — `border-focus` (`#0147AD`) / `border-focus-light` (`#5FA0E5`) 사용. 모든 인터랙티브 컴포넌트의 focus 표현 통일.

#### Mode pair (sparse — primary 토큰이 contrast 검증 담당)
| Token | 색상 | 사용 |
|---|---|---|
| `focus-ring-on-light` | `border-focus` (`#0147AD`) | 라이트 표면 위 모든 컴포넌트 |
| `focus-ring-on-dark` | `border-focus-light` (`#5FA0E5`) | 다크 표면 위 모든 컴포넌트 |

#### Contrast (실측)
| 페어 | 대비 |
|---|---|
| `border-focus` (`#0147AD`) vs `bg-page` (`#F5F6FA`) | **5.79:1** ✅ AA |
| `border-focus` (`#0147AD`) vs `surface-default` (`#FFFFFF`) | **6.12:1** ✅ AA |
| `border-focus` (`#0147AD`) vs `surface-input` (`#F0F2F7`) | **6.51:1** ✅ AA |
| `border-focus-light` (`#5FA0E5`) vs `bg-page-dark` (`#1A1F2E`) | **6.11:1** ✅ AA |
| `border-focus-light` (`#5FA0E5`) vs `surface-default-dark` (`#242938`) | **5.41:1** ✅ AA |

Desk는 brand `primary`가 진해서 모든 표면에서 본문 AA(4.5:1) 충족 — focus indicator로서 매우 강한 시인성. 모바일 사용자(터치 + 키보드 혼용) 친화적.

#### Spec
- 두께 2px, offset 1px, shape 컴포넌트와 동일 `border-radius`
- `focus-visible` pseudo만 사용

#### Motion
- focus ring 등장: `motion-duration-fast` × `motion-ease-out`
- `prefers-reduced-motion: reduce` 시 즉시 표시

#### A11y
- 2.4.11 / 2.4.12 / 2.4.13 — 위 contrast 충족 (Desk는 AAA 후보)
- 모바일 키보드 사용자(외장 키보드 연결 시) 우선 — focus visible 강조
- 다크 모드 자동 전환은 HR과 동일 패턴

### Divider

Desk — 메모/할일 list separator, section break (월/주별 가계부 분할 등).

#### Mode pair
- `divider-light` → `border-default` (`#E5E8EF`)
- `divider-dark` → `border-default-dark` (`#353B4D`)

#### Layout
- list item 사이 inline divider, padding 안쪽 inset (`lg` 16px) — Desk는 여백 톤
- section break 위/아래 `xl`/`2xl` (24~32px)
- 메모 카드 내부는 divider 자제 — surface 휘도 차로 분리

#### A11y
- HR과 동일

### Outline (border 시각 요소)

Desk — modal 외곽선 (shadow-xl + outline-strong), 선택된 entry highlight.

#### Mode pair / contrast
- `outline-strong-light` → `border-strong` (`#7D8593`): 3.13~3.34:1 (UI AA)
- `outline-strong-dark` → `border-strong-dark` (`#8B95A8`): 3.39~4.05:1 (UI AA)

#### 사용
- modal: `shadow-lg` + `outline-strong-light` (Desk는 modal 자주 사용)
- 다크 modal: `shadow-lg-dark` + `outline-strong-dark`
- 선택된 메모/할일: `outline-strong-light` 1px + 약간의 `surface-input` tint

### Disabled label

Desk — 메모/할일/가계부에서 비활성 상태(예: 완료된 할일 toggle, 보관된 메모, 잠긴 가계부 entry).

#### Mode pair (sparse — textColor only)
- `disabled-label-light` → `text-disabled` (`#828995`, 1.4.3 incidental 예외)
- `disabled-label-dark` → `text-disabled-dark` (`#7A8294`)

#### Spec
- text color disabled, 컴포넌트 자체 opacity 0.5 + cursor:not-allowed (또는 tap 불가)
- 완료된 할일은 strikethrough(line-through) 추가 권장 — 시각적 완료 표시 보강
- 보관/잠금 상태는 lock icon 추가

#### A11y
- 1.4.3 incidental 예외
- aria: `aria-disabled="true"` (focus 가능 — 다시 활성화 옵션 발견 가능)
- 완료 할일: `aria-checked="true"` + `aria-label="완료된 할일: ..."`

### Switch / Checkbox / Radio (control 묶음)

Desk — 할일 완료 checkbox(즉시 적용), 메모 즐겨찾기 switch, 가계부 분류 radio, 알림 설정 switch 등.

#### 공통 spec (신규 토큰 없음)
- inactive: `border-strong` 1px + `surface-input` 채움
- active: `primary` (`#0147AD`) 채움 + `text-on-accent`
- disabled: opacity 0.5

#### Variant
- Switch: `lg` 32×20 (모바일 hit area 우선) — 알림 on/off, 다크모드 toggle 등
- Checkbox: 20×20 (모바일 우선 lg 사이즈), 할일 완료 ↔ 미완료 즉시 toggle
- Radio: 20×20 group, 카테고리 단일 선택

#### Layout
- 모바일 form 행: label + control 간격 `md` (12px), 행 간 `lg` (16px)
- 할일 list 인라인 checkbox: list item left에 위치, 좌측 padding `md`
- touch hit area 44×44 필수 (모바일 우선)

#### Motion
- toggle: `motion-duration-base` 200ms × `motion-ease-out` (HR 150ms보다 느려 친근감)
- 할일 완료 시 strikethrough + opacity transition: `motion-duration-base` (사용자 만족감 표현)

#### A11y
- HTML native `<input>` + `<label for>` 우선
- focus ring `border-focus` (`#0147AD`) 2px
- Switch는 native `<input type="checkbox" role="switch">` + `aria-checked`
- 키보드 Space, Radio arrow keys, group `role="radiogroup"`

### Tabs

Desk — 메모 view(전체/즐겨찾기/태그별), 가계부 view(수입/지출/카테고리), 할일 view(오늘/예정/완료). 모바일 우선이라 fill/pills variant 적극.

#### Variant
- **fill** (모바일 default): active tab 배경 `primary` (`#0147AD`) + `text-on-accent` — bottom nav 또는 sticky top tabs
- **pills** (sub-tab): active tab `radius-full` + `primary-light` 12% tint 배경 — 메모 태그 필터 등
- **underline** (desktop): bottom border 2px + `text-primary`

#### Size
- 모바일 bottom nav: `lg` (52px) — touch hit area 우선
- 모바일 top tab: `md` (44px)
- desktop sub-tab: `sm` (36px)

#### Layout
- 모바일 bottom nav: 풀-width, 5 tab 균등 분할, label + icon
- 모바일 top tab: horizontal scroll if 5+ tabs

#### Motion
- pill/fill transition: `motion-duration-base` × `motion-ease-out` (친근감)
- panel 전환: `motion-duration-fast` fade — Desk는 콘텐츠 전환 부드럽게
- swipe gesture로 tab 전환 가능 (mobile)

#### A11y
- role tablist/tab/tabpanel + aria 속성
- 키보드: ←→/Home/End/Enter/Space, vertical은 ↑↓
- 모바일 swipe-to-tab: 키보드 ←→ 동등 + `aria-live="polite"` panel 변경 알림
- bottom nav는 `<nav role="navigation">` wrap

### Dropdown (Menu / Select 공통 패턴)

Desk — 메모 카테고리 선택, 가계부 분류 선택, 할일 우선순위, 정렬 옵션. 모바일 우선이라 간단한 select는 native `<select>` 또는 bottom sheet picker 우선, 복잡한 menu는 dropdown panel.

#### Structure (신규 토큰 없음)
- panel: `surface-default` + `outline-strong-light` 1px + `shadow-md` + `radius-md` (Desk는 `radius-lg` 12px 옵션 — 친근감)
- item: height 44px (모바일 touch 우선) — desktop은 36px 옵션
- hover/active `surface-input`, selected primary `#0147AD` 강조

#### Variant
- menu(action sheet 대체 desktop), select, multi-select, combobox(search 가계부 카테고리 등)

#### Layout
- 모바일 select: 시스템 native `<select>` 또는 bottom sheet picker 권장 (스크롤 가능, 큰 hit area)
- desktop panel: max-height 400px, min-width trigger width

#### Motion
- 모바일 sheet: 하단 슬라이드 `motion-duration-slow`
- desktop panel: scale+fade `motion-duration-fast`

#### A11y
- HR과 동일 — role 분류, aria-expanded/haspopup, 키보드 nav, focus return
- 모바일은 native control fallback 적극 — 시스템 a11y 자동 활용

### Tooltip

Desk — 모바일 우선이라 hover-driven tooltip 사용 제한. 주로 desktop 사용 사례(메모/가계부 desktop view) + (i) 정보 아이콘 보조.

#### Structure (신규 토큰 없음)
- 표면: `surface-default-dark` + `text-primary-dark`
- shadow `shadow-sm`, radius `radius-sm`

#### Layout
- text: `caption` (12/400), max-width 200px (모바일 viewport 고려 좁게)

#### Motion
- desktop: hover 500ms / focus 0ms, fade-in `motion-duration-fast`
- 모바일: tap → 짧은 토스트 또는 inline expand로 대체 (tooltip 미사용 권장)

#### A11y
- WCAG 1.4.13 (desktop tooltip): dismissible/hoverable/persistent
- 모바일은 (i) icon button → expand inline panel 또는 sheet가 더 적합
- icon-only button은 항상 `aria-label` 필수

### Toast

Desk — 메모/할일/가계부 저장 완료, 동기화 상태, 작업 취소 등 짧은 알림. 모바일 우선이라 top-center 또는 bottom-center 사용.

#### Structure (신규 토큰 없음)
- 표면: `surface-default` + `shadow-md` + `radius-md` (Desk는 친근감 톤이라 `radius-lg` 12px 옵션도 가능)
- semantic 4 좌측 4px stroke + icon

#### Position
- 모바일 default: top-center (status bar 아래) — 콘텐츠 차단 최소화
- desktop: top-right (24px 여백)
- 가계부 입력 후 짧은 confirmation은 bottom-center (action 가까운 곳)

#### Layout
- max-width 모바일 viewport - `xl` (24px) 좌우 여백, padding `lg` (16px)
- 중첩 시 stack, `xs` 간격

#### Motion
- 모바일 등장: 위에서 슬라이드 + fade (`motion-duration-base`), bottom은 아래에서
- swipe-to-dismiss (모바일): horizontal swipe 시 `motion-duration-fast` 따라감
- 자동 닫힘: 위와 동일 (success/info 4s, warning 6s, error 8s)

#### A11y
- HR과 동일 — role/aria-live, focus 안 받음, swipe 키보드 fallback (close button)

### Modal

Desk — 메모/할일 편집, 가계부 entry 입력, 카테고리 관리 등. 모바일 우선이라 **bottom sheet** 형태가 default(centered modal은 desktop 보조).

#### Structure
- overlay: `overlay-dim-light` / `overlay-dim-dark` (탭 시 닫기)
- container (centered modal): `surface-default` + `outline-strong-light` 1px + `shadow-lg` (Desk는 modal에 `xl`보다 한 단 약한 `lg` 사용 — 친근감)
- container (bottom sheet): `surface-default` + 상단 라운드 `radius-2xl` (20px) + drag handle bar 위에 표시

#### Variant
- sm 320px: 간단 confirm
- **md 400px** (default centered): 메모/할일 편집 form
- lg 560px: detail view (가계부 월간 요약)
- **mobile sheet** (모바일 default): full-width, 화면 하단 점진 노출 (스와이프 가능)

#### Layout
- container padding: `lg` (16px) — Desk는 모바일 viewport 고려 보수적
- header/body 간격: `md`, body/footer 간격: `lg`
- footer button: 모바일 sheet는 전체 폭 stacked button, desktop centered는 우측 정렬

#### Motion
- centered modal 등장: overlay fade + container `motion-duration-base` scale+fade
- bottom sheet 등장: 하단 슬라이드 `motion-duration-slow` × `motion-ease-out`
- swipe-to-dismiss 사용 시: `motion-duration-fast` follow-through

#### A11y
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` + focus trap + ESC/swipe close + return focus + scroll lock
- bottom sheet drag handle은 `aria-label="끌어서 닫기"` + 키보드 fallback (close button 포함)

### Chart color (palette)

Desk — 가계부 카테고리/월간 비교 chart, 할일 카테고리 분류, 메모 태그 색상 등에 사용. 10색 palette × 2 mode.

#### 사용 시나리오
- **pie chart**: 가계부 카테고리별 지출 비율 — 5~7 카테고리 권장, hue 선택 자유 (기본 hue 순서 또는 카테고리 의미 기반)
- **line chart**: 월간 지출 추이 — `chart-color-blue` (default) 또는 카테고리당 1색
- **bar chart**: 할일 카테고리별 완료 수
- **카테고리 tag**: 메모 태그 색상 — 10색에서 사용자가 직접 선택

#### Hue 의미 매핑 (Desk context)
HR과 달리 Desk는 사용자 정의 카테고리가 많으므로 **hue 의미 강제 X**. 단 권장:
| Hue | 사용 사례 |
|---|---|
| green | 수입 / 완료된 할일 |
| red | 지출 / 마감 임박 |
| blue | 일반 default |
| pink/violet | 개인적 카테고리 (개인 메모) |
| brown | 기타 |

#### Layout
- chart 영역 padding `xl` (24px), legend `sm` 간격 — Desk 여백 톤
- 카드 안 chart: card padding `lg` (16px)
- 모바일 chart: 풀 viewport width, legend는 위/아래 1줄 + horizontal scroll

#### Motion / A11y
- 진입 `motion-duration-slow`, hover/tap `motion-duration-fast`
- 모바일 tap 인터랙션: 데이터 포인트 tap 시 tooltip + `motion-duration-fast` fade
- 1.4.1 색상 단독 금지, 패턴/라벨 보강
- screen reader: `<table>` fallback 또는 svg `role="img"`

### Avatar (v58 추가)

Desk(B2C) — 사용자 본인 프로필 + 메모/할일 작성자 + 가계부 카테고리 아이콘 대체. 모바일 우선 톤이라 md/lg 사이즈 위주, 44×44 hit target 충족.

#### Desk 사용 패턴
- **bottom nav 사용자 프로필**: `md` 32px 원형 (`radius-full`).
- **메모 author**: `sm` 24px inline + 작성자 `caption` 12px.
- **profile settings 페이지**: `xl` 56px 원형 + 편집 버튼.
- **할일 owner**: `sm` 24px 원형 (개인 + 공유 메모 구분).

#### Color
- B2C는 단일 사용자 → **Desk primary** `#0147AD` 단색 default 권장 (단순).
- 공유 메모/할일에서 다른 사용자는 chart palette categorical 분배.

#### Touch target
모바일 우선 — `sm` 24px hit area 작아 외곽 padding `sm` (8px) 적용해 44×44 충족. `md` 32px 이상 권장 (default).

#### Sparse 매핑
DESIGN.md와 동일 (`avatar` chart-blue × text-on-accent, lint contrast 활성).

### Calendar (v61 추가)

Desk(B2C) — 가계부 거래일·할일 due date·메모 캡처일 등 일상 기록 핵심. 모바일 우선이라 md 사이즈(36px) 기본 + 풀스크린 datepicker 패턴 위주.

#### Desk 사용 패턴
- **가계부 거래 dot**: 셀 하단 가운데 4×4 dot — 수입(`success` `#16803F`), 지출(`error` `#DC2626`), 이체(`info` `#1D6FCB`). 다중 거래일은 가로 3 dot 또는 누계 색만 표시.
- **할일 due date 강조**: 마감 임박 (`warning` `#C84D0E` 1px outline + 텍스트), 지난 마감 (`error` 채움 + `text-on-accent` 텍스트), 완료 (`success` checkmark icon overlay).
- **메모 작성일 marker**: 단순 `text-tertiary` dot — 클릭 시 해당일 메모 list 모달.
- **range 선택**: 가계부 기간 통계 조회 (예: "지난 7일") — 단 빠른 preset (오늘/이번주/이번달) 버튼 우선, range는 secondary.

#### Layout 차이
- 모바일 풀스크린: md 사이즈(36×36) — viewport 너비 기준 7등분.
- 데스크탑/태블릿: lg(40×40) + 우측 일별 상세 패널.
- bottom sheet datepicker: sm(32×32) — 입력 필드 옆에서 슬라이드 업.
- month navigation: 좌우 swipe gesture 지원 (모바일) + ◁ ▷ 버튼 (데스크탑).

#### Color
- selected (single/range-start/range-end): `primary` `#0147AD` 채움 + `text-on-accent`.
- range-mid: `primary-light` `#5FA0E5` 배경 + `text-primary`.
- today indicator (선택 안 됐을 때): `border-focus` `#0147AD` 1px outline + `primary` 텍스트.

#### Touch target
모바일 우선 → 셀 자체 36×36 → padding `sm` (8px) 추가로 hit area `touch-comfortable` (48×48) 확보 권장. iOS Safari · Android Chrome 모두 검증.

#### 모바일 gesture
- 좌우 swipe: 월 이동 (`motion-duration-base` 200ms `motion-ease-out`).
- 길게 누름 (long press): 셀의 거래/할일 quick preview popover.
- pinch zoom: 비활성 — `touch-action: pan-x pan-y manipulation`.

#### Sparse 매핑
신규 yaml 컴포넌트 0. 기존 `button-primary`(selected cell), `alert-text-success/error/warning/info`(거래·할일 상태 dot), `card-light`(셀 default ground)이 contrast 페어 활성.

### Textarea / Form layout (v62 추가)

Desk(B2C) — 메모 본문, 할일 상세 설명, 가계부 거래 메모 등 일상 multi-line 입력. 모바일 우선이라 stacked layout + auto-grow 적극 활용.

#### Desk 사용 패턴
- **메모 본문**: textarea auto-grow + min 4 line max viewport 60%. 본문 영역은 `body-md` (16/400/1.5 영문) 또는 `body` (15/400/1.6 한국어) — 메모 톤에 맞춤.
- **할일 상세 설명**: 할일 카드 펼침 시 inline textarea. min 2 line + counter `120 / 500`. 80% 도달 시 `warning` tint.
- **가계부 거래 메모**: 단일 line Input이 default, optional textarea (메모/영수증 설명) — bottom sheet 펼침 시 노출.
- **프로필·설정**: stacked layout (모바일 풀스크린 form) — label 위, control 아래, primary action 하단 sticky.

#### Validation
- **on blur** 활용 — 모바일에서 즉시 피드백 선호 (focus 후 다른 필드 이동 시).
- error toast는 키보드 가린 영역 회피 위해 viewport 상단 + safe-area 고려.

#### 모바일 mode
stacked 강제 (horizontal 사용 안 함) — viewport 너비 한계 + 한 손 조작 친화. label/helper/error 모두 control 위·아래 인라인.

#### Auto-grow
모바일에서 scrollbar 회피 → JS auto-resize. iOS Safari focus 시 viewport zoom 방지(`font-size: 16px` 유지 — `body-md` 채택 이유 일치).

#### Bottom sheet form
거래 입력·할일 추가 등 — 화면 하단 sheet (radius-xl 상단만, swipe-down close). primary 버튼은 sheet 하단 sticky `touch-comfortable` (48×48).

### Form validation (v75 추가)

DESIGN.md baseline 정의 참고 — 8 rule + 5 field state + form state machine + ARIA live + async + multi-field. Desk(B2C) 친근체 톤 적용 (그러나 존댓말 유지).

#### Desk 우선 patterns
- **금액 input (numeric range)** — 가계부 거래 금액 `min=1` (0원 거래 무의미). "0보다 큰 금액을 입력해주세요" — pattern.
- **카테고리 required (dropdown)** — 거래 입력 시 카테고리 필수. 미선택 시 "카테고리를 선택해주세요".
- **할일 due-date (optional but conditional)** — 알림 ON 시 due-date 자동 required toggle. `aria-required` 동적.
- **메모 max-length (550 글자)** — `text-tertiary` counter "234 / 550". 80% 도달 시 `warning` tint, 100% 도달 시 `error`.
- **이메일 가입 (async)** — 회원가입 시 이메일 unique check + 형식 검증. debounce 500ms, AbortController.
- **비밀번호 강도 (on change)** — 가입 시 8자 + 영문 + 숫자, 강도 bar (`error`/`warning`/`success` 색).

#### Desk error message 친근체 (예시)
- "메모 내용을 입력해주세요" (required)
- "올바른 이메일 주소를 입력해주세요 (예: hello@porest.app)" (email + 예시)
- "이미 가입된 이메일이에요. 로그인 해주세요" (async — 친근한 체)
- "비밀번호가 일치하지 않아요" (match)
- "0보다 큰 금액을 입력해주세요" (custom)
- "최대 550자까지 입력 가능해요" (max-length)

비격식 어미("입니다" → "이에요/요")는 가입 후 toast 메시지나 settings에서 부분 적용. validation은 표준 "해주세요" 유지 (사용자에게 행동 요청 톤이 자연).

#### Desk 위계 (짧은 form 위주)
- 메모 작성 / 할일 추가 / 가계부 거래 — 1-3 필드 → field-level error 만으로 충분, 상단 banner 거의 미사용.
- 회원가입 / 프로필 설정 — 4-6 필드 → 첫 invalid 필드 focus, banner 생략 (모바일 화면 좁음).

#### 모바일 키보드 + validation
- on blur validation: focus 떠날 때 즉시 → 사용자가 다음 필드로 이동 직후 error 발견 흐름 자연.
- 키보드 노출 영역 고려: error message는 control 바로 아래 표시 (스크롤로 가려지지 않게), submit 버튼은 sheet 하단 sticky로 키보드 위에 항상 보이도록.
- `inputmode` 속성 활용 — 금액(`numeric`/`decimal`), 이메일(`email`), 전화번호(`tel`).

#### Desk async validation
- 회원가입 이메일 unique check (async) — 핵심 사용. AbortController로 입력 중 stale 응답 차단.
- 메모/할일 작성 — async 없음 (즉시 local 저장 + background sync).

### Skeleton / Loading (v63 추가)

Desk(B2C) — 메모 list·할일 카드·가계부 dashboard 로딩 상태. 모바일 우선 + 친근 톤이라 카드 단위 placeholder, 적당한 shimmer.

#### Desk 사용 패턴
- **메모 list 로딩**: card 4-5개 (rect heading + text 2-line + tags placeholder). 각 카드 사이 `md` (12px) gap — 친근감 있는 spacing.
- **할일 카드 로딩**: list-row + checkbox circle 16 + text 1-line + due-date caption. 할일은 짧으니 1줄.
- **가계부 dashboard 로딩**: 큰 KPI 카드 (잔액) + 차트 rect + 거래 list-row 5개. dashboard top-down 순서.
- **메모 detail 로딩**: heading-xl (32) rect + tags row + body text 8-line + 첨부 placeholder. Markdown render 시작 전 골격.

#### 모바일 친화
- skeleton 등장: 모바일 viewport에서 첫 화면 즉시(0ms) → 깜빡임 없이 자연스러운 로딩 인상.
- pull-to-refresh: 사용자가 이미 데이터를 본 후 새로고침 시 `surface-input` 0.4 opacity overlay + 작은 spinner (skeleton 대신).
- bottom sheet 펼침 후 데이터 로딩 시 sheet 내부에 skeleton (sheet wrapper는 즉시 표시).

#### Pulse fallback (저성능)
shimmer gradient 비싸므로 — Android 저사양 또는 절전모드 시 자동 감지 → opacity pulse fallback. 사용자 인지 차이 미미.

#### Reduced motion
모바일 사용자 중 멀미 호소 사례 있음 — `prefers-reduced-motion: reduce` 더 적극 존중. shimmer/pulse 모두 정지, `surface-input` 단색만.

### Pagination / Drawer / Spinner / Stepper (v67 추가 batch)

Desk(B2C) 4 컴포넌트 사용 패턴 — DESIGN.md 공통 spec 외 brand-specific 안내. 모바일 우선 + 친근 톤.

#### Pagination — Desk
- **load-more variant** 우선 — 메모 보관함, 가계부 거래 목록, 영수증 list 등 점진적 expand. "더 보기" 단일 버튼이 모바일 친화.
- **prev-next variant**: 메모 detail에서 ← 이전 메모 / → 다음 메모 (single-item navigation).
- **numbered 회피**: 모바일에서 페이지 번호 button 다수는 hit area 좁아 부적절. tablet/desktop으로 fallback도 numbered 비권장.
- 무한 스크롤은 가계부 dashboard에선 회피 (scroll position 잃기 쉬움) — load-more가 명시적.

#### Drawer — Desk
- **bottom sheet** 압도적 우선 — 거래 입력, 메모 attachments, 할일 추가, 카테고리 필터.
  - swipe handle 8×40 상단 표시 (gesture hint)
  - swipe-down threshold 30% 또는 velocity 기준 닫기
  - safe-area-inset-bottom 적용 (iOS home indicator 회피)
- **left drawer (navigation)**: 햄버거 메뉴 — 카테고리 list, 보관함, 설정 진입. 너비 80vw.
- focus trap + scroll lock 필수. 키보드 사용자 회피 위해 모바일에서도 ARIA 정확.

#### Spinner / Progress — Desk
- **메모 저장 spinner**: button 안 sm 16 spinner + "저장 중..." 라벨.
- **이미지 업로드 determinate progress**: 8px linear bar + percentage. 완료 시 success ✓ icon 1초 페이드.
- **bottom sheet 데이터 로딩**: sheet 안 가운데 md 24 spinner + 라벨. sheet wrapper는 즉시 표시(skeleton 패턴과 차이).
- pull-to-refresh: 손가락 드래그 → spinner 등장 → 놓으면 회전 → 데이터 도착 fade out.

#### Stepper — Desk
- **simple progress dot indicator**: onboarding 5단계 dot — 모바일 친화 minimal.
- **vertical stepper**: 가계부 분류 설정 4단계 — 모바일 화면에서 자연스러움.
- **free navigation**: 설정 메뉴는 모든 단계 자유 이동 (의존성 없음). 결재처럼 sequential 강제 안 함.
- step circle 32 default, sm 24는 inline minimal (캘린더 위 진행 표시 등).

### Navigation batch (v68 추가)

Desk(B2C) 5 navigation 컴포넌트 — 모바일 우선 + 단순한 페이지 위계.

#### Breadcrumb — Desk
- 메모/할일은 1-2 depth 정도 — breadcrumb 거의 사용 안 함.
- 가계부 카테고리 drill-down 시 사용 — `Home / 가계부 / 식비`. 모바일에서 truncation 적용.

#### Sidebar — Desk
- **floating drawer** 변형 위주 — 모바일 햄버거 메뉴 (좌측 swipe-in 또는 상단 toggle).
- 데스크탑 `breakpoint-lg` 이상에서만 fixed 240px 사용 — Desk는 모바일 비중 ↑.
- nav 그룹: 메모 / 할일 / 가계부 / 캘린더 / 설정 (5 그룹).
- footer: 본인 profile + 다크 모드 toggle.

#### Navigation Menu — Desk
- 데스크탑 web 진입 시 header link — single-level (Home / 메모 / 할일 / 가계부 / 설정).
- B2C라 mega menu는 부적합 (data app 톤이지 marketing 사이트 아님).

#### Menubar — Desk
- 모바일 우선이라 menubar 거의 사용 안 함 — 데스크탑 web에서만 옵션.
- File / Edit / View 같은 application 메뉴 비활성 — Desk는 네이티브 app 톤이 아닌 web/PWA.

#### Command (Cmd+K) — Desk
- 메모/할일 빠른 검색 핵심 — typing 즉시 fuzzy match (제목 + 본문).
- Sections: Recent memos / Tags (filter by tag) / Quick actions (새 메모, 새 할일) / Settings.
- 모바일에서 search trigger는 상단 search bar (`/` shortcut), 데스크탑은 Cmd+K.

### Input batch (v69 추가)

Desk(B2C) 5 input 컴포넌트 — 모바일 우선 + 친근 톤.

#### Combobox — Desk
- **태그 자동완성**: 메모/할일에 태그 입력 — typing → 기존 태그 추천 + free text 신규 태그.
- **카테고리 선택**: 가계부 거래 카테고리 — fuzzy match (식비/카페 한 단어 typing으로 매칭).
- multi-select: 메모에 다중 태그.

#### Slider — Desk
- **가계부 예산 설정**: 카테고리별 월 예산 single slider (₩0 - ₩1,000,000).
- **할일 우선순위**: 1-5 단계 (낮음-높음) single slider.
- 모바일 위주 — thumb 24×24 + hit area `touch-min` 44 padding 보강.

#### Toggle — Desk
- **메모 즐겨찾기**: ★ icon toggle (off=outline, on=filled `warning` 색).
- **할일 완료**: checkbox와 별개로 "다시 열기" 토글.
- **다크 모드**: 설정 페이지 단일 toggle (icon-text 변형).

#### Toggle Group — Desk
- **메모 view 모드**: list / grid / card (single).
- **가계부 기간 필터**: 1주 / 1개월 / 3개월 / 1년 (single).
- **메모 type 필터**: 일반 / 즐겨찾기 / 보관 (multiple — 동시 표시 가능).

#### Input OTP — Desk
- **이메일 변경 확인**: 6자리 일회용 코드 (이메일로 발송).
- **2차 인증** (선택 활성화): 로그인 시 6자리.
- **iOS Safari**: `autocomplete="one-time-code"` 적극 활용 — SMS 자동 채우기.

### Disclosure batch (v70 추가)

Desk(B2C) 5 disclosure/overlay 컴포넌트.

#### Accordion — Desk
- **FAQ 설정 페이지**: 자주 묻는 질문 — single mode.
- **메모 옵션 그룹**: 보기 / 정렬 / 알림 / 백업 — multiple (사용자가 한 번에 여러 옵션 검토).
- **할일 카테고리 그룹**: 카테고리별 할일 펼침.

#### Collapsible — Desk
- **메모 attachments**: "첨부 2개" expand로 image list.
- **할일 detail "자세히"**: 짧은 제목 + collapsed 본문 (긴 메모형 할일).

#### Hover Card — Desk
- **태그 hover**: 태그 클릭 전 hover → 태그 정의 + 사용 횟수 + 색.
- **링크 hover**: 메모 안 외부 링크 → og:image preview + title (시간 절약).
- 모바일은 long-press tap으로 동일 효과.

#### Context Menu — Desk
- **메모 long-press**: 즐겨찾기 / 보관 / 공유 / 삭제 — 모바일 long-press가 일반.
- **할일 long-press**: 완료 / 우선순위 변경 / 메모 변환 / 삭제.
- 데스크탑 web에서는 right-click 동일 메뉴.

#### Alert Dialog — Desk
- **메모 영구 삭제**: "30일 후 영구 삭제됩니다. 보관함이 아닌 즉시 삭제할까요?"
- **카테고리 삭제**: "이 카테고리의 모든 거래 (47건)이 미분류로 이동돼요" (destructive 명시).
- **계정 삭제**: 강력한 destructive — 6자리 OTP 추가 확인 후 삭제 (Alert Dialog + Input OTP 결합 패턴).

### Data batch (v71 추가)

Desk(B2C) 5 data display 컴포넌트 — 모바일 우선 + 친근 톤.

#### Table — Desk
- **가계부 거래 list default**: 일반 가독성, 모바일에서 column 일부 숨김 (date/금액만).
- **메모 보관함**: striped variant — 긴 list 시각 분리.
- compact variant 회피 — 모바일에서 hit area 좁아 부적절.

#### Data Table — Desk
- **영수증 보관함**: 데스크탑에서만 — sortable(date/금액) + filterable(카테고리) + multi-select 삭제. 모바일은 simple Table + filter chip.
- **할일 archive**: 완료된 할일 — 검색·정렬·내보내기 (PDF/CSV).
- 모바일에서는 Data Table 기능 일부 비활성 (column visibility는 데스크탑만).

#### Carousel — Desk
- **onboarding hero**: 첫 사용 시 4-5 슬라이드 (메모 / 할일 / 가계부 / 캘린더 소개).
- **인기 태그 carousel**: 메모 입력 시 자주 쓰는 태그 horizontal swipe.
- **이미지 attachment viewer**: 메모 안 첨부 이미지 다중 view (좌우 swipe + dot indicator).
- 모바일 swipe gesture 적극.

#### Scroll Area — Desk
- **메모 본문 긴 글**: 메모 안 scroll area로 분리 — 외부 페이지 scroll과 독립.
- **태그 list**: 50+ 태그 horizontal scroll area.
- hover variant — 모바일 친화 (scrolling 중에만 표시 옵션도 OK).

#### Resizable — Desk
- 거의 사용 안 함 — 모바일 우선이라 layout 조정 UX 부적합.
- 예외: 데스크탑 web에서 메모 list ↔ detail 2-pane resizable (선택 사용자만).

### Extras batch (v72 추가)

Desk(B2C) 5 추가 컴포넌트 — 모바일 우선.

#### Sonner — Desk
- **bottom-center position** 모바일 default — safe-area-inset-bottom 고려, 한 손 조작 시 시야 안.
- 메모 저장 / 동기화 / 백업 stack — 동시 다수 등장 가능.
- "실행 취소" action: 메모 삭제 후 5초 안에 클릭으로 복구.
- 데스크탑은 bottom-right 변경 (모바일 ↔ 데스크탑 position 분기).

#### Aspect Ratio — Desk
- **16:9** 메모 attachment image preview
- **1:1** 가계부 카테고리 icon, profile avatar
- **9:16** 메모 vertical video (TikTok/Reels 톤 첨부)
- **4:5** Instagram square+ 이미지 (소셜 import)
- gallery grid (메모 attachment 다중 image): 1:1 + scroll-snap.

#### Chart — Desk
- **pie / donut**: 가계부 카테고리 점유율 — 식비/교통/취미 등 비율
- **line**: 월별 잔액 변화, 주간 할일 완료 수
- **bar**: 월별 지출 비교, 카테고리별 합계
- chart palette Desk primary(blue)와 충돌 회피 — chart-blue 비활성, chart-violet/orange 우선
- 모바일 친화: 차트 height 200-240, legend 하단 가로 배치.

#### Date Range Picker — Desk
- **single picker** 모바일 default — 1 calendar 표시.
- 가계부 기간 통계: preset "이번 주" / "이번 달" / "지난 달" / "올해".
- 메모 검색 기간 필터: preset "오늘" / "지난 7일".
- 모바일 swipe gesture: 좌우 swipe로 월 이동.

#### Time Picker — Desk
- **wheel picker** 모바일 default — iOS/Android native scroll wheel 활용.
- step **15분** default — 일상 스케줄 큰 단위.
- 12h format 옵션 — B2C 친근 톤.
- 할일 due time: 시각 + 알림 페어 ("16:30 알림").

### Extras-2 batch (v73 추가)

Desk(B2C) 5 추가 shadcn 누락 컴포넌트 — 모바일 우선.

#### Banner — Desk
- **시스템 점검 안내** info variant — "오늘 23:00-24:00 동기화 중단" 미리 알림, dismiss 가능.
- **신규 기능 안내** info variant — "가계부 카테고리 자동 분류 기능 추가" 한 번만 표시 (dismiss 후 재표시 안 함).
- **백업 실패 경고** error variant — "최근 7일간 백업 실패. 재시도해주세요" sticky 유지.
- 모바일 — header 아래 fullwidth, dismiss 후 자리 차지 안 함.
- 사용자가 직접 dismiss 전엔 유지 — localStorage `desk-banner-dismissed-{id}`.

#### Tag / Chip — Desk
- **메모 태그 input** — "#할일 #업무 #2026" multi-tag input, enter로 추가.
- **가계부 카테고리 chip** — 거래 입력 시 categories chip 단일 선택.
- **할일 priority chip** — "긴급 / 보통 / 미루기" 3개 chip toggle.
- input variant 우선 — 메모 태그 자유 입력 핵심.
- 자동완성 dropdown 결합 — 기존 tag list 제안 (recently used).

#### Popover — Desk
- **카테고리 quick edit** — 가계부 거래 row의 카테고리 클릭으로 popover, 다른 카테고리 선택 후 자동 닫기.
- **메모 quick action** — 메모 카드 우상단 ⋯ 클릭으로 popover (편집/삭제/공유/duplicate).
- **할일 due-date 빠른 변경** — 할일 카드 due chip 클릭으로 calendar popover.
- 모바일 — popover 자동으로 bottom sheet으로 전환 (small screen detection).
- bottom-end placement default — 카드 list context.

#### File Upload — Desk
- **영수증 다중 업로드** — 가계부 거래에 영수증 사진 multi (max 3장 / 거래 1건).
- **메모 image attachment** — 메모 본문에 inline image (max 5장 / total 30MB).
- **드래그-드롭** + 카메라 capture (`accept="image/*" capture="environment"`) 모바일.
- 허용 type: 이미지 only (JPG/PNG/HEIC) — 영수증·사진 메모 위주.
- 자동 압축: 5MB 초과 시 client-side resize 후 업로드 (네트워크 + storage 절약).

#### Treeview — Desk
- **가계부 카테고리 tree** — 대분류(식비/교통/주거) → 중분류(외식/배달/마트) 2단계.
- 카테고리 노드 우클릭 (모바일 long-press) — 편집/하위 추가/삭제 popover.
- 카테고리 추가 시 부모 자동 expand — 새 노드 즉시 보이도록.
- **메모 폴더 tree** — 메모 그룹화, 폴더 안 메모 leaf node count 표시.
- 모바일 — single-column 트리, 들여쓰기 12px (좁은 화면 효율).
