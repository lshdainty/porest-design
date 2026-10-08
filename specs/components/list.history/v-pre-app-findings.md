# List

> 가로 줄로 된 내용을 세로로 잇는 컴포넌트. 설정 · 메뉴 · 선택 · 키-값 줄과 거래 · 할 일 · 알림 같은 내용 줄을 모두 이것으로 그린다.

구조는 당근 [SEED List](https://seed-design.io/components/list)(Apache-2.0)를 따른다 — 목록(List) · 한 줄(List Item) · 목록 제목(List Header) · 줄 사이 선(ListDivider). 값은 porest 토큰이고, SEED 와 다른 자리는 맨 아래 "SEED 와 다른 점" 에 적었다(2026-10-01 사용자 결정).

수치 원본은 [`list.yaml`](list.yaml)(목록 · 한 줄)과 [`list-header.yaml`](list-header.yaml)(목록 제목)이다. 수치 표 자리(`[표: …]`)와 그림 자리(`[그림: …]`)는 사이트가 그 파일로 그린다 — GitHub 에서는 그 파일 · 그림 코드로 가는 링크로 보인다.

[그림: 설정 · 선택 · 내용 줄 — 가운데는 다크](../../site/components/specs/list.tsx#hero)

### 직접 골라 보기

줄의 종류 · 앞 · 뒤 · 맞춤 · 강조 · 상태를 고르면 스펙대로 그린 줄과 그 코드가 바뀐다. 실제로 눌러 볼 수 있다.

[그림: 플레이그라운드](../../site/components/specs/list.tsx#playground)

## Anatomy

[그림: 한 줄은 앞 붙이개 · 본문(제목 · 설명) · 뒤 붙이개로 이뤄지고, 목록 위에 목록 제목을 둔다](../../site/components/specs/list.tsx#anatomy)

| ⓐ Prefix | 앞 붙이개 — 설정 · 메뉴 줄은 아이콘 22, 색이 뜻을 가진 내용 줄은 타일 40, 은행 · 카드 같은 물건 줄은 로고 타일 40. 아바타 · 카드 그림 · 체크 · 라디오도 둔다. |
| ⓑ Title | 제목 — 16 · 400. 무엇인지 한 줄로. |
| ⓒ Detail | 설명 — 13 · 옅은 색. 제목만으로 모자랄 때만. |
| ⓓ Suffix | 뒤 붙이개 — 값 글자 · 오른쪽 화살표 · 스위치 · 체크 · 라디오 · 작은 버튼. |
| ⓔ List Header | 목록 제목 — 목록 밖, 바로 위. |

한 줄은 두 층이다 — **바탕 층**(누름 · 호버 · 강조 바탕)과 **콘텐츠 층**(앞 · 본문 · 뒤). 누르면 바탕 층은 안쪽으로 들어와 둥글어지고, 콘텐츠 층만 2px 거리로 준다(기초 Feedback v104 — "목록 줄은 콘텐츠만").

[표: 부위](list.yaml#slots)

## Properties

### 줄의 종류

같은 모양이 하는 일에 따라 넷으로 나뉜다.

- **보기만 하는 줄**(`ListItem`) — 누르지 않는다. 키-값 · 안내 줄.
- **누르는 줄**(`ListButtonItem`) — 줄 전체가 버튼. 화면을 옮기면 오른쪽 화살표를 단다.
- **링크 줄**(`ListLinkItem`) — 줄 전체가 링크. 다른 페이지 · 바깥 주소로 간다.
- **컨트롤 줄**(`ListSwitchItem` · `ListCheckItem` · `ListRadioItem`) — 줄 전체가 라벨이라 줄 어디를 눌러도 끼운 스위치 · 체크 · 라디오가 바뀐다.

[그림: 줄의 종류 넷](../../site/components/specs/list.tsx#kinds)

모든 줄에 공통인 값(상태마다 바뀌는 값은 아래 State):

[표: 공통](list.yaml#base.enabled)

### Align

맞춤의 기본은 가운데(`center`)다 — 앞 · 뒤가 본문의 세로 가운데에 선다. 제목이 두 줄을 넘거나 설명이 길면 위(`top`)로 맞춘다. 한 목록 안에서는 줄마다 맞춤을 섞지 않는다.

[그림: 가운데 · 위 맞춤](../../site/components/specs/list.tsx#align)

[표: 맞춤](list.yaml#align)

### Highlight

새 알림처럼 주목이 필요한 줄은 바탕을 옅은 브랜드 색(`bg-brand-weak`)으로 바꾼다(`highlighted`). 바탕만 바뀐다 — 점 · 왼쪽 막대는 두지 않는다(사용자 결정, SEED 와 같다). 읽음 · 안 읽음처럼 상태를 알리는 자리는 제목 · 설명의 글로도 알 수 있게 쓴다.

강조 줄을 올리거나 누르면 바탕이 `bg-brand-weak-pressed` 로 짙어지고, 그동안만 설명 · 값 글자를 한 단계 짙은 `fg-neutral-muted` 로 바꾼다 — `fg-neutral-subtle` 은 짙은 강조 바탕 위에서 4.32:1 로 글자 기준(4.5:1)에 모자란다(사용자 결정). 제목 · 화살표는 그대로다.

[그림: 강조 — 안 읽은 알림 둘](../../site/components/specs/list.tsx#highlight)

[표: 강조](list.yaml#grid.highlight)

[표: 강조 — 올리거나 누를 때](list.yaml#states.highlight)

### State

누르는 줄 · 컨트롤 줄은 호버 · 포커스 · 누름 · 비활성을 가진다. 보기만 하는 줄은 상태가 없고(누를 것이 없다), 링크 줄은 막지 않는다 — 갈 수 없는 곳이면 줄을 빼거나 누르는 줄로 바꿔 막는다.

| 상태 | 모습 |
|---|---|
| `enabled` | 기본 — 바탕 없음 |
| `hovered` | 웹. 누름과 같은 바탕(v106) — 좌우 6 들어온 `bg-layer-default-pressed`, 모서리 10 |
| `focused` | 웹. 키보드 포커스에만 줄 안쪽 링 2px — 화면 폭 줄은 바깥 링이 잘린다 |
| `pressed` | 호버와 같은 바탕 + 콘텐츠 층만 2px 거리 축소(v104 — 기준 길이가 폭 ÷ 4 라 세로로는 1px 남짓). 강조 줄은 올리거나 누르는 동안 설명 · 값 글자가 `fg-neutral-muted` |
| `disabled` | 제목 · 설명 · 앞뒤 아이콘이 모두 `fg-disabled`, 타일은 `bg-disabled`. 불투명도로 흐리게 하지 않는다(v106) |

[그림: 상태 — 호버 · 포커스 · 누름은 그 순간을 멈춰 그렸다](../../site/components/specs/list.tsx#states)

상태마다 `enabled` 에서 바뀌는 값:

[표: 호버 hovered](list.yaml#base.hovered)

[표: 포커스 focused](list.yaml#base.focused)

[표: 누름 pressed](list.yaml#base.pressed)

[표: 비활성 disabled](list.yaml#base.disabled)

[그림: 직접 눌러 보기 — 누르는 줄 · 컨트롤 줄(Tab 으로 포커스, Space 로 바꾼다)](../../site/components/specs/list.tsx#live)

[표: 모션](list.yaml#motion)

### 합계에 안 드는 줄

예정(아직 빠지지 않은 돈) · 환불(취소된 돈) 거래처럼 화면의 합계에 들지 않는 줄은 **불투명도로 흐리지 않는다** — 줄 전체를 흐리면 그 줄을 가르는 단서인 배지까지 흐려진다. 대신 이렇게 둔다(사용자 결정 2026-10-03).

- 제목 · 금액만 `fg-neutral-subtle`(흰 바탕 5.50 · 다크 6.09) — 훑어볼 때 합계에 드는 줄과 갈린다.
- 환불된 금액은 취소선을 긋는다. 취소선은 보조 기술이 읽지 않으므로 뜻은 배지 글("환불됨")이 말한다.
- 상태 [Badge](badge.md)("예정" · "환불됨" · "기록만" — `weak` `neutral`)는 보통 대비 그대로다(6.58 · 5.93).
- 앞 타일 · 설명 줄은 보통 줄과 같다. 누름 · 호버 · 포커스도 보통 줄과 같다(막힌 줄이 아니다).

[그림: 합계에 안 드는 줄 — 예정 · 환불, 배지는 또렷하게](../../site/components/specs/list.tsx#excluded-rows)

### Prefix

앞 붙이개는 줄이 무엇인지 먼저 알린다.

- **아이콘 22**(`fg-neutral`) — 설정 · 메뉴 줄.
- **타일 40**(모서리 12) — 색이 뜻을 가진 내용 줄(거래 · 카테고리 · 알림 종류). 바탕은 카테고리 색의 옅은 바탕(`chart-{색}-weak`, v111), 아이콘 20 은 그 색이다. 아이콘이 없는 카테고리는 태그 아이콘(lucide `tag`) 하나로 그린다 — 빈 칸 · 첫 글자를 넣지 않는다. 이체 줄은 회색(`chart-gray-weak` + `chart-gray`)이다 — 카테고리가 아니라 돈의 이동이다. 크기를 바꾸면 모서리도 크기 × 0.3 으로.
- **로고 타일 40**([Logo Tile](logo-tile.md)) — 은행 · 증권 · 카드 · 코인 · 금 같은 물건 줄(자산 · 계좌 관리). 기관 색 + 첫 글자, 그림이 있으면 덮는다. 막힌 줄에서도 그대로다.
- **카드 그림 56**([Image Frame](image-frame.md) 의 카드 그림) — 카드 혜택 목록처럼 카드 자체가 줄인 자리. 폭 56 · 카드 비율.
- **아바타**([Avatar](avatar.md) — 한 줄이면 36, 이름 + 설명 두 줄이면 42) · **체크 · 라디오**(컨트롤 줄 — 24).

[그림: 앞 붙이개 — 아이콘 · 타일 · 로고 타일 · 카드 그림 · 아바타 · 체크](../../site/components/specs/list.tsx#prefix)

### Suffix

- **값 글자**(16 · `fg-neutral-subtle`) — 지금 고른 값(기본 통화 "대한민국 원").
- **오른쪽 화살표**(18 · `fg-neutral-subtle`) — 화면을 옮기는 줄에만.
- **스위치 32** · **체크 24** · **라디오 24** — 컨트롤 줄. 스위치는 제목 16 줄이라 32 다(Switch 스펙).
- **작은 버튼** · **금액** — 금액은 그 화면이 정한다(가계부 금액 16 · 700).

[그림: 뒤 붙이개 — 값 글자 · 화살표 · 스위치 · 체크 · 라디오 · 작은 버튼](../../site/components/specs/list.tsx#suffix)

### Detail

설명은 제목 아래 2 떨어져 13 으로 쓴다. 제목만으로 무엇인지 알 수 있으면 두지 않는다. 길어지면 두 줄까지, 그 이상이면 맞춤을 위로 바꾼다. 분류 · 자산 · 시각처럼 여러 메타를 잇는 설명 줄은 [Tag Group](tag-group.md)(`t3` · 한 줄 말줄임)이다.

[그림: 설명 — 한 줄 · 두 줄](../../site/components/specs/list.tsx#detail)

### 목록 제목(List Header)

목록 밖, 바로 위에 두는 제목이다. 두 가지다.

- `mediumWeak`(기본) — 14 · 500 · `fg-neutral-subtle`. 줄보다 앞서지 않는다.
- `boldSolid` — 14 · 700 · `fg-neutral`. 화면을 크게 나누는 묶음에만.

오른쪽에 작은 버튼(도움말 · 전체 보기)을 둘 수 있다. 화면 맨 위 제목 · 카드 제목은 목록 제목이 아니다(그 컴포넌트 차례에).

[그림: 목록 제목 두 가지](../../site/components/specs/list.tsx#header)

[표: 목록 제목](list-header.yaml#variant)

[표: 목록 제목 — 공통](list-header.yaml#base)

### 줄 사이 선(ListDivider)

줄 사이 선은 기본으로 두지 않는다 — 줄의 위아래 여백이 줄을 가른다. 촘촘한 목록 · 설명 없는 긴 목록처럼 구분이 필요할 때만 `ListDivider`(1px · `stroke-neutral-subtle`)를 넣는다. 줄 폭 전체가 기본이고, 앞 붙이개가 있는 목록은 들일 수 있다(좌우 24). 목록 밖의 구분선은 [Divider](divider.md)(같은 색) 다.

[그림: 구분선 — 없음(기본) · 줄 폭 · 들임](../../site/components/specs/list.tsx#divider)

## Guidelines

### 모든 줄을 List 로

설정 · 메뉴 · 선택 · 키-값 줄과 거래 · 할 일 · 메모 · 알림 같은 내용 줄을 모두 List 줄로 그린다(사용자 결정). 줄의 여백 · 글자 · 누름 · 구분선은 List 가 정하고, 앞의 타일 · 뒤의 금액처럼 그 화면만의 자리만 화면이 채운다.

[그림: 같은 줄로 그린 설정 · 가계부](../../site/components/specs/list.tsx#all-rows)

### 목록 제목으로 묶기

줄이 많으면 목록 제목으로 묶는다. 같은 묶음은 어느 화면에서나 같은 모양이어야 한다 — "카테고리별 예산" 이 화면마다 다른 크기로 그려지지 않게.

[그림: 목록 제목으로 묶은 설정](../../site/components/specs/list.tsx#group-guide)

### 누르는 줄만 누르게

화면을 옮기는 줄에만 오른쪽 화살표를 단다. 화살표가 있는데 눌리지 않는 줄, 눌리는데 아무 표시가 없는 줄을 만들지 않는다. 보기만 하는 줄은 호버 · 누름 바탕이 생기지 않는다.

[그림: 화살표는 화면을 옮기는 줄에만](../../site/components/specs/list.tsx#chevron-guide)

### 줄 안의 누르는 것은 셋까지

한 줄에 따로 누르는 것(줄 자체 · 작은 버튼 · 메뉴)은 셋까지다. 넷부터는 줄을 나누거나 상세 화면으로 옮긴다.

[그림: 누르는 것이 넷인 줄](../../site/components/specs/list.tsx#targets-guide)

### 스위치 · 체크 · 라디오 줄

스위치 · 체크 · 라디오를 끼우면 줄 전체가 라벨이 된다 — 줄 어디를 눌러도 바뀐다. 이 줄에는 따로 누르는 버튼을 같이 넣지 않는다. 약관처럼 따로 볼 내용은 제목 안의 링크로 두고, 그 링크를 눌러도 줄의 값이 바뀌지 않게 한다. 줄을 누르면 줄의 콘텐츠가 함께 줄고, 끼운 스위치 · 체크 · 라디오는 따로 줄지 않는다(v104).

[그림: 컨트롤 줄 — 줄 어디를 눌러도 바뀐다](../../site/components/specs/list.tsx#control-guide)

### 하나 고르기 · 여럿 고르기

목록에서 하나를 고르면 라디오(24)를 뒤에, 여럿을 고르면 체크(24)를 앞이나 뒤에 둔다(사용자 결정, SEED). 고른 것과 안 고른 것이 모두 보인다. 한 묶음에서 라디오와 체크를 섞지 않고, 하나 고르기는 두 줄 이상이어야 한다.

[그림: 기본 통화 — 하나 고르기는 라디오](../../site/components/specs/list.tsx#select-guide)

### 여백을 바꿀 때

줄의 여백은 화면에 맞게 바꿀 수 있다 — 단 토큰으로만, 좌우는 24 보다 좁히지 않고, 한 목록 안에서는 줄마다 같게.

[그림: 한 목록 안에서 줄마다 여백이 다르면 맞춤이 어긋난다](../../site/components/specs/list.tsx#spacing-guide)

### 카드 안의 목록

카드 안에 목록을 넣으면 누름 바탕의 모서리를 카드 모서리에서 카드 가장자리 ~ 바탕 거리를 뺀 값으로 맞춘다(동심 모서리). 기본 10 은 모서리 16 인 카드에 줄을 바로 넣은 경우다 — 바탕이 좌우 6 들어오므로 16 − 6. 카드에 안쪽 여백을 더 두면 그만큼 더 뺀다. 그대로 두면 바탕의 둥근 정도가 카드와 어긋난다. 레시피에서는 목록(`List` · `ListRadioGroup` · `ListCheckGroup`)의 `itemRadius` 로 바꾼다(SEED 의 `itemBorderRadius`).

[그림: 카드 안의 목록 — 동심 모서리](../../site/components/specs/list.tsx#concentric-guide)

### 목록을 두는 바탕

목록은 흰 바탕(`bg-layer-default`)이나 시트 · 대화상자(`bg-layer-floating`) 위에 둔다. 누름 · 호버 바탕(`bg-layer-default-pressed`)이 불투명한 색이라, 회색 바탕(`bg-layer-basement`) 위에서는 바탕과 거의 같아(라이트 1.02:1) 눌러도 보이지 않는다. 회색 바탕 화면에서는 목록을 카드에 담는다.

[그림: 흰 바탕 위의 목록 · 회색 바탕 위의 목록 — 둘 다 가운데 줄을 누른 순간](../../site/components/specs/list.tsx#surface-guide)

### 앞 붙이개 고르기

설정 · 메뉴 줄은 아이콘, 색이 뜻을 가진 내용 줄은 타일이다(사용자 결정). 물건(은행 · 카드 · 증권) 줄은 로고 타일이다. 한 목록 안에서 섞지 않는다 — 자산 목록은 로고 타일, 거래 목록은 카테고리 타일.

[그림: 설정은 아이콘, 가계부는 타일](../../site/components/specs/list.tsx#prefix-guide)

## 코드

레시피 `recipes/shadcn/components/ui/list.tsx` 를 쓴다 — `List` · `ListItem` · `ListButtonItem` · `ListLinkItem` · `ListSwitchItem` · `ListCheckItem` · `ListCheckGroup` · `ListRadioGroup` · `ListRadioItem` · `ListDivider` · `ListHeader` · `ListTile`. 아래 미리보기는 스펙 값으로 그린 모습이다.

라우터의 링크는 `ListLinkItem asChild` 의 자식으로 넣는다 — 제목 · 설명은 그 링크 안에 그려진다(`<ListLinkItem asChild title="도움말"><Link to="/help" /></ListLinkItem>`).

### 기본

[그림: 기본 — 보기만 하는 줄](../../site/components/specs/list.tsx#ex-basic)

```tsx
import { List, ListItem } from "@/components/ui/list"

<List>
  <ListItem title="가입일" suffix="2026년 3월 2일" />
  <ListItem title="이메일" suffix="porest@example.com" />
</List>
```

### 누르는 줄

[그림: 누르는 줄 — 화면을 옮긴다](../../site/components/specs/list.tsx#ex-button)

```tsx
import { ChevronRight, Globe, User } from "lucide-react"
import { List, ListButtonItem, ListHeader } from "@/components/ui/list"

<ListHeader id="settings-general">일반</ListHeader>
<List aria-labelledby="settings-general">
  <ListButtonItem prefix={<User />} title="계정" suffix={<ChevronRight />} onClick={openAccount} />
  <ListButtonItem prefix={<Globe />} title="기본 통화" suffix={<>대한민국 원<ChevronRight /></>} onClick={openCurrency} />
</List>
```

### 컨트롤 줄

[그림: 스위치 줄 — 줄 어디를 눌러도 바뀐다](../../site/components/specs/list.tsx#ex-switch)

```tsx
import { Bell } from "lucide-react"
import { List, ListSwitchItem } from "@/components/ui/list"

<List>
  <ListSwitchItem
    prefix={<Bell />}
    title="결제 알림"
    detail="결제 예정일 D-1, 결제일 당일 알림"
    checked={on}
    onCheckedChange={setOn}
  />
</List>
```

### 하나 고르기 · 여럿 고르기

[그림: 하나 고르기 · 여럿 고르기](../../site/components/specs/list.tsx#ex-select)

```tsx
import { ListCheckGroup, ListCheckItem, ListRadioGroup, ListRadioItem } from "@/components/ui/list"

<ListRadioGroup value={currency} onValueChange={setCurrency} aria-label="기본 통화">
  <ListRadioItem value="KRW" title="대한민국 원" detail="KRW" />
  <ListRadioItem value="USD" title="미국 달러" detail="USD" />
</ListRadioGroup>

<ListCheckGroup aria-label="내보낼 항목">
  <ListCheckItem title="거래 내역" defaultChecked />
  <ListCheckItem title="예산" />
</ListCheckGroup>
```

### 강조 · 비활성 · 맞춤

[그림: 강조 · 비활성 · 위 맞춤](../../site/components/specs/list.tsx#ex-states)

```tsx
import { Info } from "lucide-react"
import { List, ListButtonItem, ListItem } from "@/components/ui/list"

<List>
  <ListButtonItem highlighted title="예산 80% 도달" detail="식비 예산의 80%를 썼어요" />
  <ListButtonItem disabled title="주간 리포트" detail="푸시 알림이 꺼져 있어요" />
  <ListItem align="top" prefix={<Info />} title="긴 제목은 두 줄을 넘으면 앞 · 뒤를 위로 맞춘다" detail="설명이 길 때도 같다" />
</List>
```

## Behavior

| 인터랙션 | 동작 |
|---|---|
| Click / Tap(누르는 줄) | 줄 어디를 눌러도 그 줄의 동작 — 누르는 동안 콘텐츠가 줄어 가장자리를 누른 포인터가 영역 밖에 놓여도 그 줄이 눌린다. 뒤 붙이개의 작은 버튼은 따로 눌린다. `disabled` 면 무시. |
| Click / Tap(컨트롤 줄) | 줄 어디를 눌러도 끼운 스위치 · 체크 · 라디오가 바뀐다. 바로 적용(스위치) · 저장 때 적용(체크)은 그 컨트롤의 규칙대로. |
| Hover(웹) | 누르는 줄만 — 누름과 같은 바탕. |
| Keyboard `Tab` | 누르는 줄 · 컨트롤로 간다. 보기만 하는 줄은 건너뛴다. |
| Keyboard `Enter` · `Space` | 누르는 줄은 누르기와 같다. 컨트롤 줄은 그 컨트롤의 키(스위치 · 체크 Space, 라디오 화살표). 키를 누르고 있는 동안은 포인터로 누를 때와 같은 누름 모습(바탕 · 콘텐츠 축소)이다. |
| Disabled | 누르기 · 키보드 불가, 포커스에서 빠진다. 값은 그대로 보인다. |

## Accessibility

| 기준 | 검증 |
|---|---|
| **WCAG 1.4.3** Color contrast(글자 ≥ 4.5:1) | 제목 `fg-neutral` 9.90:1 이상. 설명 · 값 글자 `fg-neutral-subtle` — 흰 바탕 5.50 · 6.09(라이트 · 다크), 누름 바탕 5.18 · 4.68, 강조 바탕 4.83 이상 ✓. 강조 줄을 올리거나 누르는 동안은 `fg-neutral-muted` 5.58 이상 ✓(`fg-neutral-subtle` 이면 4.32 로 미달). 막힌 줄의 `fg-disabled` 는 기준 밖(비활성 UI) |
| **WCAG 1.4.11** Non-text contrast(≥ 3:1) | 앞 아이콘 `fg-neutral` · 화살표 `fg-neutral-subtle` 은 글자와 같은 값. 타일 아이콘 `chart-{색}` × `chart-{색}-weak` 3.63 이상(가장 낮은 yellow 라이트) ✓ |
| **WCAG 1.4.1** Use of color | 강조는 바탕 색만 바뀐다 — 안 읽음 같은 상태는 글로도 알 수 있게 쓴다 |
| **WCAG 2.4.7** Focus visible | 키보드 포커스에만 줄 안쪽 링 2px(`stroke-focus-ring`). 컨트롤 줄은 끼운 컨트롤이 포커스를 받고 그 컨트롤의 링이 보인다 |
| **WCAG 2.5.8** Target Size — Minimum(AA ≥ 24×24) | 줄 높이 46 이상 ✓ |
| **WCAG 2.5.5** Target Size — Enhanced(AAA ≥ 44×44) | 누르는 줄은 줄 전체 — 한 줄짜리도 46 ✓ |
| **ARIA** | `List` 는 `<ul>` · 줄은 `<li>`. 누르는 줄의 버튼 · 링크 이름은 제목 + 설명. 컨트롤 줄은 `<label>` 이 줄 전체라 제목 + 설명이 컨트롤의 이름이다. 목록 제목이 있으면 `List` 에 `aria-labelledby` 로 잇는다. 하나 고르기(`ListRadioGroup`)는 `role="radiogroup"`, 여럿 고르기(`ListCheckGroup`)는 `<fieldset>` 이고 둘 다 이름(`aria-label` · `aria-labelledby`) 필수 — 묶음 안의 줄 · 선은 `<div>` 다(SEED 와 같다). 줄 사이 선은 `aria-hidden` 이라 줄 수에 들지 않는다 |
| **Reduced motion** | 모션 줄이기면 콘텐츠 축소를 뺀다 — 바탕 색 전환은 그대로(기초 Motion) |

## Do / Don't

### ✅ Do

- 설정 · 메뉴 · 선택 · 키-값 · 내용 줄을 모두 List 로 그린다.
- 화면을 옮기는 줄에만 오른쪽 화살표를 단다.
- 컨트롤 줄은 줄 전체가 눌리게 한다.
- 막힌 줄은 제목 · 설명 · 아이콘을 모두 비활성 색으로.

### ❌ Don't

- 화면마다 줄을 손으로 짜기 — 여백 · 글자 · 누름이 화면마다 갈린다.
- 화살표가 있는데 안 눌리는 줄 · 눌리는데 표시가 없는 줄.
- 컨트롤 줄에 따로 누르는 버튼을 같이 넣기.
- 한 줄에 누르는 것 넷 이상.
- 한 묶음에서 라디오 · 체크 섞기.
- 줄 높이를 줄이려고 스위치 · 체크의 누르는 영역을 자르기.

## Specification

`list.yaml` · `list-header.yaml` 의 규칙을 하나도 빼지 않고 조건마다 그린다 — 웹 · 앱이 List 를 만들 때 이 값을 그대로 쓴다. 조건이 없는 `Base` 가 모든 조합에 걸리고, 뒤의 규칙이 앞의 같은 값을 덮는다. 상태는 `enabled` 에서 바뀌는 값만 적었다.

[그림: Specification — list.yaml 의 규칙 전부](../../site/components/specs/spec-sheet.tsx#list)

[그림: Specification — list-header.yaml 의 규칙 전부](../../site/components/specs/spec-sheet.tsx#list-header)

## SEED 와 다른 점

- **좌우 여백은 24**(`spacing-global-gutter` — porest 2026-09-14 결정). SEED 는 16.
- **앞 타일(40, 모서리 12)을 둔다**(사용자 결정) — 색이 뜻을 가진 내용 줄(거래 · 카테고리 · 알림 종류)에. SEED 의 앞 자리는 아이콘 · 아바타 · 컨트롤뿐이다.
- **누름 · 호버 바탕은 불투명한 `bg-layer-default-pressed`** — SEED 의 transparent-pressed 는 투명도가 있어 검사기가 받지 않는다(v102).
- **막힌 줄은 값 글자 · 타일도 비활성 색** — SEED 는 제목 · 설명 · 아이콘만 바꾼다(porest 비활성은 전용 색, v106).
- 누르면 콘텐츠 층만 주는 건 SEED 와 같다(SEED `scaleScope: content`) — 배율은 기초 Feedback v104 의 2px 거리다.
- 목록 제목의 좌우도 24 다.
- **포커스 링(웹)은 porest 가 정했다** — 줄 안쪽 2px. SEED 는 목록 줄의 포커스 링을 적지 않았다.

## Migration notes

### 2026-10-01 — SEED List 로

사용자가 [비교 페이지](https://claude.ai/artifact/NcSnfZY2LVGstqEd5UsgRS)에서 정했다 — 모든 줄을 List 로(내용 줄도) · 글자 · 여백은 SEED 그대로(제목 16 · 400, 설명 13, 위아래 12) · 앞 붙이개는 설정은 아이콘 22 · 내용 줄은 타일 40 · 누름은 안쪽 바탕(좌우 6 · 모서리 10) · 구분선은 필요할 때만 · 목록 제목은 SEED 두 가지 · 하나 고르기는 오른쪽 라디오 · 강조는 바탕만.

**RadioList 를 걷는다** — 기본 통화처럼 하나를 고르는 목록은 `ListRadioItem`(오른쪽 라디오 24)으로 그린다. 옛 스펙은 `radio-list.history/` 에 남겼다.

| 옛 RadioList | 새 List |
|---|---|
| 고른 줄에만 오른쪽 체크 16 · 브랜드 색 | 오른쪽 라디오 24 — 고른 것 · 안 고른 것이 모두 보인다. 켜짐 색은 neutral |
| 줄 사이 선 · 바깥 테두리 · 모서리 lg | 선 없음(필요할 때만) · 배경 없음 |
| 제목 14 · semi, 설명 11 | 제목 16 · 400, 설명 13 |
| 고른 줄은 다시 눌리지 않는다 | 라디오 묶음 — 고른 줄을 다시 눌러도 그대로(Radix) |

제품은 앱 적용 단계에서 옮긴다(2026-10-01 조사). 줄을 그리는 공용 부품이 사실상 없어 화면마다 손으로 짰다.

- **Desk 앱** — 줄 모양 126가지(손으로 짠 것 118) · 호출 약 190곳. 제목 크기 · 굵기 짝 24가지(14/600 33 · 13/600 21), 오른쪽 화살표 크기 여섯 가지(13 ~ 18), 타일 크기 28 ~ 40 · 모서리 4 · 8 · 11 · 12, 구분선 다섯 방법, 누를 때 물결 모서리 다섯 가지. 공용 줄 위젯 넷(`PSwitchTile` · `PRadioTile` · `PSearchableList` · `PAccordion`)은 쓰는 곳이 없다. 같은 설정 흐름에서 줄이 세 가지(설정 15/500 · 계정 14/600 · 프로필 17/700). 프리셋 목록의 줄은 상세를 여는 함수가 불리지 않아 눌리지 않는다. "로그인 기록" 은 화살표가 있는데 눌리지 않는다. 알림 설정 · 계정의 스위치 6곳은 줄 높이를 지키려고 누르는 영역을 24 로 잘랐다. 묶음 제목 79곳 중 65곳이 손으로 짠 것(글자 모양 15가지).
- **Desk 웹** — 줄 모양 95가지(모바일 · 데스크톱 변형 108) · 호출 194곳, 공용 줄 부품을 쓰는 변형은 36. 카테고리 예산 줄 네 벌 · 키-값 줄 일곱 벌 · 스위치 줄 다섯 벌 · 체크 모양 셋 · 하나 고르기 셋. 줄 전체를 누르는 59 가운데 18 은 키보드로 닿지 않는다(`div` 에 onClick). 호버를 일곱 가지로 만들었고 하나는 정의 없는 변수라 효과가 없다. 같은 `LedgerRow` 가 가계부에서는 선이 없고 할 일 · 메모에서는 들인 선이다. 묶음 제목 27가지(크기 여덟).
- **HR 웹** — 줄 모양 24가지 · 목록 33곳. 오른쪽 화살표 0, 줄 전체를 누르는 10 중 키보드로 닿는 것 3, 호버 바탕 토큰 여섯 가지, 키-값 줄 네 가지. 역할 목록의 삭제 버튼은 보이지 않는데 눌린다(`group` 조상이 없다).
- **알림의 안 읽음** — Desk 앱 알림은 옅은 브랜드 바탕 + 왼쪽 막대 3px + 점 6px 이다. 바탕만 남긴다.

### 2026-10-03 — 합계에 안 드는 줄

사용자가 [표시 비교 페이지](https://claude.ai/artifact/4ySVacsdnG4fgraR1HRK3G) 3A 로 정했다 — 불투명도를 걷고 제목 · 금액만 `fg-neutral-subtle`, 환불 금액은 취소선, 배지는 보통 대비. 지금 웹 · 앱은 예정 · 환불 줄 전체를 불투명도 0.6 으로 흐려 "예정" · "환불됨" 배지가 웹 2.30 · 다크 2.77, 앱 2.39 · 2.87:1 이다(웹 `shared/ui/porest/ledger.tsx:555` · `entities/expense/ui/expense-row.tsx:58 · 81-84` · `entities/asset/ui/transfer-row.tsx:75`, 앱 `features/expense/presentation/widgets/expense_row.dart:84-86` · `transfer_row.dart:130`). 코드 주석은 "흐림만으로는 아직 안 온 것과 구별이 안 돼 배지로 가른다" 고 적었는데 그 배지가 흐려진다. 메타 줄은 2.47 · 3.02 였다. 줄의 설명 줄은 [Tag Group](tag-group.md) 으로 그린다.

### 2026-10-04 — 카테고리 타일 세부 · 물건 줄

사용자가 [이미지 비교 페이지](https://claude.ai/artifact/G351nuKcYX2xhorvA5UD6X)의 "따라오는 것" 에서 정했다 — 카테고리 타일의 아이콘은 이 스펙의 20, 아이콘이 없는 카테고리는 태그 아이콘 하나, 이체 줄 타일은 회색. 은행 · 증권 · 카드 같은 물건 줄의 앞은 [Logo Tile](logo-tile.md)(같은 40 · 모서리 × 0.3), 카드 혜택 목록의 앞은 카드 그림 56([Image Frame](image-frame.md))이다.

제품은 앱 적용 단계에서 옮긴다(2026-10-03 조사).

- **아이콘 18** — 웹 `CategoryChip` md(`shared/ui/porest/category-chip.tsx:9-40` — 32 / 40 / 48 에 16 / 18 / 22)와 앱 줄 타일이 18 이다. 40 타일은 20 으로.
- **없는 아이콘의 대체가 셋** — 웹 줄 타일은 빈 칸(`shared/ui/porest/primitives.tsx:76-82`), 웹 고르는 칸 · 손 타일은 첫 글자(`shared/lib/icon-map.tsx:31` — `CategoryTile` 이 "구 구독" 으로 읽힌다), 앱은 태그 아이콘(`shared/icons/lucide_icon_map.dart:11-14`). 태그 아이콘 하나로.
- **이체 줄 타일이 브랜드 파랑** — 웹 `entities/asset/ui/transfer-row.tsx:60` 이 `color="var(--fg-tertiary)"` 로 회색을 뜻했는데, 색 이름이 아니라 `var(...)` 라 표에서 못 찾고 색 없음 분기(브랜드 18% + #0147ad · 다크 #5fa0e5 — `shared/lib/porest/chart-palette.ts:103-140`)로 간다. 앱은 회색이다(`features/expense/presentation/widgets/transfer_row.dart:82`). `chart-gray-weak` + `chart-gray` 로.
- **손으로 짠 타일** — 웹 약 20곳(18 ~ 48, 예산 36 · 12 처럼 × 0.3 이 아닌 모서리 — `pages/budget/ui/BudgetPage.tsx:1314`), 앱 `PRadius.tile(` 39곳 · 24파일. 앱 `PCategoryTile` 은 버튼으로 읽히지 않는다(`shared/widgets/p_category_tile.dart:37` — 라벨 + 누르기뿐). List 의 타일로 옮긴다.
- **자산 줄 · 계좌 관리 줄의 로고 타일**은 [Logo Tile](logo-tile.md) 의 Migration notes 에 있다. 대시보드 결제 예정(반복 = 구독) 줄의 "D-3" 글 타일(`pages/dashboard/ui/DashboardPage.tsx:1790-1812`)은 가맹점 · 구독 로고와 함께 다음 차례에 정한다.
