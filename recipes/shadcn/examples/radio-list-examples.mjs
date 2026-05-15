/*
 * Porest RadioList 예제 — radio-list.tsx의 className과 1:1 동기.
 * preview-html `.rl` SoT 정합:
 *   container: border + radius-lg + bg-surface-default + divide-y + overflow-hidden
 *   row: w-full + padding (Y · X) + pill (32×32 radius-md bg-canvas) + label/sub + active check
 */

const CONTAINER =
  "rounded-[var(--radius-lg)] border border-border-subtle bg-surface-default overflow-hidden divide-y divide-border-subtle";

const ROW_BASE =
  "w-full flex items-center text-left px-4 py-[14px] gap-3 bg-transparent hover:bg-surface-input transition-colors";

const PILL =
  "inline-flex items-center justify-center flex-shrink-0 h-8 w-8 rounded-[var(--radius-md)] bg-bg-page text-body-lg font-bold text-text-primary";

const LABEL = "block text-body font-semibold text-text-primary";
const SUB = "block mt-0.5 text-caption text-text-tertiary";

const CHECK =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

function row({ pill, label, sub, active = false }) {
  return `<button type="button" role="radio" aria-checked="${active}" class="${ROW_BASE}">
  <span class="${PILL}">${pill}</span>
  <span class="flex-1 min-w-0">
    <span class="${LABEL}">${label}</span>
    ${sub ? `<span class="${SUB}">${sub}</span>` : ""}
  </span>
  ${active ? `<span class="flex-shrink-0" style="color: var(--color-primary);">${CHECK}</span>` : ""}
</button>`;
}

export const radioListExamples = [
  {
    title: "기본 통화 (Desk 시나리오)",
    description:
      "통화 4종 single-select. 좌측 symbol pill (₩/$/€/¥) + 풀이름 + 코드 부제. active row 우측 ✓. row bg 변화 없음(check 단서만).",
    jsx: `<RadioList value={currency} onValueChange={setCurrency}>
  <RadioListItem value="KRW" pill="₩" label="대한민국 원" subLabel="KRW" />
  <RadioListItem value="USD" pill="$" label="미국 달러" subLabel="USD" />
  <RadioListItem value="EUR" pill="€" label="유로" subLabel="EUR" />
  <RadioListItem value="JPY" pill="¥" label="일본 엔" subLabel="JPY" />
</RadioList>`,
    render: () => `<div role="radiogroup" class="${CONTAINER}" style="max-width: 360px;">
  ${row({ pill: "₩", label: "대한민국 원", sub: "KRW", active: true })}
  ${row({ pill: "$", label: "미국 달러", sub: "USD" })}
  ${row({ pill: "€", label: "유로", sub: "EUR" })}
  ${row({ pill: "¥", label: "일본 엔", sub: "JPY" })}
</div>`,
  },

  {
    title: "언어 선택 (sub 없이 1줄)",
    description: "sub-label 생략 가능. pill 안 글자(K/E/J)로 시각 단서 보강.",
    jsx: `<RadioList>
  <RadioListItem value="ko" pill="K" label="한국어" />
  <RadioListItem value="en" pill="E" label="English" />
  <RadioListItem value="ja" pill="J" label="日本語" />
</RadioList>`,
    render: () => `<div role="radiogroup" class="${CONTAINER}" style="max-width: 360px;">
  ${row({ pill: "K", label: "한국어", sub: "", active: true })}
  ${row({ pill: "E", label: "English", sub: "" })}
  ${row({ pill: "J", label: "日本語", sub: "" })}
</div>`,
  },

  {
    title: "pill 없이 텍스트만",
    description: "도메인에서 시각 단서 필요 없으면 pill 생략 가능. row padding 자동.",
    jsx: `<RadioList>
  <RadioListItem value="public" label="공개" subLabel="누구나 볼 수 있어요" />
  <RadioListItem value="link" label="링크 공개" subLabel="링크 가진 사람만" />
  <RadioListItem value="private" label="비공개" subLabel="나만 볼 수 있어요" />
</RadioList>`,
    render: () => `<div role="radiogroup" class="${CONTAINER}" style="max-width: 360px;">
  <button type="button" role="radio" aria-checked="false" class="${ROW_BASE}">
    <span class="flex-1 min-w-0"><span class="${LABEL}">공개</span><span class="${SUB}">누구나 볼 수 있어요</span></span>
  </button>
  <button type="button" role="radio" aria-checked="true" class="${ROW_BASE}">
    <span class="flex-1 min-w-0"><span class="${LABEL}">링크 공개</span><span class="${SUB}">링크 가진 사람만</span></span>
    <span class="flex-shrink-0" style="color: var(--color-primary);">${CHECK}</span>
  </button>
  <button type="button" role="radio" aria-checked="false" class="${ROW_BASE}">
    <span class="flex-1 min-w-0"><span class="${LABEL}">비공개</span><span class="${SUB}">나만 볼 수 있어요</span></span>
  </button>
</div>`,
  },
];
