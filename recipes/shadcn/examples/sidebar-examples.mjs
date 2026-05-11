/*
 * shadcn Sidebar 예제 — 정적 HTML preview는 expanded 상태의 frame 안에서 시각만 표현.
 */

const FRAME =
  "display:flex; width:100%; max-width:720px; height:480px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); overflow:hidden; background:var(--color-bg-page);";

const SIDEBAR =
  "display:flex; flex-direction:column; width:240px; flex-shrink:0; background:var(--color-surface-default); border-right:1px solid var(--color-border-default);";

const SIDEBAR_HEADER =
  "display:flex; flex-direction:column; gap:8px; padding:8px;";

const SIDEBAR_LOGO =
  "display:flex; align-items:center; gap:8px; padding:8px; border-radius:var(--radius-xs); font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);";

const GROUP =
  "display:flex; flex-direction:column; padding:8px;";

const GROUP_LABEL =
  "padding:8px 8px 4px; font-size:var(--text-label-sm); font-weight:500; color:var(--color-text-secondary);";

const MENU_BTN =
  "display:flex; align-items:center; gap:8px; padding:8px; border-radius:var(--radius-xs); font-size:var(--text-title-sm); color:var(--color-text-primary); cursor:default;";

const MENU_ACTIVE = `${MENU_BTN} background:var(--color-surface-input); font-weight:500;`;

const FOOTER =
  "display:flex; flex-direction:column; gap:8px; padding:8px; border-top:1px solid var(--color-border-default); margin-top:auto;";

const MAIN =
  "flex:1; padding:24px; overflow:auto; background:var(--color-bg-page);";

const MAIN_HEADER =
  "display:flex; align-items:center; gap:12px; margin-bottom:16px; padding-bottom:16px; border-bottom:1px solid var(--color-border-default);";

const TRIGGER_BTN =
  "display:inline-flex; align-items:center; justify-content:center; height:28px; width:28px; border-radius:var(--radius-xs); background:transparent; border:0; cursor:pointer; color:var(--color-text-primary);";

const HOME =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
const INBOX =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>';
const CALENDAR =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
const SEARCH =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
const SETTINGS =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
const PANEL =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>';
const LEAF =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c.8 3.36.42 6.36-1.4 8.04-2.06 1.74-2.34 1.32-4.4 3.04-1.78 1.5-2.4 4.05-2.4 5.96Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>';

export const sidebarExamples = [
  {
    title: "Default",
    description: "header(로고) + group(메뉴) + footer 구조 — 데스크탑 frame 안에서 항상 expanded.",
    jsx: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Leaf />
            <span>Porest</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>네비게이션</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Home />
                <span>홈</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Inbox />
                <span>받은편지함</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Calendar />
                <span>캘린더</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Search />
                <span>검색</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Settings />
            <span>설정</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <header className="flex h-14 items-center gap-2 px-4 border-b">
      <SidebarTrigger />
      <h1 className="text-title-md font-semibold">대시보드</h1>
    </header>
    <main className="p-4">콘텐츠 영역</main>
  </SidebarInset>
</SidebarProvider>`,
    render: () => `<div style="${FRAME}">
  <aside style="${SIDEBAR}">
    <div style="${SIDEBAR_HEADER}">
      <div style="${SIDEBAR_LOGO}">
        ${LEAF}
        <span>Porest</span>
      </div>
    </div>
    <div style="flex:1; overflow:auto;">
      <div style="${GROUP}">
        <div style="${GROUP_LABEL}">네비게이션</div>
        <div style="display:flex; flex-direction:column; gap:4px;">
          <div style="${MENU_ACTIVE}">${HOME}<span>홈</span></div>
          <div style="${MENU_BTN}">${INBOX}<span>받은편지함</span></div>
          <div style="${MENU_BTN}">${CALENDAR}<span>캘린더</span></div>
          <div style="${MENU_BTN}">${SEARCH}<span>검색</span></div>
        </div>
      </div>
    </div>
    <div style="${FOOTER}">
      <div style="${MENU_BTN}">${SETTINGS}<span>설정</span></div>
    </div>
  </aside>
  <main style="${MAIN}">
    <div style="${MAIN_HEADER}">
      <button style="${TRIGGER_BTN}" aria-label="사이드바 토글">${PANEL}</button>
      <h1 style="margin:0; font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:600; color:var(--color-text-primary);">대시보드</h1>
    </div>
    <div style="font-size:var(--text-body-md); color:var(--color-text-secondary);">콘텐츠 영역</div>
  </main>
</div>`,
  },
];
