/*
 * shadcn NavigationMenu 예제 — navigation-menu.md SoT 정합.
 * 3 trigger patterns(text+chevron / text-only / icon-only / text+icon) 모두 활용.
 * 한국 도메인 시나리오 + 타이포 토큰 명시.
 * 정적 HTML preview는 첫 trigger hover 상태(viewport는 default 예제만).
 */

const LIST = "display:flex; align-items:center; justify-content:center; gap:var(--spacing-xs); list-style:none; padding:0; margin:0;";
const NAV_WRAP = "display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-xl); padding:var(--spacing-md) var(--spacing-lg); background:var(--color-surface-default); border:1px solid var(--color-border-default); border-radius:var(--radius-md); max-width:880px;";
const LOGO = "font-size:var(--text-title-md); font-weight:600; color:var(--color-text-primary);";

const TRIGGER_BASE = "display:inline-flex; height:40px; align-items:center; justify-content:center; border:0; background:var(--color-surface-default); font-family:inherit; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); font-weight:500; color:var(--color-text-primary); cursor:pointer; transition:background-color var(--motion-duration-fast) var(--motion-ease-out);";

const TRIGGER_TEXT = `${TRIGGER_BASE} padding:var(--spacing-sm) var(--spacing-lg); border-radius:var(--radius-sm); gap:var(--spacing-xs);`;
const TRIGGER_TEXT_HOVER = `${TRIGGER_TEXT} background:var(--color-surface-input);`;
const TRIGGER_TEXT_OPEN = `${TRIGGER_TEXT} background:color-mix(in srgb, var(--color-surface-input) 50%, transparent);`;

const TRIGGER_LINK = `${TRIGGER_BASE} padding:0 var(--spacing-lg); border-radius:var(--radius-sm); text-decoration:none;`;
const TRIGGER_LINK_ACTIVE = `${TRIGGER_LINK} background:color-mix(in srgb, var(--color-surface-input) 50%, transparent);`;

const TRIGGER_ICON = `${TRIGGER_BASE} width:40px; padding:0; border-radius:var(--radius-sm);`;

const TRIGGER_TEXTICON = `${TRIGGER_BASE} padding:0 var(--spacing-md); border-radius:var(--radius-sm); gap:var(--spacing-xs); text-decoration:none;`;
const TRIGGER_TEXTICON_PRIMARY = `${TRIGGER_TEXTICON} background:var(--color-primary, var(--color-text-primary)); color:var(--color-text-on-accent, #fff);`;

const VIEWPORT =
  "margin-top:var(--spacing-xs); height:auto; min-width:480px; overflow:hidden; border-radius:var(--radius-md); border:1px solid var(--color-border-default); background:var(--color-surface-default); box-shadow:var(--shadow-lg);";

const LINK_CARD =
  "display:flex; flex-direction:column; gap:var(--spacing-xs); padding:var(--spacing-md); border-radius:var(--radius-sm); text-decoration:none; transition:background-color var(--motion-duration-fast) var(--motion-ease-out);";

const LINK_TITLE = "font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:500; color:var(--color-text-primary);";
const LINK_DESC = "font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);";

const CHEVRON =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:var(--spacing-xs);"><polyline points="6 9 12 15 18 9"/></svg>';

const ICON_SEARCH = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
const ICON_BELL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>';
const ICON_USER = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
const ICON_DOWNLOAD = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
const ICON_EXTERNAL = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
const ICON_PLUS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

const SR_ONLY = "position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0;";

