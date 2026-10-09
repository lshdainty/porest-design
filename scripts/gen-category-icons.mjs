#!/usr/bin/env node
// 카테고리 아이콘 세트를 레시피로 옮긴다 — specs/components/category-icons.yaml(원본) → recipes/shadcn/lib/category-icons.ts 의 표
//
// 레시피 파일의 `// @generated:start` ... `// @generated:end` 사이(lucide 아이콘 import · DEFAULT_CATEGORY_ICON · CATEGORY_ICON_GROUPS ·
// CATEGORY_ICONS · CATEGORY_ICON_COMPONENTS)만 다시 쓴다 — 형 · 찾기 함수는 손으로 쓴 그대로 둔다.
// YAML 의 entries 는 한 줄에 한 아이콘인 흐름 맵이다(`- { id: …, group: …, name: …, aliases: [ … ], lucideAliases: [ … ] }`).
// 이 꼴이 아닌 줄 · 모르는 키 · 빠진 키 · 겹치는 id · name · lucideAliases · groups 에 없는 묶음 · 아이콘이 없는 묶음 · 세트에 없는 default ·
// lucide-react 에 없는 id(또는 다른 이름으로 들어 있는 id) · 다른 아이콘을 가리키는 lucideAliases 가 있으면 줄 번호와 함께 멈춘다.
// lucide-react 는 Desk 웹이 쓰는 판(1.28.0 — 이 레포의 devDependencies 에 같은 판을 고정했다)의 이름 표(dynamicIconImports)로 견준다.
// 묶음 주석(# ── 식비 ──)은 그대로 옮긴다. 줄 단위로 읽은 값은 yaml 패키지로 읽은 값과 한 번 더 견준다.
//
// 사용법:
//   node scripts/gen-category-icons.mjs           # 표를 다시 쓴다
//   node scripts/gen-category-icons.mjs --check   # 쓰지 않고 견준다 — 어긋나면 exit 1(npm run verify 가 부른다)

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { dirname, resolve, relative } from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(ROOT, "specs/components/category-icons.yaml");
const TARGET = resolve(ROOT, "recipes/shadcn/lib/category-icons.ts");
const START = /^\/\/ @generated:start\b.*$/m;
const END = /^\/\/ @generated:end\b.*$/m;

const KEYS = ["id", "group", "name", "aliases", "lucideAliases"];
const REQUIRED = ["id", "group", "name", "aliases"];
const LISTS = ["aliases", "lucideAliases"];
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

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

function list(raw, line, key) {
  if (!raw.startsWith("[") || !raw.endsWith("]")) fail(line, `${key} 는 [ … ] 목록이다: ${raw}`);
  return splitTop(raw.slice(1, -1), line).map((v) => scalar(v, line));
}

