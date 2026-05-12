import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

/*
 * Porest Hover Card (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/hover-card.md (단일 SoT)
 *
 * - Radix HoverCard 베이스. hover/focus 시 표시되는 읽기 전용 카드.
 * - composition: HoverCard > HoverCardTrigger + HoverCardContent
 * - Popover와 시각 동일 톤(rounded-md + border + p-[spacing-md] + shadow-md).
 *   차이는 trigger 패턴(hover-only) + 콘텐츠 의도(인터랙티브 element 금지).
 * - box-shadow는 Tailwind utility 대신 inline style — Tailwind v4 `--tw-shadow-*`
 *   분해 처리가 다크 모드 CSS 변수 override를 우회하는 문제 fix (Card/Dialog/
 *   Drawer/Popover/Sonner/Tooltip과 동일 패턴).
 */

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, style, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border border-border-default bg-surface-default p-[var(--spacing-md)] text-text-primary outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className,
    )}
    style={{ boxShadow: "var(--shadow-md)", ...style }}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
