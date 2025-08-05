import type { Tag } from '../model/Tag';

export function getTagsByIdsQueryKey(tagIds: undefined | Tag['id'][]) {
  const key: unknown[] = ['tags-by-ids'];
  if (tagIds?.length) {
    key.push(...tagIds);
  }

  return key;
}
