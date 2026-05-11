/*
 * shadcn Table 예제 — 일반 HTML <table> wrapper.
 */

const TABLE = "width:100%; border-collapse:collapse; font-size:var(--text-title-sm); color:var(--color-text-primary);";
const HEAD_ROW = "border-bottom:1px solid var(--color-border-default);";
const HEAD = "height:40px; padding:8px; text-align:left; vertical-align:middle; font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-secondary);";
const ROW = "border-bottom:1px solid var(--color-border-default); transition:background-color 200ms;";
const CELL = "padding:8px; vertical-align:middle;";
const CAPTION = "margin-top:16px; font-size:var(--text-body-sm); color:var(--color-text-secondary);";
const FOOTER = "border-top:1px solid var(--color-border-default); background:color-mix(in srgb, var(--color-surface-input) 50%, transparent); font-weight:500;";

export const tableExamples = [
  {
    title: "Default",
    description: "최근 주문 — caption + thead + tbody + tfoot.",
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
      <TableCell className="text-right">₩250,000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV002</TableCell>
      <TableCell>대기중</TableCell>
      <TableCell>계좌이체</TableCell>
      <TableCell className="text-right">₩150,000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV003</TableCell>
      <TableCell>미결제</TableCell>
      <TableCell>카드</TableCell>
      <TableCell className="text-right">₩350,000</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>합계</TableCell>
      <TableCell className="text-right">₩750,000</TableCell>
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
      <td style="${CELL} text-align:right;">₩250,000</td>
    </tr>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">INV002</td>
      <td style="${CELL}">대기중</td>
      <td style="${CELL}">계좌이체</td>
      <td style="${CELL} text-align:right;">₩150,000</td>
    </tr>
    <tr style="${ROW}">
      <td style="${CELL} font-weight:500;">INV003</td>
      <td style="${CELL}">미결제</td>
      <td style="${CELL}">카드</td>
      <td style="${CELL} text-align:right;">₩350,000</td>
    </tr>
  </tbody>
  <tfoot style="${FOOTER}">
    <tr><td style="${CELL}" colspan="3">합계</td><td style="${CELL} text-align:right;">₩750,000</td></tr>
  </tfoot>
  <caption style="${CAPTION}">최근 주문 목록</caption>
</table>`,
  },
];
