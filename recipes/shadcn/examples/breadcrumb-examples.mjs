/*
 * shadcn Breadcrumb 예제 — 정적 HTML preview.
 */

const LIST = "display:flex; flex-wrap:wrap; align-items:center; gap:10px; font-size:var(--text-body-sm); color:var(--color-text-secondary);";
const LINK = "color:var(--color-text-secondary); text-decoration:none; transition:color 200ms;";
const PAGE = "font-weight:500; color:var(--color-text-primary);";
const SEP = "display:inline-flex; align-items:center;";

const CHEVRON_RIGHT =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

const ELLIPSIS =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>';

export const breadcrumbExamples = [
  {
    title: "Default",
    description: "현재 위치를 계층적으로 표시. 마지막 항목은 BreadcrumbPage(현재 페이지).",
    jsx: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">홈</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">컴포넌트</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    render: () => `<nav>
  <ol style="${LIST} list-style:none; padding:0; margin:0;">
    <li><a style="${LINK}" href="#">홈</a></li>
    <li style="${SEP}">${CHEVRON_RIGHT}</li>
    <li><a style="${LINK}" href="#">컴포넌트</a></li>
    <li style="${SEP}">${CHEVRON_RIGHT}</li>
    <li><span style="${PAGE}">Breadcrumb</span></li>
  </ol>
</nav>`,
  },

  {
    title: "With ellipsis",
    description: "긴 경로 — 중간을 ellipsis로 축약.",
    jsx: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">홈</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components/ui">UI</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    render: () => `<nav>
  <ol style="${LIST} list-style:none; padding:0; margin:0;">
    <li><a style="${LINK}" href="#">홈</a></li>
    <li style="${SEP}">${CHEVRON_RIGHT}</li>
    <li><span style="display:inline-flex; align-items:center; justify-content:center; height:20px; width:20px; color:var(--color-text-secondary);">${ELLIPSIS}</span></li>
    <li style="${SEP}">${CHEVRON_RIGHT}</li>
    <li><a style="${LINK}" href="#">UI</a></li>
    <li style="${SEP}">${CHEVRON_RIGHT}</li>
    <li><span style="${PAGE}">Breadcrumb</span></li>
  </ol>
</nav>`,
  },
];
