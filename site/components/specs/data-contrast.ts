// 그림 캡션의 대비 숫자 — 두 색(토큰 이름 또는 hex)의 WCAG 대비를 모드 · 브랜드 값으로 잰다(서버, 빌드 때)
import { color, contrast, design, type Brand } from '@/lib/design-tokens';

export function hexOf(x: string, mode: 'light' | 'dark' = 'light', brand: Brand = 'desk') {
  if (x.startsWith('#')) return x;
  const c = design(brand).front.colors;
  return color(mode === 'dark' && c[`${x}-dark`] ? `${x}-dark` : x, brand);
}
export function contrastPair(a: string, b: string, mode: 'light' | 'dark' = 'light', brand: Brand = 'desk') {
  return contrast(hexOf(a, mode, brand), hexOf(b, mode, brand)).toFixed(2);
}
