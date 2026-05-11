/*
 * shadcn Pagination 예제 — 정적 HTML preview.
 */

const LIST = "display:flex; flex-direction:row; align-items:center; gap:4px; list-style:none; padding:0; margin:0;";

const ITEM_BASE = "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium transition-colors h-10 w-10 text-title-sm";
const ITEM_GHOST = `${ITEM_BASE} text-text-primary hover:bg-surface-input`;
const ITEM_ACTIVE = `${ITEM_BASE} border border-border-default bg-surface-default text-text-primary hover:bg-surface-input`;
const ITEM_NAV = "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium transition-colors h-10 px-3 text-title-sm gap-1 text-text-primary hover:bg-surface-input";

const CHEVRON_LEFT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

const CHEVRON_RIGHT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

const ELLIPSIS =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>';

export const paginationExamples = [
  {
    title: "Default",
    description: "이전/다음 + 페이지 번호 + ellipsis. 3페이지가 활성.",
    jsx: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
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
    render: () => `<nav style="margin:0 auto; display:flex; width:100%; justify-content:center;">
  <ul style="${LIST}">
    <li><a class="${ITEM_NAV}" href="#" aria-label="이전 페이지">${CHEVRON_LEFT}<span>이전</span></a></li>
    <li><a class="${ITEM_GHOST}" href="#">1</a></li>
    <li><a class="${ITEM_ACTIVE}" href="#" aria-current="page">2</a></li>
    <li><a class="${ITEM_GHOST}" href="#">3</a></li>
    <li><span style="display:flex; height:36px; width:36px; align-items:center; justify-content:center; color:var(--color-text-secondary);">${ELLIPSIS}</span></li>
    <li><a class="${ITEM_NAV}" href="#" aria-label="다음 페이지"><span>다음</span>${CHEVRON_RIGHT}</a></li>
  </ul>
</nav>`,
  },
];
