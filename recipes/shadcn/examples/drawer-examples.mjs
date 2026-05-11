/*
 * shadcn Drawer 예제 — drawer.tsx와 1:1 동기.
 * preview `.drw-bottom` / `.drw-handle` / `.drw-row` / `.drw-actions` SoT 정합.
 */

const FRAME =
  "position:relative; width:100%; max-width:480px; height:480px; background:var(--color-bg-page); border-radius:var(--radius-lg); overflow:hidden;";

// preview `.drw-bottom` 그대로 — border 없음 + shadow-xl + radius-xl top corners.
const DRAWER_BASE =
  "position:absolute; left:0; right:0; bottom:0; background:var(--color-surface-default); border-radius:var(--radius-xl) var(--radius-xl) 0 0; box-shadow:var(--shadow-xl); padding:var(--spacing-lg); display:flex; flex-direction:column; gap:var(--spacing-md);";

// preview `.drw-handle` 그대로 — 40×4 + surface-input + margin -4px auto spacing-sm.
const HANDLE =
  "margin:-4px auto var(--spacing-sm); height:4px; width:40px; border-radius:var(--radius-full); background:var(--color-surface-input);";

const HEADER =
  "display:flex; justify-content:space-between; align-items:center;";

const TITLE =
  "margin:0; font-weight:600; font-size:var(--text-title-sm); color:var(--color-text-primary);";

const CLOSE_BTN =
  "width:28px; height:28px; border:none; background:transparent; color:var(--color-text-tertiary); cursor:pointer; font-size:16px; border-radius:var(--radius-full); display:inline-flex; align-items:center; justify-content:center;";

// preview `.drw-row` — key-value flex row + border-bottom separator.
const ROW_BASE =
  "display:flex; justify-content:space-between; padding:var(--spacing-xs) 0; font-size:var(--text-caption); border-bottom:1px solid var(--color-border-default);";
const ROW_LAST = ROW_BASE.replace("border-bottom:1px solid var(--color-border-default);", "");
const KEY = "color:var(--color-text-tertiary);";
const VAL = "font-weight:600; color:var(--color-text-primary);";

const BODY = "display:flex; flex-direction:column; gap:var(--spacing-xs);";

// preview `.drw-actions` — flex + gap-sm + padding-top-sm + border-top + button flex:1.
const ACTIONS =
  "display:flex; gap:var(--spacing-sm); padding-top:var(--spacing-sm); border-top:1px solid var(--color-border-default);";

const BTN_PRIMARY_FULL =
  "flex:1; inline-flex; align-items:center; justify-content:center; gap:var(--spacing-sm); white-space:nowrap; border-radius:var(--radius-sm); font-family:var(--font-sans); font-weight:500; transition:box-shadow var(--motion-duration-fast) var(--motion-ease-out); border:0; background:var(--color-primary); color:var(--color-text-on-accent); box-shadow:var(--shadow-sm); height:40px; padding:0 var(--spacing-md); font-size:var(--text-body-md); cursor:pointer; display:inline-flex;";
const BTN_OUTLINE_FULL =
  "flex:1; inline-flex; align-items:center; justify-content:center; gap:var(--spacing-sm); white-space:nowrap; border-radius:var(--radius-sm); font-family:var(--font-sans); font-weight:500; transition:box-shadow var(--motion-duration-fast) var(--motion-ease-out); border:1px solid var(--color-border-default); background:var(--color-surface-default); color:var(--color-text-primary); height:40px; padding:0 var(--spacing-md); font-size:var(--text-body-md); cursor:pointer; display:inline-flex;";

const X_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

