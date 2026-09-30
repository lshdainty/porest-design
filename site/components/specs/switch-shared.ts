// Switch 의 모양 — 서버(switch-look) · 브라우저(플레이그라운드)가 함께 쓰는 상수 · 타입 · 조각 합치기.
// 파일 읽기(서버 전용)를 들이지 않는다.
type Mode = 'light' | 'dark';

export const SWITCH_STATES = ['enabled', 'hovered', 'focused', 'pressed', 'disabled'] as const;
export type SwitchState = (typeof SWITCH_STATES)[number];
export const SWITCH_CHECKED = ['unchecked', 'checked'] as const;
export type SwitchChecked = (typeof SWITCH_CHECKED)[number];

export type SwitchCombo = { size?: string; tone?: string };

export type SwitchFace = {
  // 트랙 — 테두리는 막힌 끔의 안쪽 선(크기는 그대로)
  mark: { width: number; height: number; padding: number; bg: string; border: string; borderWidth: number };
  // 엄지 — scale 은 끔 0.8 · 켬 1, shift 는 켰을 때 옆으로 가는 거리
  thumb: { size: number; color: string; scale: number; shift: number };
  label: { fontSize: string; lineHeight?: string; fontWeight: number | string; color: string; fontFamily: string };
  row: { gap: number; minHeight: number; align: string };
  ring: { width: number; offset: number; color: string };
  // color — 트랙 · 엄지 색(지연 뒤), thumb — 엄지의 이동 · 크기, scale — 누름 축소
  duration: { color: string; thumb: string; scale: string };
  easing: { color: string; thumb: string; scale: string };
  delay: string;
};

export type SwitchLook = {
  combo: Required<SwitchCombo>;
  // 켬 · 끔마다 · 모드마다 · 상태마다
  faces: Record<SwitchChecked, Record<Mode, Record<SwitchState, SwitchFace>>>;
  press: { distance: number; widthDivisor: number; minBasis: number };
};

export type SwitchColorPart = { mark: Pick<SwitchFace['mark'], 'bg' | 'border' | 'borderWidth'>; thumbColor: string; labelColor: string; ring: SwitchFace['ring'] };
export type SwitchDimPart = {
  mark: Pick<SwitchFace['mark'], 'width' | 'height' | 'padding'>;
  thumbSize: number;
  // 켬 · 끔마다 엄지 배율 · 이동 거리
  thumb: Record<SwitchChecked, { scale: number; shift: number }>;
  label: Omit<SwitchFace['label'], 'color'>;
  row: SwitchFace['row'];
  ring: Pick<SwitchFace['ring'], 'width' | 'offset'>;
  duration: SwitchFace['duration'];
  easing: SwitchFace['easing'];
  delay: string;
};
export type SwitchParts = {
  colors: Record<string, Record<SwitchChecked, Record<Mode, Record<SwitchState, SwitchColorPart>>>>;
  dims: Record<string, SwitchDimPart>;
  press: SwitchLook['press'];
  surface: Record<Mode, string>;
};

// 조각을 합쳐 SwitchLook 으로 — 플레이그라운드(브라우저)에서 쓴다
export function composeSwitchLook(p: SwitchParts, combo: Required<SwitchCombo>): SwitchLook {
  const colors = p.colors[combo.tone];
  const dim = p.dims[combo.size];
  const faces = {} as SwitchLook['faces'];
  for (const ch of SWITCH_CHECKED) {
    faces[ch] = { light: {}, dark: {} } as Record<Mode, Record<SwitchState, SwitchFace>>;
    for (const mode of ['light', 'dark'] as Mode[])
      for (const st of SWITCH_STATES) {
        const c = colors[ch][mode][st];
        faces[ch][mode][st] = {
          mark: { ...dim.mark, ...c.mark },
          thumb: { size: dim.thumbSize, color: c.thumbColor, ...dim.thumb[ch] },
          label: { ...dim.label, color: c.labelColor },
          row: dim.row,
          ring: { ...dim.ring, color: c.ring.color },
          duration: dim.duration,
          easing: dim.easing,
          delay: dim.delay,
        };
      }
  }
  return { combo, faces, press: p.press };
}
