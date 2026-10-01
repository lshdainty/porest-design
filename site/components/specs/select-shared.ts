// Select · Input Button 의 모양 — 서버(select-look) · 브라우저(select-view · 플레이그라운드)가 함께 쓰는 상수 · 타입.
// 파일 읽기(서버 전용)를 들이지 않는다.

export const SEL_SIZES = ['large', 'medium'] as const;
export type SelSize = (typeof SEL_SIZES)[number];
export type SelSizeProp = SelSize | 'responsive';

// 트리거 · Input Button 의 상태(select.yaml · input-button.yaml 의 states — 부위마다 쓰는 것만)
export const TRIGGER_STATES = ['enabled', 'pressed', 'focused', 'open', 'invalid', 'disabled', 'readonly'] as const;
export type TriggerState = (typeof TRIGGER_STATES)[number];
export const IB_STATES = ['enabled', 'pressed', 'focused', 'invalid', 'disabled', 'readonly'] as const;
export type IbState = (typeof IB_STATES)[number];
// 선택지 — yaml 의 enabled · pressed · selected · disabled. 키보드 위치 · 마우스 호버는 누름과 같은 알약(축소 없음)
export const ITEM_STATES = ['enabled', 'pressed', 'keyboard', 'selected', 'disabled'] as const;
export type ItemState = (typeof ITEM_STATES)[number] | 'hovered';

export type ViewMode = 'light' | 'dark' | 'auto';

// 색 — name 은 사이트 모드를 따를 때 쓰는 CSS 변수(--p-<name>, HR 에서 값이 다른 브랜드 토큰은 hr-<토큰>), light · dark 는 풀어 둔 값
export type SelColor = { name?: string; light: string; dark: string };
export type SelType = { fontSize: string; lineHeight: string; fontWeight: number | string; fontFamily: string };
export type SelMotion = { duration: string; easing: string };

export const scv = (c: SelColor, mode: ViewMode) => (mode === 'auto' ? (c.name ? `var(--p-${c.name})` : c.light) : mode === 'dark' ? c.dark : c.light);

// 상자(트리거 · Input Button) 한 크기
export type SelBoxSize = {
  h: number;
  radius: number;
  padX: number;
  gap: number;
  text: SelType;
  // 앞 아이콘 · 뒤 아이콘(셰브론) · 지우기
  icon: number;
  end: number;
  clear: number;
};

export type SelBoxLook = {
  sizes: Record<SelSize, SelBoxSize>;
  stroke: { base: number; invalid: number };
  ring: { width: number; offset: number; color: SelColor };
  color: {
    // 바탕(기본 · 막힘 · 읽기 전용) · 테두리 · 누름 바탕 · 오류 테두리
    bg: SelColor;
    border: SelColor;
    pressed: SelColor;
    invalid: SelColor;
    bgDisabled: SelColor;
    value: SelColor;
    placeholder: SelColor;
    icon: SelColor;
    // 셰브론 · 뒤 아이콘
    end: SelColor;
    // 앞 · 뒤 글자(Input Button)
    affix: SelColor;
    clear: SelColor;
    disabled: SelColor;
  };
  motion: { bg: SelMotion; scale: SelMotion; invalid: SelMotion };
};

// 선택지 한 크기 — 높이는 위아래 여백 + 글 줄 높이(설명이 있으면 + 간격 + 설명 줄 높이). YAML 의 46 · 66 과 맞는지 서버가 확인한다
export type SelItemSize = { padY: number; gap: number; height: number; heightDesc: number; icon: number; label: SelType; desc: SelType; indicator: number };
export type SelGroupLabelSize = { padY: number; text: SelType; height: number };

