---
version: alpha
name: Porest
description: |
  People + Forest. Dual-brand design system for Porest HR (B2B) 
  and Porest Desk (B2C). Optimized for Korean-first audiences,
  all-ages accessibility.

colors:
  # === Brand-specific 토큰은 DESIGN.hr.md / DESIGN.desk.md로 분리 (v17) ===
  # primary, primary-light, border-focus, border-focus-light: 각 brand 파일에서 정의
  
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
  
  # === border-focus는 brand 파일로 분리 (v17) ===
  
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
  # === Brand-specific 컴포넌트(button-primary, button-outlined-on-dark)는
  # === DESIGN.hr.md / DESIGN.desk.md로 분리 (v17)
  
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
  
  # === focus-ring 컴포넌트는 brand 파일로 분리 (v17)
  
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

## Overview

Porest는 "사람과 일상이 숲처럼 자라나는" 가치를 담은 듀얼 브랜드 시스템입니다.
HR(조직 관리, B2B)과 Desk(개인 생산성, B2C)는 동일한 골격을 공유하되 primary 색상으로만 분기합니다.

레퍼런스 — 토스의 신뢰감 있는 미니멀리즘, 전 연령 가독성.

### 파일 분리 (v17부터)
- **`DESIGN.md`** (이 파일): 공유 baseline — typography, spacing, rounded, neutral colors, neutral components. brand-agnostic이므로 `primary` literal 미정의 → lint missingPrimary warning 1건 영구 수용(공유 라이브러리 진실 신호).
- **`DESIGN.hr.md`**: HR 브랜드 self-contained 시스템 — 공유 토큰 복제 + HR primary `#357B5F` + HR brand 컴포넌트. brand 컨텍스트가 암묵적이라 토큰명에 `-hr` 접미사 없음(`primary`, `border-focus`, `button-primary` 등).
- **`DESIGN.desk.md`**: Desk 브랜드 self-contained 시스템 — 공유 토큰 복제 + Desk primary `#0147AD`.
- **lint**: `npm run lint:all`로 3파일 검증. HR/Desk 파일은 0 warnings, DESIGN.md만 missingPrimary 1건.
- **공유 토큰 변경 시**: 3파일 모두 수동 동기 — design.md spec이 cross-file token reference 미지원이라 자동화 불가.

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
- 브랜드 primary 호환 (버튼/아이콘 1차 용도): brand 파일에서 자체 검증. v1 시점 `accent-*` 시리즈는 라이트 표면 위 ~5:1대로 본문 통과 (v14에서 `primary-*` 신규 값으로 갱신, brand 파일 v14 prose 참조).
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
| text-on-accent `#FFFFFF` | (brand primary) | brand 파일에서 검증 | — |

#### HR / Desk 듀얼 브랜드
- `text-on-accent` 단일 값(`#FFFFFF`)이 양 브랜드 primary에서 본문 4.5:1 통과 (각 brand 파일에서 자체 검증) — 브랜드별 분기 불필요.
- primary·secondary는 neutral 토큰으로 양 브랜드 공유. accent 색상에 의존하지 않음.

### Border (v3 추가)

border는 시맨틱 계층을 둘로 분리합니다 — 장식적 외곽선과 필수 UI 외곽선은 WCAG 1.4.11 (Non-text contrast 3:1) 적용 대상이 다르기 때문입니다.

- **default**: 카드 윤곽, 섹션 divider 등 **장식적** 분리. 표면과 1.1~1.5:1 대비로 미묘하게만 구분 — WCAG 3:1 비대상(콘텐츠 식별이 표면 색상으로 이미 가능).
- **strong**: 입력 필드 외곽선, 비채움 버튼 보더 등 **필수 UI 컴포넌트** 외곽선. 인접 모든 표면(`surface-default`, `bg-page`, `surface-input`)에 대해 3:1 이상 — UI 컴포넌트 식별이 외곽선에 의존하므로 strict.

#### 추가 이유
1. v1 surface 페어 + v2 text 페어가 확정됐으므로 표면 위 컴포넌트 외곽선 검증이 가능 — 입력·버튼 컴포넌트 스펙 작성의 차단 요소 해소.
2. 장식/필수 분리로 디자이너가 "어느 border를 써야 3:1을 충족하는가" 의사결정을 토큰 이름에서 즉시 판단 가능.
3. `border-focus`는 이번 배치에서 보류 — 당시 brand accent가 어두운 표면 대비 3:1 미달(brand 파일 v7 prose 참조)이라 brand light 변형 도입 후 추가가 안전. 임시로는 `border-strong` 활용 가능. (v7~v16에서 단계적 해소 완료, brand 파일에서 `border-focus` 토큰 정의됨.)

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

**현재 사용 hex는 v51-v52 vivid refresh 후** (아래 `Semantic refresh` 섹션 참조). v10 시점 hex는 변천 history.

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

### Semantic refresh — vivid tone (v51 추가)

base 4개 vivid 갱신. light 변형은 v20에서 검증된 다크 alert contrast 회귀 회피 위해 보존.

| 토큰 | v10 → v51 | 변화 |
|---|---|---|
| `success` | `#117A3A` → `#16803F` | deep forest → emerald (Tailwind green-700 톤) |
| `error` | `#C53030` → `#DC2626` | brick → vivid red (Linear/Tailwind red-600 톤) |
| `warning` | `#A85800` → `#C84D0E` | brown amber → 명확한 orange. v52에서 미세 brighten (1차 `#C2410C` 어두운 인상 → L 0.15 → 0.17) |
| `info` | `#006395` → `#1D6FCB` | deep navy → sky blue |

#### 변경 이유
v10 base는 본문 4.5:1 안전 마진을 위해 L 0.13~0.17로 어둡게 잡혀 UI 무드가 칙칙. `text-on-accent`(white) 위 contrast 5~7:1로 과도한 마진 — L을 0.16~0.22로 조정해 4.5:1 통과 (`success`는 emerald hue 특성상 가장 빠듯하게 L 0.16). hue rotate는 최소화 (warning만 brown amber → orange로 미세 이동 — 갈색 인상이 칙칙함의 주범).

#### 색상 대비 — lint 실측 결과 (손계산 아님)

기존 8 페어를 그대로 사용 — components 섹션 변경 없음. lint가 새 hex 기준으로 contrast-ratio 자동 재검증.

| component | bg | text | v51 lint 판정 |
|---|---|---|---|
| `badge-success` | success `#16803F` | text-on-accent | ✅ ≥4.5:1 |
| `badge-error` | error `#DC2626` | text-on-accent | ✅ ≥4.5:1 |
| `badge-warning` | warning `#C84D0E` | text-on-accent | ✅ ≥4.5:1 |
| `badge-info` | info `#1D6FCB` | text-on-accent | ✅ ≥4.5:1 |
| `alert-text-success` | surface-default | success | ✅ ≥4.5:1 |
| `alert-text-error` | surface-default | error | ✅ ≥4.5:1 |
| `alert-text-warning` | surface-default | warning | ✅ ≥4.5:1 |
| `alert-text-info` | surface-default | info | ✅ ≥4.5:1 |

(`npm run lint:all` 통과 — 0 errors, 0 contrast warnings. 8 페어 전부 silent pass.)

#### light 변형 보존 이유 (v51 시점)
v51에서는 `success-light`/`error-light`/`warning-light`/`info-light`를 v20 검증 hex 그대로 유지 — 변경 시 다크 alert contrast 회귀 위험을 우선 고려. **v53에서 vivid 톤으로 갱신** — 아래 `Semantic light refresh` 섹션 참조.

### Semantic light refresh — vivid tone (v53 추가)

v51에서 보류했던 light 변형 4개를 base와 hue 일관성 + 시각 통일감 위해 vivid 톤으로 갱신. Tailwind 400 톤 채택 (base는 600/700, light는 400 — 표준 lighter scale).

| 토큰 | v20 → v53 | 변화 |
|---|---|---|
| `success-light` | `#5DC07B` → `#4ADE80` | cool emerald → vivid green-400 (saturation ↑) |
| `error-light` | `#F08080` → `#F87171` | coral 유지, 살짝 saturated red-400 |
| `warning-light` | `#E8A05A` → `#FB923C` | amber → 명확한 orange-400 (가장 큰 변화 — base와 hue 일치) |
| `info-light` | `#6FAEDF` → `#60A5FA` | sky 유지, vivid blue-400 |

#### 변경 이유
1. v51 base를 vivid 톤으로 갱신 후 v20 light는 hue 일관성 약간 어긋남 (warning base orange vs light amber, success base emerald vs light cool-green).
2. 다크 alert 4.5:1 contrast 마진은 v20 4.75~6.5:1로 충분 — vivid 톤(L 0.4~0.6)으로 가도 통과.
3. Tailwind 400 톤 채택 — base 600/700과 hue 일관, lighter scale 표준.

#### 색상 대비 — lint 실측 결과 (손계산 아님)

4 페어를 components 섹션의 `alert-text-{semantic}-on-dark`로 lint contrast-ratio 직접 검증:

| component | text | bg | v53 lint 판정 |
|---|---|---|---|
| `alert-text-success-on-dark` | success-light `#4ADE80` | surface-input-dark | ✅ ≥4.5:1 |
| `alert-text-error-on-dark` | error-light `#F87171` | surface-input-dark | ✅ ≥4.5:1 |
| `alert-text-warning-on-dark` | warning-light `#FB923C` | surface-input-dark | ✅ ≥4.5:1 |
| `alert-text-info-on-dark` | info-light `#60A5FA` | surface-input-dark | ✅ ≥4.5:1 |

(`npm run lint:all` 통과 — 0 errors, 0 contrast warnings. 4 페어 silent pass.)

#### 채움 fill 비호환 유지
v20과 동일 — light 위에 white 올리면 contrast 2~3:1 미달. 다크 모드 채움 badge는 여전히 base 색 + 외곽선 보강 또는 별도 패턴(향후 검토).

### Chart palette (v21 도입, 4 배치 완료)

데이터 시각화용 hue-균등 10색 팔레트. 양 brand 공유(unified, primary는 brand-specific 유지). L≈0.16-0.18로 통일해 어떤 색이 데이터 차원을 강조하지 않게 시각 균형 확보.

| Batch | Status | 토큰 | 표면 | L 범위 |
|---|---|---|---|---|
| v21 (1/4) | ✅ | `chart-{red,orange,yellow,green,blue}` | light bg-page | 0.15-0.19 |
| v22 (2/4) | ✅ | `chart-{indigo,violet,pink,brown,gray}` | light bg-page | 0.16-0.19 |
| v23 (3/4) | ✅ | `chart-{red,orange,yellow,green,blue}-light` | dark surface | ≈0.45-0.55 |
| v24 (4/4) | ✅ | `chart-{indigo,violet,pink,brown,gray}-light` | dark surface | ≈0.45-0.55 |

#### 손계산 휘도 (lint sparse 검증, contrast 룰 미발동)

| 토큰 | hex | L | bg-page 위 contrast |
|---|---|---|---|
| `chart-red` | `#C73838` | 0.153 | 4.85 |
| `chart-orange` | `#B36418` | 0.187 | 4.10 |
| `chart-yellow` | `#8C7400` | 0.180 | 4.22 |
| `chart-green` | `#2D8060` | 0.169 | 4.45 |
| `chart-blue` | `#2C70BF` | 0.159 | 4.66 |

`chart-orange`(4.10), `chart-yellow`(4.22)는 본문 4.5:1 미달이나 chart fill 용도라 **UI 1.4.11 (3:1)** 기준 통과 — chart bar/line/marker로 사용 시 적정. 차트 위 inline 텍스트로는 사용 부적합 (텍스트는 `text-primary`/`text-secondary` 사용).

#### v22 hex (light surface 추가 5색 — sparse 손계산 휘도)

| 토큰 | hex |
|---|---|
| `chart-indigo` | `#5E60C8` |
| `chart-violet` | `#8B4DBA` |
| `chart-pink` | `#B83B7A` |
| `chart-brown` | `#9A6536` |
| `chart-gray` | `#6B7484` |

v21 동일 정책 — light 표면 위 chart fill, UI 1.4.11 (3:1) 기준 통과. 일부 본문 4.5:1 미달도 chart bar/line/marker 용도 적정.

#### v23-v24 hex (dark surface — `chart-*-light`, L≈0.45-0.55)

| 토큰 | hex | 토큰 | hex |
|---|---|---|---|
| `chart-red-light` | `#ECA0A0` | `chart-indigo-light` | `#ABB0F0` |
| `chart-orange-light` | `#E8B266` | `chart-violet-light` | `#D2A8EC` |
| `chart-yellow-light` | `#D4B83A` | `chart-pink-light` | `#ECA0BC` |
| `chart-green-light` | `#6BCB86` | `chart-brown-light` | `#DCB088` |
| `chart-blue-light` | `#7BBBED` | `chart-gray-light` | `#B5BBC5` |

다크 표면 위 chart fill — 정량 lint 검증은 `chart-color-{name}-on-dark` 컴포넌트 sparse 매핑 시 활성 (현재 `chart-color-{name}` 단일 매핑, light surface 기준).

#### sparse component 패턴
각 chart 토큰은 `chart-color-{name}` (backgroundColor만)에서 referencing. v9 divider, v13 disabled-label, v16 focus-ring과 동일 — orphan 회피 + spec 한계(chart는 component property 아님) 우회.

#### 듀얼 브랜드 — unified (배치 1과 다름)
- chart는 functional data palette — brand 분기 비대상. HR/Desk 동일 10/20색 사용 (v22 5색 + v23-v24 dark 변형 모두 동일 정책).
- primary는 brand별 유지(`DESIGN.hr.md` `#357B5F`, `DESIGN.desk.md` `#0147AD`). chart-green과 primary-hr는 비슷한 hue지만 별도 토큰 — 역할 분리.

#### v20 추가 — semantic 다크 변형 4개

다크 표면 위 alert·toast·인라인 semantic 텍스트용 lightness 변형. base는 라이트 표면 전용(흰 텍스트 fill 4.5:1↑), light는 다크 표면 위 텍스트 4.5:1↑.

**현재 사용 hex는 v53 vivid refresh 후** (Tailwind 400 톤). v20 시점 hex는 변천 history.

| 토큰 | v20 hex (이전) | v53 hex (**현재**) | 다크 표면 contrast (Tailwind 400 톤) |
|---|---|---|---|
| `success-light` | `#5DC07B` | `#4ADE80` | surface-default-dark ≥4.5:1 ✅ (Tailwind green-400) |
| `error-light` | `#F08080` | `#F87171` | surface-default-dark ≥4.5:1 ✅ (Tailwind red-400) |
| `warning-light` | `#E8A05A` | `#FB923C` | surface-default-dark ≥4.5:1 ✅ (Tailwind orange-400) |
| `info-light` | `#6FAEDF` | `#60A5FA` | surface-default-dark ≥4.5:1 ✅ (Tailwind blue-400) |

4개 컴포넌트(`alert-text-{semantic}-on-dark`)에서 lint contrast 룰로 검증 — 모두 ≥4.5:1 통과.

**채움 fill 비호환** (의도): white(`text-on-accent`)을 light 변형 위에 올리면 L 0.35~0.43이라 contrast 2.2~2.7로 미달. 다크 모드 채움 badge는 base 색 유지 + 외곽선 보강 또는 별도 패턴(향후 v21+에서 검토).

#### HR / Desk 듀얼 브랜드
- 8개 토큰 모두 양 브랜드 동일 사용 — functional state 전달은 브랜드 분기 비대상.
- 시각 차별화: `success`(forest)는 HR primary(emerald 계열)와 미세 hue 분리, `info`(deep navy)는 Desk primary(vibrant blue 계열)와 채도 분리. 단 단독 노출 시 식별성을 위해 컴포넌트 레벨에서 아이콘(✓/✕/!/i) 동반을 권장(prose 가이드 영역).
- 컴포넌트는 brand 컨텍스트(HR vs Desk) × 모드 컨텍스트(light vs dark) 매트릭스로 4값 분기 — 토큰 자체에 분기 표현됨.

### Brand history (v7~v16) — brand 파일로 이전 (v17 분리)

v7 (brand light variants) · v14 (brand refresh + temporary bg-page fork) · v16 (border-focus) prose는 모두 brand-specific이므로 v17 file split 시 `DESIGN.hr.md` / `DESIGN.desk.md`로 이전. 본 파일은 brand-agnostic이라 history도 보유하지 않음.

요약 trace (전체는 brand 파일 참조):
- v7: 어두운 표면용 brand light variant 도입 (`primary-*-light`)
- v8: `accent-*-on-dark` → `accent-*-light` 명명 정정
- v14: `accent-*` → `primary-*` rename + brand 톤 갱신, bg-page를 일시 brand 분리
- v15: bg-page 단일 `#F5F6FA`로 재통합 (현재 상태)
- v16: `border-focus-*` 시맨틱 alias 도입

본 파일에 남은 v15 핵심 사실: **`bg-page` `#F5F6FA` 단일 — HR/Desk 공유**. 휘도 L=0.9223로 모든 neutral 텍스트 contrast headroom 충분.

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

### v55 추가 — display 4종 (Airbnb reference)

영문 marketing/hero 영역의 풍부한 typography 톤을 위해 4 추가. 한국어 본문은 v5 정의(`body` 15/1.6) 그대로 보존 — 영문 hero/rating 같은 영역만 신규 토큰 사용.

| 토큰 | size | weight | line-height | letter-spacing | 주 용도 |
|---|---|---|---|---|---|
| `rating-display` | 64px | 700 | 1.1 | -1px | rating/score 큰 숫자 (4.81 등) |
| `display-xl` | 28px | 700 | 1.43 | — | 영문 marketing display (Inspiration ...) |
| `display-lg` | 22px | 500 | 1.18 | -0.44px | 위치/주소 강조 (Close to ...) |
| `display-md` | 21px | 700 | 1.43 | — | 섹션 헤더 (What this place offers) |

#### 추가 이유
1. v5 7단계 (caption / body / body-strong / heading-{sm,md,lg,xl})는 한국어 본문 위계 충실 — 영문 marketing/hero 영역의 풍부한 display 톤은 부재.
2. **Airbnb reference**: `rating-display` (64/700/1.1/-1) 큰 숫자, `display-xl` (28/700/1.43) 영문 hero, `display-lg` (22/500/1.18/-0.44) 위치/주소 강조, `display-md` (21/700/1.43) 섹션 헤더 — Airbnb Cereal VF "modest weights" 톤 (weight 400/500/600/700 4단계).
3. **letter-spacing 첫 사용**: 큰 글자(`rating-display` -1px, `display-lg` -0.44px) trailing 시각 균형. design.md spec letterSpacing(Dimension) 지원으로 yaml 정형 정의.

#### `heading-xl` 32 vs `display-xl` 28 — 사용 컨텍스트 분리
- **`heading-xl` 32px / 1.25 / 700**: 한국어 페이지 제목 톤 (Toss 톤, line-height 압축).
- **`display-xl` 28px / 1.43 / 700**: Airbnb 영문 marketing hero 톤 (line-height 여유, marketing copy 가독).
- 한국어 본문 레이아웃은 `heading-xl` 권장, 영문 영역(landing page hero, rating 큰 숫자, score 영역)은 `display-*` 사용.

#### 한국어 컨텍스트 — 보수적 적용
- `body` (15/1.6), `body-strong` (15/1.6), `caption` (12/1.5)는 v5 그대로 — Airbnb `body-md` (16/1.5), `caption` (14/1.29)와 다름. **명명 충돌 회피** 위해 Airbnb 영문 본문 톤 채택 안 함.
- 향후 영문 본문 사용 사례 등장 시 별도 batch (`body-en` 등) 검토.

#### export 통합 (build-tailwind-v4.mjs)
- 기존 fontSize / lineHeight / fontWeight modifier 외 **letterSpacing modifier 추가**: `--text-{name}--letter-spacing: {value};`
- v55 4 토큰 모두 export. letterSpacing 미정의 토큰은 modifier 누락 (default `normal`).

#### HR / Desk 듀얼 브랜드
- v5 정신 동일 — 모든 typography 토큰 brand-neutral. 양 브랜드 동일 스케일.
- 사용 컨텍스트 차이는 컴포넌트 레벨 (HR dashboard 페이지 제목 `heading-xl`, Desk landing page hero `display-xl`).

### v56 추가 — title / body / caption-md (Airbnb reference batch 2)

Airbnb 14단계 reference 중 5종 추가 — title 2 + body 2 + caption-md (명명 충돌 회피). 한국어 본문 영역(`body` 15/1.6, `caption` 12/1.5)은 v5 그대로 보존, 영문 marketing/list 영역에서 신규 토큰 사용.

| 토큰 | size | weight | line-height | 주 용도 (Airbnb reference) |
|---|---|---|---|---|
| `title-md` | 16px | 600 | 1.25 | 카드 제목, list item 제목 (예: "Wilmington") |
| `title-sm` | 16px | 500 | 1.25 | 보조 제목, sidebar nav 항목 (예: "Support") |
| `body-md` | 16px | 400 | 1.5 | 영문 본문 (예: 메모/설명 단락) |
| `body-sm` | 14px | 400 | 1.43 | 영문 보조 본문 (예: 메타 한 줄 — "Cottage rentals · Mar 12–18") |
| `caption-md` | 14px | 500 | 1.29 | 영문 캡션 (예: "Where · When · Who") |

#### caption 명명 정책 — 3-tier 구성
- 우리 기존 `caption` 12px / 1.5 / 400 (한국어 본문 캡션, v5) **보존**.
- Airbnb의 `caption` 14px 토큰은 **명명 충돌 회피** 위해 `caption-md`로 별도 추가.
- v57에서 `caption-sm` 13px 추가 예정 → 최종 3-tier: `caption` 12 (한국어) / `caption-md` 14 (영문 큰 캡션) / `caption-sm` 13 (작은 영문 캡션, footer/legal).

#### body 명명 정책 — 듀얼 시스템
- `body` 15px / 1.6 / 400 (v5, **한국어 본문**, Toss/네이버 톤) 그대로 보존.
- `body-md` 16px / 1.5 / 400 (Airbnb, **영문 본문**, marketing/landing) 신규 추가.
- 한국어 영역은 `body`, 영문 영역(landing page 설명 단락)은 `body-md` 사용. line-height 1.5 vs 1.6 차이는 한글 받침 영역 가독성을 1.6이 더 잘 다룸.

#### `body-strong` (v5) vs `title-md` (v56) — 비교
- `body-strong` 15/600/1.6: **본문 강조**, 라벨, 버튼 텍스트 (한국어 본문 영역).
- `title-md` 16/600/1.25: **카드/list 제목** (영문 영역, line-height 압축).
- 둘 다 600 weight지만 size + line-height 다름 — 한국어 강조와 영문 제목 분리.

