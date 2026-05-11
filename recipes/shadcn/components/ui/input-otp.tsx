"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Porest InputOTP (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/input-otp.md (단일 SoT)
 *
 * - input-otp 라이브러리 베이스. 6자리 OTP 입력 기본.
 * - composition: InputOTP > InputOTPGroup > InputOTPSlot + InputOTPSeparator
 * - 시각: 각 slot 독립 박스 (gap-[var(--spacing-xs)] + radius-md + bg-surface-input → filled 시 bg-surface-default)
 * - font: text-title-md(18/600) + ui-monospace (숫자 폭 균일)
 */

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-[var(--spacing-xs)] has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-[var(--spacing-xs)]", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-md border border-border-default bg-surface-input font-mono text-title-md font-semibold leading-none text-text-primary transition-[background-color,border-color,outline-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)]",
        char && "bg-surface-default",
        isActive &&
          "outline-2 outline-offset-1 outline-border-focus z-10",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-text-primary duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

/* preview `.otp-sep` SoT 그대로 — lucide Minus 12px (preview-html SVG와 동일 형상). */
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    aria-hidden="true"
    className={cn(
      "flex items-center text-text-tertiary px-[var(--spacing-xs)]",
      className,
    )}
    {...props}
  >
    <Minus className="size-3" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
