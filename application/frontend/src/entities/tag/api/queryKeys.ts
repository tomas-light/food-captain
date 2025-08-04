import type { Tag } from '../model/Tag';

export function getTagsByIdsQueryKey(tagIds: undefined | Tag['id'][]) {
  return ['tags-by-ids', tagIds];
}
