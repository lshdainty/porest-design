/*
 * shadcn NavigationMenu 예제 — 정적 HTML preview는 첫 트리거 hover 상태.
 */

const LIST = "display:flex; align-items:center; justify-content:center; gap:4px; list-style:none; padding:0; margin:0;";

const TRIGGER =
  "display:inline-flex; height:40px; align-items:center; justify-content:center; padding:0 16px; border-radius:var(--radius-sm); background:var(--color-surface-default); font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-primary); cursor:pointer; transition:background-color 200ms;";

const TRIGGER_HOVER = `${TRIGGER} background:var(--color-surface-input);`;

const VIEWPORT =
  "margin-top:6px; height:auto; min-width:480px; overflow:hidden; border-radius:var(--radius-md); border:1px solid var(--color-border-default); background:var(--color-surface-default); box-shadow:var(--shadow-lg);";

const LINK_CARD =
  "display:flex; flex-direction:column; gap:4px; padding:12px; border-radius:var(--radius-sm); transition:background-color 200ms;";

const LINK_TITLE = "font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-primary);";
const LINK_DESC = "font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);";

const CHEVRON =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><polyline points="6 9 12 15 18 9"/></svg>';

export const navigationMenuExamples = [
  {
    title: "Default",
    description: "헤더 메인 네비게이션 — 트리거 hover 시 viewport에 컨텐츠 카드 노출.",
    jsx: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>시작하기</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/30 to-primary p-6 no-underline outline-none">
                <div className="text-title-md font-medium">Porest</div>
                <p className="text-body-sm text-text-secondary">사람과 일상이 숲처럼 자라나는</p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem href="/docs" title="소개">기본 가이드</ListItem>
          <ListItem href="/docs/installation" title="설치">npm install</ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>컴포넌트</NavigationMenuTrigger>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    render: () => `<div style="position:relative; padding-bottom:240px;">
  <ul style="${LIST}">
    <li><div style="${TRIGGER_HOVER}">시작하기${CHEVRON}</div></li>
    <li><div style="${TRIGGER}">컴포넌트${CHEVRON}</div></li>
    <li><div style="${TRIGGER}">소개</div></li>
  </ul>
  <div style="${VIEWPORT} position:absolute; top:48px; left:50%; transform:translateX(-50%);">
    <div style="display:grid; gap:12px; padding:16px; grid-template-columns:0.75fr 1fr;">
      <div style="grid-row:span 3; display:flex; flex-direction:column; justify-content:flex-end; padding:24px; border-radius:var(--radius-sm); background:linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 30%, transparent), var(--color-primary)); color:var(--color-text-on-accent);">
        <div style="font-size:var(--text-title-md); font-weight:500;">Porest</div>
        <div style="font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); opacity:0.85;">사람과 일상이 숲처럼 자라나는</div>
      </div>
      <a style="${LINK_CARD}">
        <div style="${LINK_TITLE}">소개</div>
        <div style="${LINK_DESC}">기본 가이드</div>
      </a>
      <a style="${LINK_CARD}">
        <div style="${LINK_TITLE}">설치</div>
        <div style="${LINK_DESC}">npm install</div>
      </a>
      <a style="${LINK_CARD}">
        <div style="${LINK_TITLE}">타이포그래피</div>
        <div style="${LINK_DESC}">Pretendard 베이스 15-token scale</div>
      </a>
    </div>
  </div>
</div>`,
  },
];
