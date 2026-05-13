/*
 * shadcn Table 예제 — table.md SoT 정합.
 * 일반 HTML <table> + 토큰화. data table 패턴은 Checkbox/Badge/Button 합성.
 * 한국 도메인(Desk 메모 보관함 sortable+selectable / HR 결재 list / Order Footer) 3종.
 */

const TABLE = "width:100%; border-collapse:collapse; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-primary);";
const HEAD_ROW = "border-bottom:1px solid var(--color-border-default);";
const HEAD = "height:40px; padding:var(--spacing-sm); text-align:left; vertical-align:middle; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); font-weight:500; color:var(--color-text-secondary);";
const ROW = "border-bottom:1px solid var(--color-border-default); transition:background-color var(--motion-duration-fast) var(--motion-ease-out);";
const CELL = "padding:var(--spacing-sm); vertical-align:middle;";
const CAPTION = "margin-top:var(--spacing-md); font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary); caption-side:bottom;";
const FOOTER = "border-top:1px solid var(--color-border-default); background:color-mix(in srgb, var(--color-surface-input) 50%, transparent); font-weight:500;";

const BULK_BAR = "display:flex; gap:var(--spacing-md); align-items:center; padding:var(--spacing-xs) var(--spacing-md); border-radius:var(--radius-sm); background:color-mix(in srgb, var(--color-primary, var(--color-text-primary)) 10%, transparent); font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height);";
const BULK_COUNT = "color:var(--color-text-primary); font-weight:500;";
const BULK_BTN = "background:transparent; border:0; padding:0; cursor:pointer; font-family:inherit; font-size:var(--text-body-sm); font-weight:500; color:var(--color-primary, var(--color-text-primary));";

const CHECKBOX_BASE = "display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; border:1px solid var(--color-border-strong); border-radius:var(--radius-xs); cursor:pointer;";
const CHECKBOX_CHECKED = `${CHECKBOX_BASE} background:var(--color-primary, var(--color-text-primary)); border-color:var(--color-primary, var(--color-text-primary));`;
const CHECK_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-on-accent, #fff)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const INDETERMINATE_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-on-accent, #fff)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>';

const SORT_HEAD = `${HEAD} color:var(--color-text-primary); cursor:pointer;`;
const SORT_ARROW = '<span style="margin-left:4px;">↑</span>';

const BADGE_BASE = "display:inline-flex; align-items:center; padding:2px var(--spacing-sm); border-radius:var(--radius-full); border:1px solid transparent; font-size:var(--text-badge); font-weight:600; line-height:var(--text-badge--line-height, 1.2);";
const BADGE_SUCCESS = `${BADGE_BASE} background:color-mix(in srgb, var(--color-success) 16%, transparent); color:var(--color-success);`;
const BADGE_WARNING = `${BADGE_BASE} background:color-mix(in srgb, var(--color-warning) 16%, transparent); color:var(--color-warning);`;
const BADGE_SECONDARY = `${BADGE_BASE} background:var(--color-surface-input); color:var(--color-text-secondary);`;
const BADGE_INFO = `${BADGE_BASE} background:color-mix(in srgb, var(--color-info) 16%, transparent); color:var(--color-info);`;
const BADGE_ERROR = `${BADGE_BASE} background:color-mix(in srgb, var(--color-error) 16%, transparent); color:var(--color-error);`;

