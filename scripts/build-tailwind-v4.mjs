#!/usr/bin/env node
// Tailwind v4 @theme CSS 빌드 (P1-B)
//
// design.md spec의 typography는 lineHeight를 export에서 누락하고,
// shadow는 prose-token이라 export에서 빠집니다. 이 빌드 스크립트는
// DESIGN*.md를 직접 파싱하여 모든 토큰(color/typography/rounded/spacing
// + prose shadow)을 v4 @theme CSS로 출력합니다.
//
// 사용법:
//   node scripts/build-tailwind-v4.mjs --source DESIGN.md > exports/tokens.css
//   node scripts/build-tailwind-v4.mjs --source DESIGN.hr.md > exports/tokens.hr.css
//
// v4 namespace 매핑:
//   colors      → --color-{name}
//   typography  → --text-{name} + --text-{name}--line-height + --text-{name}--font-weight
//   rounded     → --radius-{name}
//   spacing     → --spacing-{name}
//   prose shadow→ --shadow-{name without "shadow-" prefix}

import { readFileSync } from "node:fs";
import { argv, stdout, exit } from "node:process";

function parseArgs(arr) {
  const out = {};
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = arr[i + 1];
    if (next && !next.startsWith("--")) { out[key] = next; i++; }
    else { out[key] = true; }
  }
  return out;
}

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

function parseColors(lines) {
  const { start, end } = findBlockLines(lines, "colors");
  const out = {};
  for (let i = start + 1; i < end; i++) {
    const m = /^\s+([a-z0-9-]+):\s*"(#[0-9A-Fa-f]+)"/.exec(lines[i]);
    if (m) out[m[1]] = m[2].toLowerCase();
  }
  return out;
}

function parseTypography(lines) {
  const { start, end } = findBlockLines(lines, "typography");
  const out = {};
  let current = null;
  for (let i = start + 1; i < end; i++) {
    const line = lines[i];
    const named = /^\s{2}([a-z][a-z0-9-]*):\s*$/.exec(line);
    if (named) { current = named[1]; out[current] = {}; continue; }
    const prop = /^\s{4}([a-zA-Z]+):\s*(.+?)\s*$/.exec(line);
    if (prop && current) {
      let val = prop[2].replace(/^"|"$/g, "").replace(/^'|'$/g, "");
      out[current][prop[1]] = val;
    }
  }
  return out;
}

function parseSimpleScale(lines, key) {
  const { start, end } = findBlockLines(lines, key);
  const out = {};
  for (let i = start + 1; i < end; i++) {
    const m = /^\s+([a-z0-9]+):\s*"?([^"#\n]+?)"?\s*(?:#.*)?$/.exec(lines[i]);
    if (m && !m[1].startsWith("#")) out[m[1]] = m[2].trim();
  }
  return out;
}

