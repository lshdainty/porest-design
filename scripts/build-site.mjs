#!/usr/bin/env node
// Porest Design — multi-page static documentation site
//
// 출력: exports/site/
//   index.html                      Landing (브랜드 정체성 + 핵심 가치)
//   tokens/{colors,typography,spacing,radius,shadows,motion,breakpoints,z-index}.html
//   assets/site.css                 사이트 전용 layout CSS
//   assets/tokens.css               3-brand 통합 (`:root` + `[data-brand="hr|desk"]`)
//   assets/site.js                  brand toggle / theme toggle / mobile nav
//
// 외부 의존성 0 — vanilla Node + 기존 build-tailwind-v4 산출물 재사용.
// Phase 1 — 사이트 골격 + Landing + Token 페이지.
// Phase 2 (미래) — 컴포넌트 페이지. Phase 3 — 조합 layout.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// preview.html의 데모 render 함수 + CSS 재사용 — single source of truth
// shadcn recipe examples — Preview + Code 토글로 컴포넌트 페이지에 노출
import { buttonExamples } from "../recipes/shadcn/examples/button-examples.mjs";
import { inputExamples } from "../recipes/shadcn/examples/input-examples.mjs";
import { textareaExamples } from "../recipes/shadcn/examples/textarea-examples.mjs";
import { labelExamples } from "../recipes/shadcn/examples/label-examples.mjs";
import { checkboxExamples } from "../recipes/shadcn/examples/checkbox-examples.mjs";
import { radioGroupExamples } from "../recipes/shadcn/examples/radio-group-examples.mjs";
import { switchExamples } from "../recipes/shadcn/examples/switch-examples.mjs";
import { badgeExamples } from "../recipes/shadcn/examples/badge-examples.mjs";
import { avatarExamples } from "../recipes/shadcn/examples/avatar-examples.mjs";
import { cardExamples } from "../recipes/shadcn/examples/card-examples.mjs";
import { separatorExamples } from "../recipes/shadcn/examples/separator-examples.mjs";
import { skeletonExamples } from "../recipes/shadcn/examples/skeleton-examples.mjs";
import { aspectRatioExamples } from "../recipes/shadcn/examples/aspect-ratio-examples.mjs";
import { progressExamples } from "../recipes/shadcn/examples/progress-examples.mjs";
import { scrollAreaExamples } from "../recipes/shadcn/examples/scroll-area-examples.mjs";
import { typographyExamples } from "../recipes/shadcn/examples/typography-examples.mjs";
import { carouselExamples } from "../recipes/shadcn/examples/carousel-examples.mjs";
import { resizableExamples } from "../recipes/shadcn/examples/resizable-examples.mjs";
import { alertExamples } from "../recipes/shadcn/examples/alert-examples.mjs";
import { tooltipExamples } from "../recipes/shadcn/examples/tooltip-examples.mjs";
import { dialogExamples } from "../recipes/shadcn/examples/dialog-examples.mjs";
import { alertDialogExamples } from "../recipes/shadcn/examples/alert-dialog-examples.mjs";
import { popoverExamples } from "../recipes/shadcn/examples/popover-examples.mjs";
import { hoverCardExamples } from "../recipes/shadcn/examples/hover-card-examples.mjs";
import { sheetExamples } from "../recipes/shadcn/examples/sheet-examples.mjs";
import { drawerExamples } from "../recipes/shadcn/examples/drawer-examples.mjs";
import { sonnerExamples } from "../recipes/shadcn/examples/sonner-examples.mjs";
// Phase 4 Navigation
import { tabsExamples } from "../recipes/shadcn/examples/tabs-examples.mjs";
import { breadcrumbExamples } from "../recipes/shadcn/examples/breadcrumb-examples.mjs";
import { paginationExamples } from "../recipes/shadcn/examples/pagination-examples.mjs";
import { dropdownMenuExamples } from "../recipes/shadcn/examples/dropdown-menu-examples.mjs";
import { contextMenuExamples } from "../recipes/shadcn/examples/context-menu-examples.mjs";
import { menubarExamples } from "../recipes/shadcn/examples/menubar-examples.mjs";
import { navigationMenuExamples } from "../recipes/shadcn/examples/navigation-menu-examples.mjs";
import { commandExamples } from "../recipes/shadcn/examples/command-examples.mjs";
import { sidebarExamples } from "../recipes/shadcn/examples/sidebar-examples.mjs";
// Phase 5 Disclosure
import { accordionExamples } from "../recipes/shadcn/examples/accordion-examples.mjs";
import { collapsibleExamples } from "../recipes/shadcn/examples/collapsible-examples.mjs";
// Phase 1 Form remaining
import { toggleExamples } from "../recipes/shadcn/examples/toggle-examples.mjs";
import { toggleGroupExamples } from "../recipes/shadcn/examples/toggle-group-examples.mjs";
import { sliderExamples } from "../recipes/shadcn/examples/slider-examples.mjs";
import { selectExamples } from "../recipes/shadcn/examples/select-examples.mjs";
import { formExamples } from "../recipes/shadcn/examples/form-examples.mjs";
import { inputOtpExamples } from "../recipes/shadcn/examples/input-otp-examples.mjs";
import { comboboxExamples } from "../recipes/shadcn/examples/combobox-examples.mjs";
import { datePickerExamples } from "../recipes/shadcn/examples/date-picker-examples.mjs";
// Phase 6 Data
import { tableExamples } from "../recipes/shadcn/examples/table-examples.mjs";
import { dataTableExamples } from "../recipes/shadcn/examples/data-table-examples.mjs";
import { calendarExamples } from "../recipes/shadcn/examples/calendar-examples.mjs";
import { chartExamples } from "../recipes/shadcn/examples/chart-examples.mjs";
// Display extras (shadcn 외 — Porest 자체 정의)
import { spinnerExamples } from "../recipes/shadcn/examples/spinner-examples.mjs";
// Porest 도메인 spec (shadcn 외) — 2026-05-15 추가
import { colorSwatchExamples } from "../recipes/shadcn/examples/color-swatch-examples.mjs";
import { iconPickerExamples } from "../recipes/shadcn/examples/icon-picker-examples.mjs";
import { tileExamples } from "../recipes/shadcn/examples/tile-examples.mjs";
import { radioListExamples } from "../recipes/shadcn/examples/radio-list-examples.mjs";
import { searchableListExamples } from "../recipes/shadcn/examples/searchable-list-examples.mjs";

import {
  brandProfile,
  pageCss as previewPageCss,
  parseTokensFromCss,
  renderButtonGallery,
  renderListingDetail,
  renderCalendar,
  renderEmptyState,
  renderModal,
  renderToasts,
  renderSkeleton,
  renderForm,
  renderBatchV67,
  renderShadcnNav,
  renderShadcnInput,
  renderShadcnDisclose,
  renderShadcnData,
  renderShadcnExtras,
  renderBatchV73V78,
  renderVignettes,
} from "./build-preview-html.mjs";

const SHADCN_EXAMPLES = {
  // Form (Phase 1)
  button: buttonExamples,
  input: inputExamples,
  textarea: textareaExamples,
  label: labelExamples,
  checkbox: checkboxExamples,
  "radio-group": radioGroupExamples,
  switch: switchExamples,
  // Display (Phase 2)
  badge: badgeExamples,
  avatar: avatarExamples,
  card: cardExamples,
  separator: separatorExamples,
  skeleton: skeletonExamples,
  "aspect-ratio": aspectRatioExamples,
  progress: progressExamples,
  "scroll-area": scrollAreaExamples,
  typography: typographyExamples,
  carousel: carouselExamples,
  resizable: resizableExamples,
  // Overlay (Phase 3)
  alert: alertExamples,
  tooltip: tooltipExamples,
  dialog: dialogExamples,
  "alert-dialog": alertDialogExamples,
  popover: popoverExamples,
  "hover-card": hoverCardExamples,
  sheet: sheetExamples,
  drawer: drawerExamples,
  sonner: sonnerExamples,
  // Phase 4 Navigation
  tabs: tabsExamples,
  breadcrumb: breadcrumbExamples,
  pagination: paginationExamples,
  "dropdown-menu": dropdownMenuExamples,
  "context-menu": contextMenuExamples,
  menubar: menubarExamples,
  "navigation-menu": navigationMenuExamples,
  command: commandExamples,
  sidebar: sidebarExamples,
  // Phase 5 Disclosure
  accordion: accordionExamples,
  collapsible: collapsibleExamples,
  // Phase 1 Form remaining
  toggle: toggleExamples,
  "toggle-group": toggleGroupExamples,
  slider: sliderExamples,
  select: selectExamples,
  form: formExamples,
  "input-otp": inputOtpExamples,
  combobox: comboboxExamples,
  "date-picker": datePickerExamples,
  // Phase 6 Data
  table: tableExamples,
  "data-table": dataTableExamples,
  calendar: calendarExamples,
  chart: chartExamples,
  // Display extras
  spinner: spinnerExamples,
  // Porest 도메인 spec (shadcn 카탈로그 외) — 2026-05-15
  "color-swatch": colorSwatchExamples,
  "icon-picker": iconPickerExamples,
  tile: tileExamples,
  "radio-list": radioListExamples,
  "searchable-list": searchableListExamples,
};

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "exports/site");

