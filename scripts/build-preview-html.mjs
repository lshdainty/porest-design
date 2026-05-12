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

export function parseTokensFromCss(css) {
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

export function escape(s) {
  return String(s).replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
}

// brand 분기용 메타데이터 — Phase 1 showcase 데이터.
// HR/Desk는 Explore agent가 정리한 도메인 시나리오에서 추출, shared는 brand-agnostic 데모.
export function brandProfile(brandName, tokens) {
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
        gallery: [
          { tone: "primary", label: "프로필" },
          { tone: "chart-violet", label: "디자인본부" },
          { tone: "chart-blue", label: "팀 사진" },
          { tone: "chart-orange", label: "프로젝트" },
        ],
        highlights: [
          { icon: "★", label: "4.8 / 5", note: "12명 피드백" },
          { icon: "🪄", label: "디자인 시스템", note: "전문 분야" },
          { icon: "📅", label: "근속 2년차", note: "2024-03-15 입사" },
          { icon: "✓", label: "WCAG 2.1 AA", note: "사내 a11y 인증" },
        ],
        host: {
          name: "박서연",
          role: "디자인 본부장",
          bio: "디자인 시스템과 한국어 typography에 강점. 6년차 매니저로 12명 팀 운영.",
          since: "팀 합류 2022-04",
        },
        sections: [
          { title: "기본 정보", body: "사번 PR-2024-0312 · 직급 시니어 · 팀 디자인 시스템 · 근속 2년차" },
          { title: "최근 활동", body: "이번 분기 디자인 리뷰 14건, 결재 처리 3건. 5월 8일 기준 평균 응답시간 2.3시간." },
          { title: "전문 분야", body: "디자인 시스템, 한국어 typography, accessibility (WCAG 2.1 AA)." },
        ],
        rail: {
          title: "휴가 신청",
          subtitle: "잔여 8.5일 · 이번 분기",
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
      form: {
        title: "휴가 신청 폼",
        sectionDescription: "필수 필드는 별표(*)로 표시. 결재 라인은 권한 그룹 기준 자동 매핑.",
        fields: [
          { type: "input", label: "신청자", value: "김지원", helper: "근속 2년차 · 디자인본부", required: true, readonly: true },
          { type: "select", label: "휴가 종류", value: "연차", options: ["연차", "반차(오전)", "반차(오후)", "병가", "특별휴가"], required: true },
          { type: "input", label: "기간", value: "2026-05-12 ~ 2026-05-14", helper: "사용 일수 3일 / 잔여 연차 8.5일", required: true },
          { type: "textarea", label: "사유", value: "가족 행사 참석으로 인한 연차 사용 요청드립니다.\n결재 후 인수인계 문서 공유드리겠습니다.", helper: "30 / 1000자", rows: 4 },
        ],
        primary: "결재 라인에 제출",
        secondary: "임시 저장",
      },
      skeleton: {
        title: "결재 큐 로딩 중",
        description: "list-row 5개 — avatar (32) + 신청자 + 상태 + 시간. shimmer 1500ms × linear loop.",
        layout: "list",
        items: 5,
      },
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
        gallery: [
          { tone: "primary", label: "메모 본문" },
          { tone: "chart-blue", label: "스케치" },
          { tone: "chart-yellow", label: "참고 자료" },
          { tone: "chart-pink", label: "관련 메모" },
        ],
        highlights: [
          { icon: "📝", label: "342 단어", note: "5분 읽기" },
          { icon: "🏷️", label: "3 태그", note: "brand · design · v50" },
          { icon: "🔗", label: "관련 메모 4건", note: "디자인 시스템 폴더" },
          { icon: "⏱️", label: "수정 어제", note: "1번 수정" },
        ],
        host: {
          name: "본인",
          role: "Desk 사용자",
          bio: "메모는 자동으로 본인 작성으로 기록. 공유 메모는 다른 사용자도 작성 가능.",
          since: "Desk 시작 2024-09",
        },
        sections: [
          { title: "핵심 톤", body: "절제·신뢰감 — 토스 레퍼런스. B2B(HR)와 B2C(Desk) 듀얼이지만 typographic baseline은 공유." },
          { title: "참고 사례", body: "Airbnb의 \"Inspiration\" 페이지처럼 Hero → Color → Typography → Components 흐름. 다만 우리 도메인(HR/Desk) 시나리오로 적응." },
          { title: "다음 액션", body: "Phase 2 listing detail / calendar / reviews 추가. v51-v53 semantic refresh 마무리." },
        ],
        rail: {
          title: "메타 정보",
          subtitle: "마지막 동기화 12분 전",
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
      form: {
        title: "거래 추가",
        sectionDescription: "가계부에 새 거래를 기록해요. 카테고리는 키워드 자동 추천.",
        fields: [
          { type: "select", label: "거래 유형", value: "지출", options: ["수입", "지출", "이체"], required: true },
          { type: "input", label: "금액", value: "₩28,500", helper: "최근 카페 평균 ₩6,800", required: true },
          { type: "select", label: "카테고리", value: "식비 · 카페", options: ["식비 · 카페", "식비 · 외식", "교통", "취미", "고정비"], required: true },
          { type: "input", label: "날짜", value: "2026-05-10", helper: "오늘", required: true },
          { type: "textarea", label: "메모", value: "친구와 디자인 토픽 미팅 — 2시간 작업 후 마무리.", helper: "32 / 200자", rows: 3 },
        ],
        primary: "저장",
        secondary: "취소",
      },
      skeleton: {
        title: "메모 list 로딩 중",
        description: "card 4개 — heading rect + body 2-line + tags placeholder. 모바일 친화 카드 톤.",
        layout: "card",
        items: 4,
      },
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
      gallery: [
        { tone: "chart-blue", label: "Tokens" },
        { tone: "chart-green", label: "Components" },
        { tone: "chart-violet", label: "Lint" },
        { tone: "chart-orange", label: "Sync" },
      ],
      highlights: [
        { icon: "🎨", label: `${tokens.colors.length} colors`, note: "neutral + chart palette" },
        { icon: "🔤", label: `${tokens.text.length} typography`, note: "Pretendard 한국어 우선" },
        { icon: "📐", label: `${tokens.spacing.length} spacing`, note: "4px base grid" },
        { icon: "✓", label: "0 errors", note: "lint:all 통과" },
      ],
      host: {
        name: "Porest Design",
        role: "Source of Truth · DESIGN.md",
        bio: "HR/Desk 두 브랜드의 공유 baseline. typography·spacing·rounded·neutral colors·neutral components 정의.",
        since: "v1 시작 2024 — 현재 v62",
      },
      sections: [
        { title: "Source", body: "DESIGN.md (Source of Truth) → DESIGN.{hr,desk}.md (self-contained brand variants). v17 file split, v50 markers + colors region sync." },
        { title: "Lint policy", body: "WCAG 1.4.3 본문 4.5:1 + 1.4.11 UI 3:1. shared baseline은 missingPrimary 1 warning 영구 수용 (brand-agnostic 의도)." },
        { title: "Sync", body: "typography / rounded / spacing 블록 + colors-1 (neutral) + colors-2 (semantic + chart) 자동 동기. brand colors는 sync 비대상 (보존)." },
      ],
      rail: {
        title: "Build pipeline",
        subtitle: "최근 빌드 통과",
        fields: [
          { k: "lint", v: "0 errors / 1 intentional" },
          { k: "sync drift", v: "none" },
          { k: "exports", v: "Tailwind v4 + DTCG" },
          { k: "milestone", v: "v62 (Form layout)" },
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
    form: {
      title: "Token submission form",
      sectionDescription: "신규 토큰 제안 demo — Input / Select / Textarea / required 필드 baseline.",
      fields: [
        { type: "input", label: "토큰 이름", value: "spacing-2xs", helper: "kebab-case · 의미 기반 명명", required: true },
        { type: "select", label: "카테고리", value: "spacing", options: ["color", "typography", "spacing", "radius", "shadow", "motion"], required: true },
        { type: "input", label: "값", value: "2px", helper: "단위 포함 — px / rem / em", required: true },
        { type: "textarea", label: "근거 (rationale)", value: "4px-grid 미만 hairline 용도. v6 이후 추가 검토 필요.", helper: "33 / 500자", rows: 3 },
      ],
      primary: "제안 등록",
      secondary: "초안 저장",
    },
    skeleton: {
      title: "Skeleton variant 데모",
      description: "text-line / circle / rect / list-row 4 variant. shimmer 1500ms × linear loop · prefers-reduced-motion 시 정지.",
      layout: "demo",
      items: 4,
    },
  };
}

// ===== 섹션 렌더러 =====

function renderHeroArt(brandKey) {
  if (brandKey === "hr") {
    // 조직도 abstract — 4 connected nodes
    return `
      <svg class="hero-art-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <line x1="100" y1="50" x2="50" y2="130" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
        <line x1="100" y1="50" x2="100" y2="130" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
        <line x1="100" y1="50" x2="150" y2="130" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
        <line x1="50" y1="130" x2="40" y2="170" stroke="currentColor" stroke-width="2" stroke-opacity="0.3"/>
        <line x1="100" y1="130" x2="100" y2="170" stroke="currentColor" stroke-width="2" stroke-opacity="0.3"/>
        <circle cx="100" cy="50" r="14" fill="currentColor" fill-opacity="0.85"/>
        <circle cx="50" cy="130" r="11" fill="currentColor" fill-opacity="0.7"/>
        <circle cx="100" cy="130" r="11" fill="currentColor" fill-opacity="0.7"/>
        <circle cx="150" cy="130" r="11" fill="currentColor" fill-opacity="0.7"/>
        <circle cx="40" cy="170" r="7" fill="currentColor" fill-opacity="0.5"/>
        <circle cx="100" cy="170" r="7" fill="currentColor" fill-opacity="0.5"/>
      </svg>`;
  }
  if (brandKey === "desk") {
    // 메모 + 체크박스 abstract
    return `
      <svg class="hero-art-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="40" y="40" width="120" height="140" rx="10" fill="currentColor" fill-opacity="0.18"/>
        <rect x="40" y="40" width="120" height="140" rx="10" stroke="currentColor" stroke-opacity="0.55" stroke-width="2"/>
        <rect x="56" y="64" width="14" height="14" rx="3" stroke="currentColor" stroke-width="2" stroke-opacity="0.7"/>
        <path d="M59 71 l3 3 l6 -7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.85"/>
        <line x1="80" y1="72" x2="140" y2="72" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-opacity="0.7"/>
        <rect x="56" y="92" width="14" height="14" rx="3" stroke="currentColor" stroke-width="2" stroke-opacity="0.55"/>
        <line x1="80" y1="100" x2="130" y2="100" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-opacity="0.45"/>
        <rect x="56" y="120" width="14" height="14" rx="3" stroke="currentColor" stroke-width="2" stroke-opacity="0.55"/>
        <line x1="80" y1="128" x2="120" y2="128" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-opacity="0.45"/>
        <line x1="56" y1="152" x2="144" y2="152" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.3"/>
      </svg>`;
  }
  // shared baseline — typography composition
  return `
    <svg class="hero-art-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text x="20" y="100" font-family="ui-sans-serif, system-ui" font-size="84" font-weight="700" fill="currentColor" fill-opacity="0.9">Aa</text>
      <text x="100" y="160" font-family="ui-sans-serif, system-ui" font-size="56" font-weight="500" fill="currentColor" fill-opacity="0.55">가</text>
      <line x1="20" y1="178" x2="180" y2="178" stroke="currentColor" stroke-width="2" stroke-opacity="0.35"/>
      <line x1="20" y1="186" x2="120" y2="186" stroke="currentColor" stroke-width="2" stroke-opacity="0.2"/>
    </svg>`;
}

function renderHero(brand) {
  const facts = brand.heroFacts.map(f => `
    <div class="hero-fact">
      <div class="hero-fact-label">${escape(f.label)}</div>
      <div class="hero-fact-value">${escape(f.value)}</div>
    </div>`).join("");

  return `
  <section class="hero">
    <div class="hero-card hero-card--primary">
      <div class="hero-card-content">
        <div class="hero-eyebrow">Design System Inspiration of Porest</div>
        <h1 class="hero-title">${escape(brand.title)}</h1>
        <div class="hero-kicker">${escape(brand.kicker)}</div>
        <p class="hero-tagline">${escape(brand.tagline)}</p>
        <div class="hero-actions">
          <button class="btn btn-on-accent">Browse</button>
          <button class="btn btn-on-accent btn-outline-on-dark">View tokens</button>
        </div>
      </div>
      <div class="hero-card-art">${renderHeroArt(brand.key)}</div>
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
        Porest
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
      <p class="section-lede">큰 숫자 한 컷 + 21단계 스케일(한국어 베이스 + Airbnb reference batch v55-v57). 본문 15/1.6, heading은 1.25 ~ 1.4 line-height.</p>
    </header>
    <div class="typo-moment">
      <div class="typo-moment-top">
        <div class="typo-moment-left">
          <div class="typo-meta">${meta}</div>
        </div>
        <div class="typo-moment-right">
          <div class="typo-bignum">${escape(brand.bigNumber)}</div>
          <div class="typo-bignum-label">${escape(brand.bigNumberLabel)}</div>
        </div>
      </div>
      <div class="typo-scale-grid">${scaleRows}</div>
    </div>
  </section>`;
}

export function renderButtonGallery(brand) {
  const states = ["default", "hover", "pressed", "focus", "disabled"];
  const variants = [
    { key: "primary", label: "primary" },
    { key: "outline", label: "outline" },
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
      <h2 class="section-title">Primary · outline · ghost</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    <div class="btn-matrix">
      ${head}
      ${variantRows}
    </div>
    ${sizeRow}
  </section>`;
}

// checkbox helper — spec: specs/components/checkbox.md
const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const DASH_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>';

export function cbox({ state = "default", size = "md", id = "" } = {}) {
  const modifiers = [`checkbox--${size}`];
  let icon = "";
  let aria = "false";
  if (state === "checked") { modifiers.push("checkbox--checked"); icon = CHECK_SVG; aria = "true"; }
  else if (state === "indeterminate") { modifiers.push("checkbox--indeterminate"); icon = DASH_SVG; aria = "mixed"; }
  else if (state === "focus") modifiers.push("checkbox--focus");
  else if (state === "disabled") modifiers.push("checkbox--disabled");
  else if (state === "error") modifiers.push("checkbox--error");
  const isDisabled = state === "disabled";
  return `<button type="button" role="checkbox" aria-checked="${aria}"${isDisabled ? " disabled" : ""}${state === "error" ? ` aria-invalid="true"` : ""}${id ? ` id="${id}"` : ""} class="checkbox ${modifiers.join(" ")}">${icon}</button>`;
}

export function renderCheckboxGallery(brand) {
  const states = [
    { key: "default", label: "DEFAULT", desc: "surface-default + border-strong" },
    { key: "hover", label: "HOVERED", desc: "bg-surface-input (hover affordance)", state: "default", hover: true },
    { key: "checked", label: "CHECKED", desc: "bg-primary + 흰 체크 (stroke 3)" },
    { key: "indeterminate", label: "INDETERMINATE", desc: "bg-primary + 흰 dash (부모-자식 그룹)" },
    { key: "focus", label: "FOCUSED", desc: "2px border-focus + 2px offset (다크는 light)" },
    { key: "disabled", label: "DISABLED", desc: "opacity 0.5 + cursor not-allowed" },
    { key: "error", label: "ERROR", desc: "border-error + ring 30% · aria-invalid" },
  ];

  const matrix = states.map(s => {
    let cb;
    if (s.hover) {
      cb = `<span class="checkbox checkbox--md" style="background:var(--color-surface-input);"></span>`;
    } else {
      cb = cbox({ state: s.key });
    }
    return `
    <div class="cb-matrix-label">${s.label}</div>
    <div>${cb}</div>
    <div class="cb-matrix-desc">${escape(s.desc)}</div>`;
  }).join("");

  const sizes = ["sm", "md", "lg"].map((sz, i) => {
    const dim = sz === "sm" ? 16 : sz === "md" ? 18 : 20;
    const note = sz === "md" ? " (default)" : "";
    return `<div class="cb-size-cell">${cbox({ state: "checked", size: sz })}<span>${sz} · ${dim}${note}</span></div>`;
  }).join("");

  const sample = brand.key === "hr"
    ? [
        { label: "엔지니어링", state: "checked", id: "cb-hr-eng" },
        { label: "디자인", state: "checked", id: "cb-hr-design" },
        { label: "PM", state: "default", id: "cb-hr-pm" },
        { label: "HR / 운영", state: "default", id: "cb-hr-ops" },
      ]
    : brand.key === "desk"
      ? [
          { label: "필수 약관", state: "checked", id: "cb-desk-1" },
          { label: "마케팅 수신 (선택)", state: "default", id: "cb-desk-2" },
          { label: "개인정보 수집 동의", state: "checked", id: "cb-desk-3" },
        ]
      : [
          { label: "기본 토큰", state: "checked", id: "cb-sh-1" },
          { label: "확장 토큰", state: "default", id: "cb-sh-2" },
          { label: "Deprecated", state: "default", id: "cb-sh-3" },
        ];

  const groupTitle = brand.key === "hr" ? "필터링할 부서" : brand.key === "desk" ? "약관 동의" : "토큰 그룹";
  const parentState = sample.every(s => s.state === "checked") ? "checked" : sample.some(s => s.state === "checked") ? "indeterminate" : "default";
  const groupRows = sample.map(s => `
    <div class="cb-row">${cbox({ state: s.state, id: s.id })}<label class="cb-row-label" for="${s.id}">${escape(s.label)}</label></div>`).join("");

  const lede = "Spec: specs/components/checkbox.md — sm 16 / md 18 (default) / lg 20 · radius-sm · stroke 3 · 터치 타겟은 label 포함 row hit area로 확보.";

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03b — Checkbox</div>
      <h2 class="section-title">State · Size · Group</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    <div class="cb-matrix">${matrix}</div>
    <div class="cb-size-row" style="margin-top: var(--spacing-xl);">
      <div class="btn-size-label">size</div>
      ${sizes}
    </div>
    <div class="vignette-card" style="margin-top: var(--spacing-xl);">
      <div class="vignette-head">
        <div class="vignette-title">${escape(groupTitle)} — parent ${parentState}</div>
        <div class="vignette-sub">label 클릭 시 row 전체 toggle (htmlFor)</div>
      </div>
      <div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
        <div class="cb-row">${cbox({ state: parentState, id: "cb-parent" })}<label class="cb-row-label" for="cb-parent">전체 선택</label></div>
        <div style="display:flex; flex-direction:column; gap:var(--spacing-sm); padding-left:24px;">${groupRows}</div>
      </div>
    </div>
  </section>`;
}

export function renderVignettes(brand) {
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
            <button class="btn btn-outline btn-size-sm">반려</button>
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

export function renderListingDetail(brand) {
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

  const galleryHtml = (ld.gallery && ld.gallery.length) ? `
    <div class="ld-gallery">
      ${ld.gallery.map((g, i) => `
        <div class="ld-gallery-cell ld-gallery-cell--${i === 0 ? "hero" : "thumb"}" style="--cell-tone: var(--color-${escape(g.tone)});">
          <span class="ld-gallery-label">${escape(g.label)}</span>
        </div>`).join("")}
    </div>` : "";

  const highlightsHtml = (ld.highlights && ld.highlights.length) ? `
    <div class="ld-highlights">
      ${ld.highlights.map(h => `
        <div class="ld-highlight">
          <div class="ld-highlight-icon" aria-hidden="true">${escape(h.icon)}</div>
          <div class="ld-highlight-text">
            <div class="ld-highlight-label">${escape(h.label)}</div>
            <div class="ld-highlight-note">${escape(h.note)}</div>
          </div>
        </div>`).join("")}
    </div>` : "";

  const hostHtml = ld.host ? `
    <div class="ld-host">
      <div class="ld-host-avatar" aria-hidden="true">${escape((ld.host.name || "?").slice(0, 1))}</div>
      <div class="ld-host-text">
        <div class="ld-host-name">${escape(ld.host.name)}<span class="ld-host-role"> · ${escape(ld.host.role)}</span></div>
        <div class="ld-host-bio">${escape(ld.host.bio)}</div>
        <div class="ld-host-since">${escape(ld.host.since)}</div>
      </div>
    </div>` : "";

  const railSubtitle = ld.rail.subtitle ? `<div class="ld-rail-subtitle">${escape(ld.rail.subtitle)}</div>` : "";

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">05 — Detail layout</div>
      <h2 class="section-title">${escape(ld.title)}</h2>
      <p class="section-lede">${escape(ld.meta)}</p>
    </header>
    ${galleryHtml}
    <div class="ld-grid">
      <div class="ld-main">
        ${headBlock}
        ${highlightsHtml}
        ${hostHtml}
        ${sections}
      </div>
      <aside class="ld-rail">
        <div class="ld-rail-title">${escape(ld.rail.title)}</div>
        ${railSubtitle}
        <div class="ld-rail-fields">${railFields}</div>
        <button class="btn btn-primary ld-rail-primary">${escape(ld.rail.primary)}</button>
        ${ld.rail.primaryNote ? `<div class="ld-rail-note">${escape(ld.rail.primaryNote)}</div>` : ""}
        <button class="btn btn-outline ld-rail-secondary">${escape(ld.rail.secondary)}</button>
      </aside>
    </div>
  </section>`;
}

export function renderCalendar(brand) {
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

export function renderEmptyState(brand) {
  const e = brand.emptyState;
  if (!e) return "";
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">09 — Empty state</div>
      <h2 class="section-title">${escape(e.title)}</h2>
      <p class="section-lede">빈 상태 시각화 — 의미 + 다음 행동 가이드. surface-default 카드 + circular illustration + primary/outline CTA.</p>
    </header>
    <div class="empty-card">
      <div class="empty-illustration" aria-hidden="true"></div>
      <div class="empty-title">${escape(e.title)}</div>
      <div class="empty-description">${escape(e.description)}</div>
      <div class="empty-actions">
        <button class="btn btn-primary">${escape(e.primary)}</button>
        <button class="btn btn-outline">${escape(e.secondary)}</button>
      </div>
    </div>
  </section>`;
}

export function renderModal(brand) {
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
          <button class="btn btn-outline">${escape(m.secondary)}</button>
          <button class="btn btn-primary">${escape(m.primary)}</button>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderToasts(brand) {
  const ts = brand.toasts || [];
  if (!ts.length) return "";
  // sonner.md SoT — 20px stroke svg, kind별 stroke 색상. fill 채움 금지.
  const iconSvg = (k) => {
    const stroke = `var(--color-${k === "error" ? "error" : k === "warning" ? "warning" : k === "info" ? "info" : "success"})`;
    const path = k === "success"
      ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
      : k === "error"
        ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
        : k === "warning"
          ? '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
          : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>';
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  };
  const items = ts.map(t => `
    <div class="toast toast-${t.kind}">
      ${iconSvg(t.kind)}
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

export function renderSkeleton(brand) {
  const sk = brand.skeleton;
  if (!sk) return "";

  let body = "";
  if (sk.layout === "list") {
    const rows = Array.from({ length: sk.items || 5 }, () => `
      <div class="sk-row">
        <div class="sk sk-circle" style="width:32px;height:32px;"></div>
        <div class="sk-row-content">
          <div class="sk sk-text" style="width:40%;"></div>
          <div class="sk sk-text sk-text-sm" style="width:65%;"></div>
        </div>
        <div class="sk sk-rect" style="width:60px;height:20px;border-radius:9999px;"></div>
      </div>`).join("");
    body = `<div class="sk-stack">${rows}</div>`;
  } else if (sk.layout === "card") {
    const cards = Array.from({ length: sk.items || 4 }, () => `
      <div class="sk-card">
        <div class="sk sk-text" style="width:80%;height:24px;"></div>
        <div class="sk sk-text" style="width:100%;"></div>
        <div class="sk sk-text" style="width:60%;"></div>
        <div class="sk-tags-row">
          <div class="sk sk-rect" style="width:50px;height:18px;border-radius:9999px;"></div>
          <div class="sk sk-rect" style="width:70px;height:18px;border-radius:9999px;"></div>
        </div>
      </div>`).join("");
    body = `<div class="sk-grid">${cards}</div>`;
  } else {
    // demo: 4 variants
    body = `
      <div class="sk-demo">
        <div class="sk-demo-cell">
          <div class="sk-demo-label">text · 3 lines</div>
          <div class="sk sk-text" style="width:100%;"></div>
          <div class="sk sk-text" style="width:100%;"></div>
          <div class="sk sk-text" style="width:60%;"></div>
        </div>
        <div class="sk-demo-cell">
          <div class="sk-demo-label">circle · avatar</div>
          <div style="display:flex;gap:var(--spacing-md);align-items:center;">
            <div class="sk sk-circle" style="width:24px;height:24px;"></div>
            <div class="sk sk-circle" style="width:32px;height:32px;"></div>
            <div class="sk sk-circle" style="width:48px;height:48px;"></div>
          </div>
        </div>
        <div class="sk-demo-cell">
          <div class="sk-demo-label">rect · card</div>
          <div class="sk sk-rect" style="width:100%;height:80px;"></div>
        </div>
        <div class="sk-demo-cell">
          <div class="sk-demo-label">list-row</div>
          <div class="sk-row">
            <div class="sk sk-circle" style="width:32px;height:32px;"></div>
            <div class="sk-row-content">
              <div class="sk sk-text" style="width:50%;"></div>
              <div class="sk sk-text sk-text-sm" style="width:75%;"></div>
            </div>
          </div>
        </div>
      </div>`;
  }

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">13 — Skeleton / Loading</div>
      <h2 class="section-title">${escape(sk.title)}</h2>
      <p class="section-lede">${escape(sk.description)}</p>
    </header>
    <div class="sk-card-wrap" aria-busy="true" aria-label="콘텐츠 로딩 중">
      ${body}
    </div>
  </section>`;
}

export function renderForm(brand) {
  const f = brand.form;
  if (!f) return "";

  const renderField = (field) => {
    const reqMark = field.required ? `<span class="form-required" aria-hidden="true">*</span>` : "";
    const helper = field.helper ? `<div class="form-helper">${escape(field.helper)}</div>` : "";
    let control = "";
    if (field.type === "input") {
      control = `<div class="form-input${field.readonly ? " form-input--readonly" : ""}">${escape(field.value)}</div>`;
    } else if (field.type === "select") {
      // shadcn select.tsx와 동일 — lucide ChevronDown 16×16 SVG, text-tertiary.
      control = `<div class="form-select">
        <span>${escape(field.value)}</span>
        <svg class="form-select-caret" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>`;
    } else if (field.type === "textarea") {
      const rows = field.rows || 4;
      const minHeight = rows * 24 + 24;
      const valueHtml = escape(field.value).replace(/\n/g, "<br>");
      control = `<div class="form-textarea" style="min-height:${minHeight}px">${valueHtml}</div>`;
    }
    return `
      <div class="form-group">
        <div class="form-label">${escape(field.label)}${reqMark}</div>
        ${control}
        ${helper}
      </div>`;
  };

  const fields = f.fields.map(renderField).join("");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">12 — Form layout</div>
      <h2 class="section-title">${escape(f.title)}</h2>
      <p class="section-lede">${escape(f.sectionDescription)}</p>
    </header>
    <div class="form-card">
      <div class="form-grid">${fields}</div>
      <div class="form-actions">
        <button class="btn btn-primary">${escape(f.primary)}</button>
        <button class="btn btn-outline">${escape(f.secondary)}</button>
      </div>
    </div>
  </section>`;
}

export function renderBatchV67(brand) {
  const isHr = brand.key === "hr";
  const isDesk = brand.key === "desk";

  // Pagination
  const pgNumbered = [1, 2, 3, "...", 9, 10];
  const pgCurrent = 2;
  const pgItems = pgNumbered.map(n => {
    if (n === "...") return `<span class="pg-ellipsis">...</span>`;
    const cur = n === pgCurrent;
    return `<button class="pg-btn${cur ? " pg-btn--current" : ""}" type="button"${cur ? ` aria-current="page"` : ""}>${n}</button>`;
  }).join("");

  const pagination = isDesk
    ? `<div class="pg-block">
        <div class="pg-label">Load-more variant (Desk 모바일 우선)</div>
        <button class="btn btn-outline pg-loadmore" type="button">더 보기 (12 / 58)</button>
       </div>`
    : `<div class="pg-block">
        <div class="pg-label">Numbered variant (${isHr ? "HR 데이터 그리드 footer" : "shared baseline"})</div>
        <nav class="pg-nav" aria-label="페이지 네비게이션">
          <button class="pg-arrow" type="button" aria-label="이전 페이지">←</button>
          <div class="pg-numbers">${pgItems}</div>
          <button class="pg-arrow" type="button" aria-label="다음 페이지">→</button>
        </nav>
       </div>`;

  // Drawer (정적 표시 — 실제 슬라이드 안 함)
  const drawerLabel = isHr
    ? "Side drawer (HR 직원 detail panel)"
    : isDesk
      ? "Bottom sheet (Desk 거래 입력)"
      : "Drawer pattern (side / bottom 양쪽)";
  const drawer = isDesk
    ? `<div class="drw-frame">
        <div class="drw-bottom">
          <div class="drw-handle"></div>
          <div class="drw-header">
            <div class="drw-title">거래 추가</div>
            <button class="drw-close" type="button" aria-label="닫기">✕</button>
          </div>
          <div class="drw-body">
            <div class="drw-row"><span class="drw-key">유형</span><span class="drw-val">지출</span></div>
            <div class="drw-row"><span class="drw-key">금액</span><span class="drw-val">₩28,500</span></div>
            <div class="drw-row"><span class="drw-key">카테고리</span><span class="drw-val">식비 · 카페</span></div>
          </div>
          <div class="drw-actions">
            <button class="btn btn-primary" type="button">저장</button>
          </div>
        </div>
       </div>`
    : `<div class="drw-frame">
        <div class="drw-side">
          <div class="drw-header">
            <div class="drw-title">${isHr ? "직원 상세 — 김지원" : "Detail panel"}</div>
            <button class="drw-close" type="button" aria-label="닫기">✕</button>
          </div>
          <div class="drw-body">
            <div class="drw-row"><span class="drw-key">사번</span><span class="drw-val">PR-2024-0312</span></div>
            <div class="drw-row"><span class="drw-key">부서</span><span class="drw-val">디자인 본부</span></div>
            <div class="drw-row"><span class="drw-key">직급</span><span class="drw-val">시니어</span></div>
            <div class="drw-row"><span class="drw-key">근속</span><span class="drw-val">2년차</span></div>
          </div>
          <div class="drw-actions">
            <button class="btn btn-primary" type="button">${isHr ? "권한 수정" : "편집"}</button>
            <button class="btn btn-outline" type="button">취소</button>
          </div>
        </div>
       </div>`;

  // Spinner / Progress
  const spinner = `
    <div class="sp-block">
      <div class="sp-row">
        <div class="sp-cell">
          <div class="sp-label">Circular · md 24</div>
          <div class="sp-spinner" role="status" aria-label="로딩 중"></div>
        </div>
        <div class="sp-cell">
          <div class="sp-label">Circular · lg 32</div>
          <div class="sp-spinner sp-spinner--lg" role="status" aria-label="로딩 중"></div>
        </div>
        <div class="sp-cell">
          <div class="sp-label">Inline + 라벨</div>
          <div class="sp-inline">
            <div class="sp-spinner sp-spinner--sm" role="status" aria-label="처리 중"></div>
            <span>${isHr ? "결재 처리 중..." : isDesk ? "메모 저장 중..." : "처리 중..."}</span>
          </div>
        </div>
      </div>
      <div class="sp-row">
        <div class="sp-cell sp-cell--full">
          <div class="sp-label">Determinate progress · 62%</div>
          <div class="sp-progress" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" aria-label="${isHr ? "일괄 승인" : isDesk ? "이미지 업로드" : "진행"}">
            <div class="sp-progress-fill" style="width: 62%;"></div>
          </div>
          <div class="sp-progress-meta"><span>${isHr ? "47 / 76 결재" : isDesk ? "1.2MB / 1.9MB" : "62 / 100"}</span><span>62%</span></div>
        </div>
      </div>
      <div class="sp-row">
        <div class="sp-cell sp-cell--full">
          <div class="sp-label">Indeterminate progress (sweeping)</div>
          <div class="sp-progress sp-progress--indeterminate" role="progressbar" aria-label="동기화 중">
            <div class="sp-progress-sweep"></div>
          </div>
        </div>
      </div>
    </div>`;

  // Stepper
  const stepperData = isHr
    ? { variant: "horizontal", steps: ["신청", "1차 결재", "2차 결재", "완료"], current: 1 }
    : isDesk
      ? { variant: "horizontal", steps: ["계정", "프로필", "카테고리", "알림", "완료"], current: 2 }
      : { variant: "horizontal", steps: ["Token", "Component", "Lint", "Export"], current: 1 };
  const stepper = `
    <div class="stp-block">
      <div class="stp-label">${stepperData.variant === "horizontal" ? "Horizontal" : "Vertical"} stepper · ${isHr ? "결재 단계 sequential" : isDesk ? "onboarding 5단계" : "build pipeline"}</div>
      <nav class="stp" aria-label="단계 진행">
        <ol class="stp-list">
          ${stepperData.steps.map((label, i) => {
            let state = "pending";
            if (i < stepperData.current) state = "completed";
            else if (i === stepperData.current) state = "current";
            const aria = state === "current" ? ` aria-current="step"` : "";
            const num = state === "completed" ? "✓" : (i + 1);
            return `
              <li class="stp-item stp-item--${state}"${aria}>
                <div class="stp-circle">${num}</div>
                <div class="stp-label-text">${escape(label)}</div>
                ${i < stepperData.steps.length - 1 ? `<div class="stp-connector"></div>` : ""}
              </li>`;
          }).join("")}
        </ol>
      </nav>
    </div>`;

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">14 — Components batch (v67)</div>
      <h2 class="section-title">Pagination · Drawer · Spinner · Stepper</h2>
      <p class="section-lede">시스템 빈틈 4 컴포넌트 — 모두 prose-only spec, 새 토큰 0 (기존 합성).</p>
    </header>
    <div class="batch-grid">
      <div class="batch-card">
        <div class="batch-card-head">${escape("Pagination")}</div>
        ${pagination}
      </div>
      <div class="batch-card">
        <div class="batch-card-head">${escape(drawerLabel)}</div>
        ${drawer}
      </div>
      <div class="batch-card">
        <div class="batch-card-head">Spinner / Progress</div>
        ${spinner}
      </div>
      <div class="batch-card batch-card--full">
        <div class="batch-card-head">Stepper</div>
        ${stepper}
      </div>
    </div>
  </section>`;
}

// === v68-v72 shadcn batch showcase ===

export function renderShadcnNav(brand) {
  // v68 Navigation 5
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">15 — Navigation (v68)</div>
      <h2 class="section-title">Breadcrumb · Sidebar · Nav Menu · Menubar · Command</h2>
      <p class="section-lede">5 navigation 컴포넌트 — 페이지 위계, 좌측 nav, 데스크탑 menu, 전역 command.</p>
    </header>
    <div class="sc-grid">
      <div class="sc-card">
        <div class="sc-head">Breadcrumb</div>
        <nav class="bc" aria-label="경로">
          <a class="bc-link">Home</a><span class="bc-sep">/</span>
          <a class="bc-link">${brand.key === "hr" ? "결재" : brand.key === "desk" ? "메모" : "Tokens"}</a><span class="bc-sep">/</span>
          <a class="bc-link">${brand.key === "hr" ? "결재 큐" : brand.key === "desk" ? "보관함" : "Colors"}</a><span class="bc-sep">/</span>
          <span class="bc-current" aria-current="page">${brand.key === "hr" ? "김지원 휴가" : brand.key === "desk" ? "Porest 톤" : "Surface"}</span>
        </nav>
      </div>
      <div class="sc-card">
        <div class="sc-head">Sidebar (mini)</div>
        <aside class="sb">
          <div class="sb-group">${brand.key === "hr" ? "결재" : brand.key === "desk" ? "내 데이터" : "Tokens"}</div>
          <div class="sb-item sb-item--active">${brand.key === "hr" ? "결재 큐" : brand.key === "desk" ? "메모" : "Colors"}</div>
          <div class="sb-item">${brand.key === "hr" ? "직원" : brand.key === "desk" ? "할일" : "Typography"}</div>
          <div class="sb-item">${brand.key === "hr" ? "평가" : brand.key === "desk" ? "가계부" : "Spacing"}</div>
          <div class="sb-item">${brand.key === "hr" ? "분석" : brand.key === "desk" ? "캘린더" : "Components"}</div>
        </aside>
      </div>
      <div class="sc-card">
        <div class="sc-head">Navigation Menu</div>
        <nav class="nm">
          <button class="nm-item nm-item--active">Home</button>
          <button class="nm-item">${brand.key === "hr" ? "결재" : brand.key === "desk" ? "메모" : "Products"}</button>
          <button class="nm-item">${brand.key === "hr" ? "직원" : brand.key === "desk" ? "할일" : "Pricing"}</button>
          <button class="nm-item">${brand.key === "hr" ? "분석" : brand.key === "desk" ? "가계부" : "Docs"}</button>
        </nav>
      </div>
      <div class="sc-card">
        <div class="sc-head">Menubar</div>
        <div class="mb">
          <button class="mb-item">File <span class="mb-key">⌘N</span></button>
          <button class="mb-item">Edit <span class="mb-key">⌘E</span></button>
          <button class="mb-item">View <span class="mb-key">⌘V</span></button>
          <button class="mb-item">Help</button>
        </div>
      </div>
      <div class="sc-card sc-card--full">
        <div class="sc-head">Command (⌘K) — 전역 search/action</div>
        <div class="cmd">
          <input class="cmd-input" placeholder="명령 또는 검색..." readonly>
          <div class="cmd-section">
            <div class="cmd-group">${brand.key === "hr" ? "Recent" : "Suggestions"}</div>
            <div class="cmd-item"><span>${brand.key === "hr" ? "김지원 휴가 승인" : brand.key === "desk" ? "새 메모 작성" : "Run verify"}</span><span class="cmd-shortcut">⌘P</span></div>
            <div class="cmd-item"><span>${brand.key === "hr" ? "5월 평가 시작" : brand.key === "desk" ? "할일 추가" : "Build preview"}</span><span class="cmd-shortcut">⌘N</span></div>
            <div class="cmd-group">Pages</div>
            <div class="cmd-item"><span>${brand.key === "hr" ? "결재 큐" : brand.key === "desk" ? "메모 보관함" : "Token reference"}</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderShadcnInput(brand) {
  // v69 Input 5
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">16 — Input (v69)</div>
      <h2 class="section-title">Combobox · Slider · Toggle · Toggle Group · Input OTP</h2>
      <p class="section-lede">5 input/selection 컴포넌트 — typing autocomplete, range, on/off, group, 일회용 코드.</p>
    </header>
    <div class="sc-grid">
      <div class="sc-card">
        <div class="sc-head">Combobox</div>
        <div class="cb">
          <span>${brand.key === "hr" ? "디자인 본부" : brand.key === "desk" ? "#brand · #design" : "spacing"}</span>
          <span class="cb-caret">▾</span>
        </div>
        <div class="sc-note">typing 시 autocomplete dropdown</div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Slider</div>
        <div class="sld">
          <div class="sld-track">
            <div class="sld-fill" style="width: 62%;"></div>
            <div class="sld-thumb" style="left: 62%;"></div>
          </div>
          <div class="sld-meta"><span>${brand.key === "hr" ? "0" : "₩0"}</span><span>62%</span><span>${brand.key === "hr" ? "100" : "₩1M"}</span></div>
        </div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Toggle (single)</div>
        <div class="tg-row">
          <button class="tg tg--on" aria-pressed="true">★ 즐겨찾기</button>
          <button class="tg" aria-pressed="false">🔖 보관</button>
        </div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Toggle Group (single)</div>
        <div class="tgg" role="radiogroup">
          <button class="tgg-item">${brand.key === "hr" ? "이름순" : "list"}</button>
          <button class="tgg-item tgg-item--active" aria-checked="true">${brand.key === "hr" ? "날짜순" : "grid"}</button>
          <button class="tgg-item">${brand.key === "hr" ? "우선순위" : "card"}</button>
        </div>
      </div>
      <div class="sc-card sc-card--full">
        <div class="sc-head">Input OTP — 6자리</div>
        <div class="otp">
          <div class="otp-cell otp-cell--filled">3</div>
          <div class="otp-cell otp-cell--filled">7</div>
          <div class="otp-cell otp-cell--filled">2</div>
          <span class="otp-sep" role="separator" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
          <div class="otp-cell otp-cell--focus">4</div>
          <div class="otp-cell"></div>
          <div class="otp-cell"></div>
        </div>
        <div class="sc-note">autocomplete="one-time-code" — iOS SMS 자동 채우기</div>
      </div>
    </div>
  </section>`;
}

export function renderShadcnDisclose(brand) {
  // v70 Disclosure 5
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">17 — Disclosure (v70)</div>
      <h2 class="section-title">Accordion · Collapsible · Hover Card · Context Menu · Alert Dialog</h2>
      <p class="section-lede">5 disclosure/overlay 컴포넌트 — 접기/펼치기, hover preview, right-click, destructive confirm.</p>
    </header>
    <div class="sc-grid">
      <div class="sc-card">
        <div class="sc-head">Accordion (single)</div>
        <div class="acc">
          <div class="acc-item acc-item--open">
            <div class="acc-trigger">${brand.key === "hr" ? "신청 정보" : brand.key === "desk" ? "보기 옵션" : "Source"} <span>▴</span></div>
            <div class="acc-body">${brand.key === "hr" ? "직원/기간/사유" : brand.key === "desk" ? "list / grid / card" : "DESIGN.md → HR/Desk"}</div>
          </div>
          <div class="acc-item">
            <div class="acc-trigger">${brand.key === "hr" ? "첨부 파일" : brand.key === "desk" ? "정렬 옵션" : "Lint policy"} <span>▾</span></div>
          </div>
          <div class="acc-item">
            <div class="acc-trigger">${brand.key === "hr" ? "결재 history" : brand.key === "desk" ? "알림" : "Sync"} <span>▾</span></div>
          </div>
        </div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Collapsible</div>
        <button class="col-trigger">${brand.key === "hr" ? "첨부 3개" : brand.key === "desk" ? "자세히 보기" : "더 보기"} <span>▾</span></button>
        <div class="sc-note">단일 toggle — Accordion보다 가벼움</div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Hover Card</div>
        <div class="hc">
          <div class="hc-avatar">${brand.key === "hr" ? "박" : brand.key === "desk" ? "김" : "P"}</div>
          <div class="hc-body">
            <div class="hc-name">${brand.key === "hr" ? "박서연 · 본부장" : brand.key === "desk" ? "김지원 · 사용자" : "Porest"}</div>
            <div class="hc-bio">${brand.key === "hr" ? "디자인 시스템 매니저, 6년차" : brand.key === "desk" ? "메모 234건 · 할일 58건" : "shared baseline"}</div>
          </div>
        </div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Context Menu</div>
        <div class="ctx">
          <div class="ctx-item">${brand.key === "hr" ? "승인" : brand.key === "desk" ? "즐겨찾기" : "Edit"}</div>
          <div class="ctx-item">${brand.key === "hr" ? "반려" : brand.key === "desk" ? "보관" : "Duplicate"}</div>
          <div class="ctx-sep"></div>
          <div class="ctx-item ctx-item--destructive">${brand.key === "hr" ? "삭제" : brand.key === "desk" ? "삭제" : "Delete"}</div>
        </div>
        <div class="sc-note">right-click / long-press</div>
      </div>
      <div class="sc-card sc-card--full">
        <div class="sc-head">Alert Dialog (destructive) — spec: specs/components/alert-dialog.md · overlay click 무시, close button 없음, default focus = Cancel</div>
        <div class="modal-stage" style="height:auto; padding:var(--spacing-xl); background:linear-gradient(135deg, var(--color-chart-blue), var(--color-chart-violet));">
          <div class="modal-overlay"></div>
          <div class="modal-dialog" role="alertdialog" aria-modal="true">
            <div class="modal-title">${brand.key === "hr" ? "정말 권한을 회수하시겠어요?" : brand.key === "desk" ? "메모를 영구 삭제할까요?" : "정말 삭제하시겠어요?"}</div>
            <div class="modal-description">${brand.key === "hr" ? "이 직원의 모든 권한이 회수됩니다. 복구는 관리자 승인 필요." : brand.key === "desk" ? "30일 보관함을 거치지 않고 즉시 삭제됩니다." : "이 작업은 되돌릴 수 없습니다."}</div>
            <div class="modal-actions">
              <button class="btn btn-outline" autofocus>취소</button>
              <button class="btn btn-destructive">${brand.key === "hr" ? "회수" : "삭제"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderShadcnData(brand) {
  // v71 Data 5
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">18 — Data (v71)</div>
      <h2 class="section-title">Table · Data Table · Carousel · Scroll Area · Resizable</h2>
      <p class="section-lede">5 data display 컴포넌트 — 표, 정렬·필터, 슬라이더, 커스텀 scroll, 분할 panel.</p>
    </header>
    <div class="sc-grid">
      <div class="sc-card sc-card--full">
        <div class="sc-head">Data Table — sortable + selectable + bulk action</div>
        <div class="dt">
          <div class="dt-bulk">3개 선택됨 · <button class="dt-bulk-btn">${brand.key === "hr" ? "일괄 승인" : brand.key === "desk" ? "보관" : "Export"}</button> · <button class="dt-bulk-btn">삭제</button></div>
          <table class="dt-table">
            <thead><tr><th>${cbox({ state: "indeterminate" })}</th><th>${brand.key === "hr" ? "신청자" : brand.key === "desk" ? "제목" : "Token"} <span class="dt-sort">↑</span></th><th>${brand.key === "hr" ? "기간" : brand.key === "desk" ? "수정일" : "Value"}</th><th>${brand.key === "hr" ? "상태" : brand.key === "desk" ? "태그" : "Type"}</th></tr></thead>
            <tbody>
              <tr><td>${cbox({ state: "checked" })}</td><td>${brand.key === "hr" ? "김지원" : brand.key === "desk" ? "Porest 톤" : "primary"}</td><td>${brand.key === "hr" ? "5/12-14" : brand.key === "desk" ? "2시간 전" : "#357B5F"}</td><td><span class="dt-badge dt-badge--success">${brand.key === "hr" ? "승인" : brand.key === "desk" ? "공개" : "color"}</span></td></tr>
              <tr><td>${cbox({ state: "checked" })}</td><td>${brand.key === "hr" ? "이도현" : brand.key === "desk" ? "5월 회고" : "primary-light"}</td><td>${brand.key === "hr" ? "5/15-16" : brand.key === "desk" ? "어제" : "#5DAD86"}</td><td><span class="dt-badge dt-badge--warning">${brand.key === "hr" ? "대기" : brand.key === "desk" ? "초안" : "color"}</span></td></tr>
              <tr><td>${cbox({ state: "checked" })}</td><td>${brand.key === "hr" ? "최가람" : brand.key === "desk" ? "참고 자료" : "border-focus"}</td><td>${brand.key === "hr" ? "5/20" : brand.key === "desk" ? "3일 전" : "#357B5F"}</td><td><span class="dt-badge">${brand.key === "hr" ? "반려" : brand.key === "desk" ? "보관" : "color"}</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Carousel</div>
        <div class="car">
          <button class="car-arrow">‹</button>
          <div class="car-frame">${brand.key === "hr" ? "Slide 2 / 5" : brand.key === "desk" ? "Onboarding · 1/4" : "Slide"}</div>
          <button class="car-arrow">›</button>
        </div>
        <div class="car-dots">
          <span class="car-dot"></span>
          <span class="car-dot car-dot--active"></span>
          <span class="car-dot"></span>
          <span class="car-dot"></span>
          <span class="car-dot"></span>
        </div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Scroll Area + Resizable hint</div>
        <div class="sa">
          <div class="sa-content">${"긴 콘텐츠 ".repeat(8)}</div>
        </div>
        <div class="sc-note">3-pane layout: nav | content | detail (resizable handles)</div>
      </div>
    </div>
  </section>`;
}

export function renderShadcnExtras(brand) {
  // v72 Extras 5
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">19 — Extras (v72)</div>
      <h2 class="section-title">Sonner · Aspect Ratio · Chart · Date Range · Time Picker</h2>
      <p class="section-lede">5 추가 컴포넌트 — toast stack, 비율 wrapper, 차트, 기간/시각 선택.</p>
    </header>
    <div class="sc-grid">
      <div class="sc-card">
        <div class="sc-head">Sonner — toast stack</div>
        <div class="son">
          <div class="son-toast son-toast--success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>${brand.key === "hr" ? "결재 승인 완료" : brand.key === "desk" ? "메모 저장 완료" : "Build 통과"}</span>
          </div>
          <div class="son-toast son-toast--info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-info)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>${brand.key === "hr" ? "신규 평가 등록" : brand.key === "desk" ? "동기화 완료" : "Token 갱신"}</span>
          </div>
          <div class="son-toast son-toast--warning">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>${brand.key === "hr" ? "기한 임박 D-3" : brand.key === "desk" ? "예산 80% 도달" : "warning 1건"}</span>
          </div>
        </div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Aspect Ratio (16:9)</div>
        <div class="ar ar--16-9">
          <div class="ar-content">${brand.key === "hr" ? "직원 cover" : brand.key === "desk" ? "메모 attachment" : "16:9 image"}</div>
        </div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Chart (bar mini)</div>
        <div class="chart-mini">
          <div class="chart-bar" style="height: 30%; background: var(--color-chart-blue);"></div>
          <div class="chart-bar" style="height: 55%; background: var(--color-chart-blue);"></div>
          <div class="chart-bar" style="height: 70%; background: var(--color-chart-blue);"></div>
          <div class="chart-bar" style="height: 45%; background: var(--color-chart-blue);"></div>
          <div class="chart-bar" style="height: 85%; background: var(--color-chart-blue);"></div>
          <div class="chart-bar" style="height: 60%; background: var(--color-chart-blue);"></div>
          <div class="chart-bar" style="height: 75%; background: var(--color-chart-blue);"></div>
        </div>
        <div class="sc-note">${brand.key === "hr" ? "월별 결재 수" : brand.key === "desk" ? "주간 거래 합계" : "샘플 bar"}</div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Date Range Picker</div>
        <div class="drp">
          <span>2026-05-12</span>
          <span class="drp-arrow">→</span>
          <span>2026-05-14</span>
          <span class="drp-days">3일</span>
        </div>
        <div class="sc-note">presets: 오늘 / 지난 7일 / 이번 달</div>
      </div>
      <div class="sc-card">
        <div class="sc-head">Time Picker (5분 step)</div>
        <div class="tp">
          <span class="tp-hour">14</span>
          <span class="tp-sep">:</span>
          <span class="tp-min">30</span>
        </div>
        <div class="sc-note">${brand.key === "hr" ? "24h format · 결재 일정" : brand.key === "desk" ? "wheel picker · 모바일 native" : "시각 input"}</div>
      </div>
    </div>
  </section>`;
}

export function renderBatchV73V78(brand) {
  // v73(Banner/Tag/Popover/File Upload/Treeview) + v74(Animation) + v75(Form validation) + v76(RTL)
  const isHr = brand.key === "hr";
  const isDesk = brand.key === "desk";
  const bannerWarn = isHr ? "2026-06-01부터 개인정보 처리방침이 변경됩니다."
                          : isDesk ? "2026-05-15 23:00 ~ 24:00 동기화 일시 중단됩니다."
                                   : "약관 변경 예정 — sticky banner.";
  const tagSamples = isHr ? ["관리자", "HR-only", "협력자"]
                          : isDesk ? ["#업무", "#2026", "#회의록"]
                                   : ["sample-1", "sample-2", "sample-3"];
  const popoverHead = isHr ? "결재 의견" : isDesk ? "카테고리 빠른 변경" : "Popover (formal)";
  const treeRoot = isHr ? ["개발본부", "백엔드팀", "프론트팀"]
                        : isDesk ? ["식비", "외식", "마트"]
                                 : ["루트", "자식 1", "자식 2"];
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">20 — Extras-2 (v73) · Animation (v74) · Form validation (v75) · RTL (v76)</div>
      <h2 class="section-title">Banner · Tag/Chip · Popover · File Upload · Treeview · Animation · Form states · RTL</h2>
      <p class="section-lede">v73-v76 6 milestone 시각 데모 — shadcn 누락 5종 + 14 keyframe 라이브 + form 5 state + dir 토글.</p>
    </header>

    <!-- v73 Banner — 4 variant -->
    <div class="banner banner--info" role="status">
      <span class="banner-icon">i</span>
      <div class="banner-body"><strong>시스템 점검 안내</strong><span>${escape(bannerWarn)}</span></div>
      <button class="banner-close" aria-label="배너 닫기" type="button">×</button>
    </div>
    <div class="banner banner--warning" role="alert">
      <span class="banner-icon">!</span>
      <div class="banner-body"><strong>약관 변경 예정</strong><span>4월 30일까지 미동의 시 일부 기능이 제한될 수 있습니다.</span></div>
    </div>
    <div class="banner banner--error" role="alert">
      <span class="banner-icon">⚠</span>
      <div class="banner-body"><strong>결제 실패</strong><span>등록된 카드가 만료되었습니다. 카드 정보를 갱신해주세요.</span></div>
    </div>

    <div class="sc-grid">
      <!-- Tag / Chip -->
      <div class="sc-card">
        <div class="sc-head">Tag / Chip — closeable + input</div>
        <div class="chip-row">
          ${tagSamples.map(t => `<span class="chip"><span>${escape(t)}</span><button aria-label="제거" class="chip-x">×</button></span>`).join("")}
          <span class="chip chip--input"><input placeholder="추가" /></span>
        </div>
        <div class="sc-note">closeable + multi-tag input. ${isHr ? "결재라인 / 권한" : isDesk ? "메모 태그 multi" : "기본"}</div>
      </div>

      <!-- Popover -->
      <div class="sc-card">
        <div class="sc-head">Popover — interactive</div>
        <div class="pop-anchor">
          <button class="pop-trigger" aria-expanded="true" aria-haspopup="dialog" type="button">${escape(popoverHead)} ▾</button>
          <div class="pop" role="dialog">
            <textarea rows="3" placeholder="의견을 입력하세요"></textarea>
            <div class="pop-actions"><button class="btn btn--ghost" type="button">취소</button><button class="btn btn--primary" type="button">제출</button></div>
          </div>
        </div>
      </div>

      <!-- File Upload -->
      <div class="sc-card">
        <div class="sc-head">File Upload — 드래그-드롭</div>
        <div class="fu-zone">
          <div class="fu-icon">⬆</div>
          <div class="fu-label">파일을 드래그하거나 클릭</div>
          <div class="sc-note">PDF / 이미지, 최대 10MB</div>
        </div>
        <div class="fu-list">
          <div class="fu-item">
            <span class="fu-file-icon">📄</span>
            <div class="fu-meta"><span class="fu-name">${escape(isHr ? "Q1-evaluation.pdf" : isDesk ? "receipt-2026.jpg" : "sample.pdf")}</span>
            <div class="fu-progress"><div class="fu-progress-bar" style="width: 67%"></div></div></div>
            <button class="fu-remove" aria-label="제거" type="button">×</button>
          </div>
        </div>
      </div>

      <!-- Treeview -->
      <div class="sc-card">
        <div class="sc-head">Treeview — hierarchical</div>
        <ul class="tv" role="tree">
          <li role="treeitem" aria-expanded="true" aria-level="1">
            <button class="tv-row tv-row--expanded" type="button"><span class="tv-chev">▾</span>${escape(treeRoot[0])}</button>
            <ul role="group">
              <li role="treeitem" aria-level="2"><button class="tv-row" type="button"><span class="tv-chev">▸</span>${escape(treeRoot[1])}</button></li>
              <li role="treeitem" aria-level="2" aria-selected="true"><button class="tv-row tv-row--selected" type="button">${escape(treeRoot[2])}</button></li>
            </ul>
          </li>
        </ul>
        <div class="sc-note">arrow 네비 + Home/End / Enter select</div>
      </div>

      <!-- v74 Animation showcase -->
      <div class="sc-card sc-card--full">
        <div class="sc-head">Animation library (v74) — 4 keyframe 라이브 데모</div>
        <div class="anim-grid">
          <div class="anim-cell"><div class="anim-box anim-fade-in" key="fade-in">A</div><span class="sc-note">fade-in</span></div>
          <div class="anim-cell"><div class="anim-box anim-slide-in-up" key="slide-in-up">B</div><span class="sc-note">slide-in-up</span></div>
          <div class="anim-cell"><div class="anim-box anim-scale-in" key="scale-in">C</div><span class="sc-note">scale-in</span></div>
          <div class="anim-cell"><div class="anim-box anim-bounce-in" key="bounce-in">D</div><span class="sc-note">bounce-in</span></div>
          <div class="anim-cell"><div class="anim-box anim-shake" key="shake">E</div><span class="sc-note">shake (form error)</span></div>
          <div class="anim-cell"><div class="anim-box anim-spin" key="spin">↻</div><span class="sc-note">spin (loop)</span></div>
          <div class="anim-cell"><div class="anim-box anim-pulse" key="pulse">●</div><span class="sc-note">pulse (loop)</span></div>
          <div class="anim-cell"><div class="anim-box anim-shimmer" key="shimmer"></div><span class="sc-note">shimmer (skeleton)</span></div>
        </div>
        <div class="anim-actions"><button class="btn btn--outline anim-replay" type="button">▶ 다시 재생</button></div>
      </div>

      <!-- v75 Form validation states -->
      <div class="sc-card sc-card--full">
        <div class="sc-head">Form validation (v75) — 5 state machine</div>
        <div class="fv-grid">
          <div class="fv-cell">
            <label class="fv-label">idle (default)</label>
            <input class="fv-input" placeholder="이메일" />
            <span class="fv-helper">로그인 시 사용됩니다</span>
          </div>
          <div class="fv-cell">
            <label class="fv-label">focused</label>
            <input class="fv-input fv-input--focused" placeholder="이메일" value="hello@porest" />
            <span class="fv-helper">입력 중...</span>
          </div>
          <div class="fv-cell">
            <label class="fv-label">invalid</label>
            <input class="fv-input fv-input--invalid" value="hello@porest" aria-invalid="true" />
            <span class="fv-error" role="alert">올바른 이메일 주소를 입력해주세요</span>
          </div>
          <div class="fv-cell">
            <label class="fv-label">valid</label>
            <input class="fv-input fv-input--valid" value="hello@porest.app" />
            <span class="fv-success">사용 가능 ✓</span>
          </div>
          <div class="fv-cell">
            <label class="fv-label">validating (async)</label>
            <input class="fv-input" value="hello@porest.app" aria-busy="true" />
            <span class="fv-helper"><span class="fv-spinner"></span> 중복 확인 중...</span>
          </div>
        </div>
      </div>

      <!-- v76 RTL toggle -->
      <div class="sc-card sc-card--full">
        <div class="sc-head">RTL support (v76) — dir 토글로 logical property mirror</div>
        <div class="rtl-demo" id="rtl-demo">
          <div class="rtl-row">
            <button class="btn btn--primary rtl-btn"><span class="rtl-icon">→</span> ${isHr ? "결재 진행" : isDesk ? "거래 추가" : "Action"}</button>
            <span class="chip chip--input"><input placeholder="검색" /></span>
            <span class="chip">tag</span>
          </div>
          <div class="rtl-row">
            <span>방향: <code id="rtl-dir-label">ltr</code></span>
            <button class="btn btn--outline rtl-toggle" type="button">dir 토글 (ltr ↔ rtl)</button>
          </div>
        </div>
        <div class="sc-note">CSS logical property(margin-inline / padding-inline / inset-inline) 기반 자동 mirror — extra CSS 0.</div>
      </div>
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
      <div class="section-eyebrow">20 — Reference</div>
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

export function pageCss() {
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
      font-size: var(--text-display-md);
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
      position: relative;
      overflow: hidden;
    }
    .hero-card--primary .hero-card-content {
      position: relative;
      z-index: 1;
      max-width: 60%;
    }
    .hero-card-art {
      position: absolute;
      top: 50%;
      right: var(--spacing-xl);
      transform: translateY(-50%);
      width: 220px;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-on-accent, #fff);
      pointer-events: none;
      opacity: 0.95;
    }
    .hero-art-svg { width: 100%; height: 100%; }
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
    .hero-kicker { font-size: var(--text-body-md); opacity: 0.85; margin-bottom: var(--spacing-lg); }
    .hero-tagline {
      font-size: var(--text-title-md);
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
    .btn-on-accent.btn-outline-on-dark {
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
    .hero-fact-value { font-family: ui-monospace, monospace; font-size: var(--text-body-md); font-weight: 600; }
    .hero-meta { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: var(--spacing-md); }

    /* Buttons (공유) — md 기본 (height 40, padding spacing-sm spacing-md = 8/12, font body-md=15, line-height 1, box-sizing: border-box) */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      box-sizing: border-box;
      height: 40px;
      padding: var(--spacing-sm) var(--spacing-md);
      font-family: inherit;
      font-size: var(--text-body-md);
      /* 500 — DESIGN.md typography 가이드: weight 강조는 별도 토큰 대신 인라인 modifier.
         이전 var(--text-body-strong--font-weight) 인용은 typography 15-token에 없는 deprecated 토큰 버그였음. */
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: box-shadow var(--motion-duration-fast) var(--motion-ease-out);
    }
    .btn-primary {
      background: var(--color-primary, var(--color-text-primary));
      color: var(--color-text-on-accent, #fff);
      box-shadow: var(--shadow-sm);
    }
    .btn-primary:hover { box-shadow: var(--shadow-md); filter: brightness(1.05); }
    .btn-primary:focus-visible { outline: 2px solid var(--color-border-focus, var(--color-primary)); outline-offset: 1px; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-outline {
      background: transparent;
      color: var(--color-text-primary);
      border: 1px solid var(--color-border-default);
    }
    .btn-outline:hover { background: var(--color-surface-input); }
    .btn-outline:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-ghost {
      background: transparent;
      color: var(--color-primary, var(--color-text-primary));
    }
    .btn-ghost:hover { background: var(--color-surface-input); }
    .btn-ghost:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-state-hover { box-shadow: var(--shadow-md); filter: brightness(1.05); }
    .btn-state-pressed { transform: scale(0.98); box-shadow: none; filter: brightness(0.95); }
    .btn-state-focus { outline: 2px solid var(--color-border-focus, var(--color-primary)); outline-offset: 1px; }
    .btn-size-sm { height: 32px; padding: var(--spacing-xs) var(--spacing-sm); font-size: var(--text-caption); }
    .btn-size-md { height: 40px; padding: var(--spacing-sm) var(--spacing-md); font-size: var(--text-body-md); }
    .btn-size-lg { height: 48px; padding: var(--spacing-md) var(--spacing-lg); font-size: var(--text-title-sm); border-radius: var(--radius-md); }

    /* Color identity */
    .ci-grid { display: grid; gap: var(--spacing-xl); }
    .ci-group {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    .ci-group-head { display: flex; gap: var(--spacing-md); align-items: baseline; margin-bottom: var(--spacing-md); flex-wrap: wrap; }
    .ci-group-title { font-weight: 600; font-size: var(--text-title-sm); }
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
      display: grid; grid-template-columns: 1fr; gap: var(--spacing-2xl);
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-2xl);
      box-shadow: var(--shadow-sm);
    }
    .typo-moment-top {
      display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-2xl);
      align-items: end;
      padding-bottom: var(--spacing-xl);
      border-bottom: 1px solid var(--color-border-default);
    }
    .typo-moment-left { align-self: end; }
    .typo-moment-right { align-self: end; }
    .typo-meta { display: flex; flex-direction: column; gap: var(--spacing-xs); margin-bottom: var(--spacing-lg); }
    .typo-meta-row { display: flex; gap: var(--spacing-md); padding-bottom: var(--spacing-xs); border-bottom: 1px solid var(--color-border-default); }
    .typo-meta-key { width: 80px; color: var(--color-text-tertiary); font-size: var(--text-caption); }
    .typo-meta-val { font-size: var(--text-caption); flex: 1; }
    .typo-bignum {
      font-size: clamp(56px, 7vw, 96px);
      line-height: 1;
      font-weight: 700;
      letter-spacing: -0.04em;
      margin: 0;
      color: var(--color-text-primary);
    }
    .typo-bignum-label { color: var(--color-text-tertiary); font-size: var(--text-caption); margin-top: var(--spacing-sm); }
    .typo-scale-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 var(--spacing-2xl);
    }
    .typo-scale-row {
      display: grid; grid-template-columns: 140px 1fr;
      gap: var(--spacing-md);
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--color-border-default);
      align-items: baseline;
      min-width: 0;
    }
    .typo-scale-row:last-of-type { border-bottom: 1px solid var(--color-border-default); }
    .typo-scale-meta { min-width: 0; }
    .typo-scale-meta strong { font-size: var(--text-caption); display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .typo-scale-meta span { color: var(--color-text-tertiary); font-family: ui-monospace, monospace; font-size: 11px; }
    .typo-scale-sample {
      color: var(--color-text-secondary);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

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
    .vignette-title { font-weight: 600; font-size: var(--text-title-sm); }
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
    .approval-name { font-weight: 600; font-size: var(--text-body-md); }
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
    .kpi-value { font-size: var(--text-display-sm); font-weight: 700; line-height: 1.2; }
    .kpi-delta { font-size: 11px; color: var(--color-text-secondary); margin-top: var(--spacing-xs); }

    /* checkbox — spec: specs/components/checkbox.md (단일 SoT) */
    .checkbox {
      box-sizing: border-box;
      display: inline-flex; align-items: center; justify-content: center;
      width: 18px; height: 18px;
      border: 1px solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      background: var(--color-surface-default);
      color: var(--color-text-on-accent);
      cursor: pointer;
      padding: 0;
      transition: background-color var(--motion-duration-fast) var(--motion-ease-out), border-color var(--motion-duration-fast) var(--motion-ease-out);
    }
    .checkbox:hover { background: var(--color-surface-input); }
    .checkbox--sm { width: 16px; height: 16px; }
    .checkbox--md { width: 18px; height: 18px; }
    .checkbox--lg { width: 20px; height: 20px; }
    .checkbox--checked,
    .checkbox--indeterminate {
      background: var(--color-primary, var(--color-text-primary));
      border-color: var(--color-primary, var(--color-text-primary));
    }
    .checkbox--checked:hover,
    .checkbox--indeterminate:hover {
      background: var(--color-primary, var(--color-text-primary));
    }
    .checkbox--focus { outline: 2px solid var(--color-border-focus); outline-offset: 2px; }
    .checkbox--disabled {
      opacity: 0.5; cursor: not-allowed;
      background: var(--color-surface-input);
      border-color: var(--color-border-default);
    }
    .checkbox--error {
      border-color: var(--color-error);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-error) 30%, transparent);
    }
    .checkbox svg { width: 12px; height: 12px; }
    .checkbox--sm svg { width: 10px; height: 10px; }
    .checkbox--lg svg { width: 14px; height: 14px; }
    .cb-row { display: flex; align-items: center; gap: var(--spacing-sm); }
    .cb-row-label { font-size: var(--text-label-md); font-weight: 500; color: var(--color-text-primary); cursor: pointer; line-height: 1.2; }
    .cb-matrix { display: grid; grid-template-columns: 140px auto 1fr; gap: var(--spacing-sm) var(--spacing-md); align-items: center; }
    .cb-matrix-label { font-size: var(--text-label-sm); font-weight: 500; color: var(--color-text-secondary); letter-spacing: 0.06em; white-space: nowrap; }
    .cb-matrix-desc { font-size: var(--text-caption); color: var(--color-text-tertiary); }
    .cb-size-row { display: flex; align-items: end; gap: var(--spacing-xl); }
    .cb-size-cell { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-xs); font-family: ui-monospace, monospace; font-size: var(--text-caption); color: var(--color-text-tertiary); }

    /* todo-card */
    .todo-list { display: flex; flex-direction: column; gap: 2px; }
    .todo-row {
      display: grid; grid-template-columns: auto 1fr auto auto;
      gap: var(--spacing-md); align-items: center;
      padding: var(--spacing-sm); border-radius: var(--radius-md);
    }
    .todo-row:hover { background: var(--color-surface-input); }
    .todo-check {
      width: 18px; height: 18px;
      box-sizing: border-box;
      border: 1px solid var(--color-border-strong);
      border-radius: var(--radius-sm);
      background: var(--color-surface-default);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700; line-height: 1;
      transition: background-color var(--motion-duration-fast) var(--motion-ease-out), border-color var(--motion-duration-fast) var(--motion-ease-out);
    }
    .todo-row:hover .todo-check { background: var(--color-surface-input); }
    .todo-check--on,
    .todo-row:hover .todo-check--on { background: var(--color-primary, var(--color-text-primary)); border-color: var(--color-primary, var(--color-text-primary)); color: var(--color-text-on-accent, #fff); }
    .todo-text { font-size: var(--text-body-md); }
    .todo-row--done .todo-text { color: var(--color-text-tertiary); text-decoration: line-through; }
    .todo-due { font-size: var(--text-caption); color: var(--color-text-tertiary); }

    /* memo-card */
    .memo-grid { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .memo-row { padding: var(--spacing-md); background: var(--color-surface-input); border-radius: var(--radius-md); }
    .memo-title { font-weight: 600; font-size: var(--text-title-sm); margin-bottom: var(--spacing-xs); }
    .memo-excerpt { font-size: var(--text-caption); color: var(--color-text-secondary); margin-bottom: var(--spacing-sm); line-height: 1.5; }
    .memo-tags { display: flex; gap: var(--spacing-xs); flex-wrap: wrap; }
    .memo-tag { font-size: 11px; color: var(--color-primary, var(--color-text-secondary)); }

    /* tabs — tabs.md SoT 3 variants (container/underline/pills) */
    .tabs { display: flex; gap: var(--spacing-sm); border-bottom: 1px solid var(--color-border-default); margin-bottom: var(--spacing-md); }
    .tabs-pills { border-bottom: none; gap: var(--spacing-xs); }
    .tab { padding: var(--spacing-sm) var(--spacing-md); font-size: var(--text-label-md); font-weight: 500; color: var(--color-text-secondary); cursor: pointer; }
    .tabs-underline .tab--active { color: var(--color-primary, var(--color-text-primary)); border-bottom: 2px solid var(--color-primary, var(--color-text-primary)); margin-bottom: -1px; font-weight: 600; }
    /* pills — radius-md soft rectangle(토스 톤) + primary fill */
    .tabs-pills .tab { border-radius: var(--radius-md); }
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
    .search-input { flex: 1; background: transparent; border: none; outline: none; font-size: var(--text-body-md); color: var(--color-text-primary); padding: var(--spacing-xs) 0; font-family: inherit; }
    .search-input::placeholder { color: var(--color-text-tertiary); }

    /* === Listing detail === */
    .ld-gallery {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-lg);
      border-radius: var(--radius-xl);
      overflow: hidden;
      max-height: 360px;
    }
    .ld-gallery-cell {
      background: var(--cell-tone, var(--color-surface-input));
      display: flex; align-items: center; justify-content: center;
      color: var(--color-text-on-accent, #fff);
      font-size: var(--text-caption);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      opacity: 0.92;
      min-height: 120px;
    }
    .ld-gallery-cell--hero {
      grid-row: 1 / 3;
      min-height: 240px;
      font-size: var(--text-title-md);
      letter-spacing: 0;
      text-transform: none;
    }
    .ld-gallery-label { padding: var(--spacing-md); }
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
    .ld-section-title { font-weight: 600; font-size: var(--text-title-sm); margin-bottom: var(--spacing-xs); }
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
    .ld-highlights {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: var(--spacing-md);
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    .ld-highlight {
      display: flex; align-items: flex-start; gap: var(--spacing-sm);
    }
    .ld-highlight-icon {
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      background: var(--color-surface-input);
      border-radius: var(--radius-full);
      font-size: 18px;
      flex-shrink: 0;
    }
    .ld-highlight-label { font-weight: 600; font-size: var(--text-body-md); }
    .ld-highlight-note { font-size: var(--text-caption); color: var(--color-text-tertiary); }
    .ld-host {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
      display: flex; gap: var(--spacing-md);
      align-items: flex-start;
    }
    .ld-host-avatar {
      width: 48px; height: 48px;
      border-radius: var(--radius-full);
      background: var(--color-primary, var(--color-text-primary));
      color: var(--color-text-on-accent, #fff);
      display: flex; align-items: center; justify-content: center;
      font-size: var(--text-title-sm);
      font-weight: 700;
      flex-shrink: 0;
    }
    .ld-host-name { font-weight: 600; font-size: var(--text-body-md); margin-bottom: var(--spacing-xs); }
    .ld-host-role { color: var(--color-text-secondary); font-weight: 400; }
    .ld-host-bio { color: var(--color-text-secondary); line-height: 1.6; margin-bottom: var(--spacing-xs); }
    .ld-host-since { font-size: var(--text-caption); color: var(--color-text-tertiary); }
    .ld-rail-title { font-weight: 600; font-size: var(--text-title-sm); margin-bottom: var(--spacing-md); }
    .ld-rail-subtitle { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: calc(var(--spacing-md) * -1); margin-bottom: var(--spacing-md); }
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
      max-width: 420px;
    }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 40px); gap: var(--spacing-xs); justify-content: space-between; }
    .cal-weekday {
      text-align: center;
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
      font-weight: 600;
      padding: var(--spacing-xs) 0;
      width: 40px;
    }
    .cal-cell {
      width: 40px;
      height: 40px;
      display: flex; align-items: center; justify-content: center;
      border-radius: var(--radius-full);
      font-size: var(--text-body-md);
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
    .review-name { font-weight: 600; font-size: var(--text-body-md); }
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
    .amenity-label { font-weight: 600; font-size: var(--text-body-md); }
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
    .empty-title { font-size: var(--text-title-md); font-weight: var(--text-heading-md--font-weight); line-height: var(--text-heading-md--line-height); }
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
    .modal-title { font-size: var(--text-display-sm); font-weight: 700; line-height: var(--text-heading-lg--line-height); color: var(--color-text-primary); letter-spacing: -0.01em; }
    .modal-description { font-size: var(--text-body-md); color: var(--color-text-secondary); line-height: 1.6; }
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

    /* === Toast === sonner.md SoT — surface-default + border-default(1px) + radius-md + shadow-lg + 20px stroke svg(kind별 색) */
    .toast-stack { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .toast {
      display: flex; align-items: flex-start; gap: var(--spacing-md);
      background: var(--color-surface-default);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-md);
      padding: var(--spacing-md) var(--spacing-lg);
      box-shadow: var(--shadow-lg);
      max-width: 360px;
    }
    .toast > svg { flex-shrink: 0; margin-top: 2px; }
    .toast-content { display: flex; flex-direction: column; gap: var(--spacing-xs); min-width: 0; flex: 1; }
    .toast-title { font-weight: 600; font-size: var(--text-title-sm); line-height: var(--text-title-sm--line-height); color: var(--color-text-primary); }
    .toast-body {
      color: var(--color-text-secondary);
      font-size: var(--text-body-sm);
      line-height: var(--text-body-sm--line-height);
    }
    .toast-close {
      width: 28px; height: 28px;
      border-radius: var(--radius-full);
      border: none;
      background: transparent;
      color: var(--color-text-tertiary);
      cursor: pointer;
      font-size: 18px;
      flex-shrink: 0;
    }
    .toast-close:hover { background: var(--color-surface-input); }

    /* === Form layout === */
    .form-card {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-2xl);
      box-shadow: var(--shadow-sm);
      max-width: 640px;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg) var(--spacing-xl); }
    .form-group { display: flex; flex-direction: column; gap: var(--spacing-xs); }
    .form-group:has(.form-textarea) { grid-column: 1 / -1; }
    /* Label 컴포넌트 spec(label-md 14/500 + text-primary)과 통일. */
    .form-label {
      font-size: var(--text-label-md);
      line-height: var(--text-label-md--line-height);
      font-weight: 500;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }
    .form-required { color: var(--color-error); font-weight: 500; }
    .form-input,
    .form-select,
    .form-textarea {
      background: var(--color-surface-input);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: var(--text-body-md);
      font-family: inherit;
      line-height: 1.6;
      min-height: 40px;
      display: flex;
      align-items: center;
    }
    .form-input--readonly { color: var(--color-text-secondary); cursor: not-allowed; }
    .form-select { justify-content: space-between; cursor: pointer; }
    .form-select-caret { color: var(--color-text-tertiary); flex-shrink: 0; }
    .form-textarea {
      align-items: flex-start;
      white-space: pre-wrap;
      line-height: 1.6;
    }
    .form-helper {
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
    }
    .form-actions {
      display: flex;
      gap: var(--spacing-md);
      justify-content: flex-end;
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--color-border-default);
    }

    /* === Skeleton / Loading === */
    .sk-card-wrap {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    @keyframes sk-shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .sk {
      background-color: var(--color-surface-input);
      background-image: linear-gradient(
        90deg,
        var(--color-surface-input) 0%,
        var(--color-surface-default) 50%,
        var(--color-surface-input) 100%
      );
      background-size: 200% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      animation: sk-shimmer var(--motion-duration-loop, 1500ms) var(--motion-ease-linear, linear) infinite;
    }
    .sk-text { height: 14px; border-radius: var(--radius-sm); margin: var(--spacing-xs) 0; }
    .sk-text-sm { height: 12px; }
    .sk-circle { border-radius: var(--radius-full); flex-shrink: 0; }
    .sk-rect { border-radius: var(--radius-md); }
    .sk-stack { display: flex; flex-direction: column; gap: var(--spacing-xs); }
    .sk-row {
      display: flex; align-items: center; gap: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-xs);
      border-bottom: 1px solid var(--color-border-default);
    }
    .sk-row:last-child { border-bottom: none; }
    .sk-row-content { flex: 1; }
    .sk-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--spacing-md);
    }
    .sk-card {
      background: var(--color-surface-input);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    .sk-card .sk { background-color: var(--color-surface-default); background-image: linear-gradient(90deg, var(--color-surface-default) 0%, var(--color-surface-input) 50%, var(--color-surface-default) 100%); }
    .sk-tags-row { display: flex; gap: var(--spacing-xs); margin-top: var(--spacing-xs); }
    .sk-demo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-lg);
    }
    .sk-demo-cell {
      background: var(--color-surface-input);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
    }
    .sk-demo-cell .sk { background-color: var(--color-surface-default); background-image: linear-gradient(90deg, var(--color-surface-default) 0%, var(--color-surface-input) 50%, var(--color-surface-default) 100%); }
    .sk-demo-label {
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
      font-family: ui-monospace, monospace;
      margin-bottom: var(--spacing-sm);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    @media (prefers-reduced-motion: reduce) {
      .sk { animation: none; background-image: none; }
    }

    /* === v67 batch (Pagination / Drawer / Spinner / Stepper) === */
    .batch-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-lg);
    }
    .batch-card {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
      display: flex; flex-direction: column; gap: var(--spacing-md);
    }
    .batch-card--full { grid-column: 1 / -1; }
    .batch-card-head {
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
      font-family: ui-monospace, monospace;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Pagination */
    .pg-block { display: flex; flex-direction: column; gap: var(--spacing-sm); }
    .pg-label { font-size: var(--text-caption); color: var(--color-text-secondary); }
    .pg-nav { display: flex; gap: var(--spacing-md); align-items: center; flex-wrap: wrap; }
    .pg-numbers { display: flex; gap: var(--spacing-xs); }
    .pg-arrow,
    .pg-btn {
      width: 40px; height: 40px;
      border-radius: var(--radius-md);
      border: none;
      background: transparent;
      color: var(--color-text-secondary);
      font-size: var(--text-body-md);
      font-family: inherit;
      cursor: pointer;
      transition: background var(--motion-duration-fast, 150ms) var(--motion-ease-out, ease-out);
    }
    .pg-arrow:hover,
    .pg-btn:hover { background: var(--color-surface-input); color: var(--color-text-primary); }
    .pg-btn--current {
      background: var(--color-primary, var(--color-text-primary));
      color: var(--color-text-on-accent, #fff);
      font-weight: 700;
    }
    .pg-btn--current:hover { background: var(--color-primary, var(--color-text-primary)); color: var(--color-text-on-accent, #fff); }
    .pg-ellipsis { display: flex; align-items: center; padding: 0 var(--spacing-xs); color: var(--color-text-tertiary); }
    .pg-loadmore { align-self: flex-start; min-width: 200px; }

    /* Drawer (정적 표시) */
    .drw-frame {
      background: var(--color-bg-page);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      min-height: 280px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      position: relative;
    }
    .drw-side {
      background: var(--color-surface-default);
      border-radius: var(--radius-xl) 0 0 var(--radius-xl);
      box-shadow: var(--shadow-xl);
      width: 280px;
      padding: var(--spacing-lg);
      display: flex; flex-direction: column; gap: var(--spacing-md);
      align-self: stretch;
    }
    .drw-bottom {
      background: var(--color-surface-default);
      border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      box-shadow: var(--shadow-xl);
      width: 100%;
      padding: var(--spacing-lg);
      display: flex; flex-direction: column; gap: var(--spacing-md);
    }
    .drw-handle {
      width: 40px; height: 4px;
      background: var(--color-surface-input);
      border-radius: var(--radius-full);
      margin: -4px auto var(--spacing-sm);
    }
    .drw-header { display: flex; justify-content: space-between; align-items: center; }
    .drw-title { font-weight: 600; font-size: var(--text-title-sm); }
    .drw-close {
      width: 28px; height: 28px;
      border: none; background: transparent;
      color: var(--color-text-tertiary);
      cursor: pointer; font-size: 16px;
      border-radius: var(--radius-full);
    }
    .drw-close:hover { background: var(--color-surface-input); }
    .drw-body { display: flex; flex-direction: column; gap: var(--spacing-xs); }
    .drw-row { display: flex; justify-content: space-between; padding: var(--spacing-xs) 0; border-bottom: 1px solid var(--color-border-default); font-size: var(--text-caption); }
    .drw-row:last-child { border-bottom: none; }
    .drw-key { color: var(--color-text-tertiary); }
    .drw-val { font-weight: 600; }
    .drw-actions { display: flex; gap: var(--spacing-sm); padding-top: var(--spacing-sm); border-top: 1px solid var(--color-border-default); }
    .drw-actions .btn { flex: 1; }

    /* Spinner / Progress */
    .sp-block { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .sp-row { display: flex; gap: var(--spacing-lg); flex-wrap: wrap; }
    .sp-cell {
      display: flex; flex-direction: column; gap: var(--spacing-sm);
      min-width: 80px;
    }
    .sp-cell--full { flex: 1; min-width: 100%; }
    .sp-label { font-size: var(--text-caption); color: var(--color-text-tertiary); font-family: ui-monospace, monospace; }
    @keyframes sp-spin {
      to { transform: rotate(360deg); }
    }
    .sp-spinner {
      width: 24px; height: 24px;
      border: 2px solid var(--color-surface-input);
      border-top-color: var(--color-primary, var(--color-text-primary));
      border-radius: var(--radius-full);
      animation: sp-spin var(--motion-duration-loop, 1500ms) var(--motion-ease-linear, linear) infinite;
    }
    .sp-spinner--sm { width: 16px; height: 16px; border-width: 2px; }
    .sp-spinner--lg { width: 32px; height: 32px; border-width: 3px; }
    .sp-inline { display: flex; gap: var(--spacing-sm); align-items: center; font-size: var(--text-body-md); color: var(--color-text-secondary); }
    .sp-progress {
      width: 100%;
      height: 4px;
      background: var(--color-surface-input);
      border-radius: var(--radius-full);
      overflow: hidden;
      position: relative;
    }
    .sp-progress-fill {
      height: 100%;
      background: var(--color-primary, var(--color-text-primary));
      transition: width var(--motion-duration-base, 200ms) var(--motion-ease-out, ease-out);
    }
    @keyframes sp-sweep {
      0% { left: -30%; }
      100% { left: 100%; }
    }
    .sp-progress--indeterminate { background: var(--color-surface-input); }
    .sp-progress-sweep {
      position: absolute;
      top: 0; left: -30%;
      width: 30%;
      height: 100%;
      background: linear-gradient(90deg, transparent, var(--color-primary, var(--color-text-primary)), transparent);
      animation: sp-sweep var(--motion-duration-loop, 1500ms) var(--motion-ease-linear, linear) infinite;
    }
    .sp-progress-meta {
      display: flex; justify-content: space-between;
      font-size: var(--text-caption);
      color: var(--color-text-tertiary);
      margin-top: var(--spacing-xs);
    }

    /* Stepper */
    .stp-block { display: flex; flex-direction: column; gap: var(--spacing-md); }
    .stp-label { font-size: var(--text-caption); color: var(--color-text-secondary); }
    .stp { display: flex; }
    .stp-list {
      display: flex;
      gap: 0;
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    .stp-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-xs);
      position: relative;
    }
    .stp-circle {
      width: 32px; height: 32px;
      border-radius: var(--radius-full);
      display: flex; align-items: center; justify-content: center;
      font-size: var(--text-caption);
      font-weight: 700;
      flex-shrink: 0;
      z-index: 1;
    }
    .stp-item--completed .stp-circle {
      background: var(--color-success);
      color: var(--color-text-on-accent, #fff);
    }
    .stp-item--current .stp-circle {
      background: var(--color-primary, var(--color-text-primary));
      color: var(--color-text-on-accent, #fff);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary, var(--color-text-primary)) 25%, transparent);
    }
    .stp-item--pending .stp-circle {
      background: var(--color-surface-input);
      color: var(--color-text-tertiary);
    }
    .stp-label-text {
      font-size: var(--text-caption);
      text-align: center;
      max-width: 100px;
    }
    .stp-item--completed .stp-label-text { color: var(--color-text-secondary); }
    .stp-item--current .stp-label-text { color: var(--color-text-primary); font-weight: 600; }
    .stp-item--pending .stp-label-text { color: var(--color-text-tertiary); }
    .stp-connector {
      position: absolute;
      top: 16px;
      left: 50%;
      width: 100%;
      height: 2px;
      background: var(--color-border-default);
      z-index: 0;
    }
    .stp-item--completed .stp-connector {
      background: var(--color-success);
    }

    /* === v68-v72 shadcn batch showcase === */
    .sc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); }
    .sc-card { background: var(--color-surface-default); border-radius: var(--radius-lg); padding: var(--spacing-lg); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: var(--spacing-sm); }
    .sc-card--full { grid-column: 1 / -1; }
    .sc-head { font-size: var(--text-caption); color: var(--color-text-tertiary); font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.04em; }
    .sc-note { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: var(--spacing-xs); }

    /* === v73-v78 batch === */

    /* Banner */
    /* Banner — alert.md SoT 정합 (brand vignette는 banner-icon 필드 사용,
       site Alert은 stroke svg 사용). 시각 spec(border-l 4px + 8% bg + gap-md)은 동기. */
    .banner { display: flex; align-items: flex-start; gap: var(--spacing-md); padding: var(--spacing-md); margin-block: var(--spacing-sm); border-inline-start-width: 4px; border-inline-start-style: solid; border-radius: var(--radius-sm); }
    .banner--info { background: color-mix(in srgb, var(--color-info) 8%, var(--color-surface-default)); border-inline-start-color: var(--color-info); }
    .banner--warning { background: color-mix(in srgb, var(--color-warning) 8%, var(--color-surface-default)); border-inline-start-color: var(--color-warning); }
    .banner--error { background: color-mix(in srgb, var(--color-error) 8%, var(--color-surface-default)); border-inline-start-color: var(--color-error); }
    .banner--success { background: color-mix(in srgb, var(--color-success) 8%, var(--color-surface-default)); border-inline-start-color: var(--color-success); }
    .banner-icon { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 700; font-size: 13px; color: var(--color-text-on-accent); }
    .banner--info .banner-icon { background: var(--color-info); }
    .banner--warning .banner-icon { background: var(--color-warning); }
    .banner--error .banner-icon { background: var(--color-error); }
    .banner-body { flex: 1; display: flex; flex-direction: column; gap: var(--spacing-xs); font-size: var(--text-body-sm); line-height: 1.5; color: var(--color-text-secondary); }
    .banner-body strong { font-size: var(--text-body-md); font-weight: 600; color: var(--color-text-primary); }
    .banner-close { width: 28px; height: 28px; border: 0; background: transparent; cursor: pointer; border-radius: var(--radius-sm); color: var(--color-text-tertiary); }

    /* Tag / Chip */
    .chip-row { display: flex; flex-wrap: wrap; gap: var(--spacing-xs); align-items: center; }
    .chip { display: inline-flex; align-items: center; gap: var(--spacing-xs); padding-inline: var(--spacing-sm); padding-block: 4px; border-radius: var(--radius-full); background: color-mix(in srgb, var(--color-primary) 10%, var(--color-surface-default)); color: var(--color-primary); font-size: var(--text-caption); }
    .chip-x { width: 16px; height: 16px; border: 0; background: transparent; cursor: pointer; color: inherit; padding: 0; }
    .chip--input { background: var(--color-surface-input); padding: 2px 6px 2px 10px; }
    .chip--input input { background: transparent; border: 0; outline: none; font-size: var(--text-caption); width: 80px; color: inherit; }

    /* Popover */
    .pop-anchor { position: relative; }
    /* popover.md SoT — compact pill trigger + token padding */
    .pop-trigger { background: var(--color-surface-input); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); padding: var(--spacing-xs) var(--spacing-sm); cursor: pointer; font-size: var(--text-caption); color: var(--color-text-primary); }
    .pop { position: relative; margin-top: var(--spacing-xs); background: var(--color-surface-default); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); padding: var(--spacing-md); box-shadow: var(--shadow-md); display: flex; flex-direction: column; gap: var(--spacing-sm); }
    .pop textarea { width: 100%; padding: var(--spacing-xs) var(--spacing-sm); border: 1px solid var(--color-border-default); border-radius: var(--radius-sm); background: var(--color-surface-input); font-family: inherit; font-size: var(--text-caption); color: var(--color-text-primary); resize: vertical; }
    .pop-actions { display: flex; justify-content: flex-end; gap: var(--spacing-xs); }

    /* File Upload */
    .fu-zone { border: 2px dashed var(--color-border-default); border-radius: var(--radius-md); padding: var(--spacing-lg); display: flex; flex-direction: column; align-items: center; gap: 4px; background: var(--color-bg-page); }
    .fu-icon { font-size: 24px; color: var(--color-text-tertiary); }
    .fu-label { font-size: var(--text-body-md); color: var(--color-text-primary); }
    .fu-list { display: flex; flex-direction: column; gap: var(--spacing-xs); margin-top: var(--spacing-xs); }
    .fu-item { display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-xs) var(--spacing-sm); background: var(--color-surface-input); border-radius: var(--radius-sm); }
    .fu-file-icon { font-size: 18px; }
    .fu-meta { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .fu-name { font-size: var(--text-caption); color: var(--color-text-primary); }
    .fu-progress { height: 4px; background: var(--color-surface-default); border-radius: 2px; overflow: hidden; }
    .fu-progress-bar { height: 100%; background: var(--color-primary); }
    .fu-remove { width: 24px; height: 24px; border: 0; background: transparent; cursor: pointer; color: var(--color-text-tertiary); border-radius: var(--radius-sm); }

    /* Treeview */
    .tv, .tv ul { list-style: none; margin: 0; padding: 0; }
    .tv ul { padding-inline-start: var(--spacing-md); }
    .tv-row { display: flex; align-items: center; gap: var(--spacing-xs); padding: 4px var(--spacing-sm); width: 100%; background: transparent; border: 0; cursor: pointer; text-align: start; font-size: var(--text-body-md); color: var(--color-text-primary); border-radius: var(--radius-sm); }
    .tv-row:hover { background: var(--color-surface-input); }
    .tv-row--selected { background: color-mix(in srgb, var(--color-primary) 10%, transparent); color: var(--color-primary); font-weight: 600; }
    .tv-chev { display: inline-block; width: 12px; font-size: 10px; color: var(--color-text-tertiary); }

    /* Animation showcase (v74) */
    .anim-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-md); }
    .anim-cell { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .anim-box { width: 56px; height: 56px; background: var(--color-primary); color: var(--color-text-on-accent); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: var(--text-body-md); }
    .anim-fade-in { animation: fade-in var(--motion-duration-base) var(--motion-ease-out) both; }
    .anim-slide-in-up { animation: slide-in-up var(--motion-duration-slow) var(--motion-ease-out) both; }
    .anim-scale-in { animation: scale-in var(--motion-duration-base) var(--motion-ease-out) both; }
    .anim-bounce-in { animation: bounce-in var(--motion-duration-slower) cubic-bezier(0.34, 1.56, 0.64, 1) both; }
    .anim-shake { animation: shake var(--motion-duration-slow) cubic-bezier(.36,.07,.19,.97); background: var(--color-error); }
    .anim-spin { animation: spin var(--motion-duration-loop) linear infinite; background: var(--color-info); }
    .anim-pulse { animation: pulse var(--motion-duration-loop) cubic-bezier(0.4, 0, 0.6, 1) infinite; background: var(--color-success); }
    .anim-shimmer { position: relative; overflow: hidden; background: var(--color-surface-input); }
    .anim-shimmer::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-primary) 25%, transparent) 50%, transparent 100%); animation: shimmer var(--motion-duration-loop) linear infinite; }
    .anim-actions { display: flex; justify-content: flex-end; margin-top: var(--spacing-sm); }
    @media (prefers-reduced-motion: reduce) {
      .anim-fade-in, .anim-slide-in-up, .anim-scale-in, .anim-bounce-in, .anim-shake, .anim-spin, .anim-pulse, .anim-shimmer::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
    }

    /* Form validation (v75) */
    .fv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--spacing-md); }
    .fv-cell { display: flex; flex-direction: column; gap: 4px; }
    .fv-label { font-size: var(--text-caption); color: var(--color-text-secondary); }
    .fv-input { padding: var(--spacing-sm) var(--spacing-md); border: 1px solid var(--color-border-default); border-radius: var(--radius-sm); background: var(--color-surface-input); font-family: inherit; font-size: var(--text-body-md); color: var(--color-text-primary); }
    .fv-input:focus, .fv-input--focused { border-color: var(--color-border-focus); outline: 2px solid color-mix(in srgb, var(--color-border-focus) 30%, transparent); outline-offset: 0; }
    .fv-input--invalid { border-color: var(--color-error); }
    .fv-input--valid { border-color: var(--color-success); }
    .fv-helper { font-size: var(--text-caption); color: var(--color-text-tertiary); display: inline-flex; align-items: center; gap: 6px; }
    .fv-error { font-size: var(--text-caption); color: var(--color-error); }
    .fv-success { font-size: var(--text-caption); color: var(--color-success); }
    .fv-spinner { width: 12px; height: 12px; border: 2px solid var(--color-border-default); border-top-color: var(--color-primary); border-radius: 50%; animation: spin var(--motion-duration-loop) linear infinite; }

    /* RTL toggle (v76) */
    .rtl-demo { display: flex; flex-direction: column; gap: var(--spacing-sm); }
    .rtl-row { display: flex; align-items: center; gap: var(--spacing-sm); flex-wrap: wrap; }
    .rtl-btn { display: inline-flex; align-items: center; gap: var(--spacing-xs); }
    .rtl-icon { transition: transform var(--motion-duration-base) var(--motion-ease-out); }
    [dir="rtl"] .rtl-icon { transform: scaleX(-1); }

    /* Breadcrumb — breadcrumb.md SoT. brand vignette dense layout이라 caption(12)
       유지하되 gap/weight는 spec과 동기 (gap-sm 통일, current weight 500). */
    .bc { display: flex; align-items: center; gap: var(--spacing-sm); font-size: var(--text-caption); flex-wrap: wrap; }
    .bc-link { color: var(--color-text-secondary); cursor: pointer; transition: color var(--motion-duration-fast) var(--motion-ease-out); }
    .bc-link:hover { color: var(--color-text-primary); }
    .bc-sep { color: var(--color-text-tertiary); user-select: none; }
    .bc-current { color: var(--color-text-primary); font-weight: 500; }

    /* Sidebar */
    .sb { display: flex; flex-direction: column; gap: var(--spacing-xs); padding: var(--spacing-sm); background: var(--color-bg-page); border-radius: var(--radius-md); }
    .sb-group { font-size: var(--text-caption); color: var(--color-text-tertiary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; padding: var(--spacing-xs) var(--spacing-sm); }
    .sb-item { padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-sm); color: var(--color-text-secondary); font-size: var(--text-body-md); cursor: pointer; }
    .sb-item:hover { background: var(--color-surface-input); color: var(--color-text-primary); }
    .sb-item--active { background: var(--color-surface-input); color: var(--color-text-primary); font-weight: 600; border-left: 3px solid var(--color-primary, var(--color-text-primary)); padding-left: calc(var(--spacing-md) - 3px); }

    /* Navigation Menu */
    .nm { display: flex; gap: var(--spacing-xs); flex-wrap: wrap; }
    .nm-item { padding: var(--spacing-sm) var(--spacing-md); border: none; background: transparent; border-radius: var(--radius-md); color: var(--color-text-secondary); cursor: pointer; font-size: var(--text-body-md); font-family: inherit; }
    .nm-item:hover { background: var(--color-surface-input); color: var(--color-text-primary); }
    .nm-item--active { color: var(--color-text-primary); font-weight: 600; }

    /* Menubar */
    .mb { display: flex; gap: 0; background: var(--color-bg-page); border-radius: var(--radius-md); padding: var(--spacing-xs); }
    .mb-item { display: flex; gap: var(--spacing-sm); align-items: center; padding: var(--spacing-xs) var(--spacing-md); border: none; background: transparent; color: var(--color-text-secondary); cursor: pointer; font-size: var(--text-caption); font-family: inherit; border-radius: var(--radius-sm); }
    .mb-item:hover { background: var(--color-surface-input); color: var(--color-text-primary); }
    .mb-key { font-family: ui-monospace, monospace; font-size: 11px; color: var(--color-text-tertiary); }

    /* Command (⌘K) */
    .cmd { background: var(--color-bg-page); border-radius: var(--radius-md); padding: var(--spacing-md); }
    .cmd-input { width: 100%; padding: var(--spacing-sm) var(--spacing-md); background: var(--color-surface-default); border: 1px solid var(--color-border-default); border-radius: var(--radius-sm); color: var(--color-text-primary); font-family: inherit; font-size: var(--text-body-md); }
    .cmd-section { margin-top: var(--spacing-md); }
    .cmd-group { font-size: var(--text-caption); color: var(--color-text-tertiary); padding: var(--spacing-xs) var(--spacing-sm); margin-top: var(--spacing-sm); text-transform: uppercase; letter-spacing: 0.04em; }
    .cmd-item { display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-body-md); }
    .cmd-item:hover { background: var(--color-surface-input); }
    .cmd-shortcut { font-family: ui-monospace, monospace; font-size: var(--text-caption); color: var(--color-text-tertiary); }

    /* Combobox */
    .cb { display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-sm) var(--spacing-md); background: var(--color-surface-input); border: 1px solid var(--color-border-default); border-radius: var(--radius-sm); cursor: pointer; }
    .cb-caret { color: var(--color-text-tertiary); }

    /* Slider */
    /* Slider — spec: track 4px / thumb 16 / primary fill / thumb fill text-on-accent(#fff)
       — 다크 모드에서도 흰색 유지(surface-default는 dark swap되어 어두워짐). */
    .sld { padding: var(--spacing-sm) 0; }
    .sld-track { position: relative; width: 100%; height: 4px; background: var(--color-surface-input); border-radius: var(--radius-full); }
    .sld-fill { height: 100%; background: var(--color-primary); border-radius: var(--radius-full); }
    .sld-thumb { position: absolute; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--color-text-on-accent); border: 2px solid var(--color-primary); border-radius: var(--radius-full); box-shadow: var(--shadow-sm); }
    .sld-meta { display: flex; justify-content: space-between; font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: var(--spacing-md); }

    /* Toggle */
    .tg-row { display: flex; gap: var(--spacing-sm); flex-wrap: wrap; }
    .tg { padding: var(--spacing-xs) var(--spacing-md); border: 1px solid var(--color-border-default); background: transparent; color: var(--color-text-secondary); border-radius: var(--radius-md); cursor: pointer; font-family: inherit; font-size: var(--text-caption); }
    .tg:hover { background: var(--color-surface-input); }
    .tg--on { background: var(--color-surface-input); color: var(--color-text-primary); border-color: var(--color-border-strong); font-weight: 600; }

    /* Toggle Group */
    .tgg { display: inline-flex; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; }
    .tgg-item { padding: var(--spacing-xs) var(--spacing-md); border: none; background: transparent; color: var(--color-text-secondary); cursor: pointer; font-family: inherit; font-size: var(--text-caption); }
    .tgg-item + .tgg-item { border-left: 1px solid var(--color-border-default); }
    .tgg-item:hover { background: var(--color-surface-input); }
    .tgg-item--active { background: var(--color-surface-input); color: var(--color-text-primary); font-weight: 600; }

    /* Input OTP */
    /* OTP — spec: specs/components/input-otp.md (단일 SoT) */
    .otp { display: flex; gap: var(--spacing-xs); align-items: center; }
    .otp-cell { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--color-surface-input); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); font-size: var(--text-title-md); font-weight: 600; line-height: 1; color: var(--color-text-primary); font-family: ui-monospace, monospace; }
    .otp-cell--filled { background: var(--color-surface-default); }
    .otp-cell--focus { outline: 2px solid var(--color-border-focus); outline-offset: 1px; }
    .otp-sep { display: inline-flex; align-items: center; color: var(--color-text-tertiary); padding: 0 var(--spacing-xs); }

    /* Accordion / Collapsible */
    /* Accordion — accordion.md SoT (FAQ 스타일, 외곽 wrapper 없음 + item 사이 border-bottom only) */
    .acc { display: flex; flex-direction: column; }
    .acc-item { border-bottom: 1px solid var(--color-border-default); }
    .acc-trigger { display: flex; flex: 1; align-items: center; justify-content: space-between; width: 100%; padding: var(--spacing-lg) 0; cursor: pointer; font-weight: 500; font-size: var(--text-title-sm); color: var(--color-text-primary); background: transparent; border: 0; text-align: left; transition: color var(--motion-duration-fast) var(--motion-ease-out); }
    .acc-trigger:hover { color: var(--color-text-secondary); }
    .acc-body { padding: 0 0 var(--spacing-lg); color: var(--color-text-secondary); font-size: var(--text-body-md); line-height: var(--text-body-md--line-height); }
    .col-trigger { padding: var(--spacing-sm) var(--spacing-md); border: 1px solid var(--color-border-default); background: transparent; border-radius: var(--radius-md); cursor: pointer; font-family: inherit; font-size: var(--text-body-md); display: inline-flex; gap: var(--spacing-sm); }
    .col-trigger:hover { background: var(--color-surface-input); }

    /* Hover Card */
    .hc { display: flex; gap: var(--spacing-md); padding: var(--spacing-md); background: var(--color-bg-page); border-radius: var(--radius-md); align-items: flex-start; }
    /* avatar.md SoT — md 40px + text-title-sm + 600 (preview 화면샷 패턴) */
    .hc-avatar { width: 40px; height: 40px; border-radius: var(--radius-full); background: var(--color-primary, var(--color-text-primary)); color: var(--color-text-on-accent, #fff); display: flex; align-items: center; justify-content: center; font-size: var(--text-title-sm); font-weight: 600; flex-shrink: 0; }
    .hc-name { font-weight: 600; font-size: var(--text-body-md); color: var(--color-text-primary); }
    .hc-bio { color: var(--color-text-secondary); font-size: var(--text-caption); margin-top: var(--spacing-xs); }

    /* Context Menu */
    .ctx { display: inline-flex; flex-direction: column; background: var(--color-surface-default); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); box-shadow: var(--shadow-md); padding: var(--spacing-xs); min-width: 160px; }
    .ctx-item { padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-body-md); }
    .ctx-item:hover { background: var(--color-surface-input); }
    .ctx-item--destructive { color: var(--color-error); }
    .ctx-item--destructive:hover { background: color-mix(in srgb, var(--color-error) 12%, transparent); }
    .ctx-sep { height: 1px; background: var(--color-border-default); margin: var(--spacing-xs) 0; }

    /* Alert Dialog */
    .ad { display: flex; gap: var(--spacing-md); padding: var(--spacing-lg); background: var(--color-bg-page); border-radius: var(--radius-md); align-items: flex-start; }
    .ad-icon { width: 32px; height: 32px; border-radius: var(--radius-full); background: var(--color-error); color: var(--color-text-on-accent, #fff); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; flex-shrink: 0; }
    .ad-body { flex: 1; }
    .ad-title { font-weight: 700; font-size: var(--text-title-sm); margin-bottom: var(--spacing-xs); }
    .ad-desc { color: var(--color-text-secondary); margin-bottom: var(--spacing-md); }
    .ad-actions { display: flex; gap: var(--spacing-sm); justify-content: flex-end; }
    .btn-destructive { background: var(--color-error); color: var(--color-text-on-accent, #fff); padding: var(--spacing-sm) var(--spacing-lg); border: none; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; }

    /* Data Table */
    .dt { display: flex; flex-direction: column; gap: var(--spacing-sm); }
    .dt-bulk { background: color-mix(in srgb, var(--color-primary, var(--color-text-primary)) 10%, transparent); padding: var(--spacing-xs) var(--spacing-md); border-radius: var(--radius-sm); font-size: var(--text-caption); display: flex; gap: var(--spacing-md); align-items: center; }
    .dt-bulk-btn { background: transparent; border: none; color: var(--color-primary, var(--color-text-primary)); font-weight: 600; cursor: pointer; font-family: inherit; font-size: var(--text-caption); }
    .dt-table { width: 100%; border-collapse: collapse; font-size: var(--text-caption); }
    .dt-table thead { background: var(--color-bg-page); }
    .dt-table th { text-align: left; padding: var(--spacing-sm) var(--spacing-md); color: var(--color-text-tertiary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; font-size: 11px; }
    .dt-table td { padding: var(--spacing-sm) var(--spacing-md); border-bottom: 1px solid var(--color-border-default); }
    .dt-sort { color: var(--color-primary, var(--color-text-primary)); font-weight: 700; }
    .dt-badge { padding: 2px var(--spacing-sm); border-radius: var(--radius-full); font-size: 11px; background: var(--color-surface-input); color: var(--color-text-secondary); }
    .dt-badge--success { background: var(--color-success); color: var(--color-text-on-accent, #fff); }
    .dt-badge--warning { background: var(--color-warning); color: var(--color-text-on-accent, #fff); }

    /* Carousel */
    .car { display: flex; gap: var(--spacing-sm); align-items: center; }
    .car-arrow { width: 32px; height: 32px; border: 1px solid var(--color-border-default); background: var(--color-surface-default); border-radius: var(--radius-full); cursor: pointer; font-size: 16px; flex-shrink: 0; }
    .car-arrow:hover { background: var(--color-surface-input); }
    .car-frame { flex: 1; height: 100px; background: var(--color-bg-page); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--color-text-secondary); }
    .car-dots { display: flex; gap: var(--spacing-xs); justify-content: center; margin-top: var(--spacing-sm); }
    .car-dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--color-surface-input); }
    .car-dot--active { background: var(--color-primary, var(--color-text-primary)); width: 24px; }

    /* Scroll Area */
    .sa { max-height: 100px; overflow-y: auto; padding: var(--spacing-sm); background: var(--color-bg-page); border-radius: var(--radius-md); }
    .sa-content { font-size: var(--text-caption); color: var(--color-text-secondary); line-height: 1.6; }

    /* Sonner toast stack */
    .son { display: flex; flex-direction: column; gap: var(--spacing-sm); }
    /* sonner.md SoT — 20px stroke svg(kind별 색) + shadow-lg + border 1px */
    .son-toast { display: flex; gap: var(--spacing-md); align-items: flex-start; padding: var(--spacing-md) var(--spacing-lg); background: var(--color-surface-default); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); font-size: var(--text-body-sm); line-height: var(--text-body-sm--line-height); color: var(--color-text-primary); }
    .son-toast > svg { flex-shrink: 0; margin-top: 2px; }

    /* Aspect Ratio */
    .ar { background: var(--color-surface-input); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--color-text-tertiary); font-family: ui-monospace, monospace; font-size: var(--text-caption); }
    .ar--16-9 { aspect-ratio: 16 / 9; }

    /* Chart mini */
    .chart-mini { display: flex; gap: var(--spacing-xs); align-items: flex-end; height: 100px; padding: var(--spacing-sm); background: var(--color-bg-page); border-radius: var(--radius-md); }
    .chart-bar { flex: 1; border-radius: var(--radius-xs) var(--radius-xs) 0 0; min-height: 8px; }

    /* Date Range Picker / Time Picker */
    .drp { display: flex; gap: var(--spacing-sm); align-items: center; padding: var(--spacing-sm) var(--spacing-md); background: var(--color-surface-input); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); font-family: ui-monospace, monospace; font-size: var(--text-caption); }
    .drp-arrow { color: var(--color-text-tertiary); }
    .drp-days { margin-left: auto; padding: 2px var(--spacing-sm); background: var(--color-primary, var(--color-text-primary)); color: var(--color-text-on-accent, #fff); border-radius: var(--radius-full); font-size: 11px; }
    .tp { display: flex; gap: var(--spacing-xs); align-items: center; padding: var(--spacing-md) var(--spacing-lg); background: var(--color-surface-input); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); justify-content: center; font-size: var(--text-title-md); font-weight: 600; font-family: ui-monospace, monospace; }
    .tp-sep { color: var(--color-text-tertiary); }

    /* Token catalog (기존 — 압축 유지) */
    .catalog { margin-top: var(--spacing-3xl); padding-top: var(--spacing-2xl); border-top: 1px dashed var(--color-border-default); }
    .catalog h3 { font-size: var(--text-title-md); font-weight: 600; margin: var(--spacing-xl) 0 var(--spacing-md); }
    .swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-lg); }
    .swatch { background: var(--color-surface-default); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); }
    .swatch-color { height: 60px; }
    .swatch-name { font-weight: 600; padding: var(--spacing-sm) var(--spacing-md) 0; font-size: var(--text-caption); }
    .swatch-value { padding: 0 var(--spacing-md) var(--spacing-sm); font-family: ui-monospace, monospace; color: var(--color-text-tertiary); font-size: 11px; }
    .text-row { display: grid; grid-template-columns: 240px 1fr; gap: var(--spacing-lg); padding: var(--spacing-md) 0; border-bottom: 1px solid var(--color-border-default); }
    .text-meta { display: flex; flex-direction: column; }
    .text-meta strong { font-size: var(--text-body-md); }
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

    [data-theme="dark"] body { background: var(--color-bg-page-dark); color: var(--color-text-primary-dark); }
    [data-theme="dark"] .hero-card--surface,
    [data-theme="dark"] .ci-group,
    [data-theme="dark"] .ci-swatch,
    [data-theme="dark"] .vignette-card,
    [data-theme="dark"] .typo-moment,
    [data-theme="dark"] .ld-section,
    [data-theme="dark"] .ld-rating,
    [data-theme="dark"] .ld-meta-card,
    [data-theme="dark"] .ld-rail,
    [data-theme="dark"] .cal-card,
    [data-theme="dark"] .review-summary,
    [data-theme="dark"] .review-item,
    [data-theme="dark"] .amenity-grid,
    [data-theme="dark"] .empty-card,
    [data-theme="dark"] .modal-dialog,
    [data-theme="dark"] .toast,
    [data-theme="dark"] .form-card,
    [data-theme="dark"] .ld-highlights,
    [data-theme="dark"] .ld-host,
    [data-theme="dark"] .sk-card-wrap,
    [data-theme="dark"] .batch-card,
    [data-theme="dark"] .drw-side,
    [data-theme="dark"] .drw-bottom,
    [data-theme="dark"] .sc-card,
    [data-theme="dark"] .ctx,
    [data-theme="dark"] .car-arrow,
    [data-theme="dark"] .son-toast,
    [data-theme="dark"] .swatch { background: var(--color-surface-default-dark); }
    [data-theme="dark"] .sb,
    [data-theme="dark"] .mb,
    [data-theme="dark"] .cmd,
    [data-theme="dark"] .hc,
    [data-theme="dark"] .ad,
    [data-theme="dark"] .car-frame,
    [data-theme="dark"] .sa,
    [data-theme="dark"] .chart-mini,
    [data-theme="dark"] .dt-table thead { background: var(--color-bg-page-dark); }
    [data-theme="dark"] .cb,
    [data-theme="dark"] .otp-cell,
    [data-theme="dark"] .otp-cell--filled,
    [data-theme="dark"] .drp,
    [data-theme="dark"] .tp,
    [data-theme="dark"] .ar,
    [data-theme="dark"] .car-dot { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .otp-cell--filled { background: var(--color-surface-default-dark); }
    [data-theme="dark"] .ctx,
    [data-theme="dark"] .col-trigger,
    [data-theme="dark"] .car-arrow,
    [data-theme="dark"] .son-toast,
    [data-theme="dark"] .tg,
    [data-theme="dark"] .tgg,
    [data-theme="dark"] .tgg-item + .tgg-item,
    [data-theme="dark"] .acc-item { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .dt-table td { border-bottom-color: var(--color-border-default-dark); }
    [data-theme="dark"] .acc-trigger:hover { color: var(--color-text-secondary-dark); }
    [data-theme="dark"] .sb-item--active,
    [data-theme="dark"] .tg--on,
    [data-theme="dark"] .tgg-item--active,
    [data-theme="dark"] .tg:hover,
    [data-theme="dark"] .tgg-item:hover,
    [data-theme="dark"] .col-trigger:hover,
    [data-theme="dark"] .nm-item:hover,
    [data-theme="dark"] .mb-item:hover,
    [data-theme="dark"] .cmd-item:hover,
    [data-theme="dark"] .car-arrow:hover,
    [data-theme="dark"] .ctx-item:hover,
    [data-theme="dark"] .sb-item:hover { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .cmd-input { background: var(--color-surface-default-dark); border-color: var(--color-border-default-dark); color: var(--color-text-primary-dark); }
    [data-theme="dark"] .drw-frame { background: var(--color-bg-page-dark); }
    [data-theme="dark"] .drw-handle { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .drw-row { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .drw-actions { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .drw-close:hover { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .stp-connector { background: var(--color-border-default-dark); }
    [data-theme="dark"] .pg-btn:hover,
    [data-theme="dark"] .pg-arrow:hover { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .sp-spinner { border-color: var(--color-surface-input-dark); border-top-color: var(--color-primary-light, var(--color-text-primary-dark)); }
    [data-theme="dark"] .sp-progress-fill { background: var(--color-primary-light, var(--color-text-primary-dark)); }
    [data-theme="dark"] .sp-progress-sweep { background: linear-gradient(90deg, transparent, var(--color-primary-light, var(--color-text-primary-dark)), transparent); }
    [data-theme="dark"] .stp-item--current .stp-circle {
      background: var(--color-primary-light, var(--color-primary, var(--color-text-primary-dark)));
      color: var(--color-bg-page-dark, #0b0d12);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary-light, var(--color-primary, var(--color-text-primary-dark))) 25%, transparent);
    }
    [data-theme="dark"] .ld-highlight-icon { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .sk { background-color: var(--color-surface-input-dark); background-image: linear-gradient(90deg, var(--color-surface-input-dark) 0%, var(--color-surface-default-dark) 50%, var(--color-surface-input-dark) 100%); }
    [data-theme="dark"] .sk-card,
    [data-theme="dark"] .sk-demo-cell { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .sk-card .sk,
    [data-theme="dark"] .sk-demo-cell .sk { background-color: var(--color-surface-default-dark); background-image: linear-gradient(90deg, var(--color-surface-default-dark) 0%, var(--color-surface-input-dark) 50%, var(--color-surface-default-dark) 100%); }
    [data-theme="dark"] .sk-row { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .form-input,
    [data-theme="dark"] .form-select,
    [data-theme="dark"] .form-textarea { background: var(--color-surface-input-dark); color: var(--color-text-primary-dark); border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .form-input--readonly { color: var(--color-text-secondary-dark); }
    [data-theme="dark"] .form-actions { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .modal-fields { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .toast-close:hover { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .ld-rail-row,
    [data-theme="dark"] .cal-legend { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .hero-fact,
    [data-theme="dark"] .typo-meta-row,
    [data-theme="dark"] .approval-row,
    [data-theme="dark"] .text-row,
    [data-theme="dark"] .motion-row,
    [data-theme="dark"] .typo-scale-row,
    [data-theme="dark"] .tabs,
    [data-theme="dark"] .btn-row--head { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .catalog { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .kpi-cell,
    [data-theme="dark"] .memo-row,
    [data-theme="dark"] .search-pill { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .btn-outline { border-color: var(--color-border-default-dark); color: var(--color-text-primary-dark); }
    [data-theme="dark"] .btn-outline:hover { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .btn-on-accent { background: var(--color-surface-default-dark); color: var(--color-text-primary-dark); }

    /* === Dark mode: brand primary → primary-light (어두운 표면 위 비채움 사용) === */
    /* 채움(fill)은 primary 유지 — primary-light fill 위 흰 텍스트는 대비 미달.
       비채움(text/border/outline/tint/small-dot)만 primary-light로 전환. */
    [data-theme="dark"] .btn-primary:focus-visible,
    [data-theme="dark"] .btn-state-focus { outline-color: var(--color-border-focus-light, var(--color-primary-light)); }
    [data-theme="dark"] .memo-tag { color: var(--color-primary-light, var(--color-text-secondary-dark)); }
    [data-theme="dark"] .tabs-underline .tab--active {
      color: var(--color-primary-light, var(--color-text-primary-dark));
      border-bottom-color: var(--color-primary-light, var(--color-text-primary-dark));
    }
    [data-theme="dark"] .cal-cell--scheduled {
      background: color-mix(in srgb, var(--color-primary-light, var(--color-text-primary-dark)) 18%, transparent);
    }
    [data-theme="dark"] .cal-cell--today {
      outline-color: var(--color-primary-light, var(--color-text-primary-dark));
      color: var(--color-primary-light, var(--color-text-primary-dark));
    }
    [data-theme="dark"] .cal-legend-dot--selected { background: var(--color-primary-light, var(--color-text-primary-dark)); }
    [data-theme="dark"] .cal-legend-dot--scheduled {
      background: color-mix(in srgb, var(--color-primary-light, var(--color-text-primary-dark)) 40%, transparent);
    }
    [data-theme="dark"] .cal-legend-dot--today {
      box-shadow: inset 0 0 0 2px var(--color-primary-light, var(--color-text-primary-dark));
    }
    [data-theme="dark"] .review-avg { color: var(--color-primary-light, var(--color-text-primary-dark)); }
    [data-theme="dark"] .review-rating { color: var(--color-primary-light, var(--color-text-primary-dark)); }
    [data-theme="dark"] .amenity-dot { background: var(--color-primary-light, var(--color-text-primary-dark)); }
    [data-theme="dark"] .empty-illustration {
      background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary-light, var(--color-text-tertiary-dark)) 25%, transparent), var(--color-surface-input-dark));
    }
    /* btn-outline의 border/text는 다크 모드에서 brand 표현이 필요 없는 케이스(중성 outline)라 primary-light 미적용 — 1503 line은 라이트 모드 텍스트가 primary, 다크 모드는 위 .btn-outline 룰로 text-primary-dark로 이미 override 됨. */

    /* === Dark mode token aliases ===
       data-theme="dark" 시 light 페어 토큰을 dark 페어로 alias —
       explicit color: var(--color-text-primary) 등이 자동 전환. 새 컴포넌트 추가 시
       individual override 작성 부담 감소. brand --color-primary는 mode-independent
       (.ld-host-avatar 등 채움 사용 보존), 비채움 brand 사용은 별도 [data-theme=dark]
       룰에서 primary-light로 override (v64 패턴). */
    [data-theme="dark"] {
      --color-bg-page: var(--color-bg-page-dark);
      --color-surface-default: var(--color-surface-default-dark);
      --color-surface-input: var(--color-surface-input-dark);
      --color-text-primary: var(--color-text-primary-dark);
      --color-text-secondary: var(--color-text-secondary-dark);
      --color-text-tertiary: var(--color-text-tertiary-dark);
      --color-text-disabled: var(--color-text-disabled-dark);
      --color-border-default: var(--color-border-default-dark);
      --color-border-strong: var(--color-border-strong-dark);
      --shadow-sm: var(--shadow-sm-dark);
      --shadow-md: var(--shadow-md-dark);
      --shadow-lg: var(--shadow-lg-dark);
      --shadow-xl: var(--shadow-xl-dark);
    }

    /* === Theme toggle === */
    .theme-toggle {
      position: fixed;
      top: var(--spacing-lg);
      right: var(--spacing-lg);
      z-index: var(--z-toast, 1400);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--color-surface-default);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-md);
      font-family: inherit;
      font-size: var(--text-caption);
      font-weight: 600;
      cursor: pointer;
      transition: background var(--motion-duration-fast, 150ms) var(--motion-ease-out, ease-out);
    }
    .theme-toggle:hover { background: var(--color-surface-input); }
    [data-theme="dark"] .theme-toggle {
      background: var(--color-surface-default-dark);
      color: var(--color-text-primary-dark);
      border-color: var(--color-border-default-dark);
    }
    [data-theme="dark"] .theme-toggle:hover { background: var(--color-surface-input-dark); }
    .theme-toggle-icon { font-size: 16px; line-height: 1; }
    [data-theme="light"] .theme-toggle-dark-text,
    [data-theme="light"] .theme-toggle-dark-icon { display: inline; }
    [data-theme="light"] .theme-toggle-light-text,
    [data-theme="light"] .theme-toggle-light-icon { display: none; }
    [data-theme="dark"] .theme-toggle-dark-text,
    [data-theme="dark"] .theme-toggle-dark-icon { display: none; }
    [data-theme="dark"] .theme-toggle-light-text,
    [data-theme="dark"] .theme-toggle-light-icon { display: inline; }

    @media (max-width: 900px) {
      .hero, .vignette-grid, .typo-moment-top, .ld-grid, .review-grid, .typo-scale-grid { grid-template-columns: 1fr; }
      .hero-card--primary .hero-card-content { max-width: 100%; }
      .hero-card-art { width: 120px; height: 120px; opacity: 0.4; right: var(--spacing-md); }
      .btn-row { grid-template-columns: 80px repeat(5, 1fr); }
      .approval-row { grid-template-columns: 1fr 1fr; }
      .ld-rail, .review-summary { position: static; }
      .form-grid { grid-template-columns: 1fr; }
      .ld-gallery {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
      }
      .ld-gallery-cell--hero { grid-row: 1 / 2; grid-column: 1 / -1; }
      .sk-demo { grid-template-columns: 1fr; }
      .batch-grid { grid-template-columns: 1fr; }
      .drw-side { width: 100%; }
      .sc-grid { grid-template-columns: 1fr; }
      .dt-table { font-size: 11px; }
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
  <script>
    (function() {
      try {
        var saved = localStorage.getItem("porest-theme");
        var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = saved || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      } catch (e) {
        document.documentElement.setAttribute("data-theme", "light");
      }
    })();
  </script>
  <style>${css}</style>
  <style>${pageCss()}</style>
</head>
<body>
  <button class="theme-toggle" type="button" aria-label="테마 전환" onclick="(function(){var c=document.documentElement.getAttribute('data-theme');var n=c==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem('porest-theme',n)}catch(e){}})()">
    <span class="theme-toggle-icon theme-toggle-dark-icon">🌙</span>
    <span class="theme-toggle-icon theme-toggle-light-icon">☀️</span>
    <span class="theme-toggle-dark-text">Dark</span>
    <span class="theme-toggle-light-text">Light</span>
  </button>
  <main>
    ${renderHero(brand)}
    ${renderColorIdentity(tokens)}
    ${renderTypographyMoment(brand, tokens)}
    ${renderButtonGallery(brand)}
    ${renderCheckboxGallery(brand)}
    ${renderVignettes(brand)}
    ${renderListingDetail(brand)}
    ${renderCalendar(brand)}
    ${renderReviews(brand)}
    ${renderAmenities(brand)}
    ${renderEmptyState(brand)}
    ${renderModal(brand)}
    ${renderToasts(brand)}
    ${renderForm(brand)}
    ${renderSkeleton(brand)}
    ${renderBatchV67(brand)}
    ${renderShadcnNav(brand)}
    ${renderShadcnInput(brand)}
    ${renderShadcnDisclose(brand)}
    ${renderShadcnData(brand)}
    ${renderShadcnExtras(brand)}
    ${renderBatchV73V78(brand)}
    ${renderTokenCatalog(tokens)}
    <p style="text-align:center;color:var(--color-text-tertiary);font-size:var(--text-caption);margin-top:var(--spacing-3xl);">
      source <code>${escape(sourceFile)}</code> · Porest Design System
    </p>
  </main>
  <script>
    // Animation replay (v74) — 클릭으로 keyframe 다시 실행
    document.querySelectorAll(".anim-replay").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var boxes = btn.closest(".sc-card").querySelectorAll(".anim-box");
        boxes.forEach(function(box) {
          var k = box.getAttribute("key");
          if (!k) return;
          // loop animation은 제외 — 이미 영구 재생 중
          if (["spin", "pulse", "shimmer"].indexOf(k) >= 0) return;
          box.style.animation = "none";
          // reflow 강제
          void box.offsetWidth;
          box.style.animation = "";
        });
      });
    });
    // RTL 토글 (v76) — dir 속성 mirror 시각 검증
    document.querySelectorAll(".rtl-toggle").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var demo = document.getElementById("rtl-demo");
        if (!demo) return;
        var current = demo.getAttribute("dir") || "ltr";
        var next = current === "ltr" ? "rtl" : "ltr";
        demo.setAttribute("dir", next);
        var label = document.getElementById("rtl-dir-label");
        if (label) label.textContent = next;
      });
    });
    // Banner dismiss (v73)
    document.querySelectorAll(".banner-close").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var b = btn.closest(".banner");
        if (b) b.style.display = "none";
      });
    });
  </script>
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

  const rawCss = readFileSync(cssPath, "utf8");
  const tokens = parseTokensFromCss(rawCss);
  const css = rawCss.replace(/@theme\s*\{/, ":root {");
  const html = renderHtml(brand, css, tokens, basename(source));

  writeFileSync(output, html, "utf8");
  console.log(`✓ ${basename(output)}: colors=${tokens.colors.length}, text=${tokens.text.length}, radius=${tokens.radius.length}, spacing=${tokens.spacing.length}, shadow=${tokens.shadow.length}, motion=${tokens.motion.length}, overlay=${tokens.overlay.length}`);
}
