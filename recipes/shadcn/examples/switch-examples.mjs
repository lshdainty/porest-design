/*
 * shadcn Switch 예제 — switch.tsx의 className과 동기 유지.
 *
 * Radix SwitchPrimitive를 정적 HTML로 흉내 — `data-state="checked|unchecked"`
 * 시각 상태만 표현. 실제 토글 동작은 React에서.
 */

// switch.tsx와 1:1 동기 — motion 토큰 직접 인용, thumb 다크 모드 흰색 보장(text-on-accent).
const ROOT =
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-[background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-border-strong";

const THUMB =
  "pointer-events-none block h-5 w-5 rounded-full bg-text-on-accent shadow-md ring-0 transition-transform duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0";

const LABEL = "text-label-md font-medium text-text-primary leading-none cursor-pointer";

function sw({ checked = false, disabled = false, id = "" } = {}) {
  return `<button type="button" role="switch" aria-checked="${checked}" data-state="${checked ? "checked" : "unchecked"}"${disabled ? " disabled" : ""}${id ? ` id="${id}"` : ""} class="${ROOT}"><span data-state="${checked ? "checked" : "unchecked"}" class="${THUMB}"></span></button>`;
}

function label(text, htmlFor = "") {
  return `<label class="${LABEL}"${htmlFor ? ` for="${htmlFor}"` : ""}>${text}</label>`;
}

export const switchExamples = [
  {
    title: "Default",
    description: "44×24px 트랙 + 20×20px thumb. off: border-strong / on: primary.",
    jsx: `<Switch />`,
    render: () => sw(),
  },

  {
    title: "Checked",
    description: "checked 상태 — primary 채움 + thumb 우측 슬라이드.",
    jsx: `<Switch defaultChecked />`,
    render: () => sw({ checked: true }),
  },

  {
    title: "With label",
    description: "Switch + Label 조합 — 일반적인 form 패턴.",
    jsx: `<div className="flex items-center gap-3">
  <Switch id="airplane" />
  <Label htmlFor="airplane">비행기 모드</Label>
</div>`,
    render: () => `<div style="display:flex; align-items:center; gap:var(--spacing-md);">
  ${sw({ id: "airplane" })}
  ${label("비행기 모드", "airplane")}
</div>`,
  },

  {
    title: "Disabled",
    description: "disabled — opacity-50 + cursor-not-allowed.",
    jsx: `<div className="flex flex-col gap-3">
  <div className="flex items-center gap-3">
    <Switch disabled />
    <Label className="opacity-50">사용 불가</Label>
  </div>
  <div className="flex items-center gap-3">
    <Switch disabled defaultChecked />
    <Label className="opacity-50">변경 불가</Label>
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-md);">
  <div style="display:flex; align-items:center; gap:var(--spacing-md);">
    ${sw({ disabled: true })}
    <span style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary); opacity:0.5;">사용 불가</span>
  </div>
  <div style="display:flex; align-items:center; gap:var(--spacing-md);">
    ${sw({ checked: true, disabled: true })}
    <span style="font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary); opacity:0.5;">변경 불가</span>
  </div>
</div>`,
  },

  {
    title: "Settings panel",
    description: "여러 옵션 토글 — 설정 화면 패턴. 라벨 좌측, switch 우측.",
    jsx: `<div className="flex flex-col gap-4 p-4 bg-surface-default rounded-md border border-border-default" style={{ maxWidth: 360 }}>
  <div className="flex items-center justify-between">
    <div>
      <Label htmlFor="notif">푸시 알림</Label>
      <p className="text-caption text-text-tertiary">새 메시지가 오면 알림을 받습니다.</p>
    </div>
    <Switch id="notif" defaultChecked />
  </div>
  <div className="flex items-center justify-between">
    <div>
      <Label htmlFor="darkmode">다크 모드</Label>
      <p className="text-caption text-text-tertiary">시스템 설정과 별도로 강제 적용.</p>
    </div>
    <Switch id="darkmode" />
  </div>
  <div className="flex items-center justify-between">
    <div>
      <Label htmlFor="autoupdate">자동 업데이트</Label>
      <p className="text-caption text-text-tertiary">새 버전을 백그라운드로 받습니다.</p>
    </div>
    <Switch id="autoupdate" defaultChecked />
  </div>
</div>`,
    render: () => `<div style="display:flex; flex-direction:column; gap:var(--spacing-lg); padding:var(--spacing-lg); background:var(--color-surface-default); border-radius:var(--radius-md); border:1px solid var(--color-border-default); max-width:360px;">
  <div style="display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-lg);">
    <div style="flex:1; min-width:0;">
      ${label("푸시 알림", "notif")}
      <p style="margin:var(--spacing-xs) 0 0; font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-tertiary);">새 메시지가 오면 알림을 받습니다.</p>
    </div>
    ${sw({ checked: true, id: "notif" })}
  </div>
  <div style="display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-lg);">
    <div style="flex:1; min-width:0;">
      ${label("다크 모드", "darkmode")}
      <p style="margin:var(--spacing-xs) 0 0; font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-tertiary);">시스템 설정과 별도로 강제 적용.</p>
    </div>
    ${sw({ id: "darkmode" })}
  </div>
  <div style="display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-lg);">
    <div style="flex:1; min-width:0;">
      ${label("자동 업데이트", "autoupdate")}
      <p style="margin:var(--spacing-xs) 0 0; font-size:var(--text-caption); line-height:var(--text-caption--line-height); color:var(--color-text-tertiary);">새 버전을 백그라운드로 받습니다.</p>
    </div>
    ${sw({ checked: true, id: "autoupdate" })}
  </div>
</div>`,
  },
];
