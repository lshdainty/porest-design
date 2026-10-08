'use client';
// 스펙대로 그린 Radio — RadioLook(radio-group.yaml 을 푼 값)만 받아 그린다.
// state 를 주면 그 상태로 고정해 보여 주고, 'live' 면 실제로 호버 · 누름 · 키보드 포커스에 반응한다.
// 색은 라이트(-l) · 다크(-d) 값을 둘 다 싣고 CSS(global.css 의 .prad)가 사이트 모드에 맞춰 고른다.
import { forwardRef, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import type { RadioChecked, RadioLook, RadioState } from './radio-group-shared';
import type { TfFieldLook } from './text-field-shared';
import { TfFieldView } from './text-field-view';

export type RadioViewProps = {
  look: RadioLook;
  checked: RadioChecked;
  onSelect?: () => void;
  state?: RadioState | 'live';
  mode?: 'light' | 'dark' | 'auto';
  label?: ReactNode;
  ariaLabel?: string;
  // 묶음이 정한다 — 묶음 안에서 Tab 으로 들어오는 자리는 하나뿐이다
  tabIndex?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLSpanElement>) => void;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
};

export const RadioView = forwardRef<HTMLSpanElement, RadioViewProps>(function RadioView(
  { look, checked, onSelect, state = 'live', mode = 'auto', label, ariaLabel, tabIndex, onKeyDown, style, labelStyle },
  ref,
) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const [focusRing, setFocusRing] = useState(false);
  const live = state === 'live';
  const shown: RadioState = live ? (press ? 'pressed' : hover ? 'hovered' : 'enabled') : state;
  const disabled = shown === 'disabled';
  const focused = state === 'focused' || (live && focusRing);

  const L = look.faces[checked][mode === 'dark' ? 'dark' : 'light'][shown];
  const D = look.faces[checked][mode === 'light' ? 'light' : 'dark'][shown];
  const f = L;
  const vars = {
    '--pr-bg-l': L.mark.bg,
    '--pr-bg-d': D.mark.bg,
    '--pr-bd-l': L.mark.border,
    '--pr-bd-d': D.mark.border,
    '--pr-dot-l': L.dot.color,
    '--pr-dot-d': D.dot.color,
    '--pr-lb-l': L.label.color,
    '--pr-lb-d': D.label.color,
    '--pr-ring-l': look.faces[checked].light.focused.ring.color,
    '--pr-ring-d': look.faces[checked].dark.focused.ring.color,
  } as CSSProperties;

  // 누름 축소는 동그라미만 — 기준 길이는 max(높이, 폭 ÷ n, 최소)
  const s = f.mark.size;
  const basis = Math.max(s, s / look.press.widthDivisor, look.press.minBasis);
  const scale = shown === 'pressed' ? (basis - look.press.distance) / basis : 1;
  const colorT = `${f.duration.color} ${f.easing.color}`;

  const mark = (
    <span
      ref={ref}
      role="radio"
      aria-checked={checked === 'checked'}
      aria-disabled={disabled || undefined}
      aria-label={label ? undefined : ariaLabel}
      tabIndex={live && !disabled ? (tabIndex ?? 0) : -1}
      onFocus={live ? (e) => setFocusRing(e.currentTarget.matches(':focus-visible')) : undefined}
      onBlur={live ? () => setFocusRing(false) : undefined}
      onKeyDown={
        live
          ? (e) => {
              if (e.key === ' ') {
                e.preventDefault();
                if (!disabled) onSelect?.();
              }
              onKeyDown?.(e);
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
        borderRadius: 9999,
        background: 'var(--pr-bg)',
        border: f.mark.borderWidth ? `${f.mark.borderWidth}px solid var(--pr-bd)` : 'none',
        outline: focused ? `${f.ring.width}px solid var(--pr-ring)` : 'none',
        outlineOffset: f.ring.offset,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transition: `background-color ${colorT}, border-color ${colorT}, transform ${f.duration.scale} ${f.easing.scale}`,
      }}
    >
      <span aria-hidden style={{ width: f.dot.size, height: f.dot.size, borderRadius: 9999, background: 'var(--pr-dot)', transition: `background-color ${colorT}` }} />
    </span>
  );

  return (
    <label
      className="prad"
      data-mode={mode}
      style={{
        ...vars,
        display: 'inline-flex',
        alignItems: 'center',
        // 줄은 동그라미 + 라벨만큼만 — 세로 묶음(flex column) 안에서도 묶음 폭으로 늘지 않는다
        alignSelf: f.row.align,
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
        if (live && !disabled) onSelect?.();
      }}
    >
      {mark}
      {label && (
        <span style={{ fontFamily: f.label.fontFamily, fontSize: f.label.fontSize, lineHeight: f.label.lineHeight, fontWeight: f.label.fontWeight, color: 'var(--pr-lb)', ...labelStyle }}>{label}</span>
      )}
    </label>
  );
});

