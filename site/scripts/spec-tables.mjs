// 컴포넌트 수치 원본(specs/components/<이름>.yaml)으로 마크다운 표를 그린다.
//
// 스펙 md 의 `[표: 제목](<이름>.yaml#<구역>)` 한 줄이 표 하나로 바뀐다. GitHub 에서는 그 줄이
// YAML 로 가는 링크로 보인다. 원본에 없는 토큰·변형·구역을 가리키면 빌드를 멈춘다 —
// 조용히 빈 칸을 내보내면 그게 곧 어긋남이 된다.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

export const PLACEHOLDER = /^\[표: ([^\]]+)\]\(([a-z0-9-]+)\.yaml#([a-zA-Z.]+)\)\s*$/;

const STATE_LABEL = {
  enabled: '기본',
  hovered: '마우스 올림',
  focused: '키보드 포커스',
  pressed: '누름',
  disabled: '비활성',
};

// 표 머리글. `부위.속성` 이 먼저, 없으면 속성 이름으로 찾는다.
const PROP_LABEL = {
  'label.typography': '글자',
  'label.fontFamily': '글꼴',
  'label.fontWeight': '굵기',
  'label.lineHeight': '줄 높이',
  'label.textDecoration': '밑줄',
  'icon.size': '아이콘',
  'focusRing.width': '링 두께',
  'focusRing.offset': '링 간격',
  'focusRing.color': '링 색',
  background: '배경',
  foreground: '글자·아이콘',
  borderColor: '테두리',
  borderWidth: '테두리 두께',
  shadow: '그림자',
  brightness: '밝기',
  scale: '배율',
  opacity: '불투명도',
  cursor: '커서',
  height: '높이',
  width: '너비',
  paddingY: '상하 여백',
  paddingX: '좌우 여백',
  radius: '모서리',
  gap: '간격',
  transitionProperty: '전환 대상',
  transitionDuration: '전환 시간',
  transitionEasing: '전환 곡선',
};

const DARK_SUFFIX = 'Dark';

// ── 토큰 ────────────────────────────────────────────────────────

// 레포의 내보내기 스크립트가 만든 CSS 변수를 읽는다 — 토큰 원본은 DESIGN*.md 다.
export function loadTokens(repo) {
  const read = (file) => {
    const css = execFileSync(
      process.execPath,
      [join(repo, 'scripts/build-tailwind-v4.mjs'), '--source', join(repo, file)],
      { encoding: 'utf8' },
    );
    const vars = new Map();
    for (const m of css.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) if (!vars.has(m[1])) vars.set(m[1], m[2].trim());
    return vars;
  };
  return { shared: read('DESIGN.md'), hr: read('DESIGN.hr.md'), desk: read('DESIGN.desk.md') };
}

const hex = (v) => (/^#[0-9a-f]{3,8}$/i.test(v) ? v.toUpperCase() : v);

class SpecError extends Error {}

function parseRef(value) {
  const m = String(value).match(/^\$([a-z0-9-]+)(?:\s*\/\s*(\d+%))?$/);
  return m ? { name: m[1], alpha: m[2] } : null;
}

// 토큰 하나를 "`이름` 값" 으로. 브랜드마다 다르면 둘 다, 다크 짝이 있으면 같이 적는다.
// 그림자는 값이 길어 이름만 둔다 — 값은 기초 › Elevation & Depth 에 있다.
function formatToken(tokens, { name, alpha }, { withDark }) {
  const { shared, hr, desk } = tokens;
  const tag = `\`${name}\``;
  const short = (v) => (v && !name.startsWith('shadow-') && v.length <= 36 ? hex(v) : null);
  const mix = (v) => (v && alpha ? `${v} × ${alpha}` : v);
  if (shared.has(name)) {
    if (name.startsWith('text-')) {
      const lh = shared.get(`${name}--line-height`);
      return `${tag} ${shared.get(name)}${lh ? ` / ${lh}` : ''}`;
    }
    const light = mix(short(shared.get(name)));
    const dark = withDark ? mix(short(shared.get(`${name}-dark`))) : null;
    return [tag, light ?? (alpha && `× ${alpha}`), dark && `· 다크 ${dark}`].filter(Boolean).join(' ');
  }
  if (hr.has(name) || desk.has(name)) {
    const h = mix(short(hr.get(name)));
    const d = mix(short(desk.get(name)));
    return h === d ? `${tag} ${h}` : `${tag} HR ${h} · Desk ${d}`;
  }
  throw new SpecError(`없는 토큰 $${name}`);
}

function formatValue(tokens, value, { withDark = true } = {}) {
  const ref = parseRef(value);
  if (ref) return formatToken(tokens, ref, { withDark });
  if (String(value).includes('$')) throw new SpecError(`토큰은 값 하나로만 쓴다: ${value}`);
  return `\`${value}\``;
}

// 속성 값 + (있으면) 다크 값을 한 칸에.
function formatCell(tokens, props, key) {
  if (!(key in props)) return '—';
  const darkKey = key + DARK_SUFFIX;
  if (darkKey in props) {
    return `${formatValue(tokens, props[key], { withDark: false })} · 다크 ${formatValue(tokens, props[darkKey], { withDark: false })}`;
  }
  return formatValue(tokens, props[key]);
}

// ── 스펙 해석 ───────────────────────────────────────────────────

function validate(spec) {
  const axes = spec.variants ?? {};
  for (const [axis, v] of Object.entries(spec.defaults ?? {})) {
    if (!axes[axis]?.includes(v)) throw new SpecError(`defaults.${axis} 에 없는 값 ${v}`);
  }
  for (const rule of spec.rules ?? []) {
    for (const [axis, v] of Object.entries(rule.when ?? {})) {
      if (!axes[axis]) throw new SpecError(`없는 변형 축 ${axis}`);
      if (!axes[axis].includes(v)) throw new SpecError(`${axis} 에 없는 값 ${v}`);
    }
    for (const key of Object.keys(rule)) {
      if (key === 'when') continue;
      if (!spec.states.includes(key)) throw new SpecError(`없는 상태 ${key}`);
      for (const slot of Object.keys(rule[key])) if (!spec.slots[slot]) throw new SpecError(`없는 부위 ${slot}`);
    }
  }
}

const whenKeys = (rule) => Object.keys(rule.when ?? {});

// "부위.속성" → 값. 다크 값(…Dark)은 같은 칸에 싣기 위해 따로 셈하지 않는다.
function flatten(slots) {
  const out = {};
  for (const [slot, props] of Object.entries(slots ?? {})) {
    for (const [prop, value] of Object.entries(props)) out[`${slot}.${prop}`] = value;
  }
  return out;
}

const isDarkKey = (key) => key.endsWith(DARK_SUFFIX);

function label(key) {
  const prop = key.slice(key.indexOf('.') + 1).replace(new RegExp(`${DARK_SUFFIX}$`), '');
  const slot = key.slice(0, key.indexOf('.'));
  return PROP_LABEL[`${slot}.${prop}`] ?? PROP_LABEL[prop] ?? key;
}

// 칸 순서: 부위는 YAML slots 순서, 부위 안에서는 PROP_LABEL 순서(높이 → 너비 → 여백 → 모서리 …).
const PROP_ORDER = Object.keys(PROP_LABEL);

function columnsOf(rows, spec) {
  const cols = [];
  for (const row of rows) for (const key of Object.keys(row)) if (!isDarkKey(key) && !cols.includes(key)) cols.push(key);
  const slots = Object.keys(spec.slots);
  const rank = (key) => {
    const [slot, prop] = key.split('.');
    const exact = PROP_ORDER.indexOf(key);
    return [slots.indexOf(slot), exact !== -1 ? exact : PROP_ORDER.indexOf(prop)];
  };
  return cols.sort((a, b) => {
    const [sa, pa] = rank(a);
    const [sb, pb] = rank(b);
    return sa - sb || pa - pb;
  });
}

function table(head, rows) {
  const line = (cells) => `| ${cells.join(' | ')} |`;
  return [line(head), line(head.map(() => '---')), ...rows.map(line)].join('\n');
}

const px = (tokens, value) => {
  const ref = parseRef(value);
  const raw = ref ? tokens.shared.get(ref.name) : String(value);
  const m = raw?.match(/^(\d+(?:\.\d+)?)px$/);
  return m ? Number(m[1]) : null;
};

// WCAG 2.5.8(AA) 24 · 2.5.5(AAA) 44 — 짧은 변 기준.
function touch(tokens, row) {
  const h = px(tokens, row['root.height']);
  if (h === null) return '—';
  const w = row['root.width'] !== undefined ? px(tokens, row['root.width']) : h;
  const side = Math.min(h, w ?? h);
  return `${side >= 24 ? '✓' : '✗'} · ${side >= 44 ? '✓' : '⚠'}`;
}

// ── 구역 ────────────────────────────────────────────────────────

// 변형 축 하나(variant · size …)의 값마다 한 줄. 그 축만 조건으로 건 규칙의 기본 상태 값.
function axisTable(spec, tokens, axis) {
  const values = spec.variants[axis];
  if (!values) throw new SpecError(`없는 변형 축 ${axis}`);
  const rows = values.map((v) => {
    const merged = {};
    for (const rule of spec.rules) {
      const keys = whenKeys(rule);
      if (keys.length === 1 && keys[0] === axis && rule.when[axis] === v) Object.assign(merged, flatten(rule.enabled));
    }
    return merged;
  });
  const cols = columnsOf(rows, spec);
  const withTouch = cols.includes('root.height');
  return table(
    [axis, ...cols.map(label), ...(withTouch ? ['터치 (AA · AAA)'] : [])],
    rows.map((row, i) => [
      `\`${values[i]}\`${values[i] === spec.defaults?.[axis] ? ' (기본)' : ''}`,
      ...cols.map((c) => formatCell(tokens, row, c)),
      ...(withTouch ? [touch(tokens, row)] : []),
    ]),
  );
}

// 조건 없는 규칙 — 모든 조합에 적용되는 값.
function baseTable(spec, tokens) {
  const rows = [];
  for (const rule of spec.rules.filter((r) => whenKeys(r).length === 0)) {
    for (const state of spec.states) {
      const flat = flatten(rule[state]);
      for (const key of Object.keys(flat).filter((k) => !isDarkKey(k))) {
        rows.push([STATE_LABEL[state] ?? state, label(key), formatCell(tokens, flat, key)]);
      }
    }
  }
  return table(['상태', '속성', '값'], rows);
}

// 축 값마다, 기본 상태에서 바뀌는 값을 상태별로.
function stateDeltaTable(spec, tokens, axis) {
  const values = spec.variants[axis];
  if (!values) throw new SpecError(`없는 변형 축 ${axis}`);
  const states = spec.states.filter((s) => s !== 'enabled');
  const cells = values.map((v) =>
    states.map((state) => {
      const merged = {};
      for (const rule of spec.rules) {
        const keys = whenKeys(rule);
        if (keys.length === 1 && keys[0] === axis && rule.when[axis] === v) Object.assign(merged, flatten(rule[state]));
      }
      const keys = Object.keys(merged).filter((k) => !isDarkKey(k));
      return keys.length ? keys.map((k) => `${label(k)} ${formatCell(tokens, merged, k)}`).join(' · ') : '—';
    }),
  );
  const used = states.filter((_, i) => cells.some((row) => row[i] !== '—'));
  return table(
    [axis, ...used.map((s) => STATE_LABEL[s] ?? s)],
    values.map((v, r) => [`\`${v}\``, ...used.map((s) => cells[r][states.indexOf(s)])]),
  );
}

// 한 조합의 상태 매트릭스 — 공통 규칙 + 그 조합에 걸리는 규칙을 상태마다 누적한다.
function stateMatrix(spec, tokens, combo) {
  const applies = (rule) => whenKeys(rule).every((k) => combo[k] === rule.when[k]);
  const rules = spec.rules.filter(applies);
  const base = {};
  for (const rule of rules) Object.assign(base, flatten(rule.enabled));
  const rows = spec.states.map((state) => {
    if (state === 'enabled') return { ...base };
    const row = { ...base };
    for (const rule of rules) Object.assign(row, flatten(rule[state]));
    return row;
  });
  // 한 번이라도 바뀌는 속성만 — 모든 상태에서 같은 값(크기 등)은 다른 표에 있다.
  const changing = columnsOf(rows, spec).filter((c) => rows.some((r) => r[c] !== rows[0][c]));
  return table(
    ['상태', ...changing.map(label)],
    rows.map((row, i) => [STATE_LABEL[spec.states[i]] ?? spec.states[i], ...changing.map((c) => formatCell(tokens, row, c))]),
  );
}

// 두 축 이상을 함께 건 규칙.
function compoundTable(spec, tokens) {
  const rows = [];
  for (const rule of spec.rules.filter((r) => whenKeys(r).length > 1)) {
    const combo = Object.entries(rule.when).map(([k, v]) => `${k}=\`${v}\``).join(' + ');
    for (const state of spec.states) {
      const flat = flatten(rule[state]);
      for (const key of Object.keys(flat).filter((k) => !isDarkKey(k))) {
        rows.push([combo, STATE_LABEL[state] ?? state, label(key), formatCell(tokens, flat, key)]);
      }
    }
  }
  return table(['조합', '상태', '속성', '값'], rows);
}

// 구역 이름 → 표.
//   base              조건 없는 공통 값
//   <축>              축 값마다 기본 상태 값          예: variant, size
//   states.<축>       축 값마다 상태별로 바뀌는 값     예: states.variant
//   matrix.<축>.<값>  그 값(나머지 축은 기본값)의 상태 매트릭스   예: matrix.variant.default
//   compound          두 축 이상을 건 규칙
export function renderSection(spec, tokens, section) {
  const [head, ...rest] = section.split('.');
  if (head === 'base') return baseTable(spec, tokens);
  if (head === 'compound') return compoundTable(spec, tokens);
  if (head === 'states' && rest.length === 1) return stateDeltaTable(spec, tokens, rest[0]);
  if (head === 'matrix' && rest.length === 2) {
    const [axis, value] = rest;
    if (!spec.variants[axis]?.includes(value)) throw new SpecError(`${axis} 에 없는 값 ${value}`);
    return stateMatrix(spec, tokens, { ...spec.defaults, [axis]: value });
  }
  if (rest.length === 0 && spec.variants[head]) return axisTable(spec, tokens, head);
  throw new SpecError(`없는 구역 #${section}`);
}

export function loadSpec(file) {
  const spec = parseYaml(readFileSync(file, 'utf8'));
  for (const key of ['name', 'slots', 'variants', 'states', 'rules']) {
    if (!spec?.[key]) throw new SpecError(`${key} 가 없다`);
  }
  validate(spec);
  return spec;
}

// 스펙 md 본문의 표 자리 줄을 표로 바꾼다. 실패하면 파일·줄을 붙여 던진다.
export function fillSpecTables(body, { specDir, tokens, source }) {
  const cache = new Map();
  return body
    .split('\n')
    .map((line, i) => {
      const m = line.match(PLACEHOLDER);
      if (!m) return line;
      const [, , name, section] = m;
      const file = join(specDir, `${name}.yaml`);
      try {
        if (!cache.has(file)) cache.set(file, loadSpec(file));
        return renderSection(cache.get(file), tokens, section);
      } catch (e) {
        if (e instanceof SpecError || e.code === 'ENOENT') {
          throw new Error(`${source}:${i + 1} ${name}.yaml#${section} — ${e.message}`);
        }
        throw e;
      }
    })
    .join('\n');
}
