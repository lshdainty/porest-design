/*
 * shadcn InputOTP 예제 — input-otp.tsx의 className과 1:1 동기.
 * spec: specs/components/input-otp.md (단일 SoT)
 *
 * 정적 HTML preview는 6 슬롯 시각만 — 가상 셀렉터(:focus 등)는 inline style로 강제 합성.
 * preview-html `.otp-cell` 톤 정합:
 *   개별 박스(gap-[var(--spacing-xs)]) + radius-md + bg-surface-input (empty) / bg-surface-default (filled)
 *   + text-title-md(18/600) + ui-monospace
 */

// input-otp.tsx의 cva BASE className과 1:1 동기 (디자인 토큰 직접 인용)
const SLOT_COMMON =
  "position:relative; display:flex; height:40px; width:40px; align-items:center; justify-content:center; border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-input); font-family:ui-monospace, monospace; font-size:var(--text-title-md); font-weight:600; line-height:1; color:var(--color-text-primary); transition:background-color var(--motion-duration-fast) var(--motion-ease-out), border-color var(--motion-duration-fast) var(--motion-ease-out), outline-color var(--motion-duration-fast) var(--motion-ease-out);";

const SLOT_FILLED = "background:var(--color-surface-default);";
const SLOT_ACTIVE = "outline:2px solid var(--color-border-focus); outline-offset:1px; z-index:10;";

const GROUP = "display:flex; align-items:center; gap:var(--spacing-xs);";

// preview `.otp-sep` SoT 그대로 — lucide Minus 12×12 SVG.
const SEP_DASH = `<div role="separator" aria-hidden="true" style="display:flex; align-items:center; color:var(--color-text-tertiary); padding:0 var(--spacing-xs);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></div>`;

function slot({ char = "", active = false } = {}) {
  let style = SLOT_COMMON;
  if (char) style += ` ${SLOT_FILLED}`;
  if (active) style += ` ${SLOT_ACTIVE}`;
  return `<div style="${style}">${char}</div>`;
}

export const inputOtpExamples = [
  {
    title: "Default (6자리)",
    description:
      "6자리 OTP — 각 cell이 개별 박스. empty 시 surface-input(회색) 채움, filled 시 surface-default(흰색)로 전환.",
    jsx: `<InputOTP maxLength={6} autoComplete="one-time-code">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    render: () => `<div style="${GROUP}">
  ${slot({ char: "4" })}
  ${slot({ char: "8" })}
  ${slot({ char: "3" })}
  ${slot({})}
  ${slot({})}
  ${slot({ active: true })}
</div>`,
  },

  {
    title: "With separator (3-3 분리)",
    description: "두 그룹 사이에 separator(대시) — SMS 가독성 패턴.",
    jsx: `<InputOTP maxLength={6} autoComplete="one-time-code">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    render: () => `<div style="display:flex; align-items:center; gap:var(--spacing-xs);">
  <div style="${GROUP}">
    ${slot({ char: "3" })}
    ${slot({ char: "7" })}
    ${slot({ char: "2" })}
  </div>
  ${SEP_DASH}
  <div style="${GROUP}">
    ${slot({ char: "4", active: true })}
    ${slot({})}
    ${slot({})}
  </div>
</div>
<p style="margin:var(--spacing-md) 0 0; font-size:var(--text-caption); color:var(--color-text-tertiary); line-height:var(--text-caption--line-height);">
  <code style="font-family:ui-monospace, monospace;">autocomplete="one-time-code"</code> — iOS SMS 자동 채우기
</p>`,
  },

  {
    title: "All filled",
    description: "6자리 모두 입력 완료 — 마지막 cell 다음 명시적 확인 button(예제엔 미포함).",
    jsx: `<InputOTP maxLength={6} value="372481" autoComplete="one-time-code">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    render: () => `<div style="${GROUP}">
  ${slot({ char: "3" })}
  ${slot({ char: "7" })}
  ${slot({ char: "2" })}
  ${slot({ char: "4" })}
  ${slot({ char: "8" })}
  ${slot({ char: "1" })}
</div>`,
  },

  {
    title: "4자리 (이메일 인증 톤)",
    description: "짧은 코드 — maxLength={4}로 그룹 길이 축소.",
    jsx: `<InputOTP maxLength={4} autoComplete="one-time-code">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
    render: () => `<div style="${GROUP}">
  ${slot({ char: "9" })}
  ${slot({ char: "2" })}
  ${slot({ active: true })}
  ${slot({})}
</div>`,
  },
];
