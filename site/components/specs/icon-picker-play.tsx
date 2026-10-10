'use client';
// Icon Picker 플레이그라운드 · 코드 미리보기 — 트리거(Input Button)를 누르면 1280 미만은 Bottom Sheet, 이상은 Popover 408 로 격자를 연다.
// 찾는 말("커피" · "월세" · "고양이")을 치면 세트(category-icons.yaml)를 거르고 치기를 멈추면 결과 수를 알린다. 격자에 초점을 두고 ← → ↑ ↓ 로 묶음을 넘어
// 옮기고 Enter 로 고른다 — 고르면 바로 닫히고 초점은 트리거로. Esc 는 찾는 말이 있으면 먼저 지운다(초점은 찾기 칸).
// 찾기 칸은 본문 위에 붙고(흐리지 않는다) 묶음 머리 · 격자는 끝 흐림 상자(본문) 안에서 스크롤한다.
// 값 · 모양은 icon-picker.yaml(icon-picker-view), 시트 · 팝오버는 overlay-live.
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { CategoryGlyph, IpGridView, IpListView, IpSearchView, type IpGridApi } from './icon-picker-view';
import { FONT, IP_COUNT, icv, searchIcons, triggerValue, type CategoryIconSet, type IColor, type IconPickerLook, type ViewMode } from './input-shared';
import type { ResultSectionLook } from './feedback-shared';
import type { BubbleLook } from './menu-shared';
import { ModalLayer, PopoverLayer, useMinWidth } from './overlay-live';
import type { OverlayLook } from './overlay-shared';
import { PopoverSurface, SheetSurface } from './overlay-view';
import { MODES, PlayFrame, Seg } from './select-playground';
import type { SelectLook } from './select-shared';
import { InputButtonView, labelFocusOnly } from './select-view';
import type { TfFieldLook, TfInputLook } from './text-field-shared';
import { TfFieldView } from './text-field-view';
import { Readout } from './toggle-play';

// tip — 칸 툴팁의 말풍선(help-bubble.yaml)
export type IpKit = { look: IconPickerLook; set: CategoryIconSet; select: SelectLook; field: TfFieldLook; input: TfInputLook; result: ResultSectionLook; ov: OverlayLook; tip: BubbleLook };

