import type { Request, Response } from 'express';
import { api, delete_, get, post } from 'mvc-middleware';
import { Logger } from '@food-captain/server-utils';
import { ImageService } from '../services/ImageService';
import BaseApiController from './BaseApiController';

@api('/image')
export default class ImageApiController extends BaseApiController {
  constructor(
    private readonly imageService: ImageService,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @get(':imageId')
  async getByIdAsync(imageId: string) {
    const id = parseInt(imageId, 10);

    if (isNaN(id)) {
      return this.badRequest('Image id is invalid');
    }

    const image = await this.imageService.getImageByIdAsync(id);
    if (!image) {
      return this.notFound('Image was not found');
    }

    // todo: should it be binary?
    return this.ok(image.content);
  }

  @post
  async addAsync(imageBase64: string) {
    if (!imageBase64) {
      return this.badRequest('Image is not passed');
    }

    const image = await this.imageService.addAsync({ content: imageBase64 });
    if (!image) {
      return this.notFound('Image is not saved');
    }

    return this.ok({ imageId: image.id });
  }

  @delete_(':imageId')
  async deleteAsync(imageId: string) {
    const id = parseInt(imageId, 10);

    if (isNaN(id)) {
      return this.badRequest('Image id is invalid');
    }

    const removed = await this.imageService.deleteByIdAsync(id);

    return this.ok({ removed });
  }
}
