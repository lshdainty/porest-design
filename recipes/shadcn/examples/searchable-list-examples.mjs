/*
 * Porest SearchableList 예제 — searchable-list.tsx의 className과 1:1 동기.
 * preview-html `.sl` SoT 정합:
 *   header: label (좌) + 총 개수 caption (우)
 *   search: Input + 좌측 Search icon (pl-9)
 *   list: border + radius-md + bg-surface + divide-y + max-h 260 + overflow-y-auto
 *   row: thumbnail (44×28 카드) + 주제목+부제목 + 우측 옵션
 *   active row: bg-brand-subtle + 주제목 color/weight 강조
 */

const HEADER =
  "flex items-center justify-between mb-[var(--spacing-sm)]";
const HEADER_LABEL = "text-caption font-medium text-text-secondary";
const HEADER_COUNT = "text-[11px] text-text-tertiary";

const SEARCH_WRAP = "relative mb-[var(--spacing-sm)]";
const SEARCH_ICON =
  "absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary";
const INPUT =
  "h-9 w-full rounded-md border border-border-default bg-surface-default px-3 pl-9 text-body-md text-text-primary placeholder:text-text-tertiary";

const LIST =
  "rounded-[var(--radius-md)] border border-border-subtle bg-surface-default divide-y divide-border-subtle overflow-y-auto";

const ROW_BASE =
  "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors";
const ROW_ACTIVE = "bg-[var(--color-bg-brand-subtle)]";
const ROW_INACTIVE = "hover:bg-surface-input";

const THUMB_IMG =
  "rounded-sm object-cover flex-shrink-0";
const THUMB_FALLBACK =
  "rounded-sm flex items-center justify-center flex-shrink-0 text-white text-xs font-bold";

const TITLE_BASE = "block truncate text-[13px] flex items-center gap-1.5";
const TITLE_ACTIVE = "text-primary-strong font-semibold";
const TITLE_INACTIVE = "text-text-primary font-medium";
const SUB = "block truncate mt-0.5 text-[11.5px] text-text-tertiary";

const BADGE_DISCONTINUED =
  "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold flex-shrink-0";

const SEARCH_SVG =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

const CARDS = [
  { name: "신한 SOL 트래블 카드", company: "신한카드", type: "체크", fee: 0, color: "#0046FF", discontinued: false, initial: "신" },
  { name: "현대카드 The Red", company: "현대카드", type: "신용", fee: 500000, color: "#000000", discontinued: false, initial: "현" },
  { name: "삼성카드 taptap O", company: "삼성카드", type: "신용", fee: 10000, color: "#0F4ABE", discontinued: false, initial: "삼" },
  { name: "KB국민 노리체크", company: "KB국민카드", type: "체크", fee: 0, color: "#FFB81C", discontinued: false, initial: "K" },
  { name: "롯데카드 라이킷", company: "롯데카드", type: "신용", fee: 12000, color: "#ED1C24", discontinued: true, initial: "롯" },
];

function row({ card, active = false }) {
  const rowCls = `${ROW_BASE} ${active ? ROW_ACTIVE : ROW_INACTIVE}`;
  const titleCls = `${TITLE_BASE} ${active ? TITLE_ACTIVE : TITLE_INACTIVE}`;
  const dim = card.discontinued && !active ? "opacity: 0.7;" : "";
  return `<button type="button" class="${rowCls}" style="${dim}" aria-pressed="${active}">
  <span class="${THUMB_FALLBACK}" style="width:44px; height:28px; background:${card.color};">${card.initial}</span>
  <span class="flex-1 min-w-0">
    <span class="${titleCls}">
      <span class="truncate">${card.name}</span>
      ${card.discontinued ? `<span class="${BADGE_DISCONTINUED}" style="background: var(--color-surface-input); color: var(--color-text-tertiary); letter-spacing: 0.04em;">단종</span>` : ""}
    </span>
    <span class="${SUB}">${card.company} · ${card.type}${card.fee > 0 ? ` · 연회비 ${card.fee.toLocaleString("ko-KR")}원` : ""}</span>
  </span>
</button>`;
}

