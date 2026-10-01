// 컴포넌트 페이지의 그림 자리 — 스펙 md 의 `[그림: 캡션](../../site/components/specs/<이름>.tsx#<id>)` 한 줄이
// scripts/gen-content.mjs 에서 <SpecFigure name id caption /> 가 되고, 여기서 그 그림을 찾아 그린다.
import type { ReactNode } from 'react';
import { buttonFigures } from './button';
import { buttonGuideFigures } from './button-guides';
import { checkboxFigures } from './checkbox';
import { listFigures } from './list';
import { radioGroupFigures } from './radio-group';
import { selectBoxFigures } from './select-box';
import { switchFigures } from './switch';
import { SpecSheet } from './spec-sheet';

const FIGURES: Record<string, Record<string, (p: { caption?: string }) => ReactNode>> = {
  button: { ...buttonFigures, ...buttonGuideFigures },
  checkbox: checkboxFigures,
  list: listFigures,
  'radio-group': radioGroupFigures,
  'select-box': selectBoxFigures,
  switch: switchFigures,
};

export function SpecFigure({ name, id, caption }: { name: string; id: string; caption?: string }) {
  // `spec-sheet.tsx#<컴포넌트>` — 그 컴포넌트 YAML 의 규칙 전부(Specification)
  if (name === 'spec-sheet') return <SpecSheet component={id} />;
  const F = FIGURES[name]?.[id];
  if (!F) throw new Error(`그림 ${name}#${id} 이 없다 — site/components/specs/${name}.tsx 의 figures 에 더한다`);
  return <F caption={caption} />;
}
