// 원본(DESIGN*.md · specs/**/*.md)을 사이트 페이지(.md)로 옮긴다.
//
// 원본은 건드리지 않는다. 여기서 만든 .md 는 빌드 산출물이라 git 에 올리지 않는다
// (site/.gitignore). 손으로 쓴 페이지(.mdx)가 같은 자리에 있으면 그쪽이 이기고
// 생성은 건너뛴다 — 원본을 사이트용으로 새로 쓴 페이지가 생기면 그 파일만 두면 된다.

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { fillSpecTables, loadTokens } from './spec-tables.mjs';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = join(SITE, '..');
const DOCS = join(SITE, 'content/docs');

// DESIGN.md 의 `## ` 절 → 기초 페이지. 절 이름이 바뀌면 여기서 멈춘다(조용히 빠지지 않게).
// Color · Typography · Spacing · Radius · Layout 은 SEED 문서 모양으로 손으로 쓴 .mdx 다(content/docs/foundations).
// 그 페이지의 숫자는 components/foundations 가 빌드 때 DESIGN.md 에서 읽는다 — 여기서는 만들지 않는다.
const FOUNDATION_SECTIONS = [
  { heading: 'Overview', slug: 'overview', title: 'Overview', description: '공유 baseline 과 브랜드 파일의 관계' },
  { heading: 'Elevation & Depth', slug: 'elevation', title: 'Elevation & Depth', description: '그림자와 오버레이 딤' },
  { heading: 'Motion', slug: 'motion', title: 'Motion', description: '지속 시간·이징·반복·키프레임' },
];

// `##` 절 안의 `###` 하나를 따로 한 페이지로 — Layout 절에 있던 것 가운데 새 Layout 페이지가 다루지 않는 것
const FOUNDATION_SUBSECTIONS = [
  { parent: 'Layout', startsWith: 'Touch targets', slug: 'touch-targets', title: '터치 영역', description: '누를 수 있는 요소의 최소 크기' },
  { parent: 'Layout', startsWith: 'RTL support', slug: 'rtl', title: 'RTL', description: '오른쪽에서 왼쪽으로 쓰는 언어 대응' },
];

// 스펙 폴더 밖에 있는 기초 스펙. 컴포넌트 스펙이 `../z-index.md` 로 링크한다.
const FOUNDATION_SPECS = [{ file: 'specs/z-index.md', slug: 'z-index' }];

const generated = [];

function read(rel) {
  return readFileSync(join(REPO, rel), 'utf8');
}

// 첫 `---` … `---` 블록을 YAML 로, 나머지를 본문으로 나눈다.
function splitFrontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('front matter 없음');
  return { data: parseYaml(match[1]), body: match[2] };
}

// 줄마다 코드 펜스 안인지 알려 준다. 펜스 안의 `#` 은 제목이 아니다.
// 닫는 펜스는 여는 것과 같은 글자로 같거나 길게, 뒤에 아무것도 없어야 한다(CommonMark).
function* linesWithFence(text) {
  let fence = null;
  for (const line of text.split('\n')) {
    const m = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (m && !fence) {
      fence = m[1];
      yield [line, true];
    } else if (m && m[1][0] === fence[0] && m[1].length >= fence.length && m[2].trim() === '') {
      fence = null;
      yield [line, true];
    } else {
      yield [line, fence !== null];
    }
  }
}

