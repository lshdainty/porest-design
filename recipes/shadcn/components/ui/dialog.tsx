import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest Dialog (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/dialog.md (단일 SoT)
 *
 * - Radix Dialog 베이스. modal 다이얼로그.
 * - composition: Dialog > DialogTrigger + DialogContent
 *                                       > DialogHeader > DialogTitle / DialogDescription
 *                                       > {body}
 *                                       > DialogFooter > {actions}
 * - sizes: sm 420 / md 520 (default, p-10 rounded-lg) / lg 720
 * - shadow-xl + overlay-dim-light(다크는 -dark 자동 alias)
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[100] bg-[var(--overlay-dim-light)] dark:bg-[var(--overlay-dim-dark)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
  // 여백은 container 가 아니라 header·body·footer 가 갖는다(dialog.md Layout) — 본문만
  // 스크롤해야 해서 셋을 한 덩어리로 묶을 수 없다.
  "fixed left-[50%] top-[50%] z-[101] flex w-[min(90%,var(--dialog-max-w))] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden max-h-[86vh] bg-surface-default duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
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

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  hideClose?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, size, hideClose, children, style, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants({ size }), className)}
      style={{ boxShadow: "var(--shadow-xl)", ...style }}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/* preview의 .modal-dialog은 title/description을 wrapper 없이 직접 자식으로 두고
   container의 gap-md(12)로만 간격을 줌. shadcn 호환을 위해 DialogHeader는 유지하되
   gap을 parent와 동일한 spacing-md로 맞춰 시각이 1:1이 되게 함. */
const DialogHeader = ({
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
DialogHeader.displayName = "DialogHeader";

/* 본문 — 여백 22 에 스크롤은 여기서만 인다(dialog.md Layout).
   header·footer 는 flex-shrink:0 이라 길어져도 밀리지 않는다. */
const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("min-h-0 flex-1 overflow-y-auto p-[22px]", className)}
    {...props}
  />
);
DialogBody.displayName = "DialogBody";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-title-md font-semibold leading-[var(--text-title-md--line-height)] text-text-primary tracking-[-0.01em]",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-body-md leading-[1.6] text-text-secondary", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants,
};