function escape(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// 간단 Markdown → HTML 변환기 — specs/components/*.md 렌더 전용 (외부 의존성 0).
// 처리: heading(#~####) / blockquote(>) / ul(- item) / fenced code(```) / table(|) / paragraph + inline (**bold** / `code` / [text](url)).
function mdToHtml(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;

  function inline(s) {
    // escape 먼저 → 그 다음 inline 마크업을 HTML로 (escape 후라 안전한 패턴만 추가)
    let t = escape(s);
    // inline code `..`
    t = t.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
    // bold **..**
    t = t.replace(/\*\*([^*]+)\*\*/g, (_, c) => `<strong>${c}</strong>`);
    // link [text](url)
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => `<a href="${url}">${text}</a>`);
    return t;
  }

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      out.push(`<pre><code${lang ? ` class="lang-${escape(lang)}"` : ""}>${escape(buf.join("\n"))}</code></pre>`);
      continue;
    }

    // heading
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const lvl = h[1].length;
      out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`);
      i++;
      continue;
    }

    // blockquote (연속된 > 줄을 한 블록으로)
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }

    // table — 헤더 + separator + 0..N data row
    if (/^\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const splitRow = (l) => l.replace(/^\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
      const header = splitRow(line);
      i += 2; // skip header + separator
      const rows = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      const thead = `<thead><tr>${header.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>`;
      const tbody = `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
      out.push(`<table class="spec-table">${thead}${tbody}</table>`);
      continue;
    }

    // ul (연속된 - item 또는 * item)
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      out.push(`<ul>${items.map((it) => `<li>${inline(it)}</li>`).join("")}</ul>`);
      continue;
    }

    // 빈 줄
    if (line.trim() === "") {
      i++;
      continue;
    }

    // paragraph (다음 빈 줄까지)
    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,4}\s|>\s|```|[-*]\s|\|)/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }

  return out.join("\n");
}

// kebab-case slug → PascalCase 컴포넌트 이름. "button" → "Button", "input-textarea" → "InputTextarea".
function capitalize(slug) {
  return String(slug)
    .split("-")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

// ============================================================
// 1. tokens 통합 — 3 브랜드 단일 CSS
// ============================================================

// 토큰 빌드 결과를 두 형태로 분리:
//   - rootCss: 외부 <link> stylesheet — 브라우저가 즉시 적용 (FOUC 방지, layout 색상)
//   - tailwindBlock: 인라인 <style type="text/tailwindcss"> — Tailwind v4 CDN이 @theme 읽어 utility 생성
function buildTokens() {
  const def = readFileSync(resolve(ROOT, "exports/tokens.css"), "utf8");
  const hr = readFileSync(resolve(ROOT, "exports/tokens.hr.css"), "utf8");
  const desk = readFileSync(resolve(ROOT, "exports/tokens.desk.css"), "utf8");

  // Default에 brand fallback 4 토큰 + shadcn Tailwind v4 utility alias 추가.
  // @theme 안에 정의해야 Tailwind v4 CDN이 utility(`ring-ring`, `bg-secondary`,
  // `text-muted-foreground` 등)를 자동 생성함. 외부 tokens.css의 :root에만 두면
  // CSS variable로만 작동하고 utility는 미생성 — 컴포넌트 className이 무용지물됨.
  const shadcnAliases = [
    "  /* shadcn Tailwind v4 utility alias — bg-secondary, ring-ring, text-muted-foreground 등 자동 생성 */",
    "  --color-primary-foreground: var(--color-text-on-accent);",
    "  --color-secondary: var(--color-surface-input);",
    "  --color-secondary-foreground: var(--color-text-primary);",
    "  --color-muted: var(--color-surface-input);",
    "  --color-muted-foreground: var(--color-text-secondary);",
    "  --color-accent: var(--color-surface-input);",
    "  --color-accent-foreground: var(--color-text-primary);",
    "  --color-destructive: var(--color-error);",
    "  --color-destructive-foreground: var(--color-text-on-accent);",
    "  --color-border: var(--color-border-default);",
    "  --color-input: var(--color-border-default);",
    "  --color-ring: var(--color-border-focus);",
    "  --color-card: var(--color-surface-default);",
    "  --color-card-foreground: var(--color-text-primary);",
    "  --color-popover: var(--color-surface-default);",
    "  --color-popover-foreground: var(--color-text-primary);",
    "  --color-background: var(--color-bg-page);",
    "  --color-foreground: var(--color-text-primary);",
  ].join("\n");

  const defaultWithFallback = def.replace(
    /@theme\s*\{/,
    "@theme {\n  /* Brand fallback — Default = neutral, no specific accent */\n  --color-primary: #1a1f2e;\n  --color-primary-light: #4a5568;\n  --color-border-focus: #1a1f2e;\n  --color-border-focus-light: #4a5568;\n" + shadcnAliases + "\n",
  );

  // @theme 내용 추출 → :root 미러 (브라우저가 즉시 적용)
  const themeMatch = /@theme\s*\{([\s\S]*?)\n\}/.exec(defaultWithFallback);
  const themeContent = themeMatch ? themeMatch[1] : "";
  const rootBlock = `:root, [data-brand="default"] {${themeContent}\n}`;

  // Keyframes — preview tokens*.css의 Animation library 추출 (모든 브랜드 공통)
  const keyframesMatch = def.match(/(\/\* Keyframes[\s\S]*?)$/);
  const keyframes = keyframesMatch ? keyframesMatch[1].trim() : "";

  // brand override (@theme 외부, CSS variable만 재정의)
  const brandOverride = (cssText, attr) => {
    const tokens = [];
    const re = /^\s*--color-(primary|primary-light|border-focus|border-focus-light)(-dark)?:\s*([^;]+);/gm;
    let m;
    while ((m = re.exec(cssText)) !== null) {
      const name = `--color-${m[1]}${m[2] || ""}`;
      tokens.push(`  ${name}: ${m[3].trim()};`);
    }
    return `[data-brand="${attr}"] {\n${tokens.join("\n")}\n}`;
  };

  const darkBlock = [
    "[data-theme=\"dark\"] {",
    "  --color-bg-page: var(--color-bg-page-dark);",
    "  --color-surface-default: var(--color-surface-default-dark);",
    "  --color-surface-input: var(--color-surface-input-dark);",
    "  --color-text-primary: var(--color-text-primary-dark);",
    "  --color-text-secondary: var(--color-text-secondary-dark);",
    "  --color-text-tertiary: var(--color-text-tertiary-dark);",
    "  --color-text-disabled: var(--color-text-disabled-dark);",
    "  --color-border-default: var(--color-border-default-dark);",
    "  --color-border-strong: var(--color-border-strong-dark);",
    "  /* focus ring: 다크 표면 위에서 시인성 확보 — primary-light(=border-focus-light)로 swap */",
    "  --color-border-focus: var(--color-border-focus-light);",
    "  --shadow-sm: var(--shadow-sm-dark);",
    "  --shadow-md: var(--shadow-md-dark);",
    "  --shadow-lg: var(--shadow-lg-dark);",
    "  --shadow-xl: var(--shadow-xl-dark);",
    "}",
  ].join("\n");

  // shadcn alias bridge — recipes/shadcn/styles/porest-shadcn-bridge.css 그대로 합침
  // (`--ring`, `--color-ring`, `--color-primary-foreground` 등 — shadcn 컴포넌트가
  // 기대하는 변수명을 Porest 토큰으로 alias)
  const bridgePath = resolve(ROOT, "recipes/shadcn/styles/porest-shadcn-bridge.css");
  const bridgeCss = existsSync(bridgePath) ? readFileSync(bridgePath, "utf8") : "";

  // === rootCss: 외부 stylesheet ===
  const rootCss = [
    "/* Generated by scripts/build-site.mjs — :root fallback (FOUC 방지) */",
    "/* Tailwind v4 CDN이 처리하기 전에도 브라우저가 즉시 CSS variable 적용 */",
    "",
    rootBlock,
    "",
    brandOverride(hr, "hr"),
    "",
    brandOverride(desk, "desk"),
    "",
    darkBlock,
    "",
    keyframes,
    "",
    bridgeCss,
  ].join("\n");

  // === tailwindBlock: 인라인 <style type="text/tailwindcss"> ===
  // Tailwind v4 CDN이 @theme 블록을 읽어 utility class(.bg-primary 등) 생성.
  // brand override / dark mode block도 같이 포함 — Tailwind가 인라인 style 안에서 모두 인식.
  const tailwindBlock = [
    defaultWithFallback,  // @theme {} 블록 그대로
    "",
    brandOverride(hr, "hr"),
    "",
    brandOverride(desk, "desk"),
    "",
    darkBlock,
    "",
    bridgeCss,
  ].join("\n");

  return { rootCss, tailwindBlock };
}


// ============================================================
// 2. 사이트 layout CSS (sidebar / topbar / content)
// ============================================================

function siteCss() {
  return `
:root { color-scheme: light dark; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-sans);
  margin: 0;
  background: var(--color-bg-page);
  color: var(--color-text-primary);
  font-size: var(--text-body-md);
  line-height: var(--text-body--line-height);
  letter-spacing: var(--text-body--letter-spacing);
  /* macOS subpixel antialiasing 끄고 grayscale로 — preview-html과 시각 통일(얇은 Toss 톤).
     기본 subpixel은 한글 같은 두께 글꼴을 더 굵게 보이게 함. */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* === Thin scrollbar (porest-desk-front 톤 정합) ===
   - WebKit/Blink(::-webkit-scrollbar): 6px width + border-strong pill thumb + transparent track
   - Firefox(W3C CSS Scrollbars Module L1): scrollbar-width: thin + scrollbar-color
   - .scrollbar-hide utility: 스크롤바 완전 숨김 (filter chip carousel 등 opt-in) */
* { scrollbar-width: thin; scrollbar-color: var(--color-border-strong) transparent; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-border-strong); border-radius: var(--radius-full); }
::-webkit-scrollbar-thumb:hover { background: var(--color-border-strong); }
.scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }

/* === Layout === */
.app { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
.sidebar {
  border-inline-end: 1px solid var(--color-border-default);
  background: var(--color-surface-default);
  padding: 24px 16px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.main { min-width: 0; }
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-bottom: 1px solid var(--color-border-default);
  background: var(--color-surface-default);
  position: sticky; top: 0; z-index: 100;
}
.content {
  padding: 48px 56px 96px;
  max-width: 920px;
}

/* === Sidebar === */
.brand-row { display: flex; align-items: center; gap: 8px; padding: 4px 8px 24px; }
.brand-row strong { font-size: var(--text-title-md); font-weight: 700; color: var(--color-primary); letter-spacing: -0.01em; }
.brand-row .brand-tag { font-size: var(--text-label-sm); padding: 2px 8px; border-radius: var(--radius-sm); background: var(--color-surface-input); color: var(--color-text-tertiary); font-weight: 600; }

.nav-section { margin-bottom: 24px; }
.nav-eyebrow {
  font-size: var(--text-label-sm);
  font-weight: 700;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0 12px;
  margin-bottom: 8px;
}
.nav-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.nav-list a {
  display: block;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-label-md);
  transition: all var(--motion-duration-fast) var(--motion-ease-out);
}
.nav-list a:hover { background: var(--color-surface-input); color: var(--color-text-primary); }
.nav-list a[aria-current="page"] {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  font-weight: 600;
}
.nav-list a.disabled { color: var(--color-text-disabled); cursor: not-allowed; pointer-events: none; }
.nav-list a .badge-soon { font-size: 10px; padding: 1px 6px; background: var(--color-surface-input); border-radius: var(--radius-full); margin-inline-start: 6px; color: var(--color-text-tertiary); font-weight: 500; }

/* === Topbar controls === */
.crumbs { font-size: var(--text-caption); color: var(--color-text-tertiary); display: flex; align-items: center; gap: 6px; }
.crumbs a { color: var(--color-text-secondary); text-decoration: none; }
.crumbs a:hover { color: var(--color-text-primary); }
.crumbs span { color: var(--color-text-tertiary); }

.controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.brand-switch { display: inline-flex; padding: 3px; background: var(--color-surface-input); border-radius: var(--radius-full); gap: 2px; flex-shrink: 0; }
.sidebar .brand-switch { display: none; margin: 0 4px 16px; }
.brand-switch button {
  border: 0; background: transparent;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-label-sm); font-weight: 600;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all var(--motion-duration-fast) var(--motion-ease-out);
  white-space: nowrap;
}
.brand-switch button[aria-pressed="true"] {
  background: var(--color-surface-default);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
.theme-toggle {
  border: 1px solid var(--color-border-default);
  background: var(--color-surface-default);
  border-radius: var(--radius-full);
  padding: 4px 10px;
  cursor: pointer;
  font-size: var(--text-label-sm); font-weight: 500;
  color: var(--color-text-secondary);
  display: inline-flex; align-items: center; gap: 6px;
  flex-shrink: 0;
  white-space: nowrap;
}
.theme-toggle:hover { color: var(--color-text-primary); }
.theme-toggle-label { display: inline; }

/* === Content typography === */
.content h1 {
  font-size: var(--text-display-md);
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.content .lede {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  margin: 0 0 40px;
  line-height: 1.6;
}
/* 직접 자식 selector로 격리 — spec-section 안의 h2, example-preview 안의
   DialogTitle(h2)에 무차별 적용되어 양쪽 라인 충돌이 생겼던 문제 fix. */
.content > h2 {
  font-size: var(--text-display-sm);
  font-weight: 700;
  margin: 56px 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border-default);
  letter-spacing: -0.01em;
}
.content h3 { font-size: var(--text-title-md); font-weight: 600; margin: 32px 0 12px; }
.content h4 { font-size: var(--text-title-sm); font-weight: 600; margin: 24px 0 8px; color: var(--color-text-secondary); }
.content p { margin: 12px 0; color: var(--color-text-primary); }
.content code {
  background: var(--color-surface-input);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.9em;
}
.content pre {
  margin: 16px 0;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  overflow-x: auto;
  background: var(--color-surface-default);
  border: 1px solid var(--color-border-default);
  font-size: 13px;
  line-height: 1.6;
}
.content pre code { background: transparent; padding: 0; font-size: inherit; }
.content table { width: 100%; border-collapse: collapse; font-size: var(--text-caption); margin: 16px 0; }
.content thead { background: var(--color-surface-input); }
.content th, .content td { padding: 10px 12px; text-align: start; border-bottom: 1px solid var(--color-border-default); }
.content th { font-weight: 600; color: var(--color-text-secondary); }

/* === Hero (landing) === */
.hero {
  padding: 80px 0 48px;
  border-bottom: 1px solid var(--color-border-default);
  margin-bottom: 64px;
}
.hero-eyebrow {
  display: inline-block;
  font-size: var(--text-label-sm);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
}
.hero h1 {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 20px;
}
.hero p {
  font-size: var(--text-body-lg);
  line-height: 1.6;
  max-width: 640px;
  color: var(--color-text-secondary);
  margin: 0 0 32px;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-size: var(--text-body-md); font-weight: 600;
  cursor: pointer; border: 0;
  font-family: inherit;
  text-decoration: none;
  transition: all var(--motion-duration-fast) var(--motion-ease-out);
}
.btn--primary { background: var(--color-primary); color: var(--color-text-on-accent); }
.btn--primary:hover { box-shadow: var(--shadow-md); }
.btn--outline { background: transparent; color: var(--color-primary); border: 1px solid var(--color-primary); }
.btn--outline:hover { background: color-mix(in srgb, var(--color-primary) 6%, transparent); }
.btn--ghost { background: transparent; color: var(--color-text-primary); }
.btn--ghost:hover { background: var(--color-surface-input); }

/* === Brand identity cards === */
.identity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin: 32px 0;
}
.identity-card {
  background: var(--color-surface-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex; flex-direction: column; gap: 12px;
}
.identity-tag {
  display: inline-block;
  font-size: var(--text-label-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-tertiary);
}
.identity-card h3 { margin: 0; font-size: var(--text-title-sm); }
.identity-card p { margin: 0; color: var(--color-text-secondary); font-size: var(--text-label-md); line-height: 1.6; }
.identity-swatch {
  width: 56px; height: 56px;
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 700; font-size: 18px;
  box-shadow: var(--shadow-sm);
}

/* === Token page utilities === */
.swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin: 16px 0 32px; }
.swatch {
  background: var(--color-surface-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.swatch-color { height: 80px; }
.swatch-meta { padding: 12px; display: flex; flex-direction: column; gap: 2px; }
.swatch-name { font-size: var(--text-label-md); font-weight: 600; font-family: ui-monospace, monospace; }
.swatch-hex { font-size: var(--text-label-sm); color: var(--color-text-tertiary); font-family: ui-monospace, monospace; }

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 16px 0;
}
.spec-card {
  background: var(--color-surface-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: 20px;
}
.spec-card h4 { margin: 0 0 12px; font-size: var(--text-label-md); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.06em; font-family: ui-monospace, monospace; }

.type-row {
  display: grid; grid-template-columns: 200px 1fr; gap: 24px;
  align-items: baseline;
  padding: 20px 0;
  border-bottom: 1px solid var(--color-border-default);
}
.type-row:last-child { border-bottom: 0; }
.type-row .meta { font-size: var(--text-label-sm); color: var(--color-text-tertiary); font-family: ui-monospace, monospace; line-height: 1.6; }
.type-row .meta strong { color: var(--color-text-primary); display: block; margin-bottom: 4px; }
.type-row .sample { color: var(--color-text-primary); }

.spacing-row {
  display: grid; grid-template-columns: 80px 100px 1fr; gap: 16px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border-default);
}
.spacing-row:last-child { border-bottom: 0; }
.spacing-name { font-family: ui-monospace, monospace; font-size: var(--text-label-md); font-weight: 600; }
.spacing-value { font-size: var(--text-caption); color: var(--color-text-tertiary); font-family: ui-monospace, monospace; }
.spacing-bar { height: 24px; background: color-mix(in srgb, var(--color-primary) 30%, transparent); border-radius: var(--radius-sm); }

.radius-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; margin: 16px 0; }
.radius-card { background: var(--color-surface-default); padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); }
.radius-shape { width: 80px; height: 80px; background: var(--color-primary); }

