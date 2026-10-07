// 컴포넌트 페이지의 그림 자리 — 스펙 md 의 `[그림: 캡션](../../site/components/specs/<이름>.tsx#<id>)` 한 줄이
// scripts/gen-content.mjs 에서 <SpecFigure name id caption /> 가 되고, 여기서 그 그림을 찾아 그린다.
import type { ReactNode } from 'react';
import { alertDialogFigures } from './alert-dialog';
import { aspectRatioFigures } from './aspect-ratio';
import { avatarFigures } from './avatar';
import { badgeFigures } from './badge';
import { bottomNavigationFigures } from './bottom-navigation';
import { bottomSheetFigures } from './bottom-sheet';
import { buttonFigures } from './button';
import { buttonGuideFigures } from './button-guides';
import { calloutFigures } from './callout';
import { checkboxFigures } from './checkbox';
import { contentPlaceholderFigures } from './content-placeholder';
import { datePickerFigures } from './date-picker';
import { chipFigures } from './chip';
import { dialogFigures } from './dialog';
import { dividerFigures } from './divider';
import { fieldFigures } from './field';
import { floatingActionButtonFigures } from './floating-action-button';
import { helpBubbleFigures } from './help-bubble';
import { imageFrameFigures } from './image-frame';
import { inputFigures } from './input';
import { inputButtonFigures } from './input-button';
import { listFigures } from './list';
import { logoTileFigures } from './logo-tile';
import { menuFigures } from './menu';
import { menuSheetFigures } from './menu-sheet';
import { notificationBadgeFigures } from './notification-badge';
import { popoverFigures } from './popover';
import { progressFigures } from './progress';
import { progressCircleFigures } from './progress-circle';
import { pageBannerFigures } from './page-banner';
import { paginationFigures } from './pagination';
import { radioGroupFigures } from './radio-group';
import { resultSectionFigures } from './result-section';
import { selectFigures } from './select';
import { selectBoxFigures } from './select-box';
import { sideNavigationFigures } from './side-navigation';
import { sidePanelFigures } from './side-panel';
import { scrollFogFigures } from './scroll-fog';
import { skeletonFigures } from './skeleton';
import { segmentedControlFigures } from './segmented-control';
import { snackbarFigures } from './snackbar';
import { switchFigures } from './switch';
import { tagGroupFigures } from './tag-group';
import { tablePaginationFigures } from './table-pagination';
import { tabsFigures } from './tabs';
import { textareaFigures } from './textarea';
import { timePickerFigures } from './time-picker';
import { tooltipFigures } from './tooltip';
import { topNavigationFigures } from './top-navigation';
import { wheelPickerFigures } from './wheel-picker';
import { SpecSheet } from './spec-sheet';

const FIGURES: Record<string, Record<string, (p: { caption?: string }) => ReactNode>> = {
  'alert-dialog': alertDialogFigures,
  'aspect-ratio': aspectRatioFigures,
  avatar: avatarFigures,
  badge: badgeFigures,
  'bottom-navigation': bottomNavigationFigures,
  'bottom-sheet': bottomSheetFigures,
  button: { ...buttonFigures, ...buttonGuideFigures },
  callout: calloutFigures,
  checkbox: checkboxFigures,
  'content-placeholder': contentPlaceholderFigures,
  'date-picker': datePickerFigures,
  chip: chipFigures,
  dialog: dialogFigures,
  divider: dividerFigures,
  field: fieldFigures,
  'floating-action-button': floatingActionButtonFigures,
  'help-bubble': helpBubbleFigures,
  'image-frame': imageFrameFigures,
  input: inputFigures,
  'input-button': inputButtonFigures,
  list: listFigures,
  'logo-tile': logoTileFigures,
  menu: menuFigures,
  'menu-sheet': menuSheetFigures,
  'notification-badge': notificationBadgeFigures,
  popover: popoverFigures,
  progress: progressFigures,
  'progress-circle': progressCircleFigures,
  'page-banner': pageBannerFigures,
  pagination: paginationFigures,
  'radio-group': radioGroupFigures,
  'result-section': resultSectionFigures,
  select: selectFigures,
  'select-box': selectBoxFigures,
  'side-navigation': sideNavigationFigures,
  'side-panel': sidePanelFigures,
  'scroll-fog': scrollFogFigures,
  skeleton: skeletonFigures,
  'segmented-control': segmentedControlFigures,
  snackbar: snackbarFigures,
  switch: switchFigures,
  'tag-group': tagGroupFigures,
  'table-pagination': tablePaginationFigures,
  tabs: tabsFigures,
  textarea: textareaFigures,
  'time-picker': timePickerFigures,
  tooltip: tooltipFigures,
  'top-navigation': topNavigationFigures,
  'wheel-picker': wheelPickerFigures,
};

export function SpecFigure({ name, id, caption }: { name: string; id: string; caption?: string }) {
  // `spec-sheet.tsx#<컴포넌트>` — 그 컴포넌트 YAML 의 규칙 전부(Specification)
  // data-figure — 그림 자리 표시(상자를 만들지 않는다 — contents). 그림 하나씩 찍거나 잴 때 찾는다
  if (name === 'spec-sheet')
    return (
      <div className="contents" data-figure={`spec-sheet#${id}`}>
        <SpecSheet component={id} />
      </div>
    );
  const F = FIGURES[name]?.[id];
  if (!F) throw new Error(`그림 ${name}#${id} 이 없다 — site/components/specs/${name}.tsx 의 figures 에 더한다`);
  return (
    <div className="contents" data-figure={`${name}#${id}`}>
      <F caption={caption} />
    </div>
  );
}
