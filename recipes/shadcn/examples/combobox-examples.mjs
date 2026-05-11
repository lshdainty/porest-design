/*
 * shadcn Combobox 예제 — Command + Popover 조립. 별도 컴포넌트 없음.
 *
 * Trigger는 최신 Select(specs/components — select.tsx SelectTrigger와 동일 톤):
 *   bg-surface-input + text-body-md + px-[var(--spacing-md)] py-[var(--spacing-sm)] + font-sans
 *   + transition motion 토큰 직접 인용.
 * Popover content / 검색 input / item은 Select의 SelectContent / SelectItem과 통일.
 */

// select.tsx SelectTrigger와 1:1 동기 (combobox 폭은 200px 고정).
const TRIGGER =
  "inline-flex items-center justify-between gap-[var(--spacing-sm)] whitespace-nowrap rounded-sm border border-border-default bg-surface-input px-[var(--spacing-md)] py-[var(--spacing-sm)] font-sans text-body-md text-text-primary hover:bg-surface-input focus:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 transition-[color,background-color,border-color,box-shadow] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] h-10 w-[200px]";

const POPOVER =
  "padding:0; border:1px solid var(--color-border-default); border-radius:var(--radius-md); background:var(--color-surface-default); width:200px; box-shadow:var(--shadow-md); margin-top:var(--spacing-sm); overflow:hidden;";

const INPUT_WRAPPER =
  "display:flex; align-items:center; padding:0 var(--spacing-md); border-bottom:1px solid var(--color-border-default);";

const INPUT =
  "display:flex; height:40px; width:100%; padding:var(--spacing-sm) 0; background:transparent; border:0; outline:none; font-family:var(--font-sans); font-size:var(--text-body-md); color:var(--color-text-primary);";

const LIST = "max-height:300px; overflow-y:auto; padding:var(--spacing-xs);";

const ITEM =
  "display:flex; gap:var(--spacing-sm); align-items:center; padding:var(--spacing-xs) var(--spacing-sm); border-radius:var(--radius-xs); font-size:var(--text-body-md); color:var(--color-text-primary); cursor:default;";

const ITEM_SELECTED = `${ITEM} background:var(--color-surface-input);`;

const SEARCH =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:var(--spacing-sm); flex-shrink:0; color:var(--color-text-secondary);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

const CHECK =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

const CHECK_INVISIBLE =
  '<svg width="16" height="16" viewBox="0 0 24 24" style="opacity:0;"><path/></svg>';

// select.tsx와 동일 — text-tertiary 토큰 직접 인용 (이전 opacity:0.5는 모호함).
const CHEVRON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-text-tertiary);"><polyline points="6 9 12 15 18 9"/></svg>';

export const comboboxExamples = [
  {
    title: "Default",
    description: "검색 가능한 select — Command 팔레트 + Popover. select와 달리 검색/필터 가능.",
    jsx: `const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

const [open, setOpen] = React.useState(false)
const [value, setValue] = React.useState("")

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-[200px] justify-between"
    >
      {value
        ? frameworks.find((f) => f.value === value)?.label
        : "프레임워크 선택"}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-text-tertiary" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[200px] p-0">
    <Command>
      <CommandInput placeholder="검색…" />
      <CommandEmpty>결과가 없습니다.</CommandEmpty>
      <CommandGroup>
        {frameworks.map((f) => (
          <CommandItem
            key={f.value}
            value={f.value}
            onSelect={(currentValue) => {
              setValue(currentValue === value ? "" : currentValue)
              setOpen(false)
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === f.value ? "opacity-100" : "opacity-0",
              )}
            />
            {f.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>`,
    render: () => {
      const item = (label, selected = false) => `<div style="${selected ? ITEM_SELECTED : ITEM}">${selected ? CHECK : CHECK_INVISIBLE}<span>${label}</span></div>`;
      return `<div style="display:flex; flex-direction:column;">
  <button class="${TRIGGER}">
    <span>Next.js</span>
    ${CHEVRON}
  </button>
  <div style="${POPOVER}">
    <div style="${INPUT_WRAPPER}">${SEARCH}<input style="${INPUT}" placeholder="검색…" /></div>
    <div style="${LIST}">
      ${item("Next.js", true)}
      ${item("SvelteKit")}
      ${item("Nuxt.js")}
      ${item("Remix")}
      ${item("Astro")}
    </div>
  </div>
</div>`;
    },
  },
];
