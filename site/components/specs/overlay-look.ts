// 시트 · 대화상자 · 확인창 · 팝오버의 모양 — specs/components/bottom-sheet · dialog · alert-dialog · popover.yaml 을 풀어 둔다(서버, 빌드 때).
// 그림(overlay-view)은 이 값만 받아 그린다 — 표면의 너비 · 모서리 · 여백 · 글자 · 색은 그림에 따로 적지 않는다.
// 비고 속 수(닫기 버튼이 있을 때의 오른쪽 여백 · 누름 기준 · 좌우 남김)도 여기서 읽고, 값끼리 맞는지 확인한다 — 문장이 바뀌면 빌드가 멈춘다.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { axisValues, loadComponentSpec, num, resolveState, stateNames, tokenValue, type TypeValue } from '@/lib/component-spec';
import { color, design, pressScale, proseValue, reducedMotion, type Brand } from '@/lib/design-tokens';
import { buttonLook } from './button-look';
import { overlayFog } from './loading-look';
import { OV_TONES, type AlertLayout, type AlertLook, type DialogLook, type DialogSize, type OvClose, type OvColor, type OvFooter, type OvHeader, type OvMotion, type OvRing, type OvText, type OverlayLook, type PopoverLook, type SheetLook } from './overlay-shared';
export * from './overlay-shared';

type Spec = 'bottom-sheet' | 'dialog' | 'alert-dialog' | 'popover';
type Vals = Record<string, unknown>;

const unbox = (raw: unknown) => (raw && typeof raw === 'object' && 'value' in raw ? (raw as { value: unknown }).value : raw);
const noteOf = (raw: unknown) => (raw && typeof raw === 'object' && 'note' in raw ? String((raw as { note: unknown }).note ?? '') : '');
const must = <T,>(v: T | undefined, what: string): T => {
  if (v === undefined || v === null || (typeof v === 'number' && Number.isNaN(v))) throw new Error(`오버레이 YAML 에 ${what} 이 없다`);
  return v;
};
// '16px' · '$spacing-x3' · '$radius-full' → 수
const len = (raw: unknown, what: string) => {
  const v = String(tokenValue(must(raw, what))).replace('−', '-');
  if (v === '0') return 0;
  return must(num(v), what);
};
// 값 · 비고 글자 속 수 — 문장이 바뀌면 여기서 멈춘다(그림이 낡지 않게)
const numIn = (text: string, re: RegExp, what: string) => {
  const m = re.exec(text);
  if (!m) throw new Error(`오버레이 YAML 의 ${what}(${text})에서 ${re} 를 찾지 못했다`);
  return Number(m[1]);
};
const same = (a: number, b: number, what: string) => {
  if (Math.abs(a - b) > 1e-6) throw new Error(`${what} — ${a} 와 ${b} 가 다르다`);
};

