/*
 * shadcn Dialog 예제 — dialog.tsx의 cva와 1:1 동기.
 * spec: specs/components/dialog.md (단일 SoT)
 *
 * 정적 HTML preview에서는 항상 열린 상태로 시각만 표현.
 * 시각 톤은 preview-html의 .modal-* 패턴 정합 — radius-xl, p-10, shadow-xl, title=display-sm.
 */

const OVERLAY =
  "position:relative; padding:var(--spacing-2xl) var(--spacing-xl); border-radius:var(--radius-md); background:var(--overlay-dim-light); display:flex; align-items:center; justify-content:center;";

function content(size = "md") {
  const maxW = size === "sm" ? "384px" : size === "lg" ? "640px" : "480px";
  const pad = size === "sm" ? "var(--spacing-xl)" : "var(--spacing-2xl)";
  const radius = size === "sm" ? "var(--radius-lg)" : "var(--radius-xl)";
  return `position:relative; background:var(--color-surface-default); border-radius:${radius}; padding:${pad}; box-shadow:var(--shadow-xl); width:min(90%, ${maxW}); display:flex; flex-direction:column; gap:var(--spacing-md);`;
}

const TITLE =
  "margin:0; font-size:var(--text-display-sm); line-height:var(--text-heading-lg--line-height); font-weight:700; color:var(--color-text-primary); letter-spacing:-0.01em;";
const DESC =
  "margin:0; font-size:var(--text-body-md); line-height:1.6; color:var(--color-text-secondary);";

const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors bg-primary text-text-on-accent shadow-sm hover:brightness-105 h-10 px-3 text-body-md";
const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors border border-border-default bg-surface-default text-text-primary hover:bg-surface-input h-10 px-3 text-body-md";
const BTN_DESTRUCTIVE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors bg-error text-text-on-accent shadow-sm hover:brightness-105 h-10 px-3 text-body-md";

const X_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

function dialog({ size = "md", title = "", description = "", body = "", footer = "", showClose = true } = {}) {
  // preview의 .modal-dialog 구조 1:1 — title, description, body, footer를 직접 자식으로 두고
  // .modal-dialog의 `gap: var(--spacing-md)`로 간격 통일 (별도 header wrapper 없음).
  return `<div style="${OVERLAY}">
  <div style="${content(size)}">
    ${showClose ? `<button type="button" aria-label="닫기" style="position:absolute; right:var(--spacing-md); top:var(--spacing-md); opacity:0.7; background:transparent; border:0; cursor:pointer; color:var(--color-text-primary); padding:var(--spacing-xs);">${X_ICON}</button>` : ""}
    ${title ? `<h2 style="${TITLE}">${title}</h2>` : ""}
    ${description ? `<p style="${DESC}">${description}</p>` : ""}
    ${body}
    ${footer ? `<div style="display:flex; gap:var(--spacing-sm); justify-content:flex-end; margin-top:var(--spacing-md);">${footer}</div>` : ""}
  </div>
</div>`;
}

// preview-html의 .modal-fields 패턴 — gray bg 채움 + key-val rows
function fieldsBlock(rows) {
  const items = rows
    .map(
      (r) => `<div style="display:flex; justify-content:space-between; font-size:var(--text-caption);">
    <span style="color:var(--color-text-tertiary);">${r.k}</span>
    <span style="font-weight:600; color:var(--color-text-primary);">${r.v}</span>
  </div>`,
    )
    .join("");
  return `<div style="display:flex; flex-direction:column; gap:var(--spacing-xs); background:var(--color-surface-input); border-radius:var(--radius-md); padding:var(--spacing-md);">${items}</div>`;
}

