// Select · Input Button 페이지가 같이 쓰는 그림 조각 — 화면 예시(Desk 거래 추가 · HR 휴가 신청), Field 묶음, 설명 글, 선택지 묶음.
// 칸(Select · Input Button · Input)의 수치는 YAML 을 푼 값(selectLook · textFieldLook)에서 온다. 화면 틀(폰 · 창 · 대화상자)의 글자 크기는 그림 안에서 정한다.
import type { CSSProperties, ReactNode } from 'react';
import { X } from 'lucide-react';
import { proseValue } from '@/lib/design-tokens';
import { buttonLook } from './button-look';
import { ButtonView } from './button-view';
import { selectLook, type SelGroup, type SelSizeProp, type SelectLook } from './select-look';
import { InputButtonView, SelectOpenView, SelectTriggerView } from './select-view';
import { textFieldLook } from './text-field-look';
import { TfFieldView, TfInputView } from './text-field-view';
import { Phone, WebWindow, rc, type Mode } from './kit';

export const desk = () => selectLook('desk');
export const hr = () => selectLook('hr');
export const tf = () => textFieldLook('desk');
const px = (v: string) => parseFloat(v);

export function Cap({ children, strong }: { children?: ReactNode; strong?: ReactNode }) {
  return (
    <span className="flex flex-col items-center gap-0.5 text-center text-[12px] leading-4 pk-muted">
      {strong && <b className="text-[13px] pk-text">{strong}</b>}
      {children}
    </span>
  );
}

// 흰 판 — 칸은 흰 바탕 위에 둔다. 포커스 링(바깥 4px)이 잘리지 않게 여백을 둔다
export function Surface({ mode = 'auto', brand = 'desk', children, className = '', style }: { mode?: Mode; brand?: 'desk' | 'hr'; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`rounded-xl p-5 ${className}`} style={{ background: rc('bg-layer-default', mode, brand), ...style }}>
      {children}
    </div>
  );
}

export function Cell({ label, children, mode = 'auto', className = '' }: { label?: ReactNode; children: ReactNode; mode?: Mode; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <Surface mode={mode}>{children}</Surface>
      {label && <Cap>{label}</Cap>}
    </div>
  );
}

// Field(멈춘 그림) — 라벨 · 설명 · 오류 + 칸
export function F({ mode = 'auto', label, description, error, indicator, children }: { mode?: Mode; label?: string; description?: string; error?: string; indicator?: 'required' | 'optional'; children: ReactNode }) {
  return (
    <TfFieldView look={tf().field} mode={mode} label={label} description={description} errorMessage={error} invalid={!!error} indicator={indicator}>
      {children}
    </TfFieldView>
  );
}

// 폼 — Field 를 form.gapY 간격으로 쌓는다
export function Form({ children, gap }: { children: ReactNode; gap?: number }) {
  return (
    <div className="flex flex-col" style={{ gap: gap ?? tf().field.form.gapY }}>
      {children}
    </div>
  );
}

export const cta = (label: string, mode: Mode, variant = 'neutralSolid', brand: 'desk' | 'hr' = 'desk') => <ButtonView look={buttonLook({ variant, size: 'large' }, brand)} mode={mode} label={label} fill state="enabled" />;
export const smallBtn = (label: string, mode: Mode, variant: string, brand: 'desk' | 'hr' = 'hr') => <ButtonView look={buttonLook({ variant, size: 'small' }, brand)} mode={mode} label={label} state="enabled" />;

// ── 선택지 묶음 ─────────────────────────────────────────
// 결제 수단(Desk) — "없음" 은 맨 앞 따로 묶음
export const PAY_NONE: SelGroup = { items: [{ value: 'none', label: '결제 수단 없음', icon: 'circle-slash' }] };
export const PAY_FLAT: SelGroup = {
  items: [
    { value: 'cash', label: '현금', icon: 'banknote' },
    { value: 'kb-check', label: '국민 체크카드', icon: 'credit-card' },
    { value: 'hyundai-m', label: '현대카드 M', icon: 'credit-card' },
    { value: 'toss', label: '토스뱅크 통장', icon: 'landmark' },
    { value: 'kakao', label: '카카오뱅크 통장', icon: 'landmark' },
  ],
};
export const PAY_GROUPS: SelGroup[] = [
  PAY_NONE,
  { label: '카드', items: [{ value: 'kb-check', label: '국민 체크카드', icon: 'credit-card' }, { value: 'hyundai-m', label: '현대카드 M', icon: 'credit-card' }] },
  { label: '계좌 · 현금', items: [{ value: 'toss', label: '토스뱅크 통장', description: '1000-1234-5678', icon: 'landmark' }, { value: 'cash', label: '현금', icon: 'banknote' }] },
];
export const plain = (groups: SelGroup[]): SelGroup[] => groups.map((g) => ({ ...g, items: g.items.map(({ icon, ...i }) => (void icon, i)) }));
// 휴가 정책(HR)
export const POLICY: SelGroup[] = [
  {
    items: [
      { value: 'annual', label: '연차', description: '남은 연차 11일' },
      { value: 'half-am', label: '반차(오전)' },
      { value: 'half-pm', label: '반차(오후)' },
      { value: 'family', label: '경조 휴가' },
      { value: 'sick', label: '병가' },
      { value: 'official', label: '공가' },
    ],
  },
];
// 카테고리(Desk) — 여럿 고르기
export const CATS: SelGroup[] = [
  {
    items: [
      { value: 'food', label: '식비', icon: 'utensils' },
      { value: 'transport', label: '교통', icon: 'bus' },
      { value: 'shopping', label: '쇼핑', icon: 'shopping-bag' },
      { value: 'culture', label: '문화', icon: 'film' },
      { value: 'health', label: '의료', icon: 'stethoscope' },
    ],
  },
];

