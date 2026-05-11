import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

/*
 * Porest Avatar (shadcn 베이스 + Porest 디자인 토큰)
 * avatar.md SoT 정합:
 *   Root: relative inline-flex shrink-0 overflow-hidden rounded-full (정원).
 *   Fallback: bg-surface-input + text-primary + font-semibold (600).
 *   Default size: 40×40 (h-10 w-10) — 한국어 1글자 이니셜 가독성 기준.
 *
 * 사이즈 변경은 className으로:
 *   sm h-8 w-8 (32) → text-label-sm
 *   md h-10 w-10 (40, default) → text-title-sm
 *   lg h-12 w-12 (48) → text-title-md
 *   xl h-16 w-16 (64) → text-display-sm
 *
 * 강조 fill(primary)은 fallback에 `bg-primary text-text-on-accent` 추가.
 */

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-surface-input text-title-sm text-text-primary font-semibold",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
