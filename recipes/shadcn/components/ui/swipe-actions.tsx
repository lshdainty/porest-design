import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Porest SwipeActions (Porest 자체 패턴 — shadcn 원본 없음)
 * spec: specs/components/swipe-actions.md (단일 SoT)
 *
 * - 리스트 행을 왼쪽으로 밀면 오른쪽에서 액션이 드러나는 모바일 전용 패턴.
 * - composition: SwipeActions > (children = 기존 행) + actions[]
 * - 행을 다시 만들지 않는다 — 감싸기만 한다. 행의 시각·탭 동작은 그대로.
 * - 액션은 고정 목록이 아니라 호출처가 1~3개를 조립한다(문자함은 삭제만, 메모는 고정도).
 *
 * 데스크톱에서는 래핑 자체를 걷어내고 children 을 그대로 통과시킨다 —
 * 마우스로 행을 미는 건 익숙한 동작이 아니다.
 *
 * full swipe 로 액션을 실행하지 않는다. 되돌리기(Undo)가 없어서, 밀다가 손이
 * 미끄러져 지워지는 것보다 한 번 더 누르게 하는 편이 낫다.
 */

/** 액션 하나의 폭(px). 한글 두 글자 + 20px 아이콘이 겹치지 않는 최소치. */
export const SWIPE_ACTION_WIDTH = 72;

/** 이 비율 이상 밀면 열린 채로 스냅한다. */
const OPEN_THRESHOLD = 0.4;

const swipeActionVariants = cva(
  // Radius 는 0 — 트레이는 행에 붙어 잘려 나오는 면이라 굴리면 행과 어긋나 보인다.
  // transform 은 쓰지 않는다(밀어 둔 트레이와 이중으로 움직여 어지럽다).
  "flex flex-col items-center justify-center gap-[2px] shrink-0 " +
    "w-[72px] min-h-[56px] self-stretch px-[var(--spacing-sm)] py-[var(--spacing-sm)] " +
    "text-caption font-semibold [&>svg]:size-5 " +
    "transition-[filter] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] " +
    "hover:brightness-92 active:brightness-88 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus " +
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100",
  {
    variants: {
      kind: {
        neutral: "bg-bg-page text-text-primary",
        primary: "bg-primary text-text-on-accent",
        destructive: "bg-error text-text-on-accent",
      },
    },
    defaultVariants: { kind: "neutral" },
  },
);

export interface SwipeAction extends VariantProps<typeof swipeActionVariants> {
  /** 버튼 라벨. 한글 두 글자 권장 — 그보다 길면 줄바꿈된다. */
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  /**
   * destructive 는 여기서 바로 지우지 말고 alert-dialog 로 확인부터 받는다.
   * 스와이프가 삭제까지의 거리를 줄인 만큼을 확인 단계로 되돌려 놓는다.
   */
  onSelect: () => void;
}

export interface SwipeActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 1~3개. 4개 이상이면 트레이가 행 폭을 먹어 무엇을 미는지 안 보인다. */
  actions: SwipeAction[];
  /** 포인터 장치(데스크톱)면 트레이 없이 children 만 렌더한다. */
  enabled?: boolean;
  children: React.ReactNode;
}

const SwipeActions = React.forwardRef<HTMLDivElement, SwipeActionsProps>(
  ({ actions, enabled = true, className, children, ...props }, ref) => {
    const [offset, setOffset] = React.useState(0);
    const startX = React.useRef<number | null>(null);
    const dragging = React.useRef(false);

    const trayWidth = actions.length * SWIPE_ACTION_WIDTH;
    const open = offset >= trayWidth * OPEN_THRESHOLD;

    if (!enabled || actions.length === 0) return <>{children}</>;

    const onPointerDown = (e: React.PointerEvent) => {
      startX.current = e.clientX;
      dragging.current = true;
    };

    const onPointerMove = (e: React.PointerEvent) => {
      if (!dragging.current || startX.current === null) return;
      // 왼쪽 방향만 쓴다. 오른쪽으로 밀면 0 에 머문다.
      const delta = startX.current - e.clientX;
      // 트레이 폭을 넘기면 저항 — 끝까지 밀려도 액션은 실행되지 않는다.
      const next = delta > trayWidth ? trayWidth + (delta - trayWidth) * 0.2 : delta;
      setOffset(Math.max(0, Math.min(next, trayWidth * 1.1)));
    };

    const onPointerUp = () => {
      dragging.current = false;
      startX.current = null;
      setOffset((cur) => (cur >= trayWidth * OPEN_THRESHOLD ? trayWidth : 0));
    };

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden bg-surface-default", className)}
        {...props}
      >
        {/* 트레이는 행 뒤에 늘 있다. 접혀 있을 땐 스크린리더에서 감춘다 —
            안 그러면 행마다 "편집 삭제" 를 읽는다. */}
        <div
          className="absolute inset-y-0 right-0 flex"
          aria-hidden={!open}
        >
          {actions.map((a) => (
            <button
              key={a.label}
              type="button"
              disabled={a.disabled}
              tabIndex={open ? 0 : -1}
              className={swipeActionVariants({ kind: a.kind })}
              onClick={a.onSelect}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "relative bg-surface-default",
            // 드래그 중에는 손가락을 1:1 로 따라간다 — 애니메이션을 걸면 붙어 있다는
            // 느낌이 깨진다. 손을 뗀 뒤 스냅할 때만 전환을 쓴다.
            !dragging.current &&
              "transition-transform duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] motion-reduce:transition-none",
          )}
          style={{ transform: `translateX(-${offset}px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          // 열려 있으면 탭은 닫기만 한다 — 열어 둔 걸 못 보고 누르는 경우가 많다.
          onClickCapture={(e) => {
            if (!open) return;
            e.preventDefault();
            e.stopPropagation();
            setOffset(0);
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);
SwipeActions.displayName = "SwipeActions";

export { SwipeActions, swipeActionVariants };
