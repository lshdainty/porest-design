import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Porest Card (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/card.md (단일 SoT)
 *
 * - composition: Card > CardHeader > CardTitle / CardDescription
 *                     > CardContent
 *                     > CardFooter
 * - 색상: surface-default 배경 + shadow-sm (border 없음 — preview .review-* SoT)
 * - radius: lg(12), padding: xl(24)
 *
 * box-shadow는 Tailwind utility(`shadow-sm`) 대신 inline style로 `var(--shadow-sm)`
 * 직접 인용 — Tailwind v4 utility는 내부적으로 box-shadow를 분해(--tw-shadow-*)
 * 처리해 다크 모드 CSS 변수 override(`--shadow-sm: var(--shadow-sm-dark)`)가
 * 우회되는 문제 fix. preview `.review-*` SoT와 다크 모드 시각 정합 보장.
 */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-surface-default text-text-primary",
      className,
    )}
    style={{ boxShadow: "var(--shadow-sm)", ...style }}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-[var(--spacing-xs)] p-[var(--spacing-xl)]",
      className,
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-title-md leading-none tracking-tight text-text-primary",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body-sm text-text-secondary", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-[var(--spacing-xl)] pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-[var(--spacing-xl)] pt-0",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