.shadow-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin: 24px 0; padding: 32px; background: var(--color-bg-page); border-radius: var(--radius-md); }
.shadow-card { background: var(--color-surface-default); border-radius: var(--radius-md); padding: 24px; text-align: center; }

.motion-card { background: var(--color-surface-default); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); padding: 20px; display: flex; flex-direction: column; gap: 12px; align-items: center; }
.motion-name { font-family: ui-monospace, monospace; font-size: var(--text-label-md); font-weight: 600; }
.motion-value { font-size: var(--text-label-sm); color: var(--color-text-tertiary); font-family: ui-monospace, monospace; }
.motion-demo { width: 56px; height: 56px; border-radius: var(--radius-md); background: var(--color-primary); }

@keyframes site-fade-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes site-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }

.bp-row { display: grid; grid-template-columns: 120px 100px 1fr; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--color-border-default); align-items: center; }
.bp-row:last-child { border-bottom: 0; }
.bp-name { font-family: ui-monospace, monospace; font-weight: 600; }
.bp-value { color: var(--color-text-tertiary); font-family: ui-monospace, monospace; font-size: var(--text-caption); }
.bp-note { color: var(--color-text-secondary); font-size: var(--text-label-md); }

.zindex-stack { position: relative; height: 280px; background: var(--color-bg-page); border-radius: var(--radius-md); padding: 16px; overflow: hidden; }
.zindex-card {
  position: absolute;
  background: var(--color-surface-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  box-shadow: var(--shadow-md);
  font-size: var(--text-caption);
  font-family: ui-monospace, monospace;
  font-weight: 600;
}

/* === Component pages === */
.component-meta { display: flex; gap: 16px; margin: 16px 0 32px; padding-bottom: 16px; border-bottom: 1px solid var(--color-border-default); flex-wrap: wrap; }
.component-meta a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  font-size: var(--text-caption);
  color: var(--color-text-secondary);
  text-decoration: none;
  background: var(--color-surface-default);
  transition: all var(--motion-duration-fast) var(--motion-ease-out);
}
.component-meta a:hover { color: var(--color-primary); border-color: var(--color-primary); }
.component-meta a.tag {
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  border-color: transparent;
  color: var(--color-primary);
  font-weight: 600;
  pointer-events: none;
}

.example-block {
  margin: 16px 0 32px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface-default);
}
.example-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--color-surface-input);
  border-bottom: 1px solid var(--color-border-default);
}
.example-tabs { display: inline-flex; gap: 0; }
.example-tab {
  font-size: var(--text-label-sm);
  font-weight: 600;
  padding: 4px 12px;
  background: transparent;
  border: 0;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.example-tab[aria-selected="true"] { background: var(--color-surface-default); color: var(--color-primary); box-shadow: var(--shadow-sm); }
.example-copy {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: var(--text-label-sm);
  color: var(--color-text-secondary);
  font-family: inherit;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
}
.example-copy:hover { color: var(--color-text-primary); background: var(--color-surface-default); }
.example-copy.copied { color: var(--color-success); }
.example-block pre { margin: 0; padding: 16px 20px; background: transparent; border: 0; border-radius: 0; }
.example-block pre code { background: transparent; padding: 0; }
.example-label { font-size: var(--text-label-sm); color: var(--color-text-tertiary); padding: 6px 16px 12px; font-style: italic; }
/* font-family 명시 — Tailwind v4 browser CDN의 preflight가 body font-family를
   override할 수 있어, preview wrapper에서 Pretendard을 강제로 다시 인용. */
.example-preview { padding: 32px 24px; background: var(--color-bg-page); min-height: 120px; display: flex; align-items: center; justify-content: center; font-family: var(--font-sans); }
.example-preview > .preview-frame { width: 100%; max-width: 600px; }
.example-code { background: var(--color-surface-default); }

.callout {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-inline-start: 3px solid var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin: 16px 0;
  font-size: var(--text-label-md);
}
.callout strong { color: var(--color-primary); }

/* === Mobile === */
.mobile-toggle { display: none; }
.mobile-overlay { display: none; }
@media (max-width: 880px) {
  .app { grid-template-columns: 1fr; }
  .sidebar { position: fixed; inset: 0 30% 0 0; z-index: 200; transform: translateX(-100%); transition: transform var(--motion-duration-base) var(--motion-ease-out); box-shadow: var(--shadow-xl); }
  .sidebar[data-open="true"] { transform: translateX(0); }
  .topbar { padding: 12px 16px; gap: 8px; }
  .content { padding: 32px 16px 64px; }
  .mobile-toggle { display: inline-flex; }
  .mobile-overlay[data-open] { display: block; position: fixed; inset: 0; background: var(--overlay-dim-light); z-index: 150; }
  /* 좁은 viewport — crumbs 줄임, theme 라벨 숨김, brand-switch 컴팩트 */
  .crumbs { min-width: 0; overflow: hidden; }
  .crumbs > a:not(:last-child), .crumbs > span:not(:last-child) { display: none; }
  .theme-toggle-label { display: none; }
  .theme-toggle { padding: 4px 8px; }
  .brand-switch button { padding: 4px 8px; }
}
@media (max-width: 600px) {
  /* 더 좁아지면 topbar brand-switch 숨김 — sidebar 안에서 표시 */
  .topbar .brand-switch { display: none; }
  .sidebar .brand-switch { display: inline-flex; align-self: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* === Spec section (M3 톤 detailed spec, specs/components/*.md 렌더) === */
.spec-section {
  margin: 32px 0 48px;
  padding: 24px;
  border: 1px solid var(--color-border-default);
  border-radius: 12px;
  background: var(--color-surface-default);
}
.spec-section > h1:first-child {
  margin-top: 0;
  font-size: var(--text-display-sm);
  line-height: var(--text-display-sm--line-height);
  font-weight: 700;
  color: var(--color-text-primary);
}
.spec-section h2 {
  margin: 32px 0 12px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-default);
  font-size: var(--text-title-lg);
  line-height: var(--text-title-lg--line-height);
  font-weight: 600;
  color: var(--color-text-primary);
}
.spec-section h3 {
  margin: 20px 0 8px;
  font-size: var(--text-title-md);
  line-height: var(--text-title-md--line-height);
  font-weight: 600;
  color: var(--color-text-primary);
}
.spec-section h4 {
  margin: 16px 0 6px;
  font-size: var(--text-title-sm);
  line-height: var(--text-title-sm--line-height);
  font-weight: 600;
  color: var(--color-text-primary);
}
.spec-section p {
  margin: 0 0 12px;
  font-size: var(--text-body-md);
  line-height: var(--text-body-md--line-height);
  color: var(--color-text-primary);
}
.spec-section ul {
  margin: 0 0 12px;
  padding-left: 20px;
}
.spec-section li {
  margin: 4px 0;
  font-size: var(--text-body-md);
  line-height: var(--text-body-md--line-height);
  color: var(--color-text-primary);
}
.spec-section blockquote {
  margin: 0 0 16px;
  padding: 12px 16px;
  border-left: 3px solid var(--color-border-focus);
  background: color-mix(in srgb, var(--color-border-focus) 6%, transparent);
  border-radius: 0 4px 4px 0;
  font-size: var(--text-body-md);
  line-height: var(--text-body-md--line-height);
  color: var(--color-text-primary);
}
.spec-section code {
  padding: 1px 6px;
  background: var(--color-surface-input);
  border-radius: 3px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
  color: var(--color-text-primary);
}
.spec-section pre {
  margin: 12px 0 16px;
  padding: 16px;
  background: var(--color-surface-input);
  border-radius: 8px;
  overflow-x: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--text-body-sm);
  line-height: 1.6;
  color: var(--color-text-primary);
}
.spec-section pre code {
  padding: 0;
  background: transparent;
  border-radius: 0;
}
.spec-section table.spec-table {
  width: 100%;
  margin: 8px 0 16px;
  border-collapse: collapse;
  font-size: var(--text-body-sm);
  line-height: 1.5;
}
.spec-section table.spec-table thead {
  background: var(--color-surface-input);
}
.spec-section table.spec-table th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border-default);
}
.spec-section table.spec-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border-default);
  color: var(--color-text-primary);
  vertical-align: top;
}
.spec-section table.spec-table tbody tr:last-child td {
  border-bottom: 0;
}
.spec-section a {
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
  text-underline-offset: 2px;
}
.spec-section a:hover {
  text-decoration-color: var(--color-primary);
}
.tag-spec {
  background: color-mix(in srgb, var(--color-border-focus) 12%, transparent);
  color: var(--color-primary);
  border: 1px solid color-mix(in srgb, var(--color-border-focus) 30%, transparent);
}
`;
}

// ============================================================
// 3. 사이트 JS — brand toggle / theme toggle / mobile nav
// ============================================================

function siteJs() {
  return `
