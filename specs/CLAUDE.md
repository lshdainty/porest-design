# Porest Design System — 컴포넌트 상세 스펙 워크플로

## WHY (왜 이 가이드가 필요한가)

이번 Button 작업(2026-05-10) 중 spec / 코드 / 예제 / preview 4 source 사이 모순으로 같은 변경을 5번 이상 반복한 사례에서 도출. 토큰은 `npm run sync`로 자동 동기되지만 컴포넌트 spec은 수동 동기 영역이 많아 손이 많이 가는 데다, 어느 source가 진실인지 매번 모호해 작업이 빙빙 돈다.

이 파일은 컴포넌트 spec(`specs/components/<name>.md`)을 추가/수정할 때 따라야 할 절대 규칙·작업 순서·금지 사항을 정의한다. 토큰 워크플로(`/CLAUDE.md`)와 동등한 위계로 운영.

## WHAT (산출물 4 source)

컴포넌트 하나당 4개 파일이 동기되어야 한다 — **하나만 고치면 깨짐**.

```
specs/components/<name>.md                    ← SoT (단일 source of truth)
recipes/shadcn/components/ui/<name>.tsx       ← 코드 (cva variants/sizes가 spec 표와 1:1)
recipes/shadcn/examples/<name>-examples.mjs   ← 예제 (BASE/VARIANT/SIZE 상수 + render 함수)
scripts/build-preview-html.mjs `.<name>` CSS  ← preview.html 시각 (spec 시각과 동일)
```

추가 동기 영역(영향이 있을 때만):
- DESIGN.md / DESIGN.hr.md / DESIGN.desk.md prose의 컴포넌트 토큰 mention
- DESIGN.md prose 내 v{N} 변경 이력 line (예: Touch targets section의 height 인용)

## HOW (작업 규칙)

### 1. 절대 규칙 (5가지)

| # | 규칙 | 이유 |
|---|---|---|
| 1 | **`specs/components/<name>.md`가 단일 SoT** | 모순 발생 시 spec이 진실. 코드/예제/preview는 spec을 따라가는 dependent. |
| 2 | **4 source 동시 동기** 필수 | 한 곳만 고치면 시각 모순 누적 → 사용자가 직접 발견할 때까지 노출. |
| 3 | **WCAG 기준 정확히 분리** — 2.5.5 = AAA(44×44), 2.5.8 = AA(24×24) | 한 줄에 묶으면 충족/미달 판단 혼동. |
| 4 | **변경 전 spec 백업** | 모순 발견 후 되돌리기 어려움. |
| 5 | **한 PR = 한 컴포넌트** | 여러 컴포넌트 동시 변경 시 동기 지옥. |

### 2. 작업 순서 (7단계)

```
1. 백업          cp specs/components/<name>.md \
                    specs/components/<name>.history/v{N}-{이유}.md
                 (history 디렉토리 없으면 mkdir 먼저)

2. 토픽 브랜치    git checkout -b components/<name>
                 (예: components/button, components/input)

3. SoT 정의       specs/components/<name>.md 먼저 작성/수정
                 - Anatomy / Variants / Sizes / States / Layout / Behavior
                 - Accessibility / Do-Don't / Migration notes
                 - 모든 표는 토큰 변수명 사용 (`--color-X`, `--spacing-Y`, `--radius-Z`)
                 - WCAG는 2.5.5 / 2.5.8 등 별도 행으로 분리

4. 코드 동기      .tsx cva variants/sizes      ← spec Sizes·Color tokens 표와 1:1
                 examples mjs BASE/VARIANT/SIZE ← spec 표와 1:1
                 preview-html.mjs .btn CSS    ← spec 시각과 1:1

5. 빌드           npm run build:site
                 (50/50 컴포넌트 페이지 + preview*.html 산출)

6. 시각 검증      브라우저에서 3 페이지 비교 — 동일 시각인지 직접 눈으로 확인
                 - exports/preview.html / preview.hr.html / preview.desk.html
                 - exports/site/components/<name>.html
                 - 모순 발견 시 spec(SoT)을 기준으로 코드 다시 동기

7. 게이트         npm run verify
                 (sync:check + lint:all + lint:dark + lint:prose)
```

### 3. 금지 사항 (4가지)

- **spec.md 없이 코드부터 변경 금지** — SoT가 먼저, 그 다음 dependent.
- **4 source 중 일부만 동기하고 빌드 금지** — 모순 누적.
- **WCAG 기준 한 줄에 묶기 금지** — 2.5.5와 2.5.8 분리 필수.
- **preview.html 라벨과 실제 시각 불일치 상태로 commit 금지** — 자기 모순.

### 4. spec 표 작성 규칙

#### Sizes 표 필수 컬럼
```
| Size | Height | Padding (Y · X) | Font (token) | Font (px) | Icon | Radius | Touch (AA · AAA) |
```
- `Padding (Y · X)`는 spacing 토큰명 + 픽셀 동시 표기 (예: `spacing-sm` (8))
- `Touch` 컬럼은 AA · AAA 둘 다 ✅/⚠ 표기

#### State matrix 필수 컬럼 (default variant 기준)
```
| State | Background | Brightness | Shadow | Transform | Ring | Cursor |
```
- `enabled` / `hovered` / `focused (visible)` / `pressed (active)` / `disabled` 5개 행 고정

#### 다른 variant의 state 차이 — 표 형식
```
| Variant | hover | pressed (active) |
```
- 산문(prose) 형식 금지 — 한눈에 비교 불가.

### 5. Git 컨벤션

- 토픽 브랜치: `components/<name>` (예: `components/button`, `components/input`)
- Conventional Commits:
  - `feat(spec): add <name> component spec` — 신규 spec
  - `fix(spec): correct <name> sizing/state matrix` — 수치/상태 정정
  - `docs(spec): clarify <name> WCAG criteria` — prose만 정정
- main 직접 commit 금지, `--no-ff` 머지

## 참고

- 토큰 워크플로: `/CLAUDE.md` (이 가이드와 동등 위계)
- Git 규칙: `/GIT_CONVENTION.md`
- spec 작성 첫 사례 (Button): `specs/components/button.md`
