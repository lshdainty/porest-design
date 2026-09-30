// 컴포넌트 페이지의 화면 예시 조각 — Desk · HR 화면을 실제 크기로 그린다(SEED 가이드의 앱 화면 그림 자리).
// 색은 역할 색(DESIGN*.md)에서, 글자 크기는 화면 예시라 그림 안에서 정한다(컴포넌트 자체의 값은 YAML 에서 온다).
import type { CSSProperties, ReactNode } from 'react';
import { ChevronLeft, ChevronRight, House, Wallet, CalendarDays, NotebookPen, Menu, Signal, Wifi, BatteryFull, X } from 'lucide-react';
import { color, proseValue, type Brand } from '@/lib/design-tokens';

export type Mode = 'light' | 'dark';
export const rc = (name: string, mode: Mode = 'light', brand: Brand = 'desk') =>
  name === 'static-white' || name === 'static-black' ? color(name, brand) : color(mode === 'dark' ? `${name}-dark` : name, brand);

export const PHONE_W = 360;

// 휴대폰 화면 — 상태 막대 · 앱 막대 · 본문 · 아래 고정 영역. scale 로 줄여 그린다(나란히 둘 때)
export function Phone({
  children,
  title,
  back = true,
  right,
  bottom,
  overlay,
  mode = 'light',
  h = 600,
  scale = 1,
  bg = 'bg-layer-basement',
  tabs = false,
}: {
  children?: ReactNode;
  title?: string;
  back?: boolean;
  right?: ReactNode;
  bottom?: ReactNode;
  overlay?: ReactNode;
  mode?: Mode;
  h?: number;
  scale?: number;
  bg?: string;
  tabs?: boolean;
}) {
  const fg = rc('fg-neutral', mode);
  return (
    <div className="shrink-0" style={{ width: PHONE_W * scale, height: h * scale }}>
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: PHONE_W,
          height: h,
          transform: scale === 1 ? undefined : `scale(${scale})`,
          transformOrigin: 'top left',
          borderRadius: 36,
          border: `8px solid ${mode === 'dark' ? '#3A3F4C' : '#1A1F2E'}`,
          background: rc(bg, mode),
          fontFamily: 'Pretendard Variable, Pretendard, sans-serif',
          color: fg,
        }}
      >
        <div className="flex h-10 shrink-0 items-center justify-between px-6 text-[13px] font-semibold" style={{ background: rc('bg-layer-default', mode) }}>
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal size={14} />
            <Wifi size={14} />
            <BatteryFull size={16} />
          </span>
        </div>
        {title !== undefined && (
          <div className="flex h-12 shrink-0 items-center gap-1 px-3" style={{ background: rc('bg-layer-default', mode) }}>
            {back ? <ChevronLeft size={24} strokeWidth={2} /> : <span className="w-2" />}
            <span className="flex-1 truncate text-[17px] font-bold">{title}</span>
            {right}
          </div>
        )}
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        {bottom && (
          <div className="shrink-0 px-6 pb-7 pt-3" style={{ background: rc('bg-layer-default', mode) }}>
            {bottom}
          </div>
        )}
        {tabs && <TabBar mode={mode} />}
        {overlay}
      </div>
    </div>
  );
}

function TabBar({ mode }: { mode: Mode }) {
  const items: [typeof House, string][] = [
    [House, '홈'],
    [Wallet, '가계부'],
    [CalendarDays, '캘린더'],
    [NotebookPen, '메모'],
    [Menu, '전체'],
  ];
  return (
    <div className="flex shrink-0 justify-around border-t px-2 pb-6 pt-2" style={{ background: rc('bg-layer-default', mode), borderColor: rc('stroke-neutral-weak', mode) }}>
      {items.map(([I, t], i) => (
        <span key={t} className="flex flex-col items-center gap-0.5 text-[10px] font-medium" style={{ color: rc(i === 0 ? 'fg-neutral' : 'fg-neutral-subtle', mode) }}>
          <I size={22} strokeWidth={2} />
          {t}
        </span>
      ))}
    </div>
  );
}

