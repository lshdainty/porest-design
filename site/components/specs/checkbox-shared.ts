// Checkbox 의 모양 — 서버(checkbox-look) · 브라우저(플레이그라운드)가 함께 쓰는 상수 · 타입 · 조각 합치기.
// 파일 읽기(서버 전용)를 들이지 않는다.
type Mode = 'light' | 'dark';

export const CHECK_STATES = ['enabled', 'hovered', 'focused', 'pressed', 'disabled'] as const;
export type CheckState = (typeof CHECK_STATES)[number];
export const CHECKED = ['unchecked', 'checked', 'indeterminate'] as const;
export type Checked = (typeof CHECKED)[number];

export type CheckCombo = { size?: string; shape?: string; tone?: string; weight?: string };

export type CheckFace = {
  box: { size: number; radius: string; bg: string; border: string; borderWidth: number };
  icon: { size: number; color: string; glyph: string };
  label: { fontSize: string; lineHeight?: string; fontWeight: number | string; color: string; fontFamily: string };
  // align — 줄이 묶음 안에서 차지하는 폭(root.alignSelf): flex-start 면 칸 + 라벨만큼만
  row: { gap: number; minHeight: number; align: string };
  ring: { width: number; offset: number; color: string };
  duration: { color: string; scale: string };
  easing: { color: string; scale: string };
};

export type CheckLook = {
  combo: Required<CheckCombo>;
  // 체크 여부마다 · 모드마다 · 상태마다
  faces: Record<Checked, Record<Mode, Record<CheckState, CheckFace>>>;
  press: { distance: number; widthDivisor: number; minBasis: number };
};

export type ColorPart = Pick<CheckFace, 'ring'> & { box: Pick<CheckFace['box'], 'bg' | 'border' | 'borderWidth'>; icon: Pick<CheckFace['icon'], 'color' | 'glyph'>; labelColor: string };
export type DimPart = Omit<CheckFace, 'box' | 'icon' | 'label' | 'ring'> & { box: Pick<CheckFace['box'], 'size' | 'radius'>; iconSize: number; label: Omit<CheckFace['label'], 'color' | 'fontWeight'>; ring: Pick<CheckFace['ring'], 'width' | 'offset'> };
export type CheckParts = {
  colors: Record<string, Record<Checked, Record<Mode, Record<CheckState, ColorPart>>>>;
  dims: Record<string, DimPart>;
  weights: Record<string, number | string>;
  press: CheckLook['press'];
  surface: Record<Mode, string>;
};


// 조각을 합쳐 CheckLook 으로 — 플레이그라운드(브라우저)에서 쓴다
export function composeCheckLook(p: CheckParts, combo: Required<CheckCombo>): CheckLook {
  const colors = p.colors[`${combo.shape}|${combo.tone}`];
  const dim = p.dims[`${combo.size}|${combo.shape}`];
  const faces = {} as CheckLook['faces'];
  for (const ch of CHECKED) {
    faces[ch] = { light: {}, dark: {} } as Record<Mode, Record<CheckState, CheckFace>>;
    for (const mode of ['light', 'dark'] as Mode[])
      for (const st of CHECK_STATES) {
        const c = colors[ch][mode][st];
        faces[ch][mode][st] = {
          box: { ...dim.box, ...c.box },
          icon: { size: dim.iconSize, ...c.icon },
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
