# Z-Index Layers

> Porest 의 floating layer stacking 정책. 시스템 wide 가이드. 각 컴포넌트의 z-index 분기는 이 표를 SoT 로 따른다.

Porest 는 Bootstrap 식 **명시적 z-index 계층 분기** 정책을 채택. shadcn 공식은 모든 layer 가 `z-50` + portal order 로 stacking 하지만, 디버깅 / 의도 명시 / 예측 가능성을 위해 layer 별로 z-index 를 분기한다. Portal 순서에 의존하면 깨질 때 추적이 어렵다.

## Layer matrix

| Layer | z-index | 컴포넌트 | 의미 |
|---|---|---|---|
| **L0 — base** | `auto` | 일반 콘텐츠 | document 기본 flow |
| **L1 — page sticky/fixed** | `z-50` | sticky header, FAB(`speed-dial`), env 표시 등 | 페이지 위 고정 UI |
| **L2 — modal** | `z-[100]` overlay · `z-[101]` content | `dialog` / `drawer` / `sheet` | modal layer — overlay + content 분리 |
| **L3 — modal-aware floating** | `z-[200]` | `popover` / `select` / `dropdown-menu` / `color-picker` (popover 패턴) | page 와 modal 안 어디서든 사용. modal(L2) 위에 떠야 하므로 200. page 에서도 동일 값 — sticky/FAB(L1=50) 위 자연스러움 |
| **L4 — modal-aware tooltip** | `z-[210]` | `tooltip` | popover 위에 살짝 떠야 함 (hover 잠깐 뜨고 사라지는 참고 정보) |
| **L5 — alert-dialog** | `z-[300]` overlay · `z-[301]` content | `alert-dialog` | 비가역 결정 강제. dialog(L2) 위로 명시 — dialog 안에서 삭제 확인 같은 alert 띄우는 케이스 보존 |
| **L6 — toast** | sonner 라이브러리 기본 (보통 99999+) | `sonner` | 모든 modal 위 사용자 알림. 라이브러리가 자체 처리 |
| **L9 — dev** | `z-[9999]` | `env-watermark` | dev only 시각 표시 (production 비활성) |

## 의도된 stacking 시나리오

| 시나리오 | 결과 |
|---|---|
| page sticky(L1=50) 위 dropdown 열림 | dropdown(L3=200) 가 sticky 위 ✓ |
| page 에서 dialog 열림 | dialog(L2=100) 가 page 위 ✓ |
| dialog 안 select / popover 열림 | floating(L3=200) 가 dialog content(L2=101) 위 ✓ |
| dialog 안 tooltip hover | tooltip(L4=210) 가 popover(L3=200) 위 ✓ |
| dialog 안 alert-dialog 열림 (삭제 확인 등) | alert(L5=300) 가 dialog(L2=101) 위 ✓ |
| 모든 layer 위 toast | sonner(L6) 가 alert 위 ✓ |
| dev watermark | L9 가 모든 것 위 (배경처럼 보임은 opacity 처리) |

## L3 의 "modal-aware" 의미

L3 컴포넌트(popover/select/dropdown-menu) 는 **page 와 modal 안 두 컨텍스트에서 같은 값(z-200) 사용**. 호출처별 변경 없이 한 컴포넌트 = 한 z-index — `inModal` prop 같은 분기 불필요. 호출처는 modal 안 사용 시 추가 className override 안 해도 정상.

근거 — page 에는 L2(modal=100) layer 자체가 페이지 표면엔 없으므로 L3(200) 가 page sticky(L1=50) 위로 자연스럽게 떠도 어색하지 않다.

## L5 안 floating 의 edge case

alert-dialog(L5=300/301) 안에서 popover/select 띄우는 케이스는 매우 드물지만 만약 필요하면 호출처에서 `className="z-[400]"` 식으로 override. 시스템 분기 추가 보류 — drift 우려.

## Known issues (Radix portal + 다중 modal)

### Issue 1 — `pointer-events: none` 잠금 풀림 안 됨

Radix DropdownMenu / Dialog 가 열릴 때 `body { pointer-events: none }` 박는다. **dropdown-menu 안 item 클릭 → 그 onSelect 콜백에서 dialog open** 같은 빠른 연쇄 transition 시 풀림 순서가 꼬여 dialog 내부 클릭이 안 먹는 버그가 Radix 의 잘 알려진 이슈.

**해결**:
- `<DropdownMenuItem onSelect={(e) => e.preventDefault()}>` 로 자동 close 막고 별도 시점(setTimeout(fn, 0) 등 한 프레임 후)에 dialog open
- 또는 dropdown 외부 trigger 로 dialog 열고 dropdown 은 단순 navigation 만 담당

### Issue 2 — focus trap 충돌

dropdown(modal pattern) 과 dialog 가 동시에 focus trap active 면 Tab 흐름 깨짐. dropdown close 가 먼저 완료된 후 dialog trap 활성화되어야 정상. Issue 1 의 해결책 따라가면 자연 해결.

### Issue 3 — aria-hidden 누수

dropdown 닫힐 때 `aria-hidden="true"` 가 body 에 남아 screen reader 가 dialog 인식 못 함. Radix 최신 버전에서 대부분 해결됐으나 발생 시 dropdown close → 한 프레임 후 dialog open 패턴이 안전.

→ **위 3 이슈는 z-index 정책과 무관 — Radix 동작 자체의 한계**. 컴포넌트 spec (dropdown-menu.md / dialog.md / alert-dialog.md) 의 Behavior 섹션에 해당 가이드 표시.

## 컴포넌트 spec 의 z-index 명시 규칙

각 컴포넌트 spec 의 Sizes 또는 States 표에 z-index 행 필수 — 이 가이드의 layer 명과 z-index 값 동시 표기. 예:

```
| z-index | z-[200] (L3 modal-aware floating) | — |
```

## Migration notes

- **v1: 최초 명시 (2026-05-15)** — 그동안 각 컴포넌트 spec 에 z-index 가 분산 명시되거나 누락된 상태였음. desk-front 가 모두 다른 값으로 분기(50/100/101/200/9999) 두고 있었는데 정합 기준이 없었음. Bootstrap 식 명시 계층 채택. shadcn 표준(모두 z-50 + portal order) 은 디버깅 어렵다고 판단 — 우리는 명시 분기.
