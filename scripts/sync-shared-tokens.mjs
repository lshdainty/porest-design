#!/usr/bin/env node
// 공유 토큰 sync 자동화 (P1-A)
//
// DESIGN.md를 source of truth로 삼아 DESIGN.hr.md / DESIGN.desk.md를 갱신.
// 자동 sync 범위(MVP): typography / rounded / spacing 블록 (100% 공유, 통째 교체).
// drift detection: colors 공유 토큰 (allowlist 기반, value mismatch 보고만).
// components / colors의 부분 sync는 brand 영역 interleaved로 보류 — 향후 마커 도입 후 확장.
//
// 사용법:
//   node scripts/sync-shared-tokens.mjs           # sync 수행 + drift 보고
//   node scripts/sync-shared-tokens.mjs --check   # dry-run, drift/sync 필요시 exit 1

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(ROOT, "DESIGN.md");
const TARGETS = [resolve(ROOT, "DESIGN.hr.md"), resolve(ROOT, "DESIGN.desk.md")];

const FULL_SYNC_BLOCKS = ["typography", "rounded", "spacing"];

const SHARED_COLORS = new Set([
  "bg-page", "bg-page-dark",
  "surface-default", "surface-default-dark", "surface-input", "surface-input-dark",
  "text-primary", "text-primary-dark",
  "text-secondary", "text-secondary-dark",
  "text-tertiary", "text-tertiary-dark",
  "text-disabled", "text-disabled-dark",
  "text-on-accent",
  "border-default", "border-default-dark",
  "border-strong", "border-strong-dark",
  "success", "success-light",
  "error", "error-light",
  "warning", "warning-light",
  "info", "info-light",
  "chart-red", "chart-orange", "chart-yellow", "chart-green", "chart-blue",
  "chart-indigo", "chart-violet", "chart-pink", "chart-brown", "chart-gray",
  "chart-red-light", "chart-orange-light", "chart-yellow-light", "chart-green-light", "chart-blue-light",
  "chart-indigo-light", "chart-violet-light", "chart-pink-light", "chart-brown-light", "chart-gray-light",
]);

function findBlockLines(lines, key) {
  const startRe = new RegExp(`^${key}:\\s*$`);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (startRe.test(lines[i])) { start = i; break; }
  }
  if (start === -1) throw new Error(`Block "${key}:" not found`);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^---\s*$/.test(line)) { end = i; break; }
    if (/^[a-zA-Z][a-zA-Z0-9_-]*:\s*$/.test(line)) { end = i; break; }
  }
  return { start, end };
}

function extractColors(content) {
  const out = {};
  const lines = content.split("\n");
  const { start, end } = findBlockLines(lines, "colors");
  for (let i = start + 1; i < end; i++) {
    const m = /^\s+([a-z0-9-]+):\s*"(#[0-9A-Fa-f]+)"/.exec(lines[i]);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function syncBlock(sourceContent, targetContent, blockKey) {
  const sourceLines = sourceContent.split("\n");
  const sourceBlock = findBlockLines(sourceLines, blockKey);
  const sourceSlice = sourceLines.slice(sourceBlock.start, sourceBlock.end);

  const targetLines = targetContent.split("\n");
  const targetBlock = findBlockLines(targetLines, blockKey);

  const result = [
    ...targetLines.slice(0, targetBlock.start),
    ...sourceSlice,
    ...targetLines.slice(targetBlock.end),
  ].join("\n");
  return result;
}

function detectColorDrift(sourceColors, targetColors) {
  const drifts = [];
  for (const key of SHARED_COLORS) {
    const inSource = key in sourceColors;
    const inTarget = key in targetColors;
    if (!inSource && !inTarget) continue;
    if (!inSource) {
      drifts.push({ type: "missing-in-source", token: key, target: targetColors[key] });
    } else if (!inTarget) {
      drifts.push({ type: "missing-in-target", token: key, source: sourceColors[key] });
    } else if (sourceColors[key] !== targetColors[key]) {
      drifts.push({ type: "value-mismatch", token: key, source: sourceColors[key], target: targetColors[key] });
    }
  }
  return drifts;
}

function relpath(p) {
  return p.startsWith(ROOT + "/") ? p.slice(ROOT.length + 1) : p;
}

const checkMode = process.argv.includes("--check");
const sourceContent = readFileSync(SOURCE, "utf8");
const sourceColors = extractColors(sourceContent);

let blockChanges = 0;
let driftCount = 0;

console.log(`source: ${relpath(SOURCE)}`);
console.log(`mode:   ${checkMode ? "check (dry-run)" : "sync"}`);
console.log("");

for (const target of TARGETS) {
  const original = readFileSync(target, "utf8");
  let updated = original;
  for (const block of FULL_SYNC_BLOCKS) {
    updated = syncBlock(sourceContent, updated, block);
  }

  const targetColors = extractColors(original);
  const drifts = detectColorDrift(sourceColors, targetColors);

  console.log(`[${relpath(target)}]`);

  if (updated !== original) {
    blockChanges++;
    if (checkMode) {
      console.log(`  block sync 필요 (${FULL_SYNC_BLOCKS.join(" / ")} 중 일부 불일치)`);
    } else {
      writeFileSync(target, updated, "utf8");
      console.log(`  block sync 적용 (${FULL_SYNC_BLOCKS.join(" / ")})`);
    }
  } else {
    console.log(`  block ${FULL_SYNC_BLOCKS.join(" / ")} 동기 상태 ✓`);
  }

  if (drifts.length === 0) {
    console.log(`  공유 colors ${SHARED_COLORS.size}개 일치 ✓`);
  } else {
    driftCount += drifts.length;
    console.log(`  공유 colors drift ${drifts.length}건:`);
    for (const d of drifts) {
      if (d.type === "value-mismatch") {
        console.log(`    - ${d.token}: source=${d.source}  target=${d.target}`);
      } else if (d.type === "missing-in-target") {
        console.log(`    - ${d.token}: target에 없음 (source=${d.source})`);
      } else {
        console.log(`    - ${d.token}: source에 없음 (target=${d.target})`);
      }
    }
  }
  console.log("");
}

if (checkMode) {
  if (blockChanges > 0 || driftCount > 0) {
    console.error(`검사 실패: block ${blockChanges}건, drift ${driftCount}건. \`npm run sync\`로 typography/rounded/spacing 블록 자동 동기, colors drift는 수동 처리(brand 영역 interleaved).`);
    process.exit(1);
  }
  console.log("검사 통과 — 공유 토큰 동기 상태.");
} else {
  if (blockChanges > 0) {
    console.log(`완료: ${blockChanges}개 파일 갱신. \`npm run lint:all\`로 검증하세요.`);
  } else {
    console.log("완료: 변경 사항 없음.");
  }
  if (driftCount > 0) {
    console.log(`주의: 공유 colors drift ${driftCount}건은 자동 갱신 비대상 — 수동으로 3파일 색상 토큰을 일치시키세요.`);
  }
}
