// Menu · Menu Sheet · Help Bubble · Tooltip 의 모양 — 서버(menu-look) · 브라우저(menu-view · 데모 · 플레이그라운드)가 함께 쓰는 상수 · 타입.
// 파일 읽기(서버 전용)를 들이지 않는다.

export type ViewMode = 'light' | 'dark' | 'auto';

// 색 — name 은 사이트 모드를 따를 때 쓰는 CSS 변수(--p-<name>, HR 에서 값이 다른 브랜드 토큰은 hr-<토큰>), light · dark 는 풀어 둔 값
export type MColor = { name?: string; light: string; dark: string };
export type MType = { fontSize: string; lineHeight: string; fontWeight: number | string; fontFamily: string };
export type MText = MType & { color: MColor };
export type MMotion = { duration: string; easing: string };
export type MRing = { width: number; offset: number; color: MColor };
// 눌림 축소 — 기준 길이 max(높이, 폭 ÷ widthDivisor, minBasis) 에서 distance 만큼(Feedback 의 눌림 피드백)
export type MPress = { distance: number; widthDivisor: number; minBasis: number; motion: MMotion };

export const mcv = (c: MColor, mode: ViewMode) => (mode === 'auto' ? (c.name ? `var(--p-${c.name})` : c.light) : mode === 'dark' ? c.dark : c.light);
export const toMs = (v: string) => (v.trim().endsWith('ms') ? parseFloat(v) : parseFloat(v) * 1000);
export const pxOf = (v: string | number) => (typeof v === 'number' ? v : parseFloat(v));
export function pressRatio(p: Pick<MPress, 'distance' | 'widthDivisor' | 'minBasis'>, w: number, h: number) {
  const basis = Math.max(h, w / p.widthDivisor, p.minBasis);
  return (basis - p.distance) / basis;
}

// ── 줄 · 묶음 ─────────────────────────────────────────────
export const MENU_ICONS = [
  'pin',
  'pencil',
  'copy',
  'trash',
  'folder-input',
  'folder-output',
  'arrow-down-up',
  'external-link',
  'undo',
  'plus',
  'users',
  'log-out',
  'image',
  'camera',
  'sun',
  'moon',
  'monitor',
  'check',
  'key',
  'download',
] as const;
export type MenuIcon = (typeof MENU_ICONS)[number];
export type MenuTone = 'neutral' | 'critical';
export type MenuItem = { value: string; label: string; description?: string; icon?: MenuIcon; suffixIcon?: MenuIcon; tone?: MenuTone; disabled?: boolean };
export type MenuGroup = { label?: string; items: MenuItem[] };
export const menuItems = (groups: MenuGroup[]) => groups.flatMap((g) => g.items);

// 멈춘 그림의 줄 상태 — 호버(알약) · 키보드(링) · 누름(알약 + 축소) · 막힘
export type MenuItemState = 'enabled' | 'hovered' | 'focused' | 'pressed' | 'disabled';

// ── Menu(menu.yaml) ───────────────────────────────────────
export type MenuLook = {
  // 이 폭 이상은 Menu, 미만은 Menu Sheet(Input Button · 대화상자와 같은 경계)
  breakpoint: number;
  content: {
    width: number;
    radius: number;
    padY: number;
    // 트리거와 · 화면 가장자리와
    offset: number;
    edge: number;
    // 트리거에 맞추는 쪽 — end 면 메뉴 오른쪽 = 트리거 오른쪽(모자라면 화면 안으로 민다)
    align: 'start' | 'end';
    // 높이 — min(480, 남은 화면), 남은 화면이 좁아도 200 은 둔다
    maxHeight: number;
    minHeight: number;
    bg: MColor;
    shadow: MColor;
    z: number;
    motion: { open: MMotion; close: MMotion; from: number };
  };
  item: {
    padY: number;
    padX: number;
    gap: number;
    // 한 줄 · 설명이 있을 때
    height: number;
    heightDesc: number;
    icon: number;
    suffix: number;
    label: MType;
    desc: MType;
    descGap: number;
    cursor: string;
    cursorDisabled: string;
    color: { icon: MColor; label: MColor; desc: MColor; suffix: MColor; critical: MColor; disabled: MColor };
  };
  highlight: { insetX: number; radius: number; bg: MColor; motion: MMotion };
  groupLabel: { padY: number; padX: number; text: MType; color: MColor; height: number };
  divider: { color: MColor; height: number; marginX: number; marginY: number };
  ring: MRing;
  press: MPress;
};

