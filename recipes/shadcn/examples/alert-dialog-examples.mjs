/*
 * shadcn AlertDialog 예제 — alert-dialog.tsx의 cva와 1:1 동기.
 * spec: specs/components/alert-dialog.md (단일 SoT)
 *
 * 정적 HTML preview에서는 항상 열린 상태로 시각만 표현.
 * Dialog와 시각 동일 — close button(X) 없음. default focus = Cancel.
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

function alertDialog({
  size = "md",
  title = "",
  description = "",
  actionLabel = "확인",
  actionVariant = "destructive",
  cancelLabel = "취소",
} = {}) {
  const action = actionVariant === "destructive" ? BTN_DESTRUCTIVE : BTN_PRIMARY;
  // close button (X) 없음 — alert-dialog spec.
  // preview의 .modal-dialog 구조 1:1 — title, description을 직접 자식으로 두고
  // .modal-dialog의 `gap: var(--spacing-md)`로 간격 통일 (별도 header wrapper 없음).
  return `<div style="${OVERLAY}">
  <div style="${content(size)}" role="alertdialog" aria-modal="true">
    <h2 style="${TITLE}">${title}</h2>
    <p style="${DESC}">${description}</p>
    <div style="display:flex; gap:var(--spacing-sm); justify-content:flex-end; margin-top:var(--spacing-md);">
      <button class="${BTN_OUTLINE}" autofocus>${cancelLabel}</button>
      <button class="${action}">${actionLabel}</button>
    </div>
  </div>
</div>`;
}

export const alertDialogExamples = [
  {
    title: "Default (destructive — Desk 시나리오)",
    description:
      "비가역 위험 액션 — overlay click 무시, close button 없음. default focus = Cancel (Enter 사고 방지).",
    jsx: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">계정 삭제</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>정말 삭제하시겠어요?</AlertDialogTitle>
      <AlertDialogDescription>
        이 작업은 되돌릴 수 없습니다. 모든 데이터(메모, 가계부, 할일)가 영구 삭제됩니다.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction>영구 삭제</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    render: () =>
      alertDialog({
        title: "정말 삭제하시겠어요?",
        description:
          "이 작업은 되돌릴 수 없습니다. 모든 데이터(메모, 가계부, 할일)가 영구 삭제됩니다.",
        actionLabel: "영구 삭제",
        actionVariant: "destructive",
        cancelLabel: "취소",
      }),
  },

  {
    title: "Confirm action (primary — 발행 시나리오)",
    description:
      "비가역이지만 위험은 아닌 액션. action variant = primary로 destructive 색상 없이 결정 강조.",
    jsx: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>발행</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>지금 발행할까요?</AlertDialogTitle>
      <AlertDialogDescription>
        발행 후에는 글이 즉시 공개됩니다. 수정은 가능하지만 검색 엔진에 캐시될 수 있습니다.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>임시 저장</AlertDialogCancel>
      <AlertDialogAction className={cn(buttonVariants())}>발행</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    render: () =>
      alertDialog({
        title: "지금 발행할까요?",
        description:
          "발행 후에는 글이 즉시 공개됩니다. 수정은 가능하지만 검색 엔진에 캐시될 수 있습니다.",
        actionLabel: "발행",
        actionVariant: "primary",
        cancelLabel: "임시 저장",
      }),
  },

  {
    title: "권한 회수 (HR 시나리오)",
    description: "관리자 결정 — title 질문형 + description에 결과 명시 + action label로 행위 직접 표현.",
    jsx: `<AlertDialogContent>
  <AlertDialogTitle>정말 권한을 회수하시겠어요?</AlertDialogTitle>
  <AlertDialogDescription>
    이 직원의 모든 권한이 회수됩니다. 복구는 관리자 승인 필요.
  </AlertDialogDescription>
  <AlertDialogFooter>
    <AlertDialogCancel>취소</AlertDialogCancel>
    <AlertDialogAction>회수</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>`,
    render: () =>
      alertDialog({
        title: "정말 권한을 회수하시겠어요?",
        description:
          "이 직원의 모든 권한이 회수됩니다. 복구는 관리자 승인 필요.",
        actionLabel: "회수",
        actionVariant: "destructive",
        cancelLabel: "취소",
      }),
  },

  {
    title: "Size: sm (384 — 압축 확인)",
    description: "본문이 1줄로 충분할 때. sm size로 화면 점유 최소화.",
    jsx: `<AlertDialogContent size="sm">...</AlertDialogContent>`,
    render: () =>
      alertDialog({
        size: "sm",
        title: "보관함을 비울까요?",
        description: "보관함에 있는 항목이 모두 영구 삭제됩니다.",
        actionLabel: "비우기",
        actionVariant: "destructive",
        cancelLabel: "취소",
      }),
  },
];
