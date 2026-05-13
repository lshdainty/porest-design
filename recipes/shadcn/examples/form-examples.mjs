/*
 * shadcn Form 예제 — form.md SoT 정합.
 * react-hook-form composition. preview `.form-*` 톤(form-card / form-grid / form-group / form-label / form-input / form-helper / form-message / form-actions).
 * 한국 도메인 3종(HR 결재 신청 form / Desk 메모 metadata form / 로그인 inline form with error).
 */

const CARD =
  "background:var(--color-surface-default); border-radius:var(--radius-lg); padding:var(--spacing-2xl); box-shadow:var(--shadow-sm); max-width:640px; display:flex; flex-direction:column; gap:var(--spacing-xl); font-family:inherit;";
const CARD_NARROW =
  "background:var(--color-surface-default); border-radius:var(--radius-lg); padding:var(--spacing-2xl); box-shadow:var(--shadow-sm); max-width:360px; display:flex; flex-direction:column; gap:var(--spacing-xl); font-family:inherit;";

const GRID = "display:grid; grid-template-columns:1fr 1fr; gap:var(--spacing-lg) var(--spacing-xl);";
const GRID_SINGLE = "display:flex; flex-direction:column; gap:var(--spacing-lg);";

const GROUP = "display:flex; flex-direction:column; gap:var(--spacing-xs);";
const GROUP_FULL = `${GROUP} grid-column:1 / -1;`;

const LABEL =
  "font-size:var(--text-label-md); line-height:var(--text-label-md--line-height); font-weight:500; color:var(--color-text-primary); display:flex; align-items:center; gap:var(--spacing-xs); line-height:1;";
const REQUIRED = "color:var(--color-error); font-weight:500;";

const INPUT_BASE =
  "background:var(--color-surface-input); color:var(--color-text-primary); border:1px solid var(--color-border-default); border-radius:var(--radius-sm); padding:var(--spacing-sm) var(--spacing-md); font-size:var(--text-body-md); line-height:1.6; min-height:40px; display:flex; align-items:center; font-family:inherit;";
const INPUT_READONLY = `${INPUT_BASE} color:var(--color-text-secondary); cursor:not-allowed;`;
const INPUT_ERROR = `${INPUT_BASE} border-color:var(--color-error); box-shadow:0 0 0 2px color-mix(in srgb, var(--color-error) 20%, transparent);`;
const SELECT = `${INPUT_BASE} justify-content:space-between; cursor:pointer;`;
const TEXTAREA = `${INPUT_BASE} align-items:flex-start; white-space:pre-wrap; min-height:96px;`;

const HELPER =
  "font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);";
const MESSAGE =
  "font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); font-weight:500; color:var(--color-error);";

const ACTIONS =
  "display:flex; justify-content:flex-end; gap:var(--spacing-md); padding-top:var(--spacing-lg); border-top:1px solid var(--color-border-default);";

const BTN_PRIMARY =
  "display:inline-flex; align-items:center; justify-content:center; gap:var(--spacing-sm); white-space:nowrap; border-radius:var(--radius-sm); font-weight:500; background:var(--color-primary, var(--color-text-primary)); color:var(--color-text-on-accent, #fff); box-shadow:var(--shadow-sm); height:40px; padding:0 var(--spacing-lg); font-size:var(--text-title-sm); border:0; cursor:pointer; font-family:inherit;";
const BTN_OUTLINE =
  "display:inline-flex; align-items:center; justify-content:center; gap:var(--spacing-sm); white-space:nowrap; border-radius:var(--radius-sm); font-weight:500; background:transparent; color:var(--color-text-primary); border:1px solid var(--color-border-default); height:40px; padding:0 var(--spacing-lg); font-size:var(--text-title-sm); cursor:pointer; font-family:inherit;";

const CARET =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-text-tertiary); flex-shrink:0;"><polyline points="6 9 12 15 18 9"/></svg>';

