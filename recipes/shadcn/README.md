# Porest × shadcn

Porest 디자인 시스템 토큰을 shadcn/ui 컴포넌트에 주입한 recipe.
shadcn 코드 구조(cva + Slot + forwardRef)는 그대로, 색상·typography만 Porest 토큰으로 교체.

## 핵심 아이디어

shadcn 컴포넌트는 두 종류의 CSS variable에 의존:
- `--primary` / `--primary-foreground` / `--background` / `--border` / `--ring` ...

이걸 우리 Porest 토큰(`--color-primary`, `--color-text-on-accent` 등)으로 alias하는
**bridge CSS** 한 장으로 해결.
shadcn 컴포넌트 코드는 한 줄도 손대지 않아도 됨.

```
Porest 토큰 (exports/tokens*.css)
        │
        ▼
porest-shadcn-bridge.css   ← 이 recipe가 제공
        │
        ▼
shadcn variables (--primary, --background, ...)
        │
        ▼
shadcn 컴포넌트 (.tsx)      ← cva + Tailwind utility
```

## 다른 React 프로젝트에 적용하는 법

1. **Porest 토큰 export 복사** — `exports/tokens.css`(또는 `.hr.css` / `.desk.css`)를
   프로젝트의 `public/` 또는 `src/styles/`로 복사.
2. **Bridge 복사** — 이 디렉터리의 `styles/porest-shadcn-bridge.css`를 같이 복사.
3. **글로벌 stylesheet에서 import**:
   ```css
   @import "./porest-tokens.css";
   @import "./porest-shadcn-bridge.css";
   @import "tailwindcss";
   ```
4. **컴포넌트 복사** — `components/ui/button.tsx`를 프로젝트로 복사. 같은 디렉터리에
   shadcn 표준대로 `lib/utils.ts` (cn helper)도 함께 복사.
5. **의존성 설치**:
   ```bash
   npm install clsx tailwind-merge class-variance-authority @radix-ui/react-slot
   ```
6. **Tailwind v4 + Pretendard 적용** — `<html lang="ko">` + Pretendard 폰트 로드.
7. **브랜드 토글** — `<html data-brand="default|hr|desk">`로 색상 분기.
   다크모드는 `<html data-theme="dark">`.

## 디렉터리

```
recipes/shadcn/
├── README.md                        ← 이 파일
├── lib/utils.ts                     ← cn() helper (clsx + tailwind-merge)
├── styles/porest-shadcn-bridge.css  ← Porest 토큰 → shadcn variables alias
├── components/ui/button.tsx         ← shadcn Button + Porest 토큰
└── preview/button-demo.html         ← React 없이 Tailwind CDN으로 즉시 시연
```

## 미리보기

`preview/button-demo.html`을 정적 서버로 띄우면 React 없이 즉시 확인 가능
(Tailwind v4 browser CDN 사용). 실제 React 프로젝트의 결과와 시각적으로 동일.

```bash
# 프로젝트 루트에서
python3 -m http.server 8765
# → http://localhost:8765/recipes/shadcn/preview/button-demo.html
```

## Button variants × sizes

| variant | 용도 | 색상 |
|---|---|---|
| `default` | 주요 액션 | `--color-primary` 채움 |
| `destructive` | 위험 액션 (삭제) | `--color-error` 채움 |
| `outline` | 보조 액션 | surface + border |
| `secondary` | 그룹 내 보조 | surface-input 채움 |
| `ghost` | nav/tab/icon 자리 | 비채움, hover 배경 |
| `link` | 인라인 링크 | primary text + 밑줄 |

| size | 높이 | typography | 용도 |
|---|---|---|---|
| `sm` | 32px | `text-label-sm` 13/400 | dense list, inline action |
| `md` (default) | 40px | `text-title-sm` 16/500 | 일반 form, dialog |
| `lg` | 48px | `text-title-md` 18/600 | hero CTA, primary form |
| `icon` | 40×40 | — | icon-only |

## 사용 예

```tsx
import { Button } from "@/components/ui/button"
import { Save, Trash2 } from "lucide-react"

export function SavePanel() {
  return (
    <div className="flex gap-2">
      <Button variant="default" size="md">
        <Save />
        저장
      </Button>
      <Button variant="outline" size="md">취소</Button>
      <Button variant="destructive" size="md">
        <Trash2 />
        삭제
      </Button>
    </div>
  )
}
```

## 다음 단계 후보 컴포넌트

button 다음에 만들 컴포넌트 우선순위 (Porest 사용처 기준):
1. **Input / Textarea** — form 영역 핵심
2. **Card** — listing detail / 정보 그룹
3. **Dialog (Modal)** — confirm / form modal
4. **Badge** — 상태 표시 (승인/대기/반려, 카테고리)
5. **Select / Combobox** — form 영역
6. **Toast** — 시스템 알림
7. **Tabs** — 탭 네비
8. **Dropdown Menu** — 컨텍스트 액션

각 컴포넌트도 동일 패턴: shadcn 표준 코드 + Porest 토큰 + 한국어 라벨 데모.
