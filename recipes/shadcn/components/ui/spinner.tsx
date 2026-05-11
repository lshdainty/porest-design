import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Spinner (디자인 시스템 자체 정의 — shadcn/ui 카탈로그 외)
 *
 * spec: specs/components/spinner.md (단일 SoT)
 *
 * - circular indeterminate. 360deg 회전, arc 270deg(3/4)
 * - 색: border-top primary (라이트) / primary-light (다크 — cascade 자동 swap)
 * - sizes: sm 16/2 · md 24/2 · lg 32/3 · xl 48/4
 * - animation: motion-duration-loop (1500ms) motion-ease-linear infinite
 * - prefers-reduced-motion: animation 정지
 *
 * 사용 예: <Spinner /> (md 기본) / <Spinner size="sm" /> (inline) / <Spinner size="xl" /> (full-page)
 * inline 라벨: <div className="inline-flex items-center gap-2"><Spinner size="sm" /> 저장 중…</div>
 */

const spinnerVariants = cva(
  "inline-block rounded-full border-surface-input border-t-primary motion-safe:animate-[spin_var(--motion-duration-loop)_var(--motion-ease-linear)_infinite]",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        md: "size-6 border-2",
        lg: "size-8 border-[3px]",
        xl: "size-12 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, label = "로딩 중", ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(spinnerVariants({ size, className }))}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
