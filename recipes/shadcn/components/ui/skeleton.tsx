import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Porest Skeleton (shadcn 베이스 + Porest 디자인 토큰)
 * spec: specs/components/skeleton.md (단일 SoT)
 *
 * - 단순 div + animate-pulse — 로딩 placeholder
 * - 색상: surface-input (shadcn bg-muted 정합, 본문 위에서 자연스러운 placeholder 톤)
 * - shape는 className으로 조정 (h-4 w-32, h-10 w-10 rounded-full 등)
 * - shimmer variant — relative overflow-hidden + 자식 gradient overlay 합성 (preview .anim-shimmer SoT)
 */

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-surface-input", className)}
      {...props}
    />
  );
}

/**
 * SkeletonShimmer — sweep gradient variant.
 * surface-input 베이스 + primary 25% mix 좌→우 sweep, motion-duration-loop(1500ms) linear infinite.
 * 사용: <SkeletonShimmer className="h-64 w-full rounded-md" /> (hero image 등 강조 로딩)
 */
function SkeletonShimmer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-sm bg-surface-input", className)}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] to-transparent animate-[shimmer_var(--motion-duration-loop)_linear_infinite]" />
    </div>
  );
}

export { Skeleton, SkeletonShimmer };
