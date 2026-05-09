#!/usr/bin/env node
// HTML 토큰 카탈로그 빌드 (P2-E)
//
// exports/tokens*.css의 v4 @theme 변수를 파싱하여 단일 HTML 카탈로그로 시각화.
// Storybook 대안 — devDependency 추가 0, 브라우저로 직접 열어서 확인.
//
// 사용법:
//   npm run build:preview     # 3 파일 (DESIGN.md, HR, Desk) 모두 빌드
//   node scripts/build-preview-html.mjs --source DESIGN.md --output exports/preview.html

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";
import { argv, exit } from "node:process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

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

function parseTokensFromCss(css) {
  const tokens = {
    colors: [],     // [{name, value}]
    text: [],       // [{name, fontSize, lineHeight, fontWeight}]
    radius: [],
    spacing: [],
    shadow: [],
    motion: [],
    overlay: [],
    fontSans: null,
  };

  const re = /^\s+--([a-z][a-z0-9-]*(?:--[a-z-]+)?):\s*([^;]+);/gm;
  let m;
  const allVars = {};
  while ((m = re.exec(css)) !== null) {
    allVars[m[1]] = m[2].trim();
  }

  for (const [name, value] of Object.entries(allVars)) {
    if (name === "font-sans") {
      tokens.fontSans = value;
    } else if (name.startsWith("color-")) {
      tokens.colors.push({ name: name.replace(/^color-/, ""), value });
    } else if (name.startsWith("radius-")) {
      tokens.radius.push({ name: name.replace(/^radius-/, ""), value });
    } else if (name.startsWith("spacing-")) {
      tokens.spacing.push({ name: name.replace(/^spacing-/, ""), value });
    } else if (name.startsWith("shadow-")) {
      tokens.shadow.push({ name: name.replace(/^shadow-/, ""), value });
    } else if (name.startsWith("motion-")) {
      tokens.motion.push({ name, value });
    } else if (name.startsWith("overlay-")) {
      tokens.overlay.push({ name, value });
    } else if (name.startsWith("text-") && !name.includes("--")) {
      const ms = allVars[`${name}--font-weight`] || "—";
      const lh = allVars[`${name}--line-height`] || "—";
      tokens.text.push({
        name: name.replace(/^text-/, ""),
        fontSize: value,
        lineHeight: lh,
        fontWeight: ms,
      });
    }
  }
  return tokens;
}

function escape(s) {
  return String(s).replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
}

