/*
 * shadcn Menubar 예제 — menubar.md SoT 정합.
 * Menu family 시각 통일 — Content/Item은 dropdown-menu.md / context-menu.md 정합.
 * 한국 도메인(Desk 메모 앱 + HR 어드민) 시나리오로 데스크탑 메뉴바 패턴.
 */

const BAR =
  "display:flex; height:40px; align-items:center; gap:var(--spacing-xs); border-radius:var(--radius-sm); border:1px solid var(--color-border-default); background:var(--color-surface-default); padding:var(--spacing-xs);";

const TRIGGER =
  "display:flex; align-items:center; padding:var(--spacing-sm) var(--spacing-md); border-radius:var(--radius-xs); font-size:var(--text-title-sm); line-height:var(--text-title-sm--line-height); font-weight:500; color:var(--color-text-primary); cursor:default; background:transparent; transition:background-color var(--motion-duration-fast) var(--motion-ease-out), color var(--motion-duration-fast) var(--motion-ease-out);";

const TRIGGER_OPEN = `${TRIGGER} background:var(--color-surface-input);`;

const CONTENT =
  "z-index:50; min-width:12rem; overflow:hidden; border-radius:var(--radius-md); border:1px solid var(--color-border-default); background:var(--color-surface-default); padding:var(--spacing-xs); color:var(--color-text-primary); box-shadow:var(--shadow-md);";

const ITEM =
  "display:flex; align-items:center; gap:var(--spacing-sm); border-radius:var(--radius-sm); padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary); cursor:default;";

const ITEM_FOCUS = `${ITEM} background:var(--color-surface-input);`;

const SHORTCUT =
  "margin-left:auto; font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); letter-spacing:0.1em; color:var(--color-text-tertiary);";

const SEP = "margin:var(--spacing-xs) calc(var(--spacing-xs) * -1); height:1px; background:var(--color-border-default);";

