// Switch 의 모양 — specs/components/switch.yaml 을 조합 · 켬 · 끔 · 상태 · 모드마다 풀어 둔다(서버, 빌드 때).
// 그림(SwitchView)은 이 값만 받아 그린다.
import { loadComponentSpec, num, resolveState, tokenValue, type TypeValue } from '@/lib/component-spec';
import type { Mode } from '@/lib/component-spec';
import { design, pressScale, type Brand } from '@/lib/design-tokens';
import { SWITCH_CHECKED, SWITCH_STATES, type SwitchColorPart, type SwitchCombo, type SwitchFace, type SwitchLook, type SwitchParts, type SwitchState } from './switch-shared';
export * from './switch-shared';

const str = (v: unknown) => (typeof v === 'string' ? v : undefined);
// 0.8 · 1 같은 배율 — YAML 에서는 숫자이거나 { value, note }
const ratio = (v: unknown): number | undefined => {
  if (v && typeof v === 'object' && 'value' in v) return ratio((v as { value: unknown }).value);
  const n = Number(v);
  return Number.isFinite(n) && v !== '' && v !== null && v !== undefined ? n : undefined;
};

function face(v: Record<string, unknown>, focused: Record<string, unknown>, pressed: Record<string, unknown>, mode: Mode, brand: Brand): SwitchFace {
  const t = (k: string, src = v) => tokenValue(src[k], mode, brand);
  const type = t('label.typography') as TypeValue | undefined;
  return {
    mark: {
      width: num(t('switchmark.width')) ?? 38,
      height: num(t('switchmark.height')) ?? 24,
      padding: num(t('switchmark.padding')) ?? 2,
      bg: str(t('switchmark.background')) ?? 'transparent',
      border: str(t('switchmark.borderColor')) ?? 'transparent',
      borderWidth: num(t('switchmark.borderWidth')) ?? 0,
    },
    thumb: { size: num(t('thumb.size')) ?? 20, color: str(t('thumb.color')) ?? 'transparent', scale: ratio(v['thumb.scale']) ?? 1, shift: num(t('thumb.translateX')) ?? 0 },
    label: {
      fontSize: type?.fontSize ?? '14px',
      lineHeight: type?.lineHeight,
      fontWeight: (v['label.fontWeight'] as number | undefined) ?? type?.fontWeight ?? 500,
      color: str(t('label.foreground')) ?? 'inherit',
      fontFamily: str(t('label.fontFamily')) ?? 'inherit',
    },
    row: { gap: num(t('root.gap')) ?? 8, minHeight: num(t('root.minHeight')) ?? 24, align: str(t('root.alignSelf')) ?? 'flex-start' },
    ring: { width: num(t('focusRing.width', focused)) ?? 2, offset: num(t('focusRing.offset', focused)) ?? 2, color: str(t('focusRing.color', focused)) ?? 'currentColor' },
    duration: { color: str(t('switchmark.transitionDuration')) ?? '50ms', thumb: str(t('thumb.transitionDuration')) ?? '150ms', scale: str(t('switchmark.scaleDuration', pressed)) ?? '150ms' },
    easing: { color: str(t('switchmark.transitionEasing')) ?? 'ease', thumb: str(t('thumb.transitionEasing')) ?? 'ease', scale: str(t('switchmark.scaleEasing', pressed)) ?? 'ease' },
    delay: str(t('switchmark.transitionDelay')) ?? '0ms',
  };
}

const cache = new Map<string, SwitchLook>();

export function switchLook(combo: SwitchCombo = {}, brand: Brand = 'desk'): SwitchLook {
  const spec = loadComponentSpec('switch');
  const d = spec.defaults ?? {};
  const full = { size: String(combo.size ?? d.size), tone: combo.tone ?? d.tone } as Required<SwitchCombo>;
  const key = JSON.stringify([full, brand]);
  const hit = cache.get(key);
  if (hit) return hit;
  const faces = {} as SwitchLook['faces'];
  for (const checked of SWITCH_CHECKED) {
    const when = { ...full, checked };
    const focused = resolveState(spec, when, 'focused');
    const pressed = resolveState(spec, when, 'pressed');
    faces[checked] = { light: {}, dark: {} } as Record<Mode, Record<SwitchState, SwitchFace>>;
    for (const mode of ['light', 'dark'] as Mode[]) for (const st of SWITCH_STATES) faces[checked][mode][st] = face(resolveState(spec, when, st), focused, pressed, mode, brand);
  }
  const { distance, widthDivisor, minBasis } = pressScale();
  const look = { combo: full, faces, press: { distance, widthDivisor, minBasis } };
  cache.set(key, look);
  return look;
}

// 플레이그라운드 — 색은 톤마다, 치수는 크기마다 싣고 브라우저에서 합친다
// (switch.yaml 에서 색 규칙은 톤 · 켬 · 끔에만, 치수 규칙은 크기(와 켬 · 끔의 엄지 이동)에만 걸려 있다)
export function switchParts(brand: Brand = 'desk'): SwitchParts {
  const spec = loadComponentSpec('switch');
  const axis = (a: string) => (Array.isArray(spec.variants[a]) ? (spec.variants[a] as string[]) : Object.keys(spec.variants[a]));
  const colors: SwitchParts['colors'] = {};
  for (const tone of axis('tone')) {
    const look = switchLook({ tone }, brand);
    colors[tone] = {} as SwitchParts['colors'][string];
    for (const ch of SWITCH_CHECKED) {
      colors[tone][ch] = { light: {}, dark: {} } as Record<Mode, Record<SwitchState, SwitchColorPart>>;
      for (const mode of ['light', 'dark'] as Mode[])
        for (const st of SWITCH_STATES) {
          const f = look.faces[ch][mode][st];
          colors[tone][ch][mode][st] = { mark: { bg: f.mark.bg, border: f.mark.border, borderWidth: f.mark.borderWidth }, thumbColor: f.thumb.color, labelColor: f.label.color, ring: f.ring };
        }
    }
  }
  const dims: SwitchParts['dims'] = {};
  for (const size of axis('size')) {
    const faces = switchLook({ size }, brand).faces;
    const f = faces.unchecked.light.enabled;
    const thumb = {} as SwitchParts['dims'][string]['thumb'];
    for (const ch of SWITCH_CHECKED) thumb[ch] = { scale: faces[ch].light.enabled.thumb.scale, shift: faces[ch].light.enabled.thumb.shift };
    dims[size] = {
      mark: { width: f.mark.width, height: f.mark.height, padding: f.mark.padding },
      thumbSize: f.thumb.size,
      thumb,
      label: { fontSize: f.label.fontSize, lineHeight: f.label.lineHeight, fontWeight: f.label.fontWeight, fontFamily: f.label.fontFamily },
      row: f.row,
      ring: { width: f.ring.width, offset: f.ring.offset },
      duration: f.duration,
      easing: f.easing,
      delay: f.delay,
    };
  }
  const c = design(brand).front.colors;
  return { colors, dims, press: switchLook({}, brand).press, surface: { light: c['bg-layer-default'], dark: c['bg-layer-default-dark'] ?? c['bg-layer-default'] } };
}

