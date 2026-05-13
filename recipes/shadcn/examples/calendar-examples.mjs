/*
 * shadcn Calendar 예제 — calendar.md SoT 정합.
 * react-day-picker 베이스. 정적 HTML preview는 한 달 grid 시각화.
 * preview `.cal-*` 톤(원형 40×40 + outline today) + 한글 locale.
 * 한국 도메인 3종(Default single / HR 휴가 range / Desk 가계부 표시일 modifiers).
 */

const PANEL =
  "padding:var(--spacing-md); border-radius:var(--radius-md); background:var(--color-surface-default); width:fit-content; box-shadow:var(--shadow-sm);";

const CAPTION_WRAP =
  "display:flex; justify-content:center; padding-top:var(--spacing-xs); align-items:center; position:relative; margin-bottom:var(--spacing-md);";
const CAPTION = "font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:500; color:var(--color-text-primary);";

const NAV_BTN =
  "position:absolute; height:28px; width:28px; padding:0; opacity:0.6; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--color-border-default); border-radius:var(--radius-sm); background:transparent; color:var(--color-text-primary); cursor:pointer;";

const HEAD_ROW = "display:flex;";
const HEAD_CELL_BASE =
  "display:inline-flex; align-items:center; justify-content:center; width:40px; height:32px; font-size:var(--text-caption); line-height:var(--text-caption--line-height); font-weight:600; text-transform:uppercase; letter-spacing:0.04em; color:var(--color-text-tertiary);";

const ROW = "display:flex; margin-top:var(--spacing-xs);";

const DAY_BASE =
  "display:inline-flex; align-items:center; justify-content:center; height:40px; width:40px; padding:0; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); font-weight:400; color:var(--color-text-primary); border-radius:var(--radius-full); cursor:pointer; background:transparent; border:0; transition:background-color var(--motion-duration-fast) var(--motion-ease-out); font-family:inherit;";

const DAY_TODAY = `${DAY_BASE} outline:2px solid var(--color-primary, var(--color-text-primary)); outline-offset:-2px; font-weight:600;`;
const DAY_SELECTED = `${DAY_BASE} background:var(--color-primary, var(--color-text-primary)); color:var(--color-text-on-accent, #fff); font-weight:600;`;
const DAY_OUTSIDE = `${DAY_BASE} color:var(--color-text-tertiary);`;

// Range
const CELL_RANGE_MIDDLE = "display:inline-flex; height:40px; width:40px; align-items:center; justify-content:center; background:var(--color-surface-input);";
const DAY_RANGE_MIDDLE = "display:inline-flex; align-items:center; justify-content:center; height:40px; width:40px; padding:0; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary); background:transparent; border:0;";
const CELL_RANGE_START = "display:inline-flex; height:40px; width:40px; align-items:center; justify-content:center; background:linear-gradient(to right, transparent 50%, var(--color-surface-input) 50%);";
const CELL_RANGE_END = "display:inline-flex; height:40px; width:40px; align-items:center; justify-content:center; background:linear-gradient(to left, transparent 50%, var(--color-surface-input) 50%);";

// Modifier (가계부 표시일)
const DAY_MARKED = `${DAY_BASE} background:color-mix(in srgb, var(--color-primary, var(--color-text-primary)) 12%, transparent); font-weight:600;`;

const CHEVRON_LEFT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
const CHEVRON_RIGHT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function head() {
  return `<div style="${HEAD_ROW}">${WEEKDAYS.map(w => `<div style="${HEAD_CELL_BASE}">${w}</div>`).join("")}</div>`;
}