function renderHtml(brandName, css, tokens, sourceFile) {
  const colorGrid = tokens.colors.map(t => `
    <div class="swatch">
      <div class="swatch-color" style="background:${escape(t.value)}"></div>
      <div class="swatch-name">${escape(t.name)}</div>
      <div class="swatch-value">${escape(t.value)}</div>
    </div>`).join("");

  const textRows = tokens.text.map(t => `
    <div class="text-row">
      <div class="text-meta">
        <strong>text-${escape(t.name)}</strong>
        <span>${escape(t.fontSize)} / ${escape(t.lineHeight)} / ${escape(t.fontWeight)}</span>
      </div>
      <div class="text-sample" style="font-size:${escape(t.fontSize)};line-height:${escape(t.lineHeight)};font-weight:${escape(t.fontWeight)};">
        Porest Design — 사람과 일상이 숲처럼 자라나는 디자인 시스템
      </div>
    </div>`).join("");

  const radiusRow = tokens.radius.map(t => `
    <div class="radius-item">
      <div class="radius-box" style="border-radius:${escape(t.value)};"></div>
      <div class="radius-label">radius-${escape(t.name)}<br><small>${escape(t.value)}</small></div>
    </div>`).join("");

  const spacingRow = tokens.spacing.map(t => `
    <div class="spacing-item">
      <div class="spacing-bar" style="width:${escape(t.value)};"></div>
      <div class="spacing-label">spacing-${escape(t.name)} <small>${escape(t.value)}</small></div>
    </div>`).join("");

  const shadowGrid = tokens.shadow.map(t => `
    <div class="shadow-card${t.name.endsWith("-dark") ? " on-dark" : ""}">
      <div class="shadow-box" style="box-shadow:${escape(t.value)};"></div>
      <div class="shadow-name">shadow-${escape(t.name)}</div>
    </div>`).join("");

  const motionRows = tokens.motion.map(t => `
    <div class="motion-row">
      <strong>${escape(t.name)}</strong>
      <code>${escape(t.value)}</code>
    </div>`).join("");

  const overlayRow = tokens.overlay.map(t => `
    <div class="overlay-card">
      <div class="overlay-bg">
        <div class="overlay-dim" style="background:${escape(t.value)};"></div>
        <div class="overlay-modal">Modal 콘텐츠</div>
      </div>
      <div class="overlay-name">${escape(t.name)}</div>
    </div>`).join("");

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Porest Design Tokens — ${escape(brandName)}</title>
  <style>${css}</style>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: var(--font-sans);
      background: var(--color-bg-page);
      color: var(--color-text-primary);
      margin: 0;
      padding: var(--spacing-2xl);
      line-height: 1.6;
    }
    h1 { font-size: var(--text-heading-xl); line-height: var(--text-heading-xl--line-height); font-weight: var(--text-heading-xl--font-weight); margin: 0 0 var(--spacing-sm); }
    h2 { font-size: var(--text-heading-lg); line-height: var(--text-heading-lg--line-height); font-weight: var(--text-heading-lg--font-weight); margin: var(--spacing-3xl) 0 var(--spacing-md); border-bottom: 1px solid var(--color-border-default); padding-bottom: var(--spacing-sm); }
    h3 { font-size: var(--text-heading-md); line-height: var(--text-heading-md--line-height); font-weight: var(--text-heading-md--font-weight); margin: var(--spacing-xl) 0 var(--spacing-sm); }
    p { margin: 0 0 var(--spacing-md); color: var(--color-text-secondary); }
    code { font-family: ui-monospace, SFMono-Regular, monospace; background: var(--color-surface-input); padding: 2px 6px; border-radius: var(--radius-xs); font-size: 13px; }
    .meta { color: var(--color-text-tertiary); font-size: var(--text-caption); }

    /* Colors */
    .swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-xl); }
    .swatch { background: var(--color-surface-default); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); }
    .swatch-color { height: 80px; }
    .swatch-name { font-weight: 600; padding: var(--spacing-sm) var(--spacing-md) 0; font-size: var(--text-caption); }
    .swatch-value { padding: 0 var(--spacing-md) var(--spacing-sm); font-family: ui-monospace, monospace; color: var(--color-text-tertiary); font-size: var(--text-caption); }

    /* Typography */
    .text-row { display: grid; grid-template-columns: 240px 1fr; gap: var(--spacing-lg); padding: var(--spacing-md) 0; border-bottom: 1px solid var(--color-border-default); }
    .text-meta { display: flex; flex-direction: column; }
    .text-meta strong { font-size: var(--text-body); }
    .text-meta span { color: var(--color-text-tertiary); font-family: ui-monospace, monospace; font-size: var(--text-caption); }

    /* Radius */
    .radius-row { display: flex; gap: var(--spacing-lg); flex-wrap: wrap; }
    .radius-item { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-sm); }
    .radius-box { width: 80px; height: 80px; background: var(--color-primary, var(--color-text-primary)); }
    .radius-label { text-align: center; font-size: var(--text-caption); }

    /* Spacing */
    .spacing-row { display: flex; flex-direction: column; gap: var(--spacing-sm); margin-bottom: var(--spacing-xl); }
    .spacing-item { display: flex; align-items: center; gap: var(--spacing-md); }
    .spacing-bar { background: var(--color-primary, var(--color-text-primary)); height: 16px; border-radius: var(--radius-xs); }
    .spacing-label { font-size: var(--text-caption); }

    /* Shadow */
    .shadow-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--spacing-xl); padding: var(--spacing-lg); background: var(--color-bg-page); }
    .shadow-card { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-md); }
    .shadow-card.on-dark { background: var(--color-bg-page-dark); padding: var(--spacing-lg); border-radius: var(--radius-md); }
    .shadow-card.on-dark .shadow-name { color: var(--color-text-primary-dark); }
    .shadow-box { width: 120px; height: 80px; background: var(--color-surface-default); border-radius: var(--radius-md); }
    .shadow-card.on-dark .shadow-box { background: var(--color-surface-default-dark); }
    .shadow-name { font-size: var(--text-caption); font-family: ui-monospace, monospace; }

    /* Motion */
    .motion-row { display: grid; grid-template-columns: 240px 1fr; gap: var(--spacing-lg); padding: var(--spacing-sm) 0; border-bottom: 1px solid var(--color-border-default); align-items: center; }

    /* Overlay */
    .overlay-row { display: flex; gap: var(--spacing-lg); flex-wrap: wrap; }
    .overlay-card { width: 240px; }
    .overlay-bg { position: relative; height: 160px; background: linear-gradient(135deg, var(--color-chart-blue), var(--color-chart-violet)); border-radius: var(--radius-md); overflow: hidden; }
    .overlay-dim { position: absolute; inset: 0; }
    .overlay-modal { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--color-surface-default); padding: var(--spacing-md) var(--spacing-lg); border-radius: var(--radius-md); box-shadow: var(--shadow-xl); font-size: var(--text-caption); font-weight: 600; }
    .overlay-name { text-align: center; font-size: var(--text-caption); font-family: ui-monospace, monospace; margin-top: var(--spacing-sm); }

    @media (prefers-color-scheme: dark) {
      body { background: var(--color-bg-page-dark); color: var(--color-text-primary-dark); }
      .swatch { background: var(--color-surface-default-dark); }
      h2 { border-color: var(--color-border-default-dark); }
    }
  </style>
