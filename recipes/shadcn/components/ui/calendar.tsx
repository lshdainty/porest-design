"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/*
 * Porest Calendar (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/calendar.md (단일 SoT)
 *
 * - react-day-picker 베이스. 3 modes(single/multiple/range).
 * - composition: <Calendar mode="single" selected={date} onSelect={setDate} locale={ko} />
 * - day cell: rounded-full 40×40 (preview `.cal-cell` SoT, Toss 톤 원형).
 * - today: outline 2px primary (fill 없음 — selected와 시각 분리, 사용자가 오늘 보면서 다른 날 선택 가능).
 * - 한글 locale: import { ko } from "date-fns/locale" 후 locale={ko} 필수.
 */

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-[var(--spacing-md)]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-[var(--spacing-md)] sm:space-x-[var(--spacing-md)] sm:space-y-0",
        month: "space-y-[var(--spacing-md)]",
        caption: "flex justify-center pt-[var(--spacing-xs)] relative items-center",
        caption_label: "text-title-sm font-medium text-text-primary",
        nav: "space-x-[var(--spacing-xs)] flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-[var(--spacing-xs)]",
        nav_button_next: "absolute right-[var(--spacing-xs)]",
        table: "w-full border-collapse space-y-[var(--spacing-xs)]",
        head_row: "flex",
        head_cell:
          "text-text-tertiary w-10 h-8 font-semibold text-caption uppercase tracking-wide flex items-center justify-center",
        row: "flex w-full mt-[var(--spacing-xs)]",
        cell: cn(
          "relative p-0 text-center text-body-md focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full [&:has([aria-selected].day-range-middle)]:bg-surface-input first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full"
            : "",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 rounded-full text-body-md font-normal text-text-primary aria-selected:opacity-100 transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-text-on-accent font-semibold hover:bg-primary hover:text-text-on-accent focus:bg-primary focus:text-text-on-accent",
        day_today:
          "outline outline-2 outline-primary outline-offset-[-2px] font-semibold",
        day_outside:
          "day-outside text-text-tertiary aria-selected:bg-surface-input/50 aria-selected:text-text-secondary",
        day_disabled: "text-text-tertiary opacity-50 cursor-not-allowed",
        day_range_middle:
          "day-range-middle aria-selected:bg-surface-input aria-selected:text-text-primary aria-selected:rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
