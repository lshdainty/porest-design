import * as React from "react";
import { Search } from "lucide-react";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

/*
 * Porest IconPicker
 * preview-html `.ipk` SoT 정합 — popover 베이스 단일 아이콘 선택.
 *   trigger: 40×40 square (input height 정합) + 현재 아이콘 미리보기
 *   content: w-80 + search input + grid grid-cols-8 + scroll
 *   매칭 limit 100건 — 성능 + 인지 부담 balance
 *
 * 사용처: 카테고리/라벨/메모/북마크 아이콘 부여. shadcn 베이스 없음 — Porest 도메인 spec.
 */

type IconName = (typeof iconNames)[number];

const MAX_VISIBLE = 100;

type IconPickerProps = {
  value?: string;
  onChange?: (iconName: string) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  placeholder?: string;
};

const TRIGGER_SIZE = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const CONTENT_WIDTH = {
  sm: "w-72",
  md: "w-80",
  lg: "w-96",
};

const CELL_SIZE = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

const ICON_SIZE = { sm: 14, md: 18, lg: 22 };
const CELL_ICON_SIZE = { sm: 14, md: 16, lg: 18 };

function IconPicker({
  value,
  onChange,
  size = "md",
  disabled,
  className,
  placeholder = "아이콘 검색...",
}: IconPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return iconNames.slice(0, MAX_VISIBLE);
    return iconNames.filter((n) => n.includes(q)).slice(0, MAX_VISIBLE);
  }, [query]);

  const totalMatching = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return iconNames.length;
    return iconNames.filter((n) => n.includes(q)).length;
  }, [query]);

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex items-center justify-center rounded-md border border-border-default bg-surface-default shadow-sm",
            "hover:bg-surface-input transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            TRIGGER_SIZE[size],
            className,
          )}
          aria-label={value ? `현재 아이콘: ${value}` : "아이콘 선택"}
        >
          {value ? (
            <DynamicIcon name={value as IconName} size={ICON_SIZE[size]} />
          ) : (
            <span className="text-text-tertiary">—</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn("p-[var(--spacing-md)]", CONTENT_WIDTH[size])}
      >
        <div className="relative mb-[var(--spacing-sm)]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-9"
          />
        </div>
        <ScrollArea className="max-h-60">
          <div className="grid grid-cols-8 gap-1">
            {filtered.map((name) => {
              const active = name === value;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange?.(name);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-center rounded-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    CELL_SIZE[size],
                    active
                      ? "bg-primary text-text-on-accent"
                      : "text-text-secondary hover:bg-surface-input hover:text-text-primary",
                  )}
                  aria-label={name}
                  aria-pressed={active}
                >
                  <DynamicIcon name={name} size={CELL_ICON_SIZE[size]} />
                </button>
              );
            })}
          </div>
        </ScrollArea>
        {totalMatching > MAX_VISIBLE && (
          <div className="mt-[var(--spacing-sm)] pt-[var(--spacing-sm)] border-t border-border-subtle text-[11px] text-text-tertiary text-center">
            총 {totalMatching}개 중 {MAX_VISIBLE}개 표시 — 더 자세히 검색해주세요
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { IconPicker };
export type { IconPickerProps };
