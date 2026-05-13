/*
 * shadcn Sidebar 예제 — sidebar.md SoT 정합.
 * 데스크탑 frame 안 expanded 상태 정적 시각. 실제 토글/모바일 Sheet는 React.
 * 한국 도메인 3종 (Default + HR 어드민 inset + Desk 앱) + 타이포 토큰 명시.
 */

const FRAME =
  "display:flex; width:100%; max-width:720px; height:480px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); overflow:hidden; background:var(--color-bg-page);";

const FRAME_INSET =
  "display:flex; width:100%; max-width:720px; height:480px; border-radius:var(--radius-md); overflow:hidden; background:var(--color-bg-page); padding:var(--spacing-sm); gap:var(--spacing-sm);";

const SIDEBAR =
  "display:flex; flex-direction:column; width:240px; flex-shrink:0; background:var(--color-surface-default); border-right:1px solid var(--color-border-default);";

const SIDEBAR_INSET =
  "display:flex; flex-direction:column; width:240px; flex-shrink:0; background:var(--color-surface-default); border-radius:var(--radius-md);";

const SIDEBAR_HEADER =
  "display:flex; flex-direction:column; gap:var(--spacing-sm); padding:var(--spacing-sm);";

const SIDEBAR_LOGO =
  "display:flex; align-items:center; gap:var(--spacing-sm); height:48px; padding:var(--spacing-sm); border-radius:var(--radius-sm); font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); font-weight:600; color:var(--color-text-primary);";

const GROUP =
  "display:flex; flex-direction:column; padding:var(--spacing-sm);";

const GROUP_LABEL =
  "display:flex; align-items:center; height:32px; padding:0 var(--spacing-sm); font-size:var(--text-caption); line-height:var(--text-caption--line-height); font-weight:600; text-transform:uppercase; letter-spacing:0.04em; color:var(--color-text-tertiary);";

const MENU_BTN =
  "display:flex; align-items:center; gap:var(--spacing-sm); height:32px; padding:var(--spacing-sm); border-radius:var(--radius-sm); font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary); cursor:default; transition:background-color var(--motion-duration-fast) var(--motion-ease-out);";

const MENU_ACTIVE = `${MENU_BTN} background:var(--color-surface-input); font-weight:500;`;

const FOOTER =
  "display:flex; flex-direction:column; gap:var(--spacing-xs); padding:var(--spacing-sm); border-top:1px solid var(--color-border-default); margin-top:auto;";

const MAIN =
  "flex:1; padding:var(--spacing-2xl); overflow:auto; background:var(--color-bg-page);";

const MAIN_INSET =
  "flex:1; padding:var(--spacing-2xl); overflow:auto; background:var(--color-bg-page); border-radius:var(--radius-md);";

const MAIN_HEADER =
  "display:flex; align-items:center; gap:var(--spacing-md); margin-bottom:var(--spacing-lg); padding-bottom:var(--spacing-lg); border-bottom:1px solid var(--color-border-default);";

const TRIGGER_BTN =
  "display:inline-flex; align-items:center; justify-content:center; height:28px; width:28px; border-radius:var(--radius-sm); background:transparent; border:0; cursor:pointer; color:var(--color-text-primary); transition:background-color var(--motion-duration-fast) var(--motion-ease-out);";

const MAIN_TITLE = "margin:0; font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:600; color:var(--color-text-primary);";
const MAIN_BODY = "font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-secondary);";

// Icons
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
const EDIT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
const CHECK_SQUARE =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>';
const WALLET =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>';
const USERS =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
const CLOCK =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
const FILE_CHECK =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>';
const CHART =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>';
const USER =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