(function() {
  // Theme toggle
  function applyTheme(t) { document.documentElement.setAttribute("data-theme", t); }
  function getTheme() {
    try { return localStorage.getItem("porest-theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
    catch(e) { return "light"; }
  }
  applyTheme(getTheme());
  document.addEventListener("click", function(e) {
    var btn = e.target.closest(".theme-toggle");
    if (!btn) return;
    var c = document.documentElement.getAttribute("data-theme");
    var n = c === "dark" ? "light" : "dark";
    applyTheme(n);
    try { localStorage.setItem("porest-theme", n); } catch(e) {}
  });

  // Brand toggle
  function applyBrand(b) {
    document.documentElement.setAttribute("data-brand", b);
    document.querySelectorAll(".brand-switch button").forEach(function(btn) {
      btn.setAttribute("aria-pressed", btn.dataset.brand === b ? "true" : "false");
    });
    document.querySelectorAll(".brand-tag").forEach(function(tag) {
      tag.textContent = b === "hr" ? "HR" : b === "desk" ? "Desk" : "Default";
    });
  }
  function getBrand() {
    try { return localStorage.getItem("porest-brand") || "default"; }
    catch(e) { return "default"; }
  }
  applyBrand(getBrand());
  document.addEventListener("click", function(e) {
    var btn = e.target.closest(".brand-switch button");
    if (!btn) return;
    var b = btn.dataset.brand;
    if (!b) return;
    applyBrand(b);
    try { localStorage.setItem("porest-brand", b); } catch(e) {}
  });

  // Mobile sidebar
  function syncOverlay(open) {
    var ov = document.querySelector(".mobile-overlay");
    if (!ov) return;
    if (open) ov.setAttribute("data-open", "");
    else ov.removeAttribute("data-open");
  }
  document.addEventListener("click", function(e) {
    var t = e.target.closest(".mobile-toggle");
    var ov = e.target.closest(".mobile-overlay");
    var sb = document.querySelector(".sidebar");
    if (!sb) return;
    if (t) {
      var open = sb.getAttribute("data-open") === "true";
      var next = open ? "false" : "true";
      sb.setAttribute("data-open", next);
      syncOverlay(next === "true");
    } else if (ov) {
      sb.setAttribute("data-open", "false");
      syncOverlay(false);
    }
  });

  // Code copy
  document.addEventListener("click", function(e) {
    var btn = e.target.closest(".example-copy");
    if (!btn) return;
    var pre = btn.closest(".example-block").querySelector("pre code");
    if (!pre) return;
    var text = pre.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(function() { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 1600);
      });
    }
  });

  // Example Preview / Code 탭 toggle
  document.addEventListener("click", function(e) {
    var tab = e.target.closest(".example-tab");
    if (!tab) return;
    var which = tab.dataset.tab;
    var block = tab.closest(".example-block");
    if (!block) return;
    block.querySelectorAll(".example-tab").forEach(function(t) {
      t.setAttribute("aria-selected", t.dataset.tab === which ? "true" : "false");
    });
    block.querySelectorAll("[data-pane]").forEach(function(p) {
      p.hidden = p.dataset.pane !== which;
    });
  });
})();
`;
}

// ============================================================
// 4. 공통 layout 래퍼
// ============================================================

// NAV는 빌드 시 컴포넌트로부터 동적 구성. buildNav()에서 호출.
let NAV = null;

function buildNav(components) {
  // Components 카테고리별 그룹화
  const byCategory = {};
  for (const c of components) {
    const cat = COMPONENT_CATEGORIES[c.slug];
    if (!cat) continue;
    byCategory[cat.category] = byCategory[cat.category] || [];
    byCategory[cat.category].push({ ...c, sort: cat.sort });
  }
  for (const k of Object.keys(byCategory)) {
    byCategory[k].sort((a, b) => a.sort - b.sort);
  }

  const nav = {
    "Getting Started": [
      { label: "Introduction", href: "/index.html" },
      { label: "Brand identity", href: "/index.html#brand-identity" },
      { label: "Quick start", href: "/index.html#quick-start" },
    ],
    "Tokens": [
      { label: "Colors", href: "/tokens/colors.html" },
      { label: "Typography", href: "/tokens/typography.html" },
      { label: "Spacing", href: "/tokens/spacing.html" },
      { label: "Radius", href: "/tokens/radius.html" },
      { label: "Shadows", href: "/tokens/shadows.html" },
      { label: "Motion", href: "/tokens/motion.html" },
      { label: "Breakpoints", href: "/tokens/breakpoints.html" },
      { label: "Z-index", href: "/tokens/z-index.html" },
    ],
  };

  // Components 카테고리를 sub-section으로
  for (const cat of CATEGORY_ORDER) {
    if (!byCategory[cat]) continue;
    nav[`Components — ${cat}`] = byCategory[cat].map(c => ({
      label: c.name,
      href: `/components/${c.slug}.html`,
    }));
  }

  nav["Examples"] = [{ label: "Coming soon (Phase 3)", soon: true }];

  return nav;
}

function renderSidebar(currentPath) {
  // 디렉토리 깊이 따라 상대 경로 prefix 계산
  const segments = currentPath.split("/").filter(Boolean).slice(0, -1).length;
  const prefix = segments === 0 ? "." : "..".repeat(segments - 1) + "..";

  function abs(href) {
    if (!href) return "#";
    return prefix + href;
  }

  let out = '<aside class="sidebar" aria-label="문서 네비게이션">';
  out += `<div class="brand-row"><strong>Porest</strong><span class="brand-tag">Default</span></div>`;
  // 좁은 viewport에서 topbar의 brand-switch가 숨겨졌을 때 sidebar 안에서 사용 가능
  out += `<div class="brand-switch" role="group" aria-label="브랜드 전환 (사이드바)">
    <button data-brand="default" aria-pressed="true" type="button">Default</button>
    <button data-brand="hr" aria-pressed="false" type="button">HR</button>
    <button data-brand="desk" aria-pressed="false" type="button">Desk</button>
  </div>`;
  for (const [section, items] of Object.entries(NAV)) {
    out += `<div class="nav-section"><div class="nav-eyebrow">${escape(section)}</div><ul class="nav-list">`;
    for (const it of items) {
      const href = it.href ? abs(it.href) : "#";
      const active = it.href && currentPath === it.href ? ' aria-current="page"' : "";
      const cls = it.soon ? "disabled" : "";
      const badge = it.soon ? '<span class="badge-soon">soon</span>' : "";
      out += `<li><a href="${escape(href)}" class="${cls}"${active}>${escape(it.label)}${badge}</a></li>`;
    }
    out += "</ul></div>";
  }
  out += "</aside>";
  return out;
}

function renderTopbar(currentPath, breadcrumb) {
  const segments = currentPath.split("/").filter(Boolean).slice(0, -1).length;
  const prefix = segments === 0 ? "." : "..".repeat(segments - 1) + "..";
  const home = prefix + "/index.html";

  let crumbs = `<a href="${escape(home)}">Porest</a>`;
  for (const c of breadcrumb) {
    crumbs += `<span>/</span>`;
    if (c.href) crumbs += `<a href="${escape(prefix + c.href)}">${escape(c.label)}</a>`;
    else crumbs += `<span>${escape(c.label)}</span>`;
  }

  return `
  <header class="topbar">
    <div class="crumbs">
      <button class="theme-toggle mobile-toggle" type="button" aria-label="메뉴 열기">☰</button>
      ${crumbs}
    </div>
    <div class="controls">
      <div class="brand-switch" role="group" aria-label="브랜드 전환">
        <button data-brand="default" aria-pressed="true" type="button">Default</button>
        <button data-brand="hr" aria-pressed="false" type="button">HR</button>
        <button data-brand="desk" aria-pressed="false" type="button">Desk</button>
      </div>
      <button class="theme-toggle" type="button" aria-label="테마 전환">🌓<span class="theme-toggle-label"> Theme</span></button>
    </div>
  </header>`;
}

// 모든 페이지 공유 — build 시점에 한 번 계산되고 page() 안에서 참조
let TAILWIND_BLOCK = "";

function page({ title, currentPath, breadcrumb, body }) {
  const segments = currentPath.split("/").filter(Boolean).slice(0, -1).length;
  const prefix = segments === 0 ? "." : "..".repeat(segments - 1) + "..";
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)} — Porest Design</title>
  <link rel="stylesheet" href="${prefix}/assets/tokens.css">
  <link rel="stylesheet" href="${prefix}/assets/site.css">
  <!-- Tailwind v4 browser CDN — @theme 토큰 읽어 utility class 런타임 컴파일 -->
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <!-- Tailwind 처리 대상 — @theme + brand override + dark mode. 인라인이라 CDN이 정확히 읽음 -->
  <style type="text/tailwindcss">
${TAILWIND_BLOCK}
  </style>
</head>
<body>
  <div class="app">
    ${renderSidebar(currentPath)}
    <div class="main">
      ${renderTopbar(currentPath, breadcrumb)}
      <main class="content">
${body}
      </main>
    </div>
  </div>
  <div class="mobile-overlay" hidden></div>
  <script src="${prefix}/assets/site.js" defer></script>
</body>
</html>
`;
}

// ============================================================
// 5. Landing 페이지
// ============================================================

function pageLanding() {
  const body = `
<section class="hero" id="hero">
  <span class="hero-eyebrow">Porest Design System</span>
  <h1>사람과 일상이<br>숲처럼 자라나는 시스템</h1>
  <p>HR과 Desk, 두 서비스를 위한 단일 디자인 시스템. 한국어 우선, 전 연령 접근성, Toss 톤의 절제와 신뢰감을 레퍼런스로 삼아 토큰부터 컴포넌트까지 일관된 톤을 정의합니다.</p>
  <div class="hero-actions">
    <a class="btn btn--primary" href="./tokens/colors.html">토큰 둘러보기</a>
    <a class="btn btn--outline" href="https://github.com/lshdainty/porest-design">GitHub</a>
  </div>
</section>

<section id="brand-identity">
  <h2>두 브랜드</h2>
  <p class="lede">같은 baseline, 다른 톤. 한 시스템 안에서 두 서비스의 정체성을 분리합니다.</p>

  <div class="identity-grid">
    <div class="identity-card">
      <span class="identity-swatch" style="background: #357B5F;">HR</span>
      <span class="identity-tag">B2B · 조직 HR</span>
      <h3>Porest HR</h3>
      <p>인사·결재·평가의 절제된 데이터 밀도. 격식체 톤, 데스크탑 중심, forest green primary. 결재 큐의 명확한 위계와 직원 detail의 깊이.</p>
      <code>--color-primary: #357B5F</code>
    </div>
    <div class="identity-card">
      <span class="identity-swatch" style="background: #0147AD;">D</span>
      <span class="identity-tag">B2C · 메모/할일/가계부</span>
      <h3>Porest Desk</h3>
      <p>일상 메모와 할일의 친근한 모바일 톤. 친근체 부분 적용, bottom sheet · pull-to-refresh, cobalt blue primary. 매일의 기록을 단정하게.</p>
      <code>--color-primary: #0147AD</code>
    </div>
    <div class="identity-card">
      <span class="identity-swatch" style="background: #1A1F2E;">P</span>
      <span class="identity-tag">Baseline · 공유</span>
      <h3>Porest Default</h3>
      <p>두 브랜드 공통 토대. neutral 색상·타이포그래피·spacing·radius. brand-agnostic 컴포넌트의 reference. 새로운 brand 추가 시 진입점.</p>
      <code>baseline · 47 colors</code>
    </div>
  </div>
</section>

<section id="quick-start">
  <h2>Quick start</h2>
  <p class="lede">npm 설치 후 verify로 sync · lint · contrast 일괄 검증, build:preview / build:examples로 시각 카탈로그 + 사용 예제 페이지 생성.</p>
  <pre><code>npm install
npm run verify
npm run export:tailwind:all
npm run build:site</code></pre>

  <h3>핵심 가치</h3>
  <ul>
    <li><strong>한국어 우선</strong> — Pretendard 베이스, 본문 15/1.6 한국어 가독성 최적화</li>
    <li><strong>접근성</strong> — WCAG 1.4.3 (4.5:1) / 1.4.11 (3:1) / 2.5.5 (44×44 touch) 자동 검증</li>
    <li><strong>듀얼 브랜드</strong> — neutral baseline 공유 + brand 4 토큰만 fork (primary / primary-light / border-focus / border-focus-light)</li>
    <li><strong>외부 의존성 0</strong> — vanilla Node 도구, design.md spec 직접 파싱, Tailwind v4 native</li>
    <li><strong>다크 모드</strong> — light/dark pair 자동 검증 165 페어 (3 brand)</li>
  </ul>
</section>

<section id="numbers">
  <h2>현재 시스템</h2>
  <div class="spec-grid">
    <div class="spec-card">
      <h4>Tokens</h4>
      <p style="font-size: var(--text-title-md); font-weight: 700; color: var(--color-primary); margin: 0;">180+</p>
      <p style="margin: 4px 0 0; font-size: var(--text-caption); color: var(--color-text-tertiary);">colors · typography · spacing · radius · shadow · motion · breakpoint · touch · z-index · keyframes</p>
    </div>
    <div class="spec-card">
      <h4>Components</h4>
      <p style="font-size: var(--text-title-md); font-weight: 700; color: var(--color-primary); margin: 0;">80+</p>
      <p style="margin: 4px 0 0; font-size: var(--text-caption); color: var(--color-text-tertiary);">shadcn/ui ~100% coverage + Banner/Tag/Popover/File Upload/Treeview 누락 보강</p>
    </div>
    <div class="spec-card">
      <h4>Milestones</h4>
      <p style="font-size: var(--text-title-md); font-weight: 700; color: var(--color-primary); margin: 0;">v82</p>
      <p style="margin: 4px 0 0; font-size: var(--text-caption); color: var(--color-text-tertiary);">v1 → v82 누적 milestone, DESIGN.history/ milestone 백업 1:1</p>
    </div>
  </div>
</section>
`;
  return page({
    title: "Porest Design",
    currentPath: "/index.html",
    breadcrumb: [],
    body,
  });
}

