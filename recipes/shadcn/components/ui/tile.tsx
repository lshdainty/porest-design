import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Porest Tile — swatch + label + desc + active check 의 큰 카드 single-select
 * preview-html `.tile` SoT 정합:
 *   container: grid grid-cols-N gap-sm (호출처가 cols 결정)
 *   tile: padding (Y · X) + radius-lg + border (1px subtle / 1.5px active primary) + bg
 *   swatch: 40×40 + radius-tile + 1px border-subtle (호출처가 내부 시각 결정)
 *
 * 사용처: 테마/기본 단위/시작 화면 등 시각 미리보기가 의미인 선택. shadcn 베이스 없음.
 */

type TileGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> & {
  columns?: number | string;
};

const TileGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  TileGroupProps
>(({ className, columns, style, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-[var(--spacing-sm)]", className)}
    style={{
      gridTemplateColumns:
        typeof columns === "number"
          ? `repeat(${columns}, minmax(0, 1fr))`
          : columns,
      ...style,
    }}
    {...props}
  />
));
TileGroup.displayName = "TileGroup";

type TileItemProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> & {
  size?: "sm" | "md" | "lg";
  swatch?: React.ReactNode;
  swatchClassName?: string;
  label: React.ReactNode;
  description?: React.ReactNode;
};

const SIZE_STYLES = {
  sm: {
    padding: "p-[10px_12px]",
    swatch: "h-8 w-8",
    gap: "gap-[10px]",
    check: 14,
  },
  md: {
    padding: "px-[14px] py-[16px]",
    swatch: "h-10 w-10",
    gap: "gap-3",
    check: 16,
  },
  lg: {
    padding: "px-[18px] py-[20px]",
    swatch: "h-12 w-12",
    gap: "gap-[14px]",
    check: 18,
  },
};

const TileItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  TileItemProps
>(
  (
    { className, size = "md", swatch, swatchClassName, label, description, ...props },
    ref,
  ) => {
    const s = SIZE_STYLES[size];
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "group/tile relative flex items-center text-left",
          s.padding,
          s.gap,
          "rounded-[var(--radius-lg)] border bg-surface-default",
          "border-border-subtle hover:border-border-default",
          "data-[state=checked]:border-[1.5px] data-[state=checked]:border-primary",
          "data-[state=checked]:bg-[color-mix(in_oklch,var(--color-primary)_8%,transparent)]",
          "transition-[border-color,background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {swatch ? (
          <span
            className={cn(
              "inline-flex items-center justify-center flex-shrink-0 overflow-hidden",
              "rounded-[var(--radius-tile)] border border-border-subtle",
              s.swatch,
              swatchClassName,
            )}
          >
            {swatch}
          </span>
        ) : null}
        <span className="flex-1 min-w-0">
          <span className="block text-body font-semibold text-text-primary">
            {label}
          </span>
          {description ? (
            <span className="block mt-0.5 text-caption text-text-tertiary">
              {description}
            </span>
          ) : null}
        </span>
        <RadioGroupPrimitive.Indicator className="flex-shrink-0 text-primary">
          <Check size={s.check} strokeWidth={2.2} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  },
);
TileItem.displayName = "TileItem";

export { TileGroup, TileItem };