export const sidebarExamples = [
  {
    title: "Default — Porest 데스크탑 nav",
    description: "Header(로고 `body-md` 600 + Leaf icon) + Group(`text-caption uppercase tracking-wide tertiary` label) + MenuButton(`body-md` + icon 16) + Footer(설정). 활성 페이지(`isActive`) — `bg-surface-input` + `font-medium`.",
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
              <SidebarMenuButton isActive><Home /><span>홈</span></SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton><Inbox /><span>받은편지함</span></SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton><Calendar /><span>캘린더</span></SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton><Search /><span>검색</span></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton><Settings /><span>설정</span></SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <header className="flex h-14 items-center gap-[var(--spacing-md)] px-[var(--spacing-lg)] border-b">
      <SidebarTrigger />
      <h1 className="text-title-md font-semibold">대시보드</h1>
    </header>
    <main className="p-[var(--spacing-lg)]">콘텐츠 영역</main>
  </SidebarInset>
</SidebarProvider>`,
    render: () => `<div style="${FRAME}">
  <aside style="${SIDEBAR}">
    <div style="${SIDEBAR_HEADER}">
      <div style="${SIDEBAR_LOGO}">${LEAF}<span>Porest</span></div>
    </div>
    <div style="flex:1; overflow:auto;">
      <div style="${GROUP}">
        <div style="${GROUP_LABEL}">네비게이션</div>
        <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); margin-top:var(--spacing-xs);">
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
      <h1 style="${MAIN_TITLE}">대시보드</h1>
    </div>
    <div style="${MAIN_BODY}">콘텐츠 영역</div>
  </main>
</div>`,
  },

  {
    title: "Desk — 메모/할일/가계부 앱 nav",
    description: "Desk 앱 sidebar — 로고 + 단일 그룹(메모/할일/가계부/캘린더) + 검색 + footer(사용자/설정). 활성 페이지는 \"메모\". 한국어 라벨 + lucide icon 16.",
    jsx: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Leaf /><span>Desk</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>워크스페이스</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem><SidebarMenuButton isActive><Edit /><span>메모</span></SidebarMenuButton></SidebarMenuItem>
          <SidebarMenuItem><SidebarMenuButton><CheckSquare /><span>할일</span></SidebarMenuButton></SidebarMenuItem>
          <SidebarMenuItem><SidebarMenuButton><Wallet /><span>가계부</span></SidebarMenuButton></SidebarMenuItem>
          <SidebarMenuItem><SidebarMenuButton><Calendar /><span>캘린더</span></SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>탐색</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem><SidebarMenuButton><Search /><span>검색</span></SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem><SidebarMenuButton><User /><span>김지원</span></SidebarMenuButton></SidebarMenuItem>
        <SidebarMenuItem><SidebarMenuButton><Settings /><span>설정</span></SidebarMenuButton></SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</SidebarProvider>`,
    render: () => `<div style="${FRAME}">
  <aside style="${SIDEBAR}">
    <div style="${SIDEBAR_HEADER}">
      <div style="${SIDEBAR_LOGO}">${LEAF}<span>Desk</span></div>
    </div>
    <div style="flex:1; overflow:auto;">
      <div style="${GROUP}">
        <div style="${GROUP_LABEL}">워크스페이스</div>
        <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); margin-top:var(--spacing-xs);">
          <div style="${MENU_ACTIVE}">${EDIT}<span>메모</span></div>
          <div style="${MENU_BTN}">${CHECK_SQUARE}<span>할일</span></div>
          <div style="${MENU_BTN}">${WALLET}<span>가계부</span></div>
          <div style="${MENU_BTN}">${CALENDAR}<span>캘린더</span></div>
        </div>
      </div>
      <div style="${GROUP}">
        <div style="${GROUP_LABEL}">탐색</div>
        <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); margin-top:var(--spacing-xs);">
          <div style="${MENU_BTN}">${SEARCH}<span>검색</span></div>
        </div>
      </div>
    </div>
    <div style="${FOOTER}">
      <div style="${MENU_BTN}">${USER}<span>김지원</span></div>
      <div style="${MENU_BTN}">${SETTINGS}<span>설정</span></div>
    </div>
  </aside>
  <main style="${MAIN}">
    <div style="${MAIN_HEADER}">
      <button style="${TRIGGER_BTN}" aria-label="사이드바 토글">${PANEL}</button>
      <h1 style="${MAIN_TITLE}">메모</h1>
    </div>
    <div style="${MAIN_BODY}">오늘 작성한 메모 12개 · 최근 수정 2분 전</div>
  </main>
</div>`,
  },

  {
    title: "HR 어드민 — variant=\"inset\" + 다중 그룹",
    description: "HR 어드민 inset variant — 메인 콘텐츠가 카드 형식(`rounded-md`). 다중 SidebarGroup(조직 / 근태 / 결재 / 통계)로 카테고리 분리. group label 4종, 각 4-6 item 권장.",
    jsx: `<SidebarProvider>
  <Sidebar variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg"><Leaf /><span>Porest HR</span></SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>조직</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem><SidebarMenuButton isActive><Users /><span>직원</span></SidebarMenuButton></SidebarMenuItem>
          <SidebarMenuItem><SidebarMenuButton><Home /><span>부서</span></SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>근태</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem><SidebarMenuButton><Clock /><span>근무 시간</span></SidebarMenuButton></SidebarMenuItem>
          <SidebarMenuItem><SidebarMenuButton><Calendar /><span>휴가</span></SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>결재</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem><SidebarMenuButton><FileCheck /><span>승인 대기</span></SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>통계</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem><SidebarMenuButton><Chart /><span>대시보드</span></SidebarMenuButton></SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem><SidebarMenuButton><Settings /><span>설정</span></SidebarMenuButton></SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <header className="flex h-14 items-center gap-[var(--spacing-md)] px-[var(--spacing-lg)] border-b">
      <SidebarTrigger />
      <h1 className="text-title-md font-semibold">직원 목록</h1>
    </header>
    <main className="p-[var(--spacing-lg)]">125명 등록됨</main>
  </SidebarInset>
</SidebarProvider>`,
    render: () => `<div style="${FRAME_INSET}">
  <aside style="${SIDEBAR_INSET}">
    <div style="${SIDEBAR_HEADER}">
      <div style="${SIDEBAR_LOGO}">${LEAF}<span>Porest HR</span></div>
    </div>
    <div style="flex:1; overflow:auto;">
      <div style="${GROUP}">
        <div style="${GROUP_LABEL}">조직</div>
        <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); margin-top:var(--spacing-xs);">
          <div style="${MENU_ACTIVE}">${USERS}<span>직원</span></div>
          <div style="${MENU_BTN}">${HOME}<span>부서</span></div>
        </div>
      </div>
      <div style="${GROUP}">
        <div style="${GROUP_LABEL}">근태</div>
        <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); margin-top:var(--spacing-xs);">
          <div style="${MENU_BTN}">${CLOCK}<span>근무 시간</span></div>
          <div style="${MENU_BTN}">${CALENDAR}<span>휴가</span></div>
        </div>
      </div>
      <div style="${GROUP}">
        <div style="${GROUP_LABEL}">결재</div>
        <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); margin-top:var(--spacing-xs);">
          <div style="${MENU_BTN}">${FILE_CHECK}<span>승인 대기</span></div>
        </div>
      </div>
      <div style="${GROUP}">
        <div style="${GROUP_LABEL}">통계</div>
        <div style="display:flex; flex-direction:column; gap:var(--spacing-xs); margin-top:var(--spacing-xs);">
          <div style="${MENU_BTN}">${CHART}<span>대시보드</span></div>
        </div>
      </div>
    </div>
    <div style="${FOOTER}">
      <div style="${MENU_BTN}">${SETTINGS}<span>설정</span></div>
    </div>
  </aside>
  <main style="${MAIN_INSET}">
    <div style="${MAIN_HEADER}">
      <button style="${TRIGGER_BTN}" aria-label="사이드바 토글">${PANEL}</button>
      <h1 style="${MAIN_TITLE}">직원 목록</h1>
    </div>
    <div style="${MAIN_BODY}">125명 등록됨</div>
  </main>
</div>`,
  },
];