// ============================================================
// 6. Token 페이지들
// ============================================================

function parseColorsBlock(md) {
  // YAML frontmatter colors block 추출
  const lines = md.split("\n");
  let start = -1, end = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (/^colors:\s*$/.test(lines[i])) { start = i; break; }
  }
  if (start === -1) return [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^---\s*$/.test(lines[i])) { end = i; break; }
    if (/^[a-z][a-zA-Z0-9_-]*:\s*$/.test(lines[i])) { end = i; break; }
  }
  const colors = [];
  let group = "general";
  for (let i = start + 1; i < end; i++) {
    const line = lines[i];
    const groupMatch = /^\s*#\s*===\s*(.+?)\s*===/.exec(line);
    if (groupMatch) { group = groupMatch[1]; continue; }
    const m = /^\s+([a-z][a-z0-9-]+):\s*"(#[0-9A-Fa-f]{6,8})"/.exec(line);
    if (m) colors.push({ name: m[1], hex: m[2], group });
  }
  return colors;
}

function pageColors() {
  const designMd = readFileSync(resolve(ROOT, "DESIGN.md"), "utf8");
  const colors = parseColorsBlock(designMd);

  // 그룹별 정렬
  const groupOrder = ["page", "surface", "text", "border", "semantic", "chart", "general"];
  const grouped = {};
  for (const c of colors) {
    let key = "general";
    if (c.name.startsWith("bg-")) key = "page";
    else if (c.name.startsWith("surface-")) key = "surface";
    else if (c.name.startsWith("text-")) key = "text";
    else if (c.name.startsWith("border-")) key = "border";
    else if (/^(success|error|warning|info)/.test(c.name)) key = "semantic";
    else if (c.name.startsWith("chart-")) key = "chart";
    grouped[key] = grouped[key] || [];
    grouped[key].push(c);
  }

  const groupTitles = {
    page: "Page background",
    surface: "Surface (default / input)",
    text: "Text (primary / secondary / tertiary / disabled / on-accent)",
    border: "Border (default / strong / focus)",
    semantic: "Semantic (success / error / warning / info)",
    chart: "Chart palette (10 categorical, light / dark variants)",
    general: "Other",
  };

  let groupsHtml = "";
  for (const k of groupOrder) {
    if (!grouped[k]) continue;
    groupsHtml += `<h3>${escape(groupTitles[k])}</h3>`;
    groupsHtml += `<div class="swatch-grid">`;
    for (const c of grouped[k]) {
      const isDark = c.name.endsWith("-dark");
      const isLight = c.name.endsWith("-light");
      const textColor = isDark || /^#[0-7][0-9a-f]{5}$/i.test(c.hex) ? "#fff" : "#000";
      groupsHtml += `<div class="swatch"><div class="swatch-color" style="background: ${c.hex}; color: ${textColor}; display: flex; align-items: center; justify-content: center; font-family: ui-monospace, monospace; font-size: 11px;">${escape(c.hex.toUpperCase())}</div><div class="swatch-meta"><span class="swatch-name">${escape(c.name)}</span></div></div>`;
    }
    groupsHtml += `</div>`;
  }

  const body = `
<h1>Colors</h1>
<p class="lede">Porest는 neutral baseline 47색 + brand 4색(primary / primary-light / border-focus / border-focus-light)으로 구성됩니다. 한국어 본문 4.5:1 대비비, UI 3:1을 모든 색 페어에 자동 검증합니다.</p>

<h2>브랜드 primary</h2>
<p>상단 토글로 Default / HR / Desk 전환하면 primary 색이 바뀌는 걸 확인할 수 있습니다. 4 토큰만 분기, 나머지는 모두 baseline 공유.</p>
<div class="swatch-grid">
  <div class="swatch"><div class="swatch-color" style="background: var(--color-primary); color: var(--color-text-on-accent); display: flex; align-items: center; justify-content: center; font-family: ui-monospace, monospace; font-size: 11px;">primary</div><div class="swatch-meta"><span class="swatch-name">--color-primary</span><span class="swatch-hex">brand-specific</span></div></div>
  <div class="swatch"><div class="swatch-color" style="background: var(--color-primary-light); color: var(--color-text-on-accent); display: flex; align-items: center; justify-content: center; font-family: ui-monospace, monospace; font-size: 11px;">primary-light</div><div class="swatch-meta"><span class="swatch-name">--color-primary-light</span><span class="swatch-hex">dark surface variant</span></div></div>
  <div class="swatch"><div class="swatch-color" style="background: var(--color-border-focus); color: var(--color-text-on-accent); display: flex; align-items: center; justify-content: center; font-family: ui-monospace, monospace; font-size: 11px;">border-focus</div><div class="swatch-meta"><span class="swatch-name">--color-border-focus</span><span class="swatch-hex">2px focus ring</span></div></div>
  <div class="swatch"><div class="swatch-color" style="background: var(--color-border-focus-light); color: var(--color-text-on-accent); display: flex; align-items: center; justify-content: center; font-family: ui-monospace, monospace; font-size: 11px;">border-focus-light</div><div class="swatch-meta"><span class="swatch-name">--color-border-focus-light</span><span class="swatch-hex">dark focus ring</span></div></div>
</div>

<h2>Baseline 47 colors</h2>
${groupsHtml}

<h2>WCAG 검증</h2>
<ul>
  <li><strong>1.4.3 Contrast (Minimum)</strong> — 본문 텍스트 4.5:1 (lint:all로 자동 검증)</li>
  <li><strong>1.4.11 Non-text Contrast</strong> — UI 컴포넌트 / focus indicator 3:1</li>
  <li><strong>1.4.3 Incidental</strong> — disabled / decorative 텍스트 예외 적용</li>
  <li>Dark mode: <code>npm run lint:dark:strict</code>로 165 페어 자동 검증 (3 brand)</li>
</ul>
`;
  return page({
    title: "Colors",
    currentPath: "/tokens/colors.html",
    breadcrumb: [{ label: "Tokens" }, { label: "Colors" }],
    body,
  });
}

function pageTypography() {
  // DESIGN.md typography 블록 파싱
  const md = readFileSync(resolve(ROOT, "DESIGN.md"), "utf8");
  const lines = md.split("\n");
  const types = [];
  let start = -1, end = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (/^typography:\s*$/.test(lines[i])) { start = i; break; }
  }
  if (start !== -1) {
    for (let i = start + 1; i < lines.length; i++) {
      if (/^---\s*$/.test(lines[i])) { end = i; break; }
      if (/^[a-z][a-zA-Z0-9_-]*:\s*$/.test(lines[i]) && !/^\s/.test(lines[i])) { end = i; break; }
    }
    let current = null;
    for (let i = start + 1; i < end; i++) {
      const line = lines[i];
      const nm = /^\s\s([a-z][a-z0-9-]+):\s*$/.exec(line);
      if (nm) {
        if (current) types.push(current);
        current = { name: nm[1] };
        continue;
      }
      const fm = /^\s\s\s\sfontSize:\s*"?(\d+px)"?/.exec(line);
      if (fm && current) current.fontSize = fm[1];
      const lh = /^\s\s\s\slineHeight:\s*"?([\d.]+)"?/.exec(line);
      if (lh && current) current.lineHeight = lh[1];
      const fw = /^\s\s\s\sfontWeight:\s*(\d+)/.exec(line);
      if (fw && current) current.fontWeight = fw[1];
      const ls = /^\s\s\s\sletterSpacing:\s*"?(-?[\d.]+(?:em|px)?)"?/.exec(line);
      if (ls && current) current.letterSpacing = ls[1];
    }
    if (current) types.push(current);
  }

  let rows = "";
  for (const t of types) {
    rows += `<div class="type-row">
      <div class="meta">
        <strong>${escape(t.name)}</strong>
        ${t.fontSize ? `${escape(t.fontSize)} / ` : ""}${t.lineHeight ? `${escape(t.lineHeight)} / ` : ""}${t.fontWeight ? escape(t.fontWeight) : ""}
        ${t.letterSpacing ? `<br>letter-spacing: ${escape(t.letterSpacing)}` : ""}
      </div>
      <div class="sample" style="font: var(--text-${t.name}--font-weight, 400) var(--text-${t.name}) / var(--text-${t.name}--line-height) var(--font-sans); letter-spacing: var(--text-${t.name}--letter-spacing, 0);">사람과 일상이 숲처럼 자라나는 디자인</div>
    </div>`;
  }

  const body = `
<h1>Typography</h1>
<p class="lede">Pretendard 한국어 우선, Inter 영문 fallback. 본문 15/1.6은 한국어 가독성 최적값 (Toss 베이스). 21종 스케일 — 한국어 + Airbnb 톤(display / title / nav-link / badge / uppercase-tag).</p>

<h2>Font family</h2>
<pre><code>--font-sans: "Pretendard", "Inter", system-ui, sans-serif;</code></pre>

<h2>Scale (${types.length}종)</h2>
${rows}

<h2>가이드</h2>
<ul>
  <li><strong>본문(body)</strong> — 한국어 15/1.6, 영문 16/1.5(body-md). letter-spacing 한국어 0, 영문 -0.01em</li>
  <li><strong>제목 위계</strong> — display-xl (Hero) / heading-xl (페이지 제목) / heading-lg (섹션) / heading-md (카드) / heading-sm (서브)</li>
  <li><strong>UI</strong> — caption-md (label) / caption (helper) / caption-sm (badge·메타) / button-md (버튼) / nav-link (사이드바 / 탭)</li>
  <li><strong>의미 기반</strong> — 크기·무게 직접 지정 금지. 토큰 이름으로만 사용</li>
</ul>
`;
  return page({
    title: "Typography",
    currentPath: "/tokens/typography.html",
    breadcrumb: [{ label: "Tokens" }, { label: "Typography" }],
    body,
  });
}

function pageSpacing() {
  const sizes = [
    { name: "xs", value: "4px" },
    { name: "sm", value: "8px" },
    { name: "md", value: "12px" },
    { name: "lg", value: "16px" },
    { name: "xl", value: "24px" },
    { name: "2xl", value: "32px" },
    { name: "3xl", value: "48px" },
  ];
  let rows = "";
  for (const s of sizes) {
    rows += `<div class="spacing-row">
      <div class="spacing-name">${escape(s.name)}</div>
      <div class="spacing-value">${escape(s.value)}</div>
      <div class="spacing-bar" style="width: ${s.value};"></div>
    </div>`;
  }
  const body = `
<h1>Spacing</h1>
<p class="lede">4px 베이스 7단계. 컴포넌트 padding / margin / gap을 일관되게 분배하기 위한 grid step. v62 Form layout(label↔control 4px / form-group 16px / section 24px) 기반.</p>

${rows}

<h2>사용 패턴</h2>
<ul>
  <li><code>xs</code> (4px) — icon ↔ text, label ↔ control, control ↔ helper</li>
  <li><code>sm</code> (8px) — chip 간격, badge padding, 작은 그룹</li>
  <li><code>md</code> (12px) — 카드 내부 그룹, list row gap</li>
  <li><code>lg</code> (16px) — form-group 간격, 카드 padding default</li>
  <li><code>xl</code> (24px) — section ↔ section, horizontal form label width gap</li>
  <li><code>2xl</code> (32px) — 페이지 본문 padding (데스크탑)</li>
  <li><code>3xl</code> (48px) — Hero 위/아래 여백, 페이지 단락</li>
</ul>
`;
  return page({
    title: "Spacing",
    currentPath: "/tokens/spacing.html",
    breadcrumb: [{ label: "Tokens" }, { label: "Spacing" }],
    body,
  });
}