// `## 제목` 단위로 자른다.
function splitSections(body) {
  const sections = [];
  for (const [line, inFence] of linesWithFence(body)) {
    const h2 = !inFence && line.match(/^## (.+)$/);
    if (h2) sections.push({ heading: h2[1].trim(), lines: [] });
    else sections.at(-1)?.lines.push(line);
  }
  return sections.map((s) => ({ heading: s.heading, content: s.lines.join('\n').trim() }));
}

// 페이지 제목이 h1 이므로 절 안의 제목을 한 단계씩 올린다(### → ##).
function promoteHeadings(content) {
  return [...linesWithFence(content)]
    .map(([line, inFence]) => (inFence ? line : line.replace(/^#(#{2,6}) /, '$1 ')))
    .join('\n');
}

// 스펙의 Anatomy 범례는 머리 줄 없이 `| ⓐ 부위 | 설명 |` 행만 쓰는 게 관례다(53개 전부).
// GFM 은 구분 줄(`| --- |`)이 없으면 표로 보지 않으므로 머리 줄을 채운다.
const TABLE_DELIMITER = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;

function addMissingTableHeaders(body) {
  const lines = [...linesWithFence(body)];
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const [line, inFence] = lines[i];
    const startsTable = !inFence && line.trimStart().startsWith('|') && !out.at(-1)?.trimStart().startsWith('|');
    if (startsTable && !TABLE_DELIMITER.test(lines[i + 1]?.[0] ?? '')) {
      out.push('| 부위 | 설명 |', '| --- | --- |');
    }
    out.push(line);
  }
  return out.join('\n');
}

// 설명 칸은 글자로만 나온다 — 마크다운 기호를 벗긴다.
function plain(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

// `# 제목` 과 바로 아래 `> 요약` 을 떼어 frontmatter 로 올린다.
function splitSpec(text) {
  const lines = text.split('\n');
  const h1 = lines.findIndex((l) => /^# /.test(l));
  if (h1 === -1) throw new Error('# 제목 없음');
  const title = lines[h1].replace(/^# /, '').trim();
  let i = h1 + 1;
  while (i < lines.length && lines[i].trim() === '') i++;
  const quote = [];
  while (i < lines.length && /^>/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ''));
  return { title, description: plain(quote.join(' ')), body: lines.slice(i).join('\n').trim() };
}

function write(relPath, { title, description, source }, body) {
  const out = join(DOCS, relPath);
  if (existsSync(out.replace(/\.md$/, '.mdx'))) return; // 손으로 쓴 페이지가 이긴다
  mkdirSync(dirname(out), { recursive: true });
  const fm = stringifyYaml({ title, description, source }, { lineWidth: 0 }).trim();
  writeFileSync(out, `---\n${fm}\n---\n\n<!-- ${source} 에서 생성 — 이 파일을 고치지 말고 원본을 고친다 -->\n\n${body}\n`);
  generated.push(relPath);
}

// 지난번에 만든 .md 를 지운다. 손으로 쓴 .mdx · meta.json 은 남긴다.
function clean(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) clean(p);
    else if (entry.name.endsWith('.md')) rmSync(p);
  }
}

// ── 토큰 레퍼런스 ──────────────────────────────────────────────

function colorRows(colors) {
  const rows = new Map();
  for (const [name, value] of Object.entries(colors ?? {})) {
    const base = name.replace(/-dark$/, '');
    const row = rows.get(base) ?? {};
    row[name.endsWith('-dark') ? 'dark' : 'light'] = value;
    rows.set(base, row);
  }
  return rows;
}

function table(head, rows) {
  const line = (cells) => `| ${cells.join(' | ')} |`;
  return [line(head), line(head.map(() => '---')), ...rows.map(line)].join('\n');
}

const code = (v) => (v === undefined || v === null || v === '' ? '—' : `\`${v}\``);

function tokenReference() {
  const shared = splitFrontMatter(read('DESIGN.md')).data;
  const hr = splitFrontMatter(read('DESIGN.hr.md')).data;
  const desk = splitFrontMatter(read('DESIGN.desk.md')).data;

  const sharedColors = colorRows(shared.colors);
  const hrColors = colorRows(hr.colors);
  const deskColors = colorRows(desk.colors);
  const brandNames = [...new Set([...hrColors.keys(), ...deskColors.keys()])].filter((n) => !sharedColors.has(n));

  const typography = Object.entries(shared.typography ?? {}).map(([name, t]) => [
    code(name),
    code(t.fontSize),
    code(t.fontWeight),
    code(t.lineHeight),
    code(t.letterSpacing),
  ]);
  const families = [...new Set(Object.values(shared.typography ?? {}).map((t) => t.fontFamily))];

  return [
    '토큰 값은 `DESIGN.md`(공유)와 `DESIGN.hr.md` · `DESIGN.desk.md`(브랜드)의 YAML 머리말이 원본입니다. 이 표는 빌드할 때 그 머리말에서 그대로 뽑습니다.',
    '',
    '그림자·모션·중단점·레이아웃(콘텐츠 폭·여백·사이드바)·터치 영역·z-index 는 머리말이 아니라 각 기초 페이지의 표에 정의돼 있습니다.',
    '',
    '## 공유 색',
    '',
    table(
      ['토큰', '라이트', '다크'],
      [...sharedColors].map(([name, v]) => [code(name), code(v.light), code(v.dark)]),
    ),
    '',
    '## 브랜드 색',
    '',
    '브랜드 파일에서만 정의하는 토큰입니다. 파일 안에서는 접미사 없이 같은 이름을 씁니다.',
    '',
    table(
      ['토큰', 'HR 라이트', 'HR 다크', 'Desk 라이트', 'Desk 다크'],
      brandNames.map((name) => {
        const h = hrColors.get(name) ?? {};
        const d = deskColors.get(name) ?? {};
        return [code(name), code(h.light), code(h.dark), code(d.light), code(d.dark)];
      }),
    ),
    '',
    '## 타이포그래피',
    '',
    `글꼴은 모두 ${families.map(code).join(', ')} 입니다.`,
    '',
    table(['토큰', '크기', '굵기', '줄 높이', '자간'], typography),
    '',
    '## 라운드',
    '',
    table(['토큰', '값'], Object.entries(shared.rounded ?? {}).map(([k, v]) => [code(k), code(v)])),
    '',
    '## 간격',
    '',
    table(['토큰', '값'], Object.entries(shared.spacing ?? {}).map(([k, v]) => [code(k), code(v)])),
  ].join('\n');
}

// ── 실행 ────────────────────────────────────────────────────────

clean(join(DOCS, 'foundations'));
clean(join(DOCS, 'components'));

const design = splitFrontMatter(read('DESIGN.md'));
const sections = new Map(splitSections(design.body).map((s) => [s.heading, s.content]));
for (const f of FOUNDATION_SECTIONS) {
  const content = sections.get(f.heading);
  if (content === undefined) throw new Error(`DESIGN.md 에 "## ${f.heading}" 절이 없다 — FOUNDATION_SECTIONS 를 고쳐라`);
  write(`foundations/${f.slug}.md`, { ...f, source: 'DESIGN.md' }, promoteHeadings(content));
}

for (const f of FOUNDATION_SUBSECTIONS) {
  const parent = sections.get(f.parent);
  if (parent === undefined) throw new Error(`DESIGN.md 에 "## ${f.parent}" 절이 없다`);
  const lines = [...linesWithFence(parent)];
  const start = lines.findIndex(([l, inFence]) => !inFence && l.startsWith(`### ${f.startsWith}`));
  if (start === -1) throw new Error(`DESIGN.md "## ${f.parent}" 에 "### ${f.startsWith}" 가 없다 — FOUNDATION_SUBSECTIONS 를 고쳐라`);
  let end = lines.findIndex(([l, inFence], i) => i > start && !inFence && /^#{2,3} /.test(l));
  if (end === -1) end = lines.length;
  // ### 는 페이지 제목이 되므로 떼고, 그 아래 #### → ## 로 두 단계 올린다
  const body = lines.slice(start + 1, end).map(([l, inFence]) => (inFence ? l : l.replace(/^##(#{2,4}) /, '$1 '))).join('\n').trim();
  write(`foundations/${f.slug}.md`, { title: f.title, description: f.description, source: 'DESIGN.md' }, body);
}

const guides = sections.get('Components');
if (guides === undefined) throw new Error('DESIGN.md 에 "## Components" 절이 없다');
write(
  'components/guides.md',
  { title: '공통 가이드', description: '공유 토큰만 쓰는 컴포넌트 규칙 — DESIGN.md 의 Components 절', source: 'DESIGN.md' },
  promoteHeadings(guides),
);

write(
  'foundations/tokens.md',
  { title: 'Token reference', description: '공유·브랜드 토큰의 전체 값', source: 'DESIGN.md' },
  tokenReference(),
);

for (const { file, slug } of FOUNDATION_SPECS) {
  const spec = splitSpec(read(file));
  write(`foundations/${slug}.md`, { ...spec, source: file }, spec.body);
}

const specDir = join(REPO, 'specs/components');
const tokens = loadTokens(REPO);
for (const name of readdirSync(specDir).filter((n) => n.endsWith('.md')).sort()) {
  const source = `specs/components/${name}`;
  const spec = splitSpec(read(source));
  // 수치 표 자리(`[표: …](<이름>.yaml#…)`)는 YAML 로 그린 표로 바꾼다.
  const withTables = fillSpecTables(addMissingTableHeaders(spec.body), { specDir, tokens, source });
  // 스펙 폴더 밖의 기초 스펙은 사이트에선 foundations 아래에 있다.
  const body = withTables.replace(/\]\(\.\.\/z-index\.md/g, '](../foundations/z-index.md');
  write(`components/${name}`, { ...spec, source }, body);
}

console.log(`gen-content: ${generated.length} pages`);
