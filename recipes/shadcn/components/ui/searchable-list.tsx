import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

/*
 * Porest SearchableList — search input + scrollable result list single-select
 * preview-html `.sl` SoT 정합:
 *   header: label (좌) + 총 개수 caption (우)
 *   search: Input + 좌측 Search icon (pl-9)
 *   list: border + radius-md + bg-surface + divide-y + max-h 260 + overflow-y-auto
 *   row: thumbnail (44×28 카드 비율 또는 32×32 avatar) + 주제목+부제목 + 우측 옵션
 *   active row: bg-brand-subtle + 주제목 color/weight 강조
 *
 * 사용처: 카드 카탈로그·은행·증권사·종목·도시 등 대량 옵션 + 검색. shadcn 베이스 없음.
 */

type SearchableListProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: React.ReactNode;
  totalCount?: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  isLoading?: boolean;
  loadingSkeleton?: React.ReactNode;
  maxHeight?: number | string;
};

const SearchableList = React.forwardRef<HTMLDivElement, SearchableListProps>(
  (
    {
      label,
      totalCount,
      searchValue,
      onSearchChange,
      placeholder = "검색...",
      emptyText = "검색 결과가 없어요",
      isLoading,
      loadingSkeleton,
      maxHeight = 260,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const hasChildren = React.Children.count(children) > 0;
    return (
      <div ref={ref} className={className} {...props}>
        {(label || typeof totalCount === "number") && (
          <div className="flex items-center justify-between mb-[var(--spacing-sm)]">
            {label ? (
              <span className="text-caption font-medium text-text-secondary">
                {label}
              </span>
            ) : (
              <span />
            )}
            {typeof totalCount === "number" && (
              <span className="text-[11px] text-text-tertiary">
                총 {totalCount}개
              </span>
            )}
          </div>
        )}
        <div className="relative mb-[var(--spacing-sm)]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="pl-9"
          />
        </div>
        <div
          className={cn(
            "rounded-[var(--radius-md)] border border-border-subtle bg-surface-default",
            "divide-y divide-border-subtle overflow-y-auto",
          )}
          style={{ maxHeight }}
        >
          {isLoading
            ? loadingSkeleton
            : hasChildren
              ? children
              : (
                  <div className="py-6 text-center text-[12px] text-text-tertiary">
                    {emptyText}
                  </div>
                )}
        </div>
      </div>
    );
  },
);
SearchableList.displayName = "SearchableList";

type SearchableListItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> & {
  active?: boolean;
  thumbnail?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  dim?: boolean;
};

const SearchableListItem = React.forwardRef<
  HTMLButtonElement,
  SearchableListItemProps
>(
  (
    {
      active,
      thumbnail,
      title,
      subtitle,
      trailing,
      dim,
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 text-left",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-[-2px]",
        active ? "bg-bg-brand-subtle" : "hover:bg-surface-input",
        className,
      )}
      style={{ opacity: dim && !active ? 0.7 : 1, ...style }}
      aria-pressed={active}
      {...props}
    >
      {thumbnail ? (
        <span className="flex-shrink-0">{thumbnail}</span>
      ) : null}
      <span className="flex-1 min-w-0">
        <span
          className={cn(
            "block truncate text-[13px] flex items-center gap-1.5",
            active
              ? "text-primary-strong font-semibold"
              : "text-text-primary font-medium",
          )}
        >
          {title}
        </span>
        {subtitle ? (
          <span className="block truncate mt-0.5 text-[11.5px] text-text-tertiary">
            {subtitle}
          </span>
        ) : null}
      </span>
      {trailing ? <span className="flex-shrink-0">{trailing}</span> : null}
    </button>
  ),
);
SearchableListItem.displayName = "SearchableListItem";

export { SearchableList, SearchableListItem };
export type { SearchableListProps, SearchableListItemProps };