// 사이트 모드를 따르는 그림의 CSS 변수 이름 — HR 에서 값이 다른 브랜드 토큰은 --p-hr-<이름>(tokens-style.tsx 와 같은 규칙)
function varName(name: string, brand: Brand) {
  if (brand !== 'hr') return name;
  const desk = design('desk').front.colors;
  const hr = design('hr').front.colors;
  if (!(name in desk) || !hr[name]) return name;
  const differs = hr[name] !== desk[name] || (hr[`${name}-dark`] ?? hr[name]) !== (desk[`${name}-dark`] ?? desk[name]);
  return differs ? `hr-${name}` : name;
}
function named(name: string, brand: Brand): OvColor {
  const dark = design(brand).front.colors[`${name}-dark`] ? color(`${name}-dark`, brand) : color(name, brand);
  return { name: varName(name, brand), light: color(name, brand), dark };
}
function tok(raw: unknown, brand: Brand, what: string): OvColor {
  const v = String(unbox(must(raw, what))).trim();
  const m = /^\$color-([a-z0-9-]+)$/.exec(v);
  if (!m) throw new Error(`오버레이 YAML 의 ${what} 이 색 토큰이 아니다(${v})`);
  return named(m[1], brand);
}
// 딤 — { value: $overlay-dim-light, dark: $overlay-dim-dark }. 사이트 모드를 따르면 --p-overlay-dim(tokens-style.tsx 가 같은 두 토큰으로 깐다)
function dimOf(raw: unknown, what: string): OvColor {
  const box = must(raw, what) as { value?: unknown; dark?: unknown };
  const light = /^\$(overlay-dim-[a-z]+)$/.exec(String(box.value ?? ''))?.[1];
  const dark = /^\$(overlay-dim-[a-z]+)$/.exec(String(box.dark ?? ''))?.[1];
  if (light !== 'overlay-dim-light' || dark !== 'overlay-dim-dark') throw new Error(`오버레이 YAML 의 ${what} 이 overlay-dim-light · -dark 가 아니다 — tokens-style 의 --p-overlay-dim 과 함께 고친다`);
  return { name: 'overlay-dim', light: proseValue('overlay-dim-light'), dark: proseValue('overlay-dim-dark') };
}
// 그림자 토큰 — 라이트 · 다크(-dark) 값과 사이트 모드용 변수(--p-shadow-sN, tokens-style.tsx)
function shadowOf(raw: unknown, what: string): OvColor {
  const v = String(unbox(must(raw, what))).trim();
  const m = /^\$(shadow-s\d)$/.exec(v);
  if (!m) throw new Error(`오버레이 YAML 의 ${what} 이 그림자 토큰이 아니다(${v})`);
  return { name: m[1], light: proseValue(m[1]), dark: proseValue(`${m[1]}-dark`) };
}
function text(v: Vals, slot: string, brand: Brand, what: string): OvText {
  const t = tokenValue(must(v[`${slot}.typography`], `${what} ${slot}.typography`)) as TypeValue | undefined;
  if (!t || typeof t !== 'object') throw new Error(`${what} ${slot}.typography 를 풀지 못했다`);
  return {
    fontSize: t.fontSize,
    lineHeight: must(t.lineHeight, `${what} ${slot} 줄 높이`),
    fontWeight: (unbox(v[`${slot}.fontWeight`]) as number | string | undefined) ?? t.fontWeight ?? 400,
    fontFamily: t.fontFamily ?? "'Pretendard Variable', Pretendard, sans-serif",
    color: tok(v[`${slot}.foreground`], brand, `${what} ${slot}.foreground`),
  };
}
const motionPair = (d: unknown, e: unknown, what: string): OvMotion => ({ duration: String(tokenValue(must(d, `${what} 시간`))), easing: String(tokenValue(must(e, `${what} 곡선`))) });

type MotionEntry = { duration: unknown; easing: unknown; properties?: string[]; note?: string };
function motionEntry(spec: Spec, name: string): MotionEntry {
  const all = (loadComponentSpec(spec) as unknown as { motion?: Record<string, MotionEntry> }).motion ?? {};
  const m = all[name];
  if (!m) throw new Error(`${spec}.yaml 의 motion 에 "${name}" 이 없다`);
  return m;
}
const motionOf = (spec: Spec, name: string) => {
  const m = motionEntry(spec, name);
  return motionPair(m.duration, m.easing, `${spec} ${name}`);
};
// "scale 1.3 → 1" 의 시작 배율
const scaleFrom = (spec: Spec, name: string) => numIn((motionEntry(spec, name).properties ?? []).join(' '), /scale\s*([\d.]+)\s*→/, `${spec} motion "${name}" 의 properties`);

function sameSet(got: string[], want: readonly string[], what: string) {
  if (got.length !== want.length || want.some((w) => !got.includes(w))) throw new Error(`${what}(${got.join(', ')})이 그림(${want.join(', ')})과 다르다 — overlay-look.ts 를 고친다`);
}

