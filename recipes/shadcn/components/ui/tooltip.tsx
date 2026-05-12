import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/*
 * Porest Tooltip (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/tooltip.md (단일 SoT)
 *
 * - Radix Tooltip 베이스. Provider로 delay 기본 설정.
 * - composition: TooltipProvider > Tooltip > TooltipTrigger + TooltipContent
 * - Toss/Apple 스타일 inverted dark tooltip — 두 테마 모두 stable 다크 배경.
 *
 * Style 결정:
 * - bg + text 모두 inline style — `bg-text-primary` Tailwind utility는 다크 모드
 *   `--color-text-primary` swap으로 white-ish 배경 + white text invisible 버그.
 *   `var(--color-bg-page-dark)`는 `*-dark` suffix라 swap 대상이 아니라 stable.
 * - box-shadow도 inline — Tailwind v4 `--tw-shadow-*` 분해 처리가 다크 모드
 *   CSS 변수 override를 우회하는 문제 fix (Card/Dialog/Drawer/Popover/Sonner와 동일).
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
      "z-50 overflow-hidden rounded-xs px-[var(--spacing-md)] py-[var(--spacing-xs)] text-label-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    style={{
      backgroundColor: "var(--color-bg-page-dark)",
      color: "var(--color-text-on-accent)",
      boxShadow: "var(--shadow-md)",
      ...style,
    }}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