export const dialogExamples = [
  {
    title: "Default (md — 480 / p-10 / radius-xl)",
    description:
      "preview .modal-dialog 톤과 동일 — display-sm title + body-md description + shadow-xl. 우상단 X close button.",
    jsx: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">대화상자 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>프로필 편집</DialogTitle>
      <DialogDescription>
        프로필 정보를 수정하고 저장 버튼을 눌러 적용하세요.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-3">
      <div className="grid gap-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" defaultValue="김지원" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bio">소개</Label>
        <Textarea id="bio" rows={3} />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline">취소</Button>
      <Button>저장</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    render: () =>
      dialog({
        title: "프로필 편집",
        description: "프로필 정보를 수정하고 저장 버튼을 눌러 적용하세요.",
        body: `<div style="display:flex; flex-direction:column; gap:var(--spacing-md);">
  <div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
    <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">이름</label>
    <input style="display:flex; height:40px; width:100%; box-sizing:border-box; padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-body-lg); border-radius:var(--radius-sm); border:1px solid var(--color-border-default); background:var(--color-surface-input); color:var(--color-text-primary); outline:0;" value="김지원" />
  </div>
  <div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
    <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">소개</label>
    <textarea rows="3" style="display:flex; min-height:80px; width:100%; box-sizing:border-box; padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-body-md); border-radius:var(--radius-sm); border:1px solid var(--color-border-default); background:var(--color-surface-input); color:var(--color-text-primary); outline:0; resize:none; font-family:inherit;"></textarea>
  </div>
</div>`,
        footer: `<button class="${BTN_OUTLINE}">취소</button><button class="${BTN_PRIMARY}">저장</button>`,
      }),
  },

  {
    title: "With info block (메모 삭제 확인 — Desk preview 톤)",
    description:
      "정보 확인용 — .dialog-fields 패턴 (gray bg + key-val rows). preview.desk.html '메모 삭제 확인' 시각 정합.",
    jsx: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">메모 삭제</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>메모 삭제 확인</DialogTitle>
      <DialogDescription>
        이 메모를 삭제하면 30일 후 영구 삭제됩니다. 보관함에 그대로 둘까요?
      </DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-1 bg-surface-input rounded-md p-3">
      <FieldRow k="제목" v="Porest 브랜드 톤" />
      <FieldRow k="작성일" v="2026-05-08" />
      <FieldRow k="단어 수" v="342" />
    </div>
    <DialogFooter>
      <Button variant="outline">보관함으로</Button>
      <Button>삭제</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    render: () =>
      dialog({
        title: "메모 삭제 확인",
        description:
          "이 메모를 삭제하면 30일 후 영구 삭제됩니다. 보관함에 그대로 둘까요?",
        body: fieldsBlock([
          { k: "제목", v: "Porest 브랜드 톤" },
          { k: "작성일", v: "2026-05-08" },
          { k: "단어 수", v: "342" },
        ]),
        footer: `<button class="${BTN_OUTLINE}">보관함으로</button><button class="${BTN_PRIMARY}">삭제</button>`,
      }),
  },

  {
    title: "Confirm dialog (sm — 384 / p-6 / radius-lg)",
    description: "짧은 확인 — sm size. AlertDialog 사용 권장(비가역 액션). Dialog로 처리는 회피 가능한 결정에 한정.",
    jsx: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">나가기</Button>
  </DialogTrigger>
  <DialogContent size="sm">
    <DialogHeader>
      <DialogTitle>저장하지 않고 나갈까요?</DialogTitle>
      <DialogDescription>
        작성 중인 내용이 사라집니다.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">취소</Button>
      <Button>나가기</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    render: () =>
      dialog({
        size: "sm",
        title: "저장하지 않고 나갈까요?",
        description: "작성 중인 내용이 사라집니다.",
        footer: `<button class="${BTN_OUTLINE}">취소</button><button class="${BTN_PRIMARY}">나가기</button>`,
      }),
  },

  {
    title: "Size: lg (640 — 다단계 form)",
    description: "복잡한 콘텐츠 편집 / 다단계 form. p-10 / radius-xl 그대로, max-width만 640.",
    jsx: `<DialogContent size="lg">...</DialogContent>`,
    render: () =>
      dialog({
        size: "lg",
        title: "메모 상세 편집",
        description:
          "긴 본문을 편집할 때 — 좌측 outline · 우측 본문 같은 다단계 form에 적합.",
        body: `<div style="display:flex; flex-direction:column; gap:var(--spacing-md);">
  <div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
    <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">제목</label>
    <input style="display:flex; height:40px; width:100%; box-sizing:border-box; padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-body-lg); border-radius:var(--radius-sm); border:1px solid var(--color-border-default); background:var(--color-surface-input); color:var(--color-text-primary); outline:0;" value="2026년 5월 회고" />
  </div>
  <div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
    <label style="font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);">본문</label>
    <textarea rows="6" style="display:flex; min-height:140px; width:100%; box-sizing:border-box; padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-body-md); border-radius:var(--radius-sm); border:1px solid var(--color-border-default); background:var(--color-surface-input); color:var(--color-text-primary); outline:0; resize:vertical; font-family:inherit;">디자인 시스템 v50 작업을 정리한 한 달이었다…</textarea>
  </div>
</div>`,
        footer: `<button class="${BTN_OUTLINE}">취소</button><button class="${BTN_PRIMARY}">저장</button>`,
      }),
  },
];