function ring(focused: Vals, brand: Brand, what: string): OvRing {
  return {
    width: len(focused['focusRing.width'], `${what} focusRing.width`),
    offset: len(focused['focusRing.offset'], `${what} focusRing.offset`),
    color: tok(focused['focusRing.color'], brand, `${what} focusRing.color`),
  };
}

// 바닥 버튼 크기 — "large 48" · "small 36" 의 크기 이름과 높이가 Button(button.yaml)과 같은지
function buttonSize(raw: unknown, what: string) {
  const m = /^([a-z]+)\s+(\d+)$/.exec(String(unbox(must(raw, what))).trim());
  if (!m) throw new Error(`${what}(${String(unbox(raw))})이 "크기 높이" 꼴이 아니다`);
  const height = buttonLook({ variant: 'neutralSolid', size: m[1] }).faces.light.enabled.height;
  same(height, Number(m[2]), `${what} — Button ${m[1]} 의 높이(button.yaml)`);
  return { size: m[1], height };
}

function header(v: Vals, what: string, closeNote: { slot: string; re: RegExp }): OvHeader {
  const padRightClose = numIn(noteOf(v[closeNote.slot]), closeNote.re, `${what} ${closeNote.slot} 비고`);
  return {
    padTop: len(v['header.paddingTop'], `${what} header.paddingTop`),
    padBottom: len(v['header.paddingBottom'], `${what} header.paddingBottom`),
    padX: len(v['header.paddingX'], `${what} header.paddingX`),
    padRightClose,
    gap: len(v['header.gap'], `${what} header.gap`),
  };
}

function footer(v: Vals, what: string): OvFooter {
  return {
    padTop: len(v['footer.paddingTop'], `${what} footer.paddingTop`),
    padX: len(v['footer.paddingX'], `${what} footer.paddingX`),
    padBottom: len(v['footer.paddingBottom'], `${what} footer.paddingBottom`),
    gap: len(v['footer.gap'], `${what} footer.gap`),
    justify: v['footer.justifyContent'] === undefined ? 'stretch' : String(unbox(v['footer.justifyContent'])),
    button: buttonSize(v['footer.buttonSize'], `${what} footer.buttonSize`),
  };
}

// 본문 여백 — 좌우, 머리가 없을 때 위, 바닥이 없을 때 아래(비고의 "머리가 없을 때만" · "바닥이 없을 때만" 이 바뀌면 멈춘다)
function bodyOf(v: Vals, what: string) {
  if (!noteOf(v['body.paddingTop']).includes('머리가 없을 때만')) throw new Error(`${what} body.paddingTop 비고가 "머리가 없을 때만" 이 아니다 — overlay-view 의 본문을 고친다`);
  if (!noteOf(v['body.paddingBottom']).includes('바닥이 없을 때만')) throw new Error(`${what} body.paddingBottom 비고가 "바닥이 없을 때만" 이 아니다 — overlay-view 의 본문을 고친다`);
  return { padX: len(v['body.paddingX'], `${what} body.paddingX`), padTop: len(v['body.paddingTop'], `${what} body.paddingTop`), padBottom: len(v['body.paddingBottom'], `${what} body.paddingBottom`) };
}

// 누름 축소 — YAML 의 "2px 거리 축소" 가 Motion 의 눌림 피드백과 같고, 비고의 "기준 N" 이 그 버튼의 기준 길이와 같은지
function closeScale(pressed: Vals, size: number, what: string) {
  const ps = pressScale();
  const raw = must(pressed['closeButton.scale'], `${what} pressed closeButton.scale`);
  same(numIn(String(unbox(raw)), /(\d+)px/, `${what} pressed closeButton.scale`), ps.distance, `${what} 닫기 버튼 누름 거리 — Motion 눌림 피드백`);
  same(numIn(noteOf(raw), /기준\s*(\d+)/, `${what} pressed closeButton.scale 비고`), ps.basis(size, size), `${what} 닫기 버튼 누름 기준 — 버튼 크기`);
  return ps.ratio(size, size);
}

