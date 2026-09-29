# Porest Design System

> **워크스페이스 공통 규칙**(Git 작업 격리 · 스테이징 범위 · 태그·릴리스)은
> 상위 `/home/lshdainty/study/CLAUDE.md` 에 있다. Claude Code 가 디렉토리 워크업으로
> 자동 로드하므로 여기에 복사하지 않는다 — 복사본은 원문이 바뀌어도 따라오지 않는다.

## WHY (목적)
사람과 일상이 숲처럼 자라나는 두 서비스의 단일 디자인 시스템:
- **Porest HR** (B2B, 조직 HR 관리, accent: `#1E7D4C`)
- **Porest Desk** (B2C, 개인 메모/할일/가계부, accent: `#1B6ADB`)

레퍼런스 톤: 토스 — 심플, 신뢰감, 전 연령 범용.

## WHAT (산출물)
- `DESIGN.md` — 공유 baseline (typography, spacing, rounded, neutral colors, neutral components)
- `DESIGN.hr.md` — HR 브랜드 단독 self-contained 시스템 (primary `#357B5F`, primary-light, border-focus, brand 컴포넌트)
- `DESIGN.desk.md` — Desk 브랜드 단독 self-contained 시스템 (primary `#0147AD`, primary-light, border-focus, brand 컴포넌트)
- 토큰: color, typography, spacing, radius, shadow, motion
- 컴포넌트 스펙: variant, state, accessibility 규칙

### 파일 분리 규칙 (v17부터)
- **공유**: typography, spacing, rounded, neutral colors(bg-page, surface-*, text-*, border-*, semantic) — DESIGN.md 정의 후 brand 파일에 **복제**(spec이 cross-file reference 미지원)
- **brand-specific**: primary, primary-light, border-focus, border-focus-light, brand 컴포넌트 — brand 파일에서만 정의. brand 파일 내에선 `-hr`/`-desk` 접미사 없이 단순한 이름 사용(`primary`, `button-primary` 등 — context 암묵)
- **lint 운영**: `npm run lint:all`로 3파일 일괄 검증. DESIGN.md는 missingPrimary warning 1건 영구 수용(brand-agnostic 의도 신호), HR/Desk 파일은 0 warnings 유지
- **공유 토큰 변경 시 3파일 동기**: `npm run sync`로 `typography`/`rounded`/`spacing` 블록 + `colors` SHARED 영역(v50 마커 도입) 자동 갱신(DESIGN.md → HR/Desk). 마커 영역: `# @sync:shared-start (colors-N)` ... `# @sync:shared-end (colors-N)` 사이. `colors-1` = Neutral(bg/surface/text/border), `colors-2` = Semantic + Chart palette. brand 영역(`@sync:brand-*`)은 sync 비대상으로 보존. components 영역은 향후 마커 도입 후 확장. `npm run verify`로 sync 검사 + lint:all 통합 실행(머지 전 게이트로 권장).

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
- 한 번에 5개 토큰 이상 추가 금지 — 점진적으로 확장 (예외: 2026-09-29 SEED 간격 · 모서리 · 글자 스케일 · 레이아웃 · 역할 색 도입 — 사용자가 대가를 알고 정했다, v98~v102)

### 금지 사항
- DESIGN.md 외부에 토큰을 정의하지 말 것 (CSS, JS 어디서도)
- 사용자가 명시적으로 요청하지 않은 토큰은 추가하지 말 것
- 색상에 감정적 이름 (예: "warm green") 금지 — 시맨틱 이름만

## 컴포넌트 상세 스펙 수정 규칙
- spec 작업 규칙(4 source 정합·작업 순서·금지 사항)은 `specs/CLAUDE.md` 참조 — `specs/components/*.md` 추가/수정 시 반드시 사전 확인.
- 요약: `specs/components/<name>.md`가 단일 SoT, **4 source**(spec / .tsx / examples.mjs / preview-html `.btn` CSS) 동시 동기 필수, WCAG 기준은 2.5.5(AAA) / 2.5.8(AA) 분리 표기, 토픽 브랜치 `components/<name>`.

## 문서 사이트 (`site/`)
- 목표는 seed-design.io(당근 SEED) 급 문서다 — 기초·컴포넌트의 세부 수치를 빠짐없이 적어 웹·앱이 같은 값을 따르게 한다. 페이지를 새로 쓸 땐 SEED 의 해당 문서를 먼저 읽고, porest 현재 값 · SEED 값 · 정할 값을 나란히 보여 준 뒤 사용자가 정한 값만 적는다.
- SEED 문서는 seed-docs MCP 로 읽는다. Foundations·컴포넌트 디자인 문서는 MCP 목록에 안 나오지만 `get_doc(section: "docs", path: "../foundations/<이름>")` · `"../components/<이름>"` 으로 열린다. 목록은 `https://seed-design.io/foundations/llms.txt` · `/components/llms.txt`.
- SEED 는 Apache-2.0 — 구조·수치는 참고하되, 문장·그림을 옮기면 출처를 밝히고, 로고·캐릭터 같은 당근 브랜드 리소스는 쓰지 않는다.
- 페이지 대부분은 `site/scripts/gen-content.mjs` 가 빌드 때 원본(`DESIGN*.md` · `specs/`)에서 만든다. 만든 `.md` 는 git 밖이다 — **고치려면 원본을 고친다.** 원본을 사이트용으로 새로 쓴 페이지는 같은 자리에 `.mdx` 로 두면 생성이 건너뛴다.
- `DESIGN.md` 의 `##` 절을 추가·개명하면 `gen-content.mjs` 의 `FOUNDATION_SECTIONS` 도 고친다 — 안 고치면 빌드가 멈춘다(CI `site` 잡).
- 컴포넌트 수치는 `specs/components/<이름>.yaml` 로 옮기는 중이다(Button 부터). YAML 이 있으면 수치의 원본은 YAML 이고, md 의 표 자리는 `[표: …](<이름>.yaml#구역)` 한 줄이다 — 규칙은 `specs/CLAUDE.md`.

## Git 작업 규칙
- 브랜치·커밋 메시지·머지 전 점검 규칙은 `GIT_CONVENTION.md` 참조 — git 레이어 작업 시 반드시 사전 확인.
- 요약: 토픽 브랜치(`tokens/<카테고리>`, `components/<이름>`) 경유, Conventional Commits(`feat(tokens):`, `fix(tokens):`, `docs(rationale):`, `feat(spec):`, `fix(spec):`).

## 참고
- Google 공식 스펙: https://github.com/google-labs-code/design.md
- 사양 문서: https://stitch.withgoogle.com/docs/design-md/overview/
- Git 규칙: `GIT_CONVENTION.md`
- 컴포넌트 spec 워크플로: `specs/CLAUDE.md`
