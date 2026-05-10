#!/usr/bin/env node
// HTML 토큰 카탈로그 + 브랜드 쇼케이스 (P2-E + Phase 1 showcase)
//
// 페이지 흐름:
//   Hero → Color identity → Typography moment → Button gallery → Component vignettes → Token catalog (하단)
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
    colors: [],
    text: [],
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

// brand 분기용 메타데이터 — Phase 1 showcase 데이터.
// HR/Desk는 Explore agent가 정리한 도메인 시나리오에서 추출, shared는 brand-agnostic 데모.
function brandProfile(brandName, tokens) {
  const colorByName = Object.fromEntries(tokens.colors.map(c => [c.name, c.value]));
  const isHR = /HR/i.test(brandName);
  const isDesk = /Desk/i.test(brandName);

  if (isHR) {
    return {
      key: "hr",
      title: "Porest HR",
      kicker: "B2B · 조직 HR 관리",
      tagline: "사람과 일상이 숲처럼 자라나는 조직",
      heroFacts: [
        { label: "primary", value: colorByName["primary"] || "#357B5F" },
        { label: "components", value: "15" },
        { label: "milestone", value: "v50" },
      ],
      bigNumber: "87.3%",
      bigNumberLabel: "이번 달 평균 출근율",
      bigNumberMeta: [
        { k: "조직", v: "디자인 본부" },
        { k: "기준일", v: "2026-05-10" },
        { k: "변동", v: "전월 대비 +1.2pt" },
      ],
      tabs: { variant: "underline", labels: ["기본정보", "근태", "평가", "급여"] },
      vignettes: [
        {
          kind: "approval-row",
          title: "승인 대기 — 휴가 신청",
          rows: [
            { name: "김지원", dept: "디자인 본부", days: "5/12 ~ 5/14", status: "대기" },
            { name: "박서연", dept: "프로덕트 본부", days: "5/20 ~ 5/22", status: "대기" },
            { name: "이도현", dept: "운영 본부", days: "5/15 (반차)", status: "대기" },
          ],
        },
        {
          kind: "kpi-card",
          title: "이번 달 KPI",
          items: [
            { label: "출근율", value: "87.3%", delta: "+1.2pt" },
            { label: "신규 입사", value: "4명", delta: "전월 동일" },
            { label: "결재 처리", value: "128건", delta: "+12건" },
          ],
        },
      ],
    };
  }

  if (isDesk) {
    return {
      key: "desk",
      title: "Porest Desk",
      kicker: "B2C · 메모, 할일, 가계부",
      tagline: "메모, 할일, 가계부의 단정한 일상",
      heroFacts: [
        { label: "primary", value: colorByName["primary"] || "#0147AD" },
        { label: "components", value: "15" },
        { label: "milestone", value: "v50" },
      ],
      bigNumber: "₩1,284,500",
      bigNumberLabel: "이번 달 잔액",
      bigNumberMeta: [
        { k: "기간", v: "2026-05-01 ~ 05-10" },
        { k: "수입", v: "₩2,100,000" },
        { k: "지출", v: "₩815,500" },
      ],
      tabs: { variant: "pills", labels: ["전체", "즐겨찾기", "오늘", "보관함"] },
      vignettes: [
        {
          kind: "todo-card",
          title: "오늘의 할일",
          items: [
            { done: true, text: "아침 스트레칭", due: "07:00", priority: "low" },
            { done: false, text: "디자인 시스템 v50 리뷰", due: "14:00", priority: "high" },
            { done: false, text: "5월 가계부 정산", due: "오늘 안", priority: "medium" },
          ],
        },
        {
          kind: "memo-card",
          title: "최근 메모",
          items: [
            { title: "Porest 브랜드 톤", excerpt: "절제·신뢰감 — 토스 레퍼런스. 두 브랜드 듀얼 톤…", tags: ["brand", "design"] },
            { title: "이번 주 회고", excerpt: "월요일 sprint 시작 정리. 핵심 액션 3가지…", tags: ["weekly", "회고"] },
          ],
        },
      ],
    };
  }

  // shared baseline (DESIGN.md, brand-agnostic)
  return {
    key: "shared",
    title: "Porest baseline",
    kicker: "Shared · 두 브랜드의 공통 토대",
    tagline: "사람과 일상이 숲처럼 자라나는 디자인 시스템",
    heroFacts: [
      { label: "primary", value: "(brand-specific)" },
      { label: "components", value: "15" },
      { label: "milestone", value: "v50" },
    ],
    bigNumber: "4.81",
    bigNumberLabel: "Sample rating · brand-agnostic 데모",
    bigNumberMeta: [
      { k: "scale", v: "0.0 ~ 5.0" },
      { k: "샘플", v: "type rendering 검증" },
      { k: "노트", v: "primary 없는 baseline 톤" },
    ],
    tabs: { variant: "underline", labels: ["Tokens", "Components", "Patterns", "Brand"] },
    vignettes: [
      {
        kind: "kpi-card",
        title: "Token usage",
        items: [
          { label: "colors", value: String(tokens.colors.length), delta: "neutral + chart" },
          { label: "text scales", value: String(tokens.text.length), delta: "Pretendard" },
          { label: "spacing", value: String(tokens.spacing.length), delta: "4px base" },
        ],
      },
    ],
  };
}

