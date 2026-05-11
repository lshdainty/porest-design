import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Porest Textarea (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - min-height 80px — 3줄 이상 본문 입력
 * - body-md typography (15/400/1.6) 한국어 본문 가독성
 * - resize: none 권장 (사이즈 고정), 필요 시 className으로 resize-y 추가
 */

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// Input spec과 통일 — bg-surface-input(회색 채움), 토큰 직접 인용, font-sans, motion transition.
// textarea는 자연스럽게 가변 높이(min-h-20) + body-md(긴 본문 가독성) + resize-none.
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-20 w-full rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary placeholder:text-text-tertiary focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/30 disabled:cursor-not-allowed disabled:opacity-50 transition-[color,box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] resize-none",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
