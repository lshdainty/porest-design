import * as React from "react";
import { ChevronLeft, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { NotificationBadge } from "@/components/ui/notification-badge";
import { useLeaveConfirm } from "@/components/ui/alert-dialog";

/*
 * Porest Top Navigation — 구조는 SEED Top Navigation(Root · Standard, 2026-10-04). 수치 원본은 specs/components/top-navigation.yaml.
 * 데스크톱 머리(desktop)는 SEED 에 컴포넌트가 없어 porest 가 같은 규칙으로 더했다.
 *
 *   TopNavigation               바(<header> — main 밖, banner). type "root"(탭 첫 화면) · "standard"(기본 — 그 아래 화면 · HR 폰) ·
 *                               "desktop"(768 이상 Desk 의 머리 — 제목은 본문 맨 위 ScreenTitle). 자식은 아래 부품을 차례대로
 *   TopNavigationBackButton     ← "뒤로" — 앱 안에 앞 화면이 있으면 history.back()(react-router 의 navigate(-1) 와 같다), 없으면
 *                               fallbackHref(그 화면의 상위 화면 주소, 필수)로 지금 주소를 고쳐 간다(location.replace). onClick 을 주면
 *                               그것만 부른다(앱은 pop · 라우터로 옮기는 셸)
 *   TopNavigationCloseButton    ✕ "닫기" — onClick 필수(흐름의 처음 자리로). dirty 면 닫기 전에 "작성한 내용이 사라져요" 를 묻는다
 *   TopNavigationMenuButton     ☰ "주 메뉴" — aria-haspopup="dialog", aria-expanded · aria-controls 는 부르는 쪽이 준다(HR 폰의 주 메뉴 Side Panel)
 *   TopNavigationTitle          제목 <h1 tabIndex={-1} data-screen-title> — 한 줄 말줄임. desktop 에서는 그리지 않는다(본문 ScreenTitle)
 *   TopNavigationActions        오른쪽 자리 — TopNavigationIconButton 3개까지(2개 권장) 또는 TopNavigationTextButton 하나,
 *                               desktop 이면 맨 앞에 TopNavigationPrimaryButton 하나
 *   TopNavigationIconButton     아이콘 버튼 — 상자 44 = 누르는 영역 · 아이콘 24. aria-label 필수. notification 은 벨의 알림 점(점만 —
 *                               이름에 "새 알림 있음" 을 넣는 것은 부르는 쪽). 그 밖은 <button type="button"> 속성.
 *                               aria-pressed 를 주면 켜고 끄는 단추(금액 가리기) — 이름은 고정, 아이콘은 지금 상태를 넘긴다(가렸으면 eye-off)
 *   TopNavigationTextButton     글 버튼("완료" · "모두 읽음") — 오른쪽 자리에 하나, 아이콘 버튼과 섞지 않는다
 *   TopNavigationPrimaryButton  데스크톱 머리의 주 버튼 — Button brandSolid · small 그대로 + 오른쪽 8
 *   ScreenTitle                 데스크톱 본문 맨 위 제목 <h1 tabIndex={-1} data-screen-title> — text-screen-title 26 / 35 · 700, 머리 아래 20
 *   TopNavigationProvider       product("Porest Desk" · "Porest HR") — useScreenTitle(title) 가 문서 제목을 "{title} - {product}" 로 쓴다
 *   focusScreenTitle()          셸이 화면을 옮긴 뒤 부른다 — 본문 스크롤을 맨 위로, 보이는 [data-screen-title] 에 초점(링은 키보드로 왔을 때만)
 *
 * 바: 높이 56 — 폰 · 데스크톱 모든 화면이 같다. 위 안전 영역만큼 높아지고 내용은 그 아래 56 에 놓인다(바탕은 화면 끝까지).
 *   좌우 6 + 좌우 안전 영역(맨 끝 버튼 상자가 화면 끝에서 6 · 아이콘은 16). desktop 은 왼쪽이 본문 여백 32(layout-margin).
 *   바탕은 불투명한 bg-layer-default, 맨 위에 붙어(sticky) 스크롤해도 그 자리 — 선 · 그림자 · 숨김이 없다(결정 3 — SEED). z-sticky 50.
 * 제목: 왼쪽 정렬 · 700 · fg-neutral · 한 줄 말줄임, 오른쪽 자리 앞 8 을 늘 비운다(SEED titleMinGap). root 는 t8 22 / 30 · 화면 끝에서 16,
 *   standard 는 t6 18 / 24 · 화면 끝에서 56(6 + ← 44 + 6). 글자 크기 설정을 1.2배까지만 따른다(clamp — 바 높이는 56 그대로).
 * 아이콘 버튼: 상자 44 · 모서리 r2 8 · 아이콘 24 fg-neutral · 버튼끼리 붙는다(아이콘 중심 간격 44). 바탕은 누를 때 · 마우스를 올릴 때만
 *   bg-layer-default-pressed(불투명 — SEED bg.transparent-pressed 의 짝), 누르면 2px 거리 축소(44 → 0.955). 본문의 Button iconOnly(40 · 18)와 다른 부품이다.
 *   켜고 끄는 단추(aria-pressed)는 켬 선 2.5 · 끔 선 2 이고 색은 켬 · 끔 모두 fg-neutral 이다 — Toggle 의 흐린 끔(fg-neutral-muted)을
 *   상단 바에서 쓰지 않는다(아이콘 줄에서 하나만 흐리면 막힌 단추처럼 보인다, 사용자 결정 2026-10-09 19B). 바탕도 켬 · 끔에 따라 바뀌지 않는다.
 *   알림 점은 Notification Badge small — 24 아이콘 상자의 x 17 ~ 23 · y 1 ~ 7, 점만(숫자는 맨 오른쪽 버튼에서 화면 밖으로 나간다).
 * 글 버튼: 높이 44 · 좌우 10 · 모서리 8 · t5 16 / 22 · 500(1.2배까지), 누름 · 호버 같은 바탕 + 2px 거리 축소(기준 max(44, 폭 ÷ 4, 24)).
 * 막힘: 아이콘 · 글 fg-disabled — 흐리게 하지 않는다. 키보드 포커스에만 버튼 상자 안쪽 2px 링(붙은 이웃 · 화면 끝에 걸리지 않게).
 * 모션: 바탕 색 150ms easing · 축소 150ms pressed-scale(모션 줄이기면 축소하지 않는다).
 */

type TopNavigationType = "root" | "standard" | "desktop";

const TypeContext = React.createContext<TopNavigationType>("standard");

// ── 바 ───────────────────────────────────────────────────────
// 위 안전 영역은 바탕만 채우고 내용은 그 아래 56 에. 좌우는 6(desktop 왼쪽은 32) + 그쪽 안전 영역
const ROOT = [
  "sticky top-0 z-(--z-sticky) w-full shrink-0 bg-bg-layer-default pt-[env(safe-area-inset-top)] font-sans text-fg-neutral",
  "pr-[calc(var(--spacing-x1_5)+env(safe-area-inset-right))]",
].join(" ");
const ROOT_LEFT: Record<TopNavigationType, string> = {
  root: "pl-[calc(var(--spacing-x1_5)+env(safe-area-inset-left))]",
  standard: "pl-[calc(var(--spacing-x1_5)+env(safe-area-inset-left))]",
  desktop: "pl-[calc(var(--layout-margin)+env(safe-area-inset-left))]",
};

export interface TopNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** root — 탭 첫 화면(큰 제목) · standard — 그 아래 화면(← + 제목, 기본) · desktop — 768 이상 Desk 의 머리(제목은 본문) */
  type?: TopNavigationType;
}

