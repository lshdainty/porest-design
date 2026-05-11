import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/*
 * Porest Collapsible (shadcn 베이스 + Porest 디자인 토큰)
 *
 * - Radix Collapsible 베이스. 단순 open/closed 토글.
 * - composition: Collapsible > CollapsibleTrigger / CollapsibleContent
 * - 스타일은 사용처에서 직접 — primitive만 제공.
 */

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