function close(spec: Spec, base: Vals, pressed: Vals, brand: Brand, sheetMotion?: { color: OvMotion; scale: OvMotion }): OvClose {
  const w = `${spec} closeButton`;
  const size = len(base['closeButton.size'], `${w}.size`);
  const bgRaw = base['closeButton.background'];
  const touch = String(unbox(must(base['closeButton.touchTarget'], `${w}.touchTarget`)));
  const target = numIn(touch, /(\d+)\s*×/, `${w}.touchTarget`);
  same(numIn(touch, /×\s*(\d+)/, `${w}.touchTarget 세로`), target, `${w}.touchTarget 가로 · 세로`);
  const motion =
    base['closeButton.transitionDuration'] !== undefined
      ? { color: motionPair(base['closeButton.transitionDuration'], base['closeButton.transitionEasing'], `${w}.transition`), scale: motionOf(spec, '누름 — 닫기 버튼') }
      : must(sheetMotion, `${w} 의 전환`);
  return {
    kind: bgRaw ? 'circle' : 'ghost',
    size,
    radius: len(base['closeButton.radius'], `${w}.radius`),
    bg: bgRaw ? tok(bgRaw, brand, `${w}.background`) : null,
    bgPressed: tok(pressed['closeButton.background'], brand, `${spec} pressed closeButton.background`),
    icon: len(base['closeButton.iconSize'], `${w}.iconSize`),
    color: tok(base['closeButton.color'], brand, `${w}.color`),
    top: len(base['closeButton.top'], `${w}.top`),
    right: len(base['closeButton.right'], `${w}.right`),
    target,
    scale: closeScale(pressed, size, spec),
    motion,
  };
}

// bottom-sheet.md 의 Behavior — 끌어 닫는 기준(빠르기 · 내려온 비율 · 열린 뒤 막는 시간)
function dragRule() {
  const md = readFileSync(join(process.cwd(), '..', 'specs/components/bottom-sheet.md'), 'utf8');
  const row = md.split('\n').find((l) => l.startsWith('| 아래로 끌기 |'));
  if (!row) throw new Error('bottom-sheet.md 의 Behavior 에 "아래로 끌기" 줄이 없다');
  return {
    velocity: numIn(row, /([\d.]+)px\/ms/, 'bottom-sheet.md 끌기 빠르기'),
    distance: numIn(row, /높이의\s*(\d+)%/, 'bottom-sheet.md 끌기 비율') / 100,
    guard: numIn(row, /열린 뒤\s*([\d.]+)초/, 'bottom-sheet.md 끌기 막는 시간') * 1000,
  };
}

