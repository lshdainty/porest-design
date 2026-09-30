// Radio 의 모양 — 서버(radio-group-look) · 브라우저(플레이그라운드)가 함께 쓰는 상수 · 타입 · 조각 합치기.
// 파일 읽기(서버 전용)를 들이지 않는다.
type Mode = 'light' | 'dark';

export const RADIO_STATES = ['enabled', 'hovered', 'focused', 'pressed', 'disabled'] as const;
export type RadioState = (typeof RADIO_STATES)[number];
export const RADIO_CHECKED = ['unchecked', 'checked'] as const;
export type RadioChecked = (typeof RADIO_CHECKED)[number];

export type RadioCombo = { size?: string; tone?: string; weight?: string };

export type RadioFace = {
  mark: { size: number; bg: string; border: string; borderWidth: number };
  dot: { size: number; color: string };
  label: { fontSize: string; lineHeight?: string; fontWeight: number | string; color: string; fontFamily: string };
  // align — 줄이 묶음 안에서 차지하는 폭(root.alignSelf): flex-start 면 동그라미 + 라벨만큼만
  row: { gap: number; minHeight: number; align: string };
  ring: { width: number; offset: number; color: string };
  duration: { color: string; scale: string };
  easing: { color: string; scale: string };
};

export type RadioLook = {
  combo: Required<RadioCombo>;
  // 선택 여부마다 · 모드마다 · 상태마다
  faces: Record<RadioChecked, Record<Mode, Record<RadioState, RadioFace>>>;
  press: { distance: number; widthDivisor: number; minBasis: number };
};

export type RadioColorPart = Pick<RadioFace, 'ring'> & { mark: Pick<RadioFace['mark'], 'bg' | 'border' | 'borderWidth'>; dotColor: string; labelColor: string };
export type RadioDimPart = Pick<RadioFace, 'row' | 'duration' | 'easing'> & { markSize: number; dotSize: number; label: Omit<RadioFace['label'], 'color' | 'fontWeight'>; ring: Pick<RadioFace['ring'], 'width' | 'offset'> };
export type RadioParts = {
  colors: Record<string, Record<RadioChecked, Record<Mode, Record<RadioState, RadioColorPart>>>>;
  dims: Record<string, RadioDimPart>;
  weights: Record<string, number | string>;
  press: RadioLook['press'];
  surface: Record<Mode, string>;
};

// 조각을 합쳐 RadioLook 으로 — 플레이그라운드(브라우저)에서 쓴다
export function composeRadioLook(p: RadioParts, combo: Required<RadioCombo>): RadioLook {
  const colors = p.colors[combo.tone];
  const dim = p.dims[combo.size];
  const faces = {} as RadioLook['faces'];
  for (const ch of RADIO_CHECKED) {
    faces[ch] = { light: {}, dark: {} } as Record<Mode, Record<RadioState, RadioFace>>;
    for (const mode of ['light', 'dark'] as Mode[])
      for (const st of RADIO_STATES) {
        const c = colors[ch][mode][st];
        faces[ch][mode][st] = {
          mark: { size: dim.markSize, ...c.mark },
          dot: { size: dim.dotSize, color: c.dotColor },
          label: { ...dim.label, fontWeight: p.weights[combo.weight], color: c.labelColor },
          row: dim.row,
          ring: { ...dim.ring, color: c.ring.color },
          duration: dim.duration,
          easing: dim.easing,
        };
      }
  }
  return { combo, faces, press: p.press };
}
