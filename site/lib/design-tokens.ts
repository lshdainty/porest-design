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

// 절 안의 첫 코드 블록 — 공식 · 키프레임 CSS 를 옮겨 적지 않으려고
export function sectionCode(headingStartsWith: string, brand: Brand = 'shared') {
  const lines = design(brand).body.split('\n');
  const start = lines.findIndex((l) => /^#{2,5} /.test(l) && l.replace(/^#{2,5} /, '').startsWith(headingStartsWith));
  if (start === -1) throw new Error(`DESIGN.md 에 "${headingStartsWith}" 제목이 없다`);
  const level = lines[start].match(/^#+/)![0].length;
  let body: string[] | null = null;
  for (let i = start + 1; i < lines.length; i++) {
    if (body === null && /^(#{2,6}) /.test(lines[i]) && lines[i].match(/^#+/)![0].length <= level) break;
    if (/^\s*```/.test(lines[i])) {
      if (body) return body.join('\n');
      body = [];
    } else if (body) body.push(lines[i]);
  }
  throw new Error(`"${headingStartsWith}" 절에 코드 블록이 없다`);
}

// prose 토큰 하나 — 내보내기(build-tailwind-v4)처럼 뒤에 나온 정의가 이긴다
export function proseValue(name: string, brand: Brand = 'shared') {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const all = [...design(brand).text.matchAll(new RegExp('^\\|\\s*`' + esc + '`\\s*\\|\\s*`([^`]+)`', 'gm'))];
  if (!all.length) throw new Error(`prose 토큰 ${name} 이 ${FILE[brand]} 에 없다`);
  return all[all.length - 1][1];
}
export const ms = (v: string) => parseFloat(v);

// 이름이 같은 정의가 여러 번 나오면(옛 표 · 새 표) 뒤의 것 하나만
export function proseTokenSet(prefix: string, keep: RegExp) {
  const out = new Map<string, { name: string; value: string; note: string }>();
  for (const t of proseTokens(prefix)) if (keep.test(t.name)) out.set(t.name, { ...t, value: proseValue(t.name) });
  return [...out.values()];
}

// 눌림 축소 상수(DESIGN.md "눌림 피드백" 표) — 기준 길이 = max(높이, 폭 ÷ n, 최소)
export function pressScale() {
  const { rows } = sectionTable('눌림 피드백');
  const cell = (k: string) => {
    const r = rows.find((x) => x[0] === k);
    if (!r) throw new Error(`"눌림 피드백" 표에 ${k} 줄이 없다`);
    return r[1];
  };
  const distance = parseFloat(cell('축소량'));
  const widthDivisor = Number(cell('폭 보정').match(/÷\s*(\d+)/)?.[1]);
  const minBasis = parseFloat(cell('최소 기준 길이'));
  if (![distance, widthDivisor, minBasis].every(Number.isFinite)) throw new Error('"눌림 피드백" 표의 값을 읽지 못했다');
  const basis = (w: number, h: number) => Math.max(h, w / widthDivisor, minBasis);
  const ratio = (w: number, h: number) => (basis(w, h) - distance) / basis(w, h);
  return { distance, widthDivisor, minBasis, basis, ratio };
}

// 모션 줄이기 모드 표 — 큰 전환의 기준(200ms 초과)과 바꿔 쓰는 시간(150ms)
export function reducedMotion() {
  const { rows } = sectionTable('모션 줄이기 모드');
  const macro = rows.find((r) => r[0].startsWith('매크로 모션'));
  const over = Number(macro?.[0].match(/(\d+)ms/)?.[1]);
  const fade = Number(macro?.[2].match(/(\d+)ms/)?.[1]);
  if (!Number.isFinite(over) || !Number.isFinite(fade)) throw new Error('"모션 줄이기 모드" 표의 매크로 모션 줄을 읽지 못했다');
  return { over, fade };
}

// 컴포넌트 YAML 의 크기 규칙(when: { size }) — 그림 속 예시를 실제 컴포넌트 크기로 그리려고
export function specSize(component: string, size: string, state = 'enabled') {
  const doc = parseYaml(readFileSync(join(REPO, 'specs/components', `${component}.yaml`), 'utf8')) as {
    rules: { when?: Record<string, string>; [state: string]: unknown }[];
  };
  const rule = doc.rules.find((r) => r.when?.size === size && Object.keys(r.when).length === 1);
  const root = (rule?.[state] as { root?: Record<string, unknown> } | undefined)?.root;
  if (!root) throw new Error(`${component}.yaml 에 size ${size} 규칙이 없다`);
  const num = (v: unknown) => (typeof v === 'string' && /^\d+(\.\d+)?px$/.test(v) ? parseFloat(v) : undefined);
  const h = num(root.height) ?? num(root.size);
  const w = num(root.width) ?? num(root.size);
  if (h === undefined) throw new Error(`${component}.yaml size ${size} 에 높이가 없다`);
  return { width: w, height: h };
}

// 컴포넌트 YAML 의 공통 규칙(when: {})에서 한 조각(예: switch 의 track)
export function specSlot(component: string, slot: string, state = 'enabled') {
  const doc = parseYaml(readFileSync(join(REPO, 'specs/components', `${component}.yaml`), 'utf8')) as {
    rules: { when?: Record<string, string>; [state: string]: unknown }[];
  };
  const rule = doc.rules.find((r) => !r.when || Object.keys(r.when).length === 0);
  const v = (rule?.[state] as Record<string, Record<string, unknown>> | undefined)?.[slot];
  if (!v) throw new Error(`${component}.yaml 공통 규칙에 ${state}.${slot} 이 없다`);
  return v;
}

// 컴포넌트 YAML 의 눌림 배율(지금 값) — "고정 배율" 예를 실제 값으로 들려고
export function specPressedScale(component: string) {
  const doc = parseYaml(readFileSync(join(REPO, 'specs/components', `${component}.yaml`), 'utf8')) as {
    rules: { pressed?: { root?: { scale?: number | string } } }[];
  };
  const v = doc.rules.map((r) => r.pressed?.root?.scale).find((s) => s !== undefined);
  if (v === undefined) throw new Error(`${component}.yaml 에 pressed scale 이 없다`);
  return Number(v);
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