function parseSource(yaml) {
  const lines = yaml.split("\n");
  const top = (key) => {
    const at = lines.findIndex((l) => new RegExp(`^${key}:`).test(l));
    if (at < 0) fail(1, `${key}: 가 없다`);
    return { raw: lines[at].slice(key.length + 1).trim(), line: at + 1 };
  };
  const def = top("default");
  const defaultId = scalar(def.raw, def.line);
  const grp = top("groups");
  const groups = list(grp.raw, grp.line, "groups");
  if (groups.length === 0) fail(grp.line, "groups 가 비었다");
  if (new Set(groups).size !== groups.length) fail(grp.line, "groups 에 같은 묶음이 두 번 있다");

  const at = lines.findIndex((l) => /^entries:\s*$/.test(l));
  if (at < 0) fail(1, "entries: 가 없다");
  const items = [];
  for (let i = at + 1; i < lines.length; i++) {
    const n = i + 1;
    const l = lines[i];
    if (l.trim() === "") continue;
    if (/^\S/.test(l)) fail(n, `entries 뒤에 다른 키가 있다 — entries 를 맨 끝에 둔다: ${l}`);
    const comment = /^\s*#\s?(.*)$/.exec(l);
    if (comment) {
      items.push({ comment: comment[1] });
      continue;
    }
    const m = /^\s*-\s*\{(.*)\}\s*$/.exec(l);
    if (!m) fail(n, `한 줄 흐름 맵(- { … })이 아니다 — 줄 끝 주석도 두지 않는다: ${l.trim()}`);
    const entry = {};
    for (const part of splitTop(m[1], n)) {
      const c = part.indexOf(":");
      if (c < 0) fail(n, `키: 값 이 아니다: ${part}`);
      const key = part.slice(0, c).trim();
      const raw = part.slice(c + 1).trim();
      if (!KEYS.includes(key)) fail(n, `모르는 키 ${key} — ${KEYS.join(" · ")} 만 쓴다`);
      if (key in entry) fail(n, `키 ${key} 가 두 번 있다`);
      entry[key] = LISTS.includes(key) ? list(raw, n, key) : scalar(raw, n);
    }
    for (const key of REQUIRED) if (!(key in entry)) fail(n, `${key} 가 없다`);
    if (!KEBAB.test(entry.id)) fail(n, `id 는 lucide 이름(소문자 kebab)이다: ${entry.id}`);
    if (!groups.includes(entry.group)) fail(n, `groups 에 없는 묶음 ${entry.group}`);
    if (entry.name.trim() === "") fail(n, "name 이 비었다");
    if (entry.aliases.some((a) => a.trim() === "")) fail(n, "빈 찾는 말이 있다");
    if ("lucideAliases" in entry) {
      if (entry.lucideAliases.length === 0) fail(n, "lucideAliases 가 비었다 — 없으면 키를 뺀다");
      for (const a of entry.lucideAliases) if (!KEBAB.test(a)) fail(n, `lucideAliases 는 lucide 이름(소문자 kebab)이다: ${a}`);
    }
    items.push({ entry, line: n });
  }
  const entries = items.filter((it) => it.entry);
  if (entries.length === 0) fail(at + 1, "entries 가 비었다");

  // 겹치는 id · name · lucideAliases — 저장 값 하나가 두 아이콘을 가리키면 안 된다, 이름 하나가 두 칸에 있으면 안 된다
  const ids = new Map();
  const names = new Map();
  for (const { entry, line } of entries) {
    for (const key of [entry.id, ...(entry.lucideAliases ?? [])]) {
      const prev = ids.get(key);
      if (prev) fail(line, `"${key}" 가 ${prev.id}(${prev.line}줄) 에도 있다 — id · lucideAliases 는 세트 안에서 하나다`);
      ids.set(key, { id: entry.id, line });
    }
    const prevName = names.get(entry.name);
    if (prevName) fail(line, `이름 "${entry.name}" 이 ${prevName.id}(${prevName.line}줄) 에도 있다`);
    names.set(entry.name, { id: entry.id, line });
  }
  const defaultEntry = entries.find((e) => e.entry.id === defaultId);
  if (!defaultEntry) fail(def.line, `default ${defaultId} 가 entries 에 없다`);
  for (const g of groups) if (!entries.some((e) => e.entry.group === g)) fail(grp.line, `묶음 ${g} 에 아이콘이 없다`);

  // 줄 단위로 읽은 값이 YAML 로 읽은 값과 같은지 — 줄 파서가 놓친 문법(따옴표 · 이스케이프)을 잡는다
  const doc = parseYaml(yaml);
  const same =
    doc?.default === defaultId &&
    JSON.stringify(doc?.groups) === JSON.stringify(groups) &&
    Array.isArray(doc?.entries) &&
    doc.entries.length === entries.length &&
    doc.entries.every((e, k) => JSON.stringify(e) === JSON.stringify(entries[k].entry));
  if (!same) fail(1, "줄 단위로 읽은 값이 YAML 로 읽은 값과 다르다 — 한 줄 흐름 맵 꼴을 지킨다");

  return { defaultId, groups, items };
}

// lucide-react 의 이름 표 — 이름 → 아이콘 파일. 다른 이름(옛 이름)은 같은 파일을 가리킨다
function lucideNames() {
  const require = createRequire(resolve(ROOT, "package.json"));
  let pkgPath;
  try {
    pkgPath = require.resolve("lucide-react/package.json");
  } catch {
    console.error("lucide-react 를 찾지 못했다 — 레포 루트에서 npm ci 로 devDependencies 를 깐다");
    process.exit(1);
  }
  const dir = dirname(pkgPath);
  const { version } = JSON.parse(readFileSync(pkgPath, "utf8"));
  const table = resolve(dir, "dist/esm/dynamicIconImports.mjs");
  const types = resolve(dir, "dist/lucide-react.d.ts");
  if (!existsSync(table) || !existsSync(types)) {
    console.error(`lucide-react ${version} 에 이름 표(dist/esm/dynamicIconImports.mjs · dist/lucide-react.d.ts)가 없다`);
    process.exit(1);
  }
  const files = new Map();
  for (const m of readFileSync(table, "utf8").matchAll(/^\s*"([a-z0-9-]+)":\s*\(\)\s*=>\s*import\('\.\/icons\/([a-z0-9-]+)\.mjs'\)/gm)) files.set(m[1], m[2]);
  if (files.size < 1000) {
    console.error(`lucide-react ${version} 의 이름 표를 읽지 못했다(${files.size}개)`);
    process.exit(1);
  }
  return { version, files, dts: readFileSync(types, "utf8") };
}

// lucide 이름 → React 컴포넌트 이름("utensils-crossed" → UtensilsCrossed, "dice-5" → Dice5)
const pascal = (id) => id.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");