function pageRadius() {
  const sizes = [
    { name: "xs", value: "2px" },
    { name: "sm", value: "4px" },
    { name: "md", value: "8px" },
    { name: "lg", value: "12px" },
    { name: "xl", value: "16px" },
    { name: "2xl", value: "20px" },
    { name: "full", value: "9999px" },
  ];
  let cards = "";
  for (const r of sizes) {
    cards += `<div class="radius-card">
      <div class="radius-shape" style="border-radius: ${r.value};"></div>
      <div class="spacing-name">${escape(r.name)}</div>
      <div class="spacing-value">${escape(r.value)}</div>
    </div>`;
  }
  const body = `
<h1>Radius</h1>
<p class="lede">spacing(4px 베이스)와 정렬된 7단계. xs(2px)부터 2xl(20px), full(알약·원형). 카드는 lg(12px), 버튼·input은 md(8px), 칩·badge는 sm(4px) 또는 full.</p>

<div class="radius-grid">${cards}</div>

<h2>사용 가이드</h2>
<ul>
  <li><code>xs</code> (2px) — 작은 tag, code highlight, sub-divider</li>
  <li><code>sm</code> (4px) — chip / badge default, 작은 input border</li>
  <li><code>md</code> (8px) — Button default, Input/Textarea default</li>
  <li><code>lg</code> (12px) — Card default, modal medium</li>
  <li><code>xl</code> (16px) — 큰 카드, modal large, sheet</li>
  <li><code>2xl</code> (20px) — Hero card, 강조 surface</li>
  <li><code>full</code> (9999px) — 알약 버튼, 아바타, 원형 icon button, chip pill</li>
</ul>
`;
  return page({
    title: "Radius",
    currentPath: "/tokens/radius.html",
    breadcrumb: [{ label: "Tokens" }, { label: "Radius" }],
    body,
  });
}

function pageShadows() {
  const shadows = [
    { name: "shadow-sm", desc: "subtle (border 대체)", use: "card hover, dropdown 미세 lift" },
    { name: "shadow-md", desc: "noticeable", use: "modal, dropdown panel, popover" },
    { name: "shadow-lg", desc: "prominent", use: "large modal, sheet" },
    { name: "shadow-xl", desc: "dramatic", use: "Hero overlay, floating action" },
  ];
  let cards = "";
  for (const s of shadows) {
    cards += `<div class="shadow-card" style="box-shadow: var(--${s.name});">
      <div style="font-family: ui-monospace, monospace; font-weight: 600;">${escape(s.name)}</div>
      <div style="font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: 4px;">${escape(s.desc)}</div>
      <div style="font-size: var(--text-label-sm); color: var(--color-text-secondary); margin-top: 8px;">${escape(s.use)}</div>
    </div>`;
  }
  const body = `
<h1>Shadows</h1>
<p class="lede">4단계 layered shadow (Material 3 / Big Sur 패턴). Tonal Layers(표면 휘도 차)가 1차 elevation 수단, shadow는 2차 보조. dark mode pair는 opacity 2~4배 강화 + inset white top highlight.</p>

<h2>Light surface</h2>
<div class="shadow-grid">${cards}</div>

<h2>토큰</h2>
<table>
<thead><tr><th>Token</th><th>레시피</th><th>주 사용</th></tr></thead>
<tbody>
<tr><td><code>shadow-sm</code></td><td>2-layer 미세 (1px + 4px blur)</td><td>card / dropdown 미세 lift</td></tr>
<tr><td><code>shadow-md</code></td><td>2-layer (4px + 8px blur)</td><td>modal / popover panel</td></tr>
<tr><td><code>shadow-lg</code></td><td>2-layer (12px + 24px blur)</td><td>large modal / sheet</td></tr>
<tr><td><code>shadow-xl</code></td><td>2-layer (24px + 48px blur)</td><td>Hero overlay / floating</td></tr>
</tbody>
</table>

<p>Dark mode 페어: <code>shadow-sm-dark</code> / <code>shadow-md-dark</code> / <code>shadow-lg-dark</code> / <code>shadow-xl-dark</code>. 표면 색이 어둡기 때문에 black opacity 2~4배 강화 + 1px 흰색 inset top highlight (광원 시뮬레이션).</p>

<p>spec(@google/design.md)이 shadow 토큰 타입을 정형화하지 않아 prose-token 패턴 — <code>scripts/build-tailwind-v4.mjs</code>의 <code>parseShadows</code>가 prose 표에서 직접 추출.</p>
`;
  return page({
    title: "Shadows",
    currentPath: "/tokens/shadows.html",
    breadcrumb: [{ label: "Tokens" }, { label: "Shadows" }],
    body,
  });
}

function pageMotion() {
  const durations = [
    { name: "motion-duration-fast", value: "150ms", use: "hover/focus 작은 전환" },
    { name: "motion-duration-base", value: "200ms", use: "drawer / dropdown default" },
    { name: "motion-duration-slow", value: "300ms", use: "modal / page transition" },
    { name: "motion-duration-slower", value: "500ms", use: "Hero / large layout shift" },
    { name: "motion-duration-loop", value: "1500ms", use: "skeleton / spinner / pulse" },
  ];
  const eases = [
    { name: "motion-ease-out", value: "cubic-bezier(0.16, 1, 0.3, 1)", use: "default — Toss · Material 공통" },
    { name: "motion-ease-linear", value: "linear", use: "loop 일정 속도" },
  ];

  let dRows = "";
  for (const d of durations) {
    dRows += `<div class="motion-card">
      <div class="motion-demo" style="animation: site-fade-in ${d.value} var(--motion-ease-out) infinite alternate;"></div>
      <div class="motion-name">${escape(d.name)}</div>
      <div class="motion-value">${escape(d.value)}</div>
      <div style="font-size: var(--text-label-sm); color: var(--color-text-secondary); text-align: center;">${escape(d.use)}</div>
    </div>`;
  }
  let eRows = "";
  for (const e of eases) {
    eRows += `<div class="motion-card">
      <div class="motion-demo" style="animation: site-spin var(--motion-duration-loop) ${e.value === 'linear' ? 'linear' : `var(--motion-ease-out)`} infinite;"></div>
      <div class="motion-name">${escape(e.name)}</div>
      <div class="motion-value" style="word-break: break-all; text-align: center;">${escape(e.value)}</div>
      <div style="font-size: var(--text-label-sm); color: var(--color-text-secondary); text-align: center;">${escape(e.use)}</div>
    </div>`;
  }

  const body = `
<h1>Motion</h1>
<p class="lede">5 duration + 2 easing + 14 keyframes. v32 단발 전환(hover/modal entrance) + v63 반복(skeleton/spinner) + v74 keyframe library(fade/slide/scale/bounce/shake/spin/pulse/shimmer/ping). brand-neutral.</p>

<h2>Duration (5종)</h2>
<div class="spec-grid">${dRows}</div>

<h2>Easing (2종)</h2>
<div class="spec-grid">${eRows}</div>

<h2>Keyframes (14종, v74)</h2>
<p>모두 baseline 정의(brand-neutral). <code>exports/tokens.css</code>에 자동 포함.</p>
<table>
<thead><tr><th>이름</th><th>구분</th><th>주 사용</th></tr></thead>
<tbody>
<tr><td><code>fade-in</code> / <code>fade-out</code></td><td>단발</td><td>dropdown / popover 등장 / 사라짐</td></tr>
<tr><td><code>slide-in-{up,down,left,right}</code></td><td>단발</td><td>drawer / sheet / toast 방향별 등장</td></tr>
<tr><td><code>scale-in</code> / <code>scale-out</code></td><td>단발</td><td>modal / dialog (scale 0.96 → 1)</td></tr>
<tr><td><code>bounce-in</code></td><td>단발</td><td>celebration · success indicator (over-shoot)</td></tr>
<tr><td><code>shake</code></td><td>단발</td><td>form validation error 강조</td></tr>
<tr><td><code>spin</code></td><td>loop</td><td>spinner · refresh icon</td></tr>
<tr><td><code>pulse</code></td><td>loop</td><td>dot indicator · attention</td></tr>
<tr><td><code>shimmer</code></td><td>loop</td><td>skeleton (linear-gradient translateX)</td></tr>
<tr><td><code>ping</code></td><td>loop</td><td>notification dot · alert</td></tr>
</tbody>
</table>

<h2>WCAG · prefers-reduced-motion</h2>
<pre><code>@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}</code></pre>
<p>2.3.3 Animation from Interactions: 200ms 초과 단발 + 모든 loop는 reduce 시 비활성. 컴포넌트 spec에서 일괄 적용.</p>
`;
  return page({
    title: "Motion",
    currentPath: "/tokens/motion.html",
    breadcrumb: [{ label: "Tokens" }, { label: "Motion" }],
    body,
  });
}

function pageBreakpoints() {
  const bps = [
    { name: "breakpoint-sm", value: "640px", note: "모바일 ↔ 큰 모바일 / 작은 태블릿 (Tailwind sm = 640)" },
    { name: "breakpoint-md", value: "736px", note: "태블릿 portrait — Apple Store reference. Tailwind md(768)와 다름" },
    { name: "breakpoint-lg", value: "834px", note: "태블릿 landscape (Apple iPad)" },
    { name: "breakpoint-xl", value: "1069px", note: "데스크탑 medium (Apple Store 메인 grid)" },
    { name: "breakpoint-2xl", value: "1441px", note: "데스크탑 large — Hero 8-column max grid" },
  ];
  let rows = "";
  for (const b of bps) {
    rows += `<div class="bp-row">
      <div class="bp-name">${escape(b.name)}</div>
      <div class="bp-value">${escape(b.value)}</div>
      <div class="bp-note">${escape(b.note)}</div>
    </div>`;
  }
  const body = `
<h1>Breakpoints</h1>
<p class="lede">5단계 viewport 분기. Apple Store 톤(640 / 736 / 834 / 1069 / 1441) — Tailwind v4 기본과 일부 다름. <code>--breakpoint-*</code> namespace는 Tailwind v4 표준.</p>

<h2>토큰</h2>
${rows}

<h2>적용 패턴</h2>
<ul>
  <li><strong>모바일 우선</strong> (Desk B2C) — base는 모바일, <code>@media (min-width: var(--breakpoint-md))</code>로 데스크탑 분기</li>
  <li><strong>데스크탑 우선</strong> (HR B2B) — base 데스크탑, <code>@media (max-width: var(--breakpoint-md))</code>로 모바일 적응</li>
  <li>Form layout: stacked → horizontal 전환 = <code>breakpoint-md</code> 기준</li>
  <li>Hero typography: 4단계 scale (display-xl ↔ heading-md) 분기</li>
</ul>
`;
  return page({
    title: "Breakpoints",
    currentPath: "/tokens/breakpoints.html",
    breadcrumb: [{ label: "Tokens" }, { label: "Breakpoints" }],
    body,
  });
}

function pageZIndex() {
  const layers = [
    { name: "z-base", value: 0, label: "default 평면" },
    { name: "z-dropdown", value: 1000, label: "dropdown / select panel / autocomplete / tooltip" },
    { name: "z-sticky", value: 1100, label: "sticky header / sticky reservation rail / CTA" },
    { name: "z-drawer", value: 1200, label: "drawer / side panel / bottom sheet" },
    { name: "z-modal", value: 1300, label: "modal dialog + overlay-dim" },
    { name: "z-toast", value: 1400, label: "toast / snackbar (모든 layer 위)" },
  ];
  let rows = "";
  for (let i = 0; i < layers.length; i++) {
    const l = layers[i];
    rows += `<div class="bp-row" style="--row-i: ${i};">
      <div class="bp-name">${escape(l.name)}</div>
      <div class="bp-value">${l.value}</div>
      <div class="bp-note">${escape(l.label)}</div>
    </div>`;
  }

  let stackCards = "";
  layers.slice().reverse().forEach((l, i) => {
    const top = 16 + i * 32;
    const left = 16 + i * 32;
    stackCards += `<div class="zindex-card" style="top: ${top}px; left: ${left}px; z-index: ${l.value};">${escape(l.name)} — ${l.value}</div>`;
  });

  const body = `
<h1>Z-index</h1>
<p class="lede">6단계 layering. 100 단위 간격 — 중간 layer 삽입 여유. v43 Modal / v45 Dropdown / v46 Toast 등 spec의 prose 표현(최상단/위)을 정형 numeric 토큰화.</p>

<h2>Layer stack</h2>
<div class="zindex-stack">${stackCards}</div>

<h2>토큰</h2>
${rows}

<h2>충돌 우선순위</h2>
<pre><code>z-toast (1400) &gt; z-modal (1300) &gt; z-drawer (1200) &gt; z-sticky (1100) &gt; z-dropdown (1000) &gt; z-base (0)</code></pre>

<p>직관: 사용자 알림(toast)은 모달 위, 모달은 drawer 위, drawer는 sticky 위. dropdown은 페이지 콘텐츠 위지만 다른 layered 컴포넌트보단 아래.</p>

<p>중간 layer 필요 시: dropdown 내부 nested submenu(<code>1010</code>), modal 내부 dropdown(<code>1310</code>) 등 100 단위 사이 활용. 별도 토큰 정의는 사용 사례 등장 후.</p>

<p>Component island 격리: 부모에 <code>isolation: isolate</code> 권장 — z-index scope를 island로 격리해 다른 island와 우선순위 충돌 회피.</p>
`;
  return page({
    title: "Z-index",
    currentPath: "/tokens/z-index.html",
    breadcrumb: [{ label: "Tokens" }, { label: "Z-index" }],
    body,
  });
}