export const drawerExamples = [
  {
    title: "Bottom sheet (Desk 거래 입력)",
    description:
      "preview `.drw-bottom` SoT — 핸들 + 제목/X + key-val rows + full-width primary 액션. 모바일 거래 입력 시나리오.",
    jsx: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">거래 추가</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>거래 추가</DrawerTitle>
      <DrawerClose asChild>
        <Button variant="ghost" size="icon" aria-label="닫기">
          <X className="h-4 w-4" />
        </Button>
      </DrawerClose>
    </DrawerHeader>
    <div className="flex flex-col gap-[var(--spacing-xs)]">
      <Row k="유형" v="지출" />
      <Row k="금액" v="₩28,500" />
      <Row k="카테고리" v="식비 · 카페" last />
    </div>
    <DrawerFooter>
      <Button>저장</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    render: () => `<div style="${FRAME}">
  <div style="position:absolute; inset:0; background:var(--overlay-dim-light);"></div>
  <div style="${DRAWER_BASE}">
    <div style="${HANDLE}"></div>
    <div style="${HEADER}">
      <h2 style="${TITLE}">거래 추가</h2>
      <button style="${CLOSE_BTN}" aria-label="닫기">${X_ICON}</button>
    </div>
    <div style="${BODY}">
      <div style="${ROW_BASE}"><span style="${KEY}">유형</span><span style="${VAL}">지출</span></div>
      <div style="${ROW_BASE}"><span style="${KEY}">금액</span><span style="${VAL}">₩28,500</span></div>
      <div style="${ROW_LAST}"><span style="${KEY}">카테고리</span><span style="${VAL}">식비 · 카페</span></div>
    </div>
    <div style="${ACTIONS}">
      <button style="${BTN_PRIMARY_FULL}">저장</button>
    </div>
  </div>
</div>`,
  },

  {
    title: "Confirm action",
    description: "취소 + 완료 두 액션 패턴 — 둘 다 flex:1로 가로 균등 분배.",
    jsx: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">서랍 열기</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>공유하기</DrawerTitle>
      <DrawerClose asChild>
        <Button variant="ghost" size="icon" aria-label="닫기">
          <X className="h-4 w-4" />
        </Button>
      </DrawerClose>
    </DrawerHeader>
    <DrawerDescription>공유할 방법을 선택하세요.</DrawerDescription>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">취소</Button>
      </DrawerClose>
      <Button>완료</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    render: () => `<div style="${FRAME}">
  <div style="position:absolute; inset:0; background:var(--overlay-dim-light);"></div>
  <div style="${DRAWER_BASE}">
    <div style="${HANDLE}"></div>
    <div style="${HEADER}">
      <h2 style="${TITLE}">공유하기</h2>
      <button style="${CLOSE_BTN}" aria-label="닫기">${X_ICON}</button>
    </div>
    <p style="margin:0; font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);">공유할 방법을 선택하세요.</p>
    <div style="${ACTIONS}">
      <button style="${BTN_OUTLINE_FULL}">취소</button>
      <button style="${BTN_PRIMARY_FULL}">완료</button>
    </div>
  </div>
</div>`,
  },

  {
    title: "Action sheet",
    description: "여러 액션 옵션 — 메뉴 형태. ghost 버튼 좌측 정렬 list로.",
    jsx: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">옵션</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>옵션 선택</DrawerTitle>
    </DrawerHeader>
    <div className="flex flex-col gap-[var(--spacing-xs)]">
      <Button variant="ghost" className="justify-start">편집</Button>
      <Button variant="ghost" className="justify-start">복사</Button>
      <Button variant="ghost" className="justify-start text-error">삭제</Button>
    </div>
  </DrawerContent>
</Drawer>`,
    render: () => {
      const item = (label, color = "var(--color-text-primary)") => `<button style="display:flex; align-items:center; padding:var(--spacing-sm) var(--spacing-md); background:transparent; border:0; cursor:pointer; color:${color}; font-family:var(--font-sans); font-size:var(--text-body-md); font-weight:500; text-align:left; border-radius:var(--radius-sm);">${label}</button>`;
      return `<div style="${FRAME}">
  <div style="position:absolute; inset:0; background:var(--overlay-dim-light);"></div>
  <div style="${DRAWER_BASE}">
    <div style="${HANDLE}"></div>
    <div style="${HEADER}">
      <h2 style="${TITLE}">옵션 선택</h2>
    </div>
    <div style="display:flex; flex-direction:column; gap:var(--spacing-xs);">
      ${item("편집")}
      ${item("복사")}
      ${item("삭제", "var(--color-error)")}
    </div>
  </div>
</div>`;
    },
  },
];
