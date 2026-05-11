import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

/*
 * Porest Slider (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - Radix Slider 베이스. 키보드/마우스 드래그.
 * - composition: Slider > Track > Range / Thumb (자동)
 * - track: 4px 두께 + rounded-full, primary fill
 */

// preview-html `.sld-*` SoT 그대로 — track 4px(h-1), thumb 16(h-4 w-4), shadow-sm.
// thumb 채움은 `bg-text-on-accent`(#fff 고정) — 다크 모드에서도 흰색 유지(`bg-surface-default`는
// dark token swap으로 어두워져 안 보이는 문제 fix).
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-surface-input">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-text-on-accent shadow-sm ring-offset-bg-page transition-[box-shadow,border-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
