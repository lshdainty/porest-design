# Porest Design System

## WHY (목적)
사람과 일상이 숲처럼 자라나는 두 서비스의 단일 디자인 시스템:
- **Porest HR** (B2B, 조직 HR 관리, accent: `#1E7D4C`)
- **Porest Desk** (B2C, 개인 메모/할일/가계부, accent: `#1B6ADB`)

레퍼런스 톤: 토스 — 심플, 신뢰감, 전 연령 범용.

## WHAT (산출물)
- `DESIGN.md` — Google Stitch 공식 포맷의 단일 진실 (Source of Truth)
- 토큰: color, typography, spacing, radius, shadow, motion
- 컴포넌트 스펙: variant, state, accessibility 규칙

## HOW (작업 규칙)

### 토큰 추가/수정 시 절대 규칙
1. 색상은 WCAG AA 대비비 충족 (본문 4.5:1, UI 3:1) — `npx @google/design.md lint`로 검증
2. HR / Desk 듀얼 브랜드를 깨지 않도록 — neutral / semantic 토큰은 공통, accent만 분기
3. 한국어 본문 가독성 우선 — Pretendard 기본, 영문 fallback은 Inter
4. 토큰 이름은 의미 기반 (`accent-primary`), 색상값 기반 금지 (`green-500` ❌)

### 작업 흐름
- 변경 전: 현재 `DESIGN.md`를 `DESIGN.history/v{N}-{이유}.md`로 복사
- 변경 후: `npm run lint` 실행, 통과해야 commit
- 색상값 수정 시: `npm run diff`로 변경사항 명시
- 한 번에 5개 토큰 이상 추가 금지 — 점진적으로 확장

### 금지 사항
- DESIGN.md 외부에 토큰을 정의하지 말 것 (CSS, JS 어디서도)
- 사용자가 명시적으로 요청하지 않은 토큰은 추가하지 말 것
- 색상에 감정적 이름 (예: "warm green") 금지 — 시맨틱 이름만

## Git 작업 규칙
- 브랜치·커밋 메시지·머지 전 점검 규칙은 `GIT_CONVENTION.md` 참조 — git 레이어 작업 시 반드시 사전 확인.
- 요약: `main` 직접 commit 금지, 토픽 브랜치(`tokens/<카테고리>`, `components/<이름>`) 경유, Conventional Commits(`feat(tokens):`, `fix(tokens):`, `docs(rationale):`).

## 참고
- Google 공식 스펙: https://github.com/google-labs-code/design.md
- 사양 문서: https://stitch.withgoogle.com/docs/design-md/overview/
- Git 규칙: `GIT_CONVENTION.md`
