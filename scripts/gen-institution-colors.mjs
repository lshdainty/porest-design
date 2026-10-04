#!/usr/bin/env node
// 기관 색 표를 레시피로 옮긴다 — specs/components/institution-colors.yaml(원본) → recipes/shadcn/lib/institution-colors.ts 의 표
//
// 레시피 파일의 `// @generated:start` ... `// @generated:end` 사이(INSTITUTION_COLORS)만 다시 쓴다 — 찾기 함수 · 형은 손으로 쓴 그대로 둔다.
// YAML 의 entries 는 한 줄에 한 기관인 흐름 맵이다(`- { name: …, category: …, aliases: [ … ], color: "#…", ci: "#…", text: white }  # 대비`).
// 이 꼴이 아닌 줄 · 모르는 키 · 빠진 키 · hex 가 아닌 색 · white/dark 가 아닌 글자색 · 두 기관에 같은 이름(공백을 뺀)이 있으면 줄 번호와 함께 멈춘다.
// 줄 끝 주석(대비)과 묶음 주석(# ── 시중은행 ──)은 그대로 옮긴다.
//
// 사용법:
//   node scripts/gen-institution-colors.mjs           # 표를 다시 쓴다
//   node scripts/gen-institution-colors.mjs --check   # 쓰지 않고 견준다 — 어긋나면 exit 1(npm run verify 가 부른다)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(ROOT, "specs/components/institution-colors.yaml");
const TARGET = resolve(ROOT, "recipes/shadcn/lib/institution-colors.ts");
const START = /^\/\/ @generated:start\b.*$/m;
const END = /^\/\/ @generated:end\b.*$/m;

const KEYS = ["name", "category", "aliases", "color", "ci", "text"];
const REQUIRED = ["name", "category", "aliases", "color", "text"];
const HEX = /^#[0-9A-Fa-f]{6}$/;

const fail = (line, message) => {
  console.error(`${relative(ROOT, SOURCE)}:${line} — ${message}`);
  process.exit(1);
};

// 맨 위 수준의 쉼표로 나눈다 — [ … ] · "…" 안의 쉼표는 나누지 않는다
function splitTop(text, line) {
  const parts = [];
  let depth = 0;
  let quote = null;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "[") depth++;
    else if (ch === "]") depth--;
    else if (ch === "," && depth === 0) {
      parts.push(text.slice(start, i));
      start = i + 1;
    }
    if (depth < 0) fail(line, "닫는 ] 가 여는 [ 보다 많다");
  }
  if (quote || depth !== 0) fail(line, "따옴표 · 대괄호가 닫히지 않았다");
  parts.push(text.slice(start));
  return parts.map((p) => p.trim()).filter((p) => p !== "");
}

