import { NewTagDto, TagDto } from '@food-captain/api';
import { metadata } from '@food-captain/client-utils';
import { ApiBase } from './base/ApiBase';

@metadata
export class TagApi extends ApiBase {
  async getAllAsync() {
    return this.get<TagDto[]>('/tags');
  }

  async getManyAsync(tagIds: TagDto['id'][]) {
    return this.post<TagDto[]>('/tags-by-ids', tagIds);
  }

  async addAsync(newTag: NewTagDto) {
    return this.post<TagDto | undefined>('/tag', newTag);
  }
}
