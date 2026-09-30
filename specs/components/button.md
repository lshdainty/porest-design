# Button

> 명확한 액션을 쉽게 실행하게 돕는 기본 인터랙션 컴포넌트. 폼 제출 · 대화상자 닫기 · 다음 단계처럼 사용자가 무엇을 하는지 분명한 동작에 쓴다.

구조는 당근 [SEED Action Button](https://seed-design.io/components/action-button)(Apache-2.0)을 따른다 — 크기 4 · 배치 2 · 변형 7 · 상태 6. 값은 porest 토큰이고, SEED 와 다른 자리는 맨 아래 "SEED 와 다른 점" 에 적었다(2026-09-30 사용자 결정).

수치 원본은 [`button.yaml`](button.yaml) 이다. 아래 수치 표는 사이트가 그 파일로 그리고, GitHub 에서는 표 자리가 그 파일로 가는 링크로 보인다.

## Anatomy

```
┌──────────────────────────────────────────┐
│  ⓐ Container                              │
│   ⓑ Prefix Icon   ⓒ Label   ⓓ Suffix Icon │
└──────────────────────────────────────────┘
   ⓔ Focus ring(웹 — 키보드 포커스에만)
```

| ⓐ Container | 배경 · 테두리 · 모양. 글자와 아이콘은 이 색(currentColor)을 따른다. |
| ⓑ Prefix Icon | 라벨 앞 아이콘 — 동작의 뜻을 돕는다. 선택. |
| ⓒ Label | 무엇을 하는지 동사로. 한 줄(`white-space: nowrap`). |
| ⓓ Suffix Icon | 라벨 뒤 아이콘 — chevron 처럼 동작을 돕는다. 선택. |
| ⓔ Focus ring | 키보드 포커스에만 2px 링 · 2px 띄움(v106). |

[표: 부위](button.yaml#slots)

## Properties

### Size

네 가지다. **크기는 이름이 아니라 높이로 고른다.**

- `small`(36) · `medium`(40) — 화면 안에서 두루 쓴다. 모달 footer 는 `small`.
- `large`(48) — CTA. 모바일 하단 고정 버튼 · 모바일 모달 footer.
- `xsmall`(32) — 좁은 자리에서 쓰는 알약 모양.

누르는 영역은 보이는 크기와 따로 가로 · 세로 44 까지 넓힌다(v106 — 44 는 반드시).

[표: 크기](button.yaml#size)

글자와 함께 쓸 때(`withText`):

[표: 크기별 여백 · 글자 · 아이콘 — 글자](button.yaml#grid.size.layout.withText)

아이콘만 쓸 때(`iconOnly`):

[표: 크기별 여백 · 아이콘 — 아이콘만](button.yaml#grid.size.layout.iconOnly)

모든 조합에 공통인 값:

[표: 공통](button.yaml#base)

### Layout

라벨과 아이콘의 조합이다 — 글자만 · 앞 아이콘 + 글자 · 글자 + 뒤 아이콘 · 아이콘만.

- **앞 · 뒤 아이콘을 함께 쓰지 않는다.** 앞은 동작의 뜻을 돕고(추가의 `+`), 뒤는 동작을 돕는다(다음의 chevron).
- 아이콘은 꼭 필요할 때만 쓴다 — 라벨을 읽기 어려워진다.
- **아이콘만**은 아이콘만으로 뜻을 전해 접근성이 떨어진다. 꼭 필요할 때만 쓰고, 이름(`aria-label` 또는 옆 Tooltip)을 반드시 단다. 정사각이고, 아이콘 버튼의 보이는 크기 기본은 `medium`(40 — v106).

### Variant

일곱 가지다. 화면에서 강조하려는 정도에 따라 고른다.

| 변형 | 생김새 | 쓰는 곳 |
|---|---|---|
| `brandSolid` | 브랜드 색 채움 | 서비스의 핵심 액션 하나 — Desk "거래 추가", HR "휴가 신청". 한 화면에 하나 |
| `neutralSolid` | 짙은 회색 채움 | 대부분의 CTA — 저장 · 확인 · 다음. 한 화면에 하나 |
| `criticalSolid` | 빨강 채움 | 삭제 · 초기화처럼 되돌릴 수 없는 작업의 **확정**. 주로 [Alert Dialog](alert-dialog.md) |
| `neutralWeak` | 옅은 회색 채움 | CTA 를 뺀 대부분의 액션. CTA 옆에서는 보조(취소 · 닫기) |
| `brandOutline` | 테두리 + 브랜드 글자 | Solid 보다 낮은 위계. Solid 와 함께 쓰지 않고 `neutralOutline` 과 짝 |
| `neutralOutline` | 테두리 + 본문 글자 | 가장 낮은 위계의 보조 액션. Solid 와 함께 쓰지 않고 `brandOutline` 과 짝 |
| `ghost` | 배경 없음 | 메뉴 · 툴바 · 목록 행의 가벼운 액션. 글자색을 바꿀 수 있다(아래) |

[표: 변형별 색](button.yaml#grid.variant)

`ghost` 는 글자색을 바꿀 수 있다(SEED ghost 의 `color`) — 배경 · 누름은 그대로다.

| `ghostColor` | 쓰는 곳 |
|---|---|
| `neutral`(기본) | 대부분의 ghost |
| `neutralSubtle` | 목록 행 · 툴바의 보조 아이콘 액션, 가장자리 텍스트 버튼(flush) |
| `brand` | 강조하는 가벼운 액션 — 본문 속 "자세히 보기" |
| `critical` | 확인 창을 여는 **삭제** — 모달 footer 왼쪽. 확정은 확인 창의 `criticalSolid` |

[표: ghost 글자색](button.yaml#compound)

### State

| 상태 | 모습 |
|---|---|
| `enabled` | 기본 |
| `hovered` | 웹. 누름 색과 같다(v106), 축소는 없다 |
| `focused` | 웹. 키보드 포커스에만 링 2px · 띄움 2px(v106) |
| `pressed` | 누름 색 + 세로 2px 거리 축소(v104 — 기초 Feedback 의 눌림 피드백) |
| `loading` | 누름 색 위 로딩 원. 라벨 자리는 그대로(폭 유지) |
| `disabled` | 전용 색(`bg-disabled` · `fg-disabled`, v106). 불투명도로 흐리게 하지 않는다 |

[표: 변형별 상태 변화](button.yaml#states.variant)

**로딩**

- `loading` 이면 로딩 원(크기는 Size 표)을 라벨 자리 가운데 둔다. 라벨은 글자 · 아이콘 색만 투명하게 해서 버튼 폭이 그대로다 — 버튼이 자식을 따로 감싸지 않으므로 부르는 쪽의 `[&>span]` · `[&>svg]` 규칙이 그대로 먹는다.
- 로딩 중에는 **누르기를 자동으로 막는다**(두 번 제출 방지) — 포인터 · Enter · Space 누르기를 삼키고(`onClick` 을 부르지 않는다), 누름 축소도 없다. 포커스는 그대로 두고 `aria-busy="true"` 를 단다. SEED 는 로딩이 비활성을 포함하지 않지만 porest 는 막는다 — 사용자 결정.
- 로딩 원 색은 변형마다 다르다(Solid 는 흰 원, 나머지는 회색 트랙 위 본문색).

### Width

- **내용 맞춤**(기본) — 라벨 길이만큼.
- **채움** — 컨테이너 폭을 채운다(`w-full`). 모바일 하단 고정 CTA · 폼의 마지막 제출.
- 최소 너비는 두지 않는다. 둘을 나란히 채울 때는 비율로 나눈다(아래 배치).

## Guidelines

### Hierarchy

시각적 주목도는 배경 대비로 정해진다.

| 강조 | 변형 | 화면 안 개수 | 쓰는 곳 |
|---|---|---|---|
| **강** — 대비가 강한 배경 | `brandSolid` · `neutralSolid` · `criticalSolid` | 1개 | 가장 중요한 CTA |
| **중** — 대비가 약한 배경 | `neutralWeak` | 여러 개 | 대부분의 액션, 강 버튼과 짝 |
| **약** — 투명한 배경 | `brandOutline` · `neutralOutline` · `ghost` | 여러 개 | 중요도가 낮은 보조 액션 |

### 브랜드 색은 꼭 필요한 곳에만

브랜드 색은 로고 · 대표 버튼 · 핵심 메시지 같은 브랜드 상징에 모아 쓴다. 많이 쓰면 뜻과 강조가 흩어진다.

- `brandSolid` 는 **서비스의 중심 동작 하나**에만 — Desk "거래 추가", HR "휴가 신청"처럼. 어떤 화면이 여기에 드는지는 앱 적용 때 화면마다 정한다.
- 저장 · 확인 · 다음 같은 대부분의 CTA 는 `neutralSolid` 다.

### 버튼 조합

- **Solid 조합** — `neutralWeak` + `neutralSolid`(또는 `brandSolid`). 위계가 분명하고 부담이 적다.
- **Outline 조합** — `neutralOutline` + `brandOutline`. 강조가 낮은 보조 액션을 한 화면에 여러 번 둘 때.
- Outline 은 Solid 와 함께 쓰지 않는다.

### 버튼 배치

- 닫기 · 초기화처럼 Dismiss 뜻의 `neutralWeak` 와 CTA 를 나란히 채울 때는 **3:7** 로 나눈다 — 위계가 분명해진다. 모달 footer 는 [Dialog](dialog.md) · [Drawer](drawer.md) 의 폭 나누기(지금은 균등)를 따른다.
- 비슷한 위계의 `neutralWeak` 둘은 나란히 둘 수 있다.
- **셋 이상 나란히 두지 않는다** — 중요도가 비슷해 보여 고르기 어렵고, 큰 글자에서 라벨이 잘린다. 더 있으면 아이콘만 버튼(더보기)으로 넘긴다.
- 인접한 버튼 사이는 8(`spacing-x2`).

**놓는 바탕** — `neutralWeak` 의 채움과 비활성 채움(`bg-disabled`)은 라이트에서 페이지 바탕(`bg-page`)과 같은 색(gray-200)이다(v108). 흰 표면(카드 · 시트 · 모달 — `bg-layer-default`) 위에 두고, 페이지 바탕에 바로 둘 땐 `neutralOutline` 을 쓴다 — 바탕 위의 `neutralWeak` 는 채움이 사라져 글자만 남는다.

**모달 footer**(porest)

- 오른쪽에 `[취소 neutralWeak] [저장 neutralSolid]` — 웹은 `small`(36), 모바일 전체 폭은 `large`(48).
- 확인 창을 여는 **삭제**는 왼쪽에 `ghost` + `critical` 글자. 삭제의 **확정**은 [Alert Dialog](alert-dialog.md) 의 `criticalSolid`.
- 모달 footer 의 버튼을 `neutralOutline` 둘로 두지 않는다 — 전체 폭 버튼 둘이 테두리로 서면 위계가 흐려진다.

### 라벨

기초 Writing(v106)을 따른다 — 사용자가 할 행동을 동사로, 해요체 없이 짧게, 마침표 없이.

- "다음" 보다 "저장" · "주문 확인"처럼 무엇을 하는지 알게.
- 같은 동작에는 같은 말을 쓴다.

### 긴 라벨

긴 라벨 · 번역 · 큰 글자로 나란한 두 버튼이 넘치면 **세로로 쌓는다**(주 버튼이 위). 한 줄에 억지로 줄이지 않는다.

## Button 과 Chip

SEED 는 Button 과 Chip 을 이렇게 가른다. porest 에는 아직 Chip 이 없고, 선택 · 필터는 [toggle-group](toggle-group.md) 이 맡는다.

| | Button | Chip |
|---|---|---|
| 목적 | 액션 실행 | 정보 표현 + 선택 |
| 예 | 완료 · 제출 · 다음 · 삭제 | 필터(서초4동 외 34) · 옵션(0 ~ 6개월) |
| 라벨 | 보면 동작이 예상된다 | 지금 켜진 조건 · 정보 |
| 쓰는 모양 | 하나로도 | 둘 이상 묶어서 |

## porest 에만 있는 것

**반반 바(split bar)** — 액션 **둘**이 무게가 같고 한 묶음으로 읽힐 때, 본문 폭을 채운 네모 바를 반으로 갈라 각 칸에 하나씩 둔다(예: 내역 분할의 `항목 추가` · `균등 분할`).

- 컨테이너: `display:flex; width:100%; background:var(--color-bg-layer-basement); border:1px solid var(--color-stroke-neutral-weak); border-radius:var(--radius-r2); overflow:hidden`. 트랙 톤은 [`toggle-group`](toggle-group.md) 의 segmented 와 같다.
- 각 칸: `flex:1` 의 `ghost` 버튼, 모서리 없음(컨테이너가 깎는다).
- 칸 사이는 1px `stroke-neutral-weak` 구분선을 **글자 높이만큼만** 긋는다 — 끝까지 그으면 두 칸이 벽으로 막힌 것처럼 보인다.
- **얇게 — `xsmall` 높이(32).** 목록에 줄을 더하는 성격이라 본문 행보다 무거우면 안 된다. 알약 모양은 쓰지 않는다(segmented 와 헷갈린다).
- **선택이 아니라 실행이다.** 눌린 상태(`data-state=on`)가 없다. 셋 이상으로 나누지 않는다.

**가장자리 맞춤(flush)** — SEED 의 `bleed` 와 같은 기능이다.

- `flush="left" | "right"` — 그 방향 가로 여백을 0 으로 한다.
- 대상: `ghost` + 앞 아이콘이 컨테이너 가장자리의 첫 · 끝 요소일 때. 글자만 있는 ghost 에는 쓰지 않는다.
- flush ghost 는 **텍스트 버튼**이다 — 누름 · 호버에 배경을 깔지 않고 글자색으로만 반응한다(`neutralSubtle` → 누르면 `fg-neutral`). 한쪽 여백만 0 이라 채움 상자가 좌우 비대칭이 되기 때문이다.
- 그래서 flush 는 `ghostColor` 를 덮는다 — 빨간 글자를 지켜야 하는 삭제(`critical`)에는 쓰지 않는다.

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click / Tap | `onClick` 발화. `disabled` · `loading` 이면 무시. |
| Keyboard `Enter` · `Space` | 클릭과 같다(포커스 상태에서). |
| Keyboard `Tab` | 다음 포커스로. Shift+Tab 은 거꾸로. |
| `asChild` | `<Slot>` 으로 요소를 바꾼다(예: `<a>`). `loading` 과 함께 쓰지 않는다(Slot 은 자식 하나만 받는다). |
| Disabled | 누르기 · 키보드 불가, 포커스에서 빠진다. |

**Form 안** — `type="submit"` 을 적어야 제출한다. `type="button"` 은 제출하지 않는다.

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** 글자 대비(4.5:1) | 흰 글자 × `bg-brand-solid` · `bg-critical-solid`, `fg-neutral-inverted` × `bg-neutral-inverted`(누름 포함), `fg-neutral` × `bg-neutral-weak` — `npm run lint:all` 의 role 짝이 잰다 |
| **WCAG 1.4.3** 비활성 | `fg-disabled` — 비활성 컴포넌트 글자는 대비 예외(1.4.3 incidental) |
| **WCAG 1.4.11** UI 대비(3:1) | 포커스 링 `stroke-focus-ring` × 표면 |
| **WCAG 2.5.8** Target Size — Minimum(AA, 24×24) | 네 크기 모두 통과 |
| **WCAG 2.5.5** Target Size — Enhanced(AAA, 44×44) | 보이는 크기는 `large` 48 만 넘지만, 누르는 영역을 44 까지 넓혀 모두 통과(v106) |
| **WCAG 2.4.7** Focus visible | 키보드 포커스에만 링(`focus-visible`) |
| **ARIA** | `<button>` 기본. 아이콘만이면 `aria-label` 필수. 로딩이면 `aria-busy="true"`. `asChild` 로 `<a>` 를 쓸 때 `role="button"` 을 따로 달지 않는다 |
| **모션 줄이기** | 축소를 하지 않는다(v104 모드) — 누름은 색으로만 |

## Do / Don't

### ✅ Do

- 강조 버튼(`brandSolid` · `neutralSolid` · `criticalSolid`)은 한 화면에 하나.
- 모달 footer 는 `[취소 neutralWeak] [저장 neutralSolid]`, 삭제는 왼쪽 `ghost` + `critical`.
- 되돌릴 수 없는 작업의 확정은 확인 창의 `criticalSolid`.
- 아이콘만 있는 버튼에는 이름을 단다.
- 모바일 하단 CTA 는 `large` + 채움 + 안전 영역(`pb-safe`).

### ❌ Don't

- 강조 버튼을 한 화면에 여럿.
- 셋 이상을 한 줄에.
- `brandSolid` 를 일반 저장 · 확인에 — 브랜드 색이 흩어진다.
- Outline 을 Solid 와 섞기.
- 앞 · 뒤 아이콘을 함께.
- `disabled` 버튼에 호버 · 누름 반응.

## SEED 와 다른 점

- `large` 는 **48** 이다(SEED 52) — 여백 · 글자 · 아이콘은 SEED large 그대로다.
- 테두리 · 투명 누름은 SEED 가 투명도 있는 색(`stroke.neutral-muted` · `bg.transparent-pressed`)이라, 불투명한 가장 가까운 역할(`stroke-neutral-weak` · `bg-layer-default-pressed`)을 쓴다 — design.md 검사기가 8자리 hex 를 받지 않는다.
- 웹의 `hovered` · `focused` 상태를 더한다(v106).
- 로딩 중 누르기를 **자동으로 막는다**(SEED 는 막지 않는다).
- `neutralSolid` 의 누름은 새 역할 `bg-neutral-inverted-pressed`(gray-800, v112)다.

## Migration notes

### 2026-09-30 — SEED Action Button 구조로

사용자가 비교 페이지(https://claude.ai/artifact/JRfDTChty6VDZzzqpWSF6C)에서 정했다 — 변형은 SEED 7가지만(옛 `dangerSoft` 는 없앰, 정말 위험한 건 `criticalSolid`) · 일반 CTA 는 `neutralSolid` · 크기는 SEED 틀 + `large` 48 · 모양은 SEED(모서리 8 · 12 · 알약, 글자 700) · 확인 창을 여는 삭제는 `ghost` + `critical` · `brandSolid` 는 핵심 액션에만 · 로딩은 SEED 모양 + 누름 자동 막기.

제품(Desk 웹 197 · 앱 133 · HR 웹 176곳)은 앱 적용 단계에서 옮긴다. 그동안 옛 이름은 아래처럼 읽는다.

| 옛 변형 | 새 변형 |
|---|---|
| `default`(정보 파랑 채움) | `neutralSolid`(일반 CTA) · `brandSolid`(핵심 액션) |
| `destructive` | `criticalSolid` |
| `secondary` | `neutralWeak` |
| `outline` | `neutralOutline` |
| `dangerSoft` | `ghost` + `critical`(확인 창을 여는 삭제) |
| `ghost` | `ghost` — 보조 아이콘 액션은 `neutralSubtle` |
| `accent` · `link` | `ghost` + `brand` |

| 옛 크기 | 새 크기 |
|---|---|
| `sm`(32) | `xsmall` — 알약 |
| `default`(36) | `small` |
| `md`(40) | `medium` |
| `lg`(48) | `large` |
| `icon`(40) | `medium` · `iconOnly` |
| `iconLg`(36 원형, 모바일 헤더) | `medium` · `iconOnly`(보이는 크기 40 — v106) |

그 밖에 바뀐 것 — 누름은 밝기 95% · 0.98 배 → 누름 색 + 2px 거리 축소(v104), 비활성은 50% 불투명 → 전용 색(v106), 글자 굵기 500 → 700, 모서리 4 → 8(`large` 12, `xsmall` 알약), 아이콘–글자 간격 8 고정 → 크기마다(4 · 4 · 6 · 8), 로딩 스피너는 라벨 앞 → 라벨 자리.

**앱에 옮길 때 — `cn` 부터.** 새 cva 는 porest 스케일 이름(`text-t4` · `px-x4` · `rounded-r2`)을 쓴다. 기본 tailwind-merge 는 `text-t4` 를 글자색으로 읽어 앞의 `text-fg-neutral-inverted` 를 지우고(짙은 버튼의 흰 글자가 사라진다), `px-x4` 를 여백으로 못 읽어 `p-0` 덮어쓰기가 먹지 않는다. 레시피 `lib/utils.ts` 처럼 spacing · radius · text 스케일을 `extendTailwindMerge` 에 등록한다 — Desk 웹의 `cn` 은 지금 옛 글자 이름만 안다.

**다른 컴포넌트에 남은 옛 이름** — 버튼을 부르는 레시피 코드(alert-dialog · calendar · carousel · pagination · sidebar)와 그 스펙, 모달 footer 규칙(dialog · drawer · alert-dialog)은 이 변경에서 옮겼다. 아래는 옛 이름을 글로만 적고 있어 각 컴포넌트 차례에 옮긴다 — 예제 속 JSX(tooltip · sheet · popover · form · dropdown-menu · drawer · dialog · card · alert-dialog · table · spinner 예제), 스펙 본문(table · popover · spinner · toggle-group · collapsible · context-menu · dropdown-menu · icon-picker · calendar 의 nav `outline`), DESIGN.md 의 다른 컴포넌트 절(Form 의 `button-primary` lg · Pagination 의 페이지 버튼), 미리보기의 빈 화면 · 폼 · 결재 행(Outline 과 Solid 를 한 줄에 둔다 — Outline 조합 규칙과 어긋난다).

### 2026-09-16 — `default`(36) 를 정식 사이즈로 올리고 모달 footer 를 그걸로

Sizes 표는 원래 `sm` 32 · `md` 40 · `lg` 48 셋이었는데, desk 웹 구현에는 shadcn 이름을 그대로
둔 `default`(높이 36 · 좌우 양쪽 16 · 14px)가 하나 더 있었고 그게 cva 기본값이다. 모달 footer 20종 실측에서
표준 footer 40 과 손수 footer 36 이 섞여 있었고, 화면으로 보니 40 은 대화상자에 비해 굵어 사용자가 36 을 골랐다 —
2026-09-30 구조에서는 `small`(36)이 그 자리다.

### 2026-08 — 채움 버튼을 `info` 로, 모달 footer 좌측을 옅은 채움으로

`default` 채움색을 브랜드 남색에서 정보 파랑으로 바꾸고(남색은 버튼 채움으로 무겁다), 모달 footer 의 취소는 `secondary`, 삭제는 `dangerSoft` 로 두었다. 2026-09-30 에 일반 CTA 는 `neutralSolid`, 취소는 `neutralWeak`, 삭제는 `ghost` + `critical` 로 다시 정했다.
