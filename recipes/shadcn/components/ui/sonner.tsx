"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

/*
 * Porest Sonner (shadcn 베이스 + Porest 디자인 토큰)
 *
 * site preview SoT 정합 (sonner.md):
 *   toast: surface-raised + radius-md + shadow-md (테두리 없음)
 *   title: text-title-sm 600
 *   description: text-body-sm + text-secondary
 *   actionButton: button.md Size `sm` 그대로 — h-8 + text-caption + radius-sm +
 *                 font-sans + bg-primary + shadow-sm + hover:brightness-105 +
 *                 transition-[box-shadow]
 *                 글 아래 줄 오른쪽 끝(ml-auto) — toast 는 flex-wrap, content 가
 *                 아이콘 옆 한 줄 전체를 차지해 버튼이 다음 줄로 간다(2026-09-22)
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
        style: { boxShadow: "var(--shadow-md)" },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--bg-surface-raised)] group-[.toaster]:text-text-primary group-[.toaster]:border-none group-[.toaster]:rounded-md group-[.toaster]:min-h-[52px] group-[.toaster]:px-[var(--spacing-lg)] group-[.toaster]:py-[var(--spacing-md)] group-[.toaster]:flex-wrap group-[.toaster]:items-start group-[.toaster]:content-center group-[.toaster]:gap-[var(--spacing-md)]",
          icon: "group-[.toast]:size-5 group-[.toast]:mt-0.5",
          content:
            "group-[.toast]:min-w-0 group-[.toast]:grow group-[.toast]:basis-[calc(100%-20px-var(--spacing-md))]",
          title:
            "group-[.toast]:text-title-sm group-[.toast]:font-semibold group-[.toast]:text-text-primary",
          description: "group-[.toast]:text-body-sm group-[.toast]:text-text-secondary",
          actionButton:
            "group-[.toast]:inline-flex group-[.toast]:items-center group-[.toast]:justify-center group-[.toast]:gap-[var(--spacing-sm)] group-[.toast]:whitespace-nowrap group-[.toast]:rounded-sm group-[.toast]:font-sans group-[.toast]:font-medium group-[.toast]:transition-[box-shadow] group-[.toast]:duration-[var(--motion-duration-fast)] group-[.toast]:ease-[var(--motion-ease-out)] group-[.toast]:bg-primary group-[.toast]:text-text-on-accent group-[.toast]:shadow-sm hover:group-[.toast]:brightness-105 group-[.toast]:h-8 group-[.toast]:px-[var(--spacing-sm)] group-[.toast]:text-caption group-[.toast]:ml-auto",
          cancelButton:
            "group-[.toast]:inline-flex group-[.toast]:items-center group-[.toast]:justify-center group-[.toast]:gap-[var(--spacing-sm)] group-[.toast]:whitespace-nowrap group-[.toast]:rounded-sm group-[.toast]:font-sans group-[.toast]:font-medium group-[.toast]:transition-[box-shadow] group-[.toast]:duration-[var(--motion-duration-fast)] group-[.toast]:ease-[var(--motion-ease-out)] group-[.toast]:border group-[.toast]:border-border-default group-[.toast]:bg-surface-default group-[.toast]:text-text-primary hover:group-[.toast]:bg-surface-input group-[.toast]:h-8 group-[.toast]:px-[var(--spacing-sm)] group-[.toast]:text-caption",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
