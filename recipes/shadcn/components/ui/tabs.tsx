import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

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
 * size (container 전용): default(h-10 / trigger 14·12·4 / min-h-8) ·
 *   sm(h-8 / trigger 13·8·4 / min-h-7). Toggle sm 수치 정합 — 데스크 보조 컨트롤.
 *   TabsList 의 size 를 context 로 TabsTrigger 에 전파(ToggleGroup 패턴).
 *
 * - Radix Tabs 베이스. 키보드 네비/ARIA 자동.
 * - manual activation 기본 — focus와 selection 분리(screen reader 보호).
 * - composition: Tabs > TabsList > TabsTrigger / TabsContent
 */

const Tabs = TabsPrimitive.Root;

// container size 를 List → Trigger 로 전파 (ToggleGroup 패턴 정합)
const TabsContext = React.createContext<{ size: "default" | "sm" }>({
  size: "default",
});

// container variant — site SoT (tabs-examples.mjs Default 패턴)
const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-sm bg-surface-input text-text-secondary",
  {
    variants: {
      size: {
        default: "h-10 p-[var(--spacing-xs)]",
        sm: "h-8 p-0.5",
      },
    },
    defaultVariants: { size: "default" },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xs font-sans font-medium ring-offset-bg-page transition-all duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface-default data-[state=active]:text-text-primary data-[state=active]:shadow-sm [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default:
          "min-h-8 px-[var(--spacing-md)] py-[var(--spacing-xs)] text-label-md",
        sm: "min-h-7 px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-label-sm",
      },
    },
    defaultVariants: { size: "default" },
  },
);

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, size, ...props }, ref) => (
  <TabsContext.Provider value={{ size: size ?? "default" }}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ size }), className)}
      {...props}
    />
  </TabsContext.Provider>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, size, ...props }, ref) => {
  // TabsList 가 제공한 size 를 상속 — trigger 별 재지정 시 prop 우선
  const context = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ size: size ?? context.size }), className)}
      {...props}
    />
  );
});
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