// ── 화면 예시 ───────────────────────────────────────────
// Desk 거래 추가(폰 · large) — 카테고리 · 날짜는 Input Button, 결제 수단은 Select
export function DeskTxPhone({ mode, scale = 0.6, h = 640, payment, overlay }: { mode: Mode; scale?: number; h?: number; payment?: ReactNode; overlay?: ReactNode }) {
  const lk = desk();
  const t = tf();
  return (
    <Phone title="거래 추가" mode={mode} scale={scale} h={h} bg="bg-layer-default" bottom={cta('저장', mode)} overlay={overlay}>
      <div className="flex flex-col px-6 pt-4" style={{ gap: t.field.form.gapY }}>
        <F mode={mode} label="금액">
          <TfInputView look={t.input} mode={mode} size="large" state="enabled" value="12,000" suffix="원" />
        </F>
        <F mode={mode} label="카테고리">
          <InputButtonView look={lk} mode={mode} size="large" state="enabled" value="식비 · 점심" prefixIcon="utensils" suffixIcon="chevron-down" />
        </F>
        <F mode={mode} label="결제 수단">
          {payment ?? <SelectTriggerView look={lk} mode={mode} size="large" state="enabled" labels={['현대카드 M']} />}
        </F>
        <F mode={mode} label="날짜">
          <InputButtonView look={lk} mode={mode} size="large" state="enabled" value="10월 1일 (목) 오후 12:30" suffixIcon="calendar" />
        </F>
      </div>
    </Phone>
  );
}

// 웹의 가운데 대화상자 — kit 의 WebDialog 와 같은 모양이되 안을 자르지 않는다(열린 목록이 대화상자 밖으로 나온다 — 실제로는 body 에 띄운다)
export function HrDialog({ mode, title, children, footer, w = 400, top = 24 }: { mode: Mode; title: string; children: ReactNode; footer: ReactNode; w?: number; top?: number }) {
  return (
    <div className="absolute inset-0 flex justify-center" style={{ background: mode === 'auto' ? 'var(--p-overlay-dim)' : desk().overlay.dim[mode], paddingTop: top }}>
      <div className="h-max rounded-xl" style={{ width: w, background: rc('bg-layer-floating', mode, 'hr'), boxShadow: mode === 'auto' ? 'var(--p-shadow-s4)' : proseValue(mode === 'dark' ? 'shadow-s4-dark' : 'shadow-s4') }}>
        <div className="flex items-center justify-between px-[22px] pb-2 pt-[18px]">
          <span className="text-[17px] font-bold" style={{ color: rc('fg-neutral', mode, 'hr') }}>
            {title}
          </span>
          <X size={20} style={{ color: rc('fg-neutral-subtle', mode, 'hr') }} />
        </div>
        <div className="px-[22px] pb-2">{children}</div>
        <div className="flex items-center gap-2 px-[22px] pb-[18px] pt-4">{footer}</div>
      </div>
    </div>
  );
}

// HR 휴가 신청(데스크톱 · medium) — 휴가 정책 Select 를 열었다
export const HR_DIALOG_TITLE = 58;
export function HrLeaveWindow({ mode, w = 520, dialogW = 400 }: { mode: Mode; w?: number; dialogW?: number }) {
  const lk = hr();
  const t = tf();
  const m = lk.item.sizes.medium;
  // 열린 목록의 아래 끝 — 라벨 + 간격 + 칸 + 목록 간격 + 목록(위아래 여백 + 설명 있는 줄 하나 + 한 줄 다섯)
  const listH = lk.content.padY * 2 + m.heightDesc + m.height * (POLICY[0].items.length - 1);
  const listBottom = px(t.field.label.text.lineHeight) + t.field.gap + lk.trigger.sizes.medium.h + lk.content.gutter + listH;
  const h = 32 + 24 + HR_DIALOG_TITLE + listBottom + 24;
  return (
    <WebWindow mode={mode} w={w} h={h} url="hr.porest.app">
      <HrDialog
        mode={mode}
        title="휴가 신청"
        w={dialogW}
        footer={
          <div className="ml-auto flex gap-2">
            {smallBtn('취소', mode, 'neutralWeak')}
            {smallBtn('신청', mode, 'brandSolid')}
          </div>
        }
      >
        <Form gap={20}>
          <F mode={mode} label="휴가 정책">
            <SelectOpenView look={lk} mode={mode} size="medium" groups={POLICY} selected={['annual']} states={{ 'half-am': 'hovered' }} placement="overlay" />
          </F>
          <F mode={mode} label="날짜">
            <InputButtonView look={lk} mode={mode} size="medium" state="enabled" value="2026. 10. 12. (월)" suffixIcon="calendar" />
          </F>
        </Form>
      </HrDialog>
    </WebWindow>
  );
}

// 거래 추가 · 휴가 신청 — 라이트 줄 · 다크 줄(두 페이지의 첫 그림)
export function HeroScreens() {
  return (
    <div className="flex flex-col gap-4">
      {(['light', 'dark'] as const).map((mode) => (
        <div key={mode} className="flex items-start gap-4">
          <DeskTxPhone mode={mode} />
          <HrLeaveWindow mode={mode} />
        </div>
      ))}
    </div>
  );
}

// 코드 미리보기 — 흰 판에 실제로 쓰는 칸
export function Live({ children, w = 360, brand = 'desk' }: { children: ReactNode; w?: number; brand?: 'desk' | 'hr' }) {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl bg-[#E9E9EC] p-4 dark:bg-fd-muted sm:p-6">
        <Surface brand={brand} className="mx-auto w-full" style={{ maxWidth: w }}>
          {children}
        </Surface>
      </div>
    </figure>
  );
}

export type { SelSizeProp, SelectLook };