</head>
<body>
  <h1>Porest Design Tokens</h1>
  <p class="meta">brand: <strong>${escape(brandName)}</strong> · source: <code>${escape(sourceFile)}</code> · generated: ${new Date().toISOString()}</p>

  <h2>Colors (${tokens.colors.length})</h2>
  <div class="swatch-grid">${colorGrid}</div>

  <h2>Typography (${tokens.text.length})</h2>
  <div>${textRows}</div>

  <h2>Radius (${tokens.radius.length})</h2>
  <div class="radius-row">${radiusRow}</div>

  <h2>Spacing (${tokens.spacing.length})</h2>
  <div class="spacing-row">${spacingRow}</div>

  <h2>Shadow (${tokens.shadow.length})</h2>
  <div class="shadow-grid">${shadowGrid}</div>

  <h2>Motion (${tokens.motion.length})</h2>
  <div>${motionRows}</div>

  <h2>Overlay (${tokens.overlay.length})</h2>
  <div class="overlay-row">${overlayRow}</div>
</body>
</html>
`;
}

const args = parseArgs(argv.slice(2));

const targets = args.source ? [
  { source: args.source, output: args.output || resolve(ROOT, "exports/preview.html"), brand: args.brand || basename(args.source, ".md") }
] : [
  { source: resolve(ROOT, "DESIGN.md"), output: resolve(ROOT, "exports/preview.html"), brand: "shared (DESIGN.md)" },
  { source: resolve(ROOT, "DESIGN.hr.md"), output: resolve(ROOT, "exports/preview.hr.html"), brand: "Porest HR" },
  { source: resolve(ROOT, "DESIGN.desk.md"), output: resolve(ROOT, "exports/preview.desk.html"), brand: "Porest Desk" },
];

if (!existsSync(resolve(ROOT, "exports"))) mkdirSync(resolve(ROOT, "exports"));

for (const { source, output, brand } of targets) {
  // 우선 build-tailwind-v4를 통해 CSS 생성
  const cssPath = output.replace(/preview\.([^.]*\.)?html$/, m => {
    if (m === "preview.html") return "tokens.css";
    if (m === "preview.hr.html") return "tokens.hr.css";
    if (m === "preview.desk.html") return "tokens.desk.css";
    return "tokens.css";
  });

  if (!existsSync(cssPath)) {
    console.error(`error: ${cssPath} not found — npm run export:tailwind:all 먼저 실행`);
    exit(2);
  }

  const css = readFileSync(cssPath, "utf8");
  const tokens = parseTokensFromCss(css);
  const html = renderHtml(brand, css, tokens, basename(source));

  writeFileSync(output, html, "utf8");
  console.log(`✓ ${basename(output)}: colors=${tokens.colors.length}, text=${tokens.text.length}, radius=${tokens.radius.length}, spacing=${tokens.spacing.length}, shadow=${tokens.shadow.length}, motion=${tokens.motion.length}, overlay=${tokens.overlay.length}`);
}