// 흰 카드 — 회색 바탕 위의 한 묶음
export function Card({ children, mode = 'light', style, pad = 20 }: { children: ReactNode; mode?: Mode; style?: CSSProperties; pad?: number }) {
  return (
    <div className="rounded-2xl" style={{ background: rc('bg-layer-default', mode), padding: pad, ...style }}>
      {children}
    </div>
  );
}

// 목록 줄 — 앞 동그라미(카테고리 색) · 제목 · 부제 · 뒤 금액
export function Row({
  title,
  sub,
  amount,
  hue = 'blue',
  mode = 'light',
  trailing,
}: {
  title: string;
  sub?: string;
  amount?: string;
  hue?: string;
  mode?: Mode;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold" style={{ background: rc(`chart-${hue}-weak`, mode), color: rc(`chart-${hue}-contrast`, mode) }}>
        {title.slice(0, 1)}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-medium" style={{ color: rc('fg-neutral', mode) }}>
          {title}
        </span>
        {sub && (
          <span className="truncate text-[13px]" style={{ color: rc('fg-neutral-subtle', mode) }}>
            {sub}
          </span>
        )}
      </span>
      {amount && (
        <span className="text-[15px] font-semibold tabular-nums" style={{ color: rc('fg-neutral', mode) }}>
          {amount}
        </span>
      )}
      {trailing}
    </div>
  );
}

export function Heading({ children, mode = 'light', sub }: { children: ReactNode; mode?: Mode; sub?: string }) {
  return (
    <div className="flex items-end justify-between">
      <span className="text-[17px] font-bold" style={{ color: rc('fg-neutral', mode) }}>
        {children}
      </span>
      {sub && (
        <span className="flex items-center text-[13px]" style={{ color: rc('fg-neutral-subtle', mode) }}>
          {sub}
          <ChevronRight size={14} />
        </span>
      )}
    </div>
  );
}

export function Line({ w = '60%', mode = 'light', h = 10, tone = 'stroke-neutral-weak' }: { w?: number | string; mode?: Mode; h?: number; tone?: string }) {
  return <span className="block rounded-full" style={{ width: w, height: h, background: rc(tone, mode) }} />;
}

// 입력칸 — 라벨 · 값
export function Field({ label, value, mode = 'light', placeholder = false }: { label: string; value: string; mode?: Mode; placeholder?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium" style={{ color: rc('fg-neutral-muted', mode) }}>
        {label}
      </span>
      <span
        className="flex h-12 items-center rounded-xl px-4 text-[15px]"
        style={{ background: rc('bg-layer-default', mode), border: `1px solid ${rc('stroke-neutral-weak', mode)}`, color: rc(placeholder ? 'fg-placeholder' : 'fg-neutral', mode) }}
      >
        {value}
      </span>
    </div>
  );
}

