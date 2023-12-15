import type { Request, Response } from 'express';
import { api, GET, POST } from 'mvc-middleware/stage2';
import { Database, NewTagEntity, TagEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { BaseApiController } from '../base/BaseApiController';

@api
export default class TagApiController extends BaseApiController {
  constructor(
    private readonly db: Database,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @GET('tags')
  async getAllAsync() {
    const tags = await this.db.tag.allAsync();
    return this.ok(tags);
  }

  @POST('tags-by-ids')
  async getManyAsync(tagIds: TagEntity['id'][]) {
    const tags = await this.db.tag.byIdsAsync(tagIds);
    return this.ok(tags);
  }

  @POST('tag')
  async addAsync(newTag: NewTagDto) {
    const tagId = await this.db.tag.insertAsync(newTag);
    if (tagId == null) {
      this.logger.warning(`Tag is not inserted in DB (tag id is ${tagId})`);
      return undefined;
    }

    const tag: TagDto = {
      ...newTag,
      id: tagId,
    };

    return this.ok(tag);
  }
}

export interface TagDto extends TagEntity {}

export interface NewTagDto extends NewTagEntity {}
