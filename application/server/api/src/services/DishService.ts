import { Database, DishEntity, ImageEntity } from '@food-captain/database';
import { Logger, metadata } from '@food-captain/server-utils';
import { MakeOptional } from '../utils/MakeOptional';
import { ImageService } from './ImageService';

@metadata
export class DishService {
  constructor(
    private readonly db: Database,
    private readonly imageService: ImageService,
    private readonly logger: Logger
  ) {}

  getAllAsync(): Promise<DishEntity[]> {
    return this.db.dish.allAsync();
  }

  getDishByIdAsync(dishId: number): Promise<DishEntity | undefined> {
    return this.db.dish.byIdAsync(dishId);
  }

  async addAsync(
    dishWithoutId: MakeOptional<DishEntity, 'id'> & { image?: string }
  ): Promise<DishEntity | undefined> {
    const dish = dishWithoutId as DishEntity;

    let image: ImageEntity | undefined;
    if (dishWithoutId.image) {
      image = await this.imageService.addAsync({
        content: dishWithoutId.image,
      });
    }

    const dishId = await this.db.dish.insertAsync({
      name: dish.name,
      description: dish.description,
      image_id: image?.id,
    });

    if (dishId == null) {
      this.logger.warning(`Dish is not inserted in DB (dish id is ${dishId})`);
      return undefined;
    }

    dish.id = dishId;

    return dish;
  }

  async updateAsync(
    dish: MakeOptional<DishEntity, 'name'> & { image?: string }
  ): Promise<DishEntity | undefined> {
    const dishEntity = await this.db.dish.updateAsync(dish);
    if (!dishEntity) {
      return undefined;
    }

    let imageId: ImageEntity['id'] | undefined;
    if (dish.image) {
      let imageWasDeleted: boolean;
      if (dishEntity.image_id != null) {
        imageWasDeleted = await this.imageService.deleteByIdAsync(
          dishEntity.image_id
        );
      } else {
        imageWasDeleted = true;
      }

      if (imageWasDeleted) {
        const imageEntity = await this.imageService.addAsync({
          content: dish.image,
        });
        imageId = imageEntity?.id;
      }
    }

    return {
      id: dishEntity.id,
      name: dishEntity.name,
      description: dishEntity.description,
      image_id: imageId,
    };
  }

  async deleteAsync(dish: DishEntity): Promise<boolean> {
    if (dish.image_id) {
      const imageWasDeleted = await this.imageService.deleteByIdAsync(
        dish.image_id
      );

      if (!imageWasDeleted) {
        return false;
      }
    }

    return await this.db.dish.deleteByIdAsync(dish.id);
  }
}