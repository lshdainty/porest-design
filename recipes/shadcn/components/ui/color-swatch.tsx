import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Porest ColorSwatch
 * preview-html `.csw` SoT 정합 — single-select 색 grid.
 *   container: grid grid-cols-N gap-sm
 *   swatch: aspect-square + radius-tile + border 2px transparent (active=currentColor) + ✓ check
 *
 * 사용처: 카테고리/라벨/태그 색 선택. shadcn 베이스 없음 — Porest 도메인 spec.
 */

type ColorSwatchOption = {
  value: string;
  bg: string;
  fg: string;
  label?: string;
};

type ColorSwatchGroupProps = {
  options: ColorSwatchOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  columns?: number;
  className?: string;
};

const ColorSwatchGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  ColorSwatchGroupProps
>(({ options, columns = 5, className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-[var(--spacing-sm)]", className)}
    style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    {...props}
  >
    {options.map((opt) => (
      <ColorSwatchItem key={opt.value} option={opt} />
    ))}
  </RadioGroupPrimitive.Root>
));
ColorSwatchGroup.displayName = "ColorSwatchGroup";

const ColorSwatchItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  { option: ColorSwatchOption }
>(({ option, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    value={option.value}
    aria-label={option.label ?? option.value}
    className={cn(
      "relative aspect-square w-full rounded-[var(--radius-tile)]",
      "border-2 border-transparent transition-transform duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]",
      "hover:scale-[1.05]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[state=checked]:border-[currentColor]",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
    )}
    style={{
      background: option.bg,
      color: option.fg,
    }}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex h-full w-full items-center justify-center">
      <Check size={14} strokeWidth={2.6} />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
ColorSwatchItem.displayName = "ColorSwatchItem";

export { ColorSwatchGroup, ColorSwatchItem };
export type { ColorSwatchOption };
