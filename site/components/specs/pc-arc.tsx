// Progress Circle 의 원 하나(SVG) — 트랙 · 호. Progress Circle 그림(loading-view)과 버튼의 로딩 원(button-view)이 같이 쓴다.
// 크기 · 두께 · 색은 부르는 쪽이 YAML 에서 푼 값으로 넘기고, 회전 · 호 · 채움의 시간 · 곡선 · 시작 각(12시)은 사이트 전체에 깐
// loadingCss(loading-look — progress-circle.yaml 의 motion)의 클래스가 정한다. 모션 줄이기(기기 설정 · still)면 돌지 않는 3/4 호다.
import type { CSSProperties } from 'react';

export type PcArcProps = {
  size: number;
  thickness: number;
  track: string;
  range: string;
  // 값 있는 원 — 0 ~ 1(없으면 값 없는 원)
  ratio?: number;
  // 모션 줄이기로 보이기(그림 · 플레이그라운드) — 기기 설정과 상관없이
  still?: boolean;
  style?: CSSProperties;
  className?: string;
};

export function PcArc({ size, thickness, track, range, ratio, still = false, style, className }: PcArcProps) {
  const c = size / 2;
  const r = (size - thickness) / 2;
  const det = ratio !== undefined;
  const v = det ? Math.min(1, Math.max(0, ratio)) * 100 : 0;
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={[det ? undefined : 'ppc-spin', className].filter(Boolean).join(' ') || undefined}
      data-still={still || undefined}
      style={{ display: 'block', flexShrink: 0, overflow: 'visible', ...style }}
    >
      <g className="ppc-start">
        {/* 색은 style 로 — 사이트 모드를 따르는 var(--p-…) · color-mix 를 받는다(속성으로는 받지 않는다) */}
        <circle cx={c} cy={c} r={r} fill="none" strokeWidth={thickness} style={{ stroke: track }} />
        {det ? (
          // 값이 0 이면 호를 지운다 — 끝이 둥글어 점이 남지 않게
          <circle className="ppc-fill" data-still={still || undefined} cx={c} cy={c} r={r} fill="none" strokeWidth={thickness} strokeLinecap="round" pathLength={100} strokeDasharray="100 100" opacity={v > 0 ? 1 : 0} style={{ stroke: range, strokeDashoffset: 100 - v }} />
        ) : (
          <circle className="ppc-arc" data-still={still || undefined} cx={c} cy={c} r={r} fill="none" strokeWidth={thickness} strokeLinecap="round" pathLength={100} style={{ stroke: range }} />
        )}
      </g>
    </svg>
  );
}
