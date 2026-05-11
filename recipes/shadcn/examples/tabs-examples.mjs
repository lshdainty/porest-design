/*
 * shadcn Tabs 예제 — 정적 HTML preview는 첫 탭이 active.
 */

const TAB_LIST =
  "inline-flex h-10 items-center justify-center rounded-sm bg-surface-input p-1 text-text-secondary";

const TAB_TRIGGER_BASE =
  "inline-flex items-center justify-center whitespace-nowrap rounded-xs px-3 py-1.5 text-label-md font-medium transition-all";

const TAB_ACTIVE = "bg-surface-default text-text-primary shadow-sm";
const TAB_INACTIVE = "text-text-secondary";

export const tabsExamples = [
  {
    title: "Default",
    description: "pills 스타일 — surface-input 배경에 active 탭만 surface-default로 강조.",
    jsx: `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>계정</CardTitle>
        <CardDescription>계정 정보를 변경하세요. 저장하면 즉시 반영됩니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label>이름</Label>
          <Input defaultValue="김지원" />
        </div>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      <CardHeader>
        <CardTitle>비밀번호</CardTitle>
        <CardDescription>변경 후에는 다시 로그인해야 합니다.</CardDescription>
      </CardHeader>
    </Card>
  </TabsContent>
</Tabs>`,
    render: () => `<div style="width:400px;">
  <div class="${TAB_LIST}" style="display:grid; grid-template-columns:1fr 1fr; width:100%;">
    <button class="${TAB_TRIGGER_BASE} ${TAB_ACTIVE}">계정</button>
    <button class="${TAB_TRIGGER_BASE} ${TAB_INACTIVE}">비밀번호</button>
  </div>
  <div style="margin-top:8px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default); padding:24px; display:flex; flex-direction:column; gap:6px;">
    <h3 style="margin:0; font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:600; color:var(--color-text-primary);">계정</h3>
    <p style="margin:0 0 8px; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">계정 정보를 변경하세요. 저장하면 즉시 반영됩니다.</p>
    <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">이름</label>
    <input class="flex h-10 w-full rounded-sm border border-border-default bg-surface-default px-3 py-2 text-title-sm text-text-primary" value="김지원" />
  </div>
</div>`,
  },

  {
    title: "Underline variant",
    description: "underline 스타일 — 절제된 톤. HR/Desk 양쪽에 어울림.",
    jsx: `<Tabs defaultValue="overview" className="w-[480px]">
  <TabsList className="bg-transparent border-b border-border-default rounded-none w-full justify-start h-auto p-0">
    <TabsTrigger
      value="overview"
      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
    >
      개요
    </TabsTrigger>
    <TabsTrigger
      value="activity"
      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
    >
      활동
    </TabsTrigger>
    <TabsTrigger
      value="settings"
      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
    >
      설정
    </TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className="pt-4">개요 콘텐츠</TabsContent>
</Tabs>`,
    render: () => {
      const tab = (label, active) => `<button style="padding:8px 16px; background:transparent; border:0; border-bottom:2px solid ${active ? "var(--color-primary)" : "transparent"}; color:${active ? "var(--color-text-primary)" : "var(--color-text-secondary)"}; font-size:var(--text-label-md); font-weight:500; cursor:pointer; margin-bottom:-1px;">${label}</button>`;
      return `<div style="width:480px;">
  <div style="display:flex; border-bottom:1px solid var(--color-border-default); gap:0;">
    ${tab("개요", true)}
    ${tab("활동", false)}
    ${tab("설정", false)}
  </div>
  <div style="padding-top:16px; font-size:var(--text-body-md); color:var(--color-text-primary);">개요 콘텐츠</div>
</div>`;
    },
  },
];
