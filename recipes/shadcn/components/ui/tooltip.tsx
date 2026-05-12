import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/*
 * Porest Tooltip (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/tooltip.md (단일 SoT)
 *
 * - Radix Tooltip 베이스. Provider로 delay 기본 설정.
 * - composition: TooltipProvider > Tooltip > TooltipTrigger + TooltipContent
 * - 일반 surface-tone tooltip — `surface-default`(light:white, dark:dark surface)
 *   + `text-primary` 자동 swap. border 1px로 페이지 배경과 분리. shadow-sm 가볍게.
 *
 * Style 결정:
 * - bg/text/shadow 모두 inline style — Tailwind utility는 다크 모드 CSS 변수 swap
 *   처리에 quirks 있음. `var(--color-surface-default)`는 swap 대상이라 light/dark
 *   모두 자동 적응.
 * - box-shadow도 inline — Tailwind v4 `--tw-shadow-*` 분해 처리가 다크 모드 CSS
 *   변수 override를 우회하는 문제 fix (Card/Dialog/Drawer/Popover/Sonner와 동일).
 * - border 1px — surface-default(흰색)와 bg-page(거의 흰색) 구분 보강.
 */

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, style, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-xs border border-border-default px-[var(--spacing-md)] py-[var(--spacing-xs)] text-label-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    style={{
      backgroundColor: "var(--color-surface-default)",
      color: "var(--color-text-primary)",
      boxShadow: "var(--shadow-sm)",
      ...style,
    }}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