// 아래에서 올라온 시트 — 딤 위에
export function Sheet({ title, children, footer, mode = 'light', close = true }: { title: string; children?: ReactNode; footer?: ReactNode; mode?: Mode; close?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end" style={{ background: proseValue(mode === 'dark' ? 'overlay-dim-dark' : 'overlay-dim-light') }}>
      <div className="rounded-t-[24px] px-6 pb-7 pt-3" style={{ background: rc('bg-layer-floating', mode) }}>
        <span className="mx-auto mb-4 block h-1 w-10 rounded-full" style={{ background: rc('stroke-neutral-weak', mode) }} />
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[19px] font-bold" style={{ color: rc('fg-neutral', mode) }}>
            {title}
          </span>
          {close && <X size={22} style={{ color: rc('fg-neutral-subtle', mode) }} />}
        </div>
        {children}
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}

// 가운데 대화상자 — 앱의 Alert Dialog
export function AlertBox({ title, body, footer, mode = 'light' }: { title: string; body: string; footer: ReactNode; mode?: Mode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-7" style={{ background: proseValue(mode === 'dark' ? 'overlay-dim-dark' : 'overlay-dim-light') }}>
      <div className="w-full rounded-[20px] px-6 pb-5 pt-6" style={{ background: rc('bg-layer-floating', mode) }}>
        <div className="text-[18px] font-bold" style={{ color: rc('fg-neutral', mode) }}>
          {title}
        </div>
        <div className="mt-2 text-[14px] leading-[21px]" style={{ color: rc('fg-neutral-muted', mode) }}>
          {body}
        </div>
        <div className="mt-6">{footer}</div>
      </div>
    </div>
  );
}

// 웹 창 — 데스크탑 화면(Desk 웹 · HR 웹)
export function WebWindow({ children, mode = 'light', w = 640, h = 380, url = 'desk.porest.app' }: { children: ReactNode; mode?: Mode; w?: number; h?: number; url?: string }) {
  return (
    <div className="shrink-0 overflow-hidden rounded-xl border border-black/10 shadow-sm" style={{ width: w, height: h, background: rc('bg-layer-basement', mode) }}>
      <div className="flex h-8 items-center gap-1.5 px-3" style={{ background: mode === 'dark' ? '#2B303D' : '#E4E6EB' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <span key={c} className="block h-2.5 w-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-3 rounded px-3 text-[11px] leading-5" style={{ background: mode === 'dark' ? '#1E222C' : '#F5F6FA', color: '#8A91A0' }}>
          {url}
        </span>
      </div>
      <div className="relative" style={{ height: h - 32 }}>
        {children}
      </div>
    </div>
  );
}

// 웹의 가운데 모달 — 머리 · 본문 · 아래(footer)
export function WebDialog({ title, children, footer, mode = 'light', w = 440 }: { title: string; children: ReactNode; footer: ReactNode; mode?: Mode; w?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: proseValue(mode === 'dark' ? 'overlay-dim-dark' : 'overlay-dim-light') }}>
      <div className="overflow-hidden rounded-xl" style={{ width: w, background: rc('bg-layer-floating', mode), boxShadow: proseValue(mode === 'dark' ? 'shadow-s4-dark' : 'shadow-s4') }}>
        <div className="flex items-center justify-between px-[22px] pb-2 pt-[18px]">
          <span className="text-[17px] font-bold" style={{ color: rc('fg-neutral', mode) }}>
            {title}
          </span>
          <X size={20} style={{ color: rc('fg-neutral-subtle', mode) }} />
        </div>
        <div className="px-[22px] pb-2">{children}</div>
        <div className="flex items-center gap-2 px-[22px] pb-[18px] pt-4">{footer}</div>
      </div>
    </div>
  );
}

// 키 · 값 한 줄(상세 모달 안)
export function KV({ k, v, mode = 'light' }: { k: string; v: string; mode?: Mode }) {
  return (
    <div className="flex justify-between py-2 text-[14px]">
      <span style={{ color: rc('fg-neutral-subtle', mode) }}>{k}</span>
      <span className="font-medium" style={{ color: rc('fg-neutral', mode) }}>
        {v}
      </span>
    </div>
  );
}

// 이렇게 · 이렇게 하지 않는다 — 그림 칸 아래 색 띠와 한 줄(SEED 의 Do · Don't)
export function Verdict({ ok, children, note, bg = '#FFFFFF' }: { ok: boolean; children: ReactNode; note: ReactNode; bg?: string }) {
  const tone = color(ok ? 'fg-positive' : 'fg-critical');
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center rounded-t-xl p-5" style={{ background: bg }}>
        {children}
      </div>
      <div className="h-1" style={{ background: tone }} />
      <div className="pt-2 text-[13px] leading-5">
        <b style={{ color: tone }}>{ok ? '이렇게' : '이렇게 하지 않는다'}</b>
        <span className="text-fd-muted-foreground"> — {note}</span>
      </div>
    </div>
  );
}
