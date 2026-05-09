# Expand Design Tokens

CLAUDE.md의 규칙을 따라 DESIGN.md에 부족한 토큰을 제안하세요.

요건:
1. 한 번에 최대 5개만 추가
2. 추가 이유를 prose 섹션에 작성
3. WCAG 대비비 사전 검증 (계산 결과 포함)
4. HR / Desk 듀얼 브랜드 호환 확인
5. 추가 후 `npm run lint` 통과 보장

대상 카테고리: $ARGUMENTS

작업 후:
- `npm run snapshot`으로 백업
- 변경 요약을 마지막에 출력
