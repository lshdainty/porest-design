/*
 * shadcn Calendar 예제 — react-day-picker 베이스. 정적 HTML preview는 한 달 그리드.
 */

const PANEL =
  "padding:12px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default); width:fit-content;";

const CAPTION =
  "display:flex; justify-content:center; padding-top:4px; align-items:center; position:relative; font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-primary);";

const NAV_BTN =
  "position:absolute; height:28px; width:28px; padding:0; opacity:0.5; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--color-border-default); border-radius:var(--radius-sm); background:transparent; color:var(--color-text-primary);";

const HEAD_CELL =
  "display:inline-flex; align-items:center; justify-content:center; width:36px; height:24px; font-size:var(--text-label-sm); color:var(--color-text-secondary);";

const DAY_BASE =
  "display:inline-flex; align-items:center; justify-content:center; height:36px; width:36px; padding:0; font-size:var(--text-title-sm); font-weight:400; color:var(--color-text-primary); border-radius:var(--radius-xs); cursor:pointer; background:transparent; border:0;";

const DAY_TODAY = `${DAY_BASE} background:var(--color-surface-input);`;
const DAY_SELECTED = `${DAY_BASE} background:var(--color-primary); color:var(--color-text-on-accent);`;
const DAY_OUTSIDE = `${DAY_BASE} color:var(--color-text-tertiary);`;

const CHEVRON_LEFT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
const CHEVRON_RIGHT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

function calendar({ selected = 15, today = 10, month = "2026년 5월" } = {}) {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    let style = DAY_BASE;
    if (i === selected) style = DAY_SELECTED;
    else if (i === today) style = DAY_TODAY;
    days.push(`<button style="${style}">${i}</button>`);
  }
  // 5월 1일이 금요일(idx=5) 가정 — 0월~4 outside (전월 27~30)
  const outsideStart = [];
  for (let i = 27; i <= 30; i++) outsideStart.push(`<button style="${DAY_OUTSIDE}">${i}</button>`);
  // 31일 후 outside (다음달 1~2)
  const outsideEnd = [];
  for (let i = 1; i <= 2; i++) outsideEnd.push(`<button style="${DAY_OUTSIDE}">${i}</button>`);

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return `<div style="${PANEL}">
  <div style="display:flex; flex-direction:column; gap:16px;">
    <div style="${CAPTION}">
      <button style="${NAV_BTN} left:4px;" aria-label="이전 달">${CHEVRON_LEFT}</button>
      ${month}
      <button style="${NAV_BTN} right:4px;" aria-label="다음 달">${CHEVRON_RIGHT}</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:4px;">
      <div style="display:flex;">
        ${weekdays.map((w) => `<div style="${HEAD_CELL}">${w}</div>`).join("")}
      </div>
      <div style="display:grid; grid-template-columns:repeat(7, 36px); gap:0;">
        ${outsideStart.join("")}
        ${days.join("")}
        ${outsideEnd.join("")}
      </div>
    </div>
  </div>
</div>`;
}

export const calendarExamples = [
  {
    title: "Default",
    description: "단일 날짜 선택. mode='single'.",
    jsx: `const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
    render: () => calendar({ selected: 15, today: 10, month: "2026년 5월" }),
  },
];
