import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Porest Input (shadcn 베이스 + Porest 디자인 토큰)
 *
 * spec: specs/components/input.md (단일 SoT)
 *
 * - 높이 40px (h-10) 고정 — variant 분리 안 함 (form 안 통일 우선).
 * - 색상: surface-input(회색 채움 — 1.4.11 보강) / border-default / text-primary / placeholder text-tertiary
 * - 폰트: body-lg (16/400/1.6) — 입력값 가독성 (title-sm 16/500보다 가벼움)
 * - focus: border-focus + ring-2 ring-ring/30 (다크 시 border-focus-light 자동 swap)
 * - aria-invalid: border-error + ring-error/30
 * - disabled: opacity-50 + cursor-not-allowed
 * - layout: min-w-0 — flex item 안에서 contents-width 로 줄어들지 않고 부모 너비를 따라가도록.
 *   (flex 안 input 이 글자 폭 만큼만 차지하면 form 정렬 깨짐)
 * - file picker: file:* 유틸 — `<input type="file">` 의 native button 톤(border-0 + bg-transparent +
 *   text-sm + text-text-primary). 폼 보편 패턴이라 base 에 포함.
 * - 사이즈 예외 필요 시 사용처 className으로 (예: `className="h-12 text-title-md"`)
 */

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // preview-html `.fv-input` SoT 그대로 — Tailwind 기본 spacing 스케일(px-3 py-2 = 12/8) 대신
    // --spacing-* 토큰 직접 인용. transition도 motion 토큰 직접 인용(--tw-ease/--tw-duration 회피).
    // font-family 명시 — <input> UA가 body inherit 안 해서 명시 안 하면 system-ui로 fallback.
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full min-w-0 rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-lg text-text-primary placeholder:text-text-tertiary",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary",
          "transition-[color,box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]",
          "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
