// 컴포넌트 수치 원본(specs/components/<이름>.yaml)으로 마크다운 표를 그린다.
//
// 스펙 md 의 `[표: 제목](<이름>.yaml#<구역>)` 한 줄이 표 하나로 바뀐다. GitHub 에서는 그 줄이
// YAML 로 가는 링크로 보인다. 원본에 없는 토큰·변형·상태·부위·구역을 가리키면 빌드를 멈춘다 —
// 조용히 빈 칸을 내보내면 그게 곧 어긋남이 된다.
//
// YAML 형식은 specs/components/button.yaml 머리 주석과 specs/CLAUDE.md 에 있다.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

export const PLACEHOLDER = /^\[표: ([^\]]+)\]\(([a-z0-9-]+)\.yaml#([a-zA-Z0-9.@-]+)\)\s*$/;

// 표 머리글. `부위.속성` 이 먼저, 없으면 속성 이름으로 찾고, 그것도 없으면 키를 그대로 쓴다.
// 순서가 곧 표의 칸 순서다(크기 → 여백 → 모양 → 색 → 글자 → 효과).
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
  height: '높이',
  minHeight: '최소 높이',
  maxHeight: '최대 높이',
  width: '너비',
  minWidth: '최소 너비',
  maxWidth: '최대 너비',
  size: '크기',
  iconSize: '아이콘 크기',
  padding: '여백',
  paddingY: '상하 여백',
  paddingX: '좌우 여백',
  paddingTop: '위 여백',
  paddingBottom: '아래 여백',
  paddingLeft: '왼쪽 여백',
  paddingRight: '오른쪽 여백',
  margin: '바깥 여백',
  marginTop: '위 바깥 여백',
  marginBottom: '아래 바깥 여백',
  marginY: '상하 바깥 여백',
  marginX: '좌우 바깥 여백',
  marginLeft: '왼쪽 바깥 여백',
  marginRight: '오른쪽 바깥 여백',
  gap: '간격',
  rowGap: '줄 간격',
  columnGap: '칸 간격',
  columns: '칸 수',
  radius: '모서리',
  background: '배경',
  foreground: '글자·아이콘',
  color: '색',
  borderColor: '테두리',
  borderWidth: '테두리 두께',
  borderStyle: '테두리 모양',
  borderBottomColor: '아래 테두리',
  borderBottomWidth: '아래 테두리 두께',
  outlineColor: '외곽선',
  outlineWidth: '외곽선 두께',
  shadow: '그림자',
  typography: '글자',
  fontSize: '글자 크기',
  fontWeight: '굵기',
  lineHeight: '줄 높이',
  letterSpacing: '자간',
  fontFamily: '글꼴',
  textDecoration: '밑줄',
  brightness: '밝기',
  scale: '배율',
  opacity: '불투명도',
  cursor: '커서',
  pointerEvents: '포인터 이벤트',
  zIndex: 'z-index',
  touchTarget: '터치 영역',
  rotate: '회전',
  marginBlock: '위아래 바깥 여백',
  aspectRatio: '비율',
  objectFit: '맞춤',
  textTransform: '대소문자',
  outlineOffset: '외곽선 간격',
  glyph: '글리프',
  transitionProperty: '전환 대상',
  transitionDuration: '전환 시간',
  transitionEasing: '전환 곡선',
};
const PROP_ORDER = Object.keys(PROP_LABEL);

class SpecError extends Error {}

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
    for (const m of css.matchAll(/--([a-z0-9_-]+):\s*([^;]+);/g)) if (!vars.has(m[1])) vars.set(m[1], m[2].trim());
    return vars;
  };
  return { shared: read('DESIGN.md'), hr: read('DESIGN.hr.md'), desk: read('DESIGN.desk.md') };
}

