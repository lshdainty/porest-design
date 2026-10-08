// 컴포넌트 YAML(specs/components/<이름>.yaml)을 한 조합 · 한 상태의 값으로 푼다 — 컴포넌트 페이지의 그림이
// 표와 같은 원본에서 그려지게. 겹치는 방식은 표(scripts/spec-tables.mjs)와 같다: 기본 상태를 모든 규칙에서
// 먼저 겹치고, 그다음 그 상태를 모든 규칙에서 겹친다. 뒤에 나온 규칙이 앞의 같은 값을 덮는다.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { design, proseValue, type Brand } from './design-tokens';

const REPO = join(process.cwd(), '..');

type Rule = { when?: Record<string, string>; [state: string]: unknown };
export type ComponentSpec = {
  name: string;
  slots: Record<string, string>;
  variants: Record<string, string[] | Record<string, string>>;
  defaults?: Record<string, string>;
  states: string[] | Record<string, string>;
  rules: Rule[];
};

const cache = new Map<string, ComponentSpec>();
export function loadComponentSpec(name: string): ComponentSpec {
  const hit = cache.get(name);
  if (hit) return hit;
  const spec = parseYaml(readFileSync(join(REPO, 'specs/components', `${name}.yaml`), 'utf8')) as ComponentSpec;
  cache.set(name, spec);
  return spec;
}

const namesOf = (def: string[] | Record<string, string> | undefined) => (Array.isArray(def) ? def : Object.keys(def ?? {}));
export const stateNames = (spec: ComponentSpec) => namesOf(spec.states);
export const axisValues = (spec: ComponentSpec, axis: string) => namesOf(spec.variants[axis]);
export const axisDesc = (spec: ComponentSpec, axis: string, value: string) => {
  const def = spec.variants[axis];
  return Array.isArray(def) ? undefined : def?.[value];
};

// { root: { height: '32px' } } → { 'root.height': '32px' }
function flatten(block: unknown) {
  const out: Record<string, unknown> = {};
  if (!block || typeof block !== 'object') return out;
  for (const [slot, props] of Object.entries(block as Record<string, unknown>)) {
    if (!props || typeof props !== 'object') continue;
    for (const [prop, v] of Object.entries(props as Record<string, unknown>)) out[`${slot}.${prop}`] = v;
  }
  return out;
}

const applies = (combo: Record<string, string>) => (rule: Rule) => Object.entries(rule.when ?? {}).every(([k, v]) => combo[k] === v);

// 한 조합 · 한 상태의 값(부위.속성 → YAML 값). combo 에 없는 축은 defaults 로 채운다.
export function resolveState(spec: ComponentSpec, combo: Record<string, string>, state: string) {
  const full = { ...spec.defaults, ...combo };
  const base = stateNames(spec)[0];
  const rules = spec.rules.filter(applies(full));
  const out: Record<string, unknown> = {};
  for (const r of rules) Object.assign(out, flatten(r[base]));
  if (state !== base) for (const r of rules) Object.assign(out, flatten(r[state]));
  return out;
}

// ── 값 풀기 ──────────────────────────────────────────────────────

export type Mode = 'light' | 'dark';
type Boxed = { value: unknown; dark?: unknown; note?: string };
const isBoxed = (v: unknown): v is Boxed => !!v && typeof v === 'object' && 'value' in (v as object);

function hexAlpha(hex: string, pct: number) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${pct / 100})`;
}

// 색 — `$color-x`(라이트) · 다크는 `x-dark` 짝(없으면 라이트 그대로). `$color-x / 30%` 는 불투명도.
function colorOf(ref: string, mode: Mode, brand: Brand) {
  const m = /^\$color-([a-z0-9-]+)(?:\s*\/\s*(\d+)%)?$/.exec(ref);
  if (!m) return undefined;
  const c = design(brand).front.colors;
  const hex = (mode === 'dark' ? c[`${m[1]}-dark`] : undefined) ?? c[m[1]];
  if (!hex) throw new Error(`색 토큰 ${m[1]} 이 없다`);
  return m[2] ? hexAlpha(hex, Number(m[2])) : hex;
}

export type TypeValue = { fontSize: string; lineHeight?: string; fontWeight?: string | number; fontFamily?: string };

// YAML 값 하나를 CSS 로 쓸 수 있는 값으로. 글자 토큰은 TypeValue, 나머지는 문자열.
export function tokenValue(raw: unknown, mode: Mode = 'light', brand: Brand = 'desk'): string | TypeValue | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (isBoxed(raw)) return tokenValue(mode === 'dark' && raw.dark !== undefined ? raw.dark : raw.value, mode, brand);
  const v = String(raw).trim();
  if (!v.startsWith('$')) return v;
  const color = colorOf(v, mode, brand);
  if (color) return color;
  const [, group, key] = /^\$(spacing|radius|text|font|motion|gradient)-(.+)$/.exec(v) ?? [];
  const front = design().front;
  if (group === 'spacing' && front.spacing[key]) return front.spacing[key];
  if (group === 'radius') return key === 'full' ? '9999px' : front.rounded[key];
  // 글자 — `$text-t1-static` 은 같은 글자 토큰의 고정 px 판(내보낼 때 생긴다 — DESIGN.md Typography v104). 값은 같다
  const textKey = group === 'text' ? key.replace(/-static$/, '') : key;
  if (group === 'text' && front.typography[textKey]) {
    const t = front.typography[textKey];
    return { fontSize: t.fontSize, lineHeight: t.lineHeight, fontWeight: t.fontWeight, fontFamily: t.fontFamily };
  }
  if (group === 'font' && key === 'sans') return front.typography.t4?.fontFamily ?? 'Pretendard, sans-serif';
  if (group === 'motion') return proseValue(`motion-${key}`);
  // 그라디언트(v104) — 표 토큰. 다크 짝은 YAML 의 dark 로 따로 적는다(gradient-shimmer-neutral-dark)
  if (group === 'gradient') return proseValue(`gradient-${key}`);
  throw new Error(`풀 수 없는 토큰 ${v}`);
}

export const num = (v: unknown) => {
  const m = /^(-?\d+(?:\.\d+)?)px$/.exec(String(v ?? ''));
  return m ? Number(m[1]) : undefined;
};