// ── Menu Sheet(menu-sheet.yaml) ───────────────────────────
export type MenuSheetLayout = 'textWithIcon' | 'textOnly';
export type MenuSheetLook = {
  dim: MColor;
  z: { dim: number; surface: number };
  maxWidth: number;
  // 화면 높이에 대한 상한(0.9)
  maxHeight: number;
  radius: number;
  bg: MColor;
  pad: { top: number; x: number; bottom: number };
  handle: { width: number; height: number; radius: number; color: MColor; top: number };
  header: { padBottom: number; gap: number; align: string };
  title: MText;
  description: MText;
  group: { bg: MColor; radius: number; gap: number };
  item: {
    minHeight: number;
    padY: number;
    padX: number;
    gap: number;
    icon: number;
    label: MType;
    desc: MType;
    descGap: number;
    cursor: string;
    cursorDisabled: string;
    pressed: MColor;
    motion: MMotion;
    color: { icon: MColor; label: MColor; desc: MColor; critical: MColor; disabled: MColor };
    // 호버 · 누름 바탕(bg-neutral-weak-pressed) 위의 설명 · 위험한 이름과 아이콘 — 그 바탕에서도 4.5:1
    on: { desc: MColor; critical: MColor };
    // 글만(textOnly) — 가운데
    textOnly: { justify: string; align: string };
  };
  divider: { color: MColor; height: number };
  // 보조 기술용 닫기 — 초점이 와서 보이는 동안의 바탕 · 호버 · 누름 바탕
  close: { minHeight: number; padX: number; radius: number; bg: MColor; bgPressed: MColor; text: MText; marginTop: number };
  // 줄 링은 안쪽(offset), 보조 기술용 닫기의 링은 묶음 밖이라 바깥(closeOffset)
  ring: MRing & { closeOffset: number };
  press: MPress;
};

// ── Help Bubble · Tooltip(help-bubble.yaml) ───────────────
export type BubbleSide = 'top' | 'bottom' | 'left' | 'right';
export type BubbleLook = {
  maxWidth: number;
  padY: number;
  padX: number;
  radius: number;
  bg: MColor;
  // 화살표 끝 ↔ 트리거 · 말풍선 몸통 ↔ 트리거
  offset: number;
  bodyOffset: number;
  // 화면 가장자리와
  edge: number;
  z: number;
  // 화살표 — 폭 · 높이 · 끝 모서리 · 말풍선 모서리에서 최소 거리
  arrow: { width: number; height: number; tip: number; pad: number };
  title: MText;
  description: MText;
  descGap: number;
  // 한 줄 · 설명이 있을 때의 높이
  height: number;
  heightDesc: number;
  // 닫기 버튼 링(안쪽 · 말풍선 글자색) · 닫기 버튼이 없는 말풍선에 Tab 으로 들어왔을 때의 둘레 링(바깥 · 브랜드 링)
  ring: MRing & { rootOffset: number; rootColor: MColor };
  close: { size: number; hit: number; icon: number; radius: number; color: MColor; gap: number; scale: number; motion: MMotion };
  // 툴팁(opens: hover) — 마우스 열림 · 닫힘 지연, 이어 열기 시간(하나가 닫힌 뒤 이 안에 옮기면 바로 · 모션 없이)(ms)
  hover: { open: number; close: number; skip: number };
  motion: { open: MMotion; from: number; close: MMotion };
};