// ===== 섹션 렌더러 =====

function renderHero(brand) {
  const facts = brand.heroFacts.map(f => `
    <div class="hero-fact">
      <div class="hero-fact-label">${escape(f.label)}</div>
      <div class="hero-fact-value">${escape(f.value)}</div>
    </div>`).join("");

  return `
  <section class="hero">
    <div class="hero-card hero-card--primary">
      <div class="hero-eyebrow">Design System Inspiration of Porest</div>
      <h1 class="hero-title">${escape(brand.title)}</h1>
      <div class="hero-kicker">${escape(brand.kicker)}</div>
      <p class="hero-tagline">${escape(brand.tagline)}</p>
      <div class="hero-actions">
        <button class="btn btn-on-accent">Browse</button>
        <button class="btn btn-on-accent btn-outlined-on-dark">View tokens</button>
      </div>
    </div>
    <div class="hero-card hero-card--surface">
      <div class="hero-eyebrow">Foundation</div>
      <div class="hero-stack">${facts}</div>
      <div class="hero-meta">brand <strong>${escape(brand.title)}</strong> · generated ${new Date().toISOString().slice(0, 10)}</div>
    </div>
  </section>`;
}

function renderColorIdentity(tokens) {
  const byName = Object.fromEntries(tokens.colors.map(c => [c.name, c.value]));

  const groups = [
    {
      title: "Brand family",
      hint: "primary · primary-light · text-on-accent",
      swatches: [
        { name: "primary", size: "xl" },
        { name: "primary-light", size: "md" },
        { name: "text-on-accent", size: "md" },
      ],
    },
    {
      title: "Surface",
      hint: "bg-page · surface-default · surface-input",
      swatches: [
        { name: "bg-page", size: "lg" },
        { name: "surface-default", size: "lg" },
        { name: "surface-input", size: "md" },
      ],
    },
    {
      title: "Text",
      hint: "primary · secondary · tertiary · disabled",
      swatches: [
        { name: "text-primary", size: "lg" },
        { name: "text-secondary", size: "md" },
        { name: "text-tertiary", size: "md" },
        { name: "text-disabled", size: "md" },
      ],
    },
    {
      title: "Border",
      hint: "default · strong · focus",
      swatches: [
        { name: "border-default", size: "md" },
        { name: "border-strong", size: "md" },
        { name: "border-focus", size: "md" },
      ],
    },
    {
      title: "Semantic",
      hint: "success · error · warning · info",
      swatches: [
        { name: "success", size: "md" },
        { name: "error", size: "md" },
        { name: "warning", size: "md" },
        { name: "info", size: "md" },
      ],
    },
    {
      title: "Chart palette",
      hint: "10 hues · categorical (each has -light pair)",
      swatches: [
        "chart-red", "chart-orange", "chart-yellow", "chart-green", "chart-blue",
        "chart-indigo", "chart-violet", "chart-pink", "chart-brown", "chart-gray",
      ].map(n => ({ name: n, size: "sm" })),
    },
  ];

  const sections = groups.map(g => {
    const swatches = g.swatches.map(s => {
      const value = byName[s.name];
      if (!value) return "";
      return `
        <div class="ci-swatch ci-swatch--${s.size}">
          <div class="ci-swatch-color" style="background:${escape(value)}"></div>
          <div class="ci-swatch-meta">
            <div class="ci-swatch-name">${escape(s.name)}</div>
            <div class="ci-swatch-value">${escape(value)}</div>
          </div>
        </div>`;
    }).filter(Boolean).join("");
    if (!swatches) return "";
    return `
      <div class="ci-group">
        <div class="ci-group-head">
          <div class="ci-group-title">${escape(g.title)}</div>
          <div class="ci-group-hint">${escape(g.hint)}</div>
        </div>
        <div class="ci-swatch-row">${swatches}</div>
      </div>`;
  }).filter(Boolean).join("");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">01 — Identity</div>
      <h2 class="section-title">Color identity</h2>
      <p class="section-lede">역할 기반 그룹. 같은 family 안에서 primary가 가장 큰 스와치, 보조는 작은 동반 카드. semantic·chart는 별도 행으로 분리.</p>
    </header>
    <div class="ci-grid">${sections}</div>
  </section>`;
}

function renderTypographyMoment(brand, tokens) {
  const scaleRows = tokens.text.map(t => `
    <div class="typo-scale-row">
      <div class="typo-scale-meta">
        <strong>text-${escape(t.name)}</strong>
        <span>${escape(t.fontSize)} / ${escape(t.lineHeight)} · ${escape(t.fontWeight)}</span>
      </div>
      <div class="typo-scale-sample" style="font-size:${escape(t.fontSize)};line-height:${escape(t.lineHeight)};font-weight:${escape(t.fontWeight)};">
        포레스트 디자인 — Porest
      </div>
    </div>`).join("");

  const meta = brand.bigNumberMeta.map(m => `
    <div class="typo-meta-row">
      <div class="typo-meta-key">${escape(m.k)}</div>
      <div class="typo-meta-val">${escape(m.v)}</div>
    </div>`).join("");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">02 — Type</div>
      <h2 class="section-title">Pretendard · 한국어 우선, 절제된 weights</h2>
      <p class="section-lede">큰 숫자 한 컷 + 7단계 스케일. 본문 15/1.6, heading은 1.25 ~ 1.4 line-height로 압축.</p>
    </header>
    <div class="typo-moment">
      <div class="typo-moment-left">
        <div class="typo-meta">${meta}</div>
        <div class="typo-bignum">${escape(brand.bigNumber)}</div>
        <div class="typo-bignum-label">${escape(brand.bigNumberLabel)}</div>
      </div>
      <div class="typo-moment-right">${scaleRows}</div>
    </div>
  </section>`;
}

