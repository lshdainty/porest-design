#!/usr/bin/env node
// Prose 토큰 reference 정합성 검사 (P2-F)
//
// DESIGN*.md의 prose에서 백틱(``)으로 감싼 토큰 이름을 추출해,
// 같은 파일의 frontmatter YAML(colors/components) 또는 prose-token 표
// (shadow/motion/overlay)에 정의된 토큰과 비교. 정의되지 않은 reference는
// typo 또는 outdated를 의심.
//
// 사용법:
//   node scripts/lint-prose.mjs              # 모든 파일 검사
//   node scripts/lint-prose.mjs --strict     # 발견 시 exit 1 (CI 친화)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { argv, exit } from "node:process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TARGETS = ["DESIGN.md", "DESIGN.hr.md", "DESIGN.desk.md"];

const TOKEN_PREFIXES = [
  "bg-", "surface-", "text-", "border-", "primary", "success", "error",
  "warning", "info", "chart-", "badge-", "button-", "card-", "input-",
  "placeholder-", "alert-text-", "caption-", "caption-tertiary-",
  "page-text-", "focus-ring-", "divider-", "outline-", "outline-strong-",
  "disabled-label-", "shadow-", "motion-duration-", "motion-ease-",
  "overlay-dim-", "radius-", "spacing-",
];

// 토큰처럼 보이지만 실제로는 CSS 속성/HTML/일반 단어인 단어들 — 보고에서 제외
const NOISE = new Set([
  "border-radius", "border-bottom", "border-top", "border-left", "border-right",
  "background-color", "text-decoration", "text-align", "font-size", "font-weight",
  "line-height", "letter-spacing", "box-shadow", "outline-offset",
  "primary", "secondary", "tertiary", // generic words (positional)
  "border", "input", "text", "outline", // CSS properties / HTML elements (단독)
  "outline-strong", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", // 토큰 prefix 그룹 명 (실제 토큰은 -light/-dark suffix)
  "alert-text", "badge", // 컴포넌트 그룹 명 (실제 토큰은 -success 등 suffix)
  "focus-ring-enhanced", "divider-dashed", "caption-strong", // 미정 / 향후 후보 prose mention
  // DESIGN.md(brand-neutral)에서 brand 위임 안내용으로 reference하는 brand 토큰 — 의도된 패턴
  "border-focus", "border-focus-light", "primary-light",
  "button-primary", "button-outlined-on-dark",
  "focus-ring-on-light", "focus-ring-on-dark",
  "border-vs-surface", // 비교 표현 ("border vs surface")
]);

function looksLikeToken(s) {
  if (NOISE.has(s)) return false;
  if (!/^[a-z][a-z0-9-]*$/.test(s)) return false;
  return TOKEN_PREFIXES.some(p => s === p.replace(/-$/, "") || s.startsWith(p));
}

function findBlockLines(lines, key) {
  const startRe = new RegExp(`^${key}:\\s*$`);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (startRe.test(lines[i])) { start = i; break; }
  }
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^---\s*$/.test(line)) { end = i; break; }
    if (/^[a-zA-Z][a-zA-Z0-9_-]*:\s*$/.test(line)) { end = i; break; }
  }
  return { start, end };
}

function extractDefinedTokens(content) {
  const lines = content.split("\n");
  const defined = new Set();

  // colors block
  const colors = findBlockLines(lines, "colors");
  if (colors) {
    for (let i = colors.start + 1; i < colors.end; i++) {
      const m = /^\s+([a-z][a-z0-9-]+):\s*"#/.exec(lines[i]);
      if (m) defined.add(m[1]);
    }
  }

  // components block (top-level keys only)
  const components = findBlockLines(lines, "components");
  if (components) {
    for (let i = components.start + 1; i < components.end; i++) {
      const m = /^\s\s([a-z][a-z0-9-]+):\s*$/.exec(lines[i]);
      if (m) defined.add(m[1]);
    }
  }

  // prose tokens (shadow / motion / overlay tables)
  const proseRe = /^\|\s*`((?:shadow|motion-(?:duration|ease)|overlay)-[a-z0-9-]+)`\s*\|/gm;
  let m;
  while ((m = proseRe.exec(content)) !== null) defined.add(m[1]);

  // typography / rounded / spacing keys + v4 prefix 매핑
  // (prose에서 `radius-md` 같은 v4 prefix로 reference하는 것까지 정의된 토큰으로 인정)
  const prefixMap = { typography: "text-", rounded: "radius-", spacing: "spacing-" };
  for (const key of ["typography", "rounded", "spacing"]) {
    const block = findBlockLines(lines, key);
    if (!block) continue;
    for (let i = block.start + 1; i < block.end; i++) {
      const m = /^\s\s([a-z0-9][a-z0-9-]*):/.exec(lines[i]);
      if (m) {
        defined.add(m[1]);
        defined.add(prefixMap[key] + m[1]);
      }
    }
  }
  defined.add("font-sans");

  return defined;
}

function findFrontmatterEnd(content) {
  const lines = content.split("\n");
  if (lines[0] !== "---") return 0;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") return i;
  }
  return lines.length;
}

function extractProseReferences(content) {
  const fmEnd = findFrontmatterEnd(content);
  const prose = content.split("\n").slice(fmEnd + 1).join("\n");
  // 백틱 안의 ` ... ` 콘텐츠 (코드 블록 ``` ... ``` 외부만)
  const codeBlockRe = /```[\s\S]*?```/g;
  const proseNoCode = prose.replace(codeBlockRe, "");
  const inlineRe = /`([^`\n]+)`/g;
  const out = new Map(); // token → 첫 등장 line approx
  const lines = proseNoCode.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let m;
    inlineRe.lastIndex = 0;
    while ((m = inlineRe.exec(lines[i])) !== null) {
      const inner = m[1].trim();
      // multi-word, css value 등은 skip — 단순 단일 토큰명만
      if (/[\s,(){}]/.test(inner)) continue;
      if (looksLikeToken(inner)) {
        if (!out.has(inner)) out.set(inner, fmEnd + 1 + i + 1); // approximate line in original file
      }
    }
  }
  return out;
}

const strict = argv.includes("--strict");
let totalUndefined = 0;

for (const target of TARGETS) {
  const filePath = resolve(ROOT, target);
  console.log(`\n[${target}]`);
  const content = readFileSync(filePath, "utf8");
  const defined = extractDefinedTokens(content);
  const refs = extractProseReferences(content);

  console.log(`  정의된 토큰: ${defined.size}, prose reference: ${refs.size}`);

  const undef = [];
  for (const [ref, line] of refs) {
    if (!defined.has(ref)) {
      undef.push({ ref, line });
    }
  }

  if (undef.length === 0) {
    console.log(`  ✓ 모든 prose token reference가 정의되어 있음`);
  } else {
    console.log(`  ⚠ 정의되지 않은 reference ${undef.length}건:`);
    for (const { ref, line } of undef.slice(0, 30)) {
      console.log(`    - ${target}:${line}  \`${ref}\``);
    }
    if (undef.length > 30) {
      console.log(`    ... (${undef.length - 30}건 추가)`);
    }
    totalUndefined += undef.length;
  }
}

console.log("");
if (strict && totalUndefined > 0) {
  console.error(`strict 모드 — 정의되지 않은 prose reference ${totalUndefined}건 발견. exit 1`);
  exit(1);
}
console.log(`완료. ${totalUndefined > 0 ? `${totalUndefined}건의 잠재적 typo/outdated reference 점검 권장 (false positive 가능 — strict 모드 X 기본).` : "이슈 없음."}`);
