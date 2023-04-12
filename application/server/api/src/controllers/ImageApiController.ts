import { PassThrough } from 'stream';
import type { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import { api, delete_, get, post } from 'mvc-middleware';
import { ImageEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { ImageService, NewImage } from '../services/ImageService';
import BaseApiController from './BaseApiController';

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
      const { imageProperties, fileStream } = await new Promise<{
        imageProperties: Pick<NewImage, 'tags' | 'file_name' | 'mime_type'>;
        fileStream: PassThrough;
      }>((resolve, reject) => {
        const form = new IncomingForm();
        const fileStream = new PassThrough();

        const fileMeta = {} as Pick<NewImage, 'file_name' | 'mime_type'>;

        form.onPart = (part) => {
          // do not process not files
          if (!part.originalFilename) {
            form._handlePart(part);
            return;
          }

          fileMeta.file_name = part.originalFilename;
          fileMeta.mime_type = part.mimetype ?? 'unknown';

          part.on('data', function (buffer: Buffer) {
            fileStream.write(buffer);
          });
          part.on('end', function () {
            fileStream.end();
          });
        };

        form.parse(this.request, (error, fields, files) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              fileStream,
              imageProperties: {
                ...fields,
                ...fileMeta,
              },
            });
          }
        });
      });

      // todo: not sure if is this correct way
      //  what about size limit? do we need to compare head and tail?
      //  do we need to concatenate head and tail somehow?
      const buffer = (
        fileStream as unknown as {
          _readableState: {
            // BufferList
            buffer: {
              length: number;
              head: {
                data: Buffer;
              };
              tail: {
                data: Buffer;
              };
            };
          };
        }
      )._readableState.buffer.head.data;

      const image = await this.imageService.addAsync({
        ...imageProperties,
        content: buffer,
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