export const tableExamples = [
  {
    title: "Default — 주문 list + Footer 합계",
    description: "기본 Table — caption + thead + tbody + tfoot. 금액 column은 `text-right font-mono tabular-nums`. Footer는 `border-top` + `bg-surface-input/50` + 합계 row.",
    jsx: `<Table>
  <TableCaption>최근 주문 목록</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">주문번호</TableHead>
      <TableHead>상태</TableHead>
      <TableHead>방법</TableHead>
      <TableHead className="text-right">금액</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>결제완료</TableCell>
      <TableCell>카드</TableCell>
      <TableCell className="text-right font-mono tabular-nums">₩250,000</TableCell>
    </TableRow>
    ...
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>합계</TableCell>
      <TableCell className="text-right font-mono tabular-nums">₩750,000</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
    render: () => `<table style="${TABLE}">
  <thead><tr style="${HEAD_ROW}">
    <th style="${HEAD} width:100px;">주문번호</th>
    <th style="${HEAD}">상태</th>
    <th style="${HEAD}">방법</th>
    <th style="${HEAD} text-align:right;">금액</th>
  </tr></thead>
  <tbody>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">INV001</td>
      <td style="${CELL}">결제완료</td>
      <td style="${CELL}">카드</td>
      <td style="${CELL} text-align:right; font-family:ui-monospace, monospace; font-variant-numeric:tabular-nums;">₩250,000</td>
    </tr>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">INV002</td>
      <td style="${CELL}">대기중</td>
      <td style="${CELL}">계좌이체</td>
      <td style="${CELL} text-align:right; font-family:ui-monospace, monospace; font-variant-numeric:tabular-nums;">₩150,000</td>
    </tr>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">INV003</td>
      <td style="${CELL}">미결제</td>
      <td style="${CELL}">카드</td>
      <td style="${CELL} text-align:right; font-family:ui-monospace, monospace; font-variant-numeric:tabular-nums;">₩350,000</td>
    </tr>
  </tbody>
  <tfoot style="${FOOTER}">
    <tr><td style="${CELL}" colspan="3">합계</td><td style="${CELL} text-align:right; font-family:ui-monospace, monospace; font-variant-numeric:tabular-nums;">₩750,000</td></tr>
  </tfoot>
  <caption style="${CAPTION}">최근 주문 목록</caption>
</table>`,
  },

  {
    title: "Desk — Data Table (sortable + selectable + bulk action)",
    description: "메모 보관함 — selection column(Checkbox indeterminate/checked) + sortable header(↑/↓) + status Badge soft(공개=success / 초안=warning / 보관=secondary). 선택 ≥ 1 시 bulk action bar(primary 10% mix bg) 노출.",
    jsx: `<div className="flex flex-col gap-[var(--spacing-sm)]">
  {selectedCount > 0 && (
    <div className="flex gap-[var(--spacing-md)] items-center px-[var(--spacing-md)] py-[var(--spacing-xs)] rounded-sm bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-body-sm">
      <span className="font-medium">{selectedCount}개 선택됨</span>
      <span>·</span>
      <button className="text-primary font-medium">보관</button>
      <span>·</span>
      <button className="text-primary font-medium">삭제</button>
    </div>
  )}
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">
          <Checkbox checked="indeterminate" onCheckedChange={toggleAll} />
        </TableHead>
        <TableHead>
          <Button variant="ghost" size="sm" onClick={() => sort("title")}>
            제목 <ArrowUp className="ml-1 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead>수정일</TableHead>
        <TableHead>태그</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {memos.map(m => (
        <TableRow key={m.id} data-state={selected[m.id] ? "selected" : undefined}>
          <TableCell><Checkbox checked={selected[m.id]} /></TableCell>
          <TableCell className="font-medium">{m.title}</TableCell>
          <TableCell className="text-text-secondary">{m.updatedAt}</TableCell>
          <TableCell><Badge variant={m.tagVariant}>{m.tag}</Badge></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
  <div style="${BULK_BAR}">
    <span style="${BULK_COUNT}">3개 선택됨</span>
    <span style="color:var(--color-text-tertiary);">·</span>
    <button style="${BULK_BTN}">보관</button>
    <span style="color:var(--color-text-tertiary);">·</span>
    <button style="${BULK_BTN}">삭제</button>
  </div>
  <table style="${TABLE}">
    <thead><tr style="${HEAD_ROW}">
      <th style="${HEAD} width:48px;"><span style="${CHECKBOX_CHECKED}">${INDETERMINATE_ICON}</span></th>
      <th style="${SORT_HEAD}">제목${SORT_ARROW}</th>
      <th style="${HEAD}">수정일</th>
      <th style="${HEAD}">태그</th>
    </tr></thead>
    <tbody>
      <tr style="${ROW} background:var(--color-surface-input);">
        <td style="${CELL}"><span style="${CHECKBOX_CHECKED}">${CHECK_ICON}</span></td>
        <td style="${CELL} font-weight:500;">Porest 톤</td>
        <td style="${CELL} color:var(--color-text-secondary);">2시간 전</td>
        <td style="${CELL}"><span style="${BADGE_SUCCESS}">공개</span></td>
      </tr>
      <tr style="${ROW} background:var(--color-surface-input);">
        <td style="${CELL}"><span style="${CHECKBOX_CHECKED}">${CHECK_ICON}</span></td>
        <td style="${CELL} font-weight:500;">5월 회고</td>
        <td style="${CELL} color:var(--color-text-secondary);">어제</td>
        <td style="${CELL}"><span style="${BADGE_WARNING}">초안</span></td>
      </tr>
      <tr style="${ROW} background:var(--color-surface-input);">
        <td style="${CELL}"><span style="${CHECKBOX_CHECKED}">${CHECK_ICON}</span></td>
        <td style="${CELL} font-weight:500;">참고 자료</td>
        <td style="${CELL} color:var(--color-text-secondary);">3일 전</td>
        <td style="${CELL}"><span style="${BADGE_SECONDARY}">보관</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
  },

  {
    title: "HR — 결재 list (status Badge soft 통일)",
    description: "결재 항목 — 신청자 + 부서 + 신청일 + 결재 상태(Badge soft semantic 4종 — 같은 카테고리는 한 style 통일). 같은 카테고리(결재 상태)는 의미 분기를 색으로만.",
    jsx: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>신청자</TableHead>
      <TableHead>부서</TableHead>
      <TableHead>신청일</TableHead>
      <TableHead>상태</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {approvals.map(a => (
      <TableRow key={a.id}>
        <TableCell className="font-medium">{a.name}</TableCell>
        <TableCell className="text-text-secondary">{a.dept}</TableCell>
        <TableCell className="text-text-secondary">{a.date}</TableCell>
        <TableCell><Badge variant={a.statusVariant}>{a.status}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
    render: () => `<table style="${TABLE}">
  <thead><tr style="${HEAD_ROW}">
    <th style="${HEAD}">신청자</th>
    <th style="${HEAD}">부서</th>
    <th style="${HEAD}">신청일</th>
    <th style="${HEAD}">상태</th>
  </tr></thead>
  <tbody>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">김지원</td>
      <td style="${CELL} color:var(--color-text-secondary);">디자인 본부</td>
      <td style="${CELL} color:var(--color-text-secondary);">2026-05-12</td>
      <td style="${CELL}"><span style="${BADGE_INFO}">승인</span></td>
    </tr>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">이도현</td>
      <td style="${CELL} color:var(--color-text-secondary);">엔지니어링</td>
      <td style="${CELL} color:var(--color-text-secondary);">2026-05-11</td>
      <td style="${CELL}"><span style="${BADGE_WARNING}">대기</span></td>
    </tr>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">최가람</td>
      <td style="${CELL} color:var(--color-text-secondary);">운영</td>
      <td style="${CELL} color:var(--color-text-secondary);">2026-05-10</td>
      <td style="${CELL}"><span style="${BADGE_ERROR}">반려</span></td>
    </tr>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">박서연</td>
      <td style="${CELL} color:var(--color-text-secondary);">HR</td>
      <td style="${CELL} color:var(--color-text-secondary);">2026-05-09</td>
      <td style="${CELL}"><span style="${BADGE_SUCCESS}">완료</span></td>
    </tr>
  </tbody>
</table>`,
  },
];
