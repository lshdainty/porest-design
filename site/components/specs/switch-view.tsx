'use client';
// 스펙대로 그린 Switch — SwitchLook(switch.yaml 을 푼 값)만 받아 그린다.
// state 를 주면 그 상태로 고정해 보여 주고, 'live' 면 실제로 누름 · 키보드 포커스에 반응하고 눌러서 켜고 끈다.
// 색은 라이트(-l) · 다크(-d) 값을 둘 다 싣고 CSS(global.css 의 .pswt)가 사이트 모드에 맞춰 고른다.
import { useState, type CSSProperties, type ReactNode } from 'react';
import type { SwitchLook, SwitchState } from './switch-shared';

export type SwitchViewProps = {
  look: SwitchLook;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  state?: SwitchState | 'live';
  mode?: 'light' | 'dark' | 'auto';
  label?: ReactNode;
  ariaLabel?: string;
  // 줄이 누르는 영역을 맡을 때 — 스위치만 그린다. 클릭은 줄이 처리하고, 키보드(Space · Enter)는 스위치가 받는다
  passive?: boolean;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
};

export function SwitchView({ look, checked, defaultChecked = false, onChange, state = 'live', mode = 'auto', label, ariaLabel, passive = false, style, labelStyle }: SwitchViewProps) {
  const [own, setOwn] = useState(defaultChecked);
  const [press, setPress] = useState(false);
  const [focusRing, setFocusRing] = useState(false);
  const on = checked ?? own;
  const key = on ? 'checked' : 'unchecked';
  const live = state === 'live';
  // 호버는 색이 바뀌지 않는다 — 누름만 따로 그린다
  const shown: SwitchState = live ? (press ? 'pressed' : 'enabled') : state;
  const disabled = shown === 'disabled';
  const focused = state === 'focused' || (live && focusRing);

  const L = look.faces[key][mode === 'dark' ? 'dark' : 'light'][shown];
  const D = look.faces[key][mode === 'light' ? 'light' : 'dark'][shown];
  const f = L;
  const vars = {
    '--ps-bg-l': L.mark.bg,
    '--ps-bg-d': D.mark.bg,
    '--ps-bd-l': L.mark.border,
    '--ps-bd-d': D.mark.border,
    '--ps-th-l': L.thumb.color,
    '--ps-th-d': D.thumb.color,
    '--ps-lb-l': L.label.color,
    '--ps-lb-d': D.label.color,
    '--ps-ring-l': look.faces[key].light.focused.ring.color,
    '--ps-ring-d': look.faces[key].dark.focused.ring.color,
  } as CSSProperties;

  // 누름 축소는 스위치만 — 기준 길이는 max(높이, 폭 ÷ n, 최소)
  const basis = Math.max(f.mark.height, f.mark.width / look.press.widthDivisor, look.press.minBasis);
  const scale = shown === 'pressed' ? (basis - look.press.distance) / basis : 1;
  const colorT = `${f.duration.color} ${f.easing.color} ${f.delay}`;

  const toggle = () => {
    if (!live || disabled) return;
    const n = !on;
    if (checked === undefined) setOwn(n);
    onChange?.(n);
  };

  const mark = (
    <span
      role="switch"
      aria-checked={on}
      aria-disabled={disabled || undefined}
      aria-label={label ? undefined : ariaLabel}
      tabIndex={live && !disabled ? 0 : -1}
      onFocus={live ? (e) => setFocusRing(e.currentTarget.matches(':focus-visible')) : undefined}
      onBlur={live ? () => setFocusRing(false) : undefined}
      onKeyDown={
        live
          ? (e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggle();
              }
            }
          : undefined
      }
      style={{
        width: f.mark.width,
        height: f.mark.height,
        padding: f.mark.padding,
        flexShrink: 0,
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 9999,
        background: 'var(--ps-bg)',
        // 막힌 끔의 안쪽 선 — 트랙 크기는 그대로
        boxShadow: f.mark.borderWidth ? `inset 0 0 0 ${f.mark.borderWidth}px var(--ps-bd)` : 'none',
        outline: focused ? `${f.ring.width}px solid var(--ps-ring)` : 'none',
        outlineOffset: f.ring.offset,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transition: `background-color ${colorT}, transform ${f.duration.scale} ${f.easing.scale}`,
      }}
    >
      <span
        aria-hidden
        style={{
          display: 'block',
          width: f.thumb.size,
          height: f.thumb.size,
          borderRadius: 9999,
          background: 'var(--ps-th)',
          transform: `translateX(${f.thumb.shift}px) scale(${f.thumb.scale})`,
          transition: `transform ${f.duration.thumb} ${f.easing.thumb}, background-color ${colorT}`,
        }}
      />
    </span>
  );

  if (passive) {
    return (
      <span className="pswt" data-mode={mode} style={{ ...vars, display: 'inline-flex', ...style }}>
        {mark}
      </span>
    );
  }

  return (
    <label
      className="pswt"
      data-mode={mode}
      style={{
        ...vars,
        display: 'inline-flex',
        alignItems: 'center',
        // 줄은 스위치 + 라벨만큼만 — 세로로 쌓아도 폭으로 늘지 않는다
        alignSelf: label ? f.row.align : undefined,
        gap: f.row.gap,
        minHeight: label ? f.row.minHeight : undefined,
        cursor: disabled ? 'not-allowed' : live ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
      onPointerLeave={live ? () => setPress(false) : undefined}
      onPointerDown={live && !disabled ? () => setPress(true) : undefined}
      onPointerUp={live ? () => setPress(false) : undefined}
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
    >
      {mark}
      {label && (
        <span style={{ fontFamily: f.label.fontFamily, fontSize: f.label.fontSize, lineHeight: f.label.lineHeight, fontWeight: f.label.fontWeight, color: 'var(--ps-lb)', ...labelStyle }}>{label}</span>
      )}
    </label>
  );
}
