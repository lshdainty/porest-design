import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Card (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/card.md (단일 SoT)
 *
 * - composition: Card > CardHeader > CardTitle / CardDescription
 *                     > CardContent
 *                     > CardFooter
 * - 색상: surface-default 배경
 * - variant (v5):
 *   - `shadow` (default): border 없음 + shadow-sm. 일반 정보 카드 (preview .review-* SoT).
 *   - `bordered`: 1px border-subtle + shadow 없음. dense info / inline summary
 *     (선택 기간 hint, chart card 내 sub-card). app PCard.bordered 와 정합.
 * - radius: lg(12), padding: **mobile lg(16) / desktop md+ xl(24)** (v4 responsive)
 *
 * box-shadow는 Tailwind utility(`shadow-sm`) 대신 inline style로 `var(--shadow-sm)`
 * 직접 인용 — Tailwind v4 utility는 내부적으로 box-shadow를 분해(--tw-shadow-*)
 * 처리해 다크 모드 CSS 변수 override(`--shadow-sm: var(--shadow-sm-dark)`)가
 * 우회되는 문제 fix. preview `.review-*` SoT와 다크 모드 시각 정합 보장.
 *
 * CardContent / CardFooter 의 padding 처리: base 는 `p-xl`, 단 `[&:not(:first-child)]:pt-0`
 * 셀렉터로 CardHeader 다음에 올 때만 pt-0 (자연 연결). standalone CardContent (Card 의
 * 첫 자식) 일 때는 모든 방향 padding 유지 (review-summary 톤 같은 단독 카드 패턴).
 */

const cardVariants = cva(
  "rounded-lg bg-surface-default text-text-primary transition-[background-color,box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]",
  {
    variants: {
      variant: {
        // shadow 는 inline style 로 box-shadow 적용 — Card 컴포넌트에서 style prop 으로 처리.
        shadow: "",
        bordered: "border border-border-subtle",
      },
    },
    defaultVariants: {
      variant: "shadow",
    },
  },
);

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, style, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant }), className)}
    style={{
      // shadow variant 만 inline shadow 적용 (Tailwind v4 다크 모드 override 우회 fix).
      // bordered variant 는 border-only 라 shadow 없음.
      boxShadow: variant === "bordered" ? undefined : "var(--shadow-sm)",
      ...style,
    }}
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
      "flex flex-col gap-[var(--spacing-xs)] p-[var(--spacing-lg)] md:p-[var(--spacing-xl)]",
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
  // first-child일 땐 full p-xl(standalone 카드), CardHeader 다음일 땐 pt-0(헤더 자연 연결).
  <div
    ref={ref}
    className={cn("p-[var(--spacing-lg)] md:p-[var(--spacing-xl)] [&:not(:first-child)]:pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  // first-child일 땐 full p-xl, content/header 다음일 땐 pt-0(자연 연결).
  <div
    ref={ref}
    className={cn(
      "flex items-center p-[var(--spacing-lg)] md:p-[var(--spacing-xl)] [&:not(:first-child)]:pt-0",
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
