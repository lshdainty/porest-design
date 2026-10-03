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
      // 직원 상세의 구역 — 다른 내용으로 옮기는 1차 탭(Line · Fill · small, tabs.md)
      tabs: {
        kind: "line",
        label: "직원 상세",
        items: [
          { label: "기본정보", body: "이름 · 소속 · 직무 · 입사일" },
          { label: "근태", body: "이번 달 출근 · 퇴근 · 지각 기록" },
          { label: "평가", body: "분기 평가와 동료 피드백" },
          { label: "급여", body: "지급 내역과 급여 명세서" },
        ],
      },
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
      // 빈 결재함 — Result Section 비어 있음(result-section.md 글 — 제목은 마침표 없이, 설명은 무엇을 하면 되는지, 버튼은 동작 이름). 아이콘은 비어 있는 것(받은 결재)을 말한다
      emptyState: {
        icon: "inbox",
        title: "처리할 결재가 없어요",
        description: "새 결재가 오면 여기에 모여요.",
        primary: "새 결재 시작",
        secondary: "지난 결재 보기",
      },
      snackbars: [
        { message: "휴가 신청을 결재 라인에 보냈어요." },
        { tone: "positive", message: "김지원의 휴가 신청을 승인했어요." },
        { tone: "critical", message: "결재 의견을 보내지 못했어요. 다시 눌러 주세요." },
        { message: "휴가 신청을 취소했어요.", action: "되돌리기" },
      ],
      // 폼 칸 — renderForm 이 Field 로 그린다. pair 는 다음 칸과 나란히(짧은 두 칸), max 는 글자 수 최대.
      // 고르는 칸은 select(짧은 선택지 5개 이상 — 칸 아래 목록) · inputButton(달력 · 격자를 여는 칸 — 기간 · 날짜 · 카테고리)이다(select.md "고르는 컴포넌트 고르기")
      form: {
        title: "휴가 신청 폼",
        sectionDescription: "칸의 2/3 이상이 필수라 선택 칸(사유)에만 \"선택\" 을 붙였다(필수 점과 섞지 않는다). 결재 라인은 권한 그룹 기준 자동 매핑.",
        fields: [
          { type: "input", label: "신청자", value: "김지원", helper: "근속 2년차 · 디자인본부", required: true, readonly: true, pair: true },
          { type: "select", label: "휴가 정책", value: "연차", options: ["연차", "반차(오전)", "반차(오후)", "병가", "특별휴가"], required: true },
          { type: "inputButton", label: "기간", value: "5월 12일 (화)~5월 14일 (목)", suffixIcon: "calendarDays", helper: "사용 일수 3일 · 남은 연차 8.5일", required: true },
          { type: "textarea", label: "사유", value: "가족 행사 참석으로 인한 연차 사용 요청드립니다.\n결재 후 인수인계 문서 공유드리겠습니다.", max: 1000 },
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
      // 같은 메모를 거르는 자리 — 탭이 아니라 Segmented Control 이다(segmented-control.md). 메모마다 보일 칸의 값(tags)을 단다
      tabs: {
        kind: "segmented",
        label: "메모 보기",
        items: [
          { label: "전체", value: "all" },
          { label: "즐겨찾기", value: "fav" },
          { label: "오늘", value: "today" },
          { label: "보관함", value: "archive" },
        ],
        memos: [
          { title: "Porest 브랜드 톤", excerpt: "절제 · 신뢰감 — 토스 레퍼런스. 두 브랜드 듀얼 톤…", tags: "all fav" },
          { title: "이번 주 회고", excerpt: "월요일 스프린트 시작 정리. 핵심 액션 3가지…", tags: "all today" },
          { title: "10월 고정비 정리", excerpt: "통신 · 구독 해지할 것 — 가계부에 옮기기", tags: "all fav today" },
          { title: "지난 프로젝트 정리", excerpt: "9월 회고 자료 — 보관함으로 옮긴 메모", tags: "archive" },
        ],
      },
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
          primary: "수정",
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
        icon: "listChecks",
        title: "오늘 할 일이 없어요",
        description: "할 일을 추가하면 여기에 모여요.",
        primary: "할 일 추가",
        secondary: "어제 할 일 보기",
      },
      snackbars: [
        { message: "메모를 저장했어요." },
        { tone: "positive", message: "거래 1,204건을 가져왔어요." },
        { tone: "critical", message: "관심 종목에 넣지 못했어요. 다시 눌러 주세요." },
        { message: "메모를 보관함으로 옮겼어요.", action: "되돌리기" },
      ],
      form: {
        title: "거래 추가",
        sectionDescription: "가계부에 새 거래를 기록해요. 카테고리는 키워드 자동 추천.",
        fields: [
          // 거래 종류(지출 · 수입 · 이체 — 짧은 선택지 셋)는 Chip 하나 고르기다(select.md "고르는 컴포넌트 고르기" · chip.md) — Select 로 숨기지 않는다.
          // 고른 값이 곧 폼의 갈래라 Outline Strong(chip.md Variant). renderForm 이 chipField 로 그린다(03i)
          { type: "chips", label: "거래 종류", value: "지출", options: ["지출", "수입", "이체"], variant: "outlineStrong", required: true },
          { type: "input", label: "금액", value: "28,500", suffix: "원", inputmode: "numeric", format: "amount", helper: "최근 카페 평균 6,800원", required: true, pair: true },
          { type: "select", label: "결제 수단", value: "현대카드 M", prefixIcon: "creditCard", options: ["결제 수단 없음", "현대카드 M", "신한카드 Deep", "국민 주계좌", "현금"], required: true },
          { type: "inputButton", label: "카테고리", value: "식비 · 카페", prefixIcon: "coffee", suffixIcon: "chevronDown", options: ["식비 · 카페", "식비 · 외식", "교통", "취미", "고정비"], required: true, pair: true },
          { type: "inputButton", label: "날짜", value: "5월 10일 (일)", suffixIcon: "calendarDays", helper: "오늘", required: true },
          { type: "textarea", label: "메모", value: "친구와 디자인 토픽 미팅 — 2시간 작업 후 마무리.", max: 200 },
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
    // 문서의 구역 — 다른 내용으로 옮기는 1차 탭(Line · Fill · small, tabs.md)
    tabs: {
      kind: "line",
      label: "문서",
      items: [
        { label: "Tokens", body: "색 · 글자 · 간격 · 모서리 · 모션 토큰" },
        { label: "Components", body: "버튼 · 입력칸 · 칩 · 탭 같은 컴포넌트 스펙" },
        { label: "Patterns", body: "폼 · 목록 · 빈 화면 같은 화면 짜임" },
        { label: "Brand", body: "HR · Desk 브랜드 색과 쓰임" },
      ],
    },
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
      icon: "inbox",
      title: "제안한 토큰이 없어요",
      description: "새 토큰을 제안하면 여기에 모여요.",
      primary: "토큰 제안",
      secondary: "",
    },
    snackbars: [
      { message: "토큰 제안을 저장했어요." },
      { tone: "positive", message: `tokens.css 를 만들었어요. 색 ${tokens.colors.length}개가 들어 있어요.` },
      { tone: "critical", message: "동기화하지 못했어요. 다시 실행해 주세요." },
      { message: "토큰 제안을 지웠어요.", action: "되돌리기" },
    ],
    form: {
      title: "Token submission form",
      sectionDescription: "신규 토큰 제안 demo — Field 로 감싼 Input · Select · Textarea. 칸의 2/3 이상이 필수라 선택 칸(근거)에만 \"선택\" 을 붙였다.",
      fields: [
        { type: "input", label: "토큰 이름", value: "spacing-2xs", helper: "kebab-case · 의미 기반 명명", required: true, pair: true },
        { type: "select", label: "카테고리", value: "spacing", options: ["color", "typography", "spacing", "radius", "shadow", "motion"], required: true },
        { type: "input", label: "값", value: "2px", helper: "단위 포함 — px / rem / em", required: true },
        { type: "textarea", label: "근거 (rationale)", value: "4px-grid 미만 hairline 용도. v6 이후 추가 검토 필요.", max: 500 },
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

// Button — spec: specs/components/button.md · 수치 button.yaml. 구조는 SEED Action Button(2026-09-30).
// 변형 × 상태 · 크기 × 배치 · ghost 글자색 세 판을 흰 표면(.btn-panel) 위에 그린다.
export function renderButtonGallery(brand) {
  const svg = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const ICON = {
    plus: svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
    chevron: svg('<polyline points="9 18 15 12 9 6"/>'),
    search: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    bell: svg('<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'),
    more: svg('<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'),
    star: svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
    trash: svg('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
  };
  // 라벨은 <span> 에 싼다 — 로딩이면 숨기기만 해 폭이 그대로다. 아이콘만이면 이름(aria-label)을 단다 — 네이티브 title 은 쓰지 않는다(tooltip.md)
  const btn = ({ cls, label = "", prefix = "", suffix = "", name = "", attrs = "" }) => {
    const aria = name ? ` aria-label="${escape(name)}"` : "";
    return `<button class="btn ${cls}" type="button"${aria}${attrs}>${prefix}${label ? `<span>${escape(label)}</span>` : ""}${suffix}</button>`;
  };
  const head = (first, cols, mod = "") => `<div class="btn-row btn-row--head${mod}"><div class="btn-cell-head">${escape(first)}</div>${
    cols.map(c => `<div class="btn-cell-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
  }</div>`;
  const row = (ko, en, cells, mod = "") => `
      <div class="btn-row${mod}"><div class="btn-row-label">${escape(ko)}<span>${escape(en)}</span></div>${
        cells.map(c => `<div class="btn-cell">${c}</div>`).join("")
      }</div>`;

  // 1. 변형 × 상태
  const coreAction = brand.key === "hr" ? "휴가 신청" : brand.key === "desk" ? "거래 추가" : "핵심 액션";
  const variants = [
    { cls: "btn-brand-solid", en: "brandSolid", ko: "브랜드 채움", label: coreAction },
    { cls: "btn-neutral-solid", en: "neutralSolid", ko: "짙은 회색 채움", label: "저장" },
    { cls: "btn-neutral-weak", en: "neutralWeak", ko: "옅은 회색 채움", label: "취소" },
    { cls: "btn-critical-solid", en: "criticalSolid", ko: "빨강 채움", label: "삭제" },
    { cls: "btn-brand-outline", en: "brandOutline", ko: "테두리 · 브랜드 글자", label: "초대" },
    { cls: "btn-neutral-outline", en: "neutralOutline", ko: "테두리 · 본문 글자", label: "공유" },
    { cls: "btn-ghost", en: "ghost", ko: "배경 없음", label: "편집" },
  ];
  const states = [
    { en: "enabled", ko: "기본", cls: "" },
    { en: "hovered", ko: "호버", cls: "btn-state-hover" },
    { en: "focused", ko: "포커스", cls: "btn-state-focus" },
    { en: "pressed", ko: "누름", cls: "btn-state-pressed" },
    { en: "loading", ko: "로딩", cls: "btn-loading", attrs: ' aria-busy="true"' },
    { en: "disabled", ko: "비활성", cls: "", attrs: " disabled" },
  ];
  const variantPanel = `
    <div class="btn-panel">
      <div class="btn-panel-head">
        <div class="btn-panel-title">변형 × 상태</div>
        <div class="btn-panel-sub">호버 · 포커스 · 누름은 상태를 고정해 보여 준다 — 실제 버튼도 마우스 · 키보드로 눌러 볼 수 있다. 강조 버튼(Solid)은 한 화면에 하나.</div>
      </div>
      <div class="btn-matrix">
        ${head("변형", states)}${variants.map(v => row(v.ko, v.en,
          states.map(s => btn({ cls: `${v.cls} ${s.cls}`.trim(), label: v.label, attrs: s.attrs || "" })),
        )).join("")}
      </div>
    </div>`;

  // 2. 크기 × 배치
  const sizes = [
    { cls: "btn-size-xsmall", en: "32 · 알약", ko: "xsmall" },
    { cls: "btn-size-small", en: "36", ko: "small" },
    { cls: "btn-size-medium", en: "40 · 기본", ko: "medium" },
    { cls: "btn-size-large", en: "48", ko: "large" },
  ];
  const sizeRows = [
    { ko: "글자", en: "withText", make: s => btn({ cls: `btn-neutral-solid ${s.cls}`, label: "저장" }) },
    { ko: "앞 아이콘 + 글자", en: "prefixIcon", make: s => btn({ cls: `btn-neutral-solid ${s.cls}`, label: "추가", prefix: ICON.plus }) },
    { ko: "글자 + 뒤 아이콘", en: "suffixIcon", make: s => btn({ cls: `btn-neutral-solid ${s.cls}`, label: "다음", suffix: ICON.chevron }) },
    { ko: "아이콘만", en: "iconOnly · 정사각", make: s => btn({ cls: `btn-neutral-solid btn-icon-only ${s.cls}`, prefix: ICON.search, name: "검색" }) },
    { ko: "로딩", en: "loading · 폭 유지", make: s => btn({ cls: `btn-neutral-solid ${s.cls} btn-loading`, label: "저장", attrs: ' aria-busy="true"' }) },
  ];
  const sizePanel = `
    <div class="btn-panel">
      <div class="btn-panel-head">
        <div class="btn-panel-title">크기 × 배치</div>
        <div class="btn-panel-sub">크기는 이름이 아니라 높이로 고른다. 글자 700 · 아이콘과 글자 사이는 크기마다(4 · 4 · 6 · 8). 앞 · 뒤 아이콘은 함께 쓰지 않는다. 누르는 영역은 44 까지 넓힌다.</div>
      </div>
      <div class="btn-matrix">
        ${head("배치", sizes, " btn-row--4")}${sizeRows.map(r => row(r.ko, r.en, sizes.map(r.make), " btn-row--4")).join("")}
      </div>
    </div>`;

  // 3. ghost 글자색
  const ghostColors = [
    { cls: "", en: "neutral", ko: "기본", label: "편집", icon: ICON.bell, name: "알림" },
    { cls: "btn-ghost-subtle", en: "neutralSubtle", ko: "흐린 글자", label: "더보기", icon: ICON.more, name: "더보기" },
    { cls: "btn-ghost-brand", en: "brand", ko: "브랜드 글자", label: "자세히 보기", icon: ICON.star, name: "즐겨찾기" },
    { cls: "btn-ghost-critical", en: "critical", ko: "위험 글자", label: "삭제", icon: ICON.trash, name: "삭제" },
  ];
  const ghostCls = (g, extra = "") => ["btn-ghost", g.cls, extra].filter(Boolean).join(" ");
  const ghostPanel = `
    <div class="btn-panel">
      <div class="btn-panel-head">
        <div class="btn-panel-title">ghost 글자색</div>
        <div class="btn-panel-sub">배경 · 누름은 ghost 그대로, 글자색만 바뀐다. 확인 창을 여는 삭제는 critical, 목록 · 툴바의 보조 아이콘 액션과 가장자리 텍스트 버튼(flush)은 neutralSubtle.</div>
      </div>
      <div class="btn-matrix">
        ${head("배치", ghostColors, " btn-row--4")}${[
          row("글자", "withText", ghostColors.map(g => btn({ cls: ghostCls(g), label: g.label })), " btn-row--4"),
          row("아이콘만", "iconOnly · medium", ghostColors.map(g => btn({ cls: ghostCls(g, "btn-icon-only"), prefix: g.icon, name: g.name })), " btn-row--4"),
          row("누름", "pressed", ghostColors.map(g => btn({ cls: ghostCls(g, "btn-state-pressed"), label: g.label })), " btn-row--4"),
          row("비활성", "disabled", ghostColors.map(g => btn({ cls: ghostCls(g), label: g.label, attrs: " disabled" })), " btn-row--4"),
        ].join("")}
      </div>
    </div>`;

  const lede = brand.key === "shared"
    ? "SEED Action Button 구조 — 변형 7 · 크기 4 · 상태 6. 호버는 누름 색, 누름은 누름 색 + 세로 2px 축소, 비활성은 전용 색(흐리게 하지 않는다). 공유 토큰에는 브랜드 역할 색이 없어 brandSolid · brandOutline 이 여기서는 중립으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다."
    : `SEED Action Button 구조 — 변형 7 · 크기 4 · 상태 6. 호버는 누름 색, 누름은 누름 색 + 세로 2px 축소, 비활성은 전용 색(흐리게 하지 않는다). brandSolid 는 서비스의 핵심 액션 하나(${coreAction})에만 — 저장 · 확인 같은 대부분의 CTA 는 neutralSolid.`;

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03 — Button</div>
      <h2 class="section-title">변형 7 · 크기 4 · 상태 6</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${variantPanel}
    ${sizePanel}
    ${ghostPanel}
  </section>`;
}

// Checkbox — spec: specs/components/checkbox.md · 수치 checkbox.yaml. 구조는 SEED Checkbox(2026-09-30).
// 칸 .checkbox(Checkmark) · 칸 + 라벨 .checkbox-row(Checkbox) · 묶음 .checkbox-group. 아이콘은 lucide Check · Minus, 선 3.
const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const MINUS_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
// 옛 크기 이름은 새 크기로 — sm 16 · md 18 → medium 20, lg 20 → large 24(checkbox.md Migration notes)
const CHECKBOX_SIZE = { medium: "medium", large: "large", sm: "medium", md: "medium", lg: "large" };
const CHECKBOX_INTERACTIONS = ["hover", "focus", "pressed"];

// label 이 있으면 칸 + 라벨 한 줄(<label class="checkbox-row">), 없으면 칸만 — 칸만 쓰면 name 을 aria-label 로 단다.
//   size         medium(기본) · large. 옛 sm · md · lg 도 받는다
//   shape        square(기본) · ghost(칸 없이 체크만 — 선택 안 됨도 옅은 체크)
//   tone         neutral(기본, 짙은 회색) · brand(서비스 핵심 흐름에서만)
//   state        체크 여부 — unchecked(기본) · checked · indeterminate. 옛 이름도 받는다: default → unchecked,
//                focus → unchecked + 포커스 고정, disabled → unchecked + disabled, error → unchecked(오류 칸은 없다 — 묶음 아래 글)
//   disabled     전용 색(흐리게 하지 않는다)
//   weight       라벨 굵기 — regular(기본) · bold(강조 · 묶음의 부모)
//   interaction  hover · focus · pressed — 갤러리에서 그 순간을 고정해 보여 줄 때만(.btn-state-* 와 같은 역할)
export function cbox({ size = "medium", shape = "square", tone = "neutral", state = "unchecked", disabled = false, label = "", weight = "regular", interaction = "", name = "", id = "" } = {}) {
  if (state === "focus") { state = "unchecked"; interaction = interaction || "focus"; }
  else if (state === "disabled") { state = "unchecked"; disabled = true; }
  else if (state !== "checked" && state !== "indeterminate") state = "unchecked";
  const large = CHECKBOX_SIZE[size] === "large";
  const ghost = shape === "ghost";
  const aria = state === "checked" ? "true" : state === "indeterminate" ? "mixed" : "false";
  // Square 는 선택 안 됨에 아이콘이 없다. Ghost 는 선택 안 됨에도 옅은 체크를 보인다
  const icon = state === "indeterminate" ? MINUS_SVG : state === "checked" || ghost ? CHECK_SVG : "";
  const cls = [
    "checkbox",
    large && "checkbox--large",
    ghost && "checkbox--ghost",
    tone === "brand" && "checkbox--brand",
    CHECKBOX_INTERACTIONS.includes(interaction) && `checkbox--${interaction}`,
  ].filter(Boolean).join(" ");
  const attrs = (id ? ` id="${escape(id)}"` : "") + (!label && name ? ` aria-label="${escape(name)}"` : "") + (disabled ? " disabled" : "");
  const box = `<button type="button" role="checkbox" aria-checked="${aria}" class="${cls}"${attrs}>${icon}</button>`;
  if (!label) return box;
  const labelCls = weight === "bold" ? "checkbox-label checkbox-label--bold" : "checkbox-label";
  return `<label class="checkbox-row${large ? " checkbox-row--large" : ""}">${box}<span class="${labelCls}">${escape(label)}</span></label>`;
}

// 모양 · 톤 × 체크 여부 · 체크 여부 × 상태 · 크기 × 굵기 · 묶음 네 판을 흰 표면(.vignette-card) 위에 그린다.
export function renderCheckboxGallery(brand) {
  const head = (first, cols) => `<div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">${escape(first)}</div>${
    cols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
  }</div>`;
  const row = (ko, en, cells) => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(ko)}<span>${escape(en)}</span></div>${
          cells.map(c => `<div class="cb-matrix-cell">${c}</div>`).join("")
        }</div>`;
  const panel = (title, sub, cols, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>
      <div class="cb-matrix" style="--cb-cols: ${cols};">
        ${body}
      </div>
    </div>`;

  // 1. 모양 · 톤 × 체크 여부(비활성 포함) — 칸만
  const looks = [
    { ko: "칸 · 짙은 회색", en: "square · neutral — 기본", shape: "square", tone: "neutral" },
    { ko: "칸 · 브랜드", en: "square · brand", shape: "square", tone: "brand" },
    { ko: "체크만 · 짙은 회색", en: "ghost · neutral", shape: "ghost", tone: "neutral" },
    { ko: "체크만 · 브랜드", en: "ghost · brand", shape: "ghost", tone: "brand" },
  ];
  const checks = [
    { ko: "선택 안 됨", en: "unchecked", state: "unchecked" },
    { ko: "선택", en: "checked", state: "checked" },
    { ko: "일부 선택", en: "indeterminate", state: "indeterminate" },
    { ko: "비활성", en: "disabled", state: "unchecked", disabled: true },
    { ko: "비활성 · 선택", en: "disabled · checked", state: "checked", disabled: true },
    { ko: "비활성 · 일부 선택", en: "disabled · indeterminate", state: "indeterminate", disabled: true },
  ];
  const checkedPanel = panel(
    "모양 · 톤 × 체크 여부",
    "선택 안 된 칸은 테두리(stroke-neutral-solid) · 투명 바탕, 선택 · 일부 선택은 테두리 없이 채운다. Ghost 는 칸 없이 체크만 — 선택 안 됨도 옅은 체크. 비활성은 전용 색이고 흐리게 하지 않는다.",
    checks.length,
    head("모양 · 톤", checks) + looks.map(l => row(l.ko, l.en,
      checks.map(c => cbox({ shape: l.shape, tone: l.tone, state: c.state, disabled: c.disabled, name: `${l.ko} — ${c.ko}` })),
    )).join(""),
  );

  // 2. 체크 여부 × 상태 — 칸만
  const stateRows = [
    { ko: "칸 · 선택 안 됨", en: "square · unchecked", shape: "square", tone: "neutral", state: "unchecked" },
    { ko: "칸 · 짙은 회색 선택", en: "square · neutral · checked", shape: "square", tone: "neutral", state: "checked" },
    { ko: "칸 · 브랜드 선택", en: "square · brand · checked", shape: "square", tone: "brand", state: "checked" },
    { ko: "체크만 · 선택 안 됨", en: "ghost · unchecked", shape: "ghost", tone: "neutral", state: "unchecked" },
    { ko: "체크만 · 짙은 회색 선택", en: "ghost · neutral · checked", shape: "ghost", tone: "neutral", state: "checked" },
    { ko: "체크만 · 브랜드 선택", en: "ghost · brand · checked", shape: "ghost", tone: "brand", state: "checked" },
  ];
  const states = [
    { ko: "기본", en: "enabled", interaction: "" },
    { ko: "호버", en: "hovered", interaction: "hover" },
    { ko: "포커스", en: "focused", interaction: "focus" },
    { ko: "누름", en: "pressed", interaction: "pressed" },
  ];
  const statePanel = panel(
    "체크 여부 × 상태",
    "호버 · 포커스 · 누름은 그 순간을 멈춰 그렸다. 호버는 누름 색, 누름은 누름 색 + 칸만 세로 2px 축소(라벨은 줄지 않는다), 포커스는 키보드에만 링 2px · 띄움 2px.",
    states.length,
    head("체크 여부", states) + stateRows.map(r => row(r.ko, r.en,
      states.map(s => cbox({ shape: r.shape, tone: r.tone, state: r.state, interaction: s.interaction, name: `${r.ko} — ${s.ko}` })),
    )).join(""),
  );

  // 3. 크기 × 굵기 — 칸 + 라벨
  const sizes = [
    { ko: "medium", en: "칸 20 · 라벨 14 · 줄 32 — 기본", size: "medium" },
    { ko: "large", en: "칸 24 · 라벨 16 · 줄 36", size: "large" },
  ];
  const sizeRows = [
    { ko: "선택 안 됨", en: "unchecked", args: {} },
    { ko: "선택", en: "checked", args: { state: "checked" } },
    { ko: "일부 선택", en: "indeterminate", args: { state: "indeterminate" } },
    { ko: "체크만", en: "ghost · checked", args: { shape: "ghost", state: "checked" } },
    { ko: "굵게", en: "weight bold", args: { weight: "bold", state: "checked" } },
    { ko: "비활성", en: "disabled", args: { disabled: true, label: "이 카드 기억하기" } },
    { ko: "비활성 · 선택", en: "disabled · checked", args: { disabled: true, state: "checked", label: "이 카드 기억하기" } },
  ];
  const sizePanel = panel(
    "크기 × 굵기",
    "칸 · 라벨 · 줄 높이가 함께 정해진다. 칸과 라벨 사이 8, 라벨은 regular 400 — 강조나 묶음의 부모는 bold 700. 라벨까지 눌리고, 누르는 영역은 44 까지 넓힌다.",
    sizes.length,
    head("체크 여부", sizes) + sizeRows.map(r => row(r.ko, r.en,
      sizes.map(s => cbox({ label: "단종된 카드도 보기", ...r.args, size: s.size })),
    )).join(""),
  );

  // 4. 묶음 — 부모는 자식을 따른다(모두 → 선택, 일부 → 일부 선택, 없음 → 선택 안 됨)
  const items = [
    { label: "거래 내역", on: true },
    { label: "예산", on: true },
    { label: "메모", on: false },
    { label: "할 일", on: false },
  ];
  const parent = items.every(i => i.on) ? "checked" : items.some(i => i.on) ? "indeterminate" : "unchecked";
  const groupPanel = `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">묶음 · 일부 선택</div>
        <div class="vignette-sub">부모(전체 · bold)를 맨 위에 둔다 — 자식을 일부만 고르면 부모는 일부 선택(가로줄). 세로로 쌓고 줄 사이 12(줄마다 누르는 영역 44 를 온전히 받는다), 들여쓰지 않는다. 오류는 칸을 바꾸지 않고 묶음 아래 글로 알린다.</div>
      </div>
      <div class="cb-group-legend" id="cb-group-export">내보낼 데이터</div>
      <div class="checkbox-group" role="group" aria-labelledby="cb-group-export">
        ${cbox({ label: "전체", weight: "bold", state: parent })}
        ${items.map(i => cbox({ label: i.label, state: i.on ? "checked" : "unchecked" })).join("\n        ")}
      </div>
    </div>`;

  const lede = "SEED Checkbox 구조 — 칸(Checkmark) · 칸 + 라벨(Checkbox) · 묶음(Checkbox Group). 선택 색은 짙은 회색(neutral)이 기본이고 brand 는 서비스 핵심 흐름에서만. 비활성은 전용 색(흐리게 하지 않는다), 오류 칸은 없다 — 묶음 아래 글로 알린다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 brand 톤이 여기서는 중립으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03b — Checkbox</div>
      <h2 class="section-title">크기 2 · 모양 2 · 톤 2 · 체크 여부 3</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${checkedPanel}
    ${statePanel}
    ${sizePanel}
    ${groupPanel}
  </section>`;
}

// Radio — spec: specs/components/radio-group.md · 수치 radio-group.yaml. 구조는 SEED Radio(2026-09-30).
// 동그라미 .radio(Radiomark) · 동그라미 + 라벨 .radio-row(Radio) · 묶음 .radio-group. 가운데 점은 .radio-dot.
const RADIO_INTERACTIONS = ["hover", "focus", "pressed"];

// label 이 있으면 동그라미 + 라벨 한 줄(<label class="radio-row">), 없으면 동그라미만 — 동그라미만 쓰면 name 을 aria-label 로 단다.
//   size         medium(기본) · large
//   tone         neutral(기본, 짙은 회색) · brand(서비스 핵심 흐름에서만)
//   checked      선택 여부 — false(기본) · true
//   disabled     전용 색(흐리게 하지 않는다) — 선택이면 채운 원 그대로 색만 바뀐다
//   weight       라벨 굵기 — regular(기본) · bold(강조)
//   interaction  hover · focus · pressed — 갤러리에서 그 순간을 고정해 보여 줄 때만(.checkbox--* 와 같은 역할)
export function radio({ size = "medium", tone = "neutral", checked = false, disabled = false, label = "", weight = "regular", interaction = "", name = "" } = {}) {
  const large = size === "large";
  const cls = [
    "radio",
    large && "radio--large",
    tone === "brand" && "radio--brand",
    RADIO_INTERACTIONS.includes(interaction) && `radio--${interaction}`,
  ].filter(Boolean).join(" ");
  const attrs = (!label && name ? ` aria-label="${escape(name)}"` : "") + (disabled ? " disabled" : "");
  // 점은 선택 안 됨에도 넣는다 — 색만 투명하고, 선택하면 채움과 함께 색으로 바뀐다
  const mark = `<button type="button" role="radio" aria-checked="${checked ? "true" : "false"}" class="${cls}"${attrs}><span class="radio-dot"></span></button>`;
  if (!label) return mark;
  const labelCls = weight === "bold" ? "radio-label radio-label--bold" : "radio-label";
  return `<label class="radio-row${large ? " radio-row--large" : ""}">${mark}<span class="${labelCls}">${escape(label)}</span></label>`;
}

// 톤 × 선택 여부 · 선택 여부 × 상태 · 크기 × 굵기 · 묶음 네 판을 흰 표면(.vignette-card) 위에 그린다 — 표는 Checkbox 갤러리의 .cb-* 를 쓴다.
// 오늘 제품에는 라벨만 있는 Radio 가 없다 — 라벨은 캘린더 일정의 반복 선택지를 빌렸다(radio-group.md Guidelines).
export function renderRadioGallery(brand) {
  const head = (first, cols) => `<div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">${escape(first)}</div>${
    cols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
  }</div>`;
  const row = (ko, en, cells) => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(ko)}<span>${escape(en)}</span></div>${
          cells.map(c => `<div class="cb-matrix-cell">${c}</div>`).join("")
        }</div>`;
  const panel = (title, sub, cols, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>
      <div class="cb-matrix" style="--cb-cols: ${cols};">
        ${body}
      </div>
    </div>`;

  // 1. 톤 × 선택 여부 — 동그라미 + 라벨
  const tones = [
    { ko: "짙은 회색", en: "neutral — 기본", tone: "neutral" },
    { ko: "브랜드", en: "brand", tone: "brand" },
  ];
  const checks = [
    { ko: "선택 안 됨", en: "unchecked", checked: false },
    { ko: "선택", en: "checked", checked: true },
  ];
  const tonePanel = panel(
    "톤 × 선택 여부",
    "선택 안 된 동그라미는 테두리(stroke-neutral-solid) · 투명 바탕이고 톤에 따라 달라지지 않는다. 선택하면 테두리 없이 원을 채우고 가운데에 점이 선다 — neutral 은 bg-neutral-inverted 채움 + fg-neutral-inverted 점, brand 는 bg-brand-solid 채움 + 흰 점(static-white). 한 묶음 안에서 톤을 섞지 않는다.",
    checks.length,
    head("톤", checks) + tones.map(t => row(t.ko, t.en,
      checks.map(c => radio({ tone: t.tone, checked: c.checked, label: "매월" })),
    )).join(""),
  );

  // 2. 선택 여부 × 상태 — 동그라미만. 호버 · 포커스 · 누름은 고정 클래스, 비활성은 disabled 속성
  const stateRows = [
    { ko: "선택 안 됨", en: "unchecked", tone: "neutral", checked: false },
    { ko: "짙은 회색 선택", en: "neutral · checked", tone: "neutral", checked: true },
    { ko: "브랜드 선택", en: "brand · checked", tone: "brand", checked: true },
  ];
  const states = [
    { ko: "기본", en: "enabled" },
    { ko: "호버", en: "hovered", interaction: "hover" },
    { ko: "포커스", en: "focused", interaction: "focus" },
    { ko: "누름", en: "pressed", interaction: "pressed" },
    { ko: "비활성", en: "disabled", disabled: true },
  ];
  const statePanel = panel(
    "선택 여부 × 상태",
    "호버 · 포커스 · 누름은 그 순간을 멈춰 그렸다. 호버는 누름 색, 누름은 누름 색 + 동그라미만 세로 2px 축소(라벨은 줄지 않는다), 포커스는 키보드에만 링 2px · 띄움 2px. 비활성은 전용 색이고 흐리게 하지 않는다 — 선택도 채운 원 그대로 색만 바뀐다.",
    states.length,
    head("선택 여부", states) + stateRows.map(r => row(r.ko, r.en,
      states.map(s => radio({ tone: r.tone, checked: r.checked, interaction: s.interaction, disabled: s.disabled, name: `${r.ko} — ${s.ko}` })),
    )).join(""),
  );

  // 3. 크기 × 굵기 — 동그라미 + 라벨
  const sizes = [
    { ko: "medium", en: "동그라미 20 · 점 8 · 라벨 14 · 줄 32 — 기본", size: "medium" },
    { ko: "large", en: "동그라미 24 · 점 10 · 라벨 16 · 줄 36", size: "large" },
  ];
  const sizeRows = [
    { ko: "선택 안 됨", en: "unchecked", args: {} },
    { ko: "선택", en: "checked · weight regular", args: { checked: true } },
    { ko: "선택 · 굵게", en: "checked · weight bold", args: { checked: true, weight: "bold" } },
    { ko: "비활성", en: "disabled", args: { disabled: true, label: "매년" } },
    { ko: "비활성 · 선택", en: "disabled · checked", args: { disabled: true, checked: true, label: "매년" } },
  ];
  const sizePanel = panel(
    "크기 × 굵기",
    "동그라미 · 점 · 라벨 · 줄 높이가 함께 정해진다. 동그라미와 라벨 사이 8, 라벨은 regular 400 — 강조는 bold 700. 라벨까지 눌리고, 누르는 영역은 44 까지 넓힌다.",
    sizes.length,
    head("선택 여부", sizes) + sizeRows.map(r => row(r.ko, r.en,
      sizes.map(s => radio({ label: "매월", ...r.args, size: s.size })),
    )).join(""),
  );

  // 4. 묶음 — 제목 아래 세로로 쌓고 처음 값(반복 없음)을 골라 둔다
  const repeats = ["반복 없음", "매일", "매주", "매월", "매년"];
  const groupPanel = `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">묶음</div>
        <div class="vignette-sub">묶음 위에 무엇을 고르는지 제목을 두고 선택지를 세로로 쌓는다 — 줄 사이 12(줄마다 누르는 영역 44 를 온전히 받는다), 가로로 늘어놓지 않는다. 골라 둘 수 있으면 처음부터 하나를 골라 둔다. 오류는 동그라미를 바꾸지 않고 묶음 아래 글로 알린다. 선택지는 캘린더 일정의 반복을 빌렸다 — 오늘 제품에는 라벨만 있는 Radio 가 없다.</div>
      </div>
      <div class="cb-group-legend" id="rd-group-repeat">반복</div>
      <div class="radio-group" role="radiogroup" aria-labelledby="rd-group-repeat">
        ${repeats.map((label, i) => radio({ label, checked: i === 0 })).join("\n        ")}
      </div>
    </div>`;

  const lede = "SEED Radio 구조 — 동그라미(Radiomark) · 동그라미 + 라벨(Radio) · 묶음(Radio Group). 선택은 테두리 없이 채운 원 + 가운데 점이다. 선택 색은 짙은 회색(neutral)이 기본이고 brand 는 서비스 핵심 흐름에서만. 비활성은 전용 색(흐리게 하지 않는다), 오류 동그라미는 없다 — 묶음 아래 글로 알린다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 brand 톤이 여기서는 중립으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03c — Radio</div>
      <h2 class="section-title">크기 2 · 톤 2 · 굵기 2 · 선택 여부 2</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${tonePanel}
    ${statePanel}
    ${sizePanel}
    ${groupPanel}
  </section>`;
}

// Switch — spec: specs/components/switch.md · 수치 switch.yaml. 구조는 SEED Switch(2026-09-30).
// 스위치 .switch(Switchmark — 트랙) · 스위치 + 라벨 .switch-row(Switch). 엄지는 .switch-thumb.
// 크기 클래스는 16 · 32 에만 단다(.switch--16 · .switch--32) — 기본 24 는 .switch 그대로다
const SWITCH_SIZE_CLASSES = ["16", "32"];
const SWITCH_INTERACTIONS = ["focus", "pressed"];

// label 이 있으면 스위치 + 라벨 한 줄(<label class="switch-row">), 없으면 스위치만 — 스위치만 쓰면 name 을 aria-label 로 달거나 줄의 <label> 로 감싼다.
//   size         "16" · "24"(기본) · "32" — 이름은 트랙 높이
//   tone         neutral(기본, 짙은 회색) · brand(서비스 핵심 흐름에서만)
//   checked      켬 · 끔 — false(기본) · true
//   disabled     전용 색(흐리게 하지 않는다) — 켜진 채 막히면 켜진 모양 그대로 색만 바뀐다
//   interaction  focus · pressed — 갤러리에서 그 순간을 고정해 보여 줄 때만(.radio--* 와 같은 역할). 호버 모양은 없다
export function sw({ size = "24", tone = "neutral", checked = false, disabled = false, label = "", interaction = "", name = "" } = {}) {
  const sized = SWITCH_SIZE_CLASSES.includes(String(size)) ? String(size) : "";
  const cls = [
    "switch",
    sized && `switch--${sized}`,
    tone === "brand" && "switch--brand",
    SWITCH_INTERACTIONS.includes(interaction) && `switch--${interaction}`,
  ].filter(Boolean).join(" ");
  const attrs = (!label && name ? ` aria-label="${escape(name)}"` : "") + (disabled ? " disabled" : "");
  // 엄지는 끔에도 넣는다 — 끄면 작아져 왼쪽에 있고, 켜면 오른쪽으로 가며 커진다
  const mark = `<button type="button" role="switch" aria-checked="${checked ? "true" : "false"}" class="${cls}"${attrs}><span class="switch-thumb"></span></button>`;
  if (!label) return mark;
  return `<label class="switch-row${sized ? ` switch-row--${sized}` : ""}">${mark}<span class="switch-label">${escape(label)}</span></label>`;
}

// 크기 × 켬 · 끔 · 톤 × 켬 · 끔 · 켬 · 끔 × 상태 · 설정 줄 네 판을 흰 표면(.vignette-card) 위에 그린다 — 표는 Checkbox 갤러리의 .cb-* 를 쓴다.
// 라벨은 제품에 있고 누르는 순간 적용되는 설정만 빌렸다 — 일정의 "종일", Desk 알림 설정의 줄(switch.md Guidelines).
export function renderSwitchGallery(brand) {
  const head = (first, cols) => `<div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">${escape(first)}</div>${
    cols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
  }</div>`;
  // 칸에 .sw-cell 을 더한다 — 줄 높이가 다른 크기(24 · 32)가 한 줄에서 같은 가운데에 서게(.sw-cell 의 주석)
  const row = (ko, en, cells) => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(ko)}<span>${escape(en)}</span></div>${
          cells.map(c => `<div class="cb-matrix-cell sw-cell">${c}</div>`).join("")
        }</div>`;
  const panel = (title, sub, cols, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>
      <div class="cb-matrix" style="--cb-cols: ${cols};">
        ${body}
      </div>
    </div>`;

  // 1. 크기 × 켬 · 끔 — 스위치 + 라벨. 막힌 줄은 라벨까지 비활성 색이다
  const sizes = [
    { ko: "16", en: "트랙 26 × 16 · 엄지 12 · 라벨 13 · 줄 24", size: "16" },
    { ko: "24", en: "트랙 38 × 24 · 엄지 20 · 라벨 14 · 줄 24 — 기본", size: "24" },
    { ko: "32", en: "트랙 52 × 32 · 엄지 26 · 라벨 16 · 줄 32", size: "32" },
  ];
  const sizeRows = [
    { ko: "끔", en: "unchecked", args: {} },
    { ko: "켬", en: "checked", args: { checked: true } },
    { ko: "비활성 · 끔", en: "disabled · unchecked", args: { disabled: true } },
    { ko: "비활성 · 켬", en: "disabled · checked", args: { disabled: true, checked: true } },
  ];
  const sizePanel = panel(
    "크기 × 켬 · 끔",
    "크기 이름은 트랙 높이다 — 트랙 · 엄지 · 라벨 · 줄 높이가 함께 정해지고, 스위치와 라벨 사이는 6 · 8 · 10 이다. 끄면 엄지가 0.8 로 작아지고 켜면 오른쪽으로 가며 제 크기가 된다. 라벨은 500 이고 라벨까지 눌린다 — 누르는 영역은 44 까지 넓힌다. 막으면 라벨도 비활성 색으로 바꾼다.",
    sizes.length,
    head("켬 · 끔", sizes) + sizeRows.map(r => row(r.ko, r.en,
      sizes.map(s => sw({ label: "푸시 알림", ...r.args, size: s.size })),
    )).join(""),
  );

  // 2. 톤 × 켬 · 끔 — 스위치 + 라벨
  const tones = [
    { ko: "짙은 회색", en: "neutral — 기본", tone: "neutral" },
    { ko: "브랜드", en: "brand", tone: "brand" },
  ];
  const checks = [
    { ko: "끔", en: "unchecked", checked: false },
    { ko: "켬", en: "checked", checked: true },
  ];
  const tonePanel = panel(
    "톤 × 켬 · 끔",
    "꺼진 트랙은 stroke-neutral-solid 이고 톤에 따라 달라지지 않는다. 켜면 neutral 은 bg-neutral-inverted 트랙, brand 는 bg-brand-solid 트랙이다. 엄지는 끔 · 켬이 같은 색이다 — neutral 은 fg-neutral-inverted, brand 는 흰색(static-white). neutral 이 기본이고 brand 는 서비스 핵심 흐름에서만 쓴다.",
    checks.length,
    head("톤", checks) + tones.map(t => row(t.ko, t.en,
      checks.map(c => sw({ tone: t.tone, checked: c.checked, label: "종일" })),
    )).join(""),
  );

  // 3. 켬 · 끔 × 상태 — 스위치만. 포커스 · 누름은 고정 클래스, 비활성은 disabled 속성. 호버 열은 없다(호버 모양이 없다)
  const stateRows = [
    { ko: "끔", en: "unchecked", tone: "neutral", checked: false },
    { ko: "짙은 회색 켬", en: "neutral · checked", tone: "neutral", checked: true },
    { ko: "브랜드 켬", en: "brand · checked", tone: "brand", checked: true },
  ];
  const states = [
    { ko: "기본", en: "enabled" },
    { ko: "포커스", en: "focused", interaction: "focus" },
    { ko: "누름", en: "pressed", interaction: "pressed" },
    { ko: "비활성", en: "disabled", disabled: true },
  ];
  const statePanel = panel(
    "켬 · 끔 × 상태",
    "포커스 · 누름은 그 순간을 멈춰 그렸다. 호버 모양은 없다 — 켜짐 색이 상태를 뜻해서 마우스를 올려도 색이 바뀌지 않는다. 누름도 색은 그대로이고 스위치만 세로 2px 축소한다(라벨은 줄지 않는다). 포커스는 키보드에만 링 2px · 띄움 2px. 비활성은 전용 색이고 흐리게 하지 않는다 — 꺼진 채 막히면 bg-disabled 트랙 + 안쪽 선(stroke-neutral-weak) + fg-disabled 엄지, 켜진 채 막히면 켜진 모양 그대로 fg-disabled 트랙 + bg-disabled 엄지다.",
    states.length,
    head("켬 · 끔", states) + stateRows.map(r => row(r.ko, r.en,
      states.map(s => sw({ tone: r.tone, checked: r.checked, interaction: s.interaction, disabled: s.disabled, name: `${r.ko} — ${s.ko}` })),
    )).join(""),
  );

  // 4. 설정 줄 — 스위치만(Switchmark). 줄 전체가 <label> 이라 어디를 눌러도 스위치에 닿고, 줄의 글자가 스위치의 이름이 된다.
  //    줄 자체(제목 · 설명 · 간격 · 누름 피드백)는 List 가 정한다(다음 차례) — 여기 줄은 누르는 영역만 보이려고 인라인으로 짰다(switch.md 의 "스위치만" 코드와 같은 간격)
  const settings = [
    { title: "결제 알림", desc: "결제 예정일 D-1, 결제일 당일 알림", checked: true },
    { title: "예산 알림", desc: "카테고리 예산 80%·100% 도달", checked: true },
    { title: "주간 리포트", desc: "매주 월요일 오전 9시", checked: false },
  ];
  const lineStyle = "1px solid var(--color-border-default)";
  const rowStyle = "display: flex; align-items: center; gap: var(--spacing-x3); padding: var(--spacing-x3) var(--spacing-x6); cursor: pointer;";
  const titleStyle = "display: block; font-size: var(--text-t4); line-height: var(--text-t4--line-height); font-weight: 500; color: var(--color-text-primary);";
  const descStyle = "display: block; font-size: var(--text-t2); line-height: var(--text-t2--line-height); color: var(--color-text-secondary);";
  const settingsPanel = `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">설정 줄(스위치만)</div>
        <div class="vignette-sub">${escape("설정 줄에는 스위치만(Switchmark) 끼우고 줄을 <label> 로 감싼다 — 줄 어디를 눌러도 바뀌고, 줄의 글자가 스위치의 이름이 된다. 줄 자체(제목 · 설명 · 간격 · 누름 피드백)는 다음 차례인 List 가 정한다 — 여기 줄은 누르는 영역만 보이려고 임시로 짰다. 줄은 Desk 알림 설정에서 빌렸다.")}</div>
      </div>
      <div style="max-width: 420px; border: ${lineStyle}; border-radius: var(--radius-md);">
        ${settings.map((s, i) => `<label style="${rowStyle}${i > 0 ? ` border-top: ${lineStyle};` : ""}">
          <span style="flex: 1; min-width: 0;"><span style="${titleStyle}">${escape(s.title)}</span><span style="${descStyle}">${escape(s.desc)}</span></span>
          ${sw({ checked: s.checked })}
        </label>`).join("\n        ")}
      </div>
    </div>`;

  const lede = "SEED Switch 구조 — 스위치(Switchmark) · 스위치 + 라벨(Switch). 끄면 엄지가 작아진다 — 색 말고도 자리 · 크기로 켬 · 끔이 갈린다. 켜짐 색은 짙은 회색(neutral)이 기본이고 brand 는 서비스 핵심 흐름에서만. 비활성은 전용 색(흐리게 하지 않는다). 누르는 순간 적용되는 설정에만 쓴다 — 저장해야 적용되면 Checkbox 다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 brand 톤이 여기서는 중립으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03d — Switch</div>
      <h2 class="section-title">크기 3 · 톤 2 · 켬 · 끔</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${sizePanel}
    ${tonePanel}
    ${statePanel}
    ${settingsPanel}
  </section>`;
}

// List — spec: specs/components/list.md · 수치 list.yaml · list-header.yaml. 구조는 SEED List(2026-10-01).
// 목록 .plst(List · ListRadioGroup · ListCheckGroup) · 한 줄 .plst-row(List Item) · 목록 제목 .plst-header(ListHeader) · 줄 사이 선 .plst-divider(ListDivider) · 앞 타일 .plst-tile(ListTile).
// 목록(ul) 안의 줄 · 선은 li, 묶음(radiogroup · fieldset) 안의 줄 · 선은 div 다(list.tsx 의 ListRowTag).
// 줄의 짜임은 list.tsx 와 같다 — .plst-row(바탕 층 ::before) > .plst-content(콘텐츠 층) > .plst-prefix · .plst-body(.plst-title · .plst-detail) · .plst-suffix.
// 누르는 줄 · 링크 줄은 본문이 button · a(.plst-action), 컨트롤 줄은 콘텐츠 층이 label(.plst-control) — 모두 [data-list-action] 을 달고(컨트롤 줄은 끼운 컨트롤도),
// 막히면 [data-disabled] 를 단다.
const LIST_INTERACTIONS = ["hover", "focus", "pressed"];
const listSvg = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
// 아이콘은 lucide 그림(선 2)이다 — 크기는 놓인 자리가 정한다(앞 22 · 타일 안 20 · 뒤 18)
const LIST_ICON = {
  user: listSvg('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
  globe: listSvg('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
  bell: listSvg('<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>'),
  lock: listSvg('<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
  moon: listSvg('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'),
  book: listSvg('<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>'),
  shield: listSvg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>'),
  wallet: listSvg('<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>'),
  calendar: listSvg('<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>'),
  card: listSvg('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>'),
  receipt: listSvg('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>'),
  utensils: listSvg('<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>'),
  bus: listSvg('<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>'),
  bag: listSvg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'),
  more: listSvg('<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'),
  moreVertical: listSvg('<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>'),
  chevron: listSvg('<path d="m9 18 6-6-6-6"/>'),
};

// 한 줄(List Item) — 글(title · detail)은 여기서 escape 하고, prefix · suffix 는 HTML 조각(아이콘 · 타일 · 값 글자 · 컨트롤 · 작은 버튼)으로 받는다.
//   kind         item(보기만 하는 줄 — 기본) · button(누르는 줄) · link(링크 줄) · control(컨트롤 줄 — 끼운 컨트롤은 prefix · suffix 로 넘긴다)
//   align        center(기본) · top
//   highlighted  강조 — 옅은 브랜드 바탕(강조 축)
//   disabled     누르는 줄 · 컨트롤 줄만(list.tsx 의 ListItem · ListLinkItem 에는 disabled 가 없다). 컨트롤 줄은 끼운 컨트롤도 막아서 넘긴다
//   interaction  hover · focus · pressed — 갤러리에서 그 순간을 고정해 보여 줄 때만(.btn-state-* 와 같은 역할).
//                컨트롤 줄의 포커스는 끼운 컨트롤이 받으니 그 컨트롤의 고정 클래스(.switch--focus …)로 그린다
//   as           li(기본) · div(묶음 안의 줄 — ListRadioGroup · ListCheckGroup 안)
export function listRow({ kind = "item", title, detail = "", prefix = "", suffix = "", align = "center", highlighted = false, disabled = false, interaction = "", as = "li" } = {}) {
  const rowCls = ["plst-row", highlighted && "plst-row--hl", LIST_INTERACTIONS.includes(interaction) && `plst-row--${interaction}`].filter(Boolean).join(" ");
  const contentCls = ["plst-content", align === "top" && "plst-content--top", kind === "control" && "plst-control"].filter(Boolean).join(" ");
  const off = disabled && (kind === "button" || kind === "control");
  const body = `<span class="plst-title">${escape(title)}</span>${detail ? `<span class="plst-detail">${escape(detail)}</span>` : ""}`;
  const pre = prefix ? `<span class="plst-prefix">${prefix}</span>` : "";
  const suf = suffix ? `<span class="plst-suffix">${suffix}</span>` : "";
  let inner;
  if (kind === "button") inner = `<div class="${contentCls}">${pre}<button type="button" class="plst-body plst-action" data-list-action=""${off ? ' disabled data-disabled=""' : ""}>${body}</button>${suf}</div>`;
  // 링크는 미리보기라 옮기지 않는다 — 섹션 끝 스크립트가 누름을 막는다
  else if (kind === "link") inner = `<div class="${contentCls}">${pre}<a href="#" class="plst-body plst-action" data-list-action="">${body}</a>${suf}</div>`;
  else if (kind === "control") inner = `<label class="${contentCls}" data-list-action=""${off ? ' data-disabled=""' : ""}>${pre}<span class="plst-body">${body}</span>${suf}</label>`;
  else inner = `<div class="${contentCls}">${pre}<span class="plst-body">${body}</span>${suf}</div>`;
  return `<${as} class="${rowCls}">${inner}</${as}>`;
}

// 목록 제목(ListHeader) — 글은 span 에 담아 목록의 aria-labelledby 가 오른쪽 버튼 글까지 이름으로 읽지 않게 한다
export function listHeader({ text, variant = "mediumWeak", id = "", action = "" } = {}) {
  return `<div class="plst-header${variant === "boldSolid" ? " plst-header--bold-solid" : ""}"><span${id ? ` id="${id}"` : ""}>${escape(text)}</span>${action}</div>`;
}

// 앞 · 뒤 · 목록 · 선 · 그림 틀
const listTile = (color, icon) => `<span class="plst-tile plst-tile--${color}">${LIST_ICON[icon]}</span>`;
const listChevron = (value = "") => `${value ? escape(value) : ""}${LIST_ICON.chevron}`;
const listOf = (rows, attrs = "") => `<ul class="plst"${attrs}>${rows.join("")}</ul>`;
// 묶음 — 하나 고르기(ListRadioGroup · role=radiogroup) · 여럿 고르기(ListCheckGroup · fieldset). 이름(aria-label · aria-labelledby)을 꼭 달고, 안의 줄은 as: "div" 로 그린다
const radioGroup = (rows, attrs) => `<div class="plst" role="radiogroup"${attrs}>${rows.join("")}</div>`;
const checkGroup = (rows, attrs) => `<fieldset class="plst"${attrs}>${rows.join("")}</fieldset>`;
const listDivider = (inset = false, as = "li") => `<${as} class="plst-divider${inset ? " plst-divider--inset" : ""}" aria-hidden="true"></${as}>`;
// 줄은 실제 화면처럼 흰 바탕(bg-layer-default)의 틀 안에 둔다 — 틀은 갤러리 것이고 List 의 일부가 아니다
const listFrame = (cap, en, body) => `
        <div class="plst-sample">
          <div class="plst-cap">${escape(cap)}<span>${escape(en)}</span></div>
          <div class="plst-frame">${body}</div>
        </div>`;

// 줄 종류 · 앞 · 뒤 · 설명과 맞춤 · 강조 · 상태 · 직접 눌러 보기 · 목록 제목 · 줄 사이 선 아홉 판을 흰 표면(.vignette-card) 위에 그린다 — 상태 표는 Checkbox 갤러리의 .cb-* 를 쓴다.
// 글은 Desk 설정 · 가계부 · 알림에서 빌렸다(list.md 코드 예와 같은 줄). 끼운 컨트롤은 Switch · Checkbox · Radio 갤러리의 sw() · cbox() · radio() 그대로다.
export function renderListGallery(brand) {
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  const frames = (items) => `
      <div class="plst-frames">${items.join("")}
      </div>`;
  const icon = (name) => LIST_ICON[name];
  // 끼운 컨트롤도 줄의 누르는 것이다(data-list-action, list.tsx 와 같다) — 키보드(Space)로 누르면 :active 가 라벨이 아니라 컨트롤에 걸린다.
  // 막힌 컨트롤에는 data-disabled 도 단다(Radix 가 그리는 것과 같다) — 막힌 컨트롤에 올려도 줄의 호버 바탕이 생기지 않게
  const asRowAction = (html, disabled) => html.replace("<button ", `<button data-list-action=""${disabled ? ' data-disabled=""' : ""} `);
  const switch32 = (args = {}) => asRowAction(sw({ size: "32", ...args }), args.disabled);
  const check24 = (args = {}) => asRowAction(cbox({ size: "large", ...args }), args.disabled);
  const radio24 = (args = {}) => asRowAction(radio({ size: "large", ...args }), args.disabled);
  // 가계부 금액은 그 화면이 정한 자리다(list.md Suffix — 16 · 700) — List 의 값 글자가 아니다
  const amount = (v) => `<span class="plst-amount">${escape(v)}</span>`;
  // 작은 버튼 — Button 갤러리의 xsmall 32. 글자는 neutralWeak, 아이콘만은 ghost · neutralSubtle 에 이름(aria-label)을 단다 — 네이티브 title 은 쓰지 않는다(tooltip.md)
  const smallButton = (label) => `<button class="btn btn-neutral-weak btn-size-xsmall" type="button"><span>${escape(label)}</span></button>`;
  const iconButton = (name, label) => `<button class="btn btn-ghost btn-ghost-subtle btn-icon-only btn-size-xsmall" type="button" aria-label="${escape(label)}">${icon(name)}</button>`;

  // 1. 줄의 종류 넷
  const kindsPanel = panel(
    "줄의 종류 넷",
    "같은 모양이 하는 일에 따라 넷으로 나뉜다. 보기만 하는 줄은 누르지 않아 호버 · 누름 바탕이 생기지 않는다. 누르는 줄 · 링크 줄은 본문의 버튼 · 링크가 줄 전체를 덮어 줄 어디를 눌러도 눌리고, 컨트롤 줄은 줄 전체가 라벨이라 줄 어디를 눌러도 끼운 스위치가 눌린다. 모두 실제로 올리고 눌러 볼 수 있다 — 값은 바뀌지 않는다(정적 미리보기).",
    frames([
      listFrame("보기만 하는 줄", "ListItem", listOf([
        listRow({ title: "가입일", suffix: escape("2026년 3월 2일") }),
        listRow({ title: "이메일", suffix: escape("porest@example.com") }),
      ])),
      listFrame("누르는 줄", "ListButtonItem", listOf([
        listRow({ kind: "button", prefix: icon("user"), title: "계정", suffix: listChevron() }),
        listRow({ kind: "button", prefix: icon("globe"), title: "기본 통화", suffix: listChevron("대한민국 원") }),
      ])),
      listFrame("링크 줄", "ListLinkItem", listOf([
        listRow({ kind: "link", prefix: icon("book"), title: "설명서", suffix: listChevron() }),
        listRow({ kind: "link", prefix: icon("shield"), title: "개인정보 처리방침", suffix: listChevron() }),
      ])),
      listFrame("컨트롤 줄", "ListSwitchItem", listOf([
        listRow({ kind: "control", prefix: icon("bell"), title: "결제 알림", detail: "결제 예정일 D-1, 결제일 당일 알림", suffix: switch32({ checked: true }) }),
        listRow({ kind: "control", prefix: icon("wallet"), title: "예산 알림", detail: "카테고리 예산 80%·100% 도달", suffix: switch32() }),
      ])),
    ]),
  );

  // 2. 앞 붙이개 — 아이콘 22 · 타일 40 · 체크 24
  const prefixPanel = panel(
    "앞 붙이개 — 아이콘 22 · 타일 40 · 체크 24",
    "앞 붙이개는 줄이 무엇인지 먼저 알리고 본문과 12 떨어진다. 설정 · 메뉴 줄은 아이콘 22(fg-neutral), 색이 뜻을 가진 내용 줄은 타일 40 — 모서리 12, 카테고리 색의 옅은 바탕(chart-{색}-weak) 위에 그 색의 아이콘 20. 여럿 고르기는 체크 24 를 앞에 둔다. 한 목록 안에서 섞지 않는다. 오른쪽 금액(16 · 700)은 가계부 화면이 정한 자리다.",
    frames([
      listFrame("아이콘 22 · 설정 줄", "prefix icon", listOf([
        listRow({ kind: "button", prefix: icon("user"), title: "계정", suffix: listChevron() }),
        listRow({ kind: "button", prefix: icon("lock"), title: "보안", suffix: listChevron() }),
        listRow({ kind: "button", prefix: icon("bell"), title: "알림", suffix: listChevron() }),
      ])),
      listFrame("타일 40 · 내용 줄", "ListTile — chart-{색}-weak · chart-{색}", listOf([
        listRow({ prefix: listTile("orange", "utensils"), title: "점심", detail: "식비 · 신한카드", suffix: amount("12,000원") }),
        listRow({ prefix: listTile("blue", "bus"), title: "버스", detail: "교통 · 체크카드", suffix: amount("1,500원") }),
        listRow({ prefix: listTile("violet", "bag"), title: "생활용품", detail: "쇼핑 · 현금", suffix: amount("23,400원") }),
      ])),
      listFrame("체크 24 · 여럿 고르기", "ListCheckGroup(fieldset) · ListCheckItem — 앞(기본)", checkGroup([
        listRow({ kind: "control", as: "div", prefix: check24({ state: "checked" }), title: "거래 내역" }),
        listRow({ kind: "control", as: "div", prefix: check24({ state: "checked" }), title: "예산" }),
        listRow({ kind: "control", as: "div", prefix: check24(), title: "메모" }),
      ], ' aria-label="내보낼 항목"')),
    ]),
  );

  // 3. 뒤 붙이개 — 값 글자 · 화살표 · 작은 버튼 · 스위치 32 · 체크 24 · 라디오 24
  const currencies = [["대한민국 원", "KRW"], ["미국 달러", "USD"], ["일본 엔", "JPY"], ["유로", "EUR"]];
  const suffixPanel = panel(
    "뒤 붙이개 — 값 글자 · 화살표 · 작은 버튼 · 스위치 · 체크 · 라디오",
    "값 글자는 16 · fg-neutral-subtle, 오른쪽 화살표는 18 · fg-neutral-subtle 이고 화면을 옮기는 줄에만 단다. 작은 버튼은 줄 위에 올라 따로 눌린다 — 버튼을 눌러도 줄은 눌리지 않는다. 스위치는 제목 16 줄이라 32, 체크 · 라디오는 24 이고 줄을 눌러도 따로 줄지 않는다. 하나 고르기는 라디오를 뒤에 두고 두 줄 이상이어야 한다.",
    frames([
      listFrame("값 글자 · 화살표", "suffix text · chevron 18", listOf([
        listRow({ kind: "button", prefix: icon("globe"), title: "기본 통화", suffix: listChevron("대한민국 원") }),
        listRow({ kind: "button", prefix: icon("moon"), title: "테마", suffix: listChevron("시스템") }),
        listRow({ kind: "button", prefix: icon("user"), title: "계정", suffix: listChevron() }),
      ])),
      listFrame("작은 버튼 — 따로 눌린다", "suffix button", listOf([
        listRow({ kind: "button", prefix: listTile("indigo", "card"), title: "신한카드", detail: "이번 달 452,300원", suffix: smallButton("결제") + listChevron() }),
        listRow({ prefix: listTile("gray", "receipt"), title: "월세", detail: "매월 25일 반복 이체", suffix: iconButton("moreVertical", "월세 더보기") }),
      ])),
      listFrame("스위치 32", "ListSwitchItem", listOf([
        listRow({ kind: "control", prefix: icon("bell"), title: "결제 알림", detail: "결제 예정일 D-1, 결제일 당일 알림", suffix: switch32({ checked: true }) }),
        listRow({ kind: "control", prefix: icon("wallet"), title: "예산 알림", detail: "카테고리 예산 80%·100% 도달", suffix: switch32({ checked: true }) }),
        listRow({ kind: "control", prefix: icon("calendar"), title: "주간 리포트", detail: "매주 월요일 오전 9시", suffix: switch32() }),
      ])),
      listFrame("체크 24 · 뒤", "ListCheckGroup(fieldset) · ListCheckItem markPosition=suffix", checkGroup([
        listRow({ kind: "control", as: "div", prefix: listTile("indigo", "card"), title: "신한카드", suffix: check24({ state: "checked" }) }),
        listRow({ kind: "control", as: "div", prefix: listTile("blue", "card"), title: "현대카드", suffix: check24({ state: "checked" }) }),
        listRow({ kind: "control", as: "div", prefix: listTile("gray", "card"), title: "삼성카드", suffix: check24() }),
      ], ' aria-label="결제 알림을 받을 카드"')),
      listFrame("라디오 24 · 하나 고르기", "ListRadioGroup · ListRadioItem", radioGroup(
        currencies.map(([title, code], i) => listRow({ kind: "control", as: "div", title, detail: code, suffix: radio24({ checked: i === 0 }) })),
        ' aria-label="기본 통화"',
      )),
    ]),
  );

  // 4. 설명 · 맞춤
  const detailPanel = panel(
    "설명 · 맞춤",
    "설명은 제목 아래 2 떨어져 13 · fg-neutral-subtle 로 쓰고, 제목만으로 알 수 있으면 두지 않는다. 길어지면 두 줄까지 — 그 이상이거나 제목이 두 줄을 넘으면 맞춤을 위(top)로 바꿔 앞 · 뒤를 위에 맞춘다. 한 목록 안에서는 줄마다 맞춤을 섞지 않는다.",
    frames([
      listFrame("가운데 맞춤 — 설명 없음 · 한 줄 · 두 줄", "align center(기본)", listOf([
        listRow({ kind: "control", prefix: icon("bell"), title: "푸시 알림", suffix: switch32({ checked: true }) }),
        listRow({ kind: "control", prefix: icon("wallet"), title: "예산 알림", detail: "카테고리 예산 80%·100% 도달", suffix: switch32({ checked: true }) }),
        listRow({ kind: "control", prefix: icon("calendar"), title: "주간 리포트", detail: "매주 월요일 오전 9시에 지난주 지출과 예산 사용을 정리해 보내요", suffix: switch32() }),
      ])),
      listFrame("위 맞춤 — 제목이 두 줄을 넘거나 설명이 길 때", "align top", listOf([
        listRow({ kind: "control", align: "top", prefix: icon("card"), title: "카드 결제일 하루 전과 당일 아침에 결제 금액을 알림으로 받기", detail: "결제 예정 금액은 알림을 보내는 날까지 쓴 금액이에요", suffix: switch32({ checked: true }) }),
        listRow({ kind: "control", align: "top", prefix: icon("wallet"), title: "예산 미리 알림", detail: "카테고리 예산의 80%와 100%에 닿으면 알려요. 예산을 정하지 않은 카테고리는 알리지 않고, 달이 바뀌면 다시 0%부터 세요", suffix: switch32() }),
      ])),
    ]),
  );

  // 5. 강조 — 안 읽은 알림 둘 · 읽은 알림 하나. 안 읽음은 목록 제목의 글로도 알린다(WCAG 1.4.1)
  const highlightPanel = panel(
    "강조",
    "새 알림처럼 주목이 필요한 줄은 바탕만 옅은 브랜드 색(bg-brand-weak)으로 바꾼다 — 점 · 왼쪽 막대는 두지 않는다. 올리거나 누르면 바탕이 bg-brand-weak-pressed 로 짙어지고 그동안만 설명 · 값 글자가 fg-neutral-muted 로 짙어진다(fg-neutral-subtle 은 그 바탕 위 4.32:1 로 모자란다). 제목 · 화살표는 그대로다. 안 읽음은 바탕 색만으로 알리지 않는다 — 여기서는 목록 제목이 글로 알린다."
      + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 강조 바탕이 여기서는 중립(bg-neutral-weak · bg-neutral-weak-pressed)으로 보인다." : ""),
    frames([
      listFrame("알림", "highlighted — 안 읽은 줄 둘 · 읽은 줄 하나", [
        listHeader({ text: "새 알림 2", id: "plst-h-unread" }),
        listOf([
          listRow({ kind: "button", highlighted: true, prefix: listTile("orange", "wallet"), title: "예산 80% 도달", detail: "식비 예산의 80%를 썼어요", suffix: listChevron("10분 전") }),
          listRow({ kind: "button", highlighted: true, prefix: listTile("indigo", "card"), title: "내일 카드 결제일", detail: "신한카드 452,300원이 결제돼요", suffix: listChevron("1시간 전") }),
        ], ' aria-labelledby="plst-h-unread"'),
        listHeader({ text: "읽은 알림", id: "plst-h-read" }),
        listOf([
          listRow({ kind: "button", prefix: listTile("gray", "receipt"), title: "지난주 리포트", detail: "지출 312,000원 · 예산의 64%", suffix: listChevron("어제") }),
        ], ' aria-labelledby="plst-h-read"'),
      ].join("")),
    ]),
  );

  // 6. 줄 종류 × 상태 — 그 순간을 멈춰 그린다. 누름 칸의 배율 기준은 섹션 끝 스크립트가 잰다
  const stateCols = [
    { ko: "누르는 줄", en: "ListButtonItem — 아이콘 · 값 · 화살표" },
    { ko: "강조 줄", en: "highlighted — 타일 · 설명 · 값 · 화살표" },
    { ko: "컨트롤 줄", en: "ListSwitchItem — 아이콘 · 설명 · 스위치 32" },
  ];
  const states = [
    { ko: "기본", en: "enabled" },
    { ko: "호버", en: "hovered", interaction: "hover" },
    { ko: "포커스", en: "focused", interaction: "focus" },
    { ko: "누름", en: "pressed", interaction: "pressed" },
    { ko: "비활성", en: "disabled", disabled: true },
  ];
  const stateCell = (col, s) => {
    const one = (args) => `<div class="plst-frame">${listOf([listRow({ interaction: s.interaction, disabled: s.disabled, ...args })])}</div>`;
    if (col === 0) return one({ kind: "button", prefix: icon("globe"), title: "기본 통화", suffix: listChevron("대한민국 원") });
    if (col === 1) return one({ kind: "button", highlighted: true, prefix: listTile("orange", "wallet"), title: "예산 80% 도달", detail: "식비 예산의 80%를 썼어요", suffix: listChevron("10분 전") });
    // 컨트롤 줄의 포커스는 스위치가 받는다 — 줄은 그대로, 스위치에 링
    return `<div class="plst-frame">${listOf([listRow({
      kind: "control", interaction: s.interaction === "focus" ? "" : s.interaction, disabled: s.disabled,
      prefix: icon("bell"), title: "결제 알림", detail: "결제 예정일 D-1, 결제일 당일 알림",
      suffix: switch32({ checked: true, disabled: s.disabled, interaction: s.interaction === "focus" ? "focus" : "" }),
    })])}</div>`;
  };
  const stateHead = `<div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">상태</div>${
    stateCols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
  }</div>`;
  const statePanel = panel(
    "줄 종류 × 상태",
    "호버 · 포커스 · 누름은 그 순간을 멈춰 그렸다. 호버는 누름과 같은 바탕 — 좌우 6 들어온 bg-layer-default-pressed, 모서리 10(강조 줄은 bg-brand-weak-pressed). 누름은 그 바탕에 콘텐츠 층만 2px 거리 축소다 — 기준이 max(높이, 폭 ÷ 4, 24) 라 줄은 세로로 1px 남짓 준다. 끼운 스위치는 따로 줄지 않는다. 포커스는 키보드에만 — 누르는 줄은 줄 안쪽 링 2px, 컨트롤 줄은 스위치의 링이다. 비활성은 전용 색(fg-disabled · 타일 bg-disabled)이고 흐리게 하지 않는다.",
    `
      <div class="cb-matrix plst-matrix" style="--cb-cols: ${stateCols.length};">
        ${stateHead}${states.map(s => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(s.ko)}<span>${escape(s.en)}</span></div>${
          stateCols.map((c, i) => `<div class="cb-matrix-cell plst-cell">${stateCell(i, s)}</div>`).join("")
        }</div>`).join("")}
      </div>`,
  );

  // 7. 직접 눌러 보기 — 종류 · 강조 · 막힘을 한 화면에 섞었다
  const livePanel = panel(
    "직접 눌러 보기",
    "마우스를 올리고 눌러 보고, Tab 으로 옮겨 Space 로 눌러 본다. 보기만 하는 줄과 막힌 줄은 바탕이 바뀌지 않고, 막힌 줄은 커서가 not-allowed 다. Tab 은 보기만 하는 줄 · 막힌 줄을 건너뛰고, 컨트롤 줄에서는 끼운 컨트롤이 포커스를 받는다. 모션 줄이기면 콘텐츠는 줄지 않고 바탕만 바뀐다. 값은 바뀌지 않는다(정적 미리보기).",
    frames([
      listFrame("설정", "누르는 줄 · 링크 줄 · 보기만 하는 줄 · 막힌 줄", [
        listHeader({ text: "일반", id: "plst-h-live-general" }),
        listOf([
          listRow({ kind: "button", prefix: icon("user"), title: "계정", suffix: listChevron() }),
          listRow({ kind: "button", prefix: icon("globe"), title: "기본 통화", suffix: listChevron("대한민국 원") }),
          listRow({ kind: "link", prefix: icon("book"), title: "설명서", suffix: listChevron() }),
          listRow({ prefix: icon("calendar"), title: "가입일", suffix: escape("2026년 3월 2일") }),
          listRow({ kind: "button", disabled: true, prefix: icon("lock"), title: "로그인 기록", detail: "준비 중이에요" }),
        ], ' aria-labelledby="plst-h-live-general"'),
        listHeader({ text: "알림", id: "plst-h-live-alert" }),
        listOf([
          listRow({ kind: "control", prefix: icon("bell"), title: "결제 알림", detail: "결제 예정일 D-1, 결제일 당일 알림", suffix: switch32({ checked: true }) }),
          listRow({ kind: "control", disabled: true, prefix: icon("calendar"), title: "주간 리포트", detail: "푸시 알림이 꺼져 있어요", suffix: switch32({ disabled: true }) }),
        ], ' aria-labelledby="plst-h-live-alert"'),
      ].join("")),
      listFrame("고르기 · 강조", "라디오 · 체크 · 강조 줄", [
        listHeader({ text: "기본 통화", id: "plst-h-live-currency" }),
        radioGroup(
          currencies.slice(0, 3).map(([title, code], i) => listRow({ kind: "control", as: "div", title, detail: code, suffix: radio24({ checked: i === 0 }) })),
          ' aria-labelledby="plst-h-live-currency"',
        ),
        listHeader({ text: "내보낼 항목", id: "plst-h-live-export" }),
        checkGroup([
          listRow({ kind: "control", as: "div", prefix: check24({ state: "checked" }), title: "거래 내역" }),
          listRow({ kind: "control", as: "div", prefix: check24(), title: "예산" }),
        ], ' aria-labelledby="plst-h-live-export"'),
        listHeader({ text: "새 알림 1", id: "plst-h-live-unread" }),
        listOf([
          listRow({ kind: "button", highlighted: true, prefix: listTile("orange", "wallet"), title: "예산 80% 도달", detail: "식비 예산의 80%를 썼어요", suffix: listChevron("10분 전") }),
        ], ' aria-labelledby="plst-h-live-unread"'),
      ].join("")),
    ]),
  );

  // 8. 목록 제목(List Header)
  const headerPanel = panel(
    "목록 제목(List Header) — mediumWeak · boldSolid",
    "목록 밖, 바로 위에 둔다. mediumWeak(기본)는 14 · 500 · fg-neutral-subtle 로 줄보다 앞서지 않고, boldSolid 는 14 · 700 · fg-neutral 로 화면을 크게 나누는 묶음에만 쓴다. 위아래 8 · 좌우 24 — 줄과 같은 24 라 제목과 줄의 왼쪽이 맞는다. 오른쪽에 작은 버튼(도움말 · 전체 보기)을 둘 수 있고 제목과 10 떨어진다. 목록은 aria-labelledby 로 제목을 이름으로 단다.",
    frames([
      listFrame("mediumWeak", "기본 — 14 · 500 · fg-neutral-subtle", [
        listHeader({ text: "일반", id: "plst-h-medium-general" }),
        listOf([
          listRow({ kind: "button", prefix: icon("user"), title: "계정", suffix: listChevron() }),
          listRow({ kind: "button", prefix: icon("globe"), title: "기본 통화", suffix: listChevron("대한민국 원") }),
        ], ' aria-labelledby="plst-h-medium-general"'),
        listHeader({ text: "알림", id: "plst-h-medium-alert" }),
        listOf([
          listRow({ kind: "button", prefix: icon("bell"), title: "알림 설정", suffix: listChevron() }),
        ], ' aria-labelledby="plst-h-medium-alert"'),
      ].join("")),
      listFrame("boldSolid · 오른쪽 작은 버튼", "14 · 700 · fg-neutral — ghost · neutralSubtle · xsmall", [
        listHeader({ text: "카테고리별 예산", variant: "boldSolid", id: "plst-h-bold-budget", action: `<button class="btn btn-ghost btn-ghost-subtle btn-size-xsmall" type="button"><span>전체 보기</span></button>` }),
        listOf([
          listRow({ kind: "button", prefix: listTile("orange", "utensils"), title: "식비", detail: "40만 원 중 32만 원", suffix: listChevron("80%") }),
          listRow({ kind: "button", prefix: listTile("blue", "bus"), title: "교통", detail: "10만 원 중 4만 원", suffix: listChevron("40%") }),
        ], ' aria-labelledby="plst-h-bold-budget"'),
      ].join("")),
    ]),
  );

  // 9. 줄 사이 선(ListDivider) — 없음 · 줄 폭 · 들임
  const dividerRows = (divider) => {
    const rows = [
      listRow({ kind: "button", prefix: icon("user"), title: "계정", suffix: listChevron() }),
      listRow({ kind: "button", prefix: icon("lock"), title: "보안", suffix: listChevron() }),
      listRow({ kind: "button", prefix: icon("bell"), title: "알림", suffix: listChevron() }),
    ];
    return listOf(divider === null ? rows : rows.flatMap((r, i) => (i ? [listDivider(divider), r] : [r])));
  };
  const dividerPanel = panel(
    "줄 사이 선(ListDivider) — 없음 · 줄 폭 · 들임",
    "기본은 선 없음 — 줄의 위아래 여백이 줄을 가른다. 촘촘한 목록 · 설명 없는 긴 목록처럼 구분이 필요할 때만 1px stroke-neutral-subtle 을 넣는다. 줄 폭 전체가 기본이고, 앞 붙이개가 있는 목록은 좌우 24 들일 수 있다. 선은 aria-hidden 이라 줄 수에 들지 않는다.",
    frames([
      listFrame("없음", "기본", dividerRows(null)),
      listFrame("줄 폭", "ListDivider", dividerRows(false)),
      listFrame("들임", "ListDivider inset — 좌우 24", dividerRows(true)),
    ]),
  );

  const lede = "SEED List 구조 — 목록(List) · 한 줄(List Item) · 목록 제목(List Header) · 줄 사이 선(ListDivider). 한 줄은 바탕 층과 콘텐츠 층 둘이다 — 올리거나 누르면 바탕이 좌우 6 들어와 모서리 10 으로 둥글어지고, 누르면 콘텐츠 층만 2px 거리로 준다. 제목 16 · 400, 설명 13, 위아래 12 · 좌우 24. 하나 고르기 목록(옛 RadioList)은 라디오 줄로 그린다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 강조 바탕이 여기서는 중립으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  // 누름 배율의 기준 = max(높이, 폭 ÷ 4, 24) — 줄 폭이 화면마다 달라 누르는 순간(포인터 · 키) 줄에서 재서 --press-basis 로 넘긴다(list.tsx 의 measurePress).
  // 누르는 동안 콘텐츠 층(누르는 영역)이 줄어 가장자리를 누른 포인터가 영역 밖에 남아도 click 이 그 줄로 가게, 마우스 · 펜으로 누르면
  // 누른 요소에 포인터를 잡아 둔다(list.tsx 의 withPress — 터치는 브라우저가 처음 누른 요소에 이미 잡는다).
  // 그 순간을 멈춘 누름 칸(.plst-row--pressed)은 누르지 않으니 그릴 때와 크기가 바뀔 때 잰다. 링크 줄은 미리보기라 옮기지 않는다.
  const script = `
    <script>
      (function () {
        var section = document.currentScript.closest("section");
        function measure(row) { row.style.setProperty("--press-basis", String(Math.max(row.offsetHeight, row.offsetWidth / 4, 24))); }
        function rowOf(e) {
          var row = e.target && e.target.closest ? e.target.closest(".plst-row") : null;
          return row && section.contains(row) ? row : null;
        }
        section.addEventListener("pointerdown", function (e) {
          var row = rowOf(e);
          if (!row) return;
          measure(row);
          if (e.pointerType !== "touch" && e.target.closest("[data-list-action]") && e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
        }, true);
        section.addEventListener("keydown", function (e) {
          var row = rowOf(e);
          if (row) measure(row);
        }, true);
        section.addEventListener("click", function (e) {
          var link = e.target && e.target.closest ? e.target.closest("a.plst-action") : null;
          if (link) e.preventDefault();
        });
        var frozen = section.querySelectorAll(".plst-row--pressed");
        frozen.forEach(measure);
        if (window.ResizeObserver) {
          var ro = new ResizeObserver(function (entries) { entries.forEach(function (entry) { measure(entry.target); }); });
          frozen.forEach(function (row) { ro.observe(row); });
        }
      })();
    </script>`;

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03e — List</div>
      <h2 class="section-title">줄 종류 4 · 앞 · 뒤 · 강조 · 상태 5</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${kindsPanel}
    ${prefixPanel}
    ${suffixPanel}
    ${detailPanel}
    ${highlightPanel}
    ${statePanel}
    ${livePanel}
    ${headerPanel}
    ${dividerPanel}${script}
  </section>`;
}

// Select Box — spec: specs/components/select-box.md · 수치 select-box.yaml. 구조는 SEED Select Box(2026-10-01).
// 묶음 .psb-group(RadioSelectBoxGroup · CheckSelectBoxGroup) · 상자 .psb(RadioSelectBox · CheckSelectBox).
// 상자의 짜임은 select-box.tsx 와 같다 — .psb(테두리 · 바탕, 고른 테두리는 ::after) > .psb-trigger(label — 누르는 자리) > .psb-content(.psb-prefix · .psb-body > .psb-label · .psb-desc) + 오른쪽 컨트롤,
// 그 아래 펼침 .psb-footer > .psb-footer-clip > .psb-footer-inner. 누르는 자리와 컨트롤에 [data-select-box-action], 컨트롤에 [data-select-box-control] 을 달고, 막히면 둘 다 [data-disabled] 를 단다.
// 컨트롤은 Radio · Checkbox 갤러리의 radio()(medium · neutral) · cbox()(ghost · medium) 그대로다 — 컨트롤이 '없음' 이면 화면 밖 라디오 · 체크(.psb-sr-only)다.
const SELECT_BOX_INTERACTIONS = ["hover", "focus", "pressed"];
// 앞 아이콘은 lucide 그림(선 2)이다 — 크기는 앞 자리가 정한다(22)
const SELECT_BOX_ICON = {
  fileText: listSvg('<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
  sheet: listSvg('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="9" y2="21"/><line x1="15" x2="15" y1="9" y2="21"/>'),
  braces: listSvg('<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>'),
  divide: listSvg('<circle cx="12" cy="6" r="1"/><line x1="5" x2="19" y1="12" y2="12"/><circle cx="12" cy="18" r="1"/>'),
  percent: listSvg('<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>'),
  coins: listSvg('<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48"/><path d="M15 6h1v4"/><path d="m6.134 14.768.866-.5 2 3.464"/><circle cx="16" cy="8" r="6"/>'),
  wallet: listSvg('<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>'),
  piggyBank: listSvg('<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/>'),
  trendingUp: listSvg('<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>'),
  landmark: listSvg('<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>'),
};

// 상자 하나(RadioSelectBox · CheckSelectBox) — 글(title · description)은 여기서 escape 하고, 앞(prefix) · 펼침(footer)은 HTML 조각으로 받는다.
//   type         radio(하나 고르기 — 기본) · check(여럿 고르기)
//   control      ""(type 의 컨트롤 — 라디오 · 칸 없는 체크, 기본) · none(테두리만으로 고른 것이 보일 때 — 라디오 · 체크는 화면 밖에 남는다)
//   id           컨트롤의 id — 누르는 자리(label)의 for 가 가리킨다
//   checked      고름
//   disabled     막힘 — 컨트롤은 disabled, 누르는 자리와 컨트롤에 data-disabled
//   layout       horizontal(가로형 — 1열, 기본) · vertical(세로형 — 2 ~ 3열). 묶음(selectBoxGroup)이 열 수에서 정한다
//   tabindex     하나 고르기 묶음의 Tab 자리 — 고른 상자(없으면 처음 상자)만 0, 나머지 -1(Radix 의 roving focus)
//   interaction  hover · focus · pressed — 갤러리에서 그 순간을 고정해 보여 줄 때만(.btn-state-* 와 같은 역할)
export function selectBox({ type = "radio", control = "", id, title, description = "", prefix = "", footer = "", checked = false, disabled = false, layout = "horizontal", tabindex = null, interaction = "" } = {}) {
  const check = type === "check";
  const off = disabled ? ' data-disabled=""' : "";
  const mark = control === "none"
    ? `<button type="button" role="${check ? "checkbox" : "radio"}" aria-checked="${checked ? "true" : "false"}" class="psb-sr-only"${disabled ? " disabled" : ""}></button>`
    : check ? cbox({ shape: "ghost", state: checked ? "checked" : "unchecked", disabled }) : radio({ checked, disabled });
  const markAttrs = ` id="${escape(id)}" data-select-box-control="" data-select-box-action=""${off}${tabindex === null ? "" : ` tabindex="${tabindex}"`}`;
  const cls = ["psb", layout === "vertical" && "psb--vertical", SELECT_BOX_INTERACTIONS.includes(interaction) && `psb--${interaction}`].filter(Boolean).join(" ");
  const pre = prefix ? `<span class="psb-prefix">${prefix}</span>` : "";
  const desc = description ? `<span class="psb-desc">${escape(description)}</span>` : "";
  const foot = footer ? `<div class="psb-footer" data-select-box-footer=""><div class="psb-footer-clip"><div class="psb-footer-inner">${footer}</div></div></div>` : "";
  return `<div class="${cls}"><label class="psb-trigger" for="${escape(id)}" data-select-box-action=""${off}><span class="psb-content">${pre}<span class="psb-body"><span class="psb-label">${escape(title)}</span>${desc}</span></span>${mark.replace("<button ", `<button${markAttrs} `)}</label>${foot}</div>`;
}

// 묶음 — 하나 고르기는 role=radiogroup(RadioSelectBoxGroup), 여럿은 fieldset(CheckSelectBoxGroup). 이름(aria-labelledby · aria-label)을 꼭 단다.
//   columns  1(가로형, 기본) · 2 · 3(세로형 — 상자 높이를 가장 긴 상자에 맞춘다)
//   items    상자마다 selectBox() 의 인자 — type · layout · tabindex 는 묶음이 채운다
//   live     섹션 끝 스크립트가 고르기를 맡는다 — 그 순간을 멈춘 칸은 false
export function selectBoxGroup({ type = "radio", columns = 1, labelledby = "", label = "", live = true, items = [] } = {}) {
  const layout = columns > 1 ? "vertical" : "horizontal";
  // 하나 고르기의 Tab 자리 — 고른 상자, 없거나 막혔으면 막히지 않은 처음 상자
  const open = items.filter(i => !i.disabled);
  const stop = type === "radio" ? open.find(i => i.checked) || open[0] : null;
  const boxes = items.map(i => selectBox({ ...i, type, layout, tabindex: stop && !i.disabled ? (i === stop ? 0 : -1) : null }));
  const cls = `psb-group${columns > 1 ? ` psb-group--cols-${columns}` : ""}`;
  const attrs = (labelledby ? ` aria-labelledby="${escape(labelledby)}"` : ` aria-label="${escape(label)}"`) + (live ? ' data-psb-live=""' : "");
  return type === "check"
    ? `<fieldset class="${cls}"${attrs}>${boxes.join("")}</fieldset>`
    : `<div class="${cls}" role="radiogroup"${attrs}>${boxes.join("")}</div>`;
}

// 하나 고르기 · 여럿 고르기 · 여러 열 · 고름 × 상태 · 직접 눌러 보기 네 판을 흰 표면(.vignette-card) 위에 그린다 — 상태 표는 Checkbox 갤러리의 .cb-* 를 쓴다.
// 선택지는 Desk(반복 거래 종료 · 내보내기 · 더치페이 · 계좌 종류)와 HR(휴가 권한)에서 빌렸다 — select-box.md 코드 예 · 사이트 그림과 같은 글이다.
// 그 순간을 멈춘 칸을 뺀 모든 묶음이 실제로 고른다 — 섹션 끝 스크립트가 Radix 가 하는 일(고르기 · Tab 자리 · 화살표)을 흉내 낸다.
export function renderSelectBoxGallery(brand) {
  let seq = 0;
  const nextId = () => `psb-${(seq += 1)}`;
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  const samples = (items) => `
      <div class="psb-samples">${items.join("")}
      </div>`;
  // 견본 하나 — 무엇을 보이는지(머리 글) · 칸 이름(묶음의 aria-labelledby) · 묶음
  const sample = (cap, en, legend, args) => {
    const legendId = nextId();
    return `
        <div class="psb-sample">
          <div class="psb-cap">${escape(cap)}<span>${escape(en)}</span></div>
          <div class="cb-group-legend" id="${legendId}">${escape(legend)}</div>
          ${selectBoxGroup({ ...args, labelledby: legendId, items: args.items.map(i => ({ ...i, id: nextId() })) })}
        </div>`;
  };
  const icon = (name) => SELECT_BOX_ICON[name];
  // 펼침의 내용 — Desk 반복 거래의 "총 · 회" 반복 횟수 칸. 입력칸은 Text Field 갤러리의 textInput() — 상자형 medium(40) · 폭 80 이다. 펼침의 내용은 쓰는 쪽이 정한다
  const countField = (value) => `<span class="psb-count">총 ${textInput({ size: "medium", value, inputmode: "numeric", label: "반복 횟수" })} 회</span>`;

  // 1. 하나 고르기 · 여럿 고르기 · 펼침 — 1열 가로형
  const ends = [
    { title: "무기한", description: "중지할 때까지 계속 반복" },
    { title: "횟수 지정", description: "정한 횟수만큼 반복", footer: countField("12"), checked: true },
    { title: "종료일 지정", description: "정한 날까지 반복" },
  ];
  const permissions = [
    { title: "휴가 조회", description: "본인 휴가 내역을 조회할 수 있는 권한입니다.", checked: true },
    { title: "휴가 신청", description: "OT, 경조 휴가 등 휴가를 신청할 수 있는 권한입니다.", checked: true },
    { title: "휴가 승인", description: "팀원이 신청한 추가 휴가 내역을 조회 및 승인/반려할 수 있는 권한입니다." },
  ];
  const basicsPanel = panel(
    "하나 고르기 · 여럿 고르기 · 펼침",
    "상자 하나가 선택지 하나다 — 제목 16 · 500 · fg-neutral, 설명 13 · fg-neutral-muted(두 줄까지), 사이 2. 1열은 가로형이다 — 위아래 16 · 왼쪽 20 · 오른쪽 16, 세로 가운데이고 상자 사이 12. 하나 고르기는 오른쪽에 라디오(Radio 의 medium · neutral), 여럿 고르기는 칸 없는 체크(Checkbox 의 Ghost medium — 꺼지면 옅은 체크)를 둔다 — 상자가 칸 노릇을 한다. 그 선택지를 고를 때만 필요한 칸은 펼침에 둔다 — 고른 상자 아래로 열리고(안쪽 좌우 20 · 아래 16), 닫히면 보이지 않고 Tab 도 닿지 않는다. 눌러서 고를 수 있다. 선택지는 Desk 반복 거래의 종료와 HR 휴가 권한에서 빌렸다.",
    samples([
      sample("하나 고르기 · 펼침", "RadioSelectBoxGroup · RadioSelectBox footer", "종료", { type: "radio", items: ends }),
      sample("여럿 고르기", "CheckSelectBoxGroup · CheckSelectBox", "휴가 권한", { type: "check", items: permissions }),
    ]),
  );

  // 2. 여러 열 — 세로형 · 앞 아이콘 · 컨트롤 없음 · 같은 높이
  const formats = [
    { title: "CSV", description: "구글시트", prefix: icon("fileText"), control: "none", checked: true },
    { title: "Excel", description: "엑셀", prefix: icon("sheet"), control: "none" },
    { title: "JSON", description: "백업용", prefix: icon("braces"), control: "none" },
  ];
  // 개별 금액은 설명을 뺐다 — 짧은 상자도 가장 긴 상자에 높이를 맞추고, 늘어난 누르는 자리의 빈 아래쪽까지 눌린다
  const splits = [
    { title: "N분의 1", description: "균등 분배", prefix: icon("divide"), control: "none", checked: true },
    { title: "비율", description: "인원수·기준", prefix: icon("percent"), control: "none" },
    { title: "개별 금액", prefix: icon("coins"), control: "none" },
  ];
  // 대출은 설명이 두 줄이다 — 위 줄의 상자도 그 높이에 맞춘다(같은 줄뿐 아니라 묶음의 모든 줄이 같은 높이)
  const accounts = [
    { title: "입출금", description: "월급 · 생활비", prefix: icon("wallet"), checked: true },
    { title: "저축", description: "적금 · 예금", prefix: icon("piggyBank") },
    { title: "투자", description: "증권 · 연금", prefix: icon("trendingUp") },
    { title: "대출", description: "빌린 돈 · 이자 · 갚을 날", prefix: icon("landmark") },
  ];
  const columnsPanel = panel(
    "여러 열 — 세로형 · 앞 아이콘 · 컨트롤 없음",
    "2 ~ 3열이면 세로형이다 — 앞이 위에 서고 컨트롤은 위 오른쪽, 위아래 20 · 좌우 16, 앞과 본문 사이 10, 열 사이 12 · 줄 사이 12. 앞 아이콘은 22 · fg-neutral. 상자 높이는 가장 긴 상자에 맞춘다 — 같은 줄뿐 아니라 묶음의 모든 줄이 같은 높이다. 누르는 자리도 상자 끝까지 늘어, 내용이 짧은 상자의 빈 아래쪽도 눌린다. 3열은 폭이 좁으니 제목과 짧은 설명만 두고 컨트롤을 없앤다 — 테두리만으로 고른 것이 보이고, 라디오는 화면 밖에 남아 키보드와 화면 읽기 프로그램이 쓴다. 칸이 비지 않게 열 수를 맞춘다. 선택지는 Desk 내보내기의 파일 형식 · 더치페이의 분배 방식(개별 금액은 설명을 빼 높이 맞춤을 보였다) · 계좌 종류에서 빌렸다.",
    samples([
      sample("3열 · 앞 아이콘 · 컨트롤 없음", "RadioSelectBoxGroup columns={3} · control=\"none\"", "파일 형식", { type: "radio", columns: 3, items: formats }),
      sample("3열 · 같은 높이", "설명 없는 상자도 가장 긴 상자에 맞춘다", "분배 방식", { type: "radio", columns: 3, items: splits }),
      sample("2열 · 앞 아이콘 · 라디오 · 두 줄", "RadioSelectBoxGroup columns={2} — 모든 줄이 같은 높이", "계좌 종류", { type: "radio", columns: 2, items: accounts }),
    ]),
  );

  // 3. 고름 × 상태 — 그 순간을 멈춰 그린다. 누름 칸의 배율 기준은 섹션 끝 스크립트가 잰다
  const stateCols = [
    { ko: "하나 고르기 · 고르지 않음", en: "RadioSelectBox", type: "radio", checked: false },
    { ko: "하나 고르기 · 고름", en: "RadioSelectBox — 고른 상자", type: "radio", checked: true },
    { ko: "여럿 고르기 · 고르지 않음", en: "CheckSelectBox", type: "check", checked: false },
    { ko: "여럿 고르기 · 고름", en: "CheckSelectBox — 고른 상자", type: "check", checked: true },
  ];
  const states = [
    { ko: "기본", en: "enabled" },
    { ko: "호버", en: "hovered", interaction: "hover" },
    { ko: "포커스", en: "focused", interaction: "focus" },
    { ko: "누름", en: "pressed", interaction: "pressed" },
    { ko: "비활성", en: "disabled", disabled: true },
  ];
  const stateText = { radio: { title: "횟수 지정", description: "정한 횟수만큼 반복" }, check: { title: "거래 내역", description: "모든 수입·지출·이체" } };
  const stateCell = (c, s) => selectBoxGroup({
    type: c.type,
    live: false,
    label: `${c.ko} — ${s.ko}`,
    items: [{ ...stateText[c.type], id: nextId(), checked: c.checked, disabled: s.disabled, interaction: s.interaction }],
  });
  const stateHead = `<div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">상태</div>${
    stateCols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
  }</div>`;
  const statePanel = panel(
    "고름 × 상태",
    "호버 · 포커스 · 누름은 그 순간을 멈춰 그렸다. 호버는 누름과 같은 바탕(bg-layer-default-pressed)이고, 누름은 그 바탕에 누르는 자리(콘텐츠 + 컨트롤)만 2px 거리 축소다 — 기준 길이는 max(높이, 폭 ÷ 4, 24). 테두리 · 바탕은 줄지 않고 컨트롤도 따로 줄지 않는다. 라디오는 누르는 자리에 올리거나 누르면 제 누름 색이 되고, 체크는 바탕을 상자에 맡긴다. 포커스는 키보드에만 — 상자 바깥 링 2px · 띄움 2px 이고 컨트롤은 제 링을 그리지 않는다. 비활성은 전용 색(fg-disabled)이고 흐리게 하지 않는다 — 고른 채 막히면 2px 옅은 테두리(stroke-neutral-weak)다.",
    `
      <div class="cb-matrix psb-matrix" style="--cb-cols: ${stateCols.length};">
        ${stateHead}${states.map(s => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(s.ko)}<span>${escape(s.en)}</span></div>${
          stateCols.map(c => `<div class="cb-matrix-cell psb-cell">${stateCell(c, s)}</div>`).join("")
        }</div>`).join("")}
      </div>`,
  );

  // 4. 직접 눌러 보기 — 막힌 상자 · 고른 채 막힌 상자 · 펼침을 섞었다
  const liveEnds = [
    { title: "무기한", description: "중지할 때까지 계속 반복", checked: true },
    { title: "횟수 지정", description: "정한 횟수만큼 반복", footer: countField("12") },
    { title: "종료일 지정", description: "정한 날까지 반복", disabled: true },
  ];
  const includes = [
    { title: "거래 내역", description: "모든 수입·지출·이체", checked: true },
    { title: "카테고리 요약", description: "카테고리별 합계와 비율" },
    { title: "예산 진행 상황", description: "할당·사용·초과 현황", checked: true, disabled: true },
    { title: "자산 스냅샷", description: "기간 말일 기준 잔액", disabled: true },
  ];
  const livePanel = panel(
    "직접 눌러 보기",
    "마우스를 올리고 눌러서 고른다 — 하나 고르기는 하나만 고르고, 여럿 고르기는 켜고 끈다. 고르면 펼침이 열리고 다른 상자를 고르면 닫힌다. Tab 은 하나 고르기 묶음에서 고른 상자 하나로 들어오고 화살표로 옮기며 고른다(막힌 상자는 건너뛴다). 여럿 고르기는 상자마다 Tab 이 닿고 Space 로 켜고 끈다 — 누르고 있는 동안은 누름 모습이다. 막힌 상자는 바탕이 바뀌지 않고 커서가 not-allowed 다. 모션 줄이기면 누르는 자리가 줄지 않고, 펼침은 높이가 바로 바뀌고 투명도만 150ms 다. 반영은 저장 · 다음 같은 버튼이 한다 — 여기서는 고르기만 한다.",
    samples([
      sample("하나 고르기 — 막힌 상자 · 펼침", "종료일 지정은 막혔다", "종료", { type: "radio", items: liveEnds }),
      sample("여럿 고르기 — 고른 채 막힌 상자", "예산 진행 상황 · 자산 스냅샷은 막혔다", "포함할 내용", { type: "check", items: includes }),
    ]),
  );

  const lede = "SEED Select Box 구조 — 하나 고르기(Radio Select Box) · 여럿 고르기(Check Select Box) · 묶음(Select Box Group). 상자 하나가 선택지 하나이고, 펼침을 뺀 상자 전체가 누르는 영역이다. 고르면 테두리만 2px 짙은 색(stroke-neutral-contrast)으로 바뀌고 바탕은 그대로다 — 브랜드 톤은 없다. 제목 16 · 500, 설명 13 · fg-neutral-muted. 고르기만 하고, 고른 값은 저장 · 다음 같은 버튼이 반영한다. 옛 Tile 을 대신한다 — 누르는 순간 바뀌는 테마는 03e — List 의 라디오 줄이다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 포커스 링이 여기서는 중립(fg-neutral)으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  // 누름 배율의 기준 = max(높이, 폭 ÷ 4, 24) — 누르는 자리(label) 폭이 놓인 자리마다 달라 누르는 순간(포인터 · 키) 재서 --press-basis 로 넘긴다(select-box.tsx 의 measurePress).
  // 누르는 동안 누르는 자리가 줄어 가장자리를 누른 포인터가 그 밖에 남아도 click 이 그 상자로 가게, 마우스 · 펜으로 누르면 누른 요소에 포인터를 잡아 둔다(터치는 브라우저가 이미 잡는다).
  // 고르기는 Radix 가 하는 일을 흉내 낸다 — 하나 고르기는 하나만(Tab 자리는 고른 상자 하나, 화살표로 옮기며 고르고 막힌 상자는 건너뛴다), 여럿 고르기는 켜고 끈다, Enter 로는 고르지 않는다.
  // 그 순간을 멈춘 칸(data-psb-live 가 없는 묶음)은 고르지 않는다. 그 누름 칸은 누르지 않으니 그릴 때와 크기가 바뀔 때 잰다.
  const script = `
    <script>
      (function () {
        var section = document.currentScript.closest("section");
        function measure(trigger) { trigger.style.setProperty("--press-basis", String(Math.max(trigger.offsetHeight, trigger.offsetWidth / 4, 24))); }
        function closestIn(e, selector) {
          var el = e.target && e.target.closest ? e.target.closest(selector) : null;
          return el && section.contains(el) ? el : null;
        }
        function controlsOf(group) { return Array.prototype.slice.call(group.querySelectorAll("[data-select-box-control]")); }
        section.addEventListener("pointerdown", function (e) {
          var trigger = closestIn(e, ".psb-trigger");
          if (!trigger) return;
          measure(trigger);
          if (e.pointerType !== "touch" && e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
        }, true);
        section.addEventListener("keydown", function (e) {
          var trigger = closestIn(e, ".psb-trigger");
          if (trigger) measure(trigger);
        }, true);
        section.addEventListener("click", function (e) {
          var control = closestIn(e, "[data-select-box-control]");
          var group = control ? control.closest(".psb-group[data-psb-live]") : null;
          if (!group || control.disabled) return;
          if (control.getAttribute("role") === "radio") {
            var open = controlsOf(group).filter(function (c) { return !c.disabled; });
            controlsOf(group).forEach(function (c) { c.setAttribute("aria-checked", c === control ? "true" : "false"); });
            open.forEach(function (c) { c.tabIndex = c === control ? 0 : -1; });
          } else {
            control.setAttribute("aria-checked", control.getAttribute("aria-checked") === "true" ? "false" : "true");
          }
        });
        section.addEventListener("keydown", function (e) {
          var control = closestIn(e, "[data-select-box-control]");
          if (!control) return;
          if (e.key === "Enter") { e.preventDefault(); return; }
          var step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
          var group = control.getAttribute("role") === "radio" ? control.closest(".psb-group[data-psb-live]") : null;
          if (!step || !group) return;
          e.preventDefault();
          var open = controlsOf(group).filter(function (c) { return !c.disabled; });
          var next = open[(open.indexOf(control) + step + open.length) % open.length];
          next.focus();
          next.click();
        });
        var frozen = section.querySelectorAll(".psb--pressed > .psb-trigger");
        frozen.forEach(measure);
        if (window.ResizeObserver) {
          var ro = new ResizeObserver(function (entries) { entries.forEach(function (entry) { measure(entry.target); }); });
          frozen.forEach(function (trigger) { ro.observe(trigger); });
        }
      })();
    </script>`;

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03f — Select Box</div>
      <h2 class="section-title">하나 · 여럿 고르기 · 1 ~ 3열 · 펼침 · 상태 5</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${basicsPanel}
    ${columnsPanel}
    ${statePanel}
    ${livePanel}${script}
  </section>`;
}

// Text Field — spec: specs/components/field.md · input.md · textarea.md · 수치 field.yaml · input.yaml · textarea.yaml. 구조는 SEED Field · Text Input · Textarea(2026-10-01).
// Field .ptf-field(머리 · 입력 · 꼬리) · 입력칸 .ptf-input(Text Input) · 여러 줄 .ptf-textarea(Textarea). 짜임은 field.tsx · input.tsx · textarea.tsx 와 같다 —
// 상자(div)가 테두리 · 바탕 · 모서리를 맡고 입력(<input> · <textarea>)이 그 안을 채운다. 상태는 상자의 data-invalid · data-disabled · data-readonly 다(레시피와 같은 이름).
// 미리보기의 입력칸 · 여러 줄 입력칸 · 폼 칸 이름 · 설명 · 오류는 모두 이 도우미로 그린다 — 옛 회색 채운 칸(.fv-input · .form-input · .search-pill)은 걷었다.
// 고르는 칸은 아래 Select · Input Button 도우미(selectTrigger · inputButton — 03h)로 그린다. Command 의 입력 · Input OTP 는 그 컴포넌트 차례에 맞춘다(input.md Migration notes).
// 옛 칩 안의 입력칸(.chip--input)은 걷었다 — 입력값 칩(03i — chipField · chip kind "input")은 넣은 값만 보이고, 값을 넣는 칸은 이 Text Input 이다.
// 상자를 눌러 포커스 · 지우기 · 글자 수 · 자동 높이 · 금액 쉼표 · 제출 시 검증은 페이지 끝 스크립트(renderHtml)가 레시피처럼 맡는다.
const TEXT_FIELD_ICON = {
  search: listSvg('<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>'),
  circleX: listSvg('<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'),
  circleAlert: listSvg('<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'),
  circleCheck: listSvg('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
};
// 지우기 버튼 — 이름 "지우기", Tab 순서 밖(input.tsx). 페이지 끝 스크립트도 이 모양으로 넣는다
const TEXT_FIELD_CLEAR = `<button type="button" class="ptf-clear" aria-label="지우기" tabindex="-1">${TEXT_FIELD_ICON.circleX}</button>`;
let textFieldSeq = 0;
const nextTextFieldId = () => `ptf-${(textFieldSeq += 1)}`;
// 글자 수는 자소 단위로 센다(field.tsx 의 countGraphemes — 국기 이모지도 한 글자)
const textFieldSegmenter = new Intl.Segmenter("ko", { granularity: "grapheme" });
const graphemeCount = (value) => [...textFieldSegmenter.segment(String(value))].length;
const attrsOf = (pairs) => pairs.filter(Boolean).join(" ");

// 입력칸 하나(Text Input) — 글(value · placeholder · prefix · suffix · label)은 여기서 escape 한다.
//   variant      outline(상자 — 기본) · underline(밑줄 — 화면에 입력이 하나뿐일 때)
//   size         large(52 · 밑줄 40) · medium(40 · 밑줄 34 — 1280 이상 데스크톱 웹) · responsive(웹 기본 — 1280 미만 large · 이상 medium)
//   prefix · suffix          앞 · 뒤 글자(https:// · 원) — 입력의 설명으로도 잇는다(aria-describedby — 단위가 화면 읽기 프로그램에도 들린다)
//   prefixIcon · suffixIcon  앞 · 뒤 아이콘 이름(TEXT_FIELD_ICON)
//   clearable    지우기 — 값이 있고 막히지 않았을 때만 그린다. 값이 바뀌면 페이지 끝 스크립트가 넣고 뺀다(data-clearable)
//   invalid · disabled · readonly  상태 — 상자에 data-invalid · data-disabled · data-readonly, 입력에 aria-invalid · disabled · readonly
//   focus        그 순간을 멈춘 포커스(.ptf-input--focus) — 갤러리 전용. 칸은 실제 입력이라 눌러서 포커스해도 같은 모습이다
//   format       amount — 쓰는 동안 천 단위 쉼표(페이지 끝 스크립트)
//   label        이름(aria-label) — Field 밖에 둔 칸만. Field 안이면 Field 의 라벨이 <label for> 로 잇는다
//   describedby  Field 가 넘기는 오류 · 설명 · 글자 수 id
export function textInput({ variant = "outline", size = "responsive", id = nextTextFieldId(), value = "", placeholder = "", type = "text", inputmode = "", label = "", describedby = "", prefix = "", suffix = "", prefixIcon = "", suffixIcon = "", clearable = false, invalid = false, disabled = false, readonly = false, required = false, focus = false, format = "", rootClass = "" } = {}) {
  const cls = ["ptf-input", variant === "underline" && "ptf-input--underline", `ptf-input--${size}`, focus && "ptf-input--focus", rootClass].filter(Boolean).join(" ");
  const live = clearable && !disabled && !readonly;
  const state = (invalid ? ' data-invalid=""' : "") + (disabled ? ' data-disabled=""' : "") + (readonly ? ' data-readonly=""' : "") + (live ? ' data-clearable=""' : "");
  const prefixId = prefix ? `${id}-prefix` : "";
  const suffixId = suffix ? `${id}-suffix` : "";
  const desc = [prefixId, suffixId, describedby].filter(Boolean).join(" ");
  const icon = (name) => (name ? `<span class="ptf-icon" aria-hidden="true">${TEXT_FIELD_ICON[name]}</span>` : "");
  const affix = (text, affixId) => (text ? `<span class="ptf-affix" id="${affixId}">${escape(text)}</span>` : "");
  const input = `<input ${attrsOf([
    'class="ptf-input-value"',
    `id="${escape(id)}"`,
    `type="${escape(type)}"`,
    value !== "" && `value="${escape(value)}"`,
    placeholder && `placeholder="${escape(placeholder)}"`,
    inputmode && `inputmode="${escape(inputmode)}"`,
    label && `aria-label="${escape(label)}"`,
    desc && `aria-describedby="${desc}"`,
    invalid && 'aria-invalid="true"',
    required && 'aria-required="true"',
    disabled && "disabled",
    readonly && "readonly",
    format && `data-format="${escape(format)}"`,
  ])}>`;
  const clear = live && value !== "" ? TEXT_FIELD_CLEAR : "";
  return `<div class="${cls}"${state}>${icon(prefixIcon)}${affix(prefix, prefixId)}${input}${affix(suffix, suffixId)}${icon(suffixIcon)}${clear}</div>`;
}

// 여러 줄 입력칸(Textarea) — 상자 · 상태는 입력칸 상자형과 같다. 글은 여기서 escape 한다.
//   size         large(글자 16 · 모서리 12) · medium(14 · 8) · responsive(웹 기본)
//   autoSize     true — 3줄(94 · 82)에서 쓴 만큼 자란다(기본, 페이지 끝 스크립트가 높이를 맞춘다) · false — 고정 높이(2줄 72 · 62 이상), 넘치면 칸 안에서 스크롤
//   height       고정 높이(px) — autoSize false 일 때 자리마다 정한다. 없으면 2줄
//   maxHeight    자동 높이의 최대(px) — 그 높이부터 칸 안에서 스크롤
//   그 밖의 인자는 textInput 과 같다
export function textArea({ size = "responsive", autoSize = true, height = 0, maxHeight = 0, id = nextTextFieldId(), value = "", placeholder = "", label = "", describedby = "", invalid = false, disabled = false, readonly = false, required = false, focus = false, rootClass = "" } = {}) {
  const cls = ["ptf-textarea", `ptf-textarea--${size}`, !autoSize && "ptf-textarea--fixed", focus && "ptf-textarea--focus", rootClass].filter(Boolean).join(" ");
  const state = (invalid ? ' data-invalid=""' : "") + (disabled ? ' data-disabled=""' : "") + (readonly ? ' data-readonly=""' : "");
  // 줄 수 — 레시피는 3(자동) · 2(고정). 스크립트가 돌기 전에도 쓴 줄이 잘리지 않게 자동 높이는 쓴 줄 수만큼 연다
  const rows = autoSize ? Math.max(3, String(value).split("\n").length) : 2;
  const style = [!autoSize && height && `height:${height}px`, autoSize && maxHeight && `max-height:${maxHeight}px`].filter(Boolean).join(";");
  const area = `<textarea ${attrsOf([
    'class="ptf-textarea-value"',
    `id="${escape(id)}"`,
    `rows="${rows}"`,
    style && `style="${style}"`,
    placeholder && `placeholder="${escape(placeholder)}"`,
    label && `aria-label="${escape(label)}"`,
    describedby && `aria-describedby="${describedby}"`,
    invalid && 'aria-invalid="true"',
    required && 'aria-required="true"',
    disabled && "disabled",
    readonly && "readonly",
  ])}>${escape(value)}</textarea>`;
  return `<div class="${cls}"${state}>${area}</div>`;
}

// Select · Input Button — spec: specs/components/select.md · input-button.md · 수치 select.yaml · input-button.yaml. 구조는 SEED Select · Input Button(2026-10-01).
// 고르는 칸은 둘이다 — Select(.psel-*)는 짧은 선택지 5개 이상을 칸 아래 목록으로 열고, Input Button(.pib-*)은 달력 · 시각 · 아이콘 격자 · 긴 목록을
// 시트(1280 미만) · 팝오버(1280 이상)로 연다. 트리거는 둘 다 Text Input 의 상자형과 같은 상자다(52 · 40). 미리보기의 고르는 칸은 모두 이 도우미로 그린다 —
// 옛 회색 채운 40 칸(.form-select)은 걷었다. 칸은 실제 버튼이라 올리고 눌러 보면 바탕 · 축소가 보인다(여는 자리는 그리지 않는다 — 03h 의 그림 참고).
// 아이콘은 lucide(선 2) — 고른 표시 check 만 선 2.5 다(select.yaml indicator). 크기는 놓인 자리가 정한다
const PICK_ICON = {
  chevronDown: listSvg('<path d="m6 9 6 6 6-6"/>'),
  chevronLeft: listSvg('<path d="m15 18-6-6 6-6"/>'),
  chevronRight: listSvg('<path d="m9 18 6-6-6-6"/>'),
  calendarDays: listSvg('<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>'),
  clock: listSvg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  creditCard: listSvg('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/><path d="M6 14h2"/>'),
  banknote: listSvg('<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>'),
  landmark: SELECT_BOX_ICON.landmark,
  circleSlash: listSvg('<circle cx="12" cy="12" r="10"/><line x1="9" x2="15" y1="15" y2="9"/>'),
  coffee: listSvg('<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>'),
  utensils: LIST_ICON.utensils,
  bus: LIST_ICON.bus,
  shoppingBag: listSvg('<path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>'),
  house: listSvg('<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
  tag: listSvg('<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>'),
  user: LIST_ICON.user,
};
const PICK_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
// 그 순간을 멈춘 칸 — 트리거 · 칸은 pressed · focus, 선택지는 pressed · hover · focus(키보드로 짚은 선택지)
const PICK_INTERACTIONS = ["pressed", "focus"];
const PICK_ITEM_INTERACTIONS = ["pressed", "hover", "focus"];
let pickSeq = 0;
const nextPickId = (prefix) => `${prefix}-${(pickSeq += 1)}`;
const pickIcon = (cls, name) => (name ? `<span class="${cls}" aria-hidden="true">${PICK_ICON[name]}</span>` : "");

// Select 트리거 — role=combobox 버튼 하나가 상자다. 글(value · placeholder · label)은 여기서 escape 한다.
//   size         large(52) · medium(40 — 1280 이상 데스크톱 웹) · responsive(웹 기본 — 1280 미만 large · 이상 medium)
//   value        고른 값 — 여럿 고르기는 values(고른 순서의 배열)를 준다. 트리거 글은 "식비, 교통" 이고 칸 폭을 넘으면 "식비 외 2개"(페이지 끝 스크립트가 폭에 맞춘다)
//   placeholder  고르기 전의 글 — "{값의 종류} 선택"
//   prefixIcon   앞 아이콘 이름(PICK_ICON) — 하나를 고르면 그 선택지의 아이콘, 둘 이상이면 트리거에 준 아이콘을 넘긴다
//   open         열림 — aria-expanded · 셰브론 180°
//   invalid · disabled · readonly · required  상태 — 트리거에 data-invalid · data-readonly · disabled, aria-invalid · aria-readonly · aria-required
//   interaction  pressed · focus — 그 순간을 멈춘 칸(갤러리 전용). 칸은 실제 버튼이라 눌러 보면 같은 모습이다
//   label        이름(aria-label) — Field 밖에 둔 칸만. Field 안이면 Field 의 라벨이 <label for> 로 잇는다
//   controls · describedby  목록 id(aria-controls) · Field 가 넘기는 오류 · 설명 id
export function selectTrigger({ size = "responsive", id = nextPickId("psel"), value = "", values = null, placeholder = "", prefixIcon = "", open = false, invalid = false, disabled = false, readonly = false, required = false, interaction = "", label = "", controls = "", describedby = "" } = {}) {
  const cls = ["psel-trigger", `psel-trigger--${size}`, PICK_INTERACTIONS.includes(interaction) && `psel-trigger--${interaction}`].filter(Boolean).join(" ");
  const many = Array.isArray(values) && values.length ? values : null;
  const text = many ? many.join(", ") : value;
  const attrs = attrsOf([
    'type="button"',
    `class="${cls}"`,
    `id="${escape(id)}"`,
    'role="combobox"',
    'aria-haspopup="listbox"',
    `aria-expanded="${open ? "true" : "false"}"`,
    controls && `aria-controls="${escape(controls)}"`,
    label && `aria-label="${escape(label)}"`,
    describedby && `aria-describedby="${describedby}"`,
    invalid && 'aria-invalid="true"',
    required && 'aria-required="true"',
    readonly && 'aria-readonly="true"',
    invalid && 'data-invalid=""',
    readonly && 'data-readonly=""',
    disabled && "disabled",
  ]);
  const shown = text !== ""
    ? `<span class="psel-value"${many ? ` data-psel-values="${escape(JSON.stringify(many))}"` : ""}>${escape(text)}</span>`
    : `<span class="psel-placeholder">${escape(placeholder)}</span>`;
  return `<button ${attrs}><span class="psel-trigger-content">${pickIcon("psel-icon", prefixIcon)}${shown}${pickIcon("psel-chevron", "chevronDown")}</span></button>`;
}

// Select 목록(Content) — 묶음(Group)마다 선택지(Item)를 쌓는다. 글(묶음 제목 · label · description)은 여기서 escape 한다.
//   size      large(선택지 46) · medium(39) · responsive — 트리거와 같은 크기를 준다
//   groups    [{ label, items: [{ label, description, icon, selected, disabled, interaction }] }] — 둘째 묶음부터 위에 선(Divider)을 저절로 긋는다
//   multiple  여럿 고르기 — aria-multiselectable
//   interaction(선택지)  pressed · hover · focus — 그 순간을 멈춘 선택지(갤러리 전용). focus 는 키보드로 짚은 선택지 — 목록의 aria-activedescendant 가 가리킨다
//   고른 표시(체크)는 고른 선택지에만 그린다 — 고르지 않은 선택지에는 자리도 없다
export function selectList({ size = "responsive", id = nextPickId("psel-list"), labelledby = "", label = "", multiple = false, groups = [] } = {}) {
  const base = escape(id);
  let active = "";
  const body = groups.map((group, gi) => {
    const headId = group.label ? `${base}-g${gi}` : "";
    const items = group.items.map((item, ii) => {
      const itemId = `${base}-o${gi}-${ii}`;
      if (item.interaction === "focus") active = itemId;
      const cls = ["psel-item", PICK_ITEM_INTERACTIONS.includes(item.interaction) && `psel-item--${item.interaction}`].filter(Boolean).join(" ");
      const desc = item.description ? `<span class="psel-item-desc">${escape(item.description)}</span>` : "";
      const mark = item.selected ? `<span class="psel-indicator" aria-hidden="true">${PICK_CHECK}</span>` : "";
      return `<div class="${cls}" role="option" id="${itemId}" aria-selected="${item.selected ? "true" : "false"}"${item.disabled ? ' aria-disabled="true"' : ""}><span class="psel-item-content">${pickIcon("psel-item-icon", item.icon)}<span class="psel-item-body"><span class="psel-item-label">${escape(item.label)}</span>${desc}</span>${mark}</span></div>`;
    }).join("");
    const divider = gi > 0 ? '<div class="psel-divider" aria-hidden="true"></div>' : "";
    const head = group.label ? `<div class="psel-group-label" id="${headId}" role="presentation">${escape(group.label)}</div>` : "";
    return `<div class="psel-group" role="group"${headId ? ` aria-labelledby="${headId}"` : ""}>${divider}${head}${items}</div>`;
  }).join("");
  const attrs = attrsOf([
    `class="psel-list psel-list--${size}"`,
    'role="listbox"',
    `id="${base}"`,
    'tabindex="-1"',
    labelledby ? `aria-labelledby="${escape(labelledby)}"` : label && `aria-label="${escape(label)}"`,
    multiple && 'aria-multiselectable="true"',
    active && `aria-activedescendant="${active}"`,
  ]);
  return `<div ${attrs}>${body}</div>`;
}

// 열린 Select — 트리거 + 목록(그 순간을 멈춘 모습). 목록은 트리거 폭 그대로 아래 8 에 붙는다. 실제로는 떠서 뒤를 덮지만, 갤러리에서는 견본 끝에 두어 흐름 안에 그린다
export function selectOpen({ trigger = {}, list = {} } = {}) {
  const listId = list.id || nextPickId("psel-list");
  return `<div class="psel">${selectTrigger({ ...trigger, open: true, controls: listId })}${selectList({ size: trigger.size, ...list, id: listId })}</div>`;
}

// Input Button 칸 하나 — 상자(div)가 테두리 · 바탕 · 모서리를 맡고, 그 안의 배경 층 버튼(.pib-button)이 누르는 영역 전체 · 키보드 포커스다.
// 값 · 붙이개 · 지우기는 그 위에 얹는다(.pib-content — 누름을 지나 보낸다). 지우기는 그 위의 따로 누르는 버튼이다(버튼 안에 버튼을 두지 않는다). 글은 여기서 escape 한다.
//   size · invalid · disabled · readonly · interaction · label · describedby  Select 트리거와 같다
//   value · placeholder      고른 값 · 고르기 전의 글("{값의 종류} 선택") — 이름은 Field 의 라벨 + 값(aria-labelledby, 비었으면 라벨 + placeholder)
//   prefix · suffix          앞 · 뒤 글자(단위)
//   prefixIcon · suffixIcon  앞 · 뒤 아이콘 이름 — 뒤 아이콘은 무엇이 열리는지 알린다(calendarDays · clock · chevronDown)
//   clearable    지우기 — 선택 사항인 칸에 값이 있고 막히지 않았을 때만 그린다. 값 바로 뒤 · 뒤 붙이개 앞
//   labelledby   Field 의 라벨 id
//   expanded     여는 자리가 열려 있다 — aria-expanded(모습은 그대로다)
export function inputButton({ size = "responsive", id = nextPickId("pib"), value = "", placeholder = "", prefix = "", suffix = "", prefixIcon = "", suffixIcon = "", clearable = false, invalid = false, disabled = false, readonly = false, interaction = "", label = "", labelledby = "", describedby = "", expanded = false } = {}) {
  const cls = ["pib", `pib--${size}`, PICK_INTERACTIONS.includes(interaction) && `pib--${interaction}`].filter(Boolean).join(" ");
  const state = (invalid ? ' data-invalid=""' : "") + (disabled ? ' data-disabled=""' : "") + (readonly ? ' data-readonly=""' : "");
  const base = escape(id);
  const valueId = `${base}-value`;
  const prefixId = prefix ? `${base}-prefix` : "";
  const suffixId = suffix ? `${base}-suffix` : "";
  // 이름 = 라벨 + 값(비면 placeholder). Field 밖이면 aria-label 을 자기 id 로 다시 이어(aria-labelledby="자기 값") 값이 뒤에 이어 읽힌다.
  // 붙이개 글은 설명으로 읽힌다(단위가 화면 읽기 프로그램에도 들리게). 읽기 전용은 포커스는 되고 열리지 않는다 — aria-disabled(input-button.tsx 와 같다)
  const button = `<button ${attrsOf([
    'type="button"',
    'class="pib-button"',
    `id="${base}"`,
    !labelledby && label && `aria-label="${escape(label)}"`,
    labelledby ? `aria-labelledby="${escape(labelledby)} ${valueId}"` : label && `aria-labelledby="${base} ${valueId}"`,
    (prefixId || suffixId || describedby) && `aria-describedby="${[prefixId, suffixId, describedby].filter(Boolean).join(" ")}"`,
    'aria-haspopup="dialog"',
    `aria-expanded="${expanded ? "true" : "false"}"`,
    invalid && 'aria-invalid="true"',
    readonly && 'aria-disabled="true"',
    disabled && "disabled",
  ])}></button>`;
  const affix = (text, affixId) => (text ? `<span class="pib-affix" id="${affixId}" aria-hidden="true">${escape(text)}</span>` : "");
  const shown = value !== ""
    ? `<span class="pib-value" id="${valueId}" aria-hidden="true">${escape(value)}</span>`
    : `<span class="pib-placeholder" id="${valueId}" aria-hidden="true">${escape(placeholder)}</span>`;
  const clear = clearable && value !== "" && !disabled && !readonly ? `<button type="button" class="pib-clear" aria-label="지우기" tabindex="-1">${TEXT_FIELD_ICON.circleX}</button>` : "";
  return `<div class="${cls}"${state}>${button}<span class="pib-content">${pickIcon("pib-icon", prefixIcon)}${affix(prefix, prefixId)}${shown}${clear}${affix(suffix, suffixId)}${pickIcon("pib-icon", suffixIcon)}</span></div>`;
}

// Field — 머리(라벨 · 필수 점 또는 "선택" · 보조 액션) · 입력 · 꼬리(설명 또는 오류 · 글자 수)를 8 간격으로 쌓는다. 글은 여기서 escape 한다.
//   label · labelWeight  칸 이름 — medium 500(기본) · bold 700(칸 하나를 크게 받는 단계 화면)
//   required     필수 — 입력의 aria-required. 점 · "선택" 은 mark 로 따로 단다(2/3 규칙 — textFieldMarks)
//   mark         dot(필수 점) · optional("선택") · ""(없음)
//   action       머리 오른쪽 보조 액션 글 — Button ghost · neutralSubtle · xsmall · 오른쪽 flush
//   description · descriptionIcon  설명(아이콘 이름은 TEXT_FIELD_ICON) — 오류가 있으면 오류가 대신한다
//   invalid · error  오류 — 오류 글이 설명 자리를 대신하고 글자 수가 빨개진다. 라벨은 그대로다
//   requiredMessage  폼 그림의 제출 시 검증 — 비운 채 제출하면 보일 오류(페이지 끝 스크립트)
//   max          글자 수 최대 — 있으면 꼬리 오른쪽에 "쓴 수/최대"(자소 단위). 입력은 최대에서 멈춘다
//   control      입력 — { kind: "input" | "textarea", ...textInput · textArea 인자 } · 고르는 칸 { kind: "select", ...selectTrigger 인자, groups · multiple }(groups 를 주면 열린 목록까지) ·
//                { kind: "inputButton", ...inputButton 인자 }. 고르는 칸의 오류는 제출 시 검증(requiredMessage)이 아니라 invalid · error 로 그린다
//   disabled · readonly  Field 에 주면 입력이 받는다
export function textField({ id = nextTextFieldId(), label = "", labelWeight = "medium", required = false, mark = "", action = "", description = "", descriptionIcon = "", invalid = false, error = "", requiredMessage = "", max = 0, control = {}, disabled = false, readonly = false, className = "" } = {}) {
  const showError = invalid && error;
  const ids = { label: `${id}-label`, desc: `${id}-desc`, error: `${id}-error`, count: `${id}-count` };
  const describedby = [showError && ids.error, !showError && description && ids.desc, max && ids.count].filter(Boolean).join(" ");
  const count = max ? graphemeCount(control.value ?? "") : 0;
  const markHtml = mark === "dot" ? '<span class="ptf-required" aria-hidden="true"></span>' : mark === "optional" ? '<span class="ptf-optional">선택</span>' : "";
  const labelEl = label ? `<label class="ptf-label${labelWeight === "bold" ? " ptf-label--bold" : ""}" id="${ids.label}" for="${id}">${escape(label)}${markHtml}</label>` : "";
  const actionEl = action ? `<div class="ptf-field-action"><button class="btn btn-ghost btn-ghost-subtle btn-size-xsmall btn-flush-right" type="button"><span>${escape(action)}</span></button></div>` : "";
  const header = labelEl || actionEl ? `<div class="ptf-field-header">${labelEl}${actionEl}</div>` : "";
  const shared = { id, describedby, invalid, required, disabled: disabled || !!control.disabled, readonly: readonly || !!control.readonly };
  // 고르는 칸 — Select 는 <label for> 가 트리거(combobox)의 이름이고, 열린 목록은 그 라벨을 이름으로 쓴다. Input Button 은 라벨 + 값이 이름이다(aria-labelledby)
  const pick = () => {
    if (!control.groups) return selectTrigger({ ...control, ...shared });
    const { groups, multiple, ...trigger } = control;
    return selectOpen({ trigger: { ...trigger, ...shared }, list: { id: `${id}-list`, labelledby: label ? ids.label : "", multiple, groups } });
  };
  const input = control.kind === "select" ? pick()
    : control.kind === "inputButton" ? inputButton({ ...control, ...shared, labelledby: label ? ids.label : "" })
    : control.kind === "textarea" ? textArea({ ...control, ...shared })
    : textInput({ ...control, ...shared });
  // 설명은 오류가 있을 때도 숨겨 둔다(hidden) — 제출 시 검증으로 오류가 걷히면 스크립트가 다시 보인다
  const errorEl = showError ? `<p class="ptf-error" id="${ids.error}" aria-hidden="true">${TEXT_FIELD_ICON.circleAlert}<span>${escape(error)}</span></p>` : "";
  const descEl = description ? `<p class="ptf-desc" id="${ids.desc}"${showError ? " hidden" : ""}>${descriptionIcon ? TEXT_FIELD_ICON[descriptionIcon] : ""}<span>${escape(description)}</span></p>` : "";
  const countEl = max ? `<p class="ptf-count${count === 0 ? " ptf-count--empty" : ""}" id="${ids.count}"><span class="ptf-count-value">${count}</span><span class="ptf-count-max">/${max}</span></p>` : "";
  const footer = errorEl || descEl || countEl ? `<div class="ptf-field-footer">${errorEl}${descEl}${countEl}</div>` : "";
  // 오류 글은 화면 밖 polite 알림 자리가 한 번 읽는다 — 보이는 오류 글은 두 번 읽히지 않게 aria-hidden(설명으로는 그대로 읽힌다 — field.tsx)
  const liveEl = `<span class="ptf-sr-only ptf-live" aria-live="polite">${showError ? escape(error) : ""}</span>`;
  const attrs = (invalid ? ' data-invalid=""' : "") + (shared.disabled ? ' data-disabled=""' : "") + (max ? ` data-max="${max}"` : "") + (requiredMessage ? ` data-required-message="${escape(requiredMessage)}"` : "");
  return `<div class="ptf-field${className ? ` ${className}` : ""}" data-slot="field"${attrs}>${header}${input}${footer}${liveEl}</div>`;
}

// 필수 · 선택 표시(2/3 규칙 — field.md "필수 입력 표시하기") — 한 화면 칸의 2/3 이상이 필수면 선택 칸에만 "선택", 그렇지 않으면 필수 칸에만 점. 둘을 섞지 않고, 칸이 하나면 붙이지 않는다
export function textFieldMarks(fields) {
  if (fields.length < 2) return fields.map(() => "");
  const required = fields.filter(f => f.required).length;
  const optionalMode = required * 3 >= fields.length * 2;
  return fields.map(f => (optionalMode ? (f.required ? "" : "optional") : (f.required ? "dot" : "")));
}

// Field · 입력칸 · 여러 줄 입력칸 일곱 판을 흰 표면(.vignette-card) 위에 그린다 — 상태 표는 Checkbox 갤러리의 .cb-* 를 쓴다.
// 글은 Desk(카테고리 · 계좌 · 거래 · 메모 검색)와 HR(휴가 신청 · 아이디)에서 빌렸다 — field.md · input.md · textarea.md 코드 예와 같은 글이다.
// 칸은 모두 실제 입력이다 — 써 보고 지우고 제출해 볼 수 있다(페이지 끝 스크립트). 포커스 칸만 그 순간을 멈춰 그렸다.
export function renderTextFieldGallery(brand) {
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  const samples = (items, cls = "ptf-samples") => `
      <div class="${cls}">${items.join("")}
      </div>`;
  // 견본 하나 — 무엇을 보이는지(머리 글) · 그림
  const sample = (cap, en, body) => `
        <div class="ptf-sample">
          <div class="ptf-cap">${escape(cap)}<span>${escape(en)}</span></div>
          ${body}
        </div>`;
  // 화면 틀 — 폰(360) · 데스크톱 웹. 칸은 2/3 규칙으로 점 · "선택" 을 단다. 칸 둘을 나란히 두려면 [a, b] 로 묶는다
  const screen = (title, rows, { desktop = false, actions = "" } = {}) => {
    const flat = rows.flat();
    const marks = textFieldMarks(flat);
    const html = new Map(flat.map((f, i) => [f, textField({ ...f, mark: marks[i] })]));
    const body = rows.map(r => (Array.isArray(r) ? `<div class="ptf-form-row">${r.map(f => html.get(f)).join("")}</div>` : html.get(r))).join("");
    return `<div class="ptf-screen${desktop ? " ptf-screen--desktop" : " ptf-screen--phone"}">
            <div class="ptf-screen-title">${escape(title)}</div>
            <div class="ptf-form">${body}</div>${actions}
          </div>`;
  };

  // 1. Field — 머리 · 입력 · 꼬리
  const category = { label: "카테고리 이름", action: "예시 보기", description: "목록과 통계에 이 이름으로 보여요.", max: 12 };
  const basicsPanel = panel(
    "Field — 머리 · 입력 · 꼬리",
    "Field 는 입력 하나를 감싼다 — 머리(라벨 · 필수 점 또는 \"선택\" · 오른쪽 보조 액션) · 입력 · 꼬리(왼쪽 설명 또는 오류 · 오른쪽 글자 수)를 8 간격으로 쌓고, 머리 · 꼬리는 좌우로 2 들어와 칸의 모서리와 글자 줄이 맞는다. 라벨은 16 · 500 · fg-neutral, 설명은 14 · fg-neutral-subtle 이다. 오류는 설명 자리를 대신한다 — 14 · fg-critical 에 circle-alert 16(사이 6)이고, 라벨은 빨개지지 않는다(테두리와 오류 글이 알린다). 글자 수는 최대가 있는 칸에만 \"쓴 수/최대\"(숫자 폭 고정)로 — 비면 쓴 수도 fg-neutral-subtle, 오류면 둘 다 fg-critical 이다. 보조 액션은 Button ghost · neutralSubtle · xsmall · 오른쪽 flush 이고 머리 높이 22 를 바꾸지 않게 위아래로 5 넘친다. 칸에 써 보면 글자 수가 따라 바뀌고 최대에서 멈춘다.",
    samples([
      sample("라벨 · 보조 액션 · 설명 · 글자 수", "Field label · headerAction · description · maxGraphemeCount", textField({ ...category, control: { kind: "input", size: "large", value: "반려동물", placeholder: "예: 반려동물, 부수입" } })),
      sample("부위 — 머리 22 · 입력 52 · 꼬리 19, 사이 8", "점선은 머리 · 꼬리 — 좌우 2 들어온다. 빈 칸은 글자 수도 옅다", textField({ ...category, className: "ptf-anatomy", control: { kind: "input", size: "large", placeholder: "예: 반려동물, 부수입" } })),
      sample("오류 — 설명 자리를 대신한다", "invalid · errorMessage — 라벨은 그대로", textField({ label: "아이디", description: "영문 · 숫자 20자까지", max: 20, invalid: true, error: "이미 쓰고 있는 아이디예요.", control: { kind: "input", size: "large", value: "porest" } })),
    ]),
  );

  // 2. 필수 입력 표시 — 2/3 규칙. 같은 규칙(textFieldMarks)이 칸 수에서 점 · "선택" 을 고른다
  const accountRows = [
    { label: "계좌 이름", required: true, control: { kind: "input", size: "large", value: "생활비 통장" } },
    { label: "계좌 번호", required: true, control: { kind: "input", size: "large", value: "110-123-456789", inputmode: "numeric" } },
    { label: "시작 잔액", required: true, control: { kind: "input", size: "large", value: "1,250,000", suffix: "원", inputmode: "numeric", format: "amount" } },
    { label: "메모", control: { kind: "input", size: "large", placeholder: "예: 월급 받는 통장", clearable: true } },
  ];
  const categoryRows = [
    { label: "카테고리 이름", required: true, description: "목록과 통계에 이 이름으로 보여요.", max: 12, control: { kind: "input", size: "large", value: "반려동물" } },
    { label: "한 달 예산", control: { kind: "input", size: "large", placeholder: "예: 200,000", suffix: "원", inputmode: "numeric", format: "amount" } },
    { label: "메모", control: { kind: "input", size: "large", placeholder: "예: 사료 · 병원비", clearable: true } },
  ];
  const marksPanel = panel(
    "필수 입력 표시 — 2/3 규칙",
    "한 화면 칸의 2/3 이상이 필수면 선택 칸에만 \"선택\"(14 · fg-neutral-subtle, 라벨과 같은 줄 높이 22 · 왼쪽 4)을 붙이고, 그렇지 않으면 필수 칸에만 빨간 점(6 · fg-critical, 라벨 첫 줄 위쪽 — 위 4 · 왼쪽 2)을 붙인다. 한 폼에 둘을 섞지 않고, 칸이 하나뿐이면 아무것도 붙이지 않는다. 점은 화면 읽기 프로그램에 숨기고 필수는 칸의 aria-required 가 알린다 — \"선택\" 화면의 필수 칸도 aria-required 다. 두 화면 모두 휴대폰 폭이고 Field 사이 24 다.",
    samples([
      sample("필수 3 · 선택 1 — \"선택\" 만", "Desk 계좌 추가 — 3/4 ≥ 2/3", screen("계좌 추가", accountRows)),
      sample("필수 1 · 선택 2 — 점만", "Desk 카테고리 추가 — 1/3 < 2/3", screen("카테고리 추가", categoryRows)),
    ]),
  );

  // 3. 모양 × 크기 — 같은 칸을 크기마다. 반응형은 지금 폭을 아래 글로 알린다(CSS 가 1280 에서 바꾼다)
  const titleField = (size) => textField({ label: "제목", description: "결재 목록에 이 제목으로 보여요.", control: { kind: "input", size, value: "개인 사유", placeholder: "예: 개인 사유" } });
  const amountStep = (size) => textField({ label: "얼마를 썼나요?", labelWeight: "bold", control: { kind: "input", variant: "underline", size, value: "12,000", suffix: "원", inputmode: "numeric", format: "amount" } });
  const variantsPanel = panel(
    "모양 × 크기 — 상자 · 밑줄 × large · medium · 반응형",
    "상자(outline)가 기본이다 — large 는 52 · 모서리 12 · 좌우 16 · 사이 10 · 글자 16/22 · 아이콘 20 · 지우기 22, medium 은 40 · 8 · 14 · 8 · 14/19 · 16 · 18. 밑줄(underline)은 화면에 입력이 하나뿐일 때(금액을 먼저 받는 단계 화면 · 목록 위 검색 · 초대 코드)만 쓴다 — 아래 1px 만 긋고 모서리 · 좌우 여백이 없으며 글자가 한 단계 크다(large 40 · 위아래 8 · 18/24 · 아이콘 24, medium 34 · 6 · 16/22 · 20). medium 은 1280 이상 데스크톱 웹(마우스)에서만 쓰고, 웹의 기본 responsive 는 1280 미만 large · 이상 medium 이다 — 앱은 늘 large. 한 폼 안에서 크기를 섞지 않는다. 칸 하나를 크게 받는 단계 화면은 라벨을 bold 700 으로 둔다.",
    samples([
      sample("상자 · large — 52", "variant=\"outline\" size=\"large\" — 폰 · 앱", titleField("large")),
      sample("상자 · medium — 40", "size=\"medium\" — 1280 이상 데스크톱 웹만", titleField("medium")),
      sample("상자 · 반응형 — 웹 기본", "size=\"responsive\" — 1280(--breakpoint-lg)에서 바뀐다", `${titleField("responsive")}
          <p class="ptf-now" aria-hidden="true"></p>`),
      sample("밑줄 · large — 40", "variant=\"underline\" — 금액을 먼저 받는 화면 · 라벨 bold", amountStep("large")),
      sample("밑줄 · medium — 34", "variant=\"underline\" size=\"medium\"", amountStep("medium")),
      sample("밑줄 · 목록 위 검색", "prefixIcon={<Search />} · clearable — 라벨 대신 aria-label", textInput({ variant: "underline", size: "large", label: "메모 검색", placeholder: "메모 검색", value: "회의", prefixIcon: "search", clearable: true })),
    ]),
  );

  // 4. 상태 — 칸은 모두 실제 입력이고 포커스만 그 순간을 멈춰 그렸다(.ptf-input--focus)
  const stateCols = [
    { ko: "상자 · 빈 칸", en: "outline — placeholder", input: { placeholder: "예: 개인 사유" } },
    { ko: "상자 · 값", en: "outline — value", input: { value: "개인 사유", placeholder: "예: 개인 사유" } },
    { ko: "밑줄 · 값", en: "underline — value · suffix", input: { variant: "underline", value: "12,000", suffix: "원", inputmode: "numeric", format: "amount" } },
  ];
  const states = [
    { ko: "기본", en: "enabled" },
    { ko: "포커스", en: "focused", focus: true },
    { ko: "오류", en: "invalid", invalid: true },
    { ko: "오류 + 포커스", en: "invalid · focused", invalid: true, focus: true },
    { ko: "비활성", en: "disabled", disabled: true },
    { ko: "읽기 전용", en: "readonly", readonly: true },
  ];
  const stateHead = `<div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">상태</div>${
    stateCols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
  }</div>`;
  const statePanel = panel(
    "상태 — 기본 · 포커스 · 오류 · 비활성 · 읽기 전용",
    "포커스 칸은 그 순간을 멈춰 그렸다 — 칸은 모두 실제 입력이라 눌러서 포커스해도 같은 모습이다. 포커스는 마우스 · 터치로 눌러도 보인다(캐럿과 함께 지금 쓰는 칸을 알린다). 포커스 · 오류의 2px 는 상자 안쪽에 덧그려(::after) 내용이 밀리지 않고, 색만 100ms(d2)로 나타난다 — 포커스 stroke-neutral-contrast, 오류 stroke-critical-solid. 오류는 포커스해도 빨간 2px 그대로다. 비활성은 bg-disabled 바탕에 글자 · 아이콘 fg-disabled, 읽기 전용은 bg-disabled 바탕에 값이 진한 그대로이고 포커스 테두리가 없다 — 둘 다 흐리게 하지 않는다. 밑줄형은 바탕이 없어 비활성은 글자로, 읽기 전용은 값 · placeholder 를 fg-neutral-muted 로 가른다.",
    `
      <div class="cb-matrix ptf-matrix" style="--cb-cols: ${stateCols.length};">
        ${stateHead}${states.map(s => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(s.ko)}<span>${escape(s.en)}</span></div>${
          stateCols.map(c => `<div class="cb-matrix-cell">${textInput({ size: "large", ...c.input, label: `${c.ko} — ${s.ko}`, invalid: !!s.invalid, disabled: !!s.disabled, readonly: !!s.readonly, focus: !!s.focus })}</div>`).join("")
        }</div>`).join("")}
      </div>`,
  );

  // 5. 붙이개 · 지우기
  const search = (size, value = "") => textInput({ size, label: "메모 검색", placeholder: "메모 검색", value, prefixIcon: "search", clearable: true });
  const affixPanel = panel(
    "붙이개 · 지우기",
    "칸 안 앞 · 뒤에 글자나 아이콘을 둔다 — 글자는 칸 글자와 같은 크기의 fg-neutral-subtle, 아이콘은 large 20 · medium 16 의 fg-neutral-muted 이고 칸과 사이 10 · 8 이다. 단위는 라벨에 \"(원)\" 으로 붙이지 않고 뒤 글자로 둔다 — 단위 글자는 칸의 설명으로도 읽힌다. 금액은 쓰는 동안 천 단위 쉼표를 넣는다(숫자 키보드 inputmode=\"numeric\"). 지우기는 lucide circle-x(large 22 · medium 18 · fg-neutral-subtle)이고 값이 있고 막히지 않았을 때만 있다 — 누르면 값을 비우고 입력에 포커스를 둔다. Tab 순서에는 없다. 붙이개 · 여백을 눌러도 입력으로 포커스가 간다. 써 보고 지워 볼 수 있다.",
    samples([
      sample("앞 글자 — https://", "prefix=\"https://\"", textField({ label: "웹사이트", control: { kind: "input", size: "large", prefix: "https://", value: "porest.app", inputmode: "url" } })),
      sample("뒤 글자 — 원 · 쉼표", "suffix=\"원\" · inputMode=\"numeric\"", textField({ label: "금액", control: { kind: "input", size: "large", suffix: "원", value: "12,000", inputmode: "numeric", format: "amount" } })),
      sample("앞 · 뒤 글자 — 만 ~ 세", "prefix=\"만\" · suffix=\"세\"", textField({ label: "나이", control: { kind: "input", size: "large", prefix: "만", suffix: "세", value: "32", inputmode: "numeric" } })),
      sample("앞 아이콘 · 지우기 — 값이 있을 때", "prefixIcon={<Search />} · clearable", search("large", "회의")),
      sample("지우기 — 값이 없으면 없다", "빈 칸 · clearable", search("large")),
      sample("medium — 아이콘 16 · 지우기 18", "size=\"medium\" · 사이 8", search("medium", "회의")),
    ]),
  );

  // 6. Textarea — 자동 높이 · 고정 높이 · 상태
  const reason = "가족 행사 참석으로 연차를 씁니다.\n인수인계 문서는 결재 전에 팀 채널에 올려 두었습니다.\n급한 일은 비상 연락처로 연락 주세요.";
  const notice = "10월 사내 시스템 점검 안내입니다.\n10월 12일(토) 오전 2시부터 6시까지 결재 · 근태 화면을 쓸 수 없습니다.\n점검 중 올린 신청은 저장되지 않으니 점검이 끝난 뒤에 다시 올려 주세요.\n문의는 경영지원팀으로 부탁드립니다.";
  const rejection = "같은 기간에 팀 휴가가 겹쳐 반려합니다.";
  const textareaPanel = panel(
    "Textarea — 자동 높이 · 고정 높이",
    "상자 · 테두리 · 상태는 입력칸의 상자형과 같고, 여백 · 높이는 입력(<textarea>)이 가진다 — large 위아래 14 · 좌우 16 · 글자 16/22 · 모서리 12, medium 12 · 14 · 14/19 · 8. 자동 높이(기본)는 3줄(94 · 82)에서 시작해 쓴 만큼 바로 자라고(움직임 없이), 최대 높이를 정하면 그 높이부터 칸 안에서 스크롤한다. 고정 높이는 자리마다 높이를 정하고(2줄 72 · 62 보다 낮게 두지 않는다) 넘치는 글은 칸 안에서 스크롤한다. 손잡이(resize)는 없다. 써 보면 칸이 자란다.",
    samples([
      sample("자동 높이 · large — 3줄 94 에서", "autoSize(기본) · maxGraphemeCount={1000}", textField({ label: "휴가 사유", max: 1000, control: { kind: "textarea", size: "large", placeholder: "예: 가족 행사 참석" } })),
      sample("자동 높이 — 쓴 만큼 자란다", "글이 길면 상자가 자란다 — 움직임 없이", textField({ label: "휴가 사유", max: 1000, control: { kind: "textarea", size: "large", value: reason } })),
      sample("고정 높이 · large — 2줄 72", "autoSize={false} — 넘치면 칸 안에서 스크롤", textField({ label: "공지 본문", control: { kind: "textarea", size: "large", autoSize: false, value: notice } })),
      sample("medium — 3줄 82 에서", "size=\"medium\" — 1280 이상 데스크톱 웹만", textField({ label: "메모", max: 100, control: { kind: "textarea", size: "medium", value: "점심 · 김밥천국 강남점" } })),
      sample("오류 — 비운 채 제출", "invalid · errorMessage — 글자 수도 빨갛다", textField({ label: "탈퇴 사유", max: 200, invalid: true, error: "탈퇴 사유를 입력해주세요.", control: { kind: "textarea", size: "large", placeholder: "예: 쓰지 않는 기능이 많아요" } })),
      sample("읽기 전용", "readOnly — 바탕 bg-disabled · 값은 진한 그대로", textField({ label: "반려 사유", readonly: true, control: { kind: "textarea", size: "large", value: rejection } })),
      sample("비활성", "disabled — 바탕 bg-disabled · 글자 fg-disabled", textField({ label: "반려 사유", disabled: true, control: { kind: "textarea", size: "large", value: rejection } })),
    ]),
  );

  // 7. 폼 — Desk 거래 추가(폰 · large) · HR 휴가 신청(데스크톱 웹 · medium). 제출 버튼은 페이지 끝 스크립트가 비운 필수 입력칸을 검증한다.
  // 고르는 칸은 03h 의 Select · Input Button 이다(비교 페이지 결정 — 카테고리 · 날짜 · 기간은 Input Button, 결제 수단 · 휴가 정책은 Select). 값이 있어 제출 시 검증에 들지 않는다
  const deskRows = [
    { label: "금액", required: true, requiredMessage: "금액을 입력해주세요.", control: { kind: "input", size: "large", value: "12,000", suffix: "원", inputmode: "numeric", format: "amount" } },
    { label: "카테고리", required: true, control: { kind: "inputButton", size: "large", value: "식비 · 카페", prefixIcon: "coffee", suffixIcon: "chevronDown" } },
    { label: "날짜", required: true, control: { kind: "inputButton", size: "large", value: "10월 1일 (목)", suffixIcon: "calendarDays" } },
    { label: "결제 수단", required: true, control: { kind: "select", size: "large", value: "현대카드 M", prefixIcon: "creditCard" } },
    { label: "메모", max: 100, control: { kind: "textarea", size: "large", placeholder: "예: 친구와 점심" } },
  ];
  const hrPolicy = { label: "휴가 정책", required: true, control: { kind: "select", size: "medium", value: "연차" } };
  const hrPeriod = { label: "기간", required: true, control: { kind: "inputButton", size: "medium", value: "10월 12일 (월)~10월 14일 (수)", suffixIcon: "calendarDays" } };
  const hrHoliday = { label: "휴가지", control: { kind: "input", size: "medium", placeholder: "예: 제주", clearable: true } };
  const hrPhone = { label: "비상 연락처", required: true, requiredMessage: "비상 연락처를 입력해주세요.", control: { kind: "input", size: "medium", value: "010-1234-5678", inputmode: "tel" } };
  const hrRows = [
    { label: "제목", required: true, requiredMessage: "제목을 입력해주세요.", description: "결재 목록에 이 제목으로 보여요.", control: { kind: "input", size: "medium", value: "개인 사유", placeholder: "예: 개인 사유" } },
    [hrPolicy, hrPeriod],
    [hrHoliday, hrPhone],
    { label: "휴가 사유", required: true, requiredMessage: "휴가 사유를 입력해주세요.", max: 1000, control: { kind: "textarea", size: "medium", value: "가족 행사 참석으로 연차를 씁니다.\n인수인계 문서는 결재 전에 팀 채널에 올려 두었습니다." } },
  ];
  const formsPanel = panel(
    "폼 — 거래 추가(폰) · 휴가 신청(데스크톱 웹)",
    "Field 는 24 간격으로 쌓고, 라벨과 값이 짧은 두 칸만 16 간격으로 나란히 둔다(768 미만은 한 줄에 하나). 한 폼 안에서 크기를 섞지 않는다 — 폰은 large, 1280 이상 데스크톱 웹은 medium. 두 폼 모두 칸의 2/3 이상이 필수라 선택 칸에만 \"선택\" 을 붙였다. 저장 · 신청 버튼은 켜 둔다 — 필수 칸을 비우고 누르면 그 칸마다 오류가 설명 자리를 대신하고 첫 오류 칸으로 포커스가 간다. 다시 쓰면 오류가 걷힌다. 고르는 칸은 03h 의 두 컴포넌트다 — 카테고리 · 날짜 · 기간은 격자 · 달력을 여는 Input Button, 결제 수단 · 휴가 정책은 칸 아래 목록을 여는 Select 다. 상자가 입력칸과 같아 한 폼에 섞여도 줄이 맞는다.",
    samples([
      sample("Desk 거래 추가 — 폰 · large", "금액(뒤 글자 원) · 카테고리 · 날짜(Input Button) · 결제 수단(Select) · 메모(선택 · 0/100)", screen("거래 추가", deskRows, {
        actions: `
            <div class="ptf-screen-actions"><button class="btn btn-neutral-solid btn-size-large ptf-form-cta" type="button" data-ptf-submit="">저장</button></div>`,
      })),
      sample("HR 휴가 신청 — 데스크톱 웹 · medium", "제목 · 휴가 정책(Select) | 기간(Input Button) · 휴가지(선택) | 비상 연락처 — 사이 16 · 휴가 사유", screen("휴가 신청", hrRows, {
        desktop: true,
        actions: `
            <div class="ptf-screen-actions ptf-screen-actions--end"><button class="btn btn-neutral-weak" type="button">임시 저장</button><button class="btn btn-brand-solid" type="button" data-ptf-submit="">신청</button></div>`,
      })),
    ], "ptf-samples ptf-samples--forms"),
  );

  const lede = "SEED Text Field 구조 — Field 가 입력 하나를 감싸 라벨(16 · 500) · 필수 점 또는 \"선택\" · 설명 · 오류 · 글자 수를 한 모양으로 붙인다(사이 8). 입력칸(Text Input)은 투명 바탕에 안쪽 1px stroke-neutral-weak 이고, 포커스는 안쪽 2px stroke-neutral-contrast(마우스로 눌러도), 오류는 안쪽 2px stroke-critical-solid 다 — 포커스해도 빨갛다. 비활성 · 읽기 전용은 bg-disabled 바탕이고 흐리게 하지 않는다. 크기는 large 52(폰 · 앱) · medium 40(1280 이상 데스크톱 웹), 웹의 기본은 반응형이다. 화면에 입력이 하나뿐이면 밑줄형을 쓴다. Textarea 는 같은 상자에서 3줄부터 자란다. 브랜드 색은 쓰지 않는다 — 세 미리보기가 같은 모습이다. 옛 회색 채운 칸 · 브랜드 포커스 링 · 초록 맞음 테두리 · 빨간 별표는 없다.";

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03g — Text Field</div>
      <h2 class="section-title">Field · Input · Textarea — 머리 · 입력 · 꼬리 · 모양 2 × 크기 2 · 상태 5</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${basicsPanel}
    ${marksPanel}
    ${variantsPanel}
    ${statePanel}
    ${affixPanel}
    ${textareaPanel}
    ${formsPanel}
  </section>`;
}

// 달력 — 여는 자리 그림(03h · 03k)에 넣는 자리만 그린 달력이다. 크기 · 고른 날의 모양은 Date Picker 차례에 정한다. 2026년 10월 1일은 목요일이라 앞 4칸이 빈다
const pickCalendar = ({ picked = [], range = [] } = {}) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
    const cls = ["pib-cal-day", picked.includes(d) && "pib-cal-day--picked", range.includes(d) && "pib-cal-day--range"].filter(Boolean).join(" ");
    return `<span class="${cls}"><span>${d}</span></span>`;
  });
  const blanks = Array.from({ length: 4 }, () => '<span class="pib-cal-day" aria-hidden="true"></span>');
  const nav = (icon, name) => `<button class="btn btn-ghost btn-ghost-subtle btn-icon-only btn-size-small" type="button" aria-label="${name}">${PICK_ICON[icon]}</button>`;
  return `<div class="pib-cal">
            <div class="pib-cal-head">${nav("chevronLeft", "이전 달")}<span class="pib-cal-month">2026년 10월</span>${nav("chevronRight", "다음 달")}</div>
            <div class="pib-cal-grid">${["일", "월", "화", "수", "목", "금", "토"].map(d => `<span class="pib-cal-dow">${d}</span>`).join("")}${blanks.join("")}${days.join("")}</div>
          </div>`;
};

// Input Button 의 여는 자리 — 폰(1280 미만)은 Bottom Sheet(위에 고를 값의 종류를 제목으로 · 닫기 28 원 · 아래 "완료" large 48 폭 전체),
// 데스크톱 웹(1280 이상)은 칸 아래 8 · 왼쪽 맞춤 Popover(고르는 패널이라 머리 없이 본문 · 아래 "완료" small 36 오른쪽).
// 시트 · 팝오버는 03k 의 도우미(bottomSheet · overlayPopover)로 그린다 — 뒤 화면의 칸은 열린 채(aria-expanded)다. 03h · 03k 가 함께 쓴다
const pickSurfaceMock = {
  phone: () => overlayFrame({
    device: "phone",
    height: 600,
    page: overlayPage({ title: "거래 추가", body: textField({ label: "날짜", control: { kind: "inputButton", size: "large", value: "10월 1일 (목)", suffixIcon: "calendarDays", expanded: true } }) }),
    layers: [overlayScrim(), overlayLayer("sheet", bottomSheet({ title: "날짜", body: pickCalendar({ picked: [8] }), footer: [overlayButton("완료", { size: "large" })] }))],
  }),
  desktop: () => overlayFrame({
    device: "desktop",
    height: 560,
    page: overlayPage({
      title: "휴가 신청",
      desktop: true,
      body: overlayAnchor(
        textField({ label: "기간", control: { kind: "inputButton", size: "medium", value: "10월 12일 (월)~10월 14일 (수)", suffixIcon: "calendarDays", expanded: true } }),
        overlayPopover({ label: "기간 고르기", body: pickCalendar({ picked: [12, 14], range: [13] }), footer: [overlayButton("완료")] }),
      ),
    }),
  }),
};

// Select · Input Button 갤러리 — 트리거 · 크기 · 상태 · 목록 · 여럿 고르기 · 붙이개 · 여는 자리 일곱 판을 흰 표면(.vignette-card) 위에 그린다.
// 견본 틀(.ptf-samples · .ptf-cap · .ptf-now)과 상태 표(.cb-matrix · .ptf-matrix)는 Text Field 갤러리 것을 그대로 쓴다.
// 글은 Desk(거래 추가 · 예산 · 할부 · 알림)와 HR(휴가 신청 · 결재)에서 빌렸다 — select.md · input-button.md 코드 예와 같은 글이다.
// 열린 목록 · 누름 · 포커스 · 시트 · 팝오버는 그 순간을 멈춰 그렸다 — 칸은 실제 버튼이라 올리고 눌러 보면 바탕 · 축소가 보인다(여는 자리는 열지 않는다).
export function renderPickGallery(brand) {
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  const samples = (items, cls = "ptf-samples") => `
      <div class="${cls}">${items.join("")}
      </div>`;
  const sample = (cap, en, body) => `
        <div class="ptf-sample">
          <div class="ptf-cap">${escape(cap)}<span>${escape(en)}</span></div>
          ${body}
        </div>`;
  const select = (label, control, field = {}) => textField({ label, ...field, control: { kind: "select", size: "large", ...control } });
  const pickButton = (label, control, field = {}) => textField({ label, ...field, control: { kind: "inputButton", size: "large", ...control } });
  const date = { value: "10월 1일 (목)", suffixIcon: "calendarDays" };

  // 1. 트리거 — 같은 상자 · 셰브론 · 뒤 아이콘
  const triggerPanel = panel(
    "트리거 — 같은 상자 · 셰브론 · 뒤 아이콘",
    "Select 와 Input Button 은 같은 상자다 — Text Input 의 상자형과 높이 · 모서리 · 여백 · 글자가 같아 한 폼에 섞여도 줄이 맞는다. 값은 16 · 400 · fg-neutral, 고르기 전의 글은 \"{값의 종류} 선택\" 꼴의 fg-placeholder 다 — 라벨만 그대로 두지 않는다. Select 는 오른쪽 셰브론(chevron-down 20 · fg-neutral-muted)이 칸 아래 목록이 열리는 것을 알리고, 열리면 180° 돈다. Input Button 은 뒤 아이콘이 무엇이 열리는지 알린다 — 달력 · 시계 · 목록이나 격자는 아래 화살표. 앞 아이콘(20 · fg-neutral-muted)은 값의 종류를 함께 알릴 때 두고, Select 는 하나를 고르면 그 선택지의 아이콘이 트리거로 온다. 칸은 늘 Field 의 라벨과 함께 쓰고, 오류는 칸 안쪽 2px stroke-critical-solid 와 칸 아래 Field 의 오류 글이 알린다.",
    samples([
      sample("Select — 고른 값 · 앞 아이콘", "Select · 고른 선택지의 prefixIcon", select("결제 수단", { value: "현대카드 M", prefixIcon: "creditCard" })),
      sample("Select — 고르기 전", "placeholder=\"휴가 정책 선택\"", select("휴가 정책", { placeholder: "휴가 정책 선택" })),
      sample("Input Button — 달력을 연다", "suffixIcon={<CalendarDays />}", pickButton("날짜", date)),
      sample("Input Button — 고르기 전", "placeholder=\"날짜 선택\"", pickButton("날짜", { placeholder: "날짜 선택", suffixIcon: "calendarDays" })),
      sample("오류 — Select", "invalid · errorMessage — 오류 글은 Field 가 칸 아래에", select("휴가 정책", { placeholder: "휴가 정책 선택" }, { invalid: true, error: "휴가 정책을 골라주세요." })),
      sample("오류 — Input Button", "invalid · errorMessage", pickButton("날짜", { placeholder: "날짜 선택", suffixIcon: "calendarDays" }, { invalid: true, error: "날짜를 골라주세요." })),
    ]),
  );

  // 2. 크기 — large · medium · 반응형. 목록은 크기마다 바뀌는 값(묶음 제목 · 앞 아이콘 · 한 줄 · 설명 · 체크)을 다 담게 짧게 짰다.
  // 반응형은 지금 폭을 아래 글로 알린다(CSS 가 1280 에서 바꾼다)
  const payShort = [
    { label: "카드", items: [{ label: "현대카드 M", icon: "creditCard", selected: true }, { label: "신한카드 Deep", icon: "creditCard" }] },
    { label: "계좌", items: [{ label: "국민 주계좌", description: "123-45-6789", icon: "landmark" }] },
  ];
  const sizePanel = panel(
    "크기 — large · medium · 반응형",
    "large 는 폰 · 앱에서 쓴다 — 트리거 52 · 모서리 12 · 좌우 16 · 사이 10 · 글자 16/22 · 아이콘 20, 선택지 46(위아래 12 · 사이 12 · 앞 아이콘 22 · 체크 14) · 묶음 제목 14 · 500. medium 은 1280 이상 데스크톱 웹(마우스)에서만 쓴다 — 트리거 40 · 8 · 14 · 8 · 14/19 · 16, 선택지 39(10 · 8 · 18 · 12) · 묶음 제목 13 · 400. 한 줄 설명이 붙은 선택지는 66 · 57 이다(설명 13 · 12). 웹의 기본 responsive 는 1280 미만 large · 이상 medium 이고 앱은 늘 large 다. 트리거와 목록은 같은 크기를 쓰고, 한 폼 안에서 크기를 섞지 않는다.",
    samples([
      sample("Select · large — 트리거 52 · 선택지 46 · 설명 66", "size=\"large\" — 폰 · 앱", select("결제 수단", { value: "현대카드 M", prefixIcon: "creditCard", groups: payShort })),
      sample("Select · medium — 트리거 40 · 선택지 39 · 설명 57", "size=\"medium\" — 1280 이상 데스크톱 웹만", select("결제 수단", { size: "medium", value: "현대카드 M", prefixIcon: "creditCard", groups: payShort })),
      sample("Input Button · large — 52", "size=\"large\" — 아이콘 20", pickButton("날짜", date)),
      sample("Input Button · medium — 40", "size=\"medium\" — 아이콘 16", pickButton("날짜", { ...date, size: "medium" })),
      sample("반응형 — 웹 기본", "size=\"responsive\" — 1280(--breakpoint-lg)에서 바뀐다", `<div class="ptf-form">${select("결제 수단", { size: "responsive", value: "현대카드 M", prefixIcon: "creditCard" })}${pickButton("날짜", { ...date, size: "responsive" })}</div>
          <p class="ptf-now" aria-hidden="true"></p>`),
    ]),
  );

  // 3. 상태 — 누름 · 포커스 · 열림은 그 순간을 멈춰 그렸다(--pressed · --focus · aria-expanded)
  const stateCols = [
    { ko: "Select · 값", en: "Select — value · prefixIcon", kind: "select", args: { value: "현대카드 M", prefixIcon: "creditCard" } },
    { ko: "Select · 빈 칸", en: "Select — placeholder", kind: "select", args: { placeholder: "결제 수단 선택" } },
    { ko: "Input Button · 값", en: "InputButton — value · suffixIcon", kind: "inputButton", args: date },
    { ko: "Input Button · 빈 칸", en: "InputButton — placeholder", kind: "inputButton", args: { placeholder: "날짜 선택", suffixIcon: "calendarDays" } },
  ];
  const states = [
    { ko: "기본", en: "enabled" },
    { ko: "누름", en: "pressed — 호버는 바탕만", interaction: "pressed" },
    { ko: "포커스", en: "focused — 키보드만", interaction: "focus" },
    { ko: "열림", en: "open", open: true },
    { ko: "오류", en: "invalid", invalid: true },
    { ko: "비활성", en: "disabled", disabled: true },
    { ko: "읽기 전용", en: "readonly", readonly: true },
  ];
  const stateCell = (c, s) => {
    const args = { size: "large", ...c.args, label: `${c.ko} — ${s.ko}`, interaction: s.interaction || "", invalid: !!s.invalid, disabled: !!s.disabled, readonly: !!s.readonly };
    if (c.kind === "select") return selectTrigger({ ...args, open: !!s.open });
    // Input Button 은 열려도 모습이 그대로다 — 열린 시트 · 팝오버가 알린다
    return s.open ? '<span class="psel-na">모습 그대로 — 열린 시트 · 팝오버가 알린다</span>' : inputButton(args);
  };
  const stateHead = `<div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">상태</div>${
    stateCols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
  }</div>`;
  const statePanel = panel(
    "상태 — 기본 · 누름 · 포커스 · 열림 · 오류 · 비활성 · 읽기 전용",
    "누름 · 포커스 · 열림은 그 순간을 멈춰 그렸다 — 칸은 실제 버튼이라 올리고 눌러 보면 같은 모습이다. 누르면 바탕이 bg-layer-default-pressed 로 칠해지고 값 · 아이콘만 2px 거리로 준다(기준 길이 max(높이, 폭 ÷ 4, 24)) — 테두리 · 바탕은 줄지 않는다. 마우스를 올리면 같은 바탕이고 축소는 없다. 포커스는 키보드로 왔을 때만 바깥 링 2px · 띄움 2px stroke-focus-ring 이다 — 마우스 · 터치로 눌러서는 링이 없고, 입력 중임을 알리는 Text Input 의 안쪽 2px 테두리와도 다르다. Select 는 열리면 셰브론이 180° 돈다(열 때 150ms · 닫을 때 100ms). Input Button 은 열려도 모습이 그대로다. 오류는 안쪽 2px stroke-critical-solid 이고 눌러도 그대로다. 비활성은 bg-disabled 바탕에 글자 · 아이콘 fg-disabled, 읽기 전용은 bg-disabled 바탕에 값이 진한 그대로다 — 포커스는 되고 열리지 않아 누름 · 호버가 없다. 둘 다 흐리게 하지 않는다.",
    `
      <div class="cb-matrix ptf-matrix" style="--cb-cols: ${stateCols.length};">
        ${stateHead}${states.map(s => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(s.ko)}<span>${escape(s.en)}</span></div>${
          stateCols.map(c => `<div class="cb-matrix-cell">${stateCell(c, s)}</div>`).join("")
        }</div>`).join("")}
      </div>`,
  );

  // 4. 목록 — 묶음 · 선 · 설명 · 고름 · 알약 · 비활성. "없음" 은 맨 앞 따로 묶음(select.md "없음" 을 답으로 받기)
  const payGroups = (picked, active = "") => [
    { items: [{ label: "결제 수단 없음", icon: "circleSlash" }] },
    { label: "카드", items: [{ label: "현대카드 M", icon: "creditCard" }, { label: "신한카드 Deep", icon: "creditCard" }] },
    { label: "계좌 · 현금", items: [
      { label: "국민 주계좌", description: "123-45-6789", icon: "landmark" },
      { label: "현금", icon: "banknote" },
      { label: "우리 적금", description: "만기 전에는 쓸 수 없는 계좌", icon: "landmark", disabled: true },
    ] },
  ].map(g => ({ ...g, items: g.items.map(i => ({ ...i, selected: i.label === picked, interaction: i.label === active ? "focus" : "" })) }));
  const itemStates = [{ items: [
    { label: "기본", description: "바탕 없음" },
    { label: "누름", description: "좌우 8 들어온 알약 + 콘텐츠 2px 거리 축소", interaction: "pressed" },
    { label: "호버 · 키보드 위치", description: "같은 알약 — 축소 없음", interaction: "focus" },
    { label: "고름", description: "오른쪽 체크만 — 바탕 · 굵기는 그대로", selected: true },
    { label: "비활성", description: "글 · 설명 · 아이콘 · 체크 fg-disabled — 알약 없음", disabled: true },
    { label: "비활성 · 고름", description: "고른 채 막힌 선택지 — 체크도 fg-disabled", disabled: true, selected: true },
  ] }];
  const listPanel = panel(
    "목록 — 묶음 · 선 · 설명 · 고른 표시 · 알약",
    "목록은 트리거 폭 그대로 아래 8 에 붙어 열린다(아래가 모자라면 위로) — 폰에서도 시트로 바꾸지 않는다. 모서리 20 · bg-layer-floating · shadow-s3 · 위아래 8 이고, 높이는 480 까지다(넘치면 목록 안에서 스크롤). 묶음이 둘 이상이면 사이에 1px stroke-neutral-subtle 선을 좌우 16 들여 저절로 긋는다 — 묶음 사이는 8 + 1 + 8 이고 선택지 사이에는 선이 없다. 묶음 제목은 14 · 500 · fg-neutral-subtle 이다. 선택지 글은 16 · 400 · fg-neutral 이고 목록 안에서는 줄바꿈된다 — 한 줄 설명은 13 · fg-neutral-subtle. 고른 선택지는 오른쪽 체크(lucide check 14 · 선 2.5 · fg-neutral)만이다 — 바탕 · 굵기는 바꾸지 않는다. 누르면 좌우 8 들어온 알약(모서리 12 · bg-layer-floating-pressed)에 콘텐츠가 2px 거리로 주고, 마우스를 올리거나 키보드로 짚은 선택지는 같은 알약이다(축소 없음 — 링은 더하지 않는다, SEED 그대로). 막힌 선택지는 글 · 설명 · 아이콘 · 체크가 fg-disabled 이고 알약이 생기지 않는다. \"없음\" 이 답이 될 수 있는 칸은 \"결제 수단 없음\" 처럼 \"{칸 이름} 없음\" 을 맨 앞 따로 묶음에 둔다.",
    samples([
      sample("열린 목록 — 묶음 · 선 · 설명 · 고름 · 키보드 위치 · 비활성", "SelectGroup label · SelectItem description · aria-activedescendant", select("결제 수단", { value: "현대카드 M", prefixIcon: "creditCard", groups: payGroups("현대카드 M", "신한카드 Deep") })),
      sample("선택지 상태 — 그 순간을 멈춰 그렸다", "SelectItem — pressed · hover · focus · selected · disabled", selectList({ size: "large", label: "선택지 상태", groups: itemStates })),
    ]),
  );

  // 5. 여럿 고르기 · 앞 아이콘 · "없음". 여럿 고른 값의 "외 N개" 는 페이지 끝 스크립트가 칸 폭에 맞춰 고른다
  const budget = (picked) => [{ items: [
    { label: "식비", icon: "utensils" }, { label: "교통", icon: "bus" }, { label: "쇼핑", icon: "shoppingBag" }, { label: "카페", icon: "coffee" }, { label: "주거", icon: "house" },
  ].map(i => ({ ...i, selected: picked.includes(i.label) })) }];
  const multiPanel = panel(
    "여럿 고르기 · 앞 아이콘 · \"없음\"",
    "여럿 고르기는 목록이 열린 채 남아 이어서 고르고, 고른 선택지를 다시 누르면 풀린다 — 고른 선택지마다 오른쪽 체크다. 트리거에는 고른 순서대로 쉼표로 잇고(\"식비, 교통\"), 칸 폭을 넘으면 가장 먼저 고른 값을 남기고 나머지 개수를 붙인다(\"식비 외 2개\" — \"외\" 는 앞의 값을 뺀 개수다). 아래 견본은 칸 폭에 맞춰 글이 바뀐다. 최대 개수는 Field 설명에 적는다. 트리거의 앞 아이콘은 고른 개수로 정한다 — 하나면 그 선택지의 아이콘, 둘 이상이면 트리거에 준 아이콘이다. \"없음\" 을 고르면 값을 고른 것으로 친다 — 트리거에 그 글과 아이콘이 들어가고, 필수 칸이어도 검증을 통과한다. Select 에는 지우기 버튼이 없다.",
    samples([
      sample("여럿 고르기 — 열린 채 이어서 고른다", "multiple · aria-multiselectable — 고른 순서대로", select("포함할 카테고리", { multiple: true, values: ["식비", "교통"], prefixIcon: "tag", groups: budget(["식비", "교통"]) })),
      sample("칸 폭을 넘으면 — 첫 값 외 N개", "formatValue 기본 — 좁은 칸(200)", `<div class="psel-narrow">${select("포함할 카테고리", { values: ["식비", "교통", "쇼핑"], prefixIcon: "tag" }, { description: "최대 3개까지 고를 수 있어요." })}</div>`),
      sample("\"없음\" — 맨 앞 따로 묶음", "고르면 값을 고른 것으로 친다 — 그 글 · 아이콘이 트리거로", select("결제 수단", { value: "결제 수단 없음", prefixIcon: "circleSlash", groups: payGroups("결제 수단 없음") })),
    ]),
  );

  // 6. Input Button — 붙이개 · 지우기
  const cc = (size, value) => pickButton("참조자", { size, value, placeholder: "참조자 선택", prefixIcon: "user", suffixIcon: "chevronDown", clearable: true }, { mark: "optional" });
  const affixPanel = panel(
    "Input Button — 붙이개 · 지우기",
    "칸 안 앞 · 뒤에 글자나 아이콘을 둔다 — 글자는 값과 같은 크기의 fg-neutral-subtle, 아이콘은 large 20 · medium 16 의 fg-neutral-muted 이고 사이는 10 · 8 이다. 뒤 아이콘은 누르면 무엇이 열리는지 알린다 — 달력(calendar) · 시계(clock) · 목록이나 격자(chevron-down). 한 폼 안에서 같은 것을 여는 칸은 같은 아이콘을 쓴다. 값의 종류를 아이콘으로 함께 알리려면 앞 아이콘을 쓴다 — 고른 카테고리의 아이콘처럼 값에 딸린 아이콘도 된다. 지우기는 선택 사항인 칸에 값이 있을 때만 있다 — lucide circle-x(large 22 · medium 18 · fg-neutral-subtle)이고, 값 바로 뒤 · 뒤 붙이개 앞에 놓여 뒤 아이콘이 늘 오른쪽 끝에 있다. 누르면 값만 비우고 아무것도 열지 않는다 — 누름도 지우기만 준다. Tab 순서에는 없고, 누르는 영역은 24 이상이다.",
    samples([
      sample("뒤 아이콘 — 달력", "suffixIcon={<CalendarDays />}", pickButton("날짜", date)),
      sample("뒤 아이콘 — 시계", "suffixIcon={<Clock />}", pickButton("알림 시각", { value: "오후 9:00", suffixIcon: "clock" })),
      sample("앞 아이콘 · 아래 화살표 — 격자", "고른 카테고리의 prefixIcon · suffixIcon={<ChevronDown />}", pickButton("카테고리", { value: "식비 · 카페", prefixIcon: "coffee", suffixIcon: "chevronDown" })),
      sample("뒤 글자 — 단위", "suffix=\"개월\" — 휠을 연다", pickButton("할부 기간", { value: "3", suffix: "개월" })),
      sample("지우기 — 선택 사항인 칸에 값이 있을 때", "onClear — 값 바로 뒤 · 뒤 아이콘 앞", cc("large", "김지원")),
      sample("지우기 — 값이 없으면 없다", "빈 칸 · onClear", cc("large", "")),
      sample("medium — 아이콘 16 · 지우기 18", "size=\"medium\" · 사이 8", cc("medium", "김지원")),
    ]),
  );

  // 7. 여는 자리 — 폰의 시트 · 데스크톱 웹의 팝오버. 시트 · 팝오버는 03k 의 Bottom Sheet · Popover 다(pickSurfaceMock). 달력은 자리만 그린 것이다(Date Picker 차례에 정한다)
  const surfacePanel = panel(
    "여는 자리 — 1280 미만 시트 · 이상 팝오버 · \"완료\"",
    "여는 자리는 화면 폭으로 정한다 — 칸 크기가 바뀌는 폭(1280)과 같다. 1280 미만(폰 · 태블릿 · 앱)은 아래에서 올라오는 Bottom Sheet 로, 위에 고를 값의 종류를 제목으로 두고 오른쪽 위에 닫기(28 원)를 둔다. 1280 이상(데스크톱 웹)은 칸 아래 8 에 붙고 칸 왼쪽에 맞춘 Popover 다(아래가 모자라면 위로) — 고르는 패널이라 머리 없이 본문만이다. 달력 · 시각은 고르는 동안 칸의 값이 바뀌지 않는다 — 고른 날은 시트 · 팝오버 안에만 있다가 \"완료\" 를 누를 때 칸에 들어가고(그림의 8일은 아직 칸에 없다), 바깥을 누르거나 끌어내리거나 Esc 로 닫으면 버린다. 열 때는 칸의 값에서 시작한다. 기간처럼 두 번 고르는 것은 둘을 다 고르기 전에는 \"완료\" 를 막는다. \"완료\" 는 시트에서 Button large 48 폭 전체, 팝오버에서 small 36 오른쪽이다. 목록 · 격자는 누르는 순간 고르고 닫혀 \"완료\" 가 없다. 시트 · 팝오버의 모양은 03k — Bottom Sheet · Popover 이고, 달력의 모양(크기 · 고른 날)만 Date Picker 차례에 정한다 — 달력은 자리만 그렸다.",
    samples([
      sample("폰 — 시트", "useInputButtonSurface() → \"sheet\" · 위에 제목 · 닫기 · 아래 완료", pickSurfaceMock.phone()),
      sample("데스크톱 웹 — 팝오버", "useInputButtonSurface() → \"popover\" · 칸 아래 8 · 왼쪽 맞춤 · 머리 없음", pickSurfaceMock.desktop()),
    ], "ptf-samples ptf-samples--forms"),
  );

  const lede = "SEED Select · Input Button 구조 — 고르는 칸은 둘이다. Select 는 짧은 선택지 5개 이상을 칸 아래 8 에 붙는 목록으로 열고(폰에서도 시트로 바꾸지 않는다), Input Button 은 달력 · 시각 · 아이콘 격자 · 긴 목록을 1280 미만은 시트, 이상은 팝오버로 연다. 트리거는 둘 다 Text Input 의 상자형과 같은 상자다 — large 52 · medium 40, 투명 바탕에 안쪽 1px stroke-neutral-weak. 누르면 바탕이 bg-layer-default-pressed 로 칠해지고 값 · 아이콘만 2px 거리로 준다. 포커스는 키보드에만 바깥 링 2px 이다. 목록은 모서리 20 · bg-layer-floating · shadow-s3 이고, 고른 선택지는 오른쪽 체크만 — 누르거나 짚은 선택지는 좌우 8 들어온 알약이다. 옛 회색 채운 40 칸 · 왼쪽 체크 · 채운 줄은 없다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 포커스 링이 여기서는 중립(fg-neutral)으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03h — Select · Input Button</div>
      <h2 class="section-title">Select · Input Button — 같은 상자 · 크기&nbsp;2 · 상태&nbsp;7 · 목록 · 시트 · 팝오버</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${triggerPanel}
    ${sizePanel}
    ${statePanel}
    ${listPanel}
    ${multiPanel}
    ${affixPanel}
    ${surfacePanel}
  </section>`;
}

// Chip — spec: specs/components/chip.md · 수치 chip.yaml. 구조는 SEED Chip(2026-10-02).
// 칩 .pchip 은 알약 하나다 — 앞 아이콘 .pchip-prefix · 글 .pchip-label · 뒤 아이콘 .pchip-suffix(아이콘만이면 .pchip-icon). 묶음은 .pchip-group 이다.
// 요소는 쓰임이 정한다(chip.md 쓰임 넷) — 하나 고르기 role=radio(묶음 role=radiogroup) · 여럿 고르기 role=checkbox · 제안 · 여는 칩 <button>(여는 칩 aria-haspopup="dialog") ·
// 입력값 .pchip--input 은 칩이 버튼이 아니고(span) 안의 지우기 .pchip-remove(이름 "{글} 지우기")만 버튼이다. aria-pressed 는 쓰지 않는다.
// 고름은 aria-checked(라디오 · 체크박스) · data-selected(걸린 조건의 여는 칩 · 입력값)에서 읽는다. 칩은 실제 버튼이라 올리고 눌러 볼 수 있고,
// data-pchip-live 묶음에서는 고르기 · 제안 · 필터 지우기 · 입력값 지우기를 페이지 끝 스크립트가 흉내 낸다(그 순간을 멈춘 표의 칩은 바뀌지 않는다).
// 아이콘은 lucide(선 2) — 여는 칩 chevron-down · 지우기 x · 필터 지우기 rotate-ccw(chip.md "SEED 와 다른 점"). 크기는 칩 크기가 정한다
const CHIP_ICON = {
  chevronDown: PICK_ICON.chevronDown,
  rotateCcw: listSvg('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
  x: listSvg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
  coffee: PICK_ICON.coffee,
};
const CHIP_VARIANT = { solid: "solid", outlineStrong: "outline-strong", outlineWeak: "outline-weak" };
const CHIP_INTERACTIONS = ["hover", "pressed", "focus"];
let chipSeq = 0;
const nextChipId = () => `pchip-${(chipSeq += 1)}`;

// 칩 하나 — 글(label)은 여기서 escape 한다.
//   kind         button(제안 · 여는 칩 — 기본) · radio(하나 고르기 — chipGroup role=radiogroup 안에서) · check(여럿 고르기) · input(입력값 — 글 + 지우기)
//   variant      solid · outlineStrong · outlineWeak(기본)
//   size         small 32 · medium 36(기본) · large 40
//   selected     고름 — radio · check 는 aria-checked, button 은 data-selected. 입력값은 늘 Outline Weak 고른 모습이다
//   iconOnly     아이콘만(CHIP_ICON 이름) — label 이 이름(aria-label)이 된다
//   prefixIcon · suffixIcon  앞 · 뒤 아이콘(CHIP_ICON 이름) — 뒤 아이콘은 여는 칩의 아래 화살표
//   haspopup     여는 칩 — aria-haspopup="dialog"(그 조건만 시트 · 팝오버로 연다)
//   interaction  hover · pressed · focus — 그 순간을 멈춘 칩(갤러리 전용)
//   tabindex     하나 고르기 묶음의 Tab 자리(고른 칩 0 · 나머지 -1 — chipRadios 가 정한다)
//   data         그 밖의 속성(페이지 끝 스크립트가 읽는 data-* · hidden) · className  갤러리 전용 클래스
export function chip({ kind = "button", variant = "outlineWeak", size = "medium", label = "", selected = false, iconOnly = "", prefixIcon = "", suffixIcon = "", haspopup = false, disabled = false, interaction = "", tabindex = null, data = "", className = "" } = {}) {
  const cls = ["pchip", `pchip--${CHIP_VARIANT[variant]}`, `pchip--${size}`, iconOnly && "pchip--icon-only", kind === "input" && "pchip--input", CHIP_INTERACTIONS.includes(interaction) && `pchip--${interaction}`, className].filter(Boolean).join(" ");
  const icon = (slot, name) => (name ? `<span class="pchip-${slot}" aria-hidden="true">${CHIP_ICON[name]}</span>` : "");
  const text = `<span class="pchip-label">${escape(label)}</span>`;
  // 입력값 — 칩은 span 이고 지우기만 버튼이다(버튼 안에 버튼을 두지 않는다). 막히면 지우기도 막는다
  if (kind === "input") {
    return `<span class="${cls}" data-selected=""${disabled ? ' data-disabled=""' : ""}>${icon("prefix", prefixIcon)}${text}<button type="button" class="pchip-remove" aria-label="${escape(label)} 지우기"${disabled ? " disabled" : ""}>${CHIP_ICON.x}</button></span>`;
  }
  const checkable = kind === "radio" || kind === "check";
  const attrs = attrsOf([
    'type="button"',
    `class="${cls}"`,
    kind === "radio" && 'role="radio"',
    kind === "check" && 'role="checkbox"',
    checkable && `aria-checked="${selected ? "true" : "false"}"`,
    !checkable && selected && 'data-selected=""',
    iconOnly && `aria-label="${escape(label)}"`,
    haspopup && 'aria-haspopup="dialog"',
    tabindex !== null && `tabindex="${tabindex}"`,
    disabled && "disabled",
    data,
  ]);
  return `<button ${attrs}>${iconOnly ? icon("icon", iconOnly) : `${icon("prefix", prefixIcon)}${text}${icon("suffix", suffixIcon)}`}</button>`;
}

// 칩 묶음(Chip Group) — 칩 사이 8(spacing-between-chips).
//   role       radiogroup(하나 고르기) · group(여럿 고르기 · 제안 · 필터 바 · 입력값 — 기본). 이름은 labelledby(Field 라벨) 또는 label(aria-label) — 꼭 단다
//   layout     wrap(줄바꿈 — 폼 · 시트 안, 줄 사이 8 — 기본) · scroll(한 줄 가로 스크롤 — 목록 위 필터 바 · 제안 줄)
//   gutter     스크롤 줄을 화면 끝까지 내고 안쪽 여백을 화면 여백(24)만큼 둔다 — 좌우 24 여백이 있는 틀 안에서만
//   live       페이지 끝 스크립트가 고르기 · 지우기를 흉내 낸다 · fillTarget  제안 칩이 값을 넣을 입력의 id
export function chipGroup({ role = "group", layout = "wrap", gutter = false, label = "", labelledby = "", describedby = "", required = false, live = false, fillTarget = "", items = [] } = {}) {
  const cls = ["pchip-group", layout === "scroll" && "pchip-group--scroll scrollbar-hide", gutter && "pchip-group--gutter"].filter(Boolean).join(" ");
  return `<div ${attrsOf([
    `class="${cls}"`,
    `role="${role}"`,
    labelledby ? `aria-labelledby="${escape(labelledby)}"` : label && `aria-label="${escape(label)}"`,
    describedby && `aria-describedby="${escape(describedby)}"`,
    required && role === "radiogroup" && 'aria-required="true"',
    live && 'data-pchip-live=""',
    fillTarget && `data-pchip-fill-target="${escape(fillTarget)}"`,
  ])}>${items.join("")}</div>`;
}

// 칩 묶음 Field — 라벨이 묶음의 이름이다(aria-labelledby — 칩 묶음에는 <label for> 가 닿지 않는다). 머리 · 꼬리 · 사이 8 은 Text Field 의 Field(.ptf-field) 그대로다.
//   mark         dot(필수 점) · optional("선택") · ""(없음) — 2/3 규칙은 textFieldMarks 가 정한다
//   description  설명 — 묶음의 aria-describedby
//   group        chipGroup 인자(role · layout · live · items …)
export function chipField({ id = nextChipId(), label = "", mark = "", description = "", group = {} } = {}) {
  const labelId = `${id}-label`;
  const descId = description ? `${id}-desc` : "";
  const markHtml = mark === "dot" ? '<span class="ptf-required" aria-hidden="true"></span>' : mark === "optional" ? '<span class="ptf-optional">선택</span>' : "";
  const head = `<div class="ptf-field-header"><span class="ptf-label" id="${labelId}">${escape(label)}${markHtml}</span></div>`;
  const foot = description ? `<div class="ptf-field-footer"><p class="ptf-desc" id="${descId}"><span>${escape(description)}</span></p></div>` : "";
  return `<div class="ptf-field" data-slot="field">${head}${chipGroup({ ...group, labelledby: labelId, describedby: descId })}${foot}</div>`;
}

// 하나 고르기 칩 — 고른 칩 하나만 Tab 자리(0)이고 나머지는 -1 이다(고른 칩이 없으면 첫 칩). 여럿 고르기 칩은 칩마다 Tab 이 선다
const chipRadios = (options, picked, args = {}) => {
  const tabAt = options.includes(picked) ? picked : options[0];
  return options.map(label => chip({ ...args, kind: "radio", label, selected: label === picked, tabindex: label === tabAt ? 0 : -1 }));
};
const chipToggles = (options, picked, args = {}) => options.map(label => chip({ ...args, kind: "check", label, selected: picked.includes(label) }));

// 필터 바 — 걸린 조건이 하나라도 있으면 맨 앞에 필터 지우기(↺ · 아이콘만 · 기본 변형 — chip.md 코드), 조건마다 Solid 여는 칩(뒤 아래 화살표).
// 걸린 조건은 고른 모습에 값을 요약한다("식비 외 2개"). data-pchip-default · data-pchip-value 는 페이지 끝 스크립트가 풀고 거는 글이다(그림은 시트를 열지 않는다)
const chipFilterBar = (conditions) => {
  const active = conditions.some(c => c.on);
  const reset = chip({ iconOnly: "rotateCcw", label: "필터 지우기", data: `data-pchip-reset=""${active ? "" : " hidden"}` });
  return [reset, ...conditions.map(c => chip({
    variant: "solid",
    label: c.on ? c.value : c.label,
    selected: !!c.on,
    suffixIcon: "chevronDown",
    haspopup: true,
    data: `data-pchip-default="${escape(c.label)}" data-pchip-value="${escape(c.value)}"`,
  }))];
};

// 입력값 칩의 글 — 사람 이름(chip.md 코드 예 "더치페이 참여자"). HR 은 결재라인의 결재자다
const chipPeople = (brand) => ({
  label: brand.key === "hr" ? "결재라인" : "참여자",
  description: brand.key === "hr" ? "넣은 순서대로 결재해요." : "",
  names: ["김민지", "박서준", "이도윤"],
});

// Chip 갤러리 — 변형 × 고름 × 상태 · 크기 · 쓰임 넷 · 표면과 묶음 · 화면 다섯 판을 흰 표면(.vignette-card) 위에 그린다.
// 견본 틀(.ptf-samples · .ptf-cap)과 상태 표(.cb-matrix)는 Text Field 갤러리 것을 그대로 쓴다. 글은 Desk(가계부 · 거래 추가 · 예산 · 알림 · 더치페이)와 HR(결재라인)에서 빌렸다 —
// chip.md 코드 예와 같은 글이다. 호버 · 누름 · 포커스 칩은 그 순간을 멈춰 그렸다. 쓰임 · 표면 · 화면의 묶음은 직접 고르고 지워 볼 수 있다(페이지 끝 스크립트).
export function renderChipGallery(brand) {
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  const samples = (items) => `
      <div class="ptf-samples">${items.join("")}
      </div>`;
  const sample = (cap, en, body) => `
        <div class="ptf-sample">
          <div class="ptf-cap">${escape(cap)}<span>${escape(en)}</span></div>
          ${body}
        </div>`;
  // 상태 표 — 줄(머리 글 · 영문) × 칸. 칸마다 칩을 실제 크기로 그린다. 칸이 좁아지면 판(.cb-panel)이 가로로 밀린다
  const matrix = (first, cols, rows, cell) => `
      <div class="cb-matrix pchip-matrix" style="--cb-cols: ${cols.length};">
        <div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">${escape(first)}</div>${
          cols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
        }</div>${rows.map(r => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(r.ko)}<span>${escape(r.en)}</span></div>${
          cols.map(c => `<div class="cb-matrix-cell pchip-cell">${cell(r, c)}</div>`).join("")
        }</div>`).join("")}
      </div>`;
  // 틀 — 실제 화면처럼 흰 바탕 · 좌우 24(갤러리 것). --basement 는 회색 바탕, --narrow 는 줄바꿈을 보이는 좁은 칸
  const frame = (body, mod = "") => `<div class="pchip-frame${mod}">${body}</div>`;
  const people = chipPeople(brand);

  // 1. 변형 × 고름 × 상태 — 호버 · 누름 · 포커스는 그 순간을 멈췄다(.pchip--hover · --pressed · --focus). 비활성 칸의 고른 줄은 고른 채 막힌 칩이다.
  // 하나 고르기 칩(라디오)은 묶음 밖에 홀로 둘 수 없어 표의 Outline 칩은 체크박스로 그렸다 — 모습은 같다
  const variantRows = [
    { ko: "Solid · 안 고름", en: "bg-neutral-weak — 누름 bg-neutral-weak-pressed", args: { variant: "solid", label: "카테고리", suffixIcon: "chevronDown", haspopup: true } },
    { ko: "Solid · 고름", en: "bg-neutral-inverted · fg-neutral-inverted — 누름 bg-neutral-inverted-pressed", args: { variant: "solid", label: "식비 외 2개", suffixIcon: "chevronDown", haspopup: true, selected: true } },
    { ko: "Outline Strong · 안 고름", en: "투명 + 안쪽 1px stroke-neutral-weak — 누름 bg-layer-default-pressed", args: { variant: "outlineStrong", kind: "check", label: "지출" } },
    { ko: "Outline Strong · 고름", en: "bg-neutral-inverted · 테두리 없음 — 누름 bg-neutral-inverted-pressed", args: { variant: "outlineStrong", kind: "check", label: "지출", selected: true } },
    { ko: "Outline Weak · 안 고름", en: "기본 — 안 고른 Outline Strong 과 같다", args: { kind: "check", label: "1일 전" } },
    { ko: "Outline Weak · 고름", en: "bg-neutral-weak + 1px stroke-neutral-contrast — 누름 bg-neutral-weak-pressed", args: { kind: "check", label: "1일 전", selected: true } },
  ];
  const stateCols = [
    { ko: "기본", en: "enabled" },
    { ko: "호버", en: "hovered — 누름 바탕 · 축소 없음", interaction: "hover" },
    { ko: "누름", en: "pressed — 누름 바탕 + 2px 축소", interaction: "pressed" },
    { ko: "포커스", en: "focused — 키보드만 · 링 2px", interaction: "focus" },
    { ko: "비활성", en: "disabled — 고른 줄은 고른 채 막힘", disabled: true },
  ];
  const variantPanel = panel(
    "변형 × 고름 × 상태",
    "Solid 는 옅은 회색 채움(bg-neutral-weak)이고 고르면 짙은 채움(bg-neutral-inverted · fg-neutral-inverted)이다 — 제안 · 필터 바에 쓰고 흰 표면 위에만 둔다. 안 고른 Outline Strong · Outline Weak 는 똑같다 — 투명 바탕에 안쪽 1px stroke-neutral-weak. 고르면 Outline Strong 은 짙은 채움(테두리 없음), Outline Weak(기본)는 옅은 바탕 bg-neutral-weak 에 짙은 1px stroke-neutral-contrast 이고 글자는 그대로다. 마우스를 올리면 누름과 같은 바탕이고(축소 없음), 누르면 그 바탕에 칩 전체가 2px 거리로 준다 — Solid bg-neutral-weak-pressed · Outline bg-layer-default-pressed · 고른 짙은 채움 bg-neutral-inverted-pressed · 고른 Outline Weak bg-neutral-weak-pressed. 포커스는 키보드로 왔을 때만 바깥 링 2px · 띄움 2px stroke-focus-ring 이다. 비활성은 bg-disabled 바탕에 글자 fg-disabled 이고 흐리게 하지 않는다 — 고른 채 막히면 짙은 1px stroke-neutral-solid 가 남아 무엇을 골랐는지 보인다. 호버 · 누름 · 포커스는 그 순간을 멈춰 그렸다 — 칩은 실제 버튼이라 올리고 눌러 보면 같은 모습이다. 고른 칩은 브랜드 색이 아니라 중립색이다.",
    matrix("변형 · 고름", stateCols, variantRows, (r, c) => chip({ ...r.args, interaction: c.interaction || "", disabled: !!c.disabled })),
  );

  // 2. 크기 — 줄마다 배치 하나를 크기 셋으로. 누르는 영역 줄은 ::before(가로 · 세로 44 까지 — 아이콘만 있는 칩은 44 × 44)와 지우기의 24 × 24 를 점선으로 보인다(.pchip-target — 갤러리 전용)
  const sizeCols = [
    { ko: "small", en: "32 · 좌우 12 · 최소 폭 44", size: "small" },
    { ko: "medium", en: "36 · 좌우 14 · 최소 폭 48 — 기본", size: "medium" },
    { ko: "large", en: "40 · 좌우 16 · 최소 폭 52", size: "large" },
  ];
  const sizeRows = [
    { ko: "글자", en: "withText — 14 · 500", make: size => chip({ size, kind: "check", label: "1일 전" }) },
    { ko: "최소 폭 — 글이 짧을 때", en: "minWidth 44 · 48 · 52", make: size => chip({ size, kind: "check", label: "월" }) },
    { ko: "앞 아이콘 + 글자", en: "prefixIcon 14 · 16 · 16 — 글과 6", make: size => chip({ size, kind: "check", label: "카페", prefixIcon: "coffee" }) },
    { ko: "글자 + 뒤 아이콘", en: "suffixIcon 14 · 14 · 16 — 여는 칩", make: size => chip({ size, variant: "solid", label: "기간", suffixIcon: "chevronDown", haspopup: true }) },
    { ko: "아이콘만", en: "iconOnly — 원 32 · 36 · 40 · 아이콘 14 · 16 · 16", make: size => chip({ size, iconOnly: "rotateCcw", label: "필터 지우기" }) },
    { ko: "입력값", en: "지우기 x 14 · 14 · 16 — 글과 6", make: size => chip({ size, kind: "input", label: people.names[0] }) },
    { ko: "누르는 영역 — 점선", en: "칩 44 × 44 까지 · 아이콘만 가로도 44 · 지우기 24 × 24", make: size => `${chip({ size, kind: "check", label: "1일 전", className: "pchip-target" })}${chip({ size, iconOnly: "rotateCcw", label: "필터 지우기", className: "pchip-target" })}${chip({ size, kind: "input", label: people.names[0], className: "pchip-target" })}` },
  ];
  const sizePanel = panel(
    "크기 — small 32 · medium 36 · large 40",
    "크기는 이름이 아니라 높이로 고른다 — small 32 · medium 36(기본) · large 40, 모서리는 full 이다. 글은 세 크기 모두 14 · 500(t4)이고 가장자리와 글 사이는 12 · 14 · 16, 글이 짧아도 폭은 44 · 48 · 52 아래로 줄지 않는다. 앞 아이콘은 14 · 16 · 16, 뒤 아이콘(여는 칩의 아래 화살표)은 14 · 14 · 16, 입력값 칩의 지우기는 14 · 14 · 16 이고 모두 글과 6 떨어진다. 아이콘만 있는 칩은 원(32 · 36 · 40)이고 이름(aria-label)을 단다. 칩은 줄바꿈 · 말줄임하지 않고 글만큼 넓어진다. 누르는 영역은 보이는 칩과 따로 가로 · 세로 44 까지 넓힌다(Button 과 같다) — 글이 있는 칩은 최소 폭이 이미 44 이상이고, 아이콘만 있는 칩은 가로도 44 다. 입력값 칩은 칩이 아니라 지우기만 24 × 24 로 눌린다(점선) — 지우기는 호버 바탕이 없고, 누르면 지우기만 2px 거리로 준다(기준 24). 기본은 폰 폼에서도 medium 이고, small 은 1280 이상 데스크톱의 촘촘한 줄(필터 · 표 위), large 는 화면의 주인공 고르기에만 쓴다.",
    matrix("배치", sizeCols, sizeRows, (r, c) => r.make(c.size)),
  );

  // 3. 쓰임 넷 — 모두 직접 눌러 볼 수 있다(data-pchip-live). 제안 칩은 위 칸에 값을 넣고, 필터 바는 안 걸린 조건을 누르면 예시 값이 걸린다
  const budgetId = nextChipId();
  const quick = [["10만원", 100000], ["30만원", 300000], ["50만원", 500000]];
  const suggestion = `<div class="pchip-stack">${textField({ id: budgetId, label: "한 달 예산", control: { kind: "input", size: "large", value: "300,000", suffix: "원", inputmode: "numeric", format: "amount" } })}${chipGroup({
    layout: "scroll", label: "빠른 금액", live: true, fillTarget: budgetId,
    items: quick.map(([label, v]) => chip({ variant: "solid", label, data: `data-pchip-fill="${v}"` })),
  })}</div>`;
  const filterConds = (on) => [
    { label: "기간", value: "9월" },
    { label: "카테고리", value: "식비 외 2개", on },
    { label: "결제 수단", value: "현대카드 M", on },
    { label: "금액", value: "1만원 이상" },
  ];
  const filterRow = (on) => frame(chipGroup({ layout: "scroll", gutter: true, label: "거래 거르기", live: true, items: chipFilterBar(filterConds(on)) }));
  const usesPanel = panel(
    "쓰임 넷 — 고르기 · 제안 · 필터 바 · 입력값",
    "쓰임마다 요소가 다르다. 하나 고르기는 라디오 묶음(radiogroup)이다 — 고른 칩을 다시 눌러도 풀리지 않고, Tab 은 고른 칩 하나에 서고 화살표로 옮기며 고른다. 거르기의 \"전체\" 는 맨 앞 선택지로 둔다. 여럿 고르기는 체크박스라 다시 누르면 풀리고 칩마다 Tab 이 선다 — \"전체 선택\" 같은 칩은 두지 않는다. 제안은 누르면 칸에 값을 넣는 버튼이라 고른 모습이 없다 — 지금 값은 칸이 보인다. 필터 바는 조건마다 여는 칩(뒤 아래 화살표 · aria-haspopup=\"dialog\")을 두고, 걸린 조건은 짙은 채움에 값을 요약한다(\"식비 외 2개\"). 하나라도 걸리면 맨 앞에 필터 지우기(↺ · 아이콘만)를 둔다 — 그림은 시트를 열지 않아, 안 걸린 조건을 누르면 예시 값이 걸리고 ↺ 로 모두 푼다. 입력값은 Outline Weak 고른 모습에 지우기(lucide x)를 붙인다 — 칩은 버튼이 아니고 지우기만 따로 눌리며 이름은 \"{글} 지우기\" 다. 지우기는 호버 바탕이 없고 누르면 지우기만 2px 거리로 주며, 키보드로 오면 링은 칩 둘레에 그린다. 지우면 포커스가 다음 칩의 지우기(없으면 앞 칩의 지우기)로 간다. aria-pressed 는 쓰지 않는다. 모두 직접 눌러 볼 수 있다.",
    samples([
      sample("하나 고르기 — 라디오", "ChipRadioGroup · outlineStrong — 고른 값이 곧 폼의 갈래", chipField({ label: "거래 종류", group: { role: "radiogroup", required: true, live: true, items: chipRadios(["지출", "수입", "이체"], "지출", { variant: "outlineStrong" }) } })),
      sample("하나 고르기 — \"전체\" 는 맨 앞", "ChipRadioGroup · outlineWeak — 시트 안 거르기", chipField({ label: "기간", group: { role: "radiogroup", live: true, items: chipRadios(["전체", "이번 달", "지난달", "3개월"], "전체") } })),
      sample("여럿 고르기 — 체크박스", "ChipToggle · outlineWeak — 다시 누르면 풀린다", chipField({ label: "알림", description: "고른 때마다 알려줘요.", group: { live: true, items: chipToggles(["당일", "1일 전", "3일 전", "1주 전"], ["당일", "1일 전"]) } })),
      sample("제안 — 누르면 칸에 값을 넣는다", "Chip · solid — 고른 모습이 없다 · 지금 값은 칸이 보인다", suggestion),
      sample("필터 바 — 걸린 조건 없음", "Chip · solid · aria-haspopup=\"dialog\" — 조건마다 칩 · 한 줄 가로 스크롤", filterRow(false)),
      sample("필터 바 — 두 조건이 걸림", "걸린 조건은 짙은 채움 + 값 요약 · 맨 앞 ↺(필터 지우기)", filterRow(true)),
      sample(brand.key === "hr" ? "입력값 — 결재라인" : "입력값 — 더치페이 참여자", "InputChip — Outline Weak 고른 모습 + 지우기 \"{글} 지우기\"", chipField({ label: people.label, description: people.description, group: { live: true, items: people.names.map(name => chip({ kind: "input", label: name })) } })),
    ]),
  );

  // 4. 표면 · 묶음 — Solid 는 흰 표면 위에서만(회색 바탕 위에서는 바탕과 같은 색이다). 줄바꿈은 좁은 칸(220)에서 보인다
  const amounts = () => quick.map(([label]) => chip({ variant: "solid", label }));
  const surfacePanel = panel(
    "표면 · 묶음",
    "Solid 의 옅은 바탕(bg-neutral-weak)은 흰 표면(bg-layer-default) 위에서만 보인다 — 라이트의 회색 바탕(bg-layer-basement)과 같은 gray-200 이라 거기서는 칩이 사라진다. 회색 바탕 위 줄은 Outline Strong · Outline Weak 를 쓴다(다크는 두 색이 달라 보이지만 규칙은 같다). 칩 사이는 8(spacing-between-chips)이다 — 폼 · 시트 안의 고르기 묶음은 줄바꿈하고 줄 사이도 8 이다. 목록 위 필터 바 · 제안 줄은 한 줄 가로 스크롤이고(쓰임의 필터 바 · 화면의 가계부), 줄을 화면 끝까지 내고 안쪽 여백을 화면 여백(spacing-global-gutter 24)만큼 둬 스크롤해도 첫 칩이 여백에서 시작한다. 끝 흐림은 Scroll Fog 차례에 정한다.",
    samples([
      sample("흰 표면 위 — Solid", "bg-layer-default — 옅은 회색 채움이 보인다", frame(chipGroup({ label: "빠른 금액", items: amounts() }))),
      sample("회색 바탕 위 — Solid(하지 않는다)", "bg-layer-basement — 라이트에서 bg-neutral-weak 와 같은 gray-200", frame(chipGroup({ label: "빠른 금액", items: amounts() }), " pchip-frame--basement")),
      sample("회색 바탕 위 — Outline", "outlineStrong · outlineWeak — 테두리 · 짙은 채움이 칩을 알린다", frame(`<div class="pchip-rows">${chipGroup({ role: "radiogroup", label: "거래 종류", live: true, items: chipRadios(["지출", "수입", "이체"], "지출", { variant: "outlineStrong" }) })}${chipGroup({ label: "알림", live: true, items: chipToggles(["당일", "1일 전", "3일 전"], ["당일"]) })}</div>`, " pchip-frame--basement")),
      sample("줄바꿈 — 폼 · 시트 안", "칩 사이 8 · 줄 사이 8 — 좁은 칸(220)", frame(chipGroup({ label: "알림", live: true, items: chipToggles(["당일", "1일 전", "3일 전", "1주 전"], ["당일", "1일 전"]) }), " pchip-frame--narrow")),
    ]),
  );

  // 5. 화면 — Desk 가계부(목록 위 필터 바) · 거래 추가(거래 종류 칩). 2026년 10월 1일은 목요일이다
  const tile = (color, svg) => `<span class="plst-tile plst-tile--${color}">${svg}</span>`;
  const won = (v) => `<span class="plst-amount">${escape(v)}</span>`;
  const day = (text, rows) => {
    const id = nextChipId();
    return `${listHeader({ text, id })}${listOf(rows.map(r => listRow({ prefix: tile(r.color, r.icon), title: r.title, detail: r.detail, suffix: won(r.amount) })), ` aria-labelledby="${id}"`)}`;
  };
  const ledger = `<div class="pchip-phone">
            <div class="pchip-phone-head"><div class="ptf-screen-title">가계부</div></div>
            <div class="pchip-phone-bar">${chipGroup({ layout: "scroll", gutter: true, label: "거래 거르기", live: true, items: chipFilterBar(filterConds(true)) })}</div>
            <div class="pchip-phone-list">${day("10월 1일 (목)", [
              { color: "orange", icon: LIST_ICON.utensils, title: "김밥천국", detail: "식비 · 현대카드 M", amount: "8,000원" },
              { color: "blue", icon: LIST_ICON.bus, title: "버스", detail: "교통 · 현대카드 M", amount: "1,500원" },
            ])}${day("9월 30일 (수)", [
              { color: "violet", icon: LIST_ICON.bag, title: "다이소", detail: "쇼핑 · 현대카드 M", amount: "12,300원" },
            ])}</div>
          </div>`;
  // 거래 추가 — 칸이 모두 필수라 2/3 규칙으로 점 · "선택" 이 붙지 않는다(textFieldMarks). 저장을 누르면 비운 필수 입력칸에 오류가 보인다
  const addFields = [
    { required: true, html: mark => chipField({ label: "거래 종류", mark, group: { role: "radiogroup", required: true, live: true, items: chipRadios(["지출", "수입", "이체"], "지출", { variant: "outlineStrong" }) } }) },
    { required: true, html: mark => textField({ label: "금액", mark, required: true, requiredMessage: "금액을 입력해주세요.", control: { kind: "input", size: "large", value: "8,000", suffix: "원", inputmode: "numeric", format: "amount" } }) },
    { required: true, html: mark => textField({ label: "카테고리", mark, required: true, control: { kind: "inputButton", size: "large", value: "식비", prefixIcon: "utensils", suffixIcon: "chevronDown" } }) },
    { required: true, html: mark => textField({ label: "날짜", mark, required: true, control: { kind: "inputButton", size: "large", value: "10월 1일 (목)", suffixIcon: "calendarDays" } }) },
    { required: true, html: mark => textField({ label: "결제 수단", mark, required: true, control: { kind: "select", size: "large", value: "현대카드 M", prefixIcon: "creditCard" } }) },
  ];
  const addMarks = textFieldMarks(addFields);
  const addForm = `<div class="ptf-screen ptf-screen--phone">
            <div class="ptf-screen-title">거래 추가</div>
            <div class="ptf-form">${addFields.map((f, i) => f.html(addMarks[i])).join("")}</div>
            <div class="ptf-screen-actions"><button class="btn btn-neutral-solid btn-size-large ptf-form-cta" type="button" data-ptf-submit="">저장</button></div>
          </div>`;
  const screensPanel = panel(
    "화면 — 가계부 필터 바 · 거래 추가",
    "가계부는 목록 위 한 줄에 조건마다 Solid 여는 칩을 두고, 걸린 조건(카테고리 · 결제 수단)은 짙은 채움에 값을 요약한다 — 하나라도 걸려 맨 앞에 필터 지우기(↺)가 있다. 걸린 조건 칩의 글이 곧 지금 조건이라 \"필터 2\" 같은 개수는 따로 두지 않는다. 필터 바는 흰 화면 위라 Solid 를 쓴다. 거래 추가는 거래 종류(지출 · 수입 · 이체 — 짧은 선택지 셋)를 Select 로 숨기지 않고 하나 고르기 칩으로 맨 위에 둔다 — 고른 값이 곧 폼의 갈래라 Outline Strong 이다. 칩 묶음은 Field 로 감싸 라벨이 묶음의 이름이 되고, 칩은 폰 폼에서도 medium 36 이다. 저장을 누르면 비운 필수 칸에 오류가 보인다.",
    samples([
      sample("Desk 가계부 — 폰", "ChipGroup layout=\"scroll\" — 화면 끝까지 · 안쪽 여백 24", ledger),
      sample("Desk 거래 추가 — 폰 · large", "거래 종류(ChipRadioGroup · outlineStrong) · 금액 · 카테고리 · 날짜 · 결제 수단", addForm),
    ]),
  );

  const lede = "SEED Chip 구조 — 고르거나 넣은 값을 보이는 작은 알약이다. 하나 고르기(라디오) · 여럿 고르기(체크박스) · 제안(누르면 칸에 값을 넣는 버튼) · 필터 바(조건마다 여는 칩) · 입력값(글 + 지우기)을 맡는다 — 2 ~ 4개 짧은 폼 값이 칩이고, 5개 이상은 Select 다. 크기는 small 32 · medium 36(기본) · large 40, 모서리 full, 글 14 · 500. 변형은 Solid(옅은 회색 채움 — 흰 표면 위에서만) · Outline Strong · Outline Weak(기본) 셋이고, 고른 칩은 브랜드 색이 아니라 중립색이다 — 세 미리보기가 같은 모습이다. 누르면 누름 바탕에 칩 전체가 2px 거리로 준다. 포커스는 키보드에만 바깥 링 2px 이다. 옛 Tag / Chip(브랜드 10% 바탕 · 칩 안의 입력칸)은 없다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 포커스 링이 여기서는 중립(fg-neutral)으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03i — Chip</div>
      <h2 class="section-title">Chip — 변형&nbsp;3 · 크기&nbsp;3 · 상태&nbsp;5 · 쓰임&nbsp;넷</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${variantPanel}
    ${sizePanel}
    ${usesPanel}
    ${surfacePanel}
    ${screensPanel}
  </section>`;
}

// Tabs · Segmented Control — spec: specs/components/tabs.md · 수치 tabs.yaml(Line) · chip-tabs.yaml(Chip Tabs — 칩 하나는 chip.yaml) ·
// specs/components/segmented-control.md · 수치 segmented-control.yaml. 구조는 SEED Tabs · Segmented Control(2026-10-02).
// Line 탭 — 목록 .ptab-list(role=tablist · --fill · --hug × --small · --medium) > 탭 .ptab(role=tab) > 글 .ptab-label(+ 알림 점 .ptab-dot) · 막대 .ptab-indicator(목록에 하나).
// Chip Tabs — 목록 .ptab-chips(role=tablist) > 탭 .pchip(role=tab — 03i 의 칩 그대로) > 글 .pchip-label + 알림 점 .ptab-chip-dot. 칩의 고른 모습은 data-selected 가 칠한다.
// Segmented — 트랙 .pseg(role=radiogroup) > 고른 알약 .pseg-indicator · 칸 .pseg-item(role=radio) > 글 .pseg-label(+ 알림 점 .pseg-dot).
// 고름은 aria-selected(탭) · aria-checked(칸)에서 읽고, Tab 은 고른 탭 · 칸 하나에만 선다(로빙 tabindex). 알림 점은 보조 기술에 "새 소식" · "새 내용" 을 덧붙인다(.ptab-sr-only).
// data-ptab-live 목록 · data-pseg-live 트랙은 페이지 끝 스크립트가 누름 · 화살표로 고르기(막대 · 알약이 미끄러진다) · Hug 스크롤 · 내용 칸 바꾸기 · 거르기를 흉내 낸다 —
// 그 순간을 멈춘 표의 탭 · 칸(.ptab--pressed · --focus, .pseg-item--hover · --pressed · --focus)은 바뀌지 않는다.
let ptabSeq = 0;
const nextPtabId = () => `ptab-${(ptabSeq += 1)}`;
const PTAB_INTERACTIONS = ["pressed", "focus"];
const PSEG_INTERACTIONS = ["hover", "pressed", "focus"];
// 할 일 줄의 앞 아이콘 — lucide circle · circle-check(선 2)
const TODO_ICON = {
  open: listSvg('<circle cx="12" cy="12" r="10"/>'),
  done: listSvg('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
};

// Line 탭 하나 — 글(label)은 여기서 escape 한다.
//   selected     고름 — aria-selected="true" · Tab 자리(tabindex 0)
//   dot          알림 점(글 오른쪽 위 — 탭 폭을 넓히지 않는다). 보조 기술에는 "새 소식" 을 덧붙인다. 고른 탭에는 그리지 않는다(내용을 보면 사라진다 —
//                직접 눌러 보는 목록에서는 페이지 끝 스크립트가 고른 탭의 점을 지운다)
//   disabled     막힌 탭 — 누를 수 없고 화살표 이동에서 건너뛴다
//   interaction  pressed · focus — 그 순간을 멈춘 탭(갤러리 전용)
//   id · controls  탭 id · 이어진 내용 칸(tabpanel) id
export function lineTab({ label = "", selected = false, dot = false, disabled = false, interaction = "", id = "", controls = "" } = {}) {
  const showDot = dot && !selected;
  const cls = ["ptab", PTAB_INTERACTIONS.includes(interaction) && `ptab--${interaction}`].filter(Boolean).join(" ");
  const attrs = attrsOf([
    'type="button"',
    'role="tab"',
    id && `id="${id}"`,
    `aria-selected="${selected ? "true" : "false"}"`,
    controls && `aria-controls="${controls}"`,
    `tabindex="${selected ? 0 : -1}"`,
    `class="${cls}"`,
    disabled && "disabled",
  ]);
  const dotHtml = showDot ? '<span class="ptab-dot" aria-hidden="true"></span>' : "";
  return `<button ${attrs}><span class="ptab-label">${escape(label)}${dotHtml}</span>${showDot ? '<span class="ptab-sr-only"> 새 소식</span>' : ""}</button>`;
}

// Line 목록 — 막대 하나와 탭 HTML 목록(tabs)을 담는다. 이름은 label(aria-label) 또는 labelledby(보이는 제목)
//   layout  fill(칸을 똑같이 나눈다 — 5개까지 · 기본) · hug(글 + 좌우 10 — 6개부터 · 긴 글, 넘치면 가로 스크롤)
//   size    small 40 · 글 14(기본) · medium 44 · 글 16
//   live    페이지 끝 스크립트가 누름 · 화살표로 고르고 내용 칸을 바꾼다
// 막대는 목록의 첫 자식이다(tabs.tsx 와 같다) — 탭(relative)이 그 위에 그려져 키보드 포커스 링이 막대에 가리지 않는다
export function lineTabs({ layout = "fill", size = "small", label = "", labelledby = "", live = false, tabs = [] } = {}) {
  return `<div ${attrsOf([
    `class="ptab-list ptab-list--${layout} ptab-list--${size}"`,
    'role="tablist"',
    labelledby ? `aria-labelledby="${escape(labelledby)}"` : label && `aria-label="${escape(label)}"`,
    live && "data-ptab-live",
  ])}><span class="ptab-indicator" aria-hidden="true"></span>${tabs.join("")}</div>`;
}

// Chip Tabs 의 탭 하나 — 03i 의 칩(.pchip) 그대로다. variant solid = Chip Solid · outline = Chip Outline Strong, size medium 36(기본) · large 40.
// 고르면 aria-selected 와 함께 data-selected 를 달아 칩의 고른 모습(짙은 채움 — Outline 은 테두리를 지운다)을 칠한다. 알림 점은 글 뒤 6(칩 안 사이) · 세로 가운데이고
// 고른 칩에는 그리지 않는다
export function chipTab({ label = "", variant = "solid", size = "medium", selected = false, dot = false, disabled = false, id = "", controls = "" } = {}) {
  const attrs = attrsOf([
    'type="button"',
    'role="tab"',
    id && `id="${id}"`,
    `aria-selected="${selected ? "true" : "false"}"`,
    controls && `aria-controls="${controls}"`,
    `tabindex="${selected ? 0 : -1}"`,
    `class="pchip pchip--${variant === "outline" ? "outline-strong" : "solid"} pchip--${size}"`,
    selected && 'data-selected=""',
    disabled && "disabled",
  ]);
  const mark = dot && !selected ? '<span class="ptab-chip-dot" aria-hidden="true"></span><span class="ptab-sr-only"> 새 소식</span>' : "";
  return `<button ${attrs}><span class="pchip-label">${escape(label)}</span>${mark}</button>`;
}

// Chip Tabs 목록 — 바탕 · 바닥 선 없이 한 줄 가로 스크롤. 칩 사이 8 · 좌우 화면 여백 24 · 위아래 8
export function chipTabs({ label = "", live = false, tabs = [] } = {}) {
  return `<div ${attrsOf([
    'class="ptab-chips"',
    'role="tablist"',
    label && `aria-label="${escape(label)}"`,
    live && "data-ptab-live",
  ])}>${tabs.join("")}</div>`;
}

// Segmented Control — 트랙 하나에 칸 2 ~ 4개. 칸이 트랙 폭을 칸 수(--pseg-n)로 똑같이 나누고, 고른 알약이 고른 칸 번호(--pseg-i)로 미끄러진다. 늘 하나를 골라 둔다.
//   items     [{ label, value, dot, disabled }] — value 는 filter 목록에서 이 칸을 고르면 보일 줄의 표식. 알림 점(dot)은 고른 칸에는 그리지 않는다
//   selected  고른 칸 번호
//   disabled  트랙 전체를 막는다(칸마다 disabled)
//   state     { at, interaction } — at 번째 칸을 그 순간(hover · pressed · focus)으로 멈춘다(갤러리 전용)
//   filter    고르면 거를 목록의 id — 그 목록의 [data-pseg-tags] 줄 가운데 고른 칸의 value 가 없는 줄을 숨긴다
export function segmented({ label = "", items = [], selected = 0, disabled = false, live = false, state = null, filter = "" } = {}) {
  const cells = items.map((it, i) => {
    const frozen = state && state.at === i && PSEG_INTERACTIONS.includes(state.interaction) && `pseg-item--${state.interaction}`;
    const attrs = attrsOf([
      'type="button"',
      'role="radio"',
      `aria-checked="${i === selected ? "true" : "false"}"`,
      `tabindex="${i === selected ? 0 : -1}"`,
      `class="${["pseg-item", frozen].filter(Boolean).join(" ")}"`,
      it.value && `data-pseg-value="${escape(it.value)}"`,
      (disabled || it.disabled) && "disabled",
    ]);
    const dot = it.dot && i !== selected;
    const mark = dot ? '<span class="pseg-dot" aria-hidden="true"></span>' : "";
    return `<button ${attrs}><span class="pseg-label">${escape(it.label)}${mark}</span>${dot ? '<span class="ptab-sr-only"> 새 내용</span>' : ""}</button>`;
  });
  return `<div ${attrsOf([
    'class="pseg"',
    'role="radiogroup"',
    label && `aria-label="${escape(label)}"`,
    disabled && 'aria-disabled="true"',
    live && "data-pseg-live",
    filter && `data-pseg-filter="${escape(filter)}"`,
    `style="--pseg-n: ${items.length}; --pseg-i: ${selected};"`,
  ])}><span class="pseg-indicator" aria-hidden="true"></span>${cells.join("")}</div>`;
}

// Tabs · Segmented Control 갤러리 — Line(폭 × 크기 · 상태) · Chip Tabs · Segmented(칸 수 · 상태 · 알림 점과 긴 글과 막힘) · 화면 여섯 판을 흰 표면(.vignette-card) 위에 그린다.
// 견본 틀(.ptf-samples · .ptf-cap)과 상태 표(.cb-matrix)는 Text Field 갤러리 것을 그대로 쓴다. 글은 tabs.md · segmented-control.md 의 코드 예(통계 · 금액 가리기 · 휴가 신청 ·
// 증권 두 단 · 할 일)와 Desk · HR 화면에서 빌렸다. 누름 · 호버 · 포커스는 표에서 그 순간을 멈춰 그렸고, 나머지 목록 · 트랙은 직접 누르고 화살표로 옮겨 볼 수 있다(페이지 끝 스크립트)
export function renderTabsGallery(brand) {
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  // 견본 칸은 폰 틀(안쪽 360 + 테두리)이 줄지 않는 폭부터 — Text Field 갤러리의 320 칸이면 틀이 354 로 줄어 Fill · Segmented 칸 폭이 스펙과 달라진다
  const samples = (items, cls = "ptab-samples") => `
      <div class="${cls}">${items.join("")}
      </div>`;
  const sample = (cap, en, body, cls = "") => `
        <div class="ptf-sample${cls}">
          <div class="ptf-cap">${escape(cap)}<span>${escape(en)}</span></div>
          ${body}
        </div>`;
  // 상태 표 — 줄(머리 글 · 영문) × 칸. 칸마다 목록 · 트랙을 실제 크기로 그린다. 칸이 좁아지면 판(.cb-panel)이 가로로 밀린다
  const matrix = (cls, first, cols, rows, cell) => `
      <div class="cb-matrix ${cls}" style="--cb-cols: ${cols.length};">
        <div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">${escape(first)}</div>${
          cols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
        }</div>${rows.map(r => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(r.ko)}<span>${escape(r.en)}</span></div>${
          cols.map(c => `<div class="cb-matrix-cell ptab-cell">${cell(r, c)}</div>`).join("")
        }</div>`).join("")}
      </div>`;
  // 폰(안쪽 360) 틀 — 흰 바탕. 탭 목록은 틀 끝까지 가고(좌우 여백은 목록이 가진다), Segmented 는 화면 여백 24 안(.ptab-pad)에 둔다
  const phone = (body) => `<div class="ptab-phone">${body}</div>`;
  const pad = (body) => `<div class="ptab-pad">${body}</div>`;
  const head = (title) => `<div class="ptab-phone-head"><div class="ptf-screen-title">${escape(title)}</div></div>`;
  // 직접 눌러 보는 Line 목록 — 내용 칸 없이 목록만
  const liveLine = (layout, size, label, labels, { selected = 0, dot = -1 } = {}) =>
    lineTabs({ layout, size, label, live: true, tabs: labels.map((l, i) => lineTab({ label: l, selected: i === selected, dot: i === dot })) });
  // 탭 + 내용 칸 — 칸은 고른 탭 것만 보이고 나머지는 hidden 으로 남는다(탭마다 상태를 지킨다). chip 을 주면 Chip Tabs 다
  const tabsWithPanels = ({ layout = "fill", size = "small", label, items, selected = 0, chip = null }) => {
    const base = nextPtabId();
    const tabs = items.map((it, i) => {
      const args = { label: it.label, selected: i === selected, dot: !!it.dot, disabled: !!it.disabled, id: `${base}-tab-${i}`, controls: `${base}-panel-${i}` };
      return chip ? chipTab({ ...args, ...chip }) : lineTab(args);
    });
    const list = chip ? chipTabs({ label, live: true, tabs }) : lineTabs({ layout, size, label, live: true, tabs });
    const panels = items.map((it, i) => `<div class="ptab-panel" role="tabpanel" id="${base}-panel-${i}" aria-labelledby="${base}-tab-${i}" tabindex="0"${i === selected ? "" : " hidden"}>${it.body}</div>`).join("");
    return { list, panels };
  };
  const tile = (color, icon) => `<span class="plst-tile plst-tile--${color}">${LIST_ICON[icon]}</span>`;
  const won = (v) => `<span class="plst-amount">${escape(v)}</span>`;

  // 1. Line — 폭 × 크기. 모두 직접 눌러 볼 수 있다. Fill 2 ~ 5개는 360 폰에서 막대 폭을 견준다(tabs.yaml layout.fill 의 note)
  const fillSets = [
    { note: "2개 — 탭 180 · 막대 148", label: "휴가 신청", labels: ["신청 내역", "승인 내역"] },
    { note: "3개 — 탭 120 · 막대 88", label: "통계", labels: ["카테고리", "추이", "비교"] },
    { note: "4개 — 탭 90 · 막대 58", label: "직원 상세", labels: ["기본 정보", "근태", "평가", "급여"] },
    { note: "5개 — 탭 72 · 막대 40", label: "팀", labels: ["개요", "구성원", "일정", "문서", "설정"] },
  ];
  const fillStack = `<div class="ptab-stack">${fillSets.map(s => `<div><p class="ptab-note">${escape(s.note)}</p>${liveLine("fill", "small", s.label, s.labels)}</div>`).join("")}</div>`;
  const hide = ["전체", "홈", "자산", "가계부", "통계", "예산", "증권", "더치페이", "기타"];
  const layoutPanel = panel(
    "Line — 폭 Fill · Hug × 크기 small · medium",
    "Fill 은 칸을 똑같이 나눠 목록을 꽉 채우고, 막대는 칸에서 좌우 16 씩 들인다(막대 = 탭 폭 − 32 — 360 폰 2 · 3 · 4 · 5개면 148 · 88 · 58 · 40). 5개까지 · 짧은 글에 쓴다. Hug 는 탭이 글 + 좌우 10 이고 목록 좌우 16 · 막대는 탭 폭 그대로다 — 6개 이상이거나 글이 길면 쓰고, 넘치면 가로로 스크롤한다(스크롤바는 숨긴다). 화면 밖 탭을 고르면 16 여유를 두고 그쪽으로 스크롤한다. small 은 40 · 글 14/19(기본), medium 은 44 · 글 16/22 — 탭 위아래 · 좌우 10 이고 글을 아래로 붙여 막대와 글 사이가 크기와 관계없이 10 이다. 글은 고르든 안 고르든 700 이고, 고르면 글자색만 fg-neutral-subtle 에서 fg-neutral 로 바로 바뀌며 2px fg-neutral 막대가 200ms(d4 · easing)로 미끄러진다. 목록 바탕은 불투명한 bg-layer-default, 바닥은 안쪽 1px stroke-neutral-subtle 구획 선이다. 글은 줄바꿈 · 말줄임하지 않는다 — Fill 에서 칸을 넘으면 Hug 로 바꾼다. 모두 누르고 ← → · Home · End 로 옮겨 볼 수 있다 — 화살표로 옮기면 바로 고르고, 끝에서 처음으로 돈다.",
    samples([
      sample("Fill · small 40 — 통계 3개", "layout=\"fill\" · size=\"small\"(기본) — 막대 = 탭 폭 − 32", phone(liveLine("fill", "small", "통계", ["카테고리", "추이", "비교"]))),
      sample("Fill · medium 44 — 증권 2개", "layout=\"fill\" · size=\"medium\" — 글 16/22", phone(liveLine("fill", "medium", "증권사", ["나무증권", "토스증권"]))),
      sample("Hug · small 40 — 금액 가리기 9개", "layout=\"hug\" — 글 + 좌우 10 · 목록 좌우 16 · 넘치면 스크롤", phone(liveLine("hug", "small", "금액 가리기", hide))),
      sample("Hug · medium 44 — 직원 상세 7개", "layout=\"hug\" · size=\"medium\" — 막대 = 탭 폭", phone(liveLine("hug", "medium", "직원 상세", ["기본 정보", "근태", "휴가", "평가", "급여", "교육", "문서"]))),
      sample("Fill — 360 폰에서 2 · 3 · 4 · 5개", "칸을 똑같이 나눈다 — 막대 148 · 88 · 58 · 40", phone(fillStack)),
    ]),
  );

  // 2. Line — 상태. 둘째 탭(예산)을 곁에 둬 막대 · 링이 이웃에 걸리지 않는 것을 보인다. 누름 · 포커스는 그 순간을 멈췄다(.ptab--pressed · --focus)
  const lineCols = [
    { ko: "기본", en: "enabled" },
    { ko: "누름", en: "pressed — 2px 축소 · 색 그대로", interaction: "pressed" },
    { ko: "포커스", en: "focused — 키보드만 · 안쪽 링 2px", interaction: "focus" },
    { ko: "비활성", en: "disabled — fg-disabled · 축소 없음 · 고른 탭은 막대도", disabled: true },
  ];
  const lineRows = [
    { ko: "안 고름", en: "fg-neutral-subtle — 막대는 옆 탭", selected: false },
    { ko: "고름", en: "fg-neutral + 2px 막대 fg-neutral", selected: true },
    { ko: "알림 점", en: "6 · fg-brand — 글 끝에서 2 · 글 위쪽 · 안 고른 탭에만", selected: false, dot: true },
  ];
  const lineCell = (r, c) => lineTabs({
    layout: "hug",
    label: `${r.ko} — ${c.ko}`,
    tabs: [
      lineTab({ label: "통계", selected: r.selected, dot: !!r.dot, disabled: !!c.disabled, interaction: c.interaction || "" }),
      lineTab({ label: "예산", selected: !r.selected }),
    ],
  });
  const lineStatePanel = panel(
    "Line — 상태 · 알림 점",
    "누르면 탭 전체가 2px 거리로 줄기만 한다 — 배율 (기준 − 2) ÷ 기준, 기준 = max(높이, 폭 ÷ 4, 24) 이고 150ms(pressed-scale)다. 색은 그대로다 — 글자색이 이미 고름을 말하므로, 누르는 동안 색이 바뀌면 손을 떼기 전에 고른 것처럼 보인다. 마우스 호버 모양도 없다. 포커스는 키보드로 왔을 때만 탭 안쪽 링 2px stroke-focus-ring(띄움 −2 · 모서리 각짐)이라 이웃 탭 · 바닥 선에 걸리지 않는다. 막힌 탭은 글 fg-disabled · 커서 not-allowed 이고 줄지 않으며 화살표 이동에서 건너뛴다 — 고른 채 막히면(목록 전체가 막혔을 때) 막대도 fg-disabled 다. 막대는 목록에 하나라 탭이 줄어도 그대로다. 알림 점은 6 · fg-brand(브랜드 글자색)이고 글 끝에서 2, 글 위쪽에 맞춘다 — 탭 폭을 넓히지 않는다. 새 소식이 있는 탭 하나에만 달고 보조 기술에 \"새 소식\" 을 덧붙인다. 고른 탭에는 그리지 않는다 — 탭을 열어 내용을 보면 사라진다. 탭 글에는 개수를 붙이지 않는다. 표는 그 순간을 멈춰 그렸다(Hug · small).",
    matrix("ptab-matrix", "고름 · 점", lineCols, lineRows, lineCell),
  );

  // 3. Chip Tabs — Solid · Outline × medium · large, 두 단(증권). 모두 직접 눌러 볼 수 있다
  const chipSets = [
    { cap: "Solid · medium 36", en: "variant=\"solid\"(기본) — 화면 전체 내용 · 좁은 자리", variant: "solid", size: "medium", label: "나무증권 보기", labels: ["보유", "관심", "발견"], dot: 2 },
    { cap: "Solid · large 40", en: "variant=\"solid\" · size=\"large\" — 화면 전체를 바꾸는 탭", variant: "solid", size: "large", label: "나무증권 보기", labels: ["보유", "관심", "발견"], dot: -1 },
    { cap: "Outline · medium 36", en: "variant=\"outline\" — 일부 내용만 바꾸는 탭 · 넘치면 가로 스크롤", variant: "outline", size: "medium", label: "자산 종류", labels: ["계좌", "카드", "증권", "대출", "현금", "포인트"], dot: -1 },
    { cap: "Outline · large 40", en: "variant=\"outline\" · size=\"large\" — 넘치면 가로 스크롤", variant: "outline", size: "large", label: "자산 종류", labels: ["계좌", "카드", "증권", "대출", "현금", "포인트"], dot: -1 },
  ];
  const stock = (name, detail, value) => listRow({ title: name, detail, suffix: won(value) });
  const brokerTabs = (broker, rows, dot) => {
    const t = tabsWithPanels({
      label: `${broker} 보기`,
      chip: { variant: "solid", size: "medium" },
      items: [
        { label: "보유", body: listOf(rows.hold) },
        { label: "관심", body: listOf(rows.watch) },
        { label: "발견", dot, body: listOf(rows.find) },
      ],
    });
    return `${t.list}${t.panels}`;
  };
  const brokers = tabsWithPanels({
    layout: "fill",
    size: "medium",
    label: "증권사",
    items: [
      { label: "나무증권", body: brokerTabs("나무증권", {
        hold: [stock("삼성전자", "12주 · 평균 71,200원", "+4.2%"), stock("카카오", "5주 · 평균 48,900원", "−1.8%")],
        watch: [stock("SK하이닉스", "반도체", "212,500원"), stock("NAVER", "인터넷", "181,300원")],
        find: [stock("오늘 많이 산 종목", "나무증권 이용자 기준", "10개")],
      }, true) },
      { label: "토스증권", body: brokerTabs("토스증권", {
        hold: [stock("애플", "3주 · 평균 $189.40", "+12.4%")],
        watch: [stock("엔비디아", "반도체", "$118.20")],
        find: [stock("급상승 종목", "토스증권 이용자 기준", "10개")],
      }, false) },
    ],
  });
  const twoTier = phone(`${head("증권")}${brokers.list}${brokers.panels}`);
  const chipPanel = panel(
    "Chip Tabs — Solid · Outline × medium · large · 두 단",
    "1차 Line 탭 안의 2차 탭이다. 칩 하나는 03i 의 Chip 그대로다 — solid 는 Chip Solid(안 고름 bg-neutral-weak), outline 은 Chip Outline Strong(안 고름 투명 + 안쪽 1px stroke-neutral-weak)이고, 고르면 짙은 채움(bg-neutral-inverted · fg-neutral-inverted — Outline 은 테두리를 지운다)이다. 크기는 Chip medium 36(기본) · large 40, 글 14 · 500 이고 누름 · 호버 · 포커스 · 비활성도 Chip 과 같다. 목록은 바탕 · 바닥 선 없이 한 줄 가로 스크롤이고 칩 사이 8 · 좌우 화면 여백 24 · 위아래 8 이다. 화면 전체 내용을 바꾸면 Solid, 일부 내용만 바꾸면 Outline — large 는 화면 전체를 바꾸는 탭, medium 은 좁은 자리 · 스크롤 중간의 서브 내용이다. 알림 점은 칩 안이라 글 뒤 6 · 세로 가운데에 두고 칩이 그만큼 넓어진다 — 색은 fg-brand 이고, 고른 칩(짙은 채움)에는 그리지 않는다(열어 내용을 보면 사라진다). 두 단이면 1차는 Line, 2차는 Chip Tabs 다 — 화면에 필터 바(거르는 칩)가 함께 있으면 2차도 Line 으로 둔다(같은 모양이면 무엇이 탭인지 알 수 없다). 모두 누르고 ← → 로 옮겨 볼 수 있다.",
    samples([
      ...chipSets.map(s => sample(s.cap, s.en, phone(chipTabs({ label: s.label, live: true, tabs: s.labels.map((l, i) => chipTab({ label: l, variant: s.variant, size: s.size, selected: i === 0, dot: i === s.dot })) })))),
      sample("두 단 — 증권", "1차 Line Fill · medium(나무증권 · 토스증권) · 2차 Chip Tabs Solid(보유 · 관심 · 발견)", twoTier),
    ]),
  );

  // 4. Segmented — 칸 수 · 폭. 폰 콘텐츠 폭(360 − 좌우 24 = 312)에서 2 · 3 · 4개. 모두 직접 눌러 볼 수 있다
  const segSets = [
    { cap: "2개 — 칸 152", en: "트랙 312(폰 360 − 좌우 24) · 칸 = (312 − 8) ÷ 2", label: "통계 보기", items: ["지출", "수입"] },
    { cap: "3개 — 칸 101.3", en: "칸 = (312 − 8) ÷ 3", label: "거래 거르기", items: ["전체", "지출", "수입"] },
    { cap: "4개 — 칸 76", en: "칸 = (312 − 8) ÷ 4 — 폰에서도 4개가 들어간다", label: "할 일 보기", items: ["오늘", "이번 주", "전체", "완료"] },
  ];
  const segWidthPanel = panel(
    "Segmented Control — 폰에서 2 · 3 · 4개",
    "크기 · 변형이 하나다 — 트랙 안쪽 4 + 칸 34 = 42, 글 16 · 700(고르든 안 고르든), 칸 위아래 6 · 좌우 12. 트랙(bg-neutral-weak · 모서리 full)이 놓인 자리 폭을 채우고 칸이 그 폭을 칸 수로 똑같이 나눈다 — 최소 폭이 없어 폰 콘텐츠 폭 312(360 − 좌우 24)에서도 4개가 들어간다(칸 76). 고른 칸은 흰 알약(bg-layer-default + 안쪽 짙은 1px stroke-neutral-contrast) 위 fg-neutral 이고, 다른 칸을 고르면 알약이 200ms(d4 · easing)로 미끄러진다. 넓은 화면에서는 트랙이 자리를 채우므로 놓는 자리를 좁혀 둔다. 같은 내용을 바로 거르거나 · 정렬하거나 · 다르게 보는 조작이라 그 내용 바로 위에, 한 화면에 하나만 둔다. 모두 누르고 화살표(← → ↑ ↓)로 옮겨 볼 수 있다 — 옮기면 바로 고르고, 고른 칸을 다시 눌러도 그대로다.",
    samples(segSets.map(s => sample(s.cap, s.en, phone(pad(segmented({ label: s.label, live: true, items: s.items.map(l => ({ label: l })) })))))),
  );

  // 5. Segmented — 상태. 첫 칸(지출)이 그 상태이고, 안 고름 줄은 둘째 칸(수입)을 골랐다. 호버 · 누름 · 포커스는 그 순간을 멈췄다(.pseg-item--hover · --pressed · --focus)
  const segCols = [
    { ko: "기본", en: "enabled" },
    { ko: "호버", en: "hovered — 웹 · 누름 바탕 · 축소 없음", interaction: "hover" },
    { ko: "누름", en: "pressed — 누름 바탕 + 글 2px 축소", interaction: "pressed" },
    { ko: "포커스", en: "focused — 키보드만 · 바깥 링 2px", interaction: "focus" },
    { ko: "비활성", en: "disabled — 고른 칸은 고른 채 막힘", disabled: true },
  ];
  const segRows = [
    { ko: "안 고름", en: "fg-neutral-subtle — 누름 bg-neutral-weak-pressed · 1px stroke-neutral-weak · fg-neutral-muted", selected: false },
    { ko: "고름", en: "흰 알약 + 짙은 1px · fg-neutral — 누름 bg-layer-default-pressed", selected: true },
  ];
  const segCell = (r, c) => segmented({
    label: `${r.ko} — ${c.ko}`,
    selected: r.selected ? 0 : 1,
    state: c.interaction ? { at: 0, interaction: c.interaction } : null,
    items: [{ label: "지출", disabled: !!c.disabled }, { label: "수입" }],
  });
  const segStatePanel = panel(
    "Segmented Control — 상태",
    "마우스를 올리면(웹) 누름과 같은 바탕이고 축소가 없다. 안 고른 칸은 bg-neutral-weak-pressed + 안쪽 1px stroke-neutral-weak 에 글이 fg-neutral-muted 로 한 단계 짙어지고(fg-neutral-subtle 이면 다크 3.91:1), 고른 칸은 bg-layer-default-pressed 를 칸에 칠해 알약을 덮고 짙은 1px 는 그대로다. 누르면 그 바탕에 칸은 그대로 두고 안의 글만 2px 거리로 준다(기준 = 칸의 max(높이, 폭 ÷ 4, 24) · 150ms pressed-scale — 모션 줄이기면 줄지 않는다). 포커스는 키보드에만 칸 바깥 링 2px · 띄움 2px stroke-focus-ring 이고 알약을 따라 둥글다. 막힌 칸은 글 fg-disabled · 커서 not-allowed 이고 흐리게 하지 않는다 — 고른 채 막히면 칸에 bg-disabled + 짙은 1px stroke-neutral-solid 를 남겨 무엇을 골랐는지 보인다. 바탕 · 글자색 · 테두리는 150ms(color-transition)로 바뀐다. 표는 그 순간을 멈춰 그렸다.",
    matrix("pseg-matrix", "고름", segCols, segRows, segCell),
  );

  // 6. Segmented — 알림 점 · 긴 글 · 막힘
  const todoSet = (disabledAt = -1) => ["오늘", "이번 주", "전체", "완료"].map((l, i) => ({ label: l, disabled: i === disabledAt }));
  const segMorePanel = panel(
    "Segmented Control — 알림 점 · 긴 글 · 막힘",
    "알림 점은 새 내용이 있는 칸에만 단다 — 6 · fg-brand(브랜드 글자색), 글 끝에서 2 · 글 위쪽에 맞추고 보조 기술에 \"새 내용\" 을 덧붙인다. 고른 칸에는 그리지 않는다 — 고르면 사라진다. 글은 짧게 쓴다(\"이름순\" · \"최근 사용\") — 칸에 비해 길면 단어 단위로 줄을 바꾸고(v114 — keep-all · break-word) 모든 칸이 가장 높은 칸에 맞춰 높아진다. 그러면 다른 컴포넌트(Chip 하나 고르기 · Select)를 쓴다. 칸 하나 또는 트랙 전체를 막을 수 있다 — 막힌 칸은 누를 수 없고 화살표 이동에서 건너뛴다. 늘 하나가 골라져 있어 트랙을 막아도 고른 칸이 보인다.",
    samples([
      sample("알림 점 — 받을 돈에 새 요청", "6 · fg-brand · 보조 기술에 \"새 내용\" — 고르면 사라진다", phone(pad(segmented({ label: "더치페이 보기", live: true, selected: 1, items: [{ label: "받을 돈", dot: true }, { label: "보낼 돈" }] })))),
      sample("긴 글 — 줄이 바뀌면 칸이 모두 높아진다(피한다)", "단어 단위 줄바꿈 · 가장 높은 칸에 맞춘다", phone(pad(segmented({ label: "프리셋 정렬", live: true, items: [{ label: "많이 쓴 순" }, { label: "최근에 사용한 순" }, { label: "이름 가나다순" }] })))),
      sample("칸 하나 막힘 — 완료", "SegmentedControlItem disabled — 화살표가 건너뛴다", phone(pad(segmented({ label: "할 일 보기", live: true, items: todoSet(3) })))),
      sample("트랙 전체 막힘", "SegmentedControl disabled — 고른 칸은 bg-disabled + 1px stroke-neutral-solid", phone(pad(segmented({ label: "할 일 보기", disabled: true, items: todoSet() })))),
    ]),
  );

  // 7. 화면 — 통계(Line Fill · 내용 칸) · 할 일(Segmented 로 목록 거르기) · HR 휴가 신청(데스크톱 Hug medium · 알림 점). 2026년 10월 1일(목)이 오늘이다
  const stats = tabsWithPanels({
    layout: "fill",
    size: "small",
    label: "통계",
    items: [
      { label: "카테고리", body: `<p class="ptab-lead">9월 지출 <strong>905,200원</strong></p>${listOf([
        listRow({ prefix: tile("orange", "utensils"), title: "식비", detail: "38%", suffix: won("348,000원") }),
        listRow({ prefix: tile("violet", "bag"), title: "쇼핑", detail: "26%", suffix: won("236,200원") }),
        listRow({ prefix: tile("gray", "more"), title: "기타", detail: "25%", suffix: won("223,000원") }),
        listRow({ prefix: tile("blue", "bus"), title: "교통", detail: "11%", suffix: won("98,000원") }),
      ])}` },
      { label: "추이", body: `<p class="ptab-lead">한 달 지출 — 최근 4개월</p>${listOf([
        listRow({ title: "9월", detail: "9월 1일 ~ 30일", suffix: won("905,200원") }),
        listRow({ title: "8월", detail: "8월 1일 ~ 31일", suffix: won("876,000원") }),
        listRow({ title: "7월", detail: "7월 1일 ~ 31일", suffix: won("790,400원") }),
        listRow({ title: "6월", detail: "6월 1일 ~ 30일", suffix: won("842,100원") }),
      ])}` },
      { label: "비교", body: `<p class="ptab-lead">8월보다 <strong>29,200원</strong> 더 썼어요</p>${listOf([
        listRow({ prefix: tile("orange", "utensils"), title: "식비", detail: "8월 336,000원", suffix: won("+12,000원") }),
        listRow({ prefix: tile("violet", "bag"), title: "쇼핑", detail: "8월 251,000원", suffix: won("−14,800원") }),
        listRow({ prefix: tile("gray", "more"), title: "기타", detail: "8월 213,000원", suffix: won("+10,000원") }),
        listRow({ prefix: tile("blue", "bus"), title: "교통", detail: "8월 76,000원", suffix: won("+22,000원") }),
      ])}` },
    ],
  });
  const statsScreen = phone(`${head("통계")}${stats.list}<div class="ptab-phone-body">${stats.panels}</div>`);
  // 할 일 — 고른 칸의 값(today · week · all · done)이 없는 줄은 숨긴다. 처음은 "오늘"
  const todoId = nextPtabId();
  const todos = [
    { title: "디자인 시스템 리뷰", detail: "오늘 오후 2:00", tags: "today week all" },
    { title: "10월 예산 정하기", detail: "오늘", tags: "today week all" },
    { title: "병원 예약", detail: "10월 2일 (금)", tags: "week all" },
    { title: "여권 갱신", detail: "10월 20일 (화)", tags: "all" },
    { title: "아침 스트레칭", detail: "완료 · 오늘 오전 7:00", tags: "done", done: true },
    { title: "9월 회고 쓰기", detail: "완료 · 9월 30일 (수)", tags: "done", done: true },
  ];
  const todoRow = (t) => listRow({ prefix: t.done ? TODO_ICON.done : TODO_ICON.open, title: t.title, detail: t.detail })
    .replace('<li class="plst-row"', `<li class="plst-row" data-pseg-tags="${t.tags}"${t.tags.split(" ").includes("today") ? "" : " hidden"}`);
  const todoScreen = phone(`${head("할 일")}${pad(segmented({
    label: "할 일 보기",
    live: true,
    filter: todoId,
    items: [{ label: "오늘", value: "today" }, { label: "이번 주", value: "week" }, { label: "전체", value: "all" }, { label: "완료", value: "done" }],
  }))}${listOf(todos.map(todoRow), ` id="${todoId}" aria-label="할 일"`)}`);
  // HR 휴가 신청 — 데스크톱 웹의 넓은 카드라 둘이어도 Hug medium. 승인 내역에 대기 중인 신청이 있어 알림 점, 열면 지운다
  const leave = tabsWithPanels({
    layout: "hug",
    size: "medium",
    label: "휴가 신청",
    items: [
      { label: "신청 내역", body: listOf([
        listRow({ title: "연차 3일", detail: "10월 12일 (월) ~ 14일 (수) · 승인 대기" }),
        listRow({ title: "반차 · 오후", detail: "9월 25일 (금) · 승인됨" }),
        listRow({ title: "연차 1일", detail: "9월 4일 (금) · 승인됨" }),
      ]) },
      { label: "승인 내역", dot: true, body: listOf([
        listRow({ title: "김지원 · 연차 3일", detail: "디자인 본부 · 10월 20일 (화) ~ 22일 (목) · 대기" }),
        listRow({ title: "박서연 · 반차", detail: "프로덕트 본부 · 10월 16일 (금) 오전 · 대기" }),
        listRow({ title: "이도현 · 연차 1일", detail: "운영 본부 · 9월 30일 (수) · 승인함" }),
      ]) },
    ],
  });
  const leaveScreen = `<div class="ptab-desk">
            <div class="ptab-desk-head"><div class="ptf-screen-title">휴가 신청</div></div>
            ${leave.list}
            <div class="ptab-desk-body">${leave.panels}</div>
          </div>`;
  const screensPanel = panel(
    "화면 — 통계 · 할 일 · 휴가 신청",
    "탭은 화면 · 구역 맨 위에서 다른 구역으로 옮긴다 — 통계의 카테고리 · 추이 · 비교는 서로 다른 내용이라 탭이고, 셋이라 Fill small 이다. 고르면 내용 칸이 애니메이션 없이 바로 바뀌고(막대만 미끄러진다) 다른 칸은 그대로 남아 다녀와도 상태가 그대로다. 폰 1차 탭은 내용을 옆으로 밀어 넘길 수 있고, 웹은 1차 탭을 주소에 남긴다(그림에는 없다). Segmented Control 은 자기가 바꾸는 내용 바로 위에 하나만 둔다 — 할 일 목록을 오늘 · 이번 주 · 전체 · 완료로 바로 거른다. 데스크톱 HR 휴가 신청은 넓은 카드라 둘이어도 Hug medium 이다 — 칸을 나누면 탭이 지나치게 넓어진다. 승인 내역에 대기 중인 신청이 있어 알림 점을 달았고, 그 탭을 열어 내용을 보면 점이 사라진다. 모두 직접 눌러 볼 수 있다.",
    `
      <div class="ptab-screens">
        ${sample("Desk 통계 — 폰 · Line Fill small", "TabsList aria-label=\"통계\" · TabsContent 셋", statsScreen)}
        ${sample("Desk 할 일 — 폰 · Segmented Control", "SegmentedControl aria-label=\"할 일 보기\" — 목록 바로 위", todoScreen)}
        ${sample("HR 휴가 신청 — 데스크톱 웹 · Line Hug medium", "TabsList layout=\"hug\" size=\"medium\" · TabsTrigger notification", leaveScreen, " ptab-wide")}
      </div>`,
  );

  const lede = "SEED Tabs · Segmented Control 구조 — 다른 구역으로 옮기는 탭과, 같은 내용을 바로 거르거나 · 정렬하거나 · 다르게 보는 Segmented Control 을 나눈다. 1차 탭은 Line(밑줄 막대)이다 — small 40 · medium 44, 글 14 · 16 · 700 고정이고 고르면 글자색만 fg-neutral-subtle 에서 fg-neutral 로 짙어지며 2px 중립색 막대가 미끄러진다. 누르면 탭이 2px 거리로 줄기만 하고 색은 그대로다. 5개까지 Fill(칸을 나눈다), 6개부터 · 긴 글은 Hug(넘치면 가로 스크롤). 탭 안에서 다시 나누는 2차 탭은 Chip Tabs(Chip Solid · Outline Strong — 36 · 40)다. Segmented Control 은 트랙 42(안쪽 4 + 칸 34) · 글 16 · 700 이고 칸이 트랙 폭을 똑같이 나눈다 — 고른 칸은 흰 알약 + 안쪽 짙은 1px 다. 고른 표시는 브랜드 색이 아니라 중립색이라 세 미리보기가 같고, 알림 점(6 · fg-brand)만 브랜드 색이다 — 고른 탭 · 칸에는 점이 없다. 화살표로 옮기면 바로 고른다. 옛 Tabs 의 container · underline · pills 모양과 수동 활성화는 없다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 포커스 링 · 알림 점이 여기서는 중립으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03j — Tabs · Segmented Control</div>
      <h2 class="section-title">Tabs · Segmented Control — Line&nbsp;2 × 크기&nbsp;2 · Chip&nbsp;Tabs · Segmented · 상태 · 화면</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${layoutPanel}
    ${lineStatePanel}
    ${chipPanel}
    ${segWidthPanel}
    ${segStatePanel}
    ${segMorePanel}
    ${screensPanel}
  </section>`;
}

// Bottom Sheet · Dialog · Alert Dialog · Popover — spec: specs/components/bottom-sheet.md · dialog.md · alert-dialog.md · popover.md ·
// 수치 bottom-sheet.yaml · dialog.yaml · alert-dialog.yaml · popover.yaml · 쌓임 specs/z-index.md. 구조는 SEED Bottom Sheet · Dialog · Responsive Dialog ·
// Alert Dialog · Popover(2026-10-02).
// 표면은 넷이다 — 시트 .pov-sheet · 대화상자 .pov-dialog · 확인창 .pov-alert · 팝오버 .pov-popover. 머리(제목 · 설명) · 본문 · 바닥으로 짜고, 닫기 .pov-close 는
// 시트에서 28 원(--circle), 대화상자 · 팝오버에서 투명 52 상자(--box)다. 확인창에는 닫기가 없다.
// 그림은 열린 순간을 멈춘 것이다 — 폰 · 데스크톱 화면 틀(.pov-frame — 갤러리 것) 안에 뒤 화면(.pov-page)을 그리고 딤(.pov-scrim) · 표면을 얹는다.
// 틀이 쌓임 맥락을 가두므로(isolation) 안의 z-index 는 z-index.md 값 그대로다 — 시트 · 대화상자 L2(딤 100 · 표면 101) · 팝오버 L3(200) · 확인창 L5(300 · 301).
// 표면은 role=group 이다 — 레시피는 role="dialog" · "alertdialog" + aria-modal 이지만, 미리보기 페이지까지 막지 않게 했다. 대신 모달 뒤 화면은 inert 로 둬
// 레시피의 결과(뒤 화면을 보조 기술에서 숨기고 초점을 가둔다)를 흉내 낸다. 팝오버는 비모달이라 뒤 화면 안에 그대로 그린다.
// 본문 스크롤(넘치면 아래 48 흐림 · 위로 스크롤하면 머리 아래 선)은 페이지 끝 스크립트가 레시피처럼 맡는다. 확인창 버튼의 세로 전환은 CSS 다(레시피와 같다).
const OVERLAY_ICON = {
  x: listSvg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
  info: listSvg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
};
const OVERLAY_CLOSE_INTERACTIONS = ["pressed", "focus"];
let overlaySeq = 0;
const nextOverlayId = (prefix) => `${prefix}-${(overlaySeq += 1)}`;

// 바닥 버튼 — Button 갤러리의 .btn 그대로다. variant 는 .btn-* 이름(neutral-solid · neutral-weak · critical-solid), size 는 높이로 고른 크기
// (시트 large 48 · 대화상자 · 팝오버 small 36 · 확인창 1280 미만 medium 40 · 이상 small 36)
export function overlayButton(label, { variant = "neutral-solid", size = "small" } = {}) {
  return `<button class="btn btn-${variant} btn-size-${size}" type="button">${escape(label)}</button>`;
}

// 닫기 — 이름 "닫기". circle(시트 — 28 원 · 아이콘 14 · 누르는 영역 44) · box(대화상자 · 팝오버 — 투명 52 상자 · 아이콘 22).
// interaction 은 그 순간을 멈춘 상태(pressed · focus — 갤러리 전용)
export function overlayClose({ kind = "box", interaction = "" } = {}) {
  const cls = ["pov-close", `pov-close--${kind}`, OVERLAY_CLOSE_INTERACTIONS.includes(interaction) && `pov-close--${interaction}`].filter(Boolean).join(" ");
  return `<button type="button" class="${cls}" aria-label="닫기">${OVERLAY_ICON.x}</button>`;
}

// 표면의 이름 — 제목이 있으면 aria-labelledby, 없으면(머리 없는 팝오버 · 제목 없는 확인창) label 을 aria-label 로. 설명은 aria-describedby
const overlayNameAttrs = (titleId, descId, label = "") => attrsOf([
  titleId ? `aria-labelledby="${titleId}"` : label && `aria-label="${escape(label)}"`,
  descId && `aria-describedby="${descId}"`,
]);

// Bottom Sheet — 1280 미만의 폼 · 상세 · 고르기. 글(title · description)은 여기서 escape 하고 body · footer 는 HTML 조각으로 받는다.
//   close   위 닫기(28 원) — 조회 · 고르기 · 시트의 입력 폼 모두 둔다(기본). 닫기가 있으면 제목 오른쪽을 64 비운다
//   handle  손잡이 — 스냅 높이(절반 · 가득)를 둘 때만. snap 은 그림이 멈춘 높이(half)
//   footer  바닥 버튼(large 48) — 하나면 폭 전체, 둘이면 반씩(보조 왼쪽 · 주 오른쪽)
export function bottomSheet({ id = nextOverlayId("pov-sheet"), title = "", description = "", body = "", footer = [], close = true, handle = false, snap = "", closeInteraction = "" } = {}) {
  const titleId = `${id}-title`;
  const descId = description ? `${id}-desc` : "";
  const head = `<div class="pov-sheet-header${close ? " pov-sheet-header--close" : ""}"><div class="pov-sheet-title" id="${titleId}">${escape(title)}</div>${description ? `<p class="pov-sheet-desc" id="${descId}">${escape(description)}</p>` : ""}</div>`;
  return `<div class="pov-sheet${snap ? ` pov-sheet--${snap}` : ""}" role="group" ${overlayNameAttrs(titleId, descId)}>${handle ? '<div class="pov-handle" aria-hidden="true"></div>' : ""}${head}${close ? overlayClose({ kind: "circle", interaction: closeInteraction }) : ""}<div class="pov-sheet-body">${body}</div>${footer.length ? `<div class="pov-sheet-footer">${footer.join("")}</div>` : ""}</div>`;
}

// Dialog — 1280 이상의 폼 · 상세. 글은 여기서 escape 하고 body · footer 는 HTML 조각으로 받는다.
//   size    medium 480(기본) · large 800
//   close   머리 닫기(52 상자) — 조회 · 안내만. 입력 폼은 두지 않는다(바닥 취소가 닫는다). 닫기가 있으면 머리 오른쪽을 52 비운다
//   scroll  본문 스크롤 — top(기본) · scrolled(그릴 때 위로 스크롤해 둔다). 넘침 · 스크롤 표시는 페이지 끝 스크립트가 단다
//   footer  바닥 버튼(small 36) — 오른쪽 정렬, [취소] [저장] 차례
export function overlayDialog({ id = nextOverlayId("pov-dialog"), title = "", description = "", body = "", footer = [], size = "medium", close = false, scroll = "top", closeInteraction = "" } = {}) {
  const titleId = `${id}-title`;
  const descId = description ? `${id}-desc` : "";
  const head = `<div class="pov-dialog-header${close ? " pov-dialog-header--close" : ""}"><div class="pov-dialog-title" id="${titleId}">${escape(title)}</div>${description ? `<p class="pov-dialog-desc" id="${descId}">${escape(description)}</p>` : ""}</div>`;
  return `<div class="pov-dialog${size === "large" ? " pov-dialog--large" : ""}" role="group" ${overlayNameAttrs(titleId, descId)}>${head}${close ? overlayClose({ kind: "box", interaction: closeInteraction }) : ""}<div class="pov-dialog-body" data-pov-scroll="${scroll}">${body}</div>${footer.length ? `<div class="pov-dialog-footer">${footer.join("")}</div>` : ""}</div>`;
}

// Alert Dialog — 되돌릴 수 없는 일 앞의 확인. 글은 여기서 escape 한다. 닫기 버튼 · 입력칸이 없다.
//   single  알리기 — 버튼 하나 폭 전체. 아니면 [취소] [확정] 둘이고, 배치는 CSS 가 글 폭으로 정한다(alert-dialog.tsx 의 AlertDialogFooter 와 같다) —
//           버튼마다 반 폭을 바탕으로 두고 글 폭보다 줄지 않아, 한쪽 글이 반을 넘으면 줄이 넘어가고(wrap-reverse) 확정이 위로 간다
//   tone    critical(지우는 · 잃는 확정 — criticalSolid, 기본) · neutral(그 밖의 확정 — neutralSolid). 취소는 늘 neutralWeak
//   size    medium(1280 미만 40, 기본) · small(1280 이상 36)
//   label   제목이 없을 때 묻는 말 — aria-label
export function alertDialog({ id = nextOverlayId("pov-alert"), title = "", description = "", cancel = "취소", action = "", tone = "critical", single = false, size = "medium", label = "" } = {}) {
  const titleId = title ? `${id}-title` : "";
  const descId = `${id}-desc`;
  const confirm = overlayButton(action, { variant: tone === "critical" ? "critical-solid" : "neutral-solid", size });
  const buttons = single ? confirm : `${overlayButton(cancel, { variant: "neutral-weak", size })}${confirm}`;
  return `<div class="pov-alert" role="group" ${overlayNameAttrs(titleId, descId, label)}>${title ? `<div class="pov-alert-title" id="${titleId}">${escape(title)}</div>` : ""}<p class="pov-alert-desc" id="${descId}">${escape(description)}</p><div class="pov-alert-footer">${buttons}</div></div>`;
}

// Popover — 트리거에 붙는 비모달 표면. 글은 여기서 escape 하고 body · footer 는 HTML 조각으로 받는다.
//   title · description  머리 — 안내 팝오버는 제목 + 닫기(52 상자 · 머리 오른쪽 52 비움), 고르는 패널은 머리 없이 본문만(이름은 label)
//   footer  바닥 버튼(small 36) — 고른 것을 넣을 때("완료")만, 오른쪽 정렬
//   본문은 대화상자와 같이 넘치면 아래 48 흐림 · 위로 스크롤하면 머리 아래 선이다(페이지 끝 스크립트)
export function overlayPopover({ id = nextOverlayId("pov-pop"), title = "", description = "", body = "", footer = [], close = true, label = "", closeInteraction = "" } = {}) {
  const titleId = title ? `${id}-title` : "";
  const descId = title && description ? `${id}-desc` : "";
  const withClose = !!title && close;
  const head = title ? `<div class="pov-pop-header${withClose ? " pov-pop-header--close" : ""}"><div class="pov-pop-title" id="${titleId}">${escape(title)}</div>${descId ? `<p class="pov-pop-desc" id="${descId}">${escape(description)}</p>` : ""}</div>` : "";
  return `<div class="pov-popover" role="group" id="${id}" ${overlayNameAttrs(titleId, descId, label)}>${head}${withClose ? overlayClose({ kind: "box", interaction: closeInteraction }) : ""}<div class="pov-pop-body" data-pov-scroll="top">${body}</div>${footer.length ? `<div class="pov-pop-footer">${footer.join("")}</div>` : ""}</div>`;
}

// 화면 틀 — phone(폭 360 까지 · 아래 홈 표시줄 안전 영역 34) · desktop(브라우저 창). 갤러리 것이고 컴포넌트의 일부가 아니다.
//   page    뒤 화면(overlayPage) — 모달(layers)을 얹으면 inert 로 둔다
//   layers  그 위의 딤 · 표면(overlayScrim · overlayLayer) — 쓴 차례로 쌓인다
//   floats  뒤 화면을 막지 않는 떠 있는 층(03m 의 말풍선) — 뒤 화면을 inert 로 두지 않는다
//   height  화면 높이 — 시트 90% · 대화상자 80% 상한이 이 높이를 따른다
export function overlayFrame({ device = "phone", height = 600, page = "", layers = [], floats = [] } = {}) {
  const bar = device === "desktop" ? '<div class="pov-frame-bar" aria-hidden="true"><span></span><span></span><span></span></div>' : "";
  const home = device === "phone" ? '<div class="pov-home" aria-hidden="true"></div>' : "";
  return `<div class="pov-frame pov-frame--${device}">${bar}<div class="pov-viewport" style="--pov-h: ${height}px;"><div class="pov-page"${layers.length ? " inert" : ""}>${page}</div>${layers.join("")}${floats.join("")}${home}</div></div>`;
}
// 딤 — modal(시트 · 대화상자 L2 100) · alert(확인창 L5 300). overlay-dim 0.50 · 다크 0.65
const overlayScrim = (level = "modal") => `<div class="pov-scrim${level === "alert" ? " pov-scrim--alert" : ""}" aria-hidden="true"></div>`;
// 표면 자리 — sheet(아래 가운데 · 화면 폭 전체) · dialog(가운데 · 좌우 20 남김) · alert(가운데 · 좌우 32 남김). inert 는 위에 확인창이 뜬 대화상자
const overlayLayer = (kind, surface, { inert = false } = {}) => `<div class="pov-layer pov-layer--${kind}"${inert ? " inert" : ""}>${surface}</div>`;
// 팝오버를 연 자리 — 트리거(또는 칸) 아래 8 · 왼쪽 맞춤으로 뒤 화면 위에 뜬다
const overlayAnchor = (trigger, popover) => `<div class="pov-anchor">${trigger}${popover}</div>`;

// 뒤 화면 — 제목 + 내용. rows 는 목록 줄(List — 보기만 하는 줄), body 는 화면 여백 안의 조각(폼 · 칸), lead 는 제목과 내용 사이 한 줄이다.
// 데스크톱은 회색 바탕(bg-layer-basement) 위 흰 카드에 내용을 둔다. 2026년 10월 1일은 목요일이다
const OVERLAY_LEDGER = [
  { color: "orange", icon: "utensils", title: "김밥천국", detail: "식비 · 현대카드 M", amount: "8,000원" },
  { color: "blue", icon: "bus", title: "버스", detail: "교통 · 현대카드 M", amount: "1,500원" },
  { color: "violet", icon: "bag", title: "다이소", detail: "쇼핑 · 현대카드 M", amount: "12,300원" },
  { color: "indigo", icon: "wallet", title: "월급", detail: "수입 · 국민 주계좌", amount: "3,200,000원" },
];
const OVERLAY_LEAVE = [
  { color: "blue", icon: "calendar", title: "연차", detail: "10월 12일 (월) ~ 14일 (수)", value: "승인 대기" },
  { color: "indigo", icon: "calendar", title: "반차(오전)", detail: "9월 30일 (수)", value: "승인" },
  { color: "violet", icon: "calendar", title: "병가", detail: "9월 8일 (화)", value: "승인" },
];
const overlayRow = (r) => listRow({ prefix: listTile(r.color, r.icon), title: r.title, detail: r.detail, suffix: r.amount ? `<span class="plst-amount">${escape(r.amount)}</span>` : escape(r.value) });
const overlayPage = ({ title = "가계부", rows = OVERLAY_LEDGER, body = "", lead = "", desktop = false } = {}) => {
  const content = body ? `<div class="pov-page-body">${body}</div>` : listOf(rows.map(overlayRow));
  return `<div class="pov-page-title">${escape(title)}</div>${lead ? `<div class="pov-page-lead">${lead}</div>` : ""}${desktop ? `<div class="pov-page-card">${content}</div>` : content}`;
};

// 거래 추가 폼 — 같은 폼이 1280 미만 시트(칸 large 52) · 이상 대화상자(medium 40)에 뜬다. 칸이 모두 필수라 점 · "선택" 을 붙이지 않는다(2/3 규칙)
const overlayTxForm = (size, fields = ["amount", "category", "date"]) => {
  const all = {
    amount: { label: "금액", required: true, control: { kind: "input", size, value: "8,000", suffix: "원", inputmode: "numeric", format: "amount" } },
    category: { label: "카테고리", required: true, control: { kind: "inputButton", size, value: "식비", prefixIcon: "utensils", suffixIcon: "chevronDown" } },
    date: { label: "날짜", required: true, control: { kind: "inputButton", size, value: "10월 1일 (목)", suffixIcon: "calendarDays" } },
  };
  return `<div class="ptf-form">${fields.map(k => textField(all[k])).join("")}</div>`;
};

// 표면 안의 목록 — 줄이 제 좌우 24 를 가지므로 본문 여백 밖(표면 끝)까지 낸다(.pov-bleed). 값 줄은 보기만 하는 줄, 라디오 줄은 List 의 라디오 24
const overlayValueList = (pairs) => `<div class="pov-bleed">${listOf(pairs.map(([title, value]) => listRow({ title, suffix: escape(value) })))}</div>`;
const overlayRadioList = (label, options, picked) => `<div class="pov-bleed"><div class="plst" role="radiogroup" aria-label="${escape(label)}">${
  options.map(title => listRow({ kind: "control", as: "div", title, suffix: radio({ size: "large", checked: title === picked }).replace("<button ", '<button data-list-action="" ') })).join("")
}</div></div>`;

// 시트 · 대화상자 · 확인창 · 팝오버 갤러리 — 나누기 · 시트 · 대화상자 · 확인창 · 팝오버 · 닫기 버튼 여섯 판을 흰 표면(.vignette-card) 위에 그린다.
// 견본 틀(.ptf-samples · .ptf-cap)과 상태 표(.cb-matrix)는 Text Field 갤러리 것을 그대로 쓴다. 글은 Desk(거래 추가 · 기간 · 거래 상세 · 관심 그룹)와
// HR(휴가 신청 · 연차 사용 규정)에서 빌렸다 — bottom-sheet.md · dialog.md · alert-dialog.md · popover.md 코드 예와 같은 글이다.
// 그림은 열린 순간을 멈췄다 — 닫기 · 버튼 · 칸은 실제로 눌리고, 대화상자 본문은 실제로 스크롤된다(페이지 끝 스크립트).
export function renderOverlayGallery(brand) {
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  const samples = (items, cls = "ptf-samples") => `
      <div class="${cls}">${items.join("")}
      </div>`;
  const sample = (cap, en, body) => `
        <div class="ptf-sample">
          <div class="ptf-cap">${escape(cap)}<span>${escape(en)}</span></div>
          ${body}
        </div>`;
  const DESKTOP = "ptf-samples pov-samples--desktop";
  const detail = [["금액", "8,000원"], ["카테고리", "식비"], ["결제 수단", "현대카드 M"], ["날짜", "10월 1일 (목)"], ["메모", "친구와 점심"]];

  // 1. 나누기 — 같은 폼(ResponsiveDialog)이 1280 미만 시트 · 이상 대화상자. 닫는 자리만 표면에 맞춰 바뀐다
  const formSheet = overlayFrame({
    device: "phone",
    height: 640,
    page: overlayPage(),
    layers: [overlayScrim(), overlayLayer("sheet", bottomSheet({ title: "거래 추가", body: overlayTxForm("large"), footer: [overlayButton("저장", { size: "large" })] }))],
  });
  const formDialog = overlayFrame({
    device: "desktop",
    height: 560,
    page: overlayPage({ desktop: true }),
    layers: [overlayScrim(), overlayLayer("dialog", overlayDialog({ title: "거래 추가", body: overlayTxForm("medium"), footer: [overlayButton("취소", { variant: "neutral-weak" }), overlayButton("저장")] }))],
  });
  const splitPanel = panel(
    "나누기 — 같은 폼이 1280 에서 시트 ↔ 대화상자",
    "폼 · 상세는 한 부품(ResponsiveDialog)으로 짠다 — 1280 미만은 아래에서 올라오는 Bottom Sheet, 이상은 화면 정중앙의 Dialog 다. 머리 · 본문 · 바닥은 같고 닫는 자리만 표면에 맞춰 바뀐다 — 시트의 입력 폼은 위 닫기 + 바닥 저장 하나(Button large 48 폭 전체), 대화상자의 입력 폼은 바닥 [취소] [저장](Button small 36 오른쪽)이고 머리 닫기가 없다. 닫기 버튼과 바닥 취소를 함께 두지 않는다. 입력 폼은 바깥(딤)을 눌러도 · 아래로 끌어도 닫히지 않아 시트에 손잡이를 달지 않는다 — 닫기 · 취소 · Esc · 뒤로 가기로 닫고, 바뀐 값이 있으면 닫기 전에 \"작성한 내용이 사라져요\" 를 묻는다(Field). 경계 1280 은 Input Button 과 같고, 칸도 폰은 large 52 · 데스크톱 웹은 medium 40 이다. 시트 · 대화상자는 그림자 없이 딤(overlay-dim 0.50 · 다크 0.65) 위에 떠 있는 표면(bg-layer-floating)으로 뜬다. 열린 동안 뒤 화면은 보조 기술에서 숨기고 스크롤을 잠그며, 초점은 표면 안을 돈다 — 닫으면 연 자리로 돌아간다. 창 폭이 1280 을 넘나들면 열린 채 표면이 바뀌고 값은 폼(부모)이 들고 있어 그대로다.",
    samples([
      sample("폰 · 1280 미만 — Bottom Sheet", "ResponsiveDialog form — 위 닫기 + 바닥 저장(large 48) · 손잡이 없음", formSheet),
      sample("데스크톱 웹 · 1280 이상 — Dialog medium 480", "ResponsiveDialog form — 바닥 취소 · 저장(small 36) · 머리 닫기 없음", formDialog),
    ], "ptf-samples ptf-samples--forms"),
  );

  // 2. Bottom Sheet — 고르기(설명 · List 라디오 · 바닥 둘) · 손잡이(스냅 높이 절반에 멈춘 조회 시트)
  const pickSheet = overlayFrame({
    device: "phone",
    height: 600,
    page: overlayPage(),
    layers: [overlayScrim(), overlayLayer("sheet", bottomSheet({
      title: "기간",
      description: "고른 기간의 거래만 보여요.",
      body: overlayRadioList("기간", ["이번 달", "지난달", "최근 3개월"], "이번 달"),
      footer: [overlayButton("초기화", { variant: "neutral-weak", size: "large" }), overlayButton("적용", { size: "large" })],
    }))],
  });
  const snapSheet = overlayFrame({
    device: "phone",
    height: 600,
    page: overlayPage(),
    layers: [overlayScrim(), overlayLayer("sheet", bottomSheet({ title: "거래 상세", body: overlayValueList(detail), handle: true, snap: "half" }))],
  });
  const sheetPanel = panel(
    "Bottom Sheet — 머리 · 바닥 · 고르기 · 손잡이",
    "최대 480(넓은 화면에서는 가운데) · 위 두 모서리 24 이고, 높이는 내용만큼이며 화면 높이의 90% 를 넘지 않는다 — 그보다 긴 내용은 시트 안 스크롤로 버티지 않고 페이지로 옮긴다. 머리는 위 24 · 아래 16 · 좌우 화면 여백 24, 제목 22/30 · 700 · fg-neutral, 설명 16/22 · fg-neutral-muted(사이 8)이고, 닫기가 있으면 제목 오른쪽을 64 비운다. 닫기는 오른쪽 위(위 24 · 오른쪽 24)의 28 원 bg-neutral-weak · 아이콘 14 fg-neutral 이고 누르는 영역은 44 다. 본문은 좌우 24 이고 넘치면 이 안에서 스크롤한다. 바닥은 위 12 · 아래 16 에 안전 영역(홈 표시줄)을 더하고, 버튼은 Button large 48 — 하나면 폭 전체, 둘이면 반씩(사이 8 · 보조 왼쪽 · 주 오른쪽)이다. 조회 · 고르기 시트도 위 닫기이고, 바닥 버튼은 고른 것을 넣을 때(\"적용\" · \"완료\")만 둔다. 조회 · 고르기 시트는 바깥 누르기 · 끌어내리기로 닫힌다 — 놓을 때 빠르게(0.4px/ms 넘게) 끌었거나 높이의 25% 이상 내려왔으면 닫고, 열린 뒤 0.5초 · 본문을 스크롤하는 중에는 끌리지 않는다. 손잡이(36 × 4 · stroke-neutral-weak · 위 6 · 누르는 영역 44 · 보조 기술에 숨김)는 절반 · 가득 같은 스냅 높이를 둘 때만 단다 — 누르면 다음 높이로 가고, 가장 낮은 높이에서 누르면 닫힌다. 300ms(d6) enter-expressive 로 올라오고 200ms(d4) exit 로 내려간다. 딤 L2 100 · 시트 101.",
    samples([
      sample("고르기 — 설명 · 초기화 · 적용 반씩", "BottomSheet — List 라디오 · 바닥 버튼 둘(large 48)", pickSheet),
      sample("손잡이 — 스냅 높이를 둘 때만", "snapPoints — 시트는 화면의 90% 높이 · 절반 높이에 멈췄다 · 바닥 버튼 없음", snapSheet),
    ]),
  );

  // 3. Dialog — 조회(머리 닫기) · 본문이 넘칠 때(아래 48 흐림) · 위로 스크롤했을 때(머리 아래 선). 둘째 · 셋째는 실제로 스크롤된다
  const leaveFields = [
    { label: "휴가 종류", required: true, control: { kind: "select", size: "medium", value: "연차" } },
    { label: "기간", required: true, control: { kind: "inputButton", size: "medium", value: "10월 12일 (월)~10월 14일 (수)", suffixIcon: "calendarDays" } },
    { label: "비상 연락처", required: true, control: { kind: "input", size: "medium", value: "010-1234-5678", inputmode: "tel" } },
    { label: "휴가 사유", max: 1000, control: { kind: "textarea", size: "medium", value: "가족 행사 참석으로 연차를 씁니다.\n인수인계 문서는 결재 전에 팀 채널에 올려 두었습니다." } },
  ];
  const leaveMarks = textFieldMarks(leaveFields);
  const leaveForm = () => `<div class="ptf-form">${leaveFields.map((f, i) => textField({ ...f, mark: leaveMarks[i] })).join("")}</div>`;
  const viewDialog = overlayFrame({
    device: "desktop",
    height: 520,
    page: overlayPage({ desktop: true }),
    layers: [overlayScrim(), overlayLayer("dialog", overlayDialog({ title: "거래 상세", close: true, body: overlayValueList(detail) }))],
  });
  const leaveDialog = (scroll) => overlayFrame({
    device: "desktop",
    height: 520,
    page: overlayPage({ desktop: true, title: "휴가", rows: OVERLAY_LEAVE }),
    layers: [overlayScrim(), overlayLayer("dialog", overlayDialog({
      title: "휴가 신청",
      description: "승인되면 알려드려요.",
      body: leaveForm(),
      footer: [overlayButton("취소", { variant: "neutral-weak" }), overlayButton("신청")],
      scroll,
    }))],
  });
  const dialogPanel = panel(
    "Dialog — 조회 · 본문 스크롤",
    "medium 480(기본) · large 800 이고, 좌우 20 은 남기며 높이는 화면의 80% 까지다 · 모서리 20. 머리는 위 24 · 좌우 24 · 아래 16, 제목 22/30 · 700 · 설명 16/22 · fg-neutral-muted(사이 6). 바닥은 위 16 · 좌우 24 · 아래 24 에 버튼을 오른쪽으로 모은다(사이 8). 조회 · 안내는 머리 오른쪽에 닫기를 둔다 — 투명 52 상자 · 아이콘 22 fg-neutral-subtle(아이콘이 위 28 · 오른쪽 24 — 제목 첫 줄 가운데와 맞는다)이고, 닫기가 있으면 머리 오른쪽을 52 비운다. 조회의 바닥 버튼은 수정 · 삭제 같은 다른 동작이 있을 때만이고, 조회 · 안내는 바깥 누르기 · Esc 로도 닫힌다. 본문만 스크롤한다 — 머리 · 바닥은 늘 보인다. 본문이 넘치면 아래 48 이 표면 쪽으로 흐려지고(끝까지 스크롤해도 남아 본문 아래 48 을 비워 둔다), 위로 스크롤하면 머리 아래 1px stroke-neutral-subtle 선이 150ms 로 나타난다 — 아래 두 대화상자는 실제로 스크롤된다. 200ms(d4) enter-expressive 로 1.3 배에서 줄며 나타나고 100ms(d2)로 사라진다. 딤 L2 100 · 대화상자 101 — 그 안에서 연 팝오버(L3) · 확인창(L5)이 위에 뜬다.",
    samples([
      sample("조회 — 머리 닫기 · 바닥 버튼 없음", "Dialog — 닫기 52 상자 · 바깥 누르기로도 닫힌다", viewDialog),
      sample("본문이 넘칠 때 — 아래 48 흐림", "DialogBody overflow — 끝까지 스크롤해도 48 을 비워 둔다", leaveDialog("top")),
      sample("위로 스크롤했을 때 — 머리 아래 선", "DialogBody scrolled — 1px stroke-neutral-subtle · 150ms", leaveDialog("scrolled")),
    ], DESKTOP),
  );

  // 4. Alert Dialog — 나란히 · 세로 · 하나(폰 · medium 40) · 대화상자 위(데스크톱 · small 36)
  const alertPhone = (surface) => overlayFrame({ device: "phone", height: 440, page: overlayPage(), layers: [overlayScrim("alert"), overlayLayer("alert", surface)] });
  const alertOverDialog = overlayFrame({
    device: "desktop",
    height: 560,
    page: overlayPage({ desktop: true }),
    layers: [
      overlayScrim(),
      overlayLayer("dialog", overlayDialog({ title: "거래 추가", body: overlayTxForm("medium"), footer: [overlayButton("취소", { variant: "neutral-weak" }), overlayButton("저장")] }), { inert: true }),
      overlayScrim("alert"),
      overlayLayer("alert", alertDialog({ title: "작성한 내용이 사라져요", description: "나가면 입력한 금액과 날짜가 저장되지 않아요.", cancel: "계속 작성", action: "나가기", size: "small" })),
    ],
  });
  const alertPanel = panel(
    "Alert Dialog — 나란히 · 세로 · 하나 · 대화상자 위",
    "되돌릴 수 없는 일 앞에서 묻는 확인창이다 — 폰 · 데스크톱 모두 화면 정중앙에 같은 모양으로 뜬다. 최대 272(좌우 32 는 남긴다) · 안쪽 20 · 모서리 20 · 그림자 없음, 제목 20/27 · 700 이고 설명 16/22 는 다른 떠 있는 표면과 달리 짙은 fg-neutral 이다(꼭 읽어야 할 말 — 제목과 사이 6, 제목이 없으면 0). 버튼은 위 16 · 사이 8 이고 1280 미만 Button medium 40, 이상 small 36 이다. 확정은 되돌릴 수 없으면 criticalSolid, 아니면 neutralSolid, 취소는 neutralWeak — 취소를 빨갛게 칠하지 않는다. 나란히(기본)는 취소 왼쪽 · 확정 오른쪽 반씩이고, 한쪽 글이 반 폭을 넘으면 세로로 쌓고 확정이 위로 간다 — 고르는 prop 없이 글 폭이 정한다(버튼마다 반 폭을 바탕으로 두고 글보다 줄지 않아 줄이 넘어간다). 알리기만 할 때는 버튼 하나가 폭 전체다. 버튼 글은 동작 이름이다(\"확인\" · \"예\" 를 쓰지 않는다). 닫기 버튼이 없고 바깥(딤)을 눌러도 닫히지 않으며, Esc · 뒤로 가기는 취소와 같다. 입력칸을 넣지 않는다 — 입력이 필요하면 Dialog · Bottom Sheet 다. 대화상자 · 시트 위에서는 그 위에 뜬다(L5 딤 300 · 확인창 301).",
    `${samples([
      sample("나란히 — 폰 · medium 40", "horizontal — [취소] [삭제] 반씩 · criticalSolid", alertPhone(alertDialog({ title: "거래를 삭제할까요?", description: "삭제한 거래는 되돌릴 수 없어요.", action: "삭제" }))),
      sample("세로 — 확정 글이 반 폭을 넘을 때", "vertical — 확정이 위 · 둘 다 폭 전체", alertPhone(alertDialog({ title: "관심 그룹을 삭제할까요?", description: "그룹에 담은 종목 12개도 함께 빠져요.", action: "그룹과 종목 함께 삭제" }))),
      sample("하나 — 알리기", "single — 결과에 맞는 동작 이름 · neutralSolid", alertPhone(alertDialog({ title: "로그인이 만료됐어요", description: "30분 동안 쓰지 않아 로그아웃했어요. 다시 로그인해 주세요.", action: "다시 로그인", tone: "neutral", single: true }))),
    ])}${samples([
      sample("데스크톱 웹 · 대화상자 위 — small 36", "작성 중 나가기 — 확인창 L5(300 · 301)가 대화상자 L2(100 · 101) 위", alertOverDialog),
    ], `${DESKTOP} pov-samples--next`)}`,
  );

  // 5. Popover — 안내(제목 + 닫기, 칸 옆 i 버튼) · 고르는 패널(머리 없이 · 완료 — Input Button 의 팝오버)
  const infoId = nextOverlayId("pov-pop");
  const infoTrigger = `<span class="pov-info">남은 연차 8.5일<button class="btn btn-ghost btn-icon-only btn-size-xsmall" type="button" aria-label="연차 사용 규정" aria-haspopup="dialog" aria-expanded="true" aria-controls="${infoId}">${OVERLAY_ICON.info}</button></span>`;
  const infoPopover = overlayPopover({ id: infoId, title: "연차 사용 규정", body: '<p class="pov-pop-text">입사 1년 미만은 한 달에 1일씩 생기고, 1년이 지나면 15일이 생겨요.</p>' });
  const infoFrame = overlayFrame({ device: "desktop", height: 440, page: overlayPage({ desktop: true, title: "휴가", rows: OVERLAY_LEAVE, lead: overlayAnchor(infoTrigger, infoPopover) }) });
  const popoverPanel = panel(
    "Popover — 안내 · 고르는 패널",
    "트리거에 붙어 뜨는 비모달 표면이다 — 1280 이상에서 칸 옆 안내 · 고르는 패널(Input Button 의 달력 · 시각 · 목록)을 띄우고, 같은 내용이 1280 미만에서는 Bottom Sheet 다. 폭 320 ~ 480(화면 가장자리에서 16 을 남긴다) · 높이는 600 과 남은 공간 중 작은 쪽까지 · 모서리 20 · 그림자 s3 이고, 트리거와 8 떨어져 아래에 뜬다(아래가 모자라면 위로, 옆으로 넘치면 화면 안으로 민다). 딤 · 스크롤 잠금이 없고 뒤 화면을 숨기지 않는다. 머리 · 본문 · 바닥 여백은 Dialog 와 같고 제목만 20/27 · 700, 설명은 14/19 · fg-neutral-muted 다. 안내 팝오버는 제목 + 닫기(52 상자 · 아이콘이 위 27 · 오른쪽 24)이고, 고르는 패널은 머리 없이 본문만 — 무엇을 고르는지는 트리거가 말한다. 바닥 버튼은 고른 것을 넣을 때(\"완료\")만 Button small 36 오른쪽이다. 열면 초점이 안으로(닫기 버튼이 아니라 내용) 가지만 가두지 않는다 — 마지막에서 Tab 으로 나가면 닫히고, 바깥 · Esc 로 닫으면 트리거로 돌아간다. 호버로 열지 않는다. 150ms(d3) enter 로 트리거 쪽에서 0.95 배부터 커지고 100ms(d2)로 사라진다. L3 200 — 페이지에서도 대화상자 · 시트 안에서도 그 위에 뜬다.",
    samples([
      sample("안내 — 제목 + 닫기", "PopoverContent title — 칸 옆 i 버튼(ghost · xsmall · 아이콘만) · 아래 8", infoFrame),
      sample("고르는 패널 — 머리 없이 · 완료", "Input Button 의 팝오버 — 칸 아래 8 · 왼쪽 맞춤 · 완료 small 36", pickSurfaceMock.desktop()),
    ], DESKTOP),
  );

  // 6. 닫기 버튼 — 시트 원 · 대화상자 · 팝오버 상자 × 기본 · 누름 · 포커스 · 누르는 영역. 누름 · 포커스는 그 순간을 멈췄다(.pov-close--pressed · --focus)
  const closeCols = [
    { ko: "기본", en: "enabled" },
    { ko: "누름", en: "pressed — 바탕 + 2px 거리 축소", interaction: "pressed" },
    { ko: "포커스", en: "focused — 키보드만 · 링 2px", interaction: "focus" },
    { ko: "누르는 영역", en: "점선 — 원 44 · 상자 52", target: true },
  ];
  const closeRows = [
    { ko: "시트 — 28 원", en: "bg-neutral-weak · 아이콘 14 fg-neutral — 누름 bg-neutral-weak-pressed", kind: "circle" },
    { ko: "대화상자 · 팝오버 — 52 상자", en: "투명 · 모서리 12 · 아이콘 22 fg-neutral-subtle — 누름 bg-layer-floating-pressed", kind: "box" },
  ];
  const closePanel = panel(
    "닫기 버튼 — 기본 · 누름 · 포커스",
    "닫기는 이름이 \"닫기\" 인 버튼이다. 시트는 28 원(bg-neutral-weak · 아이콘 lucide x 14 fg-neutral)이고 누르는 영역을 사방 8 넓혀 44 × 44 로 둔다 — 원 바탕(표면과 1.08 · 다크 1.13:1)은 장식이고 아이콘(16.41 · 11.62:1)이 버튼을 알린다. 대화상자 · 팝오버는 투명 52 상자(모서리 12 · 아이콘 22 fg-neutral-subtle — 5.50 · 5.27:1)다. 누르면 시트는 원 바탕이 bg-neutral-weak-pressed, 상자는 bg-layer-floating-pressed 로 칠해지고 버튼이 2px 거리로 준다(기준 28 · 52 — 모션 줄이기면 줄지 않는다). 포커스는 키보드로 왔을 때만 바깥 링 2px · 띄움 2px stroke-focus-ring 이다. 누름 · 포커스는 그 순간을 멈춰 그렸다 — 버튼은 실제 버튼이라 눌러 보면 같은 모습이다. 칸의 바탕은 떠 있는 표면(bg-layer-floating)이다. 확인창에는 닫기가 없다.",
    `
      <div class="cb-matrix pov-close-matrix" style="--cb-cols: ${closeCols.length};">
        <div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">닫기</div>${
          closeCols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
        }</div>${closeRows.map(r => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(r.ko)}<span>${escape(r.en)}</span></div>${
          closeCols.map(c => `<div class="cb-matrix-cell"><span class="pov-close-demo${c.target ? " pov-close-demo--target" : ""}">${overlayClose({ kind: r.kind, interaction: c.interaction || "" })}</span></div>`).join("")
        }</div>`).join("")}
      </div>`,
  );

  const lede = "SEED Bottom Sheet · Dialog · Responsive Dialog · Alert Dialog · Popover 구조 — 표면을 일로 나눈다. 폼 · 상세는 한 부품이 폭으로 표면을 바꾼다 — 1280 미만은 아래에서 올라오는 시트(최대 480 · 위 모서리 24), 이상은 가운데 대화상자(medium 480 · large 800 · 모서리 20 · 높이는 화면의 80% 까지). 되돌릴 수 없는 확인은 폰 · 데스크톱 모두 가운데 확인창(최대 272), 트리거에 붙는 짧은 안내 · 고르는 패널은 1280 이상에서 팝오버(320 ~ 480 · 그림자 s3)다. 시트 · 대화상자 · 확인창은 그림자 없이 딤(0.50 · 다크 0.65) 위의 떠 있는 표면(bg-layer-floating)이고, 팝오버만 딤 없이 그림자로 뜬다. 입력 폼은 바깥 누르기 · 끌어내리기로 닫히지 않고, 닫기 버튼과 바닥 취소는 하나만 둔다. 쌓임은 specs/z-index.md — 시트 · 대화상자 L2(100 · 101) · 팝오버 L3(200) · 확인창 L5(300 · 301). 그림은 열린 순간을 멈춘 것이고, 폰 · 데스크톱 화면 틀은 갤러리 것이다. 옛 Modal · 아래 Drawer · 옛 Alert Dialog · 옛 Popover(테두리 · shadow-md) 모양은 걷었다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 포커스 링이 여기서는 중립(fg-neutral)으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03k — Bottom Sheet · Dialog · Alert Dialog · Popover</div>
      <h2 class="section-title">시트 · 대화상자 · 확인창 · 팝오버 — 1280&nbsp;에서 바뀌는 표면 · 닫는 길 · 쌓임</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${splitPanel}
    ${sheetPanel}
    ${dialogPanel}
    ${alertPanel}
    ${popoverPanel}
    ${closePanel}
  </section>`;
}

// 알림 메시지 — spec: specs/components/snackbar.md · callout.md · page-banner.md · result-section.md · 수치 snackbar.yaml · callout.yaml · page-banner.yaml ·
// result-section.yaml. 구조는 SEED Snackbar · Callout · Page Banner · Result Section(2026-10-02). 옛 Sonner · Alert · Banner · 빈 화면 카드를 대신한다.
// 스낵바 — 띠 .psnack(role=status · aria-atomic · Tab 이 선다) > 앞 아이콘 .psnack-icon(성공 · 실패에만) · 글과 액션 .psnack-content > 글 .psnack-message ·
//   액션 .psnack-action, 끝에 보조 기술용 닫기 .psnack-close(보이지 않고 키보드 초점이 오면 띠 오른쪽 끝에 보인다). 자리 .psnack-region 은 화면 아래 가운데다.
// 콜아웃 — 상자 .pcallout(보이기 · 닫기는 div, 전체 누르기는 button) > 앞 아이콘 · 한 문단 .pcallout-content(제목 · 본문 · 링크 — 사이 띄어쓰기 두 칸) · 뒤 화살표 · 닫기.
// 페이지 배너 — 띠 .pbanner(화면 폭 · 옅음 weak · 짙음 solid) > 안 .pbanner-inner(전체 누르기면 이것만 준다) > 앞 아이콘 · 글과 버튼 .pbanner-content · 뒤 화살표 · 닫기.
// 결과 — .presult(large · medium) > 아이콘 40 · 제목(제목 태그) · 설명 · 버튼 둘(Button neutralWeak medium 40 · ghost small 36 — 03 의 .btn 그대로).
// 아이콘은 lucide 선 아이콘이다(v106 — 채운 원은 쓰지 않는다). 누름 · 호버 · 포커스는 그 순간을 멈춘 클래스(--pressed · --hover · --focus)로 그렸다.
// data-psnack-show 버튼(띄우기) · data-pfb-live 안의 닫기 · data-presult-retry(다시 시도)는 페이지 끝 스크립트가 흉내 낸다.
let pfbSeq = 0;
const nextPfbId = (prefix = "pfb") => `${prefix}-${(pfbSeq += 1)}`;
const FB_ICON = {
  circleCheck: TEXT_FIELD_ICON.circleCheck,
  circleAlert: TEXT_FIELD_ICON.circleAlert,
  info: listSvg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  triangleAlert: listSvg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
  x: CHIP_ICON.x,
  chevronRight: PICK_ICON.chevronRight,
  receiptText: listSvg('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>'),
  searchX: listSvg('<path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
  inbox: listSvg('<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>'),
  listChecks: listSvg('<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>'),
  house: PICK_ICON.house,
  wallet: LIST_ICON.wallet,
  chartPie: listSvg('<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>'),
};
// 톤마다 앞 아이콘(Callout · Page Banner) — neutral · informative 는 info, positive 는 체크, warning 은 세모 느낌표, critical 은 원 느낌표
const FB_TONE_ICON = { neutral: "info", informative: "info", positive: "circleCheck", warning: "triangleAlert", critical: "circleAlert" };
const FB_TONES = ["neutral", "informative", "positive", "warning", "critical"];

// 스낵바 띠 하나 — 글(message · action)은 여기서 escape 한다.
//   tone    neutral(기본 — 아이콘 없음) · positive(체크) · critical(느낌표). 아이콘 · 액션은 반전 짝 색(fg-*-inverted, v115)
//   action  액션 글 — 하나, 동작 이름(되돌리기 · 잔액 고치기). 있으면 6초, 없으면 4초다(띄우는 스크립트가 센다)
//   state   pressed(액션 누름) · focus(띠) · focusAction(액션) · focusClose(닫기가 보인다) — 그 순간을 멈춘 띠(갤러리 전용)
export function snackbar({ tone = "neutral", message = "", action = "", state = "" } = {}) {
  const icon = tone === "positive" ? FB_ICON.circleCheck : tone === "critical" ? FB_ICON.circleAlert : "";
  const cls = ["psnack", `psnack--${tone}`, state === "focus" && "psnack--focus"].filter(Boolean).join(" ");
  const actionCls = ["psnack-action", state === "pressed" && "psnack-action--pressed", state === "focusAction" && "psnack-action--focus"].filter(Boolean).join(" ");
  const closeCls = ["psnack-close", state === "focusClose" && "psnack-close--focus"].filter(Boolean).join(" ");
  return `<div class="${cls}" role="status" aria-atomic="true" tabindex="0">${icon ? `<span class="psnack-icon" aria-hidden="true">${icon}</span>` : ""}<div class="psnack-content"><p class="psnack-message">${escape(message)}</p>${
    action ? `<button type="button" class="${actionCls}">${escape(action)}</button>` : ""
  }</div><button type="button" class="${closeCls}" aria-label="닫기">${FB_ICON.x}</button></div>`;
}

// 콜아웃 하나 — 글(title · description · link)은 여기서 escape 한다. 제목 · 본문 · 링크는 한 문단이고 사이는 띄어쓰기 두 칸이다(.pcallout-content 가 그대로 둔다)
//   tone         neutral(기본) · informative · positive · warning · critical — 바탕 bg-*-weak, 글 · 아이콘 · 링크 · 화살표 · 닫기는 모두 fg-*-contrast
//   interaction  display(보이기 — 링크를 둘 수 있다) · actionable(상자 전체가 버튼 — 뒤 화살표, 링크는 두지 않는다) · dismissible(닫기 — 한 번 보면 되는 안내만)
//   role         alert — 나중에 나타나는 경고 · 위험(저장 실패)
//   state        hover · pressed · focus(상자) · linkFocus · closeHover · closePressed · closeFocus — 그 순간을 멈춘 콜아웃(갤러리 전용)
//   live         닫기를 눌러 볼 수 있다 — 바로 사라지고 초점은 다음 요소로 간다(페이지 끝 스크립트)
export function callout({ tone = "neutral", interaction = "display", title = "", description = "", link = "", role = "", state = "", live = false } = {}) {
  const actionable = interaction === "actionable";
  const cls = ["pcallout", `pcallout--${tone}`, actionable && "pcallout--actionable", ["hover", "pressed", "focus"].includes(state) && `pcallout--${state}`].filter(Boolean).join(" ");
  const text = [
    title && `<span class="pcallout-title">${escape(title)}</span>`,
    description && `<span class="pcallout-desc">${escape(description)}</span>`,
    !actionable && link && `<a class="pcallout-link${state === "linkFocus" ? " pcallout-link--focus" : ""}" href="#" data-pfb-link="">${escape(link)}</a>`,
  ].filter(Boolean).join('<span class="pcallout-space">  </span>');
  const icon = `<span class="pcallout-icon" aria-hidden="true">${FB_ICON[FB_TONE_ICON[tone]]}</span>`;
  if (actionable) return `<button type="button" class="${cls}">${icon}<span class="pcallout-content">${text}</span><span class="pcallout-suffix" aria-hidden="true">${FB_ICON.chevronRight}</span></button>`;
  const closeState = { closeHover: " pcallout-close--hover", closePressed: " pcallout-close--pressed", closeFocus: " pcallout-close--focus" }[state] || "";
  const close = interaction === "dismissible" ? `<button type="button" class="pcallout-close${closeState}" aria-label="닫기">${FB_ICON.x}</button>` : "";
  return `<div ${attrsOf([`class="${cls}"`, role && `role="${role}"`, live && 'data-pfb-live=""'])}>${icon}<p class="pcallout-content">${text}</p>${close}</div>`;
}

// 페이지 배너 하나 — 글(title · description · button)은 여기서 escape 한다. 제목과 본문은 한 문단(사이 띄어쓰기 두 칸)이고, 버튼은 한 줄에 안 들어가면 다음 줄 본문 시작선으로 간다
//   tone         neutral(기본) · informative · positive · warning · critical
//   variant      weak(옅은 바탕 — 기본, Callout 과 같은 짝) · solid(짙은 바탕 + 흰 글 — 무거운 상태에만)
//   interaction  display(보이기 — 버튼 하나를 둘 수 있다) · actionable(띠 전체가 버튼 — 뒤 화살표) · dismissible(닫기)
//   state        hover · pressed · focus(띠) · buttonPressed · buttonFocus · closePressed · closeFocus — 그 순간을 멈춘 띠(갤러리 전용)
//   live         닫기를 눌러 볼 수 있다(페이지 끝 스크립트)
export function pageBanner({ tone = "neutral", variant = "weak", interaction = "display", title = "", description = "", button = "", role = "", state = "", live = false } = {}) {
  const actionable = interaction === "actionable";
  const cls = ["pbanner", `pbanner--${variant}`, `pbanner--${tone}`, actionable && "pbanner--actionable", ["hover", "pressed", "focus"].includes(state) && `pbanner--${state}`].filter(Boolean).join(" ");
  const text = [title && `<span class="pbanner-title">${escape(title)}</span>`, description && `<span class="pbanner-desc">${escape(description)}</span>`].filter(Boolean).join('<span class="pbanner-space">  </span>');
  const icon = `<span class="pbanner-icon" aria-hidden="true">${FB_ICON[FB_TONE_ICON[tone]]}</span>`;
  if (actionable) {
    return `<button type="button" class="${cls}"><span class="pbanner-inner">${icon}<span class="pbanner-content"><span class="pbanner-text">${text}</span></span><span class="pbanner-suffix" aria-hidden="true">${FB_ICON.chevronRight}</span></span></button>`;
  }
  const buttonState = { buttonPressed: " pbanner-button--pressed", buttonFocus: " pbanner-button--focus" }[state] || "";
  const btn = button ? `<button type="button" class="pbanner-button${buttonState}">${escape(button)}</button>` : "";
  const closeState = { closePressed: " pbanner-close--pressed", closeFocus: " pbanner-close--focus" }[state] || "";
  const close = interaction === "dismissible" ? `<button type="button" class="pbanner-close${closeState}" aria-label="닫기">${FB_ICON.x}</button>` : "";
  return `<div ${attrsOf([`class="${cls}"`, role && `role="${role}"`, live && 'data-pfb-live=""'])}><div class="pbanner-inner">${icon}<div class="pbanner-content"><p class="pbanner-text">${text}</p>${btn}</div>${close}</div></div>`;
}

// 결과 하나 — 글은 여기서 escape 한다. 결과로 바뀌면 보조 기술에 알린다(role=status), 제목은 제목 태그다(갤러리는 절 제목 아래라 h3).
//   kind      empty(비어 있음 — 회색 아이콘, 무엇이 비었는지 말하는 아이콘을 준다) · failure(실패 — 위험 색 느낌표) · done(완료 — 성공 색 체크)
//   size      large(화면 전체 — 기본) · medium(카드 · 섹션 · 시트 안)
//   icon      FB_ICON 이름 — 실패 · 완료는 주지 않으면 느낌표 · 체크
//   primary · secondary  첫 버튼(Button neutralWeak medium 40) · 둘째 버튼(Button ghost small 36 — 위아래로 블리드)
//   retry     첫 버튼이 다시 시도다 — 누르면 로딩을 걸고 곁의 <template> 내용으로 바꾼다(페이지 끝 스크립트)
export function resultSection({ kind = "empty", size = "large", icon = "", title = "", description = "", primary = "", secondary = "", level = 3, retry = false } = {}) {
  const asset = FB_ICON[icon || (kind === "failure" ? "circleAlert" : kind === "done" ? "circleCheck" : "inbox")];
  const first = primary ? `<button class="btn btn-neutral-weak" type="button"${retry ? ' data-presult-retry=""' : ""}><span>${escape(primary)}</span></button>` : "";
  const second = secondary ? `<button class="btn btn-ghost btn-size-small presult-secondary" type="button"><span>${escape(secondary)}</span></button>` : "";
  const actions = first || second ? `<div class="presult-actions">${first}${second}</div>` : "";
  return `<div class="presult presult--${size} presult--${kind}" role="status"><span class="presult-asset" aria-hidden="true">${asset}</span><h${level} class="presult-title">${escape(title)}</h${level}>${
    description ? `<p class="presult-desc">${escape(description)}</p>` : ""
  }${actions}</div>`;
}

// 알림 메시지 갤러리 — Snackbar(톤 · 액션 · 상태 · 자리 · 직접 띄우기) · Callout(톤 × 상호작용 · 상태 · 폼 맨 위 오류) · Page Banner(옅음 · 짙음 × 톤 · 자리 · 상호작용) ·
// Result Section(크기 × 결과 · 404) 여덟 판을 흰 표면(.vignette-card) 위에 그린다. 견본 틀(.ptf-samples · .ptf-cap)과 상태 표(.cb-matrix)는 Text Field 갤러리 것이다.
// 글은 스펙 md 의 코드 예와 비교 페이지(2026-10-02)의 Desk 화면에서 빌렸다 — 해요체 · 문장이면 마침표(스낵바도), 버튼은 동작 이름(Writing v106).
export function renderFeedbackGallery(brand) {
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  const samples = (items, cls = "ptf-samples") => `
      <div class="${cls}">${items.join("")}
      </div>`;
  const sample = (cap, en, body, cls = "") => `
        <div class="ptf-sample${cls}">
          <div class="ptf-cap">${escape(cap)}<span>${escape(en)}</span></div>
          ${body}
        </div>`;
  // 상태 표 — 줄(머리 글 · 영문) × 칸. 칸마다 상자 · 띠를 실제 폭으로 그린다. 칸이 좁아지면 판(.cb-panel)이 가로로 밀린다
  const matrix = (cls, first, cols, rows, cell) => `
      <div class="cb-matrix ${cls}" style="--cb-cols: ${cols.length};">
        <div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">${escape(first)}</div>${
          cols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
        }</div>${rows.map(r => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(r.ko)}<span>${escape(r.en)}</span></div>${
          cols.map(c => `<div class="cb-matrix-cell pfb-cell">${cell(r, c)}</div>`).join("")
        }</div>`).join("")}
      </div>`;
  const na = (text) => `<span class="psel-na">${escape(text)}</span>`;
  // 틀 — 띠 견본 칸(폰 폭 · 자리 여백 8) · 폰 화면 · 데스크톱 웹 화면 · 머리와 그 아래 배너만 그린 화면 윗부분. 모두 갤러리 것이다
  const strip = (html) => `<div class="pfb-strip">${html}</div>`;
  const head = (title, cls = "pfb-phone-head") => `<div class="${cls}"><div class="ptf-screen-title">${escape(title)}</div></div>`;
  const tabbar = `<div class="pfb-tabbar" aria-hidden="true">${[["house", "홈"], ["receiptText", "가계부"], ["wallet", "자산"], ["chartPie", "통계"]].map(([icon, label], i) =>
    `<span class="pfb-tab${i === 1 ? " pfb-tab--on" : ""}">${FB_ICON[icon]}<span>${label}</span></span>`).join("")}</div>`;
  const tile = (color, icon) => `<span class="plst-tile plst-tile--${color}">${LIST_ICON[icon]}</span>`;
  const won = (v) => `<span class="plst-amount">${escape(v)}</span>`;
  const ledgerRows = () => listOf([
    listRow({ prefix: tile("orange", "utensils"), title: "김밥천국", detail: "식비 · 현대카드 M", suffix: won("8,000원") }),
    listRow({ prefix: tile("blue", "bus"), title: "버스", detail: "교통 · 현대카드 M", suffix: won("1,500원") }),
    listRow({ prefix: tile("violet", "bag"), title: "다이소", detail: "쇼핑 · 현대카드 M", suffix: won("12,300원") }),
    listRow({ prefix: tile("orange", "utensils"), title: "스타벅스", detail: "식비 · 국민 주계좌", suffix: won("6,800원") }),
  ], ' aria-label="10월 거래"');

  // 1. Snackbar — 톤 · 액션 · 상태. 띠는 폰 폭(360)에서 자리 여백 8 을 뺀 폭이다(344)
  const snackPanel = panel(
    "Snackbar — 톤 · 액션 · 상태",
    "짙은 띠 하나다 — bg-neutral-inverted(다크는 밝은 띠) · 최소 44 · 여백 10 + 글 좌우 6(글은 띠 가장자리에서 16) · 모서리 8 · 그림자 없음, 폭은 자리에서 좌우 8 을 뺀 만큼이고 최대 464 다. 글은 14 / 19 · 400 · fg-neutral-inverted 이고 줄을 바꾸되 자르지 않는다 — 두 줄 안에서 끝나게 쓴다. neutral(기본)은 아이콘이 없고, 성공을 눈에 띄게 알릴 때만 positive(circle-check), 다시 하면 되는 가벼운 실패에 critical(circle-alert)이다 — 아이콘은 상자 24 안에 오른쪽 2(그림 22)를 두어 글이 띠 가장자리에서 40 에 서고, 색만 바뀐다. 액션은 하나 · 동작 이름 · 14 · 700 이고 짙은 띠 위에서 보이게 반전 짝 색(fg-brand-inverted)이다 — 누르는 영역은 글 + 좌우 8 × 44, 누르면 글만 2px 거리로 준다. 포커스는 키보드에만 링 2px · 띠 글자색(fg-neutral-inverted)이고 늘 띠 위에 그린다 — 액션은 바깥 2 띄우고, 띠 · 닫기는 띄움 −4(가장자리에서 2 안쪽)다. 바깥에 그리면 페이지 위라 보이지 않는다. Tab 은 띠 → 액션 → 보조 기술용 닫기 차례로 선다. 닫기는 평소에 보이지 않다가 키보드 초점이 오면 띠 오른쪽 끝에 X 16(44 상자)으로 보인다. 누름 · 포커스는 그 순간을 멈춰 그렸다 — 띠 · 액션은 실제로 Tab 으로 옮겨 볼 수 있다.",
    samples([
      sample("neutral — 아이콘 없음", "tone=\"neutral\"(기본) — 결과 · 안내", strip(snackbar({ message: "거래를 저장했어요." }))),
      sample("positive — 체크", "아이콘 24 · fg-positive-inverted — 성공을 눈에 띄게 알릴 때만", strip(snackbar({ tone: "positive", message: "관심 종목에 넣었어요." }))),
      sample("critical — 느낌표", "아이콘 24 · fg-critical-inverted — 다시 하면 되는 가벼운 실패", strip(snackbar({ tone: "critical", message: "관심 종목에 넣지 못했어요. 다시 눌러 주세요." }))),
      sample("액션 — 되돌리기", "action — 14 · 700 · fg-brand-inverted · 누르는 영역 44", strip(snackbar({ message: "거래를 삭제했어요.", action: "되돌리기" }))),
      sample("긴 글 — 줄을 바꾸고 자르지 않는다", "단어 단위 줄바꿈(v114) · 글과 액션은 양 끝 · 사이 10", strip(snackbar({ tone: "positive", message: "미리 낸 돈 중 32,000원이 계좌로 돌아왔어요.", action: "잔액 고치기" }))),
      sample("누름 — 액션 글만 2px 거리 축소", "pressed — 기준 max(높이, 폭 ÷ 4, 24) · 150ms", strip(snackbar({ message: "거래를 삭제했어요.", action: "되돌리기", state: "pressed" }))),
      sample("포커스 — 띠", "focused — 링 2px · 띄움 −4 · fg-neutral-inverted", strip(snackbar({ message: "거래를 삭제했어요.", action: "되돌리기", state: "focus" }))),
      sample("포커스 — 액션", "Tab — 띠 다음은 액션 · 바깥 2", strip(snackbar({ message: "거래를 삭제했어요.", action: "되돌리기", state: "focusAction" }))),
      sample("보조 기술용 닫기 — 키보드 초점이 오면 보인다", "이름 \"닫기\" · 44 상자 · X 16 · 띠 오른쪽 끝 · 링 띄움 −4", strip(snackbar({ message: "거래를 삭제했어요.", action: "되돌리기", state: "focusClose" }))),
    ]),
  );

  // 2. Snackbar — 자리. 폰은 탭 바(56 — 갤러리 틀) 위 8, 데스크톱은 아래 가운데 8 · 최대 464
  const placementPanel = panel(
    "Snackbar — 자리: 폰은 탭 바 위 8 · 데스크톱은 아래 가운데 최대 464",
    "어느 폭이든 화면 아래 가운데다 — 자리는 좌우 · 아래 8 을 두고(안전 영역이 있으면 그만큼 더), 탭 바 · 플로팅 버튼 · 바닥 버튼이 있으면 그 위 8 에 선다(SnackbarAvoidOverlap). 띠는 자리 폭을 채우다 464 에서 멈추고 넓은 화면에서는 가운데에 선다. 시트 · 대화상자가 열려 있어도 그 위에 그린다(z L6 400) — 다만 시트 안에서 한 일의 결과는 그 안 Callout 으로 알리고 스낵바는 시트가 닫힌 뒤에 띄운다. 한 번에 하나만 보이고 쌓지 않는다.",
    samples([
      sample("폰 — 탭 바 위 8", "SnackbarAvoidOverlap 이 탭 바를 피한다 — 띠 344(360 − 좌우 8)", `<div class="pfb-phone pfb-phone--screen pfb-phone--tabbar">${head("가계부")}<div class="pfb-phone-body">${ledgerRows()}</div><div class="psnack-region" role="region" aria-label="알림 — 그림">${snackbar({ message: "거래를 삭제했어요.", action: "되돌리기" })}</div>${tabbar}</div>`),
      sample("데스크톱 웹 — 아래 가운데 · 최대 464", "넓으면 464 에서 멈추고 가운데에 선다", `<div class="pfb-desk pfb-desk--tall">${head("가계부", "pfb-desk-head")}<div class="pfb-desk-body">${ledgerRows()}</div><div class="psnack-region" role="region" aria-label="알림 — 그림">${snackbar({ message: "거래를 삭제했어요.", action: "되돌리기" })}</div></div>`),
    ], "ptf-samples ptf-samples--forms"),
  );

  // 3. Snackbar — 직접 띄워 보기. 버튼이 폰의 자리에 띠를 띄운다(페이지 끝 스크립트). 자리는 실제 aria-live 다 — 띄운 글을 보조 기술이 읽는다
  const regionId = nextPfbId("psnack-region");
  const shows = [
    { label: "결과 — 4초", message: "거래를 저장했어요." },
    { label: "되돌리기 — 6초", message: "거래를 삭제했어요.", action: "되돌리기" },
    { label: "가벼운 실패 — 4초", tone: "critical", message: "관심 종목에 넣지 못했어요. 다시 눌러 주세요." },
    { label: "잔액 고치기 — 6초", tone: "positive", message: "미리 낸 돈 중 32,000원이 계좌로 돌아왔어요.", action: "잔액 고치기" },
  ];
  const showButtons = shows.map(s => `<button class="btn btn-neutral-weak btn-size-small" type="button" data-psnack-show="" data-psnack-target="${regionId}" data-psnack-message="${escape(s.message)}"${
    s.tone ? ` data-psnack-tone="${s.tone}"` : ""}${s.action ? ` data-psnack-action="${escape(s.action)}"` : ""}><span>${escape(s.label)}</span></button>`).join("");
  const livePanel = panel(
    "Snackbar — 직접 띄워 보기: 4초 · 액션 6초 · 머무는 동안 멈춤 · 한 번에 하나",
    "버튼을 누르면 폰 아래(탭 바 위 8)에 띠가 150ms 로 가운데에서 커지며 나타난다(scale 0.8 → 1 · 투명도, ease-enter — 모션 줄이기면 투명도만). 액션이 없으면 4초, 있으면 6초 뒤 100ms 로 사라진다. 마우스를 올리거나 · 손가락으로 누르고 있거나 · 키보드 초점이 띠 안에 있으면 멈추고, 모두 떠나면 처음부터 다시 센다. 다른 버튼을 누르면 지금 띠를 바로 걷고(100ms) 새 띠를 띄운다 — 쌓지 않는다. 액션을 누르면 닫히고, Esc · 띠 누르기로는 닫히지 않는다. 초점은 옮기지 않는다 — 자리(aria-live=\"polite\")가 글을 읽힌다. 남은 시간은 옆 글이 보인다.",
    `
      <div class="pfb-live">
        <div class="pfb-phone pfb-phone--screen pfb-phone--tabbar">${head("가계부")}<div class="pfb-phone-body">${ledgerRows()}</div><div class="psnack-region" id="${regionId}" role="region" aria-label="알림" aria-live="polite"></div>${tabbar}</div>
        <div class="pfb-live-controls">
          <div class="pfb-live-buttons">${showButtons}</div>
          <p class="pfb-live-status" aria-hidden="true" data-psnack-status="${regionId}">버튼을 누르면 폰 아래에 띠가 뜬다.</p>
        </div>
      </div>`,
  );

  // 4. Callout — 톤 다섯 × 상호작용 셋. 닫기는 한 번 보면 되는 안내에만 — 경고 · 오류에는 두지 않는다
  const calloutText = {
    neutral: {
      display: { title: "안내", description: "지난달 거래는 이번 달 예산에 들지 않아요.", link: "자세히" },
      actionable: { description: "토스증권을 연결하면 보유 주식이 자산에 더해져요." },
      dismissible: { title: "새 기능", description: "자산마다 금액을 가릴 수 있어요." },
    },
    informative: {
      display: { title: "안내", description: "가져온 데이터는 기존 거래에 더해지고 덮어쓰지 않아요.", link: "자세히" },
      actionable: { description: "반복 거래로 매달 나가는 돈을 자동으로 기록해 보세요." },
      dismissible: { title: "새 기능", description: "반복 거래를 자동으로 기록할 수 있어요." },
    },
    positive: {
      display: { title: "혜택", description: "이번 달 카드 실적을 채웠어요.", link: "자세히" },
      actionable: { description: "이번 달 예산을 지켰어요. 지난달과 견줘 보세요." },
      dismissible: { title: "완료", description: "1,204건을 가계부에 넣었어요." },
    },
    warning: {
      display: { title: "주의", description: "분할 금액의 합이 거래 금액보다 3,000원 적어요.", link: "자세히" },
      actionable: { description: "카드 결제일이 내일이에요. 결제할 금액을 확인해 보세요." },
    },
    critical: {
      display: { description: "저장하지 못했어요. 입력한 내용은 그대로 있어요. 잠시 뒤 다시 저장해 주세요." },
      actionable: { description: "결제 수단이 지워진 거래가 3건 있어요. 눌러서 고쳐 주세요." },
    },
  };
  const calloutCols = [
    { ko: "보이기", en: "display — 링크를 둘 수 있다", interaction: "display" },
    { ko: "전체 누르기", en: "actionable — button · 뒤 chevron-right", interaction: "actionable" },
    { ko: "닫기", en: "dismissible — 닫기 40 · 한 번 보면 되는 안내만", interaction: "dismissible" },
  ];
  const calloutRows = FB_TONES.map(tone => ({ ko: tone, en: tone === "neutral" ? "bg-neutral-weak · fg-neutral — 기본" : `bg-${tone}-weak · fg-${tone}-contrast`, tone }));
  const calloutPanel = panel(
    "Callout — 톤 다섯 × 보이기 · 전체 누르기 · 닫기",
    "그 기능 · 내용 바로 위에 늘 보이는 안내 상자다 — 콘텐츠 폭 · 최소 50 · 안쪽 14 · 모서리 10 · 사이 12, 바탕은 옅은 톤(bg-*-weak)이고 글 · 아이콘 · 링크 · 화살표 · 닫기는 모두 같은 fg-*-contrast 색이다. 제목(700) · 본문(400) · 링크(밑줄 · 띄움 2)는 14 / 19 로 한 문단에 흐르고 사이는 띄어쓰기 두 칸이다. 아이콘 16(neutral · informative 는 info, positive 는 circle-check, warning 은 triangle-alert, critical 은 circle-alert) · 뒤 화살표 16 · 닫기 40(바깥 여백 −12 — 줄 높이를 늘리지 않고 아이콘은 오른쪽 끝에서 14)이고, 여러 줄이면 상자 가운데에 선다. 전체 누르기는 상자 전체가 버튼이라 링크를 두지 않는다. 닫기는 새 기능처럼 한 번 보면 되는 안내에만 두고 닫은 것을 기억한다 — 경고 · 오류는 닫지 못한다(문제가 남아 있는 동안 보여야 한다). 닫기 칸은 직접 눌러 닫아 볼 수 있다.",
    matrix("pcallout-matrix", "톤", calloutCols, calloutRows, (r, c) => {
      const t = calloutText[r.tone][c.interaction];
      if (!t) return na("두지 않는다 — 경고 · 오류는 닫지 못한다");
      return callout({ tone: r.tone, interaction: c.interaction, ...t, live: c.interaction === "dismissible" });
    }),
  );

  // 5. Callout — 상태(informative 로 그렸다) · 저장 실패는 폼 맨 위. 시트 안의 결과 · 오류는 그 안 Callout 이다
  const calloutStateCols = [
    { ko: "기본", en: "enabled" },
    { ko: "호버", en: "hovered — 웹 · 누름 바탕 · 축소 없음", state: "hover" },
    { ko: "누름", en: "pressed — 누름 바탕 + 2px 축소", state: "pressed" },
    { ko: "포커스", en: "focused — 키보드만 · 링 2px · 띄움 2px", state: "focus" },
  ];
  const calloutStateRows = [
    { ko: "전체 누르기", en: "상자 — bg-informative-weak-pressed · 상자 전체 축소", args: { interaction: "actionable", description: "반복 거래로 매달 나가는 돈을 자동으로 기록해 보세요." }, map: { hover: "hover", pressed: "pressed", focus: "focus" } },
    { ko: "닫기", en: "닫기 40 — 누름 바탕 · 닫기만 축소 · 모서리 8", args: { interaction: "dismissible", title: "새 기능", description: "반복 거래를 자동으로 기록할 수 있어요." }, map: { hover: "closeHover", pressed: "closePressed", focus: "closeFocus" } },
    { ko: "링크", en: "링크 — 키보드 링 모서리 4", args: { interaction: "display", title: "안내", description: "가져온 데이터는 기존 거래에 더해져요.", link: "자세히" }, map: { focus: "linkFocus" } },
  ];
  const calloutStatePanelBody = matrix("pcallout-matrix pcallout-matrix--states", "부위", calloutStateCols, calloutStateRows, (r, c) => {
    if (c.state && !r.map[c.state]) return na("없다 — 링크는 글자만");
    return callout({ tone: "informative", ...r.args, state: c.state ? r.map[c.state] : "" });
  });
  const saveError = "저장하지 못했어요. 입력한 내용은 그대로 있어요. 잠시 뒤 다시 저장해 주세요.";
  const sheetMock = `<div class="pib-mock pib-mock--phone pfb-sheet-mock">
          <div class="pib-mock-screen"><div class="ptf-screen-title">가계부</div></div>
          <div class="pib-dim" aria-hidden="true"></div>
          <div class="pib-sheet" role="group" aria-label="거래 추가">
            <div class="pib-sheet-title">거래 추가</div>
            <div class="ptf-form pfb-sheet-form">${callout({ tone: "critical", role: "alert", description: saveError })}${
              textField({ label: "금액", control: { kind: "input", size: "large", value: "28,500", suffix: "원", inputmode: "numeric", format: "amount" } })}${
              textField({ label: "카테고리", control: { kind: "inputButton", size: "large", value: "식비 · 카페", prefixIcon: "coffee", suffixIcon: "chevronDown" } })}</div>
            <button class="btn btn-neutral-solid btn-size-large pib-done" type="button"><span>저장</span></button>
          </div>
        </div>`;
  const deskForm = `<div class="ptf-screen ptf-screen--desktop">
            <div class="ptf-screen-title">휴가 신청</div>
            <div class="ptf-form">${callout({ tone: "critical", role: "alert", description: "신청하지 못했어요. 입력한 내용은 그대로 있어요. 잠시 뒤 다시 신청해 주세요." })}${
              textField({ label: "휴가 정책", control: { kind: "select", size: "medium", value: "연차" } })}${
              textField({ label: "기간", control: { kind: "inputButton", size: "medium", value: "10월 12일 (월)~10월 14일 (수)", suffixIcon: "calendarDays" } })}</div>
            <div class="ptf-screen-actions ptf-screen-actions--end"><button class="btn btn-neutral-weak" type="button"><span>취소</span></button><button class="btn btn-neutral-solid" type="button"><span>신청</span></button></div>
          </div>`;
  const calloutStatePanel = panel(
    "Callout — 상태 · 저장 실패는 폼 맨 위",
    "전체 누르기는 마우스를 올리면(웹) 톤의 누름 바탕(bg-*-weak-pressed)이고, 누르면 그 바탕에 상자 전체가 2px 거리로 준다(기준 max(높이, 폭 ÷ 4, 24) · 150ms — 모션 줄이기면 줄지 않는다). 닫기는 투명 상자라 올리거나 누르면 같은 누름 바탕이 깔리고, 누르면 닫기만 준다(기준 40). 포커스는 키보드로 왔을 때만 링 2px · 띄움 2px stroke-focus-ring 이다 — 상자 · 링크(모서리 4) · 닫기(모서리 8) 둘레. 바탕은 150ms(color-transition)로 바뀐다. 저장 · 제출이 실패하면 폼은 연 채로 폼 맨 위에 critical Callout 을 둔다 — 무엇이 안 됐는지와 할 수 있는 일까지 쓰고, 나중에 나타나는 경고 · 위험이라 role=\"alert\" 로 보조 기술에 알린다. 시트 안에서 한 일의 결과 · 오류도 그 안 Callout 이다(스낵바는 시트가 닫힌 뒤).",
    `${calloutStatePanelBody}${samples([
      sample("폰 — 거래 추가 시트 맨 위", "Callout tone=\"critical\" role=\"alert\" — 시트는 연 채로", sheetMock),
      sample("데스크톱 웹 — 휴가 신청 폼 맨 위", "폼 맨 위 · 칸 오류는 칸 아래(Field)", deskForm),
    ], "ptf-samples ptf-samples--forms pfb-gap")}`,
  );

  // 6. Page Banner — 옅음 · 짙음 × 톤 다섯. 칸마다 머리 바로 아래 띠 하나(화면 윗부분만 그렸다 — 폰 폭)
  const bannerText = {
    neutral: { title: "지난 기록", description: "2025년 가계부를 보고 있어요.", button: "올해로 가기" },
    informative: { title: "새 버전", description: "새 버전이 나왔어요. 새로 고치면 바로 쓸 수 있어요.", button: "새로 고침" },
    positive: { title: "연결됨", description: "토스증권을 연결했어요. 보유 주식이 자산에 더해져요.", button: "자산 보기" },
    warning: { title: "곧 만료", description: "Pro 이용이 10월 31일에 끝나요.", button: "구독 보기" },
    critical: { title: "연결 끊김", description: "토스증권 키가 만료돼 시세를 받지 못해요.", button: "다시 연결" },
  };
  const bannerHead = { neutral: "가계부", informative: "홈", positive: "증권", warning: "설정", critical: "증권" };
  const screenTop = (title, banner) => `<div class="pfb-top">${head(title, "pfb-top-head")}${banner}<div class="pfb-top-body" aria-hidden="true"><span></span><span></span></div></div>`;
  const variantCols = [
    { ko: "옅음", en: "variant=\"weak\"(기본) — bg-*-weak + fg-*-contrast", variant: "weak" },
    { ko: "짙음", en: "variant=\"solid\" — bg-*-solid + 흰 글 · 무거운 상태에만", variant: "solid" },
  ];
  const bannerRows = FB_TONES.map(tone => ({ ko: tone, en: tone === "neutral" ? "weak bg-neutral-weak · solid bg-neutral-inverted" : `weak bg-${tone}-weak · solid bg-${tone}-solid`, tone }));
  const bannerTonePanel = panel(
    "Page Banner — 옅음 · 짙음 × 톤 다섯",
    "페이지 머리 바로 아래(위에 사진이 있으면 그 아래)에 화면 폭 전체로 놓는 띠다 — 한 화면에 하나, 그 페이지 전체의 상태만 알린다. 모서리 0 · 최소 40 · 위아래 10 · 좌우 화면 여백 24(띠 안 글이 페이지 글과 같은 선에서 시작한다) · 아이콘 16(첫 줄 가운데 — 위 2) · 아이콘과 글 사이 8. 제목은 14 / 19 · 700, 본문은 14 / 19 · 500 이고 한 문단(사이 띄어쓰기 두 칸)이다. 버튼은 하나 · 글 버튼 · 13 / 18 · 700 이고 누르는 높이는 40(글 + 사방 11, 바깥 여백 −11 로 띠 높이를 늘리지 않는다)이다. 옅은 바탕(weak · 기본)은 Callout 과 같은 짝(bg-*-weak + fg-*-contrast)이고, 짙은 바탕(solid)은 bg-*-solid + 흰 글(static-white — neutral 은 bg-neutral-inverted + fg-neutral-inverted)이다 — 연결 끊김 · 거절 · 편집 불가처럼 그 페이지를 제대로 쓸 수 없는 상태에만 쓴다. 칸마다 폰 화면 윗부분을 그렸다 — 폭이 좁아 버튼이 다음 줄 본문 시작선으로 내려간 칸이 있다.",
    matrix("pbanner-matrix", "톤", variantCols, bannerRows, (r, c) => screenTop(bannerHead[r.tone], pageBanner({ tone: r.tone, variant: c.variant, ...bannerText[r.tone] }))),
  );

  // 7. Page Banner — 자리 · 버튼 줄바꿈 · 상호작용 · 상태
  const lost = { tone: "critical", ...bannerText.critical };
  const phoneBanner = `<div class="pfb-phone">${head("증권")}${pageBanner(lost)}<div class="pfb-phone-body">${listOf([
    listRow({ title: "삼성전자", detail: "12주 · 평균 71,200원", suffix: won("마지막 값 75,400원") }),
    listRow({ title: "카카오", detail: "5주 · 평균 48,900원", suffix: won("마지막 값 47,100원") }),
  ], ' aria-label="보유 종목"')}</div></div>`;
  const deskBanner = `<div class="pfb-desk">${head("증권", "pfb-desk-head")}${pageBanner(lost)}<div class="pfb-desk-body">${listOf([
    listRow({ title: "삼성전자", detail: "12주 · 평균 71,200원", suffix: won("마지막 값 75,400원") }),
    listRow({ title: "카카오", detail: "5주 · 평균 48,900원", suffix: won("마지막 값 47,100원") }),
  ], ' aria-label="보유 종목"')}</div></div>`;
  const bannerStateCols = [
    { ko: "기본", en: "enabled" },
    { ko: "호버", en: "hovered — 웹 · 누름 바탕", state: "hover" },
    { ko: "누름", en: "pressed — 안의 내용 · 버튼 · 닫기만 2px 축소", state: "pressed" },
    { ko: "포커스", en: "focused — 키보드만 · 안쪽 링 2px", state: "focus" },
  ];
  const bannerStateRows = [
    { ko: "전체 누르기", en: "띠 — 누름 바탕 · 바탕은 그대로 두고 안의 내용만 축소", args: { tone: "informative", interaction: "actionable", title: "공지", description: "새 공지 2개가 있어요." }, map: { hover: "hover", pressed: "pressed", focus: "focus" } },
    { ko: "버튼", en: "글 버튼 — 바탕 없음 · 버튼만 축소(기준 40)", args: { tone: "warning", title: "곧 만료", description: "Pro 이용이 10월 31일에 끝나요.", button: "구독 보기" }, map: { pressed: "buttonPressed", focus: "buttonFocus" } },
    { ko: "닫기", en: "닫기 40 — 바탕 없음 · 닫기만 축소", args: { tone: "informative", interaction: "dismissible", title: "새 기능", description: "반복 거래를 자동으로 기록할 수 있어요." }, map: { pressed: "closePressed", focus: "closeFocus" } },
    // 짙은 바탕 — 링은 띠 글자색(neutral 은 fg-neutral-inverted, 나머지는 흰 글)
    { ko: "짙은 · 전체 누르기", en: "solid neutral — bg-neutral-inverted-pressed · 링 fg-neutral-inverted", args: { tone: "neutral", variant: "solid", interaction: "actionable", title: "공지", description: "새 공지 2개가 있어요." }, map: { hover: "hover", pressed: "pressed", focus: "focus" } },
    { ko: "짙은 · 버튼", en: "solid critical — 링 static-white", args: { tone: "critical", variant: "solid", title: "연결 끊김", description: "토스증권 키가 만료돼 시세를 받지 못해요.", button: "다시 연결" }, map: { pressed: "buttonPressed", focus: "buttonFocus" } },
    { ko: "짙은 · 닫기", en: "solid informative — 링 static-white", args: { tone: "informative", variant: "solid", interaction: "dismissible", title: "새 버전", description: "새로 고치면 바로 쓸 수 있어요." }, map: { pressed: "closePressed", focus: "closeFocus" } },
  ];
  const bannerStates = matrix("pbanner-matrix pbanner-matrix--states", "부위", bannerStateCols, bannerStateRows, (r, c) => {
    if (c.state && !r.map[c.state]) return na("없다 — 바탕이 바뀌지 않는다");
    return `<div class="pfb-band">${pageBanner({ ...r.args, state: c.state ? r.map[c.state] : "" })}</div>`;
  });
  const bannerPlacePanel = panel(
    "Page Banner — 자리 · 버튼 줄바꿈 · 상호작용 · 상태",
    "글과 버튼은 한 줄에 양 끝이다 — 같은 띠가 폰에서는 한 줄에 안 들어가 버튼이 다음 줄 본문 시작선으로 내려가고(사이 6), 넓은 데스크톱에서는 띠 오른쪽 끝(좌우 화면 여백 24 안)에 선다. 페이지 머리 바로 아래 하나만 두고, 그 기능 가까이의 안내는 Callout 이다. 연결이 끊겨도 지난 값은 지우지 않는다. 상호작용은 셋이다 — display(버튼 하나를 둘 수 있다) · actionable(띠 전체가 버튼 — 뒤 chevron-right 16 · 글과 8) · dismissible(닫기 40 · 바깥 여백 −12 — 아이콘은 오른쪽 끝에서 24 · 글과 8, 한 번 보면 되는 안내에만 · 닫은 것을 기억한다). 전체 누르기는 마우스를 올리면(웹) 누름 바탕이고, 누르면 그 바탕은 그대로 두고 안의 내용만 2px 거리로 준다. 버튼 · 닫기는 바탕 없이 저마다 준다. 포커스는 키보드에만 안쪽 링 2px(띄움 −2)이다 — 화면 끝까지 차는 띠라 바깥 링이 잘린다. 링은 띠 위에 그려지므로 옅은 바탕은 stroke-focus-ring, 짙은 바탕은 띠 글자색(흰 글 · neutral 은 fg-neutral-inverted)이다 — 브랜드 링은 짙은 바탕 위 1.0 ~ 3.2:1 이라 보이지 않는다. 버튼 · 닫기도 같다. 화살표 · 닫기는 띠 가운데, 아이콘은 첫 줄에 붙는다. 닫기는 직접 눌러 볼 수 있다.",
    `${samples([
      sample("폰 — 머리 바로 아래 · 버튼이 다음 줄로", "critical · weak · display — 지난 값은 그대로", phoneBanner),
      sample("데스크톱 웹 — 글과 버튼이 한 줄에 양 끝", "같은 띠 · 좌우 화면 여백 24", deskBanner),
    ], "ptf-samples ptf-samples--forms")}${samples([
      sample("닫기 — 한 번 보면 되는 안내", "interaction=\"dismissible\" — 닫으면 다시 띄우지 않는다", `<div class="pfb-band">${pageBanner({ tone: "informative", interaction: "dismissible", title: "새 기능", description: "반복 거래를 자동으로 기록할 수 있어요.", live: true })}</div>`),
      sample("전체 누르기 — 띠가 버튼", "interaction=\"actionable\" — 뒤 chevron-right · 버튼은 두지 않는다", `<div class="pfb-band">${pageBanner({ tone: "neutral", interaction: "actionable", title: "공지", description: "새 공지 2개가 있어요." })}</div>`),
      sample("짙은 바탕 · 버튼 — 무거운 상태", "variant=\"solid\" — 흰 글 · 버튼도 흰 글", `<div class="pfb-band">${pageBanner({ tone: "warning", variant: "solid", title: "곧 만료", description: "Pro 이용이 10월 31일에 끝나요.", button: "구독 보기" })}</div>`),
    ], "ptf-samples pfb-gap")}${bannerStates}`,
  );

  // 8. Result Section — large · medium × 비어 있음 · 실패 · 완료 · 404. 실패 카드의 다시 시도는 눌러 볼 수 있다(로딩 → 내용)
  const retryHost = `<div class="pfb-card" data-presult-host="">${resultSection({ kind: "failure", size: "medium", title: "거래를 불러오지 못했어요", description: "잠시 뒤 다시 시도해 주세요.", primary: "다시 시도", retry: true })}<template>${listOf([
    listRow({ prefix: tile("orange", "utensils"), title: "김밥천국", detail: "식비 · 10월 1일", suffix: won("8,000원") }),
    listRow({ prefix: tile("blue", "bus"), title: "버스", detail: "교통 · 10월 1일", suffix: won("1,500원") }),
  ], ' aria-label="이번 달 거래"')}</template></div>`;
  const resultPanel = panel(
    "Result Section — large · medium × 비어 있음 · 실패 · 완료 · 404",
    "놓인 자리의 가로 · 세로 가운데에 선다 — 좌우 48 · 위아래 16, 아이콘 40(lucide 선 아이콘 · 굵기 1.5)과 제목 사이 16. large(화면 전체)는 제목 22 / 30 · 설명 16 / 22(사이 12) · 버튼 위 28, medium(카드 · 섹션 · 시트 안)은 제목 16 / 22 · 설명 14 / 19(사이 8) · 버튼 위 24 다. 제목은 700 · fg-neutral(큰 글씨라 마침표 없이), 설명은 fg-neutral-muted · 최대 두 줄이다. 아이콘 색은 결과가 정한다 — 비어 있음은 그 내용을 말하는 아이콘을 fg-neutral-subtle, 실패는 circle-alert 를 fg-critical, 완료는 circle-check 를 fg-positive 로. 버튼은 위아래로 최대 둘(사이 20) — 첫 버튼은 해결 · 다음 동작(Button neutralWeak medium 40), 둘째는 보조(Button ghost small 36 — 위아래로 8 블리드해 글 자리만 차지하므로 보이는 상자 사이는 12)다. 불러오기에 실패하면 \"내역이 없어요\" 가 아니라 실패를 보이고 \"다시 시도\" 를 둔다 — 카드의 다시 시도를 누르면 버튼에 로딩을 걸고 내용으로 바뀐다. 없는 주소는 몰래 돌리지 않고 \"페이지를 찾을 수 없어요\" + \"홈으로\" 를 보인다. 결과로 바뀌면 role=\"status\" 로 보조 기술에 알린다.",
    samples([
      sample("비어 있음 · large — 폰", "kind=\"empty\" · icon={<ReceiptText />} · 거래 추가", `<div class="pfb-phone pfb-phone--screen pfb-phone--tabbar">${head("가계부")}<div class="pfb-phone-body pfb-phone-body--center">${resultSection({ kind: "empty", icon: "receiptText", title: "이번 달 거래가 없어요", description: "거래를 기록하면 여기에 모여요.", primary: "거래 추가" })}</div>${tabbar}</div>`),
      sample("실패 · medium — 카드 안 · 다시 시도", "kind=\"failure\" size=\"medium\" — 눌러 보면 로딩 → 내용", `<div class="pfb-phone pfb-phone--basement">${head("홈")}<div class="pfb-phone-body"><div class="pfb-card-title">이번 달 거래</div>${retryHost}</div></div>`),
      sample("완료 · large — 가져오기", "kind=\"done\" — 가계부로 가기 · 다른 파일 가져오기", `<div class="pfb-phone pfb-phone--screen">${head("가져오기")}<div class="pfb-phone-body pfb-phone-body--center">${resultSection({ kind: "done", title: "1,204건을 가져왔어요", description: "건너뛴 줄 3 · 실패 0", primary: "가계부로 가기", secondary: "다른 파일 가져오기" })}</div></div>`),
      sample("찾을 수 없는 페이지 · large — 데스크톱 웹", "kind=\"empty\" · icon={<SearchX />} · 홈으로", `<div class="pfb-desk pfb-desk--tall"><div class="pfb-desk-body pfb-phone-body--center">${resultSection({ kind: "empty", icon: "searchX", title: "페이지를 찾을 수 없어요", primary: "홈으로" })}</div></div>`, " pfb-wide"),
    ], "ptf-samples pfb-results"),
  );

  const lede = "SEED Snackbar · Callout · Page Banner · Result Section 구조 — 알림을 일로 나눈다. 방금 한 일의 결과 · 뒤에서 끝난 일 · 다시 하면 되는 가벼운 실패는 화면 아래 가운데의 짙은 띠(Snackbar — 한 번에 하나, 4초 · 액션이 있으면 6초, 머무는 동안 멈춘다), 그 기능 · 내용 가까이의 안내와 그 자리의 오류(저장 실패)는 옅은 톤 상자(Callout), 페이지 전체의 상태는 머리 바로 아래 화면 폭 띠(Page Banner — 한 화면 하나), 비어 있음 · 불러오기 실패 · 완료 · 찾을 수 없는 페이지는 놓인 자리 가운데의 결과(Result Section)다. 입력값 오류는 칸 아래(Field), 되돌릴 수 없는 결정은 Alert Dialog 다. 오류는 자리에서 알린다 — 전역 오류 토스트를 두지 않고 서버가 보낸 글 · 영어 · 코드를 보이지 않는다. 톤은 neutral · informative · positive · warning · critical 다섯이고 옅은 바탕은 bg-*-weak + fg-*-contrast, 짙은 바탕은 bg-*-solid + 흰 글이다. 스낵바의 아이콘 · 액션은 반전 짝 색(fg-*-inverted, v115)이다. 아이콘은 lucide 선 아이콘이다. 옛 Sonner(흰 카드 · 그림자 · 3장 쌓기) · Alert(왼쪽 4px 막대) · Banner · 빈 화면 카드는 없다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 스낵바 액션(fg-brand-inverted) · 포커스 링이 여기서는 중립으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03l — 알림 메시지</div>
      <h2 class="section-title">Snackbar · Callout · Page&nbsp;Banner · Result&nbsp;Section — 일로 나눈 알림&nbsp;넷</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${snackPanel}
    ${placementPanel}
    ${livePanel}
    ${calloutPanel}
    ${calloutStatePanel}
    ${bannerTonePanel}
    ${bannerPlacePanel}
    ${resultPanel}
  </section>`;
}

// Menu · Menu Sheet · Help Bubble · Tooltip — spec: specs/components/menu.md · menu-sheet.md · help-bubble.md · tooltip.md · 수치 menu.yaml · menu-sheet.yaml ·
// help-bubble.yaml(Tooltip 도 이 파일의 opens: hover) · 쌓임 specs/z-index.md. 구조는 SEED Menu · Swipeable Menu Sheet · Help Bubble · Help Bubble Tooltip(2026-10-02).
// 메뉴 .pmenu(role=menu)는 묶음 .pmenu-group(role=group) · 묶음 이름 .pmenu-label · 선 .pmenu-divider(묶음 사이에만 — 장식이라 보조 기술에 숨긴다) · 줄 .pmenu-item(role=menuitem)으로 짠다.
// 메뉴 시트 .pmsheet 는 손잡이 · 머리(가운데) · 묶음 .pmsheet-group(옅은 회색 상자) · 줄 .pmsheet-item(<button>) · 보조 기술용 닫기 .pmsheet-close 다.
// 말풍선 .pbub 는 Help Bubble(role=dialog — 제목 · 설명 · 닫기 버튼)과 Tooltip(role=tooltip — 글 하나)이 함께 쓴다.
// 그림은 열린 순간을 멈춘 것이다 — 03k 의 화면 틀(overlayFrame) 안에 뒤 화면을 그리고, 메뉴는 트리거 아래 8 · 오른쪽 맞춤으로 붙이고(.pmenu-anchor), 시트는 딤 위에,
// 말풍선은 틀에 뜬 층(floats)으로 얹는다. 말풍선의 자리(트리거 위 · 아래 12, 가장자리 16, 화살표는 트리거 가운데)는 페이지 끝 스크립트가 잰다 — 레시피의 Floating UI 자리다.
// 표면은 레시피와 같은 role 이다 — 메뉴 · 말풍선은 비모달이라 뒤 화면을 막지 않는다. 메뉴 시트만 03k 처럼 role=group 으로 두고 뒤 화면을 inert 로 둔다(레시피는 dialog + aria-modal).
// 호버 · 누름 · 포커스는 그 순간을 멈춘 클래스(--hover · --pressed · --focus)로 그렸고, data-pmenu-live · data-pbub-live · data-ptip 은 페이지 끝 스크립트가 실제로 열고 닫는다.
// 아이콘은 lucide(선 2)다 — 크기는 놓인 자리가 정한다(메뉴 18 · 뒤 16 · 시트 22 · 닫기 14)
const MENU_ICON = {
  ellipsisVertical: listSvg('<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>'),
  pin: listSvg('<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>'),
  pencil: listSvg('<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>'),
  copy: listSvg('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
  trash: listSvg('<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
  archive: listSvg('<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>'),
  folderInput: listSvg('<path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"/><path d="M2 13h10"/><path d="m9 16 3-3-3-3"/>'),
  folderOutput: listSvg('<path d="M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5"/><path d="M2 13h10"/><path d="m5 10-3 3 3 3"/>'),
  arrowDownUp: listSvg('<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>'),
  externalLink: listSvg('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
  eyeOff: listSvg('<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>'),
  search: listSvg('<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>'),
  rotateCcw: CHIP_ICON.rotateCcw,
  info: OVERLAY_ICON.info,
  x: OVERLAY_ICON.x,
};
// 그 순간을 멈춘 줄 — 메뉴 · 시트 줄은 hover · pressed · focus, 말풍선 닫기는 pressed · focus
const MENU_INTERACTIONS = ["hover", "pressed", "focus"];
const BUBBLE_CLOSE_INTERACTIONS = ["pressed", "focus"];
let menuSeq = 0;
const nextMenuId = (prefix) => `${prefix}-${(menuSeq += 1)}`;

// Menu 줄 하나 — 글(label · description)은 여기서 escape 한다. 줄은 div role=menuitem(tabindex -1 — 열린 메뉴에서는 화살표 키가 초점을 옮긴다).
//   icon · suffixIcon  앞 · 뒤 아이콘(MENU_ICON 이름) — 앞 아이콘은 모든 줄에 두거나 모두 뺀다, 뒤 아이콘은 바깥 링크처럼 방향을 알릴 때만
//   tone         neutral(기본) · critical(이름 · 아이콘만 fg-critical — 맨 아래 묶음)
//   disabled     막힌 줄 — aria-disabled. 눌러도 실행하지 않고 닫히지 않으며 화살표 키가 건너뛴다
//   interaction  hover · pressed · focus — 그 순간을 멈춘 줄(갤러리 전용). focus 는 키보드로 옮긴 줄이다
const menuItem = ({ label, description = "", icon = "", suffixIcon = "", tone = "neutral", disabled = false, interaction = "" }) => {
  const cls = ["pmenu-item", tone === "critical" && "pmenu-item--critical", MENU_INTERACTIONS.includes(interaction) && `pmenu-item--${interaction}`].filter(Boolean).join(" ");
  const slot = (name, svgName) => (svgName ? `<span class="pmenu-item-${name}" aria-hidden="true">${MENU_ICON[svgName]}</span>` : "");
  const desc = description ? `<span class="pmenu-item-desc">${escape(description)}</span>` : "";
  return `<div class="${cls}" role="menuitem" tabindex="-1"${disabled ? ' aria-disabled="true"' : ""}><span class="pmenu-item-content">${slot("icon", icon)}<span class="pmenu-item-body"><span class="pmenu-item-label">${escape(label)}</span>${desc}</span>${slot("suffix", suffixIcon)}</span></div>`;
};

// Menu(MenuContent) — 묶음(group)마다 줄을 쌓고 묶음 사이에만 선을 긋는다.
//   groups      [{ label, items: [menuItem 인자] }] — 묶음 이름(label)은 묶음이 무엇인지 말해야 할 때만
//   labelledby  트리거 id(메뉴의 이름 — 트리거에서 잇는다) · label  트리거가 없는 견본(상태 표)의 이름
//   hidden      닫힌 메뉴(직접 열어 보는 그림 — 페이지 끝 스크립트가 연다)
export function menuContent({ id = nextMenuId("pmenu"), labelledby = "", label = "", groups = [], hidden = false } = {}) {
  const body = groups.map((group, gi) => {
    const headId = group.label ? `${id}-g${gi}` : "";
    const head = group.label ? `<div class="pmenu-label" id="${headId}">${escape(group.label)}</div>` : "";
    const divider = gi > 0 ? '<div class="pmenu-divider" aria-hidden="true"></div>' : "";
    return `${divider}<div class="pmenu-group" role="group"${headId ? ` aria-labelledby="${headId}"` : ""}>${head}${group.items.map(menuItem).join("")}</div>`;
  }).join("");
  return `<div ${attrsOf([
    'class="pmenu"',
    'role="menu"',
    `id="${id}"`,
    'aria-orientation="vertical"',
    'tabindex="-1"',
    labelledby ? `aria-labelledby="${labelledby}"` : label && `aria-label="${escape(label)}"`,
    `data-state="${hidden ? "closed" : "open"}"`,
    hidden && "hidden",
  ])}>${body}</div>`;
}

// 메뉴를 여는 ⋮ — Button ghost · iconOnly(medium 40), 이름은 "{줄 이름} 더보기". menu(묶음 목록)를 주면 열린 채로 그리고(aria-expanded · aria-controls)
// 메뉴를 트리거 아래 8 · 오른쪽 맞춤에 붙인다(.pmenu-anchor). live 면 닫힌 채로 두고 페이지 끝 스크립트가 연다
const menuTrigger = ({ name, menu = null, live = false }) => {
  const id = nextMenuId("pmenu-trigger");
  const menuId = nextMenuId("pmenu");
  const open = !!menu && !live;
  const button = `<button ${attrsOf([
    'class="btn btn-ghost btn-icon-only"',
    'type="button"',
    `id="${id}"`,
    `aria-label="${escape(name)}"`,
    'aria-haspopup="menu"',
    `aria-expanded="${open ? "true" : "false"}"`,
    open && `aria-controls="${menuId}"`,
    `data-state="${open ? "open" : "closed"}"`,
    live && "data-pmenu-trigger",
  ])}>${MENU_ICON.ellipsisVertical}</button>`;
  return menu ? `<span class="pmenu-anchor">${button}${menuContent({ id: menuId, labelledby: id, groups: menu, hidden: live })}</span>` : button;
};

// Menu Sheet 줄 — <button>(막히면 disabled). 글은 여기서 escape 한다. 인자는 menuItem 과 같다(뒤 아이콘은 없다).
// textOnly 시트에는 아이콘 · 설명을 넘기지 않는다
const menuSheetItem = ({ label, description = "", icon = "", tone = "neutral", disabled = false, interaction = "" }) => {
  const cls = ["pmsheet-item", tone === "critical" && "pmsheet-item--critical", MENU_INTERACTIONS.includes(interaction) && `pmsheet-item--${interaction}`].filter(Boolean).join(" ");
  const icn = icon ? `<span class="pmsheet-item-icon" aria-hidden="true">${MENU_ICON[icon]}</span>` : "";
  const desc = description ? `<span class="pmsheet-item-desc">${escape(description)}</span>` : "";
  return `<button type="button" class="${cls}"${disabled ? " disabled" : ""}><span class="pmsheet-item-content">${icn}<span class="pmsheet-item-body"><span class="pmsheet-item-label">${escape(label)}</span>${desc}</span></span></button>`;
};

// Menu Sheet(MenuSheetContent) — 손잡이(늘) · 머리(제목 · 설명 — 가운데) · 묶음(사이 10) · 줄 · 보조 기술용 닫기. 글은 여기서 escape 한다.
//   layout   textWithIcon(기본 — 아이콘 + 글, 왼쪽 정렬) · textOnly(글만 — 가운데 정렬, 줄 설명 없음). 한 시트에서 섞지 않는다
//   groups   [{ items: [menuSheetItem 인자] }] — 묶음 안 줄 사이에 선(마지막 줄 아래는 없다)
//   label    제목이 없을 때의 이름(aria-label — 트리거 이름)
//   closeInteraction  focus — 보조 기술용 닫기에 키보드 초점이 온 순간(갤러리 전용 — 평소에는 보이지 않는다)
export function menuSheet({ id = nextMenuId("pmsheet"), title = "", description = "", label = "", layout = "textWithIcon", groups = [], closeInteraction = "" } = {}) {
  const titleId = title ? `${id}-title` : "";
  const descId = title && description ? `${id}-desc` : "";
  const head = title ? `<div class="pmsheet-header"><div class="pmsheet-title" id="${titleId}">${escape(title)}</div>${descId ? `<p class="pmsheet-desc" id="${descId}">${escape(description)}</p>` : ""}</div>` : "";
  const list = groups.map(g => `<div class="pmsheet-group">${g.items.map(menuSheetItem).join("")}</div>`).join("");
  const close = `<button type="button" class="pmsheet-close${closeInteraction === "focus" ? " pmsheet-close--focus" : ""}">닫기</button>`;
  return `<div class="pmsheet${layout === "textOnly" ? " pmsheet--text-only" : ""}" role="group" ${overlayNameAttrs(titleId, descId, label)}><div class="pmsheet-handle" aria-hidden="true"></div>${head}<div class="pmsheet-list">${list}</div>${close}</div>`;
}

// 말풍선 — Help Bubble(kind bubble — 제목 + 설명, 닫기 버튼을 둘 수 있다) · Tooltip(kind tooltip — 글 하나). 글은 여기서 escape 한다.
//   trigger  가리킬 트리거 id — 페이지 끝 스크립트가 그 트리거 가운데로 화살표를 맞추고 자리를 잡는다
//   side     top(기본) · bottom — 바라는 자리. 놓인 틀이 경계이고, 모자라면 스크립트가 뒤집는다
//   close    닫기 버튼(Help Bubble 만) · closeInteraction pressed · focus — 그 순간을 멈춘 닫기(갤러리 전용)
//   live     직접 열고 닫는 말풍선(data-pbub-live) · hidden  닫힌 채로 그린다(툴팁 — 페이지 끝 스크립트가 연다)
//   focused  Tab 으로 들어온 말풍선(닫기 버튼이 없을 때 — 바깥 2px 링, 갤러리 전용)
export function bubble({ id = nextMenuId("pbub"), kind = "bubble", title = "", description = "", trigger = "", side = "top", close = false, closeInteraction = "", live = false, hidden = false, focused = false } = {}) {
  const tip = kind === "tooltip";
  const titleId = tip ? "" : `${id}-title`;
  const descId = !tip && description ? `${id}-desc` : "";
  const cls = ["pbub", tip && "pbub--tooltip", close && "pbub--close", focused && "pbub--focus"].filter(Boolean).join(" ");
  const closeCls = ["pbub-close", BUBBLE_CLOSE_INTERACTIONS.includes(closeInteraction) && `pbub-close--${closeInteraction}`].filter(Boolean).join(" ");
  const attrs = attrsOf([
    `class="${cls}"`,
    `id="${id}"`,
    `role="${tip ? "tooltip" : "dialog"}"`,
    !tip && 'tabindex="-1"',
    titleId && `aria-labelledby="${titleId}"`,
    descId && `aria-describedby="${descId}"`,
    trigger && `data-pbub-for="${trigger}"`,
    `data-pbub-side="${side}"`,
    `data-side="${side}"`,
    `data-state="${hidden ? "closed" : "open"}"`,
    live && "data-pbub-live",
    hidden && "hidden",
  ]);
  const text = `<div class="pbub-title"${titleId ? ` id="${titleId}"` : ""}>${escape(title)}</div>${descId ? `<p class="pbub-desc" id="${descId}">${escape(description)}</p>` : ""}`;
  const closeBtn = close ? `<button type="button" class="${closeCls}" aria-label="닫기">${MENU_ICON.x}</button>` : "";
  return `<div ${attrs}>${text}${closeBtn}<svg class="pbub-arrow" viewBox="0 0 12 8" aria-hidden="true"><path d="M0,0 H12 L8,6 Q6,8 4,6 Z"/></svg></div>`;
}

// 도움말 ⓘ — Button ghost · neutralSubtle · iconOnly(medium 40), 이름은 "{무엇} 안내". 연 말풍선을 aria-controls 로 잇는다.
// data-pbub-trigger 는 페이지 끝 스크립트가 누를 때 여닫을 말풍선이다
const helpTrigger = ({ id, name, controls, open = true }) => `<button ${attrsOf([
  'class="btn btn-ghost btn-ghost-subtle btn-icon-only"',
  'type="button"',
  `id="${id}"`,
  `aria-label="${escape(name)}"`,
  'aria-haspopup="dialog"',
  `aria-expanded="${open ? "true" : "false"}"`,
  open && `aria-controls="${controls}"`,
  `data-state="${open ? "open" : "closed"}"`,
  `data-pbub-trigger="${controls}"`,
])}>${MENU_ICON.info}</button>`;

// 아이콘 버튼 — Button ghost · iconOnly(medium 40), 이름은 aria-label. tip 을 주면 열린 툴팁을 aria-describedby 로 잇고, live 면 data-ptip 으로 페이지 끝 스크립트가 연다
const toolButton = ({ id, icon, name, tip = "", live = "" }) => `<button ${attrsOf([
  'class="btn btn-ghost btn-icon-only"',
  'type="button"',
  `id="${id}"`,
  `aria-label="${escape(name)}"`,
  tip && `aria-describedby="${tip}"`,
  live && `data-ptip="${live}"`,
])}>${MENU_ICON[icon]}</button>`;

// 뒤 화면 — 제목(오른쪽에 버튼을 둘 수 있다) + 내용. desktop 은 03k 처럼 회색 바탕 위 흰 카드에 내용을 둔다. 2026년 10월 1일은 목요일이다
const menuPage = ({ title, action = "", body = "", desktop = false }) =>
  `<div class="pmenu-page-head"><div class="pov-page-title">${escape(title)}</div>${action}</div>${desktop ? `<div class="pov-page-card">${body}</div>` : body}`;
// 줄 끝 ⋮ 목록 — 누르는 줄(줄을 누르면 상세)이고 줄마다 ⋮ 를 둔다. open 번째 줄의 ⋮ 에 메뉴를 붙이고, live 면 모든 줄의 ⋮ 가 직접 열린다
const moreRows = (rows, { open = -1, menu = null, live = false } = {}) => listOf(rows.map((r, i) => listRow({
  kind: "button",
  title: r.title,
  detail: r.detail,
  suffix: menuTrigger({ name: `${r.title} 더보기`, menu: live || i === open ? menu : null, live }),
})));

const MENU_MEMOS = [
  { title: "주간 회의 메모", detail: "10월 1일 (목) · 회의" },
  { title: "장보기 목록", detail: "9월 30일 (수)" },
  { title: "여행 준비", detail: "9월 28일 (월)" },
  { title: "읽을 책", detail: "9월 25일 (금)" },
];
const MENU_STAFF = [
  { title: "김하늘", detail: "디자인 본부 · 매니저" },
  { title: "박서준", detail: "프로덕트 본부 · 팀장" },
  { title: "이도윤", detail: "운영 본부 · 팀원" },
];
// 메모 줄의 동작 — menu.md 코드 예와 같다. hover · focus 는 그 순간을 멈출 줄 이름이다
const memoMenu = ({ hover = "", focus = "" } = {}) => [
  { items: [{ label: "고정", icon: "pin" }, { label: "수정", icon: "pencil" }, { label: "복사해 새로 쓰기", icon: "copy" }]
    .map(i => ({ ...i, interaction: i.label === hover ? "hover" : i.label === focus ? "focus" : "" })) },
  { items: [{ label: "삭제", icon: "trash", tone: "critical" }] },
];
// 직원 줄의 동작 — menu.md 코드 예와 같다(설명 · 막힌 줄)
const STAFF_MENU = [
  { items: [{ label: "수정" }, { label: "비밀번호 초기화", description: "새 비밀번호를 메일로 보내요." }, { label: "휴가 내역 내보내기", disabled: true }] },
  { items: [{ label: "삭제", tone: "critical" }] },
];
// 가계부 표의 머리 더보기 — 같은 동작이 범위마다 있어 묶음 이름이 묶음을 말한다. 바깥으로 나가는 줄만 뒤 아이콘
const LEDGER_MENU = [
  { label: "10월 거래", items: [{ label: "엑셀로 저장" }, { label: "인쇄" }] },
  { label: "모든 거래", items: [{ label: "엑셀로 저장" }, { label: "백업 만들기" }] },
  { items: [{ label: "도움말", suffixIcon: "externalLink" }] },
];
const memoSheetGroups = (states = {}) => [
  { items: [{ label: "고정", icon: "pin" }, { label: "수정", icon: "pencil" }, { label: "복사해 새로 쓰기", icon: "copy" }].map(i => ({ ...i, interaction: states[i.label] || "" })) },
  { items: [{ label: "삭제", icon: "trash", tone: "critical", interaction: states["삭제"] || "" }] },
];

// Menu · Menu Sheet · Help Bubble · Tooltip 갤러리 — Menu · Menu Sheet · 상태 · Help Bubble · Tooltip 다섯 판을 흰 표면(.vignette-card) 위에 그린다.
// 견본 틀(.ptf-samples · .ptf-cap)과 상태 표(.cb-matrix)는 Text Field 갤러리 것, 화면 틀은 03k 것을 그대로 쓴다. 글은 Desk(메모 · 가계부 · 사진 · 금액 가리기)와
// HR(직원 · 휴가)에서 빌렸다 — menu.md · menu-sheet.md · help-bubble.md · tooltip.md 코드 예와 같은 글이다.
// 그림은 열린 순간을 멈췄다 — 줄 · 버튼은 실제로 올리고 눌러 볼 수 있고, "직접" 견본과 말풍선은 페이지 끝 스크립트로 실제로 열고 닫힌다.
export function renderMenuGallery(brand) {
  const panel = (title, sub, body) => `
    <div class="vignette-card cb-panel">
      <div class="vignette-head">
        <div class="vignette-title">${escape(title)}</div>
        <div class="vignette-sub">${escape(sub)}</div>
      </div>${body}
    </div>`;
  const samples = (items, cls = "ptf-samples") => `
      <div class="${cls}">${items.join("")}
      </div>`;
  const sample = (cap, en, body) => `
        <div class="ptf-sample">
          <div class="ptf-cap">${escape(cap)}<span>${escape(en)}</span></div>
          ${body}
        </div>`;
  const DESKTOP = "ptf-samples pov-samples--desktop";
  // 상태 표 — 줄(상태) × 칸. 칸에는 이름(data-col)을 달아 폰 폭에서 칸을 세로로 쌓을 때 칸 이름을 위에 보인다
  const matrix = (cls, first, cols, rows, cell) => `
      <div class="cb-matrix ${cls}" style="--cb-cols: ${cols.length};">
        <div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">${escape(first)}</div>${
          cols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
        }</div>${rows.map(r => `
        <div class="cb-matrix-row"><div class="cb-matrix-label">${escape(r.ko)}<span>${escape(r.en)}</span></div>${
          cols.map(c => `<div class="cb-matrix-cell" data-col="${escape(c.ko)}">${cell(r, c)}</div>`).join("")
        }</div>`).join("")}
      </div>`;

  // 1. Menu — 데스크톱 줄의 ⋮(메모 · 직원) · 표의 머리 더보기(묶음 이름 · 뒤 아이콘) · 직접 열어 보기
  const memoFrame = overlayFrame({
    device: "desktop",
    height: 400,
    page: menuPage({ title: "메모", desktop: true, body: moreRows(MENU_MEMOS, { open: 0, menu: memoMenu({ hover: "수정", focus: "복사해 새로 쓰기" }) }) }),
  });
  const staffFrame = overlayFrame({
    device: "desktop",
    height: 400,
    page: menuPage({ title: "직원", desktop: true, body: moreRows(MENU_STAFF, { open: 0, menu: STAFF_MENU }) }),
  });
  const ledgerFrame = overlayFrame({
    device: "desktop",
    height: 440,
    page: menuPage({ title: "가계부", desktop: true, action: menuTrigger({ name: "가계부 더보기", menu: LEDGER_MENU }), body: listOf(OVERLAY_LEDGER.map(overlayRow)) }),
  });
  const liveFrame = overlayFrame({
    device: "desktop",
    height: 400,
    page: menuPage({ title: "메모", desktop: true, body: moreRows(MENU_MEMOS.slice(0, 3), { menu: memoMenu(), live: true }) }),
  });
  const menuPanel = panel(
    "Menu — 줄의 ⋮ · 묶음 · 위험한 동작",
    "데스크톱 목록 · 표의 줄에서 동작은 줄 끝 ⋮ 하나로 연다 — 버튼 이름은 \"{줄 이름} 더보기\"(Button ghost · iconOnly)이고, 줄 자체를 누르면 상세 · 수정이 열린다. 메뉴는 트리거 아래 8 · 오른쪽 끝에 맞춰(align end — SEED 기본은 가운데) 붙는 폭 200 의 떠 있는 표면이다 — bg-layer-floating · 모서리 20 · shadow-s3 · 위아래 8 이고, 딤이 없고 뒤 화면을 숨기지 않는다(비모달 · L3 200). 아래가 모자라면 위로 연다. 줄은 위아래 10 · 좌우 16 · 이름 14/19 · 앞 아이콘 18(사이 8)이라 한 줄이면 39, 설명(12/16 · fg-neutral-subtle · 사이 2)이 붙으면 57 이다 — 글이 길면 말줄임 없이 단어 단위로 줄을 바꾼다. 선은 묶음 사이에만 긋는다 — 1px stroke-neutral-subtle · 좌우 16 들임 · 위아래 8. 묶음 이름(13/18 · fg-neutral-subtle · 위아래 8)은 같은 동작이 범위마다 있을 때처럼 묶음이 무엇인지 말해야 할 때만 둔다. 마우스를 올린 줄은 좌우 8 들인 알약(모서리 12 · bg-layer-floating-pressed)이고, 키보드로 옮긴 줄은 같은 자리에 2px 링만 그린다 — 마우스와 키보드 위치가 다르면 둘 다 보인다(메모 그림의 수정 · 복사해 새로 쓰기). 되돌릴 수 없는 동작은 맨 아래 묶음에 critical(이름 · 아이콘만 fg-critical)로 두고, 막힌 줄은 fg-disabled 로 눌러도 실행하지 않고 닫히지 않는다. 뒤 아이콘(16)은 바깥 링크처럼 방향을 알릴 때만 둔다. 메뉴에는 고른 표시 · 단축키 · 하위 메뉴가 없다 — 값을 고르는 일은 Select · Segmented Control 이다. 마지막 그림은 실제로 열고, 키보드로 옮기고, 눌러 닫을 수 있다.",
    samples([
      sample("Desk 메모 — 줄의 ⋮ 를 연 순간", "ResponsiveMenu · 1280 이상 — 호버 알약(수정) · 키보드 링(복사해 새로 쓰기) · critical 묶음", memoFrame),
      sample("HR 직원 — 설명 · 막힌 줄", "MenuItem description · disabled — 한 줄 39 · 설명 57", staffFrame),
      sample("표의 머리 더보기 — 묶음 이름 · 뒤 아이콘", "MenuGroup label — 같은 동작이 범위마다 · suffixIcon 은 바깥 링크만", ledgerFrame),
      sample("직접 열어 보기", "누르기 · Enter · ↓ 로 열고 ↑ ↓ · Home · End · 글자로 옮긴다 — 줄 누르기 · Esc · 바깥으로 닫힌다", liveFrame),
    ], DESKTOP),
  );

  // 2. Menu Sheet — 폰. 같은 메모 줄 동작(아이콘 + 글) · 글만(가운데) · 머리 더보기(설명 · 보조 기술용 닫기)
  const sheetFrame = (page, sheet, height = 600) => overlayFrame({ device: "phone", height, page, layers: [overlayScrim(), overlayLayer("sheet", sheet)] });
  const memoPhone = menuPage({ title: "메모", body: moreRows(MENU_MEMOS) });
  const profilePhone = menuPage({ title: "프로필", body: listOf([["이름", "김지원"], ["이메일", "porest@example.com"], ["가입일", "2026년 3월 2일"]].map(([title, value]) => listRow({ title, suffix: escape(value) }))) });
  const sheetPanel = panel(
    "Menu Sheet — 손잡이 · 가운데 제목 · 묶음 · 글만",
    "1280 미만에서는 같은 목록이 화면 아래에서 올라오는 메뉴 시트로 뜬다 — 같은 줄 · 같은 순서 · 같은 막힘이고, 코드는 폭을 보고 둘 중 하나를 그리는 ResponsiveMenu 하나다. 시트는 최대 480 · 위 두 모서리 20 · 위 24(손잡이 자리) · 좌우 화면 여백 24 · 아래 16 + 안전 영역이고, 그림자 없이 딤(0.50 · 다크 0.65) 위의 떠 있는 표면이다(L2 딤 100 · 시트 101). 손잡이(36 × 4 · stroke-neutral-weak · 위 6)는 늘 있고 위 닫기 버튼 · 바닥 취소는 없다 — 딤 · 끌어내리기 · Esc · 뒤로 가기로 닫는다. 머리는 가운데 정렬이다 — 제목 18/24 · 700(무엇의 동작인지), 설명 14/19 · fg-neutral-muted(사이 4), 그 아래 16. 묶음은 옅은 회색 상자(bg-neutral-weak · 모서리 16)이고 묶음 사이는 선 없이 10 이다. 줄은 최소 52 · 위아래 14 · 좌우 16 · 이름 16/22 · 아이콘 22(사이 14)이고, 줄 사이에 1px stroke-neutral-weak 선을 긋는다(묶음의 마지막 줄 아래는 없다). 아이콘 없이 글만 쓰면 가운데 정렬이고 줄 설명을 두지 않는다 — 한 시트에서 섞지 않는다. 위험한 동작은 맨 아래 묶음에 둔다. 줄을 누르면 시트를 닫고 실행한다. 보조 기술용 닫기는 목록 뒤에 있고 평소에는 보이지 않다가 키보드 초점이 오면 52 높이 · bg-neutral-weak · 모서리 12 버튼으로 보인다.",
    samples([
      sample("메모 줄 ⋮ — 아이콘 + 글", "ResponsiveMenu · 1280 미만 Menu Sheet — 손잡이 · 제목 가운데 · critical 묶음", sheetFrame(memoPhone, menuSheet({ title: "주간 회의 메모", groups: memoSheetGroups() }))),
      sample("글만 — 가운데 정렬", "layout=\"textOnly\" — 줄 설명 없음", sheetFrame(profilePhone, menuSheet({ title: "사진", layout: "textOnly", groups: [
        { items: [{ label: "앨범에서 고르기" }, { label: "사진 찍기" }] },
        { items: [{ label: "사진 지우기", tone: "critical" }] },
      ] }))),
      sample("머리 더보기 — 설명 · 보조 기술용 닫기", "MenuSheet — 머리 설명 · 키보드 초점이 온 닫기", sheetFrame(memoPhone, menuSheet({ title: "메모", description: "메모 12개", closeInteraction: "focus", groups: [
        { items: [{ label: "가져오기", icon: "folderInput" }, { label: "내보내기", icon: "folderOutput" }, { label: "정렬 바꾸기", icon: "arrowDownUp" }] },
      ] }))),
    ]),
  );

  // 3. 상태 — Menu(알약 · 링) · Menu Sheet(줄 바탕 · 줄 안쪽 링). 호버 · 누름 · 포커스는 그 순간을 멈췄다
  const states = [
    { ko: "기본", en: "enabled" },
    { ko: "호버", en: "hovered — 마우스만", interaction: "hover" },
    { ko: "누름", en: "pressed — 바탕 + 2px 축소", interaction: "pressed" },
    { ko: "포커스", en: "focused — 키보드만 · 링 2px", interaction: "focus" },
    { ko: "막힘", en: "disabled", disabled: true },
  ];
  const menuCols = [
    { ko: "아이콘 + 이름", en: "neutral — 앞 아이콘 18 · 39", item: { label: "수정", icon: "pencil" } },
    { ko: "위험한 동작", en: "critical — 이름 · 아이콘 fg-critical", item: { label: "삭제", icon: "trash", tone: "critical" } },
    { ko: "설명", en: "57 — 설명 12/16 fg-neutral-subtle", item: { label: "비밀번호 초기화", description: "새 비밀번호를 메일로 보내요." } },
  ];
  const sheetCols = [
    { ko: "아이콘 + 글", en: "textWithIcon — 아이콘 22 · 52", item: { label: "고정", icon: "pin" } },
    { ko: "위험한 동작", en: "critical — 누르는 동안 fg-critical-contrast", item: { label: "삭제", icon: "trash", tone: "critical" } },
    { ko: "글만", en: "textOnly — 가운데 정렬", item: { label: "사진 찍기" }, textOnly: true },
    { ko: "설명", en: "13/18 · 500 — 누르는 동안 fg-neutral-muted", item: { label: "보관", icon: "archive", description: "목록에서 숨기고 보관함으로 옮겨요." } },
  ];
  const menuCell = (s, c) => menuContent({ label: `${c.item.label} — ${s.ko}`, groups: [{ items: [{ ...c.item, interaction: s.interaction || "", disabled: !!s.disabled }] }] });
  const sheetCell = (s, c) => `<div class="pmsheet-demo${c.textOnly ? " pmsheet--text-only" : ""}"><div class="pmsheet-group">${menuSheetItem({ ...c.item, interaction: s.interaction || "", disabled: !!s.disabled })}</div></div>`;
  const statePanel = panel(
    "상태 — 호버 · 누름 · 키보드 포커스 · 막힌 줄",
    "Menu 는 마우스를 올린 줄에 좌우 8 들인 알약(모서리 12 · bg-layer-floating-pressed)을 칠하고, 누르면 같은 알약에 아이콘 · 글만 2px 거리로 준다(알약은 그대로 — 기준 max(높이, 폭 ÷ 4, 24), 모션 줄이기면 줄지 않는다). 키보드로 옮긴 줄은 바탕 없이 알약 자리 안쪽에 2px 링이다 — 마우스로 연 메뉴에는 링이 없다. 메뉴 시트는 줄 전체를 bg-neutral-weak-pressed 로 칠하고 누르면 아이콘 · 글만 준다 — 칠한 동안 설명은 fg-neutral-muted, 위험한 줄의 이름 · 아이콘은 fg-critical-contrast 로 짙어진다(누름 바탕 위 4.5:1 — fg-critical 은 4.39 · 다크 3.91, fg-neutral-subtle 은 다크 3.91 이다). 키보드 포커스는 줄 안쪽 2px 링이고 묶음 상자가 넘친 링을 자른다. 막힌 줄은 둘 다 아이콘 · 이름 · 설명이 fg-disabled 이고 호버 · 누름이 없다 — 화살표 키가 건너뛴다. 위험한 줄의 설명은 그대로 fg-neutral-subtle 이다. 호버 · 누름 · 포커스는 그 순간을 멈춰 그렸다 — 줄은 실제로 올리고 눌러 볼 수 있다.",
    `<div class="pmenu-matrix-cap">Menu — 1280 이상</div>${matrix("pmenu-matrix", "상태", menuCols, states, menuCell)}
      <div class="pmenu-matrix-cap pmenu-matrix-cap--next">Menu Sheet — 1280 미만</div>${matrix("pmenu-matrix pmsheet-matrix", "상태", sheetCols, states, sheetCell)}`,
  );

  // 4. Help Bubble — ⓘ 를 눌러 여는 도움말(데스크톱 · 폰) · 처음부터 열어 두는 안내(닫기 버튼) · 닫기 버튼 상태
  const RULE = "입사 1년 미만은 한 달에 1일씩 생기고, 1년이 지나면 15일이 생겨요.";
  const leaveHelp = (device) => {
    const tid = nextMenuId("pbub-trigger");
    const bid = nextMenuId("pbub");
    const lead = `<div class="pmenu-lead">남은 연차 8.5일${helpTrigger({ id: tid, name: "연차 사용 규정 안내", controls: bid })}</div>`;
    const body = `${listOf(OVERLAY_LEAVE.map(overlayRow))}`;
    return overlayFrame({
      device,
      height: device === "desktop" ? 400 : 460,
      page: `${menuPage({ title: "휴가", desktop: device === "desktop", body })}${lead}`,
      floats: [bubble({ id: bid, title: "연차 사용 규정", description: RULE, trigger: tid, live: true })],
    });
  };
  const hideTid = nextMenuId("pbub-anchor");
  const hideBid = nextMenuId("pbub");
  const hideFrame = overlayFrame({
    device: "phone",
    height: 440,
    page: menuPage({ title: "가계부", action: toolButton({ id: hideTid, icon: "eyeOff", name: "금액 가리기" }), body: listOf(OVERLAY_LEDGER.map(overlayRow)) }),
    floats: [bubble({ id: hideBid, title: "금액을 가릴 수 있어요", description: "누르면 화면의 금액이 모두 가려져요.", trigger: hideTid, side: "bottom", close: true, live: true })],
  });
  const closeCols = [
    { ko: "기본", en: "enabled" },
    { ko: "누름", en: "pressed — 닫기만 2px 축소", interaction: "pressed" },
    { ko: "포커스", en: "focused — 키보드만", interaction: "focus" },
    { ko: "누르는 영역", en: "점선 — 닫기 44(사방 3)", target: true },
  ];
  // 말풍선 줄 — 닫기 버튼이 없는 말풍선. 누를 것이 없어 누름 · 누르는 영역이 없다. 포커스는 Tab 으로 들어온 순간을 멈췄다
  const bubbleCell = (c) => (c.interaction === "focus" ? `<span class="pbub-demo">${bubble({ title: "안내", focused: true })}</span>`
    : c.interaction || c.target ? '<span class="pbub-na">없음 — 누를 것이 없다</span>'
    : `<span class="pbub-demo">${bubble({ title: "안내" })}</span>`);
  const bubblePanel = panel(
    "Help Bubble — ⓘ 를 눌러 여는 도움말 · 닫기 버튼",
    "몰라도 일은 할 수 있는 설명(규정 · 계산 방법 · 기능 안내)을 ⓘ 아이콘 버튼(이름 \"{무엇} 안내\")을 눌러 띄운다 — 손가락으로도 열려 폰에서도 읽어야 하는 설명은 이것이다. 말풍선은 짙은 바탕(bg-neutral-inverted — 다크에서는 밝은 바탕) · 모서리 12 · 위아래 10 · 좌우 12 · 그림자 없음이고, 폭은 내용만큼 최대 280 이다. 제목 13/18 · 700, 설명 13/18 · 400(사이 2) — 한 줄이면 38, 설명이 있으면 58. 기본은 트리거 위다 — 화살표(12 × 8) 끝과 트리거는 4, 몸통과는 12 떨어진다. 자리가 모자라면 반대편으로 뒤집고 옆으로 밀어 화면 가장자리와 16 을 남긴다 — 화살표는 늘 트리거 가운데를 가리키고 말풍선 모서리와 14 를 남긴다(폰 그림은 밀었다). 비모달이라 뒤 화면을 숨기지 않는다(L4 210). ⓘ 를 다시 누르거나 바깥 · Esc 로 닫힌다. 닫기 버튼은 처음부터 열어 두는 안내에만 둔다 — 오른쪽 위 모서리의 투명 38 상자(아이콘 14 · 위 12 · 오른쪽 12 · 글과 4, 누르는 영역 44)이고, 누르면 아이콘만 2px 거리로 준다. 키보드 링은 말풍선 글자색이다 — 브랜드 링은 짙은 말풍선 위에서 3:1 에 못 미친다. 말풍선 안에 링크 · 버튼을 두지 않는다(닫기 버튼만). 열려 있을 때 트리거에서 Tab 을 누르면 말풍선으로 들어간다 — 닫기 버튼이 있으면 그 버튼으로, 없으면 말풍선 자체로 가고 둘레 바깥 2px 링(띄움 2 · stroke-focus-ring · 모서리를 따라)이 선다(페이지 위에 그려져 브랜드 링이다). 다시 Tab 으로 나가면 닫히고 초점은 트리거 다음 칸으로, Shift+Tab 은 트리거로 간다. 그림의 말풍선도 실제로 닫고 다시 열 수 있다.",
    `${samples([
      sample("폰 — ⓘ 연차 사용 규정", "HelpBubble — 손가락으로 눌러 연다 · 가장자리 16 을 남기고 밀었다 · 화살표는 ⓘ 가운데", leaveHelp("phone")),
      sample("데스크톱 — 같은 말풍선", "제목 + 설명 · 트리거 위 · 비모달", leaveHelp("desktop")),
    ], "ptf-samples ptf-samples--forms")}${samples([
      sample("처음부터 열어 두는 안내 — 닫기 버튼", "HelpBubbleAnchor · showCloseButton · side=\"bottom\" — 닫으면 다시 열지 않는다", hideFrame),
    ], "ptf-samples pov-samples--next")}
      <div class="cb-matrix pov-close-matrix pbub-close-matrix" style="--cb-cols: ${closeCols.length};">
        <div class="cb-matrix-row cb-matrix-row--head"><div class="cb-matrix-head">Tab 이 서는 자리</div>${
          closeCols.map(c => `<div class="cb-matrix-head">${escape(c.ko)}<span>${escape(c.en)}</span></div>`).join("")
        }</div>
        <div class="cb-matrix-row"><div class="cb-matrix-label">닫기 버튼 — 투명 38 상자<span>아이콘 14 · 링 안쪽 2px fg-neutral-inverted</span></div>${
          closeCols.map(c => `<div class="cb-matrix-cell"><span class="pbub-close-demo${c.target ? " pbub-close-demo--target" : ""}"><button type="button" class="pbub-close${c.interaction ? ` pbub-close--${c.interaction}` : ""}" aria-label="닫기">${MENU_ICON.x}</button></span></div>`).join("")
        }</div>
        <div class="cb-matrix-row"><div class="cb-matrix-label">말풍선 — 닫기 없음<span>링 바깥 2px · 띄움 2 stroke-focus-ring</span></div>${
          closeCols.map(c => `<div class="cb-matrix-cell">${bubbleCell(c)}</div>`).join("")
        }</div>
      </div>`,
  );

  // 5. Tooltip — 아이콘 버튼의 이름(그 순간) · 이어서 옮기기(그 순간) · 직접 올려 보기 · 막힌 버튼의 이유
  const TOOLS = [{ icon: "search", name: "검색" }, { icon: "eyeOff", name: "금액 가리기" }, { icon: "rotateCcw", name: "필터 초기화" }];
  const toolFrame = ({ open = "", live = false }) => {
    const ids = TOOLS.map(() => nextMenuId("ptip-trigger"));
    const tips = TOOLS.map(() => nextMenuId("ptip"));
    const at = TOOLS.findIndex(t => t.name === open);
    const tools = `<div class="pmenu-tools">${TOOLS.map((t, i) => toolButton({ id: ids[i], icon: t.icon, name: t.name, tip: i === at ? tips[i] : "", live: live ? tips[i] : "" })).join("")}</div>`;
    const floats = TOOLS.map((t, i) => (live || i === at ? bubble({ id: tips[i], kind: "tooltip", title: t.name, trigger: ids[i], hidden: live }) : "")).filter(Boolean);
    return overlayFrame({
      device: "desktop",
      height: 340,
      page: menuPage({ title: "가계부", desktop: true, body: `<div class="pmenu-card-head"><span>10월 거래</span>${tools}</div>${listOf(OVERLAY_LEDGER.slice(0, 3).map(overlayRow))}` }),
      floats,
    });
  };
  const reasonId = nextMenuId("pmenu-reason");
  const reason = `<div class="pmenu-reason"><button class="btn btn-neutral-weak" type="button" disabled aria-describedby="${reasonId}"><span>지난달 예산 복사</span></button><p class="pmenu-reason-text" id="${reasonId}">복사할 지난달 예산이 없어요.</p></div>`;
  const tooltipPanel = panel(
    "Tooltip — 아이콘 버튼의 이름 · 이어서 옮기기",
    "툴팁은 Help Bubble 과 같은 말풍선을 마우스 · 키보드로 여는 보조다 — 글 하나(13/18 · 700)만 두고 누를 것이 없다(role=tooltip · 트리거의 aria-describedby). 마우스를 올리면 200ms 뒤에 열고, 트리거와 말풍선을 모두 벗어나면 100ms 뒤에 닫는다 — 말풍선 위로 옮겨도 닫히지 않는다(WCAG 1.4.13). 키보드 초점이 오면 바로 열고, 하나가 열린 뒤 옆 트리거로 옮기면 기다리지 않고 모션 없이 바로 바꿔 연다. 트리거를 누르거나 Esc 로 닫는다. 손가락으로 누르면 열지 않는다 — 그래서 아이콘 버튼의 이름은 늘 aria-label 에 두고 툴팁은 그 이름을 보여 줄 뿐이며, 막힌 버튼의 이유는 툴팁이 아니라 가까운 글로 보인다(막힌 버튼은 초점을 받지 못해 키보드로 툴팁을 열 수 없다). 글자가 이미 보이는 버튼에는 두지 않고, 네이티브 title 은 쓰지 않는다. 폰에서도 읽어야 하는 설명은 Help Bubble 이다. 셋째 그림의 툴바는 직접 올리고 Tab 으로 옮겨 볼 수 있다.",
    `${samples([
      sample("아이콘 버튼의 이름 — 데스크톱", "TooltipContent — aria-label 과 같은 글 · 트리거 위 · 200ms 뒤", toolFrame({ open: "금액 가리기" })),
      sample("이어서 옮기기 — 옆 트리거로", "TooltipProvider — 하나가 열린 뒤 옆으로 옮기면 기다리지 않고 모션 없이 바로", toolFrame({ open: "필터 초기화" })),
      sample("직접 올려 보기", "마우스 200ms · 키보드 바로 · 옆으로 옮기면 바로 · 손가락은 열지 않는다", toolFrame({ live: true })),
      sample("막힌 버튼 — 이유는 툴팁이 아니라 가까운 글", "disabled · aria-describedby — 툴팁에만 두지 않는다", reason),
    ], DESKTOP)}`,
  );

  const lede = "SEED Menu · Swipeable Menu Sheet · Help Bubble · Help Bubble Tooltip 구조 — 메뉴 가족이다. 줄 · 화면의 동작은 1280 이상에서 트리거(줄 끝 ⋮ · 머리의 더보기)에 붙는 Menu(폭 200 · 줄 39 · 비모달), 1280 미만에서 같은 목록의 Menu Sheet(줄 52 · 손잡이 · 딤)다 — 메뉴는 누르면 바로 실행하고 닫히는 동작만 담고, 값을 고르는 일은 Select · Segmented Control 이다. 도움말은 짙은 말풍선 하나(최대 280 · 13 · 모서리 12 · 화살표)를 두 가지로 연다 — 눌러서 여는 Help Bubble(터치에서도 닿는다)과 마우스 · 키보드로 여는 Tooltip(보조). 쌓임은 specs/z-index.md — 메뉴 L3(200) · 시트 L2(100 · 101) · 말풍선 L4(210). 그림은 열린 순간을 멈춘 것이고, 화면 틀은 03k 것이다. 옛 Dropdown Menu(160 · 줄 32 · 1px 테두리 · 체크 · 라디오 · 단축키 · 하위 메뉴) · Context Menu · Menubar · Hover Card · 옛 툴팁(반전 · 모서리 2 · 그림자)은 걷었다."
    + (brand.key === "shared" ? " 공유 토큰에는 브랜드 역할 색이 없어 포커스 링이 여기서는 중립(fg-neutral)으로 보인다 — HR · Desk 미리보기에서 브랜드 색이다." : "");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">03m — Menu · Menu Sheet · Help Bubble · Tooltip</div>
      <h2 class="section-title">메뉴 · 메뉴 시트 · 도움말 · 툴팁 — 1280&nbsp;에서 바뀌는 동작 목록 · 짙은 말풍선 하나</h2>
      <p class="section-lede">${escape(lede)}</p>
    </header>
    ${menuPanel}
    ${sheetPanel}
    ${statePanel}
    ${bubblePanel}
    ${tooltipPanel}
  </section>`;
}

export function renderVignettes(brand) {
  // 탭 — 옛 underline · pills 그림(브랜드 색 밑줄 · 채움)은 걷었다(tabs.md 2026-10-02). 다른 구역으로 옮기는 자리(HR 직원 상세 · 공유 문서)는 Line 탭,
  // 같은 메모를 거르는 자리(Desk 의 전체 · 즐겨찾기 · 오늘 · 보관함)는 Segmented Control 이다 — 모양 · 동작은 03j 의 도우미 그대로다
  const t = brand.tabs;
  let tabsBody;
  if (t.kind === "segmented") {
    const memoId = nextPtabId();
    const first = t.items[0].value;
    const memos = t.memos.map(m => `<div class="memo-row" data-pseg-tags="${escape(m.tags)}"${m.tags.split(" ").includes(first) ? "" : " hidden"}>
          <div class="memo-title">${escape(m.title)}</div>
          <div class="memo-excerpt">${escape(m.excerpt)}</div>
        </div>`).join("");
    tabsBody = `${segmented({ label: t.label, live: true, filter: memoId, items: t.items })}
      <div class="ptab-memos" id="${memoId}">${memos}</div>`;
  } else {
    const base = nextPtabId();
    const list = lineTabs({
      label: t.label,
      live: true,
      tabs: t.items.map((it, i) => lineTab({ label: it.label, selected: i === 0, id: `${base}-tab-${i}`, controls: `${base}-panel-${i}` })),
    });
    const panels = t.items.map((it, i) => `<div class="ptab-panel ptab-vignette-panel" role="tabpanel" id="${base}-panel-${i}" aria-labelledby="${base}-tab-${i}" tabindex="0"${i === 0 ? "" : " hidden"}>${escape(it.body)}</div>`).join("");
    tabsBody = `${list}${panels}`;
  }
  const tabs = `
    <div class="vignette-card ptab-vignette">
      <div class="vignette-head">
        <div class="vignette-title">${t.kind === "segmented" ? "Segmented Control — 메모 거르기" : `Tabs · Line — ${escape(t.label)}`}</div>
        <div class="vignette-sub">${t.kind === "segmented" ? "같은 메모를 바로 거른다 — 칸이 트랙을 똑같이 나누고 고른 칸은 흰 알약" : "Fill · small 40 — 고르면 글자색만 짙어지고 2px 막대가 미끄러진다"}</div>
      </div>
      ${tabsBody}
    </div>`;

  // 검색칸 — 옛 알약 검색(surface-input · radius-full · 안의 필터 버튼)은 걷었다. 검색칸은 Input 의 앞 아이콘 · 지우기다(input.md — 03g Text Field)
  const searchScope = brand.key === "hr" ? { name: "직원 검색", value: "김지원" } : brand.key === "desk" ? { name: "메모 검색", value: "회의록" } : { name: "토큰 검색", value: "spacing" };
  const search = `
    <div class="vignette-card">
      <div class="vignette-head">
        <div class="vignette-title">Search · 검색칸</div>
        <div class="vignette-sub">Input — 앞 아이콘 검색 · 지우기(값이 있을 때만) · 웹 기본 반응형</div>
      </div>
      ${textInput({ size: "responsive", label: searchScope.name, placeholder: searchScope.name, value: searchScope.value, prefixIcon: "search", clearable: true })}
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

// 빈 화면 — Result Section 의 비어 있음(large)이다(result-section.md). 옛 빈 화면 카드(그림자 카드 · 96 동그라미 그림 · 채운 버튼 + 테두리 버튼)는 걷었다.
// 글은 brand.emptyState — 제목은 마침표 없이 상태 한 줄, 설명은 무엇을 하면 되는지, 버튼은 동작 이름이다. 모양 · 쓰임은 03l
export function renderEmptyState(brand) {
  const e = brand.emptyState;
  if (!e) return "";
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">09 — Empty state · Result Section</div>
      <h2 class="section-title">빈 화면 — 비어 있음도 결과 하나로</h2>
      <p class="section-lede">Result Section 의 비어 있음(large) — 아이콘 40 은 비어 있는 것을 말하고(fg-neutral-subtle), 제목 22 / 30 · 설명 16 / 22 · 첫 버튼(neutralWeak 40)과 보조 글 버튼(ghost 36)이다. 불러오기에 실패했을 때는 이 모습이 아니라 실패(다시 시도)를 보인다. 모양 · 쓰임은 03l — 알림 메시지.</p>
    </header>
    <div class="pfb-stage">${resultSection({ kind: "empty", icon: e.icon, title: e.title, description: e.description, primary: e.primary, secondary: e.secondary })}</div>
  </section>`;
}

// 옛 "10 — Modal"(브랜드마다 확인 + 키 · 값 칸 · 모서리 12 · shadow-xl)은 걷었다 — 시트 · 대화상자 · 확인창은 03k 다(dialog.md · alert-dialog.md, 2026-10-02)

// 스낵바 — 방금 한 일의 결과 · 뒤에서 끝난 일 · 다시 하면 되는 가벼운 실패만 알린다(snackbar.md). 옛 토스트(흰 카드 · 그림자 · 아이콘 넷 · 제목 + 본문 · 쌓기)는 걷었다 —
// 기한 임박 · 예산 도달 같은 주의는 그 자리의 Callout · Page Banner 다. 띠는 한 번에 하나라 견본마다 따로 그린다. 모양 · 자리 · 시간은 03l
export function renderSnackbars(brand) {
  const items = brand.snackbars || [];
  if (!items.length) return "";
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">11 — Snackbar</div>
      <h2 class="section-title">방금 한 일의 결과 — 한 번에 하나</h2>
      <p class="section-lede">짙은 띠(bg-neutral-inverted) · 아래 가운데 · 4초(액션이 있으면 6초) — 결과 · 뒤에서 끝난 일 · 가벼운 실패만 알리고, 기한 · 한도 같은 주의는 그 자리의 Callout · 페이지의 Page Banner 로 옮겼다. 띠는 쌓지 않는다 — 견본마다 따로 그렸다. 모양 · 자리 · 시간은 03l — 알림 메시지.</p>
    </header>
    <div class="pfb-strips">${items.map(item => `<div class="pfb-strip">${snackbar(item)}</div>`).join("")}</div>
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

// 폼 — brand.form 의 칸을 Field 로 쌓는다(field.md "Form 의 구성" — Field 사이 24, 짧은 두 칸은 16 간격으로 나란히 — 앞 칸에 pair).
// 필수 표시는 2/3 규칙(textFieldMarks), 칸은 모두 웹 기본 반응형, 글자 수는 최대가 있는 칸(max)만. 고르는 칸은 03h 의 두 컴포넌트다 —
// select(휴가 정책 · 결제 수단 · 토큰 카테고리 — 칸 아래 목록)는 Select 트리거, inputButton(기간 · 날짜 · Desk 카테고리 — 달력 · 격자)은 Input Button.
// chips(Desk 거래 종류 — 짧은 선택지 2 ~ 4개)는 03i 의 Chip 하나 고르기 묶음이다(Field 라벨이 묶음의 이름, 칩은 반응형 없이 medium 36).
// 저장 버튼은 켜 두고 누르면 비운 필수 입력칸에 오류를 보인다(제출 시 검증 — 페이지 끝 스크립트. 고르는 칸 · 칩은 값이 있어 검증에 들지 않는다).
// 폼 틀은 화면이 정한다 — 여기서는 데스크톱 웹 화면 틀(.ptf-screen)이다. 옛 그림자 카드 · 2열 그리드 · 경계선 버튼 줄 · 빨간 별표는 걷었다.
export function renderForm(brand) {
  const f = brand.form;
  if (!f) return "";
  const marks = textFieldMarks(f.fields);
  // 오류 글 — "{라벨}을(를) 입력해주세요"(행동 지시형). 받침이 있으면 을, 없으면 를
  const objectOf = (word) => {
    const code = word.charCodeAt(word.length - 1) - 0xac00;
    return `${word}${code >= 0 && code < 11172 && code % 28 !== 0 ? "을" : "를"}`;
  };
  const toField = (field, i) => field.type === "chips" ? chipField({
    label: field.label,
    mark: marks[i],
    description: field.helper || "",
    group: { role: "radiogroup", required: !!field.required, live: true, items: chipRadios(field.options, field.value, { variant: field.variant || "outlineWeak" }) },
  }) : textField({
    label: field.label,
    required: !!field.required,
    mark: marks[i],
    description: field.helper || "",
    max: field.max || 0,
    readonly: !!field.readonly,
    requiredMessage: field.required && !field.readonly && field.type !== "select" && field.type !== "inputButton" ? `${objectOf(field.label)} 입력해주세요.` : "",
    control: field.type === "select" ? { kind: "select", size: "responsive", value: field.value, prefixIcon: field.prefixIcon || "" }
      : field.type === "inputButton" ? { kind: "inputButton", size: "responsive", value: field.value, prefixIcon: field.prefixIcon || "", suffixIcon: field.suffixIcon || "" }
      : field.type === "textarea" ? { kind: "textarea", size: "responsive", value: field.value }
      : { kind: "input", size: "responsive", value: field.value, suffix: field.suffix || "", inputmode: field.inputmode || "", format: field.format || "" },
  });
  const rows = [];
  for (let i = 0; i < f.fields.length; i += 1) {
    if (f.fields[i].pair && f.fields[i + 1]) {
      rows.push(`<div class="ptf-form-row">${toField(f.fields[i], i)}${toField(f.fields[i + 1], i + 1)}</div>`);
      i += 1;
    } else rows.push(toField(f.fields[i], i));
  }

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">12 — Form layout · Field</div>
      <h2 class="section-title">${escape(f.title)}</h2>
      <p class="section-lede">${escape(f.sectionDescription)}</p>
    </header>
    <div class="ptf-screen ptf-screen--desktop">
      <div class="ptf-form">${rows.join("")}</div>
      <div class="ptf-screen-actions ptf-screen-actions--end">
        <button class="btn btn-neutral-weak" type="button">${escape(f.secondary)}</button>
        <button class="btn btn-neutral-solid" type="button" data-ptf-submit="">${escape(f.primary)}</button>
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

  // Drawer (정적 표시 — 실제 슬라이드 안 함). Desk 의 아래 Drawer(손잡이 늘 · 위 닫기 + 키 · 값 줄)는 걷고 03k 의 Bottom Sheet 로 그린다(bottom-sheet.md, 2026-10-02) —
  // 입력 폼이라 위 닫기 + 바닥 저장(large 48)이고 손잡이가 없다. 옆 패널(HR · 공유 — 오른쪽)은 Side Panel 차례에 다시 정한다 — 아직 옛 모양이다
  const drawerLabel = isHr
    ? "Side drawer (HR 직원 detail panel)"
    : isDesk
      ? "Bottom Sheet (Desk 거래 추가) — 모양은 03k"
      : "Drawer pattern (side / bottom 양쪽)";
  const drawer = isDesk
    ? overlayFrame({
        device: "phone",
        height: 520,
        page: overlayPage(),
        layers: [overlayScrim(), overlayLayer("sheet", bottomSheet({ title: "거래 추가", body: overlayTxForm("large", ["amount", "category"]), footer: [overlayButton("저장", { size: "large" })] }))],
      })
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
            <button class="btn btn-neutral-solid" type="button">${isHr ? "권한 수정" : "수정"}</button>
            <button class="btn btn-neutral-weak" type="button">취소</button>
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
      <h2 class="section-title">Pagination · ${isDesk ? "Bottom Sheet" : "Drawer"} · Spinner · Stepper</h2>
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
      <h2 class="section-title">Breadcrumb · Sidebar · Nav Menu · Command</h2>
      <p class="section-lede">4 navigation 컴포넌트 — 페이지 위계, 좌측 nav, 데스크탑 menu, 전역 command. 옛 Menubar 는 걷었다 — 동작 목록은 03m 의 Menu 다.</p>
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
      <div class="sc-card">
        <div class="sc-head">Toggle Group (solid)</div>
        <div class="tgg tgg--solid" role="radiogroup">
          <button class="tgg-item">주간</button>
          <button class="tgg-item tgg-item--active" aria-checked="true">월간</button>
          <button class="tgg-item">연간</button>
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
      <h2 class="section-title">Accordion · Collapsible · Alert Dialog</h2>
      <p class="section-lede">3 disclosure/overlay 컴포넌트 — 접기/펼치기, destructive confirm. 옛 Hover Card · Context Menu 는 걷었다 — 동작 목록은 03m 의 Menu 다.</p>
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
      <!-- Alert Dialog — 옛 모양(모서리 12 · shadow-xl · 합니다체 · 처음 초점 취소)은 걷고 03k 의 확인창으로 그린다(alert-dialog.md, 2026-10-02) -->
      <div class="sc-card sc-card--full">
        <div class="sc-head">Alert Dialog — spec: specs/components/alert-dialog.md · 모양은 03k · 바깥 누르기 무시 · Esc 는 취소 · 닫기 버튼 없음 · 처음 초점은 확인창</div>
        ${overlayFrame({
          device: "desktop",
          height: 320,
          page: brand.key === "hr"
            ? overlayPage({ desktop: true, title: "권한 관리", rows: [
                { color: "blue", icon: "user", title: "김서연", detail: "디자인 본부 · 관리자", value: "전체 권한" },
                { color: "indigo", icon: "user", title: "박서준", detail: "프로덕트 본부 · 팀장", value: "결재 권한" },
                { color: "violet", icon: "user", title: "이도윤", detail: "운영 본부 · 팀원", value: "조회 권한" },
              ] })
            : brand.key === "desk"
              ? overlayPage({ desktop: true, title: "메모", rows: [
                  { color: "orange", icon: "book", title: "Porest 브랜드 톤", detail: "10월 1일 (목)", value: "342자" },
                  { color: "blue", icon: "book", title: "5월 회고", detail: "9월 30일 (수)", value: "1,204자" },
                  { color: "violet", icon: "book", title: "참고 자료", detail: "9월 28일 (월)", value: "86자" },
                ] })
              : overlayPage({ desktop: true }),
          layers: [overlayScrim("alert"), overlayLayer("alert", alertDialog({
            title: brand.key === "hr" ? "권한을 회수할까요?" : brand.key === "desk" ? "메모를 삭제할까요?" : "거래를 삭제할까요?",
            description: brand.key === "hr" ? "김서연 님의 모든 권한이 바로 빠져요. 다시 주려면 관리자 승인이 필요해요." : brand.key === "desk" ? "삭제한 메모는 되돌릴 수 없어요." : "삭제한 거래는 되돌릴 수 없어요.",
            action: brand.key === "hr" ? "회수" : "삭제",
            size: "small",
          }))],
        })}
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
            <thead><tr><th>${cbox({ state: "indeterminate", name: "모두 선택" })}</th><th>${brand.key === "hr" ? "신청자" : brand.key === "desk" ? "제목" : "Token"} <span class="dt-sort">↑</span></th><th>${brand.key === "hr" ? "기간" : brand.key === "desk" ? "수정일" : "Value"}</th><th>${brand.key === "hr" ? "상태" : brand.key === "desk" ? "태그" : "Type"}</th></tr></thead>
            <tbody>
              <tr><td>${cbox({ state: "checked", name: "이 행 선택" })}</td><td>${brand.key === "hr" ? "김지원" : brand.key === "desk" ? "Porest 톤" : "primary"}</td><td>${brand.key === "hr" ? "5/12-14" : brand.key === "desk" ? "2시간 전" : "#357B5F"}</td><td><span class="dt-badge dt-badge--success">${brand.key === "hr" ? "승인" : brand.key === "desk" ? "공개" : "color"}</span></td></tr>
              <tr><td>${cbox({ state: "checked", name: "이 행 선택" })}</td><td>${brand.key === "hr" ? "이도현" : brand.key === "desk" ? "5월 회고" : "primary-light"}</td><td>${brand.key === "hr" ? "5/15-16" : brand.key === "desk" ? "어제" : "#5DAD86"}</td><td><span class="dt-badge dt-badge--warning">${brand.key === "hr" ? "대기" : brand.key === "desk" ? "초안" : "color"}</span></td></tr>
              <tr><td>${cbox({ state: "checked", name: "이 행 선택" })}</td><td>${brand.key === "hr" ? "최가람" : brand.key === "desk" ? "참고 자료" : "border-focus"}</td><td>${brand.key === "hr" ? "5/20" : brand.key === "desk" ? "3일 전" : "#357B5F"}</td><td><span class="dt-badge">${brand.key === "hr" ? "반려" : brand.key === "desk" ? "보관" : "color"}</span></td></tr>
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
  // v72 Extras 5 — 옛 Sonner 칸은 Snackbar 로 바꿨다(2026-10-02). 띠는 brand.snackbars 의 액션 띠다
  const undo = (brand.snackbars || []).find(item => item.action) || { message: "거래를 삭제했어요.", action: "되돌리기" };
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">19 — Extras (v72)</div>
      <h2 class="section-title">Snackbar · Aspect Ratio · Chart · Date Range · Time Picker</h2>
      <p class="section-lede">5 추가 컴포넌트 — 스낵바, 비율 wrapper, 차트, 기간/시각 선택.</p>
    </header>
    <div class="sc-grid">
      <!-- Snackbar — 옛 Sonner(흰 카드 · 그림자 · 아이콘 넷 · 3장 쌓기)를 03l 의 짙은 띠 하나로 -->
      <div class="sc-card">
        <div class="sc-head">Snackbar — 한 번에 하나</div>
        <div class="pfb-strip">${snackbar(undo)}</div>
        <div class="sc-note">짙은 띠(bg-neutral-inverted) · 아래 가운데 · 4초(액션이 있으면 6초) · 액션은 fg-brand-inverted — 모양 · 자리 · 시간은 03l — 알림 메시지. 옛 Sonner(흰 카드 · 그림자 · 3장 쌓기)는 걷었다.</div>
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
  // 옛 v73 Tag / Chip(브랜드 10% 바탕 · 칩 안의 입력칸 · "제거" ×)은 걷고 03i 의 입력값 칩(chip.md — Outline Weak 고른 모습 + "{글} 지우기")으로 옮겼다(2026-10-02)
  // 옛 v73 Banner 셋(왼쪽 4px 막대 · 8% 바탕 · 동그라미 글자 아이콘)은 걷고 03l 의 Page Banner 하나로 옮겼다(page-banner.md 2026-10-02 — 한 화면에 하나).
  // 점검 안내는 한 번 보면 되는 안내라 닫을 수 있다(눌러 보면 바로 걷힌다 — 페이지 끝 스크립트)
  const isHr = brand.key === "hr";
  const isDesk = brand.key === "desk";
  const notice = isHr ? { head: "홈", title: "변경 예정", description: "6월 1일부터 개인정보 처리방침이 바뀌어요.", button: "내용 보기" }
                      : isDesk ? { head: "홈", title: "점검 예정", description: "5월 15일 밤 11시부터 1시간 동안 동기화를 멈춰요.", interaction: "dismissible", live: true }
                               : { head: "홈", title: "변경 예정", description: "6월 1일부터 이용약관이 바뀌어요.", button: "내용 보기" };
  const people = chipPeople(brand);
  // 안내 팝오버 — 칸 옆 i 버튼(Button ghost · xsmall · 아이콘만)이 연다. 글은 해요체 짧은 문장(popover.md 글)
  const popoverInfo = isHr
    ? { id: nextOverlayId("pov-pop"), page: "휴가", label: "남은 연차 8.5일", title: "연차 사용 규정", text: "입사 1년 미만은 한 달에 1일씩 생기고, 1년이 지나면 15일이 생겨요." }
    : isDesk
      ? { id: nextOverlayId("pov-pop"), page: "가계부", label: "이번 달 예산", title: "예산 알림", text: "카테고리 예산의 80% 와 100% 에 닿으면 알려드려요." }
      : { id: nextOverlayId("pov-pop"), page: "가계부", label: "공유 토큰", title: "공유 토큰 동기화", text: "DESIGN.md 의 공유 토큰은 npm run sync 로 HR · Desk 파일에 복제돼요." };
  const treeRoot = isHr ? ["개발본부", "백엔드팀", "프론트팀"]
                        : isDesk ? ["식비", "외식", "마트"]
                                 : ["루트", "자식 1", "자식 2"];
  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">20 — Extras-2 (v73) · Animation (v74) · Field 검증(옛 v75) · RTL (v76)</div>
      <h2 class="section-title">Page Banner · Chip 입력값 · Popover · File Upload · Treeview · Animation · Field 검증 · RTL</h2>
      <p class="section-lede">v73-v76 시각 데모 — shadcn 누락 5종 + 14 keyframe 라이브 + Field 검증 모습 5(옛 v75 form state 를 Field 로) + dir 토글.</p>
    </header>

    <!-- Page Banner — 옛 v73 Banner 셋을 03l 의 Page Banner 하나로(머리 바로 아래 · 한 화면 하나) -->
    <div class="pfb-top pfb-top--wide">
      <div class="pfb-top-head"><div class="ptf-screen-title">${escape(notice.head)}</div></div>
      ${pageBanner({ tone: "informative", ...notice })}
    </div>
    <p class="sc-note pfb-note">페이지 머리 바로 아래 · 화면 폭 띠 하나 — 옅은 바탕 bg-informative-weak + fg-informative-contrast · 좌우 24 · 최소 40. 모양 · 쓰임은 03l — 알림 메시지. 옛 Banner(왼쪽 4px 막대 · 8% 바탕 · 세 장)는 걷었다.</p>

    <div class="sc-grid">
      <!-- Chip 입력값 — 옛 Tag / Chip 을 03i 의 입력값 칩으로. 지우면 포커스가 다음 칩의 지우기로 간다(페이지 끝 스크립트) -->
      <div class="sc-card">
        <div class="sc-head">Chip — 입력값 · 지우기</div>
        ${chipField({ label: people.label, description: people.description, group: { live: true, items: people.names.map(name => chip({ kind: "input", label: name })) } })}
        <div class="sc-note">Outline Weak 고른 모습(bg-neutral-weak + 1px stroke-neutral-contrast)에 지우기(lucide x · 이름 "{글} 지우기")를 붙인다 — 칩은 버튼이 아니고 지우기만 따로 눌린다. 모양 · 쓰임은 03i — Chip. 옛 Tag / Chip(브랜드 10% 바탕 · 칩 안의 입력칸)은 걷었다.</div>
      </div>

      <!-- Popover — 옛 .pop(288 · 모서리 8 · 1px 테두리 · shadow-md · 안의 의견 입력칸 + 취소 · 제출)은 걷고 03k 의 안내 팝오버로 그린다.
           팝오버에 폼을 넣지 않는다 — 폼은 Dialog · Bottom Sheet 다(popover.md, 2026-10-02) -->
      <div class="sc-card">
        <div class="sc-head">Popover — 안내 · 제목 + 닫기(모양은 03k)</div>
        ${overlayFrame({
          device: "desktop",
          height: 320,
          page: overlayPage({
            desktop: true,
            title: popoverInfo.page,
            rows: isHr ? OVERLAY_LEAVE : OVERLAY_LEDGER,
            lead: overlayAnchor(
              `<span class="pov-info">${escape(popoverInfo.label)}<button class="btn btn-ghost btn-icon-only btn-size-xsmall" type="button" aria-label="${escape(popoverInfo.title)}" aria-haspopup="dialog" aria-expanded="true" aria-controls="${popoverInfo.id}">${OVERLAY_ICON.info}</button></span>`,
              overlayPopover({ id: popoverInfo.id, title: popoverInfo.title, body: `<p class="pov-pop-text">${escape(popoverInfo.text)}</p>` }),
            ),
          }),
        })}
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

      <!-- Field 검증 — 옛 v75 의 5 상태(idle · focused · invalid · valid · validating)를 Field 로 옮겼다(field.md 제출과 검증).
           맞음 · 확인 중은 테두리가 아니라 설명 자리의 글이다 — 초록 테두리 · 돌림 표시는 없다. 포커스는 그 순간을 멈춰 그렸다 -->
      <div class="sc-card sc-card--full">
        <div class="sc-head">Field 검증 — 기본 · 포커스 · 오류 · 맞음 · 확인 중</div>
        <div class="fv-grid">${[
          { ko: "기본", en: "enabled", field: { description: "영문 · 숫자 20자까지", control: { placeholder: "예: porest" } } },
          { ko: "포커스", en: "focused — 안쪽 2px 짙은 테두리", field: { description: "영문 · 숫자 20자까지", control: { value: "porest", focus: true } } },
          { ko: "오류", en: "invalid — 오류가 설명을 대신한다", field: { invalid: true, error: "이미 쓰고 있는 아이디예요.", description: "영문 · 숫자 20자까지", control: { value: "porest" } } },
          { ko: "맞음 — 설명 글로", en: "테두리는 그대로 · 아이콘 16", field: { description: "쓸 수 있는 아이디예요.", descriptionIcon: "circleCheck", control: { value: "porest2026" } } },
          { ko: "확인 중 — 설명 글로", en: "테두리는 그대로", field: { description: "확인하는 중", control: { value: "porest2026" } } },
        ].map(c => `
          <div class="fv-cell">
            <div class="ptf-cap">${escape(c.ko)}<span>${escape(c.en)}</span></div>
            ${textField({ label: "아이디", max: 20, ...c.field, control: { kind: "input", size: "responsive", ...c.field.control } })}
          </div>`).join("")}
        </div>
        <div class="sc-note">오류는 칸 안쪽 2px stroke-critical-solid 와 꼬리의 오류 글(circle-alert)로 알리고, 맞음 · 확인 중은 설명 자리에 글로 쓴다 — 칸의 테두리를 초록으로 바꾸지 않는다(field.md). 검증은 제출 때 칸마다, 위험한 칸(보안 · 금융)만 칸을 떠날 때 바로 한다.</div>
      </div>

      <!-- v76 RTL toggle -->
      <div class="sc-card sc-card--full">
        <div class="sc-head">RTL support (v76) — dir 토글로 logical property mirror</div>
        <div class="rtl-demo" id="rtl-demo">
          <div class="rtl-row">
            <button class="btn btn--primary rtl-btn"><span class="rtl-icon">→</span> ${isHr ? "결재 진행" : isDesk ? "거래 추가" : "Action"}</button>
            <div class="rtl-search">${textInput({ size: "medium", label: "검색", placeholder: "검색", prefixIcon: "search" })}</div>
            ${chipGroup({ label: people.label, live: true, items: [chip({ kind: "input", label: people.names[0] })] })}
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

export function renderBatchSpecs5(brand) {
  // 신규 spec (2026-05-15) — color-swatch / icon-picker / searchable-list
  // 도메인 시나리오: 카테고리 색/아이콘, 카드 카탈로그. 기본 통화(옛 radio-list)는 List 의 라디오 줄로 옮겼다(2026-10-01 — renderListGallery).
  // 테마 선택(옛 tile)은 앞에 미리보기를 둔 List 라디오 줄로, 제목 · 설명이 붙는 미리보기 카드는 Select Box 로 옮겼다(2026-10-01 — renderSelectBoxGallery).
  const isHr = brand.key === "hr";
  const isDesk = brand.key === "desk";

  // ColorSwatch palette (10색)
  const palette = [
    { v: "rose", bg: "#FFE7EB", fg: "#C53052" },
    { v: "coral", bg: "#FFE2D5", fg: "#C04E20" },
    { v: "amber", bg: "#FFF1C7", fg: "#9F6907" },
    { v: "lime", bg: "#E2F5C7", fg: "#4E7A14" },
    { v: "forest", bg: "#D4EBD9", fg: "#1E7D4C" },
    { v: "teal", bg: "#CFEFEC", fg: "#107069" },
    { v: "sky", bg: "#D6E9FB", fg: "#1E68B3" },
    { v: "indigo", bg: "#DDDCFB", fg: "#3A36AD" },
    { v: "violet", bg: "#EAD9FA", fg: "#7237AF" },
    { v: "slate", bg: "#E5E8EE", fg: "#3F4960" },
  ];
  const CHECK14 = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  const activeColorIdx = isHr ? 4 : isDesk ? 6 : 4; // HR=forest, Desk=sky, base=forest
  const swatchCells = palette.map((c, i) =>
    `<button type="button" class="csw-cell${i === activeColorIdx ? " csw-cell--active" : ""}" style="background:${c.bg}; color:${c.fg};" aria-label="${c.v}" aria-checked="${i === activeColorIdx}">${i === activeColorIdx ? CHECK14 : ""}</button>`
  ).join("");

  // IconPicker — 도메인별 활성 아이콘 인덱스
  // 검색칸은 Input 의 앞 아이콘(textInput prefixIcon) — 아이콘을 절대 위치로 겹쳐 그리던 것을 걷었다(icon-picker.md · searchable-list.md 2026-10-01)
  const STAR = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  const HEART = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  const COFFEE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>';
  const HOME = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  const BOOK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
  const CAR = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>';
  const GIFT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>';
  const MUSIC = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
  const CAMERA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';
  const SETTING = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

  const iconSet = [STAR, HEART, COFFEE, HOME, BOOK, CAR, GIFT, MUSIC, CAMERA, SETTING, STAR, HEART, COFFEE, HOME, BOOK, CAR, GIFT, MUSIC, CAMERA, SETTING, STAR, HEART, COFFEE, HOME];
  const activeIconIdx = isHr ? 7 : isDesk ? 2 : 0; // HR=music(이벤트), Desk=coffee, base=star
  const iconCells = iconSet.map((svg, i) =>
    `<button type="button" class="ipk-cell${i === activeIconIdx ? " ipk-cell--active" : ""}" aria-label="icon-${i}" aria-pressed="${i === activeIconIdx}">${svg}</button>`
  ).join("");

  // SearchableList (카드 카탈로그)
  const cards = [
    { name: "신한 SOL 트래블 카드", company: "신한카드", type: "체크", fee: 0, color: "#0046FF", discontinued: false, initial: "신" },
    { name: "현대카드 The Red", company: "현대카드", type: "신용", fee: 500000, color: "#000000", discontinued: false, initial: "현" },
    { name: "삼성카드 taptap O", company: "삼성카드", type: "신용", fee: 10000, color: "#0F4ABE", discontinued: false, initial: "삼" },
    { name: "KB국민 노리체크", company: "KB국민카드", type: "체크", fee: 0, color: "#FFB81C", discontinued: false, initial: "K" },
    { name: "롯데카드 라이킷", company: "롯데카드", type: "신용", fee: 12000, color: "#ED1C24", discontinued: true, initial: "롯" },
  ];
  const slRows = cards.map((c, i) => {
    const active = i === 0;
    const dim = c.discontinued && !active ? "opacity:0.7;" : "";
    return `<button type="button" class="sl-row${active ? " sl-row--active" : ""}" style="${dim}" aria-pressed="${active}">
      <span class="sl-thumb" style="background:${c.color};">${c.initial}</span>
      <span class="sl-body">
        <span class="sl-title"><span class="sl-title-text">${c.name}</span>${c.discontinued ? `<span class="sl-badge">단종</span>` : ""}</span>
        <span class="sl-sub">${c.company} · ${c.type}${c.fee > 0 ? ` · 연회비 ${c.fee.toLocaleString("ko-KR")}원` : ""}</span>
      </span>
    </button>`;
  }).join("");

  return `
  <section class="section">
    <header class="section-head">
      <div class="section-eyebrow">21 — Domain selectors (2026-05-15 신규 spec)</div>
      <h2 class="section-title">ColorSwatch · IconPicker · SearchableList</h2>
      <p class="section-lede">desk-front 도메인에서 spec으로 끌어올린 3개 단일-선택 패턴 — 카테고리 색/아이콘, 카드 카탈로그. 기본 통화(옛 RadioList)는 03e — List 의 라디오 줄로 옮겼다. 테마 선택(옛 Tile)은 앞에 미리보기를 둔 List 라디오 줄로 옮겼고, 제목 · 설명이 붙는 미리보기 카드는 03f — Select Box 다.</p>
    </header>

    <div class="sc-grid">
      <!-- ColorSwatch -->
      <div class="sc-card">
        <div class="sc-head">ColorSwatch — 카테고리/라벨 색 (10색 grid)</div>
        <div class="csw" role="radiogroup" style="grid-template-columns: repeat(5, minmax(0, 1fr)); max-width: 260px;">
          ${swatchCells}
        </div>
        <div class="sc-note">aspect-ratio 1 + radius-tile. active swatch는 자기 색의 currentColor border 2px + ✓. hover scale(1.05).</div>
      </div>

      <!-- IconPicker -->
      <div class="sc-card">
        <div class="sc-head">IconPicker — 카테고리 아이콘 (popover + grid 8-col)</div>
        <div style="display:flex; align-items:flex-start; gap: var(--spacing-md);">
          <button type="button" class="ipk-trigger" aria-haspopup="dialog" aria-expanded="true">${iconSet[activeIconIdx]}</button>
          <div class="ipk-content">
            <div class="ipk-search">${textInput({ size: "responsive", label: "아이콘 검색", placeholder: "아이콘 검색...", prefixIcon: "search", clearable: true })}</div>
            <div class="ipk-grid">${iconCells}</div>
          </div>
        </div>
        <div class="sc-note">2000+ Lucide 아이콘 중 매칭 상위 100건 limit. trigger 40×40 — Input medium(데스크톱 웹)과 같은 높이(icon-picker.md).</div>
      </div>

      <!-- SearchableList -->
      <div class="sc-card">
        <div class="sc-head">SearchableList — 카드 카탈로그 (search + thumbnail list)</div>
        <div class="sl-head">
          <span class="sl-head-label">카드</span>
          <span class="sl-head-count">총 142개</span>
        </div>
        <div class="sl-search">${textInput({ size: "responsive", label: "검색", placeholder: "카드명 또는 발급사 검색", prefixIcon: "search", clearable: true })}</div>
        <div class="sl" style="max-height: 240px;">${slRows}</div>
        <div class="sc-note">대량 옵션 + 검색 필요 — 카드/은행/증권사/종목/도시. active row는 bg-brand-subtle + 주제목 primary-strong semi.</div>
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
    /* 한국어 줄바꿈 — 단어 단위(DESIGN.md Typography "v114 — 줄바꿈"). 한 줄보다 긴 낱말만 칸 끝에서 끊는다 */
    html { word-break: keep-all; overflow-wrap: break-word; }
    body {
      font-family: var(--font-sans);
      background: var(--color-bg-page);
      color: var(--color-text-primary);
      margin: 0;
      padding: 0;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* === Thin scrollbar (porest-desk-front 톤 정합) ===
       WebKit/Blink: 6px + border-strong pill thumb + transparent track
       Firefox(W3C 표준): scrollbar-width: thin + scrollbar-color
       .scrollbar-hide utility: 완전 숨김 opt-in */
    * { scrollbar-width: thin; scrollbar-color: var(--color-border-strong) transparent; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--color-border-strong); border-radius: var(--radius-full); }
    ::-webkit-scrollbar-thumb:hover { background: var(--color-border-strong); }
    .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
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
    /* 히어로 버튼(.btn-on-accent · .btn-outline-on-dark)은 아래 Button 블록에 있다 — 변형 변수를 쓰므로 .btn 뒤에 와야 한다 */
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

    /* === Button — specs/components/button.md · button.yaml(수치 원본) · button.tsx 와 같은 모양 ===
       구조는 SEED Action Button(2026-09-30) — 변형 7 · 크기 4 · 배치 2(글자 · 아이콘만) · 상태 6.
       변형은 색을 --btn-* 변수에 담기만 하고, 상태(호버 · 누름 · 로딩 · 비활성)가 그 변수를 골라 칠한다.
       옛 이름(.btn-primary · .btn-outline · .btn-size-sm …)은 button.md Migration notes 대로 새 모양에 붙인다 —
       다른 컴포넌트 미리보기가 아직 옛 이름을 쓴다. 다크 짝은 아래 [data-theme="dark"] .btn 에서 바꾼다. */
    .btn {
      /* 브랜드 역할 색 — 공유 토큰(DESIGN.md)에는 없어 중립으로 떨어진다. 옛 사이트(build-site)는 --color-primary · --color-border-focus 만 브랜드로 바꾼다 */
      --btn-brand-solid: var(--color-bg-brand-solid, var(--color-primary, var(--color-bg-neutral-inverted)));
      --btn-brand-solid-pressed: var(--color-bg-brand-solid-pressed, var(--color-primary, var(--color-bg-neutral-inverted-pressed)));
      /* 브랜드 채움 위 글자 — 브랜드 색이 있으면 흰색(static-white), 없으면 중립 채움의 글자색(다크에서 흰 채움 위 흰 글자 방지).
         color-mix(브랜드 0%, 흰색) 은 늘 흰색이지만, 브랜드 토큰이 비면 식 전체가 무효가 되어 대체값으로 간다 */
      --btn-brand-white: color-mix(in srgb, var(--color-bg-brand-solid, var(--color-primary)) 0%, var(--color-static-white));
      --btn-brand-on-solid: var(--btn-brand-white, var(--color-fg-neutral-inverted));
      --btn-brand-fg: var(--color-fg-brand, var(--color-primary, var(--color-fg-neutral)));
      --btn-brand-track: var(--color-bg-brand-weak-pressed, var(--color-gray-500));
      --btn-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      /* 상태가 고르는 값 — 변형이 따로 정하지 않으면 이 기본을 쓴다 */
      --btn-fg-pressed: var(--btn-fg);
      --btn-bg-loading: var(--btn-bg-pressed);
      --btn-bg-disabled: var(--color-bg-disabled);
      /* 크기 기본 = medium(cva defaultVariants). 누름 배율 = (기준 − 2) ÷ 기준 — 정적 미리보기라 기준은 높이 */
      --press-basis: 40;
      --progress-size: 16px;
      --btn-icon-size: 16px;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-x1_5);
      box-sizing: border-box;
      height: 40px;
      padding: var(--spacing-x2_5) var(--spacing-x4);
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 700;
      white-space: nowrap;
      text-decoration: none;
      border: none;
      border-radius: var(--radius-r2);
      background: var(--btn-bg);
      color: var(--btn-fg);
      cursor: pointer;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        color var(--motion-duration-color-transition) var(--motion-ease-easing),
        scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    /* 누르는 영역 44 — 보이는 상자보다 작으면 가로 · 세로 44 까지 넓힌다(v106) */
    .btn::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      min-width: 44px;
      min-height: 44px;
      translate: -50% -50%;
    }
    .btn svg { width: var(--btn-icon-size); height: var(--btn-icon-size); flex-shrink: 0; pointer-events: none; }

    /* 변형 — 기본(cva defaultVariants)은 neutralSolid 라 .btn 만 있어도 이 모양이다.
       옛 이름: default(.btn-primary) → neutralSolid · destructive → criticalSolid · outline → neutralOutline ·
       accent → ghost + brand 글자. .btn--* 는 옛 사이트(build-site)의 이름이다. */
    .btn, .btn-neutral-solid, .btn-primary, .btn--primary {
      --btn-bg: var(--color-bg-neutral-inverted);
      --btn-fg: var(--color-fg-neutral-inverted);
      --btn-bg-pressed: var(--color-bg-neutral-inverted-pressed);
      --progress-track: color-mix(in srgb, var(--color-fg-neutral-inverted) 30%, transparent);
      --progress-range: var(--color-fg-neutral-inverted);
    }
    .btn-brand-solid {
      --btn-bg: var(--btn-brand-solid);
      --btn-fg: var(--btn-brand-on-solid);
      --btn-bg-pressed: var(--btn-brand-solid-pressed);
      --progress-track: color-mix(in srgb, var(--btn-brand-on-solid) 30%, transparent);
      --progress-range: var(--btn-brand-on-solid);
    }
    .btn-neutral-weak {
      --btn-bg: var(--color-bg-neutral-weak);
      --btn-fg: var(--color-fg-neutral);
      --btn-bg-pressed: var(--color-bg-neutral-weak-pressed);
      --progress-track: var(--color-gray-500);
      --progress-range: var(--color-fg-neutral);
    }
    .btn-critical-solid, .btn-destructive {
      --btn-bg: var(--color-bg-critical-solid);
      --btn-fg: var(--color-static-white);
      --btn-bg-pressed: var(--color-bg-critical-solid-pressed);
      --progress-track: color-mix(in srgb, var(--color-static-white) 30%, transparent);
      --progress-range: var(--color-static-white);
    }
    /* Outline — 로딩 · 비활성에도 배경은 투명하고 테두리는 그대로다(button.yaml) */
    .btn-brand-outline, .btn-neutral-outline, .btn-outline, .btn--outline {
      --btn-bg: transparent;
      --btn-bg-pressed: var(--color-bg-layer-default-pressed);
      --btn-bg-loading: transparent;
      --btn-bg-disabled: transparent;
      border: 1px solid var(--color-stroke-neutral-weak);
    }
    .btn-brand-outline {
      --btn-fg: var(--btn-brand-fg);
      --progress-track: var(--btn-brand-track);
      --progress-range: var(--btn-brand-solid);
    }
    .btn-neutral-outline, .btn-outline, .btn--outline {
      --btn-fg: var(--color-fg-neutral);
      --progress-track: var(--color-gray-500);
      --progress-range: var(--color-fg-neutral);
    }
    .btn-ghost, .btn--ghost, .btn-accent {
      --btn-bg: transparent;
      --btn-fg: var(--color-fg-neutral);
      --btn-bg-pressed: var(--color-bg-layer-default-pressed);
      --btn-bg-disabled: transparent;
      --progress-track: var(--color-gray-500);
      --progress-range: var(--color-fg-neutral);
    }
    /* ghost 글자색(SEED ghost 의 color) — 배경 · 누름은 ghost 그대로. 옛 ghost 아이콘 액션(.btn-icon)은 neutralSubtle */
    .btn-ghost-subtle, .btn-ghost.btn-icon { --btn-fg: var(--color-fg-neutral-subtle); }
    .btn-ghost-brand, .btn-accent { --btn-fg: var(--btn-brand-fg); }
    .btn-ghost-critical, .btn-icon.btn-icon-danger { --btn-fg: var(--color-fg-critical); }
    /* 브랜드 채움 위(히어로 카드) — preview 전용, 스펙 변형이 아니다. 표면 버튼 + 흰 테두리 버튼 */
    .btn-on-accent {
      --btn-bg: var(--color-bg-layer-default);
      --btn-fg: var(--color-fg-neutral);
      --btn-bg-pressed: var(--color-bg-layer-default-pressed);
    }
    .btn-on-accent.btn-outline-on-dark {
      --btn-bg: transparent;
      --btn-fg: var(--color-static-white);
      --btn-bg-pressed: color-mix(in srgb, var(--color-static-white) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--color-static-white) 40%, transparent);
    }

    /* 크기 — 이름이 아니라 높이로 고른다. 옛 sm → xsmall(알약) · md → medium · lg → large.
       대화상자 · 팝오버 바닥은 small(36), 시트 바닥은 large(48) — 03k 의 overlayButton 이 크기를 단다(button.md 버튼 배치). */
    .btn-size-xsmall, .btn-size-sm {
      --press-basis: 32;
      --progress-size: 14px;
      --btn-icon-size: 14px;
      height: 32px;
      padding: var(--spacing-x1_5) var(--spacing-x3_5);
      gap: var(--spacing-x1);
      border-radius: var(--radius-full);
      font-size: var(--text-t3);
      line-height: var(--text-t3--line-height);
    }
    .btn-size-small {
      --press-basis: 36;
      --progress-size: 14px;
      --btn-icon-size: 14px;
      height: 36px;
      padding: var(--spacing-x2) var(--spacing-x3_5);
      gap: var(--spacing-x1);
      border-radius: var(--radius-r2);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
    }
    .btn-size-medium, .btn-size-md {
      --press-basis: 40;
      --progress-size: 16px;
      --btn-icon-size: 16px;
      height: 40px;
      padding: var(--spacing-x2_5) var(--spacing-x4);
      gap: var(--spacing-x1_5);
      border-radius: var(--radius-r2);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
    }
    .btn-size-large, .btn-size-lg {
      --press-basis: 48;
      --progress-size: 18px;
      --btn-icon-size: 22px;
      height: 48px;
      padding: var(--spacing-x3) var(--spacing-x5);
      gap: var(--spacing-x2);
      border-radius: var(--radius-r3);
      font-size: var(--text-t6);
      line-height: var(--text-t6--line-height);
    }
    /* 아이콘만 — 정사각(폭 = 높이), 여백은 사방 같다. 기본은 medium. 옛 icon · iconLg 는 medium 아이콘만 */
    .btn-icon-only, .btn-icon, .btn-icon-lg { width: 40px; padding: var(--spacing-x2_5); --btn-icon-size: 18px; }
    .btn-icon-only.btn-size-xsmall { width: 32px; padding: var(--spacing-x1_5); --btn-icon-size: 14px; }
    .btn-icon-only.btn-size-small { width: 36px; padding: var(--spacing-x2); --btn-icon-size: 16px; }
    .btn-icon-only.btn-size-medium { width: 40px; padding: var(--spacing-x2_5); --btn-icon-size: 18px; }
    .btn-icon-only.btn-size-large { width: 48px; padding: var(--spacing-x3); --btn-icon-size: 22px; }
    /* 가장자리 맞춤(flush, SEED bleed) — 그 방향 가로 여백만 0. flush ghost 는 텍스트 버튼이라
       배경을 깔지 않고 글자색으로만 반응한다(neutralSubtle → 누르면 fg-neutral). */
    .btn.btn-flush-left { padding-left: 0; }
    .btn.btn-flush-right { padding-right: 0; }
    .btn-ghost.btn-flush-left, .btn-ghost.btn-flush-right {
      --btn-fg: var(--color-fg-neutral-subtle);
      --btn-fg-pressed: var(--color-fg-neutral);
      --btn-bg-pressed: transparent;
    }
    .btn-ghost.btn-flush-left:focus-visible, .btn-ghost.btn-flush-right:focus-visible { color: var(--color-fg-neutral); }

    /* 상태 — 호버 = 누름 색(v106, hover 되는 기기에서만). 누름 = 누름 색 + 세로 2px 거리 축소(v104).
       .btn-state-* 는 갤러리에서 상태를 고정해 보여 주는 클래스다. */
    @media (hover: hover) {
      .btn:hover { background: var(--btn-bg-pressed); color: var(--btn-fg-pressed); }
    }
    .btn.btn-state-hover { background: var(--btn-bg-pressed); color: var(--btn-fg-pressed); }
    .btn:active,
    .btn.btn-state-pressed {
      background: var(--btn-bg-pressed);
      color: var(--btn-fg-pressed);
      scale: calc(1 - 2 / var(--press-basis));
    }
    /* 포커스 — 키보드 포커스에만 링 2px · 띄움 2px(v106) */
    .btn:focus-visible,
    .btn.btn-state-focus { outline: 2px solid var(--btn-focus-ring); outline-offset: 2px; }
    /* 로딩 — 누름 색 위 로딩 원. 라벨은 숨기기만 해 폭이 그대로다. 누르기를 막는다(aria-busy) */
    .btn.btn-loading,
    .btn[aria-busy="true"] {
      background: var(--btn-bg-loading);
      color: transparent;
      cursor: progress;
      pointer-events: none;
    }
    .btn.btn-loading > *,
    .btn[aria-busy="true"] > * { visibility: hidden; }
    .btn.btn-loading::after,
    .btn[aria-busy="true"]::after {
      content: "";
      position: absolute;
      inset: 0;
      margin: auto;
      box-sizing: border-box;
      width: var(--progress-size);
      height: var(--progress-size);
      border: 2px solid var(--progress-track);
      border-top-color: var(--progress-range);
      border-radius: var(--radius-full);
      animation: btn-progress-spin var(--motion-duration-loop) var(--motion-ease-linear) infinite;
    }
    @keyframes btn-progress-spin { to { transform: rotate(360deg); } }
    /* 비활성 — 전용 색(v106). 불투명도로 흐리게 하지 않고, 호버 · 누름에 반응하지 않는다 */
    .btn:disabled {
      background: var(--btn-bg-disabled);
      color: var(--color-fg-disabled);
      cursor: not-allowed;
      /* 누르는 영역은 그대로 둔다 — 포인터 이벤트를 끄면 커서가 보이지 않는다. 누름 축소만 뺀다(호버 · 누름 색은 위 규칙을 이 규칙이 덮는다) */
      scale: 1;
    }
    /* 모션 줄이기 — 축소하지 않는다(누름은 색으로만). 로딩 원도 멈춘다(Spinner 와 같다) */
    @media (prefers-reduced-motion: reduce) {
      .btn:active,
      .btn.btn-state-pressed { scale: 1; }
      .btn.btn-loading::after,
      .btn[aria-busy="true"]::after { animation: none; }
    }

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

    /* Button gallery — 버튼은 흰 표면 위에서 본다. 페이지 바탕(bg-layer-basement)이 bg-neutral-weak · bg-disabled 와
       같은 gray-200 이라 바탕에 바로 두면 neutralWeak · 비활성 버튼이 보이지 않는다. */
    .btn-panel {
      background: var(--color-surface-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
      overflow-x: auto;
    }
    .btn-panel + .btn-panel { margin-top: var(--spacing-lg); }
    .btn-panel-head { margin-bottom: var(--spacing-md); }
    .btn-panel-title { font-weight: 600; font-size: var(--text-title-sm); }
    .btn-panel-sub { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-top: 2px; }
    .btn-matrix { display: grid; gap: var(--spacing-md); min-width: 720px; }
    .btn-row { display: grid; grid-template-columns: 168px repeat(6, minmax(0, 1fr)); gap: var(--spacing-sm); align-items: center; }
    .btn-row--4 { grid-template-columns: 168px repeat(4, minmax(0, 1fr)); }
    .btn-row--head { align-items: end; padding-bottom: var(--spacing-xs); border-bottom: 1px solid var(--color-border-default); }
    .btn-cell-head, .btn-row-label { font-weight: 600; font-size: var(--text-caption); color: var(--color-text-secondary); line-height: 1.4; }
    .btn-cell-head span, .btn-row-label span { display: block; font-family: ui-monospace, monospace; font-size: 11px; font-weight: 400; color: var(--color-text-tertiary); }
    .btn-cell { display: flex; align-items: center; }

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

    /* === Badge === badge.md SoT — text-badge(11/600/1.2) + pill + soft semantic 16% mix
       brand vignette 라벨용 uppercase + letter-spacing은 dense 시각 톤(영문 약어 위주)이라 보존,
       Badge tsx/examples는 base에서 uppercase 제거(한국어 라벨 친화). */
    .badge {
      display: inline-flex; align-items: center;
      font-size: var(--text-badge);
      font-weight: var(--text-badge--font-weight, 600);
      line-height: var(--text-badge--line-height, 1.2);
      padding: 2px var(--spacing-sm);
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .badge-success { background: var(--color-bg-positive-weak); color: var(--color-fg-positive-contrast); }
    [data-theme="dark"] .badge-success { background: var(--color-bg-positive-weak-dark); color: var(--color-fg-positive-contrast-dark); }
    .badge-error { background: var(--color-bg-critical-weak); color: var(--color-fg-critical-contrast); }
    [data-theme="dark"] .badge-error { background: var(--color-bg-critical-weak-dark); color: var(--color-fg-critical-contrast-dark); }
    .badge-warning { background: var(--color-bg-warning-weak); color: var(--color-fg-warning-contrast); }
    [data-theme="dark"] .badge-warning { background: var(--color-bg-warning-weak-dark); color: var(--color-fg-warning-contrast-dark); }
    .badge-info { background: var(--color-bg-informative-weak); color: var(--color-fg-informative-contrast); }
    [data-theme="dark"] .badge-info { background: var(--color-bg-informative-weak-dark); color: var(--color-fg-informative-contrast-dark); }

    /* kpi-card */
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-md); }
    .kpi-cell { padding: var(--spacing-md); background: var(--color-surface-input); border-radius: var(--radius-md); }
    .kpi-label { font-size: var(--text-caption); color: var(--color-text-tertiary); margin-bottom: var(--spacing-xs); }
    .kpi-value { font-size: var(--text-display-sm); font-weight: 700; line-height: 1.2; }
    .kpi-delta { font-size: 11px; color: var(--color-text-secondary); margin-top: var(--spacing-xs); }

    /* === Checkbox — specs/components/checkbox.md · checkbox.yaml(수치 원본) · checkbox.tsx 와 같은 모양 ===
       구조는 SEED Checkbox(2026-09-30) — 칸 .checkbox(Checkmark) · 칸 + 라벨 .checkbox-row(Checkbox) · 묶음 .checkbox-group.
       크기 medium 20(기본) · large 24, 모양 square(기본) · ghost, 톤 neutral(기본) · brand, 체크 여부는 aria-checked(false · true · mixed).
       모양 · 톤 · 체크 여부는 색을 --checkbox-* 변수에 담기만 하고, 상태(호버 · 누름 · 비활성)가 그 변수를 골라 칠한다(.btn 과 같은 방식).
       옛 sm 16 · md 18 · lg 20 · 빨간 오류 테두리 · 50% 흐림은 없다(checkbox.md Migration notes) — 오류는 묶음 아래 글이다.
       다크 짝은 이 블록 끝의 [data-theme="dark"] .checkbox 에서 바꾼다. */
    .checkbox {
      /* 브랜드 역할 색 — 공유 토큰(DESIGN.md)에는 없어 중립으로 떨어진다(.btn 과 같은 대체 사슬) */
      --checkbox-brand-solid: var(--color-bg-brand-solid, var(--color-primary, var(--color-bg-neutral-inverted)));
      --checkbox-brand-solid-pressed: var(--color-bg-brand-solid-pressed, var(--color-primary, var(--color-bg-neutral-inverted-pressed)));
      /* 브랜드 채움 위 체크 — 브랜드 색이 있으면 static-white, 없으면 중립 채움의 글자색(.btn-brand-solid 와 같은 식) */
      --checkbox-brand-white: color-mix(in srgb, var(--color-bg-brand-solid, var(--color-primary)) 0%, var(--color-static-white));
      --checkbox-brand-on-solid: var(--checkbox-brand-white, var(--color-fg-neutral-inverted));
      --checkbox-brand-fg: var(--color-fg-brand, var(--color-primary, var(--color-fg-neutral)));
      --checkbox-brand-weak-pressed: var(--color-bg-brand-weak-pressed, var(--color-bg-neutral-weak));
      --checkbox-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      /* 톤 — 선택 · 일부 선택의 색. 기본 neutral(짙은 회색) */
      --checkbox-solid: var(--color-bg-neutral-inverted);
      --checkbox-solid-pressed: var(--color-bg-neutral-inverted-pressed);
      --checkbox-on-solid: var(--color-fg-neutral-inverted);
      --checkbox-ghost-fg: var(--color-fg-neutral);
      --checkbox-ghost-pressed: var(--color-bg-neutral-weak);
      /* 칸이 쓰는 값 — 기본은 square · 선택 안 됨 */
      --checkbox-bg: transparent;
      --checkbox-bg-pressed: var(--color-bg-layer-default-pressed);
      --checkbox-border: var(--color-stroke-neutral-solid);
      --checkbox-fg: var(--color-fg-neutral-inverted);
      --checkbox-bg-disabled: var(--color-bg-disabled);
      --checkbox-border-disabled: var(--color-stroke-neutral-weak);
      /* 크기 기본 = medium. 누름 배율 = (기준 − 2) ÷ 기준 — 기준은 max(칸, 24) 라 두 크기 모두 24(22/24) */
      --press-basis: 24;
      --checkbox-icon-size: 12px;
      position: relative;
      display: inline-grid;
      place-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      margin: 0;
      padding: 0;
      appearance: none;
      border: 1px solid var(--checkbox-border);
      border-radius: var(--radius-r1);
      background: var(--checkbox-bg);
      color: var(--checkbox-fg);
      cursor: pointer;
      vertical-align: middle;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        border-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        color var(--motion-duration-color-transition) var(--motion-ease-easing),
        scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .checkbox svg { display: block; width: var(--checkbox-icon-size); height: var(--checkbox-icon-size); pointer-events: none; }
    /* 크기 × 모양 — 칸과 아이콘. Ghost 는 칸이 없어 아이콘이 크다(12 · 14 → 14 · 18) */
    .checkbox.checkbox--large { width: 24px; height: 24px; --checkbox-icon-size: 14px; }
    .checkbox.checkbox--ghost { --checkbox-icon-size: 14px; }
    .checkbox.checkbox--ghost.checkbox--large { --checkbox-icon-size: 18px; }
    /* 톤 brand — 서비스 핵심 흐름에서만 */
    .checkbox.checkbox--brand {
      --checkbox-solid: var(--checkbox-brand-solid);
      --checkbox-solid-pressed: var(--checkbox-brand-solid-pressed);
      --checkbox-on-solid: var(--checkbox-brand-on-solid);
      --checkbox-ghost-fg: var(--checkbox-brand-fg);
      --checkbox-ghost-pressed: var(--checkbox-brand-weak-pressed);
    }
    /* Square · 선택 · 일부 선택 — 테두리 없이 톤 색으로 채운다 */
    .checkbox[aria-checked="true"],
    .checkbox[aria-checked="mixed"] {
      --checkbox-bg: var(--checkbox-solid);
      --checkbox-bg-pressed: var(--checkbox-solid-pressed);
      --checkbox-fg: var(--checkbox-on-solid);
      border-width: 0;
    }
    /* Ghost — 칸 없이 체크만. 선택 안 됨도 옅은 체크(fg-placeholder), 비활성에도 바탕을 깔지 않는다 */
    .checkbox.checkbox--ghost {
      --checkbox-bg: transparent;
      --checkbox-bg-pressed: var(--color-bg-layer-default-pressed);
      --checkbox-fg: var(--color-fg-placeholder);
      --checkbox-bg-disabled: transparent;
      border-width: 0;
    }
    .checkbox--ghost[aria-checked="true"],
    .checkbox--ghost[aria-checked="mixed"] {
      --checkbox-fg: var(--checkbox-ghost-fg);
      --checkbox-bg-pressed: var(--checkbox-ghost-pressed);
    }

    /* 상태 — 호버 = 누름 색(v106, hover 되는 기기에서만). 누름 = 누름 색 + 칸만 세로 2px 거리 축소(v104), 라벨은 줄지 않는다.
       라벨을 눌러도 칸이 반응한다(.checkbox-row). .checkbox--hover · --focus · --pressed 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다. */
    @media (hover: hover) {
      .checkbox:hover,
      .checkbox-row:hover .checkbox:not(:disabled) { background: var(--checkbox-bg-pressed); }
    }
    .checkbox.checkbox--hover { background: var(--checkbox-bg-pressed); }
    .checkbox:active,
    .checkbox-row:active .checkbox:not(:disabled),
    .checkbox.checkbox--pressed {
      background: var(--checkbox-bg-pressed);
      scale: calc(1 - 2 / var(--press-basis));
    }
    /* 포커스 — 키보드 포커스에만 링 2px · 띄움 2px(v106) */
    .checkbox:focus-visible,
    .checkbox.checkbox--focus { outline: 2px solid var(--checkbox-focus-ring); outline-offset: 2px; }
    /* 비활성 — 전용 색(v106). 불투명도로 흐리게 하지 않고, 호버 · 누름에 반응하지 않는다 */
    .checkbox:disabled {
      background: var(--checkbox-bg-disabled);
      border-color: var(--checkbox-border-disabled);
      color: var(--color-fg-disabled);
      cursor: not-allowed;
      /* 누르는 영역은 그대로 둔다 — 포인터 이벤트를 끄면 커서가 보이지 않는다. 누름 축소만 뺀다(호버 · 누름 색은 위 규칙을 이 규칙이 덮는다) */
      scale: 1;
    }
    /* 모션 줄이기 — 축소하지 않는다(누름은 색으로만) */
    @media (prefers-reduced-motion: reduce) {
      .checkbox:active,
      .checkbox-row:active .checkbox:not(:disabled),
      .checkbox.checkbox--pressed { scale: 1; }
    }

    /* 칸 + 라벨 한 줄(Checkbox) — 라벨까지 눌린다. 줄 높이 32 · 36, 칸과 라벨 사이 8 */
    .checkbox-row {
      position: relative;
      display: inline-flex;
      align-items: center;
      /* 줄은 칸 + 라벨만큼만 — 세로 묶음 안에서도 묶음 폭으로 늘지 않는다(checkbox.tsx 의 self-start) */
      align-self: flex-start;
      gap: var(--spacing-x2);
      min-height: 32px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .checkbox-row--large { min-height: 36px; }
    /* 누르는 영역 44 — 라벨까지 묶은 줄이 44 보다 작으면 가로 · 세로 44 까지 넓힌다(기초 Inclusive) */
    .checkbox-row::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      min-width: 44px;
      min-height: 44px;
      translate: -50% -50%;
    }
    .checkbox-row:has(.checkbox:disabled) { cursor: not-allowed; }
    .checkbox-label {
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 400;
      color: var(--color-fg-neutral);
    }
    .checkbox-row--large .checkbox-label { font-size: var(--text-t5); line-height: var(--text-t5--line-height); }
    .checkbox-label--bold { font-weight: 700; }
    .checkbox:disabled + .checkbox-label { color: var(--color-fg-disabled); }
    /* 묶음(Checkbox Group) — 세로로 쌓고 줄 사이 12(줄 32 · 36 에 더해 44 · 48 마다 한 줄 — 이웃 줄과 누르는 영역 44 가 겹치지 않는다).
       부모는 맨 위에 두고 들여쓰지 않는다 */
    .checkbox-group { display: flex; flex-direction: column; gap: var(--spacing-x3); }

    /* 다크 — 역할 색을 체크박스 안에서만 다크 짝으로 바꾼다(.btn 과 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       라벨이 쓰는 값은 줄(.checkbox-row)에서 바꾼다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝은 비어서 위 대체값(중립)으로 떨어진다. */
    [data-theme="dark"] .checkbox,
    [data-theme="dark"] .checkbox-row {
      --color-bg-brand-solid: var(--color-bg-brand-solid-dark);
      --color-bg-brand-solid-pressed: var(--color-bg-brand-solid-pressed-dark);
      --color-bg-brand-weak-pressed: var(--color-bg-brand-weak-pressed-dark);
      --color-fg-brand: var(--color-fg-brand-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-stroke-neutral-solid: var(--color-stroke-neutral-solid-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-bg-neutral-inverted-pressed: var(--color-bg-neutral-inverted-pressed-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-placeholder: var(--color-fg-placeholder-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
    }

    /* Checkbox 갤러리 — 흰 표면(.vignette-card) 위 표. 페이지 바탕(bg-layer-basement)이 bg-disabled 와 같은 gray-200 이라
       바탕에 바로 두면 비활성 칸이 보이지 않는다. 열 수는 --cb-cols 로 받는다. */
    .cb-panel { overflow-x: auto; }
    .cb-panel + .cb-panel { margin-top: var(--spacing-lg); }
    .cb-matrix { display: grid; gap: var(--spacing-sm); }
    .cb-matrix-row { display: grid; grid-template-columns: 168px repeat(var(--cb-cols), minmax(96px, 1fr)); gap: var(--spacing-sm); align-items: center; }
    .cb-matrix-row--head { align-items: end; padding-bottom: var(--spacing-xs); border-bottom: 1px solid var(--color-border-default); }
    .cb-matrix-head, .cb-matrix-label { font-weight: 600; font-size: var(--text-caption); color: var(--color-text-secondary); line-height: 1.4; }
    .cb-matrix-head span, .cb-matrix-label span { display: block; font-family: ui-monospace, monospace; font-size: 11px; font-weight: 400; color: var(--color-text-tertiary); }
    .cb-matrix-cell { display: flex; align-items: center; min-height: 36px; }
    .cb-group-legend { margin-bottom: var(--spacing-xs); font-size: var(--text-caption); font-weight: 600; color: var(--color-text-secondary); }
    @media (max-width: 900px) {
      .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(96px, 1fr)); }
    }

    /* === Radio — specs/components/radio-group.md · radio-group.yaml(수치 원본) · radio-group.tsx 와 같은 모양 ===
       구조는 SEED Radio(2026-09-30) — 동그라미 .radio(Radiomark) · 동그라미 + 라벨 .radio-row(Radio) · 묶음 .radio-group.
       크기 medium 20(기본) · large 24, 톤 neutral(기본) · brand, 선택 여부는 aria-checked(false · true).
       톤 · 선택 여부는 색을 --radio-* 변수에 담기만 하고, 상태(호버 · 누름 · 비활성)가 그 변수를 골라 칠한다(.checkbox 와 같은 방식).
       가운데 점 .radio-dot 은 선택 안 됨에도 자리에 있고 색만 투명하다 — 채움과 함께 색으로 바뀌고, 커지거나 줄지 않는다.
       오류 모양 · 가로 배치는 없다 — 오류는 묶음 아래 글이다. 다크 짝은 이 블록 끝의 [data-theme="dark"] .radio 에서 바꾼다.
       갤러리의 표는 Checkbox 갤러리의 .cb-panel · .cb-matrix 를 그대로 쓴다. */
    .radio {
      /* 브랜드 역할 색 — 공유 토큰(DESIGN.md)에는 없어 중립으로 떨어진다(.btn · .checkbox 와 같은 대체 사슬) */
      --radio-brand-solid: var(--color-bg-brand-solid, var(--color-primary, var(--color-bg-neutral-inverted)));
      --radio-brand-solid-pressed: var(--color-bg-brand-solid-pressed, var(--color-primary, var(--color-bg-neutral-inverted-pressed)));
      /* 브랜드 채움 위 점 — 브랜드 색이 있으면 static-white, 없으면 중립 채움의 점 색(.btn-brand-solid 와 같은 식) */
      --radio-brand-white: color-mix(in srgb, var(--color-bg-brand-solid, var(--color-primary)) 0%, var(--color-static-white));
      --radio-brand-on-solid: var(--radio-brand-white, var(--color-fg-neutral-inverted));
      --radio-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      /* 톤 — 선택의 색. 기본 neutral(짙은 회색) */
      --radio-solid: var(--color-bg-neutral-inverted);
      --radio-solid-pressed: var(--color-bg-neutral-inverted-pressed);
      --radio-on-solid: var(--color-fg-neutral-inverted);
      /* 동그라미 · 점이 쓰는 값 — 기본은 선택 안 됨(점은 투명) */
      --radio-bg: transparent;
      --radio-bg-pressed: var(--color-bg-layer-default-pressed);
      --radio-border: var(--color-stroke-neutral-solid);
      --radio-dot: transparent;
      --radio-bg-disabled: var(--color-bg-disabled);
      --radio-border-disabled: var(--color-stroke-neutral-weak);
      --radio-dot-disabled: transparent;
      /* 크기 기본 = medium. 누름 배율 = (기준 − 2) ÷ 기준 — 기준은 max(동그라미, 24) 라 두 크기 모두 24(22/24) */
      --press-basis: 24;
      --radio-dot-size: 8px;
      position: relative;
      display: inline-grid;
      place-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      margin: 0;
      padding: 0;
      appearance: none;
      border: 1px solid var(--radio-border);
      border-radius: var(--radius-full);
      background: var(--radio-bg);
      cursor: pointer;
      vertical-align: middle;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        border-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    /* 가운데 점 — 동그라미가 담은 --radio-dot 을 칠한다. 색만 바뀐다 */
    .radio-dot {
      display: block;
      width: var(--radio-dot-size);
      height: var(--radio-dot-size);
      border-radius: var(--radius-full);
      background: var(--radio-dot);
      pointer-events: none;
      transition: background-color var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    /* 크기 — 동그라미와 점(20 · 8 → 24 · 10) */
    .radio.radio--large { width: 24px; height: 24px; --radio-dot-size: 10px; }
    /* 톤 brand — 서비스 핵심 흐름에서만 */
    .radio.radio--brand {
      --radio-solid: var(--radio-brand-solid);
      --radio-solid-pressed: var(--radio-brand-solid-pressed);
      --radio-on-solid: var(--radio-brand-on-solid);
    }
    /* 선택 — 테두리 없이 톤 색으로 채우고 점을 올린다. 비활성이면 점은 fg-disabled */
    .radio[aria-checked="true"] {
      --radio-bg: var(--radio-solid);
      --radio-bg-pressed: var(--radio-solid-pressed);
      --radio-dot: var(--radio-on-solid);
      --radio-dot-disabled: var(--color-fg-disabled);
      border-width: 0;
    }

    /* 상태 — 호버 = 누름 색(v106, hover 되는 기기에서만). 누름 = 누름 색 + 동그라미만 세로 2px 거리 축소(v104), 라벨은 줄지 않는다.
       라벨을 눌러도 동그라미가 반응한다(.radio-row). .radio--hover · --focus · --pressed 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다. */
    @media (hover: hover) {
      .radio:hover,
      .radio-row:hover .radio:not(:disabled) { background: var(--radio-bg-pressed); }
    }
    .radio.radio--hover { background: var(--radio-bg-pressed); }
    .radio:active,
    .radio-row:active .radio:not(:disabled),
    .radio.radio--pressed {
      background: var(--radio-bg-pressed);
      scale: calc(1 - 2 / var(--press-basis));
    }
    /* 포커스 — 키보드 포커스에만 링 2px · 띄움 2px(v106) */
    .radio:focus-visible,
    .radio.radio--focus { outline: 2px solid var(--radio-focus-ring); outline-offset: 2px; }
    /* 비활성 — 전용 색(v106). 불투명도로 흐리게 하지 않고, 호버 · 누름에 반응하지 않는다. 선택이면 채운 원 그대로 색만 바뀐다 */
    .radio:disabled {
      background: var(--radio-bg-disabled);
      border-color: var(--radio-border-disabled);
      cursor: not-allowed;
      /* 누르는 영역은 그대로 둔다 — 포인터 이벤트를 끄면 커서가 보이지 않는다. 누름 축소만 뺀다(호버 · 누름 색은 위 규칙을 이 규칙이 덮는다) */
      scale: 1;
    }
    .radio:disabled .radio-dot { background: var(--radio-dot-disabled); }
    /* 모션 줄이기 — 축소하지 않는다(누름은 색으로만) */
    @media (prefers-reduced-motion: reduce) {
      .radio:active,
      .radio-row:active .radio:not(:disabled),
      .radio.radio--pressed { scale: 1; }
    }

    /* 동그라미 + 라벨 한 줄(Radio) — 라벨까지 눌린다. 줄 높이 32 · 36, 동그라미와 라벨 사이 8 */
    .radio-row {
      position: relative;
      display: inline-flex;
      align-items: center;
      /* 줄은 동그라미 + 라벨만큼만 — 세로 묶음 안에서도 묶음 폭으로 늘지 않는다(radio-group.tsx 의 self-start) */
      align-self: flex-start;
      gap: var(--spacing-x2);
      min-height: 32px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .radio-row--large { min-height: 36px; }
    /* 누르는 영역 44 — 라벨까지 묶은 줄이 44 보다 작으면 가로 · 세로 44 까지 넓힌다(기초 Inclusive) */
    .radio-row::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      min-width: 44px;
      min-height: 44px;
      translate: -50% -50%;
    }
    .radio-row:has(.radio:disabled) { cursor: not-allowed; }
    .radio-label {
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 400;
      color: var(--color-fg-neutral);
    }
    .radio-row--large .radio-label { font-size: var(--text-t5); line-height: var(--text-t5--line-height); }
    .radio-label--bold { font-weight: 700; }
    .radio:disabled + .radio-label { color: var(--color-fg-disabled); }
    /* 묶음(Radio Group) — 세로로 쌓고 줄 사이 12(줄 32 · 36 에 더해 44 · 48 마다 한 줄 — 이웃 줄과 누르는 영역 44 가 겹치지 않는다).
       가로로 늘어놓지 않는다 */
    .radio-group { display: flex; flex-direction: column; gap: var(--spacing-x3); }

    /* 다크 — 역할 색을 라디오 안에서만 다크 짝으로 바꾼다(.btn · .checkbox 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       라벨이 쓰는 값은 줄(.radio-row)에서 바꾼다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝은 비어서 위 대체값(중립)으로 떨어진다. */
    [data-theme="dark"] .radio,
    [data-theme="dark"] .radio-row {
      --color-bg-brand-solid: var(--color-bg-brand-solid-dark);
      --color-bg-brand-solid-pressed: var(--color-bg-brand-solid-pressed-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-stroke-neutral-solid: var(--color-stroke-neutral-solid-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-bg-neutral-inverted-pressed: var(--color-bg-neutral-inverted-pressed-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
    }

    /* === Switch — specs/components/switch.md · switch.yaml(수치 원본) · switch.tsx 와 같은 모양 ===
       구조는 SEED Switch(2026-09-30) — 스위치 .switch(Switchmark — 트랙) · 스위치 + 라벨 .switch-row(Switch). 엄지는 .switch-thumb.
       크기 16 · 24(기본) · 32 — 이름은 트랙 높이다. 톤 neutral(기본) · brand, 켬 · 끔은 aria-checked(false · true).
       톤 · 켬 · 끔은 색을 --switch-* 변수에 담기만 하고, 상태(비활성)가 그 변수를 골라 칠한다(.checkbox · .radio 와 같은 방식).
       엄지는 끄면 0.8 로 작아지고 켜면 오른쪽으로 가며 제 크기가 된다 — 색 말고도 자리 · 크기로 켬 · 끔이 갈린다. 그림자는 없다.
       호버 모양은 없다 — 켜짐 색이 상태를 뜻해서 색이 바뀌지 않는다. 설정 줄(라벨 왼쪽 · 스위치 오른쪽)은 List 가 정한다 — 여기에는 없다.
       다크 짝은 이 블록 끝의 [data-theme="dark"] .switch 에서 바꾼다. 갤러리의 표는 Checkbox 갤러리의 .cb-panel · .cb-matrix 를 그대로 쓴다. */
    .switch {
      /* 브랜드 역할 색 — 공유 토큰(DESIGN.md)에는 없어 중립으로 떨어진다(.btn · .checkbox · .radio 와 같은 대체 사슬) */
      --switch-brand-solid: var(--color-bg-brand-solid, var(--color-primary, var(--color-bg-neutral-inverted)));
      /* 브랜드 톤의 엄지 — 브랜드 색이 있으면 static-white, 없으면 중립 톤의 엄지 색(.btn-brand-solid 와 같은 식) */
      --switch-brand-white: color-mix(in srgb, var(--color-bg-brand-solid, var(--color-primary)) 0%, var(--color-static-white));
      --switch-brand-thumb: var(--switch-brand-white, var(--color-fg-neutral-inverted));
      --switch-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      /* 톤 — 켜진 트랙과 엄지의 색. 기본 neutral(짙은 회색) */
      --switch-solid: var(--color-bg-neutral-inverted);
      --switch-thumb: var(--color-fg-neutral-inverted);
      /* 트랙 · 엄지가 쓰는 값 — 기본은 끔. 막힌 끔은 옅은 트랙 + 안쪽 선(box-shadow 라 트랙 크기는 그대로다) + 회색 엄지 */
      --switch-bg: var(--color-stroke-neutral-solid);
      --switch-bg-disabled: var(--color-bg-disabled);
      --switch-line-disabled: inset 0 0 0 1px var(--color-stroke-neutral-weak);
      --switch-thumb-disabled: var(--color-fg-disabled);
      /* 크기 기본 = 24. 누름 배율 = (기준 − 2) ÷ 기준 — 기준은 max(높이, 폭 ÷ 4, 24) 라 16 · 24 는 24(22/24), 32 는 32(30/32) */
      --press-basis: 24;
      --switch-thumb-size: 20px;
      --switch-thumb-shift: 14px;
      position: relative;
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      margin: 0;
      padding: 2px;
      appearance: none;
      border: 0;
      border-radius: var(--radius-full);
      background: var(--switch-bg);
      cursor: pointer;
      vertical-align: middle;
      transition:
        background-color var(--motion-duration-d1) var(--motion-ease-easing) 20ms,
        scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    /* 엄지 — 스위치가 담은 --switch-thumb 을 칠한다. 끄면 0.8 로 작아져 왼쪽에 있다. 색은 트랙과 같이 50ms · 20ms 뒤에 바뀐다 */
    .switch-thumb {
      display: block;
      width: var(--switch-thumb-size);
      height: var(--switch-thumb-size);
      border-radius: var(--radius-full);
      background: var(--switch-thumb);
      scale: 0.8;
      pointer-events: none;
      transition:
        translate var(--motion-duration-d3) var(--motion-ease-easing),
        scale var(--motion-duration-d3) var(--motion-ease-easing),
        background-color var(--motion-duration-d1) var(--motion-ease-easing) 20ms;
    }
    /* 크기 — 트랙 · 안쪽 여백 · 엄지 · 엄지가 가는 거리(트랙 폭 − 트랙 높이). 16 은 26 × 16 · 2 · 12 · 10, 32 는 52 × 32 · 3 · 26 · 20 */
    .switch.switch--16 { width: 26px; height: 16px; --switch-thumb-size: 12px; --switch-thumb-shift: 10px; }
    .switch.switch--32 { width: 52px; height: 32px; padding: 3px; --press-basis: 32; --switch-thumb-size: 26px; --switch-thumb-shift: 20px; }
    /* 톤 brand — 서비스 핵심 흐름에서만. 엄지는 끔 · 켬 모두 흰색이다 */
    .switch.switch--brand {
      --switch-solid: var(--switch-brand-solid);
      --switch-thumb: var(--switch-brand-thumb);
    }
    /* 켬 — 트랙을 톤 색으로 채우고 엄지가 오른쪽으로 가며 제 크기가 된다.
       켜진 채 막히면 켜진 모양 그대로 회색 채움(fg-disabled) + 밝은 엄지(bg-disabled), 안쪽 선은 없다 */
    .switch[aria-checked="true"] {
      --switch-bg: var(--switch-solid);
      --switch-bg-disabled: var(--color-fg-disabled);
      --switch-line-disabled: none;
      --switch-thumb-disabled: var(--color-bg-disabled);
    }
    .switch[aria-checked="true"] .switch-thumb { scale: 1; translate: var(--switch-thumb-shift); }

    /* 상태 — 호버 모양은 없다(v104). 누름 = 색은 그대로, 스위치만 세로 2px 거리 축소(v104), 라벨은 줄지 않는다.
       라벨을 눌러도 스위치가 반응한다(.switch-row). .switch--focus · --pressed 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다. */
    .switch:active,
    .switch-row:active .switch:not(:disabled),
    .switch.switch--pressed { scale: calc(1 - 2 / var(--press-basis)); }
    /* 포커스 — 키보드 포커스에만 링 2px · 띄움 2px(v106) */
    .switch:focus-visible,
    .switch.switch--focus { outline: 2px solid var(--switch-focus-ring); outline-offset: 2px; }
    /* 비활성 — 전용 색(v106). 불투명도로 흐리게 하지 않고, 누름에 반응하지 않는다. 톤과 상관없이 같은 색이다 */
    .switch:disabled {
      background: var(--switch-bg-disabled);
      box-shadow: var(--switch-line-disabled);
      cursor: not-allowed;
      /* 누르는 영역은 그대로 둔다 — 포인터 이벤트를 끄면 커서가 보이지 않는다. 누름 축소만 뺀다(Switch 는 호버 · 누름에 색이 바뀌지 않는다) */
      scale: 1;
    }
    .switch:disabled .switch-thumb { background: var(--switch-thumb-disabled); }
    /* 모션 줄이기 — 누름 축소를 뺀다. 엄지의 이동과 색 전환은 그대로다(기초 Motion) */
    @media (prefers-reduced-motion: reduce) {
      .switch:active,
      .switch-row:active .switch:not(:disabled),
      .switch.switch--pressed { scale: 1; }
    }

    /* 스위치 + 라벨 한 줄(Switch) — 스위치 왼쪽 · 라벨 오른쪽, 라벨까지 눌린다. 줄 높이 24 · 24 · 32, 스위치와 라벨 사이 6 · 8 · 10 */
    .switch-row {
      position: relative;
      display: inline-flex;
      align-items: center;
      /* 줄은 스위치 + 라벨만큼만 — 세로로 쌓아도 폭으로 늘지 않는다(switch.tsx 의 self-start) */
      align-self: flex-start;
      gap: var(--spacing-x2);
      min-height: 24px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    /* 16 의 줄 높이는 트랙(16)보다 큰 24 다 — 누르는 영역의 바닥 */
    .switch-row--16 { gap: var(--spacing-x1_5); }
    .switch-row--32 { gap: var(--spacing-x2_5); min-height: 32px; }
    /* 누르는 영역 44 — 라벨까지 묶은 줄이 44 보다 작으면 가로 · 세로 44 까지 넓힌다(기초 Inclusive) */
    .switch-row::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      min-width: 44px;
      min-height: 44px;
      translate: -50% -50%;
    }
    .switch-row:has(.switch:disabled) { cursor: not-allowed; }
    .switch-label {
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 500;
      color: var(--color-fg-neutral);
    }
    .switch-row--16 .switch-label { font-size: var(--text-t3); line-height: var(--text-t3--line-height); }
    .switch-row--32 .switch-label { font-size: var(--text-t5); line-height: var(--text-t5--line-height); }
    /* 막힌 줄은 라벨까지 비활성 색이다 */
    .switch:disabled + .switch-label { color: var(--color-fg-disabled); }

    /* 다크 — 역할 색을 스위치 안에서만 다크 짝으로 바꾼다(.btn · .checkbox · .radio 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       라벨이 쓰는 값은 줄(.switch-row)에서 바꾼다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝은 비어서 위 대체값(중립)으로 떨어진다. */
    [data-theme="dark"] .switch,
    [data-theme="dark"] .switch-row {
      --color-bg-brand-solid: var(--color-bg-brand-solid-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-stroke-neutral-solid: var(--color-stroke-neutral-solid-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
    }

    /* Switch 갤러리 — 표의 칸(.cb-matrix-cell)을 세로 축으로 돌려 줄을 칸의 세로 가운데에 둔다.
       가로 축 칸에서는 줄(.switch-row)의 align-self: flex-start 가 줄을 칸 위쪽에 붙여, 줄 높이가 다른 크기(24 · 32)가 한 줄에서 어긋난다. */
    .sw-cell { flex-direction: column; align-items: flex-start; justify-content: center; }

    /* === List — specs/components/list.md · list.yaml · list-header.yaml(수치 원본) · list.tsx 와 같은 모양 ===
       구조는 SEED List(2026-10-01) — 목록 .plst(List · ListRadioGroup · ListCheckGroup) · 한 줄 .plst-row(List Item) · 목록 제목 .plst-header(ListHeader) ·
       줄 사이 선 .plst-divider(ListDivider) · 앞 타일 .plst-tile(ListTile).
       한 줄은 두 층이다 — 바탕 층(.plst-row::before: 호버 · 누름 · 강조 바탕, 줄지 않는다)과 콘텐츠 층(.plst-content: 앞 · 본문 · 뒤, 누르면 이 층만 준다).
       누르는 줄 · 링크 줄은 본문 .plst-action(button · a)의 ::after 가 줄 전체를 덮어 줄 어디를 눌러도 눌리고, 포커스 링도 그 안쪽 2px 에 그린다.
       뒤 붙이개 안의 버튼 · 링크는 z-index 1 로 그 위에 올라 따로 눌린다. 컨트롤 줄은 콘텐츠 층이 <label> 이라 줄 어디를 눌러도 끼운 .switch · .checkbox · .radio 가 눌린다.
       호버 · 누름은 [data-list-action](버튼 · 링크 · 라벨 · 끼운 컨트롤)에서 읽고 [data-disabled] 면 없다(list.tsx 와 같은 짜임). 호버는 마우스 있는 기기에서만이다.
       누름 배율 = (기준 − 2) ÷ 기준, 기준 = max(높이, 폭 ÷ 4, 24) — 줄 폭이 놓인 자리마다 달라 섹션 끝 스크립트가 재서 --press-basis 로 넘긴다.
       그 스크립트는 마우스 · 펜으로 누르면 누른 요소에 포인터를 잡아 둔다 — 콘텐츠 층이 줄어 가장자리에서 놓아도 click 이 그 줄로 간다.
       .plst-row--hover · --focus · --pressed 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다. 다크 짝은 이 블록 끝의 [data-theme="dark"] .plst 에서 바꾼다. */
    .plst {
      /* 브랜드 역할 색 — 공유 토큰(DESIGN.md)에는 없어 중립으로 떨어진다(.btn · .checkbox · .switch 와 같은 대체 사슬) */
      --plst-hl: var(--color-bg-brand-weak, var(--color-bg-neutral-weak));
      --plst-hl-pressed: var(--color-bg-brand-weak-pressed, var(--color-bg-neutral-weak-pressed));
      --plst-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    /* 여럿 고르기 묶음(ListCheckGroup)은 fieldset 이다 — 기본 테두리 · 최소 폭을 지운다(list.tsx 의 m-0 min-w-0 border-0 p-0) */
    fieldset.plst { min-width: 0; border: 0; }
    /* 한 줄 — 바탕 층(::before)을 깔고 콘텐츠 층을 담는다. 바탕은 줄 폭 전체 · 모서리 0 · 투명에서 시작한다 */
    .plst-row {
      position: relative;
      display: flex;
      width: 100%;
    }
    .plst-row::before {
      content: "";
      position: absolute;
      inset-block: 0;
      inset-inline: 0;
      border-radius: 0;
      background: transparent;
      pointer-events: none;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        inset var(--motion-duration-color-transition) var(--motion-ease-easing),
        border-radius var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    /* 강조 — 바탕만 옅은 브랜드 색(점 · 막대는 없다) */
    .plst-row--hl::before { background: var(--plst-hl); }
    /* 호버 = 누름과 같은 바탕(v106, 마우스 있는 기기에서만) — 좌우 6 들어와 모서리 10. 강조 줄은 짙은 강조 바탕.
       모서리는 목록 · 묶음의 --list-item-radius(list.tsx 의 itemRadius — 카드 안의 동심 모서리)가 있으면 그 값이다 */
    @media (hover: hover) {
      .plst-row:has([data-list-action]:not([data-disabled]):hover)::before {
        inset-inline: var(--spacing-x1_5);
        border-radius: var(--list-item-radius, var(--radius-r2_5));
        background: var(--color-bg-layer-default-pressed);
      }
      .plst-row--hl:has([data-list-action]:not([data-disabled]):hover)::before { background: var(--plst-hl-pressed); }
    }
    .plst-row:has([data-list-action]:not([data-disabled]):active)::before,
    .plst-row.plst-row--hover::before,
    .plst-row.plst-row--pressed::before {
      inset-inline: var(--spacing-x1_5);
      border-radius: var(--list-item-radius, var(--radius-r2_5));
      background: var(--color-bg-layer-default-pressed);
    }
    .plst-row--hl:has([data-list-action]:not([data-disabled]):active)::before,
    .plst-row--hl.plst-row--hover::before,
    .plst-row--hl.plst-row--pressed::before { background: var(--plst-hl-pressed); }

    /* 콘텐츠 층 — 앞 · 본문 · 뒤. 위아래 12 · 좌우 24(화면 가장자리 규칙), 맞춤은 가운데(기본) · 위 */
    .plst-content {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      padding: var(--spacing-x3) var(--spacing-global-gutter);
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .plst-content--top { align-items: flex-start; }
    /* 누름 — 콘텐츠 층만 2px 거리 축소(v104 — 기준이 폭 ÷ 4 라 줄은 세로로 1px 남짓). 끼운 컨트롤은 따로 줄지 않는다 — 라벨을 누르면 브라우저가 그 컨트롤도
       :active 로 보고, 키보드(Space)로 누르면 컨트롤만 :active 다(그래서 컨트롤에도 data-list-action 을 단다). 둘 다 축소만 끈다
       (list.tsx 의 active:[scale:1]). 컨트롤의 누름 색은 그대로다 */
    .plst-row:has([data-list-action]:not([data-disabled]):active) > .plst-content,
    .plst-row.plst-row--pressed > .plst-content { scale: calc(1 - 2 / var(--press-basis)); }
    .plst-row :is(.switch, .checkbox, .radio):active { scale: 1; }
    /* 모션 줄이기 — 콘텐츠 축소를 뺀다. 바탕 전환은 그대로다(기초 Motion) */
    @media (prefers-reduced-motion: reduce) {
      .plst-row:has([data-list-action]:not([data-disabled]):active) > .plst-content,
      .plst-row.plst-row--pressed > .plst-content { scale: 1; }
    }
    /* 컨트롤 줄 — 콘텐츠 층이 라벨이라 줄 전체가 누르는 영역이다 */
    .plst-control { cursor: pointer; user-select: none; }
    .plst-control[data-disabled] { cursor: not-allowed; }

    /* 앞 붙이개 — 본문과 12. 아이콘 22 · fg-neutral(설정 · 메뉴 줄) · 타일 40(내용 줄) · 체크 · 라디오 24 */
    .plst-prefix { display: flex; flex-shrink: 0; align-items: center; padding-right: var(--spacing-x3); color: var(--color-fg-neutral); }
    .plst-prefix > svg { width: 22px; height: 22px; }
    /* 앞 타일 — 40 · 모서리 12(크기 × 0.3). 바탕 · 아이콘 색은 카테고리 색(chart-{색}-weak · chart-{색}), 아이콘 20 */
    .plst-tile {
      display: inline-grid;
      flex-shrink: 0;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-r3);
      background: var(--plst-tile-bg);
      color: var(--plst-tile-fg);
    }
    .plst-tile > svg { width: 20px; height: 20px; }
    .plst-tile--orange { --plst-tile-bg: var(--color-chart-orange-weak); --plst-tile-fg: var(--color-chart-orange); }
    .plst-tile--blue { --plst-tile-bg: var(--color-chart-blue-weak); --plst-tile-fg: var(--color-chart-blue); }
    .plst-tile--indigo { --plst-tile-bg: var(--color-chart-indigo-weak); --plst-tile-fg: var(--color-chart-indigo); }
    .plst-tile--violet { --plst-tile-bg: var(--color-chart-violet-weak); --plst-tile-fg: var(--color-chart-violet); }
    .plst-tile--gray { --plst-tile-bg: var(--color-chart-gray-weak); --plst-tile-fg: var(--color-chart-gray); }
    /* 본문 — 제목 + 설명(사이 2), 뒤 붙이개와 10 */
    .plst-body {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-x0_5);
      min-width: 0;
      padding-right: var(--spacing-x2_5);
      text-align: left;
    }
    /* 누르는 줄 · 링크 줄의 본문 — 버튼 · 링크 모양을 지우고(본문의 오른쪽 10 은 남긴다), ::after 가 줄 전체를 덮는다(누르는 영역 · 포커스 링) */
    .plst-action {
      margin: 0;
      padding-block: 0;
      padding-left: 0;
      appearance: none;
      border: 0;
      background: transparent;
      font: inherit;
      color: inherit;
      text-decoration: none;
      outline: none;
      cursor: pointer;
    }
    .plst-action::after { content: ""; position: absolute; inset: 0; }
    /* 포커스 — 키보드 포커스에만 줄 안쪽 링 2px(화면 폭 줄은 바깥 링이 잘린다). 컨트롤 줄은 끼운 컨트롤의 링이 보인다 */
    .plst-action:focus-visible::after,
    .plst-row--focus .plst-action::after { outline: 2px solid var(--plst-focus-ring); outline-offset: -2px; }
    .plst-action[data-disabled] { cursor: not-allowed; }
    /* 제목 t5 · 400 · fg-neutral, 설명 t3 · fg-neutral-subtle(SEED 그대로) */
    .plst-title {
      font-family: var(--font-sans);
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: 400;
      color: var(--color-fg-neutral);
    }
    .plst-detail {
      font-family: var(--font-sans);
      font-size: var(--text-t3);
      line-height: var(--text-t3--line-height);
      font-weight: var(--text-t3--font-weight);
      color: var(--color-fg-neutral-subtle);
    }
    /* 뒤 붙이개 — 값 글자 t5 · fg-neutral-subtle, 화살표 18(같은 색), 사이 4. 안의 버튼 · 링크는 줄의 ::after 위로 올라 따로 눌린다 */
    .plst-suffix {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      gap: var(--spacing-x1);
      font-family: var(--font-sans);
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: var(--text-t5--font-weight);
      color: var(--color-fg-neutral-subtle);
    }
    .plst-suffix > svg { width: 18px; height: 18px; }
    .plst-suffix :is(a, button) { position: relative; z-index: 1; }
    /* 가계부 금액 — List 의 값 글자가 아니라 그 화면이 정한 자리다(list.md Suffix — 16 · 700) */
    .plst-amount { font-weight: 700; color: var(--color-fg-neutral); }
    /* 강조 줄을 올리거나 누르는 동안 — 설명 · 값 글자를 fg-neutral-muted 로 짙게(fg-neutral-subtle 은 짙은 강조 바탕 위 4.32:1). 제목 · 화살표는 그대로다 */
    @media (hover: hover) {
      .plst-row--hl:has([data-list-action]:not([data-disabled]):hover) :is(.plst-detail, .plst-suffix) { color: var(--color-fg-neutral-muted); }
    }
    .plst-row--hl:has([data-list-action]:not([data-disabled]):active) :is(.plst-detail, .plst-suffix),
    .plst-row--hl.plst-row--hover :is(.plst-detail, .plst-suffix),
    .plst-row--hl.plst-row--pressed :is(.plst-detail, .plst-suffix) { color: var(--color-fg-neutral-muted); }
    .plst-row--hl .plst-suffix > svg { color: var(--color-fg-neutral-subtle); }
    /* 비활성 — 전용 색(v106)이고 불투명도로 흐리게 하지 않는다. 호버 · 누름은 위 규칙의 :not([data-disabled]) 가 뺀다 */
    .plst-row:has([data-list-action][data-disabled]) :is(.plst-prefix, .plst-title, .plst-detail, .plst-suffix, .plst-suffix > svg) { color: var(--color-fg-disabled); }
    .plst-row:has([data-list-action][data-disabled]) .plst-tile { background: var(--color-bg-disabled); color: var(--color-fg-disabled); }

    /* 줄 사이 선 — 필요할 때만(기본은 선 없음). 1px stroke-neutral-subtle, 줄 폭 전체 · 들이면 좌우 24 */
    .plst-divider { flex-shrink: 0; width: 100%; height: 1px; background: var(--color-stroke-neutral-subtle); }
    .plst-divider--inset { width: auto; margin-inline: var(--spacing-global-gutter); }
    /* 목록 제목 — 목록 밖 바로 위. 위아래 8 · 좌우 24, t4. mediumWeak(기본) 500 · fg-neutral-subtle, boldSolid 700 · fg-neutral. 오른쪽 작은 버튼과 10 */
    .plst-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-x2_5);
      width: 100%;
      padding: var(--spacing-x2) var(--spacing-global-gutter);
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 500;
      color: var(--color-fg-neutral-subtle);
    }
    .plst-header--bold-solid { font-weight: 700; color: var(--color-fg-neutral); }

    /* 다크 — 역할 색을 목록 · 목록 제목 안에서만 다크 짝으로 바꾼다(.btn · .checkbox · .switch 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       끼운 .switch · .checkbox · .radio · .btn 은 저마다의 다크 블록이 다시 바꾼다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝은 비어서 위 대체값(중립)으로 떨어진다. */
    [data-theme="dark"] .plst,
    [data-theme="dark"] .plst-header {
      --color-bg-brand-weak: var(--color-bg-brand-weak-dark);
      --color-bg-brand-weak-pressed: var(--color-bg-brand-weak-pressed-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-bg-neutral-weak-pressed: var(--color-bg-neutral-weak-pressed-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-muted: var(--color-fg-neutral-muted-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --color-stroke-neutral-subtle: var(--color-stroke-neutral-subtle-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
      --color-chart-orange: var(--color-chart-orange-dark);
      --color-chart-orange-weak: var(--color-chart-orange-weak-dark);
      --color-chart-blue: var(--color-chart-blue-dark);
      --color-chart-blue-weak: var(--color-chart-blue-weak-dark);
      --color-chart-indigo: var(--color-chart-indigo-dark);
      --color-chart-indigo-weak: var(--color-chart-indigo-weak-dark);
      --color-chart-violet: var(--color-chart-violet-dark);
      --color-chart-violet-weak: var(--color-chart-violet-weak-dark);
      --color-chart-gray: var(--color-chart-gray-dark);
      --color-chart-gray-weak: var(--color-chart-gray-weak-dark);
    }

    /* List 갤러리 — 줄은 흰 바탕(bg-layer-default)의 틀(.plst-frame) 안에 둔다. 틀의 테두리는 줄의 끝을 보이려고 그린 갤러리 것이다.
       틀 모서리 16 은 누름 바탕(좌우 6 들어온 모서리 10)과 동심이다(list.md "카드 안의 목록" — 16 − 6). 강조 바탕이 모서리 밖으로 나오지 않게 자른다. */
    .plst-frames { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: var(--spacing-lg); align-items: start; }
    .plst-cap { margin-bottom: var(--spacing-xs); font-size: var(--text-caption); font-weight: 600; line-height: 1.4; color: var(--color-text-secondary); }
    .plst-cap span { display: block; font-family: ui-monospace, monospace; font-size: 11px; font-weight: 400; color: var(--color-text-tertiary); }
    .plst-frame { overflow: hidden; border: 1px solid var(--color-border-default); border-radius: var(--radius-r4); background: var(--color-surface-default); }
    /* 상태 표 — 칸마다 줄 하나를 실제 폭(280 이상)으로 그린다. 칸이 그보다 좁아지면 판(.cb-panel)이 가로로 밀린다 */
    .plst-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(280px, 1fr)); }
    .plst-cell { align-items: stretch; }
    .plst-cell > .plst-frame { flex: 1; min-width: 0; }
    @media (max-width: 900px) {
      .plst-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(280px, 1fr)); }
    }

    /* === Select Box — specs/components/select-box.md · select-box.yaml(수치 원본) · select-box.tsx 와 같은 모양 ===
       구조는 SEED Select Box(2026-10-01) — 묶음 .psb-group(RadioSelectBoxGroup · CheckSelectBoxGroup) · 상자 .psb(RadioSelectBox · CheckSelectBox).
       상자는 테두리 · 바탕만 맡고, 그 안의 누르는 자리 .psb-trigger(label)가 콘텐츠 .psb-content(앞 .psb-prefix · 본문 .psb-body > 제목 .psb-label · 설명 .psb-desc)와
       오른쪽 컨트롤을 담는다 — 펼침 .psb-footer 를 뺀 상자 전체가 누르는 영역이고, 누르는 자리는 상자가 늘면 남는 자리까지 채운다(grow).
       컨트롤은 Radio 갤러리의 .radio(medium · neutral) · Checkbox 갤러리의 .checkbox--ghost(medium) 그대로이고, '없음' 이면 화면 밖 라디오 · 체크(.psb-sr-only)다.
       테두리 1px 은 안쪽 그림자로 그리고, 고른 테두리 2px 은 ::after 로 그 안쪽에 덧그린다 — 1 → 2px 로 바뀌어도 내용이 밀리지 않는다. 바탕은 고름과 상관없다(브랜드 톤 없음).
       고름은 컨트롤의 aria-checked 에서 읽는다(레시피는 Radix 의 data-state). 호버 · 누름은 [data-select-box-action](누르는 자리 · 컨트롤)에서 읽고 [data-disabled] 면 없다.
       호버는 마우스 있는 기기에서만이다. 누름 배율 = (기준 − 2) ÷ 기준, 기준 = max(누르는 자리의 높이, 폭 ÷ 4, 24) — 섹션 끝 스크립트가 누르는 순간 재서 --press-basis 로 넘긴다.
       .psb--hover · --focus · --pressed 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다. 다크 짝은 이 블록 끝의 [data-theme="dark"] .psb-group 에서 바꾼다. */
    .psb-group {
      /* 포커스 링 — 공유 토큰(DESIGN.md)에는 브랜드 역할 색이 없어 중립으로 떨어진다(.plst 와 같은 대체 사슬) */
      --psb-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      column-gap: var(--spacing-x3);
      row-gap: var(--spacing-component-default);
      width: 100%;
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
    }
    /* 2 ~ 3열 — 상자 높이를 가장 긴 상자에 맞춘다(select-box.tsx 의 auto-rows-fr) */
    .psb-group--cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr); }
    .psb-group--cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr); }
    /* 상자 — 모서리 12, 바탕 투명, 테두리 1px stroke-neutral-weak(안쪽). 바탕만 전환한다 */
    .psb {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: var(--radius-r3);
      background: transparent;
      box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-weak);
      transition: background-color var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    /* 고른 테두리 — 안쪽 2px. 고르면 stroke-neutral-contrast, 고른 채 막히면 stroke-neutral-weak. 색만 d2 로 전환한다 */
    .psb::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 2px solid transparent;
      border-radius: inherit;
      pointer-events: none;
      transition: border-color var(--motion-duration-d2) var(--motion-ease-easing);
    }
    .psb:has([data-select-box-control][aria-checked="true"]:not([data-disabled]))::after { border-color: var(--color-stroke-neutral-contrast); }
    .psb:has([data-select-box-control][aria-checked="true"][data-disabled])::after { border-color: var(--color-stroke-neutral-weak); }
    /* 호버 = 누름과 같은 바탕(v106, 마우스 있는 기기에서만). 펼침에 올리거나 눌러도 바뀌지 않는다 — 누르는 자리가 아니다 */
    @media (hover: hover) {
      .psb:has([data-select-box-action]:not([data-disabled]):hover) { background: var(--color-bg-layer-default-pressed); }
    }
    .psb:has([data-select-box-action]:not([data-disabled]):active),
    .psb.psb--hover,
    .psb.psb--pressed { background: var(--color-bg-layer-default-pressed); }
    /* 포커스 — 키보드 포커스에만 상자 바깥 링 2px · 띄움 2px(상자는 화면 폭이 아니라 링이 잘리지 않는다) */
    .psb:has([data-select-box-control]:focus-visible),
    .psb.psb--focus { outline: 2px solid var(--psb-focus-ring); outline-offset: 2px; }

    /* 누르는 자리(label) — 콘텐츠와 컨트롤 사이 6. 가로형(1열)은 위아래 16 · 왼쪽 20 · 오른쪽 16, 세로 가운데 */
    .psb-trigger {
      position: relative;
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-x1_5);
      width: 100%;
      padding: var(--spacing-x4) var(--spacing-x4) var(--spacing-x4) var(--spacing-x5);
      cursor: pointer;
      user-select: none;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    /* 세로형(2 ~ 3열) — 위아래 20 · 좌우 16, 컨트롤은 위 오른쪽 */
    .psb--vertical > .psb-trigger { align-items: flex-start; padding: var(--spacing-x5) var(--spacing-x4); }
    .psb-trigger[data-disabled] { cursor: not-allowed; }
    /* 누름 — 누르는 자리(콘텐츠 + 컨트롤)만 2px 거리 축소(v104). 테두리 · 바탕 · 펼침은 줄지 않는다 */
    .psb:has([data-select-box-action]:not([data-disabled]):active) > .psb-trigger,
    .psb.psb--pressed > .psb-trigger { scale: calc(1 - 2 / var(--press-basis)); }
    /* 모션 줄이기 — 줄지 않는다. 바탕 전환은 그대로다(기초 Motion) */
    @media (prefers-reduced-motion: reduce) {
      .psb:has([data-select-box-action]:not([data-disabled]):active) > .psb-trigger,
      .psb.psb--pressed > .psb-trigger { scale: 1; }
    }

    /* 콘텐츠 — 가로형은 앞 · 본문이 한 줄(사이 12), 세로형은 앞이 위(사이 10) */
    .psb-content { display: flex; flex: 1; flex-direction: row; align-items: center; gap: var(--spacing-x3); min-width: 0; }
    .psb--vertical .psb-content { flex-direction: column; align-items: normal; gap: var(--spacing-x2_5); }
    /* 앞 — 아이콘 22 · fg-neutral */
    .psb-prefix { display: flex; flex-shrink: 0; color: var(--color-fg-neutral); }
    .psb-prefix > svg { width: 22px; height: 22px; }
    /* 본문 — 제목 + 설명(사이 2), 컨트롤과 4 더 떨어진다 */
    .psb-body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-x0_5);
      min-width: 0;
      margin-right: auto;
      padding-right: var(--spacing-x1);
      text-align: left;
    }
    /* 제목 t5 · 500 · fg-neutral(옆 배지와 4), 설명 t3 · fg-neutral-muted */
    .psb-label {
      display: flex;
      align-items: center;
      gap: var(--spacing-x1);
      font-family: var(--font-sans);
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: 500;
      color: var(--color-fg-neutral);
    }
    .psb-desc {
      font-family: var(--font-sans);
      font-size: var(--text-t3);
      line-height: var(--text-t3--line-height);
      font-weight: var(--text-t3--font-weight);
      color: var(--color-fg-neutral-muted);
    }
    /* 비활성 — 앞 · 제목 · 설명이 fg-disabled. 불투명도로 흐리게 하지 않고, 호버 · 누름은 위 규칙의 :not([data-disabled]) 가 뺀다 */
    .psb-trigger[data-disabled] :is(.psb-prefix, .psb-label, .psb-desc) { color: var(--color-fg-disabled); }

    /* 컨트롤 — 상자 안에서는 따로 줄지 않고(누르는 자리가 함께 준다) 제 포커스 링도 그리지 않는다(링은 상자가 — select-box.tsx 의 MARK_IN_BOX).
       누르는 자리에 올리거나 누르면 브라우저가 라벨이 가리키는 컨트롤도 :hover · :active 로 본다 — 라디오는 제 누름 색이 되고(Radio 의 규칙 그대로),
       체크(Ghost)는 상자가 바탕을 맡아 제 바탕을 끈다(GHOST_NO_BG). 그 순간을 멈춘 칸도 같게 그린다 */
    .psb :is(.radio, .checkbox):active { scale: 1; }
    .psb :is(.radio, .checkbox):focus-visible { outline-style: none; }
    .psb .checkbox--ghost:is(:hover, :active) { background: transparent; }
    .psb.psb--hover .radio:not(:disabled),
    .psb.psb--pressed .radio:not(:disabled) { background: var(--radio-bg-pressed); }
    /* 컨트롤 '없음' — 화면 밖에 두고 키보드 · 화면 읽기 프로그램이 그대로 쓴다(Tailwind sr-only) */
    .psb-sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border-width: 0;
    }

    /* 펼침 — 고른 상자 아래로 열린다(안쪽 좌우 20 · 아래 16). 높이는 grid-template-rows 0fr → 1fr 로 바꾼다.
       열 때 높이 400ms · 투명도 d6, 닫을 때 높이 d6 · 투명도 400ms(내용이 높이보다 먼저 사라지지 않게). 닫히면 보이지 않는다 — Tab 도 닿지 않는다 */
    .psb-footer {
      display: grid;
      grid-template-rows: 0fr;
      visibility: hidden;
      opacity: 0;
      transition:
        grid-template-rows var(--motion-duration-d6) var(--motion-ease-easing),
        opacity 400ms var(--motion-ease-easing),
        visibility 0s linear 400ms;
    }
    .psb:has([data-select-box-control][aria-checked="true"]) > .psb-footer {
      grid-template-rows: 1fr;
      visibility: visible;
      opacity: 1;
      transition:
        grid-template-rows 400ms var(--motion-ease-easing),
        opacity var(--motion-duration-d6) var(--motion-ease-easing),
        visibility 0s;
    }
    .psb-footer-clip { min-height: 0; overflow: hidden; }
    .psb-footer-inner { padding: 0 var(--spacing-x5) var(--spacing-x4); }
    /* 모션 줄이기 — 높이는 바로 바뀌고 투명도만 150ms(기초 Motion) */
    @media (prefers-reduced-motion: reduce) {
      .psb-footer { transition: opacity 150ms linear, visibility 0s linear 150ms; }
      .psb:has([data-select-box-control][aria-checked="true"]) > .psb-footer { transition: opacity 150ms linear, visibility 0s; }
    }

    /* 다크 — 역할 색을 묶음 안에서만 다크 짝으로 바꾼다(.plst · .radio · .checkbox 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       끼운 .radio · .checkbox 는 저마다의 다크 블록이 다시 바꾼다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝은 비어서 위 대체값(중립)으로 떨어진다. */
    [data-theme="dark"] .psb-group {
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-stroke-neutral-contrast: var(--color-stroke-neutral-contrast-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-muted: var(--color-fg-neutral-muted-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
    }

    /* Select Box 갤러리 — 상자는 흰 표면(.vignette-card) 위에 그대로 둔다(상자 바탕이 투명이다). 견본마다 머리 글(.psb-cap) · 칸 이름(.cb-group-legend) · 묶음.
       견본은 휴대폰 화면 폭(320 이상 — List 의 틀과 같다)이다 — 2 ~ 3열 상자가 실제 폭으로 그려져 글이 줄바꿈되고 높이 맞춤이 보인다 */
    .psb-samples { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: var(--spacing-xl) var(--spacing-lg); align-items: start; }
    .psb-cap { margin-bottom: var(--spacing-sm); font-size: var(--text-caption); font-weight: 600; line-height: 1.4; color: var(--color-text-secondary); }
    .psb-cap span { display: block; font-family: ui-monospace, monospace; font-size: 11px; font-weight: 400; color: var(--color-text-tertiary); }
    /* 펼침의 반복 횟수 칸 — 입력칸은 아래 Text Field 블록의 .ptf-input(상자형 medium 40) · 폭 80, 앞뒤 글자는 t4 */
    .psb-count { display: flex; align-items: center; gap: var(--spacing-x2); font-family: var(--font-sans); font-size: var(--text-t4); line-height: var(--text-t4--line-height); color: var(--color-fg-neutral); }
    .psb-count .ptf-input { flex: none; width: 80px; }
    /* 상태 표 — 칸마다 상자 하나를 실제 폭(200 이상)으로 그리고, 한 줄의 상자는 같은 높이로 늘인다. 칸이 그보다 좁아지면 판(.cb-panel)이 가로로 밀린다 */
    .psb-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(200px, 1fr)); }
    .psb-cell { align-self: stretch; align-items: stretch; }
    .psb-cell > .psb-group { flex: 1; min-width: 0; }
    @media (max-width: 900px) {
      .psb-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(200px, 1fr)); }
    }

    /* === Text Field — specs/components/field.md · input.md · textarea.md(수치는 *.yaml) · field.tsx · input.tsx · textarea.tsx 와 같은 모양 ===
       구조는 SEED Field · Text Input · Textarea(2026-10-01). Field .ptf-field 는 머리 .ptf-field-header(라벨 .ptf-label · 필수 점 .ptf-required 또는 "선택" .ptf-optional · 보조 액션 .ptf-field-action),
       입력, 꼬리 .ptf-field-footer(설명 .ptf-desc 또는 오류 .ptf-error · 글자 수 .ptf-count)를 8 간격으로 쌓는다. 라벨은 오류여도 그대로다 — 오류는 칸의 테두리와 꼬리의 글이 알린다.
       입력칸 .ptf-input 은 상자(div)가 테두리 · 바탕 · 모서리와 앞 · 뒤 붙이개(.ptf-icon · .ptf-affix) · 지우기(.ptf-clear)를 담고, 입력 .ptf-input-value(input)가 상자 높이를 채운다 —
       맨 앞 · 맨 뒤 요소가 상자의 좌우 여백을 가진다(입력이면 안쪽 여백이라 그 자리를 눌러도 쓴다, 붙이개 · 지우기면 바깥 여백). 여러 줄 .ptf-textarea 는 같은 상자이고 입력 .ptf-textarea-value(textarea)가 여백 · 높이를 가진다.
       테두리 1px 은 안쪽 그림자로 그리고, 포커스 · 오류의 2px 는 ::after 로 그 안쪽에 덧그린다 — 굵어져도 내용이 밀리지 않고 색만 d2(100ms)로 바뀐다(SEED).
       포커스는 :focus 다(마우스 · 터치로 눌러도 — 버튼의 키보드 링과 다르다). 읽기 전용이면 포커스 테두리가 없고, 오류는 포커스해도 빨갛다. 비활성 · 읽기 전용은 bg-disabled 바탕이고 흐리게 하지 않는다(v106).
       상태는 레시피처럼 상자의 [data-invalid] · [data-disabled] · [data-readonly] 에서 읽는다. .ptf-input--focus · .ptf-textarea--focus 는 갤러리에서 포커스를 고정해 보여 주는 클래스다.
       반응형(웹 기본)은 1280(--breakpoint-lg — 미디어 쿼리는 변수를 못 써 수를 적었다) 미만 large · 이상 medium 이다. 브랜드 색은 쓰지 않는다. 다크 짝은 이 블록 끝의 [data-theme="dark"] 에서 바꾼다. */
    .ptf-field {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-x2);
      width: 100%;
      min-width: 0;
      font-family: var(--font-sans);
    }
    /* 머리 — 라벨 + 필수 · 선택 표시(왼쪽) · 보조 액션(오른쪽, 사이 10). 좌우 2 들어와 칸의 모서리와 글자 줄이 맞는다 */
    .ptf-field-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-x2_5);
      padding: 0 var(--spacing-x0_5);
    }
    /* 라벨 — t5 16/22 · 500 · fg-neutral(bold 700 — 칸 하나를 크게 받는 단계 화면). 한 폼 안에서 굵기를 섞지 않는다 */
    .ptf-label {
      min-width: 0;
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: 500;
      color: var(--color-fg-neutral);
    }
    .ptf-label--bold { font-weight: 700; }
    /* 필수 점 — 6 · fg-critical, 라벨 첫 줄 위쪽(위 4 · 왼쪽 2). rem 이라 글자 크기 설정을 따라 커진다. 화면 읽기 프로그램에는 숨기고 필수는 칸의 aria-required 가 알린다 */
    .ptf-required {
      display: inline-block;
      width: 0.375rem;
      height: 0.375rem;
      margin-top: 0.25rem;
      margin-left: 0.125rem;
      border-radius: var(--radius-full);
      background: var(--color-fg-critical);
      vertical-align: top;
    }
    /* "선택" — t4 14 · 400 · fg-neutral-subtle, 줄 높이는 라벨과 같은 22 · 왼쪽 4 */
    .ptf-optional {
      padding-left: 0.25rem;
      font-size: var(--text-t4);
      line-height: var(--text-t5--line-height);
      font-weight: 400;
      color: var(--color-fg-neutral-subtle);
      vertical-align: bottom;
    }
    /* 보조 액션 — Button ghost · neutralSubtle · xsmall(32) · 오른쪽 flush. 머리 높이 22 를 바꾸지 않게 위아래로 5 넘친다(누르는 영역은 버튼 그대로 44) */
    .ptf-field-action { display: flex; flex-shrink: 0; align-items: center; margin: -5px 0 -5px auto; }
    /* 꼬리 — 설명 또는 오류(왼쪽) · 글자 수(오른쪽). 사이 8 · 좌우 2, 위로 맞춘다 */
    .ptf-field-footer {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-x2);
      padding: 0 var(--spacing-x0_5);
    }
    .ptf-desc, .ptf-error, .ptf-count {
      margin: 0;
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 400;
    }
    /* 설명 — t4 14/19 · fg-neutral-subtle. 오류 — 설명 자리를 대신한다(둘을 함께 보이지 않는다) · fg-critical */
    .ptf-desc, .ptf-error { display: flex; min-width: 0; }
    .ptf-desc { color: var(--color-fg-neutral-subtle); }
    .ptf-desc[hidden] { display: none; }
    .ptf-error { color: var(--color-fg-critical); }
    /* 설명 · 오류 앞 아이콘 16(오류는 늘 circle-alert — 색만으로 알리지 않는다) — 첫 줄 가운데(위 1.5) · 글과 6 */
    .ptf-desc > svg, .ptf-error > svg {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-top: calc((var(--text-t4--line-height) - 1rem) / 2);
      margin-right: var(--spacing-x1_5);
    }
    /* 글자 수 — "쓴 수/최대", 숫자 폭 고정. 쓴 수 fg-neutral(비면 fg-neutral-subtle) · 최대 fg-neutral-subtle, 오류면 둘 다 fg-critical */
    .ptf-count { flex-shrink: 0; margin-left: auto; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .ptf-count-value { color: var(--color-fg-neutral); }
    .ptf-count--empty .ptf-count-value, .ptf-count-max { color: var(--color-fg-neutral-subtle); }
    .ptf-field[data-invalid] :is(.ptf-count-value, .ptf-count-max) { color: var(--color-fg-critical); }
    /* 오류 알림 자리 — 화면 밖 polite(field.tsx 의 sr-only) */
    .ptf-sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border-width: 0;
    }

    /* 입력칸(Text Input) 상자 — 투명 바탕 · 안쪽 1px stroke-neutral-weak, 어디를 눌러도 입력으로(페이지 끝 스크립트).
       크기 기본 = 상자형 large: 높이 52 · 모서리 12(r3) · 좌우 16 · 사이 10 · 글자 t5 16/22 · 아이콘 20 · 지우기 22 */
    .ptf-input {
      --ptf-px: var(--spacing-x4);
      --ptf-icon: 20px;
      --ptf-clear: 22px;
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--spacing-x2_5);
      width: 100%;
      min-width: 0;
      min-height: 52px;
      overflow: hidden;
      border-radius: var(--radius-r3);
      background: transparent;
      box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-weak);
      font-family: var(--font-sans);
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: 400;
      color: var(--color-fg-neutral);
      cursor: text;
    }
    /* 포커스 · 오류 2px — 상자 안쪽에 덧그린다. 늘 2px 투명이고 색만 d2 로 나타난다(두께는 바로 바뀐다 — SEED) */
    .ptf-input::after,
    .ptf-textarea::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 2px solid transparent;
      border-radius: inherit;
      pointer-events: none;
      transition: border-color var(--motion-duration-d2) var(--motion-ease-easing);
    }
    .ptf-input:has(.ptf-input-value:focus):not([data-invalid], [data-readonly])::after,
    .ptf-input.ptf-input--focus:not([data-invalid], [data-readonly])::after,
    .ptf-textarea:has(.ptf-textarea-value:focus):not([data-invalid], [data-readonly])::after,
    .ptf-textarea.ptf-textarea--focus:not([data-invalid], [data-readonly])::after { border-color: var(--color-stroke-neutral-contrast); }
    .ptf-input[data-invalid]::after,
    .ptf-textarea[data-invalid]::after { border-color: var(--color-stroke-critical-solid); }
    /* 비활성 · 읽기 전용(상자) — bg-disabled 바탕, 흐리게 하지 않는다. 비활성은 값 · placeholder · 붙이개 · 아이콘이 fg-disabled, 읽기 전용은 값이 진한 그대로 */
    .ptf-input:not(.ptf-input--underline):is([data-disabled], [data-readonly]),
    .ptf-textarea:is([data-disabled], [data-readonly]) { background: var(--color-bg-disabled); }
    .ptf-input[data-disabled],
    .ptf-textarea[data-disabled] { cursor: not-allowed; }
    .ptf-input[data-disabled] :is(.ptf-input-value, .ptf-affix, .ptf-icon),
    .ptf-textarea[data-disabled] .ptf-textarea-value { color: var(--color-fg-disabled); }
    .ptf-input[data-disabled] .ptf-input-value::placeholder,
    .ptf-textarea[data-disabled] .ptf-textarea-value::placeholder { color: var(--color-fg-disabled); }
    /* 입력 — 상자 높이를 채운다(글자는 세로 가운데). 값 fg-neutral · 400, placeholder fg-placeholder */
    .ptf-input-value {
      flex: 1;
      align-self: stretch;
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: 0;
      background: transparent;
      outline: none;
      font: inherit;
      color: var(--color-fg-neutral);
    }
    .ptf-input-value::placeholder,
    .ptf-textarea-value::placeholder { color: var(--color-fg-placeholder); opacity: 1; }
    .ptf-input-value:disabled,
    .ptf-textarea-value:disabled { cursor: not-allowed; opacity: 1; }
    /* 브라우저 자동 완성의 바탕색을 지운다 — 글자색은 칸 그대로(input.tsx) */
    .ptf-input-value:-webkit-autofill { -webkit-text-fill-color: var(--color-fg-neutral); background-clip: text; transition: background-color 9999s 9999s; }
    /* 맨 앞 · 맨 뒤 요소가 상자의 좌우 여백을 가진다 — 입력이면 안쪽 여백(그 자리를 눌러도 쓴다), 붙이개 · 지우기면 바깥 여백 */
    .ptf-input > :first-child { margin-left: var(--ptf-px); }
    .ptf-input > :last-child { margin-right: var(--ptf-px); }
    .ptf-input > .ptf-input-value:first-child { margin-left: 0; padding-left: var(--ptf-px); }
    .ptf-input > .ptf-input-value:last-child { margin-right: 0; padding-right: var(--ptf-px); }
    /* 붙이개 — 글자는 칸 글자와 같은 크기의 fg-neutral-subtle · 400, 아이콘은 fg-neutral-muted(크기는 모양 · 크기마다) */
    .ptf-affix { flex-shrink: 0; color: var(--color-fg-neutral-subtle); white-space: nowrap; }
    .ptf-icon { display: flex; flex-shrink: 0; color: var(--color-fg-neutral-muted); }
    .ptf-icon > svg { width: var(--ptf-icon); height: var(--ptf-icon); }
    /* 지우기 — lucide circle-x · fg-neutral-subtle · 둥근 버튼(크기는 모양 · 크기마다). 값이 있고 막히지 않았을 때만 있고 Tab 순서 밖이다 */
    .ptf-clear {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 0;
      border-radius: var(--radius-full);
      background: transparent;
      color: var(--color-fg-neutral-subtle);
      cursor: pointer;
    }
    .ptf-clear > svg { width: var(--ptf-clear); height: var(--ptf-clear); }
    /* 상자형 medium — 높이 40 · 모서리 8(r2) · 좌우 14 · 사이 8 · 글자 t4 14/19 · 아이콘 16 · 지우기 18. 1280 이상 데스크톱 웹(마우스)에서만 */
    .ptf-input--medium {
      --ptf-px: var(--spacing-x3_5);
      --ptf-icon: 16px;
      --ptf-clear: 18px;
      gap: var(--spacing-x2);
      min-height: 40px;
      border-radius: var(--radius-r2);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
    }
    /* 밑줄형 — 아래 1px 만(포커스 · 오류 2px), 모서리 · 좌우 여백 없음. large: 높이 40 · 위아래 8 · 사이 10 · 글자 t6 18/24 · 아이콘 24 · 지우기 22.
       바탕이 없어 비활성 · 읽기 전용에도 바탕을 깔지 않는다 — 읽기 전용은 값 · placeholder 를 fg-neutral-muted 로 가른다 */
    .ptf-input--underline {
      --ptf-px: 0px;
      --ptf-icon: 24px;
      --ptf-clear: 22px;
      gap: var(--spacing-x2_5);
      min-height: 40px;
      padding: var(--spacing-x2) 0;
      border-radius: 0;
      box-shadow: inset 0 -1px 0 0 var(--color-stroke-neutral-weak);
      font-size: var(--text-t6);
      line-height: var(--text-t6--line-height);
    }
    .ptf-input--underline::after { border-width: 0 0 2px; }
    .ptf-input--underline[data-readonly] .ptf-input-value { color: var(--color-fg-neutral-muted); }
    .ptf-input--underline[data-readonly] .ptf-input-value::placeholder { color: var(--color-fg-neutral-muted); }
    /* 밑줄형 medium — 높이 34 · 위아래 6 · 사이 8 · 글자 t5 16/22 · 아이콘 20 · 지우기 18 */
    .ptf-input--underline.ptf-input--medium {
      --ptf-px: 0px;
      --ptf-icon: 20px;
      --ptf-clear: 18px;
      gap: var(--spacing-x2);
      min-height: 34px;
      padding: var(--spacing-x1_5) 0;
      border-radius: 0;
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
    }

    /* 여러 줄 입력칸(Textarea) — 상자 · 테두리 · 상태는 입력칸 상자형과 같다(위의 ::after · 비활성 · 읽기 전용 규칙을 함께 쓴다). 여백 · 높이는 입력이 가진다.
       large: 모서리 12 · 위아래 14 · 좌우 16 · 글자 t5 16/22, 자동 높이 3줄 94(고정 높이 2줄 72). 손잡이는 두지 않는다 — 자동 높이가 대신한다 */
    .ptf-textarea {
      position: relative;
      display: flex;
      width: 100%;
      min-width: 0;
      overflow: hidden;
      border-radius: var(--radius-r3);
      background: transparent;
      box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-weak);
      font-family: var(--font-sans);
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: 400;
      cursor: text;
    }
    .ptf-textarea-value {
      display: block;
      width: 100%;
      min-height: 94px;
      margin: 0;
      padding: var(--spacing-x3_5) var(--spacing-x4);
      border: 0;
      border-radius: 0;
      background: transparent;
      outline: none;
      resize: none;
      overflow-y: hidden;
      font: inherit;
      color: var(--color-fg-neutral);
    }
    /* 고정 높이 — 자리마다 정한 높이(2줄 72 이상), 넘치는 글은 칸 안에서 스크롤 */
    .ptf-textarea--fixed .ptf-textarea-value { min-height: 72px; overflow-y: auto; }
    /* medium — 모서리 8 · 위아래 12 · 좌우 14 · 글자 t4 14/19, 자동 높이 3줄 82(고정 높이 2줄 62). 1280 이상 데스크톱 웹에서만 */
    .ptf-textarea--medium { border-radius: var(--radius-r2); font-size: var(--text-t4); line-height: var(--text-t4--line-height); }
    .ptf-textarea--medium .ptf-textarea-value { min-height: 82px; padding: var(--spacing-x3) var(--spacing-x3_5); }
    .ptf-textarea--medium.ptf-textarea--fixed .ptf-textarea-value { min-height: 62px; }

    /* 반응형(웹 기본) — 1280 이상은 medium 의 값을 쓴다. 앱은 늘 large 다 */
    @media (min-width: 1280px) {
      .ptf-input--responsive {
        --ptf-px: var(--spacing-x3_5);
        --ptf-icon: 16px;
        --ptf-clear: 18px;
        gap: var(--spacing-x2);
        min-height: 40px;
        border-radius: var(--radius-r2);
        font-size: var(--text-t4);
        line-height: var(--text-t4--line-height);
      }
      .ptf-input--underline.ptf-input--responsive {
        --ptf-px: 0px;
        --ptf-icon: 20px;
        --ptf-clear: 18px;
        gap: var(--spacing-x2);
        min-height: 34px;
        padding: var(--spacing-x1_5) 0;
        border-radius: 0;
        font-size: var(--text-t5);
        line-height: var(--text-t5--line-height);
      }
      .ptf-textarea--responsive { border-radius: var(--radius-r2); font-size: var(--text-t4); line-height: var(--text-t4--line-height); }
      .ptf-textarea--responsive .ptf-textarea-value { min-height: 82px; padding: var(--spacing-x3) var(--spacing-x3_5); }
      .ptf-textarea--responsive.ptf-textarea--fixed .ptf-textarea-value { min-height: 62px; }
    }

    /* 다크 — 역할 색을 Field · 칸 · 화면 틀 안에서만 다크 짝으로 바꾼다(.psb-group · .checkbox 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       끼운 버튼(.btn)과 고르는 칸(Select 트리거 .psel-trigger · Input Button .pib)은 저마다의 다크 규칙이 바꾼다 */
    [data-theme="dark"] .ptf-field,
    [data-theme="dark"] .ptf-input,
    [data-theme="dark"] .ptf-textarea,
    [data-theme="dark"] .ptf-screen {
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-stroke-neutral-contrast: var(--color-stroke-neutral-contrast-dark);
      --color-stroke-critical-solid: var(--color-stroke-critical-solid-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
      --color-fg-placeholder: var(--color-fg-placeholder-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-muted: var(--color-fg-neutral-muted-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --color-fg-critical: var(--color-fg-critical-dark);
    }

    /* Text Field 갤러리 — 칸은 흰 표면(.vignette-card) 위에 둔다. 페이지 바탕(bg-layer-basement)이 bg-disabled 와 같은 gray-200 이라 바탕에 바로 두면 비활성 · 읽기 전용 칸이 보이지 않는다.
       견본은 휴대폰 화면 폭(320 이상)이다. 화면 틀 .ptf-screen 은 폰(360) · 데스크톱 웹 화면을 흉내 낸 갤러리 것이다 — 폰 좌우 24(spacing-global-gutter) · 데스크톱 32(layout-margin), Field 사이 24 */
    .ptf-samples { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: var(--spacing-xl) var(--spacing-lg); align-items: start; }
    .ptf-samples--forms { grid-template-columns: minmax(0, 360px) minmax(0, 1fr); }
    .ptf-cap { margin-bottom: var(--spacing-sm); font-size: var(--text-caption); font-weight: 600; line-height: 1.4; color: var(--color-text-secondary); }
    .ptf-cap span { display: block; font-family: ui-monospace, monospace; font-size: 11px; font-weight: 400; color: var(--color-text-tertiary); }
    /* 반응형 견본 아래 — 지금 폭에서 어느 크기로 그렸는지 */
    .ptf-now { margin: var(--spacing-sm) 0 0; font-size: var(--text-caption); line-height: 1.4; color: var(--color-text-tertiary); }
    .ptf-now::before { content: "지금 폭은 1280 미만 — large(52)로 그렸다"; }
    @media (min-width: 1280px) {
      .ptf-now::before { content: "지금 폭은 1280 이상 — medium(40)으로 그렸다"; }
    }
    /* 부위 보기 — 머리 · 꼬리를 점선으로 둘러 칸과의 사이 8 을 보인다 */
    .ptf-anatomy > :is(.ptf-field-header, .ptf-field-footer) { outline: 1px dashed var(--color-fg-neutral-subtle); outline-offset: 0; }
    .ptf-screen { padding: var(--spacing-x6) var(--spacing-global-gutter); border: 1px solid var(--color-border-default); border-radius: var(--radius-r4); background: var(--color-surface-default); }
    .ptf-screen--phone { max-width: 360px; }
    .ptf-screen--desktop { max-width: 640px; padding: var(--spacing-x8) var(--layout-margin); }
    .ptf-screen-title { margin-bottom: var(--spacing-x6); font-family: var(--font-sans); font-size: var(--text-t7); line-height: var(--text-t7--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    /* 폼 — Field 사이 24, 라벨과 값이 짧은 두 칸만 16 간격으로 나란히(768 미만은 한 줄에 하나) */
    .ptf-form { display: flex; flex-direction: column; gap: var(--spacing-x6); }
    .ptf-form-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--spacing-x6) var(--spacing-x4); align-items: start; }
    .ptf-screen-actions { display: flex; gap: var(--spacing-x2); margin-top: var(--spacing-x8); }
    .ptf-screen-actions--end { justify-content: flex-end; }
    .ptf-form-cta { width: 100%; }
    /* 상태 표 — 칸마다 입력칸 하나를 실제 폭(200 이상)으로. 칸이 그보다 좁아지면 판(.cb-panel)이 가로로 밀린다 */
    .ptf-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(200px, 1fr)); }
    @media (max-width: 900px) {
      .ptf-samples--forms { grid-template-columns: minmax(0, 1fr); }
      .ptf-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(200px, 1fr)); }
    }
    @media (max-width: 767px) {
      .ptf-form-row { grid-template-columns: minmax(0, 1fr); }
    }

    /* === Select · Input Button — specs/components/select.md · input-button.md(수치는 select.yaml · input-button.yaml) ===
       구조는 SEED Select · Input Button(2026-10-01). 트리거는 둘 다 Text Input 의 상자형과 같은 상자다 — large 52 · 모서리 12 · 좌우 16 · 사이 10 · 글자 t5 16/22 · 아이콘 20,
       medium 40 · 8 · 14 · 8 · t4 14/19 · 16. 투명 바탕 · 안쪽 1px stroke-neutral-weak(안쪽 그림자), 오류 2px 는 ::after 로 그 안쪽에 덧그린다(색만 d2).
       Select 트리거 .psel-trigger 는 role=combobox 버튼 하나가 상자이고, 콘텐츠 .psel-trigger-content(앞 .psel-icon · 값 .psel-value 또는 .psel-placeholder · 셰브론 .psel-chevron)를 담는다.
       Input Button .pib 은 상자(div)이고 그 안의 배경 층 버튼 .pib-button 이 누르는 영역 전체 · 키보드 포커스다. 콘텐츠 .pib-content(앞 .pib-icon · .pib-affix · 값 · 지우기 .pib-clear · 뒤)는
       그 위에 얹고 누름을 지나 보낸다(pointer-events none) — 지우기만 따로 눌린다.
       누르면 바탕이 bg-layer-default-pressed 로 칠해지고 콘텐츠만 2px 거리로 준다 — 테두리 · 바탕은 그대로다. 배율 = (기준 − 2) ÷ 기준, 기준 = max(상자 높이, 폭 ÷ 4, 24) 을
       페이지 끝 스크립트가 누르는 순간 재서 --press-basis 로 넘긴다(재기 전에는 상자 높이). 호버는 같은 바탕이고 축소가 없다(마우스 있는 기기에서만).
       포커스는 키보드에만 바깥 링 2px · 띄움 2px stroke-focus-ring 이다 — 입력 중임을 알리는 Text Input 의 안쪽 2px 테두리와 다르다.
       비활성 · 읽기 전용은 bg-disabled 바탕이고 흐리게 하지 않는다 — 비활성은 글자 · 아이콘 fg-disabled, 읽기 전용은 값이 진한 그대로이고 열리지 않아 누름 · 호버가 없다.
       --pressed · --focus 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다. 반응형(웹 기본)은 1280(--breakpoint-lg — 미디어 쿼리는 변수를 못 써 수를 적었다) 미만 large · 이상 medium 이다.
       다크 짝은 이 블록 끝의 [data-theme="dark"] 에서 바꾼다. */
    .psel-trigger,
    .pib {
      --pick-px: var(--spacing-x4);
      --pick-gap: var(--spacing-x2_5);
      --pick-icon: 20px;
      --pick-clear: 22px;
      /* 포커스 링 — 공유 토큰(DESIGN.md)에는 브랜드 역할 색이 없어 중립으로 떨어진다(.psb-group · .plst 와 같은 대체 사슬) */
      --pick-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      --press-basis: 52;
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      min-width: 0;
      min-height: 52px;
      margin: 0;
      padding: 0 var(--pick-px);
      border: 0;
      border-radius: var(--radius-r3);
      background: transparent;
      box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-weak);
      font-family: var(--font-sans);
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: 400;
      color: var(--color-fg-neutral);
      text-align: left;
      cursor: pointer;
      transition: background-color var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    /* 오류 2px — 상자 안쪽에 덧그린다. 늘 2px 투명이고 색만 d2 로 나타난다(SEED strokeDuration 0.1s) */
    .psel-trigger::after,
    .pib::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 2px solid transparent;
      border-radius: inherit;
      pointer-events: none;
      transition: border-color var(--motion-duration-d2) var(--motion-ease-easing);
    }
    .psel-trigger[data-invalid]::after,
    .pib[data-invalid]::after { border-color: var(--color-stroke-critical-solid); }
    /* 호버 = 누름과 같은 바탕(축소 없음) — Input Button 은 상자 어디에 올려도(지우기 위에서도) 상자의 호버를 잇는다.
       누름 = 바탕 + 콘텐츠 2px 거리 축소 — Input Button 은 배경 층 버튼을 누를 때만(지우기를 누르면 지우기만 준다). 비활성 · 읽기 전용은 열리지 않아 둘 다 없다 */
    @media (hover: hover) {
      .psel-trigger:not(:disabled, [data-readonly]):hover,
      .pib:not([data-disabled], [data-readonly]):hover { background: var(--color-bg-layer-default-pressed); }
    }
    .psel-trigger:not(:disabled, [data-readonly]):active,
    .pib:not([data-disabled], [data-readonly]):has(> .pib-button:active),
    .psel-trigger.psel-trigger--pressed,
    .pib.pib--pressed { background: var(--color-bg-layer-default-pressed); }
    .psel-trigger:not(:disabled, [data-readonly]):active > .psel-trigger-content,
    .pib:not([data-disabled], [data-readonly]):has(> .pib-button:active) > .pib-content,
    .psel-trigger.psel-trigger--pressed > .psel-trigger-content,
    .pib.pib--pressed > .pib-content { scale: calc(1 - 2 / var(--press-basis)); }
    /* 모션 줄이기 — 콘텐츠 축소를 뺀다. 바탕 전환은 그대로다(기초 Motion) */
    @media (prefers-reduced-motion: reduce) {
      .psel-trigger:not(:disabled, [data-readonly]):active > .psel-trigger-content,
      .pib:not([data-disabled], [data-readonly]):has(> .pib-button:active) > .pib-content,
      .psel-trigger.psel-trigger--pressed > .psel-trigger-content,
      .pib.pib--pressed > .pib-content { scale: 1; }
    }
    /* 포커스 — 키보드 포커스에만 상자 바깥 링 2px · 띄움 2px. Input Button 은 배경 층 버튼이 포커스를 받고 링은 상자가 그린다 */
    .psel-trigger:focus-visible,
    .psel-trigger.psel-trigger--focus,
    .pib:has(> .pib-button:focus-visible),
    .pib.pib--focus { outline: 2px solid var(--pick-focus-ring); outline-offset: 2px; }
    /* 비활성 — bg-disabled 바탕 · 글자 · 아이콘 fg-disabled. 읽기 전용 — bg-disabled 바탕 · 값은 진한 그대로. 흐리게 하지 않는다(v106) */
    .psel-trigger:disabled,
    .pib[data-disabled] { background: var(--color-bg-disabled); cursor: not-allowed; }
    .psel-trigger[data-readonly],
    .pib[data-readonly] { background: var(--color-bg-disabled); cursor: default; }
    .psel-trigger:disabled :is(.psel-value, .psel-placeholder, .psel-icon, .psel-chevron),
    .pib[data-disabled] :is(.pib-value, .pib-placeholder, .pib-icon, .pib-affix) { color: var(--color-fg-disabled); }
    /* 콘텐츠 — 앞 · 값 · (지우기) · 뒤가 한 줄(사이 10). 누르면 이 층만 준다 */
    .psel-trigger-content,
    .pib-content {
      display: flex;
      flex: 1;
      align-items: center;
      gap: var(--pick-gap);
      min-width: 0;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pib-content { position: relative; pointer-events: none; }
    /* 값 — 한 줄 · 넘치면 말줄임, fg-neutral · 400. 고르기 전의 글은 fg-placeholder */
    .psel-value,
    .psel-placeholder,
    .pib-value,
    .pib-placeholder {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .psel-placeholder,
    .pib-placeholder { color: var(--color-fg-placeholder); }
    /* 앞 · 뒤 아이콘 · 셰브론 — fg-neutral-muted(크기는 크기마다). 붙이개 글자 — 값과 같은 크기의 fg-neutral-subtle */
    .psel-icon,
    .psel-chevron,
    .pib-icon { display: flex; flex-shrink: 0; color: var(--color-fg-neutral-muted); }
    :is(.psel-icon, .psel-chevron, .pib-icon) > svg { width: var(--pick-icon); height: var(--pick-icon); }
    .pib-affix { flex-shrink: 0; color: var(--color-fg-neutral-subtle); white-space: nowrap; }
    /* 셰브론 — 열리면 180°(열 때 d3 150ms · 닫을 때 d2 100ms) */
    .psel-chevron { transition: rotate var(--motion-duration-d2) var(--motion-ease-easing); }
    .psel-trigger[aria-expanded="true"] .psel-chevron { rotate: 180deg; transition-duration: var(--motion-duration-d3); }
    /* 배경 층 버튼 — 상자 전체를 덮는 누르는 영역. 바탕 · 링은 상자가 그린다 */
    .pib-button {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: inherit;
      background: transparent;
      font: inherit;
      color: inherit;
      cursor: inherit;
      appearance: none;
    }
    .pib-button:focus-visible { outline: none; }
    /* 지우기 — lucide circle-x · fg-neutral-subtle · 둥근 버튼(large 22 · medium 18). 누르는 영역은 24 이상으로 넓히고, 누르면 지우기만 준다(SEED scaleScope self — 기준 24) */
    .pib-clear {
      --press-basis: 24;
      position: relative;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: var(--radius-full);
      background: transparent;
      color: var(--color-fg-neutral-subtle);
      cursor: pointer;
      pointer-events: auto;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pib-clear::before { content: ""; position: absolute; left: 50%; top: 50%; width: 100%; height: 100%; min-width: 24px; min-height: 24px; translate: -50% -50%; }
    .pib-clear > svg { width: var(--pick-clear); height: var(--pick-clear); }
    .pib-clear:active { scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .pib-clear:active { scale: 1; }
    }
    /* medium — 40 · 모서리 8 · 좌우 14 · 사이 8 · 글자 t4 14/19 · 아이콘 16 · 지우기 18. 1280 이상 데스크톱 웹(마우스)에서만 */
    .psel-trigger--medium,
    .pib--medium {
      --pick-px: var(--spacing-x3_5);
      --pick-gap: var(--spacing-x2);
      --pick-icon: 16px;
      --pick-clear: 18px;
      --press-basis: 40;
      min-height: 40px;
      border-radius: var(--radius-r2);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
    }

    /* 목록 — .psel 이 트리거와 열린 목록을 묶는다. 목록 .psel-list(role=listbox)은 트리거 폭 그대로 아래 8 에 붙는다 — 모서리 20 · bg-layer-floating · shadow-s3 · 위아래 8,
       높이는 480 까지(넘치면 안에서 스크롤). 갤러리에서는 견본 끝에 두어 흐름 안에 그렸다 — 실제로는 떠서 뒤를 덮는다.
       묶음 .psel-group 사이는 8 + 1 + 8 — 목록의 사이 8 에, 둘째 묶음부터 위의 선 .psel-divider(1px stroke-neutral-subtle · 좌우 16 들임)와 그 아래 8 을 더한다. 선택지 사이에는 선이 없다.
       묶음 제목 .psel-group-label 은 위아래 10 · 좌우 16 · t4 14 · 500 · fg-neutral-subtle.
       선택지 .psel-item(role=option)은 위아래 12 · 좌우 16, 콘텐츠 .psel-item-content(앞 아이콘 22 · 글 · 오른쪽 체크 14)는 사이 12 — 한 줄 46 · 한 줄 설명이 붙으면 66.
       글 .psel-item-label 은 t5 · 400 · fg-neutral(목록 안에서는 줄바꿈된다 — 자르지 않는다), 설명 .psel-item-desc 는 t3 · fg-neutral-subtle(사이 2).
       알약 — 누름 · 호버 · 키보드로 짚은 선택지(.psel-item--focus · aria-activedescendant)는 ::before 가 좌우 8 들어와 모서리 12 · bg-layer-floating-pressed 로 칠한다.
       글은 그대로 16 에서 시작한다(알약 안쪽 8). 누르는 동안만 콘텐츠가 2px 거리로 준다 — 호버 · 키보드 위치는 축소가 없고 링도 없다(SEED 그대로, 2026-10-01 사용자 결정).
       고른 선택지는 오른쪽 체크 .psel-indicator(lucide check · 선 2.5 · fg-neutral)만 — 바탕 · 굵기는 그대로다. 막힌 선택지(aria-disabled)는 글 · 설명 · 아이콘 · 체크가 fg-disabled 이고 알약이 생기지 않는다.
       크기 값은 목록의 --pick-* 가 정하고 medium · 반응형이 바꾼다. */
    .psel { display: flex; flex-direction: column; width: 100%; min-width: 0; }
    .psel-list {
      --pick-item-py: var(--spacing-x3);
      --pick-item-gap: var(--spacing-x3);
      --pick-item-icon: 22px;
      --pick-indicator: 14px;
      --pick-item-basis: 46;
      --pick-label: var(--text-t5);
      --pick-label-lh: var(--text-t5--line-height);
      --pick-desc: var(--text-t3);
      --pick-desc-lh: var(--text-t3--line-height);
      --pick-group: var(--text-t4);
      --pick-group-lh: var(--text-t4--line-height);
      --pick-group-weight: 500;
      --pick-group-py: var(--spacing-x2_5);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-x2);
      width: 100%;
      min-width: 0;
      max-height: 480px;
      overflow-y: auto;
      padding: var(--spacing-x2) 0;
      border-radius: var(--radius-r5);
      background: var(--color-bg-layer-floating);
      box-shadow: var(--shadow-s3);
      font-family: var(--font-sans);
      outline: none;
    }
    .psel > .psel-list { margin-top: var(--spacing-x2); }
    .psel-group { display: flex; flex-direction: column; }
    .psel-group-label {
      padding: var(--pick-group-py) var(--spacing-x4);
      font-size: var(--pick-group);
      line-height: var(--pick-group-lh);
      font-weight: var(--pick-group-weight);
      color: var(--color-fg-neutral-subtle);
    }
    .psel-divider { flex-shrink: 0; height: 1px; margin: 0 var(--spacing-x4) var(--spacing-x2); background: var(--color-stroke-neutral-subtle); }
    .psel-item {
      --press-basis: var(--pick-item-basis);
      position: relative;
      display: flex;
      padding: var(--pick-item-py) var(--spacing-x4);
      cursor: pointer;
      user-select: none;
    }
    .psel-item::before {
      content: "";
      position: absolute;
      inset-block: 0;
      inset-inline: 0;
      border-radius: var(--radius-r3);
      background: transparent;
      pointer-events: none;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        inset var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    @media (hover: hover) {
      .psel-item:not([aria-disabled="true"]):hover::before { inset-inline: var(--spacing-x2); background: var(--color-bg-layer-floating-pressed); }
    }
    .psel-item:not([aria-disabled="true"]):active::before,
    .psel-item.psel-item--pressed::before,
    .psel-item.psel-item--hover::before,
    .psel-item.psel-item--focus::before { inset-inline: var(--spacing-x2); background: var(--color-bg-layer-floating-pressed); }
    .psel-item-content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      gap: var(--pick-item-gap);
      min-width: 0;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .psel-item:not([aria-disabled="true"]):active > .psel-item-content,
    .psel-item.psel-item--pressed > .psel-item-content { scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .psel-item:not([aria-disabled="true"]):active > .psel-item-content,
      .psel-item.psel-item--pressed > .psel-item-content { scale: 1; }
    }
    .psel-item-icon { display: flex; flex-shrink: 0; color: var(--color-fg-neutral); }
    .psel-item-icon > svg { width: var(--pick-item-icon); height: var(--pick-item-icon); }
    .psel-item-body { display: flex; flex: 1; flex-direction: column; gap: var(--spacing-x0_5); min-width: 0; }
    .psel-item-label { font-size: var(--pick-label); line-height: var(--pick-label-lh); font-weight: 400; color: var(--color-fg-neutral); }
    .psel-item-desc { font-size: var(--pick-desc); line-height: var(--pick-desc-lh); font-weight: 400; color: var(--color-fg-neutral-subtle); }
    .psel-indicator { display: flex; flex-shrink: 0; color: var(--color-fg-neutral); }
    .psel-indicator > svg { width: var(--pick-indicator); height: var(--pick-indicator); }
    .psel-item[aria-disabled="true"] { cursor: not-allowed; }
    .psel-item[aria-disabled="true"] :is(.psel-item-icon, .psel-item-label, .psel-item-desc, .psel-indicator) { color: var(--color-fg-disabled); }
    /* 목록 medium — 선택지 39(위아래 10 · 사이 8 · 앞 아이콘 18 · 체크 12 · 글 t4 · 설명 t2 — 설명이 붙으면 57), 묶음 제목 위아래 8 · t3 13 · 400 */
    .psel-list--medium {
      --pick-item-py: var(--spacing-x2_5);
      --pick-item-gap: var(--spacing-x2);
      --pick-item-icon: 18px;
      --pick-indicator: 12px;
      --pick-item-basis: 39;
      --pick-label: var(--text-t4);
      --pick-label-lh: var(--text-t4--line-height);
      --pick-desc: var(--text-t2);
      --pick-desc-lh: var(--text-t2--line-height);
      --pick-group: var(--text-t3);
      --pick-group-lh: var(--text-t3--line-height);
      --pick-group-weight: 400;
      --pick-group-py: var(--spacing-x2);
    }

    /* 반응형(웹 기본) — 1280 이상은 medium 의 값을 쓴다. 앱은 늘 large 다 */
    @media (min-width: 1280px) {
      .psel-trigger--responsive,
      .pib--responsive {
        --pick-px: var(--spacing-x3_5);
        --pick-gap: var(--spacing-x2);
        --pick-icon: 16px;
        --pick-clear: 18px;
        --press-basis: 40;
        min-height: 40px;
        border-radius: var(--radius-r2);
        font-size: var(--text-t4);
        line-height: var(--text-t4--line-height);
      }
      .psel-list--responsive {
        --pick-item-py: var(--spacing-x2_5);
        --pick-item-gap: var(--spacing-x2);
        --pick-item-icon: 18px;
        --pick-indicator: 12px;
        --pick-item-basis: 39;
        --pick-label: var(--text-t4);
        --pick-label-lh: var(--text-t4--line-height);
        --pick-desc: var(--text-t2);
        --pick-desc-lh: var(--text-t2--line-height);
        --pick-group: var(--text-t3);
        --pick-group-lh: var(--text-t3--line-height);
        --pick-group-weight: 400;
        --pick-group-py: var(--spacing-x2);
      }
    }

    /* 여는 자리 그림(03h · 03k)의 달력 — 자리만 그린 것이다. 크기 · 고른 날(bg-neutral-inverted 원은 임시다)의 모양은 Date Picker 차례에 정한다.
       달력을 담는 시트 · 팝오버는 아래 Overlays 블록의 .pov-sheet · .pov-popover 다(03k). */
    .pib-cal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-x1); }
    .pib-cal-month { font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    .pib-cal-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); row-gap: var(--spacing-x1); text-align: center; }
    .pib-cal-dow { padding: var(--spacing-x1) 0; font-size: var(--text-t3); line-height: var(--text-t3--line-height); color: var(--color-fg-neutral-subtle); }
    .pib-cal-day { display: grid; place-items: center; height: 36px; font-size: var(--text-t4); line-height: var(--text-t4--line-height); color: var(--color-fg-neutral); }
    .pib-cal-day > span { display: grid; place-items: center; width: min(32px, 100%); aspect-ratio: 1; border-radius: var(--radius-full); }
    .pib-cal-day--picked > span { background: var(--color-bg-neutral-inverted); color: var(--color-fg-neutral-inverted); font-weight: 700; }
    .pib-cal-day--range > span { background: var(--color-bg-neutral-weak); }
    /* 갤러리 — 상태 표에서 Input Button 의 열림 칸은 모습이 그대로라 글로 둔다. 여럿 고른 값의 줄임을 보이는 좁은 칸(200) */
    .psel-na { font-size: var(--text-caption); line-height: 1.4; color: var(--color-text-tertiary); }
    .psel-narrow { max-width: 200px; }

    /* 다크 — 역할 색을 고르는 칸 · 목록 안에서만 다크 짝으로 바꾼다(.ptf-field · .psb-group 과 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       끼운 .btn 은 제 다크 블록이 다시 바꾼다. 여는 자리 그림(달력)은 Overlays 블록의 .pov-frame 이 바꾼다.
       공유 토큰(DESIGN.md)에 없는 브랜드 짝(포커스 링)은 비어서 위 대체값(중립)으로 떨어진다. */
    [data-theme="dark"] :is(.psel-trigger, .psel-list, .pib) {
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-stroke-neutral-subtle: var(--color-stroke-neutral-subtle-dark);
      --color-stroke-critical-solid: var(--color-stroke-critical-solid-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-bg-layer-default: var(--color-bg-layer-default-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-bg-layer-floating: var(--color-bg-layer-floating-dark);
      --color-bg-layer-floating-pressed: var(--color-bg-layer-floating-pressed-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
      --color-fg-placeholder: var(--color-fg-placeholder-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-fg-neutral-muted: var(--color-fg-neutral-muted-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --shadow-s3: var(--shadow-s3-dark);
    }

    /* === Chip — specs/components/chip.md · chip.yaml(수치 원본) ===
       구조는 SEED Chip(2026-10-02). 칩 .pchip 은 알약 하나다 — 앞 아이콘 .pchip-prefix · 글 .pchip-label · 뒤 아이콘 .pchip-suffix(아이콘만이면 .pchip-icon).
       입력값 칩 .pchip--input 은 칩이 버튼이 아니고(span) 안의 지우기 .pchip-remove 만 따로 눌린다. 묶음 .pchip-group 은 줄바꿈(기본) · 한 줄 가로 스크롤(--scroll)이다.
       변형 · 고름은 색을 --pchip-* 변수에 담기만 하고, 상태(호버 · 누름 · 비활성)가 그 변수를 골라 칠한다(.btn 과 같은 짜임). 기본은 outlineWeak · medium 이다(chip.yaml defaults).
       테두리 1px 은 안쪽 그림자로 그린다 — 고르거나 막혀 0 ↔ 1px 로 바뀌어도 칩 크기가 그대로다. 고름은 [aria-checked="true"](라디오 · 체크박스) · [data-selected](걸린 조건의 여는 칩 · 입력값)에서 읽는다.
       호버 = 누름 바탕(마우스 있는 기기에서만, 축소 없음). 누름 = 누름 바탕 + 칩 전체 2px 거리 축소 — 배율 = (기준 − 2) ÷ 기준, 기준 = max(높이, 폭 ÷ 4, 24) 를
       페이지 끝 스크립트가 누르는 순간 재서 --press-basis 로 넘긴다(재기 전에는 높이). 모션 줄이기면 축소하지 않는다.
       포커스는 키보드에만 바깥 링 2px · 띄움 2px stroke-focus-ring 이다(입력값 칩은 지우기에 포커스가 오면 칩 둘레에). 비활성은 bg-disabled · fg-disabled 이고 흐리게 하지 않는다 —
       고른 채 막히면 1px stroke-neutral-solid 를 남긴다. 누르는 영역은 ::before 로 가로 · 세로 44 까지 넓힌다(보이는 칩은 그대로 — chip.yaml touchTarget).
       고른 칩은 브랜드 색이 아니다 — 세 미리보기가 같다(포커스 링만 브랜드 색). .pchip--hover · --pressed · --focus 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다.
       다크 짝은 이 블록 끝의 [data-theme="dark"] 에서 바꾼다. */
    .pchip {
      /* 크기 기본 = medium — 36 · 좌우 14 · 최소 폭 48 · 앞 아이콘 16 · 뒤 아이콘 14 · 지우기 14 · 아이콘만 16 */
      --pchip-h: 36px;
      --pchip-px: var(--spacing-x3_5);
      --pchip-min-w: 48px;
      --pchip-prefix: 16px;
      --pchip-suffix: 14px;
      --pchip-remove: 14px;
      --pchip-icon: 16px;
      --press-basis: 36;
      /* 포커스 링 — 공유 토큰(DESIGN.md)에는 브랜드 역할 색이 없어 중립으로 떨어진다(.psb-group · .plst · .pib 와 같은 대체 사슬) */
      --pchip-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      /* 변형 기본 = outlineWeak 안 고름 — 투명 + 안쪽 1px stroke-neutral-weak · 글자 fg-neutral, 누름 bg-layer-default-pressed. 막히면 bg-disabled 에 테두리는 그대로 */
      --pchip-bg: transparent;
      --pchip-fg: var(--color-fg-neutral);
      --pchip-stroke: var(--color-stroke-neutral-weak);
      --pchip-stroke-w: 1px;
      --pchip-bg-pressed: var(--color-bg-layer-default-pressed);
      --pchip-stroke-off: var(--color-stroke-neutral-weak);
      --pchip-stroke-w-off: 1px;
      position: relative;
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-x1_5);
      box-sizing: border-box;
      height: var(--pchip-h);
      min-width: var(--pchip-min-w);
      margin: 0;
      padding: 0 var(--pchip-px);
      border: 0;
      border-radius: var(--radius-full);
      background: var(--pchip-bg);
      box-shadow: inset 0 0 0 var(--pchip-stroke-w) var(--pchip-stroke);
      color: var(--pchip-fg);
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        color var(--motion-duration-color-transition) var(--motion-ease-easing),
        box-shadow var(--motion-duration-color-transition) var(--motion-ease-easing),
        scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pchip[hidden] { display: none; }
    /* 누르는 영역 — 보이는 칩과 따로 가로 · 세로 44 까지(Button 과 같다). 글이 있는 칩은 최소 폭 44 · 48 · 52 라 가로는 이미 넘고,
       아이콘만 있는 칩(32 · 36 · 40)은 가로도 44 로 넓힌다 */
    .pchip::before { content: ""; position: absolute; left: 50%; top: 50%; width: 100%; height: 100%; min-width: 44px; min-height: 44px; translate: -50% -50%; }
    .pchip-prefix, .pchip-suffix, .pchip-icon { display: flex; flex-shrink: 0; }
    .pchip-prefix > svg { width: var(--pchip-prefix); height: var(--pchip-prefix); }
    .pchip-suffix > svg { width: var(--pchip-suffix); height: var(--pchip-suffix); }
    .pchip-icon > svg { width: var(--pchip-icon); height: var(--pchip-icon); }
    /* 크기 — small 32 · 좌우 12 · 최소 폭 44 · 아이콘 14 / large 40 · 좌우 16 · 최소 폭 52 · 아이콘 16. 글은 세 크기 모두 t4 14 · 500 */
    .pchip--small { --pchip-h: 32px; --pchip-px: var(--spacing-x3); --pchip-min-w: 44px; --pchip-prefix: 14px; --pchip-suffix: 14px; --pchip-remove: 14px; --pchip-icon: 14px; --press-basis: 32; }
    .pchip--large { --pchip-h: 40px; --pchip-px: var(--spacing-x4); --pchip-min-w: 52px; --pchip-prefix: 16px; --pchip-suffix: 16px; --pchip-remove: 16px; --pchip-icon: 16px; --press-basis: 40; }
    /* 아이콘만 — 원(폭 = 높이 32 · 36 · 40), 좌우 여백 0. 이름(aria-label)은 칩이 단다 */
    .pchip--icon-only { width: var(--pchip-h); min-width: 0; padding: 0; }
    /* Solid — 안 고름 bg-neutral-weak(흰 표면 위에서만 — 회색 바탕 bg-layer-basement 와 같은 색) · 누름 bg-neutral-weak-pressed, 테두리 없음 */
    .pchip--solid {
      --pchip-bg: var(--color-bg-neutral-weak);
      --pchip-stroke-w: 0px;
      --pchip-bg-pressed: var(--color-bg-neutral-weak-pressed);
      --pchip-stroke-w-off: 0px;
    }
    /* 고름 — Solid · Outline Strong: 짙은 채움 bg-neutral-inverted · fg-neutral-inverted, 테두리 없음(Outline Strong 도 지운다), 누름 bg-neutral-inverted-pressed.
       고른 채 막히면 bg-disabled 에 1px stroke-neutral-solid */
    .pchip--solid:is([aria-checked="true"], [data-selected]),
    .pchip--outline-strong:is([aria-checked="true"], [data-selected]) {
      --pchip-bg: var(--color-bg-neutral-inverted);
      --pchip-fg: var(--color-fg-neutral-inverted);
      --pchip-stroke-w: 0px;
      --pchip-bg-pressed: var(--color-bg-neutral-inverted-pressed);
      --pchip-stroke-off: var(--color-stroke-neutral-solid);
      --pchip-stroke-w-off: 1px;
    }
    /* 고름 — Outline Weak: 옅은 바탕 bg-neutral-weak + 짙은 1px stroke-neutral-contrast(글자 그대로), 누름 bg-neutral-weak-pressed. 고른 채 막히면 1px stroke-neutral-solid */
    .pchip--outline-weak:is([aria-checked="true"], [data-selected]) {
      --pchip-bg: var(--color-bg-neutral-weak);
      --pchip-stroke: var(--color-stroke-neutral-contrast);
      --pchip-bg-pressed: var(--color-bg-neutral-weak-pressed);
      --pchip-stroke-off: var(--color-stroke-neutral-solid);
    }
    /* 호버 = 누름 바탕(축소 없음, 마우스 있는 기기에서만). 누름 = 누름 바탕 + 칩 전체 축소. 입력값 칩은 칩이 눌리지 않아 둘 다 없다 */
    @media (hover: hover) {
      .pchip:not(.pchip--input, :disabled):hover { background: var(--pchip-bg-pressed); }
    }
    .pchip.pchip--hover { background: var(--pchip-bg-pressed); }
    .pchip:not(.pchip--input, :disabled):active,
    .pchip.pchip--pressed { background: var(--pchip-bg-pressed); scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .pchip:not(.pchip--input, :disabled):active,
      .pchip.pchip--pressed { scale: 1; }
    }
    /* 포커스 — 키보드 포커스에만 바깥 링 2px · 띄움 2px. 입력값 칩은 지우기가 포커스를 받고 링은 칩이 그린다 */
    .pchip:focus-visible,
    .pchip.pchip--focus,
    .pchip--input:has(> .pchip-remove:focus-visible) { outline: 2px solid var(--pchip-focus-ring); outline-offset: 2px; }
    /* 비활성 — bg-disabled · fg-disabled(흐리게 하지 않는다 — v106), 테두리는 변형 · 고름이 정한 막힘 값. 누를 수 없고 Tab 이 서지 않는다(disabled) */
    .pchip:disabled,
    .pchip[data-disabled] {
      background: var(--color-bg-disabled);
      box-shadow: inset 0 0 0 var(--pchip-stroke-w-off) var(--pchip-stroke-off);
      color: var(--color-fg-disabled);
      cursor: not-allowed;
    }
    /* 입력값 칩 — 글 + 지우기(lucide x · 14 · 14 · 16 · 글자색 그대로 — 사이 6). 지우기는 누르는 영역 24 × 24 이고 이름은 "{글} 지우기" 다.
       지우기는 호버 바탕이 없고, 누르면 지우기만 2px 거리로 준다(기준 24 — SEED scaleScope self, Input Button 의 지우기 .pib-clear 와 같다). 칩은 누름이 아니다.
       키보드 링은 지우기가 아니라 칩 둘레에 그린다(위 포커스 규칙) */
    .pchip--input { cursor: default; }
    .pchip--input::before { content: none; }
    .pchip-remove {
      --press-basis: 24;
      position: relative;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: var(--radius-full);
      background: transparent;
      color: currentColor;
      cursor: pointer;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pchip-remove::before { content: ""; position: absolute; left: 50%; top: 50%; width: 24px; height: 24px; translate: -50% -50%; }
    .pchip-remove > svg { width: var(--pchip-remove); height: var(--pchip-remove); }
    .pchip-remove:not(:disabled):active { scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .pchip-remove:not(:disabled):active { scale: 1; }
    }
    .pchip-remove:focus-visible { outline: none; }
    .pchip-remove:disabled { cursor: not-allowed; }
    /* 묶음 — 칩 사이 8(spacing-between-chips). 기본은 줄바꿈(폼 · 시트 안 — 줄 사이도 8), --scroll 은 한 줄 가로 스크롤(목록 위 필터 바 · 제안 줄).
       스크롤 줄은 넘친 것을 자르므로 사방 6 을 더 열고 그만큼 바깥으로 당긴다 — 누르는 영역(가장 작은 small 32 의 44 — (44 − 32) ÷ 2, 아이콘만 있는 칩은 가로도)과
       포커스 링(2 + 2)이 잘리지 않고 칩 자리는 그대로다(위아래 6 은 사이트 그림과 같은 값 — chip.yaml 에는 없다).
       --gutter 는 줄을 화면 끝까지 내고 안쪽 여백을 화면 여백(spacing-global-gutter 24)만큼 둔다 — 좌우 24 인 틀 안에서 쓰고, 스크롤해도 · 키보드로 옮겨도 첫 칩이 여백에서 시작한다.
       끝 흐림은 Scroll Fog 차례에 정한다. 입력값 칩을 다 지우면 포커스가 묶음으로 오므로 묶음도 키보드 링을 그린다 */
    .pchip-group {
      --pchip-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-between-chips);
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
    }
    .pchip-group:focus-visible { outline: 2px solid var(--pchip-focus-ring); outline-offset: 2px; }
    .pchip-group--scroll { flex-wrap: nowrap; overflow-x: auto; padding: var(--spacing-x1_5); margin: calc(-1 * var(--spacing-x1_5)); }
    .pchip-group--gutter { padding-inline: var(--spacing-global-gutter); margin-inline: calc(-1 * var(--spacing-global-gutter)); scroll-padding-inline: var(--spacing-global-gutter); }

    /* 다크 — 역할 색을 칩 · 갤러리 틀 안에서만 다크 짝으로 바꾼다(.btn · .psb-group · .pib 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       공유 토큰(DESIGN.md)에 없는 브랜드 짝(포커스 링)은 비어서 위 대체값(중립)으로 떨어진다 */
    [data-theme="dark"] :is(.pchip, .pchip-group, .pchip-frame, .pchip-phone) {
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-stroke-neutral-solid: var(--color-stroke-neutral-solid-dark);
      --color-stroke-neutral-contrast: var(--color-stroke-neutral-contrast-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-bg-neutral-weak-pressed: var(--color-bg-neutral-weak-pressed-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-bg-neutral-inverted-pressed: var(--color-bg-neutral-inverted-pressed-dark);
      --color-bg-layer-default: var(--color-bg-layer-default-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-bg-layer-basement: var(--color-bg-layer-basement-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
    }

    /* Chip 갤러리 — 칩은 흰 표면(.vignette-card) 위에 둔다. 페이지 바탕(bg-layer-basement)이 Solid · 비활성 바탕(bg-neutral-weak · bg-disabled)과 같은 gray-200 이라
       바탕에 바로 두면 그 칩이 보이지 않는다. 견본 틀(.ptf-samples · .ptf-cap)과 상태 표(.cb-matrix)는 Text Field 갤러리 것이다.
       .pchip-frame 은 실제 화면처럼 흰 바탕(bg-layer-default) · 좌우 24 인 틀, --basement 는 회색 바탕(bg-layer-basement), --narrow 는 줄바꿈을 보이는 좁은 칸(220)이다.
       .pchip-phone 은 폰(360) 화면 틀이다 — 목록 줄이 화면 끝까지 가고(좌우 24 는 줄이 가진다) 필터 바가 그 여백에서 시작한다. .pchip-target 은 누르는 영역을 점선으로 보인다.
       모두 갤러리 것이고 Chip 의 일부가 아니다 */
    .pchip-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(136px, 1fr)); }
    .pchip-cell { flex-wrap: wrap; gap: var(--spacing-x2); }
    @media (max-width: 900px) {
      .pchip-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(136px, 1fr)); }
    }
    .pchip-target::before,
    .pchip-target .pchip-remove::before { outline: 1px dashed var(--color-fg-neutral-subtle); outline-offset: -1px; }
    .pchip-frame { padding: var(--spacing-x4) var(--spacing-global-gutter); border: 1px solid var(--color-border-default); border-radius: var(--radius-r4); background: var(--color-bg-layer-default); }
    .pchip-frame--basement { background: var(--color-bg-layer-basement); }
    .pchip-frame--narrow { max-width: 220px; }
    .pchip-rows, .pchip-stack { display: flex; flex-direction: column; gap: var(--spacing-x3); }
    .pchip-phone { max-width: 360px; overflow: hidden; border: 1px solid var(--color-border-default); border-radius: var(--radius-r4); background: var(--color-bg-layer-default); font-family: var(--font-sans); }
    .pchip-phone-head { padding: var(--spacing-x6) var(--spacing-global-gutter) var(--spacing-x4); }
    .pchip-phone-head > .ptf-screen-title { margin-bottom: 0; }
    .pchip-phone-bar { padding: 0 var(--spacing-global-gutter); }
    .pchip-phone-list { padding: var(--spacing-x3) 0 var(--spacing-x4); }

    /* === Tabs · Segmented Control — specs/components/tabs.md · tabs.yaml · chip-tabs.yaml · segmented-control.md · segmented-control.yaml(수치 원본) ===
       구조는 SEED Tabs · Segmented Control(2026-10-02). 고른 표시는 브랜드 색이 아니라 중립색이다 — 세 미리보기가 같다(알림 점 · 포커스 링만 브랜드 색).
       Line 탭 — 목록 .ptab-list(role=tablist) > 탭 .ptab(role=tab) > 글 .ptab-label(+ 알림 점 .ptab-dot) · 막대 .ptab-indicator(목록에 하나).
       목록은 놓인 화면 · 구역 폭을 채우고 바탕은 불투명한 bg-layer-default, 바닥은 안쪽 1px stroke-neutral-subtle 구획 선이다(안쪽 그림자 — 선이 탭 높이를 밀지 않는다).
       탭은 위아래 · 좌우 10 이고 글을 아래로 붙인다(small 40 · 글 t4 → 위 11, medium 44 · 글 t5 → 위 12). 글은 고르든 안 고르든 700, 고르면 글자색만 짙어진다(전환 없이 바로).
       막대는 2px fg-neutral · 모서리 0 이고 고른 탭의 자리 · 폭으로 미끄러진다(left · width — d4 · easing). 자리는 페이지 끝 스크립트가 고른 탭을 재서 --ptab-x · --ptab-w 로 넘기고
       목록에 [data-ptab-ready] 를 단다 — 그 전에는 고른 탭이 ::after 로 막대를 그린다. Fill 은 막대를 탭에서 좌우 --ptab-inset(16) 들이고, Hug 는 탭 폭 그대로다.
       누름 = 탭 전체 2px 거리 축소(배율 = (기준 − 2) ÷ 기준, 기준 = max(높이, 폭 ÷ 4, 24) — 스크립트가 누르는 순간 재서 --press-basis 로 넘긴다) · 색은 그대로 · 호버 모양 없음.
       포커스 = 키보드에만 탭 안쪽 링 2px(띄움 −2 · 모서리 각짐) stroke-focus-ring. 비활성 = 글 fg-disabled · 커서 not-allowed · 축소 없음.
       알림 점은 6 · fg-brand(브랜드 글자색), 글 끝에서 2 · 글 위쪽(탭 폭을 넓히지 않는다)이고 고른 탭에는 그리지 않는다. 고른 채 막힌 탭은 막대도 fg-disabled 다.
       .ptab--pressed · --focus 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다.
       다크 짝은 이 블록 끝의 [data-theme="dark"] 에서 바꾼다. */
    .ptab-list {
      /* 포커스 링 · 알림 점 — 공유 토큰(DESIGN.md)에는 브랜드 역할 색이 없어 중립으로 떨어진다(.pchip · .plst 와 같은 대체 사슬) */
      --ptab-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      --ptab-dot: var(--color-fg-brand, var(--color-primary, var(--color-fg-neutral)));
      --ptab-inset: 0px;
      position: relative;
      display: flex;
      width: 100%;
      min-height: 40px;
      margin: 0;
      padding: 0;
      background: var(--color-bg-layer-default);
      box-shadow: inset 0 -1px 0 var(--color-stroke-neutral-subtle);
    }
    .ptab-list--medium { min-height: 44px; }
    /* Fill — 칸을 똑같이 나눈다(글이 칸보다 길면 그 탭만 넓어진다 — 그러면 Hug 로). 막대는 탭에서 좌우 16 들인다 */
    .ptab-list--fill { --ptab-inset: var(--spacing-x4); }
    /* Hug — 목록 좌우 16, 넘치면 가로 스크롤(스크롤바 숨김). 고른 탭이 화면 밖이면 16 여유를 두고 스크롤한다(scroll-padding) */
    .ptab-list--hug { padding-inline: var(--spacing-x4); overflow-x: auto; scroll-padding-inline: var(--spacing-x4); scrollbar-width: none; }
    .ptab-list--hug::-webkit-scrollbar { display: none; }
    .ptab {
      --press-basis: 40;
      position: relative;
      display: flex;
      flex: 0 0 auto;
      align-items: flex-end;
      justify-content: center;
      min-height: 40px;
      margin: 0;
      padding: var(--spacing-x2_5);
      border: 0;
      border-radius: 0;
      background: transparent;
      color: var(--color-fg-neutral-subtle);
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .ptab-list--medium > .ptab { --press-basis: 44; min-height: 44px; font-size: var(--text-t5); line-height: var(--text-t5--line-height); }
    .ptab-list--fill > .ptab { flex: 1 1 0; }
    .ptab[aria-selected="true"] { color: var(--color-fg-neutral); }
    .ptab:not(:disabled):active,
    .ptab.ptab--pressed { scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .ptab:not(:disabled):active,
      .ptab.ptab--pressed { scale: 1; }
    }
    .ptab:focus-visible,
    .ptab.ptab--focus { outline: 2px solid var(--ptab-focus-ring); outline-offset: -2px; }
    .ptab:disabled { color: var(--color-fg-disabled); cursor: not-allowed; }
    .ptab-label { position: relative; display: block; }
    .ptab-dot { position: absolute; top: 0; left: calc(100% + 2px); width: 6px; height: 6px; border-radius: var(--radius-full); background: var(--ptab-dot); }
    .ptab-indicator {
      position: absolute;
      bottom: 0;
      left: var(--ptab-x, 0px);
      width: var(--ptab-w, 0px);
      height: 2px;
      border-radius: 0;
      background: var(--color-fg-neutral);
      pointer-events: none;
    }
    .ptab-list:not([data-ptab-ready]) > .ptab-indicator { display: none; }
    .ptab-list[data-ptab-ready] > .ptab-indicator {
      transition:
        left var(--motion-duration-d4) var(--motion-ease-easing),
        width var(--motion-duration-d4) var(--motion-ease-easing);
    }
    .ptab-list:not([data-ptab-ready]) > .ptab[aria-selected="true"]::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: var(--ptab-inset);
      right: var(--ptab-inset);
      height: 2px;
      background: var(--color-fg-neutral);
    }
    /* 고른 채 막힌 탭(목록 전체가 막혔을 때) — 막대도 전용 색 fg-disabled(tabs.yaml 고름 × disabled) */
    .ptab-list:has(> .ptab[aria-selected="true"]:disabled) > .ptab-indicator,
    .ptab-list:not([data-ptab-ready]) > .ptab[aria-selected="true"]:disabled::after { background: var(--color-fg-disabled); }
    /* 보조 기술에만 — 알림 점의 "새 소식" · "새 내용"(Tailwind sr-only) */
    .ptab-sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    /* 내용 칸 — 고른 탭 것만 보인다. 포커스할 것이 없는 칸은 칸이 Tab 을 받는다(tabindex 0) — 키보드에만 안쪽 링 */
    .ptab-panel[hidden] { display: none; }
    .ptab-panel:focus { outline: none; }
    .ptab-panel:focus-visible { outline: 2px solid var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral))); outline-offset: -2px; }

    /* Chip Tabs — 목록 .ptab-chips(role=tablist) > 03i 의 칩 .pchip(role=tab). 칩 하나는 Chip 그대로(solid = Solid · outline = Outline Strong, medium 36 · large 40)이고
       고름은 aria-selected 와 함께 data-selected 로 칩의 고른 모습(짙은 채움)을 칠한다. 목록은 바탕 · 바닥 선 없이 한 줄 가로 스크롤 —
       칩 사이 8(between-chips) · 좌우 화면 여백 24 · 위아래 8(칩의 누르는 영역 44 · 바깥 포커스 링이 잘리지 않는다), 고른 칩이 화면 밖이면 화면 여백 24 를 두고 스크롤한다(Chip 의 가로 스크롤 줄과 같다).
       알림 점은 칩 안이라 글 뒤 6(칩의 사이) · 세로 가운데이고 칩이 그만큼 넓어진다. 고른 칩(짙은 채움)에는 그리지 않는다 */
    .ptab-chips {
      --ptab-dot: var(--color-fg-brand, var(--color-primary, var(--color-fg-neutral)));
      position: relative;
      display: flex;
      gap: var(--spacing-between-chips);
      width: 100%;
      margin: 0;
      padding: var(--spacing-x2) var(--spacing-global-gutter);
      overflow-x: auto;
      scroll-padding-inline: var(--spacing-global-gutter);
      scrollbar-width: none;
    }
    .ptab-chips::-webkit-scrollbar { display: none; }
    .ptab-chip-dot { flex-shrink: 0; width: 6px; height: 6px; border-radius: var(--radius-full); background: var(--ptab-dot); }

    /* Segmented Control — 트랙 .pseg(role=radiogroup) > 고른 알약 .pseg-indicator · 칸 .pseg-item(role=radio) > 글 .pseg-label(+ 알림 점 .pseg-dot).
       트랙은 안쪽 4 · 모서리 full · bg-neutral-weak 이고 놓인 자리 폭을 채운다 — 칸이 그 폭을 칸 수(--pseg-n)로 똑같이 나눈다(최소 폭 없음). 모든 칸이 같은 폭 · 같은 높이다(가장 높은 칸에 맞춘다).
       칸은 34 이상 · 위아래 6 · 좌우 12 · 모서리 full, 글 t5 16/22 · 700 · 가운데 — 길면 단어 단위로 줄을 바꾼다(v114).
       고른 알약은 트랙에 하나다 — bg-layer-default + 안쪽 짙은 1px stroke-neutral-contrast, 폭 = (트랙 − 8) ÷ 칸 수이고 고른 칸 번호(--pseg-i)만큼 옮긴다(transform · d4 · easing).
       안 고른 칸을 올리거나(웹) 누르면 bg-neutral-weak-pressed + 안쪽 1px stroke-neutral-weak · 글 fg-neutral-muted, 고른 칸은 bg-layer-default-pressed + 짙은 1px 그대로 — 칸에 칠해 알약을 덮는다.
       누름은 칸 바탕은 그대로 두고 글만 2px 거리로 준다(기준 = 칸의 max(높이, 폭 ÷ 4, 24) — 스크립트가 누르는 순간 재서 --press-basis 로 넘긴다). 모션 줄이기면 줄지 않는다.
       포커스 = 키보드에만 칸 바깥 링 2px · 띄움 2px(알약을 따라 둥글다). 비활성 = 글 fg-disabled · 커서 not-allowed(흐리게 하지 않는다 — v106) — 고른 채 막히면 칸에 bg-disabled + 짙은 1px stroke-neutral-solid.
       .pseg-item--hover · --pressed · --focus 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다 */
    .pseg {
      --pseg-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      --pseg-dot: var(--color-fg-brand, var(--color-primary, var(--color-fg-neutral)));
      position: relative;
      display: grid;
      grid-template-columns: repeat(var(--pseg-n, 2), minmax(0, 1fr));
      width: 100%;
      margin: 0;
      padding: var(--spacing-x1);
      border-radius: var(--radius-full);
      background: var(--color-bg-neutral-weak);
      isolation: isolate;
    }
    .pseg-indicator {
      position: absolute;
      top: var(--spacing-x1);
      bottom: var(--spacing-x1);
      left: var(--spacing-x1);
      width: calc((100% - 2 * var(--spacing-x1)) / var(--pseg-n, 2));
      border-radius: var(--radius-full);
      background: var(--color-bg-layer-default);
      box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-contrast);
      transform: translateX(calc(var(--pseg-i, 0) * 100%));
      transition: transform var(--motion-duration-d4) var(--motion-ease-easing);
      pointer-events: none;
    }
    .pseg-item {
      --press-basis: 34;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
      min-height: 34px;
      margin: 0;
      padding: var(--spacing-x1_5) var(--spacing-x3);
      border: 0;
      border-radius: var(--radius-full);
      background: transparent;
      box-shadow: inset 0 0 0 1px transparent;
      color: var(--color-fg-neutral-subtle);
      font-family: var(--font-sans);
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        color var(--motion-duration-color-transition) var(--motion-ease-easing),
        box-shadow var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    .pseg-label {
      position: relative;
      min-width: 0;
      word-break: keep-all;
      overflow-wrap: break-word;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pseg-item[aria-checked="true"] { color: var(--color-fg-neutral); }
    /* 호버(마우스 있는 기기에서만) = 누름 바탕, 축소 없음 */
    @media (hover: hover) {
      .pseg-item:not(:disabled, [aria-checked="true"]):hover {
        background: var(--color-bg-neutral-weak-pressed);
        box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-weak);
        color: var(--color-fg-neutral-muted);
      }
      .pseg-item[aria-checked="true"]:not(:disabled):hover {
        background: var(--color-bg-layer-default-pressed);
        box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-contrast);
      }
    }
    .pseg-item:not(:disabled, [aria-checked="true"]):active,
    .pseg-item:not([aria-checked="true"]):is(.pseg-item--hover, .pseg-item--pressed) {
      background: var(--color-bg-neutral-weak-pressed);
      box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-weak);
      color: var(--color-fg-neutral-muted);
    }
    .pseg-item[aria-checked="true"]:not(:disabled):active,
    .pseg-item[aria-checked="true"]:is(.pseg-item--hover, .pseg-item--pressed) {
      background: var(--color-bg-layer-default-pressed);
      box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-contrast);
    }
    .pseg-item:not(:disabled):active > .pseg-label,
    .pseg-item.pseg-item--pressed > .pseg-label { scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .pseg-item:not(:disabled):active > .pseg-label,
      .pseg-item.pseg-item--pressed > .pseg-label { scale: 1; }
    }
    .pseg-item:focus-visible,
    .pseg-item.pseg-item--focus { outline: 2px solid var(--pseg-focus-ring); outline-offset: 2px; }
    .pseg-item:disabled { color: var(--color-fg-disabled); cursor: not-allowed; }
    .pseg-item[aria-checked="true"]:disabled { background: var(--color-bg-disabled); box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-solid); }
    .pseg-dot { position: absolute; top: 0; left: calc(100% + 2px); width: 6px; height: 6px; border-radius: var(--radius-full); background: var(--pseg-dot); }
    /* 거르는 목록 — 고른 칸의 값이 없는 줄은 숨긴다(.plst-row · .memo-row 의 display 를 이긴다) */
    [data-pseg-tags][hidden] { display: none; }

    /* 다크 — 역할 색을 탭 · 칸 · 갤러리 틀 안에서만 다크 짝으로 바꾼다(.pchip · .plst 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       Chip Tabs 의 칩 색은 .pchip 의 다크 블록이 바꾼다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝(포커스 링 · 알림 점)은 비어서 위 대체값(중립)으로 떨어진다 */
    [data-theme="dark"] :is(.ptab-list, .ptab-chips, .pseg, .ptab-phone, .ptab-desk, .ptab-vignette) {
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-fg-brand: var(--color-fg-brand-dark);
      --color-bg-layer-default: var(--color-bg-layer-default-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-bg-neutral-weak-pressed: var(--color-bg-neutral-weak-pressed-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-stroke-neutral-subtle: var(--color-stroke-neutral-subtle-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-stroke-neutral-solid: var(--color-stroke-neutral-solid-dark);
      --color-stroke-neutral-contrast: var(--color-stroke-neutral-contrast-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-muted: var(--color-fg-neutral-muted-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
    }

    /* Tabs 갤러리 — 탭 · 칸은 흰 표면(.vignette-card) 위에 둔다(Segmented 트랙 bg-neutral-weak 가 페이지 바탕 bg-layer-basement 와 같은 gray-200 이다).
       견본 틀(.ptf-samples · .ptf-cap)과 상태 표(.cb-matrix)는 Text Field 갤러리 것이다. .ptab-phone 은 폰 화면 틀(안쪽 360) — 탭 목록은 틀 끝까지 가고
       Segmented 는 화면 여백 24 안(.ptab-pad)에 둔다. .ptab-desk 는 데스크톱 웹 카드 틀이다. 모두 갤러리 것이고 Tabs · Segmented Control 의 일부가 아니다 */
    .ptab-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(150px, 1fr)); }
    .pseg-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(176px, 1fr)); }
    @media (max-width: 900px) {
      .ptab-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(150px, 1fr)); }
      .pseg-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(176px, 1fr)); }
    }
    .ptab-cell { min-width: 0; padding: var(--spacing-x1_5) 0; }
    .ptab-samples { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 362px), 1fr)); gap: var(--spacing-xl) var(--spacing-lg); align-items: start; }
    .ptab-phone { box-sizing: content-box; max-width: 360px; overflow: hidden; border: 1px solid var(--color-border-default); border-radius: var(--radius-r4); background: var(--color-bg-layer-default); font-family: var(--font-sans); }
    .ptab-phone-head { padding: var(--spacing-x6) var(--spacing-global-gutter) var(--spacing-x2); }
    .ptab-phone-head > .ptf-screen-title { margin-bottom: 0; }
    .ptab-phone-body { padding-bottom: var(--spacing-x2); }
    .ptab-pad { padding: var(--spacing-x4) var(--spacing-global-gutter); }
    .ptab-stack { display: flex; flex-direction: column; gap: var(--spacing-x4); padding: var(--spacing-x4) 0; }
    .ptab-note { margin: 0 0 var(--spacing-x1); padding: 0 var(--spacing-global-gutter); font-size: var(--text-caption); line-height: 1.4; color: var(--color-text-tertiary); }
    .ptab-lead { margin: 0; padding: var(--spacing-x4) var(--spacing-global-gutter) var(--spacing-x1); font-size: var(--text-t5); line-height: var(--text-t5--line-height); color: var(--color-fg-neutral); }
    .ptab-lead strong { font-weight: 700; }
    .ptab-screens { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 362px), 1fr)); gap: var(--spacing-xl) var(--spacing-lg); align-items: start; }
    .ptab-screens > .ptab-wide { grid-column: 1 / -1; }
    .ptab-desk { max-width: 720px; overflow: hidden; border: 1px solid var(--color-border-default); border-radius: var(--radius-r4); background: var(--color-bg-layer-default); font-family: var(--font-sans); }
    .ptab-desk-head { padding: var(--spacing-x8) var(--spacing-x6) var(--spacing-x4); }
    .ptab-desk-head > .ptf-screen-title { margin-bottom: 0; }
    .ptab-desk-body { padding: var(--spacing-x2) 0 var(--spacing-x4); }
    /* 도메인 비뇨트(04) — 내용 칸 글 · 거르는 메모 */
    .ptab-vignette-panel { padding-top: var(--spacing-x4); font-size: var(--text-t4); line-height: var(--text-t4--line-height); color: var(--color-fg-neutral-subtle); }
    .ptab-memos { display: flex; flex-direction: column; gap: var(--spacing-x2); margin-top: var(--spacing-x4); }
    /* === Bottom Sheet · Dialog · Alert Dialog · Popover — specs/components/bottom-sheet.md · dialog.md · alert-dialog.md · popover.md(수치는 *.yaml) · specs/z-index.md ===
       구조는 SEED Bottom Sheet · Dialog · Responsive Dialog · Alert Dialog · Popover(2026-10-02). 표면은 넷 — 시트 .pov-sheet · 대화상자 .pov-dialog · 확인창 .pov-alert ·
       팝오버 .pov-popover. 모두 떠 있는 표면 bg-layer-floating 이고, 시트 · 대화상자 · 확인창은 그림자 없이 딤(overlay-dim 0.50 · 다크 0.65) 위에, 팝오버는 딤 없이 shadow-s3 로 뜬다.
       머리 .pov-*-header(제목 · 설명) · 본문 .pov-*-body · 바닥 .pov-*-footer 로 짠다. 닫기 .pov-close 는 시트 28 원(--circle) · 대화상자 · 팝오버 투명 52 상자(--box)이고,
       누르면 바탕이 칠해지고 2px 거리로 준다(배율 = (기준 − 2) ÷ 기준, 기준 28 · 52 — 모션 줄이기면 줄지 않는다). 포커스는 키보드에만 바깥 링 2px · 띄움 2px stroke-focus-ring 이다.
       대화상자 · 팝오버 본문은 넘치면 [data-overflow](아래 48 흐림 + 본문 아래 48 비움), 위로 스크롤되면 [data-scrolled](머리 아래 1px 선)다 — 페이지 끝 스크립트가 단다.
       확인창 바닥은 글 폭이 배치를 정한다 — 한쪽 글이 반 폭을 넘으면 세로(확정이 위), 버튼 하나면 폭 전체(alert-dialog.tsx 와 같은 flex-wrap-reverse).
       화면 틀 .pov-frame(폰 · 데스크톱 웹) · 뒤 화면 .pov-page · 표면 자리 .pov-layer 는 갤러리 것이다 — 틀의 .pov-viewport 가 쌓임 맥락을 가둬 z-index 는 z-index.md 값을
       그대로 쓴다(시트 · 대화상자 L2 딤 100 · 표면 101, 팝오버 L3 200, 확인창 L5 딤 300 · 표면 301). 폰 틀의 --pov-safe-bottom 은 레시피의 env(safe-area-inset-bottom) 자리다.
       .pov-close--pressed · --focus 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다. 다크 짝은 이 블록 끝의 [data-theme="dark"] 에서 바꾼다. */

    /* 화면 틀 — 폰(360 까지 · 아래 홈 표시줄 안전 영역 34) · 데스크톱 웹(브라우저 창). 높이는 --pov-h 로 받는다 */
    .pov-frame {
      --pov-safe-bottom: 0px;
      overflow: hidden;
      width: 100%;
      min-width: 0;
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-r4);
      background: var(--color-bg-layer-default);
      font-family: var(--font-sans);
    }
    .pov-frame--phone { --pov-safe-bottom: 34px; max-width: 360px; }
    .pov-frame-bar { display: flex; align-items: center; gap: 6px; height: 28px; padding: 0 12px; background: var(--color-bg-neutral-weak); }
    .pov-frame-bar > span { width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--color-stroke-neutral-weak); }
    .pov-viewport { position: relative; isolation: isolate; height: var(--pov-h, 600px); overflow: hidden; }
    .pov-page { height: 100%; overflow: hidden; padding-top: var(--spacing-x6); background: var(--color-bg-layer-default); }
    .pov-frame--desktop .pov-page { padding: var(--spacing-x6) var(--layout-margin) 0; background: var(--color-bg-layer-basement); }
    .pov-page-title { margin-bottom: var(--spacing-x4); padding: 0 var(--spacing-global-gutter); font-size: var(--text-t7); line-height: var(--text-t7--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    .pov-page-lead, .pov-page-body { padding: 0 var(--spacing-global-gutter); }
    .pov-page-lead { margin-bottom: var(--spacing-x4); }
    .pov-frame--desktop :is(.pov-page-title, .pov-page-lead) { padding: 0; }
    .pov-page-card { padding: var(--spacing-x2) 0; border-radius: var(--radius-r4); background: var(--color-bg-layer-default); }
    .pov-frame--desktop .pov-page-body { padding: var(--spacing-x4) var(--spacing-x6) var(--spacing-x6); }
    .pov-home { position: absolute; left: 50%; bottom: 8px; z-index: 999; width: 134px; max-width: 40%; height: 5px; translate: -50% 0; border-radius: var(--radius-full); background: var(--color-fg-neutral); pointer-events: none; }
    /* 칸 옆 안내 — 글 + i 버튼(Button ghost · xsmall · 아이콘만, 팝오버를 연다) */
    .pov-info { display: inline-flex; align-items: center; gap: var(--spacing-x1); font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 500; color: var(--color-fg-neutral); }

    /* 딤 — 화면 전체. 시트 · 대화상자 L2 100, 확인창 L5 300 */
    .pov-scrim { position: absolute; inset: 0; z-index: 100; background: var(--overlay-dim-light); }
    .pov-scrim--alert { z-index: 300; }
    /* 표면 자리 — 시트는 아래 가운데(화면 폭 전체 · 최대 480), 대화상자는 가운데 · 좌우 20 남김, 확인창은 가운데 · 좌우 32 남김 */
    .pov-layer { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 0 var(--spacing-x5); }
    .pov-layer--sheet { align-items: flex-end; padding: 0; }
    .pov-layer--alert { padding: 0 var(--spacing-x8); }

    /* 표면 공통 — 떠 있는 표면 · 머리 · 본문 · 바닥을 세로로 */
    .pov-sheet,
    .pov-dialog,
    .pov-alert,
    .pov-popover {
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: 0;
      background: var(--color-bg-layer-floating);
      color: var(--color-fg-neutral);
      font-family: var(--font-sans);
      text-align: left;
    }

    /* Bottom Sheet — 최대 480 · 화면 높이의 90% 까지 · 위 두 모서리 24 · 그림자 없음, 아래에 안전 영역. L2 시트 101 */
    .pov-sheet {
      z-index: 101;
      width: 100%;
      max-width: 480px;
      max-height: 90%;
      padding-bottom: var(--pov-safe-bottom);
      border-radius: var(--radius-r6) var(--radius-r6) 0 0;
    }
    /* 스냅 높이 — 시트를 화면의 90% 높이로 두고 스냅 높이만큼만 보이게 아래로 내린다(vaul). 절반이면 화면의 0.4(= 시트의 4/9)만큼 — 틀이 아래를 자른다 */
    .pov-sheet--half { height: 90%; translate: 0 calc(100% * 4 / 9); }
    /* 머리 — 위 24 · 아래 16 · 좌우 화면 여백 24, 제목 ↔ 설명 8. 닫기가 있으면 제목 오른쪽 64(24 + 원 28 + 12) */
    .pov-sheet-header { display: flex; flex-shrink: 0; flex-direction: column; gap: var(--spacing-x2); padding: var(--spacing-x6) var(--spacing-global-gutter) var(--spacing-x4); }
    .pov-sheet-title { font-size: var(--text-t8); line-height: var(--text-t8--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    .pov-sheet-header--close .pov-sheet-title { padding-right: calc(28px + var(--spacing-x3)); }
    .pov-sheet-desc { margin: 0; font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 400; color: var(--color-fg-neutral-muted); }
    /* 본문 — 좌우 24, 넘치면 이 안에서 스크롤. 바닥이 없으면 아래 16 을 본문이 가진다 */
    .pov-sheet-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; padding: 0 var(--spacing-global-gutter); }
    .pov-sheet-body:last-child { padding-bottom: var(--spacing-x4); }
    /* 바닥 — 위 12 · 아래 16(그 아래 안전 영역) · 사이 8. 버튼 large 48 — 하나면 폭 전체, 둘이면 반씩 */
    .pov-sheet-footer { display: flex; flex-shrink: 0; gap: var(--spacing-x2); padding: var(--spacing-x3) var(--spacing-global-gutter) var(--spacing-x4); }
    .pov-sheet-footer > .btn { flex: 1 1 0; min-width: 0; }
    /* 손잡이 — 스냅 높이를 둘 때만. 36 × 4 · stroke-neutral-weak · 위 6 · 가로 가운데, 누르는 영역 44 × 44(보조 기술에는 숨긴다). 누름 색은 두지 않는다 */
    .pov-handle { position: absolute; top: var(--spacing-x1_5); left: 50%; z-index: 1; width: 36px; height: 4px; translate: -50% 0; border-radius: var(--radius-full); background: var(--color-stroke-neutral-weak); }
    .pov-handle::before { content: ""; position: absolute; left: 50%; top: 50%; width: 44px; height: 44px; translate: -50% -50%; }

    /* Dialog — medium 480 · large 800(좌우 20 남김 — 표면 자리) · 화면 높이의 80% 까지 · 모서리 20 · 그림자 없음. L2 대화상자 101 */
    .pov-dialog { z-index: 101; width: 480px; max-width: 100%; max-height: 80%; border-radius: var(--radius-r5); }
    .pov-dialog--large { width: 800px; }
    /* 머리 — 위 24 · 좌우 24 · 아래 16, 제목 ↔ 설명 6. 닫기가 있으면 오른쪽 52(24 + 아이콘 22 + 6). 팝오버도 같다 */
    .pov-dialog-header,
    .pov-pop-header { display: flex; flex-shrink: 0; flex-direction: column; gap: var(--spacing-x1_5); padding: var(--spacing-x6) var(--spacing-x6) var(--spacing-x4); }
    .pov-dialog-header--close,
    .pov-pop-header--close { padding-right: calc(var(--spacing-x6) + 22px + var(--spacing-x1_5)); }
    .pov-dialog-title { font-size: var(--text-t8); line-height: var(--text-t8--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    .pov-dialog-desc { margin: 0; font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 400; color: var(--color-fg-neutral-muted); }
    /* 본문 — 좌우 24, 넘치면 이 안에서만 스크롤(머리 · 바닥은 그대로). 바닥이 없으면 아래 24 를 본문이 가진다 */
    .pov-dialog-body,
    .pov-pop-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; padding: 0 var(--spacing-x6); transition: box-shadow var(--motion-duration-color-transition) var(--motion-ease-easing); }
    .pov-dialog-body:last-child,
    .pov-pop-body:last-child { padding-bottom: var(--spacing-x6); }
    /* 머리 없는 팝오버(고르는 패널) — 위 24 를 본문이 가진다 */
    .pov-pop-body:first-child { padding-top: var(--spacing-x6); }
    /* 위로 스크롤됨 — 머리 아래 1px stroke-neutral-subtle(안쪽 그림자). 본문이 첫 자식이면(머리가 없으면) 그리지 않는다 */
    :is(.pov-dialog-body, .pov-pop-body)[data-scrolled]:not(:first-child) { box-shadow: inset 0 1px 0 0 var(--color-stroke-neutral-subtle); }
    /* 넘침 — 아래 48 을 표면 쪽으로 흐린다(마스크). 끝까지 스크롤해도 남으므로 본문 아래 48 을 비워 둔다 */
    :is(.pov-dialog-body, .pov-pop-body)[data-overflow] {
      padding-bottom: 48px;
      -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 48px), transparent);
      mask-image: linear-gradient(to bottom, #000 calc(100% - 48px), transparent);
    }
    /* 넘쳐 스크롤할 수 있는 본문은 키보드로도 스크롤하도록 Tab 이 선다(스크립트가 tabindex 를 단다) — 키보드 포커스에 안쪽 링 2px */
    :is(.pov-dialog-body, .pov-pop-body):focus { outline: none; }
    :is(.pov-dialog-body, .pov-pop-body):focus-visible { outline: 2px solid var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral))); outline-offset: -2px; }
    /* 바닥 — 위 16 · 좌우 24 · 아래 24 · 사이 8, 오른쪽 정렬. 버튼 small 36 */
    .pov-dialog-footer,
    .pov-pop-footer { display: flex; flex-shrink: 0; justify-content: flex-end; gap: var(--spacing-x2); padding: var(--spacing-x4) var(--spacing-x6) var(--spacing-x6); }

    /* Alert Dialog — 최대 272(좌우 32 남김 — 표면 자리) · 안쪽 20 · 모서리 20 · 그림자 없음. L5 확인창 301 */
    .pov-alert { z-index: 301; width: 272px; max-width: 100%; padding: var(--spacing-x5); border-radius: var(--radius-r5); }
    .pov-alert-title { font-size: var(--text-t7); line-height: var(--text-t7--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    /* 설명 — 다른 떠 있는 표면과 달리 짙은 fg-neutral(꼭 읽어야 할 말). 제목 ↔ 설명 6, 제목이 없으면 0 */
    .pov-alert-desc { margin: 0; font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 400; color: var(--color-fg-neutral); }
    .pov-alert-title + .pov-alert-desc { margin-top: var(--spacing-x1_5); }
    /* 버튼 — 위 16 · 사이 8. 버튼마다 반 폭을 바탕으로(늘어나 채운다) 글 폭보다 줄지 않는다 — 나란히(기본)는 [취소] [확정] 반씩,
       한쪽 글이 반을 넘으면 줄이 넘어가고 wrap-reverse 라 둘째(확정)가 위로 간다(둘 다 폭 전체). 하나면 폭 전체. DOM 순서는 늘 [취소] [확정] */
    .pov-alert-footer { display: flex; flex-wrap: wrap-reverse; gap: var(--spacing-x2); padding-top: var(--spacing-x4); }
    .pov-alert-footer > .btn { flex: 1 1 calc(50% - var(--spacing-x2) / 2); min-width: max-content; }

    /* Popover — 폭 320 ~ 480(가용 폭까지) · 높이 600 까지 · 모서리 20 · 그림자 s3. 트리거 아래 8 · 왼쪽 맞춤. L3 팝오버 200 */
    .pov-anchor { position: relative; display: flex; flex-direction: column; align-items: flex-start; }
    .pov-popover {
      position: absolute;
      top: calc(100% + var(--spacing-x2));
      left: 0;
      z-index: 200;
      width: max-content;
      min-width: min(320px, 100%);
      max-width: min(480px, 100%);
      max-height: 600px;
      border-radius: var(--radius-r5);
      box-shadow: var(--shadow-s3);
    }
    .pov-pop-title { font-size: var(--text-t7); line-height: var(--text-t7--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    .pov-pop-desc { margin: 0; font-size: var(--text-t4); line-height: var(--text-t4--line-height); font-weight: 400; color: var(--color-fg-neutral-muted); }
    /* 안내 글 — 본문의 짧은 해요체 문장. 레시피(PopoverBody)는 글자 모양을 정하지 않아 표면의 fg-neutral 을 물려받는다 — 크기는 본문 글(t5)로 그렸다 */
    .pov-pop-text { margin: 0; font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 400; color: inherit; }

    /* 표면 안의 목록 — 줄이 제 좌우 24 를 가지므로 본문 여백 밖(표면 끝)까지 낸다 */
    .pov-bleed { margin-inline: calc(-1 * var(--spacing-x6)); }

    /* 닫기 — 이름 "닫기". 시트 28 원(누르는 영역 44), 대화상자 · 팝오버 투명 52 상자. 바탕은 color-transition, 축소는 pressed-scale 시간으로 바뀐다 */
    .pov-close {
      --pov-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      position: absolute;
      z-index: 1;
      display: grid;
      place-items: center;
      margin: 0;
      padding: 0;
      border: 0;
      cursor: pointer;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    /* 시트 — 28 원 bg-neutral-weak · 아이콘 14 fg-neutral, 위 24 · 오른쪽 24. 누르는 영역은 사방 8 넓혀 44 */
    .pov-close--circle {
      --press-basis: 28;
      top: var(--spacing-x6);
      right: var(--spacing-global-gutter);
      width: 28px;
      height: 28px;
      border-radius: var(--radius-full);
      background: var(--color-bg-neutral-weak);
      color: var(--color-fg-neutral);
    }
    .pov-close--circle > svg { width: 14px; height: 14px; }
    .pov-close--circle::before { content: ""; position: absolute; inset: calc(-1 * var(--spacing-x2)); border-radius: var(--radius-full); }
    /* 대화상자 · 팝오버 — 투명 52 상자 · 모서리 12 · 아이콘 22 fg-neutral-subtle. 아이콘이 위 28(팝오버 27) · 오른쪽 24 — 상자는 아이콘보다 사방 15 넓다 */
    .pov-close--box {
      --press-basis: 52;
      top: calc(28px - 15px);
      right: calc(var(--spacing-x6) - 15px);
      width: 52px;
      height: 52px;
      border-radius: var(--radius-r3);
      background: transparent;
      color: var(--color-fg-neutral-subtle);
    }
    .pov-popover > .pov-close--box { top: calc(27px - 15px); }
    .pov-close--box > svg { width: 22px; height: 22px; }
    /* 누름 = 바탕 + 축소, 호버 = 같은 바탕(마우스 있는 기기에서만 · 축소 없음) */
    @media (hover: hover) {
      .pov-close--circle:hover { background: var(--color-bg-neutral-weak-pressed); }
      .pov-close--box:hover { background: var(--color-bg-layer-floating-pressed); }
    }
    .pov-close--circle:active,
    .pov-close--circle.pov-close--pressed { background: var(--color-bg-neutral-weak-pressed); }
    .pov-close--box:active,
    .pov-close--box.pov-close--pressed { background: var(--color-bg-layer-floating-pressed); }
    .pov-close:active,
    .pov-close.pov-close--pressed { scale: calc(1 - 2 / var(--press-basis)); }
    .pov-close:focus-visible,
    .pov-close.pov-close--focus { outline: 2px solid var(--pov-focus-ring); outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) {
      .pov-close:active,
      .pov-close.pov-close--pressed { scale: 1; }
    }

    /* 갤러리 — 데스크톱 틀은 520 이상 칸(대화상자 480 + 좌우 20). 닫기 버튼 표의 칸은 떠 있는 표면 바탕 위에 버튼을 제자리에 둔다 —
       --target 은 누르는 영역을 점선으로 보인다. 모두 갤러리 것이다 */
    .pov-samples--desktop { grid-template-columns: repeat(auto-fill, minmax(min(100%, 520px), 1fr)); }
    .pov-samples--next { margin-top: var(--spacing-xl); }
    .pov-close-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(96px, 1fr)); }
    .pov-close-demo { position: relative; display: inline-grid; place-items: center; width: 84px; height: 76px; border-radius: var(--radius-r3); background: var(--color-bg-layer-floating); box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-subtle); }
    .pov-close-demo > .pov-close { position: relative; top: auto; right: auto; }
    .pov-close-demo--target > .pov-close--circle::before { outline: 1px dashed var(--color-fg-neutral-subtle); }
    .pov-close-demo--target > .pov-close--box { outline: 1px dashed var(--color-fg-neutral-subtle); outline-offset: -1px; }
    @media (max-width: 900px) {
      .pov-close-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(96px, 1fr)); }
    }
    /* 폰 폭 — 줄 이름을 한 줄 전체로 올리고 네 칸을 그 아래에 나란히 둔다(판이 가로로 밀리지 않게) */
    @media (max-width: 600px) {
      .pov-close-matrix .cb-matrix-row { grid-template-columns: repeat(var(--cb-cols), minmax(0, 1fr)); }
      .pov-close-matrix .cb-matrix-row > :first-child { grid-column: 1 / -1; }
      .pov-close-demo { width: 100%; max-width: 84px; }
    }

    /* 다크 — 역할 색을 화면 틀 · 닫기 표 안에서만 다크 짝으로 바꾼다(.psel-list · .plst 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       끼운 .btn · .ptf-* · .plst · .radio 는 저마다의 다크 블록이 다시 바꾼다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝(포커스 링)은 비어서 대체값(중립)으로 떨어진다. 딤은 0.65 */
    [data-theme="dark"] :is(.pov-frame, .pov-close-demo) {
      --color-bg-layer-default: var(--color-bg-layer-default-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-bg-layer-basement: var(--color-bg-layer-basement-dark);
      --color-bg-layer-floating: var(--color-bg-layer-floating-dark);
      --color-bg-layer-floating-pressed: var(--color-bg-layer-floating-pressed-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-bg-neutral-weak-pressed: var(--color-bg-neutral-weak-pressed-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-fg-neutral-muted: var(--color-fg-neutral-muted-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-stroke-neutral-subtle: var(--color-stroke-neutral-subtle-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --shadow-s3: var(--shadow-s3-dark);
    }
    [data-theme="dark"] .pov-scrim { background: var(--overlay-dim-dark); }

    /* === 알림 메시지 — Snackbar · Callout · Page Banner · Result Section ===
       specs/components/snackbar.md · callout.md · page-banner.md · result-section.md(수치 원본은 같은 이름의 .yaml). 구조는 SEED(2026-10-02).
       색은 역할 색만 쓴다 — 옅은 바탕은 bg-*-weak + fg-*-contrast, 짙은 바탕은 bg-*-solid + 흰 글(static-white), 스낵바는 반전 짝(fg-*-inverted, v115).
       누름 = 2px 거리 축소 — 배율 = (기준 − 2) ÷ 기준, 기준 = max(높이, 폭 ÷ 4, 24) 를 페이지 끝 스크립트가 누르는 순간 재서 --press-basis 로 넘긴다(재기 전에는 높이).
       모션 줄이기면 축소하지 않는다. 포커스는 키보드에만 링 2px 이다. --hover · --pressed · --focus 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다.
       다크 짝은 이 블록 끝의 [data-theme="dark"] 에서 바꾼다. */

    /* Snackbar — 자리 .psnack-region 은 화면 아래 가운데(좌우 · 아래 8, 탭 바 · 바닥 버튼이 있으면 그 위 8 · z L6 400). 띠 .psnack 은 짙은 바탕 ·
       최소 44 · 여백 10 · 모서리 8 · 그림자 없음 · 자리 폭을 채우다 최대 464. 아이콘 24(오른쪽 2) → 글과 액션(좌우 6 · 사이 10 · 양 끝) → 보조 기술용 닫기 */
    .psnack-region {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 400;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 var(--spacing-x2) var(--spacing-x2);
      pointer-events: none;
    }
    .psnack-region > * { pointer-events: auto; }
    .psnack {
      /* 액션 글자색 — 공유 토큰(DESIGN.md)에는 브랜드 반전 짝이 없어 띠 글자색(중립)으로 떨어진다 */
      --psnack-action: var(--color-fg-brand-inverted, var(--color-fg-neutral-inverted));
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      max-width: 464px;
      min-height: 44px;
      margin: 0;
      padding: var(--spacing-x2_5);
      border-radius: var(--radius-r2);
      background: var(--color-bg-neutral-inverted);
      box-shadow: none;
      color: var(--color-fg-neutral-inverted);
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      text-align: left;
    }
    /* 아이콘 — 상자 24 안에 오른쪽 2(SEED 와 같은 border-box — 그림은 22). 글은 띠 가장자리에서 16, 아이콘이 있으면 40 */
    .psnack-icon { display: flex; flex-shrink: 0; box-sizing: border-box; width: 24px; height: 24px; padding-right: var(--spacing-x0_5); }
    .psnack-icon > svg { width: 100%; height: 100%; }
    .psnack--positive .psnack-icon { color: var(--color-fg-positive-inverted); }
    .psnack--critical .psnack-icon { color: var(--color-fg-critical-inverted); }
    .psnack-content {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-x2_5);
      min-width: 0;
      padding: 0 var(--spacing-x1_5);
    }
    .psnack-message { min-width: 0; margin: 0; font-weight: 400; color: var(--color-fg-neutral-inverted); }
    /* 액션 — 글 버튼. 누르는 영역은 글 + 좌우 8 × 44(::before — 띠 높이 안에서 위아래로 넓힌다), 누르면 글만 2px 거리로 준다 */
    .psnack-action {
      --press-basis: 24;
      position: relative;
      flex-shrink: 0;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: var(--radius-r1);
      background: transparent;
      color: var(--psnack-action);
      font: inherit;
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .psnack-action::before { content: ""; position: absolute; top: 50%; right: calc(-1 * var(--spacing-x2)); left: calc(-1 * var(--spacing-x2)); height: 44px; translate: 0 -50%; }
    .psnack-action:active,
    .psnack-action.psnack-action--pressed { scale: calc(1 - 2 / var(--press-basis)); }
    /* 보조 기술용 닫기 — 보이지 않고(보조 기술은 읽는다), 키보드 초점이 오면 띠 오른쪽 끝에 44 상자 · X 16 으로 보인다. 위아래 · 오른쪽은 띠 여백(10)만큼 바깥으로 당겨 띠 높이를 그대로 둔다 */
    .psnack-close {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      border: 0;
      background: transparent;
      color: var(--color-fg-neutral-inverted);
      white-space: nowrap;
      clip-path: inset(50%);
      cursor: pointer;
    }
    .psnack-close:focus-visible,
    .psnack-close.psnack-close--focus {
      position: relative;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      margin: calc(-1 * var(--spacing-x2_5)) calc(-1 * var(--spacing-x2_5)) calc(-1 * var(--spacing-x2_5)) 0;
      overflow: visible;
      border-radius: var(--radius-r2);
      clip-path: none;
    }
    .psnack-close > svg { width: 16px; height: 16px; }
    /* 포커스 — 키보드에만 링 2px · 띠 글자색(브랜드 링은 짙은 띠 위에서 3:1 에 못 미친다). 링이 늘 띠 위에 그려지게 액션은 바깥 2 띄우고,
       띠 · 닫기는 띄움 −4(가장자리에서 2 안쪽)다 — 바깥에 그리면 페이지 위라 라이트는 흰 페이지 위 흰 링, 다크는 짙은 페이지 위 짙은 링이 된다
       (snackbar.tsx 와 같다 — snackbar.yaml 의 focusRing.offset 2px 는 띠 · 닫기에서 이 레시피와 다르다) */
    .psnack-action:focus-visible,
    .psnack-action.psnack-action--focus { outline: 2px solid var(--color-fg-neutral-inverted); outline-offset: 2px; }
    .psnack:focus-visible,
    .psnack.psnack--focus,
    .psnack-close:focus-visible,
    .psnack-close.psnack-close--focus { outline: 2px solid var(--color-fg-neutral-inverted); outline-offset: -4px; }
    /* 나타남 150ms(ease-enter) · 사라짐 100ms(ease-exit) — 가운데를 기준점으로 0.8 ↔ 1 · 투명도. 모션 줄이기면 투명도만 */
    @keyframes psnack-enter { from { opacity: 0; scale: 0.8; } to { opacity: 1; scale: 1; } }
    @keyframes psnack-exit { from { opacity: 1; scale: 1; } to { opacity: 0; scale: 0.8; } }
    @keyframes psnack-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes psnack-fade-out { from { opacity: 1; } to { opacity: 0; } }
    .psnack.psnack--enter { animation: psnack-enter var(--motion-duration-d3) var(--motion-ease-enter) both; }
    .psnack.psnack--exit { animation: psnack-exit var(--motion-duration-d2) var(--motion-ease-exit) both; pointer-events: none; }

    /* Callout — 상자 .pcallout · 콘텐츠 폭 · 최소 50 · 안쪽 14 · 모서리 10 · 사이 12. 톤은 색을 --pcallout-* 변수에 담기만 하고 상태가 그 변수를 칠한다.
       제목(700) · 본문(400) · 링크(밑줄)는 한 문단 14 / 19 이고 사이는 띄어쓰기 두 칸이다 — 진짜 글자(.pcallout-space · pre-wrap)라 복사해도 이어 붙지 않고 그 뒤에서 줄을 바꿀 수 있다 */
    .pcallout {
      --pcallout-bg: var(--color-bg-neutral-weak);
      --pcallout-bg-pressed: var(--color-bg-neutral-weak-pressed);
      --pcallout-fg: var(--color-fg-neutral);
      /* 포커스 링 — 공유 토큰(DESIGN.md)에는 브랜드 역할 색이 없어 중립으로 떨어진다(.pchip · .ptab-list 와 같은 대체 사슬) */
      --pcallout-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      --press-basis: 50;
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--spacing-x3);
      box-sizing: border-box;
      width: 100%;
      min-height: 50px;
      margin: 0;
      padding: var(--spacing-x3_5);
      border: 0;
      border-radius: var(--radius-r2_5);
      background: var(--pcallout-bg);
      color: var(--pcallout-fg);
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 400;
      text-align: left;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pcallout--informative { --pcallout-bg: var(--color-bg-informative-weak); --pcallout-bg-pressed: var(--color-bg-informative-weak-pressed); --pcallout-fg: var(--color-fg-informative-contrast); }
    .pcallout--positive { --pcallout-bg: var(--color-bg-positive-weak); --pcallout-bg-pressed: var(--color-bg-positive-weak-pressed); --pcallout-fg: var(--color-fg-positive-contrast); }
    .pcallout--warning { --pcallout-bg: var(--color-bg-warning-weak); --pcallout-bg-pressed: var(--color-bg-warning-weak-pressed); --pcallout-fg: var(--color-fg-warning-contrast); }
    .pcallout--critical { --pcallout-bg: var(--color-bg-critical-weak); --pcallout-bg-pressed: var(--color-bg-critical-weak-pressed); --pcallout-fg: var(--color-fg-critical-contrast); }
    .pcallout-icon, .pcallout-suffix { display: flex; flex-shrink: 0; }
    .pcallout-icon > svg, .pcallout-suffix > svg { width: 16px; height: 16px; }
    .pcallout-content { display: block; flex: 1 1 auto; min-width: 0; margin: 0; }
    .pcallout-space, .pbanner-space { white-space: pre-wrap; }
    .pcallout-title { font-weight: 700; }
    .pcallout-link { display: inline-block; border-radius: var(--radius-r1); color: inherit; text-decoration: underline; text-underline-offset: 2px; }
    /* 전체 누르기 — 상자가 버튼이다. 호버(웹) = 누름 바탕, 누름 = 누름 바탕 + 상자 전체 2px 거리 축소 */
    .pcallout--actionable { cursor: pointer; -webkit-tap-highlight-color: transparent; }
    @media (hover: hover) {
      .pcallout--actionable:hover { background: var(--pcallout-bg-pressed); }
    }
    .pcallout--actionable.pcallout--hover { background: var(--pcallout-bg-pressed); }
    .pcallout--actionable:active,
    .pcallout--actionable.pcallout--pressed { background: var(--pcallout-bg-pressed); scale: calc(1 - 2 / var(--press-basis)); }
    /* 닫기 — 40 투명 상자 · 모서리 8, 바깥 여백 −12 로 줄 높이를 늘리지 않는다(아이콘은 오른쪽 끝에서 14). 호버 · 누름 = 톤의 누름 바탕, 누르면 닫기만 준다(기준 40) */
    .pcallout-close {
      --press-basis: 40;
      position: relative;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin: calc(-1 * var(--spacing-x3));
      padding: 0;
      border: 0;
      border-radius: var(--radius-r2);
      background: transparent;
      color: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pcallout-close > svg { width: 16px; height: 16px; }
    @media (hover: hover) {
      .pcallout-close:hover { background: var(--pcallout-bg-pressed); }
    }
    .pcallout-close.pcallout-close--hover { background: var(--pcallout-bg-pressed); }
    .pcallout-close:active,
    .pcallout-close.pcallout-close--pressed { background: var(--pcallout-bg-pressed); scale: calc(1 - 2 / var(--press-basis)); }
    .pcallout--actionable:focus-visible,
    .pcallout--actionable.pcallout--focus,
    .pcallout-link:focus-visible,
    .pcallout-link.pcallout-link--focus,
    .pcallout-close:focus-visible,
    .pcallout-close.pcallout-close--focus { outline: 2px solid var(--pcallout-focus-ring); outline-offset: 2px; }

    /* Page Banner — 띠 .pbanner · 화면 폭 · 모서리 0 · 최소 40 · 위아래 10 · 좌우 화면 여백 24. 안 .pbanner-inner(아이콘 ↔ 글 8 · 아이콘은 첫 줄에 붙고 화살표 · 닫기는 가운데).
       글과 버튼 .pbanner-content 는 한 줄에 양 끝이고, 안 들어가면 버튼이 다음 줄 본문 시작선으로 간다(사이 6). 옅은 바탕(weak)은 Callout 과 같은 짝, 짙은 바탕(solid)은 흰 글 */
    .pbanner {
      --pbanner-bg: var(--color-bg-neutral-weak);
      --pbanner-bg-pressed: var(--color-bg-neutral-weak-pressed);
      --pbanner-fg: var(--color-fg-neutral);
      --pbanner-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      --press-basis: 40;
      position: relative;
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      margin: 0;
      padding: var(--spacing-x2_5) var(--spacing-global-gutter);
      border: 0;
      border-radius: 0;
      background: var(--pbanner-bg);
      color: var(--pbanner-fg);
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      text-align: left;
      transition: background-color var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    .pbanner--weak.pbanner--informative { --pbanner-bg: var(--color-bg-informative-weak); --pbanner-bg-pressed: var(--color-bg-informative-weak-pressed); --pbanner-fg: var(--color-fg-informative-contrast); }
    .pbanner--weak.pbanner--positive { --pbanner-bg: var(--color-bg-positive-weak); --pbanner-bg-pressed: var(--color-bg-positive-weak-pressed); --pbanner-fg: var(--color-fg-positive-contrast); }
    .pbanner--weak.pbanner--warning { --pbanner-bg: var(--color-bg-warning-weak); --pbanner-bg-pressed: var(--color-bg-warning-weak-pressed); --pbanner-fg: var(--color-fg-warning-contrast); }
    .pbanner--weak.pbanner--critical { --pbanner-bg: var(--color-bg-critical-weak); --pbanner-bg-pressed: var(--color-bg-critical-weak-pressed); --pbanner-fg: var(--color-fg-critical-contrast); }
    /* 짙은 바탕의 포커스 링은 띠 글자색(currentColor — 흰 글 · neutral 은 fg-neutral-inverted) — 브랜드 링은 짙은 바탕 위 1.0 ~ 3.2:1 이라 보이지 않는다 */
    .pbanner--solid { --pbanner-focus-ring: currentColor; }
    .pbanner--solid.pbanner--neutral { --pbanner-bg: var(--color-bg-neutral-inverted); --pbanner-bg-pressed: var(--color-bg-neutral-inverted-pressed); --pbanner-fg: var(--color-fg-neutral-inverted); }
    .pbanner--solid.pbanner--informative { --pbanner-bg: var(--color-bg-informative-solid); --pbanner-bg-pressed: var(--color-bg-informative-solid-pressed); --pbanner-fg: var(--color-static-white); }
    .pbanner--solid.pbanner--positive { --pbanner-bg: var(--color-bg-positive-solid); --pbanner-bg-pressed: var(--color-bg-positive-solid-pressed); --pbanner-fg: var(--color-static-white); }
    .pbanner--solid.pbanner--warning { --pbanner-bg: var(--color-bg-warning-solid); --pbanner-bg-pressed: var(--color-bg-warning-solid-pressed); --pbanner-fg: var(--color-static-white); }
    .pbanner--solid.pbanner--critical { --pbanner-bg: var(--color-bg-critical-solid); --pbanner-bg-pressed: var(--color-bg-critical-solid-pressed); --pbanner-fg: var(--color-static-white); }
    .pbanner-inner {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-x2);
      width: 100%;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pbanner-icon { display: flex; flex-shrink: 0; margin-top: var(--spacing-x0_5); }
    .pbanner-icon > svg, .pbanner-suffix > svg { width: 16px; height: 16px; }
    .pbanner-content { display: flex; flex: 1 1 auto; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--spacing-x1_5); min-width: 0; }
    .pbanner-text { display: block; min-width: 0; margin: 0; }
    .pbanner-title { font-weight: 700; }
    .pbanner-desc { font-weight: 500; }
    .pbanner-suffix { display: flex; flex-shrink: 0; align-self: center; }
    /* 버튼 — 글 버튼 하나 · 13 / 18 · 700. 누르는 높이 40 = 글 + 사방 11, 바깥 여백 −11 로 띠 높이를 늘리지 않는다. 누르면 버튼만 준다(바탕 없음) */
    .pbanner-button {
      --press-basis: 40;
      position: relative;
      flex-shrink: 0;
      margin: -11px;
      padding: 11px;
      border: 0;
      border-radius: var(--radius-r1);
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: var(--text-t3);
      line-height: var(--text-t3--line-height);
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    /* 닫기 — 40 투명 상자 · 모서리 8, 바깥 여백 −12(아이콘은 오른쪽 끝에서 24 · 글과 8). 누르면 닫기만 준다(바탕 없음) */
    .pbanner-close {
      --press-basis: 40;
      position: relative;
      display: flex;
      flex-shrink: 0;
      align-self: center;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin: calc(-1 * var(--spacing-x3));
      padding: 0;
      border: 0;
      border-radius: var(--radius-r2);
      background: transparent;
      color: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pbanner-close > svg { width: 16px; height: 16px; }
    .pbanner-button:active,
    .pbanner-button.pbanner-button--pressed,
    .pbanner-close:active,
    .pbanner-close.pbanner-close--pressed { scale: calc(1 - 2 / var(--press-basis)); }
    /* 전체 누르기 — 띠가 버튼이다. 호버(웹) = 누름 바탕, 누름 = 누름 바탕 + 안의 내용만 2px 거리 축소(바탕은 그대로 — 기준은 띠) */
    .pbanner--actionable { cursor: pointer; -webkit-tap-highlight-color: transparent; }
    @media (hover: hover) {
      .pbanner--actionable:hover { background: var(--pbanner-bg-pressed); }
    }
    .pbanner--actionable.pbanner--hover { background: var(--pbanner-bg-pressed); }
    .pbanner--actionable:active,
    .pbanner--actionable.pbanner--pressed { background: var(--pbanner-bg-pressed); }
    .pbanner--actionable:active > .pbanner-inner,
    .pbanner--actionable.pbanner--pressed > .pbanner-inner { scale: calc(1 - 2 / var(--press-basis)); }
    /* 포커스 — 키보드에만 안쪽 링 2px(띄움 −2) — 화면 끝까지 차는 띠라 바깥 링이 잘린다. 버튼 · 닫기도 같다.
       링은 띠 위에 그려지므로 옅은 바탕은 stroke-focus-ring, 짙은 바탕은 띠 글자색이다(page-banner.tsx 의 RING · outline-current) */
    .pbanner--actionable:focus-visible,
    .pbanner--actionable.pbanner--focus,
    .pbanner-button:focus-visible,
    .pbanner-button.pbanner-button--focus,
    .pbanner-close:focus-visible,
    .pbanner-close.pbanner-close--focus { outline: 2px solid var(--pbanner-focus-ring); outline-offset: -2px; }

    /* Result Section — .presult 는 놓인 자리의 가로 · 세로 가운데에 선다(남는 높이를 채운다) · 좌우 48 · 위아래 16. 아이콘 40(선 1.5) · 아래 16.
       large 는 제목 t8 22 / 30 · 설명 t5 16 / 22(위 12) · 버튼 위 28, medium 은 제목 t5 16 / 22 · 설명 t4 14 / 19(위 8) · 버튼 위 24.
       버튼은 위아래로 사이 20 — 첫 버튼 Button neutralWeak medium 40, 둘째 Button ghost small 36(위아래로 8 블리드해 글 자리만 차지 — 보이는 상자 사이는 12, SEED 와 같다) */
    .presult {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: var(--spacing-x4) var(--spacing-x12);
      font-family: var(--font-sans);
      text-align: center;
    }
    .presult-asset { display: flex; margin-bottom: var(--spacing-x4); color: var(--color-fg-neutral-subtle); }
    .presult-asset > svg { width: 40px; height: 40px; stroke-width: 1.5; }
    .presult--failure .presult-asset { color: var(--color-fg-critical); }
    .presult--done .presult-asset { color: var(--color-fg-positive); }
    .presult-title { margin: 0; color: var(--color-fg-neutral); font-size: var(--text-t8); line-height: var(--text-t8--line-height); font-weight: 700; }
    .presult-desc { margin: var(--spacing-x3) 0 0; color: var(--color-fg-neutral-muted); font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 400; }
    .presult-actions { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-x5); margin-top: var(--spacing-x7); }
    .presult--medium .presult-title { font-size: var(--text-t5); line-height: var(--text-t5--line-height); }
    .presult--medium .presult-desc { margin-top: var(--spacing-x2); font-size: var(--text-t4); line-height: var(--text-t4--line-height); }
    .presult--medium .presult-actions { margin-top: var(--spacing-x6); }
    .presult-secondary { margin-block: calc(-1 * var(--spacing-x2)); }

    /* 모션 줄이기 — 축소하지 않고, 띠는 투명도로만 나타나고 사라진다 */
    @media (prefers-reduced-motion: reduce) {
      .psnack-action:active,
      .psnack-action.psnack-action--pressed,
      .pcallout--actionable:active,
      .pcallout--actionable.pcallout--pressed,
      .pcallout-close:active,
      .pcallout-close.pcallout-close--pressed,
      .pbanner-button:active,
      .pbanner-button.pbanner-button--pressed,
      .pbanner-close:active,
      .pbanner-close.pbanner-close--pressed,
      .pbanner--actionable:active > .pbanner-inner,
      .pbanner--actionable.pbanner--pressed > .pbanner-inner { scale: 1; }
      .psnack.psnack--enter { animation-name: psnack-fade-in; }
      .psnack.psnack--exit { animation-name: psnack-fade-out; }
    }

    /* 다크 — 역할 색을 알림 메시지 · 갤러리 틀 안에서만 다크 짝으로 바꾼다(.pchip · .ptab-list 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       끼운 .btn · .plst · .ptf-* 는 저마다의 다크 블록이 바꾼다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝(fg-brand-inverted · 포커스 링)은 비어서 위 대체값(중립)으로 떨어진다 */
    [data-theme="dark"] :is(.psnack, .psnack-region, .pcallout, .pbanner, .presult, .pfb-strip, .pfb-phone, .pfb-desk, .pfb-top, .pfb-stage, .pfb-band) {
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-bg-neutral-inverted-pressed: var(--color-bg-neutral-inverted-pressed-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-fg-positive-inverted: var(--color-fg-positive-inverted-dark);
      --color-fg-critical-inverted: var(--color-fg-critical-inverted-dark);
      --color-fg-brand-inverted: var(--color-fg-brand-inverted-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-bg-neutral-weak-pressed: var(--color-bg-neutral-weak-pressed-dark);
      --color-bg-informative-weak: var(--color-bg-informative-weak-dark);
      --color-bg-informative-weak-pressed: var(--color-bg-informative-weak-pressed-dark);
      --color-bg-positive-weak: var(--color-bg-positive-weak-dark);
      --color-bg-positive-weak-pressed: var(--color-bg-positive-weak-pressed-dark);
      --color-bg-warning-weak: var(--color-bg-warning-weak-dark);
      --color-bg-warning-weak-pressed: var(--color-bg-warning-weak-pressed-dark);
      --color-bg-critical-weak: var(--color-bg-critical-weak-dark);
      --color-bg-critical-weak-pressed: var(--color-bg-critical-weak-pressed-dark);
      --color-bg-informative-solid: var(--color-bg-informative-solid-dark);
      --color-bg-informative-solid-pressed: var(--color-bg-informative-solid-pressed-dark);
      --color-bg-positive-solid: var(--color-bg-positive-solid-dark);
      --color-bg-positive-solid-pressed: var(--color-bg-positive-solid-pressed-dark);
      --color-bg-warning-solid: var(--color-bg-warning-solid-dark);
      --color-bg-warning-solid-pressed: var(--color-bg-warning-solid-pressed-dark);
      --color-bg-critical-solid: var(--color-bg-critical-solid-dark);
      --color-bg-critical-solid-pressed: var(--color-bg-critical-solid-pressed-dark);
      --color-fg-informative-contrast: var(--color-fg-informative-contrast-dark);
      --color-fg-positive-contrast: var(--color-fg-positive-contrast-dark);
      --color-fg-warning-contrast: var(--color-fg-warning-contrast-dark);
      --color-fg-critical-contrast: var(--color-fg-critical-contrast-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-muted: var(--color-fg-neutral-muted-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --color-fg-critical: var(--color-fg-critical-dark);
      --color-fg-positive: var(--color-fg-positive-dark);
      --color-bg-layer-default: var(--color-bg-layer-default-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-bg-layer-basement: var(--color-bg-layer-basement-dark);
      --color-stroke-neutral-subtle: var(--color-stroke-neutral-subtle-dark);
    }

    /* 알림 메시지 갤러리 — 띠 · 상자 · 결과는 흰 표면(.vignette-card) 위에 둔다(옅은 회색 톤 bg-neutral-weak 가 페이지 바탕 bg-layer-basement 와 같은 gray-200 이다).
       견본 틀(.ptf-samples · .ptf-cap)과 상태 표(.cb-matrix)는 Text Field 갤러리 것이다. .pfb-strip 은 폰 폭(안쪽 360)에 자리 여백 8 을 둔 띠 견본 칸,
       .pfb-phone 은 폰 화면(안쪽 360 — 머리 · 목록 · 탭 바 56), .pfb-desk 는 데스크톱 웹 화면, .pfb-top 은 머리와 그 바로 아래 페이지 배너만 그린 화면 윗부분,
       .pfb-band 는 띠 하나를 떼어 놓은 칸, .pfb-stage 는 결과 하나를 가운데에 둔 흰 판이다. 모두 갤러리 것이고 알림 메시지의 일부가 아니다 */
    .pfb-strip {
      position: relative;
      box-sizing: content-box;
      max-width: 344px;
      padding: var(--spacing-x4) var(--spacing-x2);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-r4);
      background: var(--color-bg-layer-default);
    }
    .pfb-strips { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 362px), 1fr)); gap: var(--spacing-lg); }
    .pfb-phone,
    .pfb-desk {
      position: relative;
      isolation: isolate;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-r4);
      background: var(--color-bg-layer-default);
      font-family: var(--font-sans);
    }
    .pfb-phone { box-sizing: content-box; max-width: 360px; }
    .pfb-phone--screen { height: 560px; }
    .pfb-phone--tabbar > .psnack-region { bottom: 56px; }
    .pfb-phone--basement { background: var(--color-bg-layer-basement); }
    .pfb-desk { box-sizing: border-box; width: 100%; max-width: 760px; }
    .pfb-desk--tall { height: 360px; }
    .pfb-phone-head { padding: var(--spacing-x6) var(--spacing-global-gutter) var(--spacing-x4); }
    .pfb-desk-head { padding: var(--spacing-x8) var(--spacing-global-gutter) var(--spacing-x4); }
    .pfb-phone-head > .ptf-screen-title,
    .pfb-desk-head > .ptf-screen-title,
    .pfb-top-head > .ptf-screen-title { margin-bottom: 0; }
    .pfb-phone-body,
    .pfb-desk-body { flex: 1 1 auto; min-height: 0; overflow: hidden; }
    .pfb-phone-body--center { display: flex; flex-direction: column; }
    .pfb-tabbar {
      position: relative;
      z-index: 1;
      display: grid;
      flex-shrink: 0;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      height: 56px;
      background: var(--color-bg-layer-default);
      box-shadow: inset 0 1px 0 var(--color-stroke-neutral-subtle);
    }
    .pfb-tab { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--spacing-x0_5); color: var(--color-fg-neutral-subtle); font-size: var(--text-t1); line-height: var(--text-t1--line-height); font-weight: 500; }
    .pfb-tab > svg { width: 22px; height: 22px; }
    .pfb-tab--on { color: var(--color-fg-neutral); }
    .pfb-card-title { padding: 0 var(--spacing-global-gutter) var(--spacing-x2); color: var(--color-fg-neutral); font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 700; }
    .pfb-card { display: flex; flex-direction: column; min-height: 200px; margin: 0 var(--spacing-x4) var(--spacing-x6); overflow: hidden; border-radius: var(--radius-r4); background: var(--color-bg-layer-default); }
    .pfb-card:focus { outline: none; }
    .pfb-top {
      box-sizing: content-box;
      max-width: 360px;
      overflow: hidden;
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-r4);
      background: var(--color-bg-layer-default);
      font-family: var(--font-sans);
    }
    .pfb-top--wide { max-width: none; margin-bottom: var(--spacing-sm); }
    .pfb-top-head { padding: var(--spacing-x4) var(--spacing-global-gutter) var(--spacing-x3); }
    .pfb-top-body { display: flex; flex-direction: column; gap: var(--spacing-x2); padding: var(--spacing-x4) var(--spacing-global-gutter); }
    .pfb-top-body > span { display: block; height: 10px; border-radius: var(--radius-full); background: var(--color-bg-layer-basement); }
    .pfb-top-body > span:last-child { width: 60%; }
    .pfb-band { overflow: hidden; border: 1px solid var(--color-border-default); }
    .pfb-stage { display: flex; flex-direction: column; min-height: 360px; border-radius: var(--radius-lg); background: var(--color-bg-layer-default); box-shadow: var(--shadow-sm); }
    .pfb-note { margin: 0 0 var(--spacing-lg); }
    .pfb-gap { margin-top: var(--spacing-xl); }
    .pfb-cell { display: block; min-width: 0; }
    .pfb-results > .pfb-wide { grid-column: 1 / -1; }
    .pcallout-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(240px, 1fr)); align-items: start; }
    .pbanner-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(240px, 1fr)); align-items: start; }
    .pcallout-matrix--states .cb-matrix-row,
    .pbanner-matrix--states .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(220px, 1fr)); }
    .pbanner-matrix--states { margin-top: var(--spacing-xl); }
    @media (max-width: 900px) {
      .pcallout-matrix .cb-matrix-row,
      .pbanner-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(240px, 1fr)); }
      .pcallout-matrix--states .cb-matrix-row,
      .pbanner-matrix--states .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(220px, 1fr)); }
    }
    /* 직접 띄워 보기 — 왼쪽 폰, 오른쪽 버튼 · 남은 시간(좁으면 위아래) */
    .pfb-live { display: grid; grid-template-columns: minmax(0, 362px) minmax(0, 1fr); gap: var(--spacing-xl); align-items: start; }
    .pfb-live-buttons { display: flex; flex-wrap: wrap; gap: var(--spacing-x2); }
    .pfb-live-status { min-height: 1.4em; margin: var(--spacing-md) 0 0; font-size: var(--text-caption); line-height: 1.4; color: var(--color-text-tertiary); font-variant-numeric: tabular-nums; }
    @media (max-width: 900px) {
      .pfb-live { grid-template-columns: minmax(0, 1fr); }
    }

    /* === Menu · Menu Sheet · Help Bubble · Tooltip — specs/components/menu.md · menu-sheet.md · help-bubble.md · tooltip.md(수치는 menu.yaml · menu-sheet.yaml ·
       help-bubble.yaml) · specs/z-index.md ===
       구조는 SEED Menu · Swipeable Menu Sheet · Help Bubble · Help Bubble Tooltip(2026-10-02).
       메뉴 .pmenu(role=menu)는 폭 200 · bg-layer-floating · 모서리 20 · shadow-s3 · 위아래 8 의 떠 있는 표면이다(L3 200 · 비모달 — 글이 길면 폭을 늘리지 않고 줄을 바꾼다).
       묶음 .pmenu-group 사이에만 선 .pmenu-divider(1px stroke-neutral-subtle · 좌우 16 들임 · 위아래 8)를 긋고, 묶음 이름 .pmenu-label 은 t3 · fg-neutral-subtle · 위아래 8 · 좌우 16 이다.
       줄 .pmenu-item 은 위아래 10 · 좌우 16 이고 콘텐츠 .pmenu-item-content(앞 아이콘 18 · 이름 t4 · 설명 t2 · 뒤 아이콘 16, 사이 8)는 누르면 2px 거리로 준다 — 한 줄 39 · 설명이 붙으면 57.
       알약(호버 · 누름 바탕)은 ::before 가 좌우 8 들여 모서리 12 · bg-layer-floating-pressed 로 칠하고, 키보드 링은 ::after 가 같은 자리 안쪽에 2px 로 그린다(바탕 없음) —
       호버와 키보드 위치는 따로 움직여 둘 다 보일 수 있다. 위험한 줄(--critical)은 이름 · 아이콘만 fg-critical, 막힌 줄(aria-disabled)은 fg-disabled 이고 알약이 생기지 않는다.
       메뉴 시트 .pmsheet 는 최대 480 · 위 두 모서리 20 · 위 24 · 좌우 24 · 아래 16 + 안전 영역, 그림자 없음이다(L2 시트 101 — 딤은 03k 의 .pov-scrim). 손잡이 .pmsheet-handle(36 × 4 · 위 6) ·
       머리 .pmsheet-header(가운데 — 제목 t6 700 · 설명 t4 fg-neutral-muted · 사이 4 · 아래 16) · 목록 .pmsheet-list(묶음 사이 10) · 묶음 .pmsheet-group(bg-neutral-weak · 모서리 16) ·
       줄 .pmsheet-item(최소 52 · 위아래 14 · 좌우 16 · 아이콘 22 · 이름 t5 · 설명 t3 500 · 사이 14, 줄 사이 1px stroke-neutral-weak 를 줄 안쪽 아래에 — 묶음의 마지막 줄은 없다) ·
       보조 기술용 닫기 .pmsheet-close(평소에는 화면에서 숨기고 초점이 오면 보인다 — 링은 바깥 2px)로 짠다. 호버 · 누름은 줄 바탕 bg-neutral-weak-pressed 이고, 그동안 설명은 fg-neutral-muted ·
       위험한 줄의 이름 · 아이콘은 fg-critical-contrast 다(누름 바탕 위 4.5:1). 키보드 링은 줄 안쪽 2px 이고 묶음 상자가 자른다. 글만(--text-only)은 가운데 정렬이다.
       말풍선 .pbub 는 Help Bubble 과 Tooltip(--tooltip)이 함께 쓴다 — bg-neutral-inverted · 모서리 12 · 위아래 10 · 좌우 12 · 최대 280 · 그림자 없음, 제목 t3 700 · 설명 t3 400(사이 2),
       화살표 .pbub-arrow 12 × 8 · 끝 모서리 2(L4 210). 닫기 .pbub-close 는 오른쪽 위 모서리의 투명 38 상자(아이콘 14 · 누르는 영역 44)이고 링은 말풍선 글자색이다.
       말풍선은 놓인 틀(.pov-viewport)에 뜬 층이다 — 자리(left · top · --pbub-arrow-x · data-side)는 페이지 끝 스크립트가 트리거로 잰다.
       누름 배율 = (기준 − 2) ÷ 기준, 기준 = max(높이, 폭 ÷ 4, 24) — 페이지 끝 스크립트가 누르는 순간 재서 --press-basis 로 넘긴다(재기 전에는 줄 높이).
       --hover · --pressed · --focus 는 갤러리에서 그 순간을 고정해 보여 주는 클래스다. 다크 짝은 이 블록 끝의 [data-theme="dark"] 에서 바꾼다. */

    /* Menu — 트리거 아래 8 · 오른쪽 맞춤(.pmenu-anchor). 아래가 모자라 위로 연 메뉴는 data-side="top" 이다 */
    .pmenu-anchor { position: relative; display: inline-flex; }
    .pmenu-anchor > .pmenu { position: absolute; top: calc(100% + var(--spacing-x2)); right: 0; }
    .pmenu-anchor > .pmenu[data-side="top"] { top: auto; bottom: calc(100% + var(--spacing-x2)); }
    .pmenu {
      --pmenu-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral)));
      position: relative;
      z-index: 200;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 200px;
      max-height: 480px;
      overflow-y: auto;
      padding: var(--spacing-x2) 0;
      border-radius: var(--radius-r5);
      background: var(--color-bg-layer-floating);
      box-shadow: var(--shadow-s3);
      font-family: var(--font-sans);
      font-size: var(--text-t4);
      line-height: var(--text-t4--line-height);
      font-weight: 400;
      color: var(--color-fg-neutral);
      text-align: left;
      outline: none;
    }
    .pmenu[hidden] { display: none; }
    .pmenu-group { display: flex; flex-direction: column; }
    .pmenu-label { padding: var(--spacing-x2) var(--spacing-x4); font-size: var(--text-t3); line-height: var(--text-t3--line-height); font-weight: 400; color: var(--color-fg-neutral-subtle); }
    .pmenu-divider { flex-shrink: 0; height: 1px; margin: var(--spacing-x2) var(--spacing-x4); background: var(--color-stroke-neutral-subtle); }
    .pmenu-item {
      --press-basis: 39;
      position: relative;
      display: flex;
      padding: var(--spacing-x2_5) var(--spacing-x4);
      cursor: pointer;
      user-select: none;
      outline: none;
    }
    /* 알약(::before) · 링(::after) — 모서리 12. 알약은 쉴 때 줄 폭 그대로 투명하고, 호버 · 누름에 좌우 8 들어오며 칠한다(바탕 · 들임이 함께 —
       menu.tsx 의 PILL · PILL_ON). 링은 늘 좌우 8 들인 알약 자리다 */
    .pmenu-item::before,
    .pmenu-item::after {
      content: "";
      position: absolute;
      inset-block: 0;
      inset-inline: var(--spacing-x2);
      border-radius: var(--radius-r3);
      pointer-events: none;
    }
    .pmenu-item::before {
      inset-inline: 0;
      background: transparent;
      transition:
        background-color var(--motion-duration-color-transition) var(--motion-ease-easing),
        inset var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    @media (hover: hover) {
      .pmenu-item:not([aria-disabled="true"]):hover::before { inset-inline: var(--spacing-x2); background: var(--color-bg-layer-floating-pressed); }
    }
    .pmenu-item:not([aria-disabled="true"]):active::before,
    .pmenu-item.pmenu-item--hover::before,
    .pmenu-item.pmenu-item--pressed::before { inset-inline: var(--spacing-x2); background: var(--color-bg-layer-floating-pressed); }
    /* 키보드 링 — 키보드로 옮긴 줄에만 알약 자리 안쪽 2px(바탕은 칠하지 않는다). 마우스로 연 메뉴의 초점에는 그리지 않는다 */
    .pmenu-item:focus-visible::after,
    .pmenu-item.pmenu-item--focus::after { outline: 2px solid var(--pmenu-focus-ring); outline-offset: -2px; }
    /* 콘텐츠 — 앞 아이콘 · 이름(설명) · 뒤 아이콘, 사이 8. 여러 줄이면 아이콘은 세로 가운데. 누르는 동안만 이 층이 준다 */
    .pmenu-item-content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      gap: var(--spacing-x2);
      min-width: 0;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pmenu-item:not([aria-disabled="true"]):active > .pmenu-item-content,
    .pmenu-item.pmenu-item--pressed > .pmenu-item-content { scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .pmenu-item:not([aria-disabled="true"]):active > .pmenu-item-content,
      .pmenu-item.pmenu-item--pressed > .pmenu-item-content { scale: 1; }
    }
    .pmenu-item-icon,
    .pmenu-item-suffix { display: flex; flex-shrink: 0; color: var(--color-fg-neutral); }
    .pmenu-item-icon > svg { width: 18px; height: 18px; }
    .pmenu-item-suffix > svg { width: 16px; height: 16px; }
    .pmenu-item-body { display: flex; flex: 1; flex-direction: column; gap: var(--spacing-x0_5); min-width: 0; }
    .pmenu-item-label { font-size: var(--text-t4); line-height: var(--text-t4--line-height); font-weight: 400; color: var(--color-fg-neutral); }
    .pmenu-item-desc { font-size: var(--text-t2); line-height: var(--text-t2--line-height); font-weight: 400; color: var(--color-fg-neutral-subtle); }
    /* 위험한 동작 — 이름 · 아이콘만 fg-critical(설명은 그대로). 막힌 줄 — 전용 색 fg-disabled · 알약 없음(흐리게 하지 않는다) */
    .pmenu-item--critical :is(.pmenu-item-icon, .pmenu-item-label, .pmenu-item-suffix) { color: var(--color-fg-critical); }
    .pmenu-item[aria-disabled="true"] { cursor: not-allowed; }
    .pmenu-item[aria-disabled="true"] :is(.pmenu-item-icon, .pmenu-item-label, .pmenu-item-desc, .pmenu-item-suffix) { color: var(--color-fg-disabled); }
    /* 열림 150ms(d3) enter — 트리거 쪽 변(오른쪽 위 · 위로 열면 오른쪽 아래)에서 0.95 배부터. 페이지 끝 스크립트가 직접 연 메뉴에만 단다 */
    @keyframes pmenu-in { from { opacity: 0; scale: 0.95; } }
    .pmenu[data-motion="in"] { transform-origin: top right; animation: pmenu-in var(--motion-duration-d3) var(--motion-ease-enter); }
    .pmenu[data-motion="in"][data-side="top"] { transform-origin: bottom right; }

    /* Menu Sheet — 최대 480 · 화면 높이의 90% 까지 · 위 두 모서리 20 · 그림자 없음. 위 24(손잡이 자리) · 좌우 24 · 아래 16 + 안전 영역. L2 시트 101 */
    /* 포커스 링 — 공유 토큰(DESIGN.md)에는 브랜드 역할 색이 없어 중립으로 떨어진다(.pmenu · .pov-close 와 같은 대체 사슬). 상태 표의 칸(.pmsheet-demo)에도 둔다 */
    .pmsheet,
    .pmsheet-demo { --pmsheet-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral))); }
    .pmsheet {
      position: relative;
      z-index: 101;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      max-width: 480px;
      max-height: 90%;
      padding: var(--spacing-x6) var(--spacing-global-gutter) calc(var(--spacing-x4) + var(--pov-safe-bottom, 0px));
      border-radius: var(--radius-r5) var(--radius-r5) 0 0;
      background: var(--color-bg-layer-floating);
      color: var(--color-fg-neutral);
      font-family: var(--font-sans);
      text-align: left;
    }
    .pmsheet-handle { position: absolute; top: var(--spacing-x1_5); left: 50%; width: 36px; height: 4px; translate: -50% 0; border-radius: var(--radius-full); background: var(--color-stroke-neutral-weak); }
    .pmsheet-header { display: flex; flex-shrink: 0; flex-direction: column; gap: var(--spacing-x1); padding-bottom: var(--spacing-x4); text-align: center; }
    .pmsheet-title { font-size: var(--text-t6); line-height: var(--text-t6--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    .pmsheet-desc { margin: 0; font-size: var(--text-t4); line-height: var(--text-t4--line-height); font-weight: 400; color: var(--color-fg-neutral-muted); }
    /* 목록 — 묶음 사이 10(선 없이 간격만). 넘치면 목록만 스크롤한다 */
    .pmsheet-list { display: flex; flex-direction: column; gap: var(--spacing-x2_5); min-height: 0; overflow-y: auto; }
    .pmsheet-group { display: flex; flex-shrink: 0; flex-direction: column; overflow: hidden; border-radius: var(--radius-r4); background: var(--color-bg-neutral-weak); }
    /* 줄 — 최소 52 · 위아래 14 · 좌우 16. 줄 사이 선은 줄 안쪽 아래 1px(안쪽 그림자 — 줄 높이를 바꾸지 않는다), 묶음의 마지막 줄에는 없다 */
    .pmsheet-item {
      --press-basis: 52;
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      min-height: var(--spacing-x13);
      margin: 0;
      padding: var(--spacing-x3_5) var(--spacing-x4);
      border: 0;
      background: transparent;
      box-shadow: inset 0 -1px 0 0 var(--color-stroke-neutral-weak);
      font: inherit;
      color: inherit;
      text-align: left;
      cursor: pointer;
      outline: none;
      transition: background-color var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    .pmsheet-item:last-child { box-shadow: none; }
    @media (hover: hover) {
      .pmsheet-item:not(:disabled):hover { background: var(--color-bg-neutral-weak-pressed); }
    }
    .pmsheet-item:not(:disabled):active,
    .pmsheet-item.pmsheet-item--hover,
    .pmsheet-item.pmsheet-item--pressed { background: var(--color-bg-neutral-weak-pressed); }
    /* 키보드 링 — 줄 안쪽 2px. 묶음 상자(모서리 16 · overflow hidden)가 넘친 링을 자른다 */
    .pmsheet-item:focus-visible,
    .pmsheet-item.pmsheet-item--focus { outline: 2px solid var(--pmsheet-focus-ring); outline-offset: -2px; }
    .pmsheet-item-content {
      display: flex;
      flex: 1;
      align-items: center;
      gap: var(--spacing-x3_5);
      min-width: 0;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pmsheet-item:not(:disabled):active > .pmsheet-item-content,
    .pmsheet-item.pmsheet-item--pressed > .pmsheet-item-content { scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .pmsheet-item:not(:disabled):active > .pmsheet-item-content,
      .pmsheet-item.pmsheet-item--pressed > .pmsheet-item-content { scale: 1; }
    }
    .pmsheet-item-icon { display: flex; flex-shrink: 0; color: var(--color-fg-neutral); }
    .pmsheet-item-icon > svg { width: 22px; height: 22px; }
    .pmsheet-item-body { display: flex; flex: 1; flex-direction: column; gap: var(--spacing-x0_5); min-width: 0; }
    .pmsheet-item-label { font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 400; color: var(--color-fg-neutral); }
    .pmsheet-item-desc { font-size: var(--text-t3); line-height: var(--text-t3--line-height); font-weight: 500; color: var(--color-fg-neutral-subtle); }
    .pmsheet-item--critical :is(.pmsheet-item-icon, .pmsheet-item-label) { color: var(--color-fg-critical); }
    /* 호버 · 누름 바탕(bg-neutral-weak-pressed) 위 — 설명은 fg-neutral-muted, 위험한 줄의 이름 · 아이콘은 fg-critical-contrast(둘 다 4.5:1) */
    @media (hover: hover) {
      .pmsheet-item:not(:disabled):hover .pmsheet-item-desc { color: var(--color-fg-neutral-muted); }
      .pmsheet-item--critical:not(:disabled):hover :is(.pmsheet-item-icon, .pmsheet-item-label) { color: var(--color-fg-critical-contrast); }
    }
    .pmsheet-item:not(:disabled):active .pmsheet-item-desc,
    .pmsheet-item.pmsheet-item--hover .pmsheet-item-desc,
    .pmsheet-item.pmsheet-item--pressed .pmsheet-item-desc { color: var(--color-fg-neutral-muted); }
    .pmsheet-item--critical:not(:disabled):active :is(.pmsheet-item-icon, .pmsheet-item-label),
    .pmsheet-item--critical.pmsheet-item--hover :is(.pmsheet-item-icon, .pmsheet-item-label),
    .pmsheet-item--critical.pmsheet-item--pressed :is(.pmsheet-item-icon, .pmsheet-item-label) { color: var(--color-fg-critical-contrast); }
    .pmsheet-item:disabled { cursor: not-allowed; }
    .pmsheet-item:disabled :is(.pmsheet-item-icon, .pmsheet-item-label, .pmsheet-item-desc) { color: var(--color-fg-disabled); }
    /* 글만 — 가운데 정렬(줄 설명은 두지 않는다) */
    .pmsheet--text-only .pmsheet-item-content { justify-content: center; }
    .pmsheet--text-only .pmsheet-item-body { flex: 0 1 auto; align-items: center; text-align: center; }
    /* 보조 기술용 닫기 — 목록 뒤. 평소에는 화면에서 숨기고(보조 기술은 읽는다) 초점이 오면 최소 52 · 좌우 20 · 모서리 12 · bg-neutral-weak · t5 500 으로 보인다(위 10) */
    .pmsheet-close {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      border: 0;
      white-space: nowrap;
    }
    .pmsheet-close:focus,
    .pmsheet-close.pmsheet-close--focus {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto;
      min-height: var(--spacing-x13);
      margin: var(--spacing-x2_5) 0 0;
      padding: 0 var(--spacing-x5);
      overflow: visible;
      clip-path: none;
      white-space: normal;
      border-radius: var(--radius-r3);
      background: var(--color-bg-neutral-weak);
      font-family: var(--font-sans);
      font-size: var(--text-t5);
      line-height: var(--text-t5--line-height);
      font-weight: 500;
      color: var(--color-fg-neutral);
      cursor: pointer;
      outline: none;
      transition: background-color var(--motion-duration-color-transition) var(--motion-ease-easing);
    }
    @media (hover: hover) {
      .pmsheet-close:hover { background: var(--color-bg-neutral-weak-pressed); }
    }
    .pmsheet-close:active { background: var(--color-bg-neutral-weak-pressed); }
    /* 링 — 바깥 2px · 띄움 2px(버튼과 같다 — 줄이 아니라 묶음 상자 밖에 선다) */
    .pmsheet-close:focus-visible,
    .pmsheet-close.pmsheet-close--focus { outline: 2px solid var(--pmsheet-focus-ring); outline-offset: 2px; }

    /* 말풍선 — 짙은 바탕(다크에서는 밝은 바탕) · 모서리 12 · 위아래 10 · 좌우 12 · 폭은 내용만큼 최대 280 · 그림자 없음, 제목 ↔ 설명 2. L4 210.
       놓인 틀(.pov-viewport)에 뜬 층이다 — 자리는 페이지 끝 스크립트가 트리거로 잰다(재기 전에는 틀 왼쪽 위) */
    .pbub {
      --pbub-arrow-x: 50%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 210;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-x0_5);
      box-sizing: border-box;
      width: max-content;
      max-width: 280px;
      padding: var(--spacing-x2_5) var(--spacing-x3);
      border-radius: var(--radius-r3);
      background: var(--color-bg-neutral-inverted);
      color: var(--color-fg-neutral-inverted);
      font-family: var(--font-sans);
      text-align: left;
    }
    .pbub[hidden] { display: none; }
    /* 포커스 — 닫기 버튼이 없는 말풍선에 Tab 으로 들어오면 둘레 바깥 2px 링 · 띄움 2px(모서리를 따라). 페이지 위에 그려져 브랜드 링이다 —
       공유 토큰(DESIGN.md)에는 브랜드 역할 색이 없어 중립으로 떨어진다(.pmenu · .pov-close 와 같은 대체 사슬) */
    .pbub { --pbub-focus-ring: var(--color-stroke-focus-ring, var(--color-border-focus, var(--color-fg-neutral))); }
    .pbub:focus { outline: none; }
    .pbub:focus-visible,
    .pbub.pbub--focus { outline: 2px solid var(--pbub-focus-ring); outline-offset: 2px; }
    .pbub-title { font-size: var(--text-t3); line-height: var(--text-t3--line-height); font-weight: 700; }
    .pbub-desc { margin: 0; font-size: var(--text-t3); line-height: var(--text-t3--line-height); font-weight: 400; }
    /* 닫기가 있으면 글은 닫기 상자 앞 4 까지 — 상자 38 + 4(help-bubble.tsx 의 CLOSE 는 흐름 안에서 모서리로 당긴 38 상자 · ml-x1) */
    .pbub--close { padding-right: calc(38px + var(--spacing-x1)); }
    /* 화살표 — 12 × 8 · 끝 모서리 2 · 말풍선과 같은 색. 늘 트리거 가운데(--pbub-arrow-x)를 가리킨다 */
    .pbub-arrow { position: absolute; left: var(--pbub-arrow-x); width: 12px; height: 8px; translate: -50% 0; fill: var(--color-bg-neutral-inverted); }
    .pbub[data-side="top"] > .pbub-arrow { top: 100%; }
    .pbub[data-side="bottom"] > .pbub-arrow { bottom: 100%; rotate: 180deg; }
    /* 닫기 — 오른쪽 위 모서리의 투명 38 상자 · 아이콘 14(위 12 · 오른쪽 12) · 누르는 영역 44(사방 3). 누르면 바탕 없이 아이콘만 2px 거리로 준다 */
    .pbub-close {
      --press-basis: 38;
      position: absolute;
      top: 0;
      right: 0;
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: var(--radius-r3);
      background: transparent;
      color: var(--color-fg-neutral-inverted);
      cursor: pointer;
      transition: scale var(--motion-duration-pressed-scale) var(--motion-ease-pressed-scale);
    }
    .pbub-close::before { content: ""; position: absolute; inset: -3px; }
    .pbub-close > svg { width: 14px; height: 14px; }
    .pbub-close:active,
    .pbub-close.pbub-close--pressed { scale: calc(1 - 2 / var(--press-basis)); }
    @media (prefers-reduced-motion: reduce) {
      .pbub-close:active,
      .pbub-close.pbub-close--pressed { scale: 1; }
    }
    /* 포커스 — 키보드에만 닫기 안쪽 2px, 말풍선 글자색(브랜드 링은 짙은 말풍선 위 3:1 미달) */
    .pbub-close:focus { outline: none; }
    .pbub-close:focus-visible,
    .pbub-close.pbub-close--focus { outline: 2px solid var(--color-fg-neutral-inverted); outline-offset: -2px; }
    /* 열림 200ms(d4) enter — 화살표 끝에서 0.9 배부터. 툴팁을 이어서 열면 모션 없이 바로다. 페이지 끝 스크립트가 직접 연 말풍선에만 단다 */
    @keyframes pbub-in { from { opacity: 0; scale: 0.9; } }
    .pbub[data-motion="in"] { transform-origin: var(--pbub-arrow-x) 100%; animation: pbub-in var(--motion-duration-d4) var(--motion-ease-enter); }
    .pbub[data-motion="in"][data-side="bottom"] { transform-origin: var(--pbub-arrow-x) 0; }
    @media (prefers-reduced-motion: reduce) {
      .pmenu[data-motion="in"],
      .pbub[data-motion="in"] { animation: none; }
    }

    /* 갤러리 — 화면 틀 안 머리(제목 + 오른쪽 버튼) · 카드 머리의 툴바 · 남은 연차 줄 · 막힌 버튼의 이유, 상태 표 · 닫기 견본. 모두 갤러리 것이다 */
    .pmenu-page-head { display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-x3); margin-bottom: var(--spacing-x4); padding: 0 var(--spacing-global-gutter); }
    .pmenu-page-head > .pov-page-title { margin-bottom: 0; padding: 0; }
    .pov-frame--desktop .pmenu-page-head { padding: 0; }
    .pmenu-card-head { display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-x3); padding: var(--spacing-x1) var(--spacing-global-gutter); font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 700; color: var(--color-fg-neutral); }
    .pmenu-tools { display: flex; gap: var(--spacing-x1); }
    .pmenu-lead { display: flex; align-items: center; gap: var(--spacing-x1); margin-top: var(--spacing-x4); padding: 0 var(--spacing-global-gutter); font-family: var(--font-sans); font-size: var(--text-t5); line-height: var(--text-t5--line-height); font-weight: 500; color: var(--color-fg-neutral); }
    .pov-frame--desktop .pmenu-lead { padding: 0; }
    .pmenu-reason { display: flex; flex-direction: column; align-items: flex-start; gap: var(--spacing-x1_5); }
    .pmenu-reason-text { margin: 0; font-family: var(--font-sans); font-size: var(--text-t3); line-height: var(--text-t3--line-height); color: var(--color-fg-neutral-subtle); }
    /* 상태 표 — Menu 칸은 메뉴 폭 200 + 여유, Menu Sheet 칸은 칸 폭 그대로(시트 표면 .pmsheet-demo 위 묶음 상자). 줄 사이를 띄운다 */
    .pmenu-matrix-cap { margin-bottom: var(--spacing-sm); font-size: var(--text-caption); font-weight: 600; line-height: 1.4; color: var(--color-text-secondary); }
    .pmenu-matrix-cap--next { margin-top: var(--spacing-xl); }
    .pmenu-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(216px, 1fr)); }
    .pmsheet-matrix .cb-matrix-row { grid-template-columns: 168px repeat(var(--cb-cols), minmax(0, 1fr)); }
    .pmenu-matrix .cb-matrix-cell { padding: var(--spacing-xs) 0; }
    .pmsheet-demo { width: 100%; padding: var(--spacing-x2); border-radius: var(--radius-r3); background: var(--color-bg-layer-floating); box-shadow: inset 0 0 0 1px var(--color-stroke-neutral-subtle); }
    /* 닫기 견본 — 말풍선 바탕 위에 닫기를 제자리에 둔다. --target 은 누르는 영역 44 를 점선으로 보인다 */
    .pbub-close-matrix { margin-top: var(--spacing-xl); }
    .pbub-close-demo { position: relative; display: inline-grid; place-items: center; width: 84px; height: 76px; border-radius: var(--radius-r3); background: var(--color-bg-neutral-inverted); }
    .pbub-close-demo > .pbub-close { position: relative; top: auto; right: auto; }
    .pbub-close-demo--target > .pbub-close::before { outline: 1px dashed var(--color-fg-neutral-inverted); }
    .pbub-demo { display: inline-grid; place-items: center; min-height: 76px; padding-bottom: 8px; }
    .pbub-demo > .pbub { position: relative; left: auto; top: auto; }
    .pbub-na { font-size: var(--text-caption); line-height: 1.4; color: var(--color-text-tertiary); }
    @media (max-width: 900px) {
      .pmenu-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(216px, 1fr)); }
      .pmsheet-matrix .cb-matrix-row { grid-template-columns: 120px repeat(var(--cb-cols), minmax(0, 1fr)); }
    }
    /* 폰 폭 — 상태 줄마다 상태 이름을 한 줄 전체로 올리고 칸을 그 아래 세로로 쌓는다(칸 이름은 칸 위에 — data-col). 머리 줄은 숨긴다 */
    @media (max-width: 600px) {
      .pmenu-matrix .cb-matrix-row { grid-template-columns: minmax(0, 1fr); }
      .pmenu-matrix .cb-matrix-row--head { display: none; }
      .pmenu-matrix .cb-matrix-cell { flex-direction: column; align-items: flex-start; gap: var(--spacing-xs); }
      .pmenu-matrix .cb-matrix-cell::before { content: attr(data-col); font-size: 11px; line-height: 1.4; color: var(--color-text-tertiary); }
      .pbub-close-demo { width: 100%; max-width: 84px; }
    }

    /* 다크 — 역할 색을 메뉴 · 시트 · 말풍선 · 견본 안에서만 다크 짝으로 바꾼다(.pov-frame · .psel-list 와 같다 — 전역 다크 블록은 옛 이름만 바꾼다).
       공유 토큰(DESIGN.md)에 없는 브랜드 짝(포커스 링)은 비어서 대체값(중립)으로 떨어진다 */
    [data-theme="dark"] :is(.pmenu, .pmsheet, .pmsheet-demo, .pbub, .pbub-close-demo, .pmenu-reason) {
      --color-bg-layer-floating: var(--color-bg-layer-floating-dark);
      --color-bg-layer-floating-pressed: var(--color-bg-layer-floating-pressed-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-bg-neutral-weak-pressed: var(--color-bg-neutral-weak-pressed-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-fg-neutral-muted: var(--color-fg-neutral-muted-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --color-fg-critical: var(--color-fg-critical-dark);
      --color-fg-critical-contrast: var(--color-fg-critical-contrast-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-stroke-neutral-subtle: var(--color-stroke-neutral-subtle-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --shadow-s3: var(--shadow-s3-dark);
    }

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

    /* 옛 tabs(.tabs · .tab — container · underline · pills, 브랜드 색 밑줄 · 채움)는 걷었다. 탭은 위 Tabs · Segmented Control 블록의 .ptab-list · .ptab-chips · .pseg 다(tabs.md, 2026-10-02) */

    /* search — 검색칸은 Text Field 블록의 .ptf-input(앞 아이콘 · 지우기)이다. 옛 알약 검색(.search-pill)은 걷었다 */

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

    /* 옛 빈 화면 카드(.empty-card · .empty-illustration · .empty-title · .empty-description · .empty-actions)는 걷었다 — 빈 화면은 알림 메시지 블록(Tabs 블록 뒤)의 Result Section(.presult)이다(result-section.md, 2026-10-02) */

    /* 옛 Modal(.modal-* — 모서리 12 · shadow-xl · 머리 18 22)은 걷었다. 시트 · 대화상자 · 확인창은 Overlays 블록의 .pov-* 다(03k) */

    /* 옛 토스트(.toast-stack · .toast · .toast-content · .toast-title · .toast-body — 흰 카드 · 그림자 · 아이콘 넷)는 걷었다 — 스낵바는 알림 메시지 블록(Tabs 블록 뒤)의 .psnack 이다(snackbar.md, 2026-10-02) */

    /* === Form layout === 폼은 Field 로 짠다 — 위 Text Field 블록의 .ptf-field · .ptf-form · .ptf-screen(field.md "Form 의 구성").
       옛 그림자 카드(.form-card) · 2열 그리드 · 라벨 14 · 빨간 별표 · 회색 채운 칸(.form-input · .form-textarea · .form-select) · 도움말 12 · 경계선 버튼 줄은 걷었다.
       고르는 칸은 위 Select · Input Button 블록의 .psel-trigger · .pib 다(select.md · input-button.md). */

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

    /* Drawer (정적 표시) — 옆 패널(.drw-side, HR · 공유)만 남았다. Side Panel 차례에 다시 정한다. 아래 Drawer 는 03k 의 Bottom Sheet(.pov-sheet)다 */
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
      border: 2px solid var(--color-border-default);
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

    /* Swipe Actions — swipe-actions.md SoT 정합.
       정적 preview 라 제스처가 없다. 열린 상태를 그려 트레이 시각만 보인다.
       방향은 논리 속성(inset-inline-end)으로 둬 RTL 에서 저절로 뒤집힌다. */
    .swipe { position: relative; overflow: hidden; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); background: var(--color-surface-default); }
    .swipe-tray { position: absolute; inset-block: 0; inset-inline-end: 0; display: flex; }
    /* 트레이에 배경을 두지 않는다 — 색은 원형 배지만 갖는다. 간격은 배지 앞에만 둬
       마지막 액션이 화면 끝에 딱 붙는다(뒤에도 두면 덜 열린 것처럼 보인다). */
    .swipe-action { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; flex-shrink: 0; min-block-size: 56px; align-self: stretch; background: transparent; border: 0; font-size: 12px; font-weight: 600; line-height: 1.3; cursor: pointer; inline-size: 48px; padding-inline-start: 12px; }
    .swipe-action:first-child { inline-size: 56px; padding-inline-start: 20px; }
    .swipe-badge { display: flex; align-items: center; justify-content: center; inline-size: 36px; block-size: 36px; border-radius: 50%; }
    .swipe-action--neutral { color: var(--color-text-secondary); }
    .swipe-action--neutral .swipe-badge { background: var(--color-surface-input); color: var(--color-text-primary); }
    .swipe-action--primary { color: var(--color-text-secondary); }
    .swipe-action--primary .swipe-badge { background: var(--color-info); color: var(--color-text-on-accent); }
    .swipe-action--destructive { color: var(--color-error); }
    [data-theme="dark"] .swipe-action--destructive { color: var(--color-error-light); }
    .swipe-action--destructive .swipe-badge { background: var(--color-error); color: var(--color-text-on-accent); }
    .swipe-row { position: relative; display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-md); background: var(--color-surface-default); transition: transform var(--motion-duration-fast) var(--motion-ease-out); }
    @media (prefers-reduced-motion: reduce) { .swipe-row { transition: none; } }
    
    /* 옛 Banner(.banner · .banner-icon · .banner-body · .banner-close — 왼쪽 4px 막대 · 8% 바탕)는 걷었다 — 페이지 배너는 알림 메시지 블록의 .pbanner, 화면 안 안내는 .pcallout 이다(page-banner.md · callout.md, 2026-10-02) */

    /* 옛 Tag / Chip(.chip · .chip-x · .chip--input — 브랜드 10% 바탕 · 칩 안의 입력칸)은 걷었다. 칩은 위 Chip 블록의 .pchip 이다(chip.md, 2026-10-02) */

    /* 옛 Popover(.pop · .pop-trigger — 288 · 모서리 8 · 1px 테두리 · shadow-md)는 걷었다. 팝오버는 Overlays 블록의 .pov-popover 다(03k) */

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

    /* Field 검증(옛 v75 Form validation) — 칸은 Text Field 블록의 Field · 입력칸이다. 맞음 · 확인 중은 설명 글로 쓰고 초록 테두리 · 돌림 표시는 두지 않는다(field.md) */
    .fv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg); }
    .fv-cell { display: flex; flex-direction: column; min-width: 0; }

    /* RTL toggle (v76) */
    .rtl-demo { display: flex; flex-direction: column; gap: var(--spacing-sm); }
    .rtl-row { display: flex; align-items: center; gap: var(--spacing-sm); flex-wrap: wrap; }
    .rtl-btn { display: inline-flex; align-items: center; gap: var(--spacing-xs); }
    /* 검색칸은 Text Field 블록의 .ptf-input(medium · 앞 아이콘) — 줄 안에서 폭을 정해 둔다 */
    .rtl-search { width: min(220px, 100%); }
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

    /* 옛 Menubar(.mb-* — 단축키 표기 막대)는 걷었다. 동작 목록은 Menu 블록의 .pmenu 다(03m) */

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
    /* solid visual (v3) — active 채움 primary + 흰글씨 + 600, shadow 없음 (subtle 과 차이 = 채움 색). */
    .tgg--solid .tgg-item--active { background: var(--color-primary); color: var(--color-text-on-accent, #fff); }

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

    /* 옛 Hover Card(.hc-* — 호버로 여는 프로필 카드) · Context Menu(.ctx-* — 160 · 1px 테두리 · shadow-md)는 걷었다. 동작 목록은 Menu 블록의 .pmenu 다(03m) */

    /* 옛 Alert Dialog(.ad-* — 아이콘 원 · 오른쪽 버튼)는 걷었다. 확인창은 Overlays 블록의 .pov-alert 다(03k) */

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

    /* 옛 Sonner 쌓기(.son · .son-toast)는 걷었다 — 19 의 Snackbar 칸은 알림 메시지 블록의 .psnack 이다(2026-10-02) */

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

    /* ColorSwatch — color-swatch.md SoT (palette grid single-select) */
    .csw { display: grid; gap: var(--spacing-sm); }
    .csw-cell { position: relative; aspect-ratio: 1; border: 2px solid transparent; border-radius: var(--radius-tile); cursor: pointer; transition: transform var(--motion-duration-fast) var(--motion-ease-out); display: inline-flex; align-items: center; justify-content: center; padding: 0; font: inherit; }
    .csw-cell:hover { transform: scale(1.05); }
    .csw-cell--active { border-color: currentColor; }

    /* IconPicker — icon-picker.md SoT (popover trigger + grid 8-col) */
    .ipk-trigger { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: 1px solid var(--color-border-default); background: var(--color-surface-default); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); cursor: pointer; color: var(--color-text-primary); font: inherit; }
    .ipk-trigger:hover { background: var(--color-surface-input); }
    /* 열린 표면은 Popover 다(icon-picker.tsx 의 PopoverContent) — 옛 1px 테두리 · 모서리 8 · shadow-md 는 걷고 03k 의 팝오버 모양(bg-layer-floating · 모서리 20 · shadow-s3)으로 그린다 */
    .ipk-content { width: 320px; padding: var(--spacing-md); background: var(--color-bg-layer-floating); border-radius: var(--radius-r5); box-shadow: var(--shadow-s3); }
    /* 검색칸 — Input prefixIcon · clearable(.ptf-input, 웹 기본 반응형). 옛 36 칸 + 절대 위치 아이콘은 걷었다(icon-picker.md 2026-10-01) */
    .ipk-search { margin-bottom: var(--spacing-sm); }
    .ipk-grid { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 4px; max-height: 240px; overflow-y: auto; }
    .ipk-cell { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: var(--radius-sm); background: transparent; border: none; color: var(--color-text-secondary); cursor: pointer; transition: background-color var(--motion-duration-fast) var(--motion-ease-out), color var(--motion-duration-fast) var(--motion-ease-out); }
    .ipk-cell:hover { background: var(--color-surface-input); color: var(--color-text-primary); }
    .ipk-cell--active { background: var(--color-primary, var(--color-text-primary)); color: var(--color-text-on-accent, #fff); }
    .ipk-footer { margin-top: var(--spacing-sm); padding-top: var(--spacing-sm); border-top: 1px solid var(--color-border-subtle, var(--color-border-default)); font-size: 11px; color: var(--color-text-tertiary); text-align: center; }

    /* SearchableList — searchable-list.md SoT (search + thumbnail list single-select) */
    .sl-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-sm); }
    .sl-head-label { font-size: var(--text-caption); font-weight: 500; color: var(--color-text-secondary); }
    .sl-head-count { font-size: 11px; color: var(--color-text-tertiary); }
    /* 검색칸 — Input prefixIcon · clearable(.ptf-input, 웹 기본 반응형). 옛 36 칸 + 절대 위치 아이콘은 걷었다(searchable-list.md 2026-10-01) */
    .sl-search { margin-bottom: var(--spacing-sm); }
    .sl { border: 1px solid var(--color-border-subtle, var(--color-border-default)); background: var(--color-surface-default); border-radius: var(--radius-md); overflow-y: auto; }
    .sl-row { width: 100%; display: flex; align-items: center; gap: var(--spacing-md); padding: 10px 12px; background: transparent; border: none; cursor: pointer; transition: background-color var(--motion-duration-fast) var(--motion-ease-out); text-align: left; font: inherit; color: inherit; }
    .sl-row + .sl-row { border-top: 1px solid var(--color-border-subtle, var(--color-border-default)); }
    .sl-row:hover { background: var(--color-surface-input); }
    .sl-row--active { background: var(--color-bg-brand-subtle, color-mix(in oklch, var(--color-primary, var(--color-text-primary)) 8%, transparent)); }
    .sl-row--active:hover { background: var(--color-bg-brand-subtle, color-mix(in oklch, var(--color-primary, var(--color-text-primary)) 12%, transparent)); }
    .sl-thumb { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 28px; border-radius: var(--radius-sm); color: #fff; font-size: 11px; font-weight: 700; flex-shrink: 0; }
    .sl-body { flex: 1; min-width: 0; }
    .sl-title { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sl-row--active .sl-title { color: var(--color-primary-strong, var(--color-primary, var(--color-text-primary))); font-weight: 600; }
    .sl-title-text { overflow: hidden; text-overflow: ellipsis; }
    .sl-sub { display: block; margin-top: 2px; font-size: 11.5px; color: var(--color-text-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sl-badge { display: inline-flex; align-items: center; padding: 1px 6px; border-radius: var(--radius-sm); font-size: 10px; font-weight: 600; letter-spacing: 0.04em; background: var(--color-surface-input); color: var(--color-text-tertiary); flex-shrink: 0; }

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
    /* 딤 위의 떠 있는 표면 — 시트 · 대화상자 · 확인창처럼 bg-layer-floating · 모서리 20 · 그림자 없음(03k) */
    .overlay-modal { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--color-bg-layer-floating); color: var(--color-fg-neutral); padding: var(--spacing-md) var(--spacing-lg); border-radius: var(--radius-r5); font-size: var(--text-caption); font-weight: 600; }
    [data-theme="dark"] .overlay-modal { background: var(--color-bg-layer-floating-dark); color: var(--color-fg-neutral-dark); }
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
    [data-theme="dark"] .ld-highlights,
    [data-theme="dark"] .ld-host,
    [data-theme="dark"] .sk-card-wrap,
    [data-theme="dark"] .batch-card,
    [data-theme="dark"] .drw-side,
    [data-theme="dark"] .sc-card,
    [data-theme="dark"] .car-arrow,
    [data-theme="dark"] .sl,
    [data-theme="dark"] .ipk-trigger,
    [data-theme="dark"] .swatch { background: var(--color-surface-default-dark); }
    [data-theme="dark"] .ipk-content { background: var(--color-bg-layer-floating-dark); box-shadow: var(--shadow-s3-dark); }
    [data-theme="dark"] .sl,
    [data-theme="dark"] .ipk-trigger { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .sl-row + .sl-row,
    [data-theme="dark"] .ipk-footer { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .sl-title { color: var(--color-text-primary-dark); }
    [data-theme="dark"] .sl-row:hover,
    [data-theme="dark"] .ipk-cell:hover { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .sb,
    [data-theme="dark"] .cmd,
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
    [data-theme="dark"] .col-trigger,
    [data-theme="dark"] .car-arrow,
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
    [data-theme="dark"] .cmd-item:hover,
    [data-theme="dark"] .car-arrow:hover,
    [data-theme="dark"] .sb-item:hover { background: var(--color-surface-input-dark); }
    /* solid segmented active 는 다크에서도 primary 유지(subtle dark override 보다 specificity 우선). */
    [data-theme="dark"] .tgg--solid .tgg-item--active { background: var(--color-primary); color: var(--color-text-on-accent, #fff); }
    [data-theme="dark"] .cmd-input { background: var(--color-surface-default-dark); border-color: var(--color-border-default-dark); color: var(--color-text-primary-dark); }
    [data-theme="dark"] .drw-frame { background: var(--color-bg-page-dark); }
    [data-theme="dark"] .drw-row { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .drw-actions { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .drw-close:hover { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .stp-connector { background: var(--color-border-default-dark); }
    [data-theme="dark"] .pg-btn:hover,
    [data-theme="dark"] .pg-arrow:hover { background: var(--color-surface-input-dark); }
    [data-theme="dark"] .sp-spinner { border-color: var(--color-border-default-dark); border-top-color: var(--color-primary-light, var(--color-text-primary-dark)); }
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
    [data-theme="dark"] .ld-rail-row,
    [data-theme="dark"] .cal-legend { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .hero-fact,
    [data-theme="dark"] .typo-meta-row,
    [data-theme="dark"] .approval-row,
    [data-theme="dark"] .text-row,
    [data-theme="dark"] .motion-row,
    [data-theme="dark"] .typo-scale-row,
    [data-theme="dark"] .btn-row--head { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .catalog { border-color: var(--color-border-default-dark); }
    [data-theme="dark"] .kpi-cell,
    [data-theme="dark"] .memo-row { background: var(--color-surface-input-dark); }
    /* Button — 역할 색을 버튼 안에서만 다크 짝으로 바꾼다(button.yaml: dark 가 없으면 토큰의 -dark 짝).
       전역으로 바꾸면 토큰 카탈로그 견본까지 바뀐다. 공유 토큰(DESIGN.md)에 없는 브랜드 짝은 비어서
       .btn 의 대체값(중립)으로 떨어진다. 채움 · 글자 · 테두리 · 링 · 로딩 원이 모두 이 값을 따른다. */
    [data-theme="dark"] .btn {
      --color-bg-brand-solid: var(--color-bg-brand-solid-dark);
      --color-bg-brand-solid-pressed: var(--color-bg-brand-solid-pressed-dark);
      --color-bg-brand-weak-pressed: var(--color-bg-brand-weak-pressed-dark);
      --color-fg-brand: var(--color-fg-brand-dark);
      --color-stroke-focus-ring: var(--color-stroke-focus-ring-dark);
      --color-bg-neutral-inverted: var(--color-bg-neutral-inverted-dark);
      --color-bg-neutral-inverted-pressed: var(--color-bg-neutral-inverted-pressed-dark);
      --color-fg-neutral-inverted: var(--color-fg-neutral-inverted-dark);
      --color-bg-neutral-weak: var(--color-bg-neutral-weak-dark);
      --color-bg-neutral-weak-pressed: var(--color-bg-neutral-weak-pressed-dark);
      --color-fg-neutral: var(--color-fg-neutral-dark);
      --color-fg-neutral-subtle: var(--color-fg-neutral-subtle-dark);
      --color-bg-critical-solid: var(--color-bg-critical-solid-dark);
      --color-bg-critical-solid-pressed: var(--color-bg-critical-solid-pressed-dark);
      --color-fg-critical: var(--color-fg-critical-dark);
      --color-stroke-neutral-weak: var(--color-stroke-neutral-weak-dark);
      --color-bg-layer-default: var(--color-bg-layer-default-dark);
      --color-bg-layer-default-pressed: var(--color-bg-layer-default-pressed-dark);
      --color-bg-disabled: var(--color-bg-disabled-dark);
      --color-fg-disabled: var(--color-fg-disabled-dark);
      --color-gray-500: var(--color-gray-500-dark);
    }

    /* === Dark mode: brand primary → primary-light (어두운 표면 위 비채움 사용) === */
    /* 채움(fill)은 primary 유지 — primary-light fill 위 흰 텍스트는 대비 미달.
       비채움(text/border/outline/tint/small-dot)만 primary-light로 전환. */
    [data-theme="dark"] .memo-tag { color: var(--color-primary-light, var(--color-text-secondary-dark)); }
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
      .btn-row { grid-template-columns: 120px repeat(6, minmax(0, 1fr)); }
      .btn-row--4 { grid-template-columns: 120px repeat(4, minmax(0, 1fr)); }
      .approval-row { grid-template-columns: 1fr 1fr; }
      .ld-rail, .review-summary { position: static; }
      /* Card spec v4: mobile lg(16) padding (desktop xl(24) 은 기본). */
      .review-summary { padding: var(--spacing-lg); }
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
    ${renderRadioGallery(brand)}
    ${renderSwitchGallery(brand)}
    ${renderListGallery(brand)}
    ${renderSelectBoxGallery(brand)}
    ${renderTextFieldGallery(brand)}
    ${renderPickGallery(brand)}
    ${renderChipGallery(brand)}
    ${renderTabsGallery(brand)}
    ${renderOverlayGallery(brand)}
    ${renderFeedbackGallery(brand)}
    ${renderMenuGallery(brand)}
    ${renderVignettes(brand)}
    ${renderListingDetail(brand)}
    ${renderCalendar(brand)}
    ${renderReviews(brand)}
    ${renderAmenities(brand)}
    ${renderEmptyState(brand)}
    ${renderSnackbars(brand)}
    ${renderForm(brand)}
    ${renderSkeleton(brand)}
    ${renderBatchV67(brand)}
    ${renderShadcnNav(brand)}
    ${renderShadcnInput(brand)}
    ${renderShadcnDisclose(brand)}
    ${renderShadcnData(brand)}
    ${renderShadcnExtras(brand)}
    ${renderBatchV73V78(brand)}
    ${renderBatchSpecs5(brand)}
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
    // Text Field (2026-10-01) — field.tsx · input.tsx · textarea.tsx 가 하는 일을 흉내 낸다(페이지의 모든 .ptf-field · .ptf-input · .ptf-textarea).
    // 상자의 붙이개 · 여백을 눌러도 입력으로 포커스가 간다. 지우기는 값이 있고 막히지 않았을 때만 있고, 누르면 값을 비우고 입력에 포커스를 둔다.
    // 글자 수는 자소 단위로 세고 최대에서 멈춘다(한글은 조합이 끝난 뒤 자른다). 자동 높이 칸은 쓴 만큼 바로 자란다(최대 높이를 넘으면 스크롤).
    // 금액 칸(data-format="amount")은 쓰는 동안 천 단위 쉼표를 넣는다. 제출 버튼(data-ptf-submit)은 그 화면의 비운 필수 칸마다 오류를 보이고
    // 첫 오류 칸으로 포커스를 옮긴다 — 다시 쓰면 오류가 걷힌다(react-hook-form 의 제출 시 검증 · 바뀔 때 다시 검증).
    (function () {
      var seg = window.Intl && Intl.Segmenter ? new Intl.Segmenter("ko", { granularity: "grapheme" }) : null;
      function chars(v) { return seg ? Array.from(seg.segment(v), function (s) { return s.segment; }) : Array.from(v); }
      var CLEAR = ${JSON.stringify(TEXT_FIELD_CLEAR)};
      var ALERT = ${JSON.stringify(TEXT_FIELD_ICON.circleAlert)};
      var VALUE = ".ptf-input-value, .ptf-textarea-value";
      function isValue(el) { return !!(el && el.matches && el.matches(VALUE)); }
      // 자동 높이 — 내용 높이에 맞추고, 최대 높이를 넘으면 그 높이에서 멈추고 스크롤한다(움직임 없이)
      function fit(area) {
        if (!area.matches(".ptf-textarea-value") || area.closest(".ptf-textarea--fixed")) return;
        area.style.height = "auto";
        var max = parseFloat(getComputedStyle(area).maxHeight);
        var limit = isFinite(max) ? max : Infinity;
        var full = area.scrollHeight;
        area.style.height = Math.min(full, limit) + "px";
        area.style.overflowY = full > limit ? "auto" : "hidden";
      }
      // 칸의 설명 — 붙이개 글자 · 꼬리의 오류 · 설명 · 글자 수(보이는 것만)
      function describe(field) {
        var el = field.querySelector(VALUE);
        if (!el) return;
        var ids = [];
        var root = el.closest(".ptf-input");
        if (root) root.querySelectorAll(".ptf-affix[id]").forEach(function (a) { ids.push(a.id); });
        field.querySelectorAll(".ptf-field-footer > [id]:not([hidden])").forEach(function (p) { ids.push(p.id); });
        if (ids.length) el.setAttribute("aria-describedby", ids.join(" ")); else el.removeAttribute("aria-describedby");
      }
      function setInvalid(field, message) {
        var el = field.querySelector(VALUE);
        var root = el.closest(".ptf-input, .ptf-textarea");
        field.setAttribute("data-invalid", "");
        root.setAttribute("data-invalid", "");
        el.setAttribute("aria-invalid", "true");
        var footer = field.querySelector(".ptf-field-footer");
        if (!footer) {
          footer = document.createElement("div");
          footer.className = "ptf-field-footer";
          root.insertAdjacentElement("afterend", footer);
        }
        var error = footer.querySelector(".ptf-error");
        if (!error) {
          error = document.createElement("p");
          error.className = "ptf-error";
          error.id = el.id + "-error";
          error.setAttribute("aria-hidden", "true");
          footer.insertBefore(error, footer.firstChild);
        }
        error.innerHTML = ALERT + "<span></span>";
        error.lastChild.textContent = message;
        var desc = footer.querySelector(".ptf-desc");
        if (desc) desc.hidden = true;
        var live = field.querySelector(".ptf-live");
        if (live) live.textContent = message;
        describe(field);
      }
      function clearInvalid(field) {
        var el = field.querySelector(VALUE);
        field.removeAttribute("data-invalid");
        el.closest(".ptf-input, .ptf-textarea").removeAttribute("data-invalid");
        el.removeAttribute("aria-invalid");
        var footer = field.querySelector(".ptf-field-footer");
        if (footer) {
          var error = footer.querySelector(".ptf-error");
          if (error) error.remove();
          var desc = footer.querySelector(".ptf-desc");
          if (desc) desc.hidden = false;
          if (!footer.children.length) footer.remove();
        }
        var live = field.querySelector(".ptf-live");
        if (live) live.textContent = "";
        describe(field);
      }
      // 값이 바뀐 뒤 — 글자 수 · 지우기 · 높이 · 오류(제출 뒤 다시 쓰면 걷힌다)
      function sync(el) {
        var field = el.closest(".ptf-field");
        var root = el.closest(".ptf-input");
        if (field) {
          var count = field.querySelector(".ptf-count");
          if (count) {
            var n = chars(el.value).length;
            count.querySelector(".ptf-count-value").textContent = String(n);
            count.classList.toggle("ptf-count--empty", n === 0);
          }
          if (field.hasAttribute("data-invalid") && field.hasAttribute("data-required-message") && el.value.trim()) clearInvalid(field);
        }
        if (root && root.hasAttribute("data-clearable")) {
          var btn = root.querySelector(".ptf-clear");
          if (el.value && !btn) root.insertAdjacentHTML("beforeend", CLEAR);
          else if (!el.value && btn) btn.remove();
        }
        fit(el);
      }
      // 최대 글자 수에서 자른다 — 한글을 조합하는 동안에는 자르지 않는다(조합이 깨진다)
      function clamp(el) {
        var field = el.closest(".ptf-field");
        var max = field ? Number(field.getAttribute("data-max")) : 0;
        if (!max) return;
        var all = chars(el.value);
        if (all.length > max) el.value = all.slice(0, max).join("");
      }
      document.addEventListener("mousedown", function (e) {
        var root = e.target.closest ? e.target.closest(".ptf-input, .ptf-textarea") : null;
        if (!root || root.hasAttribute("data-disabled") || e.target.closest("input, textarea, button, a")) return;
        e.preventDefault();
        root.querySelector(VALUE).focus();
      });
      document.addEventListener("input", function (e) {
        var el = e.target;
        if (!isValue(el)) return;
        if (!e.isComposing) {
          if (el.getAttribute("data-format") === "amount") {
            var digits = el.value.replace(/[^0-9]/g, "").replace(/^0+(?=[0-9])/, "").slice(0, 15);
            var next = digits ? Number(digits).toLocaleString("ko-KR") : "";
            if (next !== el.value) { el.value = next; el.setSelectionRange(next.length, next.length); }
          }
          clamp(el);
        }
        sync(el);
      });
      document.addEventListener("compositionend", function (e) {
        if (!isValue(e.target)) return;
        clamp(e.target);
        sync(e.target);
      });
      document.addEventListener("click", function (e) {
        var clear = e.target.closest ? e.target.closest(".ptf-clear") : null;
        if (clear) {
          var input = clear.closest(".ptf-input").querySelector(".ptf-input-value");
          input.value = "";
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.focus();
          return;
        }
        var submit = e.target.closest ? e.target.closest("[data-ptf-submit]") : null;
        if (!submit) return;
        var first = null;
        submit.closest(".ptf-screen").querySelectorAll(".ptf-field[data-required-message]").forEach(function (field) {
          var el = field.querySelector(VALUE);
          if (!el) return; // 고르는 칸(Select · Input Button)은 값을 입력으로 받지 않는다 — 오류는 그 칸의 invalid 로 그린다
          if (!el.value.trim()) {
            setInvalid(field, field.getAttribute("data-required-message"));
            if (!first) first = el;
          } else if (field.hasAttribute("data-invalid")) clearInvalid(field);
        });
        if (first) first.focus();
      });
      var areas = document.querySelectorAll(".ptf-textarea-value");
      areas.forEach(fit);
      window.addEventListener("load", function () { areas.forEach(fit); });
      // 폭이 바뀌어 줄이 다시 감기면 높이를 다시 맞춘다
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(function (entries) {
          entries.forEach(function (entry) {
            var el = entry.target;
            if (el.dataset.ptfWidth === String(el.offsetWidth)) return;
            el.dataset.ptfWidth = String(el.offsetWidth);
            fit(el);
          });
        });
        areas.forEach(function (el) { ro.observe(el); });
      }
    })();
    // Select · Input Button (2026-10-01) — select.tsx · input-button.tsx 가 하는 일 가운데 그림에 필요한 둘을 흉내 낸다(페이지의 모든 .psel-trigger · .pib · .psel-item).
    // 누름 배율의 기준 = max(높이, 폭 ÷ 4, 24) — 놓인 자리마다 폭이 달라 누르는 순간(포인터 · 키) 재서 --press-basis 로 넘긴다. 그 순간을 멈춘 누름 칸은 그릴 때와 크기가 바뀔 때 잰다.
    // 여럿 고른 값은 고른 순서대로 쉼표로 잇고, 칸 폭을 넘으면 "첫 값 외 N개" 로 줄인다(formatValue 기본) — 폭이 바뀌면 다시 맞춘다.
    (function () {
      var PRESS = ".psel-trigger, .pib, .psel-item";
      function measure(el) { el.style.setProperty("--press-basis", String(Math.max(el.offsetHeight, el.offsetWidth / 4, 24))); }
      function pressed(e) { return e.target && e.target.closest ? e.target.closest(PRESS) : null; }
      document.addEventListener("pointerdown", function (e) { var el = pressed(e); if (el) measure(el); }, true);
      document.addEventListener("keydown", function (e) { var el = pressed(e); if (el) measure(el); }, true);
      function summarize(value) {
        var values;
        try { values = JSON.parse(value.getAttribute("data-psel-values")); } catch (err) { return; }
        if (!values || !values.length) return;
        value.textContent = values.join(", ");
        if (values.length > 1 && value.scrollWidth > value.clientWidth) value.textContent = values[0] + " 외 " + (values.length - 1) + "개";
      }
      var frozen = document.querySelectorAll(".psel-trigger--pressed, .pib--pressed, .psel-item--pressed");
      var many = document.querySelectorAll(".psel-value[data-psel-values]");
      frozen.forEach(measure);
      many.forEach(summarize);
      window.addEventListener("load", function () { many.forEach(summarize); });
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.target.matches(".psel-value")) summarize(entry.target);
            else measure(entry.target);
          });
        });
        frozen.forEach(function (el) { ro.observe(el); });
        many.forEach(function (el) { ro.observe(el); });
      }
    })();
    // Chip (2026-10-02) — chip.tsx 가 하는 일 가운데 그림에 필요한 것을 흉내 낸다(페이지의 모든 .pchip).
    // 누름 배율의 기준 = max(높이, 폭 ÷ 4, 24) — 칩 폭이 글마다 달라 누르는 순간(포인터 · 키) 재서 --press-basis 로 넘긴다. 그 순간을 멈춘 누름 칩은 그릴 때 잰다.
    // 고르기 · 제안 · 필터 지우기 · 입력값 지우기는 data-pchip-live 묶음에서만 한다(그 순간을 멈춘 표의 칩은 바뀌지 않는다) —
    // 하나 고르기는 그 칩만 고르고(다시 눌러도 그대로) Tab 자리를 고른 칩으로 옮긴다. 화살표로 옮기며 고르고 막힌 칩은 건너뛴다. 여럿 고르기는 켜고 끈다.
    // 라디오 · 체크박스 칩은 Enter 로 고르지 않는다(Radix 와 같다). 제안은 이어진 칸(data-pchip-fill-target)에 값을 넣고 고른 모습을 남기지 않는다.
    // 필터 바는 시트를 열지 않는 그림이라, 안 걸린 조건을 누르면 예시 값(data-pchip-value)이 걸리고 ↺ 가 나타난다. ↺ 는 모든 조건을 풀고 숨는다(포커스는 첫 조건으로).
    // 입력값 지우기는 그 칩을 빼고 포커스를 다음 칩의 지우기(없으면 앞 칩의 지우기, 그것도 없으면 묶음)로 옮긴다.
    (function () {
      var PRESS = ".pchip:not(.pchip--input)";
      function measure(el) { el.style.setProperty("--press-basis", String(Math.max(el.offsetHeight, el.offsetWidth / 4, 24))); }
      function closest(e, selector) { return e.target && e.target.closest ? e.target.closest(selector) : null; }
      function live(el) { return el.closest("[data-pchip-live]"); }
      function radios(group) { return Array.prototype.slice.call(group.querySelectorAll('.pchip[role="radio"]')); }
      function pick(chip) {
        radios(live(chip)).forEach(function (c) {
          var on = c === chip;
          c.setAttribute("aria-checked", on ? "true" : "false");
          c.tabIndex = on ? 0 : -1;
        });
      }
      function setLabel(chip, text) { var label = chip.querySelector(".pchip-label"); if (label) label.textContent = text; }
      document.addEventListener("pointerdown", function (e) { var el = closest(e, PRESS); if (el) measure(el); }, true);
      document.addEventListener("keydown", function (e) { var el = closest(e, PRESS); if (el) measure(el); }, true);
      var frozen = document.querySelectorAll(".pchip--pressed");
      frozen.forEach(measure);
      window.addEventListener("load", function () { frozen.forEach(measure); });
      document.addEventListener("click", function (e) {
        var remove = closest(e, ".pchip-remove");
        if (remove) {
          var list = live(remove);
          if (!list || remove.disabled) return;
          var all = Array.prototype.slice.call(list.querySelectorAll(".pchip-remove:not(:disabled)"));
          var at = all.indexOf(remove);
          var next = all[at + 1] || all[at - 1];
          remove.closest(".pchip").remove();
          if (next) next.focus();
          else { list.setAttribute("tabindex", "-1"); list.focus(); }
          return;
        }
        var chip = closest(e, ".pchip");
        var group = chip ? live(chip) : null;
        if (!group || chip.disabled) return;
        var role = chip.getAttribute("role");
        if (role === "radio") { pick(chip); return; }
        if (role === "checkbox") { chip.setAttribute("aria-checked", chip.getAttribute("aria-checked") === "true" ? "false" : "true"); return; }
        if (chip.hasAttribute("data-pchip-fill")) {
          var input = document.getElementById(group.getAttribute("data-pchip-fill-target"));
          if (!input) return;
          input.value = Number(chip.getAttribute("data-pchip-fill")).toLocaleString("ko-KR");
          input.dispatchEvent(new Event("input", { bubbles: true }));
          return;
        }
        var reset = group.querySelector("[data-pchip-reset]");
        if (chip === reset) {
          group.querySelectorAll("[data-pchip-default]").forEach(function (c) {
            c.removeAttribute("data-selected");
            setLabel(c, c.getAttribute("data-pchip-default"));
          });
          reset.hidden = true;
          var first = group.querySelector("[data-pchip-default]");
          if (first) first.focus();
          return;
        }
        if (chip.hasAttribute("data-pchip-default") && !chip.hasAttribute("data-selected")) {
          chip.setAttribute("data-selected", "");
          setLabel(chip, chip.getAttribute("data-pchip-value"));
          if (reset) reset.hidden = false;
        }
      });
      document.addEventListener("keydown", function (e) {
        var chip = closest(e, '.pchip[role="radio"], .pchip[role="checkbox"]');
        if (!chip) return;
        if (e.key === "Enter") { e.preventDefault(); return; }
        var group = chip.getAttribute("role") === "radio" ? live(chip) : null;
        var step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!group || !step) return;
        e.preventDefault();
        var open = radios(group).filter(function (c) { return !c.disabled; });
        var next = open[(open.indexOf(chip) + step + open.length) % open.length];
        next.focus();
        pick(next);
      });
    })();
    // Tabs · Segmented Control (2026-10-02) — tabs.tsx · segmented-control.tsx 가 하는 일 가운데 그림에 필요한 것을 흉내 낸다(페이지의 모든 .ptab-list · .ptab-chips · .pseg).
    // 막대 — 목록마다 고른 탭을 재서 자리(--ptab-x)와 폭(--ptab-w)을 넘긴다. Fill 은 탭에서 좌우 --ptab-inset(16)을 들이고 Hug 는 탭 폭 그대로다.
    // 처음 자리를 잡은 뒤에 [data-ptab-ready] 를 달아 그때부터 미끄러진다. 목록 폭이 바뀌거나(화면 폭 · 숨었던 내용 칸이 열림) 글꼴이 들어오면 다시 잰다.
    // 누름 배율의 기준 = max(높이, 폭 ÷ 4, 24) — 탭 · 칸 폭이 놓인 자리마다 달라 누르는 순간(포인터 · 키) 재서 --press-basis 로 넘긴다. 그 순간을 멈춘 누름 탭 · 칸은 그릴 때 잰다.
    // data-ptab-live 목록 — 누르면 그 탭을 고르고 이어진 내용 칸(aria-controls)을 바로 바꾼다(다른 칸은 hidden 으로 남아 상태를 지킨다). ← → 로 옮기며 바로 고르고
    // (끝에서 처음으로 돈다) Home · End 는 첫 · 마지막 탭이다. 막힌 탭은 건너뛴다. 고른 탭이 목록 밖이면(Hug · Chip Tabs) scroll-padding(16)만큼 여유를 두고 스크롤한다.
    // 고른 탭 · 칩의 알림 점은 지운다 — 고른 것에는 점이 없고, 열어 내용을 봤으니 사라진다. Chip Tabs 의 칩은 data-selected 로 고른 모습을 칠한다.
    // data-pseg-live 트랙 — 누르면 그 칸을 고르고(다시 눌러도 그대로) 고른 알약을 옮긴다(--pseg-i). ← → ↑ ↓ 로 옮기며 바로 고르고(끝에서 처음으로 돈다) 막힌 칸은 건너뛴다.
    // Enter 로는 고르지 않는다(Radix 라디오와 같다). 고른 칸의 알림 점은 지운다. data-pseg-filter 가 가리키는 목록은 고른 칸의 값(data-pseg-value)이 없는 줄([data-pseg-tags])을 숨긴다.
    (function () {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var PRESS = ".ptab, .pseg-item";
      function measure(el) { el.style.setProperty("--press-basis", String(Math.max(el.offsetHeight, el.offsetWidth / 4, 24))); }
      function closest(e, selector) { return e.target && e.target.closest ? e.target.closest(selector) : null; }
      function tabsOf(list) { return Array.prototype.filter.call(list.children, function (el) { return el.getAttribute("role") === "tab"; }); }
      function itemsOf(track) { return Array.prototype.filter.call(track.children, function (el) { return el.classList.contains("pseg-item"); }); }
      function place(list) {
        var bar = list.querySelector(":scope > .ptab-indicator");
        if (!bar) return;
        var tab = tabsOf(list).filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0];
        var inset = parseFloat(getComputedStyle(list).getPropertyValue("--ptab-inset")) || 0;
        bar.style.setProperty("--ptab-x", (tab ? tab.offsetLeft + inset : 0) + "px");
        bar.style.setProperty("--ptab-w", (tab ? Math.max(0, tab.offsetWidth - inset * 2) : 0) + "px");
        if (!list.hasAttribute("data-ptab-ready") && list.offsetWidth) {
          void bar.offsetWidth;
          list.setAttribute("data-ptab-ready", "");
        }
      }
      function reveal(list, tab) {
        if (list.scrollWidth <= list.clientWidth) return;
        var cs = getComputedStyle(list);
        var before = parseFloat(cs.scrollPaddingLeft) || 0;
        var after = parseFloat(cs.scrollPaddingRight) || 0;
        var x = list.scrollLeft;
        if (tab.offsetLeft - before < x) x = tab.offsetLeft - before;
        else if (tab.offsetLeft + tab.offsetWidth + after > x + list.clientWidth) x = tab.offsetLeft + tab.offsetWidth + after - list.clientWidth;
        if (x !== list.scrollLeft) list.scrollTo({ left: x, behavior: reduce ? "auto" : "smooth" });
      }
      function select(tab, focus) {
        var list = tab.parentElement;
        tabsOf(list).forEach(function (t) {
          var on = t === tab;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
          if (t.classList.contains("pchip")) { if (on) t.setAttribute("data-selected", ""); else t.removeAttribute("data-selected"); }
          var id = t.getAttribute("aria-controls");
          var panel = id ? document.getElementById(id) : null;
          if (panel) panel.hidden = !on;
        });
        tab.querySelectorAll(".ptab-dot, .ptab-chip-dot, .ptab-sr-only").forEach(function (el) { el.remove(); });
        if (focus) tab.focus({ preventScroll: true });
        place(list);
        reveal(list, tab);
      }
      function pick(item) {
        var track = item.parentElement;
        itemsOf(track).forEach(function (it, i) {
          var on = it === item;
          it.setAttribute("aria-checked", on ? "true" : "false");
          it.tabIndex = on ? 0 : -1;
          if (on) track.style.setProperty("--pseg-i", String(i));
        });
        item.querySelectorAll(".pseg-dot, .ptab-sr-only").forEach(function (el) { el.remove(); });
        var target = track.getAttribute("data-pseg-filter");
        var box = target ? document.getElementById(target) : null;
        var value = item.getAttribute("data-pseg-value");
        if (box && value) box.querySelectorAll("[data-pseg-tags]").forEach(function (row) {
          row.hidden = (" " + row.getAttribute("data-pseg-tags") + " ").indexOf(" " + value + " ") < 0;
        });
      }
      var lists = document.querySelectorAll(".ptab-list");
      function placeAll() { lists.forEach(place); }
      document.addEventListener("pointerdown", function (e) { var el = closest(e, PRESS); if (el) measure(el); }, true);
      document.addEventListener("keydown", function (e) { var el = closest(e, PRESS); if (el) measure(el); }, true);
      var frozen = document.querySelectorAll(".ptab--pressed, .pseg-item--pressed");
      frozen.forEach(measure);
      placeAll();
      window.addEventListener("load", function () { frozen.forEach(measure); placeAll(); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeAll);
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(function (entries) {
          entries.forEach(function (entry) {
            var el = entry.target;
            if (el.classList.contains("ptab-list")) place(el);
            else measure(el);
          });
        });
        lists.forEach(function (list) { ro.observe(list); });
        frozen.forEach(function (el) { ro.observe(el); });
      }
      document.addEventListener("click", function (e) {
        var tab = closest(e, '[data-ptab-live] > [role="tab"]');
        if (tab) { if (!tab.disabled) select(tab, false); return; }
        var item = closest(e, "[data-pseg-live] > .pseg-item");
        if (item && !item.disabled) pick(item);
      });
      document.addEventListener("keydown", function (e) {
        var tab = closest(e, '[data-ptab-live] > [role="tab"]');
        if (tab) {
          var open = tabsOf(tab.parentElement).filter(function (t) { return !t.disabled; });
          var at = open.indexOf(tab);
          var next = e.key === "ArrowRight" ? open[(at + 1) % open.length]
            : e.key === "ArrowLeft" ? open[(at - 1 + open.length) % open.length]
            : e.key === "Home" ? open[0]
            : e.key === "End" ? open[open.length - 1]
            : null;
          if (!next) return;
          e.preventDefault();
          select(next, true);
          return;
        }
        var item = closest(e, "[data-pseg-live] > .pseg-item");
        if (!item) return;
        if (e.key === "Enter") { e.preventDefault(); return; }
        var step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        var items = itemsOf(item.parentElement).filter(function (it) { return !it.disabled; });
        var nextItem = items[(items.indexOf(item) + step + items.length) % items.length];
        nextItem.focus();
        pick(nextItem);
      });
    })();
    // Overlays (2026-10-02) — dialog.tsx · popover.tsx 의 본문(DialogBody · PopoverBody)이 하는 일을 흉내 낸다(페이지의 모든 [data-pov-scroll]).
    // 넘치면 data-overflow(아래 48 흐림 + 본문 아래 48 비움) · 키보드로도 스크롤하도록 tabindex 0, 위로 스크롤되면 data-scrolled(머리 아래 1px 선).
    // 넘침은 비움(48)을 뺀 내용으로 잰다. data-pov-scroll="scrolled" 본문은 그릴 때 조금 스크롤해 둔다(그 순간을 멈춘 그림 — 직접 스크롤해도 같다).
    // 폭이 바뀌면 다시 잰다 — 크기 감시 안에서는 다음 그림 틀(requestAnimationFrame)에 고쳐 감시가 되돌아 울리지 않게 한다.
    (function () {
      var bodies = Array.prototype.slice.call(document.querySelectorAll("[data-pov-scroll]"));
      function scrolled(body) { body.toggleAttribute("data-scrolled", body.scrollTop > 0); }
      function fit(body) {
        var top = body.scrollTop;
        body.removeAttribute("data-overflow");
        var over = body.scrollHeight > body.clientHeight + 1;
        body.toggleAttribute("data-overflow", over);
        if (over) body.setAttribute("tabindex", "0"); else body.removeAttribute("tabindex");
        body.scrollTop = top;
        scrolled(body);
      }
      bodies.forEach(function (body) {
        body.addEventListener("scroll", function () { scrolled(body); }, { passive: true });
        fit(body);
        if (body.getAttribute("data-pov-scroll") === "scrolled") { body.scrollTop = 120; scrolled(body); }
      });
      window.addEventListener("load", function () { bodies.forEach(fit); });
      if (window.ResizeObserver) {
        var seen = new WeakMap();
        var ro = new ResizeObserver(function (entries) {
          entries.forEach(function (entry) {
            var el = entry.target;
            var key = el.offsetWidth + "x" + el.offsetHeight;
            if (seen.get(el) === key) return;
            seen.set(el, key);
            requestAnimationFrame(function () { fit(el); });
          });
        });
        bodies.forEach(function (el) { ro.observe(el, { box: "border-box" }); });
      }
    })();
    // 알림 메시지 (2026-10-02) — snackbar.tsx · callout.tsx · page-banner.tsx · result-section.tsx 가 하는 일 가운데 그림에 필요한 것을 흉내 낸다(03l · 09 · 11 · 19 · 20).
    // 누름 배율의 기준 = max(높이, 폭 ÷ 4, 24) — 액션 · 콜아웃 · 배너 · 버튼 · 닫기는 누르는 순간(포인터 · 키) 재서 --press-basis 로 넘긴다. 그 순간을 멈춘 누름은 그릴 때 잰다.
    // 스낵바 — [data-psnack-show] 버튼이 이어진 자리(data-psnack-target)에 띠를 띄운다. 한 번에 하나 — 띠가 있으면 100ms 로 걷고 새 띠를 150ms 로 띄운다.
    // 액션이 없으면 4초, 있으면 6초 뒤 걷는다. 마우스를 올리거나 · 누르고 있거나 · 키보드 초점이 띠 안에 있으면 멈추고, 모두 떠나면 처음부터 다시 센다.
    // 액션 · 닫기를 누르면 걷는다 — Esc · 띠 누르기로는 닫히지 않는다. 걷는 동안은 aria-hidden 이고, 초점은 옮기지 않는다. 남은 시간은 곁의 글(data-psnack-status)이 보인다.
    // data-pfb-live 콜아웃 · 배너의 닫기는 바로 걷고 초점을 다음 요소로 옮긴다. 결과의 다시 시도(data-presult-retry)는 버튼에 로딩을 걸고 1.2초 뒤 곁의 <template> 내용으로 바꾼다.
    // 미리보기 링크(data-pfb-link)는 옮기지 않는다.
    (function () {
      var ICON = { positive: ${JSON.stringify(FB_ICON.circleCheck)}, critical: ${JSON.stringify(FB_ICON.circleAlert)} };
      var X = ${JSON.stringify(FB_ICON.x)};
      var PRESS = ".psnack-action, .pcallout--actionable, .pcallout-close, .pbanner--actionable, .pbanner-button, .pbanner-close";
      var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      function measure(el) { el.style.setProperty("--press-basis", String(Math.max(el.offsetHeight, el.offsetWidth / 4, 24))); }
      function closest(e, selector) { return e.target && e.target.closest ? e.target.closest(selector) : null; }
      document.addEventListener("pointerdown", function (e) { var el = closest(e, PRESS); if (el) measure(el); }, true);
      document.addEventListener("keydown", function (e) { var el = closest(e, PRESS); if (el) measure(el); }, true);
      var frozen = document.querySelectorAll(".psnack-action--pressed, .pcallout--pressed, .pcallout-close--pressed, .pbanner--pressed, .pbanner-button--pressed, .pbanner-close--pressed");
      frozen.forEach(measure);
      window.addEventListener("load", function () { frozen.forEach(measure); });

      // 스낵바 — 자리마다 띠 하나(region._cur), 걷는 동안 들어온 다음 띠(region._next)는 걷은 뒤 띄운다
      function status(region, text) {
        var out = document.querySelector('[data-psnack-status="' + region.id + '"]');
        if (out) out.textContent = text;
      }
      function build(o) {
        var el = document.createElement("div");
        el.className = "psnack psnack--" + o.tone;
        el.setAttribute("role", "status");
        el.setAttribute("aria-atomic", "true");
        el.tabIndex = 0;
        el.innerHTML = (ICON[o.tone] ? '<span class="psnack-icon" aria-hidden="true">' + ICON[o.tone] + "</span>" : "")
          + '<div class="psnack-content"><p class="psnack-message"></p>' + (o.action ? '<button type="button" class="psnack-action"></button>' : "") + "</div>"
          + '<button type="button" class="psnack-close" aria-label="닫기">' + X + "</button>";
        el.querySelector(".psnack-message").textContent = o.message;
        if (o.action) el.querySelector(".psnack-action").textContent = o.action;
        return el;
      }
      function tick(region, el) {
        clearInterval(region._tick);
        var draw = function () {
          if (region._cur !== el || el._leaving) return;
          var total = el._total / 1000;
          status(region, el._paused ? "멈춤 — 떠나면 처음부터 " + total + "초" : total + "초 띠 — 남은 시간 " + Math.max(0, (el._end - Date.now()) / 1000).toFixed(1) + "초");
        };
        draw();
        region._tick = setInterval(draw, 100);
      }
      function run(region, el) {
        clearTimeout(el._timer);
        el._end = Date.now() + el._total;
        el._timer = setTimeout(function () { leave(region, el); }, el._total);
      }
      function hold(region, el, why, on) {
        if (el._leaving) return;
        el._holds[why] = on;
        var held = el._holds.hover || el._holds.press || el._holds.focus;
        if (held && !el._paused) { el._paused = true; clearTimeout(el._timer); }
        else if (!held && el._paused) { el._paused = false; run(region, el); }
      }
      function enter(region) {
        var o = region._next;
        region._next = null;
        var el = build(o);
        el._total = o.action ? 6000 : 4000;
        el._holds = {};
        el._release = function () { if (el._holds.press) hold(region, el, "press", false); };
        region._cur = el;
        region.appendChild(el);
        el.classList.add("psnack--enter");
        el.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hold(region, el, "hover", true); });
        el.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hold(region, el, "hover", false); });
        el.addEventListener("pointerdown", function () { hold(region, el, "press", true); });
        document.addEventListener("pointerup", el._release);
        document.addEventListener("pointercancel", el._release);
        el.addEventListener("focusin", function (e) { if (e.target.matches(":focus-visible")) hold(region, el, "focus", true); });
        el.addEventListener("focusout", function (e) { if (!el.contains(e.relatedTarget)) hold(region, el, "focus", false); });
        el.addEventListener("click", function (e) { if (closest(e, ".psnack-action, .psnack-close")) leave(region, el); });
        run(region, el);
        tick(region, el);
      }
      function leave(region, el) {
        if (el._leaving) return;
        el._leaving = true;
        clearTimeout(el._timer);
        clearInterval(region._tick);
        document.removeEventListener("pointerup", el._release);
        document.removeEventListener("pointercancel", el._release);
        el.setAttribute("aria-hidden", "true");
        el.classList.remove("psnack--enter");
        el.classList.add("psnack--exit");
        if (!region._next) status(region, "걷었다 — 버튼을 누르면 다시 뜬다.");
        setTimeout(function () {
          el.remove();
          if (region._cur === el) region._cur = null;
          if (region._next) enter(region);
        }, 100);
      }
      document.addEventListener("click", function (e) {
        var btn = closest(e, "[data-psnack-show]");
        if (!btn) return;
        var region = document.getElementById(btn.getAttribute("data-psnack-target"));
        if (!region) return;
        region._next = { tone: btn.getAttribute("data-psnack-tone") || "neutral", message: btn.getAttribute("data-psnack-message"), action: btn.getAttribute("data-psnack-action") || "" };
        if (region._cur) leave(region, region._cur);
        else enter(region);
      });

      // 콜아웃 · 배너 닫기 — 초점은 상자 다음의 초점 받을 요소로(body 로 떨어지지 않게)
      function nextFocusable(box) {
        var all = document.querySelectorAll(FOCUSABLE);
        for (var i = 0; i < all.length; i++) {
          var el = all[i];
          if (box.contains(el) || el.offsetParent === null) continue;
          if (box.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) return el;
        }
        return null;
      }
      document.addEventListener("click", function (e) {
        if (closest(e, "[data-pfb-link]")) { e.preventDefault(); return; }
        var close = closest(e, "[data-pfb-live] .pcallout-close, [data-pfb-live] .pbanner-close");
        if (close) {
          var box = close.closest("[data-pfb-live]");
          var next = nextFocusable(box);
          box.remove();
          if (next) next.focus();
          return;
        }
        var retry = closest(e, "[data-presult-retry]");
        if (!retry || retry.hasAttribute("aria-busy")) return;
        retry.setAttribute("aria-busy", "true");
        var host = retry.closest("[data-presult-host]");
        setTimeout(function () {
          var tpl = host.querySelector("template");
          host.tabIndex = -1;
          host.innerHTML = tpl ? tpl.innerHTML : "";
          host.focus({ preventScroll: true });
        }, 1200);
      });
    })();
    // Menu · Menu Sheet · Help Bubble · Tooltip (2026-10-02) — menu.tsx · menu-sheet.tsx · help-bubble.tsx · tooltip.tsx 가 하는 일 가운데 그림에 필요한 것을 흉내 낸다.
    // 누름 배율의 기준 = max(높이, 폭 ÷ 4, 24) — 줄 폭이 놓인 자리마다 달라 누르는 순간(포인터 · 키) 재서 --press-basis 로 넘긴다. 그 순간을 멈춘 누름 줄은 그릴 때 잰다.
    // 말풍선 자리(Floating UI 의 offset · flip · shift · arrow · size) — 놓인 틀(.pov-viewport)이 경계다. 바라는 쪽(data-pbub-side — 기본 위)에 트리거와 12(화살표 8 + 4)
    // 떨어뜨리고, 그쪽이 모자라면(가장자리 16 을 넘으면) 반대편으로 뒤집는다. 가로는 트리거 가운데에 맞추고 틀 가장자리와 16 을 남기게 민다 — 틀이 좁으면 폭을 그만큼 줄인다.
    // 화살표는 트리거 가운데를 가리키되 말풍선 모서리와 14 를 남긴다. 틀 폭이 바뀌거나 글꼴이 들어오면 다시 잰다.
    // data-pmenu-trigger 메뉴 — 누르기 · Enter · Space · ↓ 는 열고 첫 줄로(마우스로 열면 메뉴에 초점만 두고 링이 없다), ↑ 는 마지막 줄로 연다. 열린 메뉴는 ↑ ↓(끝에서 처음으로 돈다) ·
    // Home · End · 글자(그 글자로 시작하는 줄)로 옮기고 막힌 줄은 건너뛴다. 줄 누르기 · Enter · Space 는 닫고 초점을 트리거로 돌려준다(막힌 줄은 아무 일도 없다).
    // Esc 도 같고, Tab 은 닫고 다음 요소로 간다. 바깥을 누르면 닫는다. 마우스를 올린 줄은 알약만 칠하고(CSS) 키보드 위치는 옮기지 않는다. 아래가 모자라면 위로 연다.
    // data-pbub-live 말풍선 — ⓘ(data-pbub-trigger)를 누르면 열고 닫는다. 같은 틀의 바깥을 누르거나 Esc 로 닫히고(닫기 버튼이 있는 말풍선은 닫기 버튼 · Esc 로만),
    // 닫기 버튼은 닫고 초점을 트리거로 돌려준다. 열린 동안 트리거 · 기준의 Tab 은 말풍선 안으로 들어가고, 말풍선에서 나가는 Tab 은 닫는다. data-ptip 툴팁 — 마우스를 올리면 200ms 뒤 · 키보드 초점이면 바로 열고, 트리거와 말풍선을 모두 벗어나면 100ms 뒤
    // 닫는다(키보드로 연 툴팁은 초점이 떠날 때). 하나가 열려 있거나 닫힌 지 300ms 안에 옆 트리거로 옮기면 기다리지 않고 모션 없이 바로 연다. Esc 로 닫고, 트리거를
    // 누르면 기다리던 열기만 거둔다(열린 툴팁은 그대로 — 누름은 트리거의 동작). 손가락으로는 열지 않는다.
    (function () {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var PRESS = ".pmenu-item, .pmsheet-item";
      function measure(el) { el.style.setProperty("--press-basis", String(Math.max(el.offsetHeight, el.offsetWidth / 4, 24))); }
      function closest(e, selector) { return e.target && e.target.closest ? e.target.closest(selector) : null; }
      document.addEventListener("pointerdown", function (e) { var el = closest(e, PRESS); if (el) measure(el); }, true);
      document.addEventListener("keydown", function (e) { var el = closest(e, PRESS); if (el) measure(el); }, true);
      var frozen = document.querySelectorAll(".pmenu-item--pressed, .pmsheet-item--pressed");
      frozen.forEach(measure);

      // 말풍선 자리
      var EDGE = 16, GAP = 12, ARROW = 20;
      function place(bub) {
        if (bub.hidden) return;
        var trigger = document.getElementById(bub.getAttribute("data-pbub-for"));
        var box = bub.offsetParent;
        if (!trigger || !box) return;
        var b = box.getBoundingClientRect();
        var t = trigger.getBoundingClientRect();
        // 폭은 최대 280, 틀이 좁으면 가장자리 16 씩을 뺀 폭까지(help-bubble.tsx 의 --radix-popper-available-width)
        bub.style.maxWidth = b.width - EDGE * 2 < 280 ? (b.width - EDGE * 2) + "px" : "";
        var w = bub.offsetWidth, h = bub.offsetHeight;
        var want = bub.getAttribute("data-pbub-side") || "top";
        var above = t.top - b.top - GAP - h;
        var below = t.bottom - b.top + GAP;
        var fitsAbove = above >= EDGE, fitsBelow = below + h <= b.height - EDGE;
        var side = want === "top" ? (fitsAbove || !fitsBelow ? "top" : "bottom") : (fitsBelow || !fitsAbove ? "bottom" : "top");
        var cx = t.left + t.width / 2 - b.left;
        var x = Math.max(Math.min(cx - w / 2, b.width - EDGE - w), EDGE);
        var ax = Math.min(Math.max(cx - x, ARROW), w - ARROW);
        bub.style.left = Math.round(x) + "px";
        bub.style.top = Math.round(side === "top" ? above : below) + "px";
        bub.style.setProperty("--pbub-arrow-x", Math.round(ax) + "px");
        bub.setAttribute("data-side", side);
      }
      var bubbles = Array.prototype.slice.call(document.querySelectorAll(".pbub[data-pbub-for]"));
      function placeAll() { bubbles.forEach(place); }
      placeAll();
      window.addEventListener("load", placeAll);
      window.addEventListener("resize", placeAll);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeAll);
      if (window.ResizeObserver) {
        var seen = new WeakMap();
        var ro = new ResizeObserver(function (entries) {
          entries.forEach(function (entry) {
            var key = entry.target.offsetWidth + "x" + entry.target.offsetHeight;
            if (seen.get(entry.target) === key) return;
            seen.set(entry.target, key);
            requestAnimationFrame(placeAll);
          });
        });
        bubbles.forEach(function (bub) { if (bub.offsetParent) ro.observe(bub.offsetParent); });
      }
      function animate(el, on) {
        el.removeAttribute("data-motion");
        if (!on || reduce) return;
        void el.offsetWidth;
        el.setAttribute("data-motion", "in");
      }
      document.addEventListener("animationend", function (e) { if (e.target.hasAttribute && e.target.hasAttribute("data-motion")) e.target.removeAttribute("data-motion"); });

      // 메뉴
      var openMenu = null;
      function menuOf(trigger) { return trigger.parentElement.querySelector(":scope > .pmenu"); }
      function triggerOf(menu) { return document.getElementById(menu.getAttribute("aria-labelledby")); }
      function itemsOf(menu) {
        return Array.prototype.filter.call(menu.querySelectorAll(".pmenu-item"), function (it) { return it.getAttribute("aria-disabled") !== "true"; });
      }
      function showMenu(trigger, focusAt) {
        var menu = menuOf(trigger);
        if (openMenu && openMenu !== menu) hideMenu(openMenu, false);
        menu.hidden = false;
        menu.setAttribute("data-state", "open");
        menu.removeAttribute("data-side");
        trigger.setAttribute("aria-expanded", "true");
        trigger.setAttribute("aria-controls", menu.id);
        trigger.setAttribute("data-state", "open");
        var box = trigger.closest(".pov-viewport");
        if (box && menu.getBoundingClientRect().bottom > box.getBoundingClientRect().bottom - 8) menu.setAttribute("data-side", "top");
        animate(menu, true);
        openMenu = menu;
        var items = itemsOf(menu);
        var target = focusAt === "first" ? items[0] : focusAt === "last" ? items[items.length - 1] : null;
        (target || menu).focus();
      }
      function hideMenu(menu, refocus) {
        var trigger = triggerOf(menu);
        menu.hidden = true;
        menu.setAttribute("data-state", "closed");
        animate(menu, false);
        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
          trigger.removeAttribute("aria-controls");
          trigger.setAttribute("data-state", "closed");
          if (refocus) trigger.focus();
        }
        if (openMenu === menu) openMenu = null;
      }
      function move(menu, current, step) {
        var items = itemsOf(menu);
        if (!items.length) return;
        var at = items.indexOf(current);
        var next = at < 0 ? (step > 0 ? items[0] : items[items.length - 1]) : items[(at + step + items.length) % items.length];
        next.focus();
      }
      function typeahead(menu, current, key) {
        var items = itemsOf(menu);
        var start = items.indexOf(current);
        for (var i = 1; i <= items.length; i++) {
          var it = items[(start + i + items.length) % items.length];
          var label = it.querySelector(".pmenu-item-label");
          if (label && label.textContent.trim().toLowerCase().indexOf(key.toLowerCase()) === 0) { it.focus(); return; }
        }
      }
      document.addEventListener("click", function (e) {
        var trigger = closest(e, "[data-pmenu-trigger]");
        if (trigger) {
          var menu = menuOf(trigger);
          if (!menu.hidden) hideMenu(menu, false);
          else showMenu(trigger, e.detail === 0 ? "first" : "");
          return;
        }
        var item = closest(e, ".pmenu-item");
        if (item && openMenu && openMenu.contains(item)) {
          if (item.getAttribute("aria-disabled") === "true") return;
          hideMenu(openMenu, true);
        }
      });
      document.addEventListener("pointerdown", function (e) {
        if (!openMenu) return;
        var anchor = openMenu.parentElement;
        if (!anchor.contains(e.target)) hideMenu(openMenu, false);
      });
      document.addEventListener("keydown", function (e) {
        var trigger = closest(e, "[data-pmenu-trigger]");
        if (trigger && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
          e.preventDefault();
          showMenu(trigger, e.key === "ArrowDown" ? "first" : "last");
          return;
        }
        var menu = closest(e, ".pmenu");
        if (!menu || menu !== openMenu) return;
        var item = closest(e, ".pmenu-item");
        if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); move(menu, item, e.key === "ArrowDown" ? 1 : -1); }
        else if (e.key === "Home" || e.key === "End") { e.preventDefault(); var items = itemsOf(menu); if (items.length) items[e.key === "Home" ? 0 : items.length - 1].focus(); }
        else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (item && item.getAttribute("aria-disabled") !== "true") hideMenu(menu, true); }
        else if (e.key === "Escape") { e.preventDefault(); hideMenu(menu, true); }
        else if (e.key === "Tab") hideMenu(menu, false);
        else if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) typeahead(menu, item, e.key);
      });

      // 말풍선(Help Bubble)
      function triggerFor(bub) { return document.querySelector('[data-pbub-trigger="' + bub.id + '"]'); }
      function showBubble(bub) {
        bub.hidden = false;
        bub.setAttribute("data-state", "open");
        place(bub);
        animate(bub, true);
        var trigger = triggerFor(bub);
        if (trigger) { trigger.setAttribute("aria-expanded", "true"); trigger.setAttribute("aria-controls", bub.id); trigger.setAttribute("data-state", "open"); }
      }
      function hideBubble(bub, refocus) {
        var inside = bub.contains(document.activeElement);
        bub.hidden = true;
        bub.setAttribute("data-state", "closed");
        animate(bub, false);
        var trigger = triggerFor(bub) || document.getElementById(bub.getAttribute("data-pbub-for"));
        var toggle = triggerFor(bub);
        if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.removeAttribute("aria-controls"); toggle.setAttribute("data-state", "closed"); }
        if ((refocus || inside) && trigger) trigger.focus();
      }
      document.addEventListener("click", function (e) {
        var toggle = closest(e, "[data-pbub-trigger]");
        if (toggle) {
          var bub = document.getElementById(toggle.getAttribute("data-pbub-trigger"));
          if (bub) { if (bub.hidden) showBubble(bub); else hideBubble(bub, false); }
          return;
        }
        var close = closest(e, ".pbub-close");
        var owner = close && close.closest(".pbub[data-pbub-live]");
        if (owner) hideBubble(owner, true);
      });
      document.addEventListener("pointerdown", function (e) {
        document.querySelectorAll(".pbub[data-pbub-live]:not([hidden]):not(.pbub--close)").forEach(function (bub) {
          var trigger = document.getElementById(bub.getAttribute("data-pbub-for"));
          var box = bub.offsetParent;
          if (!box || !box.contains(e.target) || bub.contains(e.target) || (trigger && trigger.contains(e.target))) return;
          hideBubble(bub, false);
        });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        document.querySelectorAll(".pbub[data-pbub-live]:not([hidden])").forEach(function (bub) {
          var trigger = document.getElementById(bub.getAttribute("data-pbub-for"));
          if (bub.contains(e.target) || (trigger && trigger.contains(e.target))) hideBubble(bub, false);
        });
      });
      // Tab — 열린 말풍선의 트리거 · 기준에서 Tab 은 말풍선 안으로(닫기 버튼, 없으면 말풍선 — 바깥 2px 링). 말풍선은 틀 끝에 있어
      // 브라우저에 맡기면 건너뛴다. 말풍선에서 Shift+Tab 은 트리거로, 마지막 칸(닫기 버튼, 없으면 말풍선)에서 Tab 은 닫고 초점을 트리거에 둬
      // 브라우저가 트리거 다음 칸으로 보낸다(help-bubble.tsx 의 useEnterOnTab · 말풍선의 Tab 처리)
      function openBubbleOf(origin) {
        var id = origin.getAttribute("data-pbub-trigger");
        var bub = id ? document.getElementById(id) : origin.id ? document.querySelector('.pbub[data-pbub-live][data-pbub-for="' + origin.id + '"]') : null;
        return bub && !bub.hidden ? bub : null;
      }
      document.addEventListener("keydown", function (e) {
        if (e.key !== "Tab" || e.altKey || e.ctrlKey || e.metaKey || !e.target.closest) return;
        var inside = e.target.closest(".pbub[data-pbub-live]");
        if (inside) {
          var origin = document.getElementById(inside.getAttribute("data-pbub-for"));
          if (e.shiftKey) { e.preventDefault(); if (origin) origin.focus(); return; }
          var close = inside.querySelector(".pbub-close");
          if (close && e.target !== close) return;
          if (origin) origin.focus();
          hideBubble(inside, false);
          return;
        }
        if (e.shiftKey) return;
        var bub = openBubbleOf(e.target);
        if (!bub) return;
        e.preventDefault();
        (bub.querySelector(".pbub-close") || bub).focus();
      });

      // 툴팁
      var openTip = null, closedAt = 0, openTimer = 0, closeTimer = 0;
      var hovered = { trigger: false, content: false }, focused = false;
      function tipOf(trigger) { return document.getElementById(trigger.getAttribute("data-ptip")); }
      function showTip(trigger, instant) {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
        var tip = tipOf(trigger);
        if (!tip || openTip === tip) return;
        if (openTip) hideTip(openTip);
        tip.hidden = false;
        tip.setAttribute("data-state", "open");
        trigger.setAttribute("aria-describedby", tip.id);
        place(tip);
        animate(tip, !instant);
        openTip = tip;
      }
      function hideTip(tip) {
        tip.hidden = true;
        tip.setAttribute("data-state", "closed");
        animate(tip, false);
        var trigger = document.getElementById(tip.getAttribute("data-pbub-for"));
        if (trigger) trigger.removeAttribute("aria-describedby");
        if (openTip === tip) { openTip = null; closedAt = Date.now(); }
      }
      function hover(tip, part, inside) {
        hovered[part] = inside;
        clearTimeout(closeTimer);
        if (inside || openTip !== tip) return;
        closeTimer = setTimeout(function () { if (!hovered.trigger && !hovered.content && !focused && openTip === tip) hideTip(tip); }, 100);
      }
      document.querySelectorAll("[data-ptip]").forEach(function (trigger) {
        var tip = tipOf(trigger);
        if (!tip) return;
        trigger.addEventListener("pointerenter", function (e) {
          if (e.pointerType === "touch") return;
          hover(tip, "trigger", true);
          if (openTip === tip) return;
          clearTimeout(openTimer);
          if (openTip || Date.now() - closedAt < 300) showTip(trigger, true);
          else openTimer = setTimeout(function () { showTip(trigger, false); }, 200);
        });
        trigger.addEventListener("pointerleave", function (e) {
          if (e.pointerType === "touch") return;
          clearTimeout(openTimer);
          hover(tip, "trigger", false);
        });
        trigger.addEventListener("pointerdown", function () { clearTimeout(openTimer); });
        trigger.addEventListener("focus", function () {
          if (!trigger.matches(":focus-visible")) return;
          focused = true;
          showTip(trigger, !!openTip || Date.now() - closedAt < 300);
        });
        trigger.addEventListener("blur", function () {
          focused = false;
          clearTimeout(openTimer);
          if (openTip === tip) hideTip(tip);
        });
        tip.addEventListener("pointerenter", function () { hover(tip, "content", true); });
        tip.addEventListener("pointerleave", function () { hover(tip, "content", false); });
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && openTip) hideTip(openTip); });
    })();
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
