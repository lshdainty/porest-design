// Checkbox 의 모양 — specs/components/checkbox.yaml 을 조합 · 체크 여부 · 상태 · 모드마다 풀어 둔다(서버, 빌드 때).
// 그림(CheckboxView)은 이 값만 받아 그린다.
import { loadComponentSpec, num, resolveState, tokenValue, type TypeValue } from '@/lib/component-spec';
import type { Mode } from '@/lib/component-spec';
import { design, pressScale, type Brand } from '@/lib/design-tokens';
import { CHECK_STATES, CHECKED, type CheckCombo, type CheckFace, type CheckLook, type CheckParts, type CheckState, type Checked, type ColorPart } from './checkbox-shared';
export * from './checkbox-shared';


const str = (v: unknown) => (typeof v === 'string' ? v : undefined);

function face(v: Record<string, unknown>, focused: Record<string, unknown>, pressed: Record<string, unknown>, mode: Mode, brand: Brand): CheckFace {
  const t = (k: string, src = v) => tokenValue(src[k], mode, brand);
  const type = t('label.typography') as TypeValue | undefined;
  return {
    box: {
      size: num(t('checkmark.size')) ?? 20,
      radius: str(t('checkmark.radius')) ?? '4px',
      bg: str(t('checkmark.background')) ?? 'transparent',
      border: str(t('checkmark.borderColor')) ?? 'transparent',
      borderWidth: num(t('checkmark.borderWidth')) ?? 0,
    },
    icon: { size: num(v['icon.size']) ?? 12, color: str(t('icon.color')) ?? 'transparent', glyph: String(t('icon.glyph') ?? 'Check') },
    label: {
      fontSize: type?.fontSize ?? '14px',
      lineHeight: type?.lineHeight,
      fontWeight: (v['label.fontWeight'] as number | undefined) ?? type?.fontWeight ?? 400,
      color: str(t('label.foreground')) ?? 'inherit',
      fontFamily: str(t('label.fontFamily')) ?? 'inherit',
    },
    row: { gap: num(t('root.gap')) ?? 8, minHeight: num(t('root.minHeight')) ?? 32 },
    ring: { width: num(t('focusRing.width', focused)) ?? 2, offset: num(t('focusRing.offset', focused)) ?? 2, color: str(t('focusRing.color', focused)) ?? 'currentColor' },
    duration: { color: str(t('checkmark.transitionDuration')) ?? '150ms', scale: str(t('checkmark.scaleDuration', pressed)) ?? '150ms' },
    easing: { color: str(t('checkmark.transitionEasing')) ?? 'ease', scale: str(t('checkmark.scaleEasing', pressed)) ?? 'ease' },
  };
}

const cache = new Map<string, CheckLook>();

export function checkLook(combo: CheckCombo = {}, brand: Brand = 'desk'): CheckLook {
  const spec = loadComponentSpec('checkbox');
  const d = spec.defaults ?? {};
  const full = { size: combo.size ?? d.size, shape: combo.shape ?? d.shape, tone: combo.tone ?? d.tone, weight: combo.weight ?? d.weight } as Required<CheckCombo>;
  const key = JSON.stringify([full, brand]);
  const hit = cache.get(key);
  if (hit) return hit;
  const faces = {} as CheckLook['faces'];
  for (const checked of CHECKED) {
    const when = { ...full, checked };
    const focused = resolveState(spec, when, 'focused');
    const pressed = resolveState(spec, when, 'pressed');
    faces[checked] = { light: {}, dark: {} } as Record<Mode, Record<CheckState, CheckFace>>;
    for (const mode of ['light', 'dark'] as Mode[]) for (const st of CHECK_STATES) faces[checked][mode][st] = face(resolveState(spec, when, st), focused, pressed, mode, brand);
  }
  const { distance, widthDivisor, minBasis } = pressScale();
  const look = { combo: full, faces, press: { distance, widthDivisor, minBasis } };
  cache.set(key, look);
  return look;
}

// 플레이그라운드 — 색은 모양 · 톤마다, 치수는 크기 · 모양마다, 굵기는 따로 싣고 브라우저에서 합친다
// (checkbox.yaml 에서 색 규칙은 모양 · 톤 · 체크 여부에만, 치수 규칙은 크기 · 모양에만, 굵기는 weight 에만 걸려 있다)
export function checkParts(brand: Brand = 'desk'): CheckParts {
  const spec = loadComponentSpec('checkbox');
  const axis = (a: string) => (Array.isArray(spec.variants[a]) ? (spec.variants[a] as string[]) : Object.keys(spec.variants[a]));
  const colors: CheckParts['colors'] = {};
  for (const shape of axis('shape'))
    for (const tone of axis('tone')) {
      const look = checkLook({ shape, tone }, brand);
      const key = `${shape}|${tone}`;
      colors[key] = {} as CheckParts['colors'][string];
      for (const ch of CHECKED) {
        colors[key][ch] = { light: {}, dark: {} } as Record<Mode, Record<CheckState, ColorPart>>;
        for (const mode of ['light', 'dark'] as Mode[])
          for (const st of CHECK_STATES) {
            const f = look.faces[ch][mode][st];
            colors[key][ch][mode][st] = { box: { bg: f.box.bg, border: f.box.border, borderWidth: f.box.borderWidth }, icon: { color: f.icon.color, glyph: f.icon.glyph }, labelColor: f.label.color, ring: f.ring };
          }
      }
    }
  const dims: CheckParts['dims'] = {};
  for (const size of axis('size'))
    for (const shape of axis('shape')) {
      const f = checkLook({ size, shape }, brand).faces.unchecked.light.enabled;
      dims[`${size}|${shape}`] = { box: { size: f.box.size, radius: f.box.radius }, iconSize: f.icon.size, label: { fontSize: f.label.fontSize, lineHeight: f.label.lineHeight, fontFamily: f.label.fontFamily }, row: f.row, ring: { width: f.ring.width, offset: f.ring.offset }, duration: f.duration, easing: f.easing };
    }
  const weights: CheckParts['weights'] = {};
  for (const weight of axis('weight')) weights[weight] = checkLook({ weight }, brand).faces.unchecked.light.enabled.label.fontWeight;
  const c = design(brand).front.colors;
  return { colors, dims, weights, press: checkLook({}, brand).press, surface: { light: c['bg-layer-default'], dark: c['bg-layer-default-dark'] ?? c['bg-layer-default'] } };
}


// 묶음(Checkbox Group) 안 줄 사이 — base 의 group.gap
export function checkGroupGap() {
  const v = tokenValue(resolveState(loadComponentSpec('checkbox'), {}, 'enabled')['group.gap']);
  return typeof v === 'string' ? v : '4px';
}
