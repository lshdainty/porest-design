import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Toggle (shadcn 베이스 + Porest 디자인 토큰)
 * preview-html `.tg` / `.tg--on` SoT 정합:
 *   padding xs md · text-caption(12) / font-semibold(600) · rounded-md
 *   off: bg-transparent + text-secondary / on: bg-surface-input + text-primary + border-strong
 * variant: default(borderless toolbar) / outline(독립 toggle, preview `.tg` 톤)
 */

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-[var(--spacing-xs)] rounded-md text-caption font-semibold text-text-secondary hover:bg-surface-input hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-surface-input data-[state=on]:text-text-primary transition-[color,background-color,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-border-default bg-transparent data-[state=on]:border-border-strong",
      },
      size: {
        default:
          "px-[var(--spacing-md)] py-[var(--spacing-xs)] min-h-8",
        sm: "px-[var(--spacing-sm)] py-[var(--spacing-xs)] min-h-7",
        lg: "px-[var(--spacing-lg)] py-[var(--spacing-sm)] min-h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