export const searchableListExamples = [
  {
    title: "카드 카탈로그 (AssetEditDialog SoT)",
    description:
      "header(라벨+총 개수) + search input + 카드 list (thumbnail + 주제목 + 부제목 + 단종 badge). active row는 bg-brand-subtle + 주제목 primary-strong + semi.",
    jsx: `<SearchableList
  label="카드"
  totalCount={142}
  searchValue={q}
  onSearchChange={setQ}
  placeholder="카드명 또는 발급사 검색"
>
  {cards.map(c => (
    <SearchableListItem
      key={c.rowId}
      active={c.rowId === selected}
      thumbnail={<CardThumb card={c} />}
      title={c.cardName}
      subtitle={\`\${c.company} · \${c.type}\`}
    />
  ))}
</SearchableList>`,
    render: () => `<div style="max-width: 420px;">
  <div class="${HEADER}">
    <span class="${HEADER_LABEL}">카드</span>
    <span class="${HEADER_COUNT}">총 142개</span>
  </div>
  <div class="${SEARCH_WRAP}">
    <span class="${SEARCH_ICON}">${SEARCH_SVG}</span>
    <input class="${INPUT}" placeholder="카드명 또는 발급사 검색" value="" />
  </div>
  <div class="${LIST}" style="max-height: 260px;">
    ${row({ card: CARDS[0], active: true })}
    ${row({ card: CARDS[1] })}
    ${row({ card: CARDS[2] })}
    ${row({ card: CARDS[3] })}
    ${row({ card: CARDS[4] })}
  </div>
</div>`,
  },

  {
    title: "Empty state (검색 결과 0건)",
    description: "검색어 매칭 없을 때 '검색 결과가 없어요' caption. 옵션: 검색어 안내 추가.",
    jsx: `<SearchableList ... />  // 빈 결과`,
    render: () => `<div style="max-width: 420px;">
  <div class="${SEARCH_WRAP}">
    <span class="${SEARCH_ICON}">${SEARCH_SVG}</span>
    <input class="${INPUT}" placeholder="카드명 또는 발급사 검색" value="zzz" />
  </div>
  <div class="${LIST}" style="max-height: 260px;">
    <div class="py-6 text-center text-[12px]" style="padding: 24px 0; text-align: center; color: var(--color-text-tertiary); font-size: 12px;">검색 결과가 없어요</div>
  </div>
</div>`,
  },

  {
    title: "Loading state (skeleton)",
    description: "비동기 결과 로딩 중 — thumbnail + 2줄 텍스트 동일 폭 skeleton row N개.",
    jsx: `<SearchableList isLoading loadingSkeleton={<SkeletonRows />} />`,
    render: () => {
      const skeletonRow = `<div class="${ROW_BASE}">
  <span style="display:inline-block; width:44px; height:28px; background:var(--color-surface-input); border-radius: var(--radius-sm); flex-shrink:0;"></span>
  <span class="flex-1 min-w-0">
    <span style="display:block; height:14px; width:67%; background:var(--color-surface-input); border-radius: var(--radius-sm); margin-bottom: 6px;"></span>
    <span style="display:block; height:12px; width:50%; background:var(--color-surface-input); border-radius: var(--radius-sm);"></span>
  </span>
</div>`;
      return `<div style="max-width: 420px;">
  <div class="${SEARCH_WRAP}">
    <span class="${SEARCH_ICON}">${SEARCH_SVG}</span>
    <input class="${INPUT}" placeholder="카드명 또는 발급사 검색" />
  </div>
  <div class="${LIST}" style="max-height: 260px;">
    ${skeletonRow}
    ${skeletonRow}
    ${skeletonRow}
  </div>
</div>`;
    },
  },
];