// 2026년 5월: 1일은 금요일.
// 첫 주의 일요일 = 4월 26일. outsideStart = [26,27,28,29,30] (5개)
// 5월 31일은 일요일. outsideEnd = [1,2,3,4,5,6] (6개 — 다음 달)
// 총 5 + 31 + 6 = 42 cells (6주)
function makeMay2026({ today = 13, selected = null, markedDays = [], range = null } = {}) {
  const outsideStart = [26, 27, 28, 29, 30].map(d => ({ d, outside: true }));
  const days = Array.from({ length: 31 }, (_, i) => ({ d: i + 1 }));
  const outsideEnd = [1, 2, 3, 4, 5, 6].map(d => ({ d, outside: true }));
  const allCells = [...outsideStart, ...days, ...outsideEnd];

  // chunk 7
  const weeks = [];
  for (let i = 0; i < 6; i++) weeks.push(allCells.slice(i * 7, (i + 1) * 7));

  const renderCell = (cell) => {
    if (cell.outside) return `<div style="${DAY_OUTSIDE}">${cell.d}</div>`;
    const d = cell.d;
    if (range && d >= range.start && d <= range.end) {
      if (d === range.start) return `<div style="${CELL_RANGE_START}"><div style="${DAY_SELECTED}">${d}</div></div>`;
      if (d === range.end) return `<div style="${CELL_RANGE_END}"><div style="${DAY_SELECTED}">${d}</div></div>`;
      return `<div style="${CELL_RANGE_MIDDLE}"><div style="${DAY_RANGE_MIDDLE}">${d}</div></div>`;
    }
    if (selected === d) return `<div style="${DAY_SELECTED}">${d}</div>`;
    if (markedDays.includes(d)) return `<div style="${DAY_MARKED}">${d}</div>`;
    if (today === d) return `<div style="${DAY_TODAY}">${d}</div>`;
    return `<div style="${DAY_BASE}">${d}</div>`;
  };

  return weeks.map(week => `<div style="${ROW}">${week.map(renderCell).join("")}</div>`).join("");
}

function calendarShell({ caption = "2026년 5월", body = "" }) {
  return `<div style="${PANEL}">
  <div style="${CAPTION_WRAP}">
    <button style="${NAV_BTN} left:var(--spacing-xs);" aria-label="이전 달">${CHEVRON_LEFT}</button>
    <span style="${CAPTION}">${caption}</span>
    <button style="${NAV_BTN} right:var(--spacing-xs);" aria-label="다음 달">${CHEVRON_RIGHT}</button>
  </div>
  ${head()}
  ${body}
</div>`;
}

export const calendarExamples = [
  {
    title: "Single — 가계부 거래 일자 선택 (Desk)",
    description: "단일 날짜 선택 — 거래 입력 form 안 date picker. **오늘**(13일)은 `outline 2px primary`(테두리만, fill 없음), **선택일**(22일)은 `bg-primary` fill. 한글 요일 헤더(일/월/.../토) + caption (`2026년 5월`). day cell 원형(`rounded-full` 40×40).",
    jsx: `import { ko } from "date-fns/locale"

<Calendar
  mode="single"
  locale={ko}
  selected={selected}
  onSelect={setSelected}
  className="rounded-md bg-surface-default p-[var(--spacing-md)]"
  style={{ boxShadow: "var(--shadow-sm)" }}
/>`,
    render: () => calendarShell({
      body: makeMay2026({ today: 13, selected: 22 }),
    }),
  },

  {
    title: "Range — HR 휴가 기간 신청",
    description: "기간 선택(`mode=\"range\"`) — 시작(15일)·끝(22일) `bg-primary` + 가운데 cell `bg-surface-input` 자동 채움. 휴가 신청 시 시작/끝 두 번 클릭. react-day-picker가 middle 자동.",
    jsx: `<Calendar
  mode="range"
  locale={ko}
  selected={{ from: start, to: end }}
  onSelect={setRange}
  numberOfMonths={1}
/>`,
    render: () => calendarShell({
      body: makeMay2026({ today: 13, range: { start: 15, end: 22 } }),
    }),
  },

  {
    title: "Modifiers — 가계부 표시일 (Desk)",
    description: "거래 있는 날 표시 — `modifiers={{ marked: dates }}` + `modifiersClassNames`로 `primary 12% mix` 배경(`chart-blue`/`green` 등 카테고리 색도 가능). 색 + bold 두 단서로 WCAG 1.4.1 충족. 오늘은 `outline`으로 분리.",
    jsx: `const markedDays = [2, 5, 8, 11, 15, 18, 21, 24, 27, 29]

<Calendar
  mode="single"
  locale={ko}
  modifiers={{ marked: markedDays.map(d => new Date(2026, 4, d)) }}
  modifiersClassNames={{
    marked: "bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] font-semibold",
  }}
/>`,
    render: () => calendarShell({
      body: makeMay2026({ today: 13, markedDays: [2, 5, 8, 11, 15, 18, 21, 24, 27, 29] }),
    }),
  },
];
