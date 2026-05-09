#!/usr/bin/env node
// Tailwind v4 export 검증 (P1-F smoke test)
//
// exports/tokens*.css가 valid Tailwind v4 @theme CSS인지 가벼운 검증.
// 실제 Tailwind 컴파일 없이 namespace 출력 + 토큰 카운트 + CSS 구조 확인.
// devDependency 추가 0 — native Node ESM, regex 기반.
//
// 사용법:
//   npm run export:tailwind:all && node scripts/test-tailwind-export.mjs

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { exit } from "node:process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const TARGETS = [
  { file: "exports/tokens.css", source: "DESIGN.md", isShared: true },
  { file: "exports/tokens.hr.css", source: "DESIGN.hr.md", isShared: false },
  { file: "exports/tokens.desk.css", source: "DESIGN.desk.md", isShared: false },
];

const NAMESPACE_PATTERNS = [
  { name: "color", regex: /^\s+--color-[a-z0-9-]+:/gm, minCount: 40 },
  { name: "font-sans", regex: /^\s+--font-sans:/gm, minCount: 1 },
  { name: "text (font-size)", regex: /^\s+--text-[a-z0-9-]+:\s*\d+px;/gm, minCount: 7 },
  { name: "text--line-height modifier", regex: /^\s+--text-[a-z0-9-]+--line-height:/gm, minCount: 7 },
  { name: "text--font-weight modifier", regex: /^\s+--text-[a-z0-9-]+--font-weight:/gm, minCount: 7 },
  { name: "radius", regex: /^\s+--radius-[a-z0-9]+:/gm, minCount: 7 },
  { name: "spacing", regex: /^\s+--spacing-[a-z0-9]+:/gm, minCount: 7 },
  { name: "shadow", regex: /^\s+--shadow-[a-z-]+:/gm, minCount: 8 },
  { name: "motion-duration", regex: /^\s+--motion-duration-[a-z]+:/gm, minCount: 4 },
  { name: "motion-ease", regex: /^\s+--motion-ease-[a-z]+:/gm, minCount: 1 },
  { name: "overlay-dim", regex: /^\s+--overlay-dim-[a-z]+:/gm, minCount: 2 },
];

const BRAND_COLORS = ["primary", "primary-light", "border-focus", "border-focus-light"];

let totalErrors = 0;

for (const target of TARGETS) {
  const filePath = resolve(ROOT, target.file);
  console.log(`\n[${target.file}]`);

  if (!existsSync(filePath)) {
    console.error(`  ❌ 파일 없음 — npm run export:tailwind:all 먼저 실행`);
    totalErrors++;
    continue;
  }

  const css = readFileSync(filePath, "utf8");

  // 1. @theme block 존재 확인
  if (!/@theme\s*\{/.test(css)) {
    console.error(`  ❌ @theme { ... } 블록 없음`);
    totalErrors++;
    continue;
  }
  console.log(`  ✓ @theme block`);

  // 2. namespace별 minCount 검증
  let nsFail = 0;
  for (const ns of NAMESPACE_PATTERNS) {
    const matches = css.match(ns.regex) || [];
    if (matches.length < ns.minCount) {
      console.error(`  ❌ ${ns.name}: ${matches.length} (expected ≥ ${ns.minCount})`);
      nsFail++;
    } else {
      console.log(`  ✓ ${ns.name}: ${matches.length}`);
    }
  }
  totalErrors += nsFail;

  // 3. brand-specific 토큰 검증 (HR/Desk only)
  if (!target.isShared) {
    for (const bk of BRAND_COLORS) {
      const re = new RegExp(`--color-${bk}:`, "m");
      if (!re.test(css)) {
        console.error(`  ❌ brand 토큰 --color-${bk} 누락`);
        totalErrors++;
      }
    }
    if (BRAND_COLORS.every(bk => new RegExp(`--color-${bk}:`).test(css))) {
      console.log(`  ✓ brand 토큰 (primary, primary-light, border-focus, border-focus-light)`);
    }
  }

  // 4. CSS 구조 valid (괄호 균형)
  const openBraces = (css.match(/\{/g) || []).length;
  const closeBraces = (css.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    console.error(`  ❌ CSS 괄호 불균형: { ${openBraces} vs } ${closeBraces}`);
    totalErrors++;
  } else {
    console.log(`  ✓ CSS 괄호 균형 ({ ${openBraces} = } ${closeBraces})`);
  }

  // 5. 정의되지 않은 placeholder 검출 (예: undefined, null, NaN)
  const placeholders = css.match(/:\s*(undefined|null|NaN);/g);
  if (placeholders) {
    console.error(`  ❌ undefined/null/NaN 값 발견: ${placeholders.join(", ")}`);
    totalErrors++;
  }
}

console.log("");
if (totalErrors > 0) {
  console.error(`\n검증 실패: ${totalErrors}건. exports를 다시 빌드하거나 build-tailwind-v4.mjs를 점검하세요.`);
  exit(1);
}
console.log(`검증 통과 — Tailwind v4 @theme CSS 모든 namespace 정상 출력.`);