// Field + 트리거 + 여는 자리 — 실제로 열고 찾고 고른다
export function IconPickerDemo({ kit, mode = 'auto', surface = 'auto', value: valueProp, onValueChange, defaultValue, size = 'responsive', onSaid }: { kit: IpKit; mode?: ViewMode; surface?: 'auto' | 'sheet' | 'popover'; value?: string | null; onValueChange?: (id: string) => void; defaultValue?: string | null; size?: 'responsive' | 'large' | 'medium'; onSaid?: (t: string) => void }) {
  const { look, set, ov } = kit;
  const [own, setOwn] = useState<string | null>(defaultValue ?? null);
  const value = valueProp === undefined ? own : valueProp;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wideAuto = useMinWidth(look.breakpoint);
  const wide = surface === 'auto' ? wideAuto : surface === 'popover';
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const grid = useRef<IpGridApi | null>(null);
  const titleId = useId();
  const tv = triggerValue(look, set, value);
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => btnRef.current?.focus());
  };
  const pick = (id: string) => {
    if (valueProp === undefined) setOwn(id);
    onValueChange?.(id);
    onSaid?.(`${set.entries.find((e) => e.id === id)?.name ?? id} 고름 — 닫고 트리거로`);
    close();
  };
  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);
  const where = wide ? 'popover' : 'sheet';
  // 찾기 칸 — 본문 위(스크롤 상자 밖). ↓ 는 격자의 첫 칸으로
  const search = (
    <IpSearchView
      look={look}
      input={kit.input}
      mode={mode}
      surface={where}
      query={query}
      onQuery={setQuery}
      live
      inputRef={searchRef}
      onDown={() => {
        if (!grid.current) return false;
        grid.current.focusFirst();
        return true;
      }}
    />
  );
  // 묶음 머리 · 격자 — 끝 흐림 상자(본문) 안. Esc 는 찾는 말을 먼저 지우고 찾기 칸으로
  const list = (
    <IpListView
      look={look}
      set={set}
      result={kit.result}
      mode={mode}
      surface={where}
      value={value}
      query={query}
      onPick={pick}
      live
      onFocusName={onSaid}
      tip={kit.tip}
      gridRef={(api) => void (grid.current = api)}
      onEscape={() => {
        setQuery('');
        searchRef.current?.focus();
      }}
    />
  );
  return (
    <div onClick={labelFocusOnly} style={{ fontFamily: FONT }}>
      <TfFieldView look={kit.field} mode={mode} label={look.trigger.label}>
        {(ctl) => (
          <InputButtonView
            look={kit.select}
            mode={mode}
            size={size}
            id={ctl.id}
            describedBy={ctl.describedBy}
            ariaLabel={`${look.trigger.label}, ${tv.text}`}
            buttonRef={btnRef}
            value={tv.text}
            prefixNode={<CategoryGlyph id={tv.id} size={24} />}
            suffixIcon="chevron-down"
            haspopup="dialog"
            expanded={open}
            onClick={() => setOpen(true)}
          />
        )}
      </TfFieldView>
      {wide ? (
        <PopoverLayer open={open} anchor={(btnRef.current?.closest('.psel-box') as HTMLElement | null) ?? null} look={ov.popover} mode={mode} align="start" ariaLabel={look.title} focusSelector="[data-autofocus]" onRequestClose={close}>
          {({ ref, rootProps, style, maxHeight, avail }) => (
            <PopoverSurface ref={ref} rootProps={rootProps} style={style} maxHeight={maxHeight} avail={avail} width={look.popoverWidth} look={ov.popover} mode={mode} top={search} fog={look.surfaces.popover.fog} bodyTabStop={false}>
              {list}
            </PopoverSurface>
          )}
        </PopoverLayer>
      ) : (
        <ModalLayer open={open} kind="sheet" look={ov} mode={mode} outside="close" drag onRequestClose={close} labelledBy={titleId} returnFocus={() => btnRef.current} focusSelector="[data-autofocus]">
          {({ ref, rootProps, style, maxHeight }) => (
            <SheetSurface ref={ref} rootProps={rootProps} style={style} maxHeight={maxHeight} look={ov.sheet} mode={mode} title={look.title} titleId={titleId} onClose={close} safe="env(safe-area-inset-bottom, 0px)" top={search} fog={look.surfaces.sheet.fog} bodyTabStop={false}>
              {list}
            </SheetSurface>
          )}
        </ModalLayer>
      )}
    </div>
  );
}

const SAMPLES = ['커피', '월세', '고양이', 'coffee', '유니콘'];

export function IconPickerPlayground({ kit, surface }: { kit: IpKit; surface: IColor }) {
  const [where, setWhere] = useState<'auto' | 'sheet' | 'popover'>('auto');
  const [value, setValue] = useState<string | null>('coffee');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [said, setSaid] = useState('');
  const [peek, setPeek] = useState('커피');
  const found = useMemo(() => searchIcons(kit.set, peek), [kit.set, peek]);
  const code = [
    'import { useState } from "react"',
    'import { Field } from "@/components/ui/field"',
    'import { IconPicker } from "@/components/ui/icon-picker"',
    'import { DEFAULT_CATEGORY_ICON } from "@/lib/category-icons"',
    '',
    `const [icon, setIcon] = useState<string>(${value ? `"${value}"` : 'DEFAULT_CATEGORY_ICON'})`,
    '',
    `<Field label="${kit.look.trigger.label}">`,
    `  {/* 1280 미만 Bottom Sheet · 이상 Popover ${kit.look.popoverWidth} — 레시피가 폭으로 고른다 */}`,
    '  <IconPicker value={icon} onValueChange={setIcon} />',
    '</Field>',
  ].join('\n');
  const stage = (
    <div className="flex flex-col gap-4" style={{ fontFamily: FONT }}>
      <IconPickerDemo key={where + mode} kit={kit} mode={mode} surface={where} value={value} onValueChange={setValue} onSaid={setSaid} />
      <Readout text={said || `${kit.look.trigger.label}, ${triggerValue(kit.look, kit.set, value).text}, 버튼, 대화상자 열림`} mode={mode} />
      <div className="flex flex-col items-center gap-1.5 border-t border-fd-border pt-3 text-center">
        <span className="text-[12px] text-fd-muted-foreground">찾는 말 — 이름 · 찾는 말 · lucide 이름에서 부분 일치(열어서 쳐 봐도 된다)</span>
        <div className="flex flex-wrap justify-center gap-1">
          {SAMPLES.map((q) => (
            <button key={q} type="button" aria-pressed={q === peek} onClick={() => setPeek(q)} className={`rounded-md border px-2.5 py-1 text-[12px] ${q === peek ? 'border-fd-foreground bg-fd-foreground text-fd-background' : 'border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent'}`}>
              “{q}”
            </button>
          ))}
        </div>
        <span className="text-[12px] leading-5 text-fd-foreground">
          {found.length ? `${IP_COUNT.text.replace('{n}', String(found.length))} — ${found.map((e) => e.name).join(' · ')}` : kit.look.empty.title.replace('{검색어}', peek)}
        </span>
      </div>
    </div>
  );
  return (
    <PlayFrame
      surface={icv(surface, mode)}
      code={code}
      stage={stage}
      controls={
        <>
          <Seg
            label="여는 자리"
            value={where}
            options={[
              ['auto', `폭 따라 — ${kit.look.breakpoint} 미만 시트`],
              ['sheet', 'Bottom Sheet'],
              ['popover', `Popover ${kit.look.popoverWidth}`],
            ]}
            onChange={setWhere}
          />
          <Seg
            label="지금 아이콘 value"
            value={value ?? 'none'}
            options={[
              ['coffee', '커피'],
              ['house', '집'],
              ['none', '없음 → 태그'],
              ['a-arrow-down', '세트 밖'],
            ]}
            onChange={(v) => setValue(v === 'none' ? null : v)}
          />
          <Seg label="모드" value={mode} options={MODES} onChange={setMode} />
        </>
      }
    />
  );
}