export type SelectLook = {
  // 반응형 — 이 폭 미만은 large, 이상은 medium(global.css 의 .psel 이 같은 폭에서 바꾼다)
  breakpoint: number;
  trigger: SelBoxLook & { chevron: { rotate: number; open: SelMotion; close: SelMotion } };
  content: {
    radius: number;
    padY: number;
    // 묶음 사이 — 위 묶음 끝에서 선까지
    gap: number;
    // 트리거와의 거리 · 화면 가장자리와의 거리
    gutter: number;
    edge: number;
    maxHeight: number;
    minHeight: number;
    bg: SelColor;
    // 그림자 — 사이트 모드를 따르면 --p-shadow-sN
    shadow: SelColor;
    motion: { open: SelMotion; close: SelMotion; from: number };
  };
  item: {
    padX: number;
    descGap: number;
    sizes: Record<SelSize, SelItemSize>;
    color: { label: SelColor; desc: SelColor; icon: SelColor; indicator: SelColor; disabled: SelColor };
    // 고른 표시 check 의 선 굵기(note 의 "선 2.5")
    indicatorStroke: number;
  };
  highlight: { radius: number; insetX: number; bg: SelColor; motion: SelMotion };
  groupLabel: { padX: number; color: SelColor; sizes: Record<SelSize, SelGroupLabelSize> };
  divider: { color: SelColor; height: number; marginX: number; marginBottom: number };
  // 눌림 축소 — 기준 길이 max(높이, 폭 ÷ widthDivisor, minBasis) 에서 distance 만큼
  press: { distance: number; widthDivisor: number; minBasis: number };
  // Input Button(input-button.yaml) — 상자는 트리거와 같은 값이다
  ib: SelBoxLook & { breakpoint: number };
  // 그림 속 화면 · 시트 · 팝오버가 쓰는 역할 색(시트 · 팝오버 · 달력은 아직 스펙이 없다 — 토큰으로 간단히)
  tone: Record<SelTone, SelColor>;
  overlay: { dim: { light: string; dark: string }; sheetRadius: number; popoverRadius: number };
};

export const SEL_TONES = [
  'fg-neutral',
  'fg-neutral-muted',
  'fg-neutral-subtle',
  'fg-placeholder',
  'fg-disabled',
  'fg-brand',
  'fg-brand-contrast',
  'bg-brand-solid',
  'bg-brand-weak',
  'bg-layer-default',
  'bg-layer-basement',
  'bg-layer-floating',
  'bg-layer-floating-pressed',
  'bg-neutral-weak',
  'bg-neutral-inverted',
  'fg-neutral-inverted',
  'stroke-neutral-weak',
  'stroke-neutral-subtle',
  'stroke-neutral-contrast',
  'stroke-focus-ring',
  'chart-orange-weak',
  'chart-orange-contrast',
  'chart-blue-weak',
  'chart-blue-contrast',
  'chart-green-weak',
  'chart-green-contrast',
  'chart-violet-weak',
  'chart-violet-contrast',
  'chart-pink-weak',
  'chart-pink-contrast',
] as const;
export type SelTone = (typeof SEL_TONES)[number];

// 그림의 아이콘 — 이름으로 넘긴다(서버 그림 → 브라우저 그림)
export const SEL_ICONS = [
  'chevron-down',
  'chevron-right',
  'calendar',
  'clock',
  'search',
  'credit-card',
  'landmark',
  'banknote',
  'circle-slash',
  'wallet',
  'tag',
  'utensils',
  'coffee',
  'bus',
  'train',
  'taxi',
  'shopping-bag',
  'film',
  'stethoscope',
  'house',
  'plane',
  'user',
  'users',
  'globe',
  'building',
  'repeat',
  'bell',
  'gift',
  'sun',
  'sunrise',
  'sunset',
  'moon',
  'briefcase',
  'umbrella',
  'heart-pulse',
  'share',
  'trash',
  'pencil',
  'arrow-up-down',
  'ellipsis',
] as const;
export type SelIcon = (typeof SEL_ICONS)[number];

// 선택지 · 묶음
export type SelItem = { value: string; label: string; description?: string; icon?: SelIcon; disabled?: boolean };
export type SelGroup = { label?: string; items: SelItem[] };

// 여럿 고른 값 — 다 보이면 쉼표, 넘치면 "첫 값 외 N개"(외 = 앞의 값을 뺀 개수)
export const joinValues = (labels: string[]) => labels.join(', ');
export const summarize = (labels: string[]) => (labels.length <= 1 ? (labels[0] ?? '') : `${labels[0]} 외 ${labels.length - 1}개`);

// 트리거에 그릴 앞 아이콘 — 하나를 고르면 그 선택지의 아이콘(없으면 트리거의 아이콘), 둘 이상이면 트리거의 아이콘(SEED)
export function triggerIcon(trigger: SelIcon | undefined, picked: SelItem[]): SelIcon | undefined {
  if (picked.length === 1) return picked[0].icon ?? trigger;
  return trigger;
}

export const allItems = (groups: SelGroup[]) => groups.flatMap((g) => g.items);

// 눌림 축소 배율 — 기준 길이 max(높이, 폭 ÷ n, 최소) 에서 축소량만큼
export function pressRatio(press: SelectLook['press'], w: number, h: number) {
  const basis = Math.max(h, w / press.widthDivisor, press.minBasis);
  return (basis - press.distance) / basis;
}