export const navigationMenuExamples = [
  {
    title: "Marketing — viewport grid + hero panel",
    description: "기본 패턴 — `text + chevron` Trigger hover 시 viewport open. Hero panel(`primary` gradient + `text-title-md`)과 우측 link card grid(`text-title-sm` 제목 + `text-body-sm secondary` 설명).",
    jsx: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>시작하기</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-[var(--spacing-md)] p-[var(--spacing-lg)] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a className="flex h-full w-full flex-col justify-end rounded-sm bg-gradient-to-b from-primary/30 to-primary p-[var(--spacing-xl)] text-text-on-accent">
                <div className="text-title-md font-medium">Porest</div>
                <p className="text-body-sm opacity-90 mt-[var(--spacing-xs)]">사람과 일상이 숲처럼 자라나는</p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem href="/docs" title="소개">기본 가이드</ListItem>
          <ListItem href="/docs/installation" title="설치">npm install</ListItem>
          <ListItem href="/docs/typography" title="타이포그래피">Pretendard + 15-token scale</ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>컴포넌트</NavigationMenuTrigger>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    render: () => `<div style="position:relative; padding-bottom:280px;">
  <ul style="${LIST}">
    <li><div style="${TRIGGER_TEXT_OPEN}">시작하기${CHEVRON}</div></li>
    <li><div style="${TRIGGER_TEXT}">컴포넌트${CHEVRON}</div></li>
  </ul>
  <div style="${VIEWPORT} position:absolute; top:48px; left:50%; transform:translateX(-50%);">
    <div style="display:grid; gap:var(--spacing-md); padding:var(--spacing-lg); grid-template-columns:0.75fr 1fr;">
      <a style="grid-row:span 3; display:flex; flex-direction:column; justify-content:flex-end; padding:var(--spacing-xl); border-radius:var(--radius-sm); background:linear-gradient(180deg, color-mix(in srgb, var(--color-primary, var(--color-text-primary)) 30%, transparent), var(--color-primary, var(--color-text-primary))); color:var(--color-text-on-accent, #fff); text-decoration:none;">
        <div style="font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:500;">Porest</div>
        <div style="font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); opacity:0.9; margin-top:var(--spacing-xs);">사람과 일상이 숲처럼 자라나는</div>
      </a>
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
        <div style="${LINK_DESC}">Pretendard + 15-token scale</div>
      </a>
    </div>
  </div>
</div>`,
  },

  {
    title: "Header — 3 trigger 패턴 mix (text + icon-only + text+icon)",
    description: "Porest 헤더 — 좌측 카테고리(`text + chevron` × 2) + 직접 링크(`text-only` × 2) + 우측 universal action(`icon-only` × 2) + 강조(`text + icon` primary). 모든 trigger height `h-10` 통일, 패턴은 children으로만 분기.",
    jsx: `<header className="flex items-center justify-between px-[var(--spacing-lg)] py-[var(--spacing-md)]">
  <div className="flex items-center gap-[var(--spacing-xl)]">
    <span className="text-title-md font-semibold">Porest</span>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>제품</NavigationMenuTrigger>
          <NavigationMenuContent>...</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>회사</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
            가격
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/customers" className={navigationMenuTriggerStyle()}>
            고객사
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="/search" className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-surface-input">
          <Search size={18} />
          <span className="sr-only">검색</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/notifications" className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-surface-input">
          <Bell size={18} />
          <span className="sr-only">알림</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/download" className="inline-flex h-10 items-center gap-[var(--spacing-xs)] px-[var(--spacing-md)] rounded-sm bg-primary text-text-on-accent hover:brightness-105">
          <Download className="h-4 w-4" />
          다운로드
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</header>`,
    render: () => `<header style="${NAV_WRAP}">
  <div style="display:flex; align-items:center; gap:var(--spacing-xl);">
    <span style="${LOGO}">Porest</span>
    <ul style="${LIST}">
      <li><div style="${TRIGGER_TEXT}">제품${CHEVRON}</div></li>
      <li><div style="${TRIGGER_TEXT}">회사${CHEVRON}</div></li>
      <li><a style="${TRIGGER_LINK}" href="#">가격</a></li>
      <li><a style="${TRIGGER_LINK_ACTIVE}" href="#" aria-current="page">고객사</a></li>
    </ul>
  </div>
  <ul style="${LIST}">
    <li><a style="${TRIGGER_ICON}" href="#" aria-label="검색">${ICON_SEARCH}<span style="${SR_ONLY}">검색</span></a></li>
    <li><a style="${TRIGGER_ICON}" href="#" aria-label="알림">${ICON_BELL}<span style="${SR_ONLY}">알림</span></a></li>
    <li><a style="${TRIGGER_TEXTICON_PRIMARY}" href="#">${ICON_DOWNLOAD}다운로드</a></li>
  </ul>
</header>`,
  },

  {
    title: "Text-only — 단순 링크 nav (Desk 도메인)",
    description: "Desk 앱 — `text-only` Link만 5개(chevron 없음, viewport 없음). `body-md` + 500 + padding `lg` × `sm`. 활성 페이지는 `data-active` 또는 className override로 `surface-input/50` bg.",
    jsx: `<NavigationMenu>
  <NavigationMenuList>
    {pages.map(p => (
      <NavigationMenuItem key={p.href}>
        <NavigationMenuLink
          href={p.href}
          className={navigationMenuTriggerStyle()}
          data-active={p.active || undefined}
        >
          {p.label}
        </NavigationMenuLink>
      </NavigationMenuItem>
    ))}
  </NavigationMenuList>
</NavigationMenu>`,
    render: () => `<header style="${NAV_WRAP}">
  <div style="display:flex; align-items:center; gap:var(--spacing-xl);">
    <span style="${LOGO}">Desk</span>
    <ul style="${LIST}">
      <li><a style="${TRIGGER_LINK_ACTIVE}" href="#" aria-current="page">메모</a></li>
      <li><a style="${TRIGGER_LINK}" href="#">할일</a></li>
      <li><a style="${TRIGGER_LINK}" href="#">가계부</a></li>
      <li><a style="${TRIGGER_LINK}" href="#">캘린더</a></li>
      <li><a style="${TRIGGER_LINK}" href="#">통계</a></li>
    </ul>
  </div>
</header>`,
  },

  {
    title: "Icon-only — Action toolbar (검색·알림·사용자·빠른 추가)",
    description: "universal action toolbar — `icon-only` Link 4종. 40×40 정사각 + lucide icon 18 + `sr-only` 라벨(WCAG 2.4.4). hover 시 `surface-input` bg. 빠른 추가는 강조라 `primary` fill.",
    jsx: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/search" className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-surface-input">
        <Search size={18} />
        <span className="sr-only">검색</span>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/notifications" className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-surface-input">
        <Bell size={18} />
        <span className="sr-only">알림</span>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/me" className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-surface-input">
        <User size={18} />
        <span className="sr-only">내 계정</span>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/new" className="inline-flex h-10 items-center gap-[var(--spacing-xs)] px-[var(--spacing-md)] rounded-sm bg-primary text-text-on-accent hover:brightness-105">
        <Plus className="h-4 w-4" />
        빠른 추가
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    render: () => `<ul style="${LIST}">
  <li><a style="${TRIGGER_ICON}" href="#" aria-label="검색">${ICON_SEARCH}<span style="${SR_ONLY}">검색</span></a></li>
  <li><a style="${TRIGGER_ICON}" href="#" aria-label="알림">${ICON_BELL}<span style="${SR_ONLY}">알림</span></a></li>
  <li><a style="${TRIGGER_ICON}" href="#" aria-label="내 계정">${ICON_USER}<span style="${SR_ONLY}">내 계정</span></a></li>
  <li><a style="${TRIGGER_TEXTICON_PRIMARY}" href="#">${ICON_PLUS}빠른 추가</a></li>
</ul>`,
  },

  {
    title: "Text + Icon — 강조 액션 (다운로드 · 외부 링크)",
    description: "강조 액션 — `text + icon` Link. 다운로드(primary fill + `Download` 16 좌측) + 외부 링크(text-only + `ExternalLink` 16 우측, neutral). 같은 패턴이지만 강조 강도로 분기.",
    jsx: `<div className="flex gap-[var(--spacing-sm)]">
  <NavigationMenuLink href="/download" className="inline-flex h-10 items-center gap-[var(--spacing-xs)] px-[var(--spacing-md)] rounded-sm bg-primary text-text-on-accent hover:brightness-105">
    <Download className="h-4 w-4" />
    데스크탑 앱 다운로드
  </NavigationMenuLink>
  <NavigationMenuLink href="https://docs.porest.dev" target="_blank" className="inline-flex h-10 items-center gap-[var(--spacing-xs)] px-[var(--spacing-md)] rounded-sm text-text-primary hover:bg-surface-input">
    개발자 문서
    <ExternalLink className="h-4 w-4" />
  </NavigationMenuLink>
</div>`,
    render: () => `<ul style="${LIST}">
  <li><a style="${TRIGGER_TEXTICON_PRIMARY}" href="#">${ICON_DOWNLOAD}데스크탑 앱 다운로드</a></li>
  <li><a style="${TRIGGER_TEXTICON}" href="#" target="_blank" rel="noopener noreferrer">개발자 문서${ICON_EXTERNAL}</a></li>
</ul>`,
  },
];
