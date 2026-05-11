"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/*
 * Porest Calendar (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - react-day-picker 베이스. 단일/범위/다중 선택 지원.
 * - composition: <Calendar mode="single" selected={date} onSelect={setDate} />
 * - 일자 버튼은 rounded-xs(4px), 선택된 날짜는 primary 채움.
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
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-title-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-text-secondary rounded-xs w-9 font-normal text-label-sm",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-title-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-surface-input [&:has([aria-selected].day-outside)]:bg-surface-input/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-xs [&:has(>.day-range-start)]:rounded-l-xs first:[&:has([aria-selected])]:rounded-l-xs last:[&:has([aria-selected])]:rounded-r-xs"
            : "[&:has([aria-selected])]:rounded-xs",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-text-on-accent hover:bg-primary hover:text-text-on-accent focus:bg-primary focus:text-text-on-accent",
        day_today: "bg-surface-input text-text-primary",
        day_outside:
          "day-outside text-text-tertiary aria-selected:bg-surface-input/50 aria-selected:text-text-secondary",
        day_disabled: "text-text-tertiary opacity-50",
        day_range_middle:
          "aria-selected:bg-surface-input aria-selected:text-text-primary",
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
