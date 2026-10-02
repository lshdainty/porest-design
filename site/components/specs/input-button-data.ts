// Input Button 그림 · 실제 칸이 같이 쓰는 예시 값 — 서버 그림(input-button.tsx)과 브라우저 그림(input-button-pickers)이 함께 읽는다.
// 'use client' 파일에서 내보낸 값은 서버 그림이 읽지 못한다 — 그래서 따로 둔다.
import type { SelIcon } from './select-shared';

export const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
export const weekday = (y: number, m: number, d: number) => WEEK[new Date(y, m - 1, d).getDay()];
export const formatDate = (y: number, m: number, d: number, style: 'desk' | 'hr') => (style === 'hr' ? `${y}. ${m}. ${d}. (${weekday(y, m, d)})` : `${m}월 ${d}일 (${weekday(y, m, d)})`);

export type CatItem = { value: string; group: string; label: string; icon: SelIcon; hue: 'orange' | 'blue' | 'green' | 'violet' | 'pink' };
export const CATEGORIES: CatItem[] = [
  { value: 'breakfast', group: '식비', label: '아침', icon: 'sunrise', hue: 'orange' },
  { value: 'lunch', group: '식비', label: '점심', icon: 'utensils', hue: 'orange' },
  { value: 'dinner', group: '식비', label: '저녁', icon: 'moon', hue: 'orange' },
  { value: 'cafe', group: '식비', label: '카페', icon: 'coffee', hue: 'orange' },
  { value: 'bus', group: '교통', label: '버스', icon: 'bus', hue: 'blue' },
  { value: 'subway', group: '교통', label: '지하철', icon: 'train', hue: 'blue' },
  { value: 'taxi', group: '교통', label: '택시', icon: 'taxi', hue: 'blue' },
  { value: 'shopping', group: '생활', label: '쇼핑', icon: 'shopping-bag', hue: 'violet' },
  { value: 'home', group: '생활', label: '주거', icon: 'house', hue: 'violet' },
  { value: 'hospital', group: '생활', label: '병원', icon: 'stethoscope', hue: 'violet' },
];
export const catText = (c: CatItem) => `${c.group} · ${c.label}`;

export type Person = { value: string; name: string; team: string; hue: 'orange' | 'blue' | 'green' | 'violet' | 'pink' };
export const PEOPLE: Person[] = [
  { value: 'pore', name: '김포레', team: '디자인팀 · 팀장', hue: 'green' },
  { value: 'haneul', name: '김하늘', team: '개발팀', hue: 'blue' },
  { value: 'minjun', name: '김민준', team: '인사팀', hue: 'violet' },
  { value: 'seoyeon', name: '김서연', team: '디자인팀', hue: 'pink' },
  { value: 'jiwoo', name: '이지우', team: '개발팀', hue: 'orange' },
  { value: 'doyun', name: '박도윤', team: '재무팀', hue: 'blue' },
  { value: 'yuna', name: '최유나', team: '인사팀 · 팀장', hue: 'green' },
  { value: 'siwoo', name: '정시우', team: '영업팀', hue: 'violet' },
  { value: 'hayun', name: '강하윤', team: '개발팀 · 팀장', hue: 'pink' },
  { value: 'junho', name: '조준호', team: '영업팀', hue: 'orange' },
];


// 달력(CalendarGrid)의 높이 — 머리 40 · 요일 줄 24 · 다섯 주(날 칸 = cell − 8) · 줄 사이 4. 달력은 아직 스펙이 없다(Date Picker 차례) — 그림의 값
export const calendarHeight = (cell: number, weeks = 5) => 40 + 24 + weeks * (cell - 8) + weeks * 4;
