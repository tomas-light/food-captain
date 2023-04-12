import type { Request, Response } from 'express';
import multer, { memoryStorage } from 'multer';
import { api, delete_, get, post } from 'mvc-middleware';
import { ImageEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { ImageService, NewImage } from '../services/ImageService';
import BaseApiController from './BaseApiController';

const upload = multer({
  storage: memoryStorage(),
});

@api
export default class ImageApiController extends BaseApiController {
  constructor(
    private readonly imageService: ImageService,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @get('images')
  async getAllAsync() {
    const imageIds = await this.imageService.allIdsAsync();
    return this.ok({ imageIds });
  }

  @get('image/:imageId')
  async getByIdAsync(imageId: string) {
    const id = parseInt(imageId, 10);

    if (isNaN(id)) {
      return this.badRequest('Image id is invalid');
    }

    const image = await this.imageService.getImageByIdAsync(id);
    if (!image) {
      return this.notFound('Image was not found');
    }

    this.response.writeHead(200, {
      'Content-Type': image.mime_type,
      'Content-disposition': 'inline',
      'Content-Length': image.content.byteLength,
    });
    this.response.end(image.content);
  }

  @post('image')
  async addAsync() {
    try {
      const multerMiddleware = upload.single('imageFile');
      await new Promise<void>((resolve, reject) => {
        multerMiddleware(this.request, this.response, (middlewareError) => {
          if (!middlewareError) {
            resolve();
          } else {
            reject(middlewareError);
          }
        });
      });

      const uploadedFile = this.request.file;
      if (!uploadedFile) {
        return this.badRequest('File has missed!');
      }

      const bodyParameters = this.request.body as { tags?: string };

      const image = await this.imageService.addAsync({
        tags: bodyParameters.tags,
        mime_type: uploadedFile.mimetype,
        file_name: uploadedFile.originalname,
        content: uploadedFile.buffer,
      });
      if (!image) {
        return this.notFound('Image is not saved');
      }

      return this.ok({ imageId: image.id });
    } catch (error) {
      return this.serverError(error);
    }
  }

  @delete_('image/:imageId')
  async deleteAsync(imageId: string) {
    const id = parseInt(imageId, 10);

    if (isNaN(id)) {
      return this.badRequest('Image id is invalid');
    }

    const removed = await this.imageService.deleteByIdAsync(id);

    return this.ok({ removed });
  }
}

export interface ImageDto extends ImageEntity {}
export interface NewImageDto extends NewImage {}
