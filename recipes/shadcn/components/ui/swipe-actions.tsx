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

/** 원형 배지 지름(px). 행 높이 안에 배지 + 라벨이 함께 들어가는 최대치. */
export const SWIPE_BADGE_SIZE = 36;

/** 행 내용과 첫 액션 사이. 바짝 붙으면 배지가 행에 얹힌 것처럼 보인다. */
export const SWIPE_GAP_LEAD = 20;

/** 액션끼리 사이. 배지 둘이 붙으면 하나의 알약처럼 뭉쳐 보인다. */
export const SWIPE_GAP_BETWEEN = 12;

/**
 * 액션 하나가 차지하는 폭 — 배지 + 그 **앞** 간격.
 *
 * 간격을 앞에만 둔다. 뒤에도 두면 마지막 배지와 화면 끝이 벌어져 덜 열린 것처럼 보인다.
 */
export const swipeSlotWidth = (index: number) =>
  SWIPE_BADGE_SIZE + (index === 0 ? SWIPE_GAP_LEAD : SWIPE_GAP_BETWEEN);

/** 이 비율 이상 밀면 열린 채로 스냅한다. */
const OPEN_THRESHOLD = 0.4;

/**
 * 액션 = 원형 배지(아이콘) + 그 아래 라벨.
 *
 * 색은 배지만 갖는다 — 트레이에 색을 깔면 행 옆에 박스가 하나 더 생긴 것처럼 보이고,
 * 색 덩어리가 화면을 반 갈라 행보다 먼저 눈에 들어온다.
 *
 * transform 은 쓰지 않는다(밀어 둔 트레이와 이중으로 움직여 어지럽다).
 */
const swipeActionVariants = cva(
  "group flex flex-col items-center justify-center gap-[2px] shrink-0 " +
    "min-h-[56px] self-stretch bg-transparent " +
    "text-caption font-semibold " +
    "transition-[filter] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] " +
    "hover:brightness-92 active:brightness-88 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus " +
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100",
  {
    variants: {
      kind: {
        neutral: "text-text-secondary [&_.badge]:bg-bg-muted [&_.badge]:text-text-primary",
        primary: "text-text-secondary [&_.badge]:bg-info [&_.badge]:text-text-on-accent",
        destructive: "text-error [&_.badge]:bg-error [&_.badge]:text-text-on-accent",
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

    // 액션마다 슬롯 폭이 다르다 — 첫 액션만 행에서 더 떨어뜨린다.
    const trayWidth = actions.reduce((w, _, i) => w + swipeSlotWidth(i), 0);
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
          {/* 역순으로 그린다 — 조금만 밀면 바깥쪽부터 드러나므로, 순서대로 두면
              파괴적 액션이 제일 먼저 손에 닿는다. 호출처는 의미 순서 그대로 넘긴다. */}
          {[...actions].reverse().map((a, i) => (
            <button
              key={a.label}
              type="button"
              disabled={a.disabled}
              tabIndex={open ? 0 : -1}
              className={swipeActionVariants({ kind: a.kind })}
              // 간격을 배지 앞에만 둬 마지막 액션이 화면 끝에 딱 붙는다.
              style={{
                width: swipeSlotWidth(i),
                paddingLeft: i === 0 ? SWIPE_GAP_LEAD : SWIPE_GAP_BETWEEN,
              }}
              onClick={a.onSelect}
            >
              <span
                className="badge flex items-center justify-center rounded-full [&>svg]:size-[18px]"
                style={{ width: SWIPE_BADGE_SIZE, height: SWIPE_BADGE_SIZE }}
              >
                {a.icon}
              </span>
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