function renderButtonGallery(brand) {
  const states = ["default", "hover", "pressed", "focus", "disabled"];
  const variants = [
    { key: "primary", label: "primary" },
    { key: "outlined", label: "outlined" },
    { key: "ghost", label: "ghost" },
  ];

  const head = `<div class="btn-row btn-row--head"><div></div>${
    states.map(s => `<div class="btn-cell-head">${s}</div>`).join("")
  }</div>`;

  const variantRows = variants.map(v => {
    const cells = states.map(s => `
      <div class="btn-cell">
        <button class="btn btn-${v.key} btn-state-${s}" ${s === "disabled" ? "disabled" : ""}>승인</button>
      </div>`).join("");
    return `<div class="btn-row"><div class="btn-row-label">${v.label}</div>${cells}</div>`;
  }).join("");

  const sizeRow = `
    <div class="btn-size-row">
      <div class="btn-size-label">size</div>
      <button class="btn btn-primary btn-size-sm">sm · 32</button>
      <button class="btn btn-primary btn-size-md">md · 40 (default)</button>
      <button class="btn btn-primary btn-size-lg">lg · 48</button>
    </div>`;

  const lede = brand.key === "hr"
    ? "B2B 데이터 밀도 톤 — sm/md 사이즈 위주, hover 미니멀."
    : brand.key === "desk"
      ? "B2C 친근 톤 — md/lg 사이즈 위주, hover에 명도/shadow 강조."
      : "Brand-agnostic 데모. 실제 파일에선 brand 분기.";

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03 — Button</div>
      <h2 class="section-title">Primary · outlined · ghost</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    <div class="btn-matrix">
      ${head}
      ${variantRows}
    </div>
    ${sizeRow}
  </section>`;
}

function renderVignettes(brand) {
  const tabs = `
    <div class="vignette-card">
      <div class="vignette-head">
        <div class="vignette-title">Tabs · ${brand.tabs.variant === "pills" ? "pills (Desk 모바일친화)" : "underline (HR/shared 절제)"}</div>
        <div class="vignette-sub">activeIndex = 0</div>
      </div>
      <div class="tabs tabs-${brand.tabs.variant}">
        ${brand.tabs.labels.map((l, i) => `
          <div class="tab ${i === 0 ? "tab--active" : ""}">${escape(l)}</div>`).join("")}
      </div>
      <div class="tabs-body">${escape(brand.tabs.labels[0])} 영역의 콘텐츠가 여기에 들어옵니다.</div>
    </div>`;

  const search = `
    <div class="vignette-card">
      <div class="vignette-head">
        <div class="vignette-title">Search · pill input</div>
        <div class="vignette-sub">surface-input + radius-full</div>
      </div>
      <div class="search-pill">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input class="search-input" placeholder="검색어를 입력하세요" />
        <button class="btn btn-primary btn-size-sm">필터</button>
      </div>
    </div>`;

  const vignettes = brand.vignettes.map(v => {
    if (v.kind === "approval-row") {
      const rows = v.rows.map(r => `
        <div class="approval-row">
          <div class="approval-id">
            <div class="approval-name">${escape(r.name)}</div>
            <div class="approval-dept">${escape(r.dept)}</div>
          </div>
          <div class="approval-days">${escape(r.days)}</div>
          <span class="badge badge-warning">${escape(r.status)}</span>
          <div class="approval-actions">
            <button class="btn btn-primary btn-size-sm">승인</button>
            <button class="btn btn-outlined btn-size-sm">반려</button>
          </div>
        </div>`).join("");
      return `
        <div class="vignette-card">
          <div class="vignette-head">
            <div class="vignette-title">${escape(v.title)}</div>
            <div class="vignette-sub">approval row — HR 데이터 밀도 톤</div>
          </div>
          <div class="approval-list">${rows}</div>
        </div>`;
    }
    if (v.kind === "kpi-card") {
      const items = v.items.map(i => `
        <div class="kpi-cell">
          <div class="kpi-label">${escape(i.label)}</div>
          <div class="kpi-value">${escape(i.value)}</div>
          <div class="kpi-delta">${escape(i.delta)}</div>
        </div>`).join("");
      return `
        <div class="vignette-card">
          <div class="vignette-head">
            <div class="vignette-title">${escape(v.title)}</div>
            <div class="vignette-sub">KPI dashboard widget</div>
          </div>
          <div class="kpi-grid">${items}</div>
        </div>`;
    }
    if (v.kind === "todo-card") {
      const items = v.items.map(i => `
        <div class="todo-row ${i.done ? "todo-row--done" : ""}">
          <span class="todo-check ${i.done ? "todo-check--on" : ""}" aria-hidden="true">${i.done ? "✓" : ""}</span>
          <div class="todo-text">${escape(i.text)}</div>
          <span class="badge badge-${i.priority === "high" ? "error" : i.priority === "medium" ? "warning" : "info"}">${escape(i.priority)}</span>
          <div class="todo-due">${escape(i.due)}</div>
        </div>`).join("");
      return `
        <div class="vignette-card">
          <div class="vignette-head">
            <div class="vignette-title">${escape(v.title)}</div>
            <div class="vignette-sub">todo list — Desk B2C 일상 톤</div>
          </div>
          <div class="todo-list">${items}</div>
        </div>`;
    }
    if (v.kind === "memo-card") {
      const items = v.items.map(i => `
        <div class="memo-row">
          <div class="memo-title">${escape(i.title)}</div>
          <div class="memo-excerpt">${escape(i.excerpt)}</div>
          <div class="memo-tags">${i.tags.map(t => `<span class="memo-tag">#${escape(t)}</span>`).join("")}</div>
        </div>`).join("");
      return `
        <div class="vignette-card">
          <div class="vignette-head">
            <div class="vignette-title">${escape(v.title)}</div>
            <div class="vignette-sub">memo grid — Desk entry</div>
          </div>
          <div class="memo-grid">${items}</div>
        </div>`;
    }
    return "";
  }).filter(Boolean).join("");

  const sectionTitle = brand.key === "hr"
    ? "HR 도메인 비뇨트"
    : brand.key === "desk"
      ? "Desk 도메인 비뇨트"
      : "Components — generic";

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">04 — Components in context</div>
      <h2 class="section-title">${escape(sectionTitle)}</h2>
      <p class="section-lede">실제 화면에서 토큰이 어떻게 결합되는지 — 한 가지 컴포넌트가 아니라 여러 컨텍스트.</p>
    </header>
    <div class="vignette-grid">
      ${vignettes}
      ${tabs}
      ${search}
    </div>
  </section>`;
}

