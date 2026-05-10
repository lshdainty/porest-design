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
        { label: "milestone", value: "v57" },
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
      listingDetail: {
        title: "직원 상세 — 김지원",
        meta: "디자인 본부 · 시니어 프로덕트 디자이너 · 입사 2024-03-15",
        ratingScore: "4.8",
        ratingCount: "12명 피드백",
        sections: [
          { title: "기본 정보", body: "사번 PR-2024-0312 · 직급 시니어 · 팀 디자인 시스템 · 근속 2년차" },
          { title: "최근 활동", body: "이번 분기 디자인 리뷰 14건, 결재 처리 3건. 5월 8일 기준 평균 응답시간 2.3시간." },
          { title: "전문 분야", body: "디자인 시스템, 한국어 typography, accessibility (WCAG 2.1 AA)." },
        ],
        rail: {
          title: "휴가 신청",
          fields: [
            { k: "잔여 연차", v: "8.5일" },
            { k: "사용 연차", v: "6.5일" },
            { k: "기간", v: "5/12 ~ 5/14 (3일)" },
          ],
          primary: "신청",
          primaryNote: "결재 라인 자동 적용",
          secondary: "이력 보기",
        },
      },
      calendar: {
        title: "5월 휴가 캘린더",
        month: "May 2026",
        leadingEmpty: 4,
        days: Array.from({ length: 31 }, (_, i) => {
          const day = i + 1;
          const dow = (i + 4) % 7;
          if ([12, 13, 14].includes(day)) return { day, state: "selected" };
          if (day === 10) return { day, state: "today" };
          if ([7, 21].includes(day)) return { day, state: "scheduled" };
          if (dow === 5 || dow === 6) return { day, state: "weekend" };
          return { day, state: "available" };
        }),
        legend: [
          { state: "selected", label: "휴가 (3일)" },
          { state: "scheduled", label: "공휴일" },
          { state: "today", label: "오늘" },
        ],
      },
      reviews: {
        title: "동료 피드백",
        average: "4.8",
        averageNote: "최근 12건 평균",
        items: [
          { author: "박서연", role: "프로덕트 매니저", date: "2026-04-22", rating: 5, text: "디자인 리뷰에서 항상 명확한 의도를 짚어주셔서 의사결정이 빨라집니다." },
          { author: "이도현", role: "운영 디자이너", date: "2026-04-15", rating: 5, text: "design.md 도구 도입 후 스펙 일관성이 크게 개선됐어요. 시스템 사고가 깊습니다." },
          { author: "최가람", role: "프론트엔드 엔지니어", date: "2026-03-30", rating: 4, text: "토큰 변경 시 prose까지 함께 갱신해주는 점이 큰 도움입니다." },
        ],
      },
      amenities: {
        title: "근무 정보",
        items: [
          { label: "디자인 본부 4F", note: "재택 가능" },
          { label: "정규직", note: "유연 근무" },
          { label: "코어 시간 10-16", note: "주 5일" },
          { label: "근속 2년차", note: "입사 2024-03-15" },
          { label: "디자인 시스템 인증", note: "내부 자격" },
          { label: "Pretendard 패키지", note: "한국어 우선 폰트" },
        ],
      },
      emptyState: {
        title: "결재 대기 0건",
        description: "현재 처리할 결재가 없어요. 새 결재를 시작하거나 잠시 휴식 시간을 가져보세요.",
        primary: "새 결재 시작",
        secondary: "이력 보기",
      },
      modal: {
        title: "휴가 신청 확인",
        description: "5/12 ~ 5/14 (3일) 휴가 신청을 결재 라인에 제출할까요?",
        primary: "신청",
        secondary: "취소",
        fields: [
          { k: "기간", v: "5/12 ~ 5/14 (3일)" },
          { k: "잔여 연차", v: "8.5일 → 5.5일" },
          { k: "결재 라인", v: "팀장 → 본부장" },
        ],
      },
      toasts: [
        { kind: "success", title: "결재 승인 완료", body: "김지원의 휴가 신청이 승인되었습니다." },
        { kind: "error", title: "신청 실패", body: "잔여 연차가 부족합니다 (현재 0.5일)." },
        { kind: "warning", title: "기한 임박", body: "이번 분기 평가 작성이 D-3 남았어요." },
        { kind: "info", title: "신규 공고", body: "디자인 시스템 디자이너 공고가 등록됐어요." },
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
        { label: "milestone", value: "v57" },
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
      listingDetail: {
        title: "Porest 브랜드 톤",
        meta: "메모 · 2026-05-08 작성 · 마지막 수정 2026-05-09",
        ratingScore: null,
        ratingCount: "342 단어 · 5분 읽기",
        sections: [
          { title: "핵심 톤", body: "절제·신뢰감 — 토스 레퍼런스. B2B(HR)와 B2C(Desk) 듀얼이지만 typographic baseline은 공유." },
          { title: "참고 사례", body: "Airbnb의 \"Inspiration\" 페이지처럼 Hero → Color → Typography → Components 흐름. 다만 우리 도메인(HR/Desk) 시나리오로 적응." },
          { title: "다음 액션", body: "Phase 2 listing detail / calendar / reviews 추가. v51-v53 semantic refresh 마무리." },
        ],
        rail: {
          title: "메타 정보",
          fields: [
            { k: "태그", v: "brand · design · v50" },
            { k: "작성일", v: "2026-05-08" },
            { k: "마지막 수정", v: "2026-05-09" },
            { k: "단어 수", v: "342" },
          ],
          primary: "편집",
          primaryNote: "Markdown 지원",
          secondary: "보관함으로",
        },
      },
      calendar: {
        title: "5월 가계부",
        month: "May 2026",
        leadingEmpty: 4,
        days: Array.from({ length: 31 }, (_, i) => {
          const day = i + 1;
          const dow = (i + 4) % 7;
          if (day === 10) return { day, state: "today" };
          if ([5, 7, 12, 18, 22, 28].includes(day)) return { day, state: "scheduled" };
          if (dow === 5 || dow === 6) return { day, state: "weekend" };
          return { day, state: "available" };
        }),
        legend: [
          { state: "scheduled", label: "거래 있음" },
          { state: "today", label: "오늘" },
          { state: "weekend", label: "주말" },
        ],
      },
      reviews: {
        title: "이번 달 회고",
        average: "4.6",
        averageNote: "주간 회고 평균",
        items: [
          { author: "5월 1주차", role: "주간 회고", date: "2026-05-05", rating: 5, text: "Porest 브랜드 톤 정의. semantic refresh 시작 — base 4개 emerald/red/orange/sky." },
          { author: "5월 2주차", role: "주간 회고", date: "2026-05-08", rating: 4, text: "v51-v53 마무리. preview Phase 1 완료. Phase 2 시작 (listing/calendar/reviews)." },
          { author: "4월 회고", role: "월간", date: "2026-04-30", rating: 5, text: "design.md 도구 도입 + Tailwind v4 export pipeline 안정화. 50 milestone 누적." },
        ],
      },
      amenities: {
        title: "내 카테고리",
        items: [
          { label: "메모", note: "234건 누적" },
          { label: "할일", note: "58건 (12 완료)" },
          { label: "가계부", note: "5월 22 거래" },
          { label: "회고", note: "주간 / 월간" },
          { label: "참고 자료", note: "북마크 18" },
          { label: "보관함", note: "아카이브 412" },
        ],
      },
      emptyState: {
        title: "오늘 할일 0개",
        description: "할일을 추가해 하루를 시작해보세요. 가벼운 메모나 빠른 한 줄도 좋아요.",
        primary: "할일 추가",
        secondary: "어제 보기",
      },
      modal: {
        title: "메모 삭제 확인",
        description: "이 메모를 삭제하면 30일 후 영구 삭제됩니다. 보관함에 그대로 둘까요?",
        primary: "삭제",
        secondary: "보관함으로",
        fields: [
          { k: "제목", v: "Porest 브랜드 톤" },
          { k: "작성일", v: "2026-05-08" },
          { k: "단어 수", v: "342" },
        ],
      },
      toasts: [
        { kind: "success", title: "메모 저장 완료", body: "Porest 브랜드 톤 메모가 저장되었습니다." },
        { kind: "error", title: "동기화 실패", body: "인터넷 연결을 확인하고 다시 시도해주세요." },
        { kind: "warning", title: "예산 80% 도달", body: "이번 달 가계부 예산이 80%에 도달했어요." },
        { kind: "info", title: "백업 완료", body: "어제 자정 자동 백업이 완료됐어요 (412 항목)." },
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
    listingDetail: {
      title: "Token reference — DESIGN.md",
      meta: `shared baseline · ${tokens.colors.length} colors · ${tokens.text.length} typography · ${tokens.spacing.length} spacing · 50 components`,
      ratingScore: null,
      ratingCount: "Source of Truth",
      sections: [
        { title: "Source", body: "DESIGN.md (Source of Truth) → DESIGN.{hr,desk}.md (self-contained brand variants). v17 file split, v50 markers + colors region sync." },
        { title: "Lint policy", body: "WCAG 1.4.3 본문 4.5:1 + 1.4.11 UI 3:1. shared baseline은 missingPrimary 1 warning 영구 수용 (brand-agnostic 의도)." },
        { title: "Sync", body: "typography / rounded / spacing 블록 + colors-1 (neutral) + colors-2 (semantic + chart) 자동 동기. brand colors는 sync 비대상 (보존)." },
      ],
      rail: {
        title: "Build pipeline",
        fields: [
          { k: "lint", v: "0 errors / 1 intentional" },
          { k: "sync drift", v: "none" },
          { k: "exports", v: "Tailwind v4 + DTCG" },
          { k: "milestone", v: "v53 (semantic refresh)" },
        ],
        primary: "verify",
        primaryNote: "npm run verify",
        secondary: "build:preview",
      },
    },
    calendar: {
      title: "Calendar primitive",
      month: "May 2026",
      leadingEmpty: 4,
      days: Array.from({ length: 31 }, (_, i) => {
        const day = i + 1;
        const dow = (i + 4) % 7;
        if (day === 10) return { day, state: "today" };
        if ([2, 9, 16, 23, 30].includes(day)) return { day, state: "scheduled" };
        if (dow === 5 || dow === 6) return { day, state: "weekend" };
        return { day, state: "available" };
      }),
      legend: [
        { state: "scheduled", label: "이벤트" },
        { state: "today", label: "오늘" },
        { state: "weekend", label: "주말" },
      ],
    },
    reviews: {
      title: "Recent milestones",
      average: "v53",
      averageNote: "최신 milestone",
      items: [
        { author: "v53", role: "milestone", date: "2026-05-10", rating: 5, text: "semantic 4 light vivid refresh — Tailwind 400 톤. 다크 alert 4.5:1 silent pass." },
        { author: "v52", role: "milestone", date: "2026-05-10", rating: 5, text: "warning 톤 미세 brighten — #C2410C → #C84D0E. L 0.15 → 0.17, ~4.69:1." },
        { author: "v51", role: "milestone", date: "2026-05-10", rating: 5, text: "semantic 4 base vivid refresh. emerald/red/orange/sky. 1차안 미달 → 보수 조정 trace." },
        { author: "v50", role: "milestone", date: "2026-05-09", rating: 5, text: "@sync markers + colors region sync. Drift detection 자동화." },
      ],
    },
    amenities: {
      title: "Token categories",
      items: [
        { label: "Colors", note: `${tokens.colors.length} (neutral + semantic + chart)` },
        { label: "Typography", note: `${tokens.text.length} scales · Pretendard` },
        { label: "Spacing", note: `${tokens.spacing.length} (4px base)` },
        { label: "Rounded", note: `${tokens.radius.length} (xs ~ full)` },
        { label: "Shadow", note: `${tokens.shadow.length} (4 × {light, dark}, prose-token)` },
        { label: "Motion", note: `${tokens.motion.length} (4 duration + ease-out, prose-token)` },
      ],
    },
    emptyState: {
      title: "Empty state demo",
      description: "이 영역은 빈 상태 시각화 demo입니다. 실제 사용 시나리오는 brand 파일 (HR / Desk) 참조.",
      primary: "더 알아보기",
      secondary: "닫기",
    },
    modal: {
      title: "토큰 갱신 확인",
      description: "이 변경을 brand 파일에 적용하시겠습니까? sync 단계에서 colors-2 region이 자동 미러됩니다.",
      primary: "적용",
      secondary: "취소",
      fields: [
        { k: "변경 항목", v: "colors-2 region (semantic)" },
        { k: "영향 파일", v: "DESIGN.{hr,desk}.md" },
        { k: "verify 필수", v: "npm run verify" },
      ],
    },
    toasts: [
      { kind: "success", title: "Build 완료", body: `exports/tokens.css 생성 (${tokens.colors.length} colors, ${tokens.text.length} typography).` },
      { kind: "error", title: "Sync drift 감지", body: "DESIGN.hr.md와 DESIGN.md 사이 동기화 실패." },
      { kind: "warning", title: "missingPrimary 1건", body: "DESIGN.md baseline은 의도적으로 primary 미정의." },
      { kind: "info", title: "Tailwind v4 export", body: "@theme CSS 빌드 정상 — 모든 namespace 통과." },
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

function renderListingDetail(brand) {
  const ld = brand.listingDetail;
  if (!ld) return "";

  const sections = ld.sections.map(s => `
    <div class="ld-section">
      <div class="ld-section-title">${escape(s.title)}</div>
      <div class="ld-section-body">${escape(s.body)}</div>
    </div>`).join("");

  const railFields = ld.rail.fields.map(f => `
    <div class="ld-rail-row">
      <div class="ld-rail-key">${escape(f.k)}</div>
      <div class="ld-rail-val">${escape(f.v)}</div>
    </div>`).join("");

  const headBlock = ld.ratingScore ? `
    <div class="ld-rating">
      <div class="ld-rating-score">${escape(ld.ratingScore)}</div>
      <div class="ld-rating-meta">${escape(ld.ratingCount)}</div>
    </div>` : ld.ratingCount ? `
    <div class="ld-meta-card">${escape(ld.ratingCount)}</div>` : "";

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">05 — Detail layout</div>
      <h2 class="section-title">${escape(ld.title)}</h2>
      <p class="section-lede">${escape(ld.meta)}</p>
    </header>
    <div class="ld-grid">
      <div class="ld-main">
        ${headBlock}
        ${sections}
      </div>
      <aside class="ld-rail">
        <div class="ld-rail-title">${escape(ld.rail.title)}</div>
        <div class="ld-rail-fields">${railFields}</div>
        <button class="btn btn-primary ld-rail-primary">${escape(ld.rail.primary)}</button>
        ${ld.rail.primaryNote ? `<div class="ld-rail-note">${escape(ld.rail.primaryNote)}</div>` : ""}
        <button class="btn btn-outlined ld-rail-secondary">${escape(ld.rail.secondary)}</button>
      </aside>
    </div>
  </section>`;
}

function renderCalendar(brand) {
  const cal = brand.calendar;
  if (!cal) return "";

  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  const weekdayCells = weekdays.map(w => `<div class="cal-weekday">${w}</div>`).join("");

  const leading = Array.from({ length: cal.leadingEmpty || 0 }, () => `<div class="cal-cell cal-cell--empty"></div>`).join("");
  const dayCells = cal.days.map(d => `
    <div class="cal-cell cal-cell--${d.state}">
      <span class="cal-cell-num">${d.day}</span>
    </div>`).join("");

  const totalCells = (cal.leadingEmpty || 0) + cal.days.length;
  const trailing = Array.from({ length: (7 - (totalCells % 7)) % 7 }, () => `<div class="cal-cell cal-cell--empty"></div>`).join("");

  const legend = cal.legend.map(l => `
    <div class="cal-legend-item">
      <span class="cal-legend-dot cal-legend-dot--${l.state}"></span>
      <span>${escape(l.label)}</span>
    </div>`).join("");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">06 — Calendar</div>
      <h2 class="section-title">${escape(cal.title)}</h2>
      <p class="section-lede">circular day cells, ink-filled on selected — ${escape(cal.month)}.</p>
    </header>
    <div class="cal-card">
      <div class="cal-grid">
        ${weekdayCells}
        ${leading}
        ${dayCells}
        ${trailing}
      </div>
      <div class="cal-legend">${legend}</div>
    </div>
  </section>`;
}

function renderReviews(brand) {
  const r = brand.reviews;
  if (!r) return "";

  const stars = (n) => "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));

  const items = r.items.map(item => `
    <div class="review-item">
      <div class="review-head">
        <div class="review-author">
          <div class="review-name">${escape(item.author)}</div>
          <div class="review-role">${escape(item.role)} · ${escape(item.date)}</div>
        </div>
        <div class="review-rating">${typeof item.rating === "number" ? stars(item.rating) : escape(item.rating || "")}</div>
      </div>
      <div class="review-text">${escape(item.text)}</div>
    </div>`).join("");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">07 — Reviews</div>
      <h2 class="section-title">${escape(r.title)}</h2>
      <p class="section-lede">최근 피드백 / 회고 / milestone — 좌측 평균 + 우측 항목 목록.</p>
    </header>
    <div class="review-grid">
      <div class="review-summary">
        <div class="review-avg">${escape(r.average)}</div>
        <div class="review-avg-note">${escape(r.averageNote)}</div>
      </div>
      <div class="review-list">${items}</div>
    </div>
  </section>`;
}

function renderAmenities(brand) {
  const a = brand.amenities;
  if (!a) return "";

  const items = a.items.map(item => `
    <div class="amenity-item">
      <span class="amenity-dot"></span>
      <div class="amenity-meta">
        <div class="amenity-label">${escape(item.label)}</div>
        ${item.note ? `<div class="amenity-note">${escape(item.note)}</div>` : ""}
      </div>
    </div>`).join("");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">08 — At a glance</div>
      <h2 class="section-title">${escape(a.title)}</h2>
      <p class="section-lede">amenity · category 그리드 — 좌측 brand primary dot + label + note.</p>
    </header>
    <div class="amenity-grid">${items}</div>
  </section>`;
}

function renderEmptyState(brand) {
  const e = brand.emptyState;
  if (!e) return "";
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">09 — Empty state</div>
      <h2 class="section-title">${escape(e.title)}</h2>
      <p class="section-lede">빈 상태 시각화 — 의미 + 다음 행동 가이드. surface-default 카드 + circular illustration + primary/outlined CTA.</p>
    </header>
    <div class="empty-card">
      <div class="empty-illustration" aria-hidden="true"></div>
      <div class="empty-title">${escape(e.title)}</div>
      <div class="empty-description">${escape(e.description)}</div>
      <div class="empty-actions">
        <button class="btn btn-primary">${escape(e.primary)}</button>
        <button class="btn btn-outlined">${escape(e.secondary)}</button>
      </div>
    </div>
  </section>`;
}

function renderModal(brand) {
  const m = brand.modal;
  if (!m) return "";
  const fields = m.fields.map(f => `
    <div class="modal-row">
      <div class="modal-key">${escape(f.k)}</div>
      <div class="modal-val">${escape(f.v)}</div>
    </div>`).join("");
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">10 — Modal</div>
      <h2 class="section-title">${escape(m.title)}</h2>
      <p class="section-lede">overlay-dim + 카드 + 결정 액션 — 정적 시연 (실제 modal은 focus trap + overlay click outside 동작 동반).</p>
    </header>
    <div class="modal-stage">
      <div class="modal-overlay"></div>
      <div class="modal-dialog">
        <div class="modal-title">${escape(m.title)}</div>
        <div class="modal-description">${escape(m.description)}</div>
        <div class="modal-fields">${fields}</div>
        <div class="modal-actions">
          <button class="btn btn-outlined">${escape(m.secondary)}</button>
          <button class="btn btn-primary">${escape(m.primary)}</button>
        </div>
      </div>
    </div>
  </section>`;
}

function renderToasts(brand) {
  const ts = brand.toasts || [];
  if (!ts.length) return "";
  const iconChar = (k) => k === "success" ? "✓" : k === "error" ? "✕" : k === "warning" ? "!" : "i";
  const items = ts.map(t => `
    <div class="toast toast-${t.kind}">
      <div class="toast-icon" aria-hidden="true">${iconChar(t.kind)}</div>
      <div class="toast-content">
        <div class="toast-title">${escape(t.title)}</div>
        <div class="toast-body">${escape(t.body)}</div>
      </div>
      <button class="toast-close" aria-label="닫기">×</button>
    </div>`).join("");
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">11 — Toast</div>
      <h2 class="section-title">시스템 알림 — 4 semantic</h2>
      <p class="section-lede">자동 dismiss 톤. v51-v53 semantic vivid 색상 (success emerald / error vivid red / warning orange / info sky blue).</p>
    </header>
    <div class="toast-stack">${items}</div>
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
      <div class="section-eyebrow">12 — Reference</div>
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

    /* === Listing detail === */
    .ld-grid {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: var(--spacing-lg);
      align-items: start;
    }
    .ld-main { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .ld-section {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    .ld-section-title { font-weight: 600; font-size: var(--text-heading-sm); margin-bottom: var(--spacing-xs); }
    .ld-section-body { color: var(--color-text-secondary); line-height: 1.6; }
    .ld-rating {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
      display: flex; align-items: baseline; gap: var(--spacing-md);
    }
    .ld-rating-score { font-size: 56px; font-weight: 700; line-height: 1; letter-spacing: -0.02em; }
    .ld-rating-meta { font-size: var(--text-caption); color: var(--color-text-tertiary); }
    .ld-meta-card {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-md) var(--spacing-lg);
      box-shadow: var(--shadow-sm);
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
      font-family: ui-monospace, monospace;
    }
    .ld-rail {
      position: sticky; top: var(--spacing-lg);
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-md);
      display: flex; flex-direction: column;
    }
    .ld-rail-title { font-weight: 600; font-size: var(--text-heading-sm); margin-bottom: var(--spacing-md); }
    .ld-rail-fields { display: flex; flex-direction: column; gap: 0; margin-bottom: var(--spacing-md); }
    .ld-rail-row {
      display: flex; justify-content: space-between;
      font-size: var(--text-caption);
      padding: var(--spacing-xs) 0;
      border-bottom: 1px solid var(--color-border-default);
    }
    .ld-rail-row:last-of-type { border-bottom: none; }
    .ld-rail-key { color: var(--color-text-tertiary); }
    .ld-rail-val { font-weight: 600; }
    .ld-rail-primary { width: 100%; margin-top: var(--spacing-md); }
    .ld-rail-secondary { width: 100%; margin-top: var(--spacing-sm); }
    .ld-rail-note { font-size: 11px; color: var(--color-text-tertiary); text-align: center; margin-top: var(--spacing-xs); }

    /* === Calendar === */
    .cal-card {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
      display: flex; flex-direction: column; gap: var(--spacing-md);
    }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--spacing-xs); }
    .cal-weekday {
      text-align: center;
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
      font-weight: 600;
      padding: var(--spacing-xs) 0;
    }
    .cal-cell {
      aspect-ratio: 1;
      display: flex; align-items: center; justify-content: center;
      border-radius: var(--radius-full);
      font-size: var(--text-body);
      color: var(--color-text-primary);
      position: relative;
      cursor: pointer;
      transition: background var(--motion-duration-fast, 150ms);
    }
    .cal-cell--empty { cursor: default; }
    .cal-cell--available:hover { background: var(--color-surface-input); }
    .cal-cell--weekend { color: var(--color-text-tertiary); }
    .cal-cell--scheduled {
      background: color-mix(in srgb, var(--color-primary, var(--color-text-primary)) 12%, transparent);
      font-weight: 600;
    }
    .cal-cell--today {
      outline: 2px solid var(--color-primary, var(--color-text-primary));
      outline-offset: -2px;
      font-weight: 700;
    }
    .cal-cell--selected {
      background: var(--color-primary, var(--color-text-primary));
      color: var(--color-text-on-accent, #fff);
      font-weight: 600;
    }
    .cal-legend {
      display: flex; gap: var(--spacing-md); flex-wrap: wrap;
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
      border-top: 1px solid var(--color-border-default);
      padding-top: var(--spacing-md);
    }
    .cal-legend-item { display: flex; align-items: center; gap: var(--spacing-xs); }
    .cal-legend-dot { width: 14px; height: 14px; border-radius: var(--radius-full); display: inline-block; }
    .cal-legend-dot--selected { background: var(--color-primary, var(--color-text-primary)); }
    .cal-legend-dot--scheduled { background: color-mix(in srgb, var(--color-primary, var(--color-text-primary)) 30%, transparent); }
    .cal-legend-dot--today { box-shadow: inset 0 0 0 2px var(--color-primary, var(--color-text-primary)); }
    .cal-legend-dot--weekend { background: var(--color-text-tertiary); opacity: 0.4; }

    /* === Reviews === */
    .review-grid { display: grid; grid-template-columns: 1fr 2fr; gap: var(--spacing-lg); align-items: start; }
    .review-summary {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow-sm);
      display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
      position: sticky; top: var(--spacing-lg);
    }
    .review-avg {
      font-size: 64px; font-weight: 700; line-height: 1; letter-spacing: -0.02em;
      color: var(--color-primary, var(--color-text-primary));
    }
    .review-avg-note { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: var(--spacing-sm); }
    .review-list { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .review-item {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    .review-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-sm); gap: var(--spacing-md); }
    .review-name { font-weight: 600; font-size: var(--text-body); }
    .review-role { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: 2px; }
    .review-rating {
      font-size: var(--text-caption);
      color: var(--color-primary, var(--color-text-primary));
      letter-spacing: 0.05em;
      white-space: nowrap;
    }
    .review-text { color: var(--color-text-secondary); line-height: 1.6; }

    /* === Amenities === */
    .amenity-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: var(--spacing-md);
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    .amenity-item { display: flex; align-items: flex-start; gap: var(--spacing-md); padding: var(--spacing-sm); }
    .amenity-dot {
      width: 8px; height: 8px;
      border-radius: var(--radius-full);
      background: var(--color-primary, var(--color-text-primary));
      margin-top: 8px;
      flex-shrink: 0;
    }
    .amenity-meta { flex: 1; }
    .amenity-label { font-weight: 600; font-size: var(--text-body); }
    .amenity-note { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: 2px; }

    /* === Empty state === */
    .empty-card {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-3xl);
      box-shadow: var(--shadow-sm);
      display: flex; flex-direction: column; align-items: center; text-align: center;
      gap: var(--spacing-md);
    }
    .empty-illustration {
      width: 96px; height: 96px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary, var(--color-text-tertiary)) 15%, transparent), var(--color-surface-input));
    }
    .empty-title { font-size: var(--text-heading-md); font-weight: var(--text-heading-md--font-weight); line-height: var(--text-heading-md--line-height); }
    .empty-description { color: var(--color-text-secondary); max-width: 40ch; line-height: 1.6; }
    .empty-actions { display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-sm); flex-wrap: wrap; justify-content: center; }

    /* === Modal === */
    .modal-stage {
      position: relative;
      background: linear-gradient(135deg, var(--color-chart-blue), var(--color-chart-violet));
      border-radius: var(--radius-lg);
      height: 480px;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    .modal-overlay {
      position: absolute; inset: 0;
      background: var(--overlay-dim-light, rgba(0, 0, 0, 0.4));
    }
    .modal-dialog {
      position: relative;
      background: var(--color-surface-default);
      border-radius: var(--radius-xl);
      padding: var(--spacing-2xl);
      box-shadow: var(--shadow-xl);
      width: min(90%, 480px);
      display: flex; flex-direction: column;
      gap: var(--spacing-md);
    }
    .modal-title { font-size: var(--text-heading-lg); font-weight: var(--text-heading-lg--font-weight); line-height: var(--text-heading-lg--line-height); }
    .modal-description { color: var(--color-text-secondary); line-height: 1.6; }
    .modal-fields {
      display: flex; flex-direction: column; gap: var(--spacing-xs);
      background: var(--color-surface-input);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
    }
    .modal-row { display: flex; justify-content: space-between; font-size: var(--text-caption); }
    .modal-key { color: var(--color-text-tertiary); }
    .modal-val { font-weight: 600; }
    .modal-actions { display: flex; gap: var(--spacing-sm); justify-content: flex-end; margin-top: var(--spacing-md); }

    /* === Toast === */
    .toast-stack { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .toast {
      display: grid; grid-template-columns: auto 1fr auto; gap: var(--spacing-md); align-items: flex-start;
      background: var(--color-surface-default);
      border-radius: var(--radius-md);
      padding: var(--spacing-md) var(--spacing-lg);
      box-shadow: var(--shadow-md);
      border-left: 4px solid var(--color-text-tertiary);
    }
    .toast-icon {
      width: 24px; height: 24px;
      border-radius: var(--radius-full);
      display: flex; align-items: center; justify-content: center;
      font-weight: 700;
      color: var(--color-text-on-accent);
      font-size: 14px;
    }
    .toast-success { border-left-color: var(--color-success); }
    .toast-success .toast-icon { background: var(--color-success); }
    .toast-error { border-left-color: var(--color-error); }
    .toast-error .toast-icon { background: var(--color-error); }
    .toast-warning { border-left-color: var(--color-warning); }
    .toast-warning .toast-icon { background: var(--color-warning); }
    .toast-info { border-left-color: var(--color-info); }
    .toast-info .toast-icon { background: var(--color-info); }
    .toast-title { font-weight: 600; font-size: var(--text-body); }
    .toast-body {
      color: var(--color-text-secondary);
      font-size: var(--text-caption);
      margin-top: 2px;
      line-height: 1.5;
    }
    .toast-close {
      width: 28px; height: 28px;
      border-radius: var(--radius-full);
      border: none;
      background: transparent;
      color: var(--color-text-tertiary);
      cursor: pointer;
      font-size: 18px;
    }
    .toast-close:hover { background: var(--color-surface-input); }

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
      .ld-section, .ld-rating, .ld-meta-card, .ld-rail,
      .cal-card,
      .review-summary, .review-item,
      .amenity-grid,
      .empty-card,
      .modal-dialog,
      .toast,
      .swatch { background: var(--color-surface-default-dark); }
      .modal-fields { background: var(--color-surface-input-dark); }
      .toast-close:hover { background: var(--color-surface-input-dark); }
      .ld-rail-row, .cal-legend { border-color: var(--color-border-default-dark); }
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
      .hero, .vignette-grid, .typo-moment, .ld-grid, .review-grid { grid-template-columns: 1fr; }
      .btn-row { grid-template-columns: 80px repeat(5, 1fr); }
      .approval-row { grid-template-columns: 1fr 1fr; }
      .ld-rail, .review-summary { position: static; }
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
    ${renderListingDetail(brand)}
    ${renderCalendar(brand)}
    ${renderReviews(brand)}
    ${renderAmenities(brand)}
    ${renderEmptyState(brand)}
    ${renderModal(brand)}
    ${renderToasts(brand)}
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
