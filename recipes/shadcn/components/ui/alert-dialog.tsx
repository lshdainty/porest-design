import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/*
 * Porest AlertDialog (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/alert-dialog.md (단일 SoT)
 *
 * - Radix AlertDialog 베이스 — 비가역 액션 확정용.
 * - 시각은 Dialog와 동일 (radius-xl / p-10 / shadow-xl / title-md title)
 * - 동작 차이: overlay click 무시 / close button(X) 없음 / default focus = Cancel
 * - composition: AlertDialog > Trigger + Content > Header > Title / Description
 *                                                         + Footer > Cancel / Action
 */

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[300] bg-[var(--overlay-dim-light)] dark:bg-[var(--overlay-dim-dark)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const alertDialogContentVariants = cva(
  // 여백은 container 가 아니라 header·body·footer 가 갖는다(dialog.md Layout) — 본문만
  // 스크롤해야 해서 셋을 한 덩어리로 묶을 수 없다.
  "fixed left-[50%] top-[50%] z-[301] flex w-[min(90%,var(--dialog-max-w))] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden max-h-[86vh] bg-surface-default duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  {
    variants: {
      size: {
        sm: "[--dialog-max-w:420px] rounded-lg",
        md: "[--dialog-max-w:520px] rounded-lg",
        lg: "[--dialog-max-w:720px] rounded-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>,
    VariantProps<typeof alertDialogContentVariants> {}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, size, style, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(alertDialogContentVariants({ size }), className)}
      style={{ boxShadow: "var(--shadow-xl)", ...style }}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

/* preview의 .modal-dialog은 title/description을 wrapper 없이 직접 자식으로 두고
   container의 gap-md(12)로만 간격을 줌. shadcn 호환을 위해 AlertDialogHeader는 유지하되
   gap을 parent와 동일한 spacing-md로 맞춰 시각이 1:1이 되게 함. */
const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      // header 18 22 — footer 아래와 같은 값이다(dialog.md Layout).
      "flex shrink-0 flex-col gap-[var(--spacing-md)] px-[22px] py-[18px] text-left",
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

/* 본문 — 여백 22 에 스크롤은 여기서만 인다(dialog.md Layout).
   header·footer 는 flex-shrink:0 이라 길어져도 밀리지 않는다. */
const AlertDialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("min-h-0 flex-1 overflow-y-auto p-[22px]", className)}
    {...props}
  />
);
AlertDialogBody.displayName = "AlertDialogBody";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      // footer 18 22 — header 위와 같은 값이다(dialog.md Layout).
      "flex shrink-0 flex-col-reverse gap-[var(--spacing-sm)] px-[22px] py-[18px] sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-title-md font-semibold leading-[var(--text-title-md--line-height)] text-text-primary tracking-[-0.01em]",
      className,
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-body-md leading-[1.6] text-text-secondary", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant: "destructive" }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    // 모달 footer 의 취소는 secondary — dialog.md footer 규칙.
    className={cn(buttonVariants({ variant: "secondary" }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  alertDialogContentVariants,
};
