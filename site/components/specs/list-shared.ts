// List 의 모양 — 서버(list-look) · 브라우저(list-view · 플레이그라운드)가 함께 쓰는 상수 · 타입.
// 파일 읽기(서버 전용)를 들이지 않는다.
import type { ButtonLook } from './button-look';
import type { CheckLook } from './checkbox-shared';
import type { RadioLook } from './radio-group-shared';
import type { SwitchLook } from './switch-shared';

type Mode = 'light' | 'dark';

export const LIST_STATES = ['enabled', 'hovered', 'focused', 'pressed', 'disabled'] as const;
export type ListState = (typeof LIST_STATES)[number];
export const LIST_HIGHLIGHTS = ['none', 'highlighted'] as const;
export type ListHighlight = (typeof LIST_HIGHLIGHTS)[number];
export const LIST_ALIGNS = ['center', 'top'] as const;
export type ListAlign = (typeof LIST_ALIGNS)[number];
export const HEADER_VARIANTS = ['mediumWeak', 'boldSolid'] as const;
export type HeaderVariant = (typeof HEADER_VARIANTS)[number];

export type ListType = { fontSize: string; lineHeight?: string; fontWeight: number | string; fontFamily: string };

// 한 줄의 모습 — 강조 · 모드 · 상태마다(맞춤은 세로 맞춤 하나만 바꾸므로 따로)
export type ListFace = {
  pad: { y: number; x: number };
  cursor: string;
  // 바탕 층 — 누름 · 호버면 좌우로 들어오고 둥글어진다
  bg: { color: string; insetX: number; radius: number };
  prefix: { padRight: number; iconSize: number; iconColor: string };
  // 타일 — 바탕 · 아이콘 색은 카테고리 색(tiles). 막히면 YAML 의 비활성 색(bg · fg)
  tile: { size: number; radius: number; iconSize: number; bg?: string; fg?: string };
  body: { gap: number; padRight: number };
  title: ListType & { color: string };
  detail: ListType & { color: string };
  suffix: ListType & { gap: number; color: string; iconSize: number; iconColor: string };
  ring: { width: number; offset: number; color: string };
  divider: { height: number; color: string };
  // 누름 — 콘텐츠 층만 준다(2px 거리)
  scale: boolean;
  motion: { bg: { duration: string; easing: string }; content: { duration: string; easing: string } };
};

export type HeaderFace = ListType & { padX: number; padY: number; gap: number; color: string };

export type TileColor = { bg: Record<Mode, string>; fg: Record<Mode, string>; contrast: Record<Mode, string> };

export type ListLook = {
  faces: Record<ListHighlight, Record<Mode, Record<ListState, ListFace>>>;
  alignItems: Record<ListAlign, string>;
  header: Record<HeaderVariant, Record<Mode, HeaderFace>>;
  press: { distance: number; widthDivisor: number; minBasis: number };
  tiles: Record<string, TileColor>;
  // 줄에 끼우는 컨트롤 · 작은 버튼 — 그 컴포넌트의 YAML 에서(스위치 32 · 체크 · 라디오 large)
  marks: { switch: SwitchLook; check: CheckLook; radio: RadioLook; headerAction: ButtonLook; iconButton: ButtonLook };
  surface: Record<'default' | 'basement' | 'floating', Record<Mode, string>>;
};

// 그림의 아이콘 — 이름으로 넘긴다(서버 그림 → 브라우저 그림)
export const LIST_ICONS = [
  'bell',
  'globe',
  'user',
  'wallet',
  'lock',
  'moon',
  'coffee',
  'bus',
  'utensils',
  'shopping-bag',
  'help',
  'calendar',
  'smartphone',
  'log-out',
  'palette',
  'languages',
  'download',
  'shield',
  'credit-card',
  'piggy-bank',
  'receipt',
  'megaphone',
  'gift',
  'house',
  'trending-up',
  'star',
  'more',
  'pencil',
  'trash',
  'info',
  'check',
  'external',
] as const;
export type ListIcon = (typeof LIST_ICONS)[number];

export type PrefixSpec = { icon: ListIcon } | { tile: string; icon: ListIcon } | { avatar: string; hue: string };
export type SuffixSpec = { text?: string; chevron?: boolean; amount?: string; buttons?: ListIcon[]; icon?: ListIcon };

// 한 줄 — 종류 · 글 · 앞 · 뒤. state 를 주면 그 상태로 멈춘 그림
export type RowSpec = {
  kind: 'view' | 'button' | 'link' | 'switch' | 'check' | 'radio';
  title: string;
  detail?: string;
  prefix?: PrefixSpec;
  suffix?: SuffixSpec;
  highlighted?: boolean;
  disabled?: boolean;
  align?: ListAlign;
  checked?: boolean;
  value?: string;
  // 체크(기본 앞) · 라디오(기본 뒤)를 둘 자리
  markPosition?: 'prefix' | 'suffix';
  // 나쁜 예 — 컨트롤만 막고 줄은 그대로 둔 모습
  markDisabled?: boolean;
  state?: ListState;
};
