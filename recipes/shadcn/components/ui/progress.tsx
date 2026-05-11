import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Progress (shadcn 베이스 + Porest 디자인 토큰)
 *
 * spec: specs/components/progress.md (단일 SoT)
 *
 * - sizes: sm 2px · md 4px (default) · lg 8px
 * - track: surface-input, indicator: primary (라이트) / primary-light (다크 — cascade 자동 swap)
 * - determinate: value(0~100) → translateX 자동
 * - indeterminate: value 미지정 + indeterminate prop true → 30% width sweeping gradient
 * - radius: full (알약)
 * - transition: motion-duration-base motion-ease-out (determinate)
 */

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-surface-input",
  {
    variants: {
      size: {
        sm: "h-0.5",
        md: "h-1",
        lg: "h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indeterminate?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, indeterminate = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size, className }))}
    {...props}
  >
    {indeterminate ? (
      <span
        aria-hidden
        className="absolute top-0 left-[-30%] h-full w-[30%] bg-gradient-to-r from-transparent via-primary to-transparent motion-safe:animate-[sp-sweep_var(--motion-duration-loop)_var(--motion-ease-linear)_infinite]"
      />
    ) : (
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-transform duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)]"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    )}
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants };
