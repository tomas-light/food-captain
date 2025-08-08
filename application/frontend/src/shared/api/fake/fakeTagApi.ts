import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { TagApi } from '../real/TagApi';
import { fakeResponse } from './fakeResponse';

export const fakeTagApi: Partial<TagApi> = {
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