function renderTokenCatalog(tokens) {
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

  return `
  <section class="catalog">
    <header class="section-head">
      <div class="section-eyebrow">05 — Reference</div>
      <h2 class="section-title">Token catalog</h2>
      <p class="section-lede">검증·문서 용도 — 시스템에 정의된 모든 토큰을 한눈에.</p>
    </header>

    <h3>Colors (${tokens.colors.length})</h3>
    <div class="swatch-grid">${colorGrid}</div>

    <h3>Typography (${tokens.text.length})</h3>
    <div>${textRows}</div>

    <h3>Radius (${tokens.radius.length})</h3>
    <div class="radius-row">${radiusRow}</div>

    <h3>Spacing (${tokens.spacing.length})</h3>
    <div class="spacing-row">${spacingRow}</div>

    <h3>Shadow (${tokens.shadow.length})</h3>
    <div class="shadow-grid">${shadowGrid}</div>

    <h3>Motion (${tokens.motion.length})</h3>
    <div>${motionRows}</div>

    <h3>Overlay (${tokens.overlay.length})</h3>
    <div class="overlay-row">${overlayRow}</div>
  </section>`;
}

function pageCss() {
  return `
    * { box-sizing: border-box; }
    body {
      font-family: var(--font-sans);
      background: var(--color-bg-page);
      color: var(--color-text-primary);
      margin: 0;
      padding: 0;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    main { max-width: 1180px; margin: 0 auto; padding: var(--spacing-2xl) var(--spacing-xl); }
    code { font-family: ui-monospace, SFMono-Regular, monospace; background: var(--color-surface-input); padding: 2px 6px; border-radius: var(--radius-xs); font-size: 13px; }
    .section { margin: var(--spacing-3xl) 0; }
    .section-head { margin-bottom: var(--spacing-xl); max-width: 720px; }
    .section-eyebrow {
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: var(--spacing-xs);
      font-family: ui-monospace, monospace;
    }
    .section-title {
      font-size: var(--text-heading-xl);
      line-height: var(--text-heading-xl--line-height);
      font-weight: var(--text-heading-xl--font-weight);
      margin: 0 0 var(--spacing-sm);
      letter-spacing: -0.01em;
    }
    .section-lede { color: var(--color-text-secondary); margin: 0; max-width: 60ch; }

    /* Hero */
    .hero {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: var(--spacing-lg);
      margin: var(--spacing-xl) 0 var(--spacing-3xl);
      min-height: 360px;
    }
    .hero-card {
      border-radius: var(--radius-2xl);
      padding: var(--spacing-2xl);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: var(--shadow-md);
    }
    .hero-card--primary {
      background: var(--color-primary, var(--color-text-primary));
      color: var(--color-text-on-accent, #fff);
    }
    .hero-card--surface {
      background: var(--color-surface-default);
      color: var(--color-text-primary);
    }
    .hero-eyebrow {
      font-size: var(--text-caption);
      opacity: 0.85;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-family: ui-monospace, monospace;
    }
    .hero-card--surface .hero-eyebrow { color: var(--color-text-tertiary); opacity: 1; }
    .hero-title {
      font-size: clamp(36px, 5vw, 64px);
      line-height: 1.05;
      font-weight: 700;
      margin: var(--spacing-md) 0 var(--spacing-xs);
      letter-spacing: -0.02em;
    }
    .hero-kicker { font-size: var(--text-body); opacity: 0.85; margin-bottom: var(--spacing-lg); }
    .hero-tagline {
      font-size: var(--text-heading-md);
      line-height: var(--text-heading-md--line-height);
      margin: 0 0 var(--spacing-xl);
      max-width: 28em;
      opacity: 0.95;
    }
    .hero-actions { display: flex; gap: var(--spacing-sm); }
    .btn-on-accent {
      background: var(--color-surface-default);
      color: var(--color-text-primary);
    }
    .btn-on-accent.btn-outlined-on-dark {
      background: transparent;
      color: var(--color-text-on-accent, #fff);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
    .hero-stack { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .hero-fact {
      display: flex; justify-content: space-between; align-items: baseline;
      padding-bottom: var(--spacing-sm);
      border-bottom: 1px solid var(--color-border-default);
    }
    .hero-fact:last-of-type { border-bottom: none; }
    .hero-fact-label { color: var(--color-text-tertiary); font-size: var(--text-caption); }
    .hero-fact-value { font-family: ui-monospace, monospace; font-size: var(--text-body-strong); font-weight: 600; }
    .hero-meta { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: var(--spacing-md); }

    /* Buttons (공유) */
    .btn {
      font-family: inherit;
      font-size: var(--text-body-strong);
      font-weight: var(--text-body-strong--font-weight);
      line-height: 1;
      padding: var(--spacing-sm) var(--spacing-md);
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: box-shadow var(--motion-duration-fast, 150ms) var(--motion-ease-out, cubic-bezier(0.0, 0.0, 0.2, 1));
    }
    .btn-primary {
      background: var(--color-primary, var(--color-text-primary));
      color: var(--color-text-on-accent, #fff);
      box-shadow: var(--shadow-sm);
    }
    .btn-primary:hover { box-shadow: var(--shadow-md); filter: brightness(1.05); }
    .btn-primary:focus-visible { outline: 2px solid var(--color-border-focus, var(--color-primary)); outline-offset: 1px; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-outlined {
      background: transparent;
      color: var(--color-text-primary);
      border: 1px solid var(--color-border-default);
    }
    .btn-outlined:hover { background: var(--color-surface-input); }
    .btn-outlined:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-ghost {
      background: transparent;
      color: var(--color-primary, var(--color-text-primary));
    }
    .btn-ghost:hover { background: var(--color-surface-input); }
    .btn-ghost:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-state-hover { box-shadow: var(--shadow-md); filter: brightness(1.05); }
    .btn-state-pressed { transform: scale(0.98); box-shadow: none; filter: brightness(0.95); }
    .btn-state-focus { outline: 2px solid var(--color-border-focus, var(--color-primary)); outline-offset: 1px; }
    .btn-size-sm { font-size: var(--text-caption); padding: var(--spacing-xs) var(--spacing-sm); }
    .btn-size-lg { font-size: var(--text-heading-sm); padding: var(--spacing-md) var(--spacing-lg); border-radius: var(--radius-md); }

    /* Color identity */
    .ci-grid { display: grid; gap: var(--spacing-xl); }
    .ci-group {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    .ci-group-head { display: flex; gap: var(--spacing-md); align-items: baseline; margin-bottom: var(--spacing-md); flex-wrap: wrap; }
    .ci-group-title { font-weight: 600; font-size: var(--text-heading-sm); }
    .ci-group-hint { font-size: var(--text-caption); color: var(--color-text-tertiary); font-family: ui-monospace, monospace; }
    .ci-swatch-row { display: flex; gap: var(--spacing-md); flex-wrap: wrap; align-items: stretch; }
    .ci-swatch {
      display: flex; flex-direction: column;
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--color-border-default);
      background: var(--color-surface-default);
    }
    .ci-swatch--xl { width: 240px; }
    .ci-swatch--lg { width: 180px; }
    .ci-swatch--md { width: 140px; }
    .ci-swatch--sm { width: 100px; }
    .ci-swatch-color { height: 80px; }
    .ci-swatch--xl .ci-swatch-color { height: 140px; }
    .ci-swatch--lg .ci-swatch-color { height: 100px; }
    .ci-swatch--sm .ci-swatch-color { height: 56px; }
    .ci-swatch-meta { padding: var(--spacing-xs) var(--spacing-sm); }
    .ci-swatch-name { font-weight: 600; font-size: var(--text-caption); }
    .ci-swatch-value { font-family: ui-monospace, monospace; color: var(--color-text-tertiary); font-size: 11px; }

    /* Typography moment */
    .typo-moment {
      display: grid; grid-template-columns: 1fr 1.2fr; gap: var(--spacing-2xl);
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-2xl);
      box-shadow: var(--shadow-sm);
    }
    .typo-moment-left { align-self: center; }
    .typo-meta { display: flex; flex-direction: column; gap: var(--spacing-xs); margin-bottom: var(--spacing-lg); }
    .typo-meta-row { display: flex; gap: var(--spacing-md); padding-bottom: var(--spacing-xs); border-bottom: 1px solid var(--color-border-default); }
    .typo-meta-key { width: 80px; color: var(--color-text-tertiary); font-size: var(--text-caption); }
    .typo-meta-val { font-size: var(--text-caption); flex: 1; }
    .typo-bignum {
      font-size: clamp(64px, 9vw, 128px);
      line-height: 1;
      font-weight: 700;
      letter-spacing: -0.04em;
      margin: 0;
      color: var(--color-text-primary);
    }
    .typo-bignum-label { color: var(--color-text-tertiary); font-size: var(--text-caption); margin-top: var(--spacing-sm); }
    .typo-scale-row {
      display: grid; grid-template-columns: 200px 1fr;
      gap: var(--spacing-md);
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--color-border-default);
      align-items: baseline;
    }
    .typo-scale-row:last-of-type { border-bottom: none; }
    .typo-scale-meta strong { font-size: var(--text-caption); display: block; }
    .typo-scale-meta span { color: var(--color-text-tertiary); font-family: ui-monospace, monospace; font-size: 11px; }
    .typo-scale-sample { color: var(--color-text-secondary); }

    /* Button gallery matrix */
    .btn-matrix { display: grid; gap: var(--spacing-sm); }
    .btn-row { display: grid; grid-template-columns: 100px repeat(5, 1fr); gap: var(--spacing-sm); align-items: center; }
    .btn-row--head { color: var(--color-text-tertiary); font-size: var(--text-caption); padding-bottom: var(--spacing-xs); border-bottom: 1px solid var(--color-border-default); font-family: ui-monospace, monospace; }
    .btn-cell-head { text-transform: uppercase; letter-spacing: 0.04em; }
    .btn-row-label { font-weight: 600; font-size: var(--text-caption); color: var(--color-text-secondary); }
    .btn-cell { display: flex; }
    .btn-size-row { display: flex; gap: var(--spacing-md); align-items: center; margin-top: var(--spacing-xl); flex-wrap: wrap; }
    .btn-size-label { width: 100px; font-weight: 600; font-size: var(--text-caption); color: var(--color-text-secondary); }

    /* Vignettes */
    .vignette-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); }
    .vignette-card {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    .vignette-head { margin-bottom: var(--spacing-md); }
    .vignette-title { font-weight: 600; font-size: var(--text-heading-sm); }
    .vignette-sub { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: 2px; }

    /* approval-row */
    .approval-list { display: flex; flex-direction: column; }
    .approval-row {
      display: grid;
      grid-template-columns: 1.4fr 1fr auto auto;
      gap: var(--spacing-md);
      align-items: center;
      padding: var(--spacing-md) 0;
      border-bottom: 1px solid var(--color-border-default);
    }
    .approval-row:last-child { border-bottom: none; }
    .approval-name { font-weight: 600; font-size: var(--text-body); }
    .approval-dept { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: 2px; }
    .approval-days { font-size: var(--text-caption); color: var(--color-text-secondary); }
    .approval-actions { display: flex; gap: var(--spacing-xs); }

    .badge {
      display: inline-flex; align-items: center;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .badge-success { background: color-mix(in srgb, var(--color-success) 16%, transparent); color: var(--color-success); }
    .badge-error { background: color-mix(in srgb, var(--color-error) 16%, transparent); color: var(--color-error); }
    .badge-warning { background: color-mix(in srgb, var(--color-warning) 16%, transparent); color: var(--color-warning); }
    .badge-info { background: color-mix(in srgb, var(--color-info) 16%, transparent); color: var(--color-info); }

    /* kpi-card */
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-md); }
    .kpi-cell { padding: var(--spacing-md); background: var(--color-surface-input); border-radius: var(--radius-md); }
    .kpi-label { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-bottom: var(--spacing-xs); }
    .kpi-value { font-size: var(--text-heading-lg); font-weight: 700; line-height: 1.2; }
    .kpi-delta { font-size: 11px; color: var(--color-text-secondary); margin-top: var(--spacing-xs); }

    /* todo-card */
    .todo-list { display: flex; flex-direction: column; gap: 2px; }
    .todo-row {
      display: grid; grid-template-columns: auto 1fr auto auto;
      gap: var(--spacing-md); align-items: center;
      padding: var(--spacing-sm); border-radius: var(--radius-md);
    }
    .todo-row:hover { background: var(--color-surface-input); }
    .todo-check {
      width: 22px; height: 22px;
      border: 2px solid var(--color-border-strong);
      border-radius: var(--radius-xs);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: 700;
    }
    .todo-check--on { background: var(--color-primary, var(--color-text-primary)); border-color: var(--color-primary, var(--color-text-primary)); color: var(--color-text-on-accent, #fff); }
    .todo-text { font-size: var(--text-body); }
    .todo-row--done .todo-text { color: var(--color-text-tertiary); text-decoration: line-through; }
    .todo-due { font-size: var(--text-caption); color: var(--color-text-tertiary); }

    /* memo-card */
    .memo-grid { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .memo-row { padding: var(--spacing-md); background: var(--color-surface-input); border-radius: var(--radius-md); }
    .memo-title { font-weight: 600; font-size: var(--text-heading-sm); margin-bottom: var(--spacing-xs); }
    .memo-excerpt { font-size: var(--text-caption); color: var(--color-text-secondary); margin-bottom: var(--spacing-sm); line-height: 1.5; }
    .memo-tags { display: flex; gap: var(--spacing-xs); flex-wrap: wrap; }
    .memo-tag { font-size: 11px; color: var(--color-primary, var(--color-text-secondary)); }

    /* tabs */
    .tabs { display: flex; gap: var(--spacing-sm); border-bottom: 1px solid var(--color-border-default); margin-bottom: var(--spacing-md); }
    .tabs-pills { border-bottom: none; gap: var(--spacing-xs); }
    .tab { padding: var(--spacing-sm) var(--spacing-md); font-size: var(--text-caption); color: var(--color-text-secondary); cursor: pointer; }
    .tabs-underline .tab--active { color: var(--color-primary, var(--color-text-primary)); border-bottom: 2px solid var(--color-primary, var(--color-text-primary)); margin-bottom: -1px; font-weight: 600; }
    .tabs-pills .tab { border-radius: var(--radius-full); }
    .tabs-pills .tab--active { background: var(--color-primary, var(--color-text-primary)); color: var(--color-text-on-accent, #fff); font-weight: 600; }
    .tabs-body { font-size: var(--text-caption); color: var(--color-text-tertiary); padding: var(--spacing-sm) 0 0; }

    /* search */
    .search-pill {
      display: flex; align-items: center; gap: var(--spacing-sm);
      background: var(--color-surface-input);
      border-radius: var(--radius-full);
      padding: var(--spacing-xs) var(--spacing-xs) var(--spacing-xs) var(--spacing-md);
    }
    .search-icon { font-size: 18px; color: var(--color-text-tertiary); }
    .search-input { flex: 1; background: transparent; border: none; outline: none; font-size: var(--text-body); color: var(--color-text-primary); padding: var(--spacing-xs) 0; font-family: inherit; }
    .search-input::placeholder { color: var(--color-text-tertiary); }

    /* Token catalog (기존 — 압축 유지) */
    .catalog { margin-top: var(--spacing-3xl); padding-top: var(--spacing-2xl); border-top: 1px dashed var(--color-border-default); }
    .catalog h3 { font-size: var(--text-heading-md); font-weight: 600; margin: var(--spacing-xl) 0 var(--spacing-md); }
    .swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-lg); }
    .swatch { background: var(--color-surface-default); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); }
    .swatch-color { height: 60px; }
    .swatch-name { font-weight: 600; padding: var(--spacing-sm) var(--spacing-md) 0; font-size: var(--text-caption); }
    .swatch-value { padding: 0 var(--spacing-md) var(--spacing-sm); font-family: ui-monospace, monospace; color: var(--color-text-tertiary); font-size: 11px; }
    .text-row { display: grid; grid-template-columns: 240px 1fr; gap: var(--spacing-lg); padding: var(--spacing-md) 0; border-bottom: 1px solid var(--color-border-default); }
    .text-meta { display: flex; flex-direction: column; }
    .text-meta strong { font-size: var(--text-body); }
    .text-meta span { color: var(--color-text-tertiary); font-family: ui-monospace, monospace; font-size: var(--text-caption); }
    .radius-row { display: flex; gap: var(--spacing-lg); flex-wrap: wrap; }
    .radius-item { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-sm); }
    .radius-box { width: 80px; height: 80px; background: var(--color-primary, var(--color-text-primary)); }
    .radius-label { text-align: center; font-size: var(--text-caption); }
    .spacing-row { display: flex; flex-direction: column; gap: var(--spacing-sm); margin-bottom: var(--spacing-xl); }
    .spacing-item { display: flex; align-items: center; gap: var(--spacing-md); }
    .spacing-bar { background: var(--color-primary, var(--color-text-primary)); height: 16px; border-radius: var(--radius-xs); }
    .spacing-label { font-size: var(--text-caption); }
    .shadow-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--spacing-xl); padding: var(--spacing-lg); background: var(--color-bg-page); }
    .shadow-card { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-md); }
    .shadow-card.on-dark { background: var(--color-bg-page-dark); padding: var(--spacing-lg); border-radius: var(--radius-md); }
    .shadow-card.on-dark .shadow-name { color: var(--color-text-primary-dark); }
    .shadow-box { width: 110px; height: 70px; background: var(--color-surface-default); border-radius: var(--radius-md); }
    .shadow-card.on-dark .shadow-box { background: var(--color-surface-default-dark); }
    .shadow-name { font-size: var(--text-caption); font-family: ui-monospace, monospace; }
    .motion-row { display: grid; grid-template-columns: 240px 1fr; gap: var(--spacing-lg); padding: var(--spacing-sm) 0; border-bottom: 1px solid var(--color-border-default); align-items: center; }
    .overlay-row { display: flex; gap: var(--spacing-lg); flex-wrap: wrap; }
    .overlay-card { width: 220px; }
    .overlay-bg { position: relative; height: 140px; background: linear-gradient(135deg, var(--color-chart-blue), var(--color-chart-violet)); border-radius: var(--radius-md); overflow: hidden; }
    .overlay-dim { position: absolute; inset: 0; }
    .overlay-modal { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--color-surface-default); padding: var(--spacing-md) var(--spacing-lg); border-radius: var(--radius-md); box-shadow: var(--shadow-xl); font-size: var(--text-caption); font-weight: 600; }
    .overlay-name { text-align: center; font-size: var(--text-caption); font-family: ui-monospace, monospace; margin-top: var(--spacing-sm); }

    @media (prefers-color-scheme: dark) {
      body { background: var(--color-bg-page-dark); color: var(--color-text-primary-dark); }
      .hero-card--surface,
      .ci-group,
      .ci-swatch,
      .vignette-card,
      .typo-moment,
      .swatch { background: var(--color-surface-default-dark); }
      .hero-fact,
      .typo-meta-row,
      .approval-row,
      .text-row,
      .motion-row,
      .typo-scale-row,
      .tabs,
      .ci-swatch,
      .btn-row--head { border-color: var(--color-border-default-dark); }
      .catalog { border-color: var(--color-border-default-dark); }
      .kpi-cell, .memo-row, .search-pill { background: var(--color-surface-input-dark); }
      .btn-outlined { border-color: var(--color-border-default-dark); color: var(--color-text-primary-dark); }
      .btn-outlined:hover { background: var(--color-surface-input-dark); }
      .btn-on-accent { background: var(--color-surface-default-dark); color: var(--color-text-primary-dark); }
    }

    @media (max-width: 900px) {
      .hero, .vignette-grid, .typo-moment { grid-template-columns: 1fr; }
      .btn-row { grid-template-columns: 80px repeat(5, 1fr); }
      .approval-row { grid-template-columns: 1fr 1fr; }
    }
  `;
}

function renderHtml(brandName, css, tokens, sourceFile) {
  const brand = brandProfile(brandName, tokens);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Porest Design — ${escape(brandName)}</title>
  <style>${css}</style>
  <style>${pageCss()}</style>
</head>
<body>
  <main>
    ${renderHero(brand)}
    ${renderColorIdentity(tokens)}
    ${renderTypographyMoment(brand, tokens)}
    ${renderButtonGallery(brand)}
    ${renderVignettes(brand)}
    ${renderTokenCatalog(tokens)}
    <p style="text-align:center;color:var(--color-text-tertiary);font-size:var(--text-caption);margin-top:var(--spacing-3xl);">
      source <code>${escape(sourceFile)}</code> · Porest Design System
    </p>
  </main>
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