// 묶음 — 하나를 고르면 앞에 고른 것이 풀린다. Tab 은 고른 것(없으면 첫 것)으로 들어오고, 화살표로 옮기며 고른다.
// 막힌 선택지(disabled 에 든 번호)는 화살표가 건너뛴다.
export function RadioGroupView({
  look,
  items,
  initial,
  value,
  onChange,
  disabled = [],
  mode = 'auto',
  gap,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaInvalid,
  ariaRequired,
  state = 'live',
}: {
  look: RadioLook;
  items: string[];
  initial?: number;
  value?: number;
  onChange?: (i: number) => void;
  disabled?: number[];
  mode?: 'light' | 'dark' | 'auto';
  gap: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  // 묶음의 오류 · 필수(Field 가 넘긴다 — radio-group.tsx 와 같다). 선택지가 모두 막히면 묶음 aria-disabled
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  // 고정 그림이면 'enabled' — 누르지 못한다
  state?: 'live' | 'enabled';
}) {
  const [own, setOwn] = useState<number | undefined>(initial);
  const picked = value ?? own;
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const pick = (i: number) => {
    if (value === undefined) setOwn(i);
    onChange?.(i);
  };
  const open = items.map((_, i) => i).filter((i) => !disabled.includes(i));
  const tabStop = picked !== undefined && open.includes(picked) ? picked : open[0];
  const move = (from: number, step: 1 | -1) => {
    const at = open.indexOf(from);
    const to = open[(at + step + open.length) % open.length];
    refs.current[to]?.focus();
    pick(to);
  };
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid || undefined}
      aria-required={ariaRequired || undefined}
      aria-disabled={(items.length > 0 && open.length === 0) || undefined}
      style={{ display: 'flex', flexDirection: 'column', gap }}
    >
      {items.map((it, i) => (
        <RadioView
          key={it}
          ref={(el) => {
            refs.current[i] = el;
          }}
          look={look}
          mode={mode}
          label={it}
          checked={picked === i ? 'checked' : 'unchecked'}
          state={disabled.includes(i) ? 'disabled' : state}
          tabIndex={i === tabStop ? 0 : -1}
          onSelect={() => pick(i)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
              e.preventDefault();
              move(i, 1);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              e.preventDefault();
              move(i, -1);
            }
          }}
        />
      ))}
    </div>
  );
}

// Field 로 감싼 묶음 — Field 의 라벨이 묶음의 이름(aria-labelledby), 오류 글이 묶음의 설명(aria-describedby)이 되고 묶음에
// aria-invalid 가 걸린다(radio-group.md "코드" 의 오류 예 · 레시피 RadioGroup 의 useFieldGroupState)
export function RadioFieldView({ field, look, gap, label, errorMessage, items, width }: { field: TfFieldLook; look: RadioLook; gap: string; label: string; errorMessage: string; items: string[]; width?: number }) {
  return (
    <TfFieldView look={field} label={label} invalid errorMessage={errorMessage} group width={width}>
      {({ labelId, describedBy, invalid }) => <RadioGroupView look={look} items={items} gap={gap} ariaLabelledby={labelId} ariaDescribedby={describedBy} ariaInvalid={invalid} />}
    </TfFieldView>
  );
}
