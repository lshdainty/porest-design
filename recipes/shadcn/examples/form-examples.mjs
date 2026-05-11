/*
 * shadcn Form 예제 — react-hook-form 베이스. 정적 HTML preview는 form 시각만.
 */

const FORM_ITEM = "display:flex; flex-direction:column; gap:8px;";
const LABEL = "font-size:var(--text-label-md); font-weight:500; color:var(--color-text-primary);";
const INPUT_BASE = "flex h-10 w-full rounded-sm border border-border-default bg-surface-default px-3 py-2 text-title-sm text-text-primary";
const DESC = "font-size:var(--text-body-sm); line-height:var(--text-body-sm--line-height); color:var(--color-text-secondary);";
const ERROR = "font-size:var(--text-body-sm); font-weight:500; color:var(--color-error);";

const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors bg-primary text-text-on-accent shadow-sm hover:brightness-105 h-10 px-4 text-title-sm";

export const formExamples = [
  {
    title: "Default",
    description: "react-hook-form + zod 검증. FormField로 에러 메시지 자동 처리.",
    jsx: `const formSchema = z.object({
  username: z.string().min(2, {
    message: "사용자명은 2자 이상이어야 합니다.",
  }),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <Input placeholder="kim_jiwon" {...field} />
              </FormControl>
              <FormDescription>
                공개 프로필에 표시되는 이름입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">제출</Button>
      </form>
    </Form>
  )
}`,
    render: () => `<form style="width:320px; display:flex; flex-direction:column; gap:24px;">
  <div style="${FORM_ITEM}">
    <label style="${LABEL}">사용자명</label>
    <input class="${INPUT_BASE}" placeholder="kim_jiwon" />
    <p style="${DESC}">공개 프로필에 표시되는 이름입니다.</p>
  </div>
  <button type="submit" class="${BTN_PRIMARY}" style="align-self:flex-start;">제출</button>
</form>`,
  },

  {
    title: "Error state",
    description: "검증 실패 시 — label/border/메시지가 error 톤으로 변경.",
    jsx: `<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>이메일</FormLabel>
      <FormControl>
        <Input type="email" placeholder="kim@example.com" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`,
    render: () => `<div style="width:320px; display:flex; flex-direction:column; gap:8px;">
  <label style="${LABEL.replace("color:var(--color-text-primary)", "color:var(--color-error)")}">이메일</label>
  <input class="${INPUT_BASE}" style="border-color:var(--color-error); box-shadow:0 0 0 2px color-mix(in srgb, var(--color-error) 30%, transparent);" type="email" value="not-an-email" aria-invalid="true" />
  <p style="${ERROR}">올바른 이메일 형식이 아닙니다.</p>
</div>`,
  },
];