function checkLucide(items) {
  const lucide = lucideNames();
  for (const { entry, line } of items.filter((it) => it.entry)) {
    const file = lucide.files.get(entry.id);
    if (!file) fail(line, `lucide-react ${lucide.version} 에 없는 아이콘 ${entry.id}`);
    if (file !== entry.id) fail(line, `${entry.id} 는 lucide-react ${lucide.version} 에서 ${file} 의 다른 이름이다 — id 는 ${file} 로 쓰고 ${entry.id} 는 lucideAliases 에 둔다`);
    if (!new RegExp(`^declare const ${pascal(entry.id)}:`, "m").test(lucide.dts)) fail(line, `lucide-react ${lucide.version} 에 컴포넌트 ${pascal(entry.id)} 가 없다`);
    for (const alias of entry.lucideAliases ?? []) {
      const aliasFile = lucide.files.get(alias);
      if (aliasFile !== entry.id) fail(line, `lucideAliases ${alias} 는 lucide-react ${lucide.version} 에서 ${aliasFile ?? "없는 이름"} 이다 — ${entry.id} 와 같은 아이콘이어야 한다`);
    }
  }
  return lucide.version;
}

function render({ defaultId, groups, items }) {
  const str = (v) => JSON.stringify(v);
  const entries = items.filter((it) => it.entry).map((it) => it.entry);
  const components = [...new Set(entries.map((e) => pascal(e.id)))].sort();
  const rows = items.map((item) => {
    if (item.comment != null) return `  // ${item.comment}`;
    const { id, group, name, aliases, lucideAliases } = item.entry;
    const fields = [`id: ${str(id)}`, `group: ${str(group)}`, `name: ${str(name)}`, `aliases: [${aliases.map(str).join(", ")}]`];
    if (lucideAliases) fields.push(`lucideAliases: [${lucideAliases.map(str).join(", ")}]`);
    return `  { ${fields.join(", ")} },`;
  });
  return [
    `import type { LucideIcon } from "lucide-react";`,
    `import {`,
    // 컴포넌트 이름에 Icon 을 붙여 들인다 — Map · Box 처럼 전역 이름과 겹치는 아이콘이 있다
    ...components.map((c) => `  ${c} as ${c}Icon,`),
    `} from "lucide-react";`,
    ``,
    `/** 기본 아이콘 — 새 항목 · 아이콘이 없는 항목(null · "") */`,
    `export const DEFAULT_CATEGORY_ICON = ${str(defaultId)};`,
    ``,
    `/** 묶음 차례 — 격자는 이 차례로 묶음을 둔다 */`,
    `export const CATEGORY_ICON_GROUPS = [${groups.map(str).join(", ")}] as const;`,
    ``,
    `/** 세트 — 묶음 안은 이 차례, 찾기 결과도 이 차례다 */`,
    `export const CATEGORY_ICONS: readonly CategoryIcon[] = [`,
    ...rows,
    `];`,
    ``,
    `/** id → lucide 컴포넌트(세트 안만 — 세트 밖 저장 값은 lucide-react/dynamic 의 DynamicIcon 으로 그린다) */`,
    `export const CATEGORY_ICON_COMPONENTS: Readonly<Record<string, LucideIcon>> = {`,
    ...entries.map((e) => `  ${str(e.id)}: ${pascal(e.id)}Icon,`),
    `};`,
  ].join("\n");
}

const source = parseSource(readFileSync(SOURCE, "utf8"));
const version = checkLucide(source.items);
const count = source.items.filter((i) => i.entry).length;
const target = readFileSync(TARGET, "utf8");
const start = START.exec(target);
const end = END.exec(target);
if (!start || !end || end.index < start.index) {
  console.error(`${relative(ROOT, TARGET)} — // @generated:start · // @generated:end 표시가 없다`);
  process.exit(1);
}
const head = target.slice(0, start.index + start[0].length);
const tail = target.slice(end.index);
const next = `${head}\n${render(source)}\n${tail}`;

if (process.argv.includes("--check")) {
  if (next !== target) {
    console.error(`${relative(ROOT, TARGET)} 의 표가 ${relative(ROOT, SOURCE)} 와 다르다 — npm run gen:category-icons 로 다시 만든다`);
    process.exit(1);
  }
  console.log(`카테고리 아이콘 ${count}개 · 묶음 ${source.groups.length}(lucide-react ${version}) — ${relative(ROOT, TARGET)} 가 YAML 과 같다`);
} else {
  writeFileSync(TARGET, next);
  console.log(`카테고리 아이콘 ${count}개 · 묶음 ${source.groups.length}(lucide-react ${version}) → ${relative(ROOT, TARGET)}${next === target ? "(바뀐 것 없음)" : ""}`);
}
