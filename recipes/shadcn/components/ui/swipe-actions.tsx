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
 * 마우스로 행을 미는 건 익숙한 동작이 아니다. 판정은 뷰포트 폭이며(spec Platform),
 * 이 컴포넌트는 판정하지 않고 `enabled` 로 받는다.
 *
 * full swipe 로 액션을 실행하지 않는다. 되돌리기(Undo)가 없어서, 밀다가 손이
 * 미끄러져 지워지는 것보다 한 번 더 누르게 하는 편이 낫다.
 *
 * "한 번에 한 행만 열린다" 와 "리스트 스크롤 시 닫힌다" 는 리스트 조상이 맡는다 —
 * 행 하나가 다른 행의 상태를 알 수 없다. 이 파일은 행 하나의 제스처만 책임진다.
 */

/** 원형 배지 지름(px). 행 높이 안에 배지 + 라벨이 함께 들어가는 최대치. */
export const SWIPE_BADGE_SIZE = 36;

/** 배지 안 아이콘(px). */
export const SWIPE_ICON_SIZE = 18;

/** 행 내용과 첫 액션 사이. 바짝 붙으면 배지가 행에 얹힌 것처럼 보인다. */
export const SWIPE_GAP_LEAD = 20;

/** 액션끼리 사이. 배지 둘이 붙으면 하나의 알약처럼 뭉쳐 보인다. */
export const SWIPE_GAP_BETWEEN = 12;

/** 배지와 라벨 사이. */
export const SWIPE_LABEL_GAP = 2;

/** 슬롯 최소 높이 — WCAG 2.5.5(AAA, 44×44)를 밑돌지 않게. */
export const SWIPE_MIN_HEIGHT = 56;

/**
 * 액션 하나가 차지하는 폭 — 배지 + 그 **앞** 간격.
 *
 * 간격을 앞에만 둔다. 뒤에도 두면 마지막 배지와 화면 끝이 벌어져 덜 열린 것처럼 보인다.
 */
export const swipeSlotWidth = (index: number) =>
  SWIPE_BADGE_SIZE + (index === 0 ? SWIPE_GAP_LEAD : SWIPE_GAP_BETWEEN);

/** 트레이 전체 폭 — 1개 56 / 2개 104 / 3개 152. */
export const swipeTrayWidth = (count: number) =>
  Array.from({ length: count }, (_, i) => swipeSlotWidth(i)).reduce(
    (a, b) => a + b,
    0,
  );

/** 닫힌 상태에서 이 비율 이상 밀면 열린 채로 스냅한다. */
const OPEN_THRESHOLD = 0.4;

/**
 * 열린 상태에서 **되돌려 민** 거리가 이 비율 이상이면 닫는다.
 *
 * 여는 임계(0.4)를 닫는 쪽에 그대로 걸지 않는다 — 두 범위가 맞물려 아예 열리지 않는다.
 * spec Behavior 가 값을 구현체에 위임한다.
 */
const CLOSE_THRESHOLD = 0.25;

/** 이보다 짧은 이동은 탭으로 본다 — 축을 판정하지 않는다. */
const DEAD_ZONE = 8;

/** 가로로 확정하는 기울기. 45°(1배)면 세로로 훑는 중 스크롤이 끊긴다. */
const AXIS_RATIO = 1.5;

type SwipeAxis = "none" | "x" | "y";

/** 데드존을 넘은 뒤 어느 축의 제스처인지 확정한다. */
const resolveAxis = (dx: number, dy: number): SwipeAxis => {
  if (Math.hypot(dx, dy) < DEAD_ZONE) return "none";
  return Math.abs(dx) > Math.abs(dy) * AXIS_RATIO ? "x" : "y";
};

/** 트레이 폭에서 하드 스톱. 반대 방향으로 밀면 0 에 머문다. */
const clampOffset = (dragged: number, tray: number) =>
  Math.max(0, Math.min(dragged, tray));

/**
 * 액션 = 원형 배지(아이콘) + 그 아래 라벨.
 *
 * 색은 배지만 갖는다 — 트레이에 색을 깔면 행 옆에 박스가 하나 더 생긴 것처럼 보이고,
 * 색 덩어리가 화면을 반 갈라 행보다 먼저 눈에 들어온다.
 *
 * destructive 라벨만 다크에서 밝은 변형으로 갈린다 — `--color-error` 는 surface-default-dark
 * 대비 3.0:1 로 본문 기준(4.5:1)에 미달한다. 배지 **안** 아이콘은 채움 위에 얹히므로
 * kind 와 무관하게 text-on-accent 하나다.
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
        neutral:
          "text-text-secondary [&_.badge]:bg-surface-input [&_.badge]:text-text-primary",
        primary:
          "text-text-secondary [&_.badge]:bg-info [&_.badge]:text-text-on-accent",
        destructive:
          "text-error dark:text-error-light [&_.badge]:bg-error [&_.badge]:text-text-on-accent",
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
   * destructive 는 여기서 바로 지우지 말고 확인 다이얼로그부터 받는다.
   * 스와이프가 삭제까지의 거리를 줄인 만큼을 확인 단계로 되돌려 놓는다.
   *
   * 트레이는 **먼저 닫히고** 나서 호출된다 — 열어 둔 채 다이얼로그를 띄우면
   * 취소하고 돌아왔을 때 그대로 열려 있고, 실행한 경우엔 사라진 행 자리에 트레이만 남는다.
   */
  onSelect: () => void;
}

