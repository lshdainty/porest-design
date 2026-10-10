'use client';
// Input OTP 플레이그라운드 · 코드 미리보기 — 크기 · 상태 · 다시 받기의 때를 고르면 스펙대로 그린 칸(otp-view — input-otp · input · field.yaml)과 그 코드가 바뀐다.
// 칸에 "123 456" · "인증 코드: 123456" 을 붙여 보면 숫자만 남고, 시계를 빨리 돌리면 다시 받기가 풀린다.
// 코드는 input-otp.md 의 "코드" 절과 같은 API(InputOTP · InputOTPResend)로 쓴다. 보냈다는 알림은 Snackbar(snackbar.yaml).
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ButtonLook } from './button-look';
import { ButtonView } from './button-view';
import type { SnackbarLook } from './feedback-shared';
import { SnackbarRegion, useSnackbarHost } from './feedback-view';
import { ScreenFrame } from './feedback-demos';
import { FONT, icv, otpDigits, resendState, type IColor, type OtpLook, type ViewMode } from './input-shared';
import { OtpFieldView, OtpResendView, useClock } from './otp-view';
import { MODES, PlayFrame, Seg } from './select-playground';
import type { TfFieldLook, TfInputLook } from './text-field-shared';

const LABEL = '인증 코드';
const PASTES = ['123 456', '인증 코드: 123456', '123-456'];

export function OtpPlayground({ look, field, input, resend, surface }: { look: OtpLook; field: TfFieldLook; input: TfInputLook; resend: ButtonLook; surface: IColor }) {
  const [size, setSize] = useState<'large' | 'medium'>('large');
  const [state, setState] = useState<'enabled' | 'focused' | 'invalid' | 'disabled'>('enabled');
  const [timing, setTiming] = useState<'first' | 'cooldown' | 'ready'>('cooldown');
  const [speed, setSpeed] = useState<'1' | '10'>('1');
  const [mode, setMode] = useState<ViewMode>('auto');
  const [code, setCode] = useState('');
  const [pasted, setPasted] = useState('');
  const now = useClock(true, Number(speed));
  const [sentAt, setSentAt] = useState<number | null>(() => Date.now() - 8000);
  const ref = useRef<HTMLInputElement | null>(null);
  const rs = resendState(look, sentAt, now);
  // 때를 고르면 보낸 때를 그 자리에 맞춘다 — 남은 초는 52초부터
  const pickTiming = (t: 'first' | 'cooldown' | 'ready') => {
    setTiming(t);
    setSentAt(t === 'first' ? null : t === 'cooldown' ? now - (look.cooldown - 52) * 1000 : now - (look.cooldown + 1) * 1000);
  };
  useEffect(() => {
    if (state === 'focused') ref.current?.focus();
  }, [state]);
  const send = () => {
    setSentAt(now);
    setTiming('cooldown');
    // 보내면 초점을 칸으로 — 막히는 단추에 남지 않게
    requestAnimationFrame(() => ref.current?.focus());
  };
  const code_ = useMemo(() => {
    const fieldAttrs = [`label="${LABEL}"`, `description="${look.description}"`, ...(state === 'invalid' ? ['invalid', `errorMessage="${look.error}"`] : []), ...(state === 'disabled' ? ['disabled'] : [])];
    return [
      'import { Field } from "@/components/ui/field"',
      'import { InputOTP, InputOTPResend } from "@/components/ui/input-otp"',
      '',
      `<Field ${fieldAttrs.join(' ')}>`,
      `  <InputOTP id="withdraw-code" size="${size}" value={code} onValueChange={setCode} />`,
      '</Field>',
      `{/* 보낸 때 — ${timing === 'first' ? '아직 안 보냈으면 null("코드 받기")' : timing === 'cooldown' ? `${look.cooldown}초 안이면 "다시 받기(남은 초)" + 막힘` : `${look.cooldown}초가 지나면 "다시 받기"`} */}`,
      '<InputOTPResend className="mt-x3" sentAt={sentAt} codeInputId="withdraw-code" onResend={sendCode} />',
    ].join('\n');
  }, [look, size, state, timing]);
  const stage = (
    <div className="flex flex-col gap-4" style={{ fontFamily: FONT }}>
      <div>
        <OtpFieldView look={look} field={field} input={input} mode={mode} size={size} label={LABEL} value={code} onValue={setCode} invalid={state === 'invalid'} disabled={state === 'disabled'} inputRef={(el) => void (ref.current = el)} />
        <OtpResendView look={look} button={resend} mode={mode} kind={rs.kind} left={rs.left} live onClick={send} />
      </div>
      <div className="flex flex-col items-center gap-1.5 border-t border-fd-border pt-3">
        <span className="text-[12px] text-fd-muted-foreground">붙여 보기 — 칸에 붙인 것처럼 숫자만 뽑는다</span>
        <div className="flex flex-wrap justify-center gap-1">
          {PASTES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setCode(otpDigits(p, look.length));
                setPasted(p);
                ref.current?.focus();
              }}
              className="rounded-md border border-fd-border bg-fd-background px-2.5 py-1 text-[12px] text-fd-foreground hover:bg-fd-accent"
            >
              “{p}”
            </button>
          ))}
        </div>
        <span role="status" className="min-h-5 text-[12px] text-fd-muted-foreground">
          {pasted ? `“${pasted}” → ${otpDigits(pasted, look.length)}` : '진짜 클립보드로 붙여도 같다 — maxLength 로 먼저 자르지 않는다'}
        </span>
      </div>
    </div>
  );
  return (
    <PlayFrame
      surface={icv(surface, mode)}
      code={code_}
      stage={stage}
      controls={
        <>
          <Seg
            label="크기 size"
            value={size}
            options={[
              ['large', 'large 52 — 폰 · 앱'],
              ['medium', 'medium 40 — 1280 이상'],
            ]}
            onChange={setSize}
          />
          <Seg
            label="상태"
            value={state}
            options={[
              ['enabled', '기본'],
              ['focused', '포커스'],
              ['invalid', '오류'],
              ['disabled', '막힘'],
            ]}
            onChange={setState}
          />
          <Seg
            label="다시 받기의 때"
            value={timing}
            options={[
              ['first', '처음 — 코드 받기'],
              ['cooldown', '남은 초'],
              ['ready', '다시 받기'],
            ]}
            onChange={pickTiming}
          />
          <Seg
            label="시계"
            value={speed}
            options={[
              ['1', '1배'],
              ['10', '10배 — 빨리 돌리기'],
            ]}
            onChange={setSpeed}
          />
          <Seg label="모드" value={mode} options={MODES} onChange={setMode} />
        </>
      }
    />
  );
}

