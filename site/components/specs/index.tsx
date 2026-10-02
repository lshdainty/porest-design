// 컴포넌트 페이지의 그림 자리 — 스펙 md 의 `[그림: 캡션](../../site/components/specs/<이름>.tsx#<id>)` 한 줄이
// scripts/gen-content.mjs 에서 <SpecFigure name id caption /> 가 되고, 여기서 그 그림을 찾아 그린다.
import type { ReactNode } from 'react';
import { alertDialogFigures } from './alert-dialog';
import { bottomSheetFigures } from './bottom-sheet';
import { buttonFigures } from './button';
import { buttonGuideFigures } from './button-guides';
import { checkboxFigures } from './checkbox';
import { chipFigures } from './chip';
import { dialogFigures } from './dialog';
import { fieldFigures } from './field';
import { inputFigures } from './input';
import { inputButtonFigures } from './input-button';
import { listFigures } from './list';
import { popoverFigures } from './popover';
import { radioGroupFigures } from './radio-group';
import { selectFigures } from './select';
import { selectBoxFigures } from './select-box';
import { segmentedControlFigures } from './segmented-control';
import { switchFigures } from './switch';
import { tabsFigures } from './tabs';
import { textareaFigures } from './textarea';
import { SpecSheet } from './spec-sheet';

const FIGURES: Record<string, Record<string, (p: { caption?: string }) => ReactNode>> = {
  'alert-dialog': alertDialogFigures,
  'bottom-sheet': bottomSheetFigures,
  button: { ...buttonFigures, ...buttonGuideFigures },
  checkbox: checkboxFigures,
  chip: chipFigures,
  dialog: dialogFigures,
  field: fieldFigures,
  input: inputFigures,
  'input-button': inputButtonFigures,
  list: listFigures,
  popover: popoverFigures,
  'radio-group': radioGroupFigures,
  select: selectFigures,
  'select-box': selectBoxFigures,
  'segmented-control': segmentedControlFigures,
  switch: switchFigures,
  tabs: tabsFigures,
  textarea: textareaFigures,
};

export function SpecFigure({ name, id, caption }: { name: string; id: string; caption?: string }) {
  // `spec-sheet.tsx#<컴포넌트>` — 그 컴포넌트 YAML 의 규칙 전부(Specification)
  if (name === 'spec-sheet') return <SpecSheet component={id} />;
  const F = FIGURES[name]?.[id];
  if (!F) throw new Error(`그림 ${name}#${id} 이 없다 — site/components/specs/${name}.tsx 의 figures 에 더한다`);
  return <F caption={caption} />;
}
