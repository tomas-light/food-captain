import { Database, DishEntity, ImageEntity } from '@food-captain/database';
import { Logger, metadata } from '@food-captain/server-utils';
import { MakeOptional } from '../utils/MakeOptional';
import { ImageService, NewImage } from './ImageService';
import { RecipeService } from './RecipeService';

@metadata
export class DishService {
  constructor(
    private readonly db: Database,
    private readonly imageService: ImageService,
    private readonly recipeService: RecipeService,
    private readonly logger: Logger
  ) {}

  getAllAsync(...args: Parameters<Database['dish']['allAsync']>) {
    return this.db.dish.allAsync(...args);
  }

  getManyAsync(...args: Parameters<Database['dish']['byIdsAsync']>) {
    return this.db.dish.byIdsAsync(...args);
  }

  getByIdAsync(...args: Parameters<Database['dish']['byIdAsync']>) {
    return this.db.dish.byIdAsync(...args);
  }

  async addAsync(
    dishWithoutId: MakeOptional<DishEntity, 'id'>
  ): Promise<DishEntity | undefined> {
    const dish = dishWithoutId as DishEntity;

    const dishId = await this.db.dish.insertAsync(dish);

    if (dishId == null) {
      this.logger.warning(`Dish is not inserted in DB (dish id is ${dishId})`);
      return undefined;
    }

    dish.id = dishId;

    return dish;
  }

  async updateAsync(
    dish: MakeOptional<DishEntity, 'name'>
  ): Promise<DishEntity | undefined> {
    const dishEntity = await this.db.dish.updateAsync(dish);
    if (!dishEntity) {
      return undefined;
    }

    return {
      id: dishEntity.id,
      name: dish.name ?? dishEntity.name,
      description: dish.description,
      image_id: dish.image_id,
    };
  }

  async deleteAsync(dish: DishEntity): Promise<boolean> {
    const dishRecipes =
      await this.recipeService.getByDishIdWithIngredientsAsync(dish.id);

    for await (const recipe of dishRecipes) {
      await this.recipeService.deleteAsync(recipe);
    }

    if (dish.image_id) {
      try {
        await this.imageService.deleteByIdAsync(dish.image_id);
      } catch {
        // todo: image me ybe linked to another entities, it is valid case
      }
    }

    return await this.db.dish.deleteByIdAsync(dish.id);
  }
}