// 화살표 — 폭 × 높이, 끝 모서리. side 는 말풍선이 트리거의 어느 쪽에 있는지(화살표는 그 반대 변에서 트리거를 가리킨다)
export function bubbleArrowPath(look: BubbleLook, side: BubbleSide) {
  const { width: w, height: h, tip: t } = look.arrow;
  if (side === 'top') return `M0,0 H${w} L${w / 2 + t},${h - t} Q${w / 2},${h} ${w / 2 - t},${h - t} Z`;
  if (side === 'bottom') return `M0,${h} H${w} L${w / 2 + t},${t} Q${w / 2},0 ${w / 2 - t},${t} Z`;
  if (side === 'left') return `M0,0 V${w} L${h - t},${w / 2 + t} Q${h},${w / 2} ${h - t},${w / 2 - t} Z`;
  return `M${h},0 V${w} L${t},${w / 2 + t} Q0,${w / 2} ${t},${w / 2 - t} Z`;
}
// 자리 잡기 — 원하는 쪽(기본 위)에 자리가 모자라면 반대편으로 뒤집고, 옆으로 밀어 가장자리와 거리를 둔다.
// 화살표는 늘 트리거 가운데 — 말풍선 모서리에서 최소 거리를 지키고, 모자라면 말풍선을 민다
export function placeBubble(a: { left: number; top: number; width: number; height: number }, size: { w: number; h: number }, box: { width: number; height: number }, look: BubbleLook, prefer: BubbleSide) {
  const { edge, bodyOffset: off, arrow } = look;
  const { w, h } = size;
  const room: Record<BubbleSide, number> = {
    top: a.top - off - h - edge,
    bottom: box.height - (a.top + a.height) - off - h - edge,
    left: a.left - off - w - edge,
    right: box.width - (a.left + a.width) - off - w - edge,
  };
  const opposite: Record<BubbleSide, BubbleSide> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
  const side = room[prefer] < 0 && room[opposite[prefer]] > room[prefer] ? opposite[prefer] : prefer;
  const min = arrow.pad + arrow.width / 2;
  if (side === 'top' || side === 'bottom') {
    const cx = a.left + a.width / 2;
    let left = Math.max(edge, Math.min(cx - w / 2, box.width - edge - w));
    let at = cx - left;
    if (at < min) (left = cx - min), (at = min);
    else if (at > w - min) (left = cx - (w - min)), (at = w - min);
    return { side, left, top: side === 'top' ? a.top - off - h : a.top + a.height + off, arrowAt: at };
  }
  const cy = a.top + a.height / 2;
  let top = Math.max(edge, Math.min(cy - h / 2, box.height - edge - h));
  let at = cy - top;
  if (at < min) (top = cy - min), (at = min);
  else if (at > h - min) (top = cy - (h - min)), (at = h - min);
  return { side, top, left: side === 'left' ? a.left - off - w : a.left + a.width + off, arrowAt: at };
}

// ── 스와이프 트레이(swipe-actions.yaml) — Menu Sheet 의 대신 길 그림 ─────
export type SwipeKind = 'neutral' | 'primary' | 'destructive';
export type SwipeLook = {
  badge: number;
  icon: number;
  label: MType;
  gap: number;
  // 첫 칸(앞 간격 포함) · 이후 칸 · 줄 최소 높이
  first: number;
  rest: number;
  rowMin: number;
  kinds: Record<SwipeKind, { badge: MColor; icon: MColor; label: MColor }>;
};

// 그림 속 화면이 쓰는 역할 색
export const MENU_TONES = [
  'fg-neutral',
  'fg-neutral-muted',
  'fg-neutral-subtle',
  'fg-critical',
  'fg-disabled',
  'fg-brand',
  'bg-layer-default',
  'bg-layer-default-pressed',
  'bg-layer-basement',
  'bg-layer-floating',
  'bg-neutral-weak',
  'bg-neutral-inverted',
  'fg-neutral-inverted',
  'bg-brand-weak',
  'stroke-neutral-weak',
  'stroke-neutral-subtle',
  'stroke-focus-ring',
  'chart-orange-weak',
  'chart-orange-contrast',
  'chart-blue-weak',
  'chart-blue-contrast',
  'chart-green-weak',
  'chart-green-contrast',
  'chart-violet-weak',
  'chart-violet-contrast',
] as const;
export type MTone = (typeof MENU_TONES)[number];

// 브라우저로 넘기는 한 벌 — 서버에서 YAML 을 풀어 브라우저 그림 · 데모가 받는다
export type MenuKit = {
  menu: MenuLook;
  sheet: MenuSheetLook;
  bubble: BubbleLook;
  tone: Record<MTone, MColor>;
};