// 흐름 맵의 값 하나 — 따옴표 글 · 맨 글. 따옴표 없는 글에 YAML 이 다르게 읽는 글자(# : { } [ ] , & * ! | > ' " % @ `)가 있으면 멈춘다
function scalar(raw, line) {
  if (raw.startsWith('"')) {
    try {
      return JSON.parse(raw);
    } catch {
      fail(line, `따옴표 글을 읽지 못했다: ${raw}`);
    }
  }
  if (raw.startsWith("'")) {
    if (!raw.endsWith("'") || raw.length < 2) fail(line, `따옴표 글을 읽지 못했다: ${raw}`);
    return raw.slice(1, -1).replace(/''/g, "'");
  }
  if (/[#:{}[\],&*!|>'"%@`]/.test(raw)) fail(line, `따옴표 없는 글에 YAML 기호가 있다(따옴표로 감싼다): ${raw}`);
  return raw;
}

function parseEntries(yaml) {
  const lines = yaml.split("\n");
  const at = lines.findIndex((l) => /^entries:\s*$/.test(l));
  if (at < 0) fail(1, "entries: 가 없다");
  const out = [];
  for (let i = at + 1; i < lines.length; i++) {
    const n = i + 1;
    const l = lines[i];
    if (l.trim() === "") continue;
    if (/^\S/.test(l)) fail(n, `entries 뒤에 다른 키가 있다 — entries 를 맨 끝에 둔다: ${l}`);
    const comment = /^\s*#\s?(.*)$/.exec(l);
    if (comment) {
      out.push({ comment: comment[1] });
      continue;
    }
    const m = /^\s*-\s*\{(.*)\}\s*(?:#\s?(.*))?$/.exec(l);
    if (!m) fail(n, `한 줄 흐름 맵(- { … })이 아니다: ${l.trim()}`);
    const entry = {};
    for (const part of splitTop(m[1], n)) {
      const c = part.indexOf(":");
      if (c < 0) fail(n, `키: 값 이 아니다: ${part}`);
      const key = part.slice(0, c).trim();
      const raw = part.slice(c + 1).trim();
      if (!KEYS.includes(key)) fail(n, `모르는 키 ${key} — ${KEYS.join(" · ")} 만 쓴다`);
      if (key in entry) fail(n, `키 ${key} 가 두 번 있다`);
      if (key === "aliases") {
        if (!raw.startsWith("[") || !raw.endsWith("]")) fail(n, `aliases 는 [ … ] 목록이다: ${raw}`);
        entry.aliases = splitTop(raw.slice(1, -1), n).map((v) => scalar(v, n));
      } else entry[key] = scalar(raw, n);
    }
    for (const key of REQUIRED) if (!(key in entry)) fail(n, `${key} 가 없다`);
    if (entry.name.trim() === "" || entry.category.trim() === "") fail(n, "name · category 가 비었다");
    if (entry.aliases.some((a) => a.trim() === "")) fail(n, "빈 별칭이 있다");
    if (!HEX.test(entry.color)) fail(n, `color 는 #RRGGBB 다: ${entry.color}`);
    if ("ci" in entry && !HEX.test(entry.ci)) fail(n, `ci 는 #RRGGBB 다: ${entry.ci}`);
    if (entry.text !== "white" && entry.text !== "dark") fail(n, `text 는 white · dark 다: ${entry.text}`);
    out.push({ entry, note: m[2]?.trim() || null, line: n });
  }
  // 같은 이름(공백을 뺀 name · aliases)이 두 기관에 있으면 같은 이름 찾기가 표 순서에 기댄다 — 표를 고친다
  const owner = new Map();
  for (const { entry, line } of out.filter((o) => o.entry)) {
    for (const key of [entry.name, ...entry.aliases].map((k) => k.replace(/\s+/g, ""))) {
      const prev = owner.get(key);
      if (prev && prev.name !== entry.name) fail(line, `"${key}" 가 ${prev.name}(${prev.line}줄) · ${entry.name} 두 기관에 있다`);
      owner.set(key, { name: entry.name, line });
    }
  }
  return out;
}

function render(items) {
  const str = (v) => JSON.stringify(v);
  const rows = items.map((item) => {
    if (item.comment != null) return `  // ${item.comment}`;
    const { name, category, aliases, color, ci, text } = item.entry;
    const fields = [`name: ${str(name)}`, `category: ${str(category)}`, `aliases: [${aliases.map(str).join(", ")}]`, `color: ${str(color)}`];
    if (ci != null) fields.push(`ci: ${str(ci)}`);
    fields.push(`text: ${str(text)}`);
    return `  { ${fields.join(", ")} },${item.note ? ` // ${item.note}` : ""}`;
  });
  return `export const INSTITUTION_COLORS: readonly InstitutionColor[] = [\n${rows.join("\n")}\n];`;
}

const items = parseEntries(readFileSync(SOURCE, "utf8"));
const count = items.filter((i) => i.entry).length;
const target = readFileSync(TARGET, "utf8");
const start = START.exec(target);
const end = END.exec(target);
if (!start || !end || end.index < start.index) {
  console.error(`${relative(ROOT, TARGET)} — // @generated:start · // @generated:end 표시가 없다`);
  process.exit(1);
}
const head = target.slice(0, start.index + start[0].length);
const tail = target.slice(end.index);
const next = `${head}\n${render(items)}\n${tail}`;

if (process.argv.includes("--check")) {
  if (next !== target) {
    console.error(`${relative(ROOT, TARGET)} 의 표가 ${relative(ROOT, SOURCE)} 와 다르다 — npm run gen:institution-colors 로 다시 만든다`);
    process.exit(1);
  }
  console.log(`기관 색 표 ${count}곳 — ${relative(ROOT, TARGET)} 가 YAML 과 같다`);
} else {
  writeFileSync(TARGET, next);
  console.log(`기관 색 표 ${count}곳 → ${relative(ROOT, TARGET)}${next === target ? "(바뀐 것 없음)" : ""}`);
}
