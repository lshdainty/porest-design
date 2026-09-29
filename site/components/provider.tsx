'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';

// fumadocs-ui 번역 키는 "영어 문구(문맥)" 꼴이다 — 전체 목록은
// node_modules/fumadocs-ui/dist/.translations/keys.js. 화면에 보이는 것만 옮긴다.
const ko: Record<string, string> = {
  'Search(search trigger)': '검색',
  'Search(search dialog)': '검색',
  'No results found(search dialog)': '결과가 없어요',
  'Open Search(search trigger)(aria-label)': '검색 열기',
  'Close Search(search dialog)(aria-label)': '검색 닫기',
  'On this page(table of contents)': '이 페이지',
  'Table of Contents(inline table of contents)': '목차',
  'No Headings(table of contents)': '제목 없음',
  'Next Page(pagination)': '다음 페이지',
  'Previous Page(pagination)': '이전 페이지',
  'Copy Markdown(page actions)': '마크다운 복사',
  'Copied Markdown(page actions)': '마크다운 복사됨',
  'Open(page actions)': '열기',
  'Open in GitHub(page actions)': 'GitHub 에서 원본 보기',
  'View as Markdown(page actions)': '마크다운으로 보기',
  'Open in Claude(page actions)': 'Claude 에서 열기',
  'Open in ChatGPT(page actions)': 'ChatGPT 에서 열기',
  'Open in Cursor(page actions)': 'Cursor 에서 열기',
  'Read {url}, I want to ask questions about it.(page actions)': '{url} 을 읽고 내 질문에 답해 줘.',
  'Copy Text(code block)(aria-label)': '복사',
  'Copied Text(code block)(aria-label)': '복사됨',
  'Copy Anchor Link(heading anchor)(aria-label)': '제목 링크 복사',
  'Copied Anchor Link(heading anchor)(aria-label)': '제목 링크 복사됨',
  'Edit on GitHub(edit page)': 'GitHub 에서 고치기',
  'Last updated on(page footer)': '마지막 수정',
  'Page Not Found(404 not found page)': '페이지를 찾을 수 없어요',
  'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 not found page)':
    '페이지가 지워졌거나 이름이 바뀌었을 수 있어요.',
  'Back to Home(404 not found page)': '처음으로',
  'Toggle Theme(theme switcher)(aria-label)': '테마 바꾸기',
  'Light(theme switcher)(aria-label)': '라이트',
  'Dark(theme switcher)(aria-label)': '다크',
  'System(theme switcher)(aria-label)': '시스템',
  'Toggle Menu(home layout header)(aria-label)': '메뉴',
  'Open Sidebar(aria-label)': '사이드바 열기',
  'Open Sidebar(sidebar)(aria-label)': '사이드바 열기',
  'Close Sidebar(aria-label)': '사이드바 닫기',
  'Close Sidebar(sidebar)(aria-label)': '사이드바 닫기',
  'Show Sidebar(sidebar)': '사이드바 보이기',
  'Hide Sidebar(sidebar)': '사이드바 숨기기',
  'Collapse Sidebar(sidebar)(aria-label)': '사이드바 접기',
};

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider search={{ SearchDialog }} i18n={{ locale: 'ko', translations: ko }}>
      {children}
    </RootProvider>
  );
}