const TopNavigation = React.forwardRef<HTMLElement, TopNavigationProps>(({ type = "standard", className, children, ...props }, ref) => (
  <TypeContext.Provider value={type}>
    <header ref={ref} data-slot="top-navigation" data-type={type} className={cn(ROOT, ROOT_LEFT[type], className)} {...props}>
      <div data-slot="top-navigation-row" className="flex h-[56px] items-center">
        {children}
      </div>
    </header>
  </TypeContext.Provider>
));
TopNavigation.displayName = "TopNavigation";

// ── 제목 ─────────────────────────────────────────────────────
// 글자 크기 설정은 1.2배까지 — 크기 · 줄 높이 모두 clamp(고정 값(-static), 설정을 따르는 값(rem), 고정 값 × 1.2).
// Tailwind 는 소스의 글자 그대로를 읽으므로 쓰는 셋(t8 · t6 · t5)을 풀어 적는다
const TEXT_T8 =
  "text-[length:clamp(var(--text-t8-static),var(--text-t8),calc(var(--text-t8-static)*1.2))] leading-[clamp(var(--text-t8-static--line-height),var(--text-t8--line-height),calc(var(--text-t8-static--line-height)*1.2))]";
const TEXT_T6 =
  "text-[length:clamp(var(--text-t6-static),var(--text-t6),calc(var(--text-t6-static)*1.2))] leading-[clamp(var(--text-t6-static--line-height),var(--text-t6--line-height),calc(var(--text-t6-static--line-height)*1.2))]";