#### 추가 이유
1. v55에서 큰 영역(rating/display)만 추가, 영문 본문/제목/캡션 영역은 미커버 — Airbnb listing card / detail row 톤 부재.
2. Airbnb 영문 톤은 line-height 압축형(1.25 ~ 1.5) — 한국어 1.6 대비 vertical density 높음. 영문 본문 영역에서 자연스러운 정보 밀도.
3. **명명 충돌 회피**: Airbnb의 `caption` 14를 그대로 채택하면 우리 `caption` 12와 충돌. `caption-md` 명명으로 두 시스템 공존.

#### HR / Desk 듀얼 브랜드
- v5 정신 — typography brand-neutral. 양 브랜드 동일.
- 사용 컨텍스트: HR dashboard 데이터 행은 한국어 `body` 15/1.6 위주, Desk landing/marketing은 `body-md` 16/1.5 + `title-md` 16/600 결합 가능.

### v57 추가 — caption-sm / badge / uppercase-tag / button-md / nav-link (Airbnb batch 3)

Airbnb 14단계 reference 마지막 5종 — 작은 영역(caption-sm/badge/uppercase-tag) + 컴포넌트 텍스트(button-md/nav-link). 14단계 reference 적용 완료.

| 토큰 | size | weight | lh | letter-spacing | 주 용도 |
|---|---|---|---|---|---|
| `caption-sm` | 13px | 400 | 1.23 | — | 작은 영문 캡션 — footer, legal copy (예: "© 2026 ...") |
| `badge` | 11px | 600 | 1.18 | — | badge text (예: "Guest favorite") |
| `uppercase-tag` | 8px | 700 | 1.25 | 0.32px | 영문 marketing pill (예: "NEW") — uppercase는 CSS text-transform |
| `button-md` | 16px | 500 | 1.25 | — | 버튼 텍스트 (Airbnb default) |
| `nav-link` | 16px | 600 | 1.25 | — | 네비 링크 (예: "Homes · Experiences · Services") |

#### caption 3-tier 완성 (v5 + v56 + v57)
- `caption` 12px / 1.5 / 400 — 한국어 본문 캡션 (Toss/네이버 톤)
- `caption-md` 14px / 1.29 / 500 — Airbnb 영문 큰 캡션
- `caption-sm` 13px / 1.23 / 400 — Airbnb 작은 영문 캡션 (footer/legal)

위계: caption-md > caption (size 기준) > caption-sm. 사용 컨텍스트는 한국어/영문 영역 분리.

#### `uppercase-tag` 8px 가독성 한계 — 사용 영역 제약
- 8px는 본문 가독성 미달 — **영문 marketing tag/pill 영역만** 사용 (예: "NEW", "BETA", "TRENDING").
- WCAG 1.4.4 (Resize text 200%): 8px → 16px (zoom 후) 가독 가능. 다만 default 8px에서는 노안/저시력 사용자 불편 — 본문 미사용 원칙.
- **uppercase 처리는 CSS** (`text-transform: uppercase`). yaml 토큰값은 size/weight/lh/letterSpacing만 — design.md spec textTransform 미지원.
- 한국어 환경에서는 거의 미사용 — 한글은 uppercase 개념 없음. 로마자 inline tag 영역만.

#### `body-strong` (v5) vs `button-md` (v57) — 비교
- `body-strong` 15/600/1.6: 한국어 버튼 텍스트 (라벨/입력 강조 겸용)
- `button-md` 16/500/1.25: Airbnb 영문 버튼 텍스트
- HR/Desk 컴포넌트 spec에 명시 — 한국어 버튼 영역 `body-strong`, 영문 버튼 영역 `button-md`.

#### `nav-link` vs 기존 — 신규 영역
- v17까지 nav 텍스트 토큰 부재 — Sidebar nav에서 `body-strong` 또는 `body` 사용.
- `nav-link` 16/600/1.25는 **글로벌 nav / 네비 메뉴 텍스트 전용** — line-height 압축, weight 600. Sidebar nav 항목, header utility links.

#### 추가 이유
1. v55-v56까지 Airbnb display + title/body 추가. v57로 작은 영역(caption-sm/badge/uppercase-tag) + 컴포넌트 텍스트(button-md/nav-link) 마무리 — 14단계 reference 완성.
2. `badge` 11px는 우리 기존 badge 컴포넌트(prose에 `caption` 12px 사용)에서 미세 조정 가능 — 별도 토큰화로 명확.
3. `nav-link`는 Sidebar/Header nav 컴포넌트에 **dedicated typography** — 컴포넌트 spec 별도 batch에서 매핑.

#### HR / Desk 듀얼 브랜드
- 양 브랜드 공유. 사용 컨텍스트 차이는 컴포넌트 레벨.
- HR dashboard nav는 `nav-link` 16/600 권장 (데이터 화면 nav 강조), Desk bottom nav는 `body-strong` 15/600 (모바일 친화 작은 사이즈) 가능 — 컴포넌트 spec 결정.

#### 자동 검증
- design.md lint contrast 룰은 색상에만 적용 — typography 자체는 통과.
- letterSpacing은 v55부터 modifier로 export (`--text-{name}--letter-spacing`).

### Responsive hero typography (v60 추가, prose-only spec)

페이지 hero / marketing landing의 큰 typography는 viewport size에 따라 스케일 분기. v54 Breakpoints + v55-v57 typography scale 결합. **토큰 추가 0** — 기존 토큰 재사용 + 영문 부재 영역은 사용 사례 등장 후 별도 batch.

#### 한국어 hero scale (default 권장)
한글은 영문 대비 자형 너비 큼 — Apple/Airbnb 영문 hero(56-28) 그대로 적용 시 모바일에서 줄바꿈/읽기 부담. 기존 토큰 재사용으로 보수적 4단계.

| Breakpoint | 토큰 | size / lh / weight | 사용 |
|---|---|---|---|
| `breakpoint-xl` (1069+) | `heading-xl` | 32 / 1.25 / 700 | Desktop hero (한국어 페이지 제목, Toss 톤) |
| `breakpoint-lg` (834~1068) | `display-xl` | 28 / 1.43 / 700 | Tablet landscape hero |
| `breakpoint-md` (736~833) | `heading-lg` | 24 / 1.3 / 700 | Tablet portrait hero |
| `breakpoint-sm` (≤640) | `display-sm` | 20 / 1.20 / 600 | Phone hero |

CSS 패턴 (mobile-first, `@media (min-width)`):

```css
.hero-h1 {
  font: var(--text-display-sm--font-weight) var(--text-display-sm) / var(--text-display-sm--line-height) var(--font-sans);
}
@media (min-width: 736px) {
  .hero-h1 { font: var(--text-heading-lg--font-weight) var(--text-heading-lg) / var(--text-heading-lg--line-height) var(--font-sans); }
}
@media (min-width: 834px) {
  .hero-h1 { font: var(--text-display-xl--font-weight) var(--text-display-xl) / var(--text-display-xl--line-height) var(--font-sans); }
}
@media (min-width: 1069px) {
  .hero-h1 { font: var(--text-heading-xl--font-weight) var(--text-heading-xl) / var(--text-heading-xl--line-height) var(--font-sans); }
}
```

#### 영문 hero scale (Apple Store reference, 일부 토큰 부재)
영문 marketing landing 영역에서는 Apple 톤(56-28)이 reference. 기존 토큰에 **56/40/34는 부재** — inline CSS 또는 v55 `display-xl` 활용. 영문 marketing 사용 사례 등장 시 토큰화 batch 검토.

| Breakpoint | 영문 size / weight / lh | 매핑 (best fit) | 비고 |
|---|---|---|---|
| `breakpoint-xl` | 56 / 700 / 1.05 | inline CSS | Hero 56 큰 마케팅 헤더 — 토큰 부재 |
| `breakpoint-lg` | 40 / 700 / 1.1 | inline CSS | Tablet landscape — 토큰 부재 |
| `breakpoint-md` | 34 / 700 / 1.15 | inline CSS | Tablet portrait — 토큰 부재 |
| `breakpoint-sm` | 28 / 700 / 1.43 | `display-xl` (v55) | Phone, v55 display-xl 정확 일치 |

영문 hero 토큰화 후속 작업(가칭): `hero-xl-en` (56) / `hero-lg-en` (40) / `hero-md-en` (34) — 사용 사례 명확 시 v6X batch.

#### 사용 가이드
1. **한국어 hero가 default** — Toss/네이버 톤. 32 → 28 → 24 → 20 4단계. 모든 페이지 제목에 적용.
2. **영문 hero는 marketing landing 한정** — 기본 페이지(dashboard/list/detail)는 한국어 scale.
3. **breakpoint 분기 = mobile-first** — 작은 size부터 정의, `@media (min-width: ...)`로 확장.
4. **letter-spacing**: 한국어 hero는 letter-spacing 0 또는 미세 negative 권장(한글은 자간 기본 충분). 영문 hero 56px는 -1px 권장 (`rating-display`의 modifier 패턴 참조).

#### 추가 이유
1. v54 Breakpoints prose에 "Hero typography scale: 56 → 40 → 34 → 28 (responsive type — 별도 spec)" 표시. 별도 spec 작성으로 결정 차단 해소.
2. v55-v57 typography 21 토큰이 영역(한국어/영문 marketing/UI 컴포넌트)별 분리됐음 — hero scale도 한국어/영문 두 spec 명시.
3. **토큰 추가 0** — 기존 토큰 재사용 + 영문 부재 영역은 inline CSS 또는 후속 batch.

#### 듀얼 브랜드
- HR (B2B): 한국어 hero scale 위주. 직원 dashboard 페이지 제목(`heading-xl` 32) → 모바일 `display-sm` 20. landing/marketing 영역 거의 없음.
- Desk (B2C): 한국어 hero + 영문 marketing 모두 가능. 개인 메모 hero는 한국어, 마케팅 landing은 영문 가능 (사용 사례 등장 후 영문 토큰화 검토).

#### 자동 검증 미적용
typography responsive scale은 functional layout spec — contrast 룰 무관. spec 외부(prose-only)라 lint 영향 0.

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

반응형 layout breakpoint — 5단계 (Apple Store reference). spec이 breakpoint 카테고리 미지원이라 prose-token 패턴(shadow/motion/overlay와 동일) — yaml 정의 없이 표만 운영. 모든 파일(DESIGN.md / .hr.md / .desk.md) 수동 동기.

| 토큰 | 값 | 의미 (Apple Store 가이드) |
|---|---|---|
| `breakpoint-sm` | `640px` | Phone max — 이하 single-column tiles, hero h1 34px |
| `breakpoint-md` | `736px` | Tablet portrait — global nav hamburger collapse |
| `breakpoint-lg` | `834px` | Tablet landscape — global nav full, 3-col → 2-col grids |
| `breakpoint-xl` | `1069px` | Desktop — full layout, 4-5 col store grids |
| `breakpoint-2xl` | `1441px` | Wide — content locks at 1440px |

#### 추가 이유
1. v1~v53까지 토큰은 색상·typography·spacing·radius·shadow·motion·overlay만 — 반응형 breakpoint 부재. 컴포넌트 spec(Button/Card/Tabs)에 "모바일 권장 사이즈 lg" prose는 있으나 *어떤 width에서* 모바일이 시작되는지 토큰화되지 않음 → 결정 차단.
2. **Apple Store reference**: iPad portrait/landscape 분리(736/834) + desktop 시작(1069) + wide lock(1441)로 한국 디자이너 친화적 모바일 우선 톤. iPad 라인업(mini portrait 768 / Air landscape 1180 / Pro 11" landscape 1194 / Pro 12.9" landscape 1366) 정합.

#### 단위·명명
- **px**: 한국 디자이너 친화적 + Figma frame 단위 일치 + Apple HIG 친화 (rem 변환은 build 단계에서 가능).
- **`breakpoint-{size}`**: Tailwind v4 namespace 표준 (`--breakpoint-*`). 값은 Apple Store 톤 — Tailwind default(640/768/1024/1280/1536)와 다름. 외부 라이브러리 마이그레이션 시 매핑 필요.

#### 사용 패턴
- min-width 기준 (mobile-first): `@media (min-width: var(--breakpoint-lg))` — 834 이상 적용 (tablet landscape +).
- max-width 기준: `@media (max-width: calc(var(--breakpoint-md) - 1px))` — 735 이하 (phone).

#### Touch targets (Apple reference)
- Pill CTAs: `touch-pill-w` (100) × `touch-min` (44 height) + Button lg size + `radius-full`
- Circular chips: `touch-circular` (44 × 44, icon button, Switch handle, Avatar)
- Global nav utility links: `touch-nav-w` (80) × `touch-nav-h` (32, precision desktop only, breakpoint-xl 이상)
- WCAG 2.5.5 AAA (44 × 44 minimum) 충족.

**v59에서 5 토큰화 완료** — 자세한 spec은 아래 `### Touch targets` sub-section 참조.

#### Collapsing strategy (Apple reference, 토큰화 미적용)
- Global nav: full row → 햄버거 collapse at 834px (`breakpoint-lg`)
- Product/data tiles: 2-col → 1-col at 834px
- Hero typography scale: 56px → 40px → 34px → 28px (responsive type 4단계 — breakpoint-xl/lg/md/sm 분기)

responsive container layout / responsive typography spec은 별도 작업.

#### 듀얼 브랜드 — unified
HR (B2B 데이터 밀도) / Desk (B2C 모바일 우선) 모두 동일 5단계. 컴포넌트 spec에서 brand별 권장 사이즈(HR 데이터 그리드 우선, Desk 모든 사이즈 44×44 hit area) 차이는 prose 가이드.

#### 자동 검증 미적용
breakpoint는 functional layout token — contrast 룰 무관. spec 외부(prose-token)라 lint missingPrimary/contrast 영향 0.

### Touch targets (v59 추가, prose-token)

WCAG 2.5.5 AAA (Target Size 44×44 minimum) + Apple Store reference 톤을 정형 토큰화. spec이 layout/component size 카테고리 미지원이라 prose-token 패턴(shadow/motion/overlay/breakpoint와 동일). 5 토큰. v54 Breakpoints sub-sub의 reference 가이드를 토큰으로 격상.

| 토큰 | 값 | 의미 |
|---|---|---|
| `touch-min` | `44px` | WCAG 2.5.5 AAA minimum (default, 모든 hit target 권장) |
| `touch-pill-w` | `100px` | Pill CTA min-width (Apple Store: ~44 × 100) |
| `touch-circular` | `44px` | Circular chip / icon button / Switch handle (= touch-min, explicit alias) |
| `touch-nav-h` | `32px` | Precision desktop nav height (`breakpoint-xl` 이상, mouse pointer 가정) |
| `touch-nav-w` | `80px` | Precision desktop nav min-width |

#### 추가 이유
1. v33-v48 컴포넌트 batch에 size prose 있으나 *어떤 토큰 값 기준* 인지 명시 부재 — 컴포넌트별 각자 hex/px 기재. 통합 토큰화로 시스템 일관성 ↑.
2. **WCAG 2.5.5 AAA 명시**: `touch-min` 44px는 hit target minimum — 모든 컴포넌트 spec에서 인용 가능. `touch-circular`는 의미적 alias (44 = touch-min, but circular shape 의도 명시).
3. **Apple Store reference**: Pill (44 × 100) / Nav utility (32 × 80) 정형화. v54 Breakpoints prose의 reference 가이드를 토큰으로 격상.

#### 사용 패턴
- 모든 hit target: `min-height: var(--touch-min); min-width: var(--touch-min);` (44 × 44 충족).
- Pill CTA: `height: var(--touch-min); min-width: var(--touch-pill-w); border-radius: var(--radius-full);`.
- Circular icon button: `width: var(--touch-circular); height: var(--touch-circular); border-radius: var(--radius-full);`.
- Precision desktop nav (`@media (min-width: var(--breakpoint-xl))`): `height: var(--touch-nav-h); min-width: var(--touch-nav-w);`.

#### 단위·명명
- **px**: 한국 디자이너 친화적 + Figma frame 단위 일치.
- **`touch-{name}`**: WCAG "target" / "hit target" 어휘. spec 외부(prose-token)라 자체 namespace.

#### 듀얼 브랜드 — unified
- HR (B2B 데이터 밀도) / Desk (B2C 모바일 우선) 모두 동일 5 토큰. brand-agnostic.
- 사용 강도 차이: HR은 `breakpoint-xl` 이상 정밀 desktop에서 `touch-nav-h`/`-w` 적극 (데이터 그리드 inline action), Desk는 모든 viewport에서 `touch-min`/`touch-circular` 우선 (모바일 hit target).

#### 4px 베이스 호환
- 44/100/80/32 모두 4의 배수 (11×4, 25×4, 20×4, 8×4). v4 spacing 정신과 일치.
- spacing 카테고리 추가 안 함 — touch target은 padding/margin/gap과 의미적으로 다름(컴포넌트 outer size).

#### export 통합 (build-tailwind-v4.mjs)
v59에서 `parseTouchTargets` 추가, prose 표 직접 추출. CSS variable: `--touch-min`, `--touch-pill-w`, `--touch-circular`, `--touch-nav-h`, `--touch-nav-w`.

#### 자동 검증 미적용
touch target은 functional layout token — contrast 룰 무관. spec 외부(prose-token)라 lint 영향 0.

### Z-index (v65 추가, prose-token)

레이어 stacking order 체계화. 각 컴포넌트(modal/toast/dropdown/drawer/sticky)가 hardcoded z-index를 사용하면 layering 충돌·예측 불가능 발생 → 정형 토큰 5종으로 명시. spec이 z-index 카테고리 미지원이라 prose-token 패턴(shadow/motion/overlay/breakpoint/touch-target과 동일).

| 토큰 | 값 | 주 사용 |
|---|---|---|
| `z-base` | `0` | default 평면. body / 일반 콘텐츠 |
| `z-dropdown` | `1000` | dropdown / select panel / autocomplete / tooltip |
| `z-sticky` | `1100` | sticky header / sticky reservation rail / sticky CTA |
| `z-drawer` | `1200` | drawer / side panel / bottom sheet (페이지 내부 슬라이드) |
| `z-modal` | `1300` | modal dialog + overlay-dim (포커스 가두기, 페이지 차단) |
| `z-toast` | `1400` | toast / snackbar (모든 레이어 위, 사용자 피드백 최상단) |

#### 추가 이유
1. v43 Modal / v45 Dropdown / v46 Toast 등 컴포넌트 spec은 layering "최상단"·"위" 같은 prose 표현 — 정형 numeric 토큰 부재.
2. preview HTML에서 `.theme-toggle z-index: 100` 같은 hardcoded 값 등장 — 향후 modal/toast 추가 시 충돌 가능.
3. **6 토큰 (한도 5 + base)**: 기본 평면 `z-base` (0) 명시 + 5개 레이어. Material 3 / Bootstrap / Tailwind z-index scale 패턴 참고 — 100 단위로 충분 간격(추후 sub-layer 삽입 여유).

#### 사용 패턴
- modal: `z-index: var(--z-modal);` (overlay + dialog 둘 다 동일 layer 또는 dialog만)
- dropdown: `z-index: var(--z-dropdown);`
- toast stack: `position: fixed; z-index: var(--z-toast);`
- sticky header: `position: sticky; z-index: var(--z-sticky);`
- drawer: `position: fixed; z-index: var(--z-drawer);`
- isolation: 부모에 `isolation: isolate` 권장 — z-index scope를 component island로 격리 (다른 island와 우선순위 충돌 회피).

#### 레이어 충돌 우선순위
```
z-toast (1400) > z-modal (1300) > z-drawer (1200) > z-sticky (1100) > z-dropdown (1000) > z-base (0)
```

직관: 사용자 알림(toast)은 모달 위, 모달은 drawer 위, drawer는 sticky 위. dropdown은 페이지 콘텐츠 위지만 다른 layered 컴포넌트보단 아래.

#### 100 단위 간격
중간 layer 필요 시 사용 가능 — 예: dropdown 내부 nested submenu(`1010`), modal 내부 dropdown(`1310`). 별도 토큰 정의는 사용 사례 등장 후.

#### 듀얼 브랜드 — unified
HR / Desk 모두 동일 6 토큰. brand-agnostic. spec 외부 prose-token이라 lint 비대상.

#### export 통합 (build-tailwind-v4.mjs)
`parseZIndex` 추가 (v54 parseBreakpoints / v59 parseTouchTargets와 동일 패턴), prose 표 직접 추출. CSS variable: `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-drawer`, `--z-modal`, `--z-toast`.

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

modal/sheet/drawer 등 floating surface가 페이지 위에 떠 있을 때 배경을 어둡게 처리하는 dim overlay. shadow와 동일한 **prose-token** — alpha 채널이 들어가 design.md spec의 정형 hex 색상 토큰으로 정의 어려움.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `overlay-dim-light` | `rgba(0, 0, 0, 0.50)` | 라이트 모드 modal/sheet 배경 dim |
| `overlay-dim-dark` | `rgba(0, 0, 0, 0.65)` | 다크 모드 modal/sheet 배경 dim — 다크 표면 위 분리감 강화 |

`scripts/build-tailwind-v4.mjs`가 prose 표에서 추출해 `--overlay-dim-light` / `--overlay-dim-dark`로 출력. lint 자동 검증 비대상.

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

skeleton shimmer · spinner · pulse 등 **반복 애니메이션** 용 토큰 2종. v32는 단발 전환(hover/modal entrance) 위주 → 반복 사용 사례(loading 상태) 등장으로 보완.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `motion-duration-loop` | `1500ms` | skeleton shimmer 1주기, pulse 1주기 |
| `motion-ease-linear` | `linear` | 반복 일정 속도 (`ease-out` 반복은 끝에 멈춰 어색) |

#### 추가 이유
1. Skeleton/Loading 시나리오에서 `1500ms × linear` 반복이 표준 (Material progress, Toss skeleton 등 실측). 단발 전환용 `motion-duration-slower` (500ms)보다 길어야 자연.
2. `linear`는 v32에서 의도적으로 보류 — 단발 전환은 ease-out, 반복은 linear 분기가 자연스러움. 사용 사례(Skeleton) 등장으로 추가.
3. **2 토큰 한도 내** — duration + ease 페어. spinner/pulse는 같은 토큰 재사용.

#### WCAG / 자동 검증
- **2.2.2 Pause / Stop / Hide**: 반복 애니메이션은 사용자가 멈출 수 있어야 — skeleton은 데이터 도착 시 자동 정지(=일시 노출), spinner는 5초 이상 지속 시 cancel/refresh 옵션 제공 권장.
- **2.3.3**: `prefers-reduced-motion: reduce` 시 shimmer/spinner는 단순 색상 변화 또는 정지 — 컴포넌트 spec에서 명시.
- prose-token이라 lint 비대상.

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

