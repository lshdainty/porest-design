/*
 * shadcn Tabs 예제 — tabs.md SoT 정합.
 * 2 variants:
 *   container — surface-input wrapper + active(surface-default + shadow-sm)
 *   underline — bottom border + active(primary 색 + 2px border-b)
 * 모든 padding/spacing/transition은 디자인 토큰 직접 인용.
 */

// container variant constants
const LIST_CONTAINER =
  "inline-flex h-10 items-center justify-center rounded-sm bg-surface-input p-[var(--spacing-xs)] text-text-secondary";

const TRIGGER_BASE =
  "inline-flex items-center justify-center whitespace-nowrap font-sans text-label-md font-medium transition-all duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] cursor-pointer";

const TRIGGER_CONTAINER = `${TRIGGER_BASE} rounded-xs px-[var(--spacing-md)] py-[var(--spacing-xs)]`;
const TRIGGER_CONTAINER_ACTIVE = `${TRIGGER_CONTAINER} bg-surface-default text-text-primary shadow-sm`;
const TRIGGER_CONTAINER_INACTIVE = `${TRIGGER_CONTAINER} bg-transparent text-text-secondary`;

// underline variant constants
const TRIGGER_UNDERLINE_BASE = `${TRIGGER_BASE} rounded-none px-[var(--spacing-md)] py-[var(--spacing-sm)] bg-transparent`;

// pills variant constants — 토스 톤 (radius-md soft rectangle)
const LIST_PILLS = "inline-flex gap-[var(--spacing-xs)] bg-transparent";
const TRIGGER_PILLS = `${TRIGGER_BASE} rounded-md px-[var(--spacing-md)] py-[var(--spacing-sm)]`;
const TRIGGER_PILLS_ACTIVE = `${TRIGGER_PILLS} bg-primary text-text-on-accent font-semibold`;
const TRIGGER_PILLS_INACTIVE = `${TRIGGER_PILLS} bg-transparent text-text-secondary`;

// input.md SoT — surface-input + body-md + token padding + font-sans
const INPUT_BASE =
  "flex h-10 w-full rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary";

// card.md SoT — rounded-lg + shadow-sm + no border
const CARD_BASE =
  "background:var(--color-surface-default); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm); padding:var(--spacing-xl); display:flex; flex-direction:column; gap:var(--spacing-xs);";

export const tabsExamples = [
  {
    title: "Container (default — site SoT)",
    description:
      "pills-in-container 스타일 — `surface-input` wrapper 안에 active 탭만 `surface-default` + `shadow-sm`. 설정/form section 토글에 적합.",
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
      <CardContent className="flex flex-col gap-[var(--spacing-xs)]">
        <Label>이름</Label>
        <Input defaultValue="김지원" />
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>`,
    render: () => `<div style="width:400px;">
  <div class="${LIST_CONTAINER}" style="display:grid; grid-template-columns:1fr 1fr; width:100%;">
    <button class="${TRIGGER_CONTAINER_ACTIVE}">계정</button>
    <button class="${TRIGGER_CONTAINER_INACTIVE}">비밀번호</button>
  </div>
  <div style="margin-top:var(--spacing-sm); ${CARD_BASE}">
    <h3 style="margin:0; font-size:var(--text-title-md); line-height:var(--text-title-md--line-height); font-weight:600; color:var(--color-text-primary);">계정</h3>
    <p style="margin:0 0 var(--spacing-sm); font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">계정 정보를 변경하세요. 저장하면 즉시 반영됩니다.</p>
    <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary); line-height:1;">이름</label>
    <input class="${INPUT_BASE}" value="김지원" />
  </div>
</div>`,
  },

  {
    title: "Underline (절제 톤)",
    description:
      "colorless 톤 + active 시 `primary` 색 + 2px 하단 라인. profile/detail page navigation, Toss 톤 절제.",
    jsx: `<Tabs defaultValue="overview" className="w-[480px]">
  <TabsList className="bg-transparent border-b border-border-default rounded-none w-full justify-start h-auto p-0">
    <TabsTrigger
      value="overview"
      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-text-primary px-[var(--spacing-md)] py-[var(--spacing-sm)]"
    >
      개요
    </TabsTrigger>
    <TabsTrigger value="activity" className="...">활동</TabsTrigger>
    <TabsTrigger value="settings" className="...">설정</TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className="pt-[var(--spacing-lg)]">개요 콘텐츠</TabsContent>
</Tabs>`,
    render: () => {
      const tab = (label, active) =>
        `<button class="${TRIGGER_UNDERLINE_BASE}" style="border-bottom:2px solid ${active ? "var(--color-primary)" : "transparent"}; color:${active ? "var(--color-text-primary)" : "var(--color-text-secondary)"}; margin-bottom:-1px;">${label}</button>`;
      return `<div style="width:480px;">
  <div style="display:flex; border-bottom:1px solid var(--color-border-default); gap:0;">
    ${tab("개요", true)}
    ${tab("활동", false)}
    ${tab("설정", false)}
  </div>
  <div style="padding-top:var(--spacing-lg); font-size:var(--text-body-md); color:var(--color-text-primary);">개요 콘텐츠</div>
</div>`;
    },
  },

  {
    title: "Pills (토스 모바일 톤)",
    description:
      "soft rectangle(`radius-md`) + active 시 `primary` fill + `text-on-accent` 흰색. 카테고리 필터, 거래 종류 등 모바일 navigation. 완전 둥근 pill보다 절제된 토스 톤.",
    jsx: `<Tabs defaultValue="all" className="w-[440px]">
  <TabsList className="inline-flex gap-[var(--spacing-xs)] bg-transparent">
    <TabsTrigger
      value="all"
      className="rounded-md px-[var(--spacing-md)] py-[var(--spacing-sm)] data-[state=active]:bg-primary data-[state=active]:text-text-on-accent data-[state=active]:font-semibold"
    >
      전체
    </TabsTrigger>
    <TabsTrigger value="favorites" className="...">즐겨찾기</TabsTrigger>
    <TabsTrigger value="today" className="...">오늘</TabsTrigger>
    <TabsTrigger value="archive" className="...">보관함</TabsTrigger>
  </TabsList>
  <TabsContent value="all" className="mt-[var(--spacing-md)]">전체 영역의 콘텐츠가 여기에 들어옵니다.</TabsContent>
</Tabs>`,
    render: () => `<div style="width:440px;">
  <div class="${LIST_PILLS}">
    <button class="${TRIGGER_PILLS_ACTIVE}">전체</button>
    <button class="${TRIGGER_PILLS_INACTIVE}">즐겨찾기</button>
    <button class="${TRIGGER_PILLS_INACTIVE}">오늘</button>
    <button class="${TRIGGER_PILLS_INACTIVE}">보관함</button>
  </div>
  <div style="margin-top:var(--spacing-md); font-size:var(--text-body-sm); color:var(--color-text-secondary);">전체 영역의 콘텐츠가 여기에 들어옵니다.</div>
</div>`,
  },
];