const TEXT_T5 =
  "text-[length:clamp(var(--text-t5-static),var(--text-t5),calc(var(--text-t5-static)*1.2))] leading-[clamp(var(--text-t5-static--line-height),var(--text-t5--line-height),calc(var(--text-t5-static--line-height)*1.2))]";

// 제목 — 한 줄 말줄임 · 700, 오른쪽 자리 앞 8 은 TopNavigationActions 가 비운다. 화면을 옮기면 초점을 받는다(링은 키보드로 왔을 때만)
const TITLE = [
  "m-0 min-w-0 flex-1 truncate font-bold text-fg-neutral",
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stroke-focus-ring",
].join(" ");
// root — 화면 끝에서 16(바의 6 + 10). standard — ← 다음 6 = 화면 끝에서 56(왼쪽 버튼이 없으면 50 을 띄워 같은 자리)
const TITLE_TYPE: Record<Exclude<TopNavigationType, "desktop">, string> = {
  root: cn("ml-[10px]", TEXT_T8),
  standard: cn("ml-x1_5 first:ml-[50px]", TEXT_T6),
};

const TopNavigationTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => {
  const type = React.useContext(TypeContext);
  if (type === "desktop") {
    if (import.meta.env.DEV) console.warn("[TopNavigation] 데스크톱 머리에는 제목을 두지 않는다 — 본문 맨 위 ScreenTitle 을 쓴다.");
    return null;
  }
  return <h1 ref={ref} tabIndex={-1} data-screen-title="" data-slot="top-navigation-title" className={cn(TITLE, TITLE_TYPE[type], className)} {...props} />;
});
TopNavigationTitle.displayName = "TopNavigationTitle";

// ── 오른쪽 자리 ──────────────────────────────────────────────
// 제목 끝 ↔ 첫 버튼 상자 8(SEED titleMinGap) — 제목이 없으면 오른쪽으로 민다. 버튼끼리는 붙는다
const TopNavigationActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="top-navigation-actions" className={cn("ml-auto flex shrink-0 items-center pl-x2", className)} {...props} />
));
TopNavigationActions.displayName = "TopNavigationActions";

// ── 버튼 ─────────────────────────────────────────────────────
const PRESS_TRANSITION =
  "[transition:background-color_var(--motion-duration-color-transition)_var(--motion-ease-easing),scale_var(--motion-duration-pressed-scale)_var(--motion-ease-pressed-scale)]";
const FOCUS_INSIDE = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stroke-focus-ring";

// 아이콘 버튼 — 상자 44 = 누르는 영역 · 아이콘 24. 누르면 바탕 + 2px 거리 축소(44 → 0.955), 막히면 fg-disabled(바탕 · 축소 없음)
const ICON_BUTTON = [
  "relative flex size-[44px] shrink-0 cursor-pointer items-center justify-center rounded-r2 border-0 bg-transparent p-0 text-fg-neutral",
  "[&_svg]:size-6 [&_svg]:shrink-0",
  // 켜고 끄는 단추(aria-pressed) — 끔 선 2 · 켬 선 2.5, 색은 그대로 fg-neutral(19B). aria-pressed 가 없는 버튼의 선은 건드리지 않는다
  "aria-[pressed=false]:[&_svg]:[stroke-width:2] aria-pressed:[&_svg]:[stroke-width:2.5]",
  PRESS_TRANSITION,
  "hover:bg-bg-layer-default-pressed active:bg-bg-layer-default-pressed active:[scale:calc(1-2/44)] motion-reduce:active:[scale:1]",
  FOCUS_INSIDE,
  "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-fg-disabled disabled:[scale:1]",
].join(" ");

// 글 버튼 — 높이 44 · 좌우 10 · t5 · 500. 누르는 순간 기준 max(44, 폭 ÷ 4, 24) 를 잰다
const TEXT_BUTTON = [
  "relative flex h-[44px] shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-r2 border-0 bg-transparent px-x2_5 font-sans font-medium text-fg-neutral",
  TEXT_T5,
  PRESS_TRANSITION,
  "hover:bg-bg-layer-default-pressed active:bg-bg-layer-default-pressed active:[scale:calc(1-2/var(--press-basis,44))] motion-reduce:active:[scale:1]",
  FOCUS_INSIDE,
  "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-fg-disabled disabled:[scale:1]",
].join(" ");

