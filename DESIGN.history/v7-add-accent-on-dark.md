---
version: alpha
name: Porest
description: |
  People + Forest. Dual-brand design system for Porest HR (B2B) 
  and Porest Desk (B2C). Optimized for Korean-first audiences,
  all-ages accessibility.

colors:
  # === Brand (sub-brand accents) ===
  accent-hr: "#1E7D4C"
  accent-desk: "#1B6ADB"
  
  # === Neutral - Page background (공통) ===
  bg-page: "#F5F6FA"
  bg-page-dark: "#1A1F2E"
  
  # === Neutral - Surface (카드/시트/입력 표면, 공통) ===
  surface-default: "#FFFFFF"
  surface-default-dark: "#242938"
  surface-input: "#F0F2F7"
  surface-input-dark: "#2D3346"
  
  # === Neutral - Text (본문/보조/accent 위, 공통) ===
  text-primary: "#1A1F2E"
  text-primary-dark: "#F5F6FA"
  text-secondary: "#4E5968"
  text-secondary-dark: "#B0B8C4"
  text-on-accent: "#FFFFFF"
  
  # === Neutral - Border (장식 외곽선/필수 UI 외곽선, 공통) ===
  border-default: "#E5E8EF"
  border-default-dark: "#353B4D"
  border-strong: "#7D8593"
  border-strong-dark: "#8B95A8"
  
  # TODO: border-focus (accent-on-dark 도입 후), text-tertiary, text-disabled

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
  # TODO: heading-sm (16px), heading-xl (32px+) — 사용 사례 등장 시

rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  # TODO: 2xl(32px), 3xl(48px) — hero/major 레이아웃 등장 시 추가

components:
  # TODO
---

## Overview

Porest는 "사람과 일상이 숲처럼 자라나는" 가치를 담은 듀얼 브랜드 시스템입니다.
HR(조직 관리, B2B)과 Desk(개인 생산성, B2C)는 동일한 골격을 공유하되 accent 색상으로만 분기합니다.

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
  - `accent-hr` on `surface-default` **5.16:1** / on `surface-input` **4.61:1** — 본문도 통과
  - `accent-desk` on `surface-default` **5.02:1** / on `surface-input` **4.48:1** — UI 3:1 ✅, 본문은 4.5에 0.02 못 미침. accent는 본문 텍스트 색상으로 사용 금지(버튼 fill·아이콘·강조 텍스트 한정)로 운용.
- 표면 간 elevation 대비(`surface-default` vs `bg-page` ≈ 1.08:1)는 WCAG 3:1 비대상(본문/UI 컴포넌트 규정 아님). 의도된 미묘 elevation.

#### HR / Desk 듀얼 브랜드
- 두 accent 모두 라이트 모드 표면 위에서 본문 4.5:1 또는 그에 준하는 대비를 확보 — 단일 표면 페어로 양 브랜드 호환.
- 다크 모드 accent 변형(`accent-*-on-dark`)은 추후 별도 토큰으로 분리 예정 — 현재 surface 토큰은 다크 accent 도입 시 재계산 없이 그대로 유효.

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
| text-on-accent `#FFFFFF` | accent-hr | 5.16 | AA |
| text-on-accent | accent-desk | 5.02 | AA |

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
3. `border-focus`는 이번 배치에서 보류 — 브랜드 accent가 `surface-default-dark`에서 3:1 미달(accent-hr **2.77:1**, accent-desk **2.85:1**)이므로 `accent-*-on-dark` 변형이 정의된 후 추가하는 편이 안전. 그 전까지 포커스 링은 `border-strong`을 임시 활용 가능(모든 표면에서 3:1+).

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

## Spacing

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
- **WCAG 2.5.5 (Target Size, AAA 권장 44×44px)**: 버튼 패턴 점검 — `md(12px)` padding-y + 본문 텍스트(line-height 약 20px) = 12+20+12 = **44px** ✅. 더 작은 컴포넌트(예: `sm` padding-y = 8px → 8+20+8=36px)는 보조 액션에만 사용.
- **WCAG 1.4.12 (Text Spacing)**: 사용자가 letter/word spacing을 오버라이드해도 4px 베이스는 절대값이라 영향 없음.

#### HR / Desk 듀얼 브랜드
- spacing은 neutral 시스템 — 브랜드 분기 없음. HR(B2B 데이터 밀도 위주)·Desk(B2C 여백 위주) 모두 동일 스케일 사용, 화면별 적용 강도(예: HR은 `md` 위주, Desk는 `lg` 위주)로 분기.

## Rounded

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

(작성 예정)
