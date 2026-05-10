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
  success-light: "#5DC07B"
  error: "#DC2626"
  error-light: "#F08080"
  warning: "#C84D0E"
  warning-light: "#E8A05A"
  info: "#1D6FCB"
  info-light: "#6FAEDF"
  
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
  # (v26: heading-sm/xl 추가 완료. display(40px+)는 hero/marketing 사용 사례 등장 시 추가)

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

**v10 시점 hex** (현재는 v51 톤으로 갱신 — 아래 `Semantic refresh` 섹션 참조):

| 토큰 | hex | 시맨틱 |
|---|---|---|
| `success` | `#117A3A` | 완료·확인·긍정 결과 (forest green — HR primary와 hue 분리) |
| `error` | `#C53030` | 오류·파괴적 액션·필수 입력 누락 |
| `warning` | `#A85800` | 경고·주의·임박 만료 (deep amber) |
| `info` | `#006395` | 안내·도움말·진행 중 (deep navy — Desk primary와 채도·명도 분리) |

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

#### light 변형 보존 이유
`success-light`/`error-light`/`warning-light`/`info-light`는 v20에서 `surface-default-dark`/`surface-input-dark` 위 alert text 4.5~6.5:1 통과로 검증 — 변경 시 다크 alert 회귀 위험. base 톤 변화 따라 다크 시각 일관성은 별도 평가 후 추후 갱신.

### Chart palette (v21 추가, 4 배치 진행 중)

데이터 시각화용 hue-균등 10색 팔레트. 양 brand 공유(unified, primary는 brand-specific 유지). L≈0.16-0.18로 통일해 어떤 색이 데이터 차원을 강조하지 않게 시각 균형 확보.

**v21 (1/4)**: light 표면 위 5색 — `chart-red`, `chart-orange`, `chart-yellow`, `chart-green`, `chart-blue`.
**v22 예정 (2/4)**: light 표면 위 나머지 5색 — indigo, violet, pink, brown, gray.
**v23-v24 예정 (3-4/4)**: dark 표면 위 10색 변형 (`chart-*-light`, L≈0.45-0.55).

#### 손계산 휘도 (lint sparse 검증, contrast 룰 미발동)

| 토큰 | hex | L | bg-page 위 contrast |
|---|---|---|---|
| `chart-red` | `#C73838` | 0.153 | 4.85 |
| `chart-orange` | `#B36418` | 0.187 | 4.10 |
| `chart-yellow` | `#8C7400` | 0.180 | 4.22 |
| `chart-green` | `#2D8060` | 0.169 | 4.45 |
| `chart-blue` | `#2C70BF` | 0.159 | 4.66 |

`chart-orange`(4.10), `chart-yellow`(4.22)는 본문 4.5:1 미달이나 chart fill 용도라 **UI 1.4.11 (3:1)** 기준 통과 — chart bar/line/marker로 사용 시 적정. 차트 위 inline 텍스트로는 사용 부적합 (텍스트는 `text-primary`/`text-secondary` 사용).

#### sparse component 패턴
각 chart 토큰은 `chart-color-{name}` (backgroundColor만)에서 referencing. v9 divider, v13 disabled-label, v16 focus-ring과 동일 — orphan 회피 + spec 한계(chart는 component property 아님) 우회.

#### 듀얼 브랜드 — unified (배치 1과 다름)
- chart는 functional data palette — brand 분기 비대상. HR/Desk 동일 5/10색 사용 (차후 5색 + dark 변형도 동일).
- primary는 brand별 유지(`DESIGN.hr.md` `#357B5F`, `DESIGN.desk.md` `#0147AD`). chart-green과 primary-hr는 비슷한 hue지만 별도 토큰 — 역할 분리.

#### v20 추가 — semantic 다크 변형 4개

다크 표면 위 alert·toast·인라인 semantic 텍스트용 lightness 변형. base는 라이트 표면 전용(흰 텍스트 fill 4.5:1↑), light는 다크 표면 위 텍스트 4.5:1↑.

| 토큰 | hex | L | 다크 표면 contrast (lint 실측) |
|---|---|---|---|
| `success-light` | `#5DC07B` | 0.416 | surface-default-dark **6.35** / surface-input-dark **5.46** ✅ |
| `error-light` | `#F08080` | 0.355 | surface-default-dark **5.52** / surface-input-dark **4.75** ✅ |
| `warning-light` | `#E8A05A` | 0.430 | surface-default-dark **6.54** / surface-input-dark **5.63** ✅ |
| `info-light` | `#6FAEDF` | 0.394 | surface-default-dark **6.05** / surface-input-dark **5.20** ✅ |

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