// ============================================================
// 7. EXAMPLES.md 파서 + 컴포넌트 페이지
// ============================================================

function slugify(s) {
  return s.toLowerCase()
    .replace(/[\/&]/g, "-")
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// EXAMPLES.md → 섹션 배열. 각 섹션 = { name, slug, paragraphs, examples: [{ lang, code }] }
function parseExamplesMd() {
  const md = readFileSync(resolve(ROOT, "EXAMPLES.md"), "utf8");
  const lines = md.split("\n");
  const sections = [];
  let current = null;
  let inCode = false;
  let codeBuf = [];
  let codeLang = "";
  let proseBuf = [];

  function flushProse() {
    if (current && proseBuf.length > 0) {
      const text = proseBuf.join("\n").trim();
      if (text) {
        // 코드 직후 prose는 example label로, 그 외는 paragraph로
        if (current.examples.length > 0 && !current.examples[current.examples.length - 1].label && proseBuf.length <= 3) {
          current.examples[current.examples.length - 1].label = text;
        } else {
          current.paragraphs.push(text);
        }
      }
      proseBuf = [];
    }
  }

  for (const line of lines) {
    // h2 = section
    const h = /^##\s+(.+)$/.exec(line);
    if (h && !inCode) {
      flushProse();
      const name = h[1].trim();
      // Skip 목차 / 다음 참조 / 토큰 alias 안내 등 meta 섹션
      if (/^(목차|다음 참조|토큰 alias 안내)/.test(name)) {
        current = null;
        continue;
      }
      current = { name, slug: slugify(name), paragraphs: [], examples: [] };
      sections.push(current);
      continue;
    }
    if (line.startsWith("```")) {
      if (!inCode) {
        flushProse();
        inCode = true;
        codeLang = line.slice(3).trim() || "html";
        codeBuf = [];
      } else {
        if (current) {
          current.examples.push({ lang: codeLang, code: codeBuf.join("\n"), label: null });
        }
        inCode = false;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }
    if (line.startsWith("---") && line.replace(/-/g, "").trim() === "") continue;
    if (current) proseBuf.push(line);
  }
  flushProse();
  return sections;
}

// 카테고리 매핑 (slug → { category, sortKey })
// shadcn/ui 공식 컴포넌트 카탈로그 (49개) — https://ui.shadcn.com/docs/components
// 각 항목: slug, name, category, description.
// 페이지 1대1 매핑: 묶지 않음 (input-textarea 같은 묶음 폐기).
const SHADCN_CATALOG = [
  // Form (15)
  { slug: "button", name: "Button", category: "Form", description: "주요 액션을 트리거하는 버튼. variant 6종 × size 4종." },
  { slug: "checkbox", name: "Checkbox", category: "Form", description: "여러 선택 가능한 박스." },
  { slug: "combobox", name: "Combobox", category: "Form", description: "검색·필터 가능한 select." },
  { slug: "date-picker", name: "Date Picker", category: "Form", description: "calendar + popover 조합 날짜 선택." },
  { slug: "form", name: "Form", category: "Form", description: "react-hook-form + zod 통합 폼." },
  { slug: "input", name: "Input", category: "Form", description: "한 줄 텍스트 입력." },
  { slug: "input-otp", name: "Input OTP", category: "Form", description: "OTP / 인증 코드 입력." },
  { slug: "label", name: "Label", category: "Form", description: "form 레이블 (label-md, peer 인식)." },
  { slug: "radio-group", name: "Radio Group", category: "Form", description: "여러 옵션 중 하나만 선택." },
  { slug: "select", name: "Select", category: "Form", description: "옵션 드롭다운 — Radix Select 베이스." },
  { slug: "slider", name: "Slider", category: "Form", description: "범위 값 선택 슬라이더." },
  { slug: "switch", name: "Switch", category: "Form", description: "on/off 토글." },
  { slug: "textarea", name: "Textarea", category: "Form", description: "여러 줄 텍스트 입력." },
  { slug: "toggle", name: "Toggle", category: "Form", description: "on/off 버튼 (인라인)." },
  { slug: "toggle-group", name: "Toggle Group", category: "Form", description: "단일 또는 복수 선택 토글 그룹." },

  // Display (11)
  { slug: "aspect-ratio", name: "Aspect Ratio", category: "Display", description: "고정 비율 컨테이너 (16:9, 4:3 등)." },
  { slug: "avatar", name: "Avatar", category: "Display", description: "프로필 이미지 + fallback 텍스트." },
  { slug: "badge", name: "Badge", category: "Display", description: "상태·카테고리 마이크로 라벨." },
  { slug: "card", name: "Card", category: "Display", description: "콘텐츠 컨테이너 (header / content / footer)." },
  { slug: "carousel", name: "Carousel", category: "Display", description: "슬라이드 갤러리 — Embla 베이스." },
  { slug: "progress", name: "Progress", category: "Display", description: "진행률 막대 (determinate / indeterminate)." },
  { slug: "spinner", name: "Spinner", category: "Display", description: "원형 indeterminate 인디케이터 (shadcn 카탈로그 외, Porest 자체 정의)." },
  { slug: "resizable", name: "Resizable", category: "Display", description: "드래그로 크기 조절 가능 패널." },
  { slug: "scroll-area", name: "Scroll Area", category: "Display", description: "스타일된 스크롤 컨테이너." },
  { slug: "separator", name: "Separator", category: "Display", description: "콘텐츠 사이 구분선." },
  { slug: "skeleton", name: "Skeleton", category: "Display", description: "로딩 placeholder (shimmer)." },
  { slug: "typography", name: "Typography", category: "Display", description: "텍스트 위계 (h1~h4, p, blockquote, code)." },

  // Overlay (9)
  { slug: "alert", name: "Alert", category: "Overlay", description: "인라인 정보·경고 메시지." },
  { slug: "alert-dialog", name: "Alert Dialog", category: "Overlay", description: "확인이 필요한 위험 액션 다이얼로그." },
  { slug: "dialog", name: "Dialog", category: "Overlay", description: "모달 다이얼로그." },
  { slug: "drawer", name: "Drawer", category: "Overlay", description: "하단 슬라이드 패널 (모바일 친화)." },
  { slug: "hover-card", name: "Hover Card", category: "Overlay", description: "호버 시 표시되는 카드 (프로필 미리보기 등)." },
  { slug: "popover", name: "Popover", category: "Overlay", description: "트리거 클릭 시 떠오르는 패널." },
  { slug: "sheet", name: "Sheet", category: "Overlay", description: "사이드 슬라이드 패널." },
  { slug: "sonner", name: "Sonner", category: "Overlay", description: "토스트 알림 (shadcn 권장)." },
  { slug: "tooltip", name: "Tooltip", category: "Overlay", description: "호버 시 짧은 설명." },

  // Navigation (9)
  { slug: "breadcrumb", name: "Breadcrumb", category: "Navigation", description: "현재 위치 경로 표시." },
  { slug: "command", name: "Command", category: "Navigation", description: "Cmd+K 검색 팔레트 — cmdk 베이스." },
  { slug: "context-menu", name: "Context Menu", category: "Navigation", description: "우클릭 / 길게 누르기 메뉴." },
  { slug: "dropdown-menu", name: "Dropdown Menu", category: "Navigation", description: "트리거 클릭 시 드롭다운." },
  { slug: "menubar", name: "Menubar", category: "Navigation", description: "데스크탑 앱 스타일 메뉴 바." },
  { slug: "navigation-menu", name: "Navigation Menu", category: "Navigation", description: "메가 메뉴 / 글로벌 nav." },
  { slug: "pagination", name: "Pagination", category: "Navigation", description: "페이지 분할 네비." },
  { slug: "sidebar", name: "Sidebar", category: "Navigation", description: "사이드 네비게이션 (그룹/접기 지원)." },
  { slug: "tabs", name: "Tabs", category: "Navigation", description: "탭 네비게이션 (underline / pills)." },

  // Disclosure (2)
  { slug: "accordion", name: "Accordion", category: "Disclosure", description: "접고 펼치는 패널 (단일/다중)." },
  { slug: "collapsible", name: "Collapsible", category: "Disclosure", description: "콘텐츠 접고 펼치기 (단일)." },

  // Data (4)
  { slug: "calendar", name: "Calendar", category: "Data", description: "달력 위젯 — react-day-picker 베이스." },
  { slug: "chart", name: "Chart", category: "Data", description: "데이터 시각화 — Recharts 베이스." },
  { slug: "data-table", name: "Data Table", category: "Data", description: "정렬·필터·페이징 테이블 — TanStack Table 베이스." },
  { slug: "table", name: "Table", category: "Data", description: "기본 HTML 테이블 스타일." },

  // Porest 도메인 spec (5) — shadcn 카탈로그 외, desk-front SoT 역방향 정합
  { slug: "color-swatch", name: "Color Swatch", category: "Domain", description: "카테고리·라벨·태그 색 single-select 정사각형 grid (Porest 도메인 spec)." },
  { slug: "icon-picker", name: "Icon Picker", category: "Domain", description: "Lucide 2000+ 아이콘 popover + 8-col grid 단일 선택 (Porest 도메인 spec)." },
  { slug: "tile", name: "Tile", category: "Domain", description: "swatch + label + desc 의 큰 카드 single-select — 테마·표시 단위 (Porest 도메인 spec)." },
  { slug: "radio-list", name: "Radio List", category: "Domain", description: "full-width row stack + divide-y single-select — 통화·언어·국가 (Porest 도메인 spec)." },
  { slug: "searchable-list", name: "Searchable List", category: "Domain", description: "search input + 카드 list — 카드·은행·증권사 카탈로그 (Porest 도메인 spec)." },
];

const COMPONENT_CATEGORIES = Object.fromEntries(
  SHADCN_CATALOG.map((c, i) => [c.slug, { category: c.category, sort: i }])
);

const CATEGORY_ORDER = ["Form", "Display", "Overlay", "Navigation", "Disclosure", "Data", "Domain"];

// 컴포넌트 slug → preview.html render 함수 매핑
// 각 함수는 brand 객체 받아 <section> HTML 반환 (custom CSS 사용 — pageCss로 스타일링)
function getDemoFunctions(slug) {
  switch (slug) {
    case "button": return [renderButtonGallery];
    case "card": return [renderListingDetail];
    case "input-textarea": return [renderForm];
    case "form-layout-validation": return [renderForm, renderBatchV73V78];
    case "select-combobox": return [renderShadcnInput];
    case "checkbox-radio-switch": return [renderShadcnInput];
    case "modal-dialog": return [renderModal];
    case "drawer-sheet": return [renderBatchV67];
    case "toast-sonner": return [renderToasts, renderShadcnExtras];
    case "skeleton-spinner-progress": return [renderSkeleton, renderBatchV67];
    case "empty-state": return [renderEmptyState];
    case "calendar-date-range-picker": return [renderCalendar, renderShadcnExtras];
    case "tabs": return [renderVignettes];
    case "breadcrumb-sidebar": return [renderShadcnNav];
    case "pagination-stepper": return [renderBatchV67];
    case "accordion-collapsible": return [renderShadcnDisclose];
    case "tooltip-popover-hover-card": return [renderShadcnDisclose, renderBatchV73V78];
    case "dropdown-context-menu": return [renderShadcnDisclose];
    case "treeview": return [renderBatchV73V78];
    case "file-upload": return [renderBatchV73V78];
    case "banner": return [renderBatchV73V78];
    case "badge-tag-chip": return [renderBatchV73V78];
    case "avatar": return [renderListingDetail];
    case "animation-patterns": return [renderBatchV73V78];
    default: return [];
  }
}

function pageComponent(component, brand) {
  const cat = COMPONENT_CATEGORIES[component.slug] || { category: "Other" };
  const recipePath = resolve(ROOT, `recipes/shadcn/components/ui/${component.slug}.tsx`);
  const hasRecipe = existsSync(recipePath);
  const specPath = resolve(ROOT, `specs/components/${component.slug}.md`);
  const hasSpec = existsSync(specPath);

  let body = `
<h1>${escape(component.name)}</h1>
${component.description ? `<p class="lede">${escape(component.description)}</p>` : ""}

<div class="component-meta">
  <a class="tag">${escape(cat.category)}</a>
  ${hasSpec ? `<a class="tag tag-spec">M3 톤 detailed spec</a>` : ""}
  <a href="https://ui.shadcn.com/docs/components/${escape(component.slug)}" target="_blank" rel="noopener">shadcn/ui ↗</a>
  <a href="https://github.com/lshdainty/porest-design/blob/main/recipes/shadcn/components/ui/${escape(component.slug)}.tsx" target="_blank" rel="noopener">소스 ↗</a>
  ${hasSpec ? `<a href="https://github.com/lshdainty/porest-design/blob/main/specs/components/${escape(component.slug)}.md" target="_blank" rel="noopener">spec ↗</a>` : ""}
</div>
`;

  // === Spec (M3 톤 detailed spec, 있을 때만 — 코드 위에 둠) ===
  if (hasSpec) {
    const specMd = readFileSync(specPath, "utf8");
    body += `<section class="spec-section">\n${mdToHtml(specMd)}\n</section>\n`;
  }

  const hasExamples = !!(SHADCN_EXAMPLES[component.slug] && SHADCN_EXAMPLES[component.slug].length);

  if (!hasRecipe && !hasExamples) {
    body += `
<div class="callout">
  <div>
    <strong>곧 작성 예정</strong> · 이 컴포넌트는 Phase 진행 중. shadcn 표준 구조(cva + Radix primitives) + Porest 토큰으로 작성됩니다.
  </div>
</div>
`;
    return page({
      title: component.name,
      currentPath: `/components/${component.slug}.html`,
      breadcrumb: [
        { label: "Components" },
        { label: cat.category },
        { label: component.name },
      ],
      body,
    });
  }

  // === 설치 ===
  body += `<h2>설치</h2>\n`;
  body += `<pre><code class="lang-bash">npm install clsx tailwind-merge class-variance-authority @radix-ui/react-slot</code></pre>\n`;

  // === 컴포넌트 코드 (있을 때만) ===
  if (hasRecipe) {
    const recipeCode = readFileSync(recipePath, "utf8");
    body += `<h2>components/ui/${escape(component.slug)}.tsx</h2>\n`;
    body += `<pre><code class="lang-tsx">${escape(recipeCode)}</code></pre>\n`;
  } else {
    body += `<h2>조립 컴포넌트</h2>\n`;
    body += `<p style="font-size: var(--text-label-md); color: var(--color-text-secondary); margin: 0 0 16px;">${escape(component.name)}는 별도 파일이 아닌 다른 primitive를 조립해 사용합니다. 아래 예제 코드를 참고하세요.</p>\n`;
  }

  // === 예제 (Preview + Code 토글) ===
  const examples = SHADCN_EXAMPLES[component.slug];
  if (examples && examples.length > 0) {
    body += `<h2>예제</h2>\n`;
    body += `<p class="lede" style="font-size: var(--text-label-md); margin-bottom: 16px;">Preview는 우리 토큰 적용된 실제 동작. Code는 React 프로젝트로 그대로 복사.</p>\n`;
    for (const ex of examples) {
      body += `<h3 style="margin-top: 32px;">${escape(ex.title)}</h3>\n`;
      if (ex.description) {
        body += `<p style="font-size: var(--text-label-md); color: var(--color-text-secondary); margin: 0 0 12px;">${escape(ex.description)}</p>\n`;
      }
      body += `<div class="example-block" data-example>
  <div class="example-head">
    <div class="example-tabs">
      <button class="example-tab" data-tab="preview" aria-selected="true" type="button">Preview</button>
      <button class="example-tab" data-tab="code" aria-selected="false" type="button">Code</button>
    </div>
    <button class="example-copy" type="button">Copy</button>
  </div>
  <div class="example-preview" data-pane="preview">
    <div class="preview-frame">${ex.render()}</div>
  </div>
  <div class="example-code" data-pane="code" hidden>
    <pre><code class="lang-tsx">${escape(ex.jsx)}</code></pre>
  </div>
</div>
`;
    }
  }

  // === bridge & utils (모든 shadcn 페이지 공통 — 한 번만 보여주는 details) ===
  body += `<h2>bridge & utils</h2>\n`;
  body += `<p style="font-size: var(--text-label-md); color: var(--color-text-secondary);">아래 두 파일은 프로젝트당 한 번만 추가 — 모든 shadcn 컴포넌트가 공유.</p>\n`;
  const bridgePath = resolve(ROOT, "recipes/shadcn/styles/porest-shadcn-bridge.css");
  const utilsPath = resolve(ROOT, "recipes/shadcn/lib/utils.ts");
  if (existsSync(bridgePath)) {
    const bridgeCode = readFileSync(bridgePath, "utf8");
    body += `<details><summary><code>styles/porest-shadcn-bridge.css</code> — Porest 토큰 → shadcn variables alias</summary><pre><code class="lang-css">${escape(bridgeCode)}</code></pre></details>\n`;
  }
  if (existsSync(utilsPath)) {
    const utilsCode = readFileSync(utilsPath, "utf8");
    body += `<details><summary><code>lib/utils.ts</code> — cn() helper</summary><pre><code class="lang-ts">${escape(utilsCode)}</code></pre></details>\n`;
  }

  body += `
<div class="callout">
  <div>
    <strong>참고</strong> · shadcn 공식 문서 <a href="https://ui.shadcn.com/docs/components/${escape(component.slug)}" target="_blank" rel="noopener">ui.shadcn.com/docs/components/${escape(component.slug)}</a> · 디자인 토큰 사양 <a href="https://github.com/lshdainty/porest-design/blob/main/DESIGN.md" target="_blank" rel="noopener">DESIGN.md</a>.
  </div>
</div>
`;

  return page({
    title: component.name,
    currentPath: `/components/${component.slug}.html`,
    breadcrumb: [
      { label: "Components" },
      { label: cat.category },
      { label: component.name },
    ],
    body,
  });
}

// ============================================================
// 8. Build
// ============================================================

function ensureDir(p) { mkdirSync(p, { recursive: true }); }

ensureDir(OUT);
ensureDir(resolve(OUT, "tokens"));
// 옛 슬러그 페이지(input-textarea.html 등) 잔존 방지 — 매 빌드마다 components/ 비움
const componentsDir = resolve(OUT, "components");
if (existsSync(componentsDir)) rmSync(componentsDir, { recursive: true, force: true });
ensureDir(componentsDir);
ensureDir(resolve(OUT, "assets"));

// shadcn 카탈로그가 페이지 1대1. paragraphs/examples는 빈 배열 (옛 EXAMPLES.md
// 매핑 폐기 — 각 페이지는 recipe + examples mjs 기반).
const components = SHADCN_CATALOG.map(c => ({
  slug: c.slug,
  name: c.name,
  description: c.description,
  paragraphs: [c.description],
  examples: [],
}));
NAV = buildNav(components);

const tokens = buildTokens();
TAILWIND_BLOCK = tokens.tailwindBlock;
writeFileSync(resolve(OUT, "assets/tokens.css"), tokens.rootCss);
// site.css = 사이트 layout + preview.html demo CSS (preview의 sc-card / btn-* / son-toast 등)
// 단, preview의 site-level 셀렉터(body, .theme-toggle, .app 등)는 제거 — site CSS와 충돌
function sanitizePreviewCss(css) {
  // 충돌 셀렉터 패턴 — selectorPart trim + comment 제거 후 매칭
  // 셀렉터 끝(또는 다음 문자가 word-extension이 아닌)을 검사 — 더 길게 이어진 이름과 구분
  const conflictPatterns = [
    /^body(?![-a-zA-Z0-9_])/,
    /^\.theme-toggle(?![-a-zA-Z0-9_])/,
    /^\.theme-toggle-icon(?![-a-zA-Z0-9_])/,
    /^\.theme-toggle-(?:dark|light)-(?:text|icon)(?![-a-zA-Z0-9_])/,
    /^\[data-theme="(?:light|dark)"\]\s+body(?![-a-zA-Z0-9_])/,
    /^\[data-theme="(?:light|dark)"\]\s+\.theme-toggle(?![-a-zA-Z0-9_])/,
    /^main(?![-a-zA-Z0-9_])/,
    /^html(?![-a-zA-Z0-9_])/,
  ];
  function cleanSelector(s) {
    // 리딩 whitespace + CSS 주석 제거
    return s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s+/, "").replace(/\s+$/, "");
  }
  // CSS rule 블록 단위로 split + filter (간단한 brace 기반 파서)
  const out = [];
  let i = 0;
  while (i < css.length) {
    // selector 부분 (block 시작 전까지)
    let j = i;
    let depth = 0;
    while (j < css.length) {
      if (css[j] === "{") { depth = 1; break; }
      j++;
    }
    if (depth === 0) { out.push(css.slice(i)); break; }
    // selector 추출
    const selectorPart = css.slice(i, j);
    // body 매칭 (rule 단위) — block 끝까지 찾기
    let k = j + 1;
    let braceDepth = 1;
    while (k < css.length && braceDepth > 0) {
      if (css[k] === "{") braceDepth++;
      else if (css[k] === "}") braceDepth--;
      k++;
    }
    const ruleBlock = css.slice(i, k);
    const cleanedSelector = cleanSelector(selectorPart);
    // @media / @keyframes 등 at-rule은 그대로 통과 (내부 rule도 함께)
    if (cleanedSelector.startsWith("@")) {
      out.push(ruleBlock);
    } else {
      // 충돌 selector 검사 (cleaned 기준)
      const conflicts = conflictPatterns.some(re => re.test(cleanedSelector));
      if (!conflicts) out.push(ruleBlock);
      else out.push(`/* SKIPPED conflicting: ${cleanedSelector.slice(0, 60)}... */\n`);
    }
    i = k;
  }
  return out.join("");
}
const combinedSiteCss = siteCss() + "\n\n/* === preview.html demo CSS (sanitized) === */\n" + sanitizePreviewCss(previewPageCss());
writeFileSync(resolve(OUT, "assets/site.css"), combinedSiteCss);
writeFileSync(resolve(OUT, "assets/site.js"), siteJs());

// brand 객체 — preview.html demo 함수에 전달. brand.key === "default" / "hr" / "desk".
// 사이트는 한 번에 한 brand만 빌드 안 함 — Default brand로 정적 렌더, JS toggle로 색상 전환.
const tokensCss = readFileSync(resolve(ROOT, "exports/tokens.css"), "utf8");
const parsedTokens = parseTokensFromCss(tokensCss);
const brand = brandProfile("Default", parsedTokens);

writeFileSync(resolve(OUT, "index.html"), pageLanding());
writeFileSync(resolve(OUT, "tokens/colors.html"), pageColors());
writeFileSync(resolve(OUT, "tokens/typography.html"), pageTypography());
writeFileSync(resolve(OUT, "tokens/spacing.html"), pageSpacing());
writeFileSync(resolve(OUT, "tokens/radius.html"), pageRadius());
writeFileSync(resolve(OUT, "tokens/shadows.html"), pageShadows());
writeFileSync(resolve(OUT, "tokens/motion.html"), pageMotion());
writeFileSync(resolve(OUT, "tokens/breakpoints.html"), pageBreakpoints());
writeFileSync(resolve(OUT, "tokens/z-index.html"), pageZIndex());

for (const c of components) {
  writeFileSync(resolve(OUT, `components/${c.slug}.html`), pageComponent(c, brand));
}

console.log("✓ exports/site/");
console.log("  index.html");
console.log("  tokens/{colors,typography,spacing,radius,shadows,motion,breakpoints,z-index}.html (8 페이지)");
const filledCount = SHADCN_CATALOG.filter(c => {
  const hasRecipe = existsSync(resolve(ROOT, `recipes/shadcn/components/ui/${c.slug}.tsx`));
  const hasExamples = !!(SHADCN_EXAMPLES[c.slug] && SHADCN_EXAMPLES[c.slug].length);
  return hasRecipe || hasExamples;
}).length;
const placeholderSuffix = filledCount === components.length ? "" : ", 나머지 placeholder";
console.log(`  components/*.html (${components.length} 페이지 shadcn 카탈로그 — ${filledCount}/${components.length} 작성 완료${placeholderSuffix})`);
console.log("  assets/{tokens,site}.css + site.js");
