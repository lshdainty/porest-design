#!/usr/bin/env node
// 공유 토큰 sync 자동화 (P1-A + P1-E)
//
// DESIGN.md를 source of truth로 삼아 DESIGN.hr.md / DESIGN.desk.md를 갱신.
//
// sync 범위:
//   1. typography / rounded / spacing 블록 (100% 공유, 통째 교체)
//   2. colors SHARED 영역 (P1-E v50 마커 도입 후 자동 sync) —
//      `# @sync:shared-start (colors-N)` ... `# @sync:shared-end (colors-N)`
//      brand 영역(`# @sync:brand-start (colors-N)` ... `brand-end`)은 보존.
//      현재 영역: colors-1 (Neutral), colors-2 (Semantic + Chart).
//
// drift detection (sync 후 잔여 검출):
//   colors의 마커 외부 영역 또는 mismatch — 일반적으로 0건이어야 함
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

// 자동 검출되는 마커 영역. 향후 components 추가 시 이 list 확장.
const MARKER_REGIONS = ["colors-1", "colors-2"];

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

function findMarkerRegion(lines, type, name) {
  // type: "shared" or "brand"
  // name: e.g. "colors-1"
  const startRe = new RegExp(`^\\s*#\\s*@sync:${type}-start\\s*\\(${name.replace(/-/g, "\\-")}\\)\\s*$`);
  const endRe = new RegExp(`^\\s*#\\s*@sync:${type}-end\\s*\\(${name.replace(/-/g, "\\-")}\\)\\s*$`);
  let start = -1, end = -1;
  for (let i = 0; i < lines.length; i++) {
    if (start === -1 && startRe.test(lines[i])) { start = i; continue; }
    if (start !== -1 && endRe.test(lines[i])) { end = i; break; }
  }
  if (start === -1 || end === -1) return null;
  return { start, end }; // start = marker line index (포함), end = end marker line index (포함)
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

  return [
    ...targetLines.slice(0, targetBlock.start),
    ...sourceSlice,
    ...targetLines.slice(targetBlock.end),
  ].join("\n");
}

function syncMarkerRegion(sourceContent, targetContent, regionName) {
  const sourceLines = sourceContent.split("\n");
  const targetLines = targetContent.split("\n");

  const srcRegion = findMarkerRegion(sourceLines, "shared", regionName);
  if (!srcRegion) {
    throw new Error(`source에 @sync:shared-* (${regionName}) 마커 없음 — 마커 도입 필요`);
  }
  const tgtRegion = findMarkerRegion(targetLines, "shared", regionName);
  if (!tgtRegion) {
    throw new Error(`target에 @sync:shared-* (${regionName}) 마커 없음 — 마커 도입 필요`);
  }

  // start/end 마커 라인 자체는 양쪽 모두 동일하므로 사이 콘텐츠만 교체
  const srcInner = sourceLines.slice(srcRegion.start + 1, srcRegion.end);
  return [
    ...targetLines.slice(0, tgtRegion.start + 1),
    ...srcInner,
    ...targetLines.slice(tgtRegion.end),
  ].join("\n");
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
let regionChanges = 0;
let driftCount = 0;

console.log(`source: ${relpath(SOURCE)}`);
console.log(`mode:   ${checkMode ? "check (dry-run)" : "sync"}`);
console.log("");

for (const target of TARGETS) {
  const original = readFileSync(target, "utf8");
  let updated = original;

  // 1. typography / rounded / spacing 통째 sync
  for (const block of FULL_SYNC_BLOCKS) {
    updated = syncBlock(sourceContent, updated, block);
  }

  // 2. colors 마커 영역 sync (P1-E)
  for (const region of MARKER_REGIONS) {
    updated = syncMarkerRegion(sourceContent, updated, region);
  }

  // 3. drift detection (마커 영역 내 sync 이후에도 남은 mismatch — 일반적으로 0)
  const targetColors = extractColors(updated);
  const drifts = detectColorDrift(sourceColors, targetColors);

  console.log(`[${relpath(target)}]`);

  if (updated !== original) {
    // 어떤 종류 변경인지 분리 보고하기 위해 다시 한 번 비교
    const fullSyncOnly = (() => {
      let onlyFull = original;
      for (const block of FULL_SYNC_BLOCKS) onlyFull = syncBlock(sourceContent, onlyFull, block);
      return onlyFull;
    })();
    const blockDiff = fullSyncOnly !== original;
    const regionDiff = updated !== fullSyncOnly;

    if (blockDiff) blockChanges++;
    if (regionDiff) regionChanges++;

    if (checkMode) {
      if (blockDiff) console.log(`  block sync 필요 (${FULL_SYNC_BLOCKS.join(" / ")} 일부 불일치)`);
      if (regionDiff) console.log(`  region sync 필요 (${MARKER_REGIONS.join(" / ")} 영역 일부 불일치)`);
    } else {
      writeFileSync(target, updated, "utf8");
      if (blockDiff) console.log(`  block sync 적용 (${FULL_SYNC_BLOCKS.join(" / ")})`);
      if (regionDiff) console.log(`  region sync 적용 (${MARKER_REGIONS.join(" / ")})`);
    }
  } else {
    console.log(`  block ${FULL_SYNC_BLOCKS.join(" / ")} + region ${MARKER_REGIONS.join(" / ")} 동기 상태 ✓`);
  }

  if (drifts.length === 0) {
    console.log(`  공유 colors ${SHARED_COLORS.size}개 일치 ✓`);
  } else {
    driftCount += drifts.length;
    console.log(`  공유 colors drift ${drifts.length}건 (마커 외부 영역 또는 sync 후 잔여):`);
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
  if (blockChanges > 0 || regionChanges > 0 || driftCount > 0) {
    console.error(`검사 실패: block ${blockChanges}건, region ${regionChanges}건, drift ${driftCount}건. \`npm run sync\`로 자동 동기.`);
    process.exit(1);
  }
  console.log("검사 통과 — 공유 토큰 동기 상태.");
} else {
  const totalChanges = blockChanges + regionChanges;
  if (totalChanges > 0) {
    console.log(`완료: ${totalChanges}개 동기 적용. \`npm run lint:all\`로 검증하세요.`);
  } else {
    console.log("완료: 변경 사항 없음.");
  }
  if (driftCount > 0) {
    console.log(`주의: 마커 외부 colors drift ${driftCount}건 — 수동 정리 필요 (마커 영역 확장 후보).`);
  }
}
