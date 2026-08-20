/*
 * SwipeActions 예제 — swipe-actions.md SoT 정합.
 *
 * 리스트 행을 왼쪽으로 밀면 오른쪽에서 액션이 드러나는 모바일 전용 패턴.
 * 정적 preview 라 제스처를 재현할 수 없어 **열린 상태**를 그려 보여 준다.
 *
 * 3 kinds: neutral / primary / destructive
 * Layout: 트레이(absolute right, 배경 없음) + 행(translateX).
 * 액션 = 원형 배지 36 + 아래 라벨. 간격은 배지 앞에만(첫 20, 이후 12).
 */

const CONTAINER =
  "position:relative; overflow:hidden; max-width:420px; border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default); font-family:var(--font-sans);";

const TRAY = "position:absolute; inset-block:0; inset-inline-end:0; display:flex;";

const BADGE = 36;
const GAP_LEAD = 20;
const GAP_BETWEEN = 12;
const slot = (i) => BADGE + (i === 0 ? GAP_LEAD : GAP_BETWEEN);

// 색은 배지만 갖는다 — 트레이에 깔면 행 옆에 박스가 하나 더 생긴 것처럼 보인다.
const ACTION_BASE =
  "display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; flex-shrink:0; min-height:56px; align-self:stretch; background:transparent; border:0; font-family:var(--font-sans); font-size:12px; font-weight:600; line-height:1.3; cursor:pointer;";

const BADGE_BASE =
  `display:flex; align-items:center; justify-content:center; inline-size:${BADGE}px; block-size:${BADGE}px; border-radius:50%; font-size:14px;`;

const KIND_STYLE = {
  neutral: {
    label: "color:var(--color-text-secondary);",
    badge: "background:var(--color-surface-input); color:var(--color-text-primary);",
  },
  primary: {
    label: "color:var(--color-text-secondary);",
    badge: "background:var(--color-info); color:var(--color-text-on-accent);",
  },
  destructive: {
    label: "color:var(--color-error);",
    badge: "background:var(--color-error); color:var(--color-text-on-accent);",
  },
};

const ROW =
  "position:relative; display:flex; align-items:center; gap:var(--spacing-md); padding:var(--spacing-md); background:var(--color-surface-default);";

/** 액션 하나 — 원형 배지 + 아래 라벨. 간격은 배지 앞에만 둔다. */
const action = ({ kind = "neutral", label, icon = "●" }, i) => {
  const k = KIND_STYLE[kind];
  const pad = i === 0 ? GAP_LEAD : GAP_BETWEEN;
  return `<button type="button" style="${ACTION_BASE} ${k.label} inline-size:${slot(i)}px; padding-inline-start:${pad}px;">
    <span style="${BADGE_BASE} ${k.badge}">${icon}</span>${label}</button>`;
};

/**
 * 열린 상태의 스와이프 행.
 * @param {{ actions: {kind?: string, label: string}[], title: string, meta?: string, offset?: number }} o
 */
const swipeRow = ({ actions, title, meta, offset }) => {
  // 역순 — 조금만 밀면 바깥쪽부터 드러나므로 파괴적 액션을 안쪽에 둔다.
  const drawn = [...actions].reverse();
  const shift = offset ?? drawn.reduce((w, _, i) => w + slot(i), 0);
  return `<div style="${CONTAINER}">
  <div style="${TRAY}">${drawn.map((a, i) => action(a, i)).join("")}</div>
  <div style="${ROW} transform:translateX(-${shift}px);">
    <div style="flex:1; min-width:0;">
      <div style="font-size:14px; font-weight:600; color:var(--color-text-primary);">${title}</div>
      ${meta ? `<div style="margin-top:2px; font-size:12px; color:var(--color-text-secondary);">${meta}</div>` : ""}
    </div>
  </div>
</div>`;
};

export const swipeActionsExamples = [
  {
    title: "수정 + 삭제 (기본)",
    description:
      "가장 흔한 조합. destructive 는 가장 안쪽 — 조금만 밀면 바깥쪽부터 드러나므로, 파괴적인 것은 끝까지 밀어야 닿게 둔다.",
    jsx: `<SwipeActions
  actions={[
    { kind: "primary", label: "수정", onSelect: openEdit },
    { kind: "destructive", label: "삭제", onSelect: confirmDelete },
  ]}
>
  <ExpenseRow expense={expense} />
</SwipeActions>`,
    render: () =>
      swipeRow({
        actions: [
          { kind: "primary", label: "수정" },
          { kind: "destructive", label: "삭제" },
        ],
        title: "스타벅스 아메리카노",
        meta: "카페 · 4,500원",
      }),
  },

  {
    title: "삭제만",
    description:
      "수정이 성립하지 않는 목록(문자함처럼 받은 것을 보관만 하는 리스트). 액션이 조립형이어야 하는 이유.",
    jsx: `<SwipeActions
  actions={[{ kind: "destructive", label: "삭제", onSelect: confirmDelete }]}
>
  <SmsRow sms={sms} />
</SwipeActions>`,
    render: () =>
      swipeRow({
        actions: [{ kind: "destructive", label: "삭제" }],
        title: "[Web발신] 신한카드 승인",
        meta: "8/18 14:22 · 12,000원",
      }),
  },

  {
    title: "3개 — 고정 + 수정 + 삭제",
    description:
      "상한. 4개 이상이면 트레이가 행 폭을 먹어 무엇을 미는지 안 보인다.",
    jsx: `<SwipeActions
  actions={[
    { kind: "neutral", label: "고정", onSelect: togglePin },
    { kind: "primary", label: "수정", onSelect: openEdit },
    { kind: "destructive", label: "삭제", onSelect: confirmDelete },
  ]}
>
  <MemoRow memo={memo} />
</SwipeActions>`,
    render: () =>
      swipeRow({
        actions: [
          { kind: "neutral", label: "고정" },
          { kind: "primary", label: "수정" },
          { kind: "destructive", label: "삭제" },
        ],
        title: "회의록 — 8월 스프린트",
        meta: "어제",
      }),
  },

  {
    title: "미는 중 (닫힘 임계 아래)",
    description:
      "트레이 폭의 40% 미만이면 손을 뗐을 때 닫힌다. 끝까지 밀어도 액션이 실행되지는 않는다 — 되돌리기가 없어서다.",
    jsx: `// 제스처 상태 — 컴포넌트 내부에서 관리`,
    render: () =>
      swipeRow({
        actions: [
          { kind: "primary", label: "수정" },
          { kind: "destructive", label: "삭제" },
        ],
        title: "점심 — 김밥천국",
        meta: "식비 · 9,000원",
        offset: 40,
      }),
  },
];
