import { useQuery } from '@tanstack/react-query';
import { type TagApiClient } from '~/shared/api';
import { convertToMilliseconds } from '~/shared/date';
import type { Tag } from '../model/Tag';
import { getTagsByIdsQueryKey } from './queryKeys';
import { useTagApi } from './useTagApi';

const idsToRequest = new Set<Tag['id']>([]);
const inProgressRequest: {
  current: null | ReturnType<TagApiClient['getTagsByIds']>;
} = {
  current: null,
};

type Options = {
  tagIds: undefined | Tag['id'][];
};

export function useTagsByIdsQuery(options: Options) {
  const { tagIds } = options;

  const api = useTagApi();

  return useQuery({
    enabled: Boolean(tagIds?.length),
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getTagsByIdsQueryKey(tagIds),
    queryFn: async () => {
      if (!tagIds?.length) {
        throw new Error('tagIds are empty');
      }

      const tagIdsSet = new Set(tagIds);

      return await request();

      async function request() {
        tagIdsSet.forEach((id) => {
          idsToRequest.add(id);
        });

        if (!inProgressRequest.current) {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });

          if (idsToRequest.size > 0) {
            const ids = Array.from(idsToRequest);
            idsToRequest.clear(); // clear set to accumulate next requested ids
            inProgressRequest.current = api.getTagsByIds(Array.from(ids));
          }
        }

        const tags = await inProgressRequest.current;
        inProgressRequest.current = null;

        if (idsToRequest.size > 0) {
          let currentIdsArePending = false;
          for (const id of idsToRequest) {
            if (tagIdsSet.has(id)) {
              currentIdsArePending = true;
              break;
            }
          }

          if (currentIdsArePending) {
            return await request();
          }
        }

        return tags?.data?.filter((tag) => tagIdsSet.has(tag.id)) ?? null;
      }
    },
  });
}
