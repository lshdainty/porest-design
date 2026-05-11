import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Porest Skeleton (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - 단순 div + animate-pulse — 로딩 placeholder
 * - 색상: surface-input (어두운 surface 위에서도 가독)
 * - shape는 className으로 조정 (h-4 w-32, h-12 w-12 rounded-full 등)
 */

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-border-default", className)}
      {...props}
    />
  );
}

export { Skeleton };
