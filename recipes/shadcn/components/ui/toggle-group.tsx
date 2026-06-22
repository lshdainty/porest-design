import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

/*
 * Porest ToggleGroup (shadcn 베이스 + Porest 디자인 토큰)
 * preview-html `.tgg` / `.tgg-item` SoT 정합 — segmented connected group:
 *   Root: border + rounded-md + overflow-hidden (단일 outer border)
 *   Item: borderless (rounded-none, 좌측 separator만 — divide-x)
 *   visual (spec toggle-group.md Visual variants):
 *     subtle *(default)*: active bg-surface-input + text-primary + 600 (토스 톤 절제)
 *     solid: active bg-primary + text-on-accent + 600, shadow 없음 (cobalt brand 채움 강조, v3)
 */

type ToggleGroupVisual = "subtle" | "solid";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & { visual?: ToggleGroupVisual }
>({
  size: "default",
  variant: "default",
  visual: "subtle",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & { visual?: ToggleGroupVisual }
>(({ className, variant, size, visual = "subtle", children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center border border-border-default rounded-md overflow-hidden divide-x divide-border-default",
      className,
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size, visual }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        // group 안에서는 item border/radius 제거 — outer group의 border + divide-x로 통일.
        "rounded-none border-0",
        // solid visual: active 채움을 primary 로 override(기본 surface-input 위 twMerge).
        context.visual === "solid" &&
          "data-[state=on]:bg-primary data-[state=on]:text-text-on-accent",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
