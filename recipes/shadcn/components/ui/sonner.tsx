"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

/*
 * Porest Sonner (shadcn 베이스 + Porest 디자인 토큰)
 *
 * site preview SoT 정합 (sonner.md):
 *   toast: surface-default + border-default(1px) + radius-md + shadow-lg
 *   title: text-title-sm 600
 *   description: text-body-sm + text-secondary
 *   actionButton: button.md Size `sm` 그대로 — h-8 + text-caption + radius-sm +
 *                 font-sans + bg-primary + shadow-sm + hover:brightness-105 +
 *                 transition-[box-shadow]
 *   cancelButton: 같은 SM 골격 + outline 변형 (border-default + surface-default)
 *
 * 사용:
 *   import { toast } from "sonner"
 *   toast.success("저장되었습니다")
 *   toast.error("저장 실패")
 */

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: { boxShadow: "var(--shadow-lg)" },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface-default group-[.toaster]:text-text-primary group-[.toaster]:border group-[.toaster]:border-border-default group-[.toaster]:rounded-md",
          title:
            "group-[.toast]:text-title-sm group-[.toast]:font-semibold group-[.toast]:text-text-primary",
          description: "group-[.toast]:text-body-sm group-[.toast]:text-text-secondary",
          actionButton:
            "group-[.toast]:inline-flex group-[.toast]:items-center group-[.toast]:justify-center group-[.toast]:gap-[var(--spacing-sm)] group-[.toast]:whitespace-nowrap group-[.toast]:rounded-sm group-[.toast]:font-sans group-[.toast]:font-medium group-[.toast]:transition-[box-shadow] group-[.toast]:duration-[var(--motion-duration-fast)] group-[.toast]:ease-[var(--motion-ease-out)] group-[.toast]:bg-primary group-[.toast]:text-text-on-accent group-[.toast]:shadow-sm hover:group-[.toast]:brightness-105 group-[.toast]:h-8 group-[.toast]:px-[var(--spacing-sm)] group-[.toast]:text-caption",
          cancelButton:
            "group-[.toast]:inline-flex group-[.toast]:items-center group-[.toast]:justify-center group-[.toast]:gap-[var(--spacing-sm)] group-[.toast]:whitespace-nowrap group-[.toast]:rounded-sm group-[.toast]:font-sans group-[.toast]:font-medium group-[.toast]:transition-[box-shadow] group-[.toast]:duration-[var(--motion-duration-fast)] group-[.toast]:ease-[var(--motion-ease-out)] group-[.toast]:border group-[.toast]:border-border-default group-[.toast]:bg-surface-default group-[.toast]:text-text-primary hover:group-[.toast]:bg-surface-input group-[.toast]:h-8 group-[.toast]:px-[var(--spacing-sm)] group-[.toast]:text-caption",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
