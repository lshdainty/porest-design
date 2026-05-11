# Porest Design — Component Usage Examples

`DESIGN.md` (baseline) / `DESIGN.hr.md` / `DESIGN.desk.md`에 정의된 토큰·컴포넌트 spec을 **실제 코드로 사용하는 예시**. spec 정의는 *what / why*, 본 문서는 *how*.

- 토큰 export: `npm run export:tailwind:all` → `exports/tokens.css` / `tokens.hr.css` / `tokens.desk.css`. Tailwind v4 `@theme` CSS variable로 export.
- 사용 패턴: HTML markup + Tailwind v4 utility class. CSS variable 직접 사용도 가능 (`var(--color-primary)`).
- 브랜드 전환: `<html data-theme="dark">` (다크), `<html dir="rtl">` (RTL — v76 logical property 자동 mirror).

## 목차
1. [Button](#button)
2. [Input / Textarea](#input--textarea)
3. [Select / Combobox](#select--combobox)
4. [Checkbox / Radio / Switch](#checkbox--radio--switch)
5. [Card](#card)
6. [Badge / Tag / Chip](#badge--tag--chip)
7. [Banner](#banner)
8. [Toast / Sonner](#toast--sonner)
9. [Modal / Dialog](#modal--dialog)
10. [Drawer / Sheet](#drawer--sheet)
11. [Tabs](#tabs)
12. [Accordion / Collapsible](#accordion--collapsible)
13. [Tooltip / Popover / Hover Card](#tooltip--popover--hover-card)
14. [Dropdown / Context Menu](#dropdown--context-menu)
15. [Skeleton / Spinner / Progress](#skeleton--spinner--progress)
16. [Pagination / Stepper](#pagination--stepper)
17. [Avatar](#avatar)
18. [Breadcrumb / Sidebar](#breadcrumb--sidebar)
19. [Form layout + validation](#form-layout--validation)
20. [Calendar / Date Range Picker](#calendar--date-range-picker)
21. [Treeview](#treeview)
22. [File Upload](#file-upload)
23. [Empty state](#empty-state)
24. [Animation patterns](#animation-patterns)

---

## Button

```html
<div class="flex flex-wrap items-center gap-3">
  <button class="bg-primary text-on-accent px-4 py-2 rounded-md text-body-lg shadow-sm hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
    결재 승인
  </button>
  <button class="bg-transparent text-primary border border-primary px-4 py-2 rounded-md text-body-lg hover:bg-surface-default-hover transition-colors">
    반려
  </button>
  <button class="bg-transparent text-text-primary px-3 py-2 rounded-md text-body-lg hover:bg-surface-default-hover transition-colors">
    취소
  </button>
  <button class="bg-error text-on-accent px-4 py-2 rounded-md text-body-lg shadow-sm hover:opacity-90 transition-opacity">
    삭제
  </button>
</div>
```

Variants — Primary (default), Outlined, Ghost, Destructive (error 색).

```html
<div class="flex items-center gap-3">
  <button class="bg-primary text-on-accent text-caption px-3 py-1.5 rounded-md shadow-sm hover:opacity-90 transition-opacity">sm</button>
  <button class="bg-primary text-on-accent text-body-lg px-4 py-2 rounded-md shadow-sm hover:opacity-90 transition-opacity">md (default)</button>
  <button class="bg-primary text-on-accent text-body-lg px-5 py-3 rounded-md shadow-sm hover:opacity-90 transition-opacity">lg</button>
</div>
```

Sizes — `sm` (보조 / dense), `md` (default), `lg` (모바일 primary, 44×44 WCAG 2.5.5 AAA 권장).

```html
<div class="flex flex-wrap items-center gap-3">
  <button class="bg-primary text-on-accent px-4 py-2 rounded-md text-body-lg shadow-sm" disabled aria-busy="true">
    <span class="inline-block w-4 h-4 border-2 border-on-accent border-t-transparent rounded-full animate-spin mr-2"></span>
    저장 중...
  </button>
  <button class="bg-primary text-on-accent px-4 py-2 rounded-md text-body-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
    비활성
  </button>
  <button class="bg-primary text-on-accent px-4 py-2 rounded-md text-body-lg shadow-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
    추가
  </button>
</div>
```

States — Loading (`aria-busy`), Disabled, With icon. Touch target: `lg` 권장 (44×44 WCAG 2.5.5 AAA), 모바일 primary action 우선.

---

## Input / Textarea

```html
<div class="flex flex-col gap-1 max-w-md">
  <label for="email" class="text-caption text-secondary">이메일 <span class="text-error">*</span></label>
  <input
    id="email"
    type="email"
    inputmode="email"
    aria-required="true"
    aria-describedby="email-helper"
    class="px-3 py-2 rounded-md border border-default bg-surface-input text-text-primary text-body-lg focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20 transition-colors"
    placeholder="hello@porest.app"
  />
  <span id="email-helper" class="text-caption text-tertiary">로그인 시 사용됩니다</span>
</div>
```

Default — label + required mark + helper text. `inputmode="email"` 모바일 키보드 최적화.

```html
<div class="flex flex-col gap-1 max-w-md">
  <label for="email-bad" class="text-caption text-secondary">이메일</label>
  <input
    id="email-bad"
    type="email"
    aria-invalid="true"
    aria-describedby="email-bad-error"
    value="hello@porest"
    class="px-3 py-2 rounded-md border border-error bg-surface-input text-text-primary text-body-lg focus:outline-none focus:ring-2 focus:ring-error/20"
  />
  <span id="email-bad-error" role="alert" class="text-caption text-error">올바른 이메일 주소를 입력해주세요</span>
</div>
```

Invalid — `aria-invalid="true"` + error border + `role="alert"` live region.

```html
<div class="flex flex-col gap-1 max-w-md">
  <label for="memo" class="text-caption text-secondary">메모</label>
  <textarea
    id="memo"
    maxlength="550"
    rows="4"
    class="px-3 py-2 rounded-md border border-default bg-surface-input text-text-primary text-body-lg resize-y focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
    placeholder="자유롭게 입력하세요"
  ></textarea>
  <span class="text-caption text-tertiary self-end">0 / 550</span>
</div>
```

Textarea — max-length + counter (Desk 메모 550자 제한 등).

---

## Select / Combobox

```html
<!-- Native Select -->
<div class="flex flex-col gap-1">
  <label for="cat" class="text-caption text-secondary">카테고리</label>
  <select id="cat" class="px-3 py-2 rounded-md border border-default bg-surface-input text-text-primary text-body-lg">
    <option value="">선택하세요</option>
    <option value="food">식비</option>
    <option value="transport">교통</option>
  </select>
</div>

<!-- Combobox (custom, ARIA) -->
<div class="flex flex-col gap-1 relative">
  <label for="cb" class="text-caption text-secondary">검색</label>
  <input
    id="cb"
    role="combobox"
    aria-expanded="true"
    aria-controls="cb-list"
    aria-autocomplete="list"
    class="px-3 py-2 rounded-md border border-default bg-surface-input"
  />
  <ul id="cb-list" role="listbox" class="absolute top-full mt-1 w-full bg-surface-default border border-default rounded-md shadow-md py-1 z-dropdown">
    <li role="option" aria-selected="true" class="px-3 py-2 text-body-lg bg-surface-default-hover">홍길동 (HR-2026-0001)</li>
    <li role="option" class="px-3 py-2 text-body-lg hover:bg-surface-default-hover">김철수 (HR-2026-0002)</li>
  </ul>
</div>
```

---

## Checkbox / Radio / Switch

```html
<!-- Checkbox -->
<label class="inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" class="w-5 h-5 rounded-sm border border-default checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-focus/20" />
  <span class="text-body-lg text-text-primary">개인정보 처리방침에 동의합니다</span>
</label>

<!-- Radio group -->
<fieldset class="flex flex-col gap-2">
  <legend class="text-caption text-secondary mb-1">우선순위</legend>
  <label class="inline-flex items-center gap-2 cursor-pointer">
    <input type="radio" name="priority" value="urgent" class="w-5 h-5 border border-default checked:bg-primary checked:border-primary" />
    <span class="text-body-lg">긴급</span>
  </label>
  <label class="inline-flex items-center gap-2 cursor-pointer">
    <input type="radio" name="priority" value="normal" class="w-5 h-5 border border-default checked:bg-primary checked:border-primary" checked />
    <span class="text-body-lg">보통</span>
  </label>
</fieldset>

<!-- Switch (button + role) -->
<button
  role="switch"
  aria-checked="true"
  class="relative w-11 h-6 rounded-full bg-primary transition-colors data-[state=off]:bg-surface-input"
>
  <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-on-accent shadow-sm transition-transform translate-x-5 data-[state=off]:translate-x-0"></span>
</button>
```

---

## Card

```html
<article class="bg-surface-default border border-default rounded-lg shadow-sm p-4 flex flex-col gap-3 max-w-md">
  <header class="flex items-start justify-between">
    <h3 class="text-title-sm text-text-primary">2026-05-10 점심</h3>
    <span class="text-caption text-tertiary">5분 전</span>
  </header>
  <p class="text-body-lg text-text-primary">홍길동 / 김영희 / 박민수</p>
  <footer class="flex justify-end gap-2 pt-2 border-t border-default">
    <button class="text-caption text-secondary px-3 py-1.5 rounded-sm hover:bg-surface-default-hover transition-colors">편집</button>
    <button class="text-caption text-error px-3 py-1.5 rounded-sm hover:bg-error/5 transition-colors">삭제</button>
  </footer>
</article>
```

Basic — 헤더 (제목 + 메타) + 본문 + 푸터 (액션). `radius-lg` (12px) 카드 default.

```html
<div class="grid grid-cols-3 gap-4 max-w-3xl">
  <article class="bg-surface-default border border-default rounded-lg shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer">
    <span class="text-label-sm text-tertiary uppercase">메모</span>
    <h3 class="text-title-sm text-text-primary">회의 요약</h3>
    <p class="text-caption text-secondary">Q2 OKR 정의, 우선순위 정리, 다음 주까지 owner 지정.</p>
  </article>
  <article class="bg-surface-default border border-default rounded-lg shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer">
    <span class="text-label-sm text-tertiary uppercase">할일</span>
    <h3 class="text-title-sm text-text-primary">디자인 리뷰</h3>
    <p class="text-caption text-secondary">컴포넌트 라이브러리 v2 스펙 검토 + 피드백 수렴.</p>
  </article>
  <article class="bg-surface-default border border-default rounded-lg shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer">
    <span class="text-label-sm text-tertiary uppercase">가계부</span>
    <h3 class="text-title-sm text-text-primary">5월 지출</h3>
    <p class="text-caption text-secondary">총 ₩1,284,500 — 식비 32% / 교통 14% / 주거 41% / 기타 13%.</p>
  </article>
</div>
```

Card grid — 3열 그리드, hover 시 `shadow-md` lift. Desk 카드 list 톤.

---

## Badge / Tag / Chip

```html
<!-- Badge (정적, status indicator) -->
<span class="inline-flex items-center px-2 py-0.5 rounded-sm text-label-sm bg-success/10 text-success">완료</span>
<span class="inline-flex items-center px-2 py-0.5 rounded-sm text-label-sm bg-warning/10 text-warning">대기</span>
<span class="inline-flex items-center px-2 py-0.5 rounded-sm text-label-sm bg-error/10 text-error">반려</span>

<!-- Tag / Chip (closeable) -->
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption bg-surface-default-hover text-text-primary">
  #업무
  <button aria-label="태그 제거" class="w-4 h-4 rounded-full hover:bg-surface-input flex items-center justify-center">×</button>
</span>

<!-- Tag input (multi) -->
<div class="flex flex-wrap items-center gap-1.5 px-2 py-1.5 rounded-md border border-default bg-surface-input min-h-9 focus-within:border-focus focus-within:ring-2 focus-within:ring-focus/20">
  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption bg-primary/10 text-primary">
    #2026 <button aria-label="제거">×</button>
  </span>
  <input type="text" class="flex-1 bg-transparent border-0 outline-none text-body-lg min-w-32" placeholder="태그 입력 후 Enter" />
</div>
```

---

## Banner

```html
<div role="status" class="flex items-start gap-3 p-4 bg-info/10 border-l-4 border-info rounded-r-md">
  <svg aria-hidden="true" class="w-5 h-5 text-info flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
  <div class="flex-1">
    <p class="text-body-lg text-text-primary">시스템 점검 안내</p>
    <p class="text-caption text-secondary mt-1">2026-05-15 23:00 ~ 24:00 동기화 일시 중단됩니다.</p>
  </div>
  <button aria-label="배너 닫기" class="w-8 h-8 rounded-md hover:bg-surface-default-hover transition-colors">×</button>
</div>
```

Info — 시스템 안내, 시각 (`rounded-r-md` 좌측 stripe + 우측 둥글기).

```html
<div role="alert" class="flex items-start gap-3 p-4 bg-warning/10 border-l-4 border-warning rounded-r-md">
  <svg aria-hidden="true" class="w-5 h-5 text-warning flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
  <p class="text-body-lg">2026-06-01부터 개인정보 처리방침이 변경됩니다.</p>
</div>
```

Warning — 약관 변경, sticky 영구 노출.

```html
<div role="alert" class="flex items-start gap-3 p-4 bg-error/10 border-l-4 border-error rounded-r-md">
  <svg aria-hidden="true" class="w-5 h-5 text-error flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
  <p class="text-body-lg">결재 시스템 일시 장애 — 09:30 정상화 예정.</p>
</div>
```

Error — critical 알림, 즉시 발화 (`role="alert"`).

---

## Toast / Sonner

```html
<div role="status" aria-live="polite" class="max-w-sm bg-surface-default border border-default rounded-md shadow-lg p-4 flex items-start gap-3">
  <svg aria-hidden="true" class="w-5 h-5 text-success flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
  <div class="flex-1">
    <p class="text-body-lg">저장되었습니다</p>
    <p class="text-caption text-secondary mt-0.5">메모 #2026-05-10</p>
  </div>
  <button class="text-caption text-primary hover:underline">실행 취소</button>
</div>
```

Single Toast — `role="status"` + `aria-live="polite"`. 실제 사용 시 `class="fixed bottom-4 right-4 z-toast"` 추가.

```html
<ol class="flex flex-col gap-2 max-w-sm list-none p-0 m-0" role="region" aria-label="알림">
  <li class="bg-surface-default border border-default rounded-md shadow-lg p-3">
    <p class="text-body-lg">결재 승인 완료</p>
    <p class="text-caption text-secondary mt-0.5">홍길동 휴가 신청 (5/12-5/14)</p>
  </li>
  <li class="bg-surface-default border border-default rounded-md shadow-lg p-3">
    <p class="text-body-lg">2건 더 승인 대기</p>
  </li>
  <li class="bg-surface-default border border-default rounded-md shadow-lg p-3">
    <p class="text-body-lg">새 결재 요청</p>
    <p class="text-caption text-secondary mt-0.5">김철수 — 평가 코멘트</p>
  </li>
</ol>
```

Sonner stack — top-right (HR) / bottom-center (Desk 모바일) 위치. 실제 사용 시 `class="fixed top-4 right-4 z-toast"` 추가, max 3 + collapsed +N 패턴.

---

## Modal / Dialog

```html
<div class="relative bg-overlay-dim p-8 rounded-md min-h-64 flex items-center justify-center">
  <div role="dialog" aria-modal="true" aria-labelledby="dialog-title" class="bg-surface-default rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
    <h2 id="dialog-title" class="text-display-sm text-text-primary">메모를 삭제하시겠습니까?</h2>
    <p class="text-body-lg text-secondary">삭제된 메모는 복구할 수 없습니다. 신중히 확인해주세요.</p>
    <footer class="flex justify-end gap-2 pt-2">
      <button class="bg-transparent text-text-primary px-4 py-2 rounded-md hover:bg-surface-default-hover transition-colors">취소</button>
      <button class="bg-error text-on-accent px-4 py-2 rounded-md hover:opacity-90 transition-opacity">삭제</button>
    </footer>
  </div>
</div>
```

Confirm dialog — `role="dialog"` + `aria-modal="true"` + `aria-labelledby`. 실제 사용 시 overlay는 `class="fixed inset-0 z-modal"`, dialog는 `class="fixed inset-0 z-modal flex items-center justify-center"`.

```html
<div class="relative bg-overlay-dim p-8 rounded-md min-h-64 flex items-center justify-center">
  <form class="bg-surface-default rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4" role="dialog" aria-modal="true" aria-labelledby="form-dialog-title">
    <h2 id="form-dialog-title" class="text-display-sm text-text-primary">새 폴더</h2>
    <div class="flex flex-col gap-1">
      <label for="folder-name" class="text-caption text-secondary">이름</label>
      <input id="folder-name" type="text" class="px-3 py-2 rounded-md border border-default bg-surface-input text-body-lg focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20" placeholder="2026 회의록" />
    </div>
    <footer class="flex justify-end gap-2 pt-2">
      <button type="button" class="bg-transparent text-text-primary px-4 py-2 rounded-md hover:bg-surface-default-hover transition-colors">취소</button>
      <button type="submit" class="bg-primary text-on-accent px-4 py-2 rounded-md hover:opacity-90 transition-opacity">생성</button>
    </footer>
  </form>
</div>
```

Form dialog — input/select 등 form control 포함. submit 핸들러 + Escape close.

A11y: focus trap (Tab/Shift+Tab 내부 순환), Escape 닫기, 닫힌 후 trigger element로 focus 복원.

---

## Drawer / Sheet

```html
<div class="relative bg-overlay-dim p-0 rounded-md min-h-80 overflow-hidden flex justify-end">
  <aside role="dialog" aria-modal="true" class="w-80 bg-surface-default border-l border-default shadow-xl flex flex-col">
    <header class="flex items-center justify-between p-4 border-b border-default">
      <h2 class="text-title-sm">홍길동 (HR-2026-0001)</h2>
      <button aria-label="닫기" class="w-8 h-8 rounded-md hover:bg-surface-default-hover transition-colors">×</button>
    </header>
    <div class="p-4 flex flex-col gap-3 flex-1">
      <div class="flex flex-col gap-1">
        <span class="text-label-sm text-tertiary">부서</span>
        <span class="text-body-lg">개발본부 / 프론트팀</span>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-label-sm text-tertiary">직급</span>
        <span class="text-body-lg">시니어 엔지니어</span>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-label-sm text-tertiary">이메일</span>
        <span class="text-body-lg">hong@porest.app</span>
      </div>
    </div>
  </aside>
</div>
```

Right drawer (HR — 직원 detail) — 우측 슬라이드. 실제 사용 시 `class="fixed top-0 right-0 bottom-0 z-drawer"` + `animate-[slide-in-left]` 추가.

```html
<div class="relative bg-overlay-dim p-0 rounded-md min-h-80 overflow-hidden flex flex-col justify-end">
  <div role="dialog" aria-modal="true" class="bg-surface-default rounded-t-xl shadow-xl">
    <header class="flex justify-center p-2"><div class="w-10 h-1 bg-surface-input rounded-full"></div></header>
    <div class="p-4 flex flex-col gap-3">
      <h2 class="text-title-sm">거래 추가</h2>
      <div class="flex flex-col gap-1">
        <label for="amount" class="text-caption text-secondary">금액</label>
        <input id="amount" type="text" inputmode="numeric" class="px-3 py-2 rounded-md border border-default bg-surface-input text-body-lg" placeholder="₩0" />
      </div>
      <button class="bg-primary text-on-accent px-4 py-3 rounded-md text-body-lg hover:opacity-90 transition-opacity">저장</button>
    </div>
  </div>
</div>
```

Bottom sheet (Desk — 거래 입력) — 하단 슬라이드 업. 모바일 친화. `radius-xl` 상단만, swipe-down close, `safe-area-inset-bottom` 고려.

---

## Tabs

```html
<!-- Underline (HR 절제 톤) -->
<div role="tablist" class="flex border-b border-default">
  <button role="tab" aria-selected="true" aria-controls="panel-1" class="px-4 py-3 text-body-lg text-primary border-b-2 border-primary -mb-px">
    결재 대기
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" class="px-4 py-3 text-body-lg text-secondary hover:text-text-primary">
    완료
  </button>
</div>
<div role="tabpanel" id="panel-1" tabindex="0" class="p-4"><!-- content --></div>

<!-- Pills (Desk 모바일 친화) -->
<div role="tablist" class="inline-flex bg-surface-input rounded-full p-1 gap-1">
  <button role="tab" aria-selected="true" class="px-4 py-1.5 text-caption rounded-full bg-surface-default text-primary shadow-sm">전체</button>
  <button role="tab" aria-selected="false" class="px-4 py-1.5 text-caption text-secondary">진행 중</button>
  <button role="tab" aria-selected="false" class="px-4 py-1.5 text-caption text-secondary">완료</button>
</div>
```

---

## Accordion / Collapsible

```html
<div class="border border-default rounded-md divide-y divide-default">
  <details class="group">
    <summary class="flex items-center justify-between p-4 cursor-pointer text-body-lg">
      자주 묻는 질문 1
      <svg class="w-5 h-5 transition-transform group-open:rotate-180"><!-- chevron --></svg>
    </summary>
    <div class="px-4 pb-4 text-body-lg text-secondary">답변 본문...</div>
  </details>
  <details class="group">
    <summary class="flex items-center justify-between p-4 cursor-pointer text-body-lg">
      자주 묻는 질문 2
    </summary>
    <div class="px-4 pb-4 text-body-lg text-secondary">답변 본문...</div>
  </details>
</div>
```

---

## Tooltip / Popover / Hover Card

```html
<div class="flex items-start gap-12 p-6">
  <div class="relative inline-block">
    <button aria-describedby="tip-1" class="w-9 h-9 rounded-full bg-surface-input text-text-primary text-body-lg hover:bg-surface-default-hover transition-colors">i</button>
    <div id="tip-1" role="tooltip" class="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-text-primary text-on-accent text-caption px-2 py-1 rounded-sm pointer-events-none whitespace-nowrap">
      단축키 ⌘K
    </div>
  </div>
</div>
```

Tooltip — delayed hover, terse 텍스트. `aria-describedby` 연결 + `role="tooltip"`.

```html
<div class="relative inline-block">
  <button aria-haspopup="dialog" aria-expanded="true" class="bg-surface-input text-text-primary px-3 py-2 rounded-md text-caption inline-flex items-center gap-1 hover:bg-surface-default-hover transition-colors">
    결재 의견 ▾
  </button>
  <div role="dialog" class="absolute top-full mt-2 w-80 bg-surface-default border border-default rounded-md shadow-md p-4">
    <textarea class="w-full px-3 py-2 rounded-md border border-default bg-surface-input text-body-lg resize-none" rows="3" placeholder="의견을 입력하세요"></textarea>
    <div class="flex justify-end gap-2 mt-2">
      <button class="text-caption px-3 py-1.5 text-text-primary hover:bg-surface-default-hover rounded-sm transition-colors">취소</button>
      <button class="bg-primary text-on-accent text-caption px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">제출</button>
    </div>
  </div>
</div>
```

Popover — interactive content, click trigger. `aria-haspopup="dialog"` + `aria-expanded`.

```html
<div class="relative inline-block">
  <a href="#" class="text-primary underline">@홍길동</a>
  <div role="tooltip" class="absolute top-full mt-2 left-0 bg-surface-default border border-default rounded-md shadow-md p-3 w-64">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center text-body-lg">홍</div>
      <div>
        <p class="text-body-lg">홍길동</p>
        <p class="text-caption text-tertiary">HR Team</p>
      </div>
    </div>
  </div>
</div>
```

Hover Card — non-interactive preview. delay 700ms hover, link/avatar에 mention.

---

## Dropdown / Context Menu

```html
<div class="relative inline-block">
  <button aria-haspopup="menu" aria-expanded="true" class="w-9 h-9 rounded-md hover:bg-surface-default-hover text-text-primary text-body-lg transition-colors">⋯</button>
  <ul role="menu" class="absolute top-full mt-1 right-0 min-w-40 bg-surface-default border border-default rounded-md shadow-md py-1 z-dropdown list-none">
    <li role="menuitem" class="px-3 py-2 text-body-lg hover:bg-surface-default-hover cursor-pointer">편집</li>
    <li role="menuitem" class="px-3 py-2 text-body-lg hover:bg-surface-default-hover cursor-pointer">복제</li>
    <li role="separator" class="border-t border-default my-1"></li>
    <li role="menuitem" class="px-3 py-2 text-body-lg text-error hover:bg-error/5 cursor-pointer">삭제</li>
  </ul>
</div>
```

키보드: Arrow Up/Down navigate, Enter activate, Escape close, Tab close + focus next.

---

## Skeleton / Spinner / Progress

```html
<!-- Skeleton row -->
<div class="space-y-3" aria-busy="true" aria-label="로딩 중">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-surface-input animate-pulse"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 w-1/3 bg-surface-input rounded animate-pulse"></div>
      <div class="h-3 w-1/2 bg-surface-input rounded animate-pulse"></div>
    </div>
  </div>
</div>

<!-- Spinner -->
<div role="status" aria-label="저장 중" class="inline-flex items-center gap-2">
  <span class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
  <span class="text-caption text-secondary">저장 중...</span>
</div>

<!-- Progress bar (determinate) -->
<div class="space-y-1">
  <div class="flex justify-between text-caption">
    <span>업로드 중</span>
    <span>67%</span>
  </div>
  <div role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" class="h-2 bg-surface-input rounded-full overflow-hidden">
    <div class="h-full bg-primary transition-[width] duration-300" style="width: 67%"></div>
  </div>
</div>
```

---

## Pagination / Stepper

```html
<!-- Pagination -->
<nav role="navigation" aria-label="페이지" class="inline-flex items-center gap-1">
  <button aria-label="이전" class="w-9 h-9 rounded-md hover:bg-surface-default-hover" disabled>‹</button>
  <button aria-current="page" class="w-9 h-9 rounded-md bg-primary text-on-accent text-caption">1</button>
  <button class="w-9 h-9 rounded-md hover:bg-surface-default-hover text-caption">2</button>
  <button class="w-9 h-9 rounded-md hover:bg-surface-default-hover text-caption">3</button>
  <span aria-hidden="true">…</span>
  <button class="w-9 h-9 rounded-md hover:bg-surface-default-hover text-caption">10</button>
  <button aria-label="다음" class="w-9 h-9 rounded-md hover:bg-surface-default-hover">›</button>
</nav>

<!-- Stepper -->
<ol class="flex items-center gap-2" aria-label="진행 단계">
  <li class="flex items-center gap-2 text-primary">
    <span class="w-7 h-7 rounded-full bg-primary text-on-accent flex items-center justify-center text-caption">✓</span>
    <span class="text-body-lg">계정 정보</span>
  </li>
  <li class="w-8 h-px bg-default"></li>
  <li aria-current="step" class="flex items-center gap-2 text-primary">
    <span class="w-7 h-7 rounded-full bg-primary text-on-accent flex items-center justify-center text-caption">2</span>
    <span class="text-body-lg">프로필 설정</span>
  </li>
  <li class="w-8 h-px bg-default"></li>
  <li class="flex items-center gap-2 text-tertiary">
    <span class="w-7 h-7 rounded-full bg-surface-input text-secondary flex items-center justify-center text-caption">3</span>
    <span class="text-body-lg">완료</span>
  </li>
</ol>
```

---

## Avatar

```html
<!-- Image -->
<img src="..." alt="홍길동" class="w-10 h-10 rounded-full object-cover" />

<!-- Initials fallback -->
<div aria-hidden="true" class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-body-lg">홍</div>

<!-- Stack -->
<div class="flex -space-x-2">
  <img class="w-8 h-8 rounded-full ring-2 ring-surface-default" alt="" />
  <img class="w-8 h-8 rounded-full ring-2 ring-surface-default" alt="" />
  <div class="w-8 h-8 rounded-full bg-surface-input text-secondary text-label-sm flex items-center justify-center ring-2 ring-surface-default">+5</div>
</div>
```

---

## Breadcrumb / Sidebar

```html
<!-- Breadcrumb -->
<nav aria-label="경로" class="text-caption">
  <ol class="flex items-center gap-1">
    <li><a href="/" class="text-secondary hover:text-text-primary">홈</a></li>
    <li aria-hidden="true" class="text-tertiary">/</li>
    <li><a href="/hr" class="text-secondary hover:text-text-primary">HR</a></li>
    <li aria-hidden="true" class="text-tertiary">/</li>
    <li aria-current="page" class="text-text-primary">결재 대기</li>
  </ol>
</nav>

<!-- Sidebar -->
<aside class="w-60 h-screen bg-surface-default border-r border-default flex flex-col">
  <header class="p-4 border-b border-default">
    <h1 class="text-title-sm text-primary">Porest HR</h1>
  </header>
  <nav class="flex-1 p-2 overflow-y-auto">
    <ul class="flex flex-col gap-0.5">
      <li><a href="..." aria-current="page" class="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary text-body-lg">결재</a></li>
      <li><a href="..." class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-default-hover text-body-lg">직원</a></li>
      <li><a href="..." class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-default-hover text-body-lg">평가</a></li>
    </ul>
  </nav>
</aside>
```

---

## Form layout + validation

```html
<form class="max-w-lg flex flex-col gap-6" novalidate>
  <section class="flex flex-col gap-4">
    <h2 class="text-title-sm">계정 정보</h2>

    <!-- field group -->
    <div class="flex flex-col gap-1">
      <label for="email" class="text-caption text-secondary">이메일 <span class="text-error" aria-hidden="true">*</span></label>
      <input id="email" type="email" required aria-required="true" aria-describedby="email-helper" class="px-3 py-2 rounded-md border border-default bg-surface-input" />
      <span id="email-helper" class="text-caption text-tertiary">로그인 시 사용됩니다</span>
    </div>

    <div class="flex flex-col gap-1">
      <label for="pw" class="text-caption text-secondary">비밀번호 <span class="text-error" aria-hidden="true">*</span></label>
      <input id="pw" type="password" required aria-required="true" minlength="8" class="px-3 py-2 rounded-md border border-default bg-surface-input" />
      <span class="text-caption text-tertiary">8자 이상, 영문+숫자 포함</span>
    </div>

    <div class="flex flex-col gap-1">
      <label for="pw2" class="text-caption text-secondary">비밀번호 재입력 <span class="text-error" aria-hidden="true">*</span></label>
      <input id="pw2" type="password" required aria-invalid="true" aria-describedby="pw2-error" class="px-3 py-2 rounded-md border border-error bg-surface-input" />
      <span id="pw2-error" role="alert" class="text-caption text-error">비밀번호가 일치하지 않습니다</span>
    </div>
  </section>

  <footer class="flex justify-end gap-2 pt-4 border-t border-default">
    <button type="button" class="px-4 py-2 rounded-md text-text-primary hover:bg-surface-default-hover">취소</button>
    <button type="submit" class="px-5 py-2 rounded-md bg-primary text-on-accent text-body-lg shadow-sm">가입하기</button>
  </footer>
</form>
```

---

## Calendar / Date Range Picker

```html
<div role="application" aria-label="2026년 5월" class="bg-surface-default border border-default rounded-lg p-4 w-80">
  <header class="flex items-center justify-between mb-4">
    <button aria-label="이전 달" class="w-8 h-8 rounded-md hover:bg-surface-default-hover">‹</button>
    <span class="text-body-lg">2026년 5월</span>
    <button aria-label="다음 달" class="w-8 h-8 rounded-md hover:bg-surface-default-hover">›</button>
  </header>
  <div class="grid grid-cols-7 gap-1 text-caption text-tertiary mb-2">
    <span class="text-center">일</span><span class="text-center">월</span><span class="text-center">화</span>
    <span class="text-center">수</span><span class="text-center">목</span><span class="text-center">금</span>
    <span class="text-center">토</span>
  </div>
  <div role="grid" class="grid grid-cols-7 gap-1">
    <button role="gridcell" class="aspect-square rounded-full text-caption text-tertiary">27</button>
    <!-- 다른 날짜들 -->
    <button role="gridcell" aria-current="date" class="aspect-square rounded-full bg-primary text-on-accent text-label-sm">10</button>
    <button role="gridcell" aria-selected="true" class="aspect-square rounded-full bg-primary/10 text-primary text-label-sm">15</button>
  </div>
</div>
```

---

## Treeview

```html
<ul role="tree" aria-label="조직도" class="text-body-lg">
  <li role="treeitem" aria-expanded="true" aria-level="1" aria-setsize="3" aria-posinset="1">
    <button class="flex items-center gap-1 px-2 py-1 rounded-sm hover:bg-surface-default-hover w-full text-start">
      <svg aria-hidden="true" class="w-4 h-4 transition-transform rotate-90"><!-- chevron --></svg>
      개발본부
    </button>
    <ul role="group" class="ml-4">
      <li role="treeitem" aria-expanded="false" aria-level="2" aria-setsize="2" aria-posinset="1">
        <button class="flex items-center gap-1 px-2 py-1 rounded-sm hover:bg-surface-default-hover w-full text-start">
          <svg aria-hidden="true" class="w-4 h-4"><!-- chevron --></svg>
          백엔드팀
        </button>
      </li>
      <li role="treeitem" aria-selected="true" aria-level="2" aria-setsize="2" aria-posinset="2">
        <button class="px-2 py-1 rounded-sm bg-primary/10 text-primary w-full text-start">
          프론트팀
        </button>
      </li>
    </ul>
  </li>
</ul>
```

키보드: Arrow Up/Down navigate, Right expand or first child, Left collapse or parent, Home/End first/last, Enter/Space select.

---

## File Upload

```html
<div class="flex flex-col gap-2">
  <label for="upload" class="text-caption text-secondary">평가 첨부 <span class="text-tertiary">(PDF / 이미지, 최대 10MB)</span></label>

  <!-- Drag-drop zone -->
  <label
    for="upload"
    class="border-2 border-dashed border-default rounded-lg p-8 flex flex-col items-center gap-2 cursor-pointer hover:bg-surface-default-hover transition-colors"
  >
    <svg aria-hidden="true" class="w-10 h-10 text-tertiary"><!-- upload icon --></svg>
    <p class="text-body-lg">파일을 드래그하거나 클릭하여 선택</p>
    <p class="text-caption text-tertiary">PDF, JPG, PNG (최대 10MB)</p>
    <input id="upload" type="file" accept=".pdf,image/*" class="sr-only" />
  </label>

  <!-- File list -->
  <ul class="flex flex-col gap-1.5">
    <li class="flex items-center gap-3 px-3 py-2 rounded-md bg-surface-input">
      <svg aria-hidden="true" class="w-5 h-5 text-secondary"><!-- file icon --></svg>
      <div class="flex-1">
        <p class="text-body-lg">2026-Q1-evaluation.pdf</p>
        <div class="h-1 bg-surface-default rounded-full overflow-hidden mt-1">
          <div class="h-full bg-primary" style="width: 67%"></div>
        </div>
      </div>
      <button aria-label="제거" class="w-7 h-7 rounded-md hover:bg-surface-default-hover">×</button>
    </li>
  </ul>
</div>
```

---

## Empty state

```html
<div class="flex flex-col items-center gap-4 py-16">
  <svg aria-hidden="true" class="w-16 h-16 text-tertiary"><!-- empty illustration --></svg>
  <div class="text-center">
    <p class="text-title-sm">아직 메모가 없어요</p>
    <p class="text-body-lg text-secondary mt-1">첫 메모를 작성해보세요</p>
  </div>
  <button class="bg-primary text-on-accent px-5 py-2.5 rounded-md text-body-lg shadow-sm">메모 작성</button>
</div>
```

---

## Animation patterns

토큰: `motion-duration-{fast,base,slow,slower,loop}` + `motion-ease-out` (default) + `motion-ease-linear` (loop). 14 keyframe (v74).

```css
/* Modal entrance */
.modal { animation: scale-in var(--motion-duration-base) var(--motion-ease-out) both; }
.modal[data-state="closing"] { animation: scale-out var(--motion-duration-fast) var(--motion-ease-out) both; }

/* Bottom sheet */
.sheet { animation: slide-in-up var(--motion-duration-slow) var(--motion-ease-out) both; }

/* Toast */
.toast { animation: slide-in-up var(--motion-duration-slow) var(--motion-ease-out) both; }

/* Skeleton */
.skeleton { animation: shimmer var(--motion-duration-loop) linear infinite; }

/* Spinner */
.spinner { animation: spin var(--motion-duration-loop) linear infinite; }

/* Notification dot */
.dot::after { animation: ping var(--motion-duration-loop) cubic-bezier(0, 0, 0.2, 1) infinite; }

/* Form error shake */
.invalid { animation: shake var(--motion-duration-slow) cubic-bezier(.36,.07,.19,.97); }

/* Reduced motion 일괄 처리 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 토큰 alias 안내

각 컴포넌트의 색상은 token alias로 표기. 실제 hex/rgb는 export된 CSS variable 통해 적용.

| alias 예시 | DESIGN.md / brand 파일 정의 |
|---|---|
| `bg-primary` | HR `#357B5F` / Desk `#0147AD` (brand 파일) |
| `text-on-accent` | `#FFFFFF` (DESIGN.md, brand-neutral) |
| `bg-surface-default` | `#FFFFFF` (light) / `#1A1F2E` (dark) — `[data-theme="dark"]` token alias |
| `border-default` | `#E1E5EB` (light) / `#3D4555` (dark) |
| `text-error` | `#DC2626` (light) / `#F87171` (dark — `error-light`) |
| `bg-overlay-dim` | `rgba(0,0,0,0.50)` (light) / `rgba(0,0,0,0.65)` (dark) |
| `z-toast` | `1400` |
| `motion-duration-base` | `200ms` |

prose-token (shadow / motion / overlay / breakpoint / touch-target / z-index)은 `scripts/build-tailwind-v4.mjs`가 직접 추출 → CSS variable export.

## 다음 참조

- `DESIGN.md` — baseline (typography / spacing / rounded / neutral colors / 51 컴포넌트 spec)
- `DESIGN.hr.md` — HR 브랜드 (B2B, primary `#357B5F`, 격식 톤)
- `DESIGN.desk.md` — Desk 브랜드 (B2C, primary `#0147AD`, 친근 톤, 모바일 우선)
- `CHANGELOG.md` — milestone 기록 (v1 ~ v76)
- `exports/preview.html` / `preview.hr.html` / `preview.desk.html` — 시각 토큰 카탈로그 + 컴포넌트 vignette
