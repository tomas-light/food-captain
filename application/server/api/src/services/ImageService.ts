import { Database, ImageEntity } from '@food-captain/database';
import { Logger, metadata } from '@food-captain/server-utils';
import { MakeOptional } from '../utils/MakeOptional';

@metadata
export class ImageService {
  constructor(private readonly db: Database, private readonly logger: Logger) {}

  getImageByIdAsync(...args: Parameters<Database['image']['byIdAsync']>) {
    return this.db.image.byIdAsync(...args);
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

  updateAsync(...args: Parameters<Database['image']['updateAsync']>) {
    return this.db.image.updateAsync(...args);
  }
  deleteByIdAsync(...args: Parameters<Database['image']['deleteByIdAsync']>) {
    return this.db.image.deleteByIdAsync(...args);
  }
}