function sheetLook(brand: Brand, reduced: number): SheetLook {
  const spec = loadComponentSpec('bottom-sheet');
  sameSet(stateNames(spec), ['enabled', 'pressed', 'focused'], 'bottom-sheet.yaml 의 states');
  sameSet(axisValues(spec, 'handle'), ['hidden', 'shown'], 'bottom-sheet.yaml 의 handle');
  const v = resolveState(spec, {}, 'enabled');
  const pressed = resolveState(spec, {}, 'pressed');
  const focused = resolveState(spec, {}, 'focused');
  const h = resolveState(spec, { handle: 'shown' }, 'enabled');
  const w = 'bottom-sheet';
  const c = close('bottom-sheet', v, pressed, brand);
  // 머리 오른쪽 — "64(24 + 원 28 + 12)": 오른쪽 거리 + 원 + 제목과의 사이
  const hd = header(v, w, { slot: 'header.paddingX', re: /오른쪽\s*(\d+)/ });
  const parts = /(\d+)\s*\+\s*원\s*(\d+)\s*\+\s*(\d+)/.exec(noteOf(v['header.paddingX']));
  if (!parts) throw new Error('bottom-sheet.yaml header.paddingX 비고에서 "N + 원 N + N" 을 찾지 못했다');
  same(Number(parts[1]), c.right, 'bottom-sheet 머리 오른쪽 — 닫기 버튼의 오른쪽 거리');
  same(Number(parts[2]), c.size, 'bottom-sheet 머리 오른쪽 — 닫기 원');
  same(Number(parts[1]) + Number(parts[2]) + Number(parts[3]), hd.padRightClose, 'bottom-sheet 머리 오른쪽 합');
  // 누르는 영역 — 비고 "사방 8 넓혀 44 × 44"
  same(numIn(noteOf(v['closeButton.size']), /사방\s*(\d+)/, 'bottom-sheet closeButton.size 비고') * 2 + c.size, c.target, 'bottom-sheet 닫기 누르는 영역');
  const maxH = numIn(String(unbox(v['root.maxHeight'])), /(\d+)%/, 'bottom-sheet root.maxHeight') / 100;
  same(numIn(String(motionEntry('bottom-sheet', '열림 — 시트').note ?? ''), /(\d+)ms/, 'bottom-sheet 열림 비고(모션 줄이기)'), reduced, 'bottom-sheet 모션 줄이기 — DESIGN.md 모션 줄이기 모드');
  return {
    dim: dimOf(v['overlay.background'], `${w} overlay.background`),
    z: { dim: Number(unbox(v['overlay.zIndex'])), surface: Number(unbox(v['root.zIndex'])) },
    maxWidth: len(v['root.maxWidth'], `${w} root.maxWidth`),
    maxHeight: maxH,
    radius: len(v['root.radius'], `${w} root.radius`),
    bg: tok(v['root.background'], brand, `${w} root.background`),
    close: c,
    header: hd,
    title: text(v, 'title', brand, w),
    description: text(v, 'description', brand, w),
    body: { padX: len(v['body.paddingX'], `${w} body.paddingX`), padBottom: len(v['body.paddingBottom'], `${w} body.paddingBottom(바닥이 없을 때)`) },
    // 본문 끝 흐림(scrollFog=on) — Scroll Fog overlayBody 와 같은지 확인한 값
    fog: overlayFog('bottom-sheet'),
    footer: footer(v, w),
    handle: {
      width: len(h['handle.width'], `${w} handle.width`),
      height: len(h['handle.height'], `${w} handle.height`),
      radius: len(h['handle.radius'], `${w} handle.radius`),
      color: tok(h['handle.background'], brand, `${w} handle.background`),
      top: len(h['handle.top'], `${w} handle.top`),
      target: numIn(String(unbox(h['handle.touchTarget'])), /(\d+)\s*×/, `${w} handle.touchTarget`),
    },
    ring: ring(focused, brand, w),
    motion: {
      open: motionOf('bottom-sheet', '열림 — 시트'),
      dimOpen: motionOf('bottom-sheet', '열림 — 딤'),
      close: motionOf('bottom-sheet', '닫힘 — 시트'),
      dimClose: motionOf('bottom-sheet', '닫힘 — 딤'),
      press: motionOf('bottom-sheet', '누름 — 닫기 버튼'),
    },
    drag: dragRule(),
  };
}

