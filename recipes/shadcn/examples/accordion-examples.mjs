/*
 * shadcn Accordion 예제 — 정적 HTML preview는 첫 항목 open.
 */

const ITEM = "border-bottom:1px solid var(--color-border-default);";
const TRIGGER = "display:flex; flex:1; align-items:center; justify-content:space-between; padding:16px 0; background:transparent; border:0; cursor:pointer; font-size:var(--text-title-sm); font-weight:500; color:var(--color-text-primary); text-align:left; width:100%;";
const CONTENT = "padding:0 0 16px; font-size:var(--text-body-md); line-height:var(--text-body-md--line-height); color:var(--color-text-secondary);";

const CHEVRON = (rotated = false) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-text-secondary); transform:rotate(${rotated ? 180 : 0}deg); transition:transform 200ms;"><polyline points="6 9 12 15 18 9"/></svg>`;

export const accordionExamples = [
  {
    title: "Single",
    description: "한 번에 하나만 열림. type='single' + collapsible.",
    jsx: `<Accordion type="single" collapsible className="w-[480px]">
  <AccordionItem value="item-1">
    <AccordionTrigger>접근성에 대한 가이드는 어디에 있나요?</AccordionTrigger>
    <AccordionContent>
      디자인 시스템의 모든 컴포넌트는 WCAG AA 기준을 충족하도록 설계되었습니다. 토큰 페이지의 Colors 섹션에서 대비비를 확인할 수 있습니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>HR과 Desk는 어떻게 다른가요?</AccordionTrigger>
    <AccordionContent>
      neutral·semantic 토큰은 공유하지만 primary, primary-light, border-focus는 brand-specific 입니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Tailwind v4에서 어떻게 사용하나요?</AccordionTrigger>
    <AccordionContent>
      exports/tokens.css를 import하면 @theme 블록이 자동 적용됩니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    render: () => `<div style="width:480px;">
  <div style="${ITEM}">
    <button style="${TRIGGER}">
      <span>접근성에 대한 가이드는 어디에 있나요?</span>
      ${CHEVRON(true)}
    </button>
    <div style="${CONTENT}">디자인 시스템의 모든 컴포넌트는 WCAG AA 기준을 충족하도록 설계되었습니다. 토큰 페이지의 Colors 섹션에서 대비비를 확인할 수 있습니다.</div>
  </div>
  <div style="${ITEM}">
    <button style="${TRIGGER}">
      <span>HR과 Desk는 어떻게 다른가요?</span>
      ${CHEVRON(false)}
    </button>
  </div>
  <div style="${ITEM}">
    <button style="${TRIGGER}">
      <span>Tailwind v4에서 어떻게 사용하나요?</span>
      ${CHEVRON(false)}
    </button>
  </div>
</div>`,
  },

  {
    title: "Multiple",
    description: "여러 개 동시에 열기. type='multiple'.",
    jsx: `<Accordion type="multiple" className="w-[480px]">
  <AccordionItem value="features">
    <AccordionTrigger>주요 기능</AccordionTrigger>
    <AccordionContent>
      듀얼 브랜드 지원, 다크 모드 자동 매핑, Korean-first 타이포그래피, design.md spec 검증.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="philosophy">
    <AccordionTrigger>디자인 철학</AccordionTrigger>
    <AccordionContent>
      토스 톤을 기준으로 한 절제된 신뢰감 + 한국어 가독성. 전 연령 범용.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    render: () => `<div style="width:480px;">
  <div style="${ITEM}">
    <button style="${TRIGGER}">
      <span>주요 기능</span>
      ${CHEVRON(true)}
    </button>
    <div style="${CONTENT}">듀얼 브랜드 지원, 다크 모드 자동 매핑, Korean-first 타이포그래피, design.md spec 검증.</div>
  </div>
  <div style="${ITEM}">
    <button style="${TRIGGER}">
      <span>디자인 철학</span>
      ${CHEVRON(true)}
    </button>
    <div style="${CONTENT}">토스 톤을 기준으로 한 절제된 신뢰감 + 한국어 가독성. 전 연령 범용.</div>
  </div>
</div>`,
  },
];
