// 그림 속 카드의 면 · 머리 — card.yaml 에서 바로 푼다(서버). 다른 묶음의 화면 그림(기다림 · 피드백 · 화면 틀)이 카드를 그릴 때 쓴다.
// data-look 의 cardLook 과 같은 YAML 자리를 읽지만 그쪽을 import 하지 않는다 — data-look 이 feedback-look · loading-look 을 부르므로 순환을 피한다.
// 면: 바닥(bg-layer-basement) 위 흰 면 + 1px stroke-neutral-weak · 모서리 16 · 여백 24 · 그림자 없음.
// 목록 카드(body list): 좌우 0 · 아래 12, 머리 위 24 · 좌우 24 · 아래 4. 글 카드 머리는 아래 8.
import { loadComponentSpec, num, resolveState, tokenValue, type TypeValue } from '@/lib/component-spec';

export type CardFace = {
  radius: number;
  borderW: number;
  pad: number;
  // 위아래로 쌓은 카드 사이(root.gap — SEED "8px Gap")
  gap: number;
  // 폰 화면에서 카드 묶음이 서는 화면 끝 — spacing-global-gutter(card.md "모서리 · 사이")
  edge: number;
  // 목록 카드의 아래 여백(마지막 줄의 아래 12 와 합쳐 보이는 24)
  listBottom: number;
  head: { top: number; x: number; bottom: number; gap: number; contentBottom: number };
  title: { fontFamily: string; fontSize: string; lineHeight: string; fontWeight: number };
};

const F = 'card.yaml';
const unbox = (raw: unknown) => (raw && typeof raw === 'object' && 'value' in raw ? (raw as { value: unknown }).value : raw);
function len(raw: unknown, what: string): number {
  const v0 = String(unbox(raw) ?? '').trim();
  if (!v0) throw new Error(`${F} ${what} 이 없다`);
  const v = String(tokenValue(v0));
  if (v === '0') return 0;
  const n = num(v);
  if (n === undefined || Number.isNaN(n)) throw new Error(`${F} ${what}(${v0})을 수로 풀지 못했다`);
  return n;
}

let cache: CardFace | undefined;
export function cardFace(): CardFace {
  if (cache) return cache;
  const spec = loadComponentSpec('card');
  const b = resolveState(spec, {}, 'enabled');
  const L = resolveState(spec, { body: 'list' }, 'enabled');
  if (String(unbox(b['root.shadow'])) !== 'none') throw new Error(`${F} root.shadow 가 none 이 아니다 — 그림은 그림자 없이 그린다`);
  const t = tokenValue(String(unbox(b['title.typography']))) as TypeValue | undefined;
  if (!t || typeof t !== 'object' || !t.lineHeight) throw new Error(`${F} title.typography 를 풀지 못했다`);
  cache = {
    radius: len(b['root.radius'], 'root.radius'),
    borderW: len(b['root.borderWidth'], 'root.borderWidth'),
    pad: len(b['root.padding'], 'root.padding'),
    gap: len(b['root.gap'], 'root.gap'),
    edge: len('$spacing-global-gutter', 'spacing-global-gutter'),
    listBottom: len(L['root.paddingBottom'], 'list root.paddingBottom'),
    head: { top: len(L['header.paddingTop'], 'list header.paddingTop'), x: len(L['header.paddingX'], 'list header.paddingX'), bottom: len(L['header.paddingBottom'], 'list header.paddingBottom'), gap: len(b['header.gap'], 'header.gap'), contentBottom: len(b['header.paddingBottom'], 'header.paddingBottom') },
    title: { fontFamily: t.fontFamily ?? 'inherit', fontSize: t.fontSize, lineHeight: t.lineHeight, fontWeight: Number(unbox(b['title.fontWeight'])) },
  };
  return cache;
}
