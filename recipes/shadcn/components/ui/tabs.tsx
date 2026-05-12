import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

/*
 * Porest Tabs (shadcn 베이스 + Porest 디자인 토큰)
 *
 * tabs.md SoT 정합 — 2 variants:
 *   container (default — site SoT): surface-input wrapper + active(surface-default
 *     + shadow-sm). 설정/form section 토글.
 *   underline: bottom border + active(primary 색 + 2px border-b). 절제 톤
 *     navigation. underline은 className override로 적용 (variants prop 없음).
 *
 * - Radix Tabs 베이스. 키보드 네비/ARIA 자동.
 * - manual activation 기본 — focus와 selection 분리(screen reader 보호).
 * - composition: Tabs > TabsList > TabsTrigger / TabsContent
 */

const Tabs = TabsPrimitive.Root;

// container variant — site SoT (tabs-examples.mjs Default 패턴)
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-sm bg-surface-input p-[var(--spacing-xs)] text-text-secondary",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-xs px-[var(--spacing-md)] py-[var(--spacing-xs)] font-sans text-label-md font-medium ring-offset-bg-page transition-all duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface-default data-[state=active]:text-text-primary data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-[var(--spacing-sm)] ring-offset-bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
