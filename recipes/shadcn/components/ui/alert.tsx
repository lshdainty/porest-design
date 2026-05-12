import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Alert (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/alert.md (단일 SoT)
 *
 * - 인라인 정보·경고 메시지. 페이지 안 한 위치에 고정 표시.
 * - composition: Alert > AlertTitle / AlertDescription
 * - 5 variants: default / info / success / warning / error (sonner 5 kinds 정합)
 * - semantic variants: border-l 4px + color-mix 8% bg (preview .banner SoT)
 * - default: border 1px all-around + surface-default (단순 카드)
 *
 * Layout: flex flex-row + items-start + gap-md (icon ↔ body wrapper).
 * Icon은 absolute가 아닌 flex 첫 자식 — responsive + 정렬 일관성.
 */

const alertVariants = cva(
  "relative w-full flex items-start gap-[var(--spacing-md)] rounded-sm p-[var(--spacing-md)] text-body-sm [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:mt-[2px]",
  {
    variants: {
      variant: {
        default: "border border-border-default bg-surface-default text-text-primary",
        info: "border-l-4 border-l-info bg-[color-mix(in_srgb,var(--color-info)_8%,var(--color-surface-default))] text-text-primary [&>svg]:text-info",
        success: "border-l-4 border-l-success bg-[color-mix(in_srgb,var(--color-success)_8%,var(--color-surface-default))] text-text-primary [&>svg]:text-success",
        warning: "border-l-4 border-l-warning bg-[color-mix(in_srgb,var(--color-warning)_8%,var(--color-surface-default))] text-text-primary [&>svg]:text-warning",
        error: "border-l-4 border-l-error bg-[color-mix(in_srgb,var(--color-error)_8%,var(--color-surface-default))] text-text-primary [&>svg]:text-error",
        // shadcn alias — destructive == error
        destructive: "border-l-4 border-l-error bg-[color-mix(in_srgb,var(--color-error)_8%,var(--color-surface-default))] text-text-primary [&>svg]:text-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role={variant === "error" || variant === "warning" || variant === "destructive" ? "alert" : "status"}
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

/* Body wrapper — title + description 묶음. flex-1 + gap-xs. */
const AlertBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-[var(--spacing-xs)] flex-1 min-w-0",
      className,
    )}
    {...props}
  />
));
AlertBody.displayName = "AlertBody";

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "text-body-md font-semibold leading-none tracking-tight text-text-primary",
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-body-sm text-text-secondary [&_p]:leading-[1.5]",
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertBody, AlertTitle, AlertDescription };
