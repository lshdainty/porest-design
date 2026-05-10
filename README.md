# Porest Design System

People + Forest. **Porest HR**(B2B 조직 관리)·**Porest Desk**(B2C 개인 메모/할일/가계부) 듀얼 브랜드 단일 디자인 시스템. 한국어 우선·전 연령 접근성·Toss 톤(절제·신뢰감) 레퍼런스.

[Google design.md](https://github.com/google-labs-code/design.md) spec 기반, **Tailwind v4 `@theme` CSS** 산출물.

---

## Quick start

```bash
npm install               # devDeps 설치 + pre-commit hook 활성화
npm run verify            # sync 검사 + lint:all + lint:dark (머지 전 게이트)
npm run export:tailwind:all  # exports/tokens(.hr|.desk).css 빌드
npm run build:preview     # exports/preview*.html 시각 카탈로그
```

브라우저로 `exports/preview.html` 열어 토큰 미리보기.

---

## 파일 구조

```
.
├── DESIGN.md             # shared baseline (typography/spacing/rounded/neutral colors/neutral components)
├── DESIGN.hr.md          # HR 브랜드 self-contained (primary #357B5F + brand 컴포넌트 + 공유 복제)
├── DESIGN.desk.md        # Desk 브랜드 self-contained (primary #0147AD + brand 컴포넌트 + 공유 복제)
├── DESIGN.history/       # 변경 백업 (v{N}-{이유}.md milestone + v{YYYYMMDD-HHMMSS}.md 자동 스냅샷)
├── exports/              # 빌드 산출물 (.gitignore — npm run export:* 매 빌드)
│   ├── tokens.css        # Tailwind v4 @theme (DESIGN.md)
│   ├── tokens.hr.css     # Tailwind v4 @theme (HR)
│   ├── tokens.desk.css   # Tailwind v4 @theme (Desk)
│   ├── tokens.dtcg.json  # W3C DTCG (shadow/motion 누락 — prose 직접 참조)
│   └── preview*.html     # 토큰 시각 카탈로그
├── scripts/              # native Node 도구 (외부 의존성 없음)
│   ├── sync-shared-tokens.mjs   # 공유 토큰 자동 동기 (typography/rounded/spacing + colors 마커 영역)
│   ├── build-tailwind-v4.mjs    # @theme CSS 빌드 (prose shadow/motion/overlay/breakpoint/touch-target/z-index 자동 추출)
│   ├── test-tailwind-export.mjs # Tailwind export smoke test
│   ├── build-preview-html.mjs   # HTML 카탈로그 빌드
│   ├── lint-prose.mjs           # prose 토큰 reference 정합성 검사
│   ├── lint-dark-contrast.mjs   # dark pair contrast 자동 검증 (4.5:1 / 3:1, spec lint 보완)
│   └── diff-tailwind.mjs        # Tailwind v4 CSS unified diff (이전 백업 대비)
├── .husky/pre-commit     # commit 전 npm run verify 자동 실행
├── .github/workflows/verify.yml  # CI: sync:check + lint:all + lint:dark + test:exports
├── CLAUDE.md             # 작업 규칙 (내부 — 토큰 추가 절대 규칙, sync 정책)
├── GIT_CONVENTION.md     # 브랜치/커밋 규칙
├── CHANGELOG.md          # v1~v63 milestone 누적 변경
└── README.md             # (이 파일)
```

---

## 토큰 카테고리

| 카테고리 | 정의 위치 | 자동 sync | 비고 |
|---|---|---|---|
| `colors` (neutral) | DESIGN.md (source) → HR/Desk 복제 | ✓ (마커 영역) | bg-page, surface-*, text-*, border-*, semantic, chart palette |
| `colors` (brand) | DESIGN.hr.md / DESIGN.desk.md | — (보존) | primary, primary-light, border-focus, border-focus-light |
| `typography` | DESIGN.md → 복제 | ✓ (블록) | 21종: caption / body / body-strong / heading-{sm,md,lg,xl} (한국어 베이스) + rating-display / display-{xl,lg,md} / title-{md,sm} / body-{md,sm} / caption-{md,sm} / badge / uppercase-tag / button-md / nav-link (Airbnb reference batch v55-v57) |
| `rounded` | DESIGN.md → 복제 | ✓ (블록) | 7종: xs, sm, md, lg, xl, 2xl, full |
| `spacing` | DESIGN.md → 복제 | ✓ (블록) | 7종: xs, sm, md, lg, xl, 2xl, 3xl (4px 베이스) |
| `shadow` (prose-token) | 모든 파일 prose 표 | 수동 동기 | 8종: sm/md/lg/xl × {light, dark} (Material 3 / Big Sur 패턴) |
| `motion` (prose-token) | 모든 파일 prose 표 | 수동 동기 | 7종: duration {fast/base/slow/slower/loop} + ease-{out, linear} (v32 단발 전환 + v63 반복 애니메이션) |
| `overlay-dim` (prose-token) | 모든 파일 prose 표 | 수동 동기 | 2종: light/dark dim (alpha 채널 rgba) |
| `breakpoint` (prose-token) | 모든 파일 prose 표 | 수동 동기 | 5종: sm/md/lg/xl/2xl (640/736/834/1069/1441 — Apple Store reference, v54) |
| `touch-target` (prose-token) | 모든 파일 prose 표 | 수동 동기 | 5종: min/pill-w/circular/nav-h/nav-w (44/100/44/32/80 — WCAG 2.5.5 AAA, v59) |

Lint 자동 검증: WCAG 1.4.3 (본문 4.5:1) + 1.4.11 (UI 3:1) — `npm run lint:all`.
prose-token은 lint 비대상 (spec이 shadow/motion/overlay/breakpoint/touch-target 토큰 타입 미지원) — `scripts/build-tailwind-v4.mjs`가 표에서 추출해 v4 CSS로 export.

---

## npm scripts

### Lint & verify
| Script | 동작 |
|---|---|
| `npm run lint` | DESIGN.md design.md spec lint (1 intentional warning: missingPrimary) |
| `npm run lint:hr` / `lint:desk` | HR / Desk 파일 lint (0 warnings) |
| `npm run lint:all` | 3 파일 일괄 |
| `npm run lint:prose` | prose 토큰 reference 정합성 검사 (P2-F) |
| `npm run sync:check` | dry-run sync 검사 (drift 시 exit 1) |
| `npm run verify` | sync:check + lint:all + lint:dark (pre-commit hook이 자동 실행) |

### Sync & build
| Script | 동작 |
|---|---|
| `npm run sync` | DESIGN.md SHARED 영역(typography/rounded/spacing 블록 + colors 마커 영역) → HR/Desk 자동 동기 |
| `npm run export:tailwind` | DESIGN.md → exports/tokens.css (Tailwind v4 @theme) |
| `npm run export:tailwind:hr` / `export:tailwind:desk` | HR / Desk 변형 |
| `npm run export:tailwind:all` | 3 파일 일괄 |
| `npm run export:dtcg` | DESIGN.md → exports/tokens.dtcg.json (W3C DTCG, shadow 누락) |
| `npm run test:exports` | export 빌드 + namespace/구조 smoke test |
| `npm run build:preview` | exports/preview*.html 시각 카탈로그 |

### Diff & history
| Script | 동작 |
|---|---|
| `npm run diff` | design.md 기본 diff (frontmatter YAML) |
| `npm run diff:tailwind` | 가장 최근 milestone 백업 vs 현재 — Tailwind v4 CSS unified diff |
| `npm run snapshot` | 현재 DESIGN.md를 `DESIGN.history/v{YYYYMMDD-HHMMSS}.md`로 백업 |

---

## 토큰 변경 워크플로 (기여 가이드)

1. **사전 백업**: `cp DESIGN.md DESIGN.history/v{N}-{이유}.md` (milestone 식별자 v{N})
2. **토픽 브랜치**: `git checkout -b tokens/<카테고리>` (또는 `components/<이름>` / `tooling/<용도>` / `docs/<용도>`)
3. **변경 적용** (한 번에 ≤5 토큰):
   - DESIGN.md (source)에 토큰 추가/수정
   - 변경 사유 prose 작성 (대비비 실측, brand 분기 정책 등)
   - components 섹션에 sparse 매핑 추가 (lint contrastCheck 활성화)
4. **자동 동기**: `npm run sync` (typography/rounded/spacing 블록 + colors 마커 영역)
5. **검증**: `npm run verify` (sync:check + lint:all + lint:dark). 통과해야 commit 가능 (pre-commit hook이 자동 실행).
6. **Conventional commit**: `feat(tokens): add ...` / `fix(tokens): ...` / `docs(rationale): ...`
7. **머지**: `git merge --no-ff tokens/<...>`로 main에. main 직접 commit 금지.
8. **사후 스냅샷**: `npm run snapshot` (자동 timestamp 백업)

상세 규칙은 [`CLAUDE.md`](./CLAUDE.md) (내부 작업 규칙) + [`GIT_CONVENTION.md`](./GIT_CONVENTION.md) 참조.

---

## CI

`.github/workflows/verify.yml` — push to main / PR 시 자동 실행:
- `npm ci` → `npm run verify` (sync:check + lint:all + lint:dark)
- `npm run lint:prose` (prose token reference 검사)
- `npm run test:exports` (Tailwind v4 build + namespace 검증)
- `npm run export:dtcg` smoke test

로컬 pre-commit hook이 같은 게이트 — push 전 통과 보장.

---

## 사용 예시 (Tailwind v4 import)

```css
/* app.css */
@import "tailwindcss";
@import "./node_modules/@porest/design/exports/tokens.hr.css";  /* HR 브랜드 */
```

또는 직접 CSS variable 사용:

```css
.button-primary {
  background: var(--color-primary);
  color: var(--color-text-on-accent);
  font: var(--text-body-strong--font-weight) var(--text-body-strong) / var(--text-body-strong--line-height) var(--font-sans);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--motion-duration-fast) var(--motion-ease-out);
}
.button-primary:hover { box-shadow: var(--shadow-md); }
.button-primary:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 1px;
}
@media (prefers-color-scheme: dark) {
  .modal-overlay { background: var(--overlay-dim-dark); }
}
```

---

## 참고

- 작업 규칙 (내부): [`CLAUDE.md`](./CLAUDE.md)
- 브랜치/커밋 규칙: [`GIT_CONVENTION.md`](./GIT_CONVENTION.md)
- 변경 이력: [`CHANGELOG.md`](./CHANGELOG.md)
- design.md spec: https://github.com/google-labs-code/design.md
- Tailwind v4 docs: https://tailwindcss.com/docs/theme

---

**License**: 미정 (alpha 단계, public release 전).
