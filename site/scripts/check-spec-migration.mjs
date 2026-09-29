// 스펙 md 의 수치 표를 YAML 로 옮긴 뒤, 옮기기 전 표의 값이 사이트 페이지에 빠짐없이 남았는지 본다.
//
//   node scripts/check-spec-migration.mjs <컴포넌트> [--base <git ref>]   (site/ 에서, npm run gen 뒤)
//
// 기준(ref, 기본 origin/main)의 md 에 있던 표 가운데 지금 md 에 없는 표를 "옮긴 표" 로 보고,
// 그 표의 값 조각(코드 · px/%/ms 수치 · hex 색)이 생성된 페이지(content/docs/components/<컴포넌트>.md)
// 어딘가에 있는지 찾는다. 줄 단위 대응까지는 못 본다 — 빠짐만 잡는다. 어느 칸에 붙었는지는 사람이 본다.
//
// 결과
//   빠짐   토큰 · 수치 · 색 — 옮기다 잃은 값이다. 하나라도 있으면 exit 1
//   참고   Tailwind 클래스 같은 구현 표기 — 값을 되풀이할 뿐이면 버려도 되지만, 정보가 있으면 note 로 옮긴다

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = join(SITE, '..');

const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith('--'));
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'origin/main';
if (!name) {
  console.error('사용: node scripts/check-spec-migration.mjs <컴포넌트> [--base <git ref>]');
  process.exit(2);
}

const rel = `specs/components/${name}.md`;
const before = execFileSync('git', ['-C', REPO, 'show', `${base}:${rel}`], { encoding: 'utf8' });
const after = readFileSync(join(REPO, rel), 'utf8');
const page = readFileSync(join(SITE, `content/docs/components/${name}.md`), 'utf8');

// 코드 펜스 밖의 표 블록.
function tables(text) {
  const out = [];
  let fence = null;
  let block = null;
  let heading = '';
  for (const [i, line] of text.split('\n').entries()) {
    const m = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (m && !fence) fence = m[1];
    else if (m && fence && m[1][0] === fence[0] && m[1].length >= fence.length && !m[2].trim()) fence = null;
    const isRow = !fence && line.trimStart().startsWith('|');
    if (!fence && /^#{2,4} /.test(line)) heading = line.replace(/^#+ /, '');
    if (isRow) {
      if (!block) out.push((block = { heading, line: i + 1, rows: [] }));
      block.rows.push(line);
    } else block = null;
  }
  return out;
}

const afterTables = new Set(tables(after).map((t) => t.rows.join('\n')));
const moved = tables(before).filter((t) => !afterTables.has(t.rows.join('\n')));

// Tailwind 유틸리티 → 그 안의 토큰 이름(있으면). 토큰이 페이지에 있으면 되풀이로 본다.
const TW = /^(?:[a-z-]+:)*(bg|text|border(?:-[trblxy])?|rounded(?:-[trbl]{1,2})?|shadow|ring(?:-offset)?|outline|fill|stroke|divide|p[trblxy]?|m[trblxy]?|h|w|size|min-h|min-w|max-h|max-w|gap(?:-[xy])?|space-[xy]|inset|top|bottom|left|right|z|font|leading|tracking|opacity|duration|ease|delay)-(.+)$/;

function tokenOf(utility) {
  const m = utility.match(TW);
  if (!m) return null;
  let v = m[2].replace(/^\[|\]$/g, '').replace(/^var\(--/, '').replace(/\)$/, '');
  if (m[1].startsWith('rounded')) v = v.startsWith('radius-') ? v : `radius-${v}`;
  return v;
}

const norm = (s) => s.replace(/var\(--([a-z0-9-]+)\)/g, '$1').replace(/^--/, '').trim();

function atoms(row) {
  const cells = row.split('|').slice(1, -1).slice(1); // 첫 칸은 항목 이름
  const out = [];
  for (const c of cells) {
    for (const m of c.matchAll(/`([^`]+)`/g)) out.push({ text: m[1], kind: 'code' });
    const plain = c.replace(/`[^`]*`/g, ' ');
    for (const m of plain.matchAll(/-?\d+(?:\.\d+)?(?:px|%|ms|rem|em|vh|vw|s)\b/g)) out.push({ text: m[0], kind: 'value' });
    for (const m of plain.matchAll(/#[0-9A-Fa-f]{6}\b/g)) out.push({ text: m[0], kind: 'value' });
  }
  return out;
}

const hay = page.toLowerCase();
const has = (s) => hay.includes(s.toLowerCase());

let missing = 0;
let notes = 0;
for (const t of moved) {
  const lost = [];
  const hints = [];
  for (const row of t.rows.slice(2)) {
    const label = row.split('|')[1]?.trim();
    for (const a of atoms(row)) {
      const text = norm(a.text);
      if (has(text) || has(a.text)) continue;
      // 코드 안의 여러 조각(`py-2 px-3`, `a / b`)은 조각마다 본다.
      const parts = text.split(/\s+|\s*\/\s*|\s*·\s*/).filter(Boolean);
      const unresolved = parts.filter((p) => !has(norm(p)) && !(tokenOf(p) && has(tokenOf(p))));
      if (unresolved.length === 0) continue;
      const design = unresolved.filter((p) => !TW.test(p) || /\d+(px|%|ms)|#[0-9a-f]{6}/i.test(p));
      if (a.kind === 'value' || design.length) lost.push(`${label}: ${a.text}`);
      else hints.push(`${label}: ${a.text}`);
    }
  }
  if (lost.length || hints.length) {
    console.log(`\n# ${t.heading} (기준 md ${t.line}행, ${t.rows.length - 2}줄)`);
    for (const l of lost) console.log(`  빠짐  ${l}`);
    for (const h of hints) console.log(`  참고  ${h}`);
  }
  missing += lost.length;
  notes += hints.length;
}

console.log(`\n${name}: 옮긴 표 ${moved.length}개 · 빠짐 ${missing} · 참고 ${notes}`);
process.exit(missing ? 1 : 0);