function dialogLook(brand: Brand, sheetClose: OvClose, reduced: number): DialogLook {
  const spec = loadComponentSpec('dialog');
  sameSet(stateNames(spec), ['enabled', 'scrolled', 'pressed', 'focused'], 'dialog.yaml 의 states');
  sameSet(axisValues(spec, 'size'), ['medium', 'large'], 'dialog.yaml 의 size');
  const w = 'dialog';
  const v = resolveState(spec, {}, 'enabled');
  const pressed = resolveState(spec, {}, 'pressed');
  const focused = resolveState(spec, {}, 'focused');
  const scrolled = resolveState(spec, {}, 'scrolled');
  // 닫기 버튼의 누름 전환은 YAML 에 없다 — 시트 닫기 버튼과 같은 토큰(색 전환 · 눌림 축소)으로 그린다
  const c = close('dialog', v, pressed, brand, sheetClose.motion);
  const hd = header(v, w, { slot: 'header.gap', re: /오른쪽\s*(\d+)/ });
  const parts = /(\d+)\s*\+\s*아이콘\s*(\d+)\s*\+\s*(\d+)/.exec(noteOf(v['header.gap']));
  if (!parts) throw new Error('dialog.yaml header.gap 비고에서 "N + 아이콘 N + N" 을 찾지 못했다');
  same(Number(parts[1]), c.right, 'dialog 머리 오른쪽 — 닫기 아이콘의 오른쪽 거리');
  same(Number(parts[2]), c.icon, 'dialog 머리 오른쪽 — 닫기 아이콘');
  same(Number(parts[1]) + Number(parts[2]) + Number(parts[3]), hd.padRightClose, 'dialog 머리 오른쪽 합');
  // 화면 폭 − 40 · "좌우 20 은 남긴다"
  const minus = numIn(String(unbox(v['root.maxWidth'])), /−\s*(\d+)/, 'dialog root.maxWidth');
  same(numIn(noteOf(v['root.maxWidth']), /좌우\s*(\d+)/, 'dialog root.maxWidth 비고') * 2, minus, 'dialog 좌우 남김');
  // 본문 끝 흐림은 상태가 아니라 축 scrollFog 다(2026-10-03) — 걸면 늘 켜진 위 · 아래 흐림(Scroll Fog overlayBody)
  const fog = overlayFog('dialog');
  if (Number(unbox(scrolled['divider.opacity'])) !== 1) throw new Error('dialog.yaml scrolled divider.opacity 가 1 이 아니다');
  const sizes = { medium: len(resolveState(spec, { size: 'medium' }, 'enabled')['root.width'], 'dialog medium root.width'), large: len(resolveState(spec, { size: 'large' }, 'enabled')['root.width'], 'dialog large root.width') };
  same(numIn(String(motionEntry('dialog', '열림 — 대화상자').note ?? ''), /(\d+)ms/, 'dialog 열림 비고(모션 줄이기)'), reduced, 'dialog 모션 줄이기');
  return {
    dim: dimOf(v['overlay.background'], `${w} overlay.background`),
    z: { dim: Number(unbox(v['overlay.zIndex'])), surface: Number(unbox(v['root.zIndex'])) },
    sizes,
    defaultSize: must(spec.defaults?.size, 'dialog defaults.size') as DialogSize,
    marginX: minus / 2,
    maxHeight: numIn(String(unbox(v['root.maxHeight'])), /(\d+)%/, 'dialog root.maxHeight') / 100,
    radius: len(v['root.radius'], `${w} root.radius`),
    bg: tok(v['root.background'], brand, `${w} root.background`),
    header: hd,
    title: text(v, 'title', brand, w),
    description: text(v, 'description', brand, w),
    close: c,
    body: bodyOf(v, w),
    scroll: {
      fog,
      divider: {
        height: len(v['divider.height'], 'dialog divider.height'),
        color: tok(v['divider.background'], brand, 'dialog divider.background'),
        motion: motionPair(v['divider.transitionDuration'], v['divider.transitionEasing'], 'dialog divider.transition'),
      },
    },
    footer: footer(v, w),
    ring: ring(focused, brand, w),
    motion: {
      open: motionOf('dialog', '열림 — 대화상자'),
      openFrom: scaleFrom('dialog', '열림 — 대화상자'),
      dimOpen: motionOf('dialog', '열림 — 딤'),
      close: motionOf('dialog', '닫힘 — 대화상자'),
      dimClose: motionOf('dialog', '닫힘 — 딤'),
    },
  };
}

