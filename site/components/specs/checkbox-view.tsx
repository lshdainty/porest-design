'use client';
// 스펙대로 그린 Checkbox — CheckLook(checkbox.yaml 을 푼 값)만 받아 그린다.
// state 를 주면 그 상태로 고정해 보여 주고, 'live' 면 실제로 호버 · 누름 · 키보드 포커스에 반응하고 눌러서 켜고 끈다.
// 색은 라이트(-l) · 다크(-d) 값을 둘 다 싣고 CSS(global.css 의 .pchk)가 사이트 모드에 맞춰 고른다.
import { useState, type CSSProperties, type ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import type { CheckLook, CheckState, Checked } from './checkbox-shared';

export type CheckboxViewProps = {
  look: CheckLook;
  checked?: Checked;
  defaultChecked?: Checked;
  onChange?: (next: Checked) => void;
  state?: CheckState | 'live';
  mode?: 'light' | 'dark' | 'auto';
  label?: ReactNode;
  ariaLabel?: string;
  // 칸만(Checkmark) — 목록 행에 넣을 때. 라벨이 없으면 칸만 그린다
  style?: CSSProperties;
  // 칸 모양을 덮어 그릴 때(나쁜 예 — 빨간 테두리)
  boxStyle?: CSSProperties;
  labelStyle?: CSSProperties;
};

const next = (c: Checked): Checked => (c === 'checked' ? 'unchecked' : 'checked');

export function CheckboxView({ look, checked, defaultChecked = 'unchecked', onChange, state = 'live', mode = 'auto', label, ariaLabel, style, boxStyle, labelStyle }: CheckboxViewProps) {
  const [own, setOwn] = useState<Checked>(defaultChecked);
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const [focusRing, setFocusRing] = useState(false);
  const value = checked ?? own;
  const live = state === 'live';
  const shown: CheckState = live ? (press ? 'pressed' : hover ? 'hovered' : 'enabled') : state;
  const disabled = shown === 'disabled';
  const focused = state === 'focused' || (live && focusRing);

  const L = look.faces[value][mode === 'dark' ? 'dark' : 'light'][shown];
  const D = look.faces[value][mode === 'light' ? 'light' : 'dark'][shown];
  const f = L;
  const vars = {
    '--pc-bg-l': L.box.bg,
    '--pc-bg-d': D.box.bg,
    '--pc-bd-l': L.box.border,
    '--pc-bd-d': D.box.border,
    '--pc-ic-l': L.icon.color,
    '--pc-ic-d': D.icon.color,
    '--pc-lb-l': L.label.color,
    '--pc-lb-d': D.label.color,
    '--pc-ring-l': look.faces[value].light.focused.ring.color,
    '--pc-ring-d': look.faces[value].dark.focused.ring.color,
  } as CSSProperties;

  // 누름 축소는 칸만 — 기준 길이는 칸 크기(max(높이, 폭 ÷ n, 최소))
  const s = f.box.size;
  const basis = Math.max(s, s / look.press.widthDivisor, look.press.minBasis);
  const scale = shown === 'pressed' ? (basis - look.press.distance) / basis : 1;

  const toggle = () => {
    if (!live || disabled) return;
    const n = next(value);
    if (checked === undefined) setOwn(n);
    onChange?.(n);
  };

  const box = (
    <span
      role="checkbox"
      aria-checked={value === 'indeterminate' ? 'mixed' : value === 'checked'}
      aria-disabled={disabled || undefined}
      aria-label={label ? undefined : ariaLabel}
      tabIndex={live && !disabled ? 0 : -1}
      onFocus={live ? (e) => setFocusRing(e.currentTarget.matches(':focus-visible')) : undefined}
      onBlur={live ? () => setFocusRing(false) : undefined}
      onKeyDown={
        live
          ? (e) => {
              if (e.key === ' ') {
                e.preventDefault();
                toggle();
              }
            }
          : undefined
      }
      style={{
        width: s,
        height: s,
        flexShrink: 0,
        boxSizing: 'border-box',
        display: 'inline-grid',
        placeItems: 'center',
        borderRadius: f.box.radius,
        background: 'var(--pc-bg)',
        border: f.box.borderWidth ? `${f.box.borderWidth}px solid var(--pc-bd)` : 'none',
        color: 'var(--pc-ic)',
        outline: focused ? `${f.ring.width}px solid var(--pc-ring)` : 'none',
        outlineOffset: f.ring.offset,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transition: `background-color ${f.duration.color} ${f.easing.color}, border-color ${f.duration.color} ${f.easing.color}, color ${f.duration.color} ${f.easing.color}, transform ${f.duration.scale} ${f.easing.scale}`,
        ...boxStyle,
      }}
    >
      {f.icon.glyph === 'Check' && <Check size={f.icon.size} strokeWidth={3} aria-hidden />}
      {f.icon.glyph === 'Minus' && <Minus size={f.icon.size} strokeWidth={3} aria-hidden />}
    </span>
  );

  return (
    <label
      className="pchk"
      data-mode={mode}
      style={{
        ...vars,
        display: 'inline-flex',
        alignItems: 'center',
        gap: f.row.gap,
        minHeight: label ? f.row.minHeight : undefined,
        cursor: disabled ? 'not-allowed' : live ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
      onPointerEnter={live ? () => setHover(true) : undefined}
      onPointerLeave={live ? () => (setHover(false), setPress(false)) : undefined}
      onPointerDown={live && !disabled ? () => setPress(true) : undefined}
      onPointerUp={live ? () => setPress(false) : undefined}
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
    >
      {box}
      {label && (
        <span style={{ fontFamily: f.label.fontFamily, fontSize: f.label.fontSize, lineHeight: f.label.lineHeight, fontWeight: f.label.fontWeight, color: 'var(--pc-lb)', ...labelStyle }}>{label}</span>
      )}
    </label>
  );
}

// 묶음 — 부모(전체)와 자식. 부모는 자식을 따라 선택 · 일부 선택 · 선택 안 됨이 된다
export function CheckboxGroupDemo({
  parent,
  child,
  parentLabel,
  items,
  initial = [],
  mode = 'auto',
  gap,
}: {
  parent: CheckLook;
  child: CheckLook;
  parentLabel: string;
  items: string[];
  initial?: number[];
  mode?: 'light' | 'dark' | 'auto';
  gap: string;
}) {
  const [picked, setPicked] = useState<number[]>(initial);
  const all = picked.length === items.length;
  const parentValue: Checked = all ? 'checked' : picked.length ? 'indeterminate' : 'unchecked';
  return (
    <div role="group" aria-label={parentLabel} style={{ display: 'flex', flexDirection: 'column', gap }}>
      <CheckboxView look={parent} mode={mode} label={parentLabel} checked={parentValue} onChange={() => setPicked(all ? [] : items.map((_, i) => i))} />
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>
        {items.map((it, i) => (
          <CheckboxView
            key={it}
            look={child}
            mode={mode}
            label={it}
            checked={picked.includes(i) ? 'checked' : 'unchecked'}
            onChange={(n) => setPicked((p) => (n === 'checked' ? [...p, i] : p.filter((x) => x !== i)))}
          />
        ))}
      </div>
    </div>
  );
}
