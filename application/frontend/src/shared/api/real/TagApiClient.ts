import type { TagDto } from '../dto/TagDto';
import { ApiBaseClient, ContentType } from './ApiBaseClient';

export class TagApiClient extends ApiBaseClient {
  getTags = async () => {
    return this.request<TagDto[]>({
      method: 'GET',
      url: '/tags',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getTagsByIds = async (tagIds: TagDto['id'][]) => {
    return this.request<TagDto[]>({
      method: 'GET',
      url: '/tags',
      query: { tag_ids: tagIds },
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getTagById = async (tagId: TagDto['id']) => {
    return this.request<TagDto>({
      method: 'GET',
      url: `/tag/${tagId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  addTag = async (tag: Omit<TagDto, 'id'>) => {
    return this.request<TagDto>({
      method: 'POST',
      url: '/tag',
      data: JSON.stringify(tag),
      type: ContentType.Json,
      responseType: 'json',
    });
  };
}