const hex = (v) => (/^#[0-9a-f]{3,8}$/i.test(v) ? v.toUpperCase() : v);

function parseRef(value) {
  const m = String(value).match(/^\$([a-z0-9_-]+)(?:\s*\/\s*(\d+%))?$/);
  return m ? { name: m[1], alpha: m[2] } : null;
}

function hasToken(tokens, name) {
  return tokens.shared.has(name) || tokens.hr.has(name) || tokens.desk.has(name);
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
      const parts = [shared.get(name), shared.get(`${name}--font-weight`), shared.get(`${name}--line-height`)];
      return `${tag} ${parts.filter(Boolean).join(' / ')}`;
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

function formatScalar(tokens, value, { withDark = true } = {}) {
  const ref = parseRef(value);
  if (ref) return formatToken(tokens, ref, { withDark });
  if (/\$[a-z]/.test(String(value))) throw new SpecError(`토큰은 값 하나로만 쓴다: ${value}`);
  return `\`${value}\``;
}

// ── 값 ──────────────────────────────────────────────────────────
// 속성 값은 스칼라이거나 { value, dark?, note? } 다.

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function unpack(pv) {
  return isObj(pv) ? { value: pv.value, dark: pv.dark, note: pv.note } : { value: pv };
}

// 값 칸의 글자와 비고를 따로 돌려준다 — 목록 표는 비고를 칸으로, 나머지는 칸 안에 붙인다.
function cell(tokens, pv) {
  if (pv === undefined) return { text: '—', note: undefined };
  const { value, dark, note } = unpack(pv);
  const text =
    dark === undefined
      ? formatScalar(tokens, value)
      : `${formatScalar(tokens, value, { withDark: false })} · 다크 ${formatScalar(tokens, dark, { withDark: false })}`;
  return { text, note };
}

function inline(tokens, pv) {
  const { text, note } = cell(tokens, pv);
  return note ? `${text} — ${note}` : text;
}

const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n+/g, ' ');

// ── 스펙 해석 ───────────────────────────────────────────────────

// 축·상태는 목록이거나 { 값: 설명 } 이다.
const namesOf = (def) => (Array.isArray(def) ? def : Object.keys(def ?? {}));
const descOf = (def, name) => (Array.isArray(def) ? undefined : def?.[name]);

const axisValues = (spec, axis) => namesOf(spec.variants[axis]);
const stateNames = (spec) => namesOf(spec.states);
// 기본 상태는 상태 목록의 첫째다(보통 enabled, 컴포넌트에 따라 default). 다른 상태는 여기서 바뀌는 값만 적는다.
const baseState = (spec) => stateNames(spec)[0];
const whenKeys = (rule) => Object.keys(rule.when ?? {});
const isBase = (rule) => whenKeys(rule).length === 0;

function walkValues(spec, fn) {
  for (const rule of spec.rules) {
    for (const state of stateNames(spec)) {
      for (const props of Object.values(rule[state] ?? {})) {
        for (const pv of Object.values(props)) {
          const { value, dark } = unpack(pv);
          fn(value);
          if (dark !== undefined) fn(dark);
        }
      }
    }
  }
  for (const m of Object.values(spec.motion ?? {})) for (const k of ['duration', 'easing']) if (m[k] !== undefined) fn(m[k]);
}

function validate(spec, tokens) {
  for (const key of ['name', 'slots', 'variants', 'states', 'rules']) {
    if (!spec?.[key]) throw new SpecError(`${key} 가 없다`);
  }
  const axes = spec.variants;
  for (const [axis, def] of Object.entries(axes)) {
    if (namesOf(def).length === 0) throw new SpecError(`변형 축 ${axis} 가 비었다`);
  }
  for (const [axis, v] of Object.entries(spec.defaults ?? {})) {
    if (!axes[axis] || !namesOf(axes[axis]).includes(v)) throw new SpecError(`defaults.${axis} 에 없는 값 ${v}`);
  }
  const states = stateNames(spec);
  for (const rule of spec.rules) {
    for (const [axis, v] of Object.entries(rule.when ?? {})) {
      if (!axes[axis]) throw new SpecError(`없는 변형 축 ${axis}`);
      if (!namesOf(axes[axis]).includes(v)) throw new SpecError(`${axis} 에 없는 값 ${v}`);
    }
    for (const key of Object.keys(rule)) {
      if (key === 'when') continue;
      if (!states.includes(key)) throw new SpecError(`없는 상태 ${key}`);
      for (const [slot, props] of Object.entries(rule[key])) {
        if (!(slot in spec.slots)) throw new SpecError(`없는 부위 ${slot}`);
        for (const [prop, pv] of Object.entries(props)) {
          if (isObj(pv) && !('value' in pv)) throw new SpecError(`${slot}.${prop} 에 value 가 없다`);
        }
      }
    }
  }
  // 표에 안 그려지는 규칙의 토큰도 미리 확인한다.
  walkValues(spec, (value) => {
    const ref = parseRef(value);
    if (ref && !hasToken(tokens, ref.name)) throw new SpecError(`없는 토큰 $${ref.name}`);
  });
}

// "부위.속성" → 값.
function flatten(slots) {
  const out = {};
  for (const [slot, props] of Object.entries(slots ?? {})) {
    for (const [prop, value] of Object.entries(props)) out[`${slot}.${prop}`] = value;
  }
  return out;
}

// root 부위는 속성 이름만, 나머지 부위는 `부위 속성` 으로 적는다(tabs 의 `list 높이`).
function label(spec, key) {
  const [slot, prop] = key.split('.');
  const exact = PROP_LABEL[key];
  if (exact) return exact;
  const name = PROP_LABEL[prop] ?? prop;
  return slot === 'root' ? name : `${slot} ${name}`;
}

// 칸 순서: 부위는 YAML slots 순서, 부위 안에서는 PROP_LABEL 순서, 모르는 속성은 뒤로.
function orderKeys(spec, keys) {
  const slots = Object.keys(spec.slots);
  const rank = (key) => {
    const [slot, prop] = key.split('.');
    const exact = PROP_ORDER.indexOf(key);
    const p = exact !== -1 ? exact : PROP_ORDER.indexOf(prop);
    return [slots.indexOf(slot), p === -1 ? PROP_ORDER.length : p];
  };
  return [...keys].sort((a, b) => {
    const [sa, pa] = rank(a);
    const [sb, pb] = rank(b);
    return sa - sb || pa - pb;
  });
}

// @부위 로 고른 부위의 키만.
const inSlot = (pick) => (key) => !pick || key.startsWith(`${pick}.`);

function unionKeys(rows) {
  const keys = [];
  for (const row of rows) for (const key of Object.keys(row)) if (!keys.includes(key)) keys.push(key);
  return keys;
}

function table(head, rows) {
  const line = (cells) => `| ${cells.map(esc).join(' | ')} |`;
  return [line(head), line(head.map(() => '---')), ...rows.map(line)].join('\n');
}

const code = (v) => `\`${v}\``;

function stateCell(spec, state) {
  const desc = descOf(spec.states, state);
  return desc ? `${code(state)} ${desc}` : code(state);
}

function valueCell(spec, axis, v) {
  return `${code(v)}${v === spec.defaults?.[axis] ? ' (기본)' : ''}`;
}

const px = (tokens, pv) => {
  const { value } = unpack(pv);
  const ref = parseRef(value);
  const raw = ref ? tokens.shared.get(ref.name) : String(value);
  const m = raw?.match(/^(\d+(?:\.\d+)?)px$/);
  return m ? Number(m[1]) : null;
};

// WCAG 2.5.8(AA) 24 · 2.5.5(AAA) 44 — 짧은 변 기준.
function touch(tokens, row, rootSlot) {
  const h = px(tokens, row[`${rootSlot}.height`]);
  if (h === null) return '—';
  const w = row[`${rootSlot}.width`] !== undefined ? px(tokens, row[`${rootSlot}.width`]) : h;
  const side = Math.min(h, w ?? h);
  return `${side >= 24 ? '✓' : '⚠'} · ${side >= 44 ? '✓' : '⚠'}`;
}

// combo 에 걸리는 규칙(when ⊆ combo).
const appliesTo = (combo) => (rule) => whenKeys(rule).every((k) => combo[k] === rule.when[k]);

// "a.b.c.d" → { a: b, c: d }
function pairs(parts, section) {
  if (parts.length % 2) throw new SpecError(`구역 #${section} — 축과 값을 짝으로 적는다`);
  const out = {};
  for (let i = 0; i < parts.length; i += 2) out[parts[i]] = parts[i + 1];
  return out;
}

function checkCombo(spec, combo) {
  for (const [axis, v] of Object.entries(combo)) {
    if (!spec.variants[axis]) throw new SpecError(`없는 변형 축 ${axis}`);
    if (!axisValues(spec, axis).includes(v)) throw new SpecError(`${axis} 에 없는 값 ${v}`);
  }
}

// ── 구역 ────────────────────────────────────────────────────────

// base[.<상태>] — 조건 없는 규칙(상태를 적으면 그 상태만). 부위·상태·비고 칸은 필요할 때만 둔다.
function baseTable(spec, tokens, only, pick) {
  const rows = [];
  for (const rule of spec.rules.filter(isBase)) {
    for (const state of only ? [only] : stateNames(spec)) {
      for (const [slot, props] of Object.entries(rule[state] ?? {})) {
        if (pick && slot !== pick) continue;
        for (const [prop, pv] of Object.entries(props)) rows.push({ slot, state, prop, ...cell(tokens, pv) });
      }
    }
  }
  if (rows.length === 0) throw new SpecError('조건 없는 규칙이 없다 — #base 를 쓸 수 없다');
  const multiSlot = new Set(rows.map((r) => r.slot)).size > 1;
  const multiState = new Set(rows.map((r) => r.state)).size > 1;
  const anyNote = rows.some((r) => r.note);
  return table(
    [...(multiSlot ? ['부위'] : []), ...(multiState ? ['상태'] : []), '속성', '값', ...(anyNote ? ['비고'] : [])],
    rows.map((r) => [
      ...(multiSlot ? [code(r.slot)] : []),
      ...(multiState ? [code(r.state)] : []),
      PROP_LABEL[`${r.slot}.${r.prop}`] ?? PROP_LABEL[r.prop] ?? r.prop,
      r.text,
      ...(anyNote ? [r.note ?? ''] : []),
    ]),
  );
}

// slots — 부위와 설명.
function slotsTable(spec) {
  return table(['부위', '설명'], Object.entries(spec.slots).map(([k, d]) => [code(k), d ?? '']));
}

// <축> — 축 값마다 한 줄. 그 축만 조건으로 건 규칙의 기본 상태 값.
function axisTable(spec, tokens, axis, pick) {
  const values = axisValues(spec, axis);
  const rows = values.map((v) => {
    const merged = {};
    for (const rule of spec.rules) {
      const keys = whenKeys(rule);
      if (keys.length === 1 && keys[0] === axis && rule.when[axis] === v) Object.assign(merged, flatten(rule[baseState(spec)]));
    }
    return merged;
  });
  const cols = orderKeys(spec, unionKeys(rows)).filter(inSlot(pick));
  const root = Object.keys(spec.slots)[0];
  const withTouch = cols.includes(`${root}.height`);
  const withDesc = values.some((v) => descOf(spec.variants[axis], v));
  return table(
    [axis, ...cols.map((c) => label(spec, c)), ...(withTouch ? ['터치 (AA · AAA)'] : []), ...(withDesc ? ['설명'] : [])],
    rows.map((row, i) => [
      valueCell(spec, axis, values[i]),
      ...cols.map((c) => inline(tokens, row[c])),
      ...(withTouch ? [touch(tokens, row, root)] : []),
      ...(withDesc ? [descOf(spec.variants[axis], values[i]) ?? ''] : []),
    ]),
  );
}

// grid.<축>[.<축>.<값>…] — 속성마다 한 줄, 축 값마다 한 칸. 뒤의 짝은 고정 조건.
// 그 조합에 걸리는 규칙 가운데 고정 조건의 축을 모두 적은 규칙만 합친다(조건 없는 규칙은 뺀다).
// 그래서 grid.variant 는 변형별 바탕 값, grid.variant.selected.active 는 선택됐을 때 바뀌는 값만 보인다.
function gridTable(spec, tokens, axis, fixed, pick) {
  const values = axisValues(spec, axis);
  const mentionsFixed = (rule) => Object.keys(fixed).every((k) => k in (rule.when ?? {}));
  const columns = values.map((v) => {
    const combo = { ...fixed, [axis]: v };
    const merged = {};
    for (const rule of spec.rules.filter((r) => !isBase(r) && appliesTo(combo)(r) && mentionsFixed(r))) {
      Object.assign(merged, flatten(rule[baseState(spec)]));
    }
    return merged;
  });
  const keys = orderKeys(spec, unionKeys(columns)).filter(inSlot(pick));
  return table(
    ['속성', ...values.map((v) => valueCell(spec, axis, v))],
    keys.map((k) => [label(spec, k), ...columns.map((col) => inline(tokens, col[k]))]),
  );
}

// states.<축>[.<축>…] — 축 값(여럿이면 곱한 조합)마다, 기본 상태에서 바뀌는 값을 상태별로.
// 조건 없는 규칙(포커스 링처럼 모두 같은 것)은 빼고 그 조합에 걸리는 규칙만 — 공통은 #base 에 있다.
function stateDeltaTable(spec, tokens, axes, pick) {
  let combos = [{}];
  for (const axis of axes) combos = combos.flatMap((c) => axisValues(spec, axis).map((v) => ({ ...c, [axis]: v })));
  const states = stateNames(spec).filter((s) => s !== baseState(spec));
  const cells = combos.map((combo) =>
    states.map((state) => {
      const merged = {};
      for (const rule of spec.rules.filter((r) => !isBase(r) && appliesTo(combo)(r))) Object.assign(merged, flatten(rule[state]));
      const keys = orderKeys(spec, Object.keys(merged)).filter(inSlot(pick));
      return keys.length ? keys.map((k) => `${label(spec, k)} ${inline(tokens, merged[k])}`).join(' · ') : '—';
    }),
  );
  const used = states.filter((_, i) => cells.some((row) => row[i] !== '—'));
  return table(
    [...axes, ...used.map((s) => stateCell(spec, s))],
    combos.map((combo, r) => [...axes.map((a) => code(combo[a])), ...used.map((s) => cells[r][states.indexOf(s)])]),
  );
}

// matrix[.<축>.<값>…] — 한 조합의 상태 매트릭스. 공통 규칙 + 그 조합에 걸리는 규칙을 상태마다 누적한다.
// 칸은 상태에 따라 바뀌는 속성, 상태를 정의한 조건부 규칙이 정한 속성, 그리고 구역에 직접 적은 축
// (matrix.pressed.on 의 pressed)을 거는 규칙이 정한 속성 — defaults 로만 따라온 크기 규칙처럼
// 상태와 무관한 값은 빼고, 그 표가 보여 주려는 조건(켜짐 · 체크)의 값은 늘 보인다.
// 공통 규칙의 시각 속성(배경 · 글자 · 테두리 · 그림자)은 바뀌지 않아도 칸으로 둔다 — 스펙의 상태 표는
// 늘 이 칸을 보였다(textarea 의 배경 surface-input 처럼 모든 상태에서 같아도).
// 부위를 고르면 그 부위가 바뀌는 상태만 줄로 둔다.
const VISUAL_PROPS = ['background', 'foreground', 'borderColor', 'borderWidth', 'shadow', 'outlineColor'];

function stateMatrix(spec, tokens, combo, pick, explicit = []) {
  const rules = spec.rules.filter(appliesTo(combo));
  const base = {};
  for (const rule of rules) Object.assign(base, flatten(rule[baseState(spec)]));
  const states = stateNames(spec);
  const rows = states.map((state) => {
    const row = { ...base };
    if (state !== baseState(spec)) for (const rule of rules) Object.assign(row, flatten(rule[state]));
    return row;
  });
  const hasStates = (rule) => states.some((st) => st !== baseState(spec) && rule[st]);
  const asked = (rule) => whenKeys(rule).some((k) => explicit.includes(k));
  const own = new Set();
  for (const rule of rules.filter((r) => !isBase(r) && (hasStates(r) || asked(r)))) {
    for (const state of states) for (const k of Object.keys(flatten(rule[state]))) own.add(k);
  }
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const changes = (c) => rows.some((r) => !same(r[c], rows[0][c]));
  // 상태에 따라 바뀌는 부위만 — breadcrumb 의 Link 표에 page · separator 글자색이 끼지 않게.
  const inPlay = new Set([...unionKeys(rows).filter(changes), ...own].map((k) => k.split('.')[0]));
  for (const rule of rules.filter(isBase)) {
    for (const k of Object.keys(flatten(rule[baseState(spec)]))) {
      const [slot, prop] = k.split('.');
      if (inPlay.has(slot) && VISUAL_PROPS.includes(prop)) own.add(k);
    }
  }
  const cols = orderKeys(spec, unionKeys(rows))
    .filter(inSlot(pick))
    .filter((c) => own.has(c) || changes(c));
  const keep = rows.map((row, i) => i === 0 || !pick || cols.some((c) => !same(row[c], rows[0][c])));
  return table(
    ['상태', ...cols.map((c) => label(spec, c))],
    rows.filter((_, i) => keep[i]).map((row) => [stateCell(spec, states[rows.indexOf(row)]), ...cols.map((c) => inline(tokens, row[c]))]),
  );
}

// compound — 두 축 이상을 함께 건 규칙.
function compoundTable(spec, tokens, pick) {
  const rows = [];
  for (const rule of spec.rules.filter((r) => whenKeys(r).length > 1)) {
    const combo = Object.entries(rule.when).map(([k, v]) => `${k}=${code(v)}`).join(' + ');
    for (const state of stateNames(spec)) {
      for (const [key, pv] of Object.entries(flatten(rule[state])).filter(([k]) => inSlot(pick)(k))) rows.push([combo, code(state), label(spec, key), inline(tokens, pv)]);
    }
  }
  if (rows.length === 0) throw new SpecError('두 축 이상을 건 규칙이 없다 — #compound 를 쓸 수 없다');
  return table(['조합', '상태', '속성', '값'], rows);
}

// motion — 전환마다 시간 · 곡선 · 대상.
function motionTable(spec, tokens) {
  const entries = Object.entries(spec.motion ?? {});
  if (entries.length === 0) throw new SpecError('motion 이 없다');
  const anyNote = entries.some(([, m]) => m.note);
  return table(
    ['전환', '시간', '곡선', '대상', ...(anyNote ? ['비고'] : [])],
    entries.map(([name, m]) => [
      code(name),
      m.duration === undefined ? '—' : formatScalar(tokens, m.duration),
      m.easing === undefined ? '—' : formatScalar(tokens, m.easing),
      m.properties ? [].concat(m.properties).map(code).join(', ') : '—',
      ...(anyNote ? [m.note ?? ''] : []),
    ]),
  );
}

// 구역 이름 → 표.
//   base[.<상태>]           조건 없는 공통 값(상태를 적으면 그 상태만 — 부위별 목록 표)
//   slots                   부위와 설명
//   <축>                    축 값마다 기본 상태 값           예: size
//   grid.<축>[.<축>.<값>…]  속성 × 축 값 격자(뒤 짝은 고정)   예: grid.variant, grid.variant.selected.active
//   states.<축>[.<축>…]     축 값(여럿이면 곱한 조합)마다 상태별로 바뀌는 값
//   matrix[.<축>.<값>…]     그 조합(나머지는 defaults)의 상태 매트릭스
//   compound                두 축 이상을 건 규칙
//   motion                  전환 시간 · 곡선
// 뒤에 @<부위> 를 붙이면 그 부위만 그린다 — 예: matrix@input, base.default@palette.
export function renderSection(spec, tokens, section) {
  const [name, pick, extra] = section.split('@');
  if (extra !== undefined) throw new SpecError(`구역 #${section} — @부위 는 하나만`);
  if (pick !== undefined && !(pick in spec.slots)) throw new SpecError(`없는 부위 ${pick}`);
  const [head, ...rest] = name.split('.');
  if (head === 'base' && rest.length === 0) return baseTable(spec, tokens, undefined, pick);
  if (head === 'base' && rest.length === 1) {
    if (!stateNames(spec).includes(rest[0])) throw new SpecError(`없는 상태 ${rest[0]}`);
    return baseTable(spec, tokens, rest[0], pick);
  }
  if (head === 'slots' && rest.length === 0) return slotsTable(spec);
  if (head === 'compound' && rest.length === 0) return compoundTable(spec, tokens, pick);
  if (head === 'motion' && rest.length === 0) return motionTable(spec, tokens);
  if (head === 'states' && rest.length >= 1) {
    for (const axis of rest) if (!spec.variants[axis]) throw new SpecError(`없는 변형 축 ${axis}`);
    return stateDeltaTable(spec, tokens, rest, pick);
  }
  if (head === 'grid' && rest.length >= 1) {
    const [axis, ...fixedParts] = rest;
    if (!spec.variants[axis]) throw new SpecError(`없는 변형 축 ${axis}`);
    const fixed = pairs(fixedParts, section);
    checkCombo(spec, fixed);
    return gridTable(spec, tokens, axis, fixed, pick);
  }
  if (head === 'matrix') {
    const asked = pairs(rest, section);
    const combo = { ...spec.defaults, ...asked };
    checkCombo(spec, combo);
    return stateMatrix(spec, tokens, combo, pick, Object.keys(asked));
  }
  if (rest.length === 0 && spec.variants[head]) return axisTable(spec, tokens, head, pick);
  throw new SpecError(`없는 구역 #${section}`);
}

export function loadSpec(file, tokens) {
  const spec = parseYaml(readFileSync(file, 'utf8'));
  validate(spec, tokens);
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
      const [, title, name, section] = m;
      const file = join(specDir, `${name}.yaml`);
      try {
        if (!cache.has(file)) cache.set(file, loadSpec(file, tokens));
        // 제목을 표 위에 붙인다 — 한 자리를 여러 표로 나눈 곳(toggle 의 off · on)에서 표끼리 가를 수 있게.
        return `**${title}**\n\n${renderSection(cache.get(file), tokens, section)}`;
      } catch (e) {
        if (e instanceof SpecError || e.code === 'ENOENT') {
          throw new Error(`${source}:${i + 1} ${name}.yaml#${section} — ${e.message}`);
        }
        throw e;
      }
    })
    .join('\n');
}