// ── 코드 미리보기 — 이용 해지 본인 확인(메일로 코드 받기) ─────
// 확인 — 6자리가 안 되면 "인증 코드 6자리를 입력해주세요.", 맞지 않으면 화면 글(서버 글 그대로가 아니다). 이 미리보기의 맞는 코드는 123456
export function OtpExDemo({ look, field, input, resend, cta, snack }: { look: OtpLook; field: TfFieldLook; input: TfInputLook; resend: ButtonLook; cta: ButtonLook; snack: SnackbarLook }) {
  const host = useSnackbarHost(snack);
  const s = snack.screen;
  const [code, setCode] = useState('');
  const [sentAt, setSentAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const now = useClock(true, 1);
  const ref = useRef<HTMLInputElement | null>(null);
  const rs = resendState(look, sentAt, now);
  const sendCode = () => {
    setSentAt(Date.now());
    host.show({ message: '메일로 코드를 보냈어요.' });
    requestAnimationFrame(() => ref.current?.focus());
  };
  const confirm = () => {
    if (code.length < look.length) {
      setError(`인증 코드 ${look.length}자리를 입력해주세요.`);
      ref.current?.focus();
      return;
    }
    if (code !== '123456') {
      setError(look.error);
      ref.current?.focus();
      return;
    }
    setError(null);
    setDone(true);
  };
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl bg-[#E9E9EC] p-4 dark:bg-fd-muted sm:p-6">
        <ScreenFrame
          screen={s}
          title="본인 확인"
          height={470}
          onBack={() => undefined}
          // 바닥 버튼 — 띠(스낵바)는 그 위에 뜬다
          bottom={
            <div style={{ padding: '12px 24px 24px' }}>
              <ButtonView look={cta} label={done ? '확인했어요' : '확인'} fill onClick={confirm} />
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', padding: '8px 24px 0', fontFamily: FONT }}>
            <p style={{ margin: '0 0 20px', fontSize: 15, lineHeight: '22px', color: icv(s['fg-neutral-subtle'], 'auto') }}>가입한 메일로 받은 인증 코드를 입력해주세요.</p>
            <OtpFieldView
              look={look}
              field={field}
              input={input}
              size="large"
              label={LABEL}
              value={code}
              onValue={(v) => {
                setCode(v);
                // 고치기 시작하면 설명 줄로 돌아온다
                setError(null);
                setDone(false);
              }}
              invalid={error !== null}
              error={error ?? undefined}
              inputRef={(el) => void (ref.current = el)}
            />
            <OtpResendView look={look} button={resend} kind={rs.kind} left={rs.left} live onClick={sendCode} />
            <span role="status" className="sr-only">
              {error ?? ''}
            </span>
          </div>
          <SnackbarRegion host={host} look={snack} />
        </ScreenFrame>
        <p className="m-0 mt-3 text-center text-[12px] leading-5 text-fd-muted-foreground">미리보기의 맞는 코드는 123456 — 6자리를 채워도 저절로 보내지 않아요.</p>
      </div>
    </figure>
  );
}