function measurePress(el: HTMLElement) {
  el.style.setProperty("--press-basis", String(Math.max(el.offsetHeight, el.offsetWidth / 4, 24)));
}

export interface TopNavigationIconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "aria-label"> {
  /** 이름 — "검색" · "알림" · "{화면 이름} 더보기". 알림 점이 있으면 "알림, 새 알림 있음" */
  "aria-label": string;
  /** 벨의 알림 점(Notification Badge small) — 점만, 이름에도 넣는다 */
  notification?: boolean;
}

const TopNavigationIconButton = React.forwardRef<HTMLButtonElement, TopNavigationIconButtonProps>(
  ({ notification = false, className, children, ...props }, ref) => (
    <button ref={ref} type="button" data-slot="top-navigation-icon-button" className={cn(ICON_BUTTON, className)} {...props}>
      {/* 아이콘 · 점은 장식 — 이름은 aria-label */}
      <NotificationBadge aria-hidden visible={notification}>
        {children}
      </NotificationBadge>
    </button>
  ),
);
TopNavigationIconButton.displayName = "TopNavigationIconButton";

const TopNavigationTextButton = React.forwardRef<HTMLButtonElement, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">>(
  ({ className, onPointerDown, onKeyDown, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-slot="top-navigation-text-button"
      className={cn(TEXT_BUTTON, className)}
      onPointerDown={(e) => {
        measurePress(e.currentTarget);
        onPointerDown?.(e);
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") measurePress(e.currentTarget);
        onKeyDown?.(e);
      }}
      {...props}
    />
  ),
);
TopNavigationTextButton.displayName = "TopNavigationTextButton";

// 데스크톱 머리의 주 버튼 — Button brandSolid small 그대로, 첫 아이콘 버튼 상자와 8
const TopNavigationPrimaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "variant" | "size">>(({ className, ...props }, ref) => (
  <Button ref={ref} variant="brandSolid" size="small" data-slot="top-navigation-primary-button" className={cn("mr-x2", className)} {...props} />
));
TopNavigationPrimaryButton.displayName = "TopNavigationPrimaryButton";

// ── 왼쪽 버튼 ────────────────────────────────────────────────
// 앱 안에 앞 화면이 있는가 — react-router 는 history.state.idx 로 센다. 없으면 같은 사이트에서 들어왔는지 본다
function hasPreviousEntry() {
  const state = window.history.state as { idx?: unknown } | null;
  if (state && typeof state.idx === "number") return state.idx > 0;
  try {
    return document.referrer !== "" && new URL(document.referrer).origin === window.location.origin && window.history.length > 1;
  } catch {
    return false;
  }
}

export interface TopNavigationBackButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children" | "aria-label"> {
  /** 그 화면의 상위 화면 주소 — 앞 화면이 없으면(주소로 바로 · 알림 · 새 탭) 이 주소로 지금 주소를 고쳐 간다 */
  fallbackHref: string;
  /** 이름 — 기본 "뒤로" */
  "aria-label"?: string;
}

const TopNavigationBackButton = React.forwardRef<HTMLButtonElement, TopNavigationBackButtonProps>(
  ({ fallbackHref, onClick, "aria-label": ariaLabel = "뒤로", ...props }, ref) => (
    <TopNavigationIconButton
      ref={ref}
      aria-label={ariaLabel}
      data-slot="top-navigation-back-button"
      onClick={(e) => {
        // onClick 을 주면 그것만 — 앱은 pop, 라우터를 쓰는 셸은 navigate(-1) · navigate(fallbackHref, { replace: true })
        if (onClick) {
          onClick(e);
          return;
        }
        if (hasPreviousEntry()) window.history.back();
        else window.location.replace(fallbackHref);
      }}
      {...props}
    >
      <ChevronLeft />
    </TopNavigationIconButton>
  ),
);
TopNavigationBackButton.displayName = "TopNavigationBackButton";

export interface TopNavigationCloseButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children" | "aria-label" | "onClick"> {
  /** 흐름을 닫고 처음 자리로 — dirty 면 묻고 [나가기] 를 골랐을 때만 부른다 */
  onClick: () => void;
  /** 입력한 값이 있다 — 닫기 전에 "작성한 내용이 사라져요" 를 묻는다 */
  dirty?: boolean;
  /** 이름 — 기본 "닫기" */
  "aria-label"?: string;
}