function alertLook(brand: Brand, breakpoint: number, reduced: number): AlertLook {
  const spec = loadComponentSpec('alert-dialog');
  sameSet(stateNames(spec), ['enabled', 'focused'], 'alert-dialog.yaml 의 states');
  const LAYOUTS: AlertLayout[] = ['horizontal', 'vertical', 'single'];
  sameSet(axisValues(spec, 'layout'), LAYOUTS, 'alert-dialog.yaml 의 layout');
  const w = 'alert-dialog';
  const v = resolveState(spec, {}, 'enabled');
  const focused = resolveState(spec, {}, 'focused');
  const maxWidth = len(v['root.maxWidth'], `${w} root.maxWidth`);
  const marginX = len(v['root.marginX'], `${w} root.marginX`);
  // "좌우 32 는 남긴다 — 화면이 336 보다 좁으면 화면 폭 − 64"
  const note = noteOf(v['root.maxWidth']);
  same(numIn(note, /좌우\s*(\d+)/, 'alert-dialog root.maxWidth 비고'), marginX, 'alert-dialog 좌우 남김');
  same(numIn(note, /(\d+)\s*보다/, 'alert-dialog root.maxWidth 비고'), maxWidth + marginX * 2, 'alert-dialog 좁은 화면 기준');
  same(numIn(note, /−\s*(\d+)/, 'alert-dialog root.maxWidth 비고'), marginX * 2, 'alert-dialog 좁은 화면 폭');
  // 버튼 — "medium 40 · 1280 이상 small 36"
  const b = /^([a-z]+)\s+(\d+)\s*·\s*(\d+)\s*이상\s+([a-z]+)\s+(\d+)$/.exec(String(unbox(v['footer.buttonSize'])).trim());
  if (!b) throw new Error('alert-dialog.yaml footer.buttonSize 가 "크기 높이 · 폭 이상 크기 높이" 꼴이 아니다');
  same(Number(b[3]), breakpoint, 'alert-dialog 버튼이 바뀌는 폭 — Input Button 의 반응형 폭');
  const below = buttonSize(`${b[1]} ${b[2]}`, 'alert-dialog footer 버튼(1280 미만)');
  const above = buttonSize(`${b[4]} ${b[5]}`, 'alert-dialog footer 버튼(1280 이상)');
  const layouts = Object.fromEntries(LAYOUTS.map((l) => [l, String(unbox(must(resolveState(spec, { layout: l }, 'enabled')['footer.direction'], `${w} ${l} footer.direction`)))])) as Record<AlertLayout, string>;
  same(numIn(String(motionEntry('alert-dialog', '열림 — 확인창').note ?? ''), /(\d+)ms/, 'alert-dialog 열림 비고(모션 줄이기)'), reduced, 'alert-dialog 모션 줄이기');
  return {
    dim: dimOf(v['overlay.background'], `${w} overlay.background`),
    z: { dim: Number(unbox(v['overlay.zIndex'])), surface: Number(unbox(v['root.zIndex'])) },
    maxWidth,
    marginX,
    padding: len(v['root.padding'], `${w} root.padding`),
    radius: len(v['root.radius'], `${w} root.radius`),
    bg: tok(v['root.background'], brand, `${w} root.background`),
    title: text(v, 'title', brand, w),
    description: { ...text(v, 'description', brand, w), marginTop: len(v['description.marginTop'], `${w} description.marginTop`) },
    footer: { padTop: len(v['footer.paddingTop'], `${w} footer.paddingTop`), gap: len(v['footer.gap'], `${w} footer.gap`), below, above },
    layouts,
    defaultLayout: must(spec.defaults?.layout, 'alert-dialog defaults.layout') as AlertLayout,
    ring: ring(focused, brand, w),
    motion: {
      open: motionOf('alert-dialog', '열림 — 확인창'),
      openFrom: scaleFrom('alert-dialog', '열림 — 확인창'),
      dimOpen: motionOf('alert-dialog', '열림 — 딤'),
      close: motionOf('alert-dialog', '닫힘 — 확인창'),
      dimClose: motionOf('alert-dialog', '닫힘 — 딤'),
    },
  };
}

