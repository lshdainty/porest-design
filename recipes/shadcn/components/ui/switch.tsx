import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

/*
 * Porest Switch (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - 44×24px 트랙 + 20×20px thumb
 * - off: surface-input 배경 / on: primary 배경
 * - thumb는 surface-default(흰색), checked 시 우측으로 슬라이드(translate-x-5)
 */

// thumb bg는 text-on-accent(#fff 고정) — surface-default는 dark token swap으로 어두워져 안 보임.
// transition도 Tailwind 기본 대신 motion 토큰 직접 인용.
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-[background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-border-strong",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-text-on-accent shadow-md ring-0 transition-transform duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
