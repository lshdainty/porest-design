/*
 * shadcn Pagination 예제 — pagination.md SoT 정합.
 * 한국 도메인 시나리오(HR 결재 list, Desk 메모 보관함, 모바일 compact)로
 * 실제 사용처 패턴 보여줌. 모든 시각은 Button spec(buttonVariants) 인용.
 */

const LIST = "display:flex; flex-direction:row; align-items:center; gap:var(--spacing-xs); list-style:none; padding:0; margin:0;";
const NAV = "margin:0 auto; display:flex; width:100%; justify-content:center;";

const ITEM_BASE = "display:inline-flex; align-items:center; justify-content:center; white-space:nowrap; border-radius:var(--radius-sm); font-family:inherit; font-weight:500; text-decoration:none; transition:background-color var(--motion-duration-fast) var(--motion-ease-out), color var(--motion-duration-fast) var(--motion-ease-out); height:40px; cursor:pointer; color:var(--color-text-primary); font-size:var(--text-body-md);";
const ITEM_ICON = `${ITEM_BASE} width:40px;`;
const ITEM_GHOST = `${ITEM_ICON} background:transparent; border:0;`;
const ITEM_ACTIVE = `${ITEM_ICON} background:var(--color-surface-default); border:1px solid var(--color-border-default);`;
const ITEM_NAV = `${ITEM_BASE} padding:0 var(--spacing-md); gap:var(--spacing-xs); background:transparent; border:0;`;
const ITEM_DISABLED = " opacity:0.5; cursor:not-allowed; pointer-events:none;";

const CHEVRON_LEFT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

const CHEVRON_RIGHT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

const ELLIPSIS_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>';

const ELLIPSIS_SPAN =
  `<span aria-hidden style="display:flex; height:40px; width:40px; align-items:center; justify-content:center; color:var(--color-text-secondary);">${ELLIPSIS_ICON}<span style="position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0;">More pages</span></span>`;

export const paginationExamples = [
  {
    title: "Default",
    description: "이전(`ghost md`) + 페이지 번호(`outline/ghost icon`) + ellipsis(`h-10 w-10`) + 다음(`ghost md`). 2페이지가 활성(`aria-current=\"page\"`).",
    jsx: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    render: () => `<nav role="navigation" aria-label="pagination" style="${NAV}">
  <ul style="${LIST}">
    <li><a style="${ITEM_NAV}" href="#" aria-label="이전 페이지">${CHEVRON_LEFT}<span>이전</span></a></li>
    <li><a style="${ITEM_GHOST}" href="#">1</a></li>
    <li><a style="${ITEM_ACTIVE}" href="#" aria-current="page">2</a></li>
    <li><a style="${ITEM_GHOST}" href="#">3</a></li>
    <li>${ELLIPSIS_SPAN}</li>
    <li><a style="${ITEM_NAV}" href="#" aria-label="다음 페이지"><span>다음</span>${CHEVRON_RIGHT}</a></li>
  </ul>
</nav>`,
  },

  {
    title: "HR — 결재함 list (짧은 페이지)",
    description: "결재 항목 50개 / 페이지당 10개 = 5페이지. 짧은 페이지엔 ellipsis 없이 모든 페이지 노출. 1페이지에서 Previous `disabled`(opacity 0.5 + aria-disabled).",
    jsx: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" aria-disabled="true" tabIndex={-1} />
    </PaginationItem>
    {[1, 2, 3, 4, 5].map(p => (
      <PaginationItem key={p}>
        <PaginationLink href="#" isActive={p === 1}>{p}</PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    render: () => `<nav role="navigation" aria-label="pagination" style="${NAV}">
  <ul style="${LIST}">
    <li><a style="${ITEM_NAV}${ITEM_DISABLED}" href="#" aria-label="이전 페이지" aria-disabled="true">${CHEVRON_LEFT}<span>이전</span></a></li>
    <li><a style="${ITEM_ACTIVE}" href="#" aria-current="page">1</a></li>
    <li><a style="${ITEM_GHOST}" href="#">2</a></li>
    <li><a style="${ITEM_GHOST}" href="#">3</a></li>
    <li><a style="${ITEM_GHOST}" href="#">4</a></li>
    <li><a style="${ITEM_GHOST}" href="#">5</a></li>
    <li><a style="${ITEM_NAV}" href="#" aria-label="다음 페이지"><span>다음</span>${CHEVRON_RIGHT}</a></li>
  </ul>
</nav>`,
  },

  {
    title: "Desk — 메모 보관함 (긴 페이지, ellipsis)",
    description: "메모 1,420개 / 페이지당 10개 = 142페이지. 첫(1) + ellipsis + 현재 주변(6/7/8) + ellipsis + 마지막(142). 7페이지 활성.",
    jsx: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">6</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>7</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">8</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">142</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    render: () => `<nav role="navigation" aria-label="pagination" style="${NAV}">
  <ul style="${LIST}">
    <li><a style="${ITEM_NAV}" href="#" aria-label="이전 페이지">${CHEVRON_LEFT}<span>이전</span></a></li>
    <li><a style="${ITEM_GHOST}" href="#">1</a></li>
    <li>${ELLIPSIS_SPAN}</li>
    <li><a style="${ITEM_GHOST}" href="#">6</a></li>
    <li><a style="${ITEM_ACTIVE}" href="#" aria-current="page">7</a></li>
    <li><a style="${ITEM_GHOST}" href="#">8</a></li>
    <li>${ELLIPSIS_SPAN}</li>
    <li><a style="${ITEM_GHOST}" href="#">142</a></li>
    <li><a style="${ITEM_NAV}" href="#" aria-label="다음 페이지"><span>다음</span>${CHEVRON_RIGHT}</a></li>
  </ul>
</nav>`,
  },

  {
    title: "Compact (모바일)",
    description: "모바일 화면 — 페이지 번호 생략, Previous + `현재/총` 텍스트(`text-body-md`) + Next만. 폭 제한 화면에서 가독성 우선.",
    jsx: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <span className="px-[var(--spacing-md)] text-body-md text-text-secondary">
        <span className="text-text-primary font-medium">7</span> / 142
      </span>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    render: () => `<nav role="navigation" aria-label="pagination" style="${NAV}">
  <ul style="${LIST}">
    <li><a style="${ITEM_NAV}" href="#" aria-label="이전 페이지">${CHEVRON_LEFT}<span>이전</span></a></li>
    <li><span style="padding:0 var(--spacing-md); font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-secondary);"><span style="color:var(--color-text-primary); font-weight:500;">7</span> / 142</span></li>
    <li><a style="${ITEM_NAV}" href="#" aria-label="다음 페이지"><span>다음</span>${CHEVRON_RIGHT}</a></li>
  </ul>
</nav>`,
  },
];