function parseShadows(md) {
  const re = /^\|\s*`(shadow-[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|/gm;
  const out = {};
  let m;
  while ((m = re.exec(md)) !== null) out[m[1]] = m[2];
  return out;
}

function parseMotion(md) {
  // motion-duration-* and motion-ease-* prose tokens
  const re = /^\|\s*`(motion-(?:duration|ease)-[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|/gm;
  const out = {};
  let m;
  while ((m = re.exec(md)) !== null) out[m[1]] = m[2];
  return out;
}

function parseOverlay(md) {
  // overlay-dim-* prose tokens (rgba(...) alpha values)
  const re = /^\|\s*`(overlay-[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|/gm;
  const out = {};
  let m;
  while ((m = re.exec(md)) !== null) out[m[1]] = m[2];
  return out;
}

function parseBreakpoints(md) {
  // breakpoint-* prose tokens (px values, Tailwind v4 default 호환)
  const re = /^\|\s*`(breakpoint-[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|/gm;
  const out = {};
  let m;
  while ((m = re.exec(md)) !== null) out[m[1]] = m[2];
  return out;
}

function parseTouchTargets(md) {
  // touch-* prose tokens (WCAG 2.5.5 AAA + Apple Store reference)
  const re = /^\|\s*`(touch-[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|/gm;
  const out = {};
  let m;
  while ((m = re.exec(md)) !== null) out[m[1]] = m[2];
  return out;
}

function parseZIndex(md) {
  // z-* prose tokens (layering stacking order)
  const re = /^\|\s*`(z-[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|/gm;
  const out = {};
  let m;
  while ((m = re.exec(md)) !== null) out[m[1]] = m[2];
  return out;
}

const args = parseArgs(argv.slice(2));
const source = args.source;
if (!source) {
  console.error("usage: build-tailwind-v4.mjs --source <DESIGN*.md>");
  exit(2);
}

const content = readFileSync(source, "utf8");
const lines = content.split("\n");

const colors = parseColors(lines);
const typography = parseTypography(lines);
const rounded = parseSimpleScale(lines, "rounded");
const spacing = parseSimpleScale(lines, "spacing");
const shadows = parseShadows(content);
const motion = parseMotion(content);
const overlays = parseOverlay(content);
const breakpoints = parseBreakpoints(content);
const touchTargets = parseTouchTargets(content);
const zIndex = parseZIndex(content);

let out = "";
out += `/* Generated from ${source} by scripts/build-tailwind-v4.mjs — do not edit. */\n`;
out += `/* Tailwind v4 @theme CSS (CSS-first config). */\n\n`;
out += "@theme {\n";

out += "  /* Font family — Korean-first Pretendard, Inter fallback */\n";
out += `  --font-sans: "Pretendard", "Inter", system-ui, sans-serif;\n\n`;

out += "  /* Colors */\n";
for (const [name, hex] of Object.entries(colors)) {
  out += `  --color-${name}: ${hex};\n`;
}
out += "\n";

out += "  /* Typography (font-size + line-height + font-weight + letter-spacing modifiers) */\n";
for (const [name, props] of Object.entries(typography)) {
  if (props.fontSize) out += `  --text-${name}: ${props.fontSize};\n`;
  if (props.lineHeight) out += `  --text-${name}--line-height: ${props.lineHeight};\n`;
  if (props.fontWeight) out += `  --text-${name}--font-weight: ${props.fontWeight};\n`;
  if (props.letterSpacing) out += `  --text-${name}--letter-spacing: ${props.letterSpacing};\n`;
}
out += "\n";

out += "  /* Radius */\n";
for (const [name, val] of Object.entries(rounded)) {
  out += `  --radius-${name}: ${val};\n`;
}
out += "\n";

out += "  /* Spacing */\n";
for (const [name, val] of Object.entries(spacing)) {
  out += `  --spacing-${name}: ${val};\n`;
}
out += "\n";

out += "  /* Shadow (from prose-token table — DESIGN*.md '## Elevation & Depth') */\n";
for (const [name, val] of Object.entries(shadows)) {
  // shadow-sm → --shadow-sm, shadow-md-dark → --shadow-md-dark
  out += `  --${name}: ${val};\n`;
}
out += "\n";

out += "  /* Motion (from prose-token table — DESIGN*.md '## Motion') */\n";
for (const [name, val] of Object.entries(motion)) {
  // motion-duration-fast → --motion-duration-fast, motion-ease-out → --motion-ease-out
  out += `  --${name}: ${val};\n`;
}
out += "\n";

out += "  /* Overlay dim (from prose-token table — alpha 채널 rgba) */\n";
for (const [name, val] of Object.entries(overlays)) {
  // overlay-dim-light → --overlay-dim-light
  out += `  --${name}: ${val};\n`;
}
out += "\n";

out += "  /* Breakpoints (from prose-token table — Apple Store reference) */\n";
for (const [name, val] of Object.entries(breakpoints)) {
  // breakpoint-sm → --breakpoint-sm
  out += `  --${name}: ${val};\n`;
}
out += "\n";

out += "  /* Touch targets (from prose-token table — WCAG 2.5.5 AAA) */\n";
for (const [name, val] of Object.entries(touchTargets)) {
  // touch-min → --touch-min
  out += `  --${name}: ${val};\n`;
}
out += "\n";

out += "  /* Z-index (from prose-token table — layering stacking order) */\n";
for (const [name, val] of Object.entries(zIndex)) {
  // z-modal → --z-modal
  out += `  --${name}: ${val};\n`;
}
out += "}\n";

stdout.write(out);
