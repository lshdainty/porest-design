// 기초 페이지가 쓰는 토큰 값 — 빌드 때 레포 루트의 DESIGN*.md 를 직접 읽는다.
// 페이지(.mdx)에 숫자를 손으로 적지 않는다: 값이 두 군데 생기면 한쪽이 낡는다.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

const REPO = join(process.cwd(), '..');
export type Brand = 'shared' | 'hr' | 'desk';
const FILE: Record<Brand, string> = { shared: 'DESIGN.md', hr: 'DESIGN.hr.md', desk: 'DESIGN.desk.md' };

type TypeStyle = { fontFamily?: string; fontSize: string; fontWeight?: number | string; lineHeight?: string; letterSpacing?: string };
type Front = {
  colors: Record<string, string>;
  typography: Record<string, TypeStyle>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
};

const cache = new Map<Brand, { front: Front; body: string; text: string }>();

export function design(brand: Brand = 'shared') {
  const hit = cache.get(brand);
  if (hit) return hit;
  const text = readFileSync(join(REPO, FILE[brand]), 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${FILE[brand]} 에 front matter 가 없다`);
  const front = parseYaml(m[1]) as Front;
  const out = { front, body: m[2], text };
  cache.set(brand, out);
  return out;
}

// `| \`name\` | \`value\` | 설명 |` 꼴의 prose 토큰 표(중단점 · 레이아웃 …)
export function proseTokens(prefix: string, brand: Brand = 'shared') {
  const re = new RegExp('^\\|\\s*`(' + prefix + '[a-z0-9-]+)`\\s*\\|\\s*`([^`]+)`\\s*\\|\\s*([^|\\n]*)\\|', 'gm');
  const out: { name: string; value: string; note: string }[] = [];
  for (const m of design(brand).text.matchAll(re)) out.push({ name: m[1], value: m[2], note: m[3].trim() });
  return out;
}

export const px = (v: string) => Number(String(v).replace('px', ''));

export function spacingScale() {
  const all = design().front.spacing;
  const scale = Object.entries(all).filter(([k]) => /^x\d/.test(k)).map(([k, v]) => ({ name: k, value: v }));
  const alias = Object.entries(all).filter(([k]) => /^(xs|sm|md|lg|xl|2xl|3xl)$/.test(k)).map(([k, v]) => ({ name: k, value: v }));
  const roles = Object.entries(all).filter(([k]) => !/^x\d/.test(k) && !/^(xs|sm|md|lg|xl|2xl|3xl)$/.test(k)).map(([k, v]) => ({ name: k, value: v }));
  const byValue = (v: string) => scale.find((s) => s.value === v)?.name;
  return { scale, alias, roles, byValue };
}

export function radiusScale() {
  const all = design().front.rounded;
  const scale = Object.entries(all).filter(([k]) => /^r\d|^full$/.test(k)).map(([k, v]) => ({ name: k, value: v }));
  const alias = Object.entries(all).filter(([k]) => !/^r\d|^full$/.test(k)).map(([k, v]) => ({ name: k, value: v }));
  return { scale, alias };
}

export function typeScale() {
  const all = design().front.typography;
  const scale = Object.entries(all).filter(([k]) => /^t\d+$/.test(k)).map(([k, v]) => ({ name: k, ...v }));
  const semantic = Object.entries(all).filter(([k]) => ['screen-title', 'article-body', 'article-note'].includes(k)).map(([k, v]) => ({ name: k, ...v }));
  const legacy = Object.entries(all).filter(([k]) => !/^t\d+$/.test(k) && !['screen-title', 'article-body', 'article-note'].includes(k)).map(([k, v]) => ({ name: k, ...v }));
  return { scale, semantic, legacy };
}

// 역할 색 — 라이트 값과 `-dark` 짝을 한 줄로
export type RoleColor = { name: string; light: string; dark?: string };
export function roleColors(brand: Brand = 'shared') {
  const c = design(brand).front.colors;
  const rows: RoleColor[] = [];
  for (const [name, light] of Object.entries(c)) {
    if (!/^(fg|bg|stroke|static)-/.test(name) || name.endsWith('-dark')) continue;
    rows.push({ name, light, dark: c[`${name}-dark`] });
  }
  return rows;
}
export const BRAND_ROLES = ['fg-brand', 'fg-brand-contrast', 'bg-brand-solid', 'bg-brand-solid-pressed', 'bg-brand-weak', 'bg-brand-weak-pressed', 'stroke-focus-ring', 'stroke-brand-solid', 'stroke-brand-weak'];

export function color(name: string, brand: Brand = 'desk') {
  const v = design(brand).front.colors[name] ?? design('shared').front.colors[name];
  if (!v) throw new Error(`색 토큰 ${name} 이 ${FILE[brand]} 에 없다`);
  return v;
}

// DESIGN.md v102 표의 "옛 이름 · Desk 웹 이름" 칸
export function roleAliases() {
  const out = new Map<string, { old: string; desk: string }>();
  const re = /^\|\s*`((?:fg|bg|stroke|static)-[a-z0-9-]+)`\s*\|\s*`#[0-9A-Fa-f]{6}`\s*\|[^|]*\|\s*([^|]*)\|\s*([^|]*)\|/gm;
  for (const m of design('desk').text.matchAll(re)) out.set(m[1], { old: m[2].trim(), desk: m[3].trim() });
  return out;
}

// DESIGN.md 의 제목(## ~ #####) 절 안의 표들 — 그대로 그려 보여 줄 때(숫자를 옮겨 적지 않으려고).
// 절은 같거나 높은 단계의 다음 제목에서 끝난다.
export function sectionTables(headingStartsWith: string, brand: Brand = 'shared') {
  const lines = design(brand).body.split('\n');
  const start = lines.findIndex((l) => /^#{2,5} /.test(l) && l.replace(/^#{2,5} /, '').startsWith(headingStartsWith));
  if (start === -1) throw new Error(`DESIGN.md 에 "${headingStartsWith}" 제목이 없다`);
  const level = lines[start].match(/^#+/)![0].length;
  const tables: { head: string[]; rows: string[][] }[] = [];
  let cur: string[][] | null = null;
  for (let i = start + 1; i < lines.length; i++) {
    const h = lines[i].match(/^(#{2,6}) /);
    if (h && h[1].length <= level) break;
    if (lines[i].startsWith('|')) {
      const cells = lines[i].replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
      if (cells.every((c) => /^:?-{3,}:?$/.test(c))) continue;
      (cur ??= []).push(cells);
    } else if (cur) {
      tables.push({ head: cur[0], rows: cur.slice(1) });
      cur = null;
    }
  }
  if (cur) tables.push({ head: cur[0], rows: cur.slice(1) });
  return tables;
}
export function sectionTable(headingStartsWith: string, n = 0, brand: Brand = 'shared') {
  const t = sectionTables(headingStartsWith, brand)[n];
  if (!t) throw new Error(`"${headingStartsWith}" 절에 ${n + 1}번째 표가 없다`);
  return t;
}

// WCAG 2 대비 — 페이지의 견본 옆 숫자
function lum(hex: string) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