function popoverLook(brand: Brand, dialog: DialogLook, sheetClose: OvClose): PopoverLook {
  const spec = loadComponentSpec('popover');
  sameSet(stateNames(spec), ['enabled', 'pressed', 'focused'], 'popover.yaml 의 states');
  const w = 'popover';
  const v = resolveState(spec, {}, 'enabled');
  const pressed = resolveState(spec, {}, 'pressed');
  const focused = resolveState(spec, {}, 'focused');
  const c = close('popover', v, pressed, brand, sheetClose.motion);
  const hd = header(v, w, { slot: 'header.gap', re: /오른쪽\s*(\d+)/ });
  // 본문 스크롤은 "Dialog 와 같다" — 비고의 끝 흐림(위 20 · 아래 80) · 1px · 선 색이 Dialog 값과 같은지
  const bodyNote = noteOf(v['body.overflowY']);
  if (!bodyNote.includes('Scroll Fog overlayBody')) throw new Error('popover body.overflowY 비고가 Scroll Fog overlayBody 를 가리키지 않는다 — overlay-view 의 팝오버 본문을 고친다');
  same(numIn(bodyNote, /위\s*(\d+)\s*·\s*아래/, 'popover body.overflowY 비고'), dialog.scroll.fog.top, 'popover 위 흐림 — Dialog');
  same(numIn(bodyNote, /아래\s*(\d+)/, 'popover body.overflowY 비고'), dialog.scroll.fog.bottom, 'popover 아래 흐림 — Dialog');
  same(numIn(bodyNote, /(\d+)px/, 'popover body.overflowY 비고'), dialog.scroll.divider.height, 'popover 머리 아래 선 — Dialog');
  if (!bodyNote.includes(String(dialog.scroll.divider.color.name).replace(/^hr-/, ''))) throw new Error('popover body.overflowY 비고의 선 색이 Dialog 의 divider 색과 다르다');
  const offset = len(v['root.offset'], `${w} root.offset`);
  return {
    minWidth: len(v['root.minWidth'], `${w} root.minWidth`),
    maxWidth: len(v['root.maxWidth'], `${w} root.maxWidth`),
    maxHeight: len(v['root.maxHeight'], `${w} root.maxHeight`),
    radius: len(v['root.radius'], `${w} root.radius`),
    bg: tok(v['root.background'], brand, `${w} root.background`),
    shadow: shadowOf(v['root.shadow'], `${w} root.shadow`),
    offset,
    edge: numIn(noteOf(v['root.offset']), /가장자리와는\s*(\d+)/, 'popover root.offset 비고'),
    z: Number(unbox(v['root.zIndex'])),
    header: hd,
    title: text(v, 'title', brand, w),
    description: text(v, 'description', brand, w),
    close: c,
    body: bodyOf(v, w),
    scroll: dialog.scroll,
    footer: footer(v, w),
    ring: ring(focused, brand, w),
    motion: { open: motionOf('popover', '열림'), openFrom: scaleFrom('popover', '열림'), close: motionOf('popover', '닫힘') },
  };
}

const cache = new Map<Brand, OverlayLook>();

export function overlayLook(brand: Brand = 'desk'): OverlayLook {
  const hit = cache.get(brand);
  if (hit) return hit;
  // 경계 — Input Button 의 반응형 폭(1280). 시트 ↔ 대화상자 · 팝오버가 같은 폭에서 바뀐다
  const ib = resolveState(loadComponentSpec('input-button'), { size: 'responsive' }, 'enabled');
  const breakpoint = len(ib['root.breakpoint'], 'input-button root.breakpoint');
  const reduced = reducedMotion().fade;
  const sheet = sheetLook(brand, reduced);
  const dialog = dialogLook(brand, sheet.close, reduced);
  const look: OverlayLook = {
    sheet,
    dialog,
    alert: alertLook(brand, breakpoint, reduced),
    popover: popoverLook(brand, dialog, sheet.close),
    breakpoint,
    reduced,
    tone: Object.fromEntries(OV_TONES.map((n) => [n, named(n, brand)])) as OverlayLook['tone'],
  };
  cache.set(brand, look);
  return look;
}
