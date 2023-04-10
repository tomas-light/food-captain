import { Database, ImageEntity } from '@food-captain/database';
import { Logger, metadata } from '@food-captain/server-utils';
import { MakeOptional } from '../utils/MakeOptional';

@metadata
export class ImageService {
  constructor(private readonly db: Database, private readonly logger: Logger) {}

  getAllAsync(): Promise<ImageEntity[]> {
    return this.db.image.allAsync();
  }

  getImageByIdAsync(imageId: number): Promise<ImageEntity | undefined> {
    return this.db.image.byIdAsync(imageId);
  }

  async addAsync(
    imageWithoutId: MakeOptional<ImageEntity, 'id'>
  ): Promise<ImageEntity | undefined> {
    const image = imageWithoutId as ImageEntity;

    const imageId = await this.db.image.insertAsync({
      content: image.content,
    });

    if (imageId == null) {
      this.logger.warning(
        `Image is not inserted in DB (image id is ${imageId})`
      );
      return undefined;
    }

    image.id = imageId;

    return image;
  }

  async updateAsync(image: ImageEntity): Promise<ImageEntity | undefined> {
    return await this.db.image.updateAsync(image);
  }

  async deleteByIdAsync(imageId: ImageEntity['id']): Promise<boolean> {
    return await this.db.image.deleteByIdAsync(imageId);
  }
}