이 파일(`DESIGN.md`)은 brand-agnostic 공유 baseline이라 컴포넌트 스펙은 brand 파일(`DESIGN.hr.md` / `DESIGN.desk.md`)에 작성합니다 — `primary` 등 brand 토큰을 직접 참조해야 자연스러운 표현이 되기 때문(spec이 cross-file `{colors.X}` reference 미지원).

본 파일에서는 brand-neutral 컴포넌트(divider, page text, caption, chart color 등 — 공유 토큰만 사용)만 정의하고, brand-specific 컴포넌트(Button, Focus ring 등)는 brand 파일에서 자체 prose로 작성합니다.

### Button (brand-neutral 가이드)

#### Variant
- **primary** (`button-primary`): brand `primary` 채움 + `text-on-accent` (#FFFFFF) 텍스트. CTA·submit 등 핵심 액션 1개/뷰.
- **outlined-on-dark** (`button-outlined-on-dark`): 다크 표면 위 transparent 채움 + `primary-light` 텍스트 + `border-strong-dark` 외곽선. 다크 모달·hero overlay.

(brand별 `primary` 값이 다르므로 채움 색·focus ring 색은 `DESIGN.hr.md` / `DESIGN.desk.md` 참조.)

#### State (공통)
| State | 시각 표현 |
|---|---|
| default | variant 기본 |
| hover | `motion-duration-fast` (150ms) ease-out 전환으로 `shadow-sm` 추가 + 명도 미세 조정(필요 시 brand 파일에서 hover-fill 토큰 정의 — 미정) |
| pressed | hover 상태 유지 + scale(0.98) + `shadow-sm` 제거 (눌림 인지) |
| focused | `border-focus`(또는 `border-focus-light`) 2px outline, **버튼 외곽 1px offset** — 2.4.11 (focus appearance) 충족. `focus-visible` pseudo만 적용(마우스 클릭 시 미표시) |
| disabled | `text-disabled` 텍스트 + opacity 0.5 + cursor:not-allowed. WCAG 1.4.3 incidental 예외 (disabled 컴포넌트 텍스트는 본문 4.5:1 비대상) |

#### Size
| Size | height | padding | text token | 라운드 |
|---|---|---|---|---|
| sm | 32px | `xs` 4px / `sm` 8px (수직/수평) | `caption` (12px) | `radius-sm` (4px) |
| md | 40px | `sm` 8px / `md` 12px | `body-strong` (15/600) | `radius-sm` |
| lg | 48px | `md` 12px / `lg` 16px | `heading-sm` (16/600) | `radius-md` (8px) |

`md`가 default. WCAG 2.5.5 (target size 44×44px AAA): `md`는 40px로 AAA 미달이지만 horizontal hit area + spacing 8px 이상 확보 시 AA 인정 (2.5.8 minimum 24×24px 충족). `lg`(48px)는 AAA 충족 — 모바일 우선 화면 권장.

#### Layout / Touch target
- 인접 인터랙션 요소 간 최소 간격 `sm` (8px) — 2.5.8 spacing rule
- group 시 button bar는 `xs` (4px) 간격 + 외곽선으로 group 식별

#### Motion
- hover/pressed 전환: `motion-duration-fast` × `motion-ease-out`
- 모든 transition: `prefers-reduced-motion: reduce` 미디어 쿼리에서 즉시 전환(0ms) — 2.3.3 충족

#### Accessibility 체크리스트
- [ ] keyboard: `Enter`/`Space`로 활성화, `Tab`으로 focus 진입
- [ ] 2.4.11: focus indicator 외곽선 2px + 1px offset, 인접 표면 대비 3:1 이상
- [ ] 2.5.5 / 2.5.8: 최소 hit area 24×24px, 권장 44×44px (`lg` 사용)
- [ ] 1.4.11: outlined variant 외곽선 vs 배경 3:1
- [ ] aria: 아이콘 only 버튼은 `aria-label` 필수, loading 시 `aria-busy="true"`
- [ ] disabled: `aria-disabled="true"` 사용 시 focus 가능 / `disabled` HTML 속성 사용 시 focus 불가 — UI 흐름에 맞춰 선택

### Input

text / number / email / password / search 입력 필드의 공통 spec. textarea는 height 자유, select / combobox는 별도(P0-C 신규).

#### Mode pair
- **input-light** (`input-light`): `surface-input` (`#F0F2F7`) 배경 + `text-primary` 텍스트
- **input-dark** (`input-dark`): `surface-input-dark` (`#2D3346`) 배경 + `text-primary-dark` 텍스트

다크 모드에서 `surface-input-dark`가 `surface-default-dark`보다 **밝다** (반전 elevation) — 어두운 카드 위 입력 필드가 elevated되어 시인성 확보.

#### Placeholder
- `placeholder-on-input-light` / `placeholder-on-input-dark` → `text-tertiary` / `text-tertiary-dark`로 매핑 (sparse).
- 본문 4.5:1 비대상 — placeholder는 1.4.3 incidental 예외 (사용자 입력 시 사라짐, 영구 콘텐츠 아님).

#### State
| State | 시각 |
|---|---|
| default | `surface-input` 배경 + `border-default` 1px 외곽선 (인접 표면 식별) |
| focused | `border-focus` 2px outline (1px offset 외부) — 2.4.11 충족. `focus-visible` 한정 |
| filled | default 시각 유지 — 입력 후 visual diff는 텍스트 자체로 |
| error | `error` (`#C53030`) 1px border + `error` 색상 helper text + 상단 `error-light` 6% tint (선택, 강한 강조 시) |
| disabled | `text-disabled` text + opacity 0.5 + `surface-input` 배경 약간 어둡게 (cursor:not-allowed) |
| readonly | default 유지 + 외곽선 제거 — focus 가능, 텍스트 선택만 |

#### Size
| Size | height | padding (V/H) | text token | radius |
|---|---|---|---|---|
| sm | 32px | `xs` 4px / `sm` 8px | `caption` (12/400) | `radius-sm` (4px) |
| **md** (default) | 40px | `sm` 8px / `md` 12px | `body` (15/400) | `radius-sm` |
| lg | 48px | `md` 12px / `lg` 16px | `body` (15/400) | `radius-md` (8px) |

input은 button과 달리 텍스트 굵기는 `400` 유지(가독성). 

#### Layout
- label은 input 위 `caption` (12/400) + `xs` (4px) 간격
- helper text / error text는 input 아래 `caption` + `xs` 간격
- form group 간 최소 `lg` (16px), section 간 `xl` (24px)

#### Motion
- focus ring 출현/사라짐: `motion-duration-fast` × `motion-ease-out`
- error 상태 전환 (border + helper text 등장): `motion-duration-base` × `motion-ease-out`

#### Accessibility
- [ ] keyboard: `Tab` focus, `Shift+Tab` 역방향
- [ ] 2.4.11: focus indicator 2px outline, 인접 표면 대비 3:1 이상 — `border-focus` (`#357B5F` for HR) vs `surface-input` (`#F0F2F7`) = 3.96:1 ✅
- [ ] 1.4.11: default border vs surface 3:1 → `border-default` (`#E5E8EF`) vs `surface-input` (`#F0F2F7`) = 1.16:1 ❌ — 단순 외곽선만으로는 식별 부족, label/placeholder/형태(rounded box)로 보강하거나 focus 시 강한 outline으로 식별 강화 (default에서 외곽선만으로 1.4.11 통과 어려움 — Toss·Material도 동일 한계)
- [ ] aria: `<label for="...">` 또는 `aria-label`/`aria-labelledby`, 에러 시 `aria-invalid="true"` + `aria-describedby="error-id"`
- [ ] required: `aria-required="true"` + 시각 표시 (* 아이콘 또는 "(필수)")

### Textarea (v62 추가)

multi-line 텍스트 입력 — Input의 height 가변 변형. 메모, 휴가 사유, 평가 코멘트 등 자유 형식 텍스트. **새 토큰 추가 0** — Input 토큰 + 추가 sizing 규칙만.

#### Mode pair (Input과 동일)
- **input-light** / **input-dark** 컴포넌트 매핑 그대로 사용. 배경·텍스트·placeholder 모두 동일.

#### State (Input과 동일)
default / focused / filled / error / disabled / readonly — 모든 시각적 표현 Input과 일치. 차이점은 height/resize만.

#### Sizing
| 속성 | 값 | 설명 |
|---|---|---|
| min-height | `4 line` (≈ `body` × 1.6 × 4 = 96px) | 최소 4줄 — 한 줄짜리 입력은 Input 사용 |
| max-height | `12 line` (≈ 288px) 또는 viewport 60% | 초과 시 내부 scroll |
| line-height | `body` line-height (1.6) | 한국어 본문 가독성 |
| padding | `md` 12px (V/H) | Input md size와 일치 — 텍스트 1줄과 다중줄 시각 일관 |
| resize | `vertical` 기본 | 사용자 수동 확장 가능, horizontal/both 비권장 (layout 깨짐) |

#### Auto-grow (선택)
- JavaScript로 입력 길이에 맞춰 height 자동 증가. min/max 범위 내에서.
- `motion-duration-fast` 트랜지션으로 부드러운 확장.
- 모바일은 auto-grow 권장(scrollbar 회피), 데스크탑은 manual resize 허용.

#### Counter (글자수 표시, 선택)
- 우하단 `caption` (12/400) `text-tertiary` — `현재 / 최대` 형식 (예: `120 / 500`).
- 80% 도달 시 `warning` 색, 100% 초과 시 `error` 색.

#### Layout
- label / helper / error 위치는 Input과 동일 (위 label, 아래 helper).
- form group 간 `lg` (16px), section 간 `xl` (24px).

#### Accessibility
- [ ] **HTML**: `<textarea>` native — placeholder, required, maxlength, readonly 그대로 사용.
- [ ] **aria 라벨**: `<label for="...">` 필수. 글자수 카운터는 `aria-describedby` 연결.
- [ ] **2.4.11 focus**: Input과 동일 — `border-focus` 2px outline.
- [ ] **resize a11y**: 사용자가 resize handle 인지 가능해야 — 기본 native UA 표시 유지 권장 (커스텀 시 `cursor: nwse-resize` + 시각 hint).
- [ ] **maxlength 초과**: native `maxlength` 사용 권장(자동 차단). 초과 시 visual feedback (`error` border + screen reader 알림).

#### 추가 이유
1. v34 Input은 single-line만 spec, multi-line은 "별도(P0-C 신규)"로 표기 후 미보충.
2. HR 평가 코멘트 / Desk 메모·할일 상세 텍스트 등 multi-line 입력 사용 빈번.
3. **새 토큰 0** — Input 시각 토큰 100% 재사용, sizing/resize/counter 규칙만 추가.

### Card

콘텐츠 그룹화·elevation 표현의 기본 표면. dashboard 위젯·list item·detail panel 등 광범위 사용.

#### Mode pair
- **card-light** (`card-light`): `surface-default` (`#FFFFFF`) 위에 `text-primary` 텍스트
- **card-dark** (`card-dark`): `surface-default-dark` (`#242938`) 위에 `text-primary-dark` 텍스트

#### Variant
| Variant | shadow | border | hover |
|---|---|---|---|
| **default** | `shadow-sm` (light) / `shadow-sm-dark` | none | none |
| **interactive** (clickable card) | `shadow-sm` → hover `shadow-md` | none | hover 시 shadow 상승 + cursor:pointer |
| **outlined** (저-elevation) | none | `border-default` 1px | none — flat 스타일 |
| **flat** (서피스만) | none | none | none — surface 휘도 차로 식별 |

다크 모드는 elevation 표현이 어두운 표면 위에서 약하므로 `interactive` 카드는 `border-default-dark` 1px 보강 권장.

#### Padding
| Level | 값 | 사용 |
|---|---|---|
| sm | `md` (12px) 4면 | 작은 위젯, list item |
| **md** (default) | `lg` (16px) 4면 | dashboard widget, content card |
| lg | `xl` (24px) 4면 | detail panel, hero card |
| xl | `2xl` (32px) 4면 | 큰 hero/marketing 카드 (Desk 친화) |

수직/수평 분리: `padding: 16px 20px;` 같은 비대칭은 컴포넌트별 결정 — spacing 토큰 조합으로 표현(`md` × `lg` 등).

#### Radius
- **default**: `radius-md` (8px) — 카드 톤 기본
- **소형** (small chip-like card): `radius-sm` (4px)
- **대형** (hero, modal-like): `radius-lg` (12px) 또는 `radius-2xl` (20px)

#### Layout
- 카드 외부 간격: 카드 그리드는 `lg` (16px) gap 권장
- 카드 내부 콘텐츠 간격: `sm` ~ `md` (8~12px)

#### Motion
- interactive variant hover/leave: `motion-duration-fast` × `motion-ease-out`
- expand/collapse (accordion-card): `motion-duration-base`

#### Accessibility
- [ ] interactive variant는 `<button>` 또는 `<a>` 또는 `role="button"` + `tabindex="0"` + `Enter`/`Space` 키핸들러
- [ ] focus indicator는 카드 외곽 2px outline (Button 동일 패턴)
- [ ] aria: 카드가 expand/collapse하면 `aria-expanded`, list item이면 `role="listitem"` 또는 `<li>` 사용

### Page text

`bg-page` 위에 직접 놓이는 본문 텍스트 — 카드 외곽 영역(layout 본문, 빈 영역, sidebar 텍스트 등).

#### Mode pair
- **page-text-light** (`page-text-light`): `bg-page` (`#F5F6FA`) + `text-primary` (`#1A1F2E`)
- **page-text-dark** (`page-text-dark`): `bg-page-dark` (`#1A1F2E`) + `text-primary-dark` (`#F5F6FA`)

contrast 확인:
- light: `#1A1F2E` × `#F5F6FA` = **15.04:1** ✅ AAA
- dark: `#F5F6FA` × `#1A1F2E` = **15.04:1** ✅ AAA

#### Typography 적용
- 본문: `body` (15/400/1.6)
- 강조: `body-strong` (15/600/1.6)
- 보조 본문: `caption` (12/400/1.5) — `text-secondary` 또는 `text-tertiary` 색상 권장
- 헤딩 위계: `heading-sm`(16) → `heading-md`(18) → `heading-lg`(24) → `heading-xl`(32)

#### Layout
- 본문 줄간격은 typography token의 `lineHeight` 1.6에서 처리
- 단락 간 `md` (12px) 또는 `lg` (16px)
- 본문 max-width: 640~720px (한국어 기준 1줄 35~45자) — 가독성 우선

#### A11y
- 1.4.3: 본문 텍스트 4.5:1 — 위 contrast 충족
- 1.4.12 text spacing: `lineHeight` 1.5 이상 (현 1.6 OK), letter-spacing 자유 조정 가능 디자인
- 1.4.4 resize: 200% 확대 시 가로 스크롤 없이 reflow 가능해야 — max-width + responsive

### Caption

`surface-default` (카드) 위에 놓이는 보조 텍스트 — meta 정보, 타임스탬프, 부가 설명. 위계 2단계 (secondary / tertiary).

#### 위계 / Mode pair
| Token | 배경 | text | contrast |
|---|---|---|---|
| `caption-on-card-light` | `surface-default` (`#FFFFFF`) | `text-secondary` (`#4E5968`) | **6.78:1** ✅ |
| `caption-on-card-dark` | `surface-default-dark` (`#242938`) | `text-secondary-dark` (`#B0B8C4`) | **6.85:1** ✅ |
| `caption-tertiary-on-card-light` | `surface-default` | `text-tertiary` (`#62697A`) | **5.36:1** ✅ |
| `caption-tertiary-on-card-dark` | `surface-default-dark` | `text-tertiary-dark` (`#9DA3B0`) | **5.13:1** ✅ |

**위계 규칙**:
- **secondary** (caption): 일반 보조 텍스트(닉네임, 카테고리, 카드 부제) — 본문보다 한 단계 약하지만 정보로서 의미 있음
- **tertiary** (caption-tertiary): 부가 메타(타임스탬프, "방금", "수정됨" 등) — 정보 우선순위 가장 낮음, hint 톤
- 둘 다 본문 4.5:1 통과 — 1.4.3 incidental 예외 없이 정상 본문

#### Typography 적용
- text: `caption` (12/400/1.5)
- 강조 caption은 `caption-strong`(가칭, 미정) 또는 inline `body-strong` 활용 — 향후 토큰화 후보

#### Layout
- 본문 텍스트와 `xs` (4px) 간격
- meta 그룹(예: 닉네임 + "·" + 시간)은 `xs` 또는 `sm` 간격 + `·` 구분자 사용

#### A11y
- semantic HTML: 메타 정보는 `<small>` 또는 `<span>` 클래스로
- 타임스탬프는 `<time datetime="...">` 사용 (스크린 리더 + 검색엔진 친화)

### Badge

semantic 채움 라벨 — status indicator, count, category tag. small/inline 강조.

#### Variant (semantic 4)
| Token | fill | text | contrast |
|---|---|---|---|
| `badge-success` | `success` (`#117A3A`) | `text-on-accent` (`#FFFFFF`) | **5.86:1** ✅ |
| `badge-error` | `error` (`#C53030`) | `text-on-accent` | **5.34:1** ✅ |
| `badge-warning` | `warning` (`#A85800`) | `text-on-accent` | **5.27:1** ✅ |
| `badge-info` | `info` (`#006395`) | `text-on-accent` | **6.31:1** ✅ |

모두 본문 4.5:1 통과. badge text는 작은 크기(12px)이지만 `text-on-accent` (#FFFFFF) × semantic의 충분한 대비로 가독성 확보.

#### Size
| Size | height | padding (V/H) | text token | radius |
|---|---|---|---|---|
| sm | 18px | 0px / `xs` 4px | `caption` (12/400) | `radius-sm` (4px) 또는 `full` (pill) |
| **md** (default) | 22px | `xs` 2px / `sm` 8px | `caption` (12/400) | `radius-sm` 또는 `full` |
| lg | 28px | `xs` 4px / `sm` 8px | `caption` (12/600 — 강조) | `radius-sm` 또는 `full` |

shape:
- **rounded** (default `radius-sm`): 카드와 같은 라운드 — 정보 카드 밀도
- **pill** (`radius-full`): count badge, status pill — 인터랙션 톤

#### Layout
- inline 텍스트와 `xs` (4px) 간격
- 여러 badge 그룹은 `xs` 간격 + 줄바꿈 wrap

#### Motion
- 등장/사라짐: `motion-duration-fast` × `motion-ease-out` (`opacity` + `scale(0.9 → 1)`)
- count 변경 (예: 5 → 6): `motion-duration-fast` 페이드

#### Accessibility
- [ ] semantic 색상에만 의존 금지 — 텍스트/아이콘으로 의미 보강 ("승인됨" / "거부됨" 등)
- [ ] 1.4.1 Use of Color: success/error만으로 정보 전달하지 않기 — 색맹/저시력 사용자 대응
- [ ] aria: 동적 count badge는 `aria-live="polite"` + `aria-label="알림 5개"` 등 명시
- [ ] screen reader: text-only badge는 `<span>`, 아이콘 only는 `aria-label` 필수

### Alert text

surface 위 inline 상태 텍스트 — form validation error, status notification, 변경 사항 안내. icon + text 조합 권장.

#### Variant (semantic 4 × 2 mode)
**Light surface (`surface-default` 위)**:
| Token | text | contrast |
|---|---|---|
| `alert-text-success` | `success` (`#117A3A`) | **5.86:1** ✅ |
| `alert-text-error` | `error` (`#C53030`) | **5.34:1** ✅ |
| `alert-text-warning` | `warning` (`#A85800`) | **5.27:1** ✅ |
| `alert-text-info` | `info` (`#006395`) | **6.31:1** ✅ |

**Dark surface (`surface-default-dark` 위)** — `*-light` semantic 사용:
| Token | text | contrast |
|---|---|---|
| `alert-text-success-on-dark` | `success-light` (`#5DC07B`) | **5.85:1** ✅ |
| `alert-text-error-on-dark` | `error-light` (`#F08080`) | **5.42:1** ✅ |
| `alert-text-warning-on-dark` | `warning-light` (`#E8A05A`) | **5.83:1** ✅ |
| `alert-text-info-on-dark` | `info-light` (`#6FAEDF`) | **5.80:1** ✅ |

모두 본문 4.5:1 통과 — 1.4.3 통과.

#### Typography
- 본문 길이 alert: `body` (15/400/1.6)
- inline form helper: `caption` (12/400/1.5)
- alert 제목 (있을 시): `body-strong` (15/600)

#### Layout
- icon + text 페어: icon `xs` (4px) 간격, icon size 16~20px (text height에 맞춤)
- alert 영역 padding: `sm` (8px) ~ `md` (12px)
- 여러 alert 누적 시 `xs` 간격 + 시각적 grouping

#### Motion
- 등장: `motion-duration-base` × `motion-ease-out` (slide-in + fade)
- dismiss/사라짐: `motion-duration-fast` × `motion-ease-out` (fade out)
- `prefers-reduced-motion: reduce` 시 즉시 표시

#### Accessibility
- [ ] 1.4.1: 색상에만 의존 금지 — 아이콘(`✓`/`!`/`⚠`/`ℹ`) + 텍스트 항상 동반
- [ ] aria-live: 동적 alert는 `role="alert"` (assertive) 또는 `aria-live="polite"`. error는 `assertive`, info는 `polite` 권장
- [ ] form validation: input의 `aria-describedby="error-id"`로 alert text 연결
- [ ] dismissable alert는 `<button aria-label="알림 닫기">` 동반

### Focus ring

모든 인터랙티브 컴포넌트(button / input / card-interactive / link / tab 등)의 focus 표현 통일 — 키보드 사용자의 시각적 navigation cue.

#### Mode pair (sparse — brand 토큰이 contrast 검증 담당)
- **focus-ring-on-light** (`focus-ring-on-light`): 라이트 표면 위 focus
- **focus-ring-on-dark** (`focus-ring-on-dark`): 다크 표면 위 focus

(brand 파일에서 실제 색상 정의 — `focus-ring-on-light` → `border-focus`, `focus-ring-on-dark` → `border-focus-light`로 매핑.)

#### Spec
- **두께**: 2px outline (1px은 시인성 부족)
- **offset**: 컴포넌트 외곽 1px (즉 컴포넌트 + 1px gap + 2px ring → 총 3px 외곽 영역)
- **shape**: 컴포넌트 outline 100% 둘러쌈 — `border-radius` 동일 적용
- **trigger**: `focus-visible` pseudo만 (마우스 클릭 시 미표시, Tab/keyboard로 진입 시만)

#### WCAG 검증
- **2.4.11 Focus Appearance** (AA — 2.2): focus indicator는 (a) 인접 표면 대비 **3:1 이상**, (b) 컴포넌트 외곽선 둘레의 **최소 2 CSS pixel 두께** + **인접한 비-focus 상태 대비 3:1** 충족 — 본 시스템 모두 충족
- **2.4.12 Focus Not Obscured (Minimum)** (AA — 2.2): focus 받은 요소가 author-created 컨텐츠에 의해 완전히 가려지면 안 됨 — sticky header / popup overlay 디자인 시 z-index + scroll-margin 고려
- **2.4.13 Focus Appearance Enhanced** (AAA — 2.2): 컴포넌트 둘레 둘레 100% × 두께 4 CSS pixel 또는 **기준 2배 이상 대비** 권장 — 향후 enhanced focus 옵션 (`focus-ring-enhanced` 토큰) 추가 후보

#### 사용 예시 (CSS 의사코드)
```css
.button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 1px;
  border-radius: var(--radius-sm); /* 동일 라운드 */
}
.button-on-dark:focus-visible {
  outline-color: var(--color-border-focus-light);
}
```

#### Layout
- focus ring은 `outline` 사용 (box-shadow도 가능하지만 outline이 layout shift 없음 — focus 시 element 크기 안 변함)
- offset 1px → outline-offset: 1px

#### Motion
- focus ring 등장: `motion-duration-fast` × `motion-ease-out` (opacity 0 → 1)
- `prefers-reduced-motion: reduce` 시 즉시 표시 (focus 인지 지연은 a11y 저해)

#### Accessibility 체크리스트
- [ ] 2.4.11: 모든 컴포넌트의 focus state는 `focus-ring-on-{light,dark}` 토큰 사용
- [ ] `focus-visible`만 사용 — 마우스 사용자 방해 없음 (`:focus`로 일관 적용 시 클릭 후에도 ring 표시되어 산만)
- [ ] 2.4.12: focus 가려짐 방지 — sticky header 아래 focus 받으면 자동 scroll 보강 (`scroll-margin-top: <header height>`)
- [ ] 다크 모드 자동 전환: `[data-theme="dark"]` 또는 `prefers-color-scheme: dark`로 `--color-border-focus-light` 자동 적용

### Divider

콘텐츠 섹션 분리용 1px 수평/수직 선. list separator, section break, sidebar/main 분할.

#### Mode pair
- `divider-light` (`divider-light`): `surface-default` / `surface-input` 위에 `border-default` (`#E5E8EF`) 사용
- `divider-dark` (`divider-dark`): 다크 표면 위에 `border-default-dark` (`#353B4D`) 사용

#### Spec
- 두께: 1px (single line)
- 색상: `border-default` 토큰 (sparse 매핑 — `border-*` 토큰을 1px element의 `backgroundColor`로 사용)
- 길이: 부모 컨테이너 width/height 100% 또는 padding 이내 inset

#### Layout
- list item 사이: `divider-light` 1px, list item padding 안쪽 inset(`md`/`lg`)
- section break: 위/아래 `lg` (16px) 간격 + `divider-light`
- sidebar/main 분할: 수직 divider 1px, full height

#### Style variants (CSS, 토큰 외)
- **solid** (default): 단순 1px line
- **dashed** (예약): 향후 `divider-dashed`로 추가 후보 — 임시 분리 표현
- **margin-only** (no line): spacing 토큰만 사용해 시각적 분리 — 캐주얼 톤

#### Accessibility
- [ ] 1.4.11: divider는 **시각적 grouping** 보조 — 정보 전달 단독 의존 금지. semantic HTML(`<hr>`, `<section>`, `<aside>`)로 의미 분리 우선
- [ ] aria: 단순 시각 divider는 `<hr>` (자동으로 `role="separator"`), 또는 inline divider는 `aria-hidden="true"`

### Outline (border 시각 요소)

`border-strong` 토큰을 1px element의 배경색으로 사용 — 외곽선이 카드/section의 외곽 식별 강도를 높일 때.

#### Mode pair
- `outline-strong-light` (`outline-strong-light`): `border-strong` (`#7D8593`) 사용
- `outline-strong-dark` (`outline-strong-dark`): `border-strong-dark` (`#8B95A8`) 사용

#### Spec
- 두께: 1px (border CSS 또는 1px element)
- 색상: `border-strong` (default border보다 강한 식별)

#### 사용 시나리오
- modal/dialog 외곽선 (`shadow-xl` + `outline-strong-light` 1px) — focus 가려짐 방지(2.4.12) 시 시각 분리감 보강
- highlighted card (선택된 list item, drag-over state)
- inline editor의 in-progress 표시

#### Contrast (UI 1.4.11)
- `border-strong` (`#7D8593`) vs `surface-default` (`#FFFFFF`) = **3.34:1** ✅ UI
- `border-strong` vs `bg-page` (`#F5F6FA`) = **3.13:1** ✅ UI (3:1 통과)
- `border-strong` vs `surface-input` (`#F0F2F7`) = **3.34:1** ✅ UI
- `border-strong-dark` (`#8B95A8`) vs `bg-page-dark` (`#1A1F2E`) = **3.97:1** ✅ UI
- `border-strong-dark` vs `surface-default-dark` (`#242938`) = **3.39:1** ✅ UI
- `border-strong-dark` vs `surface-input-dark` (`#2D3346`) = **4.05:1** ✅ UI

모든 표면에서 UI 1.4.11 (3:1) 통과 — 단순 외곽선만으로 컴포넌트 식별 가능.

#### Accessibility
- [ ] 1.4.11: 위 contrast 충족 — outline-strong은 외곽선 **단독 식별** 가능 (`border-default` 1.16:1과 다름)
- [ ] 다크 모드에서 modal에 `outline-strong-dark` + `shadow-xl-dark` 동시 사용 권장 (다크 표면 위 elevation 보강)

### Disabled label

비활성 상태 컴포넌트(disabled button/input/menu item)의 텍스트 라벨. **WCAG 1.4.3 incidental 예외** 명시 — 사용 불가 컴포넌트 텍스트는 본문 4.5:1 비대상.

#### Mode pair (sparse — textColor만 정의, backgroundColor 없음)
- `disabled-label-light` (`disabled-label-light`): `text-disabled` (`#828995`)
- `disabled-label-dark` (`disabled-label-dark`): `text-disabled-dark` (`#7A8294`)

contrast 참고 (incidental 예외라 통과 비대상):
- `text-disabled` (`#828995`) on `surface-default` (`#FFFFFF`) = 약 **3.69:1** (본문 4.5:1 미달, AA UI 3:1 통과 — 시인성은 있되 본문 의도 아님)
- `text-disabled-dark` (`#7A8294`) on `surface-default-dark` (`#242938`) = 약 **3.74:1** (동일 패턴)

#### 의도
WCAG 1.4.3 (Contrast Minimum)의 명시적 예외:
> *Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.*

→ disabled 컴포넌트의 라벨은 **인터랙션 불가** 상태를 시각적으로 알리는 역할이라 일부러 약한 contrast 사용. 4.5:1 통과해버리면 active 상태와 구분이 어려워 오히려 UX 저해.

#### Spec
- text color: `text-disabled` / `text-disabled-dark`
- 추가 시각: 컴포넌트 자체에 opacity 0.5 + cursor:not-allowed 동반 (component spec)
- 컴포넌트 외곽선/배경은 default 유지 — text만 disabled 색상

#### Layout
- disabled 컴포넌트 그룹의 인접 텍스트(예: "비활성화됨" 부가 설명)는 `caption` (12/400) + `text-tertiary` 조합으로 정상 contrast(4.5:1) 유지 — 이 부가 설명은 incidental 예외 비대상

#### Accessibility
- [ ] 1.4.3 incidental 예외 — text 자체 contrast는 비대상
- [ ] **그러나** 시각적 비활성 표현 보강 필수: opacity 0.5 + cursor:not-allowed + (선택) overlay/strikethrough
- [ ] aria: `disabled` HTML 속성 (form 제어) 또는 `aria-disabled="true"` (focus 가능, 메뉴 아이템 등)
- [ ] screen reader가 "비활성화됨"이라고 읽음 — 시각적 강조 없이도 전달
- [ ] **disabled 컴포넌트 옆에 reason text 권장** (예: "권한 없음", "기간 만료") — `caption` 정상 contrast로

### Chart color (palette)

data visualization(bar/line/pie/donut/heatmap)·카테고리 색상·tag 분류용 10색 palette. fill / stroke 용도 sparse 매핑(`backgroundColor`만, `textColor` 페어 비대상).

#### Mode pair (10색 × 2 = 20 토큰)
**Light surface (`surface-default` 위)** — L≈0.16~0.18 통일:
| Token | hex | Hue |
|---|---|---|
| `chart-color-red` | `#C73838` | red |
| `chart-color-orange` | `#B36418` | orange |
| `chart-color-yellow` | `#8C7400` | yellow |
| `chart-color-green` | `#2D8060` | green |
| `chart-color-blue` | `#2C70BF` | blue |
| `chart-color-indigo` | `#5E60C8` | indigo |
| `chart-color-violet` | `#8B4DBA` | violet |
| `chart-color-pink` | `#B83B7A` | pink |
| `chart-color-brown` | `#9A6536` | brown |
| `chart-color-gray` | `#6B7484` | gray |

**Dark surface (`surface-default-dark` 위)** — L≈0.45~0.55 (light variant):
| Token | hex |
|---|---|
| `chart-color-red-on-dark` | `#ECA0A0` |
| `chart-color-orange-on-dark` | `#E8B266` |
| `chart-color-yellow-on-dark` | `#D4B83A` |
| `chart-color-green-on-dark` | `#6BCB86` |
| `chart-color-blue-on-dark` | `#7BBBED` |
| `chart-color-indigo-on-dark` | `#ABB0F0` |
| `chart-color-violet-on-dark` | `#D2A8EC` |
| `chart-color-pink-on-dark` | `#ECA0BC` |
| `chart-color-brown-on-dark` | `#DCB088` |
| `chart-color-gray-on-dark` | `#B5BBC5` |

#### Hue 정렬 의도
red → orange → yellow → green → blue → indigo → violet → pink → brown → gray 순서는 **무지개 + 보조색 sort** — 인접 색상 간 시각 거리 균등. chart에서 1~3개 카테고리만 사용 시 처음 3개(red/orange/yellow) 또는 brand-친화 3개(green/blue/indigo) 권장.

#### L 통일의 의도
모든 chart 색상은 동일한 명도 → 휘도 차이로 인한 시각 우선순위 부여 없이 **hue 차이만으로** 카테고리 구분. 이는 색맹 사용자(특히 적-녹 색맹)에게 부분적 도움 — 명도 차이가 없으면 고대비 hue 색상도 동일 톤으로 보일 수 있어 **반드시 패턴/라벨 보강 필수**.

#### Variant
| 사용 | Token 그룹 | 비고 |
|---|---|---|
| 라이트 표면 fill | `chart-color-{hue}` | bar 채움, pie slice |
| 라이트 표면 stroke | `chart-color-{hue}` | line 그래프 stroke |
| 다크 표면 fill/stroke | `chart-color-{hue}-on-dark` | 다크 모드에서 light variant 사용 |
| 카테고리 tag | `chart-color-{hue}` | category badge, label dot |

#### Layout
- pie/donut: 1~5 slice 권장 (그 이상은 가독성 저하 → "기타"로 묶기)
- bar/column: 카테고리 ≤7 권장
- line graph: ≤5 lines (더 많으면 highlight + 나머지 회색 처리)
- legend: chart 옆 또는 아래, `caption` (12) + `xs` 간격

#### Motion
- chart entrance: `motion-duration-slow` (300ms) × `motion-ease-out` — 막대 grow / 선 draw 자연스럽게
- hover highlight: `motion-duration-fast` (150ms) opacity 변화
- `prefers-reduced-motion: reduce` 시 즉시 표시 (애니메이션 없이)

#### Accessibility
- [ ] **1.4.1 Use of Color (강조)**: chart에서 색상 단독 의존 절대 금지 — 패턴(diagonal/dot 등) 또는 라벨 직접 표시 보강 필수. 특히 적-녹(red/green) 동시 사용 시 색맹 대응 필수
- [ ] **1.4.11 Non-text Contrast**: chart element vs surface 대비 3:1 이상 — `chart-color-yellow` (`#8C7400`) vs `surface-default` = **5.45:1** ✅, 가장 약한 hue도 UI 3:1 통과
- [ ] **legend / data label**: 각 색상 옆에 텍스트 라벨 또는 패턴 표시. 시각만으로 식별하는 chart 금지
- [ ] **screen reader**: chart는 `<table>` fallback 또는 `<svg role="img" aria-label="...">` + 데이터 요약 텍스트 동반
- [ ] **focus**: 데이터 포인트 keyboard 탐색 가능(`tabindex="0"` per data point) — 각 포인트 focus 시 tooltip 표시

#### 사용 예시 (CSS 의사코드)
```css
.chart-bar-1 { background-color: var(--color-chart-color-red); }
.chart-bar-1[data-pattern="diagonal"] {
  background: repeating-linear-gradient(45deg, var(--color-chart-color-red), var(--color-chart-color-red) 4px, transparent 4px, transparent 8px);
}
@media (prefers-color-scheme: dark) {
  .chart-bar-1 { background-color: var(--color-chart-color-red-on-dark); }
}
```

### Modal

페이지 위에 떠 있는 floating dialog — 확인/취소, form 입력, 콘텐츠 편집 등 사용자 결정이 필요한 흐름.

#### Structure (3 layer)
1. **overlay** (`overlay-dim-light` / `overlay-dim-dark`): 페이지 전체 dim, click 시 modal 닫기
2. **container** (`surface-default` + `outline-strong-light` + `shadow-xl` / dark variant): 실제 modal 본체
3. **content**: header (title + close button) → body (콘텐츠) → footer (action buttons)

#### Variant (사이즈)
| Variant | max-width | 사용 |
|---|---|---|
| sm | 384px (`max-w-sm`) | 확인 다이얼로그 ("정말 삭제하시겠습니까?") |
| **md** (default) | 480px | form 입력, 단일 정보 입력 |
| lg | 640px | 다단계 form, 복잡한 콘텐츠 편집 |
| **full** (mobile sheet) | 100vw | 모바일 bottom sheet — 화면 하단에서 슬라이드 |

#### Layout
- container padding: `xl` (24px) — 또는 size별 분기 (sm은 `lg` 16px)
- header / body 간격: `lg` (16px)
- body / footer 간격: `xl` (24px)
- footer button 그룹: 우측 정렬, 버튼 간 `sm` (8px) — primary action 우측 끝
- radius: `radius-lg` (12px) — 카드보다 큰 elevation 표현

#### Mode pair
| 표면 | container | overlay | shadow | outline |
|---|---|---|---|---|
| light | `surface-default` (`#FFFFFF`) | `overlay-dim-light` rgba(0,0,0,0.50) | `shadow-xl` | `outline-strong-light` 1px (선택, modal 외곽 식별 강화) |
| dark | `surface-default-dark` (`#242938`) | `overlay-dim-dark` rgba(0,0,0,0.65) | `shadow-xl-dark` | `outline-strong-dark` 1px |

#### Motion
- **등장**: overlay fade-in (`motion-duration-base` 200ms) + container scale(0.96 → 1) + fade-in (`motion-duration-slow` 300ms × `motion-ease-out`)
- **사라짐**: container scale(1 → 0.96) + fade-out + overlay fade-out (`motion-duration-base`)
- **mobile sheet**: 하단 슬라이드 in/out (`motion-duration-slow` × `motion-ease-out`)
- `prefers-reduced-motion: reduce` 시 즉시 표시 (애니메이션 없음)

#### Accessibility
- [ ] **role="dialog"** (또는 critical confirm은 `role="alertdialog"`)
- [ ] **aria-modal="true"** — screen reader가 background 무시
- [ ] **aria-labelledby="modal-title-id"** — header title을 가리킴
- [ ] **aria-describedby="modal-desc-id"** — body 첫 단락 (선택)
- [ ] **focus trap**: modal 열림 시 첫 focusable element로 focus 이동, `Tab`/`Shift+Tab`은 modal 안에서만 순환 (외부 컨텐츠로 빠지지 않음)
- [ ] **esc-close**: `Escape` 키로 닫기 + close button 동등 동작
- [ ] **return focus**: 닫힘 시 modal을 연 trigger element로 focus 복귀
- [ ] **scroll lock**: modal 열림 동안 background `overflow: hidden` (scroll 방지)
- [ ] **2.4.11**: container outline + close button focus ring 모두 3:1 충족
- [ ] **WCAG 2.1.2 키보드 트랩**: modal 자체는 의도된 focus trap (외부 가이드 vs WCAG는 "사용자가 모드를 빠져나갈 수 있어야" 조건 — `Esc`/close button으로 충족)

### Toast

일시적 알림 — 사용자 액션 결과(저장 완료, 삭제됨 등) 또는 시스템 이벤트(네트워크 오류 등)를 modal 없이 화면 모서리에 잠깐 표시. 자동으로 닫힘.

#### Structure (기존 토큰 조합 — 신규 토큰 불필요)
- 표면: `surface-default` + `shadow-md` + `radius-md` (기본 카드 구조)
- semantic accent: 좌측 4px stroke 또는 icon으로 `success`/`error`/`warning`/`info` 표현
- 텍스트: `body` (15/400) + (선택) `body-strong` 제목
- close button: optional, 우측 상단 small icon button

#### Variant (semantic 4)
| Variant | 좌측 stroke / icon 색 | 사용 |
|---|---|---|
| success | `success` (`#117A3A`) — `✓` | 저장 완료, 추가됨 |
| error | `error` (`#C53030`) — `!` | 작업 실패, 네트워크 오류 |
| warning | `warning` (`#A85800`) — `⚠` | 임박 만료, 데이터 손실 가능 |
| info | `info` (`#006395`) — `ℹ` | 일반 정보, 동기화 진행 |

`badge`/`alert-text` 토큰을 직접 매핑하지 않고, surface + 기존 semantic 색상 조합 — Toast는 컴포넌트 단위로 별도 sparse 매핑 없이 prose 가이드만.

#### Position
| Position | 사용 |
|---|---|
| **top-right** (desktop default) | 일반 알림 — 우측 상단 (화면 모서리 24px 여백) |
| **top-center** (mobile default) | 모바일 — 상단 중앙, status bar 아래 |
| **bottom-center** (긴급) | 다른 UI 차단 (확인 필요) — 자주 사용 X |

#### Layout
- container size: max-width 360px (desktop) / viewport 폭 - `xl` (모바일)
- padding: `md` (12px) 또는 `lg` (16px)
- icon + text 간격: `sm` (8px)
- 여러 toast 중첩 시: stack 위→아래, 토스트 간 `xs` (4px) 간격
- z-index: modal보다 낮음 (modal 위에 표시되지 않음)

#### Motion
- 등장: slide-in (top-right은 우측에서, top-center은 위에서) + fade (`motion-duration-base` 200ms × `motion-ease-out`)
- 자동 닫힘 timer: success/info 4초, warning 6초, error 8초 (긴 텍스트는 +2초)
- 사라짐: slide-out + fade (`motion-duration-fast` 150ms)
- hover 시 timer pause, leave 시 resume
- `prefers-reduced-motion: reduce` 시 즉시 표시 + cross-fade only

#### Accessibility
- [ ] **role="status"** (success/info, polite) 또는 **role="alert"** (error, assertive)
- [ ] **aria-live**: status는 `aria-live="polite"`, alert는 `aria-live="assertive"`
- [ ] **시간 제한 1.4.13**: timer로 사라지므로 사용자가 충분히 읽을 시간 확보 — error는 dismissible(close button) 권장, 또는 hover/focus pause
- [ ] **2.2.1 Timing Adjustable**: 자동 닫힘 시간을 사용자가 끄거나 연장 가능하도록 옵션 제공 (시스템 설정 또는 prefers-reduced-motion 기반 +50% 시간)
- [ ] **focus 가져오지 않기**: toast 등장이 사용자의 focus를 빼앗으면 안 됨 — `tabindex="-1"` (focus 안 받음, screen reader는 aria-live로 읽음)
- [ ] **dismissible toast**: close button `aria-label="알림 닫기"` 필수

### Tooltip

hover / focus 시 나타나는 작은 hint — 아이콘 only 버튼의 의미 설명, truncated 텍스트 전체 보기, 키보드 단축키 안내 등.

#### Structure (신규 토큰 없음)
- 표면: `surface-default-dark` (`#242938`) — 라이트 모드에서도 다크 surface 사용 (시각적 강조 + Toss/Material 패턴)
- 텍스트: `text-primary-dark` (`#F5F6FA`) — `surface-default-dark` 위 11.40:1 ✅ AAA
- shadow: `shadow-sm` (light variant — tooltip은 다크 표면이지만 페이지 배경에 대한 elevation은 light shadow로)
- radius: `radius-sm` (4px) — 작은 컴포넌트 톤
- 다크 모드 페이지에서: 동일하게 `surface-default-dark` 사용 (페이지 자체가 어둡지만 카드/표면이 한 단 밝아 tooltip은 별도 색조 필요 — 또는 `bg-page-dark`보다 한 단 더 어둡게? 일관성 위해 `surface-default-dark` 유지)

#### Layout
- padding: `xs` 4px (V) / `sm` 8px (H)
- text: `caption` (12/400) — 짧은 한 줄 권장, 최대 2줄
- max-width: 240px (그 이상 길면 popover/dialog로 격상 권장)
- arrow: optional 6px 삼각형 (anchor 방향)
- offset from anchor: `xs` (4px) gap + (선택) arrow

#### Position
| Position | 사용 |
|---|---|
| top (default) | 일반 — anchor 위쪽 |
| right | sidebar nav item, 좌측 정렬 inline 요소 |
| bottom | 화면 상단 anchor (header icon 등) |
| left | 우측 정렬 inline 요소 |

자동 flip: viewport 경계 초과 시 반대 방향으로 자동 전환 (e.g. top → bottom).

#### Motion
- 등장: fade-in (`motion-duration-fast` 150ms × `motion-ease-out`) — scale 효과 X (작은 hint는 빠른 fade가 자연)
- 사라짐: fade-out (`motion-duration-fast`)
- delay 정책:
  - **hover**: 500ms 지연 후 표시 (의도하지 않은 hover로 깜박임 방지)
  - **focus**: 0ms 즉시 표시 (키보드 사용자는 즉시 정보 필요)
  - 다른 tooltip이 이미 보이는 상태에서 인접 anchor로 이동 시: 0ms 즉시 (사용자가 tooltip을 적극 탐색 중)

#### Accessibility
- [ ] **role="tooltip"** 또는 anchor에 **aria-describedby="tooltip-id"** (둘 중 하나)
- [ ] **anchor focusable**: tooltip은 hover만으로는 키보드 사용자에게 보이지 않음 — anchor가 `<button>`/`<a>`/focusable 또는 `tabindex="0"` 필수
- [ ] **WCAG 1.4.13 Content on Hover or Focus** (AA 2.1):
  - **Dismissible**: `Esc` 키로 tooltip 닫기 가능
  - **Hoverable**: tooltip 자체에 hover 가능 (사용자가 텍스트 읽으려 mouse 이동해도 사라지지 않음)
  - **Persistent**: trigger를 유지하는 동안(hover/focus 유지) tooltip 유지
- [ ] **icon-only button**: tooltip 외에도 `aria-label` 필수 (tooltip 안 보일 때 screen reader가 의미 알 수 있어야)
- [ ] **touch device**: tooltip은 hover 의존이라 모바일에서 미작동 — 모바일은 tap → tooltip 표시(2번째 tap으로 동작) 또는 별도 (i) 정보 아이콘 사용

### Dropdown (Menu / Select 공통 패턴)

trigger 클릭/키보드로 펼쳐지는 옵션 list — context menu, action menu, select form control 모두 동일 패턴 베이스.

#### Structure (신규 토큰 없음)
- trigger: button 또는 Input variant 사용
- panel(floating menu):
  - 표면: `surface-default` + `outline-strong-light` 1px + `shadow-md` (light) / dark variant
  - radius: `radius-md` (8px)
  - padding: `xs` (4px) 4면 (item 간 간격용)
- item:
  - height: 36px (touch 권장 44px → `lg` size variant 옵션)
  - padding: `sm` 8px / `md` 12px (V/H)
  - text: `body` (15/400)
  - hover: `surface-input` 배경
  - selected: `primary` 좌측 stroke 또는 우측 ✓ icon (brand 파일 참조)
  - disabled: `text-disabled` + cursor:not-allowed (1.4.3 incidental)

#### Variant
| Variant | 사용 |
|---|---|
| **menu** (default) | action menu — 클릭 시 액션 실행, 토글 panel |
| **select** | form control — 선택 후 panel 닫힘 + trigger에 선택값 표시 |
| **multi-select** | 다중 선택 — checkbox item, panel 닫힘 manual (밖 클릭/Esc) |
| **combobox** | search input + dropdown — typeahead로 필터링 |

#### Layout
- panel max-height: 400px → 초과 시 내부 scroll (overflow-y: auto)
- panel min-width: trigger width 또는 `lg` (16rem)
- panel offset from trigger: `xs` (4px) gap
- 자동 flip: viewport 하단 초과 시 위쪽으로 (Tooltip과 동일 패턴)

#### Motion
- 등장: panel scale(0.96 → 1) + fade-in (`motion-duration-fast` 150ms × `motion-ease-out`) — Modal보다 짧은 duration (작은 크기 + 인라인 인터랙션)
- 사라짐: 역순 (`motion-duration-fast`)
- `prefers-reduced-motion: reduce` 시 즉시

#### Accessibility
- [ ] **role 적절히**:
  - menu: `role="menu"` + items `role="menuitem"`
  - select: `<select>` HTML 또는 `role="combobox"` + `role="listbox"` + items `role="option"`
- [ ] **aria 상태**: trigger `aria-expanded="true|false"` + `aria-haspopup="menu|listbox"`
- [ ] **focus management**:
  - 열릴 때: 첫 번째 item으로 focus (또는 select의 경우 현재 선택값)
  - 닫힐 때: trigger로 return focus
  - panel focus trap 비활성 (밖 클릭/Esc로 자연 닫힘)
- [ ] **키보드 네비게이션**:
  - `↑`/`↓` arrow: items 사이 이동
  - `Home`/`End`: 첫/마지막 item
  - `Enter`/`Space`: 선택
  - `Esc`: 닫기 + return focus
  - 글자 입력(typeahead): 해당 글자로 시작하는 item으로 jump (combobox / 일부 select에서)
- [ ] **2.4.11**: panel 외곽선(`outline-strong`) 충분한 대비 + item focus state visible
- [ ] **dismiss**: panel 외부 클릭, Esc 키, trigger 재클릭 모두 닫음

### Tabs

콘텐츠 영역을 여러 view로 분할 — detail page의 섹션 전환, dashboard의 카테고리 toggle, 설정 페이지의 grouping.

#### Structure (신규 토큰 없음)
- tab list: 가로/세로 정렬된 trigger 모음
- tab trigger:
  - inactive: `text-secondary` + 투명 배경
  - active: `text-primary` + bottom border 2px (또는 fill, variant 별)
  - hover: `text-primary` + 미세 배경(`surface-input`)
  - disabled: `text-disabled` + cursor:not-allowed
- tab panel: 하단 콘텐츠 영역, `surface-default` 위 `body` (15/400)

#### Variant
| Variant | Active 표현 | 사용 |
|---|---|---|
| **underline** (default) | bottom border 2px `primary` (brand 색) + `text-primary` | desktop primary tabs |
| **fill** | active tab 배경 `primary` 채움 + `text-on-accent` | mobile bottom nav 류, sticky tab |
| **pills** | active tab radius `radius-full` + 배경 `primary-light` 12% tint + `text-primary` | sub-tab, secondary nav |
| **vertical** (sidebar) | active tab 좌측 border 2px + `text-primary` + 배경 `surface-input` | sidebar navigation |

#### Size
| Size | height | text | padding (V/H) |
|---|---|---|---|
| sm | 36px | `caption` (12/400) | `xs` / `md` |
| **md** (default) | 44px | `body-strong` (15/600) | `sm` / `lg` |
| lg | 52px | `body-strong` (15/600) | `md` / `lg` |

#### Layout
- tab trigger 간격: `xs` (4px) gap
- tab list 아래 `divider-light` 1px line (underline variant) — active tab 아래는 더 진한 2px border가 line을 덮음
- tab panel padding: `lg` (16px) 또는 `xl` (24px) — variant에 따라

#### Motion
- 인디케이터 transition: `motion-duration-fast` 150ms × `motion-ease-out` (border 위치 이동 시 underline slide)
- 패널 전환: instant 또는 `motion-duration-fast` fade (instant이 일반적)

#### Accessibility
- [ ] **role**:
  - tab list: `role="tablist"`
  - trigger: `role="tab"` + `aria-selected="true|false"` + `aria-controls="panel-id"`
  - panel: `role="tabpanel"` + `aria-labelledby="tab-id"` + `tabindex="0"` (panel focus 가능)
- [ ] **키보드 네비게이션** (manual activation):
  - `Tab`: tab list로 진입 → 현재 active tab으로 focus
  - `←`/`→` arrow: 인접 tab으로 focus 이동(activation 안 함)
  - `Home`/`End`: 첫/마지막 tab focus
  - `Enter`/`Space`: focus된 tab 활성화
  - vertical variant은 `↑`/`↓` arrow 사용
- [ ] **automatic activation** (대안): focus 이동 시 자동 activation — content가 가벼울 때만 (form 입력 중 자동 전환은 사용자 혼란)
- [ ] **2.4.11**: active indicator 충분한 대비 (`primary` × `bg-page` 3:1 이상 — brand 파일 contrast 참조)
- [ ] **모바일 swipe**: tab panel을 swipe로 전환 가능 시 키보드 동등 동작 + `aria-live` 변경 알림 권장

### Switch / Checkbox / Radio (control 묶음)

binary on/off 상태 또는 group 선택을 표현하는 form control 3종. 공통 a11y 베이스 + 시맨틱 차이.

#### 의미 차이
| Component | 의미 | 변경 시점 |
|---|---|---|
| **Switch** | 즉시 적용되는 토글 (on/off) | toggle 즉시 effect (e.g. 알림 켜기/끄기) |
| **Checkbox** | 다중 선택 또는 단일 confirm | form submit 시점 또는 즉시 적용 |
| **Radio** | 그룹 내 단일 선택 | form submit 또는 즉시 |

선택 기준: **즉시 적용 + on/off** → Switch, **다중 선택 + form** → Checkbox, **단일 선택 + group** → Radio. UI 혼동 회피를 위해 의미별 명확히 분기.

#### Spec 공통 (신규 토큰 없음)
| 요소 | light | dark |
|---|---|---|
| inactive 외곽선 | `border-strong` (`#7D8593`) 1px | `border-strong-dark` (`#8B95A8`) |
| inactive 채움 | `surface-input` (`#F0F2F7`) | `surface-input-dark` (`#2D3346`) |
| active 채움 | `primary` (brand) | `primary` (brand) |
| active 표시(핸들/체크) | `text-on-accent` (`#FFFFFF`) | `text-on-accent` |
| disabled | opacity 0.5 + cursor:not-allowed (1.4.3 incidental) |

#### Switch
- 크기: `lg` 32×20 (track) / `md` 28×16 / `sm` 24×14
- 핸들(thumb): track height - 4px, `radius-full`
- track radius: `radius-full`
- toggle motion: 핸들 좌우 이동 (`motion-duration-fast` 150ms × `motion-ease-out`) + 색 변화

#### Checkbox
- 크기: 18×18 default, sm 16×16, lg 20×20
- box radius: `radius-sm` (4px)
- check icon: `text-on-accent` (`✓`) 12×12
- indeterminate state: 가로 dash `text-on-accent` 12×2
- check motion: 등장 `motion-duration-fast` scale + opacity, 사라짐 동일

#### Radio
- 크기: 18×18 default, sm 16×16, lg 20×20 (Checkbox와 동일)
- box radius: `radius-full`
- inner dot: 8×8 `text-on-accent` `radius-full`
- selected motion: dot 등장 `motion-duration-fast` scale

#### Layout
- label 위치: control 우측 (LTR) — control과 label 간 `sm` (8px) 간격
- 그룹 spacing:
  - vertical group: 항목 간 `md` (12px) ~ `lg` (16px)
  - horizontal group: 항목 간 `lg` (16px)
- group label (group 제목): control 위 `caption` + `xs` 간격

#### Touch target (WCAG 2.5.5)
- control 자체는 18×18 (작음) — **반드시 label까지 포함한 hit area가 44×44px 이상** 확보 필수
- label 클릭으로도 toggle/select 가능 (`<label for="...">` 또는 control wrap)

#### Accessibility
- [ ] **HTML**: `<input type="checkbox|radio">` + `<label for="...">` 사용 — native a11y 자동
  - Switch는 HTML native 없음 → `<input type="checkbox" role="switch">` 또는 `role="switch"` + `aria-checked`
- [ ] **focus ring**: control 외곽 + label 영역 모두 focus indicator 표시 (`border-focus` 2px outline)
- [ ] **aria 상태**:
  - Checkbox: `aria-checked="true|false|mixed"` (mixed = indeterminate)
  - Radio: group은 `role="radiogroup"` + `aria-labelledby="group-title"`
  - Switch: `role="switch"` + `aria-checked` (또는 native checkbox + `role="switch"`)
- [ ] **키보드**:
  - Checkbox/Switch: `Space`로 toggle
  - Radio: arrow keys (`↑`/`↓` 또는 `←`/`→`)로 group 내 이동, 선택 즉시
  - Tab으로 group 진입 → 첫 번째 또는 현재 선택값으로 focus
- [ ] **disabled 상태**: control + label 모두 disabled 표시 + 1.4.3 incidental
- [ ] **error 상태** (form validation 실패): control 외곽선 `error` 색 + alert text 동반

### Avatar (v58 추가)

사용자 식별 시각 요소 — 이미지 또는 이름 이니셜 + categorical color. HR 직원 카드 / Desk 사용자 메모 작성자 표현 핵심. **새 토큰 추가 0** (기존 chart palette + text-on-accent 활용).

#### Size
| Size | px | text | 사용 |
|---|---|---|---|
| sm | 24 | `caption` 12/400 | inline (table row, dropdown) |
| **md** (default) | 32 | `body-strong` 15/600 | list item, comment author |
| lg | 40 | `heading-sm` 16/600 | profile card, detail header |
| xl | 56 | `display-md` 21/700 | hero profile, settings |

#### Shape
- 원형 default (`radius-full`) — 일반 사용자.
- 사각형 변형 (`radius-md`) — list view 컴팩트 (HR 데이터 그리드 inline).

#### Color (chart palette categorical)
hash(name) % 10 → `chart-{red,orange,yellow,green,blue,indigo,violet,pink,brown,gray}` 분배. brand-neutral (chart palette 통일). 텍스트는 `text-on-accent` (white). 다크 모드는 `chart-{name}-light` + 어두운 보색 텍스트.

#### Status indicator (선택)
- online: `success` 12×12 dot + `surface-default` 1px 외곽선 (avatar 우하단).
- offline: `text-tertiary` 또는 `surface-input`.
- HR-specific 상태(재직/휴직/퇴직)는 brand 파일 prose 참조.

#### Layout
- avatar + 이름 inline: gap `sm` (8px). 이름은 `body` 15/400 default.
- avatar group (다중 사용자): overlap -25% 너비, 최대 3개 + `+N more` indicator (`caption` 12px).

#### Motion
- hover: opacity 0.9 + scale(1.05) `motion-duration-fast` × `motion-ease-out`. interactive avatar (link/button)에만 적용.
- `prefers-reduced-motion: reduce`: 0ms 즉시.

#### Accessibility
- `aria-label="{name} 프로필 사진"` 또는 alt text 필수 — 이미지 없으면 이니셜 대체.
- focus ring: `border-focus` 2px outline + 1px offset (interactive avatar).
- 이니셜 텍스트는 시각만 — screen reader는 `aria-label` 의 이름 발화.

#### Sparse component 매핑 (lint contrast 활성)
`avatar` 단일 매핑 (`{colors.chart-blue}` background + `{colors.text-on-accent}` text). 실제 categorical 분배는 컴포넌트 레벨 hash 로직 처리. lint는 단일 페어로 활성화 — chart-blue × text-on-accent 5.02:1 통과(v21 chart-blue 손계산 4.66:1 + 흰 텍스트 contrast).

#### 추가 이유
1. v33-v48 컴포넌트 batch는 form/feedback/structure 위주 — 사용자 식별 컴포넌트(avatar) 부재.
2. HR 직원 카드(preview Phase 2 직원 상세) / Desk 사용자 메모(작성자 표시)에서 핵심.
3. **새 토큰 추가 0** — 기존 chart palette + text-on-accent 활용. lint contrast 부담 0.

#### HR / Desk 듀얼 브랜드
spec 자체는 brand-neutral. brand 파일에서 사용 패턴 차이 prose — HR(데이터 그리드 inline 작은 사이즈), Desk(profile/메모 inline 중-대 사이즈) 분기.

### Calendar (v61 추가)

날짜 선택·표시 컴포넌트. HR(휴가 신청·승인 일정), Desk(가계부 거래일·할일 due date) 양쪽 핵심. **새 토큰 추가 0** — 기존 typography(`caption`/`body-strong`) + radius/spacing + brand primary로 구성.

#### Layout
- 7×N 그리드 (요일 헤더 1행 + 4–6 주 행).
- day cell: 정사각형 — `lg` 사이즈 `40×40`(데스크탑), `md` 사이즈 `36×36`(모바일/컴팩트).
- gap: `xs` (4px) — 주말 강조 없이 균일.
- month/year header: `heading-md` 19/600, 좌우 `←`/`→` 네비 버튼(`outline-strong` icon).
- 요일 라벨: `caption` 12/400 `text-tertiary`, 일요일은 `error`(휴일 톤), 토요일은 `info`(브랜드 무관 관례).

#### Day cell variant × state
| Variant | bg | text | radius | 메모 |
|---|---|---|---|---|
| **default** | transparent | `text-primary` | `radius-full` (40px 원형) | hover시 `surface-input` 채움 |
| **today** | transparent | `primary` | `radius-full` + `border-focus` 1px outline | 선택 안 됐어도 시각 강조 |
| **selected (single)** | `primary` | `text-on-accent` | `radius-full` | brand primary 채움(잉크) |
| **range-start / range-end** | `primary` | `text-on-accent` | `radius-full` (선택 cell) + 인접 셀 까지 `primary-light` 띠 | 휴가 기간·기간 거래 표시 |
| **range-mid** | `primary-light` | `text-primary` | `0` (사각 띠) | 시작·끝 셀 사이 연결 |
| **disabled (off-month)** | transparent | `text-tertiary` | `radius-full` | 이전·다음 달 회색 톤 |
| **disabled (휴일/잠금)** | transparent | `text-disabled` | `radius-full` | cursor:not-allowed |

#### Size
| Size | cell | text | 사용 |
|---|---|---|---|
| sm | 32×32 | `caption` 12/400 | inline mini calendar (datepicker dropdown) |
| **md** (default) | 36×36 | `body` 15/400 | 모바일 풀스크린 |
| lg | 40×40 | `body-strong` 15/600 | 데스크탑 풀 페이지 |

#### Header navigation
- 좌우 화살표(◁ ▷): 24×24 hit area는 `touch-min` (44×44) 확보를 위해 padding `sm` 적용.
- 월/년 표시 클릭시 month picker(드롭다운) 또는 year picker(grid) 변환 — Dropdown spec 참조.

#### Touch target
- day cell 자체는 36–40px이지만 inline padding 없이 셀 자체가 hit area — `sm`–`md` 사이즈에서 모바일 사용 시 `touch-comfortable` (48×48) 권장.
- 좌우 네비 버튼은 `touch-min` (44×44) 필수.

#### Motion
- selected/range 변경: `motion-duration-fast` (150ms) `motion-ease-out` — bg 색·radius 동시 트랜지션. range는 시작·끝 동시 페인트(staggered 금지).
- month transition: 좌우 슬라이드 `motion-duration-base` (200ms) — 화살표 방향과 일치.
- `prefers-reduced-motion: reduce`: 모든 트랜지션 0ms.

#### Accessibility
- [ ] **HTML**: `<table role="grid">` 또는 `<div role="grid">` + 행 `role="row"` + 셀 `role="gridcell"`.
- [ ] **aria 라벨**: 셀에 `aria-label="2026년 5월 10일 일요일"` 형식. `aria-selected="true"`(선택), `aria-current="date"`(today), `aria-disabled="true"`(off-month/잠금).
- [ ] **키보드**:
  - 화살표키 (`↑↓←→`): 일 단위 이동. 주간 경계는 `↑/↓`로 7일씩 이동.
  - `PageUp` / `PageDown`: 월 이동. `Shift+PageUp/PageDown`: 년 이동.
  - `Home` / `End`: 주 시작 / 끝.
  - `Enter` / `Space`: 선택 확정.
  - `Esc`: 드롭다운 datepicker 닫기.
- [ ] **focus ring**: 셀 hover와 별개로 keyboard focus 시 `border-focus` 2px outline + 1px offset.
- [ ] **screen reader**: 월/년 변경 시 `aria-live="polite"` 알림 — "2026년 5월" 발화.
- [ ] **range 선택**: 시작 → 끝 두 단계, 첫 선택 시 `aria-label="시작일 선택됨, 종료일을 선택하세요"` 안내.
- [ ] **disabled cell**: focus 가능하되 선택 불가 — screen reader가 "선택 불가" 발화.

#### Sparse component 매핑 (lint contrast)
신규 yaml 컴포넌트 추가 0 — 기존 `card-light`(default cell ground), `button-primary`(selected cell — brand 파일), `alert-text-success`/`alert-text-error`(요일 헤더 토/일 색)이 contrast 페어 검증 담당. 모든 셀은 기존 토큰 합성으로 표현 가능.

#### 추가 이유
1. v33-v60 컴포넌트 batch에는 시간/날짜 선택 컴포넌트 부재 — HR 휴가·Desk 가계부의 핵심 사용자 흐름이 **날짜 선택 기반**.
2. **새 토큰 0** — 기존 typography/radius/spacing/brand primary 합성으로 표현 가능. lint contrast 부담 0.
3. 모바일/데스크탑 동시 — sm/md/lg 3 사이즈로 mini datepicker dropdown부터 풀 페이지까지 커버.

#### HR / Desk 듀얼 브랜드
spec brand-neutral. brand 파일에서 사용 패턴 차이 prose — HR(휴가 신청 range, 결재 일정 marker), Desk(가계부 거래 dot, 할일 due date 강조) 분기.

### Form layout (v62 추가)

여러 form control(Input/Textarea/Select/Switch/Checkbox/Radio)을 묶는 layout 패턴. 단일 form control spec과 별개로 **field grouping·label 위계·error 정합·a11y 흐름**을 정의.

#### Anatomy
```
[ section title (heading-md) ]
  [ section description (body, text-secondary) ]
  ─────────────────────────────────────
  [ form-group ]
    label (caption / required mark)
    [ input | textarea | select | control ]
    helper / error (caption)
  [ form-group ] ...
```

#### Spacing (4px grid)
| 위치 | spacing | 토큰 |
|---|---|---|
| label ↔ control | 4px | `xs` |
| control ↔ helper/error | 4px | `xs` |
| form-group ↔ form-group | 16px | `lg` |
| section ↔ section | 24px | `xl` |
| section title ↔ first group | 16px | `lg` |

#### Label
- `caption` (12/400) + `text-secondary` 색.
- 필수: 라벨 우측 `error` 컬러 별표(`*`) 또는 "(필수)" 텍스트 — 스크린리더는 `aria-required` 발화 + 시각만 추가.
- 선택: 라벨 우측 `text-tertiary` "(선택)" — 필수 아님을 명시 (긴 form에서 인지 부담↓).

#### Helper / Error 텍스트
- helper(default): `caption` (12/400) `text-tertiary` — control 사용 가이드 (예: "8자 이상").
- error: `caption` (12/400) `error` 색 + screen reader live region (`aria-live="polite"`).
- helper와 error는 동일 위치 — error 등장 시 helper 대체 (`role="alert"` 또는 `aria-describedby` 갱신).

#### Layout 모드
| 모드 | 사용 | 구조 |
|---|---|---|
| **stacked** (default) | 모바일·dense form | label 위, control 아래 — 좁은 viewport 친화 |
| **horizontal** | 데스크탑·settings 페이지 | label 좌측 (고정 폭 25-30%) + control 우측 (잔여 폭) — `xl` (24px) gap |
| **inline** | 단순 toggle group | 한 줄에 control + label 옆 — Switch/Checkbox 단일 옵션에 적합 |

horizontal 모드는 viewport `breakpoint-md` (736px) 이상에서만 사용 — 그 이하는 stacked로 자동 전환.

#### Validation 시점
- **on submit** (default): submit 버튼 클릭 시 검증 — 사용자 입력 흐름 방해 최소화.
- **on blur**: focus 떠날 때 — 즉시 피드백 필요한 경우 (예: 이메일 형식).
- **on change**: 입력 중 실시간 — 강도가 큰 피드백(비밀번호 강도) 또는 글자수 카운터.
- **never run on focus** — 사용자가 입력 시작도 안 했는데 error 띄우면 거슬림.

#### 그룹 actions
- form 하단에 primary action(`button-primary` lg) + secondary(`btn-outlined` lg) 2개 권장.
- 다중 step form: stepper 또는 progress bar(별도 컴포넌트).
- 정렬: 데스크탑 우측 정렬, 모바일 full-width stacked (primary 위/secondary 아래).

#### Fieldset (관련 control 그룹화)
- 시각적 그룹: `<fieldset>` + `<legend>` 또는 group label + 1px `border-default` divider 위.
- group label: `body-strong` (15/600) — section title보다 작고, control label보다 큼.

#### Accessibility (a11y 흐름)
- [ ] **HTML 사용**: `<form>` + `<fieldset>` + `<label for="">` + native control. ARIA는 보충용.
- [ ] **focus order**: tab 순서 = 시각 순서. CSS order/grid order로 시각 reorder는 가능하지만 `tabindex` 변경 금지.
- [ ] **error summary**: form 상단에 모든 error 요약 list (긴 form) — screen reader 사용자가 한 번에 파악.
- [ ] **error 첫 필드 focus**: submit 후 error 발생 시 첫 invalid 필드로 focus 이동 (auto-scroll into view).
- [ ] **success state**: submit 성공 시 toast(success variant) + form 초기화 또는 detail 페이지로 이동.

#### Sparse 매핑
신규 yaml 컴포넌트 0. 기존 `caption-on-card-light/dark`(label), `caption-tertiary-on-card-light/dark`(helper), `alert-text-error`(error text)이 contrast 페어 활성. **prose-only spec** (v60 responsive typography와 동일 톤).

#### 추가 이유
1. 개별 form control(Input/Textarea/Select/Switch/Checkbox/Radio)은 완비, **묶음 layout**과 validation 흐름은 미정의 → form 일관성 빈틈.
2. 한국어 form 가독성(label 위 stacked) + 데스크탑 settings(horizontal) 양쪽 권장 패턴 명시.
3. **새 토큰 0** — 기존 spacing/typography/semantic 토큰 합성 패턴만 정리.

#### HR / Desk 듀얼 브랜드
spec brand-neutral. HR(휴가 신청 form, 평가 입력, 권한 설정) Desk(메모 작성, 가계부 거래 입력, 프로필 수정) 사용 패턴은 brand 파일 prose 참조.

### Skeleton / Loading (v63 추가)

데이터 도착 전 시각 placeholder. **컨텐츠 형태를 미리 그려서** 사용자에게 "곧 나타날 것"을 신호 → 빈 화면 또는 spinner보다 인지 부담↓. v63 `motion-duration-loop`(1500ms) + `motion-ease-linear` 활용.

#### Variant
| Variant | 형태 | 사용 |
|---|---|---|
| **text** | `radius-sm` 사각형 (높이 = body line-height) | 본문 텍스트 placeholder, 1-3 line group |
| **circle** | `radius-full` | avatar, dot indicator placeholder |
| **rect** | `radius-md` 또는 `radius-lg` | image, card, large block placeholder |
| **list-row** | text + circle 합성 | list item (avatar + 이름 + meta) — 가장 빈도 높음 |

#### Width 패턴 (text variant)
- 첫 줄: 100% — 제목/lead
- 중간 줄: 100% — 본문
- 마지막 줄: 60% — 자연스러운 끝맺음 (실제 텍스트 패턴 모방)
- group 사이: `sm` (8px) gap

#### Color & Animation
- **light mode**: 베이스 `surface-input` (`#F0F2F7`) + shimmer `surface-default` (`#FFFFFF`).
- **dark mode**: 베이스 `surface-input-dark` (`#2D3346`) + shimmer `surface-default-dark` (`#242938`).
- **shimmer**: 좌→우 그라디언트 sweep (`linear-gradient(90deg, base 0%, shimmer 50%, base 100%)`) + `background-position` 애니메이션. **1주기 `motion-duration-loop` (1500ms) × `motion-ease-linear`**.
- **alternative**: pulse — `opacity` 0.5 ↔ 1 반복 (저성능 디바이스 fallback). 동일 duration·easing.

#### Size
text variant는 `body` line-height(24px) 베이스 — 글자 사이즈에 비례한 height (sm 16, md 24, lg 32). circle/rect는 컨텐츠 사이즈 따라 (avatar `md` 32×32 등). 실측 컴포넌트 사이즈와 동일하게 그려야 layout shift 0.

#### Layout shift (CLS)
- skeleton의 사이즈 = 실제 컴포넌트 사이즈와 정확히 일치. 데이터 도착 시 layout 변화 없음.
- aspect-ratio 또는 explicit width/height 지정. 가변 길이는 평균 또는 maximum 기준.
- 페이드 전환: `motion-duration-fast` (150ms) opacity — skeleton 사라지고 실제 컨텐츠 등장.

#### Accessibility
- [ ] **`aria-busy="true"`**: skeleton 영역에 부모 요소 attribute 적용 — screen reader가 "로딩 중" 상태 인지.
- [ ] **`aria-live="polite"` + 텍스트**: 데이터 도착 시 보이지 않는 status text("불러오기 완료") 갱신 — 사용자에게 알림.
- [ ] **2.2.2 Pause·Stop·Hide**: 데이터 도착 시 자동 정지(=숨김) — 5초 이상 지속 시 timeout/error 안내 권장.
- [ ] **2.3.3 Reduced motion**: `prefers-reduced-motion: reduce` 시 shimmer 제거 → 단색 placeholder만 (또는 매우 느린 pulse).
- [ ] **시각적 차별**: skeleton vs 실제 컨텐츠 시각 구분 가능해야 — 색상이 너무 진하면 데이터로 오인. `surface-input` 톤 유지.

#### Sparse component 매핑 (lint contrast)
신규 yaml 컴포넌트 0 — skeleton은 텍스트 없는 표면 placeholder, contrast 페어 활성 대상 아님. 기존 `divider-light/dark`(border-* 시각 요소) 패턴과 동일 — sparse but lint contrast 미발동. **prose-only spec** (v60 responsive typography, v62 Form layout과 동일 톤).

#### 추가 이유
1. v33-v62 컴포넌트 batch에 **로딩 상태 컴포넌트 부재** — Modal/Toast(완료 상태), Empty(데이터 없음 상태)는 있지만 "로딩 중" 시각 표현 미정의.
2. HR(결재 list 로딩, 직원 검색 로딩) Desk(메모 list 로딩, 가계부 dashboard 로딩) 양쪽 빈번 사용 사례.
3. **v63 motion 토큰 도입과 함께** — `motion-duration-loop` + `motion-ease-linear` 첫 사용 사례. 이후 spinner/pulse도 동일 토큰 재사용 가능.

#### HR / Desk 듀얼 브랜드
spec brand-neutral — skeleton은 색상 자체가 neutral surface. brand 파일에서 사용 패턴 차이 prose — HR(데이터 그리드 list-row 위주, dense), Desk(card/메모 전체 placeholder, 친근 톤).

### Pagination (v67 추가)

긴 list / 데이터 그리드 페이지 분할. **새 토큰 추가 0** — 기존 button/text/spacing 합성.

#### Variant
| Variant | 사용 |
|---|---|
| **numbered** (default) | `← 1 2 3 ... 10 →` — 페이지 명시. 데이터 양 예측 가능 (HR 결재 list, 직원 검색 결과) |
| **prev-next** | `← Previous · Next →` — 페이지 번호 없이 단방향 이동. 무한 스크롤 대안 (Desk 메모 보관함, 영수증 list) |
| **load-more** | `더 보기` 버튼 1개 — 점진적 expand. mobile 친화 (Desk 가계부 거래 목록) |

#### Anatomy (numbered)
- 좌측: `←` prev 버튼 (touch-min 44 hit area)
- 가운데: 페이지 번호 button group — current는 `primary` 채움 + `text-on-accent`, 다른 페이지는 transparent + `text-secondary`
- 우측: `→` next 버튼
- ellipsis (`...`): 5+ 페이지에서 1, 2, 3, ..., 9, 10 패턴

#### Size
| Size | button | 사용 |
|---|---|---|
| sm | 32×32 | inline (테이블 footer) |
| **md** (default) | 40×40 | list footer |
| lg | 48×48 | mobile primary 영역 |

#### State
| State | 시각 |
|---|---|
| default | transparent + `text-secondary` |
| hover | `surface-input` 배경 + `text-primary` |
| current | `primary` 채움 + `text-on-accent` (강조) |
| disabled (prev 1페이지, next 마지막) | `text-disabled` + cursor:not-allowed (1.4.3 incidental) |
| focus | `border-focus` 2px outline + 1px offset |

#### Layout
- 페이지 button 사이 gap `xs` (4px)
- prev/next와 number group 사이 `md` (12px)
- pagination 자체는 list 하단 `xl` (24px) margin

#### Accessibility
- [ ] `<nav aria-label="페이지 네비게이션">` wrapper
- [ ] current 페이지 `aria-current="page"` + `<button aria-label="페이지 3, 현재">`
- [ ] prev/next: `aria-label="이전 페이지"`, `aria-label="다음 페이지"`
- [ ] disabled: `aria-disabled="true"` + tabindex="-1"
- [ ] 키보드: Tab으로 진입, Enter/Space로 이동, Arrow keys는 비권장 (네이티브 button 동작 우선)
- [ ] 검색 결과 갱신 시 `aria-live="polite"` 영역에 "총 N건 중 페이지 3" 알림

#### HR / Desk 듀얼 브랜드
spec brand-neutral. brand 파일에서 사용 패턴 차이 — HR(numbered 데이터 그리드 위주), Desk(load-more 모바일 우선).

### Drawer / Sheet (v67 추가)

페이지 위로 슬라이드 인/아웃하는 panel. **새 토큰 추가 0** — `z-drawer` (v65) + `motion-duration-slow` + `overlay-dim` + 기존 surface/radius 합성.

#### Variant
| Variant | 방향 | 사용 |
|---|---|---|
| **side** (right) | 우→좌 슬라이드 인 | 데스크탑 detail panel (HR 직원 detail, 권한 설정) |
| **side** (left) | 좌→우 슬라이드 인 | navigation drawer (Desk hamburger menu) |
| **bottom** | 하→상 슬라이드 인 | mobile 액션 (Desk 거래 입력, 메모 attachments) |
| **top** | 상→하 슬라이드 인 (드물게) | 알림 센터 (notification feed) |

#### Layout
- 너비/높이: side는 `min(80vw, 480px)`, bottom은 `max-height: 75vh`
- radius: side는 좌/우 외곽만 `radius-xl` (20px), bottom은 상단만 `radius-xl`
- padding: `xl` (24px) 4면, header/footer는 `lg` (16px)
- background: `surface-default`, shadow: `shadow-xl`
- 함께: overlay-dim (`overlay-dim-light` 또는 prose-token 동일 alpha)

#### Anatomy
- header: 제목(`heading-md`) + 닫기 버튼(`✕` 24×24 button, `text-tertiary`)
- body: scroll 가능 (overflow-y: auto), main content
- footer (선택): primary action button + secondary
- bottom drawer는 상단에 swipe handle (8×40 `surface-input` rounded bar) 표시 — gesture hint

#### Motion
- 등장: slide + overlay fade (`motion-duration-slow` 300ms × `motion-ease-out`)
- 사라짐: 역순 (`motion-duration-base` 200ms — 닫기는 빠르게)
- bottom drawer swipe-down: 사용자 finger 따라 transform translate, threshold 30% 또는 velocity 기준 닫기
- `prefers-reduced-motion: reduce`: fade-only (slide 비활성)

#### Z-index
- `z-drawer` (1200) — modal(1300)보다 아래, sticky(1100)보다 위
- modal이 drawer 위에서 등장 가능 (modal에 confirm)

#### Accessibility
- [ ] **focus trap**: drawer 열린 동안 tab focus가 drawer 내부에 갇힘 (escape 또는 close 버튼으로 해제)
- [ ] **return focus**: drawer 닫힐 때 trigger 요소로 focus 복귀
- [ ] `role="dialog"` + `aria-modal="true"` (focus trap 명시)
- [ ] `aria-labelledby="drawer-title-id"` — 제목과 연결
- [ ] **Esc**: drawer 닫기 (단, 본문 텍스트 입력 중에는 입력 우선)
- [ ] **overlay click**: 외부 클릭으로 닫기 (단, 폼 입력 중이면 confirmation prompt)
- [ ] **scroll lock**: drawer 열린 동안 body scroll 차단 (`overflow: hidden`)

#### HR / Desk 듀얼 브랜드
spec brand-neutral. brand 파일 — HR(side drawer 데스크탑 detail), Desk(bottom sheet 모바일).

### Spinner / Progress (v67 추가)

데이터 로딩 / 처리 진행 시각화. Skeleton(v63)이 placeholder 톤이면, 본 컴포넌트는 active 진행 표현. **새 토큰 0** — `motion-duration-loop` + brand primary + spacing.

#### Variant
| Variant | 형태 | 진행도 |
|---|---|---|
| **circular spinner** | 원형 회전 | indeterminate (모름) |
| **linear progress (indeterminate)** | 좌→우 흐르는 bar | indeterminate |
| **linear progress (determinate)** | 좌→우 채우는 bar | 0-100% |
| **circular progress (determinate)** | 원형 채우기 (arc) | 0-100% (예: 다운로드) |

#### Spinner (circular indeterminate)
- 사이즈: sm 16 / **md** 24 / lg 32 / xl 48
- stroke: 2px (sm/md), 3px (lg), 4px (xl)
- 색: `primary` (라이트), `primary-light` (다크 — `[data-theme="dark"]`)
- animation: `motion-duration-loop` (1500ms) `motion-ease-linear` 360deg 회전
- arc: 270deg (3/4) — 시각적 회전 인지

#### Progress bar (linear)
- height: `xs` (4px) default, sm 2px (inline), lg 8px (large operation)
- track: `surface-input`
- fill (determinate): `primary`, transition `motion-duration-base` `motion-ease-out`
- fill (indeterminate): 30% width gradient sweeping 좌→우 `motion-duration-loop` `motion-ease-linear`
- radius: `radius-full`

#### Layout
- inline: 텍스트 옆 spinner sm 16 + `xs` (4px) gap
- standalone (loading 화면): 가운데 spinner xl 48 + 라벨 `body` (15/400) `text-secondary`
- progress bar: 컴포넌트 상단 또는 form action 위
- determinate progress: 우측 percentage `caption` (12/400) `text-tertiary` ("42%" 등)

#### Reduced motion
`prefers-reduced-motion: reduce`: spinner 회전 정지, progress determinate transition 비활성. indeterminate progress는 단색으로 fallback (sweeping 비활성).

#### Accessibility
- [ ] indeterminate: `role="status"` + `aria-live="polite"` + 보이지 않는 텍스트 ("로딩 중") — 스크린리더 알림
- [ ] determinate: `role="progressbar"` + `aria-valuenow="42"` + `aria-valuemin="0"` + `aria-valuemax="100"` + `aria-label="업로드 진행"`
- [ ] 5초 이상 indeterminate 지속 시 timeout/refresh 안내 (Skeleton과 동일 패턴, 2.2.2)
- [ ] determinate progress: 100% 도달 시 "완료" 알림 + UI 즉시 다음 상태로 (정체 회피)

#### HR / Desk 듀얼 브랜드
spec brand-neutral. brand 파일 — HR(spinner inline action: 결재 처리 중), Desk(bottom sheet save 진행 progress).

### Stepper (v67 추가)

다단계 form / 결재 흐름 / onboarding 시각화. **새 토큰 0** — primary + semantic + spacing 합성.

#### Variant
| Variant | 방향 | 사용 |
|---|---|---|
| **horizontal** (default) | 좌→우 | desktop form (HR 휴가 신청 3단계, Desk 가계부 분류 설정) |
| **vertical** | 위→아래 | mobile 또는 단계 라벨 길어 horizontal 부적절 시 |
| **simple progress** | 점 dot 진행 | minimal (Desk onboarding 5단계 dot indicator) |

#### State
| State | 시각 (step circle) |
|---|---|
| **completed** | `success` 채움 + ✓ icon (`text-on-accent`) |
| **current** | `primary` 채움 + 단계 번호 (`text-on-accent`) + outer ring `border-focus` 2px |
| **pending** | `surface-input` 배경 + 단계 번호 (`text-tertiary`) |
| **error** | `error` 채움 + `!` icon (단계 검증 실패) |
| **disabled** (skip 가능 단계) | `text-disabled` + opacity 0.5 |

#### Anatomy
- step circle: 32×32 default, sm 24, lg 40 (`touch-min` 44 충족 위해 sm은 padding 보강)
- 라벨: circle 아래 (horizontal) 또는 우측 (vertical), `caption` (12/400)
- connector line: step 사이 1px `border-default` (pending) 또는 2px `success` (completed)
- gap: step 사이 `lg` (16px) horizontal, `md` (12px) vertical

#### Layout
- horizontal: viewport `breakpoint-md` (736px) 이상에서만 사용. 그 이하는 vertical 자동 전환
- vertical: 좌측 dot column + 우측 라벨/내용
- 4단계 이상: 모바일에서 vertical 권장 (horizontal 너무 좁음)

#### Sequential vs Free navigation
- **sequential** (default): 이전 단계 완료 후 다음 단계 진입 가능. 비완료 단계 클릭 비활성
- **free**: 모든 단계 자유 이동 (settings 메뉴 등). 단, 의존성 있는 단계는 disabled

#### Motion
- 단계 전환: completed↔current 색 트랜지션 `motion-duration-base` (200ms) `motion-ease-out`
- connector line fill (next step 진입 시): width 0 → 100% `motion-duration-slow` (300ms) `motion-ease-out`
- error 단계: 진동 (`shake` keyframes 200ms) — `prefers-reduced-motion: reduce` 시 색만 변화

#### Accessibility
- [ ] `<nav aria-label="결재 단계">` wrapper
- [ ] `<ol>` + `<li>` (semantic order)
- [ ] current step `aria-current="step"`
- [ ] completed step `aria-label="단계 1: 신청자 정보, 완료"`, current `aria-label="단계 2: 기간 입력, 현재"`, pending `aria-label="단계 3: 사유, 미진행"`
- [ ] 키보드: Tab으로 단계 이동 (sequential은 disabled 단계 skip)
- [ ] sequential mode 진입 차단 시 screen reader "이전 단계 완료 후 진입 가능" 안내
- [ ] error 단계: `aria-invalid="true"` + alert text 동반

#### HR / Desk 듀얼 브랜드
spec brand-neutral. brand 파일 — HR(결재 단계 horizontal, sequential), Desk(onboarding dot indicator simple, free 옵션).

### Breadcrumb (v68 추가)

페이지 위계 경로 navigation. **새 토큰 0** — Link + Divider + spacing 합성.

#### Anatomy
- 경로 segment list: `Home / 결재 / 결재 큐 / 김지원 휴가 신청`
- separator: `/` (default), `>` 또는 `›` 변형
- last segment: 현재 페이지 — `text-primary` + `aria-current="page"` (link 아님)
- 이전 segment: link + `text-secondary` (hover `text-primary`)

#### Layout
- font-size: `caption` (12/400) default, `body-sm` (14/400) lg
- separator color: `text-tertiary`, gap `xs` (4px)
- truncation: 4+ segment 시 `Home / ... / 부모 / 현재` 패턴 (가운데 ellipsis)

#### Accessibility
- `<nav aria-label="경로">` + `<ol>` semantic
- 마지막 segment `aria-current="page"`, link 없음 (그냥 span)
- separator는 `aria-hidden="true"` (시각만)
- 모바일에서 truncation 시 ellipsis 클릭으로 dropdown — 숨겨진 segment 노출

### Sidebar (v68 추가)

좌측 nav panel — 페이지 단위 메뉴. **새 토큰 0** — surface + button + spacing 합성. Drawer(`z-drawer`)와 다름 — sidebar는 페이지 layout 고정 영역.

#### Variant
| Variant | 사용 |
|---|---|
| **fixed** (default) | 데스크탑 — 좌측 240-280px 고정, 페이지 scroll과 독립 |
| **collapsible** | desktop 토글 — 펼침 240px ↔ 접힘 64px (icon만) |
| **floating** | mobile drawer 톤 — `z-drawer` slide-in (Sidebar pattern + Drawer 합성) |

#### Anatomy
- header: 로고 + brand title (collapsible 접힘 시 logo만)
- nav items: list — icon + label + badge(옵션, count)
- footer: 사용자 profile + 설정 access
- divider: 그룹 구분

#### State
- default: transparent + `text-secondary`
- hover: `surface-input` 배경 + `text-primary`
- active: `primary` 좌측 stroke 4px + `surface-input` 배경 + `text-primary` (또는 `primary` bold text)
- focus: `border-focus` 2px outline (item 외곽)

#### Layout
- nav item height: `touch-min` 44 (모바일), 40 (데스크탑 dense)
- padding: `sm` (8px) V / `md` (12px) H
- icon: 20×20, label `body` (15/400)
- group title: `caption` (12/600) `text-tertiary` uppercase

#### Accessibility
- `<aside aria-label="주 메뉴">` wrapper
- nav items: `<a>` + `aria-current="page"` (active)
- collapsible toggle: `aria-expanded`, button label "메뉴 펼치기" / "접기"
- 키보드: Tab 진입, arrow keys 옵션 (네이티브 link 위주)

### Navigation Menu (v68 추가)

데스크탑 다단계 메뉴 — header 내 mega menu 패턴. **새 토큰 0** — Dropdown 확장.

#### Variant
| Variant | 사용 |
|---|---|
| **single-level** | header link 5-7개 — Dropdown(v45) 패턴 |
| **mega menu** | header link hover/click → 큰 panel (multi-column items + 카테고리 그룹) |

#### Anatomy (mega menu)
- trigger: header link button
- panel: viewport 너비 또는 fixed 800-1200px, multi-column grid
- item group: column header(`caption-md` 14/600) + items list
- featured: 첫 column에 brand promo card 또는 highlight (image + heading + description)

#### Layout
- panel offset from trigger: `xs` (4px)
- panel padding: `xl` (24px)
- column gap: `xl` (24px)
- item: icon + label + description (line-2)

#### Motion
- 등장: panel slide-down (10px) + fade-in `motion-duration-fast` (150ms) `motion-ease-out`
- 사라짐: 역순
- hover intent: 200ms delay 후 panel 등장 (실수 hover 회피)

#### Accessibility
- `<nav aria-label="주 navigation">` + `role="menubar"` + items `role="menuitem"`
- panel: `role="menu"` + items `role="menuitem"`
- 키보드: arrow keys로 menubar/menu 이동, Esc 닫기, Enter 활성화
- focus visible 명시 (mouse hover ≠ keyboard focus)

### Menubar (v68 추가)

데스크탑 application 상단 menu bar — 파일/편집/보기 같은 데스크탑 metaphor. **새 토큰 0** — Dropdown 합성.

#### Anatomy
- bar: 가로 button list (메뉴 group)
- 각 button: 클릭/Alt+key shortcut으로 dropdown panel 등장
- panel: Dropdown(v45) menu variant — items + separator + submenu

#### Differences vs Navigation Menu
- Menubar: Application metaphor (Windows/macOS app bar) — File / Edit / View / Help
- Navigation Menu: Website metaphor — Products / Pricing / Docs / Blog
- Menubar는 **keyboard-first** (Alt+F → File 메뉴), Navigation Menu는 mouse-first (hover 활성)

#### Layout
- bar height: `touch-nav-h` (32px) precision desktop, `touch-min` (44px) standard
- button padding: `sm` (8px) V / `md` (12px) H
- separator (group 구분): vertical 1px `border-default`

#### Accessibility
- `role="menubar"` + items `role="menuitem"` + `aria-haspopup="menu"`
- 키보드:
  - Alt + 첫 글자: 메뉴 열기 (예: `Alt+F` → File)
  - 좌/우 arrow: menubar 이동
  - 위/아래 arrow: dropdown 내부
  - Esc: 닫기, return focus

### Command (Cmd+K menu, v68 추가)

전역 search/action menu — `Cmd+K` (macOS) / `Ctrl+K` (Windows)로 호출. **새 토큰 0** — Modal + Dropdown + Input 합성.

#### Anatomy
- overlay: `overlay-dim-light` 위 modal-like
- 카드: `surface-default` + `radius-lg` + `shadow-xl`, viewport 60-70% width, max 640px
- header: search input (placeholder "명령 검색...")
- body: filtered list — group(title `caption` `text-tertiary` + items)
- item: icon + label + shortcut hint 우측 (`⌘P` 등 monospace `caption`)

#### Sections (예시)
- **Suggestions**: 자주 사용한 명령
- **Pages**: 페이지 navigation (Home, Settings, Help)
- **Actions**: 즉시 실행 (New File, Save, Export)
- **Help**: docs, support links

#### State
- default: list 표시, 첫 item highlighted
- typing: filter (substring match)
- empty result: `caption` "결과 없음" + 빠른 안내

#### Motion
- 등장: scale(0.95→1) + fade-in `motion-duration-base` (200ms) `motion-ease-out`
- 사라짐: 역순 (`motion-duration-fast`)

#### Accessibility
- `role="dialog"` + `aria-label="명령 검색"`
- search input `aria-controls="cmd-list"` + `aria-activedescendant="item-id"` (현재 highlighted item)
- list `role="listbox"` + items `role="option"` + `aria-selected="true"` (highlighted)
- 키보드:
  - `Cmd+K` / `Ctrl+K`: 열기 (단, input focus 중에는 차단 가능)
  - 위/아래 arrow: item 이동
  - Enter: 활성화
  - Esc: 닫기 + return focus

#### HR / Desk 듀얼 브랜드 (v68 5종 공통)
spec brand-neutral. brand 파일 — HR(Sidebar 좌측 fixed 데스크탑 위주, Menubar 결재/평가 application 톤), Desk(Sidebar floating 모바일 drawer, Command 메모/할일 빠른 검색 핵심).

### Combobox (v69 추가)

Input + Dropdown 결합 — typing autocomplete + 선택. v45 Dropdown의 combobox variant 확장. **새 토큰 0**.

#### Anatomy
- trigger: Input(v34) + 우측 caret (`▾`)
- panel: Dropdown 패턴 — items list, current 선택 highlight
- typing 중: panel 안 items가 substring 또는 fuzzy match로 filter

#### State
- empty: panel 닫힘, placeholder 표시
- typing: panel 자동 열림, items filter, 첫 match highlight
- selected: trigger에 선택 라벨 + 우측 ✕ 클리어 버튼
- multiple (옵션): chip list로 선택 표시 (`태그 1` `태그 2` × ... + Input)

#### Differences vs Select
- **Select**: 사전 정의된 options 중 1개 선택, typing 없음
- **Combobox**: typing으로 필터 + free text 입력 가능 (옵션) + 다중 선택 가능

#### Accessibility
- `role="combobox"` + `aria-expanded` + `aria-controls="listbox-id"` + `aria-autocomplete="list"`
- listbox: `role="listbox"` + items `role="option"` + `aria-selected`
- 키보드: 위/아래 arrow item 이동, Enter 선택, Esc 닫기, Tab 닫기 + 다음 필드

### Slider (v69 추가)

range 값 선택 (음량, 가격대, 평가 등). **신규 prose-token 후보 — 추후 검토**, 이번 추가 0 (기존 spacing/radius 합성).

#### Variant
| Variant | 사용 |
|---|---|
| **single** (default) | 단일 thumb, 0-100 또는 min-max |
| **range** | 두 thumb (min-max 범위 선택) |

#### Anatomy
- track: `surface-input` 4px height + `radius-full`
- fill: `primary` width transition (selected range)
- thumb: 16×16 circle, `surface-default` + `primary` 2px outline + `shadow-sm`
- label (옵션): thumb 위 또는 우측에 현재 값 (`caption` 12)
- min/max label: track 양 끝 (`caption` `text-tertiary`)
- ticks (옵션): 5/10 단위 마커 (1px tall on track)

#### State
- default: thumb `surface-default` + outline `primary`
- hover: thumb scale(1.1)
- dragging: thumb `primary` 채움 + `shadow-md` 등장 + 라벨 표시
- focus: `border-focus` 2px outline + 1px offset
- disabled: `text-disabled` track + thumb opacity 0.5

#### Layout
- horizontal default — 너비 100%, height 24-32 hit area (thumb 16, padding 8)
- vertical 옵션 — 높이 100-200px (음량 등)
- touch hit area: thumb 자체 16이지만 hit는 `touch-min` (44) — 외곽 padding으로

#### Accessibility
- `role="slider"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax` + `aria-label="음량"`
- range slider: 두 thumb 각각 별도 slider, `aria-label="최소값"` / `aria-label="최대값"`
- 키보드:
  - 좌/우 arrow: ±1 step
  - Shift + arrow: ±10 step (또는 spec step 정의)
  - Home/End: min/max 점프
  - Page Up/Down: ±10% 점프

### Toggle (v69 추가)

단일 button on/off 상태. Switch와 다름 — Toggle은 button 톤(text/icon), Switch는 형태 변환 토글. **새 토큰 0**.

#### Variant
| Variant | 사용 |
|---|---|
| **icon** | icon only — 데스크탑 toolbar (Bold/Italic/Underline 같은) |
| **text** | label only — 필터 button (전체/미완료/완료) |
| **icon-text** | icon + label — bold "B" + 라벨 |

#### State
- off (default): transparent + `text-secondary` + 1px `border-default`
- hover: `surface-input` 배경
- on (pressed): `surface-input` 배경 + `text-primary` + `border-strong` 또는 `primary` 1px stroke
- focus: `border-focus` 2px outline
- disabled: opacity 0.5 + cursor not-allowed

#### Differences vs Switch
- **Switch**: track + handle 형태, 즉시 effect (예: 알림 켜기/끄기)
- **Toggle**: button 형태, on/off 시각이 fill/outline (예: 텍스트 굵게)
- 의미 차이: Switch는 setting, Toggle은 formatting/filtering

#### Accessibility
- `<button aria-pressed="true|false">` (true = on)
- `aria-label="굵게 토글"` (icon only일 때 필수)
- 키보드: Tab focus, Space/Enter toggle

### Toggle Group (v69 추가)

Toggle 묶음 — 단일 선택 (radio-like) 또는 다중 선택 (checkbox-like). **새 토큰 0**.

#### Variant
| Variant | 동작 |
|---|---|
| **single** | 한 번에 하나만 on (radio 의미) — 정렬 옵션 (이름순/날짜순/크기순) |
| **multiple** | 다수 동시 on (checkbox 의미) — 텍스트 포맷팅 (Bold + Italic 동시 가능) |

#### Layout
- group: 버튼 list 좌→우, gap 0 (인접) 또는 `xs` (4px)
- 인접 버튼: 외곽 join — 첫 버튼 좌측 radius, 마지막 버튼 우측 radius, 중간 radius 0

#### State (group 인지)
- single mode: 활성 1개 외 모두 off
- multiple mode: 각 button 독립 on/off

#### Accessibility
- `role="group" aria-label="정렬"` wrapper
- single: `role="radiogroup"` + items `role="radio" aria-checked`
- multiple: items `<button aria-pressed>` (group은 단순 wrapper)
- 키보드:
  - single (radiogroup): arrow keys로 group 내 이동 + 선택, Tab은 group 진입/탈출
  - multiple: 각 button 독립 — Tab으로 이동, Space/Enter toggle

### Input OTP (v69 추가)

일회용 비밀번호 입력 — 6자리 (또는 4자리) 분할 input field. **새 토큰 0**.

#### Anatomy
- 6 (또는 4) 정사각 input — 각각 1자리, `40×40` 또는 `48×48`, `radius-md`
- 가운데 separator (`-`) 옵션 (4-2 또는 3-3 grouping)
- 자동 focus 이동: 입력 시 다음 칸으로 jump, backspace 시 이전 칸

#### State
- empty: `surface-input` 배경 + `border-default` 1px
- focus: `border-focus` 2px outline + offset
- filled: 텍스트 표시 (font-size 18-24px monospace)
- error: `error` 1px border + alert text 동반 ("코드가 일치하지 않아요")
- disabled: opacity 0.5

#### Layout
- gap `xs` (4px) 또는 `sm` (8px) (그룹 사이는 `md` 12px — `[3]-[3]` 패턴)
- 정사각 cell — width = height
- 가운데 정렬 (form 안에서)

#### Accessibility
- 각 input: `<input type="text" inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="OTP 1번째 자리">`
- 첫 input에 `autoFocus`
- iOS: `autocomplete="one-time-code"` — SMS 자동 채우기
- screen reader: 6 input을 별개 field로 인지, label로 위치 알림
- paste: 6자 일괄 paste 시 자동으로 모든 칸 채우기

#### HR / Desk 듀얼 브랜드 (v69 5종 공통)
spec brand-neutral. brand 파일 — HR(Combobox 직원 검색 / Toggle Group 결재 상태 필터 / Slider 평가 점수), Desk(Combobox 태그 자동완성 / Toggle 메모 즐겨찾기 / Input OTP 2차 인증 / Slider 가계부 예산).

### Accordion (v70 추가)

다중 Collapsible — 여러 섹션 접고 펼치기 (FAQ, settings 그룹). **새 토큰 0**.

#### Variant
| Variant | 동작 |
|---|---|
| **single** (default) | 한 번에 하나만 펼침 — 다른 펼치면 이전 자동 닫힘 |
| **multiple** | 다수 동시 펼침 가능 |

#### Anatomy
- 각 item: trigger(header) + content(body)
- trigger: 좌측 label + 우측 caret(`▾` rotate animation), `surface-default` background, 1px `border-default`
- content: surface-default 배경, padding `lg` (16px)
- divider: items 사이 1px border

#### State
- collapsed: caret `▾` (down), content height 0
- expanded: caret `▴` (up, rotate 180deg), content auto height
- hover: trigger `surface-input` background
- focus: `border-focus` 2px outline

#### Motion
- expand: height 0 → auto + opacity 0 → 1 `motion-duration-base` (200ms) `motion-ease-out`
- collapse: 역순
- caret rotate: `motion-duration-fast` (150ms)
- `prefers-reduced-motion`: instant (transition 0)

#### Accessibility
- `<dl>` (description list) 또는 `<div role="region">` 패턴
- trigger: `<button aria-expanded="true|false" aria-controls="content-id">`
- content: `<div id="content-id" role="region" aria-labelledby="trigger-id">`
- 키보드: Tab focus, Enter/Space toggle, arrow keys 옵션 (group 이동)

### Collapsible (v70 추가)

단일 섹션 expand/collapse — Accordion보다 가벼운 단순 toggle. **새 토큰 0**.

#### Anatomy
- trigger: button (text 또는 icon-text)
- content: hidden/shown 영역

#### Differences vs Accordion
- **Collapsible**: 단일 섹션, 독립 toggle
- **Accordion**: 여러 섹션 그룹, single/multiple mode

#### State
- collapsed: content `display: none` 또는 height 0
- expanded: content 자연 height

#### Use cases
- 긴 form section 접기 (Optional fields)
- detail expansion ("자세히" 클릭 → 추가 정보)
- code snippet 접기 (긴 example block)

#### Accessibility
- trigger: `<button aria-expanded aria-controls>`
- content: `<div id role="region">`
- Enter/Space toggle, 동일

### Hover Card (v70 추가)

hover로 등장하는 preview card — Tooltip보다 풍부한 콘텐츠 (title + description + image + actions). **새 토큰 0** — Tooltip + Card 합성.

#### Anatomy
- trigger: 일반 link 또는 avatar/image — hover 가능 요소
- card: `surface-default` + `radius-md` + `shadow-md`, max-width 320-400px
- 내용: title (`heading-sm`) + description + 작은 image + meta + 옵션 actions

#### Use cases
- 사용자 hover → mini profile (이름, 직급, avatar, 빠른 message 버튼)
- 링크 hover → 페이지 preview (title, description, og:image)
- 태그 hover → 태그 정의 + 사용 횟수

#### Differences vs Tooltip
- **Tooltip**: 단순 1줄 hint, 작음, decoration 톤
- **Hover Card**: 풍부한 카드, interactive (클릭 가능 요소 포함), Tooltip보다 큰 사이즈

#### Motion
- 등장: fade-in + scale(0.95→1) `motion-duration-base` (200ms), 200-300ms hover delay (실수 hover 회피)
- 사라짐: hover 종료 100-200ms 후 (사용자가 card로 마우스 이동 시간 확보)

#### Accessibility
- `aria-describedby` (간단) 또는 `aria-haspopup="dialog"` (interactive content)
- 키보드 사용자: focus로 동일 트리거 가능 (`focus-visible` + `:focus-within`)
- screen reader: hover card 내용은 별도 link/button으로 직접 접근 가능해야 — hover에만 의존 금지
- 모바일: hover 없음 — long-press 또는 tap으로 대체

### Context Menu (v70 추가)

right-click(데스크탑) / long-press(모바일) 메뉴. **새 토큰 0** — Dropdown menu variant.

#### Anatomy
- trigger: 임의 요소 (table row, file icon, message)
- panel: Dropdown menu 패턴 — items + separator + submenu(옵션)
- items: 일반 action ("복사", "삭제") + destructive ("삭제하기" `error` 색)

#### Trigger
- 데스크탑: `oncontextmenu` event (right-click)
- 모바일: long-press (500ms)
- 키보드: `Shift + F10` 또는 `Menu` key

#### State
- panel 위치: 클릭 좌표 기준 — viewport 우/하단 초과 시 자동 flip (panel이 viewport 안)
- destructive 항목: 우측 아래 또는 separator로 분리 + `error` 색

#### Accessibility
- `role="menu"` + items `role="menuitem"`
- 키보드: 방향키로 item 이동, Enter 활성화, Esc 닫기
- screen reader: trigger에 "context menu 사용 가능" 안내 (`aria-haspopup="menu"`)

#### Differences vs Dropdown
- **Dropdown** (v45): 명시적 trigger button (펼치기 의도)
- **Context Menu**: hidden trigger — right-click으로 등장 (조건부 액션)
- 모바일에서 dropdown은 button click, context menu는 long-press — UX metaphor 차이

### Alert Dialog (v70 추가)

destructive confirmation modal — Modal(v43)의 강조 변형. 데이터 삭제, 영구 액션 등. **새 토큰 0**.

#### Differences vs Modal
- **Modal**: 일반 confirmation (저장, 신청 등) — primary action 강조
- **Alert Dialog**: destructive (삭제, 취소 등) — primary `error` 색 + 추가 경고 톤

#### Anatomy
- overlay: `overlay-dim-light` (Modal과 동일)
- card: `surface-default` + `radius-lg` + `shadow-xl` (Modal과 동일 또는 약간 작음)
- icon (옵션): destructive 의미 강조 — `error` 또는 `warning` 24-32px
- title: `heading-md`, 강한 wording ("정말 삭제하시겠어요?")
- description: `body`, 결과 명시 ("이 메모는 영구 삭제됩니다", "취소할 수 없어요")
- actions: primary `btn-primary` `error` 색 배경 + `text-on-accent` ("삭제") + secondary outlined ("취소")
- 액션 순서: 모바일은 destructive를 먼저(상단/좌측), 데스크탑은 우측 (플랫폼 관행)

#### State
- 강조: title + icon이 시각 무게중심
- focus initial: secondary("취소") — destructive 자동 진행 회피

#### Motion
- Modal과 동일 (`motion-duration-base` 200ms × `motion-ease-out`)
- destructive emphasis: 등장 시 작은 scale bounce(1.0 → 1.02 → 1.0) 옵션 — `prefers-reduced-motion` 시 비활성

#### Accessibility
- `role="alertdialog"` (단순 dialog 대신 — alert 의미 강조) + `aria-modal="true"`
- `aria-labelledby="title-id"` + `aria-describedby="desc-id"`
- focus trap (Modal 동일)
- **Esc**: 취소(secondary)와 동일 동작 — destructive 자동 진행 안 함
- 키보드: Tab으로 actions 이동, focus는 secondary부터 시작

#### HR / Desk 듀얼 브랜드 (v70 5종 공통)
spec brand-neutral. brand 파일 — HR(Accordion 결재 detail 그룹 / Hover Card 직원 mini profile / Alert Dialog 결재 반려 confirm / Context Menu 데이터 그리드 row), Desk(Accordion FAQ 설정 / Collapsible 메모 attachments / Hover Card 태그 정의 / Alert Dialog 메모 영구 삭제).

### Table (v71 추가)

기본 표 — 정렬·필터 없는 단순 데이터 표시. **새 토큰 0**.

#### Anatomy
- table: `surface-default` 배경, `border-default` 1px 외곽 (또는 분리 row)
- thead: `caption` (12/600) `text-tertiary` uppercase, `surface-input` 약한 배경
- tbody row: `body` (15/400) `text-primary`, hover `surface-input`
- cell padding: `sm` (8px) V / `md` (12px) H
- divider: row 간 1px `border-default`

#### Variant
| Variant | 사용 |
|---|---|
| **default** | 일반 표 (가독성 우선) |
| **compact** | 행 padding `xs` (4px) — 데이터 밀도↑ |
| **striped** | 짝수 row `surface-input` 배경 — 긴 표 가독성 |

#### State (row)
- default: transparent
- hover: `surface-input` 배경 (interactive row)
- selected: `primary` 8% tint 배경 + 좌측 stroke 2px `primary`

#### Cell type
- text: 좌측 정렬
- number: 우측 정렬 + tabular-nums
- date: 좌측 정렬, monospace 옵션
- action: 우측 정렬, icon button 또는 dropdown trigger
- status: badge 또는 chip

#### Accessibility
- `<table>` + `<thead>` + `<tbody>` semantic
- `<th scope="col">` (header) / `<th scope="row">` (row header)
- caption: `<caption>` 표 제목 (시각 hidden 가능, screen reader 우선)
- 키보드: arrow keys로 cell 이동(옵션, data table에선 필수)

### Data Table (v71 추가)

Table + 정렬/필터/페이지네이션/선택. **새 토큰 0** — Table + Pagination + Combobox + Checkbox 합성.

#### Features
- **sortable column**: header 클릭 → asc/desc/none 3-state. 우측에 caret indicator.
- **filterable column**: header 옆 filter icon → dropdown (text input 또는 multi-select).
- **selectable rows**: 첫 column에 checkbox — header checkbox로 전체 선택.
- **pagination**: footer에 numbered pagination (v67) — 10/20/50 per page selector.
- **column resize**: header 우측 drag handle (옵션).
- **column reorder**: header drag-drop (옵션).

#### Toolbar
- 좌측: search input (전체 column 검색)
- 가운데: filter chips (active filter 표시 + 제거)
- 우측: column visibility toggle, export 버튼

#### Bulk actions (selected rows 있을 때)
- 표 위에 sticky bar 등장: "12개 선택됨 · 일괄 승인 · 내보내기 · 삭제"
- background `primary` 8% tint, 우측 ✕ (선택 해제)

#### Empty state
- 데이터 0건: 가운데 illustration + "표시할 데이터가 없어요" + (필터 적용 시) "필터 초기화" link
- 로딩: Skeleton(v63) list-row variant

#### Accessibility
- sortable: `<th aria-sort="ascending|descending|none">` + click trigger
- selectable: row checkbox `aria-label="행 N 선택"` + header checkbox "모두 선택"
- bulk action bar: `role="region" aria-label="선택된 항목 액션"` + screen reader live announcement
- 키보드 navigation 필수: arrow keys, Home/End, Page Up/Down, Tab

### Carousel (v71 추가)

이미지/카드 슬라이더 — 좌우 화살표 + dot indicator. **새 토큰 0**.

#### Anatomy
- track: 가로 flex, items 일렬 배치
- viewport: track 부모, overflow:hidden, scroll-snap-type
- arrow buttons: 좌/우 (`touch-min` 44 hit), 외곽선 또는 fill, hover 강조
- dot indicators: 하단 가운데 dot list, current dot `primary` 채움, 다른 dot `surface-input`
- pagination text (옵션): "3 / 12" 카운터

#### Variant
| Variant | 사용 |
|---|---|
| **single** | viewport 1 item — hero, 광고 배너 |
| **multi** | viewport 2-4 items 동시 표시 — 카드 list |
| **infinite** | 끝에 도달 시 처음으로 loop — 광고 배너 |

#### Motion
- slide: `motion-duration-base` (200ms) `motion-ease-out` translateX
- swipe: 사용자 finger 따라 transform, 30% threshold 또는 velocity
- autoplay (옵션): 5-7초마다 자동 next, hover 시 pause, `prefers-reduced-motion`에서 비활성

#### Accessibility
- `role="region" aria-roledescription="carousel" aria-label="..."`
- 각 slide: `role="group" aria-roledescription="slide" aria-label="3 / 12: ..."`
- arrow buttons: `aria-label="이전 슬라이드"` / "다음 슬라이드"
- dot indicator: button list, `aria-label="슬라이드 3로 이동"` + `aria-current="true"` (active)
- autoplay: pause 컨트롤 필수 (2.2.2)
- 키보드: Tab으로 carousel 진입, arrow keys로 slide 이동

### Scroll Area (v71 추가)

custom scrollbar 영역 — native overflow + 시각 일관 scrollbar. **새 토큰 0**.

#### Anatomy
- viewport: `overflow: auto`, content scroll 영역
- scrollbar track (가상): viewport 우측 (vertical) 또는 하단 (horizontal)
- scrollbar thumb: drag-able, hover/active 상태별 시각

#### Variant
| Variant | 사용 |
|---|---|
| **always-visible** | scrollbar 항상 표시 (데스크탑 표 등) |
| **hover** (default) | hover 시 scrollbar 등장 (clean look) |
| **scrolling** | scroll 중에만 표시 (mobile 톤) |

#### Style
- track: transparent 또는 `surface-input` 약한 배경
- thumb: `border-strong` 또는 `text-tertiary` opacity 0.4
- thumb hover: opacity 0.7
- thumb active (drag): opacity 1
- width: 6-8px (vertical), height 6-8px (horizontal)

#### Browser fallback
- Webkit (Safari, Chrome): `::-webkit-scrollbar` 커스터마이즈
- Firefox: `scrollbar-color` + `scrollbar-width: thin`
- IE/legacy: native scrollbar fallback (커스텀 무시)

#### Accessibility
- 키보드: 일반 scroll (Up/Down arrow, Page Up/Down, Home/End, Space) — native 동작 보존
- 스크린리더: scroll 영역 진입 시 `aria-label="scrollable region"` 안내 (필요 시)
- focus visible: scroll 영역 안 focus가 viewport 안에 있도록 자동 scroll-into-view

### Resizable (v71 추가)

drag-able split panel — 좌우 또는 상하 분할 layout 사용자 조정. **새 토큰 0**.

#### Anatomy
- container: 2개 이상 panel + 사이 resize handle
- panel: 자유 콘텐츠
- handle: 4-6px wide (vertical split) 또는 height (horizontal split), `border-default` 1px 양쪽
- handle hover: `primary` 색 강조 + cursor: col-resize / row-resize

#### Variant
| Variant | 방향 |
|---|---|
| **horizontal** (split) | 좌-우 panel, vertical handle |
| **vertical** (stacked) | 상-하 panel, horizontal handle |
| **nested** | panel 안에 또 다른 resizable group |

#### State
- default handle: 거의 invisible (subtle line)
- hover handle: `primary` 색 + 가운데 grip dots (∶)
- dragging: `primary` 채움 + cursor 유지 + outline animation 옵션
- collapsed: panel min-width/-height 0 가능 (또는 임계값까지)

#### Constraints
- min/max size: panel별 percentage 또는 px 명시
- snap points: 25%/50%/75% 같은 권장 위치 (drag 시 가까우면 snap)

#### Persistence
- 사용자 조정값 localStorage 저장 권장 — 새로고침 후 복구
- viewport 변경 시 percentage 기준 재계산

#### Accessibility
- handle: `role="separator" aria-orientation="vertical|horizontal"` + `aria-valuenow="50"` (현재 위치 %)
- `aria-controls`로 양쪽 panel id 명시
- 키보드: arrow keys로 ±1% 조정, Home/End로 min/max, Enter/Space로 collapse 토글

#### HR / Desk 듀얼 브랜드 (v71 5종 공통)
spec brand-neutral. brand 파일 — HR(Data Table 결재/직원/평가 그리드 핵심 / Resizable 좌측 nav + 우측 detail / Scroll Area 데이터 그리드 sticky thead), Desk(Carousel onboarding hero / Table 가계부 거래 list / Scroll Area 메모 본문 긴 글 / Data Table 영수증 보관함).

### Sonner (v72 추가, Toast 강화)

multi-toast stack management — v46 Toast의 상위 패턴. 동시 다수 toast 등장·정렬·자동 제거. **새 토큰 0**.

#### Differences vs Toast
- **Toast (v46)**: 단일 toast 컴포넌트 spec — 하나 등장
- **Sonner**: 여러 toast 동시 관리 — stack, dismiss order, auto-collapse

#### Position
| Position | 사용 |
|---|---|
| **bottom-right** (default) | 데스크탑 — 우하단 stack |
| **top-right** | 알림 빈도 높을 때 (HR 결재 알림) |
| **bottom-center** | 모바일 friendly — safe-area-inset-bottom 고려 |
| **top-center** | 강조 (성공/실패 동시 강조) |

#### Stack
- 최대 표시: 3개 (그 이상은 collapsed +N more)
- 새 toast 등장: 가장 위/아래에 추가, 다른 toast는 밀림 (slide animation)
- 자동 dismiss: 5초 (success/info), 7초 (warning), 10초 (error — 사용자 인지 시간 ↑)
- hover stack: 사용자 hover 시 모든 toast 정지 + expand (timer pause)

#### Anatomy (per toast)
- v46 Toast 구조 그대로 — kind icon + title + body + close
- + ✕ close 우측 상단 (각 toast 개별 dismiss)
- + 액션 버튼 옵션 ("실행 취소" — 5초 안에 클릭하면 작업 revert)

#### Motion
- 등장: slide-in from edge + fade `motion-duration-base` (200ms)
- 사라짐: slide-out + fade `motion-duration-fast` (150ms)
- stack reorder: smooth transition `motion-duration-base`
- collapsed +N: `caption` "더 보기 (N)" + 클릭 시 expand

#### Accessibility
- 컨테이너: `role="region" aria-label="알림"`
- 각 toast: `role="alert"` (성공/실패 강조) 또는 `role="status"` (info)
- live region: `aria-live="polite"` (info), `aria-live="assertive"` (error)
- 키보드: Tab으로 toast 진입, Esc 또는 close button으로 dismiss
- 스크린리더: 새 toast 등장 시 자동 발화

#### Z-index
`z-toast` (v65, 1400) — 모든 layer 위.

### Aspect Ratio (v72 추가)

비율 유지 wrapper — image, video, embed가 layout shift 없이 비율 보존. **새 토큰 0** — 단순 utility component.

#### Common ratios
| Ratio | 용도 |
|---|---|
| **16:9** (default) | video, hero image, og:image preview |
| **4:3** | 기존 monitor, photography |
| **1:1** | profile avatar (large), gallery thumbnail |
| **3:2** | DSLR photo |
| **21:9** | cinema, wide hero |
| **9:16** | mobile portrait video |

#### Implementation
- CSS `aspect-ratio` property (modern browsers) — `aspect-ratio: 16 / 9`
- fallback: padding-bottom hack (`padding-bottom: 56.25%` for 16:9)
- 안에 image/video는 `object-fit: cover` (비율 유지 + crop)

#### Anatomy
- wrapper: `aspect-ratio` 명시, `position: relative`
- 내부 element (img/video/iframe): `width: 100%; height: 100%; object-fit: cover`

#### Use cases
- listing 카드 image (16:9)
- gallery grid (1:1 또는 3:2)
- video embed (16:9)
- hero banner (21:9)
- profile cover image (3:1)

#### Accessibility
- wrapper에 시맨틱 없음 — 안에 image/video 자체의 a11y 적용
- image: `<img alt="">` (장식이면 빈 alt) 또는 의미 alt 텍스트
- decorative wrapper만 — `role` 부여 X

### Chart (v72 추가)

데이터 시각화 — 차트 palette(`chart-*` × 10) 활용. **새 토큰 0** — 차트 컬러 v21-v24 기존, 컴포넌트 spec만 추가.

#### Variant
| Variant | 사용 |
|---|---|
| **bar** | 카테고리 비교 (직원 수, 월별 거래) |
| **stacked bar** | 카테고리 + 세부 분류 (월별 거래 × 카테고리) |
| **line** | 시간 흐름 (KPI 추이, 가계부 잔액 변화) |
| **area** | 시간 흐름 + 누계 (누적 결재 수) |
| **pie / donut** | 비율 (카테고리별 점유율) |
| **scatter** | 상관관계 (드물게 — HR 평가 상관) |

#### Anatomy
- container: `surface-default` 카드 또는 inline
- title (옵션): `heading-sm` 위
- legend: 우측 또는 하단 — chart-* color box + label, hover 시 해당 데이터 강조
- axes: x/y axis label `caption` `text-tertiary`, gridlines `border-default` 미세
- data: chart palette 10색 categorical 분배 (1-10 series)
- tooltip: hover 시 hover card 패턴 — 데이터 상세

#### Color allocation
- 첫 series: `chart-blue` (default — 친숙한 차트 색)
- 다음: red / green / orange / violet / yellow / pink / indigo / brown / gray 순환
- HR primary `#357B5F`(forest)와 chart-green hue 비슷 — HR brand color로 chart 차트 동시 표시 시 chart-green 회피
- 다크 모드: `chart-*-light` 자동 alias (v66)

#### Empty / loading
- empty: 가운데 illustration + "데이터가 없어요" + (필터 적용 시) "필터 초기화"
- loading: rect skeleton (v63) 또는 spinner

#### Accessibility
- 차트는 시각만으론 부족 → `<table>` (시각 hidden) 동반 권장 — 데이터 표 형식으로도 접근 가능
- `<svg role="img" aria-label="...">` 차트 wrapper
- legend interactive: `<button aria-pressed>` (시리즈 토글)
- 컬러 의존 회피: pattern (점/선/사선 fill) 옵션 제공

#### Library 가이드
- DESIGN spec은 **시각·토큰만** 정의 — 구현은 Recharts / Visx / D3 / Chart.js 자유.
- chart palette 토큰 활용해 라이브러리 색상 mapping (예: Recharts `<Cell fill="var(--color-chart-blue)">`).

### Date Range Picker (v72 추가)

기간(시작-종료) 선택 — Calendar(v61) range variant 활용. **새 토큰 0**.

#### Anatomy
- trigger: Input(v34) — "2026-05-01 ~ 2026-05-14" 또는 placeholder "기간 선택"
- panel: Dropdown panel — 좌측 Calendar + 우측 preset list
- 좌측 Calendar:
  - 1개월 또는 2개월(데스크탑) 표시
  - range-start / range-mid / range-end 셀 시각 (v61 Calendar variant)
  - hover 시 임시 range 미리 표시
- 우측 preset list (옵션):
  - "오늘" / "어제" / "지난 7일" / "지난 30일" / "이번 달" / "지난 달"
  - 클릭 시 좌측 Calendar에 즉시 반영

#### Mode
- **single picker** (1 calendar): 모바일 또는 좁은 viewport
- **dual picker** (2 calendar 좌-우): 데스크탑 — 다른 달 동시 보기 (예: 5월~6월 range)

#### Layout
- panel width: `min(640px, 100vw)` (dual), `min(360px, 100vw)` (single)
- preset list: 우측 120-160px, divider로 분리
- footer: "취소" + "적용" actions

#### Accessibility
- v61 Calendar 패턴 그대로 — `role="grid"` + `aria-current="date"` + `aria-selected`
- range 선택 안내: 첫 선택 후 `aria-live` "시작일 선택됨, 종료일을 선택하세요"
- 키보드: Calendar 동일 (arrow / Page / Home/End / Enter / Esc)
- preset 키보드: Tab으로 진입, arrow keys로 이동, Enter 적용

### Time Picker (v72 추가)

시:분 또는 시:분:초 입력. **새 토큰 0**.

#### Variant
| Variant | 형태 |
|---|---|
| **input only** (default) | `<input type="time">` 또는 커스텀 |
| **dropdown picker** | input + 펼침 panel (시 list + 분 list 좌우) |
| **wheel picker** | 모바일 native scroll wheel — iOS/Android |

#### Anatomy (dropdown picker)
- input: 24h "14:30" 또는 12h "2:30 PM"
- panel: 좌측 시 column (00-23) + 우측 분 column (00-59 5분 단위 또는 1분)
- 각 column scroll list — current 가운데 highlight

#### Step
- 1분, 5분(default), 10분, 15분, 30분 — context별
- 결재 일정 1분, 가계부 거래 시각 5분 등

#### State
- empty: placeholder "시각 입력"
- valid: "14:30" 정상 표시
- invalid: error 1px border + alert text "시각 형식이 잘못됐어요"
- disabled: opacity 0.5 + cursor not-allowed

#### Accessibility
- `<input type="time">` 사용 권장 — native a11y 자동, 모바일 wheel picker 자동
- 커스텀 picker: `role="listbox"` + items `role="option"` (시/분 각각)
- 키보드: arrow keys로 시/분 이동, Tab으로 시→분→AM/PM, Enter 확정

#### HR / Desk 듀얼 브랜드 (v72 5종 공통)
spec brand-neutral. brand 파일 — HR(Sonner top-right 결재 알림 stack / Chart bar/line dashboard / Date Range Picker dual desktop / Time Picker 결재 일정 5분 step), Desk(Sonner bottom-center 모바일 / Chart pie 가계부 카테고리 / Aspect Ratio 16:9 메모 attachment / Date Range Picker single 모바일).

### Banner (v73 추가)

페이지 상단 또는 영역 상단에 표시하는 알림. Toast(임시)와 다름 — Banner는 영구적 또는 사용자가 명시적 dismiss 전까지 유지. **새 토큰 0**.

#### Variant
| Variant | 시맨틱 | 사용 |
|---|---|---|
| **info** | `info` 색 stripe | 시스템 점검 안내, 새 기능 소개 |
| **success** | `success` 색 stripe | 마이그레이션 완료, 캠페인 성공 |
| **warning** | `warning` 색 stripe | 약관 변경 예정, 곧 만료 (구독, 휴가) |
| **error** | `error` 색 stripe | 시스템 장애, 결제 실패 |

#### Anatomy
- 가로 stripe — 페이지 너비 100%
- 좌측: kind icon (16-20px circle, semantic 색)
- 가운데: title(`body-strong`) + description(`body`/`caption`) + (옵션) link "자세히"
- 우측: action button (옵션) + ✕ dismiss button
- background: `surface-input` 또는 semantic 8-12% tint

#### Position
- **page-top**: 모든 페이지 상단 sticky (시스템 알림)
- **section-top**: 카드/section 상단 (해당 영역 한정 안내)
- **inline**: 콘텐츠 흐름 안 (form 위 안내 등)

#### State
- default: 정보 표시
- dismissible: ✕ 클릭 또는 사용자 dismiss → 5초 fade-out
- persistent: dismiss 불가 (시스템 점검 등 강제 안내)

#### Motion
- 등장: slide-down (10px) + fade `motion-duration-base` (200ms) `motion-ease-out`
- 사라짐: 역순 (`motion-duration-fast`)
- `prefers-reduced-motion`: instant

#### Accessibility
- `role="alert"` (severe error/warning) 또는 `role="status"` (info/success)
- `aria-live="polite"` (info/success), `aria-live="assertive"` (error)
- dismiss button: `aria-label="알림 닫기"`
- localStorage로 dismiss 기억 (재방문 시 같은 banner 재등장 회피)

#### Differences vs Toast
- **Toast**: 임시 (5-10초 자동 dismiss), event-driven
- **Banner**: 영구 또는 명시적 dismiss, 시스템/페이지 레벨 안내
- **Alert Dialog**: blocking modal, 사용자 응답 필수

### Tag / Chip (v73 추가)

closeable label — multi-select 결과, 필터 active 표시, 메모 태그 등. Badge(v37)와 다름 — Tag는 user-actionable(close 가능), Badge는 status/count 시각만. **새 토큰 0**.

#### Variant
| Variant | 형태 |
|---|---|
| **filled** | `surface-input` 배경 + `text-primary` (default) |
| **outlined** | transparent + 1px `border-default` |
| **brand** | `primary` 8% tint + `text-primary` 또는 `primary` 채움 + `text-on-accent` (강조) |
| **semantic** | success/error/warning/info tint + 해당 색 텍스트 |

#### Anatomy
- container: pill shape (`radius-full`), padding `xs` 4px V / `sm` 8px H
- label: `caption` (12/400) 또는 `body-sm` (14/400) (밀도 ↑)
- (옵션) 좌측 icon — 16×16, `text-tertiary`
- (옵션) 우측 ✕ close button — 14×14, hover `surface-default`

#### Use cases
- multi-select Combobox 선택 결과 (`#brand` `#design` ✕)
- 필터 active chips (Search bar 위에 "카테고리: 식비 ✕")
- 메모 태그 input (`<input>` + 입력 즉시 chip 변환)
- 사용자 role badge ("관리자" / "팀장" — closeable로 권한 회수)

#### State
- default: 정상
- hover: `surface-default` 배경 강조
- active (선택 중): brand variant 강조
- closing: ✕ 클릭 시 fade-out + slide-left

#### Accessibility
- 단순 표시 Tag: `<span>` (시맨틱 없음)
- closeable Tag: `role="button"` 또는 `<button>` wrapper + `aria-label="태그 'brand' 제거"`
- multi-select group: `role="list"` + 각 Tag `role="listitem"`
- 키보드: Tab으로 Tag focus → Backspace/Delete로 제거

### Popover (v73 추가)

trigger 클릭 시 등장하는 작은 카드 — Tooltip(v44)보다 풍부, Dropdown(v45)보다 자유 콘텐츠. **새 토큰 0** — Tooltip + Card 합성, Dropdown spec과 분리.

#### Differences
- **Tooltip (v44)**: hover 즉시 등장, 1줄 hint, decoration
- **Popover**: 클릭 trigger, interactive 콘텐츠 (form/list/액션 가능)
- **Dropdown (v45)**: 정형 menu/select pattern (items list)
- **Hover Card (v70)**: hover 등장, 정보 preview (read-only)

#### Anatomy
- trigger: button 또는 link
- panel: `surface-default` + `radius-md` + `shadow-md` + 1px `border-default`
- arrow (옵션): trigger 방향 가리키는 8px triangle
- 콘텐츠: 자유 — form / list / 메타정보 / 작은 액션

#### Layout
- panel max-width: 320-400px
- panel offset from trigger: `xs` (4px)
- 자동 flip: viewport 초과 시 위/아래/좌/우 자동 reposition
- close on outside click + Esc

#### Motion
- 등장: scale(0.96→1) + fade-in `motion-duration-fast` (150ms) `motion-ease-out`
- 사라짐: 역순

#### State
- closed (default): trigger 단독
- open: panel 표시 + trigger `border-focus` outline (현재 활성 표시)

#### Accessibility
- trigger: `aria-expanded="true|false"` + `aria-haspopup="dialog"` (interactive content)
- panel: `role="dialog"` + `aria-label="..."` (interactive면) 또는 단순 popover (`aria-labelledby="trigger-id"`)
- focus 관리:
  - 등장 시: panel 안 첫 focusable 요소로 focus 이동
  - 닫힐 때: trigger로 return focus
  - focus trap 옵션 (form 같은 interactive content)
- 키보드: Esc 닫기, 외부 클릭 닫기, Tab으로 panel 안 이동

### File Upload (v73 추가)

drag-drop area + click 업로드 button. **새 토큰 0** — surface + border + button 합성.

#### Anatomy
- drop zone (정사각/직사각): `border-default` 2px dashed + `surface-input` 배경 + `radius-md`
- 가운데: 아이콘 (📁 또는 ⬆) + 안내 텍스트("파일을 끌어다 놓거나 클릭하세요") + 옵션 ("최대 10MB / .jpg .png .pdf")
- 좌측 또는 하단: 업로드된 file list — 파일명 + 사이즈 + ✕ 제거 + progress bar (업로드 중)

#### State
- default: 정적 안내
- dragover: `border-focus` 2px solid (dashed → solid 변화) + `primary` 8% tint 배경
- drop: 등록된 file 목록에 추가, progress bar 시작
- uploading: progress bar (linear, indeterminate 또는 determinate)
- success: ✓ icon + "업로드 완료" caption (`success` 색)
- error: ✕ icon + 에러 메시지 ("크기 초과" / "지원 안 되는 형식") (`error` 색)
- disabled: opacity 0.5

#### File constraints
- accept 속성: MIME type 제한 (`image/*`, `.pdf` 등)
- max size: spec 제한 + 초과 시 즉시 reject + alert
- multiple: 단일 또는 다중 파일 (`multiple` 속성)

#### Motion
- dragover 강조: border 색 + bg tint `motion-duration-fast` (150ms)
- drop animation: file item 등장 fade-in `motion-duration-base`
- progress: determinate 채움 `motion-duration-fast`

#### Accessibility
- `<input type="file" hidden>` + label as drop zone (native a11y)
- aria-label: "파일 업로드 영역 — 끌어다 놓거나 Enter로 선택"
- 키보드: Tab focus → Enter/Space로 file dialog 열기
- screen reader 알림: drop 즉시 "파일 N개 추가됨", 업로드 완료/실패 시 alert

### Treeview (v73 추가)

계층 list — folder/category/조직도 depth 표현. **새 토큰 0** — list + Collapsible 합성.

#### Anatomy
- 각 노드: indent (depth × 16-20px) + caret(▾/▸) + icon (옵션 폴더/파일) + label
- caret 클릭: 자식 노드 expand/collapse
- selected node: `surface-input` 배경 + `border-focus` 좌측 stroke
- guide line (옵션): 부모-자식 시각 연결 — 1px `border-default` vertical line

#### State
- collapsed: caret `▸`, 자식 hidden
- expanded: caret `▾`, 자식 표시
- hover: `surface-input` 약한 배경
- selected: `surface-input` 배경 + 좌측 `primary` 2px stroke
- focus: `border-focus` 2px outline

#### Variant
- **single-select**: 한 번에 하나 (file picker)
- **multi-select**: checkbox 동반 (다중 선택)
- **drag-drop reorder**: 노드 이동 (HR 조직도 변경)

#### Layout
- root level: indent 0
- depth × 16-20px (compact) 또는 24-28px (loose)
- icon 16-20×16-20, label `body` (15/400)

#### Use cases
- HR 조직도 (회사 → 본부 → 팀 → 직원)
- Desk 카테고리 tree (가계부 카테고리 — 식비 → 카페/외식, 교통 → 대중교통/택시)
- file/folder picker
- 권한 tree (관리자 → 결재 → 평가 → 보고서)

#### Accessibility
- `role="tree"` (root) + 각 노드 `role="treeitem"`
- 자식 그룹: `role="group"` 또는 nested `role="tree"`
- `aria-expanded="true|false"` (자식 있는 노드)
- `aria-selected="true|false"` (selected variant)
- `aria-level="N"` + `aria-setsize="X"` + `aria-posinset="P"` (계층 위치)
- 키보드:
  - 위/아래 arrow: 노드 이동
  - 좌 arrow: collapse 또는 부모로
  - 우 arrow: expand 또는 첫 자식으로
  - Home/End: 첫/마지막 노드
  - Enter/Space: 선택 또는 활성

#### HR / Desk 듀얼 브랜드 (v73 5종 공통)
spec brand-neutral. brand 파일 — HR(Banner 약관 변경 / Tag 결재라인 chip / Popover 결재 의견 입력 / File Upload 평가 첨부 / Treeview 조직도), Desk(Banner 시스템 점검 / Tag 메모 태그 input / Popover 카테고리 quick edit / File Upload 영수증 다중 업로드 / Treeview 가계부 카테고리 tree).
