import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { TagApiClient } from '../real/TagApiClient';
import { fakeResponse } from './fakeResponse';

export const fakeTagApiClient: Partial<TagApiClient> = {
  getTagsByIds: async (tagIds) => {
    const database = await getFakeDatabase();
    const allTags = await database.tag.getAll();
    const tagsMap = new Map(allTags.map((tag) => [tag.id, tag]));

    const tags = tagIds
      .map((id) => tagsMap.get(id))
      .filter((tag) => tag != null);

    return fakeResponse.ok(tags);
  },
};
