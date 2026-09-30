// Radio 의 모양 — specs/components/radio-group.yaml 을 조합 · 선택 여부 · 상태 · 모드마다 풀어 둔다(서버, 빌드 때).
// 그림(RadioView)은 이 값만 받아 그린다.
import { loadComponentSpec, num, resolveState, tokenValue, type TypeValue } from '@/lib/component-spec';
import type { Mode } from '@/lib/component-spec';
import { design, pressScale, type Brand } from '@/lib/design-tokens';
import { RADIO_CHECKED, RADIO_STATES, type RadioColorPart, type RadioCombo, type RadioFace, type RadioLook, type RadioParts, type RadioState } from './radio-group-shared';
export * from './radio-group-shared';

const str = (v: unknown) => (typeof v === 'string' ? v : undefined);

function face(v: Record<string, unknown>, focused: Record<string, unknown>, pressed: Record<string, unknown>, mode: Mode, brand: Brand): RadioFace {
  const t = (k: string, src = v) => tokenValue(src[k], mode, brand);
  const type = t('label.typography') as TypeValue | undefined;
  return {
    mark: {
      size: num(t('radiomark.size')) ?? 20,
      bg: str(t('radiomark.background')) ?? 'transparent',
      border: str(t('radiomark.borderColor')) ?? 'transparent',
      borderWidth: num(t('radiomark.borderWidth')) ?? 0,
    },
    dot: { size: num(t('dot.size')) ?? 8, color: str(t('dot.color')) ?? 'transparent' },
    label: {
      fontSize: type?.fontSize ?? '14px',
      lineHeight: type?.lineHeight,
      fontWeight: (v['label.fontWeight'] as number | undefined) ?? type?.fontWeight ?? 400,
      color: str(t('label.foreground')) ?? 'inherit',
      fontFamily: str(t('label.fontFamily')) ?? 'inherit',
    },
    row: { gap: num(t('root.gap')) ?? 8, minHeight: num(t('root.minHeight')) ?? 32, align: str(t('root.alignSelf')) ?? 'flex-start' },
    ring: { width: num(t('focusRing.width', focused)) ?? 2, offset: num(t('focusRing.offset', focused)) ?? 2, color: str(t('focusRing.color', focused)) ?? 'currentColor' },
    duration: { color: str(t('radiomark.transitionDuration')) ?? '150ms', scale: str(t('radiomark.scaleDuration', pressed)) ?? '150ms' },
    easing: { color: str(t('radiomark.transitionEasing')) ?? 'ease', scale: str(t('radiomark.scaleEasing', pressed)) ?? 'ease' },
  };
}

const cache = new Map<string, RadioLook>();

export function radioLook(combo: RadioCombo = {}, brand: Brand = 'desk'): RadioLook {
  const spec = loadComponentSpec('radio-group');
  const d = spec.defaults ?? {};
  const full = { size: combo.size ?? d.size, tone: combo.tone ?? d.tone, weight: combo.weight ?? d.weight } as Required<RadioCombo>;
  const key = JSON.stringify([full, brand]);
  const hit = cache.get(key);
  if (hit) return hit;
  const faces = {} as RadioLook['faces'];
  for (const checked of RADIO_CHECKED) {
    const when = { ...full, checked };
    const focused = resolveState(spec, when, 'focused');
    const pressed = resolveState(spec, when, 'pressed');
    faces[checked] = { light: {}, dark: {} } as Record<Mode, Record<RadioState, RadioFace>>;
    for (const mode of ['light', 'dark'] as Mode[]) for (const st of RADIO_STATES) faces[checked][mode][st] = face(resolveState(spec, when, st), focused, pressed, mode, brand);
  }
  const { distance, widthDivisor, minBasis } = pressScale();
  const look = { combo: full, faces, press: { distance, widthDivisor, minBasis } };
  cache.set(key, look);
  return look;
}

// 플레이그라운드 — 색은 톤마다, 치수는 크기마다, 굵기는 따로 싣고 브라우저에서 합친다
// (radio-group.yaml 에서 색 규칙은 톤 · 선택 여부에만, 치수 규칙은 크기에만, 굵기는 weight 에만 걸려 있다)
export function radioParts(brand: Brand = 'desk'): RadioParts {
  const spec = loadComponentSpec('radio-group');
  const axis = (a: string) => (Array.isArray(spec.variants[a]) ? (spec.variants[a] as string[]) : Object.keys(spec.variants[a]));
  const colors: RadioParts['colors'] = {};
  for (const tone of axis('tone')) {
    const look = radioLook({ tone }, brand);
    colors[tone] = {} as RadioParts['colors'][string];
    for (const ch of RADIO_CHECKED) {
      colors[tone][ch] = { light: {}, dark: {} } as Record<Mode, Record<RadioState, RadioColorPart>>;
      for (const mode of ['light', 'dark'] as Mode[])
        for (const st of RADIO_STATES) {
          const f = look.faces[ch][mode][st];
          colors[tone][ch][mode][st] = { mark: { bg: f.mark.bg, border: f.mark.border, borderWidth: f.mark.borderWidth }, dotColor: f.dot.color, labelColor: f.label.color, ring: f.ring };
        }
    }
  }
  const dims: RadioParts['dims'] = {};
  for (const size of axis('size')) {
    const f = radioLook({ size }, brand).faces.checked.light.enabled;
    dims[size] = { markSize: f.mark.size, dotSize: f.dot.size, label: { fontSize: f.label.fontSize, lineHeight: f.label.lineHeight, fontFamily: f.label.fontFamily }, row: f.row, ring: { width: f.ring.width, offset: f.ring.offset }, duration: f.duration, easing: f.easing };
  }
  const weights: RadioParts['weights'] = {};
  for (const weight of axis('weight')) weights[weight] = radioLook({ weight }, brand).faces.unchecked.light.enabled.label.fontWeight;
  const c = design(brand).front.colors;
  return { colors, dims, weights, press: radioLook({}, brand).press, surface: { light: c['bg-layer-default'], dark: c['bg-layer-default-dark'] ?? c['bg-layer-default'] } };
}

// 묶음(Radio Group) 안 줄 사이 — base 의 group.gap
export function radioGroupGap() {
  const v = tokenValue(resolveState(loadComponentSpec('radio-group'), {}, 'enabled')['group.gap']);
  return typeof v === 'string' ? v : '12px';
}

