/*
 * shadcn DatePicker 예제 — Calendar + Popover 조립. 별도 컴포넌트 없음.
 *
 * Trigger는 최신 Select(select.tsx SelectTrigger) 톤과 통일:
 *   bg-surface-input + text-body-md + px-[var(--spacing-md)] py-[var(--spacing-sm)] + font-sans
 *   + transition motion 토큰 직접 인용.
 */

// select.tsx SelectTrigger와 1:1 동기 (date-picker trigger 폭은 280px 고정).
const TRIGGER =
  "inline-flex items-center justify-start gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary hover:bg-surface-input focus:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 transition-[color,background-color,border-color,box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] h-10 w-[280px]";

const PANEL =
  "padding:var(--spacing-md); border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default); width:fit-content; box-shadow:var(--shadow-md); margin-top:var(--spacing-sm);";

const CAPTION =
  "display:flex; justify-content:center; padding-top:var(--spacing-xs); align-items:center; position:relative; font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-primary);";

const NAV_BTN =
  "position:absolute; height:28px; width:28px; padding:0; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--color-border-default); border-radius:var(--radius-sm); background:transparent; color:var(--color-text-secondary); cursor:pointer;";

const HEAD_CELL =
  "display:inline-flex; align-items:center; justify-content:center; width:36px; height:24px; font-size:var(--text-label-sm); color:var(--color-text-secondary);";

const DAY_BASE =
  "display:inline-flex; align-items:center; justify-content:center; height:36px; width:36px; padding:0; font-family:var(--font-sans); font-size:var(--text-body-md); font-weight:400; color:var(--color-text-primary); border-radius:var(--radius-xs); cursor:pointer; background:transparent; border:0;";

const DAY_TODAY = `${DAY_BASE} background:var(--color-surface-input);`;
const DAY_SELECTED = `${DAY_BASE} background:var(--color-primary); color:var(--color-text-on-accent);`;
const DAY_OUTSIDE = `${DAY_BASE} color:var(--color-text-tertiary);`;

const CALENDAR =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-text-secondary); flex-shrink:0;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';

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
  const outsideStart = [];
  for (let i = 27; i <= 30; i++) outsideStart.push(`<button style="${DAY_OUTSIDE}">${i}</button>`);
  const outsideEnd = [];
  for (let i = 1; i <= 2; i++) outsideEnd.push(`<button style="${DAY_OUTSIDE}">${i}</button>`);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return `<div style="${PANEL}">
  <div style="display:flex; flex-direction:column; gap:var(--spacing-lg);">
    <div style="${CAPTION}">
      <button style="${NAV_BTN} left:var(--spacing-xs);" aria-label="이전 달">${CHEVRON_LEFT}</button>
      ${month}
      <button style="${NAV_BTN} right:var(--spacing-xs);" aria-label="다음 달">${CHEVRON_RIGHT}</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:var(--spacing-xs);">
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

export const datePickerExamples = [
  {
    title: "Default",
    description: "trigger 버튼 + Popover 안에 Calendar — 별도 컴포넌트가 아닌 조립 패턴.",
    jsx: `const [date, setDate] = React.useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-[280px] justify-start text-left font-normal",
        !date && "text-text-tertiary",
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4 text-text-secondary" />
      {date ? format(date, "yyyy-MM-dd") : <span>날짜 선택</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>`,
    render: () => `<div style="display:flex; flex-direction:column;">
  <button class="${TRIGGER}">
    ${CALENDAR}
    <span>2026-05-15</span>
  </button>
  ${calendar({ selected: 15, today: 10, month: "2026년 5월" })}
</div>`,
  },
];
