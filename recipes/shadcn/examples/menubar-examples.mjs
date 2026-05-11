/*
 * shadcn Menubar 예제 — 정적 HTML preview는 한 메뉴가 열린 상태.
 */

const BAR =
  "display:flex; height:40px; align-items:center; gap:4px; border-radius:var(--radius-sm); border:1px solid var(--color-border-default); background:var(--color-surface-default); padding:4px;";

const TRIGGER =
  "display:flex; align-items:center; padding:6px 12px; border-radius:var(--radius-xs); font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-primary); cursor:default; background:transparent;";

const TRIGGER_OPEN = `${TRIGGER} background:var(--color-surface-input);`;

const CONTENT =
  "z-50 min-w-[12rem] overflow-hidden rounded-sm border border-border-default bg-surface-default p-1 text-text-primary shadow-md";

const ITEM =
  "relative flex items-center gap-2 rounded-xs px-2 py-1.5 text-title-sm";

const ITEM_FOCUS = `${ITEM} bg-surface-input`;

const SHORTCUT =
  "ml-auto text-label-sm tracking-widest text-text-tertiary";

const SEP = "margin:4px -4px; height:1px; background:var(--color-border-default);";

export const menubarExamples = [
  {
    title: "Default",
    description: "데스크탑 앱 메뉴바 패턴 — 첫 메뉴 'File' 열린 상태.",
    jsx: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        새 파일 <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        새 창 <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>공유하기</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        인쇄 <MenubarShortcut>⌘P</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
  </MenubarMenu>
</Menubar>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:8px;">
  <div style="${BAR}">
    <div style="${TRIGGER_OPEN}">File</div>
    <div style="${TRIGGER}">Edit</div>
    <div style="${TRIGGER}">View</div>
  </div>
  <div class="${CONTENT}" style="width:224px;">
    <div class="${ITEM_FOCUS}">새 파일<span class="${SHORTCUT}">⌘T</span></div>
    <div class="${ITEM}">새 창<span class="${SHORTCUT}">⌘N</span></div>
    <div style="${SEP}"></div>
    <div class="${ITEM}">공유하기</div>
    <div style="${SEP}"></div>
    <div class="${ITEM}">인쇄<span class="${SHORTCUT}">⌘P</span></div>
  </div>
</div>`,
  },
];
