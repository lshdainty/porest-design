import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Alert (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - 인라인 정보·경고 메시지. 페이지 안 한 위치에 고정 표시.
 * - composition: Alert > AlertTitle / AlertDescription
 * - variant: default(neutral) / destructive(error)
 */

const alertVariants = cva(
  "relative w-full rounded-sm border px-4 py-3 text-body-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default:
          "border-border-default bg-surface-default text-text-primary",
        destructive:
          "border-error/50 bg-error/10 text-error [&>svg]:text-error",
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
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
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
    className={cn("text-body-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
