/*
 * shadcn Resizable 예제 — react-resizable-panels 베이스.
 *
 * 정적 HTML preview에서는 고정 비율로 패널 시각만 표현. 드래그 동작은 React에서.
 */

const PANEL_BG = "var(--color-surface-default)";
const HANDLE_BG = "var(--color-border-default)";

const GRIP = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>';

export const resizableExamples = [
  {
    title: "Horizontal",
    description: "좌우 패널 — 드래그로 크기 조절.",
    jsx: `<ResizablePanelGroup
  direction="horizontal"
  className="max-w-md rounded-md border border-border-default"
>
  <ResizablePanel defaultSize={50}>
    <div className="flex h-32 items-center justify-center p-6">
      <span className="font-semibold">왼쪽</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-32 items-center justify-center p-6">
      <span className="font-semibold">오른쪽</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    render: () => `<div style="display:flex; max-width:448px; height:128px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); overflow:hidden; background:${PANEL_BG};">
  <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:24px; font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);">왼쪽</div>
  <div style="width:1px; background:${HANDLE_BG};"></div>
  <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:24px; font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);">오른쪽</div>
</div>`,
  },

  {
    title: "With handle",
    description: "withHandle prop — 가운데 grip 아이콘 표시.",
    jsx: `<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-md border">
  <ResizablePanel defaultSize={25}>
    <div className="flex h-32 items-center justify-center p-6">Sidebar</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={75}>
    <div className="flex h-32 items-center justify-center p-6">Main</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    render: () => `<div style="display:flex; max-width:448px; height:128px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); overflow:hidden; background:${PANEL_BG}; position:relative;">
  <div style="width:25%; display:flex; align-items:center; justify-content:center; padding:24px; font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);">Sidebar</div>
  <div style="width:1px; background:${HANDLE_BG}; position:relative; display:flex; align-items:center; justify-content:center;">
    <div style="position:absolute; width:12px; height:16px; border:1px solid var(--color-border-default); background:var(--color-surface-default); border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center;">${GRIP}</div>
  </div>
  <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:24px; font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);">Main</div>
</div>`,
  },

  {
    title: "Vertical",
    description: "상하 패널 — direction='vertical'.",
    jsx: `<ResizablePanelGroup
  direction="vertical"
  className="max-w-md min-h-48 rounded-md border"
>
  <ResizablePanel defaultSize={40}>
    <div className="flex h-full items-center justify-center p-6">상단</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={60}>
    <div className="flex h-full items-center justify-center p-6">하단</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    render: () => `<div style="display:flex; flex-direction:column; max-width:448px; height:192px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); overflow:hidden; background:${PANEL_BG};">
  <div style="height:40%; display:flex; align-items:center; justify-content:center; padding:24px; font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);">상단</div>
  <div style="height:1px; background:${HANDLE_BG};"></div>
  <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:24px; font-size:var(--text-title-sm); font-weight:600; color:var(--color-text-primary);">하단</div>
</div>`,
  },
];