export const formExamples = [
  {
    title: "Card layout — HR 결재 신청 form",
    description:
      "HR 휴가/지출 결재 form — `form-card`(`surface-default` + `radius-lg` + `shadow-sm` + 640) 안에 `form-grid` 2-col. **신청자**(readonly, 자동 입력)·**카테고리**(select)·**금액**(input, required `*`)·**사유**(textarea, full-row 자동) + `form-actions`(border-top, 우측 정렬, [취소][제출]). preview `.form-*` SoT 정합.",
    jsx: `const schema = z.object({
  category: z.enum(["식비", "교통", "도서", "기타"]),
  amount: z.number().min(1, "금액을 입력하세요"),
  reason: z.string().min(5, "5자 이상 입력하세요"),
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="form-card">
    <div className="form-grid">
      <FormField control={form.control} name="applicant" render={({ field }) => (
        <FormItem>
          <FormLabel>신청자</FormLabel>
          <FormControl><Input readOnly value="김지원" {...field} /></FormControl>
        </FormItem>
      )} />
      <FormField control={form.control} name="category" render={({ field }) => (
        <FormItem>
          <FormLabel>카테고리 *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="선택" /></SelectTrigger></FormControl>
            <SelectContent>
              <SelectItem value="식비">식비</SelectItem>
              {/* … */}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="amount" render={({ field }) => (
        <FormItem>
          <FormLabel>금액 *</FormLabel>
          <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
          <FormDescription>VAT 포함 총액</FormDescription>
        </FormItem>
      )} />
      <FormField control={form.control} name="reason" render={({ field }) => (
        <FormItem className="col-span-full">
          <FormLabel>사유 *</FormLabel>
          <FormControl><Textarea rows={4} {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
    <div className="form-actions">
      <Button variant="outline" type="button">취소</Button>
      <Button type="submit">결재 요청</Button>
    </div>
  </form>
</Form>`,
    render: () => `<div style="${CARD}">
  <div style="${GRID}">
    <div style="${GROUP}">
      <div style="${LABEL}">신청자</div>
      <div style="${INPUT_READONLY}">김지원</div>
    </div>
    <div style="${GROUP}">
      <div style="${LABEL}">카테고리<span style="${REQUIRED}" aria-hidden="true">*</span></div>
      <div style="${SELECT}"><span>식비</span>${CARET}</div>
    </div>
    <div style="${GROUP}">
      <div style="${LABEL}">금액<span style="${REQUIRED}" aria-hidden="true">*</span></div>
      <div style="${INPUT_BASE}">28,500</div>
      <div style="${HELPER}">VAT 포함 총액</div>
    </div>
    <div style="${GROUP_FULL}">
      <div style="${LABEL}">사유<span style="${REQUIRED}" aria-hidden="true">*</span></div>
      <div style="${TEXTAREA}">팀 회식 결제 — 2026-05-12 (수)<br>참석자 5명, 식비 한도 내 집행</div>
    </div>
  </div>
  <div style="${ACTIONS}">
    <button style="${BTN_OUTLINE}" type="button">취소</button>
    <button style="${BTN_PRIMARY}" type="submit">결재 요청</button>
  </div>
</div>`,
  },

  {
    title: "Card layout — Desk 메모 metadata form",
    description:
      "Desk 메모 작성 form — 제목(input)·태그(select)·우선순위(select)·내용(textarea full-row). **textarea가 있는 group은 자동 full-row**(`has-[.form-textarea]:col-span-full`). FormDescription(`text-body-sm secondary`)으로 추가 안내. 한 PR에서 정의 → 사용자가 즉시 검증 가능한 시각.",
    jsx: `const schema = z.object({
  title: z.string().min(1, "제목 필수"),
  tag: z.enum(["일상", "아이디어", "할일", "참고"]).optional(),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  body: z.string().min(1, "내용 필수"),
})

<FormField control={form.control} name="title" render={({ field }) => (
  <FormItem>
    <FormLabel>제목 *</FormLabel>
    <FormControl><Input placeholder="메모 제목" {...field} /></FormControl>
  </FormItem>
)} />
{/* tag / priority Select */}
<FormField control={form.control} name="body" render={({ field }) => (
  <FormItem className="col-span-full">
    <FormLabel>내용</FormLabel>
    <FormControl><Textarea rows={6} {...field} /></FormControl>
    <FormDescription>Markdown 지원 — 코드블록, 링크, 굵게</FormDescription>
  </FormItem>
)} />`,
    render: () => `<div style="${CARD}">
  <div style="${GRID}">
    <div style="${GROUP_FULL}">
      <div style="${LABEL}">제목<span style="${REQUIRED}" aria-hidden="true">*</span></div>
      <div style="${INPUT_BASE}">2026 Q2 디자인 시스템 회고</div>
    </div>
    <div style="${GROUP}">
      <div style="${LABEL}">태그</div>
      <div style="${SELECT}"><span>아이디어</span>${CARET}</div>
    </div>
    <div style="${GROUP}">
      <div style="${LABEL}">우선순위</div>
      <div style="${SELECT}"><span>중간</span>${CARET}</div>
    </div>
    <div style="${GROUP_FULL}">
      <div style="${LABEL}">내용</div>
      <div style="${TEXTAREA}">- shadcn 기반 토큰화 거의 마무리<br>- Form 컴포넌트가 마지막 — composition pattern 시각화 필요<br>- HR/Desk 듀얼 브랜드 유지하며 spec 표준화</div>
      <div style="${HELPER}">Markdown 지원 — 코드블록, 링크, 굵게</div>
    </div>
  </div>
  <div style="${ACTIONS}">
    <button style="${BTN_OUTLINE}" type="button">임시 저장</button>
    <button style="${BTN_PRIMARY}" type="submit">메모 저장</button>
  </div>
</div>`,
  },

  {
    title: "Inline layout + error state — 로그인 form",
    description:
      "좁은 form(360 max) inline — 단일 column. **이메일** field에 error(`text-error` border + ring + FormMessage `text-body-sm font-medium text-error`). **비밀번호** field는 정상. `aria-invalid=\"true\"` + FormMessage `role=\"alert\"` 자동 wire. 검증은 `mode: \"onBlur\"` 권장(타이핑 중 깜빡임 방지).",
    jsx: `const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(8, "비밀번호는 8자 이상"),
})

const form = useForm({
  resolver: zodResolver(schema),
  mode: "onBlur",
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onLogin)} className="form-card">
    <FormField control={form.control} name="email" render={({ field }) => (
      <FormItem>
        <FormLabel>이메일 *</FormLabel>
        <FormControl><Input type="email" placeholder="user@porest.com" {...field} /></FormControl>
        <FormMessage />  {/* zod message 자동 */}
      </FormItem>
    )} />
    <FormField control={form.control} name="password" render={({ field }) => (
      <FormItem>
        <FormLabel>비밀번호 *</FormLabel>
        <FormControl><Input type="password" {...field} /></FormControl>
      </FormItem>
    )} />
    <Button type="submit" className="w-full">로그인</Button>
  </form>
</Form>`,
    render: () => `<div style="${CARD_NARROW}">
  <div style="${GRID_SINGLE}">
    <div style="${GROUP}">
      <div style="${LABEL.replace('color:var(--color-text-primary)', 'color:var(--color-error)')}">이메일<span style="${REQUIRED}" aria-hidden="true">*</span></div>
      <div style="${INPUT_ERROR}" aria-invalid="true">user@porest</div>
      <p style="${MESSAGE}" role="alert">올바른 이메일 형식이 아닙니다</p>
    </div>
    <div style="${GROUP}">
      <div style="${LABEL}">비밀번호<span style="${REQUIRED}" aria-hidden="true">*</span></div>
      <div style="${INPUT_BASE}">••••••••</div>
    </div>
  </div>
  <button style="${BTN_PRIMARY} width:100%;" type="submit">로그인</button>
</div>`,
  },
];