// ── 코드 미리보기 — 카테고리 아이콘(새 카테고리는 태그로 시작) ─────
export function IconPickerExDemo({ kit, surface }: { kit: IpKit; surface: IColor }) {
  const [said, setSaid] = useState('');
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl bg-[#E9E9EC] p-4 dark:bg-fd-muted sm:p-6">
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-4 rounded-xl p-6" style={{ background: icv(surface, 'auto') }}>
          <IconPickerDemo kit={kit} defaultValue={kit.set.default} onSaid={setSaid} />
          <Readout text={said || '눌러서 열고 고르면 바로 닫혀요 — "완료" 가 없어요.'} />
        </div>
      </div>
    </figure>
  );
}

// ── 키보드 — 격자에 Tab 하나, ← → 차례 · ↑ ↓ 보이는 위아래 줄(묶음을 넘는다) · Home · End · Enter ─────
export function IconKeyboardDemo({ kit, width, groups, surface }: { kit: IpKit; width: number; groups: string[]; surface: IColor }) {
  const [value, setValue] = useState<string | null>('coffee');
  const [said, setSaid] = useState('');
  const box = useRef<HTMLDivElement | null>(null);
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl bg-[#E9E9EC] p-4 dark:bg-fd-muted sm:p-6">
        <div className="mx-auto flex w-full flex-col items-center gap-3" style={{ maxWidth: width + 48 }}>
          <div ref={box} className="w-full overflow-x-auto rounded-xl px-6 pb-4" style={{ background: icv(surface, 'auto'), fontFamily: FONT }}>
            <IpGridLive kit={kit} width={width} groups={groups} value={value} onPick={(id) => (setValue(id), setSaid(`${kit.set.entries.find((e) => e.id === id)?.name} 고름`))} onFocusName={setSaid} />
          </div>
          <button
            type="button"
            onClick={() => box.current?.querySelector<HTMLElement>('[data-ip-cell="coffee"]')?.focus()}
            className="rounded-md border border-fd-border bg-fd-background px-3 py-1.5 text-[12px] text-fd-foreground hover:bg-fd-accent"
          >
            커피에 초점 두기 — 그다음 ↓
          </button>
          <Readout text={said || '격자에 Tab 하나 — 화살표로 옮기고 Enter · Space 로 고른다'} />
        </div>
      </div>
    </figure>
  );
}
function IpGridLive({ kit, width, groups, value, onPick, onFocusName }: { kit: IpKit; width: number; groups: string[]; value: string | null; onPick: (id: string) => void; onFocusName: (t: string) => void }) {
  return <IpGridView look={kit.look} set={kit.set} width={width} groups={groups} entries={kit.set.entries.filter((e) => groups.includes(e.group))} value={value} live onPick={onPick} onFocusName={onFocusName} tip={kit.tip} />;
}
