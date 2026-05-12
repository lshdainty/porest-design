/*
 * shadcn Breadcrumb 예제 — breadcrumb.md SoT 정합.
 *
 * 시각:
 * - List: flex + gap-[var(--spacing-sm)] + text-body-sm + text-secondary
 * - Link: text-secondary → hover text-primary, motion 토큰
 * - Page (current): text-primary + font-medium
 * - Separator: text-tertiary + 14×14 svg 또는 `/` 텍스트
 * - Ellipsis: 36×36 hit area + 16×16 icon
 */

const LIST =
  "display:flex; flex-wrap:wrap; align-items:center; gap:var(--spacing-sm); font-family:var(--font-sans); font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary); list-style:none; padding:0; margin:0;";

const ITEM =
  "display:inline-flex; align-items:center; gap:var(--spacing-sm);";

const LINK =
  "color:var(--color-text-secondary); text-decoration:none; transition:color var(--motion-duration-fast) var(--motion-ease-out); border-radius:var(--radius-xs); cursor:pointer;";

const PAGE = "font-weight:500; color:var(--color-text-primary);";

const SEP_ICON =
  "display:inline-flex; align-items:center; color:var(--color-text-tertiary);";

const SEP_SLASH =
  "color:var(--color-text-tertiary); user-select:none;";

const ELLIPSIS_BTN =
  "display:inline-flex; align-items:center; justify-content:center; height:36px; width:36px; color:var(--color-text-tertiary); background:transparent; border:0; cursor:pointer; border-radius:var(--radius-sm);";

const CHEVRON_RIGHT =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

const ELLIPSIS_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>';

export const breadcrumbExamples = [
  {
    title: "Default (chevron)",
    description:
      "기본 패턴 — chevron-right separator + 마지막 항목은 BreadcrumbPage(현재 페이지, non-clickable). 3–5 단계 권장.",
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
    render: () => `<nav aria-label="breadcrumb">
  <ol style="${LIST}">
    <li style="${ITEM}"><a style="${LINK}" href="#">홈</a></li>
    <li role="presentation" aria-hidden="true" style="${SEP_ICON}">${CHEVRON_RIGHT}</li>
    <li style="${ITEM}"><a style="${LINK}" href="#">컴포넌트</a></li>
    <li role="presentation" aria-hidden="true" style="${SEP_ICON}">${CHEVRON_RIGHT}</li>
    <li style="${ITEM}"><span style="${PAGE}" aria-current="page">Breadcrumb</span></li>
  </ol>
</nav>`,
  },

  {
    title: "Slash variant",
    description:
      "URL-like 또는 dense 레이아웃 — `/` 텍스트 separator. preview brand vignette 톤. 시각 응집(공간 절약)에 유리.",
    jsx: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">홈</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem><BreadcrumbLink href="/memo">메모</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem><BreadcrumbLink href="/memo/archive">보관함</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem><BreadcrumbPage>Porest 톤</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    render: () => `<nav aria-label="breadcrumb">
  <ol style="${LIST}">
    <li style="${ITEM}"><a style="${LINK}" href="#">홈</a></li>
    <li role="presentation" aria-hidden="true" style="${SEP_SLASH}">/</li>
    <li style="${ITEM}"><a style="${LINK}" href="#">메모</a></li>
    <li role="presentation" aria-hidden="true" style="${SEP_SLASH}">/</li>
    <li style="${ITEM}"><a style="${LINK}" href="#">보관함</a></li>
    <li role="presentation" aria-hidden="true" style="${SEP_SLASH}">/</li>
    <li style="${ITEM}"><span style="${PAGE}" aria-current="page">Porest 톤</span></li>
  </ol>
</nav>`,
  },

  {
    title: "With ellipsis (긴 경로 축약)",
    description:
      "긴 경로 — 중간을 ellipsis로 압축. ellipsis는 36×36 hit area + 16×16 icon. dropdown trigger로도 활용 가능.",
    jsx: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">홈</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/components/ui">UI</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    render: () => `<nav aria-label="breadcrumb">
  <ol style="${LIST}">
    <li style="${ITEM}"><a style="${LINK}" href="#">홈</a></li>
    <li role="presentation" aria-hidden="true" style="${SEP_ICON}">${CHEVRON_RIGHT}</li>
    <li style="${ITEM}"><span role="presentation" aria-hidden="true" style="${ELLIPSIS_BTN}">${ELLIPSIS_ICON}</span></li>
    <li role="presentation" aria-hidden="true" style="${SEP_ICON}">${CHEVRON_RIGHT}</li>
    <li style="${ITEM}"><a style="${LINK}" href="#">UI</a></li>
    <li role="presentation" aria-hidden="true" style="${SEP_ICON}">${CHEVRON_RIGHT}</li>
    <li style="${ITEM}"><span style="${PAGE}" aria-current="page">Breadcrumb</span></li>
  </ol>
</nav>`,
  },
];
