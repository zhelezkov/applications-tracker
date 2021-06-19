import { nanoid } from 'nanoid';
import type { SearchMeta } from './SearchRow';

export function newSearchMeta(): SearchMeta {
  return { id: nanoid() };
}