export const menubarExamples = [
  {
    title: "Default",
    description: "데스크탑 앱 메뉴바 패턴 — 첫 메뉴 열린 상태(`data-state=\"open\"` 시각). Bar(`title-sm` 500) + Content(`body-md` + radius-md + shadow-md, dropdown-menu 정합). 한국어 라벨 + ⌘ shortcut.",
    jsx: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>파일</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>새 파일 <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
      <MenubarItem>새 창 <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>공유하기</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>인쇄 <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>편집</MenubarTrigger>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>보기</MenubarTrigger>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>도움말</MenubarTrigger>
  </MenubarMenu>
</Menubar>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
  <div style="${BAR}">
    <div style="${TRIGGER_OPEN}">파일</div>
    <div style="${TRIGGER}">편집</div>
    <div style="${TRIGGER}">보기</div>
    <div style="${TRIGGER}">도움말</div>
  </div>
  <div style="${CONTENT} width:224px;">
    <div style="${ITEM_FOCUS}">새 파일<span style="${SHORTCUT}">⌘T</span></div>
    <div style="${ITEM}">새 창<span style="${SHORTCUT}">⌘N</span></div>
    <div style="${SEP}"></div>
    <div style="${ITEM}">공유하기</div>
    <div style="${SEP}"></div>
    <div style="${ITEM}">인쇄<span style="${SHORTCUT}">⌘P</span></div>
  </div>
</div>`,
  },

  {
    title: "Desk — 메모 앱 메뉴바",
    description: "메모 앱 상단 — 파일/편집/보기/도움말 + Content 안 액션 grouping (Separator로 의미 단위 분리). `편집` 메뉴 open 상태.",
    jsx: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>파일</MenubarTrigger>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>편집</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>실행 취소 <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
      <MenubarItem>다시 실행 <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>잘라내기 <MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
      <MenubarItem>복사 <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
      <MenubarItem>붙여넣기 <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>모두 선택 <MenubarShortcut>⌘A</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>보기</MenubarTrigger>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>도움말</MenubarTrigger>
  </MenubarMenu>
</Menubar>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
  <div style="${BAR}">
    <div style="${TRIGGER}">파일</div>
    <div style="${TRIGGER_OPEN}">편집</div>
    <div style="${TRIGGER}">보기</div>
    <div style="${TRIGGER}">도움말</div>
  </div>
  <div style="${CONTENT} width:224px; margin-left:60px;">
    <div style="${ITEM_FOCUS}">실행 취소<span style="${SHORTCUT}">⌘Z</span></div>
    <div style="${ITEM}">다시 실행<span style="${SHORTCUT}">⇧⌘Z</span></div>
    <div style="${SEP}"></div>
    <div style="${ITEM}">잘라내기<span style="${SHORTCUT}">⌘X</span></div>
    <div style="${ITEM}">복사<span style="${SHORTCUT}">⌘C</span></div>
    <div style="${ITEM}">붙여넣기<span style="${SHORTCUT}">⌘V</span></div>
    <div style="${SEP}"></div>
    <div style="${ITEM}">모두 선택<span style="${SHORTCUT}">⌘A</span></div>
  </div>
</div>`,
  },

  {
    title: "HR 어드민 — Checkbox/Radio item",
    description: "어드민 페이지 — `보기` 메뉴에 Checkbox(사이드바 토글) + Separator + RadioGroup(정렬 기준 단일 선택). 좌측 32px 영역에 Check/Circle indicator.",
    jsx: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>회사</MenubarTrigger>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>보기</MenubarTrigger>
    <MenubarContent>
      <MenubarLabel>레이아웃</MenubarLabel>
      <MenubarCheckboxItem checked>사이드바 표시</MenubarCheckboxItem>
      <MenubarCheckboxItem>필터 패널 표시</MenubarCheckboxItem>
      <MenubarSeparator />
      <MenubarLabel>정렬 기준</MenubarLabel>
      <MenubarRadioGroup value="name">
        <MenubarRadioItem value="name">이름순</MenubarRadioItem>
        <MenubarRadioItem value="dept">부서순</MenubarRadioItem>
        <MenubarRadioItem value="date">입사일순</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    render: () => {
      const LABEL = "padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-label-sm); line-height:var(--text-label-sm--line-height); font-weight:500; color:var(--color-text-secondary);";
      const ITEM_INDICATOR_BASE = "display:flex; align-items:center; border-radius:var(--radius-sm); padding-top:var(--spacing-sm); padding-bottom:var(--spacing-sm); padding-left:var(--spacing-2xl); padding-right:var(--spacing-md); font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary); position:relative; cursor:default;";
      const CHECK_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; left:var(--spacing-sm); top:50%; transform:translateY(-50%);"><polyline points="20 6 9 17 4 12"/></svg>';
      const CIRCLE_ICON = '<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" style="position:absolute; left:calc(var(--spacing-sm) + 4px); top:50%; transform:translateY(-50%);"><circle cx="12" cy="12" r="10"/></svg>';
      return `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
  <div style="${BAR}">
    <div style="${TRIGGER}">회사</div>
    <div style="${TRIGGER_OPEN}">보기</div>
  </div>
  <div style="${CONTENT} width:240px; margin-left:60px;">
    <div style="${LABEL}">레이아웃</div>
    <div style="${ITEM_INDICATOR_BASE}">${CHECK_ICON}사이드바 표시</div>
    <div style="${ITEM_INDICATOR_BASE}">필터 패널 표시</div>
    <div style="${SEP}"></div>
    <div style="${LABEL}">정렬 기준</div>
    <div style="${ITEM_INDICATOR_BASE}">${CIRCLE_ICON}이름순</div>
    <div style="${ITEM_INDICATOR_BASE}">부서순</div>
    <div style="${ITEM_INDICATOR_BASE}">입사일순</div>
  </div>
</div>`;
    },
  },
];
