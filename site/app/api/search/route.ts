import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

// language 를 정하지 않는다 — 기본 multilingual 토크나이저가 한글을 그대로 색인한다.
// 'english' 로 두면 한글이 구분자로 잘려 한국어 검색이 안 된다.
export const { staticGET: GET } = createFromSource(source);
