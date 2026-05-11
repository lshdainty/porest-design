import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Badge (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - badge typography 11/600/1.2 — 마이크로 라벨
 * - height: padding-y 기반 (h-5 ~ 22px) — 텍스트와 함께 살짝 넘는 정도
 * - 4 variant: default(primary 채움) / secondary(surface-input) / destructive(error) / outline
 */

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-badge font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-text-on-accent hover:brightness-105",
        secondary:
          "border-transparent bg-surface-input text-text-primary hover:bg-border-default",
        destructive:
          "border-transparent bg-error text-text-on-accent hover:brightness-105",
        outline:
          "border-border-default text-text-primary hover:bg-surface-input",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
