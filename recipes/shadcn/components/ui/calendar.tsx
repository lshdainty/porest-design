"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

/*
 * Porest Calendar (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/calendar.md (단일 SoT)
 *
 * - react-day-picker v9 API 베이스. 3 modes(single/multiple/range).
 * - composition: <Calendar mode="single" selected={date} onSelect={setDate} locale={ko} />
 * - day cell: rounded-full 40×40 (preview `.cal-cell` SoT, Toss 톤 원형).
 * - today: outline 2px primary (fill 없음 — selected와 시각 분리, 사용자가 오늘 보면서 다른 날 선택 가능).
 * - 한글 locale: `import { ko } from "date-fns/locale"` 후 `locale={ko}` 필수.
 *
 * v8 → v9 변경:
 *   classNames: caption→month_caption, head_row→weekdays, head_cell→weekday, row→week,
 *               day_selected→selected (modifier), IconLeft/Right→Chevron (single slot).
 *   components: DayButton 분리(focus 관리), Chevron(orientation prop), getDefaultClassNames API.
 *   CSS var: --cell-size로 day cell 크기 한 곳 조정.
 */

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-bg-page group/calendar p-[var(--spacing-md)] [--cell-size:40px] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-[var(--spacing-md)] flex-col md:flex-row relative",
          defaultClassNames.months,
        ),
        month: cn(
          "flex flex-col w-full gap-[var(--spacing-md)]",
          defaultClassNames.month,
        ),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size) text-title-sm font-medium text-text-primary",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-border-default has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute bg-surface-default inset-0 opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-title-sm text-text-primary"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-text-tertiary [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-text-tertiary flex-1 font-semibold text-caption uppercase tracking-wide select-none",
          defaultClassNames.weekday,
        ),
        week: cn(
          "flex w-full mt-[var(--spacing-xs)]",
          defaultClassNames.week,
        ),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-caption select-none text-text-tertiary",
          defaultClassNames.week_number,
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-full [&:last-child[data-selected=true]_button]:rounded-r-full group/day aspect-square select-none",
          defaultClassNames.day,
        ),
        range_start: cn(
          "rounded-l-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          "rounded-none bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          "rounded-r-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
          defaultClassNames.range_end,
        ),
        today: cn(
          "outline outline-2 outline-primary outline-offset-[-2px] font-semibold rounded-full data-[selected=true]:outline-0 data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-text-tertiary aria-selected:text-text-tertiary",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-text-tertiary opacity-50 cursor-not-allowed",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("h-4 w-4", className)} {...props} />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("h-4 w-4", className)} {...props} />
            );
          }
          return (
            <ChevronDownIcon className={cn("h-4 w-4", className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // single selection: bg-primary fill (preview .cal-cell--selected SoT)
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-text-on-accent data-[selected-single=true]:rounded-full",
        // range start/end: bg-primary fill (원형)
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-text-on-accent data-[range-start=true]:rounded-full",
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-text-on-accent data-[range-end=true]:rounded-full",
        // range middle: primary 12% mix bg
        "data-[range-middle=true]:bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] data-[range-middle=true]:text-text-primary data-[range-middle=true]:rounded-none",
        // focus ring
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50",
        // base shape: rounded-full (preview .cal-cell SoT)
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal rounded-full text-body-md text-text-primary",
        "transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}
CalendarDayButton.displayName = "CalendarDayButton";

export { Calendar, CalendarDayButton };