const TopNavigationCloseButton = React.forwardRef<HTMLButtonElement, TopNavigationCloseButtonProps>(
  ({ onClick, dirty = false, "aria-label": ariaLabel = "닫기", ...props }, ref) => {
    const own = React.useRef<HTMLButtonElement | null>(null);
    const leave = useLeaveConfirm({ dirty, leave: onClick, contentRef: own });
    return (
      <>
        <TopNavigationIconButton
          ref={(node) => {
            own.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          aria-label={ariaLabel}
          data-slot="top-navigation-close-button"
          onClick={() => leave.request()}
          {...props}
        >
          <X />
        </TopNavigationIconButton>
        {leave.node}
      </>
    );
  },
);
TopNavigationCloseButton.displayName = "TopNavigationCloseButton";

export interface TopNavigationMenuButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children" | "aria-label"> {
  /** 이름 — 기본 "주 메뉴" */
  "aria-label"?: string;
}

// ☰ — 주 메뉴(왼쪽 Side Panel)를 연다. aria-expanded · aria-controls 는 부르는 쪽이 준다
const TopNavigationMenuButton = React.forwardRef<HTMLButtonElement, TopNavigationMenuButtonProps>(
  ({ "aria-label": ariaLabel = "주 메뉴", ...props }, ref) => (
    <TopNavigationIconButton ref={ref} aria-label={ariaLabel} aria-haspopup="dialog" data-slot="top-navigation-menu-button" {...props}>
      <Menu />
    </TopNavigationIconButton>
  ),
);
TopNavigationMenuButton.displayName = "TopNavigationMenuButton";

// ── 데스크톱 본문 제목 ───────────────────────────────────────
const ScreenTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    tabIndex={-1}
    data-screen-title=""
    data-slot="screen-title"
    className={cn("m-0 mt-nav-to-title font-sans text-screen-title font-bold text-fg-neutral", FOCUS_INSIDE, className)}
    {...props}
  />
));
ScreenTitle.displayName = "ScreenTitle";

// ── 문서 제목 · 화면을 옮길 때 ───────────────────────────────
const ProductContext = React.createContext<string | null>(null);

/** 서비스 이름 — 문서 제목의 뒤("{화면 제목} - Porest Desk"). 앱 맨 위에 한 번 둔다 */
function TopNavigationProvider({ product, children }: { product: string; children?: React.ReactNode }) {
  return <ProductContext.Provider value={product}>{children}</ProductContext.Provider>;
}
TopNavigationProvider.displayName = "TopNavigationProvider";

/** 문서 제목을 "{title} - {product}" 로 쓴다(Provider 가 없으면 title 만) */
function useScreenTitle(title: string) {
  const product = React.useContext(ProductContext);
  React.useEffect(() => {
    document.title = product ? `${title} - ${product}` : title;
  }, [title, product]);
}

const isScrollable = (el: Element) => {
  const overflowY = getComputedStyle(el).overflowY;
  return (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") && el.scrollHeight > el.clientHeight;
};

/**
 * 화면을 옮긴 뒤 셸이 부른다 — 본문 스크롤(창 · main 과 제목을 감싼 스크롤 상자)을 맨 위로 보내고, 보이는 [data-screen-title] 에
 * 초점을 둔다(스크롤은 옮기지 않는다). 링은 키보드로 왔을 때만 보인다(:focus-visible).
 */
function focusScreenTitle() {
  const title = Array.from(document.querySelectorAll<HTMLElement>("[data-screen-title]")).find((el) => el.getClientRects().length > 0) ?? null;
  const main = document.querySelector("main");
  const boxes = new Set<Element>();
  for (const start of [main, title]) {
    for (let node: Element | null = start; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
      if (isScrollable(node)) boxes.add(node);
    }
  }
  for (const box of boxes) box.scrollTop = 0;
  window.scrollTo({ top: 0, left: window.scrollX });
  title?.focus({ preventScroll: true });
}

export {
  TopNavigation,
  TopNavigationBackButton,
  TopNavigationCloseButton,
  TopNavigationMenuButton,
  TopNavigationTitle,
  TopNavigationActions,
  TopNavigationIconButton,
  TopNavigationTextButton,
  TopNavigationPrimaryButton,
  ScreenTitle,
  TopNavigationProvider,
  useScreenTitle,
  focusScreenTitle,
};
