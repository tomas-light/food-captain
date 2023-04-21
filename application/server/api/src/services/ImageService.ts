import { Database, ImageEntity } from '@food-captain/database';
import { Logger, metadata } from '@food-captain/server-utils';

@metadata
export class ImageService {
  constructor(private readonly db: Database, private readonly logger: Logger) {}

  allShortInfoAsync(
    ...args: Parameters<Database['image']['allShortInfoAsync']>
  ) {
    return this.db.image.allShortInfoAsync(...args);
  }

  getImageByIdAsync(...args: Parameters<Database['image']['byIdAsync']>) {
    return this.db.image.byIdAsync(...args);
  }

  async addAsync(newImage: NewImage): Promise<ImageEntity | undefined> {
    const image = newImage as ImageEntity;

    const imageId = await this.db.image.insertAsync({
      ...image,
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

  updateAsync(...args: Parameters<Database['image']['updateAsync']>) {
    return this.db.image.updateAsync(...args);
  }
  deleteByIdAsync(...args: Parameters<Database['image']['deleteByIdAsync']>) {
    return this.db.image.deleteByIdAsync(...args);
  }
}

export interface NewImage extends Omit<ImageEntity, 'id'> {}
