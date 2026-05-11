import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Label (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - label-md typography (14/500/1.4) — form label 표준
 * - peer-disabled: 짝지어진 input이 disabled면 함께 흐림
 * - 추가 사용처: form-group title, checkbox/radio 레이블
 */

const labelVariants = cva(
  "text-label-md font-medium text-text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
