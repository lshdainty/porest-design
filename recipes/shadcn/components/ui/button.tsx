import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

/*
 * Porest Button (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - shadcn/ui button.tsx 표준 구조 그대로 (Slot, cva, forwardRef).
 * - className은 Tailwind v4 utility — 우리 토큰 그대로 사용 가능
 *   (`bg-primary` → `--color-primary`, `text-text-on-accent` → `--color-text-on-accent`).
 * - 사이즈는 Porest typography 토큰 (`text-title-sm`, `text-label-md`)에 매핑.
 * - 한국어 본문 가독성 우선 — 16px / 14px / 13px 위주 (40-48px 터치 타겟).
 *
 * Variants
 *   default     primary 채움 — 주요 액션
 *   destructive 위험 액션 (삭제/취소) — error 색상
 *   outline     surface 위 테두리만 — 보조 액션
 *   secondary   surface-input 채움 — 그룹 내 보조
 *   ghost       비채움 — nav/tab/icon 자리
 *   link        밑줄 텍스트 — 인라인 링크
 *
 * Sizes
 *   sm    h-8  px-3 / text-label-sm  — dense list, inline action
 *   md    h-10 px-4 / text-title-sm  — default
 *   lg    h-12 px-6 / text-title-md  — hero CTA, primary form action
 *   icon  h-10 w-10                   — icon-only
 *
 * Loading
 *   loading prop — 비동기 액션 중에 좌측에 Spinner(size=sm) 노출 + disabled + aria-busy.
 *   Spinner border 가 currentColor 상속하도록 inline style 강제 → default/destructive
 *   (filled bg) 에선 white, outline/ghost/secondary (transparent/회색 bg) 에선 primary 자동.
 *   asChild 와는 함께 쓰지 말 것 (Slot 단일 child 제약).
 */

// gap·transition·font-family는 preview-html `.btn` SoT 그대로 — 디자인 토큰 직접 인용.
//   gap-2 (Tailwind 기본 8px) → gap-[var(--spacing-sm)]
//   transition-all (모든 속성, Tailwind 기본 cubic-bezier(0.4,0,0.2,1)/150ms)
//     → transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]
//   font-sans (Pretendard) — <button> UA stylesheet가 body font를 inherit 안 해서 명시 필수.
//   preview .btn은 `font-family: inherit` 사용 (body에서 var(--font-sans) 상속) — 동등.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm font-sans font-medium leading-none transition-[box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-text-on-accent shadow-sm hover:shadow-md hover:brightness-105 active:shadow-none active:scale-[0.98] active:brightness-95",
        destructive:
          "bg-error text-text-on-accent shadow-sm hover:shadow-md hover:brightness-105 active:shadow-none active:scale-[0.98] active:brightness-95",
        outline:
          "border border-border-default text-text-primary hover:bg-surface-input hover:border-border-strong active:bg-border-default active:scale-[0.98]",
        secondary:
          "bg-surface-input text-text-primary hover:bg-border-default active:scale-[0.98] active:brightness-95",
        ghost:
          "text-primary hover:bg-surface-input active:bg-border-default active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline active:brightness-90",
      },
      size: {
        sm: "h-8 px-2 py-1 text-caption [&_svg]:size-3.5",
        md: "h-10 px-3 py-2 text-body-md [&_svg]:size-4",
        lg: "h-12 px-4 py-3 text-title-sm rounded-md [&_svg]:size-[18px]",
        icon: "h-10 w-10 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** true면 좌측에 Spinner 노출 + disabled + aria-busy. asChild와 함께 쓰지 말 것 (Slot 단일 child). */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <Spinner
            size="sm"
            aria-hidden
            // 버튼 내부 spinner는 버튼 텍스트 색(currentColor) 상속해 모든 variant 일관 시각.
            // default/destructive(filled bg-primary/bg-error)에선 white, outline/ghost(흰 bg)에선 primary spinner.
            style={{
              borderColor: "color-mix(in srgb, currentColor 30%, transparent)",
              borderTopColor: "currentColor",
            }}
          />
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