export interface SwipeActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 1~3개. 4개 이상이면 트레이가 행 폭을 먹어 무엇을 미는지 안 보인다. */
  actions: SwipeAction[];
  /** 포인터 장치(데스크톱)면 트레이 없이 children 만 렌더한다. */
  enabled?: boolean;
  /** 액션 접근명에 붙는 행 제목 — "삭제: 스타벅스". 열린 트레이를 훑을 때 어느 행인지 알 수 있게. */
  rowLabel?: string;
  children: React.ReactNode;
}

const SwipeActions = React.forwardRef<HTMLDivElement, SwipeActionsProps>(
  ({ actions, enabled = true, rowLabel, className, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    const rowRef = React.useRef<HTMLDivElement>(null);
    /** 제스처 시작점 + 시작 시점의 오프셋. 드래그 중에만 값이 있다. */
    const start = React.useRef<{ x: number; y: number; offset: number } | null>(
      null,
    );
    const axis = React.useRef<SwipeAxis>("none");
    /** 현재 오프셋. 드래그 중에는 리렌더 없이 CSS 변수로만 반영한다. */
    const offset = React.useRef(0);

    // 액션마다 슬롯 폭이 다르다 — 첫 액션만 행에서 더 떨어뜨린다.
    const trayWidth = swipeTrayWidth(actions.length);

    /** 드래그 추종은 손가락을 1:1 로 따라간다 — 리렌더를 태우면 따라오는 속도가 어긋난다. */
    const paint = (next: number) => {
      offset.current = next;
      rowRef.current?.style.setProperty("--swipe-offset", `${next}px`);
    };

    const close = React.useCallback(() => {
      setOpen(false);
      paint(0);
    }, []);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      start.current = { x: e.clientX, y: e.clientY, offset: offset.current };
      axis.current = "none";
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const s = start.current;
      if (!s) return;

      const rawX = e.clientX - s.x;
      const rawY = e.clientY - s.y;

      if (axis.current === "none") {
        const next = resolveAxis(rawX, rawY);
        if (next === "none") return;
        axis.current = next;
        // 세로로 확정되면 이번 제스처는 포기한다 — 스크롤은 브라우저가 처리 중이다.
        if (next === "y") {
          start.current = null;
          return;
        }
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
      }

      // RTL 은 미는 방향이 뒤집힌다 — 트레이가 드러나는 거리를 양수로 맞춘다.
      const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
      const revealed = s.offset + (rtl ? rawX : -rawX);
      paint(clampOffset(revealed, trayWidth));
    };

    const settle = () => {
      const s = start.current;
      start.current = null;
      if (axis.current !== "x") {
        axis.current = "none";
        return;
      }
      axis.current = "none";
      setDragging(false);

      // 열 때와 닫을 때가 다른 값을 쓴다 — 같은 값을 걸면 두 범위가 맞물려 아예 열리지 않는다.
      const wasOpen = (s?.offset ?? 0) > 0;
      const next = wasOpen
        ? trayWidth - offset.current < trayWidth * CLOSE_THRESHOLD
        : offset.current >= trayWidth * OPEN_THRESHOLD;

      setOpen(next);
      paint(next ? trayWidth : 0);
    };

    if (!enabled || actions.length === 0) return <>{children}</>;

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-surface-default touch-pan-y select-none",
          "[--swipe-offset:0px] [--swipe-dir:-1] rtl:[--swipe-dir:1]",
          "[-webkit-touch-callout:none]",
          className,
        )}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            close();
            rowRef.current?.focus();
          }
        }}
        {...props}
      >
        {/* 트레이는 행 뒤에 늘 있다. 접혀 있을 땐 스크린리더에서 감춘다 —
            안 그러면 행마다 "편집 삭제" 를 읽는다. */}
        <div
          className="absolute inset-y-0 end-0 flex"
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
              aria-label={rowLabel ? `${a.label}: ${rowLabel}` : a.label}
              className={swipeActionVariants({ kind: a.kind })}
              // 간격을 배지 앞에만 둬 마지막 액션이 트레이 끝에 딱 붙는다.
              style={{
                inlineSize: swipeSlotWidth(i),
                paddingInlineStart:
                  i === 0 ? SWIPE_GAP_LEAD : SWIPE_GAP_BETWEEN,
                minBlockSize: SWIPE_MIN_HEIGHT,
              }}
              // 트레이를 먼저 닫고 실행한다 — 열어 둔 채 다이얼로그를 띄우면
              // 취소하고 돌아왔을 때 그대로 열려 있다.
              onClick={() => {
                close();
                a.onSelect();
              }}
            >
              <span
                className="badge flex items-center justify-center rounded-full [&>svg]:size-[18px]"
                style={{
                  inlineSize: SWIPE_BADGE_SIZE,
                  blockSize: SWIPE_BADGE_SIZE,
                }}
              >
                {a.icon}
              </span>
              {a.label}
            </button>
          ))}
        </div>

        <div
          ref={rowRef}
          className={cn(
            "relative bg-surface-default",
            // 드래그 중에는 손가락을 1:1 로 따라간다 — 애니메이션을 걸면 붙어 있다는
            // 느낌이 깨진다. 손을 뗀 뒤 스냅할 때만 전환을 쓴다.
            !dragging &&
              "transition-transform duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] motion-reduce:transition-none",
          )}
          style={{
            transform: "translateX(calc(var(--swipe-dir) * var(--swipe-offset)))",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={settle}
          onPointerCancel={settle}
          // 열려 있으면 탭은 닫기만 한다 — 열어 둔 걸 못 보고 누르는 경우가 많다.
          onClickCapture={(e) => {
            if (!open) return;
            e.preventDefault();
            e.stopPropagation();
            close();
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
